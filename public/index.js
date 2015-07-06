var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };
 
    }]);


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
