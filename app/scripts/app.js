'use strict';

var app = angular.module('WorkRequest',['ui.router','ngAnimate']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {

	
	
}]);

app.controller('Ctrl', ['$scope','$http','$timeout', function($scope,$http,$timeout){



	window.scope = $scope;

	// //the checkboxes are not checked by default
	// $scope.notChecked = true;
	// $scope.selectOne = function(){

	// 	if($('.selectOne input[type="checkbox"]').is(":checked")){
	// 		//if the checkbox is checked sent notChecked to false
	// 		$scope.notChecked  = false;
	// 	}else{
	// 		//else if they are not set notChecked to true
	// 		$scope.notChecked = true;
	// 	}

	// };
	
	// Timeout so that swiper loads after angular has rendered all templates
	$timeout(function(){

		//Initialize the swiper
		window.mySwiper = new Swiper('.swiper-container',{
			grabCursor: true,
			onFirstInit : function(){
				
			},
			onTouchStart :function(){

				var stage = mySwiper.activeSlide().id;

				//check if the active stage of the form is valid
				if ($scope.request_form[stage].$invalid) {

					mySwiper.params.swipeToNext = false;

				}else{

					mySwiper.params.swipeToNext = true;

				}
			},
			onSlideNext: function(){
				var prevSlide = $('.swiper-slide-active').prev().attr('id');
				$('.progress-bar.'+prevSlide).css('width','33.3%');
				$('.arrow-right ').removeClass('pulse');
			},
			onSlidePrev: function(){
				var activeSlide = $('.swiper-slide-active').attr('id');
				$('.progress-bar.'+activeSlide).css('width','0');
			},
			onSlideChangeStart : function(){
				var stage = mySwiper.activeSlide().id;

				if ($scope.request_form[stage].$valid) {
					$('.arrow-right ').addClass('pulse');
				}else{
					$('.arrow-right ').removeClass('pulse');
				};

				$('.point').removeClass('active');

				var stageNum = stage[5];

				// console.log(stageNum);

				$('.point'+stageNum).addClass('active');
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

			validateForm();

			var activeSlide = mySwiper.activeSlide().id;

			if(scope.request_form[activeSlide].$valid){
				mySwiper.swipeNext();
			}

			
		});


		$scope.selectOne = function(e){
			console.log(e);
		}

		var validateForm = function(){

			var stage = mySwiper.activeSlide().id;

			console.log(stage);

			var stageObj = $scope.request_form[stage];

			console.log(stageObj);

			for(var key in stageObj){

				// console.log(key);

				if ($scope.request_form[stage][key] && $scope.request_form[stage][key].hasOwnProperty && $scope.request_form[stage][key].hasOwnProperty('$dirty')) {

					$scope.request_form[stage].$setDirty();

					$scope.request_form[stage][key].$dirty = true;

					$scope.$apply();
				};

			}

		}



		// loop through each stage of the form, if the stage is valid animate progress bar to complete else do the opposite
		angular.forEach(['stage1','stage2','stage3'],function(value,key){
			
			$scope.$watch('request_form.'+value+'.$valid',function(){

				if ($scope.request_form[value].$valid) {
					$('.arrow-right ').addClass('pulse');
				}else{
					$('.arrow-right ').removeClass('pulse');
				};
				
			});


		});



	},150);




	 // var isFormValid = function ($scope, ngForm) {
	 //      var i = null;
	 //      //$scope.$emit('$validate');
	 //      $scope.$broadcast('$validate');
	      
	 //      if(! ngForm.$invalid) {
	 //        return true;
	 //      } else {
	 //        // make the form fields '$dirty' so that the validation messages would be shown
	 //        ngForm.$dirty = true;
	        
	 //        for(i in ngForm) {
	 //          if(ngForm[i] && ngForm[i].hasOwnProperty && ngForm[i].hasOwnProperty('$dirty')) { // TODO: is 'field.$invalid' test required?
	 //            ngForm[i].$dirty = true;
	 //          }
	 //        }
	 //      }
	


	
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