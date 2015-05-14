<?php
import("Think.Core.Model.AdvModel");
   class  MessageModel  extends  AdvModel{
   	protected $_validate = array(
   	    array("verify","require","验证码必须填写",1),
   	    array("account","reuqire","用户名必须填写",1),
   	    array("phone","reuqire","电话号码必须填写",1),
   	    array("number","reuqire","订单号必须填写",1),
		array("email","email","邮箱格式错误",3),
	    array("email","require","邮箱必须填写",3),
	    array('verify', 'checkVerify', '验证码错误！', 0, 'callback')
	    
	);
	
   	protected $_auto     =     array(
		array('ctime','time',3,'function'),
		array('utime','time',3,'function'),
	  );
   }
   ?>