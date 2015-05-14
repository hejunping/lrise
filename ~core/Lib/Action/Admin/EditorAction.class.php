<?php
/**
 * @name 编辑器相关
 * @author birdy
 * @date 2012-3-23
 * @version 1.0
 */
class EditorAction extends AdminBaseAction
{
	protected $path;
	protected $url;

	//模块初始化
	protected function _initialize()
	{
		@import('@.ORG.JSON');
		$this->path = 'data/images/';
		$this->url = dirname($_SERVER['REQUEST_URI']) . '/';
	}

	//首页
	public function index()
	{
		//根目录路径，可以指定绝对路径
		$root_path = $this->path;
		//根目录URL
		$root_url = $root_path;
		
		$ext_arr = array('gif', 'jpg', 'jpeg', 'png', 'bmp'); //图片扩展名

		//目录名
//		$dir_name = empty($_GET['dir']) ? '' : trim($_GET['dir']);
//		if (!in_array($dir_name, array('', 'images', 'flash', 'media', 'file'))) {
//			echo "Invalid Directory name.";
//			exit;
//		}
		if ($dir_name !== '') {
			$root_path .= $dir_name;
			$root_url .= $dir_name;
			if (!file_exists($root_path)) {
				mkdir($root_path);
			}
		}

		//根据path参数，设置各路径和URL
		if (empty($_GET['path'])) {
			$current_path = realpath($root_path) . '/';
			$current_url = $root_url;
			$current_dir_path = '';
			$moveup_dir_path = '';
		} else {
			$current_path = realpath($root_path) . '/' . $_GET['path'];
			$current_url = $root_url . $_GET['path'];
			$current_dir_path = $_GET['path'];
			$moveup_dir_path = preg_replace('/(.*?)[^\/]+\/$/', '$1', $current_dir_path);
		}
		echo realpath($root_path);
		//排序形式，name or size or type
		$order = empty($_GET['order']) ? 'name' : strtolower($_GET['order']);

		//不允许使用..移动到上一级目录
		if (preg_match('/\.\./', $current_path)) {
			echo 'Access is not allowed.';
			exit;
		}
		//最后一个字符不是/
		if (!preg_match('/\/$/', $current_path)) {
			echo 'Parameter is not valid.';
			exit;
		}
		//目录不存在或不是目录
		if (!file_exists($current_path) || !is_dir($current_path)) {
			echo 'Directory does not exist.';
			exit;
		}

		//遍历目录取得文件信息
		$file_list = array();
		if ($handle = opendir($current_path)) {
			$i = 0;
			while (false !== ($filename = readdir($handle))) {
				if ($filename{0} == '.') continue;
				$file = $current_path . $filename;
				if (is_dir($file)) {
					$file_list[$i]['is_dir'] = true; //是否文件夹
					$file_list[$i]['has_file'] = (count(scandir($file)) > 2); //文件夹是否包含文件
					$file_list[$i]['filesize'] = 0; //文件大小
					$file_list[$i]['is_photo'] = false; //是否图片
					$file_list[$i]['filetype'] = ''; //文件类别，用扩展名判断
				} else {
					$file_list[$i]['is_dir'] = false;
					$file_list[$i]['has_file'] = false;
					$file_list[$i]['filesize'] = filesize($file);
					$file_list[$i]['dir_path'] = '';
					$file_ext = strtolower(array_pop(explode('.', trim($file))));
					$file_list[$i]['is_photo'] = in_array($file_ext, $ext_arr);
					$file_list[$i]['filetype'] = $file_ext;
				}
				$file_list[$i]['filename'] = $filename; //文件名，包含扩展名
				$file_list[$i]['datetime'] = date('Y-m-d H:i:s', filemtime($file)); //文件最后修改时间
				$i++;
			}
			closedir($handle);
		}


		usort($file_list, 'cmp_func');

		$result = array();
		//相对于根目录的上一级目录
		$result['moveup_dir_path'] = $moveup_dir_path;
		//相对于根目录的当前目录
		$result['current_dir_path'] = $current_dir_path;
		//当前目录的URL
		$result['current_url'] = $current_url;
		//文件数
		$result['total_count'] = count($file_list);
		//文件列表数组
		$result['file_list'] = $file_list;

		//输出JSON字符串
		header('Content-type: application/json; charset=UTF-8');
		$json = new Services_JSON();
		echo $json->encode($result);
	}

	//图片上传
	public function upload()
	{
		//文件保存目录路径
		$save_path = $this->path.date('y-m/d/');

		//文件保存目录URL
		$save_url  = $save_path;

		//定义允许上传的文件扩展名
		$ext_arr = array(
		'image' => array('gif', 'jpg', 'jpeg', 'png'),
		//'flash' => array('swf', 'flv'),
		//'media' => array('swf', 'flv', 'mp3', 'wav', 'wma', 'wmv', 'mid', 'avi', 'mpg', 'asf', 'rm', 'rmvb'),
		//'file' => array('doc', 'docx', 'xls', 'xlsx', 'ppt', 'htm', 'html', 'txt', 'zip', 'rar', 'gz', 'bz2'),
		);


		$max_size = 1000000; //最大文件大小
		if(!mk_dir($save_path)) $this->alert("创建目录失败。"); //创建文件夹

		//有上传文件时
		if (empty($_FILES) === false)
		{
			$file_name = $_FILES['imgFile']['name'];    //原文件名
			$tmp_name = $_FILES['imgFile']['tmp_name']; //服务器上临时文件名
			$file_size = $_FILES['imgFile']['size'];    //文件大小
			if (!$file_name) $this->$this->alert("请选择文件。"); //检查文件名

			if (@is_dir($save_path) === false) $this->alert("上传目录不存在。".$save_path); //检查目录
			if (@is_writable($save_path) === false) $this->alert("上传目录没有写权限。"); //检查目录写权限
			if (@is_uploaded_file($tmp_name) === false) $this->alert("临时文件可能不是上传文件。"); //检查是否已上传
			if ($file_size > $max_size) $this->alert("上传文件大小超过限制。"); //检查文件大小

			$dir_name = empty($_GET['dir']) ? 'image' : trim($_GET['dir']);
			if (empty($ext_arr[$dir_name])) $this->alert("目录名不正确。"); //检查目录名

			//获得文件扩展名
			$temp_arr = explode(".", $file_name);
			$file_ext = array_pop($temp_arr);
			$file_ext = trim($file_ext);
			$file_ext = strtolower($file_ext);
			//检查扩展名
			if (in_array($file_ext, $ext_arr[$dir_name]) === false)
			$this->alert("上传文件扩展名是不允许的扩展名。\n只允许" . implode(",", $ext_arr[$dir_name]) . "格式。");

			$new_file_name = uniqid().'.'.$file_ext; //新文件名

			$file_path = $save_path . $new_file_name;
			if (move_uploaded_file($tmp_name, $file_path) === false) $this->alert("上传文件失败。");
			@chmod($file_path, 0644);
			$file_url = $save_url . $new_file_name;
			header('Content-type: text/html; charset=UTF-8');
			@import('@.ORG.Json.JSON');
			$json = new Services_JSON();
			echo $json->encode(array('error' => 0, 'url' => $file_url));
			exit;
		}
	}

	protected function alert($msg)
	{
		header('Content-type: text/html; charset=UTF-8');
		$json = new Services_JSON();
		echo $json->encode(array('error' => 1, 'message' => $msg));
		exit;
	}
}

//排序
function cmp_func($a, $b) {
	global $order;
	if ($a['is_dir'] && !$b['is_dir']) {
		return -1;
	} else if (!$a['is_dir'] && $b['is_dir']) {
		return 1;
	} else {
		if ($order == 'size') {
			if ($a['filesize'] > $b['filesize']) {
				return 1;
			} else if ($a['filesize'] < $b['filesize']) {
				return -1;
			} else {
				return 0;
			}
		} else if ($order == 'type') {
			return strcmp($a['filetype'], $b['filetype']);
		} else {
			return strcmp($a['filename'], $b['filename']);
		}
	}
}
?>