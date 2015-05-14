<?php
/**
 * 权限管理
 * 
 * @date 2012-1-5
 * @author romic
 */
class AuthAction extends AdminBaseAction
{
	
	public function __construct()
	{
		parent::__construct();
		$this->setModel('Auth');
	}
	
	public function index()
	{
		$result = $this->child(0);
		$this->assign('auth',$result);
		$this->display('index');
	}
	
	/**
	 * 添加权限
	 */
	public function add()
	{
		$type = $this->getType();
		$this->assign('type',$type);
		$this->assign('action','add');
		$M = D("Auth");
		if(strtolower($_SERVER['REQUEST_METHOD'])=="post")
		{
			if($M->create())
			{
				if($M->add()){
					session("editTipsType",1);
					session("editTips",'权限添加成功');
					$this->redirect("admin/auth/index");
				}else{
					session("editTipsType",0);
					session("editTips",'权限添加失败');
				}
			}else{
				session("editTipsType",0);
				session("editTips",$M->getError());
			}
		}
		$this->display('edit');
	}
	
	/**
	 * 编辑
	 */
	public function edit()
	{
		$type = $this->getType();
		$this->assign('type',$type);
		$id = $_GET['id'];
		$this->assign('action','edit');
		$where['id'] = $id;
		$M = D("Auth");
		if(strtolower($_SERVER['REQUEST_METHOD'])=="post")
		{
			if($M->create())
			{
				if($M->save())
				{
					session("editTipsType",1);
					session("editTips",'权限编辑成功');
				}
				$this->redirect("admin/auth/index");
			}else{
				session("editTipsType",0);
				session("editTips",$M->getError());
			}
			
		}
		$resutl = $M->where($where)->find();
		$this->assign('auth',$resutl);
		$this->display('edit');
	}
	
	
	/**
	 * 删除所选用户
	 */
	public function del()
	{
		$id = $_POST['uid'];
		$admin = M('Auth');
		$where['id'] = array('in',$id);
		$admin->where($where)->delete();
		$this->ajaxReturn('success',"删除成功",true);
	}
	
	/**
	 * 获取权限的分类信息
	 */
	private function getType()
	{
		$auth = M('auth');
		$where['pid'] = 0;
		return $auth->where($where)->select();
	}
}
?>