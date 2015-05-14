<?php
import("Think.Core.Model.AdvModel");
class WordModel extends AdvModel {
	//验证设置
	protected $_validate = array(
		array("name","require","词条不能为空！",1),
		array("ename","require","翻译不能为空！",1),
        array('name','','词条已经存在！',1,'unique',1), 
	);
	
	//填充设置
	protected $_auto     =     array(
		array('letter','getLetterName',self::MODEL_BOTH,'callback'),
	);
    
    //如果字段为空值，则返回null
    protected function getLetterName($val)
    {
        return getfirstchar($_POST['name']);
    }
}
?>