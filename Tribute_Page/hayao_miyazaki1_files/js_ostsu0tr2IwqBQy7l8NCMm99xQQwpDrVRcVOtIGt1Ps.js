/* jquery-accessible-tabs - v1.9.9
* http://github.com/ginader/Accessible-Tabs
* Copyright (c) 2016 Dirk Ginader;
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html */
!function($){function debug(msg,info){debugMode&&window.console&&window.console.log&&(info?window.console.log(info+": ",msg):window.console.log(msg))}var debugMode=!0;$.fn.extend({getUniqueId:function(p,q,r){return r=void 0===r?"":"-"+r,p+q+r},getClassSelectorsFromClassNames:function(className){return className.indexOf(!0)?"."+className.split(" ").join("."):"."+className},accessibleTabs:function(config){var defaults={wrapperClass:"content",currentClass:"current",tabhead:"h4",tabheadClass:"tabhead",tabbody:".tabbody",fx:"show",fxspeed:"normal",currentInfoText:"current tab: ",currentInfoPosition:"prepend",currentInfoClass:"current-info",tabsListClass:"tabs-list",syncheights:!1,syncHeightMethodName:"syncHeight",cssClassAvailable:!1,saveState:!1,autoAnchor:!1,pagination:!1,position:"top",wrapInnerNavLinks:"",firstNavItemClass:"first",lastNavItemClass:"last",clearfixClass:"clearfix"},keyCodes={37:-1,38:-1,39:1,40:1},positions={top:"prepend",bottom:"append"};this.options=$.extend(defaults,config);var tabsCount=0;void 0!==$("body").data("accessibleTabsCount")&&(tabsCount=$("body").data("accessibleTabsCount")),$("body").data("accessibleTabsCount",this.size()+tabsCount);var o=this;return this.each(function(t){var el=$(this),list="",tabCount=0,ids=[];$(el).wrapInner('<div class="'+o.options.wrapperClass+'"></div>'),$(el).find(o.options.tabhead).each(function(i){var id="",elId=$(this).attr("id");if(elId){if(0===elId.indexOf("accessibletabscontent"))return;id=' id="'+elId+'"'}var tabId=o.getUniqueId("accessibletabscontent",tabsCount+t,i),navItemId=o.getUniqueId("accessibletabsnavigation",tabsCount+t,i);if(ids.push(tabId),o.options.cssClassAvailable===!0){var cssClass="";$(this).attr("class")&&(cssClass=$(this).attr("class"),cssClass=' class="'+cssClass+'"'),list+='<li id="'+navItemId+'"><a'+id+cssClass+' href="#'+tabId+'">'+$(this).html()+"</a></li>"}else list+='<li id="'+navItemId+'"><a'+id+' href="#'+tabId+'">'+$(this).html()+"</a></li>";$(this).attr({id:tabId,"class":o.options.tabheadClass,tabindex:"-1"}),tabCount++}),o.options.syncheights&&$.fn[o.options.syncHeightMethodName]&&($(el).find(o.options.tabbody)[o.options.syncHeightMethodName](),$(window).resize(function(){$(el).find(o.options.tabbody)[o.options.syncHeightMethodName]()}));var tabs_selector=o.getClassSelectorsFromClassNames(o.options.tabsListClass);$(el).find(tabs_selector).length||$(el)[positions[o.options.position]]('<ul class="'+o.options.clearfixClass+" "+o.options.tabsListClass+" tabamount"+tabCount+'"></ul>'),$(el).find(tabs_selector).append(list);var content=$(el).find(o.options.tabbody);if(content.length>0&&($(content).hide(),$(content[0]).show()),$(el).find("ul"+o.getClassSelectorsFromClassNames(o.options.tabsListClass)+">li:first").addClass(o.options.currentClass).addClass(o.options.firstNavItemClass).find("a")[o.options.currentInfoPosition]('<span class="'+o.options.currentInfoClass+'">'+o.options.currentInfoText+"</span>").parents("ul"+o.getClassSelectorsFromClassNames(o.options.tabsListClass)).children("li:last").addClass(o.options.lastNavItemClass),o.options.wrapInnerNavLinks&&$(el).find("ul"+o.getClassSelectorsFromClassNames(o.options.tabsListClass)+">li>a").wrapInner(o.options.wrapInnerNavLinks),$(el).find("ul"+o.getClassSelectorsFromClassNames(o.options.tabsListClass)+">li>a").each(function(i){$(this).click(function(event){event.preventDefault(),el.trigger("showTab.accessibleTabs",[$(event.target)]),o.options.saveState&&$.cookie&&$.cookie("accessibletab_"+el.attr("id")+"_active",i),$(el).find("ul"+o.getClassSelectorsFromClassNames(o.options.tabsListClass)+">li."+o.options.currentClass).removeClass(o.options.currentClass).find("span"+o.getClassSelectorsFromClassNames(o.options.currentInfoClass)).remove(),$(this).blur(),$(el).find(o.options.tabbody+":visible").hide(),$(el).find(o.options.tabbody).eq(i)[o.options.fx](o.options.fxspeed),$(this)[o.options.currentInfoPosition]('<span class="'+o.options.currentInfoClass+'">'+o.options.currentInfoText+"</span>").parent().addClass(o.options.currentClass),$($(this).attr("href")).focus().keyup(function(event){keyCodes[event.keyCode]&&(o.showAccessibleTab(i+keyCodes[event.keyCode]),$(this).unbind("keyup"))})}),$(this).focus(function(){$(document).keyup(function(event){keyCodes[event.keyCode]&&o.showAccessibleTab(i+keyCodes[event.keyCode])})}),$(this).blur(function(){$(document).unbind("keyup")})}),o.options.saveState&&$.cookie){var savedState=$.cookie("accessibletab_"+el.attr("id")+"_active");debug($.cookie("accessibletab_"+el.attr("id")+"_active")),null!==savedState&&o.showAccessibleTab(savedState,el.attr("id"))}if(o.options.autoAnchor&&window.location.hash){var anchorTab=$(o.getClassSelectorsFromClassNames(o.options.tabsListClass)).find(window.location.hash);anchorTab.size()&&anchorTab.click()}if(o.options.pagination){var m='<ul class="pagination">';m+='    <li class="previous"><a href="#{previousAnchor}"><span>{previousHeadline}</span></a></li>',m+='    <li class="next"><a href="#{nextAnchor}"><span>{nextHeadline}</span></a></li>',m+="</ul>";var tabs=$(el).find(".tabbody"),tabcount=tabs.size();tabs.each(function(idx){$(this).append(m);var next=idx+1;next>=tabcount&&(next=0);var previous=idx-1;0>previous&&(previous=tabcount-1);var p=$(this).find(".pagination"),previousEl=p.find(".previous");previousEl.find("span").text($("#"+ids[previous]).text()),previousEl.find("a").attr("href","#"+ids[previous]).click(function(event){event.preventDefault(),$(el).find(".tabs-list a").eq(previous).click()});var nextEl=p.find(".next");nextEl.find("span").text($("#"+ids[next]).text()),nextEl.find("a").attr("href","#"+ids[next]).click(function(event){event.preventDefault(),$(el).find(".tabs-list a").eq(next).click()})})}})},showAccessibleTab:function(index,id){debug("showAccessibleTab");var o=this;if(!id)return this.each(function(){var el=$(this);el.trigger("showTab.accessibleTabs");var links=el.find("ul"+o.getClassSelectorsFromClassNames(o.options.tabsListClass)+">li>a");el.trigger("showTab.accessibleTabs",[links.eq(index)]),links.eq(index).click()});var el=$("#"+id),links=el.find("ul"+o.getClassSelectorsFromClassNames(o.options.tabsListClass)+">li>a");el.trigger("showTab.accessibleTabs",[links.eq(index)]),links.eq(index).click()},showAccessibleTabSelector:function(selector){debug("showAccessibleTabSelector");var el=$(selector);el&&("a"===el.get(0).nodeName.toLowerCase()?el.click():debug("the selector of a showAccessibleTabSelector() call needs to point to a tabs headline!"))}})}(jQuery);
;
function date(format, timestamp) {
  //  discuss at: http://phpjs.org/functions/date/
  // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  // original by: gettimeofday
  //    parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: MeEtc (http://yass.meetcweb.com)
  // improved by: Brad Touesnard
  // improved by: Tim Wiel
  // improved by: Bryan Elliott
  // improved by: David Randall
  // improved by: Theriault
  // improved by: Theriault
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault
  // improved by: Thomas Beaucourt (http://www.webapp.fr)
  // improved by: JT
  // improved by: Theriault
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // improved by: Theriault
  //    input by: Brett Zamir (http://brett-zamir.me)
  //    input by: majak
  //    input by: Alex
  //    input by: Martin
  //    input by: Alex Wilson
  //    input by: Haravikk
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: majak
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
  // bugfixed by: Chris (http://www.devotis.nl/)
  //        note: Uses global: php_js to store the default timezone
  //        note: Although the function potentially allows timezone info (see notes), it currently does not set
  //        note: per a timezone specified by date_default_timezone_set(). Implementers might use
  //        note: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
  //        note: in order to adjust the dates in this function (or our other date functions!) accordingly
  //   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
  //   returns 1: '09:09:40 m is month'
  //   example 2: date('F j, Y, g:i a', 1062462400);
  //   returns 2: 'September 2, 2003, 2:26 am'
  //   example 3: date('Y W o', 1062462400);
  //   returns 3: '2003 36 2003'
  //   example 4: x = date('Y m d', (new Date()).getTime()/1000);
  //   example 4: (x+'').length == 10 // 2009 01 09
  //   returns 4: true
  //   example 5: date('W', 1104534000);
  //   returns 5: '53'
  //   example 6: date('B t', 1104534000);
  //   returns 6: '999 31'
  //   example 7: date('W U', 1293750000.82); // 2010-12-31
  //   returns 7: '52 1293750000'
  //   example 8: date('W', 1293836400); // 2011-01-01
  //   returns 8: '52'
  //   example 9: date('W Y-m-d', 1293974054); // 2011-01-02
  //   returns 9: '52 2011-01-02'

  var that = this;
  var jsdate, f;
  // Keep this here (works, but for code commented-out below for file size reasons)
  // var tal= [];
  var txt_words = [
    'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  // trailing backslash -> (dropped)
  // a backslash followed by any character (including backslash) -> the character
  // empty string -> empty string
  var formatChr = /\\?(.?)/gi;
  var formatChrCb = function (t, s) {
    return f[t] ? f[t]() : s;
  };
  var _pad = function (n, c) {
    n = String(n);
    while (n.length < c) {
      n = '0' + n;
    }
    return n;
  };
  f = {
    // Day
    d: function () {
      // Day of month w/leading 0; 01..31
      return _pad(f.j(), 2);
    },
    D: function () {
      // Shorthand day name; Mon...Sun
      return f.l()
        .slice(0, 3);
    },
    j: function () {
      // Day of month; 1..31
      return jsdate.getDate();
    },
    l: function () {
      // Full day name; Monday...Sunday
      return txt_words[f.w()] + 'day';
    },
    N: function () {
      // ISO-8601 day of week; 1[Mon]..7[Sun]
      return f.w() || 7;
    },
    S: function () {
      // Ordinal suffix for day of month; st, nd, rd, th
      var j = f.j();
      var i = j % 10;
      if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
        i = 0;
      }
      return ['st', 'nd', 'rd'][i - 1] || 'th';
    },
    w: function () {
      // Day of week; 0[Sun]..6[Sat]
      return jsdate.getDay();
    },
    z: function () {
      // Day of year; 0..365
      var a = new Date(f.Y(), f.n() - 1, f.j());
      var b = new Date(f.Y(), 0, 1);
      return Math.round((a - b) / 864e5);
    },

    // Week
    W: function () {
      // ISO-8601 week number
      var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
      var b = new Date(a.getFullYear(), 0, 4);
      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
    },

    // Month
    F: function () {
      // Full month name; January...December
      return txt_words[6 + f.n()];
    },
    m: function () {
      // Month w/leading 0; 01...12
      return _pad(f.n(), 2);
    },
    M: function () {
      // Shorthand month name; Jan...Dec
      return f.F()
        .slice(0, 3);
    },
    n: function () {
      // Month; 1...12
      return jsdate.getMonth() + 1;
    },
    t: function () {
      // Days in month; 28...31
      return (new Date(f.Y(), f.n(), 0))
        .getDate();
    },

    // Year
    L: function () {
      // Is leap year?; 0 or 1
      var j = f.Y();
      return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
    },
    o: function () {
      // ISO-8601 year
      var n = f.n();
      var W = f.W();
      var Y = f.Y();
      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
    },
    Y: function () {
      // Full year; e.g. 1980...2010
      return jsdate.getFullYear();
    },
    y: function () {
      // Last two digits of year; 00...99
      return f.Y()
        .toString()
        .slice(-2);
    },

    // Time
    a: function () {
      // am or pm
      return jsdate.getHours() > 11 ? 'pm' : 'am';
    },
    A: function () {
      // AM or PM
      return f.a()
        .toUpperCase();
    },
    B: function () {
      // Swatch Internet time; 000..999
      var H = jsdate.getUTCHours() * 36e2;
      // Hours
      var i = jsdate.getUTCMinutes() * 60;
      // Minutes
      // Seconds
      var s = jsdate.getUTCSeconds();
      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
    },
    g: function () {
      // 12-Hours; 1..12
      return f.G() % 12 || 12;
    },
    G: function () {
      // 24-Hours; 0..23
      return jsdate.getHours();
    },
    h: function () {
      // 12-Hours w/leading 0; 01..12
      return _pad(f.g(), 2);
    },
    H: function () {
      // 24-Hours w/leading 0; 00..23
      return _pad(f.G(), 2);
    },
    i: function () {
      // Minutes w/leading 0; 00..59
      return _pad(jsdate.getMinutes(), 2);
    },
    s: function () {
      // Seconds w/leading 0; 00..59
      return _pad(jsdate.getSeconds(), 2);
    },
    u: function () {
      // Microseconds; 000000-999000
      return _pad(jsdate.getMilliseconds() * 1000, 6);
    },

    // Timezone
    e: function () {
      // Timezone identifier; e.g. Atlantic/Azores, ...
      // The following works, but requires inclusion of the very large
      // timezone_abbreviations_list() function.
      /*              return that.date_default_timezone_get();
       */
      throw 'Not supported (see source code of date() for timezone on how to add support)';
    },
    I: function () {
      // DST observed?; 0 or 1
      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
      // If they are not equal, then DST is observed.
      var a = new Date(f.Y(), 0);
      // Jan 1
      var c = Date.UTC(f.Y(), 0);
      // Jan 1 UTC
      var b = new Date(f.Y(), 6);
      // Jul 1
      // Jul 1 UTC
      var d = Date.UTC(f.Y(), 6);
      return ((a - c) !== (b - d)) ? 1 : 0;
    },
    O: function () {
      // Difference to GMT in hour format; e.g. +0200
      var tzo = jsdate.getTimezoneOffset();
      var a = Math.abs(tzo);
      return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
    },
    P: function () {
      // Difference to GMT w/colon; e.g. +02:00
      var O = f.O();
      return (O.substr(0, 3) + ':' + O.substr(3, 2));
    },
    T: function () {
      // Timezone abbreviation; e.g. EST, MDT, ...
      // The following works, but requires inclusion of the very
      // large timezone_abbreviations_list() function.
      /*              var abbr, i, os, _default;
      if (!tal.length) {
        tal = that.timezone_abbreviations_list();
      }
      if (that.php_js && that.php_js.default_timezone) {
        _default = that.php_js.default_timezone;
        for (abbr in tal) {
          for (i = 0; i < tal[abbr].length; i++) {
            if (tal[abbr][i].timezone_id === _default) {
              return abbr.toUpperCase();
            }
          }
        }
      }
      for (abbr in tal) {
        for (i = 0; i < tal[abbr].length; i++) {
          os = -jsdate.getTimezoneOffset() * 60;
          if (tal[abbr][i].offset === os) {
            return abbr.toUpperCase();
          }
        }
      }
      */
      return 'UTC';
    },
    Z: function () {
      // Timezone offset in seconds (-43200...50400)
      return -jsdate.getTimezoneOffset() * 60;
    },

    // Full Date/Time
    c: function () {
      // ISO-8601 date.
      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
    },
    r: function () {
      // RFC 2822
      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
    },
    U: function () {
      // Seconds since UNIX epoch
      return jsdate / 1000 | 0;
    }
  };
  this.date = function (format, timestamp) {
    that = this;
    jsdate = (timestamp === undefined ? new Date() : // Not provided
      (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
      new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
    );
    return format.replace(formatChr, formatChrCb);
  };
  return this.date(format, timestamp);
}
;
(function ($) {
  // Convert time element value to local reader timezone
  Drupal.behaviors.localTime = {
    attach: function (context) {
      // Match time elements with both datetime and data-date-format attributes
      if ($('time[datetime][data-date-format]').length) {
        $('time[datetime][data-date-format]').once('local-time', function () {
          var $element = $(this);
          var format = false;
          // Get source date from datetime attribute
          var originalDateTime = $element.attr('datetime');
          var originalDateValue = $element.html();
          // Use as datestamp for local date generation
          var localDateTime = new Date(originalDateTime);
          // Validate date
          if(localDateTime == 'NaN') return;
          // Require format
          if ($element.attr('data-date-format')) {
            // Support for raw PHP date format string
            format = $element.attr('data-date-format');
            // Support for CMS defined date format
            if (Drupal.settings.date_formats.hasOwnProperty(format)) {
              format = Drupal.settings.date_formats[format];
            }
          }
          if (format) {
            try{
              var localDateString = date(format, localDateTime.getTime() / 1000);
              // Apply new formatted local date to element, if different
              if (localDateString != originalDateValue) {
                $element.html(localDateString);
                // Add tooltip title to show original HKT date
                $element.attr({title: 'HKT: ' + originalDateValue});
              }
            }catch(err) {
              if (typeof console == "object") {
                console.log(err.message);
              }
            }
          }
        });
      }
    }
  }

})(jQuery);
;
