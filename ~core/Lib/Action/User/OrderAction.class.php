<?php

class OrderAction extends UserAction {

    //我的订单
    public function index() {
        $this->display();
    }

    public function neworder() {
        
        $this->display();
      
    }
    // 我的购物车
    public function cart() {
        if(IS_LOGIN) 
        {
            $uid = getUserInfo('id');
            $map = array('uid'=>$uid);
            $priceTot = getCredit($uid);
            $map['_logic'] = "or";
        }
        else $priceTot['coin'] = 0;
        
        $map['cookie'] = getUserCookie ();
        
        import("ORG.Util.Page");
        $mapcount = M('Shopcart')->where($map)->count();
        $Page = new Page($mapcount, 10);
        $Page->setConfig('first', 'first');
        $Page->setConfig('prev', 'previous');
        $Page->setConfig('next', 'Next');
        $Page->setConfig('last', 'last');
        $Page->setConfig('theme', '%first% %upPage%  %linkPage% %downPage% %end%');
        
        $totl=0;
        $res = M('Shopcart')->order("id desc")->limit($Page->firstRow . ',' . $Page->listRows)->where($map)->select();

        if($res)
        {
            foreach ($res as $k=>$v) {
                $res[$k]['info']=unserialize($res[$k]['info']);
                $res[$k]['info']['recommend']=($res[$k]['info']['price']*$res[$k]['number'])+$res[$k]['info']['freight'];
                $totl+=$res[$k]['info']['recommend'];
            }
        }
       
        $show = $Page->show();
        //
        $address=M("UserAddress")->order('is_def DESC,ctime DESC ')->where("uid=".$uid)->select();
        $this->assign('address',$address);
        $this->assign('res',$res);
        $this->assign('totl',$totl);
        $this->assign('priceTot',$priceTot['coin']);
        $this->assign('page', $show);
        $this->assign("_title","Shopping Cart");
        $this->display();
    }
    //购买
    public function doCart(){
        $id=$_POST['selec'];
        $cz=array();
        $freight=array();
        $arr=array();
        $tot=0;
        foreach ($id as $k=>$v) {
            $arr[]=$id[$k];
            $cz[$k]['id']=$id[$k];
            $cz[$k]['pid']=$_POST['pid'.$id[$k]];
            $cz[$k]['name']=$_POST['name'.$id[$k]];
            $cz[$k]['pic']=$_POST['pic'.$id[$k]];
            $cz[$k]['msg']=$_POST['msg'.$id[$k]];
            $cz[$k]['num']=$_POST['num'.$id[$k]];
            $cz[$k]['price']= $_POST['price'.$id[$k]];
            $cz[$k]['freight']= $_POST['freight'.$id[$k]];
            $tot+= $cz[$k]['num']* $cz[$k]['price']+$cz[$k]['freight'];
        }
        
        $tot = $tot/currency(); // 美元
        
        // add order
        $addre=$_POST['address'];
        $oid=$this->orderAdd($cz, $tot, $addre);
        
        // clear cart
        if($oid){
            $this->cartDel($arr);
            redirect(U('user/order/choosepay?o='. $oid));
        }
        
        
    }
    //添加购买
    public function orderAdd($cz,$tot,$addre){
        $address=M("UserAddress")->field('name,prov,city,area,address,pcode,phone')->where("id=".$addre)->find();
        $uid=getUserInfo('id');
        $data['buyer']=$uid;
        $data['total']=$tot;
        $data['address']=serialize($address);
        $data['ctime']=time();
        $oid=M("Order")->add($data);
        if($oid){
            $res;
            foreach ($cz as $k=>$v) {
                $idata['pid']=$cz[$k]['pid'];
                $idata['name']=$cz[$k]['name'];
                $idata['pic']=$cz[$k]['pic'];
                $idata['mark']=$cz[$k]['msg'];
                $idata['price']=$cz[$k]['price'];
                $idata['freight']=$cz[$k]['freight'];
                $idata['num']=$cz[$k]['num'];
                $idata['oid']=$oid;
                $idata['uid']=$uid;
                $idata['ctime']=time();
                $res=M('OrderProd')->add($idata);
                if($res){
                    M('Prod')->where('id="'.$cz[$k]['pid'].'"')->setInc("sold",$cz[$k]['num']);
                }
            }
            return $oid;
        }
        return 0;
    }
    public function cartDel($arr){
        $map['id']=array('in',$arr);
        M("Shopcart")->where($map)->delete();
    }
    //我的订单
    public function myorder() {
        import("ORG.Util.Page");
        $type=$_GET['type'];
        if($type<16 && $type>=0 && !empty($type)){
            $map['status']=$type;
        }
        if(empty($type)){
            $type=16;
        }
        $map['buyer']=getUserInfo('id');
        $mapcount = M('Order')->where($map)->count();
        $Page = new Page($mapcount, 10);
        $Page->setConfig('first', 'first');
        $Page->setConfig('prev', 'previous');
        $Page->setConfig('next', 'Next');
        $Page->setConfig('last', 'last');
        $Page->setConfig('theme', '%first% %upPage%  %linkPage% %downPage% %end%');
        $res=M('Order')->order("id desc")->limit($Page->firstRow . ',' . $Page->listRows)->where($map)->select();
        foreach ($res as $k=>$v) {
           $res[$k]['utime']=M('OrderProd')->where('oid='.$res[$k]['id'])->select();
        }
        $show = $Page->show();
        $this->assign('page', $show);
        $this->assign('res',$res);
        $this->assign('type',$type);
        $this->display();
    }
    

    //订单状态改变
    public function changeStatus(){
        $status=$_GET['statu'];
        $data['status']=$status;
        $id=$_GET['id'];
        $res=M('Order')->where('id='.$id)->save($data);
        if($res){
            redirect(U('user/order/myorder'));
        }else{
            $this->error('Operation failure ！');
        }
    }
//计算器
    public function jsq(){
        $tot=$_GET['TotalMoeny'];
        $tot=substr($tot, 3);
        //dump($tot);
        $this->assign('tot',$tot);
        $this->display();
    }
    //我的包裹
    public function parcels() {
        import("ORG.Util.Page");
        if(isset($_GET['WMDateOfPayment'])){
            $stime=strtotime($_GET['WMDateOfPayment']);
            $stime2=strtotime($_GET['crEndDateTimeT']);
            if($stime>$stime2){
                $this->_error('input the wrong time');
            }elseif($stime==$stime2){
             $stime2=$stime+24*3600;
             $map['ctime']=array(array('gt',$stime),array('lt',$stime2));               
            }else{
             $map['ctime']=array(array('gt',$stime),array('lt',$stime2));
            }
            }else{
             $map['ctime']=array('gt',time()-30*24*3600);   
            }                   
        $map['status']=array('gt',5);
        $map['buyer']=getUserInfo('id');
        $mapcount = M('Order')->where($map)->count();
        $Page = new Page($mapcount, 10);
        $Page->setConfig('first', 'first');
        $Page->setConfig('prev', 'previous');
        $Page->setConfig('next', 'Next');
        $Page->setConfig('last', 'last');
        $Page->setConfig('theme', '%first% %upPage%  %linkPage% %downPage% %end%');
        
        $res=M('Order')->order("id desc")->limit($Page->firstRow . ',' . $Page->listRows)->where($map)->select();
        foreach ($res as $k=>$v) {
            $res[$k]["wl"]=unserialize($res[$k]["wl"])  ;
        }
        $show = $Page->show();
        $this->assign('page', $show);
        $this->assign("res",$res);
        $this->display();
    }
   //我喜欢的
    public function favorite() {
        $uid=getUserInfo('id');
        $res=D('SfavoriteProdView')->where("uid=".$uid)->select();
        $this->assign("res",$res);
        $this->display();
    }
    //重量计算
    public function tool(){
        $this->display();
    }
    
    // 选择付款方式
    public function choosepay() {
        $orderId = $_GET['o'];
        $uid = getUserInfo('id');
        $balance = getCredit($uid);
        
        $map = array('uid'=>$uid);
        $map['_logic'] = "or";
        $map['cookie'] = getUserCookie ();
        $total = 0;
        
        $order = M("Order")->where("id=".$orderId)->select();
        if($order) {
            $total = $order[0]['total'];
        }
        
        $this->assign('oid', $orderId);
        $this->assign('balance', $balance['coin']);
        $this->assign("total", $total);
        $this->display();
    }

}

?>