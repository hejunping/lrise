<?php
/**
 * @name DFLV 基类
 * @author birdy
 * @email freebird110@qq.com 
 * @date 2012-1-1
 * @version 1.0
 */
class DFLV
{	
	public function html_tag($opt=array())
	{
		if(is_string($opt)) return $opt;
		else if(count($opt) == 1) return $opt[0];
		else 
		{
			$replace[] = $opt[0];
			$replace[] = $this->attr($opt[1]);
			if(is_bool($opt[3]) && !$opt[3])
			{
				$html = '<{tag} {attr}>{content}</{tag}>';
				$find = array('{tag}','{attr}');
			}
			else 
			{
				$html = '<{tag} {attr}>{content}</{tag}>';
				$find = array('{tag}','{attr}','{content}');
				$replace[] = $this->inner($opt[2]);
			}
			
			unset($opt);
			return str_replace($find,$replace,$html);
		}
	}
	
	//生成标签属性
	public function attr($attr)
	{
		if(is_string($attr)) return $attr;
		else if(is_array($attr))
		{
			$rs = array();
			foreach ($attr as $k=>$v) $rs[] = $k.'="'.$v.'"';
			return implode(' ',$rs);
		}
		else return '';
	}
	
	//生成标签内部内容
	public function inner($text)
	{
		if(is_string($text)) return $text;
		else 
		{
			$inner = array();
			foreach ($text as $attr) $inner[] = $this->html_tag($attr);
			return implode('',$inner);
		}
	}
	
	//加载CSS
	public function css($file)
	{
		if(is_array($file))
		{
			foreach ($file as $file) $css[] = $this->css($file);
			return implode('',$css);
		}
		else return  '<link href="'.$file.'" rel="stylesheet" type="text/css" />';
	}
	
	//加载JS
	public function js($file)
	{
		if(is_array($file))
		{
			foreach ($file as $file) $script[] = $this->css($file);
			return implode('',$script);
		}
		else return  '<script src="'.$file.'" type="text/javascript" ></script>';
	}
	
	public function jquery($code)
	{
		$jq = '<script type="text/javascript">jQuery(function(){';
		if(is_array($code)) $jq .= implode('',$code);
		else $jq .= $code;
		$jq .= '});</script>';
		return $jq;
	}
}
?>