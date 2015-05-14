<?php
class SfavoriteProdViewModel extends ViewModel{
	public $viewFields = array(
        'Prod'=>array('name','pic','price','shopname','recommend'),
        'Sfavorite'=>array('id','pid','uid','ctime','_on'=>'Prod.id=Sfavorite.pid'),
    );
}