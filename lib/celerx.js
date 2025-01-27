"use strict";

function binary_to_base64(e) {
    for (var t = new Uint8Array(e), r = new Array, n = 0, i = 0, a = new Array(3), o = new Array(4), s = t.length, d = 0; s--;)
        if (a[n++] = t[d++], 3 == n) {
            for (o[0] = (252 & a[0]) >> 2, o[1] = ((3 & a[0]) << 4) + ((240 & a[1]) >> 4), o[2] = ((15 & a[1]) << 2) + ((192 & a[2]) >> 6), o[3] = 63 & a[2], n = 0; n < 4; n++) r += base64_chars.charAt(o[n]);
            n = 0
        } if (n) {
        for (i = n; i < 3; i++) a[i] = 0;
        for (o[0] = (252 & a[0]) >> 2, o[1] = ((3 & a[0]) << 4) + ((240 & a[1]) >> 4), o[2] = ((15 & a[1]) << 2) + ((192 & a[2]) >> 6), o[3] = 63 & a[2], i = 0; i < n + 1; i++) r += base64_chars.charAt(o[i]);
        for (; n++ < 3;) r += "="
    }
    return r
}

function dec2hex(e) {
    for (var t = hD.substr(15 & e, 1); e > 15;) e >>= 4, t = hD.substr(15 & e, 1) + t;
    return t
}

function base64_decode(e) {
    var t, r, n, i, a, o, s, d = new Array,
        c = 0,
        l = e;
    if (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""), l != e && alert("Warning! Characters outside Base64 range in input string ignored."), e.length % 4) return alert("Error: Input length is not a multiple of 4 bytes."), "";
    for (var u = 0; c < e.length;) i = keyStr.indexOf(e.charAt(c++)), a = keyStr.indexOf(e.charAt(c++)), o = keyStr.indexOf(e.charAt(c++)), s = keyStr.indexOf(e.charAt(c++)), t = i << 2 | a >> 4, r = (15 & a) << 4 | o >> 2, n = (3 & o) << 6 | s, d[u++] = t, 64 != o && (d[u++] = r), 64 != s && (d[u++] = n);
    return d
}
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    },
    bridge = {
        default: void 0,
        call: function(e, t, r) {
            var n = "";
            if ("function" == typeof t && (r = t, t = {}), t = {
                    data: void 0 === t ? null : t
                }, "function" == typeof r) {
                var i = "dscb" + window.dscb++;
                window[i] = r, t._dscbstub = i
            }
            return t = JSON.stringify(t), window._dsbridge ? n = _dsbridge.call(e, t) : (window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")) && (n = prompt("_dsbridge=" + e, t)), JSON.parse(n || "{}").data
        },
        register: function(e, t, r) {
            r = r ? window._dsaf : window._dsf, window._dsInit || (window._dsInit = !0, setTimeout(function() {
                bridge.call("_dsb.dsinit")
            }, 0)), "object" == (void 0 === t ? "undefined" : _typeof(t)) ? r._obs[e] = t : r[e] = t
        },
        registerAsyn: function(e, t) {
            this.register(e, t, !0)
        },
        hasNativeMethod: function(e, t) {
            return this.call("_dsb.hasNativeMethod", {
                name: e,
                type: t || "all"
            })
        },
        disableJavascriptDialogBlock: function(e) {
            this.call("_dsb.disableJavascriptDialogBlock", {
                disable: !1 !== e
            })
        }
    };
! function() {
    if (!window._dsf) {
        var e, t = {
            _dsf: {
                _obs: {}
            },
            _dsaf: {
                _obs: {}
            },
            dscb: 0,
            celerx: bridge,
            close: function() {
                bridge.call("_dsb.closePage")
            },
            _handleMessageFromNative: function(e) {
                var t = JSON.parse(e.data),
                    r = {
                        id: e.callbackId,
                        complete: !0
                    },
                    n = this._dsf[e.method],
                    i = this._dsaf[e.method],
                    a = function(e, n) {
                        r.data = e.apply(n, t), bridge.call("_dsb.returnValue", r)
                    },
                    o = function(e, n) {
                        t.push(function(e, t) {
                            r.data = e, r.complete = !1 !== t, bridge.call("_dsb.returnValue", r)
                        }), e.apply(n, t)
                    };
                if (n) a(n, this._dsf);
                else if (i) o(i, this._dsaf);
                else if (n = e.method.split("."), !(2 > n.length)) {
                    e = n.pop();
                    var n = n.join("."),
                        i = this._dsf._obs,
                        i = i[n] || {},
                        s = i[e];
                    s && "function" == typeof s ? a(s, i) : (i = this._dsaf._obs, i = i[n] || {}, (s = i[e]) && "function" == typeof s && o(s, i))
                }
            }
        };
        for (e in t) window[e] = t[e];
        bridge.register("_hasJavascriptMethod", function(e, t) {
            return t = e.split("."), 2 > t.length ? !(!_dsf[t] && !_dsaf[t]) : (e = t.pop(), t = t.join("."), (t = _dsf._obs[t] || _dsaf._obs[t]) && !!t[e])
        })
    }
}();
var base64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    hD = "0123456789ABCDEF",
    keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
module.exports = {
    onStateReceived: function(e) {
        return bridge.register("onStateReceived", function(t) {
            var r = base64_decode(t);
            return e(new Uint8Array(r))
        })
    },
    onCourtModeStarted: function(e) {
        return bridge.register("onCourtModeStarted", e)
    },
    getMatch: function() {
        var e = bridge.call("getMatch", "123");
        try {
            e = JSON.parse(e)
        } catch (e) {}
        return e
    },
    showCourtModeDialog: function() {
        return bridge.call("showCourtModeDialog")
    },
    start: function() {
        return bridge.call("start")
    },
    sendState: function(e) {
        return bridge.call("sendState", binary_to_base64(e))
    },
    draw: function(e) {
        return bridge.call("draw", binary_to_base64(e))
    },
    win: function(e) {
        return bridge.call("win", binary_to_base64(e))
    },
    lose: function(e) {
        return bridge.call("lose", binary_to_base64(e))
    },
    surrender: function(e) {
        return bridge.call("surrender", binary_to_base64(e))
    },
    applyAction: function(e, t) {
        return bridge.call("applyAction", binary_to_base64(e), t)
    },
    getOnChainState: function(e) {
        return bridge.call("getOnChainState", "123", function(t) {
            var r = base64_decode(t);
            return e(new Uint8Array(r))
        })
    },
    getOnChainActionDeadline: function(e) {
        return bridge.call("getOnChainActionDeadline", "123", e)
    },
    getCurrentBlockNumber: function() {
        return bridge.call("getCurrentBlockNumber", "123")
    },
    finalizeOnChainGame: function(e) {
        return bridge.call("finalizeOnChainGame", "123", e)
    },
    submitScore: function(e) {
        return bridge.call("submitScore", e)
    }
};