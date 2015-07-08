var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$http', '$scope', '$mdSidenav', '$mdDialog', function ($http, $scope, $mdSidenav, $mdDialog) {
        var alert;
        var new_post;
        $scope.showDialog = showDialog;
        $scope.items = [1, 2, 3];
        $scope.new_post = {};
        
        $http.get('/api/posts')
        .success(function (data) {
            $scope.post_list = data;
            
            console.log(data.length);
            var colors = ["red","blue","green","gray", "orange"];
            for (var i = 0; i < $scope.post_list.length; i++) {
                $scope.post_list[i].background = colors[Math.floor((Math.random() * colors.length))];
                console.log($scope.post_list[i].background);
            }
			/*for(i in data){
				console.log(i);
				i.timestamp = new Date(parseInt(data.timestamp));
			}
            console.log(data);*/
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };
        
        $scope.$on('posted', function (event, args) { 
            console.log('broadcast recieved');
            $http.get('/api/posts')
            .success(function (data) {
                $scope.post_list = data;
			    /*for(i in data){
				    console.log(i);
				    i.timestamp = new Date(parseInt(data.timestamp));
			    }
                console.log(data);*/
                })
        });

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
                    '           <label>Post Title</label>' +
                    '           <input ng-model="ctrl.new_post.name">' +
                    '       </md-input-container>' +
                    '       <md-input-container flex>' +
                    '       <label>Decsription</label>' +
                    '       <textarea ng-model="ctrl.new_post.desc" columns="1" md-maxlength="300"></textarea>' +
                    '       </md-input-container>' +
                    '    </form>' +
                    '  <div layout layout-sm="column" flex>' +
                    '  <div class="md-actions" >' +
                    '    <md-button flex ng-click="ctrl.submitDialog()">' +
                    '      Submit' +
                    '    </md-button>' +
                    '  </div>' +
                    '  <div class="md-actions" >' +
                    '    <md-button flex ng-click="closeDialog()">' +
                    '      Close Greeting' +
                    '    </md-button>' +
                    '  </div>' +
                    '  </div>' +
                    '</md-dialog>',
                locals: {
                    items: $scope.items,
                    new_post: $scope.new_post,
                    closeDialog: $scope.closeDialog,
                    submitDialog: $scope.submitDialog
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

        $scope.submitDialog = function () {
            console.log('submit pressed!');
            console.log($scope.new_post);
            $http.post('/api/posts', $scope.new_post)
                .success(function (data) {
                // clear the form, allowing the user to send more messages
                $scope.new_post = {};
                $scope.post_list = [];
                $scope.post_list = data;
                console.log(data);
                var colors = ["red","blue","green","gray", "orange"];
                for (var i = 0; i < $scope.post_list.length; i++) {
                    $scope.post_list[i].background = colors[Math.floor((Math.random() * colors.length))];
                    console.log($scope.post_list[i].background);
                }
                $mdDialog.hide();
            })
                .error(function (data) {
                console.log('Error: ' + data);
            });
        };
        
 
    }]);

app.controller('gridListDemoCtrl', function ($scope) {
    this.tiles = buildGridModel({
        icon : "avatar:svg-",
        title: "Svg-",
        background: ""
    });
    function buildGridModel(tileTmpl) {
        var it, results = [];
        for (var j = 0; j < 11; j++) {
            it = angular.extend({}, tileTmpl);
            it.icon = it.icon + (j + 1);
            it.title = it.title + (j + 1);
            it.span = { row : 1, col : 1 };
            switch (j + 1) {
                case 1:
                    it.background = "red";
                    it.span.row = it.span.col = 2;
                    break;
                case 2: it.background = "green"; break;
                case 3: it.background = "darkBlue"; break;
                case 4:
                    it.background = "blue";
                    it.span.col = 2;
                    break;
                case 5:
                    it.background = "yellow";
                    it.span.row = it.span.col = 2;
                    break;
                case 6: it.background = "pink"; break;
                case 7: it.background = "darkBlue"; break;
                case 8: it.background = "purple"; break;
                case 9: it.background = "deepBlue"; break;
                case 10: it.background = "lightPurple"; break;
                case 11: it.background = "yellow"; break;
            }
            results.push(it);
        }
        return results;
    }
	
})

app.config(function ($mdIconProvider) {
    $mdIconProvider.iconSet("avatar", 'icons/avatar-icons.svg', 128);
});
app.controller('DialogController', function ($http, $scope, $mdDialog) {
    //alert( this.closeDialog );
    //this.closeDialog = $scope.closeDialog;

    $scope.closeDialog = function() {
      $mdDialog.hide();
    };
});

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
    .accentPalette('vertaforeOrange')
    .warnPalette('red')
})

// external js: isotope.pkgd.js

$(document).ready( function() {

  $('.grid').isotope({
  	layoutMode: 'fitRows',
    itemSelector: '.grid-item'
  });

});




