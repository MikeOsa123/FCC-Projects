var globalImgServer="//u.alicdn.com";!function e(t,n,r){function i(o,u){if(!n[o]){if(!t[o]){var f="function"==typeof require&&require;if(!u&&f)return f(o,!0);if(s)return s(o,!0);throw new Error("Cannot find module '"+o+"'")}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return i(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var s="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(e,t,n){"use strict";function r(e,t){return e&&e.getAttribute?e.getAttribute(t)||"":""}function i(e){return o=o||document.getElementsByTagName("head")[0],u&&!e?u:o?u=o.getElementsByTagName("meta"):[]}function s(e){var t,n,s,o=i(),u=o.length;for(t=0;u>t;t++)n=o[t],r(n,"name")===e&&(s=r(n,"content"));return s||""}var o,u,a=e("@ali/grey-publish").util;n.tryToGetAttribute=r,n.getMetaTags=i,n.getMetaCnt=s,n.indexof=function(e,t){for(var n=0;n<e.length;n++)if(e[n]===t)return n;return-1};var f=function(e,t){return e+="",e.length<t&&(e="0"+e),e};n.getDateMin=function(){var e=new Date,t="";return t+=e.getFullYear(),t+=f(e.getMonth()+1,2),t+=f(e.getDate(),2),t+=f(e.getHours(),2),t+=f(e.getMinutes(),2)},n.isMobile=function(e){var t=/AliApp|Yunos|cyclone/i.test(e),n=/iPhone|iPad|iPod/i.test(e),r=/Android/i.test(e),i=/Windows Phone/i.test(e)||/IEMobile/i.test(e)||/WPDesktop/i.test(e),s=/BlackBerry/i.test(e),o=/Opera Mini/i.test(e);return t||n||r||i||s||o},n.loopAddScript=function(e,t){try{if(t&&t instanceof Array){var n=0,r=function(i){i&&a.addScript(e+"/"+i,function(){r(t[++n])})};r(t[n])}}catch(i){}},n.getCdnpath=function(){var e=document,t=e.getElementById("beacon-aplus")||e.getElementById("tb-beacon-aplus"),n="//g.alicdn.com",r=["//assets.alicdn.com/g","//g-assets.daily.taobao.net","//u.alicdn.com"],i=new RegExp("//u.alicdn.com");if(t)for(var s=0;s<r.length;s++){var o=new RegExp(r[s]);if(o.test(t.src)){n=r[s],i.test(t.src)&&(n="//assets.alicdn.com/g");break}}return n}},{"@ali/grey-publish":2}],2:[function(e,t,n){"use strict";n.grey=e("./src/grey"),n.util=e("./src/util")},{"./src/grey":3,"./src/util":4}],3:[function(e,t,n){"use strict";function r(e,t){return e+Math.floor(Math.random()*(t-e+1))}function i(e){var t=!1;try{var n=e.bingo_chars||"0aAbBc1CdDeE2fFgGh3HiIjJ4kKlLm5MnNoO6pPqQr7RsStT8uUvVw9WxXyY+zZ",i=f.getCookie(e.bingo_cookiename||"cna")||"";if(i){var s=i.charAt(0),o=n.indexOf(s)/n.length;t=o<=e.ratio/e.base}else t=r(1,e.base)<=e.ratio}catch(u){t=r(1,e.base)<=e.ratio}return t}function s(e,t){var n;for(n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function o(e,t){return function(n){return e(s(t,n||{}))}}function u(e){var t=window,n=document;if(e)try{var r=n.getElementsByTagName("script")[0],i=n.createElement("script");i.appendChild(n.createTextNode(e)),r.parentNode.insertBefore(i,r)}catch(s){try{(t.execScript||function(e){t.eval(e)})(e)}catch(o){}}}function a(e,t,n){try{var r=[],i=h.get(t);if(i){var s=JSON.parse(i)||[];if(s&&s.length>0)for(var o=new RegExp("^"+n),u=0;u<s.length;u++)o.test(s[u])?r.push(s[u]):h.remove(s[u])}r.push(e),h.set(t,JSON.stringify(r))}catch(a){}}var f=e("./util"),l=function(){},c=function(e){return"function"==typeof e},h={set:function(e,t){try{return localStorage.setItem(e,t),!0}catch(n){return!1}},get:function(e){return localStorage.getItem(e)},test:function(){var e="grey_test_key";try{return localStorage.setItem(e,1),localStorage.removeItem(e),!0}catch(t){return!1}},remove:function(e){localStorage.removeItem(e)}},p={base:1e4},d={_config:p},v=function(e,t){var n=window,r=n.XDomainRequest,i=n.XMLHttpRequest&&"withCredentials"in new n.XMLHttpRequest,s=t.after;if("function"!=typeof s&&(s=l),!t.isDebug&&h.test()&&(i||r)){var o=t.LS_KEY+f.hash(e),c=h.get(o);if(c)try{u(c),s({from:"local"})}catch(p){f.addScript(e,s)}else{var d=navigator.userAgent;f.request(e,d,function(e){h.set(o,e),a(o,t.LS_KEY_CLUSTER,t.LS_KEY),u(e),s({from:"cors"})},function(){f.addScript(e,s)})}}else f.addScript(e,s)};d.load=function(e){e=s({LS_KEY_CLUSTER:"",LS_KEY:"",isLoadDevVersion:l,dev:"",stable:"",grey:"",base:p.base,bingo:""},e);var t,n={},r="function"==typeof e.bingo?e.bingo:i;return e.ratio>=e.base||r(e)?(t=e.grey,n.type="grey"):(t=e.stable,n.type="stable"),c(e.isLoadDevVersion)&&e.isLoadDevVersion()&&(t=e.dev,n.type="dev"),n.url=t,c(e.before)&&e.before(n),e.after=c(e.after)?o(e.after,n):l,v(t,e),this},d.config=function(e){return s(p,e||{}),this},t.exports=d},{"./util":4}],4:[function(e,t,n){"use strict";var r=function(e,t){var n=document,r=n.getElementsByTagName("script")[0],i=n.getElementsByTagName("head")[0],s=n.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,r?r.parentNode.insertBefore(s,r):i&&i.appendChild(s),"function"==typeof t&&t({from:"script"})};n.addScript=r,n.getCookie=function(e){var t=document,n=t.cookie.match(new RegExp("(?:^|;)\\s*"+e+"=([^;]+)"));return n?n[1]:""};var i={base:1e4,timeout:1e4};n.request=function(e,t,n,r){if(/blitz/i.test(t))return void r();var s,o="GET",u=function(){s.responseText?n(s.responseText):r()},f=window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest;f?(s=new XMLHttpRequest,s.open(o,e,!0)):(s=new XDomainRequest,s.open(o,e)),s.timeout=i.timeout,s.onload=u,s.onerror=r,s.ontimeout=r,s.send()},n.hash=function(e){var t,n,r=1315423911;for(t=e.length-1;t>=0;t--)n=e.charCodeAt(t),r^=(r<<5)+n+(r>>2);return(2147483647&r).toString(16)}},{}],5:[function(e,t,n){"use strict";!function(){var t=window,n="g_aplus_grey_launched";if(!t[n]){t[n]=1;var r=t.goldlog||(t.goldlog={}),i=e("@ali/grey-publish").grey,s=!1;try{var o=location.href.match(/aplusDebug=(true|false)/);o&&o.length>0&&window.localStorage.setItem("aplusDebug",o[1]),s="true"===window.localStorage.getItem("aplusDebug")}catch(u){}var a=e("../grey/util"),f=e("./for_aplus_fns"),l={"aplus_o.js":{stable_version:{value:"7.6.17"},grey_version:{value:"7.6.18"},dev_version:{}},"aplus_std.js":{stable_version:{value:"7.6.17"},grey_version:{value:"7.6.18"},dev_version:{}},"aplus_int.js":{stable_version:{value:"7.6.17"},grey_version:{value:"7.6.18"},dev_version:{}},"aplus_wap.js":{stable_version:{value:"7.6.17"},grey_version:{value:"7.6.18"},dev_version:{}}},c="APLUS_S_CORE_0.17.3_20171114210829_",h=location.protocol;0!==h.indexOf("http")&&(h="http:");var p=a.getCdnpath();r.getCdnPath=a.getCdnpath;var d=h+p+"/alilog",v=f.getAplusVersion("aplus_std.js"),m=1e4,g=[],y={"aplus_std.js":[/^xxx\.ju\.taobao\.com/i]},b=function(){var e,t=l[v]||{},n=t.dev_version||{};if(v&&n.value){var r,i=y[v]||[];for(r=0;r<i.length;r++)if((location.hostname+location.pathname).match(i[r])){e=!0;break}}return e},w=function(){var e="";if(g&&g.length>0)for(var t=a.getDateMin(),n=0;n<g.length;n++){var r=g[n].key+"";t>=r&&(e=Math.floor(1e4*g[n].value))}return e},E=e("./utilPlugins"),S=function(e){var t,n=s?[]:E.getFrontPlugins({version:e,fn:v}),r=[["s",e,v].join("/")],i=s?[]:E.getPlugins({version:e,fn:v});try{var o=[].concat(n,r,i);t=d+"/??"+o.join(",")+"?v=20171114210829"}catch(u){t=d+"/??"+r.join(",")}return t},x=function(){var e,n="aplus_grey_ratio";"number"==typeof t[n]&&(e=Math.floor(1e4*t[n]));var r=location.search.match(new RegExp("\\b"+n+"=([\\d\\.]+)"));return r&&(r=parseFloat(r[1]),isNaN(r)||(e=Math.floor(1e4*r))),e},T=w(),N=x();T&&(m=T),N&&(m=N),r.aplus_cplugin_ver="0.2.4",r.record||(r.record=function(e,n,r,i){(t.goldlog_queue||(t.goldlog_queue=[])).push({action:"goldlog.record",arguments:[e,n,r,i]})});var C=l[v];i.load({LS_KEY_CLUSTER:"APLUS_LS_KEY",LS_KEY:c,isDebug:s,isLoadDevVersion:b,dev:S(C.dev_version.value),stable:S(C.stable_version.value),grey:S(C.grey_version.value),ratio:m,before:function(e){switch(e.type){case"grey":r.lver=C.grey_version.value;break;case"stable":r.lver=C.stable_version.value;break;case"dev":r.lver=C.dev_version.value}s&&a.loopAddScript(d,E.getFrontPlugins({version:r.lver,fn:v}))},after:function(){if(s){var e=0,t=function(){if(!(e>=100)){e++;var n=r._$||{};window.setTimeout(function(){"complete"===n.status?a.loopAddScript(d,E.getPlugins({version:r.lver,fn:v})):t()},100)}};t()}}})}}()},{"../grey/util":1,"./for_aplus_fns":6,"./utilPlugins":9,"@ali/grey-publish":2}],6:[function(e,t,n){"use strict";var r=e("./util"),i=function(){return["aplus_o.js","aplus_std.js","aplus_int.js","aplus_wap.js"]};n.getAplusFns=i;var s=function(){for(var e,t=[{version:"aplus_o.js",domains:[/^https?:\/\/(.*\.)?youku\.com/i,/^https?:\/\/(.*\.)?tudou\.com/i,/^https?:\/\/(.*\.)?soku\.com/i,/^https?:\/\/(.*\.)?laifeng\.com/i]},{version:"aplus_int.js",domains:[/^https?:\/\/(.*\.)?scmp\.com/i,/^https?:\/\/(.*\.)?luxehomes\.com\.hk/i,/^https?:\/\/(.*\.)?ays\.com\.hk/i,/^https?:\/\/(.*\.)?cpjobs\.com/i,/^https?:\/\/(.*\.)?educationpost\.com\.hk/i,/^https?:\/\/(.*\.)?elle\.com\.hk/i,/^https?:\/\/(.*\.)?harpersbazaar\.com\.hk/i,/^https?:\/\/(.*\.)?esquirehk\.com/i]}],n=0;n<t.length;n++)for(var r=t[n].domains,i=t[n].version,s=0;s<r.length;s++)if(location.href.match(r[s]))return e=i;return e},o=function(){var e=r.getMetaCnt("aplus-version");e&&(e+=".js");var t=i();return r.indexof(t,e)>-1?e:null},u=function(){try{for(var e=document,t=e.getElementsByTagName("script"),n=0;n<t.length;n++){var r=t[n].getAttribute("src");if(/alilog\/mlog\/aplus_\w+\.js/.test(r)||/alicdn\.com\/js\/aplus_\w+\.js/.test(r))return r}return""}catch(i){return""}},a=function(){var e="";try{var t=document,n=t.getElementById("beacon-aplus")||t.getElementById("tb-beacon-aplus");if(n&&(e=n.getAttribute("src")),e||(e=u()),e){var r=e.match(/aplus_\w+\.js/);"object"==typeof r&&r.length>0&&(e=r[0])}}catch(i){e=""}finally{return e}};n.getAplusVersion=function(e){var t;try{t=e;var n=a();n&&(t=n);var r=s();r&&(t=r);var u=o();u&&(t=u),i(),"aplus_v2.js"===t&&(t="aplus_std.js")}catch(f){t="aplus_std.js"}finally{return t}}},{"./util":8}],7:[function(e,t,n){"use strict";var r=(e("./util"),e("@ali/grey-publish").util,window.navigator.userAgent),i=/WindVane/i.test(r),s=/AliBaichuan/i.test(r),o=(parent!==self,function(e){return i&&!window.WindVane&&"aplus_o.js"!==e.fn}),u=function(e){return(s||i&&!window.WindVane)&&"aplus_o.js"===e.fn},a=function(e){return"aplus_o.js"===e.fn},f=function(){return/_a_ig_v=@aplus/.test(location.search)},l=function(e){return!1},c=function(e){return!1},h=function(e){return!0},p=function(e){return"aplus_o"!==e.fn},d=function(){try{var e=location.href.match(/[?|&]aplus_track_debug_id=(\w*)/);return e&&e.length>0&&window.localStorage.setItem("aplus_track_debug_id",e[1]),!!window.localStorage.getItem("aplus_track_debug_id")}catch(t){return!1}},v=function(){try{return!!/lazada/.test(location.host)}catch(e){return!1}};n.getFrontPlugins=function(e){var t="s/"+e.version+"/plugin",n=goldlog.aplus_cplugin_ver;return[{name:"aplus_windvane2",enable:o(e),path:[t,"aplus_windvane2.js"].join("/")},{name:"aplus_bcbridge",enable:u(e),path:[t,"aplus_bcbridge.js"].join("/")},{name:"aplus_client",enable:!0,path:[t,"aplus_client.js"].join("/")},{name:"aplus_cplugin_toolkit",enable:!0,path:["aplus_cplugin",n,"toolkit.js"].join("/")},{name:"aplus_cplugin_monitor",enable:!0,path:["aplus_cplugin",n,"monitor.js"].join("/")},{name:"aplus_cplugin_lsparams_p",enable:l(e),path:["aplus_cplugin",n,"lsparams_p.js"].join("/")},{name:"aplus_cplugin_lscna_p",enable:c(e),path:["aplus_cplugin",n,"lscna_p.js"].join("/")},{name:"aplus_cplugin_track_deb",enable:d(),path:["aplus_cplugin",n,"track_deb.js"].join("/")},{name:"aplus_plugin_lazada",enable:v(),path:["aplus_plugin_lazada","lazadalog.js"].join("/")}]},n.getPlugins=function(e){var t="s/"+e.version+"/plugin",n=goldlog.aplus_cplugin_ver;return[{name:"aplus_urchin2",enable:a(e),path:[t,"aplus_urchin2.js"].join("/")},{name:"aplus_plugin_guide",enable:f(e),path:"aplus_plugin_guide/index.js"},{name:"aplus_cplugin_aol",enable:h(e),path:["aplus_cplugin",n,"aol.js"].join("/")},{name:"aplus_spmact",enable:p(e),path:[t,"aplus_spmact.js"].join("/")}]}},{"./util":8,"@ali/grey-publish":2}],8:[function(e,t,n){t.exports=e(1)},{"@ali/grey-publish":2}],9:[function(e,t,n){"use strict";var r,i=e("./plugins"),s=document;try{r=s.getElementById("beacon-aplus")||s.getElementById("tb-beacon-aplus")}catch(o){}var u=function(e){var t=[];try{if(r){var n=r.getAttribute(e||t);t=n.split(",")}}catch(i){t=[]}finally{return t}},a=function(e){var t=[];if(e)for(var n=0;n<e.length;n++){var r=e[n].enable,i=e[n].path;r===!0?t.push(i):"function"==typeof r&&r()&&t.push(i)}return t};n.getPlugins=function(e){var t=i.getPlugins(e);return[].concat(a(t),u("plugins"))},n.getFrontPlugins=function(e){var t=i.getFrontPlugins(e);return[].concat(a(t),u("frontPlugins"))}},{"./plugins":7}]},{},[5]);