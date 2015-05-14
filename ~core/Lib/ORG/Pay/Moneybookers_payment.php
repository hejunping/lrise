<?php
$payment_lang = array(
	'name'	=>	'Moneybookers',
	'account'	 =>	'商户帐号',
    'merchant'      => '商户编号',
    'merchant_name' => '商户名称',
	'key'	     =>	'商户私钥',
	'currency' =>	'货币类型'
);
$config = array(
	'account'	=>	array( 'INPUT_TYPE'	=>	'0'),
	'key'	    =>	array( 'INPUT_TYPE'	=>	'0' ),
	'merchant'	    =>	array( 'INPUT_TYPE'	=>	'0' ),
	'merchant_name'	    =>	array( 'INPUT_TYPE'	=>	'0' ),
	'currency'	    =>	array( 'INPUT_TYPE'	=>	'0' ),
);

/* 模块的基本信息 */
if (isset($read_modules) && $read_modules == true)
{
	$module['class_name']    = 'Moneybookers';
	$module['name']    = $payment_lang['name']; //名称 
	$module['online_pay'] = '1';  // 支付方式：1：在线支付；0：线下支付
	$module['config'] = $config;
	$module['lang'] = $payment_lang;
	return $module;
}

//Moneybookers模型
class Moneybookers_payment
{
    public function get_payment_code($order,$pay)
	{
        $order_sn = $order['no'];
        $pay['config'] = unserialize($pay['config']);
		$money = round($order['money'],2);
		$data_return_url = U('home/pay/response?method=Moneybookers','',true,false,true);
		$data_notify_url = U('home/pay/notify?method=Moneybookers','',true,false,true);
		$data_cancel_url = U('home/pay/cancel?method=Moneybookers','',true,false,true);
		
		$code  = '<form method="post" target="_blank" action="https://www.moneybookers.com/app/payment.pl">
            <input type="hidden" name="pay_to_email" value="'.$pay['config']['account'].'">        
            <input type="hidden" name="recipient_description" value="'.$pay['config']['merchant_name'].'">    
            <input type="hidden" name="transaction_id" value="'.$order_sn.'">    
            <input type="hidden" name="amount" value="'.$money.'">        
            <input type="hidden" name="currency" value="'.$pay['config']['currency'].'">
            <input type="hidden" name="return_url" value="'.$data_return_url.'">
            <input type="hidden" name="cancel_url" value="'.$data_cancel_url.'">
            <input type="hidden" name="status_url" value="'.$data_notify_url.'">
            <input type="hidden" name="payment_methods" value="VSA">
            <input type="hidden" name="hide_login" value="1">      
            <input type="hidden" name="merchant_fields" value="payapi">
            <input type="hidden" name="payapi" value="MBookers">';
		
        $code .= "<input type='submit' class='paybutton' value='Pay'>";                      // 按钮
        $code  .= "</form>";
		return $code;
    }
    
    public function response($request)
	{
        $feeback = getPayTrackback($request);
        if($feeback)
        {
            $rs = array();
			$rs['no']       = $feeback['orderno'];    //站内订单号
			$rs['fees']     = $request['amount'];     //交易金额
			$rs['is_deal']  = 0;                      //是否进行业务处理
            $return_res['info'] = &$rs;
			$return_res['status'] = true;
			return $return_res;
			return $rs;
        }
        else 
        {
            $return_res['info'] = '回调参数错误';
			return $return_res;
        }
    }
    
    public function notify($request)
	{
        $feeback = getPayTrackback($request);
        if($feeback)
        {
            $rs = array();
			$rs['no']       = $feeback['orderno'];    //站内订单号
			$rs['fees']     = $request['amount'];     //交易金额
			$rs['is_deal']  = 1;                      //是否进行业务处理
            $return_res['info'] = &$rs;
			$return_res['status'] = true;
			return $return_res;
        }
        else 
        {
            $return_res['info'] = '回调参数错误';
			return $return_res;
        }
    }
    
    //生成返回的MD5加密摘要
    function getPayTrackback($request) 
   {
        $orderno        =   $request['transaction_id'];
        $merchant_id    =   $request['merchant_id'];
        $account        =   $request['pay_to_email'];
        $amount         =   $request['mb_amount'];
        $currency       =   $request['mb_currency'];
        $pay_id         =   $request['mb_transaction_id'];
        $pay_rs         =   $request['status'];
        $pay_from_email =   $request['pay_from_email'];
        $md5sig         =   $request['md5sig'];
        
        $sign_msg_str = $merchant_id . $orderno .  strtoupper(md5($this->key)) . $amount . $currency . $pay_rs;
        $sign_msg = STRTOUPPER(MD5($sign_msg_str));

        if($md5sig != $sign_msg) {
            return false;
        }

         if('2' != $pay_rs) {
            return false;
        }

        $result['account']    =    $account;
        $result['pay_id']    =    $pay_id;
        $result['pay_rs']    =    $pay_rs;
        $result['pay_username']    =    $pay_from_email;
        $result['amount']    =    $amount;
        $result['currency']    =    $currency;    
        $result['orderno']    =    $orderno;
        return $result;
    }
}
?>