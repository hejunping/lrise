<?php
/**
 * @name 结点模块
 * @author birdy
 * @date 2012-3-15
 * @version 1.0
 */
class CateAction extends AdminAction
{
	protected $bool = array('status');
	protected $init = array(
		'ename'=>array('admin_group','ad_pos','log_type','user_group','data_path','prod','user_profile','frozen','msg','authority','taoprod'),
		'bak1'=>array(
			'prod'=>array('分类说明文章ID','string','例如 22,30，表示分类左侧说明，调用ID为22的文章内容，右侧调用ID为30的文章，不填不会显示分类说明'),
            'data_path'=>array('数据格式'),
            'nav_foot'=>array('Url地址'),
            'log_type'=>array('备注'),
            'authority'=>array('权限值')
		),
		'bak2'=>array(
			'nav'=>array('新窗口打开','bool'),
            'nav_foot'=>array('新窗口打开','bool'),
		    'prod'=>array('是否推荐','bool'),
            'log_type'=>array('积分'),
            'user_profile'=>array('必填','bool'),
            'info'=>array('SiteMap','bool'),
	   'ad_pos'=>array('广告类型','radio',array('图片','专题活动','Flash','视频','其他')), 
            //'authority'=>array('','bool'),
		),
        'bak3'=>array(
            'prod'=>array('淘宝分类ID')
        ),
		'operate'=>array(
			'admin_group'=>array( array('admin/user/group','权限管理') ),
			'help'=>array( array('admin/info/help','帮助列表')),
			'info'=>array( array('admin/info/system','系统列表')),
		    'prod'=>array( array('admin/cate/sublist','二级分类')),
            'ad_pos'=>array( array('admin/ad/gototype','广告管理')),
            'authority'=>array( array('admin/cate/sublist','权限列表'))
		),
        'editcol'=>array(
            'log_type'=>array('bak2')
        )
	);

	//结点统一样式
	protected function _empty()
	{
		$act = ACTION_NAME;
		$item = $this->getByEname($act);//获取单个结点的所有信息
		if($item)
		{
			$this->assign('add_item',1);
			$this->assign('item',$item);
			$this->assign('pid',$item['id']);
			if(in_array($act,($this->init['ename']))) $this->assign('show_ename',1);
			if(in_array($act,($this->init['delete']))) $this->assign('show_delete',1);
			if(isset($this->init['bak1'][$act])) 
			{
				if($this->init['bak1'][$act][1] != 'text')
				$this->assign('show_bak1',$this->init['bak1'][$act]);
				
			}
		    if(isset($this->init['bak1'][$act])) 
			{  
				if($this->init['bak1'][$act][1]== 'select1')
				$this->assign('show_bak1s',$this->init['bak1'][$act]);
				
			}
			if(isset($this->init['bak2'][$act])) $this->assign('show_bak2',$this->init['bak2'][$act]);
			if(isset($this->init['bak3'][$act])) $this->assign('show_bak3',$this->init['bak3'][$act]);
			if(isset($this->init['operate'][$act])) $this->assign('operate',$this->init['operate'][$act]);
			if(method_exists($this,$act)) $this->$act($item);
			else $this->cate($item);
		   
		}
		else $this->_404();
		
	}

	protected function cate($item)
	{
		$this->assign('show_sort',1);
		$data = $this->getByPid($item['id']);
		if($data) $this->assign('list',$data);
		
		$this->display('index');
	}

    //根结点管理
	public function index()
	{
		$data = $this->getByPid(0);
		$this->assign('show_sort',1);
		$this->assign('list',$data);
		$this->assign('show_ename',1);
		$this->assign('add_item',1);
		$this->assign('pid',0);
        $this->assign('show_bak2',array('显示在结点管理','bool'));
		$this->display();
	}
    
    public function sublist()
    {
        $iid = $this->_get('iid','intval');
        $root = $this->getRoot($iid);
		if($root)
		{
            $item = M("Item")->find($iid);
			$this->assign('add_item',1);
			$this->assign('item',$item);
			$this->assign('root',$root);
			$this->assign('pid',$iid);
            $act = $root['ename'];
			if(in_array($act,($this->init['ename']))) $this->assign('show_ename',1);
			if(in_array($act,($this->init['delete']))) $this->assign('show_delete',1);
			if(isset($this->init['bak1'][$act])) 
			{
				if($this->init['bak1'][$act][1] != 'text')
				$this->assign('show_bak1',$this->init['bak1'][$act]);
			}
			if(isset($this->init['bak2'][$act])) $this->assign('show_bak2',$this->init['bak2'][$act]);
			if(isset($this->init['bak3'][$act])) $this->assign('show_bak3',$this->init['bak3'][$act]);
			if(method_exists($this,$act)) $this->$act($item);
			else $this->cate($item);
			  
		}
		else $this->_404();
    }
    
    //二级分类
    public function sub()
    {
        $iid = $this->_get('iid','intval');
        $root = $this->getRoot($iid);
        if($root)
        {
            $parent = M("Item")->find($iid);
			$this->assign('parent',$parent);
			$this->assign('root',$root);
			$act = $root['ename'];
			if($act && isset($this->init['bak1'][$act])) $this->assign('bak1',$this->init['bak1'][$act]);
			else $this->assign('bak1',array('备注1'));
			if($act && isset($this->init['bak2'][$act])) $this->assign('bak2',$this->init['bak2'][$act]);
			else $this->assign('bak2',array('备注2'));
			if($act && isset($this->init['bak3'][$act])) $this->assign('bak3',$this->init['bak3'][$act]);
			else $this->assign('bak3',array('备注3'));
            
            $this->assign('item',array('pid'=>$iid,'sort'=>0));
            $this->display('form');
        }
    }

	//添加/修改
	public function form()
	{
		//测试
		//dump($_POST);
		//dump($_GET);
		$this->_create('Item','id','clearCache');
		if(isset($_GET['id'])) $item = M("Item")->find($_GET['id']);
		else $item = array('pid'=>intval($_GET['pid']),'sort'=>0);

		if($item['pid'] > 0) 
		{
			$parent = M("Item")->find($item['pid']);
            $this->assign('parent',$parent);
            if($parent['pid'] > 0) $root = $this->getRoot($item['pid']);
            if($root) 
            {
                $this->assign('root',$root);
                $act = $root['ename'];
            }
            else $act = $parent['ename'];
			if($act && isset($this->init['bak1'][$act])) $this->assign('bak1',$this->init['bak1'][$act]);
			else $this->assign('bak1',array('备注1'));
			if($act && isset($this->init['bak2'][$act])) $this->assign('bak2',$this->init['bak2'][$act]);
			else $this->assign('bak2',array('备注2'));
			if($act && isset($this->init['bak3'][$act])) $this->assign('bak3',$this->init['bak3'][$act]);
			else $this->assign('bak2',array('备注3'));
            if($act && isset($this->init['editcol'][$act])) $this->assign('editcol',$this->init['editcol'][$act]);
		}
		else 
		{
			$this->assign('bak1',array('备注1'));
            $this->assign('bak2',array('显示在结点管理','bool'));
			$this->assign('bak3',array('备注3'));
		}
//		dump($this->init['bak1']);
//		dump($act);
//		exit($item);
		$this->assign('item',$item);
		$this->display();
	}
    
    protected function clearCache($rs)
    {
        $pid = $this->_post('pid','intval');
        $item = $this->getRoot($rs['id']);
        if($item) F('_item/'.$item['ename'],null);
        return $rs;
    }

    //状态值改变
	public function bool()
	{
		$this->_bool('Item',array('status','bak2'));
	}

	//Ajax排序
	public function sort()
	{
		$id = intval($_GET['id']);
		$val = intval($_GET['val']);
		$this->_sort('Item',$id,$val);
	}
    
    //Ajax排序
	public function order()
	{
		$this->_order('Item',array('pid'=>$this->_get('pid','intval')));
	}

	//根据键值获取单个结点
	private function getByEname($ename)
	{
		$map = array();
		$map['pid'] = 0;
		$map['ename'] = $ename;
		return M("Item")->where($map)->find();
	}

	//获取子结点
	private function getByPid($pid)
	{
		return M("Item")->order('sort asc,id asc')->where(array('pid'=>$pid))->select();
	}
    
    //递归获取根节点
    private function getRoot($id)
    {
        $item = M("Item")->find($id);
        if($item)
        {
            if($item['pid'] === '0') return $item;
            else return $this->getRoot($item['pid']);
        }
        else sys_info ('无根节点');
    }
}
?>