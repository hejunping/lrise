<?php
class Tran{
	//有道翻译
	 public  $key='';
	 public  $keyform='';
     private $url='http://fanyi.youdao.com/fanyiapi.do';
     
   
     public function __construct($key,$keyform){
     	$this->key=$key;
     	$this->keyform=$keyform;
     }
	
	 public function trans($val){
	 	if(empty($val)){return '内容不能为空';}
	    $url = 'http://fanyi.youdao.com/fanyiapi.do?keyfrom='.$this->keyform.'&key='.$this->key.'&type=data&doctype=json&version=1.1&q='.$val;
	 	$content = @file_get_contents($url); 
		$sina = json_decode($content,true);
		$errorcode = $sina['errorCode'];
	    $trans = '';
		 if(isset($errorcode)){
			switch ($errorcode){
				case 0:
					$trans = $sina['translation']['0'];
					break;
				case 20:
					$trans = '要翻译的文本过长';
					break;
				case 30:
					$trans = '无法进行有效的翻译';
					break;
				case 40:
					$trans = '不支持的语言类型';
					break;
				case 50:
					$trans = '无效的key';
					break;
				default:
					$trans = '出现异常';
					break;
			}
		}
		return $trans;
	 }
 
}


