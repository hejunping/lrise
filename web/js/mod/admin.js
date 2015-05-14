IS_ADMIN = true;
//表单输入框状态样式切换
function form_chg(o)
{
	if(!o) o = $('.form2 .text');
	o.focus(function(){
		$(this).addClass('hover');
	});
	
	o.blur(function(){
		if($(this).val() != $(this).attr('rel')) $(this).addClass('on');
		else $(this).removeClass('on');
		$(this).removeClass('hover');
	});
}

function input_toggle(o,cls,tips)
{
    if(o.val() == '' || o.val() == tips) o.val(tips).addClass(cls);
    o.blur(function(){  if(o.val() == '') o.val(tips).addClass(cls);  });
    o.focus(function(){ if(o.val() == tips) o.val('').removeClass(cls);  });
}

//Ajax方式排序
function ajax_sort(o)
{
	if(!o) o = $('a.ajax_sort');
	o.click(function(){
		var id = $(this).attr("rel");
		var val = $(this).attr("rev");
		var url = $(this).attr('href');
		var obj = $(this);
		$.getJSON(url+'?callback=?',{id:id,val:val,is_ajax:1},function(data){
			if(data.status == 'y')
			{
				location.href = location.href;
				var val = parseInt(data.info);
				var no = parseInt(obj.siblings('span').text());
				obj.siblings('span').text(no + val);
			}
			else sys_tips('操作失败:'+data.info);
		});
		return false;
	});
}

//Ajax方式处理字段状态值改变
function ajax_bool(o)
{
	if(!o) o = $('a.ajax_bool');
	o.click(function(){
		var id = $(this).attr("rel");
		var field = $(this).attr('rev');
		var url = $(this).attr('href');
		var obj = $(this);
		$.getJSON(url+'?callback=?',{id:id,field:field,is_ajax:1},function(data){
			if(data.status == 'y')
			{
				obj.text(data.info['text']);
				obj.attr('class',data.info['class']);
			}
			else sys_tips('操作失败:'+data.info);
		});
		return false;
	});
}

//Ajax方式处理表单
function ajax_submit(before,call,o)
{
	if(!call) call = null;
	if(!o) o = $('div.form2 form');
	o.submit(function(){
		if(before) before();
		sys_tips('数据处理中~~<br/><img src="web/images/admin/loading.gif">',3);
		$.ajax({
			type: "POST",
			dataType:"json",
			url: $(this).attr("action"),
			data: $(this).serialize()+'&is_ajax=json',
			success: function(data){
				if(data.status == 'y') 
				{
					if(!call) 
					{
//						o.find('.on').each(function(){
//							$(this).attr('rel',$(this).val()).removeClass('on');
//						});
//						sys_tips(data.info,1);
                        location.href  = location.href;
					}
					else call(data);
				}
				else sys_tips(data.info,0);
			},
			error:function(){ sys_tips('运行出错',0);}
		});
		return false;
	});
}

//鼠标所在行加底色
function tr_hover(o)
{
	if(!o) o = $('div.list table tr');
	$('div.list table tr').hover(function(){
		$(this).css('background-color','#F0F0F0')
	},function(){
		$(this).css('background-color','');
	});
}

//弹出提示框
function sys_tips(info,type)
{
	var color = "cRed",title='错误提示',delay = 0,btnconfirm=true,bg=true,bar=true,w=250;
	if(type == 1) color = 'cGreen',title = '操作提示',delay = 1500,btnconfirm = false,bar=false,bg=false;
	else if(type == 2) color = 'cOrange',title= '操作警告',delay = 3000,btnconfirm = false,bg=false;
	else if(type == 3) color = 'cBlue',btnconfirm=false,bar=false;
	if(info.length > 150) w = 500;
	else if(info.length > 50) w = 400;
	else if(info.length > 12) w = 300;
	$.zxxbox.remind("<span class='"+color+" f14 l25'>"+info+"</span>",null,{
		title: title,
		btnconfirm: btnconfirm,
		delay: delay,
		bg: bg,
		bar:bar,
		width:w
	});
}

//模板缓存的点击事件
function chk1(obj){
	var rs = $(obj).attr('checked');
	if(rs == 'checked'){
		$('.mod').removeClass('hide');
	}else{
		$('.mod').addClass('hide');
	}
}
//静态缓存的点击事件
function chk2(obj){
	var rs = $(obj).attr('checked');
	if(rs == 'checked'){
		$('.static').removeClass('hide');
	}else{
		$('.static').addClass('hide');
	}
}

//产品分类（联动）
function chgcate(){
    var init = $('select[name="ctype2"]').attr('init');
	var url = $('.ctype').attr('url');
	var pid = $('.ctype').val();
	$.get(url,{pid:pid},function(data){
		$("#ctype2").val(data.item)
	},"json");
}

function setbg()
{
	$(":checkbox").parent("label").css("color","#666666");		
	$(":checkbox[checked]").parent("label").css("color","#009900");
	$(":radio").parent("label").css("color","#666666");
	$(":radio[checked]").parent("label").css("color","#009900");
	
}

function taoapi(){
	var rs = $('.taoapi').attr('url');
	provs.change(function(){
		var pid=$(this).children('option:selected').val();
		var text=$(this).children('option:selected').text();
		
	})
}

