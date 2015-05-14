
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
// Omniture modified for sec.com 2009.10.09
// 2009-09-23 P2 & support rollout
// 2009-09-28 eVar20->eVar21,  eVar21->eVar22,  eVar22->eVar24,  eVar24->eVar13
// 2009-09-29 eVar21->eVar28,  eVar22->eVar29,  eVar24->eVar30
// 2009-10-09 fixing referrer (external site,homepage,product type page, product sub-type page)
//	      adding sitecode for eVar38, eVar39, products 
// 2009-10-12 prop18 ---> prop22 
// 2009-10-13 updating s_control_click_filter for product image usage, tell a friend,printer-friendly
// 2009-10-19 tagging result, no result for the old support page  
// 2009-10-20 consumer accesorry pages prodview,event2 by OMC
// 2009-10-21 fixing the dealer locator searches (event35) 
// 2009-10-29 fixing the product detail tab, display name for the sub sub type page
// 2009-11-03 dealer locator step1 tagging for the global site 
// 2009-11-04 removing prodview,event2 in the dealer page
// 2009-11-25 removing "result" and "no result" from prop29
// 2009-12-08 adding charset
// 2009-12-16 using event variable for service tracking page
// 2010-01-29 fixing getVisitStart()
/////////////////////////////////////////////////////////////////////////////////////////////////////


/* SiteCatalyst code version: H.20.3.
Copyright 1997-2009 Omniture, Inc. More info available at
http://www.omniture.com */



		function getSiteCode() {
			var site_url = document.URL;
			var split_url;
			var site_cd;
	
			try {
				split_url = site_url.split("/");
				site_cd = split_url[3];		
			} catch(e) {
			site_cd = "us";	
			}	
			return site_cd;
		}
	
		function getAccountSiteCode() {
			var site_cd;
		
			try {
				site_cd = getSiteCode();
				site_cd = site_cd.replace("_", "")
			} catch(e) {
				site_cd = "us";
			}
			return site_cd;
		}
	
		function getCurrencyCode(siteCode) {
			var arrSiteCode = new Array("ar", "au", "at", "be_fr", "be", "br", "ca_fr", "ca", "cl", "cn", "co", "cz", "dk", "ee", "fi", "fr", "de", "gr", "hk_en", "hk", "hu", "in", "id", "iran", "ie", "il", "it", "jp", "kz_ru", "sec", "lv", "lt", "my", "mx", "nl", "nz", "no", "latin", "pe", "ph", "pl", "pt", "ru", "sa_en", "sg", "sk", "za", "es", "se", "ch_fr", "ch", "tw", "th", "tr", "us", "ae", "ua", "ua_ru", "vn", "uk", "global", "eu", "ro", "baltic","mea_ar","mea_en","africa_fr","africa_en","ae_ar");
			var arrCurrencyCode = new Array("ARS", "AUD", "EUR", "EUR", "EUR", "BRL", "CAD", "CAD", "CLP", "CNY", "COP", "CZK", "DKK", "EEK", "EUR", "EUR", "EUR", "EUR", "HKD", "HKD", "HUF", "INR", "IDR", "IRR", "EUR", "ILS", "EUR", "JPY", "KZT", "KRW", "LVL", "LTL", "MYR", "MXN", "ANG", "NZD", "NOK", "PAB", "PEN", "PHP", "PLN", "EUR", "RUB", "SAR", "SGD", "SKK", "ZAR", "EUR", "SEK", "CHF", "CHF", "TWD", "THB", "TRY", "USD", "AED", "UAH", "UAH", "VND", "GBP", "USD", "EUR", "ROL", "USD","USD","USD","USD","USD","AED");
			var currencyCode = "";
	
			try {
				for (var i=0; i<arrSiteCode.length; i++) {
					if (siteCode == arrSiteCode[i]) {
						currencyCode = arrCurrencyCode[i];
						break;
					}
				}
			} catch(e) {
			currencyCode = "SGD";
			}
		
			return currencyCode;
		}


/* Specify the Report Suite ID(s) to track here */

var s_account ="";

if ( window.location.host == "www.samsung.com" ) s_account="sssamsung" + getAccountSiteCode();
else if ( window.location.host == "origin2.samsung.com" ) s_account = "test" + getAccountSiteCode()+"dev";
else if ( window.location.host == "stgweb.samsung.com" ) s_account = "sssamsung" + getAccountSiteCode()+"dev";
else if ( window.location.host == "dev.samsung.com"   ) s_account = "test" + getAccountSiteCode();
else s_account = "test" + getAccountSiteCode();

var s=s_gi(s_account);
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* E-commerce Config */
s.currencyCode=getCurrencyCode(getSiteCode());
s.charSet="UTF-8";
/* Link Tracking Config */
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,msi,djvu,CAB,sit,rom,bin,swf,chm,mht,htm";
s.linkInternalFilters="javascript:,samsung.com";
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";
s.variableProvider ='DFA#1511760:v21=[["DFA-"+lis+"-"+lip+"-"+lastimp+"-"+lastimptime+"-"+lcs+"-"+lcp+"-"+lastclk+"-"+lastclktime]]';

/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {
	/* Add calls to plugins here */

        s.partnerDFACheck("dfa_cookie","DFA");

	
	if(!s.campaign)
		s.campaign = s.getQueryParam('cid');
	
	s.campaign = s.getValOnce(s.campaign,"s_campaign",0);

	/*Add calls to plugins here */
	// Tracking internal campaigns or promotions
	if(!s.eVar7)
		s.eVar7=s.getQueryParam('pid');
	
	s.eVar7=s.getValOnce(s.eVar7,"s_evar7",0);
	
	if(s.prop1){
		s.eVar1 = s.prop1;
	}

	if(s.prop2){
		s.eVar2 = s.prop2;
	}

	if(s.prop3){
		s.eVar3 = s.prop3;
	}

	if(s.prop4){
		s.eVar4 = s.prop4;
	}
	
	if(s.prop5){
		s.eVar5 = s.prop5;
	}

	if(s.prop6){
		s.eVar6 = s.prop6;
	}


	if(s.prop22){
		s.eVar18=s.prop22;
	}

		
	if(s.prop23){
		s.eVar23=s.prop23;
	}
	

	if(s.prop45){
		s.eVar45=s.prop45;
	}
	
	if(s.prop46){
		s.eVar46=s.prop46;
	}

	// Copy original referrer into s.referrer if it exists
	var tempVar;
	tempVar = s.getQueryParam('origref');
	if(tempVar) s.referrer=tempVar;

	s.detectRIA('s_ria','prop13','prop14','','','1');	
	
	// s.setupFormAnalysis();
	
	
	/*
	 * capture page name when first time visit or return visit
	 */


    	var firstVisit="First Visit"
    	var noCookie="Cookies Not Supported"
    	var visitNo=s.getDaysSinceLastVisit('s_lv')
    		if(visitNo==firstVisit) s.prop24 = s.pageName
    		else if(visitNo!=noCookie) s.prop25 = s.pageName
    		    	

}
s.doPlugins = s_doPlugins;

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */


/*
 * Plugin: getQueryParam 2.3 - return query string parameter(s) 
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"escp(v)}return ''");

/*
 * Utility: escp 0.1 - ensures decodeURI will be used to decode URL parameters if it exists
 */
s.escp=new Function("x",""
+"var s=this;if(typeof(decodeURI)=='function'&&x)return decodeURI(s.r"
+"ep(''+x,'+',' '));else return unescape(s.rep(''+x,'+',' '));");


/*
 * Plugin: getValOnce_v1.0 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");
		


/*
 * Partner Plugin: DFA Check 0.6 - Restrict DFA calls to once a visit, 
 * per report suite, per click through. Used in conjunction with VISTA
 */
 
s.partnerDFACheck=new Function("c","src","p",""
+"var s=this,dl=',',cr,nc,q,g,i,j,k,fnd,v=1,t=new Date,cn=0,ca=new Ar"
+"ray,aa=new Array,cs=new Array;t.setTime(t.getTime()+1800000);cr=s.c"
+"_r(c);if(cr){v=0}ca=s.split(cr,dl);aa=s.split(s.un,dl);for(i=0;i<aa"
+".length;i++){fnd=0;for(j=0;j<ca.length;j++){if(aa[i]==ca[j]){fnd=1}"
+"}if(!fnd){cs[cn]=aa[i];cn++}}if(cs.length){for(k=0;k<cs.length;k++)"
+"{nc=(nc?nc+dl:'')+cs[k]}cr=(cr?cr+dl:'')+nc;s.vpr(p,nc);v=1}q=s.wd."
+"location.search.toLowerCase();g=q.indexOf(src+'=');if(g>0){s.vpr(p,"
+"cr);v=1}if(!s.c_w(c,cr,t)){s.c_w(c,cr,0)}if(!s.c_r(c)){v=0}if(v<1)s"
+".vpr('variableProvider','')");



/*
 * Plugin: Form Analysis 2.1 (Success, Error, Abandonment)
 */

/*
s.setupFormAnalysis=new Function(""
+"var s=this;if(!s.fa){s.fa=new Object;var f=s.fa;f.ol=s.wd.onload;s."
+"wd.onload=s.faol;f.uc=s.useCommerce;f.vu=s.varUsed;f.vl=f.uc?s.even"
+"tList:'';f.tfl=s.trackFormList;f.fl=s.formList;f.va=new Array('',''"
+",'','')}");
s.sendFormEvent=new Function("t","pn","fn","en",""
+"var s=this,f=s.fa;t=t=='s'?t:'e';f.va[0]=pn;f.va[1]=fn;f.va[3]=t=='"
+"s'?'Success':en;s.fasl(t);f.va[1]='';f.va[3]='';");
s.faol=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,r=true,fo,fn,i,en,t,tf;if(!e)e=s.wd."
+"event;f.os=new Array;if(f.ol)r=f.ol(e);if(s.d.forms&&s.d.forms.leng"
+"th>0){for(i=s.d.forms.length-1;i>=0;i--){fo=s.d.forms[i];fn=fo.name"
+";tf=f.tfl&&s.pt(f.fl,',','ee',fn)||!f.tfl&&!s.pt(f.fl,',','ee',fn);"
+"if(tf){f.os[fn]=fo.onsubmit;fo.onsubmit=s.faos;f.va[1]=fn;f.va[3]='"
+"No Data Entered';for(en=0;en<fo.elements.length;en++){el=fo.element"
+"s[en];t=el.type;if(t&&t.toUpperCase){t=t.toUpperCase();var md=el.on"
+"mousedown,kd=el.onkeydown,omd=md?md.toString():'',okd=kd?kd.toStrin"
+"g():'';if(omd.indexOf('.fam(')<0&&okd.indexOf('.fam(')<0){el.s_famd"
+"=md;el.s_fakd=kd;el.onmousedown=s.fam;el.onkeydown=s.fam}}}}}f.ul=s"
+".wd.onunload;s.wd.onunload=s.fasl;}return r;");
s.faos=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,su;if(!e)e=s.wd.event;if(f.vu){s[f.v"
+"u]='';f.va[1]='';f.va[3]='';}su=f.os[this.name];return su?su(e):tru"
+"e;");
s.fasl=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,a=f.va,l=s.wd.location,ip=s.trackPag"
+"eName,p=s.pageName;if(a[1]!=''&&a[3]!=''){a[0]=!p&&ip?l.host+l.path"
+"name:a[0]?a[0]:p;if(!f.uc&&a[3]!='No Data Entered'){if(e=='e')a[2]="
+"'Error';else if(e=='s')a[2]='Success';else a[2]='Abandon'}else a[2]"
+"='';var tp=ip?a[0]+':':'',t3=e!='s'?':('+a[3]+')':'',ym=!f.uc&&a[3]"
+"!='No Data Entered'?tp+a[1]+':'+a[2]+t3:tp+a[1]+t3,ltv=s.linkTrackV"
+"ars,lte=s.linkTrackEvents,up=s.usePlugins;if(f.uc){s.linkTrackVars="
+"ltv=='None'?f.vu+',events':ltv+',events,'+f.vu;s.linkTrackEvents=lt"
+"e=='None'?f.vl:lte+','+f.vl;f.cnt=-1;if(e=='e')s.events=s.pt(f.vl,'"
+",','fage',2);else if(e=='s')s.events=s.pt(f.vl,',','fage',1);else s"
+".events=s.pt(f.vl,',','fage',0)}else{s.linkTrackVars=ltv=='None'?f."
+"vu:ltv+','+f.vu}s[f.vu]=ym;s.usePlugins=false;var faLink=new Object"
+"();faLink.href='#';s.tl(faLink,'o','Form Analysis');s[f.vu]='';s.us"
+"ePlugins=up}return f.ul&&e!='e'&&e!='s'?f.ul(e):true;");
s.fam=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa;if(!e) e=s.wd.event;var o=s.trackLas"
+"tChanged,et=e.type.toUpperCase(),t=this.type.toUpperCase(),fn=this."
+"form.name,en=this.name,sc=false;if(document.layers){kp=e.which;b=e."
+"which}else{kp=e.keyCode;b=e.button}et=et=='MOUSEDOWN'?1:et=='KEYDOW"
+"N'?2:et;if(f.ce!=en||f.cf!=fn){if(et==1&&b!=2&&'BUTTONSUBMITRESETIM"
+"AGERADIOCHECKBOXSELECT-ONEFILE'.indexOf(t)>-1){f.va[1]=fn;f.va[3]=e"
+"n;sc=true}else if(et==1&&b==2&&'TEXTAREAPASSWORDFILE'.indexOf(t)>-1"
+"){f.va[1]=fn;f.va[3]=en;sc=true}else if(et==2&&kp!=9&&kp!=13){f.va["
+"1]=fn;f.va[3]=en;sc=true}if(sc){nface=en;nfacf=fn}}if(et==1&&this.s"
+"_famd)return this.s_famd(e);if(et==2&&this.s_fakd)return this.s_fak"
+"d(e);");
s.ee=new Function("e","n",""
+"return n&&n.toLowerCase?e.toLowerCase()==n.toLowerCase():false;");
s.fage=new Function("e","a",""
+"var s=this,f=s.fa,x=f.cnt;x=x?x+1:1;f.cnt=x;return x==a?e:'';");

*/


/*
 * Utility Function: vpr - set the variable vs with value v
 */
s.vpr=new Function("vs","v",
"if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: detectRIA v0.1 - detect and set Flash, Silverlight versions
 */
s.detectRIA=new Function("cn", "fp", "sp", "mfv", "msv", "sf", ""
+"cn=cn?cn:'s_ria';msv=msv?msv:2;mfv=mfv?mfv:10;var s=this,sv='',fv=-"
+"1,dwi=0,fr='',sr='',w,mt=s.n.mimeTypes,uk=s.c_r(cn),k=s.c_w('s_cc',"
+"'true',0)?'Y':'N';fk=uk.substring(0,uk.indexOf('|'));sk=uk.substrin"
+"g(uk.indexOf('|')+1,uk.length);if(k=='Y'&&s.p_fo('detectRIA')){if(u"
+"k&&!sf){if(fp){s[fp]=fk;}if(sp){s[sp]=sk;}return false;}if(!fk&&fp)"
+"{if(s.pl&&s.pl.length){if(s.pl['Shockwave Flash 2.0'])fv=2;x=s.pl['"
+"Shockwave Flash'];if(x){fv=0;z=x.description;if(z)fv=z.substring(16"
+",z.indexOf('.'));}}else if(navigator.plugins&&navigator.plugins.len"
+"gth){x=navigator.plugins['Shockwave Flash'];if(x){fv=0;z=x.descript"
+"ion;if(z)fv=z.substring(16,z.indexOf('.'));}}else if(mt&&mt.length)"
+"{x=mt['application/x-shockwave-flash'];if(x&&x.enabledPlugin)fv=0;}"
+"if(fv<=0)dwi=1;w=s.u.indexOf('Win')!=-1?1:0;if(dwi&&s.isie&&w&&exec"
+"Script){result=false;for(var i=mfv;i>=3&&result!=true;i--){execScri"
+"pt('on error resume next: result = IsObject(CreateObject(\"Shockwav"
+"eFlash.ShockwaveFlash.'+i+'\"))','VBScript');fv=i;}}fr=fv==-1?'flas"
+"h not detected':fv==0?'flash enabled (no version)':'flash '+fv;}if("
+"!sk&&sp&&s.apv>=4.1){var tc='try{x=new ActiveXObject(\"AgControl.A'"
+"+'gControl\");for(var i=msv;i>0;i--){for(var j=9;j>=0;j--){if(x.is'"
+"+'VersionSupported(i+\".\"+j)){sv=i+\".\"+j;break;}}if(sv){break;}'"
+"+'}}catch(e){try{x=navigator.plugins[\"Silverlight Plug-In\"];sv=x'"
+"+'.description.substring(0,x.description.indexOf(\".\")+2);}catch('"
+"+'e){}}';eval(tc);sr=sv==''?'silverlight not detected':'silverlight"
+" '+sv;}if((fr&&fp)||(sr&&sp)){s.c_w(cn,fr+'|'+sr,0);if(fr)s[fp]=fr;"
+"if(sr)s[sp]=sr;}}");
 
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * Plugin: Days since last Visit 1.1.H - capture time from last visit
 */

s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");
 




/****************************** MODULES *****************************/

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="samsung";
s.dc=112;

if ( window.location.host == "www.samsung.com"||window.location.host =="stgweb.samsung.com") {
	s.trackingServer="nmetrics.samsung.com";
	s.trackingServerSecure="smetrics.samsung.com";
} else s.trackingServer="samsung.112.2o7.net";

s.vmk="47D561F8";


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(c=='AUTO"
+"'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';"
+"else y+=escape(c)}x=y}else{x=x?s.rep(escape(''+x),'+','%2B'):x;if(x&&c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1)."
+"toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;return x?unescape(s.rep(''+x,'+',' ')):x};s.pt=function(x,d,f,a){var s=th"
+"is,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a"
+".indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0}"
+";s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(wd){var s=this,c=''+s_gi,a=c.indexOf(\"{\"),b=c.lastIndexOf(\"}\"),m;c=s_fe(a>0&&b>0?c.substring(a+1,b):0);if"
+"(wd&&wd.document&&c){wd.setTimeout('function s_sv(o,n,k){var v=o[k],i;if(v){if(typeof(v)==\"string\"||typeof(v)==\"number\")n[k]=v;else if (typeof(v)==\"array\"){n[k]=new Array;for(i=0;i<v.length;i"
+"++)s_sv(v,n[k],i)}else if (typeof(v)==\"object\"){n[k]=new Object;for(i in v)s_sv(v,n[k],i)}}}function s_si(t){var wd=window,s,i,j,c,a,b;wd.s_gi=new Function(\"un\",\"pg\",\"ss\",\"'+c+'\");wd.s=s_"
+"gi(\"'+s.oun+'\");s=wd.s;s.sa(\"'+s.un+'\");s.tfs=wd;s.pt(s.vl_g,\",\",\"vo1\",t);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3=\\'\\';if(t.m_l&&t.m_nl)for(i=0;i<"
+"t.m_nl.length;i++){n=t.m_nl[i];if(n){m=t[n];c=t[\"m_\"+n];if(m&&c){c=\"\"+c;if(c.indexOf(\"function\")>=0){a=c.indexOf(\"{\");b=c.lastIndexOf(\"}\");c=a>0&&b>0?c.substring(a+1,b):0;s[\"m_\"+n+\"_c"
+"\"]=c;if(m._e)s.loadModule(n);if(s[n])for(j=0;j<m._l.length;j++)s_sv(m,s[n],m._l[j])}}}}}var e,o,t;try{o=window.opener;if(o&&o.s_gi){t=o.s_gi(\"'+s.un+'\");if(t)s_si(t)}}catch(e){}',1)}};s.c_d='';s"
+".c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?par"
+"seInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ap"
+"e(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd("
+"),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie="
+"k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._"
+"in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x"
+".b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r"
+"');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfso"
+"e=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this"
+",p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet("
+"'gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s"
+"=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedRequests=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBu"
+"fferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorN"
+"amespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){i"
+"f(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.20.3/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if"
+"(s.isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)}if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if"
+"(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]"
+"=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+u"
+"n+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(rs.indexOf('&pe=')>=0&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;wh"
+"ile(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';re"
+"turn s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=t"
+"his,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://"
+"')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.length>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i"
+"=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.link"
+"TrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s"
+".va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='linkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='"
+"';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)"
+"}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if("
+"!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPe"
+"riods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='"
+"campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browse"
+"rWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')"
+"q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.to"
+"LowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'"
+"';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLower"
+"Case();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))re"
+"turn 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['"
+"+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t"
+"()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o"
+".protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i"
+"<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if(t=='INPUT'&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if("
+"!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript"
+"')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(o.value&&(t=='INPUT'||t=='SUBMIT')){n=o.value;x=3}else if(o.src&&t=='IMAGE')n=o.src"
+";if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?','+t.substring(0,e)+',':'';return u&&u.indexOf(','+un+',')>=0?s.epa(t.substring(e+1))"
+":''};s.rq=function(un){var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.ep"
+"a(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sq"
+"q=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?'"
+",':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s"
+"_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s"
+"_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s"
+".bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_"
+"'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t"
+"&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0}"
+";s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l."
+"toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.ou"
+"n+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i"
+")s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_"
+"t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.t"
+"oUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d"
+"(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl"
+"=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).in"
+"dexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+"
+"1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){"
+"var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElem"
+"ent){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o."
+"i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e"
+"',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f"
+"2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)"
+"g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a"
+"[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;"
+"s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,','"
+",'vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=function(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floo"
+"r(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMin"
+"utes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta='',q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',"
+"c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>"
+"=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}"
+"}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugin"
+"s}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function"
+"('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default"
+"#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.c"
+"olorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt("
+"s.vl_g,',','vo1',vo)}if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}"
+"if((vo&&vo._t)||!s.m_m('d')){s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY')"
+"{o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".t"
+"l(\")>=0)return ''}ta=n?o.target:1;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+"
+"(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objec"
+"tID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if("
+"trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq(s.un)),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',v"
+"b);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests("
+")}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o){var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_"
+"gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName"
+"){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Op"
+"era '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFl"
+"oat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if"
+"(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrati"
+"onServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvide"
+"r,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,linkType';for(var n=1;n<51;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,p"
+"ev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',track"
+"ingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccount"
+"Match,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_ref"
+"errer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}


/* Media Tracking Config */
/*
s.loadModule("Media");
s.Media.autoTrack=true;
s.Media.trackVars="eVar22";
s.Media.trackEvents="event9";    // us is "event3" , global is "event9"
s.Media.trackWhilePlaying = true;
s.Media.track();
*/


//--------------------------------------------------------------------
//--------------------------------------------------------------------
// customized codes for sec.com start

	///////////////////////////////////////////////////////////////////////////
	// start of variables' definition.
	
	

		
		function getLanguageCode(siteCode) {
			var arrLangCode = new Array("es", "en", "de", "fr", "nl", "pt", "fr", "en", "es", "zh1", "es", "cs", "da", "et", "fi", "fr", "de", "el", "en", "zh2", "hu", "en", "id", "fa", "en", "he", "it", "ja", "ru", "ko", "lv", "lt", "en", "es", "nl", "en", "no", "es", "es", "en", "pl", "pt", "ru", "en", "en", "sl", "en", "es", "sv", "fr", "de", "zh", "th", "tr", "en", "en", "ua", "ru", "en", "vi", "en", "en", "en", "ro", "en","ar","en","fr","en","ar");
			var arrSiteCode = new Array("ar", "au", "at", "be_fr", "be", "br", "ca_fr", "ca", "cl", "cn", "co", "cz", "dk", "ee", "fi", "fr", "de", "gr", "hk_en", "hk", "hu", "in", "id", "iran", "ie", "il", "it", "jp", "kz_ru", "sec", "lv", "lt", "my", "mx", "nl", "nz", "no", "latin", "pe", "ph", "pl", "pt", "ru", "sa_en", "sg", "sk", "za", "es", "se", "ch_fr", "ch", "tw", "th", "tr", "us", "ae", "ua", "ua_ru", "gb", "vn", "uk", "global", "eu", "ro", "baltic","mea_ar","mea_en","africa_fr","africa_en","ae_ar");
			
			var langCode = "";
			
			for (var i=0; i<arrSiteCode.length; i++) {
				if (siteCode == arrSiteCode[i]) {
					langCode = arrLangCode[i];
					break;
				}
			}
			
			return langCode;
		}

	

	      function initVar() {
		s.pageName = s.server = s.channel = s.pageType = "";
		s.prop1 = s.prop2 = s.prop3 = s.prop4 = s.prop5 = s.prop6 = "";
		s.campaign = s.state = s.zip = s.events = s.products = s.purchaseID = "";
		s.eVar1 = s.eVar2 = s.eVar3 = s.eVar4 = s.eVar5 = s.eVar6= "";
		s.eVar11 = s.eVar37 = s.eVar38 = s.eVar39 ="";
		s.prop7 = s.prop8 = s.prop9 = s.prop10 = s.prop12 = "";
		s.prop15 = s.prop16 = s.prop17 = s.prop22 = s.prop23 = s.prop29 = "";
		s.eVar13 = s.eVar15 = s.eVar16 = s.eVar17 = s.eVar18 = s.eVar28 = s.eVar29 = s.eVar30 = "";	      	
		s.hier1 = "";
	      }



	// end of variables' definition.
	///////////////////////////////////////////////////////////////////////////

	    	String.prototype.trim = function() {
            		return this.replace(/(^\s*)|(\s*$)/gi, "");
       	        }
    
		function deleteSpace(str) {
			var s = "";
			for (var i=0; i<str.length; i++) {
				s += str.charAt(i).replace(" ", "");
			}
			return s;
		}
		
		function gup( name )
		{
			name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
			var regexS = "[\\?&]"+name+"=([^&#]*)";  
			var regex = new RegExp( regexS );  
			var results = regex.exec( window.location.href );  
			if( results == null )    return "";  
			else    return results[1];
		}

		
		function chkProductCategory( id )
		{	
			var target = document.getElementById( id );	
				

			if( target == undefined || target == null ) return false;
						
					
			if (target.getElementsByTagName( "strong" )[0] != undefined ) return "prd_detail"
			else if (target.getElementsByTagName( "b" )[0] != undefined ) return "acc_detail"
			else if (target.getElementsByTagName( "i" )[0] != undefined ) return "sup_detail"
			else if (target.getElementsByTagName( "a" )[0] != undefined ) return "other"
			else return "error";	
			
		}
		
		
		function chkProductCategoryLevel( id )
		{
			var target = document.getElementById( id );	
				
			if( target == undefined || target == null ) return false;
										
			if (target.getElementsByTagName( "strong" )[0] != undefined ||target.getElementsByTagName( "b" )[0] != undefined ) {
				if (target.getElementsByTagName( "a" ).length == 4) return "sub_sub_type"
				else return "sub_type"
				
			} else if (target.getElementsByTagName( "i" )[0] != undefined ) {
				if (target.getElementsByTagName( "a" ).length == 6) return "sub_sub_type"
				else return "sub_type"				
			} 					
		}

		
		
		function getProductInfo( id , tag )
		{
			var str = "";
			
			if ( id.getElementsByTagName(tag)[0] != undefined ) {
				var product = id.getElementsByTagName(tag);
				
				str = ":"+ product[0].innerHTML.trim();
				
				
				for ( var i = 1 ; i <product.length ; i++ )
				{
					str += ":" + product[ i ].innerHTML.trim();	
				}
				
				return str;     	
				
			} else return "";
			 	
			
		}
		

		function getTextNode( id )
		{
			
		    try {
			var target = document.getElementById( id );	
			var str = "";
			
		        

			if( target == undefined || target == null ) return false;

			if (target.getElementsByTagName( "a" )[0] != undefined){
				var hiers = target.getElementsByTagName( "a" );
				var consumer_product = target.getElementsByTagName( "strong" );
				var accessory_product = target.getElementsByTagName( "b" );
				var support_product = target.getElementsByTagName( "i" );

				

				str = hiers[ 0 ].innerHTML.trim();

				for( var i = 1 ; i < hiers.length ; i++ )
				{
					str += ":" + hiers[ i ].innerHTML.trim();
				}
	
			        str += getProductInfo(target, "strong");
			        str += getProductInfo(target, "b");
			        str += getProductInfo(target, "i");
			    
			}
			
			if(SplitedURL[4] == 'supportSearchResultView.do') {
				try {
					if (sorryResult != undefined || sorryResult != null ){
						str += ":" + sorryResult + ":no result";
					}
				} catch (e) {
					try {
						if (successResult != undefined || successResult != null ) {
							str += ":" + successResult + ":result";
						}
					} catch (e) {

					}
				}
			}

			return str;
		     } catch (e) {
		     
		     }
		     	
		}


		function getTextNodeEx( iframe_id,  id )
		{
			
		    try {
		    	
			var target = document.getElementById(iframe_id).contentWindow.document.getElementById( id );	
			var str = "";
			
		        

			if( target == undefined || target == null ) return false;

			if (target.getElementsByTagName( "a" )[0] != undefined){
				var hiers = target.getElementsByTagName( "a" );
				var consumer_product = target.getElementsByTagName( "strong" );
				var accessory_product = target.getElementsByTagName( "b" );
				var support_product = target.getElementsByTagName( "i" );

				

				str = hiers[ 0 ].innerHTML.trim();

				for( var i = 1 ; i < hiers.length ; i++ )
				{
					str += ":" + hiers[ i ].innerHTML.trim();
				}
	
			        str += getProductInfo(target, "strong");
			        str += getProductInfo(target, "b");
			        str += getProductInfo(target, "i");
			    
			}
			
			return str;
		     } catch (e) {
		     
		     }
		     	
		}



		var URL = unescape(window.location.href.replace( "http://", "" ));
		var SplitedURL = URL.split("?")[0].split("/");
	

		
		
		function getVisitStart(){
			var ref_url = document.referrer;

			/*
			if (ref_url) {
                	  var split_url;
                  	  var domain_name;                   
                  	  split_url = ref_url.split("/"); 
                  	  domain_name = split_url[2];
                  		if(domain_name.indexOf("samsung") <= 0)  return 1;
                  		else return 0;
         		} else return 0;
         		*/
         	
         		if (ref_url) {
                      		var split_url;
                      		var domain_name;                   
                      		split_url = ref_url.split("/");
                      		cCode = split_url[3];
                      		if (!cCode) { return "external site"; }
 
                      		domain_name = split_url[2];
                      		if(domain_name.indexOf("samsung") >= 0) {
                                         if (cCode==getSiteCode()) {  
                                                if (domain_name.split(".")[1].length != 7) return "samsung domain";
                                                else  return; 
                                         } else { return "samsung domain"; }
                      		} else { return "external site"; }
             		} else return "typed/bookmarked";
         	
		}




		function tagPathindicator( site_cd, id ) 
		{

			var siteCode = site_cd;
			var prodtype = gup("pagetype");

			initVar(); 
			
			s.server = window.location.host; 
			s.prop1 = s.eVar1 = getLanguageCode(siteCode);
			s.prop2 = s.eVar2 = siteCode;
			
			
			try {
				if(getCookie("PreferBandwidth")){
					s.prop12 = getCookie("PreferBandwidth");
					s.prop12 = s.prop12.toLowerCase();			
                        	}else {
                        		s.prop12 = "high";
                        	}
                        } catch(e){
                        	
                        }

			var newPageNameENG = getTextNode( id );
			if ( newPageNameENG == false ) return false
			


			s.pageName = siteCode + ":" + newPageNameENG.toLowerCase();
			s.hier1 = s.pageName.replace(/:/gi, ">");
			
			
			if (prodtype.toLowerCase() == "type"){
				s.prop45 = newPageNameENG.split(":")[1].toLowerCase();
				s.prop22 = "product type page";
			} else if (prodtype.toLowerCase()=="subtype"){
				s.prop46 = newPageNameENG.split(":")[2].toLowerCase();
				s.prop22 = "product sub-type page";
			} else if (prodtype.toLowerCase()=="accsubtype") {
				s.prop46 = newPageNameENG.split(":")[2].toLowerCase();
				s.prop22 = "product sub-type page";

                        }				
			
			if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "type.do"){
				s.prop45 = newPageNameENG.split(":")[1].toLowerCase();
				s.prop22 = "product type page";
			} else if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "subtype.do") {
				s.prop46 = newPageNameENG.split(":")[2].toLowerCase();	
				s.prop22 = "product sub-type page";

			} else if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "acclist.do") {
			        s.prop46 = newPageNameENG.split(":")[2].toLowerCase();	
				s.prop22 = "product sub-type page";
			}
			
			
			
			if ( newPageNameENG.split(":")[0] != undefined ) {
				s.channel = siteCode + ":"+ newPageNameENG.split(":")[0].toLowerCase();
				s.prop3   = s.channel;
			}
			
			if ( newPageNameENG.split(":")[1] != undefined ) {
				s.prop4   = s.prop3 + ":" + newPageNameENG.split(":")[1].toLowerCase();
			}
			
			if ( newPageNameENG.split(":")[2] != undefined ) {
				s.prop5  = s.prop4 + ":" + newPageNameENG.split(":")[2].toLowerCase();
			}
			
			
			
			if ( chkProductCategory( id )  == "prd_detail" ){
				if (SplitedURL[3].toLowerCase() != "dealerlocator") s.events = "prodView,event2";

				s.products = ";" + siteCode + ":" + document.getElementById( "model_name" ).value;
				
				if (newPageNameENG.split(":")[5] != undefined ) { 
				       s.eVar39 = siteCode + ":" + newPageNameENG.split(":")[4].toLowerCase();
				       s.prop23 = s.prop5  + ":"+ newPageNameENG.split(":")[3].toLowerCase()+ ":" + newPageNameENG.split(":")[4].toLowerCase()+ ":" + newPageNameENG.split(":")[5].toLowerCase(); 
				}
				else { 
				       s.eVar39 = siteCode + ":" + newPageNameENG.split(":")[3].toLowerCase();
				       s.prop23 = s.prop5  + ":"+ newPageNameENG.split(":")[3].toLowerCase()+ ":" + newPageNameENG.split(":")[4].toLowerCase(); 
				}  
				s.eVar28 = document.getElementById( "pvi_type_name" ).value;
				s.eVar29 = document.getElementById( "pvi_subtype_name" ).value;
				s.eVar30 = document.getElementById( "pvi_project_name" ).value;
				s.eVar38 = siteCode + ":" + document.getElementById( "model_code" ).value;
				
				s.prop22 =  getVisitStart();

			}
			else if ( chkProductCategory( id )  == "acc_detail"  ) {
				if (SplitedURL[3].toLowerCase() != "dealerlocator") s.events = "prodView,event2";

				s.products = ";" + siteCode + ":" + document.getElementById( "model_name" ).value;
				s.eVar38 = siteCode +":" + document.getElementById( "model_code" ).value;

				if (newPageNameENG.split(":")[5] != undefined ) { 
				       s.eVar39 = siteCode + ":" + newPageNameENG.split(":")[4].toLowerCase();
				       s.prop23 = s.prop5  + ":"+ newPageNameENG.split(":")[3].toLowerCase()+ ":" + newPageNameENG.split(":")[4].toLowerCase()+ ":" + newPageNameENG.split(":")[5].toLowerCase(); 
				}
				else { 
				       s.eVar39 = siteCode + ":" + newPageNameENG.split(":")[3].toLowerCase();
				       s.prop23 = s.prop5  + ":"+ newPageNameENG.split(":")[3].toLowerCase()+ ":" + newPageNameENG.split(":")[4].toLowerCase(); 
				}  

				
				s.prop22 =  getVisitStart();
								
			}
			else if ( chkProductCategory( id ) == "sup_detail"   ) {
				
				s.events = "event16";					
				s.prop27 = newPageNameENG.split(":")[1].toLowerCase();
				
				if (chkProductCategoryLevel( id ) == "sub_sub_type") {
					s.prop28 = newPageNameENG.split(":")[6].toLowerCase();
					s.eVar13 = s.prop28;				
					if ( newPageNameENG.split(":")[7] != undefined && newPageNameENG.split(":")[7] != null )  {
						if ( newPageNameENG.split(":")[7].toLowerCase() != "result"&&newPageNameENG.split(":")[7].toLowerCase() != "no result")
						{
							s.prop29 = newPageNameENG.split(":")[7].toLowerCase(); 
						}
					}
				}
				else {
					s.prop28 = newPageNameENG.split(":")[5].toLowerCase();
					s.eVar13 = s.prop28;				
					if ( newPageNameENG.split(":")[6] != undefined && newPageNameENG.split(":")[6] != null ) {
						if ( newPageNameENG.split(":")[6].toLowerCase() != "result"&&newPageNameENG.split(":")[6].toLowerCase() != "no result")
						{
						   s.prop29 = newPageNameENG.split(":")[6].toLowerCase();
						}
					}
				}
				
				s.eVar14 = document.getElementById( "cms_type_name" ).value;
				s.eVar15 = document.getElementById( "cms_subtype_name" ).value;
				  
		       }
		       else {
		       	
						if ( document.getElementById( "event_set" ) != null )
						{
							s.events = document.getElementById( "event_set" ).value;
						 }
		       }
		       
		 
		
		       var s_code=s.t();if(s_code)document.write(s_code);
		   

		}

		function tagPathindicatorEx( site_cd,iframe_id, id ) 
		{

			var siteCode = site_cd;
			var prodtype = gup("pagetype");

			initVar(); 
		
			s.server = window.location.host; 
			s.prop1 = s.eVar1 = getLanguageCode(siteCode);
			s.prop2 = s.eVar2 = siteCode;
			
			try {
				if(getCookie("PreferBandwidth")){
					s.prop12 = getCookie("PreferBandwidth");
					s.prop12 = s.prop12.toLowerCase();			
	                        }else {
	                        	s.prop12 = "high";
	                        	}
                        } catch(e) 
                        {}

			var newPageNameENG = getTextNodeEx(iframe_id, id );
			
			if ( newPageNameENG == false ) return false
			

			s.pageName = siteCode + ":" + newPageNameENG.toLowerCase();
			s.hier1 = s.pageName.replace(/:/gi, ">");
			
			
			
			if ( newPageNameENG.split(":")[0] != undefined ) {
				s.channel = siteCode + ":"+ newPageNameENG.split(":")[0].toLowerCase();
				s.prop3   = s.channel;
			}
			
			if ( newPageNameENG.split(":")[1] != undefined ) {
				s.prop4   = s.prop3 + ":" + newPageNameENG.split(":")[1].toLowerCase();
			}
			
			if ( newPageNameENG.split(":")[2] != undefined ) {
				s.prop5  = s.prop4 + ":" + newPageNameENG.split(":")[2].toLowerCase();
			}
			
			
		
		       var s_code=s.t();if(s_code)document.write(s_code);
		   

		}
		
		function tagURL(site_cd) {
			var strUrl = "";
			strUrl = SplitedURL[ 1 ];
			var siteCode = site_cd;
			initVar(); 
			
			s.server = window.location.host; 
			s.prop1 = s.eVar1 = getLanguageCode(siteCode);
			s.prop2 = s.eVar2 = siteCode;
			
			

			try {
				if(getCookie("PreferBandwidth")){
					s.prop12 = getCookie("PreferBandwidth");
					s.prop12 = s.prop12.toLowerCase();			
	                        }
	                        else {
	                        	s.prop12 = "high";
	                        }
                        } catch(e)
                        {}

			for( var i = 2 ; i < SplitedURL.length ; i++ )
			{
				strUrl += ":" + SplitedURL[ i ];
			}	
			

	
			if (strUrl.lastIndexOf(":") == strUrl.length-1) { 
				 s.pageName = strUrl.toLowerCase() + "main"; 
			}else if (SplitedURL[SplitedURL.length - 1].toLowerCase() == "index.html") { 
				 s.pageName = strUrl.replace("index.html", "main"); 
			}
			else s.pageName = strUrl.toLowerCase();

			if (SplitedURL[1] != "") {								
				if (SplitedURL[2] == "") {
					s.pageName = siteCode+ ":home";
					s.channel = siteCode+ ":home";
					s.prop3 = s.channel;
                                        s.hier1 = s.pageName.replace(/:/gi, ">");
                                        s.prop22 = "homepage";
				} else if(SplitedURL[2] == "index.html"){
					s.pageName = siteCode+ ":home";
					s.channel = siteCode+ ":home";
					s.prop3 = s.channel;
                                        s.hier1 = s.pageName.replace(/:/gi, ">");
                                        s.prop22 = "homepage";
                                }
			}

                      


			if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "supportprddetail.do") return s.pageName;
			if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "supportsearchmodelresult.do") return s.pageName;
			if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "searchresult.do") return s.pageName;
			if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "espsearchresult.do") return s.pageName;
			if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "newssearch.do") return s.pageName;

			
			var s_code=s.t();if(s_code)document.write(s_code);
			
			return s.pageName;
		}
		
	

	// customized codes for sec.com end
	//--------------------------------------------------------------------
	//--------------------------------------------------------------------
	
	//--------------------------------------------------------------------
	//--------------------------------------------------------------------
	// Front page common functions start
	/* identifying name, server, and channel */
		
		/*
		// Control Click Event
		function s_control_click(vLinkTrackVars, vLinkTrackEvents, vLinkTrackValues, vType, vTypeName) {
			var vSplitLinkTrackVars = vLinkTrackVars.split(',');
			var vSplitLinkTrackValues = vLinkTrackValues.split(',');
			
			s.linkTrackVars = vLinkTrackVars;
			s.linkTrackEvents = vLinkTrackEvents;
			
			for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {
				if(vSplitLinkTrackVars[xFI] == "products") {
					eval("s." + vSplitLinkTrackVars[xFI] + "='" + vSplitLinkTrackValues[xFI] + "'");
				} else {
					eval("s." + vSplitLinkTrackVars[xFI] + "='" + vSplitLinkTrackValues[xFI] + "'");
				}
			}
			
			s.tl(this, vType, vTypeName);
			s.linkTrackVars='none';
			s.linkTrackEvents='none';
		}
		*/
		
		function s_control_click(vLinkTrackVars, vLinkTrackEvents, vLinkTrackValues, vType, vTypeName) {
			var vSplitLinkTrackVars = vLinkTrackVars.split(',');
			var vSplitLinkTrackValues = "";
			

			if ( s_control_click_filter(vLinkTrackValues, vTypeName) == true ) return; 


			if (typeof(vLinkTrackValues)!="string")  vSplitLinkTrackValues = vLinkTrackValues ;
			else vSplitLinkTrackValues = vLinkTrackValues.split(',');
			

			
				
			s.linkTrackVars = vLinkTrackVars;
			s.linkTrackEvents = vLinkTrackEvents;
			
			for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {
				if(vSplitLinkTrackVars[xFI] == "products") {
				  s[vSplitLinkTrackVars[xFI]]= ";"+ vSplitLinkTrackValues[xFI].replace(";","");
				} else {
				  s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI].trim();
				}

			}
			
			s.tl(this, vType, vTypeName);
			s.linkTrackVars='none';
			s.linkTrackEvents='none';
		}


		function s_control_click_filter(vLinkTrackValues, vTypeName){
			
			var arrTypeNo = new Array("1", "2", "3", "4", "5", "6" ,"7", "8" ,"9", "10", "11", "12" ,"13","14","15","16","17","18","19","20");
			var arrTypeName  = new Array("product selector","product finding method","buy now step1","buy now","product interactions", "compare products","recently viewed","my saved products","dealer locator step 2","dealer locator searches : no results terms","product advisor clicks","predictive product search","search tab","product finding method & predictive product search","tell a friend","printer-friendly","product image usage","dealer locator step 1","dealer locator searches");
			var arrLinkTrackVarsUs = new Array("events,eVar20,prop5,eVar5", "prop5,eVar5", "products,events", "products,events,eVar2","products,events,eVar10","events","events","events","products,events","eVar36","eVar31,events","events,eVar14,prop15","prop1,prop3,prop5,eVar1,eVar5,events","prop5,eVar5,events,eVar14","products,events,eVar10","products,events,eVar10","products,events","products,events","products,events");
			var arrLinkTrackEventsUs = new Array("event42", "", "event14", "event10","event18","event38","event12","event37","event11","","event36","event34","event6","event33","event18","event18","event43","event35","event11");			
			var arrLinkTrackVarsGlobal = new Array("events,eVar20,prop22,eVar18","prop22,eVar18","products,events","products,events,eVar27","products,events,eVar9","events","events","events","products,events","eVar36","eVar31,events","events,eVar19,prop21","prop6,prop8,prop22,eVar6,eVar18,events","prop22,eVar18,events,eVar19","products,events,eVar9","products,events,eVar9","products,events","products,events","products,events");
			var arrLinkTrackEventsGlobal = new Array("event13", "", "event32", "event33","event3","event48","event42","event47","event35", "","event17","event12","event5","event11","event3","event3","event43","event29","event35");			
			
			var siteCode = getSiteCode();

			if (typeof(vLinkTrackValues)!="string")  vSplitLinkTrackValues = vLinkTrackValues;
			else vSplitLinkTrackValues = vLinkTrackValues.split(',');
			
			
			try {
				for (var i=0; i<arrTypeNo.length; i++) {
				
					if (vTypeName == arrTypeNo[i] || vTypeName.toLowerCase()== arrTypeName[i]) {
						if ( siteCode != "us" ) {
							s.linkTrackVars = arrLinkTrackVarsGlobal[i];
							s.linkTrackEvents = arrLinkTrackEventsGlobal[i];
							for(var xFI = 0; xFI < arrLinkTrackVarsGlobal[i].split(',').length; xFI++) {
								if(arrLinkTrackVarsGlobal[i].split(',')[xFI] == "products") {
								  s[arrLinkTrackVarsGlobal[i].split(',')[xFI]]= ";"+ siteCode + ":" + vSplitLinkTrackValues[xFI].replace(";","");
								} else if (arrLinkTrackVarsGlobal[i].split(',')[xFI] == "events") {
								  s[arrLinkTrackVarsGlobal[i].split(',')[xFI]] = arrLinkTrackEventsGlobal[i];	
								} else {
								  s[arrLinkTrackVarsGlobal[i].split(',')[xFI]]= vSplitLinkTrackValues[xFI].trim();
								}
				
							}
							s.tl(this, 'o', vTypeName);
							s.linkTrackVars='none';
							s.linkTrackEvents='none';
							return true;
														
						} else  return false;
					}
				}
			} catch(e) {
				
			    return false;
			}
		
			return false;
		}
		

		function s_control_click_in(vLinkTrackVars, vLinkTrackEvents, vLinkTrackValues, vType, vTypeName, vThisValue) {
	
 			var vSplitLinkTrackVars = vLinkTrackVars.split(',');
			var vSplitLinkTrackValues = "";

			if (typeof(vLinkTrackValues)!="string")  vSplitLinkTrackValues = vLinkTrackValues;
			else vSplitLinkTrackValues = vLinkTrackValues.split(',');

			if(vThisValue.href.indexOf("samsung.com") != -1){
				vLinkTrackEvents = "event32";
				vSplitLinkTrackValues[1] = "event32";
				vTypeName = "buy online by webcms(in)";		
			} 
				
			s.linkTrackVars = vLinkTrackVars;
			s.linkTrackEvents = vLinkTrackEvents;
			
			for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {
				if(vSplitLinkTrackVars[xFI] == "products") {
				  s[vSplitLinkTrackVars[xFI]]= ";"+ vSplitLinkTrackValues[xFI].replace(";","");
				} else {
				  s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI].trim();
				}

			}
			
			s.tl(this, vType, vTypeName);
			s.linkTrackVars='none';
			s.linkTrackEvents='none';
		}
		
		
		function s_control_click_detailLink(vButtonType, vModelName, vThisValue) {

			var siteCode = getSiteCode();

			var vLinkTrackVars = "products,events";
			var vLinkTrackEvents = "";
			var vLinkTrackValues = "";
			var vType = "o";
			var vTypeName = "";

			if (vButtonType == "SHOPNOW_LOCALRETAILER") {

				vLinkTrackEvents = "event29";
				vLinkTrackValues = ";" + vModelName + "," + vLinkTrackEvents;
				vTypeName = "Dealer Locator Step 1";

			} else if (vButtonType == "SHOPNOW_ONLINERETAILER") {

				vLinkTrackEvents = "event33";
				vLinkTrackValues = ";" + siteCode + ":" + vModelName + "," + vLinkTrackEvents;
				vTypeName = "buy online by webcms";

			}
			
			s_control_click(vLinkTrackVars, vLinkTrackEvents, vLinkTrackValues, vType, vTypeName);
		}

		
		function s_control_clickEx(vLinkTrackVars, vLinkTrackEvents, vLinkTrackValues, vType, vTypeName) {
			var vSplitLinkTrackVars = vLinkTrackVars.split(',');
			var vSplitLinkTrackValues = vLinkTrackValues;
			
						

			if ( s_control_click_filter(vLinkTrackValues, vTypeName) == true ) return; 

			
			s.linkTrackVars = vLinkTrackVars;
			s.linkTrackEvents = vLinkTrackEvents;
			
			for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {
				if(vSplitLinkTrackVars[xFI] == "products") {
				  s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI];
				} else {
				  s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI].trim();
				}

			}
			
			s.tl(this, vType, vTypeName);
			s.linkTrackVars='none';
			s.linkTrackEvents='none';
		}


