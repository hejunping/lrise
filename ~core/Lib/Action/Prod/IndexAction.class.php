<?php
class IndexAction extends FrontAction {
    public $rollPage = 10;
    public function index() {
        $erate = currency();
        import("@.ORG.Page.Page");
        $map = array('status'=>1);
        $startprice  = $_GET['startprice'] * $erate;
    	$endprice    = $_GET['endprice'] * $erate;
        $statu = $_GET['statu'];
        $orderBy = $_GET['order'];
        $pagesize = $_GET['pagesize'];
        $p = $_GET['p'];

        if (!empty($_GET['cid'])) {
            $id = $_GET['cid'];
            $map['ctype'] = $id;
        } elseif (!empty($_GET['ecid'])) {
            $id = $_GET['ecid'];
            $map['ctype2'] = $id;
        } else {
            $id = 461;
            $map['ctype'] = $id;
        }

        
        $res = M('Item')->where('id='.$id)->find();
        if($res){
        	 $count = M('Item')->where('pid='.$res['id'])->select();
        	 if($count > 0){
        	 	  $address_1['name'] = $res['name']; 
        	 	  $address_1['cid'] = $res['id'];
        	 }else{
        	 	$address_2['name'] = $res['name'];
        	 	$address_2['ecid'] = $res['id'];
        	 	$res1 =  M('Item')->where('id='.$res['pid'])->find();
        	 	if($res1){
        	 		$address_1['name'] = $res1['name'];
        	 		$address_1['cid'] = $res1['id'];
        	 	}
        	 }
        }
		//测试修改
        if ($orderBy) $order = "sellevel desc";
        else  $order = "tao_sold desc";
    	if($endprice  && $startprice == 0){
    		 $map['price'] = array(array('egt',$startprice),array('elt',$endprice));
    	}elseif($endprice  && $startprice){
    		$map['price'] = array(array('egt',$startprice),array('elt',$endprice));
    	}elseif($startprice){
    		$map['price'] = array('egt',$startprice);
    	}
        
        
        $credit = intval($_GET['credit']);
        if($credit > 0 && $credit < 21) $map['sellevel'] = array('egt',$credit);
        if ($pagesize) {
            $pagesize = $pagesize;
        } else {
            $pagesize = 20;
        }
        
        // dump($start);
        //dump($mapcount);
        
        $mapcount = M('Prod')->where($map)->count();
        $maxPage = ceil($mapcount / $pagesize);
        $Page = new Page($mapcount, $pagesize);
        $Page->setConfig('prev', '&lt;&lt;previous');
        $Page->setConfig('next', 'Next&gt;&gt');
        $Page->setConfig('theme', '%upPage%  %linkPage% %downPage% ');

        //dump($map);
        $list = M('Prod')->where($map)->limit($Page->firstRow . ',' . $Page->listRows)->select();
        $show = $Page->show();
        //echo M('prod')->getLastSql();
        $this->assign('mapcount', $mapcount);
        $this->assign('pMax', $maxPage);
        $this->assign('page', $show);
        $this->assign('list', $list);
        $address_1['name'] = transVar($address_1['name']);
        $address_2['name'] = transVar($address_2['name']);
        $this->assign('address_1',$address_1);
        $this->assign('address_2',$address_2);
        
        if (!empty($statu)) {
            $this->assign('y', $statu);
        } else {
            $this->assign('x', 'x');
        }
        
        $this->assign("_title",$address_2['name'].'_'.$address_1['name']);
        $this->display();
    }

}

