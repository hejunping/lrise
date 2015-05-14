<?php 
class CommentAction extends AdminBaseAction {
	public function index() {
		@import("ORG.Util.Page");
    	$model = M("Comment");
		$map = array();

        if(isset($_GET['ename']) && $_GET['ename'] !="") $map['ename'] = $this->_get('ename');
		
        if($_GET['status'] == '0' || $_GET['status'] == '1')  $map['status'] = $this->_get('status','intval');
        
        if(isset($_GET['reg_start']) || isset($_GET['reg_end']))
        {
            if(isset ($_GET['reg_start']) && preg_match('/^\d+[-\/]/', $_GET['reg_start']))
            {
                $day = $this->_get('reg_start','strtotime');
                $map['time_reg'][] = array('gt',$day);
            }
            if(isset ($_GET['reg_end']) && preg_match('/^\d+[-\/]/', $_GET['reg_end'])) 
            {
                $day = $this->_get('reg_end','strtotime') + 24 * 3600;
                $map['time_reg'][] = array('lt',$day);
            }
        }
        if(isset($_GET['key']) && $_GET['key'] != '用户ID/用户昵称') 
        {
            $key = $this->_get('key');
            if(is_numeric($key)) $map['uid'] = abs(intval($key));
            else $map['_string'] = 'nickname like "%'.$key.'%"';
        }
        
    	$total = $model->where($map)->count();
    	
    	if($total > 0)
    	{
	    	$page = new Page($total,20);
	    	$list = $model->order('id desc')->where($map)->limit($page->firstRow.",".$page->listRows)->select();
			$this->assign("list",$list);
			$this->assign("page",$page->show());
    	}
    	
        $this->display();
	}
	
	//状态值改变
	public function bool()
	{
		$this->_bool('Comment',array('status'));
	}
	
	//删除
    public function del() {
    	$model = M("Comment");
    	$id = intval($_GET['id']);
    	$res = $model->where("id=".$id)->delete();
    	if($res){
    		sys_info("删除成功",1);
    		redirect($_SERVER['HTTP_REFERER']);
    	}
    }
}
?>