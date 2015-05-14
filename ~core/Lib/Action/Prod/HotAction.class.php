<?php
class HotAction extends FrontAction
{
	function index()
    {
		//添加缓存
		import('ORG.Util.Page');
		$pageSize = $_GET['pagesize'];
		$map['status'] = 1;
		$map['recommend'] = 1;
		if($pageSize) $pageSize = $pageSize;
		else $pageSize = 16;
		$count = M('Prod')->where($map)->count();
		$pMax = ceil($count/$pageSize);
		$page = new Page($count,$pageSize);
		$page->setConfig('prev','previous');
		$page->setConfig('next','next');
		$page->setConfig('theme',"%upPage% %linkPage% %downPage%");
		$show = $page->show();
		$list = M("Prod")->order("id desc")->field('id,iid,name,pic,price,sold,tao_sold')->where($map)->limit($page->firstRow.','.$page->listRows)->select();
		$this->assign('list',$list);
		$this->assign('page',$show);
		$this->assign('pMax',$pMax);
        $this->assign("_title","Hot Shopping");
		$this->display();
	}
}
