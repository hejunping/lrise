<?php
/**
 * @name 列表操作类
 * @author birdy
 * @email freebird110@qq.com 
 * @date 2012-1-1
 * @version 1.0
 */
class Lists extends DFLV
{
	//配置
	protected $_opts = array();

	//列表结果
	protected $table = array(
	'top'	=> ' <div class="Toolbar_inbox alR">{text}</div>',
	'table' => '<div class="list"><table width="100%" border="0" cellspacing="0" cellpadding="0">{line}</table></div>',
	'line'	=> '<tr onmouseover="this.bgColor=\'#EEEEEE\'" onmouseout="this.bgColor=\'\'"{tips}>{row}</tr>',
	'head'=> '<th class="line_l">{th}</th>',
	'row'	=> '<td>{td}</td>',
	'foot'	=> ' <div class="Toolbar_inbox alL">{text}</div>',
	'nodata'=> '<tr><td {attr}>{tips}</td></tr>',
	'common'=>'{text}'
	);
	
	//列表上下样式
	public function bar($opts,$pos='top')
	{
		if(is_array($opts))
		{
			$link = array();
			foreach ($opts as $opts) $link[] = $this->html_tag($opts);
			$opts = implode(' ',$link);
			unset($link);
		}

		return str_replace('{text}',$opts,$this->table[$pos]);
	}

	/**
	 * 生成列表
	 * @param array $data
	 * @param array $opts
	 * @return string
	 */
	public function init($data=array(),$opts=array())
	{
		$len = count($data);
		$flen = count($opts['fields']);

		$ii = 0;
		foreach ($opts['fields'] as $k=>$field)
		{
			$head[] = str_replace("{th}",$field,$this->table['head']);
			if($len <= 0) continue;
			if(array_key_exists($k,$opts['deal']))
			{
				$opt = $opts['deal'][$k];
				if($opt['type'] && method_exists(&$this,'_'.$opt['type']))
				{
					$fun = '_'.$opt['type'];
					$this->$fun($k,$field,$len,$opt,$data,$list);
				}
				else
				{
					$i = 0;
					while ($i < $len)
					{
						$list[$i][] = str_replace("{td}",'',$this->table['row']);
						$i++;
					}
				}
			}
			else
			{
				$i = 0;
				while ($i < $len)
				{
					$list[$i][] = str_replace("{td}",$data[$i][$k],$this->table['row']);
					$i++;
				}
			}
			$ii++;
		}

		$find = array('{tips}','{row}');
		$replace = array('',implode('',$head));
		$line = str_replace($find,$replace,$this->table['line']);
		if($len > 0)
		{
			$i = 0;
			while ($i < $len)
			{
				if(isset($opts['tips']))
				{
					$tips = array();
					foreach ($opts['tips'] as $k=>$v)
					{
						$val = htmlspecialchars($data[$i][$k]);
						if($val)
						{
							if($v)
							{
								if(is_array($v)) 
								{
									if($v[0] == 'callback') $tips[] = call_user_method($v[1],&$this,$val);
									else $tips[] = $v[$val];
								}
								else
								{
									$val = msubstr($val,0,650,'utf-8','（内容过长...）');
									$tips[] = $v.'：'.$val;
								}
							}
							else $tips[] = $val;
						}
					}
					$tips = ' title="'.implode('&#13;',$tips).'"';
					$replace = array($tips,implode('',$list[$i]));
				}
				else $replace = array('',implode('',$list[$i]));
				$line .= str_replace($find,$replace,$this->table['line']);
				$i++;
			}
		}
		else
		{
			$find = array('{tips}','{attr}');
			$line .= str_replace($find,$opts['nodata'],$this->table['nodata']);
		}

		unset($list);
		unset($data);
		unset($opts);
		return str_replace('{line}',$line,$this->table['table']);
	}
	
	//模板替换
	protected function _tpl($k,$field,$len,&$opt,&$data,&$list)
	{
		$find = array();
		$i = 0;
		$key = $opt['key']?$opt['key']:$k;
		if(!is_array($key)) $key = explode(',',$key);
		foreach ($key as $one) $find[] = '{'.$one.'}';
		while ($i < $len)
		{
			$replace = array();
			foreach ($key as $one) $replace[] = $data[$i][$one];
			$list[$i][] = str_replace("{td}",str_replace($find,$replace,$opt['data']),$this->table['row']);
			$i++;
		}
	}

	//改变次序
	protected function _ajax_sort($k,$field,$len,&$opt,&$data,&$list)
	{
		$i = 0;
		$url = $opt['url'];
		$key = trim($opt['key']);
		$key = empty($key) ? 'id' : $key;
		$var = intval($opt['var']);
		$var = $var > 0 ? $var : 1;
		while ($i < $len)
		{
			$id= $data[$i][$key];
			$barDec = "<a href='{$url}' class='ajax_sort' rel='{$id}' rev='".($var*-1)."'>-</a>";
			$barInc = "<a href='{$url}' class='ajax_sort' rel='{$id}' rev='{$var}'>+</a>";
			$list[$i][] = str_replace("{td}",$barDec.' <span>'.$data[$i][$k].'</span> '.$barInc,$this->table['row']);
			$i++;
		}
	}

	protected function _ajax_bool($k,$field,$len,&$opt,&$data,&$list)
	{
		$i = 0;
		$key = trim($opt['key']);
		$key = empty($key) ? 'id' : $key;
		$url = $opt['url'];
		$opt = $opt['data'];
		$optN = $opt['n'];
		$optY = $opt['y'];
		if(is_array($optN))
		{
			$tN = $optN[0]?$optN[0]:'否';
			$cN = $optN[1]?$optN[1]:'';
			$aN = $optN[2]?$optN[2]:'';
		}
		else
		{
			$tN = '否';
			$cN = $optN?$optN:'cRed';
			$aN = '';
		}

		if(is_array($optY))
		{
			$tY = $optY[0]?$optY[0]:'是';
			$cY = $optY[1]?$optY[1]:'';
			$aY = $optY[2]?$optY[2]:'';
		}
		else
		{
			$tY = '是';
			$cY = $optY?$optY:'cGreen bold';
			$aY = '';
		}

		while ($i < $len)
		{
			$val = $data[$i][$k];
			$id = $data[$i][$key];
			if($val) $list[$i][] = str_replace("{td}","<a href='{$url}' class='ajax_bool {$cY}' rel='{$id}' rev='{$k}' {$aY}>".$tY."</a>",$this->table['row']);
			else $list[$i][] = str_replace("{td}","<a href='{$url}' class='ajax_bool {$cN}' rel='{$id}' rev='{$k}' {$aN}>".$tN."</a>",$this->table['row']);
			$i++;
		}
	}

	//调用枚举
	protected function _switch($k, $field, $len, &$opt , &$data, &$list)
	{
		$i = 0;
		while ($i < $len)
		{
			if(array_key_exists($data[$i][$k],$opt['data']))
			{
				$k1 = $data[$i][$k];
				$list[$i][] = str_replace("{td}",$opt['data'][$k1],$this->table['row']);
			}
			else $list[$i][] = str_replace("{td}",$opt['default'],$this->table['row']);
			$i++;
		}
	}

	//调用类方法
	protected function _callback($k, $field, $len, &$opt , &$data, &$list)
	{
		$i = 0;
		$fun = $opt['data'];
		$class = $opt['class'];
		if(!$class) $class = & $this;
		if(method_exists($class,$fun))
		{
			$para = $opt['para'];
			if(!$para) $para = array('###');
			$pos = intval($opt['pos']);
			$lenp = count($para);
			while ($i < $len)
			{
				if(!$para) $para = $data[$i][$k];
				else $para[$pos] = $data[$i][$k];
				if(isset($opt['takedata'])) $para[$lenp] = $data[$i];
				$list[$i][] = str_replace("{td}",call_user_method_array($fun,$class,$para),$this->table['row']);
				$i++;
			}
		}
	}

	//调用外置函数
	protected function _function($k,$field,$len,&$opt,&$data,&$list)
	{
		$i = 0;
		$fun = $opt['data'];
		if(function_exists($fun))
		{
			$para = $opt['para'];
			$pos = intval($opt['pos']);
			$lenp = count($para);
			while ($i < $len)
			{
				if(!$para) $para = $data[$i][$k];
				else $para[$pos] = $data[$i][$k];
				if(isset($opt['takedata'])) $para[$lenp] = $data[$i];
				$list[$i][] = str_replace("{td}",call_user_func_array($fun,$para),$this->table['row']);
				$i++;
			}
		}
	}

	//输出链接
	protected function _link($k,$field,$len,&$opt,&$data,&$list)
	{
		$i = 0;
		while ($i < $len)
		{
			$link = array();
			foreach ($opt['data'] as $pkey)
			{
				if(is_array($pkey[4]) && !$this->_check($pkey[4],&$data[$i])) continue;

				$replace = $find = array();
				foreach ($pkey[2] as $one)
				{
					$find[] = '%'.$one.'%';
					$replace[] = $data[$i][$one];
				}

				$pkey[1] = str_replace($find,$replace,urldecode($pkey[1]));
				$pkey[3] = str_replace($find,$replace,urldecode($pkey[3]));
				$link[] = '<a href="'.$pkey[1].'" '.$pkey[3].'>'.$pkey[0].'</a>';
			}

			$list[$i][] = str_replace("{td}",implode(' ',$link),$this->table['row']);
			$i++;
		}
	}

	protected function _html_tag($k,$field,$len,&$opt,&$data,&$list)
	{
		$i = 0;
		while ($i < $len)
		{
			$link = array();
			$attr = $opt['data']['attr'];
			$col = $opt['data']['col'];
			$opt['data']['opt'][1][$attr] = $data[$i][$col];
			$list[$i][] = str_replace("{td}",$this->html_tag($opt['data']['opt']),$this->table['row']);;
			$i++;
		}
	}

	protected function _select($name,$data,$attr='')
	{
		$array = array();
		foreach ($data as $k=>$v) $array[] = array('option','value="'.$k.'"',$v);
		$array = array('select','name="'.$name.'" '.$attr,$array);
		return $array;
	}

	protected function _check($cond,$data)
	{
		switch ($cond[0])
		{
			case 'eq':
				if($data[$cond[1]] != $cond[2]) return false;
				break;
			case 'neq':
				if($data[$cond[1]] == $cond[2]) return false;
				break;
		}
		return true;
	}
}
?>