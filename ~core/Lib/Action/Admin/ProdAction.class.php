<?php
/**
 * @name 产品管理
 * @author birdy
 * @date 2012-3-15
 * @version 1.0
 */
class ProdAction extends AdminBaseAction
{
	//首页
	public function index()
	{
		@import("ORG.Util.Page");
		$model = M("Prod");
		$map = array();
        if(isset($_GET['ctype']) && $_GET['ctype'] > 0) $map['ctype'] = $this->_get('ctype','intval');
        if($_GET['status'] == '0' || $_GET['status'] == '1')  $map['status'] = $this->_get('status','intval');
        if(isset($_GET['brand']) && $_GET['brand'] > 0) $map['brand'] = $this->_get('brand','intval');
	 	if(isset($_GET['key']) && $_GET['key'] != '产品名称/商品编号ID') 
        {
        	$key = $this->_get('key');
        	if(is_numeric($key)) {//商家编号
        		$map['id'] = abs(intval($key));
        	}else{//产品名称
            	$map['_string'] = 'name like "%'.$key.'%"';
        	}
        }       
		$total = $model->where($map)->count();
		if($total > 0)
		{
			$page = new Page($total,15);
			$list = $model->where($map)->order('id desc')->limit($page->firstRow.",".$page->listRows)->select();
			$this->assign("list",$list);
			$this->assign("page",$page->show());
		}
		$this->display();
	}    
  
    public function info()
    {
		$this->_create('ProdInfo','pid');
        if(isset($_GET['id'])) 
		{
			$item = M("Prod")->find($_GET['id']);
            if($item)
            {
                $info = M("ProdInfo")->where('pid='.$item['id'])->find();
                if(!$info) 
                {
                    $info = array();
                    $info['pid'] = $item['id'];
                    $info['sn'] = '';
                    $info['price'] = '0.00';
                    $info['sku'] = 0;
                    $info['contact'] = '';
                    $info['url'] = '';
                    $info['utime'] = time();
                    M("ProdInfo")->add($info);
                }
                $this->assign('item',$item);
                $this->assign('info',$info);
                $this->display();
            }
		}
    }
	//添加/修改
	public function form()
	{
		$res = $this->_create('Prod','id','upload');
		if(isset($_GET['id'])) 
		{
			$item = M("Prod")->find($_GET['id']);			
		}
		else 
		{
			 $freight = number_format(getOption('busy','busy_freight','10',false),2);//获取默认配置运费
			 $item = array('id'=>0,'price'=>'0.00','market'=>'0.00','sku'=>'9999','freight'=>$freight,'sort'=>'0');
		}
		
		//查询产品分类
    	$cate = getItem('prod');
    	$cateArr = array();
		foreach($cate as $k=>$v){
			if(in_array($v['id'],$cateArr)){
				continue;
			}else{
				$cateArr[$v['id']] = $v;
			}
		}
		//查询出产品子分类
		$sub = "";
		$where['status'] = 1;
		foreach($cateArr as $k=>$v){
			$where['pid'] = $v['id'];
			$sub = M('Item')->where($where)->field('id,name,bak2')->select();
			break;
		}
		$this->assign('cate',$cateArr);
		$this->assign('sub',$sub);//子分类
		$this->assign('item',$item);
		$this->display();
	}
	//删除
    public function delet(){
	  	$ids=array();
	  	$id=$_GET['arra'];
        $map['id']=array('in',$id);
      	M('Prod')->where($map)->delete();
	    redirect(U("admin/prod/index"));
	  }



	//状态值改变
	public function bool()
	{
		$this->_bool('Prod',array('status','sku','recommend'));
	}
	
	//拍品状态值改变
	public function bool2(){
		$this->_bool('Paiwu',array('recommend','status','show_index'));
	}
	
	//Ajax排序
	public function sort()
	{
		$id = intval($_GET['id']);
		$val = intval($_GET['val']);
		$this->_sort('Prod',$id,$val);
	}
	
	//Ajax排序
	public function sku()
	{
		$id = intval($_GET['id']);
		$val = intval($_GET['val']);
		$this->_sort('Prod',$id,$val,'sku');
	}
	
	//获取产品分类技术参数模板
	public function vars()
	{
		$id = intval($_GET['id']);
        $item = M("Item")->field('bak1')->find($id);
		echo $item['bak1'];
	}

	//产品订单
	public function order()
	{   	    
        @import("ORG.Util.Page");
		$order=M("Order");
		
		if($_POST['id'])//商品状态
        {
        	$res=array();
        	$res['Logname']=$_POST['Logname'];
        	$res['Lognumber']=$_POST['Lognumber'];
        	$res['weight']=$_POST['weight'];
        	$res['price']=$_POST['price'];
        	$res['addr']=$_POST['addr'];
        	$res['trackingno']= $_POST['trackingno'];
        	$res['Recipient']= $_POST['Recipient'];
        	$str=serialize($res);       
			$data['wl'] = $str;
			$data['status'] = 6;
            $data['utime'] = time();
            $co = array();
			$co['id'] = $_POST['id'];
            $co['status'] = 5;
			$reu = $order->where($co)->save($data);
            if($reu)
            {
                $o = M("Order")->field('buyer')->find($co['id']);
                @import('@.ORG.Msg.Messages');
                $mess = new Messages();
                $info = "您的订单（订单号：".$co['id']."）已发货，".$data['wl']."，<a href='".U('user/bid/orders?id='.$co['id'])."' class='cSong'>请确认收货</a>";
                $rue  = $mess->SendNews(1, array($o['buyer']), '发货通知', $info,'系统信息');
            }
		}
	    $map = array();
	  
        if($_GET['status'] == '0' || $_GET['status'] == '1' || $_GET['status'] == '2' || $_GET['status'] == '3' || $_GET['status'] == '4' || $_GET['status'] == '5'|| $_GET['status'] == '6' || $_GET['status'] == '7' ||$_GET['status'] == '8')  
             $map['status'] = $this->_get('status','intval');
                        
		if(isset($_GET['id']) && $_GET['id'] !=='' && $_GET['status'] == '-1' ) 		
        $map['id']= $this->_get('id','intval');              	
        $count=$order->where($map)->count();
		$p=new Page($count,20);
		$page=$p->show();
		$list=$order->where($map)->order("id DESC")->limit($p->firstRow.','.$p->listRows)->select();
		$prod=M('Prod');
	    foreach($list as $k=>$v){
	    	 $us[0]= M('User')->where('id='.$v['buyer'])->getField('account');//取出用户名
	    	 $us[1]= $list[$k]['buyer'];
	    	 $list[$k]['buyer']=$us;
		}	
		$this->assign("page",$page);
		$this->assign("list",$list);
		
		$this->display();
	}
     public function ordera(){
     	$id=$_GET['id'];
     	 dump($id);
     	$data['status']=1;
        $rue=M('Order')->where('id='.$id)->save($data);
     	if(!$rue)
     	{
     		$this->_error("系统出错");
     	}
     	 redirect(U('admin/prod/order'));
     }
 public function orderb(){
     	$id=$_GET['id'];
     	$data['status']=2;
        $rue=M('Order')->where('id='.$id)->save($data);
     	if(!$rue)
     	{
     		$this->_error("系统出错");
     	}
     	 redirect(U('admin/prod/order'));
     }
public function orderd(){
     	$id=$_GET['id'];
     	$data['status']=3;
        $rue=M('Order')->where('id='.$id)->save($data);
     	if(!$rue)
     	{
     		$this->_error("系统出错");
     	}
     	 redirect(U('admin/prod/order'));
     }
     public function ordere(){
     	$id=$_GET['id'];
     	$data['status']=4;
        $rue=M('Order')->where('id='.$id)->save($data);
     	if(!$rue)
     	{
     		$this->_error("系统出错");
     	}
     	 redirect(U('admin/prod/order'));
     }
public function orderf(){
     	$id=$_GET['id'];
     	$data['status']=5;
        $rue=M('Order')->where('id='.$id)->save($data);
     	if(!$rue)
     	{
     		$this->_error("系统出错");
     	}
     	 redirect(U('admin/prod/order'));
     }
public function orderh(){
     	$id=$_GET['id'];
     	$data['status']=7;
        $rue=M('Order')->where('id='.$id)->save($data);
     	if(!$rue)
     	{
     		$this->_error("系统出错");
     	}
     	 redirect(U('admin/prod/order'));
     }
public function orderm(){
     	$id=$_GET['id'];
     	$data['status']=8;
        $rue=M('Order')->where('id='.$id)->save($data);
     	if(!$rue)
     	{
     		$this->_error("系统出错");
     	}
     	 redirect(U('admin/prod/order'));
     }    
     public function orderc(){
     	$id=$_GET['id'];
     	$data['status']=15;
     	$rue=M('Order')->where('id='.$id)->save($data);
     	if(!$rue)
     	{
     		$this->_error("系统出错");
     	}
     	redirect(U('admin/prod/order'));
     }
    
	//订单详细
    public function deliver(){
    	$order = M('Order');
    	$co['id'] = $_GET['id'];
    	$add = $order->where($co)->find();
    	$map=array(oid=>array(in,$co));
    	$prod=M('OrderProd');
    	$add1=$prod->where($map)->select();
    	$addr=unserialize($add['address']);
    	$adds=unserialize($add['wl']);
    	$arr=explode('&',$add['info']);
    	for($i=0;$i<count($arr);$i++){
    		$mid=unserialize($arr[$i]);
    		$info[$i]=$mid['name'];   		
    	}   
    
    	$this->assign('info',$info);
    	$this->assign("addr",$addr);
    	$this->assign('list1',$adds);
    	$this->assign("list",$add);
    	$this->assign("vo",$add1);
    	$this->display();
    }        
    //删除订单
    public function delorder(){
    	if(isset($_GET['id'])){
    		//订单编号
    		$id = $this->_get('id','intval');
    		$map['id'] = $id;
    		$rs = M('Order')->where($map)->delete();
    		if($rs){
    			redirect(U('admin/prod/order'),3,'删除成功，返回订单页');
    		}
    	}else{
    		redirect(U('admin/prod/deliver',array('id'=>$id)),3,'订单编号有误');
    	}
    }
    
    //将订单设为已支付
    public function paid(){
    	if(isset($_GET['id'])){
    		$id = $this->_get('id','intval');//订单编号
    		$map['id'] = $id;
    		$data['status'] = 1;
    		$rs = M('Order')->where($map)->save($data);
    		if($rs){
    			echo 1;//设置成功
    		}else{
    			echo 2;//失败
    		}
    	}else{
    		echo 3;//订单编号有误
    	}
    }
    

  public function teseadd(){
  	$id=$_GET['id'];
  	//添加
  	if(isset($_POST['id'])){
  		$id=$_POST['id'];
  		$rues=M('Area')->where('area_id='.$id)->find();
  		$arrx=M('Item')->where('id='.$_POST['pos'])->find();
  		
  		if($rues['reclass']==null){
  			$data['reclass']=$arrx['id'].','.$arrx['name'];
  		}else{
  			$arr=explode(',',$rues['reclass']);
  			for($i=0;$i<count($arr);$i+=2){
  				if($arr[$i]==$_POST['pos'])
  				$this->error("你已添加过该类产品");
  			}
  			$data['reclass']=$rues['reclass'].','.$arrx['id'].','.$arrx['name'];
  		}
  		$rues=M('Area')->where('area_id='.$id)->save($data);
  	}
  	//
  	$rue=M('Area')->where('area_id='.$id)->find();
  	$arr=explode(',',$rue['reclass']);
  	$k=0;
    for($i=1;$i<count($arr);$i+=2){
  		$arrname[$k++]=$arr[$i];
  	}
  	$this->assign("rue",$rue);
  	$this->assign("arr",$arrname);
  	$this->display();
  }
  public function tesedele(){
        $id=$_GET['id'];
  	if(isset($_POST['id'])){
  		$id=$_POST['id'];
  		$rues=M('Area')->where('area_id='.$id)->find();
  		$arr=explode(',',$rues['reclass']);
  		$save='';
  		for($i=0;$i<count($arr);$i+=2){
  		    if($arr[$i]==$_POST['pos']){
  		    	continue;
  		    }else{
  		    	if($i==(count($arr)-2)){
  		    		$save.=$arr[$i].','.$arr[$i+1];
  		    	}else{
  		    		$save.=$arr[$i].','.$arr[$i+1].',';
  		    	}
  		    }
  		}
  		$data['reclass']=$save;
  		$rues=M('Area')->where('area_id='.$id)->save($data);
  	}
  	$rue=M('Area')->where('area_id='.$id)->find();
  	$arr=explode(',',$rue['reclass']);
  	$k=0;
    for($i=1;$i<count($arr);$i+=2){
  		$arraname[$k++]=$arr[$i];
  	}
  	$this->assign("rue",$rue);
  	$this->assign("arr",$arraname);
  	$this->display();
  }
 public function area(){
    	$area=M('Area');
    	$co['pid']=$_POST['pid'];
    	$count = $area->where($co)->count();
    	$list=$area->where($co)->select();
    	if($list){
    		$co1['pid']=$list[0]['area_id'];
    		$count1=$area->where($co1)->count();
    		$list1=$area->where($co1)->select();
    		$data['list1']=$list1;
    	    $data['count1']=$count1;
    		if($list1){
    			$co2['pid']=$list1[0]['area_id'];
	    		$count2=$area->where($co2)->count();
	    		$list2=$area->where($co2)->select();
	    		$data['list2']=$list2;
    	        $data['count2']=$count2;
    		}
    	}
        
        $data['list']=$list;
    	$data['count']=$count;
    	echo json_encode($data);
    }
	//将时间转换成时间戳
	public function inttime($times){
	    return strtotime($times);
	}
	

}
?>