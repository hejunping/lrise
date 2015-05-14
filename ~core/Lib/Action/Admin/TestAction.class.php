<?php

/*
 * 图片上传例子
 * @author birdy
 */
class TestAction  extends AdminBaseAction
{
    public function index()
    {
        $this->display();
    }
    
    //文件处理
    public function deal()
    {
        $type = $this->_post('ctype');
        if(method_exists($this, $type)) 
        {
            $rs = $this->$type();
            sys_debug($rs);
        }
    }
   
    //普通文件上传，限制类型，大小
    protected function common()
    {
        $conf = array();
        $conf['maxsize'] = 5 * 1024 * 1024;                         //限制文件大小
        $conf['ext']     = array('doc','txt','rar','zip','jpg');    //限制文件类型
        $conf['temp']    = 'data/upload/file/';                     //设置存储路径
        return $this->_upload($conf);
    }

    //普通文件上传，按时间存储
    protected function rename()
    {
        $conf = array();
        $conf['maxsize'] = 5 * 1024 * 1024;                         //限制文件大小
        $conf['ext']     = array('doc','txt','rar','zip','jpg');    //限制文件类型
        $conf['temp']    = 'data/upload/'.date("y/m/d/");           //设置存储路径
        return $this->_upload($conf);
    }
    
    //保存到临时文件夹
    protected function temp()
    {
        $conf = array();
        $conf['maxsize'] = 5 * 1024 * 1024;                         //限制文件大小
        $conf['ext']     = array('doc','txt','rar','zip','jpg');    //限制文件类型
        return $this->_upload($conf);
    }
    
    //图片上传，并生成缩略图，保留原图
    protected function thumb()
    {
        $path = 'data/upload/images/'.date("Y/m/d/");
        $conf = array();
        $conf['maxsize'] = 5 * 1024 * 1024;                    //限制文件大小
        $conf['ext']     = array('jpg','gif','png','jpeg');    //限制文件类型
        $conf['temp']    = $path;                              //存储路径
        $conf['path']    = $path;                              //缩略图存储路径
        $conf['thumb']   = array(
            array('prefix'=>'big_','width'=>600,'height'=>600),
            array('prefix'=>'middle_','width'=>200,'height'=>200),
            array('prefix'=>'smll_','width'=>200,'height'=>200),
        );
        return $this->_upload($conf);
    }
    
    //图片上传，并生成缩略图，删除原图
    protected function thumb_del()
    {
        $path = 'data/upload/images/'.date("Y/m/d/");
        $conf = array();
        $conf['maxsize'] = 5 * 1024 * 1024;                    //限制文件大小
        $conf['ext']     = array('jpg','gif','png','jpeg');    //限制文件类型
        $conf['path']    = $path;                              //缩略图存储路径
        $conf['remove']  = true;                               //删除原图
        $conf['thumb']   = array(
            array('prefix'=>'big_','width'=>600,'height'=>600),
            array('prefix'=>'middle_','width'=>200,'height'=>200),
            array('prefix'=>'smll_','width'=>200,'height'=>200)
        );
        return $this->_upload($conf);
    }
    
    //图片上传，并生成缩略图，固定命名，删除原图
    protected function thumb_fixname()
    {
        $path = 'data/face/1/';
        $conf = array();
        $conf['maxsize'] = 5 * 1024 * 1024;                    //限制文件大小
        $conf['ext']     = array('jpg','gif','png','jpeg');    //限制文件类型
        $conf['path']    = $path;                              //缩略图存储路径
        $conf['remove']  = true;                               //删除原图
        $conf['thumb']   = array(
            array('name'=>'big.jpg','width'=>200,'height'=>200),
            array('name'=>'middle.jpg','width'=>150,'height'=>150),
            array('name'=>'small.jpg','width'=>100,'height'=>100)
        );
        return $this->_upload($conf);
    }
    
    //多文件上传
    protected function mul()
    {
        $path = 'data/upload/images/'.date("Y/m/d/");
        $conf = array();
        $conf['maxsize'] = 5 * 1024 * 1024;                         //限制文件大小
        $conf['ext']     = array('doc','txt','rar','zip','jpg');    //限制文件类型
        $conf['temp']    = $path;                                   //设置存储路径
        $conf['mul']     = true;                                    //多文件上传
        return $this->_upload($conf);
    }
    
    //多图片上传，并生成缩略图
    protected function mulimage()
    {
        $path = 'data/upload/images/'.date("Y/m/d/");
        $conf = array();
        $conf['maxsize'] = 5 * 1024 * 1024;                         //限制文件大小
        $conf['ext']     = array('jpg');                            //限制文件类型
        $conf['temp']    = $path;                                   //设置存储路径
        $conf['path']    = $path;                                   //缩略图存储路径
        $conf['mul']     = true;                                    //多文件上传
        $conf['thumb']   = array(
            array('prefix'=>'thumb_','width'=>200,'height'=>200)
        );
        return $this->_upload($conf);
    }
}
?>
