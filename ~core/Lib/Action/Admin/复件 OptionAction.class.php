<?php
// 本文档自动生成，仅供测试运行
class OptionAction extends AdminBaseAction
{
	//程序初始化
	public function visit()
	{
		$this->display();
	}
	
	public function _initialize()
	{
		$this->assign('sublist',C('SETTING'));
	}
	
	public function _empty()
	{
		$action = ACTION_NAME;
		$this->block($action);
	}

	private function block($block = 'website')
	{
		$model = M('Option');
		$data = $model->order('`order` desc, id desc')->where('`edit` = 0 and block = "'.$block.'"')->select();
		//print_r($data);
		$this->assign('list',$data);
		$this->assign('block',$block);
		$this->display('block');
	}

	/**
	 * 更新配置
	 */
	public function update()
	{   
		if(is_array($_REQUEST["options"]))
		{
			$model = D("Option");
			$options = $_REQUEST["options"];
			print_r($options);
			$isEdit = false;
			$block = $_POST['block'];
			//print_r($block);
			foreach ($options as $option)
			{
				if(getOption($block,$option["key"]) != $option["value"] && $option['value'] == '1')
				{
					switch ($option['type'])
					{
						case "password":
							$option['value'] = strCode($option['value']);
							break;
					}
					
					if($model->create($option))
					{
						$update = array();
						$update['value'] = $option['value'];
						unset($option['value']);
						$isEdit = true;
						$model->where($option)->save($update);
					}
					else exit($model->getError());
				}elseif(getOption($block,$option["key"]) != $option["value"] && $option['value'] == '0')
				{
					switch ($option['type'])
					{
						case "password":
							$option['value'] = strCode($option['value']);
							break;
					}
					
					if($model->create($option))
					{
						$update = array();
						$update['value'] = $option['value'];
						unset($option['value']);
						$isEdit = true;
						$model->where($option)->save($update);
					}
					else exit($model->getError());
				}elseif(getOption($block,$option["key"]) != $option["value"] && $option['value'] == '2')

				{
					switch ($option['type'])
					{
						case "password":
							$option['value'] = strCode($option['value']);
							break;
					}
					
					if($model->create($option))
					{
						$update = array();
						$update['value'] = $option['value'];
						unset($option['value']);
						$isEdit = true;
						$model->where($option)->save($update);
					}
					else exit($model->getError());
				}
			}
			
			if($isEdit) {F("_option/".$block,NULL);}
			session("editTipsType",2);
			session("editTips","配置成功");
			$this->redirect('option/'.$block);
		}
	}

	/**
	 * 添加配置
	 *
	 */
	function add()
	{
		$M = D("Option");
		if($_POST)
		{
			if($M->create())
			{
				if($M->add())
				{
					session("editTipsType",0);
					session("editTips","配置添加成功");
					$this->redirect('option/add');
				}
				else
				{
					session("editTipsType",0);
					session("editTips","配置添加失败");
					$this->redirect('option/add');
				}
			}
			else
			{
				session("editTipsType",0);
				session("editTips",$M->getError());
				$this->redirect('option/add');
			}
		}
		else
		{
			$this->assign('setting',C("SETTING"));
			$this->assign('option_type',C('OPTION_TYPE'));
			$this->display();
		}
	}
}
?>