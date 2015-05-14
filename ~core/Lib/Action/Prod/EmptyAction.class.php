<?php
class EmptyAction extends FrontAction
{
    function _empty()
    {
        $iid = MODULE_NAME;
        $map = array('iid'=>$iid,'status'=>1);
        $prod = M("Prod")->where($map)->find();
        if($prod)
        {
            $detail = $this->getOneTaoProd($iid);
            $alias = array();
            if($detail['props_name_formate']) $this->assign('vars',$detail['props_name_formate']);
            if($detail['property_alias'])
            {
                $alia = explode(";",$detail['property_alias']);
                foreach($alia as $alia)
                {
                    $one = explode(':',$alia);
                    $alias[$one[0].":".$one[1]] = $one[2];
                }
            }
            
            if($detail['skus'])
            {
                $price = array();
                $prop = array();
                $skus = array();
                foreach($detail['skus'] as $one)
                {
                    $price[] = $one['price'];
                    $one = explode(';',$one['properties_name']);
                    foreach ($one as $v)
                    {
                        $v = explode(":",$v);
                        if(!$prop[$v[0]]['name']) $prop[$v[0]]['name'] = $v[2];
                        $k = $v[0].":".$v[1];
                        if($alias && $alias[$k]) $v[3] = $alias[$k];
                        $prop[$v[0]]['list'][$k] = $v[3];
                    }
                }
                
                $price = array_unique ($price);
                if(count($price) > 1) 
                {
                    sort($price);
                    $price = array($price[0],  array_pop($price));
                }
                
                $this->assign('skus',$detail['skus']);
                $this->assign('attrs',$prop);
            }
            else $price = array($prod['price']);
            
            unset($detail['item_imgs'][0]);
            $this->assign('price',$price);
            $this->assign('detail',$detail);
            $this->assign("res",$prod);
            
            $this->assign("_title",$prod['name']);
            $this->display('Detail:index');
        }
    }
    
    //获取单个淘宝商品详情
    protected function getOneTaoProd($iid)
    {
        $md5iid = md5($iid);
        $path = "data/item/".$md5iid[0]."/".$md5iid{1}.'/';
        $item = F($md5iid,'',$path);
        if($item) return $item;
        
        set_time_limit(0);
        @import('@.ORG.Taoapi.TopClient');
        @import('@.ORG.Taoapi.RequestCheckUtil');
        @import('@.ORG.Taoapi.TaobaokeItemsDetailGetRequest');
        @import('@.ORG.Taoapi.ItemGetRequest');
        
        $tao    = getOption('tao');
	    $client = new TopClient;
		$client->appkey    = $tao['AppKey'];
		$client->secretKey = $tao['AppSecret'];
        
		$item = new ItemGetRequest;
		$item->setFields("is_tao,detail_url,shop_url,num_iid,title,nick,type,cid,seller_cids,props,props_name,input_pids,
            input_str,desc,pic_url,num,valid_thru,list_time,delist_time,stuff_status,
            location,price,post_fee,express_fee,ems_fee,has_discount,
            freight_payer,has_invoice,has_warranty,has_showcase,modified,increment,approve_status,
            postage_id,product_id,auction_point,property_alias,item_img,prop_img,sku,video,outer_id,is_virtual
        ");
        
		$item->setNumIid($iid); //属性例子：7642584420 包邮例子：15892875701
		$item = $client->execute($item);
        
        if($item) 
        {
            $item = objectToArray($item->item);//(array)$item->item;
            if($item['skus']['sku']) $item['skus'] = $item['skus']['sku'];
            if($item['item_imgs']['item_img']) $item['item_imgs'] = $item['item_imgs']['item_img'];
            if($item['videos']['video']) $item['videos'] = $item['videos']['video'];
            $item = setValByKeys(array('cid','desc','detail_url','props','props_name','property_alias','item_imgs','num','post_fee','props','skus'),$item);
            $item['props_name_formate'] = $this->getAttr($item['props_name']);
            $req = new TaobaokeItemsDetailGetRequest;
            $req->setFields("click_url,shop_click_url");
            $req->setNumIids($iid);
            $res = $client->execute($req);
            if($res)
            {
                $rs = objectToArray($res->taobaoke_item_details->taobaoke_item_detail);
                $item = setValByKeys(array("click_url","shop_click_url"),$rs,$item);
            }
            
            mk_dir($path);
            F($md5iid,$item,$path);
            return $item;
        }
	    return false;
    }
    
    //格式化商品属性信息
    protected function getAttr($str)
    {
        $str = trim($str);
        if($str)
        {
            $rs = array();
            $attr = explode(";", $str);
            foreach ($attr as $attr)
            {
                $one = explode(":",$attr);
                if(!$rs[$one[0]]['name']) $rs[$one[0]]['name'] = $one[2];
                $rs[$one[0]]['list'][] = $one[3];
            }
            
            $str = array();
            foreach($rs as $rs) $str[] = $rs['name']." : ".implode(' ',$rs['list']);
        }
        return $str;
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
