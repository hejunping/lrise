<?php

/**
 * @name 资讯管理
 * @author birdy
 * @date 2012-3-15
 * @version 1.0
 */
class InfoAction extends AdminBaseAction {

//资讯首页
    public function index() {
        @import("ORG.Util.Page");
        $model = M("Info");

        $map = array();
        if (isset($_GET['pid']) && $_GET['pid'] > 0)
            $map['pid'] = $this->_get('pid', 'intval');
        if ($_GET['status'] == '0' || $_GET['status'] == '1')
            $map['status'] = $this->_get('status', 'intval');

        if (isset($_GET['key']) && $_GET['key'] != '资讯名称') {
            $key = $this->_get('key');
            $map['_string'] = 'name like "%' . $key . '%"';
        }


        $total = $model->where($map)->count();

        if ($total > 0) {
            $page = new Page($total, 15);
            $list = $model->where($map)->order('id desc')->limit($page->firstRow . "," . $page->listRows)->select();
            $this->assign("list", $list);
            $this->assign("page", $page->show());
        }

        $this->display();
    }

    //添加/修改
    public function form() {
        $this->_create('Info');
        if (isset($_GET['id'])) {
            $item = M('Info')->find($_GET['id']);
        }
        $pre = C('C_PREFIX');
        get_base(&$item,$pre);
        
        //dumpf($item);exit;
        $this->assign('item', $item);
        $this->display();
    }
    
    

    //删除
    public function del() {
        $model = M("Info");
        $id = intval($_GET['id']);
        $res = $model->where("id=" . $id)->delete();
        if ($res) {
            sys_info("删除成功", 1);
            redirect($_SERVER['HTTP_REFERER']);
        }
    }

    //状态值改变
    public function bool() {
        $this->_bool('Info', array('status', 'top','hot'));
    }

    //Ajax排序
    public function sort() {
        $id = intval($_GET['id']);
        $val = intval($_GET['val']);
        $this->_sort('Info', $id, $val);
    }

}

?>
