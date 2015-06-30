<?php

class AccountAction extends UserAction {
	
	const CreditCardFee = 0.039;
	const MerchantCert = 'sJg8eftbI0oNXagF0zivY8LXjfy6UlLEpu2W33RbxjfZ5U6JMFcZrEot6sZ7QwpwpSxDhtK6Rg7O2U0xiYtpiUnUgJYLdSua3RKmxDBt3fikGIzmBCZ0daoDEMxHD827';
	const MerchantCode = "T00000000043";
	const MerchantURL = "https://www.ytopayment.com/api/icc/Pay.svc?wsdl";
	
// 	const MerchantCert = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
// 	const MerchantCode = "M00000000030";
// 	const MerchantURL = "http://113.108.63.41:6645/Pay.svc?wsdl";
// 	411111111111111130  // 账号
// 	chenfeng  			// 持卡人
// 	1306 				// 有效期
// 	222  				// CVV
// 	中国银行 				// bank
		
    public function jiaqian() {
        $res=payFee();
        $this->assign("res",$res);
        $this->display();
    }
    
    public function addmoney() {
        $uid = getUserInfo('id');
        $priceTot = getCredit($uid);
        $this->assign("balance",$priceTot['coin']);
        $this->display();
    }

    public function draw(){
        $arr["name"]   =$_POST["name"];
        $arr["account"]=$_POST["Account"];      
        $data["no"]      = $this->creatno();
        $data["uid"]     = getUserInfo("id");
        $data["method"]  = $_POST["types"];
        $data["money"]   = round($_POST["Amount"]*currency(),2);
        $data["fees"]    = 0.00;
        $data["ctype"]   = 1;
        $data["status"]  = 0;
        $data["config"]  = serialize($arr);
        $data["mark"]    = $_POST["Comments"];
        $data["ctime"]   = time();
        $res=M("PayOrder")->add($data);
        if($res){
            redirect(U('user/account/refund'));
        }else{
            $this->_error("Application failure ");
        }   
    }
    
    public function quqian() {
        $uid=getUserInfo("id");
        $cion=getCredit($uid);
        $this->assign("coin",$cion["coin"]);
        $this->display();
    }


    public function payto(){
        $money = $this->_post('PayPalAccount','trim'); 
        if($money==0 || empty($money)){
            $this->_error("Replenishing amount can't is 0 ");
        }
        $method = $this->_post('method','trim');
        $money=$money*currency();//转换成人民币；
        $payfee=payFee();
        if($payfee[$method][1]==0){
            $money=$money-$payfee[$method][0];
        }else{
            $money=$money-$money*$payfee[$method][0];
        }
        $res = M('Pay')->where("class_name='$method'")->find();
        if(!$res || empty($res)){
            $this->_error("Choice of payment interface does not exist ! ");
        }else{//组装订单数据
            $data['no']     = $this->creatno();
            $data['uid']    = getUserInfo('id');
            $data['method'] = $method;
            $data['money']  = $money;
            $data['ctype']  = 0;
            $data['status'] = 0;
            $data['ctime']  = time();
            $rs = M('PayOrder')->add($data);
            if($rs){//创建成功 显示订单页面
                $this->paytodo($data['no'], $data['uid']);
            }else{
                $this->_error('Create order failure !');
            }
        }
    }
    public function offlinePay(){
            $arr=array();
            $method = $this->_post('method','trim');
            $money  = $this->_post('WMAmount','trim'); 
            $arr["WMPurse"] = $this->_post('WMPayerPurse','trim');
            $arr["WMPurse"]  = $this->_post('WMPayerName','trim'); 
            $arr["WMPayment"]  = $this->_post('WMDateOfPayment','trim'); 
            $money  = $money*currency();//转换成人民币；
            $payfee=payFee();
            if($payfee[$method][1]==0){
                $money=$money-$payfee[$method][0];
            }else{
                $money=$money-$money*$payfee[$method][0];
            }
            $data['no']     = $this->creatno();
            $data['uid']    = getUserInfo('id');
            $data['method'] = $method;
            $data['money']  = $money;
            $data["config"] = serialize($arr);
            $data['ctype']  = 2;
            $data['status'] = 0;
            $data['ctime']  = time();
            $rs = M('PayOrder')->add($data);
            
            if($rs){//创建成功 显示订单页面
                $this->success("Success !",U('user/account/addmoney'));
            }else{
                $this->_error('Create order failure !');
            }
    }
    
    public function paytodo($no,$uid){
        //获得订单号
        $map['no'] = $no;
        $map['uid'] = $uid;
        $order = M('PayOrder')->where($map)->find(); 
        if($order){
            $pay = M('Pay')->where('class_name="'.$order['method'].'"')->find();
            if($order['ctype'] == 0){//线上支付
                if($order['status'] == 0){//未支付
                    $name = $order['method']."_payment";
                    $file = APP_PATH."/Lib/ORG/Pay/".$name.'.php';
                    if(file_exists($file)){
                        require_once($file);
                    }else{
                        $this->_error('Choice of payment interface does not exist !');
                    }
                    $class = new $name();
                    $parmater = $class->get_payment_code($order,$pay);
                    $this->assign('alipayto',$parmater);
                    $this->assign('row',$row);
                    $this->assign('action','recharge');
                    $this->display('myorder');
                }
            }
        }
    }
    
    //创建用户订单号方法
    protected  function creatno(){
        while(true){
            $no = date('ymdHis').rand(10, 99).rand(10,99);
            $rs = M('PayOrder')->where('no='.$no)->find();
            if(!$rs) return $no;
        }
    }
    
    //账户明细
    public function history() {     
        @import('ORG.Util.Page');
        if(isset($_GET['start'])){
            $stime = strtotime( $_GET['start']); 
            if(isset($_GET['end'])){
                $etime = strtotime( $_GET['end']);
            } else {
                $etime = time();
            }
            $etime=$etime+24*3600;
       } else{
            $stime = time()-30*24*3600;
            $etime = time()+24*3600;
       }
       
       $map['ctime']=array(array('gt',$stime),array('lt',$etime));
       
        $uid=getUserInfo('id');
        $map['uid'] = $uid;
        $count = M('OfflineCredit')->where($map)->count();
        if($count > 0){
            $page = new Page($count,10);
            $page->setConfig('first', 'first');
            $page->setConfig('prev', 'previous');
            $page->setConfig('next', 'Next');
            $page->setConfig('last', 'last');
            $page->setConfig('theme', '%first% %upPage%  %linkPage% %downPage% %end%');
            $rows = M('OfflineCredit')->where($map)->order("ctime desc")->limit($page->firstRow.','.$page->listRows)->select();
            $this->assign('rows',$rows);
            $this->assign('page',$page->show());
            
            $this->assign('start',date('Y/m/d', $stime));
            $this->assign('end',date('Y/m/d', $etime-24*3600));
        }
        $this->display();
    }
    //积分
    public function points() {
        @import('ORG.Util.Page');
        $uid=getUserInfo('id');
        $map['uid'] = $uid;
        $map['ename'] = 'point_log';
        $count = M('UserRecord')->where($map)->count();
        $credit=M('UserCredit')->where("uid=".$uid)->find();
        if($count > 0){
            $page = new Page($count,10);
            $page->setConfig('first', 'first');
            $page->setConfig('prev', 'previous');
            $page->setConfig('next', 'Next');
            $page->setConfig('last', 'last');
            $page->setConfig('theme', '%first% %upPage%  %linkPage% %downPage% %end%');
            $plog= M('UserRecord')->where($map)->order("ctime desc")->limit($page->firstRow.','.$page->listRows)->select();
            $this->assign('plog',$plog);
            $this->assign('page',$page->show());
            //
        }
        $this->assign('credit',$credit);         
        $this->assign('_title','积分明细');
        $this->display();
    }
    //  提现
    public function refund(){
        @import('ORG.Util.Page');
        $uid=getUserInfo("id");
        $map["uid"]=$uid;
        $map["ctype"]=1;
        $count = M('PayOrder')->where($map)->count();
        if($count > 0){
                $page = new Page($count,10);
                $page->setConfig('first', 'first');
                $page->setConfig('prev', 'previous');
                $page->setConfig('next', 'Next');
                $page->setConfig('last', 'last');
                $page->setConfig('theme', '%first% %upPage%  %linkPage% %downPage% %end%');
                $plog= M('PayOrder')->where($map)->order("id desc")->limit($page->firstRow.','.$page->listRows)->select();
                $this->assign('plog',$plog);
                $this->assign('page',$page->show());
            }
            
        $this->display();
    }

	 /***********************************************************************************
     * 退款
     **********************************************************************************/
    public function refundsave() {        
        $data['uid']	= getUserInfo('id');
        $data['method'] = $_POST['DrawbackType'];
        $data['amount'] = $_POST['ApplyMoney'];
        //$data['fees']	= $_POST['fee'];
        $data['status'] = 0; // 未审核
		$data['ctype']	= 1; // 充值
        $data['ctime']  = time();
        $data['utime']  = time();
        //$data['purse']  = $_POST['purse'];
        $data['payer_name']  = getUserInfo('account');
        //$data['payment_time']  = $payment_time;
		$info = "";
		$info.= "Name:".$_POST['ManName'];
		$info.= "Remark:".$_POST['Remark'];
		$data['info'] = $info;
        $rs = M('OfflineCredit')->add($data);
        if($rs) {
            echo "true";
        }else{
			echo "false";
		}
    }

    /***********************************************************************************
     * 信用卡 充值
     **********************************************************************************/
    public function addmoneybycreditcard() {
    	$feerate = AccountAction::CreditCardFee;
    	$amount = $_POST['Amount']*1;
    	$fee = $amount * $feerate;
    	// card info
    	$card["CardNumber"] = $_POST["CardNumber"];
    	$card["CardName"] = $_POST["CardName"];
    	$card["CardExpireDate"] = $_POST["CardExpireDate"];
    	$card["CardCVV"] = $_POST["CardCVV"];
    	$card["CardIssuerCountry"] = "usa"; // 默认传值
    	$card["CardIssuerName"] = $_POST["CardIssuerName"];
    	
    	$order['total'] = $amount;
    	$order['fees'] = $fee;
    	$order['address'] = '';
    	$order['id'] = time().'_'. getUserInfo('id');
    	$order['ctime'] = time();
    	
    	$result = $this->creditapi($order,$card);
    	if($result->DoPayResult->ResultFlag == 'Y') {
    		// 充值
    		$data['uid'] = getUserInfo('id');
    		$data['method'] = 'CreditCard';
    		$data['amount']  = $amount;
    		$data['fees']  = $fee;
    		$data['status'] = 0; // 未审核
    		$data['ctype']  = 0; // 充值
    		$data['ctime']  = time();
    		$data['utime']  = time();
    		$data['purse']  = $_POST['CardNumber'];
    		$data['payer_name']  = $_POST['CardName'];
    		
    		$cvv = $card["CardCVV"];
    		$expireDate = $card["CardExpireDate"];
    		$issuerName = $card["CardIssuerName"];
    		if(!isset($cvv) || !$cvv) {
    			$cvv = 'xxxx';
    		}
    		if(!isset($expireDate) || !$expireDate) {
    			$expireDate = 'xxxx';
    		}
    		if(!isset($issuerName) || !$issuerName) {
    			$issuerName = 'xxxx';
    		}
    		// cvv | expireDate | issuerName
    		$data['info']  = $cvv. '|'. $expireDate. '|'. $issuerName;
    		
    		$rs = M('OfflineCredit')->add($data);
    		if($rs) {
    			redirect(U('user/account/history'));
    		}
    	} else {
    		$this->_error($result->DoPayResult->ResultDesc);
    	}
    }
    
    /***********************************************************************************
     * Western Union 充值
     **********************************************************************************/
    public function addmoneybywesternunion() {
        $payment_date = $_POST['payment_date'];
        $array = explode("/", $payment_date);
//         $payment_time = strtotime($array[2].$array[1].$array[0]); // Ymd
        
        $firstname = $_POST['firstname'];
        $middlename = $_POST['middlename'];
        $lastname = $_POST['lastname'];
        if(!isset($firstname) || !$firstname) {
        	$firstname = 'xxxx';
        }
        if(!isset($middlename) || !$middlename) {
        	$middlename = 'xxxx';
        }
        if(!isset($lastname) || !$lastname) {
        	$lastname = 'xxxx';
        }
        $payer_name = $firstname. '|'. $middlename. '|'. $lastname;
        
        $data['uid'] = getUserInfo('id');
        $data['method'] = 'WesternUnion';
        $data['amount']  = $_POST['amount'];
        $data['fees']  = $_POST['fee'];
        $data['status'] = 0; // 未审核
        $data['ctype']  = 0; // 充值
        $data['ctime']  = time();
        $data['utime']  = time();
        $data['purse']  = $_POST['purse'];
        $data['payer_name']  = $payer_name;
        $data['info']  = $_POST['country']; // info 放入国家信息
//         $data['payment_time']  = $payment_time;
        $rs = M('OfflineCredit')->add($data);
        if($rs) {
            redirect(U('user/account/history'));
        }
    }
    
    /***********************************************************************************
     * Web Money 充值
     **********************************************************************************/
    public function addmoneybywebmoney() {
    	$payment_date = $_POST['payment_date'];
        $array = explode("/", $payment_date);
        $payment_time = strtotime($array[2].$array[1].$array[0]); // Ymd
        
        $data['uid'] = getUserInfo('id');
        $data['method'] = 'WebMoney';
        $data['amount']  = $_POST['amount'];
        $data['fees']  = $_POST['fee'];
        $data['status'] = 0; // 未审核
        $data['ctype']  = 0; // 充值
        $data['ctime']  = time();
        $data['utime']  = time();
        $data['purse']  = $_POST['purse'];
        $data['payer_name']  = $_POST['payer_name'];
        $data['payment_time']  = $payment_time;
        $rs = M('OfflineCredit')->add($data);
        if($rs) {
            redirect(U('user/account/history'));
        }
    }
    
    /**************************************************************************
     * 信用卡支付
     *************************************************************************/
    public function paybycredit() {
        $feerate = AccountAction::CreditCardFee;
        $oid = $_POST["oid"];
        $money = $_POST['credit_all_total']*1;
        // card info
        $card["CardNumber"] = $_POST["CardNumber"];
        $card["CardName"] = $_POST["CardName"];
        $card["CardExpireDate"] = $_POST["CardExpireDate"];
        $card["CardCVV"] = $_POST["CardCVV"];
        $card["CardIssuerCountry"] = "usa"; // 默认传值
        $card["CardIssuerName"] = $_POST["CardIssuerName"];
    
        $order = M("Order")->find($oid);
        if($order) {
            $total = $order['total'];
            $allTotal = round($total + $total * $feerate, 2);
            // 验证价格
            if($allTotal != $money) {
                $this->_error('invalid request');
            } else {
                $fee = $total * $feerate;
                // 交易流水
                $data['no'] = $this->creatno();
                $data['uid'] = getUserInfo('id');
                $data['oid'] = $oid;
                $data['method'] = 'CreditCard';
                $data['money']  = $total;
                $data['fees']  = $fee;
                $data['ctype']  = 0;
                $data['status'] = 0; // 未支付
                $data['ctime']  = time();
                $rs = M('PayOrder')->add($data);
                if($rs){
                	// 调用支付接口
                    $result = $this->creditapi($order,$card);
                    if($result->DoPayResult->ResultFlag == 'Y') {
	                    // 更改交易流水状态
	                    $tmp['status'] = 1;
	                    $rs = M('PayOrder')->where("id=".$rs)->save($tmp);
	                    if($rs) {
	                    	// 最终支付
	                    	$this->dopay($order, $data['method']);
	                    } else {
	                    	$this->_error('Change PayOrder status failed!');
	                    }
                    } else {
                    	$this->_error($result->DoPayResult->ResultDesc);
                    }
                } else{
                    $this->_error('Pay order failed!');
                }
            }
        }
    }
    
    /***********************************************************************************
     * 余额支付
     **********************************************************************************/
    public function paybybalance() {
		$type = $_POST["type"];
        $oid = $_POST["iod"];
        $uid = getUserInfo('id');
        $credit = getCredit($uid,'coin');

		if($type=="package"){
			$parcel = M("Parcel")->where("id=".$oid)->find();
			if($parcel) {
				$total = $parcel['money'];
				// 验证价格
				if($total > $credit) {
					$this->_error('balance not enough');
				} else {
					// 未支付
					if($parcel['status'] == 6) {
						// 交易流水
						$data['no'] = $this->creatno();
						$data['uid'] = $uid;
						$data['oid'] = $oid;
						$data['method'] = 'Balance';
						$data['money']  = $total;
						$data['fees']  = 0;
						$data['ctype']  = 3;
						$data['status'] = 1; // 已支付
						$data['ctime']  = time();
						$rs = M('PayOrder')->add($data);
						 
						if($rs){
							// 最终支付
							$this->dopaypackage($parcel, $data['method']);
						}else{
							$this->_error('Create order failure !');
						}
					}
				}
			}
		}else{
			$order = M("Order")->where("id=".$oid)->select();
			if($order) {
				$order = $order[0];
				$total = $order['total'];
				// 验证价格
				if($total > $credit) {
					$this->_error('balance not enough');
				} else {
					// 未支付
					if($order['status'] == 0) {
						// 交易流水
						$data['no'] = $this->creatno();
						$data['uid'] = $uid;
						$data['oid'] = $oid;
						$data['method'] = 'Balance';
						$data['money']  = $total;
						$data['fees']  = 0;
						$data['ctype']  = 0;
						$data['status'] = 1; // 已支付
						$data['ctime']  = time();
						$rs = M('PayOrder')->add($data);
						 
						if($rs){
							// 最终支付
							$this->dopay($order, $data['method']);
						}else{
							$this->_error('Create order failure !');
						}
					}
				}
			}
		}
    }
    /**
     * 最终支付
     * @param unknown $order
     * @param unknown $payMethod
     */
    public function dopay($order, $payMethod) {
        // 更改订单状态
        $oid = $order['id'];
        $uid = $order['buyer'];
        $data['status'] = 1; // 已支付
        $rs = M('Order')->where("id=".$oid)->save($data);
        
        if($rs) {
            if($payMethod != 'CreditCard') {
                // 减少用户信息Credit
                $credit = getCredit($uid,'coin');
                $credit = $credit - $order['total'];
                $obj['coin'] = $credit;
                M('UserCredit')->where("uid=".$uid)->save($obj);
            }
            
            // 跳转到我的订单
            redirect(U('user/order/myorder'));
        } else {
        	$this->_error('Change order status failed !');
        }
    }


/**
     * 最终支付包裹
     * @param unknown $order
     * @param unknown $payMethod
     */
    public function dopaypackage($package, $payMethod) {
        // 更改包裹状态
        $id = $package['id'];
        $uid = $package['uid'];
        $data['status'] = 7; // 已支付
        $rs = M('Parcel')->where("id=".$id)->save($data);
        
		$pe = M('ParcelEntry')->where("parcelid=".$id)->select();
		if($pe){
			foreach($pe as $k=>$v){
				// 订单状态
				$data['status'] = 7; // 已支付
				M('Order')->where("id=".$v["oid"])->save($data);
			}
		}

        if($rs) {
            if($payMethod != 'CreditCard') {
                // 减少用户信息Credit
                $credit = getCredit($uid,'coin');
                $credit = $credit - $package['money'];
                $obj['coin'] = $credit;
                M('UserCredit')->where("uid=".$uid)->save($obj);
            }
            
            // 跳转到我的订单
            redirect(U('user/order/parcels'));
        } else {
        	$this->_error('Change order status failed !');
        }
    }

    /**
     * 信用卡支付接口
     * 
     */
    public function creditapi($order,$card) {
        // Card info
        $MerchantCert = AccountAction::MerchantCert; // 证书
        $MerchantCode = AccountAction::MerchantCode; //商户号
        $Md5String = md5($MerchantCert);//数字签名
        $key = strtoupper(substr($Md5String,0,16));
        $iv = strtoupper(substr($Md5String,16,16));
        $encrypted = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $card["CardNumber"], MCRYPT_MODE_CBC, $iv);
        $CardNumber = base64_encode($encrypted);
        $CardName = $card["CardName"];
        $CardExpireDate = $card["CardExpireDate"];
        $CardCVV = $card["CardCVV"];
        $CardIssuerCountry = $card["CardIssuerCountry"];
        $CardIssuerName = $card["CardIssuerName"];

        // defalut
        $FormVersion = "A.3.0"; //接口版本
        $PageVersion = "T.1.1"; //支付页面版本
        $PageEncoding = "utf-8"; //编码集
        $PageLanguage = "en-us"; //界面语言格式
        $TransactionType = 'ICC';//业务类型
        $RiskLevel = 1;
        $CardType = 1;
        $CardEncryptType = 'AES';
        $TransType = 'SALE';
        $BusinessType= "ICC";
        $OrderCurrency = "USD";//商户订单交易币种;CNY
        $OrderType= "LS"; //定单类型
        $PageCssID = 1; //
		
        //order info
        $OrderID = $order["id"];
        $OrderPayID = date("YmdHis").'_'.$order["id"];
        $OrderDate = date('YmdHis',$order["ctime"]);
        $OrderAmount = $order["total"];//商户订单交易金额 TODO $order["total"]
        $BackUrl = '';
        $BackUrlOffLine = '';
        $OrderUrl = '';//交易地址
        $OrderAmountDisplay = $OrderAmount;//支付页面显示的订单金额
        $OrderShippingFee = null;

        // customer info
        $CustomerEmail = "";
        $CustomerIP = $_SERVER['REMOTE_ADDR'];
        $CustomerIPProxy = '';
        $CustomerOS = "";
        $CustomerOSDateTime = date('YmdHis');
        $CustomerTimeZone = '';
        $CustomerBrowser = '';
        $CustomerBrowserResolution = '';
        $CustomerBrowserLanguage = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
        $CustomerMAC = '';
        $Remark = '';
        $CustomerID = '';
        $BankCode = '';
		
        $wl = unserialize($order["address"]);
        //Bill info
        $BillFirstName = $wl["name"];
        $BillMiddleName = '';
        $BillLastName = '';
        $BillAddress = '';
        $BillCountry = '';
        $BillProvince = '';
        $BillCity = '';
        $BillEmail = '';
        $BillPhone = '';
        $BillZipCode = '';

        //Delivery info
        $DeliveryFirstName = '';
        $DeliveryMiddleName = '';
        $DeliveryLastName = '';
        $DeliveryAddress = '';
        $DeliveryCountry = '';
        $DeliveryProvince = '';
        $DeliveryCity = '';
        $DeliveryEmail = '';
        $DeliveryPhone = '';
        $DeliveryZipCode = '';
        
        // GOODS
        $doGoods = array(); 
        $goodContent='';
        $GoodsName = '充值';
        $GoodsSKU = '';
        $GoodsQuantity = 0;
        $GoodsPrice = 0;
        $GoodsAdjustFee = 0;
        $GoodsExtension = '';
        $goodContent = $goodContent.$GoodsName.$GoodsSKU.$GoodsQuantity.$GoodsPrice.$GoodsAdjustFee.$GoodsExtension;
        $doGoods[] = array (
            'GoodsName' => $GoodsName,
            'GoodsSKU' =>$GoodsSKU,
            'GoodsQuantity' =>$GoodsQuantity,
            'GoodsPrice' => $GoodsPrice,
            'GoodsAdjustFee' => $GoodsAdjustFee,
            'GoodsExtension' => $GoodsExtension,
            );
        $good=array ('DoGood' => $doGoods); 
        
        // ACCESSS
        $doAccesss = array(); 
        $accesssContent='';
        $AccessIP = $_SERVER['REMOTE_ADDR'];
        $AccessTime = date('YmdHis');
        $AccessPreviousUrl = '';
        $AccessUrl = '?';
        $AccessLeaveTime = '';
        $AccessExtension = '';          
        $accesssContent=$accesssContent.$AccessIP.$AccessTime.$AccessPreviousUrl.$AccessUrl.$AccessLeaveTime.$AccessExtension;
        $doAccesss[] = array (
            'AccessIP' => $AccessIP,
            'AccessTime' =>$AccessTime,
            'AccessPreviousUrl' =>$AccessPreviousUrl,
            'AccessUrl' => $AccessUrl,
            'AccessLeaveTime' => $AccessLeaveTime,
            'AccessExtension' => $AccessExtension,
            );
        $Access=array ('DoAccess' => $doAccesss);    
		
        // Pay
        $Signature =$MerchantCert . $FormVersion . $PageEncoding . $PageLanguage . $MerchantCode . $BusinessType . $BankCode . $RiskLevel . $CardType . $CardEncryptType . $CardNumber . $CardName . $CardExpireDate . $CardCVV . $CardIssuerCountry . $CardIssuerName . $TransType . $OrderType . $OrderPayID . $OrderID . $OrderDate . $OrderCurrency . $OrderAmount . $BackUrl . $BackUrlOffLine . $OrderUrl . $OrderAmountDisplay . $CustomerID . $CustomerEmail . $CustomerIP . $CustomerIPProxy . $CustomerMAC . $CustomerOS . $CustomerOSDateTime .$CustomerTimeZone . $CustomerBrowser . $CustomerBrowserResolution . $CustomerBrowserLanguage . $Remark . $accesssContent . $goodContent . $OrderShippingFee . $BillFirstName . $BillMiddleName . $BillLastName . $BillAddress . $BillCountry . $BillProvince . $BillCity . $BillEmail . $BillPhone. $BillZipCode . $DeliveryFirstName . $DeliveryMiddleName . $DeliveryLastName . $DeliveryAddress . $DeliveryCountry . $DeliveryProvince . $DeliveryCity . $DeliveryEmail . $DeliveryPhone . $DeliveryZipCode;
        $content= base64_encode($Signature); 
        $DigitalSignature = hash("sha256", $content);
        
        try {
	        $soap = new SoapClient(AccountAction::MerchantURL);  //正式地址
	     	
	        $result = $soap->DoPay( array ( 
	         'order' => array (
		        'FormVersion' => $FormVersion,
		        'PageEncoding' => $PageEncoding,
		        'PageLanguage' => $PageLanguage,
		        'MerchantCode' => $MerchantCode,
		        'BusinessType' => $BusinessType,
		        'BankCode' => $BankCode,
		        'RiskLevel' => $RiskLevel,
		        'CardType' => $CardType,
		        'CardEncryptType' => $CardEncryptType,
		        'CardNumber' => $CardNumber,
		        'CardName' => $CardName,
		        'CardExpireDate' => $CardExpireDate,
		        'CardCVV' => $CardCVV,
		        'CardIssuerCountry' => $CardIssuerCountry,
		        'CardIssuerName' => $CardIssuerName,
		        'TransType' => $TransType,
		        'OrderType' => $OrderType,
		        'OrderPayID' => $OrderPayID,
		        'OrderID' => $OrderID,
		        'OrderDate' => $OrderDate,
		        'OrderCurrency' => $OrderCurrency,
		        'OrderAmount' => $OrderAmount,
		        'BackUrl' => $BackUrl,
		        'BackUrlOffLine' => $BackUrlOffLine,
		        'OrderUrl' => $OrderUrl,
		        'OrderAmountDisplay' => $OrderAmountDisplay,
		        'CustomerEmail' => $CustomerEmail,
		        'CustomerIP' => $CustomerIP,
		        'CustomerIPProxy' => $CustomerIPProxy,
		        'CustomerOS' => $CustomerOS,
		        'CustomerOSDateTime' => $CustomerOSDateTime,
		        'CustomerTimeZone' => $CustomerTimeZone,
		        'CustomerBrowser' => $CustomerBrowser,
		        'CustomerBrowserResolution' => $CustomerBrowserResolution,
		        'CustomerBrowserLanguage' => $CustomerBrowserLanguage,
		        'Remark' => $Remark,
		        'OrderShippingFee' => $OrderShippingFee,
		        'BillFirstName' => $BillFirstName,
		        'BillMiddleName' => $BillMiddleName,
		        'BillLastName' => $BillLastName,
		        'BillAddress' => $BillAddress,
		        'BillCountry' => $BillCountry,
		        'BillProvince' => $BillProvince,
		        'BillCity' => $BillCity,
		        'BillEmail' => $BillEmail,
		        'BillPhone' => $BillPhone,
		        'BillZipCode' => $BillZipCode,
		        'DeliveryFirstName' => $DeliveryFirstName,
		        'DeliveryMiddleName' => $DeliveryMiddleName,
		        'DeliveryLastName' => $DeliveryLastName,
		        'DeliveryAddress' => $DeliveryAddress,
		        'DeliveryCountry' => $DeliveryCountry,
		        'DeliveryProvince' => $DeliveryProvince,
		        'DeliveryCity' => $DeliveryCity,
		        'DeliveryEmail' => $DeliveryEmail,
		        'DeliveryPhone' => $DeliveryPhone,
		        'DeliveryZipCode' => $DeliveryZipCode,
		        'PageCssID' => $PageCssID,
		        'CustomerID' => $CustomerID,
		        'CustomerEmail' => $CustomerEmail,
		        'CustomerMAC' => $CustomerMAC,
		        'DigitalSignature' => $DigitalSignature,
		        'DoGoodList' => $good,
		        'DoAccessList' => $Access
	        	)
	        ));
	        return $result;
        } catch(Exception $e) {
            return false;
        }
    }


	/**
     * 信用退款付接口
     * 
     */
    public function creditrefundapi($order,$card) {
		$FormVersion = "";
		$Language = "";
		$MerchantCode = "";
		$OrderPayId = "";
		$OrderDate	= "";
		$OrderCurrency = "";
		$OrderAmount = "";
		$RefundId = "";
		$RefundAmcount = "";
		$RefundRemark = "";
		$Signature = $MerchantCert.$FormVersion.$Language.$MerchantCode.$OrderPayID.$OrderDate.$OrderCurrency.$OrderAmount.$RefundID.$RefundAmount.$RefundRemark;
		$content= base64_encode($Signature); 
        $DigitalSignature = hash("sha256", $content);
		try
			{
			$soap = new SoapClient("http://113.108.63.41:6645/refund.svc?wsdl"); //测试地址
			$result = $soap->DoRefund( array ( 
				'order' => array (
				'FormVersion' => $FormVersion,
				'Language' => $Language,
				'MerchantCode' => $MerchantCode,
				'OrderPayID' => $OrderPayID,
				'OrderDate' => $OrderDate,
				'OrderCurrency' => $OrderCurrency,
				'OrderAmount' => $OrderAmount,
				'RefundId' => $RefundId,
				'RefundAmcount' => $RefundAmcount,
				'RefundRemark' => $RefundRemark,
				'DigitalSignature' => $DigitalSignature
				)));
				return $result;
			} catch(Exception $e) {
				return false;
			}
       	}

}

