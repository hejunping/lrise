<?php

class InfoAction extends FrontAction {

    public function index() {    
    	
        $res = M('Info')->find($_GET['id']);
        if($res['id'] == 411 || $res['ename'] == 'sitemap') redirect (U('home/index/sitemap'));
        if($res['id'] == 416 || $res['ename'] == 'link') redirect (U('home/index/link'));
        if(in_array($res['id'], array(414,415))) redirect (U('home/index/page?id='.$res['id']));
        //dump($res);
        $kk = $_POST['Key'];
        if(!empty($kk)){
	        $map = array();
	        $map['status'] = 1;
	        $map['name'] = array('like','%'.$kk.'%');
	        //dump($kk);
	        $model = M("Info");
	        $rs = $model->where("name like '%$kk%' ")->find();
        }else{
            $rs ="";
        }
        //echo M('Info')->getLastSql();
      	//测试
      	//dump(($rs['text']));echo '<hr/>';
      	//dump(($res['text']));echo '<hr/>';
      	//dumpf($res);
        
        $pre = C('C_PREFIX');
        
      	//调用翻译
      	transLangs($rs,'text','',$pre,'info');
      	transLangs($res,'text','',$pre,'info');
      	//dumpf($res);exit;
        $this->assign('rs',$rs);
        $this->assign('res',$res);
        $this->display();
    }
    
	 public function sitemap()
	    {
	        $sitemap = S("_sitemap");
	        if(!$sitemap)
	        {
	            $sitemap = array();
	            $info = getItem("info");
	            $siteArr = array(308,322,328,331,278,286,332,333);
	            foreach($info as $k=>$info) if(is_numeric($k) && $info['bak2'] == '0' && !(in_array($info['id'],$siteArr)))  $sitemap[] = $info;   
	            foreach($sitemap as $k=>$map)
	            {
	                $sitemap[$k]['pages'] = M("Info")->field('id,name')->where(array('status'=>1,'pid'=>$map['id']))->order('top desc,sort desc,id asc')->select();
	            }
	            S("_sitemap",$sitemap,0);
	        }
	     
	        $prod = S("_allcate");
	        if(!$prod)
	        {
	            $prod = array();
	            $info = getItem("prod");
	            foreach($info as $k=>$info) if(is_numeric($k))  $prod[] = $info;
	            foreach($prod as $k=>$one)
	            {
	                $prod[$k]['sub'] = M("Item")->field('id,name')->where(array('status'=>1,'pid'=>$one['id']))->order('sort desc,id asc')->select();
	            }
	            S("_allcate",$prod,7200);
	        }
	        
	        $siteArr = array('New user','Shopping Guide','Payment & Charge','Order Instruction','Transportation','Customer Service','Tool/Help');
	        $this->assign('sitemap',$sitemap);
	        $this->assign('allcate',$prod);
	        $this->assign('siteArr',$siteArr);
	        $this->display();
	    }
	    

}

?>
