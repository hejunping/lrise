<?php

/**
 * 项目公用方法
 * @name birdy 
 * @email freebird110@qq.com 
 * @time 2012-3-10
 * @version 1.0
 */
function getfirstchar($s0){   
     $fchar = ord($s0{0});
     if($fchar >= ord("A") and $fchar <= ord("z") )return strtoupper($s0{0});
     $s1 = iconv("UTF-8","gb2312", $s0);
     $s2 = iconv("gb2312","UTF-8", $s1);
     if($s2 == $s0) $s = $s1; 
     else $s = $s0;
     $asc = ord($s{0}) * 256 + ord($s{1}) - 65536;
     if($asc >= -20319 and $asc <= -20284) return "A";
     if($asc >= -20283 and $asc <= -19776) return "B";
     if($asc >= -19775 and $asc <= -19219) return "C";
     if($asc >= -19218 and $asc <= -18711) return "D";
     if($asc >= -18710 and $asc <= -18527) return "E";
     if($asc >= -18526 and $asc <= -18240) return "F";
     if($asc >= -18239 and $asc <= -17923) return "G";
     if($asc >= -17922 and $asc <= -17418) return "H";
     if($asc >= -17417 and $asc <= -16475) return "J";
     if($asc >= -16474 and $asc <= -16213) return "K";
     if($asc >= -16212 and $asc <= -15641) return "L";
     if($asc >= -15640 and $asc <= -15166) return "M";
     if($asc >= -15165 and $asc <= -14923) return "N";
     if($asc >= -14922 and $asc <= -14915) return "O";
     if($asc >= -14914 and $asc <= -14631) return "P";
     if($asc >= -14630 and $asc <= -14150) return "Q";
     if($asc >= -14149 and $asc <= -14091) return "R";
     if($asc >= -14090 and $asc <= -13319) return "S";
     if($asc >= -13318 and $asc <= -12839) return "T";
     if($asc >= -12838 and $asc <= -12557) return "W";
     if($asc >= -12556 and $asc <= -11848) return "X";
     if($asc >= -11847 and $asc <= -11056) return "Y";
     if($asc >= -11055 and $asc <= -10247) return "Z";
     return null;
}
/**
 * 去除重复分类
 */
function remdup($cate){
	$cateArr = array();
	foreach($cate as $k=>$v){
		if(in_array($v['id'],$cateArr)){
			continue;
		}else{
			$cateArr[$v['id']] = $v;
		}
	}
	return $cateArr;
}

/**
 * 多重筛选Url设置
 * @param string $k    字段
 * @param string $v 　 字段值
 * @param array  $var  字段集合
 * @param string $url  页面链接
 * @return type 
 */
function seturl($k, $v, $var=array('ctype','price','sort','uwant'), $url = 'prod/index/index')
{   
	$array = array();
	foreach ($var as $var) if (isset($_GET[$var])) $array[$var] = $_GET[$var];
	if ($v !== '') $array[$k] = $v;
	else unset($array[$k]);
	$array2 = array();
	foreach ($array as $k => $array) $array2[] = $k . "=" . $array;
	return U($url) . "?" . implode('&', $array2);
}


//获取图片路径
function getImage($id,$t='prod',$t1='big', $absolute=false)
{
	if($absolute) $url = "http://".$_SERVER["HTTP_HOST"].'/';
	else $url = '';
	$oid = md5($id);
	$first = substr($oid,0,1);
	$second = substr($oid,1,1);
	return $url.'data/'.$t.'/'.$first.'/'.$second.'/'.$id.'/'.$t1.'.jpg';
}

/**
 * DFLV模型入口，D：Deal表单处理 F：Form 表单生成 L：Lists 数据列表 V：Validate 数据验证
 * @author birdy freebird110@qq.com
 * @param string $table 模型关键字
 * @param enum $type 模型类型 暂时仅支持 “D”，“F”，“L”，“V”四种值，默认为“F”
 * @return object 如果模型存在，将返回模型实例，否则返回false
 */
function DFLV($key,$type="")
{
	$array = array('D'=>'Deal','F'=>'Form','L'=>'Lists','V'=>'Validate');
	$file  = array('D'=>'_deal','F'=>'_form','L'=>'_lists','V'=>'_validate');
	$key = ucwords($key);
	$type = strtoupper($type);
	$module = $array[$type];
	@import('@.DFLV.DFLV');
	@import('@.DFLV.'.$module);
	if($key == '@')
	{
		if(!$type) return new DFLV();
		return new $module();
	}
	else if($key)
	{
		$className = $key.$module;
		@import('@.DFLV.'.$className);
		if(!class_exists($className)) exit('unknow class '.$className);
		return new $className();
	}
	else return false;
}

//充值
function pay_encome($uid,$money,$reason='')
{
	@import('@.ORG.Pay.PayOrder');
	return PayOrder::encome($uid,$money,$reason);
}

//消费
function pay_outcome($uid,$money,$reason='')
{
	@import('@.ORG.Pay.PayOrder');
	return PayOrder::outcome($uid,$money,$reason);
}



function comment($content,$ctype='pai')
{
    if(IS_LOGIN)
    {
        $uid = getUserInfo('id');
    }
}

/**
 * 获取客户端IP地址 
 * @return string
 */
function getIp()
{
	if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown"))
	$ip = getenv("HTTP_CLIENT_IP");
	else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown"))
	$ip = getenv("HTTP_X_FORWARDED_FOR");
	else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown"))
	$ip = getenv("REMOTE_ADDR");
	else if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown"))
	$ip = $_SERVER['REMOTE_ADDR'];
	else $ip = "unknown";
	return($ip);
}

//获取登录信息
function getUserInfo($key='',$checklogin=true)
{
    if(IS_LOGIN)
    {
        $userinfo = unserialize(session(C('USER_AUTH_KEY')));
        if($userinfo)
        {
            if(!empty($key)) return $userinfo[$key];
            else return $userinfo;
        }
    }
    else if($checklogin) ;
    else return false;
}

function getUserCookie()
{
    $cookie = cookie('localcookie');
    if(!$cookie) 
    {
        $time = time();
        $cookie = md5(uniqid().$time);
        cookie('localcookie',  $cookie, 3600 * 24 * 365);
        $map = array('ctime'=>array('lt',$time - 30 * 24 * 3600),'uid'=>0);
        M("Shopcart")->where($map)->delete(); //自动清楚３０天以前的无登录物品
    }
    return $cookie;
}

/**
 * 获取项目设置信息
 * @param string $key      设置key
 * @param string $block    配置块
 * @param object $default  默认值
 * @param bool $is_cache   是存缓存
 * @param string $path     缓存路径
 */
function getOption($block,$key='',$default='',$is_cache = true,$path = DATA_PATH)
{
	$result = $default;
	if($is_cache)
	{
		$cache = '_option/'.$block;
		$data = F($cache,'',$path);
		$type = 0;
		if(!$data)
		{
			$model = M("Option");
			$list = $model->where('block="'.$block.'"')->field("`key`,`value`")->order('`key` asc')->select();
			//测试
			//if($block == 'tao'){echo 'getOption:';dump($list);}
			$data = array();
			foreach ($list as $list) $data[$list['key']] =  $list['value'];
			F($cache,$data,$path);
		}
		if($key && array_key_exists($key,$data)) $result = $data[$key];
		else if(!$key) $result = $data;
	}
	else
	{
		$model = M("Option");
		$map['block'] = $block;
		if($key)
		{
			$map['key'] = $key;
			$one = $model->where($map)->field(`value`)->find();
			if($one) return $one['value'];
		}
		else
		{
			$one = $model->where($map)->field(`value`)->select();
			if($one) return $one;
		}
	}
	if($block == 'tao'){/*echo 'getOption:';dump($result);*/}
	return $result;
}
/**
 * 获取项目所有二级分类
 */
function prodClass(){
	$mul=2;
	$cache='_prodClass/'.$mul;
	$cate=F($cache);
	if(!$cate){
		$model=M("Item");
		$arr=Array();
		$class1=$model->field("id")->where("pid=3")->select();
		foreach ($class1 as $k=>$v) {
			$arr[]=$v["id"];
		}
		$data['pid']=array('in',$arr);
		$cate=$model->field("id,pid,bak3")->where($data)->select();
		F($cache,$cate);
	}
	return  $cate;
}
 /**
 * 获取项目国际地区
 * @param string id 选中的地区   
 */
function _inteArea($id=0){
	$cache="_area/inte";
	$cate=F($cache);
	if(!$cate){
		$map["pid"]="3239";
		$cate=M("Area")->where($map)->select();
		F($cache,$cate);
	 }	
    $cates='<option value="0">- select one -</option>';
	foreach ($cate as $k=>$v) {
		if($v['area_id']==$id){
			$cates.='<option value="'.$v['area_id'].'"  selected="selected">'.$v['short'].'</option>';
		}else{
			$cates.='<option value="'.$v['area_id'].'">'.$v['short'].'</option>';
		}
	}

	return $cates;
}
 


//获取根据键值结点列表
function getItem($key,$mul=0)
{
    $cache = '_item/'.$key.$mul;
    $cate = F($cache);
	if(!$cate)
	{
		$model = M("Item");
        $map = array();
        $map['pid'] = 0;
        if(is_numeric($key)) $map['id'] = $key;
        else $map['ename'] = $key;
		$cate = $model->field('id')->where($map)->find();
		if($cate)
		{
			$rs = $model->order('sort asc,id asc')->where(array('pid'=>$cate['id'],'status'=>1))->select();
			$cate = array();
			foreach ($rs as $rs) 
            {
                if($mul)
                {
                    $map = array('pid'=>$rs['id'],'status'=>1);
                    $count = $model->where($map)->count();
                    if($count > 0) $rs['subname'] = $model->order('sort asc,id asc')->where($map)->select();
                }
                $cate[$rs['id']]    = $rs;
                if(!$mul && $rs['ename']) $cate[$rs['ename']] = $rs;
            }
			if($pid = 0) F($cache,$cate);
		}
	}
	
	return $cate;
}

/**
 * 根据ID和父类键值获取结点单个字段值
 * @param int $id      结点id或者关键字
 * @param string $key  结点块
 * @param string $col  要取值的字段
 * @param string $funs 函数方法
 * @return string|array 
 */
function getItemById($id,$key,$col='name',$funs=null)
{
	$cate = getItem($key);
	if($col) 
    {
        if($funs) return call_user_func ($funs, $cate[$id][$col]);
        else return $cate[$id][$col];
    }
    else return $cate[$id];
}

/**
 * 根据广告位键值，获取广告列表
 * @param string $key
 * @param int $num
 * @return array 
 */
function getAd($key,$num = 0)
{
    $cache = 'ad_'.$key.'_'.$num;
	$ads = S($cache);
	if(!$ads)
	{
        $cate = getItem('ad_pos');
        foreach($cate as $cate)
        {
            if($cate['ename'] == $key)
            {
                $id = $cate['id'];
                $map = array();
                $map['status'] = 1;
                $map['pos'] = $id;
                if($num > 0) $ads = M("Ad")->where($map)->order('sort desc,id asc')->limit($num)->select();
                else $ads = M("Ad")->where($map)->order('sort desc,id asc')->select();
                if($ads) S($cache,$ads,3600);
                break;
            }
        }
    }
    return $ads;
}

/**
 * 获取当前页面的URL
 * @return string
 */
function getUrl() {
	$pageURL = 'http';
	if($_SERVER["HTTPS"] == "on") $pageURL .= "s";
	$pageURL .= "://";
	if($_SERVER["SERVER_PORT"] != "80") $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
	else $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	return $pageURL;
}

/**
 * 用户积分处理
 * @param int $uid 用户ID
 * @param int $num 积分数，正数表示增加，负数表示扣除
 * @param string $reason 处理日志
 * @param string $bak1 附加参数
 * @return bool 
 */
function point($uid,$num,$reason='',$bak1='')
{
    $user = M('User')->find($uid);
	if($user)
	{
		$point = getCredit($uid,'point');
        $rs    = ($num > 0 && M("UserCredit")->where('uid = "'.$uid.'"')->setInc('point',$num)) || 
                ($num < 0 && $point >= abs($num) && M("UserCredit")->where('uid = "'.$uid.'"')->setDec('point',abs($num)));
        if($rs) 
        {
            ulog ($uid, 'point_log', $reason, $bak1,$num);
            return true;
        }
    }
    return false;
}

/**
 * 密码加密方式，可自行修改
 * @param string $str 要加密的字符
 * @return string
 */
function pwdEncrypt($str)
{
	return md5($str);
}

/**
 * 屏蔽关键词
 * @param string $wd 需要处理的字符串
 * @return string 
 */
function screen($wd)
{
	$wd = trim($wd);
	$bds = getOption('screen');
	if($bds['screen_open']) $wd = preg_replace('/'.$bds['screen_words'].'/', $bds['screen_replace'],$wd);
	return $wd;
}


/**
 * 打印数组
 * @param string $arr 
 * @return string 
 */
function pre($arr)
{
	echo "<pre>";print_r($arr);echo "</pre>";
}

//检查是否含有屏蔽词
function has_screen($wd)
{
	$wd = trim($wd);
	$bds = getOption('screen');
	if($bds['screen_open']) return preg_match('/'.$bds['screen_words'].'/is',$wd);
	return false;
}

/**
 * 价格处理
 * @param float $price
 * @param int $type
 */
function _price($price,$type = 1)
{
    $price = number_format($price, 2);
	switch ($type)
	{
		case 1:
			return '¥ '.$price;
		case 2:
			return $price." 元";
		case 3:
			return "RMB ".$price;
		default:
			return $price;
	}
}

//获取用户详情
function uinfo($id)
{
	$info = M("User")->find($id);
	if($info) return $info;
	else return null;
}

//用户登录处理
function ulogin($user,$ip,$log='',$remember=0)
{
    $save = array();
    $save['time_login'] = time();
    if($ip != $user['ip']) 
    {
        $save['ip'] = $ip;
        $user['ip'] = $ip;
    }
    
    $map = array();
    $map['id'] = $user['id'];
    $map['status'] = 1;
    M("User")->where($map)->save($save);
    
    session(C('USER_AUTH_KEY'),  serialize($user));
    
    $cookie = getUserCookie();
    $map = array('uid'=>0,'cookie'=>$cookie);
    M("Shopcart")->where($map)->save(array('uid'=>$user['id'],'cookie'=>null));
    
    if($remember == 1)
    {
        $rem = array();
        $rem['id'] = $user['id'];
        $rem['ip'] = $ip;
        $rem['pw'] = $user['password'];
        $str = strCode(serialize($rem));
        setcookie('remember_info', $str, time() + 30 * 24 * 3600, '/');
    }
    else setcookie('remember_info','',time()-1,'/');
    
    $bind_info = session('bind_info');
    if($bind_info)
    {
        session('bind_info',null);
        $bind_info = unserialize($bind_info);
        bindToAccount($user['id'],$bind_info);
        
    }
}

//绑定认证平台
function bindToAccount($uid,$info)
{
    $map = array();
	$map['type'] = $info['type'];
	$map['oauth_token'] = $info['oauth_token'];
	$map['oauth_token_secret'] = $info['oauth_token_secret'];
    if(M("Login")->where($map)->count() == 0)
    {
        $info['uid']  = $uid;
        $info['inst'] = time();
        if(M('Login')->add($info)) ulog($uid, 'account_bind', '', $info['type']);
    }
}

//用户退出处理
function ulogout()
{
    $uid = getUserInfo('id',false);
    //if($uid > 0) ulog($uid,'logout_user');
    session(C("USER_AUTH_KEY"),null);
    setcookie('remember_info','',time()-1,'/');
}



/**
 * 获取用户日志
 * @param int  $uid    用户ID
 * @param type $ename  日志类型
 * @param type $field  要获取的日志字段
 * @param type $islast 是否只取最近的一条日志
 */
function getUserLog($uid,$ename='',$field='log,ctime',$islast=false)
{
    
}

/**
 * 获取图片Url地址
 * @author birdy freebird110@qq.com
 * @param string $file 图片相对于项目公共目录的路径，
 * @param string $default 默认的图片
 */
function imageUrl($file,$default='images/nopic.jpg',$absolute = false)
{
	if($absolute) $url = "http://".$_SERVER["HTTP_HOST"]."/";
	else $url = '';
	if(is_file($file)) return $url.$file;
	else return $url.$default;
}

/**
 * 获取头像图片Url地址
 * @author birdy freebird110@qq.com
 * @param string $uid 用户ID
 * @param string $type 默认图片类型  [small,middle,big]
 * @param boolen $absolute 是否绝对地址
 */
function faceUrl($uid,$type='middle', $absolute=true)
{
	if($absolute) $url = "http://".$_SERVER["HTTP_HOST"].'/';
	else $url = '';
	$oid = md5($uid);
	$first = substr($oid,0,1);
	$second = substr($oid,1,1);
	$file = "data/face/".$first.'/'.$second.'/'.$uid.'/'.$type.'.jpg';
	if(is_file($file)) return $url.$file;
	else return $url."images/face_".$type.".gif";
}
/**
 * 获取用户头像
 * @author birdy freebird110@qq.com
 * @param string $id 用户id
 * @param string $ctype big=>大图  mid=>原图 smll=>小图
 */
 function  getUserImg($id,$ctype){
	 $face='./data/face/'.$id.'/'.$ctype.'_face.jpg';
     if(file_exists($face))   {   //檢查文件是否存在
        $face='./data/face/'.$id.'/'.$ctype.'_face.jpg';
      }else{
      	 $face='web/images/head/no-img.jpg';
      }
    return $face;
}
/**
 * 发送邮件公共方法
 * @author birdy freebird110@qq.com
 * @param string $account 邮件接收者账号
 * @param string $title 邮件标题
 * @param string $content 邮件内容
 * @param string $name 邮件接收者昵称
 * @return array 邮件发送状态
 */
function sendEmail($account,$title,$content="邮件内容",$name='',$sender='',$senderName='')
{
	date_default_timezone_set('America/Toronto');
	import('@.ORG.Msg.Mailer');
	$mail       =   new PHPMailer();
	if(!$sender)     $sender     = 	 getOption('email','email_account','eastsoar@qq.com');
	if(!$senderName) $senderName =   getOption('email','email_name','南京东腾网络科技有限公司');
	$isSmtp = getOption('email_module','email',1);
	if($isSmtp)
	{
		$mail->SMTPAuth   = true;
		$mail->IsSMTP();
		$mail->Host       = getOption('email','email_host','smtp.qq.com');
		$mail->Port       = getOption('email','email_port',25);
		$mail->Username   = $sender;
		$mail->Password   = strCode(getOption('email','email_pwd','njdt8888'),false);
		$mail->AddReplyTo($sender,$senderName);
	}
    
	$mail->From       = $sender;
	$mail->FromName   = $senderName;
	$mail->CharSet    = "UTF-8";
	$mail->Subject    = $title;
	$mail->Body       = $content;
	$mail->WordWrap   = 50;
	$mail->MsgHTML($content);
	$mail->AddAddress($account,$name);
	$mail->IsHTML(true);

	if(!$mail->Send()) return array('status'=>false,'msg'=>"Mailer Error:".$mail->ErrorInfo);
	else return array('status'=>true);
}

/**
 * 时间显示格式处理
 * @author birdy freebird110@qq.com
 * @param string|int $time 时间戳
 * @param string $format 时间格式
 * @return string
 */
function sTime($time,$format='Y/n/j/')
{
	if(!is_numeric($time)) $time = strtotime($time);
	$limit = time() - $time;
	if($limit >= 0)
	{
		if($limit < 60) return '刚刚';
		else if($limit < 3600) return intval($limit/60).'分钟之前 ';
		else if($limit < 3600 * 24) return intval($limit/3600).'小时之前 ';
		else if($limit < 3600 * 24 * 7)  return intval($limit/(3600 * 24)).'天之前';
	}
	return date($format,$time);
}

/**
 * 时间显示格式处理
 * @author birdy freebird110@qq.com
 * @param string|int $time 时间戳
 * @param string $format 时间格式
 * @return string
 */
function sTime2($time,$format='Y/n/j/')
{
	if(!is_numeric($time)) $time = strtotime($time);
	$limit = $time - time();
	if($limit >= 0)
	{
		if($limit < 60) return '即将';
		else if($limit < 3600) return intval($limit/60).'分钟之前';
		else if($limit < 3600 * 24) return intval($limit/3600).'小时之前';
		else if($limit < 3600 * 24 * 2)  '明天';
	}
	return date($format,$time);
}

/**
 * 加密/解密字符串
 * @author birdy freebird110@qq.com
 * @param string $str 字符串
 * @param string $sing true为加密 false为解密
 * @return string
 */
function strCode($data,$sign = true)
{
	$encrypt_code = C('ENCRYPT_CODE');
	if(!$encrypt_code) $encrypt_code = '1w1h0o1k1n9o1w2t0h1e1';
	$key = md5($encrypt_code);
	$x = 0;
	$l = strlen($key);
	if($sign) $data = base64_encode($data);
	else $data = base64_decode($data);
	$len = strlen($data);
	for ($i=0;$i< $len;$i++)
	{
		if ($x== $l) $x=0;
		$char   .= substr($key,$x,1);
		$x++;
	}

	for ($i=0;$i< $len;$i++)
	{
		if($sign) $str .= chr(ord(substr($data,$i,1))+(ord(substr($char,$i,1)))%256);
		else
		{
			if (ord(substr($data,$i,1))<ord(substr($char,$i,1))) $str .= chr((ord(substr($data,$i,1))+256)-ord(substr($char,$i,1)));
			else $str .= chr(ord(substr($data,$i,1))-ord(substr($char,$i,1)));
		}
	}

	return $sign ? base64_encode($str) : base64_decode($str);
}

/**
 * 更新用户的信息
 * @author birdy freebird110@qq.com
 * @param string $key 需要更新的项
 * @param var $value 要更新的值
 */
function updateUserInfo($key,$value)
{
	$userinfo = unserialize(session(C('USER_AUTH_KEY')));
	$userinfo[$key] = $value;
	session(C('USER_AUTH_KEY'),serialize($userinfo));
}

//删除目录
function del_dir($dir,$type=true)
{
	$n=0;
	if (is_dir($dir))
	{
		if ($dh = opendir($dir))
		{
			while (($file = readdir($dh)) !== false) {
				if ( $file == '.' or $file =='..') continue;
				if (is_file ($dir.$file))
				{
					unlink($dir.$file);
					$n++;
				}
				if (is_dir ($dir.$file))
				{
					del_dir ($dir.$file.'/');
					if ($type)
					{
						$n++;
						rmdir($dir.$file.'/');
					}
				}
			}
		}
		closedir($dh);
	}
	return $n;
}

/**
 * 截取字符串，支持中文，并可设置字符编码
 * @author birdy freebird110@qq.com
 * @param string $str 要截取的字符串
 * @param int $start  起始位置
 * @param int $length 截取长度
 * @param string $charset 字符串编码
 * @param bool $suffix 是否加上后缀
 * @return string
 */
function msubstr($str, $start=0, $length, $charset="utf-8", $suffix='...')
{
	if(function_exists("mb_substr"))
	return mb_substr($str, $start, $length, $charset);
	elseif(function_exists('iconv_substr')) {
		return iconv_substr($str,$start,$length,$charset);
	}
	$re['utf-8']   = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
	$re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
	$re['gbk']    = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
	$re['big5']   = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
	preg_match_all($re[$charset], $str, $match);
	$slice = join("",array_slice($match[0], $start, $length));
	if($suffix) return $slice.$suffix;
	return $slice;
}

//获取搜索关键字
function get_search_key($num=2,$tag = 'k')
{
    $key = trim(preg_replace('/[~!@#$%^&*\(\)-_\+=\/\'\"\\<>\[\]\{\}\.\?,\s]+/s', ' ', trim(urldecode($_GET[$tag]))));
    $key = explode(' ', $key);
    return array_slice($key,0,$num);
}

//获取资讯分类下的置顶文章
function getInfo($key,$num=4)
{
    $cate = getItemById($key, 'info',null); //获取分类ID
   
    $pid = $cate['id'];
    $cache = '_info/'.$pid.'_'.$num;
    $info = F($cache);
    if($pid > 0 && !$info)
    {
        $map  = array();
        $map['top']    = 1;
        $map['status'] = 1;
        $map['pid']    = $pid;
        $data = M('Info')->field('id,name,ename')->where($map)->order('sort asc,id asc')->limit($num)->select();
	
       // if($data) //没有子分类也可显示
       // {
            $info['title'] = $cate['name'];
            $info['data']  = $data;
            F($cache,$info);
      //  }
    }
    return $info;
}

//提示
function sys_tips($info,$status='n',$data = array(),$ajax=false)
{
	if(is_array($data))
	{
		$data['info'] = $info;
		$data['status'] = $status;
	}
	if(isset($_REQUEST['is_ajax']) || $ajax) 
	{
		if($_REQUEST['is_ajax'] == 'json') exit(json_encode($data));
		else exit($_GET['callback'].'('.json_encode($data).')');
	}
	else return $data;
}

//提示信息写入session
function sys_info($tips='提示信息',$type=0)
{
	$type = intval($type);
	session('sys_tips_info',$tips);
	session('sys_tips_type',$type);
}

//调试数据
function sys_debug($var="",$exit=true)
{
	header('Content-type:text/html;charset=utf-8;');
	dump($var);
	if($exit) exit();
}


//显示IP地址，隐藏后2位
function _ip($ip)
{
    $ips = explode('.',$ip);
    return $ips[0].'.'.$ips[1].'.**.'.'**';
}

function checkEmail($inAddress)
{   

return (ereg("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+",$inAddress));   

} 

/**
 * 获取购物车数量
 * @author birdy freebird110@qq.com
 * @param string $uid 用户id
 */
function shopCount($uid=''){
	if(empty($uid)){$uid=getUserInfo('id');}
	if(empty($uid))
	{
		return 0;
	}
	else
	{
		return M('Shopcart')->where('uid='.$uid)->count();
	}
}
/**
 * 获取购物车商品的总价格
 * @author birdy freebird110@qq.com
 * @param string $uid 用户id
 */
function shoPrice($uid=''){
	if(empty($uid)){$uid=getUserInfo('id');}
	if(empty($uid))
	{
		return  0.00 ;
	}
	else
	{
		$rut=M('Shopcart')->field('info,number')->where('uid='.$uid)->select();
		$allprice=0;
		foreach ($rut as $k=>$v) {
			$ret=getkvarray($rut[$k]['info']);
			$allprice=$allprice+$ret['price']*$rut[$k]['number'];
		}
		return round($allprice, 2);
	}
}

//汇率
function currency() {

	return getOption("busy",'exchange',6.25);

}

//人民币转换为美元显示
function _usaprice($num){
	$erate = currency();
	$peric= sprintf("%.2f",$num/$erate);
	return '$ '.$peric;
}

/**
 * 用户i币处理
 * @param int $uid 用户ID
 * @param int $num 拍币数，正数表示增加，负数表示扣除
 * @param string $reason 处理日志
 * @param string $bak1 附加参数
 * @return bool 
 */
function coin($uid,$num,$reason='',$bak1='')
{
    $user = M('User')->find($uid);
	if($user)
	{
		$coin = getCredit($uid,'coin');
        $rs   = ($num > 0 && M("UserCredit")->where('uid = "'.$uid.'"')->setInc('coin',$num)) || 
                ($num < 0 && $coin >= abs($num) && M("UserCredit")->where('uid = "'.$uid.'"')->setDec('coin',abs($num)));
        if($rs) 
        {
           ulog ($uid, 'coin_log', $reason, $bak1,$num);
            return true;
        }
    }
    return false;
}


/**
 * 获取用户帐户
 * @param int $id
 * @param string $type
 * @return int|float|array 
 */
function getCredit($id,$type=null)
{
    $map['uid'] = $id;
    $credit = M("UserCredit")->where($map)->find();
    if(!$credit) 
    {
        $credit = array();
        $credit['uid'] = $id;
        $credit['coin'] = 0;
        $credit['point'] = 0;
        if(!M("UserCredit")->add($credit)) exit('程序错误');
    }
    if(!$type) return $credit;
    else return $credit[$type];
}
/**
 * 用户日志记录
 * @param int    $uid   用户id   not null
 * @param string $ename 日志类型 not null
 * @param string $name  日志标题 not null
 * @param string $bak1  备注1    null
 * @param int    $bak2  备注2    null
 */
function ulog($uid,$ename,$name='',$bak1='',$bak2='')
{
    $log = array();
    $log['uid']   = $uid;
    if($name) $log['name']  = $name;
    else $log['name'] = getItemById ($ename, 'log_type');
    $log['ename'] = $ename;
    
    if($bak1) $log['bak1'] = $bak1;
    if(is_numeric($bak2)) $log['bak2'] = intval($bak2);
    $log['ctime'] = time();
    return M('UserRecord')->add($log);
}


/**
 * 一次性积分规则
 * @param int $uid 用户ID
 * @param string $type 积分类型
 * @param string $bak1 附加信息
 * @return bool 
 */
function point_once($uid,$type,$bak1='')
{
    $allow = array('register','face'); //允许类型
    $item   = getItemById($type, 'log_type',null);
    $point  = $item['bak2'];
    if(in_array($type,$allow) && $item && $point > 0)
    {
        $reason = $item['name'];
        $count_total = log_count($uid,'point_log',array('name'=>$reason));
        if($count_total == 0)
        {
            return point($uid, $point, $reason,$bak1);
        }
    }
    return false;
}

/**
 * 每次积分规则
 * @param int    $uid   用户ID
 * @param string $type  积分类型
 * @param string $bak1  附加信息
 * @param bool   $check 是否检测数据重复
 * @return bool 
 */
function point_each($uid,$type,$bak1,$check=false)
{
    $allow = array('comment','invited'); //允许类型
    $item   = getItemById($type, 'log_type',null);
    $point  = $item['bak2'];
    if(in_array($type,$allow) && $item && $point > 0)
    {
        $reason = $item['name'];
        if(!$check || log_count($uid,'point_log',array('name'=>$reason,'bak1'=>$bak1) == 0))
        {
            return point($uid, $point, $reason,$bak1);
        }
    }
    return false;
}
/**
 * 消费积分规则
 * @param int    $uid   用户ID
 * @param string $type  积分类型
 * @param string $point  积分数，正数表示增加，负数表示扣除
 * @param string $bak1  附加信息
 * @param bool   $check 是否检测数据重复
 * @return bool 
 */
function point_sell($uid,$type,$point,$bak1,$check=false){
	$allow = array('spending'); //允许类型
	$item   = getItemById($type, 'log_type',null);
    $point  = round($point);
    if(in_array($type,$allow) && $item)
    {
        $reason = $item['name'];
        if(!$check || log_count($uid,'point_log',array('name'=>$reason,'bak1'=>$bak1) == 0))
        {
            return point($uid, $point, $reason,$bak1);
        }
    }
    return false;
	
}
/**
 * 获取某类型积分的数量 
 * @param string $type  积分类型
 * @return bool 
 */
function getSysPoint($type){
	if(empty($type)|| $type==""){
		return false;
	}
	$item   = getItemById($type, 'log_type',null);
	return $item['bak2'];
}
/**
 * 支付手续费 获取
 * @param string $type  积分类型 
 * @return Array   Array[key][1]为1代表百分比   为0代表值
 */
function payFee($type=0){
	$arr=array();
	$payArr=getPay();
	if($type!=0 && !in_array($type, $payArr))//检查是否为非法值
	{
		return false;
	}
	$res=M("Pay")->field("class_name,fee_amount,fee_type")->select();//重组 
	foreach ($res as $value) {
		if($value["fee_type"]==1){
			$arr[$value["class_name"]][0]=sprintf("%.2f",$value["fee_amount"]);
			$arr[$value["class_name"]][1]=1;  
		}else{
			$arr[$value["class_name"]][0]=floatval($value["fee_amount"]);
			$arr[$value["class_name"]][1]=0;
		}
	}
	foreach ($payArr as $k=>$v) {
		if(!array_key_exists($payArr[$k], $arr)){
			$arr[$payArr[$k]][0]= 0.00 ;
			$arr[$payArr[$k]][1]= 0 ;
		}
	}
	if($type==0){//返回
		return $arr;
	}else{
		return $arr[$type];
	}
}
/**
 * 获取所有支付插件
 * @param 
 */
function getPay(){
    $directory = APP_PATH."Lib/ORG/Pay/";
    $read_modules = true;
    $dir = @opendir($directory);
    $modules     = array();
	while (false !== ($file = @readdir($dir)))
	{
		if (preg_match("/^.*?\_payment\.php$/", $file))
		{
			$modules[] = require_once($directory .$file);
		}
	}
	@closedir($dir);
	unset($read_modules);
	foreach ($modules as $value) {
		$arr[]=$value["class_name"];
	}
	return $arr;	
}

//统计日志数
function log_count($uid=0,$ename='',$map=array())
{
    $where = array();
    if($uid > 0) $where['uid'] = $uid;
    if(!empty($ename)) $where['ename'] = $ename;
    if($map) $where = array_merge ($map,$where);
    return M("UserRecord")->where($where)->count();
}
//翻译
 function _trlan($val){
		@import('@.ORG.Tln.Tran');
		$trn=new Tran('1117887322', 'xiaobaiwangshi');
		
		return $trn->trans($val);
}


//获取产品分类名称列表
//return 一维数组
 function catelist()
 {
	$list = getItem('prod');
	$a = 0;
	foreach($list as $k=>$res){
		if(is_string($k)){
			unset($list[$k]);
		}else{
			//取出一级菜单中的id，name
			$data[$res['id']]   = $res['name'];
			$model = M('Item');
			//二级菜单
			$list2[$a] = $model->where('pid='.$res['id'])->select();
			//循环取出二级菜单中的id，name
			$arr = array();
			foreach($list2 as $vo){
				foreach($vo as $k2=>$vo_2){
					$data[$vo_2['id']] = $vo_2['name'];
				}
			}
		}
		$a++;
	}
	//调用翻译
	transLangs($data,'catelist');
	return $data;
 }
 
 
 function cateName($id){
 	 if($id){
 	 	$itemModel = M('Item');
 		$res = $itemModel->where('id='.$id)->find();
 		if($res){
 			$cateName = $res['name'];  // 分类名
 		}
 	 }else{
 	 	$cateName = 'All Categories';  // 分类名
 	 }
 	 
 	 return $cateName;
 }

 function getCountry(){
 	 $model = M('Country');
 	 $areaList = $model->select();
 	 return $areaList;
 }
 
 //格式化打印
 function dumpf($data){
 	echo '<pre>';
 	print_r($data);
 	echo '</pre>';
 }
 
 
 /**
  * 处理动态获取的数组数据，对其需多语言翻译的字段自动翻译至相应语言
  * @param string $type 翻译不同模块类型选择（包括系统所有widget插件独立生成的局部页面选择）
  * @param array &$data 待翻译的数组的引用
  * @param string $field='' 特殊替换需翻译的字段名 常规分支外的少数情况
  * @param string $pre 内容后缀
  * @param string $t info:为新闻内容前台调用
  * @return void 返回空
  */
 function transLangs(&$data,$type='areacate',$field='',$pre='',$t=''){
 	//定义base字典路径
 	define('BASEFILENAME', './web/translate/base.php');
 	$lang = isLang();
 	//需要翻译
 	if($lang !== false){
 		if($type == 'areacate'){//翻译栏目列表数据
 			//引入翻译字典
 			$trans = include './web/translate/areacate.php';//基本路径可以在config中配置
 			//引入并合并base通用翻译字典
 			$trans = transBaseReturn(BASEFILENAME,$trans);
 			//dump($trans);
 			//数组一维度的字段翻译
 			foreach($data as &$item0){
 				if(!empty($item0['name'])&&!empty($trans[$lang][$item0['name']])){
 					$item0['name'] = $trans[$lang][$item0['name']];
 				}
 				//判断是否对默认情况外的字段名翻译，更多情况的翻译加分支，如果情况很多，可以用一个独立函数传入数组并返回一个处理后的字段数组，在此调用
 				if($field != ''&& is_string($field)){
 					$subname = $field;
 				}else{
 					$subname = 'subname';
 				}
 				//数组二维度的字段翻译
 				if(!empty($item0[$subname])){
 					foreach($item0[$subname] as &$item1){
 						if(!empty($item1['name'])&&!empty($trans[$lang][$item1['name']])){
 							$item1['name'] = $trans[$lang][$item1['name']];
 						}
 					}
 				}
 				
 			}
 			
 		}else if($type == 'ad'){//翻译广告位列表数据
 			//引入翻译字典
 			$trans = include './web/translate/ad.php';
 			//引入并合并base通用翻译字典
 			$trans = transBaseReturn(BASEFILENAME,$trans);
 			foreach($data as &$item){
 				//数组一维度的字段翻译
 				if(!empty($item['title'])&&!empty($trans[$lang][$item['title']])){
 					$item['title'] = $trans[$lang][$item['title']];
 				}
 				//数组一维度的字段翻译
 				if(!empty($item['subtitle'])&&!empty($trans[$lang][$item['subtitle']])){
 					$item['subtitle'] = $trans[$lang][$item['subtitle']];
 				}
 			}
 		}else if($type == 'help'){//翻译帮助中心列表数据
 			//引入翻译字典
 			$trans = include './web/translate/help.php';
 			//引入并合并base通用翻译字典
 			$trans = transBaseReturn(BASEFILENAME,$trans);
 			//数组一维度的字段翻译
 			foreach($data as &$item){
 				if(!empty($item['name'])&&!empty($trans[$lang][$item['name']])){
 					$item['name'] = $trans[$lang][$item['name']];
 				}
 			}
 		}else if($type == 'end'){//...
 			//引入翻译字典
 			$trans = include './web/translate/end.php';
 			//引入并合并base通用翻译字典
 			$trans = transBaseReturn(BASEFILENAME,$trans);
 			//数组一维度的字段翻译
 			foreach($data as &$item){
 				if(!empty($item['name'])&&!empty($trans[$lang][$item['name']])){
 					$item['name'] = $trans[$lang][$item['name']];
 				}
 			}
 		}else if($type == 'left'){
 			//引入翻译字典
 			$trans = include './web/translate/left.php';
 			//引入并合并base通用翻译字典
 			$trans = transBaseReturn(BASEFILENAME,$trans);
 			//数组一维度的字段翻译
 			foreach($data as &$item){
 				if(!empty($item['name'])&&!empty($trans[$lang][$item['name']])){
 					$item['name'] = $trans[$lang][$item['name']];
 				}
 			}
 		}else if($type == 'text'){//一维度关联数组（非列表）翻译大文本字段
                                
                                if($t == 'info'){
                                    
                                    get_base($data, $pre, true, $lang, 'text');
                                    
                                }else{
                                    //引入翻译字典
                                    $trans = include './web/translate/left.php';
                                    //引入并合并base通用翻译字典
                                    $trans = transBaseReturn(BASEFILENAME,$trans);
                                    if($field == '')$field = 'text';
                                    if(!empty($data[$field]))$text_key = $data['name'].'texttexttexttexttext';//sub_string($data[$field]);//默认截取512字符
                                    //dump($text_key);echo '<hr/>';
                                    if(!empty($data[$field])&&!empty($trans[$lang][$text_key])){
                                            //echo $text_key;
                                            $data[$field] = $trans[$lang][$text_key];
                                    }
                                }
                    
 				//dump($data[$field]);echo '<hr/>';
 		}else if($type == 'catelist'){//翻译一级栏目列表(一维数组) head.htm
 			//引入翻译字典
 			$trans = include './web/translate/areacate.php';
 			//引入并合并base通用翻译字典
 			$trans = transBaseReturn(BASEFILENAME,$trans);
 			foreach($data as &$item){
 				if(!empty($item)&&!empty($trans[$lang][$item])){
 					$item = $trans[$lang][$item];
 				}
 			}
 		}else if($type == 'news'){//翻译news列表数据 用户中心右侧栏
                        //echo $lang;
                        //dumpf($data);
                        if($t == 'info'){
                            foreach($data as &$item){
                                get_base($item, $pre, true, $lang, 'title');
                            }
                            //dumpf($data);exit;
                        }else{
                            //引入翻译字典
                            $trans = include './web/translate/areacate.php';
                            //引入并合并base通用翻译字典
                            $trans = transBaseReturn(BASEFILENAME,$trans);
                            //数组一维度的字段翻译
                            foreach($data as &$item){

                                    if(!empty($item['name'])&&!empty($trans[$lang][$item['name']])){
                                            $item['name'] = $trans[$lang][$item['name']];
                                    }
                            }
                        }
                        
 		}
 	}
 	unset($trans);
 	//dump($data);
 }
 
 /**
  * 多语言翻译选择开关
  * @param array $lang 指定多语言翻译包,默认array('zh','ru')
  * @return string 返回语言标记字符串;false 不需要翻译
  */
 function isLang($lang=array('zh','ru')){
 	//获取配置多主题get参数字段 't'
 	$t = C('VAR_TEMPLATE');
 	//获取配置默认模板主题 'defuault'
 	$tpldefault = C('DEFAULT_THEME');
 	$gett = $_GET[$t];
 	$cookiet = cookie('think_template');
 	//判断需不需要翻译处理
 	if(!isset($gett)&&!isset($cookiet)){
 		return false;
 	}
 	if($gett == $tpldefault||$cookiet == $tpldefault){
 		return false;
 	}
 	//返回语言标记字符串
 	if(isset($gett)){
 		//dump($lang);
 		foreach($lang as $v){
 			if($gett == $v){
 				return $v;
 			}
 		}
 	}else if(isset($cookiet)){
 		foreach($lang as $v){
 			if($cookiet == $v){
 				return $v;
 			}
 		}
 	}else{
 		return false;//默认语言标记
 	}
 	
 }
 /**
  * 引入base通用翻译字典
  * @param string $filename base通用翻译字典文件
  * @param array $array 翻译字典数组 默认空数组 指定值后将合并
  * @return array 返回翻译字典数组
  */
 function transBaseReturn($filename,$array=array()){
 	$resultArray = array();
 	$transArray = array();
 	//读取翻译文件
 	$transJSON = file_get_contents($filename);
 	if($transJSON){//正确读取
 		//将json字符串解码成数组
 		$result = json_decode($transJSON,true);
 		if(is_array($result)){
 			$transArray = $result;
 			unset($result);
 		}
 	}
 	//dump($transArray);
 	if(empty($transArray)){
 		return $array;
 	}
 	if(empty($array)){
 		return $transArray;
 	}
 	$zh = array_merge($array['zh'],$transArray['zh']);
 	$ru = array_merge($array['ru'],$transArray['ru']);
 	$resultArray['zh'] = $zh;
 	$resultArray['ru'] = $ru;
 	unset($zh,$ru);
 	//dump($resultArray);
 	return $resultArray;
 }
 
 /**
  * 翻译动态获取的单个变量数据，自动翻译成相应语言
  * @param string $var 待翻译处理的变量
  * @param string $typepath 翻译字典文件的选择
  * return fixed 返回翻译后的值；不需要翻译返回原值
  */
 function transVar($var,$typepath='areacate'){
 	//语言选择
 	$lang = isLang();
 	//需要翻译
 	if($lang !== false){
 		//引入翻译字典
 		$trans = include './web/translate/'.$typepath.'.php';
 		//引入并合并base通用翻译字典
 		$trans = transBaseReturn(BASEFILENAME,$trans);
 		//dump($trans);
 		if(!empty($var)&&!empty($trans[$lang][$var])){
 			$result = $trans[$lang][$var];
 			unset($trans);
 			return $result;
 		}else{//没有翻译记录，返回原值
 			return $var;
 		}
 	}else{//不需要翻译，返回原值
 		return $var;
 	}
 }
 
 /**
  * 截取大文本翻译字段字符串长度(当字段长度超过512时,截取前512个,不超过指定长度,则返回原值)
  * @param int $length 指定字符串截取长度
  * @param string $string 需处理的字符串
  * @return string 返回截取后的值或返回原值
  */
 function sub_string($string,$length=512){
 	if(empty($string)||strlen($string)<=$length){
 		return $string;
 	}else{
 		return substr($string,0,$length);
 	}
 }
 /**
  * 多国语言与接口翻译同步
  * @param array $la 多语言翻译包,默认array('zh','ru')
  * @return fixed 0|1|2|false 同步处理完成后，返回同步标记
  */
 function syntrans($la=array('zh','ru')){//扩展更多语言，语言值顺序应事先固定，并调整相应代码
 	$lang = isLang();
 	//echo '$_GET='.$_GET['t'],'<br>';
 	//echo '$lang='.$lang,'<br>';
 	//同步所需值选择
 	if($lang === false){
 		$value = 1;
 	}else if($lang == 'zh'){
 		$value = 0;
 	}else if($lang == 'ru'){
 		//echo 'rururururururu';
 		$value = 2;
 	}
 	//echo '$value='.$value,'<br>';
 	//同步修改后台的开关对应的接口翻译的iorder_option.value字段值
 	$option = M('option');
 	$result = $option->field('value')->find(81);//find()返回的是一个一维关联数组，这里只有一个单元的关联数组
 	if($value != $result['value']){
 		//echo '1111111111111111111111';
 		$data = array();
 		$data['id'] = 81;//此项数据option表中记录已固定为81
 		$data['value'] = $value;
 		if($option->data($data)->save()<=0){//更新value值失败
 			//echo $option->getDbError();
 			return false;
 		}else{
 			return $value;
 		}
 	}else{
 		return $value;
 	}
 	
 }
 
 /*
  * 获取翻译的内容
  * @param  $item   数组
  * @param  $pre    内容后缀
  * @param  $t      true:前台调用 false:后台调用 
  * @param  $l      当前的语言
  * @param  $g      获取的内容类型
  */
    function get_base(&$item,$pre,$t='',$l='',$g=''){
        
        define('baseTrans', 'web/translate/base.php');
        /* 获取 zh ru 语言内容 */
        $transJSON = file_get_contents(baseTrans);
        
        if($transJSON !== false){
            $transArray = json_decode($transJSON,true);
        }
        //dumpf($transArray);exit;
        
        $_title_key = 'info_'.$item['id'];
        $_text_key = $_title_key.$pre;
        
        if($t){
            if($g == 'title'){
                /* 默认英文语言标题，如存在当前语言的标题时，则替换 */
                if($transArray[$l][$_title_key]){
                    $item['name'] = $transArray[$l][$_title_key];
                }
            }elseif($g == 'text'){
                /* 默认英文语言内容，如存在当前语言的内容时，则替换 */
                if($transArray[$l][$_text_key]){
                    $item['text'] = $transArray[$l][$_text_key];
                }
            }
            
        }else{
            $item['zh_text'] = $transArray['zh'][$_text_key];
            $item['ru_text'] = $transArray['ru'][$_text_key];

            $item['zh_name'] = $transArray['zh'][$_title_key];
            $item['ru_name'] = $transArray['ru'][$_title_key]; 
        }
        
    }
 
 
 
 
 
 
 
 
 
 
 

?>