$(document).ready(function(){

	Shir();

	$(window).resize(function(){
		Shir();
	});

});

function Shir() {
	$('.price__types-properties .left b').each(function(){
		var pw = $(this).parent().width();
		var sw = $(this).parent().find('span').width();
		var tw = pw - sw - 5;
		$(this).width(tw);
	});
}