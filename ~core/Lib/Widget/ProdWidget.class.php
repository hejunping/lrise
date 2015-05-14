<?php

//

class ProdWidget extends Widget {

    public function render($data) {
//        $map = array();
//        if (!empty($_GET['cid'])) {
//            $id = $_GET['cid'];
//            $res = M('prod')->where('ctype2=' . $id)->select();
//            $map['ctype2'] = $id;
//        } elseif (!empty($_GET['ecid'])) {
//            $id = $_GET['ecid'];
//            $res = M('prod')->where('ctype=' . $id)->select();
//            $map['ctype'] = $id;
//        } else {
//            $id = '146';
//            $res = M('prod')->where('ctype2=' . $id)->select();
//            $map['ctype2'] = $id;
//        }
//
//        import("ORG.Util.Page");
//        $count = M('prod')->where($map)->count();
//        dump($count);
//        $Page = new Page($count, 20);
//        $Page->setConfig('prev', '&lt;&lt;previous');
//        $Page->setConfig('next', 'Next&gt;&gt');
//        $Page->setConfig('theme', '%upPage%  %linkPage% %downPage% ');
//        //$map['status'] = 1 ;
//        $list = M('prod')->where($map)->limit($Page->firstRow . ',' . $Page->listRows)->select();
//        //$list = M('prod')->where('status=1')->page($_GET['p'].',20')->select();
//        //$Page = new Page($count, 20);
//        //dump($res);
//        //dump($list);
//        echo M('prod')->getLastSql();
//        $show = $Page->show();
//        $data['page'] = $show;
//        $data['list'] = $list;
//        $data['res'] = $res;
//        $data['count'] = $count;
//        //echo M('prod')->getLastSql();
//        $data['search'] = $search;
//        return $this->renderFile($data['tpl'], $data);
    }

}

