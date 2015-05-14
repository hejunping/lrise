<?php
/**
 * 支付成功后的回调和跳转模块
 */
class PayAction extends FrontAction{
	public function index(){
		//接收值
		//$info = Session::get('pay_result');
		$info = session('pay_result');
		if($info){
			//设置头编码
			$this->_error($info);
		}else{
			header('Location:./');
		}
	}
	
	//跳转操作
	public function response(){
		$class_name = $_REQUEST['method'];
		$payment = M('Pay')->where("class_name='$class_name'")->find();
		if($payment){//接口存在
			$name = $class_name.'_payment';
			$file = APP_PATH.'/Lib/ORG/Pay/'.$name.'.php';
			require_once($file);
			$class = new $name();
			$code = $class->response($_REQUEST);
			if($code['status']){//充值成功
				if($code['info']['is_deal']) $this->bussiess($code);
				session('pay_result','Replenishing success, such as the discovery of account money not to account, may be due to the presence of delay caused by net silver ');
				redirect(U('home/pay/index'));
			}else{//充值失败
				session('pay_result',$code['info']);
				redirect(U('home/pay/index'));
			}
		}else{
			exit('To return to the page does not exist');
		}
	}
	
	//支付成功 回调操作
	public function notify(){
		$class_name = $_REQUEST['method'];
		$payment = M('PayOrder')->where("class_name='$class_name'")->find();
		if($payment){//接口存在
			$name = $class_name.'_payment';
			$file = APP_PATH.'/Lib/ORG/Pay/'.$name.'.php';
			require_once($file);
			$class = new $name();
			$code = $class->notify($_REQUEST);
			$this->bussiess($code);
		}
	}
	
	//业务处理
	protected function bussiess($code){
		if($code['status']){
			$map = array();
			$map['no'] = $code['no'];
			$map['status'] = 0;
			$map['ctype'] = 0;
			$order = M('PayOrder')->where($map)->find();
			if($order)
            {
				$data['status'] = 1;
				$data['utime'] = time();
				$data['mark'] = '充值成功';
				M('PayOrder')->where($map)->save($data);//修改订单状态
				//支付成功后，修改用户的货币和积分(user_credit)
				$uid = $order['uid'];
				$money = intval(M('PayOrder')->where($map)->getField('money'));
				//根据设置的兑换比例获得用户的拍币 和积分
				$opt = getOption('account');
                coin($uid, $money, '在线充值', $code['no']);
				if($money > $opt['lowest']) point($uid, ceil($money * floatval($opt['point'])), '充值赠送', $code['no']);
			}
		}		
	}
}
?>