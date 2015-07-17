﻿var app = angular.module('StarterApp', ['ngMaterial']);

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
            var colors = ['#FF5200',"#00A3E0","#009917","#53565A", "#B90E2F", "#b388ff"];
            for (var i = 0; i < $scope.post_list.length; i++) {
				if($scope.post_list[i].imageURL != null){
					$scope.post_list[i].background = "url('"+ $scope.post_list[i].imageURL + "')"; //custom background
				}
				else{
					$scope.post_list[i].background = colors[$scope.post_list[i].category];
					console.log($scope.post_list[i].background);
				}
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
                    '<md-dialog flex="40" aria-label="Sample Dialog">' + //Submit a post pop up
					'	<md-toolbar>' +
					'		<div class="md-toolbar-tools md-actions" layout="horizontal">' +
                    '       	<md-input-container flex>' +
                    '           	<label>Post Title</label>' +
                    '           	<input ng-model="ctrl.new_post.name" md-maxlength="65">' +
                    '       	</md-input-container>' +
					'		</div> '+
					'	</md-toolbar>' +
                    '  <md-content>' +
                    '    <form name="userForm">' +
                    '       <md-input-container flex>' +
                    '           <label>Posted by</label>' +
                    '           <input ng-model="ctrl.new_post.author" md-maxlength="25">' +
                    '       </md-input-container>' +
                    '       <md-input-container flex>' +
                    '       <label>Decsription</label>' +
                    '       <textarea ng-model="ctrl.new_post.desc" columns="1" md-maxlength=""></textarea>' +
                    '       </md-input-container>' +
					'		<div class="md-padding"> '+
					'			<div>'+
					'				<div layout="row">' +  // ADUJUST CATEGORIES HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
					'					<pre><h2>Category:  </h2> </pre>' +
					'					<md-select ng-init="ctrl.new_post.category=5" ng-model="ctrl.new_post.category" >'+
					'						<md-option ng-value="0">Admin</md-option>'+
					'						<md-option ng-value="1">Recreation</md-option>'+
					'						<md-option ng-value="2">Ad</md-option>'+
					'						<md-option ng-value="3">Discussion</md-option>'+
					'						<md-option ng-value="4">Food</md-option>'+
					'						<md-option ng-value="5">Misc</md-option>'+
					'					</md-select>'+
                    '       			<md-input-container ng-init="ctrl.password = null" ng-if="ctrl.new_post.category==0" flex>' +
                    '           			<label>Password</label>' +
                    '           			<input type="text" ng-model="ctrl.password">' +
                    '       			</md-input-container>' +
					'				</div>'+
					'				<span ng-init="urlHidden = false" ng-click="urlHidden = !urlHidden">'+
					'          		<md-icon md-font-icon="fa-camera" class="fa s16 black class="md-raised"></md-icon> Insert image ' +
					'				</span>'+
                    '       		<md-input-container ng-show="urlHidden" flex>' +
                    '           		<label>URL</label>' +
                    '           		<input ng-model="ctrl.new_post.imageURL">' +
                    '       		</md-input-container>' +
					'			</div>'+
					'		</div>'+
                    '    </form>' +
                    '  <div layout-align="center"layout layout-sm="horizontal" flex>' +
                    '  <div class="md-actions" >' +
                    '    <md-button flex ng-click="closeDialog()">' +
                    '      Close' +
                    '    </md-button>' +
                    '  </div>' +
                    '  <div class="md-actions" >' +
                    '    <md-button flex ng-if="ctrl.new_post.category!=0 || ctrl.password == 1234" ng-click="ctrl.submitDialog();btn = true"'+
					'		ng-init="btn = false" ng-disabled="btn">' +
                    '      Submit' +
                    '    </md-button>' +
                    '  </div>' +
                    '  </div>' +
                    '</md-dialog>',
                locals: {
                    items: $scope.items,
                    new_post: $scope.new_post,
					password:$scope.password,
                    closeDialog: $scope.closeDialog,
                    submitDialog: $scope.submitDialog
                },
                bindToController: true,
                controllerAs: 'ctrl',
                controller: 'newPostDialogController'
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
                $scope.post_list.length = 0;
                $scope.post_list = data;
                // clear the form, allowing the user to send more messages
                $scope.new_post = {};
                console.log(data);
				var colors = ['#FF5200',"#00A3E0","#009917","#53565A", "#B90E2F", "#b388ff"];
				for (var i = 0; i < $scope.post_list.length; i++) {
					if($scope.post_list[i].imageURL != null){
						$scope.post_list[i].background = "url('"+ $scope.post_list[i].imageURL + "')"; //custom background
					}
					else{
						$scope.post_list[i].background = colors[$scope.post_list[i].category];
						console.log($scope.post_list[i].background);
					}
				}
					$mdDialog.hide();
				})
                .error(function (data) {
                console.log('Error: ' + data);
            });
        };
        
		$scope.chooseBackground = function chooseBackground(category,url){
			if(url == null){
				return 'rgba(0, 0, 0, 0.5)';
			}
			var colors = ['rgba(255, 82, 0,.8)', "rgba(0, 163, 224, .8)", "rgba(0, 153, 23, .8)",
				"rgba(83, 86, 90, .8)", "rgba(185, 14, 47, .8)", "rgba(179, 136, 255, .8)"];
			return colors[category];
        }

		
        $scope.confirmDelete = function confirmDelete(id) {
            var password = prompt("Delete Post?", "");
            $http.delete('api/posts?id=' + id + '&password=' + password).success(function (data) {
                $scope.post_list = data;
                $mdDialog.hide();
                console.log(data.length);
                var colors = ['#FF5200', "#00A3E0", "#009917", "#53565A", "#B90E2F", "#b388ff"];
                for (var i = 0; i < $scope.post_list.length; i++) {
                    if ($scope.post_list[i].imageURL != null) {
                        $scope.post_list[i].background = "url('" + $scope.post_list[i].imageURL + "')"; //custom background
                    }
                    else {
                        $scope.post_list[i].background = colors[$scope.post_list[i].category];
                        console.log($scope.post_list[i].background);
                    }
                }
            }).error(function (data) {
                console.log("ERROR" + data);
            });
        }
    }]);

app.controller('gridListDemoCtrl', function ($scope, $mdDialog) {
    this.tiles = [];
	
	$scope.showDialog = showDialog;
	$scope.name;
	$scope.background = function(background,desc){
		if(background != null){
			return background;
		}
		else{
			return ;
		}
	}
	function showDialog($event,name,desc,author,id,category,url) {
		var colors = ['#FF5200',"#00A3E0","#009917","#53565A", "#B90E2F", "#b388ff"];
		$scope.name = name;
		$scope.desc = desc;
		$scope.author = author;
		$scope.id = id;
		$scope.color = colors[category];
		$scope.url = url;

            var parentEl = angular.element(document.querySelector('md-content'));
            alert = $mdDialog.alert({
                parent: parentEl,
                targetEvent: $event,
                template:
                    '<md-dialog flex="40"aria-label="{{ctrl.name}}">' + //Pop up post
					'	<form> ' +
					'	<md-toolbar style="background-color:{{ctrl.color}}">' +
					'		<div class="md-toolbar-tools md-actions" layout="horizontal">' +
					'			<h2> {{ctrl.name}} </h2>' +
					'			<span flex></span>' +
                    '    		<md-button ng-click="ctrl.confirmDelete(ctrl.id)">' + //Delete post
                    '      			<md-icon md-font-icon="fa-edit" class="fa s16 white"></md-icon>' +
                    '    		</md-button>' +
					'		</div> '+
					'	</md-toolbar>' +
                    '  <md-dialog-content>' +
					'	<img src="{{ctrl.url}}" style="max-width:100%; margin-left:auto; margin-right:auto;display:block;"> <br>' +
                    '  <md-divider></md-divider>' +
					'	<font size="2"><i>Posted by:{{ctrl.author}}</i></font>'+
					'	 <h5><pre>{{ctrl.desc}}</pre></h5>' +
                    '    <md-list>' +
                    '    <md-subheader class="md-no-sticky">Comments</md-subheader>' +
                    '    <md-list-item class="md-3-line" ng-repeat="comment in comments">' +
                    '        <i class="fa fa-user md-avatar fa-3x"></i>' +
                    '        <div class="md-list-item-text">' +
                    '           <h4>{{comment.text}}</h4>' +
                    '           <p>{{comment.timestamp}}</p>' +
                    '        </div>' +
                    '    </md-list-item>' +
                    '    <md-divider ></md-divider>' +
                    '    <form layout="horizontal" flex>' +
                    '    <md-input-container flex>' +
                    '    <label>Comment</label>' +
                    '    <textarea flex ng-model="newComment.text" columns="1" md-maxlength="150"></textarea>' +
                    '    </md-input-container>' +
                    '    <md-button flex ng-click="submitComment()">' +
                    '      Submit' +
                    '    </md-button>' +
                    '    </form>' +
                    '    </md-list>' +  
					'  </md-dialog-content>' +
                    '  <div class="md-actions" >' +
                    '    <md-button flex ng-click="closeDialog()">' +
                    '      Close' +
                    '    </md-button>' +
                    '  </div>' +
                    '</md-dialog>',
                locals: {
                    confirmDelete: $scope.confirmDelete,
					name: $scope.name,
					desc: $scope.desc,
					author: $scope.author,
					color: $scope.color,
					url: $scope.url,
					id: $scope.id
                },
                bindToController: true,
                controllerAs: 'ctrl',
                controller: 'postDialogController'
            });
            
            $mdDialog
              .show(alert)
              .finally(function () {
                alert = undefined;
            });
    }
})

app.config(function ($mdIconProvider) {
    $mdIconProvider.iconSet("avatar", 'icons/avatar-icons.svg', 128);
});

app.controller('newPostDialogController', function ($http, $scope, $mdDialog, $rootScope) {
    //alert( this.closeDialog );
    //this.closeDialog = $scope.closeDialog;

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };
});

app.controller('postDialogController', function ($http, $scope, $mdDialog, $rootScope, id) {
    //alert( this.closeDialog );
    //this.closeDialog = $scope.closeDialog;
    
    console.log(id);
    
    $http.get('/api/comments?id=' + id).success(function (data) {
        $scope.comments = data;
    }).error(function (error, data) {
        console.log(error);
    });
    
    $scope.submitComment = function () {
        $scope.newComment.postId = id;
        $http.post('/api/comments', $scope.newComment).success(function (data) {
            $scope.newComment = {};
            $scope.comments = data;
        }).error(function (error, status, headers, config) {
            console.log(error + ', ' + status)
            
        });
    };
    
    $scope.closeDialog = function () {
        $mdDialog.hide();
    };
});


app.controller('myCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

// This grid is outdated ----------------------------------------------------------------------------
app.controller('myGrid', function($scope){
	$scope.getPosts = function(){
		return posts;
	};
});
// YO YO YO THIS IS WHERE YOUR (outdated)GRID ENDS ------------------------------------------------------------------

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
});

function profanityAlert() {
    alert('DO NOT POST PROFANE THINGS');
}