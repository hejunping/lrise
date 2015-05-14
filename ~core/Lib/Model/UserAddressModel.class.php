<?php
class UserAddressModel extends Model{
	
	protected $_validate = array(
		array("name","require","收件人名称不能为空"),
		array("pcode","number","邮编无效"),
		array("phone","number","手机无效"),
		array("pcode","6","邮政编码为六位",1,'length',3)
	);
	protected $_auto     =     array(
		array('ctime','time',1,'function')
	);
}