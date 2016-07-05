$(document).ready(function(){
	SW	=	$(window).width();
	SH	=	$(window).height();

	main_banner_slide = $('.main_banner_slide').bxSlider({
		mode:'fade',
		auto: true,
		pause: 3000,
		speed:1000,
		autoStart: true,
		autoDelay: 0,
		autoHover: true,
		controls:false,			
		pager:true,
		infiniteLoop:true				
	});
	mainbannerSize()
	
	exSlideArr = [];
	$('.ex_slide_wrap').find('> div').each(function(){
		var slide = $(this).find('.ex_slide').bxSlider({
			controls:true,			
			pager:false,
			minSlides:1,
			maxSlides:1,			
			moveSlides:1,
			nextText:"<img src='../images/content/btn_slide_next01.png' width='23'>",
			prevText:"<img src='../images/content/btn_slide_prev01.png' width='23'>",
			infiniteLoop:false				
		});	
		exSlideArr.push(slide);
	});
	ex_slideCheck(0);

	planer_slide = $('.planer_slide').bxSlider({
		controls:false,			
		pager:true,
		auto: true,
		pause: 3000,
		autoStart: true,
		autoDelay: 0,
		autoHover: true,
		infiniteLoop:true				
	});	



	$('.list_tab').find('> li > a').click(function(){
		mainCsCheck($(this).parent().parent(),$(this).parent().index());
	});
	$('.list_tab').each(function(){
		mainCsCheck($(this),0);
	});

	main.init();

});
$(window).load(function(){
	//mainbannerSize()
	
});

$(window).resize(function(){
	SW	=	$(window).width();
	SH	=	$(window).height();
	mainbannerSize()
	ex_slidePageCheck();
});//end resizesssssssssssssssssss

function mainCsCheck(_t,_i){
	var __t = _t.next();
	_t.find('> li').eq(_i).addClass('actived').siblings().removeClass('actived');
	__t.find('> div').eq(_i).show().siblings().hide();
	ReponsiveListResize();
}

function mainbannerSize(){
	var _h = $('.main_banner').innerHeight();
	$('.main_banner').find('.cell').height(_h);
	$('.main_banner').find('.bx-wrapper').height(_h);
	$('.main_banner').find('.bx-viewport').height(_h);
}



function ex_slideCheck(_i){
	$('.main_ex').find('> li').eq(_i).addClass('actived').siblings().removeClass('actived');
	$('.ex_slide_wrap').find('> div').eq(_i).show().siblings().hide();
	/*
	$('.ex_slide_wrap').find('> div').each(function(){
		if($(this).index() == _i){
			$(this).stop(true).fadeIn(600);
		}else{
			$(this).stop(true).hide();
		}
	});
	*/
	ex_slidePageCheck();
}

function ex_slidePageCheck(){
	var slideNum;
	var slideMargin = 0
	if(SW <= 1023)slideNum = 3;
	if(SW <= 640)slideNum = 2;
	if(SW <= 420)slideNum = 1;
	if(SW > 1023)slideNum = 5;
	if(slideNum > 1)slideMargin = 10;

	$('.ex_slide_wrap').find('> div').each(function(){
		var _PH = $(this).parent().innerWidth();
		exSlideArr[$(this).index()].reloadSlider({
			controls:true,			
			pager:false,
			minSlides:slideNum,
			maxSlides:slideNum,			
			moveSlides:slideNum,
			slideWidth:_PH,
			slideMargin:slideMargin,
			nextText:"<img src='../images/content/btn_slide_next01.png' width='23'>",
			prevText:"<img src='../images/content/btn_slide_prev01.png' width='23'>",
			infiniteLoop:false				
		});	
		
	});


}




var main = {
	prev:-1,
	cur:0,
	len:-1,
	dir:0,
	sTarget:null,
	cTarget:null,
	aFlag:false,
	cNum:-1,
	timer:null,
	thumbData:null,
	DW:140,
	BW:472,
	RM:10,
	TS:0.5,
	cRO:0,
	page:false,
	pageLink:false,
	timer:null,
	timerSpeed:5000,
	cTargetEnter:null,
	intro:true,
	init:function(){
		main.sTarget = $('#main_slider');
		main.len = main.sTarget.find('.big_wrap p').length;
		main.cNum = Math.floor(main.len/2);
		main.cur  = 0;
		main.prev = main.len-1;
		main.thumbData = new Array();
		
		
		if(main.page){
			main.sTarget.append("<div class='page'></div>");
			var _k=0;
			for(_k=0;_k < main.len;_k++){
				main.sTarget.find('.page').append('<a></a>');
			}
		}
		
		main.sTarget.find('.thumb_wrap').css({
			'width':(main.len-1)*(main.DW+main.RM)+main.BW,
			'left':'50%',
			'margin-left':(((main.cNum)*(main.DW+main.RM))+main.BW/2)*-1
		});
		var __i=0;
		var __num  = 0;
		var __k = main.cNum;
		main.sTarget.find('.thumb_wrap p').each(function(){			
			main.thumbData[__i] = {
				_t:$(this),
				_index:$(this).index(),
				_num:__k,
				_title:$(this).find('.title').text(),
				_cate:$(this).find('.cate').html(),
				_link:$(this).find('a').attr('href')
			}
			__k =(__k >= main.len-1)?0:__k = __k + 1;
			__i++;
			if(!main.pageLink){
				$(this).find('a').attr('href','javascript:;');
			}
		});

		// left right arrow
		main.sTarget.find('> a').bind('click',function(e){			
			if(!main.aFlag){
				main.arrowClickHand($(this));	
				main.aFlag = true;
				setTimeout(function(){main.aFlag=false},600);
			}						
		});

		// visual mouseover , out
		main.sTarget.bind('mouseenter mouseleave',function(e){
			if(e.type=='mouseenter'){
				//main.stop();
			}else{
				//main.play();
			}
		});
		
		// page event
		main.sTarget.find('.page a').click(function(){
			if($(this).index() != main.cur){
				main.prev = main.cur;
				main.cur = $(this).index();				
				main.dir = (( main.cur - main.prev) < 0)?0:1;
				main.mulityClickHand();
				
			}
		});

		// thumb event
		main.sTarget.find('.thumb_wrap p').click(function(){
			if(!main.pageLink){
				if($(this).index() != main.cur){					
					main.prev = main.cur;
					main.cur = $(this).index();
					main.dir = (main.thumbData[$(this).index()]._num < main.cNum)?0:1;
					main.mulityClickHand();
				}
			}
		});		

		
		main.thumbPosSet(0);
		main.bigThumbAlign();
		//main.cur  = 0;
		//main.prev = 1;
		//main.mulityClickHand();
		main.intro = false;
		//main.timer = setInterval(main.autoTimer,main.timerSpeed);


	},
	mulityClickHand:function(){
		//console.log(main.cur+ ' : '+main.prev);
		var __i=0;
		for(__i=0;__i<main.len;__i++){
			main.thumbData[__i]._num = main.thumbData[__i]._num - ( main.cur - main.prev)
			if(main.thumbData[__i]._num > main.len-1){
				main.thumbData[__i]._num = main.thumbData[__i]._num - main.len;
			}else if(main.thumbData[__i]._num < 0){
				main.thumbData[__i]._num = main.thumbData[__i]._num + main.len;
			}
		}
		main.thumbPosSet(main.cur);
		main.bigThumbAlign();
		main.aFlag = true;
		setTimeout(function(){main.aFlag=false},600);
	},
	arrowClickHand:function(_t){
		main.prev = main.cur;
		if(_t.hasClass('btn_left')){
			//left
			main.cur = (main.cur == 0)?main.len-1:main.cur=main.cur-1;
			main.dir = 0;
		}else{
			main.cur = (main.cur >= main.len-1)?0:main.cur = main.cur+1;
			main.dir = 1;
			//right			
		}
		main.thumbDataReset(main.dir);
		main.bigThumbAlign();
	},
	bigThumbAlign:function(){
		main.sTarget.find('.big_wrap p').each(function(){
			var _dx = (main.dir == 0)?-412:412;
			if(SW <= 480){
				_dx = (main.dir == 0)?-320:320;
			}
			if($(this).index() == main.cur){
				$(this).show();
				TweenMax.set($(this),{x:_dx});
				TweenMax.to($(this),0.5,{x:0,ease:Quad.easeOut});
			}else if($(this).index() == main.prev){
				TweenMax.to($(this),0.5,{x:_dx*-1,ease:Quad.easeOut});
			}else{
				$(this).hide();
			}
		});
		main.sTarget.find('.page > a').eq(main.cur).addClass('actived').siblings().removeClass('actived');
	},
	thumbDataReset:function(_d){
		var __i=0;
		for(__i=0;__i<main.len;__i++){
			if(_d == 1){
				//left  --;
				main.thumbData[__i]._num = (main.thumbData[__i]._num == 0)?main.len-1:main.thumbData[__i]._num = main.thumbData[__i]._num-1;
			}else{
				//right ++;
				main.thumbData[__i]._num = (main.thumbData[__i]._num >= main.len-1)?0:main.thumbData[__i]._num = main.thumbData[__i]._num+1;
			}
			//console.log(main.thumbData[__i]._num+' : '+_d);
		}
		main.thumbPosSet(_d);
	},
	thumbPosSet:function(_d){
		var __i=0;
		for(__i=0;__i<main.len;__i++){
			var _dx;
			var _delay = __i*0.02;
			var _speed;
			if(main.thumbData[__i]._num == main.cNum){
				_dx = main.thumbData[__i]._num*(main.DW+main.RM)+main.BW/2;
				_speed = main.TS;
			}else if(main.thumbData[__i]._num > main.cNum){
				_dx = main.thumbData[__i]._num*(main.DW+main.RM)+main.BW-main.DW-main.RM;				
				_speed = main.TS;
			}else{
				_dx = main.thumbData[__i]._num*(main.DW+main.RM)+main.RM;
				_speed = main.TS;
			}

			if(!main.intro){
				if(_d==1){
					if(main.thumbData[__i]._num == main.len-1)TweenMax.set(main.thumbData[__i]._t,{x:_dx+main.DW});
				}else{
					if(main.thumbData[__i]._num == 0)TweenMax.set(main.thumbData[__i]._t,{x:_dx-main.DW});
				}
				TweenMax.to(main.thumbData[__i]._t,_speed,{x:_dx,ease:Quad.easeOut});
			}else{
				TweenMax.set(main.thumbData[__i]._t,{x:_dx});
			}
		}

		//console.log(main.thumbData[main.cur]._title);
		main.sTarget.find('div.txt_wrap span').each(function(){
			$(this).text('');
			if($(this).hasClass('title'))$(this).text(main.thumbData[main.cur]._title);
			if($(this).hasClass('cate'))$(this).html(main.thumbData[main.cur]._cate);
		});
		main.sTarget.find('div.txt_wrap a').attr('href',main.thumbData[main.cur]._link);
	},
	autoTimer:function(){
		main.prev = main.cur;
		if(main.dir == 0){
			//left
			main.cur = (main.cur == 0)?main.len-1:main.cur=main.cur-1;
		}else{
			main.cur = (main.cur >= main.len-1)?0:main.cur = main.cur+1;
			//right			
		}
		main.thumbDataReset(main.dir);
		main.bigThumbAlign();
	},
	stop:function(){
		clearInterval(main.timer);
		//console.log('player stop');
	},
	play:function(){
		clearInterval(main.timer);
		main.timer = setInterval(main.autoTimer,main.timerSpeed);
		//console.log('player play');
	}
}

