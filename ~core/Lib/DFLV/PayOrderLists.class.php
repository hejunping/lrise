<?php
//表单操作类
class PayOrderLists extends Lists
{
	//列表结果
	protected $table = array(
		'top'	=> ' <div class="Toolbar_inbox alR">{text}</div>',
		'table' => '<div class="list"><table width="100%" border="0" cellspacing="0" cellpadding="0">{line}</table></div>',
		'line'	=> '<tr>{row}</tr>',
		'head'=> '<th class="line_l">{th}</th>',
		'row'	=> '<td>{td}</td>',
		'foot'	=> ' <div class="Toolbar_inbox alL">{text}</div>',
		'nodata'=> '<tr><td {attr}>{tips}</td></tr>'
	);

	public function initPay($data,$page='')
	{
		$opts = array(
			'fields' => array('_s'=>'选择','no'=>'订单号','uid'=>'用户','money'=>'交易金额','fees'=>'手续费','status'=>'订单状态','method'=>'支付方式','ctime'=>'交易时间'),
			'deal'   => array(
				'_s'   => array(
					'type'=>'html_tag',
					'data'=>array(
						'attr'=>'value',
						'col'=>'no',
						'opt'=>array('input',array('type'=>'checkbox','name'=>'no[]'))
					)
				),
				'uid'  => array('type'=>'callback','data'=>'getUserName'),
				'method'=> array('type'=>'switch','data'=>array('CreditCard'=>'信用卡','WesternUnion'=>'WesternUnion','WebMoney'=>'WebMoney'),'default'=>'未知'),
				'status'=> array('type'=>'switch','data'=>array('<span class="cRed">未支付</span>','<span class="cGreen">已支付</span>','<span class="cGray">已取消</span>'),'default'=>'未知'),
				'ctime' => array('type'=>'function','data'=>'date','para'=>array('Y-m-d H:i','###'),'pos'=>1),
				'money'=> array('type'=>'function','data'=>'_price'),
				'fees' => array('type'=>'function','data'=>'_price'),
				'io'   => array(
					'type'=>'link',
					'data'=>array(array('【详情】',U('order/pay_detail',array('no'=>'%no%')),array('no'),''))
				)
			),
			'nodata'=>array('暂无数据','colspan=8 class="cRed f16px h40"')
		);

		$optsTop = array(
			array('<form method="GET" class="left">'),
			array('a',array('href'=>U('admin/order/index'),'class'=>'btn_a'),'<span>显示全部</span>'),
			array('select','name="status"',array(
				array('option','value="-1"','全部'),
				array('option','value="0"','未支付'),
				array('option','value="1"','已支付'),
				array('option','value="2"','已取消')
			)),
			array('select','name="method"',array(
				array('option','value=""','全部'),
				array('option','value="CreditCard"','信用卡'),
				array('option','value="WesternUnion"','WesternUnion'),
				array('option','value="WebMoney"','WebMoney')
			)),
			array(' 订单时间：<input type="text" name="start" class="text w100 goodplugin">'),
			array(' 到 '),
			array('<input type="text" name="end" class="text w100 goodplugin">'),
			array(' 用户ID：<input type="text" name="uid" class="text w50">&nbsp;&nbsp;'),
			array('<input type="submit" class="btn_b" value="查询">&nbsp;&nbsp;'),
			array('</form>'),
		);

		$this->setJs(& $str);
		$str .= $this->bar($optsTop,'top');
		$str .= parent::init(&$data,$opts,$page);
		if($page) $str .= $this->bar($page,'foot');

		$page = '<div class="so_main"><div class="page_tit">交易流水管理</div>{text}</div>';
		$str = str_replace('{text}',$str,$page);
		unset($data);
		unset($opts);
		return $str;
	}
	
	public function initDraw($data,$page='')
	{
		$opts = array(
			'fields' => array('_s'=>'选择','no'=>'订单号','uid'=>'用户','money'=>'提现金额','fees'=>'手续费','status'=>'订单状态','method'=>'打款方式','ctime'=>'申请时间','io'=>'操作'),
			'deal'   => array(
				'_s'   => array(
					'type'=>'html_tag',
					'data'=>array(
						'attr'=>'value',
						'col'=>'no',
						'opt'=>array('input',array('type'=>'checkbox','name'=>'no[]'))
					)
				),
				'uid'  => array('type'=>'callback','data'=>'getUserName'),
				'status'=> array('type'=>'switch','data'=>array('<span class="cRed">未处理</span>','<span class="cGreen">提现成功</span>','<span class="cGray">提现取消</span>'),'default'=>'未知'),
				'ctime' => array('type'=>'function','data'=>'date','para'=>array('Y-m-d H:i','###'),'pos'=>1),
				'money'=> array('type'=>'function','data'=>'_price'),
				'fees' => array('type'=>'function','data'=>'_price'),
				'io'   => array(
						'type'=>'link',
						'data'=>array(array('【详情】',U('order/draw_detail',array('no'=>'%no%')),array('no'),''))
					)
			),
			'nodata'=>array('暂无数据','colspan=8 class="cRed f16px h40"')
		);

		$optsTop = array(
			array('<form method="GET" class="left">'),
			array('a',array('href'=>U('admin/order/index'),'class'=>'btn_a'),'<span>显示全部</span>'),
			array('select','name="status"',array(
				array('option','value="-1"','全部'),
				array('option','value="0"','未处理'),
				array('option','value="1"','提现成功'),
				array('option','value="2"','提现取消')
			)),
			array(' 订单时间：<input type="text" name="start" class="text w100 goodplugin">'),
			array(' 到 '),
			array('<input type="text" name="end" class="text w100 goodplugin">'),
			array(' 用户ID：<input type="text" name="uid" class="text w50">&nbsp;&nbsp;'),
			array('<input type="submit" class="btn_b" value="查询">&nbsp;&nbsp;'),
			array('</form>'),
		);

		$this->setJs(&$str);
		$str .= $this->bar($optsTop,'top');
		$str .= parent::init(&$data,$opts,$page);
		if($page) $str .= $this->bar($page,'foot');
		$page = '<div class="so_main"><div class="page_tit">提现请求管理</div>{text}</div>';
		$str = str_replace('{text}',$str,$page);
		unset($data);
		unset($opts);
		return $str;
	}
	
	public function log($data,$page='')
	{
		$opts = array(
			'fields' => array('uid'=>'用户','money'=>'消费金额','mark'=>'备注','ctime'=>'消费时间'),
			'deal'   => array(
				'uid'  => array('type'=>'callback','data'=>'getUserName'),
				'money'=> array('type'=>'function','data'=>'trim'),
				'ctime' => array('type'=>'function','data'=>'date','para'=>array('Y-m-d H:i','###'),'pos'=>1),
			),
			'nodata'=>array('暂无数据','colspan=8 class="cRed f16px h40"')
		);

		$optsTop = array(
			array('<form method="GET" class="left">'),
			array('a',array('href'=>U('admin/order/log'),'class'=>'btn_a'),'<span>显示全部</span>'),
			array(' 时间：<input type="text" name="start" class="text w100 goodplugin">'),
			array(' 到 '),
			array('<input type="text" name="end" class="text w100 goodplugin">'),
			array(' 用户ID：<input type="text" name="uid" class="text w50">&nbsp;&nbsp;'),
			array('<input type="submit" class="btn_b" value="查询">&nbsp;&nbsp;'),
			array('</form>'),
			
		);

		$this->setJs(&$str);
		$str .= $this->bar($optsTop,'top');
		$str .= parent::init(&$data,$opts,$page);
		if($page) $str .= $this->bar($page,'foot');
		$page = '<div class="so_main"><div class="page_tit">消费记录查询</div>{text}</div>';
		$str = str_replace('{text}',$str,$page);
		unset($data);
		unset($opts);
		return $str;
	}
	
	protected function setJs($str)
	{
		$str = $this->js('http://j.500idea.com/jquery.datepick.js');
		$str .= $this->css('http://c.500idea.com/calendar.css');
		$jquery = array();
		$jquery[] = 'var nowdays = new Date();';
		$jquery[] = 'var dateConfig = { changeFirstDay: false, maxDate: nowdays,dateFormat: "yy-mm-dd" };';
		$jquery[] = '$(".goodplugin").datepick(dateConfig);';
		if(isset($_GET['status'])) $jquery[] = '$("select[name=\'status\']").val("'.$_GET['status'].'");';
		if(isset($_GET['method'])) $jquery[] = '$("select[name=\'method\']").val("'.$_GET['method'].'");';
		if(isset($_GET['type'])) $jquery[] = '$("select[name=\'type\']").val("'.$_GET['type'].'");';
		if(isset($_GET['type2'])) $jquery[] = '$("select[name=\'type2\']").val("'.$_GET['type2'].'");';
		if(isset($_GET['start'])) $jquery[] = '$("input[name=\'start\']").val("'.$_GET['start'].'");';
		if(isset($_GET['end'])) $jquery[] = '$("input[name=\'end\']").val("'.$_GET['end'].'");';
		if(isset($_GET['uid'])) $jquery[] = '$("input[name=\'uid\']").val("'.$_GET['uid'].'");';
		$str .= $this->jquery($jquery);
	}

	//获取用户昵称
	public function getUserName($uid)
	{
		$name = M('User')->field('account')->find($uid);
		return $name['account'].'('.$uid.')';
	}
}
?>