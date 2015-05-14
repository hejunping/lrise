<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends FrontAction 
{
    public function index()
    {   //测试多语言

        //$lang1 = L('welcome');
        $lang1 = L('welcome');
        $this->assign('lang1',$lang1);
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
        //测试
        $siteArr = array('New user','Shopping Guide','Payment & Charge','Order Instruction','Transportation','Customer Service','Tool/Help');
		//调用翻译
        transLangs($sitemap,'areacate','pages');
        transLangs($prod,'areacate','sub');
        
        $this->assign('sitemap',$sitemap);
        $this->assign('allcate',$prod);
        $this->assign('siteArr',$siteArr);
        $this->display();
    }
    
    public function link()
    {
        $link = getAd("ad_links");
        $this->assign('link',$link);
        $this->display();
    }
    
     public function search()
    {
       // $k = $_GET['search'];
        $kk = urldecode($this->_get('search'));
        $map = array();
        $map['status'] = 1;
        $map['name'] = array('like','%'.$kk.'%');
        $model = M("Info");
        $res = $model->where('name='.$map['name']['0'])->select();
        //dump($res);
        $this->display();
    }
    
    public function page(){
        $id = $this->_get('id','intval');
        if($id > 0) $page = M("Info")->find($id);
        if(!$page) redirect (U("home/index/index"));
        $this->assign("page",$page);
    	$infoArr = range(281,285);
    	$item = M('Item');
    	$info = M('Info');
    	$list = array();
    	foreach($infoArr as $k=>$v){
    		$list[$k] = $item->where('id='.$v)->field('name')->find();
    		$list[$k]['sub'] = $info->where('pid='.$v)->field('id,name')->select();
    	}
    	$this->assign('list',$list);
    	$this->display();
    }
}
?>