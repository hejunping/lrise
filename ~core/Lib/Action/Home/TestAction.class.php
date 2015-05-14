<?php

class TestAction extends Action {

function test(){
	//echo 'hehe';
	$this->display();
}
    function index() {
        header("Content-type:text/html;charset=utf-8");
        $url = 'http://www.yoybuy.com/en/cateList.html';
        if (is_file('url.txt'))
            $file = file_get_contents('url.txt');
        else {
            $file = file_get_contents($url);
            file_put_contents('url.txt', $file);
        }
        
//        $id = array(137,287);
//        $items = M("Item")->where('pid in (137,287)')->select();
//        foreach ($items as $items) $id[] = $items['id'];
//        M("Item")->where(array('id'=>array('in',$id)))->delete();
//        exit;
        preg_match_all("/<li class=\"flname\" name=\"menu\">(.*?)<\/ul>.*?<\/li>/is", $file, $rs);
        $item = array('sort' => 0, 'status' => 1, 'ctime' => time(), 'bak2' => 1);
        foreach ($rs[1] as $one) {
            preg_match("/<a.*?>(.*?)<\/a>/is", $one, $rs2);
            $parent = $item;
            $parent['name'] = $rs2[1];
            $parent['pid'] = 3;
            //$pid = M("Item")->add($parent);
            preg_match_all("/<li><a href=\".*?_(\d+)\">\s+(.*?)\s+<\/a><\/li>/is", $one, $list, PREG_SET_ORDER);
            foreach ($list as $list) {
                $one = $item;
                $one['name'] = $list[2];
                $one['bak3'] = $list[1];
                $one['pid'] = $pid;
                //M("Item")->add($one);
            }
        }
        exit;
    }

}

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>
