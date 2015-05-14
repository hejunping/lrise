function refreshValidateCode() {
    var e = $("#captchaimage");
    e.attr("src", 'http://www.yoybuy.com/Captcha/Image?guid=' + $("#validateCodeKey").val() + '&r=' + Math.random());
}

function onSubmit() {
    var companyName = $("#companyName").val();
    var contact = $("#contact").val();
    var companyPhone = $("#companyPhone").val();
    var email = $("#email").val();
    var msnorqq = $("#msnorqq").val();
    var companyUrl = $("#companyUrl").val();
    var productType = $("#productType").val();
    var joinReason = $("#joinReason").val();
    var captcha = $("#captcha").val();
    var validateCodeKey = $("#validateCodeKey").val();

    var tipMsg = "请填写";
    var emailformat = /^([0-9a-zA-Z-_.])+@[0-9a-zA-Z-.]+$/;

    if (companyName == null || companyName == "") {
        tipMsg += "公司名称";
    }
   
    if (contact == null || contact == "") {
        tipMsg += " 联系人";
    }
    if (companyPhone == null || companyPhone == "") {
        tipMsg += " 公司电话";
    }
    if (email == null || email == "") {
        tipMsg += " Email";
    }
    if (companyUrl == null || companyUrl == "") {
        tipMsg += " 公司网址";
    }
    if (productType == null || productType == "" || productType == "请选择") {
        tipMsg += " 主营产品类型";
    }
    if (joinReason == null || joinReason == "") {
        tipMsg += " 加盟理由";
    }
    if (captcha == null || captcha == "") {
        tipMsg += " 验证码";
    }
    if (tipMsg.replace("请填写", "") != "") {
        alert(tipMsg);
        refreshValidateCode();
        return;
    } else {
        if (companyName.length > 128) {
            alert("公司名称不能超过128个字");
            refreshValidateCode();
            return;
        } else if (contact.length>25) {
            alert("联系人姓名不能超过25个字");
            refreshValidateCode();
            return;
        } else if (companyPhone.length > 25) {
            alert("公司电话不能超过25个字");
            refreshValidateCode();
            return;
        } else if (!emailformat.test(email)) {
            alert("email格式不正确");
            refreshValidateCode();
            return;
        } else if (msnorqq != null && msnorqq != "" && msnorqq.length>25) {
            alert("MSN/QQ信息太长");
            refreshValidateCode();
            return;
        } else if (companyUrl.length > 128) {
            alert("公司网址太长");
            refreshValidateCode();
            return;
        } else if (joinReason.length > 128) {
            alert("加盟理由不能查过128个字");
            refreshValidateCode();
            return;
        } else {

        $.ajax({
            url: "http://www.yoybuy.com/home/AddMerchantsInfomation",
            data: { companyName: companyName, contact: contact, companyPhone: companyPhone, email: email, msnorqq: msnorqq, companyUrl: companyUrl, productType: productType, joinReason: joinReason, captcha: captcha, validateCodeKey: $("#captcha-guid").val() },
            type: "POST",
            cache: false,
            success: function (data) {
                if (data.result) {
                    alert("信息提交成功！");
                    refreshValidateCode();
                } else {
                    switch (data.errcode) {
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                            alert(data.errmsg);
                            break;
                        default:
                            alert("系统繁忙，请稍后再试！"); break;

                    }
                    refreshValidateCode();
                }
            },
            error: function () {
                alert("系统繁忙，请稍后再试！");
                refreshValidateCode();
            }
        });

        }
    }
}