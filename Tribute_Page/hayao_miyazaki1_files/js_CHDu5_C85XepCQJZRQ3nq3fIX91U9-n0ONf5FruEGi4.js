/**
 * Helper JS to find a correct URL/Title to share.
 */
(function ($) {
  $.fn.generateShareCount = function(url) {

    //Define the Endpoints and relevant data.
    //get facebook
    function getFacebook(url) {
      return $.ajax({
          dataType: "jsonp",
          url: 'http://graph.facebook.com/',
          data: {'id':url}
      });
    }

    //get reddit
    function getReddit(url) {
      return $.ajax({
          url: 'http://www.reddit.com/api/info.json',
          data: {'url':url}
      });
    }

    //get linkedin..
    function getLinkedin(url) {
      return $.ajax({
          dataType: "jsonp",
          url: 'https://www.linkedin.com/countserv/count/share',
          data: {'url':url}
      });
    }

    //Do the acutal counting..
    var totalCount = 0;
    var object = $(this);
    $.when(getFacebook(url), getLinkedin(url), getReddit(url)).done(function(facebook, linkedin, reddit) {
      //Saftey check in case facebook returns undefined.
      if (typeof facebook[0].share !== "undefined") var facebookCount = facebook[0].share.share_count; else var facebookCount = 0;

      //Saftey Check in case reddit returns undefined.
      if (typeof reddit[0].data.children[0] !== "undefined") var redditCount = reddit[0].data.children[0].data.score; else var redditCount = 0;

      //Generate linked in count
      var linkedinCount = linkedin[0].count || 0;

      //Add the counts
        totalCount += facebookCount + redditCount + linkedinCount;
        //update the text
        object.each(function() {
          $(this).text(parseInt(totalCount) + parseInt($(this).text())).trigger('change');
        });
    });
  };

  Drupal.settings.scmpSocialWidgets = Drupal.settings.scmpSocialWidgets || {};
  Drupal.settings.scmpSocialWidgets.link = window.location.href;
  Drupal.settings.scmpSocialWidgets.title = '';
  Drupal.settings.status = Drupal.settings.status || 1;

  if (document.querySelector("meta[property='og:title']") !== null) {
    Drupal.settings.scmpSocialWidgets.title = document.querySelector("meta[property='og:title']").getAttribute("content");
  }
  else {
    Drupal.settings.scmpSocialWidgets.title = document.getElementsByTagName("title")[0].innerText.replace("| South China Morning Post", "");
  }

  if ($('link[rel="canonical"]').length) {
    var url = $('link[rel="canonical"]').attr('href');
    if (url.indexOf('http') != -1) {
      // Already absolute URL
      Drupal.settings.scmpSocialWidgets.link = url;
    } else {
      Drupal.settings.scmpSocialWidgets.link = window.location.protocol;
      Drupal.settings.scmpSocialWidgets.link += '//' + document.domain;
      Drupal.settings.scmpSocialWidgets.link += $('link[rel="canonical"]').attr('href');
    }
  }
  if ($('meta[itemprop="headline"]').length) {
    Drupal.settings.scmpSocialWidgets.title = $('meta[itemprop="headline"]').attr('content');
  }
  if ($('meta[name="twitter:site"]').length) {
    Drupal.settings.scmpSocialWidgets.twitterVia = $('meta[name="twitter:site"]').attr('content').substring(1);
  }
  else {
    Drupal.settings.scmpSocialWidgets.twitterVia = 'SCMP_news';
  }

  $(document).ready(function() {
    Drupal.settings.scmpSocialWidgets.originalLink = Drupal.settings.scmpSocialWidgets.link;
    if (typeof Drupal.settings != 'undefined' && typeof Drupal.settings.scmpShareURL != 'undefined') {
      Drupal.settings.scmpSocialWidgets.link = Drupal.settings.scmpShareURL;
    }
    if ($('.addthis-wrapper:not(.addthis_nocount)')) {
      $('.addthis_total_count').each(function() {
        var $totalCount = $('<span>0</span>');
        $totalCount.prependTo($(this));
        $totalCount.on('change', function() {
          if ($(this).text() > 1) {
            $(this).parents('.addthis_total_count').addClass('plural');
          }
        });
      });
      var status = parseInt(Drupal.settings.status);
      if (status === 1){
        // Get share count by original url.
        $('.addthis_total_count span').generateShareCount(Drupal.settings.scmpSocialWidgets.originalLink);
      } else {
        $('.pane-share-widgets-article').remove();
      }
    }
    $('.addthis_toolbox').once('share', function() {
      var url = Drupal.settings.scmpSocialWidgets.link;
      var trackedUrl = location.pathname;
      var title = encodeURI(Drupal.settings.scmpSocialWidgets.title);
      var fb_app_id =  $('meta[property="fb:app_id"]').attr('content');
      if ($(this).attr('addthis:url')) {
        url = $(this).attr('addthis:url');
      }
      if ($(this).attr('addthis:title')) {
        title = encodeURI($(this).attr('addthis:title'));
      }
      $(this).find(' > a').attr('target', '_blank');
      $(this).find('.addthis_button_facebook').each(function() {
        $(this).attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + Drupal.settings.scmpSocialWidgets.link + '&title=' + encodeURI(Drupal.settings.scmpSocialWidgets.title));
        $(this).click(function() {
          event.preventDefault();
          FB.ui({
            method: 'share',
            href: url,
            title: decodeURI(title)
          }, function(response){});
          ga('send', 'event', 'Share button', 'Share button/Facebook/Click', trackedUrl);
          return false;
        });
      });

      $(this).find('.addthis_button_facebook_messenger').each(function() {
        //$(this).attr('href', 'fb-messenger://share/?link=' + url + '&app_id=' + fb_app_id);
        $(this).attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + Drupal.settings.scmpSocialWidgets.link + '&title=' + encodeURI(Drupal.settings.scmpSocialWidgets.title));
        $(this).click(function(e){
          e.preventDefault();
          FB.ui({
            method: 'send',
            link: Drupal.settings.scmpSocialWidgets.link,
          });
          ga('send', 'event', 'Share button', 'Share button/Facebook Messenger/Click', trackedUrl);
        });
      });

      $(this).find('.addthis_button_twitter').each(function() {
        $(this).attr('href', 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title + '&via=' + Drupal.settings.scmpSocialWidgets.twitterVia);
        $(this).click(function(e){
          ga('send', 'event', 'Share button', 'Share button/Twitter/Click', trackedUrl);
        });
      });
      $(this).find('.addthis_button_reddit').each(function() {
        $(this).attr('href', 'https://www.reddit.com/submit?url=' + url + '&title=' + title);
        $(this).click(function(e){
          ga('send', 'event', 'Share button', 'Share button/Reddit/Click', trackedUrl);
        });
      });
      $(this).find('.addthis_button_linkedin').each(function() {
        $(this).attr('href', 'https://www.linkedin.com/cws/share?url=' + url + '&title=' + title);
        $(this).click(function(e){
          ga('send', 'event', 'Share button', 'Share button/LinkedIn/Click', trackedUrl);
        });
      });
      $(this).find('.addthis_button_google_plusone_share').each(function() {
        $(this).attr('href', 'https://plus.google.com/share?url=' + url + '&title=' + title);
        $(this).click(function(e){
          ga('send', 'event', 'Share button', 'Share button/Google+/Click', trackedUrl);
        });
      });
      $(this).find('.addthis_button_sinaweibo').each(function() {
        $(this).attr('href', 'http://service.weibo.com/share/share.php?url=' + url + '&title=' + title);
        $(this).click(function(e){
          ga('send', 'event', 'Share button', 'Share button/Weibo/Click', trackedUrl);
        });
      });
    });
  });

})(jQuery);
;
(function ($) {

  Drupal.behaviors.captcha = {
    attach: function (context) {

      // Turn off autocompletion for the CAPTCHA response field.
      // We do it here with JavaScript (instead of directly in the markup)
      // because this autocomplete attribute is not standard and
      // it would break (X)HTML compliance.
      $("#edit-captcha-response").attr("autocomplete", "off");

    }
  };

  Drupal.behaviors.captchaAdmin = {
    attach: function (context) {
      // Add onclick handler to checkbox for adding a CAPTCHA description
      // so that the textfields for the CAPTCHA description are hidden
      // when no description should be added.
      // @todo: div.form-item-captcha-description depends on theming, maybe
      // it's better to add our own wrapper with id (instead of a class).
      $("#edit-captcha-add-captcha-description").click(function() {
        if ($("#edit-captcha-add-captcha-description").is(":checked")) {
          // Show the CAPTCHA description textfield(s).
          $("div.form-item-captcha-description").show('slow');
        }
        else {
          // Hide the CAPTCHA description textfield(s).
          $("div.form-item-captcha-description").hide('slow');
        }
      });
      // Hide the CAPTCHA description textfields if option is disabled on page load.
      if (!$("#edit-captcha-add-captcha-description").is(":checked")) {
        $("div.form-item-captcha-description").hide();
      }
    }

  };

})(jQuery);
;
(function ($) {

/**
 * Extend Drupal.ajax for AJAX Toolbar load
 */
Drupal.ajax.prototype.SCMPAjaxGet = function() {
  var ajax = this;
  // Force GET so is cacheable!
  ajax.options.type = 'GET';
  // Do not perform another ajax command if one is already in progress.
  if (ajax.ajaxing) {
    return false;
  }
  try {
    $.ajax(ajax.options);
  }
  catch (err) {
    return false;
  }
  return false;
};

/**
 * Attach AJAX Toolbar behavior
 */
Drupal.behaviors.AJAXtoolbar = {
  attach: function(context) {
    // Load admin toolbar
    $('#page-toolbar-container', context).once('toolbar-view', function(e) {
      var $load = false;
      // Check valid rids
      var $rids = $.cookie('Drupal.visitor.rids');
      // Get token to valid rids
      var $token = $.cookie('Drupal.visitor.token');
      // Get valid toolbar role ids for toolbar from settings
      var $valid = Drupal.settings.trids;

      if ($rids && $valid && $token) {
        $rids = $rids.split(',');
        for ($i=0; $i < $rids.length; $i++) {
          var $rid = $rids[$i]; // parseInt($rids[$i]);
          if ($valid.indexOf($rid) > -1) {
            $load = true;
          }
        }
      }
      if (!$load) {
        return;
      }
      // Define custom AJAX settings
      // This allows loading the AJAX content without user interaction via the Drupal AJAX API
      var $ajax_settings = {};
      $ajax_settings.url = '/ajax/toolbar' + '?rids=' + $rids + '&token='  + $token + '&theme=' +  Drupal.settings.ajaxPageState.theme + '&theme_token=' + Drupal.settings.ajaxPageState.theme_token;
      $ajax_settings.event = 'onload';
      $ajax_settings.progress = { 'type': 'none' };
      $ajax_settings.keypress = false;
      $ajax_settings.prevent = false;
      // Register the custom AJAX function
      Drupal.ajax['ajax_toolbar'] = new Drupal.ajax(null, $(document.body), $ajax_settings);
      // Invoke the custom function, using our GET handler
      Drupal.ajax['ajax_toolbar'].SCMPAjaxGet();
    });

  }
};

Drupal.behaviors.AJAXtoolbarExtraLinks = {
  attach: function(context) {
    $('.toolbar-shortcuts', context).once('toolbar-links', function(e) {
      // Add dynamic node edit link to shortcuts
      if (typeof Drupal.settings.nid != "undefined") {
        $('.toolbar-shortcuts ul.menu').prepend('<li><a href="/node/' + Drupal.settings.nid + '/nodequeue">Add to Nodequeue</a></li>');
        $('.toolbar-shortcuts ul.menu').prepend('<li><a href="/node/' + Drupal.settings.nid + '/edit">Edit content</a></li>');
      }else if(typeof Drupal.settings.tid != "undefined") {
         $('.toolbar-shortcuts ul.menu').prepend('<li><a href="/taxonomy/term/' + Drupal.settings.tid + '/edit">Edit term</a></li>');
         if (typeof Drupal.settings.vocab != "undefined" && Drupal.settings.vocab == 'issue') {
           $('.toolbar-shortcuts ul.menu').prepend('<li><a href="/taxonomy/term/' + Drupal.settings.tid + '/edit-issue-queue">Issue queue</a></li>');
         }
      }
    });

  }
};

})(jQuery);
;
