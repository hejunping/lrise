<?php
/**
 * @name 标签管理
 * @author birdy
 * @date 2012-4-7
 * @version 1.0
 */
class TagAction extends AdminBaseAction
{
	//首页
	public function index()
	{
		@import("ORG.Util.Page");
		$model = M("Tag");
		$map = array();
        if($_GET['status'] == '0' || $_GET['status'] == '1')  $map['status'] = $this->_get('status','intval');
        
	 	if(isset($_GET['key']) && $_GET['key'] != '标签名称') 
        {
            $key = $this->_get('key');
            $map['name'] = array('like','%'.$key.'%');
        }
        
		$total = $model->where($map)->count();
		if($total > 0)
		{
			$page = new Page($total,10);
			$list = $model->where($map)->order('hot desc,id asc')->limit($page->firstRow.",".$page->listRows)->select();
			$this->assign("list",$list);
			$this->assign("page",$page->show());
		}

		$this->display();
	}

	//添加/修改
	public function form()
	{
		$this->_create('Tag','id','upload');
		if(isset($_GET['id'])) 
		{
			$item = M("Tag")->find($_GET['id']);
			$pic = getImage($item['id'],'tag','small');
			if(is_file($pic)) $item['pic'] = $pic;
			else $item['pic'] = '';
		}
		else $item = array('id'=>0,'hot'=>'0','count_album'=>0,'count_song'=>0,'count_user'=>0,'count_singer'=>0);
		$this->assign('item',$item);
		$this->display();
	}
	
	//上传图片
	protected function upload($rs)
	{
		if($rs)
		{
			$conf = array();
			$conf['name'] = 'pic';
			$conf['path'] = dirname(getImage($rs,'tag'));
			$conf['remove'] = true;
			$conf['thumb'] = array(
				array('name'=>'big.jpg','width'=>260,'height'=>260),
				array('name'=>'small.jpg','width'=>100,'height'=>100)
			);
			return $rs = $this->_uploadImage($conf);
		}
	}

	//状态值改变
	public function bool()
	{
		$this->_bool('Tag',array('status'));
	}
	
	//Ajax增减数量
	public function num()
	{
		$id = intval($_GET['id']);
		$val = intval($_GET['val']);
		$this->_sort('Tag',$id,$val,'sku');
	}
}
?>