var clientModule = angular.module('clientModule', ['ngRoute','ngMaterial']);
clientModule.config(['$routeProvider',function($routeProvider){

	$routeProvider.
			when('/client/register',{

				templateUrl  : 'partials/client/register.html',
				controller : 'clientController'
			}).
			when('/client/registersucess',{

				templateUrl  : 'partials/client/home.html',
				controller : 'clientController'
			}).
			when('/client/viewallrequests',{
				templateUrl  : 'partials/client/viewallrequests.html',
				controller : 'clientController'
			}).
			when('/client/login',{
				templateUrl : 'partials/client/login.html',
				controller : 'clientController'
			}).
			when('/client/newRequest',{
				templateUrl : 'partials/client/newrequest.html',
				controller : 'clientController'
			}).
			when('/client/',{
				templateUrl : 'partials/client/home.html',
				controller : 'clientController'
			})
}]).controller('clientController',['$scope','$location','$$dataStore','$$clientDataService',
	function($scope,$location,$$dataStore,$$clientDataService){
		
		$scope.serviceTypeList = [];
		$scope.serviceTypeList.push({ code :'AMB',desc:'Ambulance'});
		$scope.serviceTypeList.push({ code :'MED',desc:'Medicine'});
		$scope.serviceTypeList.push({ code :'ASST',desc:'Medical Assistance'});	
		$scope.serviceTypeList.push({ code :'DOC',desc:'Doctor'});	
		$scope.message = $$dataStore.getAppMessage();
		console.log("LocationParameters :" + $location.search().page);
		if($location.search().page == 'viewAll')
		{
			$scope.requestList = $$clientDataService.getAllRequests('ABCDEF');
		}
		
		$scope.backToHome=function(){
			$location.url('/appLanding');
			console.log('backToHome');
		};
		
		$scope.register=function(){
			$location.url('/client/registersucess');
			console.log('Registration sucess');
		};
		$scope.newRequest=function(){
			$location.url('/client/newRequest');
			console.log('New request');
		};
		$scope.createNewRequest = function(){
			if($$clientDataService.createNewServiceRequest('ABCDEF',0,0,$scope.serviceType,'CUSTAPP'))
			{
				$$dataStore.setAppMessage('Request created');
			}
			else
			{
				$$dataStore.setAppMessage('Request creation failed');
			}
			$location.url('/client/');
			console.log('New request creation successfull');
		}
		$scope.backToClientHome = function(){
			$$dataStore.setAppMessage('');
			$location.url('/client/');
			console.log('Back to client home');
		}
		$scope.viewAllRequests = function(){
			$location.url('/client/viewallrequests?page=viewAll');
			console.log('Showing the all request list');
		}
	}]);