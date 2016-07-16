'use strict';
var app = angular.module("TestApp", []);

//main controller for form
app.controller('FormCtrl', ['$scope', function($scope) {
	$scope.visible = false;
	$scope.showHide = function() {
		$scope.visible = $scope.visible ? false : true;
	}
	//validate matching passwords
	$scope.validatePassword = function (myForm) {
		myForm.password.$setValidity('passwordsMatch', $scope.password === $scope.confirm_password);
	}

}]);