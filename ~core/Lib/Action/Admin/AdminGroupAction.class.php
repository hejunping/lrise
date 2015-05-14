<?php
/**
 * 分组控制器
 * 
 * @date 2012-1-4
 * @author romic
 */
class AdminGroupAction extends AdminBaseAction
{
	static $map = array();
	
	public function index()
	{
		$auths = M("AdminGroup");
		$list = $auths->order('groupid asc')->select();
		$this->assign("list",$list);
		$this->display();
	}
	
	/**
	 * 添加分组
	 */
	public function add()
	{
		$this->assign('action','add');
		$auths = $this->listAuth();
		$this->assign('auths',$auths);
		
		$group = D("AdminGroup");
		if(strtolower($_SERVER['REQUEST_METHOD'])=="post")
		{
			if($group->create())
			{
				if ($group->add())
				{
					session("editTipsType",1);
					session("editTips",'添加分组成功');
				}
				$this->redirect('index');
			}
			else
			{
				session("editTipsType",0);
				session("editTips",$group->getError());
				$this->redirect('add');
			}
		}
		$this->display('edit');
	}
	
	/**
	 * 编辑分组
	 */
	public function edit()
	{
		$this->assign('action','deit');
		$auths = $this->listAuth();
		$this->assign('auths',$auths);
		
		$id = $_GET['id'];
		$group = M("AdminGroup");
		$where['groupid'] = $id;
		if(strtolower($_SERVER['REQUEST_METHOD'])=="post")
		{
			$data['groupname'] = $_POST['groupname'];
			$data['orders'] = $_POST['orders'];
			$data['purview'] = implode(',', $_POST['purview']);
			$data['intro'] = $_POST['intro'];
			$data['status'] = $_POST['status'];
			if ($group->where($where)->data($data)->save())
			{
				session("editTipsType",1);
				session("editTips",'编辑分组成功');
			}
			$this->redirect('index');
		}
		$g = $group->where($where)->find();
		
		$g['purview'] = explode(',', $g['purview']);
		
		$this->assign('group',$g);
		$this->display();
	}
	
	/**
	 * 删除
	 */
	public function del()
	{
		$id = $_POST['id'];
		$adminGroup = M('AdminGroup');
		$where['groupid'] = array('in',$id);
		$adminGroup->where($where)->delete();
		$this->ajaxReturn('success',"正常",true);
	}
	
	/**
	 * 修改权限状态  正常/禁用
	 */
	public function status()
	{
		$id = $_POST['uid'];
		$adminGroup = M('AdminGroup');
		$where['groupid'] = array('in',$id);
		$result = $adminGroup->where($where)->find();
		if (!empty($result['status'])) $data['status'] = 0;
		else $data['status'] = 1;
		$adminGroup->where($where)->save($data);
		if (!empty($result['status']))
		{
			$this->ajaxReturn('',"禁用",false);
		} else {
			$this->ajaxReturn('',"正常",true);
		}
	 	
	}
	
	/**
	 * 结构化 权限
	 */
	private function listAuth()
	{
		$data = $this->getChildren(0);
		$list = $this->getType();
		foreach ($list as $k=>$v)
		{
			$list[$k]['child'] = $data[$v['id']];
		}
		return $list;
	}
	
	/**
	 * 获取权限的分类信息
	 */
	private function getType()
	{
		$auth = M('Auth');
		$where['pid'] = 0;
		return $auth->where($where)->select();
	}
	
	/**
	 * 获取孩子们
	 */
	private function getChildren($pid)
	{
		$auth = M('Auth');
		$where['pid'] = $pid;
		$result = $auth->where($where)->select();
		
		if (!empty($result))
		{
			foreach ($result as $k=>$v)
			{
				$this->getChildren($v['id']);
				self::$map[$pid][] = $v;
			}
		}
		return self::$map;
	}
	
	/**
	 * 添加权限分组
	 * @deprecated
	 */
	public function addGroup()
	{
		die('这是一个不建议使用的方法');
		if(strtolower($_SERVER['REQUEST_METHOD'])=="post")
		{
			if(!array_key_exists("purview",$_POST))
			{
				session("editTipsType",0);
				session("editTips",'请选择至少一项权限');
			} else {
				$group = D("AdminGroup");
				if($group->create())
				{	
					$purview = implode(',',$_POST['purview']);
					$group->purview = $purview;
					$a = $group->add();
					if ($a !== false)
					{
						session("editTipsType",1);
						session("editTips",'添加分组成功');
						$this->redirect('admin/adminGroup/index');
					} else {
						header("Content-Type:text/html;charset=utf-8");
						exit($group->getError().'[<a href="javascript:history.back()">返回</a>]');
					}
				} else {
					header("Content-Type:text/html;charset=utf-8");
					exit($group->getError().'[<a href="javascript:history.back()">返回</a>]');
				}
			}
		}
		$this->display();
	}
	
}