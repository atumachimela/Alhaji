'use strict';

angular.module('core').controller('HomeController', ['$scope','$http', '$mdToast', '$animate', '$modal', 'Authentication', 'Menus', '$compile', '$log', 'Translations',
	function($scope, $http, $mdToast, $animate, $modal, Authentication, Menus, $compile, $log, Translations) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		// $scope.hideMrk = true;

		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
		
		$scope.toggle = false;
		$scope.toggleMap = false;
		$scope.toggleClient = false;
		

		// Expose view variables
 
        $scope.toastPosition = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };
        $scope.getToastPosition = function () {
            return Object.keys($scope.toastPosition)
                .filter(function (pos) {
                    return $scope.toastPosition[pos];
                })
                .join(' ');
        };
 
        $scope.sendMail = function () {
 
            var mailData = ({
                contactName : this.contactName,
                contactEmail : this.contactEmail,
                contactMsg : this.contactMsg
            });
            // Simple POST request example (passing data) :
            $http.post('/sendmail', mailData).success(function(response) {
                    sendMail(mailData.contactName);
 					// mailData = '';
                }).error(function(response) {
                	sendMail(mailData.contactName);
                    $scope.error = response.message;
                });
        };
        
        //3. we decide where the toast will display on the view
            $scope.toastPosition = {
                bottom: false,
                top: true,
                left: false,
                right: true
            };
 
            //2. the method looks for the position that we want to display the toast
            $scope.getToastPosition = function() {
                return Object.keys($scope.toastPosition)
                    .filter(function(pos) { return $scope.toastPosition[pos]; })
                    .join(' ');
            };
 
            //1. The send button will call this method
            var sendMail = function(contactName) {
            	console.log('$mdToast.show');
                $mdToast.show(
                    $mdToast.simple()
                        .content('Thanks for your Message ' + contactName + ' You Rock!')
                        .position($scope.getToastPosition())
                        .hideDelay(3000)
                );
            };
		//Run translation if selected language changes

		$scope.translate = function(){
			console.log('testing');
	       Translations.getTranslation($scope, $scope.selectedLanguage);
		};   
			$scope.selectedLanguage = 'en';
			$scope.translate();	
	}
]);
