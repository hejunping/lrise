//后台附加html翻译接口 js ajax 

$(function(){
	//获取'输入翻译内容'的表单对象
	var transInput = $('#trans_input');
	//获取'添加中文翻译'按钮对象
	var transZh = $('#trans_zh');
	//获取'添加俄文翻译'按钮对象
	var transRu = $('#trans_ru');
	//获取'翻译记录'按钮对象
	var transRecord = $('#trans_record');
	//连续点击添加翻译弹出提示 判断标记
	var tipsSign = '';
	//获取翻译'内容'文本的按钮对象
	var transTextBtn = $('#trans_text');
	//获取模式退出按钮对象
	var transQuitMode = $('#trans_mode_quit');
	//获取查看记录div对象
	var transShowRecord = $('#trans_api .trans_record_content');
	//本地保存'内容'原始文本
	var locationSave = '';
	//原始标题
	var oriTitle = '';
	//定义翻译内容key值
	var transKey = false;
	//查看翻译记录 截取的原文
	var keyText = '';
	//大文本内容翻译模式value标记
	var valueSign = false;

	//基础判断
	transInput.focus(function(){
		var oriValue = $(this).val();
		if(oriValue == '请输入翻译内容'){
			$(this).val('');
		}
		
	});
	transInput.blur(function(){
		//alert($(this).val());
		if($(this).val().match(/^\s*$/)){
			$(this).val('请输入翻译内容');
		}
	});
	//封装翻译函数
	function transHandle(key,value,type,transFile,transBase,transURL){
		if(valueSign){//value标记开启，按翻译'内容'模式处理
			if(!value){
				alert('请在编辑框输入翻译内容！');
				abort();//报错中断
			}
			$.ajax({
				url:transURL,//'admin-trans-translate',
				type:'post',
				dataType:'json',
				data:{
					"key":key,
					"value":value,
					"type":type,
					"transFile":transFile,
					"transBase":transBase,
				},
				success:function(r,status,xhr){
					//console.log(r);
					if(r.status){
						tipsSign += r.data;//返回zh ru
						//transInput.val('');
						//提交翻译成功，置空编辑器内容
						editor.html('');
						alert(r.info);
					}else{
						alert(r.info);
					}
					
				},
				error:function(xhr,errText,errStatus){
					alert('请求错误：'+errStatus+':'+errText);
				},
			});
		}else{//否则，按默认状态处理
			var v;
			if(transInput.val().match(/^\s*$/)){//这段判断代码可以单独封装出来
				alert('输入翻译内容不能为空！');
			}else if(transField == undefined||transField.val().match(/^\s*$/)){
				alert('翻译字段不存在或值为空，不能添加翻译！');
			}else if((v = transInput.val()) == '请输入翻译内容'){
				alert('请输入翻译内容！');
			}else{
				$.ajax({
					url:transURL,//'admin-trans-translate',
					type:'post',
					dataType:'json',
					data:{
						"key":key,
						"value":value,
						"type":type,
						"transFile":transFile,
						"transBase":transBase,
					},
					success:function(r,status,xhr){
						//console.log(r);
						//transInput.val('');
						if(r.status){
							tipsSign += r.data;//返回zh ru
							transInput.val('');
							alert(r.info);
						}else{
							alert(r.info);
						}
						
					},
					error:function(xhr,errText,errStatus){
						alert('请求错误：'+errStatus+':'+errText);
					},
				});
			}
		}
		
	}

	//提交中文翻译
	transZh.click(function(){
		isDisplay();
		/*
		var transURL = 'admin-trans-translate';//提交地址
		var key = transField.val();//翻译字段原始值
		var value = transInput.val();//翻译文本
		var type = 'zh';//翻译语言
		var transFile = '';//翻译字典文件名，翻译添加至该文件
		var transBase = true;//是否使用通用翻译字典文件，将忽略指定的翻译文件
		*/
		var TransURL = 'admin-trans-translate';//提交地址
		var key;
		if(transKey){
			Key = transKey;//捕获的内容文本截取字符串值
		}else{
		 	Key = transField.val();//翻译字段原始值
		}
		var Value;
		if(valueSign){
			Value = editor.html();
		}else{
		 	Value = transInput.val();//翻译文本
		}
		var Type = 'zh';//翻译语言
		var TransFile = '';//翻译字典文件名，翻译添加至该文件
		var TransBase = true;

		//alert(Key);
		//alert(Value);
		if(tipsSign == 'zh'){
			if(confirm('已添加过中文翻译，您确定要更新它吗？')){
				transHandle(Key,Value,Type,TransFile,TransBase,TransURL);
			}
		}else if(tipsSign.match(/(zh|ru)(.*)(zh|ru)/)){
			if(confirm('已添加过中文俄文翻译，您确定要更新此次中文翻译吗？')){
				transHandle(Key,Value,Type,TransFile,TransBase,TransURL);
			}
		}else{
			//调用翻译函数
			transHandle(Key,Value,Type,TransFile,TransBase,TransURL);

		}
				
	});

	//提交俄文翻译
	transRu.click(function(){
		isDisplay();
		var TransURL = 'admin-trans-translate';//提交地址

		var Key;
		if(transKey){
			Key = transKey;//捕获的内容文本截取字符串值
		}else{
		 	Key = transField.val();//翻译字段原始值
		}
		if(valueSign){
			Value = editor.html();
		}else{
		 	Value = transInput.val();//翻译文本
		}
		var Type = 'ru';//翻译语言
		var TransFile = '';//翻译字典文件名，翻译添加至该文件
		var TransBase = true;


		if(tipsSign == 'ru'){
			if(confirm('已添加过俄文翻译，确定要更新它吗？')){
				transHandle(Key,Value,Type,TransFile,TransBase,TransURL);
			}
		}else if(tipsSign.match(/(zh|ru)(.*)(zh|ru)/)){
			if(confirm('已添加过中文俄文翻译，您确定要更新此次俄文翻译吗？')){
				transHandle(Key,Value,Type,TransFile,TransBase,TransURL);
			}
		}else{
			//调用翻译函数
			transHandle(Key,Value,Type,TransFile,TransBase,TransURL);

		}
				
	});

	//查看翻译记录
	transRecord.click(function(){
		if(isDisplay()){
			abort();//报错中断
		}
		if(transKey){
			//翻译字段
			var Key = transKey;//捕获的内容文本截取字符串值
			//alert(Key);
			var TransFile = '';
			var TransBase = true;
			$.ajax({
				url:'admin-trans-record',
				type:'post',
				dataType:'json',
				data:{
					"key":Key,
					"transFile":TransFile,
					"transBase":TransBase,
					"keytext":keyText,
				},
				success:function(r,status,xhr){
					//console.log(r);
					if(r.status){
						//alert(r.data);
						//console.log(r.data);
						//locationSave = r.data;
						transShowRecord.html(r.data);
						transShowRecord.slideDown('nomal');
						//alert(r.data);
					}else{
						alert(r.info);
					}
					
				},
				error:function(xhr,errText,errStatus){
					console.log(xhr);
					alert('请求错误：'+errStatus+':'+errText);
				},
			});
		}else{
			if(transField == undefined||transField.val().match(/^\s*$/)){
				alert($('#trans_api .title').text()+'翻译字段值为空或不存在，无法查看翻译记录！');
			}else{
				//翻译字段
				var Key = transField.val();//翻译字段原始值

				var TransFile = '';
				var TransBase = true;
				$.ajax({
					url:'admin-trans-record',
					type:'post',
					dataType:'json',
					data:{
						"key":Key,
						"transFile":TransFile,
						"transBase":TransBase,
					},
					success:function(r,status,xhr){
						//console.log(r);
						if(r.status){
							//alert(r.data);
							//console.log(r.data);
							//locationSave = r.data;
							transShowRecord.html(r.data);
							transShowRecord.slideDown('nomal');
							//alert(r.data);
						}else{
							alert(r.info);
						}
						
					},
					error:function(xhr,errText,errStatus){
						console.log(xhr);
						alert('请求错误：'+errStatus+':'+errText);
					},
				});
				
			}
		}
		
	});

	//点击进入'内容'翻译模式
	transTextBtn.click(function(){
		isDisplay();
		//获取编辑器'内容'的原始文本
		var keyString = editor.html();
		if(keyString){
			//原始文本保存本地
			locationSave = keyString;
			//截取指定长度作为原文
			keyText = subKey(keyString,512); 
			transKey = getTextKey();
			//保存原标题
			oriTitle = $('#trans_api .title span').text();
			//临时改变title标题
			$('#trans_api .title span').text('内容：');
			//禁止html翻译接口的翻译输入表单
			transInput.attr('disabled',true);
			//临时替换提示内容  退出模式时请还原
			transInput.val('请在编辑框输入翻译内容！');
			//清空编辑框文本
			editor.html('');
			//设置value标记
			valueSign = true;
			//alert('进入翻译内容模式成功，请确认当前输入的内容文本已提交过数据库，然后向内容编辑框输入要翻译的文本，再点击翻译操作！');//弹出提速操作信息
			$(this).parent('div').fadeOut('fast',function(){
				$('#trans_api .btn_quitmode').fadeIn('nomal');
			});
		}else{
			alert('编辑器输入框内容不能为空！输入内容并提交数据库成功后，请进入编辑状态，再次进行此内容翻译！');
		}
	});

	//退出'内容'翻译模式
	transQuitMode.click(function(){
		isDisplay();
		//复原原文本
		editor.html(locationSave);
		locationSave = '';
		transKey = false;
		//复原原标题
		$('#trans_api .title span').text(oriTitle);
		oriTitle = '';
		//恢复表单状态
		transInput.attr('disabled',false);
		transInput.val('请输入翻译内容');
		//取消value标记
		valueSign = false;
		$(this).parent('div').fadeOut('fast',function(){
			$('#trans_api .btn_chgmode').fadeIn('nomal');
		});

	});

	//双击查看翻译记录div关闭窗口
	transShowRecord.dblclick(function(){
		$(this).slideUp('nomal');
	});

	//截取字符串函数
	function subKey(argstring,arglength){
		if(argstring.length>arglength)
			return argstring.substr(0,arglength);
		else
			return argstring;
	}
	//公共函数
	function isDisplay(){
		if(transShowRecord.css('display') == 'block'){
			transShowRecord.hide();
			return true;
		}
	}

	//专用函数
	function getTextKey(){//获取指定规则的文本字符串作为内容翻译key值
		if(title_textKey){
			return title_textKey+'texttexttexttexttext';//text*5
		}else{
			return transField.val()+'texttexttexttexttext';
		}
	}



});
