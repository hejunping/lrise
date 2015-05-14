<?php
/**
 * 网站底部foot
 */
class EndWidget extends Widget{
	public function render($data){
		$res = M('Info')->where('pid=328')->select();
        $data['res'] = $res;    
        //dump(count($res));
        //dump($data);
        transLangs($data['res'],'end');
		return $this->renderFile('foot',$data);	
	}
}