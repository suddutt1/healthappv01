var clientModule = angular.module('clientModule', ['ngRoute','ngMaterial']);
clientModule.config(['$routeProvider',function($routeProvider){

	$routeProvider
			when('/client/register',{

				templateUrl  : 'partials/client/register.html',
				controller : 'clientController'
			}).
			when('/client/login',{
				templateUrl : 'partials/client/login.html',
				controller : 'clientController'
			}).
			when('/client/',{
				templateUrl : 'partials/client/home.html',
				controller : 'clientController'
			}).
			otherwise({

				redirectTo : '/client/'
			});
}]);