<?php
 class MessageAction extends Action{
    	
	    	 public function index(){
	    	 	
	    	 	$mess=M('Message');
	    	 	$res=$mess->select();
	    	 	$this->assign('list',$res);
	    	 	$this->display();
	    	 }
    	 
	        public function delete(){
	    	  
		    	if(isset($_GET['id'])){
		    		
		    		$id = $_GET['id'];
		    		$map['id'] = $id;
		    		$rs = M('Message')->where($map)->delete();
		    		if($rs){
		    			 
		    			redirect(U('admin/message/index'),0,'删除成功，返回留言管理页');
		    		}else{
		    			redirect(U('admin/message/index'),0,'删除失败，返回重试');
		    		}
		    	}
	    
	        }
        
	       public function reply(){
	   
			  $id = $_POST['id']; 
			  if(!empty($id)){
			  	  $book = M("Message");
				  $data['utime']=time();
			      $data['rtitle']='title';
			      $data['reply_content']=$_POST['content'];
			      $map=array('id'=>$id);
			      $list = $book->where($map)->field('utime','rtitle','reply_content')->save($data);
			      if($list >= 0){
			      	  redirect(U('admin/message/index'),1,'回复成功，返回留言管理页');
			      }else{
			      	  redirect(U('admin/message/cupdate'),1,'回复失败，返回重试');
			      }
			  }else{
			  	  redirect(U('admin/message/index'),1,'回复的留言不存在，返回留言管理页');
			  }
	
	      }
       
    	  public function cupdate(){
    		
	    		$id = $_GET['id'];
	    		$this->assign('id',$id);
	    		$this->display();
         }
    
    }


?>