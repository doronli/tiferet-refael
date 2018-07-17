'use strict';

var app = angular.module('price',[]);

app.component('price',{
    templateUrl:'component/price/price.html',
    controller: function($scope){
        $scope.numOfPeople = ["עד 10 אנשים", "מ 10-15 אנשים", "מ 16-20 אנשים","מ 20 אנשים ומעלה"];
        $scope.costPerHour = ["80","70","60","50", "50"];
        $scope.costTwoHours = ["130", "110", "100", "90"];
    }
})