<?php
class AdminGroupModel extends Model
{
	protected $_auto = array(
	    array('timeline','time',1,'function'),
    	array('orders','add_order',1,'callback'),
	);	
	protected $_validate = array(
		array('groupname','require','请填写分组名!'),
		array('groupname','','分组名已经存在!',0,'unique',1),
		array('intro','require','请填写备注，以说明该分组作用!'),
	);
	
	//如果没有填排序，则默认排序为1
	protected function add_order()
	{
		if ($_POST['orders'] == '')
		{
			return 1;
		} else {
			return $_POST['orders'];
		}
	}
}