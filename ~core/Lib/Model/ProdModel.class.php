<?php
import("Think.Core.Model.AdvModel");
class ProdModel extends AdvModel
{
	//验证设置
	protected $_validate = array(
		array('name','require','商品名称不能为空！')
	);
	
	//填充设置
	protected $_auto     =     array(
		array('utime','time',2,'function')
	);
}
?>