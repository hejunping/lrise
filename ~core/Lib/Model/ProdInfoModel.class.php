<?php
import("Think.Core.Model.AdvModel");
class ProdInfoModel extends AdvModel
{
	//验证设置
	protected $_validate = array(
		array('sn','require','商品编号不能为空！'), 
		array("sku","number","库存不是一个数字"),
		array("price","currency","价格设置有误"),
	);
	
	//填充设置
	protected $_auto     =     array(
		array('sku','abs',3,'function'),
		array('utime','time',2,'function')
	);
}
?>