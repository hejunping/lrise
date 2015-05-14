<?php
/**
 * 后台基础模块
 * @name birdy 
 * @email freebird110@qq.com 
 * @time 2012-3-10
 * @version 1.0
 */
abstract class AdminAction extends AdminBaseAction
{
	//后台初始化
	protected function _initialize()
	{
		if(!session(C('ADMIN_AUTH_KEY')))
		{
			if(isset($_GET['is_ajax'])) sys_tips('请先登录');
			else $this->redirect('admin/index/login');
		}
	}

	//布尔值字段状态转换
	protected function _bool($model,$cols=array(),$key='id',$class=array(),$text=array())
	{
		if($cols)
		{
			if(!$class) $class = array('cRed bold','cGreen bold');
			if(!$text) $text = array('否','是');
			$id = intval($_GET['id']);
			if($id > 0 && in_array($_GET['field'],$cols))
			{
				$model = M($model);
				$field = trim($_GET['field']);
				$rs = $model->field($field)->find($id);
				if($rs)
				{
					$data = array();
					$data[$key] = $id;
					if($rs[$field] == 1) $data[$field] = 0;
					else $data[$field] = 1;
					if($model->save($data))
					{
						$rs['text'] = $text[$data[$field]];
						$rs['class'] = $class[$data[$field]];
						return sys_tips($rs,'y');
					}
					else return sys_tips('数据处理异常');
				}
				else return sys_tips('数据不存在');
			}
			else return sys_tips('非法操作');
		}
	}

	//改变次序
	protected function _sort($model,$id,$var = 1,$field='sort',$key='id')
	{
		$var = intval($var);
		$model = M($model)->where($key.'='.$id);
		$rs = false;
		if($var > 0) $rs = $model->setInc($field,$var);
		else if($var < 0) $rs = $model->setDec($field,abs($var));
		if($rs) return sys_tips($var,'y');
		else return sys_tips('失败');
	}
    
    //批量排序
    protected function _order($model,$map=array(),$order='sort asc,id asc',$col='sort',$key='id')
    {
        $max = 100;
        $model = M($model);
        $data = $model->order($order)->where($map)->field(array($col,$key))->select();
        $total = count($data);
        if($total > 0 && $total <= $max)
        {
            foreach($data as $k=>$data)
            {
                if($data[$col] != $k+1)
                {
                    $update = array();
                    $update[$col] = $k+1;
                    $model->where($data)->save($update);
                }
            }
            sys_info('更新成功',1);
        }
        else 
        {
            sys_info('没有要处理的数据　或者　处理的数据超过 '.$max.' 条，考虑到系统性能，不予处理');
        }
        redirect($_SERVER['HTTP_REFERER']);
    }

    //表单自动完成(添加/修改)
	protected function _create($model,$key='id',$callback='')
	{
		if(isset($_REQUEST['is_ajax']) || strtolower($_SERVER['REQUEST_METHOD']) == 'post')
		{
			$model = D($model);
			$type = 0;
			$rs = $model->create($_REQUEST);
			if($model->create($_REQUEST))
			{
				if(isset($_REQUEST[$key]) && $_REQUEST[$key] > 0)
				{
					$type = 1;
					$rs = $_REQUEST[$key];
					if($model->save()) $info = '修改成功';
					else $info = '没有作任何修改';
				}
				else
				{
					if($rs = $model->add())
					{
						$info = '添加成功';
						$type = 1;
					}
					else $info = '添加失败：数据写入异常';
				}
			}
			else $info = $model->getError();

			if($type && $callback && method_exists($this,$callback))
			{
				$res = call_user_method($callback,&$this,$rs);
				//为多文件上传时插入数据库
				if(is_array($res['file'][0])){
					
					//多文件上传把图片插入数据库
					$pic = array();
					foreach($res['file'] as $k=>$v){
						$pic[] = $v['thumb'][0];
					}
					$data['pic'] = $pic[0];
					$data['pic2'] = $pic[1];
					$data['pic3'] = $pic[2];
					$data['pic4'] = $pic[3];
					M('Prod')->where('id='.$rs)->save($data);
				}
				if($res)
				{
					if($info == '没有作任何修改') $info = $res['info'];
					if($type != 1) $type = $res['type'];
				}
			}

			if(isset($_REQUEST['is_ajax'])) sys_tips($info,$type?'y':'n',array(),true);
			else
			{
				sys_info($info,$type);
				redirect($_SERVER['HTTP_REFERER']);
			}
			exit;
		}
	}

    //文件上传处理
	protected function _upload($conf)
	{
		import("ORG.Net.UploadFile");
		$upload = new UploadFile();
		$upload->maxSize = $conf['maxsize'] ? $conf['maxsize'] : 2 * 1024 * 1024; // 上传文件大小
		$upload->allowExts = $conf['ext'] ? $conf['ext'] : array('jpg');
		if(!$conf['temp']) $upload->savePath = 'data/~temp/'.date('y/m/d/h/');
        else  $upload->savePath = $conf['temp'];
		if($conf['name']) $upload->saveRule = $conf['name'];
        else $upload->saveRule = "uniqid";
		$rs = array('type'=>0);
        //if($conf['empty']) @del_dir($upload->savePath);
		if(!mk_dir($upload->savePath)) $rs['info'] = '权限不足，目录创建失败';
		else if(!$upload->upload()) $rs['info'] = $upload->getErrorMsg();
		else
		{
			$info = $upload->getUploadFileInfo();
            if($conf['mul'])
            { 
                //多文件缩略图处理
                if ($conf['thumb']) 
                {
                    if($conf['path'] != $conf['temp']) mk_dir($conf['path']);
                    foreach($info as $k=>$one)
                    {
                        $file = $info[$k]['savepath'].$one['savename'];
                        $info[$k]['path']  = $conf['path'];
                        $info[$k]['thumb'] = $this->_thumb ($conf,$file);
                        if ($conf['remove']) @unlink($file);
                    }
                }
            }
            else
            {
                $info = $info[0];
                $file = $info['savepath'].$info['savename'];
                if ($conf['thumb']) 
                {
                    if($conf['path'] != $conf['temp']) mk_dir($conf['path']);
                    $info['path'] = $conf['path'];
                    $info['thumb'] = $this->_thumb ($conf,$file);
                    if ($conf['remove']) @unlink($file);
                }
            }
            
            $rs['type'] = 1;
			$rs['info'] = '上传成功';
            $rs['file'] = $info;
		}
		return $rs;
	}

    //404提示
	protected function _404($info='Sorry，你访问了一个不存在的页面')
	{
        if(isset($_GET['is_ajax'])) sys_tips($info);
        else
        {
            $this->assign('info',$info);
            $this->display('tpl/404_admin.html');
            $this->display();
            exit;
        }
	}
}
?>