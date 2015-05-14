<?php
import("Think.Core.Model.AdvModel");
class BidModel extends AdvModel{
	  //填充设置
    protected $_auto = array(
        array("ctime", "time", 3, "function"),
    );
}