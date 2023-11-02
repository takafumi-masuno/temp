/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */
import 'core-js/es/array';
import 'core-js/es/object';
//Polyfill for slice
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice
if (!Uint8Array.prototype.slice) {
  Object.defineProperty(Uint8Array.prototype, 'slice', {
    value: function (begin, end) {
      return new Uint8Array(Array.prototype.slice.call(this, begin, end));
    },
  });
}

//Polyfill for codePointAt
//http://xahlee.info/js/js_String.prototype.codePointAt.html
if (!String.prototype.codePointAt) {
  String.prototype.codePointAt = function fixedCharCodeAt(idx) {
    // 2017-02-24 from https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/charCodeAt
    // 2017-02-24 xah lee, made to be compatible with es2015 codePointAt
    // ex. fixedCharCodeAt ('\uD800\uDC00', 0); // 65536
    // ex. fixedCharCodeAt ('\uD800\uDC00', 1); // 65536
    idx = idx || 0;
    const code = this.charCodeAt(idx);
    let hi: number, low: number;
    if (0xd800 <= code && code <= 0xdbff) {
      // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
      hi = code;
      low = this.charCodeAt(idx + 1);
      if (isNaN(low)) {
        throw 'High surrogate not followed by low surrogate in fixedCharCodeAt()';
      }
      return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000;
    }
    if (0xdc00 <= code && code <= 0xdfff) {
      // Low surrogate
      // We return false to allow loops to skip this iteration since should have already handled high surrogate above in the previous iteration
      return false;
      /*hi = this.charCodeAt(idx-1)
            low = code
            return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;*/
    }
    return code;
  };
}
// https://github.com/behnammodi/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}
if (!String.prototype.repeat) {
  String.prototype.repeat = function (count) {
    'use strict';
    if (this == null) {
      throw new TypeError("can't convert " + this + ' to object');
    }
    let str = '' + this;
    count = +count;
    if (count != count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
      return '';
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28) {
      throw new RangeError(
        'repeat count must not overflow maximum string size'
      );
    }
    const maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
      str += str;
      count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
  };
}

if (typeof window['TextEncoder'] !== 'function') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const textEncodingPolyfill = require('text-encoding');
  window.TextEncoder = textEncodingPolyfill.TextEncoder;
  window.TextDecoder = textEncodingPolyfill.TextDecoder;
}
if (!Element.prototype.matches) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Element.prototype.matches =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Element.prototype as any).msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js'; // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 */
import 'intersection-observer';
