<?php

class UserAction extends FrontAction{
	
	public function login(){
		 if(IS_LOGIN) redirect (U("user/index/index"));
		$this->display();
	}
    
    public function active()
    {
        $uid = intval($_GET['id']);
        $user = M("User")->where('id='.$uid)->find();
        if($user)
        {
            if($user['status'] == "0")
            {
                $web = explode('@',$user['email']);
                $this->assign('email',$user['email']);
                $this->assign('web',$web[1]);
                $this->display();
            }
            else $this->error('Your account have actived already');
        }
        else $this->error('error para');
    }
    
    public function resent()
    {
        $uid = intval($_GET['uid']);
        $user = M("User")->where('id='.$uid)->find();
        if($user)
        {
            if($user['status'] == "0" && $this->email($user['email'],$user['id'])) sys_tips ("","y");
            else sys_tips('fail to send active link to your email');
        }
        else sys_tips ("fail to send active link to your email");
    }
	
    public function reg(){
        if(IS_LOGIN) redirect (U("user/index/index"));
		$this->display();
	}
	
	public function regTodo(){
		$data['result'] = true;
		$data['err']    = true;
		if($_POST['sign'] == 'false'){
		   //判断用户名是否注册 返回 Ajax接收
			if($_POST['account']){
				$map['account'] = $_POST['account'];
				$account = M('User')->where($map)->count();
				if($account > 0){
					$data['result'] = false;
				}
				echo json_encode($data);
			}
			//判断email是否注册 返回 Ajax接收
			if($_POST['email']){
				$map['email'] = $_POST['email'];
				$email = M('User')->where($map)->count();
				if($email > 0){
					$data['result'] = false;
				}
				echo json_encode($data);
			}
			
		    //判断code是否正确 返回Ajax接收
		    if($_POST['code']){
		        if($_SESSION['verify'] != md5($_POST['code'])){
		        	$data['result'] = false;
		        }
		        echo json_encode($data);
		    }
		}
		
		if($_POST['sign'] == 'true'){
			$model = D("User");
			if($model->create()){
				if($zid = $model->add()){
					$res = M('User')->where("id=".$zid)->find();
					$em = $this->email($res['email'],$res['id']);
					if($em){
						$data['result'] = true;
					}
				}else{
 					$data['result'] = false;
 					$data['msg'] = "数据添加失败";
				}
			}else{
				$data['result'] = false;
			}
			echo json_encode($data);
		}	
	}
	
	//验证邮件发送
	public function email($account,$user){
		$title  = "Welcome to register to ".getOption('website','website_name','Iorder');
		$myhttp = U('home/user/jihuo',array(sd=>$user),true,false,true);
		$content = "<a href=".$myhttp.">Click on the activate your account!</a><br/><br/>-------------------------------------------------------------------------<br/>This letter is a system notification email, please do not reply directly!<br/>-------------------------------------------------------------------------<br/><br/>Hope you will have a pleasant shopping experience!<br/><br/>Lrise<br/>";
		$ure = sendEmail($account,$title,$content);
		if($ure){
			return 1;
		}
		
	}
	//激活用户
	public function jihuo()
    {
		$id = $_GET['sd'];
		$model = M('User');
		$co['id'] = $id;
		$data['status']=1;
		$user = $model->field()->where($co)->find();
		if($user["status"]==1) $this->success("You have activated a ",U('home/user/login'));
        else
        {
			$reu = $model->where($co)->save($data);
	        if($reu)
	        {
	            ulogin($user,getIp(),'',1);
                $this->success("Activation success",U('user/index/index'));
	        }
            else $this->error('Activation fail');
		}
	}
	
	//找回密码
	public function getpwd(){
		
		$this->display();
	}

	//检查邮箱是否存在
	public function foremail(){
		if($_POST['email']){		  
				$map['email'] = $_POST['email'];
				$email = M('User')->where($map)->count();
				if($email > 0){
					$data['result'] = true;
				}
				echo json_encode($data);
	    }	    					
	}
	//找回密码next   
    public  function  forpassget(){
       if($_SESSION['verify'] != md5($this->_POST("captcha","trim"))) {
	        $this->error('Authcode error !');
	     }

	 	$email=$this->_POST("email","trim");
        $user=M('User')->field("id")->where('email="'.$email.'"')->find();
      
        $myhttp="Dear user!<br/><br/>-----------------------------------------------------------------------------------------<br/>We have received your Password Reset request!<br/>This letter is a system notification email, please do not reply directly!<br/>-----------------------------------------------------------------------------------------<br/><br/>Please click the following link to reset your password:<br/><br/>";
	 	$linkurl = "http://".$_SERVER["SERVER_NAME"].U('home/user/resultpwd',array(sd=>$user['id']));
        $myhttp .= "<a href='" . "$linkurl". "' target='_blank'>$linkurl</a>";
	 	$myhttp.="<br/><br/>If you have any questions, please feel free to contact our customer service.<br/><br/>Hope you are satisfied with our service!<br/><br/>Lrise<br/>";
	 	$title="Lrise:Get Your New Password!";
	 	$res=sendEmail($email, $title,$myhttp);
	 	$mailurl=explode("@", $email);
	 	$mailurl="http://mail.".$mailurl[1];
	 	if($res){
	 		$this->assign("email",$email);
	 		$this->assign("mailurl",$mailurl);
	 	}else{
	 		$this->error('failure!');
	 	}
	 	$this->display();
	 }
	public function resultpwd(){
		$sd=$this->_get("sd","trim");
		$this->assign("sd",$sd);
		$this->display();
	}
	
	public function pwdsave(){
		$data['password']=$this->_post("password","trim");
		$sd=$this->_post("sd","trim");
		$data['id']=$sd;
		$res=M("User")->save($data);
		if($res!=false){
			//$this->success("Success !",U('home/user/login'));
			$this->redirect("home/user/login");
		}else{
			$this->_error("System error please contact your administrator ");
		}
	}
	
	//重新发送
   public  function sendemail(){
	 	$email=$this->_POST("userEmail","trim");
		$user=M('User')->field("id")->where('email="'.$email.'"')->find();
        $myhttp="Please click the following link to reset your password:<br/>";
	 	$myhttp.="http://".$_SERVER["SERVER_NAME"].U('home/user/resultpwd',array(sd=>$user['id']));
	 	$myhttp.="<br/>If you have any questions, please feel free to contact our customer service.";
	 	$title="Get Your New Password!";
	 	//echo $email. ', '. $title. ', '. $myhttp;
	 	$res=sendEmail($email, $title, $myhttp);
	 	if($res){
	 		$data['result']=true;
	 	}else{
	 		$data['result']=false;
	 	}
	 	echo json_encode($data);
	 }


   //获取邮箱
	public function getemail(){
		$this->display();
	}
    //获得了 邮箱
    public function thisemail(){
    	$map["account"]=$this->_post("userName","trim");
    	$map["password"]=pwdEncrypt($this->_post("password","trim"));
        if($_SESSION['verify'] != md5($_POST['verifyImg'])) {
	        $this->error('Authcode error !');
	     }
    	$res=M("User")->field("email")->where($map)->find();
    	if($res){
    		$res=$res['email'];
    	}else{
    		$res=0;
    	}
    	$this->assign("res",$res);
    	//dump('1111111111111111111111');
    	$this->display();
    }
	
	
    public function logout()
    {
    	 $data['result']=false;
         ulogout();
         $data['result']=true;
         echo json_encode($data);
       
    }
    public  function logins()
    {
    	$data['result']=false;
    	$data['err']=true;
        $account = $_POST['email'];
        $password = $_POST['password'];
        $code=$_POST['code'];
       if($_SESSION['verify'] != md5($code)) { // TODO  !=
	       $data['err']=false;
	    }else{
		    $map = array();
	        $map['email'] = $account;
	        $map['password'] = pwdEncrypt($password);
	        $map['status'] = 1;
	        $model = M("User");
	        $user = $model->where($map)->find();
	        if($user)
	        {
	            ulogin($user,getIp(),'',$remember);
	          
	            $this->addshopcart($_POST['shopcart'],$user['id']);
	            $data['result']=true;        
	        }
	    }
        
        echo json_encode($data);
    }
    
    public function addshopcart($data,$uid){
    	$cooid=explode(",", $data);
		$count=count($cooid);
		$arr;
        for($i=0;$i<$count;$i+=2){
			  $datas['pid']=$cooid[$i];
			  $datas['uid']=$uid;
			  $count=M('Shopcart')->where($datas)->count();
			  if($count>0){
					$res=M('Shopcart')->where($map)->setInc('number',$cooid[$i+1]);
			  }else{
				  $datas['number']=$cooid[$i+1];
				  $datas['ctime']=time();
				  $resp=M("Prod")->field("name,pic,price,freight,shopname,shopclick as click,recommend,sku")->where("id=".$cooid[$i])->find();
				  $datas['info']=serialize($resp);
				  M('Shopcart')->add($datas);
			  }
		}
    }
    public function check(){
    	$data['username']=null;
    	$data['result']=false;
    	$user=getUserInfo();
    	$data['username']=$user['account'];
    	if($data['username']!=null){
    		$data['result']=true;
    	}
    	echo json_encode($data);
    }

    
//验证码
	Public function verify(){
	    // 导入Image类库
		ob_clean();
	    import("ORG.Util.Image");
	    Image::buildImageVerify(4,1,'png',96,22);
	  
	}
	
	

}
