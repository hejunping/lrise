<?php
class  ProdViewModel extends ViewModel
{
	public $viewFields = array(
        'Prod'=>array('name','pic','_type'=>'LEFT'),
        'ProdInfo'=>array('*','_on'=>'Prod.id=ProdInfo.pid'),
    );
}