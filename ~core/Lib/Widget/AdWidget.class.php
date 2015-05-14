<?php
/**
 * 页面显示的广告
 */
class AdWidget extends Widget{
	public function render($data){
		//获取广告信息
		$data['ad'] = getAd($data['tpl'],$data['num']);
		if($data['tpl']=='ad_float'){
			$map['ename'] = 'ad_float';
			$rue=M("Item")->where($map)->find();
			$data['wh']=explode(',',$rue['bak1']);
		}
		//测试
		//if($data['tpl'] == 'news')
		//dump($data);
		//测试翻译
		transLangs($data['ad'],'ad');
		return $this->renderFile($data['tpl'],$data);
	}
}