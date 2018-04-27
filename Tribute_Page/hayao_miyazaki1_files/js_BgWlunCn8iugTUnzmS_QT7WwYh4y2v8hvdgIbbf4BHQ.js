(function ($) {
  // Create a local storage device. Either the browsers
  // native store or use Cookies through the jQuery plugin.
  var s = (function () {
    var useCookies = (typeof localStorage == 'undefined' || localStorage === null);

    this.setItem = function(k, v) {
      if (useCookies) {
        return $.cookie(k, v);
      }
      return localStorage[k] = v;
    }

    this.getItem = function (k) {
      if (useCookies) {
        return $.cookie(k);
      }
      return localStorage[k];
    }

    return this;
  })();

  // Function to set the correct homepage for the user.
  function setHomepageLinks (url) {
    $('a[href="/"],a[href="/home"]').each(function () {
      $(this).attr('href', url);
    });
  }

  var o = $.cookie('Drupal.visitor.edition');
  if (!o) {
    o = s.getItem('origin');
  }

  if (!o) {
    $.get(Drupal.settings.basePath + 'esi/country_code.php', function (code) {
      o = $.trim(code);
      s.setItem('origin', o);
      if (o != 'HK') {
        o = 'O1';
      }
      $.cookie("Drupal.visitor.edition", o, { expires : 365, path : "/"});
      $('body').addClass('scmp-edition-' + o);
      setHomepageLinks(Drupal.settings.fpe[o]);
    });
  }
  else {
    if (o != 'HK') {
      o = 'O1';
    }
    $.cookie("Drupal.visitor.edition", o, { expires : 365, path : "/"});
    $('body').addClass('scmp-edition-' + o);
    setHomepageLinks(Drupal.settings.fpe[o]);
  }
})(jQuery);
;
(function ($) {
  if (!Drupal.settings.scmp_megamenus.length) {
    return;
  }
  // @todo, this may not use in V2.
  $('.masthead-main-menu li a').filter(function () {
    return $(this).text() == 'Multimedia';
  }).attr('href', '#');

  // Prevent mega menu button on non megamenu items (exclude homepage link);
  $('.masthead-main-menu li a:not(.scmp-megamenu)').slice(1).parent().addClass('mega-disabled');

  // Remove duplicate megamenu entries, sort array consistently for better cache hit
  function arrayUniqueFilterCallback(value, index, self) {
    return self.indexOf(value) === index;
  }
  var megamenuPanels = Drupal.settings.scmp_megamenus.filter( arrayUniqueFilterCallback );
  var megamenuPanels = megamenuPanels.sort();
  // Validate before contining with ajax request here
  if (!megamenuPanels) {
    return;
  }

  $.ajax({
    url: Drupal.settings.basePath + 'scmp-megamenus',
    data: {
      panels: megamenuPanels.join(',')
    },
    dataType: 'html',
    success: function (menus) {
      menus = $(menus).addClass('scmp-megamenu');
      // Hide empty mega menu.
      menus.each(function() {
        if ($.trim($(this).text()) == '') {
          $(this).addClass('element-invisible');
        }
        else {
          var touchClose = $('<div class="scmp-icon-close"></div>');
          var clickEvents = 'click touchstart';
          if (typeof window.PointerEvent != 'undefined' && window.PointerEvent) {
            clickEvents = 'pointerdown';
          }
          touchClose.bind(clickEvents, function() {
            $('.masthead-main-menu ul.menu .mega-intent, .scmp-megamenu.active').trigger('megahide');
          });
          $(this).append(touchClose);
        }
      });
      $('body').append(menus);
      // Bind events for carousel.
      $('.panel-col-3 .pane-article-level', menus).each(function() {
        var $paneArticle = $(this);
        var $articleList = $('article', this);
        var $swiperNavBar = $('<div class="swiper-navbar">');
        var $swiperPrev = $('<span class="prev scmp-icon-arrow-left-1 inactive"></span>');
        var $swiperNext = $('<span class="next scmp-icon-arrow-right1"></span>');
        $swiperPrev.appendTo($swiperNavBar);
        $swiperNext.appendTo($swiperNavBar);
        $(this).parent().addClass('swiper-container').prepend($swiperNavBar);
        var totalWidth = 0;
        $articleList.each(function() {
          $(this).addClass('swiper-slide');
          totalWidth += $(this).outerWidth(true);
        });
        $(this).addClass('swiper-wrapper').css('width', totalWidth);
        var slidesPerView = $paneArticle.parent().outerWidth(true) / parseInt($articleList.outerWidth(true));
        var $swiper = $(this).parent().swiper({
          mode:'horizontal',
          loop: false,
          calculateHeight: true,
          resizeReInit: true,
          cssWidthAndHeight: 'width',
          slidesPerView: slidesPerView,
          slidesPerGroup: parseInt(slidesPerView),
          roundLengths: true,
          onSlideChangeStart: function(swiper) {
            Drupal.lazyLoad.handleScroll();
          },
          onTouchEnd: function(swiper) {
            if ($articleList.length < swiper.params.slidesPerView || Math.round(Math.abs(swiper.getWrapperTranslate()) / ($articleList.length - swiper.params.slidesPerView)) >= $articleList.outerWidth(true)) {
              $swiperNext.addClass('inactive');
            }
            else {
              $swiperNext.removeClass('inactive');
            }
            if (swiper.getWrapperTranslate() >= 0) {
              $swiperPrev.addClass('inactive');
            }
            else {
              $swiperPrev.removeClass('inactive');
            }
          },
          onSlidePrev: function(swiper) {
            if ($articleList.length < swiper.params.slidesPerView || Math.round(Math.abs(swiper.getWrapperTranslate()) / ($articleList.length - swiper.params.slidesPerView)) == $articleList.outerWidth(true)) {
              $swiperNext.addClass('inactive');
            }
            else {
              $swiperNext.removeClass('inactive');
            }
            if (Math.abs(swiper.getWrapperTranslate()) == 0) {
              $swiperPrev.addClass('inactive');
            }
            else {
              $swiperPrev.removeClass('inactive');
            }
          },
          onSlideNext: function(swiper) {
            if ($articleList.length < swiper.params.slidesPerView || Math.round(Math.abs(swiper.getWrapperTranslate()) / ($articleList.length - swiper.params.slidesPerView)) == $articleList.outerWidth(true)) {
              $swiperNext.addClass('inactive');
            }
            else {
              $swiperNext.removeClass('inactive');
            }
            if (Math.abs(swiper.getWrapperTranslate()) == 0) {
              $swiperPrev.addClass('inactive');
            }
            else {
              $swiperPrev.removeClass('inactive');
            }
          },
          onSlideChangeEnd: function(swiper) {
            if ($articleList.length < swiper.params.slidesPerView || Math.round(Math.abs(swiper.getWrapperTranslate()) / ($articleList.length - swiper.params.slidesPerView)) == $articleList.outerWidth(true)) {
              $swiperNext.addClass('inactive');
            }
            else {
              $swiperNext.removeClass('inactive');
            }
            if (Math.abs(swiper.getWrapperTranslate()) == 0) {
              $swiperPrev.addClass('inactive');
            }
            else {
              $swiperPrev.removeClass('inactive');
            }
          },
          onInit: function(swiper) { // Use for reInit carousel.
            if ($articleList.length < swiper.params.slidesPerView || Math.round(Math.abs(swiper.getWrapperTranslate()) / ($articleList.length - swiper.params.slidesPerView) == $articleList.outerWidth(true))) {
              $swiperNext.addClass('inactive');
            }
            else {
              $swiperNext.removeClass('inactive');
            }
            if (Math.abs(swiper.getWrapperTranslate()) == 0) {
              $swiperPrev.addClass('inactive');
            }
            else {
              $swiperPrev.removeClass('inactive');
            }
          }
        });
        // Update swiper parameter when resize for reinit.
        $(window).resize(function() {
          $swiper.params.slidesPerView = $paneArticle.parent().outerWidth(true) / parseInt($articleList.outerWidth(true));
          $swiper.params.slidesPerGroup = parseInt($swiper.params.slidesPerView);
        });
        $swiperPrev.click(function() {
          $swiper.swipePrev(true);
        });
        $swiperNext.click(function() {
          $swiper.swipeNext(true);
        });
      });
      Drupal.attachBehaviors('.scmp-megamenu');
      var main = $('.masthead-main-menu ul.menu');
      $('a.scmp-megamenu[data-megamenu]', main).each(function () {
        // Obtain the megamenu to associate.
        var menu = $('#mini-panel-' + $(this).data('megamenu'));
        // Remove the class for fadeout effect.
        var transrtn = false;
        menu.bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',  function(e) {
          if ($(e.target).hasClass('readysaygoodbye')) {
            $(e.target).removeClass('readysaygoodbye');
          }
          transrtn = true;
        });

        var self = $(this);
        // If the minipanel wasn't loaded then there is nothing else
        // we can do here.
        if (!menu.length) {
          self.parent().addClass('mega-disabled');
          return;
        }
        // Listen for custom event 'megashow' to show the mega menu.
        self.bind('megashow', function () {
          menu.trigger('megashow');
          $(this).parent().addClass('mega-active');
        });
        // Listen for custom event 'megahide' to hide the mega menu.
        self.bind('megahide', function () {
          $(this).parent().removeClass('mega-active');
          $(this).removeClass('mega-intent');
          menu.trigger('megahide');
          if ($('.scmp-megamenu.readysaygoodbye').length && !transrtn) {
            $('.scmp-megamenu.readysaygoodbye').removeClass('readysaygoodbye');
          }
        });

        self.bind('megatouch', function (event) {
          // Go to the menu link if the mega menu is opening.
          if ($(this).hasClass('mega-intent') && menu.hasClass('mega-touch')) {
            window.location.href = $(this).attr('href');
          }
          else {
            $('.mega-intent', main).trigger('megahide');
            menu.removeClass('readysaygoodbye');
            $(this).addClass('mega-intent');
            menu.addClass('focus mega-touch');
            setTimeout(function () {
              // If the menu item still has intent, then trigger the mega event.
              if (self.hasClass('mega-intent')) {
                self.trigger('megashow');
              }
            }, 50);
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        });

        // Touch to open mega menu.
        var touchEvents = 'touchstart';
        if (typeof window.PointerEvent != 'undefined' && window.PointerEvent) {
          touchEvents = 'pointerdown';
          // click and pointer event will work together..so remove click event when touch.
          self.bind('click', function(event) {
            if (typeof event.originalEvent != 'undefined' && typeof event.originalEvent.pointerType != 'undefined' && event.originalEvent.pointerType == 'touch') {
              event.preventDefault();
              event.stopPropagation();
              self.trigger('megatouch');
              return false;
            }
          });
        }
        if (touchEvents != 'pointerdown') {
          self.bind(touchEvents, function(event) {
            self.trigger('megatouch');
            event.preventDefault();
            event.stopPropagation();
            return false;
          });
        }

        if (typeof window.PointerEvent != 'undefined' && window.PointerEvent) {
          // Events for browser support pointer events.
          self.bind('pointerover', function(event) {
            if (typeof event.originalEvent != 'undefined' && typeof event.originalEvent.pointerType != 'undefined' && event.originalEvent.pointerType == 'mouse') {
              if ($(this).hasClass('mega-intent') && menu.hasClass('mega-touch')) {
                return;
              }
              // Tell all other intending menu item to not animate.
              $('.mega-intent', main).trigger('megahide');
              menu.removeClass('readysaygoodbye');
              // Flag that this menu item intends to show its menu.
              $(this).addClass('mega-intent');
              menu.addClass('focus');
              // Set a timeout to show the mega menu if the intent remains for
              // longer than 100ms.
              setTimeout(function () {
                // If the menu item still has intent, then trigger the mega event.
                if (self.hasClass('mega-intent')) {
                  self.trigger('megashow');
                }
              }, 50);
            }
          });
          self.bind('pointerout', function(event) {
            if (typeof event.originalEvent != 'undefined' && typeof event.originalEvent.pointerType != 'undefined' && event.originalEvent.pointerType == 'mouse') {
              if ($(this).hasClass('mega-intent') && menu.hasClass('mega-touch')) {
                return;
              }
              // Remove any intent.
              $(this).removeClass('mega-intent');
              menu.removeClass('focus');
              // If the menu is active and but not focused in 100ms
              // drop the mega menu.
              setTimeout(function () {
                // Check mega menu has focus.
                if (!menu.hasClass('focus')) {
                  self.trigger('megahide');
                }
              }, 80);
            }
          });
          menu.bind('pointerover', function(event) {
            if (typeof event.originalEvent != 'undefined' && typeof event.originalEvent.pointerType != 'undefined' && event.originalEvent.pointerType == 'mouse') {
              $(this).addClass('focus');
              menu.removeClass('readysaygoodbye');
            }
          });
          menu.bind('pointerout', function(event) {
            if (typeof event.originalEvent != 'undefined' && typeof event.originalEvent.pointerType != 'undefined' && event.originalEvent.pointerType == 'mouse') {
              $(this).removeClass('focus');
              setTimeout(function () {
                if (!menu.hasClass('focus')) {
                  self.trigger('megahide');
                }
              }, 80);
            }
          });
        }
        else {
          // Set up intent to show mega menu when mouse scrolls over
          // menu item.
          self.hover(function () {
            if ($(this).hasClass('mega-intent') && menu.hasClass('mega-touch')) {
              return;
            }
            // Tell all other intending menu item to not animate.
            $('.mega-intent', main).trigger('megahide');
            menu.removeClass('readysaygoodbye');
            // Flag that this menu item intends to show its menu.
            $(this).addClass('mega-intent');
            menu.addClass('focus');
            // Set a timeout to show the mega menu if the intent remains for
            // longer than 100ms.
            setTimeout(function () {
              // If the menu item still has intent, then trigger the mega event.
              if (self.hasClass('mega-intent')) {
                self.trigger('megashow');
              }
            }, 50);
          }, function () {
            if ($(this).hasClass('mega-intent') && menu.hasClass('mega-touch')) {
              return;
            }
            // Remove any intent.
            $(this).removeClass('mega-intent');
            menu.removeClass('focus');
            // If the menu is active and but not focused in 100ms
            // drop the mega menu.
            setTimeout(function () {
              // Check mega menu has focus.
              if (!menu.hasClass('focus')) {
                self.trigger('megahide');
              }
            }, 80);
          });
          menu.hover(function () {
            if (!$(this).hasClass('readysaygoodbye')) {
              $(this).addClass('focus');
            }
            else {
              $(this).removeClass('readysaygoodbye');
            }
          }, function () {
            if ($(this).hasClass('focus')) {
              $(this).removeClass('focus');
              setTimeout(function () {
                if (!menu.hasClass('focus')) {
                  self.trigger('megahide');
                }
              }, 80);
            }
          });
        }

        // Menu listener for custom 'megashow' event.
        menu.bind('megashow', function () {
          // Close all active menus in masthead.
          $('#masthead .active-menu').toggleClass('active-menu');
          $(this).addClass('active');
          $(this).css({
            top: self.parent().offset().top + self.parent().height(),
            left: self.parents('ul').parent().offset().left
          });
          Drupal.lazyLoad.handleScroll();
          //resize the megamenu col to match.
          var megaHeight = menu.find('.row-wrapper').height();
          var adjustedHeight = megaHeight;
          menu.find('.row-wrapper .panel-col-1, .row-wrapper .panel-col-3').css('height', adjustedHeight);
        });

        // If the mouse already hover a menu, active it.
        if (self.css('position') == 'relative') {
          self.trigger('megashow');
        }

        // Menu listner for custom 'megahide' event.
        menu.bind('megahide', function () {
          $(this).removeClass('mega-touch');
          $(this).removeClass('active');
          // I am going out, please fade out.
          menu.addClass('readysaygoodbye');
        });
      });
    }
  });
})(jQuery);
;
