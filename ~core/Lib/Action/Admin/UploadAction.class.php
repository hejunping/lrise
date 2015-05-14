<?php
class UploadAction extends AdminBaseAction{
	public function index(){
		
		$this->display();
	}
	
	//上传文件插入数据库
	public function upfile(){
		$info = $this->upload();
		//dump($info);
		$model = M('Upfile');
		foreach($info as $v){
			$data['name'] = $v['name'];
			$data['path'] = $v['savepath'];
			$model->add($data);
		}
		redirect(U('admin/upload/index'));//跳到上传页面
	}
	//上传函数
	Public function upload(){
		import("ORG.Net.UploadFile");
		$upload = new UploadFile();// 实例化上传类
		$upload->maxSize  = 3145728 ;// 设置附件上传大小
		$upload->allowExts  = array('jpg', 'gif', 'png', 'jpeg','txt');// 设置附件上传类型
		$upload->savePath =  'data/Uploads/'.date('y_m/d/');// 设置附件上传目录
		//$upload->saveRule = time();
		$upload->autoSub = true;
		if(!$upload->upload()) {// 上传错误提示错误信息
			$this->error($upload->getErrorMsg());
		}else{// 上传成功 获取上传文件信息
			$info =  $upload->getUploadFileInfo();
			return $info;
		}
	 }
}