<?php

class CountAction extends AdminBaseAction {

    //strtotime('2012-05-25-23:45:16') 时间转为时间戳
    public function todaypai() {
       if(isset($_GET['stime'])){
	        $stime =strtotime( $_GET['stime']); 
	        $stime1 =strtotime( $_GET['stime1']);
	        if($stime>$stime1){
	        	$this->_error('输入时间有误');
	        }elseif ($stime==$stime1){
	        	$stime1=$stime+24*3600;
	        	$co['ctime']=array(array('gt',$stime),array('lt',$stime1));
	        }else{
	        	$co['ctime']=array(array('gt',$stime),array('lt',$stime1));
	        }
       } else{
         	$co['ctime']=array('gt',time()-30*24*3600);
       }
       $so=array();
       $so['status']=11;
       $order=M('Order')->field('id')->where($so)->select();
       $i=0;
       foreach($order  as $orders){
       	$ord[$i]=$orders['id'];
       	$i++;       
       }      
       $co=array(oid=>array('in',$ord));
       $rue= M('OrderProd')->field('SUM(num) as total,name,pid')->where($co)->group('pid')->select();
       $this->assign('rue',$rue);
       $this->display();

    }

    //显示商品详细信息
    public function view() {
        $pid=$_GET['pid'];
        $co['pid']=$pid;
         $rue= M('OrderProd')->where($co)->select();
         foreach ($rue as $k=>$v) {
         	$rue[$k]['pic']=sprintf('%.2f',$rue[$k]['mem']*$rue[$k]['price']);
         	$totl+=$rue[$k]['pic'];
         }
        $this->assign("rue",$rue);
        $this->assign("total",$_GET['total']);
        $this->assign("totl",sprintf('%.2f',$totl));

        $this->display();
    }

  

}