var IsPass = false;
var listNum = 8;
function canSubmit(status) {
    var xx = true;
    var arrChk = $("input[name='ckbGoods']");
    var count = 0;
    $(arrChk).each(function () {
        if ($(this).attr("checked")) {
            if (parseInt($(this).attr('state')) != status) {
                alert("You choose the products have not yet carried out in the conduct of the operation you want, please check the submitted!");
                xx = false;
            }
        } else {
            count++;
        }

    });
    if (count == arrChk.length) {
        alert("Please select the goods for processing!");
        xx = false;
    }
    return xx;
}

jQuery.fn.alternateRowColors = function () {
    $("tbody tr:odd", this).removeClass("even").addClass("odd");
    $("tbody tr:even", this).removeClass("odd").addClass("even");
    return this;
};
var isPosting = false;


var orderData = new Array();

function SetOrderDataCache(page) {
    orderData.push(page);
}

function GetOrderDataCache(page) {
    for (var i = 0; i < orderData.length; i++) {
        if (page == orderData[i]) {
            return true;
        }
    }
    return false;
}

function HideOtherOrderData(page) {
    for (var i = 0; i <= orderData.length; i++) {
        var cachepage = orderData[i];
        if (page != cachepage) {
            $("#tabs" + cachepage).hide();
        }
    }
}

function HideAllOrderData() {
    for (var i = 0; i <= orderData.length; i++) {
        var cachepage = orderData[i];
        $("#tabs" + cachepage).hide();
    }
}

function ShowOtherOrderData(page) {
    $("#tabs" + page).show();
}

function ShowLoading() {
    $("#orderloading").show();
}

function HideLoading() {
    $("#orderloading").hide();
}

function LoadOrderData(page) {
    HideAllOrderData();

    if (GetOrderDataCache(page) == false) {
        ShowLoading();

        $.ajax({
            url: "",
            cache: false,
            data: { page: page, type: type },
            success: function (data) {
                SetOrderDataCache(page);
                HideLoading();
                $("#content").append("<div id=\"tabs" + page + "\"></div>");
                $("#tabs" + page).html(data);
            }
        });
    } else {
        ShowOtherOrderData(page);
    }
}
function Jump(num) {
    var url = _MYURL+'?type=_Url_';
    var jumpUrl;
    if (num == 0) {
        jumpUrl = url.replace("_Url_", "0");

    }
    if (num == 1) {
        jumpUrl = url.replace("_Url_", "1");

    }
    if (num == 2) {
        jumpUrl = url.replace("_Url_", "2");

    }
    if (num == 3) {
        jumpUrl = url.replace("_Url_", "3");

    }
    if (num == 4) {
        jumpUrl = url.replace("_Url_", "4");

    }
    if (num == 5) {
        jumpUrl = url.replace("_Url_", "5");
    }
    if (num == 6) {
        jumpUrl = url.replace("_Url_", "6");
    }
    if (num == 7) {
        jumpUrl = url.replace("_Url_", "7");
    }
    if (num == 8) {
        jumpUrl = url.replace("_Url_", "8");
    }
    if (num == 9) {
        jumpUrl = url.replace("_Url_", "9");
    }
    if (num == 11) {
        jumpUrl = url.replace("_Url_", "11");
    }
    if (num == 12) {
        jumpUrl = url.replace("_Url_", "12");
    }
    if (num == 13) {
        jumpUrl = url.replace("_Url_", "13");
    }
    if (num == 14) {
        jumpUrl = url.replace("_Url_", "14");
    }
    if (num == 15) {
        jumpUrl = url.replace("_Url_", "15");
    }
    if (num == 16) {
        jumpUrl = url.replace("_Url_", "16");
    }
    if (num == 17) {
        jumpUrl = url.replace("_Url_", "17");
    }
    window.location.href = jumpUrl + "#tabs" + num;
}

function changeForm(val){
	if(!isNaN(val)){
		 Jump(val);
	}
  
}
$(document).ready(function () {

    LoadOrderData(1);

    if (navigator.userAgent.indexOf('Opera') >= 0) {
        $("#inputinfo").append("<input type=\"text\" id=\"Msg\" style=\"width:440px; background-color: White\" />");
    } else {
        $("#inputinfo").append("<textarea id=\"Msg\" cols=\"2\" rows=\"2\"></textarea>");
    }

    $(".example8").colorbox({ width: "526px;", inline: true, href: "#inline_example1", onClosed: function () { closedBox(); } });

    var typestr = $.query.get("type");

    var urltype = 1;
    if (typestr == "Procuring") {
        urltype = 2;
    } else if (typestr == "Arrived") {
        urltype = 3;
    } else if (typestr == "Refund") {
        urltype = 4;
    } else {
        urltype = 1;
    }
    for (var i = 1; i <= 4; i++) {
        var menu = document.getElementById("two" + i);
        menu.className = i == urltype ? "hover" : "";
        var menua = document.getElementById("twoa" + i);
        menua.style.color = i == urltype ? "#fff" : "#999";
    }
    $('a[rel=tipsy]').tipsy({ gravity: 'e' });
    $("#ShowBox").click(function () {
        alert($("#textFrom").val());
    });
    $("img[id$='Img']").click(function () {
        $(this).attr("src", "http://order.yoybuy.com/Content/Images/MyOrder/talk_b.gif");
        $(this).parent().prev().remove();
        $(this).parent().parent().attr("class", "o_c_j_c");
    });
    $("#showRefundGoodsInfo").dialog({
        autoOpen: false,
        width: 680,
        close: function (event, ui) {
            $("#refundInfo").html("");
        },
        modal: true,
        dialogClass: "my-dialog",
        closeOnEscape: false,
        buttons: {
            "No": function () {
                $(this).dialog("close");
                $("#refundInfo").val("");
            },
            "Yes": function () {
                BatRefund();
            }
        }
    });


    $("#showDelCheck").dialog({
        autoOpen: false,
        width: 680,
        close: function (event, ui) {
            $("#delinfo").html("");
        },
        modal: true,
        dialogClass: "my-dialog",
        closeOnEscape: false,
        buttons: {
            "No": function () {
                $(this).dialog("close");
                $("#delinfo").val("");
            },
            "Yes": function () {
                delstart();

            }
        }
    });

    $("#showSubCheck").dialog({
        autoOpen: false,
        width: 680,
        close: function (event, ui) {
            $("#sendinfo").html("");
        },
        modal: true,
        dialogClass: "my-dialog",
        closeOnEscape: false, //鎸塃SC閿叧闂綋鍓嶇獥鍙�
        buttons: {
            "No": function () {
                $(this).dialog("close");
                $("#sendinfo").val("");
            },
            "Yes": function () {
                $("#thirdFrom").submit();
            }
        }
    });

  

});

function AllSelectOn(checked) {
    if (checked == true) {
        AllSelect();
    } else {
        UnSelect();
    }

}

function AllSelect() {
    $("input[name=ckbGoods]").each(function () {
        if (!$(this).attr('checked')) {
            $(this).attr('checked', 'checked');
        }
    });
}

function UnSelect() {
    $("input[name=ckbGoods]").each(function () {
        if ($(this).attr('checked')) {
            $(this).attr('checked', '');
        }
    });
}

function setalter() {

    if ($("#selectAll").attr("checked") != true) {

        AllSelect();
        $("#selectAll").attr("checked", "checked");
    } else {

        UnSelect();
        $("#selectAll").attr("checked", "");
    }
}

function checkDel() {
    var arrChk = $("input[name='ckbGoods']");
    var idArr = new Array();
    $(arrChk).each(function () {
        if (true == $(this).attr('checked')) {
            idArr.push($(this).val());
        }
    });
    if (idArr == "") {
        alert("Please select the products to delete");
        return;
    }
    $.post(
            'http://order.yoybuy.com/order/CheckDrawback',
            $.param({ "goodsId": idArr }, true),
            function (data, textStatus) {
                var info;
                if (data == "1") {
                    info = "Can not remove the goods";
                } else if (data == "") {
                    info = "Sorry, data acquisition fails, please try later.";
                }
                else if (data == "42") {
                    info = "You can not process the order! Please contact  service department!";
                }
                else {
                    info = data;

                }

                if (data == "" || data == "1" || data == "42") {
                    $("#showDelCheck").dialog("option", "buttons", {
                        "OK": function () {
                            $(this).dialog("close");
                        }
                    });
                } else {
                    $("#showDelCheck").dialog("option", "buttons", {
                        "No": function () {
                            $(this).dialog("close");
                            $("#delinfo").val("");
                        },
                        "OK": function () { delstart(); }
                    });
                }
                $("#delinfo").html(info);
                convertitemdel();
                $("#showDelCheck").dialog('open');
            }
        );
}

function checkDelin(checkid) {
    var idArr = new Array();
    idArr.push(checkid);
    var checkonlyname = "#ckbGoods" + checkid;

    var arrChk = $("input[name='ckbGoods']");

    $(arrChk).each(function () {
        $(this).attr('checked', false);
    });

    $(checkonlyname).attr("checked", "checked");


    if (idArr == "") {
        alert("Please select the products to delete");
        return;
    }
    $.post(
            'http://order.yoybuy.com/order/CheckDrawback',
            $.param({ "goodsId": idArr }, true),
            function (data, textStatus) {
                var info;
                if (data == "1") {
                    info = "Can not remove the goods";
                }
                else if (data == "") {
                    info = "Sorry, data acquisition fails, please try later.";
                }
                else if (data == "42") {
                    info = "You can not process the order! Please contact  service department!";
                }
                else {
                    info = data;

                }

                if (data == "" || data == "1" || data == "42") {
                    $("#showDelCheck").dialog("option", "buttons", { "OK": function () {
                        $(this).dialog("close");
                    }
                    });
                }
                else {
                    $("#showDelCheck").dialog("option", "buttons", { "No": function () { $(this).dialog("close"); $("#delinfo").val(""); }, "OK": function () { delstart(); } })
                }
                $("#delinfo").html(info);
                convertitemdel();
                $("#showDelCheck").dialog('open');

            }
        );
}



function BatRefund() {
    $("#showRefundGoodsInfo").dialog("option", "buttons", {});
    $("#refundInfo").html("Waiting.. ...<br/><img src='http://order.yoybuy.com/Content/Images/MyOrder/loading2.gif' />");
    var arrChk = $("input[name='ckbGoods']");
    var idArr = new Array();
    $(arrChk).each(function () {
        if (true == $(this).attr('checked')) {
            idArr.push($(this).val());
        }
    });

    $.post('http://order.yoybuy.com/order/SubmitRefund',
            $.param({ "goodsId": idArr }, true),
            function (data, textStatus) {
                $("#refundInfo").html(data);
                $("#showRefundGoodsInfo").dialog("option", "buttons", { "OK": function () {
                    $(this).dialog("close"); window.location.reload();
                }
                });
            }
        );
}

function convertitemdel() {
    var itemsname = $("span[name='itemtotal']");

    $(itemsname).each(function () {
        $(this).text(FormatNum(CNYtoUSDConstr($(this).text()), 2));
    });


    $("#sumtotle").text(FormatNum(CNYtoUSDConstr($("#sumtotle").text()), 2));
}

function readMsgBody(id) {
    $.post('http://order.yoybuy.com/order/GetMessById',
            $.param({ "messageId": id }, true),
            function (data, textStatus) {
                $("#infoboxid").html(data);
            }, "html");
    checkIsNew();
}

function checkIsNew() {
    $.post('http://order.yoybuy.com/order/CheckIsNew',
            {},
            function (data, textStatus) {
                if (data[0] == "1") {
                    $("#isNew2").html("New");
                }
                else {
                    $("#isNew2").html("");
                }
                if (data[1] == "1") {
                    $("#isNew3").html("New");
                }
                else {
                    $("#isNew3").html("");
                }
                if (data[2] == "1") {
                    $("#isNew4").html("New");
                }
                else {
                    $("#isNew4").html("");
                }
                if (data[3] == "1") {
                    $("#isNew5").html("New");
                }
                else {
                    $("#isNew5").html("");
                }
                if (data[4] == "1") {
                    $("#isNew6").html("New");
                }
                else {
                    $("#isNew6").html("");
                }

            }, "json"
        );
}

function Img_onclick(target, state) {
    $("#Tishi").hide().text("").fadeIn("slow");
    $("#infoboxid").html(" <div class='ly'><div class='ly_name'> <ul> <li></li></ul></div><div class='ly_center'  >Waiting... ...<br/><img src='/Content/Images/MyOrder/loading2.gif' /> </div></div>");
    var messageId = $(target).attr('msgId');
    var goodsId = $(target).attr('goodsId');
    setIMGNAME(goodsId);
    $("#goodsId").val(goodsId);
    $("#messageId").val(messageId);
    if (messageId == 0) {
        $("#infoboxid").html(" <div class='ly'><div class='ly_name'> <ul> <li></li></ul></div><div class='ly_center'  >&nbsp;&nbsp;If you have any questions or suggestions about this item, please send messages here to us. We will reply you as soon as possible. Thank you.</div></div>");
    }
    else {

        $(target).parent().prev().remove();
        $(target).parent().parent().attr("class", "o_c_j_c");
        $(target).attr('src', 'http://order.yoybuy.com/Content/Images/MyOrder/talk_b.gif');
        readMsgBody(messageId);
    }

    if (state != 32 && state != -32 && state != -64 && state!=128) {
        $("#spannote").text("NOTE: We will reply in 24H.Please check it anytime.");
        $("#sendinginfos").attr("disabled", "");
        $("#sendimg").css("display", "block");
    }
    else if(state==32) {
        $("#spannote").text("Note:This is Chat history .(You can not send message after the goods arrived )");
        $("#sendinginfos").attr("disabled", "disabled");
        $("#sendimg").css("display", "none");
    }else
    {
        $("#spannote").text("Note:This is Chat history .(You can not send message after the goods refunded )");
        $("#sendinginfos").attr("disabled", "disabled");
        $("#sendimg").css("display", "none");
    }
    $(".example8").colorbox({ width: "526px;", inline: true, href: "#inline_example1", onClosed: function () { closedBox(); } });
}

function CNYtoUSDConstr(CNY) {
    return CNY / 6.25;
}

function debt(id, debt, bals) {

    var balance = $("#balance").val();
    var bal = parseFloat(balance);
    var cost = parseFloat(FormatNum(CNYtoUSDConstr(debt), 2));
    var cha = cost - bal;
    if (cost >= 0) {
        if (cost > bal && cha >= 0) {
            alert("Your balance is " + balance + "USD, need to supplement the amount of " + FormatNum(CNYtoUSDConstr(debt), 2) + "USD, please recharge.");
            window.location = 'http://account.yoybuy.com/en/AddMoney';
        }
        else {
            if (confirm("Are you Sure you want to pay " + FormatNum(CNYtoUSDConstr(debt), 2) + "USD")) {
                $.post('http://order.yoybuy.com/order/Refund',
				    	$.param({ "goodsId": id }, true),
				    	function (data, textStatus) {
				    	    if (data == 0) {
				    	        window.location.reload();
				    	    }
				    	    else if (data == -1) {
				    	    }
				    	    else if (data == -2) {
				    	        alert("Sorry ,the item can not refund");
				    	    }
				    	    else if (data == 42) {
				    	        alert("You can not process the order! Please contact  service department!");
				    	    }
				    	    else {
				    	        alert("Sorry, your balance has been inadequate, is still owed " + FormatNum(CNYtoUSDConstr(data), 2) + " USD");
				    	        window.location = 'http://account.yoybuy.com/en/AddMoney';
				    	    }
				    	}
			    );
            }
        }
    }
    if (bals == 0 && debt == 0) {

    }

}

function delstart() {
    $("#showDelCheck").dialog("option", "buttons", {});

    $("#delinfo").html("Waiting... ...<br/><img src='http://order.yoybuy.com/Content/images/myorder/loading2.gif' />");
    var arrChk = $("input[name='ckbGoods']");
    var idArr = new Array();
    $(arrChk).each(function () {
        if (true == $(this).attr('checked')) {
            idArr.push($(this).val());
        }
    });


    $.post('http://order.yoybuy.com/order/DelGoodsFromOrder',
                        $.param({ "goodsIds": idArr }, true),
                        function (data, textStatus) {
                            if (data) {
                                $("#delinfo").html("1.	You have succesfully deleted the item(s). The money has been refunded to your account, please check that carefully.");
                            }
                            else {
                                $("#delinfo").html("Sorry ~ Goods deletion error, or system anomalies, please refresh and try again or contact the administrator.");
                            }
                        }, "json"
                    );

    $("#showDelCheck").dialog("option", "buttons", { "OK": function () {
        $(this).dialog("close");
        window.location.reload();
    }
    });
}

function FormatNum(Num1, Num2) {
    if (isNaN(Num1) || isNaN(Num2)) {
        return (0);
    } else {
        Num1 = Num1.toString();
        Num2 = parseInt(Num2);
        if (Num1.indexOf('.') == -1) {
            return (Num1);
        } else {
            var b = Num1.substring(0, Num1.indexOf('.') + Num2 + 1);
            var c = Num1.substring(Num1.indexOf('.') + Num2 + 1, Num1.indexOf('.') + Num2 + 2);
            //alert(b);
            //alert(c);
            if (c == "") {
                return (b);
            } else {
                if (parseInt(c) < 5) {
                    return (b);
                } else {
                    return ((Math.round(parseFloat(b) * Math.pow(10, Num2)) + Math.round(parseFloat(Math.pow(0.1, Num2).toString().substring(0, Math.pow(0.1, Num2).toString().indexOf('.') + Num2 + 1)) * Math.pow(10, Num2))) / Math.pow(10, Num2));
                }
            }
        }
    }
}

function setIMGNAME(goodsidin) {
    var imgurl = $("#itemsimg" + goodsidin).attr("src");
    var itemssname = $("#itemnames" + goodsidin).html();

    $("#boximgin").attr("src", imgurl);

    $("#boxnamein").html(itemssname);
}

function closedBox() {
    $("#infoboxid").html(" <div class='ly'><div class='ly_name'> <ul> <li></li></ul></div><div class='ly_center'  >Waiting... ...<br/><img src='/Content/images/loading2.gif' /> </div></div>");
    $("#sendinginfos").val("");
    $("#Tishi").hide().text("").fadeIn("slow");
}

function checksub() {
    var arrChk = $("input[name='ckbGoods']");
    var ckbGoodsList = new Array();
    var item = 0;
    $(arrChk).each(function () {
        if (true == $(this).attr('checked')) {
            ckbGoodsList.push(parseInt($(this).val(), 10));
            item += 1;
        }
    });
    if (item == 0) {
        alert("Please select the goods for processing");
        return;
    }
    $.post('http://order.yoybuy.com/order/CheckSending',
          $.param({ "goodsId": ckbGoodsList }, true),
          function (data, textStatus) {
              var info;
              if (data == "1") {
                  info = "No need to handle shipments of goods, check";
              }
              else if (data == "") {
                  info = "Sorry, data acquisition fails, please try again later.";
              }
              else if (data == "2") {
                  info = "Your balance is not sufficient,please add money to your yoybuy account soon.";
              }
              else if (data == "-9") {
                  info = "Some items can not be submitted,check";
              }
              else if (data == "42") {
                  info = "You can not process the order! Please contact  service department!";
              }
              else {
                  info = "Waiting... ...<br/><img src='http://order.yoybuy.com/Content/images/myorder/loading2.gif' />";
              }
              $("#sendinfo").html(info);
              if (data == "" || data == 1 || data == -9 || data == 42 || data == 2) {
                  $("#showSubCheck").dialog("option", "buttons", { "OK": function () {
                      $(this).dialog("close");
                  }
                  });
              }
              else {
                  $("#showSubCheck").dialog("option", "buttons", {});
                  $("#ckbGoodsList").val(ckbGoodsList);
                  $("#thirdFrom").submit();
              }
              $("#showSubCheck").dialog('open');
          }
         );
}
$("a[id^='del_']").live("click", function () {
    var obj = $(this);
    var goodsId = $.trim(obj.attr("id").split('_')[1]);
    var tableId = $.trim(obj.attr("id").split('_')[2]);
    var flag = 0;
    $.post("http://order.yoybuy.com/Order/DeleteGoods",
        $.param({ goods_id: goodsId }, true), function (data) {
            if (data.flag == "true") {
                $("#div_" + goodsId + "_" + tableId).hide();
                $("#reason_" + goodsId + "_" + tableId).hide();
                $("#table" + tableId + ">div[name='content']").each(function () {
                    if (!$(this).is(":hidden")) {
                        flag++;
                    }
                });
                if (flag == 0) {
                    $("#table" + tableId).next().attr("style", "display:none");
                }
                alert("The item is deleted successfully!");
            }
            else {
                alert("error!");
            }
        }, "json");

});


function ShowOrderTime(id) {
    var eTop = $("#" + id).find("img").offset().top;
    var eLeft = $("#" + id).find("img").offset().left;
    eLeft = eLeft + 15;
    eTop = eTop - 17;
    $("#blk").css({ "position": "absolute" }).animate({ left: eLeft, top: eTop, opacity: "show" }, 1);
    $.post('http://order.yoybuy.com/order/GetOrderTimes',
                        { goodsId: id },
                        function (data) {
                            if (data) {
                                $("#blk").show();
                                $("#blk").html(data);
                            } else {
                                alert("Error ,Please retry");
                            }
                        }, "json");


};
function HiddenOrderTime() {
    $("#blk").animate({ left: 0, top: 0, opacity: "hide" }, 1);
    $("#blk").html("<div style='text-align: center; width: 100%;'><img src='http://order.yoybuy.com/Content/Images/MyOrder/loadingb.gif' /></div>");
}
