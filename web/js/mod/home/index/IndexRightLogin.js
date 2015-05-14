//创建者：于波
//用于首页右侧的欢迎信息

$(document).ready(function () {
    var remark = "";
    var date = new Date().getHours();
    if (0 <= date && date < 12) {
        remark = "Good morning, ";
    }
    else if (12 <= date && date < 17) {
        remark = "Good afternoon, ";
    }
    else if (17 <= date && date < 22) {
        remark = "Good evening, ";
    }
    else {
        remark = "Good night, ";
    }

    $.ajax({
        url: "http://login.yoybuy.com/jsonpindexwelcome",
        dataType: "jsonp",
        cache: false,
        data: {},
        success: function (data) {
            if (data.result == true) {
                $("#indexRightLoginUserName").html(remark + "<a href='http://customercenter.yoybuy.com/en/userindex.html'>" + data.username + "</a>");
                $("#indexRightLoginMessage").html("<a href='http://order.yoybuy.com/order/myorder?type=Message#tabs13' style='float: left; margin-right: 15px;line-height: 20px; color: #333;'><img style='float: left; margin-right: 5px;' src='http://www.yoybuy.com/Content/Images/Index/message.gif' width='31' border='0' height='20' />New message&nbsp;(" + data.msgCount + ")</a>");
            }
            else {
                if (data.username == null || data.username == "") {
                    $("#indexRightLoginUserName").html("Welcome to YOYBUY");
                    $("#indexRightLoginMessage").html("<a href='http://login.yoybuy.com/en/login'><img src='/Content/Images/Index/ligo_in_03.jpg' width='65' height='22' border='0' alt='' /></a> <a href='http://login.yoybuy.com/en/Register'><img src='/Content/Images/Index/ligo_in_05.jpg' width='65' height='22' border='0' alt='' /></a>");
                }
                else {
                    $("#indexRightLoginUserName").html(remark + data.username);
                    $("#indexRightLoginMessage").html("<a href='http://login.yoybuy.com/en/login'><img src='/Content/Images/Index/ligo_in_03.jpg' width='65' height='22' border='0' alt='' /></a> <a href='http://login.yoybuy.com/en/Register'><img src='/Content/Images/Index/ligo_in_05.jpg' width='65' height='22' border='0' alt='' /></a>");
                }
            }
        }
    });
});
