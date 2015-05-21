

//商品数量减少
function showAmount(sku,id,str){
	if(sku==null || sku=="" || sku==0)
		sku=99;
	var values=parseFloat($("#Amount"+id).val());
	var url=$('#goodsList_inCar').attr('url');
	var ivalue=values;
	switch (str) {
	  	case 'min': values--; break;
	  	case 'add': values++; break;
	  	case 'tet': values; break;
	  	default: alert('Illegal operation ');
	  }
	if(values>=1 && values<=sku){
	    $.post(url,{id: id, val: values},function(data){
	    	if(data.result==true){
	    		$("#Amount"+id).val(values);
	    		priceAmount(id,values);//价格变动
	    		totprices();//总价变动
	    	}else{
	    		$("#Amount"+id).val(ivalue);
	    		alert('Operation failure !');
	    	}
	    },'json')
	}
}
//价格变动
function priceAmount(id,values){
	var price=parseFloat($("#price"+id).attr("price"));
	var freight=parseFloat($("#freight"+id).attr("freight"));
	var totprice=parseFloat($("#totprice"+id).attr("totprice"));
	var huil=parseFloat($('#goodsList_inCar').attr('huil'));
	var ytotpric=price*values+freight;
	totprice=(ytotpric)/huil;
	$("#totprice"+id).attr("totprice",ytotpric.toFixed(2));
	$("#totprices"+id).html("$ "+totprice.toFixed(2));
}
//总价变动
function totprices(){
	var huil=parseFloat($('#goodsList_inCar').attr('huil'));
	var total = 0;
	$('.chkbox').each(function(){
		var t=$(this).attr('checked');
		if(t==true){
			total = total + parseFloat($(this).attr('totprice'));
		}
	});
	$("#TotalMoeny").attr("tot",total);
	total=total/huil;
	$("#TotalMoeny").html("$ "+total.toFixed(2));
}

//支付流程
function GoToAccount(t){
	if(t==0){
		alert("Your shopping cart is empty !");
		
	}else{
		var huil=parseFloat($('#goodsList_inCar').attr('huil'));
		var mybalan=parseFloat($('#mybalance').attr('tot'));
		var totbala=parseFloat($('#TotalMoeny').attr('tot'));
        var lurl = $("#goodsList_inCar").attr('lurl');
        $.get(lurl,function(rs){
            if(rs != "1")
            {
                alert('your need to sign in first');
                location.href = rs;
                return;
            }
//            if(mybalan < totbala){
//                $(".advisor").show();
//            }else{
//                ishow('iaddress','iclass');
//            }
            ishow('iaddress','iclass');
            //window.location.href = "user-order-choosepay.html";
			
        },'html');
		
	}
}
//删除
function DelGoods(id){
	var arr= new Array();
	var url=$("#deleGoods").attr('deleGoods');
	var  iurl=$("#deleGoods").attr('iurl');
	if(id!=0){
		arr.push(id);
	}else{
		$('.chkbox').each(function(){
			var t=$(this).attr('checked');
			if(t==true){
				arr.push($(this).val());
			}
		});
	}
	var ids = "";
	for(var i=0;i<arr.length;i++) {
		ids += arr[i] + ",";
	}
	if(ids) {
		ids = ids.substring(0, ids.length-1);
	}
	var istrue=confirm('Are you sure you want to delete this item ?');
	if(istrue){
		$.post(url,{id:ids},function(data){
			if(data.res){
				alert("Deleted successful !");
				location.href=iurl;
			}else{
				alert("Delete failure !");
			}
		},"json")
	}
}
//添加 我喜欢
function ifavorite(){
	var url=$("#deleGoods").attr('ifs');
	var arr= new Array();
	$('.chkbox').each(function(){
		var t=$(this).attr('checked');
		if(t==true){
			arr.push($(this).val());
		}
	});
	$.post(url,{id:arr},function(data){
		if(data.res){
			alert("The item(s) had been successfully added to “My favorite”!");
			location.href=iurl;
		}
	},"json")
}
//关闭
function CloseShow(divs){
	$("#"+divs).hide();
}
function OpenShow(divs){
	$("#"+divs).show();
}
//goodsUrl默认值
function clearKeysA() {
    if ($("#goodsUrl").val() == "Please enter the original webpage URL of the item.") {
        $("#goodsUrl").val("");
    }
}
function clearKeysB() {
    if ($("#goodsUrl").val() == "") {
        $("#goodsUrl").val("Please enter the original webpage URL of the item.");
    }
}
//
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
//
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
//帮助
function helpover(){
	$("#help").removeClass("menu3");
	$("#help").addClass("menu4");
	
}
function helpout(){
	$("#help").removeClass("menu4");
	$("#help").addClass("menu3");
}
//i
function ishow(idiv,types){
	switch (types) {
  	case 'ids': $("#"+idiv).show(); break;
  	case 'iclass': $("."+idiv).show(); break;
  	default: $("."+idiv).show();
  }
}
function ihide(idiv,types){
	switch (types) {
  	case 'ids': $("#"+idiv).hide(); break;
  	case 'iclass': $("."+idiv).hide(); break;
  	default: $("."+idiv).hide();
	}
}




//newgoods 
function getGoods() {
	var goodsUrl=$("#goodsUrl").val();
	var url =$("#goodsurlajax").attr("goodsurlajax");
	var cartdiv=$("div[name='goodmessage']").attr("ss");
	var huil=$("#huil").attr("huil");
	if(cartdiv=="ss"){$("#goodsurlajas").css("display", "block");}
    if (goodsUrl != "") {
        if (new RegExp("http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?").test(goodsUrl)) {
            $("#firstTip").html("<img src='web/images/user/loading1.gif'  /><br/>Searching item's information...");
            $.post(url, { goodsUrl: goodsUrl },
                        function (data) {
                            if (data.result) {
                            	
                                if (data.data.title != null && data.data.title != "") {
                                    $("#goodsName").attr("disabled", "disabled");
                                    $("#goodsName").val(data.data.title);

                                }

                                if (data.data.pic_url != null && data.data.pic_url != "") {
                                    $("#goodsPhoto").attr("src", data.data.pic_url);
                                }
                                else {
                                    $("#goodsPhoto").attr("src", "web/images/user/empty.jpg");
                                }
                                if (data.data.price != 0 && data.data.price != null) {
                                	var price=data.data.price/huil;
                                	var fee=data.data.post_fee/huil;
                                    $("#goodsPrice").val(price.toFixed(2));
                                    $("#goodsPricehide").val(data.data.price);
                                    $("#goodsPricehide").attr("disabled", "disabled");//FormatNum(CNYtoUSDConstr(data.data.Freight), 2)

                                    $("#goodsFreight").val(fee.toFixed(2));
                                    $("#goodsFreighthide").val(data.data.post_fee).attr("disabled", "disabled");
                                }
                                else {
                                    $("#goodsName").blur(function () {
                                        
                                    });
                                }

                                if (data.data.nick != "" && data.data.nick != "") {
                                    $("#Shop").val(data.data.nick);
                                }

                                $("#goodsPrice").attr("disabled", "disabled");
                                $("#goodsFreight").attr("disabled", "disabled");
                                $("#goodsCounts").val(1);

                                $("#goodsAddress").val(goodsUrl).attr("disabled", "disabled");

                                $("#firstTip").html("");
                                $("#linktogoods").attr("href", $("#goodsUrl").val());
                               
                                $("#second").css("display", "block");
                                $("#three").css("display", "none");
                                var translation = $("#goodsNamehide").val();
                                if(cartdiv=="ss"){
                            		$("#goodsurlajas").css("display", "none");
                            		$("#goodsurlajax").css("display", "block");
                            		}
                            }
                        }, "json");

        } else {
            $("#firstTip").html("<img src='web/images/user/wrong.gif' />Error website address, please check it!");
        }

    } else {
        $("#firstTip").html("<img src='web/images/user/wrong.gif'  />Input the goods website address!");
    }
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
    $("#goodsUrl").val("Please enter the original webpage URL of the item.");
    $("#remarkCheckbox").removeAttr("checked");
    $("#goodsRemark").removeAttr("disabled").val("Please enter the purchasing information of this item, such as color, size or other requirements.");
    // $("#goodsRemark").attr("class", "example");
    $("#firstTip").html("*Attention: Please enter the original webpage URL of the item.Google translated URL will not be recognized.");
    $("#first").css("display", "block");
    $("div[name='goodmessage']").css("display", "none");
    $("#second").css("display", "none");
    $("#goodsUrl").attr("disabled", "");
    $("#goodsUrl").removeAttr("style");
}

function submitGoods() {
	$("#firstTip").html("<img src='web/images/user/loading1.gif'  /><br/>Searching item's information...");
	$("#second").css("display", "none");
	var addurl =$("#goodsurlajax").attr("addurl");
	var goodsUrl=$("#goodsUrl").val();
	var num=$("#goodsCounts").val();
	var cartdiv=$("div[name='goodmessage']").attr("ss");
	var huil=$("#huil").attr("huil");
	var price=0;
	var freight=0;
	var  iurl=$("#deleGoods").attr("iurl");
	$.post(addurl,{goodsUrl:goodsUrl,num:num},function(datas){
		if(datas.result){
			if(cartdiv=="ss"){
			
				location.href=iurl;
			}else{
				price=datas.info.price/huil;
				freight=datas.info.freight/huil;
				$("#first").hide();
				$("#three").show();
				$("#sp_proPic").attr("src",datas.info.pic);
				$("#linktogoods").attr("href",datas.info.click);
				$("#sp_proPrice").html("$"+price.toFixed(2));
				$("#sp_proFright").html("$"+freight.toFixed(2));
				$("#sp_proNum").html(datas.info.number);
				$("#sp_proName").html(datas.info.name);
				$("#firstTip").html("*Attention: Please enter the original webpage URL of the item or add item from our website directly!");
			}
		}else{
			alert('Add  error !');
		}
		
	},"json")

};
//支付
function Payment(id){
		var tot="This transaction "+$("#total"+id).html()+" confirm payment? <input type=\"hidden\" id=\"thispay\" name=\"thispay\" value="+id+"> ";
		$("#advisors").show();
		$("#meginfo").html(tot);
}
function Payments(url){
	var id=$("#thispay").val();
	var url=$("#advisors").attr("url");
	var  iurl=$("#advisors").attr("iurl");
	$("#meginfo").html("<img  border=\"0\" src=\"web/images/user/loadingb.gif\">");
	$.post(url,{id:id},function(data){
		if(data.result){
			$("#meginfo").html("Pay for success !");
			location.href=iurl;
		}else{
			if(data.msg==0)
				$("#meginfo").html("Pay error Accidental error !");
			if(data.msg==1)
			    $("#meginfo").html("Pay error Balance shortage !"); 
			if(data.msg==2)
			    $("#meginfo").html("Pay error Deduct failure  !");
			if(data.msg==3)
			    $("#meginfo").html("Pay error With the new status failure  !");
			
		}
	},"json");
}
function Refund(id){
	var isrefund=confirm("Sure you want to apply for a refund? ");
	var  iurl=$("#advisors").attr("iurl");
	var reurl=$("#advisors").attr("rfurls");

	if(isrefund){
		$.post(reurl,{id:id},function(data){
			if(data.result){
				alert("Refund application is successful !");
				location.href=iurl;
			}else{
				alert("Operation failure !");
			}
		},"json");
	}
}

function payPostage(id){
	var tot="Confirmation of payment "+$("#wkf"+id).val()+" postage? <input type=\"hidden\" id=\"thisid\" name=\"thispay\" value="+id+"> ";
	$("#advisors").show();
	$("#meginfo").html(tot);
}
function payPostages(){
	
    var id=	$("#thisid").val();
    var yf=$("#wkfs"+id).val();
    var ppurl=$("#advisors").attr("payPosurl");
    //alert(id+'    '+yf+' '+ppurl);
    $.post(ppurl,{id:id,yf:yf},function(data){
    	alert(data.result+'sss');
    	if(data.result){
    		$("#status"+id).html("Await Payment");
    		$("#statuepay"+id).html("");
    		$("#advisors").hide();
    	}else{
    		if(data.msg==0)
				$("#meginfo").html("Pay error Accidental error !");
			if(data.msg==1)
			    $("#meginfo").html("Pay error Balance shortage !"); 
			if(data.msg==2)
			    $("#meginfo").html("Pay error Payment failure   !");
			if(data.msg==3)
			    $("#meginfo").html("Pay error With the new status failure  !");
    	}
    },"json")
}
function isReceipt(id){
	var tot="Confirm receipt of goods? <input type=\"hidden\" id=\"thisid\" name=\"thisid\" value="+id+"> ";
	$("#advisors").show();
	$("#meginfo").html(tot);
	$("#istrue").attr("href","javascript:isReceipts();");
	$("#istrue").html("Yes");
}
function isReceipts(){
	var id=	$("#thisid").val();
	var url=$("#advisors").attr("isReceipt");
	$.post(url,{id:id},function(data){
		if(data.result){
			$("#status"+id).html("Confirmed receipt");
    		$("#statuepay"+id).html("<a href=\"javascript:evaluation("+id+");\">Evaluation </a> |");
    		var tot="Please fill in the comments!<br/> <br/> ";
    		    tot+="<input type=\"hidden\" id=\"thisid\" name=\"thisid\" value="+id+">";
    		    tot+="<input type=\"radio\" name=\"score\" id=\"score\" checked=\"checked\"  value=\"3\" />Good";
    		    tot+="<input type=\"radio\" name=\"score\" id=\"score\" value=\"2\" />In general";
    		    tot+="<input type=\"radio\" name=\"score\" id=\"score\" value=\"1\" />Difference<br/> ";
    		    tot+="<input type=\"type\" id=\"comm\" name=\"comm\" value=\"\">";
    		$("#meginfo").html(tot);
    		$("#istrue").attr("href","javascript:evaluations();");
    		$("#istrue").html("Yes");
		}else{
			$("#meginfo").html("Program error");
    		$("#istrue").attr("href","");
		}
	},"json")
	
}
function evaluation(id){
	var tot="Please fill in the comments!<br/>  <br/>";
    tot+="<input type=\"hidden\" id=\"thisid\" name=\"thisid\" value="+id+">";
    tot+="<input type=\"radio\" name=\"score\" id=\"score\" checked=\"checked\"  value=\"3\" />Good";
    tot+="<input type=\"radio\" name=\"score\" id=\"score\" value=\"2\" />In general";
    tot+="<input type=\"radio\" name=\"score\" id=\"score\" value=\"1\" />Difference<br/> ";
    tot+="<input type=\"type\" id=\"comm\" name=\"comm\" value=\"\">";
    $("#meginfo").html(tot);
    $("#istrue").attr("href","javascript:evaluations();");
    $("#istrue").html("Yes");
	$("#advisors").show();
	$("#meginfo").html(tot);
}
function evaluations(){
	var id=$("#thisid").val();
	var scores=$("input[name='score']:checked").val();
	var comms=$("#comm").val();
	var evurl=$("#advisors").attr("evalu");
	
	$.post(evurl,{id:id , score:scores , comm:comms },function(data){
	
		if(data.result){
			$("#status"+id).html("Complete");
    		$("#statuepay"+id).html(" ");
    		$("#advisors").hide();
		}else{
			var tet='';
			if(data.msg==1){
				tet="Has commented on the";
			}else if(data.msg==2){
				tet="With the new state failure";
			}else{
				tet="Program error";
			}
			$("#meginfo").html(tet);
			$("#istrue").attr("href","");
		}
	},"json")
}




function deleteFavourties() {
	var arr= new Array();
	$('.chkbox').each(function(){
		var t=$(this).attr('checked');
		if(t==true){
			arr.push($(this).val());
		}
	});
    if (arr.length != 0) {
        var btn = confirm("Want to delete the collection to you?");
        if (!btn) {
            return;
        } else {
        	var urlxxs=$("#thisurl").attr("deleurl");
        	$.ajax({
        		url:urlxxs,
    	    	type:"POST",
    	    	dataType:"json",
    	    	caceh:false,
    	    	data:{id:arr},
    	    	success:function(data){
        			if(data.result){
        				for(v in arr){
        					$("#span"+arr[v]).hide();
        				}
        			}else{
        				alert("Delete error!");
        			}
        		},
        		error:function(){
        			alert("System error operation failure please after a while trying to !");
        		}
        	})
        }
    }
    else {
        alert("Please select the collections you want to delete!");
        return;
    }
}

function addFavouriteToCar() {
	var arr= new Array();
	$('.chkbox').each(function(){
		var t=$(this).attr('checked');
		if(t==true){
			arr.push($(this).val());
		}
	});
	if (arr.length == 0) {
		alert("Please select the collections you want to add !");
	} else {
	    var urls=$("#thisurl").attr("addurl");
	    drag('mask','drag','top','close');
	    $.ajax({
	    	url:urls,
	    	type:"POST",
	    	dataType:"json",
	    	caceh:false,
	    	data:{id:arr},
	    	success:function(data){
	    		  if (data.result == true) {
		    		  $("#showInfo").html("This item has been added in the shopping cart!");
		          }else {
		        	  $("#showInfo").html("This item has already existed in the shopping cart!");
		          }
	        },
	        error:function(){
	        	
	        	 $("#showInfo").html("System error operation failure please after a while trying to !");
	        }
	    })
	}
}

function addFavours(ids){
	var urlsd=urls=$("#thisurl").attr("addurlz");
	$.post(urlsd,{id:ids },function(data){
		if(data.result){
			alert("This item has been added in the shopping cart!");
		}else if(data.msg==1){
			alert("This item has been added in the shopping cart!");
		}else {
			alert("System error operation failure please after a while trying to !");
		}
	},"json")
}

//point
function exchange() {

	var urlpoint=$('#thisutl').attr('urlpoint');
	
	$.post(urlpoint, {}, function (data) {
        if (data.result == true) {

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


function exchangeDo(e){
	var vals=e.attr("integervalue")
	var urlex=$('#thisutl').attr('exchangeDo');
	$.post(urlex, {vals:vals},function (data) {
		if(data.result){
			$("#totalpoints").html(data.point);
			$("#coupons").html(data.coin);
			exchange();
		}else{
			alert(" Exchange failure ！");
		}
	},"json")
	
}
function ShowBtn(e) {
    e.html('<img border="0" width="93" height="24" src="web/images/user/exchange_17.jpg" />');
    e.unbind("click");
    e.click(function () {
    	 exchangeDo($(this));
    });
}

function HideBtn(e) {
    e.html('<img border="0" width="93" height="24" src="web/images/user/exchange_20.jpg" />');
    e.unbind("click");
}

function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}
