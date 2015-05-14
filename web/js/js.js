// JavaScript Document
<!--
/*绗竴绉嶅舰寮� 绗簩绉嶅舰寮� 鏇存崲鏄剧ず鏍峰紡*/
//function setTab(name,cursel,n){
// for(i=1;i<=n;i++){
//  var menu=document.getElementById(name+i);
//  var con=document.getElementById("con_"+name+"_"+i);
//  menu.className=i==cursel?"hover":"";
//  con.style.display=i==cursel?"block":"none";
// }
//}
//-->

function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;	
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}


function fbolck(){
	var obj = document.getElementById("fbox");
	obj.style.display = "block";
}
function fnone(){
	var obj = document.getElementById("fbox");
	obj.style.display = "none";
}

function setTab(name,cursel,n){
 for(i=1;i<=n;i++){
  var menu=document.getElementById(name+i);
  var con=document.getElementById("con_"+name+"_"+i);
  menu.className=i==cursel?"hover":"";
  con.style.display=i==cursel?"block":"none";
 }
}

function _(id) { 
  return document.getElementById(id); 
} 
var ti = null; 
function loading(){ 
    var tmd = 0; 
    var x1 = document.documentElement.clientWidth;  
    var y1 = document.body.offsetHeight; 
    var y2=document.documentElement.clientHeight;//鏁翠釜椤甸潰鐨勯珮搴� 
    with(_("div1")){ 
       style.width=x1+"px"; 
       if(y2>y1){ 
       style.height=y2+"px"; 
       }else{ 
       style.height=y1+"px"; 
       } 
       style.overflowX="hidden"; 
       style.overflowY="hidden"; 
       style.visibility="visible"; 
    } 
    _("div1").style.left=0; 
    _("div1").style.filter='Alpha(Opacity=0)'; 
    document.body.style.overflowX=""; 
    document.body.style.overflowY=""; 
    _("fbox").style.top=parseInt(document.documentElement.scrollTop)+((document.documentElement.clientHeight-250)/2)+"px";  //-550 鍙樻垚-250
    _("fbox").style.left="50%"; 
    _("fbox").style.marginLeft="-190px" 
    _("fbox").style.visibility="visible"; 
    ti = setInterval("hei()",10); 
} 
var x = 0; 
function hei(){ 
    x+=10; 
    if(x<31){ 
        if(document.all){ 
            _("div1").style.filter='Alpha(Opacity='+x+')'; 
        }else{ 
            _("div1").style.opacity=""+x/100+"";     
        } 
    } 
} 
function unload(){ 
_("div1").style.visibility="hidden"; 
_("fbox").style.visibility="hidden"; 
clearInterval(ti); 
x=0; 
} 


function getDownloadUrl(productName) {
			var random = parseInt(Math.random()*100);
			var temp = 0;
	
			for(var i = 0; i < productName.length && random > temp; i++) {
				temp += parseInt(productName[i].percent);
			}
			i = (random == 0 ? 0 : i - 1);

			return "<a href=\"" + productName[i].url + "\">" + productName[i].name + "</a>";
}
function switchTab(identify,index,count) {
	for(i=0;i<count;i++) {
		var CurTabObj = document.getElementById("Tab_"+identify+"_"+i) ;
		var CurListObj = document.getElementById("List_"+identify+"_"+i) ;
		if (i != index) {
			fRemoveClass(CurTabObj , "upH3") ;
			fRemoveClass(CurListObj , "upBox") ;
		}
	}
	fAddClass(document.getElementById("Tab_"+identify+"_"+index),"upH3") ;
	fAddClass(document.getElementById("List_"+identify+"_"+index),"upBox") ;
}

function switchSideTab(identify,index,count) {
	for(i=0;i<count;i++) {
		var CurTabObj = document.getElementById("Tab_"+identify+"_"+i) ;
		var CurListObj = document.getElementById("List_"+identify+"_"+i) ;
		if (i != index) {
			fRemoveClass(CurTabObj , "upH3") ;
			fRemoveClass(CurListObj , "upUL") ;
		}
	}
	fAddClass(document.getElementById("Tab_"+identify+"_"+index),"upH3") ;
	fAddClass(document.getElementById("List_"+identify+"_"+index),"upUL") ;
}

function fAddClass(XEle, XClass)
{/* shawl.qiu code, void return */
  if(!XClass) throw new Error("XClass 涓嶈兘涓虹┖!");
  if(XEle.className!="") 
  {
    var Re = new RegExp("\\b"+XClass+"\\b\\s*", "");
    XEle.className = XEle.className.replace(Re, "");
	var OldClassName = XEle.className.replace(/^\s+|\s+$/g,"") ;
	if (OldClassName == "" ) {
		 XEle.className = XClass;
	}
	else {
		XEle.className = OldClassName + " " + XClass;
	}
   
  }
  else XEle.className = XClass;
}/* end function fAddClass(XEle, XClass) */

function fRemoveClass(XEle, XClass)
{/* shawl.qiu code, void return */
  if(!XClass) throw new Error("XClass 涓嶈兘涓虹┖!");
  var OldClassName = XEle.className.replace(/^\s+|\s+$/g,"") ;
  if(OldClassName!="") 
  {
	
    var Re = new RegExp("\\b"+XClass+"\\b\\s*", "");
    XEle.className = OldClassName.replace(Re, "");
  }
}/* function fRemoveClass(XEle, XClass) */
function switchPic(screen) {
	if (screen > MaxScreen) {
		screen = 1 ;
	}
	
	for (i=1;i<=MaxScreen;i++) {
		document.getElementById("Switch_"+i).style.display = "none" ;
	}
	document.getElementById("Switch_"+screen).style.display = "block" ;
	showSwitchNav(screen);
	showSwitchTitle(screen);
	//Effect.Appear("Switch_"+screen);
			
	//switchLittlePic(screen);
	//showSwitchTitles(screen);
	CurScreen = screen  ;
}
function showSwitchNav(screen) {
	var NavStr = "" ;
	for (i=1;i<=MaxScreen;i++) {
		if (i == screen) {
			NavStr += '<li onmouseover="pauseSwitch();" onmouseout="goonSwitch();"><a href="javascript://" target="_self" class="sel">'+i+'</a></li>' ;
		}
		else {
			NavStr += '<li onmouseover="pauseSwitch();" onmouseout="goonSwitch();" onclick="goManSwitch('+i+');"><a href="javascript://" target="_self">'+i+'</a></li>' ;
		}
		
	}
	document.getElementById("SwitchNav").innerHTML = NavStr ;
}
function showSwitchTitle(screen) {
	var titlestr = "" ;
	titlestr = '<h3><a href="'+Switcher[screen]['link']+'" target="_blank">'+Switcher[screen]['title']+'</a></h3><p><a href="'+Switcher[screen]['link']+'" target="_blank">'+Switcher[screen]['stitle']+'</a></p>' ;
	document.getElementById("SwitchTitle").innerHTML = titlestr ;
}
function reSwitchPic() {
	refreshSwitchTimer = null;
	switchPic(CurScreen+1);
	refreshSwitchTimer = setTimeout('reSwitchPic();', 3000);
}
function pauseSwitch() {
	clearTimeout(refreshSwitchTimer);
}
function goonSwitch() {
	clearTimeout(refreshSwitchTimer);
	refreshSwitchTimer = setTimeout('reSwitchPic();', 3000);
}
function goManSwitch(index) {
	clearTimeout(refreshSwitchTimer);
	
	CurScreen = index - 1 ;
	reSwitchPic();
}
function floatAdMove() {
	try{BigAd = document.getElementById("BigAd")}catch(e){}
	if (BigAd.style.display != "none") {
		if (document.ns) {
			BigAd.style.top=bdy.scrollTop+bdy.clientHeight-imgheight_close -360;
			BigAd.style.left=bdy.offsetWidth/2-bdy.scrollLeft-300;
		}
		else {
			BigAd_style_left=bdy.offsetWidth/2-bdy.scrollLeft-300;
			BigAd_style_top = 200 ;
			BigAd.style.top=BigAd_style_top + "px";
			BigAd.style.left=BigAd_style_left + "px";
		}
	}
	setTimeout("floatAdMove();",50) ;
 }

function FloatCtrlMove() {
	try{FloatCtrl = document.getElementById("FloatCtrl")}catch(e){}
	if (FloatCtrl.style.display != "none") {
		if (document.ns) {
			FloatCtrl.style.top=bdy.scrollTop+bdy.clientHeight-imgheight_close;
			FloatCtrl.style.left=bdy.scrollLeft+bdy.offsetWidth-150;
		}
		else {
			FloatCtrl_style_left=bdy.scrollLeft+bdy.offsetWidth-150;
			FloatCtrl_style_top = 500 ;
			FloatCtrl.style.top=FloatCtrl_style_top + "px";
			FloatCtrl.style.left=FloatCtrl_style_left + "px";
		}
	}
	setTimeout("FloatCtrlMove();",50) ;
}

function showFloatAd() {
	cleanTimer();
	try{floatbig = document.getElementById("floatbig")}catch(e){}
	if (floatbig.innerHTML != "") {
		BigAdStartTimer = setTimeout("Effect.Appear('BigAd');",500);
		BigAdEndTimer = setTimeout("hiddenFloatAd();",6000);
		hiddenFloatCtrl();
	}
}

 function hiddenFloatAd() {
	cleanTimer();
	Effect.Fade('BigAd');
	showFloatCtrl();
 }

 function showFloatCtrl() {
	try {FloatCtrl = getElementById("FloatCtrl")} catch(e){}
	FloatCtrl.style.display = "block" ;
 }
 function hiddenFloatCtrl() {
	try {FloatCtrl = getElementById("FloatCtrl")} catch(e){}
	FloatCtrl.style.display = "none" ;
 }
 function cleanTimer() {
	clearTimeout(BigAdStartTimer) ;
	clearTimeout(BigAdEndTimer);
 }



