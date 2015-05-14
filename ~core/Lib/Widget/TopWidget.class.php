<?php
class TopWidget extends Widget {
	
	public function render($data){
		//添加缓存
		$cache = "_top";
		$map['status'] = 1;
		$map['recommend'] = 1;
		$data['top'] = M("Prod")->cache(true,300)->order("tao_sold desc")->field('id,iid,name,pic,price,sold,tao_sold')->where($map)->limit(10)->select();
		
		return $this->renderFile('index',$data);
	}
}