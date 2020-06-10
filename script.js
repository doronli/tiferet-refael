$(window).scroll(() => {
    if($(document).scrollTop() > 50){
        $('.nav').addClass('affix');
        $('.logo img').removeClass("logo-img-before-scroll");
        $('.logo img').addClass("logo-img-after-scroll");
    }
    else{
        $('.nav').removeClass('affix');

        $('.logo img').removeClass("logo-img-after-scroll");
        $('.logo img').addClass("logo-img-before-scroll");

    }
});

$('.navTrigger').click( () => {
    $(this).toggleClass('active');
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});
