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

		$('.help-icon').tooltip();

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
				$scope.stage = mySwiper.activeSlide().id;

				if ($scope.request_form[$scope.stage].$valid && $scope.stage != 'stage4') {
					$('.arrow-right ').addClass('pulse');
				}else{
					$('.arrow-right ').removeClass('pulse');
				};


				$scope.stageNum = Number($scope.stage[5]);

				$scope.$apply();

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




		$scope.result = 'hidden';
	    $scope.resultMessage;
	    
	    
	    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
	    $scope.submit = function() {
	    	// alert('submitted');
	        $scope.submitted = true;
	        $scope.submitButtonDisabled = true;
	        if ($scope.request_form.$valid) {
	        	// alert('valid form');
	            $http({
	                method  : 'POST',
	                url     : 'phpmailer/contact-form.php',
	                data    : $.param($scope.form),  //param method from jQuery
	                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
	            }).success(function(data){
	                console.log(data);
	     
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';

	            });
	        } else {
	        	alert('invalid form');
	            $scope.submitButtonDisabled = false;
	            $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
	            $scope.result='bg-danger';
	        }
	    }



	},150);

	
}]);




app.directive('tooltip', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

			$timeout(function(){
				$('.help-icon').tooltip();
			},100)

        }
    };
}); 