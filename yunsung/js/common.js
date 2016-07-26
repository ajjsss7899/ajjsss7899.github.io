// gnb script
$(function(){
	$(window).resize(function(){
		var $gnbWrap = $('.gnb'),
		$gnbChild = $('.gnb > li > ul');
		if ($(window).width() > 1005) {
			$gnbWrap.on('mouseenter focusin', function(){
			$gnbChild.addClass('on'),
			$gnbWrap.css("border-bottom"," 1px solid #c6c6c6")
		});
			$gnbWrap.on('mouseleave', function(){
			$gnbChild.removeClass('on'),
			$gnbWrap.css("border-bottom"," 1px solid #e1e1e1")
		});
			$('.srch').on('focusin', function(){
			$gnbChild.removeClass('on')
			});
		}else{
			$gnbWrap.on('mouseenter focusin', function(){
			$gnbChild.removeClass('on')
		});
			$('.srch').on('focusin', function(){
			$gnbChild.removeClass('on')
			});
		}
	}).resize();
});

// 모바일 gnb script
$(function(){
	$(".sitemap").on("click", function(){
		$(".m_nav, .util_menu").animate({left:270}, 300);
		$(".m_nav, .util_menu, .gnb, .dark").addClass("on");
		$("html,body").addClass("scroll");
	});
	$(".close, .dark").on("click", function(){
		$(".m_nav, .util_menu").animate({left:0}, 300);
		setTimeout(function(){
		$(".m_nav, .util_menu, .gnb, .dark").removeClass("on");
		},300);
		$("html,body").removeClass("scroll");

	});
	$(".gnb > li").on('click', function(){
		var tab = $(this);
		if(tab.hasClass("on"));
		tab.addClass("on").siblings(".on").removeClass("on");
	});
});

// gnb fixed
$(window).scroll(function(){
	if($(window).scrollTop() >=40){
		$("nav").addClass("on");
	}
	else{
		$("nav").removeClass("on");
	}
});
