var inputBoxTimerId = -1;
var timerCount = 0;
var isLoadedInputBox = false;
var setOnloadInputBox = function() {
	isLoadedInputBox = true;
}
 
var initInputBox = function() {
		if( timerCount++ < 5 ) { // 5氩堧 瓴€靸夓敖 齑堦赴頇旊ゼ 鞁滊弰頃�.
			if(inputBoxTimerId != -1 ) { // 鞚疙劙氩� id臧€ 鞝曥儊鞝侅溂搿� 靸濎劚霅橃棃鞚� 瓴届毎鞐愲 鞁ろ枆.
				if( isLoadedInputBox ) { // iframe鞚� 鞛� 搿滊摐 霅橃棃鞚� 瓴届毎.
					visualsearch_inputbox_iframe.initBodyValues();
					clearInterval( inputBoxTimerId );
					inputBoxTimerId = -1;
				}
			}
		} else { // 5氩� 鞚挫儊 鞁滊弰頄堨潉 瓴届毎 鞚疙劙氩� 靷牅.
			clearInterval( inputBoxTimerId );
			inputBoxTimerId = -1;
		}
}

// png24

function setPng24(obj) { 

 obj.width=obj.height=1; 

 obj.className=obj.className.replace(/\bpng24\b/i,''); 

 obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image'); "

 obj.src='/us/scripts/p2control/blank.gif';

 return ''; 

}



function viewadvisor() {

	if(  typeof(transparency_enable)=='function'  ) transparency_enable();

	document.getElementById('advisor').style.display='block';

	if(document.getElementById("keyvisualimage")) keyvisualAutoStop();

}

function closeadvisor() {

	if(document.getElementById("advisor") && document.getElementById("advisor").style.display=="block") {

		document.getElementById('advisor').style.display='none';

		if(  typeof(transparency_disable)=='function'  )   transparency_disable();

		//dockLayerCheck();

		if(document.getElementById("keyvisualimage") && document.getElementById("header").getAttribute("isFirstAutoPlay")==1) keyvisualAutoPlay();

	}

}



// innerWidth, innerHeight 甑晿旮�

var inx,iny;

if(self.innerHeight) { // IE 鞕�

	inx=self.innerWidth;

	iny=self.innerHeight;

} else if(document.documentElement && document.documentElement.clientHeight) { // IE6 Strict

	inx=document.documentElement.clientWidth;

	iny=document.documentElement.clientHeight;

} else if(document.body) { // 雼るジ IE

	inx=document.body.clientWidth;

	iny=document.body.clientHeight;

}



// rss feed layer

function view_rsslayer(e) {

	//control layer's position

	var posx=0;

	var posy=0;

	if(navigator.appVersion.indexOf("MSIE 6")==-1 || navigator.appVersion.indexOf("MSIE 7")==-1 || navigator.appVersion.indexOf("MSIE 5")==-1) isIE=true;

	else isIE=false;

	if(!e) e=window.event;

	if(e.pageX||e.pageY) { // pageX/Y 

		posx=e.pageX;

		posy=e.pageY;

	} else if(e.clientX||e.clientY) { // clientX/Y

		posx=e.clientX;

		posy=e.clientY;

		if(isIE) { 

			posx = posx + document.documentElement.scrollLeft ;

			posy = posy + document.documentElement.scrollTop ;

		}

	}

	var obj=document.getElementById("copyClipboard_alert");

	posx = posx -140;

	obj.style.left=posx + "px";

	obj.style.top=posy + "px";

	obj.style.display="block";

}

// consumer spec-glossary layer

function view_glossary(e) {

	//control layer's position

	var posx=0;

	var posy=0;

	if(e==null) isIE=true;

	else isIE=false;

	if(!e) e=window.event;

	if(e.pageX||e.pageY) { // pageX/Y 

		posx=e.pageX;

		posy=e.pageY;

	} else if(e.clientX||e.clientY) { // clientX/Y

		posx=e.clientX;

		posy=e.clientY;

		if(isIE) { 

			posx += document.body.scrollLeft;

			posy += document.body.scrollTop;

		}

	}

	var obj=document.getElementById("spec_glossary");

	obj.style.left=posx + "px";

	obj.style.top=posy + "px";

	obj.style.display="block";

}

// consumer genuine layer

function view_genuine(e) {

	//control layer's position

	var posx=0;

	var posy=0;

	if(navigator.appVersion.indexOf("MSIE 6")==-1 || navigator.appVersion.indexOf("MSIE 7")==-1 || navigator.appVersion.indexOf("MSIE 5")==-1) isIE=true;

	else isIE=false;

	if(!e) e=window.event;

	if(e.pageX||e.pageY) { // pageX/Y 

		posx=e.pageX;

		posy=e.pageY;

	} else if(e.clientX||e.clientY) { // clientX/Y

		posx=e.clientX;

		posy=e.clientY;

		if(isIE) { 

			posx = posx + document.documentElement.scrollLeft ;

			posy = posy + document.documentElement.scrollTop ;

		}

	}

	if(posx > 500) posx -= 130;

	// posy = posy + 30;

	var obj=document.getElementById("umpc_genuine");

	obj.style.left=posx + "px";

	obj.style.top=posy + "px";

	obj.style.display="block";

}

// visit_layer

var movepage_url="";

function view_visitlayer(e,url,onoff,dir) {

	//control layer's position

	var posx=0;

	var posy=0;

	if(navigator.appVersion.indexOf("MSIE 6")==-1 || navigator.appVersion.indexOf("MSIE 7")==-1 || navigator.appVersion.indexOf("MSIE 5")==-1) isIE=true;

	else isIE=false;

	if(!e) e=window.event;

	if(e.pageX||e.pageY) { // pageX/Y 

		posx=e.pageX;

		posy=e.pageY;

	} else if(e.clientX||e.clientY) { // clientX/Y

		posx=e.clientX;

		posy=e.clientY;

		if(isIE) {

			posx = posx + document.documentElement.scrollLeft ;

			posy = posy + document.documentElement.scrollTop ;

		}

	}

	//posx = posx - 100;

	//posy = posy + 20;

	posy = posy + 10;

	//alert(posx+'/'+posy);

	var obj=document.getElementById("visit_layer");

	if(dir=="left") {

		posx=posx+50;

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	} else if (dir=="right") {

		posx=posx-200;

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	} else {

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	}

	//control url

	viewlayer('visit_layer','on');

	movepage_url = url;

}









// visit_layer 2

var movepage_url="";

function view_visitlayer2(e,url,onoff,dir) {

	//control layer's position

	var posx=0;

	var posy=0;

	if(navigator.appVersion.indexOf("MSIE 6")==-1 || navigator.appVersion.indexOf("MSIE 7")==-1 || navigator.appVersion.indexOf("MSIE 5")==-1) isIE=true;

	else isIE=false;

	if(!e) e=window.event;

	if(e.pageX||e.pageY) { // pageX/Y 

		posx=e.pageX;

		posy=e.pageY;

	} else if(e.clientX||e.clientY) { // clientX/Y

		posx=e.clientX;

		posy=e.clientY;

		if(isIE) {

			posx = posx + document.documentElement.scrollLeft ;

			posy = posy + document.documentElement.scrollTop ;

		}

	}

	//posx = posx - 100;

	//posy = posy + 20;

	posy = posy + 10;

	//alert(posx+'/'+posy);

	var obj=document.getElementById("visit_layer2");

	if(dir=="left") {

		posx=posx+50;

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	} else if (dir=="right") {

		posx=posx-200;

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	} else {

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	}

	//control url

	viewlayer('visit_layer2','on');

	movepage_url = url;

}







// visit_layer 3

var movepage_url="";

function view_visitlayer3(e,url,onoff,dir) {

	//control layer's position

	var posx=0;

	var posy=0;

	if(navigator.appVersion.indexOf("MSIE 6")==-1 || navigator.appVersion.indexOf("MSIE 7")==-1 || navigator.appVersion.indexOf("MSIE 5")==-1) isIE=true;

	else isIE=false;

	if(!e) e=window.event;

	if(e.pageX||e.pageY) { // pageX/Y 

		posx=e.pageX;

		posy=e.pageY;

	} else if(e.clientX||e.clientY) { // clientX/Y

		posx=e.clientX;

		posy=e.clientY;

		if(isIE) {

			posx = posx + document.documentElement.scrollLeft ;

			posy = posy + document.documentElement.scrollTop ;

		}

	}

	//posx = posx - 100;

	//posy = posy + 20;

	posy = posy + 10;

	//alert(posx+'/'+posy);

	var obj=document.getElementById("visit_layer3");

	if(dir=="left") {

		posx=posx+50;

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	} else if (dir=="right") {

		posx=posx-200;

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	} else {

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	}

	//control url

	viewlayer('visit_layer3','on');

	movepage_url = url;

}



// visit_layer 4

function view_visitlayer4(e,url,onoff,dir) {

	//control layer's position

	var posx=0;

	var posy=0;

	if(navigator.appVersion.indexOf("MSIE 6")==-1 || navigator.appVersion.indexOf("MSIE 7")==-1 || navigator.appVersion.indexOf("MSIE 5")==-1) isIE=true;

	else isIE=false;

	if(!e) e=window.event;

	if(e.pageX||e.pageY) { // pageX/Y 

		posx=e.pageX;

		posy=e.pageY;

	} else if(e.clientX||e.clientY) { // clientX/Y

		posx=e.clientX;

		posy=e.clientY;

		if(isIE) {

			posx = posx + document.documentElement.scrollLeft ;

			posy = posy + document.documentElement.scrollTop ;

		}

	}

	//posx = posx - 100;

	//posy = posy + 20;

	posy = posy + 10;

	//alert(posx+'/'+posy);

	var obj=document.getElementById("visit_layer4");

	if(dir=="left") {

		posx=posx+50;

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	} else if (dir=="right") {

		posx=posx-200;

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	} else {

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	}

	//control url

	viewlayer('visit_layer4','on');

	movepage_url = url;

}



// visit_layer 5

function view_visitlayer5(e,url,onoff,dir) {

	//control layer's position

	var posx=0;

	var posy=0;

	if(navigator.appVersion.indexOf("MSIE 6")==-1 || navigator.appVersion.indexOf("MSIE 7")==-1 || navigator.appVersion.indexOf("MSIE 5")==-1) isIE=true;

	else isIE=false;

	if(!e) e=window.event;

	if(e.pageX||e.pageY) { // pageX/Y 

		posx=e.pageX;

		posy=e.pageY;

	} else if(e.clientX||e.clientY) { // clientX/Y

		posx=e.clientX;

		posy=e.clientY;

		if(isIE) {

			posx = posx + document.documentElement.scrollLeft ;

			posy = posy + document.documentElement.scrollTop ;

		}

	}

	//posx = posx - 100;

	//posy = posy + 20;

	posy = posy + 10;

	//alert(posx+'/'+posy);

	var obj=document.getElementById("visit_layer5");

	if(dir=="left") {

		posx=posx+50;

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	} else if (dir=="right") {

		posx=posx-200;

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	} else {

		obj.style.left=posx + "px";

		obj.style.top=posy + "px";

		obj.style.display="block";

	}

	//control url

	viewlayer('visit_layer5','on');

	movepage_url = url;

}





/* link target - new or current */

function layer_newwin(id,url,onoff) {

	viewlayer(id,'on');

	movepage_url = url;

}



function movepage_layer2(id) {

	document.location.href=movepage_url;

	viewlayer(id,'off');

}



function movepage_layer3(id) {

	window.open(movepage_url);

	viewlayer(id,'off');

}



function movepage_layer(id) {

	if (document.getElementById("visit_current").checked) document.location.href=movepage_url;

	else if (document.getElementById("visit_new").checked) window.open(movepage_url);

	viewlayer(id,'off');

}







// remove flickering

try {

	document.execCommand('BackgroundImageCache', false, true);

} catch(e) {

}



// menu 

function chg_leftmenu(id) {

	obj=document.getElementById(id);

	obj.className="on";

}



// change classname

function chgclass(va,onoff) {

	obj=document.getElementById(va);

	if(onoff=="on") obj.className="copy_text_on";

	else obj.className="copy_text";

}

function copy_code(va) {

	var IE=(window.clipboardData)?true:false;

	var tmp_text=document.getElementById(va).value;

	if (IE) {

		window.clipboardData.setData("Text", tmp_text);

		alert("Copied to clipboard.");

	}

	else {

	temp = prompt("Press Ctrl + C to copy to clipboard.", tmp_text);

	}

}



// layer onoff script

function viewlayer(va,onoff) {

	var obj=document.getElementById(va);

	if(onoff=="on") obj.style.display="block";

	else if (onoff=="in") obj.style.display="inline";

	else obj.style.display="none";

}



//images rollover

function menuOn(imgEl) {

	imgEl.src = imgEl.src.replace(".gif", "_on.gif");

}

function menuOut(imgEl) {

	imgEl.src = imgEl.src.replace("_on.gif", ".gif");

}

function menuOnjpg(imgEl) {

	imgEl.src = imgEl.src.replace(".jpg", "_on.jpg");

}

function menuOut(imgEl) {

	imgEl.src = imgEl.src.replace("_on.gif", ".gif");

}

function menuOutjpg(imgEl) {

	imgEl.src = imgEl.src.replace("_on.jpg", ".jpg");

}



// toggle layer

function toggle_layer(ob) {

	obj=document.getElementById(ob);

	if(obj.style.display=="none") {

		obj.style.display="block";

	} else {

		obj.style.display="none";

	}

}



function viewlayermenu(va,onoff) {

	obj=document.getElementById(va);

	if(onoff=="on") obj.style.display="block";

	else obj.style.display="none";

}



//鞛戩潃鞚措歆€ 鞓る矂 項€鞚勲杽 韥办澊氙胳 氤€瓴�

function bigImageOn(num){

	document.getElementById("bigIMage").src = "/temp/about_pro0"+num+"B.gif";	

}



/* swap Layer */

/*

function layerSwap(sw) {

	for (i = 1; i < 3; i++) {

		if (sw == i) {		

			document.getElementById('layer01_0'+i+'contents').style.display='';

		} else {

			document.getElementById('layer01_0'+i+'contents').style.display='none';

		}

	}

}*/



/* accessory layer */

function Show_OneLayer(GroupName, Total, LayerID)	// (鞚措, 齑濍爤鞚挫柎 臧垬, 氤挫棳欤茧牑電� 霠堨澊鞏�)

{

	var targetId;



	targetId = GroupName + LayerID;

	document.getElementById(targetId).style.display = 'block';



	for (var i=0; i<Total; i++) {

		if (i != LayerID)

		{

			targetId = GroupName + i;

			document.getElementById(targetId).style.display = 'none';

		}

	}

}



/* select box - page 鞚措彊 */

function movePage(obj){

	obj=document.getElementById(obj);

	location.href=obj.options[obj.selectedIndex].value;

}



/*faq*/

function initToggle(tabContainer) {

	triggers = tabContainer.getElementsByTagName("a");



	for(i = 0; i < triggers.length; i++) {

		triggers.item(i).targetEl = document.getElementById(triggers.item(i).href.split("#")[1]);

		if (!triggers.item(i).targetEl)

			continue;



		triggers.item(i).targetEl.style.display = "none";

		triggers.item(i).onclick = function () {

			if (tabContainer.current == this) {

				this.targetEl.style.display = "none";

				tabContainer.current = null;

			} else {

				if (tabContainer.current) {

					tabContainer.current.targetEl.style.display = "none";

				}

				this.targetEl.style.display = "block";

				tabContainer.current = this;

			}

			return false;

		}

	}

}



/*popup*/

var win=null;

function NewWindow(mypage,myname,w,h,scroll,pos){

	var LeftPosition=0;

	var TopPosition=0;

	if(pos=="random"){

		LeftPosition=(screen.width) ? Math.floor(Math.random()*(screen.width-w)):100;

		TopPosition=(screen.height) ? Math.floor(Math.random()*((screen.height-h)-75)):100;

	} else if(pos=="center"){

		LeftPosition=(screen.width) ? (screen.width-w)/2:100;TopPosition=(screen.height)?(screen.height-h)/2:100;

	} else {

		LeftPosition=0;

		TopPosition=20;

	}

	LeftPosition=parseInt(LeftPosition);

	TopPosition=parseInt(TopPosition);

	// for IE

	if((navigator.appVersion.indexOf("MSIE") != -1) ? true : false){

		//h=h+35;

		h=Number(h)+35;

	}

	var settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';

	win=window.open(mypage,myname,settings);

	if (win==null)

	{ 

		if (navigator.appVersion.indexOf("MSIE") != -1)

		{

			viewlayer('winalert_layer','on')

			//alert("Please cancel the popup interception");

		}		

	}

}

//靷澊歃� 氤€頃梿鞚勲晫.

var win2=null;

function NewWindow2(mypage,myname,w,h,scroll,pos){

	var LeftPosition=0;

	var TopPosition=0;

	if(pos=="random"){

		LeftPosition=(screen.width) ? Math.floor(Math.random()*(screen.width-w)):100;

		TopPosition=(screen.height) ? Math.floor(Math.random()*((screen.height-h)-75)):100;

	} else if(pos=="center"){

		LeftPosition=(screen.width) ? (screen.width-w)/2:100;TopPosition=(screen.height)?(screen.height-h)/2:100;

	} else {

		LeftPosition=0;

		TopPosition=20;

	}

	LeftPosition=parseInt(LeftPosition);

	TopPosition=parseInt(TopPosition);	

		h=Number(h);

	var settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';

	win2=window.open(mypage,myname,settings);

	if (win2==null)

	{ 

		if (navigator.appVersion.indexOf("MSIE") != -1)

		{

			viewlayer('winalert_layer','on')		

			//alert("Please cancel the popup interception");

		}		

	}

}







/* new page and selfclose use in popuppage*/

function newpage(url){

 opener.window.open(url);

 window.close();

}

function pop_close(){

 window.close();

}



//=====================================================

// feedback 

// 2007.10.23鞚� NEWS 2彀� 臧滍幐 甏€霠� 靾橃爼

// 鞝曧槙鞛� 

//type鞚� 臧掛澊 main鞚� 鞎勲媹氅� feedback 氩勴娂鞚� 氤挫棳欤缄碃

//type鞚� main鞚措┐ feedback氩勴娂 靾箑

//=====================================================

var vstr_rate_qst_typ_cd="";

var vstr_rate_qst_level_cd="";

var vstr_prd_ia_cd="";

var vstr_model_cd="";





function setFeedbackParam(type,level,prd_id_cd,model_cd){

	 vstr_rate_qst_typ_cd = type;

	 vstr_rate_qst_level_cd = level;

	 vstr_prd_ia_cd = prd_id_cd;					//news鞐愲姅 臧� 鞐嗢潓

	 vstr_model_cd = model_cd;						//news鞐愲姅 臧� 鞐嗢潓



	if( typeof(vstr_prd_ia_cd) == 'undefined'){

		  vstr_prd_ia_cd = "";

		 }

	if( typeof(vstr_model_cd) == 'undefined'){

		  vstr_model_cd = "";

		 }



	//靾橃爼攵€攵� 

	 if( vstr_rate_qst_typ_cd != 'main'){

		document.getElementById("feedback_button1").style.display="inline";

		document.getElementById("feedback_button2").style.display="inline";

		//document.getElementsByName("feedback_button2")[0].style.display="block";

		//document.getElementsByName("feedback_button2")[1].style.display="block";



	 }

	 else if( vstr_rate_qst_typ_cd == 'main'){

		vstr_rate_qst_typ_cd = "";

		document.getElementById("feedback_button1").style.display="none";

		document.getElementById("feedback_button2").style.display="none";

		//document.getElementsByName("feedback_button2")[0].style.display="none";

		//document.getElementsByName("feedback_button2")[1].style.display="none";

	 }

}



function feedbackPopup(scroll,width,height){

 var url="/cn/function/feedback/feedbackPopup.do?";

 var param = "vstr_rate_qst_typ_cd="+vstr_rate_qst_typ_cd+"&vstr_rate_qst_level_cd="+vstr_rate_qst_level_cd+"&vstr_prd_ia_cd="+vstr_prd_ia_cd+"&vstr_model_cd="+vstr_model_cd;

 window.open(url+param,'','scrollbars='+scroll+',width='+width+',height='+height);

}





function feedbackSetCookie( name, value, expiredays ){

	var todayDate = new Date();

	todayDate.setDate( todayDate.getDate() + expiredays );

	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"

}



function feedbackGetCookie( name ){

	var nameOfCookie = name + "=";

	var x = 0;

	while ( x <= document.cookie.length ){

	var y = (x+nameOfCookie.length);

	if ( document.cookie.substring( x, y ) == nameOfCookie ) {

	if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )

	endOfCookie = document.cookie.length;

	return unescape( document.cookie.substring( y, endOfCookie ) );

	}

	x = document.cookie.indexOf( " ", x ) + 1;

	if ( x == 0 )

	break;

	}

	return "";

}



/* tell a friend */

function getTellafriendUrl(){

 var pagelink = top.location.href; 

 var url = "/us/function/tellafriend/popup/tellafriendPop.do?taf_typ_cd=AS&pagelink="+encodeURIComponent(pagelink);

 window.open(url,"","scrollbars=yes,tobar=no,width=568,height=500,top=0,left=0,");

}



/* mostPopular */

function goUrl(url){

	parent.document.location.href=url;

}





/*************************************************************

 *    DYNIFS - Dynamic IFrame Auto Size v1.0.0

 *

 *    Copyright (C) 2006, Markus (phpMiX)

 *    This script is released under GPL License.

 *    Feel free to use this script (or part of it) wherever you need

 *    it ...but please, give credit to original author. Thank you. :-)

 *    We will also appreciate any links you could give us.

 *    http://www.phpmix.org

 *

 *    Enjoy! ;-)

*************************************************************/

var DYNIFS = {

	// Storage for known IFrames.

	iframes: {},

	// Here we save any previously installed onresize handler.

	oldresize: null,

	// Flag that tell us if we have already installed our onresize handler.

	ready: false,

	// The document dimensions last time onresize was executed.

	dim: [-1,-1],

	// Timer ID used to defer the actual resize action.

	timerID: 0,

	// Obtain the dimensions (width,height) of the given document.

	getDim: function(d) {

		var w=200, h=200, scr_h, off_h;

		if( d.height ) { return [d.width,d.height]; }

		with( d.body ) {

			if( scrollHeight ) { h=scr_h=scrollHeight; w=scrollWidth;}

			if( offsetHeight ) { h=off_h=offsetHeight; w=offsetWidth;}

			if( scr_h && off_h ) h=Math.max(scr_h, off_h);

		}

		return [w,h];

	},

	// This is our window.onresize handler.

	onresize: function() {

		// Invoke any previously installed onresize handler.

		if( typeof this.oldresize == 'function' ) { this.oldresize(); }

		// Check if the document dimensions really changed.

		var dim = this.getDim(document);

		if( this.dim[0] == dim[0] && this.dim[1] == dim[1] ) return;

		// Defer the resize action to prevent endless loop in quirksmode.

		if( this.timerID ) return;

		this.timerID = setTimeout('DYNIFS.deferred_resize();', 10);

	},

	// This is where the actual IFrame resize is invoked.

	deferred_resize: function() {

		// Walk the list of known IFrames to see if they need to be resized.

		for( var id in this.iframes ) this.resize(id);

		// Store resulting document dimensions.

		this.dim = this.getDim(document);

		// Clear the timer flag.

		this.timerID = 0;

	},

	// This is invoked when the IFrame is loaded or when the main window is resized.

	resize: function(id) {

		// Browser compatibility check.

		if( !window.frames || !window.frames[id] || !document.getElementById || !document.body )

			return;

		// Get references to the IFrame window and layer.

		var iframe = window.frames[id];

		var div = document.getElementById(id);

		if( !div ) return;

		// Save the IFrame id for later use in our onresize handler.

		if( !this.iframes[id] ) {

			this.iframes[id] = true;

		}

		// Should we inject our onresize event handler?

		if( !this.ready ) {

			this.ready = true;

			this.oldresize = window.onresize;

			window.onresize = new Function('DYNIFS.onresize();');

		}

		// This appears to be necessary in MSIE to compute the height

		// when the IFrame'd document is in quirksmode.

		// OTOH, it doesn't seem to break anything in standards mode, so...

		if( document.all ) div.style.height = '0px';

		// Resize the IFrame container.

		var dim = this.getDim(iframe.document);

		var extendHeight = 30;

		if( navigator.userAgent.indexOf("Opera") != -1 ) extendHeight = 10;

		if( navigator.userAgent.indexOf("Safari") != -1 ) extendHeight = 0;

		div.style.height = (dim[1]+extendHeight) + 'px';

	}

}





function print_this_page(){

	window.print();

}





function navi_addaccessibility() {

	flashVersionChecker1.addSpecialTag("<div class='noscript_pos'><a href='/us/consumer/index.html' class='navi_noscript_1'><img src='/us/images/common/menu_1_off.gif' alt='consumer' /></a><a href='/us/business/index.html' class='navi_noscript_2'><img src='/us/images/common/menu_2_off.gif' alt='business' /></a><a href='/us/support/main/supportSupportMain.do' class='navi_noscript_3'><img src='/us/images/common/menu_3_off.gif' alt='support' /></a><a href='/us/experience/index.do' class='navi_noscript_4'><img src='/us/images/common/menu_4_off.gif' alt='experience' /></a><a href='/us/aboutsamsung/main.do' class='navi_noscript_5'><img src='/us/images/common/menu_5_off.gif' alt='about samsung' /></a><br /><a href='http://www.adobe.com/go/getflash/' target='_blank'><img src='/us/images/common/txt_getflash.gif' alt='This content requires the latest Adobe Flash player.' class='txt_getflash' /></a><br /></div>");

}



function clearText(thefield){

if (thefield.defaultValue==thefield.value)

        thefield.value = ""

}



/**

 Class Name : 	ShaFlashTag

 Builder : 		An.sehan (Sha/birdhoney/Tinja/plandas) :: plandas@naver.com / ansehan@dstrict.com

 Build Day : 		2007.02.22

 Last Modify : 	2007.06.05

 Version : 		1.15

 @marks |

	- 頂岆灅鞁滊矂鞝检梾鞐� 霐半ジ 韽暔靻嶌劚鞚� 毵庫晞歆€電旊嵃 雽€頃� 靷毄靸侅潣 鞏措牑鞗€瓿� 霕� 於旉皜搿� 氚滌儩頃橂姅 鞐煬 靻嶌劚霌れ潉 須湪鞝侅溂搿� 甏€毽晿瓿�

	膦€雿� 歆侁磤鞝侅溂搿� 韮滉犯靸濎劚鞚� 霃勲頃橁赴 鞙勴暣靹� 鞝滌瀾

	------------------------------------------------------------------------------------------------------------------

	*瓿店皽氅旍唽霌�

	- ShaFlashTag //靸濎劚鞛�

	- addParam // 靻嶌劚於旉皜氚� 氤€瓴�

	- setFlashVars // 頂岆灅鞁滊硛靾� 靺嬳寘鞝勳毄

	- createTag // 韼橃澊歆€頂岆灅鞁滌綌霌� 鞛勲矤霐╈矘毽�

	- debugTag // 旖旊摐霐旊矂旯�



	- getInstanceFlashObject // 頂岆灅鞁滌槫敫岇牆韸� 鞚胳姢韯挫姢甑晿旮�(html韼橃澊歆€雮挫棎靹� 鞎§劯鞀り皜電ロ暅)

	- externalInterfaceAddCallback // 頂岆灅鞁滍暔靾橅樃於滌潉 鞙勴暅 鞝勳毄

	- toString



	- 2007.06.05 於旉皜靷暛

	- addSpecialTag //靷毄鞛� 鞝曥潣韮滉犯 韽暔鞁滍偆旮�(韸轨垬頃滉步鞖办棎 靷毄霅犾垬 鞛堨姶)





	*瓿店皽 static 氅旍唽霌�

	- getInstanceFlashObjectById // 韺岆澕氙疙劙 鞚胳瀽 id搿� flashObject 鞚胳姢韯挫姢 甑晿旮�

	- availableBrowser // 敫岆澕鞖办牳 歆€鞗愳儊頇╈潉 攵堧Π臧掛溂搿� 鞝€鞛ロ晿瓿� 鞛堧姅 臧濎泊氚橅櫂



 @usage |

	

	ex1)

	<script src='ShaFlashTag.js'></script>

	<script>

		// flash 鞛勲矤霐╈潉 鞙勴暅 鞚胳姢韯挫姢 靸濎劚 (氚橂摐鞁� 韺岆Μ氙疙劙 靾滌劀雽€搿� '韺岇澕瓴诫','韽�','雱撿澊' 臧掛潉 鞝勲嫭頃挫＜鞏挫暭頃�)

		var theFlash = new ShaFlashTag('test.swf',200,200);



		// 韼橃澊歆€鞐� 鞛勲矤霐� 鞁滍偆旮�

		theFlash.createTag();

	</script>



	ex2)

	<script src='ShaFlashTag.js'></script>

	<script>

		var theFlash = new ShaFlashTag('test.swf',200,200);



		// name 靻嶌劚鞚� 'hehe'搿� 氤€瓴�

		theFlash.addParam('name','hehe');



		// 氩勳牸旖旊摐毳� 霐旐彺韸�(9.0)鞐愳劀 8.0鞙茧氤€瓴�

		theFlash.addParam('version','8,0,0,0');



		// swLiveConnect毳� 靷毄頃橁赴 鞙勴暣 旮半掣鞚€ 鞐嗠崢 靻嶌劚鞚� swLiveConnect毳� 於旉皜頃橁碃 臧掛潉 true搿� 靺嬳寘 (雼�, 霑岇棎霐半澕 allowScriptAcess電� always搿� 氤勲弰搿� 靺嬳寘鞚� 頃勳殧頃�)

		theFlash.addParam('swLiveConnect','true');



		// 頂岆灅鞁滌棎瓴� sendvalue氤€靾橂 test霛茧姅 臧掛潉 鞝勲嫭

		theFlash.setFlashVars('sendvalue=test');



		// 韼橃澊歆€鞐� 鞛勲矤霐� 鞁滍偆旮�

		theFlash.createTag();



		// 旖旊摐霐旊矂旯�

		theFlash.debugTag();

	</script>



*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







/**

* @[Class Constructor]

*

*parameters |

	- src:String // 韺岇澕瓴诫(.swf)韽暔霅� 靸侂寑氚� 鞝堧寑瓴诫

	- width:String or Number // 臧€搿滌偓鞚挫 ('100%'臧欖潃瓴届毎 氍胳瀽鞐措)

	- height:String or Number // 靹鸽靷澊歃�



*marks |

	- 於旉皜搿� 頃勳殧頃� 靻嶌劚霌れ潃 addParam鞚� 鞚挫毄頃挫劀於旉皜搿� 靷毄頃橂弰搿濏暔

*/

var ShaFlashTag = function(src, width, height)

{

	var addProperty = function(obj1,obj2, none)

	{

		var chknone = function(_p){try{for(var i in none) if(none[i]==_p) return false;}catch(e){return true;}return true;};

		for(var p in obj1){if(chknone(p)) obj2[p] = obj1[p];};

		return obj2;

	};



	var args = arguments; // 頄ロ泟 霐旐彺韸鸽 靺嬳寘霅橃柎鞎� 頃� 靻嶌劚鞚� 臧愳晥頃挫劀 arguments搿� 觳橂Μ

	var attrObject = {}, params = {};

	var attrEmbed= {width:args[1], height:args[2]};



	attrObject.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";

	attrObject.version = "9,0,0,0";

	attrObject.codebase = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version="+attrObject.version;





	var _src = src.split("/");

	_src = _src[_src.length-1];

	attrEmbed.id = attrEmbed.name = _src.indexOf('.swf')!=-1? (_src.split('.swf'))[0]: "";

	attrEmbed.align = "middle";

	this.attrObject = addProperty(attrEmbed,attrObject);



	attrEmbed.src = args[0];

	attrEmbed.bgcolor = args[3]? args[3]: "#ffffff";

	attrEmbed.quality = "high";

	attrEmbed.allowScriptAccess = "sameDomain";

	attrEmbed.allowFullScreen = "false";

	attrEmbed.base = ""; // 旮半掣氩犾澊鞀るゼ 靷毄旃橃晩鞚�



	params.movie = attrEmbed.src;

	this.params = addProperty(attrEmbed,params,['id','name','align','src','width','height']);



	attrEmbed.type="application/x-shockwave-flash";

	attrEmbed.pluginspage="http://www.macromedia.com/go/getflashplayer";

	this.attrEmbed = attrEmbed;



	this.specialTag = '';

};var member = ShaFlashTag.prototype;





/**

* @Get flashObj (static public method) :: for ExternalInterface.addCallback

* 2007.05.18 addtion

* parameters |

	- idname:String // id name

* usage |

	ShaFlashTag.getInstanceFlashObject('myflash').sendToFlashFunction('test');

*/

ShaFlashTag.getInstanceFlashObjectById = function(idname)

{

	return navigator.appName.indexOf("Microsoft") != -1?

	window[idname]: document[idname];

}



ShaFlashTag.availableBrowser = function()

{

	var availbleObj = {

	isIE: ((navigator.appVersion.indexOf("MSIE") != -1) ? true : false),

	isWin: ((navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false),

	isOpera: ( (navigator.userAgent.indexOf("Opera") != -1) ? true : false)};

	return availbleObj;

}





/**

* @[靻嶌劚鞚� 於旉皜頃橁卑雮� 旮办〈靻嶌劚鞚� 氤€瓴巾晿瓿犾瀽 頃犽晫 靷毄]

*

*parameters |

	- attribute:String // 靻嶌劚鞚措

	- value:String // 靻嶌劚臧�



* param lists

	- name or id

	- src

	- width

	- height

	- bgcolor

	- quality

	- wmode

	- align

	- version // 氚橂摐鞁� 鞝勳泊 氩勳牸鞚措鞚� 鞛呺牓頃挫暭頃� (ex:8.0.0 / 9.0.0...)

	- allowScriptAccess

	- swLiveConnect

	- flashVars // flash鞐� 氤€靾橂ゼ 雿橃牳欤茧姅 靻嶌劚

	- allowFullScreen // 9.0鞐� 於旉皜霅� 靻嶌劚

	- base // 頂岆灅鞁滌潣 霐旐彺韸� 霐旊爥韱犽Μ 瓴诫毳� 氤€瓴巾晿鞐� 歆侅爲 鞛§晞欷勲晫 靷毄



*marks |

	- 氚橂摐鞁� createTag鞚挫爠鞐� 靷毄頃橃棳鞎柬暔.

*/

member.addParam = function(attribute, value)

{

	if(attribute=='id' || attribute=='name')

		this.attrObject['name'] = this.attrObject['id'] = this.attrEmbed['name'] = this.attrEmbed['id'] = value;



	else if(attribute=='width' || attribute=='height' || attribute=='align')

		 this.attrObject[attribute] = this.attrEmbed[attribute] = value;



	else if(attribute=='bgcolor' || attribute=='quality' || attribute=='allowScriptAccess' || 

		attribute=='allowFullScreen' || attribute=='flashVars' || attribute=='wmode' || attribute=='base')

		this.params[attribute] = this.attrEmbed[attribute] = value;



	else if(attribute=='src') this.params['movie'] = this.attrEmbed['src'] = value;

	else if(attribute=='version') this.attrObject[attribute] = value;

	else this.attrEmbed[attribute] = value;

}











/**

*@Flash鞐� 氤€靾橃稊臧€毳� 鞙勴暅 鞝勳毄氅旍劀霌�

*marks |

	- addParam鞚� 鞚挫毄頃措弰 霅�.

*parameters |

	- value:String // 靻嶌劚臧�

*/

member.setFlashVars = function(value)

{

	this.addParam('flashVars',value);

}









/**

*@韼橃澊歆€鞐� 頂岆灅鞁滌綌霌� 鞛勲矤霐� 觳橂Μ

*marks |

	- 毵岇暯 於旉皜頃犾啀靹膘澊 鞛堦卑雮� 氤€瓴巾暊 臧掛澊 臁挫灛頃滊嫟氅� 氚橂摐鞁� 氤� 氅旍唽霌滊ゼ 順胳稖頃橁赴鞝勳棎 addParam氅旍唽霌滊ゼ 毹检爛靷毄頃� 頉�

	氤鸽靻岆摛 鞁ろ枆頃挫暭頃滊嫟.

*/

member.createTag = function()

{

	var availobj = ShaFlashTag.availableBrowser();



	var swliveconTag = "", tag;

 

	/*

	if(this.attrEmbed.swLiveConnect)

	{

		swliveconTag += '<script language="JavaScript">\n';

		swliveconTag += 'function '+this.attrEmbed.id+'_DoFSCommand(command, args)\n';

		swliveconTag += '{\n';

		swliveconTag += '	if (command=="javascript") eval(args);\n';

		swliveconTag += '};\n';

		swliveconTag += '</script>\n';



		swliveconTag += '<script language="VBScript">\n';

		swliveconTag += 'On Error Resume Next\n';

		swliveconTag += 'Sub '+this.attrEmbed.id+'_FSCommand(ByVal command, ByVal args)\n';

		swliveconTag += '	Call '+this.attrEmbed.id+'_DoFSCommand(command, args)\n';

		swliveconTag += 'End Sub\n';

		swliveconTag += '</script>\n';

		document.write(swliveconTag);

	}*/



	if (availobj.isIE && availobj.isWin && !availobj.isOpera)

	{

		tag = "<object "; for(var p in this.attrObject){if(p!='version') tag += (p+"='"+this.attrObject[p]+"' ");}; tag += ">\n";

		for(var p in this.params){tag += ("<param name='"+p+"' value='"+this.params[p]+"' />\n");};

		tag += "<embed "; for(var p in this.attrEmbed){tag += (p+"='"+this.attrEmbed[p]+"' ");}; tag += "></embed>\n\n"+this.specialTag+"\n</object>";

	} else {

		tag = "<embed "; for(var p in this.attrEmbed){tag += (p+"='"+this.attrEmbed[p]+"' ");}; tag += "></embed>";

	}



	document.write(tag);

	this.tag = swliveconTag+tag;

}





/**

* @ Debug current flash embeded tag

*/

member.debugTag = function()

{

	try{window.alert(this.tag);}catch(e){};

}



/**

* @ Get flashobject instances(accessble)

*/

member.getInstanceFlashObject = function()

{

	return this.attrObject? ShaFlashTag.getInstanceFlashObjectById(this.attrObject['id']): null;

}



/*

* @ ExternalInterface.addCallback:: for swf

* flash player version : 9.0 late

*

* parameters |

	- functionName:String // the defined functionName in swf

	- value // value to send..

*/

member.externalInterfaceAddCallback = function(functionName, value)

{

	var flashobj = this.getInstanceFlashObject();

	flashobj[functionName](value);

}



/**

* @ To string

*/

member.toString = function()

{

	var availobj = ShaFlashTag.availableBrowser();

	var addstr = "";

	for(var i in availobj) addstr += i+":"+availobj[i]+"\n";

	return this.tag + "\n\n"+addstr;

}



/**

* @ Add Special tag(from <object> to </object>)

*/

member.addSpecialTag = function(tag)

{

	this.specialTag += tag;

}









//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADD Flash - New ver.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**

 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/

 *

 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:

 * http://www.opensource.org/licenses/mit-license.php

 *

 */

if(typeof deconcept=="undefined"){

	var deconcept=new Object();

}

if(typeof deconcept.util=="undefined"){

	deconcept.util=new Object();

}

if(typeof deconcept.SWFObjectUtil=="undefined"){

	deconcept.SWFObjectUtil=new Object();

}

deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){

	if(!document.getElementById){

		return;

	}

	this.DETECT_KEY=_a?_a:"detectflash";

	this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);

	this.params=new Object();

	this.variables=new Object();

	this.attributes=new Array();

	if(_1){

		this.setAttribute("swf",_1);

	}

	if(id){

		this.setAttribute("id",id);

	}

	if(w){

		this.setAttribute("width",w);

	}

	if(h){

		this.setAttribute("height",h);

	}

	if(_5){

		this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));

	}

	this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();

	if(!window.opera&&document.all&&this.installedVer.major>7){

		deconcept.SWFObject.doPrepUnload=true;

	}

	if(c){

		this.addParam("bgcolor",c);

	}

	var q=_7?_7:"high";

	this.addParam("quality",q);

	this.setAttribute("useExpressInstall",false);

	this.setAttribute("doExpressInstall",false);

	var _c=(_8)?_8:window.location;

	this.setAttribute("xiRedirectUrl",_c);

	this.setAttribute("redirectUrl","");

	if(_9){

		this.setAttribute("redirectUrl",_9);

	}

};

deconcept.SWFObject.prototype={

	useExpressInstall:function(_d){

		this.xiSWFPath=!_d?"expressinstall.swf":_d;

		this.setAttribute("useExpressInstall",true);

	},setAttribute:function(_e,_f){

		this.attributes[_e]=_f;

	},getAttribute:function(_10){

		return this.attributes[_10];

	},addParam:function(_11,_12){

		this.params[_11]=_12;

	},getParams:function(){

		return this.params;

	},addVariable:function(_13,_14){

		this.variables[_13]=_14;

	},getVariable:function(_15){

		return this.variables[_15];

	},getVariables:function(){

		return this.variables;

	},getVariablePairs:function(){

		var _16=new Array();

		var key;

		var _18=this.getVariables();

		for(key in _18){

			_16[_16.length]=key+"="+_18[key];

		}

		return _16;

	},getSWFHTML:function(){

		var _19="";

		if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){

			if(this.getAttribute("doExpressInstall")){

				this.addVariable("MMplayerType","PlugIn");

				this.setAttribute("swf",this.xiSWFPath);

			}

			_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";

			_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";

			var _1a=this.getParams();

			for(var key in _1a){

				_19+=[key]+"=\""+_1a[key]+"\" ";

			}

			var _1c=this.getVariablePairs().join("&");

			if(_1c.length>0){

				_19+="flashvars=\""+_1c+"\"";

			}

			_19+="/>";

		}else{

			if(this.getAttribute("doExpressInstall")){

				this.addVariable("MMplayerType","ActiveX");

				this.setAttribute("swf",this.xiSWFPath);

			}

			_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";

			_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";

			var _1d=this.getParams();

			for(var key in _1d){

				_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";

			}

			var _1f=this.getVariablePairs().join("&");

			if(_1f.length>0){

				_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";

			}

			_19+="</object>";

		}

		return _19;

	},write:function(_20){

		if(this.getAttribute("useExpressInstall")){

			var _21=new deconcept.PlayerVersion([6,0,65]);

			if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){

				this.setAttribute("doExpressInstall",true);

				this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));

				document.title=document.title.slice(0,47)+" - Flash Player Installation";

				this.addVariable("MMdoctitle",document.title);

			}

		}

		if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){

			var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();

			return true;

		}else{

			if(this.getAttribute("redirectUrl")!=""){

				document.location.replace(this.getAttribute("redirectUrl"));

			}

		}

		return false;

	}

};

deconcept.SWFObjectUtil.getPlayerVersion=function(){

	var _23=new deconcept.PlayerVersion([0,0,0]);

	if(navigator.plugins&&navigator.mimeTypes.length){

		var x=navigator.plugins["Shockwave Flash"];

		if(x&&x.description){

			_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));

		}

	}else{

		if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){

			var axo=1;

			var _26=3;

			while(axo){

				try{

					_26++;

					axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);

					_23=new deconcept.PlayerVersion([_26,0,0]);

				}catch(e){

					axo=null;

				}

			}

		}else{

			try{

				var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");

			}catch(e){

				try{

					var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

					_23=new deconcept.PlayerVersion([6,0,21]);

					axo.AllowScriptAccess="always";

				}catch(e){

					if(_23.major==6){

						return _23;

					}

				}

				try{

					axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");

				}catch(e){}

			}if(axo!=null){

				_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));

			}

		}

	}

	return _23;

};

deconcept.PlayerVersion=function(_29){

	this.major=_29[0]!=null?parseInt(_29[0]):0;

	this.minor=_29[1]!=null?parseInt(_29[1]):0;

	this.rev=_29[2]!=null?parseInt(_29[2]):0;

};

deconcept.PlayerVersion.prototype.versionIsValid=function(fv){

	if(this.major<fv.major){

		return false;

	}

	if(this.major>fv.major){

		return true;

	}

	if(this.minor<fv.minor){

		return false;

	}

	if(this.minor>fv.minor){

		return true;

	}

	if(this.rev<fv.rev){

		return false;

	}

	return true;

};

deconcept.util={

	getRequestParameter:function(_2b){

		var q=document.location.search||document.location.hash;

		if(_2b==null){

			return q;

		}

		if(q){

			var _2d=q.substring(1).split("&");

			for(var i=0;i<_2d.length;i++){

				if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){

					return _2d[i].substring((_2d[i].indexOf("=")+1));

				}

			}

		}

		return "";

	}

};

deconcept.SWFObjectUtil.cleanupSWFs=function(){

	var _2f=document.getElementsByTagName("OBJECT");

	for(var i=_2f.length-1;i>=0;i--){

		_2f[i].style.display="none";

		for(var x in _2f[i]){

			if(typeof _2f[i][x]=="function"){

				_2f[i][x]=function(){};

			}

		}

	}

};

if(deconcept.SWFObject.doPrepUnload){

	if(!deconcept.unloadSet){

		deconcept.SWFObjectUtil.prepUnload=function(){

			__flash_unloadHandler=function(){};

			__flash_savedUnloadHandler=function(){};

			window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);

		};

		window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);

		deconcept.unloadSet=true;

	}

}

if(!document.getElementById&&document.all){

	document.getElementById=function(id){

		return document.all[id];

	};

}

var getQueryParamValue=deconcept.util.getRequestParameter;

var FlashObject=deconcept.SWFObject;

var SWFObject=deconcept.SWFObject;



// ------------------------------------------- 

// 氚戩溂搿滊姅 頃垬毳� 於旉皜頃橃 毵堨劯鞖擽^ ShaFlashTag 鞙勳鞙茧 於旉皜頃橃劯鞖�.

// ------------------------------------------- 











// ------------------------------------------- 

// test 2007.07.08

// ------------------------------------------- 

// Flash Player Version Detection - Rev 1.5

// Detect Client Browser type

// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.

var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;

var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;

var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;



function ControlVersion()

{

	var version;

	var axo;

	var e;



	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry



	try {

		// version will be set for 7.X or greater players

		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");

		version = axo.GetVariable("$version");

	} catch (e) {

	}



	if (!version)

	{

		try {

			// version will be set for 6.X players only

			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

			

			// installed player is some revision of 6.0

			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,

			// so we have to be careful. 

			

			// default to the first public version

			version = "WIN 6,0,21,0";



			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		

			axo.AllowScriptAccess = "always";



			// safe to call for 6.0r47 or greater

			version = axo.GetVariable("$version");



		} catch (e) {

		}

	}



	if (!version)

	{

		try {

			// version will be set for 4.X or 5.X player

			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");

			version = axo.GetVariable("$version");

		} catch (e) {

		}

	}



	if (!version)

	{

		try {

			// version will be set for 3.X player

			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");

			version = "WIN 3,0,18,0";

		} catch (e) {

		}

	}



	if (!version)

	{

		try {

			// version will be set for 2.X player

			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");

			version = "WIN 2,0,0,11";

		} catch (e) {

			version = -1;

		}

	}

	

	return version;

}



// JavaScript helper required to detect Flash Player PlugIn version information

function GetSwfVer(){

	// NS/Opera version >= 3 check for Flash plugin in plugin array

	var flashVer = -1;

	

	if (navigator.plugins != null && navigator.plugins.length > 0) {

		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {

			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";

			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;			

			var descArray = flashDescription.split(" ");

			var tempArrayMajor = descArray[2].split(".");

			var versionMajor = tempArrayMajor[0];

			var versionMinor = tempArrayMajor[1];

			if ( descArray[3] != "" ) {

				tempArrayMinor = descArray[3].split("r");

			} else {

				tempArrayMinor = descArray[4].split("r");

			}

			var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;

			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;

		}

	}

	// MSN/WebTV 2.6 supports Flash 4

	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;

	// WebTV 2.5 supports Flash 3

	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;

	// older WebTV supports Flash 2

	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;

	else if ( isIE && isWin && !isOpera ) {

		flashVer = ControlVersion();

	}	

	return flashVer;

}



// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available

function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)

{

	versionStr = GetSwfVer();

	if (versionStr == -1 ) {

		return false;

	} else if (versionStr != 0) {

		if(isIE && isWin && !isOpera) {

			// Given "WIN 2,0,0,11"

			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]

			tempString        = tempArray[1];			// "2,0,0,11"

			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']

		} else {

			versionArray      = versionStr.split(".");

		}

		var versionMajor      = versionArray[0];

		var versionMinor      = versionArray[1];

		var versionRevision   = versionArray[2];



        	// is the major.revision >= requested major.revision AND the minor version >= requested minor

		if (versionMajor > parseFloat(reqMajorVer)) {

			return true;

		} else if (versionMajor == parseFloat(reqMajorVer)) {

			if (versionMinor > parseFloat(reqMinorVer))

				return true;

			else if (versionMinor == parseFloat(reqMinorVer)) {

				if (versionRevision >= parseFloat(reqRevision))

					return true;

			}

		}

		return false;

	}

}



//BazzarVoice

function showPopUp(el, ifr) {
		if(ifr){
			var objmyreviews = document.getElementById("write_a_review");
			objmyreviews.src = ifr
		}

		var cvr = document.getElementById("bazaar_cover")
		var dlg = document.getElementById(el)

		cvr.style.display = "block"
		//dlg.style.display = "block"

		var point = getXY(document.getElementById('bazaar_sub_login'));
		document.getElementById('bazaar_login').style.top  = "119px"
		document.getElementById('bazaar_login').style.left  = point.x + "px"

		var addHeight = getFooterHeight(document.getElementById("footer"))
		cvr.style.top = 0+'px'
		cvr.style.left = 0+'px'
		cvr.style.width = document.body.offsetWidth+'px'
		//var height = document.body.offsetHeight+addHeight

		var height = document.getElementById('consumer').offsetHeight + addHeight;

		if(height < screen.availHeight){
			height = screen.availHeight
		}
		cvr.style.height = height +'px'
		var consumer = document.getElementById("consumer");
		try{
			consumer.appendChild(cvr)
			consumer.appendChild(dlg)
			dlg.style.display = "block"
		}
		catch(e){
		}
}

function showPopUpDetail(el, ifr) {

	if(ifr){

		var objmyreviews = document.getElementById("write_a_review");
		objmyreviews.src = ifr
	}

	var cvr = document.getElementById("bazaar_cover")
	var dlg = document.getElementById(el)

	cvr.style.display = "block"
	//dlg.style.display = "block"

	var point = getXY(document.getElementById('bazaar_sub_login'));
	document.getElementById('bazaar_login').style.top  = "119px"
	//document.getElementById('bazaar_login').style.left  = point.x+ + "px"

	var addHeight = getFooterHeight(document.getElementById("footer"))

	cvr.style.top = 0+'px'
	cvr.style.left = 0+'px'

//	cvr.style.width = document.body.offsetWidth+'px'
	cvr.style.width = '100%'
	//var height = document.body.offsetHeight+addHeight
	var height = document.getElementById('consumer').offsetHeight + addHeight;

	if(height < screen.availHeight){

		height = screen.availHeight

	}

	cvr.style.height = height +'px'

	var consumer = document.getElementById("consumer");

	try{
		//consumer.appendChild(cvr)
		//consumer.appendChild(dlg)
		dlg.style.display = "block"
	}
	catch(e){
	}
}



function getFooterHeight(footer){

	var footerChilds = footer.childNodes

	var foot_height = 0

	for(i=0;i<footerChilds.length;i++){

		if(footerChilds[i].className == 'foot_logo'){

			foot_height = footerChilds[i].offsetHeight

			break

		}

	}

	return foot_height

}

 

function setCookie( name, value, expires, path, domain, secure )

{

	// set time, it's in milliseconds

	var today = new Date();

	today.setTime( today.getTime() );

	

	if ( expires ) {

		expires = expires * 1000 * 60 * 60 * 24;

	}



	var expires_date = new Date( today.getTime() + (expires) );



	document.cookie = name + "=" +escape( value ) +

	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +

	( ( path ) ? ";path=" + path : "" ) +

	( ( domain ) ? ";domain=" + domain : "" ) +

	( ( secure ) ? ";secure" : "" );

}



function closePopUp(el)

{

	// Delete Cookie : 1. authorization  2. bazaarvoice (A & A)

    deleteCookie("bvdisplaycode", "/", "");

    deleteCookie("bvproductid", "/", "");

    deleteCookie("bvpage", "/", "");

    deleteCookie("bvcontenttype", "/", "");

    deleteCookie("bvauthenticateuser", "/", "");

    deleteCookie("bzv_url", "/", "");

    deleteCookie("auth_flag", "/", "");

    deleteCookie("prof_id", "/", "");



	var cvr = document.getElementById("bazaar_cover")

	var dlg = document.getElementById(el)



	cvr.style.display = "none"

	dlg.style.display = "none"



	if (el == 'bazaar_login') {

		closePopUp('bazaar_sub_login')

	}

}



function closePopUpForum(el)

{

	// Delete Cookie : 1. authorization  2. bazaarvoice (A & A)

    deleteCookie("bvdisplaycode", "/", document.domain);

    deleteCookie("bvproductid", "/", document.domain);

    deleteCookie("bvpage", "/", document.domain);

    deleteCookie("bvcontenttype", "/", document.domain);

    deleteCookie("bvauthenticateuser", "/", document.domain);

    deleteCookie("bzv_url", "/", document.domain);

    deleteCookie("auth_flag", "/", document.domain);

    deleteCookie("prof_id", "/", document.domain);



	var cvr = document.getElementById("bazaar_cover")

	var dlg = document.getElementById(el)



	cvr.style.display = "none"

	dlg.style.display = "none"



	if (el == 'bazaar_login') {

		closePopUp('bazaar_sub_login')

	}

}



function Point(iX, iY)

{

	this.x = iX	

	this.y = iY

}



function getXY(objEelement)

{

	var obj = objEelement

	var objPointer = new Point(0,0)



	while(obj.tagName != 'HTML' && obj.tagName != "BODY")

	{

		objPointer.x += obj.offsetLeft 

		objPointer.y += obj.offsetTop 

		obj = obj.offsetParent

	}

	return objPointer

}
