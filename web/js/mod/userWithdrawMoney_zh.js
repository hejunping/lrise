 var isno=false;
function setTab(name, cursel, n ,type) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        
    }
   var input=top.document.getElementsByName("types");
    input[0].value=type;
   
}

function thissub(){
	var name=document.getElementsByName("name")[0].value;
	if(name==null || name==""){
		$("#names").html("请输入正确的姓名!");
		return ;
	}
	
	var Account=document.getElementsByName("Account")[0].value;
	if(Account==null || Account==""){
		$("#Accounts").html("请输入正确的金额!");
		return ;
	}
		
	var Amount=document.getElementsByName("Amount")[0].value;
	if(Amount==null || Amount=="" || isNaN(Amount)){
		$("#Amounts").html(" 金额不能为空，且为数值!");
		return ;
	}
	var coin=document.getElementsByName("coin")[0].value;
	var huil=document.getElementsByName("huil")[0].value;
	if(coin<huil*Amount){
		alert("退款金额不得大于余额!");
		return ;
	}
		document.qu.submit();
}