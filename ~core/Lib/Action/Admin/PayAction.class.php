<?php
class PayAction extends AdminBaseAction
{
	//获取支付插件文件
	private function read_modules()
	{
		$directory = APP_PATH."Lib/ORG/Pay/";
		$read_modules = true;
		$dir = @opendir($directory);
		$modules     = array();

		while (false !== ($file = @readdir($dir)))
		{
			if (preg_match("/^.*?\_payment\.php$/", $file))
			{
				$modules[] = require_once($directory .$file);
			}
		}
		@closedir($dir);
		unset($read_modules);

		foreach ($modules AS $key => $value)
		{
			ksort($modules[$key]);
		}
		ksort($modules);
      
		return $modules;
	}

	//支付插件管理
	public function index()
	{
		$modules = $this->read_modules();
		$db_modules = M('Pay')->select();
		foreach($modules as $k=>$v)
		{
			foreach($db_modules as $kk=>$vv)
			{
				if($v['class_name']==$vv['class_name'])
				{
					//已安装
					$modules[$k]['id'] = $vv['id'];
					$modules[$k]['total_amount'] = $vv['total_amount'];
					$modules[$k]['installed'] = 1;
					$modules[$k]['is_effect'] = $vv['is_effect'];
					$modules[$k]['sort'] = $vv['sort'];
					break;
				}
			}

			if($modules[$k]['installed'] != 1)
			$modules[$k]['installed'] = 0;
			$modules[$k]['is_effect'] = intval($modules[$k]['is_effect']);
			$modules[$k]['sort'] = intval($modules[$k]['sort']);
			$modules[$k]['total_amount'] = floatval($modules[$k]['total_amount']);
			$modules[$k]['reg_url'] = $v['reg_url']?$v['reg_url']:'';
		}

		$this->assign("payment_list",$modules);
		$this->display();
	}

	public function install()
	{
		$class_name = $_REQUEST['class_name'];
		$directory = APP_PATH."Lib/ORG/Pay/";
		$read_modules = true;

		$file = $directory.$class_name."_payment.php";
		if(file_exists($file))
		{
			$module = require_once($file);
			$rs = M("Pay")->where("class_name = '".$class_name."'")->count();
			if($rs > 0) exit('参数错误');
		}
		else exit('参数错误');

		//开始插入数据
		$data['name'] = $module['name'];
		$data['class_name'] = $module['class_name'];
		$data['online_pay'] = $module['online_pay'];
		$data['lang'] = $module['lang'];
		$data['config'] = $module['config'];
		$data['sort'] = (M("Payment")->max("sort") + 1);

		$this->assign("data",$data);
		$this->display();
	}

	public function insert()
	{
		$data = M('Pay')->create ();
		$data['config'] = serialize($_REQUEST['config']);
		// 更新数据
		$log_info = $data['name'];
		$list=M('Pay')->add($data);
		if (false !== $list) {
			//成功提示
			session("editTipsType",1);
			session("editTips",'支付接口安装成功');
			$this->redirect("pay/index");
		} else {
			//错误提示
			session("editTipsType",0);
			session("editTips",'分类安装失败');
			$this->redirect("pay/index");
		}
	}

	public function edit() {
		$id = intval($_REQUEST ['id']);
		$condition['id'] = $id;
		$vo = M(MODULE_NAME)->where($condition)->find();

		$directory = APP_PATH."Lib/ORG/Pay/";
		$read_modules = true;

		$file = $directory.$vo['class_name']."_payment.php";
		if(file_exists($file))
		{
			$module = require_once($file);
		}
		else exit('参数错误');

		$vo['config'] = unserialize($vo['config']);

		$data['lang'] = $module['lang'];
		$data['config'] = $module['config'];

		$this->assign ( 'vo', $vo );
		$this->assign ( 'data', $data );
		$this->display ();
	}

	public function update()
	{
		$data = M('Pay')->create ();
		$data['config'] = serialize($_REQUEST['config']);
		$log_info = M('Pay')->where("id=".intval($data['id']))->getField("name");

		// 更新数据
		$list=M('Pay')->save ($data);
		if (false !== $list) {
			//成功提示
			session("editTipsType",1);
			session("editTips",'支付接口编辑成功');
			$this->redirect("pay/index");
		} else {
			//错误提示
			session("editTipsType",0);
			session("editTips",'支付接口编辑失败');
			$this->redirect("pay/index");
		}
	}

	public function uninstall()
	{
		$id = intval($_REQUEST ['id']);
		$data = M('Pay')->getById($id);
		if($data)
		{
			$info = $data['name'];
			$list = M('Pay')->where ( array('id'=>$data['id']) )->delete();
			if ($list!==false) {
				M("PayDeal")->where ( array('payment_id'=>$data['id']) )->delete();
				session("editTipsType",1);
				session("editTips",'支付插件卸载成功');
				$this->redirect("pay/index");
			} else {
				session("editTipsType",0);
				session("editTips",'支付插件卸载失败');
				$this->redirect("pay/index");
			}
		}
		else
		{
			session("editTipsType",0);
			session("editTips",'支付插件卸载失败');
			$this->redirect("pay/index");
		}
	}

	public function notice()
	{
		echo '待开发<a href="javascript:history.back(-1);">点击返回</a>';
	}
	
	//取款账户
	public function tool()
	{
		$this->display();
	}
}
?>