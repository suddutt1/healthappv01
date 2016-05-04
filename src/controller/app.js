var mainApp = angular.module('healthcareApp', [
  'ngRoute','ngMaterial','clientModule',
  'appControllers'
]);

mainApp.config(['$routeProvider',function($routeProvider){

	$routeProvider.
			when('/appLanding',
				{
						templateUrl: 'partials/applanding.html',
        				controller: 'appHomeController'
				}).
			when('/vendor',{
				templateUrl : 'partials/vendor/login.html',
				controller : 'vendorController'
			}).
			otherwise({

				redirectTo : '/appLanding'
			});
}]).factory('$$dataStore',function(){
	var dataStore = {};
	dataStore.appmessage = '';
	
	
	dataStore.setAppMessage  = function(msg){
		dataStore.appmessage  = msg;
	};
	dataStore.getAppMessage  = function(){
		return dataStore.appmessage ;
	};
	
	return dataStore;
}).factory('$$clientDataService',function(){
	var dummyStore = {};
	dummyStore.requests = [];
	dummyStore.createNewServiceRequest=function(clientId,locx,locy,serviceType,channel){
		var request = {};
		var date = new Date();
		request.status = 'N';
		request.remarks = [];
		request.remarks.push('Created ');
		request.type = serviceType;
		request.latitude = locx;
		request.longitude = locy;
		request.clientId = clientId;
		request.requestId= date.getTime();
		request.created  = date.getTime();
		request.updated = date.getTime();
		request.channel = channel;
		dummyStore.requests.push(request);
		return true;
	}
	dummyStore.getAllRequests= function(clientId){
		return dummyStore.requests ;
	}
	return dummyStore;

});