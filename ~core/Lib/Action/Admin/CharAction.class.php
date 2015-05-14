<?php
/**
 * @name 字符管理
 * @author birdy
 * @date 2012-4-9
 * @version 1.0
 */
class CharAction extends AdminBaseAction
{
	//首页
	public function index()
	{
		@import("ORG.Util.Page");
		$model = M("Char");
		$map = array();
        if($_GET['status'] == '0' || $_GET['status'] == '1')  $map['status'] = $this->_get('status','intval');
        if(isset($_GET['used']) && $_GET['used'] == '1')  $map['used'] = 1;
        if(isset($_GET['py']) && $_GET['py'] == '1')  $map['pinyin'] = '';
	 	if(isset($_GET['key']) && $_GET['key'] != '汉字/拼音/总笔画') 
        {
            $key = $this->_get('key');
            if(preg_match('/^[a-zA-Z]+$/is', $key)) $map['pinyin'] = array('like',$key.'%');
            else if(is_numeric($key)) $map['bh_total'] = $key;
            else $map['name'] = $key;
        }
        
		$total = $model->where($map)->count();
		if($total > 0)
		{
			$page = new Page($total,10);
			$list = $model->where($map)->order('status desc,pinyin asc,id asc')->limit($page->firstRow.",".$page->listRows)->select();
			$this->assign("list",$list);
			$this->assign("page",$page->show());
		}

		$this->display();
	}

	//添加/修改
	public function form()
	{
		$this->_create('Char');
		if(isset($_GET['id'])) 
        {
            $item = M("Char")->find($_GET['id']);
            getChar($item['name']);
        }
        
		else $item = array('id'=>0,'bh_total'=>'0');
		$this->assign('item',$item);
		$this->display();
	}

	//状态值改变
	public function bool()
	{
		$this->_bool('Char',array('status','used'));
	}
}
?>