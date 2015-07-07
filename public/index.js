var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', '$mdDialog', function ($scope, $mdSidenav, $mdDialog) {
        var alert;
        $scope.showDialog = showDialog;
        $scope.items = [1, 2, 3];    
        

        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        function showDialog($event) {
            var parentEl = angular.element(document.querySelector('md-content'));
            alert = $mdDialog.alert({
                parent: parentEl,
                targetEvent: $event,
                template:
                    '<md-dialog aria-label="Sample Dialog">' +
                    '  <md-content>' +
                    '    <form name="userForm">' +
                    '       <md-input-container flex>' +
                    '           <label>Event Name</label>' +
                    '           <input ng-model="user.address">' +
                    '       </md-input-container>' +
                    '       <md-input-container flex>' +
                    '       <label>Decsription</label>' +
                    '       <textarea ng-model="new_event.description" columns="1" md-maxlength="300"></textarea>' +
                    '       </md-input-container>' +
                    '       <md-input-container flex>' +
                    '           <label>Start Time</label>' +
                    '           <input ng-model="user.address">' +
                    '       </md-input-container>' +
                    '       <md-input-container flex>' +
                    '           <label>End Time</label>' +
                    '           <input ng-model="user.address">' +
                    '       </md-input-container>' +
                    '       <md-input-container flex>' +
                    '           <label>Location</label>' +
                    '           <input ng-model="user.address">' +
                    '       </md-input-container>' +
                    '       <md-input-container flex>' +
                    '           <label>Category</label>' +
                    '           <input ng-model="user.address">' +
                    '       </md-input-container>' +
                    '       <md-input-container flex>' +
                    '           <label>Author</label>' +
                    '           <input ng-model="user.address">' +
                    '       </md-input-container>' +
                    '    </form>' +
                    '  </md-content>' +
                    '  <div class="md-actions">' +
                    '    <md-button ng-click="ctrl.closeDialog()">' +
                    '      Close Greeting' +
                    '    </md-button>' +
                    '  </div>' +
                    '</md-dialog>',
                locals: {
                    items: $scope.items,
                    closeDialog: $scope.closeDialog
                },
                bindToController: true,
                controllerAs: 'ctrl',
                controller: 'DialogController'
            });
            
            $mdDialog
              .show(alert)
              .finally(function () {
                alert = undefined;
            });
        }

        $scope.closeDialog = function () {
            $mdDialog.hide();
        };
 
    }]);

app.controller('DialogController', function ($scope, $mdDialog) {
    //alert( this.closeDialog );
    //this.closeDialog = $scope.closeDialog;

    /*$scope.closeDialog = function() {
      $mdDialog.hide();
    };*/
});

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
