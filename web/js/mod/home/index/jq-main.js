function scroll_news(){
    var firstNode = $('.scroll-container li'); 
    firstNode.eq(0).fadeOut('slow',function(){ 
     $(this).clone().appendTo($(this).parent()).show('slow'); 
     $(this).remove();
  });
}
setInterval('scroll_news()',5000);
