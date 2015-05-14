<?php
/**
 * 商家审核
 */
class BusyAction extends AdminBaseAction{
	//未审核商家 
	public function index(){
		$check=D("UserShop");
	    $condition['status']=2;
    	$list=$check->where($condition)->select();
    	$this->assign("list",$list);
		$this->display();
	}
    //已审核商家
	public  function auditing(){
		$check=D("UserShop");
	    $condition['status']=1;
    	$list=$check->where($condition)->select(); 
		$this->assign("list",$list);
		$this->display();
	}
	
	//审核操作
	public function audit(){
		$check=M("UserShop");
		$id=$_GET['id'];
		$condition['id']=$id;
		
		$data['ctime']=strtotime("now");
		$data['status']=2;
		
		$check->where($condition)->save($data);
		$this->redirect('busy-auditing', array());
	}
	
}
?>