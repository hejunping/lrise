var email_list = new Array('163.com', '126.com', '139.com', '188.com', '2008.china.com', '2008.sina.com', '21cn.com', '263.net', 'china.com', 'chinaren.com', 'citiz.net', 'eyou.com', 'foxmail.com', 'gmail.com', 'hongkong.com', 'hotmail.com', 'live.cn', 'live.com', 'mail.china.com', 'msn.com', 'my3ia.sina.com', 'qq.com', 'sina.cn', 'sina.com', 'sina.com.cn', 'sogou.com', 'sohu.com', 'tom.com', 'vip.163.com', 'vip.qq.com', 'vip.sina.com', 'vip.sohu.com', 'vip.tom.com', 'yahoo.cn', 'yahoo.com', 'yahoo.com.cn', 'yahoo.com.hk', 'yahoo.com.tw', 'yeah.net');
$(document).ready(function () {


    setTab('two', currentIndex, 2)

    //鎻愪氦淇敼
    $("#changeSubmit").click(function () {
        var countryId = $("#CountryId").val();
        //            if (countryId == 0 || $("#nameValidator").html() != "" || $("#phoneValidator").html() != "" || $("#postValidator").html() != "" || $("#name").val() == "" || $("#city").val() == "") {
        //              alert("Please fill in your complete information!");
        //                return false;
        //            } else {
        document.editUinfoForm.submit();
        //            }
    });
    //閲嶇疆淇敼
    $("#reset").click(function () {
        document.editUinfoForm.reset();
        resetEditUinfoForm();
    });
    function resetEditUinfoForm() {
        $("#Name").val("");
        $("#Post").val("");
        $("#Phone").val("");
        $("#CountryId").val(0);
        $("#City").val("");
        $("#Address").val("");
        $("#Photo").val("");

    }
    $("#UploadPicture").change(function () {
        $("#Img1").attr("src", this.value);
    });
    ///////////////////////////////////淇敼涓汉鍩烘湰淇℃伅缁撴潫
});


//淇敼涓汉淇℃伅鎻愪氦淇敼
function changeSubmit() {
    //        var countryId = $("#CountryId").val();
    //        if (countryId == 0 || $("#nameValidator").html() != "" || $("#phoneValidator").html() != "" || $("#postValidator").html() != "" || $("#name").val() == "" || $("#city").val() == "") {
    //            alert("Please fill in your complete personal information!");
    //            return;
    //        } else {
    document.editUinfoForm.submit();

    // }
}



//<![CDATA[

function advisorOmniture() {
    var eventType = 'Televisions';
    s_control_click('eVar31,events', 'event36', 'product advisor:' + eventType.toLowerCase() + ',event36', 'o', 'product advisor clicks');
}


//]]>

//<![CDATA[
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
//]]>

//checkbox鍏ㄩ€夊拰鍙栨秷鍏ㄩ€�
function checkalls() {
    if ($("#chkall").attr("checked")) {
        $("[name='EmailSubscriptionName']").attr("checked", 'true'); //鍏ㄩ€�
    } else {
        $("[name='EmailSubscriptionName']").removeAttr("checked"); //鍙栨秷鍏ㄩ€�


        //閬嶅巻.column 涓嬬殑 checkbox;
        $("[name='EmailSubscriptionName']").each(function () {
            if ($(this).attr("readonly")) {
                //alert($(this).attr("disabled"));
                $(this).attr("checked", "true");
                //缁欏綋鍓嶅嬀閫夌殑checkbox鍙栧弽锛�  鍏朵腑!$(this).attr("checked")鏄厛鑾峰彇浠栫殑灞炴€э紝鍐嶅彇鍙嶏紝鍏呭綋绗簩涓弬鏁帮紱
                //attr鏂规硶鍙湁涓€涓弬鏁版椂鏄彇鍊硷紝涓や釜鍙傛暟鏃舵槸璁惧€硷紱
                //$(this).attr("checked", !$(this).attr("checked"));
                //$(this).attr("checked", !$(this).removeAttr("checked"));
            };
        });


    }
};

function SubmitEmailSubscription() {
    $("#BtnSubmitES").click();
};
