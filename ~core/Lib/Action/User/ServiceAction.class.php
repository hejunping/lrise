<?php

class ServiceAction extends UserAction {

    //顾客服务

    function boxmessage() {
    	$user = getUserInfo();
    	$tab = $_GET['tab'];
    	import('@.ORG.Msg.Messages');
    	$msg = new Messages();
    	$comment = $msg->listNews($user['id'],10);
    	if($tab != 2){
    		$this->assign('tab1','true');
    	}else{
    		import("ORG.Util.Page");
    		$map['account'] = $user['account'];
    		$mapcount = M('Message')->where($map)->count();
            $Page = new Page($mapcount, 5);
            $Page->setConfig('first', 'first');
	        $Page->setConfig('prev', 'previous');
	        $Page->setConfig('next', 'Next');
	        $Page->setConfig('last', 'last');
	        $Page->setConfig('theme', '%first% %upPage%  %linkPage% %downPage% %end%');
    		$res = M('Message')->order("id desc")->limit($Page->firstRow . ',' . $Page->listRows)->where($map)->select();
    		$img=getUserImg($user["id"], "smll");
    		$admin_img = "web/images/admin/admin.jpg";
    		foreach ($res as $k=>$v){
    			$res[$k]["U_img"]=$img;
    			$res[$k]['A_img']=$admin_img;
    		}
    		$show = $Page->show();
    	    $this->assign('page', $show);
    		$this->assign("res",$res);
    	}
    	$this->assign('comment',$comment);
        $this->display();
    }

    function delmessage(){
    	$id = $_POST['id'];
    	import('@.ORG.Msg.Messages');
    	$msg = new Messages();
    	$res = $msg->DeleNews($id);
    	if($res){
    		$data['result'] = true;
    		echo json_encode($data);
    	}
    }
    
    function getnew(){
    	$id = $_POST['id'];
    	$msg = M('Msg');
    	$map['id'] = $id;
    	$new = $msg->where($map)->find();
    	if($new){
    		$map['status'] = 1;
    		$map['id']     = $id;
    		$msg->where($map)->save();
    		$data['result'] = true;
    		$data['news'] = $new;
    		$data['link'] = U('home/info/index','id='.$id);
    		echo json_encode($data);
    	}else{
    		$data['result'] = false;
    		echo json_encode($data);
    	}
    }
    
    function question(){
    	$user = getUserInfo();
    	$data['account']      = $user['account'];
    	$data['email']        = $user['email'];
    	$data['Department']   = $user['group'];
    	$data['ctime']        = time();
    	$content = $_POST['content'];
    	if($content){
    		$data['content'] = $content;
    		$message = M('Message');
    		$res = $message->add($data);
    		if($res){
    			$data['result']  = true;
    			$data['content'] = $content;
    			echo json_encode($data);
    		}else{
    			$data['result'] = false;
    			echo json_encode($data);
    		}
    	}
    }
    function ticketsubmit() {
    	$istrue=$_GET["istrue"];
    	if($istrue==2){
    		$this->assign("res",$istrue);
    	}else{
    		$this->assign("res",0);
    	}
        $this->display();
    }
    public function tickedo(){
    	$data["name"]       = $_POST["name"];
    	$data["email"]      =  $_POST["email"];
    	$data["idacount"]   =  $_POST["ids"];
    	$data["title"]      =  $_POST["Title"];
    	$data["department"] =  $_POST["department"];
    	$data["content"]    =  $_POST["content"];
    	$data["ctime"]      =  time();
    	$res=M("Ticket")->add($data);
    	$zres=$this->thumb_del($res);
    	 if($res){
    	 	
    	 	redirect(U('user/service/ticketsubmit',array("istrue"=>2)));
    	 }else{
    	 	$this->_error("Error Please try again ");
    	 }
    	
    }
    
   public  function thumb_del($res)
	{    
		$uid=getUserInfo('id');
		$path = 'data/ticke/'.$res.'/';
		$conf = array();
		$conf['maxsize'] = 5 * 1024 * 1024;                    //限制文件大小
		$conf['ext']     = array('jpg');    //限制文件类型
		$conf['path']    = $path;                              //缩略图存储路径
		$conf['name']='face';
		$conf['remove']  = true;                               //删除原图
		$conf['thumb']   = array(
				array('prefix'=>'smll_','width'=>800,'height'=>800),
		);
		return $this->_upload($conf);
		
	}
	//文件上传处理
	public   function _upload($conf)
	{
		import("ORG.Net.UploadFile");
		$upload = new UploadFile();
		$upload->maxSize = $conf['maxsize'] ? $conf['maxsize'] : 2 * 1024 * 1024; // 上传文件大小
		$upload->allowExts = $conf['ext'] ? $conf['ext'] : array('jpg');
		if(!$conf['temp']) $upload->savePath = 'data/~temp/'.date('y/m/d/h/');
        else  $upload->savePath = $conf['temp'];
		if($conf['name']) $upload->saveRule = $conf['name'];
        else $upload->saveRule = "uniqid";
		$rs = array('type'=>0);
        if($conf['empty']) @del_dir($upload->savePath);
		if(!mk_dir($upload->savePath)) $rs['info'] = '权限不足，目录创建失败';
		else if(!$upload->upload()) $rs['info'] = $upload->getErrorMsg();
		else
		{
			$info = $upload->getUploadFileInfo();
            if($conf['mul'])
            { 
                //多文件缩略图处理
                if ($conf['thumb']) 
                {
                    if($conf['path'] != $conf['temp']) mk_dir($conf['path']);
                    foreach($info as $k=>$one)
                    {
                        $file = $info[$k]['savepath'].$one['savename'];
                        $info[$k]['path']  = $conf['path'];
                        $info[$k]['thumb'] = $this->_thumb ($conf,$file);
                        if ($conf['remove']) @unlink($file);
                    }
                }
            }
            else
            {
                $info = $info[0];
                $file = $info['savepath'].$info['savename'];
                if ($conf['thumb']) 
                {
                    if($conf['path'] != $conf['temp']) mk_dir($conf['path']);
                    $info['path'] = $conf['path'];
                    $info['thumb'] = $this->_thumb ($conf,$file);
                    if ($conf['remove']) @unlink($file);
                }
            }
            
            $rs['type'] = 1;
			$rs['info'] = '上传成功';
            $rs['file'] = $info;
		}
		return $rs;
	}
    
    /**
     * 根据配置生成缩略图
     * @param array  $conf   配置
     * @param string $source 原图路径
     * @return array 
     */
    public function _thumb($conf,$source)
    {
        import("ORG.Util.Image");
        $rs = array();
        foreach ($conf['thumb'] as $k => $thumb) 
        {
            if ($thumb['name']) 
            {
                $name = $conf['path'] . '/' . $thumb['name'];
                Image::thumb($source, $name, 'jpg', $thumb['width'], $thumb['height']);
            } 
            else 
            {
                $savename = basename($source);
                $prefix = $thumb['prefix'] ? $thumb['prefix'] : 'thumb' . $k . '_';
                $name = $conf['path'] . '/' . $prefix . $savename;
                Image::thumb($source, $name, 'jpg', $thumb['width'], $thumb['height']);
            }
            
            $rs[$k] = basename($name);
         }
         
         return $rs;
    }
	
}

?>
