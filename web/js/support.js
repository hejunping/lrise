//格式化小数，并四舍五入。如：FormatNum(100.12345678,4)
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
    return CNY / 6.06;
}

function getDetail() {
    var type = $("input[name='rbtnFreight']:checked").val();
    var cost = parseFloat($("#HomeFeright").val()) + parseFloat($("#GoodsAmount").val());
    var countryId = $("#CountryList").val();
    var googsWeight = $("#GoodsWeight").val();
    var rbtnId = $("input[name='rbtnFreight']:checked").attr("id");
    if (rbtnId == "rbtnDhlFreight") {
        $("#peisong").html("DHL");
    } else if (rbtnId == "rbtnEmsFreight") {
        $("#peisong").html("EMS");
    }
    else if (rbtnId == "rbtnIspFreight") {
        $("#peisong").html("Airmail for Small Packages");
    }
    else if (rbtnId == "rbtnOnAirFreight") {
        $("#peisong").html("Air Parcel");
    }
    else if (rbtnId == "rbtnSALFreight") {
        $("#peisong").html("SAL Parcel");
    }
    else if (rbtnId == "rbtnChinaFreight") {
        $("#peisong").html("Domestic forwarding");
    }
    if (isNaN(cost)) {
        alert("Commodity price or no input, please check");
    }
    else {
        $('#loadingInfo2').mask('Data calculation');
        $.post("index.php?m=tool&a=getdetail" + "&ran=" + Math.random(),
        { "fireghtType": type, "countryId": countryId, "goodsCost": cost, "weight": googsWeight },
         function (data, textStatus) {
             $("#GoodsWeight1").html(data.ItemTotalWeight);
             $("#DiscountGoodsFreight").html(data.DiscountGoodsFreight);
             //$("#peisong").html(FormatNum(CNYtoUSDConstr(data.Shipment), 2));

             //$("#peisong").html($(this).parent().attr("name"));
             // $("#baoxian").html(data.InsureShow);
             $("#Dazhe").html(FormatNum(CNYtoUSDConstr(data.DiscountShow), 2));
             var homeFeright = FormatNum(CNYtoUSDConstr($("#HomeFeright").val()), 2);
             var TotalCost = FormatNum(CNYtoUSDConstr(data.TotalCost), 2);
             var GoodsAmount = FormatNum(CNYtoUSDConstr($("#GoodsAmount").val()), 2);
             
             $("#GJFrieght").html(FormatNum(CNYtoUSDConstr(data.Freight), 2));
             //$("#Zhongliang").html(data.PackTotalWeight);
             $("#Zhongliang").html(FormatNum(parseFloat(googsWeight)*1,1));
             $("#baoxianfei").html(FormatNum(CNYtoUSDConstr(data.InsureCost), 2));
             
             var qingguanfei = FormatNum(CNYtoUSDConstr(data.ClearanceCharge), 2);
             $("#baoguanfei").html(qingguanfei);
             
             var zhehouguoji = FormatNum(CNYtoUSDConstr(data.DiscountFreight), 2);
             $("#Yunfeitxt").html(zhehouguoji);
             
             $("#packInfo").html("&nbsp;&nbsp; ( items weght + packing weight )");
             var producttxt = FormatNum(CNYtoUSDConstr($("#GoodsAmount").val()), 2);
             
             var changpingfei = FormatNum((parseFloat(homeFeright) + parseFloat(producttxt)), 2);
             $("#Producttxt").html(changpingfei);
             
             var feiwufei = FormatNum((parseFloat(homeFeright) + parseFloat(producttxt))*0.06, 2);
             if(feiwufei < 5.6){
            	 feiwufei = 5.60;
            	 
            	 $("#serv").html(feiwufei);
                 $("#serv").attr("title", " The service fee of this parcel is less than our minimum service fee, so your service fee is " + FormatNum(CNYtoUSDConstr(data.MinServiceCharge), 2) + " USD");
             }
             else{
            	 $("#serv").html(feiwufei);
             }
             
             
             var dazhehou = FormatNum((parseFloat(qingguanfei) + parseFloat(zhehouguoji) + parseFloat(changpingfei) + parseFloat(feiwufei)),2);
             $("#Dazhehou").html(dazhehou);
             
             /*if (data.ServiceCost < data.MinServiceCharge) {
            	 
                 $("#serv").html(FormatNum(CNYtoUSDConstr(data.MinServiceCharge), 2));
                 $("#serv").attr("title", " The service fee of this parcel is less than our minimum service fee, so your service fee is " + FormatNum(CNYtoUSDConstr(data.MinServiceCharge), 2) + " USD");
             }
             else {

                 $("#serv").html(FormatNum(CNYtoUSDConstr(data.ServiceCost), 2));
             }*/
             $('#loadingInfo2').unmask();
         },"json");
    }
}


$(document).ready(function () {

    $.extend($.fn, {
        mask: function (msg, maskDivClass) {
            this.unmask();
            // 参数 
            var op = {
                opacity: 0.8,
                z: 10000,
                bgcolor: '#ccc'
            };
            var original = $(document.body);
            var position = { top: 0, left: 0 };
            if (this[0] && this[0] !== window.document) {
                original = this;
                position = original.position();
            }
            // 创建一�? Mask 层，追加到对象中 
            var maskDiv = $('<div class="maskdivgen"> </div>');
            maskDiv.appendTo(original);
            var maskWidth = original.outerWidth();
            if (!maskWidth) {
                maskWidth = original.width();
            }
            var maskHeight = original.outerHeight();
            if (!maskHeight) {
                maskHeight = original.height();
            }
            maskDiv.css({
                position: 'absolute',
                top: position.top,
                left: position.left,
                'z-index': op.z,
                width: maskWidth,
                height: maskHeight,
                'background-color': op.bgcolor,
                opacity: 0
            });
            if (maskDivClass) {
                maskDiv.addClass(maskDivClass);
            }
            if (msg) {
                var msgDiv = $('<div style="position:absolute;border:#6593cf 1px solid; padding:2px;background:#ccca"><div style="line-height:24px;border:#a3bad9 1px solid;background:white;padding:2px 10px 2px 10px">' + msg + '</div></div>');
                msgDiv.appendTo(maskDiv);
                var widthspace = (maskDiv.width() - msgDiv.width());
                var heightspace = (maskDiv.height() - msgDiv.height());
                msgDiv.css({
                    cursor: 'wait',
                    top: (heightspace / 2 - 2),
                    left: (widthspace / 2 - 2)
                });
            }
            maskDiv.fadeIn('fast', function () {
                // 淡入淡出效果 
                $(this).fadeTo('slow', op.opacity);
            });
            return maskDiv;
        },
        unmask: function () {
            var original = $(document.body);
            if (this[0] && this[0] !== window.document) {
                original = $(this[0]);
            }
            original.find("> div.maskdivgen").fadeOut('slow', 0, function () {
                $(this).remove();
            });
        }

    });

    $('#loadingInfo').mask('Please enter the relevant information');
    $('#loadingInfo2').mask('Please select the shipping method');

    //    $("#GoodsWeight").blur(function () {
    //        var countryId = $("#CountryList").val();
    //        var weight = $("#GoodsWeight").val();
    //        if (countryId == 0) {
    //            $('#loadingInfo').mask('Please select the destination country!');
    //        }
    //        else if (isNaN(weight) || weight == "") {
    //            $('#loadingInfo').mask('Please enter the correct product weight!');
    //        }
    //        else
    //        { $(this).showFreight(); }
    //    });
    function showPage() {
        var countryId = $("#CountryList").val();
        var weight = $("#GoodsWeight").val();
        if (countryId == 0) {
            $('#loadingInfo').mask('Please select the destination country!');
        }
        else if (isNaN(weight) || weight == "") {
            $('#loadingInfo').mask('Please enter the correct product weight!');
        }
        else {
            $(this).showFreight();
            $("input[name='rbtnFreight']").each(function () {
                if ($(this).attr("checked")) {
                    getDetail();
                }
            });
        }
    }

    $("#GoodsWeight").keyup(function() {
        showPage();
    });
    $("#GoodsAmount").keyup(function () {
        showPage();
    });
    $("#HomeFeright").keyup(function () {
        showPage();
    });
    
    jQuery.fn.extend({
        showFreight: function () {
            var googsWeight = $("#GoodsWeight").val();
            var countryId = $("#CountryList").val();
            if (countryId == 0) {
                $('#loadingInfo').mask('Please select the destination country');
            }
            else {
                $('#loadingInfo').mask('International shipping is query, please wait .....');
                $.ajax({
                    url: "index.php?m=tool&a=getfreightestimate&ran=" + Math.random(),
                    //url: "http://www.yoybuy.com/en/getfreightestimate" + "?ran=" + Math.random(),
                    data: "countryId=" + countryId + "&goodsWeight=" + googsWeight,
                    success: function (Jsons) {
                        var array = eval(Jsons);
                        for (var i = 0; i < array.length; i++) {
                            if (array[i].TypeName == "China") {
                                $("#chinaSend").html(array[i].FreightInfo);
                                if (array[i].FreightInfo.substring(array[i].FreightInfo.length - 5) != "</ul>") {
                                    $("#rbtnChinaFreight").attr("disabled", "disabled");
                                    $("#rbtnChinaFreight").removeAttr("checked");
                                } else {
                                    $("#rbtnChinaFreight").removeAttr("disabled");
                                    $("#rbtnChinaFreight").attr("value", array[i].TypeName);
                                }
                            }

                            if (array[i].TypeName == "EMS") {

                                $("#EMSAmount").html(array[i].FreightInfo);
                                if (array[i].FreightInfo.substring(array[i].FreightInfo.length - 5) != "</ul>") {
                                    $("#rbtnEmsFreight").attr("disabled", "disabled");
                                    $("#rbtnEmsFreight").removeAttr("checked");
                                } else {
                                    $("#rbtnEmsFreight").removeAttr("disabled").attr("value", array[i].TypeName);
                                }
                            }

                            if (array[i].TypeName == "ISP") {

                                $("#ISPAmount").html(array[i].FreightInfo);
                                if (array[i].FreightInfo.substring(array[i].FreightInfo.length - 5) != "</ul>") {
                                    $("#rbtnIspFreight").attr("disabled", "disabled");
                                    $("#rbtnIspFreight").removeAttr("checked");
                                } else {
                                    $("#rbtnIspFreight").removeAttr("disabled").attr("value", array[i].TypeName);
                                }
                            }

                            if (array[i].TypeName == "DHL") {
                                $("#DHLAmount").html(array[i].FreightInfo);
                                if (array[i].FreightInfo.substring(array[i].FreightInfo.length - 5) != "</ul>") {
                                    $("#rbtnDhlFreight").attr("disabled", "disabled");
                                    $("#rbtnDhlFreight").removeAttr("checked");
                                } else {
                                    $("#rbtnDhlFreight").removeAttr("disabled").attr("value", array[i].TypeName);
                                }
                            }

                            if (array[i].TypeName == "IBP_OnAir") {
                                $("#OnAirAmount").html(array[i].FreightInfo);
                                if (array[i].FreightInfo.substring(array[i].FreightInfo.length - 5) != "</ul>") {
                                    $("#rbtnOnAirFreight").attr("disabled", "disabled");
                                    $("#rbtnOnAirFreight").removeAttr("checked");
                                } else {
                                    $("#rbtnOnAirFreight").removeAttr("disabled").attr("value", array[i].TypeName);
                                }
                            }

                            if (array[i].TypeName == "IBP_SAL") {
                                $("#SALAmount").html(array[i].FreightInfo);
                                if (array[i].FreightInfo.substring(array[i].FreightInfo.length - 5) != "</ul>") {
                                    $("#rbtnSALFreight").attr("disabled", "disabled");
                                    $("#rbtnSALFreight").removeAttr("checked");
                                } else {
                                    $("#rbtnSALFreight").removeAttr("disabled").attr("value", array[i].TypeName);
                                }
                            }

                            if (array[i].TypeName == "IBP_OceanShipping") {
                                $("#OceanShippingAmount").html(array[i].FreightInfo);
                                if (array[i].FreightInfo.substring(array[i].FreightInfo.length - 5) != "</ul>") {
                                    $("#rbtnOceanShippingFreight").attr("disabled", "disabled");
                                    $("#rbtnOceanShippingFreight").removeAttr("checked");
                                } else {
                                    $("#rbtnOceanShippingFreight").removeAttr("disabled").attr("value", array[i].TypeName);
                                }
                            }
                        }
                        $('#loadingInfo').unmask();
                    }
                });
            }
        }
    });
    function convertPrice(idvalue) {
        var stringid = "#" + idvalue;

        if ($(stringid).text() != "") {

            $(stringid).text("$" + FormatNum(CNYtoUSDConstr($(stringid).text()), 2));
        }


    }
    $("#CountryList").change(function () { //事件發生
        var googsWeight = $("#GoodsWeight").val();
        var countryId = $("#CountryList").val();
        if (isNaN(googsWeight) || googsWeight == "") {
            $('#loadingInfo').mask('Please enter the correct product weight!');
        }
        else if (countryId == 0) {
            $('#loadingInfo').mask('Please select the destination country!');
        }
        else {
            $(this).showFreight();
        }
    });
});
function showOrClose(id) {
    $("#son" + id).toggle("slow");
}

function reinitIframe(obj) {
    obj.height = 100;
    obj.height = obj.contentWindow.document.documentElement.scrollHeight;
}
