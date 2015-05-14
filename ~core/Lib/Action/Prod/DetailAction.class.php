<?php
class DetailAction extends Action 
{
    public function index()
    {
        $pid = $this->_get('id','intval');
    	$res = M('Prod')->field('iid')->where(array('id'=>$pid,'status'=>1))->find();
        if($pid > 0 && $res)
        {
            redirect(U('prod/'.$res['iid'].'/index'));
            
//             if($res['vars']) $this->assign('vars',  explode("\r\n", $res['vars']));
//             if($res['attribute'])
//             {
//                 $attr = explode("\r\n",$res['attribute']);
//                 $attrs = array();
//                 foreach($attr as $k=>$attr)
//                 {
//                     $one = explode(":",$attr);
//                     $attrs[$k]['name'] = $one[0];
//                     $attrs[$k]['list'] = explode(',',$one[1]);
//                 }
//                 $this->assign('attrs',$attrs);
//             }
//             if(!$res['ename']) $this->assign('trans',1);
           
//             $address_3 = $res['name'];
//             $addresss1 = M('Item')->where('id='.$res['ctype2'])->find();
//             $addresss2 = M('Item')->where('id='.$res['ctype'])->find();
//             $address_1['name'] = $addresss1['name'];
//             $address_1['cid']  = $addresss1['id'];
//             $address_2['name'] = $addresss2['name'];
//             $this->assign('address_3',$address_3);
//             $this->assign('address_1',$address_1);
//             $this->assign('address_2',$address_2);
//             $this->assign('res',$res);
            
//             $this->display();
        }
        
    }
    
    public function notfind()
    {
    	$this->display();
    }
}
?>
