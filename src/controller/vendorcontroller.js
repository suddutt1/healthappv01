
var vendorModule = angular.module('vendorModule', ['ngRoute','ngMaterial']);
vendorModule

vendorModule.config(['$routeProvider',function($routeProvider){

	$routeProvider.
			when('/vendor/login',{

				templateUrl  : 'partials/vendor/login.html',
				controller : 'vendorController'
			}).
			when('/vendor/',{
				templateUrl : 'partials/vendor/home.html',
				controller : 'vendorController'
			})
}]).controller('vendorController',['$scope','$location','$http','$$dataStore',
	function($scope,$location,$http,$$dataStore){
		$scope.vendorTypesList = [];
		$scope.vendorTypesList.push({code:'AMB',desc:'Ambulance Vendor'});
		$scope.vendorTypesList.push({code:'MR',desc:'Medical Responder'});
		$scope.vendorTypesList.push({code:'HOSP',desc:'Hospital'});
		$scope.vendorTypesList.push({code:'DOC',desc:'Doctors on call'});
		//$scope.vendorType = {code:'MR',desc:'Medical Responder'};
		$scope.vendorType = $$dataStore.getAttribute('_vendorType');
		//This is a conditional execution based on required input
		//TODO: Need to improve the logic here
		var currentPage = $location.search().page ;
		if(currentPage === 'home')
		{
			if($scope.vendorType != null)
			{
				//Get the data to show in the home page
				console.log("For data retrieval")
				var getRequest = {
				url : __END_POINT__+'vendor/service/requests/assigned/'+$scope.vendorType ,
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
						alert("Error in server commuication");
						console.log("Error in communicating to server"+ err);
						//Alert that registration failed
				});
			}
		}


		$scope.backToAppLanding = function()
		{
			$$dataStore.setAttribute('_vendorType',null);
			$location.url('/appLanding');
			conole.log("Back to Application Landing page")
		};
		$scope.backToLogin = function()
		{
			$$dataStore.setAttribute('_vendorType',null);
			$location.url('/vendor/login');

		}
		$scope.validateLogin = function()
		{
			//TODO: I need to call the back end to verify .
			//As of now hardcoded values are used.
			if($scope.email=== 'test' && $scope.password === 'shh')
			{
				$$dataStore.setAttribute('_vendorType', $scope.vendorType);

				$location.url('/vendor/?page=home');
				console.log('Redirecting to vendor home page'+ $scope.vendorType);
			}
			else
			{
				alert("Invalid credential: Enter email as test and password as shh.");
			}
		}

	}
]);