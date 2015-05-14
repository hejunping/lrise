<?php
class  PaiwuViewModel extends ViewModel{
	
	public $viewFields = array(
	'UserBid'=>array('uid'=>'iuid','pid'=>'ipid','ctime'=>'ictime',),
	'Paiwu'=>array('id','pai_uid','name','pid','pic','ctype','ctype2','pai_price','price','end','_on'=>'UserBid.pid=paiwu.id and UserBid.uid=paiwu.pai_uid'),
    );
}