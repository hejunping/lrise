
$(function () { //淇敼椤电爜鏍峰紡
    $(".example8").colorbox({ width: "511px;", inline: true, href: "#inline_example1" });
    //    $("div.fy_b a").each(function (index) {
    //        if ($(this).find("span").length > 0) {

    //            $(this).attr("name1", "replace");
    //            var pageNum = $(this).find("span").html();
    //            $(this).replaceWith("<span>" + pageNum + "</span>");
    //        }
    //    });
    $("a[id^='DelMessage']").click(function () {
        $.post('http://customercenter.yoybuy.com/Home/DeleteMessage', { ItemId: $(this).attr("id").split("_")[1] }, function (data) {
            if (data.result) {
                window.location.reload();
            }
        }, "json");

    });
    $("a[id^='Message']").click(function () {
        $("#LoadMessage").html("Waiting... ...<br /><img src='http://customercenter.yoybuy.com/Content/Image/QA/loading2.gif' />");
        $.post("http://customercenter.yoybuy.com/Home/GetContentNews", { id: $(this).attr("id").split('_')[1] }, function (data) {
            if (data.result) {
                var content = data.msg.TCRMInfo.InfoContent == "" ? "No Message!" : data.msg.TCRMInfo.InfoContent;
                if (data.msg.TCRMInfo.InfoContent == "") {
                    $("#LoadMessage").html("No Message!");
                }
                else {
                    var html = "<h2 id='contentTitle'>" + data.msg.TCRMInfo.InfoTitle + "</h2><ul><li id='Contentnews'>" + content + "</li></ul><h3><a href='" + data.msg.TCRMInfo.TitleLink + "'>View Details &gt;&gt;</a></h3>";
                    $("#LoadMessage").html(html);
                }
            }
            else {
                $("#LoadMessage").html("No Message!");
            }

            //$("#cboxTitle").detach();
            $("#cboxTitle").remove();
        }, "json");

    });
});

function doSubmit(st) {
    if (parseInt(st, 10) == 1) {
        if (window.document.getElementById("MyQuestion").value.length > 600) {
            alert("Characters in length is not greater than 600");
            return;
        }
    }
    window.document.getElementById("IsSubmit").value = st;
    window.document.getElementById("MyQuestion").value = window.document.getElementById("MyQuestion").value.replace("<", "&lt;").replace(">", "&gt;");
    window.document.getElementById("frmPost").submit();
}

function ReadLetter(id) {
    document.getElementById("Img_" + id).src = "http://customercenter.yoybuy.com/Content/Image/QA/xinf_06.gif";
    document.getElementById("Img_" + id).innerHTML = "Read";
}
