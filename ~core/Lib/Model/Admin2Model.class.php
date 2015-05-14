<?php
import("Think.Core.Model.AdvModel");
class AdminModel extends AdvModel
{
	//验证设置
	protected $_validate = array(
		array("name","require","管理员名称不能为空"),
		array("pwd","6,12","密码应该为6-12位字符",1,'length',1),
		array("pwd","repwd","密码不一致",2,"confirm"),
		array("name","","用户帐号已存在！",1,'unique')
	);
	
	//填充设置
	protected $_auto     =     array(
		array('status',1,1),
		array('sort',0,1),
		array('password','md5',2,'function'),
		array('ctime','time',1,'function'),
		array('utime',0,1)
	);
	
	//更新之前自动掉用的函数 ，类似的还有（_before_insert）；
	protected function _before_update(&$data,$opts)
	{
		if(empty($_POST['pwd'])) unset($data['pwd']);
		return true;
	}
}
?>