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
		$("#names").html("Введите правильное имя!");
		return ;
	}
	
	var Account=document.getElementsByName("Account")[0].value;
	if(Account==null || Account==""){
		$("#Accounts").html("Введеная сумма неправильная!");
		return ;
	}
		
	var Amount=document.getElementsByName("Amount")[0].value;
	if(Amount==null || Amount=="" || isNaN(Amount)){
		$("#Amounts").html("Введеная сумма неправильная!");
		return ;
	}
	var coin=document.getElementsByName("coin")[0].value;
	var huil=document.getElementsByName("huil")[0].value;
	if(coin<huil*Amount){
		alert("Сумма вывода не может превышать баланс!");
		return ;
	}
		document.qu.submit();
}