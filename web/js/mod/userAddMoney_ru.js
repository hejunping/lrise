
//tab recharge way
function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}

//PAYPAL start

function Fee(){
   
    var PayPalAccount = $("#PayPalAccount").val();
    if(PayPalAccount>0){
        var Amount = Number(PayPalAccount);//银行转账金额
        var cAmount=PayPalAccount*paypal_fee+Number(PaypalSurcharge);//总金额手续费USD
        $("#Amount").val(FormatNum(Amount,2));
        $("#AmountReceived").text(FormatNum((Amount-cAmount),2));
        $("#AmountReceived").append(" USD");
        var TempAmount=(PayPalAccount-cAmount)*USDRate;
        $("#TempAmount").val(FormatNum(TempAmount,2));
    }else{
        $("#Amount").val("0.00");
        $("#AmountReceived").text("0.00");
        $("#AmountReceived").append(" USD");
        $("#TempAmount").val("0.00");
    };

};
$(document).ready(function () {

    $("#PayPalAccount1_0").click(function () {
        $("#OtherPayPalAccount").attr("disabled", true);
        FunPayPalAccountPayPal($(this).val());
        Fee();
    });
    $("#PayPalAccount1_1").click(function () {
        $("#OtherPayPalAccount").attr("disabled", true);
        FunPayPalAccountPayPal($(this).val());
        Fee();
    });
    $("#PayPalAccount1_2").click(function () {
        $("#OtherPayPalAccount").attr("disabled", true);
        FunPayPalAccountPayPal($(this).val());
        Fee();
    });
    $("#PayPalAccount1_3").click(function () {
        $("#OtherPayPalAccount").attr("disabled", true);
        FunPayPalAccountPayPal($(this).val());
        Fee();
    });
    $("#PayPalAccount1_4").click(function () {
        $("#OtherPayPalAccount").attr("disabled", true);
        FunPayPalAccountPayPal($(this).val());
        Fee();
    });
    $("#PayPalAccount1_5").click(function () {
        $("#OtherPayPalAccount").attr("disabled", true);
        FunPayPalAccountPayPal($(this).val());
        Fee();
    });
    $("#PayPalAccount1_6").click(function () {
        $("#OtherPayPalAccount").removeAttr("disabled");
        FunPayPalAccountPayPal($("#OtherPayPalAccount").val());
        $("#OtherPayPalAccount").focus();
        Fee();
    });
    $("#OtherPayPalAccount").keyup(function () {
        $(this).val($(this).val().replace(/[^\d\.]/g, ''));
        $("#PayPalAccount").val($(this).val());
        Fee();
    });
    $("#OtherPayPalAccount").blur(function () {
        CheckUp();
        $("#PayPalAccount").val($(this).val());
    });
});
function FunPayPalAccountPayPal(v) {        
    $("#PayPalAccount").val(v);
};
function CheckUp() {
    if (isNaN($("#OtherPayPalAccount").val())) {
        alert("Пожалуйста, введите цифры !");
        $("#OtherPayPalAccount").select();
        return;
    };        
};


function JsSubmit() {
        
    if ($("input:[name=PayPalAccount1]:radio:checked").length == 0){
        alert("Пожалуйста, выберите в счет оплаты .");
        return false;
    }else{
        var PayPalAccount1 = $("input:[name=PayPalAccount1]:radio:checked").val();            
        if (PayPalAccount1 == 'other') {
            if ($.trim($("#OtherPayPalAccount").val()) == "") {
                alert("Пожалуйста, введите ваш подпитки суммы!");
                $("#OtherPayPalAccount").select();
                return false;
            }else if($("#OtherPayPalAccount").val() < 1){
                alert('сумма не менее "1"!');
                $("#OtherPayPalAccount").select();
                return false;
            };
        };
    };
    CheckUp();
    document.formpay.submit();
};
function JsReset() {
    $("#OtherPayPalAccount").attr("disabled", true);
    document.formpay.reset();
};


var WUCheckResults=false;
$(document).ready(function() {
    $("#WUAmount").keyup(function() {
        $(this).val($(this).val().replace(/[^\d.]/g,"").replace(/^\./g,"").replace(/\.{2,}/g,"").replace(".","$#$").replace(/\./g,"").replace("$#$","."));
    });
    $("#WUAmount").blur(function(){
        if($.trim($(this).val())!="" && !isNaN($(this).val()) && $(this).val()>=1){
            WUCheckResults=true;
            $("#WUAmountValidation").text("√");
     
        }else{
            WUCheckResults=false;
            $("#WUAmountValidation").text("Вы ввели неверный суммы ");
        };
    });
   
        

});
function WUCheck(){
    if( $.trim($("#WUAmountValidation").text())=="√" ){
        WUCheckResults=true;
    }else{
        WUCheckResults=false;
    };
};
function WUsubInfo() { 
    WUCheck();
    if(!WUCheckResults)
    {
        alert("Пожалуйста, проверьте и введите эффективной информации.");
        return;
    }else{
    	document.WUform.submit();
    }

};
function WUformReset() {
    $("#WUAmountValidation").text("*");
    WUResetSubmitBtn();  
    $("#WUresetButton").click();
    $("#WUAmount").focus();
};
function WUResetSubmitBtn() {
    $("#WUSpanSubmit").html("<a title='submit' id='WUsubmit' href='javascript:void('submit');' onclick='WUsubInfo();'  ><img height='29' width='81' border='0' src='../../Content/images/an_tj_05.gif'></a>");
}

//Western union 结束

//WesternUnionQuickPay 开始

$(document).ready(function () {

    $("#WUQPAccount1_1").click(function () {
        $("#OtherWUQPAccount").attr("disabled", true);
        FunPayPalAccount($(this).val());
    });
    $("#WUQPAccount1_2").click(function () {
        $("#OtherWUQPAccount").attr("disabled", true);
        FunPayPalAccount($(this).val());
    });
    $("#WUQPAccount1_3").click(function () {
        $("#OtherWUQPAccount").attr("disabled", true);
        FunPayPalAccount($(this).val());
    });
    $("#WUQPAccount1_4").click(function () {
        $("#OtherWUQPAccount").attr("disabled", true);
        FunPayPalAccount($(this).val());
    });
    $("#WUQPAccount1_5").click(function () {
        $("#OtherWUQPAccount").attr("disabled", true);
        FunPayPalAccount($(this).val());
    });
    $("#WUQPAccount1_6").click(function () {
        $("#OtherWUQPAccount").attr("disabled", true);
        FunPayPalAccount($(this).val());
    });
    $("#WUQPAccount1_7").click(function () {
        $("#OtherWUQPAccount").removeAttr("disabled");
        FunPayPalAccount($("#OtherPayPalAccount").val());
        $("#OtherWUQPAccount").focus();
    });
    $("#OtherWUQPAccount").keyup(function () {
        $(this).val($(this).val().replace(/[^\d\.]/g, ''));
        $("#pricingAmount").val($(this).val());
    //alert("keyup");
    });
    $("#OtherWUQPAccount").blur(function () {
        CheckUpWUQP();
        $("#pricingAmount").val($(this).val());
    });
});
function FunPayPalAccount(v) {
    $("#pricingAmount").val(v);
};
function CheckUpWUQP() {
    if (isNaN($("#OtherWUQPAccount").val())) {
        alert("Пожалуйста, введите цифры !");
        $("#OtherWUQPAccount").select();
        return;
    };
};
function JsSubmitWUQP() {

    if ($("input:[name=WUQPAccount1]:radio:checked").length == 0) {
        alert("Пожалуйста, выберите счёт платежей .");
        return false;
    } else {
        var WUQPAccount1 = $("input:[name=WUQPAccount1]:radio:checked").val();
        if (WUQPAccount1 == 'other') {
            if ($.trim($("#OtherWUQPAccount").val()) == "") {
                alert("请输入您的充值数额!");
                $("#OtherWUQPAccount").select();
                return false;
            } else if ($("#OtherWUQPAccount").val() < 1) {
                alert('Amount not less than "1"!');
                $("#OtherWUQPAccount").select();
                return false;
            };
        };
    };
    CheckUpWUQP();
    document.WUQPform.submit();
};
function JsResetWUQP() {
    $("#OtherWUQPAccount").attr("disabled", true);
    document.WUQPform.reset();
};
//WesternUnionQuickPay 结束

//WebMoney 开始

var WMCheckResults=false;
$(document).ready(function() {
    $("#WMAmount").keyup(function() {
        $(this).val(FormatNum($(this).val().replace(/[^\d.]/g,"").replace(/^\./g,"").replace(/\.{2,}/g,".").replace(".","$#$").replace(/\./g,"").replace("$#$","."),2));
   
    });
    $("#WMAmount").blur(function(){            
        if($.trim($(this).val())!="" && !isNaN($(this).val()) && $(this).val()>=1){                
            WMCheckResults=true;                
            $("#WMAmountValidation").text("√");
        }else{
            WMCheckResults=false;
            $("#WMAmountValidation").text("Вы ввели неверный суммы");
        };
    });        
    $("#WMPayerPurse").blur(function(){
        if($.trim($(this).val())!="" && CheckENorNumber($.trim($(this).val()))){
            WMCheckResults=true;
            $("#WMPayerPurseValidation").text("√");
        }else{
            WMCheckResults=false;                
            $("#WMPayerPurseValidation").text("Вы ввели неверный цифровой");                
        };
    });        
    $("#WMPayerName").blur(function(){
        if($.trim($(this).val())!="" && CheckENorSpaces($.trim($(this).val()))){
            WMCheckResults=true;                
            $("#WMPayerNameValidation").text("√");
        }else{
            WMCheckResults=false;
            $("#WMPayerNameValidation").text("Пожалуйста, введите правильное имя");                
        };
    });
    $("#WMDateOfPayment").change(function(){
        $("#WMDateOfPaymentValidation").text("√");
    });
        
});
    
function WMCheck(){
    if( $.trim($("#WMAmountValidation").text())!="√" || $("#WMPayerPurseValidation").text()!="√" || $.trim($("#WMPayerNameValidation").text())!="√" || $.trim($("#WMDateOfPaymentValidation").text())!="√" ){
        WMCheckResults=false;
    };
};
function WMsubInfo() {        
    WMCheck();
    if(!WMCheckResults)
    {
        alert("Пожалуйста, проверьте и введите эффективной информации.");
        return;
    }else{
    	document.WMform.submit();
    }
    

};
function WMformReset() {
    $("#WMAmountValidation").text("*");
    $("#WMPayerPurseValidation").text("*");
    $("#WMPayerNameValidation").text("*");
    $("#WMDateOfPaymentValidation").text("*");
    $("#WMSpanSubmit").html("<a title='submit' id='WMsubmit' href='javascript:void('submit');' onclick='WMsubInfo();'  ><img height='29' width='81' border='0' src='../../Content/images/an_tj_05.gif'></a>");
    $("#WMResetButton").click();
    $("#WMAmount").focus();        
};

//WebMoney 结束

//检测
//JavaScript Document
//String函数之LTrim(),用于清除字符串开头的空格\换行符\回车等
//Date:2006-06-20
//@Param String(str)
//@Return String
//Begin
function ltrim(str) {
  var pattern = new RegExp("^[\\s]+", "gi");
  return str.replace(pattern, "");
}
//End

//String函数之RTrim(),用于清除字符串结尾的空格\换行符\回车等
//Date:2006-06-20
//@Param String(str)
//@Return String
//Begin
function rtrim(str) {
  var pattern = new RegExp("[\\s]+$", "gi");
  return str.replace(pattern, "");
}
//End

//String函数之Trim(),用于清除字符串开头和结尾部分的空格\换行符\回车等
//组合调用LTrim(str)和RTrim(str)函数
//Date:2006-06-20
//@Param String(str)
//@Return String
//Begin
function trim(str) {
  return rtrim(ltrim(str));
}
//End
//只能输入英文,数字,标点符号
function CheckEN(str) {
  //var   reg =   /^[\u4E00-\u9FA5|a-zA-Z][\u4E00-\u9FA5|0-9a-zA-Z]*$/
  var reg = /^[\s|0-9a-zA-Z|~`!@#$%\^&\(\)_+-=\/\*\{\}\[\]\;'\:"|<>,.\/?\\]*$/
  return r = reg.test(str);
}
//End
//只能输入英文,数字
function CheckENorNumber(str) {
  //var   reg =   /^[\u4E00-\u9FA5|a-zA-Z][\u4E00-\u9FA5|0-9a-zA-Z]*$/
  var reg = /^[\s|0-9a-zA-Z]*$/
  return r = reg.test(str);
}
//End
//只能输入英文,空格
function CheckENorSpaces(str) {
  //var   reg =   /^[\u4E00-\u9FA5|a-zA-Z][\u4E00-\u9FA5|0-9a-zA-Z]*$/
  var reg = /^[\s|a-zA-Z| ]*$/
  return r = reg.test(str);
}
//End
//是否为Email
function IsEmail(str) {
  var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return r = reg.test(str);
}
//End
//是否为电话号码
function IsTel(str) {
  //var reg=/^\(\+{1}\d{1,3}\)-\d{1,4}-\d{4,8}$/
  var reg = /^[\s|0-9|~`!@#$%\^&\(\)_+-=\/\*\{\}\[\]\;'\:"|<>,.\/?\\]*$/
  return r = reg.test(str);
}
//End
//是否为URL
function IsURL(str) {
  var reg = /^[http|https]+:\/\/[^\s]*$/
  return r = reg.test(str);
}
//End