var mainApp = angular.module('healthcareApp', [
  'ngRoute','ngMaterial',
  'appControllers'
]);

mainApp.config(['$routeProvider',function($routeProvider){

	$routeProvider.
			when('/appLanding',
				{
						templateUrl: 'partials/applanding.html',
        				controller: 'appHomeController'
				}).
			when('/client/register',{

				templateUrl  : 'partials/client/register.html',
				controller : 'clientController'
			}).
			when('/vendor',{
				templateUrl : 'partials/vendor/login.html',
				controller : 'vendorController'
			}).
			otherwise({

				redirectTo : '/appLanding'
			});
}]);