<?php
// ===========================================
/*
一、首先调用检查权限的函数判断下权限
		$this->checkAdminAuth(__CLASS__, __FUNCTION__);
		
二、然后直接调用
		$this->addLog();

三、如果是在Admin项目下可以使用快捷方式
		$admin = A('Admin');
		$admin->log('操作内容');
		
四、 如果是其他项目
		import("@.Action.Admin.AdminAction");
		$admin = new AdminAction();
		$admin->log('操作内容');
	
*/
// ===========================================


/**
 * 日志 处理 模型
 * 
 * @date 2012-1-7
 * @author romic
 */
class AdminLogModel extends Model
{
	// 自动填充规则
	protected $_auto = array(
		array('id' ,'', self::MODEL_INSERT, 'string'),
	);

	// 自动校验规则
	protected $_validate = array(
		array('content','require','操作内容不能为空！'),
	);
}
?>