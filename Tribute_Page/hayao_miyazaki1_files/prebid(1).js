/**
 * @file prebid.js
 * SCMP prebid integration JS lib.
 * @see: http://prebid.org/overview/getting-started.html
 */
window.SCMPApp = window.SCMPApp || {};
var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];
window.SCMPApp.prebid = (function () {
  'use strict';
  // Init self-reference var in outer scope
  var _self;
  return {
    log: [],
    // prebid adUnits
    // @see: module_pbjs.addAdUnits
    prebidAdUnits: [],
    // Main: initialize the JS
    init: function () {
      // Set reference to self,
      // can use instead of "this" and window.SCMPApp.prebid inner scope
      _self = this;
      if (!_self.enabled()) {
        _self.log.push('Prebid not enabled');
        return false;
      }
      // Get config
      var prebidConfig = JSON.parse(Drupal.settings.scmp_advert_gpt.global.prebid.config);
      if (!prebidConfig) {
        _self.log.push('Prebid config empty or invalid');
        return false;
      } else {
        _self.prebidConfig = prebidConfig;
      }
      // Calc prebid ad units for page
      _self.setPrebidAdUnits();
      // If some exist, init prebid
      if (_self.prebidAdUnits.length) {
        _self.initPrebid();
      } else {
        _self.log.push('No valid prebid ad units');
      }
    },
    // Check if prebid logic enabled
    enabled: function () {
      var enabled = false;
      // If slots and prebid enabled in config
      if (typeof Drupal.settings.scmp_advert_gpt !== 'undefined' &&
          typeof Drupal.settings.scmp_advert_gpt.slots !== 'undefined' &&
          typeof Drupal.settings.scmp_advert_gpt.global.prebid !== 'undefined' &&
          typeof Drupal.settings.scmp_advert_gpt.global.prebid.config !== 'undefined' &&
          typeof Drupal.settings.scmp_advert_gpt.global.prebid.enable !== 'undefined' &&
          Drupal.settings.scmp_advert_gpt.global.prebid.enable) {
          // Prebid is enabled
          enabled = true;
      }
      return enabled;
    },
    // Set ad units for passing to prebid
    setPrebidAdUnits: function () {
      // Construct the bidders for ad slot and size
      for (var key in Drupal.settings.scmp_advert_gpt.slots) {
        if (typeof Drupal.settings.scmp_advert_gpt.slots[key].w !== 'undefined' && Drupal.settings.scmp_advert_gpt.slots[key].w > 1 && typeof Drupal.settings.scmp_advert_gpt.slots[key].h !== 'undefined' && Drupal.settings.scmp_advert_gpt.slots[key].h > 1) {
          // Init prebid adUnit conf for this slot
          var adUnit = {
            code: Drupal.settings.scmp_advert_gpt.slots[key].id,
            bids: [],
            sizes: []
          };

          // refs #21994: As a product manager, i would like to add outstream video ad support for header bid
          if (_self.prebidConfig.mediaTypes) {
            for (var mediaType in _self.prebidConfig.mediaTypes) {
              switch (mediaType) {
                case 'video':
                  switch (_self.prebidConfig.mediaTypes.video.context) {
                    case 'instream':
                      adUnit.mediaTypes =  adUnit.mediaTypes || {};
                      adUnit.mediaTypes.video = {
                        context: "instream"
                      };
                      break;
                    case 'outstream':
                      adUnit.mediaTypes = adUnit.mediaTypes || {}
                      adUnit.mediaTypes.video = {
                        context: "outstream"
                      };
                      
                      switch (adUnit.renderer) {
                        case 'adnxs':
                          adUnit.renderer = {
                            url: 'http://cdn.adnxs.com/renderer/video/ANOutstreamVideo.js',
                            render: function (bid) {
                              ANOutstreamVideo.renderAd({
                                targetId: bid.adUnitCode,
                                adResponse: bid.adResponse,
                                tagId: bid.adResponse.tag_id,
                                sizes: [bid.getSize().split('x')],
                                uuid: bid.adResponse.uuid,
                                rendererOptions: bid.renderer.getConfig()
                              });
                            }
                          }; 
                          break;
                      }                                 
                      break;
                  }                  
                  break;
                case 'native': 
                  adUnit.mediaTypes = adUnit.mediaTypes || {};
                  adUnit.mediaTypes.native = _self.prebidConfig.mediaTypes.native;
                  break;
              }
            }
          }

          // Add bidder to slot bids, if allowed size
          for (var key1 in _self.prebidConfig.bidders) {
            if (typeof _self.prebidConfig.bidders[key1].bidder == 'undefined' || _self.prebidConfig.bidders[key1].sizes == 'undefined') {
              continue;
            }
            var bidderConfig = _self.prebidConfig.bidders[key1];
            // Simplified bidder conf to pass to prebid
            var prebidBidderConfig = {
              bidder: bidderConfig.bidder,
              params: bidderConfig.params
            };
            // When slot has the multiple sizes mapping.
            if (typeof Drupal.settings.scmp_advert_gpt.slots[key].sizes !== 'undefined') {
              var sizes = [];
              for (var key2 in Drupal.settings.scmp_advert_gpt.slots[key].sizes) {
                var width = Drupal.settings.scmp_advert_gpt.slots[key].sizes[key2].w;
                var height = Drupal.settings.scmp_advert_gpt.slots[key].sizes[key2].h;
                if (bidderConfig.targetSizes.indexOf(width + 'x' + height) !== -1) {
                  sizes.push([width, height]);
                }
              }
              if (sizes.length) {
                adUnit.sizes = sizes;
                adUnit.bids.push(prebidBidderConfig);
              }
            // When ad slot has only one size.
            } else if (bidderConfig.targetSizes.indexOf(Drupal.settings.scmp_advert_gpt.slots[key].w + 'x' + Drupal.settings.scmp_advert_gpt.slots[key].h) !== -1) {
              adUnit.sizes.push([Drupal.settings.scmp_advert_gpt.slots[key].w, Drupal.settings.scmp_advert_gpt.slots[key].h]);
              adUnit.bids.push(prebidBidderConfig);
            }
          }
          // If has bids, push unit for prebid
          if (adUnit.bids.length) {
            // Remove duplicate sizes from multiple bidders
            var tmpSizes = {};
            adUnit.sizes = adUnit.sizes.filter(function(item, pos) {
              var strItem = JSON.stringify(item);
              return !(strItem in tmpSizes) && (tmpSizes[strItem] = 1);
            })
            _self.prebidAdUnits.push(adUnit);
          }
        }
      }
    },
    // Initialize prebid and pass ad units
    initPrebid: function () {
      // Define the prebid js library, add version query string to tackle browser cache when js library is updated.
      var prebid_js_url = '/sites/default/files/prebid/desktop/prebid.js';
      var prebid_js_version = Drupal.settings.scmp_advert_gpt.global.prebid_js_version_desktop;
      if (prebid_js_version) {
        prebid_js_url = prebid_js_url + '?v=' + prebid_js_version;
      }
      // Add prebid JS lib
      (function(d,s,e,t){e=d.createElement(s);e.type='text/java'+s;e.async='async';
      e.src=prebid_js_url;
      t=d.getElementsByTagName(s)[0];t.parentNode.insertBefore(e,t);})(document,'script');
      // Push to async queue for when ready
      pbjs.que.push(function() {
        pbjs.enableSendAllBids();
      });
      pbjs.que.push(function() {
        pbjs.setPriceGranularity('dense');
      });
      // Register hasSlot for scmp_advert_gpt_async.js check
      Drupal.settings.scmp_advert_gpt.global.prebid.hasSlot = true;
      // Push to prebid process
      pbjs.que.push(function() {
        pbjs.addAdUnits(_self.prebidAdUnits);
        pbjs.requestBids({
          bidsBackHandler: _self.sendAdserverRequest
        });
        pbjs.enableAnalytics({
          provider: 'ga',
          options: {
            global: 'ga',
            enableDistribution: true,
          }
        });
      });
      // If no response within timeout, do normal ad display
      setTimeout(function() {
        _self.sendAdserverRequest();
      }, _self.prebidConfig.timeout);
    },
    // Refresh adverts when complete
    // @see bidsBackHandler and setTimeout
    sendAdserverRequest: function () {
      if (pbjs.adserverRequestSent) return;
      pbjs.adserverRequestSent = true;
      googletag.cmd.push(function() {
        pbjs.que.push(function() {
          pbjs.setTargetingForGPTAsync();
          googletag.pubads().refresh();
        });
      });
    }
  };
})();

/**
 * Initialize prebid feature
 */
try {
  window.SCMPApp.prebid.init();
} catch (e) {
  if (typeof console !== 'undefined' && console.log !== 'undefined') {
    console.log(e);
  }
}
