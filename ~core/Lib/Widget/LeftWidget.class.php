<?php

/*
 *  
 */

class LeftWidget extends Widget {

    public function render($data) {
        $model = M('Info');
        $res1 = $model->where('pid=331')->select();
        $res2 = $model->where('pid=332')->select();
        $res3 = $model->where('pid=333')->select();
        $data['res1'] = $res1;
        $data['res2'] = $res2;
        $data['res3'] = $res3;
        //dump($data);die();
        transLangs($data['res1'],'left');
        transLangs($data['res2'],'left');
        transLangs($data['res3'],'left');
        return $this->renderFile($data['tpl'], $data);
    }

}

?>