<?php
/**
 * 热销排行商品
 */
class HotWidget extends Widget{
	public function render($data){
		//语言选择
                $lang = isLang();
                //需要翻译
                
		//添加缓存
		$cache = "_hot";
		$data['hot'] = S($cache);
		if(!$data['hot']){
			$map['status'] = 1;
			$map['recommend'] = 1;
                        $data['hot'] = M("Prod")->order("id desc")->field('id,iid,name,ename,rname,pic,price,sold,tao_sold')->where($map)->limit(20)->select();
                        
			if($data['hot']) S($cache,$data['hot'],300);
		}
 		//测试
                /*
 		$transBdFlag = false;
 		if(!$transBdFlag){//如果 百度等在线翻译接口调用关闭 此处将不作翻译
 			transLangs($data['hot'],'help');
 		}*/
 		//dumpf($data);
                
                foreach ($data['hot'] as $key => &$value) {
                    if($lang !== false){
                        if($lang == 'ru'){
                            if($value['rname']){
                                $value['name'] = $value['rname'];
                            }
                        }
                    }else{
                        if($value['ename']){
                            $value['name'] = $value['ename'];
                        }
                    }

                }
                
                //dumpf($data);exit;
		return $this->renderFile('index',$data);
	}
}