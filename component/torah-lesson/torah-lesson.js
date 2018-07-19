'use strict';

var app = angular.module('torah-lesson',[]);

app.component('torahLesson',{
    templateUrl:'component/torah-lesson/torah-lesson.html',
    controller: function($scope, $http){
        $scope.init = function(){
            var channelName = 'UC7ENUB5fJwOfraFqLi4oEJA';
            $.ajax({
                type: "GET",
                url: 'https://www.youtube.com/channel/UC7ENUB5fJwOfraFqLi4oEJA',
                success: function (result) {
                    console.log(result);
                }
            })   
          

                
            
        }
        $scope.init();
    }
})
