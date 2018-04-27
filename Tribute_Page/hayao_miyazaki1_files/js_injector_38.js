(function($){

  $(document).ready(function() {
    jQuery('header .masthead-promotion .mobile-app').replaceWith('<div class="embed-responsive" style="width: 300px; height: 50px;"><iframe class="fitvidsignore" width="300" height="50" src="http://widgets.scmp.com/misc/newpage/newpage_300x50.html"></div>');
    jQuery('header .masthead-promotion .mobile-button-overlay-wrap').remove();
  });

})(jQuery);