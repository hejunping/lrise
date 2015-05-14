<?php

class UserAction extends FrontAction {

    public function index() {
        $model = M('Info');
        $res1 = $model->where('pid=331')->select();
        //dump($res1);

        $this->display();
    }

}

?>