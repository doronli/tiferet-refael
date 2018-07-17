'use strict';
var app = angular.module('home',[]);

app.component('home',{
    templateUrl:'component/home/home.html',
    controller:function(){
        
        var numOfSlides;
        var timeOfDelay;
        var widthScreen = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if(widthScreen > 760){
            timeOfDelay = 3000;
            numOfSlides = 3;
        }
        else{
            numOfSlides = 1;
            timeOfDelay = 2000;
        }
        var mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            loop: true,
            slidesPerView: numOfSlides,
            spaceBetween: 10,
            autoplay: {
                delay: timeOfDelay
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
})