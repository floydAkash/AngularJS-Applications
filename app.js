//Module
var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

    $scope.handle = '';

    $scope.isObject = angular.isObject;
    $scope.isDefined = angular.isDefined;

    $scope.lowercasehandle = function () {
        return $filter('lowercase')($scope.handle);
    };
	
	//Function to generate Lichess Username
	$scope.generateUserInfo = function(userName){
		//return angular.copy(handle);
		var userName = $scope.handle;
		console.log(userName);

	//HTTP resource to connect to Lichess API
	
	var url="http://en.lichess.org/api/user/"+userName+"?callback=JSON_CALLBACK";
    $http.jsonp(url)
        .success(function(result){
			console.log(result);
            $scope.userInfo = result;
			//console.log($scope.userInfo.online);
			
			if($scope.userInfo.online === false){
				$scope.userInfo.online = "Not online at the moment";
			}
			if($scope.userInfo.online === true){
				$scope.userInfo.online = "Currently online";
			}
			
			if($scope.userInfo.horde){
				$scope.userInfo.horde.rating = 'Unrated';
			}
				
        })
        .error( function(data, status){
            console.log(data);
        });
	
}		
}]);
