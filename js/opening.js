var display_click = 0;

$(document).click(function(event){
	display_click++;
	if(display_click === 1){
		$('.video-background').css({'background-color':'rgba(0,0,0,0)'});
		$('.video-window').css({'top':'100%'});
		$('.click-guideL-wrapper').css({'left':'0px'});
		$('.shutter').css({'background-color':'rgba(255,255,255,0.8)'});
		$('.main').css({'transition':'all 1s'});
	}else if(display_click === 2){
		$('.main').css({'transform':'scale(0.8)'});
		$('.main').css({'filter':'blur(10px)'});
		$('.moveL').addClass('moveL-move');
		$('.barL').addClass('moveL-move');
		$('.click-guideL-wrapper').addClass('moveL-move');
		$('.click-guideR-wrapper').css({'right':'0px'});
		$('.shutter').css({'background-color':'rgba(255,255,255,0.6)'});
	}else if(display_click === 3){
		$('.main').css({'transform':'scale(1)'});
		$('.main').css({'filter':'blur(0px)'});
		$('.moveR').addClass('moveR-move');
        $('.barR').addClass('moveR-move');
		$('.click-guideR-wrapper').addClass('moveR-move');
		$('.shutter').css({'background-color':'rgba(0,0,0,0)'});
		setTimeout(function(){
			$('.shutter').hide();
			$('html').css({'overflow':'visible'});
			$('body').css({'overflow':'visible'});
			//$('.main').css('transition','');
			//$('.shutter').css('transition','');
        },1000);
	}
});