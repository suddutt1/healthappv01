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
}]).controller('clientController',['$scope','$location','$http','$$dataStore',
	function($scope,$location,$http,$$dataStore){
		
		$scope.serviceTypeList = [];
		$scope.serviceTypeList.push({ code :'AMB',desc:'Ambulance'});
		$scope.serviceTypeList.push({ code :'MED',desc:'Medicine'});
		$scope.serviceTypeList.push({ code :'ASST',desc:'Medical Assistance'});	
		$scope.serviceTypeList.push({ code :'DOC',desc:'Doctor'});	
		$scope.message = $$dataStore.getAppMessage();
		var clientDetails = $$dataStore.getAttribute('_clientDetails');
		if(clientDetails!=null)
		{
				$scope.client = clientDetails;
		}
		
		console.log("LocationParameters :" + $location.search().page);
		
		var currentPage = $location.search().page ;
		if(currentPage === 'viewAll')
		{
			if(clientDetails!=null)
			{
				var getRequest = {
				url : __END_POINT__+'customer/service/serviceRequest/'+clientDetails.clientId ,
				method : 'GET',
				headers: {
							'authorization': 'Basic testAuth',
							'content-type': 'application/json'
						},
				
			};
			$http(getRequest).then(function(response){
						console.log("Service Request List");
						console.log(response);
						if(response.data.success === true)
						{
							$scope.requestList = response.data.result;
						}
						
					},function(err){
						console.log("Registration error result"+ err);
						//Alert that registration failed
				}); 
			}
			//$scope.requestList = $$clientDataService.getAllRequests('ABCDEF');
		}
		else if(currentPage === 'home')
		{
			
			var clientDetails = $$dataStore.getAttribute('_clientDetails');
			if(clientDetails==null)
			{
					$location.url('/client/login');
			}
		}
		
		$scope.backToHome=function(){
			$location.url('/appLanding');
			console.log('backToHome');
		};
		
		$scope.register=function(){
			//Add the user to the storage
			var clientDetails = {}; 
			clientDetails.email = $scope.email;
			clientDetails.phoneNumber = $scope.phone ;
			clientDetails.age  = $scope.age,
			clientDetails.address = $scope.address,
			clientDetails.password = $scope.password,
			clientDetails.name = $scope.name;
			var postRequest = {
				url : __END_POINT__+'customer/service/register' ,
				method : 'POST',
				headers: {
							'authorization': 'Basic testAuth',
							'content-type': 'application/json'
						},
				data : clientDetails
			};
			$http(postRequest).then(function(response){
						console.log("Registration  result");
						console.log(response);
						$$dataStore.setAttribute('_clientDetails',clientDetails);
						$location.url('/client/login');
					},function(err){
						console.log("Registration error result"+ err);
						//Alert that registration failed
				}); 	
		};
		$scope.newRequest=function(){
			$location.url('/client/newRequest');
			console.log('New request');
		};
		$scope.createNewRequest = function(){
			var clientDetails = $$dataStore.getAttribute('_clientDetails');
			if(clientDetails!=null)
			{
				var request = {};
				request.type = $scope.serviceType;
				request.latitude = 0;
				request.longitude = 0;
				request.clientId = clientDetails.clientId;
				request.channel = 'MOBILE';
				
				var postRequest = {
					url : __END_POINT__+'customer/service/serviceRequest' ,
					method : 'POST',
					headers: {
								'authorization': 'Basic testAuth',
								'content-type': 'application/json'
							},
					data : request
				};
				$http(postRequest).then(function(response){
						console.log("Service Request creation result");
						console.log(response);
						if(response.data.success === true)
						{
							$$dataStore.setAppMessage('Request created successfully');
						}
						else
						{
							$$dataStore.setAppMessage('Request could not be created');
						}
						$location.url('/client/?page=home') ;
					},function(err){
						console.log("Registration error result"+ err);
						//Alert that registration failed
				});
				
				
				
			}
			else
			{
				alert('You are logged out. Please login again');
			}
			
			
		}
		$scope.backToClientHome = function(){
			$$dataStore.setAppMessage('');
			$location.url('/client/?page=home');
			console.log('Back to client home');
		}
		$scope.viewAllRequests = function(){
			$location.url('/client/viewallrequests?page=viewAll');
			console.log('Showing the all request list');
		}
		//$scope.
		$scope.validateLogin = function()
		{
			var formData = { 'email': $scope.email, 'password' : $scope.password};
			var postRequest = {
			url : __END_POINT__+'customer/service/validate' ,
			method : 'POST',
			headers: {
                        'authorization': 'Basic testAuth',
                        'content-type': 'application/x-www-form-urlencoded'
                    },
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},					
			data : formData
			};
		
			$http(postRequest).then(function(response){
					console.log("Validation  result");
					console.log(response);
					if(response.data.success === true)
					{
						var clientDetails = response.data.result;
						$$dataStore.setAttribute('_clientDetails',clientDetails);
						$location.url('/client/?page=home');
						console.log('Login success');
					}
					
				},function(err){
					console.log("Validation error message"+ err);
					//Alert that registration failed
					alert('Error is communicating to server');
			});
			
		}
	}]);