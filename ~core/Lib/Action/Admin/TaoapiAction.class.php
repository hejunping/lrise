<?php
set_time_limit(0);
@import('@.ORG.Taoapi.TopClient');
@import('@.ORG.Taoapi.RequestCheckUtil');
@import('@.ORG.Taoapi.TaobaokeItemsGetRequest');
@import('@.ORG.Taoapi.ItemGetRequest');
@import('@.ORG.Taoapi.ItempropsGetRequest');
@import('@.ORG.Taoapi.ItemsListGetRequest');
class TaoapiAction extends AdminBaseAction
{
    var $tao    = null; //淘宝客配置
    var $client = null; //淘宝API实例
    protected function _initialize()
	{
        parent::_initialize();
        $this->tao    = getOption('tao');
        //测试
        //dump($this->tao);
	    $this->client = new TopClient;
		$this->client->appkey    = $this->tao['AppKey'];
		$this->client->secretKey = $this->tao['AppSecret'];
    }
    
	public function index()
    {
		$item=M('Item');
		if(isset($_GET['ctype']) && $_GET['ctype'] > 0)
        {
			$map['pid'] = $_GET['ctype'];//所有
     	    $list       = $item->where($map)->select();
		}
        else
        {
		    $map['pid'] = '3';
     	    $res        = $item->field('id')->where($map)->select();
            
			$arr        = array();
	     	foreach ($res as $k=>$v) $arr[] = $res[$k]['id'];
            
	     	$maps['pid'] = array('in',$arr);
	     	$list        = $item->where($maps)->order('id desc')->select();
		}
        
		$this->assign('list',$list); 
		$this->display();
	}
	
	//采集详细页
	public function forms()
    {
		$id  = $_GET['id'];
		$rue = M('Item')->where('id='.$id)->find();
		$this->assign('rue',$rue);
        $this->assign('keys',F("keys".$id,'','data/keys/'));
		$this->display();
	}
	
	//采集动作
	public function add()
    {
    	//测试
    	echo '$_post:';
    	dump($_POST);
    	
        $id=$_POST['ctype'];
		if(isset($id))//一级栏目
        {
            $ruex['ctype']   = trim($_POST['ctype']);	//本地类目1级 
			$ruex['ctype2']  = trim($_POST['ctype2']);	//本地类目2级
			$ruex['keyword'] = trim($_POST['keyword']);
			$ruex['cid']     = trim($_POST['cid']);	//淘宝类目id
			$ruex['page_no'] = trim($_POST['page_no']);
            F("keys".$_POST['id'],$ruex['keyword'],'data/keys/');
		    if($ruex['page_no']<1)$this->_error('采集页数不能小于  1');
			session('ruex',$ruex);
			$i=1;
			session('ruei',$i);
        }
        else
        {
            $ruex=session('ruex');
			$i=session('ruei')+1;
			session('ruei',$i);
		}
         
		$list = $this->getTaoData($i,$ruex);//$ruex部分字段  taoapi所需
		//测试
		dump($list);
	    $this->saveData($list, $ruex);//$ruex本地保存所需
	   
		if($i==$ruex['page_no'])
        {
			$datass['bak2'] = time();
			M('Item')->where('id='.$ruex['ctype2'])->save($datass);
			session('ruei',null);session('ruex',null);
			redirect(U('admin/taoapi/index'),'1','采集完成');
		}
        else redirect(U('admin/taoapi/add'),'3','正在采集第'.$i.'页 ，共'. $ruex['page_no'].'页  后退浏览器可中断采集！采集中……');
	}
	
	public function batch()
    {
		$arra = explode(',',$_POST['arra']);
        if($arra)
        {
            foreach($arra as $one) $array[$one] = F("keys".$one,'','data/keys/');
            $this->assign('keys',$array);
            $map['id'] = array('in',$arra);
            $rue = M('Item')->where($map)->select();
            $this->assign('list',$rue);
            session('ass',$arra);
            $this->display();
        }
	}
	
	//采集接口配置 调用
    public function getTaoData($page,$ruex)
    {
		$req = new TaobaokeItemsGetRequest;
		$req->setFields("num_iid,title,nick,pic_url,price,click_url,shop_click_url,seller_credit_score,volume");
		if($ruex['keyword']) $req->setKeyword($ruex['keyword']);
        if($ruex['cid']) $req->setCid ($ruex['cid']);
		$req->setNick($this->tao['nick']);
		
		if(!empty($this->tao['start_credit'])) $req->setStartCredit($this->tao['start_credit']); //最低信用
	    if(!empty($this->tao['end_credit']))   $req->setEndCredit($this->tao['end_credit']); //最高信用
	    if(!empty($this->tao['sort'])) $req->setSort($this->tao['sort']); //排序
	    if(!empty($this->tao['start_price'])) $req->setStartPrice($this->tao['start_price']); //最低价
	    if(!empty($this->tao['end_price'])) $req->setEndPrice($this->tao['end_price']); //最高价
	    if($this->tao['is_guarantee']=="true") $req->setGuarantee("true"); //是否查询消保卖家
        
	    //每页返回结果数.最大每页20
	    $req->setPageNo($page);//采集页数  后台填写采集时的表单：产品分类  淘宝类目id 关键字 采集页数
        $req->setPageSize(20);//每页20条
		$resp = $this->client->execute($req);
        $resp = objectToArray($resp->taobaoke_items);
        
        $iids = array();
        foreach($resp['taobaoke_item'] as $one) $iids[] = $one['num_iid'];
        //测试
        //echo '$iids:';
        //dump($iids);die();
        if($iids)
        {
            $req = new ItemsListGetRequest;
            $req->setFields("num_iid,post_fee");
            $req->setNumIids(implode(',',$iids));
            $postFee = $this->client->execute($req, $sessionKey);
            $postFee = objectToArray($postFee->items);
            $postFee = $postFee['item'];
            foreach($postFee as $postFee) $resp['postFee'][$postFee['num_iid']] = $postFee['post_fee'];
        }
        
		return  $resp;
	}
    
    //入库
    public function saveData($rue,$ruex)
    {
        $screen = $this->tao['tao_screen'];
        if($screen) 
        {
            $screen = str_replace("，", ",", $screen);
            $screen = explode(",",$screen);
        }
        
        $model = M("Prod");
        $time = time();
        $base = array('ctype'=>$ruex['ctype'],'ctype2'=>$ruex['ctype2'],'cid'=>$ruex['cid'],'status'=>1,'recommend'=>0,'ctime'=>$time,'utime'=>0,'lutime'=>$time);
        foreach ($rue['taobaoke_item'] as $v) 
        {
            $prod = array();
     	 	$v['title'] = trim(strip_tags($v['title']));
            if($screen && $this->checkScreen($v['title'], $screen)) continue;
            $map   = array('iid'=>$v['num_iid']);
     	  	$old   = $model->field('id,status,lutime')->where($map)->find();
     	  	if(!$old)
            {
                $prod = setValByKeys(array(
                    'num_iid'=>'iid',
                    'pic_url'=>'pic',
                    'title'=>'name',
                    'price',
                    'volume'=>'tao_sold',
                    'nick'=>'shopname',
                    'seller_credit_score'=>'sellevel'
                    ),$v,$prod);
                
                if($rue['postFee'][$prod['iid']] > 0) $prod['freight'] = $rue['postFee'][$prod['iid']];
                $prod = array_merge($prod,$base);
                if(!$model->add($prod)) echo mysql_error().'<br/>';
            }
            else 
            {
                if(!$old['status'] || ($time - $old['lutime'] < 300) ) continue;
                $prod = setValByKeys( array(
                    'num_iid'=>'iid',
                    'pic_url'=>'pic',
                    'title'=>'name',
                    'price',
                    'volume'=>'tao_sold',
                    'nick'=>'shopname',
                    'seller_credit_score'=>'sellevel'
                    ),$v,array(
                        'ctype'=>$ruex['ctype'],
                        'ctype2'=>$ruex['ctype2'],
                        'cid'=>$ruex['cid'],
                        'lutime'=>$time
                    )
                );
                if($rue['postFee'][$prod['iid']] > 0) $prod['freight'] = $rue['postFee'][$prod['iid']];
                else $prod['freight'] = "0.00";
                
                if(!$model->where(array('id'=>$old['id']))->save($prod)) echo mysql_error().'<br/>';
            }
        }
    }

    //检查是否含有过滤词
    protected function checkScreen($title,$screen)
    {
        foreach ($screen as $screen)
        {
            if(strstr($title, $screen)) return true;
        }
        return false;
    }
    
	//删除采集
	public function keydele()
    {
		$stime=$_POST['stime'];
		if(isset($stime))
        {
		   $stime=strtotime($stime);
		   $map['ctime']=array('lt',$stime);
		   $map['collection']=1;
		   M('Prod')->where($map)->delete();
		}
		$this->display();
	}
    
	//批量采集动作
	public  function addss()
    {
		$arr     = session('ass');
		$page_no = $_POST['page_no'];
		if(isset($page_no) || session('j') > session('page_no'))
        {
		    session('j',++$j);
		    if(isset($page_no))
            {
                for($c=0;$c<count($arr);$c++){
                    $keyw[$c]['key']=$_POST['keyw'.$arr[$c]];
                    $keyw[$c]['cid']=$_POST['cid'.$arr[$c]];
                    F("keys".$arr[$c],$keyw[$c]['key'],'data/keys/');
                }
            
                session('keyw',$keyw);
                session('count',count($arr)-1);
                session('i',0);
                session('page_no',$page_no); 
                if($page_no<1) $this->_error('采集页数不能小于  1');
            }
        
		    $ruex['ctype2'] = $arr[session('i')];    
		    $bak = M('Item')->where('id='.$ruex['ctype2'])->find();
			$ruex['ctype'] = $bak['pid'];
			$keyw = session('keyw');
			$ruex['keyword'] = $keyw[session('i')]['key'];
            $ruex['cid']     = $keyw[session('i')]['cid'];
		    session('ruex',$ruex);
		}
        else
        {
			$ruex = session('ruex');
			$j    = session('j');
			session('j',++$j);
		}
		
        $list = $this->getTaoData($j,$ruex);//抓取  
        $this->saveData($list, $ruex);//写入
        if($j > session('page_no'))
        {
			if(session('i')==session('count'))
            {
				session('ass',null);
				redirect(U('admin/taoapi/index'),'1','采全部完成');
			}
            else
            { 
				$i = session('i');
				session('i',++$i);
				$datass['bak2'] = time();
			    M('Item')->where('id='.$ruex['ctype2'])->save($datass);
				redirect(U('admin/taoapi/addss'),3,'本组采集完成，3秒后，继续下一组数据抓取');
			}
		}
        else redirect(U('admin/taoapi/addss'),'2',$ruex['keyword'].'正在采集第'.session('j').'页 ，共'. session('page_no').'页 后退浏览器可中断采集！   采集中……');	
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