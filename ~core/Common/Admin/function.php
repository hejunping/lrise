<?php
function cate_opt($key,$val="id",$text="name")
{
	$rs = array();
	$cate = getItem($key);
	foreach ($cate as $cate) $rs[$cate[$val]] = $cate[$text];
	return $rs; 
        
}

/**
 * 输出状态值改变模板
 * @param 状态值 $val
 * @param 字段key值 $id
 * @param ajax执行页面 $url
 * @param 字段名 $col
 * @param 模板标签 $tag
 * @param 标签样式 $class
 * @return string
 */
function dp_bool($val,$id,$url,$col='status',$tag='a',$class="bold ajax_bool")
{
	$tpl = '<{tag} href="{url}" rel="{id}" rev="{col}" class="{class}">{text}</{tag}>';
	$find = array("{url}","{id}","{col}","{text}","{class}","{tag}");
	$rep  = array(U($url),$id,$col,$val > 0?'是':'否',$class.($val > 0?' cGreen':' cRed'),$tag);
	return str_replace($find,$rep,$tpl);
}

/**
 * 输出次序改变模板
 * @param 当前排序值 $val
 * @param 字段key值 $id
 * @param ajax执行页面 $url
 * @param 增/减量 $num
 * @param 模板标签 $tag
 * @param 标签样式 $class
 * @return string
 */
function dp_sort($val,$id,$url,$num=1,$tag="a",$class="bold ajax_sort f14")
{
	$tpl = '<{tag} href="{url}" rel="{id}" rev="-{num}" title="减{num}" class="{class}">-</{tag}> {val} <{tag} href="{url}" rel="{id}" rev="{num}" title="加{num}" class="{class}">+</{tag}>';
	$find = array("{url}","{id}","{num}","{val}","{class}","{tag}");
	$rep = array(U($url),$id,$num,$val,$class,$tag);
	return str_replace($find,$rep,$tpl);
}

function dp_input($col,$val,$text,$tips='',$type='text',$class="text h20")
{
	$tpl = '<dl class="lineD"><dt>{text}：</dt><dd><input name="{col}" class="{class}" type="{type}" value="{val}" rel="{val}"><p>{tips}</p></dd></dl>';
	$find = array("{text}","{col}","{class}","{type}","{val}","{tips}");
	if($type == 'file')
	{
		if($tips == 'image') $tips = $val?'<img src="'.$val.'#rand='.time().'" class="mT">':'';
		else if($tips == 'file') $tips = $val?$val:'';
		$val = '';
	}
	$rep = array($text,$col,$class,$type,$val,$tips);
	return str_replace($find,$rep,$tpl);
}

function dp_textarea($col,$val,$text,$tips='',$id='',$class="text h200 w500")
{
	$tpl = '<dl class="lineD"><dt>{text}：</dt><dd><textarea name="{col}" class="{class}"{id}>{val}</textarea><p>{tips}</p></dd></dl>';
	$find = array("{text}","{col}","{class}","{id}","{val}","{tips}");
	$id = $id?' id="'.$id.'"':'rel="'.$val.'"';
	$rep = array($text,$col,$class,$id,$val,$tips);
	return str_replace($find,$rep,$tpl);
}

function dp_select($col,$val,$data,$text,$tips='',$class='')
{
	$tpl = '<dl class="lineD"><dt>{text}：</dt><dd><select name="{col}" class="{class}">{opt}</select><p>{tips}</p></dd></dl>';
	$find = array("{text}","{col}","{class}","{opt}","{tips}");
	$rep = array($text,$col,$class,dp_option($data,$val),$tips);
	return str_replace($find,$rep,$tpl);
}

function dp_radio($col,$val,$text,$tips='',$data=array('否','是'))
{
	$tpl = '<dl class="lineD"><dt>{text}：</dt><dd>{radio}<p>{tips}</p></dd></dl>';
	$find = array("{text}","{radio}","{tips}");
	$rep = array($text,dp_radio_one($col,$val,$data),$tips);
	return str_replace($find,$rep,$tpl);
}

function dp_radio_one($col,$default,$data=array('否','是'))
{
	foreach ($data as $k=>$data)
	{
		$sel = ($k == $default) ? ' checked' : '';
		$tpl .= '<input name="'.$col.'" type="radio" value="'.$k.'"'.$sel.'>'.$data.'&nbsp;&nbsp;';
	}
	return $tpl;
}

function dp_option($data,$def)
{
    $find = false;
    $b = 0;
	foreach ($data as $k=>$data) 
	{
        $sel = '';
        if($k == $def) 
        {
            $find = true;
            $sel = ' selected';
        }
		$tpl .= '<option value="'.$k.'"'.$sel.'>'.$data.'</option>';
	}
	return $tpl;
}

function form_input($col,$val,$class='text w80 h20',$type='text',$attr='')
{
	$tpl = '<input name="{col}" class="{class}" type="{type}" value="{val}" {attr}>';
	$find = array("{col}","{class}","{type}","{val}","{attr}");
	$rep = array($col,$class,$type,$val,$attr);
	return str_replace($find,$rep,$tpl);
}

function form_select($col,$val,$data,$class='',$first='')
{
	$tpl = '<select name="{col}" class="{class}">{opt}</select>';
	$find = array("{col}","{class}","{opt}");
    if(!$data) $data = array('否','是');
	if($first)
	{
		if(is_string($first)) 
        {
            if(!array_key_exists($val, $data)) $val = 0;
            $data[0] = $first;
        }
		else if(is_array($first))
        {
            if(!array_key_exists($val, $data)) $val = $first[0];
            $data[$first[0]] = $first[1];
        }
	}
	$rep = array($col,$class,dp_option($data,$val));
	return str_replace($find,$rep,$tpl);
}

//格式化文件大小
function formatsize($fileSize)
{
	$size = sprintf ( "%u", $fileSize );
	if ($size == 0) return ("0 Bytes");
	$sizename = array(" Bytes", " KB", " MB", " GB", " TB", " PB", " EB", " ZB", " YB");
	return round ( $size / pow ( 1024, ($i = floor ( log ( $size, 1024 ) )) ), 2 ) . $sizename [$i];
}

// 输出纯文本
function tx($text, $parseBr = false)
{
	if (! $parseBr) $text = str_replace ( array("\r", "\n", "\t"), ' ', $text );
	else $text = nl2br ( $text );
	$text = stripslashes ( $text );
	$text = htmlspecialchars ( $text, ENT_NOQUOTES, 'UTF-8 ' );
	return $text;
}

/**
 * 去一个二维数组中的每个数组的固定的键知道的值来形成一个新的一维数组
 * @param $pArray 一个二维数组
 * @param $pKey 数组的键的名称
 * @return 返回新的一维数组
 */
function getSubByKey($pArray, $pKey = "", $pCondition = "")
{
	$result = array();
	foreach ( $pArray as $temp_array )
	{
		if (is_object ( $temp_array ))
		{
			$temp_array = ( array ) $temp_array;
		}
		if (("" != $pCondition && $temp_array [$pCondition [0]] == $pCondition [1]) || "" == $pCondition)
		{
			$result [] = ("" == $pKey) ? $temp_array : isset ( $temp_array [$pKey] ) ? $temp_array [$pKey] : "";
		}
	}
	return $result;
}

//字节数格式化
function byte_format($size, $dec = 2)
{
	$a = array("B", "KB", "MB", "GB", "TB", "PB");
	$pos = 0;
	while ( $size >= 1024 )
	{
		$size /= 1024;
		$pos ++;
	}
	return round ( $size, $dec ) . " " . $a [$pos];
}


/**
 * 递归删除目录
 * @param string $dirname 目录路径
 * @return boolean
*/
function rmdirr($dirname)
{
	if (! file_exists ( $dirname ))
	{
		return false;
	}
	if (is_file ( $dirname ) || is_link ( $dirname ))
	{
		return unlink ( $dirname );
	}
	$dir = dir ( $dirname );
	while ( false !== $entry = $dir->read () )
	{
		if ($entry == '.' || $entry == '..')
		{
			continue;
		}
		rmdirr ( $dirname . DIRECTORY_SEPARATOR . $entry );
	}
	$dir->close ();
	return rmdir ( $dirname );
}


//获取网址HTML代码，并保存到本地
function getUrlContent($url,$charset="utf-8",$useCache=true,$post=false,$para=array(),$timeout=30)
{
    $file = md5($url);
    $first = substr($file,0,1);
	$second = substr($file,1,1);
    $path = 'data/url/'.$first.'/'.$second;
    $file = $path .'/'.$file.'.txt';
    if($useCache && is_file($file)) return file_get_contents ($file);
    else
    {
        file_put_contents('data/~cache/Temp/'.md5($url).'.txt',$url."\r\n".$file);
        mk_dir($path);
        $method = $post?"POST":"GET";
        $opts = array('http'=>array('method'=>$method,'timeout'=>$timeout));
        if($para) $opts['http']['content'] = http_build_query($para, '', '&');
        $context = stream_context_create($opts);
        $text = file_get_contents($url,false,$context);
        if($text) 
        {
            if(strtolower($charset) != 'utf-8') $text = iconv($charset,'utf-8',$text);
            file_put_contents($file, $text);
        }
        return $text;
    }
}

function getItemPath($name,$file='info.php',$type='')
{
    if($type == '') $type = trim($_REQUEST['type']);
    if($type == '') $type = 'singer';
    $md5 = md5($name);
    $first = substr($md5,0,1);
	$second = substr($md5,1,1);
    $path = 'data/'.$type.'/down/'.$first.'/'.$second.'/'.$md5.'/';
    if(!is_dir($path)) mk_dir($path);
    return $path .$file;
}

//获取汉字拼音
function getCharPinyin($str)
{
    $data = M("Char")->field('id,code')->getByName($str);
    if($data && $data['code'])
    {
        $code = strtolower($data['code']);
        $url = 'http://www.chazidian.com/r_zi_zd'.$code.'/';
        $str = file_get_contents($url);
        $regex = '/拼音：\s+(.*?)注音/is';
        preg_match($regex, $str,$rs);
        preg_match_all('/(?<py>\S*?)<script.*?>spf\("(?<en>[a-zA-Z]+)(?<sd>[0-9]+)"\);<\/script>/is', $rs[1],$rs2);
        $rs = array();
        if($rs2['en']) 
        {
            $rs['id'] = $data['id'];
            $rs['en'] = array_unique($rs2['en']);
            foreach ($rs2['en'] as $k=>$v) 
            {
                $rs['all'][$k][] = $rs2['en'][$k];
                $rs['all'][$k][] = $rs2['py'][$k];
                $rs['all'][$k][] = $rs2['sd'][$k];
            }
        }
        return $rs;
    }
    else return null;
}


?>