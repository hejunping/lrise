jQuery.fn.alternateRowColors = function () {
    $("tbody tr:odd", this).removeClass("even").addClass("odd");
    $("tbody tr:even", this).removeClass("odd").addClass("even");
    return this;
};

function UpdatePayAmount(TPW) {
    var TempAmount;
    //    var ips_fee = 0.010;
    //    var paypal_fee = 0.040;
    //    var PaypalSurcharge = 0.300;
    var fee;
    var Amount;
    var cAmount;
    var bAmount;
    //    var USDRate = 6.25;
    var PaymentInfoShowStr;
    TempAmount = parseFloat($("#TotalCo").val()) - parseFloat($("#Tot").val());

    if (TPW == "IPS") {
        fee = (TempAmount * ips_fee);
        Amount = Number(TempAmount) + Number(fee);
        cAmount = TempAmount; //Amount*ips_fee;                
        $("#Amount").val(FormatNum(Amount, 2));
        $("#TempAmount").val(FormatNum(TempAmount, 2));
        bAmount = FormatNum(Amount + 0.00, 2) + "USD";
        cAmount = FormatNum(cAmount, 2) + "USD";
        PaymentInfoShowStr = "<p class=\"cost\">The handling fee for domestic bank card recharge锛�<b>" + ips_fee * 100 + "%</b>锛孭ayables锛�<b id=\"bAmount\">" + bAmount + "</b>锛孨et top-up fees, the actual amount is credited into account锛�<b id=\"cAmount\">" + cAmount + "</b></p>";
        $("#ReturnUrl").val("http://www.yoybuy.com/IPS/OrderReturnByDirectPayment");
    } else if (TPW == "PayPal") {
        TempAmount = TempAmount;
        fee = (TempAmount * paypal_fee);
        Amount = (Number(TempAmount) + Number(fee) + Number(PaypalSurcharge * USDRate)) / USDRate; //閾惰杞处閲戦
        cAmount = TempAmount; //Amount*paypal_fee;
        $("#Amount").val(FormatNum(Amount, 2));
        $("#TempAmount").val(FormatNum(cAmount, 2));
        bAmount = FormatNum(Amount, 2) + " USD";
        cAmount = FormatNum(cAmount, 2) + " USD";
        PaymentInfoShowStr = "<p class=\"cost\">Paypal Fee锛�<b>Amount * " + paypal_fee * 100 + "% + " + PaypalSurcharge + " USD</b>锛孭ayables锛�<b id=\"bAmount\">" + bAmount + "</b>锛� Deducted PayPal fee, the actual received amount is <b id=\"cAmount\">" + cAmount + "</b><br/> <b>*Attention锛�</b> no matter what currency you pay with PayPal to us, it will be converted into US Dollar, Currently the exchange rate is<b>1锛�" + USDRate + "</b>锛寃hich will be adjusted according to the exchange rate of Bank of China from time to time<br/>PayPal is the world's largest online payment platform, you can use international credit card and bank card to achieve immediate payment. </p>";
        $("#ReturnUrl").val("http://www.yoybuy.com/Paypal/NotifyDirectPayment");

    } else if (TPW == "0") {
        PaymentInfoShowStr = "";
    }
    $("#PaymentInfoShow").html(PaymentInfoShowStr);
}
function isExitInArr(mystr, StrAry) {
    for (i = 0; i < StrAry.length; i++) {
        if (mystr == StrAry[i]) {
            return true;
        }
    }
    return false;
}

/* 鏂规硶:Array.remove(dx)
* 鍔熻兘:鍒犻櫎鏁扮粍鍏冪礌.
* 鍙傛暟:dx鍒犻櫎鍏冪礌鐨勪笅鏍�.
* 杩斿洖:鍦ㄥ師鏁扮粍涓婁慨鏀规暟缁�
*/

//缁忓父鐢ㄧ殑鏄€氳繃閬嶅巻,閲嶆瀯鏁扮粍.
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) { return false; }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
}



//鍦ㄦ暟缁勪腑鑾峰彇鎸囧畾鍊肩殑鍏冪礌绱㈠紩
Array.prototype.getIndexByValue = function (value) {
    var index = -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value) {
            index = i;
            break;
        }
    }
    return index;
}


var goodsIsArr = new Array();
$(document).ready(function () {
    $.ajax({
        url: "http://shoppingcart.yoybuy.com/ShoppingCart/GetGoodsIdsAndCost",
        dataType: "json",
        cache: false,
        success: function (data) {
            $("#TotalMoeny").html(FormatNum(CNYtoUSDConstr(data.data.goodsCost), 2));
            goodsIsArr = data.data.goodsIds;
            $("#goodsIds").val(data.data.goodsIds);
            //SumGoods();
        }
    });
    $.ajax({
        url: "http://shoppingcart.yoybuy.com/shoppingcart/goods_pageList",
        data: { page: 1 },
        cache: false,
        success: function (data) {
            $("#content").html(data);
            SumGoods();
        }
    });
    $("input[name='ckbGoods']").live("click", function () {
        var goodsId = $(this).attr("value");

        if ($(this).attr("checked")) {
            if (!isExitInArr(goodsId, goodsIsArr)) {
                goodsIsArr.push(goodsId);
            }
        } else {
            if (isExitInArr(goodsId, goodsIsArr)) {
                var dx = goodsIsArr.getIndexByValue(goodsId);
                goodsIsArr.remove(dx);
            }
        }
        if (goodsIsArr == "") {
            $("#selAll").attr("checked", "");
        }
        SumGoods();
    });
    $("#goodsFreighthide").blur(function () {
        var freight = $("#goodsFreighthide").val();
        if (isNaN(freight) || $.trim(freight) == '') {
            $("#goodsFreight").val("0");
            $("#goodsFreighthide").val("0");
        }
        else {
            $("#goodsFreight").val(FormatNum(CNYtoUSDConstr(freight), 2));
        }
    });
    $("#goodsPricehide").blur(function () {

        var price = $("#goodsPricehide").val();
        if (isNaN(price) || $.trim(price) == '') {

            $("#goodsPrice").val("0");
            $("#goodsPricehide").val("0");
        }
        else {
            $("#goodsPrice").val(FormatNum(CNYtoUSDConstr(price), 2));
        }
    });
    $("#goodsUrl").val("Please enter the original webpage URL of the item.");
    $("#goodsUrl").attr("disabled", "");

    //    $('#changeRemark').dialog({
    //        autoOpen: false,
    //        width: 380,
    //        close: function (event, ui) {
    //        },
    //        modal: true,
    //        closeOnEscape: true,
    //        buttons: {
    //            "Close": function () {
    //                $(this).dialog("close");
    //            },
    //            "Submit": function () {
    //                var remark = $.trim($("#afterChangeRemark").val());
    //                var goodsId = $("#changeGoodsId").val();
    //                $.post("http://shoppingcart.yoybuy.com/shoppingcart/UpdateRemark",
    //					{ "goodsId": goodsId, "remark": remark },
    //					function (data, textStatus) {
    //					    if (data.result) {
    //					        $("#gremark" + goodsId).html(remark.substring(0, 20));
    //					        $('#changeRemark').dialog("close");
    //					        $("#" + goodsId + "Remark").val(remark);
    //					    }
    //					    else {
    //					        alert("Error ,Please retry");
    //					    }
    //					});
    //            }
    //        }
    //    });

    $("#DelGoods").click(function () {
        if (goodsIsArr == "") {
            alert("Please select items which you would like to delete!");
            return false;
        }
        else {
            if (confirm("Are you sure you want to delete the selected items?")) {
                if ($("#IsLogin").val() == "True") {
                    $.post("http://shoppingcart.yoybuy.com/shoppingcart/LoggedDelGoods", $.param({ "goodsIds": goodsIsArr, "UserId": $("#userId").val() }, true),
				    function (data, textStatus) {
				        if (data) {
				            window.location.reload();
				        } else { alert("Delete Error"); }
				    }, "json"
				);
                }
                else {
                    $.post("http://shoppingcart.yoybuy.com/shoppingcart/UnLoggedDelGoods", $.param({ "goodsIds": goodsIsArr }, true),
	        	  		function (data, textStatus) { if (data) { window.location.reload(); } else { alert("Delete Error"); } }, "json");
                }
            }
        }
    });
    $("#AddToFavourite").click(function () {
        if ($("#IsLogin").val() == "True") {

            if (goodsIsArr == "" || goodsIsArr.length == 0) {
                alert("Please choose the items which you would like to add to 鈥淢y favorite鈥�");
                return false;
            }
            $.post("http://shoppingcart.yoybuy.com/shoppingcart/AddToFavourite", $.param({ "goodsIds": goodsIsArr }, true),
			    function (data, textStatus) {
			        if (data.result) {
			            alert("The item(s) had been successfully added to 鈥淢y favorite鈥�!");
			        } else {
			            alert("Error ,Please retry!");
			        }
			    }, "json"
		    );
        }
        else {
            window.location.href = "http://login.yoybuy.com/";
        }
    });

    $("#TempPaymentWay").change(function () {
        var TPW = $("#TempPaymentWay").val();
        UpdatePayAmount(TPW);
    });
    //鎺у埗鍏ㄩ€変笌鍚�
    $("#selAll").click(function () {
        if (this.checked == true) {
            AllSelect();
        } else {
            UnSelect();
        }
    });
    $("#captchaimage").click(RefreshCaptcha);
    function RefreshCaptcha() {
        var img = $("#captchaimage");
        if (captchaImageSrc == null) {
            captchaImageSrc = img.attr("src");
        }
        img.attr("src", captchaImageSrc + "&" + (new Date()).getTime());
        $("#captcha").val("");
    }

    $("#Login").click(function () {
        var obj = $(this);
        obj.attr("disabled", "disabled");
        var email = $.trim($("#email").val());
        var password = $("#password").val();
        var validator = $("#validator").val();
        var emailformat = /^([0-9a-zA-Z-_.])+@[0-9a-zA-Z-.]+$/;


        if (email == "") {
            $("#validatorVal").html("*Email or nickname can not be empty!");
            obj.removeAttr("disabled");
            return;
        } else {
            $("#validatorVal").html("");
        }

        if (!emailformat.test(email)) {
            $("#validatorVal").html("*Email format is not correct!");
        }
        else {
            $("#validatorVal").html("");
        }

        if (password == "") {
            $("#validatorVal").html("*Please enter your password!");
            obj.removeAttr("disabled");
            return;
        } else {
            $("#validatorVal").html("");
        }
        if ($.trim($("#captcha").val()) == "" && isDisplayCaptcha) {
            $("#validatorVal").html("*Please enter the verification code!");
            obj.removeAttr("disabled");
            return;
        }
        else {
            $("#validatorVal").html("");
        }
        if (validator == "") {
            obj.removeAttr("disabled");
            $("#validatorVal").html("*Please enter the verification code!");
            obj.removeAttr("disabled");
            return;
        }
        var vkey = $("#validateCodeKey").val();
        var vcode = $("#validator").val();
        $("#loadingImg").show();
        var key = $("#captcha-guid").val();
        var code = $("#captcha").val();
        $.ajax({
            dataType: "jsonp",
            cache: false,
            url: "http://login.yoybuy.com/jsonplogin",
            data: { userName: email, password: password, key: key, code: code, remember: false },
            success: function (data) {
                if (data.result) {
                    window.location.href = window.location.href;
                }
                else {
                    obj.removeAttr("disabled");
                    $("#loadingImg").hide();
                    switch (data.errorcode) {
                        case 1:
                        case 2:
                        case 4:
                        case 8:
                        case 3:
                            $("#validatorVal").html(data.msg);
                            break;
                        case 5:
                            window.location.href = "http://login.yoybuy.com/en/unactivation?useremail=" + data.msg;
                            break;
                        case 6:
                        case 7:
                            window.location.href = "http://www.yoybuy.com/freezeuserstatus";
                            break;
                        default:
                    }
                    RefreshCaptcha();
                    ShowCaptcha();
                }
            }
        });


    });

});

function ShowCaptcha() {
    isDisplayCaptcha = true;
    $("#captchaLiTitle").show();
}

function setalter() {

    if ($("#selAll").attr("checked") != true) {

        AllSelect();
        $("#selAll").attr("checked", "checked");
    }
    else {

        UnSelect();
        $("#selAll").attr("checked", "");
    }

}

function DelGoods(id, user_id) {
    if (confirm("Are you sure you want to delete this item?")) {
        if ($("#IsLogin").val() == "True") {
            $.post("http://shoppingcart.yoybuy.com/shoppingcart/LoggedDelGoods", { "goodsIds": id, "UserId": user_id },
	        	  		function (data, textStatus) { if (data.result) { window.location.reload(); } else { alert(data.msg); } }, "json");
        }
        else {
            $.post("http://shoppingcart.yoybuy.com/shoppingcart/UnLoggedDelGoods", { "goodsIds": id },
	        	  		function (data, textStatus) { if (data.result) { window.location.reload(); } else { alert(data.msg); } }, "json");
        }
    }
}

function PayGoods() {
    $("#buttnPayok").attr("href", "#");
    if ($("#IsSub").val() == '0') {
        if ($("#TempPaymentWay").val() == "0") {
            alert("Please select a payment option!");
            $("#TempPaymentWay").focus();
            return;
        }
        $("#PaymentWay").val($("#TempPaymentWay").val());
        $("#FormPayment").submit();
    }
    if ($("#IsSub").val() == '2') {
        alert("Please select the item(s) firstly!");
        CloseShow();
    }
    if ($("#IsSub").val() == '1') {
        if (goodsIsArr == "") {
            alert("Please choose the items which you would like to add to 鈥淢y favorite鈥�");
            return;
        }
        if (goodsIsArr.length <= 50) {

            $("#buttnPayok").attr("href", "javascript:PayOkInfo();");
            $.post("http://shoppingcart.yoybuy.com/shoppingcart/CheckShoppingCar", $.param({ "goodsId": goodsIsArr }, true),
				function (data, textStatus) {
				    $("#msgTip").html("Note: This is the first payment (items fee + shipping fee in China), you need to pay the second payment (International shipping fee + service fee) when you submit delivery.");
				    $("#msgTip").show();
				    $("#resaultinfo").html(data);

				    var checkitems = $("li[name='outgoodsname']");
				    $(checkitems).each(function () {

				        $(this).text(), $(this).attr("id");
				        //TransLation($(this).attr("id"), $(this).text());
				    });

				    var sumdoler = 0;
				    var checkprice = $("span[name='outitemspan']");
				    var ExchangeRateName = "$";

				    $(checkprice).each(function () {
				        // alert($(this).text());

				        sumdoler = parseFloat(sumdoler) + parseFloat(FormatNum(CNYtoUSDConstr($(this).text()), 2));
				        $(this).html(ExchangeRateName + FormatNum(CNYtoUSDConstr($(this).text()), 2));
				        //alert(FormatNum(CNYtoUSDConstr($(this).text()),2));
				    });

				    var checksum = $("#outsumspan");
				    //alert($(checksum).text());
				    var exain = "USD";

				    $(checksum).html(FormatNum(CNYtoUSDConstr($(checksum).text()), 2) + exain);
				    // $(checksum).text("$"+sumdoler);

				}

				);

            //$('#ShowLoading').dialog('open');
        }
        else {
            alert("To save purchasing time, your items cannot pass 50 pec in one order, please submit separately.");
            CloseShow();
        }
    }
}

function SumGoods() {
    advisorOmniture();
    viewadvisor();
    $("#resaultinfo").html("<div class=\"tis_b\"><h3>Waiting... ...<br/><img src='../../Content/images/loading2.gif' /></h3></div>");
    $("#msgTip").hide();
    $("#msgTip").hide();
    if ($("#IsLogin").val() == "True") {
        $.post("http://shoppingcart.yoybuy.com/shoppingcart/SumGoodsCost",
                           $.param({ "goodsIds": goodsIsArr }, true),
                                function (data, textStatus) {
                                    if (data.result) {
                                        if (data.data == '0.00') {
                                            $("#IsSub").val('2'); //alert(1);
                                            //$("#PayGoods2").removeClass();
                                            //$("#PayGoods2").addClass("btn-grey");
                                            $("#TotalMoeny").html(0);
                                            $("#TotalCo").val(0);
                                            $("#Services").html(0);
                                            $("#AllCost").html(0);
                                            $("#chongzhi").css("display", "none"); //浣欓澶熺敤
                                            //alert("浣欓澶熺敤0");
                                            //$("#next").attr("href","javascript:PayGoods();");
                                            $("#PayNext").attr("href", "javascript:showPayinfo();");
                                            //$("#topPrice").html("$ 0.00");

                                            UpdatePayAmount($("#TempPaymentWay").val());
                                            CloseShow();
                                        }
                                        else if (data.data == "refresh") {
                                            CloseShow();
                                        }
                                        else {

                                            //alert(idArr);
                                            $("#TotalMoeny").html(FormatNum(CNYtoUSDConstr(data.data), 2)); //鎬婚噾棰�
                                            var exain = "$";
                                            //$("#topPrice").html(exain + FormatNum(CNYtoUSDConstr(data.data), 2));
                                            //$("#Services").html(array[2]);
                                            $("#TotalCo").val(FormatNum(CNYtoUSDConstr(data.data), 2));
                                            //$("#AllCost").html(array[1]);    
                                            //$("#PayGoods2").addClass("btn-ad");                                        
                                            var bal = $("#Tot").val();
                                            $("#IdArr").val(goodsIsArr);
                                            var totalitem = FormatNum(CNYtoUSDConstr(data.data), 2); //浜у搧姹囨€�

                                            if (parseFloat(FormatNum(CNYtoUSDConstr(bal), 2)) < parseFloat(totalitem)) {
                                                //alert("浣欓涓嶈冻1");
                                                // $("#chongzhi").css("display", "block");//浣欓涓嶈冻


                                                $("#PayNext").attr("href", "javascript:GoToAccount();");
                                                //$("#PayGoods2").removeClass();
                                                $("#IsSub").val("0");
                                                UpdatePayAmount($("#TempPaymentWay").val());
                                                CloseShow();
                                            }
                                            else {
                                                // alert("浣欓澶熺敤2");

                                                $("#PayNext").attr("href", "javascript:showPayinfo();");
                                                //  $("#chongzhi").css("display", "none");//浣欓澶熺敤
                                                // $("#PayGoods2").addClass("btn-ad");
                                                $("#IsSub").val("1");
                                                CloseShow();
                                            }
                                        }
                                    }
                                }, "json");
    }
    else {
        $.post("http://shoppingcart.yoybuy.com/shoppingcart/SumGoodsCost",
                            $.param({ "goodsIds": goodsIsArr }, true),
                                function (data, textStatus) {
                                    if (data.result) {
                                        if (data.data == '0.00') {
                                            $("#IsSub").val('2'); //alert(1);
                                            //$("#PayGoods2").removeClass();
                                            //$("#PayGoods2").addClass("btn-grey");
                                            $("#TotalMoeny").html(0);
                                            $("#TotalCo").val(0);
                                            $("#Services").html(0);
                                            $("#AllCost").html(0);
                                            $("#chongzhi").css("display", "none"); //浣欓澶熺敤
                                            //alert("浣欓澶熺敤0");
                                            //$("#next").attr("href","javascript:PayGoods();");
                                            $("#PayNext").attr("href", "javascript:showPayinfo();");
                                            $("#topPrice").html("$ 0.00");

                                            UpdatePayAmount($("#TempPaymentWay").val());
                                            CloseShow();
                                        }
                                        else if (data.data == "refresh") {
                                            CloseShow();
                                            //window.location="<%=Url.Action("secondstep","ShoppingCar") %>";
                                        }
                                        else {

                                            //alert(idArr);
                                            $("#TotalMoeny").html(FormatNum(CNYtoUSDConstr(data.data), 2)); //鎬婚噾棰�
                                            var exain = "$";
                                            $("#topPrice").html(exain + FormatNum(CNYtoUSDConstr(data.data), 2));
                                            //$("#Services").html(array[2]);
                                            $("#TotalCo").val(FormatNum(CNYtoUSDConstr(data.data), 2));
                                            //$("#AllCost").html(array[1]);    
                                            //$("#PayGoods2").addClass("btn-ad");                                        
                                            var bal = $("#Tot").val();
                                            $("#IdArr").val(goodsIsArr);
                                            var totalitem = FormatNum(CNYtoUSDConstr(data.data), 2); //浜у搧姹囨€�


                                            // alert("浣欓澶熺敤2");

                                            $("#PayNext").attr("href", "javascript:showPayinfo();");
                                            //  $("#chongzhi").css("display", "none");//浣欓澶熺敤
                                            // $("#PayGoods2").addClass("btn-ad");
                                            $("#IsSub").val("1");
                                            CloseShow();
                                        }
                                    }
                                }, "json");
    }
}

function Add() {
    window.location.href = "http://shoppingcart.yoybuy.com/en/purchase.html";
}

function AllSelect() {
    $("input[name=ckbGoods]").each(function () {
        if (!$(this).attr('checked')) {
            $(this).attr('checked', 'checked');
        }
    });
    goodsIsArr = $("#goodsIds").val().split(',');
    SumGoods();
}

function UnSelect() {
    $("input[name=ckbGoods]").each(function () {
        if ($(this).attr('checked')) {
            $(this).attr('checked', '');
        }
    });
    goodsIsArr = [];
    SumGoods();
}

function showRemark(id) {
    $("#changeGoodsId").val(id);
    var text = $("#" + id + "Remark").val();
    $("#afterChangeRemark").val(text);
    $("#remarkMsg").html("");
    $('#changeRemark').dialog('open');
}

function showAmount(id, meth) {

    $("#" + id + "Amount").attr("disabled", "disabled");
    $("a[title='add']").attr("disabled", "disabled");
    $("a[title='minus']").attr("disabled", "disabled");


    var count = $("#" + id + "Amount").val();
    if (meth == "add") {
        if (parseInt(count, 10) + 1 > 9999)
        { count = 9999; }
        else
        { count++; }

    }
    else if (meth == "min") {
        if (parseInt(count, 10) - 1 > 0)
        { count--; }
        else
        { count = 1; }
    }
    else {
        if (parseInt(count, 10) == "NaN" || count > 9999 || count < 1) {
            count = 1;
        }
        else {
            count = count;
        }
    }
    $("#" + id + "Amount").val(count);
    $.post("http://shoppingcart.yoybuy.com/shoppingcart/UpdateAmount",
							    { "goodsId": id, "amount": count },
							    function (data, textStatus) {
							        if (data.result) {
							            if (data.data >= 0) {
							                var price = $("#" + id + "Price").val();
							                var allCost = parseFloat(count * price);
							                if ($("#" + id + "Xiaoji").attr("typeid") == 1) {
							                    $("#" + id + "Xiaoji").html("$" + FormatNum(CNYtoUSDConstr(allCost) + CNYtoUSDConstr(data.data), 2));
							                }
							                else if ($("#" + id + "Xiaoji").attr("typeid") == 2) {
							                    $("#" + id + "Xiaoji").html("$" + FormatNum(CNYtoUSDConstr(allCost), 2));
							                }
							                $("#" + id + "Freight").html(FormatNum(CNYtoUSDConstr(data.data, 2)));
							                SumGoods();
							                $("a[title='add']").removeAttr("disabled");
							                $("a[title='minus']").removeAttr("disabled");
							                $("#" + id + "Amount").removeAttr("disabled");
							            }
							            else {
							                alert("Error , Plese retry ");
							                $("a[title='add']").removeAttr("disabled");
							                $("a[title='minus']").removeAttr("disabled");
							                $("#" + id + "Amount").removeAttr("disabled");
							            }
							        }
							    }, 'json');


}

function checkLength(obj) {
    if (obj.value.length > 200) {
        //$("#remarkMsg").html("Note information is too long");
        alert("Note information is too long");
        obj.value = obj.value.substring(0, 200);
    }
    else
    { }
}

function checkedBox() {
    var tage = $("#Sel").val();
    if (tage == "1") {
        UnSelect();
        $("#Sel").val("0");
    }
    else {
        AllSelect();
        $("#Sel").val("1");
    }
}

function advisorOmniture() {
    var eventType = 'Televisions';
    s_control_click('eVar31,events', 'event36', 'product advisor:' + eventType.toLowerCase() + ',event36', 'o', 'product advisor clicks');
} var TRANSPARENCY_PROPERTY_ENABLE = 1;
var TRANSPARENCY_PROPERTY_DISABLE = 2;
var TRANSPARENCY_PROPERTY_IS_DISABLE = 3;
var transparencyVetoableChangeListener = [];
var transparency_debugAreaId = null;

function transparency_addVetoableChangeListener(vetoableChangeListener) {
    transparencyVetoableChangeListener[transparencyVetoableChangeListener.length] = vetoableChangeListener;
}

function transparency_enable() {
    document.getElementById('visualsearch_transparency').style.display = 'block';
    for (var i = 0; i < transparencyVetoableChangeListener.length; i++) {
        transparencyVetoableChangeListener[i](TRANSPARENCY_PROPERTY_ENABLE);
    }
}

function transparency_disable() {
    for (var i = 0; i < transparencyVetoableChangeListener.length; i++) {
        if (!transparencyVetoableChangeListener[i](TRANSPARENCY_PROPERTY_IS_DISABLE)) {
            if (transparency_debugAreaId != null) {
                var message = "" + transparencyVetoableChangeListener[i] + ": veto";
                transparency_debugAreaId.value += message + "\n";
            }
            return;
        }
    }

    document.getElementById('visualsearch_transparency').style.display = 'none';
    for (var i = 0; i < transparencyVetoableChangeListener.length; i++) {
        transparencyVetoableChangeListener[i](TRANSPARENCY_PROPERTY_DISABLE);
    }
}

function transparency_isEnable() {
    if (document.getElementById('visualsearch_transparency').style.display == 'block')
        return true;
    return false;
}

function showPayinfo() {
    if ($("#IsLogin").val() == "True") {
        advisorOmniture();
        viewadvisor();
        window.scrollTo(0, 0);
        //$("#resaultinfo").html("<div class=\"tis_b\"><h3>Waiting... ...<br/><img src='../../Content/images/loading2.gif' /></h3></div>");
        $.post("http://shoppingcart.yoybuy.com/shoppingcart/getuserprolistprice", function (data) {
            if (data.result != "" && data.rePrice != 0 && parseFloat(data.rePrice) > parseFloat($("#Balance").val())) {
                $("#resaultinfo").html("<div class=\"tis_b\"><h3> Sorry锛寉our balance is not enough because your order" + data.result + "(锛�" + data.rePrice + ") is approving. We will keep the order payment in your account during the approving time.</a><br /></h3></div>");
                $("#buttnPayok").hide();
            } else {
                $("#resaultinfo").html("<div class=\"tis_b\"><h3>Waiting... ...<br/><img src='../../Content/images/loading2.gif' /></h3></div>");
                $("#msgTip").hide();
                PayGoods();
            }
        });

    }
    else {
        var DisplayUserName = getCookie("DisplayUserName");
        if (typeof (DisplayUserName) == "undefined") {
            DisplayUserName = "";
        }
        $("#email").val(DisplayUserName);

        if ($("#IsSub").val() == '2') {
            alert("Please select the item(s) firstly!");
            return;
        }
        $("#Login").removeAttr("disabled");
        refreshValidateCode();
        //$("#email").val("");//鐧诲綍鏃堕渶瑕佹樉绀虹敤鎴峰悕
        $("#password").val("");
        $("#validatorVal").html("");
        $("#validator").val("");
        var eLeft = $("#PayNext").offset().left;
        var eTop = $("#PayNext").offset().top;
        eLeft = eLeft - 600;
        eTop = eTop - 300;
        showBg();
        $("#useLogin").css({
            "z-index": "120",
            "position": "absolute"
        }).animate({
            left: eLeft,
            top: eTop,
            opacity: "show"
        }, 1);
    }
}
//鏄剧ず鐏拌壊JS閬僵灞�

function showBg() {
    var bH = $(document).height();
    var bW = window.screen.width - 17;
    $("#fullbg").css({
        width: bW,
        height: bH,
        display: "block"
    });
}

function CloseDiv() {
    $("#fullbg").css("display", "none");
    $("#useLogin").hide();
}

function CloseShow() {
    document.getElementById('advisor').style.display = 'none';
    transparency_disable();
}

function CloseShowreload() {
    document.getElementById('advisor').style.display = 'none';
    transparency_disable();
    location.reload();
}
var goodsList = "";

function PayOkInfo() {
    window.scrollTo(0, 0);
    $("#buttnPayok").attr("href", "#");
    $("#resaultinfo").html("<div class=\"tis_b\"><h3>Waiting... ...<br/><img src='../../Content/images/loading2.gif' /></h3></div>");
    $("#msgTip").hide();
    var arrChk = $("input[name='ckbGoods']");
    var idArr = new Array();
    var igoods = 0;
    $(arrChk).each(function () {
        if (true == $(this).attr('checked')) {
            idArr.push($(this).val());
            var itemprice = $("#itemPrice" + $(this).val()).attr("name").split('_')[1]; //鍟嗗搧浜烘皯甯佷环鏍�
            var goodsUrl = $("#itemsname" + $(this).val()).attr("href"); //yoybuy鍟嗗搧閾炬帴
            var amount = $("#" + $(this).val() + "Amount").val(); //鍟嗗搧鏁伴噺
            var goodsIdsArr = goodsUrl.split('/');
            var tbGoodId = "";
            for (var i = 0; i < goodsIdsArr.length; i++) {
                if (Number(goodsIdsArr[i])) {
                    tbGoodId = goodsIdsArr[i]; //娣樺疂鍟嗗搧ID
                }
            }
            goodsUrl = "http://item.taobao.com/item.htm?id=" + tbGoodId; //娣樺疂鍟嗗搧閾炬帴
            goodsList += tbGoodId + "," + itemprice / 6.25 + "," + amount + "|";
        }
    });

    $.post("http://shoppingcart.yoybuy.com/shoppingcart/PayForTheGoodsFromCar",
            $.param({ "goodsId": goodsIsArr }, true),
             function (data, textStatus) {
                 if (parseInt(data.Result, 10) == 1 || parseInt(data.Result, 10) == 8) {
                     orderAccess();
                     var googleadservices = "<script type=\"text/javascript\">/* <![CDATA[ */var google_conversion_id = 951707565;var google_conversion_language = \"en\";var google_conversion_format = \"3\";var google_conversion_color = \"ffffff\";var google_conversion_label = \"WU-oCLvVvAMQrc_nxQM\";var google_conversion_value = 0;/* ]]> */</script>";
                     googleadservices += "<script type=\"text/javascript\"  src=\"http://www.googleadservices.com/pagead/conversion.js\"></script><noscript><div style=\"display:inline;\"><img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\"  src=\"http://www.googleadservices.com/pagead/conversion/951707565/?label=WU-oCLvVvAMQrc_nxQM&amp;guid=ON&amp;script=0\"/></div></noscript>";

                     if ($("#CheckNewUser").val() != "False") {
                         $("#resaultinfo").html("<div class=\"tis_b\"><h3>You鈥檝e submitted the order successfully! We will process it within 24hours.<br/>Note锛欶or your own protection锛寃e will check the items in the order and cancel the fake products directly. During the approving time, we will keep the order payment in your Yoybuy account.</h3></div><div class=\"tis_b_b\">&nbsp;</div><div style=\"display:inline;\"><img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" src=\"" + googleadservices + "\"/></div>");
                     } else {
                         $("#resaultinfo").html("<div class=\"tis_b\"><h3>You鈥檝e submitted the order successfully! We will process it within 24hours.<br/></h3></div><div class=\"tis_b_b\">&nbsp;</div><div style=\"display:inline;\"><img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" src=\"" + googleadservices + "\"/></div>");
                     }
                     $("#msgTip").hide();
                     $("#buttnPayok").attr("href", "http://order.yoybuy.com/en/myorder");

                     $("#spanclosenew").unbind('click').removeAttr('onclick').click(function () { CloseShowreload(); });

                     var listid = data.ListId;
                     goodsList = goodsList.substring(0, goodsList.length - 1);
                     //                     if (listid.length > 10) {
                     //                         Hundred(listid, goodsList);
                     //                     }
                     //  alert(listid);//

                     // $("#ShowLoading").dialog("option","buttons",{"OK":function(){$(this).dialog("close");location.reload();}});
                 }
                 else if (data.Result == 2) {
                     $("#resaultinfo").html("<div class=\"tis_b\"><h3>" + data.msg + "<br/></h3></div><div class=\"tis_b_b\">&nbsp;</div>");
                     $("#msgTip").hide();
                     $("#buttnPayok").attr("href", "javascript:CloseShow();");
                 } else if (data.Result == 3) {
                     $("#resaultinfo").html("<div class=\"tis_b\"><h3>" + data.msg + "<br/></h3></div><div class=\"tis_b_b\">&nbsp;</div>");
                     $("#msgTip").hide();
                     $("#buttnPayok").attr("href", "javascript:CloseShow();");
                 }
                 else {
                     $("#resaultinfo").html("<div class=\"tis_b\"><h3>Operation exception please try again later, or contact administrator<br/></h3></div><div class=\"tis_b_b\">&nbsp;</div>");
                     $("#msgTip").hide();
                     $("#buttnPayok").attr("href", "javascript:CloseShow();");
                     //  $("#ShowLoading").dialog("option","buttons",{"OK":function(){$(this).dialog("close");location.reload();}});
                 }
             }, "json");
}
function GoToAccount() {
    advisorOmniture();
    viewadvisor();
    window.scrollTo(0, 0);
    $.post("http://shoppingcart.yoybuy.com/shoppingcart/getuserprolistprice", function (data) {
        if (data.result != "" && data.rePrice != 0) {
            $("#resaultinfo").html("<div class=\"tis_b\"><h3> Sorry锛寉our balance is not enough because your order " + data.result + " (锛�" + data.rePrice + ") is approving. We will keep the order payment in your account during the approving time.</a><br /></h3></div>");
        } else {
            $("#resaultinfo").html("<div class=\"tis_b\"><h3> Sorry, insufficient balance!&nbsp;&nbsp;<a href=\"http://account.yoybuy.com/en/addmoney\" title=\"Account\" class=\"u\">Add money to Account immediately</a><br /></h3></div>");
        }
    });
    //$("#resaultinfo").html("<div class=\"tis_b\"><h3> Sorry, insufficient balance!&nbsp;&nbsp;<a href=\"http://account.yoybuy.com/en/addmoney\" title=\"Account\" class=\"u\">Add money to Account immediately</a><br /></h3></div>");
    $("#msgTip").hide();
    $("#buttnPayok").attr("href", "javascript:CloseShow();");
}
//$("#PayNext").attr("href","<%=Url.Action("MyAccount","User") %>");
function orderAccess() {
    var google_conversion_id = 951707565;
    var google_conversion_language = "en";
    var google_conversion_format = "3";
    var google_conversion_color = "ffffff";
    var google_conversion_label = "WU-oCLvVvAMQrc_nxQM";
    var google_conversion_value = 0;
}
function getGoods() {
    $("#BtnSubmit").attr("disabled", "disabled");
    $("#goodsUrl").attr("style", "background:none repeat scroll 0 0 #D9D9D9");
    var goodsUrl = $.trim($("#goodsUrl").val().replace("item_num_id", "id").replace("#", ""));
    goodsUrl = goodsUrl.toLowerCase().replace("item.beta.taobao.com", "item.taobao.com");
    if (goodsUrl == "" || goodsUrl == "Please enter the original webpage URL of the item.") {
        alert("Input the goods website address!");
        $("#BtnSubmit").removeAttr("disabled");
        return;
    }
    var mySources = "";
    if (goodsUrl.toLowerCase().indexOf("http://www.yoybuy.com/product/") >= 0 || goodsUrl.toLowerCase().indexOf("http://yoybuy.com/product/") >= 0) {
        var goodsIdsArr = goodsUrl.split('/');
        var tbGoodId = "";
        for (var i = 0; i < goodsIdsArr.length; i++) {
            if (Number(goodsIdsArr[i])) {
                tbGoodId = goodsIdsArr[i];
            }
        }
        mySources = "yoybuy.com(grab)";
        goodsUrl = "http://item.taobao.com/item.htm?id=" + tbGoodId;
    }
    if (goodsUrl.toLowerCase().indexOf("http://www.yoybuy.com/en/show") >= 0 || goodsUrl.toLowerCase().indexOf("http://yoybuy.com/en/show") >= 0) {
        var goodsIdsArr = goodsUrl.split('/');
        var tbGoodId = "";
        for (var i = 0; i < goodsIdsArr.length; i++) {
            if (Number(goodsIdsArr[i])) {
                tbGoodId = goodsIdsArr[i];
            }
        }
        mySources = "yoybuy.com(grab)";
        goodsUrl = "http://item.taobao.com/item.htm?id=" + tbGoodId;
    }
    if (goodsUrl.indexOf("taobao.com") != -1) {
        goodsUrl = goodsUrl.replace("item_id", "id");
    }
    if (goodsUrl != "") {
        if (new RegExp("http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?").test(goodsUrl)) {
            $("#goodsUrl").attr("disabled", "disabled");
            $("#firstTip").html("<img src='http://shoppingcart.yoybuy.com/Content/images/loadingb.gif'  /><br/>Searching item's information...");
            $("div[name='goodmessageLoading']").show();
            $.post("http://shoppingcart.yoybuy.com/shoppingcart/GetItemGoods", { goodsUrl: encodeURIComponent(goodsUrl) },
                        function (data) {
                            if (data.result) {
                                if (data.data.Name != null && data.data.Name != "") {

                                    $("#goodsName").attr("disabled", "disabled");
                                    $("#goodsNamehide").val(data.data.Name);
                                    $("#goodsName").val(data.Transltion);
                                }
                                if (data.data.Photo != null && data.data.Photo != "") {
                                    $("#goodsPhoto").attr("src", data.data.Photo);
                                }
                                else {
                                    $("#goodsPhoto").attr("src", "/Content/images/empty.gif");
                                }
                                if (data.data.Price != 0 && data.data.Price != null) {
                                    var usdprice = CNYtoUSDConstr(data.data.Price);
                                    $("#goodsPrice").val(FormatNum(usdprice, 2));
                                    $("#goodsPricehide").val(data.data.Price);
                                    $("#goodsPricehide").attr("disabled", "disabled");

                                    $("#goodsFreight").val(FormatNum(CNYtoUSDConstr(data.data.Freight), 2));
                                    $("#goodsFreighthide").val(data.data.Freight).attr("disabled", "disabled");
                                }
                                else {
                                    $("#goodsName").blur(function () {
                                        $("#goodsNamehide").val($("#goodsName").val());
                                    });
                                }
                                if (data.data.Source != null && data.data.Source != "") {
                                    if (mySources != "") {
                                        $("#goodsSource").val(mySources);
                                    }
                                    else {
                                        $("#goodsSource").val(data.data.Source);
                                    }
                                }
                                if (data.data.Shop != "" && data.data.Shop != "") {
                                    $("#Shop").val(data.data.Shop);
                                }
                                if (data.data.ShopUrl != "" && data.data.ShopUrl != "") {
                                    $("#ShopUrl").val(data.data.ShopUrl);
                                }
                                if (data.data.TBGoodsId != null && data.data.TBGoodsId != "") {
                                    $("#TBGoodsId").val(data.data.TBGoodsId);
                                }
                                if (data.data.DHLInvoiceDescription != null && data.data.DHLInvoiceDescription != "") {
                                    $("#DHLInvoiceDescription").val(data.data.DHLInvoiceDescription);
                                }
                                $("#goodsPrice").attr("disabled", "disabled");
                                $("#goodsFreight").attr("disabled", "disabled");
                                $("#OriginalFreight").val(data.data.OriginalFreight);
                                $("#goodsCounts").val(1);

                                $("#goodsAddress").val(goodsUrl).attr("disabled", "disabled");

                                /*閾炬帴鍒扮墿鍝�*/
                                $("#linktogoods").attr("href", $("#goodsUrl").val());
                                $("#first").css("display", "none");
                                $("#second").css("display", "block");
                                $("#three").css("display", "none");
                                $("div[name='goodmessageLoading']").hide();
                                $("div[name='goodmessage']").show();
                                var translation = $("#goodsName").val();
                            } else {
                                alert(data.msg);
                            }
                        }, "json");

        } else {
            alert("Error website address, please check it!");
        }

    } else {
        alert("Input the goods website address!");
    }

}
function countsManager(obj) {
    var counts = $("#goodsCounts").val();

    if (obj == "add") {
        var newcount = parseInt(counts) + 1;
        $("#goodsCounts").val(newcount);
    }
    else {
        var newcount = parseInt(counts) - 1;
        if (newcount < 1) {
            newcount = 1;
        }
        $("#goodsCounts").val(newcount);
    }
}

function remarkChangeCheck(obj) {
    if (obj.checked) {
        $("#goodsRemark").attr("disabled", "disabled").val("No note");
        $("#goodsRemark").attr("class", "");
    }
    else {

        $("#goodsRemark").removeAttr("disabled").val("");
        $("#goodsRemark").attr("class", "example");
    }
}
function clearRemarkA() {
    if ($.trim($("#goodsRemark").val()) == "Please enter the purchasing information of this item, such as color, size or other requirements." || $("#IsRemark").val() == 1) {
        $("#goodsRemark").val("");
        return false;
    }

    $("#IsRemark").val(0);
}

function clearRemarkB() {
    if ($.trim($("#goodsRemark").val()) == "") {
        $("#goodsRemark").val("Please enter the purchasing information of this item, such as color, size or other requirements.");
    }

    $("#IsRemark").val(0);
}
function clearKeysA() {
    if ($("#goodsUrl").val() == "Please enter the original webpage URL of the item.") {
        $("#goodsUrl").val("");
    }
}
function clearKeysB() {
    if ($("#goodsUrl").val() == "") {
        $("#goodsUrl").val("Please enter the original webpage URL of the item.");
    }
}
function cleanEmpty() {

    $("#goodsName").empty().removeAttr("disabled");
    $("#goodsPricehide").empty().removeAttr("disabled");
    $("#goodsFreighthide").empty().removeAttr("disabled");
    $("#goodsRemark").empty().removeAttr("disabled");
    $("#goodsName").val("");
    $("#goodsNamehide").val("");
    $("#goodsPrice").val("0");
    $("#goodsPricehide").val("0");
    $("#goodsFreight").val("0");
    $("#goodsFreighthide").val("0");
    $("#goodsUrl").val("Please enter the original webpage URL of the item.");
    $("#remarkCheckbox").removeAttr("checked");
    $("#goodsRemark").removeAttr("disabled").val("Please enter the purchasing information of this item, such as color, size or other requirements.");
    // $("#goodsRemark").attr("class", "example");
    $("#firstTip").html("*Attention: Please enter the original webpage URL of the item.Google translated URL will not be recognized.");
    $("#first").css("display", "block");
    $("div[name='goodmessage']").css("display", "none");
    $("#goodsUrl").attr("disabled", "");
    $("#goodsUrl").removeAttr("style");
}
//鎻愪氦鍟嗗搧
var isSubmit = false;
function submitGoods() {
    if (isSubmit == true) {
        return;
    }
    isSubmit = true;
    $("#btnSubmit").attr("disabled", "disabled");
    if ($.trim($("#goodsPricehide").val()) == "" || parseInt($("#goodsPricehide").val(), 10) < 0 || $.trim($("#goodsCounts").val()) == 0) {
        alert("This price must be greater than 0.");
        $("#btnSubmit").removeAttr("disabled");
        isSubmit = false;
        return;
    }
    var DHLInvoiceDescription = $("#DHLInvoiceDescription").val();

    var goodsName = $("#goodsNamehide").val().replace(/&/g, "锛�");

    if (goodsName.length > 150) {
        alert("The item description is not more than 150 characters");
        isSubmit = false;
        return;
    }
    var goodsPrice = $("#goodsPricehide").val();
    var goodsFreight = $("#goodsFreighthide").val();

    var goodsCounts = $("#goodsCounts").val();
    if ($.trim($("#goodsCounts").val()) == "" || parseInt($("#goodsCounts").val(), 10) < 0) {
        alert("This quantity must be greater than 0.");
        $("#btnSubmit").removeAttr("disabled");
        isSubmit = false;
        return;
    }
    var goodsRemark = $.trim($("#goodsRemark").val()) == "Please enter the purchasing information of this item, such as color, size or other requirements." ? "" : $.trim($("#goodsRemark").val());
    if (goodsRemark.length > 500) {
        alert("*Reminder锛歂ote information is too long!");
        $("#btnSubmit").removeAttr("disabled");
        isSubmit = false;
        return;
    }
    var goodsAddress = $("#goodsAddress").val().replace(/&/g, "$");
    if (goodsFreight == 0 || goodsFreight == "") {
        goodsFreight = 12;
    }
    var goodsPhoto = $("#goodsPhoto").attr("src");
    if (goodsName == "") {
        $("#secondTip").html("*Reminder锛欼nput the goods name!");
        alert("Input the goods name!");
        $("#btnSubmit").removeAttr("disabled");
        isSubmit = false;
    } else if ($.trim(goodsPrice) == "") {
        $("#secondTip").html("*Reminder锛欼nput the goods price!");
        alert("Input the goods price!");
        $("#btnSubmit").removeAttr("disabled");
        isSubmit = false;
    } else if (parseFloat(goodsPrice, 10) <= 0) {
        $("#secondTip").html("*Reminder锛歍his price must be greater than 0.!");
        alert("This price must be greater than 0.!");
        $("#btnSubmit").removeAttr("disabled");
        isSubmit = false;
    } else if (goodsFreight == "") {
        $("#secondTip").html("*Reminder锛欼nput the goods freight !");
        alert("Input the goods freight !");
        $("#btnSubmit").removeAttr("disabled");
        isSubmit = false;
    } else if (goodsFreight == "") {
        $("#secondTip").html("*Reminder锛歅urchase quantity can't be empty!");
        alert("Input the goods freight !");
        $("#btnSubmit").removeAttr("disabled");
        isSubmit = false;
    } else if (goodsFreight < 0) {
        $("#secondTip").html("*Reminder锛欸oods freight have to greater than zero!");
        alert("Goods freight have to greater than zero!");
        $("#btnSubmit").removeAttr("disabled");
        isSubmit = false;
    } else if (goodsPrice < 0) {
        $("#secondTip").html("*Reminder锛欸oods price have to greater than zero!");
        alert("Goods price have to greater than zero!");
        $("#btnSubmit").removeAttr("disabled");
        isSubmit = false;
    } else {
        if ($("#OriginalFreight").val() == 0) {
            $("#OriginalFreight").val(goodsFreight);
        }
        var dataStr = "Name=" + goodsName + "&Remark=" + goodsRemark + "&Amount=" + goodsCounts + "&Price=" + goodsPrice + "&Freight=" + goodsFreight + "&Url=" + goodsAddress + "&Photo=" + goodsPhoto + "&Shop=" + $("#Shop").val() + "&ShopUrl=" + $("#ShopUrl").val().replace(/&/g, "$") + "&Source=" + $("#goodsSource").val() + "&OriginalFreight=" + $("#OriginalFreight").val() + "&DHLInvoiceDescription=" + DHLInvoiceDescription;
        $.ajax({
            type: "POST",
            url: "http://shoppingcart.yoybuy.com/shoppingcart/AddGoods",
            data: dataStr,
            success: function (data) {
                if (data.result == true) {
                    $("#sp_proTNum").html(data.data.ProductAmount);
                    $("#sp_proSum").html(data.data.TotalMoney);
                    $("#sp_proPic").attr("src", goodsPhoto);
                    $("#sp_proName").html(data.data.Name);
                    cleanEmpty();
                    goodsIsArr.push(data.data.GoodsId);
                    var firstGoodsIds = $("#goodsIds").val().split(',');
                    firstGoodsIds.push(data.data.GoodsId);
                    $("#goodsIds").val(firstGoodsIds);
                    upPage(1);
                    SumGoods();
                    //RenderGoods(data.data, goodsCounts);
                } else if (data.errcode == 1) {
                    alert("For customer protection, we can't handle orders with (well known) \"brand\" items any more. ");
                } else {
                    alert("Your item added to shoppingcart is failed!");
                }
                isSubmit = false;
            }
        });
    }
};

function helpout() {
    $("#help").removeClass("menu4");
    $("#help").addClass("menu3");
}
function helpover() {
    $("#help").removeClass("menu3");
    $("#help").addClass("menu4");
}
function getFreight() {
    var TotalMoeny = $("#TotalMoeny").html();

    window.open("http://www.yoybuy.com/en/costestimationsmall.html?TotalMoeny=" + TotalMoeny + "", "璁＄畻绐椾綋", "width=550,height=650,left=10,top=2,status=no,scrollbars=yes");
};
function getCookie(objName) {//鑾峰彇鎸囧畾鍚嶇О鐨刢ookie鐨勫€�
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) {
            return unescape(temp[1]);
        }
    }
}

function RefreshCaptcha() {
    var img = $("#captchaimage");
    if (captchaImageSrc == null) {
        captchaImageSrc = img.attr("src");
    }
    img.attr("src", captchaImageSrc + "&" + (new Date()).getTime());
    $("#captcha").val("");
}


function upPage(pageNum) {
    $("#content").html("<img style='margin-left: 370px;' src='http://shoppingcart.yoybuy.com/Content/Images/loadingb.gif' />");
    $.ajax({
        url: "http://shoppingcart.yoybuy.com/ShoppingCart/goods_pageList",
        data: { page: pageNum },
        cache: false,
        success: function (data) {
            $("#content").html(data);
            $("input[name='ckbGoods']").each(function () {
                var obj = $(this);
                var id = obj.attr("value");
                if (isExitInArr(id, goodsIsArr)) {
                    obj.attr("checked", "checked");
                } else {
                    obj.attr("checked", "");
                }
            });
        }
    });
}
$(function () {
    $("[data-saveremark]").live("blur", function (evt) {
        var remark = $(this).val();
        var goodsId = $(this).attr("data-saveremark");

        if (remark.length > 200) {
            alert("Note information is too long");
        }
        else {
            if (remark.length > 0 && goodsId != null) {

                $.post("http://shoppingcart.yoybuy.com/shoppingcart/UpdateRemark",
                    { "goodsId": goodsId, "remark": remark },
                    function (data, textStatus) {
                        if (data.result) {
                            $("#" + goodsId).val(remark.substring(0, 20));
                        } else {
                            alert("Error ,Please retry");
                        }
                    });

            }
        }
    });

});

