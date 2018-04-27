function trackSmartnews() {
  if (document.referrer.indexOf('smartnews') != -1) {
    ga('set', 'dimension6', 'SmartNews - Web');
  }
};
;
/**
 * Override the search behaviour in misc/autocomplete.js
 * Replacing the amperhand(&) in Drupal.encodePath
 * just added a .replace(/%26/g, '%2526')
 */
(function($) {
  Drupal.behaviors.autocompleteDoubleDecodeFix = {
    attach: function(context, settings) {
      if (typeof(Drupal.ACDB) != 'undefined') {
        Drupal.ACDB.prototype.search = function (searchString) {
          var db = this;
          this.searchString = searchString;
          // See if this string needs to be searched for anyway.
          searchString = searchString.replace(/^\s+|\s+$/, '');
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
              url: db.uri + '/' + Drupal.encodePath(searchString).replace(/%26/g, '%2526'),
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
                alert(Drupal.ajaxError(xmlhttp, db.uri));
              }
            });
          }, this.delay);
        };
      };
    }
  };
}(jQuery));


;
(function ($) {

  /**
   * Add Drupal behaviors
   */
  Drupal.behaviors.fboauthPopup = {};
  Drupal.behaviors.fboauthPopup.attach = function(context, settings) {
    /**
     * modify Facbook Oauth (fboauth) button with class "facebook-action-connect"
     * to open in a popup window, instead of using the current window.
     * References:
     * http://thinkdiff.net/facebook/create-facebook-popup-authentication-window-using-php-and-javascript/
     * http://developers.facebook.com/docs/authentication/
     * http://developers.facebook.com/docs/authentication/server-side/
     * http://developers.facebook.com/docs/reference/dialogs/oauth/
     */
	 
    //$('.fboauth-popup').click(function() {
	$('.facebook-action-connect').click(function() {
      var screenX    = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
        screenY      = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
        outerWidth   = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
        outerHeight  = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
        width    = 500,
        height   = 270,
        left     = parseInt(screenX + ((outerWidth - width) / 2), 10),
        top      = parseInt(screenY + ((outerHeight - height) / 2.5), 10),
        features = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;

      var popupWindow = window.open($(this).attr("href"), 'fboauth', features);
      if (window.focus) {
        popupWindow.focus();
      }

      return false;
    });
  };

})(jQuery);;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress-wrapper" aria-live="polite"></div>');
  this.element.html('<div id ="' + id + '" class="progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' +
                    '<div class="percentage sr-only"></div>' +
                    '</div></div>' +
                    '</div><div class="percentage pull-right"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.progress-bar', this.element).css('width', percentage + '%');
    $('div.progress-bar', this.element).attr('aria-valuenow', percentage);
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="alert alert-block alert-error"><a class="close" data-dismiss="alert" href="#">&times;</a><h4>Error message</h4></div>').append(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
(function ($) {

  /**
   * jQuery comment vote state plugin
   * e.g: $(document).commentVoteState(data);
   */
  $.fn.commentVoteState = function (data) {

    var setState = function(cid, mode){

      if(mode == 'up'){
        // Toggle active / inactive images and text
        $('#ajax-comment-wrapper-' + cid + ' .up-link img').replaceWith(Drupal.settings.comment.up_active);
        $('#ajax-comment-wrapper-' + cid + ' .like-msg').replaceWith(Drupal.settings.comment.up_active_msg);
        $('#ajax-comment-wrapper-' + cid + ' .vote-up').addClass('up-active');
        $('#ajax-comment-wrapper-' + cid + ' .vote-up').removeClass('up-inactive');
        $('#ajax-comment-wrapper-' + cid + ' .down-link img').replaceWith(Drupal.settings.comment.down_inactive);
        $('#ajax-comment-wrapper-' + cid + ' .dislike-msg').replaceWith(Drupal.settings.comment.down_inactive_msg);
        $('#ajax-comment-wrapper-' + cid + ' .vote-down').addClass('down-inactive');
        $('#ajax-comment-wrapper-' + cid + ' .vote-down').removeClass('down-active');
      }else if(mode == 'down'){
        // Toggle active / inactive images and text
        $('#ajax-comment-wrapper-' + cid + ' .up-link img').replaceWith(Drupal.settings.comment.up_inactive);
        $('#ajax-comment-wrapper-' + cid + ' .like-msg').replaceWith(Drupal.settings.comment.up_inactive_msg);
        $('#ajax-comment-wrapper-' + cid + ' .vote-up').addClass('up-inactive');
        $('#ajax-comment-wrapper-' + cid + ' .vote-up').removeClass('up-active');
        $('#ajax-comment-wrapper-' + cid + ' .down-link img').replaceWith(Drupal.settings.comment.down_active);
        $('#ajax-comment-wrapper-' + cid + ' .dislike-msg').replaceWith(Drupal.settings.comment.down_active_msg);
        $('#ajax-comment-wrapper-' + cid + ' .vote-down').addClass('down-active');
        $('#ajax-comment-wrapper-' + cid + ' .vote-down').removeClass('down-inactive');
      }

    };


    $('.comment-vote-wrapper').each(function(){

      var cid = $(this).attr('id').match(/\d+$/g)[0];
      if(typeof cid == 'undefined' || parseInt(cid) < 0){
        return false;
      }

      if((typeof data[cid].tu != 'undefined') && (typeof data[cid].td != 'undefined')){
        $('#ajax-comment-wrapper-' + cid + ' .total-up').html('<span>' + data[cid].tu +'</span>');
        $('#ajax-comment-wrapper-' + cid + ' .total-down').html('<span>' + data[cid].td +'</span>');
      }else{
        return false;
      }

      var uid = $.cookie('Drupal.visitor.uid');
      if(typeof uid == 'undefined' || parseInt(uid) < 0){
        return false;
      }

      if(($.inArray(uid, data[cid].u) != -1) && ($.inArray(uid, data[cid].d) != -1)){
        // passthrough
      }else{
        if($.inArray(uid, data[cid].d) != -1){
          setState(cid, 'down');
        }
        if($.inArray(uid, data[cid].u) != -1){
          setState(cid, 'up');
        }
      }

      return true;

    });
  };

  $(window).load(function() {
    if (Drupal.settings.comment.authorized) {
      $('body').once('cs', function () {
        // Currently only old theme still loading the comment part inside the node page.
        if (typeof Drupal.settings.nid != 'undefined' && Drupal.settings.theme != 'boom') {
          $.get('/scmp_comments/load/' + parseInt(Drupal.settings.nid), function(data) {
            if(typeof data.success != 'undefined' && data.success){
              $('body').once('csi').commentVoteState(data);
            }
          });
        }
      });
    }
    else {
      $('.comment-login-register a').attr('target', '_parent');
    }
    if (window.location.hash == '#comments' || window.location.hash == '#comment-form') {
      $('.scmp_button_comment').click();
    }
  });

  Drupal.behaviors.commentAvatar = {
    attach: function (context) {
      $('#comment-avatar').once('upic', function() {
        $(this).each(function() {
          var $icon = $(this);
          // User profile picture.
          if ($.cookie('Drupal.visitor.upic')) {
            $icon.css({'background-image' : 'url(' + $.cookie('Drupal.visitor.upic') + ')'});
          }
        });
      });
    }
  }

  Drupal.behaviors.commentPager = {
    attach: function(context, settings) {
      var pager = Drupal.settings.scmp_comments_pager;
      // Replace the pager with ajax pager
      $('body.theme-boom .pane-node-comments .pagination').replaceWith(pager);
      Drupal.behaviors.AJAX.attach(context, settings);
    }
  };

}(jQuery));
;
/* Functions to check device capabilities and user agent information */
(function ($) {
  $.isIPhone = function(){
    return ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1));
  };
  $.isIPad = function (){
    return (navigator.platform.indexOf("iPad") != -1);
  };
  $.isAndroidMobile  = function(){
    var ua = navigator.userAgent.toLowerCase();
    return ua.toLowerCase().indexOf("android") > -1 && ua.toLowerCase().indexOf("mobile");
  };
  $.isAndroidTablet  = function(){
    var ua = navigator.userAgent.toLowerCase();
    return (ua.toLowerCase().indexOf("android") > -1);
  };
  $.isTablet = function (){
    return ($.isIPad() || $.isAndroidTablet());
  }
}(jQuery));

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(ipad|playbook|silk|android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
;
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox')) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", "event", "Downloads", Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(), Drupal.googleanalytics.getPageUrl(this.href));
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(this.href) });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", "event", "Mails", "Click", this.href.substring(7));
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode != 2 || (Drupal.settings.googleanalytics.trackDomainMode == 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", "event", "Outbound links", "Click", this.href);
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga('send', 'pageview', location.pathname + location.search + location.hash);
    }
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  $(document).bind("cbox_complete", function () {
    var href = $.colorbox.element().attr("href");
    if (href) {
      ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(href) });
    }
  });

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - http://mydomain.com/node/1 -> /node/1
 * - http://example.com/foo/bar -> http://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;
