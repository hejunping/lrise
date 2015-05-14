
var loadImg = "<img src=\"http://login.yoybuy.com/Content/Images/Login/zoomloader.gif\" width=\"16\" height=\"16\" />";
var signupImg = "<img onclick=\"submit()\" style=\"cursor: pointer\" src=\"http://login.yoybuy.com/Content/Images/Register/signup_03.jpg\"/>";

function CheckUserName() {
    var zhengze = "^[a-zA-Z0-9]((.*)?[a-zA-Z0-9]$)?";
    var zhengze2 = "^[a-zA-Z0-9_]*$";
    var zhengze3 = "^.{0,30}$";
    if ($("#userName").val() == null || $("#userName").val() == "") {
        $("#userNameErrorMessage").html("*请输入您的用户名.");
        $("#userNameSpan").html("");
        isCheckName = false;
    }
    else if (!$("#userName").val().match(zhengze)) {
        $("#userNameErrorMessage").html("*用户名不能以空格，下划线，破折号开始或结束.");
        $("#userNameSpan").html("");
        isCheckName = false;
    }
    else if (!$("#userName").val().match(zhengze2)) {
        $("#userNameErrorMessage").html("*用户名只能用字母、数字、下划线组成.");
        $("#userNameSpan").html("");
        isCheckName = false;
    }
    else if (!$("#userName").val().match(zhengze3)) {
        $("#userNameErrorMessage").html("*用户名应少于30个字符.");
        $("#userNameSpan").html("");
        isCheckName = false;
    }
    else {
        $("#userNameErrorMessage").html("检查用户名...");
        $("#userNameSpan").html("");
        var url = $("#address").attr("url");
        var turl = $("#address").attr("turl");
        var sign = false;
        isCheckName = false;
        $.ajax({
            url: url,
            data: { sign:sign,account: $("#userName").val() },
            dataType:"json",
            type: "POST",
            success: function (data) {
                if (data.result == false) {
                    $("#userNameErrorMessage").html("*用户名已存在，请重新输入.");
                    $("#userNameSpan").html("");
                    isCheckName = false;
                }
                else if (data.result == true) {
                    $("#userNameErrorMessage").html("");
                    $("#userNameSpan").html("<img src='http://login.yoybuy.com/Content/Images/Register/DG_07.jpg' />");
                    isCheckName = true;
                }
            },
            error: function () {
                alert("对不起!系统繁忙，请稍后再试.");
                isCheckName = false;
            }
        });
    }
}

function CheckPassword() {
    var password = $("#password");
    var repassword = $("#repassword");
    var passwordErrorMessage = $("#passwordErrorMessage");
    var passwordSpan = $("#passwordSpan");
    var repasswordSpan = $("#repasswordSpan");
    var repasswordErrorMessage = $("#repasswordErrorMessage");
    var zhengze = "^.{0,5}$";
    var zhengze2 = "^.{0,30}$";
    if (password.val() == null || password.val() == "") {
        passwordErrorMessage.html("*请输入密码!");
        passwordSpan.html("");
        repasswordSpan.html("");
        checkPassword = false;
    }
    else {
        passwordErrorMessage.html("");
        if (password.val().match(zhengze)) {
            passwordErrorMessage.html("*密码必须至少大于6个字符，请重新输入.");
            passwordSpan.html("");
            repasswordSpan.html("");
            checkPassword = false;
        }
        else if (!password.val().match(zhengze2)) {
            passwordErrorMessage.html("*密码必须少于30个字符，请重新输入.");
            passwordSpan.html("");
            repasswordSpan.html("");
            checkPassword = false;
        }
        else {
            checkPassword = true;
            passwordErrorMessage.html("");
            repasswordErrorMessage.html("");
            var n = 0;
            if (password.val().match(/\d/)) n++;
            if (password.val().match(/[a-zA-Z]/)) n++;
            if (password.val().match(/\W/)) n++;
            if (n == 1) {
                passwordSpan.removeClass("aq_yb");
                passwordSpan.removeClass("aq_gj");
                passwordSpan.addClass("aq_wx");
                passwordSpan.html("<h5>Weak</h5><h3></h3><h4></h4><h4></h4>");
            }
            else if (n == 2) {
                passwordSpan.removeClass("aq_wx");
                passwordSpan.removeClass("aq_gj");
                passwordSpan.addClass("aq_yb");
                passwordSpan.html("<h5>Medium</h5><h3></h3><h3></h3><h4></h4>");
            }
            else if (n == 3) {
                passwordSpan.removeClass("aq_wx");
                passwordSpan.removeClass("aq_yb");
                passwordSpan.addClass("aq_gj");
                passwordSpan.html("<h5>Strong</h5><h3></h3><h3></h3><h3></h3>");
            }
            if (repassword.val() != null && repassword.val() != "") {
                if (repassword.val() != password.val() && password.val() != null && password.val() != "") {
                    repasswordErrorMessage.html("密码不匹配.");
                    repasswordSpan.html("");
                }
                else {
                    repasswordErrorMessage.html("");
                    repasswordSpan.html("<img src='http://login.yoybuy.com/Content/Images/Register/DG_07.jpg' />");
                }
            }
        }
    }
}

function CheckRePassword() {
    var zhengze = "^.{0,5}$";
    var zhengze2 = "^.{6,30}$";
    if ($("#password").val() == null || $("#password").val() == "") {
        if ($("#repassword").val() == null || $("#repassword").val() == "") {
            $("#repasswordErrorMessage").html("*请输入密码!");
            $("#repasswordSpan").html("");
            checkRePassword = false;
        }
        else {
            if ($("#repassword").val().match(zhengze)) {
                $("#repasswordErrorMessage").html("*密码必须至少大于6个字符，请重新输入.");
                $("#repasswordSpan").html("");
                checkRePassword = false;
            }
            else if (!$("#repassword").val().match(zhengze2)) {
                $("#repasswordErrorMessage").html("*密码必须少于30个字符，请重新输入.");
                $("#repasswordSpan").html("");
                checkRePassword = false;
            }
            else {
                $("#repasswordErrorMessage").html("");
                $("#repasswordSpan").html("<img src='http://login.yoybuy.com/Content/Images/Register/DG_07.jpg' />");
                checkRePassword = true;
            }
        }
    }
    else if ($("#password").val() != null || $("#password").val() != "") {
        if ($("#repassword").val() == null || $("#repassword").val() == "") {
            $("#repasswordErrorMessage").html("*请输入密码!");
            $("#repasswordSpan").html("");
            checkRePassword = false;
        }
        else if ($("#repassword").val() != $("#password").val()) {
            $("#repasswordErrorMessage").html("密码不匹配.");
            $("#repasswordSpan").html("");
            checkRePassword = false;
        }
        else {
            if ($("#repassword").val().match(zhengze)) {
                $("#repasswordErrorMessage").html("*密码必须至少大于6个字符，请重新输入.");
                $("#repasswordSpan").html("");
                checkRePassword = false;
            }
            else if (!$("#repassword").val().match(zhengze2)) {
                $("#repasswordErrorMessage").html("*密码必须少于30个字符，请重新输入.");
                $("#repasswordSpan").html("");
                checkRePassword = false;
            }
            else {
                if ($("#repassword").val() == $("#password").val()) {
                    $("#repasswordErrorMessage").html("");
                    $("#repasswordSpan").html("<img src='http://login.yoybuy.com/Content/Images/Register/DG_07.jpg' />");
                    checkRePassword = true;
                }
                else {
                    $("#repasswordErrorMessage").html("密码不匹配.");
                    $("#repasswordSpan").html("");
                    checkRePassword = false;
                }
            }
        }
    }
}

function CheckCountry() {
    if ($("#country").val() == 0) {
        $("#countryErrorMessage").html("*请选择国家.");
        $("#countrySpan").html("");
        checkCountry = false;
    }
    else {
        $("#countrySpan").html("<img src='http://login.yoybuy.com/Content/Images/Register/DG_07.jpg' />");
        $("#countryErrorMessage").html("");
        checkCountry = true;
    }
}

function CheckEmail() {
    var emailZhengZe = "^([0-9a-zA-Z-_.])+@[0-9a-zA-Z-.]+$";
    if ($("#email").val() == null || $("#email").val() == "") {
        $("#emailErrorMessage").html("*请输入您的电子邮件箱地址.");
        $("#emailSpan").html("");
        checkEmail = false;
    }
    else if (!$("#email").val().match(emailZhengZe)) {
        $("#emailErrorMessage").html("*您的电子邮箱地址错误.");
        $("#emailSpan").html("");
        checkEmail = false;
    }
    else if ($("#email").val().length > 50) {
        $("#emailErrorMessage").html("*电子邮箱地址不能多于50个字符，请重新输入.");
        $("#emailSpan").html("");
        checkEmail = false;
    }
    else {
        $("#emailErrorMessage").html("检查邮箱...");
        $("#emailSpan").html("");
        var url = $("#address").attr("url");
        var turl = $("#address").attr("turl");
        var sign = false;
        checkEmail = false;
        $.ajax({
            url: url,
            data: { sign:sign,email: $("#email").val() },
            dataType:"json",
            type: "POST",
            success: function (data) {
            	
                if (data.result == true) {
                    $("#emailErrorMessage").html("");
                    $("#emailSpan").html("<img src='http://login.yoybuy.com/Content/Images/Register/DG_07.jpg' />");
                    checkEmail = true;
                }
                else if (data.result == false) {
                    $("#emailSpan").html("");
                    $("#emailErrorMessage").html("*邮箱已注册，请重新输入.");
                    checkEmail = false;
                }
            },
            error: function () {
                alert("对不起!系统繁忙，请稍后再试.");
                checkEmail = false;
            }
        });
    }
}

function CheckBox() {
	
    if ($("#agreeCheckbox").attr("checked")) {
        $("#agreeCheckboxErrorMessage").html("");
    }
    else {
        $("#agreeCheckboxErrorMessage").html("*请选中此复选框以接受条款IOrder!");
    }
}



