<?php
class ReadAction extends AdminBaseAction
{
    //订阅信息
    public function index()
    {
    	$this->display();
	}
    
    
    public function bid()
    {
        $map = array();
        $map['start'] = array('gt',time());
        $map['status'] = 1;
        $pid = M("Paiwu")->field('pid')->where($map)->select();
        if($pid)
        {
            foreach($pid as $pid) $pids[] = $pid['pid'];
            $pids = array_unique($pids);
            $map = array();
            $map['pid'] = array('in',$pids);
            $uid = M("UserWant")->Distinct(true)->where($map)->field('uid')->select();
            foreach($uid as $uid) bid_remain ($uid['uid'],implode(',',$pids));
            sys_info('竞拍提醒发送成功',1);
            redirect(U('admin/system/index'));
        }
        else $this->_error('没有预拍商品');
    }
}
?>