$(document).ready(function() {
	$(".leftnm").mouseover(function(){
		  $(this).find("[name='menulest']").css('display','block');
	});
	
	$(".leftnm").mouseleave(function(){
		  $(this).find("[name='menulest']").css('display','none');
	});
	
    
});