<?php

/**
 * 地区分类
 */
class AreacateWidget extends Widget {

    public function render($data) {
        if (!empty($_GET['cid'])) {
            $id = $_GET['cid'];
        } elseif (!empty($_GET['ecid'])) {
            $id = $_GET['ecid'];
//           $rs = M('item')->where('ecid='.$id)->find();
        } else {
            $id = '146';
        }
        $rs = M('Item')->where('id=' . $id)->find();

        $re = M('Item')->where('pid=' . $id)->select();
        if (!empty($rs['bak1'])) {
            $map = array();
            $map['status'] = 1;
            $map['id'] = array('in',$rs['bak1']);
            $data['res'] = M('Info')->where($map)->select();
        }
        $data['iclass'] = getItem('prod', $data['num']);
        $data['re'] = $re;
        $data['rs'] = $rs;
        //测试翻译
        transLangs($data['iclass']);
        transLangs($data['re']);
        $data['rs']['name'] = transVar($data['rs']['name']);
        //测试
        //dump($data);
        //dump($res);
        //dump($data['iclass']);
        //echo M('item')->getLastSql();
        return $this->renderFile($data['tpl'], $data);
    }

}