<?php

class CateAction extends FrontAction {

    public function index() {
        $list = getItem('Prod');
        $a = 0;
        $map = array();
        foreach ($list as $k => $res) {
            if (is_string($k)) {
                unset($list[$k]);
            }
            $a++;
        }
        
        $data = array();
        $a = 1 ;
        foreach ($list as $key => $val) {

            $data[$a] = $val;
            $data[$a]['bak3'] =  M('Item')->where('pid=' . $val['id'])->select();
            $a++;
        }
        //dump($data);
 		transLangs($data,'areacate','bak3');
        $this->assign("_title","Product Categories");
        $this->assign('data',$data);
        $this->display();
    }

}

