
var siteId=UrlQueryString("siteId",-1);var visitorId=UrlQueryString("visitorId",0);function StartHeartBeat(serverUrl,action,divErrorMessageId,errorTemplate,bannedErrorMessage){ajax.setup(serverUrl,function(responseText){var response=responseText.parseJSON();if(response.c&&response.c!=0){if($(divErrorMessageId)){$(divErrorMessageId).style.display="";$(divErrorMessageId).innerHTML=HtmlEncode(GetErrorMessage(response.c,response.e));}}},null,15000);setInterval(function(){var input={a:action,s:siteId,v:visitorId,l:0,m:[]};ajax.post(input.toJSONString(),"siteId="+siteId+"&v="+visitorId+"&a="+action);},20000);}function focusFirstInputElement(form){try{var len=form.length;for(var i=0;i<len;i++){var ele=form[i];if(ele.type!="hidden"&&ele.disabled!=true){ele.focus();break;}}}catch(e){}}function HandleResize(divFormContentId){var h=GetCurrentContentHeight();h=h>0?h:0;var o=$("divFormBorder");o.style.height=h+"px";}function OnCloseClick(){ajax.post("","siteId="+siteId+"&v="+visitorId+"&a=5",function(response){window.opener=null;window.close();});}