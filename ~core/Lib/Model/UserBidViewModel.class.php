<?php
class UserBidViewModel extends ViewModel{
	public $viewFields = array(
	'UserBid'=>array('uid','ctime','status'=>'istatus','coin'),
	'Paiwu'=>array('id','pai_uid','name','consume','pid'=>'ipid','pai_uname','pic','ctype','ctype2','pai_price','price','end','start','_on'=>'UserBid.pid=Paiwu.id'),
    );
}