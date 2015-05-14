<?php
$payment_lang = array(
	'name'	=>	'线下支付'
);
$config = array();

/* 模块的基本信息 */
if (isset($read_modules) && $read_modules == true)
{
	$module['class_name']    = 'Offline';
	$module['name']    = $payment_lang['name']; //名称 
	$module['online_pay'] = 0;  // 支付方式：1：在线支付；0：线下支付
	$module['config'] = $config;
	$module['lang'] = $payment_lang;
	return $module;
}

//Moneybookers模型
class Offline_payment
{
    public function get_payment_code($order,$pay)
	{
        return $pay['description'];
    }
}
?>