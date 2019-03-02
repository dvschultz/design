$(document).ready(function(){
    //check height and width. Always useful.
    windowW = window.innerWidth,
    windowH = window.innerHeight;
    resizeSVG();
    draw();
    
    //check for iOS, so we can disable scroll effects
    Modernizr.addTest('ipad', function () {
      return !!navigator.userAgent.match(/iPad/i);
    });
     
    Modernizr.addTest('iphone', function () {
      return !!navigator.userAgent.match(/iPhone/i);
    });
     
    Modernizr.addTest('ipod', function () {
      return !!navigator.userAgent.match(/iPod/i);
    });

    Modernizr.addTest('chrome', function () {
      return !!navigator.userAgent.toLowerCase().match(/chrom(e|ium)/);
    });
     
    Modernizr.addTest('ios', function () {
      return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
    });

    addAngles();
    sleepDonation();

    $(window).bind('resize',function(e){
        windowW = window.innerWidth;
        resizeSVG();
    });


    $(window).bind('onprintbefore',function(e){
        windowW = window.innerWidth;
        resizeSVG();
    });

    $(window).bind('scroll',function(e){
        if ($('html').hasClass('no-ios')) {
            parallaxScroll();
            sticky();
            scrollFade();
            fadeInColor();
            drawLines();
        }
	});

    function resizeSVG() {
        if( windowW < 1024 ) {
            var pc = $('.parallax-container'),
                w = $('.parallax-container').width(),
                h = $('.parallax-container').height(),
                tx = w/1024;
                pch = Math.ceil( (tx*w)*(480/1024) );

            console.log(pch);
            pc.css({
                '-webkit-transform': 'scale('+ tx +')',
            })
                .height(480)
                .width(1024);
        }
    }

	function draw() {

		// http://jakearchibald.com/2013/animated-line-drawing-svg/
		var myPaths=[],
			myLs=[]
		$('.letter').each(function($i,$el){
			var randDelay = Math.random()*2;
			var $id = $el.id;
			myPaths[$i] = document.querySelector('#' + $id + ' path');
			myLs[$i] = myPaths[$i].getTotalLength() + 14; //14 accounts for rounded end LineCaps

			// Clear any previous transition
			myPaths[$i].style.transition = myPaths[$i].style.WebkitTransition =
			  'none';
			// Set up the starting positions
			myPaths[$i].style.strokeDasharray = myLs[$i] + ' ' + myLs[$i];
			myPaths[$i].style.strokeDashoffset = myLs[$i];

            // finally display svg
            $('.parallax-container').css('display','block');

			// Trigger a layout so styles are calculated & the browser
			// picks up the starting position before animating
			myPaths[$i].getBoundingClientRect();
			// Define our transition
			myPaths[$i].style.transition = myPaths[$i].style.WebkitTransition =
			  'stroke-dashoffset 2s ease '+randDelay+'s, stroke  2s ease 0s';
			// Go!
			myPaths[$i].style.strokeDashoffset = '0';
		});
	}

	function parallaxScroll() {
		var scrolled = $(window).scrollTop();

        if (scrolled >= 1) {
            $('#letter1-part1,#letter1-part2').addClass('red');
        } else if (scrolled <= 0) {
            $('#letter1-part1,#letter1-part2').removeClass('red');
        }
		$('.letter').each(function(){
			
			var $speed = $(this).attr('data-speed');
			$(this).css('top',(10-(scrolled*$speed))+'vh');

			//$(this).css('-webkit-transform','translate(0px,' + (0-(scrolled*$speed)) +'vh)');
		});

        $('#letter1-part1,#letter1-part2').each(function(){
            var blackC = 'rgb(35,31,32)';
            var redC = 'rgb(35,31,32)';
        });
	}
 
});

function sticky() {

    if (windowW > 540) {
        $('.forthcoming,.team').each(function(){
            var thisHeight =  $(this).height();

            if ( $(window).scrollTop() >= $(this)[0].offsetTop && ( $(window).scrollTop()  <= ($(this)[0].offsetTop+ $(this)[0].offsetHeight) ) ) {
                $(this).height(thisHeight).addClass('sticky');
            } else {
                $(this).height("auto").removeClass('sticky');
            }
        });    
    }
}

function fadeInColor() {
    $('.different,.learn-more').each(function(){
        if ($(this).attr( "data-atbooks-fadeto" )) {
            var positionOn = ($(this).offset().top - window.innerHeight);
            var bgColor = $(this).attr( "data-atbooks-fadeto" );
            //break up into rgba components
            var rgbVal = bgColor.match(/(\.)?\d+/g);

            //should be zero when entering window, 1 when top reaches top of window
            var opacity = ( ($(window).scrollTop()-positionOn)/window.innerHeight ) * rgbVal[3];

            
            // console.log('on: '+positionOn);
            // console.log('windowHeight: '+window.innerHeight);
            // console.log('current: '+($(window).scrollTop()-positionOn));
            // console.log('alpha: ' + rgbVal[3]);
            
            if ( $(window).scrollTop() >= positionOn) {

                var rgbComputed = 'rgba('+rgbVal[0]+','+rgbVal[1]+','+rgbVal[2]+','+ opacity +')';
                // console.log( 'color: ' + rgbComputed);

                $(this).css('background-color',rgbComputed);
            } else {
                $(this).css('background-color','transparent');
            }    
        }
    });
}

function scrollFade() {

    $('.forthcoming').find('.title').each(function(){
        var windowTop = $(window).scrollTop();
        var thisHeight =  $(this)[0].offsetHeight,
            halfWindowHeight = window.innerHeight/2,
            positionOn = $(this).offset().top - window.innerHeight,
            positionOff = $(this).offset().top + thisHeight,
            fadeOff = positionOn+halfWindowHeight;

        var translatePos = Math.abs($(window).scrollTop()-($(this).offset().top-halfWindowHeight));

        if ( ( windowTop >= positionOn ) && ( windowTop <= fadeOff ) ) {
            
            currOpacity = ( 1 - (fadeOff-windowTop)/halfWindowHeight );
            console.log(currOpacity);

            //the twist
            $(this).css('opacity',currOpacity);

            //debug
            // console.log( 'top: '+windowTop );
            // console.log( 'stopPos: ' + fadeOff);
            // console.log( 'diff:' + (fadeOff-windowTop) );
            // console.log( 'percent:' + (1- (fadeOff-windowTop)/halfWindowHeight) );
        } else {
            $(this).css('opacity',1);
        }
    });

}

function sleepDonation() {
    $('.s-cap').each(function(index){
        var paths = document.querySelectorAll('#svgS path');
        for (var p = 0; p<paths.length; p++){
            var length = paths[p].getTotalLength();
            paths[p].setAttribute('data-atbooks-length',length);
            paths[p].style.strokeDasharray = length + ' ' + length;
            // path.style.strokeDashoffset = length;  
        }

        var rects = document.querySelectorAll('#svgS rect');
        for (var r = 0; r<rects.length; r++){
            totalL = 73.435*4;
            rects[r].setAttribute('data-atbooks-length',totalL);
            //rects[r].style.strokeDasharray = totalL*0 + ' ' + totalL;
            // path.style.strokeDashoffset = length;  
        }
        
    });
}

function addAngles() {
    var svgAngle = [
        '<div class="svgAngle" style="height: 462px; width: 335px;"><svg xmlns="http://www.w3.org/2000/svg" width="334.26" height="462.478"><path d="M109.05 3.5l221.71 455.478" stroke="rgba(204,51,51,1)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" fill="none"/><path d="M213.381 293.29h-209.296" stroke="rgba(204,51,51,1)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" fill="none"/></svg><div>',
        '<div class="svgAngle" style="height: 462px; width: 335px;"><svg xmlns="http://www.w3.org/2000/svg" width="334.26" height="462.478"><path d="M225.795 3.5l-221.71 455.478" stroke="rgba(204,51,51,1)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" fill="none"/><path d="M121.464 293.29h209.296" stroke="rgba(204,51,51,1)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" fill="none"/></svg><div>',
        '<div class="svgAngle" style="height: 462px; width: 335px;"><svg xmlns="http://www.w3.org/2000/svg" width="334.26" height="462.478"><path d="M225.795 3.5l-221.71 455.478" stroke="rgba(204,51,51,1)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" fill="none"/><path d="M121.464 293.29h209.296" stroke="rgba(204,51,51,1)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" fill="none"/></svg><div>',
        '<div class="svgAngle" style="height: 462px; width: 335px;"><svg xmlns="http://www.w3.org/2000/svg" width="334.26" height="462.478"><path d="M109.05 3.5l221.71 455.478" stroke="rgba(204,51,51,1)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" fill="none"/><path d="M213.381 293.29h-209.296" stroke="rgba(204,51,51,1)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" fill="none"/></svg><div>'
        ];
    var svgPraise = [
        '<div class="svgAngle" style="height: 99px; width: 50px;"><svg xmlns="http://www.w3.org/2000/svg" width="49.728" height="99"><path d="M1.5 1.5l46.728 96" stroke="rgba(0,0,0,.3)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" fill="none"/></svg></div>',
        '<div class="svgAngle" style="height: 99px; width: 50px;"><svg xmlns="http://www.w3.org/2000/svg" width="49.728" height="99"><path d="M48.228 1.5l-46.728 96" stroke="rgba(0,0,0,.3)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" fill="none"/></svg></div>'
    ];
    var lastIndex = 0;
    $('.team').find('li').each(function(index){
        var topPos = $(this).position();

        $(svgAngle[index]).attr('id','svgAngle'+index).appendTo($('.team .body'))
            .css({
                display:'block',
                top: topPos.top+'px',
                position: 'absolute'
            });
        lastIndex = index;
    });

    if ( $('html').hasClass('no-ios') ) {
        $('.praise').find('figure').each(function(index){
            var randomint = Math.floor(Math.random() * (1 - 0 + 1) + 0);
            $(svgPraise[randomint]).attr('id','svgAngle'+(lastIndex+index)).appendTo($(this));
        });
    }

    $('.svgAngle').each(function(index){
        var paths = document.querySelectorAll('#svgAngle' +index+ ' path');
        for (var p = 0; p<paths.length; p++){
            var length = paths[p].getTotalLength();
            paths[p].setAttribute('data-atbooks-length',length);
            paths[p].style.strokeDasharray = length + ' ' + length;
            // path.style.strokeDashoffset = length;  
        }
        
    });
}

function drawLines() {
    $('.svgAngle').each(function(index){
        var paths = document.querySelectorAll('#svgAngle' +index+ ' path');
        var currPos = $(window).scrollTop()-$(this).offset().top,
            thisHeight =  $(this)[0].offsetHeight,
            halfWindowHeight = window.innerHeight/2,
            positionOn = $(this).offset().top - window.innerHeight + (halfWindowHeight/2),
            positionOff = $(this).offset().top + thisHeight + (halfWindowHeight/2),
            // positionOn = $(this).offset().top,
            // positionOff = $(this).offset().top + thisHeight - window.innerHeight,
            windowTop = $(window).scrollTop(),
            thisHeight =  $(this)[0].offsetHeight;
        //console.log(currPos/thisHeight);


        for (var p = 0; p<paths.length; p++){
            var precentTraveled = (windowTop-positionOn) / (positionOff - positionOn)
            var pathL = paths[p].getAttribute('data-atbooks-length')
            var offsetDist = pathL*2;
            var currPathOffset = offsetDist*precentTraveled;

            paths[p].style.strokeDashoffset = pathL - currPathOffset;
        }

    });

    $('.s-cap').each(function(index){
        var paths = document.querySelectorAll('#svgS path');
        var rects = document.querySelectorAll('#svgS rect');
        var currPos = $(window).scrollTop()-$(this).offset().top,
            thisHeight =  $(this)[0].offsetHeight,
            halfWindowHeight = window.innerHeight/2,
            positionOn = $(this).offset().top - window.innerHeight + (halfWindowHeight/2),
            positionOff = $(this).offset().top + thisHeight + (halfWindowHeight/2),
            // positionOn = $(this).offset().top,
            // positionOff = $(this).offset().top + thisHeight - window.innerHeight,
            windowTop = $(window).scrollTop(),
            thisHeight =  $(this)[0].offsetHeight;
        //console.log(currPos/thisHeight);


        for (var p = 0; p<paths.length; p++){
            var precentTraveled = (windowTop-positionOn) / (positionOff - positionOn)
            var pathL = paths[p].getAttribute('data-atbooks-length')
            var offsetDist = pathL*2;
            var currPathOffset = offsetDist*precentTraveled;

            paths[p].style.strokeDashoffset = pathL - currPathOffset;
        }


        for (var r = 0; r<rects.length; r++){
            var precentTraveled = (windowTop-positionOn) / (positionOff - positionOn)
            var rectL = rects[r].getAttribute('data-atbooks-length')
            var offsetDist = rectL*2;
            var currPathOffset = offsetDist*precentTraveled;
            rects[r].style.strokeDasharray = (totalL*0 + currPathOffset) + ' ' + (totalL - currPathOffset );
            // path.style.strokeDashoffset = length;  
        }

    });
}