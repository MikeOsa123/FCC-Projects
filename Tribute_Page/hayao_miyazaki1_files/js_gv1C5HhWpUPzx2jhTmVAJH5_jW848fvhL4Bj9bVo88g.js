(function($) {
  $(document).ready(function() {
    if (typeof _ain == 'object') {
      var elements = [
        '#page-title',
        '.pane-node-field-subheading',
        '.pane-node-field-images',
        '.pane-node-body',
        '.pane-node-field-mutlimedia-embed'
      ];
      var maincontent = "";
      $.each(elements, function(index, value){
        if ($(value).length) {
          maincontent += value + ', ';
        }
      });
      _ain.maincontent = maincontent.slice(0, -2); //remove last ', '.
      (function (d, s) {
      var sf = d.createElement(s); sf.type = 'text/javascript'; sf.async = true;
      sf.src = (('https:' == d.location.protocol) ? 'https://d7d3cf2e81d293050033-3dfc0615b0fd7b49143049256703bfce.ssl.cf1.rackcdn.com' : 'http://t.contentinsights.com')+'/stf.js';
      var t = d.getElementsByTagName(s)[0]; t.parentNode.insertBefore(sf, t);
      })(document, 'script');
    }
  });
})(jQuery);
;
// Load Lotame script
(function(window, document, $){
  'use strict';
  
  var cc_extr_callback = 'window.ccauds';

  var cc_client_id = 11028;

  // extract url
  function extract_lotame_url() {
    var domain = '.crwdcntrl.net';
    var noDomainCookie = true;
    var start = document.cookie.indexOf('_cc_domain');
    if (start > -1) {
      var valStartDc = document.cookie.indexOf('=', start); 
      if (valStartDc > 0) {
        noDomainCookie = false;
        valStartDc++;
        var valEndDc = document.cookie.indexOf(';', valStartDc); 
          valEndDc = valEndDc > 0 ? valEndDc : document.cookie.length; 
          domain = document.cookie.slice(valStartDc, valEndDc);
      } 
    }

    // If there was no domain cookie then check to see if there is an id cookie.
    var idCookie = false; 

    if (noDomainCookie) {
      var id;
      start = document.cookie.indexOf('_cc_id'); 
      if (start > -1) {
        var valStartId = document.cookie.indexOf('=', start); 
        if (valStartId > 0) {
          idCookie = true;
          valStartId++;
          var valEndId = document.cookie.indexOf(';', valStartId); 
          valEndId = valEndId > 0 ? valEndId : document.cookie.leng
          id = document.cookie.slice(valStartId, valEndId); 
        }
      }
    }

    var cc_url = '//ad' + domain;

    if (typeof(portNumber) != 'undefined' && portNumber != null) {
      cc_url = cc_url + ':' + portNumber; 
    }

    cc_url = cc_url + '/5/c=' + cc_client_id + '/pe=y/callback=' + cc_extr_callback;

    if(idCookie) {
      cc_url = cc_url + '/pid=' + id;
    }

    return cc_url; 

  }

  // create a script element
  function getAudiences(){
    var url = extract_lotame_url();
    var lotameScript = document.createElement('script');
    lotameScript.setAttribute('language','javascript');
    lotameScript.setAttribute('type','text/javascript');
    lotameScript.setAttribute('src',url);
    lotameScript.setAttribute('async','');
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(lotameScript, s);
  }

  window.findDataLayerValue = function(name, arrObj) {
    if (typeof(arrObj) !== 'undefined' && arrObj.length > 0) {
        for(var i=0; i < arrObj.length; i++) {
            if(arrObj[i].hasOwnProperty(name)){
              return arrObj[i][name];
            }
        }
    }
    return false;
  }

  window.ccauds = function(data) {
    // 
    if(typeof(data) !== 'undefined'){

      // set value for global variable
      window.lotccauds = data;

      if ( typeof data.Profile.pid !== 'undefined' && data.Profile.pid !== ''){
        // 
        if(typeof(window.ga) !== 'undefined'){
          ga("set", "dimension18", data.Profile.pid );
        }
        // using dataLayer
        if( typeof(window.dataLayer) !== 'undefined') {
          window.dataLayer.push({"audienceId": data.Profile.pid});
        }
      }else{
        console.log('ccauds is Undefined');
      }

      if ( typeof data.Profile.Audiences.Audience !== 'undefined' && JSON.stringify(data.Profile.Audiences.Audience) !== '[]'){
        var lotameAudienceData = '';
        for ( var propLv1 in data.Profile.Audiences.Audience ){
          if ( typeof data.Profile.Audiences.Audience[propLv1] === 'object' ){
              for ( var propLv2 in data.Profile.Audiences.Audience[propLv1] ){
                if ( lotameAudienceData !== '' ){
                  lotameAudienceData += ', '
                }
              lotameAudienceData += propLv2 + ":" + data.Profile.Audiences.Audience[propLv1][propLv2];
              }
          }
        }
        if(lotameAudienceData.length > 0){
          if(typeof(window.ga) !== 'undefined') {
            ga("set", "dimension25", lotameAudienceData );
          }
          //
          if( typeof(window.dataLayer) !== 'undefined') {
              window.dataLayer.push({"behaviourId": lotameAudienceData});
          }
        }
      }else{
        console.log('ccauds is Undefined');
      }
    }else{
      console.log('empty lotame data');
    }
    
    if (typeof(window.ga) !== 'undefined') {
      ga('send', 'pageview');
    }
    
  }

  // load
  getAudiences();
  
})(window, document, jQuery);;
(function ($) {
    Drupal.behaviors.scmpReCaptchaHelper = {
        attach: function (context, settings) {

            $('form').once('element-processed', function(i, v) {
                $(this).on('renderRecaptcha', function() {
                    var recaptchaElements = $('.g-recaptcha', context);
                    if (recaptchaElements.length > 0) {
                        var renderRecaptcha = function() {
                            $.each(recaptchaElements, function(i, v){
                                if (!v.hasChildNodes()) {
                                    grecaptcha.render(v, {sitekey: settings.scmpRecaptchaSiteKey});
                                }
                            });
                        }

                        if (typeof grecaptcha === "undefined") {
                            $.getScript('https://www.google.com/recaptcha/api.js');
                        }
                        else {
                            renderRecaptcha();
                        }
                    }
                });
            });

        }
    };
})(jQuery);;
(function ($) {

Drupal.behaviors.qt_accessible_tabs = {
  attach: function (context, settings) {
    $('.quick-accessible-tabs', context).once(function(){

      var options = {
        wrapperClass: 'quick-accessible-tabs-content', // Classname to apply to the div that is wrapped around the original Markup
        currentClass: 'current', // Classname to apply to the LI of the selected Tab
        tabhead: '.tabhead', // Tag or valid Query Selector of the Elements to Transform the Tabs-Navigation from (originals are removed)
        tabheadClass: 'tabhead', // Classname to apply to the target heading element for each tab div
        tabbody: '.tabbody', // Tag or valid Query Selector of the Elements to be treated as the Tab Body
        fx:'show', // can be "fadeIn", "slideDown", "show"
        fxspeed: 0, // speed (String|Number): "slow", "normal", or "fast") or the number of milliseconds to run the animation
        currentInfoText: '', // text to indicate for screenreaders which tab is the current one
        currentInfoPosition: 'prepend', // Definition where to insert the Info Text. Can be either "prepend" or "append"
        currentInfoClass: 'current-info', // Class to apply to the span wrapping the CurrentInfoText
        tabsListClass:'tabs-list', // Class to apply to the generated list of tabs above the content
        syncheights:false, // syncs the heights of the tab contents when the SyncHeight plugin is available http://blog.ginader.de/dev/jquery/syncheight/index.php
        syncHeightMethodName:'syncHeight', // set the Method name of the plugin you want to use to sync the tab contents. Defaults to the SyncHeight plugin: http://github.com/ginader/syncHeight
        cssClassAvailable:false, // Enable individual css classes for tabs. Gets the appropriate class name of a tabhead element and apply it to the tab list element. Boolean value
        saveState:false, // save the selected tab into a cookie so it stays selected after a reload. This requires that the wrapping div needs to have an ID (so we know which tab we're saving)
        autoAnchor:false, // will move over any existing id of a headline in tabs markup so it can be linked to it
        pagination:false, // adds buttons to each tab to switch to the next/previous tab
        position:'top', // can be 'top' or 'bottom'. Defines where the tabs list is inserted.
        wrapInnerNavLinks: '', // inner wrap for a-tags in tab navigation. See http://api.jquery.com/wrapInner/ for further informations
        firstNavItemClass: 'first', // Classname of the first list item in the tab navigation
        lastNavItemClass: 'last', // Classname of the last list item in the tab navigation
        clearfixClass: 'clearfix' // Name of the Class that is used to clear/contain floats
      };

      var id = $(this).attr('id');
      var qtKey = 'qt_' + this.id.substring(this.id.indexOf('-') +1);
      var qt_options = settings.scmp_quicktabs[qtKey].options;

      active_tab= parseInt(settings.scmp_quicktabs[qtKey].active_tab);

      var tabs = $(this).accessibleTabs(options);

      tabs.showAccessibleTab(active_tab);
    });
  }
}

})(jQuery);
;
(function ($) {
  Drupal.behaviors.breakoutBGHandler = {
    attach: function (context, settings) {
      $('img[data-thief-color]').once('color', function() {
        $(this).closest('.background-image').css('background-color', $(this).data('thief-color'));
      });
    }
  }
})(jQuery);
;
(function ($) {
/**
 * Attaches the behavior..
 */
Drupal.behaviors.scmpGallerySwiper = {
  attach: function (context, settings) {
    $('.scmp-gallery-swiper', context).once('swiper', function() {
      var pagination = false;
      var $swiperWrapper = $(this);
      var swiperSlideLength = $swiperWrapper.find('.swiper-slide').length;
      if (swiperSlideLength > 1) {
        pagination = '.swiper-pagination';
      }
      $swiperWrapper.find('.swiper-slide img').each(function() {
        if ($(this).attr("data-caption")) {
          var $caption = $('<div class="swiper-slide-caption-wrapper scmp-icon-author-i"><div class="swiper-slide-index">' + ($(this).parent().index() + 1) + ' of ' + swiperSlideLength + '</div><div class="swiper-slide-caption">' + $(this).data('caption') + '</div></div>');
        }
        else {
          var $caption = $('<div class="swiper-slide-caption-wrapper no-real-caption"><div class="swiper-slide-index">' + ($(this).parent().index() + 1) + ' of ' + swiperSlideLength + '</div></div>');
        }
        $caption.appendTo($(this).parent());
      });
      if (swiperSlideLength > 1) {
        $swiperWrapper.addClass('swiper-carousel');
        var swiper = $swiperWrapper.swiper({
          calculateHeight: true,
          resizeReInit: true,
          slidesPerView: 1,
          slidesPerGroup: 1,
          pagination: pagination,
          paginationClickable: true,
          resizeReInit: true,
          roundLengths: true,
          onInit: function(swiper) {
            $swiperWrapper.find('.swiper-slide, .swiper-wrapper').css('height', 'auto');
            $(swiper.slides).find('.swiper-slide-caption-wrapper').once('hover', function() {
              $(this).hover(function() {
                clearTimeout(swiper.timeoutValue);
                $(this).removeClass('dieing').addClass('active').parents('.swiper-wrapper').addClass('caption-hover');
              }, function() {
                clearTimeout(swiper.timeoutValue);
                $(this).addClass('dieing')
                swiper.timeoutValue = setTimeout(function() {
                  $('.scmp-gallery-swiper').find('.active.dieing').removeClass('active').parents('.swiper-wrapper').removeClass('caption-hover');
                }, 200);
              }).click(function() {
                $(this).removeClass('active').parents('.swiper-wrapper').removeClass('caption-hover');
              });
              $swiperWrapper.find('.swiper-next').click(function() {
                swiper.swipeNext();
              });
              $swiperWrapper.find('.swiper-prev').click(function() {
                swiper.swipePrev();
              }).addClass('inactive');
            });
          },
          onFirstInit: function(swiper) {
            swiper.timeoutValue = -1;
          },
          onSlideClick: function(swiper) {
            // todo, enlarge effect.
            console.log(swiper.activeSlide());
          },
          onSlideChangeEnd: function(swiper) {
            if($(swiper.slides[0]).hasClass('swiper-slide-active')) {
              $swiperWrapper.find('.swiper-prev').addClass('inactive');
            }
            else {
              $swiperWrapper.find('.swiper-prev').removeClass('inactive');
            }
            if($(swiper.slides[swiper.slides.length - 1]).hasClass('swiper-slide-active')) {
              $swiperWrapper.find('.swiper-next').addClass('inactive');
            }
            else {
              $swiperWrapper.find('.swiper-next').removeClass('inactive');
            }
          }
        });
      }
      else {
        $swiperWrapper.find('.swiper-slide-index').remove();
        $swiperWrapper.data('timeoutValue', -1);
        $swiperWrapper.find('.swiper-slide-caption-wrapper').hover(function() {
          clearTimeout($swiperWrapper.data('timeoutValue'));
          $(this).removeClass('dieing').addClass('active').parents('.swiper-wrapper').addClass('caption-hover');
        }, function() {
          clearTimeout($swiperWrapper.data('timeoutValue'));
          $(this).addClass('dieing');
          $swiperWrapper.data('timeoutValue', setTimeout(function() {
            $('.scmp-gallery-swiper').find('.active.dieing').removeClass('active').parents('.swiper-wrapper').removeClass('caption-hover');
          }, 200));
        }).click(function() {
          $(this).removeClass('active').parents('.swiper-wrapper').removeClass('caption-hover');
        });
      }
    });
  }
}
})(jQuery);
;
(function($, Drupal, window, document, undefined) {

  $(document).ready(function() {
    // Getting promo colorbox setting variables.
    var promo_colorbox = Drupal.settings.colorbox_promo;

    // Sorting the colorbox settings object by priority.
    var keys = [];
    for(var k in promo_colorbox) keys.push(k);
    var sorted = keys.sort(function(a, b) {
      return promo_colorbox[b].priority - promo_colorbox[a].priority;
    });

    // Loop through all the promo colorbox from highest priority to lowest priority.
    for(var i = 0; i < sorted.length; i++) {
      var key = sorted[i];
      // Get the promo colorbox setting.
      var promo_settings = promo_colorbox[key];

      // Checking if it matches the target device condition.
      // target_device return true if matched.
      var target_device = function() {
        var device;
        if(promo_settings.targetting.device == 'Mobile') {
            device = ($.isAndroidTablet() || $.isTablet());
          // Checking if it matches mediaquery.
          if(promo_settings.targetting.mediaquery) {
            device = ($.isAndroidTablet() || $.isTablet()) && $("#device-tablet").css("display") == "block";
          }
        } else if(promo_settings.targetting.device == 'iPad') {
            device = $.isIPad();
          // Checking if it matches mediaquery.
          if(promo_settings.targetting.mediaquery) {
            device = ($.isIPad()) && $("#device-tablet").css("display") == "block";
          }
        } else if(promo_settings.targetting.device == 'Android Tablet') {
            device = $.isAndroidTablet();
          // Checking if it matches mediaquery.
          if(promo_settings.targetting.mediaquery) {
            device = ($.isAndroidTablet()) && $("#device-tablet").css("display") == "block";
          }
        } else {
          device = true;
        }
        return device;
      }();

      // Checking target referral URL.
      // referral_pass return true if no targetting referral url input,
      // return true if having targetting referral url and matched,
      // return false if having targetting referral url but not matched.
      var referral_pass = function() {
        var target_client = false; // has referral URL input
        var client_referral = false; // referral URL matched

        if(promo_settings.targetting.referrer) {
          // target_client is true if has Referral URL has input.
          target_client = true;
        }

        if(target_client && document.referrer) {
          var referrer = new URL(document.referrer);
          if(referrer !== undefined && referrer.hostname != document.location.hostname) {
            var client_urls = promo_settings.targetting.referrer;
            // Check if the referral URL is client URL.
            var urls = client_urls.split('\n');
            // Loop through array to check the match of referral site urls.
            for(var i = 0; i < urls.length; i++) {
              var url = urls[i];
              url = url.trim();

              // Simple URL checking.
              if(url == referrer.hostname) {
                client_referral = true;
                break;
              }

              // Complex checking for URL input having * general matching. e.g. *.scmp.* or *.scmp.com.
              if(url.indexOf('*') > -1) {
                // Replace the * into regex pattern.
                regex_url = url.replace(/\./g, "\\$&");
                regex_url = regex_url.replace(/\*/g, '.+');

                // Use regex to check the matches for referrer url.
                var regex = new RegExp(regex_url);
                var m;
                if((m = regex.exec(referrer.hostname)) !== null) {
                  if(m.index === regex.lastIndex) {
                    regex.lastIndex++;
                  }
                  client_referral = true;
                  break;
                }
              }
            }
          }
        }
        return(target_client && client_referral || !target_client) ? true : false;
      }();

      // Check if it has cookie.
      var cookie_pass = ($.cookie(promo_settings.cookie) == undefined || $.cookie(promo_settings.cookie) == null);

      // Everything is passed, display the colorbox popup.
      if(target_device && (!$('#colorbox').is(':visible')) && cookie_pass == true && referral_pass) {
        var timeout = $('body').hasClass('mt') ? 5000 : 0; // Timeout setting

        // Display the colorbox popup.
        setTimeout(function() {
          $('body').addClass('colorbox_promo');
          var options = {
            innerWidth: promo_settings.width,
            innerHeight: promo_settings.height,
            href: '/promo/content/' + promo_settings.delta,
            onClosed: function() {
              // Set cookie if config to display only once.
              if(promo_settings.display.once == true) {
                $.cookie(promo_settings.cookie, 1, {
                  path: "/"
                });
              }
              $('body').removeClass('colorbox_promo');
            },
            onComplete: function() {
              $('#colorbox').find('a.button, .wrapper .left a').click(function() {
                $.cookie('visitDesktopFirst', null, {
                  path: '/',
                  domain: '.scmp.com'
                });
                return true;
              });
            }
          };
          $.colorbox(options);
          var classes = 'colorbox_promo ' + promo_settings.delta;
          classes = promo_settings.targetting.referrer ? classes += ' colorbox_referral' : classes;
          $('#colorbox').data('cookie', promo_settings.cookie);
          $('#colorbox').addClass(classes);
        }, setTimeout);

        // break from the loop, as only one colorbox will pop.
        break;
      }
    }
  });

  // Event trigger when close the colorbox.
  Drupal.behaviors.colorbox_hide = {
    attach: function(context, settings) {
      $('#colorbox_msg_hide').click(function() {
        if($(this).is(':checked')) {
          var cookie = $('#colorbox').data('cookie');
          $.cookie(cookie, 1, {
            path: '/',
            expires: 30
          });
          $.colorbox.close();
        }
      });
      $('#colorbox .close:not(.messages-wrapper .close)').click(function() {
        $.colorbox.close();
      });
    }
  };

})(jQuery, Drupal, this, this.document);
;
/**
 * @file This file for the business article sentifi widget.
 */

(function($) {
  $(document).ready(function() {
    $('.sentifi-widget-placeholder').once('sentifi', function() {
      var $sentifi_widget = $('<div class="sentifi-widget" data-wid="272"><a href="https://sentifi.com">sentifi.com</a><h3>SCMP - Sentifi - Top themes and market attention on</h3></div><script type="text/javascript" async src="https://cdn-pub.sentifi.com/custo/widgets.js"></script>');
      $sentifi_widget.insertAfter($('.pane-node-body .pane-content > p').eq(4)).wrap("<div class='sentifi-widget'></div>");
    });
  });
})(jQuery);

;
// ComScore tracking code
var _comscore = _comscore || [];
(function ($) {
  $(document).ready(function(){
    _comscore.push({ c1: Drupal.settings.comscore.c1, c2: Drupal.settings.comscore.c2 });
    (function() {
    var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
    s.src = (document.location.protocol == "https:" ? " https://sb" : " http://b") + ".scorecardresearch.com/beacon.js";
    el.parentNode.insertBefore(s, el);
    })();
  });
})(jQuery);
;
(function ($) {
  Drupal.behaviors.scmpCommentsCount = {
    attach: function (context) {
      var $commentPopup = $('.comment-popup');
      var $scmpButtonComment = $('.scmp_button_comment');
      if (typeof Drupal.settings.nid != 'undefined' && typeof Drupal.settings.comment != 'undefined') {
        $('body').once('comment-count', function() {
          $.get('/scmp_comments/count/' + parseInt(Drupal.settings.nid), function(data) {
            data = $.parseJSON(data);
            if (Number.isInteger(data) && data > 0) {
              Drupal.settings.comment.count = data;
              $scmpButtonComment.find('.scmp-icon-comment .addthis-counter').remove();
              $scmpButtonComment.find('.scmp-icon-comment').prepend('<span class="addthis-counter">' +  parseInt(Drupal.settings.comment.count) + '</span>');
              $scmpButtonComment.removeClass('comment-count-none');
            }
          });
        });
      }

      $scmpButtonComment.once('count', function() {
        if (typeof Drupal.settings.comment != "undefined") {
          if (typeof Drupal.settings.comment.count != "undefined" && parseInt(Drupal.settings.comment.count) > 0) {
            // Remove 's' for single comment.
            if (Drupal.settings.comment.count == 1) {
              var buttonHTML = $(this).html().replace("Comments", "Comment");
              $(this).html(buttonHTML);
            }
            $(this).find('.scmp-icon-comment').prepend('<span class="addthis-counter">' +  parseInt(Drupal.settings.comment.count) + '</span>');
            $(this).css({display:'block'});
          }else if (typeof Drupal.settings.comment.mode != "undefined" && parseInt(Drupal.settings.comment.mode) != 2 && parseInt(Drupal.settings.comment.mode) != 3) {
            // No comments and commenting not open:
            $(this).parents('.pane-share-widgets-article').addClass('hide-comment');
            // Hide icon.
            $(this).css({display:'none'});
            // Hide comment block.
            $('#comment-heading').closest('.comment-heading').parent('div.col').hide();
          }else {
            $(this).addClass('comment-count-none');
            $(this).attr({href:'#add-comment'});
            $(this).css({display:'block'});
            $('.comment-tabs').hide();
          }
        }
      });

      // Article Popup comment.
      // Apply on for boom theme and article page.
      if ($('body').hasClass('node-type-article') && $('body').hasClass('theme-boom')) {

        // Bind click event for comment count btn.
        $('.scmp_button_comment').once('popup', function() {
          // Construct comment popup.
          if ($commentPopup.length == 0){
            $commentPopup = $('<div />').addClass('comment-popup').hide();
            $commentOverlay = $('<div />').addClass('comment-popup-overlay');
            $commentContent = $('<div />').addClass('comment-popup-content').append($('<div />').addClass('btn-close'), $('<iframe />'));
            $commentPopup.append($commentOverlay, $commentContent);
            $('body').append($commentPopup);
          }

          $(this).on('click', function() {
            // Fetch comment page in frame.
            if (!$commentPopup.find('iframe').hasClass('load-processed')) {
              $commentPopup.find('.comment-popup-content').append('<div class="loader">Loading...</div>');
            }

            $commentPopup.find('iframe').once('load', function() {
              $(this).attr('src', '/scmp_comments/popup/' + Drupal.settings.nid).on('load', function () {
                $commentPopup.find('.loader').remove();
                var $commentFrame = $commentPopup.find('iframe');
                // Finish loading popup, add exclusive css for ipad
                var isIOS = /iphone|ipod|ipad/i.test(navigator.userAgent);
                if (isIOS) {
                  $commentFrame.contents().find('head').append("<style>html,body.page-scmp-comments-popup{height:100%;overflow-y:auto;}body.page-scmp-comments-popup{-webkit-overflow-scrolling:touch;}</style>");
                }
                var updateCount = $commentFrame[0].contentWindow.Drupal.settings.comment.count;
                // Show button only if comment count > 0.
                if (updateCount > 0) {
                  $('.scmp_button_comment').find('.addthis-counter').html(parseInt(updateCount));
                }
              });
            });
            // Open animation.
            $commentPopup.show();
            $commentPopup.find('.comment-popup-overlay').fadeIn(500);
            $commentPopup.find('.comment-popup-content .btn-close').fadeIn(500);
            $commentPopup.find('.comment-popup-content').css('right', '0');
            $('#comment-count-floating').css('right', '720px');
            $('#comment-count-floating').fadeOut(500);

            // Stop body scrolling.
            if (!$('body').hasClass('comment-popup-on') && $.isIPad()) {
              // Freeze <body> in static to advoid scrolling during comment popup.
              // Store current body position for comment popup show/hide access.
              Drupal.behaviors.scmpCommentsCount.bodyScrollTop = $('body').scrollTop();

              $('body').addClass('comment-popup-on').css('top', '-' + Drupal.behaviors.scmpCommentsCount.bodyScrollTop + 'px');
            }
            else {
              $('body').css('overflow', 'hidden');
            }
          });

          // Hide all comment button.
          $('.scmp_button_comment').hide();

          var updateCount = Drupal.settings.comment.count;
          if (updateCount > 0 || parseInt(Drupal.settings.comment.mode) == 2 || parseInt(Drupal.settings.comment.mode) == 3) {
            $('.scmp_button_comment').show().find('.addthis-counter').html(parseInt(updateCount));
            if ($('#comment-count-floating').css('right') != '0px') {
              $('#comment-count-floating').hide();
            }
          }

          // Bind click event for overlay and close btn.
          $('.comment-popup-overlay, .btn-close', $commentPopup).click(function() {

            // Close animation.
            $commentPopup.find('.comment-popup-content').attr('style', '');
            $commentPopup.find('.comment-popup-content .btn-close').fadeOut(500);
            $commentPopup.find('.comment-popup-overlay').fadeOut(500, function() {
              $commentPopup.hide();
            });
            $('#comment-count-floating').fadeIn(500);
            $('#comment-count-floating').css('right', '0');

            // Enable body scrolling.
            if ($('body').hasClass('comment-popup-on') && ($.isIPad())) {
              // Remove freezed <body> position.
              $('body').removeClass('comment-popup-on').css('top', '0')
                .scrollTop(Drupal.behaviors.scmpCommentsCount.bodyScrollTop);
            }
            else {
              $('body').attr('style', function(i, style) {
                return style.replace(/overflow[^;]+;?/g, '');
              });
            }
          });
        });
      }
    }
  };
})(jQuery);

;
 /**
 * @file newsletter.js
 * SCMP newsletter client-side JS.
 * Provides subscribe/unsubcribe form logic
 * AJAX submit with API handler
 */
'use strict';
window.SCMPApp = window.SCMPApp || {};
try {
  (function ($) {
    window.SCMPApp.newsletter = (function () {
      // Init self-reference var in outer scope
      var _self;
      return {
        log: [],
        // Newsletter AJAX form selector
        formSelector: 'form.scmp-newsletter-subscription-form',
        // Main: initialize the JS
        init: function () {
          // Set reference to self,
          // can use instead of "this" and window.SCMPApp.newsletter inner scope
          _self = this;

          // Process
          var uid = _self.getUID();

          // random the tid list
          _self.randomTid();

          if (!uid) {
            // Default show for anon
            if ($(_self.formSelector).length > 0) {
              $(_self.formSelector).each(function(){
                _self.getAnonNewsletterSubscriptions();
                _self.initFormVisibility();
              });
            }
          } else {
            // Get user info
            _self.getUserNewsletterSubscriptions();
          }
          _self.initDefaultEmail();
          _self.attachAjaxFormSubmit();

          //multi opt in checkbox ui
          $("#scmp-inline-newsletter-multi-opt-in-0, #scmp-inline-newsletter-multi-opt-in-1").change(function(){
              if ( $(this).prop('checked')){
                $(this).parent().addClass('selected');
              } else {
                $(this).parent().removeClass('selected');
              }
          });
        },
        //Get newsletter subscription for anon
        getAnonNewsletterSubscriptions: function(){
            if (_self.hasSessionStorage()) {
                _self.subscriptions = JSON.parse(sessionStorage.getItem('scmp-anon-newsletters')) || [];
            }
        },
        // Get newsletter subscription data for user
        getUserNewsletterSubscriptions: function() {
          // Check local session storage cache
          var uid = _self.getUID();
          var cache = {};
          var timestamp = Math.floor(Date.now() / 1000);
          // 5 min cache expiry
          var ttl = 300; // seconds
          // Check if cache cleared on other protocol (e.g https->http)
          if (typeof $.cookie !== 'undefined' && $.cookie('scmp-newsletters-cleared')) {
            _self.clearSessionStorage();
            // Remove cookie
            $.cookie('scmp-newsletters-cleared', null, { path: '/' });
          }
          if (_self.hasSessionStorage()) {
            cache = JSON.parse(sessionStorage.getItem('scmp-newsletters')) || {};
          }
          // Check expired cache
          if (typeof cache.x !== 'undefined') {
            var expires = cache.x;
            if (parseInt(expires, 10) <= parseInt(timestamp, 10)) {
              // Cache miss, trigger refresh
              delete cache.newsletters;
            }
          }
          // If no session storage or not checked yet
          if (typeof cache.newsletters === 'undefined') {
            // Add CSRF token
            var csrfToken = false;
            if (typeof $.cookie !== 'undefined') {
              csrfToken = $.cookie('CSRF');
            }
            // Get newsletter subscriptions via AJAX
            // UID is validated server-side with CSRF
            $.ajax({
              type: 'GET',
              url: '/api/rest/public/v2/newsletter/' + uid,
              headers: {
                'X-Csrf-Token': csrfToken
              },
              xhrFields: {
                withCredentials: true
              },
              dataType: 'json',
              data: {},
              success: function(data) {
                if (typeof data.newsletters !== 'undefined' && data.newsletters) {
                  // Success case
                  cache.x = timestamp + ttl;
                  // Ensure integer tids for match with page
                  data.newsletters.forEach(function(v, k) {
                    data.newsletters[k] = parseInt(v, 10);
                  });
                  cache.newsletters = data.newsletters;
                  // Store in local cache for success case
                  if (_self.hasSessionStorage()) {
                    _self.log.push('newsletter subscription data cache miss');
                    sessionStorage.setItem('scmp-newsletters', JSON.stringify(cache));
                  }
                  // Set data in DOM for access
                  _self.subscriptions = cache.newsletters;
                  // Refresh form visibility
                  _self.initFormVisibility();
                  // log
                  _self.log.push('fetched newsletter subscription data');
                }
              },
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                _self.log.push(errorThrown);
              }
            });
          } else {
            // Set data in DOM for access
            _self.log.push('newsletter subscription data cache hit');
            _self.subscriptions = cache.newsletters;
            // Refresh form visibility
            _self.initFormVisibility();
          }
        },
        // Set default form email
        initDefaultEmail: function() {
          var mail = '';
          if (typeof $.cookie !== 'undefined') {
            if ($.cookie('Drupal.visitor.mail')) {
              mail = $.cookie('Drupal.visitor.mail');
              $(_self.formSelector + ' input[name="email"]').val(mail);
            }
          }
        },
        // Set default form visibility
        initFormVisibility: function () {
          // Default show if no user subscriptions
          if (typeof _self.subscriptions === 'undefined') {
            return;
          }
          var newsletters = _self.subscriptions;
          var tidObj = _self.findTid();
          // Iterate and hide subscribed form
          if ($(_self.formSelector).length > 0) {
            $(_self.formSelector).each(function(){
              var $this = $(this);
              if ( tidObj ){
                if (typeof window.dataLayer !== 'undefined') {
                  window.dataLayer.push({
                    event: 'tracking',
                    tracking: {
                      category: 'Newsletter (Inlines) Imp',
                      action: 'Newsletter widget impression',
                      label: tidObj.name
                    }
                  });
                }
                _self.setNewForm($this, tidObj);
                _self.initFormPosition($this);
              } else {
                var tid = $this.data('newsletter-tid');
                _self.log.push('checking newsletter subscription: ' + tid);
                if ($.inArray(tid, newsletters) !== -1 || $.inArray(tid.toString(), newsletters) !== -1) {
                  _self.log.push('newsletter subscription exists for ' + tid + '. form not displayed.');
                  $this.addClass('hidden');
                } else {
                  // Position inline newsletter form
                  _self.initFormPosition($this);
                }
              }
            });
          }
        },
        // Set form position insert
        initFormPosition: function ($form) {
          // Insert in article body and wrap
          var $paragraph = $('.pane-node-body .pane-content > p:not(.image,.link)').eq(0);
          if ($paragraph.length) {
            $form.insertAfter($paragraph).wrap("<div class='scmp-inline-newsletter-subscription'></div>");
          } else {
            $form.appendTo('.pane-node-body .pane-content').wrap("<div class='scmp-inline-newsletter-subscription'></div>");
          }
          // Show form
          $form.removeClass('hidden');
          // Inline position adjustment
          _self.updateOffsetVersion();
          // Button effects
          $('.node-type-article .scmp-inline-newsletter-subscription .subscribe-btn').hover(
            function() {
              $('.node-type-article .scmp-inline-newsletter-subscription .fake-submit').addClass('hover');
            }, function() {
              $('.node-type-article .scmp-inline-newsletter-subscription .fake-submit').removeClass('hover');
            }
          );
        },
        updateOffsetVersion: function () {
          // Inline position adjustment
          $('.node-type-article .pane-node-body .scmp-inline-newsletter-subscription').each(function() {
            // Start without offset for actual offset
            $(this).removeClass('offset-version');
            var offsetLeft = $(this).position().left;
            if (offsetLeft > 37.5) {
              $(this).addClass('offset-version');
            }
            if ($(this).next().hasClass('blockquote-quote')) {
              $(this).addClass('margin-bottom clearfix');
            }
          });
          // Match child height
          $('.node-type-article .pane-node-body .scmp-inline-newsletter-subscription').each(function(){
            var height = $(this).height();
            var formHeight = $(this).find('form').height();
            $(this).css({height: formHeight});
          });
        },
        // Attach the jquery.form plugin AJAX submit logic to the form
        attachAjaxFormSubmit: function(form) {
          form = form || 'subscribe';
          var ajaxFormSelector = _self.formSelector;
          var ajaxFormOptions = {
            dataType: 'json'
          };
          switch (form) {
            case 'subscribe':
            default:
              ajaxFormOptions = {
                dataType: 'json',
                beforeSubmit: _self.beforeAJAXFormSubmit,
                success: _self.processSubscribeFormSuccessResponse,  // post-submit callback
                error: _self.processSubscribeFormErrorResponse,
                clearForm: false,
                resetForm: false
              };
              break;
          }
          // Attach AJAX form submit to form retrieved via AJAX ;)
          $(ajaxFormSelector).once('ajax-form', function() {
            $(this).ajaxForm(ajaxFormOptions);
          });
        },
        // Runs before the AJAX form submit, return false to cancel
        beforeAJAXFormSubmit: function(data, $form, options) {
          // Add CSRF token header to request
          if (typeof $.cookie !== 'undefined' && $.cookie('CSRF')) {
            options.headers = {
              'X-Csrf-Token': $.cookie('CSRF')
            };
          }

          if ($form.find('.scmp-inline-newsletter-multi-opt-in').is(':visible')) {
            var tids = [];
            for (var i = 0; i < data.length; i++) {
              if (typeof data[i].name !== 'undefined' && data[i].name == 'tid[]') {
                if (data[i].value) {
                  tids.push(data[i].value);
                }
              }
            }
            for (var i = 0; i < data.length; i++) {
              if (typeof data[i].name !== 'undefined' && data[i].name == 'id') {
                data[i].value = tids.join(',');
              }
            }
          }
          // Store submitted email address for default, e.g for anon user
          if (data) {
            for (var i = 0; i < data.length; i++) {
              if (typeof data[i].name !== 'undefined' && data[i].name == 'email') {
                if (data[i].value) {
                  if (typeof $.cookie !== 'undefined') {
                    $.cookie('Drupal.visitor.mail', data[i].value, { path: '/' });
                  }
                }
              }
            }
          }
          // Disable double-click submit while processing
          $form.find('input[type="submit"]').attr({disabled:'disabled'});
          return true;
        },
        // Handle the success case POST response from the AJAX subscribe form
        processSubscribeFormSuccessResponse: function(responseText, statusText, xhr, $form) {
          // Re-enable submit button
          $form.find('input[type="submit"]').removeAttr('disabled');
          // Clear previous error messages
          $form.find('.error-msg').empty();
          if (typeof responseText['status'] !== 'undefined' && responseText['status'] === 'success') {
            var subscribed_tids = responseText['tids'];
            var tidListLength = _self.tidList.length;
            var available_newsletter = [];
            for (var i = 0 ; i < tidListLength ; i++) {
              if (typeof _self.tidList[i] !== 'undefined' && subscribed_tids.indexOf(parseInt(_self.tidList[i].tid)) === -1){
                available_newsletter.push(_self.tidList[i]);
              }
            }

            // Clear sessionStorage for refresh
            if (_self.hasSessionStorage()) {
              var uid = _self.getUID();
              if (!uid) {
                var anon_newsletter = JSON.parse(sessionStorage.getItem('scmp-anon-newsletters')) || [];
                anon_newsletter.push(parseInt($form.attr('data-newsletter-tid')));
                sessionStorage.setItem('scmp-anon-newsletters', JSON.stringify(anon_newsletter));
              } else {
                var cache = JSON.parse(sessionStorage.getItem('scmp-newsletters')) || [];
                if (typeof cache.newsletters !== 'undefined') {
                  cache.newsletters.push(parseInt($form.attr('data-newsletter-tid')));
                }
                sessionStorage.setItem('scmp-newsletters', JSON.stringify(cache));
              }
            }

            // Send GTM Tracking event.
            var newsletter_name = $form.attr('data-newsletter-name');
            var newsletter_tid = $form.attr('data-newsletter-tid');
            if (typeof newsletter_name !== 'undefined' && typeof newsletter_tid !== 'undefined') {
              if (typeof window.dataLayer !== 'undefined') {
                window.dataLayer.push({
                  'newsletter-name': newsletter_name,
                  'newsletter-id': newsletter_tid,
                  'event': 'newsletter-subscribe'
                });
              }
            }
            if (available_newsletter.length >= 2) {

              $form.find('.subscribe-wrap').addClass('hidden');
              $form.find('.scmp-inline-newsletter-multi-opt-in').removeClass('hidden');
              $form.find('input[name="options[current_newsletters]"]').val(0);
              // set height
              $(".scmp-inline-newsletter-subscription").height($(".inner-wrap").outerHeight()+20);
              $.each($form.find('.scmp-inline-newsletter-multi-opt-in .form-input-wrap'), function(index, obj){
                $(obj).find('span.name').text(available_newsletter[index].name);
                $(obj).find('span.desc').text(available_newsletter[index].description);
                $(obj).find('input[name="tid[]"]').val(available_newsletter[index].tid);
              })
              return;
            }
          }

          // Success case
          // Show confirmation message
          $form.find('.subscribe-wrap').addClass('hidden');
          $form.find('.scmp-inline-newsletter-multi-opt-in').addClass('hidden');

          $form.find('.confirmation').removeClass('hidden');
          // Set height of confirm, same as form
          var height = $form.parent('.scmp-inline-newsletter-subscription').height();
          var confirmHeight = $form.find('.inner-wrap').height();
          if (parseInt(confirmHeight, 10) < parseInt(height, 10)) {
            $form.find('.inner-wrap').css({height: height});
          }

          var anon_newsletter = [];
          if (_self.hasSessionStorage()) {
            var uid = _self.getUID();
            if (!uid) {
              anon_newsletter = JSON.parse(sessionStorage.getItem('scmp-anon-newsletters'));
            }
          }

          $.each($form.find('.scmp-inline-newsletter-multi-opt-in .form-input-wrap'), function(index, obj){
            var newsletter_name = $(obj).find('span.name').text();
            var newsletter_tid = $(obj).find('input[name="tid[]"]').val();
            var checked = $(obj).find('input[name="tid[]"]').prop('checked');
            if (typeof newsletter_name !== 'undefined' && typeof newsletter_tid !== 'undefined' && checked) {
              if (typeof window.dataLayer !== 'undefined') {
                window.dataLayer.push({
                  event: 'tracking',
                  tracking: {
                    category: 'Newsletter (inline) - Recommend',
                    action: 'Newsletter Sign Up',
                    label: newsletter_name
                  }
                });
              }
              anon_newsletter.push(parseInt(newsletter_tid));
            }
          })
          if (_self.hasSessionStorage()) {
            var uid = _self.getUID();
            if (!uid) {
              sessionStorage.setItem('scmp-anon-newsletters', JSON.stringify(anon_newsletter));
            }
          }

        },
        // Ajax form error case callback
        processSubscribeFormErrorResponse: function(xhr, textStatus, errorThrown) {
          // Show error message
          var msg = 'Sorry, an error occurred. Please try again later.';
          if (typeof xhr.responseJSON !== 'undefined' && typeof xhr.responseJSON[0] !== 'undefined') {
            msg = xhr.responseJSON[0];
          } else {
            msg = textStatus;
          }
          $(_self.formSelector).find('.error-msg').text(msg);
          // Refresh height for error
          _self.updateOffsetVersion();
          // Enable form
          $(_self.formSelector).find('input[type="submit"]').removeAttr('disabled');
        },
        // Get Drupal user UID
        // Note: client-side only, not trusted
        getUID: function() {
          if ($.cookie) {
            if ($.cookie('CSRF') && $.cookie('Drupal.visitor.uid')) {
              return $.cookie('Drupal.visitor.uid');
            }
          }
          return 0;
        },
        // Check if client has sessionStorage available
        hasSessionStorage: function hasSessionStorage() {
          var sessionStorageAvailable = false;
          if (typeof sessionStorage !== 'undefined') {
            // Catch exception
            try {
              sessionStorage.setItem('scmp-session-storage', 'yes');
              if (sessionStorage.getItem('scmp-session-storage') === 'yes') {
                sessionStorage.removeItem('scmp-session-storage');
                // sessionStorage is enabled
                sessionStorageAvailable = true;
              } else {
                // sessionStorage is disabled
              }
            } catch (e) {
              // sessionStorage is disabled
            }
          } else {
            // sessionStorage is not available
          }
          return sessionStorageAvailable;
        },
        // Clear sessionStorage cache
        clearSessionStorage: function clearSessionStorage() {
          if (_self.hasSessionStorage()) {
            sessionStorage.removeItem('scmp-newsletters');
          }
        },
        findTid : function findTid(){
          var list = _self.tidList;
          var subscriptions = _self.subscriptions;
          for ( var i = 0 ; i < list.length ; i++){
            if ($.inArray(parseInt(list[i].tid), subscriptions) === -1) {
              return list[i];
            }
          }
          return false;
        },
        setNewForm: function setNewForm($form , newsletter_info){
          var newsletter_tid = $form.data('newsletter-tid');
          //replace all tid / name
          $form.removeClass('newsletter-'+newsletter_tid).addClass('newsletter-'+newsletter_info.tid);
          $form.attr('data-newsletter-name', newsletter_info.name);
          $form.attr('data-newsletter-tid', newsletter_info.tid);
          $form.attr('id', 'scmp-newsletter-subscription-form-' + newsletter_info.tid);
          $form.find('.name').html(newsletter_info.name);
          $form.find('input[name="id"]').val(newsletter_info.tid);
          $form.find('.newsletter-subscribe-thank-you').attr('data-newsletter-tid',newsletter_info.tid);
          $form.find('.error-msg').removeClass('error-msg-'+newsletter_tid).addClass('error-msg-'+newsletter_info.tid);
        },
        randomTid : function randomTid(){
            var output = [];
            var shuffleArray = [];
            var newsletter_info = Drupal.settings.newsletter.tids;
            for ( var i = 0 ; i < newsletter_info.length ; i++){
              shuffleArray = _self.shuffle(newsletter_info[i]);
              for ( var j = 0 ; j < shuffleArray.length ; j++){
                  output.push(shuffleArray[j]);
              }
            }
            _self.tidList = output;
            //return output;
        },
        shuffle : function shuffle(arr) {
            var a = arr.slice();
            for (var i = a.length; i; i--) {
                var j = Math.floor(Math.random() * i);
                [a[i - 1], a[j]] = [a[j], a[i - 1]];
            }
            return a;
        }
    };
    })();
    // Initialize newsletter feature
    $(document).ready(function() {
      window.SCMPApp.newsletter.init();
    });
    // Update offset-version on window resize
    $(window).resize(function() {
      clearTimeout(window.resizedFinished);
      window.resizedFinished = setTimeout(function(){
        if (typeof window.SCMPApp !== 'undefined' && typeof window.SCMPApp.newsletter !== 'undefined') {
          window.SCMPApp.newsletter.updateOffsetVersion();
        }
      }, 800);
    });

  })(jQuery);
} catch (e) {
  if (typeof console !== 'undefined' && console.log !== 'undefined') {
    console.log(e);
  }
}
;
/**
 * @file
 * Javascript related Login page.
 */
(function ($) {
Drupal.behaviors.login_validate = {
  attach: function (context) {
    $('#form-user-login').once('login-validate', function() {
    	$(this).find('.form-submit').click(function(){
        var name = $(this).parents('form').find('.form-item-name input').val();
        var password = $(this).parents('form').find('.form-item-pass input').val();
        var message = '';
        if (name === '') {
          message = message + 'Username field is required. ';
        }

        if (password === '') {
          message = message + 'Password field is required.';
        }

        if (name === '' || password === '') {
          message = '<div class="messages error">' + message + '</div>';
          if ($(this).parents('.block-user-login').length) {
            message = '<div class="messages-wrapper color-box-wrapped">' + message + '</div>';
          }
          else {
            message = '<div class="messages-wrapper">' + message + '</div>';
          }

          $target = $('.region.region-header.user-login-header');
          if ($target.length == 0) {
            $target = $('#form-user-login .top-wrapper h2')
          }

          if (!$('.messages-wrapper').length) {
            $target.after(message);
          }
          else {
            $('.messages-wrapper').remove();
            $target.after(message);
          }
          return false;
        }
        else {
          return true;
        }
    	})
    });
  }
};
Drupal.behaviors.loginStep2FA = {
  attach: function (context) {
    $('#form-user-login').once('login-step-2fa', function() {
      if($(this).find('.form-type-2fa-code.has-error').length) {
        if ($('input[name="name"]').is(':hidden') && $('input[name="pass"]').is(':hidden')) {
          $('.center.no-bkrd,.partner-login,.register').hide();
          $('.top-wrapper h2').text('Please enter your 2FA code');
          $('a.forgot-pass').text('Unable to access 2FA code');
          $('input[name="2fa_code"]').focus();
        } else {
          $('input[name="name"]').focus();
        }
      } else {
        // Default focus to login
        $('input[name="name"]').focus();
      }
    });
  }
};
})(jQuery);
;
/**
 * @file
 * Javascript related to the v2 masthead.
 */
(function ($) {

Drupal.behaviors.scmpEmailtoFriends = {
  attach: function (context) {
    // Sent article by email color box.
    $('.pane-print-ui-print-links a.print-mail').once('send', function() {
      $(this).click(function(e) {
        var options = {
          scrolling: false,
          opacity: .7,
          href: '/esi/block/scmp_email_to_friends/email_to_friends/' + Drupal.settings.nid,
          onComplete: function(){
            $.colorbox.resize();
            if ($.cookie("Drupal.visitor.username") && $.trim($.cookie("Drupal.visitor.username")) != '') {
              var username = decodeURI($.cookie("Drupal.visitor.username"));
              $('.form-item-fld-from-name input').val(username);
              $('.form-item-fld-subject input').val(username + ' has sent you a message from South China Morning Post');
            }
            if ($.cookie("Drupal.visitor.mail") && $.trim($.cookie("Drupal.visitor.mail")) != '') {
              $('.form-item-fld-from-addr input').val($.cookie("Drupal.visitor.mail"));
            }

            // Add ajax settings.
            var settings = {"ajax":{"edit-btn-submit":{"event":"mousedown","keypress":true,"prevent":"click","selector":"#edit-btn-submit","url":Drupal.absoluteUrl('/scmp_email_to_friends/email_submit/' + Drupal.settings.nid).replace("https:", "http:"),"submit":{"_triggering_element_name":"submit","_triggering_element_value":"Send email"}}}};
            // Process ajax settings.
            $.extend(Drupal.settings, settings);
            Drupal.attachBehaviors('.block-scmp-email-to-friends');

            $('#scmp-email-to-friends-print-mail-form button[value="Cancel"]').on('click', function(e) {
              e.preventDefault();
              $.colorbox.close();
            });
          }
        };
        $.colorbox(options);
        var url = location.pathname;
        ga('send', 'event', 'Share button', 'Share button/Email/Click', url);
        e.preventDefault();
        return false;
      });

    });
  }
};

$('body').once('send_email', function() {
  // Trigger page refresh.
  $(document).delegate('#scmp-email-to-friends-print-mail-form', 'formSuccess', function(e, data) {
    $.colorbox.close();
    window.location.reload();
  });
});

})(jQuery);
;
(function ($) {
  $('body').once('regform_tracking', function() {
    // Trigger GTM tracking.
    $(document).delegate('.scmp-ajax-user-reg-form', 'formSuccess', function(e, data) {
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          event: 'gtm.click',
          'gtm.element': '',
          'gtm.elementClasses': '',
          'gtm.elementId': 'mt-register-submit',
          'gtm.elementTarget': '',
          'gtm.elementUrl': '',
        });
        dataLayer.push({
          'event' : 'gtm.formSubmit',
          'gtm.element': '',
          'gtm.elementClasses': '',
          'gtm.elementId' : 'scmp-subscriptions-ajax-user-register-form',
          'gtm.elementTarget': '',
          'gtm.elementUrl': '',
        });
      }
    });
    $(document).on('subscriptionSuccess', '.scmp-ajax-user-reg-form', function(event) {
      ga('send', 'event', 'Newsletter (registration)', 'submit', document.URL);
    });
  });
})(jQuery);
;
