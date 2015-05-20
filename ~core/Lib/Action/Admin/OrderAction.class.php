<?php
class OrderAction extends AdminBaseAction
{
	//index
	public function index() { $this->table(0); }

	public function offline(){
		@import('ORG.Util.Page');
		$model = M("offlineCredit");
		$num   =  $model->where('ctype=0')->count();
		$page  = new Page($num,15);
		$sql   = "select a.*,b.account from iorder_offline_credit a left join iorder_user b on a.uid = b.id where a.ctype = 0 order by a.ctime desc limit ".$page->firstRow.",".$page->listRows;
		$list  = $model->query($sql);
		//print_r($list);exit;
		$this->assign('list',$list);
		$this->assign('page',$page->show());

		$this->display('offline');
	}

	public function offline_detail()
	{
		if(isset($_GET['id']))
		{   
			$id = $_GET['id'];
			$offline = M('offlineCredit')->find($id);
			if($offline)
			{
				$userInfo = M('user')->find($offline['uid']);
				$dflv = DFLV('@','L');
				$status = array('未审核','已审核','已取消');
				$color = array('cRed','cGreen','cGray');
				$html = array(
					'<div class="form2">',
					'<dl class="lineD">',
				    '<dt>用户：</dt>',
				    '<dd class="f14px">'.$userInfo['account'].'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>充值金额：</dt>',
				    '<dd class="f14px cRed bold">'._price($offline['amount']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>手续费：</dt>',
				    '<dd class="f14px cRed bold">'._price($offline['fees']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>订单状态：</dt>',
				    '<dd class="f14px '.$color[$offline['status']].'">'.$status[$offline['status']].'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>支付方式：</dt>',
				    '<dd class="f14px">-'.$this->getPayName($offline['method']).'-</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>充值时间：</dt>',
				    '<dd class="f14px">'.date("Y-m-d H:i",$offline['ctime']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>处理时间：</dt>',
				    '<dd class="f14px">'.($offline['utime']>0?date("Y-m-d H:i",$offline['utime']):' - - ').'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>备注：</dt>',
				    '<dd class="f14px cBlue">'.$offline['mark'].'&nbsp;</dd>',
				    '</dl>',
				    '<div class="page_btm">'
				);
				
				if ($offline['status'] == 0)
				{
					$html[] = '<a href="'.U('admin/order/passOffline',array('id'=>$offline['id'])).'" class="btn_a passBtn"><span>设为已审核</span></a>';
				}
				
				
				$html[] = '<a href="'.U('admin/order/offline').'" class="btn_a"><span>返回列表</span></a>';
				$html[] = '</div></div>';
				
				$html = $dflv->inner($html);
				$html .= $dflv->jquery('$("a.passBtn,a.cancelBtn").click(function(){ return confirm("此操作不可逆，确定要继续？")});');
				$this->assign('html',$html);
				$this->display('detail');
			}
			else redirect(U('admin/order/offline'));
		}
		else redirect(U('admin/order/offline'));
	}

public function passOffline()
	{
		if(isset($_GET['id']))
		{
			$id = $_GET['id'];
			$offline = M('offlineCredit')->find($id);
			if($offline)
			{
				$data["id"] = $id;
				$data["status"] = 1;
				$data["utime"] = time();
				$data["mark"] = '由管理员通过此审核';
				$update = M('offlineCredit')->save($data);
				if($update){
					$credit = M('userCredit')->where("uid=".$offline["uid"])->find();
					if($credit){
						$credit_data["uid"] = $offline["uid"];
						$credit_data["coin"] = $credit["coin"] + $offline["amount"];
						//$credit_date["point"] = $credit["point"];
						M('userCredit')->save($credit_data);
					}else{
						$credit_date["uid"] = $offline["uid"];
						$credit_date["coin"] = $offline["amount"];
						$credit_date["point"] = 0;
						M('userCredit')->add($credit_date);
					}
				}
				redirect(U('admin/order/offline_detail',array('id'=>$_GET['id'])));
			}
			else exit('不存在的充值记录');
		}
	}

	public function refund(){
		@import('ORG.Util.Page');
		$model = M("offlineCredit");
		$num   =  $model->where('ctype=1')->count();
		$page  = new Page($num,15);
		$sql   = "select a.*,b.account from iorder_offline_credit a left join iorder_user b on a.uid = b.id where a.ctype = 1 order by a.ctime desc limit ".$page->firstRow.",".$page->listRows;
		$list  = $model->query($sql);
		//print_r($list);exit;
		$this->assign('list',$list);
		$this->assign('page',$page->show());

		$this->display('refund');
	}


	public function refund_detail()
	{
		if(isset($_GET['id']))
		{   
			$id = $_GET['id'];
			$offline = M('offlineCredit')->find($id);
			if($offline)
			{
				$userInfo = M('user')->find($offline['uid']);
				$dflv = DFLV('@','L');
				$status = array('未审核','已审核','已取消');
				$color = array('cRed','cGreen','cGray');
				$html = array(
					'<div class="form2">',
					'<dl class="lineD">',
				    '<dt>用户：</dt>',
				    '<dd class="f14px">'.$userInfo['account'].'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>退款金额：</dt>',
				    '<dd class="f14px cRed bold">'._price($offline['amount']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>手续费：</dt>',
				    '<dd class="f14px cRed bold">'._price($offline['fees']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>订单状态：</dt>',
				    '<dd class="f14px '.$color[$offline['status']].'">'.$status[$offline['status']].'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>退款方式：</dt>',
				    '<dd class="f14px">-'.$this->getPayName($offline['method']).'-</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>退款时间：</dt>',
				    '<dd class="f14px">'.date("Y-m-d H:i",$offline['ctime']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>处理时间：</dt>',
				    '<dd class="f14px">'.($offline['utime']>0?date("Y-m-d H:i",$offline['utime']):' - - ').'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>备注：</dt>',
				    '<dd class="f14px cBlue">'.$offline['mark'].'&nbsp;</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>其它信息：</dt>',
				    '<dd class="f14px cBlue">'.$offline['info'].'&nbsp;</dd>',
				    '</dl>',
				    '<div class="page_btm">'
				);
				
				if ($offline['status'] == 0)
				{
					$html[] = '<a href="'.U('admin/order/passRefund',array('id'=>$offline['id'])).'" class="btn_a passBtn"><span>设为已审核</span></a>';
				}
				
				
				$html[] = '<a href="'.U('admin/order/refund').'" class="btn_a"><span>返回列表</span></a>';
				$html[] = '</div></div>';
				
				$html = $dflv->inner($html);
				$html .= $dflv->jquery('$("a.passBtn,a.cancelBtn").click(function(){ return confirm("此操作不可逆，确定要继续？")});');
				$this->assign('html',$html);
				$this->display('detail');
			}
			else redirect(U('admin/order/refund'));
		}
		else redirect(U('admin/order/refund'));
	}

	public function passRefund()
	{
		if(isset($_GET['id']))
		{
			$id = $_GET['id'];
			$offline = M('offlineCredit')->find($id);
			if($offline)
			{
				$data["id"] = $id;
				$data["status"] = 1;
				$data["utime"] = time();
				$data["mark"] = '由管理员通过此审核';
				$update = M('offlineCredit')->save($data);
				if($update){
					$credit = M('userCredit')->where("uid=".$offline["uid"])->find();
					if($credit){
						$credit_data["uid"] = $offline["uid"];
						$credit_data["coin"] = $credit["coin"] - $offline["amount"];
						//$credit_date["point"] = $credit["point"];
						M('userCredit')->save($credit_data);
					}else{
						$credit_date["uid"] = $offline["uid"];
						$credit_date["coin"] = $offline["amount"];
						$credit_date["point"] = 0;
						M('userCredit')->add($credit_date);
					}
				}
				redirect(U('admin/order/refund_detail',array('id'=>$_GET['id'])));
			}
			else exit('不存在的充值记录');
		}
	}
	
	public function log() 
	{ 
		@import('ORG.Util.Page');
		$model = M("PayOrder");
		$map = array();
		if(isset($_GET['uid']) && intval($_GET['uid']) >0) $map['uid'] = intval($_GET['uid']);
		if(isset($_GET['type']) && $_GET['type']) $map['type'] = $_GET['type'];
		if(isset($_GET['start']) && $_GET['start']) $map['ctime'][] = array('egt',strtotime($_GET['start']));
		if(isset($_GET['end']) && $_GET['end']) $map['ctime'][] = array('elt',strtotime($_GET['end'].' 23:59:59'));
		$num   =  $model->where($map)->count();
		$page  = new Page($num,15);
		$list  = $model->where($map)->order('ctime desc')->limit($page->firstRow.",".$page->listRows)->select();
		$curd  = DFLV('PayOrder','L');
		$table = $curd->log($list,$page->show());
		$this->assign('table',$table);
		$this->display('index');
	}
	public function draw(){
		@import('ORG.Util.Page');
		$model = M("PayOrder");
		$map = array();
		if(isset($_GET['uid']) && intval($_GET['uid']) >0) $map['uid'] = intval($_GET['uid']);
		if(isset($_GET['type']) && $_GET['type']) $map['type'] = $_GET['type'];
		if(isset($_GET['start']) && $_GET['start']) $map['ctime'][] = array('egt',strtotime($_GET['start']));
		if(isset($_GET['end']) && $_GET['end']) $map['ctime'][] = array('elt',strtotime($_GET['end'].' 23:59:59'));
		$map['ctype'] = 1;
		$num   =  $model->where($map)->count();
		$page  = new Page($num,15);
		$list  = $model->where($map)->order('ctime desc')->limit($page->firstRow.",".$page->listRows)->select();
		$curd  = DFLV('PayOrder','L');
		$table = $curd->initDraw($list,$page->show());
		$this->assign('table',$table);
		$this->display('index');
		
	}
	public function pay_detail()
	{
		if(isset($_GET['no']))
		{   $arr[]=0; $arr[]=2;
			$map['no'] = $_GET['no'];
			$map['ctype'] = array('in',$arr);
			$order = M('PayOrder')->where($map)->find();
			if($order)
			{
				if(!empty($order['config'])){
					$mid=unserialize($order['config']);
					$order['config']="WMPurse: ".$mid['WMPurse']."<br/> WMPurse: ".$mid['WMPurse']." <br/> WMPayment: ".$mid['WMPayment'];
				}else{
					$order['config']="空";
				}
				$dflv = DFLV('@','L');
				$status = array('未支付','已支付','已取消');
				$color = array('cRed','cGreen','cGray');
				$html = array(
					'<div class="form2">',
					'<dl class="lineD">',
				    '<dt>订单编号：</dt>',
				    '<dd class="f14px">'.$order['no'].'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>订单状态：</dt>',
				    '<dd class="f14px '.$color[$order['status']].'">'.$status[$order['status']].'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>用户：</dt>',
				    '<dd class="f14px">'.$this->getUserName($order['uid']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>充值金额：</dt>',
				    '<dd class="f14px cRed bold">'._price($order['money']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>手续费：</dt>',
				    '<dd class="f14px cRed bold">'._price($order['fees']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>支付方式：</dt>',
				    '<dd class="f14px">-'.$this->getPayName($order['method']).'-</dd>',
				    '</dl>',
				    '<dl class="lineD">',
				    '<dt>账户信息：</dt>',
				    '<dd class="f14px cBlue">'.$order['config'].'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>充值时间：</dt>',
				    '<dd class="f14px">'.date("Y-m-d H:i",$order['ctime']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>处理时间：</dt>',
				    '<dd class="f14px">'.($order['utime']>0?date("Y-m-d H:i",$order['utime']):' - - ').'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>备注：</dt>',
				    '<dd class="f14px cBlue">'.$order['mark'].'&nbsp;</dd>',
				    '</dl>',
				    '<div class="page_btm">'
				);
				
				if ($order['status'] == 0)
				{
					$html[] = '<a href="'.U('admin/order/passPay',array('no'=>$order['no'])).'" class="btn_a passBtn"><span>设为已支付</span></a>';
					$html[] = '<a href="'.U('admin/order/cancelPay',array('no'=>$order['no'])).'" class="btn_a cancelBtn"><span>取消该订单</span></a>';
				}
				
				
				$html[] = '<a href="'.U('admin/order/index').'" class="btn_a"><span>返回列表</span></a>';
				$html[] = '</div></div>';
				
				$html = $dflv->inner($html);
				$html .= $dflv->jquery('$("a.passBtn,a.cancelBtn").click(function(){ return confirm("此操作不可逆，确定要继续？")});');
				$this->assign('html',$html);
				$this->display('detail');
			}
			else redirect(U('admin/order/index'));
		}
		else redirect(U('admin/order/index'));
	}
	
	public function draw_detail()
	{
		if(isset($_GET['no']))
		{
			$map['no'] = $_GET['no'];
			$map['ctype'] = 1;
			$order = M('PayOrder')->where($map)->find();
			if($order)
			{
				$config = unserialize($order['config']);
				
				$dflv = DFLV('@','L');
				$status = array('未处理','提现成功','提现取消');
				$color = array('cRed','cGreen','cGray');
				$html = array(
					'<div class="form2">',
					'<dl class="lineD">',
				    '<dt>订单编号：</dt>',
				    '<dd class="f14px">'.$order['no'].'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>订单状态：</dt>',
				    '<dd class="f14px '.$color[$order['status']].'">'.$status[$order['status']].'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>用户：</dt>',
				    '<dd class="f14px">'.$this->getUserName($order['uid']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>提现金额：</dt>',
				    '<dd class="f14px cRed bold">'._price($order['money']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>手续费：</dt>',
				    '<dd class="f14px cRed bold">'._price($order['fees']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>真实姓名：</dt>',
				    '<dd class="f14px cBlue">'.$config['name'].'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>打款方式：</dt>',
				    '<dd class="f14px cBlue">'.$order['method'].'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>打款帐号：</dt>',
				    '<dd class="f14px cBlue">'.$config['account'].'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>申请时间：</dt>',
				    '<dd class="f14px">'.date("Y-m-d H:i",$order['ctime']).'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>处理时间：</dt>',
				    '<dd class="f14px">'.($order['utime']>0?date("Y-m-d H:i",$order['utime']):' - - ').'</dd>',
				    '</dl>',
					'<dl class="lineD">',
				    '<dt>备注：</dt>',
				    '<dd class="f14px cBlue">'.$config['mark'].' / '.$order['mark'].'&nbsp;</dd>',
				    '</dl>',
				    '<div class="page_btm">'
				);
				
				if ($order['status'] == 0)
				{
					$html[] = '<a href="'.U('admin/order/passDraw',array('no'=>$order['no'])).'" class="btn_a passBtn"><span>设为提现成功</span></a>';
					$html[] = '<a href="'.U('admin/order/cancelDraw',array('no'=>$order['no'])).'" class="btn_a cancelBtn"><span>取消该申请</span></a>';
				}
				
				$html[] = '<a href="'.U('admin/order/draw').'" class="btn_a"><span>返回列表</span></a>';
				$html[] = '</div></div>';
				
				$html = $dflv->inner($html);
				$html .= $dflv->jquery('$("a.passBtn,a.cancelBtn").click(function(){ return confirm("此操作不可逆，确定要继续？")});');
				$this->assign('html',$html);
				$this->display('detail');
			}
			else redirect(U('admin/order/draw'));
		}
		else redirect(U('admin/order/draw'));
	}
	
	public function passPay()
	{
		if(isset($_GET['no']))
		{   $arr[]=0;$arr[]=2;
			$map['no'] = $_GET['no'];
			$map['ctype'] = array('in',$arr);
			$map['status'] = 0;
			$order = M('PayOrder')->where($map)->find();
			if($order)
			{
				$update = M('PayOrder')->where($map)->save(array('status'=>1,'utime'=>time(),'mark'=>'由管理员通过此充值订单'));
				if($update){
					pay_encome($order['uid'],$order['money'],'充值');
				}
				redirect(U('admin/order/pay_detail',array('no'=>$_GET['no'])));
			}
			else exit('不存在的订单');
		}
	}
	
	public function cancelPay()
	{
		if(isset($_GET['no']))
		{
			$map['no'] = $_GET['no'];
			$map['ctype'] = 0;
			$map['status'] = 0;
			$order = M('PayOrder')->where($map)->select();
			if($order)
			{
				$update = M('PayOrder')->where($map)->save(array('status'=>2,'utime'=>time(),'mark'=>'由管理员取消该订单'));
				redirect(U('admin/order/pay_detail',array('no'=>$_GET['no'])));
			}
			else exit('不存在的订单');
		}
	}
	
	public function passDraw()
	{
		if(isset($_GET['no']))
		{
			$map['no'] = $_GET['no'];
			$map['ctype'] = 1;
			$map['status'] = 0;
			$order = M('PayOrder')->where($map)->find();
			if($order)
			{
				// 加入个帐户
				$credit = M('userCredit')->where("uid=".$order["uid"])->find();
				if($credit){
					$credit_data["uid"] = $order["uid"];
					$credit_data["coin"] = $credit["coin"] + $order["money"];
					//print_r($credit_data);exit;
					M('userCredit')->save($credit_data);
				}

				// 充值记录
				$cdata['uid'] = $order['uid'];
				$cdata['method'] = $order['method'];
				$cdata['amount'] = $order['money'];
				$cdata['fees'] = '';
				$cdata['status'] = 1;
				$cdata['mark'] = '由管理员通过退款充值订单';
				$cdata['ctime'] = time();
				$cdata['utime'] = time();
				$cdata['payment_time'] = time();
				M('OfflineCredit')->add($cdata);

				// 修改支付记录
				$update = M('PayOrder')->where($map)->save(array('status'=>1,'utime'=>time(),'mark'=>'由管理员通过此提现订单'));
				
				M('Order')->where('id='.$order["oid"])->save(array('status'=>14,'utime'=>time()));
				//if($update) pay_draw($order['uid'],$order['money'],'提现');
				redirect(U('admin/order/draw_detail',array('no'=>$_GET['no'])));
			}
			else exit('不存在的订单');
		}
	}
	
	public function cancelDraw()
	{
		if(isset($_GET['no']))
		{
			$map['no'] = $_GET['no'];
			$map['ctype'] = 1;
			$map['status'] = 0;
			$order = M('PayOrder')->where($map)->select();
			if($order)
			{
				$update = M('PayOrder')->where($map)->save(array('status'=>2,'utime'=>time(),'mark'=>'由管理员取消该提现申请'));
				redirect(U('admin/order/draw_detail',array('no'=>$_GET['no'])));
			}
			else exit('不存在的订单');
		}
	}
	
	protected function table($type=0)
	{
		@import('ORG.Util.Page');
		$model = M("PayOrder");
		$map = array();
		if(isset($_GET['status']) && in_array($_GET['status'],array(0,1,2))) $map['status'] = intval($_GET['status']);
		if(isset($_GET['uid']) && intval($_GET['uid']) >0) $map['uid'] = intval($_GET['uid']);
		if(isset($_GET['method']) && $_GET['method']) $map['method'] = $_GET['method'];
		if(isset($_GET['start']) && $_GET['start']) $map['ctime'][] = array('egt',strtotime($_GET['start']));
		if(isset($_GET['end']) && $_GET['end']) $map['ctime'][] = array('elt',strtotime($_GET['end'].' 23:59:59'));
		$arr[]=0;
		$arr[]=2;
		$map['ctype'] = array('in',$arr);
		$num   =  $model->where($map)->count();
		$page  = new Page($num,15);
		$list  = $model->where($map)->order('ctime desc')->limit($page->firstRow.",".$page->listRows)->select();
		$curd = DFLV('PayOrder','L');
		
		if($type == 1) $table = $curd->initDraw($list,$page->show());
		else  $table = $curd->initPay($list,$page->show());
		$this->assign('table',$table);
		$this->display('index');
	}
	

	protected function detail($type=0)
	{
		
	}
	
	//获取用户昵称
	protected function getUserName($uid)
	{
		$name = M('User')->field('account')->find($uid);
		return $name['account'].'('.$uid.')';
	}
	
	//获取用户昵称
	protected function getPayName($key)
	{
		$name = M('Pay')->where('class_name = "'.$key.'"')->field('name')->find();
		return $name['name'];
	}
}
?>