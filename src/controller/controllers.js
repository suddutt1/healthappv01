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
		$scope.vendorLogin=function(){
			$location.url('vendor/login');
			console.log('Going to vendor log in page');
		};

	}]);

