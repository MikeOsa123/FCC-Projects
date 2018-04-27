/*!
 * Responsive Bootstrap Toolkit
 * Author:    Maciej Gurban
 * License:   MIT
 * Version:   2.5.1 (2015-11-02)
 * Origin:    https://github.com/maciej-gurban/responsive-bootstrap-toolkit
 */
;var ResponsiveBootstrapToolkit = (function($){

    // Internal methods
    var internal = {

        /**
         * Breakpoint detection divs for each framework version
         */
        detectionDivs: {
            // Bootstrap 3
            bootstrap: {
                'xs': $('<div class="device-xs visible-xs visible-xs-block"></div>'),
                'sm': $('<div class="device-sm visible-sm visible-sm-block"></div>'),
                'md': $('<div class="device-md visible-md visible-md-block"></div>'),
                'lg': $('<div class="device-lg visible-lg visible-lg-block"></div>')
            },
            // Foundation 5
            foundation: {
                'small':  $('<div class="device-xs show-for-small-only"></div>'),
                'medium': $('<div class="device-sm show-for-medium-only"></div>'),
                'large':  $('<div class="device-md show-for-large-only"></div>'),
                'xlarge': $('<div class="device-lg show-for-xlarge-only"></div>')
            }
        },

         /**
         * Append visibility divs after DOM laoded
         */
        applyDetectionDivs: function() {
            $(document).ready(function(){
                $.each(self.breakpoints, function(alias){
                    self.breakpoints[alias].appendTo('.responsive-bootstrap-toolkit');
                });
            });
        },

        /**
         * Determines whether passed string is a parsable expression
         */
        isAnExpression: function( str ) {
            return (str.charAt(0) == '<' || str.charAt(0) == '>');
        },

        /**
         * Splits the expression in into <|> [=] alias
         */
        splitExpression: function( str ) {

            // Used operator
            var operator = str.charAt(0);
            // Include breakpoint equal to alias?
            var orEqual  = (str.charAt(1) == '=') ? true : false;

            /**
             * Index at which breakpoint name starts.
             *
             * For:  >sm, index = 1
             * For: >=sm, index = 2
             */
            var index = 1 + (orEqual ? 1 : 0);

            /**
             * The remaining part of the expression, after the operator, will be treated as the
             * breakpoint name to compare with
             */
            var breakpointName = str.slice(index);

            return {
                operator:       operator,
                orEqual:        orEqual,
                breakpointName: breakpointName
            };
        },

        /**
         * Returns true if currently active breakpoint matches the expression
         */
        isAnyActive: function( breakpoints ) {
            var found = false;
            $.each(breakpoints, function( index, alias ) {
                // Once first breakpoint matches, return true and break out of the loop
                if( self.breakpoints[ alias ].is(':visible') ) {
                    found = true;
                    return false;
                }
            });
            return found;
        },

        /**
         * Determines whether current breakpoint matches the expression given
         */
        isMatchingExpression: function( str ) {

            var expression = internal.splitExpression( str );

            // Get names of all breakpoints
            var breakpointList = Object.keys(self.breakpoints);

            // Get index of sought breakpoint in the list
            var pos = breakpointList.indexOf( expression.breakpointName );

            // Breakpoint found
            if( pos !== -1 ) {

                var start = 0;
                var end   = 0;

                /**
                 * Parsing viewport.is('<=md') we interate from smallest breakpoint ('xs') and end
                 * at 'md' breakpoint, indicated in the expression,
                 * That makes: start = 0, end = 2 (index of 'md' breakpoint)
                 *
                 * Parsing viewport.is('<md') we start at index 'xs' breakpoint, and end at
                 * 'sm' breakpoint, one before 'md'.
                 * Which makes: start = 0, end = 1
                 */
                if( expression.operator == '<' ) {
                    start = 0;
                    end   = expression.orEqual ? ++pos : pos;
                }
                /**
                 * Parsing viewport.is('>=sm') we interate from breakpoint 'sm' and end at the end
                 * of breakpoint list.
                 * That makes: start = 1, end = undefined
                 *
                 * Parsing viewport.is('>sm') we start at breakpoint 'md' and end at the end of
                 * breakpoint list.
                 * Which makes: start = 2, end = undefined
                 */
                if( expression.operator == '>' ) {
                    start = expression.orEqual ? pos : ++pos;
                    end   = undefined;
                }

                var acceptedBreakpoints = breakpointList.slice(start, end);

                return internal.isAnyActive( acceptedBreakpoints );

            }
        }

    };

    // Public methods and properties
    var self = {

        /**
         * Determines default debouncing interval of 'changed' method
         */
        interval: 300,

        /**
         *
         */
        framework: null,

        /**
         * Breakpoint aliases, listed from smallest to biggest
         */
        breakpoints: null,

        /**
         * Returns true if current breakpoint matches passed alias
         */
        is: function( str ) {
            if( internal.isAnExpression( str ) ) {
                return internal.isMatchingExpression( str );
            }
            return self.breakpoints[ str ] && self.breakpoints[ str ].is(':visible');
        },

        /**
         * Determines which framework-specific breakpoint detection divs to use
         */
        use: function( frameworkName, breakpoints ) {
            self.framework = frameworkName.toLowerCase();

            if( self.framework === 'bootstrap' || self.framework === 'foundation') {
                self.breakpoints = internal.detectionDivs[ self.framework ];
            } else {
                self.breakpoints = breakpoints;
            }

            internal.applyDetectionDivs();
        },

        /**
         * Returns current breakpoint alias
         */
        current: function(){
            var name = 'unrecognized';
            $.each(self.breakpoints, function(alias){
                if (self.is(alias)) {
                    name = alias;
                }
            });
            return name;
        },

        /*
         * Waits specified number of miliseconds before executing a callback
         */
        changed: function(fn, ms) {
            var timer;
            return function(){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    fn();
                }, ms || self.interval);
            };
        }

    };

    // Create a placeholder
    $(document).ready(function(){
        $('<div class="responsive-bootstrap-toolkit"></div>').appendTo('body');
    });

    if( self.framework === null ) {
        self.use('bootstrap');
    }

    return self;

})(jQuery);;
(function ($) {
  // Helper function to close popover by button.
  popoverClose = function(context) {
    $('body').click();
    event.preventDefault();
    return false;
  };

  // Load bootstrap row more fancy.
  var fancyLoadRowObject = [];
  fancyLoadRow = function() {
    for (i = 0; i < fancyLoadRowObject.length; ++i) {
      if ($(window).scrollTop() + $(window).height() >= fancyLoadRowObject[i].offset().top) {
        fancyLoadRowObject[i].addClass('inview');
        fancyLoadRowObject.splice(i, 1);
      }
    }
  };
  Drupal.behaviors.fancyLoadRow = {
    attach: function (context) {
      $('.container-fluid .row, .container .row, .container .ptcg-row, .container-fluid .ptcg-row')
    .not('.row .row, .ptcg-row .ptcg-row, .page-node.node-type-article .panels-four-column-nested-grid-article .nested-row').not('.inview').once('fancyrow', function() {
        if ($(window).scrollTop() + $(window).height() >= $(this).offset().top) {
          $(this).addClass('fancyrow');
          $(this).addClass('inview');
        }
        else {
          fancyLoadRowObject.push($(this));
          $(this).addClass('fancyrow');
        }
      });
      fancyLoadRow();
      $('body').once('fancyloadrow', function() {
        $(document).scroll(function() {
          fancyLoadRow();
        });
      });
    }
  };
  Drupal.behaviors.articleBody = {
    attach: function (context) {
      $('.page-node.node-type-article .pane-node-body > .pane-content > *', context).once('v2', function() {
        var $link = $(this).find('a');
        var $paragraph = $(this);
        if ($link.length == 1 && $paragraph.text() == $link.text() && $link.find('img').length == 0) {
          $paragraph.addClass('link');
        }
        var $img = $paragraph.find('img');
        if ($img.length) {
          $paragraph.addClass('image');
        }
        $img.each(function() {
          if ($(this).hasClass('image-300w')) {
            $paragraph.addClass('image-must-float');
          }
          if ($(this).css('float') == 'left') {
            $(this).addClass('image-float-left');
          }
          else if ($(this).css('float') == 'right') {
            $(this).addClass('image-float-right');
          }
        });
        $paragraph.find('span').each(function() {
          if ($(this).children().length == 0) {
            $(this).addClass('text-only');
          }
          else if ($(this).attr("lang"))
            $(this).addClass('text-only');
        });
      });
    }
  }
  Drupal.behaviors.outbrain = {
    attach: function (context) {
      // Adjust main article height if no outbrain widgets in footer.
      $('.page-node.node-type-article', context).once('v2', function() {
        if ($('.bottom-row .OUTBRAIN').length === 0) {
          $('.nested-col-1').css('margin-bottom', '55px');
        }
      });
    }
  }
  // Fix SCMP logo position for old Chrome in retina(e.g. Version 54.0.2840.98)
  // New version Chrome(Version 54.0.2840.98) no need below fix, please feel free to remove below code when most user's Chrome upgraded.
  // For Page type only
  Drupal.behaviors.chromeFix = {
    attach: function (context) {
      if (window.devicePixelRatio > 1 && /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor) && jQuery('body.page-node').length)
      {
        // Use image logo to replace logo-font for avoid position moving in second.
        jQuery('#logo').addClass('logo-roll-back-to-image');
      }
    }
  };
  /**
   * Caption overlay of an image
   * @param $image jQuery $(this) wrapped image
   */
  $.fn.imageCaptionHover = function($image) {
    $image.parent().find('.image-caption').once('hover', function() {
      $(this).after('<div class="image-caption-overlay">');
      $(this).wrapInner('<div class="image-caption-text"></div>');
      $(this).hover(function() {
        $(this).addClass('active');
      }, function() {
        $(this).removeClass('active');
      });
    });
  }

  $.fn.imagePostProcess = function($image) {
    if ($image.parents('.v2-processed').length && parseInt($image.width()) > 230) {
      if ($image.hasClass('image-float-left') || $image.hasClass('image-float-right')) {
      }
      else {
        $image.parents('.v2-processed').addClass('no-float');
      }
    }
  }

  // Add back to mobile button
  if(typeof $.cookie !== 'undefined' && $.cookie('device') == 'desktop'){
    $('header#page-header').before('<div class="top-msg centered" style="text-align:center"><span class="button-wrapper"><a href="/device/mobile?destination=' + window.location.pathname.substr(1) + window.location.search +'" class="blue-button back-to-mobile">Back to mobile edition</a></span></div>');
  }

})(jQuery);

// Show more text.
(function ($) {
  showMoreText = function (domObject, className, textLimit) {
    var text_limit = textLimit || 200;
    if (typeof domObject === 'undefined' || typeof className !== 'string') {
      return;
    }
    var $this = domObject;
    var $textWrapper = $this.find(className);
    var text = $textWrapper.text();
    if(text.length < text_limit) return;

    $textWrapper.html(
      text.slice(0, text_limit)+'<span class="ellipsis">... </span><a href="#" class="more">more</a>'+
      '<span class="trimmed-content" style="display:none;">'+ text.slice(text_limit, text.length)+' <a href="#" class="less">less</a></span>'
    );
    $('a.more', $textWrapper).click(function(e){
      e.preventDefault();
      $(this).hide().prev().hide();
      $(this).next().show();
    });

    $('a.less', $textWrapper).click(function(e){
      e.preventDefault();
      $(this).parent().hide().prev().show().prev().show();
    });
  }


  Drupal.behaviors.showMoreText = {
    attach: function (context) {
      $(".show-more-text").once('load', function(e) {
        showMoreText($(this), '.field-name-body');
      });
      $(".page-author-show-more-text").once('load', function(e) {
        showMoreText($(this), '.field-name-field-author-bio', 300);
      });

    }
  };
})(jQuery);

/* Responsive bootstrap JS
 * @see bootstrap-toolkit.js
 **/
(function($, document, window, viewport){

  /* full height backgroud tweak for 4th col. in section minipanel */
  function sectionMinipanelFullHeight(){
    $(".section-minipanel .panels-four-column-grid").each(function(i, el) {
      var $col4 = $(el).find('.pfcg-row:last-child .pfcg-col-4');
      // if ($(el).height() == $col4.height()) return;
      var $title = $(el).children('.pane-title');
      var title_h = 0;
      var $last = $col4.children().last().css('height', 'auto');
      if ($col4.parent().hasClass('pfcg-row-01') && $title.is(':visible')) {
        title_h = $title.height() + parseInt($title.css('margin-top')) + parseInt($title.css('margin-bottom'));
        $col4.css({
          'position': 'relative',
          'top': '-'+title_h+'px',
          'margin-bottom': '-'+title_h+'px'
        });
      }
      $last.height($last.height() + title_h + $col4.parent().height() - $col4.height()); // fill gap
    });
  }

  $(window).bind('resize', function() {
    viewport.changed(function() {
      // Provide custom event for separate event listeners
      $("body").trigger("viewportChanged", [viewport.current()]);
      // e.g: $(document).on('viewportChanged', 'body', function(event, current) {}
    }, 600);
    fancyLoadRow();
    sectionMinipanelFullHeight();
  });

  // Common document ready handlers
  $(document).ready(function(){
    /* Native Articles Helper */
    $('.native-articles, .native-article').each(function() {
      $(this).prev('.panel-separator').remove();
      var toGoInto = $(this).prev('.secondary-articles');
      //Add Class to article & insert after..
      $(this).find('.node-article').addClass('native-articles-article').removeClass('first last').insertAfter(toGoInto.children().eq(1));
      //Update article odd & evens.
      toGoInto.find('article').removeClass('odd even');
      toGoInto.find('article').filter(':odd').addClass('even');
      toGoInto.find('article').filter(':even').addClass('odd');
      $(this).remove();
    });
    /* Page User Checkbox Helper */
    $('.page-user .form-type-checkbox input, .page-user .form-type-radio input').each(function() {
      if($(this).is(':checked'))
        $(this).parent().addClass('selected');
    })
    $('.page-user .form-type-checkbox input').change(function(){
      // Exclude in newslestter page
      if(!$('body').hasClass('page-user-simplenews')) {
        if($(this).is(':checked'))
           $(this).parent().addClass('selected');
        else
          $(this).parent().removeClass('selected')
      }
    });
    /* Page User File Input helper */
    $(".page-user :file").jfilestyle({buttonText: "Find file"});
    $( document ).ajaxComplete(function( event,request, settings ) {
      $(".page-user :file").jfilestyle({buttonText: "Find file"});
    });
    /* Page User Radio Helper */

    $('.page-user .form-type-radio input').change(function(){
      var radiosParent = $(this).closest('.form-radios');
      var input = $(this);
      // Clear all radio first
      radiosParent.find('.form-type-radio input').each(function(){
        $(this).parent().removeClass('selected');
      })
      if(input.is(':checked'))
        input.parent().addClass('selected');
    });
    // Disable all active menu links
    $('.page-user ul li.active a').on('click', function(e){
      e.preventDefault();
    });

    //Newsletter page colorbox for sampling.
    var standAlone = $('.standalone-newsletter .field-name-field-source-url a');
    standAlone.colorbox({href: standAlone.attr('href'), iframe: true, height: 565, width: 896, className: 'standalone-newsletter-cb' ,opacity: 0.5});

    // Newsletter page operation
    // kill all label default click
    $('.page-user-simplenews .form-type-checkbox label').each(function(){
      $(this).attr('for', '');
    });
    $('.page-user-simplenews .form-type-checkbox .sign-up-btn').on('click', function(){
      if (!$(this).hasClass('selected')) {
        $(this).addClass('selected');
        $(this).text('signed up');
        $(this).siblings('.unsubscribe-btn').removeClass('hidden');
        var checkbox = $(this).parent().siblings('input[type="checkbox"]');
        checkbox.prop("checked", !checkbox.prop("checked"));
      }
    });

    $('.page-user-simplenews .form-type-checkbox .unsubscribe-btn').on('click', function(){
      var signupBtn = $(this).siblings('.sign-up-btn');
      signupBtn.removeClass('selected');
      signupBtn.text('sign up');
      $(this).addClass('hidden');
      var checkbox = $(this).parent().siblings('input[type="checkbox"]');
      checkbox.prop("checked", !checkbox.prop("checked"));
    });

    // My comment page more/less toggle
    $('.page-user-edit-my-comments table .more-link').on('click', function(e){
      e.preventDefault();
      $(this).siblings('.more-text, .less-link').toggleClass('show');
      $(this).toggleClass('hidden');
      $(this).siblings('.ellipsis').toggleClass('hidden');
    })
    $('.page-user-edit-my-comments table .less-link').on('click', function(e){
      e.preventDefault();
      $(this).siblings('.more-link').toggleClass('hidden');
      $(this).siblings('.ellipsis').toggleClass('hidden');
      $(this).siblings('.more-text').toggleClass('show');
      $(this).toggleClass('show');
    })

    $('.page-user-edit-my-comments table .less-link').on('click', function(e){
      e.preventDefault();
      $(this).siblings('.more-link').toggleClass('hidden');
      $(this).siblings('.ellipsis').toggleClass('hidden');
      $(this).siblings('.more-text').toggleClass('show');
      $(this).toggleClass('show');
    })

    /* Prevent scroll to quicktab on click */
    $("a.ui-tabs-anchor").click(function(e){
        e.preventDefault();
        return false;
    });

    /* Clickable breakout bg img */
    $("article.view-mode-lvl_1").once('clickit', function(e){
      $this = $(this);
      var $href = $this.find('.read-more').attr('href');
      var $target = $this.find('.background-image');
      if ($href && $target) {
        $target.css('cursor', 'pointer');
        $target.click(function(){
          window.location = $href;
        });
      }
    });

    /* Adjust minipanel height */
    sectionMinipanelFullHeight();

    $('.panel-pane').fitVids({ customSelector: "iframe[src^='http://widgets.scmp.com']"});

    //handle responsive iframes
    if ($('iframe[data-responsive="1"]').length) {
        adjustIframeHeight();
        $(window).resize(function(){
          adjustIframeHeight();
        })
    }

    function adjustIframeHeight() {
      $('iframe[data-responsive="1"]').each(function() {
        var width = $(window).width();
        var cal_height = $(this).attr("height");
        if (width < 1280) {
          cal_height = $(this).attr("data-mdheight");
        }
        $(this).height(cal_height);
      });
    }
  });

  $(window).load(function() {
    $('.section-index .col-xs-8 .pane-scmp-advert-doubleclick .scmp_advert-tile, .topics-index .col-xs-8 .pane-scmp-advert-doubleclick .scmp_advert-tile').each(function() {
      if ($(this).height() < 20) {
        $(this).parent().parent().addClass('advert-hidden');
      }
    });
  });

})(jQuery, document, window, ResponsiveBootstrapToolkit);

// Utm tracking.
(function($){
   var location_url_clean = "frontpage";
      if (window.location.pathname) {
       location_url_clean = window.location.pathname.replace(/\//g, "_");
      }
      if (location_url_clean.charAt(0) === '_') {
        location_url_clean = location_url_clean.slice(1, location_url_clean.length);
      }
      $('.presented_channel').once('channels-tracking' , function() {
        $('.presented_channel .pane-content .swiper-wrapper .content-wrapper a').each(function() {
          var topic = $(this).closest('.content-wrapper').find('.field-name-field-topics a').html();
          var add_index = 1;
          var slide_number;
          if ($(this).closest('.swiper-slide').hasClass('swiper-slide-duplicate') && $(this).closest('.swiper-slide').first().length > 0) {
            slide_number = $(this).closest('.swiper-slide').last().index() + add_index;
          }
          else if ($(this).closest('.swiper-slide').hasClass('swiper-slide-duplicate') && $(this).closest('.swiper-slide').last().length > 0) {
            slide_number = $(this).closest('.swiper-slide').first().index() + add_index;
          }
          else {
            slide_number = $(this).closest('.swiper-slide').index() + add_index;
          }
          topic = encodeURIComponent(topic.replace(/\ /g, "-").toLowerCase());
          slide_number = 'carousel' + slide_number;
          var href = jQuery(this).attr('href');
          jQuery(this).attr('href', function(i, h){
            var params = 'utm_source=scmp&utm_medium=' + location_url_clean + '&utm_content=' + slide_number + '&utm_campaign=' + topic;
            return h + (h.indexOf('?') != -1 ? '&' + params : '?' + params);
          });
        });
         $('.presented_channel .presented-channels a, .presented_channel .special-reports a').each(function() {
          var topic = $(this).html();
          topic = encodeURIComponent(topic.replace(/\ /g, "-").toLowerCase());

          var link_number = $(this).parent().index() + 1;
          link_number = 'link'+link_number;

          var href = jQuery(this).attr('href');
          jQuery(this).attr('href', function(i, h){
            var params = 'utm_source=scmp&utm_medium=' + location_url_clean + '&utm_content=' + link_number + '&utm_campaign=' + topic;
            return h + (h.indexOf('?') != -1 ? '&' + params : '?' + params);
          });
        });
  });
})(jQuery);
;
/**
 * @file
 * Javascript related equalizer.
 */
(function ($) {
Drupal.behaviors.equalizer = {
  attach: function (context) {
    if ($('html').hasClass('wf-loading') || !$('html').hasClass('wf-active')) {
      if (typeof Drupal.equalizertimer != 'undefined') {
        return;
      }
      else {
        // Set delay to run equalizer after font loaded.
        Drupal.equalizertimer = setInterval(function(context){
          Drupal.behaviors.equalizer.attach(document);
        }, 100);
        return;
      }
    }
    if (typeof Drupal.equalizertimer != 'undefined') {
      clearInterval(Drupal.equalizertimer);
    }
    $('.equalizer').each(function() {
      var $equalizer = $(this);

      // Get list of row items need to equal height in row.
      var classList = {};
      $('[data-equalizer-items]', $equalizer).once('equalizer', function() {
        classList[$(this).data('equalizer-items')] = {};
      });
      for (var className in classList) {
        var $elements = $('[data-equalizer-items=' + className + ']', $equalizer);
        var maxHeight = Math.max.apply(null, $elements.map(function() {
          var offset = 0;
          if ($(this).data('equalizer-list')) {
            var $parent = $(this).parent();
            if ($(this).data('equalizer-upper-offset')) { //calculate element upper offset
              if ($parent.data('equalizer-offset')) {
                offset = $(this).parent().data('equalizer-offset');
              } else {
                var $offsetEl = $equalizer.find($parent.parent());
                offset += $parent.position().top;
                offset += parseInt($parent.css('margin-top')) + parseInt($parent.css('margin-bottom'));
              }
            }
            $parent.data('equalizer-offset', offset);
            return $parent.outerHeight()+offset;
          } else {
            if ($(this).data('equalizer-upper-offset')) { //calculate element upper offset
              offset += $(this).position().top;
              offset += parseInt($(this).css('margin-top')) + parseInt($(this).css('margin-bottom'));
            }
            $(this).data('equalizer-offset', offset);
            return $(this).height()+offset;
          }
        }).get());

        $elements.each(function (i, el) {
          if ($(el).data('equalizer-list')) {
            $(el).parent().css('height', maxHeight-$(el).parent().data('equalizer-offset'));
          } else {
            $(el).css('height', maxHeight-$(el).data('equalizer-offset'));
          }
        });
      }

      // Get list of row items need to equal height in row.
      var classList = {};
      $('.equalizer-col-group [data-equalizer-row-items]', this).once('equalizer', function() {
        classList[$(this).data('equalizer-row-items')] = {};
      });
      for (var className in classList) {
        var rowIndex = 0;
        while ($('.equalizer-col-group [data-equalizer-row-items=' + className + ']:nth-child(' + (rowIndex + 1) + ')', $equalizer).length > 0) {
          rowIndex++;
          var equalizerRowItems = $('.equalizer-col-group [data-equalizer-row-items=' + className + ']:nth-child(' + (rowIndex) + ')', $equalizer);
          var maxHeight = Math.max.apply(null, equalizerRowItems.map(function() {
            return $(this).outerHeight(true);
          }).get());
          equalizerRowItems.css('height', maxHeight);
        }
      }
    });
  }
};
})(jQuery);
;
