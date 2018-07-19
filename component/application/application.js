var app = angular.module('app',[
    //external
    'ui.router',
    
    //internal
    'home',
    'contactUs',
    'torah-lesson',
    'questions',
    'events'
]);

app.config(function($stateProvider, $urlRouterProvider) {


    $stateProvider

        // HOME STATES AND NESTED VIEWS
        .state('home', {
            url: '/home',
            controller:function($scope){
              
            },
            template: '<home></home>'
        })
        .state('contactus', {
            url: '/contact-us',
            template: '<contact-us></contact-us>'
        })
        .state('torah-lesson', {
            url: '/torah-lesson',
            template: '<torah-lesson></torah-lesson>'
        })
        .state('questions', {
            url: '/questions',
            template: '<questions></questions>'
        })
        .state('events', {
            url: '/events',
            template: '<events></events>'
        });
    $urlRouterProvider.otherwise('home');
        
    })
