
/* Utility function to read GET querystring and return parameters as an associative array. */
function getUrlQueryString() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

(function ($) {

  /* Utility function to get the breakpoint name of bootstrap. */
  function getBreakpointClassName() {
    var width = $(window).width();
    var size = 'md';
    // Reference the css defined breakpoint.
    if (width >= 1300) {
      size = 'lg';
    }
    return size;
  }

  /* Define GPT data */
  $('html').once('gpt', function() {

    if (typeof Drupal.settings.scmp_advert_gpt.slots == 'undefined') {
      return;
    }

    /* Define slots */
    googletag.cmd.push(function() {
      // Iterate over defined slots
      var domain = window.location.hostname;
      var index = -1;
      var device = 'desktop';
      /* Mobile vs Desktop default*/
      var site = Drupal.settings.scmp_advert_gpt.global.com_prefix;
      if(domain.indexOf('m.') === 0){
        site = Drupal.settings.scmp_advert_gpt.global.m_prefix;
        device = 'mobile';
      }
      /* if desktop */
      if(device == 'desktop') {
        var fn_pageskin = "false";
        if (screen.width >= 1540) { fn_pageskin = "true"; }
        googletag.pubads().setTargeting("inskin_yes",fn_pageskin);
      }
      $.each(Drupal.settings.scmp_advert_gpt.slots, function(key, slot) {
        index++;
        var unit = '/' + Drupal.settings.scmp_advert_gpt.global.network_code +'/'+ site +'/'+ slot.zone;

        if (parseInt(slot.oop)) {
          gptadslots[index] = googletag.defineOutOfPageSlot(unit, slot.id).addService(googletag.pubads());
        }else{
          if (typeof slot.fluid != 'undefined' && slot.fluid) {
            var sizes = 'fluid';
          }
          else {
            var sizes = [[parseInt(slot.w),parseInt(slot.h)]];
            if (typeof slot.sizes != 'undefined') {
              for(var sizeKey in slot.sizes) {
                sizes.push([slot.sizes[sizeKey].w,slot.sizes[sizeKey].h]);
              }
            }
          }

          gptadslots[index] = googletag.defineSlot(unit, sizes, slot.id).addService(googletag.pubads());
          
        }

        // Set position targetting value.
        if (slot.pos) {
          gptadslots[index].setTargeting('pos',[slot.pos]);
        }

        // Set breakpoint targetting keyword value.
        if (!slot.breakpoint) {
          gptadslots[index].setTargeting('breakpoint', getBreakpointClassName());
        }
      });

      // Check and set utm_ targeting
      var params = getUrlQueryString();
      if (typeof params['utm_source'] != 'undefined' && params['utm_source']) {
        googletag.pubads().setTargeting('utm_source',[params['utm_source']])
      }
      if (typeof params['utm_medium'] != 'undefined' && params['utm_medium']) {
        googletag.pubads().setTargeting('utm_medium',[params['utm_medium']])
      }
      if (typeof params['utm_campaign'] != 'undefined' && params['utm_campaign']) {
        googletag.pubads().setTargeting('utm_campaign',[params['utm_campaign']])
      }else if (typeof document.referrer != 'undefined') {
        var social = false;
        // Social media referrer check
        if (document.referrer.indexOf('facebook.com') >= 0) {
          googletag.pubads().setTargeting('utm_source','facebook');
          social = true;
        }else if (document.referrer.indexOf('twitter.com') >= 0) {
          googletag.pubads().setTargeting('utm_source','twitter');
          social = true;
        }else if (document.referrer.indexOf('reddit.com') >= 0) {
          googletag.pubads().setTargeting('utm_source','reddit');
          social = true;
        }else if (document.referrer.indexOf('weibo.com') >= 0) {
          googletag.pubads().setTargeting('utm_source','weibo');
          social = true;
        }else if (document.referrer.indexOf('plus.google.com') >= 0) {
          googletag.pubads().setTargeting('utm_source','googlePlus');
          social = true;
        }
        if (social) {
          googletag.pubads().setTargeting('utm_campaign','SCMPSocialNewsfeed');
        }
      }
      if (typeof cX != 'undefined' && typeof cX.getUserSegmentIds != 'undefined') {
        googletag.pubads().setTargeting('CxSegments', cX.getUserSegmentIds({persistedQueryId:'4447e0fa134cf5f84532318bd94eb6894e97a086'}));
      }
      // Add role ID setting for doubleclick targetting
      var $rids = $.cookie('Drupal.visitor.rids');
      if ($rids) {
        $rids = $rids.split(',');
        if ($rids.indexOf("4") > -1 || $rids.indexOf(4) > -1) {
          googletag.pubads().setTargeting('sub',['4']);
        }else if ($rids.indexOf("2") > -1 || $rids.indexOf(2) > -1) {
          googletag.pubads().setTargeting('sub',['2']);
        }else if ($rids.indexOf("1") > -1 || $rids.indexOf(1) > -1) {
          googletag.pubads().setTargeting('sub',['1']);
        }
      }

      // refs #16766: add topic ID in topic index page and article page
      if (typeof Drupal.settings.scmp_advert_gpt.global.targeting != 'undefined') {
        $.each(Drupal.settings.scmp_advert_gpt.global.targeting, function(key, item) {
          googletag.pubads().setTargeting(key, item);
        });
      }
      
      // refs #22630: As product manager, I would like to implement ComScore DFP page targeting on both desktop and mdot.
      if (typeof Drupal.settings.scmp_advert_gpt.global.comscore_dfp != 'undefined') {
        var segmentData = Drupal.settings.scmp_advert_gpt.global.comscore_dfp.segmentData;

        if (segmentData) {
          googletag.pubads().setTargeting('gotSegmentData', segmentData);
        }
      }

      /* Location targeting */
      if (device == 'mobile'){
        if (Drupal.settings.scmp_advert_gpt.global.m_location) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
              googletag.pubads().setLocation(position.coords.latitude, position.coords.longitude);
            });
          }
        }
      }else if (Drupal.settings.scmp_advert_gpt.global.location) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position){
            googletag.pubads().setLocation(position.coords.latitude, position.coords.longitude);
          });
        }
      }
      // Set options
      if (Drupal.settings.scmp_advert_gpt.global.async) {
        googletag.pubads().enableAsyncRendering();
      }else{
        googletag.pubads().enableSyncRendering();
      }
      if (Drupal.settings.scmp_advert_gpt.global.sra) {
        googletag.pubads().enableSingleRequest();
      }
      if (Drupal.settings.scmp_advert_gpt.global.collapse) {
        googletag.pubads().collapseEmptyDivs();
      }
      googletag.enableServices();

      // If no prebid ad in page, display those AD now.
      if (typeof Drupal.settings.scmp_advert_gpt.global.prebid === 'undefined' || typeof Drupal.settings.scmp_advert_gpt.global.prebid.hasSlot === 'undefined') {
        googletag.pubads().refresh();
      }
    });

  });

})(jQuery);
