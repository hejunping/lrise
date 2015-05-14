<?php
/**
 * 前台基础模块
 * @name birdy 
 * @email freebird110@qq.com 
 * @time 2012-3-10
 * @version 1.0
 */
abstract class FrontAction extends Action
{
	//前台初始化
	protected function _initialize()
	{
      	//检测网站状态
		$web = getOption('website');
		//dump($web);
		$this->assign('_web',$web);
		
		if($web['website_close']) 
		{
			if(isset($_GET['is_ajax'])) sys_tips($web['website_close_tips']);
			else $this->display('tpl/close.html');
			exit();
		}
		
    	if(C('MODULE_TITLE')) $this->assign('_mtitle',C('MODULE_TITLE'));
        $this->assign('_login',$this->checkLogin());

        //初始化同步翻译开关值
        $result=syntrans();
        if($result === false){
        	$this->_trans = 1;//默认翻译成英文
        }else{
        	$this->_trans = $result; 
        }
        //测试代码
        //dump($_SERVER);
	}
    
    //检查登录状态 
    protected function checkLogin()
    {
        if(session(C("USER_AUTH_KEY"))) define('IS_LOGIN',true);
        else 
        {
            $cookie = cookie('remember_info');
            if($cookie)
            {
                $cookie = unserialize(strCode($cookie,false));
                if(getIp() == $cookie['ip'] && $cookie['id'] > 0 && $cookie['pw'])
                {
                    $map = array('id'=>$cookie['id'],'password'=>$cookie['pw'],'status'=>1);
                    $user = M("User")->where($map)->find();
                    if($user)
                    {
                        ulogin($user,$cookie['ip'],'自动登录',1);
                        define('IS_LOGIN',true);
                    }
                    else 
                    {
                        setcookie('remember_info','',time()-1,'/');
                        define('IS_LOGIN',false);
                         
                    
                    }
                }
                else 
                {
                    setcookie('remember_info','',time()-1,'/');
                    define('IS_LOGIN',false);
                 
                }
            }
            else {
            	define('IS_LOGIN',false);
            	
            }
        }
        return IS_LOGIN;
    }

    //404提示 
	protected function _404($info='Sorry，你访问了一个不存在的页面')
	{
        if(isset($_GET['is_ajax'])) sys_tips($info);
        else
        {
            $this->assign('info',$info);
            $this->display('tpl/404.html');
            exit;
        }
	}
    
    //操作错误提示
	protected function _ok($info='操作成功',$url='',$time=1)
	{
        if(isset($_GET['is_ajax'])) sys_tips($info,'y',array('url'=>$url));
        else
        {
            $this->assign('url',$url);
            $this->assign('time',$time);
            $this->assign('info',$info);
            $this->display('tpl/ok.html');
            exit;
        }
	}
	
    //操作错误提示
	protected function _error($info='未知错误',$widget='',$para=array())
	{
        if(isset($_GET['is_ajax'])) sys_tips($info,$widget?$widget:'n');
        else
        {
            if($widget) 
            {
                $this->assign('widget',$widget);
                $this->assign('para',$para);
            }
            $this->assign('error',$info);
            $this->display('tpl/error.html');
            exit;
        }
	}
	
	
}
?>