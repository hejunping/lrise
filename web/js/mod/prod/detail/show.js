function Switching(idName, cssName) {
    if (idName == "Item0") {
        $("#ItemSwitch0").attr("class", "pxz");
        $("#ItemSwitch1").attr("class", "pxzb");
        $("#productDetails").show();
        $("#Item0").show();
        $("#Item1").hide();
    } else if (idName == "Item1") {
        $("#ItemSwitch0").attr("class", "pxzb");
        $("#ItemSwitch1").attr("class", "pxz");
        $("#productDetails").hide();
        $("#Item1").show();
        $("#Item0").hide();
    }
}
function Description() {
    $("#ItemSwitch0").attr("class", "pxzb");
    $("#ItemSwitch1").attr("class", "pxz");
    $("#productDetails").hide();
    $("#Item1").show();
    $("#Item0").hide();
}
$(document).ready(function () {
    $("#mycarousel").jcarousel({ initCallback: mycarousel_initCallback }); $(".jqzoom").jqueryzoom({
        xzoom: 308, yzoom: 308, offset: 10, position: "right", preload: 1, lens: 1
    });
});
function mycarousel_initCallback(carousel) {
    $("#mycarousel li").mouseover(function () {
        var JQ_img = $("img", this);
        var image_name = JQ_img.attr("name");
        $("#_middleImage").attr("src", image_name).attr("longdesc", image_name);
        $(this).siblings().each(function () {
            $("img", this).removeClass().addClass("curr_base");
        });
        JQ_img.addClass("cur_on");
    });
};
function checkReduction() {//减数量
    var Amount = $("#Amount").val();
    Amount = parseInt(Amount);
    if ((Amount - 1) >= 1) {
        $("#Amount").val(Amount - 1);
    }
}
function checknumPlus(maxnum) {//增加数量
    //checknum();
    var Amount = $("#Amount").val();
    Amount = parseInt(Amount);
    if (Amount > maxnum) {
        $("#Amount").val(maxnum);
    }
    if ((Amount + 1) <= maxnum) {
        $("#Amount").val(Amount + 1);
    }
}
function checknum(maxnum) {//只允许输入数字
    var reg = /^[0-9]*$/;
    if (!reg.test($("#Amount").val()) || parseInt($("#Amount").val()) > maxnum) {
        $("#Amount").val(1);
    }
}