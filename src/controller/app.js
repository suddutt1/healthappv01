var __END_POINT__ = "http://healthappwsv0.mybluemix.net/";
var mainApp = angular.module('healthcareApp', [
  'ngRoute','ngMaterial','clientModule','vendorModule',
  'appControllers'
]);

mainApp.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){

		//$httpProvider.defaults.useXDomain = true;
		//delete $httpProvider.defaults.headers.common['X-Requested-With'];
        
	$routeProvider.
			when('/appLanding',
				{
						templateUrl: 'partials/applanding.html',
        				controller: 'appHomeController'
				}).
			otherwise({

				redirectTo : '/appLanding'
			});
}]).factory('$$dataStore',function(){
	var dataStore = {};
	dataStore.appmessage = '';
	dataStore.session = {};
	
	dataStore.setAttribute = function(key,obj){
		dataStore.session[key] = obj;
	};
	dataStore.getAttribute = function(key){
		return dataStore.session[key];
	};
	dataStore.setAppMessage  = function(msg){
		dataStore.appmessage  = msg;
	};
	dataStore.getAppMessage  = function(){
		return dataStore.appmessage ;
	};
	
	return dataStore;
});