'use strict';

var app = angular.module('WorkRequest',['ui.router','ngAnimate']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {

	
	
}]);

app.controller('Ctrl', ['$scope','$http','$timeout', function($scope,$http,$timeout){

	window.scope = $scope;
	
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



		
		angular.forEach(['stage1','stage2','stage3'],function(value,key){
			
			$scope.$watch('request_form.'+value+'.$valid',function(){

				if ($scope.request_form[value].$valid) {
					$('.progress-bar.'+value).css('width','33.3%');
				}else{
					$('.progress-bar.'+value).css('width','0');
				};
				
			});


		});



	},100);




	
	


	
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