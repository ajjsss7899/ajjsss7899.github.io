// 글로벌 네비게이션 script
$(function(){
    var $gnbWrap = $('.gnb'),
		$gnbChild = $('.gnb > li > ul');
    $gnbWrap.on('mouseenter focusin', function(){
		$gnbChild.stop().slideDown(400);
	});
    $gnbWrap.on('mouseleave', function(){
        $gnbChild.stop().slideUp(400);
	});
    $('.last').focusout(function(){
   		$gnbChild.stop().slideUp(400);
	});
});

<!-- 로컬 네비게이션 -->
$(".lnb li").on('click focusin', function(){
    if($(this).hasClass("on"));
    $(this).addClass("on").siblings(".on").removeClass("on");
});
