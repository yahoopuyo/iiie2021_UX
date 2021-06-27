var display_click = 0;
$(document).click(function(event){
    display_click++;
    if(display_click === 1){
        $('.abstract-wrapper').addClass('abstract-wrapper-move');
        $('.thumbnail').removeClass('thumbnail-StrongMosaic');
        $('.thumbnail').addClass('thunbnail-MiddleMosaic');
        setTimeout(function(){
            $('.abstract-wrapper').hide();
       },1000);
    }else if(display_click === 2){
        $('.thumbnail').removeClass('thumbnail-MiddleMosaic');
        $('.thumbnail').addClass('thunbnail-WeakMosaic');
        $('.moveL1').addClass('moveL-move');
        $('.moveR1').addClass('moveR-move');
        $('.thumbnail').css({'width':'50%'});
        $('.moveL2').attr('src','../images/person-black.png');
        $('.moveR2').attr('src','../images/person-black.png');
        $('.moveL2').css({'top':'55vh'});
        $('.moveR2').css({'top':'55vh'});
        /*
        setTimeout(function(){
            //$('.moveL2').attr('src','../images/person-black.png');
            //$('.moveR2').attr('src','../images/person-black.png');
       },1000);
       */
    }else if(display_click === 3){
        $('.thumbnail').removeClass('thunbnail-WeakMosaic');
        $('.thumbnail').addClass('thunbnail-NoMosaic');
        $('.moveL2').addClass('moveL-move');
        $('.moveR2').addClass('moveR-move');
        $('.thumbnail').css({'width':'60%'});
        setTimeout(function(){
            $('.people').hide();
            $('.thumbnail-wrapper').hide();
            $('.video-project').show();
       },1000);
    }
});