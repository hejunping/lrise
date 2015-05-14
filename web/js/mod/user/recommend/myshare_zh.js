$(document).ready(function () {
    $("#name").blur(function () {
        var name = $("#name").val();
        if (name == "") {
            $("#nameValidator").html("请输入名字");
        }
        else {
            $("#nameValidator").html("");
        }
    });
    $("#email").blur(function () {
        var email = $("#email").val();
        var emailformat = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
        if (email == "") {
            $("#EmailValidator").html("请输入电子邮件地址");
        } else if (!emailformat.test(email)) {
            $("#EmailValidator").html("电子邮件格式不正确!");
        } else {
            $("#EmailValidator").html("");
        }
    });
    $("#toEmail").blur(function () {
        var toemails = $("#toEmail").val();
        var emails = toemails.split(",");
        var emailformat = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
        if (toemails == "") {
            $("#toEmailValidator").html("请输入电子邮件地址");
        }

        else {
            for (var i = 0; i < emails.length; i++) {
                if (!emailformat.test(emails[i])) {
                    $("#toEmailValidator").html("电子邮件格式不正确!");
                    break;
                }
                else {
                    $("#toEmailValidator").html("");
                }
            }
        }
    });	        
});

 
copyValue = function (strValue) {
    if (isIE()) {
        clipboardData.setData("Text", strValue);
        alert("您已经成功地复制这个地址");
    }
    else {
        copy(strValue);
        alert("您的浏览器不支持脚本复制,请手动复制链接.");
    }
};
function isIE(number) {
    if (typeof (number) != number) {
        return !!document.all;
    }
}
function copy(text2copy) {
    var flashcopier = 'flashcopier';
    if (!document.getElementById(flashcopier)) {
        var divholder = document.createElement('div');
        divholder.id = flashcopier;
        document.body.appendChild(divholder);
    }
    document.getElementById(flashcopier).innerHTML = '';
    var divinfo = '<embed src="http://www.lxj.name/cases/_clipboard.swf" FlashVars="clipboard=' + text2copy + '" width="0" height="0" type="application/x-shockwave-flash"></embed>'; //杩欓噷鏄叧閿�
    document.getElementById(flashcopier).innerHTML = divinfo;
}

function shareformsubmit() {
    if ($("#nameValidator").html() == "" && $("#EmailValidator").html() == "" && $("#toEmailValidator").html() == "" && $("#name").val() != "" && $("#email").val() != "" && $("#toEmail").val() != "") {
        //$("#ShowLoading").dialog("open");
        //document.shareform.submit();
        //$("#shareform").submit();
        //$("#submitOK").click();
        //alert("Recommend successfully!");
        location.href = "{:U('user/settings/recommend')}";
    } else {
        alert("请输入收件人邮箱");
        return false;
    }
}

var TRANSPARENCY_PROPERTY_ENABLE = 1;
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
function advisorOmniture() {
    var eventType = 'Televisions';
    s_control_click('eVar31,events', 'event36', 'product advisor:' + eventType.toLowerCase() + ',event36', 'o', 'product advisor clicks');
}
