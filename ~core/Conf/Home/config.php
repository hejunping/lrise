<?php

return array(
	//开启多语言功能
	'LANG_SWITCH_ON'	=> true, //开启语言包功能
	'LANG_AUTO_DETECT'	=> true, //自动侦测
	'LANG_LIST'			=> 'zh-cn,en-us,zh-tw', //允许切换到语言列表
	'VAR_LANGUAGE'		=> 'l', //默认语言切换到get传参变量
    
    //开启trace调试信息
    'SHOW_PAGE_TRACE'        =>false,

	'DEFAULT_THEME'    => 'default',	// 默认模板主题名称
	// 多模板
	'VAR_TEMPLATE'		=>	't',
	'TMPL_SWITCH_ON'        =>true,
	'THEME_LIST'        => 'default,zh,ru',
	'TMPL_DETECT_THEME'     => true,       // 自动侦测模板主题


);



?>