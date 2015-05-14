<?php
/**
 * 后台功能外新附加翻译控制器
 * @time 2014-6-16
 * @name z
 */
class TransAction extends AdminBaseAction{
	//翻译处理--添加新翻译
	public function translate1(){
		//定义翻译字典基础路径
		define(TRANSPATH,'./web/translate/');
		$post = $_POST;
		if($post['transBase']){//使用通用翻译文件
			$transfilename = TRANSPATH.'base.php';
		}else{//指定翻译文件
			$transfilename = TRANSPATH.$post['transFile'].'.php';
		}
		//翻译替换标记
		$transSign = null;
		$type = $post['type'];
		if($type == 'zh'){
			$transSign = '"_zh"=>"",';
		}
		if($type == 'ru'){
			$transSign = '"_ru"=>"",';
		}
		if(!$transSign){
			$this->ajaxReturn(0,'翻译字典标记无效，请检查翻译字典标记！',0);
		}
		//翻译键值对
		$key = $post['key'];
		$value = $post['value'];
		$transReplace = '"'.$key.'"=>"'.$value.'",'."\n".$transSign;
		//读取翻译文件
		$transcontent = file_get_contents($transfilename);
		if($transcontent){//读取成功
			/*
				//模式字符串
				$pattern = '/"'.$key.'"=>".*",/U';
				//替换字符串
				//$replacement = '"'.$key.'"=>"'.$value.'",';
				//正则替换
				
				$matchs = array();
				preg_match_all($pattern,$transcontent,$matchs,PREG_SET_ORDER);
				if(count($matchs)>2){//匹配成功且超过2次
					$transcontent = preg_replace($pattern, '', $transcontent);
					//字符串替换
					$transcontent = str_replace($transSign, $transReplace, $transcontent);
				}else{//匹配失败，利用字符串替换新增
					//字符串替换
					$transcontent = str_replace($transSign, $transReplace, $transcontent);
				}
			*/
			//新增翻译记录
			$transcontent = str_replace($transSign, $transReplace, $transcontent);
			//回写
			$transResult = file_put_contents($transfilename, $transcontent);
			if($transResult !== false){
				$this->ajaxReturn($type,'添加翻译成功！',1);//data,赋给一个标记，但连续添加翻译时，弹出提示：您已添加过翻译，是否更新
			}else{
				$this->ajaxReturn(0,'写入翻译字典失败，请检查翻译字典格式是否异常！',0);
			}
		}else{
			$this->ajaxReturn($transfilename,'翻译字典读取失败，请检查翻译字典路径！',0);
		}
		
	}
	//检查翻译记录
	public function record1(){
		$key = $_POST['key'];
		$transBase = $_POST['transBase'];
		//定义翻译字典基础路径
		define(TRANSPATH,'./web/translate/');
		$post = $_POST;
		if($post['transBase']){//使用通用翻译文件
			$transfilename = TRANSPATH.'base.php';
		}else{//指定翻译文件
			$transfilename = TRANSPATH.$post['transFile'].'.php';
		}
		//读取翻译文件
		$transcontent = file_get_contents($transfilename);
		if($transcontent){//读取成功
			//模式字符串
			$pattern = '/"'.$key.'"=>".*",/U';
			$recordResult = array();
			$result = preg_match_all($pattern, $transcontent,$recordResult,PREG_SET_ORDER);
			if($result !== false){//正则匹配查询成功
				if(empty($recordResult)){
					$recordResult = '暂无翻译记录！';
				}
				$this->ajaxReturn($recordResult,'查询成功！',1);
			}else{
				$this->ajaxReturn(0,'查询出错！',0);
			}
		}else{
			$this->ajaxReturn($transfilename,'翻译字典读取失败，请检查翻译字典路径！',0);
		}
		
	}
	
	
	//重写translate()、record()方法
	//添加翻译处理
	public function translate(){
		//定义翻译字典基础路径
		define(TRANSPATH,'./web/translate/');
		$post = $_POST;
		if($post['transBase']){//使用通用翻译文件
			$transfilename = TRANSPATH.'base.php';
		}else{//指定翻译文件
			$transfilename = TRANSPATH.$post['transFile'].'.php';
		}
		$key = $post['key'];
		$value = $post['value'];
		$type = $post['type'];
		//读取翻译文件
		$transJSON = file_get_contents($transfilename);
		if($transJSON !== false){//正确读取
			//将json字符串解码成数组
			$transArray = json_decode($transJSON,true);
		}else{
			$this->ajaxReturn($transfilename,'翻译字典读取失败，请检查翻译字典路径！',0);
			die();
		}
		//直接赋值或更新值
		if(!empty($transArray)){
			$transArray[$type][$key] = $value;
		}else{
			$transArray = array(
				'ru'=>array(),
				'zh'=>array(),
			);
			$transArray[$type][$key] = $value;
		}
		//再次编码成json字符串 
		$jsonString = json_encode($transArray);
		//写入翻译字典保存
		$result = file_put_contents($transfilename, $jsonString);
		
		if($result!==false){
			$this->ajaxReturn($type,'添加翻译成功!',1);
			//$this->ajaxReturn($type,$value,1);
		}else{
			$this->ajaxReturn(0,'写入翻译字典失败!',0);
		}
	
	
	
	}
	
	//查看翻译记录
	public function record(){
		$dot_tips = '<br/>......';
		$key = $_POST['key'];
		$keytext = $_POST['keytext'];
		if(!$keytext){
			$keytext = $key;
			$dot_tips = '';
		}
		$transBase = $_POST['transBase'];
		$transFile = $_POST['transFile'];
		//定义翻译字典基础路径
		define(TRANSPATH,'./web/translate/');
		$post = $_POST;
		if($post['transBase']){//使用通用翻译文件
			$transfilename = TRANSPATH.'base.php';
		}else{//指定翻译文件
			$transfilename = TRANSPATH.$transFile.'.php';
		}
		
		//读取翻译文件
		$transJSON = file_get_contents($transfilename);
		if($transJSON !== false){//正确读取
			//将json字符串解码成数组
			$transArray = json_decode($transJSON,true);
		}else{
			$this->ajaxReturn($transfilename,'翻译字典读取失败，请检查翻译字典路径！',0);
			die();
		}
		//翻译记录数据
		//提示
		$tips = '<h4 style="color:#567ab4;padding:0;margin:0;">提示：双击关闭窗口，或再次点击\'翻译记录\'！</h4><br/>';
		$recordResult = $tips.'<span style="color:#f60;">『原文』：</span><br/>'.$keytext.$dot_tips."<br/>";
		$flag = false;
		if(!empty($transArray)){
			if(isset($transArray['zh'][$key])){
				$recordResult .= '<p style="clear:both;border-top:1px solid #ccc;"><p>'.'<span style="color:#f60;">『中文 / 英文』：</span><br/>'.$transArray['zh'][$key]."<br/>";
				$flag = true;
			}
			if(isset($transArray['ru'][$key])){
				$recordResult .= '<p style="clear:both;border-top:1px solid #ccc;"><p>'.'<span style="color:#f60;">『俄文』：</span><br/>'.$transArray['ru'][$key]."<br/>";
				$flag = true;
			}
			if(!$flag){
				$recordResult .= '<p style="clear:both;border-top:1px solid #ccc;"><p>'.'<span style="color:#f60;">暂无记录！</span>';
			}
		}
		//返回查询结果
		$this->ajaxReturn($recordResult,'查询成功！',1);
		//$this->ajaxReturn(strlen($key),'查询成功！',1);//测试用
	}
	
}
?>