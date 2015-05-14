<?php
//网站导航
class NavWidget extends Widget 
{
	public function  render ($data)
	{
		$nav = getItem('nav_top',1);//获取导航标题
    	$data['_nav'] = array(
			array('index','首 页',U('home/index/index')),
			array('prod','特产食品',U('prod/index/index')),
			array('tea','各地茗茶',U('prod/tea/index')),
			array('fruit','蔬果菜市',U('prod/fruit/index')),
			array('nutrition','滋养保健',U('prod/nutrition/index')),
			array('handfood','手工美食',U('prod/handfood/index')),
    	);
        
    	$i=0;
    	foreach($nav as $v){
    		$data['_nav'][$i][1] = $v['name'];
    		$i++;
    	}
    	//获取商品的全部分类
		if(GROUP_NAME == 'Prod' && MODULE_NAME == 'Index'){
			$data['_mod'] = 'prod';
		}else{
			$data['_mod'] = strtolower(MODULE_NAME);
		}
		return $this->renderFile('index',$data);
	}
}
?>