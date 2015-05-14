$(document).ready(function () {
    $("#name").blur(function () {
        var name = $("#name").val();
        if (name == "") {
            $("#nameValidator").html("Please enter a name");
        }
        else {
            $("#nameValidator").html("");
        }
    });
    $("#email").blur(function () {
        var email = $("#email").val();
        var emailformat = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
        if (email == "") {
            $("#EmailValidator").html("Please enter the Email address");
        } else if (!emailformat.test(email)) {
            $("#EmailValidator").html("Email format is not correct!");
        } else {
            $("#EmailValidator").html("");
        }
    });
    $("#toEmail").blur(function () {
        var toemails = $("#toEmail").val();
        var emails = toemails.split(",");
        var emailformat = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
        if (toemails == "") {
            $("#toEmailValidator").html("Please enter the Email address");
        }

        else {
            for (var i = 0; i < emails.length; i++) {
                if (!emailformat.test(emails[i])) {
                    $("#toEmailValidator").html("Email format is not correct!");
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
        alert("You have successfully copied this address");
    }
    else {
        copy(strValue);
        alert("Your browser does not support script copy, please copy the link manually.");
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
        alert("Please enter the recipient mailbox");
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
