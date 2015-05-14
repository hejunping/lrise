<?php

class SettingsAction extends UserAction {

    //成员设置
  
    public function address(){   
    	$id = getUserInfo('id');
    	$address = M("UserAddress");                 
        $map=array('uid'=>$id);     
        $add=$address->where($map)->select();      
        $country = getCountry();
        $this->assign('Area',$country);     
        $this->assign('id',$id);
        $this->assign('list',$add); 
        //dump($id);            
		$this->display();
    }    
    public function updateaddress(){
    	 $data['result']=false;                                                  
         $id = getUserInfo('id');
    	 $address=M('UserAddress');                        	                        
         $datas['country']=$_POST['countryName'];
         $datas['uid']=$id;
         $datas['name']=$_POST['receiptName'];
         $datas['city']=$_POST['cityName'];
         $datas['prov']=$_POST['provinceName'];
         $datas['phone']=$_POST['phone'];
         $datas['address']=$_POST['address'];
         $datas['pcode']=$_POST['zipCode'];
         $datas['ctime']=time();
         if($id){
         	 $map=array();
             $map=array(uid=>array('in',$id));
             $ids=$address->where($map)->field('id')->find();                   
         	 $coun=$address->where($map)->count();        
         	if($coun>5){
         		 
         		$cres=$address->where($map)->save($datas);
         		 $ids=$address->where($map)->field('id')->find();
         		if($cres){
         			$data['result']=true;
         		}        		         		        		                          
         	}else{
         		$address->create();
         		$res=$address->add($datas);
         		 $ids=$address->where($map)->field('id')->find(); 
         		if($res){        	
         		$data['result']=true;         		
         		       }	         			
         	     	}         		
                 }
                 echo  json_encode($data);
         	 }   
         	 
         	 
        function  save(){
        $data['result']=false;         
        $id=getUserInfo('id');
         $datas['uid']=$_POST['userId'];
         $datas['country']=$_POST['countryName'];
         $datas['name']=$_POST['receiptName'];
         $datas['city']=$_POST['cityName'];
         $datas['prov']=$_POST['provinceName'];
         $datas['phone']=$_POST['phone'];
         $datas['address']=$_POST['address'];
         $datas['pcode']=$_POST['zipCode'];
         $datas['ctime']=time();
         $userid = getUserInfo('id');
    	 $address=M('UserAddress');        
         $map=array();
         $map=array('uid'=>$userid);
         $cres=$address->where($map)->save($datas);
         if($cres){
         	 $data['result']=true;
         }
         echo json_encode($data);
         	 }                  
 
    	
    public function delete()
    {
    	
    
    	$ids=$_POST['id'];
        $map=array('id'=>$ids);
    	$address = M("UserAddress");
    	$res=$address->where($map)->delete();
  	    if($res){
   		$data['result']=true; 
   		 	
  	    }
    	echo  json_encode($data);
    }       
    
    public function profile(){
   
    	$user=getUserInfo();
    	$img=getUserImg($user['id'], "smll");
    	$country = getCountry();
    	$co['id']=$user['id'];
    	$list=M('User')->where($co)->find();
    	$res=$this->getExtendInfo($user['id']);
//     	dump($res);die;
    	$this->assign("list",$list);
    	$this->assign("img",$img);
    	$this->assign("res",$res);    
    	$this->assign('Area',$country);	   	
    	$this->display();
    }

    public function ziliaoc(){
    	$user=getUserInfo('id');
    	$users=M('User');
    	$co['id']=$user;
    	if(!empty($_POST['Name'])){
	    	$datai[0][0]='rname';
	    	$datai[1][0]=$_POST['Name'];
	    	$this->setExtendInfo($user, $datai);
    	}
      if(!empty($_POST['Post'])){
	    	$datai[0][0]='pcode';
	    	$datai[1][0]=$_POST['Post'];
	    	$this->setExtendInfo($user, $datai);
    	} 
    	
       if(!empty($_POST['Phone'])){
    		$datai[0][0]='phone';
	    	$datai[1][0]=$_POST['Phone'];
	    	$this->setExtendInfo($user, $datai);
    	}
       if(!empty($_POST['CountryList'])){
    		$datai[0][0]='country';
	    	$datai[1][0]=$_POST['CountryList'];
	    	$this->setExtendInfo($user, $datai);
    	}
    if(!empty($_POST['City'])){
    		$datai[0][0]='city';
	    	$datai[1][0]=$_POST['City'];
	    	$this->setExtendInfo($user, $datai);
    	}
    if(!empty($_POST['Address'])){
    		$datai[0][0]='address';
	    	$datai[1][0]=$_POST['Address'];
	    	$this->setExtendInfo($user, $datai);
    	}
        $data['sex']=$_POST['sex'];
    	$co['id']=$user;
    	$this->thumb_del();
    	$reu=$users->where($co)->save($data);
    	
    	redirect(U('user/settings/profile'));
    }
    //修改密码
    public function changepwd()
    {
    	
    	$this->display();
    }
    
    //更新入库新密码
    public function newpwd()
    {
    	$model = M("User");
    	$ol=$_POST['originalPassword'];
    	$psd=$_POST['modifyPassword'];
    	$psd2=$_POST['remodifyPassword'];
    	$err = getUserInfo();
    	if($psd==$psd2){
    		if($err['password']==pwdEncrypt($ol)){
    			$co['id']=$err['id'];
    			$datas['password']=pwdEncrypt($psd);
    			$data=$model->where($co)->save($datas);    			 
    			redirect(U('user/settings/changepwd'));
    		}else{
    			$this->_error('Original password mistake');
    		}
    	}else {
    		$this->_error('The new password is not consistent');
    	}
    	
    }
    
     public  function changemail(){
     	$this->display();	
     }
     
    public function  newemail(){
    	$model = M("User");
    	$email=$_POST['originalEmail'];
    	$email1=$_POST['modifyEmail'];
    	$email2=$_POST['remodifyEmail'];
    	$err = getUserInfo();
    	if($email1==$email2){
    		if($err['password']==$email1){
    			$co['id']=$err['id'];
    			$datas['email']=$email2;
    			$data=$model->where($co)->save($datas);    			   				
    			$this->success("updated",U('user/settings/changemail'));
    			
    		}else{
    			$this->_error('Original password mistake');
    		}
    	}else {
    		    $this->_error('The new password is not consistent');
    	}   
    	
    }
     
    	
    public  function  checkpass(){
    	$user=getUserInfo();    
       $res=$_POST['originalPassword'];
       if($user['password']==md5($res)){
       	    $res=M('User')->select();
            $data['result']=$res;
           }
           echo json_encode($data);
         
    }
    //获取用户信息
    public  function getExtendInfo($uid){
    	$userinfo=M('UserInfo');
    	$co['uid']=$uid;
    	$list=$userinfo->where($co)->select();
    	$coun=count($list);
    	if($coun>0){
	    	for($i=0;$i<$coun;$i++){
	    		$data[$list[$i]['ename']]=$list[$i]['val'];
	    	}
	    	return $data;
    	}else{
    		return null;
    	}
    }
    //添加   更新  用户信息
   public function setExtendInfo($uid,$key=array()){
   	    $userinfo=M('UserInfo');
    	$co['uid']=$uid;
    	$coun=count($key[0]);
    	for($i=0;$i<$coun;$i++){
    		$co['ename']=$key[0][$i];
    		$value=$userinfo->where($co)->find();
    		$data['val']=$key[1][$i];
    		if(empty($value)){
    			$data['ename']=$key[0][$i];
    			$data['uid']=$uid;
    			$reu=$userinfo->add($data);
    		}else{
    			$reu=$userinfo->where($co)->save($data);
    		}
    	}
   }
	
    function recommend(){
    	$user=getUserInfo();
    	$co['id']=$user['id'];
    	$list=M('User')->where($co)->find();
    	$this->assign('list',$list);    
    	$this->assign("syspoint",getSysPoint("invited"));    	
        $this->display();
    }    
    function   sends(){
    	$ids=getUserInfo('id');
    	$user=M('User');
    	$map['email']=$_POST['toEmail'];
    	$count=$user->where($map)->count(); 
    	if($count>0){    
    	$this->error('This mailbox already registered!');
    	}	   	        
    	$email=$_POST['toEmail'];
    	$myhttp="Your friend to you recommend www.iorder.com this site, click the following address to register:<br/>";
	 	$myhttp.="http://".$_SERVER["SERVER_NAME"].U('home/user/reg?userid=$ids');
	 	$myhttp.="<br/>If you have any questions, please feel free to contact our customer service.";
	 	$title="Recommend a friend registration!";     	
     	$send=sendEmail($email, $title,$myhttp); 
     	    	 
     	if($send){
     		$this->success('Sent successfully!');
     	}else{
     	    $this->error('sent failure!');
     	}  	   	        	       	    	
    	}           	   	     	         
    public  function thumb_del()
	{    
		$uid=getUserInfo('id');
		$path = 'data/face/'.$uid.'/';
		$conf = array();
		$conf['maxsize'] = 5 * 1024 * 1024;                    //限制文件大小
		$conf['ext']     = array('jpg');    //限制文件类型
		$conf['path']    = $path;                              //缩略图存储路径
		$conf['name']='face';
		$conf['remove']  = true;                               //删除原图
		$conf['thumb']   = array(
				array('prefix'=>'smll_','width'=>80,'height'=>80),
				array('prefix'=>'mid_','width'=>100,'height'=>100),
				array('prefix'=>'big_','width'=>150,'height'=>150),
		);
		
		
		return $this->_upload($conf);
	}
  //文件上传处理
	public  function _upload($conf)
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
