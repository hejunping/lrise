
$(".example8").colorbox({ width: "526px;", inline: true, href: "#inline_example1", onClosed: function () { closedBox(); } });

function sending() {
    $("#infoboxid").html(" <div class='ly'><div class='ly_name'> <ul> <li></li></ul></div><div class='ly_center'  >Waiting... ...<br/><img src='/Content/images/MyOrder/loading2.gif' /> </div></div>");
    var isPosting;
    if (isPosting) {
        $("#Tishi").hide().html("Waiting.........!").hide("hightlight", { duration: 3000 });
        return;
    }
    $("#Tishi").hide().text("Sending ....锛�").fadeIn("slow");

    var message = $("#sendinginfos").val();
    $("#sendinginfos").val("");
    if (message != "") {
        var goodsId = $("#goodsId").val();
        var messageId = $("#messageId").val();
        isPosting = true;
        $.post('http://order.yoybuy.com/order/SendMessage',
                { "message": message, "goodsId": goodsId, "messageId": messageId },
                function (data, textStatus) {
                    if (data != 0) {
                        readMsgBody(data);
                        $("#" + goodsId + "Img").attr("msgId", data);
                        $("#Tishi").hide().text("Successfully锛�").fadeIn("slow");

                        $("#cboxClose").click();
                        alert("Your message is sent successfully !We will reply within 24 hours.Please check it anytime.");
                    } else {
                        $("#sendinginfos").val(message);
                        alert("Error try again later");
                    }
                    isPosting = false;
                }, "json");
    } else {

        $("#Tishi").hide().text("Nothing here锛�").fadeIn("slow");

        $("#Tishi").hide("slow");
        isPosting = false;
    }
}


function checkIsNew() {
    $.post('http://order.yoybuy.com/order/CheckIsNew',
            {},
            function (data) {
                if (data[0] == "1") {
                    $("#isNew2").html("New");
                }
                else {
                    $("#isNew2").html("");
                }
                if (data[1] == "1") {
                    $("#isNew3").html("New");
                }
                else {
                    $("#isNew3").html("");
                }
                if (data[2] == "1") {
                    $("#isNew4").html("New");
                }
                else {
                    $("#isNew4").html("");
                }
                if (data[3] == "1") {
                    $("#isNew5").html("New");
                }
                else {
                    $("#isNew5").html("");
                }
                if (data[4] == "1") {
                    $("#isNew6").html("New");
                }
                else {
                    $("#isNew6").html("");
                }

            }, "json"
        );
        }

//        var timer;
//        function ShowOrderTime(id) {
//            timer = setTimeout(function () {
//                var eTop = $("#" + id).offset().top;
//                var eLeft = $("#" + id).offset().left;
//                eLeft = eLeft - 480;
//                eTop = eTop + 20;
//                $("#blk").css({ "position": "absolute" }).animate({ left: eLeft, top: eTop, opacity: "show" }, 1);
//                $.post('http://order.yoybuy.com/order/GetOrderTimes',
//                        { goodsId: id },
//                        function (data) {
//                            if (data) {
//                                $("#blk").show();
//                                $("#blk").html(data);
//                            } else {
//                                alert("Error ,Please retry");
//                            }
//                        }, "json");
//            }, 1000);

//        };
//        function HiddenOrderTime() {
//            clearTimeout(timer);
//            $("#blk").animate({ left: 0, top: 0, opacity: "hide" }, 1);
//            $("#blk").html("<div style='text-align: center; width: 100%;'><img src='http://order.yoybuy.com/Content/Images/MyOrder/loadingb.gif' /></div>");
//        }


