<?php
/**
 * 热销排行商品
*/
class HotindexWidget extends Widget{
	public function render($data){

		//添加缓存
		import('ORG.Util.Page');
		$cache = "_hot";
// 	    $data['hot'] = S($cache);
		$pageSize = $data['pageSize'];
		if(!$data['hot']){
			$map['status'] = 1;
			$map['recommend'] = 1;
			if($pageSize) $pageSize = $pageSize;
			else $pageSize = 12;
			$count = M('Prod')->where($map)->count();
			$page = new Page($count,$pageSize);
			$page->setConfig('prev','previous');
			$page->setConfig('next','next');
			$page->setConfig('theme',"%upPage% %linkPage% %downPage%");
			$show = $page->show();
			$data['page'] = $show;
			$data['hot'] = M("Prod")->order("id desc")->field('id,name,pic,price,sold')->where($map)->limit($page->firstRow.','.$page->listRows)->select();

// 			if($data['hot']) S($cache,$data['hot'],24*3600);
		}

		return $this->renderFile('index',$data);
	}
}