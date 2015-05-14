$(document).ready(function() {
    $("[name='soncate']").mouseleave(function() {
        $(this).find("[class='fltc']").hide();
        $(this).attr("class", "flname");
        $(this).find("a:first").attr("class", "");
        $(this).find("a:first").width(165);
        $(this).find("span").append("<img src=\"../../Content/Images/Index/xy.png\" width=\"12\" height=\"12\" alt=\"\" />");
    });
    $("[name='soncate']").mouseover(function() {
        $(this).find("[class='fltc']").show();
        $(this).attr("class", "flmove");
        $(this).find("a:first").attr("class", "subdj");
        $(this).find("a:first").width(187);
        $(this).find("img").remove();
    });
});