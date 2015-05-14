<?php
/**
 * @name 词条管理
 * @author birdy
 * @date 2012-9-18
 * @version 1.0
 */
class WordAction extends AdminBaseAction
{
//资讯首页
    public function index()
    {
        @import("ORG.Util.Page");
    	$model = M("Word");
    	$letter = array("A","B","C","D","E","F","G","H","J","K","L","M","N","O","P","Q","R","S","T","W","X","Y","Z");
        $ctype = array('prop'=>'销售属性','attr'=>'商品属性','other'=>'其它');
    	$map = array();
        if(isset($_GET['ctype']) && $_GET['ctype'] != '-1') $map['ctype'] = $this->_get('ctype');
        if(isset($_GET['letter']) && $_GET['letter'] > -1)  $map['letter'] = $letter[$this->_get('letter','intval')];
        if(isset($_GET['key']) && $_GET['key'] != '词条名称') 
        {
            $key = $this->_get('key');
            $map['_string'] = 'name like "%'.$key.'%" or ename like "%'.$key.'%"';
        }
        
    	$total = $model->where($map)->count();
    	
    	if($total > 0)
    	{
	    	$page = new Page($total,15);
	    	$list = $model->where($map)->order('id desc')->limit($page->firstRow.",".$page->listRows)->select();
			$this->assign("list",$list);
			$this->assign("page",$page->show());
    	}
    
        $this->assign('letter',$letter);
        $this->assign('ctype',$ctype);
        $this->display();
       
    }

	//添加/修改
	public function form()
	{
		$this->_create('Word');
		if(isset($_GET['id'])) $item = M('Word')->find($_GET['id']);
		$this->assign('item',$item);
		$this->display();
	}
	
    //删除
    public function del() {
    	$model = M("Word");
    	$id = intval($_GET['id']);
    	$res = $model->where("id=".$id)->delete();
    	if($res){
    		sys_info("删除成功",1);
    		redirect($_SERVER['HTTP_REFERER']);
    	}
    }
}
?>