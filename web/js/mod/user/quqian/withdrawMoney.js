function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}
$(document).ready(function () {

    $("#ppEmail").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#ppEmailValidation").text("This account will be used to receive the money.");
        } else {
            if (!IsEmail($(this).val())) {
                $("#ppEmailValidation").text("Enter a valid account.");
            } else {
                $("#ppEmailValidation").text("√");
            };
        };
    });
    $("#ppApplyMoney").keyup(function () {
        $(this).val($(this).val().replace(/[^\d\.]/g, ''));
    });
    $("#ppApplyMoney").blur(function () {
        USDbalance = USDbalance;

        if ($.trim($(this).val()) == "") {
            $("#ppApplyMoneyValidation").text("You entered an invalid amount.");
        }
        else {
            if ($(this).val() > USDbalance) {
                $("#ppApplyMoneyValidation").text("The refund money can not above the balance .");
            } else {
                $("#ppApplyMoneyValidation").text("√");
            };
        };
    });
    $("#ccApplyMoney").keyup(function () {
        $(this).val($(this).val().replace(/[^\d\.]/g, ''));
    });
    $("#ccApplyMoney").blur(function () {
        USDbalance = USDbalance;

        if ($.trim($(this).val()) == "") {
            $("#ccApplyMoneyValidation").text("You entered an invalid amount.");
        }
        else {
            if ($(this).val() > USDbalance) {
                $("#ccApplyMoneyValidation").text("The refund money can not above the balance .");
            } else {
                $("#ccApplyMoneyValidation").text("√");
            };
        };
    });
    $("#wuFirstName").keyup(function () {
        $(this).val($(this).val().replace(/[^a-zA-Z| ]/g, ''));
    });
    $("#wuFirstName").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#wuFirstNameValidation").text("Please enter the correct name ");
        } else {
            $("#wuFirstNameValidation").text("√");
        };
    });
    $("#wuMiddleName").keyup(function () {
        $(this).val($(this).val().replace(/[^a-zA-Z| ]/g, ''));
    });
    $("#wuLastName").keyup(function () {
        $(this).val($(this).val().replace(/[^a-zA-Z| ]/g, ''));
    });
    $("#wuLastName").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#wuLastNameValidation").text("Please enter the correct name");
        } else {
            $("#wuLastNameValidation").text("√");
        };
    });
    $("#wuCity").keyup(function () {
        $(this).val($(this).val().replace(/[^a-zA-Z| ]/g, ''));
    });
    $("#wuCity").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#wuCityValidation").text("Please enter your city ");
        } else {
            $("#wuCityValidation").text("√");
        };
    }); 

    $(".one_b").blur(function () {2
        if ($.trim($(this).val()) == 0) {
            $("#wuCountryValidation").text("Please select from pull-down menu.");
        } else {
            $("#wuCountryValidation").text("√");
        };
    });
    $(".one_b").change(function () {
        if ($.trim($(this).val()) == 0) {
            $("#wuCountryValidation").text("Please select from pull-down menu.");
        } else {
            $("#wuCountryValidation").text("√");
        };
    });
    $("#wuApplyMoney").keyup(function () {
        $(this).val($(this).val().replace(/[^\d\.]/g, ''));
    });
    $("#wuApplyMoney").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#wuApplyMoneyValidation").text("You entered an invalid amount.");
        } else {
            if ($(this).val() > USDbalance) {
                $("#wuApplyMoneyValidation").text("The refund money can not above the balance .");
            } else {
                $("#wuApplyMoneyValidation").text("√");
            };
        };
    });

    $("#mgFirstName").keyup(function () {
        $(this).val($(this).val().replace(/[^a-zA-Z| ]/g, ''));
    });
    $("#mgFirstName").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#mgFirstNameValidation").text("Please enter the correct name ");
        } else {
            $("#mgFirstNameValidation").text("√");
        };
    });
    $("#mgMiddleName").keyup(function () {
        $(this).val($(this).val().replace(/[^a-zA-Z| ]/g, ''));
    });
    $("#mgLastName").keyup(function () {
        $(this).val($(this).val().replace(/[^a-zA-Z| ]/g, ''));
    });
    $("#mgLastName").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#mgLastNameValidation").text("Please enter the correct name");
        } else {
            $("#mgLastNameValidation").text("√");
        };
    });
    $("#mgCity").keyup(function () {
        $(this).val($(this).val().replace(/[^a-zA-Z| ]/g, ''));
    });
    

    $("#mgCountry").blur(function () {
        if ($.trim($(this).val()) == 0) {
            $("#mgCountryValidation").text("Please select from pull-down menu.");
        } else {
            $("#mgCountryValidation").text("√");
        };
    });
    $("#mgApplyMoney").keyup(function () {
        $(this).val($(this).val().replace(/[^\d\.]/g, ''));
    });
    $("#mgApplyMoney").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#mgApplyMoneyValidation").text("You entered an invalid amount.");
        } else {
            if ($(this).val() > USDbalance) {
                $("#mgApplyMoneyValidation").text("The refund money can not above the balance .");
            } else {
                $("#mgApplyMoneyValidation").text("√");
            };
        };
    });
    $("#dbsAccountType").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#dbsAccountTypeValidation").text("Please enter the correct AccountType");
        } else {
            $("#dbsAccountTypeValidation").text("√");
        };
    });
    $("#dbsAccountNumber").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#dbsAccountNumberValidation").text("Please enter the correct AccountNumber");
        } else {
            $("#dbsAccountNumberValidation").text("√");
        };
    });
    $("#dbsApplyMoneyUSD").keyup(function () {
        $(this).val($(this).val().replace(/[^\d\.]/g, ''));
        $("#dbsApplyMoneySGD").val(($(this).val() * USDRate / SGDRate).toFixed(2));
    });
    $("#dbsApplyMoneyUSD").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#dbsApplyMoneyUSDValidation").text("You entered an invalid amount.");
        } else {
            if ($(this).val() > USDbalance) {
                $("#dbsApplyMoneyUSDValidation").text("The refund money can not above the balance .");
            } else {
                $("#dbsApplyMoneyUSDValidation").text("√");
            };
        };
    });
    $("#wmPurse").keyup(function () {
        $(this).val($(this).val().replace(/[^a-zA-Z|0-9]/g, ''));
    });
    $("#wmPurse").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#wmPurseValidation").text("Only numbers and letters.");
        } else {
            $("#wmPurseValidation").text("√");
        };
    });
    $("#wmApplyMoney").keyup(function () {
        $(this).val($(this).val().replace(/[^\d\.]/g, ''));
    });
    $("#wmApplyMoney").blur(function () {
        if ($.trim($(this).val()) == "") {
            $("#wmApplyMoneyValidation").text("You entered an invalid amount.");
        } else {
            if ($(this).val() > USDbalance) {
                $("#wmApplyMoneyValidation").text("The refund money can not above the balance .");
            } else {
                $("#wmApplyMoneyValidation").text("√");
            };
        };
    });
    $("#AddRefundInfo").click(function () {//即将废除
        SubmitAddRefundInfo('0', '0');
    });
    $("#ppSubmit").click(function () {
        SubmitAddRefundInfo('PayPal', 'pp');
    });
    $("#wuSubmit").click(function () {
        SubmitAddRefundInfo('Western Union', 'wu');
    });
    $("#mgSubmit").click(function () {
        SubmitAddRefundInfo('MoneyGram', 'mg');
    });
    $("#dbsSubmit").click(function () {
        SubmitAddRefundInfo('DBS', 'dbs');
    });
    $("#wmSubmit").click(function () {
        SubmitAddRefundInfo('WebMoney', 'wm');
    });
    $("#ccSubmit").click(function () {
        SubmitAddRefundInfo('CreditCard', 'cc');
    });
});

function SubmitAddRefundInfo(type, abtype) {
    //获取录入数据 开始
    var ppEmail = $.trim($("#ppEmail").val()); //*
    var ppApplyMoney = $.trim($("#ppApplyMoney").val()); //*
    var ppRemark = $.trim($("#ppRemark").val());

    var wuFirstName = $.trim($("#wuFirstName").val()); //*
    var wuMiddleName = $.trim($("#wuMiddleName").val());
    var wuLastName = $.trim($("#wuLastName").val()); //*
    var wuCity = $.trim($("#wuCity").val());
    var wuCountry = $.trim($("#wuCountry").val()); //*
    var wuApplyMoney = $.trim($("#wuApplyMoney").val()); //*
    var wuRemark = $.trim($("#wuRemark").val());

    var mgFirstName = $.trim($("#mgFirstName").val()); //*
    var mgMiddleName = $.trim($("#mgMiddleName").val());
    var mgLastName = $.trim($("#mgLastName").val()); //*
    var mgCity = $.trim($("#mgCity").val());
    var mgCountry = $.trim($("#mgCountry").val()); //*
    var mgApplyMoney = $.trim($("#mgApplyMoney").val()); //*
    var mgRemark = $.trim($("#mgRemark").val());

    var dbsAccountType = $.trim($("#dbsAccountType").val()); //*
    var dbsAccountNumber = $.trim($("#dbsAccountNumber").val()); //*
    var dbsApplyMoneyUSD = $.trim($("#dbsApplyMoneyUSD").val()); //*
    var dbsApplyMoneySGD = $.trim($("#dbsApplyMoneySGD").val()); //*
    var dbsRemark = $.trim($("#dbsRemark").val());

    var wmPurse = $.trim($("#wmPurse").val()); //*
    var wmApplyMoney = $.trim($("#wmApplyMoney").val()); //*
    var wmRemark = $.trim($("#wmRemark").val()); //

    var ccEmail = $.trim($("#ccEmail").val()); //*
    var ccApplyMoney = $.trim($("#ccApplyMoney").val()); //*
    var ccRemark = $.trim($("#ccRemark").val());
    //获取录入数据 结束
    if (abtype == "pp") {
        var ppaplyMoneyvalue = parseInt($("#ppApplyMoney").val());
        if (isNaN(ppaplyMoneyvalue) || ppaplyMoneyvalue == 0) {   
            alert("Please check and enter the valid information.");
            return false;
        } else {//OK
            var cardNumber = '';
            var balance = $.trim($("#balance").val());
            var applyMoney = ppApplyMoney;
            var paymentType = 1;
            var CardNo = '';
            var Email = ppEmail;
            var UserName = '';
            var ManName = '';
            var Connect = '';
            var Remark = 'Remark:' + ppRemark;
            var OtherPaymentID = 0;
            var Currency = 0;
        }
    } else if (abtype == "wu") {
        if ($("#wuFirstNameValidation").text() != "√" || $("#wuLastNameValidation").text() != "√" || $("#wuCountryValidation").text() != "√" || $("#wuApplyMoneyValidation").text() != "√") {
            alert("Please check and enter the valid information.");
            return false;
        } else {//
           var cardNumber = '';
            var balance = $.trim($("#balance").val());
            var applyMoney = wuApplyMoney;
            var paymentType = "WesternUnion";
            var CardNo = '';
            var Email = '';
            var UserName = '';
            var ManName = 'FirstName:' + wuFirstName + ' MiddleName:' + wuMiddleName + ' LastName:' + wuLastName;
            var Connect = '';
            var Remark = 'City:' + wuCity + ' Country:' + $("#WuCountry").find("option:selected").text() + ' Remark:' + wuRemark;
            var OtherPaymentID = 1;
            var Currency = 0;
        }
    } else if (abtype == "mg") {
        if ($("#mgFirstNameValidation").text() != "√" || $("#mgLastNameValidation").text() != "√" || $("#mgCountryValidation").text() != "√" || $("#mgApplyMoneyValidation").text() != "√") {
            alert("Please check and enter the valid information.");
            return false;
        } else {//OK
            var cardNumber = '';
            var balance = $.trim($("#balance").val());
            var applyMoney = mgApplyMoney;
            var paymentType = 0;
            var CardNo = '';
            var Email = '';
            var UserName = '';
            var ManName = 'FirstName:' + mgFirstName + ' MiddleName:' + mgMiddleName + ' LastName:' + mgLastName;
            var Connect = '';
            var Remark = 'City:' + mgCity + ' Country:' + $("#mgCountry").find("option:selected").text() + ' Remark:' + mgRemark;
            var OtherPaymentID = 2;
            var Currency = 0;
        }
    } else if (abtype == "dbs") {
        if ($("#dbsAccountTypeValidation").text() != "√" || $("#dbsAccountNumberValidation").text() != "√" || $("#dbsApplyMoneyUSDValidation").text() != "√") {
            alert("Please check and enter the valid information.");
            return false;
        } else {//OK
            var cardNumber = '';
            var balance = $.trim($("#balance").val());
            var applyMoney = dbsApplyMoneyUSD;
            var paymentType = 0;
            var CardNo = '';
            var Email = '';
            var UserName = '';
            var ManName = '';
            var Connect = '';
            var Remark = 'AccountType:' + dbsAccountType + ' AccountNumber:' + dbsAccountNumber + ' Remark:' + mgRemark;
            var OtherPaymentID = 4;
            var Currency = 0;
        }
    } else if (abtype == "wm") {
        if ($("#wmPurseValidation").text() != "√" || $("#wmApplyMoneyValidation").text() != "√") {
            alert("Please check and enter the valid information.");
            return false;
        } else {//OK
            var cardNumber = '';
            var balance = $.trim($("#balance").val());
            var applyMoney = wmApplyMoney;
            var paymentType = "WebMoney";
            var CardNo = '';
            var Email = '';
            var UserName = '';
            var ManName = '';
            var Connect = '';
            var Remark = 'Purse:' + wmPurse + ' Remark:' + wmRemark;
            var OtherPaymentID = 5;
            var Currency = 0;
        }
    } else if (abtype == "cc") {
        var ccaplyMoneyvalue = parseInt($("#ccApplyMoney").val());
        if (isNaN(ccaplyMoneyvalue) || ccaplyMoneyvalue == 0) {
            alert("Please check and enter the valid information.");
            return false;
        } else {//OK
            var cardNumber = '';
            var balance = $.trim($("#balance").val());
            var applyMoney = ccApplyMoney;
            var paymentType = "CreditCard";
            var CardNo = '';
            var Email = ccEmail;
            var UserName = '';
            var ManName = '';
            var Connect = '';
            var Remark = 'Remark:' + ccRemark;
            var OtherPaymentID = 6;
            var Currency = 0;
        }
    }else
    {
        alert('The refund method is incorrect.');
        location.reload();
        return false;
    }
    if (confirm("Are you sure that all the information is correct?")) {
        $.colorbox({ width: "50%", inline: true, href: "#inline_example1", overlayClose: false, onCleanup: false
        });
        $.post(GRefundSave,
            { "ApplyMoney": applyMoney, "UserName": UserName, "CardNo": CardNo, "Connect": Connect, "DrawbackType": paymentType, "EmailAddresss": Email, "ManName": ManName, "Remark": Remark, "OtherPaymentID": OtherPaymentID, "Currency": Currency },

            function (data, textStatus) {
                var obj3 = eval(data); //可用                     
                if (data) {
                    $("#inline_example1").html("<span id='infos'>We will operate your withdrawal application within 24 Hours, please take care of your account in these days.</span>");
                    $.colorbox({ width: "50%", inline: true, href: "#inline_example1", overlayClose: false, onCleanup: false
                    , onClosed: function () { window.location = GRefund; }
                    });
                }
                else {
                    $("#inline_example1").html("<span id='infos'>" + obj3.Message + "</span>");
                    $.colorbox({ width: "50%", inline: true, href: "#inline_example1", overlayClose: false, onCleanup: false
                    });
                }
            }
        );
    }
}; 
   