/*
 * Swiper 2.7.6
 * Mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2010-2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: February 11, 2015
*/
var Swiper=function(a,b){"use strict";function c(a,b){return document.querySelectorAll?(b||document).querySelectorAll(a):jQuery(a,b)}function d(a){return"[object Array]"===Object.prototype.toString.apply(a)?!0:!1}function e(){var a=G-J;return b.freeMode&&(a=G-J),b.slidesPerView>D.slides.length&&!b.centeredSlides&&(a=0),0>a&&(a=0),a}function f(){function a(a){var c,d,e=function(){"undefined"!=typeof D&&null!==D&&(void 0!==D.imagesLoaded&&D.imagesLoaded++,D.imagesLoaded===D.imagesToLoad.length&&(D.reInit(),b.onImagesReady&&D.fireCallback(b.onImagesReady,D)))};a.complete?e():(d=a.currentSrc||a.getAttribute("src"),d?(c=new Image,c.onload=e,c.onerror=e,c.src=d):e())}var d=D.h.addEventListener,e="wrapper"===b.eventTarget?D.wrapper:D.container;if(D.browser.ie10||D.browser.ie11?(d(e,D.touchEvents.touchStart,p),d(document,D.touchEvents.touchMove,q),d(document,D.touchEvents.touchEnd,r)):(D.support.touch&&(d(e,"touchstart",p),d(e,"touchmove",q),d(e,"touchend",r)),b.simulateTouch&&(d(e,"mousedown",p),d(document,"mousemove",q),d(document,"mouseup",r))),b.autoResize&&d(window,"resize",D.resizeFix),g(),D._wheelEvent=!1,b.mousewheelControl){if(void 0!==document.onmousewheel&&(D._wheelEvent="mousewheel"),!D._wheelEvent)try{new WheelEvent("wheel"),D._wheelEvent="wheel"}catch(f){}D._wheelEvent||(D._wheelEvent="DOMMouseScroll"),D._wheelEvent&&d(D.container,D._wheelEvent,j)}if(b.keyboardControl&&d(document,"keydown",i),b.updateOnImagesReady){D.imagesToLoad=c("img",D.container);for(var h=0;h<D.imagesToLoad.length;h++)a(D.imagesToLoad[h])}}function g(){var a,d=D.h.addEventListener;if(b.preventLinks){var e=c("a",D.container);for(a=0;a<e.length;a++)d(e[a],"click",n)}if(b.releaseFormElements){var f=c("input, textarea, select",D.container);for(a=0;a<f.length;a++)d(f[a],D.touchEvents.touchStart,o,!0),D.support.touch&&b.simulateTouch&&d(f[a],"mousedown",o,!0)}if(b.onSlideClick)for(a=0;a<D.slides.length;a++)d(D.slides[a],"click",k);if(b.onSlideTouch)for(a=0;a<D.slides.length;a++)d(D.slides[a],D.touchEvents.touchStart,l)}function h(){var a,d=D.h.removeEventListener;if(b.onSlideClick)for(a=0;a<D.slides.length;a++)d(D.slides[a],"click",k);if(b.onSlideTouch)for(a=0;a<D.slides.length;a++)d(D.slides[a],D.touchEvents.touchStart,l);if(b.releaseFormElements){var e=c("input, textarea, select",D.container);for(a=0;a<e.length;a++)d(e[a],D.touchEvents.touchStart,o,!0),D.support.touch&&b.simulateTouch&&d(e[a],"mousedown",o,!0)}if(b.preventLinks){var f=c("a",D.container);for(a=0;a<f.length;a++)d(f[a],"click",n)}}function i(a){var b=a.keyCode||a.charCode;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey)){if(37===b||39===b||38===b||40===b){for(var c=!1,d=D.h.getOffset(D.container),e=D.h.windowScroll().left,f=D.h.windowScroll().top,g=D.h.windowWidth(),h=D.h.windowHeight(),i=[[d.left,d.top],[d.left+D.width,d.top],[d.left,d.top+D.height],[d.left+D.width,d.top+D.height]],j=0;j<i.length;j++){var k=i[j];k[0]>=e&&k[0]<=e+g&&k[1]>=f&&k[1]<=f+h&&(c=!0)}if(!c)return}N?((37===b||39===b)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),39===b&&D.swipeNext(),37===b&&D.swipePrev()):((38===b||40===b)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),40===b&&D.swipeNext(),38===b&&D.swipePrev())}}function j(a){var c=D._wheelEvent,d=0;if(a.detail)d=-a.detail;else if("mousewheel"===c)if(b.mousewheelControlForceToAxis)if(N){if(!(Math.abs(a.wheelDeltaX)>Math.abs(a.wheelDeltaY)))return;d=a.wheelDeltaX}else{if(!(Math.abs(a.wheelDeltaY)>Math.abs(a.wheelDeltaX)))return;d=a.wheelDeltaY}else d=a.wheelDelta;else if("DOMMouseScroll"===c)d=-a.detail;else if("wheel"===c)if(b.mousewheelControlForceToAxis)if(N){if(!(Math.abs(a.deltaX)>Math.abs(a.deltaY)))return;d=-a.deltaX}else{if(!(Math.abs(a.deltaY)>Math.abs(a.deltaX)))return;d=-a.deltaY}else d=Math.abs(a.deltaX)>Math.abs(a.deltaY)?-a.deltaX:-a.deltaY;if(b.freeMode){var f=D.getWrapperTranslate()+d;if(f>0&&(f=0),f<-e()&&(f=-e()),D.setWrapperTransition(0),D.setWrapperTranslate(f),D.updateActiveSlide(f),0===f||f===-e())return}else(new Date).getTime()-V>60&&(0>d?D.swipeNext():D.swipePrev()),V=(new Date).getTime();return b.autoplay&&D.stopAutoplay(!0),a.preventDefault?a.preventDefault():a.returnValue=!1,!1}function k(a){D.allowSlideClick&&(m(a),D.fireCallback(b.onSlideClick,D,a))}function l(a){m(a),D.fireCallback(b.onSlideTouch,D,a)}function m(a){if(a.currentTarget)D.clickedSlide=a.currentTarget;else{var c=a.srcElement;do{if(c.className.indexOf(b.slideClass)>-1)break;c=c.parentNode}while(c);D.clickedSlide=c}D.clickedSlideIndex=D.slides.indexOf(D.clickedSlide),D.clickedSlideLoopIndex=D.clickedSlideIndex-(D.loopedSlides||0)}function n(a){return D.allowLinks?void 0:(a.preventDefault?a.preventDefault():a.returnValue=!1,b.preventLinksPropagation&&"stopPropagation"in a&&a.stopPropagation(),!1)}function o(a){return a.stopPropagation?a.stopPropagation():a.returnValue=!1,!1}function p(a){if(b.preventLinks&&(D.allowLinks=!0),D.isTouched||b.onlyExternal)return!1;var c=a.target||a.srcElement;document.activeElement&&document.activeElement!==document.body&&document.activeElement!==c&&document.activeElement.blur();var d="input select textarea".split(" ");if(b.noSwiping&&c&&t(c))return!1;if(_=!1,D.isTouched=!0,$="touchstart"===a.type,!$&&"which"in a&&3===a.which)return D.isTouched=!1,!1;if(!$||1===a.targetTouches.length){D.callPlugins("onTouchStartBegin"),!$&&!D.isAndroid&&d.indexOf(c.tagName.toLowerCase())<0&&(a.preventDefault?a.preventDefault():a.returnValue=!1);var e=$?a.targetTouches[0].pageX:a.pageX||a.clientX,f=$?a.targetTouches[0].pageY:a.pageY||a.clientY;D.touches.startX=D.touches.currentX=e,D.touches.startY=D.touches.currentY=f,D.touches.start=D.touches.current=N?e:f,D.setWrapperTransition(0),D.positions.start=D.positions.current=D.getWrapperTranslate(),D.setWrapperTranslate(D.positions.start),D.times.start=(new Date).getTime(),I=void 0,b.moveStartThreshold>0&&(X=!1),b.onTouchStart&&D.fireCallback(b.onTouchStart,D,a),D.callPlugins("onTouchStartEnd")}}function q(a){if(D.isTouched&&!b.onlyExternal&&(!$||"mousemove"!==a.type)){var c=$?a.targetTouches[0].pageX:a.pageX||a.clientX,d=$?a.targetTouches[0].pageY:a.pageY||a.clientY;if("undefined"==typeof I&&N&&(I=!!(I||Math.abs(d-D.touches.startY)>Math.abs(c-D.touches.startX))),"undefined"!=typeof I||N||(I=!!(I||Math.abs(d-D.touches.startY)<Math.abs(c-D.touches.startX))),I)return void(D.isTouched=!1);if(N){if(!b.swipeToNext&&c<D.touches.startX||!b.swipeToPrev&&c>D.touches.startX)return}else if(!b.swipeToNext&&d<D.touches.startY||!b.swipeToPrev&&d>D.touches.startY)return;if(a.assignedToSwiper)return void(D.isTouched=!1);if(a.assignedToSwiper=!0,b.preventLinks&&(D.allowLinks=!1),b.onSlideClick&&(D.allowSlideClick=!1),b.autoplay&&D.stopAutoplay(!0),!$||1===a.touches.length){if(D.isMoved||(D.callPlugins("onTouchMoveStart"),b.loop&&(D.fixLoop(),D.positions.start=D.getWrapperTranslate()),b.onTouchMoveStart&&D.fireCallback(b.onTouchMoveStart,D)),D.isMoved=!0,a.preventDefault?a.preventDefault():a.returnValue=!1,D.touches.current=N?c:d,D.positions.current=(D.touches.current-D.touches.start)*b.touchRatio+D.positions.start,D.positions.current>0&&b.onResistanceBefore&&D.fireCallback(b.onResistanceBefore,D,D.positions.current),D.positions.current<-e()&&b.onResistanceAfter&&D.fireCallback(b.onResistanceAfter,D,Math.abs(D.positions.current+e())),b.resistance&&"100%"!==b.resistance){var f;if(D.positions.current>0&&(f=1-D.positions.current/J/2,D.positions.current=.5>f?J/2:D.positions.current*f),D.positions.current<-e()){var g=(D.touches.current-D.touches.start)*b.touchRatio+(e()+D.positions.start);f=(J+g)/J;var h=D.positions.current-g*(1-f)/2,i=-e()-J/2;D.positions.current=i>h||0>=f?i:h}}if(b.resistance&&"100%"===b.resistance&&(D.positions.current>0&&(!b.freeMode||b.freeModeFluid)&&(D.positions.current=0),D.positions.current<-e()&&(!b.freeMode||b.freeModeFluid)&&(D.positions.current=-e())),!b.followFinger)return;if(b.moveStartThreshold)if(Math.abs(D.touches.current-D.touches.start)>b.moveStartThreshold||X){if(!X)return X=!0,void(D.touches.start=D.touches.current);D.setWrapperTranslate(D.positions.current)}else D.positions.current=D.positions.start;else D.setWrapperTranslate(D.positions.current);return(b.freeMode||b.watchActiveIndex)&&D.updateActiveSlide(D.positions.current),b.grabCursor&&(D.container.style.cursor="move",D.container.style.cursor="grabbing",D.container.style.cursor="-moz-grabbin",D.container.style.cursor="-webkit-grabbing"),Y||(Y=D.touches.current),Z||(Z=(new Date).getTime()),D.velocity=(D.touches.current-Y)/((new Date).getTime()-Z)/2,Math.abs(D.touches.current-Y)<2&&(D.velocity=0),Y=D.touches.current,Z=(new Date).getTime(),D.callPlugins("onTouchMoveEnd"),b.onTouchMove&&D.fireCallback(b.onTouchMove,D,a),!1}}}function r(a){if(I&&D.swipeReset(),!b.onlyExternal&&D.isTouched){D.isTouched=!1,b.grabCursor&&(D.container.style.cursor="move",D.container.style.cursor="grab",D.container.style.cursor="-moz-grab",D.container.style.cursor="-webkit-grab"),D.positions.current||0===D.positions.current||(D.positions.current=D.positions.start),b.followFinger&&D.setWrapperTranslate(D.positions.current),D.times.end=(new Date).getTime(),D.touches.diff=D.touches.current-D.touches.start,D.touches.abs=Math.abs(D.touches.diff),D.positions.diff=D.positions.current-D.positions.start,D.positions.abs=Math.abs(D.positions.diff);var c=D.positions.diff,d=D.positions.abs,f=D.times.end-D.times.start;5>d&&300>f&&D.allowLinks===!1&&(b.freeMode||0===d||D.swipeReset(),b.preventLinks&&(D.allowLinks=!0),b.onSlideClick&&(D.allowSlideClick=!0)),setTimeout(function(){"undefined"!=typeof D&&null!==D&&(b.preventLinks&&(D.allowLinks=!0),b.onSlideClick&&(D.allowSlideClick=!0))},100);var g=e();if(!D.isMoved&&b.freeMode)return D.isMoved=!1,b.onTouchEnd&&D.fireCallback(b.onTouchEnd,D,a),void D.callPlugins("onTouchEnd");if(!D.isMoved||D.positions.current>0||D.positions.current<-g)return D.swipeReset(),b.onTouchEnd&&D.fireCallback(b.onTouchEnd,D,a),void D.callPlugins("onTouchEnd");if(D.isMoved=!1,b.freeMode){if(b.freeModeFluid){var h,i=1e3*b.momentumRatio,j=D.velocity*i,k=D.positions.current+j,l=!1,m=20*Math.abs(D.velocity)*b.momentumBounceRatio;-g>k&&(b.momentumBounce&&D.support.transitions?(-m>k+g&&(k=-g-m),h=-g,l=!0,_=!0):k=-g),k>0&&(b.momentumBounce&&D.support.transitions?(k>m&&(k=m),h=0,l=!0,_=!0):k=0),0!==D.velocity&&(i=Math.abs((k-D.positions.current)/D.velocity)),D.setWrapperTranslate(k),D.setWrapperTransition(i),b.momentumBounce&&l&&D.wrapperTransitionEnd(function(){_&&(b.onMomentumBounce&&D.fireCallback(b.onMomentumBounce,D),D.callPlugins("onMomentumBounce"),D.setWrapperTranslate(h),D.setWrapperTransition(300))}),D.updateActiveSlide(k)}return(!b.freeModeFluid||f>=300)&&D.updateActiveSlide(D.positions.current),b.onTouchEnd&&D.fireCallback(b.onTouchEnd,D,a),void D.callPlugins("onTouchEnd")}H=0>c?"toNext":"toPrev","toNext"===H&&300>=f&&(30>d||!b.shortSwipes?D.swipeReset():D.swipeNext(!0,!0)),"toPrev"===H&&300>=f&&(30>d||!b.shortSwipes?D.swipeReset():D.swipePrev(!0,!0));var n=0;if("auto"===b.slidesPerView){for(var o,p=Math.abs(D.getWrapperTranslate()),q=0,r=0;r<D.slides.length;r++)if(o=N?D.slides[r].getWidth(!0,b.roundLengths):D.slides[r].getHeight(!0,b.roundLengths),q+=o,q>p){n=o;break}n>J&&(n=J)}else n=F*b.slidesPerView;"toNext"===H&&f>300&&(d>=n*b.longSwipesRatio?D.swipeNext(!0,!0):D.swipeReset()),"toPrev"===H&&f>300&&(d>=n*b.longSwipesRatio?D.swipePrev(!0,!0):D.swipeReset()),b.onTouchEnd&&D.fireCallback(b.onTouchEnd,D,a),D.callPlugins("onTouchEnd")}}function s(a,b){return a&&a.getAttribute("class")&&a.getAttribute("class").indexOf(b)>-1}function t(a){var c=!1;do s(a,b.noSwipingClass)&&(c=!0),a=a.parentElement;while(!c&&a.parentElement&&!s(a,b.wrapperClass));return!c&&s(a,b.wrapperClass)&&s(a,b.noSwipingClass)&&(c=!0),c}function u(a,b){var c,d=document.createElement("div");return d.innerHTML=b,c=d.firstChild,c.className+=" "+a,c.outerHTML}function v(a,c,d){function e(){var f=+new Date,l=f-g;h+=i*l/(1e3/60),k="toNext"===j?h>a:a>h,k?(D.setWrapperTranslate(Math.ceil(h)),D._DOMAnimating=!0,window.setTimeout(function(){e()},1e3/60)):(b.onSlideChangeEnd&&("to"===c?d.runCallbacks===!0&&D.fireCallback(b.onSlideChangeEnd,D,j):D.fireCallback(b.onSlideChangeEnd,D,j)),D.setWrapperTranslate(a),D._DOMAnimating=!1)}var f="to"===c&&d.speed>=0?d.speed:b.speed,g=+new Date;if(D.support.transitions||!b.DOMAnimation)D.setWrapperTranslate(a),D.setWrapperTransition(f);else{var h=D.getWrapperTranslate(),i=Math.ceil((a-h)/f*(1e3/60)),j=h>a?"toNext":"toPrev",k="toNext"===j?h>a:a>h;if(D._DOMAnimating)return;e()}D.updateActiveSlide(a),b.onSlideNext&&"next"===c&&d.runCallbacks===!0&&D.fireCallback(b.onSlideNext,D,a),b.onSlidePrev&&"prev"===c&&d.runCallbacks===!0&&D.fireCallback(b.onSlidePrev,D,a),b.onSlideReset&&"reset"===c&&d.runCallbacks===!0&&D.fireCallback(b.onSlideReset,D,a),"next"!==c&&"prev"!==c&&"to"!==c||d.runCallbacks!==!0||w(c)}function w(a){if(D.callPlugins("onSlideChangeStart"),b.onSlideChangeStart)if(b.queueStartCallbacks&&D.support.transitions){if(D._queueStartCallbacks)return;D._queueStartCallbacks=!0,D.fireCallback(b.onSlideChangeStart,D,a),D.wrapperTransitionEnd(function(){D._queueStartCallbacks=!1})}else D.fireCallback(b.onSlideChangeStart,D,a);if(b.onSlideChangeEnd)if(D.support.transitions)if(b.queueEndCallbacks){if(D._queueEndCallbacks)return;D._queueEndCallbacks=!0,D.wrapperTransitionEnd(function(c){D.fireCallback(b.onSlideChangeEnd,c,a)})}else D.wrapperTransitionEnd(function(c){D.fireCallback(b.onSlideChangeEnd,c,a)});else b.DOMAnimation||setTimeout(function(){D.fireCallback(b.onSlideChangeEnd,D,a)},10)}function x(){var a=D.paginationButtons;if(a)for(var b=0;b<a.length;b++)D.h.removeEventListener(a[b],"click",z)}function y(){var a=D.paginationButtons;if(a)for(var b=0;b<a.length;b++)D.h.addEventListener(a[b],"click",z)}function z(a){for(var c,d=a.target||a.srcElement,e=D.paginationButtons,f=0;f<e.length;f++)d===e[f]&&(c=f);b.autoplay&&D.stopAutoplay(!0),D.swipeTo(c)}function A(){ab=setTimeout(function(){b.loop?(D.fixLoop(),D.swipeNext(!0,!0)):D.swipeNext(!0,!0)||(b.autoplayStopOnLast?(clearTimeout(ab),ab=void 0):D.swipeTo(0)),D.wrapperTransitionEnd(function(){"undefined"!=typeof ab&&A()})},b.autoplay)}function B(){D.calcSlides(),b.loader.slides.length>0&&0===D.slides.length&&D.loadSlides(),b.loop&&D.createLoop(),D.init(),f(),b.pagination&&D.createPagination(!0),b.loop||b.initialSlide>0?D.swipeTo(b.initialSlide,0,!1):D.updateActiveSlide(0),b.autoplay&&D.startAutoplay(),D.centerIndex=D.activeIndex,b.onSwiperCreated&&D.fireCallback(b.onSwiperCreated,D),D.callPlugins("onSwiperCreated")}if(!document.body.outerHTML&&document.body.__defineGetter__&&HTMLElement){var C=HTMLElement.prototype;C.__defineGetter__&&C.__defineGetter__("outerHTML",function(){return(new XMLSerializer).serializeToString(this)})}if(window.getComputedStyle||(window.getComputedStyle=function(a){return this.el=a,this.getPropertyValue=function(b){var c=/(\-([a-z]){1})/g;return"float"===b&&(b="styleFloat"),c.test(b)&&(b=b.replace(c,function(){return arguments[2].toUpperCase()})),a.currentStyle[b]?a.currentStyle[b]:null},this}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){for(var c=b||0,d=this.length;d>c;c++)if(this[c]===a)return c;return-1}),(document.querySelectorAll||window.jQuery)&&"undefined"!=typeof a&&(a.nodeType||0!==c(a).length)){var D=this;D.touches={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,diff:0,abs:0},D.positions={start:0,abs:0,diff:0,current:0},D.times={start:0,end:0},D.id=(new Date).getTime(),D.container=a.nodeType?a:c(a)[0],D.isTouched=!1,D.isMoved=!1,D.activeIndex=0,D.centerIndex=0,D.activeLoaderIndex=0,D.activeLoopIndex=0,D.previousIndex=null,D.velocity=0,D.snapGrid=[],D.slidesGrid=[],D.imagesToLoad=[],D.imagesLoaded=0,D.wrapperLeft=0,D.wrapperRight=0,D.wrapperTop=0,D.wrapperBottom=0,D.isAndroid=navigator.userAgent.toLowerCase().indexOf("android")>=0;var E,F,G,H,I,J,K={eventTarget:"wrapper",mode:"horizontal",touchRatio:1,speed:300,freeMode:!1,freeModeFluid:!1,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,slidesPerView:1,slidesPerGroup:1,slidesPerViewFit:!0,simulateTouch:!0,followFinger:!0,shortSwipes:!0,longSwipesRatio:.5,moveStartThreshold:!1,onlyExternal:!1,createPagination:!0,pagination:!1,paginationElement:"span",paginationClickable:!1,paginationAsRange:!0,resistance:!0,scrollContainer:!1,preventLinks:!0,preventLinksPropagation:!1,noSwiping:!1,noSwipingClass:"swiper-no-swiping",initialSlide:0,keyboardControl:!1,mousewheelControl:!1,mousewheelControlForceToAxis:!1,useCSS3Transforms:!0,autoplay:!1,autoplayDisableOnInteraction:!0,autoplayStopOnLast:!1,loop:!1,loopAdditionalSlides:0,roundLengths:!1,calculateHeight:!1,cssWidthAndHeight:!1,updateOnImagesReady:!0,releaseFormElements:!0,watchActiveIndex:!1,visibilityFullFit:!1,offsetPxBefore:0,offsetPxAfter:0,offsetSlidesBefore:0,offsetSlidesAfter:0,centeredSlides:!1,queueStartCallbacks:!1,queueEndCallbacks:!1,autoResize:!0,resizeReInit:!1,DOMAnimation:!0,loader:{slides:[],slidesHTMLType:"inner",surroundGroups:1,logic:"reload",loadAllSlides:!1},swipeToPrev:!0,swipeToNext:!0,slideElement:"div",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",wrapperClass:"swiper-wrapper",paginationElementClass:"swiper-pagination-switch",paginationActiveClass:"swiper-active-switch",paginationVisibleClass:"swiper-visible-switch"};b=b||{};for(var L in K)if(L in b&&"object"==typeof b[L])for(var M in K[L])M in b[L]||(b[L][M]=K[L][M]);else L in b||(b[L]=K[L]);D.params=b,b.scrollContainer&&(b.freeMode=!0,b.freeModeFluid=!0),b.loop&&(b.resistance="100%");var N="horizontal"===b.mode,O=["mousedown","mousemove","mouseup"];D.browser.ie10&&(O=["MSPointerDown","MSPointerMove","MSPointerUp"]),D.browser.ie11&&(O=["pointerdown","pointermove","pointerup"]),D.touchEvents={touchStart:D.support.touch||!b.simulateTouch?"touchstart":O[0],touchMove:D.support.touch||!b.simulateTouch?"touchmove":O[1],touchEnd:D.support.touch||!b.simulateTouch?"touchend":O[2]};for(var P=D.container.childNodes.length-1;P>=0;P--)if(D.container.childNodes[P].className)for(var Q=D.container.childNodes[P].className.split(/\s+/),R=0;R<Q.length;R++)Q[R]===b.wrapperClass&&(E=D.container.childNodes[P]);D.wrapper=E,D._extendSwiperSlide=function(a){return a.append=function(){return b.loop?a.insertAfter(D.slides.length-D.loopedSlides):(D.wrapper.appendChild(a),D.reInit()),a},a.prepend=function(){return b.loop?(D.wrapper.insertBefore(a,D.slides[D.loopedSlides]),D.removeLoopedSlides(),D.calcSlides(),D.createLoop()):D.wrapper.insertBefore(a,D.wrapper.firstChild),D.reInit(),a},a.insertAfter=function(c){if("undefined"==typeof c)return!1;var d;return b.loop?(d=D.slides[c+1+D.loopedSlides],d?D.wrapper.insertBefore(a,d):D.wrapper.appendChild(a),D.removeLoopedSlides(),D.calcSlides(),D.createLoop()):(d=D.slides[c+1],D.wrapper.insertBefore(a,d)),D.reInit(),a},a.clone=function(){return D._extendSwiperSlide(a.cloneNode(!0))},a.remove=function(){D.wrapper.removeChild(a),D.reInit()},a.html=function(b){return"undefined"==typeof b?a.innerHTML:(a.innerHTML=b,a)},a.index=function(){for(var b,c=D.slides.length-1;c>=0;c--)a===D.slides[c]&&(b=c);return b},a.isActive=function(){return a.index()===D.activeIndex?!0:!1},a.swiperSlideDataStorage||(a.swiperSlideDataStorage={}),a.getData=function(b){return a.swiperSlideDataStorage[b]},a.setData=function(b,c){return a.swiperSlideDataStorage[b]=c,a},a.data=function(b,c){return"undefined"==typeof c?a.getAttribute("data-"+b):(a.setAttribute("data-"+b,c),a)},a.getWidth=function(b,c){return D.h.getWidth(a,b,c)},a.getHeight=function(b,c){return D.h.getHeight(a,b,c)},a.getOffset=function(){return D.h.getOffset(a)},a},D.calcSlides=function(a){var c=D.slides?D.slides.length:!1;D.slides=[],D.displaySlides=[];for(var d=0;d<D.wrapper.childNodes.length;d++)if(D.wrapper.childNodes[d].className)for(var e=D.wrapper.childNodes[d].className,f=e.split(/\s+/),i=0;i<f.length;i++)f[i]===b.slideClass&&D.slides.push(D.wrapper.childNodes[d]);for(d=D.slides.length-1;d>=0;d--)D._extendSwiperSlide(D.slides[d]);c!==!1&&(c!==D.slides.length||a)&&(h(),g(),D.updateActiveSlide(),D.params.pagination&&D.createPagination(),D.callPlugins("numberOfSlidesChanged"))},D.createSlide=function(a,c,d){c=c||D.params.slideClass,d=d||b.slideElement;var e=document.createElement(d);return e.innerHTML=a||"",e.className=c,D._extendSwiperSlide(e)},D.appendSlide=function(a,b,c){return a?a.nodeType?D._extendSwiperSlide(a).append():D.createSlide(a,b,c).append():void 0},D.prependSlide=function(a,b,c){return a?a.nodeType?D._extendSwiperSlide(a).prepend():D.createSlide(a,b,c).prepend():void 0},D.insertSlideAfter=function(a,b,c,d){return"undefined"==typeof a?!1:b.nodeType?D._extendSwiperSlide(b).insertAfter(a):D.createSlide(b,c,d).insertAfter(a)},D.removeSlide=function(a){if(D.slides[a]){if(b.loop){if(!D.slides[a+D.loopedSlides])return!1;D.slides[a+D.loopedSlides].remove(),D.removeLoopedSlides(),D.calcSlides(),D.createLoop()}else D.slides[a].remove();return!0}return!1},D.removeLastSlide=function(){return D.slides.length>0?(b.loop?(D.slides[D.slides.length-1-D.loopedSlides].remove(),D.removeLoopedSlides(),D.calcSlides(),D.createLoop()):D.slides[D.slides.length-1].remove(),!0):!1},D.removeAllSlides=function(){for(var a=D.slides.length,b=D.slides.length-1;b>=0;b--)D.slides[b].remove(),b===a-1&&D.setWrapperTranslate(0)},D.getSlide=function(a){return D.slides[a]},D.getLastSlide=function(){return D.slides[D.slides.length-1]},D.getFirstSlide=function(){return D.slides[0]},D.activeSlide=function(){return D.slides[D.activeIndex]},D.fireCallback=function(){var a=arguments[0];if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)"function"==typeof a[c]&&a[c](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);else"[object String]"===Object.prototype.toString.call(a)?b["on"+a]&&D.fireCallback(b["on"+a],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]):a(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},D.addCallback=function(a,b){var c,e=this;return e.params["on"+a]?d(this.params["on"+a])?this.params["on"+a].push(b):"function"==typeof this.params["on"+a]?(c=this.params["on"+a],this.params["on"+a]=[],this.params["on"+a].push(c),this.params["on"+a].push(b)):void 0:(this.params["on"+a]=[],this.params["on"+a].push(b))},D.removeCallbacks=function(a){D.params["on"+a]&&(D.params["on"+a]=null)};var S=[];for(var T in D.plugins)if(b[T]){var U=D.plugins[T](D,b[T]);U&&S.push(U)}D.callPlugins=function(a,b){b||(b={});for(var c=0;c<S.length;c++)a in S[c]&&S[c][a](b)},!D.browser.ie10&&!D.browser.ie11||b.onlyExternal||D.wrapper.classList.add("swiper-wp8-"+(N?"horizontal":"vertical")),b.freeMode&&(D.container.className+=" swiper-free-mode"),D.initialized=!1,D.init=function(a,c){var d=D.h.getWidth(D.container,!1,b.roundLengths),e=D.h.getHeight(D.container,!1,b.roundLengths);if(d!==D.width||e!==D.height||a){D.width=d,D.height=e;var f,g,h,i,j,k,l;J=N?d:e;var m=D.wrapper;if(a&&D.calcSlides(c),"auto"===b.slidesPerView){var n=0,o=0;b.slidesOffset>0&&(m.style.paddingLeft="",m.style.paddingRight="",m.style.paddingTop="",m.style.paddingBottom=""),m.style.width="",m.style.height="",b.offsetPxBefore>0&&(N?D.wrapperLeft=b.offsetPxBefore:D.wrapperTop=b.offsetPxBefore),b.offsetPxAfter>0&&(N?D.wrapperRight=b.offsetPxAfter:D.wrapperBottom=b.offsetPxAfter),b.centeredSlides&&(N?(D.wrapperLeft=(J-this.slides[0].getWidth(!0,b.roundLengths))/2,D.wrapperRight=(J-D.slides[D.slides.length-1].getWidth(!0,b.roundLengths))/2):(D.wrapperTop=(J-D.slides[0].getHeight(!0,b.roundLengths))/2,D.wrapperBottom=(J-D.slides[D.slides.length-1].getHeight(!0,b.roundLengths))/2)),N?(D.wrapperLeft>=0&&(m.style.paddingLeft=D.wrapperLeft+"px"),D.wrapperRight>=0&&(m.style.paddingRight=D.wrapperRight+"px")):(D.wrapperTop>=0&&(m.style.paddingTop=D.wrapperTop+"px"),D.wrapperBottom>=0&&(m.style.paddingBottom=D.wrapperBottom+"px")),k=0;var p=0;for(D.snapGrid=[],D.slidesGrid=[],h=0,l=0;l<D.slides.length;l++){f=D.slides[l].getWidth(!0,b.roundLengths),g=D.slides[l].getHeight(!0,b.roundLengths),b.calculateHeight&&(h=Math.max(h,g));var q=N?f:g;if(b.centeredSlides){var r=l===D.slides.length-1?0:D.slides[l+1].getWidth(!0,b.roundLengths),s=l===D.slides.length-1?0:D.slides[l+1].getHeight(!0,b.roundLengths),t=N?r:s;if(q>J){if(b.slidesPerViewFit)D.snapGrid.push(k+D.wrapperLeft),D.snapGrid.push(k+q-J+D.wrapperLeft);else for(var u=0;u<=Math.floor(q/(J+D.wrapperLeft));u++)D.snapGrid.push(0===u?k+D.wrapperLeft:k+D.wrapperLeft+J*u);D.slidesGrid.push(k+D.wrapperLeft)}else D.snapGrid.push(p),D.slidesGrid.push(p);p+=q/2+t/2}else{if(q>J)if(b.slidesPerViewFit)D.snapGrid.push(k),D.snapGrid.push(k+q-J);else if(0!==J)for(var v=0;v<=Math.floor(q/J);v++)D.snapGrid.push(k+J*v);else D.snapGrid.push(k);else D.snapGrid.push(k);D.slidesGrid.push(k)}k+=q,n+=f,o+=g}b.calculateHeight&&(D.height=h),N?(G=n+D.wrapperRight+D.wrapperLeft,b.cssWidthAndHeight&&"height"!==b.cssWidthAndHeight||(m.style.width=n+"px"),b.cssWidthAndHeight&&"width"!==b.cssWidthAndHeight||(m.style.height=D.height+"px")):(b.cssWidthAndHeight&&"height"!==b.cssWidthAndHeight||(m.style.width=D.width+"px"),b.cssWidthAndHeight&&"width"!==b.cssWidthAndHeight||(m.style.height=o+"px"),G=o+D.wrapperTop+D.wrapperBottom)}else if(b.scrollContainer)m.style.width="",m.style.height="",i=D.slides[0].getWidth(!0,b.roundLengths),j=D.slides[0].getHeight(!0,b.roundLengths),G=N?i:j,m.style.width=i+"px",m.style.height=j+"px",F=N?i:j;else{if(b.calculateHeight){for(h=0,j=0,N||(D.container.style.height=""),m.style.height="",l=0;l<D.slides.length;l++)D.slides[l].style.height="",h=Math.max(D.slides[l].getHeight(!0),h),N||(j+=D.slides[l].getHeight(!0));g=h,D.height=g,N?j=g:(J=g,D.container.style.height=J+"px")}else g=N?D.height:D.height/b.slidesPerView,b.roundLengths&&(g=Math.ceil(g)),j=N?D.height:D.slides.length*g;for(f=N?D.width/b.slidesPerView:D.width,b.roundLengths&&(f=Math.ceil(f)),i=N?D.slides.length*f:D.width,F=N?f:g,b.offsetSlidesBefore>0&&(N?D.wrapperLeft=F*b.offsetSlidesBefore:D.wrapperTop=F*b.offsetSlidesBefore),b.offsetSlidesAfter>0&&(N?D.wrapperRight=F*b.offsetSlidesAfter:D.wrapperBottom=F*b.offsetSlidesAfter),b.offsetPxBefore>0&&(N?D.wrapperLeft=b.offsetPxBefore:D.wrapperTop=b.offsetPxBefore),b.offsetPxAfter>0&&(N?D.wrapperRight=b.offsetPxAfter:D.wrapperBottom=b.offsetPxAfter),b.centeredSlides&&(N?(D.wrapperLeft=(J-F)/2,D.wrapperRight=(J-F)/2):(D.wrapperTop=(J-F)/2,D.wrapperBottom=(J-F)/2)),N?(D.wrapperLeft>0&&(m.style.paddingLeft=D.wrapperLeft+"px"),D.wrapperRight>0&&(m.style.paddingRight=D.wrapperRight+"px")):(D.wrapperTop>0&&(m.style.paddingTop=D.wrapperTop+"px"),D.wrapperBottom>0&&(m.style.paddingBottom=D.wrapperBottom+"px")),G=N?i+D.wrapperRight+D.wrapperLeft:j+D.wrapperTop+D.wrapperBottom,parseFloat(i)>0&&(!b.cssWidthAndHeight||"height"===b.cssWidthAndHeight)&&(m.style.width=i+"px"),parseFloat(j)>0&&(!b.cssWidthAndHeight||"width"===b.cssWidthAndHeight)&&(m.style.height=j+"px"),k=0,D.snapGrid=[],D.slidesGrid=[],l=0;l<D.slides.length;l++)D.snapGrid.push(k),D.slidesGrid.push(k),k+=F,parseFloat(f)>0&&(!b.cssWidthAndHeight||"height"===b.cssWidthAndHeight)&&(D.slides[l].style.width=f+"px"),parseFloat(g)>0&&(!b.cssWidthAndHeight||"width"===b.cssWidthAndHeight)&&(D.slides[l].style.height=g+"px")}D.initialized?(D.callPlugins("onInit"),b.onInit&&D.fireCallback(b.onInit,D)):(D.callPlugins("onFirstInit"),b.onFirstInit&&D.fireCallback(b.onFirstInit,D)),D.initialized=!0}},D.reInit=function(a){D.init(!0,a)},D.resizeFix=function(a){D.callPlugins("beforeResizeFix"),D.init(b.resizeReInit||a),b.freeMode?D.getWrapperTranslate()<-e()&&(D.setWrapperTransition(0),D.setWrapperTranslate(-e())):(D.swipeTo(b.loop?D.activeLoopIndex:D.activeIndex,0,!1),b.autoplay&&(D.support.transitions&&"undefined"!=typeof ab?"undefined"!=typeof ab&&(clearTimeout(ab),ab=void 0,D.startAutoplay()):"undefined"!=typeof bb&&(clearInterval(bb),bb=void 0,D.startAutoplay()))),D.callPlugins("afterResizeFix")},D.destroy=function(a){var c=D.h.removeEventListener,d="wrapper"===b.eventTarget?D.wrapper:D.container;if(D.browser.ie10||D.browser.ie11?(c(d,D.touchEvents.touchStart,p),c(document,D.touchEvents.touchMove,q),c(document,D.touchEvents.touchEnd,r)):(D.support.touch&&(c(d,"touchstart",p),c(d,"touchmove",q),c(d,"touchend",r)),b.simulateTouch&&(c(d,"mousedown",p),c(document,"mousemove",q),c(document,"mouseup",r))),b.autoResize&&c(window,"resize",D.resizeFix),h(),b.paginationClickable&&x(),b.mousewheelControl&&D._wheelEvent&&c(D.container,D._wheelEvent,j),b.keyboardControl&&c(document,"keydown",i),b.autoplay&&D.stopAutoplay(),a){D.wrapper.removeAttribute("style");for(var e=0;e<D.slides.length;e++)D.slides[e].removeAttribute("style")}D.callPlugins("onDestroy"),window.jQuery&&window.jQuery(D.container).data("swiper")&&window.jQuery(D.container).removeData("swiper"),window.Zepto&&window.Zepto(D.container).data("swiper")&&window.Zepto(D.container).removeData("swiper"),D=null},D.disableKeyboardControl=function(){b.keyboardControl=!1,D.h.removeEventListener(document,"keydown",i)},D.enableKeyboardControl=function(){b.keyboardControl=!0,D.h.addEventListener(document,"keydown",i)};var V=(new Date).getTime();if(D.disableMousewheelControl=function(){return D._wheelEvent?(b.mousewheelControl=!1,D.h.removeEventListener(D.container,D._wheelEvent,j),!0):!1},D.enableMousewheelControl=function(){return D._wheelEvent?(b.mousewheelControl=!0,D.h.addEventListener(D.container,D._wheelEvent,j),!0):!1},b.grabCursor){var W=D.container.style;W.cursor="move",W.cursor="grab",W.cursor="-moz-grab",W.cursor="-webkit-grab"}D.allowSlideClick=!0,D.allowLinks=!0;var X,Y,Z,$=!1,_=!0;D.swipeNext=function(a,c){"undefined"==typeof a&&(a=!0),!c&&b.loop&&D.fixLoop(),!c&&b.autoplay&&D.stopAutoplay(!0),D.callPlugins("onSwipeNext");var d=D.getWrapperTranslate().toFixed(2),f=d;if("auto"===b.slidesPerView){for(var g=0;g<D.snapGrid.length;g++)if(-d>=D.snapGrid[g].toFixed(2)&&-d<D.snapGrid[g+1].toFixed(2)){f=-D.snapGrid[g+1];break}}else{var h=F*b.slidesPerGroup;f=-(Math.floor(Math.abs(d)/Math.floor(h))*h+h)}return f<-e()&&(f=-e()),f===d?!1:(v(f,"next",{runCallbacks:a}),!0)},D.swipePrev=function(a,c){"undefined"==typeof a&&(a=!0),!c&&b.loop&&D.fixLoop(),!c&&b.autoplay&&D.stopAutoplay(!0),D.callPlugins("onSwipePrev");var d,e=Math.ceil(D.getWrapperTranslate());if("auto"===b.slidesPerView){d=0;for(var f=1;f<D.snapGrid.length;f++){if(-e===D.snapGrid[f]){d=-D.snapGrid[f-1];break}if(-e>D.snapGrid[f]&&-e<D.snapGrid[f+1]){d=-D.snapGrid[f];break}}}else{var g=F*b.slidesPerGroup;d=-(Math.ceil(-e/g)-1)*g}return d>0&&(d=0),d===e?!1:(v(d,"prev",{runCallbacks:a}),!0)},D.swipeReset=function(a){"undefined"==typeof a&&(a=!0),D.callPlugins("onSwipeReset");{var c,d=D.getWrapperTranslate(),f=F*b.slidesPerGroup;-e()}if("auto"===b.slidesPerView){c=0;for(var g=0;g<D.snapGrid.length;g++){if(-d===D.snapGrid[g])return;if(-d>=D.snapGrid[g]&&-d<D.snapGrid[g+1]){c=D.positions.diff>0?-D.snapGrid[g+1]:-D.snapGrid[g];break}}-d>=D.snapGrid[D.snapGrid.length-1]&&(c=-D.snapGrid[D.snapGrid.length-1]),d<=-e()&&(c=-e())}else c=0>d?Math.round(d/f)*f:0,d<=-e()&&(c=-e());return b.scrollContainer&&(c=0>d?d:0),c<-e()&&(c=-e()),b.scrollContainer&&J>F&&(c=0),c===d?!1:(v(c,"reset",{runCallbacks:a}),!0)},D.swipeTo=function(a,c,d){a=parseInt(a,10),D.callPlugins("onSwipeTo",{index:a,speed:c}),b.loop&&(a+=D.loopedSlides);var f=D.getWrapperTranslate();if(!(!isFinite(a)||a>D.slides.length-1||0>a)){var g;return g="auto"===b.slidesPerView?-D.slidesGrid[a]:-a*F,g<-e()&&(g=-e()),g===f?!1:("undefined"==typeof d&&(d=!0),v(g,"to",{index:a,speed:c,runCallbacks:d}),!0)}},D._queueStartCallbacks=!1,D._queueEndCallbacks=!1,D.updateActiveSlide=function(a){if(D.initialized&&0!==D.slides.length){D.previousIndex=D.activeIndex,"undefined"==typeof a&&(a=D.getWrapperTranslate()),a>0&&(a=0);var c;if("auto"===b.slidesPerView){if(D.activeIndex=D.slidesGrid.indexOf(-a),D.activeIndex<0){for(c=0;c<D.slidesGrid.length-1&&!(-a>D.slidesGrid[c]&&-a<D.slidesGrid[c+1]);c++);var d=Math.abs(D.slidesGrid[c]+a),e=Math.abs(D.slidesGrid[c+1]+a);
D.activeIndex=e>=d?c:c+1}}else D.activeIndex=Math[b.visibilityFullFit?"ceil":"round"](-a/F);if(D.activeIndex===D.slides.length&&(D.activeIndex=D.slides.length-1),D.activeIndex<0&&(D.activeIndex=0),D.slides[D.activeIndex]){if(D.calcVisibleSlides(a),D.support.classList){var f;for(c=0;c<D.slides.length;c++)f=D.slides[c],f.classList.remove(b.slideActiveClass),D.visibleSlides.indexOf(f)>=0?f.classList.add(b.slideVisibleClass):f.classList.remove(b.slideVisibleClass);D.slides[D.activeIndex].classList.add(b.slideActiveClass)}else{var g=new RegExp("\\s*"+b.slideActiveClass),h=new RegExp("\\s*"+b.slideVisibleClass);for(c=0;c<D.slides.length;c++)D.slides[c].className=D.slides[c].className.replace(g,"").replace(h,""),D.visibleSlides.indexOf(D.slides[c])>=0&&(D.slides[c].className+=" "+b.slideVisibleClass);D.slides[D.activeIndex].className+=" "+b.slideActiveClass}if(b.loop){var i=D.loopedSlides;D.activeLoopIndex=D.activeIndex-i,D.activeLoopIndex>=D.slides.length-2*i&&(D.activeLoopIndex=D.slides.length-2*i-D.activeLoopIndex),D.activeLoopIndex<0&&(D.activeLoopIndex=D.slides.length-2*i+D.activeLoopIndex),D.activeLoopIndex<0&&(D.activeLoopIndex=0)}else D.activeLoopIndex=D.activeIndex;b.pagination&&D.updatePagination(a)}}},D.createPagination=function(a){if(b.paginationClickable&&D.paginationButtons&&x(),D.paginationContainer=b.pagination.nodeType?b.pagination:c(b.pagination)[0],b.createPagination){var d="",e=D.slides.length,f=e;b.loop&&(f-=2*D.loopedSlides);for(var g=0;f>g;g++)d+="<"+b.paginationElement+' class="'+b.paginationElementClass+'"></'+b.paginationElement+">";D.paginationContainer.innerHTML=d}D.paginationButtons=c("."+b.paginationElementClass,D.paginationContainer),a||D.updatePagination(),D.callPlugins("onCreatePagination"),b.paginationClickable&&y()},D.updatePagination=function(a){if(b.pagination&&!(D.slides.length<1)){var d=c("."+b.paginationActiveClass,D.paginationContainer);if(d){var e=D.paginationButtons;if(0!==e.length){for(var f=0;f<e.length;f++)e[f].className=b.paginationElementClass;var g=b.loop?D.loopedSlides:0;if(b.paginationAsRange){D.visibleSlides||D.calcVisibleSlides(a);var h,i=[];for(h=0;h<D.visibleSlides.length;h++){var j=D.slides.indexOf(D.visibleSlides[h])-g;b.loop&&0>j&&(j=D.slides.length-2*D.loopedSlides+j),b.loop&&j>=D.slides.length-2*D.loopedSlides&&(j=D.slides.length-2*D.loopedSlides-j,j=Math.abs(j)),i.push(j)}for(h=0;h<i.length;h++)e[i[h]]&&(e[i[h]].className+=" "+b.paginationVisibleClass);b.loop?void 0!==e[D.activeLoopIndex]&&(e[D.activeLoopIndex].className+=" "+b.paginationActiveClass):e[D.activeIndex]&&(e[D.activeIndex].className+=" "+b.paginationActiveClass)}else b.loop?e[D.activeLoopIndex]&&(e[D.activeLoopIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass):e[D.activeIndex]&&(e[D.activeIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass)}}}},D.calcVisibleSlides=function(a){var c=[],d=0,e=0,f=0;N&&D.wrapperLeft>0&&(a+=D.wrapperLeft),!N&&D.wrapperTop>0&&(a+=D.wrapperTop);for(var g=0;g<D.slides.length;g++){d+=e,e="auto"===b.slidesPerView?N?D.h.getWidth(D.slides[g],!0,b.roundLengths):D.h.getHeight(D.slides[g],!0,b.roundLengths):F,f=d+e;var h=!1;b.visibilityFullFit?(d>=-a&&-a+J>=f&&(h=!0),-a>=d&&f>=-a+J&&(h=!0)):(f>-a&&-a+J>=f&&(h=!0),d>=-a&&-a+J>d&&(h=!0),-a>d&&f>-a+J&&(h=!0)),h&&c.push(D.slides[g])}0===c.length&&(c=[D.slides[D.activeIndex]]),D.visibleSlides=c};var ab,bb;D.startAutoplay=function(){if(D.support.transitions){if("undefined"!=typeof ab)return!1;if(!b.autoplay)return;D.callPlugins("onAutoplayStart"),b.onAutoplayStart&&D.fireCallback(b.onAutoplayStart,D),A()}else{if("undefined"!=typeof bb)return!1;if(!b.autoplay)return;D.callPlugins("onAutoplayStart"),b.onAutoplayStart&&D.fireCallback(b.onAutoplayStart,D),bb=setInterval(function(){b.loop?(D.fixLoop(),D.swipeNext(!0,!0)):D.swipeNext(!0,!0)||(b.autoplayStopOnLast?(clearInterval(bb),bb=void 0):D.swipeTo(0))},b.autoplay)}},D.stopAutoplay=function(a){if(D.support.transitions){if(!ab)return;ab&&clearTimeout(ab),ab=void 0,a&&!b.autoplayDisableOnInteraction&&D.wrapperTransitionEnd(function(){A()}),D.callPlugins("onAutoplayStop"),b.onAutoplayStop&&D.fireCallback(b.onAutoplayStop,D)}else bb&&clearInterval(bb),bb=void 0,D.callPlugins("onAutoplayStop"),b.onAutoplayStop&&D.fireCallback(b.onAutoplayStop,D)},D.loopCreated=!1,D.removeLoopedSlides=function(){if(D.loopCreated)for(var a=0;a<D.slides.length;a++)D.slides[a].getData("looped")===!0&&D.wrapper.removeChild(D.slides[a])},D.createLoop=function(){if(0!==D.slides.length){D.loopedSlides="auto"===b.slidesPerView?b.loopedSlides||1:Math.floor(b.slidesPerView)+b.loopAdditionalSlides,D.loopedSlides>D.slides.length&&(D.loopedSlides=D.slides.length);var a,c="",d="",e="",f=D.slides.length,g=Math.floor(D.loopedSlides/f),h=D.loopedSlides%f;for(a=0;g*f>a;a++){var i=a;if(a>=f){var j=Math.floor(a/f);i=a-f*j}e+=D.slides[i].outerHTML}for(a=0;h>a;a++)d+=u(b.slideDuplicateClass,D.slides[a].outerHTML);for(a=f-h;f>a;a++)c+=u(b.slideDuplicateClass,D.slides[a].outerHTML);var k=c+e+E.innerHTML+e+d;for(E.innerHTML=k,D.loopCreated=!0,D.calcSlides(),a=0;a<D.slides.length;a++)(a<D.loopedSlides||a>=D.slides.length-D.loopedSlides)&&D.slides[a].setData("looped",!0);D.callPlugins("onCreateLoop")}},D.fixLoop=function(){var a;D.activeIndex<D.loopedSlides?(a=D.slides.length-3*D.loopedSlides+D.activeIndex,D.swipeTo(a,0,!1)):("auto"===b.slidesPerView&&D.activeIndex>=2*D.loopedSlides||D.activeIndex>D.slides.length-2*b.slidesPerView)&&(a=-D.slides.length+D.activeIndex+D.loopedSlides,D.swipeTo(a,0,!1))},D.loadSlides=function(){var a="";D.activeLoaderIndex=0;for(var c=b.loader.slides,d=b.loader.loadAllSlides?c.length:b.slidesPerView*(1+b.loader.surroundGroups),e=0;d>e;e++)a+="outer"===b.loader.slidesHTMLType?c[e]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+e+'">'+c[e]+"</"+b.slideElement+">";D.wrapper.innerHTML=a,D.calcSlides(!0),b.loader.loadAllSlides||D.wrapperTransitionEnd(D.reloadSlides,!0)},D.reloadSlides=function(){var a=b.loader.slides,c=parseInt(D.activeSlide().data("swiperindex"),10);if(!(0>c||c>a.length-1)){D.activeLoaderIndex=c;var d=Math.max(0,c-b.slidesPerView*b.loader.surroundGroups),e=Math.min(c+b.slidesPerView*(1+b.loader.surroundGroups)-1,a.length-1);if(c>0){var f=-F*(c-d);D.setWrapperTranslate(f),D.setWrapperTransition(0)}var g;if("reload"===b.loader.logic){D.wrapper.innerHTML="";var h="";for(g=d;e>=g;g++)h+="outer"===b.loader.slidesHTMLType?a[g]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+g+'">'+a[g]+"</"+b.slideElement+">";D.wrapper.innerHTML=h}else{var i=1e3,j=0;for(g=0;g<D.slides.length;g++){var k=D.slides[g].data("swiperindex");d>k||k>e?D.wrapper.removeChild(D.slides[g]):(i=Math.min(k,i),j=Math.max(k,j))}for(g=d;e>=g;g++){var l;i>g&&(l=document.createElement(b.slideElement),l.className=b.slideClass,l.setAttribute("data-swiperindex",g),l.innerHTML=a[g],D.wrapper.insertBefore(l,D.wrapper.firstChild)),g>j&&(l=document.createElement(b.slideElement),l.className=b.slideClass,l.setAttribute("data-swiperindex",g),l.innerHTML=a[g],D.wrapper.appendChild(l))}}D.reInit(!0)}},B()}};Swiper.prototype={plugins:{},wrapperTransitionEnd:function(a,b){"use strict";function c(h){if(h.target===f&&(a(e),e.params.queueEndCallbacks&&(e._queueEndCallbacks=!1),!b))for(d=0;d<g.length;d++)e.h.removeEventListener(f,g[d],c)}var d,e=this,f=e.wrapper,g=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"];if(a)for(d=0;d<g.length;d++)e.h.addEventListener(f,g[d],c)},getWrapperTranslate:function(a){"use strict";var b,c,d,e,f=this.wrapper;return"undefined"==typeof a&&(a="horizontal"===this.params.mode?"x":"y"),this.support.transforms&&this.params.useCSS3Transforms?(d=window.getComputedStyle(f,null),window.WebKitCSSMatrix?e=new WebKitCSSMatrix("none"===d.webkitTransform?"":d.webkitTransform):(e=d.MozTransform||d.OTransform||d.MsTransform||d.msTransform||d.transform||d.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),b=e.toString().split(",")),"x"===a&&(c=window.WebKitCSSMatrix?e.m41:parseFloat(16===b.length?b[12]:b[4])),"y"===a&&(c=window.WebKitCSSMatrix?e.m42:parseFloat(16===b.length?b[13]:b[5]))):("x"===a&&(c=parseFloat(f.style.left,10)||0),"y"===a&&(c=parseFloat(f.style.top,10)||0)),c||0},setWrapperTranslate:function(a,b,c){"use strict";var d,e=this.wrapper.style,f={x:0,y:0,z:0};3===arguments.length?(f.x=a,f.y=b,f.z=c):("undefined"==typeof b&&(b="horizontal"===this.params.mode?"x":"y"),f[b]=a),this.support.transforms&&this.params.useCSS3Transforms?(d=this.support.transforms3d?"translate3d("+f.x+"px, "+f.y+"px, "+f.z+"px)":"translate("+f.x+"px, "+f.y+"px)",e.webkitTransform=e.MsTransform=e.msTransform=e.MozTransform=e.OTransform=e.transform=d):(e.left=f.x+"px",e.top=f.y+"px"),this.callPlugins("onSetWrapperTransform",f),this.params.onSetWrapperTransform&&this.fireCallback(this.params.onSetWrapperTransform,this,f)},setWrapperTransition:function(a){"use strict";var b=this.wrapper.style;b.webkitTransitionDuration=b.MsTransitionDuration=b.msTransitionDuration=b.MozTransitionDuration=b.OTransitionDuration=b.transitionDuration=a/1e3+"s",this.callPlugins("onSetWrapperTransition",{duration:a}),this.params.onSetWrapperTransition&&this.fireCallback(this.params.onSetWrapperTransition,this,a)},h:{getWidth:function(a,b,c){"use strict";var d=window.getComputedStyle(a,null).getPropertyValue("width"),e=parseFloat(d);return(isNaN(e)||d.indexOf("%")>0||0>e)&&(e=a.offsetWidth-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-left"))-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-right"))),b&&(e+=parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-left"))+parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-right"))),c?Math.ceil(e):e},getHeight:function(a,b,c){"use strict";if(b)return a.offsetHeight;var d=window.getComputedStyle(a,null).getPropertyValue("height"),e=parseFloat(d);return(isNaN(e)||d.indexOf("%")>0||0>e)&&(e=a.offsetHeight-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-top"))-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-bottom"))),b&&(e+=parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-top"))+parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-bottom"))),c?Math.ceil(e):e},getOffset:function(a){"use strict";var b=a.getBoundingClientRect(),c=document.body,d=a.clientTop||c.clientTop||0,e=a.clientLeft||c.clientLeft||0,f=window.pageYOffset||a.scrollTop,g=window.pageXOffset||a.scrollLeft;return document.documentElement&&!window.pageYOffset&&(f=document.documentElement.scrollTop,g=document.documentElement.scrollLeft),{top:b.top+f-d,left:b.left+g-e}},windowWidth:function(){"use strict";return window.innerWidth?window.innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:void 0},windowHeight:function(){"use strict";return window.innerHeight?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:void 0},windowScroll:function(){"use strict";return"undefined"!=typeof pageYOffset?{left:window.pageXOffset,top:window.pageYOffset}:document.documentElement?{left:document.documentElement.scrollLeft,top:document.documentElement.scrollTop}:void 0},addEventListener:function(a,b,c,d){"use strict";"undefined"==typeof d&&(d=!1),a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},removeEventListener:function(a,b,c,d){"use strict";"undefined"==typeof d&&(d=!1),a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)}},setTransform:function(a,b){"use strict";var c=a.style;c.webkitTransform=c.MsTransform=c.msTransform=c.MozTransform=c.OTransform=c.transform=b},setTranslate:function(a,b){"use strict";var c=a.style,d={x:b.x||0,y:b.y||0,z:b.z||0},e=this.support.transforms3d?"translate3d("+d.x+"px,"+d.y+"px,"+d.z+"px)":"translate("+d.x+"px,"+d.y+"px)";c.webkitTransform=c.MsTransform=c.msTransform=c.MozTransform=c.OTransform=c.transform=e,this.support.transforms||(c.left=d.x+"px",c.top=d.y+"px")},setTransition:function(a,b){"use strict";var c=a.style;c.webkitTransitionDuration=c.MsTransitionDuration=c.msTransitionDuration=c.MozTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms"},support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){"use strict";return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){"use strict";var a=document.createElement("div").style;return"webkitPerspective"in a||"MozPerspective"in a||"OPerspective"in a||"MsPerspective"in a||"perspective"in a}(),transforms:window.Modernizr&&Modernizr.csstransforms===!0||function(){"use strict";var a=document.createElement("div").style;return"transform"in a||"WebkitTransform"in a||"MozTransform"in a||"msTransform"in a||"MsTransform"in a||"OTransform"in a}(),transitions:window.Modernizr&&Modernizr.csstransitions===!0||function(){"use strict";var a=document.createElement("div").style;return"transition"in a||"WebkitTransition"in a||"MozTransition"in a||"msTransition"in a||"MsTransition"in a||"OTransition"in a}(),classList:function(){"use strict";var a=document.createElement("div");return"classList"in a}()},browser:{ie8:function(){"use strict";var a=-1;if("Microsoft Internet Explorer"===navigator.appName){var b=navigator.userAgent,c=new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);null!==c.exec(b)&&(a=parseFloat(RegExp.$1))}return-1!==a&&9>a}(),ie10:window.navigator.msPointerEnabled,ie11:window.navigator.pointerEnabled}},(window.jQuery||window.Zepto)&&!function(a){"use strict";a.fn.swiper=function(b){var c;return this.each(function(d){var e=a(this),f=new Swiper(e[0],b);d||(c=f),e.data("swiper",f)}),c}}(window.jQuery||window.Zepto),"undefined"!=typeof module?module.exports=Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return Swiper});
;
/*!
	Colorbox v1.4.26 - 2013-06-30
	jQuery lightbox and modal window plugin
	(c) 2013 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(e,t,i){function o(i,o,n){var r=t.createElement(i);return o&&(r.id=et+o),n&&(r.style.cssText=n),e(r)}function n(){return i.innerHeight?i.innerHeight:e(i).height()}function r(e){var t=E.length,i=(j+e)%t;return 0>i?t+i:i}function l(e,t){return Math.round((/%/.test(e)?("x"===t?H.width():n())/100:1)*parseInt(e,10))}function a(e,t){return e.photo||e.photoRegex.test(t)}function h(e,t){return e.retinaUrl&&i.devicePixelRatio>1?t.replace(e.photoRegex,e.retinaSuffix):t}function s(e){"contains"in v[0]&&!v[0].contains(e.target)&&(e.stopPropagation(),v.focus())}function d(){var t,i=e.data(A,Z);null==i?(O=e.extend({},Y),console&&console.log&&console.log("Error: cboxElement missing settings object")):O=e.extend({},i);for(t in O)e.isFunction(O[t])&&"on"!==t.slice(0,2)&&(O[t]=O[t].call(A));O.rel=O.rel||A.rel||e(A).data("rel")||"nofollow",O.href=O.href||e(A).attr("href"),O.title=O.title||A.title,"string"==typeof O.href&&(O.href=e.trim(O.href))}function c(i,o){e(t).trigger(i),ht.trigger(i),e.isFunction(o)&&o.call(A)}function u(){var e,t,i,o,n,r=et+"Slideshow_",l="click."+et;O.slideshow&&E[1]?(t=function(){clearTimeout(e)},i=function(){(O.loop||E[j+1])&&(e=setTimeout(J.next,O.slideshowSpeed))},o=function(){R.html(O.slideshowStop).unbind(l).one(l,n),ht.bind(nt,i).bind(ot,t).bind(rt,n),v.removeClass(r+"off").addClass(r+"on")},n=function(){t(),ht.unbind(nt,i).unbind(ot,t).unbind(rt,n),R.html(O.slideshowStart).unbind(l).one(l,function(){J.next(),o()}),v.removeClass(r+"on").addClass(r+"off")},O.slideshowAuto?o():n()):v.removeClass(r+"off "+r+"on")}function p(i){G||(A=i,d(),E=e(A),j=0,"nofollow"!==O.rel&&(E=e("."+tt).filter(function(){var t,i=e.data(this,Z);return i&&(t=e(this).data("rel")||i.rel||this.rel),t===O.rel}),j=E.index(A),-1===j&&(E=E.add(A),j=E.length-1)),g.css({opacity:parseFloat(O.opacity),cursor:O.overlayClose?"pointer":"auto",visibility:"visible"}).show(),V&&v.add(g).removeClass(V),O.className&&v.add(g).addClass(O.className),V=O.className,O.closeButton?P.html(O.close).appendTo(x):P.appendTo("<div/>"),$||($=q=!0,v.css({visibility:"hidden",display:"block"}),W=o(st,"LoadedContent","width:0; height:0; overflow:hidden").appendTo(x),_=b.height()+k.height()+x.outerHeight(!0)-x.height(),D=T.width()+C.width()+x.outerWidth(!0)-x.width(),N=W.outerHeight(!0),z=W.outerWidth(!0),O.w=l(O.initialWidth,"x"),O.h=l(O.initialHeight,"y"),J.position(),u(),c(it,O.onOpen),B.add(S).hide(),v.focus(),O.trapFocus&&t.addEventListener&&(t.addEventListener("focus",s,!0),ht.one(lt,function(){t.removeEventListener("focus",s,!0)})),O.returnFocus&&ht.one(lt,function(){e(A).focus()})),w())}function f(){!v&&t.body&&(X=!1,H=e(i),v=o(st).attr({id:Z,"class":e.support.opacity===!1?et+"IE":"",role:"dialog",tabindex:"-1"}).hide(),g=o(st,"Overlay").hide(),L=e([o(st,"LoadingOverlay")[0],o(st,"LoadingGraphic")[0]]),y=o(st,"Wrapper"),x=o(st,"Content").append(S=o(st,"Title"),M=o(st,"Current"),K=e('<button type="button"/>').attr({id:et+"Previous"}),I=e('<button type="button"/>').attr({id:et+"Next"}),R=o("button","Slideshow"),L),P=e('<button type="button"/>').attr({id:et+"Close"}),y.append(o(st).append(o(st,"TopLeft"),b=o(st,"TopCenter"),o(st,"TopRight")),o(st,!1,"clear:left").append(T=o(st,"MiddleLeft"),x,C=o(st,"MiddleRight")),o(st,!1,"clear:left").append(o(st,"BottomLeft"),k=o(st,"BottomCenter"),o(st,"BottomRight"))).find("div div").css({"float":"left"}),F=o(st,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),B=I.add(K).add(M).add(R),e(t.body).append(g,v.append(y,F)))}function m(){function i(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||e.ctrlKey||(e.preventDefault(),p(this))}return v?(X||(X=!0,I.click(function(){J.next()}),K.click(function(){J.prev()}),P.click(function(){J.close()}),g.click(function(){O.overlayClose&&J.close()}),e(t).bind("keydown."+et,function(e){var t=e.keyCode;$&&O.escKey&&27===t&&(e.preventDefault(),J.close()),$&&O.arrowKey&&E[1]&&!e.altKey&&(37===t?(e.preventDefault(),K.click()):39===t&&(e.preventDefault(),I.click()))}),e.isFunction(e.fn.on)?e(t).on("click."+et,"."+tt,i):e("."+tt).live("click."+et,i)),!0):!1}function w(){var n,r,s,u=J.prep,p=++dt;q=!0,U=!1,A=E[j],d(),c(at),c(ot,O.onLoad),O.h=O.height?l(O.height,"y")-N-_:O.innerHeight&&l(O.innerHeight,"y"),O.w=O.width?l(O.width,"x")-z-D:O.innerWidth&&l(O.innerWidth,"x"),O.mw=O.w,O.mh=O.h,O.maxWidth&&(O.mw=l(O.maxWidth,"x")-z-D,O.mw=O.w&&O.w<O.mw?O.w:O.mw),O.maxHeight&&(O.mh=l(O.maxHeight,"y")-N-_,O.mh=O.h&&O.h<O.mh?O.h:O.mh),n=O.href,Q=setTimeout(function(){L.show()},100),O.inline?(s=o(st).hide().insertBefore(e(n)[0]),ht.one(at,function(){s.replaceWith(W.children())}),u(e(n))):O.iframe?u(" "):O.html?u(O.html):a(O,n)?(n=h(O,n),U=t.createElement("img"),e(U).addClass(et+"Photo").bind("error",function(){O.title=!1,u(o(st,"Error").html(O.imgError))}).one("load",function(){var t;p===dt&&(U.alt=e(A).attr("alt")||e(A).attr("data-alt")||"",O.retinaImage&&i.devicePixelRatio>1&&(U.height=U.height/i.devicePixelRatio,U.width=U.width/i.devicePixelRatio),O.scalePhotos&&(r=function(){U.height-=U.height*t,U.width-=U.width*t},O.mw&&U.width>O.mw&&(t=(U.width-O.mw)/U.width,r()),O.mh&&U.height>O.mh&&(t=(U.height-O.mh)/U.height,r())),O.h&&(U.style.marginTop=Math.max(O.mh-U.height,0)/2+"px"),E[1]&&(O.loop||E[j+1])&&(U.style.cursor="pointer",U.onclick=function(){J.next()}),U.style.width=U.width+"px",U.style.height=U.height+"px",setTimeout(function(){u(U)},1))}),setTimeout(function(){U.src=n},1)):n&&F.load(n,O.data,function(t,i){p===dt&&u("error"===i?o(st,"Error").html(O.xhrError):e(this).contents())})}var g,v,y,x,b,T,C,k,E,H,W,F,L,S,M,R,I,K,P,B,O,_,D,N,z,A,j,U,$,q,G,Q,J,V,X,Y={transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:!1,returnFocus:!0,trapFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp)((#|\?).*)?$/i,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0},Z="colorbox",et="cbox",tt=et+"Element",it=et+"_open",ot=et+"_load",nt=et+"_complete",rt=et+"_cleanup",lt=et+"_closed",at=et+"_purge",ht=e("<a/>"),st="div",dt=0,ct={};e.colorbox||(e(f),J=e.fn[Z]=e[Z]=function(t,i){var o=this;if(t=t||{},f(),m()){if(e.isFunction(o))o=e("<a/>"),t.open=!0;else if(!o[0])return o;i&&(t.onComplete=i),o.each(function(){e.data(this,Z,e.extend({},e.data(this,Z)||Y,t))}).addClass(tt),(e.isFunction(t.open)&&t.open.call(o)||t.open)&&p(o[0])}return o},J.position=function(t,i){function o(){b[0].style.width=k[0].style.width=x[0].style.width=parseInt(v[0].style.width,10)-D+"px",x[0].style.height=T[0].style.height=C[0].style.height=parseInt(v[0].style.height,10)-_+"px"}var r,a,h,s=0,d=0,c=v.offset();if(H.unbind("resize."+et),v.css({top:-9e4,left:-9e4}),a=H.scrollTop(),h=H.scrollLeft(),O.fixed?(c.top-=a,c.left-=h,v.css({position:"fixed"})):(s=a,d=h,v.css({position:"absolute"})),d+=O.right!==!1?Math.max(H.width()-O.w-z-D-l(O.right,"x"),0):O.left!==!1?l(O.left,"x"):Math.round(Math.max(H.width()-O.w-z-D,0)/2),s+=O.bottom!==!1?Math.max(n()-O.h-N-_-l(O.bottom,"y"),0):O.top!==!1?l(O.top,"y"):Math.round(Math.max(n()-O.h-N-_,0)/2),v.css({top:c.top,left:c.left,visibility:"visible"}),y[0].style.width=y[0].style.height="9999px",r={width:O.w+z+D,height:O.h+N+_,top:s,left:d},t){var u=0;e.each(r,function(e){return r[e]!==ct[e]?(u=t,void 0):void 0}),t=u}ct=r,t||v.css(r),v.dequeue().animate(r,{duration:t||0,complete:function(){o(),q=!1,y[0].style.width=O.w+z+D+"px",y[0].style.height=O.h+N+_+"px",O.reposition&&setTimeout(function(){H.bind("resize."+et,J.position)},1),i&&i()},step:o})},J.resize=function(e){var t;$&&(e=e||{},e.width&&(O.w=l(e.width,"x")-z-D),e.innerWidth&&(O.w=l(e.innerWidth,"x")),W.css({width:O.w}),e.height&&(O.h=l(e.height,"y")-N-_),e.innerHeight&&(O.h=l(e.innerHeight,"y")),e.innerHeight||e.height||(t=W.scrollTop(),W.css({height:"auto"}),O.h=W.height()),W.css({height:O.h}),t&&W.scrollTop(t),J.position("none"===O.transition?0:O.speed))},J.prep=function(i){function n(){return O.w=O.w||W.width(),O.w=O.mw&&O.mw<O.w?O.mw:O.w,O.w}function l(){return O.h=O.h||W.height(),O.h=O.mh&&O.mh<O.h?O.mh:O.h,O.h}if($){var s,d="none"===O.transition?0:O.speed;W.empty().remove(),W=o(st,"LoadedContent").append(i),W.hide().appendTo(F.show()).css({width:n(),overflow:O.scrolling?"auto":"hidden"}).css({height:l()}).prependTo(x),F.hide(),e(U).css({"float":"none"}),s=function(){function i(){e.support.opacity===!1&&v[0].style.removeAttribute("filter")}var n,l,s=E.length,u="frameBorder",p="allowTransparency";$&&(l=function(){clearTimeout(Q),L.hide(),c(nt,O.onComplete)},S.html(O.title).add(W).show(),s>1?("string"==typeof O.current&&M.html(O.current.replace("{current}",j+1).replace("{total}",s)).show(),I[O.loop||s-1>j?"show":"hide"]().html(O.next),K[O.loop||j?"show":"hide"]().html(O.previous),O.slideshow&&R.show(),O.preloading&&e.each([r(-1),r(1)],function(){var i,o,n=E[this],r=e.data(n,Z);r&&r.href?(i=r.href,e.isFunction(i)&&(i=i.call(n))):i=e(n).attr("href"),i&&a(r,i)&&(i=h(r,i),o=t.createElement("img"),o.src=i)})):B.hide(),O.iframe?(n=o("iframe")[0],u in n&&(n[u]=0),p in n&&(n[p]="true"),O.scrolling||(n.scrolling="no"),e(n).attr({src:O.href,name:(new Date).getTime(),"class":et+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",l).appendTo(W),ht.one(at,function(){n.src="//about:blank"}),O.fastIframe&&e(n).trigger("load")):l(),"fade"===O.transition?v.fadeTo(d,1,i):i())},"fade"===O.transition?v.fadeTo(d,0,function(){J.position(0,s)}):J.position(d,s)}},J.next=function(){!q&&E[1]&&(O.loop||E[j+1])&&(j=r(1),p(E[j]))},J.prev=function(){!q&&E[1]&&(O.loop||j)&&(j=r(-1),p(E[j]))},J.close=function(){$&&!G&&(G=!0,$=!1,c(rt,O.onCleanup),H.unbind("."+et),g.fadeTo(O.fadeOut||0,0),v.stop().fadeTo(O.fadeOut||0,0,function(){v.add(g).css({opacity:1,cursor:"auto"}).hide(),c(at),W.empty().remove(),setTimeout(function(){G=!1,c(lt,O.onClosed)},1)}))},J.remove=function(){v&&(v.stop(),e.colorbox.close(),v.stop().remove(),g.remove(),G=!1,v=null,e("."+tt).removeData(Z).removeClass(tt),e(t).unbind("click."+et))},J.element=function(){return e(A)},J.settings=Y)})(jQuery,document,window);;
(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    $('a, area, input', context)
      .filter('.colorbox')
      .once('init-colorbox-processed')
      .colorbox(settings.colorbox);
  }
};

{
  $(document).bind('cbox_complete', function () {
    Drupal.attachBehaviors('#cboxLoadedContent');
  });
}

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxLoad = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    $.urlParams = function (url) {
      var p = {},
          e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&=]+)=?([^&]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, ' ')); },
          q = url.split('?');
      while (e = r.exec(q[1])) {
        e[1] = d(e[1]);
        e[2] = d(e[2]);
        switch (e[2].toLowerCase()) {
          case 'true':
          case 'yes':
            e[2] = true;
            break;
          case 'false':
          case 'no':
            e[2] = false;
            break;
        }
        if (e[1] == 'width') { e[1] = 'innerWidth'; }
        if (e[1] == 'height') { e[1] = 'innerHeight'; }
        p[e[1]] = e[2];
      }
      return p;
    };
    $('a, area, input', context)
      .filter('.colorbox-load')
      .once('init-colorbox-load-processed', function () {
        var params = $.urlParams($(this).attr('href'));
        $(this).colorbox($.extend({}, settings.colorbox, params));
      });
  }
};

})(jQuery);
;
!function(t){Drupal.behaviors.image_caption={attach:function(a){t("img.caption",a).once("caption",function(){var a=t(this);a.bind("load",function(){t.fn.imageCaption(t(this))})})}},t.fn.imageCaption=function(t){t.once("magic",function(){var a=t.width()?t.width():!1,i=t.height()?t.height():!1,n=t.attr("title");if(n){var e={};t.css("width")&&(e.width=t.css("width")),t.css("float")?e["float"]=t.css("float"):t.attr("align")&&(e["float"]=t.attr("align")),t.css("clear")&&(e.clear=t.css("clear"));var s="normal";e["float"]&&(s=e["float"]),t.removeAttr("width"),t.removeAttr("height"),t.css("width",""),t.css("height",""),t.removeAttr("align"),t.removeAttr("style"),t.wrap('<span class="image-caption-container" style="display:inline-block;"></span>'),t.parent().addClass("image-caption-container-"+s).css(e),a&&(t.width(a),t.parent().width(a)),i&&t.height(i),t.parent().append('<span style="display:block;" class="image-caption">'+n+"</span>")}})}}(jQuery);;
(function ($) {
  // Remove the prediction box when not active.
  $.fn.scmp_search_blur_predictions = function($box) {
    if (!Drupal.settings.scmpSearch.active && $box.length) {
      //$box.remove();
    }
  };
  Drupal.behaviors.predictiveSearch = {
    attach: function (context) {
      $('#masthead input[name="apachesolr_panels_search_form"]', context).once('predict', function() {
        // When key is up.
        $(this).keyup(function(handler) {
          // If key is not up / down and will try to do AJAX search.
          if (handler.which != 38 && handler.which != 40) {
            var search_term = $(this).val();
            // Only engage AJAX search on terms greater than 3 characters long.
            if (search_term.length < 3) {
              scmp_search_get_prediction_box().remove();
              return;
            }
            // Do search.
            scmp_search_predict(search_term, this);
          }
        }).blur(function() {
          // When blur of the input, try to remove prediction box.
          var $predictionBox = scmp_search_get_prediction_box();
          // Active if click any one of results.
          $predictionBox.find('a').once('active', function() {
            $(this).click(function (){
              Drupal.settings.scmpSearch.active = true;
            });
          });
          setTimeout(function() {
            jQuery.fn.scmp_search_blur_predictions($predictionBox);
          }, 200);
        }).focus(function () {
          Drupal.settings.scmpSearch.active = false;
          var search_term = $(this).val();
          // Only engage ajax search on terms greater than 3 characters long.
          if (search_term.length < 3) {
            return;
          }
          if (!scmp_search_get_prediction_box().length) {
            scmp_search_predict(search_term, this);
          }
          // Trigger the resize event to make sure the prediction box resize correctly.
          $(window).resize();
        }).parents('form').keydown(function(handler) {
          if (handler.which != 38 && handler.which != 40) {
            return true;
          }
          else {
            scmp_search_key_control(handler);
            return false;
          }
        });
      });
    }
  }

  /* key through search results */
  function scmp_search_key_control(handler) {
    /* make :focus selector work in older versions of jquery */
    jQuery.expr[':'].focus = function(elem) {
      return elem === document.activeElement && (elem.type || elem.href);
    };

    var $predictionBox = scmp_search_get_prediction_box();
    /* only run if search predict box is present and key is up or down. */
    if ($predictionBox.length != 0 && (handler.which == 38 || handler.which == 40)) {
      Drupal.settings.scmpSearch.active = true;
      var $selectedItem = $('ul.results li.search-item a:focus', $predictionBox);
      // Item selected.
      if ($selectedItem.length != 0) {
        var $isLastInList = false;
        var $isFirstInList = false;
        var $bundleList;
        var $nextBundleList;
        var $prevBundleList;
        $bundleList = $selectedItem.parents('ul.bundle');
        // Is this last item in the list?
        if ($selectedItem.get(0) == $('li:last a', $bundleList).get(0)) {
          $isLastInList = true;
          $nextBundleList = $bundleList.parent().next('li').children('ul.bundle');
        }
        // Is this first item in the list?
        if ($selectedItem.get(0) == $('li:first a', $bundleList).get(0)) {
          $isFirstInList = true;
          $prevBundleList = $bundleList.parent().prev('li').children('ul.bundle');
        }
      }

      $predictionBox.addClass('scroll-active-by-key');
      if (typeof keyControlTimer !== "undefined") {
        clearTimeout(keyControlTimer);
      }
      keyControlTimer = setTimeout(function() {
        $predictionBox.removeClass('scroll-active-by-key');
      }, 1000);

      // Key up.
      if (handler.which == 38) {
        // Item selected.
        if ($selectedItem.length != 0) {
          // Item is not the first in the list, select prev item.
          if (!$isFirstInList) {
            $selectedItem.removeClass('active-result');
            $selectedItem.parent().prev('li.search-item').children('a').addClass('active-result').focus();
          }
          // Item is the first in the list, try to select last item in prev list.
          else if ($prevBundleList.length != 0) {
            $selectedItem.removeClass('active-result');
            $('li.search-item:last a', $prevBundleList).addClass('active-result').focus();
          }
        }
      }
      // Key down.
      else if (handler.which == 40) {
        // Item selected.
        if ($selectedItem.length != 0) {
          // Item is not the last in the list, select next item.
          if (!$isLastInList) {
            $selectedItem.removeClass('active-result');
            $selectedItem.parent().next('li.search-item').children('a').addClass('active-result').focus();
          }
          // Item is the last in the list, try to select next item in next list.
          else if ($nextBundleList.length != 0) {
            $selectedItem.removeClass('active-result');
            $('li.search-item:first a', $nextBundleList).addClass('active-result').focus();
          }
        }
        // No item selected, select first item in the first list.
        else {
          $('ul.results > li:first li.search-item:first a', $predictionBox).addClass('active-result').focus();
        }
      }
      return false;
    }
  }

  function scmp_search_predict(search_term, search_input) {
    // Only engage ajax search on terms greater than 3 characters long.
    if (search_term.length < 3) {
      return;
    }
    var url = Drupal.settings.basePath + 'content/search/' + escape(search_term);
    var search_path = Drupal.settings.basePath + 'ajax/search/predictive/' + escape(search_term);
    $.getJSON(search_path, function (data) {
      if (!$.isEmptyObject(data)) {
        var list = $('<ul class="results"><div class="results-scroll"></div></ul>');
        $.each(data, function (bundle, items) {
          var sublist = $('<ul class="bundle bundle-' + bundle + '"></ul>');
          $.each(items, function(key, value) {
            sublist.append('<li class="search-item"><a href="' + value.link + '"><div class="image">' + value.image + '</div><div class="content">' + value.title + '<span class="date">' + value.date + '</span></div></a></li>');
          });
          list.append($('<li class="results-set"></li>').append(sublist));
        });
        list.find('.search-item').hover(function() {
          list.find('.active-result').toggleClass('active-result');
          $(this).find('a').addClass('active-result').focus();
        });
        var $predictionBox = scmp_search_get_prediction_box(search_input).html(list).prepend('<h5 class="see-all-search"><a href="' + url + '" class="see-more">See all search results &raquo;</a></h5>');
        // Set the predict box not higher than current viewport height.
        $('body').once('resize-search-predict', function() {
          $(window).resize(function() {
            var $predictionBox = scmp_search_get_prediction_box();
            // Inner content wrapper margin bottom 50px.
            var maxHeight = 50;
            $('.results-set', $predictionBox).each(function() {
              maxHeight += $(this).outerHeight();
            });
            // Padding bottom 20px.
            var targetHeight = $(window).height() - $predictionBox.offset().top  + $(window).scrollTop() - 20;
            $predictionBox.css('height', targetHeight > maxHeight ? maxHeight : targetHeight);

            $('.results-scroll.active', $predictionBox).removeClass('active');
            scmp_search_redraw_scroll(true);
          });
        });
        // Inner content wrapper margin bottom 50px.
        var maxHeight = 50;
        $('.results-set', $predictionBox).each(function() {
          maxHeight += $(this).outerHeight();
        });
        // Padding bottom 20px.
        var targetHeight = $(window).height() - $predictionBox.offset().top  + $(window).scrollTop() - 20;
        $predictionBox.css('height', targetHeight > maxHeight ? maxHeight : targetHeight);
        scrollTimer = 0;
        $predictionBox.bind('mousewheel DOMMouseScroll', function (e) {
          if (!scrollTimer) {
            var e0 = e.originalEvent;
            var delta = e0.wheelDelta || -e0.detail;
            scmp_search_key_control({which: delta < 0 ? 40 : 38});
            scrollTimer = setTimeout(function() {
              scrollTimer  = 0;
            }, 50);
          }
          e.preventDefault();
        });

        // Scrollbar.
        var resultsScrollY = 0; // Current mouse position, to check scroll up or down.
        // When mouse up stop drag to scroll.
        $(window).mouseup(function() {
          if ($predictionBox.hasClass('scroll-active')) {
            resultsScrollY = 0;
            $(window).unbind("mousemove");
            $predictionBox.removeClass('scroll-active');
          }
        });
        // when mouse down start to check mouse move for drag to scroll.
        $('.results-scroll', $predictionBox).mousedown(function(e) {
          $predictionBox.addClass('scroll-active');
          var $resultScroll = $(this);
          var $results = $('ul.results', $predictionBox);
          var $resultsSet = $('.results-set', $results);
          // Mouse moving.
          $(window).mousemove(function(e) {
            // Calculate new position if the drag still active.
            if ($predictionBox.hasClass('scroll-active')) {
              if (resultsScrollY == 0) {
                resultsScrollY = e.clientY;
              }
              else {
                // Is moving up or down, calculate ratio from scroll bar postion for scrolling content wrapper.
                var totalHeight = 0;
                $resultsSet.each(function() {
                  totalHeight += $(this).outerHeight();
                });
                var innerScrollStep = ($resultScroll.outerHeight(true) + parseInt($resultScroll.css('top')) - 50) / $results.outerHeight(true);
                var scrollStep = e.clientY - resultsScrollY;
                if (resultsScrollY < e.clientY) { // Scroll Down.
                  if (innerScrollStep >= 1) {
                    $results.scrollTop(totalHeight);
                    return;
                  }
                }
                else { // Scroll Up.
                  var targetY = parseInt($resultScroll.css('top')) + scrollStep;
                  if (targetY < 50) {
                    $results.scrollTop(0);
                    return;
                  }
                }
                // Set new position for scroll bar and content wrapper.
                $resultScroll.css('top', parseInt($resultScroll.css('top')) + scrollStep);
                $results.scrollTop((innerScrollStep * totalHeight) - $results.height());
              }
              resultsScrollY = e.clientY;
              e.preventDefault();
            }
          });
          e.preventDefault();
        }).mouseup(function() {
          // When mouse up stop drag to scroll.
          resultsScrollY = 0;
          $(window).unbind("mousemove");
          $predictionBox.removeClass('scroll-active');
        });
        // Init the scroll bar.
        scmp_search_redraw_scroll(true);
        $predictionBox.removeClass('scroll-active');
        // When scroll event trigger, redraw the scroll bar.
        $('ul.results', $predictionBox).scroll(function() {
          if (!$predictionBox.hasClass('scroll-active')) {
            scmp_search_redraw_scroll(false);
          }
        });

        /* setting classes for use later */
        $('.search-item:first-child', $predictionBox).not('.search-item:only-child').addClass('first-item');
        $('.search-item:last-child', $predictionBox).not('.search-item:only-child').addClass('last-item');
        $('.search-item:only-child', $predictionBox).addClass('single-item');
      }
      else {
        scmp_search_get_prediction_box().remove();
      }
    });
  }

  // Redraw scroll bar.
  function scmp_search_redraw_scroll(delay) {
    setTimeout(function() {
      var $predictionBox = scmp_search_get_prediction_box();
      var wrapperHeight = $('ul.results', $predictionBox).height();
      var totalHeight = 0;
      $('ul.results .results-set', $predictionBox).each(function() {
        totalHeight += $(this).outerHeight();
      });
      if (totalHeight > wrapperHeight) {
        var $resultScroll = $('.results-scroll', $predictionBox);
        $resultScroll.addClass('active').css('height', wrapperHeight / (totalHeight / wrapperHeight)).css('top', 50 + ($('ul.results', $predictionBox).scrollTop() * (wrapperHeight / totalHeight)));;
      }
    }, delay ? 500 : 0);
  }

  // Create a new prediction box or get created prediction box.
  function scmp_search_get_prediction_box(si) {
    var $box = $('#apachesolr_panels_search_form_predict');
    if (typeof si !== "undefined" && !$box.length) {
      $box = $('<div id="apachesolr_panels_search_form_predict"></div>');
      $box.keydown(function(handler) {
        return scmp_search_key_control(handler);
      });
      $(si).parents('form').after($box);
      // Close the box when it loses focus.
      $box.blur(function () {
        close_predictions = setTimeout(function() {
          jQuery.fn.scmp_search_blur_predictions(scmp_search_get_prediction_box());
        }, 200);
      });
    }
    return $box;
  }

})(jQuery);
;
(function ($) {

/**
 * Attaches the autocomplete behavior to all required fields.
 */
Drupal.behaviors.autocomplete = {
  attach: function (context, settings) {
    var acdb = [];
    $('input.autocomplete', context).once('autocomplete', function () {
      var uri = this.value;
      if (!acdb[uri]) {
        acdb[uri] = new Drupal.ACDB(uri);
      }
      var $input = $('#' + this.id.substr(0, this.id.length - 13))
        .attr('autocomplete', 'OFF')
        .attr('aria-autocomplete', 'list');
      $($input[0].form).submit(Drupal.autocompleteSubmit);
      $input.parent()
        .attr('role', 'application')
        .append($('<span class="element-invisible" aria-live="assertive"></span>')
          .attr('id', $input.attr('id') + '-autocomplete-aria-live')
        );
      new Drupal.jsAC($input, acdb[uri]);
    });
  }
};

/**
 * Prevents the form from submitting if the suggestions popup is open
 * and closes the suggestions popup when doing so.
 */
Drupal.autocompleteSubmit = function () {
  return $('#autocomplete').each(function () {
    this.owner.hidePopup();
  }).length == 0;
};

/**
 * An AutoComplete object.
 */
Drupal.jsAC = function ($input, db) {
  var ac = this;
  this.input = $input[0];
  this.ariaLive = $('#' + this.input.id + '-autocomplete-aria-live');
  this.db = db;

  $input
    .keydown(function (event) { return ac.onkeydown(this, event); })
    .keyup(function (event) { ac.onkeyup(this, event); })
    .blur(function () { ac.hidePopup(); ac.db.cancel(); });

};

/**
 * Handler for the "keydown" event.
 */
Drupal.jsAC.prototype.onkeydown = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 40: // down arrow.
      this.selectDown();
      return false;
    case 38: // up arrow.
      this.selectUp();
      return false;
    default: // All other keys.
      return true;
  }
};

/**
 * Handler for the "keyup" event.
 */
Drupal.jsAC.prototype.onkeyup = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 16: // Shift.
    case 17: // Ctrl.
    case 18: // Alt.
    case 20: // Caps lock.
    case 33: // Page up.
    case 34: // Page down.
    case 35: // End.
    case 36: // Home.
    case 37: // Left arrow.
    case 38: // Up arrow.
    case 39: // Right arrow.
    case 40: // Down arrow.
      return true;

    case 9:  // Tab.
    case 13: // Enter.
    case 27: // Esc.
      this.hidePopup(e.keyCode);
      return true;

    default: // All other keys.
      if (input.value.length > 0 && !input.readOnly) {
        this.populatePopup();
      }
      else {
        this.hidePopup(e.keyCode);
      }
      return true;
  }
};

/**
 * Puts the currently highlighted suggestion into the autocomplete field.
 */
Drupal.jsAC.prototype.select = function (node) {
  this.input.value = $(node).data('autocompleteValue');
  $(this.input).trigger('autocompleteSelect', [node]);
};

/**
 * Highlights the next suggestion.
 */
Drupal.jsAC.prototype.selectDown = function () {
  if (this.selected && this.selected.nextSibling) {
    this.highlight(this.selected.nextSibling);
  }
  else if (this.popup) {
    var lis = $('li', this.popup);
    if (lis.length > 0) {
      this.highlight(lis.get(0));
    }
  }
};

/**
 * Highlights the previous suggestion.
 */
Drupal.jsAC.prototype.selectUp = function () {
  if (this.selected && this.selected.previousSibling) {
    this.highlight(this.selected.previousSibling);
  }
};

/**
 * Highlights a suggestion.
 */
Drupal.jsAC.prototype.highlight = function (node) {
  if (this.selected) {
    $(this.selected).removeClass('selected');
  }
  $(node).addClass('selected');
  this.selected = node;
  $(this.ariaLive).html($(this.selected).html());
};

/**
 * Unhighlights a suggestion.
 */
Drupal.jsAC.prototype.unhighlight = function (node) {
  $(node).removeClass('selected');
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Hides the autocomplete suggestions.
 */
Drupal.jsAC.prototype.hidePopup = function (keycode) {
  // Select item if the right key or mousebutton was pressed.
  if (this.selected && ((keycode && keycode != 46 && keycode != 8 && keycode != 27) || !keycode)) {
    this.select(this.selected);
  }
  // Hide popup.
  var popup = this.popup;
  if (popup) {
    this.popup = null;
    $(popup).fadeOut('fast', function () { $(popup).remove(); });
  }
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Positions the suggestions popup and starts a search.
 */
Drupal.jsAC.prototype.populatePopup = function () {
  var $input = $(this.input);
  var position = $input.position();
  // Show popup.
  if (this.popup) {
    $(this.popup).remove();
  }
  this.selected = false;
  this.popup = $('<div id="autocomplete"></div>')[0];
  this.popup.owner = this;
  $(this.popup).css({
    top: parseInt(position.top + this.input.offsetHeight, 10) + 'px',
    left: parseInt(position.left, 10) + 'px',
    width: $input.innerWidth() + 'px',
    display: 'none'
  });
  $input.before(this.popup);

  // Do search.
  this.db.owner = this;
  this.db.search(this.input.value);
};

/**
 * Fills the suggestion popup with any matches received.
 */
Drupal.jsAC.prototype.found = function (matches) {
  // If no value in the textfield, do not show the popup.
  if (!this.input.value.length) {
    return false;
  }

  // Prepare matches.
  var ul = $('<ul></ul>');
  var ac = this;
  for (key in matches) {
    $('<li></li>')
      .html($('<div></div>').html(matches[key]))
      .mousedown(function () { ac.hidePopup(this); })
      .mouseover(function () { ac.highlight(this); })
      .mouseout(function () { ac.unhighlight(this); })
      .data('autocompleteValue', key)
      .appendTo(ul);
  }

  // Show popup with matches, if any.
  if (this.popup) {
    if (ul.children().length) {
      $(this.popup).empty().append(ul).show();
      $(this.ariaLive).html(Drupal.t('Autocomplete popup'));
    }
    else {
      $(this.popup).css({ visibility: 'hidden' });
      this.hidePopup();
    }
  }
};

Drupal.jsAC.prototype.setStatus = function (status) {
  switch (status) {
    case 'begin':
      $(this.input).addClass('throbbing');
      $(this.ariaLive).html(Drupal.t('Searching for matches...'));
      break;
    case 'cancel':
    case 'error':
    case 'found':
      $(this.input).removeClass('throbbing');
      break;
  }
};

/**
 * An AutoComplete DataBase object.
 */
Drupal.ACDB = function (uri) {
  this.uri = uri;
  this.delay = 300;
  this.cache = {};
};

/**
 * Performs a cached and delayed search.
 */
Drupal.ACDB.prototype.search = function (searchString) {
  var db = this;
  this.searchString = searchString;

  // See if this string needs to be searched for anyway. The pattern ../ is
  // stripped since it may be misinterpreted by the browser.
  searchString = searchString.replace(/^\s+|\.{2,}\/|\s+$/g, '');
  // Skip empty search strings, or search strings ending with a comma, since
  // that is the separator between search terms.
  if (searchString.length <= 0 ||
    searchString.charAt(searchString.length - 1) == ',') {
    return;
  }

  // See if this key has been searched for before.
  if (this.cache[searchString]) {
    return this.owner.found(this.cache[searchString]);
  }

  // Initiate delayed search.
  if (this.timer) {
    clearTimeout(this.timer);
  }
  this.timer = setTimeout(function () {
    db.owner.setStatus('begin');

    // Ajax GET request for autocompletion. We use Drupal.encodePath instead of
    // encodeURIComponent to allow autocomplete search terms to contain slashes.
    $.ajax({
      type: 'GET',
      url: db.uri + '/' + Drupal.encodePath(searchString),
      dataType: 'json',
      success: function (matches) {
        if (typeof matches.status == 'undefined' || matches.status != 0) {
          db.cache[searchString] = matches;
          // Verify if these are still the matches the user wants to see.
          if (db.searchString == searchString) {
            db.owner.found(matches);
          }
          db.owner.setStatus('found');
        }
      },
      error: function (xmlhttp) {
        Drupal.displayAjaxError(Drupal.ajaxError(xmlhttp, db.uri));
      }
    });
  }, this.delay);
};

/**
 * Cancels the current autocomplete request.
 */
Drupal.ACDB.prototype.cancel = function () {
  if (this.owner) this.owner.setStatus('cancel');
  if (this.timer) clearTimeout(this.timer);
  this.searchString = '';
};

})(jQuery);
;
(function ($) {
  // Remove default captioning, trigger after lazyload
  // when dimension attributes are set
  delete Drupal.behaviors.image_caption;
  Drupal.lazyLoad = {};
  // Helper function to call all lazyload instances to check elemetns is needed to load.
  Drupal.lazyLoad.handleScroll = function() {
    for (var key in Drupal.lazyLoad.lazyLoadInstance) {
      Drupal.lazyLoad.lazyLoadInstance[key].handleScroll();
    }
  };
  Drupal.lazyLoad.lazyLoadInstance = {};
  // Add lazyload behavior.
  Drupal.behaviors.lazyLoad = {
    attach: function (context, settings) {
      // For first load, get all images / iframes to lazyload.
      $('body').once('lazyload', function() {
        Drupal.lazyLoad.lazyLoadInstance[0] = new LazyLoad({
          show_while_loading: true,
          elements_selector: 'img[data-original], iframe[data-original]',
          threshold : 400,
          skip_invisible: false,
          callback_load: function(element) {
            var $element = $(element);
            if ($element.hasClass('caption')) {
              $element.imageCaption($element);
              if ($.fn.imageCaptionHover) {
                $element.imageCaptionHover($element);
              }
            }
            if ($.fn.imagePostProcess && $('body').hasClass('page-node') && $('body').hasClass('node-type-article')) {
              $element.imagePostProcess($element);
            }
            if ($element.closest('article').hasClass('view-mode-lvl_911')) {
              var leftWrapper = $element.closest('article').parent();
              var rightWrapper = leftWrapper.siblings().first();
              if (leftWrapper.hasClass('left-wrapper') && rightWrapper.hasClass('right-wrapper')) {
                if (rightWrapper.find('.swiper-container').length > 0) {
                  $('.pane-nineoneone-latest-update .swiper-container').trigger('nineoneone-update-aligment');
                }
              }
            }
            if ($element.hasClass('nineoneone-latest-update-image')) {
              $('.pane-nineoneone-latest-update .swiper-container').trigger('nineoneone-update-aligment');
            }
            //Call fitvids if theme-boom.
            if ($element.is('iframe') && $('body').hasClass('theme-boom')) {
              $element.parent().fitVids({ customSelector: "iframe[src^='https://widgets.scmp.com']"});
            }
          }
        });
        return;
      });
      // Second calls, try create a new instance.
      if ($('img[data-original]:not(.loaded, .lazyload-processed)').length) {
        var instanceIdx = Object.keys(Drupal.lazyLoad.lazyLoadInstance).length;
        Drupal.lazyLoad.lazyLoadInstance[Object.keys(Drupal.lazyLoad.lazyLoadInstance).length] = new LazyLoad({
          show_while_loading: true,
          elements_selector: 'img[data-original]:not(.loaded):not(.lazyload-processed), iframe[data-original]:not(.loaded):not(.lazyload-processed)',
          threshold : 400,
          skip_invisible: false,
          callback_load: function(element) {
            var $element = $(element);
            if ($element.hasClass('caption')) {
              $element.imageCaption($element);
              if ($.fn.imageCaptionHover) {
                $element.imageCaptionHover($element);
              }
            }
            if ($.fn.imagePostProcess && $('body').hasClass('page-node') && $('body').hasClass('node-type-article')) {
              $element.imagePostProcess($element);
            }
            if ($element.closest('article').hasClass('view-mode-lvl_911')) {
              var leftWrapper = $element.closest('article').parent();
              var rightWrapper = leftWrapper.siblings().first();
              if (leftWrapper.hasClass('left-wrapper') && rightWrapper.hasClass('right-wrapper')) {
                if (rightWrapper.find('.swiper-container').length > 0) {
                  $('.pane-nineoneone-latest-update .swiper-container').trigger('nineoneone-update-aligment');
                }
              }
            }
            if ($element.hasClass('nineoneone-latest-update-image')) {
              $('.pane-nineoneone-latest-update .swiper-container').trigger('nineoneone-update-aligment');
            }
          }
        });
      }
    }
  };
})(jQuery);
;
/* This JS Handles article v2 Pages. */

(function($, document, window, viewport) {
  //Function to calculate offset for navigation
  var DrupalToolbar = 0
  function stickyOffsetTop() {
    var stickyNavHeight = $('.masthead-main-sticky-nav').height() + 20
    if (typeof Drupal.toolbar !== "undefined") {
      DrupalToolbar = Drupal.toolbar.height() + stickyNavHeight - 40;
      return Drupal.toolbar.height() + stickyNavHeight;
    } else {
      return stickyNavHeight;
    }
  }
  
  //Initialize Scroll Controller
  var controller = new ScrollMagic.Controller();
  var relatedArticlesPinned;
  var sidebarPinned;
  var lhsPinned;
  var screenChanged = 0;
  var offsetFix;

  $.fn.cssOffset = function() {
    $(this).css({
       'width' : $(this).width(),
       'margin-top' : - stickyOffsetTop(),
       'padding-top' : stickyOffsetTop()
    });
    if ($(this).hasClass('lhs-sticky')) {
      $(this).css({'margin-top': - (stickyOffsetTop() - 20), 'padding-bottom': 35});
    }
  }

  //Make the RHS sticky.
  function getSidebarDuration() {
    var totalHeight = $('.sticky-advert .row-2').height();
    $('.row-1-spacer').height($('.sticky-advert .row-1').outerHeight() + offsetFix);
    return totalHeight;
  }

  function stickyRHS() {
    var sidebarPin = $('.sticky-advert .row-1');
    var sidebarPinText = '.sticky-advert .row-1';
    if ($('.node-type-article .nested-row .nested-col-2 .pane-4').height() >= 20) {
      sidebarPin.css({'z-index' : '99', 'position' : 'absolute'});
      sidebarPin.css({'padding-top' : '110px'}).parent().css('margin-top', '-110px');
      sidebarPin.css('width', '');
      offsetFix = parseInt(sidebarPin.css('margin-top')); //Store the - Margin value and use it to calculate the space for the Advert to sit.
      sidebarPin.after('<div class="row-1-spacer"></div>');
      sidebarPinned = new ScrollMagic.Scene({
        triggerElement: sidebarPinText,
        duration: getSidebarDuration,
        triggerHook: 0,
        scrollOffset: 0,
        reverse: true,
        pushFollowers: false
      }).on('enter', function(e) {
        sidebarPin.addClass('sticky').find('> div:first-child').css({'background' : '#FFF', 'padding': '20px 0 0', 'margin-top' : '-20px'});
        sidebarPin.find('> div:last-child').css({'background' : '#FFF', 'padding-bottom' : '20px', 'margin-bottom' : '-20px'});
      }).on('leave', function(e) {
        sidebarPin.removeClass('sticky').find('> div:first-child').css({'padding': '0', 'margin-top' : '0', 'background' : 'inherit'});
        sidebarPin.find('> div:last-child').css({'background' : 'transparent'})
      }).setPin(sidebarPinText).addTo(controller);
    }
  }

  //Init RHS sticky.
  $('.node-type-article .nested-row .nested-col-2').addClass('sticky-advert');
  $('.node-type-article .pane-4 .OUTBRAIN').height(1349).show();
  stickyRHS(); 

  function checkSidebarHeight() {
      var result = 'sticky-all';
      $('.panels-four-column-nested-grid-article .nested-col-1 .row.columns-2.pfcng-row-02 .pfcng-col.pfcng-col-1').each(function() {
        var sidebarHeight = $(this).outerHeight();
        var contentHeight = $('.pane-node-body').outerHeight();
        var relatedArticles = $('.related-articles');
        if (contentHeight > sidebarHeight) {
          if (relatedArticles.length) {
              result = 'sticky-seperate';
          }
        }
        else {
          result = 'do-nothing';
        }
      })
      return result;
    }

  function relatedArticlesBottom() {
    var relatedArticles = $('.related-articles');
    relatedArticles.width('auto').removeClass('at-the-bottom');
    relatedArticles.width(relatedArticles.width());
    relatedArticles.addClass('at-the-bottom');
  }
  //Sticky LHS
  var LHSQuestionHolder;

  function getLHSDuration() {
    var notSticky = $('.pane-node-field-authors').outerHeight() + $('.pane-share-widgets-article').outerHeight();
    if (LHSQuestionHolder == "not-related") {
      var result = $('.pane-node-body').outerHeight() - (notSticky + $('.lhs-sticky').outerHeight() + $('.related-articles').outerHeight() + stickyOffsetTop() - DrupalToolbar - 20);
    } else {
      var result = $('.pane-node-body').outerHeight() - $('.lhs-sticky').outerHeight() - notSticky - 20;
    }
    if (result < 0) {
      result = 1;
    }
    return result;
  }

  function stickyLHS(question) {
    LHSQuestionHolder = question
    if (question == "not-related") {
      $('.pane-node-field-topics, .more-on-this-story').wrapAll(
        '<div class="lhs-sticky"></div>');
    } else {
      $('.pane-node-field-topics, .more-on-this-story, .related-articles').wrapAll(
        '<div class="lhs-sticky"></div>');
    }
    var lhsSticky = $('.lhs-sticky');
    var lhsStickyText = '.lhs-sticky'
    lhsSticky.cssOffset()
    lhsPinned = new ScrollMagic.Scene({
      triggerElement: lhsStickyText,
      duration: getLHSDuration,
      triggerHook: 0,
      scrollOffset: stickyOffsetTop(),
      reverse: true
    }).setPin(lhsStickyText).addTo(controller);
  }


  function checkScreen() {
    var oldScreenChanged = screenChanged;
    if(viewport.is('<lg')) {
      screenChanged = 1;
    } else {
      screenChanged = 0;
    }
    if (oldScreenChanged != screenChanged) {
      var sh = checkSidebarHeight();
      //sidebarPinned.destroy(true);
      //stickyRHS();
      if (sh == 'sticky-seperate') {
        lhsPinned.destroy(true);
        $('.scrollmagic-pin-spacer > .related-articles, .lhs-sticky > .panel-pane').unwrap();
        relatedArticlesBottom();
        stickyLHS("not-related");
      } else if (sh == 'sticky-all') {
        lhsPinned.destroy(true);
        $('.lhs-sticky').css('width', '');
        $('.lhs-sticky > .panel-pane, .scrollmagic-pin-spacer > .pane-node-field-topics').unwrap();
        stickyLHS();
      }
    }
  }
  $(window).load(function() {
    //figure out how to do the left hand sidebar.
    $('.OUTBRAIN').removeAttr('style');
    var sh = checkSidebarHeight();
    if (sh == 'sticky-seperate') {
      relatedArticlesBottom();
      stickyLHS('not-related');
    } else if (sh == 'sticky-all') {
      stickyLHS();
    }
    //Set up variable for refreshing on screen size change.
    if(viewport.is('<lg')) {
      screenChanged = 1;
    }
  });

  var pleaseCheckTheScreenSize;
  $(window).resize(function() {
      clearTimeout(pleaseCheckTheScreenSize);
      pleaseCheckTheScreenSize = setTimeout(checkScreen(), 300);
  })
})(jQuery, document, window, ResponsiveBootstrapToolkit);
;
 /**
 * @file
 * Contains the script for the frontpage
 *
 */
(function ($, Drupal, window, document, undefined) {

    // Var ref vars.
  var desktopWidth = 960;
  var largeDesktopWidth = 1280;
  var bigContainer;
  var magazineWidth;

  /**
  * @Callbacks by default implemented (if not implemented swiper fires error).
  */
  function swiper_Init(swiper) {
    _checkInactiveArrow(swiper);
  };

  function swiper_onSlideChangeStart(swiper) {};

  function swiper_onSwiperCreated(swiper) {};

  function swiper_onTouchStart(swiper) {};

  function swiper_onTouchEnd(swiper) {

    // Need to finish the swipe to end to assess last slide full visibility.
    var checkArrowTimeout = swiper.pageRenderOne ? 0: swiper.params.speed;
    setTimeout(function() {
      _checkInactiveArrow(swiper);
    }, checkArrowTimeout);

  };

  function swiper_onSlideChangeEnd(swiper) {
    // Trigger lazyloading of new images in swiper container
    Drupal.lazyLoad.handleScroll();
    _checkInactiveArrow(swiper);
  };



  function swiper_onSlideChangeStart(swiper) {};

  function swiper_onSlideNext(swiper) {};

  function swiper_onSlidePrev(swiper) {};

  function swiper_onSlideClick(swiper) {};

  function swiper_onSlideTouch(swiper) {};

  function swiper_onImagesReady(swiper) {};

  function swiper_onAutoplayStart(swiper) {
    //  handle lazyload unprocessed image duplicated by swiper
    $(swiper.wrapper).find('img').each(function() {
      if (!$(this).hasClass('loaded') && $(this).data('original')) {
        $(this).attr('src', $(this).data('original')).data('ignore', true).addClass('lazyload-processed loaded');
      }
    });
  };


  /*
   *  @Determines if an element is fully visible on the viewport.
   */
  function _isFullyVisible(lastSlide) {

    var fatherContainer = lastSlide.closest('.swiper-container');
    var swiperOffset = fatherContainer.innerWidth() - fatherContainer.offset().left;
    var lastSlideOffset = lastSlide.offset().left;
    var swiperDistance = ($(window).width() - (fatherContainer.offset().left + fatherContainer.outerWidth()));
    var lastslideDistance = ($(window).width() - (lastSlide.offset().left + lastSlide.width()));

    if (lastslideDistance >= swiperDistance) {
      return true;
    }
    return false;
  }

  /**
   *  @checkInactiveArrow
   */
  function _checkInactiveArrow(swiper) {

    if (!swiper.params.loop) {

      var wrapper = $(swiper.container);
      var $nextArrow = wrapper.find('.next-arrow');
      var $prevArrow = wrapper.find('.prev-arrow');
      if (typeof Drupal.settings.article_swiper[$(swiper.container).attr('id')].carousel_arrow_prev != 'undefined') {
        $prevArrow = Drupal.settings.article_swiper[$(swiper.container).attr('id')].carousel_arrow_prev;
      }
      if (typeof Drupal.settings.article_swiper[$(swiper.container).attr('id')].carousel_arrow_next != 'undefined') {
        $nextArrow = Drupal.settings.article_swiper[$(swiper.container).attr('id')].carousel_arrow_next;
      }
      if (wrapper.find('.swiper-slide').last().hasClass('swiper-slide-visible')) {
        // normal behaviour, one slide will be fully visible.
        if (swiper.pageRenderOne) {
            $nextArrow.addClass('inactive');
        }
        else {
          if (_isFullyVisible(wrapper.find('.swiper-slide').last())) {
            $nextArrow.addClass('inactive');
          }
          else {
            $nextArrow.removeClass('inactive');
          }
        }
      }

      else {
        $nextArrow.removeClass('inactive');
      }

      if (wrapper.find('.swiper-slide').first().hasClass('swiper-slide-visible')) {
        $prevArrow.addClass('inactive');
      }

      else {
        $prevArrow.removeClass('inactive');
      }
    }
  }


  /**
   *  @swiperCallback
   */
  function swiperCallback(swiperObject, option) {
    return function() {
      if (option=='prev') {
        swiperObject.swipePrev();
      }
      else if (option=='next') {
        swiperObject.swipeNext();
      }
    }
  }

  /**
   *  @_isLoadedSmallDesktop
   */
  window._isLoadedSmallDesktop = function() {

    var isSmallDesktop = false;
    bigContainer = $('#masthead .container');
    magazineWidth = parseInt(bigContainer.css('width'));

    if (magazineWidth <= desktopWidth) {
      isSmallDesktop = true;
    }

    return isSmallDesktop;
  }


  Drupal.behaviors.article_swiper = {

    attach: function(context, settings) {

      if ($('.pane-article-level-carousel .swiper-container').length > 0 && Drupal.settings.article_swiper) {

        var swipers = Drupal.settings.article_swiper;

        for(var key in swipers) {

          var swiperID = '.pane-article-level-carousel #'+key;

          if ($(swiperID).length > 0) {

           $(swiperID).once('swiper-ready' , function() {

            var cssWidthAndHeight_value = '';
            var swiperCached = $(swiperID);
            var swiperConf = swipers[key];
            var pager = swiperConf.carousel_create_pagination == true ? "." + swiperConf.carousel_pager_css: false;

            var originalSlidesPerView = swiperConf.carousel_slides_per_view;
            var originalSlidesPerGroup = swiperConf.carousel_slides_per_group;


            // Responsive desktop treatment.
            if (swiperConf.carousel_responsive == true) {

              var swiperOuterWidth = swiperCached.outerWidth(false);

              var instanceWidth = swiperCached.find('.swiper-slide').outerWidth(true);
              var responsiveNumberOfItems = 1;
              var swiperWrapperWidth;

              // Treated for one page/one image mode.
              if (swiperConf.carousel_responsive_render_one) {

                swiperOuterWidth = swiperCached.width();
                instanceWidth = swiperOuterWidth;
                swiperCached.find('.swiper-slide').css('width', instanceWidth).css('padding', '0px').css('margin','0px').css('display','inline');
              }

              /*
                Pagination only for full pages carousel @ this point.
                If it has multiple elements it's deactivated by default.
              */
              else {
                if (swiperConf.carousel_create_pagination == true) {
                  swiperConf.carousel_create_pagination = false;
                }
              }

              // Items by page dom related calculation.
              swiperWrapperWidth = instanceWidth * swiperConf.carousel_slideshow_items;
              responsiveNumberOfItems = swiperOuterWidth/instanceWidth;
              swiperConf.carousel_slides_per_view = responsiveNumberOfItems;
              swiperConf.carousel_slides_per_group = parseInt(responsiveNumberOfItems);

              originalSlidesPerView = swiperConf.carousel_slides_per_view;
              originalSlidesPerGroup = swiperConf.carousel_slides_per_group;

              swiperCached.find('.swiper-wrapper').css('width',swiperWrapperWidth+'px');
              cssWidthAndHeight_value = 'width';
            }


            var mySwiper = swiperCached.swiper({

              // General options
              speed:swiperConf.carousel_speed,
              autoplay:swiperConf.carousel_auto_play,
              autoplayDisableOnInteraction:swiperConf.carousel_auto_play_disable_interaction,
              mode:swiperConf.carousel_render_mode,
              loop: swiperConf.carousel_loop_mode,
              slidesPerView:swiperConf.carousel_slides_per_view,
              slidesPerGroup:swiperConf.carousel_slides_per_group,

              calculateHeight:true,
              autoResize:swiperConf.carousel_responsive,
              initialSlide:0,
              paginationAsRange:true,

              // if true then swiper will always reinitialize with windows resize
              resizeReInit: swiperConf.carousel_responsive,
              // Freemode and scroll container
              freeModeFluid:false,
              scrollContainer:swiperConf.carousel_scroll_container,
              centeredSlides:false,
              roundLengths:true,

              pagination:pager,
              createPagination:swiperConf.carousel_create_pagination,
              paginationClickable:true,
              paginationAsRange:true,

              cssWidthAndHeight:cssWidthAndHeight_value,

              onInit:swiper_Init,
              onSwiperCreated:swiper_onSwiperCreated,
              onTouchStart:swiper_onTouchStart,
              onTouchEnd:swiper_onTouchEnd,
              onSlideNext: swiper_onSlideNext,
              onSlidePrev:swiper_onSlidePrev,
              onSlideClick:swiper_onSlideClick,
              onSlideTouch:swiper_onSlideTouch,
              onImagesReady:swiper_onImagesReady,
              onSlideChangeEnd:swiper_onSlideChangeEnd,
              onAutoplayStart:swiper_onAutoplayStart
            });

            // For reference.
            mySwiper.article_id = key;
            mySwiper.slideshowItems = swiperConf.carousel_slideshow_items;

            swiperCached.find('.prev-arrow').click(swiperCallback(mySwiper,'prev'));
            swiperCached.find('.next-arrow').click(swiperCallback(mySwiper,'next'));
            swiperCached.find('.swiper-pagination-switch').click(_checkInactiveArrow(mySwiper));

            if (swiperConf.carousel_responsive == true) {
              // Added this object for handling on the responsive side.
              mySwiper.original_slides_per_view = originalSlidesPerView;
              mySwiper.original_slides_per_group = originalSlidesPerGroup;
              mySwiper.smallDesktop = _isLoadedSmallDesktop();
              mySwiper.originalContainerWidth = swiperOuterWidth
              mySwiper.pageRenderOne = swiperConf.carousel_responsive_render_one;
              Drupal.settings.article_swiper_responsive[key] = mySwiper;
            }

           }); // once

          } // main if length (one instance)

        } // for cycle ends here

    } // main if length ends here



   } // attach ends here

  }; // behaviour ends here

  Drupal.behaviors.listing_swiper = {

    attach: function(context, settings) {

      if ($('.pane-listing-level-carousel .swiper-container').length > 0 && Drupal.settings.listing_swiper) {

        var swipers = Drupal.settings.listing_swiper;

        for(var key in swipers) {

          var swiperID = '.pane-listing-level-carousel #'+key;

          if ($(swiperID).length > 0) {

           $(swiperID).once('swiper-ready' , function() {

            var cssWidthAndHeight_value = '';
            var swiperCached = $(swiperID);
            var swiperConf = swipers[key];
            var pager = swiperConf.carousel_create_pagination == true ? "." + swiperConf.carousel_pager_css: false;

            var originalSlidesPerView = swiperConf.carousel_slides_per_view;
            var originalSlidesPerGroup = swiperConf.carousel_slides_per_group;


            // Responsive desktop treatment.
            if (swiperConf.carousel_responsive == true) {

              var swiperOuterWidth = swiperCached.outerWidth(true);
              var instanceWidth = swiperCached.find('.swiper-slide').outerWidth(true);
              var responsiveNumberOfItems = 1;
              var swiperWrapperWidth;

              // Treated for one page/one image mode.
              if (swiperConf.carousel_responsive_render_one) {

                swiperOuterWidth = swiperCached.width();
                instanceWidth = swiperOuterWidth;
                swiperCached.find('.swiper-slide').css('width', instanceWidth).css('padding', '0px').css('margin','0px').css('display','inline');
              }

              /*
                Pagination only for full pages carousel @ this point.
                If it has multiple elements it's deactivated by default.
              */
              else {
                if (swiperConf.carousel_create_pagination == true) {
                  swiperConf.carousel_create_pagination = false;
                }
              }

              // Items by page dom related calculation.
              swiperWrapperWidth = instanceWidth * swiperConf.carousel_slideshow_items;
              responsiveNumberOfItems = swiperOuterWidth/instanceWidth;
              swiperConf.carousel_slides_per_view = responsiveNumberOfItems;
              swiperConf.carousel_slides_per_group = parseInt(responsiveNumberOfItems);

              originalSlidesPerView = swiperConf.carousel_slides_per_view;
              originalSlidesPerGroup = swiperConf.carousel_slides_per_group;

              swiperCached.find('.swiper-wrapper').css('width',swiperWrapperWidth+'px');
              cssWidthAndHeight_value = 'width';
            }


            var mySwiper = swiperCached.swiper({

              // General options
              speed:swiperConf.carousel_speed,
              autoplay:swiperConf.carousel_auto_play,
              autoplayDisableOnInteraction:swiperConf.carousel_auto_play_disable_interaction,
              mode:swiperConf.carousel_render_mode,
              loop: swiperConf.carousel_loop_mode,
              slidesPerView:swiperConf.carousel_slides_per_view,
              slidesPerGroup:swiperConf.carousel_slides_per_group,

              calculateHeight:true,
              autoResize:swiperConf.carousel_responsive,
              initialSlide:0,
              paginationAsRange:true,

              // if true then swiper will always reinitialize with windows resize
              resizeReInit: swiperConf.carousel_responsive,
              // Freemode and scroll container
              freeModeFluid:false,
              scrollContainer:swiperConf.carousel_scroll_container,
              centeredSlides:false,
              roundLengths:true,

              pagination:pager,
              createPagination:swiperConf.carousel_create_pagination,
              paginationClickable:true,
              paginationAsRange:true,

              cssWidthAndHeight:cssWidthAndHeight_value,

              onInit:swiper_Init,
              onSwiperCreated:swiper_onSwiperCreated,
              onTouchStart:swiper_onTouchStart,
              onTouchEnd:swiper_onTouchEnd,
              onSlideNext: swiper_onSlideNext,
              onSlidePrev:swiper_onSlidePrev,
              onSlideClick:swiper_onSlideClick,
              onSlideTouch:swiper_onSlideTouch,
              onImagesReady:swiper_onImagesReady,
              onSlideChangeEnd:swiper_onSlideChangeEnd,
              onAutoplayStart:swiper_onAutoplayStart
            });

            // For reference.
            mySwiper.article_id = key;
            mySwiper.slideshowItems = swiperConf.carousel_slideshow_items;

            swiperCached.find('.prev-arrow').click(swiperCallback(mySwiper,'prev'));
            swiperCached.find('.next-arrow').click(swiperCallback(mySwiper,'next'));
            swiperCached.find('.swiper-pagination-switch').click(_checkInactiveArrow(mySwiper));

            if (swiperConf.carousel_responsive == true) {
              // Added this object for handling on the responsive side.
              mySwiper.original_slides_per_view = originalSlidesPerView;
              mySwiper.original_slides_per_group = originalSlidesPerGroup;
              mySwiper.smallDesktop = _isLoadedSmallDesktop();
              mySwiper.originalContainerWidth = swiperOuterWidth
              mySwiper.pageRenderOne = swiperConf.carousel_responsive_render_one;
              Drupal.settings.listing_swiper_responsive[key] = mySwiper;
            }

           }); // once

          } // main if length (one instance)

        } // for cycle ends here

    } // main if length ends here



   } // attach ends here

  }; // behaviour ends here


})(jQuery, Drupal, this, this.document);
;
 /**
 * @file
 * Contains the script for the frontpage
 *
 */
(function ($, Drupal, window, document, undefined) {
  
  Drupal.behaviors.article_swiper_responsive = {
  
    attach: function(context, settings) {

    if ($('.pane-article-level-carousel .swiper-container').length > 0) {

     $('.pane-article-level-carousel .swiper-container').once('swiper-responsive' , function() {   

      if (Drupal.settings.article_swiper_responsive) {

        var responsive_swipers = Drupal.settings.article_swiper_responsive;
        var tempSwiper;
        var resizeAction = false;
        var smallDesktopState;
        
        /**
         *  Flag changeAction inside to keep access to sliders and re-render to minimum.
         */
        function _readjustSlideshow() {

          var new_slidesPerView;
          var new_slidesPerGroup;
          var changeAction = false;

          for(var key in responsive_swipers) {
            smallDesktopState = responsive_swipers[key].smallDesktop;
            break;
          }

          // Resize event nothing to do here
          if (_isLoadedSmallDesktop() == true  && smallDesktopState == false) {
            changeAction= true;
          }
          else if (_isLoadedSmallDesktop() == false  && smallDesktopState == true) {
            changeAction = true;
          }

          if (changeAction) {
            for(var key in responsive_swipers) {
              
              var parentWidth = $(responsive_swipers[key].container).outerWidth(true);
              var instanceWidth = $(responsive_swipers[key].container).find('.swiper-slide:first').outerWidth(true);

              if (responsive_swipers[key].pageRenderOne == true) {
                // Some page one containers might keep the same width no need to reset.
                if (responsive_swipers[key].originalContainerWidth !== parentWidth) {
                   // recalculation needed
                  instanceWidth = parentWidth; 
                  responsive_swipers[key].originalContainerWidth = parentWidth;
                  $(responsive_swipers[key].container).find('.swiper-slide').css('width', instanceWidth).css('padding', '0px').css('margin','0px').css('display','inline');
                  var swiperWrapperWidth =  instanceWidth * responsive_swipers[key].slideshowItems;
                  $(responsive_swipers[key].container).find('.swiper-wrapper').css('width',swiperWrapperWidth+'px');
                  Drupal.settings.article_swiper_responsive[key].smallDesktop = _isLoadedSmallDesktop();
                }
              }

              else {
                   
                var newItems = parentWidth/instanceWidth;
                Drupal.settings.article_swiper_responsive[key].params.slidesPerView = newItems;
                Drupal.settings.article_swiper_responsive[key].params.slidesPerGroup = parseInt(newItems);
                // Object to be given to pagination to re-display pagination items
                var newSwiperConf = {
                  carousel_slideshow_items: responsive_swipers[key].slideshowItems,
                  carousel_slides_per_view: newItems,
                  carousel_slides_per_group: parseInt(newItems),
                }    
              }

              smallDesktopState = _isLoadedSmallDesktop();   
              Drupal.settings.article_swiper_responsive[key].smallDesktop = _isLoadedSmallDesktop();        
            }
            changeAction = false;
          }
     
        }

        // Update swiper parameter when resize for reinit.
        $(window).resize(function() {
          _readjustSlideshow();
        });

      }

     }); // once loaded here

    } // main if length ends here

  }// attach ends here
};


})(jQuery, Drupal, this, this.document);
;
/**
 * @file
 * Javascript related to the v2 masthead.
 */
(function ($) {
Drupal.behaviors.scmpMastheadSticky = {
  attach: function (context) {
    $('.masthead-main-sticky-nav .fluid-container .panel-pane.pane-scmp-social-widgets-addthis').not('.pane-scmp-social-widgets-addthis-china').once('share', function() {
      $toggle = $('<div class="share-toggle scmp-icon-plus1"></div>');
      $(this).parents('.pane-share-widgets-article').after($toggle);
      $toggle.click(function() {
        $(this).toggleClass('active');
        $(this).parent().find('.pane-share-widgets-article .panel-display').toggleClass('active');
      });
    });
  }
}
Drupal.behaviors.scmpMasthead = {
  // Helper function to toggle active-menu class for widgets popup in masthead.
  activeMe: function(me) {
    var $allSectionMenu = $('#block-panels-mini-masthead-all-section-menu');
    // Reset section menu and show / hide the text for sticky menu
    var hideAllSectionMenu = function() {
      if ($allSectionMenu.hasClass('affix')) {
        $stickyLink = $('.masthead-asmenu-sticky-link');

        $stickyLink.find('.asmenu-open').show();
        $stickyLink.find('.asmenu-close').hide();
        $allSectionMenu.find('.button-close').show();
      }
      $allSectionMenu.find('.panel-flexible-inside').slideUp(100, function() {
        $(this).removeClass('active-menu').hide();
        $allSectionMenu.hide();
        $allSectionMenu.find('.panels-flexible-region').hide();
      })
    };
    // Show section menu and show / hide the text for sticky menu
    var showAllSectionMenu = function() {
      if ($allSectionMenu.hasClass('affix')) {
        $stickyLink = $('.masthead-asmenu-sticky-link');
        $stickyLink.find('.asmenu-open').hide();
        $stickyLink.find('.asmenu-close').show();
        $allSectionMenu.find('.button-close').hide();
      }
      $allSectionMenu.show().find('.panel-flexible-inside').slideDown(100, function() {
        $(this).addClass('active-menu');
        $(this).find('.panels-flexible-region').fadeIn("fast");

      })
    };

    // Remove all active.
    if (typeof me === "undefined" || me.hasClass('active-menu')) {
      $('#masthead .active-menu').toggleClass('active-menu');
    }
    else {
      // Hide mega menus.
      $('#masthead .mega-intent').trigger('megahide');
      $('#masthead .active-menu').toggleClass('active-menu');
      // Show asmenu.
      if (me.hasClass('masthead-asmenu-link') || me.parent().hasClass('masthead-asmenu-sticky-link')) {
        if (me.hasClass('asmenu-open') || !me.hasClass('asmenu-close')) {
          showAllSectionMenu();
        }
        else {
          hideAllSectionMenu();
        }
      }
      else {
        me.toggleClass('active-menu');
        hideAllSectionMenu();
      }
    }
  },
  attach: function (context) {
    var $allSectionMenu = $('#block-panels-mini-masthead-all-section-menu');
    // Close all active menu when click any where in the page.
    var clickEvents = 'click touchstart';
    if (typeof window.PointerEvent != 'undefined' && window.PointerEvent) {
      clickEvents = 'pointerdown';
    }
    $('html').once('close-masthead-active', function() {
      $(this).bind(clickEvents, function(handler) {
        Drupal.behaviors.scmpMasthead.activeMe();

        // Click event for non all section menu area.
        var $target = $allSectionMenu.has(handler.target);
        if ($target.length === 0) {
          $allSectionMenu.hide();
          // Update icon in sticky menu.
          $stickyNav = $('#masthead .masthead-main-sticky-nav');
          $stickyNav.find('.asmenu-close').hide();
          $stickyNav.find('.asmenu-open').show();
        }
      });
    });

    // Trigger mini menu if Boostrap Affix exists.
    if ($.isFunction($.fn.affix)) {
      $('#masthead .masthead-main-sticky-nav').once('affix', function() {
        var allSectionMenuTop = 0;
        $masthead = $('#masthead');
        $stickyNav = $(this);


        $(this).on('affix.bs.affix', function() {
          // Add a class to body for identify sticky menu is affixed.
          $('body').addClass('sticky-menu');
          // Add dynamic top if admin toolbar present.
          if (typeof Drupal.toolbar !== "undefined") {
            $stickyNav.css({'top': function(){ return Drupal.toolbar.height() }});

            // Style all-section menu.
            $allSectionMenu.addClass('affix');
            allSectionMenuTop = parseInt($allSectionMenu.css('top'));
            $allSectionMenu.css({'top': Drupal.toolbar.height() + allSectionMenuTop});
          }
          else {
            $allSectionMenu.addClass('affix');
          }

          // Update all section menu status when showing sticky menu
          $allSectionMenu.hide();

          // Close all active menu but keep search box active.
          var currentSearchKeywords = $.trim($('.masthead-search .active-menu input.predict-processed').val());
          $('#apachesolr_panels_search_form_predict').remove();
          var notActiveSearch = $('.masthead-search .search-processed:not(.active-menu)');
          Drupal.behaviors.scmpMasthead.activeMe();
          if (currentSearchKeywords != '') {
            $('input.predict-processed', notActiveSearch).val(currentSearchKeywords);
            notActiveSearch.click();
          }

        });

        $(this).on('affixed-top.bs.affix', function() {
          $('body').removeClass('sticky-menu');
          // Close all active menu but keep search box active.
          var currentSearchKeywords = $.trim($('.masthead-search .active-menu input.predict-processed').val());
          $('#apachesolr_panels_search_form_predict').remove();
          var notActiveSearch = $('.masthead-search .search-processed:not(.active-menu)');
          Drupal.behaviors.scmpMasthead.activeMe();
          if (currentSearchKeywords != '') {
            $('input.predict-processed', notActiveSearch).val(currentSearchKeywords);
            notActiveSearch.click();
          }
          if (typeof Drupal.toolbar !== "undefined") {
              $allSectionMenu.css({'top': ''});
          }
          // Update all section menu status when hiding sticky menu
          $allSectionMenu.hide();
          $allSectionMenu.find('.button-close').show();
          $stickyNav.find('.asmenu-close').hide();
          $stickyNav.find('.asmenu-open').show();
          $allSectionMenu.removeClass('affix');
        });

        $(this).affix({
          offset: {
            top: function() {
              return ($masthead.offset().top + $masthead.outerHeight(true))
            }
          }
        });
      });
    }

    // Display user name in masthead user menu.
    $('.masthead-user-welcome-name').once('username', function() {
      if ($.cookie("Drupal.visitor.username") && $.trim($.cookie("Drupal.visitor.username")) != '') {
        $(this).html(decodeURI($.cookie("Drupal.visitor.username")));
      }
    });

    // Edition Switcher.
    // Add click handler to show edition options.
    $('#edition').once('menu', function() {
      var $edition = $(this);
      $('h2', this).bind(clickEvents, function (event) {
        Drupal.behaviors.scmpMasthead.activeMe($edition);
        event.preventDefault();
        event.stopPropagation();
      });
      $('.scmp-edition a').bind(clickEvents, function (event) {
        // Set and clear relevant cookies for cid refresh
        var $selected_edition = $(this).attr('data-edition');
        // Set new edition cookie
        if ($selected_edition) {
          $.cookie('Drupal.visitor.edition', $selected_edition, { path: '/', expires: 30 });
          // Remove cid cookie to trigger client cid refresh from backend
          if ($.cookie('_mcid')) {
            $.cookie('_mcid', '', { path: '/', expires: -108 });
          }
        }
        event.stopPropagation();
      });
    });

    // Remove the protocal part of the URL so we can obtain the
    // path a bit easier.
    var u = window.location.href.replace('://', '');
    // User login color box.
    $('.masthead-user-menu ul.menu li.reg a, #ajax-register-button, .newsletter-top-section .reg-btn').once('reg', function() {
       $(this).on('click', function(e) {
        e.preventDefault();
        $.colorbox({
          href: '/esi/block/scmp_login/register_form?destination=' + u.substr(u.indexOf('/') + 1),
          scrolling: false,
          opacity: .7,
          innerWidth: 600,
          trapFocus: false,
          onComplete: function onComplete() {
            var ajaxCallback = Drupal.absoluteUrl('/user/scmp_ajax_user_register').replace("http", "https");
            var settings = {"ajax":{"mt-register-submit":{"event":"mousedown","keypress":true,"prevent":"click","url":Drupal.absoluteUrl('/user/scmp_ajax_user_register').replace("http", "https"),"submit":{"_triggering_element_name":"op","_triggering_element_value":"Register"}}}};
            settings['urlIsAjaxTrusted'] = {};
            settings['urlIsAjaxTrusted'][ajaxCallback] = true;
            $.extend(Drupal.settings, settings);
            Drupal.attachBehaviors('.block-user-register');
            $(this).colorbox.resize();

            // Check the ajax form if it got any reCaptcha elements.
            $('#scmp-subscriptions-ajax-user-register-form').trigger('renderRecaptcha');
          }
        });
      });
    });
    $('.masthead-user-menu ul.menu li.login, #ajax-login-button').once('login', function() {
      $(this).click(function() {
        // Require cookies msg
        $.cookie('Drupal.visitor.cookies', '1');
        if (!$.cookie('Drupal.visitor.cookies')) {
          msg = Drupal.settings.cr.txt;
          var options = {
            scrolling: false,
            opacity: .7,
            html: msg
          };
          $.colorbox(options);
          $('#colorbox').addClass('nc');
        } else {
          $.colorbox({
            href: '/esi/block/user/login?destination=' + u.substr(u.indexOf('/') + 1),
            scrolling: false,
            opacity: .7,
            innerWidth: 600,
            trapFocus: false,
            onComplete: function onComplete() {
              $('#cboxLoadedContent .scmp-fb-login-button').remove();
              $('#cboxLoadedContent .fb-login-button').remove();
              var f = $('.fb-login-button:first');
              if (f.length) {
                $('#cboxLoadedContent .partner-facebook').after(f);
              }
              $('#cboxLoadedContent .no-paywall').find('.forgot-pass').on('click', function(e) {
                e.preventDefault();
                // $.colorbox.remove();
                $.colorbox({
                  href: '/esi/block/scmp_login/pass?destination=' + u.substr(u.indexOf('/') + 1),
                  scrolling: false,
                  opacity: .7,
                  innerWidth: 600,
                  trapFocus: false,
                  onComplete: function omComplete() {
                    // Check the ajax form if it got any reCaptcha elements.
                    $('#user-pass').trigger('renderRecaptcha');
                  }
                });
              });
               $('#cboxLoadedContent .no-paywall').find('a.register').on('click', function(e) {
                e.preventDefault();
                $.colorbox({
                  href: '/esi/block/scmp_login/register_form?destination=' + u.substr(u.indexOf('/') + 1),
                  scrolling: false,
                  opacity: .7,
                  innerWidth: 600,
                  trapFocus: false,
                  onComplete: function onComplete() {
                    var ajaxCallback = Drupal.absoluteUrl('/user/scmp_ajax_user_register').replace("http", "https");
                    var settings = {"ajax":{"mt-register-submit":{"event":"mousedown","keypress":true,"prevent":"click","url":Drupal.absoluteUrl('/user/scmp_ajax_user_register').replace("http", "https"),"submit":{"_triggering_element_name":"op","_triggering_element_value":"Register"}}}};
                    settings['urlIsAjaxTrusted'] = {};
                    settings['urlIsAjaxTrusted'][ajaxCallback] = true;
                    $.extend(Drupal.settings, settings);
                    Drupal.attachBehaviors('.block-user-register');
                    $(this).colorbox.resize();
                  }
                });
              });
            }
          });
        }
        $.cookie('Drupal.visitor.cookies', null);
        return false;
      });
    });
    $(document).ajaxComplete(function( event,request, settings ) {
      setTimeout($.colorbox.resize, 1000);             
    });

    // User menu.
    $('.logged-in .masthead-user-menu').once('menu', function() {
      $(this).each(function() {
        var $mastheadUserMenu = $(this);
        // User profile picture.
        $mastheadUserMenu.not('.masthead-main-sticky-nav .masthead-user-menu').each(function () {
          if ($.cookie('Drupal.visitor.upic')) {
            $mastheadUserMenu.prepend($('<img>',{class:'masthead-user-menu-profile-picture', src: $.cookie('Drupal.visitor.upic')}));
            $mastheadUserMenu.addClass('with-profile-picture');
            $('.masthead-user-menu-profile-picture', $mastheadUserMenu).click(function() {
              Drupal.behaviors.scmpMasthead.activeMe($mastheadUserMenu);
            });
          }
        });
        $(this).bind(clickEvents, function (handler) {
          if (handler.target == $mastheadUserMenu[0]) {
            Drupal.behaviors.scmpMasthead.activeMe($(this));
            handler.preventDefault();
          }
          handler.stopPropagation();
        });
      });
    });

    // Active search form.
    $('.masthead-search > .scmp-icon-search').once('search', function() {
      $(this).each(function() {
        var $scmpIconSearch = $(this);
        $(this).bind(clickEvents, function (handler) {
          if (handler.target == $scmpIconSearch[0]) {
            Drupal.behaviors.scmpMasthead.activeMe($(this));
            setTimeout(function(){
              $('form input.form-text', $scmpIconSearch).focus();
            }, 300);
            handler.preventDefault();
          }
          handler.stopPropagation();
        });
      });
    });

    $('.masthead-v2').find('.scmp-icon-enews').once('hover', function() {
      $(this).hover(function() {
        Drupal.behaviors.scmpMasthead.activeMe($(this));
      }, function() {
        Drupal.behaviors.scmpMasthead.activeMe($(this));
      });
    });

    // Active all section menu.
    var menuTap = 0;
    $('.masthead-asmenu-link').once('all-section-link', function() {
      var $scmpAllSectionMenuLink = $(this);
      var current = new Date().getTime();
      var diff = current - menuTap;
      $(this).bind(clickEvents, function (handler) {
        if (handler.target == $scmpAllSectionMenuLink[0] && (menuTap != 0 && diff > 300 || menuTap == 0)) {
          Drupal.behaviors.scmpMasthead.activeMe($(this));
          handler.preventDefault();
        }
        handler.stopPropagation();
      });

    });
    $('.masthead-asmenu-sticky-link > a').once('all-section-btn', function() {
      var $scmpAllSectionMenuBtn = $(this);
      $(this).bind(clickEvents, function (handler) {
        if (handler.target == $scmpAllSectionMenuBtn[0]) {
          Drupal.behaviors.scmpMasthead.activeMe($(this));
          handler.preventDefault();
        }
        handler.stopPropagation();
      });

    });

    $('#block-panels-mini-masthead-all-section-menu').once('asmenu', function() {
      $(this).find('.button-close').bind(clickEvents, function(handler) {
        menuTap = new Date().getTime();
        Drupal.behaviors.scmpMasthead.activeMe($('.masthead-asmenu-link[0]'));
        handler.preventDefault();
      });
    });

    var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    $('.masthead-date-info').once('date', function() {
      var time = new Date();
      var $day = $(this).find('.day time')
      var $date = $(this).find('.date time')
      $(this).find('time').attr('datetime', time.toString());
      $day.html(weekday[time.getDay()]);
      $date.html(month[time.getMonth()]+' '+time.getDate()+', '+time.getFullYear());
    });

    // QR promotion image
    $('.mobile-button-overlay-wrap').once('qr-ready', function() {
      $('.masthead-promotion .mobile-app').on('mouseenter', function(){
        $('.mobile-button-overlay-wrap').addClass('show upper');
      });
      $('.mobile-button-overlay-wrap').on('mouseleave', function(){
        $(this).removeClass('show');
      }).on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
        if (!$(this).hasClass('show')) {
          $(this).removeClass('upper');
        }
      });

    });
  }
};

})(jQuery);
;
/**
 * @file
 * Javascript related to the v2 footer.
 */
(function ($) {

  Drupal.behaviors.scmpFooter = {
    attach: function (context) {
      if ($.browser.msie) {
        $('#footer a[class^="scmp-icon-"]').text('').css('visibility', 'visible');
      }
    }
  };

})(jQuery);
;
(function ($) {

Drupal.toolbar = Drupal.toolbar || {};

/**
 * Attach toggling behavior and notify the overlay of the toolbar.
 */
Drupal.behaviors.toolbar = {
  attach: function(context) {

    // Set the initial state of the toolbar.
    $('#toolbar', context).once('toolbar', Drupal.toolbar.init);

    // Toggling toolbar drawer.
    $('#toolbar a.toggle', context).once('toolbar-toggle').click(function(e) {
      Drupal.toolbar.toggle();
      // Allow resize event handlers to recalculate sizes/positions.
      $(window).triggerHandler('resize');
      return false;
    });
  }
};

/**
 * Retrieve last saved cookie settings and set up the initial toolbar state.
 */
Drupal.toolbar.init = function() {
  // Retrieve the collapsed status from a stored cookie.
  var collapsed = $.cookie('Drupal.toolbar.collapsed');

  // Expand or collapse the toolbar based on the cookie value.
  if (collapsed == 1) {
    Drupal.toolbar.collapse();
  }
  else {
    Drupal.toolbar.expand();
  }
};

/**
 * Collapse the toolbar.
 */
Drupal.toolbar.collapse = function() {
  var toggle_text = Drupal.t('Show shortcuts');
  $('#toolbar div.toolbar-drawer').addClass('collapsed');
  $('#toolbar a.toggle')
    .removeClass('toggle-active')
    .attr('title',  toggle_text)
    .html(toggle_text);
  $('body').removeClass('toolbar-drawer').css('paddingTop', Drupal.toolbar.height());
  $.cookie(
    'Drupal.toolbar.collapsed',
    1,
    {
      path: Drupal.settings.basePath,
      // The cookie should "never" expire.
      expires: 36500
    }
  );
};

/**
 * Expand the toolbar.
 */
Drupal.toolbar.expand = function() {
  var toggle_text = Drupal.t('Hide shortcuts');
  $('#toolbar div.toolbar-drawer').removeClass('collapsed');
  $('#toolbar a.toggle')
    .addClass('toggle-active')
    .attr('title',  toggle_text)
    .html(toggle_text);
  $('body').addClass('toolbar-drawer').css('paddingTop', Drupal.toolbar.height());
  $.cookie(
    'Drupal.toolbar.collapsed',
    0,
    {
      path: Drupal.settings.basePath,
      // The cookie should "never" expire.
      expires: 36500
    }
  );
};

/**
 * Toggle the toolbar.
 */
Drupal.toolbar.toggle = function() {
  if ($('#toolbar div.toolbar-drawer').hasClass('collapsed')) {
    Drupal.toolbar.expand();
  }
  else {
    Drupal.toolbar.collapse();
  }
};

Drupal.toolbar.height = function() {
  var $toolbar = $('#toolbar');
  var height = $toolbar.outerHeight();
  // In modern browsers (including IE9), when box-shadow is defined, use the
  // normal height.
  var cssBoxShadowValue = $toolbar.css('box-shadow');
  var boxShadow = (typeof cssBoxShadowValue !== 'undefined' && cssBoxShadowValue !== 'none');
  // In IE8 and below, we use the shadow filter to apply box-shadow styles to
  // the toolbar. It adds some extra height that we need to remove.
  if (!boxShadow && /DXImageTransform\.Microsoft\.Shadow/.test($toolbar.css('filter'))) {
    height -= $toolbar[0].filters.item("DXImageTransform.Microsoft.Shadow").strength;
  }
  return height;
};

})(jQuery);
;
(function ($) {

  /**
   * Update toolbar user details on cached content
   */
  Drupal.behaviors.toolbarUserDetails = {
    attach: function(context) {
      $('#toolbar .account', context).once('user-details', function(e) {
        var $uid = $.cookie('Drupal.visitor.uid');
        var $esiname = $.cookie('Drupal.visitor.esiname');
        if ($uid) {
          $('#toolbar .account a').attr('href', '/user/' + $uid);
        }
        if ($esiname) {
          $('#toolbar .account a strong').text($esiname);
        }
      });
    }
  };

})(jQuery);
;
(function ($) {
Drupal.behaviors.expireHelper = {
  attach: function(context) {
    $('#toolbar .leaf a').once('expireHelper').each(function () {
      if ($(this).attr('href').match(/admin\/config\/development\/performance\/expire-url$/)) {
        var href = $(this).attr('href');
        href += '?destination=' + window.location.href.replace(/http(s)?:\/\/[^\/]+\//, '');
        $(this).attr('href', href);
      }

      if ($(this).attr('href').match(/admin\/config\/development\/performance\/expire-current-url$/)) {
        var href = $(this).attr('href');
        href += '?current_url=' + window.location.pathname;
        $(this).attr('href', href);
      }
    });
  }
};
})(jQuery);
;
(function ($) {

/**
 * Attaches the autocomplete behavior to all required fields.
 */
Drupal.behaviors.autocomplete = {
  attach: function (context, settings) {
    var acdb = [];
    $('input.autocomplete', context).once('autocomplete', function () {
      var uri = this.value;
      if (!acdb[uri]) {
        acdb[uri] = new Drupal.ACDB(uri);
      }
      var $input = $('#' + this.id.substr(0, this.id.length - 13))
        .attr('autocomplete', 'OFF')
        .attr('aria-autocomplete', 'list');
      $($input[0].form).submit(Drupal.autocompleteSubmit);
      $input
        .after($('<span class="element-invisible" aria-live="assertive"></span>')
          .attr('id', $input.attr('id') + '-autocomplete-aria-live')
        );
      $input.parent().parent().attr('role', 'application');
      new Drupal.jsAC($input, acdb[uri]);
    });
  }
};

/**
 * Prevents the form from submitting if the suggestions popup is open
 * and closes the suggestions popup when doing so.
 */
Drupal.autocompleteSubmit = function () {
  return $('.form-autocomplete > .dropdown').each(function () {
    this.owner.hidePopup();
  }).length == 0;
};

/**
 * Highlights a suggestion.
 */
Drupal.jsAC.prototype.highlight = function (node) {
  if (this.selected) {
    $(this.selected).removeClass('active');
  }
  $(node).addClass('active');
  this.selected = node;
  $(this.ariaLive).html($(this.selected).html());
};

/**
 * Unhighlights a suggestion.
 */
Drupal.jsAC.prototype.unhighlight = function (node) {
  $(node).removeClass('active');
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Positions the suggestions popup and starts a search.
 */
Drupal.jsAC.prototype.populatePopup = function () {
  var $input = $(this.input);
  // Show popup.
  if (this.popup) {
    $(this.popup).remove();
  }
  this.selected = false;
  this.popup = $('<div class="dropdown"></div>')[0];
  this.popup.owner = this;
  $input.parent().after(this.popup);

  // Do search.
  this.db.owner = this;
  this.db.search(this.input.value);
};

/**
 * Fills the suggestion popup with any matches received.
 */
Drupal.jsAC.prototype.found = function (matches) {
  // If no value in the textfield, do not show the popup.
  if (!this.input.value.length) {
    return false;
  }

  // Prepare matches.
  var ul = $('<ul class="dropdown-menu"></ul>');
  var ac = this;
  ul.css({
    display: 'block',
    right: 0
  });
  for (var key in matches) {
    $('<li></li>')
      .html($('<a href="#"></a>').html(matches[key]).click(function (e) { e.preventDefault(); }))
      .mousedown(function () { ac.select(this); })
      .mouseover(function () { ac.highlight(this); })
      .mouseout(function () { ac.unhighlight(this); })
      .data('autocompleteValue', key)
      .appendTo(ul);
  }

  // Show popup with matches, if any.
  if (this.popup) {
    if (ul.children().length) {
      $(this.popup).empty().append(ul).show();
      $(this.ariaLive).html(Drupal.t('Autocomplete popup'));
    }
    else {
      $(this.popup).css({ visibility: 'hidden' });
      this.hidePopup();
    }
  }
};

Drupal.jsAC.prototype.setStatus = function (status) {
  var $throbber = $('.glyphicon-refresh, .autocomplete-throbber', $('#' + this.input.id).parent()).first();
  var throbbingClass = $throbber.is('.autocomplete-throbber') ? 'throbbing' : 'glyphicon-spin';
  switch (status) {
    case 'begin':
      $throbber.addClass(throbbingClass);
      $(this.ariaLive).html(Drupal.t('Searching for matches...'));
      break;
    case 'cancel':
    case 'error':
    case 'found':
      $throbber.removeClass(throbbingClass);
      break;
  }
};

})(jQuery);
;
