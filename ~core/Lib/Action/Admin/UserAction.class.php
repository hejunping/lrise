<?php
/**
 * @name 用户管理
 * @author birdy
 * @date 2012-3-15
 * @version 1.0
 */
class UserAction extends AdminBaseAction
{
	//首页
	public function index()
	{
		@import("ORG.Util.Page");
		$model = D("User");
        $map = array();
        if(isset($_GET['group']) && $_GET['group'] > 0) $map['group'] = $this->_get('group','intval');
        if($_GET['vip'] == '0' || $_GET['vip'] == '1')  $map['is_vip'] = $this->_get('vip','intval');
        if($_GET['login'] > 0) 
        {
            $day = time() - $this->_get('login','intval') * 3600 * 24;
            $map['time_login'] = array('egt',$day);
        }
        else if($_GET['login'] == '0') 
        {
            $day = time() - 180 * 3600 * 24;
            $map['time_login'] = array('lt',$day);
        }
        
        if(isset($_GET['reg_start']) || isset($_GET['reg_end']))
        {
            if(isset ($_GET['reg_start']) && preg_match('/^\d+[-\/]/', $_GET['reg_start']))
            {
                $day = $this->_get('reg_start','strtotime');
                $map['time_reg'][] = array('gt',$day);
            }
            if(isset ($_GET['reg_end']) && preg_match('/^\d+[-\/]/', $_GET['reg_end'])) 
            {
                $day = $this->_get('reg_end','strtotime') + 24 * 3600;
                $map['time_reg'][] = array('lt',$day);
            }
        }
        if(isset($_GET['key']) && $_GET['key'] != '帐号/邮箱/昵称/ID') 
        {
            $key = $this->_get('key');
            if(strstr($key, '@')) $map['email'] = $key;
            else if(preg_match('/^13[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$/', $key)) $map['phone'] = $key;
            else if(is_numeric($key)) $map['id'] = abs(intval($key));
            else $map['_string'] = 'account like "%'.$key.'%" or uname like "%'.$key.'%"';
        }
        
		$total = $model->where($map)->count();
		//sys_debug($total);
		if($total > 0)
		{
			$userc=M('UserCredit');
			$page = new Page($total,15);
			$list = $model->where($map)->limit($page->firstRow.",".$page->listRows)->select();
			foreach ($list as $k=>$v) {
				$resultc=$userc->where("uid=".$v['id'])->find();
				$list[$k]["coin"]=$resultc["coin"];
				$list[$k]["point"]=$resultc["point"];
			}
			$this->assign("list",$list);
			$this->assign("page",$page->show());
		}
		$this->display();
	}

	//添加/修改
	public function form()
	{
		$this->_create('User','id');
		if(isset($_GET['id'])) 
		{
			$item = M("User")->find($_GET['id']);
		}
		else $item = array('id'=>0);

		$this->assign('item',$item);
		$this->display();
	}
	
	//状态值改变
	public function bool()
	{
		$this->_bool('User',array('status'));
	}

	//赠送拍币
	public function coin()
	{
		$uid = $this->_post('uid','intval');//用户id
		$bak1 = $this->_post('bak1','trim');//赠送理由
		$bak2 = $this->_post('bak2','intval');//赠送数量
        $tips = $bak2 > 0 ? '赠送':'扣除';
		if($uid && $bak2 != 0)
        {
			$res = coin($uid, $bak2,'系统处理',$bak1);
			if($res) sys_info($tips.'拍币成功',1);
			else sys_info($tips.'拍币失败');
            redirect(U('admin/user/coin'));
		}
		$this->display();
	}

	//赠送积分
	public function point()
	{
		$uid = $this->_post('uid','intval');//用户编号
		$bak1 = $this->_post('bak1','trim');//赠送理由
		$bak2 = $this->_post('bak2','intval');//赠送数量
        $tips = $bak2 > 0 ? '赠送':'扣除';
		if($uid && $bak2 != 0){
			$res = point($uid, $bak2,'管理员赠送',$bak1);
			if($res) sys_info($tips.'积分成功',1);
			else sys_info($tips.'积分失败');
            redirect(U('admin/user/point'));
		}
		$this->display();
	}

	//网站管理员
	public function admin()
	{
		@import("ORG.Util.Page");
		$model = M("Admin");
		$total = $model->count();
		if($total > 0)
		{
			$page = new Page($total,15);
			$list = $model->order('id asc')->limit($page->firstRow.",".$page->listRows)->select();
			$this->assign("list",$list);
			$this->assign("page",$page->show());
		}

		$this->display();
	}

	//管理员权限设置
	public function admin_form()
	{
		$this->_create('Admin');
		if(isset($_GET['id'])) $item = M("Admin")->find($_GET['id']);
		else $item = array('id'=>0);

		$this->assign('item',$item);
		$this->display();
	}

	//状态值改变
	public function admin_bool()
	{
		$this->_bool('Admin',array('status'));
	}

	//管理员权限设置
	public function group()
	{
		$this->display();
	}
	
	//用户登录日志管理
	public function urecord(){
		@import('ORG.Util.Page');
		$model = M('Cate');
		//组装查询的条件
		if(isset($_GET['ename']) && $_GET['ename']) $map['ename'] = $this->_get('ename');
        
		//时间搜索
	 	if(isset($_GET['reg_start']) || isset($_GET['reg_end']))
        {
            if(isset ($_GET['reg_start']) && preg_match('/^\d+[-\/]/', $_GET['reg_start']))
            {
                $day = $this->_get('reg_start','strtotime');
                $map['ctime'][] = array('gt',$day);
            }
            if(isset ($_GET['reg_end']) && preg_match('/^\d+[-\/]/', $_GET['reg_end'])) 
            {
                $day = $this->_get('reg_end','strtotime') + 24 * 3600;
                $map['ctime'][] = array('lt',$day);
            }
        }
        //用户id、日志标题搜索
        if(isset($_GET['key']) && $_GET['key'] !== '用户ID/日志标题'){
        	$key = $this->_get('key','trim');
        	if(is_numeric($key)){
        		$map['uid'] = intval($key);
        	}else{
        		$map['_string'] = 'name like "%'.$key.'%"';
        	}
        }
		$total =  M('UserRecord')->where($map)->count();
		if($total > 0)
        {
			$page = new Page($total,20);
			$list =  M('UserRecord')->where($map)->order('ctime desc')->limit($page->firstRow.','.$page->listRows)->select();
			$this->assign('list',$list);
			$this->assign('page',$page->show());
		}
		
		$this->display();
	}
}
?>