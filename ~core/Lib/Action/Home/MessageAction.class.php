<?php
 class   MessageAction   extends   Action {
 	 public  function  index(){
 	 	 
 	 	$mess=M('Message'); 
 	 	import("ORG.Util.Page");
 	 	$count = $mess->count();
        if ($count > 0) {
            $page = new Page($count, 4);
            $list = $mess->field("account,rtitle,utime,reply_content,content")->limit($page->firstRow . "," . $page->listRows)->select();
            $this->assign('mess', $list);
            $this->assign('page', $page->show());	
 	        $this->display();
 	     }
 	 }
 public function insert(){ 
 	
     if($_SESSION['verify'] != md5($_POST['verify'])){
  
 	     redirect(U('home/message/index'),1,'verification code failure! 1 seconds to return to message page');
 	 }
 	    $data['account']=$_POST['account'];
 	    $data['phone']=$_POST['phone'];
 	    $data['email']=$_POST['email'];
 	    $data['number']=$_POST['number'];
 	    $data['Department']=$_POST['Department'];
 	    $data['title']=$_POST['title'];
 	    $data['content']=$_POST['content'];
 	    $data['ctime']=time();
 	    $map=array(account=>array('in',$data['account']),email=>array('in',$data['email']));
 	    $user=M('User');
 	    $list=$user->where($map)->field("account,email")->select();
 	    if(!empty($list)){
 	    	$model=M('Message');
 	    	$list2=$model->where($map)->field('account,email')->select();
 	    	if(empty($list2)){
 	 	$model=M('Message');
 	    $rs=$model->create();
 	   
 	 	if(!$rs){
             $this->error(redirect(U('home/message/index'),1,'Message failure! 1 seconds to return to message page'));
// 	 	$this->ajaxReturn($rs,'添加失败',0);
 	 		$rs=false;
 	 	 }else{
 	 		 $rs=$model->add($data);
 	 	
 	 	}
 	 	if($rs){
 	 		$this->success(redirect(U('home/message/index'),0,'Message success! 0 seconds to return to message page'));
 	 	
 	 	}else{
 	        $this->error(redirect(U('home/message/index'),1,'Message failure! 1 seconds to return to message page'));
 	 	//$this->ajaxReturn($rs,'添加失败',0);
 	 	}
 	    	}else{
 	 		
 	            $message=$model->where($map)->field("phone,number,Department,title,content")->save($data);
 	     if($message!==false){
 	     	  $this->success(redirect(U('home/message/index'),0,'Message success! 0 seconds to return to message page'));
 	          }else{
            redirect(U('home/message/index'),1,'Message failure! 1 seconds to return to message page');
            //$this->ajaxReturn($list2,'添加失败',0);
 	          }
 	     
 	    	}
 	    }else{
 	    	$this->error(redirect(U('home/message/index'),1,'Message failure! 1 seconds to return to message page'));
 	    	//$this->AjaxReturn($data,"留言失败",0);
 	      }
 	    }
 	 	
     Public function verify(){
	    // 导入Image类库
	    import("ORG.Util.Image");
	    Image::buildImageVerify();
	  }
	 }
 ?>