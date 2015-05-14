 isSubmit = false;
function userNameKeydown(e) {
    if (e.keyCode == 13) {
        e.keyCode = 9;
    }
}

function passwordKeydown(e) {
    if (e.keyCode == 13) {
        if (isDisplayCaptcha == true) {
            e.keyCode = 9;
        }
        else {
            submit();
        }
    }
}

function CheckUserName() {
    var emailZhengZe = "^\\s*[0-9a-zA-Z-_.]+@[0-9a-zA-Z-.]+\\s*$";
    if ($("#userName").val() == null || $("#userName").val() == "") {
    	
        $("#errorMessage").html("*邮箱账号不能为空!");
        return false;
    }
    else if (!$("#userName").val().match(emailZhengZe)) {
        $("#errorMessage").html("*邮箱不正确.");
        return false;
    }
    else if ($("#userName").val().length > 50) {
        $("#errorMessage").html("*邮箱账号不能大于50个字符，请重新输入.");
        return false;
    }
    else {
        $("#errorMessage").html("");
        return true;
    }    
}

function CheckPassword() {
    if ($("#password").val() == null || $("#password").val() == "") {
        $("#errorMessage").html("*请输入密码!");
        return false;
    }
    else {
        $("#errorMessage").html("");
        return true;
    }
}


function ShowCaptcha() {
   // isDisplayCaptcha = true;
    $("#captchaLiTitle").show();
    $("#captchaLiContent").show();
}

var loadstr = "<img src=\"web/Images/home/zoomloader.gif\" width=\"16\" height=\"16\" />";
var btnstr = "<img onclick=\"submit();\" style=\"cursor:pointer\" src=\"web/images/home/sinin_03.jpg\"/>";

function submit() {
    $("#btndiv").html(loadstr).addClass("loggingC");

    if (isSubmit == true) {
        return;
    }

    if (CheckUserName() == true && CheckPassword() == true) {
   
            submitData();

    }
    else {
        $("#btndiv").html(btnstr).removeClass("loggingC");
        if (CheckPassword() == false) {
            CheckPassword();
        }
        else {
            CheckUserName();
        }
    }
}

function submitData() {
	var urls=$("#errorMessage").attr("url");
	var turl=$("#errorMessage").attr("turl");
    var email = $("#userName").val();
    var password = $("#password").val();
    var remember = $("#remember").attr("checked");
    var code = $("#captcha").val();
    $("#errorMessage").html("");
    isSubmit = true;
    var shopcart =$.cookie('shopcart');
 
	
    $.ajax({
        url: urls,
        data: { email: email, password: password,  code: code, remember: remember ,shopcart:shopcart},
        type: "POST",
        cache: false,
        success: function (data) {
            if (data.result == false) {
            	if(data.err==true){
            		 $("#errorMessage").html('*邮箱或密码错误');
            	}else{
            		$("#errorMessage").html('*验证码错误');
            	}
                isSubmit = false;
                $("#btndiv").html(btnstr).removeClass("loggingC");
            }
            else if (data.result == true) {
            	
             $.cookie('shopcart',null);
             window.location.href = turl;
               
            }
        },
        error: function () {
            alert("对不起，系统繁忙，请稍后再试.");
            isSubmit = false;
            $("#btndiv").html(btnstr).removeClass("loggingC");
        },
        dataType: "json"
    });
   
    
}


$(function () {
    $("#captcha").blur(function () {
        var code = $(this).val();
        var key = $("#captcha-guid").val();

        if (code == null || code == "" ) {
            $("#errorMessage").html("*请输入验证码!");
        }
        else {

        }
    }).keydown(function (e) {
        if (e.keyCode == 13) {
            submit();
        }
    });
});

var visibleHelpTimer;
var hiddenHelpTimer;

function visibleHelp() {
    visibleHelpTimer = setTimeout("doVisibleHelp()", 300);
}

function doVisibleHelp() {
    document.getElementById("help").style.display = "block";
    clearTimeout(visibleHelpTimer);
}

function outHelpImg() {
    clearTimeout(visibleHelpTimer);
    hiddenHelpTimer = setTimeout("hiddenHelp()", 300);
}

function outHelp() {
    hiddenHelp();
}

function hiddenHelp() {
    document.getElementById("help").style.display = "none";
    clearTimeout(hiddenHelpTimer);
}
