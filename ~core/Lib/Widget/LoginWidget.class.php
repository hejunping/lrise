<?php
//登录框
class LoginWidget extends Widget 
{
	public function  render ($data)
	{
        if($data['bind_info']) session('bind_info', serialize($data['bind_info']));
        else if(session('bind_info')) session('bind_info',null);
        
        $login = getOption('login');
        if($login['login_sina_open']) $data['login_sina'] =  1;
        if($login['login_qq_open']) $data['login_qqt'] =  1;
        if($login['login_douban_open']) $data['login_douban'] =  1;
        $data['url_register']  = $login['login_register'];
        $data['url_getpwd'] = $login['login_getpwd'];
		
		return $this->renderFile('index',$data);
	}
}
?>