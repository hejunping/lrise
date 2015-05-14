<?php
import("Think.Core.Model.AdvModel");
class ItemModel extends AdvModel
{
	//验证设置
	protected $_validate = array(
		array("name","require","名称不能为空！",1),
		array("ename,pid,name","","结点已经存在",1,'unique'),
	);
	
	//填充设置
	protected $_auto     =     array(
		array('ctime','time',self::MODEL_INSERT,'function'),
		array('status',1,self::MODEL_INSERT),
		array('pid','intval',self::MODEL_BOTH,'function'),
		array('sort','intval',self::MODEL_BOTH,'function'),
		array('bak2','intval',self::MODEL_BOTH,'function'),
		array('utime',0,self::MODEL_INSERT),
		array('utime','time',self::MODEL_UPDATE,'function'),
	);
}
?>