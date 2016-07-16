'use strict';
var app = angular.module("TestApp", []);

//main controller for form
app.controller('FormCtrl', ['$scope', function($scope) {

	//validate matching passwords
	$scope.validatePassword = function (myForm) {
		myForm.password.$setValidity('passwordsMatch', $scope.password === $scope.confirm_password);
	}
}]);