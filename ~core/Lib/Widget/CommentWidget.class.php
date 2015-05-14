<?php
/*
 * 用户评论
 */
class CommentWidget extends Widget{
	public function render($data){
		$model = M('Comment');
		$list = $model->order('id desc')->limit('0,6')->select();
		$arr=array();
	    foreach($list as $k=>$v){
         $touxiang=getuserhead($list[$k]['uid'], 'middle');
			$list[$k]['uid']= $touxiang;
		}
		$data['list'] = $list;
		return $this->renderFile('index',$data);
	}
}