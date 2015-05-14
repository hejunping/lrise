<?php
class AuthModel extends Model
{
	protected $_auto = array(
		array('key', 'trim', self::MODEL_BOTH, 'function'),
    	array('name', 'trim', self::MODEL_BOTH, 'function'),
    	array('class_name', 'strtolower', self::MODEL_BOTH, 'function'),
    	array('method_name', 'strtolower', self::MODEL_BOTH, 'function'),
	);	
	protected $_validate = array(
		//array('key','require','请输入KEY值!'),
		array('name','require','请输入权限名字!'),
		array('name','','权限名已经存在!',0,'unique',1),
	);
}
?>