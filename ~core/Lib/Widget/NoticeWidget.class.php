<?php
/**
 * 拍物公告
 */
class NoticeWidget extends Widget{

    public function  render ($data){ 
    	$cache = '_notice/'.md5('notice');  
    	$data['list'] = S($cache);
    	if(!$data['list']){
	    	$map = array();
			$map['pid'] = getItemById('info_notice',"info",'id');
			$res = M("Info")->field('id,name')->where($map)->order('top desc,id desc')->limit(4)->select();
			$data['list'] = $res;
			$cache_time = 300;
			if($data['list']) S($cache,$data['list'],$cache_time);
    	}
		return $this->renderFile('index',$data);
	}
}