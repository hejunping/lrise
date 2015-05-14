<?php
class Phone 
{
	var $_config;
	var $_mobile;
	var $_content;
	var $_encode = 'utf-8';
	protected $_action = 'ssmp';
	protected $_error_code = '';
	protected $_error_info = '';
	public function Phone($mobile,$content,$encode='utf-8',$act='ssmp')
	{
		if(is_array($mobile)) $this->_mobile  = implode(',',$mobile);
		else $this->_mobile  = $mobile;
		$this->_content = $content;
		if($encode) $this->_encode = $encode;
		if($act) $this->_action = $act;
		if(method_exists($this,$this->_action)) $this->{$this->_action}();
		else 
		{
			$this->_error = '不存在的发送平台';
			return false;
		}
	}
	
	//获取错误代号
	public function error_code()
	{
		return $this->_error_code;
	}
	
	//获取错误信息
	public function error_info()
	{
		return $this->_error_info;
	}
	
	//希奥短信平台
	protected function ssmp()
	{
		$user    = getOption('message','message_sdk');
		$pass    = md5(getOption('message','message_pwd'));
		$sign    = '';
		$url = 'http://api.52ao.com/?user='.$user.'&pass='.$pass.'&mobile='.$this->_mobile
				.'&content='.$this->_content.$sign.'&encode='.$this->_encode;
		$rs = file_get_contents($url, false, stream_context_create(array('http'=>array('method'=>"GET",'timeout'=>60))));
		file_put_contents('phone.txt',var_export($_SERVER,true));
		if($rs == '200') return true;
		else 
		{
			$error = array(
				'101'=>'用户或密码错误',
				'102'=>'号码为空',
				'103'=>'保留',
				'104'=>'非法字符',
				'105'=>'内容过长',
				'106'=>'剩余短信不足',
				'107'=>'发送速度过快',
				'108'=>'号码过多',
				'109'=>'暂停发送',
				'110'=>'手机号码有误',
				'111'=>'保留',
				'112'=>'短信内容为空',
				'113'=>'账户无效',
				'114'=>'操作失败',
				'118'=>'修改密码,新密码为空'
			);
			
			$this->_error = isset($error[$rs])?$error[$rs]:'未知错误';
			return false;
		}
	}
}
?>