$(document).ready(function () {

    $("#selAll").click(function () {
        if (this.checked) {
            $("input[name='CkbFa']").each(function () { this.checked = true; });
        } else {
            $("input[name='CkbFa']").each(function () { this.checked = false; });
        }

    });

    $("#AddFavouritesToCar").click(function () {
        $("#ShowLoading").dialog("open");
        var arrChk = $("input[name=CkbFa]");
        var idArr = new Array();
        $(arrChk).each(function () {
            if ($(this).attr('checked')) {
                idArr.push($(this).val());
            }
        });
        if (idArr == "") {
            $("#showInfo").html("Please select the products you want to add <a href='javascript:closeShow();' >Click to Close</a>");
            return false;
        }

        $.post("http://shoppingcart.yoybuy.com/Favorite/AddFavoriteToCar", $.param({ "favouriteId": idArr }, true),
			function (data, textStatus) {
			    if (data.result) {
			        $("#ShowLoading").dialog("option", "buttons", { "Close": function () {
			            $(this).dialog("close");
			        }
			        }, "json"
               );
			        $("#showInfo").html("The item(s) had been successfully added to 鈥淢y Shopping Cart鈥�");
			    } else { alert("Add failed! Please try again later!"); }
			}
		);
    });

    $("#ShowLoading").dialog({
        autoOpen: false,
        width: 380,
        modal: true,
        closeOnEscape: false
    });

    $("#add_Tag").blur(function () {
        $("#status").val("1");
        $("#addTagValidator").html("");
        var addTag = $("#add_Tag").val();
        var favourtieId = $("#favourtieId").val();
        if (addTag == "") {
            $("#addTagValidator").html("Please enter the tag name!");
        }
        else {
            $.ajax({
                type: 'POST',
                url: "http://shoppingcart.yoybuy.com/shoppingcart/TagIsExist",
                data: "favourtieId=" + favourtieId + "&TagName=" + addTag,
                success: function (data) {
                    if (data.result) {
                        //濡傛灉宸插瓨鍦�
                        $("#addTagValidator").html("The label already exists!");
                        return false;
                    } else {
                        //濡傛灉涓嶅瓨鍦�
                        $("#addTagValidator").html("");
                        $("#status").val("0");
                        return true;
                    }
                }
            });
        }
    });

    $(".pane:even").addClass("alt");

    $(".pane .btn-delete").click(function (id) {
        var btn = confirm("Are you sure you want to delete the common label?");
        if (btn) {
            $(this).parents(".pane").animate({ backgroundColor: "#fbc7c7" }, "fast")
		.animate({ opacity: "hide" }, "slow")
            this.form.action = 'DelCommonTag'; this.form.submit();
        }
        else { return false; }
    });

    $(".pane .btn-unapprove").click(function () {
        $(this).parents(".pane").animate({ backgroundColor: "#fff568" }, "fast")
		.animate({ backgroundColor: "#ffffff" }, "slow")
		.addClass("spam")
        return false;
    });

    $(".pane .btn-approve").click(function () {
        $(this).parents(".pane").animate({ backgroundColor: "#dafda5" }, "fast")
		.animate({ backgroundColor: "#ffffff" }, "slow")
		.removeClass("spam")
        return false;
    });

    $(".pane .btn-spam").click(function () {
        $(this).parents(".pane").animate({ backgroundColor: "#fbc7c7" }, "fast")
		.animate({ opacity: "hide" }, "slow")
        return false;
    });

});

function all() {
    $("input[name='CkbFa']").each(function () { this.checked = true; });
}



function InverseAll() {
    if ($("#selAll").attr("checked") != true) {
        all();
        $("#selAll").attr("checked", "checked");
    }
    else {
        InverseAllBox();
        $("#selAll").attr("checked", "");
    }
}


function UnSelect() {
    $("input[name=CkbFa]").each(function () {
        if ($(this).attr('checked')) {
            $(this).attr('checked', '');
        }
    });
}


function closeShow() {
    $("#ShowLoading").dialog("close");
}


function InverseAllBox() {
    $("#Favorite [name='CkbFa']:checkbox ").attr("checked", false);

    //            var FormID = document.getElementById("Favorite");
    //            for (var i = 0; i < FormID.CkbFa.length; i++) {
    //                 FormID.CkbFa[i].checked = false;}
    //             return ;
}
$(function () {
    $('#dialog').dialog({
        autoOpen: false,
        width: 420,
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
                $("#addTagValidator").html("");
                $("#add_Tag").val("");
            },
            "Add": function () {
                AddTag();
            }
        }
    });
});

function showDivCreate(tarId) {

    $('#dialog').dialog('open');
    $("#favourtieId").val(tarId);
    return false;
}

jQuery.fn.alternateRowColors = function () {/*鍒嗛〉浠ｇ爜*/
    $("tbody tr:odd", this).removeClass("even").addClass("odd");
    $("tbody tr:even", this).removeClass("odd").addClass("even");
    return this;
};


function deleteFavourties() {
    var check = document.getElementsByName("CkbFa");
    var Temp = false;
    for (var i = 0; i < check.length; i++) {
        if (check[i].checked == true) {
            Temp = true;
        }
    }
    if (Temp == true) {
        var btn = confirm("Want to delete the collection to you?");
        if (!btn) {
            return;
        } else {
            document.favorite_form.submit();
        }
    }
    else {
        alert("Please select the collections you want to delete!");
        return;
    }
}

function AddTag() {
    var addTag = $("#add_Tag").val();
    var status = $("#status").val();
    var favouriteId = $("#favourtieId").val();
    if (status != 1) {
        if (addTag == "") {
            $("#addTagValidator").html("Please enter the tag name");
        }
        else {
            $.ajax({
                type: 'POST',
                url: "http://shoppingcart.yoybuy.com/shoppingcart/AddTag",
                data: "favouriteId=" + favouriteId + "&tagName=" + addTag,
                success: function (data) {
                    if (data.result) {
                        $("#addTagValidator").html("");
                        window.location.reload();
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
    }
    else {
        $("#addTagValidator").html("The label already exists!");
    }

}

function AddFavouriteToCar(fId) {

    $.ajax({
        type: 'POST',
        url: "http://shoppingcart.yoybuy.com/Favorite/AddFavoriteToCar",
        data: "favouriteId=" + fId,
        success: function (data) {
            if (data.result == true) {
                alert("This item has been added in the shopping cart!");
            } else if (data.errcode == 1) {
                alert("For customer protection, we can't handle orders with (well known) \"brand\" items any more. ");
            } else {
                alert("This item has already existed in the shopping cart!");
            }
        }
    });
}

function selectFavouritesByTag(tagId) {

    window.location.href = "http://shoppingcart.yoybuy.com/Favorite/Index?tagId=" + tagId;

}

function deleteCommonTag(tagId) {
    var btn = confirm("Are you sure you want to delete the common label?");
    if (btn) {
        $.ajax({
            type: 'POST',
            url: "http://shoppingcart.yoybuy.com/shoppingcart/DelCommonTag",
            data: "tagId=" + tagId,
            success: function (data) {
                if (data.result) {
                    window.location.reload();
                } else {
                    alert("Remove common label failed!");
                }
            }
        });
    }
}

function deleteTag(tagId, faId) {
    var btn = confirm("Want to delete the label?");
    if (btn) {
        $.ajax({
            type: "POST",
            url: "http://shoppingcart.yoybuy.com/shoppingcart/DeleteTag",
            data: "tagId=" + tagId + "&faId=" + faId,
            success: function (data) {
                if (data.result) {
                    window.location.reload();
                } else {
                    alert("Remove failed!");
                }
            }
        })
    }
}



function checkLength(obj) {
    if (obj.value.length > 200) {
        $("#remarkMsg").html("Note information is too long");
        obj.value = obj.value.substring(0, 200);
    }
    else
    { $("#remarkMsg").html(""); }
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
