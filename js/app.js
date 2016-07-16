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

	$scope.validateBirthdate = function (myForm) {
		var date = new Date($scope.birthdate);
		var today = new Date();
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		var minYear = today.getFullYear() - 13;
		var minMonth = today.getMonth();
		var minDay = today.getDate();
		
		function monthDay() {
			if(month < 0 || month > 11){
				return false
			}
			var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			
			if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)){ // Adjust for leap years
				monthLength[1] = 29;
			}
			return day > 0 && day <= monthLength[month]; // Check the range of the days for the month
		}
		function minimumYear() {
			if(year > minYear){
				return false;
			}
			if(year == minYear){ // Check when born in the minimum year to be 13
				if(month == minMonth){
					if(day > minDay){
						return false;
					}
				}else if(month > minMonth){
					return false;
				}
			}
			return true;
		}
		function maximumYear(){ // Based on oldest living person at time program created (July 2016)
			var maxYear = 1899; 
			var maxMonth = 10; //November
			var maxDay = 29;

			if(year < maxYear){
				return false;
			}
			if(year == maxYear){ 
				if(month == minMonth){
					if(day < minDay){
						return false;
					}
				}else if(month < minMonth){
					return false;
				}
			}
			return true;
		}

		//All of the birthday checks
		myForm.birthdate.$setValidity('validDate', monthDay() === true);
		myForm.birthdate.$setValidity('minYear', minimumYear() === true);
		myForm.birthdate.$setValidity('maxYear', maximumYear() === true);
	}
}]);