<?php

class SearchAction extends FrontAction {
    public function index() {
    	import("@.ORG.Page.Page");
        $keyword     = $_GET['keyword'];   
        if($keyword)
        {
            if($this->checkScreen(strtolower($keyword))) 
                $this->error('Sorry, no matches were found for your refined search');
            $this->getItem($keyword);
        }
        $erate = currency();
    	$id          = $_GET['CId'];          //分类id
    	$statu       = $_GET['statu'];     
    	$orderBy     = $_GET['order'];
    	$pagesize    = $_GET['pagesize'];
    	$credit    = intval($_GET['credit']);
    	$startprice  = $_GET['startprice']  * $erate;
    	$endprice    = $_GET['endprice']  * $erate;
    	$p           = $_POST['P'];   
    	$itemModel = M('Item');
    	$prodModel = M('Prod');
        
    	//组装条件 关键字、id
    	if($keyword && $id){       //关键字和id同时存在
    		$map['name'] = array('like','%'.$keyword.'%');
    		$res = $itemModel->where('id='.$id)->find();
    		if($res){
    			$count = $itemModel->where('pid='.$id)->count();
    			if($count > 0) $map['ctype'] = $id;   //一级分类id	
    			else $map['ctype2']  = $id;   //二级分类id
    		}
    	}elseif($keyword){      //存在关键字
    		$map['name'] = array('like','%'.$keyword.'%');
    	}else if($id) {                  //存在分类id
    		$res = $itemModel->where('id='.$id)->find();
    		if($res){
    			if($res['pid'] == "3") $map['ctype'] = $id;    //一级分类id		
    			else $map['ctype2']  = $id;     //二级分类id	
    			
    			$res = $itemModel->where('id='.$id)->find();
    			if($res){
    				$cateName = $res['name'];  // 分类名
    			}
    		}
    	}
    	
        if($credit > 0 && $credit < 21) $map['sellevel'] = array('egt',$credit);
        if(!$map) redirect(U('home/index/index'));
        
    	//组装排序方式
    	if($orderBy) $order = "sellevel desc";
    	else  $order = "tao_sold desc";
    	
    	//组装每页显示的条数
    	if($pagesize) $pagesize = $pagesize;
    	else $pagesize = 20;
    	
    	//组装价格条件
    	if($endprice  && $startprice == 0){
    		 $map['price'] = array(array('egt',$startprice),array('elt',$endprice));
    	}elseif($endprice  && $startprice){
    		$map['price'] = array(array('egt',$startprice),array('elt',$endprice));
    	}elseif($startprice){
    		$map['price'] = array('egt',$startprice);
    	}
    	
    	$mapcount = $prodModel->where($map)->count();  //符合条件总数
        if(!$mapcount) $this->error('Sorry, no matches were found for your refined search');
    	$maxPage = ceil($mapcount/$pagesize);
    	$Page = new Page($mapcount,$pagesize);    //实例化分页类
    	$Page->setConfig('prev','&lt;&lt;&nbsp;Previous');
    	$Page->setConfig('next','Next&nbsp;&gt;&gt;');
    	$Page->setConfig('theme',"%upPage% %linkPage% %downPage% ");
    	$show = $Page->show();          //分页显示输出
    	$data = $prodModel->where($map)->limit($Page->firstRow.','.$Page->listRows)->order($order)->select();
    	$this->assign('mapcount',$mapcount);
        $this->assign('page',$show);
    	$this->assign('list',$data);
        $this->assign('mapcount',$mapcount);
        $this->assign('pMax',$maxPage);
        $this->assign('cateName',$cateName);
    	if(!empty($statu)) $this->assign('y','y');
    	else $this->assign('x','x');
        $this->assign("_title","Search on iOrder.com");
    	$this->display();
  
    }
    
    protected function getItem($key)
    {
        if(strstr($key,'http://'))
        {
            preg_match('/[\?&](id|mallstItemId)=(?<iid>\d{9,12})/is',$key,$rs);
            if($rs['iid'])
            {
                $iid = $rs['iid'];
                $prod = M("Prod")->field('iid')->where(array('iid'=>$iid))->find();
                if($prod) redirect (U('prod/'.$prod['iid'].'/index'));
                else
                {
                    set_time_limit(0);
                    @import('@.ORG.Taoapi.TopClient');
                    @import('@.ORG.Taoapi.RequestCheckUtil');
                    @import('@.ORG.Taoapi.ItemGetRequest');
                    $tao=getOption('tao');
                    $c = new TopClient;
                    $c->appkey = $tao['AppKey'];
                    $c->secretKey = $tao['AppSecret'];
                    
                    $req = new ItemGetRequest;
                    $req->setFields("title,nick,num_iid,pic_url,price,cid,post_fee");
                    $req->setNumIid($iid);
                    $resp = $c->execute($req);
                    $resp = objectToArray($resp->item);
                    $time = time();
                    $base = array('status'=>1,'recommend'=>0,'ctime'=>$time,'utime'=>0,'lutime'=>$time);
                    $ctype = $this->getCtype($resp['cid']);
                    $prod['ctype']     = $ctype[0];
                    $prod['ctype2']    = $ctype[1];
                    $prod = setValByKeys(array(
                        'num_iid'=>'iid',
                        'pic_url'=>'pic',
                        'title'=>'name',
                        'price',
                        'nick'=>'shopname',
                        'post_fee'=>'freight',
                        'cid'
                    ),$resp,$prod);
                    $prod = array_merge($prod,$base);
                    
                    $id = M('Prod')->add($prod);
                    if($id > 0) redirect (U('prod/'.$prod['iid'].'/index'));
                }
            }
            
            else $this->error('Sorry, no matches were found for your refined search');
        }
    }
    
    //检查是否含有过滤词
    protected function checkScreen($title)
    {
        $screen = getOption("tao","tao_screen");
        if($screen) 
        {
            $screen = str_replace("，", ",", $screen);
            $screen = explode(",",$screen);
            
            foreach ($screen as $screen)
            {
                if(strstr($title, $screen)) return true;
            }
        }
        
        return false;
    }
    
    protected function getCtype($cid)
    {
        $cate = M("Item")->where('bak3='.$cid)->find();
        if($cate) return array($cate['pid'],$cate['id']);
        else return array(0,0);
    }
}


function setValByKeys($key,$sou,$dis = array())
{
    foreach($key as $k=>$v) 
    {
        if(is_numeric($k)) $dis[$v] = $sou[$v];
        else $dis[$v] = $sou[$k];
    }
    return $dis;
}

function objectToArray($d) 
{
    if (is_object($d)) $d = get_object_vars($d);
    if (is_array($d)) return array_map(__FUNCTION__, $d);
	else return $d;
}
?>
