<?php 
//初始化 引入
@import('@.ORG.Taoapi.TopClient');
@import('@.ORG.Taoapi.RequestCheckUtil');
//引入            淘宝客商品抓取  
@import('@.ORG.Taoapi.TaobaokeItemsGetRequest');
//引入           获取标准商品类目属性     
@import('@.ORG.Taoapi.ItempropsGetRequest');
//引入           单个商品抓取         
@import('@.ORG.Taoapi.ItemGetRequest');
//引入           获取后台供卖家发布商品的标准商品类目          
@import('@.ORG.Taoapi.ItemcatsGetRequest');
//引入            增量    获取后台类目数据 
@import('@.ORG.Taoapi.ItemcatsIncrementGetRequest');
//引入           查询商家被授权    品牌列表  and类目列表 
@import('@.ORG.Taoapi.ItemcatsAuthorizeGetRequest');

class TextAction extends Action{
	
	//public $tao=getOption('tao');
	
	//淘宝客商品抓取
    public function tini(){
    	$c = new TopClient;
		$c->appkey = '21140703';
		$c->secretKey = '399719c539c1a28ad1d3d9f3bf44b42f';
		$req = new TaobaokeItemsGetRequest;
		$req->setFields("num_iid,title,nick,pic_url,price,click_url,commission,commission_rate,commission_num,commission_volume,shop_click_url,seller_credit_score,item_location,volume");
		$req->setKeyword("零食");
		$req->setNick("王世亮1733");
		$resp = $c->execute($req);
		dump($resp->taobaoke_items);
		$ss=$resp->taobaoke_items->taobaoke_item;
		 foreach ($ss as $value) {
		 	dump($value->title);
		 }
		 
	}
	
	public function news(){
		
		 $this->shuxing();
		
	}
	//获取标准商品类目属性 
	
	public function shuxing(){
		$c = new TopClient;
		$c->appkey = '21140703';
		$c->secretKey = '399719c539c1a28ad1d3d9f3bf44b42f';
		$req = new ItempropsGetRequest;
		$req->setFields("pid,name,must,multi,prop_values,is_input_prop,type,modified_time,modified_type,required,parent_pid,parent_vid,is_key_prop,is_sale_prop,is_color_prop,is_enum_prop,is_item_prop,must,multi,prop_values,status,sort_order,child_template,is_allow_alias");
		$req->setCid(448109930);
		$req->setPid(1627207);
		$resp = $c->execute($req);
		dump($resp->item_props->item_prop->prop_values);
		
	}
	//获取后台供卖家发布商品的标准商品类目 
	public function mclass(){
		$c = new TopClient;
		$c->appkey = '21140703';
		$c->secretKey = '399719c539c1a28ad1d3d9f3bf44b42f';
		$req = new ItemcatsGetRequest;
		$req->setFields("cid,parent_cid,name,is_parent,status,sort_order");
		$req->setParentCid(0);
		//$req->setCids(50006842);
		$resp = $c->execute($req);
	//	dump($resp->item_cats->item_cat->name);
		foreach ($resp->item_cats->item_cat as $value) {
			echo $value->name."<br/>";
		}
	//	dump($resp);
	}
	// 获取标准商品类目    属性 
public function  pclass(){
	    $c = new TopClient;
		$c->appkey = '21140703';
		$c->secretKey = '399719c539c1a28ad1d3d9f3bf44b42f';
		$req = new ItempropsGetRequest;
		$req->setFields("pid,name,must,multi,prop_values");
        $req->setCid(50010850);
        $resp = $c->execute($req);
        dump($resp->item_props);
        dump($resp);
}
	

//单个商品抓取
	public function onesssini(){
		$c = new TopClient;
		$c->appkey = '21140703';
		$c->secretKey = '399719c539c1a28ad1d3d9f3bf44b42f';
		$req = new ItemGetRequest;
		$req->setFields("detail_url,num_iid,title,nick,type,cid,seller_cids,props,input_pids,input_str,desc,pic_url,num,valid_thru,list_time,delist_time,stuff_status,location,price,post_fee,express_fee,ems_fee,has_discount,freight_payer,has_invoice,has_warranty,has_showcase,modified,increment,approve_status,postage_id,product_id,auction_point,property_alias,item_img,prop_img,sku,video,outer_id,is_virtual");
		$req->setNumIid(13647140299);//17107768921
		$resp = $c->execute($req, $sessionKey);
		$ss=(array)$resp->item;
		dump($ss);
				$dd=(array)$ss["location"];
		dump($dd);
		
	}
	// 增量    获取后台类目数据 
	public function zclass(){
		$c = new TopClient;
		$c->appkey = '21140703';
		$c->secretKey = '399719c539c1a28ad1d3d9f3bf44b42f';
		$req = new ItemcatsIncrementGetRequest;
		$req->setCids("50010850");
		$req->setDays(1);
		$req->setType(1);
		$resp = $c->execute($req);
		dump($resp);
	}
	

	
	
	//查询商家被授权    品牌列表  and     类目列表 
	
	public function iclass(){
		$c = new TopClient;
		$c->appkey = '12309527';
		$c->secretKey = '5e2342d5ce15b24d2f24546b7a45ef4d';
		$req = new ItemcatsAuthorizeGetRequest;
		$req->setFields(" brand.vid, brand.name, item_cat.cid, item_cat.name, item_cat.status,item_cat.sort_order,item_cat.parent_cid,item_cat.is_parent, xinpin_item_cat.cid, xinpin_item_cat.name, xinpin_item_cat.status, xinpin_item_cat.sort_order, xinpin_item_cat.parent_cid, xinpin_item_cat.is_parent");
		$resp = $c->execute($req, $sessionKey);
	    dump($resp);
	    
	
	}
	
	public function aclass($iclass){
		$tao=getOption('tao');
		$c = new TopClient;
		$c->appkey = $tao['AppKey'];
		$c->secretKey =$tao['AppSecret'];
		$req = new ItemcatsGetRequest;
		$req->setFields("cid,parent_cid,name,is_parent,status,sort_order");
		//$req->setParentCid(0);
		$req->setCids(50010850);
		$resp = $c->execute($req);
		$pid=$resp->item_cats->item_cat->parent_cid;
		$name=$resp->item_cats->item_cat->name;
		if($pid!=0){
			$req->setCids($pid);
		    $resp = $c->execute($req);
		    $namex=$resp->item_cats->item_cat->name;
		    $namex=explode("/", $namex);
		    $map['pid']=3;
		    $map['bak1']=array('like','%'.$namex[0].'%');
		    $res= M('Item')->where($map)->find();
		    $names[]=$namex[0];
		    $names[]=$name[0];
		    
		}else{
			$names[]=$name[0];
			$names[]=null;
		}
		
		
		dump($res);
		dump($names);
		return $names;
	}
	public function tets(){
		
	}
	
	
	
}