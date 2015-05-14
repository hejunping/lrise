
var loadImg = "<img src=\"web/images/home/zoomloader.gif\" width=\"16\" height=\"16\" />";
var signupImg = "<img onclick=\"submit()\" style=\"cursor: pointer\" src=\"web/images/signup_03.jpg\"/>";

function CheckUserName() {
    var zhengze = "^[a-zA-Z0-9]((.*)?[a-zA-Z0-9]$)?";
    var zhengze2 = "^[a-zA-Z0-9_]*$";
    var zhengze3 = "^.{0,30}$";
    if ($("#userName").val() == null || $("#userName").val() == "") {
        $("#userNameErrorMessage").html("*Please enter your user name.");
        $("#userNameSpan").html("");
        isCheckName = false;
    }
    else if (!$("#userName").val().match(zhengze)) {
        $("#userNameErrorMessage").html("*User Name cannot start or end with a period, underscore or dash.");
        $("#userNameSpan").html("");
        isCheckName = false;
    }
    else if (!$("#userName").val().match(zhengze2)) {
        $("#userNameErrorMessage").html("*Letters,numbers,underscore only.");
        $("#userNameSpan").html("");
        isCheckName = false;
    }
    else if (!$("#userName").val().match(zhengze3)) {
        $("#userNameErrorMessage").html("*User name should less than 30 characters.");
        $("#userNameSpan").html("");
        isCheckName = false;
    }
    else {
        $("#userNameErrorMessage").html("Checking user name...");
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
                    $("#userNameErrorMessage").html("*This username is already in use, please re-enter.");
                    $("#userNameSpan").html("");
                    isCheckName = false;
                }
                else if (data.result == true) {
                    $("#userNameErrorMessage").html("");
                    $("#userNameSpan").html("<img src='web/images/home/DG_07.jpg' />");
                    isCheckName = true;
                }
            },
            error: function () {
                alert("Sorry!The system is busy, please try again later.");
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
        passwordErrorMessage.html("*Please enter your password!");
        passwordSpan.html("");
        repasswordSpan.html("");
        checkPassword = false;
    }
    else {
        passwordErrorMessage.html("");
        if (password.val().match(zhengze)) {
            passwordErrorMessage.html("*Password must be at least more than 6 characters, please re-enter.");
            passwordSpan.html("");
            repasswordSpan.html("");
            checkPassword = false;
        }
        else if (!password.val().match(zhengze2)) {
            passwordErrorMessage.html("*Password should be less than 30 characters, please re-enter.");
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
                    repasswordErrorMessage.html("Passwords don’t match.");
                    repasswordSpan.html("");
                }
                else {
                    repasswordErrorMessage.html("");
                    repasswordSpan.html("<img src='web/images/home/DG_07.jpg' />");
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
            $("#repasswordErrorMessage").html("*Please enter your password!");
            $("#repasswordSpan").html("");
            checkRePassword = false;
        }
        else {
            if ($("#repassword").val().match(zhengze)) {
                $("#repasswordErrorMessage").html("*Password must be at least more than 6 characters, please re-enter.");
                $("#repasswordSpan").html("");
                checkRePassword = false;
            }
            else if (!$("#repassword").val().match(zhengze2)) {
                $("#repasswordErrorMessage").html("*Password should be less than 30 characters, please re-enter.");
                $("#repasswordSpan").html("");
                checkRePassword = false;
            }
            else {
                $("#repasswordErrorMessage").html("");
                $("#repasswordSpan").html("<img src='web/images/home/DG_07.jpg' />");
                checkRePassword = true;
            }
        }
    }
    else if ($("#password").val() != null || $("#password").val() != "") {
        if ($("#repassword").val() == null || $("#repassword").val() == "") {
            $("#repasswordErrorMessage").html("*Please enter your password!");
            $("#repasswordSpan").html("");
            checkRePassword = false;
        }
        else if ($("#repassword").val() != $("#password").val()) {
            $("#repasswordErrorMessage").html("Passwords don't match.");
            $("#repasswordSpan").html("");
            checkRePassword = false;
        }
        else {
            if ($("#repassword").val().match(zhengze)) {
                $("#repasswordErrorMessage").html("*Password must be at least more than 6 characters, please re-enter.");
                $("#repasswordSpan").html("");
                checkRePassword = false;
            }
            else if (!$("#repassword").val().match(zhengze2)) {
                $("#repasswordErrorMessage").html("*Password should be less than 30 characters, please re-enter.");
                $("#repasswordSpan").html("");
                checkRePassword = false;
            }
            else {
                if ($("#repassword").val() == $("#password").val()) {
                    $("#repasswordErrorMessage").html("");
                    $("#repasswordSpan").html("<img src='web/images/home/DG_07.jpg' />");
                    checkRePassword = true;
                }
                else {
                    $("#repasswordErrorMessage").html("Passwords don鈥檛 match.");
                    $("#repasswordSpan").html("");
                    checkRePassword = false;
                }
            }
        }
    }
}

function CheckCountry() {
    if ($("#country").val() == 0) {
        $("#countryErrorMessage").html("*Please select your country.");
        $("#countrySpan").html("");
        checkCountry = false;
    }
    else {
        $("#countrySpan").html("<img src='web/images/home/DG_07.jpg' />");
        $("#countryErrorMessage").html("");
        checkCountry = true;
    }
}

function CheckEmail() {
    var emailZhengZe = "^([0-9a-zA-Z-_.])+@[0-9a-zA-Z-.]+$";
    if ($("#email").val() == null || $("#email").val() == "") {
        $("#emailErrorMessage").html("*Please enter your e-mail address.");
        $("#emailSpan").html("");
        checkEmail = false;
    }
    else if (!$("#email").val().match(emailZhengZe)) {
        $("#emailErrorMessage").html("*Your e-mail is incorrect.");
        $("#emailSpan").html("");
        checkEmail = false;
    }
    else if ($("#email").val().length > 50) {
        $("#emailErrorMessage").html("*Email should be at least more less 50 characters, please re-enter.");
        $("#emailSpan").html("");
        checkEmail = false;
    }
    else {
        $("#emailErrorMessage").html("Checking e-mail...");
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
                    $("#emailSpan").html("<img src='web/images/home/DG_07.jpg' />");
                    checkEmail = true;
                }
                else if (data.result == false) {
                    $("#emailSpan").html("");
                    $("#emailErrorMessage").html("*This Email is already registered, please re-enter.");
                    checkEmail = false;
                }
            },
            error: function () {
                alert("Sorry!The system is busy, please try again later.");
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
        $("#agreeCheckboxErrorMessage").html("*Please check this box to accept the Terms of Iorder!");
    }
}



