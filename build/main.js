Project: https://github.com/marc0l92/obsidian-jira-issue
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/colorsys/colorsys.js
var require_colorsys = __commonJS({
  "node_modules/colorsys/colorsys.js"(exports, module2) {
    var RGB_MAX = 255;
    var HUE_MAX = 360;
    var SV_MAX = 100;
    var colorsys2 = module2.exports = {};
    colorsys2.rgb2Hsl = function(r, g, b) {
      if (typeof r === "object") {
        const args = r;
        r = args.r;
        g = args.g;
        b = args.b;
      }
      r = r === RGB_MAX ? 1 : r % RGB_MAX / parseFloat(RGB_MAX);
      g = g === RGB_MAX ? 1 : g % RGB_MAX / parseFloat(RGB_MAX);
      b = b === RGB_MAX ? 1 : b % RGB_MAX / parseFloat(RGB_MAX);
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return {
        h: Math.round(h * HUE_MAX),
        s: Math.round(s * SV_MAX),
        l: Math.round(l * SV_MAX)
      };
    };
    colorsys2.rgb_to_hsl = colorsys2.rgbToHsl = colorsys2.rgb2Hsl;
    colorsys2.rgb2Hsv = function(r, g, b) {
      if (typeof r === "object") {
        const args = r;
        r = args.r;
        g = args.g;
        b = args.b;
      }
      r = r === RGB_MAX ? 1 : r % RGB_MAX / parseFloat(RGB_MAX);
      g = g === RGB_MAX ? 1 : g % RGB_MAX / parseFloat(RGB_MAX);
      b = b === RGB_MAX ? 1 : b % RGB_MAX / parseFloat(RGB_MAX);
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h, s, v = max;
      var d = max - min;
      s = max === 0 ? 0 : d / max;
      if (max === min) {
        h = 0;
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return {
        h: Math.round(h * HUE_MAX),
        s: Math.round(s * SV_MAX),
        v: Math.round(v * SV_MAX)
      };
    };
    colorsys2.rgb_to_hsv = colorsys2.rgbToHsv = colorsys2.rgb2Hsv;
    colorsys2.hsl2Rgb = function(h, s, l) {
      if (typeof h === "object") {
        const args = h;
        h = args.h;
        s = args.s;
        l = args.l;
      }
      var r, g, b;
      h = _normalizeAngle(h);
      h = h === HUE_MAX ? 1 : h % HUE_MAX / parseFloat(HUE_MAX);
      s = s === SV_MAX ? 1 : s % SV_MAX / parseFloat(SV_MAX);
      l = l === SV_MAX ? 1 : l % SV_MAX / parseFloat(SV_MAX);
      if (s === 0) {
        r = g = b = l;
      } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = _hue2Rgb(p, q, h + 1 / 3);
        g = _hue2Rgb(p, q, h);
        b = _hue2Rgb(p, q, h - 1 / 3);
      }
      return {
        r: Math.round(r * RGB_MAX),
        g: Math.round(g * RGB_MAX),
        b: Math.round(b * RGB_MAX)
      };
    };
    colorsys2.hsl_to_rgb = colorsys2.hslToRgb = colorsys2.hsl2Rgb;
    colorsys2.hsv2Rgb = function(h, s, v) {
      if (typeof h === "object") {
        const args = h;
        h = args.h;
        s = args.s;
        v = args.v;
      }
      h = _normalizeAngle(h);
      h = h === HUE_MAX ? 1 : h % HUE_MAX / parseFloat(HUE_MAX) * 6;
      s = s === SV_MAX ? 1 : s % SV_MAX / parseFloat(SV_MAX);
      v = v === SV_MAX ? 1 : v % SV_MAX / parseFloat(SV_MAX);
      var i = Math.floor(h);
      var f = h - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);
      var mod = i % 6;
      var r = [v, q, p, p, t, v][mod];
      var g = [t, v, v, q, p, p][mod];
      var b = [p, p, t, v, v, q][mod];
      return {
        r: Math.floor(r * RGB_MAX),
        g: Math.floor(g * RGB_MAX),
        b: Math.floor(b * RGB_MAX)
      };
    };
    colorsys2.hsv_to_rgb = colorsys2.hsv2Rgb;
    colorsys2.hsvToRgb = colorsys2.hsv2Rgb;
    colorsys2.rgb2Hex = function(r, g, b) {
      if (typeof r === "object") {
        const args = r;
        r = args.r;
        g = args.g;
        b = args.b;
      }
      r = Math.round(r).toString(16);
      g = Math.round(g).toString(16);
      b = Math.round(b).toString(16);
      r = r.length === 1 ? "0" + r : r;
      g = g.length === 1 ? "0" + g : g;
      b = b.length === 1 ? "0" + b : b;
      return "#" + r + g + b;
    };
    colorsys2.rgb_to_hex = colorsys2.rgbToHex = colorsys2.rgb2Hex;
    colorsys2.hex2Rgb = function(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };
    colorsys2.hex_to_rgb = colorsys2.hexToRgb = colorsys2.hex2Rgb;
    colorsys2.hsv2Hex = function(h, s, v) {
      var rgb = colorsys2.hsv2Rgb(h, s, v);
      return colorsys2.rgb2Hex(rgb.r, rgb.g, rgb.b);
    };
    colorsys2.hsv_to_hex = colorsys2.hsv2Hex;
    colorsys2.hsvToHex = colorsys2.hsv2Hex;
    colorsys2.hex2Hsv = function(hex) {
      var rgb = colorsys2.hex2Rgb(hex);
      return colorsys2.rgb2Hsv(rgb.r, rgb.g, rgb.b);
    };
    colorsys2.hex_to_hsv = colorsys2.hexToHsv = colorsys2.hex2Hsv;
    colorsys2.hsl2Hex = function(h, s, l) {
      var rgb = colorsys2.hsl2Rgb(h, s, l);
      return colorsys2.rgb2Hex(rgb.r, rgb.g, rgb.b);
    };
    colorsys2.hsl_to_hex = colorsys2.hslToHex = colorsys2.hsl2Hex;
    colorsys2.hex2Hsl = function(hex) {
      var rgb = colorsys2.hex2Rgb(hex);
      return colorsys2.rgb2Hsl(rgb.r, rgb.g, rgb.b);
    };
    colorsys2.hex_to_hsl = colorsys2.hexToHsl = colorsys2.hex2Hsl;
    colorsys2.rgb2Cmyk = function(r, g, b) {
      if (typeof r === "object") {
        const args = r;
        r = args.r;
        g = args.g;
        b = args.b;
      }
      var rprim = r / 255;
      var gprim = g / 255;
      var bprim = b / 255;
      var k = 1 - Math.max(rprim, gprim, bprim);
      var c = (1 - rprim - k) / (1 - k);
      var m = (1 - gprim - k) / (1 - k);
      var y = (1 - bprim - k) / (1 - k);
      return {
        c: c.toFixed(3),
        m: m.toFixed(3),
        y: y.toFixed(3),
        k: k.toFixed(3)
      };
    };
    colorsys2.rgb_to_cmyk = colorsys2.rgbToCmyk = colorsys2.rgb2Cmyk;
    colorsys2.cmyk2Rgb = function(c, m, y, k) {
      if (typeof c === "object") {
        const args = c;
        c = args.c;
        m = args.m;
        y = args.y;
        k = args.k;
      }
      var r = 255 * (1 - c) * (1 - k);
      var g = 255 * (1 - m) * (1 - k);
      var b = 255 * (1 - y) * (1 - k);
      return {
        r: Math.floor(r),
        g: Math.floor(g),
        b: Math.floor(b)
      };
    };
    colorsys2.cmyk_to_rgb = colorsys2.cmykToRgb = colorsys2.cmyk2Rgb;
    colorsys2.hsv2Hsl = function(h, s, v) {
      if (typeof h === "object") {
        const args = h;
        h = args.h;
        s = args.s;
        v = args.v;
      }
      var l = (2 - s) * v / 2;
      if (l !== 0) {
        if (l === SV_MAX) {
          s = 0;
        } else if (l < SV_MAX / 2) {
          s = s * v / (l * 2);
        } else {
          s = s * v / (2 - l * 2);
        }
      }
      return { h, s, l };
    };
    colorsys2.hsv_to_hsl = colorsys2.hsvToHsl = colorsys2.hsv2Hsl;
    colorsys2.hsl2Hsv = function(h, s, l) {
      if (typeof h === "object") {
        const args = h;
        h = args.h;
        s = args.s;
        l = args.l;
      }
      s = s * (l < 50 ? l : 100 - l);
      return {
        h,
        s: Math.floor(2 * s / (l + s)),
        v: Math.floor(l + s)
      };
    };
    colorsys2.hsl_to_hsv = colorsys2.hslToHsv = colorsys2.hsl2Hsv;
    colorsys2.parseCss = function(cssString) {
      if (cssString.indexOf("#") > -1) {
        return colorsys2.hex2Rgb(cssString);
      }
      const prefix = cssString.split("(")[0];
      const args = cssString.split("(")[1].split(")")[0].split(",");
      return prefix.split("").reduce(function(color, param, idx) {
        const nextColor = color;
        nextColor[param] = parseFloat(args[idx]);
        return nextColor;
      }, {});
    };
    colorsys2.parse_css = colorsys2.parseCss;
    colorsys2.stringify = function(obj) {
      const prefix = Object.keys(obj).join("");
      const values = Object.keys(obj).map(function(key) {
        var val = obj[key];
        if (key === "s" || key === "v" || key === "l") {
          val = val + "%";
        }
        return val;
      });
      return prefix + "(" + values.join(", ") + ")";
    };
    colorsys2.hex_to_decimal = colorsys2.hexToDecimal = colorsys2.hex2Decimal;
    colorsys2.hex2Decimal = function(hexColor) {
      if (typeof hexColor === "string") {
        return parseInt(hexColor.replace("#", ""), 16);
      }
    };
    colorsys2.decimal_to_hex = colorsys2.decimalToHex = colorsys2.decimal2Hex;
    colorsys2.decimal2Hex = function(decimalColor) {
      if (typeof decimalColor === "string") {
        return "#" + parseInt(decimalColor).toString(16);
      }
      return "#" + decimalColor.toString(16);
    };
    colorsys2.random = function() {
      const base = "000000";
      const number = Math.floor(Math.random() * 16777215).toString(16);
      return "#" + (base + number).substr(-6);
    };
    colorsys2.rotateHue = function(hue, amount) {
      if (amount === void 0) {
        amount = 0;
      }
      const aux = typeof hue === "object" ? (hue.h + amount) % 360 : (hue + amount) % 360;
      const nextHue = aux < 0 ? 360 + aux : aux;
      return typeof hue === "object" ? Object.assign(hue, { h: nextHue }) : nextHue;
    };
    colorsys2.getColorEncoding = function(color) {
      if (typeof color === "string") {
        try {
          colorsys2.hex2Rgb(color);
          return "hex";
        } catch (err) {
        }
      }
      if (typeof color !== "object") {
        return "unknown";
      }
      const c = color;
      if (c.r + c.g + c.b && typeof (c.r + c.g + c.b) === "number") {
        return "rgb";
      }
      if (c.h + c.s + c.v && typeof (c.h + c.s + c.v) === "number") {
        return "hsv";
      }
      if (c.h + c.s + c.l && typeof (c.h + c.s + c.l) === "number") {
        return "hsl";
      }
      if (c.c + c.m + c.y + c.k && typeof (c.c + c.m + c.y + c.k) === "number") {
        return "cmyk";
      }
      return "unknown";
    };
    function _normalizeAngle(degrees) {
      return (degrees % 360 + 360) % 360;
    }
    function _hue2Rgb(p, q, t) {
      if (t < 0)
        t += 1;
      if (t > 1)
        t -= 1;
      if (t < 1 / 6)
        return p + (q - p) * 6 * t;
      if (t < 1 / 2)
        return q;
      if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }
    colorsys2.any2Hsl = function(color) {
      const colorEncoding = colorsys2.getColorEncoding(color);
      switch (colorEncoding) {
        case "hsl":
          return color;
        case "rgb":
          return colorsys2.rgb2Hsl(color);
        case "hex":
          return colorsys2.hex2Hsl(color);
        case "hsv":
          return colorsys2.hsv2Hsl(color);
        case "cmyk":
          return colorsys2.rgb2Hsl(colorsys2.cmyk2Rgb(color));
        default:
          return "unknown";
      }
    };
    colorsys2.any_to_hsl = colorsys2.anyToHsl = colorsys2.any2Hsl;
    colorsys2.getTransformEncodingFunction = function(color, desiredEncoding) {
      const originalEncoding = colorsys2.getColorEncoding(color);
      return colorsys2[originalEncoding + "_to_" + desiredEncoding];
    };
    colorsys2.darken = function(color, percentage) {
      const encoding = colorsys2.getColorEncoding(color);
      if (encoding === "unknown") {
        return color;
      }
      if (encoding === "cmyk") {
        const nextCmyk = color;
        nextCmyk.k = Math.min(100, 100 * percentage + nextCmyk.k);
        return nextCmyk;
      }
      const hsl = colorsys2.any2Hsl(color);
      const nextHsl = { h: hsl.h, s: hsl.s, l: Math.round(hsl.l * (1 - percentage)) };
      const transformFn = encoding === "hsl" ? (c) => c : colorsys2.getTransformEncodingFunction(nextHsl, encoding);
      if (typeof transformFn !== "function") {
        return color;
      }
      return transformFn(nextHsl);
    };
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms4) {
      var msAbs = Math.abs(ms4);
      if (msAbs >= d) {
        return Math.round(ms4 / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms4 / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms4 / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms4 / s) + "s";
      }
      return ms4 + "ms";
    }
    function fmtLong(ms4) {
      var msAbs = Math.abs(ms4);
      if (msAbs >= d) {
        return plural(ms4, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms4, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms4, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms4, msAbs, s, "second");
      }
      return ms4 + " ms";
    }
    function plural(ms4, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms4 / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/moment/moment.js
var require_moment = __commonJS({
  "node_modules/moment/moment.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.moment = factory();
    })(exports, function() {
      "use strict";
      var hookCallback;
      function hooks() {
        return hookCallback.apply(null, arguments);
      }
      function setHookCallback(callback) {
        hookCallback = callback;
      }
      function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
      }
      function isObject2(input) {
        return input != null && Object.prototype.toString.call(input) === "[object Object]";
      }
      function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      }
      function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
          return Object.getOwnPropertyNames(obj).length === 0;
        } else {
          var k;
          for (k in obj) {
            if (hasOwnProp(obj, k)) {
              return false;
            }
          }
          return true;
        }
      }
      function isUndefined(input) {
        return input === void 0;
      }
      function isNumber(input) {
        return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
      }
      function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
      }
      function map(arr, fn) {
        var res = [], i, arrLen = arr.length;
        for (i = 0; i < arrLen; ++i) {
          res.push(fn(arr[i], i));
        }
        return res;
      }
      function extend(a, b) {
        for (var i in b) {
          if (hasOwnProp(b, i)) {
            a[i] = b[i];
          }
        }
        if (hasOwnProp(b, "toString")) {
          a.toString = b.toString;
        }
        if (hasOwnProp(b, "valueOf")) {
          a.valueOf = b.valueOf;
        }
        return a;
      }
      function createUTC(input, format2, locale2, strict) {
        return createLocalOrUTC(input, format2, locale2, strict, true).utc();
      }
      function defaultParsingFlags() {
        return {
          empty: false,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: false,
          invalidEra: null,
          invalidMonth: null,
          invalidFormat: false,
          userInvalidated: false,
          iso: false,
          parsedDateParts: [],
          era: null,
          meridiem: null,
          rfc2822: false,
          weekdayMismatch: false
        };
      }
      function getParsingFlags(m) {
        if (m._pf == null) {
          m._pf = defaultParsingFlags();
        }
        return m._pf;
      }
      var some;
      if (Array.prototype.some) {
        some = Array.prototype.some;
      } else {
        some = function(fun) {
          var t = Object(this), len = t.length >>> 0, i;
          for (i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
              return true;
            }
          }
          return false;
        };
      }
      function isValid(m) {
        var flags = null, parsedParts = false, isNowValid = m._d && !isNaN(m._d.getTime());
        if (isNowValid) {
          flags = getParsingFlags(m);
          parsedParts = some.call(flags.parsedDateParts, function(i) {
            return i != null;
          });
          isNowValid = flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
          if (m._strict) {
            isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
          }
        }
        if (Object.isFrozen == null || !Object.isFrozen(m)) {
          m._isValid = isNowValid;
        } else {
          return isNowValid;
        }
        return m._isValid;
      }
      function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
          extend(getParsingFlags(m), flags);
        } else {
          getParsingFlags(m).userInvalidated = true;
        }
        return m;
      }
      var momentProperties = hooks.momentProperties = [], updateInProgress = false;
      function copyConfig(to2, from2) {
        var i, prop, val, momentPropertiesLen = momentProperties.length;
        if (!isUndefined(from2._isAMomentObject)) {
          to2._isAMomentObject = from2._isAMomentObject;
        }
        if (!isUndefined(from2._i)) {
          to2._i = from2._i;
        }
        if (!isUndefined(from2._f)) {
          to2._f = from2._f;
        }
        if (!isUndefined(from2._l)) {
          to2._l = from2._l;
        }
        if (!isUndefined(from2._strict)) {
          to2._strict = from2._strict;
        }
        if (!isUndefined(from2._tzm)) {
          to2._tzm = from2._tzm;
        }
        if (!isUndefined(from2._isUTC)) {
          to2._isUTC = from2._isUTC;
        }
        if (!isUndefined(from2._offset)) {
          to2._offset = from2._offset;
        }
        if (!isUndefined(from2._pf)) {
          to2._pf = getParsingFlags(from2);
        }
        if (!isUndefined(from2._locale)) {
          to2._locale = from2._locale;
        }
        if (momentPropertiesLen > 0) {
          for (i = 0; i < momentPropertiesLen; i++) {
            prop = momentProperties[i];
            val = from2[prop];
            if (!isUndefined(val)) {
              to2[prop] = val;
            }
          }
        }
        return to2;
      }
      function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
          this._d = new Date(NaN);
        }
        if (updateInProgress === false) {
          updateInProgress = true;
          hooks.updateOffset(this);
          updateInProgress = false;
        }
      }
      function isMoment(obj) {
        return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
      }
      function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
          console.warn("Deprecation warning: " + msg);
        }
      }
      function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function() {
          if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
          }
          if (firstTime) {
            var args = [], arg, i, key, argLen = arguments.length;
            for (i = 0; i < argLen; i++) {
              arg = "";
              if (typeof arguments[i] === "object") {
                arg += "\n[" + i + "] ";
                for (key in arguments[0]) {
                  if (hasOwnProp(arguments[0], key)) {
                    arg += key + ": " + arguments[0][key] + ", ";
                  }
                }
                arg = arg.slice(0, -2);
              } else {
                arg = arguments[i];
              }
              args.push(arg);
            }
            warn(
              msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
            );
            firstTime = false;
          }
          return fn.apply(this, arguments);
        }, fn);
      }
      var deprecations = {};
      function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
          hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
          warn(msg);
          deprecations[name] = true;
        }
      }
      hooks.suppressDeprecationWarnings = false;
      hooks.deprecationHandler = null;
      function isFunction(input) {
        return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
      }
      function set(config) {
        var prop, i;
        for (i in config) {
          if (hasOwnProp(config, i)) {
            prop = config[i];
            if (isFunction(prop)) {
              this[i] = prop;
            } else {
              this["_" + i] = prop;
            }
          }
        }
        this._config = config;
        this._dayOfMonthOrdinalParseLenient = new RegExp(
          (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
        );
      }
      function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
          if (hasOwnProp(childConfig, prop)) {
            if (isObject2(parentConfig[prop]) && isObject2(childConfig[prop])) {
              res[prop] = {};
              extend(res[prop], parentConfig[prop]);
              extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
              res[prop] = childConfig[prop];
            } else {
              delete res[prop];
            }
          }
        }
        for (prop in parentConfig) {
          if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject2(parentConfig[prop])) {
            res[prop] = extend({}, res[prop]);
          }
        }
        return res;
      }
      function Locale(config) {
        if (config != null) {
          this.set(config);
        }
      }
      var keys;
      if (Object.keys) {
        keys = Object.keys;
      } else {
        keys = function(obj) {
          var i, res = [];
          for (i in obj) {
            if (hasOwnProp(obj, i)) {
              res.push(i);
            }
          }
          return res;
        };
      }
      var defaultCalendar = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
      };
      function calendar(key, mom, now2) {
        var output = this._calendar[key] || this._calendar["sameElse"];
        return isFunction(output) ? output.call(mom, now2) : output;
      }
      function zeroFill(number, targetLength, forceSign) {
        var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
        return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
      }
      var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
      function addFormatToken(token2, padded, ordinal2, callback) {
        var func = callback;
        if (typeof callback === "string") {
          func = function() {
            return this[callback]();
          };
        }
        if (token2) {
          formatTokenFunctions[token2] = func;
        }
        if (padded) {
          formatTokenFunctions[padded[0]] = function() {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
          };
        }
        if (ordinal2) {
          formatTokenFunctions[ordinal2] = function() {
            return this.localeData().ordinal(
              func.apply(this, arguments),
              token2
            );
          };
        }
      }
      function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
          return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
      }
      function makeFormatFunction(format2) {
        var array = format2.match(formattingTokens), i, length;
        for (i = 0, length = array.length; i < length; i++) {
          if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
          } else {
            array[i] = removeFormattingTokens(array[i]);
          }
        }
        return function(mom) {
          var output = "", i2;
          for (i2 = 0; i2 < length; i2++) {
            output += isFunction(array[i2]) ? array[i2].call(mom, format2) : array[i2];
          }
          return output;
        };
      }
      function formatMoment(m, format2) {
        if (!m.isValid()) {
          return m.localeData().invalidDate();
        }
        format2 = expandFormat(format2, m.localeData());
        formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
        return formatFunctions[format2](m);
      }
      function expandFormat(format2, locale2) {
        var i = 5;
        function replaceLongDateFormatTokens(input) {
          return locale2.longDateFormat(input) || input;
        }
        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format2)) {
          format2 = format2.replace(
            localFormattingTokens,
            replaceLongDateFormatTokens
          );
          localFormattingTokens.lastIndex = 0;
          i -= 1;
        }
        return format2;
      }
      var defaultLongDateFormat = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
      };
      function longDateFormat(key) {
        var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
        if (format2 || !formatUpper) {
          return format2;
        }
        this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
          if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
            return tok.slice(1);
          }
          return tok;
        }).join("");
        return this._longDateFormat[key];
      }
      var defaultInvalidDate = "Invalid date";
      function invalidDate() {
        return this._invalidDate;
      }
      var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
      function ordinal(number) {
        return this._ordinal.replace("%d", number);
      }
      var defaultRelativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        w: "a week",
        ww: "%d weeks",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      };
      function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
      }
      function pastFuture(diff2, output) {
        var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
        return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
      }
      var aliases = {
        D: "date",
        dates: "date",
        date: "date",
        d: "day",
        days: "day",
        day: "day",
        e: "weekday",
        weekdays: "weekday",
        weekday: "weekday",
        E: "isoWeekday",
        isoweekdays: "isoWeekday",
        isoweekday: "isoWeekday",
        DDD: "dayOfYear",
        dayofyears: "dayOfYear",
        dayofyear: "dayOfYear",
        h: "hour",
        hours: "hour",
        hour: "hour",
        ms: "millisecond",
        milliseconds: "millisecond",
        millisecond: "millisecond",
        m: "minute",
        minutes: "minute",
        minute: "minute",
        M: "month",
        months: "month",
        month: "month",
        Q: "quarter",
        quarters: "quarter",
        quarter: "quarter",
        s: "second",
        seconds: "second",
        second: "second",
        gg: "weekYear",
        weekyears: "weekYear",
        weekyear: "weekYear",
        GG: "isoWeekYear",
        isoweekyears: "isoWeekYear",
        isoweekyear: "isoWeekYear",
        w: "week",
        weeks: "week",
        week: "week",
        W: "isoWeek",
        isoweeks: "isoWeek",
        isoweek: "isoWeek",
        y: "year",
        years: "year",
        year: "year"
      };
      function normalizeUnits(units) {
        return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
      }
      function normalizeObjectUnits(inputObject) {
        var normalizedInput = {}, normalizedProp, prop;
        for (prop in inputObject) {
          if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
              normalizedInput[normalizedProp] = inputObject[prop];
            }
          }
        }
        return normalizedInput;
      }
      var priorities = {
        date: 9,
        day: 11,
        weekday: 11,
        isoWeekday: 11,
        dayOfYear: 4,
        hour: 13,
        millisecond: 16,
        minute: 14,
        month: 8,
        quarter: 7,
        second: 15,
        weekYear: 1,
        isoWeekYear: 1,
        week: 5,
        isoWeek: 5,
        year: 1
      };
      function getPrioritizedUnits(unitsObj) {
        var units = [], u;
        for (u in unitsObj) {
          if (hasOwnProp(unitsObj, u)) {
            units.push({ unit: u, priority: priorities[u] });
          }
        }
        units.sort(function(a, b) {
          return a.priority - b.priority;
        });
        return units;
      }
      var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, match1to2NoLeadingZero = /^[1-9]\d?/, match1to2HasZero = /^([1-9]\d|\d)/, regexes;
      regexes = {};
      function addRegexToken(token2, regex, strictRegex) {
        regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
          return isStrict && strictRegex ? strictRegex : regex;
        };
      }
      function getParseRegexForToken(token2, config) {
        if (!hasOwnProp(regexes, token2)) {
          return new RegExp(unescapeFormat(token2));
        }
        return regexes[token2](config._strict, config._locale);
      }
      function unescapeFormat(s) {
        return regexEscape(
          s.replace("\\", "").replace(
            /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
            function(matched, p1, p2, p3, p4) {
              return p1 || p2 || p3 || p4;
            }
          )
        );
      }
      function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      function absFloor(number) {
        if (number < 0) {
          return Math.ceil(number) || 0;
        } else {
          return Math.floor(number);
        }
      }
      function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
          value = absFloor(coercedNumber);
        }
        return value;
      }
      var tokens = {};
      function addParseToken(token2, callback) {
        var i, func = callback, tokenLen;
        if (typeof token2 === "string") {
          token2 = [token2];
        }
        if (isNumber(callback)) {
          func = function(input, array) {
            array[callback] = toInt(input);
          };
        }
        tokenLen = token2.length;
        for (i = 0; i < tokenLen; i++) {
          tokens[token2[i]] = func;
        }
      }
      function addWeekParseToken(token2, callback) {
        addParseToken(token2, function(input, array, config, token3) {
          config._w = config._w || {};
          callback(input, config._w, config, token3);
        });
      }
      function addTimeToArrayFromToken(token2, input, config) {
        if (input != null && hasOwnProp(tokens, token2)) {
          tokens[token2](input, config._a, config, token2);
        }
      }
      function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
      var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
      addFormatToken("Y", 0, 0, function() {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : "+" + y;
      });
      addFormatToken(0, ["YY", 2], 0, function() {
        return this.year() % 100;
      });
      addFormatToken(0, ["YYYY", 4], 0, "year");
      addFormatToken(0, ["YYYYY", 5], 0, "year");
      addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
      addRegexToken("Y", matchSigned);
      addRegexToken("YY", match1to2, match2);
      addRegexToken("YYYY", match1to4, match4);
      addRegexToken("YYYYY", match1to6, match6);
      addRegexToken("YYYYYY", match1to6, match6);
      addParseToken(["YYYYY", "YYYYYY"], YEAR);
      addParseToken("YYYY", function(input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
      });
      addParseToken("YY", function(input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
      });
      addParseToken("Y", function(input, array) {
        array[YEAR] = parseInt(input, 10);
      });
      function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
      }
      hooks.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
      };
      var getSetYear = makeGetSet("FullYear", true);
      function getIsLeapYear() {
        return isLeapYear(this.year());
      }
      function makeGetSet(unit, keepTime) {
        return function(value) {
          if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
          } else {
            return get(this, unit);
          }
        };
      }
      function get(mom, unit) {
        if (!mom.isValid()) {
          return NaN;
        }
        var d = mom._d, isUTC = mom._isUTC;
        switch (unit) {
          case "Milliseconds":
            return isUTC ? d.getUTCMilliseconds() : d.getMilliseconds();
          case "Seconds":
            return isUTC ? d.getUTCSeconds() : d.getSeconds();
          case "Minutes":
            return isUTC ? d.getUTCMinutes() : d.getMinutes();
          case "Hours":
            return isUTC ? d.getUTCHours() : d.getHours();
          case "Date":
            return isUTC ? d.getUTCDate() : d.getDate();
          case "Day":
            return isUTC ? d.getUTCDay() : d.getDay();
          case "Month":
            return isUTC ? d.getUTCMonth() : d.getMonth();
          case "FullYear":
            return isUTC ? d.getUTCFullYear() : d.getFullYear();
          default:
            return NaN;
        }
      }
      function set$1(mom, unit, value) {
        var d, isUTC, year, month, date;
        if (!mom.isValid() || isNaN(value)) {
          return;
        }
        d = mom._d;
        isUTC = mom._isUTC;
        switch (unit) {
          case "Milliseconds":
            return void (isUTC ? d.setUTCMilliseconds(value) : d.setMilliseconds(value));
          case "Seconds":
            return void (isUTC ? d.setUTCSeconds(value) : d.setSeconds(value));
          case "Minutes":
            return void (isUTC ? d.setUTCMinutes(value) : d.setMinutes(value));
          case "Hours":
            return void (isUTC ? d.setUTCHours(value) : d.setHours(value));
          case "Date":
            return void (isUTC ? d.setUTCDate(value) : d.setDate(value));
          case "FullYear":
            break;
          default:
            return;
        }
        year = value;
        month = mom.month();
        date = mom.date();
        date = date === 29 && month === 1 && !isLeapYear(year) ? 28 : date;
        void (isUTC ? d.setUTCFullYear(year, month, date) : d.setFullYear(year, month, date));
      }
      function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
          return this[units]();
        }
        return this;
      }
      function stringSet(units, value) {
        if (typeof units === "object") {
          units = normalizeObjectUnits(units);
          var prioritized = getPrioritizedUnits(units), i, prioritizedLen = prioritized.length;
          for (i = 0; i < prioritizedLen; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
          }
        } else {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
            return this[units](value);
          }
        }
        return this;
      }
      function mod(n, x) {
        return (n % x + x) % x;
      }
      var indexOf;
      if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
      } else {
        indexOf = function(o) {
          var i;
          for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
              return i;
            }
          }
          return -1;
        };
      }
      function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
          return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
      }
      addFormatToken("M", ["MM", 2], "Mo", function() {
        return this.month() + 1;
      });
      addFormatToken("MMM", 0, 0, function(format2) {
        return this.localeData().monthsShort(this, format2);
      });
      addFormatToken("MMMM", 0, 0, function(format2) {
        return this.localeData().months(this, format2);
      });
      addRegexToken("M", match1to2, match1to2NoLeadingZero);
      addRegexToken("MM", match1to2, match2);
      addRegexToken("MMM", function(isStrict, locale2) {
        return locale2.monthsShortRegex(isStrict);
      });
      addRegexToken("MMMM", function(isStrict, locale2) {
        return locale2.monthsRegex(isStrict);
      });
      addParseToken(["M", "MM"], function(input, array) {
        array[MONTH] = toInt(input) - 1;
      });
      addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
        var month = config._locale.monthsParse(input, token2, config._strict);
        if (month != null) {
          array[MONTH] = month;
        } else {
          getParsingFlags(config).invalidMonth = input;
        }
      });
      var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
        "_"
      ), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
      function localeMonths(m, format2) {
        if (!m) {
          return isArray(this._months) ? this._months : this._months["standalone"];
        }
        return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
      }
      function localeMonthsShort(m, format2) {
        if (!m) {
          return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
      }
      function handleStrictParse(monthName, format2, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
          for (i = 0; i < 12; ++i) {
            mom = createUTC([2e3, i]);
            this._shortMonthsParse[i] = this.monthsShort(
              mom,
              ""
            ).toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
          }
        }
        if (strict) {
          if (format2 === "MMM") {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
          }
        } else {
          if (format2 === "MMM") {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
          }
        }
      }
      function localeMonthsParse(monthName, format2, strict) {
        var i, mom, regex;
        if (this._monthsParseExact) {
          return handleStrictParse.call(this, monthName, format2, strict);
        }
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
        }
        for (i = 0; i < 12; i++) {
          mom = createUTC([2e3, i]);
          if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp(
              "^" + this.months(mom, "").replace(".", "") + "$",
              "i"
            );
            this._shortMonthsParse[i] = new RegExp(
              "^" + this.monthsShort(mom, "").replace(".", "") + "$",
              "i"
            );
          }
          if (!strict && !this._monthsParse[i]) {
            regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
            this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
          }
          if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
            return i;
          } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
            return i;
          } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
          }
        }
      }
      function setMonth(mom, value) {
        if (!mom.isValid()) {
          return mom;
        }
        if (typeof value === "string") {
          if (/^\d+$/.test(value)) {
            value = toInt(value);
          } else {
            value = mom.localeData().monthsParse(value);
            if (!isNumber(value)) {
              return mom;
            }
          }
        }
        var month = value, date = mom.date();
        date = date < 29 ? date : Math.min(date, daysInMonth(mom.year(), month));
        void (mom._isUTC ? mom._d.setUTCMonth(month, date) : mom._d.setMonth(month, date));
        return mom;
      }
      function getSetMonth(value) {
        if (value != null) {
          setMonth(this, value);
          hooks.updateOffset(this, true);
          return this;
        } else {
          return get(this, "Month");
        }
      }
      function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
      }
      function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
          if (!hasOwnProp(this, "_monthsRegex")) {
            computeMonthsParse.call(this);
          }
          if (isStrict) {
            return this._monthsShortStrictRegex;
          } else {
            return this._monthsShortRegex;
          }
        } else {
          if (!hasOwnProp(this, "_monthsShortRegex")) {
            this._monthsShortRegex = defaultMonthsShortRegex;
          }
          return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
        }
      }
      function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
          if (!hasOwnProp(this, "_monthsRegex")) {
            computeMonthsParse.call(this);
          }
          if (isStrict) {
            return this._monthsStrictRegex;
          } else {
            return this._monthsRegex;
          }
        } else {
          if (!hasOwnProp(this, "_monthsRegex")) {
            this._monthsRegex = defaultMonthsRegex;
          }
          return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
        }
      }
      function computeMonthsParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }
        var shortPieces = [], longPieces = [], mixedPieces = [], i, mom, shortP, longP;
        for (i = 0; i < 12; i++) {
          mom = createUTC([2e3, i]);
          shortP = regexEscape(this.monthsShort(mom, ""));
          longP = regexEscape(this.months(mom, ""));
          shortPieces.push(shortP);
          longPieces.push(longP);
          mixedPieces.push(longP);
          mixedPieces.push(shortP);
        }
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
          "^(" + longPieces.join("|") + ")",
          "i"
        );
        this._monthsShortStrictRegex = new RegExp(
          "^(" + shortPieces.join("|") + ")",
          "i"
        );
      }
      function createDate(y, m, d, h, M, s, ms4) {
        var date;
        if (y < 100 && y >= 0) {
          date = new Date(y + 400, m, d, h, M, s, ms4);
          if (isFinite(date.getFullYear())) {
            date.setFullYear(y);
          }
        } else {
          date = new Date(y, m, d, h, M, s, ms4);
        }
        return date;
      }
      function createUTCDate(y) {
        var date, args;
        if (y < 100 && y >= 0) {
          args = Array.prototype.slice.call(arguments);
          args[0] = y + 400;
          date = new Date(Date.UTC.apply(null, args));
          if (isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
          }
        } else {
          date = new Date(Date.UTC.apply(null, arguments));
        }
        return date;
      }
      function firstWeekOffset(year, dow, doy) {
        var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
        return -fwdlw + fwd - 1;
      }
      function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
        if (dayOfYear <= 0) {
          resYear = year - 1;
          resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
          resYear = year + 1;
          resDayOfYear = dayOfYear - daysInYear(year);
        } else {
          resYear = year;
          resDayOfYear = dayOfYear;
        }
        return {
          year: resYear,
          dayOfYear: resDayOfYear
        };
      }
      function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
        if (week < 1) {
          resYear = mom.year() - 1;
          resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
          resWeek = week - weeksInYear(mom.year(), dow, doy);
          resYear = mom.year() + 1;
        } else {
          resYear = mom.year();
          resWeek = week;
        }
        return {
          week: resWeek,
          year: resYear
        };
      }
      function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
      }
      addFormatToken("w", ["ww", 2], "wo", "week");
      addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
      addRegexToken("w", match1to2, match1to2NoLeadingZero);
      addRegexToken("ww", match1to2, match2);
      addRegexToken("W", match1to2, match1to2NoLeadingZero);
      addRegexToken("WW", match1to2, match2);
      addWeekParseToken(
        ["w", "ww", "W", "WW"],
        function(input, week, config, token2) {
          week[token2.substr(0, 1)] = toInt(input);
        }
      );
      function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
      }
      var defaultLocaleWeek = {
        dow: 0,
        doy: 6
      };
      function localeFirstDayOfWeek() {
        return this._week.dow;
      }
      function localeFirstDayOfYear() {
        return this._week.doy;
      }
      function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, "d");
      }
      function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, "d");
      }
      addFormatToken("d", 0, "do", "day");
      addFormatToken("dd", 0, 0, function(format2) {
        return this.localeData().weekdaysMin(this, format2);
      });
      addFormatToken("ddd", 0, 0, function(format2) {
        return this.localeData().weekdaysShort(this, format2);
      });
      addFormatToken("dddd", 0, 0, function(format2) {
        return this.localeData().weekdays(this, format2);
      });
      addFormatToken("e", 0, 0, "weekday");
      addFormatToken("E", 0, 0, "isoWeekday");
      addRegexToken("d", match1to2);
      addRegexToken("e", match1to2);
      addRegexToken("E", match1to2);
      addRegexToken("dd", function(isStrict, locale2) {
        return locale2.weekdaysMinRegex(isStrict);
      });
      addRegexToken("ddd", function(isStrict, locale2) {
        return locale2.weekdaysShortRegex(isStrict);
      });
      addRegexToken("dddd", function(isStrict, locale2) {
        return locale2.weekdaysRegex(isStrict);
      });
      addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
        var weekday = config._locale.weekdaysParse(input, token2, config._strict);
        if (weekday != null) {
          week.d = weekday;
        } else {
          getParsingFlags(config).invalidWeekday = input;
        }
      });
      addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
        week[token2] = toInt(input);
      });
      function parseWeekday(input, locale2) {
        if (typeof input !== "string") {
          return input;
        }
        if (!isNaN(input)) {
          return parseInt(input, 10);
        }
        input = locale2.weekdaysParse(input);
        if (typeof input === "number") {
          return input;
        }
        return null;
      }
      function parseIsoWeekday(input, locale2) {
        if (typeof input === "string") {
          return locale2.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
      }
      function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
      }
      var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
      function localeWeekdays(m, format2) {
        var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
        return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
      }
      function localeWeekdaysShort(m) {
        return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
      }
      function localeWeekdaysMin(m) {
        return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
      }
      function handleStrictParse$1(weekdayName, format2, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._minWeekdaysParse = [];
          for (i = 0; i < 7; ++i) {
            mom = createUTC([2e3, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(
              mom,
              ""
            ).toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(
              mom,
              ""
            ).toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
          }
        }
        if (strict) {
          if (format2 === "dddd") {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else if (format2 === "ddd") {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          }
        } else {
          if (format2 === "dddd") {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else if (format2 === "ddd") {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          }
        }
      }
      function localeWeekdaysParse(weekdayName, format2, strict) {
        var i, mom, regex;
        if (this._weekdaysParseExact) {
          return handleStrictParse$1.call(this, weekdayName, format2, strict);
        }
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._minWeekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._fullWeekdaysParse = [];
        }
        for (i = 0; i < 7; i++) {
          mom = createUTC([2e3, 1]).day(i);
          if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp(
              "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
              "i"
            );
            this._shortWeekdaysParse[i] = new RegExp(
              "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
              "i"
            );
            this._minWeekdaysParse[i] = new RegExp(
              "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
              "i"
            );
          }
          if (!this._weekdaysParse[i]) {
            regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
            this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
          }
          if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
          }
        }
      }
      function getSetDayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        var day = get(this, "Day");
        if (input != null) {
          input = parseWeekday(input, this.localeData());
          return this.add(input - day, "d");
        } else {
          return day;
        }
      }
      function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, "d");
      }
      function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        if (input != null) {
          var weekday = parseIsoWeekday(input, this.localeData());
          return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
          return this.day() || 7;
        }
      }
      function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysStrictRegex;
          } else {
            return this._weekdaysRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            this._weekdaysRegex = defaultWeekdaysRegex;
          }
          return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
        }
      }
      function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysShortStrictRegex;
          } else {
            return this._weekdaysShortRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysShortRegex")) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
          }
          return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
      }
      function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysMinStrictRegex;
          } else {
            return this._weekdaysMinRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysMinRegex")) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
          }
          return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
      }
      function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }
        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
          mom = createUTC([2e3, 1]).day(i);
          minp = regexEscape(this.weekdaysMin(mom, ""));
          shortp = regexEscape(this.weekdaysShort(mom, ""));
          longp = regexEscape(this.weekdays(mom, ""));
          minPieces.push(minp);
          shortPieces.push(shortp);
          longPieces.push(longp);
          mixedPieces.push(minp);
          mixedPieces.push(shortp);
          mixedPieces.push(longp);
        }
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;
        this._weekdaysStrictRegex = new RegExp(
          "^(" + longPieces.join("|") + ")",
          "i"
        );
        this._weekdaysShortStrictRegex = new RegExp(
          "^(" + shortPieces.join("|") + ")",
          "i"
        );
        this._weekdaysMinStrictRegex = new RegExp(
          "^(" + minPieces.join("|") + ")",
          "i"
        );
      }
      function hFormat() {
        return this.hours() % 12 || 12;
      }
      function kFormat() {
        return this.hours() || 24;
      }
      addFormatToken("H", ["HH", 2], 0, "hour");
      addFormatToken("h", ["hh", 2], 0, hFormat);
      addFormatToken("k", ["kk", 2], 0, kFormat);
      addFormatToken("hmm", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
      });
      addFormatToken("hmmss", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });
      addFormatToken("Hmm", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2);
      });
      addFormatToken("Hmmss", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });
      function meridiem(token2, lowercase) {
        addFormatToken(token2, 0, 0, function() {
          return this.localeData().meridiem(
            this.hours(),
            this.minutes(),
            lowercase
          );
        });
      }
      meridiem("a", true);
      meridiem("A", false);
      function matchMeridiem(isStrict, locale2) {
        return locale2._meridiemParse;
      }
      addRegexToken("a", matchMeridiem);
      addRegexToken("A", matchMeridiem);
      addRegexToken("H", match1to2, match1to2HasZero);
      addRegexToken("h", match1to2, match1to2NoLeadingZero);
      addRegexToken("k", match1to2, match1to2NoLeadingZero);
      addRegexToken("HH", match1to2, match2);
      addRegexToken("hh", match1to2, match2);
      addRegexToken("kk", match1to2, match2);
      addRegexToken("hmm", match3to4);
      addRegexToken("hmmss", match5to6);
      addRegexToken("Hmm", match3to4);
      addRegexToken("Hmmss", match5to6);
      addParseToken(["H", "HH"], HOUR);
      addParseToken(["k", "kk"], function(input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
      });
      addParseToken(["a", "A"], function(input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
      });
      addParseToken(["h", "hh"], function(input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("Hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
      });
      addParseToken("Hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
      });
      function localeIsPM(input) {
        return (input + "").toLowerCase().charAt(0) === "p";
      }
      var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
      function localeMeridiem(hours2, minutes2, isLower) {
        if (hours2 > 11) {
          return isLower ? "pm" : "PM";
        } else {
          return isLower ? "am" : "AM";
        }
      }
      var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,
        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,
        week: defaultLocaleWeek,
        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,
        meridiemParse: defaultLocaleMeridiemParse
      };
      var locales = {}, localeFamilies = {}, globalLocale;
      function commonPrefix(arr1, arr2) {
        var i, minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
          if (arr1[i] !== arr2[i]) {
            return i;
          }
        }
        return minl;
      }
      function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key;
      }
      function chooseLocale(names) {
        var i = 0, j, next, locale2, split;
        while (i < names.length) {
          split = normalizeLocale(names[i]).split("-");
          j = split.length;
          next = normalizeLocale(names[i + 1]);
          next = next ? next.split("-") : null;
          while (j > 0) {
            locale2 = loadLocale(split.slice(0, j).join("-"));
            if (locale2) {
              return locale2;
            }
            if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
              break;
            }
            j--;
          }
          i++;
        }
        return globalLocale;
      }
      function isLocaleNameSane(name) {
        return !!(name && name.match("^[^/\\\\]*$"));
      }
      function loadLocale(name) {
        var oldLocale = null, aliasedRequire;
        if (locales[name] === void 0 && typeof module2 !== "undefined" && module2 && module2.exports && isLocaleNameSane(name)) {
          try {
            oldLocale = globalLocale._abbr;
            aliasedRequire = require;
            aliasedRequire("./locale/" + name);
            getSetGlobalLocale(oldLocale);
          } catch (e) {
            locales[name] = null;
          }
        }
        return locales[name];
      }
      function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
          if (isUndefined(values)) {
            data = getLocale(key);
          } else {
            data = defineLocale(key, values);
          }
          if (data) {
            globalLocale = data;
          } else {
            if (typeof console !== "undefined" && console.warn) {
              console.warn(
                "Locale " + key + " not found. Did you forget to load it?"
              );
            }
          }
        }
        return globalLocale._abbr;
      }
      function defineLocale(name, config) {
        if (config !== null) {
          var locale2, parentConfig = baseConfig;
          config.abbr = name;
          if (locales[name] != null) {
            deprecateSimple(
              "defineLocaleOverride",
              "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
            );
            parentConfig = locales[name]._config;
          } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
              parentConfig = locales[config.parentLocale]._config;
            } else {
              locale2 = loadLocale(config.parentLocale);
              if (locale2 != null) {
                parentConfig = locale2._config;
              } else {
                if (!localeFamilies[config.parentLocale]) {
                  localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                  name,
                  config
                });
                return null;
              }
            }
          }
          locales[name] = new Locale(mergeConfigs(parentConfig, config));
          if (localeFamilies[name]) {
            localeFamilies[name].forEach(function(x) {
              defineLocale(x.name, x.config);
            });
          }
          getSetGlobalLocale(name);
          return locales[name];
        } else {
          delete locales[name];
          return null;
        }
      }
      function updateLocale(name, config) {
        if (config != null) {
          var locale2, tmpLocale, parentConfig = baseConfig;
          if (locales[name] != null && locales[name].parentLocale != null) {
            locales[name].set(mergeConfigs(locales[name]._config, config));
          } else {
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
              parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            if (tmpLocale == null) {
              config.abbr = name;
            }
            locale2 = new Locale(config);
            locale2.parentLocale = locales[name];
            locales[name] = locale2;
          }
          getSetGlobalLocale(name);
        } else {
          if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
              locales[name] = locales[name].parentLocale;
              if (name === getSetGlobalLocale()) {
                getSetGlobalLocale(name);
              }
            } else if (locales[name] != null) {
              delete locales[name];
            }
          }
        }
        return locales[name];
      }
      function getLocale(key) {
        var locale2;
        if (key && key._locale && key._locale._abbr) {
          key = key._locale._abbr;
        }
        if (!key) {
          return globalLocale;
        }
        if (!isArray(key)) {
          locale2 = loadLocale(key);
          if (locale2) {
            return locale2;
          }
          key = [key];
        }
        return chooseLocale(key);
      }
      function listLocales() {
        return keys(locales);
      }
      function checkOverflow(m) {
        var overflow, a = m._a;
        if (a && getParsingFlags(m).overflow === -2) {
          overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
          if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
          }
          if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
          }
          if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
          }
          getParsingFlags(m).overflow = overflow;
        }
        return m;
      }
      var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
        ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
        ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
        ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
        ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
        ["YYYY-DDD", /\d{4}-\d{3}/],
        ["YYYY-MM", /\d{4}-\d\d/, false],
        ["YYYYYYMMDD", /[+-]\d{10}/],
        ["YYYYMMDD", /\d{8}/],
        ["GGGG[W]WWE", /\d{4}W\d{3}/],
        ["GGGG[W]WW", /\d{4}W\d{2}/, false],
        ["YYYYDDD", /\d{7}/],
        ["YYYYMM", /\d{6}/, false],
        ["YYYY", /\d{4}/, false]
      ], isoTimes = [
        ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
        ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
        ["HH:mm:ss", /\d\d:\d\d:\d\d/],
        ["HH:mm", /\d\d:\d\d/],
        ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
        ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
        ["HHmmss", /\d\d\d\d\d\d/],
        ["HHmm", /\d\d\d\d/],
        ["HH", /\d\d/]
      ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
      };
      function configFromISO(config) {
        var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
        if (match) {
          getParsingFlags(config).iso = true;
          for (i = 0, l = isoDatesLen; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
              dateFormat = isoDates[i][0];
              allowTime = isoDates[i][2] !== false;
              break;
            }
          }
          if (dateFormat == null) {
            config._isValid = false;
            return;
          }
          if (match[3]) {
            for (i = 0, l = isoTimesLen; i < l; i++) {
              if (isoTimes[i][1].exec(match[3])) {
                timeFormat = (match[2] || " ") + isoTimes[i][0];
                break;
              }
            }
            if (timeFormat == null) {
              config._isValid = false;
              return;
            }
          }
          if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
          }
          if (match[4]) {
            if (tzRegex.exec(match[4])) {
              tzFormat = "Z";
            } else {
              config._isValid = false;
              return;
            }
          }
          config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
          configFromStringAndFormat(config);
        } else {
          config._isValid = false;
        }
      }
      function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
          untruncateYear(yearStr),
          defaultLocaleMonthsShort.indexOf(monthStr),
          parseInt(dayStr, 10),
          parseInt(hourStr, 10),
          parseInt(minuteStr, 10)
        ];
        if (secondStr) {
          result.push(parseInt(secondStr, 10));
        }
        return result;
      }
      function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
          return 2e3 + year;
        } else if (year <= 999) {
          return 1900 + year;
        }
        return year;
      }
      function preprocessRFC2822(s) {
        return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
      }
      function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
          var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
            parsedInput[0],
            parsedInput[1],
            parsedInput[2]
          ).getDay();
          if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
          }
        }
        return true;
      }
      function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
          return obsOffsets[obsOffset];
        } else if (militaryOffset) {
          return 0;
        } else {
          var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
          return h * 60 + m;
        }
      }
      function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
        if (match) {
          parsedArray = extractFromRFC2822Strings(
            match[4],
            match[3],
            match[2],
            match[5],
            match[6],
            match[7]
          );
          if (!checkWeekday(match[1], parsedArray, config)) {
            return;
          }
          config._a = parsedArray;
          config._tzm = calculateOffset(match[8], match[9], match[10]);
          config._d = createUTCDate.apply(null, config._a);
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          getParsingFlags(config).rfc2822 = true;
        } else {
          config._isValid = false;
        }
      }
      function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
          config._d = new Date(+matched[1]);
          return;
        }
        configFromISO(config);
        if (config._isValid === false) {
          delete config._isValid;
        } else {
          return;
        }
        configFromRFC2822(config);
        if (config._isValid === false) {
          delete config._isValid;
        } else {
          return;
        }
        if (config._strict) {
          config._isValid = false;
        } else {
          hooks.createFromInputFallback(config);
        }
      }
      hooks.createFromInputFallback = deprecate(
        "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
        function(config) {
          config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
        }
      );
      function defaults(a, b, c) {
        if (a != null) {
          return a;
        }
        if (b != null) {
          return b;
        }
        return c;
      }
      function currentDateArray(config) {
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
          return [
            nowValue.getUTCFullYear(),
            nowValue.getUTCMonth(),
            nowValue.getUTCDate()
          ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
      }
      function configFromArray(config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;
        if (config._d) {
          return;
        }
        currentDate = currentDateArray(config);
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
          dayOfYearFromWeekInfo(config);
        }
        if (config._dayOfYear != null) {
          yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
          if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
          }
          date = createUTCDate(yearToUse, 0, config._dayOfYear);
          config._a[MONTH] = date.getUTCMonth();
          config._a[DATE] = date.getUTCDate();
        }
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
          config._a[i] = input[i] = currentDate[i];
        }
        for (; i < 7; i++) {
          config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
        }
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
          config._nextDay = true;
          config._a[HOUR] = 0;
        }
        config._d = (config._useUTC ? createUTCDate : createDate).apply(
          null,
          input
        );
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
        if (config._tzm != null) {
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }
        if (config._nextDay) {
          config._a[HOUR] = 24;
        }
        if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
          getParsingFlags(config).weekdayMismatch = true;
        }
      }
      function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
          dow = 1;
          doy = 4;
          weekYear = defaults(
            w.GG,
            config._a[YEAR],
            weekOfYear(createLocal(), 1, 4).year
          );
          week = defaults(w.W, 1);
          weekday = defaults(w.E, 1);
          if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
          }
        } else {
          dow = config._locale._week.dow;
          doy = config._locale._week.doy;
          curWeek = weekOfYear(createLocal(), dow, doy);
          weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
          week = defaults(w.w, curWeek.week);
          if (w.d != null) {
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
              weekdayOverflow = true;
            }
          } else if (w.e != null) {
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
              weekdayOverflow = true;
            }
          } else {
            weekday = dow;
          }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
          getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
          getParsingFlags(config)._overflowWeekday = true;
        } else {
          temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
          config._a[YEAR] = temp.year;
          config._dayOfYear = temp.dayOfYear;
        }
      }
      hooks.ISO_8601 = function() {
      };
      hooks.RFC_2822 = function() {
      };
      function configFromStringAndFormat(config) {
        if (config._f === hooks.ISO_8601) {
          configFromISO(config);
          return;
        }
        if (config._f === hooks.RFC_2822) {
          configFromRFC2822(config);
          return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;
        var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
        tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
        tokenLen = tokens2.length;
        for (i = 0; i < tokenLen; i++) {
          token2 = tokens2[i];
          parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
          if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
              getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(
              string.indexOf(parsedInput) + parsedInput.length
            );
            totalParsedInputLength += parsedInput.length;
          }
          if (formatTokenFunctions[token2]) {
            if (parsedInput) {
              getParsingFlags(config).empty = false;
            } else {
              getParsingFlags(config).unusedTokens.push(token2);
            }
            addTimeToArrayFromToken(token2, parsedInput, config);
          } else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token2);
          }
        }
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
          getParsingFlags(config).unusedInput.push(string);
        }
        if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
          getParsingFlags(config).bigHour = void 0;
        }
        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        config._a[HOUR] = meridiemFixWrap(
          config._locale,
          config._a[HOUR],
          config._meridiem
        );
        era = getParsingFlags(config).era;
        if (era !== null) {
          config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }
        configFromArray(config);
        checkOverflow(config);
      }
      function meridiemFixWrap(locale2, hour, meridiem2) {
        var isPm;
        if (meridiem2 == null) {
          return hour;
        }
        if (locale2.meridiemHour != null) {
          return locale2.meridiemHour(hour, meridiem2);
        } else if (locale2.isPM != null) {
          isPm = locale2.isPM(meridiem2);
          if (isPm && hour < 12) {
            hour += 12;
          }
          if (!isPm && hour === 12) {
            hour = 0;
          }
          return hour;
        } else {
          return hour;
        }
      }
      function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
        if (configfLen === 0) {
          getParsingFlags(config).invalidFormat = true;
          config._d = new Date(NaN);
          return;
        }
        for (i = 0; i < configfLen; i++) {
          currentScore = 0;
          validFormatFound = false;
          tempConfig = copyConfig({}, config);
          if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
          }
          tempConfig._f = config._f[i];
          configFromStringAndFormat(tempConfig);
          if (isValid(tempConfig)) {
            validFormatFound = true;
          }
          currentScore += getParsingFlags(tempConfig).charsLeftOver;
          currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
          getParsingFlags(tempConfig).score = currentScore;
          if (!bestFormatIsValid) {
            if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
              if (validFormatFound) {
                bestFormatIsValid = true;
              }
            }
          } else {
            if (currentScore < scoreToBeat) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
            }
          }
        }
        extend(config, bestMoment || tempConfig);
      }
      function configFromObject(config) {
        if (config._d) {
          return;
        }
        var i = normalizeObjectUnits(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
        config._a = map(
          [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
          function(obj) {
            return obj && parseInt(obj, 10);
          }
        );
        configFromArray(config);
      }
      function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
          res.add(1, "d");
          res._nextDay = void 0;
        }
        return res;
      }
      function prepareConfig(config) {
        var input = config._i, format2 = config._f;
        config._locale = config._locale || getLocale(config._l);
        if (input === null || format2 === void 0 && input === "") {
          return createInvalid({ nullInput: true });
        }
        if (typeof input === "string") {
          config._i = input = config._locale.preparse(input);
        }
        if (isMoment(input)) {
          return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
          config._d = input;
        } else if (isArray(format2)) {
          configFromStringAndArray(config);
        } else if (format2) {
          configFromStringAndFormat(config);
        } else {
          configFromInput(config);
        }
        if (!isValid(config)) {
          config._d = null;
        }
        return config;
      }
      function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
          config._d = new Date(hooks.now());
        } else if (isDate(input)) {
          config._d = new Date(input.valueOf());
        } else if (typeof input === "string") {
          configFromString(config);
        } else if (isArray(input)) {
          config._a = map(input.slice(0), function(obj) {
            return parseInt(obj, 10);
          });
          configFromArray(config);
        } else if (isObject2(input)) {
          configFromObject(config);
        } else if (isNumber(input)) {
          config._d = new Date(input);
        } else {
          hooks.createFromInputFallback(config);
        }
      }
      function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
        var c = {};
        if (format2 === true || format2 === false) {
          strict = format2;
          format2 = void 0;
        }
        if (locale2 === true || locale2 === false) {
          strict = locale2;
          locale2 = void 0;
        }
        if (isObject2(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
          input = void 0;
        }
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale2;
        c._i = input;
        c._f = format2;
        c._strict = strict;
        return createFromConfig(c);
      }
      function createLocal(input, format2, locale2, strict) {
        return createLocalOrUTC(input, format2, locale2, strict, false);
      }
      var prototypeMin = deprecate(
        "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
        function() {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
          } else {
            return createInvalid();
          }
        }
      ), prototypeMax = deprecate(
        "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
        function() {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
          } else {
            return createInvalid();
          }
        }
      );
      function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
          moments = moments[0];
        }
        if (!moments.length) {
          return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
          if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
          }
        }
        return res;
      }
      function min() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args);
      }
      function max() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args);
      }
      var now = function() {
        return Date.now ? Date.now() : +new Date();
      };
      var ordering = [
        "year",
        "quarter",
        "month",
        "week",
        "day",
        "hour",
        "minute",
        "second",
        "millisecond"
      ];
      function isDurationValid(m) {
        var key, unitHasDecimal = false, i, orderLen = ordering.length;
        for (key in m) {
          if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
          }
        }
        for (i = 0; i < orderLen; ++i) {
          if (m[ordering[i]]) {
            if (unitHasDecimal) {
              return false;
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
              unitHasDecimal = true;
            }
          }
        }
        return true;
      }
      function isValid$1() {
        return this._isValid;
      }
      function createInvalid$1() {
        return createDuration(NaN);
      }
      function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
        this._isValid = isDurationValid(normalizedInput);
        this._milliseconds = +milliseconds2 + seconds2 * 1e3 + minutes2 * 6e4 + hours2 * 1e3 * 60 * 60;
        this._days = +days2 + weeks2 * 7;
        this._months = +months2 + quarters * 3 + years2 * 12;
        this._data = {};
        this._locale = getLocale();
        this._bubble();
      }
      function isDuration(obj) {
        return obj instanceof Duration;
      }
      function absRound(number) {
        if (number < 0) {
          return Math.round(-1 * number) * -1;
        } else {
          return Math.round(number);
        }
      }
      function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
        for (i = 0; i < len; i++) {
          if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
            diffs++;
          }
        }
        return diffs + lengthDiff;
      }
      function offset(token2, separator) {
        addFormatToken(token2, 0, 0, function() {
          var offset2 = this.utcOffset(), sign2 = "+";
          if (offset2 < 0) {
            offset2 = -offset2;
            sign2 = "-";
          }
          return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
        });
      }
      offset("Z", ":");
      offset("ZZ", "");
      addRegexToken("Z", matchShortOffset);
      addRegexToken("ZZ", matchShortOffset);
      addParseToken(["Z", "ZZ"], function(input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
      });
      var chunkOffset = /([\+\-]|\d\d)/gi;
      function offsetFromString(matcher, string) {
        var matches = (string || "").match(matcher), chunk, parts, minutes2;
        if (matches === null) {
          return null;
        }
        chunk = matches[matches.length - 1] || [];
        parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
        minutes2 = +(parts[1] * 60) + toInt(parts[2]);
        return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
      }
      function cloneWithOffset(input, model) {
        var res, diff2;
        if (model._isUTC) {
          res = model.clone();
          diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
          res._d.setTime(res._d.valueOf() + diff2);
          hooks.updateOffset(res, false);
          return res;
        } else {
          return createLocal(input).local();
        }
      }
      function getDateOffset(m) {
        return -Math.round(m._d.getTimezoneOffset());
      }
      hooks.updateOffset = function() {
      };
      function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset2 = this._offset || 0, localAdjust;
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        if (input != null) {
          if (typeof input === "string") {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
              return this;
            }
          } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
          }
          if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
          }
          this._offset = input;
          this._isUTC = true;
          if (localAdjust != null) {
            this.add(localAdjust, "m");
          }
          if (offset2 !== input) {
            if (!keepLocalTime || this._changeInProgress) {
              addSubtract(
                this,
                createDuration(input - offset2, "m"),
                1,
                false
              );
            } else if (!this._changeInProgress) {
              this._changeInProgress = true;
              hooks.updateOffset(this, true);
              this._changeInProgress = null;
            }
          }
          return this;
        } else {
          return this._isUTC ? offset2 : getDateOffset(this);
        }
      }
      function getSetZone(input, keepLocalTime) {
        if (input != null) {
          if (typeof input !== "string") {
            input = -input;
          }
          this.utcOffset(input, keepLocalTime);
          return this;
        } else {
          return -this.utcOffset();
        }
      }
      function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
      }
      function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
          this.utcOffset(0, keepLocalTime);
          this._isUTC = false;
          if (keepLocalTime) {
            this.subtract(getDateOffset(this), "m");
          }
        }
        return this;
      }
      function setOffsetToParsedOffset() {
        if (this._tzm != null) {
          this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === "string") {
          var tZone = offsetFromString(matchOffset, this._i);
          if (tZone != null) {
            this.utcOffset(tZone);
          } else {
            this.utcOffset(0, true);
          }
        }
        return this;
      }
      function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
          return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;
        return (this.utcOffset() - input) % 60 === 0;
      }
      function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
      }
      function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
          return this._isDSTShifted;
        }
        var c = {}, other;
        copyConfig(c, this);
        c = prepareConfig(c);
        if (c._a) {
          other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
          this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
          this._isDSTShifted = false;
        }
        return this._isDSTShifted;
      }
      function isLocal() {
        return this.isValid() ? !this._isUTC : false;
      }
      function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
      }
      function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
      }
      var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
      function createDuration(input, key) {
        var duration = input, match = null, sign2, ret, diffRes;
        if (isDuration(input)) {
          duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
          };
        } else if (isNumber(input) || !isNaN(+input)) {
          duration = {};
          if (key) {
            duration[key] = +input;
          } else {
            duration.milliseconds = +input;
          }
        } else if (match = aspNetRegex.exec(input)) {
          sign2 = match[1] === "-" ? -1 : 1;
          duration = {
            y: 0,
            d: toInt(match[DATE]) * sign2,
            h: toInt(match[HOUR]) * sign2,
            m: toInt(match[MINUTE]) * sign2,
            s: toInt(match[SECOND]) * sign2,
            ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
          };
        } else if (match = isoRegex.exec(input)) {
          sign2 = match[1] === "-" ? -1 : 1;
          duration = {
            y: parseIso(match[2], sign2),
            M: parseIso(match[3], sign2),
            w: parseIso(match[4], sign2),
            d: parseIso(match[5], sign2),
            h: parseIso(match[6], sign2),
            m: parseIso(match[7], sign2),
            s: parseIso(match[8], sign2)
          };
        } else if (duration == null) {
          duration = {};
        } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
          diffRes = momentsDifference(
            createLocal(duration.from),
            createLocal(duration.to)
          );
          duration = {};
          duration.ms = diffRes.milliseconds;
          duration.M = diffRes.months;
        }
        ret = new Duration(duration);
        if (isDuration(input) && hasOwnProp(input, "_locale")) {
          ret._locale = input._locale;
        }
        if (isDuration(input) && hasOwnProp(input, "_isValid")) {
          ret._isValid = input._isValid;
        }
        return ret;
      }
      createDuration.fn = Duration.prototype;
      createDuration.invalid = createInvalid$1;
      function parseIso(inp, sign2) {
        var res = inp && parseFloat(inp.replace(",", "."));
        return (isNaN(res) ? 0 : res) * sign2;
      }
      function positiveMomentsDifference(base, other) {
        var res = {};
        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, "M").isAfter(other)) {
          --res.months;
        }
        res.milliseconds = +other - +base.clone().add(res.months, "M");
        return res;
      }
      function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
          return { milliseconds: 0, months: 0 };
        }
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
          res = positiveMomentsDifference(base, other);
        } else {
          res = positiveMomentsDifference(other, base);
          res.milliseconds = -res.milliseconds;
          res.months = -res.months;
        }
        return res;
      }
      function createAdder(direction, name) {
        return function(val, period) {
          var dur, tmp;
          if (period !== null && !isNaN(+period)) {
            deprecateSimple(
              name,
              "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
            );
            tmp = val;
            val = period;
            period = tmp;
          }
          dur = createDuration(val, period);
          addSubtract(this, dur, direction);
          return this;
        };
      }
      function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
        if (!mom.isValid()) {
          return;
        }
        updateOffset = updateOffset == null ? true : updateOffset;
        if (months2) {
          setMonth(mom, get(mom, "Month") + months2 * isAdding);
        }
        if (days2) {
          set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
        }
        if (milliseconds2) {
          mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
        }
        if (updateOffset) {
          hooks.updateOffset(mom, days2 || months2);
        }
      }
      var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
      function isString(input) {
        return typeof input === "string" || input instanceof String;
      }
      function isMomentInput(input) {
        return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
      }
      function isMomentInputObject(input) {
        var objectTest = isObject2(input) && !isObjectEmpty(input), propertyTest = false, properties = [
          "years",
          "year",
          "y",
          "months",
          "month",
          "M",
          "days",
          "day",
          "d",
          "dates",
          "date",
          "D",
          "hours",
          "hour",
          "h",
          "minutes",
          "minute",
          "m",
          "seconds",
          "second",
          "s",
          "milliseconds",
          "millisecond",
          "ms"
        ], i, property, propertyLen = properties.length;
        for (i = 0; i < propertyLen; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
      }
      function isNumberOrStringArray(input) {
        var arrayTest = isArray(input), dataTypeTest = false;
        if (arrayTest) {
          dataTypeTest = input.filter(function(item) {
            return !isNumber(item) && isString(input);
          }).length === 0;
        }
        return arrayTest && dataTypeTest;
      }
      function isCalendarSpec(input) {
        var objectTest = isObject2(input) && !isObjectEmpty(input), propertyTest = false, properties = [
          "sameDay",
          "nextDay",
          "lastDay",
          "nextWeek",
          "lastWeek",
          "sameElse"
        ], i, property;
        for (i = 0; i < properties.length; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
      }
      function getCalendarFormat(myMoment, now2) {
        var diff2 = myMoment.diff(now2, "days", true);
        return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
      }
      function calendar$1(time, formats) {
        if (arguments.length === 1) {
          if (!arguments[0]) {
            time = void 0;
            formats = void 0;
          } else if (isMomentInput(arguments[0])) {
            time = arguments[0];
            formats = void 0;
          } else if (isCalendarSpec(arguments[0])) {
            formats = arguments[0];
            time = void 0;
          }
        }
        var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
        return this.format(
          output || this.localeData().calendar(format2, this, createLocal(now2))
        );
      }
      function clone() {
        return new Moment(this);
      }
      function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() > localInput.valueOf();
        } else {
          return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
      }
      function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() < localInput.valueOf();
        } else {
          return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
      }
      function isBetween(from2, to2, units, inclusivity) {
        var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
          return false;
        }
        inclusivity = inclusivity || "()";
        return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
      }
      function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input), inputMs;
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() === localInput.valueOf();
        } else {
          inputMs = localInput.valueOf();
          return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
      }
      function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
      }
      function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
      }
      function diff(input, units, asFloat) {
        var that, zoneDelta, output;
        if (!this.isValid()) {
          return NaN;
        }
        that = cloneWithOffset(input, this);
        if (!that.isValid()) {
          return NaN;
        }
        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
        units = normalizeUnits(units);
        switch (units) {
          case "year":
            output = monthDiff(this, that) / 12;
            break;
          case "month":
            output = monthDiff(this, that);
            break;
          case "quarter":
            output = monthDiff(this, that) / 3;
            break;
          case "second":
            output = (this - that) / 1e3;
            break;
          case "minute":
            output = (this - that) / 6e4;
            break;
          case "hour":
            output = (this - that) / 36e5;
            break;
          case "day":
            output = (this - that - zoneDelta) / 864e5;
            break;
          case "week":
            output = (this - that - zoneDelta) / 6048e5;
            break;
          default:
            output = this - that;
        }
        return asFloat ? output : absFloor(output);
      }
      function monthDiff(a, b) {
        if (a.date() < b.date()) {
          return -monthDiff(b, a);
        }
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
        if (b - anchor < 0) {
          anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
          adjust = (b - anchor) / (anchor - anchor2);
        } else {
          anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
          adjust = (b - anchor) / (anchor2 - anchor);
        }
        return -(wholeMonthDiff + adjust) || 0;
      }
      hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
      hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
      function toString() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
      }
      function toISOString(keepOffset) {
        if (!this.isValid()) {
          return null;
        }
        var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
          return formatMoment(
            m,
            utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
          );
        }
        if (isFunction(Date.prototype.toISOString)) {
          if (utc) {
            return this.toDate().toISOString();
          } else {
            return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
          }
        }
        return formatMoment(
          m,
          utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
        );
      }
      function inspect() {
        if (!this.isValid()) {
          return "moment.invalid(/* " + this._i + " */)";
        }
        var func = "moment", zone = "", prefix, year, datetime, suffix;
        if (!this.isLocal()) {
          func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
          zone = "Z";
        }
        prefix = "[" + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
        datetime = "-MM-DD[T]HH:mm:ss.SSS";
        suffix = zone + '[")]';
        return this.format(prefix + year + datetime + suffix);
      }
      function format(inputString) {
        if (!inputString) {
          inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
      }
      function from(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
          return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
          return this.localeData().invalidDate();
        }
      }
      function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
      }
      function to(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
          return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
          return this.localeData().invalidDate();
        }
      }
      function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
      }
      function locale(key) {
        var newLocaleData;
        if (key === void 0) {
          return this._locale._abbr;
        } else {
          newLocaleData = getLocale(key);
          if (newLocaleData != null) {
            this._locale = newLocaleData;
          }
          return this;
        }
      }
      var lang = deprecate(
        "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
        function(key) {
          if (key === void 0) {
            return this.localeData();
          } else {
            return this.locale(key);
          }
        }
      );
      function localeData() {
        return this._locale;
      }
      var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
      function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
      }
      function localStartOfDate(y, m, d) {
        if (y < 100 && y >= 0) {
          return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
          return new Date(y, m, d).valueOf();
        }
      }
      function utcStartOfDate(y, m, d) {
        if (y < 100 && y >= 0) {
          return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
          return Date.UTC(y, m, d);
        }
      }
      function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === void 0 || units === "millisecond" || !this.isValid()) {
          return this;
        }
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch (units) {
          case "year":
            time = startOfDate(this.year(), 0, 1);
            break;
          case "quarter":
            time = startOfDate(
              this.year(),
              this.month() - this.month() % 3,
              1
            );
            break;
          case "month":
            time = startOfDate(this.year(), this.month(), 1);
            break;
          case "week":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - this.weekday()
            );
            break;
          case "isoWeek":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1)
            );
            break;
          case "day":
          case "date":
            time = startOfDate(this.year(), this.month(), this.date());
            break;
          case "hour":
            time = this._d.valueOf();
            time -= mod$1(
              time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
              MS_PER_HOUR
            );
            break;
          case "minute":
            time = this._d.valueOf();
            time -= mod$1(time, MS_PER_MINUTE);
            break;
          case "second":
            time = this._d.valueOf();
            time -= mod$1(time, MS_PER_SECOND);
            break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
      }
      function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === void 0 || units === "millisecond" || !this.isValid()) {
          return this;
        }
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch (units) {
          case "year":
            time = startOfDate(this.year() + 1, 0, 1) - 1;
            break;
          case "quarter":
            time = startOfDate(
              this.year(),
              this.month() - this.month() % 3 + 3,
              1
            ) - 1;
            break;
          case "month":
            time = startOfDate(this.year(), this.month() + 1, 1) - 1;
            break;
          case "week":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - this.weekday() + 7
            ) - 1;
            break;
          case "isoWeek":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1) + 7
            ) - 1;
            break;
          case "day":
          case "date":
            time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
            break;
          case "hour":
            time = this._d.valueOf();
            time += MS_PER_HOUR - mod$1(
              time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
              MS_PER_HOUR
            ) - 1;
            break;
          case "minute":
            time = this._d.valueOf();
            time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
            break;
          case "second":
            time = this._d.valueOf();
            time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
            break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
      }
      function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 6e4;
      }
      function unix() {
        return Math.floor(this.valueOf() / 1e3);
      }
      function toDate() {
        return new Date(this.valueOf());
      }
      function toArray() {
        var m = this;
        return [
          m.year(),
          m.month(),
          m.date(),
          m.hour(),
          m.minute(),
          m.second(),
          m.millisecond()
        ];
      }
      function toObject() {
        var m = this;
        return {
          years: m.year(),
          months: m.month(),
          date: m.date(),
          hours: m.hours(),
          minutes: m.minutes(),
          seconds: m.seconds(),
          milliseconds: m.milliseconds()
        };
      }
      function toJSON() {
        return this.isValid() ? this.toISOString() : null;
      }
      function isValid$2() {
        return isValid(this);
      }
      function parsingFlags() {
        return extend({}, getParsingFlags(this));
      }
      function invalidAt() {
        return getParsingFlags(this).overflow;
      }
      function creationData() {
        return {
          input: this._i,
          format: this._f,
          locale: this._locale,
          isUTC: this._isUTC,
          strict: this._strict
        };
      }
      addFormatToken("N", 0, 0, "eraAbbr");
      addFormatToken("NN", 0, 0, "eraAbbr");
      addFormatToken("NNN", 0, 0, "eraAbbr");
      addFormatToken("NNNN", 0, 0, "eraName");
      addFormatToken("NNNNN", 0, 0, "eraNarrow");
      addFormatToken("y", ["y", 1], "yo", "eraYear");
      addFormatToken("y", ["yy", 2], 0, "eraYear");
      addFormatToken("y", ["yyy", 3], 0, "eraYear");
      addFormatToken("y", ["yyyy", 4], 0, "eraYear");
      addRegexToken("N", matchEraAbbr);
      addRegexToken("NN", matchEraAbbr);
      addRegexToken("NNN", matchEraAbbr);
      addRegexToken("NNNN", matchEraName);
      addRegexToken("NNNNN", matchEraNarrow);
      addParseToken(
        ["N", "NN", "NNN", "NNNN", "NNNNN"],
        function(input, array, config, token2) {
          var era = config._locale.erasParse(input, token2, config._strict);
          if (era) {
            getParsingFlags(config).era = era;
          } else {
            getParsingFlags(config).invalidEra = input;
          }
        }
      );
      addRegexToken("y", matchUnsigned);
      addRegexToken("yy", matchUnsigned);
      addRegexToken("yyy", matchUnsigned);
      addRegexToken("yyyy", matchUnsigned);
      addRegexToken("yo", matchEraYearOrdinal);
      addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
      addParseToken(["yo"], function(input, array, config, token2) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
          match = input.match(config._locale._eraYearOrdinalRegex);
        }
        if (config._locale.eraYearOrdinalParse) {
          array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
          array[YEAR] = parseInt(input, 10);
        }
      });
      function localeEras(m, format2) {
        var i, l, date, eras = this._eras || getLocale("en")._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
          switch (typeof eras[i].since) {
            case "string":
              date = hooks(eras[i].since).startOf("day");
              eras[i].since = date.valueOf();
              break;
          }
          switch (typeof eras[i].until) {
            case "undefined":
              eras[i].until = Infinity;
              break;
            case "string":
              date = hooks(eras[i].until).startOf("day").valueOf();
              eras[i].until = date.valueOf();
              break;
          }
        }
        return eras;
      }
      function localeErasParse(eraName, format2, strict) {
        var i, l, eras = this.eras(), name, abbr, narrow;
        eraName = eraName.toUpperCase();
        for (i = 0, l = eras.length; i < l; ++i) {
          name = eras[i].name.toUpperCase();
          abbr = eras[i].abbr.toUpperCase();
          narrow = eras[i].narrow.toUpperCase();
          if (strict) {
            switch (format2) {
              case "N":
              case "NN":
              case "NNN":
                if (abbr === eraName) {
                  return eras[i];
                }
                break;
              case "NNNN":
                if (name === eraName) {
                  return eras[i];
                }
                break;
              case "NNNNN":
                if (narrow === eraName) {
                  return eras[i];
                }
                break;
            }
          } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
            return eras[i];
          }
        }
      }
      function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? 1 : -1;
        if (year === void 0) {
          return hooks(era.since).year();
        } else {
          return hooks(era.since).year() + (year - era.offset) * dir;
        }
      }
      function getEraName() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].name;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].name;
          }
        }
        return "";
      }
      function getEraNarrow() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].narrow;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].narrow;
          }
        }
        return "";
      }
      function getEraAbbr() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].abbr;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].abbr;
          }
        }
        return "";
      }
      function getEraYear() {
        var i, l, dir, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          dir = eras[i].since <= eras[i].until ? 1 : -1;
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
            return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
          }
        }
        return this.year();
      }
      function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, "_erasNameRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
      }
      function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, "_erasAbbrRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
      }
      function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, "_erasNarrowRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
      }
      function matchEraAbbr(isStrict, locale2) {
        return locale2.erasAbbrRegex(isStrict);
      }
      function matchEraName(isStrict, locale2) {
        return locale2.erasNameRegex(isStrict);
      }
      function matchEraNarrow(isStrict, locale2) {
        return locale2.erasNarrowRegex(isStrict);
      }
      function matchEraYearOrdinal(isStrict, locale2) {
        return locale2._eraYearOrdinalRegex || matchUnsigned;
      }
      function computeErasParse() {
        var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, erasName, erasAbbr, erasNarrow, eras = this.eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          erasName = regexEscape(eras[i].name);
          erasAbbr = regexEscape(eras[i].abbr);
          erasNarrow = regexEscape(eras[i].narrow);
          namePieces.push(erasName);
          abbrPieces.push(erasAbbr);
          narrowPieces.push(erasNarrow);
          mixedPieces.push(erasName);
          mixedPieces.push(erasAbbr);
          mixedPieces.push(erasNarrow);
        }
        this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
        this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
        this._erasNarrowRegex = new RegExp(
          "^(" + narrowPieces.join("|") + ")",
          "i"
        );
      }
      addFormatToken(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100;
      });
      addFormatToken(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100;
      });
      function addWeekYearFormatToken(token2, getter) {
        addFormatToken(0, [token2, token2.length], 0, getter);
      }
      addWeekYearFormatToken("gggg", "weekYear");
      addWeekYearFormatToken("ggggg", "weekYear");
      addWeekYearFormatToken("GGGG", "isoWeekYear");
      addWeekYearFormatToken("GGGGG", "isoWeekYear");
      addRegexToken("G", matchSigned);
      addRegexToken("g", matchSigned);
      addRegexToken("GG", match1to2, match2);
      addRegexToken("gg", match1to2, match2);
      addRegexToken("GGGG", match1to4, match4);
      addRegexToken("gggg", match1to4, match4);
      addRegexToken("GGGGG", match1to6, match6);
      addRegexToken("ggggg", match1to6, match6);
      addWeekParseToken(
        ["gggg", "ggggg", "GGGG", "GGGGG"],
        function(input, week, config, token2) {
          week[token2.substr(0, 2)] = toInt(input);
        }
      );
      addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
        week[token2] = hooks.parseTwoDigitYear(input);
      });
      function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
          this,
          input,
          this.week(),
          this.weekday() + this.localeData()._week.dow,
          this.localeData()._week.dow,
          this.localeData()._week.doy
        );
      }
      function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
          this,
          input,
          this.isoWeek(),
          this.isoWeekday(),
          1,
          4
        );
      }
      function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
      }
      function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
      }
      function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
      }
      function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
      }
      function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
          return weekOfYear(this, dow, doy).year;
        } else {
          weeksTarget = weeksInYear(input, dow, doy);
          if (week > weeksTarget) {
            week = weeksTarget;
          }
          return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
      }
      function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
      }
      addFormatToken("Q", 0, "Qo", "quarter");
      addRegexToken("Q", match1);
      addParseToken("Q", function(input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
      });
      function getSetQuarter(input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
      }
      addFormatToken("D", ["DD", 2], "Do", "date");
      addRegexToken("D", match1to2, match1to2NoLeadingZero);
      addRegexToken("DD", match1to2, match2);
      addRegexToken("Do", function(isStrict, locale2) {
        return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
      });
      addParseToken(["D", "DD"], DATE);
      addParseToken("Do", function(input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
      });
      var getSetDayOfMonth = makeGetSet("Date", true);
      addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
      addRegexToken("DDD", match1to3);
      addRegexToken("DDDD", match3);
      addParseToken(["DDD", "DDDD"], function(input, array, config) {
        config._dayOfYear = toInt(input);
      });
      function getSetDayOfYear(input) {
        var dayOfYear = Math.round(
          (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
        ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
      }
      addFormatToken("m", ["mm", 2], 0, "minute");
      addRegexToken("m", match1to2, match1to2HasZero);
      addRegexToken("mm", match1to2, match2);
      addParseToken(["m", "mm"], MINUTE);
      var getSetMinute = makeGetSet("Minutes", false);
      addFormatToken("s", ["ss", 2], 0, "second");
      addRegexToken("s", match1to2, match1to2HasZero);
      addRegexToken("ss", match1to2, match2);
      addParseToken(["s", "ss"], SECOND);
      var getSetSecond = makeGetSet("Seconds", false);
      addFormatToken("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
      });
      addFormatToken(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10);
      });
      addFormatToken(0, ["SSS", 3], 0, "millisecond");
      addFormatToken(0, ["SSSS", 4], 0, function() {
        return this.millisecond() * 10;
      });
      addFormatToken(0, ["SSSSS", 5], 0, function() {
        return this.millisecond() * 100;
      });
      addFormatToken(0, ["SSSSSS", 6], 0, function() {
        return this.millisecond() * 1e3;
      });
      addFormatToken(0, ["SSSSSSS", 7], 0, function() {
        return this.millisecond() * 1e4;
      });
      addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
        return this.millisecond() * 1e5;
      });
      addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
        return this.millisecond() * 1e6;
      });
      addRegexToken("S", match1to3, match1);
      addRegexToken("SS", match1to3, match2);
      addRegexToken("SSS", match1to3, match3);
      var token, getSetMillisecond;
      for (token = "SSSS"; token.length <= 9; token += "S") {
        addRegexToken(token, matchUnsigned);
      }
      function parseMs(input, array) {
        array[MILLISECOND] = toInt(("0." + input) * 1e3);
      }
      for (token = "S"; token.length <= 9; token += "S") {
        addParseToken(token, parseMs);
      }
      getSetMillisecond = makeGetSet("Milliseconds", false);
      addFormatToken("z", 0, 0, "zoneAbbr");
      addFormatToken("zz", 0, 0, "zoneName");
      function getZoneAbbr() {
        return this._isUTC ? "UTC" : "";
      }
      function getZoneName() {
        return this._isUTC ? "Coordinated Universal Time" : "";
      }
      var proto = Moment.prototype;
      proto.add = add;
      proto.calendar = calendar$1;
      proto.clone = clone;
      proto.diff = diff;
      proto.endOf = endOf;
      proto.format = format;
      proto.from = from;
      proto.fromNow = fromNow;
      proto.to = to;
      proto.toNow = toNow;
      proto.get = stringGet;
      proto.invalidAt = invalidAt;
      proto.isAfter = isAfter;
      proto.isBefore = isBefore;
      proto.isBetween = isBetween;
      proto.isSame = isSame;
      proto.isSameOrAfter = isSameOrAfter;
      proto.isSameOrBefore = isSameOrBefore;
      proto.isValid = isValid$2;
      proto.lang = lang;
      proto.locale = locale;
      proto.localeData = localeData;
      proto.max = prototypeMax;
      proto.min = prototypeMin;
      proto.parsingFlags = parsingFlags;
      proto.set = stringSet;
      proto.startOf = startOf;
      proto.subtract = subtract;
      proto.toArray = toArray;
      proto.toObject = toObject;
      proto.toDate = toDate;
      proto.toISOString = toISOString;
      proto.inspect = inspect;
      if (typeof Symbol !== "undefined" && Symbol.for != null) {
        proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
          return "Moment<" + this.format() + ">";
        };
      }
      proto.toJSON = toJSON;
      proto.toString = toString;
      proto.unix = unix;
      proto.valueOf = valueOf;
      proto.creationData = creationData;
      proto.eraName = getEraName;
      proto.eraNarrow = getEraNarrow;
      proto.eraAbbr = getEraAbbr;
      proto.eraYear = getEraYear;
      proto.year = getSetYear;
      proto.isLeapYear = getIsLeapYear;
      proto.weekYear = getSetWeekYear;
      proto.isoWeekYear = getSetISOWeekYear;
      proto.quarter = proto.quarters = getSetQuarter;
      proto.month = getSetMonth;
      proto.daysInMonth = getDaysInMonth;
      proto.week = proto.weeks = getSetWeek;
      proto.isoWeek = proto.isoWeeks = getSetISOWeek;
      proto.weeksInYear = getWeeksInYear;
      proto.weeksInWeekYear = getWeeksInWeekYear;
      proto.isoWeeksInYear = getISOWeeksInYear;
      proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
      proto.date = getSetDayOfMonth;
      proto.day = proto.days = getSetDayOfWeek;
      proto.weekday = getSetLocaleDayOfWeek;
      proto.isoWeekday = getSetISODayOfWeek;
      proto.dayOfYear = getSetDayOfYear;
      proto.hour = proto.hours = getSetHour;
      proto.minute = proto.minutes = getSetMinute;
      proto.second = proto.seconds = getSetSecond;
      proto.millisecond = proto.milliseconds = getSetMillisecond;
      proto.utcOffset = getSetOffset;
      proto.utc = setOffsetToUTC;
      proto.local = setOffsetToLocal;
      proto.parseZone = setOffsetToParsedOffset;
      proto.hasAlignedHourOffset = hasAlignedHourOffset;
      proto.isDST = isDaylightSavingTime;
      proto.isLocal = isLocal;
      proto.isUtcOffset = isUtcOffset;
      proto.isUtc = isUtc;
      proto.isUTC = isUtc;
      proto.zoneAbbr = getZoneAbbr;
      proto.zoneName = getZoneName;
      proto.dates = deprecate(
        "dates accessor is deprecated. Use date instead.",
        getSetDayOfMonth
      );
      proto.months = deprecate(
        "months accessor is deprecated. Use month instead",
        getSetMonth
      );
      proto.years = deprecate(
        "years accessor is deprecated. Use year instead",
        getSetYear
      );
      proto.zone = deprecate(
        "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
        getSetZone
      );
      proto.isDSTShifted = deprecate(
        "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
        isDaylightSavingTimeShifted
      );
      function createUnix(input) {
        return createLocal(input * 1e3);
      }
      function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
      }
      function preParsePostFormat(string) {
        return string;
      }
      var proto$1 = Locale.prototype;
      proto$1.calendar = calendar;
      proto$1.longDateFormat = longDateFormat;
      proto$1.invalidDate = invalidDate;
      proto$1.ordinal = ordinal;
      proto$1.preparse = preParsePostFormat;
      proto$1.postformat = preParsePostFormat;
      proto$1.relativeTime = relativeTime;
      proto$1.pastFuture = pastFuture;
      proto$1.set = set;
      proto$1.eras = localeEras;
      proto$1.erasParse = localeErasParse;
      proto$1.erasConvertYear = localeErasConvertYear;
      proto$1.erasAbbrRegex = erasAbbrRegex;
      proto$1.erasNameRegex = erasNameRegex;
      proto$1.erasNarrowRegex = erasNarrowRegex;
      proto$1.months = localeMonths;
      proto$1.monthsShort = localeMonthsShort;
      proto$1.monthsParse = localeMonthsParse;
      proto$1.monthsRegex = monthsRegex;
      proto$1.monthsShortRegex = monthsShortRegex;
      proto$1.week = localeWeek;
      proto$1.firstDayOfYear = localeFirstDayOfYear;
      proto$1.firstDayOfWeek = localeFirstDayOfWeek;
      proto$1.weekdays = localeWeekdays;
      proto$1.weekdaysMin = localeWeekdaysMin;
      proto$1.weekdaysShort = localeWeekdaysShort;
      proto$1.weekdaysParse = localeWeekdaysParse;
      proto$1.weekdaysRegex = weekdaysRegex;
      proto$1.weekdaysShortRegex = weekdaysShortRegex;
      proto$1.weekdaysMinRegex = weekdaysMinRegex;
      proto$1.isPM = localeIsPM;
      proto$1.meridiem = localeMeridiem;
      function get$1(format2, index, field, setter) {
        var locale2 = getLocale(), utc = createUTC().set(setter, index);
        return locale2[field](utc, format2);
      }
      function listMonthsImpl(format2, index, field) {
        if (isNumber(format2)) {
          index = format2;
          format2 = void 0;
        }
        format2 = format2 || "";
        if (index != null) {
          return get$1(format2, index, field, "month");
        }
        var i, out = [];
        for (i = 0; i < 12; i++) {
          out[i] = get$1(format2, i, field, "month");
        }
        return out;
      }
      function listWeekdaysImpl(localeSorted, format2, index, field) {
        if (typeof localeSorted === "boolean") {
          if (isNumber(format2)) {
            index = format2;
            format2 = void 0;
          }
          format2 = format2 || "";
        } else {
          format2 = localeSorted;
          index = format2;
          localeSorted = false;
          if (isNumber(format2)) {
            index = format2;
            format2 = void 0;
          }
          format2 = format2 || "";
        }
        var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
        if (index != null) {
          return get$1(format2, (index + shift) % 7, field, "day");
        }
        for (i = 0; i < 7; i++) {
          out[i] = get$1(format2, (i + shift) % 7, field, "day");
        }
        return out;
      }
      function listMonths(format2, index) {
        return listMonthsImpl(format2, index, "months");
      }
      function listMonthsShort(format2, index) {
        return listMonthsImpl(format2, index, "monthsShort");
      }
      function listWeekdays(localeSorted, format2, index) {
        return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
      }
      function listWeekdaysShort(localeSorted, format2, index) {
        return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
      }
      function listWeekdaysMin(localeSorted, format2, index) {
        return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
      }
      getSetGlobalLocale("en", {
        eras: [
          {
            since: "0001-01-01",
            until: Infinity,
            offset: 1,
            name: "Anno Domini",
            narrow: "AD",
            abbr: "AD"
          },
          {
            since: "0000-12-31",
            until: -Infinity,
            offset: 1,
            name: "Before Christ",
            narrow: "BC",
            abbr: "BC"
          }
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
          var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
          return number + output;
        }
      });
      hooks.lang = deprecate(
        "moment.lang is deprecated. Use moment.locale instead.",
        getSetGlobalLocale
      );
      hooks.langData = deprecate(
        "moment.langData is deprecated. Use moment.localeData instead.",
        getLocale
      );
      var mathAbs = Math.abs;
      function abs() {
        var data = this._data;
        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);
        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);
        return this;
      }
      function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);
        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;
        return duration._bubble();
      }
      function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
      }
      function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
      }
      function absCeil(number) {
        if (number < 0) {
          return Math.floor(number);
        } else {
          return Math.ceil(number);
        }
      }
      function bubble() {
        var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
        if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
          milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
          days2 = 0;
          months2 = 0;
        }
        data.milliseconds = milliseconds2 % 1e3;
        seconds2 = absFloor(milliseconds2 / 1e3);
        data.seconds = seconds2 % 60;
        minutes2 = absFloor(seconds2 / 60);
        data.minutes = minutes2 % 60;
        hours2 = absFloor(minutes2 / 60);
        data.hours = hours2 % 24;
        days2 += absFloor(hours2 / 24);
        monthsFromDays = absFloor(daysToMonths(days2));
        months2 += monthsFromDays;
        days2 -= absCeil(monthsToDays(monthsFromDays));
        years2 = absFloor(months2 / 12);
        months2 %= 12;
        data.days = days2;
        data.months = months2;
        data.years = years2;
        return this;
      }
      function daysToMonths(days2) {
        return days2 * 4800 / 146097;
      }
      function monthsToDays(months2) {
        return months2 * 146097 / 4800;
      }
      function as(units) {
        if (!this.isValid()) {
          return NaN;
        }
        var days2, months2, milliseconds2 = this._milliseconds;
        units = normalizeUnits(units);
        if (units === "month" || units === "quarter" || units === "year") {
          days2 = this._days + milliseconds2 / 864e5;
          months2 = this._months + daysToMonths(days2);
          switch (units) {
            case "month":
              return months2;
            case "quarter":
              return months2 / 3;
            case "year":
              return months2 / 12;
          }
        } else {
          days2 = this._days + Math.round(monthsToDays(this._months));
          switch (units) {
            case "week":
              return days2 / 7 + milliseconds2 / 6048e5;
            case "day":
              return days2 + milliseconds2 / 864e5;
            case "hour":
              return days2 * 24 + milliseconds2 / 36e5;
            case "minute":
              return days2 * 1440 + milliseconds2 / 6e4;
            case "second":
              return days2 * 86400 + milliseconds2 / 1e3;
            case "millisecond":
              return Math.floor(days2 * 864e5) + milliseconds2;
            default:
              throw new Error("Unknown unit " + units);
          }
        }
      }
      function makeAs(alias) {
        return function() {
          return this.as(alias);
        };
      }
      var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y"), valueOf$1 = asMilliseconds;
      function clone$1() {
        return createDuration(this);
      }
      function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + "s"]() : NaN;
      }
      function makeGetter(name) {
        return function() {
          return this.isValid() ? this._data[name] : NaN;
        };
      }
      var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
      function weeks() {
        return absFloor(this.days() / 7);
      }
      var round = Math.round, thresholds = {
        ss: 44,
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        w: null,
        M: 11
      };
      function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
        return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
      }
      function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
        var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
        if (thresholds2.w != null) {
          a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
        }
        a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale2;
        return substituteTimeAgo.apply(null, a);
      }
      function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === void 0) {
          return round;
        }
        if (typeof roundingFunction === "function") {
          round = roundingFunction;
          return true;
        }
        return false;
      }
      function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === void 0) {
          return false;
        }
        if (limit === void 0) {
          return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === "s") {
          thresholds.ss = limit - 1;
        }
        return true;
      }
      function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
          return this.localeData().invalidDate();
        }
        var withSuffix = false, th = thresholds, locale2, output;
        if (typeof argWithSuffix === "object") {
          argThresholds = argWithSuffix;
          argWithSuffix = false;
        }
        if (typeof argWithSuffix === "boolean") {
          withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === "object") {
          th = Object.assign({}, thresholds, argThresholds);
          if (argThresholds.s != null && argThresholds.ss == null) {
            th.ss = argThresholds.s - 1;
          }
        }
        locale2 = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale2);
        if (withSuffix) {
          output = locale2.pastFuture(+this, output);
        }
        return locale2.postformat(output);
      }
      var abs$1 = Math.abs;
      function sign(x) {
        return (x > 0) - (x < 0) || +x;
      }
      function toISOString$1() {
        if (!this.isValid()) {
          return this.localeData().invalidDate();
        }
        var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
        if (!total) {
          return "P0D";
        }
        minutes2 = absFloor(seconds2 / 60);
        hours2 = absFloor(minutes2 / 60);
        seconds2 %= 60;
        minutes2 %= 60;
        years2 = absFloor(months2 / 12);
        months2 %= 12;
        s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
        totalSign = total < 0 ? "-" : "";
        ymSign = sign(this._months) !== sign(total) ? "-" : "";
        daysSign = sign(this._days) !== sign(total) ? "-" : "";
        hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
        return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
      }
      var proto$2 = Duration.prototype;
      proto$2.isValid = isValid$1;
      proto$2.abs = abs;
      proto$2.add = add$1;
      proto$2.subtract = subtract$1;
      proto$2.as = as;
      proto$2.asMilliseconds = asMilliseconds;
      proto$2.asSeconds = asSeconds;
      proto$2.asMinutes = asMinutes;
      proto$2.asHours = asHours;
      proto$2.asDays = asDays;
      proto$2.asWeeks = asWeeks;
      proto$2.asMonths = asMonths;
      proto$2.asQuarters = asQuarters;
      proto$2.asYears = asYears;
      proto$2.valueOf = valueOf$1;
      proto$2._bubble = bubble;
      proto$2.clone = clone$1;
      proto$2.get = get$2;
      proto$2.milliseconds = milliseconds;
      proto$2.seconds = seconds;
      proto$2.minutes = minutes;
      proto$2.hours = hours;
      proto$2.days = days;
      proto$2.weeks = weeks;
      proto$2.months = months;
      proto$2.years = years;
      proto$2.humanize = humanize;
      proto$2.toISOString = toISOString$1;
      proto$2.toString = toISOString$1;
      proto$2.toJSON = toISOString$1;
      proto$2.locale = locale;
      proto$2.localeData = localeData;
      proto$2.toIsoString = deprecate(
        "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
        toISOString$1
      );
      proto$2.lang = lang;
      addFormatToken("X", 0, 0, "unix");
      addFormatToken("x", 0, 0, "valueOf");
      addRegexToken("x", matchSigned);
      addRegexToken("X", matchTimestamp);
      addParseToken("X", function(input, array, config) {
        config._d = new Date(parseFloat(input) * 1e3);
      });
      addParseToken("x", function(input, array, config) {
        config._d = new Date(toInt(input));
      });
      hooks.version = "2.30.1";
      setHookCallback(createLocal);
      hooks.fn = proto;
      hooks.min = min;
      hooks.max = max;
      hooks.now = now;
      hooks.utc = createUTC;
      hooks.unix = createUnix;
      hooks.months = listMonths;
      hooks.isDate = isDate;
      hooks.locale = getSetGlobalLocale;
      hooks.invalid = createInvalid;
      hooks.duration = createDuration;
      hooks.isMoment = isMoment;
      hooks.weekdays = listWeekdays;
      hooks.parseZone = createInZone;
      hooks.localeData = getLocale;
      hooks.isDuration = isDuration;
      hooks.monthsShort = listMonthsShort;
      hooks.weekdaysMin = listWeekdaysMin;
      hooks.defineLocale = defineLocale;
      hooks.updateLocale = updateLocale;
      hooks.locales = listLocales;
      hooks.weekdaysShort = listWeekdaysShort;
      hooks.normalizeUnits = normalizeUnits;
      hooks.relativeTimeRounding = getSetRelativeTimeRounding;
      hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
      hooks.calendarFormat = getCalendarFormat;
      hooks.prototype = proto;
      hooks.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        DATE: "YYYY-MM-DD",
        TIME: "HH:mm",
        TIME_SECONDS: "HH:mm:ss",
        TIME_MS: "HH:mm:ss.SSS",
        WEEK: "GGGG-[W]WW",
        MONTH: "YYYY-MM"
      };
      return hooks;
    });
  }
});

// node_modules/jsonpath/jsonpath.js
var require_jsonpath = __commonJS({
  "node_modules/jsonpath/jsonpath.js"(exports, module2) {
    (function(f) {
      if (typeof exports === "object" && typeof module2 !== "undefined") {
        module2.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.jsonpath = f();
      }
    })(function() {
      var define2, module3, exports2;
      return function e(t, n, r) {
        function s(o2, u) {
          if (!n[o2]) {
            if (!t[o2]) {
              var a = typeof require == "function" && require;
              if (!u && a)
                return a(o2, true);
              if (i)
                return i(o2, true);
              var f = new Error("Cannot find module '" + o2 + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o2] = { exports: {} };
            t[o2][0].call(l.exports, function(e2) {
              var n2 = t[o2][1][e2];
              return s(n2 ? n2 : e2);
            }, l, l.exports, e, t, n, r);
          }
          return n[o2].exports;
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++)
          s(r[o]);
        return s;
      }({ "./aesprim": [function(require2, module4, exports3) {
        (function(root, factory) {
          "use strict";
          if (typeof define2 === "function" && define2.amd) {
            define2(["exports"], factory);
          } else if (typeof exports3 !== "undefined") {
            factory(exports3);
          } else {
            factory(root.esprima = {});
          }
        })(this, function(exports4) {
          "use strict";
          var Token, TokenName, FnExprTokens, Syntax, PropertyKind, Messages, Regex, SyntaxTreeDelegate, source, strict, index, lineNumber, lineStart, length, delegate, lookahead, state, extra;
          Token = {
            BooleanLiteral: 1,
            EOF: 2,
            Identifier: 3,
            Keyword: 4,
            NullLiteral: 5,
            NumericLiteral: 6,
            Punctuator: 7,
            StringLiteral: 8,
            RegularExpression: 9
          };
          TokenName = {};
          TokenName[Token.BooleanLiteral] = "Boolean";
          TokenName[Token.EOF] = "<end>";
          TokenName[Token.Identifier] = "Identifier";
          TokenName[Token.Keyword] = "Keyword";
          TokenName[Token.NullLiteral] = "Null";
          TokenName[Token.NumericLiteral] = "Numeric";
          TokenName[Token.Punctuator] = "Punctuator";
          TokenName[Token.StringLiteral] = "String";
          TokenName[Token.RegularExpression] = "RegularExpression";
          FnExprTokens = [
            "(",
            "{",
            "[",
            "in",
            "typeof",
            "instanceof",
            "new",
            "return",
            "case",
            "delete",
            "throw",
            "void",
            "=",
            "+=",
            "-=",
            "*=",
            "/=",
            "%=",
            "<<=",
            ">>=",
            ">>>=",
            "&=",
            "|=",
            "^=",
            ",",
            "+",
            "-",
            "*",
            "/",
            "%",
            "++",
            "--",
            "<<",
            ">>",
            ">>>",
            "&",
            "|",
            "^",
            "!",
            "~",
            "&&",
            "||",
            "?",
            ":",
            "===",
            "==",
            ">=",
            "<=",
            "<",
            ">",
            "!=",
            "!=="
          ];
          Syntax = {
            AssignmentExpression: "AssignmentExpression",
            ArrayExpression: "ArrayExpression",
            BlockStatement: "BlockStatement",
            BinaryExpression: "BinaryExpression",
            BreakStatement: "BreakStatement",
            CallExpression: "CallExpression",
            CatchClause: "CatchClause",
            ConditionalExpression: "ConditionalExpression",
            ContinueStatement: "ContinueStatement",
            DoWhileStatement: "DoWhileStatement",
            DebuggerStatement: "DebuggerStatement",
            EmptyStatement: "EmptyStatement",
            ExpressionStatement: "ExpressionStatement",
            ForStatement: "ForStatement",
            ForInStatement: "ForInStatement",
            FunctionDeclaration: "FunctionDeclaration",
            FunctionExpression: "FunctionExpression",
            Identifier: "Identifier",
            IfStatement: "IfStatement",
            Literal: "Literal",
            LabeledStatement: "LabeledStatement",
            LogicalExpression: "LogicalExpression",
            MemberExpression: "MemberExpression",
            NewExpression: "NewExpression",
            ObjectExpression: "ObjectExpression",
            Program: "Program",
            Property: "Property",
            ReturnStatement: "ReturnStatement",
            SequenceExpression: "SequenceExpression",
            SwitchStatement: "SwitchStatement",
            SwitchCase: "SwitchCase",
            ThisExpression: "ThisExpression",
            ThrowStatement: "ThrowStatement",
            TryStatement: "TryStatement",
            UnaryExpression: "UnaryExpression",
            UpdateExpression: "UpdateExpression",
            VariableDeclaration: "VariableDeclaration",
            VariableDeclarator: "VariableDeclarator",
            WhileStatement: "WhileStatement",
            WithStatement: "WithStatement"
          };
          PropertyKind = {
            Data: 1,
            Get: 2,
            Set: 4
          };
          Messages = {
            UnexpectedToken: "Unexpected token %0",
            UnexpectedNumber: "Unexpected number",
            UnexpectedString: "Unexpected string",
            UnexpectedIdentifier: "Unexpected identifier",
            UnexpectedReserved: "Unexpected reserved word",
            UnexpectedEOS: "Unexpected end of input",
            NewlineAfterThrow: "Illegal newline after throw",
            InvalidRegExp: "Invalid regular expression",
            UnterminatedRegExp: "Invalid regular expression: missing /",
            InvalidLHSInAssignment: "Invalid left-hand side in assignment",
            InvalidLHSInForIn: "Invalid left-hand side in for-in",
            MultipleDefaultsInSwitch: "More than one default clause in switch statement",
            NoCatchOrFinally: "Missing catch or finally after try",
            UnknownLabel: "Undefined label '%0'",
            Redeclaration: "%0 '%1' has already been declared",
            IllegalContinue: "Illegal continue statement",
            IllegalBreak: "Illegal break statement",
            IllegalReturn: "Illegal return statement",
            StrictModeWith: "Strict mode code may not include a with statement",
            StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
            StrictVarName: "Variable name may not be eval or arguments in strict mode",
            StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
            StrictParamDupe: "Strict mode function may not have duplicate parameter names",
            StrictFunctionName: "Function name may not be eval or arguments in strict mode",
            StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
            StrictDelete: "Delete of an unqualified identifier in strict mode.",
            StrictDuplicateProperty: "Duplicate data property in object literal not allowed in strict mode",
            AccessorDataProperty: "Object literal may not have data and accessor property with the same name",
            AccessorGetSet: "Object literal may not have multiple get/set accessors with the same name",
            StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
            StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
            StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
            StrictReservedWord: "Use of future reserved word in strict mode"
          };
          Regex = {
            NonAsciiIdentifierStart: new RegExp("[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]"),
            NonAsciiIdentifierPart: new RegExp("[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]")
          };
          function assert(condition, message) {
            if (!condition) {
              throw new Error("ASSERT: " + message);
            }
          }
          function isDecimalDigit(ch) {
            return ch >= 48 && ch <= 57;
          }
          function isHexDigit(ch) {
            return "0123456789abcdefABCDEF".indexOf(ch) >= 0;
          }
          function isOctalDigit(ch) {
            return "01234567".indexOf(ch) >= 0;
          }
          function isWhiteSpace(ch) {
            return ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch >= 5760 && [5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].indexOf(ch) >= 0;
          }
          function isLineTerminator(ch) {
            return ch === 10 || ch === 13 || ch === 8232 || ch === 8233;
          }
          function isIdentifierStart(ch) {
            return ch == 64 || ch === 36 || ch === 95 || ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch === 92 || ch >= 128 && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch));
          }
          function isIdentifierPart(ch) {
            return ch === 36 || ch === 95 || ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 48 && ch <= 57 || ch === 92 || ch >= 128 && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch));
          }
          function isFutureReservedWord(id) {
            switch (id) {
              case "class":
              case "enum":
              case "export":
              case "extends":
              case "import":
              case "super":
                return true;
              default:
                return false;
            }
          }
          function isStrictModeReservedWord(id) {
            switch (id) {
              case "implements":
              case "interface":
              case "package":
              case "private":
              case "protected":
              case "public":
              case "static":
              case "yield":
              case "let":
                return true;
              default:
                return false;
            }
          }
          function isRestrictedWord(id) {
            return id === "eval" || id === "arguments";
          }
          function isKeyword(id) {
            if (strict && isStrictModeReservedWord(id)) {
              return true;
            }
            switch (id.length) {
              case 2:
                return id === "if" || id === "in" || id === "do";
              case 3:
                return id === "var" || id === "for" || id === "new" || id === "try" || id === "let";
              case 4:
                return id === "this" || id === "else" || id === "case" || id === "void" || id === "with" || id === "enum";
              case 5:
                return id === "while" || id === "break" || id === "catch" || id === "throw" || id === "const" || id === "yield" || id === "class" || id === "super";
              case 6:
                return id === "return" || id === "typeof" || id === "delete" || id === "switch" || id === "export" || id === "import";
              case 7:
                return id === "default" || id === "finally" || id === "extends";
              case 8:
                return id === "function" || id === "continue" || id === "debugger";
              case 10:
                return id === "instanceof";
              default:
                return false;
            }
          }
          function addComment(type, value, start, end, loc) {
            var comment, attacher;
            assert(typeof start === "number", "Comment must have valid position");
            if (state.lastCommentStart >= start) {
              return;
            }
            state.lastCommentStart = start;
            comment = {
              type,
              value
            };
            if (extra.range) {
              comment.range = [start, end];
            }
            if (extra.loc) {
              comment.loc = loc;
            }
            extra.comments.push(comment);
            if (extra.attachComment) {
              extra.leadingComments.push(comment);
              extra.trailingComments.push(comment);
            }
          }
          function skipSingleLineComment(offset) {
            var start, loc, ch, comment;
            start = index - offset;
            loc = {
              start: {
                line: lineNumber,
                column: index - lineStart - offset
              }
            };
            while (index < length) {
              ch = source.charCodeAt(index);
              ++index;
              if (isLineTerminator(ch)) {
                if (extra.comments) {
                  comment = source.slice(start + offset, index - 1);
                  loc.end = {
                    line: lineNumber,
                    column: index - lineStart - 1
                  };
                  addComment("Line", comment, start, index - 1, loc);
                }
                if (ch === 13 && source.charCodeAt(index) === 10) {
                  ++index;
                }
                ++lineNumber;
                lineStart = index;
                return;
              }
            }
            if (extra.comments) {
              comment = source.slice(start + offset, index);
              loc.end = {
                line: lineNumber,
                column: index - lineStart
              };
              addComment("Line", comment, start, index, loc);
            }
          }
          function skipMultiLineComment() {
            var start, loc, ch, comment;
            if (extra.comments) {
              start = index - 2;
              loc = {
                start: {
                  line: lineNumber,
                  column: index - lineStart - 2
                }
              };
            }
            while (index < length) {
              ch = source.charCodeAt(index);
              if (isLineTerminator(ch)) {
                if (ch === 13 && source.charCodeAt(index + 1) === 10) {
                  ++index;
                }
                ++lineNumber;
                ++index;
                lineStart = index;
                if (index >= length) {
                  throwError({}, Messages.UnexpectedToken, "ILLEGAL");
                }
              } else if (ch === 42) {
                if (source.charCodeAt(index + 1) === 47) {
                  ++index;
                  ++index;
                  if (extra.comments) {
                    comment = source.slice(start + 2, index - 2);
                    loc.end = {
                      line: lineNumber,
                      column: index - lineStart
                    };
                    addComment("Block", comment, start, index, loc);
                  }
                  return;
                }
                ++index;
              } else {
                ++index;
              }
            }
            throwError({}, Messages.UnexpectedToken, "ILLEGAL");
          }
          function skipComment() {
            var ch, start;
            start = index === 0;
            while (index < length) {
              ch = source.charCodeAt(index);
              if (isWhiteSpace(ch)) {
                ++index;
              } else if (isLineTerminator(ch)) {
                ++index;
                if (ch === 13 && source.charCodeAt(index) === 10) {
                  ++index;
                }
                ++lineNumber;
                lineStart = index;
                start = true;
              } else if (ch === 47) {
                ch = source.charCodeAt(index + 1);
                if (ch === 47) {
                  ++index;
                  ++index;
                  skipSingleLineComment(2);
                  start = true;
                } else if (ch === 42) {
                  ++index;
                  ++index;
                  skipMultiLineComment();
                } else {
                  break;
                }
              } else if (start && ch === 45) {
                if (source.charCodeAt(index + 1) === 45 && source.charCodeAt(index + 2) === 62) {
                  index += 3;
                  skipSingleLineComment(3);
                } else {
                  break;
                }
              } else if (ch === 60) {
                if (source.slice(index + 1, index + 4) === "!--") {
                  ++index;
                  ++index;
                  ++index;
                  ++index;
                  skipSingleLineComment(4);
                } else {
                  break;
                }
              } else {
                break;
              }
            }
          }
          function scanHexEscape(prefix) {
            var i, len, ch, code = 0;
            len = prefix === "u" ? 4 : 2;
            for (i = 0; i < len; ++i) {
              if (index < length && isHexDigit(source[index])) {
                ch = source[index++];
                code = code * 16 + "0123456789abcdef".indexOf(ch.toLowerCase());
              } else {
                return "";
              }
            }
            return String.fromCharCode(code);
          }
          function getEscapedIdentifier() {
            var ch, id;
            ch = source.charCodeAt(index++);
            id = String.fromCharCode(ch);
            if (ch === 92) {
              if (source.charCodeAt(index) !== 117) {
                throwError({}, Messages.UnexpectedToken, "ILLEGAL");
              }
              ++index;
              ch = scanHexEscape("u");
              if (!ch || ch === "\\" || !isIdentifierStart(ch.charCodeAt(0))) {
                throwError({}, Messages.UnexpectedToken, "ILLEGAL");
              }
              id = ch;
            }
            while (index < length) {
              ch = source.charCodeAt(index);
              if (!isIdentifierPart(ch)) {
                break;
              }
              ++index;
              id += String.fromCharCode(ch);
              if (ch === 92) {
                id = id.substr(0, id.length - 1);
                if (source.charCodeAt(index) !== 117) {
                  throwError({}, Messages.UnexpectedToken, "ILLEGAL");
                }
                ++index;
                ch = scanHexEscape("u");
                if (!ch || ch === "\\" || !isIdentifierPart(ch.charCodeAt(0))) {
                  throwError({}, Messages.UnexpectedToken, "ILLEGAL");
                }
                id += ch;
              }
            }
            return id;
          }
          function getIdentifier() {
            var start, ch;
            start = index++;
            while (index < length) {
              ch = source.charCodeAt(index);
              if (ch === 92) {
                index = start;
                return getEscapedIdentifier();
              }
              if (isIdentifierPart(ch)) {
                ++index;
              } else {
                break;
              }
            }
            return source.slice(start, index);
          }
          function scanIdentifier() {
            var start, id, type;
            start = index;
            id = source.charCodeAt(index) === 92 ? getEscapedIdentifier() : getIdentifier();
            if (id.length === 1) {
              type = Token.Identifier;
            } else if (isKeyword(id)) {
              type = Token.Keyword;
            } else if (id === "null") {
              type = Token.NullLiteral;
            } else if (id === "true" || id === "false") {
              type = Token.BooleanLiteral;
            } else {
              type = Token.Identifier;
            }
            return {
              type,
              value: id,
              lineNumber,
              lineStart,
              start,
              end: index
            };
          }
          function scanPunctuator() {
            var start = index, code = source.charCodeAt(index), code2, ch1 = source[index], ch2, ch3, ch4;
            switch (code) {
              case 46:
              case 40:
              case 41:
              case 59:
              case 44:
              case 123:
              case 125:
              case 91:
              case 93:
              case 58:
              case 63:
              case 126:
                ++index;
                if (extra.tokenize) {
                  if (code === 40) {
                    extra.openParenToken = extra.tokens.length;
                  } else if (code === 123) {
                    extra.openCurlyToken = extra.tokens.length;
                  }
                }
                return {
                  type: Token.Punctuator,
                  value: String.fromCharCode(code),
                  lineNumber,
                  lineStart,
                  start,
                  end: index
                };
              default:
                code2 = source.charCodeAt(index + 1);
                if (code2 === 61) {
                  switch (code) {
                    case 43:
                    case 45:
                    case 47:
                    case 60:
                    case 62:
                    case 94:
                    case 124:
                    case 37:
                    case 38:
                    case 42:
                      index += 2;
                      return {
                        type: Token.Punctuator,
                        value: String.fromCharCode(code) + String.fromCharCode(code2),
                        lineNumber,
                        lineStart,
                        start,
                        end: index
                      };
                    case 33:
                    case 61:
                      index += 2;
                      if (source.charCodeAt(index) === 61) {
                        ++index;
                      }
                      return {
                        type: Token.Punctuator,
                        value: source.slice(start, index),
                        lineNumber,
                        lineStart,
                        start,
                        end: index
                      };
                  }
                }
            }
            ch4 = source.substr(index, 4);
            if (ch4 === ">>>=") {
              index += 4;
              return {
                type: Token.Punctuator,
                value: ch4,
                lineNumber,
                lineStart,
                start,
                end: index
              };
            }
            ch3 = ch4.substr(0, 3);
            if (ch3 === ">>>" || ch3 === "<<=" || ch3 === ">>=") {
              index += 3;
              return {
                type: Token.Punctuator,
                value: ch3,
                lineNumber,
                lineStart,
                start,
                end: index
              };
            }
            ch2 = ch3.substr(0, 2);
            if (ch1 === ch2[1] && "+-<>&|".indexOf(ch1) >= 0 || ch2 === "=>") {
              index += 2;
              return {
                type: Token.Punctuator,
                value: ch2,
                lineNumber,
                lineStart,
                start,
                end: index
              };
            }
            if ("<>=!+-*%&|^/".indexOf(ch1) >= 0) {
              ++index;
              return {
                type: Token.Punctuator,
                value: ch1,
                lineNumber,
                lineStart,
                start,
                end: index
              };
            }
            throwError({}, Messages.UnexpectedToken, "ILLEGAL");
          }
          function scanHexLiteral(start) {
            var number = "";
            while (index < length) {
              if (!isHexDigit(source[index])) {
                break;
              }
              number += source[index++];
            }
            if (number.length === 0) {
              throwError({}, Messages.UnexpectedToken, "ILLEGAL");
            }
            if (isIdentifierStart(source.charCodeAt(index))) {
              throwError({}, Messages.UnexpectedToken, "ILLEGAL");
            }
            return {
              type: Token.NumericLiteral,
              value: parseInt("0x" + number, 16),
              lineNumber,
              lineStart,
              start,
              end: index
            };
          }
          function scanOctalLiteral(start) {
            var number = "0" + source[index++];
            while (index < length) {
              if (!isOctalDigit(source[index])) {
                break;
              }
              number += source[index++];
            }
            if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
              throwError({}, Messages.UnexpectedToken, "ILLEGAL");
            }
            return {
              type: Token.NumericLiteral,
              value: parseInt(number, 8),
              octal: true,
              lineNumber,
              lineStart,
              start,
              end: index
            };
          }
          function scanNumericLiteral() {
            var number, start, ch;
            ch = source[index];
            assert(
              isDecimalDigit(ch.charCodeAt(0)) || ch === ".",
              "Numeric literal must start with a decimal digit or a decimal point"
            );
            start = index;
            number = "";
            if (ch !== ".") {
              number = source[index++];
              ch = source[index];
              if (number === "0") {
                if (ch === "x" || ch === "X") {
                  ++index;
                  return scanHexLiteral(start);
                }
                if (isOctalDigit(ch)) {
                  return scanOctalLiteral(start);
                }
                if (ch && isDecimalDigit(ch.charCodeAt(0))) {
                  throwError({}, Messages.UnexpectedToken, "ILLEGAL");
                }
              }
              while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
              }
              ch = source[index];
            }
            if (ch === ".") {
              number += source[index++];
              while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
              }
              ch = source[index];
            }
            if (ch === "e" || ch === "E") {
              number += source[index++];
              ch = source[index];
              if (ch === "+" || ch === "-") {
                number += source[index++];
              }
              if (isDecimalDigit(source.charCodeAt(index))) {
                while (isDecimalDigit(source.charCodeAt(index))) {
                  number += source[index++];
                }
              } else {
                throwError({}, Messages.UnexpectedToken, "ILLEGAL");
              }
            }
            if (isIdentifierStart(source.charCodeAt(index))) {
              throwError({}, Messages.UnexpectedToken, "ILLEGAL");
            }
            return {
              type: Token.NumericLiteral,
              value: parseFloat(number),
              lineNumber,
              lineStart,
              start,
              end: index
            };
          }
          function scanStringLiteral() {
            var str = "", quote, start, ch, code, unescaped, restore, octal = false, startLineNumber, startLineStart;
            startLineNumber = lineNumber;
            startLineStart = lineStart;
            quote = source[index];
            assert(
              quote === "'" || quote === '"',
              "String literal must starts with a quote"
            );
            start = index;
            ++index;
            while (index < length) {
              ch = source[index++];
              if (ch === quote) {
                quote = "";
                break;
              } else if (ch === "\\") {
                ch = source[index++];
                if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
                  switch (ch) {
                    case "u":
                    case "x":
                      restore = index;
                      unescaped = scanHexEscape(ch);
                      if (unescaped) {
                        str += unescaped;
                      } else {
                        index = restore;
                        str += ch;
                      }
                      break;
                    case "n":
                      str += "\n";
                      break;
                    case "r":
                      str += "\r";
                      break;
                    case "t":
                      str += "	";
                      break;
                    case "b":
                      str += "\b";
                      break;
                    case "f":
                      str += "\f";
                      break;
                    case "v":
                      str += "\v";
                      break;
                    default:
                      if (isOctalDigit(ch)) {
                        code = "01234567".indexOf(ch);
                        if (code !== 0) {
                          octal = true;
                        }
                        if (index < length && isOctalDigit(source[index])) {
                          octal = true;
                          code = code * 8 + "01234567".indexOf(source[index++]);
                          if ("0123".indexOf(ch) >= 0 && index < length && isOctalDigit(source[index])) {
                            code = code * 8 + "01234567".indexOf(source[index++]);
                          }
                        }
                        str += String.fromCharCode(code);
                      } else {
                        str += ch;
                      }
                      break;
                  }
                } else {
                  ++lineNumber;
                  if (ch === "\r" && source[index] === "\n") {
                    ++index;
                  }
                  lineStart = index;
                }
              } else if (isLineTerminator(ch.charCodeAt(0))) {
                break;
              } else {
                str += ch;
              }
            }
            if (quote !== "") {
              throwError({}, Messages.UnexpectedToken, "ILLEGAL");
            }
            return {
              type: Token.StringLiteral,
              value: str,
              octal,
              startLineNumber,
              startLineStart,
              lineNumber,
              lineStart,
              start,
              end: index
            };
          }
          function testRegExp(pattern, flags) {
            var value;
            try {
              value = new RegExp(pattern, flags);
            } catch (e) {
              throwError({}, Messages.InvalidRegExp);
            }
            return value;
          }
          function scanRegExpBody() {
            var ch, str, classMarker, terminated, body;
            ch = source[index];
            assert(ch === "/", "Regular expression literal must start with a slash");
            str = source[index++];
            classMarker = false;
            terminated = false;
            while (index < length) {
              ch = source[index++];
              str += ch;
              if (ch === "\\") {
                ch = source[index++];
                if (isLineTerminator(ch.charCodeAt(0))) {
                  throwError({}, Messages.UnterminatedRegExp);
                }
                str += ch;
              } else if (isLineTerminator(ch.charCodeAt(0))) {
                throwError({}, Messages.UnterminatedRegExp);
              } else if (classMarker) {
                if (ch === "]") {
                  classMarker = false;
                }
              } else {
                if (ch === "/") {
                  terminated = true;
                  break;
                } else if (ch === "[") {
                  classMarker = true;
                }
              }
            }
            if (!terminated) {
              throwError({}, Messages.UnterminatedRegExp);
            }
            body = str.substr(1, str.length - 2);
            return {
              value: body,
              literal: str
            };
          }
          function scanRegExpFlags() {
            var ch, str, flags, restore;
            str = "";
            flags = "";
            while (index < length) {
              ch = source[index];
              if (!isIdentifierPart(ch.charCodeAt(0))) {
                break;
              }
              ++index;
              if (ch === "\\" && index < length) {
                ch = source[index];
                if (ch === "u") {
                  ++index;
                  restore = index;
                  ch = scanHexEscape("u");
                  if (ch) {
                    flags += ch;
                    for (str += "\\u"; restore < index; ++restore) {
                      str += source[restore];
                    }
                  } else {
                    index = restore;
                    flags += "u";
                    str += "\\u";
                  }
                  throwErrorTolerant({}, Messages.UnexpectedToken, "ILLEGAL");
                } else {
                  str += "\\";
                  throwErrorTolerant({}, Messages.UnexpectedToken, "ILLEGAL");
                }
              } else {
                flags += ch;
                str += ch;
              }
            }
            return {
              value: flags,
              literal: str
            };
          }
          function scanRegExp() {
            var start, body, flags, pattern, value;
            lookahead = null;
            skipComment();
            start = index;
            body = scanRegExpBody();
            flags = scanRegExpFlags();
            value = testRegExp(body.value, flags.value);
            if (extra.tokenize) {
              return {
                type: Token.RegularExpression,
                value,
                lineNumber,
                lineStart,
                start,
                end: index
              };
            }
            return {
              literal: body.literal + flags.literal,
              value,
              start,
              end: index
            };
          }
          function collectRegex() {
            var pos, loc, regex, token;
            skipComment();
            pos = index;
            loc = {
              start: {
                line: lineNumber,
                column: index - lineStart
              }
            };
            regex = scanRegExp();
            loc.end = {
              line: lineNumber,
              column: index - lineStart
            };
            if (!extra.tokenize) {
              if (extra.tokens.length > 0) {
                token = extra.tokens[extra.tokens.length - 1];
                if (token.range[0] === pos && token.type === "Punctuator") {
                  if (token.value === "/" || token.value === "/=") {
                    extra.tokens.pop();
                  }
                }
              }
              extra.tokens.push({
                type: "RegularExpression",
                value: regex.literal,
                range: [pos, index],
                loc
              });
            }
            return regex;
          }
          function isIdentifierName(token) {
            return token.type === Token.Identifier || token.type === Token.Keyword || token.type === Token.BooleanLiteral || token.type === Token.NullLiteral;
          }
          function advanceSlash() {
            var prevToken, checkToken;
            prevToken = extra.tokens[extra.tokens.length - 1];
            if (!prevToken) {
              return collectRegex();
            }
            if (prevToken.type === "Punctuator") {
              if (prevToken.value === "]") {
                return scanPunctuator();
              }
              if (prevToken.value === ")") {
                checkToken = extra.tokens[extra.openParenToken - 1];
                if (checkToken && checkToken.type === "Keyword" && (checkToken.value === "if" || checkToken.value === "while" || checkToken.value === "for" || checkToken.value === "with")) {
                  return collectRegex();
                }
                return scanPunctuator();
              }
              if (prevToken.value === "}") {
                if (extra.tokens[extra.openCurlyToken - 3] && extra.tokens[extra.openCurlyToken - 3].type === "Keyword") {
                  checkToken = extra.tokens[extra.openCurlyToken - 4];
                  if (!checkToken) {
                    return scanPunctuator();
                  }
                } else if (extra.tokens[extra.openCurlyToken - 4] && extra.tokens[extra.openCurlyToken - 4].type === "Keyword") {
                  checkToken = extra.tokens[extra.openCurlyToken - 5];
                  if (!checkToken) {
                    return collectRegex();
                  }
                } else {
                  return scanPunctuator();
                }
                if (FnExprTokens.indexOf(checkToken.value) >= 0) {
                  return scanPunctuator();
                }
                return collectRegex();
              }
              return collectRegex();
            }
            if (prevToken.type === "Keyword") {
              return collectRegex();
            }
            return scanPunctuator();
          }
          function advance() {
            var ch;
            skipComment();
            if (index >= length) {
              return {
                type: Token.EOF,
                lineNumber,
                lineStart,
                start: index,
                end: index
              };
            }
            ch = source.charCodeAt(index);
            if (isIdentifierStart(ch)) {
              return scanIdentifier();
            }
            if (ch === 40 || ch === 41 || ch === 59) {
              return scanPunctuator();
            }
            if (ch === 39 || ch === 34) {
              return scanStringLiteral();
            }
            if (ch === 46) {
              if (isDecimalDigit(source.charCodeAt(index + 1))) {
                return scanNumericLiteral();
              }
              return scanPunctuator();
            }
            if (isDecimalDigit(ch)) {
              return scanNumericLiteral();
            }
            if (extra.tokenize && ch === 47) {
              return advanceSlash();
            }
            return scanPunctuator();
          }
          function collectToken() {
            var loc, token, range, value;
            skipComment();
            loc = {
              start: {
                line: lineNumber,
                column: index - lineStart
              }
            };
            token = advance();
            loc.end = {
              line: lineNumber,
              column: index - lineStart
            };
            if (token.type !== Token.EOF) {
              value = source.slice(token.start, token.end);
              extra.tokens.push({
                type: TokenName[token.type],
                value,
                range: [token.start, token.end],
                loc
              });
            }
            return token;
          }
          function lex() {
            var token;
            token = lookahead;
            index = token.end;
            lineNumber = token.lineNumber;
            lineStart = token.lineStart;
            lookahead = typeof extra.tokens !== "undefined" ? collectToken() : advance();
            index = token.end;
            lineNumber = token.lineNumber;
            lineStart = token.lineStart;
            return token;
          }
          function peek() {
            var pos, line, start;
            pos = index;
            line = lineNumber;
            start = lineStart;
            lookahead = typeof extra.tokens !== "undefined" ? collectToken() : advance();
            index = pos;
            lineNumber = line;
            lineStart = start;
          }
          function Position(line, column) {
            this.line = line;
            this.column = column;
          }
          function SourceLocation(startLine, startColumn, line, column) {
            this.start = new Position(startLine, startColumn);
            this.end = new Position(line, column);
          }
          SyntaxTreeDelegate = {
            name: "SyntaxTree",
            processComment: function(node) {
              var lastChild, trailingComments;
              if (node.type === Syntax.Program) {
                if (node.body.length > 0) {
                  return;
                }
              }
              if (extra.trailingComments.length > 0) {
                if (extra.trailingComments[0].range[0] >= node.range[1]) {
                  trailingComments = extra.trailingComments;
                  extra.trailingComments = [];
                } else {
                  extra.trailingComments.length = 0;
                }
              } else {
                if (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments && extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments[0].range[0] >= node.range[1]) {
                  trailingComments = extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
                  delete extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
                }
              }
              while (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].range[0] >= node.range[0]) {
                lastChild = extra.bottomRightStack.pop();
              }
              if (lastChild) {
                if (lastChild.leadingComments && lastChild.leadingComments[lastChild.leadingComments.length - 1].range[1] <= node.range[0]) {
                  node.leadingComments = lastChild.leadingComments;
                  delete lastChild.leadingComments;
                }
              } else if (extra.leadingComments.length > 0 && extra.leadingComments[extra.leadingComments.length - 1].range[1] <= node.range[0]) {
                node.leadingComments = extra.leadingComments;
                extra.leadingComments = [];
              }
              if (trailingComments) {
                node.trailingComments = trailingComments;
              }
              extra.bottomRightStack.push(node);
            },
            markEnd: function(node, startToken) {
              if (extra.range) {
                node.range = [startToken.start, index];
              }
              if (extra.loc) {
                node.loc = new SourceLocation(
                  startToken.startLineNumber === void 0 ? startToken.lineNumber : startToken.startLineNumber,
                  startToken.start - (startToken.startLineStart === void 0 ? startToken.lineStart : startToken.startLineStart),
                  lineNumber,
                  index - lineStart
                );
                this.postProcess(node);
              }
              if (extra.attachComment) {
                this.processComment(node);
              }
              return node;
            },
            postProcess: function(node) {
              if (extra.source) {
                node.loc.source = extra.source;
              }
              return node;
            },
            createArrayExpression: function(elements) {
              return {
                type: Syntax.ArrayExpression,
                elements
              };
            },
            createAssignmentExpression: function(operator, left, right) {
              return {
                type: Syntax.AssignmentExpression,
                operator,
                left,
                right
              };
            },
            createBinaryExpression: function(operator, left, right) {
              var type = operator === "||" || operator === "&&" ? Syntax.LogicalExpression : Syntax.BinaryExpression;
              return {
                type,
                operator,
                left,
                right
              };
            },
            createBlockStatement: function(body) {
              return {
                type: Syntax.BlockStatement,
                body
              };
            },
            createBreakStatement: function(label) {
              return {
                type: Syntax.BreakStatement,
                label
              };
            },
            createCallExpression: function(callee, args) {
              return {
                type: Syntax.CallExpression,
                callee,
                "arguments": args
              };
            },
            createCatchClause: function(param, body) {
              return {
                type: Syntax.CatchClause,
                param,
                body
              };
            },
            createConditionalExpression: function(test, consequent, alternate) {
              return {
                type: Syntax.ConditionalExpression,
                test,
                consequent,
                alternate
              };
            },
            createContinueStatement: function(label) {
              return {
                type: Syntax.ContinueStatement,
                label
              };
            },
            createDebuggerStatement: function() {
              return {
                type: Syntax.DebuggerStatement
              };
            },
            createDoWhileStatement: function(body, test) {
              return {
                type: Syntax.DoWhileStatement,
                body,
                test
              };
            },
            createEmptyStatement: function() {
              return {
                type: Syntax.EmptyStatement
              };
            },
            createExpressionStatement: function(expression) {
              return {
                type: Syntax.ExpressionStatement,
                expression
              };
            },
            createForStatement: function(init, test, update, body) {
              return {
                type: Syntax.ForStatement,
                init,
                test,
                update,
                body
              };
            },
            createForInStatement: function(left, right, body) {
              return {
                type: Syntax.ForInStatement,
                left,
                right,
                body,
                each: false
              };
            },
            createFunctionDeclaration: function(id, params, defaults, body) {
              return {
                type: Syntax.FunctionDeclaration,
                id,
                params,
                defaults,
                body,
                rest: null,
                generator: false,
                expression: false
              };
            },
            createFunctionExpression: function(id, params, defaults, body) {
              return {
                type: Syntax.FunctionExpression,
                id,
                params,
                defaults,
                body,
                rest: null,
                generator: false,
                expression: false
              };
            },
            createIdentifier: function(name) {
              return {
                type: Syntax.Identifier,
                name
              };
            },
            createIfStatement: function(test, consequent, alternate) {
              return {
                type: Syntax.IfStatement,
                test,
                consequent,
                alternate
              };
            },
            createLabeledStatement: function(label, body) {
              return {
                type: Syntax.LabeledStatement,
                label,
                body
              };
            },
            createLiteral: function(token) {
              return {
                type: Syntax.Literal,
                value: token.value,
                raw: source.slice(token.start, token.end)
              };
            },
            createMemberExpression: function(accessor, object, property) {
              return {
                type: Syntax.MemberExpression,
                computed: accessor === "[",
                object,
                property
              };
            },
            createNewExpression: function(callee, args) {
              return {
                type: Syntax.NewExpression,
                callee,
                "arguments": args
              };
            },
            createObjectExpression: function(properties) {
              return {
                type: Syntax.ObjectExpression,
                properties
              };
            },
            createPostfixExpression: function(operator, argument) {
              return {
                type: Syntax.UpdateExpression,
                operator,
                argument,
                prefix: false
              };
            },
            createProgram: function(body) {
              return {
                type: Syntax.Program,
                body
              };
            },
            createProperty: function(kind, key, value) {
              return {
                type: Syntax.Property,
                key,
                value,
                kind
              };
            },
            createReturnStatement: function(argument) {
              return {
                type: Syntax.ReturnStatement,
                argument
              };
            },
            createSequenceExpression: function(expressions) {
              return {
                type: Syntax.SequenceExpression,
                expressions
              };
            },
            createSwitchCase: function(test, consequent) {
              return {
                type: Syntax.SwitchCase,
                test,
                consequent
              };
            },
            createSwitchStatement: function(discriminant, cases) {
              return {
                type: Syntax.SwitchStatement,
                discriminant,
                cases
              };
            },
            createThisExpression: function() {
              return {
                type: Syntax.ThisExpression
              };
            },
            createThrowStatement: function(argument) {
              return {
                type: Syntax.ThrowStatement,
                argument
              };
            },
            createTryStatement: function(block, guardedHandlers, handlers, finalizer) {
              return {
                type: Syntax.TryStatement,
                block,
                guardedHandlers,
                handlers,
                finalizer
              };
            },
            createUnaryExpression: function(operator, argument) {
              if (operator === "++" || operator === "--") {
                return {
                  type: Syntax.UpdateExpression,
                  operator,
                  argument,
                  prefix: true
                };
              }
              return {
                type: Syntax.UnaryExpression,
                operator,
                argument,
                prefix: true
              };
            },
            createVariableDeclaration: function(declarations, kind) {
              return {
                type: Syntax.VariableDeclaration,
                declarations,
                kind
              };
            },
            createVariableDeclarator: function(id, init) {
              return {
                type: Syntax.VariableDeclarator,
                id,
                init
              };
            },
            createWhileStatement: function(test, body) {
              return {
                type: Syntax.WhileStatement,
                test,
                body
              };
            },
            createWithStatement: function(object, body) {
              return {
                type: Syntax.WithStatement,
                object,
                body
              };
            }
          };
          function peekLineTerminator() {
            var pos, line, start, found;
            pos = index;
            line = lineNumber;
            start = lineStart;
            skipComment();
            found = lineNumber !== line;
            index = pos;
            lineNumber = line;
            lineStart = start;
            return found;
          }
          function throwError(token, messageFormat) {
            var error, args = Array.prototype.slice.call(arguments, 2), msg = messageFormat.replace(
              /%(\d)/g,
              function(whole, index2) {
                assert(index2 < args.length, "Message reference must be in range");
                return args[index2];
              }
            );
            if (typeof token.lineNumber === "number") {
              error = new Error("Line " + token.lineNumber + ": " + msg);
              error.index = token.start;
              error.lineNumber = token.lineNumber;
              error.column = token.start - lineStart + 1;
            } else {
              error = new Error("Line " + lineNumber + ": " + msg);
              error.index = index;
              error.lineNumber = lineNumber;
              error.column = index - lineStart + 1;
            }
            error.description = msg;
            throw error;
          }
          function throwErrorTolerant() {
            try {
              throwError.apply(null, arguments);
            } catch (e) {
              if (extra.errors) {
                extra.errors.push(e);
              } else {
                throw e;
              }
            }
          }
          function throwUnexpected(token) {
            if (token.type === Token.EOF) {
              throwError(token, Messages.UnexpectedEOS);
            }
            if (token.type === Token.NumericLiteral) {
              throwError(token, Messages.UnexpectedNumber);
            }
            if (token.type === Token.StringLiteral) {
              throwError(token, Messages.UnexpectedString);
            }
            if (token.type === Token.Identifier) {
              throwError(token, Messages.UnexpectedIdentifier);
            }
            if (token.type === Token.Keyword) {
              if (isFutureReservedWord(token.value)) {
                throwError(token, Messages.UnexpectedReserved);
              } else if (strict && isStrictModeReservedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictReservedWord);
                return;
              }
              throwError(token, Messages.UnexpectedToken, token.value);
            }
            throwError(token, Messages.UnexpectedToken, token.value);
          }
          function expect(value) {
            var token = lex();
            if (token.type !== Token.Punctuator || token.value !== value) {
              throwUnexpected(token);
            }
          }
          function expectKeyword(keyword) {
            var token = lex();
            if (token.type !== Token.Keyword || token.value !== keyword) {
              throwUnexpected(token);
            }
          }
          function match(value) {
            return lookahead.type === Token.Punctuator && lookahead.value === value;
          }
          function matchKeyword(keyword) {
            return lookahead.type === Token.Keyword && lookahead.value === keyword;
          }
          function matchAssign() {
            var op;
            if (lookahead.type !== Token.Punctuator) {
              return false;
            }
            op = lookahead.value;
            return op === "=" || op === "*=" || op === "/=" || op === "%=" || op === "+=" || op === "-=" || op === "<<=" || op === ">>=" || op === ">>>=" || op === "&=" || op === "^=" || op === "|=";
          }
          function consumeSemicolon() {
            var line;
            if (source.charCodeAt(index) === 59 || match(";")) {
              lex();
              return;
            }
            line = lineNumber;
            skipComment();
            if (lineNumber !== line) {
              return;
            }
            if (lookahead.type !== Token.EOF && !match("}")) {
              throwUnexpected(lookahead);
            }
          }
          function isLeftHandSide(expr) {
            return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
          }
          function parseArrayInitialiser() {
            var elements = [], startToken;
            startToken = lookahead;
            expect("[");
            while (!match("]")) {
              if (match(",")) {
                lex();
                elements.push(null);
              } else {
                elements.push(parseAssignmentExpression());
                if (!match("]")) {
                  expect(",");
                }
              }
            }
            lex();
            return delegate.markEnd(delegate.createArrayExpression(elements), startToken);
          }
          function parsePropertyFunction(param, first) {
            var previousStrict, body, startToken;
            previousStrict = strict;
            startToken = lookahead;
            body = parseFunctionSourceElements();
            if (first && strict && isRestrictedWord(param[0].name)) {
              throwErrorTolerant(first, Messages.StrictParamName);
            }
            strict = previousStrict;
            return delegate.markEnd(delegate.createFunctionExpression(null, param, [], body), startToken);
          }
          function parseObjectPropertyKey() {
            var token, startToken;
            startToken = lookahead;
            token = lex();
            if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
              if (strict && token.octal) {
                throwErrorTolerant(token, Messages.StrictOctalLiteral);
              }
              return delegate.markEnd(delegate.createLiteral(token), startToken);
            }
            return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
          }
          function parseObjectProperty() {
            var token, key, id, value, param, startToken;
            token = lookahead;
            startToken = lookahead;
            if (token.type === Token.Identifier) {
              id = parseObjectPropertyKey();
              if (token.value === "get" && !match(":")) {
                key = parseObjectPropertyKey();
                expect("(");
                expect(")");
                value = parsePropertyFunction([]);
                return delegate.markEnd(delegate.createProperty("get", key, value), startToken);
              }
              if (token.value === "set" && !match(":")) {
                key = parseObjectPropertyKey();
                expect("(");
                token = lookahead;
                if (token.type !== Token.Identifier) {
                  expect(")");
                  throwErrorTolerant(token, Messages.UnexpectedToken, token.value);
                  value = parsePropertyFunction([]);
                } else {
                  param = [parseVariableIdentifier()];
                  expect(")");
                  value = parsePropertyFunction(param, token);
                }
                return delegate.markEnd(delegate.createProperty("set", key, value), startToken);
              }
              expect(":");
              value = parseAssignmentExpression();
              return delegate.markEnd(delegate.createProperty("init", id, value), startToken);
            }
            if (token.type === Token.EOF || token.type === Token.Punctuator) {
              throwUnexpected(token);
            } else {
              key = parseObjectPropertyKey();
              expect(":");
              value = parseAssignmentExpression();
              return delegate.markEnd(delegate.createProperty("init", key, value), startToken);
            }
          }
          function parseObjectInitialiser() {
            var properties = [], property, name, key, kind, map = {}, toString = String, startToken;
            startToken = lookahead;
            expect("{");
            while (!match("}")) {
              property = parseObjectProperty();
              if (property.key.type === Syntax.Identifier) {
                name = property.key.name;
              } else {
                name = toString(property.key.value);
              }
              kind = property.kind === "init" ? PropertyKind.Data : property.kind === "get" ? PropertyKind.Get : PropertyKind.Set;
              key = "$" + name;
              if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (map[key] === PropertyKind.Data) {
                  if (strict && kind === PropertyKind.Data) {
                    throwErrorTolerant({}, Messages.StrictDuplicateProperty);
                  } else if (kind !== PropertyKind.Data) {
                    throwErrorTolerant({}, Messages.AccessorDataProperty);
                  }
                } else {
                  if (kind === PropertyKind.Data) {
                    throwErrorTolerant({}, Messages.AccessorDataProperty);
                  } else if (map[key] & kind) {
                    throwErrorTolerant({}, Messages.AccessorGetSet);
                  }
                }
                map[key] |= kind;
              } else {
                map[key] = kind;
              }
              properties.push(property);
              if (!match("}")) {
                expect(",");
              }
            }
            expect("}");
            return delegate.markEnd(delegate.createObjectExpression(properties), startToken);
          }
          function parseGroupExpression() {
            var expr;
            expect("(");
            expr = parseExpression();
            expect(")");
            return expr;
          }
          function parsePrimaryExpression() {
            var type, token, expr, startToken;
            if (match("(")) {
              return parseGroupExpression();
            }
            if (match("[")) {
              return parseArrayInitialiser();
            }
            if (match("{")) {
              return parseObjectInitialiser();
            }
            type = lookahead.type;
            startToken = lookahead;
            if (type === Token.Identifier) {
              expr = delegate.createIdentifier(lex().value);
            } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {
              if (strict && lookahead.octal) {
                throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
              }
              expr = delegate.createLiteral(lex());
            } else if (type === Token.Keyword) {
              if (matchKeyword("function")) {
                return parseFunctionExpression();
              }
              if (matchKeyword("this")) {
                lex();
                expr = delegate.createThisExpression();
              } else {
                throwUnexpected(lex());
              }
            } else if (type === Token.BooleanLiteral) {
              token = lex();
              token.value = token.value === "true";
              expr = delegate.createLiteral(token);
            } else if (type === Token.NullLiteral) {
              token = lex();
              token.value = null;
              expr = delegate.createLiteral(token);
            } else if (match("/") || match("/=")) {
              if (typeof extra.tokens !== "undefined") {
                expr = delegate.createLiteral(collectRegex());
              } else {
                expr = delegate.createLiteral(scanRegExp());
              }
              peek();
            } else {
              throwUnexpected(lex());
            }
            return delegate.markEnd(expr, startToken);
          }
          function parseArguments() {
            var args = [];
            expect("(");
            if (!match(")")) {
              while (index < length) {
                args.push(parseAssignmentExpression());
                if (match(")")) {
                  break;
                }
                expect(",");
              }
            }
            expect(")");
            return args;
          }
          function parseNonComputedProperty() {
            var token, startToken;
            startToken = lookahead;
            token = lex();
            if (!isIdentifierName(token)) {
              throwUnexpected(token);
            }
            return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
          }
          function parseNonComputedMember() {
            expect(".");
            return parseNonComputedProperty();
          }
          function parseComputedMember() {
            var expr;
            expect("[");
            expr = parseExpression();
            expect("]");
            return expr;
          }
          function parseNewExpression() {
            var callee, args, startToken;
            startToken = lookahead;
            expectKeyword("new");
            callee = parseLeftHandSideExpression();
            args = match("(") ? parseArguments() : [];
            return delegate.markEnd(delegate.createNewExpression(callee, args), startToken);
          }
          function parseLeftHandSideExpressionAllowCall() {
            var previousAllowIn, expr, args, property, startToken;
            startToken = lookahead;
            previousAllowIn = state.allowIn;
            state.allowIn = true;
            expr = matchKeyword("new") ? parseNewExpression() : parsePrimaryExpression();
            state.allowIn = previousAllowIn;
            for (; ; ) {
              if (match(".")) {
                property = parseNonComputedMember();
                expr = delegate.createMemberExpression(".", expr, property);
              } else if (match("(")) {
                args = parseArguments();
                expr = delegate.createCallExpression(expr, args);
              } else if (match("[")) {
                property = parseComputedMember();
                expr = delegate.createMemberExpression("[", expr, property);
              } else {
                break;
              }
              delegate.markEnd(expr, startToken);
            }
            return expr;
          }
          function parseLeftHandSideExpression() {
            var previousAllowIn, expr, property, startToken;
            startToken = lookahead;
            previousAllowIn = state.allowIn;
            expr = matchKeyword("new") ? parseNewExpression() : parsePrimaryExpression();
            state.allowIn = previousAllowIn;
            while (match(".") || match("[")) {
              if (match("[")) {
                property = parseComputedMember();
                expr = delegate.createMemberExpression("[", expr, property);
              } else {
                property = parseNonComputedMember();
                expr = delegate.createMemberExpression(".", expr, property);
              }
              delegate.markEnd(expr, startToken);
            }
            return expr;
          }
          function parsePostfixExpression() {
            var expr, token, startToken = lookahead;
            expr = parseLeftHandSideExpressionAllowCall();
            if (lookahead.type === Token.Punctuator) {
              if ((match("++") || match("--")) && !peekLineTerminator()) {
                if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                  throwErrorTolerant({}, Messages.StrictLHSPostfix);
                }
                if (!isLeftHandSide(expr)) {
                  throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
                }
                token = lex();
                expr = delegate.markEnd(delegate.createPostfixExpression(token.value, expr), startToken);
              }
            }
            return expr;
          }
          function parseUnaryExpression() {
            var token, expr, startToken;
            if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
              expr = parsePostfixExpression();
            } else if (match("++") || match("--")) {
              startToken = lookahead;
              token = lex();
              expr = parseUnaryExpression();
              if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwErrorTolerant({}, Messages.StrictLHSPrefix);
              }
              if (!isLeftHandSide(expr)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
              }
              expr = delegate.createUnaryExpression(token.value, expr);
              expr = delegate.markEnd(expr, startToken);
            } else if (match("+") || match("-") || match("~") || match("!")) {
              startToken = lookahead;
              token = lex();
              expr = parseUnaryExpression();
              expr = delegate.createUnaryExpression(token.value, expr);
              expr = delegate.markEnd(expr, startToken);
            } else if (matchKeyword("delete") || matchKeyword("void") || matchKeyword("typeof")) {
              startToken = lookahead;
              token = lex();
              expr = parseUnaryExpression();
              expr = delegate.createUnaryExpression(token.value, expr);
              expr = delegate.markEnd(expr, startToken);
              if (strict && expr.operator === "delete" && expr.argument.type === Syntax.Identifier) {
                throwErrorTolerant({}, Messages.StrictDelete);
              }
            } else {
              expr = parsePostfixExpression();
            }
            return expr;
          }
          function binaryPrecedence(token, allowIn) {
            var prec = 0;
            if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
              return 0;
            }
            switch (token.value) {
              case "||":
                prec = 1;
                break;
              case "&&":
                prec = 2;
                break;
              case "|":
                prec = 3;
                break;
              case "^":
                prec = 4;
                break;
              case "&":
                prec = 5;
                break;
              case "==":
              case "!=":
              case "===":
              case "!==":
                prec = 6;
                break;
              case "<":
              case ">":
              case "<=":
              case ">=":
              case "instanceof":
                prec = 7;
                break;
              case "in":
                prec = allowIn ? 7 : 0;
                break;
              case "<<":
              case ">>":
              case ">>>":
                prec = 8;
                break;
              case "+":
              case "-":
                prec = 9;
                break;
              case "*":
              case "/":
              case "%":
                prec = 11;
                break;
              default:
                break;
            }
            return prec;
          }
          function parseBinaryExpression() {
            var marker, markers, expr, token, prec, stack, right, operator, left, i;
            marker = lookahead;
            left = parseUnaryExpression();
            token = lookahead;
            prec = binaryPrecedence(token, state.allowIn);
            if (prec === 0) {
              return left;
            }
            token.prec = prec;
            lex();
            markers = [marker, lookahead];
            right = parseUnaryExpression();
            stack = [left, token, right];
            while ((prec = binaryPrecedence(lookahead, state.allowIn)) > 0) {
              while (stack.length > 2 && prec <= stack[stack.length - 2].prec) {
                right = stack.pop();
                operator = stack.pop().value;
                left = stack.pop();
                expr = delegate.createBinaryExpression(operator, left, right);
                markers.pop();
                marker = markers[markers.length - 1];
                delegate.markEnd(expr, marker);
                stack.push(expr);
              }
              token = lex();
              token.prec = prec;
              stack.push(token);
              markers.push(lookahead);
              expr = parseUnaryExpression();
              stack.push(expr);
            }
            i = stack.length - 1;
            expr = stack[i];
            markers.pop();
            while (i > 1) {
              expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
              i -= 2;
              marker = markers.pop();
              delegate.markEnd(expr, marker);
            }
            return expr;
          }
          function parseConditionalExpression() {
            var expr, previousAllowIn, consequent, alternate, startToken;
            startToken = lookahead;
            expr = parseBinaryExpression();
            if (match("?")) {
              lex();
              previousAllowIn = state.allowIn;
              state.allowIn = true;
              consequent = parseAssignmentExpression();
              state.allowIn = previousAllowIn;
              expect(":");
              alternate = parseAssignmentExpression();
              expr = delegate.createConditionalExpression(expr, consequent, alternate);
              delegate.markEnd(expr, startToken);
            }
            return expr;
          }
          function parseAssignmentExpression() {
            var token, left, right, node, startToken;
            token = lookahead;
            startToken = lookahead;
            node = left = parseConditionalExpression();
            if (matchAssign()) {
              if (!isLeftHandSide(left)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
              }
              if (strict && left.type === Syntax.Identifier && isRestrictedWord(left.name)) {
                throwErrorTolerant(token, Messages.StrictLHSAssignment);
              }
              token = lex();
              right = parseAssignmentExpression();
              node = delegate.markEnd(delegate.createAssignmentExpression(token.value, left, right), startToken);
            }
            return node;
          }
          function parseExpression() {
            var expr, startToken = lookahead;
            expr = parseAssignmentExpression();
            if (match(",")) {
              expr = delegate.createSequenceExpression([expr]);
              while (index < length) {
                if (!match(",")) {
                  break;
                }
                lex();
                expr.expressions.push(parseAssignmentExpression());
              }
              delegate.markEnd(expr, startToken);
            }
            return expr;
          }
          function parseStatementList() {
            var list = [], statement;
            while (index < length) {
              if (match("}")) {
                break;
              }
              statement = parseSourceElement();
              if (typeof statement === "undefined") {
                break;
              }
              list.push(statement);
            }
            return list;
          }
          function parseBlock() {
            var block, startToken;
            startToken = lookahead;
            expect("{");
            block = parseStatementList();
            expect("}");
            return delegate.markEnd(delegate.createBlockStatement(block), startToken);
          }
          function parseVariableIdentifier() {
            var token, startToken;
            startToken = lookahead;
            token = lex();
            if (token.type !== Token.Identifier) {
              throwUnexpected(token);
            }
            return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
          }
          function parseVariableDeclaration(kind) {
            var init = null, id, startToken;
            startToken = lookahead;
            id = parseVariableIdentifier();
            if (strict && isRestrictedWord(id.name)) {
              throwErrorTolerant({}, Messages.StrictVarName);
            }
            if (kind === "const") {
              expect("=");
              init = parseAssignmentExpression();
            } else if (match("=")) {
              lex();
              init = parseAssignmentExpression();
            }
            return delegate.markEnd(delegate.createVariableDeclarator(id, init), startToken);
          }
          function parseVariableDeclarationList(kind) {
            var list = [];
            do {
              list.push(parseVariableDeclaration(kind));
              if (!match(",")) {
                break;
              }
              lex();
            } while (index < length);
            return list;
          }
          function parseVariableStatement() {
            var declarations;
            expectKeyword("var");
            declarations = parseVariableDeclarationList();
            consumeSemicolon();
            return delegate.createVariableDeclaration(declarations, "var");
          }
          function parseConstLetDeclaration(kind) {
            var declarations, startToken;
            startToken = lookahead;
            expectKeyword(kind);
            declarations = parseVariableDeclarationList(kind);
            consumeSemicolon();
            return delegate.markEnd(delegate.createVariableDeclaration(declarations, kind), startToken);
          }
          function parseEmptyStatement() {
            expect(";");
            return delegate.createEmptyStatement();
          }
          function parseExpressionStatement() {
            var expr = parseExpression();
            consumeSemicolon();
            return delegate.createExpressionStatement(expr);
          }
          function parseIfStatement() {
            var test, consequent, alternate;
            expectKeyword("if");
            expect("(");
            test = parseExpression();
            expect(")");
            consequent = parseStatement();
            if (matchKeyword("else")) {
              lex();
              alternate = parseStatement();
            } else {
              alternate = null;
            }
            return delegate.createIfStatement(test, consequent, alternate);
          }
          function parseDoWhileStatement() {
            var body, test, oldInIteration;
            expectKeyword("do");
            oldInIteration = state.inIteration;
            state.inIteration = true;
            body = parseStatement();
            state.inIteration = oldInIteration;
            expectKeyword("while");
            expect("(");
            test = parseExpression();
            expect(")");
            if (match(";")) {
              lex();
            }
            return delegate.createDoWhileStatement(body, test);
          }
          function parseWhileStatement() {
            var test, body, oldInIteration;
            expectKeyword("while");
            expect("(");
            test = parseExpression();
            expect(")");
            oldInIteration = state.inIteration;
            state.inIteration = true;
            body = parseStatement();
            state.inIteration = oldInIteration;
            return delegate.createWhileStatement(test, body);
          }
          function parseForVariableDeclaration() {
            var token, declarations, startToken;
            startToken = lookahead;
            token = lex();
            declarations = parseVariableDeclarationList();
            return delegate.markEnd(delegate.createVariableDeclaration(declarations, token.value), startToken);
          }
          function parseForStatement() {
            var init, test, update, left, right, body, oldInIteration;
            init = test = update = null;
            expectKeyword("for");
            expect("(");
            if (match(";")) {
              lex();
            } else {
              if (matchKeyword("var") || matchKeyword("let")) {
                state.allowIn = false;
                init = parseForVariableDeclaration();
                state.allowIn = true;
                if (init.declarations.length === 1 && matchKeyword("in")) {
                  lex();
                  left = init;
                  right = parseExpression();
                  init = null;
                }
              } else {
                state.allowIn = false;
                init = parseExpression();
                state.allowIn = true;
                if (matchKeyword("in")) {
                  if (!isLeftHandSide(init)) {
                    throwErrorTolerant({}, Messages.InvalidLHSInForIn);
                  }
                  lex();
                  left = init;
                  right = parseExpression();
                  init = null;
                }
              }
              if (typeof left === "undefined") {
                expect(";");
              }
            }
            if (typeof left === "undefined") {
              if (!match(";")) {
                test = parseExpression();
              }
              expect(";");
              if (!match(")")) {
                update = parseExpression();
              }
            }
            expect(")");
            oldInIteration = state.inIteration;
            state.inIteration = true;
            body = parseStatement();
            state.inIteration = oldInIteration;
            return typeof left === "undefined" ? delegate.createForStatement(init, test, update, body) : delegate.createForInStatement(left, right, body);
          }
          function parseContinueStatement() {
            var label = null, key;
            expectKeyword("continue");
            if (source.charCodeAt(index) === 59) {
              lex();
              if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
              }
              return delegate.createContinueStatement(null);
            }
            if (peekLineTerminator()) {
              if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
              }
              return delegate.createContinueStatement(null);
            }
            if (lookahead.type === Token.Identifier) {
              label = parseVariableIdentifier();
              key = "$" + label.name;
              if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.UnknownLabel, label.name);
              }
            }
            consumeSemicolon();
            if (label === null && !state.inIteration) {
              throwError({}, Messages.IllegalContinue);
            }
            return delegate.createContinueStatement(label);
          }
          function parseBreakStatement() {
            var label = null, key;
            expectKeyword("break");
            if (source.charCodeAt(index) === 59) {
              lex();
              if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
              }
              return delegate.createBreakStatement(null);
            }
            if (peekLineTerminator()) {
              if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
              }
              return delegate.createBreakStatement(null);
            }
            if (lookahead.type === Token.Identifier) {
              label = parseVariableIdentifier();
              key = "$" + label.name;
              if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.UnknownLabel, label.name);
              }
            }
            consumeSemicolon();
            if (label === null && !(state.inIteration || state.inSwitch)) {
              throwError({}, Messages.IllegalBreak);
            }
            return delegate.createBreakStatement(label);
          }
          function parseReturnStatement() {
            var argument = null;
            expectKeyword("return");
            if (!state.inFunctionBody) {
              throwErrorTolerant({}, Messages.IllegalReturn);
            }
            if (source.charCodeAt(index) === 32) {
              if (isIdentifierStart(source.charCodeAt(index + 1))) {
                argument = parseExpression();
                consumeSemicolon();
                return delegate.createReturnStatement(argument);
              }
            }
            if (peekLineTerminator()) {
              return delegate.createReturnStatement(null);
            }
            if (!match(";")) {
              if (!match("}") && lookahead.type !== Token.EOF) {
                argument = parseExpression();
              }
            }
            consumeSemicolon();
            return delegate.createReturnStatement(argument);
          }
          function parseWithStatement() {
            var object, body;
            if (strict) {
              skipComment();
              throwErrorTolerant({}, Messages.StrictModeWith);
            }
            expectKeyword("with");
            expect("(");
            object = parseExpression();
            expect(")");
            body = parseStatement();
            return delegate.createWithStatement(object, body);
          }
          function parseSwitchCase() {
            var test, consequent = [], statement, startToken;
            startToken = lookahead;
            if (matchKeyword("default")) {
              lex();
              test = null;
            } else {
              expectKeyword("case");
              test = parseExpression();
            }
            expect(":");
            while (index < length) {
              if (match("}") || matchKeyword("default") || matchKeyword("case")) {
                break;
              }
              statement = parseStatement();
              consequent.push(statement);
            }
            return delegate.markEnd(delegate.createSwitchCase(test, consequent), startToken);
          }
          function parseSwitchStatement() {
            var discriminant, cases, clause, oldInSwitch, defaultFound;
            expectKeyword("switch");
            expect("(");
            discriminant = parseExpression();
            expect(")");
            expect("{");
            cases = [];
            if (match("}")) {
              lex();
              return delegate.createSwitchStatement(discriminant, cases);
            }
            oldInSwitch = state.inSwitch;
            state.inSwitch = true;
            defaultFound = false;
            while (index < length) {
              if (match("}")) {
                break;
              }
              clause = parseSwitchCase();
              if (clause.test === null) {
                if (defaultFound) {
                  throwError({}, Messages.MultipleDefaultsInSwitch);
                }
                defaultFound = true;
              }
              cases.push(clause);
            }
            state.inSwitch = oldInSwitch;
            expect("}");
            return delegate.createSwitchStatement(discriminant, cases);
          }
          function parseThrowStatement() {
            var argument;
            expectKeyword("throw");
            if (peekLineTerminator()) {
              throwError({}, Messages.NewlineAfterThrow);
            }
            argument = parseExpression();
            consumeSemicolon();
            return delegate.createThrowStatement(argument);
          }
          function parseCatchClause() {
            var param, body, startToken;
            startToken = lookahead;
            expectKeyword("catch");
            expect("(");
            if (match(")")) {
              throwUnexpected(lookahead);
            }
            param = parseVariableIdentifier();
            if (strict && isRestrictedWord(param.name)) {
              throwErrorTolerant({}, Messages.StrictCatchVariable);
            }
            expect(")");
            body = parseBlock();
            return delegate.markEnd(delegate.createCatchClause(param, body), startToken);
          }
          function parseTryStatement() {
            var block, handlers = [], finalizer = null;
            expectKeyword("try");
            block = parseBlock();
            if (matchKeyword("catch")) {
              handlers.push(parseCatchClause());
            }
            if (matchKeyword("finally")) {
              lex();
              finalizer = parseBlock();
            }
            if (handlers.length === 0 && !finalizer) {
              throwError({}, Messages.NoCatchOrFinally);
            }
            return delegate.createTryStatement(block, [], handlers, finalizer);
          }
          function parseDebuggerStatement() {
            expectKeyword("debugger");
            consumeSemicolon();
            return delegate.createDebuggerStatement();
          }
          function parseStatement() {
            var type = lookahead.type, expr, labeledBody, key, startToken;
            if (type === Token.EOF) {
              throwUnexpected(lookahead);
            }
            if (type === Token.Punctuator && lookahead.value === "{") {
              return parseBlock();
            }
            startToken = lookahead;
            if (type === Token.Punctuator) {
              switch (lookahead.value) {
                case ";":
                  return delegate.markEnd(parseEmptyStatement(), startToken);
                case "(":
                  return delegate.markEnd(parseExpressionStatement(), startToken);
                default:
                  break;
              }
            }
            if (type === Token.Keyword) {
              switch (lookahead.value) {
                case "break":
                  return delegate.markEnd(parseBreakStatement(), startToken);
                case "continue":
                  return delegate.markEnd(parseContinueStatement(), startToken);
                case "debugger":
                  return delegate.markEnd(parseDebuggerStatement(), startToken);
                case "do":
                  return delegate.markEnd(parseDoWhileStatement(), startToken);
                case "for":
                  return delegate.markEnd(parseForStatement(), startToken);
                case "function":
                  return delegate.markEnd(parseFunctionDeclaration(), startToken);
                case "if":
                  return delegate.markEnd(parseIfStatement(), startToken);
                case "return":
                  return delegate.markEnd(parseReturnStatement(), startToken);
                case "switch":
                  return delegate.markEnd(parseSwitchStatement(), startToken);
                case "throw":
                  return delegate.markEnd(parseThrowStatement(), startToken);
                case "try":
                  return delegate.markEnd(parseTryStatement(), startToken);
                case "var":
                  return delegate.markEnd(parseVariableStatement(), startToken);
                case "while":
                  return delegate.markEnd(parseWhileStatement(), startToken);
                case "with":
                  return delegate.markEnd(parseWithStatement(), startToken);
                default:
                  break;
              }
            }
            expr = parseExpression();
            if (expr.type === Syntax.Identifier && match(":")) {
              lex();
              key = "$" + expr.name;
              if (Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.Redeclaration, "Label", expr.name);
              }
              state.labelSet[key] = true;
              labeledBody = parseStatement();
              delete state.labelSet[key];
              return delegate.markEnd(delegate.createLabeledStatement(expr, labeledBody), startToken);
            }
            consumeSemicolon();
            return delegate.markEnd(delegate.createExpressionStatement(expr), startToken);
          }
          function parseFunctionSourceElements() {
            var sourceElement, sourceElements = [], token, directive, firstRestricted, oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody, startToken;
            startToken = lookahead;
            expect("{");
            while (index < length) {
              if (lookahead.type !== Token.StringLiteral) {
                break;
              }
              token = lookahead;
              sourceElement = parseSourceElement();
              sourceElements.push(sourceElement);
              if (sourceElement.expression.type !== Syntax.Literal) {
                break;
              }
              directive = source.slice(token.start + 1, token.end - 1);
              if (directive === "use strict") {
                strict = true;
                if (firstRestricted) {
                  throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
                }
              } else {
                if (!firstRestricted && token.octal) {
                  firstRestricted = token;
                }
              }
            }
            oldLabelSet = state.labelSet;
            oldInIteration = state.inIteration;
            oldInSwitch = state.inSwitch;
            oldInFunctionBody = state.inFunctionBody;
            state.labelSet = {};
            state.inIteration = false;
            state.inSwitch = false;
            state.inFunctionBody = true;
            while (index < length) {
              if (match("}")) {
                break;
              }
              sourceElement = parseSourceElement();
              if (typeof sourceElement === "undefined") {
                break;
              }
              sourceElements.push(sourceElement);
            }
            expect("}");
            state.labelSet = oldLabelSet;
            state.inIteration = oldInIteration;
            state.inSwitch = oldInSwitch;
            state.inFunctionBody = oldInFunctionBody;
            return delegate.markEnd(delegate.createBlockStatement(sourceElements), startToken);
          }
          function parseParams(firstRestricted) {
            var param, params = [], token, stricted, paramSet, key, message;
            expect("(");
            if (!match(")")) {
              paramSet = {};
              while (index < length) {
                token = lookahead;
                param = parseVariableIdentifier();
                key = "$" + token.value;
                if (strict) {
                  if (isRestrictedWord(token.value)) {
                    stricted = token;
                    message = Messages.StrictParamName;
                  }
                  if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                    stricted = token;
                    message = Messages.StrictParamDupe;
                  }
                } else if (!firstRestricted) {
                  if (isRestrictedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictParamName;
                  } else if (isStrictModeReservedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictReservedWord;
                  } else if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                    firstRestricted = token;
                    message = Messages.StrictParamDupe;
                  }
                }
                params.push(param);
                paramSet[key] = true;
                if (match(")")) {
                  break;
                }
                expect(",");
              }
            }
            expect(")");
            return {
              params,
              stricted,
              firstRestricted,
              message
            };
          }
          function parseFunctionDeclaration() {
            var id, params = [], body, token, stricted, tmp, firstRestricted, message, previousStrict, startToken;
            startToken = lookahead;
            expectKeyword("function");
            token = lookahead;
            id = parseVariableIdentifier();
            if (strict) {
              if (isRestrictedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictFunctionName);
              }
            } else {
              if (isRestrictedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictFunctionName;
              } else if (isStrictModeReservedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictReservedWord;
              }
            }
            tmp = parseParams(firstRestricted);
            params = tmp.params;
            stricted = tmp.stricted;
            firstRestricted = tmp.firstRestricted;
            if (tmp.message) {
              message = tmp.message;
            }
            previousStrict = strict;
            body = parseFunctionSourceElements();
            if (strict && firstRestricted) {
              throwError(firstRestricted, message);
            }
            if (strict && stricted) {
              throwErrorTolerant(stricted, message);
            }
            strict = previousStrict;
            return delegate.markEnd(delegate.createFunctionDeclaration(id, params, [], body), startToken);
          }
          function parseFunctionExpression() {
            var token, id = null, stricted, firstRestricted, message, tmp, params = [], body, previousStrict, startToken;
            startToken = lookahead;
            expectKeyword("function");
            if (!match("(")) {
              token = lookahead;
              id = parseVariableIdentifier();
              if (strict) {
                if (isRestrictedWord(token.value)) {
                  throwErrorTolerant(token, Messages.StrictFunctionName);
                }
              } else {
                if (isRestrictedWord(token.value)) {
                  firstRestricted = token;
                  message = Messages.StrictFunctionName;
                } else if (isStrictModeReservedWord(token.value)) {
                  firstRestricted = token;
                  message = Messages.StrictReservedWord;
                }
              }
            }
            tmp = parseParams(firstRestricted);
            params = tmp.params;
            stricted = tmp.stricted;
            firstRestricted = tmp.firstRestricted;
            if (tmp.message) {
              message = tmp.message;
            }
            previousStrict = strict;
            body = parseFunctionSourceElements();
            if (strict && firstRestricted) {
              throwError(firstRestricted, message);
            }
            if (strict && stricted) {
              throwErrorTolerant(stricted, message);
            }
            strict = previousStrict;
            return delegate.markEnd(delegate.createFunctionExpression(id, params, [], body), startToken);
          }
          function parseSourceElement() {
            if (lookahead.type === Token.Keyword) {
              switch (lookahead.value) {
                case "const":
                case "let":
                  return parseConstLetDeclaration(lookahead.value);
                case "function":
                  return parseFunctionDeclaration();
                default:
                  return parseStatement();
              }
            }
            if (lookahead.type !== Token.EOF) {
              return parseStatement();
            }
          }
          function parseSourceElements() {
            var sourceElement, sourceElements = [], token, directive, firstRestricted;
            while (index < length) {
              token = lookahead;
              if (token.type !== Token.StringLiteral) {
                break;
              }
              sourceElement = parseSourceElement();
              sourceElements.push(sourceElement);
              if (sourceElement.expression.type !== Syntax.Literal) {
                break;
              }
              directive = source.slice(token.start + 1, token.end - 1);
              if (directive === "use strict") {
                strict = true;
                if (firstRestricted) {
                  throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
                }
              } else {
                if (!firstRestricted && token.octal) {
                  firstRestricted = token;
                }
              }
            }
            while (index < length) {
              sourceElement = parseSourceElement();
              if (typeof sourceElement === "undefined") {
                break;
              }
              sourceElements.push(sourceElement);
            }
            return sourceElements;
          }
          function parseProgram() {
            var body, startToken;
            skipComment();
            peek();
            startToken = lookahead;
            strict = false;
            body = parseSourceElements();
            return delegate.markEnd(delegate.createProgram(body), startToken);
          }
          function filterTokenLocation() {
            var i, entry, token, tokens = [];
            for (i = 0; i < extra.tokens.length; ++i) {
              entry = extra.tokens[i];
              token = {
                type: entry.type,
                value: entry.value
              };
              if (extra.range) {
                token.range = entry.range;
              }
              if (extra.loc) {
                token.loc = entry.loc;
              }
              tokens.push(token);
            }
            extra.tokens = tokens;
          }
          function tokenize(code, options) {
            var toString, token, tokens;
            toString = String;
            if (typeof code !== "string" && !(code instanceof String)) {
              code = toString(code);
            }
            delegate = SyntaxTreeDelegate;
            source = code;
            index = 0;
            lineNumber = source.length > 0 ? 1 : 0;
            lineStart = 0;
            length = source.length;
            lookahead = null;
            state = {
              allowIn: true,
              labelSet: {},
              inFunctionBody: false,
              inIteration: false,
              inSwitch: false,
              lastCommentStart: -1
            };
            extra = {};
            options = options || {};
            options.tokens = true;
            extra.tokens = [];
            extra.tokenize = true;
            extra.openParenToken = -1;
            extra.openCurlyToken = -1;
            extra.range = typeof options.range === "boolean" && options.range;
            extra.loc = typeof options.loc === "boolean" && options.loc;
            if (typeof options.comment === "boolean" && options.comment) {
              extra.comments = [];
            }
            if (typeof options.tolerant === "boolean" && options.tolerant) {
              extra.errors = [];
            }
            try {
              peek();
              if (lookahead.type === Token.EOF) {
                return extra.tokens;
              }
              token = lex();
              while (lookahead.type !== Token.EOF) {
                try {
                  token = lex();
                } catch (lexError) {
                  token = lookahead;
                  if (extra.errors) {
                    extra.errors.push(lexError);
                    break;
                  } else {
                    throw lexError;
                  }
                }
              }
              filterTokenLocation();
              tokens = extra.tokens;
              if (typeof extra.comments !== "undefined") {
                tokens.comments = extra.comments;
              }
              if (typeof extra.errors !== "undefined") {
                tokens.errors = extra.errors;
              }
            } catch (e) {
              throw e;
            } finally {
              extra = {};
            }
            return tokens;
          }
          function parse(code, options) {
            var program, toString;
            toString = String;
            if (typeof code !== "string" && !(code instanceof String)) {
              code = toString(code);
            }
            delegate = SyntaxTreeDelegate;
            source = code;
            index = 0;
            lineNumber = source.length > 0 ? 1 : 0;
            lineStart = 0;
            length = source.length;
            lookahead = null;
            state = {
              allowIn: true,
              labelSet: {},
              inFunctionBody: false,
              inIteration: false,
              inSwitch: false,
              lastCommentStart: -1
            };
            extra = {};
            if (typeof options !== "undefined") {
              extra.range = typeof options.range === "boolean" && options.range;
              extra.loc = typeof options.loc === "boolean" && options.loc;
              extra.attachComment = typeof options.attachComment === "boolean" && options.attachComment;
              if (extra.loc && options.source !== null && options.source !== void 0) {
                extra.source = toString(options.source);
              }
              if (typeof options.tokens === "boolean" && options.tokens) {
                extra.tokens = [];
              }
              if (typeof options.comment === "boolean" && options.comment) {
                extra.comments = [];
              }
              if (typeof options.tolerant === "boolean" && options.tolerant) {
                extra.errors = [];
              }
              if (extra.attachComment) {
                extra.range = true;
                extra.comments = [];
                extra.bottomRightStack = [];
                extra.trailingComments = [];
                extra.leadingComments = [];
              }
            }
            try {
              program = parseProgram();
              if (typeof extra.comments !== "undefined") {
                program.comments = extra.comments;
              }
              if (typeof extra.tokens !== "undefined") {
                filterTokenLocation();
                program.tokens = extra.tokens;
              }
              if (typeof extra.errors !== "undefined") {
                program.errors = extra.errors;
              }
            } catch (e) {
              throw e;
            } finally {
              extra = {};
            }
            return program;
          }
          exports4.version = "1.2.2";
          exports4.tokenize = tokenize;
          exports4.parse = parse;
          exports4.Syntax = function() {
            var name, types = {};
            if (typeof Object.create === "function") {
              types = /* @__PURE__ */ Object.create(null);
            }
            for (name in Syntax) {
              if (Syntax.hasOwnProperty(name)) {
                types[name] = Syntax[name];
              }
            }
            if (typeof Object.freeze === "function") {
              Object.freeze(types);
            }
            return types;
          }();
        });
      }, {}], 1: [function(require2, module4, exports3) {
        (function(process) {
          var parser = function() {
            var parser2 = {
              trace: function trace() {
              },
              yy: {},
              symbols_: { "error": 2, "JSON_PATH": 3, "DOLLAR": 4, "PATH_COMPONENTS": 5, "LEADING_CHILD_MEMBER_EXPRESSION": 6, "PATH_COMPONENT": 7, "MEMBER_COMPONENT": 8, "SUBSCRIPT_COMPONENT": 9, "CHILD_MEMBER_COMPONENT": 10, "DESCENDANT_MEMBER_COMPONENT": 11, "DOT": 12, "MEMBER_EXPRESSION": 13, "DOT_DOT": 14, "STAR": 15, "IDENTIFIER": 16, "SCRIPT_EXPRESSION": 17, "INTEGER": 18, "END": 19, "CHILD_SUBSCRIPT_COMPONENT": 20, "DESCENDANT_SUBSCRIPT_COMPONENT": 21, "[": 22, "SUBSCRIPT": 23, "]": 24, "SUBSCRIPT_EXPRESSION": 25, "SUBSCRIPT_EXPRESSION_LIST": 26, "SUBSCRIPT_EXPRESSION_LISTABLE": 27, ",": 28, "STRING_LITERAL": 29, "ARRAY_SLICE": 30, "FILTER_EXPRESSION": 31, "QQ_STRING": 32, "Q_STRING": 33, "$accept": 0, "$end": 1 },
              terminals_: { 2: "error", 4: "DOLLAR", 12: "DOT", 14: "DOT_DOT", 15: "STAR", 16: "IDENTIFIER", 17: "SCRIPT_EXPRESSION", 18: "INTEGER", 19: "END", 22: "[", 24: "]", 28: ",", 30: "ARRAY_SLICE", 31: "FILTER_EXPRESSION", 32: "QQ_STRING", 33: "Q_STRING" },
              productions_: [0, [3, 1], [3, 2], [3, 1], [3, 2], [5, 1], [5, 2], [7, 1], [7, 1], [8, 1], [8, 1], [10, 2], [6, 1], [11, 2], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [9, 1], [9, 1], [20, 3], [21, 4], [23, 1], [23, 1], [26, 1], [26, 3], [27, 1], [27, 1], [27, 1], [25, 1], [25, 1], [25, 1], [29, 1], [29, 1]],
              performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
                if (!yy.ast) {
                  yy.ast = _ast;
                  _ast.initialize();
                }
                var $0 = $$.length - 1;
                switch (yystate) {
                  case 1:
                    yy.ast.set({ expression: { type: "root", value: $$[$0] } });
                    yy.ast.unshift();
                    return yy.ast.yield();
                    break;
                  case 2:
                    yy.ast.set({ expression: { type: "root", value: $$[$0 - 1] } });
                    yy.ast.unshift();
                    return yy.ast.yield();
                    break;
                  case 3:
                    yy.ast.unshift();
                    return yy.ast.yield();
                    break;
                  case 4:
                    yy.ast.set({ operation: "member", scope: "child", expression: { type: "identifier", value: $$[$0 - 1] } });
                    yy.ast.unshift();
                    return yy.ast.yield();
                    break;
                  case 5:
                    break;
                  case 6:
                    break;
                  case 7:
                    yy.ast.set({ operation: "member" });
                    yy.ast.push();
                    break;
                  case 8:
                    yy.ast.set({ operation: "subscript" });
                    yy.ast.push();
                    break;
                  case 9:
                    yy.ast.set({ scope: "child" });
                    break;
                  case 10:
                    yy.ast.set({ scope: "descendant" });
                    break;
                  case 11:
                    break;
                  case 12:
                    yy.ast.set({ scope: "child", operation: "member" });
                    break;
                  case 13:
                    break;
                  case 14:
                    yy.ast.set({ expression: { type: "wildcard", value: $$[$0] } });
                    break;
                  case 15:
                    yy.ast.set({ expression: { type: "identifier", value: $$[$0] } });
                    break;
                  case 16:
                    yy.ast.set({ expression: { type: "script_expression", value: $$[$0] } });
                    break;
                  case 17:
                    yy.ast.set({ expression: { type: "numeric_literal", value: parseInt($$[$0]) } });
                    break;
                  case 18:
                    break;
                  case 19:
                    yy.ast.set({ scope: "child" });
                    break;
                  case 20:
                    yy.ast.set({ scope: "descendant" });
                    break;
                  case 21:
                    break;
                  case 22:
                    break;
                  case 23:
                    break;
                  case 24:
                    $$[$0].length > 1 ? yy.ast.set({ expression: { type: "union", value: $$[$0] } }) : this.$ = $$[$0];
                    break;
                  case 25:
                    this.$ = [$$[$0]];
                    break;
                  case 26:
                    this.$ = $$[$0 - 2].concat($$[$0]);
                    break;
                  case 27:
                    this.$ = { expression: { type: "numeric_literal", value: parseInt($$[$0]) } };
                    yy.ast.set(this.$);
                    break;
                  case 28:
                    this.$ = { expression: { type: "string_literal", value: $$[$0] } };
                    yy.ast.set(this.$);
                    break;
                  case 29:
                    this.$ = { expression: { type: "slice", value: $$[$0] } };
                    yy.ast.set(this.$);
                    break;
                  case 30:
                    this.$ = { expression: { type: "wildcard", value: $$[$0] } };
                    yy.ast.set(this.$);
                    break;
                  case 31:
                    this.$ = { expression: { type: "script_expression", value: $$[$0] } };
                    yy.ast.set(this.$);
                    break;
                  case 32:
                    this.$ = { expression: { type: "filter_expression", value: $$[$0] } };
                    yy.ast.set(this.$);
                    break;
                  case 33:
                    this.$ = $$[$0];
                    break;
                  case 34:
                    this.$ = $$[$0];
                    break;
                }
              },
              table: [{ 3: 1, 4: [1, 2], 6: 3, 13: 4, 15: [1, 5], 16: [1, 6], 17: [1, 7], 18: [1, 8], 19: [1, 9] }, { 1: [3] }, { 1: [2, 1], 5: 10, 7: 11, 8: 12, 9: 13, 10: 14, 11: 15, 12: [1, 18], 14: [1, 19], 20: 16, 21: 17, 22: [1, 20] }, { 1: [2, 3], 5: 21, 7: 11, 8: 12, 9: 13, 10: 14, 11: 15, 12: [1, 18], 14: [1, 19], 20: 16, 21: 17, 22: [1, 20] }, { 1: [2, 12], 12: [2, 12], 14: [2, 12], 22: [2, 12] }, { 1: [2, 14], 12: [2, 14], 14: [2, 14], 22: [2, 14] }, { 1: [2, 15], 12: [2, 15], 14: [2, 15], 22: [2, 15] }, { 1: [2, 16], 12: [2, 16], 14: [2, 16], 22: [2, 16] }, { 1: [2, 17], 12: [2, 17], 14: [2, 17], 22: [2, 17] }, { 1: [2, 18], 12: [2, 18], 14: [2, 18], 22: [2, 18] }, { 1: [2, 2], 7: 22, 8: 12, 9: 13, 10: 14, 11: 15, 12: [1, 18], 14: [1, 19], 20: 16, 21: 17, 22: [1, 20] }, { 1: [2, 5], 12: [2, 5], 14: [2, 5], 22: [2, 5] }, { 1: [2, 7], 12: [2, 7], 14: [2, 7], 22: [2, 7] }, { 1: [2, 8], 12: [2, 8], 14: [2, 8], 22: [2, 8] }, { 1: [2, 9], 12: [2, 9], 14: [2, 9], 22: [2, 9] }, { 1: [2, 10], 12: [2, 10], 14: [2, 10], 22: [2, 10] }, { 1: [2, 19], 12: [2, 19], 14: [2, 19], 22: [2, 19] }, { 1: [2, 20], 12: [2, 20], 14: [2, 20], 22: [2, 20] }, { 13: 23, 15: [1, 5], 16: [1, 6], 17: [1, 7], 18: [1, 8], 19: [1, 9] }, { 13: 24, 15: [1, 5], 16: [1, 6], 17: [1, 7], 18: [1, 8], 19: [1, 9], 22: [1, 25] }, { 15: [1, 29], 17: [1, 30], 18: [1, 33], 23: 26, 25: 27, 26: 28, 27: 32, 29: 34, 30: [1, 35], 31: [1, 31], 32: [1, 36], 33: [1, 37] }, { 1: [2, 4], 7: 22, 8: 12, 9: 13, 10: 14, 11: 15, 12: [1, 18], 14: [1, 19], 20: 16, 21: 17, 22: [1, 20] }, { 1: [2, 6], 12: [2, 6], 14: [2, 6], 22: [2, 6] }, { 1: [2, 11], 12: [2, 11], 14: [2, 11], 22: [2, 11] }, { 1: [2, 13], 12: [2, 13], 14: [2, 13], 22: [2, 13] }, { 15: [1, 29], 17: [1, 30], 18: [1, 33], 23: 38, 25: 27, 26: 28, 27: 32, 29: 34, 30: [1, 35], 31: [1, 31], 32: [1, 36], 33: [1, 37] }, { 24: [1, 39] }, { 24: [2, 23] }, { 24: [2, 24], 28: [1, 40] }, { 24: [2, 30] }, { 24: [2, 31] }, { 24: [2, 32] }, { 24: [2, 25], 28: [2, 25] }, { 24: [2, 27], 28: [2, 27] }, { 24: [2, 28], 28: [2, 28] }, { 24: [2, 29], 28: [2, 29] }, { 24: [2, 33], 28: [2, 33] }, { 24: [2, 34], 28: [2, 34] }, { 24: [1, 41] }, { 1: [2, 21], 12: [2, 21], 14: [2, 21], 22: [2, 21] }, { 18: [1, 33], 27: 42, 29: 34, 30: [1, 35], 32: [1, 36], 33: [1, 37] }, { 1: [2, 22], 12: [2, 22], 14: [2, 22], 22: [2, 22] }, { 24: [2, 26], 28: [2, 26] }],
              defaultActions: { 27: [2, 23], 29: [2, 30], 30: [2, 31], 31: [2, 32] },
              parseError: function parseError(str, hash) {
                if (hash.recoverable) {
                  this.trace(str);
                } else {
                  throw new Error(str);
                }
              },
              parse: function parse(input) {
                var self2 = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
                var args = lstack.slice.call(arguments, 1);
                this.lexer.setInput(input);
                this.lexer.yy = this.yy;
                this.yy.lexer = this.lexer;
                this.yy.parser = this;
                if (typeof this.lexer.yylloc == "undefined") {
                  this.lexer.yylloc = {};
                }
                var yyloc = this.lexer.yylloc;
                lstack.push(yyloc);
                var ranges = this.lexer.options && this.lexer.options.ranges;
                if (typeof this.yy.parseError === "function") {
                  this.parseError = this.yy.parseError;
                } else {
                  this.parseError = Object.getPrototypeOf(this).parseError;
                }
                function popStack(n) {
                  stack.length = stack.length - 2 * n;
                  vstack.length = vstack.length - n;
                  lstack.length = lstack.length - n;
                }
                function lex() {
                  var token;
                  token = self2.lexer.lex() || EOF;
                  if (typeof token !== "number") {
                    token = self2.symbols_[token] || token;
                  }
                  return token;
                }
                var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
                while (true) {
                  state = stack[stack.length - 1];
                  if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                  } else {
                    if (symbol === null || typeof symbol == "undefined") {
                      symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                  }
                  if (typeof action === "undefined" || !action.length || !action[0]) {
                    var errStr = "";
                    expected = [];
                    for (p in table[state]) {
                      if (this.terminals_[p] && p > TERROR) {
                        expected.push("'" + this.terminals_[p] + "'");
                      }
                    }
                    if (this.lexer.showPosition) {
                      errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                    } else {
                      errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                    }
                    this.parseError(errStr, {
                      text: this.lexer.match,
                      token: this.terminals_[symbol] || symbol,
                      line: this.lexer.yylineno,
                      loc: yyloc,
                      expected
                    });
                  }
                  if (action[0] instanceof Array && action.length > 1) {
                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                  }
                  switch (action[0]) {
                    case 1:
                      stack.push(symbol);
                      vstack.push(this.lexer.yytext);
                      lstack.push(this.lexer.yylloc);
                      stack.push(action[1]);
                      symbol = null;
                      if (!preErrorSymbol) {
                        yyleng = this.lexer.yyleng;
                        yytext = this.lexer.yytext;
                        yylineno = this.lexer.yylineno;
                        yyloc = this.lexer.yylloc;
                        if (recovering > 0) {
                          recovering--;
                        }
                      } else {
                        symbol = preErrorSymbol;
                        preErrorSymbol = null;
                      }
                      break;
                    case 2:
                      len = this.productions_[action[1]][1];
                      yyval.$ = vstack[vstack.length - len];
                      yyval._$ = {
                        first_line: lstack[lstack.length - (len || 1)].first_line,
                        last_line: lstack[lstack.length - 1].last_line,
                        first_column: lstack[lstack.length - (len || 1)].first_column,
                        last_column: lstack[lstack.length - 1].last_column
                      };
                      if (ranges) {
                        yyval._$.range = [
                          lstack[lstack.length - (len || 1)].range[0],
                          lstack[lstack.length - 1].range[1]
                        ];
                      }
                      r = this.performAction.apply(yyval, [
                        yytext,
                        yyleng,
                        yylineno,
                        this.yy,
                        action[1],
                        vstack,
                        lstack
                      ].concat(args));
                      if (typeof r !== "undefined") {
                        return r;
                      }
                      if (len) {
                        stack = stack.slice(0, -1 * len * 2);
                        vstack = vstack.slice(0, -1 * len);
                        lstack = lstack.slice(0, -1 * len);
                      }
                      stack.push(this.productions_[action[1]][0]);
                      vstack.push(yyval.$);
                      lstack.push(yyval._$);
                      newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                      stack.push(newState);
                      break;
                    case 3:
                      return true;
                  }
                }
                return true;
              }
            };
            var _ast = {
              initialize: function() {
                this._nodes = [];
                this._node = {};
                this._stash = [];
              },
              set: function(props) {
                for (var k in props)
                  this._node[k] = props[k];
                return this._node;
              },
              node: function(obj) {
                if (arguments.length)
                  this._node = obj;
                return this._node;
              },
              push: function() {
                this._nodes.push(this._node);
                this._node = {};
              },
              unshift: function() {
                this._nodes.unshift(this._node);
                this._node = {};
              },
              yield: function() {
                var _nodes = this._nodes;
                this.initialize();
                return _nodes;
              }
            };
            var lexer = function() {
              var lexer2 = {
                EOF: 1,
                parseError: function parseError(str, hash) {
                  if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                  } else {
                    throw new Error(str);
                  }
                },
                setInput: function(input) {
                  this._input = input;
                  this._more = this._backtrack = this.done = false;
                  this.yylineno = this.yyleng = 0;
                  this.yytext = this.matched = this.match = "";
                  this.conditionStack = ["INITIAL"];
                  this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                  };
                  if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                  }
                  this.offset = 0;
                  return this;
                },
                input: function() {
                  var ch = this._input[0];
                  this.yytext += ch;
                  this.yyleng++;
                  this.offset++;
                  this.match += ch;
                  this.matched += ch;
                  var lines = ch.match(/(?:\r\n?|\n).*/g);
                  if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                  } else {
                    this.yylloc.last_column++;
                  }
                  if (this.options.ranges) {
                    this.yylloc.range[1]++;
                  }
                  this._input = this._input.slice(1);
                  return ch;
                },
                unput: function(ch) {
                  var len = ch.length;
                  var lines = ch.split(/(?:\r\n?|\n)/g);
                  this._input = ch + this._input;
                  this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                  this.offset -= len;
                  var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                  this.match = this.match.substr(0, this.match.length - 1);
                  this.matched = this.matched.substr(0, this.matched.length - 1);
                  if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                  }
                  var r = this.yylloc.range;
                  this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                  };
                  if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                  }
                  this.yyleng = this.yytext.length;
                  return this;
                },
                more: function() {
                  this._more = true;
                  return this;
                },
                reject: function() {
                  if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                  } else {
                    return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                      text: "",
                      token: null,
                      line: this.yylineno
                    });
                  }
                  return this;
                },
                less: function(n) {
                  this.unput(this.match.slice(n));
                },
                pastInput: function() {
                  var past = this.matched.substr(0, this.matched.length - this.match.length);
                  return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
                },
                upcomingInput: function() {
                  var next = this.match;
                  if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                  }
                  return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
                },
                showPosition: function() {
                  var pre = this.pastInput();
                  var c = new Array(pre.length + 1).join("-");
                  return pre + this.upcomingInput() + "\n" + c + "^";
                },
                test_match: function(match, indexed_rule) {
                  var token, lines, backup;
                  if (this.options.backtrack_lexer) {
                    backup = {
                      yylineno: this.yylineno,
                      yylloc: {
                        first_line: this.yylloc.first_line,
                        last_line: this.last_line,
                        first_column: this.yylloc.first_column,
                        last_column: this.yylloc.last_column
                      },
                      yytext: this.yytext,
                      match: this.match,
                      matches: this.matches,
                      matched: this.matched,
                      yyleng: this.yyleng,
                      offset: this.offset,
                      _more: this._more,
                      _input: this._input,
                      yy: this.yy,
                      conditionStack: this.conditionStack.slice(0),
                      done: this.done
                    };
                    if (this.options.ranges) {
                      backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                  }
                  lines = match[0].match(/(?:\r\n?|\n).*/g);
                  if (lines) {
                    this.yylineno += lines.length;
                  }
                  this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                  };
                  this.yytext += match[0];
                  this.match += match[0];
                  this.matches = match;
                  this.yyleng = this.yytext.length;
                  if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                  }
                  this._more = false;
                  this._backtrack = false;
                  this._input = this._input.slice(match[0].length);
                  this.matched += match[0];
                  token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                  if (this.done && this._input) {
                    this.done = false;
                  }
                  if (token) {
                    return token;
                  } else if (this._backtrack) {
                    for (var k in backup) {
                      this[k] = backup[k];
                    }
                    return false;
                  }
                  return false;
                },
                next: function() {
                  if (this.done) {
                    return this.EOF;
                  }
                  if (!this._input) {
                    this.done = true;
                  }
                  var token, match, tempMatch, index;
                  if (!this._more) {
                    this.yytext = "";
                    this.match = "";
                  }
                  var rules = this._currentRules();
                  for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                      match = tempMatch;
                      index = i;
                      if (this.options.backtrack_lexer) {
                        token = this.test_match(tempMatch, rules[i]);
                        if (token !== false) {
                          return token;
                        } else if (this._backtrack) {
                          match = false;
                          continue;
                        } else {
                          return false;
                        }
                      } else if (!this.options.flex) {
                        break;
                      }
                    }
                  }
                  if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                      return token;
                    }
                    return false;
                  }
                  if (this._input === "") {
                    return this.EOF;
                  } else {
                    return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                      text: "",
                      token: null,
                      line: this.yylineno
                    });
                  }
                },
                lex: function lex() {
                  var r = this.next();
                  if (r) {
                    return r;
                  } else {
                    return this.lex();
                  }
                },
                begin: function begin(condition) {
                  this.conditionStack.push(condition);
                },
                popState: function popState() {
                  var n = this.conditionStack.length - 1;
                  if (n > 0) {
                    return this.conditionStack.pop();
                  } else {
                    return this.conditionStack[0];
                  }
                },
                _currentRules: function _currentRules() {
                  if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                  } else {
                    return this.conditions["INITIAL"].rules;
                  }
                },
                topState: function topState(n) {
                  n = this.conditionStack.length - 1 - Math.abs(n || 0);
                  if (n >= 0) {
                    return this.conditionStack[n];
                  } else {
                    return "INITIAL";
                  }
                },
                pushState: function pushState(condition) {
                  this.begin(condition);
                },
                stateStackSize: function stateStackSize() {
                  return this.conditionStack.length;
                },
                options: {},
                performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                  var YYSTATE = YY_START;
                  switch ($avoiding_name_collisions) {
                    case 0:
                      return 4;
                      break;
                    case 1:
                      return 14;
                      break;
                    case 2:
                      return 12;
                      break;
                    case 3:
                      return 15;
                      break;
                    case 4:
                      return 16;
                      break;
                    case 5:
                      return 22;
                      break;
                    case 6:
                      return 24;
                      break;
                    case 7:
                      return 28;
                      break;
                    case 8:
                      return 30;
                      break;
                    case 9:
                      return 18;
                      break;
                    case 10:
                      yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                      return 32;
                      break;
                    case 11:
                      yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                      return 33;
                      break;
                    case 12:
                      return 17;
                      break;
                    case 13:
                      return 31;
                      break;
                  }
                },
                rules: [/^(?:\$)/, /^(?:\.\.)/, /^(?:\.)/, /^(?:\*)/, /^(?:[a-zA-Z_]+[a-zA-Z0-9_]*)/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?:((-?(?:0|[1-9][0-9]*)))?\:((-?(?:0|[1-9][0-9]*)))?(\:((-?(?:0|[1-9][0-9]*)))?)?)/, /^(?:(-?(?:0|[1-9][0-9]*)))/, /^(?:"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*")/, /^(?:'(?:\\['bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*')/, /^(?:\(.+?\)(?=\]))/, /^(?:\?\(.+?\)(?=\]))/],
                conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], "inclusive": true } }
              };
              return lexer2;
            }();
            parser2.lexer = lexer;
            function Parser() {
              this.yy = {};
            }
            Parser.prototype = parser2;
            parser2.Parser = Parser;
            return new Parser();
          }();
          if (typeof require2 !== "undefined" && typeof exports3 !== "undefined") {
            exports3.parser = parser;
            exports3.Parser = parser.Parser;
            exports3.parse = function() {
              return parser.parse.apply(parser, arguments);
            };
            exports3.main = function commonjsMain(args) {
              if (!args[1]) {
                console.log("Usage: " + args[0] + " FILE");
                process.exit(1);
              }
              var source = require2("fs").readFileSync(require2("path").normalize(args[1]), "utf8");
              return exports3.parser.parse(source);
            };
            if (typeof module4 !== "undefined" && require2.main === module4) {
              exports3.main(process.argv.slice(1));
            }
          }
        }).call(this, require2("_process"));
      }, { "_process": 14, "fs": 12, "path": 13 }], 2: [function(require2, module4, exports3) {
        module4.exports = {
          identifier: "[a-zA-Z_]+[a-zA-Z0-9_]*",
          integer: "-?(?:0|[1-9][0-9]*)",
          qq_string: '"(?:\\\\["bfnrt/\\\\]|\\\\u[a-fA-F0-9]{4}|[^"\\\\])*"',
          q_string: "'(?:\\\\['bfnrt/\\\\]|\\\\u[a-fA-F0-9]{4}|[^'\\\\])*'"
        };
      }, {}], 3: [function(require2, module4, exports3) {
        var dict = require2("./dict");
        var fs = require2("fs");
        var grammar = {
          lex: {
            macros: {
              esc: "\\\\",
              int: dict.integer
            },
            rules: [
              ["\\$", "return 'DOLLAR'"],
              ["\\.\\.", "return 'DOT_DOT'"],
              ["\\.", "return 'DOT'"],
              ["\\*", "return 'STAR'"],
              [dict.identifier, "return 'IDENTIFIER'"],
              ["\\[", "return '['"],
              ["\\]", "return ']'"],
              [",", "return ','"],
              ["({int})?\\:({int})?(\\:({int})?)?", "return 'ARRAY_SLICE'"],
              ["{int}", "return 'INTEGER'"],
              [dict.qq_string, "yytext = yytext.substr(1,yyleng-2); return 'QQ_STRING';"],
              [dict.q_string, "yytext = yytext.substr(1,yyleng-2); return 'Q_STRING';"],
              ["\\(.+?\\)(?=\\])", "return 'SCRIPT_EXPRESSION'"],
              ["\\?\\(.+?\\)(?=\\])", "return 'FILTER_EXPRESSION'"]
            ]
          },
          start: "JSON_PATH",
          bnf: {
            JSON_PATH: [
              ["DOLLAR", 'yy.ast.set({ expression: { type: "root", value: $1 } }); yy.ast.unshift(); return yy.ast.yield()'],
              ["DOLLAR PATH_COMPONENTS", 'yy.ast.set({ expression: { type: "root", value: $1 } }); yy.ast.unshift(); return yy.ast.yield()'],
              ["LEADING_CHILD_MEMBER_EXPRESSION", "yy.ast.unshift(); return yy.ast.yield()"],
              ["LEADING_CHILD_MEMBER_EXPRESSION PATH_COMPONENTS", 'yy.ast.set({ operation: "member", scope: "child", expression: { type: "identifier", value: $1 }}); yy.ast.unshift(); return yy.ast.yield()']
            ],
            PATH_COMPONENTS: [
              ["PATH_COMPONENT", ""],
              ["PATH_COMPONENTS PATH_COMPONENT", ""]
            ],
            PATH_COMPONENT: [
              ["MEMBER_COMPONENT", 'yy.ast.set({ operation: "member" }); yy.ast.push()'],
              ["SUBSCRIPT_COMPONENT", 'yy.ast.set({ operation: "subscript" }); yy.ast.push() ']
            ],
            MEMBER_COMPONENT: [
              ["CHILD_MEMBER_COMPONENT", 'yy.ast.set({ scope: "child" })'],
              ["DESCENDANT_MEMBER_COMPONENT", 'yy.ast.set({ scope: "descendant" })']
            ],
            CHILD_MEMBER_COMPONENT: [
              ["DOT MEMBER_EXPRESSION", ""]
            ],
            LEADING_CHILD_MEMBER_EXPRESSION: [
              ["MEMBER_EXPRESSION", 'yy.ast.set({ scope: "child", operation: "member" })']
            ],
            DESCENDANT_MEMBER_COMPONENT: [
              ["DOT_DOT MEMBER_EXPRESSION", ""]
            ],
            MEMBER_EXPRESSION: [
              ["STAR", 'yy.ast.set({ expression: { type: "wildcard", value: $1 } })'],
              ["IDENTIFIER", 'yy.ast.set({ expression: { type: "identifier", value: $1 } })'],
              ["SCRIPT_EXPRESSION", 'yy.ast.set({ expression: { type: "script_expression", value: $1 } })'],
              ["INTEGER", 'yy.ast.set({ expression: { type: "numeric_literal", value: parseInt($1) } })'],
              ["END", ""]
            ],
            SUBSCRIPT_COMPONENT: [
              ["CHILD_SUBSCRIPT_COMPONENT", 'yy.ast.set({ scope: "child" })'],
              ["DESCENDANT_SUBSCRIPT_COMPONENT", 'yy.ast.set({ scope: "descendant" })']
            ],
            CHILD_SUBSCRIPT_COMPONENT: [
              ["[ SUBSCRIPT ]", ""]
            ],
            DESCENDANT_SUBSCRIPT_COMPONENT: [
              ["DOT_DOT [ SUBSCRIPT ]", ""]
            ],
            SUBSCRIPT: [
              ["SUBSCRIPT_EXPRESSION", ""],
              ["SUBSCRIPT_EXPRESSION_LIST", '$1.length > 1? yy.ast.set({ expression: { type: "union", value: $1 } }) : $$ = $1']
            ],
            SUBSCRIPT_EXPRESSION_LIST: [
              ["SUBSCRIPT_EXPRESSION_LISTABLE", "$$ = [$1]"],
              ["SUBSCRIPT_EXPRESSION_LIST , SUBSCRIPT_EXPRESSION_LISTABLE", "$$ = $1.concat($3)"]
            ],
            SUBSCRIPT_EXPRESSION_LISTABLE: [
              ["INTEGER", '$$ = { expression: { type: "numeric_literal", value: parseInt($1) } }; yy.ast.set($$)'],
              ["STRING_LITERAL", '$$ = { expression: { type: "string_literal", value: $1 } }; yy.ast.set($$)'],
              ["ARRAY_SLICE", '$$ = { expression: { type: "slice", value: $1 } }; yy.ast.set($$)']
            ],
            SUBSCRIPT_EXPRESSION: [
              ["STAR", '$$ = { expression: { type: "wildcard", value: $1 } }; yy.ast.set($$)'],
              ["SCRIPT_EXPRESSION", '$$ = { expression: { type: "script_expression", value: $1 } }; yy.ast.set($$)'],
              ["FILTER_EXPRESSION", '$$ = { expression: { type: "filter_expression", value: $1 } }; yy.ast.set($$)']
            ],
            STRING_LITERAL: [
              ["QQ_STRING", "$$ = $1"],
              ["Q_STRING", "$$ = $1"]
            ]
          }
        };
        if (fs.readFileSync) {
          grammar.moduleInclude = fs.readFileSync(require2.resolve("../include/module.js"));
          grammar.actionInclude = fs.readFileSync(require2.resolve("../include/action.js"));
        }
        module4.exports = grammar;
      }, { "./dict": 2, "fs": 12 }], 4: [function(require2, module4, exports3) {
        var aesprim = require2("./aesprim");
        var slice = require2("./slice");
        var _evaluate = require2("static-eval");
        var _uniq = require2("underscore").uniq;
        var Handlers = function() {
          return this.initialize.apply(this, arguments);
        };
        Handlers.prototype.initialize = function() {
          this.traverse = traverser(true);
          this.descend = traverser();
        };
        Handlers.prototype.keys = Object.keys;
        Handlers.prototype.resolve = function(component) {
          var key = [component.operation, component.scope, component.expression.type].join("-");
          var method = this._fns[key];
          if (!method)
            throw new Error("couldn't resolve key: " + key);
          return method.bind(this);
        };
        Handlers.prototype.register = function(key, handler) {
          if (!handler instanceof Function) {
            throw new Error("handler must be a function");
          }
          this._fns[key] = handler;
        };
        Handlers.prototype._fns = {
          "member-child-identifier": function(component, partial) {
            var key = component.expression.value;
            var value = partial.value;
            if (value instanceof Object && key in value) {
              return [{ value: value[key], path: partial.path.concat(key) }];
            }
          },
          "member-descendant-identifier": _traverse(function(key, value, ref) {
            return key == ref;
          }),
          "subscript-child-numeric_literal": _descend(function(key, value, ref) {
            return key === ref;
          }),
          "member-child-numeric_literal": _descend(function(key, value, ref) {
            return String(key) === String(ref);
          }),
          "subscript-descendant-numeric_literal": _traverse(function(key, value, ref) {
            return key === ref;
          }),
          "member-child-wildcard": _descend(function() {
            return true;
          }),
          "member-descendant-wildcard": _traverse(function() {
            return true;
          }),
          "subscript-descendant-wildcard": _traverse(function() {
            return true;
          }),
          "subscript-child-wildcard": _descend(function() {
            return true;
          }),
          "subscript-child-slice": function(component, partial) {
            if (is_array(partial.value)) {
              var args = component.expression.value.split(":").map(_parse_nullable_int);
              var values = partial.value.map(function(v, i) {
                return { value: v, path: partial.path.concat(i) };
              });
              return slice.apply(null, [values].concat(args));
            }
          },
          "subscript-child-union": function(component, partial) {
            var results = [];
            component.expression.value.forEach(function(component2) {
              var _component = { operation: "subscript", scope: "child", expression: component2.expression };
              var handler = this.resolve(_component);
              var _results = handler(_component, partial);
              if (_results) {
                results = results.concat(_results);
              }
            }, this);
            return unique(results);
          },
          "subscript-descendant-union": function(component, partial, count) {
            var jp = require2("..");
            var self2 = this;
            var results = [];
            var nodes = jp.nodes(partial, "$..*").slice(1);
            nodes.forEach(function(node) {
              if (results.length >= count)
                return;
              component.expression.value.forEach(function(component2) {
                var _component = { operation: "subscript", scope: "child", expression: component2.expression };
                var handler = self2.resolve(_component);
                var _results = handler(_component, node);
                results = results.concat(_results);
              });
            });
            return unique(results);
          },
          "subscript-child-filter_expression": function(component, partial, count) {
            var src = component.expression.value.slice(2, -1);
            var ast = aesprim.parse(src).body[0].expression;
            var passable = function(key, value) {
              return evaluate(ast, { "@": value });
            };
            return this.descend(partial, null, passable, count);
          },
          "subscript-descendant-filter_expression": function(component, partial, count) {
            var src = component.expression.value.slice(2, -1);
            var ast = aesprim.parse(src).body[0].expression;
            var passable = function(key, value) {
              return evaluate(ast, { "@": value });
            };
            return this.traverse(partial, null, passable, count);
          },
          "subscript-child-script_expression": function(component, partial) {
            var exp = component.expression.value.slice(1, -1);
            return eval_recurse(partial, exp, "$[{{value}}]");
          },
          "member-child-script_expression": function(component, partial) {
            var exp = component.expression.value.slice(1, -1);
            return eval_recurse(partial, exp, "$.{{value}}");
          },
          "member-descendant-script_expression": function(component, partial) {
            var exp = component.expression.value.slice(1, -1);
            return eval_recurse(partial, exp, "$..value");
          }
        };
        Handlers.prototype._fns["subscript-child-string_literal"] = Handlers.prototype._fns["member-child-identifier"];
        Handlers.prototype._fns["member-descendant-numeric_literal"] = Handlers.prototype._fns["subscript-descendant-string_literal"] = Handlers.prototype._fns["member-descendant-identifier"];
        function eval_recurse(partial, src, template) {
          var jp = require2("./index");
          var ast = aesprim.parse(src).body[0].expression;
          var value = evaluate(ast, { "@": partial.value });
          var path = template.replace(/\{\{\s*value\s*\}\}/g, value);
          var results = jp.nodes(partial.value, path);
          results.forEach(function(r) {
            r.path = partial.path.concat(r.path.slice(1));
          });
          return results;
        }
        function is_array(val) {
          return Array.isArray(val);
        }
        function is_object(val) {
          return val && !(val instanceof Array) && val instanceof Object;
        }
        function traverser(recurse) {
          return function(partial, ref, passable, count) {
            var value = partial.value;
            var path = partial.path;
            var results = [];
            var descend = function(value2, path2) {
              if (is_array(value2)) {
                value2.forEach(function(element, index) {
                  if (results.length >= count) {
                    return;
                  }
                  if (passable(index, element, ref)) {
                    results.push({ path: path2.concat(index), value: element });
                  }
                });
                value2.forEach(function(element, index) {
                  if (results.length >= count) {
                    return;
                  }
                  if (recurse) {
                    descend(element, path2.concat(index));
                  }
                });
              } else if (is_object(value2)) {
                this.keys(value2).forEach(function(k) {
                  if (results.length >= count) {
                    return;
                  }
                  if (passable(k, value2[k], ref)) {
                    results.push({ path: path2.concat(k), value: value2[k] });
                  }
                });
                this.keys(value2).forEach(function(k) {
                  if (results.length >= count) {
                    return;
                  }
                  if (recurse) {
                    descend(value2[k], path2.concat(k));
                  }
                });
              }
            }.bind(this);
            descend(value, path);
            return results;
          };
        }
        function _descend(passable) {
          return function(component, partial, count) {
            return this.descend(partial, component.expression.value, passable, count);
          };
        }
        function _traverse(passable) {
          return function(component, partial, count) {
            return this.traverse(partial, component.expression.value, passable, count);
          };
        }
        function evaluate() {
          try {
            return _evaluate.apply(this, arguments);
          } catch (e) {
          }
        }
        function unique(results) {
          results = results.filter(function(d) {
            return d;
          });
          return _uniq(
            results,
            function(r) {
              return r.path.map(function(c) {
                return String(c).replace("-", "--");
              }).join("-");
            }
          );
        }
        function _parse_nullable_int(val) {
          var sval = String(val);
          return sval.match(/^-?[0-9]+$/) ? parseInt(sval) : null;
        }
        module4.exports = Handlers;
      }, { "..": "jsonpath", "./aesprim": "./aesprim", "./index": 5, "./slice": 7, "static-eval": 15, "underscore": 12 }], 5: [function(require2, module4, exports3) {
        var assert = require2("assert");
        var dict = require2("./dict");
        var Parser = require2("./parser");
        var Handlers = require2("./handlers");
        var JSONPath = function() {
          this.initialize.apply(this, arguments);
        };
        JSONPath.prototype.initialize = function() {
          this.parser = new Parser();
          this.handlers = new Handlers();
        };
        JSONPath.prototype.parse = function(string) {
          assert.ok(_is_string(string), "we need a path");
          return this.parser.parse(string);
        };
        JSONPath.prototype.parent = function(obj, string) {
          assert.ok(obj instanceof Object, "obj needs to be an object");
          assert.ok(string, "we need a path");
          var node = this.nodes(obj, string)[0];
          var key = node.path.pop();
          return this.value(obj, node.path);
        };
        JSONPath.prototype.apply = function(obj, string, fn) {
          assert.ok(obj instanceof Object, "obj needs to be an object");
          assert.ok(string, "we need a path");
          assert.equal(typeof fn, "function", "fn needs to be function");
          var nodes = this.nodes(obj, string).sort(function(a, b) {
            return b.path.length - a.path.length;
          });
          nodes.forEach(function(node) {
            var key = node.path.pop();
            var parent = this.value(obj, this.stringify(node.path));
            var val = node.value = fn.call(obj, parent[key]);
            parent[key] = val;
          }, this);
          return nodes;
        };
        JSONPath.prototype.value = function(obj, path, value) {
          assert.ok(obj instanceof Object, "obj needs to be an object");
          assert.ok(path, "we need a path");
          if (arguments.length >= 3) {
            var node = this.nodes(obj, path).shift();
            if (!node)
              return this._vivify(obj, path, value);
            var key = node.path.slice(-1).shift();
            var parent = this.parent(obj, this.stringify(node.path));
            parent[key] = value;
          }
          return this.query(obj, this.stringify(path), 1).shift();
        };
        JSONPath.prototype._vivify = function(obj, string, value) {
          var self2 = this;
          assert.ok(obj instanceof Object, "obj needs to be an object");
          assert.ok(string, "we need a path");
          var path = this.parser.parse(string).map(function(component) {
            return component.expression.value;
          });
          var setValue = function(path2, value2) {
            var key = path2.pop();
            var node = self2.value(obj, path2);
            if (!node) {
              setValue(path2.concat(), typeof key === "string" ? {} : []);
              node = self2.value(obj, path2);
            }
            node[key] = value2;
          };
          setValue(path, value);
          return this.query(obj, string)[0];
        };
        JSONPath.prototype.query = function(obj, string, count) {
          assert.ok(obj instanceof Object, "obj needs to be an object");
          assert.ok(_is_string(string), "we need a path");
          var results = this.nodes(obj, string, count).map(function(r) {
            return r.value;
          });
          return results;
        };
        JSONPath.prototype.paths = function(obj, string, count) {
          assert.ok(obj instanceof Object, "obj needs to be an object");
          assert.ok(string, "we need a path");
          var results = this.nodes(obj, string, count).map(function(r) {
            return r.path;
          });
          return results;
        };
        JSONPath.prototype.nodes = function(obj, string, count) {
          assert.ok(obj instanceof Object, "obj needs to be an object");
          assert.ok(string, "we need a path");
          if (count === 0)
            return [];
          var path = this.parser.parse(string);
          var handlers = this.handlers;
          var partials = [{ path: ["$"], value: obj }];
          var matches = [];
          if (path.length && path[0].expression.type == "root")
            path.shift();
          if (!path.length)
            return partials;
          path.forEach(function(component, index) {
            if (matches.length >= count)
              return;
            var handler = handlers.resolve(component);
            var _partials = [];
            partials.forEach(function(p) {
              if (matches.length >= count)
                return;
              var results = handler(component, p, count);
              if (index == path.length - 1) {
                matches = matches.concat(results || []);
              } else {
                _partials = _partials.concat(results || []);
              }
            });
            partials = _partials;
          });
          return count ? matches.slice(0, count) : matches;
        };
        JSONPath.prototype.stringify = function(path) {
          assert.ok(path, "we need a path");
          var string = "$";
          var templates = {
            "descendant-member": "..{{value}}",
            "child-member": ".{{value}}",
            "descendant-subscript": "..[{{value}}]",
            "child-subscript": "[{{value}}]"
          };
          path = this._normalize(path);
          path.forEach(function(component) {
            if (component.expression.type == "root")
              return;
            var key = [component.scope, component.operation].join("-");
            var template = templates[key];
            var value;
            if (component.expression.type == "string_literal") {
              value = JSON.stringify(component.expression.value);
            } else {
              value = component.expression.value;
            }
            if (!template)
              throw new Error("couldn't find template " + key);
            string += template.replace(/{{value}}/, value);
          });
          return string;
        };
        JSONPath.prototype._normalize = function(path) {
          assert.ok(path, "we need a path");
          if (typeof path == "string") {
            return this.parser.parse(path);
          } else if (Array.isArray(path) && typeof path[0] == "string") {
            var _path = [{ expression: { type: "root", value: "$" } }];
            path.forEach(function(component, index) {
              if (component == "$" && index === 0)
                return;
              if (typeof component == "string" && component.match("^" + dict.identifier + "$")) {
                _path.push({
                  operation: "member",
                  scope: "child",
                  expression: { value: component, type: "identifier" }
                });
              } else {
                var type = typeof component == "number" ? "numeric_literal" : "string_literal";
                _path.push({
                  operation: "subscript",
                  scope: "child",
                  expression: { value: component, type }
                });
              }
            });
            return _path;
          } else if (Array.isArray(path) && typeof path[0] == "object") {
            return path;
          }
          throw new Error("couldn't understand path " + path);
        };
        function _is_string(obj) {
          return Object.prototype.toString.call(obj) == "[object String]";
        }
        JSONPath.Handlers = Handlers;
        JSONPath.Parser = Parser;
        var instance = new JSONPath();
        instance.JSONPath = JSONPath;
        module4.exports = instance;
      }, { "./dict": 2, "./handlers": 4, "./parser": 6, "assert": 8 }], 6: [function(require2, module4, exports3) {
        var grammar = require2("./grammar");
        var gparser = require2("../generated/parser");
        var Parser = function() {
          var parser = new gparser.Parser();
          var _parseError = parser.parseError;
          parser.yy.parseError = function() {
            if (parser.yy.ast) {
              parser.yy.ast.initialize();
            }
            _parseError.apply(parser, arguments);
          };
          return parser;
        };
        Parser.grammar = grammar;
        module4.exports = Parser;
      }, { "../generated/parser": 1, "./grammar": 3 }], 7: [function(require2, module4, exports3) {
        module4.exports = function(arr, start, end, step) {
          if (typeof start == "string")
            throw new Error("start cannot be a string");
          if (typeof end == "string")
            throw new Error("end cannot be a string");
          if (typeof step == "string")
            throw new Error("step cannot be a string");
          var len = arr.length;
          if (step === 0)
            throw new Error("step cannot be zero");
          step = step ? integer(step) : 1;
          start = start < 0 ? len + start : start;
          end = end < 0 ? len + end : end;
          start = integer(start === 0 ? 0 : !start ? step > 0 ? 0 : len - 1 : start);
          end = integer(end === 0 ? 0 : !end ? step > 0 ? len : -1 : end);
          start = step > 0 ? Math.max(0, start) : Math.min(len, start);
          end = step > 0 ? Math.min(end, len) : Math.max(-1, end);
          if (step > 0 && end <= start)
            return [];
          if (step < 0 && start <= end)
            return [];
          var result = [];
          for (var i = start; i != end; i += step) {
            if (step < 0 && i <= end || step > 0 && i >= end)
              break;
            result.push(arr[i]);
          }
          return result;
        };
        function integer(val) {
          return String(val).match(/^[0-9]+$/) ? parseInt(val) : Number.isFinite(val) ? parseInt(val, 10) : 0;
        }
      }, {}], 8: [function(require2, module4, exports3) {
        var util = require2("util/");
        var pSlice = Array.prototype.slice;
        var hasOwn = Object.prototype.hasOwnProperty;
        var assert = module4.exports = ok;
        assert.AssertionError = function AssertionError(options) {
          this.name = "AssertionError";
          this.actual = options.actual;
          this.expected = options.expected;
          this.operator = options.operator;
          if (options.message) {
            this.message = options.message;
            this.generatedMessage = false;
          } else {
            this.message = getMessage(this);
            this.generatedMessage = true;
          }
          var stackStartFunction = options.stackStartFunction || fail;
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, stackStartFunction);
          } else {
            var err = new Error();
            if (err.stack) {
              var out = err.stack;
              var fn_name = stackStartFunction.name;
              var idx = out.indexOf("\n" + fn_name);
              if (idx >= 0) {
                var next_line = out.indexOf("\n", idx + 1);
                out = out.substring(next_line + 1);
              }
              this.stack = out;
            }
          }
        };
        util.inherits(assert.AssertionError, Error);
        function replacer(key, value) {
          if (util.isUndefined(value)) {
            return "" + value;
          }
          if (util.isNumber(value) && !isFinite(value)) {
            return value.toString();
          }
          if (util.isFunction(value) || util.isRegExp(value)) {
            return value.toString();
          }
          return value;
        }
        function truncate(s, n) {
          if (util.isString(s)) {
            return s.length < n ? s : s.slice(0, n);
          } else {
            return s;
          }
        }
        function getMessage(self2) {
          return truncate(JSON.stringify(self2.actual, replacer), 128) + " " + self2.operator + " " + truncate(JSON.stringify(self2.expected, replacer), 128);
        }
        function fail(actual, expected, message, operator, stackStartFunction) {
          throw new assert.AssertionError({
            message,
            actual,
            expected,
            operator,
            stackStartFunction
          });
        }
        assert.fail = fail;
        function ok(value, message) {
          if (!value)
            fail(value, true, message, "==", assert.ok);
        }
        assert.ok = ok;
        assert.equal = function equal(actual, expected, message) {
          if (actual != expected)
            fail(actual, expected, message, "==", assert.equal);
        };
        assert.notEqual = function notEqual(actual, expected, message) {
          if (actual == expected) {
            fail(actual, expected, message, "!=", assert.notEqual);
          }
        };
        assert.deepEqual = function deepEqual(actual, expected, message) {
          if (!_deepEqual(actual, expected)) {
            fail(actual, expected, message, "deepEqual", assert.deepEqual);
          }
        };
        function _deepEqual(actual, expected) {
          if (actual === expected) {
            return true;
          } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
            if (actual.length != expected.length)
              return false;
            for (var i = 0; i < actual.length; i++) {
              if (actual[i] !== expected[i])
                return false;
            }
            return true;
          } else if (util.isDate(actual) && util.isDate(expected)) {
            return actual.getTime() === expected.getTime();
          } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
            return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;
          } else if (!util.isObject(actual) && !util.isObject(expected)) {
            return actual == expected;
          } else {
            return objEquiv(actual, expected);
          }
        }
        function isArguments(object) {
          return Object.prototype.toString.call(object) == "[object Arguments]";
        }
        function objEquiv(a, b) {
          if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
            return false;
          if (a.prototype !== b.prototype)
            return false;
          if (util.isPrimitive(a) || util.isPrimitive(b)) {
            return a === b;
          }
          var aIsArgs = isArguments(a), bIsArgs = isArguments(b);
          if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs)
            return false;
          if (aIsArgs) {
            a = pSlice.call(a);
            b = pSlice.call(b);
            return _deepEqual(a, b);
          }
          var ka = objectKeys(a), kb = objectKeys(b), key, i;
          if (ka.length != kb.length)
            return false;
          ka.sort();
          kb.sort();
          for (i = ka.length - 1; i >= 0; i--) {
            if (ka[i] != kb[i])
              return false;
          }
          for (i = ka.length - 1; i >= 0; i--) {
            key = ka[i];
            if (!_deepEqual(a[key], b[key]))
              return false;
          }
          return true;
        }
        assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
          if (_deepEqual(actual, expected)) {
            fail(actual, expected, message, "notDeepEqual", assert.notDeepEqual);
          }
        };
        assert.strictEqual = function strictEqual(actual, expected, message) {
          if (actual !== expected) {
            fail(actual, expected, message, "===", assert.strictEqual);
          }
        };
        assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
          if (actual === expected) {
            fail(actual, expected, message, "!==", assert.notStrictEqual);
          }
        };
        function expectedException(actual, expected) {
          if (!actual || !expected) {
            return false;
          }
          if (Object.prototype.toString.call(expected) == "[object RegExp]") {
            return expected.test(actual);
          } else if (actual instanceof expected) {
            return true;
          } else if (expected.call({}, actual) === true) {
            return true;
          }
          return false;
        }
        function _throws(shouldThrow, block, expected, message) {
          var actual;
          if (util.isString(expected)) {
            message = expected;
            expected = null;
          }
          try {
            block();
          } catch (e) {
            actual = e;
          }
          message = (expected && expected.name ? " (" + expected.name + ")." : ".") + (message ? " " + message : ".");
          if (shouldThrow && !actual) {
            fail(actual, expected, "Missing expected exception" + message);
          }
          if (!shouldThrow && expectedException(actual, expected)) {
            fail(actual, expected, "Got unwanted exception" + message);
          }
          if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
            throw actual;
          }
        }
        assert.throws = function(block, error, message) {
          _throws.apply(this, [true].concat(pSlice.call(arguments)));
        };
        assert.doesNotThrow = function(block, message) {
          _throws.apply(this, [false].concat(pSlice.call(arguments)));
        };
        assert.ifError = function(err) {
          if (err) {
            throw err;
          }
        };
        var objectKeys = Object.keys || function(obj) {
          var keys = [];
          for (var key in obj) {
            if (hasOwn.call(obj, key))
              keys.push(key);
          }
          return keys;
        };
      }, { "util/": 11 }], 9: [function(require2, module4, exports3) {
        if (typeof Object.create === "function") {
          module4.exports = function inherits(ctor, superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          };
        } else {
          module4.exports = function inherits(ctor, superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          };
        }
      }, {}], 10: [function(require2, module4, exports3) {
        module4.exports = function isBuffer(arg) {
          return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
        };
      }, {}], 11: [function(require2, module4, exports3) {
        (function(process, global2) {
          var formatRegExp = /%[sdj%]/g;
          exports3.format = function(f) {
            if (!isString(f)) {
              var objects = [];
              for (var i = 0; i < arguments.length; i++) {
                objects.push(inspect(arguments[i]));
              }
              return objects.join(" ");
            }
            var i = 1;
            var args = arguments;
            var len = args.length;
            var str = String(f).replace(formatRegExp, function(x2) {
              if (x2 === "%%")
                return "%";
              if (i >= len)
                return x2;
              switch (x2) {
                case "%s":
                  return String(args[i++]);
                case "%d":
                  return Number(args[i++]);
                case "%j":
                  try {
                    return JSON.stringify(args[i++]);
                  } catch (_) {
                    return "[Circular]";
                  }
                default:
                  return x2;
              }
            });
            for (var x = args[i]; i < len; x = args[++i]) {
              if (isNull(x) || !isObject2(x)) {
                str += " " + x;
              } else {
                str += " " + inspect(x);
              }
            }
            return str;
          };
          exports3.deprecate = function(fn, msg) {
            if (isUndefined(global2.process)) {
              return function() {
                return exports3.deprecate(fn, msg).apply(this, arguments);
              };
            }
            if (process.noDeprecation === true) {
              return fn;
            }
            var warned = false;
            function deprecated() {
              if (!warned) {
                if (process.throwDeprecation) {
                  throw new Error(msg);
                } else if (process.traceDeprecation) {
                  console.trace(msg);
                } else {
                  console.error(msg);
                }
                warned = true;
              }
              return fn.apply(this, arguments);
            }
            return deprecated;
          };
          var debugs = {};
          var debugEnviron;
          exports3.debuglog = function(set) {
            if (isUndefined(debugEnviron))
              debugEnviron = process.env.NODE_DEBUG || "";
            set = set.toUpperCase();
            if (!debugs[set]) {
              if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
                var pid = process.pid;
                debugs[set] = function() {
                  var msg = exports3.format.apply(exports3, arguments);
                  console.error("%s %d: %s", set, pid, msg);
                };
              } else {
                debugs[set] = function() {
                };
              }
            }
            return debugs[set];
          };
          function inspect(obj, opts) {
            var ctx = {
              seen: [],
              stylize: stylizeNoColor
            };
            if (arguments.length >= 3)
              ctx.depth = arguments[2];
            if (arguments.length >= 4)
              ctx.colors = arguments[3];
            if (isBoolean(opts)) {
              ctx.showHidden = opts;
            } else if (opts) {
              exports3._extend(ctx, opts);
            }
            if (isUndefined(ctx.showHidden))
              ctx.showHidden = false;
            if (isUndefined(ctx.depth))
              ctx.depth = 2;
            if (isUndefined(ctx.colors))
              ctx.colors = false;
            if (isUndefined(ctx.customInspect))
              ctx.customInspect = true;
            if (ctx.colors)
              ctx.stylize = stylizeWithColor;
            return formatValue(ctx, obj, ctx.depth);
          }
          exports3.inspect = inspect;
          inspect.colors = {
            "bold": [1, 22],
            "italic": [3, 23],
            "underline": [4, 24],
            "inverse": [7, 27],
            "white": [37, 39],
            "grey": [90, 39],
            "black": [30, 39],
            "blue": [34, 39],
            "cyan": [36, 39],
            "green": [32, 39],
            "magenta": [35, 39],
            "red": [31, 39],
            "yellow": [33, 39]
          };
          inspect.styles = {
            "special": "cyan",
            "number": "yellow",
            "boolean": "yellow",
            "undefined": "grey",
            "null": "bold",
            "string": "green",
            "date": "magenta",
            "regexp": "red"
          };
          function stylizeWithColor(str, styleType) {
            var style = inspect.styles[styleType];
            if (style) {
              return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
            } else {
              return str;
            }
          }
          function stylizeNoColor(str, styleType) {
            return str;
          }
          function arrayToHash(array) {
            var hash = {};
            array.forEach(function(val, idx) {
              hash[val] = true;
            });
            return hash;
          }
          function formatValue(ctx, value, recurseTimes) {
            if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports3.inspect && !(value.constructor && value.constructor.prototype === value)) {
              var ret = value.inspect(recurseTimes, ctx);
              if (!isString(ret)) {
                ret = formatValue(ctx, ret, recurseTimes);
              }
              return ret;
            }
            var primitive = formatPrimitive(ctx, value);
            if (primitive) {
              return primitive;
            }
            var keys = Object.keys(value);
            var visibleKeys = arrayToHash(keys);
            if (ctx.showHidden) {
              keys = Object.getOwnPropertyNames(value);
            }
            if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
              return formatError(value);
            }
            if (keys.length === 0) {
              if (isFunction(value)) {
                var name = value.name ? ": " + value.name : "";
                return ctx.stylize("[Function" + name + "]", "special");
              }
              if (isRegExp(value)) {
                return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
              }
              if (isDate(value)) {
                return ctx.stylize(Date.prototype.toString.call(value), "date");
              }
              if (isError(value)) {
                return formatError(value);
              }
            }
            var base = "", array = false, braces = ["{", "}"];
            if (isArray(value)) {
              array = true;
              braces = ["[", "]"];
            }
            if (isFunction(value)) {
              var n = value.name ? ": " + value.name : "";
              base = " [Function" + n + "]";
            }
            if (isRegExp(value)) {
              base = " " + RegExp.prototype.toString.call(value);
            }
            if (isDate(value)) {
              base = " " + Date.prototype.toUTCString.call(value);
            }
            if (isError(value)) {
              base = " " + formatError(value);
            }
            if (keys.length === 0 && (!array || value.length == 0)) {
              return braces[0] + base + braces[1];
            }
            if (recurseTimes < 0) {
              if (isRegExp(value)) {
                return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
              } else {
                return ctx.stylize("[Object]", "special");
              }
            }
            ctx.seen.push(value);
            var output;
            if (array) {
              output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
            } else {
              output = keys.map(function(key) {
                return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
              });
            }
            ctx.seen.pop();
            return reduceToSingleString(output, base, braces);
          }
          function formatPrimitive(ctx, value) {
            if (isUndefined(value))
              return ctx.stylize("undefined", "undefined");
            if (isString(value)) {
              var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
              return ctx.stylize(simple, "string");
            }
            if (isNumber(value))
              return ctx.stylize("" + value, "number");
            if (isBoolean(value))
              return ctx.stylize("" + value, "boolean");
            if (isNull(value))
              return ctx.stylize("null", "null");
          }
          function formatError(value) {
            return "[" + Error.prototype.toString.call(value) + "]";
          }
          function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
            var output = [];
            for (var i = 0, l = value.length; i < l; ++i) {
              if (hasOwnProperty(value, String(i))) {
                output.push(formatProperty(
                  ctx,
                  value,
                  recurseTimes,
                  visibleKeys,
                  String(i),
                  true
                ));
              } else {
                output.push("");
              }
            }
            keys.forEach(function(key) {
              if (!key.match(/^\d+$/)) {
                output.push(formatProperty(
                  ctx,
                  value,
                  recurseTimes,
                  visibleKeys,
                  key,
                  true
                ));
              }
            });
            return output;
          }
          function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
            var name, str, desc;
            desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
            if (desc.get) {
              if (desc.set) {
                str = ctx.stylize("[Getter/Setter]", "special");
              } else {
                str = ctx.stylize("[Getter]", "special");
              }
            } else {
              if (desc.set) {
                str = ctx.stylize("[Setter]", "special");
              }
            }
            if (!hasOwnProperty(visibleKeys, key)) {
              name = "[" + key + "]";
            }
            if (!str) {
              if (ctx.seen.indexOf(desc.value) < 0) {
                if (isNull(recurseTimes)) {
                  str = formatValue(ctx, desc.value, null);
                } else {
                  str = formatValue(ctx, desc.value, recurseTimes - 1);
                }
                if (str.indexOf("\n") > -1) {
                  if (array) {
                    str = str.split("\n").map(function(line) {
                      return "  " + line;
                    }).join("\n").substr(2);
                  } else {
                    str = "\n" + str.split("\n").map(function(line) {
                      return "   " + line;
                    }).join("\n");
                  }
                }
              } else {
                str = ctx.stylize("[Circular]", "special");
              }
            }
            if (isUndefined(name)) {
              if (array && key.match(/^\d+$/)) {
                return str;
              }
              name = JSON.stringify("" + key);
              if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                name = name.substr(1, name.length - 2);
                name = ctx.stylize(name, "name");
              } else {
                name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                name = ctx.stylize(name, "string");
              }
            }
            return name + ": " + str;
          }
          function reduceToSingleString(output, base, braces) {
            var numLinesEst = 0;
            var length = output.reduce(function(prev, cur) {
              numLinesEst++;
              if (cur.indexOf("\n") >= 0)
                numLinesEst++;
              return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
            }, 0);
            if (length > 60) {
              return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
            }
            return braces[0] + base + " " + output.join(", ") + " " + braces[1];
          }
          function isArray(ar) {
            return Array.isArray(ar);
          }
          exports3.isArray = isArray;
          function isBoolean(arg) {
            return typeof arg === "boolean";
          }
          exports3.isBoolean = isBoolean;
          function isNull(arg) {
            return arg === null;
          }
          exports3.isNull = isNull;
          function isNullOrUndefined(arg) {
            return arg == null;
          }
          exports3.isNullOrUndefined = isNullOrUndefined;
          function isNumber(arg) {
            return typeof arg === "number";
          }
          exports3.isNumber = isNumber;
          function isString(arg) {
            return typeof arg === "string";
          }
          exports3.isString = isString;
          function isSymbol(arg) {
            return typeof arg === "symbol";
          }
          exports3.isSymbol = isSymbol;
          function isUndefined(arg) {
            return arg === void 0;
          }
          exports3.isUndefined = isUndefined;
          function isRegExp(re) {
            return isObject2(re) && objectToString(re) === "[object RegExp]";
          }
          exports3.isRegExp = isRegExp;
          function isObject2(arg) {
            return typeof arg === "object" && arg !== null;
          }
          exports3.isObject = isObject2;
          function isDate(d) {
            return isObject2(d) && objectToString(d) === "[object Date]";
          }
          exports3.isDate = isDate;
          function isError(e) {
            return isObject2(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
          }
          exports3.isError = isError;
          function isFunction(arg) {
            return typeof arg === "function";
          }
          exports3.isFunction = isFunction;
          function isPrimitive(arg) {
            return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
          }
          exports3.isPrimitive = isPrimitive;
          exports3.isBuffer = require2("./support/isBuffer");
          function objectToString(o) {
            return Object.prototype.toString.call(o);
          }
          function pad(n) {
            return n < 10 ? "0" + n.toString(10) : n.toString(10);
          }
          var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ];
          function timestamp() {
            var d = new Date();
            var time = [
              pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())
            ].join(":");
            return [d.getDate(), months[d.getMonth()], time].join(" ");
          }
          exports3.log = function() {
            console.log("%s - %s", timestamp(), exports3.format.apply(exports3, arguments));
          };
          exports3.inherits = require2("inherits");
          exports3._extend = function(origin, add) {
            if (!add || !isObject2(add))
              return origin;
            var keys = Object.keys(add);
            var i = keys.length;
            while (i--) {
              origin[keys[i]] = add[keys[i]];
            }
            return origin;
          };
          function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
          }
        }).call(this, require2("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "./support/isBuffer": 10, "_process": 14, "inherits": 9 }], 12: [function(require2, module4, exports3) {
      }, {}], 13: [function(require2, module4, exports3) {
        (function(process) {
          function normalizeArray(parts, allowAboveRoot) {
            var up = 0;
            for (var i = parts.length - 1; i >= 0; i--) {
              var last = parts[i];
              if (last === ".") {
                parts.splice(i, 1);
              } else if (last === "..") {
                parts.splice(i, 1);
                up++;
              } else if (up) {
                parts.splice(i, 1);
                up--;
              }
            }
            if (allowAboveRoot) {
              for (; up--; up) {
                parts.unshift("..");
              }
            }
            return parts;
          }
          exports3.resolve = function() {
            var resolvedPath = "", resolvedAbsolute = false;
            for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
              var path = i >= 0 ? arguments[i] : process.cwd();
              if (typeof path !== "string") {
                throw new TypeError("Arguments to path.resolve must be strings");
              } else if (!path) {
                continue;
              }
              resolvedPath = path + "/" + resolvedPath;
              resolvedAbsolute = path.charAt(0) === "/";
            }
            resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
              return !!p;
            }), !resolvedAbsolute).join("/");
            return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
          };
          exports3.normalize = function(path) {
            var isAbsolute = exports3.isAbsolute(path), trailingSlash = substr(path, -1) === "/";
            path = normalizeArray(filter(path.split("/"), function(p) {
              return !!p;
            }), !isAbsolute).join("/");
            if (!path && !isAbsolute) {
              path = ".";
            }
            if (path && trailingSlash) {
              path += "/";
            }
            return (isAbsolute ? "/" : "") + path;
          };
          exports3.isAbsolute = function(path) {
            return path.charAt(0) === "/";
          };
          exports3.join = function() {
            var paths = Array.prototype.slice.call(arguments, 0);
            return exports3.normalize(filter(paths, function(p, index) {
              if (typeof p !== "string") {
                throw new TypeError("Arguments to path.join must be strings");
              }
              return p;
            }).join("/"));
          };
          exports3.relative = function(from, to) {
            from = exports3.resolve(from).substr(1);
            to = exports3.resolve(to).substr(1);
            function trim(arr) {
              var start = 0;
              for (; start < arr.length; start++) {
                if (arr[start] !== "")
                  break;
              }
              var end = arr.length - 1;
              for (; end >= 0; end--) {
                if (arr[end] !== "")
                  break;
              }
              if (start > end)
                return [];
              return arr.slice(start, end - start + 1);
            }
            var fromParts = trim(from.split("/"));
            var toParts = trim(to.split("/"));
            var length = Math.min(fromParts.length, toParts.length);
            var samePartsLength = length;
            for (var i = 0; i < length; i++) {
              if (fromParts[i] !== toParts[i]) {
                samePartsLength = i;
                break;
              }
            }
            var outputParts = [];
            for (var i = samePartsLength; i < fromParts.length; i++) {
              outputParts.push("..");
            }
            outputParts = outputParts.concat(toParts.slice(samePartsLength));
            return outputParts.join("/");
          };
          exports3.sep = "/";
          exports3.delimiter = ":";
          exports3.dirname = function(path) {
            if (typeof path !== "string")
              path = path + "";
            if (path.length === 0)
              return ".";
            var code = path.charCodeAt(0);
            var hasRoot = code === 47;
            var end = -1;
            var matchedSlash = true;
            for (var i = path.length - 1; i >= 1; --i) {
              code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  end = i;
                  break;
                }
              } else {
                matchedSlash = false;
              }
            }
            if (end === -1)
              return hasRoot ? "/" : ".";
            if (hasRoot && end === 1) {
              return "/";
            }
            return path.slice(0, end);
          };
          function basename(path) {
            if (typeof path !== "string")
              path = path + "";
            var start = 0;
            var end = -1;
            var matchedSlash = true;
            var i;
            for (i = path.length - 1; i >= 0; --i) {
              if (path.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                  start = i + 1;
                  break;
                }
              } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
            }
            if (end === -1)
              return "";
            return path.slice(start, end);
          }
          exports3.basename = function(path, ext) {
            var f = basename(path);
            if (ext && f.substr(-1 * ext.length) === ext) {
              f = f.substr(0, f.length - ext.length);
            }
            return f;
          };
          exports3.extname = function(path) {
            if (typeof path !== "string")
              path = path + "";
            var startDot = -1;
            var startPart = 0;
            var end = -1;
            var matchedSlash = true;
            var preDotState = 0;
            for (var i = path.length - 1; i >= 0; --i) {
              var code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  startPart = i + 1;
                  break;
                }
                continue;
              }
              if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
              if (code === 46) {
                if (startDot === -1)
                  startDot = i;
                else if (preDotState !== 1)
                  preDotState = 1;
              } else if (startDot !== -1) {
                preDotState = -1;
              }
            }
            if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
              return "";
            }
            return path.slice(startDot, end);
          };
          function filter(xs, f) {
            if (xs.filter)
              return xs.filter(f);
            var res = [];
            for (var i = 0; i < xs.length; i++) {
              if (f(xs[i], i, xs))
                res.push(xs[i]);
            }
            return res;
          }
          var substr = "ab".substr(-1) === "b" ? function(str, start, len) {
            return str.substr(start, len);
          } : function(str, start, len) {
            if (start < 0)
              start = str.length + start;
            return str.substr(start, len);
          };
        }).call(this, require2("_process"));
      }, { "_process": 14 }], 14: [function(require2, module4, exports3) {
        var process = module4.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        (function() {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
          }
          if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e2) {
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
          }
          if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              return cachedClearTimeout.call(null, marker);
            } catch (e2) {
              return cachedClearTimeout.call(this, marker);
            }
          }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }
          draining = false;
          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }
          if (queue.length) {
            drainQueue();
          }
        }
        function drainQueue() {
          if (draining) {
            return;
          }
          var timeout = runTimeout(cleanUpNextTick);
          draining = true;
          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }
            queueIndex = -1;
            len = queue.length;
          }
          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }
        process.nextTick = function(fun) {
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        };
        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }
        Item.prototype.run = function() {
          this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        function noop() {
        }
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;
        process.listeners = function(name) {
          return [];
        };
        process.binding = function(name) {
          throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
          return "/";
        };
        process.chdir = function(dir) {
          throw new Error("process.chdir is not supported");
        };
        process.umask = function() {
          return 0;
        };
      }, {}], 15: [function(require2, module4, exports3) {
        var unparse = require2("escodegen").generate;
        module4.exports = function(ast, vars) {
          if (!vars)
            vars = {};
          var FAIL = {};
          var result = function walk(node, scopeVars) {
            if (node.type === "Literal") {
              return node.value;
            } else if (node.type === "UnaryExpression") {
              var val = walk(node.argument);
              if (node.operator === "+")
                return +val;
              if (node.operator === "-")
                return -val;
              if (node.operator === "~")
                return ~val;
              if (node.operator === "!")
                return !val;
              return FAIL;
            } else if (node.type === "ArrayExpression") {
              var xs = [];
              for (var i = 0, l = node.elements.length; i < l; i++) {
                var x = walk(node.elements[i]);
                if (x === FAIL)
                  return FAIL;
                xs.push(x);
              }
              return xs;
            } else if (node.type === "ObjectExpression") {
              var obj = {};
              for (var i = 0; i < node.properties.length; i++) {
                var prop = node.properties[i];
                var value = prop.value === null ? prop.value : walk(prop.value);
                if (value === FAIL)
                  return FAIL;
                obj[prop.key.value || prop.key.name] = value;
              }
              return obj;
            } else if (node.type === "BinaryExpression" || node.type === "LogicalExpression") {
              var l = walk(node.left);
              if (l === FAIL)
                return FAIL;
              var r = walk(node.right);
              if (r === FAIL)
                return FAIL;
              var op = node.operator;
              if (op === "==")
                return l == r;
              if (op === "===")
                return l === r;
              if (op === "!=")
                return l != r;
              if (op === "!==")
                return l !== r;
              if (op === "+")
                return l + r;
              if (op === "-")
                return l - r;
              if (op === "*")
                return l * r;
              if (op === "/")
                return l / r;
              if (op === "%")
                return l % r;
              if (op === "<")
                return l < r;
              if (op === "<=")
                return l <= r;
              if (op === ">")
                return l > r;
              if (op === ">=")
                return l >= r;
              if (op === "|")
                return l | r;
              if (op === "&")
                return l & r;
              if (op === "^")
                return l ^ r;
              if (op === "&&")
                return l && r;
              if (op === "||")
                return l || r;
              return FAIL;
            } else if (node.type === "Identifier") {
              if ({}.hasOwnProperty.call(vars, node.name)) {
                return vars[node.name];
              } else
                return FAIL;
            } else if (node.type === "ThisExpression") {
              if ({}.hasOwnProperty.call(vars, "this")) {
                return vars["this"];
              } else
                return FAIL;
            } else if (node.type === "CallExpression") {
              var callee = walk(node.callee);
              if (callee === FAIL)
                return FAIL;
              if (typeof callee !== "function")
                return FAIL;
              var ctx = node.callee.object ? walk(node.callee.object) : FAIL;
              if (ctx === FAIL)
                ctx = null;
              var args = [];
              for (var i = 0, l = node.arguments.length; i < l; i++) {
                var x = walk(node.arguments[i]);
                if (x === FAIL)
                  return FAIL;
                args.push(x);
              }
              return callee.apply(ctx, args);
            } else if (node.type === "MemberExpression") {
              var obj = walk(node.object);
              if (obj === FAIL || typeof obj == "function") {
                return FAIL;
              }
              if (node.property.type === "Identifier") {
                return obj[node.property.name];
              }
              var prop = walk(node.property);
              if (prop === FAIL)
                return FAIL;
              return obj[prop];
            } else if (node.type === "ConditionalExpression") {
              var val = walk(node.test);
              if (val === FAIL)
                return FAIL;
              return val ? walk(node.consequent) : walk(node.alternate);
            } else if (node.type === "ExpressionStatement") {
              var val = walk(node.expression);
              if (val === FAIL)
                return FAIL;
              return val;
            } else if (node.type === "ReturnStatement") {
              return walk(node.argument);
            } else if (node.type === "FunctionExpression") {
              var bodies = node.body.body;
              var oldVars = {};
              Object.keys(vars).forEach(function(element) {
                oldVars[element] = vars[element];
              });
              for (var i = 0; i < node.params.length; i++) {
                var key = node.params[i];
                if (key.type == "Identifier") {
                  vars[key.name] = null;
                } else
                  return FAIL;
              }
              for (var i in bodies) {
                if (walk(bodies[i]) === FAIL) {
                  return FAIL;
                }
              }
              vars = oldVars;
              var keys = Object.keys(vars);
              var vals = keys.map(function(key2) {
                return vars[key2];
              });
              return Function(keys.join(", "), "return " + unparse(node)).apply(null, vals);
            } else if (node.type === "TemplateLiteral") {
              var str = "";
              for (var i = 0; i < node.expressions.length; i++) {
                str += walk(node.quasis[i]);
                str += walk(node.expressions[i]);
              }
              str += walk(node.quasis[i]);
              return str;
            } else if (node.type === "TaggedTemplateExpression") {
              var tag = walk(node.tag);
              var quasi = node.quasi;
              var strings = quasi.quasis.map(walk);
              var values = quasi.expressions.map(walk);
              return tag.apply(null, [strings].concat(values));
            } else if (node.type === "TemplateElement") {
              return node.value.cooked;
            } else
              return FAIL;
          }(ast);
          return result === FAIL ? void 0 : result;
        };
      }, { "escodegen": 12 }], "jsonpath": [function(require2, module4, exports3) {
        module4.exports = require2("./lib/index");
      }, { "./lib/index": 5 }] }, {}, ["jsonpath"])("jsonpath");
    });
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  ObsidianApp: () => ObsidianApp,
  default: () => JiraIssuePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian10 = require("obsidian");

// src/settings.ts
var import_obsidian2 = require("obsidian");

// src/client/jiraClient.ts
var import_obsidian = require("obsidian");

// src/interfaces/settingsInterfaces.ts
var COLOR_SCHEMA_DESCRIPTION = {
  ["FOLLOW_OBSIDIAN" /* FOLLOW_OBSIDIAN */]: "Follow Obsidian",
  ["LIGHT" /* LIGHT */]: "Light",
  ["DARK" /* DARK */]: "Dark"
};
var COMPACT_SYMBOL = "-";
var AVATAR_RESOLUTION = "16x16";
var COMMENT_REGEX = /^\s*#/;
var JIRA_KEY_REGEX = "[A-Z][A-Z0-9_]*-[0-9]+";
var ESearchResultsRenderingTypes = /* @__PURE__ */ ((ESearchResultsRenderingTypes3) => {
  ESearchResultsRenderingTypes3["TABLE"] = "TABLE";
  ESearchResultsRenderingTypes3["LIST"] = "LIST";
  return ESearchResultsRenderingTypes3;
})(ESearchResultsRenderingTypes || {});
var SEARCH_RESULTS_RENDERING_TYPE_DESCRIPTION = {
  ["TABLE" /* TABLE */]: "Table",
  ["LIST" /* LIST */]: "List"
};
var ESearchColumnsTypes = /* @__PURE__ */ ((ESearchColumnsTypes2) => {
  ESearchColumnsTypes2["KEY"] = "KEY";
  ESearchColumnsTypes2["SUMMARY"] = "SUMMARY";
  ESearchColumnsTypes2["DESCRIPTION"] = "DESCRIPTION";
  ESearchColumnsTypes2["TYPE"] = "TYPE";
  ESearchColumnsTypes2["CREATED"] = "CREATED";
  ESearchColumnsTypes2["UPDATED"] = "UPDATED";
  ESearchColumnsTypes2["REPORTER"] = "REPORTER";
  ESearchColumnsTypes2["ASSIGNEE"] = "ASSIGNEE";
  ESearchColumnsTypes2["PRIORITY"] = "PRIORITY";
  ESearchColumnsTypes2["STATUS"] = "STATUS";
  ESearchColumnsTypes2["DUE_DATE"] = "DUE_DATE";
  ESearchColumnsTypes2["RESOLUTION"] = "RESOLUTION";
  ESearchColumnsTypes2["RESOLUTION_DATE"] = "RESOLUTION_DATE";
  ESearchColumnsTypes2["PROJECT"] = "PROJECT";
  ESearchColumnsTypes2["ENVIRONMENT"] = "ENVIRONMENT";
  ESearchColumnsTypes2["AGGREGATE_PROGRESS"] = "AGGREGATE_PROGRESS";
  ESearchColumnsTypes2["AGGREGATE_TIME_ESTIMATED"] = "AGGREGATE_TIME_ESTIMATED";
  ESearchColumnsTypes2["AGGREGATE_TIME_ORIGINAL_ESTIMATE"] = "AGGREGATE_TIME_ORIGINAL_ESTIMATE";
  ESearchColumnsTypes2["AGGREGATE_TIME_SPENT"] = "AGGREGATE_TIME_SPENT";
  ESearchColumnsTypes2["FIX_VERSIONS"] = "FIX_VERSIONS";
  ESearchColumnsTypes2["LABELS"] = "LABELS";
  ESearchColumnsTypes2["COMPONENTS"] = "COMPONENTS";
  ESearchColumnsTypes2["LAST_VIEWED"] = "LAST_VIEWED";
  ESearchColumnsTypes2["PROGRESS"] = "PROGRESS";
  ESearchColumnsTypes2["TIME_ESTIMATE"] = "TIME_ESTIMATE";
  ESearchColumnsTypes2["TIME_ORIGINAL_ESTIMATE"] = "TIME_ORIGINAL_ESTIMATE";
  ESearchColumnsTypes2["TIME_SPENT"] = "TIME_SPENT";
  ESearchColumnsTypes2["DEV_STATUS"] = "DEV_STATUS";
  ESearchColumnsTypes2["CUSTOM_FIELD"] = "CUSTOM_FIELD";
  ESearchColumnsTypes2["NOTES"] = "NOTES";
  return ESearchColumnsTypes2;
})(ESearchColumnsTypes || {});
var SEARCH_COLUMNS_DESCRIPTION = {
  ["KEY" /* KEY */]: "Key",
  ["SUMMARY" /* SUMMARY */]: "Summary",
  ["DESCRIPTION" /* DESCRIPTION */]: "Description",
  ["TYPE" /* TYPE */]: "Type",
  ["CREATED" /* CREATED */]: "Created",
  ["UPDATED" /* UPDATED */]: "Updated",
  ["REPORTER" /* REPORTER */]: "Reporter",
  ["ASSIGNEE" /* ASSIGNEE */]: "Assignee",
  ["PRIORITY" /* PRIORITY */]: "Priority",
  ["STATUS" /* STATUS */]: "Status",
  ["DUE_DATE" /* DUE_DATE */]: "Due Date",
  ["RESOLUTION" /* RESOLUTION */]: "Resolution",
  ["RESOLUTION_DATE" /* RESOLUTION_DATE */]: "Resolution Date",
  ["PROJECT" /* PROJECT */]: "Project",
  ["ENVIRONMENT" /* ENVIRONMENT */]: "Environment",
  ["AGGREGATE_PROGRESS" /* AGGREGATE_PROGRESS */]: "#Progress",
  ["AGGREGATE_TIME_ESTIMATED" /* AGGREGATE_TIME_ESTIMATED */]: "#\u{1F551}Estimated",
  ["AGGREGATE_TIME_ORIGINAL_ESTIMATE" /* AGGREGATE_TIME_ORIGINAL_ESTIMATE */]: "#\u{1F551}Original Estimate",
  ["AGGREGATE_TIME_SPENT" /* AGGREGATE_TIME_SPENT */]: "#\u{1F551}Spent",
  ["FIX_VERSIONS" /* FIX_VERSIONS */]: "Fix Versions",
  ["LABELS" /* LABELS */]: "Labels",
  ["COMPONENTS" /* COMPONENTS */]: "Components",
  ["LAST_VIEWED" /* LAST_VIEWED */]: "Last Viewed",
  ["PROGRESS" /* PROGRESS */]: "Progress",
  ["TIME_ESTIMATE" /* TIME_ESTIMATE */]: "\u{1F551}Estimate",
  ["TIME_ORIGINAL_ESTIMATE" /* TIME_ORIGINAL_ESTIMATE */]: "\u{1F551}Original Estimate",
  ["TIME_SPENT" /* TIME_SPENT */]: "\u{1F551}Spent",
  ["DEV_STATUS" /* DEV_STATUS */]: "Dev Status",
  ["CUSTOM_FIELD" /* CUSTOM_FIELD */]: "Custom field",
  ["NOTES" /* NOTES */]: "Notes"
};

// src/client/jiraClient.ts
function getMimeType(imageBuffer) {
  const imageBufferUint8 = new Uint8Array(imageBuffer.slice(0, 4));
  let bytes = [];
  imageBufferUint8.forEach((byte) => {
    bytes.push(byte.toString(16));
  });
  const hex = bytes.join("").toUpperCase();
  switch (hex) {
    case "89504E47":
      return "image/png";
    case "47494638":
      return "image/gif";
    case "FFD8FFDB":
    case "FFD8FFE0":
    case "FFD8FFE1":
      return "image/jpeg";
    case "3C737667":
    case "3C3F786D":
      return "image/svg+xml";
    default:
      SettingsData.logImagesFetch && console.error("Image mimeType not found:", hex);
      return null;
  }
}
function bufferBase64Encode(b) {
  const a = new Uint8Array(b);
  if (import_obsidian.Platform.isMobileApp) {
    return btoa(String.fromCharCode(...a));
  } else {
    return Buffer.from(a).toString("base64");
  }
}
function base64Encode(s) {
  if (import_obsidian.Platform.isMobileApp) {
    return btoa(s);
  } else {
    return Buffer.from(s).toString("base64");
  }
}
function buildUrl(host, requestOptions) {
  const basePath = requestOptions.noBasePath ? "" : SettingsData.apiBasePath;
  const url = new URL(`${host}${basePath}${requestOptions.path}`);
  if (requestOptions.queryParameters) {
    url.search = requestOptions.queryParameters.toString();
  }
  return url.toString();
}
function buildHeaders(account) {
  const requestHeaders = {};
  if (account.authenticationType === "BASIC" /* BASIC */ || account.authenticationType === "CLOUD" /* CLOUD */) {
    requestHeaders["Authorization"] = "Basic " + base64Encode(`${account.username}:${account.password}`);
  } else if (account.authenticationType === "BEARER_TOKEN" /* BEARER_TOKEN */) {
    requestHeaders["Authorization"] = `Bearer ${account.bareToken}`;
  }
  return requestHeaders;
}
async function sendRequest(requestOptions) {
  let response;
  if (requestOptions.account) {
    response = await sendRequestWithAccount(requestOptions.account, requestOptions);
    if (response.status === 200) {
      return { ...response.json, account: requestOptions.account };
    }
  } else {
    for (let i = 0; i < SettingsData.accounts.length; i++) {
      const account = SettingsData.accounts[i];
      response = await sendRequestWithAccount(account, requestOptions);
      if (response.status === 200) {
        return { ...response.json, account };
      } else if (Math.floor(response.status / 100) !== 4) {
        break;
      }
    }
  }
  if (response && response.headers && response.headers["content-type"].contains("json") && response.json && response.json.errorMessages) {
    throw new Error(response.json.errorMessages.join("\n"));
  } else if (response && response.status) {
    switch (response.status) {
      case 400:
        throw new Error(`The query is not valid`);
      case 404:
        throw new Error(`Issue does not exist`);
      case 410:
        throw new Error(`API endpoint is no longer available. This may be due to API version changes. Please check your Jira API version compatibility.`);
      default:
        throw new Error(`HTTP status ${response.status}`);
    }
  } else {
    throw new Error(response);
  }
}
async function sendRequestWithAccount(account, requestOptions) {
  let response;
  const requestUrlParam = {
    method: requestOptions.method,
    url: buildUrl(account.host, requestOptions),
    headers: buildHeaders(account),
    contentType: "application/json"
  };
  try {
    response = await (0, import_obsidian.requestUrl)(requestUrlParam);
    SettingsData.logRequestsResponses && console.info("JiraIssue:Fetch:", { request: requestUrlParam, response });
  } catch (errorResponse) {
    SettingsData.logRequestsResponses && console.warn("JiraIssue:Fetch:", { request: requestUrlParam, response: errorResponse });
    response = errorResponse;
  }
  return response;
}
async function preFetchImage(account, url) {
  if (!url.startsWith(account.host)) {
    return url;
  }
  const options = {
    url,
    method: "GET",
    headers: buildHeaders(account)
  };
  let response;
  try {
    response = await (0, import_obsidian.requestUrl)(options);
    SettingsData.logImagesFetch && console.info("JiraIssue:FetchImage:", { request: options, response });
  } catch (errorResponse) {
    SettingsData.logImagesFetch && console.warn("JiraIssue:FetchImage:", { request: options, response: errorResponse });
    response = errorResponse;
  }
  if (response.status === 200) {
    const mimeType = getMimeType(response.arrayBuffer);
    if (mimeType) {
      return `data:${mimeType};base64,` + bufferBase64Encode(response.arrayBuffer);
    }
  }
  return null;
}
async function fetchIssueImages(issue) {
  if (issue.fields) {
    if (issue.fields.issuetype && issue.fields.issuetype.iconUrl) {
      issue.fields.issuetype.iconUrl = await preFetchImage(issue.account, issue.fields.issuetype.iconUrl);
    }
    if (issue.fields.reporter) {
      issue.fields.reporter.avatarUrls[AVATAR_RESOLUTION] = await preFetchImage(issue.account, issue.fields.reporter.avatarUrls[AVATAR_RESOLUTION]);
    }
    if (issue.fields.assignee && issue.fields.assignee.avatarUrls && issue.fields.assignee.avatarUrls[AVATAR_RESOLUTION]) {
      issue.fields.assignee.avatarUrls[AVATAR_RESOLUTION] = await preFetchImage(issue.account, issue.fields.assignee.avatarUrls[AVATAR_RESOLUTION]);
    }
    if (issue.fields.priority && issue.fields.priority.iconUrl) {
      issue.fields.priority.iconUrl = await preFetchImage(issue.account, issue.fields.priority.iconUrl);
    }
  }
}
var jiraClient_default = {
  async getIssue(issueKey, options = {}) {
    const opt = {
      fields: options.fields || [],
      account: options.account || null
    };
    const queryParameters = new URLSearchParams({
      fields: opt.fields.join(",")
    });
    const issue = await sendRequest(
      {
        method: "GET",
        path: `/issue/${issueKey}`,
        account: opt.account,
        queryParameters
      }
    );
    await fetchIssueImages(issue);
    return issue;
  },
  async getSearchResults(query2, options = {}) {
    const opt = {
      fields: options.fields || ["id", "key", "summary", "status", "assignee", "reporter", "issuetype", "priority", "created", "updated", "project"],
      offset: options.offset || 0,
      limit: options.limit || 50,
      account: options.account || null
    };
    const queryParameters = new URLSearchParams({
      jql: query2,
      fields: opt.fields.join(","),
      startAt: opt.offset > 0 ? opt.offset.toString() : "",
      maxResults: opt.limit > 0 ? opt.limit.toString() : ""
    });
    const searchResults = await sendRequest(
      {
        method: "GET",
        path: `/search/jql`,
        queryParameters,
        account: opt.account
      }
    );
    SettingsData.logRequestsResponses && console.log("JiraIssue:SearchResults:", searchResults);
    for (const issue of searchResults.issues) {
      issue.account = searchResults.account;
      await fetchIssueImages(issue);
    }
    return searchResults;
  },
  async updateStatusColorCache(status, account) {
    if (status in account.cache.statusColor) {
      return;
    }
    const response = await sendRequest(
      {
        method: "GET",
        path: `/status/${status}`
      }
    );
    account.cache.statusColor[status] = response.statusCategory.colorName;
  },
  async updateCustomFieldsCache() {
    SettingsData.cache.columns = [];
    for (const account of SettingsData.accounts) {
      try {
        const response = await sendRequest(
          {
            method: "GET",
            path: `/field`,
            account
          }
        );
        account.cache.customFieldsIdToName = {};
        account.cache.customFieldsNameToId = {};
        account.cache.customFieldsType = {};
        for (let i in response) {
          const field = response[i];
          if (field.custom && field.schema && field.schema.customId) {
            account.cache.customFieldsIdToName[field.schema.customId] = field.name;
            account.cache.customFieldsNameToId[field.name] = field.schema.customId.toString();
            account.cache.customFieldsType[field.schema.customId] = field.schema;
            SettingsData.cache.columns.push(field.schema.customId.toString(), field.name.toUpperCase());
          }
        }
      } catch (e) {
        console.error("Error while retrieving custom fields list of account:", account.alias, e);
      }
    }
  },
  async getJQLAutoCompleteField(fieldName, fieldValue) {
    const queryParameters = new URLSearchParams({
      fieldName,
      fieldValue
    });
    return await sendRequest(
      {
        method: "GET",
        path: `/jql/autocompletedata/suggestions`,
        queryParameters
      }
    );
  },
  async testConnection(account) {
    await sendRequest(
      {
        method: "GET",
        path: `/project`,
        account
      }
    );
    return true;
  },
  async getLoggedUser(account = null) {
    return await sendRequest(
      {
        method: "GET",
        path: `/myself`,
        account
      }
    );
  },
  async getDevStatus(issueId, options = {}) {
    const opt = {
      account: options.account || null
    };
    const queryParameters = new URLSearchParams({
      issueId
    });
    return await sendRequest(
      {
        method: "GET",
        path: `/rest/dev-status/latest/issue/summary`,
        queryParameters,
        noBasePath: true,
        account: opt.account
      }
    );
  },
  async getBoards(projectKeyOrId, options = {}) {
    const opt = {
      offset: options.offset || 0,
      limit: options.limit || 50,
      account: options.account || null
    };
    const queryParameters = new URLSearchParams({
      projectKeyOrId,
      startAt: opt.offset > 0 ? opt.offset.toString() : "",
      maxResults: opt.limit > 0 ? opt.limit.toString() : ""
    });
    const boards = await sendRequest(
      {
        method: "GET",
        path: `/rest/agile/1.0/board`,
        queryParameters,
        noBasePath: true,
        account: opt.account
      }
    );
    if (boards.values && boards.values.length) {
      return boards.values;
    }
    return [];
  },
  async getSprints(boardId, options = {}) {
    const opt = {
      state: options.state || [],
      offset: options.offset || 0,
      limit: options.limit || 50,
      account: options.account || null
    };
    const queryParameters = new URLSearchParams({
      state: opt.state.join(","),
      startAt: opt.offset > 0 ? opt.offset.toString() : "",
      maxResults: opt.limit > 0 ? opt.limit.toString() : ""
    });
    const sprints = await sendRequest(
      {
        method: "GET",
        path: `/rest/agile/1.0/board/${boardId}/sprint`,
        queryParameters,
        noBasePath: true,
        account: opt.account
      }
    );
    if (sprints.values && sprints.values.length) {
      return sprints.values;
    }
    return [];
  },
  async getSprint(sprintId, options = {}) {
    const opt = {
      account: options.account || null
    };
    return await sendRequest(
      {
        method: "GET",
        path: `/rest/agile/1.0/sprint/${sprintId}`,
        noBasePath: true,
        account: opt.account
      }
    );
  }
};

// src/utils.ts
var colorsys = require_colorsys();
function getAccountByAlias(alias) {
  if (alias) {
    const account = SettingsData.accounts.find((account2) => account2.alias.toUpperCase() === alias.toUpperCase());
    if (!account) {
      throw new Error(`No accounts found with alias: ${alias}`);
    }
    return account;
  } else {
    return null;
  }
}
function getAccountByHost(host) {
  if (host) {
    return SettingsData.accounts.find((account) => account.host === host) || null;
  } else {
    return null;
  }
}
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomHexColor() {
  return colorsys.hslToHex(randomBetween(0, 359), randomBetween(40, 100), randomBetween(45, 75));
}

// src/settings.ts
var AUTHENTICATION_TYPE_DESCRIPTION = {
  ["OPEN" /* OPEN */]: "Open",
  ["BASIC" /* BASIC */]: "Basic Authentication",
  ["CLOUD" /* CLOUD */]: "Jira Cloud",
  ["BEARER_TOKEN" /* BEARER_TOKEN */]: "Bearer Token"
};
var DEFAULT_SETTINGS = {
  accounts: [],
  apiBasePath: "/rest/api/3",
  cacheTime: "15m",
  searchResultsLimit: 10,
  cache: {
    columns: []
  },
  colorSchema: "FOLLOW_OBSIDIAN" /* FOLLOW_OBSIDIAN */,
  inlineIssueUrlToTag: true,
  inlineIssuePrefix: "JIRA:",
  showColorBand: true,
  showJiraLink: true,
  searchColumns: [
    { type: "KEY" /* KEY */, compact: false },
    { type: "SUMMARY" /* SUMMARY */, compact: false },
    { type: "TYPE" /* TYPE */, compact: true },
    { type: "CREATED" /* CREATED */, compact: false },
    { type: "UPDATED" /* UPDATED */, compact: false },
    { type: "REPORTER" /* REPORTER */, compact: false },
    { type: "ASSIGNEE" /* ASSIGNEE */, compact: false },
    { type: "PRIORITY" /* PRIORITY */, compact: true },
    { type: "STATUS" /* STATUS */, compact: false }
  ],
  logRequestsResponses: false,
  logImagesFetch: false
};
var DEFAULT_ACCOUNT = {
  alias: "Default",
  host: "https://mycompany.atlassian.net",
  authenticationType: "OPEN" /* OPEN */,
  password: "",
  priority: 1,
  color: "#000000",
  cache: {
    statusColor: {},
    customFieldsIdToName: {},
    customFieldsNameToId: {},
    customFieldsType: {},
    jqlAutocomplete: {
      fields: [],
      functions: {}
    }
  }
};
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
var JiraIssueSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this._onChangeListener = null;
    this._searchColumnsDetails = null;
    this._showPassword = false;
    this._plugin = plugin;
  }
  async loadSettings() {
    Object.assign(SettingsData, DEFAULT_SETTINGS, await this._plugin.loadData());
    for (const i in SettingsData.accounts) {
      SettingsData.accounts[i] = Object.assign({}, DEFAULT_ACCOUNT, SettingsData.accounts[i]);
    }
    SettingsData.cache = deepCopy(DEFAULT_SETTINGS.cache);
    if (SettingsData.accounts.length === 0 || SettingsData.accounts[0] === null) {
      if (SettingsData.host) {
        SettingsData.accounts = [
          {
            priority: 1,
            host: SettingsData.host,
            authenticationType: SettingsData.authenticationType,
            username: SettingsData.username,
            password: SettingsData.password,
            bareToken: SettingsData.bareToken,
            alias: DEFAULT_ACCOUNT.alias,
            color: DEFAULT_ACCOUNT.color,
            cache: DEFAULT_ACCOUNT.cache
          }
        ];
      } else {
        SettingsData.accounts = [DEFAULT_ACCOUNT];
      }
      this.saveSettings();
    }
    this.accountsConflictsFix();
  }
  async saveSettings() {
    const settingsToStore = Object.assign({}, SettingsData, {
      cache: DEFAULT_SETTINGS.cache,
      jqlAutocomplete: null,
      customFieldsIdToName: null,
      customFieldsNameToId: null,
      statusColorCache: null
    });
    settingsToStore.accounts.forEach((account) => account.cache = DEFAULT_ACCOUNT.cache);
    delete settingsToStore["darkMode"];
    delete settingsToStore["host"];
    delete settingsToStore["authenticationType"];
    delete settingsToStore["username"];
    delete settingsToStore["password"];
    delete settingsToStore["customFieldsNames"];
    await this._plugin.saveData(settingsToStore);
    if (this._onChangeListener) {
      this._onChangeListener();
    }
  }
  onChange(listener) {
    this._onChangeListener = listener;
  }
  display() {
    const isSearchColumnsDetailsOpen = this._searchColumnsDetails && this._searchColumnsDetails.getAttribute("open") !== null;
    this.containerEl.empty();
    this.displayHeader();
    this.displayAccountsSettings();
    this.displayRenderingSettings();
    this.displaySearchColumnsSettings(isSearchColumnsDetailsOpen);
    this.displayExtraSettings();
    this.displayFooter();
  }
  displayHeader() {
    const { containerEl } = this;
    containerEl.createEl("h2", { text: "Jira Issue" });
    const description = containerEl.createEl("p");
    description.appendText("Need help? Explore the ");
    description.appendChild(createEl("a", {
      text: "Jira Issue documentation",
      href: "https://marc0l92.github.io/obsidian-jira-issue/"
    }));
    description.appendText(".");
  }
  displayFooter() {
    const { containerEl } = this;
    containerEl.createEl("h3", { text: "Support development" });
    const description = containerEl.createEl("p");
    description.appendText("If you enjoy JiraIssue, consider giving me your feedback on the ");
    description.appendChild(createEl("a", {
      text: "github repository",
      href: "https://github.com/marc0l92/obsidian-jira-issue/issues"
    }));
    description.appendText(", and maybe ");
    description.appendChild(createEl("a", {
      text: "buying me a coffee",
      href: "https://ko-fi.com/marc0l92"
    }));
    description.appendText(" \u2615.");
    const buyMeACoffee = containerEl.createEl("a", { href: "https://ko-fi.com/marc0l92" });
    buyMeACoffee.appendChild(createEl("img", {
      attr: {
        src: "https://ko-fi.com/img/githubbutton_sm.svg",
        height: "30"
      }
    }));
  }
  displayAccountsSettings() {
    const { containerEl } = this;
    containerEl.createEl("h3", { text: "Accounts" });
    for (const account of SettingsData.accounts) {
      const accountSetting = new import_obsidian2.Setting(containerEl).setName(`${account.priority}: ${account.alias}`).setDesc(account.host).addExtraButton((button) => button.setIcon("pencil").setTooltip("Modify").onClick(async () => {
        this.displayModifyAccountPage(account);
      })).addExtraButton((button) => button.setIcon("trash").setTooltip("Delete").setDisabled(SettingsData.accounts.length <= 1).onClick(async () => {
        SettingsData.accounts.remove(account);
        this.accountsConflictsFix();
        await this.saveSettings();
        this.display();
      }));
      accountSetting.infoEl.setAttr("style", "padding-left:5px;border-left:5px solid " + account.color);
    }
    new import_obsidian2.Setting(containerEl).addButton((button) => button.setButtonText("Add account").setCta().onClick(async (value) => {
      SettingsData.accounts.push(this.createNewEmptyAccount());
      this.accountsConflictsFix();
      await this.saveSettings();
      this.display();
    }));
  }
  displayModifyAccountPage(prevAccount, newAccount = null) {
    if (!newAccount)
      newAccount = Object.assign({}, prevAccount);
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h3", { text: "Modify account" });
    new import_obsidian2.Setting(containerEl).setName("Alias").setDesc("Name of this account.").addText((text) => text.setPlaceholder("Example: Company name").setValue(newAccount.alias).onChange(async (value) => {
      newAccount.alias = value;
    }));
    new import_obsidian2.Setting(containerEl).setName("Host").setDesc("Hostname of your company Jira server.").addText((text) => text.setPlaceholder("Example: " + DEFAULT_ACCOUNT.host).setValue(newAccount.host).onChange(async (value) => {
      newAccount.host = value;
    }));
    new import_obsidian2.Setting(containerEl).setName("Authentication type").setDesc("Select how the plugin should authenticate in your Jira server.").addDropdown((dropdown) => dropdown.addOptions(AUTHENTICATION_TYPE_DESCRIPTION).setValue(newAccount.authenticationType).onChange(async (value) => {
      newAccount.authenticationType = value;
      this._showPassword = false;
      this.displayModifyAccountPage(prevAccount, newAccount);
    }));
    if (newAccount.authenticationType === "BASIC" /* BASIC */) {
      new import_obsidian2.Setting(containerEl).setName("Username").setDesc("Username to access your Jira Server account using HTTP basic authentication.").addText((text) => text.setValue(newAccount.username).onChange(async (value) => {
        newAccount.username = value;
      }));
      new import_obsidian2.Setting(containerEl).setName("Password").setDesc("Password to access your Jira Server account using HTTP basic authentication.").addText((text) => text.setValue(newAccount.password).onChange(async (value) => {
        newAccount.password = value;
      }).inputEl.setAttr("type", this._showPassword ? "text" : "password")).addExtraButton((button) => button.setIcon(this._showPassword ? "jira-issue-hidden" : "jira-issue-visible").setTooltip(this._showPassword ? "Hide password" : "Show password").onClick(async () => {
        this._showPassword = !this._showPassword;
        this.displayModifyAccountPage(prevAccount, newAccount);
      }));
    } else if (newAccount.authenticationType === "CLOUD" /* CLOUD */) {
      new import_obsidian2.Setting(containerEl).setName("Email").setDesc("Email of your Jira Cloud account.").addText((text) => text.setValue(newAccount.username).onChange(async (value) => {
        newAccount.username = value;
      }));
      const apiTokenDescription = new import_obsidian2.Setting(containerEl).setName("API Token").addText((text) => text.setValue(newAccount.password).onChange(async (value) => {
        newAccount.password = value;
      }).inputEl.setAttr("type", this._showPassword ? "text" : "password")).addExtraButton((button) => button.setIcon(this._showPassword ? "jira-issue-hidden" : "jira-issue-visible").setTooltip(this._showPassword ? "Hide password" : "Show password").onClick(async () => {
        this._showPassword = !this._showPassword;
        this.displayModifyAccountPage(prevAccount, newAccount);
      })).descEl;
      apiTokenDescription.appendText("API token of your Jira Cloud account (");
      apiTokenDescription.appendChild(createEl("a", {
        text: "Official Documentation",
        href: "https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/"
      }));
      apiTokenDescription.appendText(").");
    } else if (newAccount.authenticationType === "BEARER_TOKEN" /* BEARER_TOKEN */) {
      new import_obsidian2.Setting(containerEl).setName("Bearer token").setDesc("Token to access your Jira account using OAuth3 Bearer token authentication.").addText((text) => text.setValue(newAccount.bareToken).onChange(async (value) => {
        newAccount.bareToken = value;
      }).inputEl.setAttr("type", this._showPassword ? "text" : "password")).addExtraButton((button) => button.setIcon(this._showPassword ? "jira-issue-hidden" : "jira-issue-visible").setTooltip(this._showPassword ? "Hide password" : "Show password").onClick(async () => {
        this._showPassword = !this._showPassword;
        this.displayModifyAccountPage(prevAccount, newAccount);
      }));
    }
    new import_obsidian2.Setting(containerEl).setName("Priority").setDesc("Accounts search priority.").addDropdown((dropdown) => dropdown.addOptions(this.createPriorityOptions()).setValue(newAccount.priority.toString()).onChange(async (value) => {
      newAccount.priority = parseInt(value);
    }));
    let colorTextComponent = null;
    const colorInput = new import_obsidian2.Setting(containerEl).setName("Color band").setDesc("Color of the tags border. Use colors in hexadecimal notation (Example: #000000).").addText((text) => {
      text.setPlaceholder("Example: #000000").setValue(newAccount.color).onChange(async (value) => {
        newAccount.color = value.replace(/[^#0-9A-Fa-f]/g, "");
        if (newAccount.color[0] != "#")
          newAccount.color = "#" + newAccount.color;
        colorInput.setAttr("style", "border-left: 5px solid " + newAccount.color);
      });
      colorTextComponent = text;
    }).addExtraButton((button) => button.setIcon("dice").setTooltip("New random color").onClick(async () => {
      newAccount.color = getRandomHexColor();
      if (colorTextComponent != null)
        colorTextComponent.setValue(newAccount.color);
      colorInput.setAttr("style", "border-left: 5px solid " + newAccount.color);
    })).controlEl.children[0];
    colorInput.setAttr("style", "border-left: 5px solid " + newAccount.color);
    new import_obsidian2.Setting(containerEl).addButton((button) => button.setButtonText("Back").setWarning().onClick(async (value) => {
      this._showPassword = false;
      this.display();
    })).addButton((button) => button.setButtonText("Test Connection").onClick(async (value) => {
      button.setDisabled(true);
      button.setButtonText("Testing...");
      try {
        await jiraClient_default.testConnection(newAccount);
        new import_obsidian2.Notice("JiraIssue: Connection established!");
        try {
          const loggedUser = await jiraClient_default.getLoggedUser(newAccount);
          new import_obsidian2.Notice(`JiraIssue: Logged as ${loggedUser.displayName}`);
        } catch (e) {
          new import_obsidian2.Notice("JiraIssue: Logged as Guest");
          console.error("JiraIssue:TestConnection", e);
        }
      } catch (e) {
        console.error("JiraIssue:TestConnection", e);
        new import_obsidian2.Notice("JiraIssue: Connection failed!");
      }
      button.setButtonText("Test Connection");
      button.setDisabled(false);
    })).addButton((button) => button.setButtonText("Save").setCta().onClick(async (value) => {
      this._showPassword = false;
      SettingsData.accounts.find((a) => a.priority === newAccount.priority).priority = prevAccount.priority;
      Object.assign(prevAccount, newAccount);
      this.accountsConflictsFix();
      await this.saveSettings();
      this.display();
    }));
  }
  displayRenderingSettings() {
    const { containerEl } = this;
    containerEl.createEl("h3", { text: "Rendering" });
    new import_obsidian2.Setting(containerEl).setName("Default search results limit").setDesc("Maximum number of search results to retrieve when using jira-search without specifying a limit.").addText((text) => text.setValue(SettingsData.searchResultsLimit.toString()).onChange(async (value) => {
      SettingsData.searchResultsLimit = parseInt(value) || DEFAULT_SETTINGS.searchResultsLimit;
      await this.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName("Color schema").addDropdown((dropdown) => dropdown.addOptions(COLOR_SCHEMA_DESCRIPTION).setValue(SettingsData.colorSchema).onChange(async (value) => {
      SettingsData.colorSchema = value;
      await this.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName("Issue url to tags").setDesc(`Convert links to issues to tags. Example: ${SettingsData.accounts[0].host}/browse/AAA-123`).addToggle((toggle) => toggle.setValue(SettingsData.inlineIssueUrlToTag).onChange(async (value) => {
      SettingsData.inlineIssueUrlToTag = value;
      await this.saveSettings();
    }));
    const inlineIssuePrefixDesc = (prefix) => "Prefix to use when rendering inline issues. Keep this field empty to disable this feature. " + (prefix ? `Example: ${prefix}AAA-123` : "Feature disabled.");
    const inlineIssuePrefixSetting = new import_obsidian2.Setting(containerEl).setName("Inline issue prefix").setDesc(inlineIssuePrefixDesc(SettingsData.inlineIssuePrefix)).addText((text) => text.setValue(SettingsData.inlineIssuePrefix).onChange(async (value) => {
      SettingsData.inlineIssuePrefix = value;
      inlineIssuePrefixSetting.setDesc(inlineIssuePrefixDesc(SettingsData.inlineIssuePrefix));
      await this.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName("Show color band").setDesc("Display color band near by inline issue to simplify the account identification.").addToggle((toggle) => toggle.setValue(SettingsData.showColorBand).onChange(async (value) => {
      SettingsData.showColorBand = value;
      await this.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName("Show Jira link").setDesc("Make the result count in jira-search a link to the jira project with the jql from the search.").addToggle((toggle) => toggle.setValue(SettingsData.showJiraLink).onChange(async (value) => {
      SettingsData.showJiraLink = value;
      await this.saveSettings();
    }));
  }
  displaySearchColumnsSettings(isSearchColumnsDetailsOpen) {
    const { containerEl } = this;
    containerEl.createEl("h3", { text: "Search columns" });
    const desc = document.createDocumentFragment();
    desc.append(
      "Columns to display in the jira-search table visualization."
    );
    new import_obsidian2.Setting(containerEl).setDesc(desc);
    this._searchColumnsDetails = containerEl.createEl(
      "details",
      { attr: isSearchColumnsDetailsOpen ? { open: true } : {} }
    );
    this._searchColumnsDetails.createEl("summary", { text: "Show/Hide columns" });
    SettingsData.searchColumns.forEach((column, index) => {
      const setting = new import_obsidian2.Setting(this._searchColumnsDetails).addDropdown(
        (dropdown) => dropdown.addOptions(SEARCH_COLUMNS_DESCRIPTION).setValue(column.type).onChange(async (value) => {
          SettingsData.searchColumns[index].type = value;
          await this.saveSettings();
          this.display();
        }).selectEl.addClass("flex-grow-1")
      );
      setting.addExtraButton((button) => button.setIcon(SettingsData.searchColumns[index].compact ? "compress-glyph" : "enlarge-glyph").setTooltip(SettingsData.searchColumns[index].compact ? "Compact" : "Full width").onClick(async () => {
        SettingsData.searchColumns[index].compact = !SettingsData.searchColumns[index].compact;
        await this.saveSettings();
        this.display();
      }));
      setting.addExtraButton((button) => button.setIcon("up-chevron-glyph").setTooltip("Move up").setDisabled(index === 0).onClick(async () => {
        const tmp = SettingsData.searchColumns[index];
        SettingsData.searchColumns[index] = SettingsData.searchColumns[index - 1];
        SettingsData.searchColumns[index - 1] = tmp;
        await this.saveSettings();
        this.display();
      }));
      setting.addExtraButton((button) => button.setIcon("down-chevron-glyph").setTooltip("Move down").setDisabled(index === SettingsData.searchColumns.length - 1).onClick(async () => {
        const tmp = SettingsData.searchColumns[index];
        SettingsData.searchColumns[index] = SettingsData.searchColumns[index + 1];
        SettingsData.searchColumns[index + 1] = tmp;
        await this.saveSettings();
        this.display();
      }));
      setting.addExtraButton((button) => button.setIcon("trash").setTooltip("Delete").onClick(async () => {
        SettingsData.searchColumns.splice(index, 1);
        await this.saveSettings();
        this.display();
      }));
      setting.infoEl.remove();
    });
    new import_obsidian2.Setting(this._searchColumnsDetails).addButton((button) => button.setButtonText("Reset columns").setWarning().onClick(async (value) => {
      SettingsData.searchColumns = [...DEFAULT_SETTINGS.searchColumns];
      await this.saveSettings();
      this.display();
    })).addButton((button) => button.setButtonText("Add Column").setCta().onClick(async (value) => {
      SettingsData.searchColumns.push({ type: "KEY" /* KEY */, compact: false });
      await this.saveSettings();
      this.display();
    }));
  }
  displayExtraSettings() {
    const { containerEl } = this;
    containerEl.createEl("h3", { text: "Cache" });
    new import_obsidian2.Setting(containerEl).setName("Cache time").setDesc("Time before the cached issue status expires. A low value will refresh the data very often but do a lot of requests to the server.").addText((text) => text.setPlaceholder("Example: 15m, 24h, 5s").setValue(SettingsData.cacheTime).onChange(async (value) => {
      SettingsData.cacheTime = value;
      await this.saveSettings();
    }));
    containerEl.createEl("h3", { text: "Troubleshooting" });
    new import_obsidian2.Setting(containerEl).setName("Log data request and responses").setDesc("Log in the console (CTRL+Shift+I) all the API requests and responses performed by the plugin.").addToggle((toggle) => toggle.setValue(SettingsData.logRequestsResponses).onChange(async (value) => {
      SettingsData.logRequestsResponses = value;
      await this.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName("Log images requests and responses").setDesc("Log in the console (CTRL+Shift+I) all the images fetch requests and responses performed by the plugin.").addToggle((toggle) => toggle.setValue(SettingsData.logImagesFetch).onChange(async (value) => {
      SettingsData.logImagesFetch = value;
      await this.saveSettings();
    }));
  }
  createNewEmptyAccount() {
    const newAccount = JSON.parse(JSON.stringify(DEFAULT_ACCOUNT));
    newAccount.priority = SettingsData.accounts.length + 1;
    this.accountsConflictsFix();
    return newAccount;
  }
  accountsConflictsFix() {
    const aliases = [];
    SettingsData.accounts.sort((a, b) => a.priority - b.priority);
    let priority = 1;
    for (const account of SettingsData.accounts) {
      while (aliases.indexOf(account.alias) >= 0)
        account.alias += "1";
      aliases.push(account.alias);
      account.priority = priority;
      priority++;
    }
  }
  createPriorityOptions() {
    const options = {};
    for (let i = 1; i <= SettingsData.accounts.length; i++) {
      options[i.toString()] = i.toString();
    }
    return options;
  }
};
var SettingsData = deepCopy(DEFAULT_SETTINGS);

// src/objectsCache.ts
var ms = require_ms();
var moment = require_moment();
var cache = {};
var objectsCache_default = {
  add(key, object, isError = false) {
    cache[key] = {
      updateTime: Date.now(),
      data: object,
      isError
    };
    return cache[key];
  },
  get(key) {
    if (key in cache && cache[key].updateTime + ms(SettingsData.cacheTime) > Date.now()) {
      return cache[key];
    }
    return null;
  },
  getTime(key) {
    if (key in cache) {
      return moment(cache[key].updateTime).format("llll");
    }
    return null;
  },
  delete(key) {
    if (key in cache) {
      delete cache[key];
    }
  },
  clear() {
    cache = {};
  }
};

// src/suggestions/columnsSuggest.ts
var import_obsidian3 = require("obsidian");
var ColumnsSuggest = class extends import_obsidian3.EditorSuggest {
  constructor(app) {
    super(app);
  }
  onTrigger(cursor, editor, file) {
    const cursorLine = editor.getLine(cursor.line);
    if (!cursorLine.match(/^\s*columns\s*:/)) {
      return null;
    }
    if (!cursorLine.substring(0, cursor.ch).match(/^\s*columns\s*:/)) {
      return null;
    }
    let jiraSearchFenceStartFound = false;
    for (let i = cursor.line - 1; i >= 0; i--) {
      const line = editor.getLine(i);
      if (line.match(/^\s*```\s*jira-search/)) {
        jiraSearchFenceStartFound = true;
        break;
      }
    }
    if (!jiraSearchFenceStartFound) {
      return null;
    }
    const strBeforeCursor = cursorLine.substring(0, cursor.ch);
    const strAfterColumnsKey = strBeforeCursor.split(":").slice(1).join(":");
    const lastColumn = strAfterColumnsKey.split(",").pop();
    return {
      start: { line: cursor.line, ch: cursor.ch - lastColumn.length },
      end: cursor,
      query: lastColumn
    };
  }
  getSuggestions(context) {
    const suggestions = [];
    let query2 = context.query.trim().toUpperCase();
    const isCompact = query2.startsWith(COMPACT_SYMBOL);
    query2 = query2.replace(new RegExp(`^${COMPACT_SYMBOL}`), "");
    if (!query2.startsWith("$")) {
      for (const column of Object.values(ESearchColumnsTypes)) {
        if (suggestions.length >= this.limit)
          break;
        if (column.startsWith(query2) && column !== "CUSTOM_FIELD" /* CUSTOM_FIELD */) {
          suggestions.push({
            name: column,
            isCompact,
            isCustomField: false
          });
        }
      }
    }
    query2 = query2.replace(/^\$/, "");
    for (const column of SettingsData.cache.columns) {
      if (suggestions.length >= this.limit)
        break;
      if (column.toUpperCase().startsWith(query2)) {
        suggestions.push({
          name: column,
          isCompact,
          isCustomField: true
        });
      }
    }
    return suggestions;
  }
  renderSuggestion(value, el) {
    if (value.isCompact) {
      el.createSpan({ text: COMPACT_SYMBOL, cls: "jira-issue-suggestion is-compact" });
    }
    if (value.isCustomField) {
      el.createSpan({ text: "$", cls: "jira-issue-suggestion is-custom-field" });
    }
    el.createSpan({ text: value.name, cls: "jira-issue-suggestion" });
  }
  selectSuggestion(value, evt) {
    if (!this.context)
      return;
    const selectedColumn = " " + (value.isCompact ? COMPACT_SYMBOL : "") + (value.isCustomField ? "$" : "") + value.name + ", ";
    this.context.editor.replaceRange(selectedColumn, this.context.start, this.context.end, "jira-issue");
  }
};

// src/rendering/renderingCommon.ts
var JIRA_STATUS_COLOR_MAP = {
  "blue-gray": "is-info",
  "yellow": "is-warning",
  "green": "is-success",
  "red": "is-danger",
  "medium-gray": "is-dark"
};
var JIRA_STATUS_COLOR_MAP_BY_NAME = {
  "New": "is-dark",
  "Planning": "is-dark",
  "To Do": "is-dark",
  "In Progress": "is-info",
  "Code Review": "is-info",
  "Review": "is-info",
  "Dev Complete": "is-info",
  "Testing": "is-info",
  "Release Pending": "is-success",
  "Closed": "is-success"
};
var renderingCommon_default = {
  issueUrl(account, issueKey) {
    try {
      return new URL(`${account.host}/browse/${issueKey}`).toString();
    } catch (e) {
      return "";
    }
  },
  searchUrl(account, searchQuery) {
    try {
      return new URL(`${account.host}/issues/?jql=${searchQuery}`).toString();
    } catch (e) {
      return "";
    }
  },
  getTheme() {
    switch (SettingsData.colorSchema) {
      case "FOLLOW_OBSIDIAN" /* FOLLOW_OBSIDIAN */:
        const obsidianTheme = ObsidianApp.vault.getConfig("theme");
        if (obsidianTheme === "obsidian") {
          return "is-dark";
        } else if (obsidianTheme === "moonstone") {
          return "is-light";
        } else if (obsidianTheme === "system") {
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "is-dark";
          } else {
            return "is-light";
          }
        }
        break;
      case "LIGHT" /* LIGHT */:
        return "is-light";
      case "DARK" /* DARK */:
        return "is-dark";
    }
    return "is-light";
  },
  getNotes() {
    return ObsidianApp.vault.getMarkdownFiles();
  },
  getFrontMatter(file) {
    return ObsidianApp.metadataCache.getFileCache(file).frontmatter;
  },
  renderContainer(children) {
    const container = createDiv({ cls: "jira-issue-container" });
    for (const child of children) {
      container.appendChild(child);
    }
    return container;
  },
  renderLoadingItem(item, inline = false) {
    let tagsRow;
    if (inline) {
      tagsRow = createSpan({ cls: "ji-tags has-addons" });
    } else {
      tagsRow = createDiv({ cls: "ji-tags has-addons" });
    }
    createSpan({ cls: "spinner", parent: createSpan({ cls: `ji-tag ${this.getTheme()}`, parent: tagsRow }) });
    createEl("a", { cls: `ji-tag is-link ${this.getTheme()}`, text: item, parent: tagsRow });
    createSpan({ cls: `ji-tag ${this.getTheme()}`, text: "Loading ...", parent: tagsRow });
    return tagsRow;
  },
  renderSearchError(el, message, searchView) {
    const tagsRow = createDiv("ji-tags has-addons");
    createSpan({ cls: "ji-tag is-delete is-danger", parent: tagsRow });
    if (searchView) {
      createSpan({ cls: `ji-tag is-danger ${this.getTheme()}`, text: "Search error", parent: tagsRow });
    } else {
      createSpan({ cls: `ji-tag is-danger ${this.getTheme()}`, text: "Search error", parent: tagsRow });
    }
    createSpan({ cls: "ji-tag is-danger", text: message, parent: tagsRow });
    el.replaceChildren(this.renderContainer([tagsRow]));
  },
  renderIssue(issue, compact = false) {
    const tagsRow = createDiv("ji-tags has-addons");
    this.renderAccountColorBand(issue.account, tagsRow);
    if (issue.fields.issuetype.iconUrl) {
      createEl("img", {
        cls: "fit-content",
        attr: { src: issue.fields.issuetype.iconUrl, alt: issue.fields.issuetype.name },
        title: issue.fields.issuetype.name,
        parent: createSpan({ cls: `ji-tag ${this.getTheme()} ji-sm-tag`, parent: tagsRow })
      });
    }
    createEl("a", { cls: `ji-tag is-link ${this.getTheme()} no-wrap`, href: this.issueUrl(issue.account, issue.key), title: this.issueUrl(issue.account, issue.key), text: issue.key, parent: tagsRow });
    if (!compact) {
      createSpan({ cls: `ji-tag ${this.getTheme()} issue-summary`, text: issue.fields.summary, parent: tagsRow });
    }
    const statusColor = JIRA_STATUS_COLOR_MAP_BY_NAME[issue.fields.status.name] || JIRA_STATUS_COLOR_MAP[issue.fields.status.statusCategory.colorName] || "is-light";
    createSpan({ cls: `ji-tag no-wrap ${statusColor}`, text: issue.fields.status.name, title: issue.fields.status.description, attr: { "data-status": issue.fields.status.name }, parent: tagsRow });
    return tagsRow;
  },
  renderIssueError(issueKey, message) {
    const tagsRow = createDiv("ji-tags has-addons");
    createSpan({ cls: "ji-tag is-delete is-danger", parent: tagsRow });
    createSpan({ cls: "ji-tag is-danger is-light", text: issueKey, parent: tagsRow });
    createSpan({ cls: "ji-tag is-danger", text: message, parent: tagsRow });
    return tagsRow;
  },
  renderAccountColorBand(account, parent) {
    if (SettingsData.showColorBand) {
      createSpan({ cls: `ji-tag ${this.getTheme()} ji-band`, attr: { style: `background-color: ${account.color}` }, title: account.alias, parent });
    }
  }
};

// src/searchView.ts
var SearchView = class {
  constructor() {
    this.type = "TABLE" /* TABLE */;
    this.query = "";
    this.limit = null;
    this.columns = [];
    this.account = null;
    this.label = null;
    this._cacheKey = null;
  }
  static fromString(str) {
    const sv = new SearchView();
    const lines = str.split("\n").filter((line) => line.trim() && !COMMENT_REGEX.test(line));
    for (const line of lines) {
      const [key, ...values] = line.split(":");
      const value = values.join(":").trim();
      if (!value && lines.length === 1) {
        sv.query = line;
      } else {
        switch (key.trim().toLowerCase()) {
          case "type":
            if (value.toUpperCase() in ESearchResultsRenderingTypes) {
              sv.type = value.toUpperCase();
            } else {
              throw new Error(`Invalid type: ${value}`);
            }
            break;
          case "query":
            sv.query = value;
            break;
          case "limit":
            if (parseInt(value)) {
              sv.limit = parseInt(value);
            } else {
              throw new Error(`Invalid limit: ${value}`);
            }
            break;
          case "columns":
            sv.columns = value.split(",").filter((column) => column.trim()).map((column) => {
              let columnExtra = "";
              const compact = column.trim().startsWith(COMPACT_SYMBOL);
              column = column.trim().replace(new RegExp(`^${COMPACT_SYMBOL}`), "");
              if (column.toUpperCase().startsWith("NOTES.")) {
                const split = column.split(".");
                column = split.splice(0, 1)[0];
                columnExtra = split.join(".");
              }
              if (column.startsWith("$")) {
                columnExtra = column.slice(1);
                column = "CUSTOM_FIELD" /* CUSTOM_FIELD */;
                if (SettingsData.cache.columns.indexOf(columnExtra.toUpperCase()) === -1) {
                  throw new Error(`Custom field ${columnExtra} not found`);
                }
              }
              column = column.toUpperCase();
              if (!(column in ESearchColumnsTypes)) {
                if (column.startsWith("#")) {
                  throw new Error(`Please replace the symbol "#" with "${COMPACT_SYMBOL}" to use the compact format`);
                }
                throw new Error(`Invalid column: ${column}`);
              }
              return {
                type: column,
                compact,
                extra: columnExtra
              };
            });
            break;
          case "account":
            sv.account = getAccountByAlias(value);
            break;
          case "label":
            sv.label = value;
            break;
          default:
            throw new Error(`Invalid key: ${key.trim()}`);
        }
      }
    }
    if (sv.type === "LIST" /* LIST */ && sv.columns.length > 0) {
      throw new Error("Type LIST and custom columns are not compatible options");
    }
    return sv;
  }
  toString() {
    return "```jira-search\n" + this.toRawString() + "```";
  }
  toRawString() {
    let result = "";
    result += `type: ${this.type}
`;
    result += `query: ${this.query}
`;
    if (this.limit) {
      result += `limit: ${this.limit}
`;
    }
    if (this.columns.length > 0) {
      result += `columns: ${this.columns.map(
        (c) => (c.compact ? COMPACT_SYMBOL : "") + (c.type !== "CUSTOM_FIELD" /* CUSTOM_FIELD */ ? c.type : "$" + c.extra)
      ).join(", ")}
`;
    }
    if (this.account) {
      result += `account: ${this.account.alias}
`;
    }
    return result;
  }
  getCacheKey() {
    if (!this._cacheKey) {
      this._cacheKey = this.query + (this.limit || "") + (this.account ? this.account.alias : "");
    }
    return this._cacheKey;
  }
};

// src/rendering/countFenceRenderer.ts
function renderSearchCount(el, searchResults, searchView) {
  const tagsRow = createDiv("ji-tags has-addons");
  renderingCommon_default.renderAccountColorBand(searchResults.account, tagsRow);
  if (searchView.label !== "") {
    createSpan({ cls: `ji-tag is-link ${renderingCommon_default.getTheme()}`, text: searchView.label || `Count`, title: searchView.query, parent: tagsRow });
  }
  let countText;
  if (searchResults.total !== void 0) {
    countText = searchResults.total.toString();
  } else {
    const currentCount = searchResults.issues?.length || 0;
    if (searchResults.isLast) {
      countText = currentCount.toString();
    } else {
      countText = `${currentCount}+`;
    }
  }
  createSpan({ cls: `ji-tag ${renderingCommon_default.getTheme()}`, text: countText, title: searchView.query, parent: tagsRow });
  el.replaceChildren(renderingCommon_default.renderContainer([tagsRow]));
}
var CountFenceRenderer = async (source, el, ctx) => {
  const searchView = SearchView.fromString(source);
  const cachedSearchResults = objectsCache_default.get(searchView.getCacheKey());
  if (cachedSearchResults) {
    if (cachedSearchResults.isError) {
      renderingCommon_default.renderSearchError(el, cachedSearchResults.data, searchView);
    } else {
      renderSearchCount(el, cachedSearchResults.data, searchView);
    }
  } else {
    renderingCommon_default.renderLoadingItem("Loading...");
    jiraClient_default.getSearchResults(searchView.query, { limit: 1 }).then((newSearchResults) => {
      const searchResults = objectsCache_default.add(searchView.getCacheKey(), newSearchResults).data;
      renderSearchCount(el, searchResults, searchView);
    }).catch((err) => {
      objectsCache_default.add(searchView.getCacheKey(), err, true);
      renderingCommon_default.renderSearchError(el, err, searchView);
    });
  }
};

// src/rendering/inlineIssueRenderer.ts
function convertInlineIssuesToTags(el) {
  if (SettingsData.inlineIssuePrefix) {
    let match;
    while (match = new RegExp(`${SettingsData.inlineIssuePrefix}(${COMPACT_SYMBOL}?)(${JIRA_KEY_REGEX})`).exec(el.innerHTML)) {
      const compact = !!match[1];
      const issueKey = match[2];
      const container = createSpan({ cls: "ji-inline-issue jira-issue-container", attr: { "data-issue-key": issueKey, "data-compact": compact } });
      container.appendChild(renderingCommon_default.renderLoadingItem(issueKey, true));
      el.innerHTML = el.innerHTML.replace(match[0], container.outerHTML);
    }
  }
}
function convertInlineIssuesUrlToTags(el) {
  if (SettingsData.inlineIssueUrlToTag) {
    for (const account of SettingsData.accounts) {
      const issueUrlElements = el.querySelectorAll(`a.external-link[href^="${account.host}/browse/"]`);
      issueUrlElements.forEach((issueUrlElement) => {
        const compact = issueUrlElement.previousSibling && issueUrlElement.previousSibling.textContent.endsWith("-");
        const issueKey = issueUrlElement.href.replace(`${account.host}/browse/`, "");
        const container = createSpan({ cls: "ji-inline-issue jira-issue-container", attr: { "data-issue-key": issueKey, "data-compact": compact } });
        container.appendChild(renderingCommon_default.renderLoadingItem(issueKey, true));
        issueUrlElement.replaceWith(container);
      });
    }
  }
}
var InlineIssueRenderer = async (el, ctx) => {
  convertInlineIssuesToTags(el);
  convertInlineIssuesUrlToTags(el);
  const inlineIssueTags = el.querySelectorAll(`span.ji-inline-issue`);
  inlineIssueTags.forEach((value) => {
    const issueKey = value.getAttribute("data-issue-key");
    const compact = value.getAttribute("data-compact") === "true";
    const cachedIssue = objectsCache_default.get(issueKey);
    if (cachedIssue) {
      if (cachedIssue.isError) {
        value.replaceChildren(renderingCommon_default.renderIssueError(issueKey, cachedIssue.data));
      } else {
        value.replaceChildren(renderingCommon_default.renderIssue(cachedIssue.data, compact));
      }
    } else {
      value.replaceChildren(renderingCommon_default.renderLoadingItem(issueKey));
      jiraClient_default.getIssue(issueKey).then((newIssue) => {
        const issue = objectsCache_default.add(issueKey, newIssue).data;
        value.replaceChildren(renderingCommon_default.renderIssue(issue, compact));
      }).catch((err) => {
        objectsCache_default.add(issueKey, err, true);
        value.replaceChildren(renderingCommon_default.renderIssueError(issueKey, err));
      });
    }
  });
};

// src/rendering/issueFenceRenderer.ts
var ISSUE_REGEX = new RegExp(`^\\s*(${JIRA_KEY_REGEX})\\s*$`, "i");
var ISSUE_LINK_REGEX = new RegExp(`\\/(${JIRA_KEY_REGEX})\\s*$`, "i");
function getIssueKey(line) {
  if (COMMENT_REGEX.test(line)) {
    return null;
  }
  const matches = line.match(ISSUE_REGEX);
  if (matches) {
    return matches[1];
  }
  const matchesLink = line.match(ISSUE_LINK_REGEX);
  if (matchesLink) {
    return matchesLink[1];
  }
  return null;
}
function updateRenderedIssues(el, renderedItems) {
  if (!Object.isEmpty(renderedItems)) {
    el.replaceChildren(renderingCommon_default.renderContainer(Object.values(renderedItems)));
  } else {
    el.replaceChildren(renderingCommon_default.renderContainer([renderNoItems()]));
  }
}
function renderNoItems() {
  const tagsRow = createDiv("ji-tags has-addons");
  createSpan({ cls: "ji-tag is-danger is-light", text: "JiraIssue", parent: tagsRow });
  createSpan({ cls: "ji-tag is-danger", text: "No valid issues found", parent: tagsRow });
  return tagsRow;
}
var IssueFenceRenderer = async (source, el, ctx) => {
  const renderedItems = {};
  for (const line of source.split("\n")) {
    const issueKey = getIssueKey(line);
    if (issueKey) {
      const cachedIssue = objectsCache_default.get(issueKey);
      if (cachedIssue) {
        if (cachedIssue.isError) {
          renderedItems[issueKey] = renderingCommon_default.renderIssueError(issueKey, cachedIssue.data);
        } else {
          renderedItems[issueKey] = renderingCommon_default.renderIssue(cachedIssue.data);
        }
      } else {
        renderedItems[issueKey] = renderingCommon_default.renderLoadingItem(issueKey);
        jiraClient_default.getIssue(issueKey).then((newIssue) => {
          const issue = objectsCache_default.add(issueKey, newIssue).data;
          renderedItems[issueKey] = renderingCommon_default.renderIssue(issue);
          updateRenderedIssues(el, renderedItems);
        }).catch((err) => {
          objectsCache_default.add(issueKey, err, true);
          renderedItems[issueKey] = renderingCommon_default.renderIssueError(issueKey, err);
          updateRenderedIssues(el, renderedItems);
        });
      }
    }
  }
  updateRenderedIssues(el, renderedItems);
};

// src/rendering/searchFenceRenderer.ts
var import_obsidian5 = require("obsidian");

// src/interfaces/issueInterfaces.ts
var newEmptyUser = () => {
  return {
    active: false,
    avatarUrls: {
      "16x16": "",
      "24x24": "",
      "32x32": "",
      "48x48": ""
    },
    displayName: "",
    accountId: "",
    self: ""
  };
};
var buildEmptyIssue = () => JSON.parse(JSON.stringify({
  key: "",
  id: "",
  account: null,
  fields: {
    aggregateprogress: { percent: 0 },
    aggregatetimeestimate: 0,
    aggregatetimeoriginalestimate: 0,
    aggregatetimespent: 0,
    assignee: newEmptyUser(),
    components: [],
    created: "",
    creator: newEmptyUser(),
    description: "",
    duedate: "",
    environment: "",
    fixVersions: [],
    issueLinks: [],
    issuetype: { iconUrl: "", name: "" },
    labels: [],
    lastViewed: "",
    priority: { iconUrl: "", name: "" },
    progress: { percent: 0 },
    project: { key: "", name: "" },
    reporter: newEmptyUser(),
    resolution: { name: "", description: "" },
    resolutiondate: "",
    status: { description: "", name: "", statusCategory: { colorName: "" } },
    summary: "",
    timeestimate: 0,
    timeoriginalestimate: 0,
    timespent: 0,
    updated: "",
    worklog: {
      worklogs: []
    }
  }
}));
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function mergeDeep(target, ...sources) {
  if (!sources.length)
    return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, {
            [key]: {}
          });
        }
        mergeDeep(target[key], source[key]);
      } else {
        if (source[key]) {
          Object.assign(target, {
            [key]: source[key]
          });
        }
      }
    }
  }
  return mergeDeep(target, ...sources);
}
function toDefaultedIssue(originalIssue) {
  if (originalIssue) {
    return mergeDeep(buildEmptyIssue(), originalIssue);
  }
  return originalIssue;
}

// src/rendering/renderTableColumns.ts
var import_obsidian4 = require("obsidian");
var jsonpath = __toESM(require_jsonpath());
var DESCRIPTION_COMPACT_MAX_LENGTH = 20;
function dateToStr(fullDate) {
  if (fullDate) {
    const d = new Date(fullDate);
    return d.toLocaleDateString();
  }
  return fullDate;
}
function deltaToStr(delta) {
  if (delta) {
    const h = Math.floor(delta / 3600);
    const m = Math.floor(delta % 3600 / 60);
    const s = Math.floor(delta % 3600 % 60);
    let timeStr = "";
    if (h > 0) {
      timeStr += h + "h";
    }
    if (m > 0) {
      timeStr += m + "m";
    }
    if (s > 0) {
      timeStr += s + "s";
    }
    return timeStr;
  }
  return "";
}
var renderTableColumn = async (columns, issue, row) => {
  let markdownNotes = null;
  for (const column of columns) {
    switch (column.type) {
      case "KEY" /* KEY */:
        createEl("a", {
          cls: "no-wrap",
          href: renderingCommon_default.issueUrl(issue.account, issue.key),
          text: column.compact ? "\u{1F517}" : issue.key,
          title: column.compact ? issue.key : renderingCommon_default.issueUrl(issue.account, issue.key),
          parent: createEl("td", { parent: row })
        });
        break;
      case "SUMMARY" /* SUMMARY */:
        if (column.compact) {
          let summaryCompact = issue.fields.summary.substring(0, DESCRIPTION_COMPACT_MAX_LENGTH);
          if (issue.fields.summary.length > DESCRIPTION_COMPACT_MAX_LENGTH) {
            summaryCompact += "\u2026";
          }
          createEl("td", { text: summaryCompact, title: issue.fields.summary, parent: row });
        } else {
          createEl("td", { text: issue.fields.summary, parent: row });
        }
        break;
      case "DESCRIPTION" /* DESCRIPTION */:
        if (column.compact) {
          let descriptionCompact = issue.fields.description.substring(0, DESCRIPTION_COMPACT_MAX_LENGTH);
          if (issue.fields.description.length > DESCRIPTION_COMPACT_MAX_LENGTH) {
            descriptionCompact += "\u2026";
          }
          createEl("td", { text: descriptionCompact, title: issue.fields.description, parent: row });
        } else {
          createEl("td", { text: issue.fields.description, parent: row });
        }
        break;
      case "TYPE" /* TYPE */:
        const typeCell = createEl("td", { parent: row });
        if (issue.fields.issuetype.iconUrl) {
          createEl("img", {
            attr: { src: issue.fields.issuetype.iconUrl, alt: issue.fields.issuetype.name },
            title: column.compact ? issue.fields.issuetype.name : "",
            cls: "letter-height",
            parent: typeCell
          });
        } else {
          if (column.compact) {
            createSpan({ text: issue.fields.issuetype.name[0].toUpperCase(), title: issue.fields.issuetype.name, parent: typeCell });
          }
        }
        if (!column.compact) {
          createSpan({ text: " " + issue.fields.issuetype.name, parent: typeCell });
        }
        break;
      case "CREATED" /* CREATED */:
        if (column.compact) {
          createEl("td", { text: "\u{1F551}", title: dateToStr(issue.fields.created), parent: row });
        } else {
          createEl("td", { text: dateToStr(issue.fields.created), parent: row });
        }
        break;
      case "UPDATED" /* UPDATED */:
        if (column.compact) {
          createEl("td", { text: "\u{1F551}", title: dateToStr(issue.fields.updated), parent: row });
        } else {
          createEl("td", { text: dateToStr(issue.fields.updated), parent: row });
        }
        break;
      case "REPORTER" /* REPORTER */:
        const reporterName = issue.fields.reporter.displayName || "";
        if (column.compact && reporterName && issue.fields.reporter.avatarUrls[AVATAR_RESOLUTION]) {
          createEl("img", {
            attr: { src: issue.fields.reporter.avatarUrls[AVATAR_RESOLUTION], alt: reporterName },
            title: reporterName,
            cls: "avatar-image",
            parent: createEl("td", { parent: row })
          });
        } else {
          createEl("td", { text: reporterName, parent: row });
        }
        break;
      case "ASSIGNEE" /* ASSIGNEE */:
        const assigneeName = issue.fields.assignee.displayName || "";
        if (column.compact && assigneeName && issue.fields.assignee.avatarUrls[AVATAR_RESOLUTION]) {
          createEl("img", {
            attr: { src: issue.fields.assignee.avatarUrls[AVATAR_RESOLUTION], alt: assigneeName },
            title: assigneeName,
            cls: "avatar-image",
            parent: createEl("td", { parent: row })
          });
        } else {
          createEl("td", { text: assigneeName, parent: row });
        }
        break;
      case "PRIORITY" /* PRIORITY */:
        const priorityCell = createEl("td", { parent: row });
        if (issue.fields.priority && issue.fields.priority.name) {
          if (issue.fields.priority.iconUrl) {
            createEl("img", {
              attr: { src: issue.fields.priority.iconUrl, alt: issue.fields.priority.name },
              title: column.compact ? issue.fields.priority.name : "",
              cls: "letter-height",
              parent: priorityCell
            });
          } else if (column.compact) {
            createSpan({ text: issue.fields.priority.name[0].toUpperCase(), title: issue.fields.priority.name, parent: priorityCell });
          }
          if (!column.compact) {
            createSpan({ text: " " + issue.fields.priority.name, parent: priorityCell });
          }
        } else {
          priorityCell.setText("-");
        }
        break;
      case "STATUS" /* STATUS */:
        const statusColor = JIRA_STATUS_COLOR_MAP_BY_NAME[issue.fields.status.name] || JIRA_STATUS_COLOR_MAP[issue.fields.status.statusCategory.colorName] || "is-light";
        if (column.compact) {
          createSpan({ cls: `ji-tag no-wrap ${statusColor}`, text: issue.fields.status.name[0].toUpperCase(), title: issue.fields.status.name, attr: { "data-status": issue.fields.status.name }, parent: createEl("td", { parent: row }) });
        } else {
          createSpan({ cls: `ji-tag no-wrap ${statusColor}`, text: issue.fields.status.name, title: issue.fields.status.description, attr: { "data-status": issue.fields.status.name }, parent: createEl("td", { parent: row }) });
        }
        break;
      case "DUE_DATE" /* DUE_DATE */:
        if (column.compact) {
          createEl("td", { text: "\u{1F551}", title: dateToStr(issue.fields.duedate), parent: row });
        } else {
          createEl("td", { text: dateToStr(issue.fields.duedate), parent: row });
        }
        break;
      case "RESOLUTION" /* RESOLUTION */:
        if (issue.fields.resolution.description) {
          createEl("abbr", { text: issue.fields.resolution.name, title: issue.fields.resolution.description, parent: createEl("td", { parent: row }) });
        } else {
          createEl("td", { text: issue.fields.resolution.name, title: issue.fields.resolution.description, parent: row });
        }
        break;
      case "RESOLUTION_DATE" /* RESOLUTION_DATE */:
        if (column.compact) {
          createEl("td", { text: "\u{1F551}", title: dateToStr(issue.fields.resolutiondate), parent: row });
        } else {
          createEl("td", { text: dateToStr(issue.fields.resolutiondate), parent: row });
        }
        break;
      case "ENVIRONMENT" /* ENVIRONMENT */:
        if (column.compact) {
          let environmentCompact = issue.fields.environment.substring(0, DESCRIPTION_COMPACT_MAX_LENGTH);
          if (issue.fields.environment.length > DESCRIPTION_COMPACT_MAX_LENGTH) {
            environmentCompact += "\u2026";
          }
          createEl("td", { text: environmentCompact, title: issue.fields.environment, parent: row });
        } else {
          createEl("td", { text: issue.fields.environment, parent: row });
        }
        break;
      case "LABELS" /* LABELS */:
        if (column.compact) {
          createEl("td", { text: "\u{1F3F7}\uFE0F", title: issue.fields.labels.join("\n"), parent: row });
        } else {
          createEl("td", { text: issue.fields.labels.join(", "), parent: row });
        }
        break;
      case "PROJECT" /* PROJECT */:
        createEl("td", { text: issue.fields.project.key, title: issue.fields.project.name, parent: row });
        break;
      case "FIX_VERSIONS" /* FIX_VERSIONS */:
        const fixVersionsCell = createEl("td", { parent: row });
        for (let i = 0; i < issue.fields.fixVersions.length; i++) {
          const fixVersion = issue.fields.fixVersions[i];
          if (fixVersion.released) {
            createEl("strong", { text: fixVersion.name, title: fixVersion.description, parent: fixVersionsCell });
          } else {
            createSpan({ text: fixVersion.name, title: fixVersion.description, parent: fixVersionsCell });
          }
          if (i < issue.fields.fixVersions.length - 1) {
            createSpan({ text: ", ", parent: fixVersionsCell });
          }
        }
        break;
      case "COMPONENTS" /* COMPONENTS */:
        createEl("td", { text: issue.fields.components.flatMap((c) => c.name).join(", "), parent: row });
        break;
      case "AGGREGATE_TIME_ESTIMATED" /* AGGREGATE_TIME_ESTIMATED */:
        createEl("td", { text: deltaToStr(issue.fields.aggregatetimeestimate), parent: row });
        break;
      case "AGGREGATE_TIME_ORIGINAL_ESTIMATE" /* AGGREGATE_TIME_ORIGINAL_ESTIMATE */:
        createEl("td", { text: deltaToStr(issue.fields.aggregatetimeoriginalestimate), parent: row });
        break;
      case "AGGREGATE_TIME_SPENT" /* AGGREGATE_TIME_SPENT */:
        createEl("td", { text: deltaToStr(issue.fields.aggregatetimespent), parent: row });
        break;
      case "TIME_ESTIMATE" /* TIME_ESTIMATE */:
        createEl("td", { text: deltaToStr(issue.fields.timeestimate), parent: row });
        break;
      case "TIME_ORIGINAL_ESTIMATE" /* TIME_ORIGINAL_ESTIMATE */:
        createEl("td", { text: deltaToStr(issue.fields.timeoriginalestimate), parent: row });
        break;
      case "TIME_SPENT" /* TIME_SPENT */:
        createEl("td", { text: deltaToStr(issue.fields.timespent), parent: row });
        break;
      case "AGGREGATE_PROGRESS" /* AGGREGATE_PROGRESS */:
        createEl("td", { text: issue.fields.aggregateprogress.percent.toString() + "%", parent: row });
        break;
      case "PROGRESS" /* PROGRESS */:
        createEl("td", { text: issue.fields.progress.percent.toString() + "%", parent: row });
        break;
      case "CUSTOM_FIELD" /* CUSTOM_FIELD */:
        createEl("td", { text: renderCustomField(issue, column.extra), parent: row });
        break;
      case "NOTES" /* NOTES */:
        if (!markdownNotes) {
          markdownNotes = renderingCommon_default.getNotes();
        }
        const noteCell = createEl("td", { parent: row });
        const noteRegex = new RegExp("^" + issue.key + "[^0-9]");
        const connectedNotes = markdownNotes.filter((n) => n.name.match(noteRegex));
        if (connectedNotes.length > 0) {
          for (const note of connectedNotes) {
            if (column.extra) {
              renderNoteFrontMatter(column, note, noteCell);
            } else {
              renderNoteFile(column, note, noteCell);
            }
          }
        } else {
          createEl("a", { text: "\u2795", title: "Create new note", href: issue.key, cls: "internal-link icon-link", parent: noteCell });
        }
        break;
      case "LAST_VIEWED" /* LAST_VIEWED */:
        if (column.compact) {
          createEl("td", { text: "\u{1F551}", title: dateToStr(issue.fields.lastViewed), parent: row });
        } else {
          createEl("td", { text: dateToStr(issue.fields.lastViewed), parent: row });
        }
        break;
      case "DEV_STATUS" /* DEV_STATUS */:
        const cacheKey = "dev-status-" + issue.id;
        let devStatus = null;
        const devStatusCacheItem = objectsCache_default.get(cacheKey);
        if (devStatusCacheItem) {
          devStatus = devStatusCacheItem.data;
        } else {
          devStatus = await jiraClient_default.getDevStatus(issue.id, { account: issue.account });
          objectsCache_default.add(cacheKey, devStatus);
        }
        const cell = createEl("td", { parent: row });
        const prDetails = devStatus.summary.pullrequest.overall.details;
        if (prDetails.openCount + prDetails.mergedCount + prDetails.declinedCount > 0) {
          if (prDetails.openCount > 0) {
            const prOpen = createSpan({ parent: cell, cls: `pull-request-tag pull-request-open ${renderingCommon_default.getTheme()}`, title: "Open pull-request" });
            (0, import_obsidian4.setIcon)(prOpen, "jira-issue-git-pull-request");
            prOpen.appendText(`${prDetails.openCount}`);
          }
          if (prDetails.mergedCount > 0) {
            const prMerged = createSpan({ parent: cell, cls: `pull-request-tag pull-request-merged ${renderingCommon_default.getTheme()}`, title: "Merged pull-request" });
            (0, import_obsidian4.setIcon)(prMerged, "jira-issue-git-merge");
            prMerged.appendText(`${prDetails.mergedCount}`);
          }
          if (prDetails.declinedCount > 0) {
            const prDeclined = createSpan({ parent: cell, cls: `pull-request-tag pull-request-delete ${renderingCommon_default.getTheme()}`, title: "Declined pull-request" });
            (0, import_obsidian4.setIcon)(prDeclined, "jira-issue-git-delete");
            prDeclined.appendText(`${prDetails.declinedCount}`);
          }
        } else {
          createSpan({ parent: cell, title: "No data available", text: "-" });
        }
        break;
    }
  }
};
function renderNoteFile(column, note, noteCell) {
  if (column.compact) {
    createEl("a", { text: "\u{1F4DD}", title: note.path, href: note.path, cls: "internal-link", parent: noteCell });
  } else {
    const noteNameWithoutExtension = note.name.split(".");
    noteNameWithoutExtension.pop();
    createEl("a", { text: noteNameWithoutExtension.join("."), title: note.path, href: note.path, cls: "internal-link", parent: noteCell });
    createEl("br", { parent: noteCell });
  }
}
function renderNoteFrontMatter(column, note, noteCell) {
  const frontMatter = renderingCommon_default.getFrontMatter(note);
  const values = jsonpath.query(frontMatter, "$." + column.extra);
  for (let value of values) {
    value = typeof value === "object" ? JSON.stringify(value) : value.toString();
    createEl("a", { text: value, title: note.path, href: note.path, cls: "internal-link", parent: noteCell });
    createEl("br", { parent: noteCell });
  }
}
function renderCustomField(issue, customField) {
  if (!Number(customField)) {
    customField = issue.account.cache.customFieldsNameToId[customField];
  }
  const value = issue.fields[`customfield_${customField}`];
  if (typeof value === "string" || typeof value === "number") {
    return value.toString();
  }
  return JSON.stringify(value);
}

// src/rendering/searchFenceRenderer.ts
async function renderSearchResults(rootEl, searchView, searchResults) {
  searchView.account = searchResults.account;
  if (searchView.type === "LIST" /* LIST */) {
    renderSearchResultsList(rootEl, searchResults);
  } else {
    await renderSearchResultsTable(rootEl, searchView, searchResults);
  }
}
async function renderSearchResultsTable(rootEl, searchView, searchResults) {
  const table = createEl("table", { cls: `table is-bordered is-striped is-narrow is-hoverable is-fullwidth ${renderingCommon_default.getTheme()}` });
  renderSearchResultsTableHeader(table, searchView, searchResults.account);
  await renderSearchResultsTableBody(table, searchView, searchResults);
  const footer = renderSearchFooter(rootEl, searchView, searchResults);
  rootEl.replaceChildren(renderingCommon_default.renderContainer([table, footer]));
}
function renderSearchResultsTableHeader(table, searchView, account) {
  const header = createEl("tr", {
    parent: createEl("thead", { attr: { style: getAccountBandStyle(searchView.account) }, parent: table })
  });
  const columns = searchView.columns.length > 0 ? searchView.columns : SettingsData.searchColumns;
  for (const column of columns) {
    let name = SEARCH_COLUMNS_DESCRIPTION[column.type];
    if (column.type === "NOTES" /* NOTES */ && column.extra) {
      name = column.extra;
    }
    if (column.type === "CUSTOM_FIELD" /* CUSTOM_FIELD */) {
      if (Number(column.extra)) {
        name = account.cache.customFieldsIdToName[column.extra];
      } else {
        name = column.extra;
      }
    }
    if (column.compact) {
      createEl("th", { text: name[0].toUpperCase(), attr: { "aria-label-position": "top", "aria-label": column.type }, parent: header });
    } else {
      createEl("th", { text: name, title: column.type, parent: header });
    }
  }
}
async function renderSearchResultsTableBody(table, searchView, searchResults) {
  const tbody = createEl("tbody", { parent: table });
  for (let issue of searchResults.issues) {
    issue = toDefaultedIssue(issue);
    const row = createEl("tr", { parent: tbody });
    const columns = searchView.columns.length > 0 ? searchView.columns : SettingsData.searchColumns;
    await renderTableColumn(columns, issue, row);
  }
}
function renderSearchResultsList(rootEl, searchResults) {
  const list = [];
  for (const issue of searchResults.issues) {
    list.push(renderingCommon_default.renderIssue(issue));
  }
  rootEl.replaceChildren(renderingCommon_default.renderContainer(list));
}
function getAccountBandStyle(account) {
  if (SettingsData.showColorBand) {
    return "border-left: 3px solid " + account.color;
  }
  return "";
}
function renderSearchFooter(rootEl, searchView, searchResults) {
  const searchFooter = createDiv({ cls: "search-footer" });
  SettingsData.logRequestsResponses && console.log("JiraIssue:SearchResults structure:", {
    total: searchResults.total,
    maxResults: searchResults.maxResults,
    startAt: searchResults.startAt,
    issuesLength: searchResults.issues?.length,
    isLast: searchResults.isLast,
    nextPageToken: searchResults.nextPageToken,
    searchResults
  });
  const alias = searchResults.account?.alias || "Unknown";
  let searchCount;
  if (searchResults.total !== void 0) {
    searchCount = `Total results: ${searchResults.total.toString()} - ${alias}`;
  } else {
    const currentCount = searchResults.issues?.length || 0;
    if (searchResults.isLast) {
      searchCount = `Results: ${currentCount.toString()} (all results) - ${alias}`;
    } else {
      searchCount = `Results: ${currentCount.toString()}+ (more available) - ${alias}`;
    }
  }
  if (SettingsData.showJiraLink) {
    createEl("a", {
      text: searchCount,
      href: renderingCommon_default.searchUrl(searchView.account, searchView.query),
      parent: searchFooter
    });
  } else {
    createDiv({
      text: searchCount,
      parent: searchFooter
    });
  }
  const lastUpdateContainer = createDiv({ parent: searchFooter });
  createSpan({
    text: `Last update: ${objectsCache_default.getTime(searchView.getCacheKey())}`,
    parent: lastUpdateContainer
  });
  const refreshButton = createEl("button", { parent: lastUpdateContainer, title: "Refresh", cls: "rotate-animation" });
  (0, import_obsidian5.setIcon)(refreshButton, "sync-small");
  refreshButton.onClickEvent(() => {
    rootEl.empty();
    objectsCache_default.delete(searchView.getCacheKey());
    SearchFenceRenderer(searchView.toRawString(), rootEl, null);
  });
  return searchFooter;
}
var SearchFenceRenderer = async (source, rootEl, ctx) => {
  try {
    const searchView = SearchView.fromString(source);
    const cachedSearchResults = objectsCache_default.get(searchView.getCacheKey());
    if (cachedSearchResults) {
      if (cachedSearchResults.isError) {
        renderingCommon_default.renderSearchError(rootEl, cachedSearchResults.data, searchView);
      } else {
        await renderSearchResults(rootEl, searchView, cachedSearchResults.data);
      }
    } else {
      renderingCommon_default.renderLoadingItem("Loading...");
      jiraClient_default.getSearchResults(searchView.query, { limit: searchView.limit || SettingsData.searchResultsLimit, account: searchView.account }).then((newSearchResults) => {
        searchView.account = newSearchResults.account;
        const searchResults = objectsCache_default.add(searchView.getCacheKey(), newSearchResults).data;
        renderSearchResults(rootEl, searchView, searchResults);
      }).catch((err) => {
        objectsCache_default.add(searchView.getCacheKey(), err, true);
        renderingCommon_default.renderSearchError(rootEl, err, searchView);
      });
    }
  } catch (err) {
    renderingCommon_default.renderSearchError(rootEl, err, null);
  }
};

// src/modals/searchWizardModal.ts
var import_obsidian6 = require("obsidian");
var SearchWizardModal = class extends import_obsidian6.Modal {
  constructor(app, onSubmit) {
    super(app);
    this._onSubmit = onSubmit;
    this._searchView = new SearchView();
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Search wizard" });
    new import_obsidian6.Setting(contentEl).setName("Search rendering type").addDropdown((dropdown) => dropdown.addOptions(SEARCH_RESULTS_RENDERING_TYPE_DESCRIPTION).setValue(this._searchView.type).onChange(async (value) => {
      this._searchView.type = value;
    }));
    new import_obsidian6.Setting(contentEl).setName("Jira query").addTextArea((textArea) => textArea.setValue(this._searchView.query).onChange(async (value) => {
      this._searchView.query = value;
    }));
    new import_obsidian6.Setting(contentEl).setName("Search results limit").addText((text) => text.setPlaceholder(`Use default value: ${SettingsData.searchResultsLimit}`).setValue(this._searchView.limit ? this._searchView.limit.toString() : "").onChange(async (value) => {
      this._searchView.limit = value ? parseInt(value) || null : null;
    }));
    const desc = document.createDocumentFragment();
    desc.createEl("h2", { text: "Columns" });
    desc.appendText("Keep the list empty to use the default columns");
    new import_obsidian6.Setting(contentEl).setDesc(desc);
    this._searchView.columns.forEach((column, index) => {
      const setting = new import_obsidian6.Setting(contentEl).addDropdown(
        (dropdown) => dropdown.addOptions(SEARCH_COLUMNS_DESCRIPTION).setValue(column.type).onChange(async (value) => {
          this._searchView.columns[index].type = value;
          this.open();
        }).selectEl.addClass("flex-grow-1")
      );
      setting.addExtraButton((button) => button.setIcon(this._searchView.columns[index].compact ? "compress-glyph" : "enlarge-glyph").setTooltip(this._searchView.columns[index].compact ? "Compact" : "Full width").onClick(async () => {
        this._searchView.columns[index].compact = !this._searchView.columns[index].compact;
        this.open();
      }));
      setting.addExtraButton((button) => button.setIcon("up-chevron-glyph").setTooltip("Move up").setDisabled(index === 0).onClick(async () => {
        const tmp = this._searchView.columns[index];
        this._searchView.columns[index] = this._searchView.columns[index - 1];
        this._searchView.columns[index - 1] = tmp;
        this.open();
      }));
      setting.addExtraButton((button) => button.setIcon("down-chevron-glyph").setTooltip("Move down").setDisabled(index === this._searchView.columns.length - 1).onClick(async () => {
        const tmp = this._searchView.columns[index];
        this._searchView.columns[index] = this._searchView.columns[index + 1];
        this._searchView.columns[index + 1] = tmp;
        this.open();
      }));
      setting.addExtraButton((button) => button.setIcon("trash").setTooltip("Delete").onClick(async () => {
        this._searchView.columns.splice(index, 1);
        this.open();
      }));
      setting.infoEl.remove();
    });
    const searchColumnsButtons = new import_obsidian6.Setting(contentEl);
    searchColumnsButtons.addButton(
      (button) => button.setButtonText("Add Column").setCta().onClick(async (value) => {
        this._searchView.columns.push({ type: "KEY" /* KEY */, compact: false });
        this.open();
      })
    );
    searchColumnsButtons.addButton(
      (button) => button.setButtonText("Reset to default columns").setWarning().onClick(async (value) => {
        this._searchView.columns = [];
        this.open();
      })
    );
    new import_obsidian6.Setting(contentEl).addButton((btn) => btn.setButtonText("Insert").setCta().onClick(() => {
      this.close();
      this._onSubmit(this._searchView.toString());
    }));
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/rendering/inlineIssueViewPlugin.ts
var import_state = require("@codemirror/state");
var import_view = require("@codemirror/view");
var import_obsidian7 = require("obsidian");

// node_modules/escape-string-regexp/index.js
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

// src/rendering/inlineIssueViewPlugin.ts
function escapeRegexp(str) {
  return escapeStringRegexp(str).replace(/\//g, "\\/");
}
var isEditorInLivePreviewMode = (view) => view.state.field(import_obsidian7.editorLivePreviewField);
var isCursorInsideTag = (view, start, length) => {
  const cursor = view.state.selection.main.head;
  return cursor > start - 1 && cursor < start + length + 1;
};
var isSelectionContainsTag = (view, start, length) => {
  const selectionBegin = view.state.selection.main.from;
  const selectionEnd = view.state.selection.main.to;
  return selectionEnd > start - 1 && selectionBegin < start + length + 1;
};
var InlineIssueWidget = class extends import_view.WidgetType {
  constructor(key, compact, host = null) {
    super();
    this._issueKey = key;
    this._compact = compact;
    this._host = host;
    this._htmlContainer = createSpan({ cls: "ji-inline-issue jira-issue-container" });
    this.buildTag();
  }
  buildTag() {
    const cachedIssue = objectsCache_default.get(this._issueKey);
    if (cachedIssue) {
      if (cachedIssue.isError) {
        this._htmlContainer.replaceChildren(renderingCommon_default.renderIssueError(this._issueKey, cachedIssue.data));
      } else {
        this._htmlContainer.replaceChildren(renderingCommon_default.renderIssue(cachedIssue.data, this._compact));
      }
    } else {
      this._htmlContainer.replaceChildren(renderingCommon_default.renderLoadingItem(this._issueKey));
      jiraClient_default.getIssue(this._issueKey, { account: getAccountByHost(this._host) }).then((newIssue) => {
        const issue = objectsCache_default.add(this._issueKey, newIssue).data;
        this._htmlContainer.replaceChildren(renderingCommon_default.renderIssue(issue, this._compact));
      }).catch((err) => {
        objectsCache_default.add(this._issueKey, err, true);
        this._htmlContainer.replaceChildren(renderingCommon_default.renderIssueError(this._issueKey, err));
      });
    }
  }
  toDOM(view) {
    return this._htmlContainer;
  }
};
var jiraTagMatchDecorator = { ref: null };
var jiraUrlMatchDecorator = { ref: null };
function buildMatchDecorators() {
  if (SettingsData.inlineIssuePrefix !== "") {
    jiraTagMatchDecorator.ref = new import_view.MatchDecorator({
      regexp: new RegExp(`${SettingsData.inlineIssuePrefix}(${COMPACT_SYMBOL}?)(${JIRA_KEY_REGEX})`, "g"),
      decoration: (match, view, pos) => {
        const compact = !!match[1];
        const key = match[2];
        const tagLength = match[0].length;
        if (!isEditorInLivePreviewMode(view) || isCursorInsideTag(view, pos, tagLength) || isSelectionContainsTag(view, pos, tagLength)) {
          return import_view.Decoration.mark({
            tagName: "div",
            class: "HyperMD-codeblock HyperMD-codeblock-bg jira-issue-inline-mark"
          });
        } else {
          return import_view.Decoration.replace({
            widget: new InlineIssueWidget(key, compact)
          });
        }
      }
    });
  } else {
    jiraTagMatchDecorator.ref = null;
  }
  if (SettingsData.inlineIssueUrlToTag) {
    const urls = [];
    SettingsData.accounts.forEach((account) => urls.push(escapeRegexp(account.host)));
    jiraUrlMatchDecorator.ref = new import_view.MatchDecorator({
      regexp: new RegExp(`(${COMPACT_SYMBOL}?)(${urls.join("|")})/browse/(${JIRA_KEY_REGEX})`, "g"),
      decoration: (match, view, pos) => {
        const compact = !!match[1];
        const host = match[2];
        const key = match[3];
        const tagLength = match[0].length;
        if (!isEditorInLivePreviewMode(view) || isCursorInsideTag(view, pos, tagLength) || isSelectionContainsTag(view, pos, tagLength)) {
          return import_view.Decoration.mark({
            tagName: "div",
            class: "HyperMD-codeblock HyperMD-codeblock-bg jira-issue-inline-mark"
          });
        } else {
          return import_view.Decoration.replace({
            widget: new InlineIssueWidget(key, compact, host)
          });
        }
      }
    });
  } else {
    jiraUrlMatchDecorator.ref = null;
  }
}
function buildViewPluginClass(matchDecorator) {
  class ViewPluginClass {
    constructor(view) {
      this.decorators = matchDecorator.ref ? matchDecorator.ref.createDeco(view) : import_state.RangeSet.empty;
    }
    update(update) {
      const editorModeChanged = update.startState.field(import_obsidian7.editorLivePreviewField) !== update.state.field(import_obsidian7.editorLivePreviewField);
      if (update.docChanged || update.startState.selection.main !== update.state.selection.main || editorModeChanged) {
        this.decorators = matchDecorator.ref ? matchDecorator.ref.createDeco(update.view) : import_state.RangeSet.empty;
      }
    }
    destroy() {
      this.decorators = null;
    }
  }
  const ViewPluginSpec = {
    decorations: (viewPlugin) => viewPlugin.decorators
  };
  return {
    class: ViewPluginClass,
    spec: ViewPluginSpec
  };
}
var ViewPluginManager = class {
  constructor() {
    this.update();
    const jiraTagViewPlugin = buildViewPluginClass(jiraTagMatchDecorator);
    const jiraUrlViewPlugin = buildViewPluginClass(jiraUrlMatchDecorator);
    this._viewPlugins = [
      import_view.ViewPlugin.fromClass(jiraTagViewPlugin.class, jiraTagViewPlugin.spec),
      import_view.ViewPlugin.fromClass(jiraUrlViewPlugin.class, jiraUrlViewPlugin.spec)
    ];
  }
  update() {
    buildMatchDecorators();
  }
  getViewPlugins() {
    return this._viewPlugins;
  }
};

// src/suggestions/querySuggest.ts
var import_obsidian8 = require("obsidian");
var QuerySuggest = class extends import_obsidian8.EditorSuggest {
  constructor(app) {
    super(app);
  }
  onTrigger(cursor, editor, file) {
    const cursorLine = editor.getLine(cursor.line);
    if (!cursorLine.match(/^\s*query\s*:/)) {
      return null;
    }
    if (!cursorLine.substring(0, cursor.ch).match(/^\s*query\s*:/)) {
      return null;
    }
    let jiraSearchFenceStartFound = false;
    for (let i = cursor.line - 1; i >= 0; i--) {
      const line = editor.getLine(i);
      if (line.match(/^\s*```\s*jira-search/)) {
        jiraSearchFenceStartFound = true;
        break;
      }
    }
    if (!jiraSearchFenceStartFound) {
      return null;
    }
    const strBeforeCursor = cursorLine.substring(0, cursor.ch);
    const strAfterQueryKey = strBeforeCursor.split(":").slice(1).join(":");
    const lastColumn = strAfterQueryKey.split(/(AND|OR|ORDER BY)/).pop();
    return {
      start: { line: cursor.line, ch: cursor.ch - lastColumn.length },
      end: cursor,
      query: strAfterQueryKey
    };
  }
  getSuggestions(context) {
    const suggestions = [];
    return suggestions;
  }
  renderSuggestion(value, el) {
    if (value.isFunction) {
      el.createSpan({ text: "fx", cls: "jira-issue-suggestion is-function" });
    }
    el.createSpan({ text: value.name, cls: "jira-issue-suggestion" });
  }
  selectSuggestion(value, evt) {
    if (!this.context)
      return;
    this.context.editor.replaceRange(value.name, this.context.start, this.context.end, "jira-issue");
  }
};

// src/icons/icons.ts
var import_obsidian9 = require("obsidian");
var setupIcons = () => {
  (0, import_obsidian9.addIcon)("jira-issue-git-branch", `<g id="git-branch" transform="matrix(0.10296969,0,0,0.10205123,-11.553199,-1.0307174)"><g transform="matrix(1,0,0,-1,0,1920)" id="g20"><path d="m 203.6,930 c -25.3,0 -46.9,8.9 -64.7,26.7 -17.8,17.8 -26.7,39.4 -26.7,64.7 v 102.9 c 0,23.4 7.8,43.7 23.5,60.8 15.7,17.1 35,27.1 58.2,29.8 v 410 c -15,1.6 -28.7,6.7 -41.2,15.1 -12.5,8.4 -22.4,19.3 -29.6,32.5 -7.2,13.2 -10.8,27.6 -10.8,43.1 v 102.9 c 0,25.3 8.9,46.9 26.7,64.7 17.8,17.8 39.4,26.7 64.7,26.7 h 102.9 c 25.3,0 46.9,-8.9 64.7,-26.7 17.8,-17.8 26.7,-39.4 26.7,-64.7 v -102.9 c 0,-23.4 -7.8,-43.7 -23.5,-60.8 -15.7,-17.1 -35,-27.1 -58.2,-29.8 v -205 h 172.3 l 115.1,116.4 c -1.1,6.3 -1.6,11.6 -1.6,15.9 v 102.9 c 0,25.3 8.9,46.9 26.7,64.7 17.8,17.8 39.4,26.7 64.7,26.7 h 102.9 c 12.5,0 24.4,-2.5 35.5,-7.4 11.2,-4.9 20.8,-11.4 29,-19.6 8.2,-8.2 14.7,-17.9 19.6,-29.2 4.9,-11.3 7.3,-23.1 7.3,-35.3 v -102.9 c 0,-25.3 -8.9,-46.9 -26.7,-64.7 -17.8,-17.8 -39.4,-26.7 -64.7,-26.7 H 701.3 L 557.6,1315.4 c -12,-12 -26.4,-18 -43.3,-18 h -198 V 1215 c 23.1,-2.7 42.5,-12.7 58.2,-29.8 15.7,-17.2 23.5,-37.4 23.5,-60.8 v -102.9 c 0,-25.3 -8.9,-46.9 -26.7,-64.7 -17.8,-17.8 -39.4,-26.7 -64.7,-26.7 h -103 z m 0,775.8 h 102.9 c 2.7,0 5,1 6.9,2.9 1.9,1.9 2.9,4.2 2.9,6.9 v 102.9 c 0,2.7 -1,5 -2.9,6.9 -1.9,1.9 -4.2,2.9 -6.9,2.9 H 203.6 c -2.7,0 -5,-1 -6.9,-2.9 -1.9,-1.9 -2.9,-4.2 -2.9,-6.9 v -102.9 c 0,-2.7 1,-5 2.9,-6.9 1.8,-1.9 4.1,-2.9 6.9,-2.9 z m 490,-163.3 h 102.9 c 2.7,0 5,1 6.9,2.9 1.9,1.9 2.9,4.2 2.9,6.9 v 102.9 c 0,2.7 -1,5 -2.9,6.9 -1.9,1.9 -4.2,2.9 -6.9,2.9 H 693.6 c -2.7,0 -5,-1 -6.9,-2.9 -1.9,-1.9 -2.9,-4.2 -2.9,-6.9 v -102.9 c 0,-2.7 1,-5 2.9,-6.9 1.8,-1.9 4.1,-2.9 6.9,-2.9 z m -490,-530.8 h 102.9 c 2.7,0 5,1 6.9,2.9 1.9,1.9 2.9,4.2 2.9,6.9 v 102.9 c 0,2.7 -1,5 -2.9,6.9 -1.9,1.9 -4.2,2.9 -6.9,2.9 H 203.6 c -2.7,0 -5,-1 -6.9,-2.9 -1.9,-1.9 -2.9,-4.2 -2.9,-6.9 v -102.9 c 0,-2.7 1,-5 2.9,-6.9 1.8,-2 4.1,-2.9 6.9,-2.9 z" id="path18" /></g></g>`);
  (0, import_obsidian9.addIcon)("jira-issue-git-delete", `<g id="git-delete" transform="matrix(0.10206165,0,0,0.10206165,-7.358645,-1.0410288)"><g transform="matrix(1,0,0,-1,0,1920)" id="g274"><path d="m 163.5,930 c -25.3,0 -46.9,8.9 -64.7,26.7 -17.8,17.8 -26.7,39.4 -26.7,64.7 v 102.9 c 0,23.4 7.8,43.7 23.5,60.8 15.7,17.1 35,27.1 58.2,29.8 v 410 c -23.1,2.7 -42.5,12.7 -58.2,29.8 -15.7,17.2 -23.5,37.4 -23.5,60.8 v 102.9 c 0,25.3 8.9,46.9 26.7,64.7 17.8,17.8 39.4,26.7 64.7,26.7 h 102.9 c 25.3,0 46.9,-8.9 64.7,-26.7 17.8,-17.8 26.7,-39.4 26.7,-64.7 v -102.9 c 0,-23.4 -7.8,-43.7 -23.5,-60.8 -15.7,-17.1 -35,-27.1 -58.2,-29.8 v -205 h 172.3 l 102.1,102.5 86.6,-86.6 -119.6,-120.5 c -12,-12 -26.4,-18 -43.3,-18 h -198 V 1215 c 23.1,-2.7 42.5,-12.7 58.2,-29.8 15.7,-17.2 23.5,-37.4 23.5,-60.8 v -102.9 c 0,-25.3 -8.9,-46.9 -26.7,-64.7 -17.8,-17.8 -39.4,-26.7 -64.7,-26.7 h -103 z m 0,775.8 h 102.9 c 2.7,0 5,1 6.9,2.9 1.9,1.9 2.9,4.2 2.9,6.9 v 102.9 c 0,2.7 -1,5 -2.9,6.9 -1.9,1.9 -4.2,2.9 -6.9,2.9 H 163.5 c -2.7,0 -5,-1 -6.9,-2.9 -1.9,-1.9 -2.9,-4.2 -2.9,-6.9 v -102.9 c 0,-2.7 1,-5 2.9,-6.9 1.9,-1.9 4.2,-2.9 6.9,-2.9 z m 516.2,-202.5 -75.1,75.1 86.6,86.6 -86.6,86.6 75.1,75.1 86.6,-86.6 86.6,86.6 75.1,-75.1 -86.6,-86.6 86.6,-86.6 -75.1,-75.1 -86.6,86.6 z M 163.5,1011.7 h 102.9 c 2.7,0 5,1 6.9,2.9 1.9,1.9 2.9,4.2 2.9,6.9 v 102.9 c 0,2.7 -1,5 -2.9,6.9 -1.9,1.9 -4.2,2.9 -6.9,2.9 H 163.5 c -2.7,0 -5,-1 -6.9,-2.9 -1.9,-1.9 -2.9,-4.2 -2.9,-6.9 v -102.9 c 0,-2.7 1,-5 2.9,-6.9 1.9,-2 4.2,-2.9 6.9,-2.9 z" id="path272" /></g></g>`);
  (0, import_obsidian9.addIcon)("jira-issue-git-merge", `<g id="git-merge" transform="matrix(0.10206165,0,0,0.10206165,-7.2769956,-1.0410288)"><g transform="matrix(1,0,0,-1,0,1920)" id="g309"><path d="m 162.7,930 c -25.3,0 -46.9,8.9 -64.7,26.7 -17.8,17.8 -26.7,39.4 -26.7,64.7 v 102.9 c 0,23.4 7.8,43.7 23.5,60.8 15.7,17.1 35,27.1 58.2,29.8 v 410 c -23.1,2.7 -42.5,12.7 -58.2,29.8 -15.7,17.1 -23.5,37.4 -23.5,60.8 v 102.9 c 0,25.3 8.9,46.9 26.7,64.7 17.8,17.8 39.4,26.7 64.7,26.7 h 102.9 c 25.3,0 46.9,-8.9 64.7,-26.7 17.8,-17.8 26.7,-39.4 26.7,-64.7 v -102.9 c 0,-23.4 -7.8,-43.7 -23.5,-60.8 -15.7,-17.2 -35,-27.1 -58.2,-29.8 v -38.8 l 174,-166.2 h 194.8 c 2.5,21.2 12.4,40.2 29.8,56.8 17.4,16.6 37.6,24.9 60.4,24.9 h 102.9 c 12.5,0 24.4,-2.5 35.7,-7.4 11.3,-4.9 21,-11.4 29.2,-19.6 8.2,-8.2 14.6,-17.9 19.4,-29.2 4.8,-11.3 7.1,-23.1 7.1,-35.3 v -102.9 c 0,-25.3 -8.9,-46.9 -26.7,-64.7 -17.8,-17.8 -39.4,-26.7 -64.7,-26.7 H 734.4 c -22.9,0 -43,8.3 -60.4,24.9 -17.4,16.6 -27.4,35.5 -29.8,56.8 H 424.5 c -16.3,0 -30.4,5.7 -42.1,17.1 l -107,102.1 V 1215 c 23.1,-2.7 42.5,-12.7 58.2,-29.8 15.7,-17.1 23.5,-37.4 23.5,-60.8 v -102.9 c 0,-25.3 -8.9,-46.9 -26.7,-64.7 C 312.6,939 290.9,930 265.6,930 Z m 0,775.8 h 102.9 c 2.7,0 5,1 6.9,2.9 1.9,1.9 2.9,4.2 2.9,6.9 v 102.9 c 0,2.7 -1,5 -2.9,6.9 -1.9,1.9 -4.2,2.9 -6.9,2.9 H 162.7 c -2.7,0 -5,-1 -6.9,-2.9 -1.9,-1.9 -2.9,-4.2 -2.9,-6.9 v -102.9 c 0,-2.7 1,-5 2.9,-6.9 1.9,-1.9 4.2,-2.9 6.9,-2.9 z m 571.7,-408.3 h 102.9 c 2.7,0 5,1 6.9,2.9 1.9,1.9 2.9,4.2 2.9,6.9 v 102.9 c 0,2.7 -1,5 -2.9,6.9 -1.9,1.9 -4.2,2.9 -6.9,2.9 H 734.4 c -2.7,0 -5,-1 -6.9,-2.9 -1.9,-1.9 -2.9,-4.2 -2.9,-6.9 v -102.9 c 0,-2.7 1,-5 2.9,-6.9 1.8,-1.9 4.2,-2.9 6.9,-2.9 z M 162.7,1011.7 h 102.9 c 2.7,0 5,1 6.9,2.9 1.9,1.9 2.9,4.2 2.9,6.9 v 102.9 c 0,2.7 -1,5 -2.9,6.9 -1.9,1.9 -4.2,2.9 -6.9,2.9 H 162.7 c -2.7,0 -5,-1 -6.9,-2.9 -1.9,-1.9 -2.9,-4.2 -2.9,-6.9 v -102.9 c 0,-2.7 1,-5 2.9,-6.9 1.9,-1.9 4.2,-2.9 6.9,-2.9 z" id="path307" /></g></g>`);
  (0, import_obsidian9.addIcon)("jira-issue-git-pull-request", `<g id="git-pull-request" transform="matrix(0.10205123,0,0,0.10205123,-9.3580978,-1.0307174)"><g transform="matrix(1,0,0,-1,0,1920)" id="g344"><path d="m 183.1,930 c -25.3,0 -46.9,8.9 -64.7,26.7 -17.8,17.8 -26.7,39.4 -26.7,64.7 v 102.9 c 0,23.4 7.8,43.7 23.5,60.8 15.7,17.2 35,27.1 58.2,29.8 v 410 c -15,1.6 -28.7,6.7 -41.2,15.1 -12.5,8.4 -22.4,19.3 -29.6,32.5 -7.2,13.2 -10.8,27.6 -10.8,43.1 v 102.9 c 0,25.3 8.9,46.9 26.7,64.7 17.8,17.8 39.4,26.7 64.7,26.7 H 286 c 25.3,0 46.9,-8.9 64.7,-26.7 17.8,-17.8 26.7,-39.4 26.7,-64.7 v -102.9 c 0,-23.4 -7.8,-43.7 -23.5,-60.8 -15.7,-17.1 -35,-27.1 -58.2,-29.8 v -410 c 23.1,-2.7 42.5,-12.7 58.2,-29.8 15.7,-17.1 23.5,-37.4 23.5,-60.8 v -102.9 c 0,-25.3 -8.9,-46.9 -26.7,-64.7 C 332.9,938.9 311.4,930 286,930 Z m 530.9,0 c -25.3,0 -46.9,8.9 -64.7,26.7 -17.8,17.8 -26.7,39.4 -26.7,64.7 v 102.9 c 0,23.4 7.8,43.7 23.5,60.8 15.7,17.2 35,27.1 58.2,29.8 v 450 H 581.7 V 1584 L 422.9,1726.5 581.7,1869 v -81.7 h 245 V 1215 c 23.1,-2.7 42.5,-12.7 58.2,-29.8 15.7,-17.1 23.5,-37.4 23.5,-60.8 v -102.9 c 0,-25.3 -8.9,-46.9 -26.7,-64.7 C 863.9,939 842.3,930.1 817,930.1 H 714 Z M 183.1,1705.8 H 286 c 2.7,0 5,1 6.9,2.9 1.9,1.9 2.9,4.2 2.9,6.9 v 102.9 c 0,2.7 -1,5 -2.9,6.9 -1.9,1.9 -4.2,2.9 -6.9,2.9 H 183.1 c -2.7,0 -5,-1 -6.9,-2.9 -1.9,-1.9 -2.9,-4.2 -2.9,-6.9 v -102.9 c 0,-2.7 1,-5 2.9,-6.9 1.9,-1.9 4.2,-2.9 6.9,-2.9 z m 0,-694.1 H 286 c 2.7,0 5,1 6.9,2.9 1.9,1.9 2.9,4.2 2.9,6.9 v 102.9 c 0,2.7 -1,5 -2.9,6.9 -1.9,1.9 -4.2,2.9 -6.9,2.9 H 183.1 c -2.7,0 -5,-1 -6.9,-2.9 -1.9,-1.9 -2.9,-4.2 -2.9,-6.9 v -102.9 c 0,-2.7 1,-5 2.9,-6.9 1.9,-2 4.2,-2.9 6.9,-2.9 z m 530.9,0 h 102.9 c 2.7,0 5,1 6.9,2.9 1.9,1.9 2.9,4.2 2.9,6.9 v 102.9 c 0,2.7 -1,5 -2.9,6.9 -1.9,1.9 -4.2,2.9 -6.9,2.9 H 714 c -2.7,0 -5,-1 -6.9,-2.9 -1.9,-1.9 -2.9,-4.2 -2.9,-6.9 v -102.9 c 0,-2.7 1,-5 2.9,-6.9 1.8,-2 4.1,-2.9 6.9,-2.9 z" id="path342" /></g></g>`);
  (0, import_obsidian9.addIcon)("jira-issue-visible", `<g id="visible" transform="matrix(2.0877698,0,0,2.0877698,-17.138502,-29.073804)"><path d="m 32.513,19.849919 c 10.574,0.15 19.249,9.657 23.594,17.837 0,0 -1.529,3.129 -2.963,5.132 -0.694,0.969 -1.424,1.913 -2.191,2.826 -0.547,0.65 -1.112,1.283 -1.698,1.898 -5.237,5.5 -12.758,9.603 -20.7,8.01 -8.823,-1.77 -16.02,-9.33 -20.346,-17.461 0,0 1.536,-3.132 2.978,-5.132 0.646,-0.897 1.324,-1.77 2.034,-2.617 0.544,-0.649 1.108,-1.282 1.691,-1.897 4.627,-4.876 10.564,-8.63 17.601,-8.596 z m -0.037,4 c -5.89,-0.022 -10.788,3.267 -14.663,7.35 -0.527,0.555 -1.035,1.127 -1.527,1.713 -0.647,0.772 -1.265,1.569 -1.854,2.386 -0.589,0.816 -1.193,1.846 -1.672,2.721 3.814,6.409 9.539,12.198 16.582,13.611 6.563,1.317 12.688,-2.301 17.016,-6.846 0.529,-0.555 1.04,-1.128 1.534,-1.715 0.7,-0.833 1.366,-1.694 1.999,-2.579 0.586,-0.819 1.189,-1.851 1.667,-2.727 -3.958,-6.625 -10.73,-13.784 -19.082,-13.914 z" id="path439" style="clip-rule:evenodd;fill-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" /><path d="m 32.158,29.857771 c 4.425,0 8.018,3.593 8.018,8.017 0,4.425 -3.593,8.017 -8.018,8.017 -4.424,0 -8.017,-3.592 -8.017,-8.017 0,-4.424 3.593,-8.017 8.017,-8.017 z m 0,4.009 c 2.213,0 4.009,1.796 4.009,4.008 0,2.213 -1.796,4.009 -4.009,4.009 -2.212,0 -4.008,-1.796 -4.008,-4.009 0,-2.212 1.796,-4.008 4.008,-4.008 z" id="path441" style="clip-rule:evenodd;fill-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" /></g>`);
  (0, import_obsidian9.addIcon)("jira-issue-hidden", `<g id="hidden" transform="matrix(2.0877698,0,0,2.0877698,-16.915111,-21.597979)"><path d="m 13.673,12.819001 -3.097,3.096 39.853,39.854 3.097,-3.097 z" id="path80" style="clip-rule:evenodd;fill-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" /><path d="m 17.119,22.449899 2.915,2.915 c -3.191,2.717 -5.732,6.099 -7.374,9.058 l -0.005,0.01 c 4.573,7.646 11.829,14.872 20.987,13.776 2.472,-0.296 4.778,-1.141 6.885,-2.35 l 2.951,2.95 c -4.107,2.636 -8.815,4.032 -13.916,3.342 -9.198,-1.244 -16.719,-8.788 -21.46,-17.648 2.226,-4.479 5.271,-8.764 9.017,-12.053 z m 6.63,-4.32 c 2.572,-1.146 5.355,-1.82 8.327,-1.868 0.165,-0.001 2.124,0.092 3.012,0.238 0.557,0.092 1.112,0.207 1.659,0.35 8.725,2.273 15.189,9.649 19.253,17.248 -1.705,3.443 -3.938,6.803 -6.601,9.682 l -2.827,-2.827 c 1.967,-2.12 3.607,-4.48 4.87,-6.769 0,0 -1.27,-2.042 -2.233,-3.324 -0.619,-0.824 -1.27,-1.624 -1.954,-2.395 -0.54,-0.608 -2.637,-2.673 -3.136,-3.103 -3.348,-2.879 -7.279,-5.138 -11.994,-5.1 -1.826,0.029 -3.582,0.389 -5.249,0.995 z" style="clip-rule:evenodd;fill-rule:nonzero;stroke-linejoin:round;stroke-miterlimit:2" id="path82" /><path d="m 25.054,30.380001 2.399,2.398 c -0.157,0.477 -0.243,0.987 -0.243,1.516 0,2.672 2.169,4.841 4.841,4.841 0.529,0 1.039,-0.085 1.516,-0.243 l 2.399,2.399 c -1.158,0.65 -2.494,1.02 -3.915,1.02 -4.425,0 -8.017,-3.592 -8.017,-8.017 0,-1.421 0.371,-2.756 1.02,-3.914 z m 6.849,-4.101 c 0.049,-0.001 0.099,-0.002 0.148,-0.002 4.425,0 8.017,3.593 8.017,8.017 0,0.05 0,0.099 -10e-4,0.148 z" id="path84" style="clip-rule:evenodd;fill-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" /></g>`);
};

// src/api/apiMacro.ts
var import_moment = __toESM(require_moment());
var ms2 = require_ms();
function dateTimeToDate(dateTime) {
  if (dateTime.match(/^\d/)) {
    return (0, import_moment.default)(dateTime).format("YYYY-MM-DD");
  }
  return null;
}
async function getActiveSprint(projectKeyOrId) {
  const boards = await api_default.base.getBoards(projectKeyOrId, { limit: 1 });
  if (boards.length > 0) {
    const sprints = await api_default.base.getSprints(boards[0].id, { state: ["active" /* ACTIVE */], limit: 1 });
    if (sprints.length > 0) {
      return sprints[0];
    }
  }
  return null;
}
async function getActiveSprintName(projectKeyOrId) {
  const sprint = await api_default.macro.getActiveSprint(projectKeyOrId);
  return sprint ? sprint.name : "";
}
async function getWorkLogBySprint(projectKeyOrId, sprint) {
  return await getWorkLogByDates(projectKeyOrId, sprint.startDate, sprint.endDate);
}
async function getWorkLogBySprintId(projectKeyOrId, sprintId) {
  const sprint = await api_default.base.getSprint(sprintId);
  return await getWorkLogByDates(projectKeyOrId, sprint.startDate, sprint.endDate);
}
async function getWorkLogByDates(projectKeyOrId, startDate, endDate = "now()") {
  const searchResults = await api_default.base.getSearchResults(
    `project = "${projectKeyOrId}" AND worklogDate > ${dateTimeToDate(startDate)} AND worklogDate < ${dateTimeToDate(endDate)}`,
    { limit: 50, fields: ["worklog"] }
  );
  let worklogs = [];
  for (const issue of searchResults.issues) {
    if (issue.fields.worklog && issue.fields.worklog.worklogs) {
      issue.fields.worklog.worklogs.forEach((worklog) => worklog.issueKey = issue.key);
      worklogs = worklogs.concat(issue.fields.worklog.worklogs);
    }
  }
  return worklogs;
}
async function getWorkLogSeriesByUser(projectKeyOrId, startDate, endDate = "now()") {
  const worklogs = await api_default.macro.getWorkLogByDates(projectKeyOrId, startDate, endDate);
  const series = {};
  for (const worklog of worklogs) {
    const author = worklog.author?.accountId || worklog.author?.displayName || worklog.author?.name || "Unknown";
    if (!(author in series)) {
      series[author] = 0;
    }
    series[author] += worklog.timeSpent.split(" ").map((x) => ms2(x)).reduce((x, y) => x + y);
  }
  return series;
}
async function getVelocity(projectKeyOrId, sprintId, storyPointFieldName = "aggregatetimeoriginalestimate") {
  const searchResults = await api_default.base.getSearchResults(
    `project = "${projectKeyOrId}" AND sprint = ${sprintId} AND resolution = Done`,
    { limit: 50, fields: [storyPointFieldName] }
  );
  let velocity = 0;
  for (const issue of searchResults.issues) {
    velocity += issue.fields[storyPointFieldName];
  }
  return velocity;
}

// src/api/apiDefaulted.ts
async function getIssueDefaulted(issueKey, options = {}) {
  return toDefaultedIssue(await api_default.base.getIssue(issueKey, options));
}
async function getDefaultedSearchResults(query2, options = {}) {
  const searchResults = await api_default.base.getSearchResults(query2, options);
  if (searchResults && searchResults.issues) {
    searchResults.issues = searchResults.issues.map(toDefaultedIssue);
  }
  return searchResults;
}

// src/api/apiChart.ts
var import_moment2 = __toESM(require_moment());
var ms3 = require_ms();
var CHART_WIDTH = "800px";
var MS_IN_A_DAY = ms3("1d");
var MS_IN_A_HOUR = ms3("1h");
function createChart(type, labels, series) {
  return `\`\`\`chart
type: ${type}
width: ${CHART_WIDTH}
labels: [${labels}]
series:
${series.map((s) => {
    return `  - title: ${s.title}
    data: [${s.data}]`;
  }).join("\n")}
\`\`\``;
}
async function getWorklogPerDay(projectKeyOrId, startDate, endDate = "now()") {
  const worklogs = await api_default.macro.getWorkLogByDates(projectKeyOrId, startDate, endDate);
  const labels = [];
  const emptySeries = {};
  const intervalStart = (0, import_moment2.default)(startDate);
  const intervalEnd = (0, import_moment2.default)(endDate);
  for (const i = intervalStart.clone(); i < intervalEnd; i.add(1, "d")) {
    labels.push(i.format("YYYY-MM-DD"));
    emptySeries[i.format("YYYY-MM-DD")] = 0;
  }
  const usersSeries = {};
  for (const worklog of worklogs) {
    const author = worklog.author?.accountId || worklog.author?.displayName || worklog.author?.name || "Unknown";
    if (!usersSeries[author]) {
      usersSeries[author] = Object.assign({}, emptySeries);
    }
    const worklogStart = (0, import_moment2.default)(worklog.started).format("YYYY-MM-DD");
    if (worklogStart in usersSeries[author]) {
      usersSeries[author][worklogStart] += worklog.timeSpentSeconds;
    }
  }
  return createChart(
    "line",
    labels,
    Object.entries(usersSeries).map((u) => {
      return {
        title: u[0],
        data: Object.values(u[1])
      };
    })
  );
}
async function getWorklogPerUser(projectKeyOrId, startDate, endDate = "now()", options = {}) {
  const opt = {
    format: options.format || "Percentage" /* PERCENTAGE */,
    capacity: options.capacity || null
  };
  const series = await api_default.macro.getWorkLogSeriesByUser(projectKeyOrId, startDate, endDate);
  switch (opt.format) {
    case "Hours" /* HOURS */:
      for (const a in series) {
        series[a] = series[a] / MS_IN_A_HOUR;
      }
      break;
    case "Days" /* DAYS */:
      for (const a in series) {
        series[a] = series[a] / MS_IN_A_DAY;
      }
      break;
    case "Percentage" /* PERCENTAGE */:
      const days = import_moment2.default.duration((0, import_moment2.default)(endDate).diff(startDate)).asDays();
      for (const author in series) {
        if (opt.capacity) {
          if (author in opt.capacity) {
            series[author] = series[author] / opt.capacity[author] / MS_IN_A_DAY * 100;
          } else {
            delete series[author];
          }
        } else {
          series[author] = series[author] / days / MS_IN_A_DAY * 100;
        }
      }
      break;
    default:
      throw new Error("Invalid chart format");
  }
  return createChart(
    "bar",
    Object.keys(series),
    [{
      title: `Time logged ${opt.format}`,
      data: Object.values(series)
    }]
  );
}

// src/api/apiBase.ts
function cacheWrapper(func) {
  return (...args) => {
    const cacheKey = `api-${func.name}-${JSON.stringify(args)}`;
    const cacheVal = objectsCache_default.get(cacheKey);
    if (cacheVal) {
      return cacheVal.data;
    }
    const returnValue = func(...args);
    objectsCache_default.add(cacheKey, returnValue);
    return returnValue;
  };
}
async function getIssue(issueKey, options = {}) {
  return cacheWrapper(jiraClient_default.getIssue)(issueKey, options);
}
async function getSearchResults(query2, options = {}) {
  return cacheWrapper(jiraClient_default.getSearchResults)(query2, options);
}
async function getDevStatus(issueId, options = {}) {
  return cacheWrapper(jiraClient_default.getDevStatus)(issueId, options);
}
async function getBoards(projectKeyOrId, options = {}) {
  return cacheWrapper(jiraClient_default.getBoards)(projectKeyOrId, options);
}
async function getSprint(sprintId, options = {}) {
  return cacheWrapper(jiraClient_default.getSprint)(sprintId, options);
}
async function getSprints(boardId, options = {}) {
  return cacheWrapper(jiraClient_default.getSprints)(boardId, options);
}
async function getLoggedUser(account = null) {
  return cacheWrapper(jiraClient_default.getLoggedUser)(account);
}

// src/api/api.ts
var API = {
  base: {
    getIssue,
    getSearchResults,
    getDevStatus,
    getBoards,
    getSprint,
    getSprints,
    getLoggedUser
  },
  defaulted: {
    getIssue: getIssueDefaulted,
    getSearchResults: getDefaultedSearchResults
  },
  macro: {
    getActiveSprint,
    getActiveSprintName,
    getWorkLogBySprint,
    getWorkLogBySprintId,
    getWorkLogByDates,
    getWorkLogSeriesByUser,
    getVelocity
  },
  chart: {
    getWorklogPerDay,
    getWorklogPerUser
  },
  account: {
    getAccountByAlias,
    getAccountByHost
  },
  util: {
    clearCache: objectsCache_default.clear
  }
};
var api_default = API;

// src/main.ts
var ObsidianApp = null;
var JiraIssuePlugin = class extends import_obsidian10.Plugin {
  constructor() {
    super(...arguments);
    this.api = api_default;
  }
  async onload() {
    ObsidianApp = this.app;
    this.registerAPI();
    this._settingTab = new JiraIssueSettingTab(this.app, this);
    await this._settingTab.loadSettings();
    this.addSettingTab(this._settingTab);
    jiraClient_default.updateCustomFieldsCache();
    setupIcons();
    this.registerMarkdownCodeBlockProcessor("jira-issue", IssueFenceRenderer);
    this.registerMarkdownCodeBlockProcessor("jira-search", SearchFenceRenderer);
    this.registerMarkdownCodeBlockProcessor("jira-count", CountFenceRenderer);
    this.app.workspace.onLayoutReady(() => {
      this._columnsSuggest = new ColumnsSuggest(this.app);
      this.registerEditorSuggest(this._columnsSuggest);
    });
    this.app.workspace.onLayoutReady(() => {
      this._querySuggest = new QuerySuggest(this.app);
      this.registerEditorSuggest(this._querySuggest);
    });
    this.registerMarkdownPostProcessor(InlineIssueRenderer);
    this._inlineIssueViewPlugin = new ViewPluginManager();
    this._inlineIssueViewPlugin.getViewPlugins().forEach((vp) => this.registerEditorExtension(vp));
    this._settingTab.onChange(() => {
      objectsCache_default.clear();
      jiraClient_default.updateCustomFieldsCache();
      this._inlineIssueViewPlugin.update();
    });
    this.addCommand({
      id: "obsidian-jira-issue-clear-cache",
      name: "Clear cache",
      callback: () => {
        objectsCache_default.clear();
        jiraClient_default.updateCustomFieldsCache();
        new import_obsidian10.Notice("JiraIssue: Cache cleaned");
      }
    });
    this.addCommand({
      id: "obsidian-jira-issue-template-fence",
      name: "Insert issue template",
      editorCallback: (editor, view) => {
        editor.replaceRange("```jira-issue\n\n```", editor.getCursor());
      }
    });
    this.addCommand({
      id: "obsidian-jira-search-wizard-fence",
      name: "Search wizard",
      editorCallback: (editor, view) => {
        new SearchWizardModal(this.app, (result) => {
          editor.replaceRange(result, editor.getCursor());
        }).open();
      }
    });
    this.addCommand({
      id: "obsidian-jira-count-template-fence",
      name: "Insert count template",
      editorCallback: (editor, view) => {
        editor.replaceRange("```jira-count\n\n```", editor.getCursor());
      }
    });
  }
  onunload() {
    this._settingTab = null;
    this._columnsSuggest = null;
    this._inlineIssueViewPlugin = null;
  }
  registerAPI() {
    window.$ji = api_default;
  }
};
