<?php
class IteamViewModel extends ViewModel 

{

 public $viewFields = array(
	'Info'=>array('name'=>'iname','id'=>'iid','top','sort'=>'isort','status'=>'istatus','ctime'=>'ictime'),
	'Item'=>array('ename','_on'=>'Info.pid=Item.id','_string'=>'ename=help_rules'),
 );
}
?>