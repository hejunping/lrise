<?php
import("Think.Core.Model.AdvModel");
class InfoModel extends AdvModel {
	//验证设置
	protected $_validate = array(
		array("name","require","标题不能为空！",1),
		array("text","require","内容不能为空！",1),
		array("ename","english","关键字必须为纯英文！",2),
        array('ename','','资讯关键字已经存在！',2,'unique',1), 
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
		array('ename','checkNull',self::MODEL_BOTH,'callback'),
	);
    
    //如果字段为空值，则返回null
    protected function checkNull($val)
    {
        if(empty($val)) return null;
        else return $val;
    }
}
?>