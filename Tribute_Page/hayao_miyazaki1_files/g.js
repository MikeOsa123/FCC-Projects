<html>
<body onload='rfiFirePixels()'>
<script type="text/javascript">

window.rfiEventHandler = function(obj, type, handler) {
    if (obj.addEventListener) {
        obj.addEventListener(type, handler, false);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + type, handler);
    }
    obj['on' + type] = handler;
};

window.rfiFirePixels = function() {
    var data = new Object();
    var timeout = 15000, collectStats = !0, statsDone = !1;
    var pixels = [{"b":13488,"s":"http://cm.g.doubleclick.net/pixel?google_nid=rfi&google_cm=&google_sc=&google_hm=NjQxMjcwMzc0Nzc5NTg5NTkw&forward="}, {"b":31937,"s":"http://tags.bluekai.com/site/4722?id=641270374779589590&redir=http%3A%2F%2Fp.rfihub.com%2Fcm%3Fbk_uuid%3D%24_BK_UUID%26forward%3D"}, {"b":51433,"s":"http://pixel.rubiconproject.com/tap.php?v=13490&nid=2596&put=641270374779589590&expires=30&next="}, {"b":54855,"s":"http://image2.pubmatic.com/AdServer/Pug?vcode=bz0yJnR5cGU9MSZjb2RlPTI3MzkmdGw9MTU3NjgwMA==&piggybackCookie=641270374779589590&r="}, {"b":55507,"s":"http://ckm-m.xp1.ru4.com/cx?_i=57753720&_u=641270374779589590&redirect="}, {"b":52220,"s":"http://dsum.casalemedia.com/rum?cm_dsp_id=57&external_user_id=641270374779589590&forward="}, {"b":40977,"s":"http://ads.yahoo.com/cms/v1?esig=1~84c296ca4cae9f73fbcc48363a3cd4cd34be98f5&nwid=10000648372&sigv=1"}, {"b":42261,"s":"http://us-u.openx.net/w/1.0/sd?id=537073062&val=641270374779589590&r="}, {"b":50495,"s":"http://e.nexac.com/e/rocketfuel_sync.xgi?na_exid=641270374779589590"}, {"b":53707,"s":"http://sync.search.spotxchange.com/partner?adv_id=7180&uid=641270374779589590&img=1"}, {"b":54645,"s":"http://tapestry.tapad.com/tapestry/1?ta_partner_id=937&ta_partner_did=641270374779589590&ta_format=gif"}, {"b":56607,"s":"http://cs.gssprt.jp/yie/ld/cs?dspid=rocket&uid=641270374779589590"}, {"b":56659,"s":"http://x.bidswitch.net/sync?dsp_id=119&user_id=641270374779589590&expires=30"}, {"b":57363,"s":"http://sync-tm.everesttech.net/upi/pid/Mlpt2JaG/?redir=http%3A%2F%2Fp.rfihub.com%2Fcm%3Fin%3D1%26pub%3D21653%26userid%3D%24%7BTM_USER_ID%7D"}, {"b":57419,"s":"http://trc.taboola.com/sg/rocketfuel-network/1/rtb-h/?taboola_hm=641270374779589590"}, {"b":57795,"s":"http://mid.rkdms.com/bct?pid=b151435b-9c0e-4361-9268-647f8ff9b20c&puid=641270374779589590&_ct=img"}];
    var fbPixels = [
        
    ];
    var additionalHtml = "";
    var pixelId = 2039;
    var debugInfo = null;
    var total = additionalHtml !== "" ? 1 : 0;
    var timer = null;
    pixels = pixels || [];
    pixels = pixels.concat(fbPixels);
    data.id = "383,2039,821962f58c6ba6ef156313ebc85e5fb6";
    data.saveUuid = !1;

    var sendMsg = function(type, data) {
        var msg = new Object();
        msg.type = type;
        msg.id = pixelId;
        if (data != null) {
            msg.data = data;
        }
        window.parent.postMessage(msg, '*');
    };

    if (debugInfo != null) {
        var inIframe = (function() {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        })();

        if (!inIframe) {
            console.log(JSON.stringify(debugInfo));
        } else {
            sendMsg(3, debugInfo);
        }
    }

    if (additionalHtml !== "") {
        var d = document.createElement("div");
        d.id = "rfiAddH";
        d.innerHTML = additionalHtml;
        document.body.appendChild(d);
    }

    if (collectStats) {
        data.stats = new Object();
        for (i in pixels) {
            data.stats[pixels[i].b] = "";
        }
    }

    var recordTime = function(elem, type) {
        if (collectStats) {
            data.stats[elem.elemId] = (new Date().getTime() - elem.initTime) + "," + type;
        }
        total--;
        if (total <= 0) {
            sendStats();
            sendMsg(1, data);
            timer && clearTimeout(timer);
        }
    };

    for (i in pixels) {
        var img = document.createElement('IMG');
        img.onload = function() {
            recordTime(this, 1);
        };
        img.onerror = function() {
            recordTime(this, 2);
        };
        img.onabort = function() {
            recordTime(this, 3);
        };
        img.elemId = pixels[i].b;
        img.src = pixels[i].s;
        var t = new Date().getTime();
        img.initTime = t;
        document.body.appendChild(img);
        total++;
    }

    var sendStats = function() {
        sendMsg(2, data);
    };

    timer = setTimeout(function() {
        sendStats();
        sendMsg(1, data);
        timer = null;
    }, timeout);

    var unloadEventHandler = function(event) {
        if (collectStats && !statsDone) {
            sendStats();
            statsDone = !0;
        }
    };

    rfiEventHandler(window, "unload", unloadEventHandler);
    rfiEventHandler(window, "beforeunload", unloadEventHandler);
};
</script>
</body>
</html>
