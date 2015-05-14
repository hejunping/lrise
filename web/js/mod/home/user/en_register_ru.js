
var loadImg = "<img src=\"http://login.yoybuy.com/Content/Images/Login/zoomloader.gif\" width=\"16\" height=\"16\" />";
var signupImg = "<img onclick=\"submit()\" style=\"cursor: pointer\" src=\"http://login.yoybuy.com/Content/Images/Register/signup_03.jpg\"/>";

function CheckUserName() {
    var zhengze = "^[a-zA-Z0-9]((.*)?[a-zA-Z0-9]$)?";
    var zhengze2 = "^[a-zA-Z0-9_]*$";
    var zhengze3 = "^.{0,30}$";
    if ($("#userName").val() == null || $("#userName").val() == "") {
        $("#userNameErrorMessage").html("*Введите имя пользователя.");
        $("#userNameSpan").html("");
        isCheckName = false;
    }
    else if (!$("#userName").val().match(zhengze)) {
        $("#userNameErrorMessage").html("*Имя не может начинаться или заканчиваться точкой, подчеркивание или тире.");
        $("#userNameSpan").html("");
        isCheckName = false;
    }
    else if (!$("#userName").val().match(zhengze2)) {
        $("#userNameErrorMessage").html("*Буквы, цифры, подчеркивание только.");
        $("#userNameSpan").html("");
        isCheckName = false;
    }
    else if (!$("#userName").val().match(zhengze3)) {
        $("#userNameErrorMessage").html("*Имя пользователя должно не более 30 символов.");
        $("#userNameSpan").html("");
        isCheckName = false;
    }
    else {
        $("#userNameErrorMessage").html("Проверка имени пользователя…");
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
                    $("#userNameErrorMessage").html("*Это имя пользователя уже существует, пожалуйста, выберите другое имя.");
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
                alert("Я извиняюсь!системы занят,попробуйте позже.");
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
        passwordErrorMessage.html("*Введите ваш пароль!");
        passwordSpan.html("");
        repasswordSpan.html("");
        checkPassword = false;
    }
    else {
        passwordErrorMessage.html("");
        if (password.val().match(zhengze)) {
            passwordErrorMessage.html("*Пароль не должен быть меньше 6 символов, введите еще раз.");
            passwordSpan.html("");
            repasswordSpan.html("");
            checkPassword = false;
        }
        else if (!password.val().match(zhengze2)) {
            passwordErrorMessage.html("*Пароль должен быть по крайней мере, более менее 30 символов, пожалуйста, введите его снова.");
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
                    repasswordErrorMessage.html("Пароли не совпадают.");
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
            $("#repasswordErrorMessage").html("*Введите ваш пароль!");
            $("#repasswordSpan").html("");
            checkRePassword = false;
        }
        else {
            if ($("#repassword").val().match(zhengze)) {
                $("#repasswordErrorMessage").html("*Пароль не должен быть меньше 6 символов, введите еще раз.");
                $("#repasswordSpan").html("");
                checkRePassword = false;
            }
            else if (!$("#repassword").val().match(zhengze2)) {
                $("#repasswordErrorMessage").html("*Пароль должен быть по крайней мере, более менее 30 символов, пожалуйста, введите его снова.");
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
            $("#repasswordErrorMessage").html("*Введите ваш пароль!");
            $("#repasswordSpan").html("");
            checkRePassword = false;
        }
        else if ($("#repassword").val() != $("#password").val()) {
            $("#repasswordErrorMessage").html("Пароли не совпадают.");
            $("#repasswordSpan").html("");
            checkRePassword = false;
        }
        else {
            if ($("#repassword").val().match(zhengze)) {
                $("#repasswordErrorMessage").html("*Пароль не должен быть меньше 6 символов, введите еще раз.");
                $("#repasswordSpan").html("");
                checkRePassword = false;
            }
            else if (!$("#repassword").val().match(zhengze2)) {
                $("#repasswordErrorMessage").html("*Пароль должен быть по крайней мере, более менее 30 символов, пожалуйста, введите его снова.");
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
                    $("#repasswordErrorMessage").html("Пароли не совпадают.");
                    $("#repasswordSpan").html("");
                    checkRePassword = false;
                }
            }
        }
    }
}

function CheckCountry() {
    if ($("#country").val() == 0) {
        $("#countryErrorMessage").html("*Выберите вашу страну.");
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
        $("#emailErrorMessage").html("*Пожалуйста, введите Ваш адрес электронной почты.");
        $("#emailSpan").html("");
        checkEmail = false;
    }
    else if (!$("#email").val().match(emailZhengZe)) {
        $("#emailErrorMessage").html("*Электронная почта не puede exceder-де-50 caracteres.");
        $("#emailSpan").html("");
        checkEmail = false;
    }
    else if ($("#email").val().length > 50) {
        $("#emailErrorMessage").html("*Почта не больше ,чем 50 символова.");
        $("#emailSpan").html("");
        checkEmail = false;
    }
    else {
        $("#emailErrorMessage").html("Проверьте почта…");
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
                    $("#emailErrorMessage").html("*Este correo electrónico ya está registrado, por favor, vuelva a introducir.");
                    checkEmail = false;
                }
            },
            error: function () {
                alert("Прости,системы занят,попробуйте позже.");
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
        $("#agreeCheckboxErrorMessage").html("*Пожалуйста, установите этот флажок, чтобы принять Условия IOrder!");
    }
}



