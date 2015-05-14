<?php
/**
 * testwidget
 */
class SelftestWidget extends Widget{
	public function render($data){
		//获取用户信息     $data['tpl']  $data['num']//取出的数据记录数
		$user = M('user');
		$data['userinfo'] = $user->limit($data['num'])->select();
		
		return $this->renderFile($data['tpl'],$data);
	}
}