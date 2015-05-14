
var ulnum ;
var obj, j;
var page = 0;
var nowPage = 0;
var listNum = 8;
var PagesLen;
var PageNum = 3;

function upPage(p) {
    nowPage = p
    for (var i = 0; i < j; i++) {
        obj[i].style.display = "none";
    }

    for (var i = p * listNum; i < (p + 1) * listNum; i++) {
        if (obj[i]) obj[i].style.display = "block";
    }

   

    //strS = '<div class="sy_b"><span><a href="javascript:void(0)"  onclick="upPage(0)">Top </a> '
    var PageNum_2 = PageNum % 2 == 0 ? Math.ceil(PageNum / 2) + 1 : Math.ceil(PageNum / 2)
    var PageNum_3 = PageNum % 2 == 0 ? Math.ceil(PageNum / 2) : Math.ceil(PageNum / 2) + 1
    var strC = "", startPage, endPage;
    if (PageNum >= PagesLen) { startPage = 0; endPage = PagesLen - 1 }
    else if (nowPage < PageNum_2) { startPage = 0; endPage = PagesLen - 1 > PageNum ? PageNum : PagesLen - 1 }
    else { startPage = nowPage + PageNum_3 >= PagesLen ? PagesLen - PageNum - 1 : nowPage - PageNum_2 + 1; var t = startPage + PageNum; endPage = t > PagesLen ? PagesLen - 1 : t }
  
    for (var i = startPage; i <= endPage; i++) {
        if (i == nowPage) strC += '<span>' + (i + 1) + '</span> '
        else strC += '<a href="javascript:void(0)" onclick="upPage(' + i + ')">' + (i + 1) + '</a> '
    }

    if (nowPage != 0) {

        strS = '<div class="sy_b"><a href="javascript:void(0)"  onclick="upPage(' + (nowPage - 1) + ')">Previous </a>';
    }
    else {
        strS = '<div class="sy_b"><span>Previous</span>';
    
    }

    if (nowPage == (PagesLen - 1)) {
        strE = '  <span> Next</span>'
    }

    else {

        strE = '<a href="javascript:void(0)" onclick="upPage(' + (nowPage + 1) + ')">Next</a>'
    }
    strE2 = (nowPage + 1) + "/" + PagesLen + ' </div>'
    document.getElementById("changpagev3").innerHTML = strS + strC + strE + strE2
}

