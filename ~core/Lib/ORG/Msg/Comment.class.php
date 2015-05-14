<?php
class Comment{
	/**
	 * 获取用户评论，添加到（pai_comment）
	 * $model 实例化评论表模型
	 * $ename 评论对象类型
	 * $enrow 所有评论对象数组（安全过滤）
	 */
	public function Comment($model,$data,$ename,$enrow){
    	//判断用户是否登录
    	if(IS_LOGIN){
    		if(in_array($ename,$enrow))
    		{
	    		$res = preg_match('/^[\s]{0,}$/',$data['content'],$rs);
	    		if(!$res){//评论不能为空
	    			$aa=$model->add($data);
	    			ulog($data['uid'],'comment','',$ename,$data['oid']);//添加评论日志
	    			return $aa;
	    		}else{
	    			return false;
	    		}
    		}
    	}else{
    		return false;
    	}
    }
    
    
    /**
     * 读取用户评论内容并分页
     * $model 实例化表模型
     * $map   查询条件
     * $order 排序方式
     * $row   页面显示记录的条数
     * 返回评论内容
     */
    public function comlist($model,$map,$order='id desc',$row){
    	
   	 //查找歌曲评论表中的内容并显示出来(分页)
    	@import("ORG.Util.Page");
    	$count = $model->where($map)->count();
    	if($count> 0){
    		$page = new Page($count,1);
			$page->setConfig('theme',"%upPage% %linkPage% %downPage%"  );
    		$list = $model->where($map)->order($order)->limit($page->firstRow.','.$page->listRows)->select();
			$comment['count'] = $count;
			$comment['list'] = $list;
			$comment['page'] = $page->show();
			return $comment;
    	}else{
    		return false;
    	}
    }
}
?>