'use strict';

var app = angular.module('WorkRequest',['ui.router','ngAnimate']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {

	
	
}]);

app.controller('Ctrl', ['$scope','$http','$timeout', function($scope,$http,$timeout){



	window.scope = $scope;


	//the checkboxes are not checked by default
	$scope.notChecked = true;
	$scope.selectOne = function(){

		if($('.selectOne input[type="checkbox"]').is(":checked")){
			//if the checkbox is checked sent notChecked to false
			$scope.notChecked  = false;
		}else{
			//else if they are not set notChecked to true
			$scope.notChecked = true;
		}

	};
	
	// Timeout so that swiper loads after angular has rendered all templates
	$timeout(function(){

		//Initialize the swiper
		window.mySwiper = new Swiper('.swiper-container',{
			grabCursor: true,
			onTouchStart :function(){

					var stage = mySwiper.activeSlide().id;

					//check if the active stage of the form is valid
					if ($scope.request_form[stage].$invalid) {
						
						console.log('invalid');
						mySwiper.params.swipeToNext = false;

					} else{

						console.log('valid');
						mySwiper.params.swipeToNext = true;

					}
				}
		});


		//click for left arrow
		$('.arrow-left').on('click', function(e){
			e.preventDefault();
			mySwiper.swipePrev();
		});
		//click for right arrow
		$('.arrow-right').on('click', function(e){
			e.preventDefault();
			mySwiper.swipeNext();
		});



		// loop through each stage of the form, if the stage is valid animate progress bar to complete else do the opposite
		angular.forEach(['stage1','stage2','stage3'],function(value,key){
			
			$scope.$watch('request_form.'+value+'.$valid',function(){

				if ($scope.request_form[value].$valid) {
					$('.progress-bar.'+value).css('width','33.3%');
				}else{
					$('.progress-bar.'+value).css('width','0');
				};
				
			});


		});



	},150);




	
	


	
}]);


// app.directive('swiper', ['swiper', function(){
// 	// Runs during compile
// 	return {
// 		 name: 'swiper',
// 		// priority: 1,
// 		// terminal: true,
// 		// scope: {}, // {} = isolate, true = child, false/undefined = no change
// 		// controller: function($scope, $element, $attrs, $transclude) {},
// 		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
// 		 restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
// 		// template: '',
// 		// templateUrl: '',
// 		// replace: true,
// 		// transclude: true,
// 		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
// 		link: function(scope, elem, attrs) {
// 			alert('hello');
// 		}
// 	};
// }]);


// app.directive('swiper', function() {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {


// 			var mySwiper = new Swiper('.swiper-container',{ 
// 				grabCursor: true
// 			});

			

//         }
//     };
// }); 