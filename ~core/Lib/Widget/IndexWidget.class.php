<?php
/*
 * 首页(登录区)
 */

class IndexWidget extends Widget
{
	public function render($data)
    {
		$user = getUserInfo('',false);
		$uid = $user['id'];
    	if($user) 
        {
            $user['credit'] = getCredit($uid);
            $data['user'] = $user;
        }
        $touxiang=getuserhead($user['id'], 'middle');
        $data['touxiang']=$touxiang;
		$time = strtotime(date("Y-m-d"));
        $map['ctime&ctime'] = array(array('egt',$time),array('lt',$time+24*3600),'_multi'=>true);
        $map['uid'] = $uid;
        $map['ename'] = 'point_log';
    	$count_user = M('UserRecord')->where($map)->count();
    	if($count_user == 0) $data['rs'] = 0;
    	else $data['rs'] = 1;
		return $this->renderFile('index',$data);
	}
}