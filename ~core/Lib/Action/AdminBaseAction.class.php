<?php
/**
 * 后台基础模块
 * @name birdy 
 * @email freebird110@qq.com 
 * @time 2012-3-10
 * @version 1.0
 */
abstract class AdminBaseAction extends Action
{
	protected $model; // 数据库模型
	protected $condition = array(); // 查询条件
	private static $area = array(); // 地区静态变量用于递归 查询数据
	private static $childsId  = array(); // 存放孩子们ID的数组
    const ADMINISTRATOR_GROUP_ID = 1;
    
	//后台初始化
	protected function _initialize()
	{
		if(!session(C('ADMIN_AUTH_KEY')))
		{
			if(isset($_GET['is_ajax'])) sys_tips('请先登录');
			else $this->redirect('admin/index/login');
		}
        $this->checkAdminAuth(MODULE_NAME, ACTION_NAME);
	}
    
    /**
	 * 判断管理员权限
	 * @param string $calss_name 用户所拥有的权限
	 * @param string $method_name 操作名称
	 */
	public function checkAdminAuth($calss_name,$method_name)
	{
		// 判断 是不是一些 基础 控制器 比如 index用来登录和退出的
		if (in_array($calss_name, $this->AuthIgnoreList)) return true;
		
		$adminInfo = session(C('ADMIN_AUTH_KEY'));
        //dump($adminInfo);
		if(!$adminInfo) $this->redirect('index/login'); // 判断有没有登录
		
		$auth = M('Auth');
		$where['class_name'] = array('in',array('*',strtolower($calss_name)));
		$where['method_name']= strtolower($method_name);
		if ( self::ADMINISTRATOR_GROUP_ID == $adminInfo['groupid']) return true;  // 判断是不是超级管理员
		$this->operate = $auth->where($where)->find();
		if ($this->operate)
		{
			$purview = session(C('ADMIN_AUTH_PUR'));
			if(in_array($this->operate['id'],explode(',',$purview))) return true;
		}
		$this->_error('权限不足');
	}
    
    //错误提示
    protected function _error($info='操作失败',$url='')
    {
        $this->assign('info',$info);
        $this->display('tpl/admin_error.html');
        exit;
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
                        //dumpf($_REQUEST);
                        
			//测试
			//dump($_REQUEST);
			$rs = $model->create($_REQUEST);
			//dump($rs);die();
			if($model->create($_REQUEST))
			{
				if(isset($_REQUEST[$key]) && $_REQUEST[$key] > 0)
				{
					$type = 1;
					$rs = $_REQUEST[$key];
					if($rs = $model->save()){
                                            $this->add_base($_REQUEST['id']);
                                            $info = '修改成功';
                                        }
					else $info = '没有作任何修改';
				}
				else
				{
					if($rs = $model->add())
					{
                                                $this->add_base($rs);
						$info = '添加成功';
						$type = 1;
					}
					else $info = '添加失败：数据写入异常';
				}
			}
			else $info = $model->getError();
			if($type && $callback && method_exists($this,$callback))
			{
				//如果$_REQUEST为真则为修改否则为添加
				$res = call_user_method($callback,&$this,$_REQUEST[$key]?$_REQUEST[$key]:$rs);
				
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
        
        /* 把内容对应的 zh re 语言更新到base.php文件里 */
        protected function add_base($id){
            /* 把 zh ru 语言标题添加到 base.php 文件里 */
            $pre = C('C_PREFIX');
            $_title_key = 'info_'.$id;
            $_text_key = $_title_key.$pre;
            
            /* 定义翻译字典基础路径 */
            define('baseTrans','./web/translate/base.php');
            /* 读取翻译文件 */
            $transJSON = file_get_contents(baseTrans);
            if($transJSON !== false){//正确读取
                /* 将json字符串解码成数组 */
                $transArray = json_decode($transJSON,true);
            }

            //直接赋值或更新值
            if(!empty($transArray)){
                    $transArray['zh'][$_title_key] = trim($_REQUEST['zh_name']);
                    $transArray['ru'][$_title_key] = trim($_REQUEST['ru_name']);
                    $transArray['zh'][$_text_key] = trim($_REQUEST['zh_text']);
                    $transArray['ru'][$_text_key] = trim($_REQUEST['ru_text']);
            }else{
                    $transArray = array(
                            'ru'=>array(),
                            'zh'=>array(),
                    );
                    $transArray['zh'][$_title_key] = trim($_REQUEST['zh_name']);
                    $transArray['ru'][$_title_key] = trim($_REQUEST['ru_name']);
                    $transArray['zh'][$_text_key] = trim($_REQUEST['zh_text']);
                    $transArray['ru'][$_text_key] = trim($_REQUEST['ru_text']);
            }

            

            //再次编码成json字符串 
            $jsonString = json_encode($transArray);
            //写入翻译字典保存
            $result = file_put_contents(baseTrans, $jsonString);
        }


        //文件上传处理
    protected function _upload($conf)
    {
        return $this->_uploadImage($conf);
    }

    //图片上传
	protected function _uploadImage($conf)
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
    
    /**
     * 根据配置生成缩略图
     * @param array  $conf   配置
     * @param string $source 原图路径
     * @return array 
     */
    protected function _thumb($conf,$source)
    {
        import("ORG.Util.Image");
        $rs = array();
        foreach ($conf['thumb'] as $k => $thumb) 
        {
            if ($thumb['name']) 
            {
                $name = $conf['path'] . '/' . $thumb['name'];
                Image::thumb($source, $name, 'jpg', $thumb['width'], $thumb['height']);
            } 
            else 
            {
                $savename = basename($source);
                $prefix = $thumb['prefix'] ? $thumb['prefix'] : '';
                $name = $conf['path'] . '/' . $prefix . $savename;
                Image::thumb($source, $name, 'jpg', $thumb['width'], $thumb['height']);
            }
            
            $rs[$k] = basename($name);
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
    
    /**
	 * 设置模型
	 */
	protected function setModel($model)
	{
		$this->model = $model;
	}
    
    public function child($pid)
	{
		$this->cheakModel();

		$auth = M($this->model);
		$where['pid'] = $pid;
		$childs = $auth->where($where)->select();
		if(empty($childs)) return null;

		foreach ($childs as $k => $v)
		{
			$rescurTree = $this->child($v['id']);
			if( null != $rescurTree)
			{
				$childs[$k]['child'] = $rescurTree;
			}
		}
		return $childs;
	}
    
    /**
	 * 检查model
	 */
	public function cheakModel()
	{
		if (empty($this->model)) throw new ThinkException('同路人开发团队提示您：没有定义MODEL');
		return true;
	}
}
?>
