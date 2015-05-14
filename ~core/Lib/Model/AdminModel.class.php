<?php
import("Think.Core.Model.AdvModel");
class AdminModel extends AdvModel
{
	// 自动填充规则
	var $_auto = array(
		array("password","md5",self::MODEL_BOTH ,"function"),
		array("login_time","time",self::MODEL_BOTH,"function"),
		array('status','1',self::MODEL_INSERT),
	);

	// 自动校验规则
	var $_validate = array(
		array('account','isPassword','帐号格式错误（6-12的字母、数字、下划线的组合）',0,'callback',1),
		array('password','isPassword','密码长度不对(6-12)', 0 ,'callback',self::MODEL_BOTH),  //  自定义函数验证密码格
		array('repwd','password',' 密码不一致 ', 0 , 'confirm'),  //  验证确认密码是否和密码一致
		array('account','','帐号名称已经存在！',0,'unique',1),
	);

	protected function isPassword($pwd)
	{
		if(preg_match("/^[0-9a-zA-Z_]{6,12}$/",$pwd)) return true;
		return false;
	}
}
?>