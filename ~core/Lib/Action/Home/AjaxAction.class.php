<?php
@import('@.ORG.Taoapi.TopClient');
@import('@.ORG.Taoapi.RequestCheckUtil');
@import('@.ORG.Taoapi.ItemGetRequest');
@import('@.ORG.Taoapi.ItemcatsGetRequest');
class AjaxAction extends FrontAction{
    
    public function getlogin()
    {
        if(IS_LOGIN) echo 1;
        else echo U('home/user/login');
        exit;
    }
    
	//头部显示购物车 商品
	public function shopcat(){
		$data['result']=true;
		$data['iscoo']=true;
        if(IS_LOGIN) 
        {
            $uid = getUserInfo('id');
            $map = array('uid'=>$uid);
            $map['_logic'] = "or";
        }
        else $priceTot = 0;
        
        $map['cookie'] = getUserCookie ();
        {
			$res=M('Shopcart')->where($map)->order("id desc")->limit(4)->select();
		    foreach ($res as $k=>$v) {
    		    $res[$k]['info']=unserialize($res[$k]['info']);
    		    $res[$k]['pic']=$res[$k]['info']['pic'];
    		    $res[$k]['name']=$res[$k]['info']['name'];
    		    $res[$k]['price']=$res[$k]['info']['price']; 
    	    }
		    $tot=0;
			foreach ($res as $k=>$v) {
				$tot+=$res[$k]['price']*$res[$k]['number'];
			}
			$data['iscoo']=false;
			$data['data']=$res;
			$data['tot']=$tot;
			$data['count']=count($res);
		}
		echo json_encode($data);
	}

	//获取当前用户购物车 商品数量
	public function loginShopCatMun(){
		if(IS_LOGIN) 
        {
            $uid = getUserInfo('id');
            $map = array('uid'=>$uid);
            $map['_logic'] = "or";
        }
        
        $map['cookie'] = getUserCookie();
        
		$data['data'] = M('Shopcart')->where($map)->count();
		$data['result']=true;
		echo json_encode($data);
	}
	
	public function deletes(){
		$map['pid']=$_POST['goodsId'];
		$map['uid']=getUserInfo('id');
		$data['result']=M('Shopcart')->where($map)->delete();
		echo json_encode($data);
	}
	//购物车 添加商品
	public function doAddShoppingCart(){
//        if(!IS_LOGIN) 
//        {
//            $data['result'] = false;
//            $data['errcode'] = 3;
//        }
//        else
        {
            $data['result'] = false;
            $data['nouid']  = false;
            if(IS_LOGIN) $uid = getUserInfo('id');
            else $cookie = getUserCookie();
            
            $pid = $_POST['id'];
            if(!$uid && !$cookie)
            {
                $data['result'] = false;
                $data['errcode']  = 3;
            }
            else
            {
                if($uid) $map['uid'] = $uid;
                if($cookie) $map['cookie'] = $cookie;
                $map['pid'] = $pid;
                $num   = $_POST['Amount'];
                $count = M('Shopcart')->where($map)->count();
                if($count > 0) $res = M('Shopcart')->where($map)->setInc('number',$num);
                else
                {
                    $map['ctime']=time();
                    $resp = M("Prod")->field("id,iid,name,pic,price,freight,shopname,recommend")->where("id=".$pid)->find();
                    $map['info'] = serialize($resp);
                    $res = M('Shopcart')->add($map);
                }
                
                if($res) $data['result']=true;
            }
        }
		
		echo json_encode($data);
		
	}
	//用户中 购物车 数量该变
	
	public  function changeNumber(){
		$data['result']=false;
		$id=$_POST['id'];
		$datas['number']=$_POST['val'];
		$res=M('Shopcart')->where('id='.$id)->save($datas);
		if($res){
			$data['result']=true;
		}
		echo json_encode($data);
	}
	//用户中心 购物车 商品删除
	public function deleGoods(){
		$data['res']=false;
		$id=$_POST['id'];
//         $cookie = getUserCookie ();
// 		if(IS_LOGIN) 
//         {
//             $uid = getUserInfo('id');
//             $map = array('uid'=>$uid);
//             $map['_string'] = "uid = ".$uid.' or cookie = "'.$cookie."'";
//         }
//         else $map['cookie'] = $cookie;
        
		$map['id'] = array('in',explode(',', $id));
		$res = M('Shopcart')->where($map)->delete();
		if($res){
			$data['res']=true;
		}
		echo json_encode($data);
	}
	//添加我的喜欢
	public function addFavorite(){
		if(IS_LOGIN) 
        {
            $uid = getUserInfo('id');
            if(isset($_POST['pid']) && $_POST['pid'] > 0)
            {
                $pdata['pid'] = $_POST['pid'];
                $pdata['uid'] = $uid;
                $count = M('Sfavorite')->where($pdata)->count();
                if(!$count)
                {
                    $pdata['ctime']=time();
                    $fid = M('Sfavorite')->add($pdata);
                    $data['res'] = true;
                }
                else $data['res'] = false;
            }
            else
            {
                $id = $_POST['id'];
                $map['id']=array('in',$id);
                $res=M('Shopcart')->field('pid')->where($map)->select();
                foreach ($res as $k=>$v) {
                    if($v['pid']!=0){
                        $pdata['pid']=$v['pid'];
                        $pdata['uid']=$uid;
                        $count=M('Sfavorite')->where($pdata)->count();
                        if($count>1){//避免重复添加
                             $savedata['ctime']=time();
                            $count=M('Sfavorite')->where($pdata)->save($savedata);
                        }else{
                            $pdata['ctime']=time();
                            M('Sfavorite')->add($pdata);
                        }
                    }
                }
                $data['res']=true;
            }
        }
        else
        {
            $data['res'] = false;
            $data['errcode'] = 1;
        }
		echo json_encode($data);
	}
	//购物车 删除
	public function deleshopcart(){
		$data['result']=true;
		$data['res']=true;
        $cookie = getUserCookie ();
		if(IS_LOGIN) 
        {
            $uid = getUserInfo('id');
            $map = array('uid'=>$uid);
            $map['uid'] = $uid;
        }
        else $map['cookie'] = $cookie;
        
		$map['pid']  = $_POST['id'];
		$data['res'] = M('Shopcart')->where($map)->delete();
		echo json_encode($data);
	}
	
	//newgoods
	public function newgoogs(){
		$goodsurl=$_POST["goodsUrl"];
		$data["data"]=$this->getGoods($goodsurl);
		$data["result"]=true;
		echo json_encode($data);
	}
	//newgoods add
	public function newGoodsAdd(){
		$datas['result']=false;
		$datas['info']=null;
		$uid=getUserInfo('id');
		$goodsurl=$_POST["goodsUrl"];
		$num=$_POST['num'];
		$res=$this->getGoods($goodsurl);
		$info['name']=$res['title'];
		$info['pic']=$res['pic_url'];
		$info['price']=$res['price'];
		$info['freight']=$res['post_fee'];
		$info['sku']=$res['num'];
		$info['shopname']=$res['nick'];
		$info['click']=$res['detail_url'];
		$addres=$this->addprod($res);//入库
		//添加到购物车
		$map['pid']=0;
		$map['uid']=$uid;
		$cres=M('Shopcart')->where($map)->select();  //判断是否重复
		$thisid=0;
		foreach ($cres as $k=>$v) {
			$cres[$k]['info']=unserialize($cres[$k]['info']);
			if($cres[$k]['info']['name']==$res['title']){
				$thisid=$cres[$k]['id'];
				break;
			}
		}
		if($thisid==0){
			if($addres){
				$data['pid']=$addres;
			}else{
				$data['pid']=0;
			}
			$data['number']=$num;
			$data['uid']=$uid;
			$data['info']=serialize($info);
			$data['ctime']=time();
			$resx=M('Shopcart')->add($data);
		}else{
			$resx=M('Shopcart')->where("id=".$thisid)->setInc('number',$num);
		}
		
		if($resx){
				$info['number']=$num;
				$datas['info']=$info;
			   $datas['result']=true;
		 }
		echo json_encode($datas);
	}
    
	//添加到prod
	public function addprod($res)
    {
	    $calss2 = prodClass();
	    $arr = array();
		foreach ($calss2 as $k=>$v) 
        {
			if($v["bak3"]==$res["cid"])
            {
				$arr["id"]=$v["id"];
				$arr["pid"]=$v["pid"];
				break;
			}
		}
		if(!empty($arr))
        {
            $data['name'] = strip_tags($res['title']);
			$coun=M("Prod")->where($data)->count();
			if($coun<=0)
            {
                $data['cid']=$res['cid'];
	     	  	$data['name']=strip_tags($res['title']);
		     	$data['pic']=$res['pic_url'];
		     	$data['ctype'] = $arr["pid"];
		     	$data['ctype2']  = $arr["id"];
		     	$data['status']  = 1;
		     	$data['freight'] = $res['post_fee'];
		     	$data['shopname']  = $res['nick'];
		     	$data['price']     = $res['price'];
		     	$data['recommend'] = 0;
		     	$data['ctime']     = time();
		     	return M('Prod')->add($data);
            }
		}
		return false;
	}
    
	//淘宝抓取
	public function getGoods($goodsurl){
		//$goodsurl=explode("id=", $goodsurl);
		//zs-2015-3 修改
		$params= $this->getUrlParams($goodsurl);
		$id = $params['id'];
		
		$tao=getOption('tao');
		$c = new TopClient;
		$c->appkey = $tao['AppKey'];
		$c->secretKey =$tao['AppSecret'];
		$req = new ItemGetRequest;
		$req->setFields("detail_url,num_iid,title,nick,type,cid,seller_cids,props,input_pids,input_str,desc,pic_url,num,valid_thru,list_time,delist_time,stuff_status,location,price,post_fee,express_fee,ems_fee,has_discount,freight_payer,has_invoice,has_warranty,has_showcase,modified,increment,approve_status,postage_id,product_id,auction_point,property_alias,item_img,prop_img,sku,video,outer_id,is_virtual");
		$req->setNumIid($id);
		$resp = $c->execute($req, $sessionKey);
	    $res=(array)$resp->item;
	    return $res;
	}
	/*
	 * @title 获取淘宝商品Id
	 * @author icubit
	 * @date 2015-3-18
	 * @version 1.0
	 */
	public function getUrlParams($goodsurl){
		$params = array();
		$postfix = explode('?', $goodsurl);
		$values = explode('&', $postfix[1]);
		foreach ($values as $v){
			$kv = explode('=', $v);
			$params[$kv[0]] = $kv[1];
		}
		
		return $params;
	}

    //支付
	public function payment(){
		$data['result']=false;
		$data['msg']=0;
		$cres=false;
		$id=$_POST['id'];
		$uid=getUserInfo('id');
		$res=M("Order")->where("id=".$id)->find();
		$total=$res['total'];
		$total=$total;
		$cion=getCredit($uid);
		if($cion['coin']>=$total){
			if($res['status']==0){
				$cres=coin($uid,-$total,'订单支付');
				
			}else{
				$data['msg']=2;//支付错误
			}
		}else{
			$data['msg']=1;//余额不足
		}
		
		if($cres){
			$core['status']=1;
			$resu=M("Order")->where("id=".$id)->save($core);
			point_sell($uid, "spending", $total, 'The payment');//增加积分
			if($resu)$data['result']=true;
			else $data['msg']=3;
		}
		echo json_encode($data);
	}
    
	//退款
	public function refund(){
		$data['result']=false;
		$id=$_POST['id'];
		$core['status']=13;
		$resu=M("Order")->where("id=".$id)->save($core);
		if($resu){
			$ress=M("Order")->where("id=".$id)->find();
			$po = M('PayOrder')->where("oid=".$ress['id'])->find();
			$remenoy = 0;
			if($ress['status']>6){
				$remenoy = ($ress['total']+$ress['wl']['price']);
			}else{
				$remenoy = $ress['total'];
			}
			if($po){
				// 交易流水
				$data['no'] = $this->creatno();
				$data['uid'] = $ress['buyer'];
				$data['oid'] = $ress['id'];
				$data['method'] = $po['method'];
				$data['money']  = $remenoy;
				$data['fees']  = 0;
				$data['ctype']  = 1;
				$data['status'] = 0; 
				$data['ctime']  = time();
				M('PayOrder')->add($data);
			}
			point($ress['buyer'], -$remenoy,"退款退还","Refund return ");
			$data['result']=true;
		}
		echo json_encode($data);
	}
    
	//只付邮费
	public function payPostages(){
		$data['result']=false;
		$data['msg']=0;
		$cres=false;
		$id=$_POST["id"];
		$yf=round($_POST["yf"]*currency(),2);
		$uid=getUserInfo('id');
		$cion=getCredit($uid);
		if($cion['coin']<$yf){
			$data['msg']=1;//余额不足
		}else{
			$cres=coin($uid,-$yf,'订单支付');
		}
		if(!$cres){
			$data['msg']=2;//支付失败
		}else{
			$resx=M('Order')->where("id=".$id)->setInc('status');
			if($resx){
				point_sell($uid, "spending", $yf, 'Pay postage ');//增加积分
				$data['result']=true;
			}else{
				$data['msg']=3;//更新状态失败
			}
		}
		echo json_encode($data);
	}
    
	//确认收货
	public function isReceipt(){
		$id=$_POST["id"];
		$resx=M('Order')->where("id=".$id)->setInc('status');
		$map['oid']=$id;
		$map['pid']=array('neq',0);
		$res=M('OrderProd')->where($map)->select();
		foreach ($res as $k=>$v) {
			M('Prod')->where("id=".$v['pid'])->setInc('sold',$v['num']);
		}
		if($resx){
			$data['result']=true;
		}else{
			$data['result']=false;
		}
		echo json_encode($data);
	}
    
	//评论
	public function evalu(){
		$add=false;
		$data['result']=false;
		$data['msg']=0;
		$user=getUserInfo();
		$id=$_POST['id'];
		$map['oid']=$id;
		$map['pid']=array('neq',0);
		$res=M('OrderProd')->where($map)->select();
		if(!$res){
			$add=true;
		}else{
			foreach ($res as $k=>$v) {
				$datas['oid'] = $res[$k]['pid'];
				$datas['uid']=$user['id'];
				$datas['status']=1;
				$datas['uname']=$user['account'];
				$datas['score']=$_POST['score'];
				$datas['content']=$_POST['comm'];
				$datas['ctime']=time();
			    $where['oid'] = $datas['oid'];
				$where['uid'] = $datas['uid'];
				$res = M('Comment')->where($where)->select();
				if(!$res){//防止重复评论（刷新）
					$add[] = M('Comment')->add($datas);
					M('Prod')->where("id=".$res[$k]['pid'])->setInc('evaluation');
				}else{
					 $data['msg']=1;//已经评论过
				}
			}	
		}
		if($add){
		    $resx=M('Order')->where("id=".$id)->setInc('status');
			if($resx){
				point_each($user['id'], 'comment', 'Review integral ');//增加积分
				$data['result']=true;
			}else{
				$data['msg']=2;//状态更新失败
			}
		}	
		
		echo json_encode($data);
	}
	//addFavouriteToCar
	public function addFavouriteToCar(){
		$data['result']=false;
		$uid=getUserInfo('id');
		$id=$_POST['id'];
		$map['id']=array('in',$id);
		$res=M("Prod")->field("id,name,pic,price,freight,shopname,shopclick as click,recommend,sku")->where($map)->select();
		$result=array();
		foreach ($res as $k=>$v) {
			$datas['uid']=$uid;
			$datas['pid']=$v['id'];
			$count=M('Shopcart')->where($datas)->count();
			if($count>0){
				$result[]=0;
			}else{
				$datas['number']=1;
				$datas['ctime']=time();
				$datas['info']=serialize($res);
				M('Shopcart')->add($datas);
				$result[]=1;
			}
		}
		if(in_array(1, $result)){
			$data['result']=true;
		}
		echo json_encode($data);
	}
	//deleFavourite
	public function deleFavourite(){
		$data['result']=false;
		$uid=getUserInfo('id');
		$id=$_POST['id'];
		$map['pid']=array('in',$id);
		$map['uid']=$uid;
		$res=M("Sfavorite")->where($map)->delete();
		if($res){
			$data['result']=true;
		}
		echo json_encode($data);
	}
	//addFavou
	public function addFavousx(){
		$data['result']=false;
		$data['msg']=0;
		$map["pid"]=$_POST["id"];
		$map["uid"]=getUserInfo('id');
		$count=M('Shopcart')->where($map)->count();
		if($count>0){
			$data['msg']=1;
		}else{
			$datas['pid']=$_POST["id"];
			$datas['uid']=getUserInfo('id');
			$res=M("Prod")->field("name,pic,price,freight,shopname,shopclick as click,recommend,sku")->where("id=".$_POST["id"])->find();
			$datas['number']=1;
			$datas['ctime']=time();
			$datas['info']=serialize($res);
			$addres=M('Shopcart')->add($datas);
			if($addres){
				$data['result']=true;
			}else{
				$data['msg']=2;
			}
		}
		echo json_encode($data);
		
	}
	//积分兑换
	public function changePoint(){
		$data["iscoupons5"]=false;
		$data["iscoupons10"]=false;
		$data["iscoupons20"]=false;
		$data["iscoupons50"]=false;
		$data["result"]=true;
		$uid=getUserInfo("id");
		$res=M("UserCredit")->field("point")->where("uid=".$uid)->find();
		$pro=getOption("busy","user_point_xs");
		if(empty($res) || empty($pro)){
			$data["result"]=false;
		}
		if($res["point"]>=($pro*5)){
			$data["iscoupons5"]=true;
		}
    	if($res["point"]>=($pro*10)){
    		$data["iscoupons10"]=true;
		}
	    if($res["point"]>=($pro*20)){
	    	$data["iscoupons20"]=true;
		}
    	if($res["point"]>=($pro*50)){
    		$data["iscoupons50"]=true;
		}
		echo json_encode($data);
	}
	public function exchangeDo(){
		$data["result"]=false;
		$uid=getUserInfo("id");
		$Par=$_POST["vals"];
		$pro=getOption("busy","user_point_xs");
		$res=point($uid, -($pro*$Par),"积分兑换","Point exchange ");
		if($res){
			$resc=coin($uid, $Par,"积分兑换","Point exchange ");
			if($resc){
				$data["result"]=true;
			}else{
				point($uid, $pro*$Par,"兑换失败","Exchange failure ");
			}
		}
		$coin=getCredit($uid);
		$data["point"]=$coin["point"];
		$data["coin"]="$ ".round($coin["coin"]/currency(),2);
		echo json_encode($data);
		
	}
	//体现取消
	public function withdrawRefund(){
		$data["result"]=false;
		$id=$_POST["id"];
		$res=M("PayOrder")->where("id=".$id)->delete();
		if($res){
			$data["result"]=true;
		}
		echo json_encode($data);
	}

	//创建用户订单号方法
	protected  function creatno(){
		while(true){
			$no = date('ymdHis').rand(10, 99).rand(10,99);
			$rs = M('PayOrder')->where('no='.$no)->find();
			if(!$rs) return $no;
		}
	}
}