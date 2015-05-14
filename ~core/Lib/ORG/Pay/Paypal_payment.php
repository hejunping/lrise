<?php
// +----------------------------------------------------------------------
// | EaseTHINK 易想团购系统
// +----------------------------------------------------------------------
// | Copyright (c) 2010 http://www.easethink.com All rights reserved.
// +----------------------------------------------------------------------

$payment_lang = array(
	'name'	=>	'Paypal在线支付',
	'paypal_account'	=>	'Paypal帐号',
	'paypal_currency'	=>	'Paypal货币代码',
	'paypal_unit'	=>		'Paypal货币单位',
	'paypal_rate'		=>	'汇率', //如当前网站的金额为RMB，支付为USD， 则请填写汇率为 0.15 ，即当日1RMB = 0.15美元
);
$config = array(
	'paypal_account'	=>	array(
		'INPUT_TYPE'	=>	'0',
	), //Paypal帐号
	'paypal_currency'	=>	array(
		'INPUT_TYPE'	=>	'0'
	), //Paypal货币代码: 
	'paypal_unit'	=>	array(
		'INPUT_TYPE'	=>	'0'
	), //Paypal货币单位
	'paypal_rate'	=>	array(
		'INPUT_TYPE'	=>	'0'
		//汇率
	),
);

/* 模块的基本信息 */
if (isset($read_modules) && $read_modules == true)
{
    $module['class_name']    = 'Paypal';
    $module['name']    = $payment_lang['name'];
    $module['online_pay'] = '1';
    /* 配送 */
    $module['config'] = $config;
    $module['lang'] = $payment_lang;
    $module['reg_url'] = '';
    return $module;
}

// 余额支付模型
class Paypal_payment 
{
	public function get_payment_code($order,$payment_info)
	{
		$order_sn = $order['no'];
        $payment_info['config'] = unserialize($payment_info['config']);
		
		$money = round($order['money'],2) + $order['fees'];
		
		$data_return_url = U('home/pay/response?method=Paypal','',true,false,true);
		$data_notify_url = U('home/pay/notify?method=Paypal','',true,false,true);

		
		$code  = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">' .   // 不能省略
            "<input type='hidden' name='cmd' value='_xclick'>" .                             // 不能省略
            "<input type='hidden' name='business' value='".$payment_info['config']['paypal_account']."'>" .                 // 贝宝帐号
            "<input type='hidden' name='item_name' value='".$order_sn."[充值元宝]'>" .                 // payment for
            "<input type='hidden' name='amount' value='".$money."'>" .                        // 订单金额
            "<input type='hidden' name='currency_code' value='".$payment_info['config']['paypal_currency']."'>" .            // 货币
            "<input type='hidden' name='return' value='$data_return_url'>" .                    // 付款后页面
            "<input type='hidden' name='invoice' value='".$order_sn."'>" .                      // 订单号
            "<input type='hidden' name='charset' value='utf-8'>" .                              // 字符集
            "<input type='hidden' name='no_shipping' value='1'>" .                              // 不要求客户提供收货地址
            "<input type='hidden' name='no_note' value=''>" .                                  // 付款说明
            "<input type='hidden' name='notify_url' value='$data_notify_url'>" .
            "<input type='hidden' name='rm' value='2'>" .
            "<input type='hidden' name='cancel_return' value=''>";
        $code .= "<input type='submit' class='paybutton' value='Pay'>";                      // 按钮
        $code  .= "</form>";
		return $code;
		
	}
	
	public function response($request,$is_deal=0)
	{
		$payment = M('Pay')->where("class_name='Paypal'")->find();  
    	$payment['config'] = unserialize($payment['config']);
    	$merchant_id    = $payment['config']['paypal_account'];  
    	
    	// assign posted variables to local variables
        $item_name = $request['item_name'];
        $item_number = $request['item_number'];
        $payment_status = $request['payment_status'];
        $payment_amount = floatval($request['mc_gross']);
        $payment_currency = $request['mc_currency'];
        $txn_id = $request['txn_id'];
        $receiver_email = $request['receiver_email'];
        $payer_email = $request['payer_email'];
        $data_id = $request['invoice'];


        //开始初始化参数
        $payment_notice_sn = $data_id;
    	$money = $payment_amount;
    	
    	if ($payment_status != 'Completed' && $payment_status != 'Pending')
	    {
            $return_res['info'] = '支付不成功';
            return $return_res;
	    }
	    elseif ($receiver_email != $merchant_id)
	    {
            $return_res['info'] = '商户号不匹配';
            return $return_res;
	    }         
	    elseif ( abs($payment_notice['money']*$payment['config']['paypal_rate']- $payment_amount) > 0.009)
	    {
            $return_res['info'] = '金额不匹配';
            return $return_res;
	    }
	    elseif ($payment['config']['paypal_currency'] != $payment_currency)
	    {
            $return_res['info'] = '货币不对';
            return $return_res;
	    }
	    else
	    {
	    	$rs = array();
			$rs['no']       = $data_id;  //站内订单号
			$rs['fees']     = $payment_amount;
			$rs['is_deal']  = $is_deal;    
            $return_res['info'] = &$rs;
			$return_res['status'] = true;
			return $return_res;
	    }
	}
	
	public function notify($request)
	{
		$this->response($request,1);
	}
}
?>