// gnb script
$(function(){
	$('.gnb').on('mouseenter focusin',function(){
		$('.gnb > li > ul').addClass('on');
		$('.gnb').css('border-bottom','1px solid #c6c6c6');
	});
	$('.gnb').on('mouseleave', function(){
		$('.gnb > li > ul').removeClass('on');
		$('.gnb').css('border-bottom','1px solid #e1e1e1');
	});
	$('.srch').on('focusin',function(){
		$('.gnb > li > ul').removeClass('on');
		$('.gnb').css('border-bottom','1px solid #e1e1e1');
	});
});

// 모바일 gnb script
$(function(){
	$(".sitemap").on("click", function(){
		$(".m_gnb, .m_gnb_wrap h1, .util_menu").animate({left:270}, 300);
		$(".m_gnb_wrap, .util_menu, .dark").addClass("on");
		$("html,body").addClass("scroll");
	});
	$(".close, .dark").on("click", function(){
		$(".m_gnb, .m_gnb_wrap h1, .util_menu").animate({left:0}, 300);
		setTimeout(function(){
		$(".m_gnb_wrap, .util_menu, .dark").removeClass("on");
		},300);
		$("html,body").removeClass("scroll");
	});
	$(".m_gnb > li").on('click', function(){
		var tab = $(this);
		if(tab.hasClass("on"));
		tab.addClass("on").siblings(".on").removeClass("on");
	});
});

// gnb fixed
$(window).scroll(function(){
	if($(window).scrollTop() >=40){
		$(".gnb_wrap").addClass("on");
	}
	else{
		$(".gnb_wrap").removeClass("on");
	}
});
