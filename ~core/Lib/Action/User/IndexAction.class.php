<?php
class IndexAction extends UserAction {
    public function index(){
    	$cache1='_userindexnews';
    	$cache2='_userindexfaq';
    	$data['news'] = S($cache1);
    	$data['faq']=S($cache2);
       $user = getUserInfo();
       $ids=$user['id'];
       $mess=getCredit($ids);
       $res=M('Info');
       if(!$data['news'])
       {
            $map=array('status'=>'1','pid'=>'278');
            $data['news']=$res->where($map)->field('id,ctime,name,hot')->order('ctime desc')->limit("5")->select();
            S($cache1,$data['news'],300);
       }
       
       if(!$data['faq']){
            $map = array('status'=>'1','pid'=>'286');
            $data['faq'] = $res->where($map)->field('id,ctime,name')->order('ctime desc')->limit("5")->select();
	
			
			if($data['faq']) S($cache2,$data['faq'],300);
       }
             
       	$msg=M('Msg');
       	$map1=array('status'=>0,uid_get=>array('in',$ids));
       	$count1=$msg->where($map1)->count();
       
        $shopcart=M('Shopcart');
       	$map2=array(uid=>array('in',$ids));       	
       	$count2=$shopcart->where($map2)->count();
       	
       	$order=M('Order');
       	$map3=array('status'=>'5',buyer=>array('in',$ids));       	
       	$count3=$order->where($map3)->count();
       	
       	$map4=array('status'=>'9',buyer=>array('in',$ids));       	
       	$count4=$order->where($map4)->count();
       	//调用翻译 	       	                     
       	transLangs($data['news'],'news');
       $addr=M('UserAddress');
       $map=array(uid=>array('in',$ids));
       $info=$addr->where($map)->field('name,pcode,address')->find();
       $img=getUserImg($user['id'], "smll");
       $this->assign('img',$img);
       $this->assign('count1',$count1);
       $this->assign('count2',$count2);
       $this->assign('count3',$count3);
       $this->assign('count4',$count4);
       $this->assign('info',$info);
       $this->assign('res',$mess);
       $this->assign('faq',$data['faq']);
       $this->assign('tabo',$data['news']);
       $this->assign('user',$user);
       $this->display();
    }
}
?>