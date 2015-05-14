
//$.extend($.fn, {
//    mask: function (maskDivClass) {
//        this.unmask();
//        // 鍙傛暟 
//        var op = {
//            opacity: 0.8,
//            z: 10000,
//            bgcolor: '#ccc'
//        };
//        var original = $(document.body);
//        var position = { top: 0, left: 0 };
//        if (this[0] && this[0] !== window.document) {
//            original = this;
//            position = original.position();
//        }
//        // 鍒涘缓涓€涓� Mask 灞傦紝杩藉姞鍒板璞′腑 
//        var maskDiv = $('<div class="maskdivgen"> </div>');
//        maskDiv.appendTo(original);
//        var maskWidth = original.outerWidth();
//        if (!maskWidth) {
//            maskWidth = original.width();
//        }
//        var maskHeight = original.outerHeight();
//        if (!maskHeight) {
//            maskHeight = original.height();
//        }
//        maskDiv.css({
//            position: 'relative',
//            'z-index': op.z,
//            width: maskWidth - 3,
//            height: maskHeight,
//            'background-color': op.bgcolor,
//            opacity: 0
//        });
//        if (maskDivClass) {
//            maskDiv.addClass(maskDivClass);
//        }
//        maskDiv.fadeIn('fast', function() {
//            // 娣″叆娣″嚭鏁堟灉 
//            $(this).fadeTo('slow', op.opacity);
//        });
//        return maskDiv;
//    },
//    unmask: function () {
//        var original = $(document.body);
//        if (this[0] && this[0] !== window.document) {
//            original = $(this[0]);
//        }
//        original.find("> div.maskdivgen").fadeOut('slow', 0, function () {
//            $(this).remove();
//        });
//    }
//});
//$(document).ready(function () {
//    $("input[name='cord.AddressId']").each(function () {//璁剧疆榛樿鍦板潃鐨勫€�
//        if ($(this).attr("class") == "chekctrue") {
//            var countryId = $(this).parent().parent().parent().parent().find("input[name='countryId']").val();
//            $(this).attr("checked", true);
//            chageAddress($(this), countryId);
//        }
//    });
//});
function Address() {
    var num = $("div[name=addressdiv]").size();
    if (num < 5) {
        $("#addressDiv").toggle();
    } else {
        alert("Only show five address records.");
    }
}
//function checkIsEcoupons() {
//    var bResult = $("#UseEcoupons").attr("checked");
//    if (bResult) {
//        $("input[name=E_coupons]").attr("disabled", false);
//    } else {
//        $("#costcouponsshow").text("");
//        $("input[name=E_coupons]").attr("checked", false);
//        $("input[name=E_coupons]").attr("disabled", true);
//    }
//    $("#ShouldPay").text(TotalAmount());
//}
//function showvalue(mvalue, mId) {
//    var servalue = $("#serv").text();
//    var ShouldPayValue = $("#ShouldPay").attr("name1");

//    $("#Lostcoupons").val(mvalue);
//    $("#Lostcouponsid").val(mId);

//    $("#costcouponsshow").text("-" + mvalue);
//    mvalue = mvalue * 100

//    $("#ShouldPay").text((ShouldPayValue * 100 - mvalue) / 100);
//}
//function checkIsInsure() {
//    var isInsures = $("#InsuresChecked").val();
//    if (isInsures == "true") {
//        $("input[name=IsInsures]").attr("checked", true);
//        $("#InsuresChecked").val("false");

//        $("#ShouldPay").text(TotalAmount());
//    } else {
//        $("input[name=IsInsures]").attr("checked", false);
//        $("#InsuresChecked").val("true");

//        var baoxian = $("#baoxian").text() * 100;
//        $("#ShouldPay").text((TotalAmount() * 100 - baoxian) / 100);
//    }
//}
//function TotalAmount() {
//    var yunfei = $("#Yunfei").text() * 100;
//    var serv = $("#serv").text() * 100;
//    var costcouponsshow = $("#costcouponsshow").text() * 100;
//    var StorageFee = $("#StorageFee").text() * 100;
//    var baoguanfei = $("#baoguanfei").text() * 100;
//    var baoxian = $("#baoxian").text() * 100;

//    var total = (yunfei + serv + costcouponsshow + StorageFee + baoguanfei + baoxian) / 100;
//    return total;
//}
function editAddress(object) {
    var odiv = $(object).parent().parent().parent().parent().parent();
    var Addresshtml = $("#AddressArea").html();

    odiv.find("div[class=ci_cb_aX]").hide();
    odiv.append(Addresshtml);

     
    var paypalimg = odiv.find("img[name='paypalImage']").attr("src");
    if (paypalimg != undefined) {
        odiv.find("div[class=ci_cb_aXxg]").find("ul").find("li").each(function (index) {
            if (index != 1) {
                $(this).find("input").attr("disabled", true);
                $(this).find("select").attr("disabled", true);
            } else {
             
            }
        });
    }

    var usermess = odiv.find("div[class=ci_cb_aXxg]");
    var name = odiv.find("div[class=ci_cb_aX]").find("a[name='name']").text();
    var tel = odiv.find("div[class=ci_cb_aX]").find("a[name='Phone']").text();
    var Country = odiv.find("div[class=ci_cb_aX]").find("a[name='enCountryName']").text();
    var provines = odiv.find("div[class=ci_cb_aX]").find("a[name='provinceName']").text();
    var City = odiv.find("div[class=ci_cb_aX]").find("a[name='cityName']").text();
    var postcode = odiv.find("div[class=ci_cb_aX]").find("a[name='zipcode']").text();
    var Address = odiv.find("div[class=ci_cb_aX]").find("a[name='address']").text();

    usermess.find("input[name='name']").val(name);
    usermess.find("input[name='tel']").val(tel);
    usermess.find("select[name='Country']").find("option").each(function () {
        if ($(this).text() == Country) {
            $(this).attr("selected", true);
        }
    });
    usermess.find("input[name='Provinces']").val(provines);
    usermess.find("input[name='City']").val(City);
    usermess.find("input[name='Postcode']").val(postcode);
    usermess.find("input[name='Address']").val(Address);

    $("input[name='cord.AddressId']").each(function () {
        $(this).attr("disabled", true);
    });
}
function deleteAddress(object) {
    if (confirm("您确定要删除吗?")) {
	    var  url=$("#delete").attr("durl");
        var odjectvalue = $(object).parent().parent().parent().parent().parent();
        var AddressId = odjectvalue.find("div[class=ci_cb_aX]").find("input[name='cord.AddressId']").val();
        $.post(url, {
		
            id: AddressId
			
        }, function (data) {
		 
            if (data) {
                odjectvalue.find("div[class='ci_cb_aX']").parent().remove();
            } else {
                alert("Delete Error!");
            }
        }, "json");
        $("#FreightDiv").mask();
    }
}
function save(object){

    var surl    =$("#AddressArea").attr("url");
    var odjectvalue = $(object).parent().parent();
    var name = odjectvalue.find("input[name='name']").val();
    var tel = odjectvalue.find("input[name='tel']").val();
    var countryId = odjectvalue.find("select[name='Country']").find("option:selected").val();
    var countryName = odjectvalue.find("select[name='Country']").find("option:selected").text();
    var provinces = odjectvalue.find("input[name='Provinces']").val();
    var city = odjectvalue.find("input[name='City']").val();
    var postcode = odjectvalue.find("input[name='Postcode']").val();
    var address = odjectvalue.find("input[name='Address']").val();
    var oldarea = $(object).parent().parent().parent();
    var AddressId = oldarea.find("input[name='cord.AddressId']").val();
    var isCommon = oldarea.find("input[name='isCommon']").val();
    var userId = oldarea.find("input[name='userId']").val();
	
    if (check_addressName(odjectvalue.find("input[name='name']")) && check_tel(odjectvalue.find("input[name='tel']")) && check_postcode(odjectvalue.find("input[name='Postcode']")) && check_city(odjectvalue.find("input[name='City']")) && check_address(odjectvalue.find("input[name='Address']"))   && check_Provinces(odjectvalue.find("input[name='Provinces']"))) {
        $.post(surl, {
		
            Id: AddressId, 
            receiptName: name, 
            countryId: countryId, 
			countryName:countryName, 
            cityName: city, 
            provinceName: provinces, 
            zipCode: postcode, 
            address: address, 
            phone: tel, 
            isCommon: true, 
            userId: userId
        },
		
        function (data) {
		 
            if (data.result) {
                oldarea.find("a[name='name']").text(name);
                oldarea.find("a[name='Phone']").text(tel);
                oldarea.find("a[name='zipcode']").text(postcode);
                oldarea.find("a[name='address']").text(address);
                oldarea.find("a[name='cityName']").text(city);
                oldarea.find("a[name='provinceName']").text(provinces);
                oldarea.find("a[name='enCountryName']").text(countryName);
                oldarea.find("input[name='cord.AddressId']").val(AddressId);
                $("#ShippingAddress").prepend("<div class=\"c_i_center_a\" name=\"addressdiv\">" + oldarea.html() + "</div>");
                oldarea.remove();
            } else {
                alert("Error!Please colsed");
            }
        }, "json");
        colsArea($(object).parent());
    }
}

function CreateAddress(object) {
	
    var curl    =$("#accordion").attr("url");
    var objectvalue = $(object).parent().parent();	 
    var name = objectvalue.find("input[name='name']").val();
    var tel = objectvalue.find("input[name='tel']").val();
    var countryId = objectvalue.find("select[name='Country']").find("option:selected").val();
    var countryName = objectvalue.find("select[name='Country']").find("option:selected").text();
    var provinces = objectvalue.find("input[name='Provinces']").val();
    var city = objectvalue.find("input[name='City']").val();
    var postcode = objectvalue.find("input[name='Postcode']").val();
    var address = objectvalue.find("input[name='Address']").val();
    var userId = objectvalue.find("input[name='userId']").val();
	var AddressId = objectvalue.find("input[name='cord.AddressId']").val();
	 
    if(check_addressName(objectvalue.find("input[name='name']")) && check_tel(objectvalue.find("input[name='tel']")) && check_postcode(objectvalue.find("input[name='Postcode']")) && check_address(objectvalue.find("input[name='Address']")) && check_Country(objectvalue.find("select[name='Country']")) && check_city(objectvalue.find("input[name='City']")) && check_Provinces(objectvalue.find("input[name='Provinces']"))) {
    	
        $.post(curl, {
            countryId:countryId,
            countryName:countryName,			
            receiptName: name, 		
            userId: userId,           
            countryId: countryId, 
            cityName: city, 
            provinceName: provinces, 
            zipCode: postcode, 
            address: address, 
            phone: tel, 
            
        },
        function (data) {
		 
            if (data.result) {			  
                var appmess = "<div class=\"c_i_center_a\" name=\"addressdiv\">";
                appmess += "<div class=\"ci_cb_aX\">";
                appmess += "      <div class=\"ci_cb_aXleft\">";
                appmess += "         <ul>";
                appmess += "           <li>";
                appmess += "               <p>";
                appmess += "                  <input type=\"hidden\" value=\"" + data.result + "\" name=\"cord.AddressId\"/>";
                appmess += "                  <b><a name=\"name\">" + name + "</a></b></p>";
                appmess += "                         <span>Tel:<a name=\"Phone\">" + tel + "</a></span><span>Post code:<a name=\"zipcode\">" + postcode + "</a></span></li>";
                appmess += "                         <li><a name=\"address\">" + address + "</a><a name=\"cityName\">" + city + " </a>";
                appmess += "                             <a name=\"provinceName\">" + provinces + "</a> <b><a name=\"enCountryName\">" + countryName + "</a></b></li>";
                appmess += "         </ul>";
                appmess += "                     <input value=\"" + countryId + "\" name=\"countryId\" type=\"hidden\">";
                appmess += "                     <input value=\"False\" name=\"isCommon\" type=\"hidden\">";
                appmess += "                     <input value=\"" + userId + "\" name=\"userId\" type=\"hidden\">";
                appmess += "      </div>";
                appmess += "      <div class=\"ci_cb_aXright\">";
                appmess += "         <ul>";
                appmess += "            <li><a href=\"javascript:void(0)\" onclick=\"editAddress(this)\">Edit</a></li>";
                appmess += "            <li><a href=\"javascript:void(0)\" onclick=\"deleteAddress(this)\"><span>Delete</span></a></li>";
                appmess += "         </ul>";
                appmess += "      </div>";
                appmess += "</div>";
                appmess += "</div>";

                $("#ShippingAddress").prepend(appmess);
                $("#addressDiv li").find("input").val("");
                $("#addressDiv li").find("select").val(0);
                $("#addressDiv li").find("select").find("option:selected").text("- select one -");
                $("#addressDiv").hide();
            }else{
            	alert('Data loading failure');
            }
        }, "json");
    }
}
function colsArea(object) {
    $(object).hide();
    var area = $(object).parent().parent();
    area.find("div[class=ci_cb_aXxg]").remove();
    area.find("div[name=closeArea]").remove();
    area.find("div[class=ci_cb_aX]").show();

    $("input[name='cord.AddressId']").each(function () {
        $(this).attr("disabled", false);
    });
}

function is_forbid(temp_str) {
    temp_str = trimTxt(temp_str);
    temp_str = temp_str.replace('*', "@");
    temp_str = temp_str.replace('--', "@");
    temp_str = temp_str.replace('/', "@");
    temp_str = temp_str.replace('+', "@");
    temp_str = temp_str.replace('\'', "@");
    temp_str = temp_str.replace('\\', "@");
    temp_str = temp_str.replace('$', "@");
    temp_str = temp_str.replace('^', "@");
    temp_str = temp_str.replace('.', "@");
    temp_str = temp_str.replace('#', "@");
    temp_str = temp_str.replace('(', "@");
    temp_str = temp_str.replace(')', "@");
    temp_str = temp_str.replace(',', "@");
    temp_str = temp_str.replace(';', "@");
    temp_str = temp_str.replace('<', "@");
    temp_str = temp_str.replace('>', "@");
    temp_str = temp_str.replace('?', "@");
    temp_str = temp_str.replace('"', "@");
    temp_str = temp_str.replace('=', "@");
    temp_str = temp_str.replace('{', "@");
    temp_str = temp_str.replace('}', "@");
    temp_str = temp_str.replace('[', "@");
    temp_str = temp_str.replace(']', "@");
    var forbid_str = new String('@,%,~,&,!');
    var forbid_array = new Array();
    forbid_array = forbid_str.split(',');
    for (i = 0; i < forbid_array.length; i++) {
        if (temp_str.search(new RegExp(forbid_array[i])) != -1)
            return false;
    }
    return true;
}
function checknumber(String) {
    if (trimTxt(String) == "") {
        return false;
    }
    var Letters = "1234567890";
    var i;
    var c;
    for (i = 0; i < String.length; i++) {
        c = String.charAt(i);
        if (Letters.indexOf(c) == -1) {
            return false;
        }
    }
    return true;
}
function trimTxt(txt) {
    return txt.replace(/(^\s*)|(\s*$)/g, "");
}
function check_addressName(object) {
    if (!is_forbid($(object).val()) || trimTxt($(object).val()) == "") {
        if (!is_forbid($(object).val())) {
            $(object).parent().next("div").text("用户名不能包含非法字符!");
        }
        if (trimTxt($(object).val()) == "") {
            $(object).parent().next("div").text("请输入您的姓名!");
        }
        return false;
    } else {
        $(object).parent().next("div").text("");
        return true;
    }
}
function check_tel(object) {//楠岃瘉鐢佃瘽
    if (trimTxt($(object).val()) == "") {
        $(object).parent().next("div").text("请输入您的电话号码!");
        return false;
    } else {
        $(object).parent().next("div").text("");
        return true;
    }
}
function check_postcode(object) {//楠岃瘉閭紪
    //            if (!checknumber($(object).val()) | trimTxt($(object).val()) == "") {
    //                $(object).parent().next("div").text("璇锋纭～鍐欓偖缂栵紒");
    //                return false;
    //            } else {
    //                $(object).parent().next("div").text("");
    //                return true;
    //            }
    return true;
}
function check_address(object) {
    if (trimTxt($(object).val()) == "") {
        $(object).parent().next("div").text("请输入您的地址!");
        return false;
    } else {
        $(object).parent().next("div").text("");
        return true;
    }
}

var keymessage = {//鐪乷r宸炲睘鎬�
    init: function (object) {
        if ($(object).parent().parent().find("select[name='Country']").val() == "216") {
            return true;
        } else {
            return false;
        }
    },
    getProvinces: function (object) {
        $(object).next().remove();
		 
        var countryId = $(object).parent().parent().find("select[name='Country']").val();
        var keyvalue = $(object).val();
        if (keyvalue != "" && keymessage.init(object)) {
            $.ajax({
                type: "GET",
                url: "{:U('user/settings/getprovinces')}",
                dataType: "json",
                data: {
                    keyvalue: keyvalue
                },
                success: function (data) {
                    if (data!=null&&data.result) {
                        var htmlval = "<ul class=\"lsxl\">";
                        for (var i = 0; i < data.data.length; i++) {
                            htmlval += "<li onclick=\"keymessage.getvalue(this)\">" + data.data[i] + "</li>";
                        }
                        htmlval += "</ul>";
                        $(object).parent().append(htmlval);
                    }
                }
            });
        }
    },
    getCity: function (object) {
        $(object).next().remove();
		 
        var countryId = $(object).parent().parent().find("select[name='Country']").val();
        var keyvalue = $(object).val();
        if (keyvalue != "") {
            $.ajax({
                type: "GET",
                url:"{:U('user/settings/getcity')}",
                dataType: "json",
                data: {
                    countryId: countryId, 
                    keyvalue: keyvalue
                },
                success: function (data) {
                    if (data != null && data.result) {
                        var htmlval = "<ul class=\"lsxl\">";
                        for (var i = 0; i < data.data.length; i++) {
                            htmlval += "<li onclick=\"keymessage.getvalue(this)\">" + data.data[i] + "</li>";
                        }
                        htmlval += "</ul>";
                        $(object).parent().append(htmlval);
                    }
                }
            });
        }
    },
    getPostCode: function (object) {
        $(object).next().remove();
		 
        var countryId = $(object).parent().parent().find("select[name='Country']").val();
        var cityName = $(object).parent().parent().find("input[name='City']").val();
        var keyvalue = $(object).val();
        if (keyvalue != "") {
            $.ajax({
                type: "GET",
                url: "{:U('user/settings/getpostcode')}",
                dataType: "json",
                data: {
                    countryId: countryId, 
                    cityName: cityName, 
                    keyvalue: keyvalue
                },
                success: function (data) {
                    if (data != null && data.result) {
                        var htmlval = "<ul class=\"lsxl\">";
                        for (var i = 0; i < data.data.length; i++) {
                            htmlval += "<li onclick=\"keymessage.getvalue(this)\">" + data.data[i] + "</li>";
                        }
                        htmlval += "</ul>";
                        $(object).parent().append(htmlval);
                    }
                }
            });
        }
    },
    focus: function (object) {

        if (keymessage.init(object)) {
            if ($(object).val() != "") {
                $(object).parent().next("div").text("");
            }
        } else {
            $(object).parent().next("div").text("");
        }
    },
    blur: function (object) {
        if (keymessage.init(object)) {
            if ($(object).val() == "") {
                switch ($(object).attr("name")) {
                    case "Provinces":
                        $(object).parent().next("div").text("请输入您的省/洲.");
                        break;
                    case "City":
                        $(object).parent().next("div").text("请输入您的城市.");
                        break;
                    default:
                        $(object).parent().next("div").text("");
                        break;
                }
            } else {
                $(object).parent().next("div").text("");
            }
        } else {
            $(object).parent().next("div").text("");
        }
        if ($(object).parent().find("ul[class='lsxl']").html() != null) {
            var obj = $(object).parent().find("ul[class='lsxl']");

            //$(object).parent().find("ul[class='lsxl']").remove();
            setTimeout(function () {
                $(object).parent().find("ul[class='lsxl']").remove();
            }, 200);
        }
    },
    getvalue: function (object) {
        $(object).parent().prev().val($(object).text());
        $(object).parent().remove();
    }
};
function check_Country(object) {
    if ($(object).val() == 0) {
        $(object).parent().next("div").text("请输入您的国家");
        return false;
    } else {
        $(object).parent().next("div").text("");
        $(object).parent().parent().find("input[name='Provinces']").unbind();
        return true;
    }
}
function check_contents(object) {
    var contentsvalue = $(object).val();
    if (contentsvalue.length > 30) {
        alert("The length is 30!");
    }
}
function check_city(object) {
    var citymess = $(object).val();
    if (citymess == "") {
        $(object).parent().next("div").text("请输入您的城市.");
        return false;
    } else {
        $(object).parent().next("div").text("");
        return true;
    }
}
function hideremark(object) {
    if ($(object).attr("checked")) {
        $("#remark").show();
    } else {
        $("#remark").hide();
    }
}
function check_remark(object) {
    var remarkvalue = $(object).val();
    if (remarkvalue.length > 200) {
        alert("The length is 200");
    }
}
function check_Provinces(object) {
    var provalue = $(object).parent().parent().find("select[name='Country']").val();
    if (provalue == "216") {
        if ($(object).val() == "") {
            $(object).parent().next("div").text("请输入您的省/洲.");
            return false;
        } else {
            $(object).parent().next("div").text("");
            return true;
        }
    } else {
        $(object).parent().next("div").text("");
        return true;
    }
}
