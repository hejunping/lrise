<?php
/**
 * 用户收藏 viewmodel
 */
class ProdStoreViewModel extends ViewModel{
	public $viewFields = array(
		'ProdStore'=>array('uid','ctime'=>'stime','_type'=>'LEFT'),
		'Prod'=>array('id','name','subname','pic','ctype','status','sku','sold','market','price','store_count','_on'=>'ProdStore.pid=Prod.id'),	
	);
}