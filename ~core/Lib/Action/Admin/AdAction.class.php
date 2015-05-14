<?php
/**
 * @name 广告管理
 * @author birdy
 * @date 2012-3-15
 * @version 1.0
 */
class AdAction extends AdminBaseAction
{
    //预览专题
    public function subject_view()
    {
        $id = $this->_get('id','intval');
        if($id > 0)
        {
            $ad = M("Ad")->find($id);
            if($ad)
            {
                $pos = getItemById($ad['pos'], "ad_pos", "bak2");
                if($pos == 1)
                {
                    $conf = unserialize($ad['config']);
                    $this->assign('config',$conf);
                    $this->assign('ad',$ad);
                    $this->display("view");
                    exit;
                }
            }
        }
        redirect(U('admin/ad/index'));
    }
    
    //获取容器参数
    public function subject_get()
    {
        $id = $this->_get('id','intval');
        $iid  = $_REQUEST['iid'];
        if($id > 0 && $iid > 0)
        {
            $ad = M("Ad")->find($id);
            if($ad)
            {
                $pos = getItemById($ad['pos'], "ad_pos", "bak2");
                if($pos == 1)
                {
                    $conf    = unserialize($ad['config']);
                    foreach($conf['items'] as $k=>$v) 
                    {
                        if($k == $iid) sys_tips ("","y",array('data'=>$v));
                    }
                    sys_tips('找不到该容器信息', 'n');
                }
            }
        }
        sys_tips('非法操作', 'n');
    }
    
    //删除容器
    public function subject_del()
    {
        $id = $this->_get('id','intval');
        $iid  = $_REQUEST['iid'];
        if($id > 0 && $iid > 0)
        {
            $ad = M("Ad")->find($id);
            if($ad)
            {
                $pos = getItemById($ad['pos'], "ad_pos", "bak2");
                if($pos == 1)
                {
                    $conf    = unserialize($ad['config']);
                    foreach($conf['items'] as $k=>$v) 
                    {
                        if($k == $iid)
                        {
                            unset($conf['items'][$k]);
                            break;
                        }
                    }
                    
                    $save['config']      = serialize($conf);
                    M("Ad")->where("id=".$id)->save($save);
                    sys_tips('', 'y');
                }
            }
        }
        sys_tips('非法操作', 'n');
    }
    
    //保存布局
    public function subject_layout()
    {
        $id = $this->_get('id','intval');
        if($id > 0)
        {
            $ad = M("Ad")->find($id);
            if($ad)
            {
                $pos = getItemById($ad['pos'], "ad_pos", "bak2");
                if($pos == 1)
                {
                    $data = explode(";", $_REQUEST['pos']);
                    if($data)
                    {
                        $rs = array();
                        foreach($data as $data)
                        {
                            $pos = explode("|",$data);
                            $rs[$pos[0]]['left'] = $pos[1];
                            $rs[$pos[0]]['top']  = $pos[2];
                        }

                        $conf    = unserialize($ad['config']);
                        foreach($conf['items'] as $k=>$v) 
                        {
                            if($rs[$k]) $conf['items'][$k] = array_merge($v,$rs[$k]);
                        }
                        $save['config']      = serialize($conf);
                        M("Ad")->where("id=".$id)->save($save);
                        sys_tips('', 'y');
                    }
                }
            }
        }
        sys_tips('非法操作', 'n');
    }
    
    //保存专题配置
    public function subject_config()
    {
        $id = $this->_get('id','intval');
        if($id > 0)
        {
            $ad = M("Ad")->find($id);
            if($ad)
            {
                $pos = getItemById($ad['pos'], "ad_pos", "bak2");
                if($pos == 1)
                {
                    $conf    = unserialize($ad['config']);
                    $subject = $_REQUEST["subject"];
                    $conf['subject']     = $subject;
                    $save['config']      = serialize($conf);
                    M("Ad")->where("id=".$id)->save($save);
                    sys_tips('', 'y');
                }
            }
        }
        sys_tips('非法操作', 'n');
    }
    
    //添加/编辑专题元素
    public function subject_save()
    {
        $id = $this->_get('id','intval');
        if($id > 0)
        {
            $ad = M("Ad")->find($id);
            if($ad)
            {
                $pos = getItemById($ad['pos'], "ad_pos", "bak2");
                if($pos == 1)
                {
                    $conf = unserialize($ad['config']);
                    $item = $_REQUEST["item"];
                    $iid  = $_REQUEST['iid'];
                    $conf['items'][$iid] = $item;
                    $save['config']      = serialize($conf);
                    M("Ad")->where("id=".$id)->save($save);
                    sys_tips('', 'y');
                }
            }
        }
        sys_tips('非法操作', 'n');
    }
    
    public function subject_upload()
    {
        sleep(2);
        $aid = $this->_get('id','intval');
        if($aid > 0)
        {
            $ad = M("Ad")->find($aid);
            if($ad)
            {
                $pos = getItemById($ad['pos'], "ad_pos", "bak2");
                if($pos == 1)
                {
                    $conf = array();
                    $path = 'data/event/'.$aid.'/images/';
                    $conf['temp'] = $path;
                    $conf['ext'] = array('jpg', 'jpeg', 'gif', 'png');
                    $rs = $this->_uploadImage($conf);
                    sys_tips(session('admin'), 'n', $rs);
                }
            }
        }
        sys_tips('非法操作', 'n');
    }
    
    //专题制作
    public function subject()
    {
        $id = $this->_get('pos','intval');
        if($id > 0)
        {
            $ad = M("Ad")->find($id);
            if($ad)
            {
                $pos = getItemById($ad['pos'], "ad_pos", "bak2");
                if($pos == 1)
                {
                    $conf = unserialize($ad['config']);
                    $this->assign('config',$conf);
                    $this->assign('ad',$ad);
                    $this->assign('sessionid',session_id());
                    $this->display();
                    exit;
                }
            }
        }
        redirect(U('admin/ad/index'));
    }
    
    //首页
    public function index()
    {
    	@import("ORG.Util.Page");
    	$model = M("Ad");
    	
    	$map = array();
        if(isset($_GET['pos']) && $_GET['pos'] > 0) $map['pos'] = $this->_get('pos','intval');
    	
        if(isset($_GET['key']) && $_GET['key'] != '广告标题') 
        {
            $key = $this->_get('key');
            $map['_string'] = 'title like "%'.$key.'%"';
        }
        
        
    	$total = $model->where($map)->count();
    	if($total > 0)
    	{
	    	$page = new Page($total,15);
	    	$list = $model->where($map)->order('id desc')->limit($page->firstRow.",".$page->listRows)->select();
			$this->assign("list",$list);
			$this->assign("page",$page->show());
    	}
        $this->display();
    }

    //添加/修改
	public function form()
	{
		$this->_create('Ad','id','upload');
		if(isset($_GET['id'])) $item = M("Ad")->find($_GET['id']);
		else $item = array('sort'=>'0');
		$cate=getItem("ad_pos");
		$this->assign("cate",$cate);
		$this->assign('item',$item);
		$this->display();
	}
    
    public function upload($id)
    {
        if($id > 0)
        {
            $pos = M("Ad")->field('pos')->find($id);
            if($pos) $pos = $pos['pos'];
            $cate = getItemById($pos,'ad_pos',false);
            if($cate['bak2'] >= 0 && $cate['bak2'] <= 1)
            {
                $conf = array();
                $path = dirname(getImage($id,'ad')).'/';
                $conf['temp'] = $path;
                $conf['ext'] = array('jpg','jpeg','gif','png');
                $conf['empty'] = true; //上传前清空目录
                if($cate['bak2'] == 1)
                {
                    $conf['path'] = $path;
                    $conf['thumb'] = array(
                        array('prefix'=>'small_','width'=>250,'height'=>100)
                    );
                }
                
                $rs = $this->_uploadImage($conf);
                if($rs['type'] == 1 && $rs['file']['savename'])
                {
                    $save['path'] = $rs['file']['savepath'].$rs['file']['savename'];
                    M("Ad")->where('id="'.$id.'"')->save($save);
                }
                return $rs;
            }
        }
    }
    
    public function gototype()
    {
        $pos = $this->_get('iid','intval');
        $item = getItemById($pos, "ad_pos",null);
        switch($item['bak1'])
        {
            default:
                redirect(U('admin/ad/index?pos='.$pos));
                break;
        }
    }
    
    //删除
    public function del() {
    	$model = M("Ad");
    	$id = intval($_GET['id']);
    	$res = $model->where("id=".$id)->delete();
    	if($res){
    		sys_info("删除成功",1);
    		redirect($_SERVER['HTTP_REFERER']);
    	}
    }
    
    //状态值改变
    public function bool()
    {
    	$this->_bool('Ad',array('status'));
    }
    
    //Ajax排序
    public function sort()
    {
    	$id = intval($_GET['id']);
		$val = intval($_GET['val']);
		$this->_sort('Ad',$id,$val);
    }
}
?>