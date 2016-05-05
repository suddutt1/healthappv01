var appControllers = angular.module('appControllers',[]);

appControllers.controller('appHomeController',['$scope','$location',
	function($scope,$location){
		$scope.clientRegistration=function(){
			$location.url('client/register')
			console.log('Going to client registration page');
		} ;
		$scope.clientLogin=function(){
			$location.url('client/login');
			console.log('Going to client log in page');
		} ;
		

	}]);

appControllers.controller('vendorController',['$scope',
	function($scope){


	}]);
