<?php
/**
 * @title 系统管理 
 * @author birdy
 * @date  2012-09-10 
*/
class IndexAction extends Action 
{
	/**
    +----------------------------------------------------------
    * 默认操作
    +----------------------------------------------------------
    */
	public function index()
	{
		$isLogin = session(C('ADMIN_AUTH_KEY'));
		if(!$isLogin) $this->redirect('admin/index/login');
		else
		{
			//$this->addLog();
			$this->assign('admin_name',$isLogin['account']);
			$this->assign('channel', $this->_getChannel());
			$this->assign('menu',    $this->_getMenu());
			$this->display();
		}
	}

	//TP中的显示验证码
	public function verify()
	{
		$type = isset($_GET['type'])? $_GET['type']:'gif';//取得图片类型
		ob_clean();
		import("ORG.Util.Image");
		Image::buildImageVerify(4,1,$type);
	}

	/**
	 * 登录后台
	 */
	public function login()
	{
        //global $is_local;
        if(strtolower($_SERVER['REQUEST_METHOD'])=="post")
		{   
			$name = trim($_POST["userName"]);
			$pwd  = pwdEncrypt($_POST["userPwd"]);
			
 			if(/* !$is_local &&  */md5($_POST["userCode"]) != session('verify'))
 			{
 				session("editTipsType",0);
 				session("editTips",'验证码错误');
 			}
 			else
			{
				$where["account"] = $name;
 				//if(!$is_local) 
 					$where["password"] = $pwd;
			   	$admin = M("Admin")->where($where)->find();
				if(!empty($admin))
				{	
				    $groupid = $admin['groupid'];
					//获取登陆用户的权限权限
					$adminGroup = M('AdminGroup');
					$adminGroup = $adminGroup->where("groupid=".$groupid)->find();
					if (!empty($adminGroup))
					{
						$data['login_time'] = time();
						M("Admin")->where($where)->data($data)->save();
						
						session(C('ADMIN_AUTH_PUR'),$adminGroup['purview']);
						session(C('ADMIN_AUTH_KEY'),$admin);
						$this->redirect('admin/index/index');
					}
				}
				else
                {
                    session("editTipsType",0);
                    session("editTips",'登录失败');
                }
			}
		}

		$this->display();
	}

	public function logout()
	{
		session(C('ADMIN_AUTH_KEY'),null);
		$this->redirect('admin/index/login');
	}

	protected function _getChannel()
	{
		$meun['index'] = '面板';
		$meun['global'] = '配置';
		$meun['cate'] = '结点';
		$meun['user'] = '用户';
		$meun['prod'] = '商品';
		$meun['info'] = '内容';
		$meun['pay'] = '帐务';
		
		
		return $meun;
	}

	protected function _getMenu() 
	{
		$menu = array();

		/* 后台管理首页 */
		$menu['index'] 		=   array(
			'控制面板'			=>	array(
				'控制面板'		=>	U('admin/system/index'),
				'地区管理'	=>	U('admin/area/index'),
				'备份数据'		=>	U('admin/system/backup'),
				'缓存更新'	=>	U('admin/system/cache'),
				'评论管理'	=>	U('admin/comment/index'),
				'日志管理' 	=>	U('admin/user/urecord')
			),
		);

        
		/* 全局配置 */
		$global = array();
		foreach (C('SETTING') as $k=>$v) $global[$v] = U('admin/option/'.$k);
		$menu['global'] 	=   array(
			'系统配置'		=>  $global ,
//			'栏目配置'			=>	array(
//				'网站导航'		=>	U('admin/cate/nav_top')
// 			),
		);
		
		/* 结点管理 */
		$cate = M('Item')->field('name,ename')->order('sort asc,id asc')->where(array('pid'=>0,'status'=>1,'bak2'=>1))->select();
		foreach ($cate as $cate) $menu['cate']['结点管理'][$cate['name']] = U('admin/cate/'.$cate['ename']);
		
		
		
		/* 用户 */
		$menu['user'] 		=   array(
			'网站用户'			=>	array(
				'用户管理'		=>	U('admin/user/index'),
		        '积分处理'		=>	U('admin/user/point'),
				'拍币处理'		=>	U('admin/user/coin'),
				'站内信'		=>	U('admin/msg/index'),
		        '浏览留言'     => U('admin/message/index'),
		        '票证管理'     => U('admin/ticket/index')
			),
            '管理员'			=>	array(
				'管理员列表'  => U('admin/admin/index'),
				'管理员添加'  => U('admin/admin/add'),
				'权限组列表'  => U('admin/AdminGroup/index'),
				'权限列表'  => U('admin/Auth/index')
			)
		);
        
        /* 产品 */
		$menu['prod']		=	array(
			'产品中心'			=>	array(
				'产品管理'	=>	U('admin/prod/index'),
		        '销售统计'  =>  U('admin/count/todaypai'),
				'订单管理'	=>	U('admin/prod/order'),
				'产品分类'	=>	U('admin/cate/prod'),
		        '淘宝采集'	=>	U('admin/taoapi/index'),
		        '词条管理'	=>	U('admin/word/index')
			)
		);
		
		
		/* 消息 */
		$menu['info'] 		=   array(
			'文章资讯'			=>	array(
				'资讯管理'		=>	U('admin/info/index'),
				'添加资讯'		=>  U('admin/info/form'),
				'资讯分类'		=>	U('admin/cate/info')    
			),
			'网站广告'			=>	array(
				'广告管理'		=>	U('admin/ad/index'),
				'添加广告'		=>  U('admin/ad/form'),
				'广告位'		    =>	U('admin/cate/ad_pos')
			)
		);
        
		/* 帐务 */
		$menu['pay'] 		=   array(
			'帐务管理'			=>	array(
				'线下充值'	=>  U('admin/order/offline'),
				'余额提现'	=>  U('admin/order/refund'),
		        '订单退款'	=>  U('admin/order/draw'),
				//'消费记录'	=>  U('admin/order/log'),
				'交易流水'	=>  U('admin/order/index'),
		        '支付接口'	=>  U('admin/pay/index')
				
			),
		);
		return $menu;
	}
}
?>