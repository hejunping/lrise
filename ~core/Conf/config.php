<?php
$array = array(
	'DB_HOST'  => 'www.host.com',   //服务器地址
	'DB_NAME'  => 'iorder',   		//数据库名
	'DB_USER'  => 'root',         //用户名
	'DB_PWD'   => 'root',         //密码
	'DB_PREFIX'=> 'iorder_',        //数据库表前缀
	
	'URL_CASE_INSENSITIVE' => true,
	'TOKEN_ON'=> false,
	'TIME_ZONE' => 'Asia/Shanghai',   //默认时区
	
	'USER_AUTH_KEY'  => 'IORDER_USER',                 	//用户认证SESSION标记
	
	'TMPL_ACTION_SUCCESS' => 'tpl/ok.html', 	  //成功提示页面
	'TMPL_ACTION_ERROR'   => 'tpl/error.html',  //错误提示页面
	
	'ENCRYPT_CODE'		=> '1w1h0o1k1n9o61wt0h1e01e4n1cr5y8p2t1c0o0d8e2', //加密串
	
	'URL_MODEL'			=> 0,
	'URL_PATHINFO_DEPR'	=> '-',
	'URL_HTML_SUFFIX'	=> '.html',
	
	'APP_GROUP_LIST'    => 'Home,Prod,User,Admin', 
    'DEFAULT_GROUP'		=>'Home',//域名下自动调用此分组  其他需手动指定
    
    
    'C_PREFIX'=>'_C', //zh、ru的内容后缀 
    
);

if(is_file('local_inc.php')) 
{
    include('local_inc.php');
    if($is_open_local) $array = array_merge($array,$array_local);
}

return $array;
?>