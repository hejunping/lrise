<?php
class Messages {
	/*
	 * 发送消息方法
	 * @param $sender     发送者
     * @param $receiver   接受者 数组支持群发
	 * @param $title      发送内容标题
	 * @param $content    发送内容
	 */
	public function SendNews($sender,$receiver=array(),$title,$content,$ctype='普通消息'){
		$data = array();
		$res  = array();
	    $erre = array();
		$num = count($receiver);
	    $msg = M('Msg');
	    $user = M('User');
        $co = array();
	    $co['status']=1;
        if($sender > 0)
        {
            $co['id']=$sender;
            $nameSend = $user->field('account')->where($co)->find();
        }
        if(!$nameSend) $nameSend = array('account'=>getOption('website','website_name','乐拍网'));
	    for($i=0;$i<$num;$i++)
        {
	      	$co['id']=$receiver[$i];
	    	$nameGet=$user->field('account')->where($co)->find();
            if(!$nameGet) continue;
	      	$data['uid_send']=$sender;
	      	$data['uid_get']=$receiver[$i];
	      	$data['info']=$content;
	      	$data['name']=$title;
	      	$data['ctime']=strtotime('now');
	      	$data['ctype']=$ctype;
	      	$data['name_get']=$nameGet['account'];
	      	$data['name_send']=$nameSend['account'];
	      	$res = $msg->add($data);
	      	if(!$res) $erre[]=$res;
	    }
	   if($erre==null) return true;
       else return $erre;
	}
	/*
	 * 获取单条消息
	 * @param $sendid    消息id  
	 * @param $state     消息状态
	 */
	public function ReadyNews($msgid,$state){
		$msg=M('Msg');
		$co['id']=$msgid;
		$data['status']=$state;
		$list=$msg->where($co)->find();
		$ress=$msg->where($co)->save($data);
		if($list){
			 return $list;
		}else{
		    return false;
		}
	}
	
	/* 
	 * 获取单个用户收到的消息
	 * @param $user  用户id
	 * @param $row  分页数量
	 */
	public function ListNews($user,$row,$map=''){
		$model=M('Msg');
		$map['uid_get']=$user;
	    @import("ORG.Util.Page");
    	$count = $model->where($map)->count();
    	if($count> 0){
    		$p = new Page($count, $row);
			$p->setConfig('theme',"%upPage% %linkPage% %downPage%");
	        $page = $p->show();
    		$list = $model->where($map)->order('id desc')->limit($p->firstRow.','.$p->listRows)->select();
			$comment['count'] = $count;
			$comment['list'] = $list;
			$comment['page'] = $page;
			return $comment;
    	}else{
    		return false;
    	}
	}
	
	/*
	 * 删除消息
	 * @param $sendid  消息id
	 */
	public function DeleNews($msgid){
		$msg=M('Msg');
		$con['id']=$msgid;
		$list=$msg->where($con)->delete();
		if($list){
		   return true;
		}else{ 
		   return false;
		}
	}
	
	/*
	 * 获取用户未读的消息
	 * @param $user 用户ID
	 */
	public function NumNews($user){
		$mag=M("Msg");
		$con['status']=0;
		$con['uid_get']=$user;
		$list=$mag->field('status')->where($con)->select();
		$unm=count($list);
		return $unm;
	}
	
	/*
	 * 提示用户有新的消息 及未读消息
	 * $user用户id
	 */
	public function RemiNews($user){
		$arr=array();
	    $wnum=$this->NumNews($user);//获取未读信息条数
	    $nnum=$this->Conew($user);//获取心得消息
	    $arr[w]=$wnum;
	    $arr[n]=$nnum;
	return $arr;
	}
	
    /*
     * 获取用户新的消息
	 * @param $user 用户id
	 */
    public  function Conew($user){
    	$users=M('User');
	    $msg=M('Msg');
	    $co['id']=$user;
	    $list=$users->field('time_login')->where($co)->select();
	    $cos['ctime']=array('gt',$list[0]['time_login']);
	    $lists=$msg->field('ctime')->where($cos)->select();
	    $nums=count($lists);
        return $nums;
    }
	
}