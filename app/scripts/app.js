'use strict';

var app = angular.module('WorkRequest',['ui.router','ngAnimate']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {

	
	
}]);

app.controller('Ctrl', ['$scope','$http','$timeout', function($scope,$http,$timeout){



	window.scope = $scope;

	// create this object so that the form scope can be accessed in the controller - models need to be form.modelName
	$scope.form = {};


	
	// Timeout so that swiper loads after angular has rendered all templates
	$timeout(function(){

		//Initialize the swiper
		window.mySwiper = new Swiper('.swiper-container',{
			swipeToNext: false,
			swipeToPrev : false,
			grabCursor: false,
			onFirstInit : function(){
				
			},
			// onTouchStart :function(){

			// 	var stage = mySwiper.activeSlide().id;

			// 	//check if the active stage of the form is valid
			// 	if ($scope.request_form[stage].$invalid) {

			// 		mySwiper.params.swipeToNext = false;

			// 	}else{

			// 		mySwiper.params.swipeToNext = true;

			// 	}
			// },
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

				if ($scope.request_form[stage].$valid && stage != 'stage4') {
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

			if (!$scope.submitted) {
				mySwiper.swipePrev();
			};
			
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

		//set the form to dirty so that the validation errors can be shown
		var validateForm = function(){

			// find out  the active slide
			var stage = mySwiper.activeSlide().id;

			console.log(stage);


			// access the object for the stage of the current form
			var stageObj = $scope.request_form[stage];

			console.log(stageObj);


			// set the current form to dirty
			$scope.request_form[stage].$setDirty();

			//loop through the fields in the form and set them to dirty
			for(var key in stageObj){

				// console.log(key);

				if ($scope.request_form[stage][key] && $scope.request_form[stage][key].hasOwnProperty && $scope.request_form[stage][key].hasOwnProperty('$dirty')) {

					$scope.request_form[stage][key].$dirty = true;

					$scope.$apply();
				};

			}

		}



		// loop through each stage of the form, if the stage is valid add pulse class to the next arrow
		angular.forEach(['stage1','stage2','stage3'],function(value,key){
			
			// a watch for each stage of the form object's valid property
			$scope.$watch('request_form.'+value+'.$valid',function(){

				if ($scope.request_form[value].$valid && $scope.request_form[value]) {
					$('.arrow-right ').addClass('pulse');
				}else{
					$('.arrow-right ').removeClass('pulse');
				};
				
			});


		});



		$scope.submitMyForm = function(){

			if (!$scope.submitted) {
				$scope.submitted = true;

			};

		}


		$scope.result = 'hidden';
	    $scope.resultMessage;
	    
	    
	    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
	    $scope.submit = function() {
	    	alert('submitted');
	        $scope.submitted = true;
	        $scope.submitButtonDisabled = true;
	        if ($scope.request_form.$valid) {
	        	alert('valid form');
	            $http({
	                method  : 'POST',
	                url     : '/phpmailer/contact-form.php',
	                data    : $.param($scope.form),  //param method from jQuery
	                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
	            }).success(function(data){
	                console.log(data);
	                if (data.success) { //success comes from the return json object
	                    $scope.submitButtonDisabled = true;
	                    $scope.resultMessage = data.message;
	                    $scope.result='bg-success';
	                } else {
	                    $scope.submitButtonDisabled = false;
	                    $scope.resultMessage = data.message;
	                    $scope.result='bg-danger';
	                }
	            });
	        } else {
	        	alert('invalid form');
	            $scope.submitButtonDisabled = false;
	            $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
	            $scope.result='bg-danger';
	        }
	    }



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