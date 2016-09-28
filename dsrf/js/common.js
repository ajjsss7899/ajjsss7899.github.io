//gnb script
$(function(){
	$(".menu_open, .menu_close").on("click", function(e){
	e.preventDefault();
	});
	$(".menu_open").on("click",function(){
		$(".gnb").slideDown("fast");
		$(".menu_open, .menu_close").addClass("on");
	});
	$(".menu_close").on("click",function(){
		$(".gnb").slideUp("fast");
		$(".menu_open, .menu_close").removeClass("on");
	});
});