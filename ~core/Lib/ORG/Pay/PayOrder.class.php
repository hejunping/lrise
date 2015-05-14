<?php
class PayOrder
{
	static function encome($uid,$money,$reason='')
	{
		if($money >0)
		{
			$user = M('User')->find($uid);
			if($user)
			{
				$rmb = getCredit($uid);
				$op = getOption('account');
				$paibi = $money * floatval($op['coin']);
				if(M("UserCredit")->where('uid = "'.$uid.'"')->setInc('coin',$paibi))
                {
                    if(IS_LOGIN && getUserInfo('id',false) == $uid) 
                    {
                        //updateUserInfo ($key, $value);
                    }
                    ulog ($uid, 'pay_encome', '充值', $money, $reason);
                    return true;
                }
			}
		}
		return false;
	}
    
    static function outcome($uid,$money,$reason='')
    {
        if($money >0)
		{
			$user = M('User')->find($uid);
			if($user)
			{
				$rmb = getCredit($uid);
				if($rmb['coin'] >= $money  && M("UserCredit")->where('uid = "'.$uid.'"')->setDec('coin',$money)) 
                {
                    if(IS_LOGIN && getUserInfo('id',false) == $uid)
                    {
                        //updateUserInfo ($key, $value);
                    }
                    ulog ($uid, 'pay_out', '消费',  $money, $reason);
                    return true;
                }
			}
		}
		return false;
    }
}
?>