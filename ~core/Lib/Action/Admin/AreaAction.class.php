<?php
/**
 * @name 地区管理
 * @author birdy
 * @date 2012-3-15
 * @version 1.0
 */
class AreaAction extends AdminBaseAction
{
    //首页
    public function index()
    {
        $M = M("Area");
        if(isset($_GET['pid'])) $pid = $_GET['pid'];
        else	$pid = 0;
        $data = $M->where("pid='$pid'")->order("sort desc")->select();
        $this->assign("data",$data);
        $this->display();
    }

    //添加
    public function add()
	{
		$M = M("Area");
		if(strtolower($_SERVER['REQUEST_METHOD'])!='post'){
			$this->assign("thispid",$_GET["pid"]);
			$this->display();
		}
		else if($M->create())
		{
			if($M->add())  
			{
				$this->updateAreaCache();
				$this->redirect("admin/area/index",array("pid"=>$_POST["pid"]));
			}
			else $this->error("地区添加失败");
		}
		else $this->error($M->getError());
	}

	//编辑地区
	public function edit()
	{
		$M = M("Area");
		if(strtolower($_SERVER['REQUEST_METHOD'])!='post')
		{
			$data = $M->where("area_id='{$_GET['id']}'")->find();
			$this->assign("area",$data);
			$this->display("add");
		}
		else if($M->create())
		{
			if($M->save()) 
			{
				$this->updateAreaCache();
				$this->redirect("admin/area/index",array("pid"=>$_POST["pid"]));
			}
			else $this->error("编辑地区失败".$M->getDbError());
		}
		else $this->error($M->getError());
	}

    //删除
    public function del()
    {
        $M = M("Area");
        $_POST['id']	= explode(',',$_POST['id']);
        if(empty($_POST['id'])) echo 0;
        else
        {
        	$where['area_id']	= array('in', $_POST['id']);
        	if($M->where($where)->delete())
        	{
        		$this->updateAreaCache();
        		$map['pid'] = array('in',$_POST['id']);
        		$M->where($map)->delete();
        		echo 1;
        	}
        	else echo 0;
        }
    }

    //公用方法
    protected function updateAreaCache()
    {
        $area = M('Area')->order('id asc')->select();
        F("_area/area",$area);
    }
}
?>