$(function () {
    if (tab == 2) {
        setTab('two', 2, 2);
    }
    $(function () {
        $("[name='exchange']").click(
                function () {
                    exchangeInteger($(this));
                }
            );
    });

    function exchangeInteger(e) {
        HideBtn(e);
        var value = $(e).attr("integervalue");

        $.post('https://account.yoybuy.com/en/integraltocoupons', { faceValue: value }, function (data) {
            if (data.result == true) {
                alert("This E-coupon is effective within 30 days！\n（Expiry date：" + data.date + "）");
                $("#totalpoints").html(data.totalPoints);
                $("#coupons").html(data.coupons);

                RenderCouponsCount(data);

                if (data.iscoupons5 == true) {
                    ShowBtn($("#exchange_5"));
                } else {
                    HideBtn($("#exchange_5"));
                }
                if (data.iscoupons10 == true) {
                    ShowBtn($("#exchange_10"));
                } else {
                    HideBtn($("#exchange_10"));
                }
                if (data.iscoupons20 == true) {
                    ShowBtn($("#exchange_20"));
                } else {
                    HideBtn($("#exchange_20"));
                }
                if (data.iscoupons50 == true) {
                    ShowBtn($("#exchange_50"));
                } else {
                    HideBtn($("#exchange_50"));
                }

            } else {
                alert("The Exchange is failed !");
                window.location.reload();
            }
        }, "json");

    }

    function RenderCouponsCount(data) {
        var html = '';
        
        if (data.coupons5 > 0 || data.coupons10 > 0 || data.coupons20 > 0 || data.coupons50 > 0) {
            
            html += '<div class="djj_top"><h3>My E-coupons</h3><ul>';

            if (data.coupons5 > 0) {
                html += '<li id="imgDiv5">';
                html += '<div class="imgDiv">';
                html += '<img src="/Content/Images/xdjj_5.jpg" width="170" border="0" /></div>';
                html += '<span><b>￥ 5</b><a id="couponscount5">' + data.coupons5;
                html += ' pces</a></span> </li>';
            }
            if (data.coupons10 > 0) {
                html += '<li id="imgDiv10">';
                html += '<div class="imgDiv">';
                html += '<img src="/Content/Images/xdjj_10.jpg" width="170" border="0" /></div>';
                html += '<span><b>￥ 10</b><a id="couponscount10">' + data.coupons10;
                html += ' pces</a></span> </li>';
            }
            if (data.coupons20 > 0) {

                html += '<li id="imgDiv20">';
                html += '<div class="imgDiv">';
                html += '<img src="/Content/Images/xdjj_20.jpg" width="170" border="0" /></div>';
                html += '<span><b>￥ 20</b><a id="couponscount20">' + data.coupons20;
                html += ' pces</a></span> </li>';
            }
            if (data.coupons50 > 0) {
                html += '<li id="imgDiv50">';
                html += '<div class="imgDiv">';
                html += '<img src="/Content/Images/xdjj_50.jpg" width="170" border="0" /></div>';
                html += '<span><b>￥ 50</b><a id="couponscount50">' + data.coupons50;
                html += ' pces</a></span> </li>';
            }

            html += '</ul></div>';
        }

        $("#couponscountdiv").html(html);
    }

    function ShowBtn(e) {
        e.html('<img border="0" width="93" height="24" src="../../Content/Images/exchange_17.jpg" />');
        e.unbind("click");
        e.click(function () {
            exchangeInteger($(this));
        });
    }

    function HideBtn(e) {
        e.html('<img border="0" width="93" height="24" src="../../Content/Images/exchange_20.jpg" />');
        e.unbind("click");
    }

    var $key = $("table.haha");
    $("#integrals").each(function () {
        var $table = $(this);
        $table.alternateRowColors();
        var currentPage = 0;
        var numperpage = 10;
        var $table = $(this);
        $table.bind("repaginate", function () {
            $table.find("tbody tr").show();
            $("tbody tr:lt(" + currentPage * numperpage + ")").hide().end();
            $("tbody tr:gt(" + ((currentPage + 1) * numperpage - 1) + ")").hide().end();
        });
        var numRows = $table.find("tbody tr").length;
        var numPages = Math.ceil(numRows / numperpage);
        var $pager = $('<div class="page" style="text-align:right;margin-top:10px; "></div>');
        for (var page = 0; page < numPages; page++) {
            $('<span class="page-number">' + (page + 1) + '</span>').bind("click", { "newPage": page }, function (event) {
                currentPage = event.data["newPage"];
                $table.trigger("repaginate");
                $(this).addClass("act").siblings().removeClass("act");
            }).appendTo($pager);
        }
        $pager.find("span.page-number:first").addClass("act");
        $pager.insertBefore($key);
        $table.trigger("repaginate");

    });

});
jQuery.fn.alternateRowColors = function () {
    $("tbody tr:odd", this).removeClass("even").addClass("odd");
    $("tbody tr:even", this).removeClass("odd").addClass("even");
    return this;
};

//function showRemark(str) {
//    $("#content").html(str);
//    $('#dialog').dialog('open');
//    return;
//}
function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}