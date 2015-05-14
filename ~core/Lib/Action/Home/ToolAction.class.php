<?php
class ToolAction extends FrontAction 
{
    public function index()
    {
        $this->display();
    }
    
    public function costestimation()
    {
        $this->display();
    }
    
    public function getfreightestimate()
    {
        $url = 'http://www.yoybuy.com/en/getfreightestimate?countryId='.$this->_get('countryId').'&goodsWeight='.$this->_get('goodsWeight');
        echo file_get_contents($url);
    }
    
    public function getdetail()
    {
        $array = array('fireghtType','countryId','goodsCost','weight');
        foreach($array as $array) $rs[] = $array.'='.$this->_post($array);
        $url = "http://www.yoybuy.com/en/getdetail?".  implode("&", $rs);
        echo file_get_contents($url);
    }
}
?>