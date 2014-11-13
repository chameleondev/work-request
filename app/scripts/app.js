'use strict';

var app = angular.module('WorkRequest',['ui.router','ngAnimate']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {

	
	
}]);

app.controller('Ctrl', ['$scope','$http','$timeout', function($scope,$http,$timeout){



	window.scope = $scope;

	// create this object so that the form scope can be accessed in the controller - models need to be form.modelName
	$scope.form = {};

	$scope.$on('$routeChangeSuccess', function () {
	  alert('changed');
	});

	// // when the template content is loaded initiate fullpage.js, as there are 4 templates we need a counter to evaluate when all 4 have been loaded
	// var counter = 0;
	// $scope.$on('$includeContentLoaded', function (event) {

	// 	counter++;

	// 	console.log('another include was loaded'+counter);

	// 	if (counter === 4) {

	// 		$mySwiper.reInit();

	// 		// loop through each stage of the form, if the stage is valid add pulse class to the next arrow
	// 		angular.forEach(['stage1','stage2','stage3'],function(value,key){
				
	// 			// a watch for each stage of the form object's valid property
	// 			$scope.$watch('request_form.'+value+'.$valid',function(){

	// 				if ($scope.request_form[value].$valid && $scope.request_form[value]) {
	// 					$('.arrow-right ').addClass('pulse');
	// 				}else{
	// 					$('.arrow-right ').removeClass('pulse');
	// 				};
					
	// 			});


	// 		});
	// 	};

	// });


	
}]);




app.directive('tooltip', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

			element.tooltip();
			

        }
    };
});



app.directive('datePicker', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

			element.datepicker({format : 'dd-mm-yyyy',})
				.on('changeDate',function(ev){


					// get the property of the form object
					var val = element.attr('ng-model').slice(5);


					// apply the changes to the scope
					scope.$apply(function(){
						// set the value of the property
						scope.form[val] = ev.target.value;
					});

					element.datepicker('hide');
				
				})

        }
    };
}); 


app.directive('swiper', function($timeout,$http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

        	// wait for all ng-includes to load
        	var counter = 0;
        	scope.$on('$includeContentLoaded', function (event) {

        			counter++;

					console.log('another include was loaded'+counter);
					// four ng-includes to load
					if (counter === 4) {

						//initialize the swiper plugin
		        		var mySwiper = element.swiper({
							swipeToNext: false,
							swipeToPrev : false,
							grabCursor: false,
							onSlideNext: function(){

								//will return the stage of the prev slide from the id
								var prevSlide = $('.swiper-slide-active').prev().attr('id');
								// uses the prevSlide to select class for the relative progressBar, animates with css 
								$('.progress-bar.'+prevSlide).css('width','33.3%');
								//remove the pulsing on the arrow
								$('.arrow-right ').removeClass('pulse');

							},
							onSlidePrev: function(){

								//will return the stage of the active slide from the id
								var activeSlide = $('.swiper-slide-active').attr('id');
								//animate progress bar
								$('.progress-bar.'+activeSlide).css('width','0');
							},
							onSlideChangeStart : function(){

								// return the active stage
								scope.stage = mySwiper.activeSlide().id;

								// if the current stage is valid and the current stage is not 4 add pulse else remove it
								if (scope.request_form[scope.stage].$valid && scope.stage != 'stage4') {
									$('.arrow-right ').addClass('pulse');
								}else{
									$('.arrow-right ').removeClass('pulse');
								};


								if (scope.stage != 'stage1') {
									$('.arrow-left ').addClass('pulse');
									console.log('adding');
								}else{
									$('.arrow-left ').removeClass('pulse');
									console.log('removing');
								};


								scope.stageNum = Number(scope.stage[5]);

								scope.$apply();

							}
						})

			    		//click for left arrow
						$('.arrow-left').on('click', function(e){
							e.preventDefault();

							if (!scope.submitted) {
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

						// loop through each stage of the form, if the stage is valid add pulse class to the next arrow
						angular.forEach(['stage1','stage2','stage3'],function(value,key){
							
							// a watch for each stage of the form object's valid property
							scope.$watch('request_form.'+value+'.$valid',function(){

								if (scope.request_form[value].$valid && scope.request_form[value]) {
									$('.arrow-right ').addClass('pulse');
								}else{
									$('.arrow-right ').removeClass('pulse');
								};
								
							});


						});

						//set the form to dirty so that the validation errors can be shown
						var validateForm = function(){

							// find out  the active slide
							var stage = mySwiper.activeSlide().id;

							console.log(stage);


							// access the object for the stage of the current form
							var stageObj = scope.request_form[stage];

							console.log(stageObj);


							// set the current form to dirty
							scope.request_form[stage].$setDirty();

							//loop through the fields in the form and set them to dirty
							for(var key in stageObj){

								// console.log(key);

								if (scope.request_form[stage][key] && scope.request_form[stage][key].hasOwnProperty && scope.request_form[stage][key].hasOwnProperty('$dirty')) {

									scope.request_form[stage][key].$dirty = true;

									scope.$apply();
								};

							}

						}


					}


        	});

	

		scope.result = 'hidden';
	    scope.resultMessage;
	    
	    
	    scope.submitted = false; //used so that form errors are shown only after the form has been submitted
	    scope.submit = function() {
	    	// alert('submitted');
	    	$('.arrow-left ').removeClass('pulse');
	        scope.submitted = true;
	        scope.submitButtonDisabled = true;
	        if (scope.request_form.$valid) {
	        	// alert('valid form');
	            $http({
	                method  : 'POST',
	                url     : 'phpmailer/contact-form.php',
	                data    : $.param(scope.form),  //param method from jQuery
	                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
	            }).success(function(data){
	                console.log(data);
	     
                    scope.submitButtonDisabled = true;
                    scope.resultMessage = data.message;
                    scope.result='bg-success';

	            });
	        } else {
	        	alert('invalid form');
	            scope.submitButtonDisabled = false;
	            scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
	            scope.result='bg-danger';
	        }
	    }


			

        }
    };
}); 