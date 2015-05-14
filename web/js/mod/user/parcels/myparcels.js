function debt(id, debt) {

    if (confirm("Are you sure you want to pay " + id + " " + debt + " USD")) {
        $.post('http://order.yoybuy.com/order/PaySecondFeight',
				    $.param({ "orderId": id }, true),
	                    function (data) {

	                        if (data == 1) {
	                            alert("You have paid successfully. Anything else, please contact with customer service.");
	                            window.location.reload();
	                        } else if (data == -1 && data == 0 && data == -3) {
	                            alert("Fill section fails, please try again later or contact customer service");
	                        } else if (data == -2) {
	                            alert("The items without replenishment");
	                        } else if (data == 42) {
	                            alert("You can not process the parcel! Please contact  service department!");
	                        }
	                        else {
	                            alert("Sorry, your balance has been inadequate, is still owed " + FormatNum(CNYtoUSDConstr(data), 2) + " USD");
	                            window.location = "http://account.yoybuy.com/en/AddMoney";
	                        }

	                    }
			    );
    }
}
function showdatenow() {
    var em = $("#crEM");
    var ed = $("#crED");
    var ey = $("#crEY");

    date = new Date();

    ed.val(date.getDate());
    ey.val(date.getFullYear());

    em.val(date.getMonth() + 1);


}

var isPosting = false;
$(document).ready(function () {//鑾峰彇杩愬崟鐨勭姸鎬侊紒
    showdatenow();
    if (navigator.userAgent.indexOf('Opera') >= 0) {
        $("#inputinfo").append("<input type=\"text\" id=\"Msg\" style=\"width:440px; background-color: White\" />");
    }
    else {
        $("#inputinfo").append("<textarea id=\"Msg\" cols=\"2\" rows=\"2\"></textarea>");
    }
    $("#crSD").keyup(function () {
        $(this).val($(this).val().replace(/[^\d\.]/g, ''));
    });
    $("#crSY").keyup(function () {
        $(this).val($(this).val().replace(/[^\d\.]/g, ''));
    });

    $("#crED").keyup(function () {
        $(this).val($(this).val().replace(/[^\d\.]/g, ''));
    });
    $("#crEY").keyup(function () {
        $(this).val($(this).val().replace(/[^\d\.]/g, ''));
    });



    $('#MsgDiv').dialog({
        autoOpen: false,
        width: 480,
        close: function (event, ui) {
            $("#Msg").val("");
        },
        modal: true,
        closeOnEscape: false, //鎸塃SC閿叧闂綋鍓嶇獥鍙�
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
                $("#Msg").val("");
            },
            "Submit": function () {

                if (isPosting) {
                    $("#Tishi2").hide().html("Please do not send text messages to repeat!").hide("hightlight", { duration: 3000 });
                    return;
                }
                $("#Tishi2").hide().html("Sending....").fadeIn();
                var message = $("#Msg").val();
                $("#Msg").val("");
                if (message != "") {
                    var orderId = $("#orderIdhidden").val();
                    var messageId = $("#messageId").val();
                    isPosting = true;

                    $.post('http://order.yoybuy.com/order/SendMessageAboutOrder',
                $.param({ "message": message, "orderId": orderId, "messageId": messageId }, true),
                function (data, textStatus) {
                    if (data != 0) {
                        readMsgBody(data);
                        var options = {};
                        $("#messageId").val(data);

                        $("#Tishi2").html("Successfully!");
                        $("#" + orderId + "Img").attr("msgId", data)
                        $("#Tishi2").hide("highlight", options, 3000);
                    }
                    else {
                        alert("Error , please try again later");
                    }
                    isPosting = false;
                }, "json");
                }
                else {
                    $("#Tishi2").html("Nothing here!");

                    $("#Tishi2").hide("highlight", options, 3000);
                    isPosting = false;
                }
            }
        }
    });

    $('#Confure').dialog({
        autoOpen: false,
        width: 350,
        close: function (event, ui) {
            window.location.reload();
        },
        modal: true,
        closeOnEscape: false, //鎸塃SC閿叧闂綋鍓嶇獥鍙�
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
                window.location.reload();
            },
            "Add credit evaluation": function () {
                var orderIds = $("#orderIdforPingjia").val();
                var jumpurl = $("#JumpUrl").val();
                var enurl = jumpurl.replace("_url_", orderIds);
                window.location = enurl;
            }
        }
    });

});

function Confirmat(str) {
    $("#JumpUrl").val('http://http://order.yoybuy.com/en/order/appraise?orderid = "_url_"');
    if (confirm("Are you sure you received the package?")) {
        $("#orderIdforPingjia").val(str);
        $.post('http://order.yoybuy.com/order/ConfirmationReceipt',
                $.param({ "orderId": str }),
                function (data) {
                    if (data != -1 && data != 42) {
                        $("#integal").html(data);
                        window.location.href = "/en/appraise?orderId=" + str + "&integal=" + data;
                    }
                    else if (data == 42) {
                        alert("You can not process the Parcel! Please contact  service department!");
                    }
                    else {
                        alert("Error, please try again later");
                    }

                });
    }
}


function Img_onclick(target) {
    var messageId = $(target).attr('msgId');
    var orderId = $(target).attr('orderId');
    $("#orderIdhidden").val(orderId);
    $("#messageId").val(messageId);
    if (messageId == 0) {
        $("#messageBody").html("<div class='sendCon' ><div  style='padding-top:120px'>&nbsp;&nbsp;&nbsp;Leave a message here</div></div>");
        ShowMsgDiv();
    }
    else {
        $(target).attr('src', 'http://order.yoybuy.com/Content/Images/MyParcels/mag.gif');
        $(target).attr('title', 'Show Message');

        readMsgBody(messageId);
    }
}

function ShowMsgDiv() {
    $('#MsgDiv').dialog('open');
    $("#dia").attr('scrollTop', $("#dia").attr('scrollHeight'));
}

function readMsgBody(id) {
    $.post('http://order.yoybuy.com/order/GetMessAboutOrderById',
			    { "messageId": id },
			    function (data, textStatus) {
			        $("#messageBody").html(data);
			        ShowMsgDiv();
			    }, "html");
}

function checkIsInsure() {
    var all = $("#txtAllCost").val();
    var notAll = $("#txtFrieght").val();
    var baoxian = $("#txtBaoxian").val();
    if ($("#IsInsure").attr("checked") == true) {
        $("#ShouldPay").html(all);
        $("#LastCost").val(all);
        $("#RealBaoxian").val(baoxian);
    }
    else {
        $("#ShouldPay").html(notAll);
        $("#LastCost").val(notAll);
        $("#RealBaoxian").val("0");
    }
    if (parseFloat($("#LastCost").val()) > parseFloat($("#Yue").val())) {
        $("#IsSub").val(0);
        $("#Tishi").css("display", "block");
    }
    else {
        $("#IsSub").val(1);
        $("#Tishi").css("display", "none");
    }
}

$(function () {
    $("a[id^=View]").click(function () {
        $("#inline_example1").html("<div class='view'><h4>Feedback Details</h4><img src='http://order.yoybuy.com/Content/images/myparcels/loading2.gif' /></div>");
        $.post("http://order.yoybuy.com/Order/GetLeaveMessage", { OrderId: $(this).attr('id').split('_')[1] }, function (data) {
            if (data.Content != "" && data.Message == "true") {
                $("#inline_example1").html(data.Content);
            }
            else if (data.Message == "none") {
                $("#inline_example1").html("<div class='view'><h4>Feedback Details</h4><h2><span></span></h2><ul><li style='line-height:400px;text-align:center; font-size:14px;'>&nbsp;&nbsp;&nbsp;&nbsp;There is no feedback about this parcel锛�</li></ul>");
            }
            else {
                alert("鍔犺浇澶辫触");
            }
        }, "json");
    });
    $("a[id^=View]").colorbox({ width: "511px;", inline: true, href: "#inline_example1" });
});

function crsobmit() {
    var startTime = $.trim($("#crStartDateTimeT").val());
    var endTime = $.trim($("#crEndDateTimeT").val());

    if (startTime == "") {
        alert("Please select the start date .");

    } else if (endTime == "") {
        alert("Please select the end date .");

    } else if (startTime < 2010 || endTime > 2099) {
        alert("The start year should be greater then 2010 and less then 2099.");

    } else if (CompareDate(startTime, endTime)) {
        alert("The start time can not be later then the end time .");

    } else {
        $("#crForm").submit();

    }

}
function CompareDate(d1, d2) { // 鏃堕棿姣旇緝鐨勬柟娉曪紝濡傛灉d1鏃堕棿姣攄2鏃堕棿澶э紝鍒欒繑鍥瀟rue
    return Date.parse(d1.replace(/-/g, "/")) > Date.parse(d2.replace(/-/g, "/"));
}


function Limit(id) {
    $.post('http://order.yoybuy.com/order/Limit',
        $.param({ "Id": id }),
         function (data) {
             if (data.result == false) {
                 alert("You can not process the Parcel! Please contact  service department!");
             }
             if (data.result == true) {
                 window.location.href = "http://order.yoybuy.com/en/Appraise?orderId=" + id;
             }
         });

}
function CancelOrder(orderId, userId, object) {
    if (confirm("Are you sure to cancel? If yes, the money will be refunded to your account.")) {
        $.post('http://order.yoybuy.com/order/OrderOverruleStatus', { orderId: orderId, userId: userId },
            function (data) {
                if (data.result == "Success") {
                    $("#" + orderId).css("color", "#999");
                    $("#" + orderId).html("Cancelled");
                    $(object).parent().html("<a style='margin-left: 80px; cursor: pointer'>--</a>");
                } else {
                    //alert(data.result);
                    alert("Your parcel is processing, please waiting for receiving it.");
                    $("#" + orderId).html("Processing");
                    $(object).parent().html("<a style='margin-left: 80px; cursor: pointer'>--</a>");
                }
            }, "json");
    }
}

function ShowParcelTime(trakingid) {

    var eTop = $("#" + trakingid).find("img").offset().top;
    var eLeft = $("#" + trakingid).find("img").offset().left;
    eLeft = eLeft + 15;
    eTop = eTop - 17;
    $("#blk").css({ "position": "absolute" }).animate({ left: eLeft, top: eTop, opacity: "show" }, 1);
    $.post('http://order.yoybuy.com/order/GetParcelTimes',
                        { trakingId: trakingid },
                        function (data) {
                            if (data) {
                                $("#blk").show();
                                $("#blk").html(data);
                            } else {
                                alert("Error ,Please retry");
                            }
                        }, "json");

};
function HiddenParcelTime() {

    $("#blk").animate({ left: 0, top: 0, opacity: "hide" }, 1);
    $("#blk").html("<div style='text-align: center; width: 100%;'><img src='http://order.yoybuy.com/Content/Images/MyOrder/loadingb.gif' /></div>");
}
$("a[id^='del_']").live("click", function () {
    var obj = $(this);
    var trakingId = $.trim(obj.attr("id").split("_")[1]);
    $.ajax({
        url: "/order/deleterefundedparcel",
        cache: false,
        data: { trackingId: trakingId },
        dataType: "json",
        type: "POST",
        success: function (data) {
            if (data.result == true) {
                alert("delete success!");
                $("#div_" + trakingId).css("display", "none");
            } else {
                alert("delete fail");
            }
        }, error: function () {
            alert("error");
        }
    });

})
