<?php
class TicketAction extends AdminBaseAction{
	//
	public function index(){
		if(isset($_GET['status']) && $_GET['status'] > 0) $map['department'] = $this->_get('status','intval');
	 	if(isset($_GET['id']) && $_GET['id'] != '用户名/邮箱') 
        {
        	$key = $this->_get('id');
        	if(CheckEmail($key)) { 
        		$map['email'] = $key;
        	}else{ 
        		$map['name'] = intval($key);
        	}
        }
	    if(isset($_GET['stime'])){
	        $stime =strtotime( $_GET['stime']);  $stime1 =strtotime( $_GET['stime1']);
	        if($stime>$stime1){
	        	$this->_error('输入时间有误');
	        }else if ($stime==$stime1){
	        	$stime1=$stime+24*3600;
	        	$map['ctime']=array(array('gt',$stime),array('lt',$stime1));
	        }else{
	        	$map['ctime']=array(array('gt',$stime),array('lt',$stime1));
	        }
        }      
		
		$res=M("Ticket")->where($map)->select();
		foreach ($res as $k=>$v) {
			$res[$k]["pic"]="data/ticke/".$v["id"]."/smll_face.jpg" ;
		}
		$this->assign("list",$res);
		$this->display();
	}
	
	public function CheckEmail($email)
	{
	    return eregi("^[0-9a-z][a-z0-9\._-]{1,}@[a-z0-9-]{1,}[a-z0-9]\.[a-z\.]{1,}[a-z]$", $email);
	} 
	//
	public function datail(){
		$this->assign("id",$_GET['id']);
		$this->display();
	}	
}