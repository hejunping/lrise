<?php
@import('@.ORG.Msg.Messages');
class MsgAction extends AdminBaseAction{
    public function index(){
    	$this->display();
	}
	public function sends(){
		
		$user=getUserInfo();
		$uid=explode(',',$_POST['uid_get']);
		$uid=array_diff($uid,array(''));
		$name=$_POST['name'];
		$info=$_POST['info'];
		$type=$_POST['type'];
		if(empty($uid)){$this->error("接受用户无效");}
		$mess=new Messages();
		$rue=$mess->SendNews($user['id'], $uid, $name, $info,$type);
		if($rue){
			if(!empty($_POST['read'])){
				redirect(U('admin/read/index'));
			}else{
				
				redirect(U('admin/msg/index'));
			}
		}else{
			$this->error("发送失败");
		}
	}
	
	public  function alluser(){
		$user='';
		$rue=M('User')->field('id')->select();
		foreach ($rue as $k=>$v) {
			$user=$user.$rue[$k]['id'].',';
		}
		$data['alluser']=$user;
		echo json_encode($data);
	}
}