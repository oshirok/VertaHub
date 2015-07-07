var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };
 
    }]);

app.controller('myCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

// YO YO YO WARREN START HERE ----------------------------------------------------------------------------
app.controller('myGrid', function($scope){
	var posts = [{ 
"timestamp": 1436268134, 
"name": "Food Trucks: Poke to the Max", 
"desc": "Come enjoy lunch with some of your fellow coworkers. Meet at lobby at 12pm to walk to the food truck!", 
"location": "North Creek Parkway", 
"category": "food", 
"time_from": 1436529600, 
"time_to": 1436533200, 
"guest_list": ["John Doe", "Jonathan Rahn", "Lisa Tompa", "Gaetano Pyle"] 
}, 
{ 
"timestamp": 1436268859, 
"name": "Food Trucks: Circus Burgers", 
"desc": "Come enjoy lunch with some of your fellow coworkers. Meet at lobby at 11am to walk to the food truck!", 
"location": "North Creek Parkway", 
"category": "food", 
"time_from": 1436871600, 
"time_to": 1436875200, 
"guest_list": ["Xi Shu", "Lisa Tompa", "Gaetano Pyle"] 
}, 
{ 
"timestamp": 1436268859, 
"name": "Food Trucks: Circus Burgers", 
"desc": "Come enjoy lunch with some of your fellow coworkers. Meet at lobby at 11am to walk to the food truck!", 
"location": "North Creek Parkway", 
"category": "food", 
"time_from": 1436871600, 
"time_to": 1436875200, 
"guest_list": ["Xi Shu", "Lisa Tompa", "Gaetano Pyle"] 
}, 
{ 
"timestamp": 1436268859, 
"name": "Food Trucks: Circus Burgers", 
"desc": "Come enjoy lunch with some of your fellow coworkers. Meet at lobby at 11am to walk to the food truck!", 
"location": "North Creek Parkway", 
"category": "food", 
"time_from": 1436871600, 
"time_to": 1436875200, 
"guest_list": ["Xi Shu", "Lisa Tompa", "Gaetano Pyle"] 
}, 
{ 
"timestamp": 1436268859, 
"name": "Food Trucks: Circus Burgers", 
"desc": "Come enjoy lunch with some of your fellow coworkers. Meet at lobby at 11am to walk to the food truck!", 
"location": "North Creek Parkway", 
"category": "food", 
"time_from": 1436871600, 
"time_to": 1436875200, 
"guest_list": ["Xi Shu", "Lisa Tompa", "Gaetano Pyle"] 
}, 
{ 
"timestamp": 1436268859, 
"name": "Food Trucks: Circus Burgers", 
"desc": "Come enjoy lunch with some of your fellow coworkers. Meet at lobby at 11am to walk to the food truck!", 
"location": "North Creek Parkway", 
"category": "food", 
"time_from": 1436871600, 
"time_to": 1436875200, 
"guest_list": ["Xi Shu", "Lisa Tompa", "Gaetano Pyle"] 
}]; 
	$scope.getPosts = function(){
		return posts;
	};

});
// YO YO YO THIS IS WHERE YOUR GRID ENDS ------------------------------------------------------------------

app.config(function ($mdThemingProvider) {
    
    // Extend the red theme with a few different colors
    var vertaforeOrange = $mdThemingProvider.extendPalette('red', {
        '500': 'ff5200'
    });
    
    // Register the new color palette map with the name <code>neonRed</code>
    $mdThemingProvider.definePalette('vertaforeOrange', vertaforeOrange);

    $mdThemingProvider
    .theme('default')
    .primaryPalette('vertaforeOrange')
    .accentPalette('pink')
    .warnPalette('red')
})

// external js: isotope.pkgd.js

$(document).ready( function() {

  $('.grid').isotope({
  	layoutMode: 'fitRows',
    itemSelector: '.grid-item'
  });

});




