<?php
/**
 * 用户中心基础模块
 * @name birdy 
 * @email freebird110@qq.com 
 * @time 2012-3-10
 * @version 1.0
 */
abstract class UserAction extends FrontAction
{
	//用户中心初始化
	protected function _initialize()
	{
      	parent::_initialize();
        if(!IS_LOGIN && (MODULE_NAME != 'Order' || ACTION_NAME != "cart")) redirect(U('home/user/login'));
        $this->assign("_title","User Center");
	}
}
?>