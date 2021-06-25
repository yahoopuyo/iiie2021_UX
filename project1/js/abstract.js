var display_click = 0;
$(document).click(function(event){
    display_click++;
    if(display_click === 1){
        $('.abstract-wrapper').addClass('abstract-wrapper-move');
        $('.thumbnail').removeClass('thumbnail-StrongMosaic');
        $('.thumbnail').addClass('thunbnail-WeakMosaic');
        /*$('.thumbnail').css({
            'ms-filter': 'blur(10px)',
            'webkit-filter':'blur(10px)',
            'moz-filter': 'blur(10px)',
            'o-filter': 'blur(10px)',
            'filter': 'blur(10px)'
        });*/
        setTimeout(function(){
            $('.abstract-wrapper').hide();
       },1000);
    }else if(display_click === 2){
        $('.thumbnail').removeClass('thunbnail-WeakMosaic');
        $('.moveL').addClass('moveL-move');
        $('.moveR').addClass('moveR-move');
        setTimeout(function(){
            $('.people').hide();
            $('.thumbnail-wrapper').hide();
            $('.video-project').show();
       },1000);
    }else{

    }
});