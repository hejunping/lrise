<?php
/**
 * 管理员控制器
 * 
 * @date 2012-1-4
 * @author romic
 */
class AdminAction extends AdminBaseAction
{
	public function index()
	{
		$groups = $this->listAdminGroup();
		$this->assign("groups",$groups);
		
		$list = $this->listAdmin();
		$this->assign("list",$list);
		$this->display();
	}
	
	/**
	 * 添加管理员
	 */
	public function add()
	{
		$groups = $this->listAdminGroup();
		$this->assign('groups',$groups);
		$this->assign('action','add');
		$M = D("Admin");
		if(strtolower($_SERVER['REQUEST_METHOD'])=="post")
		{
			if($M->create()){
				if($M->add())
				{
					session("editTipsType",1);
					session("editTips",'用户添加成功');
					$this->redirect("admin/admin/index");
				}else{
					session("editTipsType",0);
					session("editTips",'用户添加失败');
				}
			}else{
				session("editTipsType",0);
				session("editTips",$M->getError());
			}
		}
		$this->display('edit');
	}
	
	/**
	 * 编辑管理员
	 */
	public function edit()
	{
		$groups = $this->listAdminGroup();
		$this->assign('groups',$groups);
		$this->assign('action','edit');
		$M = M("Admin");
		$where['id'] = intval($_GET['id']);
		if(strtolower($_SERVER['REQUEST_METHOD'])=="post")
		{
			if(isset($_POST['groupid'])) $data['groupid'] = intval($_POST['groupid']);
			$data['account'] = $_POST['account'];
			if (!empty($_POST['password'])) $data['password'] = md5($_POST['password']);
			$data['status'] = $_POST['status'];
			if($M->where($where)->data($data)->save())
			{
				session("editTipsType",1);
				session("editTips",'用户编辑成功');
			}
			$this->redirect("admin/admin/index");
		}
		$adminInfo = $M->where($where)->find();
		$this->assign('admin',$adminInfo);
		$this->display('edit');
	}
	
	/**
	 * 删除所选用户
	 */
	public function del()
	{
		$where['id'] = $id = $_POST['uid'];
		$admin = M('Admin');
		if(!is_array($id) && intval($where['id']) == 1) $this->ajaxReturn('error',"默认的管理员不能删除",0);
		else if(in_array(1,$id)) $this->ajaxReturn('error',"默认的管理员不能删除",0);
		$where['id'] = array('in',$id);
		$admin->where($where)->delete();
		$this->ajaxReturn('success',"删除成功",true);
	}
	
	/**
	 * 管理员操作日志
	 */
	public function showLog()
	{
		$adminLog = M('AdminLog');
		$limit = 15;
		import("ORG.Util.Page");
		$page = new Page($adminLog->count(),$limit);
		$this->assign("page",$page->show());
		$logs = $adminLog->limit($page->firstRow.",".$page->listRows)->select();
		$this->assign('logs',$logs);
		$this->display('log');
	}
	
	/**
	 * 删除管理员操作日志
	 */
	public function delAdminLog()
	{
		$id = $_POST['uid'];
		$admin = M('AdminLog');
		$where['id'] = array('in',$id);
		$admin->where($where)->delete();
		$this->ajaxReturn('success',"删除成功",true);
	}
	
	/**
	 * 管理员日志记录
	 */
	public function log($operate)
	{
		if (empty($operate)) return false;
		$data['name'] = $this->getAdminName();
		$data['content'] = $operate;
		$data['ip'] = getIp();
		$data['inst'] = time();
		$adminLog = M('AdminLog');
		$adminLog->data($data)->add();
	}
	
	/**
	 * 获取管理名字
	 */
	protected function getAdminName()
	{
		$adminInfo = session(C('ADMIN_AUTH_KEY'));
		return empty($adminInfo['account'])?'guest':trim($adminInfo['account']);
	}
	
	/**
	 * 列表分组
	 */
	private function listAdminGroup()
	{
		$adminGroup = M('AdminGroup');
		return $adminGroup->order('orders')->select();
	}
	
	/**
	 * 列表管理员
	 */
	private function listAdmin()
	{
		$limit = 15;
		import("ORG.Util.Page");
		$Admin = D("AdminView");
		$where = null;
		if (!empty($_GET['account'])) $where['account'] = array('like','%'.$_GET['account'].'%');
		if (!empty($_GET['groupid'])) $where['groupid'] = $_GET['groupid'];
		
		$page = new Page($Admin->where($where)->count(),$limit);
		$this->assign("page",$page->show());
		return $Admin->where($where)->order('id')->limit($page->firstRow.",".$page->listRows)->select();
	}
	
	/**
	 * 禁用/激活用户
	 */
	public function forbidden()
	{
		$id = $_POST['uid'];
		$admin = M('Admin');
		$where['id'] = array('in',$id);
		$result = $admin->where($where)->find();
		if (!empty($result['status'])) $data['status'] = 0;
		else $data['status'] = 1;
		$admin->where($where)->save($data);
		if (!empty($result['status']))
		{
			$this->ajaxReturn('',"禁用",false);
		} else {
			$this->ajaxReturn('',"正常",true);
		}
	}
	
	/**
	 * 禁用所选用户
	 */
	public function forbiddenAll()
	{
		$id = $_POST['uid'];
		$admin = M('Admin');
		$where['id'] = array('in',$id);
		$data['status'] = 0;
		$admin->where($where)->save($data);
		$this->ajaxReturn('',"禁用",false);
	}
	
}
?>