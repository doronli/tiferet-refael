var app = angular.module('app',[
    //external
    'ui.router',
    
    //internal
    'home',
    'contactUs',
    'price',
    'questions',
    'events'
]);

app.config(function($stateProvider, $urlRouterProvider) {


    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            controller:function($scope){
            console.log("hello");
                $scope.MenuIconFunc = function(){
                    console.log("work")
                }
            },
            template: '<home></home>'
        })
        .state('contactus', {
            url: '/contact-us',
            template: '<contact-us></contact-us>'
        })
        .state('price', {
            url: '/price',
            template: '<price></price>'
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
