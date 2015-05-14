$(document).ready(function () {

    $("#goodsFreighthide").blur(function () {
        var freight = $("#goodsFreighthide").val();
        if (isNaN(freight) || $.trim(freight) == '') {
            $("#goodsFreight").val("0");
            $("#goodsFreighthide").val("0");
        }
        else {
            $("#goodsFreight").val(FormatNum(CNYtoUSDConstr(freight), 2));
        }
    });
    $("#goodsPricehide").blur(function () {

        var price = $("#goodsPricehide").val();
        if (isNaN(price) || $.trim(price) == '') {

            $("#goodsPrice").val("0");
            $("#goodsPricehide").val("0");
        }
        else {
            $("#goodsPrice").val(FormatNum(CNYtoUSDConstr(price), 2));
        }
    });
});

function getFail() {
    $("#goodsPhoto").attr("src", "http://shoppingcart.yoybuy.com/Content/Images/empty.gif");
    $("#goodsAddress").val($("#goodsUrl").val()).attr("disabled", "disabled");
    $("#first").css("display", "none");
    $("#second").css("display", "block");
    $("#goodsCounts").val(1);

}

function cleanEmpty() {

    $("#goodsName").empty().removeAttr("disabled");
    $("#goodsPricehide").empty().removeAttr("disabled");
    $("#goodsFreighthide").empty().removeAttr("disabled");
    $("#goodsRemark").empty().removeAttr("disabled");
    $("#goodsName").val("");
    $("#goodsNamehide").val("");
    $("#goodsPrice").val("0");
    $("#goodsPricehide").val("0");
    $("#goodsFreight").val("0");
    $("#goodsFreighthide").val("0");
    $("#goodsUrl").val("");
    $("#remarkCheckbox").removeAttr("checked");
    $("#goodsRemark").removeAttr("disabled").val("Please enter the purchasing information of this item, such as color, size or other requirements.");
    $("#firstTip").html(" *Attention: Please enter the original webpage URL of the item or add item from <a href=\"http://www.yoybuy.com\">our website</a>directly!");
    $("#first").css("display", "block");
    $("#second").css("display", "none");
    $("#three").css("display", "none");
    $("#goodsUrl").removeAttr("style");
}

function countsMagagerInput() {
    var newFre;
    var counts = $("#goodsCounts").val();
    var freight = $("#goodsFreight").val();
    var oldFre = $("#OriginalFreight").val();
    var jiSuanCount = counts - 1;
    if (jiSuanCount > 0) {
        newFre = parseFloat(oldFre) + 8 * jiSuanCount > 50 ? 50 : parseFloat(oldFre) + 8 * jiSuanCount;
    }
    else {
        newFre = oldFre;
    }
    $("#goodsFreight").val(newFre);
}

function countsManager(obj) {
    var counts = $("#goodsCounts").val();

    if (obj == "add") {
        var newcount = parseInt(counts) + 1;
        $("#goodsCounts").val(newcount);
    }
    else {
        var newcount = parseInt(counts) - 1;
        if (newcount < 1) {
            newcount = 1;
        }
        $("#goodsCounts").val(newcount);
    }
}

function remarkChangeCheck(obj) {
    if (obj.checked) {
        $("#goodsRemark").attr("disabled", "disabled").val("No note");
        $("#goodsRemark").attr("class", "");
    }
    else {

        $("#goodsRemark").removeAttr("disabled").val("");
        $("#goodsRemark").attr("class", "example");
    }
}
function clearRemarkA() {
    if ($("#goodsRemark").val() == "Please enter the purchasing information of this item, such as color, size or other requirements." || $("#IsRemark").val() == 1) {
        $("#goodsRemark").val("");
        return false;
    }

    $("#IsRemark").val(0);
}

function clearRemarkB() {
    if ($("#goodsRemark").val() == "") {
        $("#goodsRemark").val("Please enter the purchasing information of this item, such as color, size or other requirements.");
    }

    $("#IsRemark").val(0);
}



//鎻愪氦鍟嗗搧
var isSubmit = false; //閲嶅鎻愪氦鍒ゆ柇
function submitGoods() {
    if (isSubmit == true) {
        return false;
    }
    isSubmit = true;
    var goodsName = $("#goodsNamehide").val().replace(/&/g, "锛�");

    if (goodsName.length > 150) {
        alert("The item description is not more than 150 characters");
        isSubmit = false;
        return false;
    }
    var goodsPrice = $("#goodsPricehide").val();
    var goodsFreight = $("#goodsFreighthide").val();
    if (goodsFreight == 0 || goodsFreight == "") {
        goodsFreight = 12;
    }

    var DHLInvoiceDescription = $("#DHLInvoiceDescription").val();
    var goodsCounts = $("#goodsCounts").val();
    var goodsRemark = $("#goodsRemark").val() == "Please enter the purchasing information of this item, such as color, size or other requirements." ? "" : $("#goodsRemark").val();
    if (goodsRemark.length > 500) {
        $("#secondTip").html("*Reminder锛歂ote information is too long!");
        isSubmit = false;
    }
    var goodsAddress = $("#goodsAddress").val().replace(/&/g, "$");
    var goodsPhoto = $("#goodsPhoto").attr("src");
    if (goodsName == "") {
        $("#secondTip").html("*Reminder锛欼nput the goods name!");
        isSubmit = false;
    } else if (goodsPrice == "") {
        $("#secondTip").html("*Reminder锛欼nput the goods price!");
        isSubmit = false;
    } else if (goodsPrice <= 0) {
        $("#secondTip").html("*Reminder锛欼nput the goods price!");
        isSubmit = false;
    } else if (goodsFreight == "") {
        $("#secondTip").html("*Reminder锛欼nput the goods freight !");
        isSubmit = false;
    } else if (goodsFreight == "") {
        $("#secondTip").html("*Reminder锛歅urchase quantity can't be empty!");
        isSubmit = false;
    } else if (goodsFreight <= 0) {
        $("#secondTip").html("*Reminder锛欸oods freight have to greater than zero!");
        isSubmit = false;
    } else if (goodsPrice <= 0) {
        $("#secondTip").html("*Reminder锛欸oods price have to greater than zero!");
        isSubmit = false;
    }
    else if (goodsCounts < 1) {
        $("#secondTip").html("*Reminder锛歍his quantity must be greater than 0.");
        isSubmit = false;
    }
    else {
        $("#second").css("display", "none");
        var html = $("#firstTip").html();
        $("#firstTip").html("<img src='http://shoppingcart.yoybuy.com/Content/images/loading1.gif'  /><br/>Processing...");
        if ($("#OriginalFreight").val() == 0) {
            $("#OriginalFreight").val(goodsFreight);
        }
        var actionurl = "Name=" + goodsName + "&Remark=" + goodsRemark + "&Amount=" + goodsCounts + "&Price=" + goodsPrice + "&Freight=" + goodsFreight + "&Url=" + goodsAddress + "&Photo=" + goodsPhoto + "&Shop=" + $("#Shop").val() + "&ShopUrl=" + $("#ShopUrl").val().replace(/&/g, "$") + "&Source=" + $("#goodsSource").val() + "&OriginalFreight=" + $("#OriginalFreight").val() + "&DHLInvoiceDescription=" + DHLInvoiceDescription;
        $.ajax({
            type: "POST",
            url: "http://shoppingcart.yoybuy.com/shoppingcart/AddGoods",
            data: actionurl,
            success: function (data) {
                if (data.result == true) {
                    $("#sp_proTNum").html(data.data.ProductAmount);
                    $("#sp_proSum").html(data.data.TotalMoney);
                    $("#sp_proPic").attr("src", goodsPhoto);
                    $("#sp_proName").html(data.data.Name);
                    // TransLation("sp_proName", $("#sp_proName").html());
                    var explain = "$";

                    $("#sp_proFright").html(explain + FormatNum(CNYtoUSDConstr(goodsFreight), 2));
                    $("#sp_proPrice").html(explain + FormatNum(CNYtoUSDConstr(goodsPrice), 2));
                    $("#sp_proNum").html(goodsCounts);
                    $("#first").css("display", "none");
                    $("#second").css("display", "none");
                    $("#three").css("display", "block");

                } else if (data.errcode == 1) {
                    alert("For customer protection, we can't handle orders with (well known) \"brand\" items any more. ");
                    $("#firstTip").html('            *Attention: Please enter the original webpage URL of the item or add item from ');
                } else {
                    alert("Your item added to favorite is failed!");
                    $("#firstTip").html('            *Attention: Please enter the original webpage URL of the item or add item from ');
                }
                isSubmit = false;
            }
        });
    }
};
