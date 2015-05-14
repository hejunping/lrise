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
        url: "",
        dataType: "jsonp",
        cache: false,
        data: {},
        success: function (data) {
            if (data.result == true) {
                $("#indexRightLoginUserName").html(remark + "<a href=''>" + data.username + "</a>");
                $("#indexRightLoginMessage").html("<a href='' style='float: left; margin-right: 15px;line-height: 20px; color: #333;'><img style='float: left; margin-right: 5px;' src='../web/images/user/message.gif' width='31' border='0' height='20' />New message&nbsp;(" + data.msgCount + ")</a>");
            }
            else {
                if (data.username == null || data.username == "") {
                    $("#indexRightLoginUserName").html("Welcome to iorder");
                    $("#indexRightLoginMessage").html("<a href=''><img src='/web/images/user/ligo_in_03.jpg' width='65' height='22' border='0' alt='' /></a> <a href=''><img src='/web/images/user/ligo_in_05.jpg' width='65' height='22' border='0' alt='' /></a>");
                }
                else {
                    $("#indexRightLoginUserName").html(remark + data.username);
                    $("#indexRightLoginMessage").html("<a href=''><img src='/web/images/user/ligo_in_03.jpg' width='65' height='22' border='0' alt='' /></a> <a href=''><img src='/web/images/user/ligo_in_05.jpg' width='65' height='22' border='0' alt='' /></a>");
                }
            }
        }
    });
});
