var appControllers = angular.module('appControllers',[]);

appControllers.controller('appHomeController',['$scope','$location',
	function($scope,$location){
		$scope.clientRegistration=function(){
			$location.url('client/register')
			console.log('Test');
		} ;
		

	}]);

appControllers.controller('vendorController',['$scope',
	function($scope){


	}]);
