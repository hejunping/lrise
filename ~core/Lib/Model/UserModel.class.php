<?php
import("Think.Core.Model.AdvModel");
class UserModel extends AdvModel
{
 	//验证设置
// 	protected $_validate = array(
// 		array("email","email","邮箱格式错误",2),
// 		array("account","","用户昵称已存在！",3,'unique'),
// 		array("password","6,12","密码应该为6-12位字符",1,'length',1),
// 		array("password","repwd","密码不一致",3,"confirm"),
// 		array("uname","","用户昵称已被占用",3,'unique'),
// 		array("email","","用户邮箱已被占用",2,'unique'),
// 		array("phone","","手机号已被占用",3,'unique'),
// 		array("email","require","邮箱必须填写",2),
// 	);
	
	//填充设置
	protected $_auto     =     array(
		array('group',15,1),
		array("status","statusa","1","callback"),
		array('time_vip',0,1),
		array('password','md5',3,'function'),
		array('time_reg','time',1,'function'),
		array('time_login','time',1,'function'),
		array('ip','',1),
		array('ipreg',"getips","1","callback")
	);
	
	protected function statusa(){
		$buys=getOption('busy');
		if(!$buys['busy_ismail']){
			return 0;
		}else{
			return 1;
		}
	}
	protected  function getips(){
		return getIp();
	}
		//更新之前自动掉用的函数 ，类似的还有（_before_insert）插入之前调用；
	protected function _before_update(&$data,$opts)
	{
		if(empty($_POST['password'])) unset($data['password']);
		return true;
	}
	 
}
?>