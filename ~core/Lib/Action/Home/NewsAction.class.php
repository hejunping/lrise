<?php 

class NewsAction extends FrontAction{

	public function index(){
		
		$list = getItem('info'); 
		$newsList = array();
	    foreach($list as $k=>$val){
	    	if($k == 'news'){
	    		$list = $list[$k];
	    		$map['pid'] = $list['id']; 	
	    	}
	    }
	    
	    import('ORG.Util.Page');
	    $newsModel = M('Info');
	    $count = $newsModel->where($map)->count();
	    $pMax  = ceil($count/20);
	    $page = new Page($count,20);
	    $page->setConfig('prev','previous');
	    $page->setConfig('next','next');
	    $page->setConfig('theme','%upPage% %linkPage% %downPage%');
	    $show = $page->show();
	    
	    $newsList = $newsModel->where($map)->limit($page->firstRow.','.$page->listRows)->order('ctime desc')->select();
	    //调用翻译
            $pre = C('C_PREFIX');
	    transLangs($newsList,'news','',$pre,'info');
	    //dumpf($newsList);exit;
	    $this->assign('list',$newsList);
	    $this->assign('page',$show);
	    $this->assign('pMax',$pMax);
		$this->display();
	}
	
}
?>