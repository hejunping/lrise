/// <reference path="../../Scripts/jquery-1.4.4-vsdoc.js" />
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
     //alert(USDRate);
    //alert("Fee();");
    //var paypal_fee = <%=PaymentParametersManager.GetPaymentParameters().PaypalFee %>;
    //var PaypalSurcharge=<%=PaymentParametersManager.GetPaymentParameters().PaypalSurcharge%>;
    //var USDRate=<%=ViewData["USDRate"]%>;

                 var PayPalAccount = $("#PayPalAccount").val();
                 //alert(PayPalAccount);
                     if(PayPalAccount>0){
                         var Amount = Number(PayPalAccount);//银行转账金额
                         var cAmount=PayPalAccount*paypal_fee+Number(PaypalSurcharge);//总金额手续费USD
                         $("#Amount").val(FormatNum(Amount,2));
//                         $("#bAmount").text(FormatNum(Amount,2));
//                         $("#bAmount").append("USD");
//                         $("#cAmount").text(FormatNum((Amount-cAmount)*USDRate,2));
//                         $("#cAmount").append("CNY");
                         $("#AmountReceived").text(FormatNum((Amount-cAmount),2));
                         $("#AmountReceived").append(" USD");
                         var TempAmount=(PayPalAccount-cAmount)*USDRate;
                         //alert("(PayPalAccount-cAmount)*USDRate:"+PayPalAccount+"-"+cAmount+"-"+USDRate);
                         $("#TempAmount").val(FormatNum(TempAmount,2));
                     }else{
                         $("#Amount").val("0.00");
//                         $("#bAmount").text("0.00");
//                         $("#bAmount").append("USD");
//                         $("#cAmount").text("0.00");
//                         $("#cAmount").append("CNY");
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
            //alert("keyup");
        });
        $("#OtherPayPalAccount").blur(function () {
            CheckUp();
            $("#PayPalAccount").val($(this).val());
            //Fee();
        });
    });
    function FunPayPalAccountPayPal(v) {        
        $("#PayPalAccount").val(v);
    };
    function CheckUp() {
        if (isNaN($("#OtherPayPalAccount").val())) {
            alert("Please enter the numbers!");
            $("#OtherPayPalAccount").select();
            return;
        };        
    };
    function JsSubmit() {
        
        if ($("input:[name=PayPalAccount1]:radio:checked").length == 0){
			alert("Please select the amount of payment .");
			return false;
		}else{
            var PayPalAccount1 = $("input:[name=PayPalAccount1]:radio:checked").val();            
            if (PayPalAccount1 == 'other') {
                if ($.trim($("#OtherPayPalAccount").val()) == "") {
                    alert("Please enter your recharge amount!");
                    $("#OtherPayPalAccount").select();
                return false;
            }else if($("#OtherPayPalAccount").val() < 1){
                    alert('Amount not less than "1"!');
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
//PAYPAL end

//Western union 开始

 var WUCheckResults=false;
    $(document).ready(function() {
        $("#WUAmount").keyup(function() {
            //alert("keyup");
            //$(this).val($(this).val().replace(/[^\d\.]/g,""));
            $(this).val($(this).val().replace(/[^\d.]/g,"").replace(/^\./g,"").replace(/\.{2,}/g,"").replace(".","$#$").replace(/\./g,"").replace("$#$","."));
        });
        $("#WUAmount").blur(function(){
            if($.trim($(this).val())!="" && !isNaN($(this).val()) && $(this).val()>=1){
                WUCheckResults=true;
                $("#WUAmountValidation").text("√");
                //$("#WUCountry").attr("disabled",false);
                //$("#WUCountry").focus();
            }else{
                WUCheckResults=false;
                //$(this).select();
                //$("#WUAmount").focus();
                $("#WUAmountValidation").text("You entered an invalid amount");
            };
        });
        $("#WUCountry").blur(function(){
            if($(this).val()==0)
            {
                WUCheckResults=false;
                //$(this).focus();
                $("#WUCountryValidation").text("Please select your country！");
            }else{
                WUCheckResults=true;
                $("#WUCountryValidation").text("√");
                $("#WUFirstName").attr("disabled",false);
                //$("#WUFirstName").select();
            };            
        });
        $("#WUFirstName").blur(function(){
            if($.trim($(this).val())!="" && CheckENorSpaces($.trim($(this).val()))){
                WUCheckResults=true;
                $("#WUFirstNameValidation").text("√");
                //$("#WUMiddleName").attr("disabled",false);
                //$("#WUMiddleName").select();
            }else{
                WUCheckResults=false;                
                $("#WUFirstNameValidation").text("Please enter the correct name");
                //$(this).select();
            };
        });
        $("#WUMiddleName").blur(function(){
            
            if($.trim($(this).val())!=""){
                if(CheckENorSpaces($.trim($(this).val()))){
                    WUCheckResults=true;
                    $("#WUMiddleNameValidation").text("√");
                    //$("#WULastName").attr("disabled",false);
                    //$("#WULastName").select();
                }else{
                    WUCheckResults=false;
                    $("#WUMiddleNameValidation").text("Please enter the correct name");
                    //$(this).select();
                }
            }else{
                WUCheckResults=true;
                $("#WUMiddleNameValidation").text("");
                //$("#WULastName").select();
            };
            
        });
        $("#WULastName").blur(function(){
            if($.trim($(this).val())!="" && CheckENorSpaces($.trim($(this).val()))){
                WUCheckResults=true;                
                $("#WULastNameValidation").text("√");
                //$("#WUMTCN").attr("disabled",false);
                //$("#WUMTCN").select();
            }else{
                WUCheckResults=false;                
                $("#WULastNameValidation").text("Please enter the correct Last Name");
                //$(this).select();
            };
        });
        $("#WUMTCN").keyup(function() {            
            $(this).val($(this).val().replace(/[^\d]/g, ''));
            //alert("keyup");
        });
        $("#WUMTCN").blur(function(){
            if($.trim($(this).val())!="" && $(this).val().length==10){
                WUCheckResults=true;
                $("#WUMTCNValidation").text("√");
                 $.ajax({
                        type:'POST',
                        url: "/en/Account/IsExistsChargeSerialNumberAjax",
                        data:"serialNumber="+$("#WUMTCN").val(),
                        success:function(msg){
                            if (msg.Result) {
                                WUCheckResults=false;
                                $("#WUMTCNValidation").text("The MTCN has been used.");
                            }else{
                                $("#WUMTCNValidation").text("√");
                            }
                        }
                    });
                //$("#WUsubmit").focus();
            }else{
                WUCheckResults=false;                
                $("#WUMTCNValidation").text("Please enter 10 numbers only.");
                //$(this).select();
            };
        });
        

    });
    function WUCheck(){
      if( $.trim($("#WUAmountValidation").text())=="√" && $("#WUCountryValidation").text()=="√" && $.trim($("#WUFirstNameValidation").text())=="√" && $.trim($("#WULastNameValidation").text())=="√" && $.trim($("#WUMTCNValidation").text())=="√" ){
        WUCheckResults=true;
      }else{
        WUCheckResults=false;
      };
    };
    function WUsubInfo() { 
        WUCheck();
        if(!WUCheckResults)
        {
            alert("Please check and enter the valid information.");
            return;
        }
        $("#WUsubmit").removeAttr("onclick");//onclick="subInfo();"  
        $("#WUsubmit").html("<img height='29' width='81' border='0' src='../../Content/images/an_tj_07.gif'>");
            var WUCountryCheckText=$("#WUCountry").find("option:selected").text();  //获取Select选择的Text
            var huobi = $("#WUmoney").val();//货币类型
            var type =1;
            var id  = 0;
            var infos = "汇款方式：Western Union ; 汇款金额：" + $("#WUAmount").val() +  huobi + " ;  汇款人国家：" + WUCountryCheckText + " ; 汇款人名：" + $("#WUFirstName").val() + " ; 汇款人中间名:"+$("#WUMiddleName").val()+" ;汇款人姓氏：" + $("#WULastName").val() + " ;监控/流水号：" + $("#WUMTCN").val();
            var money = parseFloat($("#WUAmount").val());
            $.post("/en/Account/AddMoneyAjax", { "infos": infos, "money": money, "otherPaymentId": type, "postion": id, "moneyType": huobi, "serialNumber": $("#WUMTCN").val(), "paymentMode": "Western Union" },
                function (data, textStatus) {
                    if (data.Result) {
                        alert("All Information submitted successfully, we will process within 24 hours ，please check your account later.");
                        WUformReset();
                    }
                    else if (data.ErrorCode == 2) {
                        alert("The MTCN：" + $("#WUMTCN").val() + "has been used ，please do not repeat submission.");
                        WUResetSubmitBtn();
                    }
                    else {
                        alert("Your operation already timeout，please try later！Anything else, please connect with service department.");
                        WUResetSubmitBtn();
                    }
                }, "json");
    };
    function WUformReset() {
        $("#WUAmountValidation").text("*");
        $("#WUCountryValidation").text("*");
        $("#WUFirstNameValidation").text("*");
        $("#WUMiddleNameValidation").text("");
        $("#WULastNameValidation").text("*");
        $("#WUMTCNValidation").text("*");
        //WUform.reset();
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
            alert("Please enter the numbers!");
            $("#OtherWUQPAccount").select();
            return;
        };
    };
    function JsSubmitWUQP() {

        if ($("input:[name=WUQPAccount1]:radio:checked").length == 0) {
            alert("Please select the amount of payment .");
            return false;
        } else {
            var WUQPAccount1 = $("input:[name=WUQPAccount1]:radio:checked").val();
            if (WUQPAccount1 == 'other') {
                if ($.trim($("#OtherWUQPAccount").val()) == "") {
                    alert("Please enter your recharge amount!");
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
            //alert("keyup");
        });
        $("#WMAmount").blur(function(){            
            if($.trim($(this).val())!="" && !isNaN($(this).val()) && $(this).val()>=1){                
                WMCheckResults=true;                
                $("#WMAmountValidation").text("√");
            }else{
                WMCheckResults=false;
                $("#WMAmountValidation").text("You entered an invalid amount");
            };
        });        
        $("#WMPayerPurse").blur(function(){
            if($.trim($(this).val())!="" && CheckENorNumber($.trim($(this).val()))){
                WMCheckResults=true;
                $("#WMPayerPurseValidation").text("√");
            }else{
                WMCheckResults=false;                
                $("#WMPayerPurseValidation").text("You entered an invalid number");                
            };
        });        
        $("#WMPayerName").blur(function(){
            if($.trim($(this).val())!="" && CheckENorSpaces($.trim($(this).val()))){
                WMCheckResults=true;                
                $("#WMPayerNameValidation").text("√");
            }else{
                WMCheckResults=false;
                $("#WMPayerNameValidation").text("Please enter the correct name");                
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
            alert("Please check and enter the valid information.");
            return;
        }        
        $("#WMsubmit").removeAttr("onclick");//onclick="subInfo();"  
        $("#WMsubmit").html("<img height='29' width='81' border='0' src='../../Content/images/an_tj_07.gif'>");
            var huobi = $("#WMmoney").val();//货币类型
            var type =5;
            var id  = 0;            
            var infos="支付方式：WebMoney;支付时间：" + $("#WMDateOfPayment").val() + " ;充值金额：" + $("#WMAmount").val() +  huobi + "; 付款人的名字："+$("#WMPayerName").val()+";付款钱包："+$("#WMPayerPurse").val()+";收款钱包：Z378151677649;";
            var money = parseFloat($("#WMAmount").val());
            $.post("/en/Account/AddMoneyAjax", { "infos": infos, "money": money, "otherPaymentId": type, "postion": id, "moneyType": huobi, "serialNumber": Math.random(), "paymentMode": "WebMoney" },
                function(data, textStatus) {
                    if (data.Result) { 
                        alert("All Information submitted successfully, we will process within 24 hours ，please check your account later.");
                        WMformReset();
                    }
                    else if (data.ErrorCode == 2)
                    {
                        alert("Your operation already timeout，please try later！Anything else, please connect with service department.…");
                        //WMformReset();
                    }
                    else
                    {
                        alert("Your operation already timeout，please try later！Anything else, please connect with service department.…");
                        //WMformReset();
                    }
                }, "json");
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