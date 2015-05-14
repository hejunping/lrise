//Begin
//页锟芥顶锟斤拷锟斤拷锟斤拷锟矫伙拷锟斤拷录锟斤拷锟侥诧拷同状态锟斤拷锟斤拷示锟斤拷同锟斤拷息锟斤拷锟斤拷执锟叫诧拷同锟斤拷锟斤拷
//锟斤拷锟斤拷锟竭ｏ拷锟斤拷锟斤拷

var topshopnum = 0;
//锟斤拷取url锟斤拷址锟斤拷指锟斤拷锟侥诧拷锟斤拷
var searchurl = location.href;
searchurl += searchurl.indexOf("?") != -1 ? "" : "?";
function getUrl(name) {//锟斤拷取url锟斤拷址锟斤拷锟斤拷锟斤拷锟斤拷值
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //锟斤拷锟斤拷一锟斤拷锟斤拷锟斤拷目锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟绞�
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null; //锟斤拷锟截诧拷锟斤拷值
}
$(document).ready(function () {
    //    if (getUrl("Keys") != null) {
    //        $("#Keys").val(getUrl("Keys"));
    //    }
    if (getUrl("CId") != null) {
        var CIdvalue = $("#catelistname").find("a[class=" + getUrl("CId") + "]").text();
        $("#cateName").text(CIdvalue);
    }
    var urls=$("#urls").attr("urls");
 
    $.ajax({
        url: urls,
        dataType: "json",
        cache: false,
        data: {},
        success: function (data) {
        	   
            var userurl=$('#username').attr('url');
            var regurl=$('#regOrSignOut').attr('url');
            if (data.result == true) {
                $("#username").html("Welcome,<a href='http://customercenter.yoybuy.com/en/userindex.html'>" + data.username + "</a>");
                //$("#useryoybuy").html("<a href='http://customercenter.yoybuy.com/en/userindex.html'>My Yoybuy</a>");
                $("#regOrSignOut").html("<div ><a href='javascript:void(0)' onclick='SignOut()' >退出</a><div>");
            }
            else {
                if (data.username == null || data.username == "") {
                    $("#username").html("<a href='http://login.yoybuy.com/en/login'> 登录</a>");
                    //$("#useryoybuy").html("<a href='http://customercenter.yoybuy.com/en/userindex.html'>My Yoybuy</a>");
                    $("#regOrSignOut").html("<a href='http://login.yoybuy.com/en/Register'>Register</a>");
                }
                else {
                    $("#username").html("Welcome," + data.username + "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href='http://login.yoybuy.com/en/login'>登录</a>");
                    //$("#useryoybuy").html("<a href='http://customercenter.yoybuy.com/en/userindex.html'>My Yoybuy</a>");
                    $("#regOrSignOut").html("<a href='http://login.yoybuy.com/en/Register'>Register</a>");
                }
            }
        }
    });
    $.ajax({
        url: "http://shoppingcart.yoybuy.com/shoppingcart/GetGoodsCost",
        dataType: "jsonp",
        cache: false,
        success: function (data) {
            if (data.result == true) {
                $("#goodsNum").html("<b>Cart: </b>" + data.data + " item(s)");
                topshopnum = data.data;
            }
            else {
            }
        }
    });
});
function GetNoteValueByRow(row, note) {
    if (row == "") {
        return "";
    }
    var list = row.split(':');

    for (var i = 0; i < list.length; i++) {
        if ($.trim(list[i].split('=')[0]) == note) {
            return list[i].split('=')[1];
        }
    }
}
function SignOut() {
    $.ajax({
        url: "http://login.yoybuy.com/jsonpsignout",
        dataType: "jsonp",
        cache: false,
        data: {},
        success: function (data) {
            if (data.result == true) {
                $("#username").html("<a href='http://login.yoybuy.com/cn/login'>登录</a>");
                //$("#useryoybuy").html("<a href='http://login.yoybuy.com/en/login'>My Yoybuy</a>");
                $("#regOrSignOut").html("<a href='http://login.yoybuy.com/cn/Register'>Register</a>");
                window.location.href = 'http://www.yoybuy.com/en';
            }
            else {
                alert("Sorry!System busy.Please try again later.");
            }
        }
    });
}
////End

function doSetFocus(curId, setValue) {
    var curValue = window.document.getElementById(curId).value;
    if (setValue == curValue) { window.document.getElementById(curId).value = ""; }
    if (curValue == "") { window.document.getElementById(curId).value = setValue; }
}

function GetNoteValueByRow(row, note) {
    if (row == "") {
        return "";
    }

    var list = row.split(':');

    for (var i = 0; i < list.length; i++) {
        if ($.trim(list[i].split('=')[0]) == note) {
            return list[i].split('=')[1];
        }
    }
}
var selectvalue = 0;
$(document).ready(function () {

    $("#CategoriesTB").hover(function () {
        $("#CateUl").show();
    });
});

function Hide(divId) {
    selectstatus = 1;
    $("#" + divId).slideUp();
}
function vod() {
    return;
}
$(function () {
    $("#CurPage").keyup(function () {
        var reg = /^[0-9]*$/;
        if (!reg.test($(this).val())) {
            $(this).val("1");
        }
    });
    $("#ShopingArea").hover(function () {
        var href = window.location.href;
        if ($.trim(href.toLowerCase()) == "http://shoppingcart.yoybuy.com/" || $.trim(href.toLowerCase()) == "http://shoppingcart.yoybuy.com/shoppingcart/index" || $.trim(href.toLowerCase()) == "http://shoppingcart.yoybuy.com/en/shoppingcart.html") {
        }
        else {
            $("#ShopingCart").show();
            GetTopFourGoods();
        }


    }, function () { $("#ShopingCart").hide(); });
    $("span[id^='DelShopingGood_']").live("click", function () {
        var goodsId = $(this).attr("id").split('_')[1];
        var UserId = $(this).attr("id").split('_')[2] == "" ? 0 : $(this).attr("id").split('_')[2];

        $.ajax({
            url: "http://shoppingcart.yoybuy.com/shoppingcart/DeleteRecentlyViewedGoods",
            cache: false,
            dataType: "jsonp",
            data: { "goodsId": goodsId, "UserId": UserId },
            success: function (data) {
                if (data.result) {
                    $("#goodsItem_" + goodsId).remove();
                    flag = 0;
                    topshopnum = topshopnum - 1;
                    GetTopFourGoods();
                    alert("Deleted successful!");
                }
                else {
                    alert("Delete failed!");
                }
            }
        });
    });
});
var flag = 0;
function GetTopFourGoods() {

    if (parseInt(flag, 10) == 0) {

        flag = 1;

        $("#ShopingCart").html("<div style='text-align:center; width:100%;line-height:30px;float:left;margin-top:5px;'><img src='http://www.yoybuy.com/Content/images/head/loadingb.gif' /></div>");

        $.ajax({
            url: 'http://shoppingcart.yoybuy.com/shoppingcart/GetRecentlyViewedGoods',
            dataType: "jsonp",
            cache: false,
            success: function (data) {
                if (data.result) {
                    $("#goodsNum").html("<b>Cart: </b>" + topshopnum + " item(s)");
                    $("#ShopingCart").html(data.data);
                }
                else {
                    $("#ShopingCart").html("<div style='text-align:center; width:100%;line-height:30px;margin-top:5px'>The shopping cart is empty.</div><b><a href='http://shoppingcart.yoybuy.com/en/shoppingcart.html' style=\"color:#1F8AEA\">View Shopping Cart &gt;&gt;</a></b>");
                }
            }
        });
    }
}
//锟斤拷式锟斤拷小锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟诫。锟界：FormatNum(100.12345678,4)
function FormatNum(Num1, Num2) {
    if (isNaN(Num1) || isNaN(Num2)) {
        return (0);
    } else {
        Num1 = Num1.toString();
        Num2 = parseInt(Num2);
        if (Num1.indexOf('.') == -1) {
            return (Num1);
        } else {
            var b = Num1.substring(0, Num1.indexOf('.') + Num2 + 1);
            var c = Num1.substring(Num1.indexOf('.') + Num2 + 1, Num1.indexOf('.') + Num2 + 2);
            //alert(b);
            //alert(c);
            if (c == "") {
                return (b);
            } else {
                if (parseInt(c) < 5) {
                    return (b);
                } else {
                    return ((Math.round(parseFloat(b) * Math.pow(10, Num2)) + Math.round(parseFloat(Math.pow(0.1, Num2).toString().substring(0, Math.pow(0.1, Num2).toString().indexOf('.') + Num2 + 1)) * Math.pow(10, Num2))) / Math.pow(10, Num2));
                }
            }
        }
    }
}
function CNYtoUSDConstr(CNY) {
    return CNY / 6.25;
}
var headdata = {
    menudrp: function (object, classname) {
        $(object).attr("class", classname);
        $(object).find("[name=head-menulist]").hide();
    },
    menudown: function (object, classname) {
        $(object).attr("class", classname);
        GetTopFourGoods();
        $(object).find("[name=head-menulist]").show();
    }
}
function keys() {
    var eTop = $("#Keys").offset().top;
    var eLeft = $("#Keys").offset().left;
    eTop = eTop + 30;
    if ($("#Keys").val() != "") {
        $.ajax({
            url: "http://www.yoybuy.com/en/TaobaoShop/GetList",
            dataType: "jsonp",
            cache: false,
            data: { keys: $("#Keys").val() },
            success: function (data) {
                if (data.Result != "") {
                    $("#uMess").html("");
                    var datalist = eval(data.Result);

                    for (var i = 0; i < datalist.length; i++) {
                        $("#uMess").append("<li><a>" + datalist[i].keywords + "</a></li>");
                    }
                    $("#SelectDiv").css({ "position": "absolute" }).animate({ left: eLeft, top: eTop, opacity: "show" }, 1);
                    $("#uMess li").live("click", function () {
                        $("#Keys").val($(this).text());
                        submitSearch();
                        $("#SelectDiv").hide();
                    });
                }
            }
        });
    } else {
        $("#uMess").html("");
        $("#SelectDiv").hide();
    }
}
function getkeys() {
    $.ajax({
        url: "http://www.yoybuy.com/en/TaobaoShop/GetKeys",
        dataType: "jsonp",
        cache: false,
        success: function (data) {
            if (data.Result != "") {
                $("#hotkeys").html(data.Result);
            }
        }
    });
}
function GetCateId(cateId, object) {
    var cateName = $(object).text();
    $("#cateName").text(cateName);
    $("#CateID").val(cateId);
    $(object).parent().parent().hide();
    submitSearch();
}
function submitSearch() {
	var surl = $("#catelistname").attr('surl');
    var keysvalue = $.trim($("#Keys").val());
    var CId = $("#CateID").val();
    keysvalue = keysvalue.replace(/(^\s*)|(\s*$)/g, "");
    var keyval = "Please enter keywords";
    keyval = keyval.replace(/(^\s*)|(\s*$)/g, "");

    if (keysvalue.indexOf(keyval) >= 0 && CId == 0) {
        alert("Please enter keywords & URL!");
    } else if (keysvalue.indexOf(keyval) < 0 && CId != 0) {
        location.href = surl+"?CId=" + CId + "&keyword=" + encodeURIComponent($("#Keys").val());
    } else if (keysvalue.indexOf(keyval) < 0) {
        location.href = surl+"?keyword=" + encodeURIComponent($("#Keys").val());
    } else if (CId != 0) {
        location.href = surl+"?CId=" + CId;
    }
}
function rightkeys(object) {
	var surl = $("#catelistname").attr('surl');
    var keyvalue = $(object).text();
    if (keyvalue != "") {
        $("#Keys").val(keyvalue);
        window.location.href = surl+"?CId=0&keyword=" + keyvalue;
    }
}
function getFocus(object) {
    var keyvalue = $(object).val();
}
function onblur(object) {
    var keyvalue = $(object).val();
}
function goTopEx() {//锟斤拷锟截讹拷锟斤拷
    var n = 0;
    var obj = document.getElementById("AdLayer");
    if (!obj) { return false; }
    var x = 0;
    var fe = $("#AdLayer");
    window.onscroll = function () {
        obj.style.top = (document.body.scrollTop || document.documentElement.scrollTop) + n + 'px';
        x = (document.body.scrollTop || document.documentElement.scrollTop) + n;
        if (x == 0) {
            fe.fadeOut().hide();
        } else {
            fe.fadeIn().show();
        };
    };
    window.onresize = function () { obj.style.top = (document.body.scrollTop || document.documentElement.scrollTop) + n + 'px'; };
}


function Common100Position() {

    var iTop = (window.screen.availHeight - 30 - 543) / 2;
    var iLeft = (document.body.scrollWidth - 555) / 2;
    var iHeight = 543;
    var iWidth = 555;
    var newin = window.open('http://www.yoybuy.com/home/submitticket', 'dbdetails', 'height=' + iHeight + ',width=' + iWidth + ',top=' + iTop + ',left=' + iLeft + 'scrollbars=yes');
    if (newin != null) {
        newin.focus();

    }
}

$(document).ready(function () {
    $("#Comm100Div").html(" <a title=\"Live Chat\" href=\"http://www.comm100.com/livechat\" target=\"_blank\" onclick=\"comm100_137448.openChatWindow(event,448,-1);return false;\"><img alt=\"Live Chat\" style=\"border: 0px\" id=\"comm100_ButtonImage\" src=\"https://chatserver.comm100.com/BBS.aspx?siteId=137448&amp;planId=448&amp;partnerId=-1\"></img></a><script src=\"https://chatserver.comm100.com/js/LiveChat.js?siteId=137448&amp;planId=448&amp;partnerId=-1\" type=\"text/javascript\"></script>");
    var datamenu = $("[name=head-menu]");
    datamenu.mouseleave(function () {
        headdata.menudrp(this, "");
    });
    datamenu.mouseenter(function () {
        headdata.menudown(this, "helpmenu");
    });
    var toolmenu = $("[name=Tool-menu]");
    toolmenu.mouseleave(function () {
        headdata.menudrp(this, "");
    });
    toolmenu.mouseenter(function () {
        headdata.menudown(this, "toolmenu");
    });

    var accountmenu = $("div[name='headaccountMenu']");
    accountmenu.mouseleave(function () {
        headdata.menudrp(this, "acunt");
    });
    accountmenu.mouseenter(function () {
        headdata.menudown(this, "acunt acuntmove");
    });

    var cartmenu = $("div[name='headCartMenu']");
    var href = window.location.href;
    cartmenu.mouseleave(function () {
        headdata.menudrp(this, "acunt cart");
    });
    cartmenu.mouseenter(function () {
        if ($.trim(href.toLowerCase()) == "http://shoppingcart.yoybuy.com/" || $.trim(href.toLowerCase()) == "http://shoppingcart.yoybuy.com/shoppingcart/index" || $.trim(href.toLowerCase()) == "http://shoppingcart.yoybuy.com/en/shoppingcart.html") {
        } else {
            headdata.menudown(this, "acunt cart movecart");
        }
    });

    $("#catemenudrop").mouseleave(function () {
        $(this).find("dd").hide();
    });
    $("#catemenudrop").mouseenter(function () {
        $(this).find("dd").show();
    });
    $("#leftmenu").mouseleave(function () {
        $(this).find("div[name='menulest']").hide();
        $(this).find("li[name=menu]").mouseleave(function () {
            $(this).find("ul[class='fltc']").hide();
        });
    });
    $("#leftmenu").mouseenter(function () {
        $(this).find("div[name='menulest']").show();
        $(this).find("li[name=menu]").mouseenter(function () {
            $(this).find("ul[name='sonmenu']").show();

            $(this).attr("class", "flmove");
            $(this).find("a:first").attr("class", "subdj");
            $(this).find("a:first").width(187);
            $(this).find("img").remove();
        });
        $(this).find("li[name=menu]").mouseleave(function () {
            $(this).find("ul[name='sonmenu']").hide();

            $(this).attr("class", "flname");
            $(this).find("a:first").attr("class", "");
            $(this).find("a:first").width(165);
            //$(this).find("span").append("<img src=\"../../Content/Images/Index/xy.png\" width=\"12\" height=\"12\" alt=\"\" />");
        });
    });
    var hrefvalue = $("#NavigationArea").html();
    if (hrefvalue != null) {
        $("#NavigationDiv").html(hrefvalue);
    }
    getkeys(); //锟斤拷取锟截硷拷锟斤拷
    goTopEx(); //锟斤拷锟截讹拷锟斤拷js
});
