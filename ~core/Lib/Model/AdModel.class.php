<?php
import("Think.core.Model.AdvModel");
class AdModel extends AdvModel 
{
    //填充设置
    protected $_auto = array(
        array("status", 1, 1),
        array("inst", "time", 1, "function"),
        array("start", "0", 1),
        array("end", "0", 1),
        array("updt", 0, 1),
        array("status", 1, 1),
        array("updt", "time", 2, "function"),
    );
}