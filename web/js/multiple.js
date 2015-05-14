var searchurl=location.href;
searchurl += searchurl.indexOf("?")!=-1?"":"?";

function getUrl(name) {   //获取url地址参数的数值
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function setNavigation(str) {
    $("#NavigationDiv").html(str);
}

//搜索商品显示方式
function PageStatus(isStatus) {
    if (isStatus == 0) {
        var surl = searchurl;
        if(surl.indexOf('&statu=y') != -1){
            surl = surl.replace('&statu=y','');
        }
        window.location.href= surl;
   }else if (isStatus == 1) {	
        var surl = '';
        if(getUrl("statu") == null){
            surl = searchurl + "&statu=y";
        }else{
            surl = location.href;
        }
        window.location.href= surl;
    }
}

//商品排序方式
function OrderBy(orerbyStatus){
  
    if(orerbyStatus==0){
        var surl = '';
        if(getUrl('order') == null){
            surl = searchurl + '&order=level';
        }else{
            surl = searchurl;
        }
        window.location.href = surl ;

    }else if(orerbyStatus==1){
        var surl = searchurl;
        if(surl.indexOf('&order=') != -1){
            surl = surl.replace('&order=level','');
        }
        window.location.href = surl;
    }

}

//显示每页的条数
function PageMess(pageSize) {    
    var surl = "";
    if (getUrl("pagesize") == null) {
        surl = searchurl + "&pagesize=" + pageSize;
    } else {
        surl = searchurl;
        surl = surl.replace("pagesize="+getUrl('pagesize'),"pagesize="+pageSize);
    }
 
    window.location.href = surl;
}

//商品星级对应的图片
function SellerLeveChange(selecValue){
    var htmlValue="";
   
    switch (selecValue) {
        //case 0: htmlValue="<img src=\"web/images/home/tp/level_0.gif\" border=\"0\" alt=\"\" />";break;
        case "1heart":
            htmlValue="<img src=\"web/images/home/tp/level_1.gif\" border=\"0\" alt=\"\" />";
            break;
        case "2heart":
            htmlValue="<img src=\"web/images/home/tp/level_2.gif\" border=\"0\" alt=\"\" />";
            break;
        case "3heart":
            htmlValue="<img src=\"web/images/home/tp/level_3.gif\" border=\"0\" alt=\"\" />";
            break;
        case "4heart":
            htmlValue="<img src=\"web/images/home/tp/level_4.gif\" border=\"0\" alt=\"\" />";
            break;
        case "5heart":
            htmlValue="<img src=\"web/images/home/tp/level_5.gif\" border=\"0\" alt=\"\" />";
            break;
        case "1diamond":
            htmlValue="<img src=\"web/images/home/tp/level_6.gif\" border=\"0\" alt=\"\" />";
            break;
        case "2diamond":
            htmlValue="<img src=\"web/images/home/tp/level_7.gif\" border=\"0\" alt=\"\" />";
            break;
        case "3diamond":
            htmlValue="<img src=\"web/images/home/tp/level_8.gif\" border=\"0\" alt=\"\" />";
            break;
        case "4diamond":
            htmlValue="<img src=\"web/images/home/tp/level_9.gif\" border=\"0\" alt=\"\" />";
            break;
        case "5diamond":
            htmlValue="<img src=\"web/images/home/tp/level_10.gif\" border=\"0\" alt=\"\" />";
            break;
        case "1crown":
            htmlValue="<img src=\"web/images/home/tp/level_11.gif\" border=\"0\" alt=\"\" />";
            break;
        case "2crown":
            htmlValue="<img src=\"web/images/home/tp/level_12.gif\" border=\"0\" alt=\"\" />";
            break;
        case "3crown":
            htmlValue="<img src=\"web/images/home/tp/level_13.gif\" border=\"0\" alt=\"\" />";
            break;
        case "4crown":
            htmlValue="<img src=\"web/images/home/tp/level_14.gif\" border=\"0\" alt=\"\" />";
            break;
        case "5crown":
            htmlValue="<img src=\"web/images/home/tp/level_15.gif\" border=\"0\" alt=\"\" />";
            break;
        case "1goldencrown":
            htmlValue="<img src=\"web/images/home/tp/level_16.gif\" border=\"0\" alt=\"\" />";
            break;
        case "2goldencrown":
            htmlValue="<img src=\"web/images/home/tp/level_17.gif\" border=\"0\" alt=\"\" />";
            break;
        case "3goldencrown":
            htmlValue="<img src=\"web/images/home/tp/level_18.gif\" border=\"0\" alt=\"\" />";
            break;
        case "4goldencrown":
            htmlValue="<img src=\"web/images/home/tp/level_19.gif\" border=\"0\" alt=\"\" />";
            break;
        case "5goldencrown":
            htmlValue="<img src=\"web/images/home/tp/level_20.gif\" border=\"0\" alt=\"\" />";
            break;
           

        default:
            htmlValue="<img src=\"web/images/home/tp/level_1.gif\" border=\"0\" alt=\"\" />";
            break;
    }
    $("#SellerSrc").html(htmlValue);
}
//按照价格和星级搜索
function Search(){
  
    var StartPrice  = $("#StartPrice").val();
    var EndPrice    = $("#EndPrice").val();
    var Credit       = $("#SellerLevel").val();
    var surl        = searchurl ;         //获取当前连接
    //组装url
    if(getUrl('startprice') != null){
    	
        surl = surl.replace("startprice="+getUrl('startprice'),"startprice="+StartPrice);
    }
    if(getUrl('endprice') != null){
        surl = surl.replace("endprice="+getUrl('endprice'),"endprice="+EndPrice);
    }
    if(getUrl('credit') != null){
        surl = surl.replace("credit="+getUrl('credit'),"credit="+Credit);
    }else{
        surl += "&startprice="+StartPrice+"&endprice="+EndPrice+"&credit="+Credit;
    }
   
    if(getUrl('p') != null){
        surl = surl.replace("p="+getUrl('p'),'');
    }
    
    var sprice  = $("#StartPrice").val();
    var eprice  = $("#EndPrice").val();
    var reg = /^[0-9]\d*$/;
    if(!reg.test(sprice)||!reg.test(eprice))
    {
        alert("Error Prcie.Please enter again!");
        return;
    }
    
    if(parseInt(sprice) < parseInt(eprice) && parseInt(sprice) >=0 && parseInt(eprice) <= 10000 ){
        window.location.href= surl;
    }else if(parseInt(sprice) > parseInt(eprice) ){
        alert("Minimum pirce can not greater than maximum pirce .Please enter again!");
    }else if(parseInt(sprice) < 0){
        alert("Minimum pirce can not greater than maximum pirce .Please enter again!");
    }else if(parseInt(eprice) > 10000){
        alert("Maximum pirce should be less then 10000 dollar!");
    }else if(parseInt(sprice) == parseInt(eprice)){
        window.location.href=sourl;
    }else if(sprice==""){
        alert("The price is not null!");
    }
    
}


function doGO() {
    var curpage = $("#newcurpage").val();
    var surl = searchurl;
    var url = $("#address").attr('url');
    var maxPage = $("input[class ^= 'pMax']").attr('class').split('_')[1];
    if(parseInt(curpage) > parseInt(maxPage)){
    	  curpage = maxPage;
    }
    
    if(getUrl('p') != null){
        surl = surl.replace('p='+getUrl('p'),'p='+curpage);
    }else{
        surl += "&p="+curpage;
    }
    window.location = surl;
}

function checktest (object) {
    var reg = /^[0-9]*$/;
    if($(object).val()=="0")
    {
        $(object).val("1");
    }
    if (!reg.test($(object).val())) {
        $(object).val("1");
    }
} 


//---------用户消息--start

function news(){
    var surl = '';
    if(getUrl('tab') == null){
    	 surl = searchurl+"&tab=1";
    }else if(getUrl('tab') !=-1){
    	 surl = searchurl.replace('tab=2','tab=1');
    }
    window.location.href = surl;
}

function message(){
	var surl = '';
	if(getUrl('tab') == null){
		surl = searchurl+"&tab=2";
	}else if(getUrl('tab') != -1){
		surl = searchurl.replace('tab=1','tab=2');
	}
	 window.location.href = surl;
}

function Submit(st) {
    if (parseInt(st) == 1) {
        if ($("#MyQuestion").val().length > 600) {
            alert("Characters in length is not greater than 600");
            return;
        }
    }
    var content = $("#MyQuestion").val();
    var qurl = $("#address").attr('qurl');
    if(content.length >0 && content.length <=600){
    	$.post(qurl,{content:content},function(data){
    		if(data.result){
    			window.location.reload();
    		}else{
    			alert('添加失败！');
    		}
    	},'json');
    }
}


//---------用户消息--end


//---------新闻中心--start

$(function(){
	$("#CurPage").keyup(function(){
		var reg = /^[0-9]*$/;
	    if($(this).val()=="0")
	    {
	        $(this).val("1");
	    }
	    if (!reg.test($(this).val())) {
	        $(this).val("1");
	    }
	});
});

function GO() {
	 var url = $("#address").attr("url");
	 var curpage = $("#CurPage").val();
	 var pMax = $("div[id ^= 'Max']").attr('id').split('_')[1];

     if(parseInt(curpage) > parseInt(pMax)){
    	 curpage = pMax;
     }

     if(getUrl('p') != null){
    	 var surl = searchurl;
    	 surl = surl.replace('p='+getUrl('p'),'p='+curpage);
    	 window.location.href = surl;
     }else{
    	 surl = searchurl;
    	 window.location.href = surl+"&p="+curpage;
     }
}

//---------新闻中心--end

function pageNum(pagesize){
	
	 var surl = searchurl;
	 if(getUrl('pagesize') == null){
		 surl = surl + "&pagesize="+pagesize ;
	 }else{
		 surl = surl.replace('pagesize='+getUrl('pagesize'),'pagesize='+pagesize);
	 }
	
	 window.location.href = surl;
}

$(document).ready(function(){
	
    SellerLeveChange('1heart');
    
    //商品呈现方式图片切换
    if(getUrl('statu') == null){
    	$("#page1").attr('src','web/images/prod/spmneua.png');
    	$("#page2").attr('src','web/images/prod/spmneub.png');
    }else{
    	$("#page1").attr('src','web/images/prod/spmneuab.png');
    	$("#page2").attr('src','web/images/prod/spmneubb.png');
    }
    
   //商品排序时图片切换
    if(getUrl('order') == null){
    	$("#order1").attr('src','web/images/prod/spmneucb.png');
    	$("#order2").attr('src','web/images/prod/spmneudb.png');
    }else{
    	$("#order1").attr('src','web/images/prod/spmneuc.png');
    	$("#order2").attr('src','web/images/prod/spmneud.png');
    }
    
   //商品分页切换时图片切换
    if(getUrl('pagesize') == 20 || getUrl('pagesize') == null){
    	$("#pagemess1").attr('src','web/images/prod/spmneue.png');
    	$("#pagemess2").attr('src','web/images/prod/spmneuf.png');
    	$("#pagemess3").attr('src','web/images/prod/spmneug.png');
    }else if(getUrl('pagesize') == 40 ){
    	$("#pagemess1").attr('src','web/images/prod/spmneueb.png');
    	$("#pagemess2").attr('src','web/images/prod/spmneufb.png');
    	$("#pagemess3").attr('src','web/images/prod/spmneug.png');
    }else{
    	$("#pagemess1").attr('src','web/images/prod/spmneueb.png');
    	$("#pagemess2").attr('src','web/images/prod/spmneuf.png');
    	$("#pagemess3").attr('src','web/images/prod/spmneugb.png');
    }
    
   
   //热销商品分页图片背景切换
   if(getUrl('pagesize') == null || getUrl('pagesize') == 16){
	    $("#no_1").css('background','#F90');
	    $("#no_2").css('background','#999999');
	    $("#no_3").css('background','#999999');
   }else if(getUrl('pagesize') == 32){
	    $("#no_1").css('background','#999999');
	    $("#no_2").css('background','#F90');
	    $("#no_3").css('background','#999999');
   }else{
	    $("#no_1").css('background','#999999');
	    $("#no_2").css('background','#999999');
	    $("#no_3").css('background','#F90');
   }
   
   if(getUrl('pagesize') == null || getUrl('pagesize') == 16){
	    $("#cp_1").css('background','#F90');
	    $("#cp_2").css('background','#999999');
	    $("#cp_3").css('background','#999999');
  }else if(getUrl('pagesize') == 32){
	    $("#cp_1").css('background','#999999');
	    $("#cp_2").css('background','#F90');
	    $("#cp_3").css('background','#999999');
  }else{
	    $("#cp_1").css('background','#999999');
	    $("#cp_2").css('background','#999999');
	    $("#cp_3").css('background','#F90');
  }
   
   
});
