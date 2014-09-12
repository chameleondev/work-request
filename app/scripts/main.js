// var mySwiper = new Swiper('.swiper-container',{ 
// 	grabCursor: true,
// 	onTouchStart :function(){

// 			var slide = mySwiper.activeSlide().id;
// 			var stageNum = slide[5];

// 			console.log(slide);
// 			console.log(stageNum);



// 			if ($scope.request_form[slide].$invalid) {

				
// 				console.log('invalid');
// 				mySwiper.params.swipeToNext = false;

// 			} else{

// 				$('.progress-bar.stage'+stageNum).css('width','33.3%');

// 				console.log('valid');

// 				mySwiper.params.swipeToNext = true;



// 			}
// 		}
// });

// $('.arrow-left').on('click', function(e){
// 	e.preventDefault();
// 	mySwiper.swipePrev();
// });

// $('.arrow-right').on('click', function(e){
// 	e.preventDefault();
// 	mySwiper.swipeNext();
// });