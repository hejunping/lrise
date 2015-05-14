<?php
class AdminViewModel extends ViewModel
{
	public $viewFields=array(
		'Admin'=>array(
			'id','groupid','account','password','status','login_time'
		),
		'AdminGroup'=>array(
			'groupname',
			'_on'=>'Admin.groupid=AdminGroup.groupid'
		),
	);
}
?>