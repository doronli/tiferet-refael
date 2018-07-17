'use strict';

$(document).ready(function () {
    $('li').click(function () {
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
    });

    var widthScreen = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if(widthScreen < 760){
        $('.navigation').click(function(){
            $('.navigation').css('display','none');
        })
        var mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            loop: true,
            slidesPerView: 3,
            spaceBetween: 10,
            autoplay: {
                delay: 5000
            },

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

        })
    }
    else if(widthScreen <= 320){
            var mySwiper = new Swiper('.swiper-container', {
                // Optional parameters
                loop: true,
                slidesPerView: 1,
                spaceBetween: 10,
                autoplay: {
                    delay: 5000
                },

                // If we need pagination
                pagination: {
                    el: '.swiper-pagination',
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

            })
        }
    window.onload = function () {
            // solve the problem when refresh page the active page will be always the home page 
            var url = window.location.href;
            var lastIndex = url.lastIndexOf('/');
            var pageId = url.substring(lastIndex + 1, url.length);
            $('li').removeClass('active');
            $('#' + pageId).addClass('active');
    }
   
<<<<<<< HEAD

=======
    //Contact us form
    $(document).on("click", '#contact-us-button', function () {
        var error = ValidationContactForm();
        if (error) {
            $.ajax({
                type: "POST",
                url: "../component/contactUs/contact_form.php",
                data: $("#contact-form").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-contact-form").html(result);
                    $("#success-contact-form").fadeIn("slow");
                    $('#success-contact-form').delay(4000).fadeOut("slow");
                }
            });
        }
    });
>>>>>>> 699aa167472c8e4553513aea6216384458e7468d
    

});