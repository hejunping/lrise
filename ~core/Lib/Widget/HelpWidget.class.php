<?php
/*
 *  
 */
class HelpWidget extends Widget{
	public function render($data){
       
        
       $cache1='_Help/'.md5('Help');//加缓存
      
       //dump($cache1);
       $cache=S($cache1);
       if(!$data['list']){    
        
     
	       $res=M('Item');
	       $map1=array('status'=>1,'pid'=>5);
	       $list=$res->where($map1)->field("id,name")->order("id asc")->limit("1,7")->select();
	        $data['list']=$list;
	        if($data['res'])S($cache,$data['res'],300);
       }
       $i=0;
        foreach($list  as $vo){
      	         $id[$i]=$vo['id'];
      	                $i++;
        }
                  
     
         $model = M('Info');
         $map = array('status' =>1,pid=>array('in',$id));
         $result = $model->where($map)->field("id,name,pid")->select();  
         $data['res'] =$result;
        
         //测试 
         //dump($data);
         //翻译
         transLangs($data['list'],'help');
         transLangs($data['res'],'help');
         return $this->renderFile('index',$data);
	    }
	
	 }  

?>