<?php
/**
 * @name 系统模块
 * @author birdy
 * @date 2012-3-15
 * @version 1.0
 */
class SystemAction extends AdminBaseAction
{
    //起始页（面板）
    public function index()
    {
        $statistics = array();
        // 服务器信息
        $serverInfo ['项目名称'] = getOption('website', "website_name" ,'乐拍网');
        $serverInfo ['服务器系统及PHP版本'] = PHP_OS . ' / PHP v' . PHP_VERSION;
        $serverInfo ['服务器软件'] = $_SERVER ['SERVER_SOFTWARE'];
        $serverInfo ['最大上传许可'] = (@ini_get ( 'file_uploads' )) ? ini_get ( 'upload_max_filesize' ) : '<font color="red">no</font>';
        
        $mysqlinfo = M ( '' )->query ( "SELECT VERSION() as version" );
        $serverInfo ['MySQL版本'] = $mysqlinfo [0] ['version'];
        
        $t = M ( '' )->query ( "SHOW TABLE STATUS LIKE '" . C ( 'DB_PREFIX' ) . "%'" );
        foreach ( $t as $k )
        {
        	$dbsize += $k ['Data_length'] + $k ['Index_length'];
        }
        $serverInfo ['数据库大小'] = byte_format ( $dbsize );
        $statistics [' 服务器信息'] = $serverInfo;
        unset ( $serverInfo );
        
        // 用户信息
        $user ['注册用户'] = M ( 'User' )->count ();
        $statistics [' 用户信息'] = $user;
        $statistics [' 用户信息'] [' 管理员'] = M ( 'Admin' )->count ();
        unset ( $user );
        
        // 开发团队
        $statistics [' 开发团队'] = array(
	        '项目团队' => '<a href="http://www.eastsoar.com" target="_blank">南京东腾网络科技有限公司</a>',
	        '项目经理' => 'birdy', 
	        '项目成员' => 'birdy 紫藤萝  张四海 刘响  钟芳华  '
        );
        // '开发团队' => '',;
        $this->assign ( "title", getOption ('website', "website_name" ) );
        $this->assign ( 'statistics', $statistics );
        $this->display();
    }

    //数据备份
    public function backup()
    {
        $dir = 'data/backup/';
        if (is_dir ( $dir ))
        {
        	if ($dh = opendir ( $dir ))
        	{
        		while ( ($filename = readdir ( $dh )) !== false )
        		{
        			if ($filename != '.' && $filename != '..')
        			{
        				if (substr ( $filename, strrpos ( $filename, '.' ) ) == '.sql')
        				{
        					$file = $dir . $filename;
        					$filemtime = date ( 'Y-m-d H:i:s', filemtime ( $file ) );
        					$addtime [] = $filemtime;
        					$log [] = array(
        					'filename' => $filename,
        					'filesize' => formatsize ( filesize ( $file ) ),
        					'addtime' => $filemtime, 'filepath' => C ( 'SITE_URL' ) . $file
        					);
        				}
        			}
        		}
        	}
        } 
        else @mk_dir ( $dir, 0777 );
        
        array_multisort ( $addtime, SORT_ASC, $log );
        //dump($log);die;
        $this->assign ( 'log', $log );
        
        $this->assign ( 'table',D('Database')->getTableList() );
        $this->display();
    }

    //缓存清理
    public function cache()
    {
        $this->display();
    }

    //执行备份
    public function doBackUp()
    {
        if (empty ( $_REQUEST ['backup_type'] ))
        {
        	session ( "editTipsType", 0 );
        	session ( "editTips", "参数错误" );
        	$this->redirect ( "admin/system/backup" );
        }
        if (intval ( $_REQUEST ['sizelimit'] ) < 1 || intval ( $_REQUEST ['sizelimit'] ) > 10240)
        {
        	session ( "editTipsType", 0 );
        	session ( "editTips", "备份大小必须在512~10M(即102400KB)以内" );
        	$this->redirect ( "admin/system/backup" );
        }
        
        $tables = array();
        $volume = isset ( $_GET ['volume'] ) ? (intval ( $_GET ['volume'] ) + 1) : 1;    // 当前卷号
        $filename = date ( 'ymd' ) . '_' . substr ( md5 ( uniqid ( rand () ) ), 0, 10 ); // 备份文件的文件名
        $_REQUEST ['backup_type'] = tx ( $_REQUEST ['backup_type'] ) == 'custom' ? 'custom' : 'all';
        
        if ($_REQUEST ['backup_type'] == 'all')
        {
        	$tables = D ( 'Database' )->getTableList ();
        	$tables = getSubByKey ( $tables, 'Name' );
               
        
        }
        else if ($_REQUEST ['backup_type'] == 'custom')
        {
        	if ($_POST ['backup_table'])
        	{
        		$tables = $_POST ['backup_table'];
        		$_SESSION ['backup_custom_table'] = $tables;
        	}
        	else $tables = $_SESSION ['backup_custom_table'];
        }
        
        $filename = trim ( $_REQUEST ['filename'] ) ? trim ( $_REQUEST ['filename'] ) : $filename;
        $startfrom = intval ( $_REQUEST ['startform'] );
        $tableid = intval ( $_REQUEST ['tableid'] );
        $sizelimit = intval ( $_REQUEST ['sizelimit'] ) ? intval ( $_REQUEST ['sizelimit'] ) : 1000;
        $tablenum = count ( $tables );
        $filesize = $sizelimit * 1000;
        $complete = true;
        $tabledump = '';
        
        if ($tablenum == 0) $this->error ( '请选择备份的表' );
        
        for(; $complete && ($tableid < $tablenum) && strlen ( $tabledump ) + 500 < $filesize; $tableid ++)
        {
        	$sqlDump = D ( 'Database' )->getTableSql ( $tables [$tableid], $startfrom, $filesize, strlen ( $tabledump ), $complete );
        	$tabledump .= $sqlDump ['tabledump'];
        	$complete = $sqlDump ['complete'];
        	$startfrom = intval ( $sqlDump ['startform'] );
        	if ($complete)
        	$startfrom = 0;
        }
        
        ! $complete && $tableid --;
        if (trim ( $tabledump ))
        {
        	$filepath = 'data/backup/' . $filename . "_$volume" . '.sql';
        	$fp = @fopen ( $filepath, 'wb' );
        	if (! fwrite ( $fp, $tabledump )) $this->error ( '文件目录写入失败, 请检查data目录是否可写' );
        	else
        	{
        		$url_param = array(
        		'filename' => $filename, 'backup_type' => $_REQUEST ['backup_type'],
        		'sizelimit' => $sizelimit, 'tableid' => $tableid, 'startform' => $startfrom,
        		'volume' => $volume
        		);
        
        		session ( "editTipsType", 0 );
        		session ( "editTips", "备份第{$volume}卷成功" );
        		$this->redirect ( "admin/system/backup" );
        	}
        }
        else
        {
        	session ( "editTipsType", 0 );
        	session ( "editTips", "备份成功" );
        	$this->redirect ( "admin/system/backup" );
        
        }
    }

    //删除备份数据
    public function doDeleteBackUp()
    {
        $_POST ['selected'] = explode ( ',', tx ( $_POST ['selected'] ) );
        foreach ( $_POST ['selected'] as $file )
        {
        	$file = 'data/backup/' . $file . '.sql';
        	is_file ( $file ) && @unlink ( $file );
        }
        echo 1;
    }

    //清除缓存
    public function clearCache()
    {
        $mod = $_POST ['module']; // 接受项目下的子目录
        $sta = $_POST['static'];//接收静态缓存下的子目录
        $pro = $_POST ['project']; // 接受项目
        
        if ($_POST ['clear'] == 'all')
        {
            rmdirr ( RUNTIME_PATH ); // 删除目录
        	@mkdir ( $dirs, 0777, true ); // 再新建一个新的空目录*/
        	//@mkdir ( './Runtime/Temp', 0777, true ); // 再新建一个新的空目录*/
        }
        else
        {
        	if(empty($mod)){
        		session ( "editTipsType", 0 );
       			session ( "editTips", "请选择要删除的子目录" );
       			$this->redirect ( "admin/system/cache" );
        	}else{
        		foreach($mod as $v)
        		{
        			if($v !== 'Cache' && $v !== '_option')//无子目录
        			{
        				rmdirr(RUNTIME_PATH.'/'.$v);
        			}else{
        				if($v == 'Cache'){
        					if (empty ( $pro ))
				        	{
				        		session ( "editTipsType", 0 );
				        		session ( "editTips", "请选择要删除的项目" );
				        		$this->redirect ( "admin/system/cache" );
				        	}
				        	else 
				        	{
				        		foreach($pro as $val)
				        		{
				        			rmdirr(RUNTIME_PATH.'/Cache/'.$val);//删除模板缓存中的模块
				        		}
				        	}
        				}elseif($v == '_option'){
        					if (empty ($sta))
				        	{
				        		session ("editTipsType",0);
				        		session ("editTips",'请选择要删除的静态缓存子目录');
				        		$this->redirect("admin/system/cache");
				        	}
				        	else
				        	{
				        		foreach($sta as $vl)
				        		{
				        			rmdirr(RUNTIME_PATH.'/Data/'.$vl);//删除静态缓存
				        		}
				        	}
        				}
        			}
        		}
        	}
        }
        
        session ( "editTipsType", 1 );
        session ( "editTips", "清理完成" );
        $this->redirect ( "admin/system/cache" );
    }
}
?>