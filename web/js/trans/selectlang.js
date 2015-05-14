//点击切换语言的标识按钮，显示隐藏下拉列表；焦点失去时，隐藏下拉列表；但点击下拉列表时，将顶部标识按钮的改变成所选语言，同时超链接跳转刷新当前页面；在依据后台php输出的一个同步翻译开关来切换顶部标识按钮


$(function(){
	var showzh = $('<a href="javascript:;" class="zh">简体中文</a>');
	var showru = $('<a href="javascript:;" class="ru">Pусский</a>');
	var showdefault = $('<a href="javascript:;" class="default">English</a>');
	//点击切换语言
	$('#selectlang .showlang').click(function(){
		$('#selectlang .langlist').toggle();
	})
	$('#selectlang .langlist a').click(function(){
		if($(this).hasClass('zh')){
			$('#selectlang .showlang').html(showzh);
			$('#selectlang .langlist').hide();
		}else if($(this).hasClass('default')){
			$('#selectlang .showlang').html(showdefault);
			$('#selectlang .langlist').hide();
		}else if($(this).hasClass('ru')){
			$('#selectlang .showlang').html(showderu);
			$('#selectlang .langlist').hide();
		}

	})
	//页面刷新后自动显示正确的语言状态
	if(auto_translate == "0"){
		$('#selectlang .showlang').html(showzh);
	}else if(auto_translate == "1"){
		$('#selectlang .showlang').html(showdefault);
	}else if(auto_translate == "2"){
		$('#selectlang .showlang').html(showru);
	}

	
})