var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __esm = (fn, res) =>
  function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
  };
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from3, except, desc) => {
  if ((from3 && typeof from3 === 'object') || typeof from3 === 'function') {
    for (let key of __getOwnPropNames(from3))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from3[key],
          enumerable: !(desc = __getOwnPropDesc(from3, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod,
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value);
  return value;
};

// src/.wrangler/tmp/bundle-tItaRt/checked-fetch.js
function checkURL(request, init3) {
  const url =
    request instanceof URL
      ? request
      : new URL(
          (typeof request === 'string'
            ? new Request(request, init3)
            : request
          ).url,
        );
  if (url.port && url.port !== '443' && url.protocol === 'https:') {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`,
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  'src/.wrangler/tmp/bundle-tItaRt/checked-fetch.js'() {
    urls = /* @__PURE__ */ new Set();
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init3] = argArray;
        checkURL(request, init3);
        return Reflect.apply(target, thisArg, argArray);
      },
    });
  },
});

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/@esbuild-plugins/node-globals-polyfill/process.js
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if (
    (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
    setTimeout
  ) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e8) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e9) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if (
    (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
    clearTimeout
  ) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e8) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e9) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
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
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      args[i2 - 1] = arguments[i2];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop() {}
function binding(name) {
  throw new Error('process.binding is not supported');
}
function cwd() {
  return '/';
}
function chdir(dir) {
  throw new Error('process.chdir is not supported');
}
function umask() {
  return 0;
}
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance2) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime % 1) * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
function uptime() {
  var currentTime = /* @__PURE__ */ new Date();
  var dif = currentTime - startTime;
  return dif / 1e3;
}
var cachedSetTimeout,
  cachedClearTimeout,
  queue,
  draining,
  currentQueue,
  queueIndex,
  title,
  platform,
  browser,
  env,
  argv,
  version,
  versions,
  release,
  config,
  on,
  addListener,
  once,
  off,
  removeListener,
  removeAllListeners,
  emit,
  performance2,
  performanceNow,
  startTime,
  process,
  defines;
var init_process = __esm({
  '../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/@esbuild-plugins/node-globals-polyfill/process.js'() {
    cachedSetTimeout = defaultSetTimout;
    cachedClearTimeout = defaultClearTimeout;
    if (typeof globalThis.setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    }
    if (typeof globalThis.clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    }
    queue = [];
    draining = false;
    queueIndex = -1;
    Item.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    title = 'browser';
    platform = 'browser';
    browser = true;
    env = {};
    argv = [];
    version = '';
    versions = {};
    release = {};
    config = {};
    on = noop;
    addListener = noop;
    once = noop;
    off = noop;
    removeListener = noop;
    removeAllListeners = noop;
    emit = noop;
    performance2 = globalThis.performance || {};
    performanceNow =
      performance2.now ||
      performance2.mozNow ||
      performance2.msNow ||
      performance2.oNow ||
      performance2.webkitNow ||
      function () {
        return /* @__PURE__ */ new Date().getTime();
      };
    startTime = /* @__PURE__ */ new Date();
    process = {
      nextTick,
      title,
      browser,
      env,
      argv,
      version,
      versions,
      on,
      addListener,
      once,
      off,
      removeListener,
      removeAllListeners,
      emit,
      binding,
      cwd,
      chdir,
      umask,
      hrtime,
      platform,
      release,
      config,
      uptime,
    };
    defines = {};
    Object.keys(defines).forEach((key) => {
      const segs = key.split('.');
      let target = process;
      for (let i2 = 0; i2 < segs.length; i2++) {
        const seg = segs[i2];
        if (i2 === segs.length - 1) {
          target[seg] = defines[key];
        } else {
          target = target[seg] || (target[seg] = {});
        }
      }
    });
  },
});

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js
function init() {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i2 = 0, len = code.length; i2 < len; ++i2) {
    lookup[i2] = code[i2];
    revLookup[code.charCodeAt(i2)] = i2;
  }
  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}
function base64toByteArray(b64) {
  if (!inited) {
    init();
  }
  var i2, j, l, tmp, placeHolders, arr;
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
  arr = new Arr((len * 3) / 4 - placeHolders);
  l = placeHolders > 0 ? len - 4 : len;
  var L = 0;
  for (i2 = 0, j = 0; i2 < l; i2 += 4, j += 3) {
    tmp =
      (revLookup[b64.charCodeAt(i2)] << 18) |
      (revLookup[b64.charCodeAt(i2 + 1)] << 12) |
      (revLookup[b64.charCodeAt(i2 + 2)] << 6) |
      revLookup[b64.charCodeAt(i2 + 3)];
    arr[L++] = (tmp >> 16) & 255;
    arr[L++] = (tmp >> 8) & 255;
    arr[L++] = tmp & 255;
  }
  if (placeHolders === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i2)] << 2) |
      (revLookup[b64.charCodeAt(i2 + 1)] >> 4);
    arr[L++] = tmp & 255;
  } else if (placeHolders === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i2)] << 10) |
      (revLookup[b64.charCodeAt(i2 + 1)] << 4) |
      (revLookup[b64.charCodeAt(i2 + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 255;
    arr[L++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return (
    lookup[(num >> 18) & 63] +
    lookup[(num >> 12) & 63] +
    lookup[(num >> 6) & 63] +
    lookup[num & 63]
  );
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i2 = start; i2 < end; i2 += 3) {
    tmp = (uint8[i2] << 16) + (uint8[i2 + 1] << 8) + uint8[i2 + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}
function base64fromByteArray(uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var output = '';
  var parts = [];
  var maxChunkLength = 16383;
  for (var i2 = 0, len2 = len - extraBytes; i2 < len2; i2 += maxChunkLength) {
    parts.push(
      encodeChunk(
        uint8,
        i2,
        i2 + maxChunkLength > len2 ? len2 : i2 + maxChunkLength,
      ),
    );
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 63];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 63];
    output += lookup[(tmp << 2) & 63];
    output += '=';
  }
  parts.push(output);
  return parts.join('');
}
function kMaxLength() {
  return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = new Uint8Array(length);
    that.__proto__ = Buffer2.prototype;
  } else {
    if (that === null) {
      that = new Buffer2(length);
    }
    that.length = length;
  }
  return that;
}
function Buffer2(arg, encodingOrOffset, length) {
  if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
    return new Buffer2(arg, encodingOrOffset, length);
  }
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string',
      );
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}
function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }
  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }
  return fromObject(that, value);
}
function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}
function alloc(that, size, fill3, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill3 !== void 0) {
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill3, encoding)
      : createBuffer(that, size).fill(fill3);
  }
  return createBuffer(that, size);
}
function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer2.TYPED_ARRAY_SUPPORT) {
    for (var i2 = 0; i2 < size; ++i2) {
      that[i2] = 0;
    }
  }
  return that;
}
function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }
  if (!Buffer2.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }
  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);
  if (actual !== length) {
    that = that.slice(0, actual);
  }
  return that;
}
function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i2 = 0; i2 < length; i2 += 1) {
    that[i2] = array[i2] & 255;
  }
  return that;
}
function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength;
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError("'offset' is out of bounds");
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError("'length' is out of bounds");
  }
  if (byteOffset === void 0 && length === void 0) {
    array = new Uint8Array(array);
  } else if (length === void 0) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = array;
    that.__proto__ = Buffer2.prototype;
  } else {
    that = fromArrayLike(that, array);
  }
  return that;
}
function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);
    if (that.length === 0) {
      return that;
    }
    obj.copy(that, 0, 0, len);
    return that;
  }
  if (obj) {
    if (
      (typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) ||
      'length' in obj
    ) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }
    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }
  throw new TypeError(
    'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.',
  );
}
function checked(length) {
  if (length >= kMaxLength()) {
    throw new RangeError(
      'Attempt to allocate Buffer larger than maximum size: 0x' +
        kMaxLength().toString(16) +
        ' bytes',
    );
  }
  return length | 0;
}
function internalIsBuffer(b2) {
  return !!(b2 != null && b2._isBuffer);
}
function byteLength(string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length;
  }
  if (
    typeof ArrayBuffer !== 'undefined' &&
    typeof ArrayBuffer.isView === 'function' &&
    (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)
  ) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }
  var len = string.length;
  if (len === 0) return 0;
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
      case void 0:
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length;
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
function slowToString(encoding, start, end) {
  var loweredCase = false;
  if (start === void 0 || start < 0) {
    start = 0;
  }
  if (start > this.length) {
    return '';
  }
  if (end === void 0 || end > this.length) {
    end = this.length;
  }
  if (end <= 0) {
    return '';
  }
  end >>>= 0;
  start >>>= 0;
  if (end <= start) {
    return '';
  }
  if (!encoding) encoding = 'utf8';
  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);
      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);
      case 'ascii':
        return asciiSlice(this, start, end);
      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);
      case 'base64':
        return base64Slice(this, start, end);
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}
function swap(b2, n3, m2) {
  var i2 = b2[n3];
  b2[n3] = b2[m2];
  b2[m2] = i2;
}
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  if (buffer.length === 0) return -1;
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 2147483647) {
    byteOffset = 2147483647;
  } else if (byteOffset < -2147483648) {
    byteOffset = -2147483648;
  }
  byteOffset = +byteOffset;
  if (isNaN(byteOffset)) {
    byteOffset = dir ? 0 : buffer.length - 1;
  }
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1;
  }
  if (typeof val === 'string') {
    val = Buffer2.from(val, encoding);
  }
  if (internalIsBuffer(val)) {
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 255;
    if (
      Buffer2.TYPED_ARRAY_SUPPORT &&
      typeof Uint8Array.prototype.indexOf === 'function'
    ) {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }
  throw new TypeError('val must be string, number or Buffer');
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
  if (encoding !== void 0) {
    encoding = String(encoding).toLowerCase();
    if (
      encoding === 'ucs2' ||
      encoding === 'ucs-2' ||
      encoding === 'utf16le' ||
      encoding === 'utf-16le'
    ) {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }
  function read2(buf, i3) {
    if (indexSize === 1) {
      return buf[i3];
    } else {
      return buf.readUInt16BE(i3 * indexSize);
    }
  }
  var i2;
  if (dir) {
    var foundIndex = -1;
    for (i2 = byteOffset; i2 < arrLength; i2++) {
      if (
        read2(arr, i2) === read2(val, foundIndex === -1 ? 0 : i2 - foundIndex)
      ) {
        if (foundIndex === -1) foundIndex = i2;
        if (i2 - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i2 -= i2 - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i2 = byteOffset; i2 >= 0; i2--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read2(arr, i2 + j) !== read2(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i2;
    }
  }
  return -1;
}
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i2 = 0; i2 < length; ++i2) {
    var parsed = parseInt(string.substr(i2 * 2, 2), 16);
    if (isNaN(parsed)) return i2;
    buf[offset + i2] = parsed;
  }
  return i2;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(
    utf8ToBytes(string, buf.length - offset),
    buf,
    offset,
    length,
  );
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(
    utf16leToBytes(string, buf.length - offset),
    buf,
    offset,
    length,
  );
}
function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64fromByteArray(buf);
  } else {
    return base64fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i2 = start;
  while (i2 < end) {
    var firstByte = buf[i2];
    var codePoint = null;
    var bytesPerSequence =
      firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (i2 + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i2 + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = ((firstByte & 31) << 6) | (secondByte & 63);
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i2 + 1];
          thirdByte = buf[i2 + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint =
              ((firstByte & 15) << 12) |
              ((secondByte & 63) << 6) |
              (thirdByte & 63);
            if (
              tempCodePoint > 2047 &&
              (tempCodePoint < 55296 || tempCodePoint > 57343)
            ) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i2 + 1];
          thirdByte = buf[i2 + 2];
          fourthByte = buf[i2 + 3];
          if (
            (secondByte & 192) === 128 &&
            (thirdByte & 192) === 128 &&
            (fourthByte & 192) === 128
          ) {
            tempCodePoint =
              ((firstByte & 15) << 18) |
              ((secondByte & 63) << 12) |
              ((thirdByte & 63) << 6) |
              (fourthByte & 63);
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(((codePoint >>> 10) & 1023) | 55296);
      codePoint = 56320 | (codePoint & 1023);
    }
    res.push(codePoint);
    i2 += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  var res = '';
  var i2 = 0;
  while (i2 < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i2, (i2 += MAX_ARGUMENTS_LENGTH)),
    );
  }
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);
  for (var i2 = start; i2 < end; ++i2) {
    ret += String.fromCharCode(buf[i2] & 127);
  }
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);
  for (var i2 = start; i2 < end; ++i2) {
    ret += String.fromCharCode(buf[i2]);
  }
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';
  for (var i2 = start; i2 < end; ++i2) {
    out += toHex(buf[i2]);
  }
  return out;
}
function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i2 = 0; i2 < bytes.length; i2 += 2) {
    res += String.fromCharCode(bytes[i2] + bytes[i2 + 1] * 256);
  }
  return res;
}
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0)
    throw new RangeError('offset is not uint');
  if (offset + ext > length)
    throw new RangeError('Trying to access beyond buffer length');
}
function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf))
    throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min)
    throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}
function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 65535 + value + 1;
  for (var i2 = 0, j = Math.min(buf.length - offset, 2); i2 < j; ++i2) {
    buf[offset + i2] =
      (value & (255 << (8 * (littleEndian ? i2 : 1 - i2)))) >>>
      ((littleEndian ? i2 : 1 - i2) * 8);
  }
}
function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 4294967295 + value + 1;
  for (var i2 = 0, j = Math.min(buf.length - offset, 4); i2 < j; ++i2) {
    buf[offset + i2] = (value >>> ((littleEndian ? i2 : 3 - i2) * 8)) & 255;
  }
}
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(
      buf,
      value,
      offset,
      4,
      34028234663852886e22,
      -34028234663852886e22,
    );
  }
  ieee754write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(
      buf,
      value,
      offset,
      8,
      17976931348623157e292,
      -17976931348623157e292,
    );
  }
  ieee754write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
function base64clean(str) {
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  if (str.length < 2) return '';
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}
function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}
function toHex(n3) {
  if (n3 < 16) return '0' + n3.toString(16);
  return n3.toString(16);
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i2 = 0; i2 < length; ++i2) {
    codePoint = string.charCodeAt(i2);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          continue;
        } else if (i2 + 1 === length) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint =
        (((leadSurrogate - 55296) << 10) | (codePoint - 56320)) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1) bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0) break;
      bytes.push((codePoint >> 6) | 192, (codePoint & 63) | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0) break;
      bytes.push(
        (codePoint >> 12) | 224,
        ((codePoint >> 6) & 63) | 128,
        (codePoint & 63) | 128,
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0) break;
      bytes.push(
        (codePoint >> 18) | 240,
        ((codePoint >> 12) & 63) | 128,
        ((codePoint >> 6) & 63) | 128,
        (codePoint & 63) | 128,
      );
    } else {
      throw new Error('Invalid code point');
    }
  }
  return bytes;
}
function asciiToBytes(str) {
  var byteArray = [];
  for (var i2 = 0; i2 < str.length; ++i2) {
    byteArray.push(str.charCodeAt(i2) & 255);
  }
  return byteArray;
}
function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i2 = 0; i2 < str.length; ++i2) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i2);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return byteArray;
}
function base64ToBytes(str) {
  return base64toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i2 = 0; i2 < length; ++i2) {
    if (i2 + offset >= dst.length || i2 >= src.length) break;
    dst[i2 + offset] = src[i2];
  }
  return i2;
}
function isnan(val) {
  return val !== val;
}
function isBuffer(obj) {
  return (
    obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
  );
}
function isFastBuffer(obj) {
  return (
    !!obj.constructor &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  );
}
function isSlowBuffer(obj) {
  return (
    typeof obj.readFloatLE === 'function' &&
    typeof obj.slice === 'function' &&
    isFastBuffer(obj.slice(0, 0))
  );
}
function ieee754read(buffer, offset, isLE, mLen, nBytes) {
  var e8, m2;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i2 = isLE ? nBytes - 1 : 0;
  var d2 = isLE ? -1 : 1;
  var s3 = buffer[offset + i2];
  i2 += d2;
  e8 = s3 & ((1 << -nBits) - 1);
  s3 >>= -nBits;
  nBits += eLen;
  for (
    ;
    nBits > 0;
    e8 = e8 * 256 + buffer[offset + i2], i2 += d2, nBits -= 8
  ) {}
  m2 = e8 & ((1 << -nBits) - 1);
  e8 >>= -nBits;
  nBits += mLen;
  for (
    ;
    nBits > 0;
    m2 = m2 * 256 + buffer[offset + i2], i2 += d2, nBits -= 8
  ) {}
  if (e8 === 0) {
    e8 = 1 - eBias;
  } else if (e8 === eMax) {
    return m2 ? NaN : (s3 ? -1 : 1) * Infinity;
  } else {
    m2 = m2 + Math.pow(2, mLen);
    e8 = e8 - eBias;
  }
  return (s3 ? -1 : 1) * m2 * Math.pow(2, e8 - mLen);
}
function ieee754write(buffer, value, offset, isLE, mLen, nBytes) {
  var e8, m2, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i2 = isLE ? 0 : nBytes - 1;
  var d2 = isLE ? 1 : -1;
  var s3 = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m2 = isNaN(value) ? 1 : 0;
    e8 = eMax;
  } else {
    e8 = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e8)) < 1) {
      e8--;
      c *= 2;
    }
    if (e8 + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e8++;
      c /= 2;
    }
    if (e8 + eBias >= eMax) {
      m2 = 0;
      e8 = eMax;
    } else if (e8 + eBias >= 1) {
      m2 = (value * c - 1) * Math.pow(2, mLen);
      e8 = e8 + eBias;
    } else {
      m2 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e8 = 0;
    }
  }
  for (
    ;
    mLen >= 8;
    buffer[offset + i2] = m2 & 255, i2 += d2, m2 /= 256, mLen -= 8
  ) {}
  e8 = (e8 << mLen) | m2;
  eLen += mLen;
  for (
    ;
    eLen > 0;
    buffer[offset + i2] = e8 & 255, i2 += d2, e8 /= 256, eLen -= 8
  ) {}
  buffer[offset + i2 - d2] |= s3 * 128;
}
var lookup, revLookup, Arr, inited, MAX_ARGUMENTS_LENGTH, INVALID_BASE64_RE;
var init_Buffer = __esm({
  '../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    lookup = [];
    revLookup = [];
    Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
    inited = false;
    Buffer2.TYPED_ARRAY_SUPPORT =
      globalThis.TYPED_ARRAY_SUPPORT !== void 0
        ? globalThis.TYPED_ARRAY_SUPPORT
        : true;
    Buffer2.poolSize = 8192;
    Buffer2._augment = function (arr) {
      arr.__proto__ = Buffer2.prototype;
      return arr;
    };
    Buffer2.from = function (value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };
    Buffer2.kMaxLength = kMaxLength();
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      Buffer2.prototype.__proto__ = Uint8Array.prototype;
      Buffer2.__proto__ = Uint8Array;
      if (
        typeof Symbol !== 'undefined' &&
        Symbol.species &&
        Buffer2[Symbol.species] === Buffer2
      ) {
      }
    }
    Buffer2.alloc = function (size, fill3, encoding) {
      return alloc(null, size, fill3, encoding);
    };
    Buffer2.allocUnsafe = function (size) {
      return allocUnsafe(null, size);
    };
    Buffer2.allocUnsafeSlow = function (size) {
      return allocUnsafe(null, size);
    };
    Buffer2.isBuffer = isBuffer;
    Buffer2.compare = function compare(a4, b2) {
      if (!internalIsBuffer(a4) || !internalIsBuffer(b2)) {
        throw new TypeError('Arguments must be Buffers');
      }
      if (a4 === b2) return 0;
      var x2 = a4.length;
      var y2 = b2.length;
      for (var i2 = 0, len = Math.min(x2, y2); i2 < len; ++i2) {
        if (a4[i2] !== b2[i2]) {
          x2 = a4[i2];
          y2 = b2[i2];
          break;
        }
      }
      if (x2 < y2) return -1;
      if (y2 < x2) return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      var i2;
      if (length === void 0) {
        length = 0;
        for (i2 = 0; i2 < list.length; ++i2) {
          length += list[i2].length;
        }
      }
      var buffer = Buffer2.allocUnsafe(length);
      var pos = 0;
      for (i2 = 0; i2 < list.length; ++i2) {
        var buf = list[i2];
        if (!internalIsBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    };
    Buffer2.byteLength = byteLength;
    Buffer2.prototype._isBuffer = true;
    Buffer2.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits');
      }
      for (var i2 = 0; i2 < len; i2 += 2) {
        swap(this, i2, i2 + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits');
      }
      for (var i2 = 0; i2 < len; i2 += 4) {
        swap(this, i2, i2 + 3);
        swap(this, i2 + 1, i2 + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits');
      }
      for (var i2 = 0; i2 < len; i2 += 8) {
        swap(this, i2, i2 + 7);
        swap(this, i2 + 1, i2 + 6);
        swap(this, i2 + 2, i2 + 5);
        swap(this, i2 + 3, i2 + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      var length = this.length | 0;
      if (length === 0) return '';
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.equals = function equals(b2) {
      if (!internalIsBuffer(b2))
        throw new TypeError('Argument must be a Buffer');
      if (this === b2) return true;
      return Buffer2.compare(this, b2) === 0;
    };
    Buffer2.prototype.compare = function compare2(
      target,
      start,
      end,
      thisStart,
      thisEnd,
    ) {
      if (!internalIsBuffer(target)) {
        throw new TypeError('Argument must be a Buffer');
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (
        start < 0 ||
        end > target.length ||
        thisStart < 0 ||
        thisEnd > this.length
      ) {
        throw new RangeError('out of range index');
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      var x2 = thisEnd - thisStart;
      var y2 = end - start;
      var len = Math.min(x2, y2);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i2 = 0; i2 < len; ++i2) {
        if (thisCopy[i2] !== targetCopy[i2]) {
          x2 = thisCopy[i2];
          y2 = targetCopy[i2];
          break;
        }
      }
      if (x2 < y2) return -1;
      if (y2 < x2) return 1;
      return 0;
    };
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(
      val,
      byteOffset,
      encoding,
    ) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = 'utf8';
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === 'string') {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) {
          length = length | 0;
          if (encoding === void 0) encoding = 'utf8';
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          'Buffer.write(string, encoding, offset[, length]) is no longer supported',
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (
        (string.length > 0 && (length < 0 || offset < 0)) ||
        offset > this.length
      ) {
        throw new RangeError('Attempt to write outside buffer bounds');
      }
      if (!encoding) encoding = 'utf8';
      var loweredCase = false;
      for (;;) {
        switch (encoding) {
          case 'hex':
            return hexWrite(this, string, offset, length);
          case 'utf8':
          case 'utf-8':
            return utf8Write(this, string, offset, length);
          case 'ascii':
            return asciiWrite(this, string, offset, length);
          case 'latin1':
          case 'binary':
            return latin1Write(this, string, offset, length);
          case 'base64':
            return base64Write(this, string, offset, length);
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError('Unknown encoding: ' + encoding);
            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    };
    MAX_ARGUMENTS_LENGTH = 4096;
    Buffer2.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      var newBuf;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer2.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer2(sliceLen, void 0);
        for (var i2 = 0; i2 < sliceLen; ++i2) {
          newBuf[i2] = this[i2 + start];
        }
      }
      return newBuf;
    };
    Buffer2.prototype.readUIntLE = function readUIntLE(
      offset,
      byteLength3,
      noAssert,
    ) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) checkOffset(offset, byteLength3, this.length);
      var val = this[offset];
      var mul = 1;
      var i2 = 0;
      while (++i2 < byteLength3 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUIntBE = function readUIntBE(
      offset,
      byteLength3,
      noAssert,
    ) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength3, this.length);
      }
      var val = this[offset + --byteLength3];
      var mul = 1;
      while (byteLength3 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength3] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | (this[offset + 1] << 8);
    };
    Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      return (this[offset] << 8) | this[offset + 1];
    };
    Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (
        (this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16)) +
        this[offset + 3] * 16777216
      );
    };
    Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (
        this[offset] * 16777216 +
        ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3])
      );
    };
    Buffer2.prototype.readIntLE = function readIntLE(
      offset,
      byteLength3,
      noAssert,
    ) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) checkOffset(offset, byteLength3, this.length);
      var val = this[offset];
      var mul = 1;
      var i2 = 0;
      while (++i2 < byteLength3 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(
      offset,
      byteLength3,
      noAssert,
    ) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) checkOffset(offset, byteLength3, this.length);
      var i2 = byteLength3;
      var mul = 1;
      var val = this[offset + --i2];
      while (i2 > 0 && (mul *= 256)) {
        val += this[offset + --i2] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | (this[offset + 1] << 8);
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | (this[offset] << 8);
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (
        this[offset] |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16) |
        (this[offset + 3] << 24)
      );
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (
        (this[offset] << 24) |
        (this[offset + 1] << 16) |
        (this[offset + 2] << 8) |
        this[offset + 3]
      );
    };
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754read(this, offset, false, 52, 8);
    };
    Buffer2.prototype.writeUIntLE = function writeUIntLE(
      value,
      offset,
      byteLength3,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt(this, value, offset, byteLength3, maxBytes, 0);
      }
      var mul = 1;
      var i2 = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength3 && (mul *= 256)) {
        this[offset + i2] = (value / mul) & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeUIntBE = function writeUIntBE(
      value,
      offset,
      byteLength3,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt(this, value, offset, byteLength3, maxBytes, 0);
      }
      var i2 = byteLength3 - 1;
      var mul = 1;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        this[offset + i2] = (value / mul) & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeUInt8 = function writeUInt8(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      if (!Buffer2.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUInt16LE = function writeUInt16LE(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeUInt16BE = function writeUInt16BE(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeUInt32LE = function writeUInt32LE(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeUInt32BE = function writeUInt32BE(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeIntLE = function writeIntLE(
      value,
      offset,
      byteLength3,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt(this, value, offset, byteLength3, limit - 1, -limit);
      }
      var i2 = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength3 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (((value / mul) >> 0) - sub) & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(
      value,
      offset,
      byteLength3,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt(this, value, offset, byteLength3, limit - 1, -limit);
      }
      var i2 = byteLength3 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (((value / mul) >> 0) - sub) & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (!Buffer2.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeFloatLE = function writeFloatLE(
      value,
      offset,
      noAssert,
    ) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(
      value,
      offset,
      noAssert,
    ) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(
      value,
      offset,
      noAssert,
    ) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(
      value,
      offset,
      noAssert,
    ) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds');
      }
      if (start < 0 || start >= this.length)
        throw new RangeError('sourceStart out of bounds');
      if (end < 0) throw new RangeError('sourceEnd out of bounds');
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      var i2;
      if (this === target && start < targetStart && targetStart < end) {
        for (i2 = len - 1; i2 >= 0; --i2) {
          target[i2 + targetStart] = this[i2 + start];
        }
      } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
        for (i2 = 0; i2 < len; ++i2) {
          target[i2 + targetStart] = this[i2 + start];
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart,
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === 'string') {
        if (typeof start === 'string') {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === 'string') {
          encoding = end;
          end = this.length;
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (code < 256) {
            val = code;
          }
        }
        if (encoding !== void 0 && typeof encoding !== 'string') {
          throw new TypeError('encoding must be a string');
        }
        if (typeof encoding === 'string' && !Buffer2.isEncoding(encoding)) {
          throw new TypeError('Unknown encoding: ' + encoding);
        }
      } else if (typeof val === 'number') {
        val = val & 255;
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index');
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      var i2;
      if (typeof val === 'number') {
        for (i2 = start; i2 < end; ++i2) {
          this[i2] = val;
        }
      } else {
        var bytes = internalIsBuffer(val)
          ? val
          : utf8ToBytes(new Buffer2(val, encoding).toString());
        var len = bytes.length;
        for (i2 = 0; i2 < end - start; ++i2) {
          this[i2 + start] = bytes[i2 % len];
        }
      }
      return this;
    };
    INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
  },
});

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js
var init_buffer = __esm({
  '../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js'() {
    init_Buffer();
  },
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  'wrangler-modules-watch:wrangler:modules-watch'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
  },
});

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  '../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/templates/modules-watch-stub.js'() {
    init_wrangler_modules_watch();
  },
});

// ../node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  '../node_modules/eventemitter3/index.js'(exports, module) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var has = Object.prototype.hasOwnProperty;
    var prefix = '~';
    function Events() {}
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once4) {
      this.fn = fn;
      this.context = context;
      this.once = once4 || false;
    }
    function addListener4(emitter, event, fn, context, once4) {
      if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function');
      }
      var listener = new EE(fn, context || emitter, once4),
        evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        (emitter._events[evt] = listener), emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter3() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter3.prototype.eventNames = function eventNames2() {
      var names = [],
        events,
        name;
      if (this._eventsCount === 0) return names;
      for (name in (events = this._events)) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter3.prototype.listeners = function listeners2(event) {
      var evt = prefix ? prefix + event : event,
        handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i2 = 0, l = handlers.length, ee = new Array(l); i2 < l; i2++) {
        ee[i2] = handlers[i2].fn;
      }
      return ee;
    };
    EventEmitter3.prototype.listenerCount = function listenerCount3(event) {
      var evt = prefix ? prefix + event : event,
        listeners2 = this._events[evt];
      if (!listeners2) return 0;
      if (listeners2.fn) return 1;
      return listeners2.length;
    };
    EventEmitter3.prototype.emit = function emit4(event, a1, a22, a32, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners2 = this._events[evt],
        len = arguments.length,
        args,
        i2;
      if (listeners2.fn) {
        if (listeners2.once)
          this.removeListener(event, listeners2.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners2.fn.call(listeners2.context), true;
          case 2:
            return listeners2.fn.call(listeners2.context, a1), true;
          case 3:
            return listeners2.fn.call(listeners2.context, a1, a22), true;
          case 4:
            return listeners2.fn.call(listeners2.context, a1, a22, a32), true;
          case 5:
            return (
              listeners2.fn.call(listeners2.context, a1, a22, a32, a4), true
            );
          case 6:
            return (
              listeners2.fn.call(listeners2.context, a1, a22, a32, a4, a5), true
            );
        }
        for (i2 = 1, args = new Array(len - 1); i2 < len; i2++) {
          args[i2 - 1] = arguments[i2];
        }
        listeners2.fn.apply(listeners2.context, args);
      } else {
        var length = listeners2.length,
          j;
        for (i2 = 0; i2 < length; i2++) {
          if (listeners2[i2].once)
            this.removeListener(event, listeners2[i2].fn, void 0, true);
          switch (len) {
            case 1:
              listeners2[i2].fn.call(listeners2[i2].context);
              break;
            case 2:
              listeners2[i2].fn.call(listeners2[i2].context, a1);
              break;
            case 3:
              listeners2[i2].fn.call(listeners2[i2].context, a1, a22);
              break;
            case 4:
              listeners2[i2].fn.call(listeners2[i2].context, a1, a22, a32);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners2[i2].fn.apply(listeners2[i2].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter3.prototype.on = function on3(event, fn, context) {
      return addListener4(this, event, fn, context, false);
    };
    EventEmitter3.prototype.once = function once4(event, fn, context) {
      return addListener4(this, event, fn, context, true);
    };
    EventEmitter3.prototype.removeListener = function removeListener4(
      event,
      fn,
      context,
      once4,
    ) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners2 = this._events[evt];
      if (listeners2.fn) {
        if (
          listeners2.fn === fn &&
          (!once4 || listeners2.once) &&
          (!context || listeners2.context === context)
        ) {
          clearEvent(this, evt);
        }
      } else {
        for (
          var i2 = 0, events = [], length = listeners2.length;
          i2 < length;
          i2++
        ) {
          if (
            listeners2[i2].fn !== fn ||
            (once4 && !listeners2[i2].once) ||
            (context && listeners2[i2].context !== context)
          ) {
            events.push(listeners2[i2]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter3.prototype.removeAllListeners = function removeAllListeners4(
      event,
    ) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
    EventEmitter3.prototype.addListener = EventEmitter3.prototype.on;
    EventEmitter3.prefixed = prefix;
    EventEmitter3.EventEmitter = EventEmitter3;
    if ('undefined' !== typeof module) {
      module.exports = EventEmitter3;
    }
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/guard.js
var require_guard = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/guard.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.IsValueType =
      exports.IsSymbol =
      exports.IsFunction =
      exports.IsString =
      exports.IsBigInt =
      exports.IsInteger =
      exports.IsNumber =
      exports.IsBoolean =
      exports.IsNull =
      exports.IsUndefined =
      exports.IsArray =
      exports.IsObject =
      exports.IsPlainObject =
      exports.HasPropertyKey =
      exports.IsDate =
      exports.IsUint8Array =
      exports.IsPromise =
      exports.IsTypedArray =
      exports.IsIterator =
      exports.IsAsyncIterator =
        void 0;
    function IsAsyncIterator(value) {
      return IsObject(value) && Symbol.asyncIterator in value;
    }
    exports.IsAsyncIterator = IsAsyncIterator;
    function IsIterator(value) {
      return IsObject(value) && Symbol.iterator in value;
    }
    exports.IsIterator = IsIterator;
    function IsTypedArray(value) {
      return ArrayBuffer.isView(value);
    }
    exports.IsTypedArray = IsTypedArray;
    function IsPromise(value) {
      return value instanceof Promise;
    }
    exports.IsPromise = IsPromise;
    function IsUint8Array(value) {
      return value instanceof Uint8Array;
    }
    exports.IsUint8Array = IsUint8Array;
    function IsDate(value) {
      return value instanceof Date && Number.isFinite(value.getTime());
    }
    exports.IsDate = IsDate;
    function HasPropertyKey(value, key) {
      return key in value;
    }
    exports.HasPropertyKey = HasPropertyKey;
    function IsPlainObject(value) {
      return (
        IsObject(value) &&
        IsFunction(value.constructor) &&
        value.constructor.name === 'Object'
      );
    }
    exports.IsPlainObject = IsPlainObject;
    function IsObject(value) {
      return value !== null && typeof value === 'object';
    }
    exports.IsObject = IsObject;
    function IsArray(value) {
      return Array.isArray(value) && !ArrayBuffer.isView(value);
    }
    exports.IsArray = IsArray;
    function IsUndefined(value) {
      return value === void 0;
    }
    exports.IsUndefined = IsUndefined;
    function IsNull(value) {
      return value === null;
    }
    exports.IsNull = IsNull;
    function IsBoolean(value) {
      return typeof value === 'boolean';
    }
    exports.IsBoolean = IsBoolean;
    function IsNumber(value) {
      return typeof value === 'number';
    }
    exports.IsNumber = IsNumber;
    function IsInteger(value) {
      return IsNumber(value) && Number.isInteger(value);
    }
    exports.IsInteger = IsInteger;
    function IsBigInt(value) {
      return typeof value === 'bigint';
    }
    exports.IsBigInt = IsBigInt;
    function IsString(value) {
      return typeof value === 'string';
    }
    exports.IsString = IsString;
    function IsFunction(value) {
      return typeof value === 'function';
    }
    exports.IsFunction = IsFunction;
    function IsSymbol(value) {
      return typeof value === 'symbol';
    }
    exports.IsSymbol = IsSymbol;
    function IsValueType(value) {
      return (
        IsBigInt(value) ||
        IsBoolean(value) ||
        IsNull(value) ||
        IsNumber(value) ||
        IsString(value) ||
        IsSymbol(value) ||
        IsUndefined(value)
      );
    }
    exports.IsValueType = IsValueType;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/typebox.js
var require_typebox = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/typebox.js'(exports) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Type =
      exports.JsonType =
      exports.JavaScriptTypeBuilder =
      exports.JsonTypeBuilder =
      exports.TypeBuilder =
      exports.TypeBuilderError =
      exports.TransformEncodeBuilder =
      exports.TransformDecodeBuilder =
      exports.TemplateLiteralDslParser =
      exports.TemplateLiteralGenerator =
      exports.TemplateLiteralGeneratorError =
      exports.TemplateLiteralFinite =
      exports.TemplateLiteralFiniteError =
      exports.TemplateLiteralParser =
      exports.TemplateLiteralParserError =
      exports.TemplateLiteralResolver =
      exports.TemplateLiteralPattern =
      exports.TemplateLiteralPatternError =
      exports.UnionResolver =
      exports.KeyArrayResolver =
      exports.KeyArrayResolverError =
      exports.KeyResolver =
      exports.ObjectMap =
      exports.Intrinsic =
      exports.IndexedAccessor =
      exports.TypeClone =
      exports.TypeExtends =
      exports.TypeExtendsResult =
      exports.TypeExtendsError =
      exports.ExtendsUndefined =
      exports.TypeGuard =
      exports.TypeGuardUnknownTypeError =
      exports.ValueGuard =
      exports.FormatRegistry =
      exports.TypeBoxError =
      exports.TypeRegistry =
      exports.PatternStringExact =
      exports.PatternNumberExact =
      exports.PatternBooleanExact =
      exports.PatternString =
      exports.PatternNumber =
      exports.PatternBoolean =
      exports.Kind =
      exports.Hint =
      exports.Optional =
      exports.Readonly =
      exports.Transform =
        void 0;
    exports.Transform = Symbol.for('TypeBox.Transform');
    exports.Readonly = Symbol.for('TypeBox.Readonly');
    exports.Optional = Symbol.for('TypeBox.Optional');
    exports.Hint = Symbol.for('TypeBox.Hint');
    exports.Kind = Symbol.for('TypeBox.Kind');
    exports.PatternBoolean = '(true|false)';
    exports.PatternNumber = '(0|[1-9][0-9]*)';
    exports.PatternString = '(.*)';
    exports.PatternBooleanExact = `^${exports.PatternBoolean}$`;
    exports.PatternNumberExact = `^${exports.PatternNumber}$`;
    exports.PatternStringExact = `^${exports.PatternString}$`;
    var TypeRegistry;
    (function (TypeRegistry2) {
      const map = /* @__PURE__ */ new Map();
      function Entries() {
        return new Map(map);
      }
      TypeRegistry2.Entries = Entries;
      function Clear() {
        return map.clear();
      }
      TypeRegistry2.Clear = Clear;
      function Delete(kind) {
        return map.delete(kind);
      }
      TypeRegistry2.Delete = Delete;
      function Has(kind) {
        return map.has(kind);
      }
      TypeRegistry2.Has = Has;
      function Set2(kind, func) {
        map.set(kind, func);
      }
      TypeRegistry2.Set = Set2;
      function Get(kind) {
        return map.get(kind);
      }
      TypeRegistry2.Get = Get;
    })(TypeRegistry || (exports.TypeRegistry = TypeRegistry = {}));
    var TypeBoxError = class extends Error {
      constructor(message) {
        super(message);
      }
    };
    exports.TypeBoxError = TypeBoxError;
    var FormatRegistry;
    (function (FormatRegistry2) {
      const map = /* @__PURE__ */ new Map();
      function Entries() {
        return new Map(map);
      }
      FormatRegistry2.Entries = Entries;
      function Clear() {
        return map.clear();
      }
      FormatRegistry2.Clear = Clear;
      function Delete(format2) {
        return map.delete(format2);
      }
      FormatRegistry2.Delete = Delete;
      function Has(format2) {
        return map.has(format2);
      }
      FormatRegistry2.Has = Has;
      function Set2(format2, func) {
        map.set(format2, func);
      }
      FormatRegistry2.Set = Set2;
      function Get(format2) {
        return map.get(format2);
      }
      FormatRegistry2.Get = Get;
    })(FormatRegistry || (exports.FormatRegistry = FormatRegistry = {}));
    var ValueGuard;
    (function (ValueGuard2) {
      function IsArray(value) {
        return Array.isArray(value);
      }
      ValueGuard2.IsArray = IsArray;
      function IsBigInt(value) {
        return typeof value === 'bigint';
      }
      ValueGuard2.IsBigInt = IsBigInt;
      function IsBoolean(value) {
        return typeof value === 'boolean';
      }
      ValueGuard2.IsBoolean = IsBoolean;
      function IsNull(value) {
        return value === null;
      }
      ValueGuard2.IsNull = IsNull;
      function IsNumber(value) {
        return typeof value === 'number';
      }
      ValueGuard2.IsNumber = IsNumber;
      function IsObject(value) {
        return typeof value === 'object' && value !== null;
      }
      ValueGuard2.IsObject = IsObject;
      function IsString(value) {
        return typeof value === 'string';
      }
      ValueGuard2.IsString = IsString;
      function IsUndefined(value) {
        return value === void 0;
      }
      ValueGuard2.IsUndefined = IsUndefined;
    })(ValueGuard || (exports.ValueGuard = ValueGuard = {}));
    var TypeGuardUnknownTypeError = class extends TypeBoxError {};
    exports.TypeGuardUnknownTypeError = TypeGuardUnknownTypeError;
    var TypeGuard;
    (function (TypeGuard2) {
      function IsPattern(value) {
        try {
          new RegExp(value);
          return true;
        } catch {
          return false;
        }
      }
      function IsControlCharacterFree(value) {
        if (!ValueGuard.IsString(value)) return false;
        for (let i2 = 0; i2 < value.length; i2++) {
          const code = value.charCodeAt(i2);
          if ((code >= 7 && code <= 13) || code === 27 || code === 127) {
            return false;
          }
        }
        return true;
      }
      function IsAdditionalProperties(value) {
        return IsOptionalBoolean(value) || TSchema(value);
      }
      function IsOptionalBigInt(value) {
        return ValueGuard.IsUndefined(value) || ValueGuard.IsBigInt(value);
      }
      function IsOptionalNumber(value) {
        return ValueGuard.IsUndefined(value) || ValueGuard.IsNumber(value);
      }
      function IsOptionalBoolean(value) {
        return ValueGuard.IsUndefined(value) || ValueGuard.IsBoolean(value);
      }
      function IsOptionalString(value) {
        return ValueGuard.IsUndefined(value) || ValueGuard.IsString(value);
      }
      function IsOptionalPattern(value) {
        return (
          ValueGuard.IsUndefined(value) ||
          (ValueGuard.IsString(value) &&
            IsControlCharacterFree(value) &&
            IsPattern(value))
        );
      }
      function IsOptionalFormat(value) {
        return (
          ValueGuard.IsUndefined(value) ||
          (ValueGuard.IsString(value) && IsControlCharacterFree(value))
        );
      }
      function IsOptionalSchema(value) {
        return ValueGuard.IsUndefined(value) || TSchema(value);
      }
      function TAny(schema) {
        return TKindOf(schema, 'Any') && IsOptionalString(schema.$id);
      }
      TypeGuard2.TAny = TAny;
      function TArray(schema) {
        return (
          TKindOf(schema, 'Array') &&
          schema.type === 'array' &&
          IsOptionalString(schema.$id) &&
          TSchema(schema.items) &&
          IsOptionalNumber(schema.minItems) &&
          IsOptionalNumber(schema.maxItems) &&
          IsOptionalBoolean(schema.uniqueItems) &&
          IsOptionalSchema(schema.contains) &&
          IsOptionalNumber(schema.minContains) &&
          IsOptionalNumber(schema.maxContains)
        );
      }
      TypeGuard2.TArray = TArray;
      function TAsyncIterator(schema) {
        return (
          TKindOf(schema, 'AsyncIterator') &&
          schema.type === 'AsyncIterator' &&
          IsOptionalString(schema.$id) &&
          TSchema(schema.items)
        );
      }
      TypeGuard2.TAsyncIterator = TAsyncIterator;
      function TBigInt(schema) {
        return (
          TKindOf(schema, 'BigInt') &&
          schema.type === 'bigint' &&
          IsOptionalString(schema.$id) &&
          IsOptionalBigInt(schema.exclusiveMaximum) &&
          IsOptionalBigInt(schema.exclusiveMinimum) &&
          IsOptionalBigInt(schema.maximum) &&
          IsOptionalBigInt(schema.minimum) &&
          IsOptionalBigInt(schema.multipleOf)
        );
      }
      TypeGuard2.TBigInt = TBigInt;
      function TBoolean(schema) {
        return (
          TKindOf(schema, 'Boolean') &&
          schema.type === 'boolean' &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TBoolean = TBoolean;
      function TConstructor(schema) {
        return (
          TKindOf(schema, 'Constructor') &&
          schema.type === 'Constructor' &&
          IsOptionalString(schema.$id) &&
          ValueGuard.IsArray(schema.parameters) &&
          schema.parameters.every((schema2) => TSchema(schema2)) &&
          TSchema(schema.returns)
        );
      }
      TypeGuard2.TConstructor = TConstructor;
      function TDate(schema) {
        return (
          TKindOf(schema, 'Date') &&
          schema.type === 'Date' &&
          IsOptionalString(schema.$id) &&
          IsOptionalNumber(schema.exclusiveMaximumTimestamp) &&
          IsOptionalNumber(schema.exclusiveMinimumTimestamp) &&
          IsOptionalNumber(schema.maximumTimestamp) &&
          IsOptionalNumber(schema.minimumTimestamp) &&
          IsOptionalNumber(schema.multipleOfTimestamp)
        );
      }
      TypeGuard2.TDate = TDate;
      function TFunction(schema) {
        return (
          TKindOf(schema, 'Function') &&
          schema.type === 'Function' &&
          IsOptionalString(schema.$id) &&
          ValueGuard.IsArray(schema.parameters) &&
          schema.parameters.every((schema2) => TSchema(schema2)) &&
          TSchema(schema.returns)
        );
      }
      TypeGuard2.TFunction = TFunction;
      function TInteger(schema) {
        return (
          TKindOf(schema, 'Integer') &&
          schema.type === 'integer' &&
          IsOptionalString(schema.$id) &&
          IsOptionalNumber(schema.exclusiveMaximum) &&
          IsOptionalNumber(schema.exclusiveMinimum) &&
          IsOptionalNumber(schema.maximum) &&
          IsOptionalNumber(schema.minimum) &&
          IsOptionalNumber(schema.multipleOf)
        );
      }
      TypeGuard2.TInteger = TInteger;
      function TIntersect(schema) {
        return (
          TKindOf(schema, 'Intersect') &&
          (ValueGuard.IsString(schema.type) && schema.type !== 'object'
            ? false
            : true) &&
          ValueGuard.IsArray(schema.allOf) &&
          schema.allOf.every(
            (schema2) => TSchema(schema2) && !TTransform(schema2),
          ) &&
          IsOptionalString(schema.type) &&
          (IsOptionalBoolean(schema.unevaluatedProperties) ||
            IsOptionalSchema(schema.unevaluatedProperties)) &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TIntersect = TIntersect;
      function TIterator(schema) {
        return (
          TKindOf(schema, 'Iterator') &&
          schema.type === 'Iterator' &&
          IsOptionalString(schema.$id) &&
          TSchema(schema.items)
        );
      }
      TypeGuard2.TIterator = TIterator;
      function TKindOf(schema, kind) {
        return TKind(schema) && schema[exports.Kind] === kind;
      }
      TypeGuard2.TKindOf = TKindOf;
      function TKind(schema) {
        return (
          ValueGuard.IsObject(schema) &&
          exports.Kind in schema &&
          ValueGuard.IsString(schema[exports.Kind])
        );
      }
      TypeGuard2.TKind = TKind;
      function TLiteralString(schema) {
        return TLiteral(schema) && ValueGuard.IsString(schema.const);
      }
      TypeGuard2.TLiteralString = TLiteralString;
      function TLiteralNumber(schema) {
        return TLiteral(schema) && ValueGuard.IsNumber(schema.const);
      }
      TypeGuard2.TLiteralNumber = TLiteralNumber;
      function TLiteralBoolean(schema) {
        return TLiteral(schema) && ValueGuard.IsBoolean(schema.const);
      }
      TypeGuard2.TLiteralBoolean = TLiteralBoolean;
      function TLiteral(schema) {
        return (
          TKindOf(schema, 'Literal') &&
          IsOptionalString(schema.$id) &&
          (ValueGuard.IsBoolean(schema.const) ||
            ValueGuard.IsNumber(schema.const) ||
            ValueGuard.IsString(schema.const))
        );
      }
      TypeGuard2.TLiteral = TLiteral;
      function TNever(schema) {
        return (
          TKindOf(schema, 'Never') &&
          ValueGuard.IsObject(schema.not) &&
          Object.getOwnPropertyNames(schema.not).length === 0
        );
      }
      TypeGuard2.TNever = TNever;
      function TNot(schema) {
        return TKindOf(schema, 'Not') && TSchema(schema.not);
      }
      TypeGuard2.TNot = TNot;
      function TNull(schema) {
        return (
          TKindOf(schema, 'Null') &&
          schema.type === 'null' &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TNull = TNull;
      function TNumber(schema) {
        return (
          TKindOf(schema, 'Number') &&
          schema.type === 'number' &&
          IsOptionalString(schema.$id) &&
          IsOptionalNumber(schema.exclusiveMaximum) &&
          IsOptionalNumber(schema.exclusiveMinimum) &&
          IsOptionalNumber(schema.maximum) &&
          IsOptionalNumber(schema.minimum) &&
          IsOptionalNumber(schema.multipleOf)
        );
      }
      TypeGuard2.TNumber = TNumber;
      function TObject(schema) {
        return (
          TKindOf(schema, 'Object') &&
          schema.type === 'object' &&
          IsOptionalString(schema.$id) &&
          ValueGuard.IsObject(schema.properties) &&
          IsAdditionalProperties(schema.additionalProperties) &&
          IsOptionalNumber(schema.minProperties) &&
          IsOptionalNumber(schema.maxProperties) &&
          Object.entries(schema.properties).every(
            ([key, schema2]) => IsControlCharacterFree(key) && TSchema(schema2),
          )
        );
      }
      TypeGuard2.TObject = TObject;
      function TPromise(schema) {
        return (
          TKindOf(schema, 'Promise') &&
          schema.type === 'Promise' &&
          IsOptionalString(schema.$id) &&
          TSchema(schema.item)
        );
      }
      TypeGuard2.TPromise = TPromise;
      function TRecord(schema) {
        return (
          TKindOf(schema, 'Record') &&
          schema.type === 'object' &&
          IsOptionalString(schema.$id) &&
          IsAdditionalProperties(schema.additionalProperties) &&
          ValueGuard.IsObject(schema.patternProperties) &&
          ((schema2) => {
            const keys2 = Object.getOwnPropertyNames(schema2.patternProperties);
            return (
              keys2.length === 1 &&
              IsPattern(keys2[0]) &&
              ValueGuard.IsObject(schema2.patternProperties) &&
              TSchema(schema2.patternProperties[keys2[0]])
            );
          })(schema)
        );
      }
      TypeGuard2.TRecord = TRecord;
      function TRecursive(schema) {
        return (
          ValueGuard.IsObject(schema) &&
          exports.Hint in schema &&
          schema[exports.Hint] === 'Recursive'
        );
      }
      TypeGuard2.TRecursive = TRecursive;
      function TRef(schema) {
        return (
          TKindOf(schema, 'Ref') &&
          IsOptionalString(schema.$id) &&
          ValueGuard.IsString(schema.$ref)
        );
      }
      TypeGuard2.TRef = TRef;
      function TString(schema) {
        return (
          TKindOf(schema, 'String') &&
          schema.type === 'string' &&
          IsOptionalString(schema.$id) &&
          IsOptionalNumber(schema.minLength) &&
          IsOptionalNumber(schema.maxLength) &&
          IsOptionalPattern(schema.pattern) &&
          IsOptionalFormat(schema.format)
        );
      }
      TypeGuard2.TString = TString;
      function TSymbol(schema) {
        return (
          TKindOf(schema, 'Symbol') &&
          schema.type === 'symbol' &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TSymbol = TSymbol;
      function TTemplateLiteral(schema) {
        return (
          TKindOf(schema, 'TemplateLiteral') &&
          schema.type === 'string' &&
          ValueGuard.IsString(schema.pattern) &&
          schema.pattern[0] === '^' &&
          schema.pattern[schema.pattern.length - 1] === '$'
        );
      }
      TypeGuard2.TTemplateLiteral = TTemplateLiteral;
      function TThis(schema) {
        return (
          TKindOf(schema, 'This') &&
          IsOptionalString(schema.$id) &&
          ValueGuard.IsString(schema.$ref)
        );
      }
      TypeGuard2.TThis = TThis;
      function TTransform(schema) {
        return ValueGuard.IsObject(schema) && exports.Transform in schema;
      }
      TypeGuard2.TTransform = TTransform;
      function TTuple(schema) {
        return (
          TKindOf(schema, 'Tuple') &&
          schema.type === 'array' &&
          IsOptionalString(schema.$id) &&
          ValueGuard.IsNumber(schema.minItems) &&
          ValueGuard.IsNumber(schema.maxItems) &&
          schema.minItems === schema.maxItems && // empty
          ((ValueGuard.IsUndefined(schema.items) &&
            ValueGuard.IsUndefined(schema.additionalItems) &&
            schema.minItems === 0) ||
            (ValueGuard.IsArray(schema.items) &&
              schema.items.every((schema2) => TSchema(schema2))))
        );
      }
      TypeGuard2.TTuple = TTuple;
      function TUndefined(schema) {
        return (
          TKindOf(schema, 'Undefined') &&
          schema.type === 'undefined' &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TUndefined = TUndefined;
      function TUnionLiteral(schema) {
        return (
          TUnion(schema) &&
          schema.anyOf.every(
            (schema2) => TLiteralString(schema2) || TLiteralNumber(schema2),
          )
        );
      }
      TypeGuard2.TUnionLiteral = TUnionLiteral;
      function TUnion(schema) {
        return (
          TKindOf(schema, 'Union') &&
          IsOptionalString(schema.$id) &&
          ValueGuard.IsObject(schema) &&
          ValueGuard.IsArray(schema.anyOf) &&
          schema.anyOf.every((schema2) => TSchema(schema2))
        );
      }
      TypeGuard2.TUnion = TUnion;
      function TUint8Array(schema) {
        return (
          TKindOf(schema, 'Uint8Array') &&
          schema.type === 'Uint8Array' &&
          IsOptionalString(schema.$id) &&
          IsOptionalNumber(schema.minByteLength) &&
          IsOptionalNumber(schema.maxByteLength)
        );
      }
      TypeGuard2.TUint8Array = TUint8Array;
      function TUnknown(schema) {
        return TKindOf(schema, 'Unknown') && IsOptionalString(schema.$id);
      }
      TypeGuard2.TUnknown = TUnknown;
      function TUnsafe(schema) {
        return TKindOf(schema, 'Unsafe');
      }
      TypeGuard2.TUnsafe = TUnsafe;
      function TVoid(schema) {
        return (
          TKindOf(schema, 'Void') &&
          schema.type === 'void' &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TVoid = TVoid;
      function TReadonly(schema) {
        return (
          ValueGuard.IsObject(schema) && schema[exports.Readonly] === 'Readonly'
        );
      }
      TypeGuard2.TReadonly = TReadonly;
      function TOptional(schema) {
        return (
          ValueGuard.IsObject(schema) && schema[exports.Optional] === 'Optional'
        );
      }
      TypeGuard2.TOptional = TOptional;
      function TSchema(schema) {
        return (
          ValueGuard.IsObject(schema) &&
          (TAny(schema) ||
            TArray(schema) ||
            TBoolean(schema) ||
            TBigInt(schema) ||
            TAsyncIterator(schema) ||
            TConstructor(schema) ||
            TDate(schema) ||
            TFunction(schema) ||
            TInteger(schema) ||
            TIntersect(schema) ||
            TIterator(schema) ||
            TLiteral(schema) ||
            TNever(schema) ||
            TNot(schema) ||
            TNull(schema) ||
            TNumber(schema) ||
            TObject(schema) ||
            TPromise(schema) ||
            TRecord(schema) ||
            TRef(schema) ||
            TString(schema) ||
            TSymbol(schema) ||
            TTemplateLiteral(schema) ||
            TThis(schema) ||
            TTuple(schema) ||
            TUndefined(schema) ||
            TUnion(schema) ||
            TUint8Array(schema) ||
            TUnknown(schema) ||
            TUnsafe(schema) ||
            TVoid(schema) ||
            (TKind(schema) && TypeRegistry.Has(schema[exports.Kind])))
        );
      }
      TypeGuard2.TSchema = TSchema;
    })(TypeGuard || (exports.TypeGuard = TypeGuard = {}));
    var ExtendsUndefined;
    (function (ExtendsUndefined2) {
      function Check(schema) {
        return schema[exports.Kind] === 'Intersect'
          ? schema.allOf.every((schema2) => Check(schema2))
          : schema[exports.Kind] === 'Union'
          ? schema.anyOf.some((schema2) => Check(schema2))
          : schema[exports.Kind] === 'Undefined'
          ? true
          : schema[exports.Kind] === 'Not'
          ? !Check(schema.not)
          : false;
      }
      ExtendsUndefined2.Check = Check;
    })(ExtendsUndefined || (exports.ExtendsUndefined = ExtendsUndefined = {}));
    var TypeExtendsError = class extends TypeBoxError {};
    exports.TypeExtendsError = TypeExtendsError;
    var TypeExtendsResult;
    (function (TypeExtendsResult2) {
      TypeExtendsResult2[(TypeExtendsResult2['Union'] = 0)] = 'Union';
      TypeExtendsResult2[(TypeExtendsResult2['True'] = 1)] = 'True';
      TypeExtendsResult2[(TypeExtendsResult2['False'] = 2)] = 'False';
    })(
      TypeExtendsResult || (exports.TypeExtendsResult = TypeExtendsResult = {}),
    );
    var TypeExtends;
    (function (TypeExtends2) {
      function IntoBooleanResult(result) {
        return result === TypeExtendsResult.False
          ? result
          : TypeExtendsResult.True;
      }
      function Throw(message) {
        throw new TypeExtendsError(message);
      }
      function IsStructuralRight(right) {
        return (
          TypeGuard.TNever(right) ||
          TypeGuard.TIntersect(right) ||
          TypeGuard.TUnion(right) ||
          TypeGuard.TUnknown(right) ||
          TypeGuard.TAny(right)
        );
      }
      function StructuralRight(left, right) {
        return TypeGuard.TNever(right)
          ? TNeverRight(left, right)
          : TypeGuard.TIntersect(right)
          ? TIntersectRight(left, right)
          : TypeGuard.TUnion(right)
          ? TUnionRight(left, right)
          : TypeGuard.TUnknown(right)
          ? TUnknownRight(left, right)
          : TypeGuard.TAny(right)
          ? TAnyRight(left, right)
          : Throw('StructuralRight');
      }
      function TAnyRight(left, right) {
        return TypeExtendsResult.True;
      }
      function TAny(left, right) {
        return TypeGuard.TIntersect(right)
          ? TIntersectRight(left, right)
          : TypeGuard.TUnion(right) &&
            right.anyOf.some(
              (schema) => TypeGuard.TAny(schema) || TypeGuard.TUnknown(schema),
            )
          ? TypeExtendsResult.True
          : TypeGuard.TUnion(right)
          ? TypeExtendsResult.Union
          : TypeGuard.TUnknown(right)
          ? TypeExtendsResult.True
          : TypeGuard.TAny(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.Union;
      }
      function TArrayRight(left, right) {
        return TypeGuard.TUnknown(left)
          ? TypeExtendsResult.False
          : TypeGuard.TAny(left)
          ? TypeExtendsResult.Union
          : TypeGuard.TNever(left)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TArray(left, right) {
        return TypeGuard.TObject(right) && IsObjectArrayLike(right)
          ? TypeExtendsResult.True
          : IsStructuralRight(right)
          ? StructuralRight(left, right)
          : !TypeGuard.TArray(right)
          ? TypeExtendsResult.False
          : IntoBooleanResult(Visit(left.items, right.items));
      }
      function TAsyncIterator(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : !TypeGuard.TAsyncIterator(right)
          ? TypeExtendsResult.False
          : IntoBooleanResult(Visit(left.items, right.items));
      }
      function TBigInt(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TRecord(right)
          ? TRecordRight(left, right)
          : TypeGuard.TBigInt(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TBooleanRight(left, right) {
        return TypeGuard.TLiteral(left) && ValueGuard.IsBoolean(left.const)
          ? TypeExtendsResult.True
          : TypeGuard.TBoolean(left)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TBoolean(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TRecord(right)
          ? TRecordRight(left, right)
          : TypeGuard.TBoolean(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TConstructor(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : !TypeGuard.TConstructor(right)
          ? TypeExtendsResult.False
          : left.parameters.length > right.parameters.length
          ? TypeExtendsResult.False
          : !left.parameters.every(
              (schema, index) =>
                IntoBooleanResult(Visit(right.parameters[index], schema)) ===
                TypeExtendsResult.True,
            )
          ? TypeExtendsResult.False
          : IntoBooleanResult(Visit(left.returns, right.returns));
      }
      function TDate(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TRecord(right)
          ? TRecordRight(left, right)
          : TypeGuard.TDate(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TFunction(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : !TypeGuard.TFunction(right)
          ? TypeExtendsResult.False
          : left.parameters.length > right.parameters.length
          ? TypeExtendsResult.False
          : !left.parameters.every(
              (schema, index) =>
                IntoBooleanResult(Visit(right.parameters[index], schema)) ===
                TypeExtendsResult.True,
            )
          ? TypeExtendsResult.False
          : IntoBooleanResult(Visit(left.returns, right.returns));
      }
      function TIntegerRight(left, right) {
        return TypeGuard.TLiteral(left) && ValueGuard.IsNumber(left.const)
          ? TypeExtendsResult.True
          : TypeGuard.TNumber(left) || TypeGuard.TInteger(left)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TInteger(left, right) {
        return TypeGuard.TInteger(right) || TypeGuard.TNumber(right)
          ? TypeExtendsResult.True
          : IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TRecord(right)
          ? TRecordRight(left, right)
          : TypeExtendsResult.False;
      }
      function TIntersectRight(left, right) {
        return right.allOf.every(
          (schema) => Visit(left, schema) === TypeExtendsResult.True,
        )
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TIntersect(left, right) {
        return left.allOf.some(
          (schema) => Visit(schema, right) === TypeExtendsResult.True,
        )
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TIterator(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : !TypeGuard.TIterator(right)
          ? TypeExtendsResult.False
          : IntoBooleanResult(Visit(left.items, right.items));
      }
      function TLiteral(left, right) {
        return TypeGuard.TLiteral(right) && right.const === left.const
          ? TypeExtendsResult.True
          : IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TRecord(right)
          ? TRecordRight(left, right)
          : TypeGuard.TString(right)
          ? TStringRight(left, right)
          : TypeGuard.TNumber(right)
          ? TNumberRight(left, right)
          : TypeGuard.TInteger(right)
          ? TIntegerRight(left, right)
          : TypeGuard.TBoolean(right)
          ? TBooleanRight(left, right)
          : TypeExtendsResult.False;
      }
      function TNeverRight(left, right) {
        return TypeExtendsResult.False;
      }
      function TNever(left, right) {
        return TypeExtendsResult.True;
      }
      function UnwrapTNot(schema) {
        let [current, depth] = [schema, 0];
        while (true) {
          if (!TypeGuard.TNot(current)) break;
          current = current.not;
          depth += 1;
        }
        return depth % 2 === 0 ? current : exports.Type.Unknown();
      }
      function TNot(left, right) {
        return TypeGuard.TNot(left)
          ? Visit(UnwrapTNot(left), right)
          : TypeGuard.TNot(right)
          ? Visit(left, UnwrapTNot(right))
          : Throw('Invalid fallthrough for Not');
      }
      function TNull(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TRecord(right)
          ? TRecordRight(left, right)
          : TypeGuard.TNull(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TNumberRight(left, right) {
        return TypeGuard.TLiteralNumber(left)
          ? TypeExtendsResult.True
          : TypeGuard.TNumber(left) || TypeGuard.TInteger(left)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TNumber(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TRecord(right)
          ? TRecordRight(left, right)
          : TypeGuard.TInteger(right) || TypeGuard.TNumber(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function IsObjectPropertyCount(schema, count) {
        return Object.getOwnPropertyNames(schema.properties).length === count;
      }
      function IsObjectStringLike(schema) {
        return IsObjectArrayLike(schema);
      }
      function IsObjectSymbolLike(schema) {
        return (
          IsObjectPropertyCount(schema, 0) ||
          (IsObjectPropertyCount(schema, 1) &&
            'description' in schema.properties &&
            TypeGuard.TUnion(schema.properties.description) &&
            schema.properties.description.anyOf.length === 2 &&
            ((TypeGuard.TString(schema.properties.description.anyOf[0]) &&
              TypeGuard.TUndefined(schema.properties.description.anyOf[1])) ||
              (TypeGuard.TString(schema.properties.description.anyOf[1]) &&
                TypeGuard.TUndefined(schema.properties.description.anyOf[0]))))
        );
      }
      function IsObjectNumberLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectBooleanLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectBigIntLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectDateLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectUint8ArrayLike(schema) {
        return IsObjectArrayLike(schema);
      }
      function IsObjectFunctionLike(schema) {
        const length = exports.Type.Number();
        return (
          IsObjectPropertyCount(schema, 0) ||
          (IsObjectPropertyCount(schema, 1) &&
            'length' in schema.properties &&
            IntoBooleanResult(Visit(schema.properties['length'], length)) ===
              TypeExtendsResult.True)
        );
      }
      function IsObjectConstructorLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectArrayLike(schema) {
        const length = exports.Type.Number();
        return (
          IsObjectPropertyCount(schema, 0) ||
          (IsObjectPropertyCount(schema, 1) &&
            'length' in schema.properties &&
            IntoBooleanResult(Visit(schema.properties['length'], length)) ===
              TypeExtendsResult.True)
        );
      }
      function IsObjectPromiseLike(schema) {
        const then = exports.Type.Function(
          [exports.Type.Any()],
          exports.Type.Any(),
        );
        return (
          IsObjectPropertyCount(schema, 0) ||
          (IsObjectPropertyCount(schema, 1) &&
            'then' in schema.properties &&
            IntoBooleanResult(Visit(schema.properties['then'], then)) ===
              TypeExtendsResult.True)
        );
      }
      function Property(left, right) {
        return Visit(left, right) === TypeExtendsResult.False
          ? TypeExtendsResult.False
          : TypeGuard.TOptional(left) && !TypeGuard.TOptional(right)
          ? TypeExtendsResult.False
          : TypeExtendsResult.True;
      }
      function TObjectRight(left, right) {
        return TypeGuard.TUnknown(left)
          ? TypeExtendsResult.False
          : TypeGuard.TAny(left)
          ? TypeExtendsResult.Union
          : TypeGuard.TNever(left) ||
            (TypeGuard.TLiteralString(left) && IsObjectStringLike(right)) ||
            (TypeGuard.TLiteralNumber(left) && IsObjectNumberLike(right)) ||
            (TypeGuard.TLiteralBoolean(left) && IsObjectBooleanLike(right)) ||
            (TypeGuard.TSymbol(left) && IsObjectSymbolLike(right)) ||
            (TypeGuard.TBigInt(left) && IsObjectBigIntLike(right)) ||
            (TypeGuard.TString(left) && IsObjectStringLike(right)) ||
            (TypeGuard.TSymbol(left) && IsObjectSymbolLike(right)) ||
            (TypeGuard.TNumber(left) && IsObjectNumberLike(right)) ||
            (TypeGuard.TInteger(left) && IsObjectNumberLike(right)) ||
            (TypeGuard.TBoolean(left) && IsObjectBooleanLike(right)) ||
            (TypeGuard.TUint8Array(left) && IsObjectUint8ArrayLike(right)) ||
            (TypeGuard.TDate(left) && IsObjectDateLike(right)) ||
            (TypeGuard.TConstructor(left) && IsObjectConstructorLike(right)) ||
            (TypeGuard.TFunction(left) && IsObjectFunctionLike(right))
          ? TypeExtendsResult.True
          : TypeGuard.TRecord(left) && TypeGuard.TString(RecordKey(left))
          ? (() => {
              return right[exports.Hint] === 'Record'
                ? TypeExtendsResult.True
                : TypeExtendsResult.False;
            })()
          : TypeGuard.TRecord(left) && TypeGuard.TNumber(RecordKey(left))
          ? (() => {
              return IsObjectPropertyCount(right, 0)
                ? TypeExtendsResult.True
                : TypeExtendsResult.False;
            })()
          : TypeExtendsResult.False;
      }
      function TObject(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TRecord(right)
          ? TRecordRight(left, right)
          : !TypeGuard.TObject(right)
          ? TypeExtendsResult.False
          : (() => {
              for (const key of Object.getOwnPropertyNames(right.properties)) {
                if (
                  !(key in left.properties) &&
                  !TypeGuard.TOptional(right.properties[key])
                ) {
                  return TypeExtendsResult.False;
                }
                if (TypeGuard.TOptional(right.properties[key])) {
                  return TypeExtendsResult.True;
                }
                if (
                  Property(left.properties[key], right.properties[key]) ===
                  TypeExtendsResult.False
                ) {
                  return TypeExtendsResult.False;
                }
              }
              return TypeExtendsResult.True;
            })();
      }
      function TPromise(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right) && IsObjectPromiseLike(right)
          ? TypeExtendsResult.True
          : !TypeGuard.TPromise(right)
          ? TypeExtendsResult.False
          : IntoBooleanResult(Visit(left.item, right.item));
      }
      function RecordKey(schema) {
        return exports.PatternNumberExact in schema.patternProperties
          ? exports.Type.Number()
          : exports.PatternStringExact in schema.patternProperties
          ? exports.Type.String()
          : Throw('Unknown record key pattern');
      }
      function RecordValue(schema) {
        return exports.PatternNumberExact in schema.patternProperties
          ? schema.patternProperties[exports.PatternNumberExact]
          : exports.PatternStringExact in schema.patternProperties
          ? schema.patternProperties[exports.PatternStringExact]
          : Throw('Unable to get record value schema');
      }
      function TRecordRight(left, right) {
        const [Key, Value] = [RecordKey(right), RecordValue(right)];
        return TypeGuard.TLiteralString(left) &&
          TypeGuard.TNumber(Key) &&
          IntoBooleanResult(Visit(left, Value)) === TypeExtendsResult.True
          ? TypeExtendsResult.True
          : TypeGuard.TUint8Array(left) && TypeGuard.TNumber(Key)
          ? Visit(left, Value)
          : TypeGuard.TString(left) && TypeGuard.TNumber(Key)
          ? Visit(left, Value)
          : TypeGuard.TArray(left) && TypeGuard.TNumber(Key)
          ? Visit(left, Value)
          : TypeGuard.TObject(left)
          ? (() => {
              for (const key of Object.getOwnPropertyNames(left.properties)) {
                if (
                  Property(Value, left.properties[key]) ===
                  TypeExtendsResult.False
                ) {
                  return TypeExtendsResult.False;
                }
              }
              return TypeExtendsResult.True;
            })()
          : TypeExtendsResult.False;
      }
      function TRecord(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : !TypeGuard.TRecord(right)
          ? TypeExtendsResult.False
          : Visit(RecordValue(left), RecordValue(right));
      }
      function TStringRight(left, right) {
        return TypeGuard.TLiteral(left) && ValueGuard.IsString(left.const)
          ? TypeExtendsResult.True
          : TypeGuard.TString(left)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TString(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TRecord(right)
          ? TRecordRight(left, right)
          : TypeGuard.TString(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TSymbol(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TRecord(right)
          ? TRecordRight(left, right)
          : TypeGuard.TSymbol(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TTemplateLiteral(left, right) {
        return TypeGuard.TTemplateLiteral(left)
          ? Visit(TemplateLiteralResolver.Resolve(left), right)
          : TypeGuard.TTemplateLiteral(right)
          ? Visit(left, TemplateLiteralResolver.Resolve(right))
          : Throw('Invalid fallthrough for TemplateLiteral');
      }
      function IsArrayOfTuple(left, right) {
        return (
          TypeGuard.TArray(right) &&
          left.items !== void 0 &&
          left.items.every(
            (schema) => Visit(schema, right.items) === TypeExtendsResult.True,
          )
        );
      }
      function TTupleRight(left, right) {
        return TypeGuard.TNever(left)
          ? TypeExtendsResult.True
          : TypeGuard.TUnknown(left)
          ? TypeExtendsResult.False
          : TypeGuard.TAny(left)
          ? TypeExtendsResult.Union
          : TypeExtendsResult.False;
      }
      function TTuple(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right) && IsObjectArrayLike(right)
          ? TypeExtendsResult.True
          : TypeGuard.TArray(right) && IsArrayOfTuple(left, right)
          ? TypeExtendsResult.True
          : !TypeGuard.TTuple(right)
          ? TypeExtendsResult.False
          : (ValueGuard.IsUndefined(left.items) &&
              !ValueGuard.IsUndefined(right.items)) ||
            (!ValueGuard.IsUndefined(left.items) &&
              ValueGuard.IsUndefined(right.items))
          ? TypeExtendsResult.False
          : ValueGuard.IsUndefined(left.items) &&
            !ValueGuard.IsUndefined(right.items)
          ? TypeExtendsResult.True
          : left.items.every(
              (schema, index) =>
                Visit(schema, right.items[index]) === TypeExtendsResult.True,
            )
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TUint8Array(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TRecord(right)
          ? TRecordRight(left, right)
          : TypeGuard.TUint8Array(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TUndefined(left, right) {
        return IsStructuralRight(right)
          ? StructuralRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TRecord(right)
          ? TRecordRight(left, right)
          : TypeGuard.TVoid(right)
          ? VoidRight(left, right)
          : TypeGuard.TUndefined(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TUnionRight(left, right) {
        return right.anyOf.some(
          (schema) => Visit(left, schema) === TypeExtendsResult.True,
        )
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TUnion(left, right) {
        return left.anyOf.every(
          (schema) => Visit(schema, right) === TypeExtendsResult.True,
        )
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TUnknownRight(left, right) {
        return TypeExtendsResult.True;
      }
      function TUnknown(left, right) {
        return TypeGuard.TNever(right)
          ? TNeverRight(left, right)
          : TypeGuard.TIntersect(right)
          ? TIntersectRight(left, right)
          : TypeGuard.TUnion(right)
          ? TUnionRight(left, right)
          : TypeGuard.TAny(right)
          ? TAnyRight(left, right)
          : TypeGuard.TString(right)
          ? TStringRight(left, right)
          : TypeGuard.TNumber(right)
          ? TNumberRight(left, right)
          : TypeGuard.TInteger(right)
          ? TIntegerRight(left, right)
          : TypeGuard.TBoolean(right)
          ? TBooleanRight(left, right)
          : TypeGuard.TArray(right)
          ? TArrayRight(left, right)
          : TypeGuard.TTuple(right)
          ? TTupleRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TUnknown(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function VoidRight(left, right) {
        return TypeGuard.TUndefined(left)
          ? TypeExtendsResult.True
          : TypeGuard.TUndefined(left)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TVoid(left, right) {
        return TypeGuard.TIntersect(right)
          ? TIntersectRight(left, right)
          : TypeGuard.TUnion(right)
          ? TUnionRight(left, right)
          : TypeGuard.TUnknown(right)
          ? TUnknownRight(left, right)
          : TypeGuard.TAny(right)
          ? TAnyRight(left, right)
          : TypeGuard.TObject(right)
          ? TObjectRight(left, right)
          : TypeGuard.TVoid(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Visit(left, right) {
        return (
          // resolvable
          TypeGuard.TTemplateLiteral(left) || TypeGuard.TTemplateLiteral(right)
            ? TTemplateLiteral(left, right)
            : TypeGuard.TNot(left) || TypeGuard.TNot(right)
            ? TNot(left, right)
            : // standard
            TypeGuard.TAny(left)
            ? TAny(left, right)
            : TypeGuard.TArray(left)
            ? TArray(left, right)
            : TypeGuard.TBigInt(left)
            ? TBigInt(left, right)
            : TypeGuard.TBoolean(left)
            ? TBoolean(left, right)
            : TypeGuard.TAsyncIterator(left)
            ? TAsyncIterator(left, right)
            : TypeGuard.TConstructor(left)
            ? TConstructor(left, right)
            : TypeGuard.TDate(left)
            ? TDate(left, right)
            : TypeGuard.TFunction(left)
            ? TFunction(left, right)
            : TypeGuard.TInteger(left)
            ? TInteger(left, right)
            : TypeGuard.TIntersect(left)
            ? TIntersect(left, right)
            : TypeGuard.TIterator(left)
            ? TIterator(left, right)
            : TypeGuard.TLiteral(left)
            ? TLiteral(left, right)
            : TypeGuard.TNever(left)
            ? TNever(left, right)
            : TypeGuard.TNull(left)
            ? TNull(left, right)
            : TypeGuard.TNumber(left)
            ? TNumber(left, right)
            : TypeGuard.TObject(left)
            ? TObject(left, right)
            : TypeGuard.TRecord(left)
            ? TRecord(left, right)
            : TypeGuard.TString(left)
            ? TString(left, right)
            : TypeGuard.TSymbol(left)
            ? TSymbol(left, right)
            : TypeGuard.TTuple(left)
            ? TTuple(left, right)
            : TypeGuard.TPromise(left)
            ? TPromise(left, right)
            : TypeGuard.TUint8Array(left)
            ? TUint8Array(left, right)
            : TypeGuard.TUndefined(left)
            ? TUndefined(left, right)
            : TypeGuard.TUnion(left)
            ? TUnion(left, right)
            : TypeGuard.TUnknown(left)
            ? TUnknown(left, right)
            : TypeGuard.TVoid(left)
            ? TVoid(left, right)
            : Throw(`Unknown left type operand '${left[exports.Kind]}'`)
        );
      }
      function Extends(left, right) {
        return Visit(left, right);
      }
      TypeExtends2.Extends = Extends;
    })(TypeExtends || (exports.TypeExtends = TypeExtends = {}));
    var TypeClone;
    (function (TypeClone2) {
      function ObjectType(value) {
        const clonedProperties = Object.getOwnPropertyNames(value).reduce(
          (acc, key) => ({ ...acc, [key]: Visit(value[key]) }),
          {},
        );
        const clonedSymbols = Object.getOwnPropertySymbols(value).reduce(
          (acc, key) => ({ ...acc, [key]: Visit(value[key]) }),
          {},
        );
        return { ...clonedProperties, ...clonedSymbols };
      }
      function ArrayType(value) {
        return value.map((value2) => Visit(value2));
      }
      function Visit(value) {
        return ValueGuard.IsArray(value)
          ? ArrayType(value)
          : ValueGuard.IsObject(value)
          ? ObjectType(value)
          : value;
      }
      function Rest(schemas) {
        return schemas.map((schema) => Type(schema));
      }
      TypeClone2.Rest = Rest;
      function Type(schema, options = {}) {
        return { ...Visit(schema), ...options };
      }
      TypeClone2.Type = Type;
    })(TypeClone || (exports.TypeClone = TypeClone = {}));
    var IndexedAccessor;
    (function (IndexedAccessor2) {
      function OptionalUnwrap(schema) {
        return schema.map((schema2) => {
          const { [exports.Optional]: _, ...clone } = TypeClone.Type(schema2);
          return clone;
        });
      }
      function IsIntersectOptional(schema) {
        return schema.every((schema2) => TypeGuard.TOptional(schema2));
      }
      function IsUnionOptional(schema) {
        return schema.some((schema2) => TypeGuard.TOptional(schema2));
      }
      function ResolveIntersect(schema) {
        return IsIntersectOptional(schema.allOf)
          ? exports.Type.Optional(
              exports.Type.Intersect(OptionalUnwrap(schema.allOf)),
            )
          : schema;
      }
      function ResolveUnion(schema) {
        return IsUnionOptional(schema.anyOf)
          ? exports.Type.Optional(
              exports.Type.Union(OptionalUnwrap(schema.anyOf)),
            )
          : schema;
      }
      function ResolveOptional(schema) {
        return schema[exports.Kind] === 'Intersect'
          ? ResolveIntersect(schema)
          : schema[exports.Kind] === 'Union'
          ? ResolveUnion(schema)
          : schema;
      }
      function TIntersect(schema, key) {
        const resolved = schema.allOf.reduce((acc, schema2) => {
          const indexed = Visit(schema2, key);
          return indexed[exports.Kind] === 'Never' ? acc : [...acc, indexed];
        }, []);
        return ResolveOptional(exports.Type.Intersect(resolved));
      }
      function TUnion(schema, key) {
        const resolved = schema.anyOf.map((schema2) => Visit(schema2, key));
        return ResolveOptional(exports.Type.Union(resolved));
      }
      function TObject(schema, key) {
        const property = schema.properties[key];
        return ValueGuard.IsUndefined(property)
          ? exports.Type.Never()
          : exports.Type.Union([property]);
      }
      function TTuple(schema, key) {
        const items = schema.items;
        if (ValueGuard.IsUndefined(items)) return exports.Type.Never();
        const element = items[key];
        if (ValueGuard.IsUndefined(element)) return exports.Type.Never();
        return element;
      }
      function Visit(schema, key) {
        return schema[exports.Kind] === 'Intersect'
          ? TIntersect(schema, key)
          : schema[exports.Kind] === 'Union'
          ? TUnion(schema, key)
          : schema[exports.Kind] === 'Object'
          ? TObject(schema, key)
          : schema[exports.Kind] === 'Tuple'
          ? TTuple(schema, key)
          : exports.Type.Never();
      }
      function Resolve(schema, keys2, options = {}) {
        const resolved = keys2.map((key) => Visit(schema, key.toString()));
        return ResolveOptional(exports.Type.Union(resolved, options));
      }
      IndexedAccessor2.Resolve = Resolve;
    })(IndexedAccessor || (exports.IndexedAccessor = IndexedAccessor = {}));
    var Intrinsic;
    (function (Intrinsic2) {
      function Uncapitalize(value) {
        const [first, rest] = [value.slice(0, 1), value.slice(1)];
        return `${first.toLowerCase()}${rest}`;
      }
      function Capitalize(value) {
        const [first, rest] = [value.slice(0, 1), value.slice(1)];
        return `${first.toUpperCase()}${rest}`;
      }
      function Uppercase(value) {
        return value.toUpperCase();
      }
      function Lowercase(value) {
        return value.toLowerCase();
      }
      function IntrinsicTemplateLiteral(schema, mode) {
        const expression = TemplateLiteralParser.ParseExact(schema.pattern);
        const finite = TemplateLiteralFinite.Check(expression);
        if (!finite)
          return { ...schema, pattern: IntrinsicLiteral(schema.pattern, mode) };
        const strings = [...TemplateLiteralGenerator.Generate(expression)];
        const literals = strings.map((value) => exports.Type.Literal(value));
        const mapped = IntrinsicRest(literals, mode);
        const union = exports.Type.Union(mapped);
        return exports.Type.TemplateLiteral([union]);
      }
      function IntrinsicLiteral(value, mode) {
        return typeof value === 'string'
          ? mode === 'Uncapitalize'
            ? Uncapitalize(value)
            : mode === 'Capitalize'
            ? Capitalize(value)
            : mode === 'Uppercase'
            ? Uppercase(value)
            : mode === 'Lowercase'
            ? Lowercase(value)
            : value
          : value.toString();
      }
      function IntrinsicRest(schema, mode) {
        if (schema.length === 0) return [];
        const [L, ...R] = schema;
        return [Map2(L, mode), ...IntrinsicRest(R, mode)];
      }
      function Visit(schema, mode) {
        return TypeGuard.TTemplateLiteral(schema)
          ? IntrinsicTemplateLiteral(schema, mode)
          : TypeGuard.TUnion(schema)
          ? exports.Type.Union(IntrinsicRest(schema.anyOf, mode))
          : TypeGuard.TLiteral(schema)
          ? exports.Type.Literal(IntrinsicLiteral(schema.const, mode))
          : schema;
      }
      function Map2(schema, mode) {
        return Visit(schema, mode);
      }
      Intrinsic2.Map = Map2;
    })(Intrinsic || (exports.Intrinsic = Intrinsic = {}));
    var ObjectMap;
    (function (ObjectMap2) {
      function TIntersect(schema, callback) {
        return exports.Type.Intersect(
          schema.allOf.map((inner) => Visit(inner, callback)),
          { ...schema },
        );
      }
      function TUnion(schema, callback) {
        return exports.Type.Union(
          schema.anyOf.map((inner) => Visit(inner, callback)),
          { ...schema },
        );
      }
      function TObject(schema, callback) {
        return callback(schema);
      }
      function Visit(schema, callback) {
        return schema[exports.Kind] === 'Intersect'
          ? TIntersect(schema, callback)
          : schema[exports.Kind] === 'Union'
          ? TUnion(schema, callback)
          : schema[exports.Kind] === 'Object'
          ? TObject(schema, callback)
          : schema;
      }
      function Map2(schema, callback, options) {
        return { ...Visit(TypeClone.Type(schema), callback), ...options };
      }
      ObjectMap2.Map = Map2;
    })(ObjectMap || (exports.ObjectMap = ObjectMap = {}));
    var KeyResolver;
    (function (KeyResolver2) {
      function UnwrapPattern(key) {
        return key[0] === '^' && key[key.length - 1] === '$'
          ? key.slice(1, key.length - 1)
          : key;
      }
      function TIntersect(schema, options) {
        return schema.allOf.reduce(
          (acc, schema2) => [...acc, ...Visit(schema2, options)],
          [],
        );
      }
      function TUnion(schema, options) {
        const sets = schema.anyOf.map((inner) => Visit(inner, options));
        return [
          ...sets.reduce(
            (set, outer) =>
              outer.map((key) =>
                sets.every((inner) => inner.includes(key)) ? set.add(key) : set,
              )[0],
            /* @__PURE__ */ new Set(),
          ),
        ];
      }
      function TObject(schema, options) {
        return Object.getOwnPropertyNames(schema.properties);
      }
      function TRecord(schema, options) {
        return options.includePatterns
          ? Object.getOwnPropertyNames(schema.patternProperties)
          : [];
      }
      function Visit(schema, options) {
        return TypeGuard.TIntersect(schema)
          ? TIntersect(schema, options)
          : TypeGuard.TUnion(schema)
          ? TUnion(schema, options)
          : TypeGuard.TObject(schema)
          ? TObject(schema, options)
          : TypeGuard.TRecord(schema)
          ? TRecord(schema, options)
          : [];
      }
      function ResolveKeys(schema, options) {
        return [...new Set(Visit(schema, options))];
      }
      KeyResolver2.ResolveKeys = ResolveKeys;
      function ResolvePattern(schema) {
        const keys2 = ResolveKeys(schema, { includePatterns: true });
        const pattern = keys2.map((key) => `(${UnwrapPattern(key)})`);
        return `^(${pattern.join('|')})$`;
      }
      KeyResolver2.ResolvePattern = ResolvePattern;
    })(KeyResolver || (exports.KeyResolver = KeyResolver = {}));
    var KeyArrayResolverError = class extends TypeBoxError {};
    exports.KeyArrayResolverError = KeyArrayResolverError;
    var KeyArrayResolver;
    (function (KeyArrayResolver2) {
      function Resolve(schema) {
        return Array.isArray(schema)
          ? schema
          : TypeGuard.TUnionLiteral(schema)
          ? schema.anyOf.map((schema2) => schema2.const.toString())
          : TypeGuard.TLiteral(schema)
          ? [schema.const]
          : TypeGuard.TTemplateLiteral(schema)
          ? (() => {
              const expression = TemplateLiteralParser.ParseExact(
                schema.pattern,
              );
              if (!TemplateLiteralFinite.Check(expression))
                throw new KeyArrayResolverError(
                  'Cannot resolve keys from infinite template expression',
                );
              return [...TemplateLiteralGenerator.Generate(expression)];
            })()
          : [];
      }
      KeyArrayResolver2.Resolve = Resolve;
    })(KeyArrayResolver || (exports.KeyArrayResolver = KeyArrayResolver = {}));
    var UnionResolver;
    (function (UnionResolver2) {
      function* TUnion(union) {
        for (const schema of union.anyOf) {
          if (schema[exports.Kind] === 'Union') {
            yield* TUnion(schema);
          } else {
            yield schema;
          }
        }
      }
      function Resolve(union) {
        return exports.Type.Union([...TUnion(union)], { ...union });
      }
      UnionResolver2.Resolve = Resolve;
    })(UnionResolver || (exports.UnionResolver = UnionResolver = {}));
    var TemplateLiteralPatternError = class extends TypeBoxError {};
    exports.TemplateLiteralPatternError = TemplateLiteralPatternError;
    var TemplateLiteralPattern;
    (function (TemplateLiteralPattern2) {
      function Throw(message) {
        throw new TemplateLiteralPatternError(message);
      }
      function Escape(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      function Visit(schema, acc) {
        return TypeGuard.TTemplateLiteral(schema)
          ? schema.pattern.slice(1, schema.pattern.length - 1)
          : TypeGuard.TUnion(schema)
          ? `(${schema.anyOf.map((schema2) => Visit(schema2, acc)).join('|')})`
          : TypeGuard.TNumber(schema)
          ? `${acc}${exports.PatternNumber}`
          : TypeGuard.TInteger(schema)
          ? `${acc}${exports.PatternNumber}`
          : TypeGuard.TBigInt(schema)
          ? `${acc}${exports.PatternNumber}`
          : TypeGuard.TString(schema)
          ? `${acc}${exports.PatternString}`
          : TypeGuard.TLiteral(schema)
          ? `${acc}${Escape(schema.const.toString())}`
          : TypeGuard.TBoolean(schema)
          ? `${acc}${exports.PatternBoolean}`
          : Throw(`Unexpected Kind '${schema[exports.Kind]}'`);
      }
      function Create(kinds) {
        return `^${kinds.map((schema) => Visit(schema, '')).join('')}$`;
      }
      TemplateLiteralPattern2.Create = Create;
    })(
      TemplateLiteralPattern ||
        (exports.TemplateLiteralPattern = TemplateLiteralPattern = {}),
    );
    var TemplateLiteralResolver;
    (function (TemplateLiteralResolver2) {
      function Resolve(template) {
        const expression = TemplateLiteralParser.ParseExact(template.pattern);
        if (!TemplateLiteralFinite.Check(expression))
          return exports.Type.String();
        const literals = [...TemplateLiteralGenerator.Generate(expression)].map(
          (value) => exports.Type.Literal(value),
        );
        return exports.Type.Union(literals);
      }
      TemplateLiteralResolver2.Resolve = Resolve;
    })(
      TemplateLiteralResolver ||
        (exports.TemplateLiteralResolver = TemplateLiteralResolver = {}),
    );
    var TemplateLiteralParserError = class extends TypeBoxError {};
    exports.TemplateLiteralParserError = TemplateLiteralParserError;
    var TemplateLiteralParser;
    (function (TemplateLiteralParser2) {
      function IsNonEscaped(pattern, index, char) {
        return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92;
      }
      function IsOpenParen(pattern, index) {
        return IsNonEscaped(pattern, index, '(');
      }
      function IsCloseParen(pattern, index) {
        return IsNonEscaped(pattern, index, ')');
      }
      function IsSeparator(pattern, index) {
        return IsNonEscaped(pattern, index, '|');
      }
      function IsGroup(pattern) {
        if (
          !(
            IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1)
          )
        )
          return false;
        let count = 0;
        for (let index = 0; index < pattern.length; index++) {
          if (IsOpenParen(pattern, index)) count += 1;
          if (IsCloseParen(pattern, index)) count -= 1;
          if (count === 0 && index !== pattern.length - 1) return false;
        }
        return true;
      }
      function InGroup(pattern) {
        return pattern.slice(1, pattern.length - 1);
      }
      function IsPrecedenceOr(pattern) {
        let count = 0;
        for (let index = 0; index < pattern.length; index++) {
          if (IsOpenParen(pattern, index)) count += 1;
          if (IsCloseParen(pattern, index)) count -= 1;
          if (IsSeparator(pattern, index) && count === 0) return true;
        }
        return false;
      }
      function IsPrecedenceAnd(pattern) {
        for (let index = 0; index < pattern.length; index++) {
          if (IsOpenParen(pattern, index)) return true;
        }
        return false;
      }
      function Or(pattern) {
        let [count, start] = [0, 0];
        const expressions = [];
        for (let index = 0; index < pattern.length; index++) {
          if (IsOpenParen(pattern, index)) count += 1;
          if (IsCloseParen(pattern, index)) count -= 1;
          if (IsSeparator(pattern, index) && count === 0) {
            const range2 = pattern.slice(start, index);
            if (range2.length > 0) expressions.push(Parse(range2));
            start = index + 1;
          }
        }
        const range = pattern.slice(start);
        if (range.length > 0) expressions.push(Parse(range));
        if (expressions.length === 0) return { type: 'const', const: '' };
        if (expressions.length === 1) return expressions[0];
        return { type: 'or', expr: expressions };
      }
      function And(pattern) {
        function Group(value, index) {
          if (!IsOpenParen(value, index))
            throw new TemplateLiteralParserError(
              `TemplateLiteralParser: Index must point to open parens`,
            );
          let count = 0;
          for (let scan = index; scan < value.length; scan++) {
            if (IsOpenParen(value, scan)) count += 1;
            if (IsCloseParen(value, scan)) count -= 1;
            if (count === 0) return [index, scan];
          }
          throw new TemplateLiteralParserError(
            `TemplateLiteralParser: Unclosed group parens in expression`,
          );
        }
        function Range(pattern2, index) {
          for (let scan = index; scan < pattern2.length; scan++) {
            if (IsOpenParen(pattern2, scan)) return [index, scan];
          }
          return [index, pattern2.length];
        }
        const expressions = [];
        for (let index = 0; index < pattern.length; index++) {
          if (IsOpenParen(pattern, index)) {
            const [start, end] = Group(pattern, index);
            const range = pattern.slice(start, end + 1);
            expressions.push(Parse(range));
            index = end;
          } else {
            const [start, end] = Range(pattern, index);
            const range = pattern.slice(start, end);
            if (range.length > 0) expressions.push(Parse(range));
            index = end - 1;
          }
        }
        return expressions.length === 0
          ? { type: 'const', const: '' }
          : expressions.length === 1
          ? expressions[0]
          : { type: 'and', expr: expressions };
      }
      function Parse(pattern) {
        return IsGroup(pattern)
          ? Parse(InGroup(pattern))
          : IsPrecedenceOr(pattern)
          ? Or(pattern)
          : IsPrecedenceAnd(pattern)
          ? And(pattern)
          : { type: 'const', const: pattern };
      }
      TemplateLiteralParser2.Parse = Parse;
      function ParseExact(pattern) {
        return Parse(pattern.slice(1, pattern.length - 1));
      }
      TemplateLiteralParser2.ParseExact = ParseExact;
    })(
      TemplateLiteralParser ||
        (exports.TemplateLiteralParser = TemplateLiteralParser = {}),
    );
    var TemplateLiteralFiniteError = class extends TypeBoxError {};
    exports.TemplateLiteralFiniteError = TemplateLiteralFiniteError;
    var TemplateLiteralFinite;
    (function (TemplateLiteralFinite2) {
      function Throw(message) {
        throw new TemplateLiteralFiniteError(message);
      }
      function IsNumber(expression) {
        return (
          expression.type === 'or' &&
          expression.expr.length === 2 &&
          expression.expr[0].type === 'const' &&
          expression.expr[0].const === '0' &&
          expression.expr[1].type === 'const' &&
          expression.expr[1].const === '[1-9][0-9]*'
        );
      }
      function IsBoolean(expression) {
        return (
          expression.type === 'or' &&
          expression.expr.length === 2 &&
          expression.expr[0].type === 'const' &&
          expression.expr[0].const === 'true' &&
          expression.expr[1].type === 'const' &&
          expression.expr[1].const === 'false'
        );
      }
      function IsString(expression) {
        return expression.type === 'const' && expression.const === '.*';
      }
      function Check(expression) {
        return IsBoolean(expression)
          ? true
          : IsNumber(expression) || IsString(expression)
          ? false
          : expression.type === 'and'
          ? expression.expr.every((expr) => Check(expr))
          : expression.type === 'or'
          ? expression.expr.every((expr) => Check(expr))
          : expression.type === 'const'
          ? true
          : Throw(`Unknown expression type`);
      }
      TemplateLiteralFinite2.Check = Check;
    })(
      TemplateLiteralFinite ||
        (exports.TemplateLiteralFinite = TemplateLiteralFinite = {}),
    );
    var TemplateLiteralGeneratorError = class extends TypeBoxError {};
    exports.TemplateLiteralGeneratorError = TemplateLiteralGeneratorError;
    var TemplateLiteralGenerator;
    (function (TemplateLiteralGenerator2) {
      function* Reduce(buffer) {
        if (buffer.length === 1) return yield* buffer[0];
        for (const left of buffer[0]) {
          for (const right of Reduce(buffer.slice(1))) {
            yield `${left}${right}`;
          }
        }
      }
      function* And(expression) {
        return yield* Reduce(
          expression.expr.map((expr) => [...Generate(expr)]),
        );
      }
      function* Or(expression) {
        for (const expr of expression.expr) yield* Generate(expr);
      }
      function* Const(expression) {
        return yield expression.const;
      }
      function* Generate(expression) {
        return expression.type === 'and'
          ? yield* And(expression)
          : expression.type === 'or'
          ? yield* Or(expression)
          : expression.type === 'const'
          ? yield* Const(expression)
          : (() => {
              throw new TemplateLiteralGeneratorError('Unknown expression');
            })();
      }
      TemplateLiteralGenerator2.Generate = Generate;
    })(
      TemplateLiteralGenerator ||
        (exports.TemplateLiteralGenerator = TemplateLiteralGenerator = {}),
    );
    var TemplateLiteralDslParser;
    (function (TemplateLiteralDslParser2) {
      function* ParseUnion(template) {
        const trim = template.trim().replace(/"|'/g, '');
        return trim === 'boolean'
          ? yield exports.Type.Boolean()
          : trim === 'number'
          ? yield exports.Type.Number()
          : trim === 'bigint'
          ? yield exports.Type.BigInt()
          : trim === 'string'
          ? yield exports.Type.String()
          : yield (() => {
              const literals = trim
                .split('|')
                .map((literal) => exports.Type.Literal(literal.trim()));
              return literals.length === 0
                ? exports.Type.Never()
                : literals.length === 1
                ? literals[0]
                : exports.Type.Union(literals);
            })();
      }
      function* ParseTerminal(template) {
        if (template[1] !== '{') {
          const L = exports.Type.Literal('$');
          const R = ParseLiteral(template.slice(1));
          return yield* [L, ...R];
        }
        for (let i2 = 2; i2 < template.length; i2++) {
          if (template[i2] === '}') {
            const L = ParseUnion(template.slice(2, i2));
            const R = ParseLiteral(template.slice(i2 + 1));
            return yield* [...L, ...R];
          }
        }
        yield exports.Type.Literal(template);
      }
      function* ParseLiteral(template) {
        for (let i2 = 0; i2 < template.length; i2++) {
          if (template[i2] === '$') {
            const L = exports.Type.Literal(template.slice(0, i2));
            const R = ParseTerminal(template.slice(i2));
            return yield* [L, ...R];
          }
        }
        yield exports.Type.Literal(template);
      }
      function Parse(template_dsl) {
        return [...ParseLiteral(template_dsl)];
      }
      TemplateLiteralDslParser2.Parse = Parse;
    })(
      TemplateLiteralDslParser ||
        (exports.TemplateLiteralDslParser = TemplateLiteralDslParser = {}),
    );
    var TransformDecodeBuilder = class {
      constructor(schema) {
        this.schema = schema;
      }
      Decode(decode) {
        return new TransformEncodeBuilder(this.schema, decode);
      }
    };
    exports.TransformDecodeBuilder = TransformDecodeBuilder;
    var TransformEncodeBuilder = class {
      constructor(schema, decode) {
        this.schema = schema;
        this.decode = decode;
      }
      Encode(encode) {
        const schema = TypeClone.Type(this.schema);
        return TypeGuard.TTransform(schema)
          ? (() => {
              const Encode = (value) =>
                schema[exports.Transform].Encode(encode(value));
              const Decode = (value) =>
                this.decode(schema[exports.Transform].Decode(value));
              const Codec = { Encode, Decode };
              return { ...schema, [exports.Transform]: Codec };
            })()
          : (() => {
              const Codec = { Decode: this.decode, Encode: encode };
              return { ...schema, [exports.Transform]: Codec };
            })();
      }
    };
    exports.TransformEncodeBuilder = TransformEncodeBuilder;
    var TypeOrdinal = 0;
    var TypeBuilderError = class extends TypeBoxError {};
    exports.TypeBuilderError = TypeBuilderError;
    var TypeBuilder = class {
      /** `[Internal]` Creates a schema without `static` and `params` types */
      Create(schema) {
        return schema;
      }
      /** `[Internal]` Throws a TypeBuilder error with the given message */
      Throw(message) {
        throw new TypeBuilderError(message);
      }
      /** `[Internal]` Discards property keys from the given record type */
      Discard(record, keys2) {
        return keys2.reduce((acc, key) => {
          const { [key]: _, ...rest } = acc;
          return rest;
        }, record);
      }
      /** `[Json]` Omits compositing symbols from this schema */
      Strict(schema) {
        return JSON.parse(JSON.stringify(schema));
      }
    };
    exports.TypeBuilder = TypeBuilder;
    var JsonTypeBuilder = class extends TypeBuilder {
      // ------------------------------------------------------------------------
      // Modifiers
      // ------------------------------------------------------------------------
      /** `[Json]` Creates a Readonly and Optional property */
      ReadonlyOptional(schema) {
        return this.Readonly(this.Optional(schema));
      }
      /** `[Json]` Creates a Readonly property */
      Readonly(schema) {
        return { ...TypeClone.Type(schema), [exports.Readonly]: 'Readonly' };
      }
      /** `[Json]` Creates an Optional property */
      Optional(schema) {
        return { ...TypeClone.Type(schema), [exports.Optional]: 'Optional' };
      }
      // ------------------------------------------------------------------------
      // Types
      // ------------------------------------------------------------------------
      /** `[Json]` Creates an Any type */
      Any(options = {}) {
        return this.Create({ ...options, [exports.Kind]: 'Any' });
      }
      /** `[Json]` Creates an Array type */
      Array(schema, options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Array',
          type: 'array',
          items: TypeClone.Type(schema),
        });
      }
      /** `[Json]` Creates a Boolean type */
      Boolean(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Boolean',
          type: 'boolean',
        });
      }
      /** `[Json]` Intrinsic function to Capitalize LiteralString types */
      Capitalize(schema, options = {}) {
        return {
          ...Intrinsic.Map(TypeClone.Type(schema), 'Capitalize'),
          ...options,
        };
      }
      /** `[Json]` Creates a Composite object type */
      Composite(objects, options) {
        const intersect = exports.Type.Intersect(objects, {});
        const keys2 = KeyResolver.ResolveKeys(intersect, {
          includePatterns: false,
        });
        const properties = keys2.reduce(
          (acc, key) => ({
            ...acc,
            [key]: exports.Type.Index(intersect, [key]),
          }),
          {},
        );
        return exports.Type.Object(properties, options);
      }
      /** `[Json]` Creates a Enum type */
      Enum(item, options = {}) {
        const values1 = Object.getOwnPropertyNames(item)
          .filter((key) => isNaN(key))
          .map((key) => item[key]);
        const values2 = [...new Set(values1)];
        const anyOf = values2.map((value) => exports.Type.Literal(value));
        return this.Union(anyOf, { ...options, [exports.Hint]: 'Enum' });
      }
      /** `[Json]` Creates a Conditional type */
      Extends(left, right, trueType, falseType, options = {}) {
        switch (TypeExtends.Extends(left, right)) {
          case TypeExtendsResult.Union:
            return this.Union([
              TypeClone.Type(trueType, options),
              TypeClone.Type(falseType, options),
            ]);
          case TypeExtendsResult.True:
            return TypeClone.Type(trueType, options);
          case TypeExtendsResult.False:
            return TypeClone.Type(falseType, options);
        }
      }
      /** `[Json]` Constructs a type by excluding from unionType all union members that are assignable to excludedMembers */
      Exclude(unionType, excludedMembers, options = {}) {
        return TypeGuard.TTemplateLiteral(unionType)
          ? this.Exclude(
              TemplateLiteralResolver.Resolve(unionType),
              excludedMembers,
              options,
            )
          : TypeGuard.TTemplateLiteral(excludedMembers)
          ? this.Exclude(
              unionType,
              TemplateLiteralResolver.Resolve(excludedMembers),
              options,
            )
          : TypeGuard.TUnion(unionType)
          ? (() => {
              const narrowed = unionType.anyOf.filter(
                (inner) =>
                  TypeExtends.Extends(inner, excludedMembers) ===
                  TypeExtendsResult.False,
              );
              return narrowed.length === 1
                ? TypeClone.Type(narrowed[0], options)
                : this.Union(narrowed, options);
            })()
          : TypeExtends.Extends(unionType, excludedMembers) !==
            TypeExtendsResult.False
          ? this.Never(options)
          : TypeClone.Type(unionType, options);
      }
      /** `[Json]` Constructs a type by extracting from type all union members that are assignable to union */
      Extract(type, union, options = {}) {
        return TypeGuard.TTemplateLiteral(type)
          ? this.Extract(TemplateLiteralResolver.Resolve(type), union, options)
          : TypeGuard.TTemplateLiteral(union)
          ? this.Extract(type, TemplateLiteralResolver.Resolve(union), options)
          : TypeGuard.TUnion(type)
          ? (() => {
              const narrowed = type.anyOf.filter(
                (inner) =>
                  TypeExtends.Extends(inner, union) !== TypeExtendsResult.False,
              );
              return narrowed.length === 1
                ? TypeClone.Type(narrowed[0], options)
                : this.Union(narrowed, options);
            })()
          : TypeExtends.Extends(type, union) !== TypeExtendsResult.False
          ? TypeClone.Type(type, options)
          : this.Never(options);
      }
      /** `[Json]` Returns an Indexed property type for the given keys */
      Index(schema, unresolved, options = {}) {
        return TypeGuard.TArray(schema) && TypeGuard.TNumber(unresolved)
          ? (() => {
              return TypeClone.Type(schema.items, options);
            })()
          : TypeGuard.TTuple(schema) && TypeGuard.TNumber(unresolved)
          ? (() => {
              const items = ValueGuard.IsUndefined(schema.items)
                ? []
                : schema.items;
              const cloned = items.map((schema2) => TypeClone.Type(schema2));
              return this.Union(cloned, options);
            })()
          : (() => {
              const keys2 = KeyArrayResolver.Resolve(unresolved);
              const clone = TypeClone.Type(schema);
              return IndexedAccessor.Resolve(clone, keys2, options);
            })();
      }
      /** `[Json]` Creates an Integer type */
      Integer(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Integer',
          type: 'integer',
        });
      }
      /** `[Json]` Creates an Intersect type */
      Intersect(allOf, options = {}) {
        if (allOf.length === 0) return exports.Type.Never();
        if (allOf.length === 1) return TypeClone.Type(allOf[0], options);
        if (allOf.some((schema) => TypeGuard.TTransform(schema)))
          this.Throw('Cannot intersect transform types');
        const objects = allOf.every((schema) => TypeGuard.TObject(schema));
        const cloned = TypeClone.Rest(allOf);
        const clonedUnevaluatedProperties = TypeGuard.TSchema(
          options.unevaluatedProperties,
        )
          ? {
              unevaluatedProperties: TypeClone.Type(
                options.unevaluatedProperties,
              ),
            }
          : {};
        return options.unevaluatedProperties === false ||
          TypeGuard.TSchema(options.unevaluatedProperties) ||
          objects
          ? this.Create({
              ...options,
              ...clonedUnevaluatedProperties,
              [exports.Kind]: 'Intersect',
              type: 'object',
              allOf: cloned,
            })
          : this.Create({
              ...options,
              ...clonedUnevaluatedProperties,
              [exports.Kind]: 'Intersect',
              allOf: cloned,
            });
      }
      /** `[Json]` Creates a KeyOf type */
      KeyOf(schema, options = {}) {
        return TypeGuard.TRecord(schema)
          ? (() => {
              const pattern = Object.getOwnPropertyNames(
                schema.patternProperties,
              )[0];
              return pattern === exports.PatternNumberExact
                ? this.Number(options)
                : pattern === exports.PatternStringExact
                ? this.String(options)
                : this.Throw(
                    'Unable to resolve key type from Record key pattern',
                  );
            })()
          : TypeGuard.TTuple(schema)
          ? (() => {
              const items = ValueGuard.IsUndefined(schema.items)
                ? []
                : schema.items;
              const literals = items.map((_, index) =>
                exports.Type.Literal(index.toString()),
              );
              return this.Union(literals, options);
            })()
          : TypeGuard.TArray(schema)
          ? (() => {
              return this.Number(options);
            })()
          : (() => {
              const keys2 = KeyResolver.ResolveKeys(schema, {
                includePatterns: false,
              });
              if (keys2.length === 0) return this.Never(options);
              const literals = keys2.map((key) => this.Literal(key));
              return this.Union(literals, options);
            })();
      }
      /** `[Json]` Creates a Literal type */
      Literal(value, options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Literal',
          const: value,
          type: typeof value,
        });
      }
      /** `[Json]` Intrinsic function to Lowercase LiteralString types */
      Lowercase(schema, options = {}) {
        return {
          ...Intrinsic.Map(TypeClone.Type(schema), 'Lowercase'),
          ...options,
        };
      }
      /** `[Json]` Creates a Never type */
      Never(options = {}) {
        return this.Create({ ...options, [exports.Kind]: 'Never', not: {} });
      }
      /** `[Json]` Creates a Not type */
      Not(schema, options) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Not',
          not: TypeClone.Type(schema),
        });
      }
      /** `[Json]` Creates a Null type */
      Null(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Null',
          type: 'null',
        });
      }
      /** `[Json]` Creates a Number type */
      Number(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Number',
          type: 'number',
        });
      }
      /** `[Json]` Creates an Object type */
      Object(properties, options = {}) {
        const propertyKeys = Object.getOwnPropertyNames(properties);
        const optionalKeys = propertyKeys.filter((key) =>
          TypeGuard.TOptional(properties[key]),
        );
        const requiredKeys = propertyKeys.filter(
          (name) => !optionalKeys.includes(name),
        );
        const clonedAdditionalProperties = TypeGuard.TSchema(
          options.additionalProperties,
        )
          ? {
              additionalProperties: TypeClone.Type(
                options.additionalProperties,
              ),
            }
          : {};
        const clonedProperties = propertyKeys.reduce(
          (acc, key) => ({ ...acc, [key]: TypeClone.Type(properties[key]) }),
          {},
        );
        return requiredKeys.length > 0
          ? this.Create({
              ...options,
              ...clonedAdditionalProperties,
              [exports.Kind]: 'Object',
              type: 'object',
              properties: clonedProperties,
              required: requiredKeys,
            })
          : this.Create({
              ...options,
              ...clonedAdditionalProperties,
              [exports.Kind]: 'Object',
              type: 'object',
              properties: clonedProperties,
            });
      }
      /** `[Json]` Constructs a type whose keys are omitted from the given type */
      Omit(schema, unresolved, options = {}) {
        const keys2 = KeyArrayResolver.Resolve(unresolved);
        return ObjectMap.Map(
          this.Discard(TypeClone.Type(schema), ['$id', exports.Transform]),
          (object) => {
            if (ValueGuard.IsArray(object.required)) {
              object.required = object.required.filter(
                (key) => !keys2.includes(key),
              );
              if (object.required.length === 0) delete object.required;
            }
            for (const key of Object.getOwnPropertyNames(object.properties)) {
              if (keys2.includes(key)) delete object.properties[key];
            }
            return this.Create(object);
          },
          options,
        );
      }
      /** `[Json]` Constructs a type where all properties are optional */
      Partial(schema, options = {}) {
        return ObjectMap.Map(
          this.Discard(TypeClone.Type(schema), ['$id', exports.Transform]),
          (object) => {
            const properties = Object.getOwnPropertyNames(
              object.properties,
            ).reduce((acc, key) => {
              return { ...acc, [key]: this.Optional(object.properties[key]) };
            }, {});
            return this.Object(
              properties,
              this.Discard(object, ['required']),
              /* object used as options to retain other constraints */
            );
          },
          options,
        );
      }
      /** `[Json]` Constructs a type whose keys are picked from the given type */
      Pick(schema, unresolved, options = {}) {
        const keys2 = KeyArrayResolver.Resolve(unresolved);
        return ObjectMap.Map(
          this.Discard(TypeClone.Type(schema), ['$id', exports.Transform]),
          (object) => {
            if (ValueGuard.IsArray(object.required)) {
              object.required = object.required.filter((key) =>
                keys2.includes(key),
              );
              if (object.required.length === 0) delete object.required;
            }
            for (const key of Object.getOwnPropertyNames(object.properties)) {
              if (!keys2.includes(key)) delete object.properties[key];
            }
            return this.Create(object);
          },
          options,
        );
      }
      /** `[Json]` Creates a Record type */
      Record(key, schema, options = {}) {
        return TypeGuard.TTemplateLiteral(key)
          ? (() => {
              const expression = TemplateLiteralParser.ParseExact(key.pattern);
              return TemplateLiteralFinite.Check(expression)
                ? this.Object(
                    [...TemplateLiteralGenerator.Generate(expression)].reduce(
                      (acc, key2) => ({
                        ...acc,
                        [key2]: TypeClone.Type(schema),
                      }),
                      {},
                    ),
                    options,
                  )
                : this.Create({
                    ...options,
                    [exports.Kind]: 'Record',
                    type: 'object',
                    patternProperties: {
                      [key.pattern]: TypeClone.Type(schema),
                    },
                  });
            })()
          : TypeGuard.TUnion(key)
          ? (() => {
              const union = UnionResolver.Resolve(key);
              if (TypeGuard.TUnionLiteral(union)) {
                const properties = union.anyOf.reduce(
                  (acc, literal) => ({
                    ...acc,
                    [literal.const]: TypeClone.Type(schema),
                  }),
                  {},
                );
                return this.Object(properties, {
                  ...options,
                  [exports.Hint]: 'Record',
                });
              } else
                this.Throw(
                  'Record key of type union contains non-literal types',
                );
            })()
          : TypeGuard.TLiteral(key)
          ? (() => {
              return ValueGuard.IsString(key.const) ||
                ValueGuard.IsNumber(key.const)
                ? this.Object({ [key.const]: TypeClone.Type(schema) }, options)
                : this.Throw(
                    'Record key of type literal is not of type string or number',
                  );
            })()
          : TypeGuard.TInteger(key) || TypeGuard.TNumber(key)
          ? (() => {
              return this.Create({
                ...options,
                [exports.Kind]: 'Record',
                type: 'object',
                patternProperties: {
                  [exports.PatternNumberExact]: TypeClone.Type(schema),
                },
              });
            })()
          : TypeGuard.TString(key)
          ? (() => {
              const pattern = ValueGuard.IsUndefined(key.pattern)
                ? exports.PatternStringExact
                : key.pattern;
              return this.Create({
                ...options,
                [exports.Kind]: 'Record',
                type: 'object',
                patternProperties: { [pattern]: TypeClone.Type(schema) },
              });
            })()
          : this.Never();
      }
      /** `[Json]` Creates a Recursive type */
      Recursive(callback, options = {}) {
        if (ValueGuard.IsUndefined(options.$id))
          options.$id = `T${TypeOrdinal++}`;
        const thisType = callback({
          [exports.Kind]: 'This',
          $ref: `${options.$id}`,
        });
        thisType.$id = options.$id;
        return this.Create({
          ...options,
          [exports.Hint]: 'Recursive',
          ...thisType,
        });
      }
      /** `[Json]` Creates a Ref type. */
      Ref(unresolved, options = {}) {
        if (ValueGuard.IsString(unresolved))
          return this.Create({
            ...options,
            [exports.Kind]: 'Ref',
            $ref: unresolved,
          });
        if (ValueGuard.IsUndefined(unresolved.$id))
          this.Throw('Reference target type must specify an $id');
        return this.Create({
          ...options,
          [exports.Kind]: 'Ref',
          $ref: unresolved.$id,
        });
      }
      /** `[Json]` Constructs a type where all properties are required */
      Required(schema, options = {}) {
        return ObjectMap.Map(
          this.Discard(TypeClone.Type(schema), ['$id', exports.Transform]),
          (object) => {
            const properties = Object.getOwnPropertyNames(
              object.properties,
            ).reduce((acc, key) => {
              return {
                ...acc,
                [key]: this.Discard(object.properties[key], [exports.Optional]),
              };
            }, {});
            return this.Object(
              properties,
              object,
              /* object used as options to retain other constraints  */
            );
          },
          options,
        );
      }
      /** `[Json]` Extracts interior Rest elements from Tuple, Intersect and Union types */
      Rest(schema) {
        return TypeGuard.TTuple(schema) && !ValueGuard.IsUndefined(schema.items)
          ? TypeClone.Rest(schema.items)
          : TypeGuard.TIntersect(schema)
          ? TypeClone.Rest(schema.allOf)
          : TypeGuard.TUnion(schema)
          ? TypeClone.Rest(schema.anyOf)
          : [];
      }
      /** `[Json]` Creates a String type */
      String(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'String',
          type: 'string',
        });
      }
      /** `[Json]` Creates a TemplateLiteral type */
      TemplateLiteral(unresolved, options = {}) {
        const pattern = ValueGuard.IsString(unresolved)
          ? TemplateLiteralPattern.Create(
              TemplateLiteralDslParser.Parse(unresolved),
            )
          : TemplateLiteralPattern.Create(unresolved);
        return this.Create({
          ...options,
          [exports.Kind]: 'TemplateLiteral',
          type: 'string',
          pattern,
        });
      }
      /** `[Json]` Creates a Transform type */
      Transform(schema) {
        return new TransformDecodeBuilder(schema);
      }
      /** `[Json]` Creates a Tuple type */
      Tuple(items, options = {}) {
        const [additionalItems, minItems, maxItems] = [
          false,
          items.length,
          items.length,
        ];
        const clonedItems = TypeClone.Rest(items);
        const schema =
          items.length > 0
            ? {
                ...options,
                [exports.Kind]: 'Tuple',
                type: 'array',
                items: clonedItems,
                additionalItems,
                minItems,
                maxItems,
              }
            : {
                ...options,
                [exports.Kind]: 'Tuple',
                type: 'array',
                minItems,
                maxItems,
              };
        return this.Create(schema);
      }
      /** `[Json]` Intrinsic function to Uncapitalize LiteralString types */
      Uncapitalize(schema, options = {}) {
        return {
          ...Intrinsic.Map(TypeClone.Type(schema), 'Uncapitalize'),
          ...options,
        };
      }
      /** `[Json]` Creates a Union type */
      Union(union, options = {}) {
        return TypeGuard.TTemplateLiteral(union)
          ? TemplateLiteralResolver.Resolve(union)
          : (() => {
              const anyOf = union;
              if (anyOf.length === 0) return this.Never(options);
              if (anyOf.length === 1)
                return this.Create(TypeClone.Type(anyOf[0], options));
              const clonedAnyOf = TypeClone.Rest(anyOf);
              return this.Create({
                ...options,
                [exports.Kind]: 'Union',
                anyOf: clonedAnyOf,
              });
            })();
      }
      /** `[Json]` Creates an Unknown type */
      Unknown(options = {}) {
        return this.Create({ ...options, [exports.Kind]: 'Unknown' });
      }
      /** `[Json]` Creates a Unsafe type that will infers as the generic argument T */
      Unsafe(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: options[exports.Kind] || 'Unsafe',
        });
      }
      /** `[Json]` Intrinsic function to Uppercase LiteralString types */
      Uppercase(schema, options = {}) {
        return {
          ...Intrinsic.Map(TypeClone.Type(schema), 'Uppercase'),
          ...options,
        };
      }
    };
    exports.JsonTypeBuilder = JsonTypeBuilder;
    var JavaScriptTypeBuilder = class extends JsonTypeBuilder {
      /** `[JavaScript]` Creates a AsyncIterator type */
      AsyncIterator(items, options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'AsyncIterator',
          type: 'AsyncIterator',
          items: TypeClone.Type(items),
        });
      }
      /** `[JavaScript]` Constructs a type by recursively unwrapping Promise types */
      Awaited(schema, options = {}) {
        const Unwrap = (rest) =>
          rest.length > 0
            ? (() => {
                const [L, ...R] = rest;
                return [this.Awaited(L), ...Unwrap(R)];
              })()
            : rest;
        return TypeGuard.TIntersect(schema)
          ? exports.Type.Intersect(Unwrap(schema.allOf))
          : TypeGuard.TUnion(schema)
          ? exports.Type.Union(Unwrap(schema.anyOf))
          : TypeGuard.TPromise(schema)
          ? this.Awaited(schema.item)
          : TypeClone.Type(schema, options);
      }
      /** `[JavaScript]` Creates a BigInt type */
      BigInt(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'BigInt',
          type: 'bigint',
        });
      }
      /** `[JavaScript]` Extracts the ConstructorParameters from the given Constructor type */
      ConstructorParameters(schema, options = {}) {
        return this.Tuple([...schema.parameters], { ...options });
      }
      /** `[JavaScript]` Creates a Constructor type */
      Constructor(parameters, returns, options) {
        const [clonedParameters, clonedReturns] = [
          TypeClone.Rest(parameters),
          TypeClone.Type(returns),
        ];
        return this.Create({
          ...options,
          [exports.Kind]: 'Constructor',
          type: 'Constructor',
          parameters: clonedParameters,
          returns: clonedReturns,
        });
      }
      /** `[JavaScript]` Creates a Date type */
      Date(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Date',
          type: 'Date',
        });
      }
      /** `[JavaScript]` Creates a Function type */
      Function(parameters, returns, options) {
        const [clonedParameters, clonedReturns] = [
          TypeClone.Rest(parameters),
          TypeClone.Type(returns),
        ];
        return this.Create({
          ...options,
          [exports.Kind]: 'Function',
          type: 'Function',
          parameters: clonedParameters,
          returns: clonedReturns,
        });
      }
      /** `[JavaScript]` Extracts the InstanceType from the given Constructor type */
      InstanceType(schema, options = {}) {
        return TypeClone.Type(schema.returns, options);
      }
      /** `[JavaScript]` Creates an Iterator type */
      Iterator(items, options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Iterator',
          type: 'Iterator',
          items: TypeClone.Type(items),
        });
      }
      /** `[JavaScript]` Extracts the Parameters from the given Function type */
      Parameters(schema, options = {}) {
        return this.Tuple(schema.parameters, { ...options });
      }
      /** `[JavaScript]` Creates a Promise type */
      Promise(item, options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Promise',
          type: 'Promise',
          item: TypeClone.Type(item),
        });
      }
      /** `[Extended]` Creates a String type */
      RegExp(unresolved, options = {}) {
        const pattern = ValueGuard.IsString(unresolved)
          ? unresolved
          : unresolved.source;
        return this.Create({
          ...options,
          [exports.Kind]: 'String',
          type: 'string',
          pattern,
        });
      }
      /**
       * @deprecated Use `Type.RegExp`
       */
      RegEx(regex, options = {}) {
        return this.RegExp(regex, options);
      }
      /** `[JavaScript]` Extracts the ReturnType from the given Function type */
      ReturnType(schema, options = {}) {
        return TypeClone.Type(schema.returns, options);
      }
      /** `[JavaScript]` Creates a Symbol type */
      Symbol(options) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Symbol',
          type: 'symbol',
        });
      }
      /** `[JavaScript]` Creates a Undefined type */
      Undefined(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Undefined',
          type: 'undefined',
        });
      }
      /** `[JavaScript]` Creates a Uint8Array type */
      Uint8Array(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Uint8Array',
          type: 'Uint8Array',
        });
      }
      /** `[JavaScript]` Creates a Void type */
      Void(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Void',
          type: 'void',
        });
      }
    };
    exports.JavaScriptTypeBuilder = JavaScriptTypeBuilder;
    exports.JsonType = new JsonTypeBuilder();
    exports.Type = new JavaScriptTypeBuilder();
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/system/system.js
var require_system = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/system/system.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.DefaultErrorFunction =
      exports.TypeSystemPolicy =
      exports.TypeSystemErrorFunction =
      exports.TypeSystem =
      exports.TypeSystemDuplicateFormat =
      exports.TypeSystemDuplicateTypeKind =
        void 0;
    var guard_1 = require_guard();
    var errors_1 = require_errors();
    var Types = require_typebox();
    var TypeSystemDuplicateTypeKind = class extends Types.TypeBoxError {
      constructor(kind) {
        super(`Duplicate type kind '${kind}' detected`);
      }
    };
    exports.TypeSystemDuplicateTypeKind = TypeSystemDuplicateTypeKind;
    var TypeSystemDuplicateFormat = class extends Types.TypeBoxError {
      constructor(kind) {
        super(`Duplicate string format '${kind}' detected`);
      }
    };
    exports.TypeSystemDuplicateFormat = TypeSystemDuplicateFormat;
    var TypeSystem;
    (function (TypeSystem2) {
      function Type(kind, check) {
        if (Types.TypeRegistry.Has(kind))
          throw new TypeSystemDuplicateTypeKind(kind);
        Types.TypeRegistry.Set(kind, check);
        return (options = {}) =>
          Types.Type.Unsafe({ ...options, [Types.Kind]: kind });
      }
      TypeSystem2.Type = Type;
      function Format(format2, check) {
        if (Types.FormatRegistry.Has(format2))
          throw new TypeSystemDuplicateFormat(format2);
        Types.FormatRegistry.Set(format2, check);
        return format2;
      }
      TypeSystem2.Format = Format;
    })(TypeSystem || (exports.TypeSystem = TypeSystem = {}));
    var TypeSystemErrorFunction;
    (function (TypeSystemErrorFunction2) {
      let errorMessageFunction = DefaultErrorFunction;
      function Reset() {
        errorMessageFunction = DefaultErrorFunction;
      }
      TypeSystemErrorFunction2.Reset = Reset;
      function Set2(callback) {
        errorMessageFunction = callback;
      }
      TypeSystemErrorFunction2.Set = Set2;
      function Get() {
        return errorMessageFunction;
      }
      TypeSystemErrorFunction2.Get = Get;
    })(
      TypeSystemErrorFunction ||
        (exports.TypeSystemErrorFunction = TypeSystemErrorFunction = {}),
    );
    var TypeSystemPolicy;
    (function (TypeSystemPolicy2) {
      TypeSystemPolicy2.ExactOptionalPropertyTypes = false;
      TypeSystemPolicy2.AllowArrayObject = false;
      TypeSystemPolicy2.AllowNaN = false;
      TypeSystemPolicy2.AllowNullVoid = false;
      function IsExactOptionalProperty(value, key) {
        return TypeSystemPolicy2.ExactOptionalPropertyTypes
          ? key in value
          : value[key] !== void 0;
      }
      TypeSystemPolicy2.IsExactOptionalProperty = IsExactOptionalProperty;
      function IsObjectLike(value) {
        const isObject3 = (0, guard_1.IsObject)(value);
        return TypeSystemPolicy2.AllowArrayObject
          ? isObject3
          : isObject3 && !(0, guard_1.IsArray)(value);
      }
      TypeSystemPolicy2.IsObjectLike = IsObjectLike;
      function IsRecordLike(value) {
        return (
          IsObjectLike(value) &&
          !(value instanceof Date) &&
          !(value instanceof Uint8Array)
        );
      }
      TypeSystemPolicy2.IsRecordLike = IsRecordLike;
      function IsNumberLike(value) {
        const isNumber2 = (0, guard_1.IsNumber)(value);
        return TypeSystemPolicy2.AllowNaN
          ? isNumber2
          : isNumber2 && Number.isFinite(value);
      }
      TypeSystemPolicy2.IsNumberLike = IsNumberLike;
      function IsVoidLike(value) {
        const isUndefined2 = (0, guard_1.IsUndefined)(value);
        return TypeSystemPolicy2.AllowNullVoid
          ? isUndefined2 || value === null
          : isUndefined2;
      }
      TypeSystemPolicy2.IsVoidLike = IsVoidLike;
    })(TypeSystemPolicy || (exports.TypeSystemPolicy = TypeSystemPolicy = {}));
    function DefaultErrorFunction(schema, errorType) {
      switch (errorType) {
        case errors_1.ValueErrorType.ArrayContains:
          return 'Expected array to contain at least one matching value';
        case errors_1.ValueErrorType.ArrayMaxContains:
          return `Expected array to contain no more than ${schema.maxContains} matching values`;
        case errors_1.ValueErrorType.ArrayMinContains:
          return `Expected array to contain at least ${schema.minContains} matching values`;
        case errors_1.ValueErrorType.ArrayMaxItems:
          return `Expected array length to be less or equal to ${schema.maxItems}`;
        case errors_1.ValueErrorType.ArrayMinItems:
          return `Expected array length to be greater or equal to ${schema.minItems}`;
        case errors_1.ValueErrorType.ArrayUniqueItems:
          return 'Expected array elements to be unique';
        case errors_1.ValueErrorType.Array:
          return 'Expected array';
        case errors_1.ValueErrorType.AsyncIterator:
          return 'Expected AsyncIterator';
        case errors_1.ValueErrorType.BigIntExclusiveMaximum:
          return `Expected bigint to be less than ${schema.exclusiveMaximum}`;
        case errors_1.ValueErrorType.BigIntExclusiveMinimum:
          return `Expected bigint to be greater than ${schema.exclusiveMinimum}`;
        case errors_1.ValueErrorType.BigIntMaximum:
          return `Expected bigint to be less or equal to ${schema.maximum}`;
        case errors_1.ValueErrorType.BigIntMinimum:
          return `Expected bigint to be greater or equal to ${schema.minimum}`;
        case errors_1.ValueErrorType.BigIntMultipleOf:
          return `Expected bigint to be a multiple of ${schema.multipleOf}`;
        case errors_1.ValueErrorType.BigInt:
          return 'Expected bigint';
        case errors_1.ValueErrorType.Boolean:
          return 'Expected boolean';
        case errors_1.ValueErrorType.DateExclusiveMinimumTimestamp:
          return `Expected Date timestamp to be greater than ${schema.exclusiveMinimumTimestamp}`;
        case errors_1.ValueErrorType.DateExclusiveMaximumTimestamp:
          return `Expected Date timestamp to be less than ${schema.exclusiveMaximumTimestamp}`;
        case errors_1.ValueErrorType.DateMinimumTimestamp:
          return `Expected Date timestamp to be greater or equal to ${schema.minimumTimestamp}`;
        case errors_1.ValueErrorType.DateMaximumTimestamp:
          return `Expected Date timestamp to be less or equal to ${schema.maximumTimestamp}`;
        case errors_1.ValueErrorType.DateMultipleOfTimestamp:
          return `Expected Date timestamp to be a multiple of ${schema.multipleOfTimestamp}`;
        case errors_1.ValueErrorType.Date:
          return 'Expected Date';
        case errors_1.ValueErrorType.Function:
          return 'Expected function';
        case errors_1.ValueErrorType.IntegerExclusiveMaximum:
          return `Expected integer to be less than ${schema.exclusiveMaximum}`;
        case errors_1.ValueErrorType.IntegerExclusiveMinimum:
          return `Expected integer to be greater than ${schema.exclusiveMinimum}`;
        case errors_1.ValueErrorType.IntegerMaximum:
          return `Expected integer to be less or equal to ${schema.maximum}`;
        case errors_1.ValueErrorType.IntegerMinimum:
          return `Expected integer to be greater or equal to ${schema.minimum}`;
        case errors_1.ValueErrorType.IntegerMultipleOf:
          return `Expected integer to be a multiple of ${schema.multipleOf}`;
        case errors_1.ValueErrorType.Integer:
          return 'Expected integer';
        case errors_1.ValueErrorType.IntersectUnevaluatedProperties:
          return 'Unexpected property';
        case errors_1.ValueErrorType.Intersect:
          return 'Expected all values to match';
        case errors_1.ValueErrorType.Iterator:
          return 'Expected Iterator';
        case errors_1.ValueErrorType.Literal:
          return `Expected ${
            typeof schema.const === 'string'
              ? `'${schema.const}'`
              : schema.const
          }`;
        case errors_1.ValueErrorType.Never:
          return 'Never';
        case errors_1.ValueErrorType.Not:
          return 'Value should not match';
        case errors_1.ValueErrorType.Null:
          return 'Expected null';
        case errors_1.ValueErrorType.NumberExclusiveMaximum:
          return `Expected number to be less than ${schema.exclusiveMaximum}`;
        case errors_1.ValueErrorType.NumberExclusiveMinimum:
          return `Expected number to be greater than ${schema.exclusiveMinimum}`;
        case errors_1.ValueErrorType.NumberMaximum:
          return `Expected number to be less or equal to ${schema.maximum}`;
        case errors_1.ValueErrorType.NumberMinimum:
          return `Expected number to be greater or equal to ${schema.minimum}`;
        case errors_1.ValueErrorType.NumberMultipleOf:
          return `Expected number to be a multiple of ${schema.multipleOf}`;
        case errors_1.ValueErrorType.Number:
          return 'Expected number';
        case errors_1.ValueErrorType.Object:
          return 'Expected object';
        case errors_1.ValueErrorType.ObjectAdditionalProperties:
          return 'Unexpected property';
        case errors_1.ValueErrorType.ObjectMaxProperties:
          return `Expected object to have no more than ${schema.maxProperties} properties`;
        case errors_1.ValueErrorType.ObjectMinProperties:
          return `Expected object to have at least ${schema.minProperties} properties`;
        case errors_1.ValueErrorType.ObjectRequiredProperty:
          return 'Required property';
        case errors_1.ValueErrorType.Promise:
          return 'Expected Promise';
        case errors_1.ValueErrorType.StringFormatUnknown:
          return `Unknown format '${schema.format}'`;
        case errors_1.ValueErrorType.StringFormat:
          return `Expected string to match '${schema.format}' format`;
        case errors_1.ValueErrorType.StringMaxLength:
          return `Expected string length less or equal to ${schema.maxLength}`;
        case errors_1.ValueErrorType.StringMinLength:
          return `Expected string length greater or equal to ${schema.minLength}`;
        case errors_1.ValueErrorType.StringPattern:
          return `Expected string to match '${schema.pattern}'`;
        case errors_1.ValueErrorType.String:
          return 'Expected string';
        case errors_1.ValueErrorType.Symbol:
          return 'Expected symbol';
        case errors_1.ValueErrorType.TupleLength:
          return `Expected tuple to have ${schema.maxItems || 0} elements`;
        case errors_1.ValueErrorType.Tuple:
          return 'Expected tuple';
        case errors_1.ValueErrorType.Uint8ArrayMaxByteLength:
          return `Expected byte length less or equal to ${schema.maxByteLength}`;
        case errors_1.ValueErrorType.Uint8ArrayMinByteLength:
          return `Expected byte length greater or equal to ${schema.minByteLength}`;
        case errors_1.ValueErrorType.Uint8Array:
          return 'Expected Uint8Array';
        case errors_1.ValueErrorType.Undefined:
          return 'Expected undefined';
        case errors_1.ValueErrorType.Union:
          return 'Expected union value';
        case errors_1.ValueErrorType.Void:
          return 'Expected void';
        case errors_1.ValueErrorType.Kind:
          return `Expected kind '${schema[Types.Kind]}'`;
        default:
          return 'Unknown error type';
      }
    }
    exports.DefaultErrorFunction = DefaultErrorFunction;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/deref.js
var require_deref = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/deref.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Deref = exports.TypeDereferenceError = void 0;
    var typebox_1 = require_typebox();
    var TypeDereferenceError = class extends typebox_1.TypeBoxError {
      constructor(schema) {
        super(`Unable to dereference schema with $id '${schema.$id}'`);
        this.schema = schema;
      }
    };
    exports.TypeDereferenceError = TypeDereferenceError;
    function Deref(schema, references) {
      const index = references.findIndex(
        (target) => target.$id === schema.$ref,
      );
      if (index === -1) throw new TypeDereferenceError(schema);
      return references[index];
    }
    exports.Deref = Deref;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/hash.js
var require_hash = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/hash.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Hash = exports.ByteMarker = exports.ValueHashError = void 0;
    var guard_1 = require_guard();
    var ValueHashError = class extends Error {
      constructor(value) {
        super(`Unable to hash value`);
        this.value = value;
      }
    };
    exports.ValueHashError = ValueHashError;
    var ByteMarker;
    (function (ByteMarker2) {
      ByteMarker2[(ByteMarker2['Undefined'] = 0)] = 'Undefined';
      ByteMarker2[(ByteMarker2['Null'] = 1)] = 'Null';
      ByteMarker2[(ByteMarker2['Boolean'] = 2)] = 'Boolean';
      ByteMarker2[(ByteMarker2['Number'] = 3)] = 'Number';
      ByteMarker2[(ByteMarker2['String'] = 4)] = 'String';
      ByteMarker2[(ByteMarker2['Object'] = 5)] = 'Object';
      ByteMarker2[(ByteMarker2['Array'] = 6)] = 'Array';
      ByteMarker2[(ByteMarker2['Date'] = 7)] = 'Date';
      ByteMarker2[(ByteMarker2['Uint8Array'] = 8)] = 'Uint8Array';
      ByteMarker2[(ByteMarker2['Symbol'] = 9)] = 'Symbol';
      ByteMarker2[(ByteMarker2['BigInt'] = 10)] = 'BigInt';
    })(ByteMarker || (exports.ByteMarker = ByteMarker = {}));
    var Accumulator = BigInt('14695981039346656037');
    var [Prime, Size] = [BigInt('1099511628211'), BigInt('2') ** BigInt('64')];
    var Bytes = Array.from({ length: 256 }).map((_, i2) => BigInt(i2));
    var F64 = new Float64Array(1);
    var F64In = new DataView(F64.buffer);
    var F64Out = new Uint8Array(F64.buffer);
    function* NumberToBytes(value) {
      const byteCount =
        value === 0 ? 1 : Math.ceil(Math.floor(Math.log2(value) + 1) / 8);
      for (let i2 = 0; i2 < byteCount; i2++) {
        yield (value >> (8 * (byteCount - 1 - i2))) & 255;
      }
    }
    function ArrayType(value) {
      FNV1A64(ByteMarker.Array);
      for (const item of value) {
        Visit(item);
      }
    }
    function BooleanType(value) {
      FNV1A64(ByteMarker.Boolean);
      FNV1A64(value ? 1 : 0);
    }
    function BigIntType(value) {
      FNV1A64(ByteMarker.BigInt);
      F64In.setBigInt64(0, value);
      for (const byte of F64Out) {
        FNV1A64(byte);
      }
    }
    function DateType(value) {
      FNV1A64(ByteMarker.Date);
      Visit(value.getTime());
    }
    function NullType(value) {
      FNV1A64(ByteMarker.Null);
    }
    function NumberType(value) {
      FNV1A64(ByteMarker.Number);
      F64In.setFloat64(0, value);
      for (const byte of F64Out) {
        FNV1A64(byte);
      }
    }
    function ObjectType(value) {
      FNV1A64(ByteMarker.Object);
      for (const key of globalThis.Object.keys(value).sort()) {
        Visit(key);
        Visit(value[key]);
      }
    }
    function StringType(value) {
      FNV1A64(ByteMarker.String);
      for (let i2 = 0; i2 < value.length; i2++) {
        for (const byte of NumberToBytes(value.charCodeAt(i2))) {
          FNV1A64(byte);
        }
      }
    }
    function SymbolType(value) {
      FNV1A64(ByteMarker.Symbol);
      Visit(value.description);
    }
    function Uint8ArrayType(value) {
      FNV1A64(ByteMarker.Uint8Array);
      for (let i2 = 0; i2 < value.length; i2++) {
        FNV1A64(value[i2]);
      }
    }
    function UndefinedType(value) {
      return FNV1A64(ByteMarker.Undefined);
    }
    function Visit(value) {
      if ((0, guard_1.IsArray)(value)) return ArrayType(value);
      if ((0, guard_1.IsBoolean)(value)) return BooleanType(value);
      if ((0, guard_1.IsBigInt)(value)) return BigIntType(value);
      if ((0, guard_1.IsDate)(value)) return DateType(value);
      if ((0, guard_1.IsNull)(value)) return NullType(value);
      if ((0, guard_1.IsNumber)(value)) return NumberType(value);
      if ((0, guard_1.IsPlainObject)(value)) return ObjectType(value);
      if ((0, guard_1.IsString)(value)) return StringType(value);
      if ((0, guard_1.IsSymbol)(value)) return SymbolType(value);
      if ((0, guard_1.IsUint8Array)(value)) return Uint8ArrayType(value);
      if ((0, guard_1.IsUndefined)(value)) return UndefinedType(value);
      throw new ValueHashError(value);
    }
    function FNV1A64(byte) {
      Accumulator = Accumulator ^ Bytes[byte];
      Accumulator = (Accumulator * Prime) % Size;
    }
    function Hash(value) {
      Accumulator = BigInt('14695981039346656037');
      Visit(value);
      return Accumulator;
    }
    exports.Hash = Hash;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/errors/errors.js
var require_errors = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/errors/errors.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Errors =
      exports.ValueErrorIterator =
      exports.EscapeKey =
      exports.ValueErrorsUnknownTypeError =
      exports.ValueErrorType =
        void 0;
    var guard_1 = require_guard();
    var system_1 = require_system();
    var deref_1 = require_deref();
    var hash_1 = require_hash();
    var Types = require_typebox();
    var ValueErrorType;
    (function (ValueErrorType2) {
      ValueErrorType2[(ValueErrorType2['ArrayContains'] = 0)] = 'ArrayContains';
      ValueErrorType2[(ValueErrorType2['ArrayMaxContains'] = 1)] =
        'ArrayMaxContains';
      ValueErrorType2[(ValueErrorType2['ArrayMaxItems'] = 2)] = 'ArrayMaxItems';
      ValueErrorType2[(ValueErrorType2['ArrayMinContains'] = 3)] =
        'ArrayMinContains';
      ValueErrorType2[(ValueErrorType2['ArrayMinItems'] = 4)] = 'ArrayMinItems';
      ValueErrorType2[(ValueErrorType2['ArrayUniqueItems'] = 5)] =
        'ArrayUniqueItems';
      ValueErrorType2[(ValueErrorType2['Array'] = 6)] = 'Array';
      ValueErrorType2[(ValueErrorType2['AsyncIterator'] = 7)] = 'AsyncIterator';
      ValueErrorType2[(ValueErrorType2['BigIntExclusiveMaximum'] = 8)] =
        'BigIntExclusiveMaximum';
      ValueErrorType2[(ValueErrorType2['BigIntExclusiveMinimum'] = 9)] =
        'BigIntExclusiveMinimum';
      ValueErrorType2[(ValueErrorType2['BigIntMaximum'] = 10)] =
        'BigIntMaximum';
      ValueErrorType2[(ValueErrorType2['BigIntMinimum'] = 11)] =
        'BigIntMinimum';
      ValueErrorType2[(ValueErrorType2['BigIntMultipleOf'] = 12)] =
        'BigIntMultipleOf';
      ValueErrorType2[(ValueErrorType2['BigInt'] = 13)] = 'BigInt';
      ValueErrorType2[(ValueErrorType2['Boolean'] = 14)] = 'Boolean';
      ValueErrorType2[(ValueErrorType2['DateExclusiveMaximumTimestamp'] = 15)] =
        'DateExclusiveMaximumTimestamp';
      ValueErrorType2[(ValueErrorType2['DateExclusiveMinimumTimestamp'] = 16)] =
        'DateExclusiveMinimumTimestamp';
      ValueErrorType2[(ValueErrorType2['DateMaximumTimestamp'] = 17)] =
        'DateMaximumTimestamp';
      ValueErrorType2[(ValueErrorType2['DateMinimumTimestamp'] = 18)] =
        'DateMinimumTimestamp';
      ValueErrorType2[(ValueErrorType2['DateMultipleOfTimestamp'] = 19)] =
        'DateMultipleOfTimestamp';
      ValueErrorType2[(ValueErrorType2['Date'] = 20)] = 'Date';
      ValueErrorType2[(ValueErrorType2['Function'] = 21)] = 'Function';
      ValueErrorType2[(ValueErrorType2['IntegerExclusiveMaximum'] = 22)] =
        'IntegerExclusiveMaximum';
      ValueErrorType2[(ValueErrorType2['IntegerExclusiveMinimum'] = 23)] =
        'IntegerExclusiveMinimum';
      ValueErrorType2[(ValueErrorType2['IntegerMaximum'] = 24)] =
        'IntegerMaximum';
      ValueErrorType2[(ValueErrorType2['IntegerMinimum'] = 25)] =
        'IntegerMinimum';
      ValueErrorType2[(ValueErrorType2['IntegerMultipleOf'] = 26)] =
        'IntegerMultipleOf';
      ValueErrorType2[(ValueErrorType2['Integer'] = 27)] = 'Integer';
      ValueErrorType2[
        (ValueErrorType2['IntersectUnevaluatedProperties'] = 28)
      ] = 'IntersectUnevaluatedProperties';
      ValueErrorType2[(ValueErrorType2['Intersect'] = 29)] = 'Intersect';
      ValueErrorType2[(ValueErrorType2['Iterator'] = 30)] = 'Iterator';
      ValueErrorType2[(ValueErrorType2['Kind'] = 31)] = 'Kind';
      ValueErrorType2[(ValueErrorType2['Literal'] = 32)] = 'Literal';
      ValueErrorType2[(ValueErrorType2['Never'] = 33)] = 'Never';
      ValueErrorType2[(ValueErrorType2['Not'] = 34)] = 'Not';
      ValueErrorType2[(ValueErrorType2['Null'] = 35)] = 'Null';
      ValueErrorType2[(ValueErrorType2['NumberExclusiveMaximum'] = 36)] =
        'NumberExclusiveMaximum';
      ValueErrorType2[(ValueErrorType2['NumberExclusiveMinimum'] = 37)] =
        'NumberExclusiveMinimum';
      ValueErrorType2[(ValueErrorType2['NumberMaximum'] = 38)] =
        'NumberMaximum';
      ValueErrorType2[(ValueErrorType2['NumberMinimum'] = 39)] =
        'NumberMinimum';
      ValueErrorType2[(ValueErrorType2['NumberMultipleOf'] = 40)] =
        'NumberMultipleOf';
      ValueErrorType2[(ValueErrorType2['Number'] = 41)] = 'Number';
      ValueErrorType2[(ValueErrorType2['ObjectAdditionalProperties'] = 42)] =
        'ObjectAdditionalProperties';
      ValueErrorType2[(ValueErrorType2['ObjectMaxProperties'] = 43)] =
        'ObjectMaxProperties';
      ValueErrorType2[(ValueErrorType2['ObjectMinProperties'] = 44)] =
        'ObjectMinProperties';
      ValueErrorType2[(ValueErrorType2['ObjectRequiredProperty'] = 45)] =
        'ObjectRequiredProperty';
      ValueErrorType2[(ValueErrorType2['Object'] = 46)] = 'Object';
      ValueErrorType2[(ValueErrorType2['Promise'] = 47)] = 'Promise';
      ValueErrorType2[(ValueErrorType2['StringFormatUnknown'] = 48)] =
        'StringFormatUnknown';
      ValueErrorType2[(ValueErrorType2['StringFormat'] = 49)] = 'StringFormat';
      ValueErrorType2[(ValueErrorType2['StringMaxLength'] = 50)] =
        'StringMaxLength';
      ValueErrorType2[(ValueErrorType2['StringMinLength'] = 51)] =
        'StringMinLength';
      ValueErrorType2[(ValueErrorType2['StringPattern'] = 52)] =
        'StringPattern';
      ValueErrorType2[(ValueErrorType2['String'] = 53)] = 'String';
      ValueErrorType2[(ValueErrorType2['Symbol'] = 54)] = 'Symbol';
      ValueErrorType2[(ValueErrorType2['TupleLength'] = 55)] = 'TupleLength';
      ValueErrorType2[(ValueErrorType2['Tuple'] = 56)] = 'Tuple';
      ValueErrorType2[(ValueErrorType2['Uint8ArrayMaxByteLength'] = 57)] =
        'Uint8ArrayMaxByteLength';
      ValueErrorType2[(ValueErrorType2['Uint8ArrayMinByteLength'] = 58)] =
        'Uint8ArrayMinByteLength';
      ValueErrorType2[(ValueErrorType2['Uint8Array'] = 59)] = 'Uint8Array';
      ValueErrorType2[(ValueErrorType2['Undefined'] = 60)] = 'Undefined';
      ValueErrorType2[(ValueErrorType2['Union'] = 61)] = 'Union';
      ValueErrorType2[(ValueErrorType2['Void'] = 62)] = 'Void';
    })(ValueErrorType || (exports.ValueErrorType = ValueErrorType = {}));
    var ValueErrorsUnknownTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super('Unknown type');
        this.schema = schema;
      }
    };
    exports.ValueErrorsUnknownTypeError = ValueErrorsUnknownTypeError;
    function EscapeKey(key) {
      return key.replace(/~/g, '~0').replace(/\//g, '~1');
    }
    exports.EscapeKey = EscapeKey;
    function IsDefined(value) {
      return value !== void 0;
    }
    var ValueErrorIterator = class {
      constructor(iterator) {
        this.iterator = iterator;
      }
      [Symbol.iterator]() {
        return this.iterator;
      }
      /** Returns the first value error or undefined if no errors */
      First() {
        const next = this.iterator.next();
        return next.done ? void 0 : next.value;
      }
    };
    exports.ValueErrorIterator = ValueErrorIterator;
    function Create(type, schema, path, value) {
      return {
        type,
        schema,
        path,
        value,
        message: system_1.TypeSystemErrorFunction.Get()(schema, type),
      };
    }
    function* TAny(schema, references, path, value) {}
    function* TArray(schema, references, path, value) {
      if (!(0, guard_1.IsArray)(value)) {
        return yield Create(ValueErrorType.Array, schema, path, value);
      }
      if (IsDefined(schema.minItems) && !(value.length >= schema.minItems)) {
        yield Create(ValueErrorType.ArrayMinItems, schema, path, value);
      }
      if (IsDefined(schema.maxItems) && !(value.length <= schema.maxItems)) {
        yield Create(ValueErrorType.ArrayMaxItems, schema, path, value);
      }
      for (let i2 = 0; i2 < value.length; i2++) {
        yield* Visit(schema.items, references, `${path}/${i2}`, value[i2]);
      }
      if (
        schema.uniqueItems === true &&
        !(function () {
          const set = /* @__PURE__ */ new Set();
          for (const element of value) {
            const hashed = (0, hash_1.Hash)(element);
            if (set.has(hashed)) {
              return false;
            } else {
              set.add(hashed);
            }
          }
          return true;
        })()
      ) {
        yield Create(ValueErrorType.ArrayUniqueItems, schema, path, value);
      }
      if (
        !(
          IsDefined(schema.contains) ||
          IsDefined(schema.minContains) ||
          IsDefined(schema.maxContains)
        )
      ) {
        return;
      }
      const containsSchema = IsDefined(schema.contains)
        ? schema.contains
        : Types.Type.Never();
      const containsCount = value.reduce(
        (acc, value2, index) =>
          Visit(containsSchema, references, `${path}${index}`, value2).next()
            .done === true
            ? acc + 1
            : acc,
        0,
      );
      if (containsCount === 0) {
        yield Create(ValueErrorType.ArrayContains, schema, path, value);
      }
      if (
        (0, guard_1.IsNumber)(schema.minContains) &&
        containsCount < schema.minContains
      ) {
        yield Create(ValueErrorType.ArrayMinContains, schema, path, value);
      }
      if (
        (0, guard_1.IsNumber)(schema.maxContains) &&
        containsCount > schema.maxContains
      ) {
        yield Create(ValueErrorType.ArrayMaxContains, schema, path, value);
      }
    }
    function* TAsyncIterator(schema, references, path, value) {
      if (!(0, guard_1.IsAsyncIterator)(value))
        yield Create(ValueErrorType.AsyncIterator, schema, path, value);
    }
    function* TBigInt(schema, references, path, value) {
      if (!(0, guard_1.IsBigInt)(value))
        return yield Create(ValueErrorType.BigInt, schema, path, value);
      if (
        IsDefined(schema.exclusiveMaximum) &&
        !(value < schema.exclusiveMaximum)
      ) {
        yield Create(
          ValueErrorType.BigIntExclusiveMaximum,
          schema,
          path,
          value,
        );
      }
      if (
        IsDefined(schema.exclusiveMinimum) &&
        !(value > schema.exclusiveMinimum)
      ) {
        yield Create(
          ValueErrorType.BigIntExclusiveMinimum,
          schema,
          path,
          value,
        );
      }
      if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
        yield Create(ValueErrorType.BigIntMaximum, schema, path, value);
      }
      if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
        yield Create(ValueErrorType.BigIntMinimum, schema, path, value);
      }
      if (
        IsDefined(schema.multipleOf) &&
        !(value % schema.multipleOf === BigInt(0))
      ) {
        yield Create(ValueErrorType.BigIntMultipleOf, schema, path, value);
      }
    }
    function* TBoolean(schema, references, path, value) {
      if (!(0, guard_1.IsBoolean)(value))
        yield Create(ValueErrorType.Boolean, schema, path, value);
    }
    function* TConstructor(schema, references, path, value) {
      yield* Visit(schema.returns, references, path, value.prototype);
    }
    function* TDate(schema, references, path, value) {
      if (!(0, guard_1.IsDate)(value))
        return yield Create(ValueErrorType.Date, schema, path, value);
      if (
        IsDefined(schema.exclusiveMaximumTimestamp) &&
        !(value.getTime() < schema.exclusiveMaximumTimestamp)
      ) {
        yield Create(
          ValueErrorType.DateExclusiveMaximumTimestamp,
          schema,
          path,
          value,
        );
      }
      if (
        IsDefined(schema.exclusiveMinimumTimestamp) &&
        !(value.getTime() > schema.exclusiveMinimumTimestamp)
      ) {
        yield Create(
          ValueErrorType.DateExclusiveMinimumTimestamp,
          schema,
          path,
          value,
        );
      }
      if (
        IsDefined(schema.maximumTimestamp) &&
        !(value.getTime() <= schema.maximumTimestamp)
      ) {
        yield Create(ValueErrorType.DateMaximumTimestamp, schema, path, value);
      }
      if (
        IsDefined(schema.minimumTimestamp) &&
        !(value.getTime() >= schema.minimumTimestamp)
      ) {
        yield Create(ValueErrorType.DateMinimumTimestamp, schema, path, value);
      }
      if (
        IsDefined(schema.multipleOfTimestamp) &&
        !(value.getTime() % schema.multipleOfTimestamp === 0)
      ) {
        yield Create(
          ValueErrorType.DateMultipleOfTimestamp,
          schema,
          path,
          value,
        );
      }
    }
    function* TFunction(schema, references, path, value) {
      if (!(0, guard_1.IsFunction)(value))
        yield Create(ValueErrorType.Function, schema, path, value);
    }
    function* TInteger(schema, references, path, value) {
      if (!(0, guard_1.IsInteger)(value))
        return yield Create(ValueErrorType.Integer, schema, path, value);
      if (
        IsDefined(schema.exclusiveMaximum) &&
        !(value < schema.exclusiveMaximum)
      ) {
        yield Create(
          ValueErrorType.IntegerExclusiveMaximum,
          schema,
          path,
          value,
        );
      }
      if (
        IsDefined(schema.exclusiveMinimum) &&
        !(value > schema.exclusiveMinimum)
      ) {
        yield Create(
          ValueErrorType.IntegerExclusiveMinimum,
          schema,
          path,
          value,
        );
      }
      if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
        yield Create(ValueErrorType.IntegerMaximum, schema, path, value);
      }
      if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
        yield Create(ValueErrorType.IntegerMinimum, schema, path, value);
      }
      if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
        yield Create(ValueErrorType.IntegerMultipleOf, schema, path, value);
      }
    }
    function* TIntersect(schema, references, path, value) {
      for (const inner of schema.allOf) {
        const next = Visit(inner, references, path, value).next();
        if (!next.done) {
          yield Create(ValueErrorType.Intersect, schema, path, value);
          yield next.value;
        }
      }
      if (schema.unevaluatedProperties === false) {
        const keyCheck = new RegExp(Types.KeyResolver.ResolvePattern(schema));
        for (const valueKey of Object.getOwnPropertyNames(value)) {
          if (!keyCheck.test(valueKey)) {
            yield Create(
              ValueErrorType.IntersectUnevaluatedProperties,
              schema,
              `${path}/${valueKey}`,
              value,
            );
          }
        }
      }
      if (typeof schema.unevaluatedProperties === 'object') {
        const keyCheck = new RegExp(Types.KeyResolver.ResolvePattern(schema));
        for (const valueKey of Object.getOwnPropertyNames(value)) {
          if (!keyCheck.test(valueKey)) {
            const next = Visit(
              schema.unevaluatedProperties,
              references,
              `${path}/${valueKey}`,
              value[valueKey],
            ).next();
            if (!next.done) yield next.value;
          }
        }
      }
    }
    function* TIterator(schema, references, path, value) {
      if (!(0, guard_1.IsIterator)(value))
        yield Create(ValueErrorType.Iterator, schema, path, value);
    }
    function* TLiteral(schema, references, path, value) {
      if (!(value === schema.const))
        yield Create(ValueErrorType.Literal, schema, path, value);
    }
    function* TNever(schema, references, path, value) {
      yield Create(ValueErrorType.Never, schema, path, value);
    }
    function* TNot(schema, references, path, value) {
      if (Visit(schema.not, references, path, value).next().done === true)
        yield Create(ValueErrorType.Not, schema, path, value);
    }
    function* TNull(schema, references, path, value) {
      if (!(0, guard_1.IsNull)(value))
        yield Create(ValueErrorType.Null, schema, path, value);
    }
    function* TNumber(schema, references, path, value) {
      if (!system_1.TypeSystemPolicy.IsNumberLike(value))
        return yield Create(ValueErrorType.Number, schema, path, value);
      if (
        IsDefined(schema.exclusiveMaximum) &&
        !(value < schema.exclusiveMaximum)
      ) {
        yield Create(
          ValueErrorType.NumberExclusiveMaximum,
          schema,
          path,
          value,
        );
      }
      if (
        IsDefined(schema.exclusiveMinimum) &&
        !(value > schema.exclusiveMinimum)
      ) {
        yield Create(
          ValueErrorType.NumberExclusiveMinimum,
          schema,
          path,
          value,
        );
      }
      if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
        yield Create(ValueErrorType.NumberMaximum, schema, path, value);
      }
      if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
        yield Create(ValueErrorType.NumberMinimum, schema, path, value);
      }
      if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
        yield Create(ValueErrorType.NumberMultipleOf, schema, path, value);
      }
    }
    function* TObject(schema, references, path, value) {
      if (!system_1.TypeSystemPolicy.IsObjectLike(value))
        return yield Create(ValueErrorType.Object, schema, path, value);
      if (
        IsDefined(schema.minProperties) &&
        !(Object.getOwnPropertyNames(value).length >= schema.minProperties)
      ) {
        yield Create(ValueErrorType.ObjectMinProperties, schema, path, value);
      }
      if (
        IsDefined(schema.maxProperties) &&
        !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)
      ) {
        yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value);
      }
      const requiredKeys = Array.isArray(schema.required)
        ? schema.required
        : [];
      const knownKeys = Object.getOwnPropertyNames(schema.properties);
      const unknownKeys = Object.getOwnPropertyNames(value);
      for (const requiredKey of requiredKeys) {
        if (unknownKeys.includes(requiredKey)) continue;
        yield Create(
          ValueErrorType.ObjectRequiredProperty,
          schema.properties[requiredKey],
          `${path}/${EscapeKey(requiredKey)}`,
          void 0,
        );
      }
      if (schema.additionalProperties === false) {
        for (const valueKey of unknownKeys) {
          if (!knownKeys.includes(valueKey)) {
            yield Create(
              ValueErrorType.ObjectAdditionalProperties,
              schema,
              `${path}/${EscapeKey(valueKey)}`,
              value[valueKey],
            );
          }
        }
      }
      if (typeof schema.additionalProperties === 'object') {
        for (const valueKey of unknownKeys) {
          if (knownKeys.includes(valueKey)) continue;
          yield* Visit(
            schema.additionalProperties,
            references,
            `${path}/${EscapeKey(valueKey)}`,
            value[valueKey],
          );
        }
      }
      for (const knownKey of knownKeys) {
        const property = schema.properties[knownKey];
        if (schema.required && schema.required.includes(knownKey)) {
          yield* Visit(
            property,
            references,
            `${path}/${EscapeKey(knownKey)}`,
            value[knownKey],
          );
          if (Types.ExtendsUndefined.Check(schema) && !(knownKey in value)) {
            yield Create(
              ValueErrorType.ObjectRequiredProperty,
              property,
              `${path}/${EscapeKey(knownKey)}`,
              void 0,
            );
          }
        } else {
          if (
            system_1.TypeSystemPolicy.IsExactOptionalProperty(value, knownKey)
          ) {
            yield* Visit(
              property,
              references,
              `${path}/${EscapeKey(knownKey)}`,
              value[knownKey],
            );
          }
        }
      }
    }
    function* TPromise(schema, references, path, value) {
      if (!(0, guard_1.IsPromise)(value))
        yield Create(ValueErrorType.Promise, schema, path, value);
    }
    function* TRecord(schema, references, path, value) {
      if (!system_1.TypeSystemPolicy.IsRecordLike(value))
        return yield Create(ValueErrorType.Object, schema, path, value);
      if (
        IsDefined(schema.minProperties) &&
        !(Object.getOwnPropertyNames(value).length >= schema.minProperties)
      ) {
        yield Create(ValueErrorType.ObjectMinProperties, schema, path, value);
      }
      if (
        IsDefined(schema.maxProperties) &&
        !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)
      ) {
        yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value);
      }
      const [patternKey, patternSchema] = Object.entries(
        schema.patternProperties,
      )[0];
      const regex = new RegExp(patternKey);
      for (const [propertyKey, propertyValue] of Object.entries(value)) {
        if (regex.test(propertyKey))
          yield* Visit(
            patternSchema,
            references,
            `${path}/${EscapeKey(propertyKey)}`,
            propertyValue,
          );
      }
      if (typeof schema.additionalProperties === 'object') {
        for (const [propertyKey, propertyValue] of Object.entries(value)) {
          if (!regex.test(propertyKey))
            yield* Visit(
              schema.additionalProperties,
              references,
              `${path}/${EscapeKey(propertyKey)}`,
              propertyValue,
            );
        }
      }
      if (schema.additionalProperties === false) {
        for (const [propertyKey, propertyValue] of Object.entries(value)) {
          if (regex.test(propertyKey)) continue;
          return yield Create(
            ValueErrorType.ObjectAdditionalProperties,
            schema,
            `${path}/${EscapeKey(propertyKey)}`,
            propertyValue,
          );
        }
      }
    }
    function* TRef(schema, references, path, value) {
      yield* Visit(
        (0, deref_1.Deref)(schema, references),
        references,
        path,
        value,
      );
    }
    function* TString(schema, references, path, value) {
      if (!(0, guard_1.IsString)(value))
        return yield Create(ValueErrorType.String, schema, path, value);
      if (IsDefined(schema.minLength) && !(value.length >= schema.minLength)) {
        yield Create(ValueErrorType.StringMinLength, schema, path, value);
      }
      if (IsDefined(schema.maxLength) && !(value.length <= schema.maxLength)) {
        yield Create(ValueErrorType.StringMaxLength, schema, path, value);
      }
      if ((0, guard_1.IsString)(schema.pattern)) {
        const regex = new RegExp(schema.pattern);
        if (!regex.test(value)) {
          yield Create(ValueErrorType.StringPattern, schema, path, value);
        }
      }
      if ((0, guard_1.IsString)(schema.format)) {
        if (!Types.FormatRegistry.Has(schema.format)) {
          yield Create(ValueErrorType.StringFormatUnknown, schema, path, value);
        } else {
          const format2 = Types.FormatRegistry.Get(schema.format);
          if (!format2(value)) {
            yield Create(ValueErrorType.StringFormat, schema, path, value);
          }
        }
      }
    }
    function* TSymbol(schema, references, path, value) {
      if (!(0, guard_1.IsSymbol)(value))
        yield Create(ValueErrorType.Symbol, schema, path, value);
    }
    function* TTemplateLiteral(schema, references, path, value) {
      if (!(0, guard_1.IsString)(value))
        return yield Create(ValueErrorType.String, schema, path, value);
      const regex = new RegExp(schema.pattern);
      if (!regex.test(value)) {
        yield Create(ValueErrorType.StringPattern, schema, path, value);
      }
    }
    function* TThis(schema, references, path, value) {
      yield* Visit(
        (0, deref_1.Deref)(schema, references),
        references,
        path,
        value,
      );
    }
    function* TTuple(schema, references, path, value) {
      if (!(0, guard_1.IsArray)(value))
        return yield Create(ValueErrorType.Tuple, schema, path, value);
      if (schema.items === void 0 && !(value.length === 0)) {
        return yield Create(ValueErrorType.TupleLength, schema, path, value);
      }
      if (!(value.length === schema.maxItems)) {
        return yield Create(ValueErrorType.TupleLength, schema, path, value);
      }
      if (!schema.items) {
        return;
      }
      for (let i2 = 0; i2 < schema.items.length; i2++) {
        yield* Visit(schema.items[i2], references, `${path}/${i2}`, value[i2]);
      }
    }
    function* TUndefined(schema, references, path, value) {
      if (!(0, guard_1.IsUndefined)(value))
        yield Create(ValueErrorType.Undefined, schema, path, value);
    }
    function* TUnion(schema, references, path, value) {
      let count = 0;
      for (const subschema of schema.anyOf) {
        const errors = [...Visit(subschema, references, path, value)];
        if (errors.length === 0) return;
        count += errors.length;
      }
      if (count > 0) {
        yield Create(ValueErrorType.Union, schema, path, value);
      }
    }
    function* TUint8Array(schema, references, path, value) {
      if (!(0, guard_1.IsUint8Array)(value))
        return yield Create(ValueErrorType.Uint8Array, schema, path, value);
      if (
        IsDefined(schema.maxByteLength) &&
        !(value.length <= schema.maxByteLength)
      ) {
        yield Create(
          ValueErrorType.Uint8ArrayMaxByteLength,
          schema,
          path,
          value,
        );
      }
      if (
        IsDefined(schema.minByteLength) &&
        !(value.length >= schema.minByteLength)
      ) {
        yield Create(
          ValueErrorType.Uint8ArrayMinByteLength,
          schema,
          path,
          value,
        );
      }
    }
    function* TUnknown(schema, references, path, value) {}
    function* TVoid(schema, references, path, value) {
      if (!system_1.TypeSystemPolicy.IsVoidLike(value))
        yield Create(ValueErrorType.Void, schema, path, value);
    }
    function* TKind(schema, references, path, value) {
      const check = Types.TypeRegistry.Get(schema[Types.Kind]);
      if (!check(schema, value))
        yield Create(ValueErrorType.Kind, schema, path, value);
    }
    function* Visit(schema, references, path, value) {
      const references_ = IsDefined(schema.$id)
        ? [...references, schema]
        : references;
      const schema_ = schema;
      switch (schema_[Types.Kind]) {
        case 'Any':
          return yield* TAny(schema_, references_, path, value);
        case 'Array':
          return yield* TArray(schema_, references_, path, value);
        case 'AsyncIterator':
          return yield* TAsyncIterator(schema_, references_, path, value);
        case 'BigInt':
          return yield* TBigInt(schema_, references_, path, value);
        case 'Boolean':
          return yield* TBoolean(schema_, references_, path, value);
        case 'Constructor':
          return yield* TConstructor(schema_, references_, path, value);
        case 'Date':
          return yield* TDate(schema_, references_, path, value);
        case 'Function':
          return yield* TFunction(schema_, references_, path, value);
        case 'Integer':
          return yield* TInteger(schema_, references_, path, value);
        case 'Intersect':
          return yield* TIntersect(schema_, references_, path, value);
        case 'Iterator':
          return yield* TIterator(schema_, references_, path, value);
        case 'Literal':
          return yield* TLiteral(schema_, references_, path, value);
        case 'Never':
          return yield* TNever(schema_, references_, path, value);
        case 'Not':
          return yield* TNot(schema_, references_, path, value);
        case 'Null':
          return yield* TNull(schema_, references_, path, value);
        case 'Number':
          return yield* TNumber(schema_, references_, path, value);
        case 'Object':
          return yield* TObject(schema_, references_, path, value);
        case 'Promise':
          return yield* TPromise(schema_, references_, path, value);
        case 'Record':
          return yield* TRecord(schema_, references_, path, value);
        case 'Ref':
          return yield* TRef(schema_, references_, path, value);
        case 'String':
          return yield* TString(schema_, references_, path, value);
        case 'Symbol':
          return yield* TSymbol(schema_, references_, path, value);
        case 'TemplateLiteral':
          return yield* TTemplateLiteral(schema_, references_, path, value);
        case 'This':
          return yield* TThis(schema_, references_, path, value);
        case 'Tuple':
          return yield* TTuple(schema_, references_, path, value);
        case 'Undefined':
          return yield* TUndefined(schema_, references_, path, value);
        case 'Union':
          return yield* TUnion(schema_, references_, path, value);
        case 'Uint8Array':
          return yield* TUint8Array(schema_, references_, path, value);
        case 'Unknown':
          return yield* TUnknown(schema_, references_, path, value);
        case 'Void':
          return yield* TVoid(schema_, references_, path, value);
        default:
          if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
            throw new ValueErrorsUnknownTypeError(schema);
          return yield* TKind(schema_, references_, path, value);
      }
    }
    function Errors(...args) {
      const iterator =
        args.length === 3
          ? Visit(args[0], args[1], '', args[2])
          : Visit(args[0], [], '', args[1]);
      return new ValueErrorIterator(iterator);
    }
    exports.Errors = Errors;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/errors/index.js
var require_errors2 = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/errors/index.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __createBinding =
      (exports && exports.__createBinding) ||
      (Object.create
        ? function (o, m2, k2, k22) {
            if (k22 === void 0) k22 = k2;
            var desc = Object.getOwnPropertyDescriptor(m2, k2);
            if (
              !desc ||
              ('get' in desc
                ? !m2.__esModule
                : desc.writable || desc.configurable)
            ) {
              desc = {
                enumerable: true,
                get: function () {
                  return m2[k2];
                },
              };
            }
            Object.defineProperty(o, k22, desc);
          }
        : function (o, m2, k2, k22) {
            if (k22 === void 0) k22 = k2;
            o[k22] = m2[k2];
          });
    var __exportStar =
      (exports && exports.__exportStar) ||
      function (m2, exports2) {
        for (var p2 in m2)
          if (
            p2 !== 'default' &&
            !Object.prototype.hasOwnProperty.call(exports2, p2)
          )
            __createBinding(exports2, m2, p2);
      };
    Object.defineProperty(exports, '__esModule', { value: true });
    __exportStar(require_errors(), exports);
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/pointer.js
var require_pointer = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/pointer.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.ValuePointer =
      exports.ValuePointerRootDeleteError =
      exports.ValuePointerRootSetError =
        void 0;
    var ValuePointerRootSetError = class extends Error {
      constructor(value, path, update) {
        super('Cannot set root value');
        this.value = value;
        this.path = path;
        this.update = update;
      }
    };
    exports.ValuePointerRootSetError = ValuePointerRootSetError;
    var ValuePointerRootDeleteError = class extends Error {
      constructor(value, path) {
        super('Cannot delete root value');
        this.value = value;
        this.path = path;
      }
    };
    exports.ValuePointerRootDeleteError = ValuePointerRootDeleteError;
    var ValuePointer;
    (function (ValuePointer2) {
      function Escape(component) {
        return component.indexOf('~') === -1
          ? component
          : component.replace(/~1/g, '/').replace(/~0/g, '~');
      }
      function* Format(pointer) {
        if (pointer === '') return;
        let [start, end] = [0, 0];
        for (let i2 = 0; i2 < pointer.length; i2++) {
          const char = pointer.charAt(i2);
          if (char === '/') {
            if (i2 === 0) {
              start = i2 + 1;
            } else {
              end = i2;
              yield Escape(pointer.slice(start, end));
              start = i2 + 1;
            }
          } else {
            end = i2;
          }
        }
        yield Escape(pointer.slice(start));
      }
      ValuePointer2.Format = Format;
      function Set2(value, pointer, update) {
        if (pointer === '')
          throw new ValuePointerRootSetError(value, pointer, update);
        let [owner, next, key] = [null, value, ''];
        for (const component of Format(pointer)) {
          if (next[component] === void 0) next[component] = {};
          owner = next;
          next = next[component];
          key = component;
        }
        owner[key] = update;
      }
      ValuePointer2.Set = Set2;
      function Delete(value, pointer) {
        if (pointer === '')
          throw new ValuePointerRootDeleteError(value, pointer);
        let [owner, next, key] = [null, value, ''];
        for (const component of Format(pointer)) {
          if (next[component] === void 0 || next[component] === null) return;
          owner = next;
          next = next[component];
          key = component;
        }
        if (Array.isArray(owner)) {
          const index = parseInt(key);
          owner.splice(index, 1);
        } else {
          delete owner[key];
        }
      }
      ValuePointer2.Delete = Delete;
      function Has(value, pointer) {
        if (pointer === '') return true;
        let [owner, next, key] = [null, value, ''];
        for (const component of Format(pointer)) {
          if (next[component] === void 0) return false;
          owner = next;
          next = next[component];
          key = component;
        }
        return Object.getOwnPropertyNames(owner).includes(key);
      }
      ValuePointer2.Has = Has;
      function Get(value, pointer) {
        if (pointer === '') return value;
        let current = value;
        for (const component of Format(pointer)) {
          if (current[component] === void 0) return void 0;
          current = current[component];
        }
        return current;
      }
      ValuePointer2.Get = Get;
    })(ValuePointer || (exports.ValuePointer = ValuePointer = {}));
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/clone.js
var require_clone = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/clone.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Clone = void 0;
    var guard_1 = require_guard();
    function ObjectType(value) {
      const keys2 = [
        ...Object.getOwnPropertyNames(value),
        ...Object.getOwnPropertySymbols(value),
      ];
      return keys2.reduce(
        (acc, key) => ({ ...acc, [key]: Clone(value[key]) }),
        {},
      );
    }
    function ArrayType(value) {
      return value.map((element) => Clone(element));
    }
    function TypedArrayType(value) {
      return value.slice();
    }
    function DateType(value) {
      return new Date(value.toISOString());
    }
    function ValueType(value) {
      return value;
    }
    function Clone(value) {
      if ((0, guard_1.IsArray)(value)) return ArrayType(value);
      if ((0, guard_1.IsDate)(value)) return DateType(value);
      if ((0, guard_1.IsPlainObject)(value)) return ObjectType(value);
      if ((0, guard_1.IsTypedArray)(value)) return TypedArrayType(value);
      if ((0, guard_1.IsValueType)(value)) return ValueType(value);
      throw new Error('ValueClone: Unable to clone value');
    }
    exports.Clone = Clone;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/delta.js
var require_delta = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/delta.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Patch =
      exports.Diff =
      exports.ValueDeltaUnableToDiffUnknownValue =
      exports.ValueDeltaObjectWithSymbolKeyError =
      exports.Edit =
      exports.Delete =
      exports.Update =
      exports.Insert =
        void 0;
    var guard_1 = require_guard();
    var typebox_1 = require_typebox();
    var pointer_1 = require_pointer();
    var clone_1 = require_clone();
    exports.Insert = typebox_1.Type.Object({
      type: typebox_1.Type.Literal('insert'),
      path: typebox_1.Type.String(),
      value: typebox_1.Type.Unknown(),
    });
    exports.Update = typebox_1.Type.Object({
      type: typebox_1.Type.Literal('update'),
      path: typebox_1.Type.String(),
      value: typebox_1.Type.Unknown(),
    });
    exports.Delete = typebox_1.Type.Object({
      type: typebox_1.Type.Literal('delete'),
      path: typebox_1.Type.String(),
    });
    exports.Edit = typebox_1.Type.Union([
      exports.Insert,
      exports.Update,
      exports.Delete,
    ]);
    var ValueDeltaObjectWithSymbolKeyError = class extends Error {
      constructor(key) {
        super('Cannot diff objects with symbol keys');
        this.key = key;
      }
    };
    exports.ValueDeltaObjectWithSymbolKeyError =
      ValueDeltaObjectWithSymbolKeyError;
    var ValueDeltaUnableToDiffUnknownValue = class extends Error {
      constructor(value) {
        super('Unable to create diff edits for unknown value');
        this.value = value;
      }
    };
    exports.ValueDeltaUnableToDiffUnknownValue =
      ValueDeltaUnableToDiffUnknownValue;
    function CreateUpdate(path, value) {
      return { type: 'update', path, value };
    }
    function CreateInsert(path, value) {
      return { type: 'insert', path, value };
    }
    function CreateDelete(path) {
      return { type: 'delete', path };
    }
    function* ObjectType(path, current, next) {
      if (!(0, guard_1.IsPlainObject)(next))
        return yield CreateUpdate(path, next);
      const currentKeys = [
        ...Object.keys(current),
        ...Object.getOwnPropertySymbols(current),
      ];
      const nextKeys = [
        ...Object.keys(next),
        ...Object.getOwnPropertySymbols(next),
      ];
      for (const key of currentKeys) {
        if ((0, guard_1.IsSymbol)(key))
          throw new ValueDeltaObjectWithSymbolKeyError(key);
        if ((0, guard_1.IsUndefined)(next[key]) && nextKeys.includes(key))
          yield CreateUpdate(`${path}/${String(key)}`, void 0);
      }
      for (const key of nextKeys) {
        if (
          (0, guard_1.IsUndefined)(current[key]) ||
          (0, guard_1.IsUndefined)(next[key])
        )
          continue;
        if ((0, guard_1.IsSymbol)(key))
          throw new ValueDeltaObjectWithSymbolKeyError(key);
        yield* Visit(`${path}/${String(key)}`, current[key], next[key]);
      }
      for (const key of nextKeys) {
        if ((0, guard_1.IsSymbol)(key))
          throw new ValueDeltaObjectWithSymbolKeyError(key);
        if ((0, guard_1.IsUndefined)(current[key]))
          yield CreateInsert(`${path}/${String(key)}`, next[key]);
      }
      for (const key of currentKeys.reverse()) {
        if ((0, guard_1.IsSymbol)(key))
          throw new ValueDeltaObjectWithSymbolKeyError(key);
        if ((0, guard_1.IsUndefined)(next[key]) && !nextKeys.includes(key))
          yield CreateDelete(`${path}/${String(key)}`);
      }
    }
    function* ArrayType(path, current, next) {
      if (!(0, guard_1.IsArray)(next)) return yield CreateUpdate(path, next);
      for (let i2 = 0; i2 < Math.min(current.length, next.length); i2++) {
        yield* Visit(`${path}/${i2}`, current[i2], next[i2]);
      }
      for (let i2 = 0; i2 < next.length; i2++) {
        if (i2 < current.length) continue;
        yield CreateInsert(`${path}/${i2}`, next[i2]);
      }
      for (let i2 = current.length - 1; i2 >= 0; i2--) {
        if (i2 < next.length) continue;
        yield CreateDelete(`${path}/${i2}`);
      }
    }
    function* TypedArrayType(path, current, next) {
      if (
        !(0, guard_1.IsTypedArray)(next) ||
        current.length !== next.length ||
        Object.getPrototypeOf(current).constructor.name !==
          Object.getPrototypeOf(next).constructor.name
      )
        return yield CreateUpdate(path, next);
      for (let i2 = 0; i2 < Math.min(current.length, next.length); i2++) {
        yield* Visit(`${path}/${i2}`, current[i2], next[i2]);
      }
    }
    function* ValueType(path, current, next) {
      if (current === next) return;
      yield CreateUpdate(path, next);
    }
    function* Visit(path, current, next) {
      if ((0, guard_1.IsPlainObject)(current))
        return yield* ObjectType(path, current, next);
      if ((0, guard_1.IsArray)(current))
        return yield* ArrayType(path, current, next);
      if ((0, guard_1.IsTypedArray)(current))
        return yield* TypedArrayType(path, current, next);
      if ((0, guard_1.IsValueType)(current))
        return yield* ValueType(path, current, next);
      throw new ValueDeltaUnableToDiffUnknownValue(current);
    }
    function Diff(current, next) {
      return [...Visit('', current, next)];
    }
    exports.Diff = Diff;
    function IsRootUpdate(edits) {
      return (
        edits.length > 0 && edits[0].path === '' && edits[0].type === 'update'
      );
    }
    function IsIdentity(edits) {
      return edits.length === 0;
    }
    function Patch(current, edits) {
      if (IsRootUpdate(edits)) {
        return (0, clone_1.Clone)(edits[0].value);
      }
      if (IsIdentity(edits)) {
        return (0, clone_1.Clone)(current);
      }
      const clone = (0, clone_1.Clone)(current);
      for (const edit of edits) {
        switch (edit.type) {
          case 'insert': {
            pointer_1.ValuePointer.Set(clone, edit.path, edit.value);
            break;
          }
          case 'update': {
            pointer_1.ValuePointer.Set(clone, edit.path, edit.value);
            break;
          }
          case 'delete': {
            pointer_1.ValuePointer.Delete(clone, edit.path);
            break;
          }
        }
      }
      return clone;
    }
    exports.Patch = Patch;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/mutate.js
var require_mutate = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/mutate.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Mutate =
      exports.ValueMutateInvalidRootMutationError =
      exports.ValueMutateTypeMismatchError =
        void 0;
    var guard_1 = require_guard();
    var pointer_1 = require_pointer();
    var clone_1 = require_clone();
    var ValueMutateTypeMismatchError = class extends Error {
      constructor() {
        super('Cannot assign due type mismatch of assignable values');
      }
    };
    exports.ValueMutateTypeMismatchError = ValueMutateTypeMismatchError;
    var ValueMutateInvalidRootMutationError = class extends Error {
      constructor() {
        super('Only object and array types can be mutated at the root level');
      }
    };
    exports.ValueMutateInvalidRootMutationError =
      ValueMutateInvalidRootMutationError;
    function ObjectType(root, path, current, next) {
      if (!(0, guard_1.IsPlainObject)(current)) {
        pointer_1.ValuePointer.Set(root, path, (0, clone_1.Clone)(next));
      } else {
        const currentKeys = Object.keys(current);
        const nextKeys = Object.keys(next);
        for (const currentKey of currentKeys) {
          if (!nextKeys.includes(currentKey)) {
            delete current[currentKey];
          }
        }
        for (const nextKey of nextKeys) {
          if (!currentKeys.includes(nextKey)) {
            current[nextKey] = null;
          }
        }
        for (const nextKey of nextKeys) {
          Visit(root, `${path}/${nextKey}`, current[nextKey], next[nextKey]);
        }
      }
    }
    function ArrayType(root, path, current, next) {
      if (!(0, guard_1.IsArray)(current)) {
        pointer_1.ValuePointer.Set(root, path, (0, clone_1.Clone)(next));
      } else {
        for (let index = 0; index < next.length; index++) {
          Visit(root, `${path}/${index}`, current[index], next[index]);
        }
        current.splice(next.length);
      }
    }
    function TypedArrayType(root, path, current, next) {
      if (
        (0, guard_1.IsTypedArray)(current) &&
        current.length === next.length
      ) {
        for (let i2 = 0; i2 < current.length; i2++) {
          current[i2] = next[i2];
        }
      } else {
        pointer_1.ValuePointer.Set(root, path, (0, clone_1.Clone)(next));
      }
    }
    function ValueType(root, path, current, next) {
      if (current === next) return;
      pointer_1.ValuePointer.Set(root, path, next);
    }
    function Visit(root, path, current, next) {
      if ((0, guard_1.IsArray)(next))
        return ArrayType(root, path, current, next);
      if ((0, guard_1.IsTypedArray)(next))
        return TypedArrayType(root, path, current, next);
      if ((0, guard_1.IsPlainObject)(next))
        return ObjectType(root, path, current, next);
      if ((0, guard_1.IsValueType)(next))
        return ValueType(root, path, current, next);
    }
    function IsNonMutableValue(value) {
      return (
        (0, guard_1.IsTypedArray)(value) || (0, guard_1.IsValueType)(value)
      );
    }
    function IsMismatchedValue(current, next) {
      return (
        ((0, guard_1.IsPlainObject)(current) && (0, guard_1.IsArray)(next)) ||
        ((0, guard_1.IsArray)(current) && (0, guard_1.IsPlainObject)(next))
      );
    }
    function Mutate(current, next) {
      if (IsNonMutableValue(current) || IsNonMutableValue(next))
        throw new ValueMutateInvalidRootMutationError();
      if (IsMismatchedValue(current, next))
        throw new ValueMutateTypeMismatchError();
      Visit(current, '', current, next);
    }
    exports.Mutate = Mutate;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/equal.js
var require_equal = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/equal.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Equal = void 0;
    var guard_1 = require_guard();
    function ObjectType(left, right) {
      if (!(0, guard_1.IsPlainObject)(right)) return false;
      const leftKeys = [
        ...Object.keys(left),
        ...Object.getOwnPropertySymbols(left),
      ];
      const rightKeys = [
        ...Object.keys(right),
        ...Object.getOwnPropertySymbols(right),
      ];
      if (leftKeys.length !== rightKeys.length) return false;
      return leftKeys.every((key) => Equal(left[key], right[key]));
    }
    function DateType(left, right) {
      return (0, guard_1.IsDate)(right) && left.getTime() === right.getTime();
    }
    function ArrayType(left, right) {
      if (!(0, guard_1.IsArray)(right) || left.length !== right.length)
        return false;
      return left.every((value, index) => Equal(value, right[index]));
    }
    function TypedArrayType(left, right) {
      if (
        !(0, guard_1.IsTypedArray)(right) ||
        left.length !== right.length ||
        Object.getPrototypeOf(left).constructor.name !==
          Object.getPrototypeOf(right).constructor.name
      )
        return false;
      return left.every((value, index) => Equal(value, right[index]));
    }
    function ValueType(left, right) {
      return left === right;
    }
    function Equal(left, right) {
      if ((0, guard_1.IsPlainObject)(left)) return ObjectType(left, right);
      if ((0, guard_1.IsDate)(left)) return DateType(left, right);
      if ((0, guard_1.IsTypedArray)(left)) return TypedArrayType(left, right);
      if ((0, guard_1.IsArray)(left)) return ArrayType(left, right);
      if ((0, guard_1.IsValueType)(left)) return ValueType(left, right);
      throw new Error('ValueEquals: Unable to compare value');
    }
    exports.Equal = Equal;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/system/index.js
var require_system2 = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/system/index.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __createBinding =
      (exports && exports.__createBinding) ||
      (Object.create
        ? function (o, m2, k2, k22) {
            if (k22 === void 0) k22 = k2;
            var desc = Object.getOwnPropertyDescriptor(m2, k2);
            if (
              !desc ||
              ('get' in desc
                ? !m2.__esModule
                : desc.writable || desc.configurable)
            ) {
              desc = {
                enumerable: true,
                get: function () {
                  return m2[k2];
                },
              };
            }
            Object.defineProperty(o, k22, desc);
          }
        : function (o, m2, k2, k22) {
            if (k22 === void 0) k22 = k2;
            o[k22] = m2[k2];
          });
    var __exportStar =
      (exports && exports.__exportStar) ||
      function (m2, exports2) {
        for (var p2 in m2)
          if (
            p2 !== 'default' &&
            !Object.prototype.hasOwnProperty.call(exports2, p2)
          )
            __createBinding(exports2, m2, p2);
      };
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.ValueErrorType = void 0;
    var errors_1 = require_errors();
    Object.defineProperty(exports, 'ValueErrorType', {
      enumerable: true,
      get: function () {
        return errors_1.ValueErrorType;
      },
    });
    __exportStar(require_system(), exports);
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/check.js
var require_check = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/check.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Check = exports.ValueCheckUnknownTypeError = void 0;
    var guard_1 = require_guard();
    var index_1 = require_system2();
    var deref_1 = require_deref();
    var hash_1 = require_hash();
    var Types = require_typebox();
    var ValueCheckUnknownTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super(`Unknown type`);
        this.schema = schema;
      }
    };
    exports.ValueCheckUnknownTypeError = ValueCheckUnknownTypeError;
    function IsAnyOrUnknown(schema) {
      return schema[Types.Kind] === 'Any' || schema[Types.Kind] === 'Unknown';
    }
    function IsDefined(value) {
      return value !== void 0;
    }
    function TAny(schema, references, value) {
      return true;
    }
    function TArray(schema, references, value) {
      if (!(0, guard_1.IsArray)(value)) return false;
      if (IsDefined(schema.minItems) && !(value.length >= schema.minItems)) {
        return false;
      }
      if (IsDefined(schema.maxItems) && !(value.length <= schema.maxItems)) {
        return false;
      }
      if (!value.every((value2) => Visit(schema.items, references, value2))) {
        return false;
      }
      if (
        schema.uniqueItems === true &&
        !(function () {
          const set = /* @__PURE__ */ new Set();
          for (const element of value) {
            const hashed = (0, hash_1.Hash)(element);
            if (set.has(hashed)) {
              return false;
            } else {
              set.add(hashed);
            }
          }
          return true;
        })()
      ) {
        return false;
      }
      if (
        !(
          IsDefined(schema.contains) ||
          (0, guard_1.IsNumber)(schema.minContains) ||
          (0, guard_1.IsNumber)(schema.maxContains)
        )
      ) {
        return true;
      }
      const containsSchema = IsDefined(schema.contains)
        ? schema.contains
        : Types.Type.Never();
      const containsCount = value.reduce(
        (acc, value2) =>
          Visit(containsSchema, references, value2) ? acc + 1 : acc,
        0,
      );
      if (containsCount === 0) {
        return false;
      }
      if (
        (0, guard_1.IsNumber)(schema.minContains) &&
        containsCount < schema.minContains
      ) {
        return false;
      }
      if (
        (0, guard_1.IsNumber)(schema.maxContains) &&
        containsCount > schema.maxContains
      ) {
        return false;
      }
      return true;
    }
    function TAsyncIterator(schema, references, value) {
      return (0, guard_1.IsAsyncIterator)(value);
    }
    function TBigInt(schema, references, value) {
      if (!(0, guard_1.IsBigInt)(value)) return false;
      if (
        IsDefined(schema.exclusiveMaximum) &&
        !(value < schema.exclusiveMaximum)
      ) {
        return false;
      }
      if (
        IsDefined(schema.exclusiveMinimum) &&
        !(value > schema.exclusiveMinimum)
      ) {
        return false;
      }
      if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
        return false;
      }
      if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
        return false;
      }
      if (
        IsDefined(schema.multipleOf) &&
        !(value % schema.multipleOf === BigInt(0))
      ) {
        return false;
      }
      return true;
    }
    function TBoolean(schema, references, value) {
      return (0, guard_1.IsBoolean)(value);
    }
    function TConstructor(schema, references, value) {
      return Visit(schema.returns, references, value.prototype);
    }
    function TDate(schema, references, value) {
      if (!(0, guard_1.IsDate)(value)) return false;
      if (
        IsDefined(schema.exclusiveMaximumTimestamp) &&
        !(value.getTime() < schema.exclusiveMaximumTimestamp)
      ) {
        return false;
      }
      if (
        IsDefined(schema.exclusiveMinimumTimestamp) &&
        !(value.getTime() > schema.exclusiveMinimumTimestamp)
      ) {
        return false;
      }
      if (
        IsDefined(schema.maximumTimestamp) &&
        !(value.getTime() <= schema.maximumTimestamp)
      ) {
        return false;
      }
      if (
        IsDefined(schema.minimumTimestamp) &&
        !(value.getTime() >= schema.minimumTimestamp)
      ) {
        return false;
      }
      if (
        IsDefined(schema.multipleOfTimestamp) &&
        !(value.getTime() % schema.multipleOfTimestamp === 0)
      ) {
        return false;
      }
      return true;
    }
    function TFunction(schema, references, value) {
      return (0, guard_1.IsFunction)(value);
    }
    function TInteger(schema, references, value) {
      if (!(0, guard_1.IsInteger)(value)) {
        return false;
      }
      if (
        IsDefined(schema.exclusiveMaximum) &&
        !(value < schema.exclusiveMaximum)
      ) {
        return false;
      }
      if (
        IsDefined(schema.exclusiveMinimum) &&
        !(value > schema.exclusiveMinimum)
      ) {
        return false;
      }
      if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
        return false;
      }
      if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
        return false;
      }
      if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
        return false;
      }
      return true;
    }
    function TIntersect(schema, references, value) {
      const check1 = schema.allOf.every((schema2) =>
        Visit(schema2, references, value),
      );
      if (schema.unevaluatedProperties === false) {
        const keyPattern = new RegExp(Types.KeyResolver.ResolvePattern(schema));
        const check2 = Object.getOwnPropertyNames(value).every((key) =>
          keyPattern.test(key),
        );
        return check1 && check2;
      } else if (Types.TypeGuard.TSchema(schema.unevaluatedProperties)) {
        const keyCheck = new RegExp(Types.KeyResolver.ResolvePattern(schema));
        const check2 = Object.getOwnPropertyNames(value).every(
          (key) =>
            keyCheck.test(key) ||
            Visit(schema.unevaluatedProperties, references, value[key]),
        );
        return check1 && check2;
      } else {
        return check1;
      }
    }
    function TIterator(schema, references, value) {
      return (0, guard_1.IsIterator)(value);
    }
    function TLiteral(schema, references, value) {
      return value === schema.const;
    }
    function TNever(schema, references, value) {
      return false;
    }
    function TNot(schema, references, value) {
      return !Visit(schema.not, references, value);
    }
    function TNull(schema, references, value) {
      return (0, guard_1.IsNull)(value);
    }
    function TNumber(schema, references, value) {
      if (!index_1.TypeSystemPolicy.IsNumberLike(value)) return false;
      if (
        IsDefined(schema.exclusiveMaximum) &&
        !(value < schema.exclusiveMaximum)
      ) {
        return false;
      }
      if (
        IsDefined(schema.exclusiveMinimum) &&
        !(value > schema.exclusiveMinimum)
      ) {
        return false;
      }
      if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
        return false;
      }
      if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
        return false;
      }
      if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
        return false;
      }
      return true;
    }
    function TObject(schema, references, value) {
      if (!index_1.TypeSystemPolicy.IsObjectLike(value)) return false;
      if (
        IsDefined(schema.minProperties) &&
        !(Object.getOwnPropertyNames(value).length >= schema.minProperties)
      ) {
        return false;
      }
      if (
        IsDefined(schema.maxProperties) &&
        !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)
      ) {
        return false;
      }
      const knownKeys = Object.getOwnPropertyNames(schema.properties);
      for (const knownKey of knownKeys) {
        const property = schema.properties[knownKey];
        if (schema.required && schema.required.includes(knownKey)) {
          if (!Visit(property, references, value[knownKey])) {
            return false;
          }
          if (
            (Types.ExtendsUndefined.Check(property) ||
              IsAnyOrUnknown(property)) &&
            !(knownKey in value)
          ) {
            return false;
          }
        } else {
          if (
            index_1.TypeSystemPolicy.IsExactOptionalProperty(value, knownKey) &&
            !Visit(property, references, value[knownKey])
          ) {
            return false;
          }
        }
      }
      if (schema.additionalProperties === false) {
        const valueKeys = Object.getOwnPropertyNames(value);
        if (
          schema.required &&
          schema.required.length === knownKeys.length &&
          valueKeys.length === knownKeys.length
        ) {
          return true;
        } else {
          return valueKeys.every((valueKey) => knownKeys.includes(valueKey));
        }
      } else if (typeof schema.additionalProperties === 'object') {
        const valueKeys = Object.getOwnPropertyNames(value);
        return valueKeys.every(
          (key) =>
            knownKeys.includes(key) ||
            Visit(schema.additionalProperties, references, value[key]),
        );
      } else {
        return true;
      }
    }
    function TPromise(schema, references, value) {
      return (0, guard_1.IsPromise)(value);
    }
    function TRecord(schema, references, value) {
      if (!index_1.TypeSystemPolicy.IsRecordLike(value)) {
        return false;
      }
      if (
        IsDefined(schema.minProperties) &&
        !(Object.getOwnPropertyNames(value).length >= schema.minProperties)
      ) {
        return false;
      }
      if (
        IsDefined(schema.maxProperties) &&
        !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)
      ) {
        return false;
      }
      const [patternKey, patternSchema] = Object.entries(
        schema.patternProperties,
      )[0];
      const regex = new RegExp(patternKey);
      const check1 = Object.entries(value).every(([key, value2]) => {
        return regex.test(key)
          ? Visit(patternSchema, references, value2)
          : true;
      });
      const check2 =
        typeof schema.additionalProperties === 'object'
          ? Object.entries(value).every(([key, value2]) => {
              return !regex.test(key)
                ? Visit(schema.additionalProperties, references, value2)
                : true;
            })
          : true;
      const check3 =
        schema.additionalProperties === false
          ? Object.getOwnPropertyNames(value).every((key) => {
              return regex.test(key);
            })
          : true;
      return check1 && check2 && check3;
    }
    function TRef(schema, references, value) {
      return Visit((0, deref_1.Deref)(schema, references), references, value);
    }
    function TString(schema, references, value) {
      if (!(0, guard_1.IsString)(value)) {
        return false;
      }
      if (IsDefined(schema.minLength)) {
        if (!(value.length >= schema.minLength)) return false;
      }
      if (IsDefined(schema.maxLength)) {
        if (!(value.length <= schema.maxLength)) return false;
      }
      if (IsDefined(schema.pattern)) {
        const regex = new RegExp(schema.pattern);
        if (!regex.test(value)) return false;
      }
      if (IsDefined(schema.format)) {
        if (!Types.FormatRegistry.Has(schema.format)) return false;
        const func = Types.FormatRegistry.Get(schema.format);
        return func(value);
      }
      return true;
    }
    function TSymbol(schema, references, value) {
      return (0, guard_1.IsSymbol)(value);
    }
    function TTemplateLiteral(schema, references, value) {
      return (
        (0, guard_1.IsString)(value) && new RegExp(schema.pattern).test(value)
      );
    }
    function TThis(schema, references, value) {
      return Visit((0, deref_1.Deref)(schema, references), references, value);
    }
    function TTuple(schema, references, value) {
      if (!(0, guard_1.IsArray)(value)) {
        return false;
      }
      if (schema.items === void 0 && !(value.length === 0)) {
        return false;
      }
      if (!(value.length === schema.maxItems)) {
        return false;
      }
      if (!schema.items) {
        return true;
      }
      for (let i2 = 0; i2 < schema.items.length; i2++) {
        if (!Visit(schema.items[i2], references, value[i2])) return false;
      }
      return true;
    }
    function TUndefined(schema, references, value) {
      return (0, guard_1.IsUndefined)(value);
    }
    function TUnion(schema, references, value) {
      return schema.anyOf.some((inner) => Visit(inner, references, value));
    }
    function TUint8Array(schema, references, value) {
      if (!(0, guard_1.IsUint8Array)(value)) {
        return false;
      }
      if (
        IsDefined(schema.maxByteLength) &&
        !(value.length <= schema.maxByteLength)
      ) {
        return false;
      }
      if (
        IsDefined(schema.minByteLength) &&
        !(value.length >= schema.minByteLength)
      ) {
        return false;
      }
      return true;
    }
    function TUnknown(schema, references, value) {
      return true;
    }
    function TVoid(schema, references, value) {
      return index_1.TypeSystemPolicy.IsVoidLike(value);
    }
    function TKind(schema, references, value) {
      if (!Types.TypeRegistry.Has(schema[Types.Kind])) return false;
      const func = Types.TypeRegistry.Get(schema[Types.Kind]);
      return func(schema, value);
    }
    function Visit(schema, references, value) {
      const references_ = IsDefined(schema.$id)
        ? [...references, schema]
        : references;
      const schema_ = schema;
      switch (schema_[Types.Kind]) {
        case 'Any':
          return TAny(schema_, references_, value);
        case 'Array':
          return TArray(schema_, references_, value);
        case 'AsyncIterator':
          return TAsyncIterator(schema_, references_, value);
        case 'BigInt':
          return TBigInt(schema_, references_, value);
        case 'Boolean':
          return TBoolean(schema_, references_, value);
        case 'Constructor':
          return TConstructor(schema_, references_, value);
        case 'Date':
          return TDate(schema_, references_, value);
        case 'Function':
          return TFunction(schema_, references_, value);
        case 'Integer':
          return TInteger(schema_, references_, value);
        case 'Intersect':
          return TIntersect(schema_, references_, value);
        case 'Iterator':
          return TIterator(schema_, references_, value);
        case 'Literal':
          return TLiteral(schema_, references_, value);
        case 'Never':
          return TNever(schema_, references_, value);
        case 'Not':
          return TNot(schema_, references_, value);
        case 'Null':
          return TNull(schema_, references_, value);
        case 'Number':
          return TNumber(schema_, references_, value);
        case 'Object':
          return TObject(schema_, references_, value);
        case 'Promise':
          return TPromise(schema_, references_, value);
        case 'Record':
          return TRecord(schema_, references_, value);
        case 'Ref':
          return TRef(schema_, references_, value);
        case 'String':
          return TString(schema_, references_, value);
        case 'Symbol':
          return TSymbol(schema_, references_, value);
        case 'TemplateLiteral':
          return TTemplateLiteral(schema_, references_, value);
        case 'This':
          return TThis(schema_, references_, value);
        case 'Tuple':
          return TTuple(schema_, references_, value);
        case 'Undefined':
          return TUndefined(schema_, references_, value);
        case 'Union':
          return TUnion(schema_, references_, value);
        case 'Uint8Array':
          return TUint8Array(schema_, references_, value);
        case 'Unknown':
          return TUnknown(schema_, references_, value);
        case 'Void':
          return TVoid(schema_, references_, value);
        default:
          if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
            throw new ValueCheckUnknownTypeError(schema_);
          return TKind(schema_, references_, value);
      }
    }
    function Check(...args) {
      return args.length === 3
        ? Visit(args[0], args[1], args[2])
        : Visit(args[0], [], args[1]);
    }
    exports.Check = Check;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/create.js
var require_create = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/create.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Create =
      exports.ValueCreateRecursiveInstantiationError =
      exports.ValueCreateTempateLiteralTypeError =
      exports.ValueCreateIntersectTypeError =
      exports.ValueCreateNotTypeError =
      exports.ValueCreateNeverTypeError =
      exports.ValueCreateUnknownTypeError =
        void 0;
    var guard_1 = require_guard();
    var check_1 = require_check();
    var deref_1 = require_deref();
    var Types = require_typebox();
    var ValueCreateUnknownTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super('Unknown type');
        this.schema = schema;
      }
    };
    exports.ValueCreateUnknownTypeError = ValueCreateUnknownTypeError;
    var ValueCreateNeverTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super('Never types cannot be created');
        this.schema = schema;
      }
    };
    exports.ValueCreateNeverTypeError = ValueCreateNeverTypeError;
    var ValueCreateNotTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super('Not types must have a default value');
        this.schema = schema;
      }
    };
    exports.ValueCreateNotTypeError = ValueCreateNotTypeError;
    var ValueCreateIntersectTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super(
          'Intersect produced invalid value. Consider using a default value.',
        );
        this.schema = schema;
      }
    };
    exports.ValueCreateIntersectTypeError = ValueCreateIntersectTypeError;
    var ValueCreateTempateLiteralTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super(
          'Can only create template literal values from patterns that produce finite sequences. Consider using a default value.',
        );
        this.schema = schema;
      }
    };
    exports.ValueCreateTempateLiteralTypeError =
      ValueCreateTempateLiteralTypeError;
    var ValueCreateRecursiveInstantiationError = class extends Types.TypeBoxError {
      constructor(schema, recursiveMaxDepth2) {
        super(
          'Value cannot be created as recursive type may produce value of infinite size. Consider using a default.',
        );
        this.schema = schema;
        this.recursiveMaxDepth = recursiveMaxDepth2;
      }
    };
    exports.ValueCreateRecursiveInstantiationError =
      ValueCreateRecursiveInstantiationError;
    function TAny(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return {};
      }
    }
    function TArray(schema, references) {
      if (
        schema.uniqueItems === true &&
        !(0, guard_1.HasPropertyKey)(schema, 'default')
      ) {
        throw new Error(
          'ValueCreate.Array: Array with the uniqueItems constraint requires a default value',
        );
      } else if (
        'contains' in schema &&
        !(0, guard_1.HasPropertyKey)(schema, 'default')
      ) {
        throw new Error(
          'ValueCreate.Array: Array with the contains constraint requires a default value',
        );
      } else if ('default' in schema) {
        return schema.default;
      } else if (schema.minItems !== void 0) {
        return Array.from({ length: schema.minItems }).map((item) => {
          return Visit(schema.items, references);
        });
      } else {
        return [];
      }
    }
    function TAsyncIterator(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return (async function* () {})();
      }
    }
    function TBigInt(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return BigInt(0);
      }
    }
    function TBoolean(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return false;
      }
    }
    function TConstructor(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        const value = Visit(schema.returns, references);
        if (typeof value === 'object' && !Array.isArray(value)) {
          return class {
            constructor() {
              for (const [key, val] of Object.entries(value)) {
                const self2 = this;
                self2[key] = val;
              }
            }
          };
        } else {
          return class {};
        }
      }
    }
    function TDate(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else if (schema.minimumTimestamp !== void 0) {
        return new Date(schema.minimumTimestamp);
      } else {
        return /* @__PURE__ */ new Date(0);
      }
    }
    function TFunction(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return () => Visit(schema.returns, references);
      }
    }
    function TInteger(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else if (schema.minimum !== void 0) {
        return schema.minimum;
      } else {
        return 0;
      }
    }
    function TIntersect(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        const value = schema.allOf.reduce((acc, schema2) => {
          const next = Visit(schema2, references);
          return typeof next === 'object' ? { ...acc, ...next } : next;
        }, {});
        if (!(0, check_1.Check)(schema, references, value))
          throw new ValueCreateIntersectTypeError(schema);
        return value;
      }
    }
    function TIterator(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return (function* () {})();
      }
    }
    function TLiteral(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return schema.const;
      }
    }
    function TNever(schema, references) {
      throw new ValueCreateNeverTypeError(schema);
    }
    function TNot(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        throw new ValueCreateNotTypeError(schema);
      }
    }
    function TNull(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return null;
      }
    }
    function TNumber(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else if (schema.minimum !== void 0) {
        return schema.minimum;
      } else {
        return 0;
      }
    }
    function TObject(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        const required = new Set(schema.required);
        return (
          schema.default ||
          Object.entries(schema.properties).reduce((acc, [key, schema2]) => {
            return required.has(key)
              ? { ...acc, [key]: Visit(schema2, references) }
              : { ...acc };
          }, {})
        );
      }
    }
    function TPromise(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return Promise.resolve(Visit(schema.item, references));
      }
    }
    function TRecord(schema, references) {
      const [keyPattern, valueSchema] = Object.entries(
        schema.patternProperties,
      )[0];
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else if (
        !(
          keyPattern === Types.PatternStringExact ||
          keyPattern === Types.PatternNumberExact
        )
      ) {
        const propertyKeys = keyPattern
          .slice(1, keyPattern.length - 1)
          .split('|');
        return propertyKeys.reduce((acc, key) => {
          return { ...acc, [key]: Visit(valueSchema, references) };
        }, {});
      } else {
        return {};
      }
    }
    function TRef(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return Visit((0, deref_1.Deref)(schema, references), references);
      }
    }
    function TString(schema, references) {
      if (schema.pattern !== void 0) {
        if (!(0, guard_1.HasPropertyKey)(schema, 'default')) {
          throw new Error(
            'ValueCreate.String: String types with patterns must specify a default value',
          );
        } else {
          return schema.default;
        }
      } else if (schema.format !== void 0) {
        if (!(0, guard_1.HasPropertyKey)(schema, 'default')) {
          throw new Error(
            'ValueCreate.String: String types with formats must specify a default value',
          );
        } else {
          return schema.default;
        }
      } else {
        if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
          return schema.default;
        } else if (schema.minLength !== void 0) {
          return Array.from({ length: schema.minLength })
            .map(() => '.')
            .join('');
        } else {
          return '';
        }
      }
    }
    function TSymbol(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else if ('value' in schema) {
        return Symbol.for(schema.value);
      } else {
        return Symbol();
      }
    }
    function TTemplateLiteral(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      }
      const expression = Types.TemplateLiteralParser.ParseExact(schema.pattern);
      if (!Types.TemplateLiteralFinite.Check(expression))
        throw new ValueCreateTempateLiteralTypeError(schema);
      const sequence = Types.TemplateLiteralGenerator.Generate(expression);
      return sequence.next().value;
    }
    function TThis(schema, references) {
      if (recursiveDepth++ > recursiveMaxDepth)
        throw new ValueCreateRecursiveInstantiationError(
          schema,
          recursiveMaxDepth,
        );
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return Visit((0, deref_1.Deref)(schema, references), references);
      }
    }
    function TTuple(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      }
      if (schema.items === void 0) {
        return [];
      } else {
        return Array.from({ length: schema.minItems }).map((_, index) =>
          Visit(schema.items[index], references),
        );
      }
    }
    function TUndefined(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return void 0;
      }
    }
    function TUnion(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else if (schema.anyOf.length === 0) {
        throw new Error(
          'ValueCreate.Union: Cannot create Union with zero variants',
        );
      } else {
        return Visit(schema.anyOf[0], references);
      }
    }
    function TUint8Array(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else if (schema.minByteLength !== void 0) {
        return new Uint8Array(schema.minByteLength);
      } else {
        return new Uint8Array(0);
      }
    }
    function TUnknown(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return {};
      }
    }
    function TVoid(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        return void 0;
      }
    }
    function TKind(schema, references) {
      if ((0, guard_1.HasPropertyKey)(schema, 'default')) {
        return schema.default;
      } else {
        throw new Error('User defined types must specify a default value');
      }
    }
    function Visit(schema, references) {
      const references_ = (0, guard_1.IsString)(schema.$id)
        ? [...references, schema]
        : references;
      const schema_ = schema;
      switch (schema_[Types.Kind]) {
        case 'Any':
          return TAny(schema_, references_);
        case 'Array':
          return TArray(schema_, references_);
        case 'AsyncIterator':
          return TAsyncIterator(schema_, references_);
        case 'BigInt':
          return TBigInt(schema_, references_);
        case 'Boolean':
          return TBoolean(schema_, references_);
        case 'Constructor':
          return TConstructor(schema_, references_);
        case 'Date':
          return TDate(schema_, references_);
        case 'Function':
          return TFunction(schema_, references_);
        case 'Integer':
          return TInteger(schema_, references_);
        case 'Intersect':
          return TIntersect(schema_, references_);
        case 'Iterator':
          return TIterator(schema_, references_);
        case 'Literal':
          return TLiteral(schema_, references_);
        case 'Never':
          return TNever(schema_, references_);
        case 'Not':
          return TNot(schema_, references_);
        case 'Null':
          return TNull(schema_, references_);
        case 'Number':
          return TNumber(schema_, references_);
        case 'Object':
          return TObject(schema_, references_);
        case 'Promise':
          return TPromise(schema_, references_);
        case 'Record':
          return TRecord(schema_, references_);
        case 'Ref':
          return TRef(schema_, references_);
        case 'String':
          return TString(schema_, references_);
        case 'Symbol':
          return TSymbol(schema_, references_);
        case 'TemplateLiteral':
          return TTemplateLiteral(schema_, references_);
        case 'This':
          return TThis(schema_, references_);
        case 'Tuple':
          return TTuple(schema_, references_);
        case 'Undefined':
          return TUndefined(schema_, references_);
        case 'Union':
          return TUnion(schema_, references_);
        case 'Uint8Array':
          return TUint8Array(schema_, references_);
        case 'Unknown':
          return TUnknown(schema_, references_);
        case 'Void':
          return TVoid(schema_, references_);
        default:
          if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
            throw new ValueCreateUnknownTypeError(schema_);
          return TKind(schema_, references_);
      }
    }
    var recursiveMaxDepth = 512;
    var recursiveDepth = 0;
    function Create(...args) {
      recursiveDepth = 0;
      return args.length === 2 ? Visit(args[0], args[1]) : Visit(args[0], []);
    }
    exports.Create = Create;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/cast.js
var require_cast = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/cast.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Cast =
      exports.Default =
      exports.DefaultClone =
      exports.ValueCastUnknownTypeError =
      exports.ValueCastRecursiveTypeError =
      exports.ValueCastNeverTypeError =
      exports.ValueCastArrayUniqueItemsTypeError =
        void 0;
    var guard_1 = require_guard();
    var create_1 = require_create();
    var check_1 = require_check();
    var clone_1 = require_clone();
    var deref_1 = require_deref();
    var Types = require_typebox();
    var ValueCastArrayUniqueItemsTypeError = class extends Types.TypeBoxError {
      constructor(schema, value) {
        super('Array cast produced invalid data due to uniqueItems constraint');
        this.schema = schema;
        this.value = value;
      }
    };
    exports.ValueCastArrayUniqueItemsTypeError =
      ValueCastArrayUniqueItemsTypeError;
    var ValueCastNeverTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super('Never types cannot be cast');
        this.schema = schema;
      }
    };
    exports.ValueCastNeverTypeError = ValueCastNeverTypeError;
    var ValueCastRecursiveTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super('Cannot cast recursive schemas');
        this.schema = schema;
      }
    };
    exports.ValueCastRecursiveTypeError = ValueCastRecursiveTypeError;
    var ValueCastUnknownTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super('Unknown type');
        this.schema = schema;
      }
    };
    exports.ValueCastUnknownTypeError = ValueCastUnknownTypeError;
    var UnionCastCreate;
    (function (UnionCastCreate2) {
      function Score(schema, references, value) {
        if (
          schema[Types.Kind] === 'Object' &&
          typeof value === 'object' &&
          !(0, guard_1.IsNull)(value)
        ) {
          const object = schema;
          const keys2 = Object.getOwnPropertyNames(value);
          const entries = Object.entries(object.properties);
          const [point, max] = [1 / entries.length, entries.length];
          return entries.reduce((acc, [key, schema2]) => {
            const literal =
              schema2[Types.Kind] === 'Literal' && schema2.const === value[key]
                ? max
                : 0;
            const checks = (0, check_1.Check)(schema2, references, value[key])
              ? point
              : 0;
            const exists = keys2.includes(key) ? point : 0;
            return acc + (literal + checks + exists);
          }, 0);
        } else {
          return (0, check_1.Check)(schema, references, value) ? 1 : 0;
        }
      }
      function Select(union, references, value) {
        let [select, best] = [union.anyOf[0], 0];
        for (const schema of union.anyOf) {
          const score = Score(schema, references, value);
          if (score > best) {
            select = schema;
            best = score;
          }
        }
        return select;
      }
      function Create(union, references, value) {
        if ('default' in union) {
          return union.default;
        } else {
          const schema = Select(union, references, value);
          return Cast(schema, references, value);
        }
      }
      UnionCastCreate2.Create = Create;
    })(UnionCastCreate || (UnionCastCreate = {}));
    function DefaultClone(schema, references, value) {
      return (0, check_1.Check)(schema, references, value)
        ? (0, clone_1.Clone)(value)
        : (0, create_1.Create)(schema, references);
    }
    exports.DefaultClone = DefaultClone;
    function Default(schema, references, value) {
      return (0, check_1.Check)(schema, references, value)
        ? value
        : (0, create_1.Create)(schema, references);
    }
    exports.Default = Default;
    function TArray(schema, references, value) {
      if ((0, check_1.Check)(schema, references, value))
        return (0, clone_1.Clone)(value);
      const created = (0, guard_1.IsArray)(value)
        ? (0, clone_1.Clone)(value)
        : (0, create_1.Create)(schema, references);
      const minimum =
        (0, guard_1.IsNumber)(schema.minItems) &&
        created.length < schema.minItems
          ? [
              ...created,
              ...Array.from(
                { length: schema.minItems - created.length },
                () => null,
              ),
            ]
          : created;
      const maximum =
        (0, guard_1.IsNumber)(schema.maxItems) &&
        minimum.length > schema.maxItems
          ? minimum.slice(0, schema.maxItems)
          : minimum;
      const casted = maximum.map((value2) =>
        Visit(schema.items, references, value2),
      );
      if (schema.uniqueItems !== true) return casted;
      const unique = [...new Set(casted)];
      if (!(0, check_1.Check)(schema, references, unique))
        throw new ValueCastArrayUniqueItemsTypeError(schema, unique);
      return unique;
    }
    function TConstructor(schema, references, value) {
      if ((0, check_1.Check)(schema, references, value))
        return (0, create_1.Create)(schema, references);
      const required = new Set(schema.returns.required || []);
      const result = function () {};
      for (const [key, property] of Object.entries(schema.returns.properties)) {
        if (!required.has(key) && value.prototype[key] === void 0) continue;
        result.prototype[key] = Visit(
          property,
          references,
          value.prototype[key],
        );
      }
      return result;
    }
    function TIntersect(schema, references, value) {
      const created = (0, create_1.Create)(schema, references);
      const mapped =
        (0, guard_1.IsPlainObject)(created) && (0, guard_1.IsPlainObject)(value)
          ? { ...created, ...value }
          : value;
      return (0, check_1.Check)(schema, references, mapped)
        ? mapped
        : (0, create_1.Create)(schema, references);
    }
    function TNever(schema, references, value) {
      throw new ValueCastNeverTypeError(schema);
    }
    function TObject(schema, references, value) {
      if ((0, check_1.Check)(schema, references, value)) return value;
      if (value === null || typeof value !== 'object')
        return (0, create_1.Create)(schema, references);
      const required = new Set(schema.required || []);
      const result = {};
      for (const [key, property] of Object.entries(schema.properties)) {
        if (!required.has(key) && value[key] === void 0) continue;
        result[key] = Visit(property, references, value[key]);
      }
      if (typeof schema.additionalProperties === 'object') {
        const propertyNames = Object.getOwnPropertyNames(schema.properties);
        for (const propertyName of Object.getOwnPropertyNames(value)) {
          if (propertyNames.includes(propertyName)) continue;
          result[propertyName] = Visit(
            schema.additionalProperties,
            references,
            value[propertyName],
          );
        }
      }
      return result;
    }
    function TRecord(schema, references, value) {
      if ((0, check_1.Check)(schema, references, value))
        return (0, clone_1.Clone)(value);
      if (
        value === null ||
        typeof value !== 'object' ||
        Array.isArray(value) ||
        value instanceof Date
      )
        return (0, create_1.Create)(schema, references);
      const subschemaPropertyName = Object.getOwnPropertyNames(
        schema.patternProperties,
      )[0];
      const subschema = schema.patternProperties[subschemaPropertyName];
      const result = {};
      for (const [propKey, propValue] of Object.entries(value)) {
        result[propKey] = Visit(subschema, references, propValue);
      }
      return result;
    }
    function TRef(schema, references, value) {
      return Visit((0, deref_1.Deref)(schema, references), references, value);
    }
    function TThis(schema, references, value) {
      return Visit((0, deref_1.Deref)(schema, references), references, value);
    }
    function TTuple(schema, references, value) {
      if ((0, check_1.Check)(schema, references, value))
        return (0, clone_1.Clone)(value);
      if (!(0, guard_1.IsArray)(value))
        return (0, create_1.Create)(schema, references);
      if (schema.items === void 0) return [];
      return schema.items.map((schema2, index) =>
        Visit(schema2, references, value[index]),
      );
    }
    function TUnion(schema, references, value) {
      return (0, check_1.Check)(schema, references, value)
        ? (0, clone_1.Clone)(value)
        : UnionCastCreate.Create(schema, references, value);
    }
    function Visit(schema, references, value) {
      const references_ = (0, guard_1.IsString)(schema.$id)
        ? [...references, schema]
        : references;
      const schema_ = schema;
      switch (schema[Types.Kind]) {
        case 'Array':
          return TArray(schema_, references_, value);
        case 'Constructor':
          return TConstructor(schema_, references_, value);
        case 'Intersect':
          return TIntersect(schema_, references_, value);
        case 'Never':
          return TNever(schema_, references_, value);
        case 'Object':
          return TObject(schema_, references_, value);
        case 'Record':
          return TRecord(schema_, references_, value);
        case 'Ref':
          return TRef(schema_, references_, value);
        case 'This':
          return TThis(schema_, references_, value);
        case 'Tuple':
          return TTuple(schema_, references_, value);
        case 'Union':
          return TUnion(schema_, references_, value);
        case 'Date':
        case 'Symbol':
        case 'Uint8Array':
          return DefaultClone(schema, references, value);
        case 'Any':
        case 'AsyncIterator':
        case 'BigInt':
        case 'Boolean':
        case 'Function':
        case 'Integer':
        case 'Iterator':
        case 'Literal':
        case 'Not':
        case 'Null':
        case 'Number':
        case 'Promise':
        case 'String':
        case 'TemplateLiteral':
        case 'Undefined':
        case 'Unknown':
        case 'Void':
          return Default(schema_, references_, value);
        default:
          if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
            throw new ValueCastUnknownTypeError(schema_);
          return Default(schema_, references_, value);
      }
    }
    function Cast(...args) {
      return args.length === 3
        ? Visit(args[0], args[1], args[2])
        : Visit(args[0], [], args[1]);
    }
    exports.Cast = Cast;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/convert.js
var require_convert = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/convert.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Convert =
      exports.Default =
      exports.ValueConvertUnknownTypeError =
        void 0;
    var guard_1 = require_guard();
    var clone_1 = require_clone();
    var check_1 = require_check();
    var deref_1 = require_deref();
    var Types = require_typebox();
    var ValueConvertUnknownTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super('Unknown type');
        this.schema = schema;
      }
    };
    exports.ValueConvertUnknownTypeError = ValueConvertUnknownTypeError;
    function IsStringNumeric(value) {
      return (
        (0, guard_1.IsString)(value) &&
        !isNaN(value) &&
        !isNaN(parseFloat(value))
      );
    }
    function IsValueToString(value) {
      return (
        (0, guard_1.IsBigInt)(value) ||
        (0, guard_1.IsBoolean)(value) ||
        (0, guard_1.IsNumber)(value)
      );
    }
    function IsValueTrue(value) {
      return (
        value === true ||
        ((0, guard_1.IsNumber)(value) && value === 1) ||
        ((0, guard_1.IsBigInt)(value) && value === BigInt('1')) ||
        ((0, guard_1.IsString)(value) &&
          (value.toLowerCase() === 'true' || value === '1'))
      );
    }
    function IsValueFalse(value) {
      return (
        value === false ||
        ((0, guard_1.IsNumber)(value) &&
          (value === 0 || Object.is(value, -0))) ||
        ((0, guard_1.IsBigInt)(value) && value === BigInt('0')) ||
        ((0, guard_1.IsString)(value) &&
          (value.toLowerCase() === 'false' || value === '0' || value === '-0'))
      );
    }
    function IsTimeStringWithTimeZone(value) {
      return (
        (0, guard_1.IsString)(value) &&
        /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(
          value,
        )
      );
    }
    function IsTimeStringWithoutTimeZone(value) {
      return (
        (0, guard_1.IsString)(value) &&
        /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value)
      );
    }
    function IsDateTimeStringWithTimeZone(value) {
      return (
        (0, guard_1.IsString)(value) &&
        /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(
          value,
        )
      );
    }
    function IsDateTimeStringWithoutTimeZone(value) {
      return (
        (0, guard_1.IsString)(value) &&
        /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(
          value,
        )
      );
    }
    function IsDateString(value) {
      return (
        (0, guard_1.IsString)(value) &&
        /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value)
      );
    }
    function TryConvertLiteralString(value, target) {
      const conversion = TryConvertString(value);
      return conversion === target ? conversion : value;
    }
    function TryConvertLiteralNumber(value, target) {
      const conversion = TryConvertNumber(value);
      return conversion === target ? conversion : value;
    }
    function TryConvertLiteralBoolean(value, target) {
      const conversion = TryConvertBoolean(value);
      return conversion === target ? conversion : value;
    }
    function TryConvertLiteral(schema, value) {
      if (typeof schema.const === 'string') {
        return TryConvertLiteralString(value, schema.const);
      } else if (typeof schema.const === 'number') {
        return TryConvertLiteralNumber(value, schema.const);
      } else if (typeof schema.const === 'boolean') {
        return TryConvertLiteralBoolean(value, schema.const);
      } else {
        return (0, clone_1.Clone)(value);
      }
    }
    function TryConvertBoolean(value) {
      return IsValueTrue(value) ? true : IsValueFalse(value) ? false : value;
    }
    function TryConvertBigInt(value) {
      return IsStringNumeric(value)
        ? BigInt(parseInt(value))
        : (0, guard_1.IsNumber)(value)
        ? BigInt(value | 0)
        : IsValueFalse(value)
        ? BigInt(0)
        : IsValueTrue(value)
        ? BigInt(1)
        : value;
    }
    function TryConvertString(value) {
      return IsValueToString(value)
        ? value.toString()
        : (0, guard_1.IsSymbol)(value) && value.description !== void 0
        ? value.description.toString()
        : value;
    }
    function TryConvertNumber(value) {
      return IsStringNumeric(value)
        ? parseFloat(value)
        : IsValueTrue(value)
        ? 1
        : IsValueFalse(value)
        ? 0
        : value;
    }
    function TryConvertInteger(value) {
      return IsStringNumeric(value)
        ? parseInt(value)
        : (0, guard_1.IsNumber)(value)
        ? value | 0
        : IsValueTrue(value)
        ? 1
        : IsValueFalse(value)
        ? 0
        : value;
    }
    function TryConvertNull(value) {
      return (0, guard_1.IsString)(value) && value.toLowerCase() === 'null'
        ? null
        : value;
    }
    function TryConvertUndefined(value) {
      return (0, guard_1.IsString)(value) && value === 'undefined'
        ? void 0
        : value;
    }
    function TryConvertDate(value) {
      return (0, guard_1.IsDate)(value)
        ? value
        : (0, guard_1.IsNumber)(value)
        ? new Date(value)
        : IsValueTrue(value)
        ? /* @__PURE__ */ new Date(1)
        : IsValueFalse(value)
        ? /* @__PURE__ */ new Date(0)
        : IsStringNumeric(value)
        ? new Date(parseInt(value))
        : IsTimeStringWithoutTimeZone(value)
        ? /* @__PURE__ */ new Date(`1970-01-01T${value}.000Z`)
        : IsTimeStringWithTimeZone(value)
        ? /* @__PURE__ */ new Date(`1970-01-01T${value}`)
        : IsDateTimeStringWithoutTimeZone(value)
        ? /* @__PURE__ */ new Date(`${value}.000Z`)
        : IsDateTimeStringWithTimeZone(value)
        ? new Date(value)
        : IsDateString(value)
        ? /* @__PURE__ */ new Date(`${value}T00:00:00.000Z`)
        : value;
    }
    function Default(value) {
      return value;
    }
    exports.Default = Default;
    function TArray(schema, references, value) {
      if ((0, guard_1.IsArray)(value)) {
        return value.map((value2) => Visit(schema.items, references, value2));
      }
      return value;
    }
    function TBigInt(schema, references, value) {
      return TryConvertBigInt(value);
    }
    function TBoolean(schema, references, value) {
      return TryConvertBoolean(value);
    }
    function TDate(schema, references, value) {
      return TryConvertDate(value);
    }
    function TInteger(schema, references, value) {
      return TryConvertInteger(value);
    }
    function TIntersect(schema, references, value) {
      return schema.allOf.every((schema2) => Types.TypeGuard.TObject(schema2))
        ? Visit(Types.Type.Composite(schema.allOf), references, value)
        : Visit(schema.allOf[0], references, value);
    }
    function TLiteral(schema, references, value) {
      return TryConvertLiteral(schema, value);
    }
    function TNull(schema, references, value) {
      return TryConvertNull(value);
    }
    function TNumber(schema, references, value) {
      return TryConvertNumber(value);
    }
    function TObject(schema, references, value) {
      if ((0, guard_1.IsObject)(value))
        return Object.getOwnPropertyNames(schema.properties).reduce(
          (acc, key) => {
            return value[key] !== void 0
              ? {
                  ...acc,
                  [key]: Visit(schema.properties[key], references, value[key]),
                }
              : { ...acc };
          },
          value,
        );
      return value;
    }
    function TRecord(schema, references, value) {
      const propertyKey = Object.getOwnPropertyNames(
        schema.patternProperties,
      )[0];
      const property = schema.patternProperties[propertyKey];
      const result = {};
      for (const [propKey, propValue] of Object.entries(value)) {
        result[propKey] = Visit(property, references, propValue);
      }
      return result;
    }
    function TRef(schema, references, value) {
      return Visit((0, deref_1.Deref)(schema, references), references, value);
    }
    function TString(schema, references, value) {
      return TryConvertString(value);
    }
    function TSymbol(schema, references, value) {
      return (0, guard_1.IsString)(value) || (0, guard_1.IsNumber)(value)
        ? Symbol(value)
        : value;
    }
    function TThis(schema, references, value) {
      return Visit((0, deref_1.Deref)(schema, references), references, value);
    }
    function TTuple(schema, references, value) {
      if (
        (0, guard_1.IsArray)(value) &&
        !(0, guard_1.IsUndefined)(schema.items)
      ) {
        return value.map((value2, index) => {
          return index < schema.items.length
            ? Visit(schema.items[index], references, value2)
            : value2;
        });
      }
      return value;
    }
    function TUndefined(schema, references, value) {
      return TryConvertUndefined(value);
    }
    function TUnion(schema, references, value) {
      for (const subschema of schema.anyOf) {
        const converted = Visit(subschema, references, value);
        if ((0, check_1.Check)(subschema, references, converted)) {
          return converted;
        }
      }
      return value;
    }
    function Visit(schema, references, value) {
      const references_ = (0, guard_1.IsString)(schema.$id)
        ? [...references, schema]
        : references;
      const schema_ = schema;
      switch (schema[Types.Kind]) {
        case 'Array':
          return TArray(schema_, references_, value);
        case 'BigInt':
          return TBigInt(schema_, references_, value);
        case 'Boolean':
          return TBoolean(schema_, references_, value);
        case 'Date':
          return TDate(schema_, references_, value);
        case 'Integer':
          return TInteger(schema_, references_, value);
        case 'Intersect':
          return TIntersect(schema_, references_, value);
        case 'Literal':
          return TLiteral(schema_, references_, value);
        case 'Null':
          return TNull(schema_, references_, value);
        case 'Number':
          return TNumber(schema_, references_, value);
        case 'Object':
          return TObject(schema_, references_, value);
        case 'Record':
          return TRecord(schema_, references_, value);
        case 'Ref':
          return TRef(schema_, references_, value);
        case 'String':
          return TString(schema_, references_, value);
        case 'Symbol':
          return TSymbol(schema_, references_, value);
        case 'This':
          return TThis(schema_, references_, value);
        case 'Tuple':
          return TTuple(schema_, references_, value);
        case 'Undefined':
          return TUndefined(schema_, references_, value);
        case 'Union':
          return TUnion(schema_, references_, value);
        case 'Any':
        case 'AsyncIterator':
        case 'Constructor':
        case 'Function':
        case 'Iterator':
        case 'Never':
        case 'Promise':
        case 'TemplateLiteral':
        case 'Uint8Array':
        case 'Unknown':
        case 'Void':
          return Default(value);
        default:
          if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
            throw new ValueConvertUnknownTypeError(schema_);
          return Default(value);
      }
    }
    function Convert(...args) {
      return args.length === 3
        ? Visit(args[0], args[1], args[2])
        : Visit(args[0], [], args[1]);
    }
    exports.Convert = Convert;
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/transform.js
var require_transform = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/transform.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.EncodeTransform =
      exports.DecodeTransform =
      exports.HasTransform =
      exports.TransformEncodeError =
      exports.TransformDecodeError =
      exports.TransformEncodeCheckError =
      exports.TransformDecodeCheckError =
      exports.TransformUnknownTypeError =
        void 0;
    var guard_1 = require_guard();
    var deref_1 = require_deref();
    var Types = require_typebox();
    var TransformUnknownTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super(`Unknown type`);
        this.schema = schema;
      }
    };
    exports.TransformUnknownTypeError = TransformUnknownTypeError;
    var TransformDecodeCheckError = class extends Types.TypeBoxError {
      constructor(schema, value, error) {
        super(`Unable to decode due to invalid value`);
        this.schema = schema;
        this.value = value;
        this.error = error;
      }
    };
    exports.TransformDecodeCheckError = TransformDecodeCheckError;
    var TransformEncodeCheckError = class extends Types.TypeBoxError {
      constructor(schema, value, error) {
        super(`Unable to encode due to invalid value`);
        this.schema = schema;
        this.value = value;
        this.error = error;
      }
    };
    exports.TransformEncodeCheckError = TransformEncodeCheckError;
    var TransformDecodeError = class extends Types.TypeBoxError {
      constructor(schema, value, error) {
        super(`${error instanceof Error ? error.message : 'Unknown error'}`);
        this.schema = schema;
        this.value = value;
      }
    };
    exports.TransformDecodeError = TransformDecodeError;
    var TransformEncodeError = class extends Types.TypeBoxError {
      constructor(schema, value, error) {
        super(`${error instanceof Error ? error.message : 'Unknown error'}`);
        this.schema = schema;
        this.value = value;
      }
    };
    exports.TransformEncodeError = TransformEncodeError;
    var HasTransform;
    (function (HasTransform2) {
      function TArray(schema, references) {
        return (
          Types.TypeGuard.TTransform(schema) || Visit(schema.items, references)
        );
      }
      function TAsyncIterator(schema, references) {
        return (
          Types.TypeGuard.TTransform(schema) || Visit(schema.items, references)
        );
      }
      function TConstructor(schema, references) {
        return (
          Types.TypeGuard.TTransform(schema) ||
          Visit(schema.returns, references) ||
          schema.parameters.some((schema2) => Visit(schema2, references))
        );
      }
      function TFunction(schema, references) {
        return (
          Types.TypeGuard.TTransform(schema) ||
          Visit(schema.returns, references) ||
          schema.parameters.some((schema2) => Visit(schema2, references))
        );
      }
      function TIntersect(schema, references) {
        return (
          Types.TypeGuard.TTransform(schema) ||
          Types.TypeGuard.TTransform(schema.unevaluatedProperties) ||
          schema.allOf.some((schema2) => Visit(schema2, references))
        );
      }
      function TIterator(schema, references) {
        return (
          Types.TypeGuard.TTransform(schema) || Visit(schema.items, references)
        );
      }
      function TNot(schema, references) {
        return (
          Types.TypeGuard.TTransform(schema) || Visit(schema.not, references)
        );
      }
      function TObject(schema, references) {
        return (
          Types.TypeGuard.TTransform(schema) ||
          Object.values(schema.properties).some((schema2) =>
            Visit(schema2, references),
          ) ||
          (Types.TypeGuard.TSchema(schema.additionalProperties) &&
            Visit(schema.additionalProperties, references))
        );
      }
      function TPromise(schema, references) {
        return (
          Types.TypeGuard.TTransform(schema) || Visit(schema.item, references)
        );
      }
      function TRecord(schema, references) {
        const pattern = Object.getOwnPropertyNames(schema.patternProperties)[0];
        const property = schema.patternProperties[pattern];
        return (
          Types.TypeGuard.TTransform(schema) ||
          Visit(property, references) ||
          (Types.TypeGuard.TSchema(schema.additionalProperties) &&
            Types.TypeGuard.TTransform(schema.additionalProperties))
        );
      }
      function TRef(schema, references) {
        if (Types.TypeGuard.TTransform(schema)) return true;
        return Visit((0, deref_1.Deref)(schema, references), references);
      }
      function TThis(schema, references) {
        if (Types.TypeGuard.TTransform(schema)) return true;
        return Visit((0, deref_1.Deref)(schema, references), references);
      }
      function TTuple(schema, references) {
        return (
          Types.TypeGuard.TTransform(schema) ||
          (Types.TypeGuard.TSchema(schema.items) &&
            schema.items.some((schema2) => Visit(schema2, references)))
        );
      }
      function TUnion(schema, references) {
        return (
          Types.TypeGuard.TTransform(schema) ||
          schema.anyOf.some((schema2) => Visit(schema2, references))
        );
      }
      function Visit(schema, references) {
        const references_ = (0, guard_1.IsString)(schema.$id)
          ? [...references, schema]
          : references;
        const schema_ = schema;
        if (schema.$id && visited.has(schema.$id)) return false;
        if (schema.$id) visited.add(schema.$id);
        switch (schema[Types.Kind]) {
          case 'Array':
            return TArray(schema_, references_);
          case 'AsyncIterator':
            return TAsyncIterator(schema_, references_);
          case 'Constructor':
            return TConstructor(schema_, references_);
          case 'Function':
            return TFunction(schema_, references_);
          case 'Intersect':
            return TIntersect(schema_, references_);
          case 'Iterator':
            return TIterator(schema_, references_);
          case 'Not':
            return TNot(schema_, references_);
          case 'Object':
            return TObject(schema_, references_);
          case 'Promise':
            return TPromise(schema_, references_);
          case 'Record':
            return TRecord(schema_, references_);
          case 'Ref':
            return TRef(schema_, references_);
          case 'This':
            return TThis(schema_, references_);
          case 'Tuple':
            return TTuple(schema_, references_);
          case 'Union':
            return TUnion(schema_, references_);
          case 'Any':
          case 'BigInt':
          case 'Boolean':
          case 'Date':
          case 'Integer':
          case 'Literal':
          case 'Never':
          case 'Null':
          case 'Number':
          case 'String':
          case 'Symbol':
          case 'TemplateLiteral':
          case 'Undefined':
          case 'Uint8Array':
          case 'Unknown':
          case 'Void':
            return Types.TypeGuard.TTransform(schema);
          default:
            if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
              throw new TransformUnknownTypeError(schema_);
            return Types.TypeGuard.TTransform(schema);
        }
      }
      const visited = /* @__PURE__ */ new Set();
      function Has(schema, references) {
        visited.clear();
        return Visit(schema, references);
      }
      HasTransform2.Has = Has;
    })(HasTransform || (exports.HasTransform = HasTransform = {}));
    var DecodeTransform;
    (function (DecodeTransform2) {
      function Default(schema, value) {
        try {
          return Types.TypeGuard.TTransform(schema)
            ? schema[Types.Transform].Decode(value)
            : value;
        } catch (error) {
          throw new TransformDecodeError(schema, value, error);
        }
      }
      function TArray(schema, references, value) {
        const elements1 = value.map((value2) =>
          Visit(schema.items, references, value2),
        );
        return Default(schema, elements1);
      }
      function TIntersect(schema, references, value) {
        if (
          !(0, guard_1.IsPlainObject)(value) ||
          (0, guard_1.IsValueType)(value)
        )
          return Default(schema, value);
        const keys2 = Types.KeyResolver.ResolveKeys(schema, {
          includePatterns: false,
        });
        const properties1 = Object.entries(value).reduce(
          (acc, [key, value2]) => {
            return !keys2.includes(key)
              ? { ...acc, [key]: value2 }
              : {
                  ...acc,
                  [key]: Default(
                    Types.IndexedAccessor.Resolve(schema, [key]),
                    value2,
                  ),
                };
          },
          {},
        );
        if (!Types.TypeGuard.TTransform(schema.unevaluatedProperties))
          return Default(schema, properties1);
        const properties2 = Object.entries(properties1).reduce(
          (acc, [key, value2]) => {
            return keys2.includes(key)
              ? { ...acc, [key]: value2 }
              : {
                  ...acc,
                  [key]: Default(schema.unevaluatedProperties, value2),
                };
          },
          {},
        );
        return Default(schema, properties2);
      }
      function TNot(schema, references, value) {
        const value1 = Visit(schema.not, references, value);
        return Default(schema, value1);
      }
      function TObject(schema, references, value) {
        if (!(0, guard_1.IsPlainObject)(value)) return Default(schema, value);
        const properties1 = Object.entries(value).reduce(
          (acc, [key, value2]) => {
            return !(key in schema.properties)
              ? { ...acc, [key]: value2 }
              : {
                  ...acc,
                  [key]: Visit(schema.properties[key], references, value2),
                };
          },
          {},
        );
        if (!Types.TypeGuard.TSchema(schema.additionalProperties))
          return Default(schema, properties1);
        const additionalProperties = schema.additionalProperties;
        const properties2 = Object.entries(properties1).reduce(
          (acc, [key, value2]) => {
            return key in schema.properties
              ? { ...acc, [key]: value2 }
              : {
                  ...acc,
                  [key]: Visit(additionalProperties, references, value2),
                };
          },
          {},
        );
        return Default(schema, properties2);
      }
      function TRecord(schema, references, value) {
        if (!(0, guard_1.IsPlainObject)(value)) return Default(schema, value);
        const pattern = Object.getOwnPropertyNames(schema.patternProperties)[0];
        const property = schema.patternProperties[pattern];
        const regex = new RegExp(pattern);
        const properties1 = Object.entries(value).reduce(
          (acc, [key, value2]) => {
            return !regex.test(key)
              ? { ...acc, [key]: value2 }
              : { ...acc, [key]: Visit(property, references, value2) };
          },
          {},
        );
        if (!Types.TypeGuard.TSchema(schema.additionalProperties))
          return Default(schema, properties1);
        const additionalProperties = schema.additionalProperties;
        const properties2 = Object.entries(properties1).reduce(
          (acc, [key, value2]) => {
            return regex.test(key)
              ? { ...acc, [key]: value2 }
              : {
                  ...acc,
                  [key]: Visit(additionalProperties, references, value2),
                };
          },
          {},
        );
        return Default(schema, properties2);
      }
      function TRef(schema, references, value) {
        const target = (0, deref_1.Deref)(schema, references);
        const resolved = Visit(target, references, value);
        return Default(schema, resolved);
      }
      function TThis(schema, references, value) {
        const target = (0, deref_1.Deref)(schema, references);
        const resolved = Visit(target, references, value);
        return Default(schema, resolved);
      }
      function TTuple(schema, references, value) {
        const value1 = (0, guard_1.IsArray)(schema.items)
          ? schema.items.map((schema2, index) =>
              Visit(schema2, references, value[index]),
            )
          : [];
        return Default(schema, value1);
      }
      function TUnion(schema, references, value) {
        const value1 = Default(schema, value);
        for (const subschema of schema.anyOf) {
          if (!checkFunction(subschema, references, value1)) continue;
          return Visit(subschema, references, value1);
        }
        return value1;
      }
      function Visit(schema, references, value) {
        const references_ =
          typeof schema.$id === 'string' ? [...references, schema] : references;
        const schema_ = schema;
        switch (schema[Types.Kind]) {
          case 'Array':
            return TArray(schema_, references_, value);
          case 'Intersect':
            return TIntersect(schema_, references_, value);
          case 'Not':
            return TNot(schema_, references_, value);
          case 'Object':
            return TObject(schema_, references_, value);
          case 'Record':
            return TRecord(schema_, references_, value);
          case 'Ref':
            return TRef(schema_, references_, value);
          case 'Symbol':
            return Default(schema_, value);
          case 'This':
            return TThis(schema_, references_, value);
          case 'Tuple':
            return TTuple(schema_, references_, value);
          case 'Union':
            return TUnion(schema_, references_, value);
          case 'Any':
          case 'AsyncIterator':
          case 'BigInt':
          case 'Boolean':
          case 'Constructor':
          case 'Date':
          case 'Function':
          case 'Integer':
          case 'Iterator':
          case 'Literal':
          case 'Never':
          case 'Null':
          case 'Number':
          case 'Promise':
          case 'String':
          case 'TemplateLiteral':
          case 'Undefined':
          case 'Uint8Array':
          case 'Unknown':
          case 'Void':
            return Default(schema_, value);
          default:
            if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
              throw new TransformUnknownTypeError(schema_);
            return Default(schema_, value);
        }
      }
      let checkFunction = () => false;
      function Decode(schema, references, value, check) {
        checkFunction = check;
        return Visit(schema, references, value);
      }
      DecodeTransform2.Decode = Decode;
    })(DecodeTransform || (exports.DecodeTransform = DecodeTransform = {}));
    var EncodeTransform;
    (function (EncodeTransform2) {
      function Default(schema, value) {
        try {
          return Types.TypeGuard.TTransform(schema)
            ? schema[Types.Transform].Encode(value)
            : value;
        } catch (error) {
          throw new TransformEncodeError(schema, value, error);
        }
      }
      function TArray(schema, references, value) {
        const elements1 = Default(schema, value);
        return elements1.map((value2) =>
          Visit(schema.items, references, value2),
        );
      }
      function TIntersect(schema, references, value) {
        const properties1 = Default(schema, value);
        if (
          !(0, guard_1.IsPlainObject)(value) ||
          (0, guard_1.IsValueType)(value)
        )
          return properties1;
        const keys2 = Types.KeyResolver.ResolveKeys(schema, {
          includePatterns: false,
        });
        const properties2 = Object.entries(properties1).reduce(
          (acc, [key, value2]) => {
            return !keys2.includes(key)
              ? { ...acc, [key]: value2 }
              : {
                  ...acc,
                  [key]: Default(
                    Types.IndexedAccessor.Resolve(schema, [key]),
                    value2,
                  ),
                };
          },
          {},
        );
        if (!Types.TypeGuard.TTransform(schema.unevaluatedProperties))
          return Default(schema, properties2);
        return Object.entries(properties2).reduce((acc, [key, value2]) => {
          return keys2.includes(key)
            ? { ...acc, [key]: value2 }
            : { ...acc, [key]: Default(schema.unevaluatedProperties, value2) };
        }, {});
      }
      function TNot(schema, references, value) {
        const value1 = Default(schema, value);
        return Default(schema.not, value1);
      }
      function TObject(schema, references, value) {
        const properties1 = Default(schema, value);
        if (!(0, guard_1.IsPlainObject)(value)) return properties1;
        const properties2 = Object.entries(properties1).reduce(
          (acc, [key, value2]) => {
            return !(key in schema.properties)
              ? { ...acc, [key]: value2 }
              : {
                  ...acc,
                  [key]: Visit(schema.properties[key], references, value2),
                };
          },
          {},
        );
        if (!Types.TypeGuard.TSchema(schema.additionalProperties))
          return properties2;
        const additionalProperties = schema.additionalProperties;
        return Object.entries(properties2).reduce((acc, [key, value2]) => {
          return key in schema.properties
            ? { ...acc, [key]: value2 }
            : {
                ...acc,
                [key]: Visit(additionalProperties, references, value2),
              };
        }, {});
      }
      function TRecord(schema, references, value) {
        const properties1 = Default(schema, value);
        if (!(0, guard_1.IsPlainObject)(value)) return properties1;
        const pattern = Object.getOwnPropertyNames(schema.patternProperties)[0];
        const property = schema.patternProperties[pattern];
        const regex = new RegExp(pattern);
        const properties2 = Object.entries(properties1).reduce(
          (acc, [key, value2]) => {
            return !regex.test(key)
              ? { ...acc, [key]: value2 }
              : { ...acc, [key]: Visit(property, references, value2) };
          },
          {},
        );
        if (!Types.TypeGuard.TSchema(schema.additionalProperties))
          return Default(schema, properties2);
        const additionalProperties = schema.additionalProperties;
        return Object.entries(properties2).reduce((acc, [key, value2]) => {
          return regex.test(key)
            ? { ...acc, [key]: value2 }
            : {
                ...acc,
                [key]: Visit(additionalProperties, references, value2),
              };
        }, {});
      }
      function TRef(schema, references, value) {
        const target = (0, deref_1.Deref)(schema, references);
        const resolved = Visit(target, references, value);
        return Default(schema, resolved);
      }
      function TThis(schema, references, value) {
        const target = (0, deref_1.Deref)(schema, references);
        const resolved = Visit(target, references, value);
        return Default(schema, resolved);
      }
      function TTuple(schema, references, value) {
        const value1 = Default(schema, value);
        return (0, guard_1.IsArray)(schema.items)
          ? schema.items.map((schema2, index) =>
              Visit(schema2, references, value1[index]),
            )
          : [];
      }
      function TUnion(schema, references, value) {
        for (const subschema of schema.anyOf) {
          if (!checkFunction(subschema, references, value)) continue;
          const value1 = Visit(subschema, references, value);
          return Default(schema, value1);
        }
        for (const subschema of schema.anyOf) {
          const value1 = Visit(subschema, references, value);
          if (!checkFunction(schema, references, value1)) continue;
          return Default(schema, value1);
        }
        return Default(schema, value);
      }
      function Visit(schema, references, value) {
        const references_ =
          typeof schema.$id === 'string' ? [...references, schema] : references;
        const schema_ = schema;
        switch (schema[Types.Kind]) {
          case 'Array':
            return TArray(schema_, references_, value);
          case 'Intersect':
            return TIntersect(schema_, references_, value);
          case 'Not':
            return TNot(schema_, references_, value);
          case 'Object':
            return TObject(schema_, references_, value);
          case 'Record':
            return TRecord(schema_, references_, value);
          case 'Ref':
            return TRef(schema_, references_, value);
          case 'This':
            return TThis(schema_, references_, value);
          case 'Tuple':
            return TTuple(schema_, references_, value);
          case 'Union':
            return TUnion(schema_, references_, value);
          case 'Any':
          case 'AsyncIterator':
          case 'BigInt':
          case 'Boolean':
          case 'Constructor':
          case 'Date':
          case 'Function':
          case 'Integer':
          case 'Iterator':
          case 'Literal':
          case 'Never':
          case 'Null':
          case 'Number':
          case 'Promise':
          case 'String':
          case 'Symbol':
          case 'TemplateLiteral':
          case 'Undefined':
          case 'Uint8Array':
          case 'Unknown':
          case 'Void':
            return Default(schema_, value);
          default:
            if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
              throw new TransformUnknownTypeError(schema_);
            return Default(schema_, value);
        }
      }
      let checkFunction = () => false;
      function Encode(schema, references, value, check) {
        checkFunction = check;
        return Visit(schema, references, value);
      }
      EncodeTransform2.Encode = Encode;
    })(EncodeTransform || (exports.EncodeTransform = EncodeTransform = {}));
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/value.js
var require_value = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/value.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Value = void 0;
    var ValueErrors = require_errors2();
    var ValueMutate = require_mutate();
    var ValueHash = require_hash();
    var ValueEqual = require_equal();
    var ValueCast = require_cast();
    var ValueClone = require_clone();
    var ValueConvert = require_convert();
    var ValueCreate = require_create();
    var ValueCheck = require_check();
    var ValueDelta = require_delta();
    var ValueTransform = require_transform();
    var Value;
    (function (Value2) {
      function Cast(...args) {
        return ValueCast.Cast.apply(ValueCast, args);
      }
      Value2.Cast = Cast;
      function Create(...args) {
        return ValueCreate.Create.apply(ValueCreate, args);
      }
      Value2.Create = Create;
      function Check(...args) {
        return ValueCheck.Check.apply(ValueCheck, args);
      }
      Value2.Check = Check;
      function Convert(...args) {
        return ValueConvert.Convert.apply(ValueConvert, args);
      }
      Value2.Convert = Convert;
      function Clone(value) {
        return ValueClone.Clone(value);
      }
      Value2.Clone = Clone;
      function Decode(...args) {
        const [schema, references, value] =
          args.length === 3
            ? [args[0], args[1], args[2]]
            : [args[0], [], args[1]];
        if (!Check(schema, references, value))
          throw new ValueTransform.TransformDecodeCheckError(
            schema,
            value,
            Errors(schema, references, value).First(),
          );
        return ValueTransform.DecodeTransform.Decode(
          schema,
          references,
          value,
          ValueCheck.Check,
        );
      }
      Value2.Decode = Decode;
      function Encode(...args) {
        const [schema, references, value] =
          args.length === 3
            ? [args[0], args[1], args[2]]
            : [args[0], [], args[1]];
        const encoded = ValueTransform.EncodeTransform.Encode(
          schema,
          references,
          value,
          ValueCheck.Check,
        );
        if (!Check(schema, references, encoded))
          throw new ValueTransform.TransformEncodeCheckError(
            schema,
            value,
            Errors(schema, references, value).First(),
          );
        return encoded;
      }
      Value2.Encode = Encode;
      function Errors(...args) {
        return ValueErrors.Errors.apply(ValueErrors, args);
      }
      Value2.Errors = Errors;
      function Equal(left, right) {
        return ValueEqual.Equal(left, right);
      }
      Value2.Equal = Equal;
      function Diff(current, next) {
        return ValueDelta.Diff(current, next);
      }
      Value2.Diff = Diff;
      function Hash(value) {
        return ValueHash.Hash(value);
      }
      Value2.Hash = Hash;
      function Patch(current, edits) {
        return ValueDelta.Patch(current, edits);
      }
      Value2.Patch = Patch;
      function Mutate(current, next) {
        ValueMutate.Mutate(current, next);
      }
      Value2.Mutate = Mutate;
    })(Value || (exports.Value = Value = {}));
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/value/index.js
var require_value2 = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/value/index.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Value =
      exports.ValuePointer =
      exports.Delete =
      exports.Update =
      exports.Insert =
      exports.Edit =
      exports.ValueErrorIterator =
      exports.ValueErrorType =
        void 0;
    var index_1 = require_errors2();
    Object.defineProperty(exports, 'ValueErrorType', {
      enumerable: true,
      get: function () {
        return index_1.ValueErrorType;
      },
    });
    Object.defineProperty(exports, 'ValueErrorIterator', {
      enumerable: true,
      get: function () {
        return index_1.ValueErrorIterator;
      },
    });
    var delta_1 = require_delta();
    Object.defineProperty(exports, 'Edit', {
      enumerable: true,
      get: function () {
        return delta_1.Edit;
      },
    });
    Object.defineProperty(exports, 'Insert', {
      enumerable: true,
      get: function () {
        return delta_1.Insert;
      },
    });
    Object.defineProperty(exports, 'Update', {
      enumerable: true,
      get: function () {
        return delta_1.Update;
      },
    });
    Object.defineProperty(exports, 'Delete', {
      enumerable: true,
      get: function () {
        return delta_1.Delete;
      },
    });
    var pointer_1 = require_pointer();
    Object.defineProperty(exports, 'ValuePointer', {
      enumerable: true,
      get: function () {
        return pointer_1.ValuePointer;
      },
    });
    var value_1 = require_value();
    Object.defineProperty(exports, 'Value', {
      enumerable: true,
      get: function () {
        return value_1.Value;
      },
    });
  },
});

// ../node_modules/cookie/index.js
var require_cookie = __commonJS({
  '../node_modules/cookie/index.js'(exports) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    exports.parse = parse;
    exports.serialize = serialize;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse(str, options) {
      if (typeof str !== 'string') {
        throw new TypeError('argument str must be a string');
      }
      var obj = {};
      var opt = options || {};
      var dec = opt.decode || decode;
      var index = 0;
      while (index < str.length) {
        var eqIdx = str.indexOf('=', index);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(';', index);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index = str.lastIndexOf(';', eqIdx - 1) + 1;
          continue;
        }
        var key = str.slice(index, eqIdx).trim();
        if (void 0 === obj[key]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== 'function') {
        throw new TypeError('option encode is invalid');
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError('argument name is invalid');
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError('argument val is invalid');
      }
      var str = name + '=' + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError('option maxAge is invalid');
        }
        str += '; Max-Age=' + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError('option domain is invalid');
        }
        str += '; Domain=' + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError('option path is invalid');
        }
        str += '; Path=' + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate2(expires) || isNaN(expires.valueOf())) {
          throw new TypeError('option expires is invalid');
        }
        str += '; Expires=' + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += '; HttpOnly';
      }
      if (opt.secure) {
        str += '; Secure';
      }
      if (opt.priority) {
        var priority =
          typeof opt.priority === 'string'
            ? opt.priority.toLowerCase()
            : opt.priority;
        switch (priority) {
          case 'low':
            str += '; Priority=Low';
            break;
          case 'medium':
            str += '; Priority=Medium';
            break;
          case 'high':
            str += '; Priority=High';
            break;
          default:
            throw new TypeError('option priority is invalid');
        }
      }
      if (opt.sameSite) {
        var sameSite =
          typeof opt.sameSite === 'string'
            ? opt.sameSite.toLowerCase()
            : opt.sameSite;
        switch (sameSite) {
          case true:
            str += '; SameSite=Strict';
            break;
          case 'lax':
            str += '; SameSite=Lax';
            break;
          case 'strict':
            str += '; SameSite=Strict';
            break;
          case 'none':
            str += '; SameSite=None';
            break;
          default:
            throw new TypeError('option sameSite is invalid');
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf('%') !== -1 ? decodeURIComponent(str) : str;
    }
    function encode(val) {
      return encodeURIComponent(val);
    }
    function isDate2(val) {
      return __toString.call(val) === '[object Date]' || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e8) {
        return str;
      }
    }
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/compiler/compiler.js
var require_compiler = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/compiler/compiler.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.TypeCompiler =
      exports.Policy =
      exports.TypeCompilerTypeGuardError =
      exports.TypeCompilerUnknownTypeError =
      exports.TypeCheck =
        void 0;
    var transform_1 = require_transform();
    var guard_1 = require_guard();
    var errors_1 = require_errors();
    var index_1 = require_system2();
    var deref_1 = require_deref();
    var hash_1 = require_hash();
    var Types = require_typebox();
    var TypeCheck = class {
      constructor(schema, references, checkFunc, code) {
        this.schema = schema;
        this.references = references;
        this.checkFunc = checkFunc;
        this.code = code;
        this.hasTransform = transform_1.HasTransform.Has(schema, references);
      }
      /** Returns the generated assertion code used to validate this type. */
      Code() {
        return this.code;
      }
      /** Returns an iterator for each error in this value. */
      Errors(value) {
        return (0, errors_1.Errors)(this.schema, this.references, value);
      }
      /** Returns true if the value matches the compiled type. */
      Check(value) {
        return this.checkFunc(value);
      }
      /** Decodes a value or throws if error */
      Decode(value) {
        if (!this.checkFunc(value))
          throw new transform_1.TransformDecodeCheckError(
            this.schema,
            value,
            this.Errors(value).First(),
          );
        return this.hasTransform
          ? transform_1.DecodeTransform.Decode(
              this.schema,
              this.references,
              value,
              (_, __, value2) => this.Check(value2),
            )
          : value;
      }
      /** Encodes a value or throws if error */
      Encode(value) {
        const encoded = this.hasTransform
          ? transform_1.EncodeTransform.Encode(
              this.schema,
              this.references,
              value,
              (_, __, value2) => this.Check(value2),
            )
          : value;
        if (!this.checkFunc(encoded))
          throw new transform_1.TransformEncodeCheckError(
            this.schema,
            value,
            this.Errors(value).First(),
          );
        return encoded;
      }
    };
    exports.TypeCheck = TypeCheck;
    var Character;
    (function (Character2) {
      function DollarSign(code) {
        return code === 36;
      }
      Character2.DollarSign = DollarSign;
      function IsUnderscore(code) {
        return code === 95;
      }
      Character2.IsUnderscore = IsUnderscore;
      function IsAlpha(code) {
        return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
      }
      Character2.IsAlpha = IsAlpha;
      function IsNumeric(code) {
        return code >= 48 && code <= 57;
      }
      Character2.IsNumeric = IsNumeric;
    })(Character || (Character = {}));
    var MemberExpression;
    (function (MemberExpression2) {
      function IsFirstCharacterNumeric(value) {
        if (value.length === 0) return false;
        return Character.IsNumeric(value.charCodeAt(0));
      }
      function IsAccessor(value) {
        if (IsFirstCharacterNumeric(value)) return false;
        for (let i2 = 0; i2 < value.length; i2++) {
          const code = value.charCodeAt(i2);
          const check =
            Character.IsAlpha(code) ||
            Character.IsNumeric(code) ||
            Character.DollarSign(code) ||
            Character.IsUnderscore(code);
          if (!check) return false;
        }
        return true;
      }
      function EscapeHyphen(key) {
        return key.replace(/'/g, "\\'");
      }
      function Encode(object, key) {
        return IsAccessor(key)
          ? `${object}.${key}`
          : `${object}['${EscapeHyphen(key)}']`;
      }
      MemberExpression2.Encode = Encode;
    })(MemberExpression || (MemberExpression = {}));
    var Identifier;
    (function (Identifier2) {
      function Encode($id) {
        const buffer = [];
        for (let i2 = 0; i2 < $id.length; i2++) {
          const code = $id.charCodeAt(i2);
          if (Character.IsNumeric(code) || Character.IsAlpha(code)) {
            buffer.push($id.charAt(i2));
          } else {
            buffer.push(`_${code}_`);
          }
        }
        return buffer.join('').replace(/__/g, '_');
      }
      Identifier2.Encode = Encode;
    })(Identifier || (Identifier = {}));
    var LiteralString;
    (function (LiteralString2) {
      function Escape(content) {
        return content.replace(/'/g, "\\'");
      }
      LiteralString2.Escape = Escape;
    })(LiteralString || (LiteralString = {}));
    var TypeCompilerUnknownTypeError = class extends Types.TypeBoxError {
      constructor(schema) {
        super('Unknown type');
        this.schema = schema;
      }
    };
    exports.TypeCompilerUnknownTypeError = TypeCompilerUnknownTypeError;
    var TypeCompilerTypeGuardError = class extends Types.TypeBoxError {
      constructor(schema) {
        super(
          'Preflight validation check failed to guard for the given schema',
        );
        this.schema = schema;
      }
    };
    exports.TypeCompilerTypeGuardError = TypeCompilerTypeGuardError;
    var Policy;
    (function (Policy2) {
      function IsExactOptionalProperty(value, key, expression) {
        return index_1.TypeSystemPolicy.ExactOptionalPropertyTypes
          ? `('${key}' in ${value} ? ${expression} : true)`
          : `(${MemberExpression.Encode(
              value,
              key,
            )} !== undefined ? ${expression} : true)`;
      }
      Policy2.IsExactOptionalProperty = IsExactOptionalProperty;
      function IsObjectLike(value) {
        return !index_1.TypeSystemPolicy.AllowArrayObject
          ? `(typeof ${value} === 'object' && ${value} !== null && !Array.isArray(${value}))`
          : `(typeof ${value} === 'object' && ${value} !== null)`;
      }
      Policy2.IsObjectLike = IsObjectLike;
      function IsRecordLike(value) {
        return !index_1.TypeSystemPolicy.AllowArrayObject
          ? `(typeof ${value} === 'object' && ${value} !== null && !Array.isArray(${value}) && !(${value} instanceof Date) && !(${value} instanceof Uint8Array))`
          : `(typeof ${value} === 'object' && ${value} !== null && !(${value} instanceof Date) && !(${value} instanceof Uint8Array))`;
      }
      Policy2.IsRecordLike = IsRecordLike;
      function IsNumberLike(value) {
        return !index_1.TypeSystemPolicy.AllowNaN
          ? `(typeof ${value} === 'number' && Number.isFinite(${value}))`
          : `typeof ${value} === 'number'`;
      }
      Policy2.IsNumberLike = IsNumberLike;
      function IsVoidLike(value) {
        return index_1.TypeSystemPolicy.AllowNullVoid
          ? `(${value} === undefined || ${value} === null)`
          : `${value} === undefined`;
      }
      Policy2.IsVoidLike = IsVoidLike;
    })(Policy || (exports.Policy = Policy = {}));
    var TypeCompiler;
    (function (TypeCompiler2) {
      function IsAnyOrUnknown(schema) {
        return schema[Types.Kind] === 'Any' || schema[Types.Kind] === 'Unknown';
      }
      function* TAny(schema, references, value) {
        yield 'true';
      }
      function* TArray(schema, references, value) {
        yield `Array.isArray(${value})`;
        const [parameter, accumulator] = [
          CreateParameter('value', 'any'),
          CreateParameter('acc', 'number'),
        ];
        if ((0, guard_1.IsNumber)(schema.maxItems))
          yield `${value}.length <= ${schema.maxItems}`;
        if ((0, guard_1.IsNumber)(schema.minItems))
          yield `${value}.length >= ${schema.minItems}`;
        const elementExpression = CreateExpression(
          schema.items,
          references,
          'value',
        );
        yield `${value}.every((${parameter}) => ${elementExpression})`;
        if (
          Types.TypeGuard.TSchema(schema.contains) ||
          (0, guard_1.IsNumber)(schema.minContains) ||
          (0, guard_1.IsNumber)(schema.maxContains)
        ) {
          const containsSchema = Types.TypeGuard.TSchema(schema.contains)
            ? schema.contains
            : Types.Type.Never();
          const checkExpression = CreateExpression(
            containsSchema,
            references,
            'value',
          );
          const checkMinContains = (0, guard_1.IsNumber)(schema.minContains)
            ? [`(count >= ${schema.minContains})`]
            : [];
          const checkMaxContains = (0, guard_1.IsNumber)(schema.maxContains)
            ? [`(count <= ${schema.maxContains})`]
            : [];
          const checkCount = `const count = value.reduce((${accumulator}, ${parameter}) => ${checkExpression} ? acc + 1 : acc, 0)`;
          const check = [
            `(count > 0)`,
            ...checkMinContains,
            ...checkMaxContains,
          ].join(' && ');
          yield `((${parameter}) => { ${checkCount}; return ${check}})(${value})`;
        }
        if (schema.uniqueItems === true) {
          const check = `const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true`;
          const block = `const set = new Set(); for(const element of value) { ${check} }`;
          yield `((${parameter}) => { ${block} )(${value})`;
        }
      }
      function* TAsyncIterator(schema, references, value) {
        yield `(typeof value === 'object' && Symbol.asyncIterator in ${value})`;
      }
      function* TBigInt(schema, references, value) {
        yield `(typeof ${value} === 'bigint')`;
        if ((0, guard_1.IsBigInt)(schema.exclusiveMaximum))
          yield `${value} < BigInt(${schema.exclusiveMaximum})`;
        if ((0, guard_1.IsBigInt)(schema.exclusiveMinimum))
          yield `${value} > BigInt(${schema.exclusiveMinimum})`;
        if ((0, guard_1.IsBigInt)(schema.maximum))
          yield `${value} <= BigInt(${schema.maximum})`;
        if ((0, guard_1.IsBigInt)(schema.minimum))
          yield `${value} >= BigInt(${schema.minimum})`;
        if ((0, guard_1.IsBigInt)(schema.multipleOf))
          yield `(${value} % BigInt(${schema.multipleOf})) === 0`;
      }
      function* TBoolean(schema, references, value) {
        yield `(typeof ${value} === 'boolean')`;
      }
      function* TConstructor(schema, references, value) {
        yield* Visit(schema.returns, references, `${value}.prototype`);
      }
      function* TDate(schema, references, value) {
        yield `(${value} instanceof Date) && Number.isFinite(${value}.getTime())`;
        if ((0, guard_1.IsNumber)(schema.exclusiveMaximumTimestamp))
          yield `${value}.getTime() < ${schema.exclusiveMaximumTimestamp}`;
        if ((0, guard_1.IsNumber)(schema.exclusiveMinimumTimestamp))
          yield `${value}.getTime() > ${schema.exclusiveMinimumTimestamp}`;
        if ((0, guard_1.IsNumber)(schema.maximumTimestamp))
          yield `${value}.getTime() <= ${schema.maximumTimestamp}`;
        if ((0, guard_1.IsNumber)(schema.minimumTimestamp))
          yield `${value}.getTime() >= ${schema.minimumTimestamp}`;
        if ((0, guard_1.IsNumber)(schema.multipleOfTimestamp))
          yield `(${value}.getTime() % ${schema.multipleOfTimestamp}) === 0`;
      }
      function* TFunction(schema, references, value) {
        yield `(typeof ${value} === 'function')`;
      }
      function* TInteger(schema, references, value) {
        yield `(typeof ${value} === 'number' && Number.isInteger(${value}))`;
        if ((0, guard_1.IsNumber)(schema.exclusiveMaximum))
          yield `${value} < ${schema.exclusiveMaximum}`;
        if ((0, guard_1.IsNumber)(schema.exclusiveMinimum))
          yield `${value} > ${schema.exclusiveMinimum}`;
        if ((0, guard_1.IsNumber)(schema.maximum))
          yield `${value} <= ${schema.maximum}`;
        if ((0, guard_1.IsNumber)(schema.minimum))
          yield `${value} >= ${schema.minimum}`;
        if ((0, guard_1.IsNumber)(schema.multipleOf))
          yield `(${value} % ${schema.multipleOf}) === 0`;
      }
      function* TIntersect(schema, references, value) {
        const check1 = schema.allOf
          .map((schema2) => CreateExpression(schema2, references, value))
          .join(' && ');
        if (schema.unevaluatedProperties === false) {
          const keyCheck = CreateVariable(
            `${new RegExp(Types.KeyResolver.ResolvePattern(schema))};`,
          );
          const check2 = `Object.getOwnPropertyNames(${value}).every(key => ${keyCheck}.test(key))`;
          yield `(${check1} && ${check2})`;
        } else if (Types.TypeGuard.TSchema(schema.unevaluatedProperties)) {
          const keyCheck = CreateVariable(
            `${new RegExp(Types.KeyResolver.ResolvePattern(schema))};`,
          );
          const check2 = `Object.getOwnPropertyNames(${value}).every(key => ${keyCheck}.test(key) || ${CreateExpression(
            schema.unevaluatedProperties,
            references,
            `${value}[key]`,
          )})`;
          yield `(${check1} && ${check2})`;
        } else {
          yield `(${check1})`;
        }
      }
      function* TIterator(schema, references, value) {
        yield `(typeof value === 'object' && Symbol.iterator in ${value})`;
      }
      function* TLiteral(schema, references, value) {
        if (
          typeof schema.const === 'number' ||
          typeof schema.const === 'boolean'
        ) {
          yield `(${value} === ${schema.const})`;
        } else {
          yield `(${value} === '${LiteralString.Escape(schema.const)}')`;
        }
      }
      function* TNever(schema, references, value) {
        yield `false`;
      }
      function* TNot(schema, references, value) {
        const expression = CreateExpression(schema.not, references, value);
        yield `(!${expression})`;
      }
      function* TNull(schema, references, value) {
        yield `(${value} === null)`;
      }
      function* TNumber(schema, references, value) {
        yield Policy.IsNumberLike(value);
        if ((0, guard_1.IsNumber)(schema.exclusiveMaximum))
          yield `${value} < ${schema.exclusiveMaximum}`;
        if ((0, guard_1.IsNumber)(schema.exclusiveMinimum))
          yield `${value} > ${schema.exclusiveMinimum}`;
        if ((0, guard_1.IsNumber)(schema.maximum))
          yield `${value} <= ${schema.maximum}`;
        if ((0, guard_1.IsNumber)(schema.minimum))
          yield `${value} >= ${schema.minimum}`;
        if ((0, guard_1.IsNumber)(schema.multipleOf))
          yield `(${value} % ${schema.multipleOf}) === 0`;
      }
      function* TObject(schema, references, value) {
        yield Policy.IsObjectLike(value);
        if ((0, guard_1.IsNumber)(schema.minProperties))
          yield `Object.getOwnPropertyNames(${value}).length >= ${schema.minProperties}`;
        if ((0, guard_1.IsNumber)(schema.maxProperties))
          yield `Object.getOwnPropertyNames(${value}).length <= ${schema.maxProperties}`;
        const knownKeys = Object.getOwnPropertyNames(schema.properties);
        for (const knownKey of knownKeys) {
          const memberExpression = MemberExpression.Encode(value, knownKey);
          const property = schema.properties[knownKey];
          if (schema.required && schema.required.includes(knownKey)) {
            yield* Visit(property, references, memberExpression);
            if (
              Types.ExtendsUndefined.Check(property) ||
              IsAnyOrUnknown(property)
            )
              yield `('${knownKey}' in ${value})`;
          } else {
            const expression = CreateExpression(
              property,
              references,
              memberExpression,
            );
            yield Policy.IsExactOptionalProperty(value, knownKey, expression);
          }
        }
        if (schema.additionalProperties === false) {
          if (schema.required && schema.required.length === knownKeys.length) {
            yield `Object.getOwnPropertyNames(${value}).length === ${knownKeys.length}`;
          } else {
            const keys2 = `[${knownKeys.map((key) => `'${key}'`).join(', ')}]`;
            yield `Object.getOwnPropertyNames(${value}).every(key => ${keys2}.includes(key))`;
          }
        }
        if (typeof schema.additionalProperties === 'object') {
          const expression = CreateExpression(
            schema.additionalProperties,
            references,
            `${value}[key]`,
          );
          const keys2 = `[${knownKeys.map((key) => `'${key}'`).join(', ')}]`;
          yield `(Object.getOwnPropertyNames(${value}).every(key => ${keys2}.includes(key) || ${expression}))`;
        }
      }
      function* TPromise(schema, references, value) {
        yield `(typeof value === 'object' && typeof ${value}.then === 'function')`;
      }
      function* TRecord(schema, references, value) {
        yield Policy.IsRecordLike(value);
        if ((0, guard_1.IsNumber)(schema.minProperties))
          yield `Object.getOwnPropertyNames(${value}).length >= ${schema.minProperties}`;
        if ((0, guard_1.IsNumber)(schema.maxProperties))
          yield `Object.getOwnPropertyNames(${value}).length <= ${schema.maxProperties}`;
        const [patternKey, patternSchema] = Object.entries(
          schema.patternProperties,
        )[0];
        const variable = CreateVariable(`${new RegExp(patternKey)}`);
        const check1 = CreateExpression(patternSchema, references, 'value');
        const check2 = Types.TypeGuard.TSchema(schema.additionalProperties)
          ? CreateExpression(schema.additionalProperties, references, value)
          : schema.additionalProperties === false
          ? 'false'
          : 'true';
        const expression = `(${variable}.test(key) ? ${check1} : ${check2})`;
        yield `(Object.entries(${value}).every(([key, value]) => ${expression}))`;
      }
      function* TRef(schema, references, value) {
        const target = (0, deref_1.Deref)(schema, references);
        if (state.functions.has(schema.$ref))
          return yield `${CreateFunctionName(schema.$ref)}(${value})`;
        yield* Visit(target, references, value);
      }
      function* TString(schema, references, value) {
        yield `(typeof ${value} === 'string')`;
        if ((0, guard_1.IsNumber)(schema.maxLength))
          yield `${value}.length <= ${schema.maxLength}`;
        if ((0, guard_1.IsNumber)(schema.minLength))
          yield `${value}.length >= ${schema.minLength}`;
        if (schema.pattern !== void 0) {
          const variable = CreateVariable(`${new RegExp(schema.pattern)};`);
          yield `${variable}.test(${value})`;
        }
        if (schema.format !== void 0) {
          yield `format('${schema.format}', ${value})`;
        }
      }
      function* TSymbol(schema, references, value) {
        yield `(typeof ${value} === 'symbol')`;
      }
      function* TTemplateLiteral(schema, references, value) {
        yield `(typeof ${value} === 'string')`;
        const variable = CreateVariable(`${new RegExp(schema.pattern)};`);
        yield `${variable}.test(${value})`;
      }
      function* TThis(schema, references, value) {
        yield `${CreateFunctionName(schema.$ref)}(${value})`;
      }
      function* TTuple(schema, references, value) {
        yield `Array.isArray(${value})`;
        if (schema.items === void 0) return yield `${value}.length === 0`;
        yield `(${value}.length === ${schema.maxItems})`;
        for (let i2 = 0; i2 < schema.items.length; i2++) {
          const expression = CreateExpression(
            schema.items[i2],
            references,
            `${value}[${i2}]`,
          );
          yield `${expression}`;
        }
      }
      function* TUndefined(schema, references, value) {
        yield `${value} === undefined`;
      }
      function* TUnion(schema, references, value) {
        const expressions = schema.anyOf.map((schema2) =>
          CreateExpression(schema2, references, value),
        );
        yield `(${expressions.join(' || ')})`;
      }
      function* TUint8Array(schema, references, value) {
        yield `${value} instanceof Uint8Array`;
        if ((0, guard_1.IsNumber)(schema.maxByteLength))
          yield `(${value}.length <= ${schema.maxByteLength})`;
        if ((0, guard_1.IsNumber)(schema.minByteLength))
          yield `(${value}.length >= ${schema.minByteLength})`;
      }
      function* TUnknown(schema, references, value) {
        yield 'true';
      }
      function* TVoid(schema, references, value) {
        yield Policy.IsVoidLike(value);
      }
      function* TKind(schema, references, value) {
        const instance = state.instances.size;
        state.instances.set(instance, schema);
        yield `kind('${schema[Types.Kind]}', ${instance}, ${value})`;
      }
      function* Visit(schema, references, value, useHoisting = true) {
        const references_ = (0, guard_1.IsString)(schema.$id)
          ? [...references, schema]
          : references;
        const schema_ = schema;
        if (useHoisting && (0, guard_1.IsString)(schema.$id)) {
          const functionName = CreateFunctionName(schema.$id);
          if (state.functions.has(functionName)) {
            return yield `${functionName}(${value})`;
          } else {
            const functionCode = CreateFunction(
              functionName,
              schema,
              references,
              'value',
              false,
            );
            state.functions.set(functionName, functionCode);
            return yield `${functionName}(${value})`;
          }
        }
        switch (schema_[Types.Kind]) {
          case 'Any':
            return yield* TAny(schema_, references_, value);
          case 'Array':
            return yield* TArray(schema_, references_, value);
          case 'AsyncIterator':
            return yield* TAsyncIterator(schema_, references_, value);
          case 'BigInt':
            return yield* TBigInt(schema_, references_, value);
          case 'Boolean':
            return yield* TBoolean(schema_, references_, value);
          case 'Constructor':
            return yield* TConstructor(schema_, references_, value);
          case 'Date':
            return yield* TDate(schema_, references_, value);
          case 'Function':
            return yield* TFunction(schema_, references_, value);
          case 'Integer':
            return yield* TInteger(schema_, references_, value);
          case 'Intersect':
            return yield* TIntersect(schema_, references_, value);
          case 'Iterator':
            return yield* TIterator(schema_, references_, value);
          case 'Literal':
            return yield* TLiteral(schema_, references_, value);
          case 'Never':
            return yield* TNever(schema_, references_, value);
          case 'Not':
            return yield* TNot(schema_, references_, value);
          case 'Null':
            return yield* TNull(schema_, references_, value);
          case 'Number':
            return yield* TNumber(schema_, references_, value);
          case 'Object':
            return yield* TObject(schema_, references_, value);
          case 'Promise':
            return yield* TPromise(schema_, references_, value);
          case 'Record':
            return yield* TRecord(schema_, references_, value);
          case 'Ref':
            return yield* TRef(schema_, references_, value);
          case 'String':
            return yield* TString(schema_, references_, value);
          case 'Symbol':
            return yield* TSymbol(schema_, references_, value);
          case 'TemplateLiteral':
            return yield* TTemplateLiteral(schema_, references_, value);
          case 'This':
            return yield* TThis(schema_, references_, value);
          case 'Tuple':
            return yield* TTuple(schema_, references_, value);
          case 'Undefined':
            return yield* TUndefined(schema_, references_, value);
          case 'Union':
            return yield* TUnion(schema_, references_, value);
          case 'Uint8Array':
            return yield* TUint8Array(schema_, references_, value);
          case 'Unknown':
            return yield* TUnknown(schema_, references_, value);
          case 'Void':
            return yield* TVoid(schema_, references_, value);
          default:
            if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
              throw new TypeCompilerUnknownTypeError(schema);
            return yield* TKind(schema_, references_, value);
        }
      }
      const state = {
        language: 'javascript',
        functions: /* @__PURE__ */ new Map(),
        variables: /* @__PURE__ */ new Map(),
        instances: /* @__PURE__ */ new Map(),
        // exterior kind instances
      };
      function CreateExpression(schema, references, value, useHoisting = true) {
        return `(${[...Visit(schema, references, value, useHoisting)].join(
          ' && ',
        )})`;
      }
      function CreateFunctionName($id) {
        return `check_${Identifier.Encode($id)}`;
      }
      function CreateVariable(expression) {
        const variableName = `local_${state.variables.size}`;
        state.variables.set(
          variableName,
          `const ${variableName} = ${expression}`,
        );
        return variableName;
      }
      function CreateFunction(
        name,
        schema,
        references,
        value,
        useHoisting = true,
      ) {
        const [newline, pad] = ['\n', (length) => ''.padStart(length, ' ')];
        const parameter = CreateParameter('value', 'any');
        const returns = CreateReturns('boolean');
        const expression = [...Visit(schema, references, value, useHoisting)]
          .map((expression2) => `${pad(4)}${expression2}`)
          .join(` &&${newline}`);
        return `function ${name}(${parameter})${returns} {${newline}${pad(
          2,
        )}return (${newline}${expression}${newline}${pad(2)})
}`;
      }
      function CreateParameter(name, type) {
        const annotation = state.language === 'typescript' ? `: ${type}` : '';
        return `${name}${annotation}`;
      }
      function CreateReturns(type) {
        return state.language === 'typescript' ? `: ${type}` : '';
      }
      function Build(schema, references, options) {
        const functionCode = CreateFunction(
          'check',
          schema,
          references,
          'value',
        );
        const parameter = CreateParameter('value', 'any');
        const returns = CreateReturns('boolean');
        const functions = [...state.functions.values()];
        const variables = [...state.variables.values()];
        const checkFunction = (0, guard_1.IsString)(schema.$id)
          ? `return function check(${parameter})${returns} {
  return ${CreateFunctionName(schema.$id)}(value)
}`
          : `return ${functionCode}`;
        return [...variables, ...functions, checkFunction].join('\n');
      }
      function Code(...args) {
        const defaults = { language: 'javascript' };
        const [schema, references, options] =
          args.length === 2 && (0, guard_1.IsArray)(args[1])
            ? [args[0], args[1], defaults]
            : args.length === 2 && !(0, guard_1.IsArray)(args[1])
            ? [args[0], [], args[1]]
            : args.length === 3
            ? [args[0], args[1], args[2]]
            : args.length === 1
            ? [args[0], [], defaults]
            : [null, [], defaults];
        state.language = options.language;
        state.variables.clear();
        state.functions.clear();
        state.instances.clear();
        if (!Types.TypeGuard.TSchema(schema))
          throw new TypeCompilerTypeGuardError(schema);
        for (const schema2 of references)
          if (!Types.TypeGuard.TSchema(schema2))
            throw new TypeCompilerTypeGuardError(schema2);
        return Build(schema, references, options);
      }
      TypeCompiler2.Code = Code;
      function Compile(schema, references = []) {
        const generatedCode = Code(schema, references, {
          language: 'javascript',
        });
        const compiledFunction = globalThis.Function(
          'kind',
          'format',
          'hash',
          generatedCode,
        );
        const instances = new Map(state.instances);
        function typeRegistryFunction(kind, instance, value) {
          if (!Types.TypeRegistry.Has(kind) || !instances.has(instance))
            return false;
          const checkFunc = Types.TypeRegistry.Get(kind);
          const schema2 = instances.get(instance);
          return checkFunc(schema2, value);
        }
        function formatRegistryFunction(format2, value) {
          if (!Types.FormatRegistry.Has(format2)) return false;
          const checkFunc = Types.FormatRegistry.Get(format2);
          return checkFunc(value);
        }
        function hashFunction(value) {
          return (0, hash_1.Hash)(value);
        }
        const checkFunction = compiledFunction(
          typeRegistryFunction,
          formatRegistryFunction,
          hashFunction,
        );
        return new TypeCheck(schema, references, checkFunction, generatedCode);
      }
      TypeCompiler2.Compile = Compile;
    })(TypeCompiler || (exports.TypeCompiler = TypeCompiler = {}));
  },
});

// ../node_modules/elysia/node_modules/@sinclair/typebox/compiler/index.js
var require_compiler2 = __commonJS({
  '../node_modules/elysia/node_modules/@sinclair/typebox/compiler/index.js'(
    exports,
  ) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __createBinding =
      (exports && exports.__createBinding) ||
      (Object.create
        ? function (o, m2, k2, k22) {
            if (k22 === void 0) k22 = k2;
            var desc = Object.getOwnPropertyDescriptor(m2, k2);
            if (
              !desc ||
              ('get' in desc
                ? !m2.__esModule
                : desc.writable || desc.configurable)
            ) {
              desc = {
                enumerable: true,
                get: function () {
                  return m2[k2];
                },
              };
            }
            Object.defineProperty(o, k22, desc);
          }
        : function (o, m2, k2, k22) {
            if (k22 === void 0) k22 = k2;
            o[k22] = m2[k2];
          });
    var __exportStar =
      (exports && exports.__exportStar) ||
      function (m2, exports2) {
        for (var p2 in m2)
          if (
            p2 !== 'default' &&
            !Object.prototype.hasOwnProperty.call(exports2, p2)
          )
            __createBinding(exports2, m2, p2);
      };
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.ValueErrorIterator = exports.ValueErrorType = void 0;
    var index_1 = require_errors2();
    Object.defineProperty(exports, 'ValueErrorType', {
      enumerable: true,
      get: function () {
        return index_1.ValueErrorType;
      },
    });
    Object.defineProperty(exports, 'ValueErrorIterator', {
      enumerable: true,
      get: function () {
        return index_1.ValueErrorIterator;
      },
    });
    __exportStar(require_compiler(), exports);
  },
});

// ../node_modules/fast-decode-uri-component/index.js
var require_fast_decode_uri_component = __commonJS({
  '../node_modules/fast-decode-uri-component/index.js'(exports, module) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var UTF8_ACCEPT = 12;
    var UTF8_REJECT = 0;
    var UTF8_DATA = [
      // The first part of the table maps bytes to character to a transition.
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5,
      5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6,
      7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4, 4, 4,
      4, 4, 4, 4, 4, 4, 4,
      // The second part of the table maps a state to a new state when adding a
      // transition.
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 24, 36, 48, 60, 72,
      84, 96, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      // The third part maps the current transition to a mask that needs to apply
      // to the byte.
      127,
      63, 63, 63, 0, 31, 15, 15, 15, 7, 7, 7,
    ];
    function decodeURIComponent2(uri) {
      var percentPosition = uri.indexOf('%');
      if (percentPosition === -1) return uri;
      var length = uri.length;
      var decoded = '';
      var last = 0;
      var codepoint = 0;
      var startOfOctets = percentPosition;
      var state = UTF8_ACCEPT;
      while (percentPosition > -1 && percentPosition < length) {
        var high = hexCodeToInt(uri[percentPosition + 1], 4);
        var low = hexCodeToInt(uri[percentPosition + 2], 0);
        var byte = high | low;
        var type = UTF8_DATA[byte];
        state = UTF8_DATA[256 + state + type];
        codepoint = (codepoint << 6) | (byte & UTF8_DATA[364 + type]);
        if (state === UTF8_ACCEPT) {
          decoded += uri.slice(last, startOfOctets);
          decoded +=
            codepoint <= 65535
              ? String.fromCharCode(codepoint)
              : String.fromCharCode(
                  55232 + (codepoint >> 10),
                  56320 + (codepoint & 1023),
                );
          codepoint = 0;
          last = percentPosition + 3;
          percentPosition = startOfOctets = uri.indexOf('%', last);
        } else if (state === UTF8_REJECT) {
          return null;
        } else {
          percentPosition += 3;
          if (
            percentPosition < length &&
            uri.charCodeAt(percentPosition) === 37
          )
            continue;
          return null;
        }
      }
      return decoded + uri.slice(last);
    }
    var HEX = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15,
    };
    function hexCodeToInt(c, shift) {
      var i2 = HEX[c];
      return i2 === void 0 ? 255 : i2 << shift;
    }
    module.exports = decodeURIComponent2;
  },
});

// ../node_modules/fast-querystring/lib/parse.js
var require_parse = __commonJS({
  '../node_modules/fast-querystring/lib/parse.js'(exports, module) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var fastDecode = require_fast_decode_uri_component();
    var plusRegex = /\+/g;
    var Empty = function () {};
    Empty.prototype = /* @__PURE__ */ Object.create(null);
    function parse(input) {
      const result = new Empty();
      if (typeof input !== 'string') {
        return result;
      }
      let inputLength = input.length;
      let key = '';
      let value = '';
      let startingIndex = -1;
      let equalityIndex = -1;
      let shouldDecodeKey = false;
      let shouldDecodeValue = false;
      let keyHasPlus = false;
      let valueHasPlus = false;
      let hasBothKeyValuePair = false;
      let c = 0;
      for (let i2 = 0; i2 < inputLength + 1; i2++) {
        c = i2 !== inputLength ? input.charCodeAt(i2) : 38;
        if (c === 38) {
          hasBothKeyValuePair = equalityIndex > startingIndex;
          if (!hasBothKeyValuePair) {
            equalityIndex = i2;
          }
          key = input.slice(startingIndex + 1, equalityIndex);
          if (hasBothKeyValuePair || key.length > 0) {
            if (keyHasPlus) {
              key = key.replace(plusRegex, ' ');
            }
            if (shouldDecodeKey) {
              key = fastDecode(key) || key;
            }
            if (hasBothKeyValuePair) {
              value = input.slice(equalityIndex + 1, i2);
              if (valueHasPlus) {
                value = value.replace(plusRegex, ' ');
              }
              if (shouldDecodeValue) {
                value = fastDecode(value) || value;
              }
            }
            const currentValue = result[key];
            if (currentValue === void 0) {
              result[key] = value;
            } else {
              if (currentValue.pop) {
                currentValue.push(value);
              } else {
                result[key] = [currentValue, value];
              }
            }
          }
          value = '';
          startingIndex = i2;
          equalityIndex = i2;
          shouldDecodeKey = false;
          shouldDecodeValue = false;
          keyHasPlus = false;
          valueHasPlus = false;
        } else if (c === 61) {
          if (equalityIndex <= startingIndex) {
            equalityIndex = i2;
          } else {
            shouldDecodeValue = true;
          }
        } else if (c === 43) {
          if (equalityIndex > startingIndex) {
            valueHasPlus = true;
          } else {
            keyHasPlus = true;
          }
        } else if (c === 37) {
          if (equalityIndex > startingIndex) {
            shouldDecodeValue = true;
          } else {
            shouldDecodeKey = true;
          }
        }
      }
      return result;
    }
    module.exports = parse;
  },
});

// ../node_modules/fast-querystring/lib/internals/querystring.js
var require_querystring = __commonJS({
  '../node_modules/fast-querystring/lib/internals/querystring.js'(
    exports,
    module,
  ) {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var hexTable = Array.from(
      { length: 256 },
      (_, i2) => '%' + ((i2 < 16 ? '0' : '') + i2.toString(16)).toUpperCase(),
    );
    var noEscape = new Int8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      // 0 - 15
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      // 16 - 31
      0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0,
      // 32 - 47
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
      // 48 - 63
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      // 64 - 79
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
      // 80 - 95
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      // 96 - 111
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0,
      // 112 - 127
    ]);
    function encodeString(str) {
      const len = str.length;
      if (len === 0) return '';
      let out = '';
      let lastPos = 0;
      let i2 = 0;
      outer: for (; i2 < len; i2++) {
        let c = str.charCodeAt(i2);
        while (c < 128) {
          if (noEscape[c] !== 1) {
            if (lastPos < i2) out += str.slice(lastPos, i2);
            lastPos = i2 + 1;
            out += hexTable[c];
          }
          if (++i2 === len) break outer;
          c = str.charCodeAt(i2);
        }
        if (lastPos < i2) out += str.slice(lastPos, i2);
        if (c < 2048) {
          lastPos = i2 + 1;
          out += hexTable[192 | (c >> 6)] + hexTable[128 | (c & 63)];
          continue;
        }
        if (c < 55296 || c >= 57344) {
          lastPos = i2 + 1;
          out +=
            hexTable[224 | (c >> 12)] +
            hexTable[128 | ((c >> 6) & 63)] +
            hexTable[128 | (c & 63)];
          continue;
        }
        ++i2;
        if (i2 >= len) {
          throw new Error('URI malformed');
        }
        const c2 = str.charCodeAt(i2) & 1023;
        lastPos = i2 + 1;
        c = 65536 + (((c & 1023) << 10) | c2);
        out +=
          hexTable[240 | (c >> 18)] +
          hexTable[128 | ((c >> 12) & 63)] +
          hexTable[128 | ((c >> 6) & 63)] +
          hexTable[128 | (c & 63)];
      }
      if (lastPos === 0) return str;
      if (lastPos < len) return out + str.slice(lastPos);
      return out;
    }
    module.exports = { encodeString };
  },
});

// ../node_modules/fast-querystring/lib/stringify.js
var require_stringify = __commonJS({
  '../node_modules/fast-querystring/lib/stringify.js'(exports, module) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var { encodeString } = require_querystring();
    function getAsPrimitive(value) {
      const type = typeof value;
      if (type === 'string') {
        return encodeString(value);
      } else if (type === 'bigint') {
        return value.toString();
      } else if (type === 'boolean') {
        return value ? 'true' : 'false';
      } else if (type === 'number' && Number.isFinite(value)) {
        return value < 1e21 ? '' + value : encodeString('' + value);
      }
      return '';
    }
    function stringify(input) {
      let result = '';
      if (input === null || typeof input !== 'object') {
        return result;
      }
      const separator = '&';
      const keys2 = Object.keys(input);
      const keyLength = keys2.length;
      let valueLength = 0;
      for (let i2 = 0; i2 < keyLength; i2++) {
        const key = keys2[i2];
        const value = input[key];
        const encodedKey = encodeString(key) + '=';
        if (i2) {
          result += separator;
        }
        if (Array.isArray(value)) {
          valueLength = value.length;
          for (let j = 0; j < valueLength; j++) {
            if (j) {
              result += separator;
            }
            result += encodedKey;
            result += getAsPrimitive(value[j]);
          }
        } else {
          result += encodedKey;
          result += getAsPrimitive(value);
        }
      }
      return result;
    }
    module.exports = stringify;
  },
});

// ../node_modules/fast-querystring/lib/index.js
var require_lib = __commonJS({
  '../node_modules/fast-querystring/lib/index.js'(exports, module) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var parse = require_parse();
    var stringify = require_stringify();
    var fastQuerystring = {
      parse,
      stringify,
    };
    module.exports = fastQuerystring;
    module.exports.default = fastQuerystring;
    module.exports.parse = parse;
    module.exports.stringify = stringify;
  },
});

// node-modules-polyfills:events
function EventHandlers() {}
function EventEmitter2() {
  EventEmitter2.init.call(this);
}
function $getMaxListeners(that) {
  if (that._maxListeners === void 0) return EventEmitter2.defaultMaxListeners;
  return that._maxListeners;
}
function emitNone(handler, isFn, self2) {
  if (isFn) handler.call(self2);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i2 = 0; i2 < len; ++i2) listeners2[i2].call(self2);
  }
}
function emitOne(handler, isFn, self2, arg1) {
  if (isFn) handler.call(self2, arg1);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i2 = 0; i2 < len; ++i2) listeners2[i2].call(self2, arg1);
  }
}
function emitTwo(handler, isFn, self2, arg1, arg2) {
  if (isFn) handler.call(self2, arg1, arg2);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i2 = 0; i2 < len; ++i2) listeners2[i2].call(self2, arg1, arg2);
  }
}
function emitThree(handler, isFn, self2, arg1, arg2, arg3) {
  if (isFn) handler.call(self2, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i2 = 0; i2 < len; ++i2)
      listeners2[i2].call(self2, arg1, arg2, arg3);
  }
}
function emitMany(handler, isFn, self2, args) {
  if (isFn) handler.apply(self2, args);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i2 = 0; i2 < len; ++i2) listeners2[i2].apply(self2, args);
  }
}
function _addListener(target, type, listener, prepend) {
  var m2;
  var events;
  var existing;
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    if (events.newListener) {
      target.emit(
        'newListener',
        type,
        listener.listener ? listener.listener : listener,
      );
      events = target._events;
    }
    existing = events[type];
  }
  if (!existing) {
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      existing = events[type] = prepend
        ? [listener, existing]
        : [existing, listener];
    } else {
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }
    if (!existing.warned) {
      m2 = $getMaxListeners(target);
      if (m2 && m2 > 0 && existing.length > m2) {
        existing.warned = true;
        var w = new Error(
          'Possible EventEmitter memory leak detected. ' +
            existing.length +
            ' ' +
            type +
            ' listeners added. Use emitter.setMaxListeners() to increase limit',
        );
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }
  return target;
}
function emitWarning(e8) {
  typeof console.warn === 'function' ? console.warn(e8) : console.log(e8);
}
function _onceWrap(target, type, listener) {
  var fired = false;
  function g2() {
    target.removeListener(type, g2);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g2.listener = listener;
  return g2;
}
function listenerCount(type) {
  var events = this._events;
  if (events) {
    var evlistener = events[type];
    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }
  return 0;
}
function spliceOne(list, index) {
  for (var i2 = index, k2 = i2 + 1, n3 = list.length; k2 < n3; i2 += 1, k2 += 1)
    list[i2] = list[k2];
  list.pop();
}
function arrayClone(arr, i2) {
  var copy3 = new Array(i2);
  while (i2--) copy3[i2] = arr[i2];
  return copy3;
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i2 = 0; i2 < ret.length; ++i2) {
    ret[i2] = arr[i2].listener || arr[i2];
  }
  return ret;
}
var domain, events_default;
var init_events = __esm({
  'node-modules-polyfills:events'() {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    EventHandlers.prototype = /* @__PURE__ */ Object.create(null);
    events_default = EventEmitter2;
    EventEmitter2.EventEmitter = EventEmitter2;
    EventEmitter2.usingDomains = false;
    EventEmitter2.prototype.domain = void 0;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._maxListeners = void 0;
    EventEmitter2.defaultMaxListeners = 10;
    EventEmitter2.init = function () {
      this.domain = null;
      if (EventEmitter2.usingDomains) {
        if (domain.active && !(this instanceof domain.Domain)) {
          this.domain = domain.active;
        }
      }
      if (
        !this._events ||
        this._events === Object.getPrototypeOf(this)._events
      ) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n3) {
      if (typeof n3 !== 'number' || n3 < 0 || isNaN(n3))
        throw new TypeError('"n" argument must be a positive number');
      this._maxListeners = n3;
      return this;
    };
    EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
      return $getMaxListeners(this);
    };
    EventEmitter2.prototype.emit = function emit2(type) {
      var er, handler, len, args, i2, events, domain2;
      var needDomainExit = false;
      var doError = type === 'error';
      events = this._events;
      if (events) doError = doError && events.error == null;
      else if (!doError) return false;
      domain2 = this.domain;
      if (doError) {
        er = arguments[1];
        if (domain2) {
          if (!er) er = new Error('Uncaught, unspecified "error" event');
          er.domainEmitter = this;
          er.domain = domain2;
          er.domainThrown = false;
          domain2.emit('error', er);
        } else if (er instanceof Error) {
          throw er;
        } else {
          var err = new Error(
            'Uncaught, unspecified "error" event. (' + er + ')',
          );
          err.context = er;
          throw err;
        }
        return false;
      }
      handler = events[type];
      if (!handler) return false;
      var isFn = typeof handler === 'function';
      len = arguments.length;
      switch (len) {
        case 1:
          emitNone(handler, isFn, this);
          break;
        case 2:
          emitOne(handler, isFn, this, arguments[1]);
          break;
        case 3:
          emitTwo(handler, isFn, this, arguments[1], arguments[2]);
          break;
        case 4:
          emitThree(
            handler,
            isFn,
            this,
            arguments[1],
            arguments[2],
            arguments[3],
          );
          break;
        default:
          args = new Array(len - 1);
          for (i2 = 1; i2 < len; i2++) args[i2 - 1] = arguments[i2];
          emitMany(handler, isFn, this, args);
      }
      if (needDomainExit) domain2.exit();
      return true;
    };
    EventEmitter2.prototype.addListener = function addListener2(
      type,
      listener,
    ) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.prependListener = function prependListener(
      type,
      listener,
    ) {
      return _addListener(this, type, listener, true);
    };
    EventEmitter2.prototype.once = function once2(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.prependOnceListener = function prependOnceListener(
      type,
      listener,
    ) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.removeListener = function removeListener2(
      type,
      listener,
    ) {
      var list, events, position, i2, originalListener;
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      events = this._events;
      if (!events) return this;
      list = events[type];
      if (!list) return this;
      if (list === listener || (list.listener && list.listener === listener)) {
        if (--this._eventsCount === 0) this._events = new EventHandlers();
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;
        for (i2 = list.length; i2-- > 0; ) {
          if (
            list[i2] === listener ||
            (list[i2].listener && list[i2].listener === listener)
          ) {
            originalListener = list[i2].listener;
            position = i2;
            break;
          }
        }
        if (position < 0) return this;
        if (list.length === 1) {
          list[0] = void 0;
          if (--this._eventsCount === 0) {
            this._events = new EventHandlers();
            return this;
          } else {
            delete events[type];
          }
        } else {
          spliceOne(list, position);
        }
        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners2(
      type,
    ) {
      var listeners2, events;
      events = this._events;
      if (!events) return this;
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0) this._events = new EventHandlers();
          else delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys2 = Object.keys(events);
        for (var i2 = 0, key; i2 < keys2.length; ++i2) {
          key = keys2[i2];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
      }
      listeners2 = events[type];
      if (typeof listeners2 === 'function') {
        this.removeListener(type, listeners2);
      } else if (listeners2) {
        do {
          this.removeListener(type, listeners2[listeners2.length - 1]);
        } while (listeners2[0]);
      }
      return this;
    };
    EventEmitter2.prototype.listeners = function listeners(type) {
      var evlistener;
      var ret;
      var events = this._events;
      if (!events) ret = [];
      else {
        evlistener = events[type];
        if (!evlistener) ret = [];
        else if (typeof evlistener === 'function')
          ret = [evlistener.listener || evlistener];
        else ret = unwrapListeners(evlistener);
      }
      return ret;
    };
    EventEmitter2.listenerCount = function (emitter, type) {
      if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter2.prototype.listenerCount = listenerCount;
    EventEmitter2.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };
  },
});

// node-modules-polyfills:process
function defaultSetTimout2() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout2() {
  throw new Error('clearTimeout has not been defined');
}
function runTimeout2(fun) {
  if (cachedSetTimeout2 === setTimeout) {
    return setTimeout(fun, 0);
  }
  if (
    (cachedSetTimeout2 === defaultSetTimout2 || !cachedSetTimeout2) &&
    setTimeout
  ) {
    cachedSetTimeout2 = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout2(fun, 0);
  } catch (e8) {
    try {
      return cachedSetTimeout2.call(null, fun, 0);
    } catch (e9) {
      return cachedSetTimeout2.call(this, fun, 0);
    }
  }
}
function runClearTimeout2(marker) {
  if (cachedClearTimeout2 === clearTimeout) {
    return clearTimeout(marker);
  }
  if (
    (cachedClearTimeout2 === defaultClearTimeout2 || !cachedClearTimeout2) &&
    clearTimeout
  ) {
    cachedClearTimeout2 = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout2(marker);
  } catch (e8) {
    try {
      return cachedClearTimeout2.call(null, marker);
    } catch (e9) {
      return cachedClearTimeout2.call(this, marker);
    }
  }
}
function cleanUpNextTick2() {
  if (!draining2 || !currentQueue2) {
    return;
  }
  draining2 = false;
  if (currentQueue2.length) {
    queue2 = currentQueue2.concat(queue2);
  } else {
    queueIndex2 = -1;
  }
  if (queue2.length) {
    drainQueue2();
  }
}
function drainQueue2() {
  if (draining2) {
    return;
  }
  var timeout = runTimeout2(cleanUpNextTick2);
  draining2 = true;
  var len = queue2.length;
  while (len) {
    currentQueue2 = queue2;
    queue2 = [];
    while (++queueIndex2 < len) {
      if (currentQueue2) {
        currentQueue2[queueIndex2].run();
      }
    }
    queueIndex2 = -1;
    len = queue2.length;
  }
  currentQueue2 = null;
  draining2 = false;
  runClearTimeout2(timeout);
}
function nextTick2(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      args[i2 - 1] = arguments[i2];
    }
  }
  queue2.push(new Item2(fun, args));
  if (queue2.length === 1 && !draining2) {
    runTimeout2(drainQueue2);
  }
}
function Item2(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop2() {}
function binding2(name) {
  throw new Error('process.binding is not supported');
}
function cwd2() {
  return '/';
}
function chdir2(dir) {
  throw new Error('process.chdir is not supported');
}
function umask2() {
  return 0;
}
function hrtime2(previousTimestamp) {
  var clocktime = performanceNow2.call(performance3) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime % 1) * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
function uptime2() {
  var currentTime = /* @__PURE__ */ new Date();
  var dif = currentTime - startTime2;
  return dif / 1e3;
}
var cachedSetTimeout2,
  cachedClearTimeout2,
  queue2,
  draining2,
  currentQueue2,
  queueIndex2,
  title2,
  platform2,
  browser2,
  env2,
  argv2,
  version2,
  versions2,
  release2,
  config2,
  on2,
  addListener3,
  once3,
  off2,
  removeListener3,
  removeAllListeners3,
  emit3,
  performance3,
  performanceNow2,
  startTime2,
  browser$1,
  process_default;
var init_process2 = __esm({
  'node-modules-polyfills:process'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    cachedSetTimeout2 = defaultSetTimout2;
    cachedClearTimeout2 = defaultClearTimeout2;
    if (typeof globalThis.setTimeout === 'function') {
      cachedSetTimeout2 = setTimeout;
    }
    if (typeof globalThis.clearTimeout === 'function') {
      cachedClearTimeout2 = clearTimeout;
    }
    queue2 = [];
    draining2 = false;
    queueIndex2 = -1;
    Item2.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    title2 = 'browser';
    platform2 = 'browser';
    browser2 = true;
    env2 = {};
    argv2 = [];
    version2 = '';
    versions2 = {};
    release2 = {};
    config2 = {};
    on2 = noop2;
    addListener3 = noop2;
    once3 = noop2;
    off2 = noop2;
    removeListener3 = noop2;
    removeAllListeners3 = noop2;
    emit3 = noop2;
    performance3 = globalThis.performance || {};
    performanceNow2 =
      performance3.now ||
      performance3.mozNow ||
      performance3.msNow ||
      performance3.oNow ||
      performance3.webkitNow ||
      function () {
        return /* @__PURE__ */ new Date().getTime();
      };
    startTime2 = /* @__PURE__ */ new Date();
    browser$1 = {
      nextTick: nextTick2,
      title: title2,
      browser: browser2,
      env: env2,
      argv: argv2,
      version: version2,
      versions: versions2,
      on: on2,
      addListener: addListener3,
      once: once3,
      off: off2,
      removeListener: removeListener3,
      removeAllListeners: removeAllListeners3,
      emit: emit3,
      binding: binding2,
      cwd: cwd2,
      chdir: chdir2,
      umask: umask2,
      hrtime: hrtime2,
      platform: platform2,
      release: release2,
      config: config2,
      uptime: uptime2,
    };
    process_default = browser$1;
  },
});

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js
var inherits, inherits_default;
var init_inherits = __esm({
  '../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    if (typeof Object.create === 'function') {
      inherits = function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
      };
    } else {
      inherits = function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
    inherits_default = inherits;
  },
});

// node-modules-polyfills:util
function format(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i2 = 0; i2 < arguments.length; i2++) {
      objects.push(inspect(arguments[i2]));
    }
    return objects.join(' ');
  }
  var i2 = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x3) {
    if (x3 === '%%') return '%';
    if (i2 >= len) return x3;
    switch (x3) {
      case '%s':
        return String(args[i2++]);
      case '%d':
        return Number(args[i2++]);
      case '%j':
        try {
          return JSON.stringify(args[i2++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x3;
    }
  });
  for (var x2 = args[i2]; i2 < len; x2 = args[++i2]) {
    if (isNull(x2) || !isObject2(x2)) {
      str += ' ' + x2;
    } else {
      str += ' ' + inspect(x2);
    }
  }
  return str;
}
function deprecate(fn, msg) {
  if (isUndefined(globalThis.process)) {
    return function () {
      return deprecate(fn, msg).apply(this, arguments);
    };
  }
  if (process_default.noDeprecation === true) {
    return fn;
  }
  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process_default.throwDeprecation) {
        throw new Error(msg);
      } else if (process_default.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }
  return deprecated;
}
function debuglog(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process_default.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function () {
        var msg = format.apply(null, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }
  return debugs[set];
}
function inspect(obj, opts) {
  var ctx = {
    seen: [],
    stylize: stylizeNoColor,
  };
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    ctx.showHidden = opts;
  } else if (opts) {
    _extend(ctx, opts);
  }
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];
  if (style) {
    return (
      '\x1B[' +
      inspect.colors[style][0] +
      'm' +
      str +
      '\x1B[' +
      inspect.colors[style][1] +
      'm'
    );
  } else {
    return str;
  }
}
function stylizeNoColor(str, styleType) {
  return str;
}
function arrayToHash(array) {
  var hash = {};
  array.forEach(function (val, idx) {
    hash[val] = true;
  });
  return hash;
}
function formatValue(ctx, value, recurseTimes) {
  if (
    ctx.customInspect &&
    value &&
    isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
    value.inspect !== inspect && // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)
  ) {
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
  var keys2 = Object.keys(value);
  var visibleKeys = arrayToHash(keys2);
  if (ctx.showHidden) {
    keys2 = Object.getOwnPropertyNames(value);
  }
  if (
    isError(value) &&
    (keys2.indexOf('message') >= 0 || keys2.indexOf('description') >= 0)
  ) {
    return formatError(value);
  }
  if (keys2.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }
  var base = '',
    array = false,
    braces = ['{', '}'];
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }
  if (isFunction(value)) {
    var n3 = value.name ? ': ' + value.name : '';
    base = ' [Function' + n3 + ']';
  }
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }
  if (isError(value)) {
    base = ' ' + formatError(value);
  }
  if (keys2.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }
  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }
  ctx.seen.push(value);
  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys2);
  } else {
    output = keys2.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }
  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}
function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple =
      "'" +
      JSON.stringify(value)
        .replace(/^"|"$/g, '')
        .replace(/'/g, "\\'")
        .replace(/\\"/g, '"') +
      "'";
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
  if (isNull(value)) return ctx.stylize('null', 'null');
}
function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys2) {
  var output = [];
  for (var i2 = 0, l = value.length; i2 < l; ++i2) {
    if (hasOwnProperty(value, String(i2))) {
      output.push(
        formatProperty(ctx, value, recurseTimes, visibleKeys, String(i2), true),
      );
    } else {
      output.push('');
    }
  }
  keys2.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(
        formatProperty(ctx, value, recurseTimes, visibleKeys, key, true),
      );
    }
  });
  return output;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str
            .split('\n')
            .map(function (line) {
              return '  ' + line;
            })
            .join('\n')
            .substr(2);
        } else {
          str =
            '\n' +
            str
              .split('\n')
              .map(function (line) {
                return '   ' + line;
              })
              .join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name
        .replace(/'/g, "\\'")
        .replace(/\\"/g, '"')
        .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }
  return name + ': ' + str;
}
function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);
  if (length > 60) {
    return (
      braces[0] +
      (base === '' ? '' : base + '\n ') +
      ' ' +
      output.join(',\n  ') +
      ' ' +
      braces[1]
    );
  }
  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}
function isArray(ar) {
  return Array.isArray(ar);
}
function isBoolean(arg) {
  return typeof arg === 'boolean';
}
function isNull(arg) {
  return arg === null;
}
function isNumber(arg) {
  return typeof arg === 'number';
}
function isString(arg) {
  return typeof arg === 'string';
}
function isUndefined(arg) {
  return arg === void 0;
}
function isRegExp(re) {
  return isObject2(re) && objectToString(re) === '[object RegExp]';
}
function isObject2(arg) {
  return typeof arg === 'object' && arg !== null;
}
function isDate(d2) {
  return isObject2(d2) && objectToString(d2) === '[object Date]';
}
function isError(e8) {
  return (
    isObject2(e8) &&
    (objectToString(e8) === '[object Error]' || e8 instanceof Error)
  );
}
function isFunction(arg) {
  return typeof arg === 'function';
}
function objectToString(o) {
  return Object.prototype.toString.call(o);
}
function _extend(origin, add) {
  if (!add || !isObject2(add)) return origin;
  var keys2 = Object.keys(add);
  var i2 = keys2.length;
  while (i2--) {
    origin[keys2[i2]] = add[keys2[i2]];
  }
  return origin;
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var formatRegExp, debugs, debugEnviron;
var init_util = __esm({
  'node-modules-polyfills:util'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_process2();
    init_inherits();
    formatRegExp = /%[sdj%]/g;
    debugs = {};
    inspect.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39],
    };
    inspect.styles = {
      special: 'cyan',
      number: 'yellow',
      boolean: 'yellow',
      undefined: 'grey',
      null: 'bold',
      string: 'green',
      date: 'magenta',
      // "name": intentionally not styling
      regexp: 'red',
    };
  },
});

// node-modules-polyfills:buffer
function init2() {
  inited2 = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i2 = 0, len = code.length; i2 < len; ++i2) {
    lookup2[i2] = code[i2];
    revLookup2[code.charCodeAt(i2)] = i2;
  }
  revLookup2['-'.charCodeAt(0)] = 62;
  revLookup2['_'.charCodeAt(0)] = 63;
}
function toByteArray(b64) {
  if (!inited2) {
    init2();
  }
  var i2, j, l, tmp, placeHolders, arr;
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
  arr = new Arr2((len * 3) / 4 - placeHolders);
  l = placeHolders > 0 ? len - 4 : len;
  var L = 0;
  for (i2 = 0, j = 0; i2 < l; i2 += 4, j += 3) {
    tmp =
      (revLookup2[b64.charCodeAt(i2)] << 18) |
      (revLookup2[b64.charCodeAt(i2 + 1)] << 12) |
      (revLookup2[b64.charCodeAt(i2 + 2)] << 6) |
      revLookup2[b64.charCodeAt(i2 + 3)];
    arr[L++] = (tmp >> 16) & 255;
    arr[L++] = (tmp >> 8) & 255;
    arr[L++] = tmp & 255;
  }
  if (placeHolders === 2) {
    tmp =
      (revLookup2[b64.charCodeAt(i2)] << 2) |
      (revLookup2[b64.charCodeAt(i2 + 1)] >> 4);
    arr[L++] = tmp & 255;
  } else if (placeHolders === 1) {
    tmp =
      (revLookup2[b64.charCodeAt(i2)] << 10) |
      (revLookup2[b64.charCodeAt(i2 + 1)] << 4) |
      (revLookup2[b64.charCodeAt(i2 + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 255;
    arr[L++] = tmp & 255;
  }
  return arr;
}
function tripletToBase642(num) {
  return (
    lookup2[(num >> 18) & 63] +
    lookup2[(num >> 12) & 63] +
    lookup2[(num >> 6) & 63] +
    lookup2[num & 63]
  );
}
function encodeChunk2(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i2 = start; i2 < end; i2 += 3) {
    tmp = (uint8[i2] << 16) + (uint8[i2 + 1] << 8) + uint8[i2 + 2];
    output.push(tripletToBase642(tmp));
  }
  return output.join('');
}
function fromByteArray(uint8) {
  if (!inited2) {
    init2();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var output = '';
  var parts = [];
  var maxChunkLength = 16383;
  for (var i2 = 0, len2 = len - extraBytes; i2 < len2; i2 += maxChunkLength) {
    parts.push(
      encodeChunk2(
        uint8,
        i2,
        i2 + maxChunkLength > len2 ? len2 : i2 + maxChunkLength,
      ),
    );
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup2[tmp >> 2];
    output += lookup2[(tmp << 4) & 63];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup2[tmp >> 10];
    output += lookup2[(tmp >> 4) & 63];
    output += lookup2[(tmp << 2) & 63];
    output += '=';
  }
  parts.push(output);
  return parts.join('');
}
function read(buffer, offset, isLE, mLen, nBytes) {
  var e8, m2;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i2 = isLE ? nBytes - 1 : 0;
  var d2 = isLE ? -1 : 1;
  var s3 = buffer[offset + i2];
  i2 += d2;
  e8 = s3 & ((1 << -nBits) - 1);
  s3 >>= -nBits;
  nBits += eLen;
  for (
    ;
    nBits > 0;
    e8 = e8 * 256 + buffer[offset + i2], i2 += d2, nBits -= 8
  ) {}
  m2 = e8 & ((1 << -nBits) - 1);
  e8 >>= -nBits;
  nBits += mLen;
  for (
    ;
    nBits > 0;
    m2 = m2 * 256 + buffer[offset + i2], i2 += d2, nBits -= 8
  ) {}
  if (e8 === 0) {
    e8 = 1 - eBias;
  } else if (e8 === eMax) {
    return m2 ? NaN : (s3 ? -1 : 1) * Infinity;
  } else {
    m2 = m2 + Math.pow(2, mLen);
    e8 = e8 - eBias;
  }
  return (s3 ? -1 : 1) * m2 * Math.pow(2, e8 - mLen);
}
function write2(buffer, value, offset, isLE, mLen, nBytes) {
  var e8, m2, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i2 = isLE ? 0 : nBytes - 1;
  var d2 = isLE ? 1 : -1;
  var s3 = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m2 = isNaN(value) ? 1 : 0;
    e8 = eMax;
  } else {
    e8 = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e8)) < 1) {
      e8--;
      c *= 2;
    }
    if (e8 + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e8++;
      c /= 2;
    }
    if (e8 + eBias >= eMax) {
      m2 = 0;
      e8 = eMax;
    } else if (e8 + eBias >= 1) {
      m2 = (value * c - 1) * Math.pow(2, mLen);
      e8 = e8 + eBias;
    } else {
      m2 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e8 = 0;
    }
  }
  for (
    ;
    mLen >= 8;
    buffer[offset + i2] = m2 & 255, i2 += d2, m2 /= 256, mLen -= 8
  ) {}
  e8 = (e8 << mLen) | m2;
  eLen += mLen;
  for (
    ;
    eLen > 0;
    buffer[offset + i2] = e8 & 255, i2 += d2, e8 /= 256, eLen -= 8
  ) {}
  buffer[offset + i2 - d2] |= s3 * 128;
}
function kMaxLength2() {
  return Buffer3.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer2(that, length) {
  if (kMaxLength2() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer3.TYPED_ARRAY_SUPPORT) {
    that = new Uint8Array(length);
    that.__proto__ = Buffer3.prototype;
  } else {
    if (that === null) {
      that = new Buffer3(length);
    }
    that.length = length;
  }
  return that;
}
function Buffer3(arg, encodingOrOffset, length) {
  if (!Buffer3.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer3)) {
    return new Buffer3(arg, encodingOrOffset, length);
  }
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string',
      );
    }
    return allocUnsafe2(this, arg);
  }
  return from2(this, arg, encodingOrOffset, length);
}
function from2(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer2(that, value, encodingOrOffset, length);
  }
  if (typeof value === 'string') {
    return fromString2(that, value, encodingOrOffset);
  }
  return fromObject2(that, value);
}
function assertSize2(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}
function alloc2(that, size, fill3, encoding) {
  assertSize2(size);
  if (size <= 0) {
    return createBuffer2(that, size);
  }
  if (fill3 !== void 0) {
    return typeof encoding === 'string'
      ? createBuffer2(that, size).fill(fill3, encoding)
      : createBuffer2(that, size).fill(fill3);
  }
  return createBuffer2(that, size);
}
function allocUnsafe2(that, size) {
  assertSize2(size);
  that = createBuffer2(that, size < 0 ? 0 : checked2(size) | 0);
  if (!Buffer3.TYPED_ARRAY_SUPPORT) {
    for (var i2 = 0; i2 < size; ++i2) {
      that[i2] = 0;
    }
  }
  return that;
}
function fromString2(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }
  if (!Buffer3.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }
  var length = byteLength2(string, encoding) | 0;
  that = createBuffer2(that, length);
  var actual = that.write(string, encoding);
  if (actual !== length) {
    that = that.slice(0, actual);
  }
  return that;
}
function fromArrayLike2(that, array) {
  var length = array.length < 0 ? 0 : checked2(array.length) | 0;
  that = createBuffer2(that, length);
  for (var i2 = 0; i2 < length; i2 += 1) {
    that[i2] = array[i2] & 255;
  }
  return that;
}
function fromArrayBuffer2(that, array, byteOffset, length) {
  array.byteLength;
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError("'offset' is out of bounds");
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError("'length' is out of bounds");
  }
  if (byteOffset === void 0 && length === void 0) {
    array = new Uint8Array(array);
  } else if (length === void 0) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }
  if (Buffer3.TYPED_ARRAY_SUPPORT) {
    that = array;
    that.__proto__ = Buffer3.prototype;
  } else {
    that = fromArrayLike2(that, array);
  }
  return that;
}
function fromObject2(that, obj) {
  if (internalIsBuffer2(obj)) {
    var len = checked2(obj.length) | 0;
    that = createBuffer2(that, len);
    if (that.length === 0) {
      return that;
    }
    obj.copy(that, 0, 0, len);
    return that;
  }
  if (obj) {
    if (
      (typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) ||
      'length' in obj
    ) {
      if (typeof obj.length !== 'number' || isnan2(obj.length)) {
        return createBuffer2(that, 0);
      }
      return fromArrayLike2(that, obj);
    }
    if (obj.type === 'Buffer' && isArray2(obj.data)) {
      return fromArrayLike2(that, obj.data);
    }
  }
  throw new TypeError(
    'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.',
  );
}
function checked2(length) {
  if (length >= kMaxLength2()) {
    throw new RangeError(
      'Attempt to allocate Buffer larger than maximum size: 0x' +
        kMaxLength2().toString(16) +
        ' bytes',
    );
  }
  return length | 0;
}
function internalIsBuffer2(b2) {
  return !!(b2 != null && b2._isBuffer);
}
function byteLength2(string, encoding) {
  if (internalIsBuffer2(string)) {
    return string.length;
  }
  if (
    typeof ArrayBuffer !== 'undefined' &&
    typeof ArrayBuffer.isView === 'function' &&
    (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)
  ) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }
  var len = string.length;
  if (len === 0) return 0;
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
      case void 0:
        return utf8ToBytes2(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes2(string).length;
      default:
        if (loweredCase) return utf8ToBytes2(string).length;
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
function slowToString2(encoding, start, end) {
  var loweredCase = false;
  if (start === void 0 || start < 0) {
    start = 0;
  }
  if (start > this.length) {
    return '';
  }
  if (end === void 0 || end > this.length) {
    end = this.length;
  }
  if (end <= 0) {
    return '';
  }
  end >>>= 0;
  start >>>= 0;
  if (end <= start) {
    return '';
  }
  if (!encoding) encoding = 'utf8';
  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice2(this, start, end);
      case 'utf8':
      case 'utf-8':
        return utf8Slice2(this, start, end);
      case 'ascii':
        return asciiSlice2(this, start, end);
      case 'latin1':
      case 'binary':
        return latin1Slice2(this, start, end);
      case 'base64':
        return base64Slice2(this, start, end);
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice2(this, start, end);
      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}
function swap2(b2, n3, m2) {
  var i2 = b2[n3];
  b2[n3] = b2[m2];
  b2[m2] = i2;
}
function bidirectionalIndexOf2(buffer, val, byteOffset, encoding, dir) {
  if (buffer.length === 0) return -1;
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 2147483647) {
    byteOffset = 2147483647;
  } else if (byteOffset < -2147483648) {
    byteOffset = -2147483648;
  }
  byteOffset = +byteOffset;
  if (isNaN(byteOffset)) {
    byteOffset = dir ? 0 : buffer.length - 1;
  }
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1;
  }
  if (typeof val === 'string') {
    val = Buffer3.from(val, encoding);
  }
  if (internalIsBuffer2(val)) {
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf2(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 255;
    if (
      Buffer3.TYPED_ARRAY_SUPPORT &&
      typeof Uint8Array.prototype.indexOf === 'function'
    ) {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf2(buffer, [val], byteOffset, encoding, dir);
  }
  throw new TypeError('val must be string, number or Buffer');
}
function arrayIndexOf2(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
  if (encoding !== void 0) {
    encoding = String(encoding).toLowerCase();
    if (
      encoding === 'ucs2' ||
      encoding === 'ucs-2' ||
      encoding === 'utf16le' ||
      encoding === 'utf-16le'
    ) {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }
  function read2(buf, i3) {
    if (indexSize === 1) {
      return buf[i3];
    } else {
      return buf.readUInt16BE(i3 * indexSize);
    }
  }
  var i2;
  if (dir) {
    var foundIndex = -1;
    for (i2 = byteOffset; i2 < arrLength; i2++) {
      if (
        read2(arr, i2) === read2(val, foundIndex === -1 ? 0 : i2 - foundIndex)
      ) {
        if (foundIndex === -1) foundIndex = i2;
        if (i2 - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i2 -= i2 - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i2 = byteOffset; i2 >= 0; i2--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read2(arr, i2 + j) !== read2(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i2;
    }
  }
  return -1;
}
function hexWrite2(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i2 = 0; i2 < length; ++i2) {
    var parsed = parseInt(string.substr(i2 * 2, 2), 16);
    if (isNaN(parsed)) return i2;
    buf[offset + i2] = parsed;
  }
  return i2;
}
function utf8Write2(buf, string, offset, length) {
  return blitBuffer2(
    utf8ToBytes2(string, buf.length - offset),
    buf,
    offset,
    length,
  );
}
function asciiWrite2(buf, string, offset, length) {
  return blitBuffer2(asciiToBytes2(string), buf, offset, length);
}
function latin1Write2(buf, string, offset, length) {
  return asciiWrite2(buf, string, offset, length);
}
function base64Write2(buf, string, offset, length) {
  return blitBuffer2(base64ToBytes2(string), buf, offset, length);
}
function ucs2Write2(buf, string, offset, length) {
  return blitBuffer2(
    utf16leToBytes2(string, buf.length - offset),
    buf,
    offset,
    length,
  );
}
function base64Slice2(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf);
  } else {
    return fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice2(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i2 = start;
  while (i2 < end) {
    var firstByte = buf[i2];
    var codePoint = null;
    var bytesPerSequence =
      firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (i2 + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i2 + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = ((firstByte & 31) << 6) | (secondByte & 63);
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i2 + 1];
          thirdByte = buf[i2 + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint =
              ((firstByte & 15) << 12) |
              ((secondByte & 63) << 6) |
              (thirdByte & 63);
            if (
              tempCodePoint > 2047 &&
              (tempCodePoint < 55296 || tempCodePoint > 57343)
            ) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i2 + 1];
          thirdByte = buf[i2 + 2];
          fourthByte = buf[i2 + 3];
          if (
            (secondByte & 192) === 128 &&
            (thirdByte & 192) === 128 &&
            (fourthByte & 192) === 128
          ) {
            tempCodePoint =
              ((firstByte & 15) << 18) |
              ((secondByte & 63) << 12) |
              ((thirdByte & 63) << 6) |
              (fourthByte & 63);
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(((codePoint >>> 10) & 1023) | 55296);
      codePoint = 56320 | (codePoint & 1023);
    }
    res.push(codePoint);
    i2 += bytesPerSequence;
  }
  return decodeCodePointsArray2(res);
}
function decodeCodePointsArray2(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH2) {
    return String.fromCharCode.apply(String, codePoints);
  }
  var res = '';
  var i2 = 0;
  while (i2 < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i2, (i2 += MAX_ARGUMENTS_LENGTH2)),
    );
  }
  return res;
}
function asciiSlice2(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);
  for (var i2 = start; i2 < end; ++i2) {
    ret += String.fromCharCode(buf[i2] & 127);
  }
  return ret;
}
function latin1Slice2(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);
  for (var i2 = start; i2 < end; ++i2) {
    ret += String.fromCharCode(buf[i2]);
  }
  return ret;
}
function hexSlice2(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';
  for (var i2 = start; i2 < end; ++i2) {
    out += toHex2(buf[i2]);
  }
  return out;
}
function utf16leSlice2(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i2 = 0; i2 < bytes.length; i2 += 2) {
    res += String.fromCharCode(bytes[i2] + bytes[i2 + 1] * 256);
  }
  return res;
}
function checkOffset2(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0)
    throw new RangeError('offset is not uint');
  if (offset + ext > length)
    throw new RangeError('Trying to access beyond buffer length');
}
function checkInt2(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer2(buf))
    throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min)
    throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}
function objectWriteUInt162(buf, value, offset, littleEndian) {
  if (value < 0) value = 65535 + value + 1;
  for (var i2 = 0, j = Math.min(buf.length - offset, 2); i2 < j; ++i2) {
    buf[offset + i2] =
      (value & (255 << (8 * (littleEndian ? i2 : 1 - i2)))) >>>
      ((littleEndian ? i2 : 1 - i2) * 8);
  }
}
function objectWriteUInt322(buf, value, offset, littleEndian) {
  if (value < 0) value = 4294967295 + value + 1;
  for (var i2 = 0, j = Math.min(buf.length - offset, 4); i2 < j; ++i2) {
    buf[offset + i2] = (value >>> ((littleEndian ? i2 : 3 - i2) * 8)) & 255;
  }
}
function checkIEEE7542(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}
function writeFloat2(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE7542(buf, value, offset, 4);
  }
  write2(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
function writeDouble2(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE7542(buf, value, offset, 8);
  }
  write2(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
function base64clean2(str) {
  str = stringtrim2(str).replace(INVALID_BASE64_RE2, '');
  if (str.length < 2) return '';
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}
function stringtrim2(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}
function toHex2(n3) {
  if (n3 < 16) return '0' + n3.toString(16);
  return n3.toString(16);
}
function utf8ToBytes2(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i2 = 0; i2 < length; ++i2) {
    codePoint = string.charCodeAt(i2);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          continue;
        } else if (i2 + 1 === length) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint =
        (((leadSurrogate - 55296) << 10) | (codePoint - 56320)) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1) bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0) break;
      bytes.push((codePoint >> 6) | 192, (codePoint & 63) | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0) break;
      bytes.push(
        (codePoint >> 12) | 224,
        ((codePoint >> 6) & 63) | 128,
        (codePoint & 63) | 128,
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0) break;
      bytes.push(
        (codePoint >> 18) | 240,
        ((codePoint >> 12) & 63) | 128,
        ((codePoint >> 6) & 63) | 128,
        (codePoint & 63) | 128,
      );
    } else {
      throw new Error('Invalid code point');
    }
  }
  return bytes;
}
function asciiToBytes2(str) {
  var byteArray = [];
  for (var i2 = 0; i2 < str.length; ++i2) {
    byteArray.push(str.charCodeAt(i2) & 255);
  }
  return byteArray;
}
function utf16leToBytes2(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i2 = 0; i2 < str.length; ++i2) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i2);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return byteArray;
}
function base64ToBytes2(str) {
  return toByteArray(base64clean2(str));
}
function blitBuffer2(src, dst, offset, length) {
  for (var i2 = 0; i2 < length; ++i2) {
    if (i2 + offset >= dst.length || i2 >= src.length) break;
    dst[i2 + offset] = src[i2];
  }
  return i2;
}
function isnan2(val) {
  return val !== val;
}
function isBuffer2(obj) {
  return (
    obj != null && (!!obj._isBuffer || isFastBuffer2(obj) || isSlowBuffer2(obj))
  );
}
function isFastBuffer2(obj) {
  return (
    !!obj.constructor &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  );
}
function isSlowBuffer2(obj) {
  return (
    typeof obj.readFloatLE === 'function' &&
    typeof obj.slice === 'function' &&
    isFastBuffer2(obj.slice(0, 0))
  );
}
var lookup2,
  revLookup2,
  Arr2,
  inited2,
  toString2,
  isArray2,
  INSPECT_MAX_BYTES,
  _kMaxLength,
  MAX_ARGUMENTS_LENGTH2,
  INVALID_BASE64_RE2;
var init_buffer2 = __esm({
  'node-modules-polyfills:buffer'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    lookup2 = [];
    revLookup2 = [];
    Arr2 = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
    inited2 = false;
    toString2 = {}.toString;
    isArray2 =
      Array.isArray ||
      function (arr) {
        return toString2.call(arr) == '[object Array]';
      };
    INSPECT_MAX_BYTES = 50;
    Buffer3.TYPED_ARRAY_SUPPORT =
      globalThis.TYPED_ARRAY_SUPPORT !== void 0
        ? globalThis.TYPED_ARRAY_SUPPORT
        : true;
    _kMaxLength = kMaxLength2();
    Buffer3.poolSize = 8192;
    Buffer3._augment = function (arr) {
      arr.__proto__ = Buffer3.prototype;
      return arr;
    };
    Buffer3.from = function (value, encodingOrOffset, length) {
      return from2(null, value, encodingOrOffset, length);
    };
    if (Buffer3.TYPED_ARRAY_SUPPORT) {
      Buffer3.prototype.__proto__ = Uint8Array.prototype;
      Buffer3.__proto__ = Uint8Array;
    }
    Buffer3.alloc = function (size, fill3, encoding) {
      return alloc2(null, size, fill3, encoding);
    };
    Buffer3.allocUnsafe = function (size) {
      return allocUnsafe2(null, size);
    };
    Buffer3.allocUnsafeSlow = function (size) {
      return allocUnsafe2(null, size);
    };
    Buffer3.isBuffer = isBuffer2;
    Buffer3.compare = function compare3(a4, b2) {
      if (!internalIsBuffer2(a4) || !internalIsBuffer2(b2)) {
        throw new TypeError('Arguments must be Buffers');
      }
      if (a4 === b2) return 0;
      var x2 = a4.length;
      var y2 = b2.length;
      for (var i2 = 0, len = Math.min(x2, y2); i2 < len; ++i2) {
        if (a4[i2] !== b2[i2]) {
          x2 = a4[i2];
          y2 = b2[i2];
          break;
        }
      }
      if (x2 < y2) return -1;
      if (y2 < x2) return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding2(encoding) {
      switch (String(encoding).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return true;
        default:
          return false;
      }
    };
    Buffer3.concat = function concat2(list, length) {
      if (!isArray2(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      var i2;
      if (length === void 0) {
        length = 0;
        for (i2 = 0; i2 < list.length; ++i2) {
          length += list[i2].length;
        }
      }
      var buffer = Buffer3.allocUnsafe(length);
      var pos = 0;
      for (i2 = 0; i2 < list.length; ++i2) {
        var buf = list[i2];
        if (!internalIsBuffer2(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    };
    Buffer3.byteLength = byteLength2;
    Buffer3.prototype._isBuffer = true;
    Buffer3.prototype.swap16 = function swap162() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits');
      }
      for (var i2 = 0; i2 < len; i2 += 2) {
        swap2(this, i2, i2 + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap322() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits');
      }
      for (var i2 = 0; i2 < len; i2 += 4) {
        swap2(this, i2, i2 + 3);
        swap2(this, i2 + 1, i2 + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap642() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits');
      }
      for (var i2 = 0; i2 < len; i2 += 8) {
        swap2(this, i2, i2 + 7);
        swap2(this, i2 + 1, i2 + 6);
        swap2(this, i2 + 2, i2 + 5);
        swap2(this, i2 + 3, i2 + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString3() {
      var length = this.length | 0;
      if (length === 0) return '';
      if (arguments.length === 0) return utf8Slice2(this, 0, length);
      return slowToString2.apply(this, arguments);
    };
    Buffer3.prototype.equals = function equals2(b2) {
      if (!internalIsBuffer2(b2))
        throw new TypeError('Argument must be a Buffer');
      if (this === b2) return true;
      return Buffer3.compare(this, b2) === 0;
    };
    Buffer3.prototype.inspect = function inspect2() {
      var str = '';
      var max = INSPECT_MAX_BYTES;
      if (this.length > 0) {
        str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
        if (this.length > max) str += ' ... ';
      }
      return '<Buffer ' + str + '>';
    };
    Buffer3.prototype.compare = function compare4(
      target,
      start,
      end,
      thisStart,
      thisEnd,
    ) {
      if (!internalIsBuffer2(target)) {
        throw new TypeError('Argument must be a Buffer');
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (
        start < 0 ||
        end > target.length ||
        thisStart < 0 ||
        thisEnd > this.length
      ) {
        throw new RangeError('out of range index');
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      var x2 = thisEnd - thisStart;
      var y2 = end - start;
      var len = Math.min(x2, y2);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i2 = 0; i2 < len; ++i2) {
        if (thisCopy[i2] !== targetCopy[i2]) {
          x2 = thisCopy[i2];
          y2 = targetCopy[i2];
          break;
        }
      }
      if (x2 < y2) return -1;
      if (y2 < x2) return 1;
      return 0;
    };
    Buffer3.prototype.includes = function includes2(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf2(val, byteOffset, encoding) {
      return bidirectionalIndexOf2(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf2(
      val,
      byteOffset,
      encoding,
    ) {
      return bidirectionalIndexOf2(this, val, byteOffset, encoding, false);
    };
    Buffer3.prototype.write = function write3(
      string,
      offset,
      length,
      encoding,
    ) {
      if (offset === void 0) {
        encoding = 'utf8';
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === 'string') {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) {
          length = length | 0;
          if (encoding === void 0) encoding = 'utf8';
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          'Buffer.write(string, encoding, offset[, length]) is no longer supported',
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (
        (string.length > 0 && (length < 0 || offset < 0)) ||
        offset > this.length
      ) {
        throw new RangeError('Attempt to write outside buffer bounds');
      }
      if (!encoding) encoding = 'utf8';
      var loweredCase = false;
      for (;;) {
        switch (encoding) {
          case 'hex':
            return hexWrite2(this, string, offset, length);
          case 'utf8':
          case 'utf-8':
            return utf8Write2(this, string, offset, length);
          case 'ascii':
            return asciiWrite2(this, string, offset, length);
          case 'latin1':
          case 'binary':
            return latin1Write2(this, string, offset, length);
          case 'base64':
            return base64Write2(this, string, offset, length);
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ucs2Write2(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError('Unknown encoding: ' + encoding);
            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON2() {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    };
    MAX_ARGUMENTS_LENGTH2 = 4096;
    Buffer3.prototype.slice = function slice2(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      var newBuf;
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer3.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer3(sliceLen, void 0);
        for (var i2 = 0; i2 < sliceLen; ++i2) {
          newBuf[i2] = this[i2 + start];
        }
      }
      return newBuf;
    };
    Buffer3.prototype.readUIntLE = function readUIntLE2(
      offset,
      byteLength3,
      noAssert,
    ) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) checkOffset2(offset, byteLength3, this.length);
      var val = this[offset];
      var mul = 1;
      var i2 = 0;
      while (++i2 < byteLength3 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUIntBE = function readUIntBE2(
      offset,
      byteLength3,
      noAssert,
    ) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) {
        checkOffset2(offset, byteLength3, this.length);
      }
      var val = this[offset + --byteLength3];
      var mul = 1;
      while (byteLength3 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength3] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUInt8 = function readUInt82(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUInt16LE = function readUInt16LE2(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 2, this.length);
      return this[offset] | (this[offset + 1] << 8);
    };
    Buffer3.prototype.readUInt16BE = function readUInt16BE2(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 2, this.length);
      return (this[offset] << 8) | this[offset + 1];
    };
    Buffer3.prototype.readUInt32LE = function readUInt32LE2(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 4, this.length);
      return (
        (this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16)) +
        this[offset + 3] * 16777216
      );
    };
    Buffer3.prototype.readUInt32BE = function readUInt32BE2(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 4, this.length);
      return (
        this[offset] * 16777216 +
        ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3])
      );
    };
    Buffer3.prototype.readIntLE = function readIntLE2(
      offset,
      byteLength3,
      noAssert,
    ) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) checkOffset2(offset, byteLength3, this.length);
      var val = this[offset];
      var mul = 1;
      var i2 = 0;
      while (++i2 < byteLength3 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE2(
      offset,
      byteLength3,
      noAssert,
    ) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) checkOffset2(offset, byteLength3, this.length);
      var i2 = byteLength3;
      var mul = 1;
      var val = this[offset + --i2];
      while (i2 > 0 && (mul *= 256)) {
        val += this[offset + --i2] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt82(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE2(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 2, this.length);
      var val = this[offset] | (this[offset + 1] << 8);
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE2(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 2, this.length);
      var val = this[offset + 1] | (this[offset] << 8);
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE2(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 4, this.length);
      return (
        this[offset] |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16) |
        (this[offset + 3] << 24)
      );
    };
    Buffer3.prototype.readInt32BE = function readInt32BE2(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 4, this.length);
      return (
        (this[offset] << 24) |
        (this[offset + 1] << 16) |
        (this[offset + 2] << 8) |
        this[offset + 3]
      );
    };
    Buffer3.prototype.readFloatLE = function readFloatLE2(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 4, this.length);
      return read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE2(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 4, this.length);
      return read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE2(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 8, this.length);
      return read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE2(offset, noAssert) {
      if (!noAssert) checkOffset2(offset, 8, this.length);
      return read(this, offset, false, 52, 8);
    };
    Buffer3.prototype.writeUIntLE = function writeUIntLE2(
      value,
      offset,
      byteLength3,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt2(this, value, offset, byteLength3, maxBytes, 0);
      }
      var mul = 1;
      var i2 = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength3 && (mul *= 256)) {
        this[offset + i2] = (value / mul) & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeUIntBE = function writeUIntBE2(
      value,
      offset,
      byteLength3,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt2(this, value, offset, byteLength3, maxBytes, 0);
      }
      var i2 = byteLength3 - 1;
      var mul = 1;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        this[offset + i2] = (value / mul) & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeUInt8 = function writeUInt82(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt2(this, value, offset, 1, 255, 0);
      if (!Buffer3.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUInt16LE = function writeUInt16LE2(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt2(this, value, offset, 2, 65535, 0);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt162(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer3.prototype.writeUInt16BE = function writeUInt16BE2(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt2(this, value, offset, 2, 65535, 0);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt162(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer3.prototype.writeUInt32LE = function writeUInt32LE2(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt2(this, value, offset, 4, 4294967295, 0);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
      } else {
        objectWriteUInt322(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer3.prototype.writeUInt32BE = function writeUInt32BE2(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt2(this, value, offset, 4, 4294967295, 0);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt322(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer3.prototype.writeIntLE = function writeIntLE2(
      value,
      offset,
      byteLength3,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt2(this, value, offset, byteLength3, limit - 1, -limit);
      }
      var i2 = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength3 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (((value / mul) >> 0) - sub) & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE2(
      value,
      offset,
      byteLength3,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt2(this, value, offset, byteLength3, limit - 1, -limit);
      }
      var i2 = byteLength3 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (((value / mul) >> 0) - sub) & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeInt8 = function writeInt82(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt2(this, value, offset, 1, 127, -128);
      if (!Buffer3.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE2(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt2(this, value, offset, 2, 32767, -32768);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt162(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE2(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt2(this, value, offset, 2, 32767, -32768);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt162(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE2(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt2(this, value, offset, 4, 2147483647, -2147483648);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt322(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE2(
      value,
      offset,
      noAssert,
    ) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt2(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt322(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer3.prototype.writeFloatLE = function writeFloatLE2(
      value,
      offset,
      noAssert,
    ) {
      return writeFloat2(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE2(
      value,
      offset,
      noAssert,
    ) {
      return writeFloat2(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE2(
      value,
      offset,
      noAssert,
    ) {
      return writeDouble2(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE2(
      value,
      offset,
      noAssert,
    ) {
      return writeDouble2(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy2(target, targetStart, start, end) {
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds');
      }
      if (start < 0 || start >= this.length)
        throw new RangeError('sourceStart out of bounds');
      if (end < 0) throw new RangeError('sourceEnd out of bounds');
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      var i2;
      if (this === target && start < targetStart && targetStart < end) {
        for (i2 = len - 1; i2 >= 0; --i2) {
          target[i2 + targetStart] = this[i2 + start];
        }
      } else if (len < 1e3 || !Buffer3.TYPED_ARRAY_SUPPORT) {
        for (i2 = 0; i2 < len; ++i2) {
          target[i2 + targetStart] = this[i2 + start];
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart,
        );
      }
      return len;
    };
    Buffer3.prototype.fill = function fill2(val, start, end, encoding) {
      if (typeof val === 'string') {
        if (typeof start === 'string') {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === 'string') {
          encoding = end;
          end = this.length;
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (code < 256) {
            val = code;
          }
        }
        if (encoding !== void 0 && typeof encoding !== 'string') {
          throw new TypeError('encoding must be a string');
        }
        if (typeof encoding === 'string' && !Buffer3.isEncoding(encoding)) {
          throw new TypeError('Unknown encoding: ' + encoding);
        }
      } else if (typeof val === 'number') {
        val = val & 255;
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index');
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      var i2;
      if (typeof val === 'number') {
        for (i2 = start; i2 < end; ++i2) {
          this[i2] = val;
        }
      } else {
        var bytes = internalIsBuffer2(val)
          ? val
          : utf8ToBytes2(new Buffer3(val, encoding).toString());
        var len = bytes.length;
        for (i2 = 0; i2 < end - start; ++i2) {
          this[i2 + start] = bytes[i2 % len];
        }
      }
      return this;
    };
    INVALID_BASE64_RE2 = /[^+\/0-9A-Za-z-_]/g;
  },
});

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/buffer-list.js
function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}
var buffer_list_default;
var init_buffer_list = __esm({
  '../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/buffer-list.js'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_buffer2();
    buffer_list_default = BufferList;
    BufferList.prototype.push = function (v) {
      var entry = { data: v, next: null };
      if (this.length > 0) this.tail.next = entry;
      else this.head = entry;
      this.tail = entry;
      ++this.length;
    };
    BufferList.prototype.unshift = function (v) {
      var entry = { data: v, next: this.head };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    };
    BufferList.prototype.shift = function () {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;
      else this.head = this.head.next;
      --this.length;
      return ret;
    };
    BufferList.prototype.clear = function () {
      this.head = this.tail = null;
      this.length = 0;
    };
    BufferList.prototype.join = function (s3) {
      if (this.length === 0) return '';
      var p2 = this.head;
      var ret = '' + p2.data;
      while ((p2 = p2.next)) {
        ret += s3 + p2.data;
      }
      return ret;
    };
    BufferList.prototype.concat = function (n3) {
      if (this.length === 0) return Buffer3.alloc(0);
      if (this.length === 1) return this.head.data;
      var ret = Buffer3.allocUnsafe(n3 >>> 0);
      var p2 = this.head;
      var i2 = 0;
      while (p2) {
        p2.data.copy(ret, i2);
        i2 += p2.data.length;
        p2 = p2.next;
      }
      return ret;
    };
  },
});

// node-modules-polyfills:string_decoder
function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}
function StringDecoder(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }
  this.charBuffer = new Buffer3(6);
  this.charReceived = 0;
  this.charLength = 0;
}
function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}
function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}
function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}
var isBufferEncoding;
var init_string_decoder = __esm({
  'node-modules-polyfills:string_decoder'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_buffer2();
    isBufferEncoding =
      Buffer3.isEncoding ||
      function (encoding) {
        switch (encoding && encoding.toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
          case 'raw':
            return true;
          default:
            return false;
        }
      };
    StringDecoder.prototype.write = function (buffer) {
      var charStr = '';
      while (this.charLength) {
        var available =
          buffer.length >= this.charLength - this.charReceived
            ? this.charLength - this.charReceived
            : buffer.length;
        buffer.copy(this.charBuffer, this.charReceived, 0, available);
        this.charReceived += available;
        if (this.charReceived < this.charLength) {
          return '';
        }
        buffer = buffer.slice(available, buffer.length);
        charStr = this.charBuffer
          .slice(0, this.charLength)
          .toString(this.encoding);
        var charCode = charStr.charCodeAt(charStr.length - 1);
        if (charCode >= 55296 && charCode <= 56319) {
          this.charLength += this.surrogateSize;
          charStr = '';
          continue;
        }
        this.charReceived = this.charLength = 0;
        if (buffer.length === 0) {
          return charStr;
        }
        break;
      }
      this.detectIncompleteChar(buffer);
      var end = buffer.length;
      if (this.charLength) {
        buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
        end -= this.charReceived;
      }
      charStr += buffer.toString(this.encoding, 0, end);
      var end = charStr.length - 1;
      var charCode = charStr.charCodeAt(end);
      if (charCode >= 55296 && charCode <= 56319) {
        var size = this.surrogateSize;
        this.charLength += size;
        this.charReceived += size;
        this.charBuffer.copy(this.charBuffer, size, 0, size);
        buffer.copy(this.charBuffer, 0, 0, size);
        return charStr.substring(0, end);
      }
      return charStr;
    };
    StringDecoder.prototype.detectIncompleteChar = function (buffer) {
      var i2 = buffer.length >= 3 ? 3 : buffer.length;
      for (; i2 > 0; i2--) {
        var c = buffer[buffer.length - i2];
        if (i2 == 1 && c >> 5 == 6) {
          this.charLength = 2;
          break;
        }
        if (i2 <= 2 && c >> 4 == 14) {
          this.charLength = 3;
          break;
        }
        if (i2 <= 3 && c >> 3 == 30) {
          this.charLength = 4;
          break;
        }
      }
      this.charReceived = i2;
    };
    StringDecoder.prototype.end = function (buffer) {
      var res = '';
      if (buffer && buffer.length) res = this.write(buffer);
      if (this.charReceived) {
        var cr = this.charReceived;
        var buf = this.charBuffer;
        var enc = this.encoding;
        res += buf.slice(0, cr).toString(enc);
      }
      return res;
    };
  },
});

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js
function prependListener2(emitter, event, fn) {
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else emitter._events[event] = [fn, emitter._events[event]];
  }
}
function listenerCount2(emitter, type) {
  return emitter.listeners(type).length;
}
function ReadableState(options, stream) {
  options = options || {};
  this.objectMode = !!options.objectMode;
  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.readableObjectMode;
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
  this.highWaterMark = ~~this.highWaterMark;
  this.buffer = new buffer_list_default();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;
  this.sync = true;
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.defaultEncoding = options.defaultEncoding || 'utf8';
  this.ranOut = false;
  this.awaitDrain = 0;
  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}
function Readable(options) {
  if (!(this instanceof Readable)) return new Readable(options);
  this._readableState = new ReadableState(options, this);
  this.readable = true;
  if (options && typeof options.read === 'function') this._read = options.read;
  events_default.call(this);
}
function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || (chunk && chunk.length > 0)) {
    if (state.ended && !addToFront) {
      var e8 = new Error('stream.push() after EOF');
      stream.emit('error', e8);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }
      if (!addToFront) state.reading = false;
      if (!skipAdd) {
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);
          else state.buffer.push(chunk);
          if (state.needReadable) emitReadable(stream);
        }
      }
      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }
  return needMoreData(state);
}
function needMoreData(state) {
  return (
    !state.ended &&
    (state.needReadable ||
      state.length < state.highWaterMark ||
      state.length === 0)
  );
}
function computeNewHighWaterMark(n3) {
  if (n3 >= MAX_HWM) {
    n3 = MAX_HWM;
  } else {
    n3--;
    n3 |= n3 >>> 1;
    n3 |= n3 >>> 2;
    n3 |= n3 >>> 4;
    n3 |= n3 >>> 8;
    n3 |= n3 >>> 16;
    n3++;
  }
  return n3;
}
function howMuchToRead(n3, state) {
  if (n3 <= 0 || (state.length === 0 && state.ended)) return 0;
  if (state.objectMode) return 1;
  if (n3 !== n3) {
    if (state.flowing && state.length) return state.buffer.head.data.length;
    else return state.length;
  }
  if (n3 > state.highWaterMark)
    state.highWaterMark = computeNewHighWaterMark(n3);
  if (n3 <= state.length) return n3;
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}
function chunkInvalid(state, chunk) {
  var er = null;
  if (
    !Buffer2.isBuffer(chunk) &&
    typeof chunk !== 'string' &&
    chunk !== null &&
    chunk !== void 0 &&
    !state.objectMode
  ) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}
function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;
  emitReadable(stream);
}
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) nextTick2(emitReadable_, stream);
    else emitReadable_(stream);
  }
}
function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    nextTick2(maybeReadMore_, stream, state);
  }
}
function maybeReadMore_(stream, state) {
  var len = state.length;
  while (
    !state.reading &&
    !state.flowing &&
    !state.ended &&
    state.length < state.highWaterMark
  ) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) break;
    else len = state.length;
  }
  state.readingMore = false;
}
function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && src.listeners('data').length) {
      state.flowing = true;
      flow(src);
    }
  };
}
function nReadingNextTick(self2) {
  debug('readable nexttick read 0');
  self2.read(0);
}
function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    nextTick2(resume_, stream, state);
  }
}
function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }
  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}
function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}
function fromList(n3, state) {
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();
  else if (!n3 || n3 >= state.length) {
    if (state.decoder) ret = state.buffer.join('');
    else if (state.buffer.length === 1) ret = state.buffer.head.data;
    else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    ret = fromListPartial(n3, state.buffer, state.decoder);
  }
  return ret;
}
function fromListPartial(n3, list, hasStrings) {
  var ret;
  if (n3 < list.head.data.length) {
    ret = list.head.data.slice(0, n3);
    list.head.data = list.head.data.slice(n3);
  } else if (n3 === list.head.data.length) {
    ret = list.shift();
  } else {
    ret = hasStrings
      ? copyFromBufferString(n3, list)
      : copyFromBuffer(n3, list);
  }
  return ret;
}
function copyFromBufferString(n3, list) {
  var p2 = list.head;
  var c = 1;
  var ret = p2.data;
  n3 -= ret.length;
  while ((p2 = p2.next)) {
    var str = p2.data;
    var nb = n3 > str.length ? str.length : n3;
    if (nb === str.length) ret += str;
    else ret += str.slice(0, n3);
    n3 -= nb;
    if (n3 === 0) {
      if (nb === str.length) {
        ++c;
        if (p2.next) list.head = p2.next;
        else list.head = list.tail = null;
      } else {
        list.head = p2;
        p2.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}
function copyFromBuffer(n3, list) {
  var ret = Buffer2.allocUnsafe(n3);
  var p2 = list.head;
  var c = 1;
  p2.data.copy(ret);
  n3 -= p2.data.length;
  while ((p2 = p2.next)) {
    var buf = p2.data;
    var nb = n3 > buf.length ? buf.length : n3;
    buf.copy(ret, ret.length - n3, 0, nb);
    n3 -= nb;
    if (n3 === 0) {
      if (nb === buf.length) {
        ++c;
        if (p2.next) list.head = p2.next;
        else list.head = list.tail = null;
      } else {
        list.head = p2;
        p2.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}
function endReadable(stream) {
  var state = stream._readableState;
  if (state.length > 0)
    throw new Error('"endReadable()" called on non-empty stream');
  if (!state.endEmitted) {
    state.ended = true;
    nextTick2(endReadableNT, state, stream);
  }
}
function endReadableNT(state, stream) {
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}
function forEach(xs, f) {
  for (var i2 = 0, l = xs.length; i2 < l; i2++) {
    f(xs[i2], i2);
  }
}
function indexOf3(xs, x2) {
  for (var i2 = 0, l = xs.length; i2 < l; i2++) {
    if (xs[i2] === x2) return i2;
  }
  return -1;
}
var debug, MAX_HWM;
var init_readable = __esm({
  '../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js'() {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_events();
    init_util();
    init_buffer_list();
    init_string_decoder();
    init_duplex();
    init_process2();
    Readable.ReadableState = ReadableState;
    debug = debuglog('stream');
    inherits_default(Readable, events_default);
    Readable.prototype.push = function (chunk, encoding) {
      var state = this._readableState;
      if (!state.objectMode && typeof chunk === 'string') {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = Buffer2.from(chunk, encoding);
          encoding = '';
        }
      }
      return readableAddChunk(this, state, chunk, encoding, false);
    };
    Readable.prototype.unshift = function (chunk) {
      var state = this._readableState;
      return readableAddChunk(this, state, chunk, '', true);
    };
    Readable.prototype.isPaused = function () {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function (enc) {
      this._readableState.decoder = new StringDecoder(enc);
      this._readableState.encoding = enc;
      return this;
    };
    MAX_HWM = 8388608;
    Readable.prototype.read = function (n3) {
      debug('read', n3);
      n3 = parseInt(n3, 10);
      var state = this._readableState;
      var nOrig = n3;
      if (n3 !== 0) state.emittedReadable = false;
      if (
        n3 === 0 &&
        state.needReadable &&
        (state.length >= state.highWaterMark || state.ended)
      ) {
        debug('read: emitReadable', state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);
        else emitReadable(this);
        return null;
      }
      n3 = howMuchToRead(n3, state);
      if (n3 === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug('need readable', doRead);
      if (state.length === 0 || state.length - n3 < state.highWaterMark) {
        doRead = true;
        debug('length less than watermark', doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug('reading or ended', doRead);
      } else if (doRead) {
        debug('do read');
        state.reading = true;
        state.sync = true;
        if (state.length === 0) state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading) n3 = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n3 > 0) ret = fromList(n3, state);
      else ret = null;
      if (ret === null) {
        state.needReadable = true;
        n3 = 0;
      } else {
        state.length -= n3;
      }
      if (state.length === 0) {
        if (!state.ended) state.needReadable = true;
        if (nOrig !== n3 && state.ended) endReadable(this);
      }
      if (ret !== null) this.emit('data', ret);
      return ret;
    };
    Readable.prototype._read = function (n3) {
      this.emit('error', new Error('not implemented'));
    };
    Readable.prototype.pipe = function (dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
      var doEnd = !pipeOpts || pipeOpts.end !== false;
      var endFn = doEnd ? onend2 : cleanup;
      if (state.endEmitted) nextTick2(endFn);
      else src.once('end', endFn);
      dest.on('unpipe', onunpipe);
      function onunpipe(readable) {
        debug('onunpipe');
        if (readable === src) {
          cleanup();
        }
      }
      function onend2() {
        debug('onend');
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on('drain', ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug('cleanup');
        dest.removeListener('close', onclose);
        dest.removeListener('finish', onfinish);
        dest.removeListener('drain', ondrain);
        dest.removeListener('error', onerror);
        dest.removeListener('unpipe', onunpipe);
        src.removeListener('end', onend2);
        src.removeListener('end', cleanup);
        src.removeListener('data', ondata);
        cleanedUp = true;
        if (
          state.awaitDrain &&
          (!dest._writableState || dest._writableState.needDrain)
        )
          ondrain();
      }
      var increasedAwaitDrain = false;
      src.on('data', ondata);
      function ondata(chunk) {
        debug('ondata');
        increasedAwaitDrain = false;
        var ret = dest.write(chunk);
        if (false === ret && !increasedAwaitDrain) {
          if (
            ((state.pipesCount === 1 && state.pipes === dest) ||
              (state.pipesCount > 1 && indexOf3(state.pipes, dest) !== -1)) &&
            !cleanedUp
          ) {
            debug('false write response, pause', src._readableState.awaitDrain);
            src._readableState.awaitDrain++;
            increasedAwaitDrain = true;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug('onerror', er);
        unpipe();
        dest.removeListener('error', onerror);
        if (listenerCount2(dest, 'error') === 0) dest.emit('error', er);
      }
      prependListener2(dest, 'error', onerror);
      function onclose() {
        dest.removeListener('finish', onfinish);
        unpipe();
      }
      dest.once('close', onclose);
      function onfinish() {
        debug('onfinish');
        dest.removeListener('close', onclose);
        unpipe();
      }
      dest.once('finish', onfinish);
      function unpipe() {
        debug('unpipe');
        src.unpipe(dest);
      }
      dest.emit('pipe', src);
      if (!state.flowing) {
        debug('pipe resume');
        src.resume();
      }
      return dest;
    };
    Readable.prototype.unpipe = function (dest) {
      var state = this._readableState;
      if (state.pipesCount === 0) return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit('unpipe', this);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var _i = 0; _i < len; _i++) {
          dests[_i].emit('unpipe', this);
        }
        return this;
      }
      var i2 = indexOf3(state.pipes, dest);
      if (i2 === -1) return this;
      state.pipes.splice(i2, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1) state.pipes = state.pipes[0];
      dest.emit('unpipe', this);
      return this;
    };
    Readable.prototype.on = function (ev, fn) {
      var res = events_default.prototype.on.call(this, ev, fn);
      if (ev === 'data') {
        if (this._readableState.flowing !== false) this.resume();
      } else if (ev === 'readable') {
        var state = this._readableState;
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.emittedReadable = false;
          if (!state.reading) {
            nextTick2(nReadingNextTick, this);
          } else if (state.length) {
            emitReadable(this, state);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.resume = function () {
      var state = this._readableState;
      if (!state.flowing) {
        debug('resume');
        state.flowing = true;
        resume(this, state);
      }
      return this;
    };
    Readable.prototype.pause = function () {
      debug('call pause flowing=%j', this._readableState.flowing);
      if (false !== this._readableState.flowing) {
        debug('pause');
        this._readableState.flowing = false;
        this.emit('pause');
      }
      return this;
    };
    Readable.prototype.wrap = function (stream) {
      var state = this._readableState;
      var paused = false;
      var self2 = this;
      stream.on('end', function () {
        debug('wrapped end');
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) self2.push(chunk);
        }
        self2.push(null);
      });
      stream.on('data', function (chunk) {
        debug('wrapped data');
        if (state.decoder) chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0)) return;
        else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = self2.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i2 in stream) {
        if (this[i2] === void 0 && typeof stream[i2] === 'function') {
          this[i2] = (function (method) {
            return function () {
              return stream[method].apply(stream, arguments);
            };
          })(i2);
        }
      }
      var events = ['error', 'close', 'destroy', 'pause', 'resume'];
      forEach(events, function (ev) {
        stream.on(ev, self2.emit.bind(self2, ev));
      });
      self2._read = function (n3) {
        debug('wrapped _read', n3);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return self2;
    };
    Readable._fromList = fromList;
  },
});

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/writable.js
function nop() {}
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}
function WritableState(options, stream) {
  Object.defineProperty(this, 'buffer', {
    get: deprecate(function () {
      return this.getBuffer();
    }, '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.'),
  });
  options = options || {};
  this.objectMode = !!options.objectMode;
  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.writableObjectMode;
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
  this.highWaterMark = ~~this.highWaterMark;
  this.needDrain = false;
  this.ending = false;
  this.ended = false;
  this.finished = false;
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;
  this.defaultEncoding = options.defaultEncoding || 'utf8';
  this.length = 0;
  this.writing = false;
  this.corked = 0;
  this.sync = true;
  this.bufferProcessing = false;
  this.onwrite = function (er) {
    onwrite(stream, er);
  };
  this.writecb = null;
  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null;
  this.pendingcb = 0;
  this.prefinished = false;
  this.errorEmitted = false;
  this.bufferedRequestCount = 0;
  this.corkedRequestsFree = new CorkedRequest(this);
}
function Writable(options) {
  if (!(this instanceof Writable) && !(this instanceof Duplex))
    return new Writable(options);
  this._writableState = new WritableState(options, this);
  this.writable = true;
  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
  }
  EventEmitter2.call(this);
}
function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  stream.emit('error', er);
  nextTick2(cb, er);
}
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (
    !Buffer3.isBuffer(chunk) &&
    typeof chunk !== 'string' &&
    chunk !== void 0 &&
    !state.objectMode
  ) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    nextTick2(cb, er);
    valid = false;
  }
  return valid;
}
function decodeChunk(state, chunk, encoding) {
  if (
    !state.objectMode &&
    state.decodeStrings !== false &&
    typeof chunk === 'string'
  ) {
    chunk = Buffer3.from(chunk, encoding);
  }
  return chunk;
}
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);
  if (Buffer3.isBuffer(chunk)) encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark;
  if (!ret) state.needDrain = true;
  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }
  return ret;
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);
  else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}
function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) nextTick2(cb, er);
  else cb(er);
  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}
function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}
function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);
  else {
    var finished = needFinish(state);
    if (
      !finished &&
      !state.corked &&
      !state.bufferProcessing &&
      state.bufferedRequest
    ) {
      clearBuffer(stream, state);
    }
    if (sync) {
      nextTick2(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}
function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;
  if (stream._writev && entry && entry.next) {
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }
    doWrite(stream, state, true, state.length, buffer, '', holder.finish);
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      if (state.writing) {
        break;
      }
    }
    if (entry === null) state.lastBufferedRequest = null;
  }
  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}
function needFinish(state) {
  return (
    state.ending &&
    state.length === 0 &&
    state.bufferedRequest === null &&
    !state.finished &&
    !state.writing
  );
}
function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}
function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}
function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) nextTick2(cb);
    else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}
function CorkedRequest(state) {
  var _this = this;
  this.next = null;
  this.entry = null;
  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}
var init_writable = __esm({
  '../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/writable.js'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_util();
    init_buffer2();
    init_events();
    init_duplex();
    init_process2();
    Writable.WritableState = WritableState;
    inherits_default(Writable, EventEmitter2);
    WritableState.prototype.getBuffer = function writableStateGetBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    Writable.prototype.pipe = function () {
      this.emit('error', new Error('Cannot pipe, not readable'));
    };
    Writable.prototype.write = function (chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
      }
      if (Buffer3.isBuffer(chunk)) encoding = 'buffer';
      else if (!encoding) encoding = state.defaultEncoding;
      if (typeof cb !== 'function') cb = nop;
      if (state.ended) writeAfterEnd(this, cb);
      else if (validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function () {
      var state = this._writableState;
      state.corked++;
    };
    Writable.prototype.uncork = function () {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (
          !state.writing &&
          !state.corked &&
          !state.finished &&
          !state.bufferProcessing &&
          state.bufferedRequest
        )
          clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(
      encoding,
    ) {
      if (typeof encoding === 'string') encoding = encoding.toLowerCase();
      if (
        !(
          [
            'hex',
            'utf8',
            'utf-8',
            'ascii',
            'binary',
            'base64',
            'ucs2',
            'ucs-2',
            'utf16le',
            'utf-16le',
            'raw',
          ].indexOf((encoding + '').toLowerCase()) > -1
        )
      )
        throw new TypeError('Unknown encoding: ' + encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Writable.prototype._write = function (chunk, encoding, cb) {
      cb(new Error('not implemented'));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function (chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === 'function') {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending && !state.finished) endWritable(this, state, cb);
    };
  },
});

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/duplex.js
function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  if (options && options.readable === false) this.readable = false;
  if (options && options.writable === false) this.writable = false;
  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
  this.once('end', onend);
}
function onend() {
  if (this.allowHalfOpen || this._writableState.ended) return;
  nextTick2(onEndNT, this);
}
function onEndNT(self2) {
  self2.end();
}
var keys, method, v;
var init_duplex = __esm({
  '../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/duplex.js'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_util();
    init_process2();
    init_readable();
    init_writable();
    inherits_default(Duplex, Readable);
    keys = Object.keys(Writable.prototype);
    for (v = 0; v < keys.length; v++) {
      method = keys[v];
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    }
  },
});

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/transform.js
function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };
  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}
function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;
  var cb = ts.writecb;
  if (!cb)
    return stream.emit('error', new Error('no writecb in Transform class'));
  ts.writechunk = null;
  ts.writecb = null;
  if (data !== null && data !== void 0) stream.push(data);
  cb(er);
  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}
function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = new TransformState(this);
  var stream = this;
  this._readableState.needReadable = true;
  this._readableState.sync = false;
  if (options) {
    if (typeof options.transform === 'function')
      this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  }
  this.once('prefinish', function () {
    if (typeof this._flush === 'function')
      this._flush(function (er) {
        done(stream, er);
      });
    else done(stream);
  });
}
function done(stream, er) {
  if (er) return stream.emit('error', er);
  var ws = stream._writableState;
  var ts = stream._transformState;
  if (ws.length) throw new Error('Calling transform done when ws.length != 0');
  if (ts.transforming)
    throw new Error('Calling transform done when still transforming');
  return stream.push(null);
}
var init_transform = __esm({
  '../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/transform.js'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_duplex();
    init_util();
    inherits_default(Transform, Duplex);
    Transform.prototype.push = function (chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function (chunk, encoding, cb) {
      throw new Error('Not implemented');
    };
    Transform.prototype._write = function (chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function (n3) {
      var ts = this._transformState;
      if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
  },
});

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough.js
function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}
var init_passthrough = __esm({
  '../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough.js'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_transform();
    init_util();
    inherits_default(PassThrough, Transform);
    PassThrough.prototype._transform = function (chunk, encoding, cb) {
      cb(null, chunk);
    };
  },
});

// node-modules-polyfills:stream
var stream_exports = {};
__export(stream_exports, {
  Duplex: () => Duplex,
  PassThrough: () => PassThrough,
  Readable: () => Readable,
  Stream: () => Stream,
  Transform: () => Transform,
  Writable: () => Writable,
  default: () => stream_default,
});
function Stream() {
  events_default.call(this);
}
var stream_default;
var init_stream = __esm({
  'node-modules-polyfills:stream'() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_events();
    init_util();
    init_duplex();
    init_readable();
    init_writable();
    init_transform();
    init_passthrough();
    inherits_default(Stream, events_default);
    Stream.Readable = Readable;
    Stream.Writable = Writable;
    Stream.Duplex = Duplex;
    Stream.Transform = Transform;
    Stream.PassThrough = PassThrough;
    Stream.Stream = Stream;
    stream_default = Stream;
    Stream.prototype.pipe = function (dest, options) {
      var source = this;
      function ondata(chunk) {
        if (dest.writable) {
          if (false === dest.write(chunk) && source.pause) {
            source.pause();
          }
        }
      }
      source.on('data', ondata);
      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }
      dest.on('drain', ondrain);
      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on('end', onend2);
        source.on('close', onclose);
      }
      var didOnEnd = false;
      function onend2() {
        if (didOnEnd) return;
        didOnEnd = true;
        dest.end();
      }
      function onclose() {
        if (didOnEnd) return;
        didOnEnd = true;
        if (typeof dest.destroy === 'function') dest.destroy();
      }
      function onerror(er) {
        cleanup();
        if (events_default.listenerCount(this, 'error') === 0) {
          throw er;
        }
      }
      source.on('error', onerror);
      dest.on('error', onerror);
      function cleanup() {
        source.removeListener('data', ondata);
        dest.removeListener('drain', ondrain);
        source.removeListener('end', onend2);
        source.removeListener('close', onclose);
        source.removeListener('error', onerror);
        dest.removeListener('error', onerror);
        source.removeListener('end', cleanup);
        source.removeListener('close', cleanup);
        dest.removeListener('close', cleanup);
      }
      source.on('end', cleanup);
      source.on('close', cleanup);
      dest.on('close', cleanup);
      dest.emit('pipe', source);
      return dest;
    };
  },
});

// ../node_modules/@kitajs/html/index.js
var require_html = __commonJS({
  '../node_modules/@kitajs/html/index.js'(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var ESCAPED_REGEX = /[<"'&]/;
    var CAMEL_REGEX = /[a-z][A-Z]/;
    function isUpper(input, index) {
      const code = input.charCodeAt(index);
      return code >= 65 && code <= 90;
    }
    function toKebabCase(camel) {
      if (!CAMEL_REGEX.test(camel)) {
        return camel;
      }
      const length = camel.length;
      let start = 0;
      let end = 0;
      let kebab = '';
      let prev = true;
      let curr = isUpper(camel, 0);
      let next;
      for (; end < length; end++) {
        next = isUpper(camel, end + 1);
        if (!prev && curr && !next) {
          kebab += camel.slice(start, end) + '-' + camel[end].toLowerCase();
          start = end + 1;
        }
        prev = curr;
        curr = next;
      }
      kebab += camel.slice(start, end);
      return kebab;
    }
    var escapeHtml = function (value) {
      if (typeof value !== 'string') {
        value = value.toString();
      }
      if (!ESCAPED_REGEX.test(value)) {
        return value;
      }
      const length = value.length;
      let escaped = '';
      let start = 0;
      let end = 0;
      for (; end < length; end++) {
        switch (value[end]) {
          case '&':
            escaped += value.slice(start, end) + '&amp;';
            start = end + 1;
            continue;
          case '<':
            escaped += value.slice(start, end) + '&lt;';
            start = end + 1;
            continue;
          case '"':
            escaped += value.slice(start, end) + '&#34;';
            start = end + 1;
            continue;
          case "'":
            escaped += value.slice(start, end) + '&#39;';
            start = end + 1;
            continue;
        }
      }
      escaped += value.slice(start, end);
      return escaped;
    };
    if (typeof Bun !== 'undefined') escapeHtml = Bun.escapeHTML;
    function isVoidElement(tag) {
      return (
        tag === 'meta' ||
        tag === 'link' ||
        tag === 'img' ||
        tag === 'br' ||
        tag === 'input' ||
        tag === 'hr' ||
        tag === 'area' ||
        tag === 'base' ||
        tag === 'col' ||
        tag === 'command' ||
        tag === 'embed' ||
        tag === 'keygen' ||
        tag === 'param' ||
        tag === 'source' ||
        tag === 'track' ||
        tag === 'wbr'
      );
    }
    function styleToString(style) {
      if (typeof style === 'string') {
        let end2 = style.indexOf('"');
        if (end2 === -1) {
          return style;
        }
        const length2 = style.length;
        let escaped = '';
        let start2 = 0;
        for (; end2 < length2; end2++) {
          if (style[end2] === '"') {
            escaped += style.slice(start2, end2) + '&#34;';
            start2 = end2 + 1;
          }
        }
        escaped += style.slice(start2, end2);
        return escaped;
      }
      const keys2 = Object.keys(style);
      const length = keys2.length;
      let key, value, end, start;
      let index = 0;
      let result = '';
      for (; index < length; index++) {
        key = keys2[index];
        value = style[key];
        if (value === null || value === void 0) {
          continue;
        }
        result += toKebabCase(key) + ':';
        if (typeof value !== 'string') {
          result += value.toString() + ';';
          continue;
        }
        end = value.indexOf('"');
        if (end === -1) {
          result += value + ';';
          continue;
        }
        const length2 = value.length;
        start = 0;
        for (; end < length2; end++) {
          if (value[end] === '"') {
            result += value.slice(start, end) + '&#34;';
            start = end + 1;
          }
        }
        result += value.slice(start, end) + ';';
      }
      return result;
    }
    function attributesToString(attributes) {
      const keys2 = Object.keys(attributes);
      const length = keys2.length;
      let key, value, type, end, start;
      let result = '';
      let index = 0;
      for (; index < length; index++) {
        key = keys2[index];
        if (key === 'children' || key === 'safe') {
          continue;
        }
        value = attributes[key];
        if (key === 'className') {
          if (attributes.class !== void 0) {
            continue;
          }
          key = 'class';
        }
        if (key === 'style') {
          result += ' style="' + styleToString(value) + '"';
          continue;
        }
        type = typeof value;
        if (type === 'boolean') {
          if (value) {
            result += ' ' + key;
          }
          continue;
        }
        if (value === null || value === void 0) {
          continue;
        }
        result += ' ' + key;
        if (type !== 'string') {
          if (type !== 'object') {
            result += '="' + value.toString() + '"';
            continue;
          } else if (value instanceof Date) {
            result += '="' + value.toISOString() + '"';
            continue;
          }
          value = value.toString();
        }
        end = value.indexOf('"');
        if (end === -1) {
          result += '="' + value + '"';
          continue;
        }
        result += '="';
        const length2 = value.length;
        start = 0;
        for (; end < length2; end++) {
          if (value[end] === '"') {
            result += value.slice(start, end) + '&#34;';
            start = end + 1;
          }
        }
        result += value.slice(start, end) + '"';
      }
      return result;
    }
    function contentsToString(contents, escape) {
      const length = contents.length;
      let result = '';
      let content;
      let index = 0;
      for (; index < length; index++) {
        content = contents[index];
        if (typeof content !== 'string') {
          if (!content && content !== 0) {
            continue;
          }
          if (Array.isArray(content)) {
            content = contentsToString(content);
          }
          if (content.then) {
            return content.then(function resolveAsyncContent(resolved) {
              return contentsToString(
                [result, resolved].concat(contents.slice(index + 1)),
                escape,
              );
            });
          }
        }
        result += content;
      }
      if (escape === true) {
        return escapeHtml(result);
      }
      return result;
    }
    function createElement(name, attrs, ...children) {
      const hasAttrs = attrs !== null;
      if (typeof name === 'function') {
        if (!hasAttrs) {
          attrs = { children: children.length > 1 ? children : children[0] };
        } else if (attrs.children === void 0) {
          attrs.children = children.length > 1 ? children : children[0];
        }
        return name(attrs);
      }
      if (hasAttrs && name === 'tag') {
        name = String(attrs.of);
        delete attrs.of;
      }
      const attributes = hasAttrs ? attributesToString(attrs) : '';
      if (children.length === 0 && isVoidElement(name)) {
        return '<' + name + attributes + '/>';
      }
      const contents = contentsToString(children, hasAttrs && attrs.safe);
      if (typeof contents === 'string') {
        return '<' + name + attributes + '>' + contents + '</' + name + '>';
      }
      return contents.then(function asyncChildren(child) {
        return '<' + name + attributes + '>' + child + '</' + name + '>';
      });
    }
    function Fragment(props) {
      return Html.contentsToString([props.children]);
    }
    function compile(htmlFn, strict = true, separator = '/*\0*/') {
      if (typeof htmlFn !== 'function') {
        throw new Error('The first argument must be a function.');
      }
      const properties = /* @__PURE__ */ new Set();
      const html2 = htmlFn(
        // @ts-expect-error - this proxy will meet the props with children requirements.
        new Proxy(
          {},
          {
            get(_, name) {
              properties.add(name);
              const isChildren = name === 'children';
              let access = `args[${separator}\`${name.toString()}\`${separator}]`;
              if (isChildren) {
                access = `Array.isArray(${access}) ? ${access}.join(${separator}\`\`${separator}) : ${access}`;
              }
              return `\`${separator} + (${access} || ${
                strict && !isChildren
                  ? `throwPropertyNotFound(${separator}\`${name.toString()}\`${separator})`
                  : `${separator}\`\`${separator}`
              }) + ${separator}\``;
            },
          },
        ),
      );
      if (typeof html2 !== 'string') {
        throw new Error('You cannot use compile() with async components.');
      }
      const sepLength = separator.length;
      const length = html2.length;
      let body = '';
      let nextStart = 0;
      let index = 0;
      for (; index < length; index++) {
        if (
          html2[index] === '`' &&
          html2.slice(index - sepLength, index) !== separator &&
          html2.slice(index + 1, index + sepLength + 1) !== separator
        ) {
          body += html2.slice(nextStart, index) + '\\`';
          nextStart = index + 1;
          continue;
        }
      }
      body += html2.slice(nextStart);
      if (strict) {
        return Function(
          'args',
          // Checks for args presence
          `if (args === undefined) { throw new Error("The arguments object was not provided.") };
function throwPropertyNotFound(name) { throw new Error("Property " + name + " was not provided.") };
return \`${body}\``,
        );
      }
      return Function(
        'args',
        // Adds a empty args object when it is not present
        `if (args === undefined) { args = Object.create(null) };
return \`${body}\``,
      );
    }
    var Html = {
      escapeHtml,
      isVoidElement,
      attributesToString,
      toKebabCase,
      isUpper,
      styleToString,
      createElement,
      h: createElement,
      contentsToString,
      compile,
      Fragment,
    };
    module.exports = Html;
    module.exports.Html = Html;
    module.exports.default = Html;
  },
});

// node-modules-polyfills-commonjs:stream
var require_stream = __commonJS({
  'node-modules-polyfills-commonjs:stream'(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var polyfill = (init_stream(), __toCommonJS(stream_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k2 in polyfill) {
        module.exports[k2] = polyfill[k2];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  },
});

// ../node_modules/@kitajs/html/suspense.js
var require_suspense = __commonJS({
  '../node_modules/@kitajs/html/suspense.js'(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var { contentsToString } = require_html();
    var { Readable: Readable2 } = require_stream();
    if (!globalThis.SUSPENSE_ROOT) {
      globalThis.SUSPENSE_ROOT = {
        resources: /* @__PURE__ */ new Map(),
        requestCounter: 1,
        enabled: false,
        autoScript: true,
      };
    }
    var SuspenseScript =
      /* html */
      `
      <script>
        /* Apache-2.0 https://kita.js.org */
        function $RC(s){
          var d=document,
            q=d.querySelector.bind(d),
            n=q('template[id="N:'+s+'"][data-sr]'),
            o=q('div[id="B:'+s+'"][data-sf]'),
            f=d.createDocumentFragment(),
            g=q('script[id="S:'+s+'"][data-ss]'),
            c;

          if(n&&o){
            while(c=n.content.firstChild)
              f.appendChild(c);
            o.parentNode.replaceChild(f,o);
            n.remove()
          }

          g&&g.remove()
        }
      <\/script>
    `.replace(/\n\s*/g, '');
    function noop3() {}
    function Suspense(props) {
      if (!SUSPENSE_ROOT.enabled) {
        throw new Error(
          'Cannot use Suspense outside of a `renderToStream` call.',
        );
      }
      const fallback = contentsToString([props.fallback]);
      if (!props.children) {
        return '';
      }
      const children = contentsToString([props.children]);
      if (typeof children === 'string') {
        return children;
      }
      let resource = SUSPENSE_ROOT.resources.get(props.rid);
      if (!resource) {
        throw new Error(
          'Suspense resource closed before all suspense components were resolved.',
        );
      }
      const run = ++resource.running;
      children
        .then(writeStreamTemplate)
        .catch(function errorRecover(error) {
          if (!props.catch) {
            throw error;
          }
          let html2;
          if (typeof props.catch === 'function') {
            html2 = props.catch(error);
          } else {
            html2 = props.catch;
          }
          if (typeof html2 === 'string') {
            return writeStreamTemplate(html2);
          }
          return html2.then(writeStreamTemplate);
        })
        .catch(function writeFatalError(error) {
          if (resource) {
            const stream = resource.stream.deref();
            if (stream && stream.emit('error', error)) {
              return;
            }
          }
          console.error(error);
        })
        .finally(function cleanResource() {
          resource = SUSPENSE_ROOT.resources.get(props.rid);
          if (!resource) {
            return;
          }
          if (resource.running > 1) {
            resource.running -= 1;
          } else {
            const stream = resource.stream.deref();
            if (stream && !stream.closed) {
              stream.push(null);
            }
            SUSPENSE_ROOT.resources.delete(props.rid);
          }
        });
      if (typeof fallback === 'string') {
        return '<div id="B:' + run + '" data-sf>' + fallback + '</div>';
      }
      return fallback.then(function resolveCallback(resolved) {
        return '<div id="B:' + run + '" data-sf>' + resolved + '</div>';
      });
      function writeStreamTemplate(result) {
        resource = SUSPENSE_ROOT.resources.get(props.rid);
        if (!resource) {
          return;
        }
        const stream = resource.stream.deref();
        if (!stream || stream.closed) {
          return;
        }
        if (SUSPENSE_ROOT.autoScript && resource.sent === false) {
          stream.push(SuspenseScript);
          resource.sent = true;
        }
        stream.push(
          // prettier-ignore
          '<template id="N:' + run + '" data-sr>' + result + '</template><script id="S:' + run + '" data-ss>$RC(' + run + ")<\/script>",
        );
      }
    }
    function renderToStream2(factory, customRid) {
      if (SUSPENSE_ROOT.enabled === false) {
        SUSPENSE_ROOT.enabled = true;
      }
      if (customRid && SUSPENSE_ROOT.resources.has(customRid)) {
        throw new Error(
          `The provided resource ID is already in use: ${customRid}.`,
        );
      }
      const resourceId = customRid || SUSPENSE_ROOT.requestCounter++;
      const stream = new Readable2({ read: noop3 });
      stream.rid = resourceId;
      SUSPENSE_ROOT.resources.set(resourceId, {
        stream: new WeakRef(stream),
        running: 0,
        sent: false,
      });
      let html2;
      try {
        html2 = factory(resourceId);
      } catch (renderError) {
        stream.push(null);
        SUSPENSE_ROOT.resources.delete(resourceId);
        throw renderError;
      }
      if (typeof html2 === 'string') {
        stream.push(html2);
        const updatedResource = SUSPENSE_ROOT.resources.get(resourceId);
        if (!updatedResource || updatedResource.running === 0) {
          stream.push(null);
          SUSPENSE_ROOT.resources.delete(resourceId);
        }
        return stream;
      }
      html2
        .then(function writeStreamHtml(html3) {
          stream.push(html3);
        })
        .catch(function catchError(error) {
          if (stream.emit('error', error) === false) {
            console.error(error);
          }
        })
        .finally(function endStream() {
          const updatedResource = SUSPENSE_ROOT.resources.get(resourceId);
          if (!updatedResource || updatedResource.running === 0) {
            stream.push(null);
            SUSPENSE_ROOT.resources.delete(resourceId);
          }
        });
      return stream;
    }
    async function renderToString(factory, customRid) {
      const chunks = [];
      for await (const chunk of renderToStream2(factory, customRid)) {
        chunks.push(Buffer2.from(chunk));
      }
      return Buffer2.concat(chunks).toString('utf-8');
    }
    module.exports.Suspense = Suspense;
    module.exports.renderToStream = renderToStream2;
    module.exports.renderToString = renderToString;
    module.exports.SuspenseScript = SuspenseScript;
  },
});

// ../node_modules/@sinclair/typebox/typebox.js
var require_typebox2 = __commonJS({
  '../node_modules/@sinclair/typebox/typebox.js'(exports) {
    'use strict';
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Type =
      exports.StandardType =
      exports.ExtendedTypeBuilder =
      exports.StandardTypeBuilder =
      exports.TypeBuilder =
      exports.TemplateLiteralGenerator =
      exports.TemplateLiteralFinite =
      exports.TemplateLiteralParser =
      exports.TemplateLiteralParserError =
      exports.TemplateLiteralResolver =
      exports.TemplateLiteralPattern =
      exports.KeyResolver =
      exports.ObjectMap =
      exports.TypeClone =
      exports.TypeExtends =
      exports.TypeExtendsResult =
      exports.ExtendsUndefined =
      exports.TypeGuard =
      exports.TypeGuardUnknownTypeError =
      exports.FormatRegistry =
      exports.TypeRegistry =
      exports.PatternStringExact =
      exports.PatternNumberExact =
      exports.PatternBooleanExact =
      exports.PatternString =
      exports.PatternNumber =
      exports.PatternBoolean =
      exports.Kind =
      exports.Hint =
      exports.Modifier =
        void 0;
    exports.Modifier = Symbol.for('TypeBox.Modifier');
    exports.Hint = Symbol.for('TypeBox.Hint');
    exports.Kind = Symbol.for('TypeBox.Kind');
    exports.PatternBoolean = '(true|false)';
    exports.PatternNumber = '(0|[1-9][0-9]*)';
    exports.PatternString = '(.*)';
    exports.PatternBooleanExact = `^${exports.PatternBoolean}$`;
    exports.PatternNumberExact = `^${exports.PatternNumber}$`;
    exports.PatternStringExact = `^${exports.PatternString}$`;
    var TypeRegistry;
    (function (TypeRegistry2) {
      const map = /* @__PURE__ */ new Map();
      function Entries() {
        return new Map(map);
      }
      TypeRegistry2.Entries = Entries;
      function Clear() {
        return map.clear();
      }
      TypeRegistry2.Clear = Clear;
      function Has(kind) {
        return map.has(kind);
      }
      TypeRegistry2.Has = Has;
      function Set2(kind, func) {
        map.set(kind, func);
      }
      TypeRegistry2.Set = Set2;
      function Get(kind) {
        return map.get(kind);
      }
      TypeRegistry2.Get = Get;
    })((TypeRegistry = exports.TypeRegistry || (exports.TypeRegistry = {})));
    var FormatRegistry;
    (function (FormatRegistry2) {
      const map = /* @__PURE__ */ new Map();
      function Entries() {
        return new Map(map);
      }
      FormatRegistry2.Entries = Entries;
      function Clear() {
        return map.clear();
      }
      FormatRegistry2.Clear = Clear;
      function Has(format2) {
        return map.has(format2);
      }
      FormatRegistry2.Has = Has;
      function Set2(format2, func) {
        map.set(format2, func);
      }
      FormatRegistry2.Set = Set2;
      function Get(format2) {
        return map.get(format2);
      }
      FormatRegistry2.Get = Get;
    })(
      (FormatRegistry =
        exports.FormatRegistry || (exports.FormatRegistry = {})),
    );
    var TypeGuardUnknownTypeError = class extends Error {
      constructor(schema) {
        super('TypeGuard: Unknown type');
        this.schema = schema;
      }
    };
    exports.TypeGuardUnknownTypeError = TypeGuardUnknownTypeError;
    var TypeGuard;
    (function (TypeGuard2) {
      function IsObject(value) {
        return (
          typeof value === 'object' && value !== null && !Array.isArray(value)
        );
      }
      function IsArray(value) {
        return (
          typeof value === 'object' && value !== null && Array.isArray(value)
        );
      }
      function IsPattern(value) {
        try {
          new RegExp(value);
          return true;
        } catch {
          return false;
        }
      }
      function IsControlCharacterFree(value) {
        if (typeof value !== 'string') return false;
        for (let i2 = 0; i2 < value.length; i2++) {
          const code = value.charCodeAt(i2);
          if ((code >= 7 && code <= 13) || code === 27 || code === 127) {
            return false;
          }
        }
        return true;
      }
      function IsBigInt(value) {
        return typeof value === 'bigint';
      }
      function IsString(value) {
        return typeof value === 'string';
      }
      function IsNumber(value) {
        return typeof value === 'number' && globalThis.Number.isFinite(value);
      }
      function IsBoolean(value) {
        return typeof value === 'boolean';
      }
      function IsOptionalBigInt(value) {
        return value === void 0 || (value !== void 0 && IsBigInt(value));
      }
      function IsOptionalNumber(value) {
        return value === void 0 || (value !== void 0 && IsNumber(value));
      }
      function IsOptionalBoolean(value) {
        return value === void 0 || (value !== void 0 && IsBoolean(value));
      }
      function IsOptionalString(value) {
        return value === void 0 || (value !== void 0 && IsString(value));
      }
      function IsOptionalPattern(value) {
        return (
          value === void 0 ||
          (value !== void 0 &&
            IsString(value) &&
            IsControlCharacterFree(value) &&
            IsPattern(value))
        );
      }
      function IsOptionalFormat(value) {
        return (
          value === void 0 ||
          (value !== void 0 && IsString(value) && IsControlCharacterFree(value))
        );
      }
      function IsOptionalSchema(value) {
        return value === void 0 || TSchema(value);
      }
      function TAny(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Any' &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TAny = TAny;
      function TArray(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Array' &&
          schema.type === 'array' &&
          IsOptionalString(schema.$id) &&
          TSchema(schema.items) &&
          IsOptionalNumber(schema.minItems) &&
          IsOptionalNumber(schema.maxItems) &&
          IsOptionalBoolean(schema.uniqueItems)
        );
      }
      TypeGuard2.TArray = TArray;
      function TBigInt(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'BigInt' &&
          schema.type === 'null' &&
          schema.typeOf === 'BigInt' &&
          IsOptionalString(schema.$id) &&
          IsOptionalBigInt(schema.multipleOf) &&
          IsOptionalBigInt(schema.minimum) &&
          IsOptionalBigInt(schema.maximum) &&
          IsOptionalBigInt(schema.exclusiveMinimum) &&
          IsOptionalBigInt(schema.exclusiveMaximum)
        );
      }
      TypeGuard2.TBigInt = TBigInt;
      function TBoolean(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Boolean' &&
          schema.type === 'boolean' &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TBoolean = TBoolean;
      function TConstructor(schema) {
        if (
          !(
            TKind(schema) &&
            schema[exports.Kind] === 'Constructor' &&
            schema.type === 'object' &&
            schema.instanceOf === 'Constructor' &&
            IsOptionalString(schema.$id) &&
            IsArray(schema.parameters) &&
            TSchema(schema.returns)
          )
        ) {
          return false;
        }
        for (const parameter of schema.parameters) {
          if (!TSchema(parameter)) return false;
        }
        return true;
      }
      TypeGuard2.TConstructor = TConstructor;
      function TDate(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Date' &&
          schema.type === 'object' &&
          schema.instanceOf === 'Date' &&
          IsOptionalString(schema.$id) &&
          IsOptionalNumber(schema.minimumTimestamp) &&
          IsOptionalNumber(schema.maximumTimestamp) &&
          IsOptionalNumber(schema.exclusiveMinimumTimestamp) &&
          IsOptionalNumber(schema.exclusiveMaximumTimestamp)
        );
      }
      TypeGuard2.TDate = TDate;
      function TFunction(schema) {
        if (
          !(
            TKind(schema) &&
            schema[exports.Kind] === 'Function' &&
            schema.type === 'object' &&
            schema.instanceOf === 'Function' &&
            IsOptionalString(schema.$id) &&
            IsArray(schema.parameters) &&
            TSchema(schema.returns)
          )
        ) {
          return false;
        }
        for (const parameter of schema.parameters) {
          if (!TSchema(parameter)) return false;
        }
        return true;
      }
      TypeGuard2.TFunction = TFunction;
      function TInteger(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Integer' &&
          schema.type === 'integer' &&
          IsOptionalString(schema.$id) &&
          IsOptionalNumber(schema.multipleOf) &&
          IsOptionalNumber(schema.minimum) &&
          IsOptionalNumber(schema.maximum) &&
          IsOptionalNumber(schema.exclusiveMinimum) &&
          IsOptionalNumber(schema.exclusiveMaximum)
        );
      }
      TypeGuard2.TInteger = TInteger;
      function TIntersect(schema) {
        if (
          !(
            TKind(schema) &&
            schema[exports.Kind] === 'Intersect' &&
            IsArray(schema.allOf) &&
            IsOptionalString(schema.type) &&
            (IsOptionalBoolean(schema.unevaluatedProperties) ||
              IsOptionalSchema(schema.unevaluatedProperties)) &&
            IsOptionalString(schema.$id)
          )
        ) {
          return false;
        }
        if ('type' in schema && schema.type !== 'object') {
          return false;
        }
        for (const inner of schema.allOf) {
          if (!TSchema(inner)) return false;
        }
        return true;
      }
      TypeGuard2.TIntersect = TIntersect;
      function TKind(schema) {
        return (
          IsObject(schema) &&
          exports.Kind in schema &&
          typeof schema[exports.Kind] === 'string'
        );
      }
      TypeGuard2.TKind = TKind;
      function TLiteral(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Literal' &&
          IsOptionalString(schema.$id) &&
          (IsString(schema.const) ||
            IsNumber(schema.const) ||
            IsBoolean(schema.const) ||
            IsBigInt(schema.const))
        );
      }
      TypeGuard2.TLiteral = TLiteral;
      function TNever(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Never' &&
          IsObject(schema.not) &&
          globalThis.Object.getOwnPropertyNames(schema.not).length === 0
        );
      }
      TypeGuard2.TNever = TNever;
      function TNot(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Not' &&
          IsArray(schema.allOf) &&
          schema.allOf.length === 2 &&
          IsObject(schema.allOf[0]) &&
          TSchema(schema.allOf[0].not) &&
          TSchema(schema.allOf[1])
        );
      }
      TypeGuard2.TNot = TNot;
      function TNull(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Null' &&
          schema.type === 'null' &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TNull = TNull;
      function TNumber(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Number' &&
          schema.type === 'number' &&
          IsOptionalString(schema.$id) &&
          IsOptionalNumber(schema.multipleOf) &&
          IsOptionalNumber(schema.minimum) &&
          IsOptionalNumber(schema.maximum) &&
          IsOptionalNumber(schema.exclusiveMinimum) &&
          IsOptionalNumber(schema.exclusiveMaximum)
        );
      }
      TypeGuard2.TNumber = TNumber;
      function TObject(schema) {
        if (
          !(
            TKind(schema) &&
            schema[exports.Kind] === 'Object' &&
            schema.type === 'object' &&
            IsOptionalString(schema.$id) &&
            IsObject(schema.properties) &&
            (IsOptionalBoolean(schema.additionalProperties) ||
              IsOptionalSchema(schema.additionalProperties)) &&
            IsOptionalNumber(schema.minProperties) &&
            IsOptionalNumber(schema.maxProperties)
          )
        ) {
          return false;
        }
        for (const [key, value] of Object.entries(schema.properties)) {
          if (!IsControlCharacterFree(key)) return false;
          if (!TSchema(value)) return false;
        }
        return true;
      }
      TypeGuard2.TObject = TObject;
      function TPromise(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Promise' &&
          schema.type === 'object' &&
          schema.instanceOf === 'Promise' &&
          IsOptionalString(schema.$id) &&
          TSchema(schema.item)
        );
      }
      TypeGuard2.TPromise = TPromise;
      function TRecord(schema) {
        if (
          !(
            TKind(schema) &&
            schema[exports.Kind] === 'Record' &&
            schema.type === 'object' &&
            IsOptionalString(schema.$id) &&
            schema.additionalProperties === false &&
            IsObject(schema.patternProperties)
          )
        ) {
          return false;
        }
        const keys2 = Object.keys(schema.patternProperties);
        if (keys2.length !== 1) {
          return false;
        }
        if (!IsPattern(keys2[0])) {
          return false;
        }
        if (!TSchema(schema.patternProperties[keys2[0]])) {
          return false;
        }
        return true;
      }
      TypeGuard2.TRecord = TRecord;
      function TRef(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Ref' &&
          IsOptionalString(schema.$id) &&
          IsString(schema.$ref)
        );
      }
      TypeGuard2.TRef = TRef;
      function TString(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'String' &&
          schema.type === 'string' &&
          IsOptionalString(schema.$id) &&
          IsOptionalNumber(schema.minLength) &&
          IsOptionalNumber(schema.maxLength) &&
          IsOptionalPattern(schema.pattern) &&
          IsOptionalFormat(schema.format)
        );
      }
      TypeGuard2.TString = TString;
      function TSymbol(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Symbol' &&
          schema.type === 'null' &&
          schema.typeOf === 'Symbol' &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TSymbol = TSymbol;
      function TTemplateLiteral(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'TemplateLiteral' &&
          schema.type === 'string' &&
          IsString(schema.pattern) &&
          schema.pattern[0] === '^' &&
          schema.pattern[schema.pattern.length - 1] === '$'
        );
      }
      TypeGuard2.TTemplateLiteral = TTemplateLiteral;
      function TThis(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'This' &&
          IsOptionalString(schema.$id) &&
          IsString(schema.$ref)
        );
      }
      TypeGuard2.TThis = TThis;
      function TTuple(schema) {
        if (
          !(
            TKind(schema) &&
            schema[exports.Kind] === 'Tuple' &&
            schema.type === 'array' &&
            IsOptionalString(schema.$id) &&
            IsNumber(schema.minItems) &&
            IsNumber(schema.maxItems) &&
            schema.minItems === schema.maxItems
          )
        ) {
          return false;
        }
        if (
          schema.items === void 0 &&
          schema.additionalItems === void 0 &&
          schema.minItems === 0
        ) {
          return true;
        }
        if (!IsArray(schema.items)) {
          return false;
        }
        for (const inner of schema.items) {
          if (!TSchema(inner)) return false;
        }
        return true;
      }
      TypeGuard2.TTuple = TTuple;
      function TUndefined(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Undefined' &&
          schema.type === 'null' &&
          schema.typeOf === 'Undefined' &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TUndefined = TUndefined;
      function TUnion(schema) {
        if (
          !(
            TKind(schema) &&
            schema[exports.Kind] === 'Union' &&
            IsArray(schema.anyOf) &&
            IsOptionalString(schema.$id)
          )
        ) {
          return false;
        }
        for (const inner of schema.anyOf) {
          if (!TSchema(inner)) return false;
        }
        return true;
      }
      TypeGuard2.TUnion = TUnion;
      function TUnionLiteral(schema) {
        return (
          TUnion(schema) &&
          schema.anyOf.every(
            (schema2) => TLiteral(schema2) && typeof schema2.const === 'string',
          )
        );
      }
      TypeGuard2.TUnionLiteral = TUnionLiteral;
      function TUint8Array(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Uint8Array' &&
          schema.type === 'object' &&
          IsOptionalString(schema.$id) &&
          schema.instanceOf === 'Uint8Array' &&
          IsOptionalNumber(schema.minByteLength) &&
          IsOptionalNumber(schema.maxByteLength)
        );
      }
      TypeGuard2.TUint8Array = TUint8Array;
      function TUnknown(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Unknown' &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TUnknown = TUnknown;
      function TUnsafe(schema) {
        return TKind(schema) && schema[exports.Kind] === 'Unsafe';
      }
      TypeGuard2.TUnsafe = TUnsafe;
      function TVoid(schema) {
        return (
          TKind(schema) &&
          schema[exports.Kind] === 'Void' &&
          schema.type === 'null' &&
          schema.typeOf === 'Void' &&
          IsOptionalString(schema.$id)
        );
      }
      TypeGuard2.TVoid = TVoid;
      function TReadonlyOptional(schema) {
        return (
          IsObject(schema) && schema[exports.Modifier] === 'ReadonlyOptional'
        );
      }
      TypeGuard2.TReadonlyOptional = TReadonlyOptional;
      function TReadonly(schema) {
        return IsObject(schema) && schema[exports.Modifier] === 'Readonly';
      }
      TypeGuard2.TReadonly = TReadonly;
      function TOptional(schema) {
        return IsObject(schema) && schema[exports.Modifier] === 'Optional';
      }
      TypeGuard2.TOptional = TOptional;
      function TSchema(schema) {
        return (
          typeof schema === 'object' &&
          (TAny(schema) ||
            TArray(schema) ||
            TBoolean(schema) ||
            TBigInt(schema) ||
            TConstructor(schema) ||
            TDate(schema) ||
            TFunction(schema) ||
            TInteger(schema) ||
            TIntersect(schema) ||
            TLiteral(schema) ||
            TNever(schema) ||
            TNot(schema) ||
            TNull(schema) ||
            TNumber(schema) ||
            TObject(schema) ||
            TPromise(schema) ||
            TRecord(schema) ||
            TRef(schema) ||
            TString(schema) ||
            TSymbol(schema) ||
            TTemplateLiteral(schema) ||
            TThis(schema) ||
            TTuple(schema) ||
            TUndefined(schema) ||
            TUnion(schema) ||
            TUint8Array(schema) ||
            TUnknown(schema) ||
            TUnsafe(schema) ||
            TVoid(schema) ||
            (TKind(schema) && TypeRegistry.Has(schema[exports.Kind])))
        );
      }
      TypeGuard2.TSchema = TSchema;
    })((TypeGuard = exports.TypeGuard || (exports.TypeGuard = {})));
    var ExtendsUndefined;
    (function (ExtendsUndefined2) {
      function Check(schema) {
        if (schema[exports.Kind] === 'Undefined') return true;
        if (schema[exports.Kind] === 'Union') {
          const union = schema;
          return union.anyOf.some((schema2) => Check(schema2));
        }
        return false;
      }
      ExtendsUndefined2.Check = Check;
    })(
      (ExtendsUndefined =
        exports.ExtendsUndefined || (exports.ExtendsUndefined = {})),
    );
    var TypeExtendsResult;
    (function (TypeExtendsResult2) {
      TypeExtendsResult2[(TypeExtendsResult2['Union'] = 0)] = 'Union';
      TypeExtendsResult2[(TypeExtendsResult2['True'] = 1)] = 'True';
      TypeExtendsResult2[(TypeExtendsResult2['False'] = 2)] = 'False';
    })(
      (TypeExtendsResult =
        exports.TypeExtendsResult || (exports.TypeExtendsResult = {})),
    );
    var TypeExtends;
    (function (TypeExtends2) {
      function IntoBooleanResult(result) {
        return result === TypeExtendsResult.False
          ? TypeExtendsResult.False
          : TypeExtendsResult.True;
      }
      function AnyRight(left, right) {
        return TypeExtendsResult.True;
      }
      function Any(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (
          TypeGuard.TUnion(right) &&
          right.anyOf.some(
            (schema) => TypeGuard.TAny(schema) || TypeGuard.TUnknown(schema),
          )
        )
          return TypeExtendsResult.True;
        if (TypeGuard.TUnion(right)) return TypeExtendsResult.Union;
        if (TypeGuard.TUnknown(right)) return TypeExtendsResult.True;
        if (TypeGuard.TAny(right)) return TypeExtendsResult.True;
        return TypeExtendsResult.Union;
      }
      function ArrayRight(left, right) {
        if (TypeGuard.TUnknown(left)) return TypeExtendsResult.False;
        if (TypeGuard.TAny(left)) return TypeExtendsResult.Union;
        if (TypeGuard.TNever(left)) return TypeExtendsResult.True;
        return TypeExtendsResult.False;
      }
      function Array2(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right) && IsObjectArrayLike(right))
          return TypeExtendsResult.True;
        if (!TypeGuard.TArray(right)) return TypeExtendsResult.False;
        return IntoBooleanResult(Visit(left.items, right.items));
      }
      function BigInt2(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TNever(right)) return NeverRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (TypeGuard.TRecord(right)) return RecordRight(left, right);
        return TypeGuard.TBigInt(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function BooleanRight(left, right) {
        if (TypeGuard.TLiteral(left) && typeof left.const === 'boolean')
          return TypeExtendsResult.True;
        return TypeGuard.TBoolean(left)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Boolean2(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TNever(right)) return NeverRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (TypeGuard.TRecord(right)) return RecordRight(left, right);
        return TypeGuard.TBoolean(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Constructor(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (!TypeGuard.TConstructor(right)) return TypeExtendsResult.False;
        if (left.parameters.length > right.parameters.length)
          return TypeExtendsResult.False;
        if (
          !left.parameters.every(
            (schema, index) =>
              IntoBooleanResult(Visit(right.parameters[index], schema)) ===
              TypeExtendsResult.True,
          )
        ) {
          return TypeExtendsResult.False;
        }
        return IntoBooleanResult(Visit(left.returns, right.returns));
      }
      function Date2(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (TypeGuard.TRecord(right)) return RecordRight(left, right);
        return TypeGuard.TDate(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Function2(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (!TypeGuard.TFunction(right)) return TypeExtendsResult.False;
        if (left.parameters.length > right.parameters.length)
          return TypeExtendsResult.False;
        if (
          !left.parameters.every(
            (schema, index) =>
              IntoBooleanResult(Visit(right.parameters[index], schema)) ===
              TypeExtendsResult.True,
          )
        ) {
          return TypeExtendsResult.False;
        }
        return IntoBooleanResult(Visit(left.returns, right.returns));
      }
      function IntegerRight(left, right) {
        if (TypeGuard.TLiteral(left) && typeof left.const === 'number')
          return TypeExtendsResult.True;
        return TypeGuard.TNumber(left) || TypeGuard.TInteger(left)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Integer(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TNever(right)) return NeverRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (TypeGuard.TRecord(right)) return RecordRight(left, right);
        return TypeGuard.TInteger(right) || TypeGuard.TNumber(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function IntersectRight(left, right) {
        return right.allOf.every(
          (schema) => Visit(left, schema) === TypeExtendsResult.True,
        )
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Intersect(left, right) {
        return left.allOf.some(
          (schema) => Visit(schema, right) === TypeExtendsResult.True,
        )
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function IsLiteralString(schema) {
        return typeof schema.const === 'string';
      }
      function IsLiteralNumber(schema) {
        return typeof schema.const === 'number';
      }
      function IsLiteralBoolean(schema) {
        return typeof schema.const === 'boolean';
      }
      function Literal(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TNever(right)) return NeverRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (TypeGuard.TRecord(right)) return RecordRight(left, right);
        if (TypeGuard.TString(right)) return StringRight(left, right);
        if (TypeGuard.TNumber(right)) return NumberRight(left, right);
        if (TypeGuard.TInteger(right)) return IntegerRight(left, right);
        if (TypeGuard.TBoolean(right)) return BooleanRight(left, right);
        return TypeGuard.TLiteral(right) && right.const === left.const
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function NeverRight(left, right) {
        return TypeExtendsResult.False;
      }
      function Never(left, right) {
        return TypeExtendsResult.True;
      }
      function Null(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TNever(right)) return NeverRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (TypeGuard.TRecord(right)) return RecordRight(left, right);
        return TypeGuard.TNull(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function NumberRight(left, right) {
        if (TypeGuard.TLiteral(left) && IsLiteralNumber(left))
          return TypeExtendsResult.True;
        return TypeGuard.TNumber(left) || TypeGuard.TInteger(left)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Number2(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TNever(right)) return NeverRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (TypeGuard.TRecord(right)) return RecordRight(left, right);
        return TypeGuard.TInteger(right) || TypeGuard.TNumber(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function IsObjectPropertyCount(schema, count) {
        return globalThis.Object.keys(schema.properties).length === count;
      }
      function IsObjectStringLike(schema) {
        return IsObjectArrayLike(schema);
      }
      function IsObjectSymbolLike(schema) {
        return (
          IsObjectPropertyCount(schema, 0) ||
          (IsObjectPropertyCount(schema, 1) &&
            'description' in schema.properties &&
            TypeGuard.TUnion(schema.properties.description) &&
            schema.properties.description.anyOf.length === 2 &&
            ((TypeGuard.TString(schema.properties.description.anyOf[0]) &&
              TypeGuard.TUndefined(schema.properties.description.anyOf[1])) ||
              (TypeGuard.TString(schema.properties.description.anyOf[1]) &&
                TypeGuard.TUndefined(schema.properties.description.anyOf[0]))))
        );
      }
      function IsObjectNumberLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectBooleanLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectBigIntLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectDateLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectUint8ArrayLike(schema) {
        return IsObjectArrayLike(schema);
      }
      function IsObjectFunctionLike(schema) {
        const length = exports.Type.Number();
        return (
          IsObjectPropertyCount(schema, 0) ||
          (IsObjectPropertyCount(schema, 1) &&
            'length' in schema.properties &&
            IntoBooleanResult(Visit(schema.properties['length'], length)) ===
              TypeExtendsResult.True)
        );
      }
      function IsObjectConstructorLike(schema) {
        return IsObjectPropertyCount(schema, 0);
      }
      function IsObjectArrayLike(schema) {
        const length = exports.Type.Number();
        return (
          IsObjectPropertyCount(schema, 0) ||
          (IsObjectPropertyCount(schema, 1) &&
            'length' in schema.properties &&
            IntoBooleanResult(Visit(schema.properties['length'], length)) ===
              TypeExtendsResult.True)
        );
      }
      function IsObjectPromiseLike(schema) {
        const then = exports.Type.Function(
          [exports.Type.Any()],
          exports.Type.Any(),
        );
        return (
          IsObjectPropertyCount(schema, 0) ||
          (IsObjectPropertyCount(schema, 1) &&
            'then' in schema.properties &&
            IntoBooleanResult(Visit(schema.properties['then'], then)) ===
              TypeExtendsResult.True)
        );
      }
      function Property(left, right) {
        if (Visit(left, right) === TypeExtendsResult.False)
          return TypeExtendsResult.False;
        if (TypeGuard.TOptional(left) && !TypeGuard.TOptional(right))
          return TypeExtendsResult.False;
        return TypeExtendsResult.True;
      }
      function ObjectRight(left, right) {
        if (TypeGuard.TUnknown(left)) return TypeExtendsResult.False;
        if (TypeGuard.TAny(left)) return TypeExtendsResult.Union;
        if (TypeGuard.TNever(left)) return TypeExtendsResult.True;
        if (
          TypeGuard.TLiteral(left) &&
          IsLiteralString(left) &&
          IsObjectStringLike(right)
        )
          return TypeExtendsResult.True;
        if (
          TypeGuard.TLiteral(left) &&
          IsLiteralNumber(left) &&
          IsObjectNumberLike(right)
        )
          return TypeExtendsResult.True;
        if (
          TypeGuard.TLiteral(left) &&
          IsLiteralBoolean(left) &&
          IsObjectBooleanLike(right)
        )
          return TypeExtendsResult.True;
        if (TypeGuard.TSymbol(left) && IsObjectSymbolLike(right))
          return TypeExtendsResult.True;
        if (TypeGuard.TBigInt(left) && IsObjectBigIntLike(right))
          return TypeExtendsResult.True;
        if (TypeGuard.TString(left) && IsObjectStringLike(right))
          return TypeExtendsResult.True;
        if (TypeGuard.TSymbol(left) && IsObjectSymbolLike(right))
          return TypeExtendsResult.True;
        if (TypeGuard.TNumber(left) && IsObjectNumberLike(right))
          return TypeExtendsResult.True;
        if (TypeGuard.TInteger(left) && IsObjectNumberLike(right))
          return TypeExtendsResult.True;
        if (TypeGuard.TBoolean(left) && IsObjectBooleanLike(right))
          return TypeExtendsResult.True;
        if (TypeGuard.TUint8Array(left) && IsObjectUint8ArrayLike(right))
          return TypeExtendsResult.True;
        if (TypeGuard.TDate(left) && IsObjectDateLike(right))
          return TypeExtendsResult.True;
        if (TypeGuard.TConstructor(left) && IsObjectConstructorLike(right))
          return TypeExtendsResult.True;
        if (TypeGuard.TFunction(left) && IsObjectFunctionLike(right))
          return TypeExtendsResult.True;
        if (TypeGuard.TRecord(left) && TypeGuard.TString(RecordKey(left))) {
          return right[exports.Hint] === 'Record'
            ? TypeExtendsResult.True
            : TypeExtendsResult.False;
        }
        if (TypeGuard.TRecord(left) && TypeGuard.TNumber(RecordKey(left))) {
          return IsObjectPropertyCount(right, 0)
            ? TypeExtendsResult.True
            : TypeExtendsResult.False;
        }
        return TypeExtendsResult.False;
      }
      function Object2(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TRecord(right)) return RecordRight(left, right);
        if (!TypeGuard.TObject(right)) return TypeExtendsResult.False;
        for (const key of globalThis.Object.keys(right.properties)) {
          if (!(key in left.properties)) return TypeExtendsResult.False;
          if (
            Property(left.properties[key], right.properties[key]) ===
            TypeExtendsResult.False
          ) {
            return TypeExtendsResult.False;
          }
        }
        return TypeExtendsResult.True;
      }
      function Promise2(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right) && IsObjectPromiseLike(right))
          return TypeExtendsResult.True;
        if (!TypeGuard.TPromise(right)) return TypeExtendsResult.False;
        return IntoBooleanResult(Visit(left.item, right.item));
      }
      function RecordKey(schema) {
        if (exports.PatternNumberExact in schema.patternProperties)
          return exports.Type.Number();
        if (exports.PatternStringExact in schema.patternProperties)
          return exports.Type.String();
        throw Error('TypeExtends: Cannot get record key');
      }
      function RecordValue(schema) {
        if (exports.PatternNumberExact in schema.patternProperties)
          return schema.patternProperties[exports.PatternNumberExact];
        if (exports.PatternStringExact in schema.patternProperties)
          return schema.patternProperties[exports.PatternStringExact];
        throw Error('TypeExtends: Cannot get record value');
      }
      function RecordRight(left, right) {
        const Key = RecordKey(right);
        const Value = RecordValue(right);
        if (
          TypeGuard.TLiteral(left) &&
          IsLiteralString(left) &&
          TypeGuard.TNumber(Key) &&
          IntoBooleanResult(Visit(left, Value)) === TypeExtendsResult.True
        )
          return TypeExtendsResult.True;
        if (TypeGuard.TUint8Array(left) && TypeGuard.TNumber(Key))
          return Visit(left, Value);
        if (TypeGuard.TString(left) && TypeGuard.TNumber(Key))
          return Visit(left, Value);
        if (TypeGuard.TArray(left) && TypeGuard.TNumber(Key))
          return Visit(left, Value);
        if (TypeGuard.TObject(left)) {
          for (const key of globalThis.Object.keys(left.properties)) {
            if (
              Property(Value, left.properties[key]) === TypeExtendsResult.False
            ) {
              return TypeExtendsResult.False;
            }
          }
          return TypeExtendsResult.True;
        }
        return TypeExtendsResult.False;
      }
      function Record(left, right) {
        const Value = RecordValue(left);
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (!TypeGuard.TRecord(right)) return TypeExtendsResult.False;
        return Visit(Value, RecordValue(right));
      }
      function StringRight(left, right) {
        if (TypeGuard.TLiteral(left) && typeof left.const === 'string')
          return TypeExtendsResult.True;
        return TypeGuard.TString(left)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function String2(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TNever(right)) return NeverRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (TypeGuard.TRecord(right)) return RecordRight(left, right);
        return TypeGuard.TString(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Symbol2(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TNever(right)) return NeverRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (TypeGuard.TRecord(right)) return RecordRight(left, right);
        return TypeGuard.TSymbol(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function TupleRight(left, right) {
        if (TypeGuard.TUnknown(left)) return TypeExtendsResult.False;
        if (TypeGuard.TAny(left)) return TypeExtendsResult.Union;
        if (TypeGuard.TNever(left)) return TypeExtendsResult.True;
        return TypeExtendsResult.False;
      }
      function IsArrayOfTuple(left, right) {
        return (
          TypeGuard.TArray(right) &&
          left.items !== void 0 &&
          left.items.every(
            (schema) => Visit(schema, right.items) === TypeExtendsResult.True,
          )
        );
      }
      function Tuple(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right) && IsObjectArrayLike(right))
          return TypeExtendsResult.True;
        if (TypeGuard.TArray(right) && IsArrayOfTuple(left, right))
          return TypeExtendsResult.True;
        if (!TypeGuard.TTuple(right)) return TypeExtendsResult.False;
        if (
          (left.items === void 0 && right.items !== void 0) ||
          (left.items !== void 0 && right.items === void 0)
        )
          return TypeExtendsResult.False;
        if (left.items === void 0 && right.items === void 0)
          return TypeExtendsResult.True;
        return left.items.every(
          (schema, index) =>
            Visit(schema, right.items[index]) === TypeExtendsResult.True,
        )
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Uint8Array2(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (TypeGuard.TRecord(right)) return RecordRight(left, right);
        return TypeGuard.TUint8Array(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Undefined(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TNever(right)) return NeverRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        if (TypeGuard.TRecord(right)) return RecordRight(left, right);
        if (TypeGuard.TVoid(right)) return VoidRight(left, right);
        return TypeGuard.TUndefined(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function UnionRight(left, right) {
        return right.anyOf.some(
          (schema) => Visit(left, schema) === TypeExtendsResult.True,
        )
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Union(left, right) {
        return left.anyOf.every(
          (schema) => Visit(schema, right) === TypeExtendsResult.True,
        )
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function UnknownRight(left, right) {
        return TypeExtendsResult.True;
      }
      function Unknown(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TString(right)) return StringRight(left, right);
        if (TypeGuard.TNumber(right)) return NumberRight(left, right);
        if (TypeGuard.TInteger(right)) return IntegerRight(left, right);
        if (TypeGuard.TBoolean(right)) return BooleanRight(left, right);
        if (TypeGuard.TArray(right)) return ArrayRight(left, right);
        if (TypeGuard.TTuple(right)) return TupleRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        return TypeGuard.TUnknown(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function VoidRight(left, right) {
        if (TypeGuard.TUndefined(left)) return TypeExtendsResult.True;
        return TypeGuard.TUndefined(left)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Void(left, right) {
        if (TypeGuard.TIntersect(right)) return IntersectRight(left, right);
        if (TypeGuard.TUnion(right)) return UnionRight(left, right);
        if (TypeGuard.TUnknown(right)) return UnknownRight(left, right);
        if (TypeGuard.TAny(right)) return AnyRight(left, right);
        if (TypeGuard.TObject(right)) return ObjectRight(left, right);
        return TypeGuard.TVoid(right)
          ? TypeExtendsResult.True
          : TypeExtendsResult.False;
      }
      function Visit(left, right) {
        if (TypeGuard.TTemplateLiteral(left))
          return Visit(TemplateLiteralResolver.Resolve(left), right);
        if (TypeGuard.TTemplateLiteral(right))
          return Visit(left, TemplateLiteralResolver.Resolve(right));
        if (TypeGuard.TAny(left)) return Any(left, right);
        if (TypeGuard.TArray(left)) return Array2(left, right);
        if (TypeGuard.TBigInt(left)) return BigInt2(left, right);
        if (TypeGuard.TBoolean(left)) return Boolean2(left, right);
        if (TypeGuard.TConstructor(left)) return Constructor(left, right);
        if (TypeGuard.TDate(left)) return Date2(left, right);
        if (TypeGuard.TFunction(left)) return Function2(left, right);
        if (TypeGuard.TInteger(left)) return Integer(left, right);
        if (TypeGuard.TIntersect(left)) return Intersect(left, right);
        if (TypeGuard.TLiteral(left)) return Literal(left, right);
        if (TypeGuard.TNever(left)) return Never(left, right);
        if (TypeGuard.TNull(left)) return Null(left, right);
        if (TypeGuard.TNumber(left)) return Number2(left, right);
        if (TypeGuard.TObject(left)) return Object2(left, right);
        if (TypeGuard.TRecord(left)) return Record(left, right);
        if (TypeGuard.TString(left)) return String2(left, right);
        if (TypeGuard.TSymbol(left)) return Symbol2(left, right);
        if (TypeGuard.TTuple(left)) return Tuple(left, right);
        if (TypeGuard.TPromise(left)) return Promise2(left, right);
        if (TypeGuard.TUint8Array(left)) return Uint8Array2(left, right);
        if (TypeGuard.TUndefined(left)) return Undefined(left, right);
        if (TypeGuard.TUnion(left)) return Union(left, right);
        if (TypeGuard.TUnknown(left)) return Unknown(left, right);
        if (TypeGuard.TVoid(left)) return Void(left, right);
        throw Error(
          `TypeExtends: Unknown left type operand '${left[exports.Kind]}'`,
        );
      }
      function Extends(left, right) {
        return Visit(left, right);
      }
      TypeExtends2.Extends = Extends;
    })((TypeExtends = exports.TypeExtends || (exports.TypeExtends = {})));
    var TypeClone;
    (function (TypeClone2) {
      function IsObject(value) {
        return typeof value === 'object' && value !== null;
      }
      function IsArray(value) {
        return globalThis.Array.isArray(value);
      }
      function Array2(value) {
        return value.map((value2) => Visit(value2));
      }
      function Object2(value) {
        const clonedProperties = globalThis.Object.getOwnPropertyNames(
          value,
        ).reduce((acc, key) => {
          return { ...acc, [key]: Visit(value[key]) };
        }, {});
        const clonedSymbols = globalThis.Object.getOwnPropertySymbols(
          value,
        ).reduce((acc, key) => {
          return { ...acc, [key]: Visit(value[key]) };
        }, {});
        return { ...clonedProperties, ...clonedSymbols };
      }
      function Visit(value) {
        if (IsArray(value)) return Array2(value);
        if (IsObject(value)) return Object2(value);
        return value;
      }
      function Clone(schema, options) {
        return { ...Visit(schema), ...options };
      }
      TypeClone2.Clone = Clone;
    })((TypeClone = exports.TypeClone || (exports.TypeClone = {})));
    var ObjectMap;
    (function (ObjectMap2) {
      function Intersect(schema, callback) {
        return exports.Type.Intersect(
          schema.allOf.map((inner) => Visit(inner, callback)),
          { ...schema },
        );
      }
      function Union(schema, callback) {
        return exports.Type.Union(
          schema.anyOf.map((inner) => Visit(inner, callback)),
          { ...schema },
        );
      }
      function Object2(schema, callback) {
        return callback(schema);
      }
      function Visit(schema, callback) {
        if (schema[exports.Kind] === 'Intersect')
          return Intersect(schema, callback);
        if (schema[exports.Kind] === 'Union') return Union(schema, callback);
        if (schema[exports.Kind] === 'Object') return Object2(schema, callback);
        return schema;
      }
      function Map2(schema, callback, options) {
        return { ...Visit(TypeClone.Clone(schema, {}), callback), ...options };
      }
      ObjectMap2.Map = Map2;
    })((ObjectMap = exports.ObjectMap || (exports.ObjectMap = {})));
    var KeyResolver;
    (function (KeyResolver2) {
      function IsKeyable(schema) {
        return (
          TypeGuard.TIntersect(schema) ||
          TypeGuard.TUnion(schema) ||
          (TypeGuard.TObject(schema) &&
            globalThis.Object.getOwnPropertyNames(schema.properties).length > 0)
        );
      }
      function Intersect(schema) {
        return [
          ...schema.allOf
            .filter((schema2) => IsKeyable(schema2))
            .reduce(
              (set, schema2) => Visit(schema2).map((key) => set.add(key))[0],
              /* @__PURE__ */ new Set(),
            ),
        ];
      }
      function Union(schema) {
        const sets = schema.anyOf
          .filter((schema2) => IsKeyable(schema2))
          .map((inner) => Visit(inner));
        return [
          ...sets.reduce(
            (set, outer) =>
              outer.map((key) =>
                sets.every((inner) => inner.includes(key)) ? set.add(key) : set,
              )[0],
            /* @__PURE__ */ new Set(),
          ),
        ];
      }
      function Object2(schema) {
        return globalThis.Object.keys(schema.properties);
      }
      function Visit(schema) {
        if (TypeGuard.TIntersect(schema)) return Intersect(schema);
        if (TypeGuard.TUnion(schema)) return Union(schema);
        if (TypeGuard.TObject(schema)) return Object2(schema);
        return [];
      }
      function Resolve(schema) {
        return Visit(schema);
      }
      KeyResolver2.Resolve = Resolve;
    })((KeyResolver = exports.KeyResolver || (exports.KeyResolver = {})));
    var TemplateLiteralPattern;
    (function (TemplateLiteralPattern2) {
      function Escape(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      function Visit(schema, acc) {
        if (TypeGuard.TTemplateLiteral(schema)) {
          const pattern = schema.pattern.slice(1, schema.pattern.length - 1);
          return pattern;
        } else if (TypeGuard.TUnion(schema)) {
          const tokens = schema.anyOf
            .map((schema2) => Visit(schema2, acc))
            .join('|');
          return `(${tokens})`;
        } else if (TypeGuard.TNumber(schema)) {
          return `${acc}${exports.PatternNumber}`;
        } else if (TypeGuard.TInteger(schema)) {
          return `${acc}${exports.PatternNumber}`;
        } else if (TypeGuard.TBigInt(schema)) {
          return `${acc}${exports.PatternNumber}`;
        } else if (TypeGuard.TString(schema)) {
          return `${acc}${exports.PatternString}`;
        } else if (TypeGuard.TLiteral(schema)) {
          return `${acc}${Escape(schema.const.toString())}`;
        } else if (TypeGuard.TBoolean(schema)) {
          return `${acc}${exports.PatternBoolean}`;
        } else if (TypeGuard.TNever(schema)) {
          throw Error(
            'TemplateLiteralPattern: TemplateLiteral cannot operate on types of TNever',
          );
        } else {
          throw Error(
            `TemplateLiteralPattern: Unexpected Kind '${schema[exports.Kind]}'`,
          );
        }
      }
      function Create(kinds) {
        return `^${kinds.map((schema) => Visit(schema, '')).join('')}$`;
      }
      TemplateLiteralPattern2.Create = Create;
    })(
      (TemplateLiteralPattern =
        exports.TemplateLiteralPattern ||
        (exports.TemplateLiteralPattern = {})),
    );
    var TemplateLiteralResolver;
    (function (TemplateLiteralResolver2) {
      function Resolve(template) {
        const expression = TemplateLiteralParser.ParseExact(template.pattern);
        if (!TemplateLiteralFinite.Check(expression))
          return exports.Type.String();
        const literals = [...TemplateLiteralGenerator.Generate(expression)].map(
          (value) => exports.Type.Literal(value),
        );
        return exports.Type.Union(literals);
      }
      TemplateLiteralResolver2.Resolve = Resolve;
    })(
      (TemplateLiteralResolver =
        exports.TemplateLiteralResolver ||
        (exports.TemplateLiteralResolver = {})),
    );
    var TemplateLiteralParserError = class extends Error {
      constructor(message) {
        super(message);
      }
    };
    exports.TemplateLiteralParserError = TemplateLiteralParserError;
    var TemplateLiteralParser;
    (function (TemplateLiteralParser2) {
      function IsNonEscaped(pattern, index, char) {
        return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92;
      }
      function IsOpenParen(pattern, index) {
        return IsNonEscaped(pattern, index, '(');
      }
      function IsCloseParen(pattern, index) {
        return IsNonEscaped(pattern, index, ')');
      }
      function IsSeparator(pattern, index) {
        return IsNonEscaped(pattern, index, '|');
      }
      function IsGroup(pattern) {
        if (
          !(
            IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1)
          )
        )
          return false;
        let count = 0;
        for (let index = 0; index < pattern.length; index++) {
          if (IsOpenParen(pattern, index)) count += 1;
          if (IsCloseParen(pattern, index)) count -= 1;
          if (count === 0 && index !== pattern.length - 1) return false;
        }
        return true;
      }
      function InGroup(pattern) {
        return pattern.slice(1, pattern.length - 1);
      }
      function IsPrecedenceOr(pattern) {
        let count = 0;
        for (let index = 0; index < pattern.length; index++) {
          if (IsOpenParen(pattern, index)) count += 1;
          if (IsCloseParen(pattern, index)) count -= 1;
          if (IsSeparator(pattern, index) && count === 0) return true;
        }
        return false;
      }
      function IsPrecedenceAnd(pattern) {
        for (let index = 0; index < pattern.length; index++) {
          if (IsOpenParen(pattern, index)) return true;
        }
        return false;
      }
      function Or(pattern) {
        let [count, start] = [0, 0];
        const expressions = [];
        for (let index = 0; index < pattern.length; index++) {
          if (IsOpenParen(pattern, index)) count += 1;
          if (IsCloseParen(pattern, index)) count -= 1;
          if (IsSeparator(pattern, index) && count === 0) {
            const range2 = pattern.slice(start, index);
            if (range2.length > 0) expressions.push(Parse(range2));
            start = index + 1;
          }
        }
        const range = pattern.slice(start);
        if (range.length > 0) expressions.push(Parse(range));
        if (expressions.length === 0) return { type: 'const', const: '' };
        if (expressions.length === 1) return expressions[0];
        return { type: 'or', expr: expressions };
      }
      function And(pattern) {
        function Group(value, index) {
          if (!IsOpenParen(value, index))
            throw new TemplateLiteralParserError(
              `TemplateLiteralParser: Index must point to open parens`,
            );
          let count = 0;
          for (let scan = index; scan < value.length; scan++) {
            if (IsOpenParen(value, scan)) count += 1;
            if (IsCloseParen(value, scan)) count -= 1;
            if (count === 0) return [index, scan];
          }
          throw new TemplateLiteralParserError(
            `TemplateLiteralParser: Unclosed group parens in expression`,
          );
        }
        function Range(pattern2, index) {
          for (let scan = index; scan < pattern2.length; scan++) {
            if (IsOpenParen(pattern2, scan)) return [index, scan];
          }
          return [index, pattern2.length];
        }
        const expressions = [];
        for (let index = 0; index < pattern.length; index++) {
          if (IsOpenParen(pattern, index)) {
            const [start, end] = Group(pattern, index);
            const range = pattern.slice(start, end + 1);
            expressions.push(Parse(range));
            index = end;
          } else {
            const [start, end] = Range(pattern, index);
            const range = pattern.slice(start, end);
            if (range.length > 0) expressions.push(Parse(range));
            index = end - 1;
          }
        }
        if (expressions.length === 0) return { type: 'const', const: '' };
        if (expressions.length === 1) return expressions[0];
        return { type: 'and', expr: expressions };
      }
      function Parse(pattern) {
        if (IsGroup(pattern)) return Parse(InGroup(pattern));
        if (IsPrecedenceOr(pattern)) return Or(pattern);
        if (IsPrecedenceAnd(pattern)) return And(pattern);
        return { type: 'const', const: pattern };
      }
      TemplateLiteralParser2.Parse = Parse;
      function ParseExact(pattern) {
        return Parse(pattern.slice(1, pattern.length - 1));
      }
      TemplateLiteralParser2.ParseExact = ParseExact;
    })(
      (TemplateLiteralParser =
        exports.TemplateLiteralParser || (exports.TemplateLiteralParser = {})),
    );
    var TemplateLiteralFinite;
    (function (TemplateLiteralFinite2) {
      function IsNumber(expression) {
        return (
          expression.type === 'or' &&
          expression.expr.length === 2 &&
          expression.expr[0].type === 'const' &&
          expression.expr[0].const === '0' &&
          expression.expr[1].type === 'const' &&
          expression.expr[1].const === '[1-9][0-9]*'
        );
      }
      function IsBoolean(expression) {
        return (
          expression.type === 'or' &&
          expression.expr.length === 2 &&
          expression.expr[0].type === 'const' &&
          expression.expr[0].const === 'true' &&
          expression.expr[1].type === 'const' &&
          expression.expr[1].const === 'false'
        );
      }
      function IsString(expression) {
        return expression.type === 'const' && expression.const === '.*';
      }
      function Check(expression) {
        if (IsBoolean(expression)) return true;
        if (IsNumber(expression) || IsString(expression)) return false;
        if (expression.type === 'and')
          return expression.expr.every((expr) => Check(expr));
        if (expression.type === 'or')
          return expression.expr.every((expr) => Check(expr));
        if (expression.type === 'const') return true;
        throw Error(`TemplateLiteralFinite: Unknown expression type`);
      }
      TemplateLiteralFinite2.Check = Check;
    })(
      (TemplateLiteralFinite =
        exports.TemplateLiteralFinite || (exports.TemplateLiteralFinite = {})),
    );
    var TemplateLiteralGenerator;
    (function (TemplateLiteralGenerator2) {
      function* Reduce(buffer) {
        if (buffer.length === 1) return yield* buffer[0];
        for (const left of buffer[0]) {
          for (const right of Reduce(buffer.slice(1))) {
            yield `${left}${right}`;
          }
        }
      }
      function* And(expression) {
        return yield* Reduce(
          expression.expr.map((expr) => [...Generate(expr)]),
        );
      }
      function* Or(expression) {
        for (const expr of expression.expr) yield* Generate(expr);
      }
      function* Const(expression) {
        return yield expression.const;
      }
      function* Generate(expression) {
        if (expression.type === 'and') return yield* And(expression);
        if (expression.type === 'or') return yield* Or(expression);
        if (expression.type === 'const') return yield* Const(expression);
        throw Error('TemplateLiteralGenerator: Unknown expression');
      }
      TemplateLiteralGenerator2.Generate = Generate;
    })(
      (TemplateLiteralGenerator =
        exports.TemplateLiteralGenerator ||
        (exports.TemplateLiteralGenerator = {})),
    );
    var TypeOrdinal = 0;
    var TypeBuilder = class {
      /** `[Utility]` Creates a schema without `static` and `params` types */
      Create(schema) {
        return schema;
      }
      /** `[Standard]` Omits compositing symbols from this schema */
      Strict(schema) {
        return JSON.parse(JSON.stringify(schema));
      }
    };
    exports.TypeBuilder = TypeBuilder;
    var StandardTypeBuilder = class extends TypeBuilder {
      // ------------------------------------------------------------------------
      // Modifiers
      // ------------------------------------------------------------------------
      /** `[Modifier]` Creates a Optional property */
      Optional(schema) {
        return {
          [exports.Modifier]: 'Optional',
          ...TypeClone.Clone(schema, {}),
        };
      }
      /** `[Modifier]` Creates a ReadonlyOptional property */
      ReadonlyOptional(schema) {
        return {
          [exports.Modifier]: 'ReadonlyOptional',
          ...TypeClone.Clone(schema, {}),
        };
      }
      /** `[Modifier]` Creates a Readonly object or property */
      Readonly(schema) {
        return { [exports.Modifier]: 'Readonly', ...schema };
      }
      // ------------------------------------------------------------------------
      // Types
      // ------------------------------------------------------------------------
      /** `[Standard]` Creates an Any type */
      Any(options = {}) {
        return this.Create({ ...options, [exports.Kind]: 'Any' });
      }
      /** `[Standard]` Creates an Array type */
      Array(items, options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Array',
          type: 'array',
          items: TypeClone.Clone(items, {}),
        });
      }
      /** `[Standard]` Creates a Boolean type */
      Boolean(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Boolean',
          type: 'boolean',
        });
      }
      /** `[Standard]` Creates a Composite object type. */
      Composite(objects, options) {
        const isOptionalAll = (objects2, key) =>
          objects2.every(
            (object) =>
              !(key in object.properties) || IsOptional(object.properties[key]),
          );
        const IsOptional = (schema) =>
          TypeGuard.TOptional(schema) || TypeGuard.TReadonlyOptional(schema);
        const [required, optional] = [
          /* @__PURE__ */ new Set(),
          /* @__PURE__ */ new Set(),
        ];
        for (const object of objects) {
          for (const key of globalThis.Object.getOwnPropertyNames(
            object.properties,
          )) {
            if (isOptionalAll(objects, key)) optional.add(key);
          }
        }
        for (const object of objects) {
          for (const key of globalThis.Object.getOwnPropertyNames(
            object.properties,
          )) {
            if (!optional.has(key)) required.add(key);
          }
        }
        const properties = {};
        for (const object of objects) {
          for (const [key, schema] of Object.entries(object.properties)) {
            const property = TypeClone.Clone(schema, {});
            if (!optional.has(key)) delete property[exports.Modifier];
            if (key in properties) {
              const left =
                TypeExtends.Extends(properties[key], property) !==
                TypeExtendsResult.False;
              const right =
                TypeExtends.Extends(property, properties[key]) !==
                TypeExtendsResult.False;
              if (!left && !right) properties[key] = exports.Type.Never();
              if (!left && right) properties[key] = property;
            } else {
              properties[key] = property;
            }
          }
        }
        if (required.size > 0) {
          return this.Create({
            ...options,
            [exports.Kind]: 'Object',
            [exports.Hint]: 'Composite',
            type: 'object',
            properties,
            required: [...required],
          });
        } else {
          return this.Create({
            ...options,
            [exports.Kind]: 'Object',
            [exports.Hint]: 'Composite',
            type: 'object',
            properties,
          });
        }
      }
      /** `[Standard]` Creates a Enum type */
      Enum(item, options = {}) {
        const values = globalThis.Object.keys(item)
          .filter((key) => isNaN(key))
          .map((key) => item[key]);
        const anyOf = values.map((value) =>
          typeof value === 'string'
            ? { [exports.Kind]: 'Literal', type: 'string', const: value }
            : { [exports.Kind]: 'Literal', type: 'number', const: value },
        );
        return this.Create({ ...options, [exports.Kind]: 'Union', anyOf });
      }
      /** `[Standard]` A conditional type expression that will return the true type if the left type extends the right */
      Extends(left, right, trueType, falseType, options = {}) {
        switch (TypeExtends.Extends(left, right)) {
          case TypeExtendsResult.Union:
            return this.Union([
              TypeClone.Clone(trueType, options),
              TypeClone.Clone(falseType, options),
            ]);
          case TypeExtendsResult.True:
            return TypeClone.Clone(trueType, options);
          case TypeExtendsResult.False:
            return TypeClone.Clone(falseType, options);
        }
      }
      /** `[Standard]` Excludes from the left type any type that is not assignable to the right */
      Exclude(left, right, options = {}) {
        if (TypeGuard.TTemplateLiteral(left))
          return this.Exclude(
            TemplateLiteralResolver.Resolve(left),
            right,
            options,
          );
        if (TypeGuard.TTemplateLiteral(right))
          return this.Exclude(
            left,
            TemplateLiteralResolver.Resolve(right),
            options,
          );
        if (TypeGuard.TUnion(left)) {
          const narrowed = left.anyOf.filter(
            (inner) =>
              TypeExtends.Extends(inner, right) === TypeExtendsResult.False,
          );
          return narrowed.length === 1
            ? TypeClone.Clone(narrowed[0], options)
            : this.Union(narrowed, options);
        } else {
          return TypeExtends.Extends(left, right) !== TypeExtendsResult.False
            ? this.Never(options)
            : TypeClone.Clone(left, options);
        }
      }
      /** `[Standard]` Extracts from the left type any type that is assignable to the right */
      Extract(left, right, options = {}) {
        if (TypeGuard.TTemplateLiteral(left))
          return this.Extract(
            TemplateLiteralResolver.Resolve(left),
            right,
            options,
          );
        if (TypeGuard.TTemplateLiteral(right))
          return this.Extract(
            left,
            TemplateLiteralResolver.Resolve(right),
            options,
          );
        if (TypeGuard.TUnion(left)) {
          const narrowed = left.anyOf.filter(
            (inner) =>
              TypeExtends.Extends(inner, right) !== TypeExtendsResult.False,
          );
          return narrowed.length === 1
            ? TypeClone.Clone(narrowed[0], options)
            : this.Union(narrowed, options);
        } else {
          return TypeExtends.Extends(left, right) !== TypeExtendsResult.False
            ? TypeClone.Clone(left, options)
            : this.Never(options);
        }
      }
      /** `[Standard]` Creates an Integer type */
      Integer(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Integer',
          type: 'integer',
        });
      }
      Intersect(allOf, options = {}) {
        if (allOf.length === 0) return exports.Type.Never();
        if (allOf.length === 1) return TypeClone.Clone(allOf[0], options);
        const objects = allOf.every((schema) => TypeGuard.TObject(schema));
        const cloned = allOf.map((schema) => TypeClone.Clone(schema, {}));
        const clonedUnevaluatedProperties = TypeGuard.TSchema(
          options.unevaluatedProperties,
        )
          ? {
              unevaluatedProperties: TypeClone.Clone(
                options.unevaluatedProperties,
                {},
              ),
            }
          : {};
        if (
          options.unevaluatedProperties === false ||
          TypeGuard.TSchema(options.unevaluatedProperties) ||
          objects
        ) {
          return this.Create({
            ...options,
            ...clonedUnevaluatedProperties,
            [exports.Kind]: 'Intersect',
            type: 'object',
            allOf: cloned,
          });
        } else {
          return this.Create({
            ...options,
            ...clonedUnevaluatedProperties,
            [exports.Kind]: 'Intersect',
            allOf: cloned,
          });
        }
      }
      /** `[Standard]` Creates a KeyOf type */
      KeyOf(schema, options = {}) {
        if (TypeGuard.TRecord(schema)) {
          const pattern = Object.getOwnPropertyNames(
            schema.patternProperties,
          )[0];
          if (pattern === exports.PatternNumberExact)
            return this.Number(options);
          if (pattern === exports.PatternStringExact)
            return this.String(options);
          throw Error(
            'StandardTypeBuilder: Unable to resolve key type from Record key pattern',
          );
        } else {
          const resolved = KeyResolver.Resolve(schema);
          if (resolved.length === 0) return this.Never(options);
          const literals = resolved.map((key) => this.Literal(key));
          return this.Union(literals, options);
        }
      }
      /** `[Standard]` Creates a Literal type */
      Literal(value, options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Literal',
          const: value,
          type: typeof value,
        });
      }
      /** `[Standard]` Creates a Never type */
      Never(options = {}) {
        return this.Create({ ...options, [exports.Kind]: 'Never', not: {} });
      }
      /** `[Standard]` Creates a Not type. The first argument is the disallowed type, the second is the allowed. */
      Not(not, schema, options) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Not',
          allOf: [
            { not: TypeClone.Clone(not, {}) },
            TypeClone.Clone(schema, {}),
          ],
        });
      }
      /** `[Standard]` Creates a Null type */
      Null(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Null',
          type: 'null',
        });
      }
      /** `[Standard]` Creates a Number type */
      Number(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Number',
          type: 'number',
        });
      }
      /** `[Standard]` Creates an Object type */
      Object(properties, options = {}) {
        const propertyKeys = globalThis.Object.getOwnPropertyNames(properties);
        const optionalKeys = propertyKeys.filter(
          (key) =>
            TypeGuard.TOptional(properties[key]) ||
            TypeGuard.TReadonlyOptional(properties[key]),
        );
        const requiredKeys = propertyKeys.filter(
          (name) => !optionalKeys.includes(name),
        );
        const clonedAdditionalProperties = TypeGuard.TSchema(
          options.additionalProperties,
        )
          ? {
              additionalProperties: TypeClone.Clone(
                options.additionalProperties,
                {},
              ),
            }
          : {};
        const clonedProperties = propertyKeys.reduce(
          (acc, key) => ({
            ...acc,
            [key]: TypeClone.Clone(properties[key], {}),
          }),
          {},
        );
        if (requiredKeys.length > 0) {
          return this.Create({
            ...options,
            ...clonedAdditionalProperties,
            [exports.Kind]: 'Object',
            type: 'object',
            properties: clonedProperties,
            required: requiredKeys,
          });
        } else {
          return this.Create({
            ...options,
            ...clonedAdditionalProperties,
            [exports.Kind]: 'Object',
            type: 'object',
            properties: clonedProperties,
          });
        }
      }
      Omit(schema, unresolved, options = {}) {
        const keys2 = TypeGuard.TUnionLiteral(unresolved)
          ? unresolved.anyOf.map((schema2) => schema2.const)
          : TypeGuard.TLiteral(unresolved)
          ? [unresolved.const]
          : TypeGuard.TNever(unresolved)
          ? []
          : unresolved;
        return ObjectMap.Map(
          TypeClone.Clone(schema, {}),
          (schema2) => {
            if (schema2.required) {
              schema2.required = schema2.required.filter(
                (key) => !keys2.includes(key),
              );
              if (schema2.required.length === 0) delete schema2.required;
            }
            for (const key of globalThis.Object.keys(schema2.properties)) {
              if (keys2.includes(key)) delete schema2.properties[key];
            }
            return this.Create(schema2);
          },
          options,
        );
      }
      /** `[Standard]` Creates a mapped type where all properties are Optional */
      Partial(schema, options = {}) {
        function Apply(schema2) {
          switch (schema2[exports.Modifier]) {
            case 'ReadonlyOptional':
              schema2[exports.Modifier] = 'ReadonlyOptional';
              break;
            case 'Readonly':
              schema2[exports.Modifier] = 'ReadonlyOptional';
              break;
            case 'Optional':
              schema2[exports.Modifier] = 'Optional';
              break;
            default:
              schema2[exports.Modifier] = 'Optional';
              break;
          }
        }
        return ObjectMap.Map(
          TypeClone.Clone(schema, {}),
          (schema2) => {
            delete schema2.required;
            globalThis.Object.keys(schema2.properties).forEach((key) =>
              Apply(schema2.properties[key]),
            );
            return schema2;
          },
          options,
        );
      }
      Pick(schema, unresolved, options = {}) {
        const keys2 = TypeGuard.TUnionLiteral(unresolved)
          ? unresolved.anyOf.map((schema2) => schema2.const)
          : TypeGuard.TLiteral(unresolved)
          ? [unresolved.const]
          : TypeGuard.TNever(unresolved)
          ? []
          : unresolved;
        return ObjectMap.Map(
          TypeClone.Clone(schema, {}),
          (schema2) => {
            if (schema2.required) {
              schema2.required = schema2.required.filter((key) =>
                keys2.includes(key),
              );
              if (schema2.required.length === 0) delete schema2.required;
            }
            for (const key of globalThis.Object.keys(schema2.properties)) {
              if (!keys2.includes(key)) delete schema2.properties[key];
            }
            return this.Create(schema2);
          },
          options,
        );
      }
      /** `[Standard]` Creates a Record type */
      Record(key, schema, options = {}) {
        if (TypeGuard.TTemplateLiteral(key)) {
          const expression = TemplateLiteralParser.ParseExact(key.pattern);
          return TemplateLiteralFinite.Check(expression)
            ? this.Object(
                [...TemplateLiteralGenerator.Generate(expression)].reduce(
                  (acc, key2) => ({
                    ...acc,
                    [key2]: TypeClone.Clone(schema, {}),
                  }),
                  {},
                ),
                options,
              )
            : this.Create({
                ...options,
                [exports.Kind]: 'Record',
                type: 'object',
                patternProperties: {
                  [key.pattern]: TypeClone.Clone(schema, {}),
                },
                additionalProperties: false,
              });
        } else if (TypeGuard.TUnionLiteral(key)) {
          if (
            key.anyOf.every(
              (schema2) =>
                TypeGuard.TLiteral(schema2) &&
                (typeof schema2.const === 'string' ||
                  typeof schema2.const === 'number'),
            )
          ) {
            const properties = key.anyOf.reduce(
              (acc, literal) => ({
                ...acc,
                [literal.const]: TypeClone.Clone(schema, {}),
              }),
              {},
            );
            return this.Object(properties, {
              ...options,
              [exports.Hint]: 'Record',
            });
          } else
            throw Error(
              'TypeBuilder: Record key can only be derived from union literal of number or string',
            );
        } else if (TypeGuard.TLiteral(key)) {
          if (typeof key.const === 'string' || typeof key.const === 'number') {
            return this.Object(
              { [key.const]: TypeClone.Clone(schema, {}) },
              options,
            );
          } else
            throw Error(
              'TypeBuilder: Record key can only be derived from literals of number or string',
            );
        } else if (TypeGuard.TInteger(key) || TypeGuard.TNumber(key)) {
          const pattern = exports.PatternNumberExact;
          return this.Create({
            ...options,
            [exports.Kind]: 'Record',
            type: 'object',
            patternProperties: { [pattern]: TypeClone.Clone(schema, {}) },
            additionalProperties: false,
          });
        } else if (TypeGuard.TString(key)) {
          const pattern =
            key.pattern === void 0 ? exports.PatternStringExact : key.pattern;
          return this.Create({
            ...options,
            [exports.Kind]: 'Record',
            type: 'object',
            patternProperties: { [pattern]: TypeClone.Clone(schema, {}) },
            additionalProperties: false,
          });
        } else {
          throw Error(`StandardTypeBuilder: Invalid Record Key`);
        }
      }
      /** `[Standard]` Creates a Recursive type */
      Recursive(callback, options = {}) {
        if (options.$id === void 0) options.$id = `T${TypeOrdinal++}`;
        const thisType = callback({
          [exports.Kind]: 'This',
          $ref: `${options.$id}`,
        });
        thisType.$id = options.$id;
        return this.Create({
          ...options,
          [exports.Hint]: 'Recursive',
          ...thisType,
        });
      }
      /** `[Standard]` Creates a Ref type. The referenced type must contain a $id */
      Ref(schema, options = {}) {
        if (schema.$id === void 0)
          throw Error(
            'StandardTypeBuilder.Ref: Target type must specify an $id',
          );
        return this.Create({
          ...options,
          [exports.Kind]: 'Ref',
          $ref: schema.$id,
        });
      }
      /** `[Standard]` Creates a mapped type where all properties are Required */
      Required(schema, options = {}) {
        function Apply(schema2) {
          switch (schema2[exports.Modifier]) {
            case 'ReadonlyOptional':
              schema2[exports.Modifier] = 'Readonly';
              break;
            case 'Readonly':
              schema2[exports.Modifier] = 'Readonly';
              break;
            case 'Optional':
              delete schema2[exports.Modifier];
              break;
            default:
              delete schema2[exports.Modifier];
              break;
          }
        }
        return ObjectMap.Map(
          TypeClone.Clone(schema, {}),
          (schema2) => {
            schema2.required = globalThis.Object.keys(schema2.properties);
            globalThis.Object.keys(schema2.properties).forEach((key) =>
              Apply(schema2.properties[key]),
            );
            return schema2;
          },
          options,
        );
      }
      /** `[Standard]` Creates a String type */
      String(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'String',
          type: 'string',
        });
      }
      /** `[Standard]` Creates a template literal type */
      TemplateLiteral(kinds, options = {}) {
        const pattern = TemplateLiteralPattern.Create(kinds);
        return this.Create({
          ...options,
          [exports.Kind]: 'TemplateLiteral',
          type: 'string',
          pattern,
        });
      }
      /** `[Standard]` Creates a Tuple type */
      Tuple(items, options = {}) {
        const [additionalItems, minItems, maxItems] = [
          false,
          items.length,
          items.length,
        ];
        const clonedItems = items.map((item) => TypeClone.Clone(item, {}));
        const schema =
          items.length > 0
            ? {
                ...options,
                [exports.Kind]: 'Tuple',
                type: 'array',
                items: clonedItems,
                additionalItems,
                minItems,
                maxItems,
              }
            : {
                ...options,
                [exports.Kind]: 'Tuple',
                type: 'array',
                minItems,
                maxItems,
              };
        return this.Create(schema);
      }
      Union(union, options = {}) {
        if (TypeGuard.TTemplateLiteral(union)) {
          return TemplateLiteralResolver.Resolve(union);
        } else {
          const anyOf = union;
          if (anyOf.length === 0) return this.Never(options);
          if (anyOf.length === 1)
            return this.Create(TypeClone.Clone(anyOf[0], options));
          const clonedAnyOf = anyOf.map((schema) =>
            TypeClone.Clone(schema, {}),
          );
          return this.Create({
            ...options,
            [exports.Kind]: 'Union',
            anyOf: clonedAnyOf,
          });
        }
      }
      /** `[Standard]` Creates an Unknown type */
      Unknown(options = {}) {
        return this.Create({ ...options, [exports.Kind]: 'Unknown' });
      }
      /** `[Standard]` Creates a Unsafe type that infers for the generic argument */
      Unsafe(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: options[exports.Kind] || 'Unsafe',
        });
      }
    };
    exports.StandardTypeBuilder = StandardTypeBuilder;
    var ExtendedTypeBuilder = class extends StandardTypeBuilder {
      /** `[Extended]` Creates a BigInt type */
      BigInt(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'BigInt',
          type: 'null',
          typeOf: 'BigInt',
        });
      }
      /** `[Extended]` Extracts the ConstructorParameters from the given Constructor type */
      ConstructorParameters(schema, options = {}) {
        return this.Tuple([...schema.parameters], { ...options });
      }
      Constructor(parameters, returns, options = {}) {
        const clonedReturns = TypeClone.Clone(returns, {});
        if (TypeGuard.TTuple(parameters)) {
          const clonedParameters =
            parameters.items === void 0
              ? []
              : parameters.items.map((parameter) =>
                  TypeClone.Clone(parameter, {}),
                );
          return this.Create({
            ...options,
            [exports.Kind]: 'Constructor',
            type: 'object',
            instanceOf: 'Constructor',
            parameters: clonedParameters,
            returns: clonedReturns,
          });
        } else if (globalThis.Array.isArray(parameters)) {
          const clonedParameters = parameters.map((parameter) =>
            TypeClone.Clone(parameter, {}),
          );
          return this.Create({
            ...options,
            [exports.Kind]: 'Constructor',
            type: 'object',
            instanceOf: 'Constructor',
            parameters: clonedParameters,
            returns: clonedReturns,
          });
        } else {
          throw new Error(
            'ExtendedTypeBuilder.Constructor: Invalid parameters',
          );
        }
      }
      /** `[Extended]` Creates a Date type */
      Date(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Date',
          type: 'object',
          instanceOf: 'Date',
        });
      }
      Function(parameters, returns, options = {}) {
        const clonedReturns = TypeClone.Clone(returns, {});
        if (TypeGuard.TTuple(parameters)) {
          const clonedParameters =
            parameters.items === void 0
              ? []
              : parameters.items.map((parameter) =>
                  TypeClone.Clone(parameter, {}),
                );
          return this.Create({
            ...options,
            [exports.Kind]: 'Function',
            type: 'object',
            instanceOf: 'Function',
            parameters: clonedParameters,
            returns: clonedReturns,
          });
        } else if (globalThis.Array.isArray(parameters)) {
          const clonedParameters = parameters.map((parameter) =>
            TypeClone.Clone(parameter, {}),
          );
          return this.Create({
            ...options,
            [exports.Kind]: 'Function',
            type: 'object',
            instanceOf: 'Function',
            parameters: clonedParameters,
            returns: clonedReturns,
          });
        } else {
          throw new Error('ExtendedTypeBuilder.Function: Invalid parameters');
        }
      }
      /** `[Extended]` Extracts the InstanceType from the given Constructor */
      InstanceType(schema, options = {}) {
        return TypeClone.Clone(schema.returns, options);
      }
      /** `[Extended]` Extracts the Parameters from the given Function type */
      Parameters(schema, options = {}) {
        return this.Tuple(schema.parameters, { ...options });
      }
      /** `[Extended]` Creates a Promise type */
      Promise(item, options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Promise',
          type: 'object',
          instanceOf: 'Promise',
          item: TypeClone.Clone(item, {}),
        });
      }
      /** `[Extended]` Creates a regular expression type */
      RegEx(regex, options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'String',
          type: 'string',
          pattern: regex.source,
        });
      }
      /** `[Extended]` Extracts the ReturnType from the given Function */
      ReturnType(schema, options = {}) {
        return TypeClone.Clone(schema.returns, options);
      }
      /** `[Extended]` Creates a Symbol type */
      Symbol(options) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Symbol',
          type: 'null',
          typeOf: 'Symbol',
        });
      }
      /** `[Extended]` Creates a Undefined type */
      Undefined(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Undefined',
          type: 'null',
          typeOf: 'Undefined',
        });
      }
      /** `[Extended]` Creates a Uint8Array type */
      Uint8Array(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Uint8Array',
          type: 'object',
          instanceOf: 'Uint8Array',
        });
      }
      /** `[Extended]` Creates a Void type */
      Void(options = {}) {
        return this.Create({
          ...options,
          [exports.Kind]: 'Void',
          type: 'null',
          typeOf: 'Void',
        });
      }
    };
    exports.ExtendedTypeBuilder = ExtendedTypeBuilder;
    exports.StandardType = new StandardTypeBuilder();
    exports.Type = new ExtendedTypeBuilder();
  },
});

// ../node_modules/lodash.clonedeep/index.js
var require_lodash = __commonJS({
  '../node_modules/lodash.clonedeep/index.js'(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = '__lodash_hash_undefined__';
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = '[object Arguments]';
    var arrayTag = '[object Array]';
    var boolTag = '[object Boolean]';
    var dateTag = '[object Date]';
    var errorTag = '[object Error]';
    var funcTag = '[object Function]';
    var genTag = '[object GeneratorFunction]';
    var mapTag = '[object Map]';
    var numberTag = '[object Number]';
    var objectTag = '[object Object]';
    var promiseTag = '[object Promise]';
    var regexpTag = '[object RegExp]';
    var setTag = '[object Set]';
    var stringTag = '[object String]';
    var symbolTag = '[object Symbol]';
    var weakMapTag = '[object WeakMap]';
    var arrayBufferTag = '[object ArrayBuffer]';
    var dataViewTag = '[object DataView]';
    var float32Tag = '[object Float32Array]';
    var float64Tag = '[object Float64Array]';
    var int8Tag = '[object Int8Array]';
    var int16Tag = '[object Int16Array]';
    var int32Tag = '[object Int32Array]';
    var uint8Tag = '[object Uint8Array]';
    var uint8ClampedTag = '[object Uint8ClampedArray]';
    var uint16Tag = '[object Uint16Array]';
    var uint32Tag = '[object Uint32Array]';
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reFlags = /\w*$/;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var cloneableTags = {};
    cloneableTags[argsTag] =
      cloneableTags[arrayTag] =
      cloneableTags[arrayBufferTag] =
      cloneableTags[dataViewTag] =
      cloneableTags[boolTag] =
      cloneableTags[dateTag] =
      cloneableTags[float32Tag] =
      cloneableTags[float64Tag] =
      cloneableTags[int8Tag] =
      cloneableTags[int16Tag] =
      cloneableTags[int32Tag] =
      cloneableTags[mapTag] =
      cloneableTags[numberTag] =
      cloneableTags[objectTag] =
      cloneableTags[regexpTag] =
      cloneableTags[setTag] =
      cloneableTags[stringTag] =
      cloneableTags[symbolTag] =
      cloneableTags[uint8Tag] =
      cloneableTags[uint8ClampedTag] =
      cloneableTags[uint16Tag] =
      cloneableTags[uint32Tag] =
        true;
    cloneableTags[errorTag] =
      cloneableTags[funcTag] =
      cloneableTags[weakMapTag] =
        false;
    var freeGlobal =
      typeof globalThis == 'object' &&
      globalThis &&
      globalThis.Object === Object &&
      globalThis;
    var freeSelf =
      typeof self == 'object' && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function('return this')();
    var freeExports =
      typeof exports == 'object' && exports && !exports.nodeType && exports;
    var freeModule =
      freeExports &&
      typeof module == 'object' &&
      module &&
      !module.nodeType &&
      module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    function addMapEntry(map, pair) {
      map.set(pair[0], pair[1]);
      return map;
    }
    function addSetEntry(set, value) {
      set.add(value);
      return set;
    }
    function arrayEach(array, iteratee) {
      var index = -1,
        length = array ? array.length : 0;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayPush(array, values) {
      var index = -1,
        length = values.length,
        offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1,
        length = array ? array.length : 0;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function baseTimes(n3, iteratee) {
      var index = -1,
        result = Array(n3);
      while (++index < n3) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != 'function') {
        try {
          result = !!(value + '');
        } catch (e8) {}
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1,
        result = Array(map.size);
      map.forEach(function (value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set) {
      var index = -1,
        result = Array(set.size);
      set.forEach(function (value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root['__core-js_shared__'];
    var maskSrcKey = (function () {
      var uid = /[^.]+$/.exec(
        (coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || '',
      );
      return uid ? 'Symbol(src)_1.' + uid : '';
    })();
    var funcToString = funcProto.toString;
    var hasOwnProperty2 = objectProto.hasOwnProperty;
    var objectToString2 = objectProto.toString;
    var reIsNative = RegExp(
      '^' +
        funcToString
          .call(hasOwnProperty2)
          .replace(reRegExpChar, '\\$&')
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            '$1.*?',
          ) +
        '$',
    );
    var Buffer4 = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var objectCreate = Object.create;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var nativeIsBuffer = Buffer4 ? Buffer4.isBuffer : void 0;
    var nativeKeys = overArg(Object.keys, Object);
    var DataView2 = getNative(root, 'DataView');
    var Map2 = getNative(root, 'Map');
    var Promise2 = getNative(root, 'Promise');
    var Set2 = getNative(root, 'Set');
    var WeakMap = getNative(root, 'WeakMap');
    var nativeCreate = getNative(Object, 'create');
    var dataViewCtorString = toSource(DataView2);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index = -1,
        length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty2.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate
        ? data[key] !== void 0
        : hasOwnProperty2.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1,
        length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__,
        index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__,
        index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__,
        index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1,
        length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        hash: new Hash(),
        map: new (Map2 || ListCache)(),
        string: new Hash(),
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)['delete'](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    function stackClear() {
      this.__data__ = new ListCache();
    }
    function stackDelete(key) {
      return this.__data__['delete'](key);
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          return this;
        }
        cache = this.__data__ = new MapCache(pairs);
      }
      cache.set(key, value);
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var result =
        isArray3(value) || isArguments(value)
          ? baseTimes(value.length, String)
          : [];
      var length = result.length,
        skipIndexes = !!length;
      for (var key in value) {
        if (
          (inherited || hasOwnProperty2.call(value, key)) &&
          !(skipIndexes && (key == 'length' || isIndex(key, length)))
        ) {
          result.push(key);
        }
      }
      return result;
    }
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (
        !(hasOwnProperty2.call(object, key) && eq(objValue, value)) ||
        (value === void 0 && !(key in object))
      ) {
        object[key] = value;
      }
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseAssign(object, source) {
      return object && copyObject(source, keys2(source), object);
    }
    function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
      var result;
      if (customizer) {
        result = object
          ? customizer(value, key, object, stack)
          : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject3(value)) {
        return value;
      }
      var isArr = isArray3(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
          isFunc = tag == funcTag || tag == genTag;
        if (isBuffer3(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          if (isHostObject(value)) {
            return object ? value : {};
          }
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (!isArr) {
        var props = isFull ? getAllKeys(value) : keys2(value);
      }
      arrayEach(props || value, function (subValue, key2) {
        if (props) {
          key2 = subValue;
          subValue = value[key2];
        }
        assignValue(
          result,
          key2,
          baseClone(subValue, isDeep, isFull, customizer, key2, value, stack),
        );
      });
      return result;
    }
    function baseCreate(proto) {
      return isObject3(proto) ? objectCreate(proto) : {};
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray3(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseGetTag(value) {
      return objectToString2.call(value);
    }
    function baseIsNative(value) {
      if (!isObject3(value) || isMasked(value)) {
        return false;
      }
      var pattern =
        isFunction2(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty2.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var result = new buffer.constructor(buffer.length);
      buffer.copy(result);
      return result;
    }
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
      return result;
    }
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(
        buffer,
        dataView.byteOffset,
        dataView.byteLength,
      );
    }
    function cloneMap(map, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
      return arrayReduce(array, addMapEntry, new map.constructor());
    }
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    function cloneSet(set, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
      return arrayReduce(array, addSetEntry, new set.constructor());
    }
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep
        ? cloneArrayBuffer(typedArray.buffer)
        : typedArray.buffer;
      return new typedArray.constructor(
        buffer,
        typedArray.byteOffset,
        typedArray.length,
      );
    }
    function copyArray(source, array) {
      var index = -1,
        length = source.length;
      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }
    function copyObject(source, props, object, customizer) {
      object || (object = {});
      var index = -1,
        length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : void 0;
        assignValue(object, key, newValue === void 0 ? source[key] : newValue);
      }
      return object;
    }
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys2, getSymbols);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    var getSymbols = nativeGetSymbols
      ? overArg(nativeGetSymbols, Object)
      : stubArray;
    var getTag = baseGetTag;
    if (
      (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag) ||
      (Map2 && getTag(new Map2()) != mapTag) ||
      (Promise2 && getTag(Promise2.resolve()) != promiseTag) ||
      (Set2 && getTag(new Set2()) != setTag) ||
      (WeakMap && getTag(new WeakMap()) != weakMapTag)
    ) {
      getTag = function (value) {
        var result = objectToString2.call(value),
          Ctor = result == objectTag ? value.constructor : void 0,
          ctorString = Ctor ? toSource(Ctor) : void 0;
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function initCloneArray(array) {
      var length = array.length,
        result = array.constructor(length);
      if (
        length &&
        typeof array[0] == 'string' &&
        hasOwnProperty2.call(array, 'index')
      ) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }
    function initCloneObject(object) {
      return typeof object.constructor == 'function' && !isPrototype(object)
        ? baseCreate(getPrototype(object))
        : {};
    }
    function initCloneByTag(object, tag, cloneFunc, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
          return new Ctor(+object);
        case dataViewTag:
          return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object, isDeep);
        case mapTag:
          return cloneMap(object, isDeep, cloneFunc);
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          return cloneRegExp(object);
        case setTag:
          return cloneSet(object, isDeep, cloneFunc);
        case symbolTag:
          return cloneSymbol(object);
      }
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return (
        !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        value > -1 &&
        value % 1 == 0 &&
        value < length
      );
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == 'string' ||
        type == 'number' ||
        type == 'symbol' ||
        type == 'boolean'
        ? value !== '__proto__'
        : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
      return value === proto;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e8) {}
        try {
          return func + '';
        } catch (e8) {}
      }
      return '';
    }
    function cloneDeep(value) {
      return baseClone(value, true, true);
    }
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }
    function isArguments(value) {
      return (
        isArrayLikeObject(value) &&
        hasOwnProperty2.call(value, 'callee') &&
        (!propertyIsEnumerable.call(value, 'callee') ||
          objectToString2.call(value) == argsTag)
      );
    }
    var isArray3 = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction2(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    var isBuffer3 = nativeIsBuffer || stubFalse;
    function isFunction2(value) {
      var tag = isObject3(value) ? objectToString2.call(value) : '';
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return (
        typeof value == 'number' &&
        value > -1 &&
        value % 1 == 0 &&
        value <= MAX_SAFE_INTEGER
      );
    }
    function isObject3(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    function keys2(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module.exports = cloneDeep;
  },
});

// src/.wrangler/tmp/bundle-tItaRt/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env3, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    },
  };
  return head(request, env3, ctx, middlewareCtx);
}
function __facade_invoke__(request, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env3, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware,
  ]);
}

// src/.wrangler/tmp/bundle-tItaRt/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// src/index.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// ../node_modules/@trpc/server/dist/adapters/fetch/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// ../node_modules/@trpc/server/dist/index-f91d720c.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// ../node_modules/@trpc/server/dist/codes-c924c3db.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function invert(obj) {
  const newObj = /* @__PURE__ */ Object.create(null);
  for (const key in obj) {
    const v = obj[key];
    newObj[v] = key;
  }
  return newObj;
}
var TRPC_ERROR_CODES_BY_KEY = {
  /**
   * Invalid JSON was received by the server.
   * An error occurred on the server while parsing the JSON text.
   */
  PARSE_ERROR: -32700,
  /**
   * The JSON sent is not a valid Request object.
   */
  BAD_REQUEST: -32600,
  // Internal JSON-RPC error
  INTERNAL_SERVER_ERROR: -32603,
  NOT_IMPLEMENTED: -32603,
  // Implementation specific errors
  UNAUTHORIZED: -32001,
  FORBIDDEN: -32003,
  NOT_FOUND: -32004,
  METHOD_NOT_SUPPORTED: -32005,
  TIMEOUT: -32008,
  CONFLICT: -32009,
  PRECONDITION_FAILED: -32012,
  PAYLOAD_TOO_LARGE: -32013,
  UNPROCESSABLE_CONTENT: -32022,
  TOO_MANY_REQUESTS: -32029,
  CLIENT_CLOSED_REQUEST: -32099,
};
var TRPC_ERROR_CODES_BY_NUMBER = invert(TRPC_ERROR_CODES_BY_KEY);

// ../node_modules/@trpc/server/dist/index-f91d720c.mjs
var TRPC_ERROR_CODES_BY_NUMBER2 = invert(TRPC_ERROR_CODES_BY_KEY);
var JSONRPC2_TO_HTTP_CODE = {
  PARSE_ERROR: 400,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  METHOD_NOT_SUPPORTED: 405,
  TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
};
function getStatusCodeFromKey(code) {
  return JSONRPC2_TO_HTTP_CODE[code] ?? 500;
}
function getHTTPStatusCode(json) {
  const arr = Array.isArray(json) ? json : [json];
  const httpStatuses = new Set(
    arr.map((res) => {
      if ('error' in res) {
        const data = res.error.data;
        if (typeof data.httpStatus === 'number') {
          return data.httpStatus;
        }
        const code = TRPC_ERROR_CODES_BY_NUMBER2[res.error.code];
        return getStatusCodeFromKey(code);
      }
      return 200;
    }),
  );
  if (httpStatuses.size !== 1) {
    return 207;
  }
  const httpStatus = httpStatuses.values().next().value;
  return httpStatus;
}
function getHTTPStatusCodeFromError(error) {
  return getStatusCodeFromKey(error.code);
}

// ../node_modules/@trpc/server/dist/resolveHTTPResponse-68c8befb.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// ../node_modules/@trpc/server/dist/config-4c0f8e88.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// ../node_modules/@trpc/server/dist/TRPCError-816ff32e.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function isObject(value) {
  return !!value && !Array.isArray(value) && typeof value === 'object';
}
function getTRPCErrorFromUnknown(cause) {
  if (cause instanceof TRPCError) {
    return cause;
  }
  if (cause instanceof Error && cause.name === 'TRPCError') {
    return cause;
  }
  const trpcError = new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    cause,
  });
  if (cause instanceof Error && cause.stack) {
    trpcError.stack = cause.stack;
  }
  return trpcError;
}
var UnknownCauseError = class extends Error {};
function getCauseFromUnknown(cause) {
  if (cause instanceof Error) {
    return cause;
  }
  const type = typeof cause;
  if (type === 'undefined' || type === 'function' || cause === null) {
    return void 0;
  }
  if (type !== 'object') {
    return new Error(String(cause));
  }
  if (isObject(cause)) {
    const err = new UnknownCauseError();
    for (const key in cause) {
      err[key] = cause[key];
    }
    return err;
  }
  return void 0;
}
var TRPCError = class extends Error {
  constructor(opts) {
    const cause = getCauseFromUnknown(opts.cause);
    const message = opts.message ?? cause?.message ?? opts.code;
    super(message, {
      cause,
    });
    this.code = opts.code;
    this.name = 'TRPCError';
  }
};

// ../node_modules/@trpc/server/dist/config-4c0f8e88.mjs
function callProcedure(opts) {
  const { type, path } = opts;
  if (!(path in opts.procedures) || !opts.procedures[path]?._def[type]) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `No "${type}"-procedure on path "${path}"`,
    });
  }
  const procedure = opts.procedures[path];
  return procedure(opts);
}
var isServerDefault =
  typeof window === 'undefined' ||
  'Deno' in window ||
  globalThis.process?.env?.NODE_ENV === 'test' ||
  !!globalThis.process?.env?.JEST_WORKER_ID ||
  !!globalThis.process?.env?.VITEST_WORKER_ID;

// ../node_modules/@trpc/server/dist/transformTRPCResponse-1153b421.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function getErrorShape(opts) {
  const { path, error, config: config3 } = opts;
  const { code } = opts.error;
  const shape = {
    message: error.message,
    code: TRPC_ERROR_CODES_BY_KEY[code],
    data: {
      code,
      httpStatus: getHTTPStatusCodeFromError(error),
    },
  };
  if (config3.isDev && typeof opts.error.stack === 'string') {
    shape.data.stack = opts.error.stack;
  }
  if (typeof path === 'string') {
    shape.data.path = path;
  }
  return config3.errorFormatter({
    ...opts,
    shape,
  });
}
function transformTRPCResponseItem(config3, item) {
  if ('error' in item) {
    return {
      ...item,
      error: config3.transformer.output.serialize(item.error),
    };
  }
  if ('data' in item.result) {
    return {
      ...item,
      result: {
        ...item.result,
        data: config3.transformer.output.serialize(item.result.data),
      },
    };
  }
  return item;
}
function transformTRPCResponse(config3, itemOrItems) {
  return Array.isArray(itemOrItems)
    ? itemOrItems.map((item) => transformTRPCResponseItem(config3, item))
    : transformTRPCResponseItem(config3, itemOrItems);
}

// ../node_modules/@trpc/server/dist/contentType-93515a46.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function getRawProcedureInputOrThrow(opts) {
  const { req } = opts;
  try {
    if (req.method === 'GET') {
      if (!req.query.has('input')) {
        return void 0;
      }
      const raw = req.query.get('input');
      return JSON.parse(raw);
    }
    if (!opts.preprocessedBody && typeof req.body === 'string') {
      return req.body.length === 0 ? void 0 : JSON.parse(req.body);
    }
    return req.body;
  } catch (cause) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      cause,
    });
  }
}
var deserializeInputValue = (rawValue, transformer) => {
  return typeof rawValue !== 'undefined'
    ? transformer.input.deserialize(rawValue)
    : rawValue;
};
var getJsonContentTypeInputs = (opts) => {
  const rawInput = getRawProcedureInputOrThrow(opts);
  const transformer = opts.router._def._config.transformer;
  if (!opts.isBatchCall) {
    return {
      0: deserializeInputValue(rawInput, transformer),
    };
  }
  if (
    rawInput == null ||
    typeof rawInput !== 'object' ||
    Array.isArray(rawInput)
  ) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: '"input" needs to be an object when doing a batch call',
    });
  }
  const input = {};
  for (const key in rawInput) {
    const k2 = key;
    const rawValue = rawInput[k2];
    const value = deserializeInputValue(rawValue, transformer);
    input[k2] = value;
  }
  return input;
};

// ../node_modules/@trpc/server/dist/resolveHTTPResponse-68c8befb.mjs
var HTTP_METHOD_PROCEDURE_TYPE_MAP = {
  GET: 'query',
  POST: 'mutation',
};
var fallbackContentTypeHandler = {
  getInputs: getJsonContentTypeInputs,
};
function initResponse(initOpts) {
  const {
    ctx,
    paths,
    type,
    responseMeta,
    untransformedJSON,
    errors = [],
  } = initOpts;
  let status = untransformedJSON ? getHTTPStatusCode(untransformedJSON) : 200;
  const headers = {
    'Content-Type': 'application/json',
  };
  const eagerGeneration = !untransformedJSON;
  const data = eagerGeneration
    ? []
    : Array.isArray(untransformedJSON)
    ? untransformedJSON
    : [untransformedJSON];
  const meta =
    responseMeta?.({
      ctx,
      paths,
      type,
      data,
      errors,
      eagerGeneration,
    }) ?? {};
  for (const [key, value] of Object.entries(meta.headers ?? {})) {
    headers[key] = value;
  }
  if (meta.status) {
    status = meta.status;
  }
  return {
    status,
    headers,
  };
}
async function inputToProcedureCall(procedureOpts) {
  const { opts, ctx, type, input, path } = procedureOpts;
  try {
    const data = await callProcedure({
      procedures: opts.router._def.procedures,
      path,
      rawInput: input,
      ctx,
      type,
    });
    return {
      result: {
        data,
      },
    };
  } catch (cause) {
    const error = getTRPCErrorFromUnknown(cause);
    opts.onError?.({
      error,
      path,
      input,
      ctx,
      type,
      req: opts.req,
    });
    return {
      error: getErrorShape({
        config: opts.router._def._config,
        error,
        type,
        path,
        input,
        ctx,
      }),
    };
  }
}
function caughtErrorToData(cause, errorOpts) {
  const { router, req, onError } = errorOpts.opts;
  const error = getTRPCErrorFromUnknown(cause);
  onError?.({
    error,
    path: errorOpts.path,
    input: errorOpts.input,
    ctx: errorOpts.ctx,
    type: errorOpts.type,
    req,
  });
  const untransformedJSON = {
    error: getErrorShape({
      config: router._def._config,
      error,
      type: errorOpts.type,
      path: errorOpts.path,
      input: errorOpts.input,
      ctx: errorOpts.ctx,
    }),
  };
  const transformedJSON = transformTRPCResponse(
    router._def._config,
    untransformedJSON,
  );
  const body = JSON.stringify(transformedJSON);
  return {
    error,
    untransformedJSON,
    body,
  };
}
async function resolveHTTPResponse(opts) {
  const { router, req, unstable_onHead, unstable_onChunk } = opts;
  if (req.method === 'HEAD') {
    const headResponse = {
      status: 204,
    };
    unstable_onHead?.(headResponse, false);
    unstable_onChunk?.([-1, '']);
    return headResponse;
  }
  const contentTypeHandler =
    opts.contentTypeHandler ?? fallbackContentTypeHandler;
  const batchingEnabled = opts.batching?.enabled ?? true;
  const type = HTTP_METHOD_PROCEDURE_TYPE_MAP[req.method] ?? 'unknown';
  let ctx = void 0;
  let paths;
  const isBatchCall = !!req.query.get('batch');
  const isStreamCall =
    isBatchCall &&
    unstable_onHead &&
    unstable_onChunk &&
    req.headers['trpc-batch-mode'] === 'stream';
  try {
    ctx = await opts.createContext();
    if (opts.error) {
      throw opts.error;
    }
    if (isBatchCall && !batchingEnabled) {
      throw new Error(`Batching is not enabled on the server`);
    }
    if (type === 'subscription') {
      throw new TRPCError({
        message: 'Subscriptions should use wsLink',
        code: 'METHOD_NOT_SUPPORTED',
      });
    }
    if (type === 'unknown') {
      throw new TRPCError({
        message: `Unexpected request method ${req.method}`,
        code: 'METHOD_NOT_SUPPORTED',
      });
    }
    const inputs = await contentTypeHandler.getInputs({
      isBatchCall,
      req,
      router,
      preprocessedBody: opts.preprocessedBody ?? false,
    });
    paths = isBatchCall
      ? decodeURIComponent(opts.path).split(',')
      : [opts.path];
    const promises = paths.map((path, index) =>
      inputToProcedureCall({
        opts,
        ctx,
        type,
        input: inputs[index],
        path,
      }),
    );
    if (!isStreamCall) {
      const untransformedJSON = await Promise.all(promises);
      const errors = untransformedJSON.flatMap((response) =>
        'error' in response ? [response.error] : [],
      );
      const headResponse1 = initResponse({
        ctx,
        paths,
        type,
        responseMeta: opts.responseMeta,
        untransformedJSON,
        errors,
      });
      unstable_onHead?.(headResponse1, false);
      const result = isBatchCall ? untransformedJSON : untransformedJSON[0];
      const transformedJSON = transformTRPCResponse(
        router._def._config,
        result,
      );
      const body = JSON.stringify(transformedJSON);
      unstable_onChunk?.([-1, body]);
      return {
        status: headResponse1.status,
        headers: headResponse1.headers,
        body,
      };
    }
    const headResponse2 = initResponse({
      ctx,
      paths,
      type,
      responseMeta: opts.responseMeta,
    });
    unstable_onHead(headResponse2, true);
    const indexedPromises = new Map(
      promises.map((promise, index) => [
        index,
        promise.then((r6) => [index, r6]),
      ]),
    );
    for (const _ of paths) {
      const [index, untransformedJSON1] = await Promise.race(
        indexedPromises.values(),
      );
      indexedPromises.delete(index);
      try {
        const transformedJSON1 = transformTRPCResponse(
          router._def._config,
          untransformedJSON1,
        );
        const body1 = JSON.stringify(transformedJSON1);
        unstable_onChunk([index, body1]);
      } catch (cause) {
        const path = paths[index];
        const input = inputs[index];
        const { body: body2 } = caughtErrorToData(cause, {
          opts,
          ctx,
          type,
          path,
          input,
        });
        unstable_onChunk([index, body2]);
      }
    }
    return;
  } catch (cause1) {
    const {
      error,
      untransformedJSON: untransformedJSON2,
      body: body3,
    } = caughtErrorToData(cause1, {
      opts,
      ctx,
      type,
    });
    const headResponse3 = initResponse({
      ctx,
      paths,
      type,
      responseMeta: opts.responseMeta,
      untransformedJSON: untransformedJSON2,
      errors: [error],
    });
    unstable_onHead?.(headResponse3, false);
    unstable_onChunk?.([-1, body3]);
    return {
      status: headResponse3.status,
      headers: headResponse3.headers,
      body: body3,
    };
  }
}

// ../node_modules/@trpc/server/dist/batchStreamFormatter-fc1ffb26.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function getBatchStreamFormatter() {
  let first = true;
  function format2(index, string) {
    const prefix = first ? '{' : ',';
    first = false;
    return `${prefix}"${index}":${string}
`;
  }
  format2.end = () => '}';
  return format2;
}

// ../node_modules/@trpc/server/dist/adapters/fetch/index.mjs
async function fetchRequestHandler(opts) {
  const resHeaders = new Headers();
  const createContext = async () => {
    return opts.createContext?.({
      req: opts.req,
      resHeaders,
    });
  };
  const url = new URL(opts.req.url);
  const path = url.pathname.slice(opts.endpoint.length + 1);
  const req = {
    query: url.searchParams,
    method: opts.req.method,
    headers: Object.fromEntries(opts.req.headers),
    body: opts.req.headers.get('content-type')?.startsWith('application/json')
      ? await opts.req.text()
      : '',
  };
  let resolve;
  const promise = new Promise((r6) => (resolve = r6));
  let status = 200;
  let isStream = false;
  let controller;
  let encoder;
  let formatter;
  const unstable_onHead = (head, isStreaming) => {
    for (const [key, value] of Object.entries(head.headers ?? {})) {
      if (typeof value === 'undefined') {
        continue;
      }
      if (typeof value === 'string') {
        resHeaders.set(key, value);
        continue;
      }
      for (const v of value) {
        resHeaders.append(key, v);
      }
    }
    status = head.status;
    if (isStreaming) {
      resHeaders.set('Transfer-Encoding', 'chunked');
      resHeaders.append('Vary', 'trpc-batch-mode');
      const stream = new ReadableStream({
        start(c) {
          controller = c;
        },
      });
      const response = new Response(stream, {
        status,
        headers: resHeaders,
      });
      resolve(response);
      encoder = new TextEncoder();
      formatter = getBatchStreamFormatter();
      isStream = true;
    }
  };
  const unstable_onChunk = ([index, string]) => {
    if (index === -1) {
      const response = new Response(string || null, {
        status,
        headers: resHeaders,
      });
      resolve(response);
    } else {
      controller.enqueue(encoder.encode(formatter(index, string)));
    }
  };
  resolveHTTPResponse({
    req,
    createContext,
    path,
    router: opts.router,
    batching: opts.batching,
    responseMeta: opts.responseMeta,
    onError(o) {
      opts?.onError?.({
        ...o,
        req: opts.req,
      });
    },
    unstable_onHead,
    unstable_onChunk,
  })
    .then(() => {
      if (isStream) {
        controller.enqueue(encoder.encode(formatter.end()));
        controller.close();
      }
    })
    .catch(() => {
      if (isStream) {
        controller.close();
      }
    });
  return promise;
}

// ../node_modules/elysia/dist/index.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// ../node_modules/memoirist/dist/index.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var e = (e8, t4) => ({
  part: e8,
  store: null,
  inert:
    void 0 !== t4 ? new Map(t4.map((e9) => [e9.part.charCodeAt(0), e9])) : null,
  params: null,
  wildcardStore: null,
});
var t = (e8, t4) => ({ ...e8, part: t4 });
var r = (e8) => ({ paramName: e8, store: null, inert: null });
var _Memoirist = class {
  root = {};
  history = [];
  add(a4, l, i2) {
    let s3;
    if ('string' != typeof l) throw TypeError('Route path must be a string');
    '' === l ? (l = '/') : '/' !== l[0] && (l = `/${l}`),
      this.history.push([a4, l, i2]);
    let n3 = '*' === l[l.length - 1];
    n3 && (l = l.slice(0, -1));
    let o = l.split(_Memoirist.regex.static),
      u2 = l.match(_Memoirist.regex.params) || [];
    '' === o[o.length - 1] && o.pop(),
      (s3 = this.root[a4] ? this.root[a4] : (this.root[a4] = e('/')));
    let p2 = 0;
    for (let a5 = 0; a5 < o.length; ++a5) {
      let i3 = o[a5];
      if (a5 > 0) {
        let t4 = u2[p2++].slice(1);
        if (null === s3.params) s3.params = r(t4);
        else if (s3.params.paramName !== t4)
          throw Error(
            `Cannot create route "${l}" with parameter "${t4}" because a route already exists with a different parameter name ("${s3.params.paramName}") in the same location`,
          );
        let a6 = s3.params;
        if (null === a6.inert) {
          s3 = a6.inert = e(i3);
          continue;
        }
        s3 = a6.inert;
      }
      for (let r6 = 0; ; ) {
        if (r6 === i3.length) {
          if (r6 < s3.part.length) {
            let a6 = t(s3, s3.part.slice(r6));
            Object.assign(s3, e(i3, [a6]));
          }
          break;
        }
        if (r6 === s3.part.length) {
          if (null === s3.inert) s3.inert = /* @__PURE__ */ new Map();
          else if (s3.inert.has(i3.charCodeAt(r6))) {
            (s3 = s3.inert.get(i3.charCodeAt(r6))),
              (i3 = i3.slice(r6)),
              (r6 = 0);
            continue;
          }
          let t4 = e(i3.slice(r6));
          s3.inert.set(i3.charCodeAt(r6), t4), (s3 = t4);
          break;
        }
        if (i3[r6] !== s3.part[r6]) {
          let a6 = t(s3, s3.part.slice(r6)),
            l2 = e(i3.slice(r6));
          Object.assign(s3, e(s3.part.slice(0, r6), [a6, l2])), (s3 = l2);
          break;
        }
        ++r6;
      }
    }
    if (p2 < u2.length) {
      let e8 = u2[p2],
        t4 = e8.slice(1);
      if (null === s3.params) s3.params = r(t4);
      else if (s3.params.paramName !== t4)
        throw Error(
          `Cannot create route "${l}" with parameter "${t4}" because a route already exists with a different parameter name ("${s3.params.paramName}") in the same location`,
        );
      return (
        null === s3.params.store && (s3.params.store = i2), s3.params.store
      );
    }
    return n3
      ? (null === s3.wildcardStore && (s3.wildcardStore = i2), s3.wildcardStore)
      : (null === s3.store && (s3.store = i2), s3.store);
  }
  find(e8, t4) {
    let r6 = this.root[e8];
    return r6 ? a(t4, t4.length, r6, 0) : null;
  }
};
var Memoirist = _Memoirist;
__publicField(Memoirist, 'regex', {
  static: /:.+?(?=\/|$)/,
  params: /:.+?(?=\/|$)/g,
});
var a = (e8, t4, r6, l) => {
  let i2 = r6?.part,
    s3 = l + i2.length;
  if (i2.length > 1) {
    if (s3 > t4) return null;
    if (i2.length < 15) {
      for (let t5 = 1, r7 = l + 1; t5 < i2.length; ++t5, ++r7)
        if (i2.charCodeAt(t5) !== e8.charCodeAt(r7)) return null;
    } else if (e8.substring(l, s3) !== i2) return null;
  }
  if (s3 === t4)
    return null !== r6.store
      ? { store: r6.store, params: {} }
      : null !== r6.wildcardStore
      ? { store: r6.wildcardStore, params: { '*': '' } }
      : null;
  if (null !== r6.inert) {
    let l2 = r6.inert.get(e8.charCodeAt(s3));
    if (void 0 !== l2) {
      let r7 = a(e8, t4, l2, s3);
      if (null !== r7) return r7;
    }
  }
  if (null !== r6.params) {
    let l2 = r6.params,
      i3 = e8.indexOf('/', s3);
    if (i3 !== s3) {
      if (-1 === i3 || i3 >= t4) {
        if (null !== l2.store) {
          let r7 = {};
          return (
            (r7[l2.paramName] = e8.substring(s3, t4)),
            { store: l2.store, params: r7 }
          );
        }
      } else if (null !== l2.inert) {
        let r7 = a(e8, t4, l2.inert, i3);
        if (null !== r7)
          return (r7.params[l2.paramName] = e8.substring(s3, i3)), r7;
      }
    }
  }
  return null !== r6.wildcardStore
    ? { store: r6.wildcardStore, params: { '*': e8.substring(s3, t4) } }
    : null;
};

// ../node_modules/eventemitter3/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var import_index = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import_index.default;

// ../node_modules/elysia/dist/trace.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var createTraceListener = (e8, n3) =>
  async function (s3) {
    let r6 = s3.id;
    if ('request' === s3.event && 'begin' === s3.type) {
      let a4 = e8(),
        t4 = () => {
          let e9, n4;
          let s4 = -1,
            r7 = [],
            a5 = [],
            t5 = false,
            o2 = new Promise((n5) => {
              e9 = (e10) => {
                t5 || ((t5 = true), n5(e10));
              };
            }),
            i3 = false,
            c2 = new Promise((e10) => {
              n4 = (n5) => {
                if (!i3) {
                  for (i3 = true, -1 === s4 && (s4 = 0); s4 < a5.length; s4++) {
                    let e11;
                    let n6 = {
                      name: 'anonymous',
                      time: performance.now(),
                      skip: true,
                      end: new Promise((n7) => {
                        n7(e11);
                      }),
                      children: [],
                    };
                    (e11 = performance.now()), r7[s4](n6);
                  }
                  e10(n5);
                }
              };
            });
          return {
            signal: o2,
            consumeChild(e10) {
              switch (e10.type) {
                case 'begin':
                  let n5 = r7[++s4];
                  n5
                    ? n5({
                        name: e10.name,
                        time: e10.time,
                        skip: false,
                        end: new Promise((e11) => {
                          a5.push(e11);
                        }),
                      })
                    : (this.resolve(), console.log('SKIP'));
                  break;
                case 'end':
                  a5[s4]?.(e10.time);
              }
            },
            consume(s5) {
              switch (s5.type) {
                case 'begin':
                  let a6 = [],
                    t6 = s5.unit ?? 0;
                  for (let e10 = 0; e10 < t6; e10++) {
                    let e11;
                    a6.push(
                      new Promise((n5) => {
                        e11 = n5;
                      }),
                    ),
                      r7.push(e11);
                  }
                  e9({
                    // Begin always have name
                    name: s5.name,
                    time: s5.time,
                    skip: false,
                    end: c2,
                    children: a6,
                  });
                  break;
                case 'end':
                  n4(s5.time);
              }
            },
            resolve() {
              let s5;
              if (t5 && i3) return;
              let r8 = {
                name: 'anonymous',
                time: performance.now(),
                skip: true,
                end: new Promise((e10) => {
                  e10(s5);
                }),
                children: [],
              };
              (s5 = performance.now()), e9(r8), n4(s5);
            },
          };
        },
        o = t4(),
        i2 = t4(),
        c = t4(),
        l = t4(),
        m2 = t4(),
        u2 = t4(),
        d2 = t4(),
        b2 = t4();
      o.consume(s3);
      let f = (e9) => {
        if (e9.id === r6)
          switch (e9.event) {
            case 'request':
              o.consume(e9);
              break;
            case 'request.unit':
              o.consumeChild(e9);
              break;
            case 'parse':
              i2.consume(e9);
              break;
            case 'parse.unit':
              i2.consumeChild(e9);
              break;
            case 'transform':
              c.consume(e9);
              break;
            case 'transform.unit':
              c.consumeChild(e9);
              break;
            case 'beforeHandle':
              l.consume(e9);
              break;
            case 'beforeHandle.unit':
              l.consumeChild(e9);
              break;
            case 'handle':
              m2.consume(e9);
              break;
            case 'afterHandle':
              u2.consume(e9);
              break;
            case 'afterHandle.unit':
              u2.consumeChild(e9);
              break;
            case 'error':
              d2.consume(e9);
              break;
            case 'error.unit':
              d2.consumeChild(e9);
              break;
            case 'response':
              'begin' === e9.type
                ? (o.resolve(),
                  i2.resolve(),
                  c.resolve(),
                  l.resolve(),
                  m2.resolve(),
                  u2.resolve(),
                  d2.resolve())
                : a4.off('event', f),
                b2.consume(e9);
              break;
            case 'response.unit':
              b2.consumeChild(e9);
          }
      };
      a4.on('event', f),
        await n3({
          id: s3.id,
          // @ts-ignore
          context: s3.ctx,
          // @ts-ignore
          set: s3.ctx?.set,
          // @ts-ignore
          store: s3.ctx?.store,
          time: s3.time,
          request: o.signal,
          parse: i2.signal,
          transform: c.signal,
          beforeHandle: l.signal,
          handle: m2.signal,
          afterHandle: u2.signal,
          error: d2.signal,
          response: b2.signal,
        }),
        a4.emit(`res${r6}`, void 0);
    }
  };

// ../node_modules/elysia/dist/ws/index.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// ../node_modules/elysia/dist/error.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var import_value = __toESM(require_value2());
var e2 =
  'undefined' != typeof Bun
    ? Bun.env
    : 'undefined' != typeof process
    ? process?.env
    : void 0;
var ERROR_CODE = Symbol('ErrorCode');
var isProduction = (e2?.NODE_ENV ?? e2?.ENV) === 'production';
var InternalServerError = class extends Error {
  code = 'INTERNAL_SERVER_ERROR';
  status = 500;
  constructor(r6) {
    super(r6 ?? 'INTERNAL_SERVER_ERROR');
  }
};
var NotFoundError = class extends Error {
  code = 'NOT_FOUND';
  status = 404;
  constructor(r6) {
    super(r6 ?? 'NOT_FOUND');
  }
};
var InvalidCookieSignature = class extends Error {
  key;
  code;
  status;
  constructor(r6, e8) {
    super(e8 ?? `"${r6}" has invalid cookie signature`),
      (this.key = r6),
      (this.code = 'INVALID_COOKIE_SIGNATURE'),
      (this.status = 400);
  }
};
var ValidationError = class extends Error {
  type;
  validator;
  value;
  code;
  status;
  constructor(e8, t4, s3) {
    let o = isProduction ? void 0 : t4.Errors(s3).First(),
      a4 = o?.schema.error
        ? 'function' == typeof o.schema.error
          ? o.schema.error(e8, t4, s3)
          : o.schema.error
        : void 0,
      i2 = isProduction
        ? a4 ?? `Invalid ${e8 ?? o?.schema.error ?? o?.message}`
        : a4 ??
          `Invalid ${e8}, '${o?.path?.slice(1) || 'type'}': ${o?.message}

Expected: ` + // @ts-ignore
            JSON.stringify(import_value.Value.Create(t4.schema), null, 2) +
            '\n\nFound: ' +
            JSON.stringify(s3, null, 2);
    super(i2),
      (this.type = e8),
      (this.validator = t4),
      (this.value = s3),
      (this.code = 'VALIDATION'),
      (this.status = 400),
      Object.setPrototypeOf(this, ValidationError.prototype);
  }
  get all() {
    return [...this.validator.Errors(this.value)];
  }
  get model() {
    return import_value.Value.Create(this.validator.schema);
  }
  toResponse(r6) {
    return new Response(this.message, { status: 400, headers: r6 });
  }
};

// ../node_modules/elysia/dist/ws/index.js
var websocket = {
  open(t4) {
    t4.data.open?.(t4);
  },
  message(t4, r6) {
    t4.data.message?.(t4, r6);
  },
  drain(t4) {
    t4.data.drain?.(t4);
  },
  close(t4, r6, e8) {
    t4.data.close?.(t4, r6, e8);
  },
};
var ElysiaWS = class {
  raw;
  data;
  id;
  validator;
  constructor(t4, r6) {
    (this.raw = t4),
      (this.data = r6),
      (this.validator = t4.data.validator),
      (this.id = Date.now());
  }
  get publish() {
    return (r6, e8, s3) => {
      if (this.validator?.Check(e8) === false)
        throw new ValidationError('message', this.validator, e8);
      return (
        'object' == typeof e8 && (e8 = JSON.stringify(e8)),
        this.raw.publish(r6, e8, s3),
        this
      );
    };
  }
  get send() {
    return (r6) => {
      if (this.validator?.Check(r6) === false)
        throw new ValidationError('message', this.validator, r6);
      return (
        Buffer2.isBuffer(r6) ||
          ('object' == typeof r6 && (r6 = JSON.stringify(r6))),
        this.raw.send(r6),
        this
      );
    };
  }
  get subscribe() {
    return (t4) => (this.raw.subscribe(t4), this);
  }
  get unsubscribe() {
    return (t4) => (this.raw.unsubscribe(t4), this);
  }
  get cork() {
    return (t4) => (this.raw.cork(t4), this);
  }
  get close() {
    return () => (this.raw.close(), this);
  }
  get terminate() {
    return this.raw.terminate.bind(this.raw);
  }
  get isSubscribed() {
    return this.raw.isSubscribed.bind(this.raw);
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
};

// ../node_modules/elysia/dist/handler.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var import_cookie2 = __toESM(require_cookie());

// ../node_modules/elysia/dist/utils.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var import_typebox = __toESM(require_typebox());
var import_value2 = __toESM(require_value2());
var import_compiler = __toESM(require_compiler2());
var a2 = (e8) => e8 && 'object' == typeof e8 && !Array.isArray(e8);
var n = (e8) =>
  ('function' == typeof e8 && /^\s*class\s+/.test(e8.toString())) || // Handle import * as Sentry from '@sentry/bun'
  // This also handle [object Date], [object Array]
  // and FFI value like [object Prisma]
  e8.toString().startsWith('[object ') || // If object prototype is not pure, then probably a class-like object
  isNotEmpty(Object.getPrototypeOf(e8));
var mergeDeep = (e8, r6, { skipKeys: t4 } = {}) => {
  if (a2(e8) && a2(r6)) {
    for (let [o, s3] of Object.entries(r6))
      if (!t4?.includes(o)) {
        if (!a2(s3) || !(o in e8) || n(s3)) {
          e8[o] = s3;
          continue;
        }
        e8[o] = mergeDeep(e8[o], s3);
      }
  }
  return e8;
};
var mergeCookie = (e8, r6) => mergeDeep(e8, r6, { skipKeys: ['properties'] });
var mergeObjectArray = (e8, r6) => {
  let t4 = [...(Array.isArray(e8) ? e8 : [e8])],
    o = [];
  for (let e9 of t4)
    e9.$elysiaChecksum && // @ts-ignore
      o.push(e9.$elysiaChecksum);
  for (let e9 of Array.isArray(r6) ? r6 : [r6])
    o.includes(e9?.$elysiaChecksum) || t4.push(e9);
  return t4;
};
var mergeHook = (e8, r6) => ({
  // Merge local hook first
  // @ts-ignore
  body: r6?.body ?? e8?.body,
  // @ts-ignore
  headers: r6?.headers ?? e8?.headers,
  // @ts-ignore
  params: r6?.params ?? e8?.params,
  // @ts-ignore
  query: r6?.query ?? e8?.query,
  // @ts-ignore
  response: r6?.response ?? e8?.response,
  type: e8?.type || r6?.type,
  detail: mergeDeep(
    // @ts-ignore
    r6?.detail ?? {},
    // @ts-ignore
    e8?.detail ?? {},
  ),
  parse: mergeObjectArray(e8?.parse ?? [], r6?.parse ?? []),
  transform: mergeObjectArray(e8?.transform ?? [], r6?.transform ?? []),
  beforeHandle: mergeObjectArray(
    e8?.beforeHandle ?? [],
    r6?.beforeHandle ?? [],
  ),
  afterHandle: mergeObjectArray(e8?.afterHandle ?? [], r6?.afterHandle ?? []),
  onResponse: mergeObjectArray(e8?.onResponse ?? [], r6?.onResponse ?? []),
  trace: mergeObjectArray(e8?.trace ?? [], r6?.trace ?? []),
  error: mergeObjectArray(e8?.error ?? [], r6?.error ?? []),
});
var getSchemaValidator = (
  e8,
  { models: o = {}, additionalProperties: a4 = false, dynamic: n3 = false },
) => {
  if (!e8 || ('string' == typeof e8 && !(e8 in o))) return;
  let s3 = 'string' == typeof e8 ? o[e8] : e8;
  return ('object' === s3.type &&
    'additionalProperties' in s3 == false &&
    (s3.additionalProperties = a4),
  n3)
    ? {
        schema: s3,
        references: '',
        checkFunc: () => {},
        code: '',
        Check: (e9) => import_value2.Value.Check(s3, e9),
        Errors: (e9) => import_value2.Value.Errors(s3, e9),
        Code: () => '',
      }
    : import_compiler.TypeCompiler.Compile(s3);
};
var getResponseSchemaValidator = (
  o,
  { models: a4 = {}, additionalProperties: n3 = false, dynamic: s3 = false },
) => {
  if (!o || ('string' == typeof o && !(o in a4))) return;
  let i2 = 'string' == typeof o ? a4[o] : o,
    l = (e8) =>
      s3
        ? {
            schema: e8,
            references: '',
            checkFunc: () => {},
            code: '',
            Check: (t4) => import_value2.Value.Check(e8, t4),
            Errors: (t4) => import_value2.Value.Errors(e8, t4),
            Code: () => '',
          }
        : import_compiler.TypeCompiler.Compile(e8);
  if (import_typebox.Kind in i2)
    return (
      'additionalProperties' in i2 == false && (i2.additionalProperties = n3),
      { 200: l(i2) }
    );
  let p2 = {};
  return (
    Object.keys(i2).forEach((r6) => {
      let t4 = i2[+r6];
      if ('string' == typeof t4) {
        if (t4 in a4) {
          let o2 = a4[t4];
          o2.type, // Inherits model maybe already compiled
            (p2[+r6] = import_typebox.Kind in o2 ? l(o2) : o2);
        }
        return;
      }
      'object' === t4.type &&
        'additionalProperties' in t4 == false &&
        (t4.additionalProperties = n3), // Inherits model maybe already compiled
        (p2[+r6] = import_typebox.Kind in t4 ? l(t4) : t4);
    }),
    p2
  );
};
var checksum = (e8) => {
  let r6 = 9;
  for (let t4 = 0; t4 < e8.length; )
    r6 = Math.imul(r6 ^ e8.charCodeAt(t4++), 387420489);
  return r6 ^ (r6 >>> 9);
};
var mergeLifeCycle = (e8, r6, t4) => {
  let o = (e9) => (
    t4 && // @ts-ignore
      (e9.$elysiaChecksum = t4),
    e9
  );
  return {
    start: mergeObjectArray(
      e8.start,
      ('start' in r6 ? r6.start ?? [] : []).map(o),
    ),
    request: mergeObjectArray(
      e8.request,
      ('request' in r6 ? r6.request ?? [] : []).map(o),
    ),
    parse: mergeObjectArray(e8.parse, 'parse' in r6 ? r6?.parse ?? [] : []).map(
      o,
    ),
    transform: mergeObjectArray(e8.transform, (r6?.transform ?? []).map(o)),
    beforeHandle: mergeObjectArray(
      e8.beforeHandle,
      (r6?.beforeHandle ?? []).map(o),
    ),
    afterHandle: mergeObjectArray(
      e8.afterHandle,
      (r6?.afterHandle ?? []).map(o),
    ),
    onResponse: mergeObjectArray(e8.onResponse, (r6?.onResponse ?? []).map(o)),
    trace: mergeObjectArray(
      e8.trace,
      ('trace' in r6 ? r6.trace ?? [] : []).map(o),
    ),
    error: mergeObjectArray(e8.error, (r6?.error ?? []).map(o)),
    stop: mergeObjectArray(e8.stop, ('stop' in r6 ? r6.stop ?? [] : []).map(o)),
  };
};
var asGlobal = (e8, r6 = true) =>
  e8
    ? 'function' == typeof e8
      ? (r6
          ? // @ts-ignore
            (e8.$elysiaHookType = 'global')
          : (e8.$elysiaHookType = void 0),
        e8)
      : e8.map(
          (e9) => (
            r6
              ? // @ts-ignore
                (e9.$elysiaHookType = 'global')
              : (e9.$elysiaHookType = void 0),
            e9
          ),
        )
    : e8;
var s = (e8) =>
  e8
    ? 'function' == typeof e8
      ? 'global' === e8.$elysiaHookType
        ? e8
        : void 0
      : e8.filter((e9) => 'global' === e9.$elysiaHookType)
    : e8;
var filterGlobalHook = (e8) => ({
  // rest is validator
  ...e8,
  type: e8?.type,
  detail: e8?.detail,
  parse: s(e8?.parse),
  transform: s(e8?.transform),
  beforeHandle: s(e8?.beforeHandle),
  afterHandle: s(e8?.afterHandle),
  onResponse: s(e8?.onResponse),
  error: s(e8?.error),
});
var StatusMap = {
  Continue: 100,
  'Switching Protocols': 101,
  Processing: 102,
  'Early Hints': 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  'Non-Authoritative Information': 203,
  'No Content': 204,
  'Reset Content': 205,
  'Partial Content': 206,
  'Multi-Status': 207,
  'Already Reported': 208,
  'Multiple Choices': 300,
  'Moved Permanently': 301,
  Found: 302,
  'See Other': 303,
  'Not Modified': 304,
  'Temporary Redirect': 307,
  'Permanent Redirect': 308,
  'Bad Request': 400,
  Unauthorized: 401,
  'Payment Required': 402,
  Forbidden: 403,
  'Not Found': 404,
  'Method Not Allowed': 405,
  'Not Acceptable': 406,
  'Proxy Authentication Required': 407,
  'Request Timeout': 408,
  Conflict: 409,
  Gone: 410,
  'Length Required': 411,
  'Precondition Failed': 412,
  'Payload Too Large': 413,
  'URI Too Long': 414,
  'Unsupported Media Type': 415,
  'Range Not Satisfiable': 416,
  'Expectation Failed': 417,
  "I'm a teapot": 418,
  'Misdirected Request': 421,
  'Unprocessable Content': 422,
  Locked: 423,
  'Failed Dependency': 424,
  'Too Early': 425,
  'Upgrade Required': 426,
  'Precondition Required': 428,
  'Too Many Requests': 429,
  'Request Header Fields Too Large': 431,
  'Unavailable For Legal Reasons': 451,
  'Internal Server Error': 500,
  'Not Implemented': 501,
  'Bad Gateway': 502,
  'Service Unavailable': 503,
  'Gateway Timeout': 504,
  'HTTP Version Not Supported': 505,
  'Variant Also Negotiates': 506,
  'Insufficient Storage': 507,
  'Loop Detected': 508,
  'Not Extended': 510,
  'Network Authentication Required': 511,
};
var signCookie = async (e8, r6) => {
  if ('string' != typeof e8)
    throw TypeError('Cookie value must be provided as a string.');
  if (null === r6) throw TypeError('Secret key must be provided.');
  let t4 = new TextEncoder(),
    o = await crypto.subtle.importKey(
      'raw',
      t4.encode(r6),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    ),
    a4 = await crypto.subtle.sign('HMAC', o, t4.encode(e8)),
    n3 = Array.from(new Uint8Array(a4)),
    s3 = btoa(String.fromCharCode(...n3));
  return `${e8}.${s3.replace(/=+$/, '')}`;
};
var unsignCookie = async (e8, r6) => {
  if ('string' != typeof e8)
    throw TypeError('Signed cookie string must be provided.');
  if (null === r6) throw TypeError('Secret key must be provided.');
  let t4 = e8.slice(0, e8.lastIndexOf('.')),
    o = await signCookie(t4, r6);
  return o === e8 && t4;
};

// ../node_modules/elysia/dist/cookie.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var import_cookie = __toESM(require_cookie());
var Cookie = class {
  _value;
  property;
  name;
  setter;
  constructor(e8, t4 = {}) {
    (this._value = e8), (this.property = t4);
  }
  get() {
    return this._value;
  }
  get value() {
    return this._value;
  }
  set value(e8) {
    if ('object' == typeof e8) {
      if (JSON.stringify(this.value) === JSON.stringify(e8)) return;
    } else if (this.value === e8) return;
    (this._value = e8), this.sync();
  }
  add(e8) {
    let t4 = Object.assign(
      this.property,
      'function' == typeof e8
        ? e8(Object.assign(this.property, this.value))
        : e8,
    );
    return (
      'value' in t4 && ((this._value = t4.value), delete t4.value),
      (this.property = t4),
      this.sync()
    );
  }
  set(e8) {
    let t4 =
      'function' == typeof e8
        ? e8(Object.assign(this.property, this.value))
        : e8;
    return (
      'value' in t4 && ((this._value = t4.value), delete t4.value),
      (this.property = t4),
      this.sync()
    );
  }
  remove(e8) {
    void 0 !== this.value &&
      this.set({
        domain: e8?.domain,
        expires: /* @__PURE__ */ new Date(0),
        maxAge: 0,
        path: e8?.path,
        sameSite: e8?.sameSite,
        secure: e8?.secure,
        value: '',
      });
  }
  get domain() {
    return this.property.domain;
  }
  set domain(e8) {
    this.property.domain !== e8 && // @ts-ignore
      ((this.property.domain = e8), this.sync());
  }
  get expires() {
    return this.property.expires;
  }
  set expires(e8) {
    this.property.expires?.getTime() !== e8?.getTime() && // @ts-ignore
      ((this.property.expires = e8), this.sync());
  }
  get httpOnly() {
    return this.property.httpOnly;
  }
  set httpOnly(e8) {
    this.property.domain !== e8 && // @ts-ignore
      ((this.property.httpOnly = e8), this.sync());
  }
  get maxAge() {
    return this.property.maxAge;
  }
  set maxAge(e8) {
    this.property.maxAge !== e8 && // @ts-ignore
      ((this.property.maxAge = e8), this.sync());
  }
  get path() {
    return this.property.path;
  }
  set path(e8) {
    this.property.path !== e8 && // @ts-ignore
      ((this.property.path = e8), this.sync());
  }
  get priority() {
    return this.property.priority;
  }
  set priority(e8) {
    this.property.priority !== e8 && // @ts-ignore
      ((this.property.priority = e8), this.sync());
  }
  get sameSite() {
    return this.property.sameSite;
  }
  set sameSite(e8) {
    this.property.sameSite !== e8 && // @ts-ignore
      ((this.property.sameSite = e8), this.sync());
  }
  get secure() {
    return this.property.secure;
  }
  set secure(e8) {
    this.property.secure !== e8 && // @ts-ignore
      ((this.property.secure = e8), this.sync());
  }
  toString() {
    return 'object' == typeof this.value
      ? JSON.stringify(this.value)
      : this.value?.toString() ?? '';
  }
  sync() {
    return (
      this.name &&
        this.setter &&
        (this.setter.cookie
          ? (this.setter.cookie[this.name] = Object.assign(this.property, {
              value: this.toString(),
            }))
          : (this.setter.cookie = {
              [this.name]: Object.assign(this.property, {
                value: this.toString(),
              }),
            })),
      this
    );
  }
};
var createCookieJar = (e8, t4, r6) =>
  new Proxy(e8, {
    get(e9, i2) {
      if (i2 in e9) return e9[i2];
      let s3 = new Cookie(void 0, r6 ? { ...r6 } : void 0);
      return (
        // @ts-ignore
        (s3.setter = t4), (s3.name = i2), s3
      );
    },
    set: (e9, r7, i2) =>
      i2 instanceof Cookie &&
      (t4.cookie || (t4.cookie = {}), // @ts-ignore
      (i2.setter = t4),
      (i2.name = r7), // @ts-ignore
      i2.sync(),
      (e9[r7] = i2),
      true),
  });
var parseCookie = async (i2, s3, { secret: o, sign: p2, ...n3 } = {}) => {
  if (!s3) return createCookieJar({}, i2, n3);
  let a4 = {},
    h2 = 'string' == typeof o;
  p2 && true !== p2 && !Array.isArray(p2) && (p2 = [p2]);
  let y2 = Object.keys((0, import_cookie.parse)(s3));
  for (let u2 = 0; u2 < y2.length; u2++) {
    let c = y2[u2],
      l = (0, import_cookie.parse)(s3)[c];
    if (true === p2 || p2?.includes(c)) {
      if (!o) throw Error('No secret is provided to cookie plugin');
      if (h2) {
        if (
          false === // @ts-ignore
          (l = await unsignCookie(l, o))
        )
          throw new InvalidCookieSignature(c);
      } else {
        let e8 = true;
        for (let r6 = 0; r6 < o.length; r6++) {
          let i3 = await unsignCookie(l, o[r6]);
          if (false !== i3) {
            (l = i3), (e8 = false);
            break;
          }
        }
        if (e8) throw new InvalidCookieSignature(c);
      }
    }
    if (void 0 === l) continue;
    let m2 = l.charCodeAt(0);
    if (123 === m2 || 91 === m2)
      try {
        let e8 = new Cookie(JSON.parse(l));
        (e8.setter = i2), (e8.name = c), (a4[c] = e8);
        continue;
      } catch {}
    Number.isNaN(+l)
      ? 'true' === l
        ? (l = true)
        : 'false' === l && (l = false)
      : (l = +l);
    let g2 = new Cookie(l, n3);
    (g2.setter = i2), (g2.name = c), (a4[c] = g2);
  }
  return createCookieJar(a4, i2);
};

// ../node_modules/elysia/dist/handler.js
var r4 = 'toJSON' in new Headers();
var isNotEmpty = (e8) => {
  for (let s3 in e8) return true;
  return false;
};
var parseSetCookies = (e8, s3) => {
  if (!e8 || !Array.isArray(s3)) return e8;
  e8.delete('Set-Cookie');
  for (let t4 = 0; t4 < s3.length; t4++) {
    let r6 = s3[t4].indexOf('=');
    e8.append('Set-Cookie', `${s3[t4].slice(0, r6)}=${s3[t4].slice(r6 + 1)}`);
  }
  return e8;
};
var cookieToHeader = (s3) => {
  if (!s3 || 'object' != typeof s3 || !isNotEmpty(s3)) return;
  let t4 = [];
  for (let [r6, n3] of Object.entries(s3))
    if (r6 && n3) {
      if (Array.isArray(n3.value))
        for (let s4 = 0; s4 < n3.value.length; s4++) {
          let o = n3.value[s4];
          null != o &&
            ('object' == typeof o && (o = JSON.stringify(o)),
            t4.push((0, import_cookie2.serialize)(r6, o, n3)));
        }
      else {
        let s4 = n3.value;
        if (null == s4) continue;
        'object' == typeof s4 && (s4 = JSON.stringify(s4)),
          t4.push((0, import_cookie2.serialize)(r6, n3.value, n3));
      }
    }
  if (0 !== t4.length) return 1 === t4.length ? t4[0] : t4;
};
var mapResponse = (e8, n3) => {
  if (
    // @ts-ignore
    (e8?.$passthrough && // @ts-ignore
      (e8 = e8[e8.$passthrough]),
    isNotEmpty(n3.headers) || 200 !== n3.status || n3.redirect || n3.cookie)
  )
    switch (
      ('string' == typeof n3.status && (n3.status = StatusMap[n3.status]),
      n3.redirect &&
        ((n3.headers.Location = n3.redirect),
        (!n3.status || n3.status < 300 || n3.status >= 400) &&
          (n3.status = 302)),
      n3.cookie &&
        isNotEmpty(n3.cookie) &&
        (n3.headers['Set-Cookie'] = cookieToHeader(n3.cookie)),
      n3.headers['Set-Cookie'] &&
        Array.isArray(n3.headers['Set-Cookie']) &&
        (n3.headers = parseSetCookies(
          new Headers(n3.headers),
          n3.headers['Set-Cookie'],
        )),
      e8?.constructor?.name)
    ) {
      case 'String':
      case 'Blob':
        return new Response(e8, { status: n3.status, headers: n3.headers });
      case 'Object':
      case 'Array':
        return Response.json(e8, n3);
      case void 0:
        if (!e8) return new Response('', n3);
        return Response.json(e8, n3);
      case 'Response':
        let o = { ...n3.headers };
        if (r4) n3.headers = e8.headers.toJSON();
        else
          for (let [s3, t4] of e8.headers.entries())
            s3 in n3.headers && (n3.headers[s3] = t4);
        for (let s3 in o) e8.headers.append(s3, o[s3]);
        return e8;
      case 'Error':
        return errorToResponse(e8, n3);
      case 'Promise':
        return e8.then((e9) => mapResponse(e9, n3));
      case 'Function':
        return mapResponse(e8(), n3);
      case 'Number':
      case 'Boolean':
        return new Response(e8.toString(), n3);
      case 'Cookie':
        if (e8 instanceof Cookie) return new Response(e8.value, n3);
        return new Response(e8?.toString(), n3);
      default:
        let a4 = JSON.stringify(e8);
        if (123 === a4.charCodeAt(0))
          return (
            n3.headers['Content-Type'] ||
              (n3.headers['Content-Type'] = 'application/json'),
            new Response(JSON.stringify(e8), n3)
          );
        return new Response(a4, n3);
    }
  else
    switch (e8?.constructor?.name) {
      case 'String':
      case 'Blob':
        return new Response(e8);
      case 'Object':
      case 'Array':
        return new Response(JSON.stringify(e8), {
          headers: { 'content-type': 'application/json' },
        });
      case void 0:
        if (!e8) return new Response('');
        return new Response(JSON.stringify(e8), {
          headers: { 'content-type': 'application/json' },
        });
      case 'Response':
        return e8;
      case 'Error':
        return errorToResponse(e8, n3);
      case 'Promise':
        return e8.then((e9) => {
          let s3 = mapCompactResponse(e9);
          return void 0 !== s3 ? s3 : new Response('');
        });
      case 'Function':
        return mapCompactResponse(e8());
      case 'Number':
      case 'Boolean':
        return new Response(e8.toString());
      case 'Cookie':
        if (e8 instanceof Cookie) return new Response(e8.value, n3);
        return new Response(e8?.toString(), n3);
      default:
        let i2 = JSON.stringify(e8);
        if (123 === i2.charCodeAt(0))
          return new Response(JSON.stringify(e8), {
            headers: { 'Content-Type': 'application/json' },
          });
        return new Response(i2);
    }
};
var mapEarlyResponse = (e8, n3) => {
  if (null != e8) {
    if (
      // @ts-ignore
      (e8?.$passthrough && // @ts-ignore
        (e8 = e8[e8.$passthrough]),
      isNotEmpty(n3.headers) || 200 !== n3.status || n3.redirect || n3.cookie)
    )
      switch (
        ('string' == typeof n3.status && (n3.status = StatusMap[n3.status]),
        n3.redirect &&
          ((n3.headers.Location = n3.redirect),
          (!n3.status || n3.status < 300 || n3.status >= 400) &&
            (n3.status = 302)),
        n3.cookie &&
          isNotEmpty(n3.cookie) &&
          (n3.headers['Set-Cookie'] = cookieToHeader(n3.cookie)),
        n3.headers['Set-Cookie'] &&
          Array.isArray(n3.headers['Set-Cookie']) &&
          (n3.headers = parseSetCookies(
            new Headers(n3.headers),
            n3.headers['Set-Cookie'],
          )),
        e8?.constructor?.name)
      ) {
        case 'String':
        case 'Blob':
          return new Response(e8, n3);
        case 'Object':
        case 'Array':
          return Response.json(e8, n3);
        case 'ReadableStream':
          return (
            n3.headers['content-type']?.startsWith('text/event-stream') ||
              (n3.headers['content-type'] = 'text/event-stream; charset=utf-8'),
            new Response(e8, n3)
          );
        case void 0:
          if (!e8) return;
          return Response.json(e8, n3);
        case 'Response':
          let o = Object.assign({}, n3.headers);
          if (r4) n3.headers = e8.headers.toJSON();
          else
            for (let [s3, t4] of e8.headers.entries())
              s3 in n3.headers || (n3.headers[s3] = t4);
          for (let s3 in o) e8.headers.append(s3, o[s3]);
          return e8.status !== n3.status && (n3.status = e8.status), e8;
        case 'Promise':
          return e8.then((e9) => {
            let s3 = mapEarlyResponse(e9, n3);
            if (void 0 !== s3) return s3;
          });
        case 'Error':
          return errorToResponse(e8, n3);
        case 'Function':
          return mapEarlyResponse(e8(), n3);
        case 'Number':
        case 'Boolean':
          return new Response(e8.toString(), n3);
        case 'Cookie':
          if (e8 instanceof Cookie) return new Response(e8.value, n3);
          return new Response(e8?.toString(), n3);
        default:
          let a4 = JSON.stringify(e8);
          if (123 === a4.charCodeAt(0))
            return (
              n3.headers['Content-Type'] ||
                (n3.headers['Content-Type'] = 'application/json'),
              new Response(JSON.stringify(e8), n3)
            );
          return new Response(a4, n3);
      }
    else
      switch (e8?.constructor?.name) {
        case 'String':
        case 'Blob':
          return new Response(e8);
        case 'Object':
        case 'Array':
          return new Response(JSON.stringify(e8), {
            headers: { 'content-type': 'application/json' },
          });
        case 'ReadableStream':
          return new Response(e8, {
            headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
          });
        case void 0:
          if (!e8) return new Response('');
          return new Response(JSON.stringify(e8), {
            headers: { 'content-type': 'application/json' },
          });
        case 'Response':
          return e8;
        case 'Promise':
          return e8.then((e9) => {
            let s3 = mapEarlyResponse(e9, n3);
            if (void 0 !== s3) return s3;
          });
        case 'Error':
          return errorToResponse(e8, n3);
        case 'Function':
          return mapCompactResponse(e8());
        case 'Number':
        case 'Boolean':
          return new Response(e8.toString());
        case 'Cookie':
          if (e8 instanceof Cookie) return new Response(e8.value, n3);
          return new Response(e8?.toString(), n3);
        default:
          let i2 = JSON.stringify(e8);
          if (123 === i2.charCodeAt(0))
            return new Response(JSON.stringify(e8), {
              headers: { 'Content-Type': 'application/json' },
            });
          return new Response(i2);
      }
  }
};
var mapCompactResponse = (e8) => {
  switch (
    // @ts-ignore
    (e8?.$passthrough && // @ts-ignore
      (e8 = e8[e8.$passthrough]),
    e8?.constructor?.name)
  ) {
    case 'String':
    case 'Blob':
      return new Response(e8);
    case 'Object':
    case 'Array':
      return new Response(JSON.stringify(e8), {
        headers: { 'content-type': 'application/json' },
      });
    case 'ReadableStream':
      return new Response(e8, {
        headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
      });
    case void 0:
      if (!e8) return new Response('');
      return new Response(JSON.stringify(e8), {
        headers: { 'content-type': 'application/json' },
      });
    case 'Response':
      return e8;
    case 'Error':
      return errorToResponse(e8);
    case 'Promise':
      return e8.then((e9) => {
        let s4 = mapCompactResponse(e9);
        return void 0 !== s4 ? s4 : new Response('');
      });
    case 'Function':
      return mapCompactResponse(e8());
    case 'Number':
    case 'Boolean':
      return new Response(e8.toString());
    default:
      let s3 = JSON.stringify(e8);
      if (123 === s3.charCodeAt(0))
        return new Response(JSON.stringify(e8), {
          headers: { 'Content-Type': 'application/json' },
        });
      return new Response(s3);
  }
};
var errorToResponse = (e8, s3) =>
  new Response(
    JSON.stringify({ name: e8?.name, message: e8?.message, cause: e8?.cause }),
    {
      status: s3?.status !== 200 ? s3?.status ?? 500 : 500,
      headers: s3?.headers,
    },
  );

// ../node_modules/elysia/dist/compose.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var import_fast_querystring = __toESM(require_lib());
var u = new Headers().toJSON;
var d = RegExp(' (\\w+) = context', 'g');
var p = { value: 0 };
var m = ({
  hasTrace: e8,
  hasTraceSet: t4 = false,
  addFn: r6,
  condition: s3 = {},
}) =>
  (r6(`
const reporter = getReporter()
`),
  e8)
    ? (e9, { name: n3, attribute: o = '', unit: a4 = 0 } = {}) => {
        let i2 = e9.indexOf('.'),
          c = -1 === i2;
        if (
          'request' !== e9 &&
          'response' !== e9 &&
          !s3[c ? e9 : e9.slice(0, i2)]
        )
          return () => {
            t4 && 'afterHandle' === e9 && r6('\nawait traceDone\n');
          };
        c ? (n3 ||= e9) : (n3 ||= 'anonymous'),
          r6(
            '\n' +
              `reporter.emit('event', { 
					id,
					event: '${e9}',
					type: 'begin',
					name: '${n3}',
					time: performance.now(),
					${c ? `unit: ${a4},` : ''}
					${o}
				})`.replace(/(\t| |\n)/g, '') +
              '\n',
          );
        let l = false;
        return () => {
          !l &&
            ((l = true),
            r6(
              '\n' +
                `reporter.emit('event', {
							id,
							event: '${e9}',
							type: 'end',
							time: performance.now()
						})`.replace(/(\t| |\n)/g, '') +
                '\n',
            ),
            t4 && 'afterHandle' === e9 && r6('\nawait traceDone\n'));
        };
      }
    : () => () => {};
var hasReturn = (e8) => {
  let t4 = e8.indexOf(')');
  return (
    // Is direct arrow function return eg. () => 1
    (61 === e8.charCodeAt(t4 + 2) && 123 !== e8.charCodeAt(t4 + 5)) ||
    e8.includes('return')
  );
};
var h = (e8, { injectResponse: t4 = '' } = {}) => ({
  composeValidation: (t5, r6 = `c.${t5}`) =>
    e8
      ? `c.set.status = 400; throw new ValidationError(
'${t5}',
${t5},
${r6}
)`
      : `c.set.status = 400; return new ValidationError(
	'${t5}',
	${t5},
	${r6}
).toResponse(c.set.headers)`,
  composeResponseValidation: (r6 = 'r') => {
    let s3 = e8
      ? `throw new ValidationError(
'response',
response[c.set.status],
${r6}
)`
      : `return new ValidationError(
'response',
response[c.set.status],
${r6}
).toResponse(c.set.headers)`;
    return `
${t4}
		if(response[c.set.status]?.Check(${r6}) === false) { 
	if(!(response instanceof Error))
		${s3}
}
`;
  },
});
var isFnUse = (e8, t4) => {
  (t4 = (t4 = t4.trimStart()).replaceAll(/^async /g, '')),
    /^(\w+)\(/g.test(t4) && (t4 = t4.slice(t4.indexOf('(')));
  let r6 =
    // CharCode 40 is '('
    40 === t4.charCodeAt(0) || t4.startsWith('function')
      ? t4.slice(t4.indexOf('(') + 1, t4.indexOf(')'))
      : t4.slice(0, t4.indexOf('=') - 1);
  if ('' === r6) return false;
  let s3 = 123 === r6.charCodeAt(0) ? r6.indexOf('...') : -1;
  if (123 === r6.charCodeAt(0)) {
    if (r6.includes(e8)) return true;
    if (-1 === s3) return false;
  }
  if (t4.match(RegExp(`${r6}(.${e8}|\\["${e8}"\\])`))) return true;
  let n3 = -1 !== s3 ? r6.slice(s3 + 3, r6.indexOf(' ', s3 + 3)) : void 0;
  if (t4.match(RegExp(`${n3}(.${e8}|\\["${e8}"\\])`))) return true;
  let o = [r6];
  for (let e9 of (n3 && o.push(n3), t4.matchAll(d))) o.push(e9[1]);
  let a4 = RegExp(`{.*?} = (${o.join('|')})`, 'g');
  for (let [r7] of t4.matchAll(a4))
    if (r7.includes(`{ ${e8}`) || r7.includes(`, ${e8}`)) return true;
  return false;
};
var y = (e8) => {
  (e8 = (e8 = e8.trimStart()).replaceAll(/^async /g, '')),
    /^(\w+)\(/g.test(e8) && (e8 = e8.slice(e8.indexOf('(')));
  let t4 =
    // CharCode 40 is '('
    40 === e8.charCodeAt(0) || e8.startsWith('function')
      ? e8.slice(e8.indexOf('(') + 1, e8.indexOf(')'))
      : e8.slice(0, e8.indexOf('=') - 1);
  if ('' === t4) return false;
  let r6 = 123 === t4.charCodeAt(0) ? t4.indexOf('...') : -1,
    s3 = -1 !== r6 ? t4.slice(r6 + 3, t4.indexOf(' ', r6 + 3)) : void 0,
    n3 = [t4];
  for (let t5 of (s3 && n3.push(s3), e8.matchAll(d))) n3.push(t5[1]);
  for (let t5 of n3)
    if (RegExp(`\\b\\w+\\([^)]*\\b${t5}\\b[^)]*\\)`).test(e8)) return true;
  let o = RegExp(`{.*?} = (${n3.join('|')})`, 'g');
  for (let [t5] of e8.matchAll(o))
    if (RegExp(`\\b\\w+\\([^)]*\\b${t5}\\b[^)]*\\)`).test(e8)) return true;
  return false;
};
var $ = Symbol.for('TypeBox.Kind');
var hasType = (e8, t4) => {
  if (t4) {
    if ($ in t4 && t4[$] === e8) return true;
    if ('object' === t4.type) {
      let r6 = t4.properties;
      for (let t5 of Object.keys(r6)) {
        let s3 = r6[t5];
        if ('object' === s3.type) {
          if (hasType(e8, s3)) return true;
        } else if (s3.anyOf) {
          for (let t6 = 0; t6 < s3.anyOf.length; t6++)
            if (hasType(e8, s3.anyOf[t6])) return true;
        }
        if ($ in s3 && s3[$] === e8) return true;
      }
      return false;
    }
    return t4.properties && $ in t4.properties && t4.properties[$] === e8;
  }
};
var g = Symbol.for('TypeBox.Transform');
var hasTransform = (e8) => {
  if (e8) {
    if ('object' === e8.type && e8.properties) {
      let t4 = e8.properties;
      for (let e9 of Object.keys(t4)) {
        let r6 = t4[e9];
        if ('object' === r6.type) {
          if (hasTransform(r6)) return true;
        } else if (r6.anyOf) {
          for (let e10 = 0; e10 < r6.anyOf.length; e10++)
            if (hasTransform(r6.anyOf[e10])) return true;
        }
        let s3 = g in r6;
        if (s3) return true;
      }
      return false;
    }
    return g in e8 || (e8.properties && g in e8.properties);
  }
};
var b = (e8) => {
  if (!e8) return;
  let t4 = e8?.schema;
  if (t4 && 'anyOf' in t4) {
    let e9 = false,
      r6 = t4.anyOf[0].type;
    for (let s3 of t4.anyOf)
      if (s3.type !== r6) {
        e9 = true;
        break;
      }
    if (!e9) return r6;
  }
  return e8.schema?.type;
};
var k = /(?:return|=>) \S*\(/g;
var isAsync = (e8) =>
  'AsyncFunction' === e8.constructor.name || e8.toString().match(k);
var composeHandler = ({
  path: d2,
  method: $2,
  hooks: g2,
  validator: k2,
  handler: w,
  handleError: R,
  definitions: x2,
  schema: q,
  onRequest: H,
  config: E,
  getReporter: v,
}) => {
  let O =
      E.forceErrorEncapsulation ||
      g2.error.length > 0 ||
      'undefined' == typeof Bun ||
      g2.onResponse.length > 0 ||
      !!g2.trace.length,
    A = g2.onResponse.length
      ? `
;(async () => {${g2.onResponse
          .map((e8, t4) => `await res${t4}(c)`)
          .join(';')}})();
`
      : '',
    C = g2.trace.map((e8) => e8.toString()),
    F = false;
  if ((y(w.toString()) && (F = true), !F)) {
    for (let [e8, t4] of Object.entries(g2))
      if (
        Array.isArray(t4) &&
        t4.length &&
        [
          'parse',
          'transform',
          'beforeHandle',
          'afterHandle',
          'onResponse',
        ].includes(e8)
      ) {
        for (let e9 of t4)
          if ('function' == typeof e9 && y(e9.toString())) {
            F = true;
            break;
          }
        if (F) break;
      }
  }
  let j = {
      parse: C.some((e8) => isFnUse('parse', e8)),
      transform: C.some((e8) => isFnUse('transform', e8)),
      handle: C.some((e8) => isFnUse('handle', e8)),
      beforeHandle: C.some((e8) => isFnUse('beforeHandle', e8)),
      afterHandle: C.some((e8) => isFnUse('afterHandle', e8)),
      error: O || C.some((e8) => isFnUse('error', e8)),
    },
    T = g2.trace.length > 0,
    S = '',
    U =
      k2 || ('GET' !== $2 && 'HEAD' !== $2)
        ? [w, ...g2.transform, ...g2.beforeHandle, ...g2.afterHandle].map(
            (e8) => e8.toString(),
          )
        : [],
    D =
      F ||
      ('GET' !== $2 &&
        'HEAD' !== $2 &&
        'none' !== g2.type &&
        (!!k2.body || !!g2.type || U.some((e8) => isFnUse('body', e8)))),
    V = F || k2.headers || U.some((e8) => isFnUse('headers', e8)),
    N = F || k2.cookie || U.some((e8) => isFnUse('cookie', e8)),
    _ = k2?.cookie?.schema,
    I = '';
  if (_?.sign) {
    if (!_.secrets)
      throw Error(
        `t.Cookie required secret which is not set in (${$2}) ${d2}.`,
      );
    let e8 = _.secrets
      ? 'string' == typeof _.secrets
        ? _.secrets
        : _.secrets[0]
      : void 0;
    if (
      ((I += `const _setCookie = c.set.cookie
		if(_setCookie) {`),
      true === _.sign)
    )
      I += `for(const [key, cookie] of Object.entries(_setCookie)) {
				c.set.cookie[key].value = await signCookie(cookie.value, '${e8}')
			}`;
    else
      for (let t4 of _.sign)
        I += `if(_setCookie['${t4}']?.value) { c.set.cookie['${t4}'].value = await signCookie(_setCookie['${t4}'].value, '${e8}') }
`;
    I += '}\n';
  }
  let { composeValidation: B, composeResponseValidation: W } = h(O);
  if (
    (V && // This function is Bun specific
      // @ts-ignore
      (S += u
        ? `c.headers = c.request.headers.toJSON()
`
        : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`),
    N)
  ) {
    let e8 = (e9, t5) => {
        let r6 = _?.[e9] ?? t5;
        return r6
          ? 'string' == typeof r6
            ? `${e9}: '${r6}',`
            : r6 instanceof Date
            ? `${e9}: new Date(${r6.getTime()}),`
            : `${e9}: ${r6},`
          : 'string' == typeof t5
          ? `${e9}: "${t5}",`
          : `${e9}: ${t5},`;
      },
      t4 = _
        ? `{
			secret: ${
        void 0 !== _.secrets
          ? 'string' == typeof _.secrets
            ? `'${_.secrets}'`
            : '[' + _.secrets.reduce((e9, t5) => e9 + `'${t5}',`, '') + ']'
          : 'undefined'
      },
			sign: ${
        true === _.sign ||
        (void 0 !== _.sign
          ? '[' + _.sign.reduce((e9, t5) => e9 + `'${t5}',`, '') + ']'
          : 'undefined')
      },
			${e8('domain')}
			${e8('expires')}
			${e8('httpOnly')}
			${e8('maxAge')}
			${e8('path', '/')}
			${e8('priority')}
			${e8('sameSite')}
			${e8('secure')}
		}`
        : 'undefined';
    V
      ? (S += `
c.cookie = await parseCookie(c.set, c.headers.cookie, ${t4})
`)
      : (S += `
c.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${t4})
`);
  }
  let G = F || k2.query || U.some((e8) => isFnUse('query', e8));
  G &&
    (S += `const url = c.request.url

		if(c.qi !== -1) {
			c.query ??= parseQuery(url.substring(c.qi + 1))
		} else {
			c.query ??= {}
		}
		`);
  let L = g2.trace.map((e8) => e8.toString()),
    P = L.some((e8) => isFnUse('set', e8) || y(e8));
  F || g2.trace.some((e8) => isFnUse('set', e8.toString()));
  let Q =
    P ||
    N ||
    U.some((e8) => isFnUse('set', e8)) ||
    H.some((e8) => isFnUse('set', e8.toString()));
  T && (S += '\nconst id = c.$$requestId\n');
  let K = m({
    hasTrace: T,
    hasTraceSet: P,
    condition: j,
    addFn: (e8) => {
      S += e8;
    },
  });
  (S += O ? 'try {\n' : ''),
    T &&
      (S +=
        '\nconst traceDone = new Promise(r => { reporter.once(`res${id}`, r) })\n');
  let J =
      N ||
      D ||
      P ||
      isAsync(w) ||
      g2.parse.length > 0 ||
      g2.afterHandle.some(isAsync) ||
      g2.beforeHandle.some(isAsync) ||
      g2.transform.some(isAsync),
    z = K('parse', { unit: g2.parse.length });
  if (D) {
    let e8 = b(k2?.body);
    if (g2.type && !Array.isArray(g2.type)) {
      if (g2.type)
        switch (g2.type) {
          case 'json':
          case 'application/json':
            S += `c.body = await c.request.json()
`;
            break;
          case 'text':
          case 'text/plain':
            S += `c.body = await c.request.text()
`;
            break;
          case 'urlencoded':
          case 'application/x-www-form-urlencoded':
            S += `c.body = parseQuery(await c.request.text())
`;
            break;
          case 'arrayBuffer':
          case 'application/octet-stream':
            S += `c.body = await c.request.arrayBuffer()
`;
            break;
          case 'formdata':
          case 'multipart/form-data':
            S += `c.body = {}

						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}
`;
        }
      g2.parse.length && (S += '}}');
    } else {
      let t4 = (() => {
        if (g2.parse.length && e8 && !Array.isArray(g2.type)) {
          let t5 = k2?.body?.schema;
          if ('object' === e8 && (hasType('File', t5) || hasType('Files', t5)))
            return `c.body = {}
		
								const form = await c.request.formData()
								for (const key of form.keys()) {
									if (c.body[key])
										continue
			
									const value = form.getAll(key)
									if (value.length === 1)
										c.body[key] = value[0]
									else c.body[key] = value
								}`;
        }
      })();
      if (t4) S += t4;
      else {
        if (
          ((S +=
            '\n' +
            (V
              ? "let contentType = c.headers['content-type']"
              : "let contentType = c.request.headers.get('content-type')") +
            `
				if (contentType) {
					const index = contentType.indexOf(';')
					if (index !== -1) contentType = contentType.substring(0, index)
`),
          g2.parse.length)
        ) {
          S += `let used = false
`;
          let e9 = K('parse', { unit: g2.parse.length });
          for (let e10 = 0; e10 < g2.parse.length; e10++) {
            let t5 = K('parse.unit', { name: g2.parse[e10].name }),
              r6 = `bo${e10}`;
            0 !== e10 &&
              (S += `if(!used) {
`),
              (S += `let ${r6} = parse[${e10}](c, contentType)
if(${r6} instanceof Promise) ${r6} = await ${r6}
if(${r6} !== undefined) { c.body = ${r6}; used = true }
`),
              t5(),
              0 !== e10 && (S += '}');
          }
          e9();
        }
        g2.parse.length && (S += 'if (!used)'),
          (S += `
				switch (contentType) {
					case 'application/json':
						c.body = await c.request.json()
						break
				
					case 'text/plain':
						c.body = await c.request.text()
						break
				
					case 'application/x-www-form-urlencoded':
						c.body = parseQuery(await c.request.text())
						break
				
					case 'application/octet-stream':
						c.body = await c.request.arrayBuffer();
						break
				
					case 'multipart/form-data':
						c.body = {}
				
						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue
				
							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}
				
						break
					}
}
`);
      }
    }
    S += '\n';
  }
  if ((z(), g2?.transform)) {
    let e8 = K('transform', { unit: g2.transform.length });
    for (let e9 = 0; e9 < g2.transform.length; e9++) {
      let t4 = g2.transform[e9],
        r6 = K('transform.unit', { name: t4.name });
      'derive' === t4.$elysia
        ? (S += isAsync(g2.transform[e9])
            ? `Object.assign(c, await transform[${e9}](c));`
            : `Object.assign(c, transform[${e9}](c));`)
        : (S += isAsync(g2.transform[e9])
            ? `await transform[${e9}](c);`
            : `transform[${e9}](c);`),
        r6();
    }
    e8();
  }
  if (
    (k2 &&
      ((S += '\n'),
      k2.headers &&
        ((S += `if(headers.Check(c.headers) === false) {
				${B('headers')}
			}`),
        hasTransform(k2.headers.schema) &&
          (S += `
c.headers = headers.Decode(c.headers)
`)),
      k2.params &&
        ((S += `if(params.Check(c.params) === false) {
				${B('params')}
			}`),
        hasTransform(k2.params.schema) &&
          (S += `
c.params = params.Decode(c.params)
`)),
      k2.query &&
        ((S += `if(query.Check(c.query) === false) {
				${B('query')} 
			}`),
        hasTransform(k2.query.schema) && // Decode doesn't work with Object.create(null)
          (S += `
c.query = query.Decode(Object.assign({}, c.query))
`)),
      k2.body &&
        ((S += `if(body.Check(c.body) === false) { 
				${B('body')}
			}`),
        hasTransform(k2.body.schema) &&
          (S += `
c.body = body.Decode(c.body)
`)),
      isNotEmpty(k2.cookie?.schema.properties ?? {}) &&
        ((S += `const cookieValue = {}
			for(const [key, value] of Object.entries(c.cookie))
				cookieValue[key] = value.value

			if(cookie.Check(cookieValue) === false) {
				${B('cookie', 'cookieValue')}
			}`),
        hasTransform(k2.cookie.schema) &&
          (S += `
c.cookie = params.Decode(c.cookie)
`))),
    g2?.beforeHandle)
  ) {
    let e8 = K('beforeHandle', { unit: g2.beforeHandle.length });
    for (let e9 = 0; e9 < g2.beforeHandle.length; e9++) {
      let t4 = K('beforeHandle.unit', { name: g2.beforeHandle[e9].name }),
        r6 = `be${e9}`,
        s3 = hasReturn(g2.beforeHandle[e9].toString());
      if (s3) {
        (S += isAsync(g2.beforeHandle[e9])
          ? `let ${r6} = await beforeHandle[${e9}](c);
`
          : `let ${r6} = beforeHandle[${e9}](c);
`),
          t4(),
          (S += `if(${r6} !== undefined) {
`);
        let s4 = K('afterHandle', { unit: g2.transform.length });
        if (g2.afterHandle)
          for (let e10 = 0; e10 < g2.afterHandle.length; e10++) {
            let t5 = hasReturn(g2.afterHandle[e10].toString()),
              s5 = K('afterHandle.unit', { name: g2.afterHandle[e10].name });
            if (
              ((S += `c.response = ${r6}
`),
              t5)
            ) {
              let t6 = `af${e10}`;
              S +=
                (isAsync(g2.afterHandle[e10])
                  ? `const ${t6} = await afterHandle[${e10}](c);
`
                  : `const ${t6} = afterHandle[${e10}](c);
`) +
                `if(${t6} !== undefined) { c.response = ${r6} = ${t6} }
`;
            } else
              S += isAsync(g2.afterHandle[e10])
                ? `await afterHandle[${e10}](c, ${r6});
`
                : `afterHandle[${e10}](c, ${r6});
`;
            s5();
          }
        s4(),
          k2.response && (S += W(r6)),
          (S +=
            I +
            `return mapEarlyResponse(${r6}, c.set)}
`);
      } else
        (S += isAsync(g2.beforeHandle[e9])
          ? `await beforeHandle[${e9}](c);
`
          : `beforeHandle[${e9}](c);
`),
          t4();
    }
    e8();
  }
  if (g2?.afterHandle.length) {
    let e8 = K('handle', { name: w.name });
    g2.afterHandle.length
      ? (S += isAsync(w)
          ? `let r = c.response = await handler(c);
`
          : `let r = c.response = handler(c);
`)
      : (S += isAsync(w)
          ? `let r = await handler(c);
`
          : `let r = handler(c);
`),
      e8();
    let t4 = K('afterHandle', { unit: g2.afterHandle.length });
    for (let e9 = 0; e9 < g2.afterHandle.length; e9++) {
      let r6 = `af${e9}`,
        s3 = hasReturn(g2.afterHandle[e9].toString()),
        n3 = K('afterHandle.unit', { name: g2.afterHandle[e9].name });
      s3
        ? (k2.response
            ? (S += isAsync(g2.afterHandle[e9])
                ? `let ${r6} = await afterHandle[${e9}](c)
`
                : `let ${r6} = afterHandle[${e9}](c)
`)
            : (S += isAsync(g2.afterHandle[e9])
                ? `let ${r6} = mapEarlyResponse(await afterHandle[${e9}](c), c.set)
`
                : `let ${r6} = mapEarlyResponse(afterHandle[${e9}](c), c.set)
`),
          n3(),
          k2.response
            ? ((S +=
                `if(${r6} !== undefined) {` +
                W(r6) +
                `${r6} = mapEarlyResponse(${r6}, c.set)
if(${r6}) {`),
              t4(),
              P &&
                (S += `${r6} = mapEarlyResponse(${r6}, c.set)
`),
              (S += `return ${r6} } }`))
            : ((S += `if(${r6}) {`),
              t4(),
              P &&
                (S += `${r6} = mapEarlyResponse(${r6}, c.set)
`),
              (S += `return ${r6}}
`)))
        : ((S += isAsync(g2.afterHandle[e9])
            ? `await afterHandle[${e9}](c)
`
            : `afterHandle[${e9}](c)
`),
          n3());
    }
    t4(),
      (S += `r = c.response
`),
      k2.response && (S += W()),
      (S += I),
      Q
        ? (S += `return mapResponse(r, c.set)
`)
        : (S += `return mapCompactResponse(r)
`);
  } else {
    let e8 = K('handle', { name: w.name });
    if (k2.response)
      (S += isAsync(w)
        ? `const r = await handler(c);
`
        : `const r = handler(c);
`),
        e8(),
        (S += W()),
        K('afterHandle')(),
        (S += I),
        Q
          ? (S += `return mapResponse(r, c.set)
`)
          : (S += `return mapCompactResponse(r)
`);
    else if (j.handle || N)
      (S += isAsync(w)
        ? `let r = await handler(c);
`
        : `let r = handler(c);
`),
        e8(),
        K('afterHandle')(),
        (S += I),
        Q
          ? (S += `return mapResponse(r, c.set)
`)
          : (S += `return mapCompactResponse(r)
`);
    else {
      e8();
      let t4 = isAsync(w) ? 'await handler(c) ' : 'handler(c)';
      K('afterHandle')(),
        Q
          ? (S += `return mapResponse(${t4}, c.set)
`)
          : (S += `return mapCompactResponse(${t4})
`);
    }
  }
  if (O || A) {
    (S += `
} catch(error) {`),
      J || (S += 'return (async () => {'),
      (S += `const set = c.set

		if (!set.status || set.status < 300) set.status = 500
	`);
    let e8 = K('error', { unit: g2.error.length });
    if (g2.error.length)
      for (let e9 = 0; e9 < g2.error.length; e9++) {
        let t4 = `er${e9}`,
          r6 = K('error.unit', { name: g2.error[e9].name });
        (S += `
let ${t4} = handleErrors[${e9}](
					Object.assign(c, {
						error: error,
						code: error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
					})
				)
`),
          isAsync(g2.error[e9]) &&
            (S += `if (${t4} instanceof Promise) ${t4} = await ${t4}
`),
          r6(),
          (S += `${t4} = mapEarlyResponse(${t4}, set)
if (${t4}) {return ${t4} }
`);
      }
    if (
      (e8(),
      (S += `return handleError(c, error)

`),
      J || (S += '})()'),
      (S += '}'),
      A || T)
    ) {
      S += ' finally { ';
      let e9 = K('response', { unit: g2.onResponse.length });
      (S += A), e9(), (S += '}');
    }
  }
  S = `const { 
		handler,
		handleError,
		hooks: {
			transform,
			beforeHandle,
			afterHandle,
			parse,
			error: handleErrors,
			onResponse
		},
		validator: {
			body,
			headers,
			params,
			query,
			response,
			cookie
		},
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError
		},
		schema,
		definitions,
		ERROR_CODE,
		getReporter,
		requestId,
		parseCookie,
		signCookie
	} = hooks

	${
    g2.onResponse.length
      ? `const ${g2.onResponse
          .map((e8, t4) => `res${t4} = onResponse[${t4}]`)
          .join(',')}`
      : ''
  }

	return ${J ? 'async' : ''} function(c) {
		${q && x2 ? 'c.schema = schema; c.defs = definitions;' : ''}
		${S}
	}`;
  let M = Function('hooks', S);
  return M({
    handler: w,
    hooks: g2,
    validator: k2,
    handleError: R,
    utils: {
      mapResponse,
      mapCompactResponse,
      mapEarlyResponse,
      parseQuery: import_fast_querystring.parse,
    },
    error: { NotFoundError, ValidationError, InternalServerError },
    schema: q,
    definitions: x2,
    ERROR_CODE,
    getReporter: v,
    requestId: p,
    parseCookie,
    signCookie,
  });
};
var composeGeneralHandler = (e8) => {
  let t4 = '',
    s3 = '';
  for (let r6 of Object.keys(e8.decorators))
    t4 += `,${r6}: app.decorators.${r6}`;
  let { router: n3, staticRouter: o } = e8,
    i2 = e8.event.trace.length > 0,
    c = `
	const route = find(request.method, path) ${
    n3.root.ALL ? '?? find("ALL", path)' : ''
  }
	if (route === null)
		return ${
      e8.event.error.length
        ? 'app.handleError(ctx, notFound)'
        : `new Response(error404, {
					status: ctx.set.status === 200 ? 404 : ctx.set.status,
					headers: ctx.set.headers
				})`
    }

	ctx.params = route.params

	return route.store(ctx)`,
    l = '';
  for (let [e9, { code: t5, all: r6 }] of Object.entries(o.map))
    l += `case '${e9}':
switch(request.method) {
${t5}
${r6 ?? 'default: break map'}}

`;
  let f = e8.event.request.some(isAsync);
  s3 += `const {
		app,
		app: { store, router, staticRouter, wsRouter },
		mapEarlyResponse,
		NotFoundError,
		requestId,
		getReporter
	} = data

	const notFound = new NotFoundError()

	${e8.event.request.length ? 'const onRequest = app.event.request' : ''}

	${o.variables}

	const find = router.find.bind(router)
	const findWs = wsRouter.find.bind(wsRouter)
	const handleError = app.handleError.bind(this)

	${e8.event.error.length ? '' : 'const error404 = notFound.message.toString()'}

	return ${f ? 'async' : ''} function map(request) {
	`;
  let u2 = e8.event.trace.map((e9) => e9.toString()),
    d2 = m({
      hasTrace: i2,
      hasTraceSet: e8.event.trace.some((e9) => {
        let t5 = e9.toString();
        return isFnUse('set', t5) || y(t5);
      }),
      condition: { request: u2.some((e9) => isFnUse('request', e9) || y(e9)) },
      addFn: (e9) => {
        s3 += e9;
      },
    });
  if (e8.event.request.length) {
    s3 += `
			${i2 ? 'const id = +requestId.value++' : ''}

			const ctx = {
				request,
				store,
				set: {
					cookie: {},
					headers: {},
					status: 200
				}
				${i2 ? ',$$requestId: +id' : ''}
				${t4}
			}
		`;
    let r6 = d2('request', { attribute: 'ctx', unit: e8.event.request.length });
    s3 += `try {
`;
    for (let t5 = 0; t5 < e8.event.request.length; t5++) {
      let r7 = e8.event.request[t5],
        n4 = hasReturn(r7.toString()),
        o2 = isAsync(r7),
        a4 = d2('request.unit', { name: e8.event.request[t5].name }),
        i3 = `re${t5}`;
      n4
        ? ((s3 += `const ${i3} = mapEarlyResponse(
					${o2 ? 'await' : ''} onRequest[${t5}](ctx),
					ctx.set
				)
`),
          a4(),
          (s3 += `if(${i3}) return ${i3}
`))
        : ((s3 += `${o2 ? 'await' : ''} onRequest[${t5}](ctx)
`),
          a4());
    }
    (s3 += `} catch (error) {
			return app.handleError(ctx, error)
		}`),
      r6(),
      (s3 += `
		const url = request.url,
		s = url.indexOf('/', 11),
		i = ctx.qi = url.indexOf('?', s + 1),
		path = ctx.path = i === -1 ? url.substring(s) : url.substring(s, i);`);
  } else
    (s3 += `
		const url = request.url,
			s = url.indexOf('/', 11),
			qi = url.indexOf('?', s + 1),
			path = qi === -1
				? url.substring(s)
				: url.substring(s, qi)

		${i2 ? 'const id = +requestId.value++' : ''}

		const ctx = {
			request,
			store,
			qi,
			path,
			set: {
				headers: {},
				status: 200
			}
			${i2 ? ',$$requestId: id' : ''}
			${t4}
		}`),
      d2('request', {
        unit: e8.event.request.length,
        attribute:
          u2.some((e9) => isFnUse('context', e9)) ||
          u2.some((e9) => isFnUse('store', e9)) ||
          u2.some((e9) => isFnUse('set', e9))
            ? 'ctx'
            : '',
      })();
  let h2 = e8.wsPaths,
    $2 = e8.wsRouter;
  if (Object.keys(h2).length || $2.history.length) {
    for (let [e9, t5] of ((s3 += `
			if(request.method === 'GET') {
				switch(path) {`),
    Object.entries(h2)))
      s3 += `
					case '${e9}':
						if(request.headers.get('upgrade') === 'websocket')
							return st${t5}(ctx)
							
						break`;
    s3 += `
				default:
					if(request.headers.get('upgrade') === 'websocket') {
						const route = findWs('ws', path)

						if(route) {
							ctx.params = route.params

							return route.store(ctx)
						}
					}

					break
			}
		}
`;
  }
  return (
    (s3 += `
		map: switch(path) {
			${l}

			default:
				break
		}

		${c}
	}`), // @ts-ignore
    (e8.handleError = composeErrorHandler(e8)),
    Function(
      'data',
      s3,
    )({
      app: e8,
      mapEarlyResponse,
      NotFoundError,
      // @ts-ignore
      getReporter: () => e8.reporter,
      requestId: p,
    })
  );
};
var composeErrorHandler = (e8) => {
  let t4 = `const {
		app: { event: { error: onError, onResponse: res } },
		mapResponse,
		ERROR_CODE
	} = inject

	return ${e8.event.error.find(isAsync) ? 'async' : ''} function(context, error) {
		const { set } = context
		`;
  for (let r6 = 0; r6 < e8.event.error.length; r6++) {
    let s3 = e8.event.error[r6],
      n3 = `${isAsync(s3) ? 'await ' : ''}onError[${r6}](
			Object.assign(context, {
				code: error.code ?? error[ERROR_CODE] ?? 'UNKNOWN',
				error
			})
		)`;
    hasReturn(s3.toString())
      ? (t4 += `const r${r6} = ${n3}; if(r${r6} !== undefined) return mapResponse(r${r6}, set)
`)
      : (t4 += n3 + '\n');
  }
  return Function(
    'inject',
    (t4 += `if(error.constructor.name === "ValidationError") {
		set.status = error.status ?? 400
		return new Response(
			error.message, 
			{ headers: set.headers, status: set.status }
		)
	} else {
		return new Response(error.message, { headers: set.headers, status: error.status ?? 500 })
	}
}`),
  )({ app: e8, mapResponse, ERROR_CODE });
};

// ../node_modules/elysia/dist/dynamic-handle.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var import_fast_querystring2 = __toESM(require_lib());
var createDynamicHandler = (n3) => async (l) => {
  let f;
  let c = { cookie: {}, status: 200, headers: {} };
  n3.decorators
    ? // @ts-ignore
      (((f = n3.decorators).request = l), (f.set = c), (f.store = n3.store))
    : (f = { set: c, store: n3.store, request: l });
  let d2 = l.url,
    u2 = d2.indexOf('/', 11),
    h2 = d2.indexOf('?', u2 + 1),
    m2 = -1 === h2 ? d2.substring(u2) : d2.substring(u2, h2);
  try {
    let u3;
    for (let t4 = 0; t4 < n3.event.request.length; t4++) {
      let r6 = n3.event.request[t4],
        a4 = r6(f);
      if (
        (a4 instanceof Promise && (a4 = await a4),
        (a4 = mapEarlyResponse(a4, c)))
      )
        return a4;
    }
    let p2 =
      // @ts-ignore
      n3.dynamicRouter.find(l.method, m2) ?? // @ts-ignore
      n3.dynamicRouter.find('ALL', m2);
    if (!p2) throw new NotFoundError();
    let { handle: w, hooks: g2, validator: k2, content: y2 } = p2.store;
    if ('GET' !== l.method && 'HEAD' !== l.method) {
      if (y2)
        switch (y2) {
          case 'application/json':
            u3 = await l.json();
            break;
          case 'text/plain':
            u3 = await l.text();
            break;
          case 'application/x-www-form-urlencoded':
            u3 = (0, import_fast_querystring2.parse)(await l.text());
            break;
          case 'application/octet-stream':
            u3 = await l.arrayBuffer();
            break;
          case 'multipart/form-data':
            u3 = {};
            let e8 = await l.formData();
            for (let t4 of e8.keys()) {
              if (u3[t4]) continue;
              let r6 = e8.getAll(t4);
              1 === r6.length ? (u3[t4] = r6[0]) : (u3[t4] = r6);
            }
        }
      else {
        let e8 = l.headers.get('content-type');
        if (e8) {
          let t4 = e8.indexOf(';');
          -1 !== t4 && (e8 = e8.slice(0, t4));
          for (let t5 = 0; t5 < n3.event.parse.length; t5++) {
            let r6 = n3.event.parse[t5](f, e8);
            if ((r6 instanceof Promise && (r6 = await r6), r6)) {
              u3 = r6;
              break;
            }
          }
          if (void 0 === u3)
            switch (e8) {
              case 'application/json':
                u3 = await l.json();
                break;
              case 'text/plain':
                u3 = await l.text();
                break;
              case 'application/x-www-form-urlencoded':
                u3 = (0, import_fast_querystring2.parse)(await l.text());
                break;
              case 'application/octet-stream':
                u3 = await l.arrayBuffer();
                break;
              case 'multipart/form-data':
                u3 = {};
                let r6 = await l.formData();
                for (let e9 of r6.keys()) {
                  if (u3[e9]) continue;
                  let t5 = r6.getAll(e9);
                  1 === t5.length ? (u3[e9] = t5[0]) : (u3[e9] = t5);
                }
            }
        }
      }
    }
    for (let [e8, t4] of ((f.body = u3), // @ts-ignore
    (f.params = p2?.params || void 0),
    (f.query =
      -1 === h2
        ? {}
        : (0, import_fast_querystring2.parse)(d2.substring(h2 + 1))),
    (f.headers = {}),
    l.headers.entries()))
      f.headers[e8] = t4;
    let v = k2?.cookie?.schema;
    f.cookie = await parseCookie(
      f.set,
      f.headers.cookie,
      v
        ? {
            secret:
              void 0 !== v.secrets
                ? 'string' == typeof v.secrets
                  ? v.secrets
                  : v.secrets.join(',')
                : void 0,
            sign:
              true === v.sign ||
              (void 0 !== v.sign
                ? 'string' == typeof v.sign
                  ? v.sign
                  : v.sign.join(',')
                : void 0),
          }
        : void 0,
    );
    for (let e8 = 0; e8 < g2.transform.length; e8++) {
      let t4 = g2.transform[e8](f);
      'derive' === g2.transform[e8].$elysia
        ? t4 instanceof Promise
          ? Object.assign(f, await t4)
          : Object.assign(f, t4)
        : t4 instanceof Promise && (await t4);
    }
    if (k2) {
      if (k2.headers) {
        let e8 = {};
        for (let t4 in l.headers) e8[t4] = l.headers.get(t4);
        if (false === k2.headers.Check(e8))
          throw new ValidationError('header', k2.headers, e8);
      }
      if (k2.params?.Check(f.params) === false)
        throw new ValidationError('params', k2.params, f.params);
      if (k2.query?.Check(f.query) === false)
        throw new ValidationError('query', k2.query, f.query);
      if (k2.cookie) {
        let e8 = {};
        for (let [t4, r6] of Object.entries(f.cookie)) e8[t4] = r6.value;
        if (k2.cookie?.Check(e8) === false)
          throw new ValidationError('cookie', k2.cookie, e8);
      }
      if (k2.body?.Check(u3) === false)
        throw new ValidationError('body', k2.body, u3);
    }
    for (let t4 = 0; t4 < g2.beforeHandle.length; t4++) {
      let r6 = g2.beforeHandle[t4](f);
      if ((r6 instanceof Promise && (r6 = await r6), void 0 !== r6)) {
        f.response = r6;
        for (let e8 = 0; e8 < g2.afterHandle.length; e8++) {
          let t6 = g2.afterHandle[e8](f);
          t6 instanceof Promise && (t6 = await t6), t6 && (r6 = t6);
        }
        let t5 = mapEarlyResponse(r6, f.set);
        if (t5) return t5;
      }
    }
    let b2 = w(f);
    if ((b2 instanceof Promise && (b2 = await b2), g2.afterHandle.length)) {
      f.response = b2;
      for (let t4 = 0; t4 < g2.afterHandle.length; t4++) {
        let r6 = g2.afterHandle[t4](f);
        r6 instanceof Promise && (r6 = await r6);
        let s3 = mapEarlyResponse(r6, f.set);
        if (void 0 !== s3) {
          let e8 = k2?.response?.[b2.status];
          if (e8?.Check(s3) === false)
            throw new ValidationError('response', e8, s3);
          return s3;
        }
      }
    } else {
      let e8 = k2?.response?.[b2.status];
      if (e8?.Check(b2) === false)
        throw new ValidationError('response', e8, b2);
    }
    if (f.set.cookie && v?.sign) {
      let e8 = v.secrets
        ? 'string' == typeof v.secrets
          ? v.secrets
          : v.secrets[0]
        : void 0;
      if (true === v.sign)
        for (let [e9, t4] of Object.entries(f.set.cookie))
          f.set.cookie[e9].value = await signCookie(t4.value, '${secret}');
      else
        for (let t4 of v.sign)
          t4 in v.properties &&
            f.set.cookie[t4]?.value &&
            (f.set.cookie[t4].value = await signCookie(
              f.set.cookie[t4].value,
              e8,
            ));
    }
    return mapResponse(b2, f.set);
  } catch (e8) {
    return e8.status && (c.status = e8.status), n3.handleError(f, e8);
  } finally {
    for (let e8 of n3.event.onResponse) await e8(f);
  }
};
var createDynamicErrorHandler = (e8) => async (r6, a4) => {
  let s3 = Object.assign(r6, a4);
  s3.set = r6.set;
  for (let a5 = 0; a5 < e8.event.error.length; a5++) {
    let o = e8.event.error[a5](s3);
    if ((o instanceof Promise && (o = await o), null != o))
      return mapResponse(o, r6.set);
  }
  return new Response('string' == typeof a4.cause ? a4.cause : a4.message, {
    headers: r6.set.headers,
    status: a4.status ?? 500,
  });
};

// ../node_modules/elysia/dist/custom-types.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var import_system = __toESM(require_system2());
var import_typebox2 = __toESM(require_typebox());
try {
  import_system.TypeSystem.Format('email', (e8) =>
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
      e8,
    ),
  ),
    import_system.TypeSystem.Format('uuid', (e8) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        e8,
      ),
    ),
    import_system.TypeSystem.Format(
      'date',
      (e8) => !Number.isNaN(new Date(e8).getTime()),
    ),
    import_system.TypeSystem.Format(
      'date-time',
      (e8) => !Number.isNaN(new Date(e8).getTime()),
    );
} catch (e8) {}
var r5 = (e8) => {
  if ('string' == typeof e8)
    switch (e8.slice(-1)) {
      case 'k':
        return 1024 * +e8.slice(0, e8.length - 1);
      case 'm':
        return 1048576 * +e8.slice(0, e8.length - 1);
      default:
        return +e8;
    }
  return e8;
};
var n2 = (e8, t4) => {
  if (
    !(t4 instanceof Blob) ||
    (e8.minSize && t4.size < r5(e8.minSize)) ||
    (e8.maxSize && t4.size > r5(e8.maxSize))
  )
    return false;
  if (e8.extension) {
    if ('string' == typeof e8.extension) {
      if (!t4.type.startsWith(e8.extension)) return false;
    } else {
      for (let i2 = 0; i2 < e8.extension.length; i2++)
        if (t4.type.startsWith(e8.extension[i2])) return true;
      return false;
    }
  }
  return true;
};
var a3 = import_system.TypeSystem.Type('Files', (e8, t4) => {
  if (!Array.isArray(t4)) return n2(e8, t4);
  if (
    (e8.minItems && t4.length < e8.minItems) ||
    (e8.maxItems && t4.length > e8.maxItems)
  )
    return false;
  for (let i2 = 0; i2 < t4.length; i2++) if (!n2(e8, t4[i2])) return false;
  return true;
});
import_typebox2.FormatRegistry.Set('numeric', (e8) => !isNaN(+e8)),
  import_typebox2.FormatRegistry.Set('ObjectString', (e8) => {
    let t4 = e8.charCodeAt(0);
    if (
      ((9 === t4 || 10 === t4 || 32 === t4) &&
        (t4 = e8.trimStart().charCodeAt(0)),
      123 !== t4 && 91 !== t4)
    )
      return false;
    try {
      return JSON.parse(e8), true;
    } catch {
      return false;
    }
  });
var ElysiaType = {
  Numeric: (e8) =>
    import_typebox2.Type.Transform(
      import_typebox2.Type.Union([
        import_typebox2.Type.String({ format: 'numeric', default: 0 }),
        import_typebox2.Type.Number(e8),
      ]),
    )
      .Decode((e9) => {
        let t4 = +e9;
        return isNaN(t4) ? e9 : t4;
      })
      .Encode((e9) => e9),
  ObjectString: (e8, i2) =>
    import_typebox2.Type.Transform(
      import_typebox2.Type.Union([
        import_typebox2.Type.String({ format: 'ObjectString', default: '' }),
        import_typebox2.Type.Object(e8, i2),
      ]),
    )
      .Decode((e9) => {
        if ('string' == typeof e9)
          try {
            return JSON.parse(e9);
          } catch {}
        return e9;
      })
      .Encode((e9) => JSON.stringify(e9)),
  File: import_system.TypeSystem.Type('File', n2),
  Files: (e8 = {}) =>
    import_typebox2.Type.Transform(import_typebox2.Type.Union([a3(e8)]))
      .Decode((e9) => (Array.isArray(e9) ? e9 : [e9]))
      .Encode((e9) => e9),
  Nullable: (e8) =>
    import_typebox2.Type.Union([import_typebox2.Type.Null(), e8]),
  /**
   * Allow Optional, Nullable and Undefined
   */
  MaybeEmpty: (e8) =>
    import_typebox2.Type.Union([
      import_typebox2.Type.Null(),
      import_typebox2.Type.Undefined(),
      e8,
    ]),
  Cookie: (e8, i2) => import_typebox2.Type.Object(e8, i2),
};
(import_typebox2.Type.ObjectString = ElysiaType.ObjectString) /**
 * A Numeric string
 *
 * Will be parse to Number
 */,
  (import_typebox2.Type.Numeric = ElysiaType.Numeric),
  (import_typebox2.Type.File = (e8 = {}) =>
    ElysiaType.File({
      default: 'File',
      ...e8,
      extension: e8?.type,
      type: 'string',
      format: 'binary',
    })),
  (import_typebox2.Type.Files = (e8 = {}) =>
    ElysiaType.Files({
      ...e8,
      elysiaMeta: 'Files',
      default: 'Files',
      extension: e8?.type,
      type: 'array',
      items: { ...e8, default: 'Files', type: 'string', format: 'binary' },
    })),
  (import_typebox2.Type.Nullable = (e8) => ElysiaType.Nullable(e8)),
  (import_typebox2.Type.MaybeEmpty = ElysiaType.MaybeEmpty),
  (import_typebox2.Type.Cookie = ElysiaType.Cookie);

// ../node_modules/elysia/dist/index.js
var x = class {
  config;
  dependencies = {};
  store = {};
  decorators = {};
  definitions = { type: {}, error: {} };
  schema = {};
  event = {
    start: [],
    request: [],
    parse: [],
    transform: [],
    beforeHandle: [],
    afterHandle: [],
    onResponse: [],
    trace: [],
    error: [],
    stop: [],
  };
  reporter = new eventemitter3_default();
  server = null;
  getServer() {
    return this.server;
  }
  validator = null;
  router = new Memoirist();
  wsRouter = new Memoirist();
  routes = [];
  staticRouter = { handlers: [], variables: '', map: {}, all: '' };
  wsPaths = {};
  dynamicRouter = new Memoirist();
  lazyLoadModules = [];
  path = '';
  constructor(e8) {
    this.config = {
      forceErrorEncapsulation: false,
      prefix: '',
      aot: true,
      strictPath: false,
      scoped: false,
      cookie: {},
      ...e8,
      seed: e8?.seed === void 0 ? '' : e8?.seed,
    };
  }
  add(
    e8,
    t4,
    r6,
    s3,
    { allowMeta: i2 = false, skipPrefix: a4 = false } = {
      allowMeta: false,
      skipPrefix: false,
    },
  ) {
    for (let h2 of ('string' == typeof t4 && (t4 = [t4]), t4)) {
      if (
        ((h2 = '' === h2 ? h2 : 47 === h2.charCodeAt(0) ? h2 : `/${h2}`),
        this.config.prefix && !a4 && (h2 = this.config.prefix + h2),
        s3?.type)
      )
        switch (s3.type) {
          case 'text':
            s3.type = 'text/plain';
            break;
          case 'json':
            s3.type = 'application/json';
            break;
          case 'formdata':
            s3.type = 'multipart/form-data';
            break;
          case 'urlencoded':
            s3.type = 'application/x-www-form-urlencoded';
            break;
          case 'arrayBuffer':
            s3.type = 'application/octet-stream';
        }
      let t5 = this.definitions.type,
        l = getSchemaValidator(s3?.cookie ?? this.validator?.cookie, {
          dynamic: !this.config.aot,
          models: t5,
          additionalProperties: true,
        });
      isNotEmpty(this.config.cookie ?? {}) &&
        (l
          ? // @ts-ignore
            (l.schema = mergeCookie(
              // @ts-ignore
              l.schema,
              this.config.cookie ?? {},
            ))
          : (l = getSchemaValidator(
              // @ts-ignore
              import_typebox2.Type.Cookie({}, this.config.cookie),
              {
                dynamic: !this.config.aot,
                models: t5,
                additionalProperties: true,
              },
            )));
      let p2 = {
          body: getSchemaValidator(s3?.body ?? this.validator?.body, {
            dynamic: !this.config.aot,
            models: t5,
          }),
          headers: getSchemaValidator(s3?.headers ?? this.validator?.headers, {
            dynamic: !this.config.aot,
            models: t5,
            additionalProperties: true,
          }),
          params: getSchemaValidator(s3?.params ?? this.validator?.params, {
            dynamic: !this.config.aot,
            models: t5,
          }),
          query: getSchemaValidator(s3?.query ?? this.validator?.query, {
            dynamic: !this.config.aot,
            models: t5,
          }),
          cookie: l,
          response: getResponseSchemaValidator(
            s3?.response ?? this.validator?.response,
            { dynamic: !this.config.aot, models: t5 },
          ),
        },
        m2 = mergeHook(this.event, s3),
        v = h2.endsWith('/') ? h2.slice(0, h2.length - 1) : h2 + '/';
      if (false === this.config.aot) {
        this.dynamicRouter.add(e8, h2, {
          validator: p2,
          hooks: m2,
          content: s3?.type,
          handle: r6,
        }),
          false === this.config.strictPath &&
            this.dynamicRouter.add(e8, v, {
              validator: p2,
              hooks: m2,
              content: s3?.type,
              handle: r6,
            }),
          this.routes.push({
            method: e8,
            path: h2,
            composed: null,
            handler: r6,
            hooks: m2,
          });
        return;
      }
      let y2 = composeHandler({
          path: h2,
          method: e8,
          hooks: m2,
          validator: p2,
          handler: r6,
          handleError: this.handleError,
          onRequest: this.event.request,
          config: this.config,
          definitions: i2 ? this.definitions.type : void 0,
          schema: i2 ? this.schema : void 0,
          getReporter: () => this.reporter,
        }),
        g2 = this.routes.findIndex((t6) => t6.path === h2 && t6.method === e8);
      if (
        (-1 !== g2 && // remove route previously defined
          this.routes.splice(g2, 1),
        this.routes.push({
          method: e8,
          path: h2,
          composed: y2,
          handler: r6,
          hooks: m2,
        }),
        '$INTERNALWS' === e8)
      ) {
        let e9 = this.config.strictPath
          ? void 0
          : h2.endsWith('/')
          ? h2.slice(0, h2.length - 1)
          : h2 + '/';
        if (-1 === h2.indexOf(':') && -1 === h2.indexOf('*')) {
          let t6 = this.staticRouter.handlers.length;
          this.staticRouter.handlers.push(y2),
            (this.staticRouter.variables += `const st${t6} = staticRouter.handlers[${t6}]
`),
            (this.wsPaths[h2] = t6),
            e9 && (this.wsPaths[e9] = t6);
        } else
          this.wsRouter.add('ws', h2, y2),
            e9 && this.wsRouter.add('ws', e9, y2);
        return;
      }
      if (-1 === h2.indexOf(':') && -1 === h2.indexOf('*')) {
        let t6 = this.staticRouter.handlers.length;
        this.staticRouter.handlers.push(y2),
          (this.staticRouter.variables += `const st${t6} = staticRouter.handlers[${t6}]
`),
          this.staticRouter.map[h2] ||
            (this.staticRouter.map[h2] = { code: '' }),
          'ALL' === e8
            ? (this.staticRouter.map[h2].all = `default: return st${t6}(ctx)
`)
            : (this.staticRouter.map[
                h2
              ].code = `case '${e8}': return st${t6}(ctx)
${this.staticRouter.map[h2].code}`),
          this.config.strictPath ||
            (this.staticRouter.map[v] ||
              (this.staticRouter.map[v] = { code: '' }),
            'ALL' === e8
              ? (this.staticRouter.map[v].all = `default: return st${t6}(ctx)
`)
              : (this.staticRouter.map[
                  v
                ].code = `case '${e8}': return st${t6}(ctx)
${this.staticRouter.map[v].code}`));
      } else
        this.router.add(e8, h2, y2),
          this.config.strictPath ||
            this.router.add(
              e8,
              h2.endsWith('/') ? h2.slice(0, h2.length - 1) : h2 + '/',
              y2,
            );
    }
  }
  /**
   * ### start | Life cycle event
   * Called after server is ready for serving
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onStart(({ url, port }) => {
   *         console.log("Running at ${url}:${port}")
   *     })
   *     .listen(8080)
   * ```
   */
  onStart(e8) {
    return this.on('start', e8), this;
  }
  /**
   * ### request | Life cycle event
   * Called on every new request is accepted
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onRequest(({ method, url }) => {
   *         saveToAnalytic({ method, url })
   *     })
   * ```
   */
  onRequest(e8) {
    return this.on('request', e8), this;
  }
  /**
   * ### parse | Life cycle event
   * Callback function to handle body parsing
   *
   * If truthy value is returned, will be assigned to `context.body`
   * Otherwise will skip the callback and look for the next one.
   *
   * Equivalent to Express's body parser
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onParse((request, contentType) => {
   *         if(contentType === "application/json")
   *             return request.json()
   *     })
   * ```
   */
  onParse(e8) {
    return this.on('parse', e8), this;
  }
  /**
   * ### transform | Life cycle event
   * Assign or transform anything related to context before validation.
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onTransform(({ params }) => {
   *         if(params.id)
   *             params.id = +params.id
   *     })
   * ```
   */
  onTransform(e8) {
    return this.on('transform', e8), this;
  }
  /**
   * ### Before Handle | Life cycle event
   * Intercept request **before(()) main handler is called.
   *
   * If truthy value is returned, will be assigned as `Response` and skip the main handler
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onBeforeHandle(({ params: { id }, status }) => {
   *         if(id && !isExisted(id)) {
   * 	           status(401)
   *
   *             return "Unauthorized"
   * 	       }
   *     })
   * ```
   */
  onBeforeHandle(e8) {
    return this.on('beforeHandle', e8), this;
  }
  /**
   * ### After Handle | Life cycle event
   * Intercept request **after** main handler is called.
   *
   * If truthy value is returned, will be assigned as `Response`
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onAfterHandle((context, response) => {
   *         if(typeof response === "object")
   *             return JSON.stringify(response)
   *     })
   * ```
   */
  onAfterHandle(e8) {
    return this.on('afterHandle', e8), this;
  }
  /**
   * ### response | Life cycle event
   * Called when handler is executed
   * Good for analytic metrics
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onError(({ code }) => {
   *         if(code === "NOT_FOUND")
   *             return "Path not found :("
   *     })
   * ```
   */
  onResponse(e8) {
    return this.on('response', e8), this;
  }
  /**
   * ### After Handle | Life cycle event
   * Intercept request **after** main handler is called.
   *
   * If truthy value is returned, will be assigned as `Response`
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onAfterHandle((context, response) => {
   *         if(typeof response === "object")
   *             return JSON.stringify(response)
   *     })
   * ```
   */
  trace(e8) {
    return (
      this.reporter.on(
        'event',
        createTraceListener(() => this.reporter, e8),
      ),
      this.on('trace', e8),
      this
    );
  }
  addError(e8, t4) {
    return this.error(e8, t4);
  }
  error(e8, t4) {
    switch (typeof e8) {
      case 'string':
        return (
          // @ts-ignore
          (t4.prototype[ERROR_CODE] = e8), // @ts-ignore
          (this.definitions.error[e8] = t4),
          this
        );
      case 'function':
        return (this.definitions.error = e8(this.definitions.error)), this;
    }
    for (let [t5, r6] of Object.entries(e8))
      (r6.prototype[ERROR_CODE] = t5), // @ts-ignore
        (this.definitions.error[t5] = r6);
    return this;
  }
  /**
   * ### Error | Life cycle event
   * Called when error is thrown during processing request
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onError(({ code }) => {
   *         if(code === "NOT_FOUND")
   *             return "Path not found :("
   *     })
   * ```
   */
  onError(e8) {
    return this.on('error', e8), this;
  }
  /**
   * ### stop | Life cycle event
   * Called after server stop serving request
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onStop((app) => {
   *         cleanup()
   *     })
   * ```
   */
  onStop(e8) {
    return this.on('stop', e8), this;
  }
  /**
   * ### on
   * Syntax sugar for attaching life cycle event by name
   *
   * Does the exact same thing as `.on[Event]()`
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .on('error', ({ code }) => {
   *         if(code === "NOT_FOUND")
   *             return "Path not found :("
   *     })
   * ```
   */
  on(e8, t4) {
    for (let r6 of Array.isArray(t4) ? t4 : [t4])
      switch (((r6 = asGlobal(r6)), e8)) {
        case 'start':
          this.event.start.push(r6);
          break;
        case 'request':
          this.event.request.push(r6);
          break;
        case 'response':
          this.event.onResponse.push(r6);
          break;
        case 'parse':
          this.event.parse.splice(this.event.parse.length - 1, 0, r6);
          break;
        case 'transform':
          this.event.transform.push(r6);
          break;
        case 'beforeHandle':
          this.event.beforeHandle.push(r6);
          break;
        case 'afterHandle':
          this.event.afterHandle.push(r6);
          break;
        case 'trace':
          this.event.trace.push(r6);
          break;
        case 'error':
          this.event.error.push(r6);
          break;
        case 'stop':
          this.event.stop.push(r6);
      }
    return this;
  }
  /**
   * ### group
   * Encapsulate and group path with prefix
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .group('/v1', app => app
   *         .get('/', () => 'Hi')
   *         .get('/name', () => 'Elysia')
   *     })
   * ```
   */
  group(e8, t4, r6) {
    let s3 = new x({ ...this.config, prefix: '' });
    s3.store = this.store;
    let i2 = 'object' == typeof t4,
      o = (i2 ? r6 : t4)(s3);
    return (
      (this.decorators = mergeDeep(this.decorators, s3.decorators)),
      o.event.request.length &&
        (this.event.request = [...this.event.request, ...o.event.request]),
      o.event.onResponse.length &&
        (this.event.onResponse = [
          ...this.event.onResponse,
          ...o.event.onResponse,
        ]),
      this.model(o.definitions.type),
      Object.values(s3.routes).forEach(
        ({ method: r7, path: s4, handler: n3, hooks: a4 }) => {
          (s4 = (i2 ? '' : this.config.prefix) + e8 + s4),
            i2
              ? this.add(
                  r7,
                  s4,
                  n3,
                  mergeHook(t4, {
                    ...a4,
                    error: a4.error
                      ? Array.isArray(a4.error)
                        ? [...a4.error, ...o.event.error]
                        : [a4.error, ...o.event.error]
                      : o.event.error,
                  }),
                )
              : this.add(r7, s4, n3, mergeHook(a4, { error: o.event.error }), {
                  skipPrefix: true,
                });
        },
      ),
      this
    );
  }
  /**
   * ### guard
   * Encapsulate and pass hook into all child handler
   *
   * ---
   * @example
   * ```typescript
   * import { t } from 'elysia'
   *
   * new Elysia()
   *     .guard({
   *          schema: {
   *              body: t.Object({
   *                  username: t.String(),
   *                  password: t.String()
   *              })
   *          }
   *     }, app => app
   *         .get("/", () => 'Hi')
   *         .get("/name", () => 'Elysia')
   *     })
   * ```
   */
  guard(e8, t4) {
    if (!t4)
      return (
        (this.event = mergeLifeCycle(this.event, e8)),
        (this.validator = {
          body: e8.body,
          headers: e8.headers,
          params: e8.params,
          query: e8.query,
          response: e8.response,
        }),
        this
      );
    let r6 = new x();
    r6.store = this.store;
    let s3 = t4(r6);
    return (
      (this.decorators = mergeDeep(this.decorators, r6.decorators)),
      s3.event.request.length &&
        (this.event.request = [...this.event.request, ...s3.event.request]),
      s3.event.onResponse.length &&
        (this.event.onResponse = [
          ...this.event.onResponse,
          ...s3.event.onResponse,
        ]),
      this.model(s3.definitions.type),
      Object.values(r6.routes).forEach(
        ({ method: t5, path: r7, handler: i2, hooks: o }) => {
          this.add(
            t5,
            r7,
            i2,
            mergeHook(e8, {
              ...o,
              error: o.error
                ? Array.isArray(o.error)
                  ? [...o.error, ...s3.event.error]
                  : [o.error, ...s3.event.error]
                : s3.event.error,
            }),
          );
        },
      ),
      this
    );
  }
  /**
   * ### use
   * Merge separate logic of Elysia with current
   *
   * ---
   * @example
   * ```typescript
   * const plugin = (app: Elysia) => app
   *     .get('/plugin', () => 'hi')
   *
   * new Elysia()
   *     .use(plugin)
   * ```
   */
  use(e8) {
    return e8 instanceof Promise
      ? (this.lazyLoadModules.push(
          e8
            .then((e9) =>
              'function' == typeof e9
                ? e9(this)
                : 'function' == typeof e9.default
                ? e9.default(this)
                : this._use(e9),
            )
            .then((e9) => e9.compile()),
        ),
        this)
      : this._use(e8);
  }
  _use(e8) {
    if ('function' == typeof e8) {
      let t5 = e8(this);
      return t5 instanceof Promise
        ? (this.lazyLoadModules.push(
            t5
              .then((e9) =>
                'function' == typeof e9
                  ? e9(this)
                  : 'function' == typeof e9.default
                  ? e9.default(this)
                  : this._use(e9),
              )
              .then((e9) => e9.compile()),
          ),
          this)
        : t5;
    }
    let { name: t4, seed: r6 } = e8.config;
    e8.getServer = () => this.getServer();
    let s3 = e8.config.scoped;
    if (s3) {
      if (t4) {
        t4 in this.dependencies || (this.dependencies[t4] = []);
        let e9 = void 0 !== r6 ? checksum(t4 + JSON.stringify(r6)) : 0;
        if (this.dependencies[t4].some((t5) => e9 === t5)) return this;
        this.dependencies[t4].push(e9);
      }
      e8.model(this.definitions.type),
        e8.error(this.definitions.error),
        e8.onRequest((e9) => {
          Object.assign(e9, this.decorators),
            Object.assign(e9.store, this.store);
        }),
        (e8.event.trace = [...this.event.trace, ...e8.event.trace]),
        e8.config.aot && e8.compile();
      let s4 = this.mount(e8.fetch);
      return (this.routes = this.routes.concat(s4.routes)), this;
    }
    for (let t5 of ((e8.reporter = this.reporter), e8.event.trace))
      this.trace(t5);
    for (let { method: t5, path: r7, handler: s4, hooks: i2 } of (this.decorate(
      e8.decorators,
    ),
    this.state(e8.store),
    this.model(e8.definitions.type),
    this.error(e8.definitions.error),
    Object.values(e8.routes)))
      this.add(t5, r7, s4, mergeHook(i2, { error: e8.event.error }));
    if (!s3) {
      if (t4) {
        t4 in this.dependencies || (this.dependencies[t4] = []);
        let s4 = void 0 !== r6 ? checksum(t4 + JSON.stringify(r6)) : 0;
        if (this.dependencies[t4].some((e9) => s4 === e9)) return this;
        this.dependencies[t4].push(s4),
          (this.event = mergeLifeCycle(
            this.event,
            filterGlobalHook(e8.event),
            s4,
          ));
      } else
        this.event = mergeLifeCycle(this.event, filterGlobalHook(e8.event));
    }
    return this;
  }
  mount(e8, t4) {
    if ('function' == typeof e8 || 0 === e8.length || '/' === e8) {
      let r7 = 'function' == typeof e8 ? e8 : t4,
        s4 = async ({ request: e9, path: t5 }) =>
          r7(new Request('http://a.cc' + t5, e9));
      return (
        this.all('/', s4, { type: 'none' }),
        this.all('/*', s4, { type: 'none' }),
        this
      );
    }
    let r6 = e8.length,
      s3 = async ({ request: e9, path: s4 }) =>
        t4(new Request('http://a.cc' + s4.slice(r6), e9));
    return (
      this.all(e8, s3, { type: 'none' }),
      this.all(e8 + (e8.endsWith('/') ? '*' : '/*'), s3, { type: 'none' }),
      this
    );
  }
  /**
   * ### get
   * Register handler for path with method [GET]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .get('/', () => 'hi')
   *     .get('/with-hook', () => 'hi', {
   *         schema: {
   *             response: t.String()
   *         }
   *     })
   * ```
   */
  get(e8, t4, r6) {
    return this.add('GET', e8, t4, r6), this;
  }
  /**
   * ### post
   * Register handler for path with method [POST]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .post('/', () => 'hi')
   *     .post('/with-hook', () => 'hi', {
   *         schema: {
   *             response: t.String()
   *         }
   *     })
   * ```
   */
  post(e8, t4, r6) {
    return this.add('POST', e8, t4, r6), this;
  }
  /**
   * ### put
   * Register handler for path with method [PUT]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .put('/', () => 'hi')
   *     .put('/with-hook', () => 'hi', {
   *         schema: {
   *             response: t.String()
   *         }
   *     })
   * ```
   */
  put(e8, t4, r6) {
    return this.add('PUT', e8, t4, r6), this;
  }
  /**
   * ### patch
   * Register handler for path with method [PATCH]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .patch('/', () => 'hi')
   *     .patch('/with-hook', () => 'hi', {
   *         schema: {
   *             response: t.String()
   *         }
   *     })
   * ```
   */
  patch(e8, t4, r6) {
    return this.add('PATCH', e8, t4, r6), this;
  }
  /**
   * ### delete
   * Register handler for path with method [DELETE]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .delete('/', () => 'hi')
   *     .delete('/with-hook', () => 'hi', {
   *         schema: {
   *             response: t.String()
   *         }
   *     })
   * ```
   */
  delete(e8, t4, r6) {
    return this.add('DELETE', e8, t4, r6), this;
  }
  /**
   * ### options
   * Register handler for path with method [OPTIONS]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .options('/', () => 'hi')
   *     .options('/with-hook', () => 'hi', {
   *         schema: {
   *             response: t.String()
   *         }
   *     })
   * ```
   */
  options(e8, t4, r6) {
    return this.add('OPTIONS', e8, t4, r6), this;
  }
  /**
   * ### all
   * Register handler for path with any method
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .all('/', () => 'hi')
   * ```
   */
  all(e8, t4, r6) {
    return this.add('ALL', e8, t4, r6), this;
  }
  /**
   * ### head
   * Register handler for path with method [HEAD]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .head('/', () => 'hi')
   *     .head('/with-hook', () => 'hi', {
   *         schema: {
   *             response: t.String()
   *         }
   *     })
   * ```
   */
  head(e8, t4, r6) {
    return this.add('HEAD', e8, t4, r6), this;
  }
  /**
   * ### connect
   * Register handler for path with method [CONNECT]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .connect('/', () => 'hi')
   *     .connect('/with-hook', () => 'hi', {
   *         schema: {
   *             response: t.String()
   *         }
   *     })
   * ```
   */
  connect(e8, t4, r6) {
    return this.add('CONNECT', e8, t4, r6), this;
  }
  /**
   * ### ws
   * Register handler for path with method [ws]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .ws('/', {
   *         message(ws, message) {
   *             ws.send(message)
   *         }
   *     })
   * ```
   */
  ws(e8, t4) {
    let r6 = t4.transformMessage
        ? Array.isArray(t4.transformMessage)
          ? t4.transformMessage
          : [t4.transformMessage]
        : void 0,
      i2 = null,
      o = getSchemaValidator(t4?.body, { models: this.definitions.type }),
      n3 = getSchemaValidator(t4?.response, { models: this.definitions.type }),
      a4 = (e9) => {
        if ('string' == typeof e9) {
          let t5 = e9?.charCodeAt(0);
          if (47 === t5 || 123 === t5)
            try {
              e9 = JSON.parse(e9);
            } catch {}
          else Number.isNaN(+e9) || (e9 = +e9);
        }
        if (r6?.length)
          for (let t5 = 0; t5 < r6.length; t5++) {
            let s3 = r6[t5](e9);
            void 0 !== s3 && (e9 = s3);
          }
        return e9;
      };
    return (
      this.route(
        '$INTERNALWS',
        e8,
        // @ts-ignore
        (e9) => {
          let {
            set: r7,
            path: h2,
            qi: c,
            headers: d2,
            query: f,
            params: l,
          } = e9;
          if (
            (null === i2 && (i2 = this.getServer()),
            !i2?.upgrade(e9.request, {
              headers:
                'function' == typeof t4.upgrade ? t4.upgrade(e9) : t4.upgrade,
              data: {
                validator: n3,
                open(r8) {
                  t4.open?.(new ElysiaWS(r8, e9));
                },
                message: (r8, i3) => {
                  let n4 = a4(i3);
                  if (o?.Check(n4) === false)
                    return void r8.send(
                      new ValidationError('message', o, n4).message,
                    );
                  t4.message?.(new ElysiaWS(r8, e9), n4);
                },
                drain(r8) {
                  t4.drain?.(new ElysiaWS(r8, e9));
                },
                close(r8, i3, o2) {
                  t4.close?.(new ElysiaWS(r8, e9), i3, o2);
                },
              },
            }))
          )
            return (r7.status = 400), 'Expected a websocket connection';
        },
        {
          beforeHandle: t4.beforeHandle,
          transform: t4.transform,
          headers: t4.headers,
          params: t4.params,
          query: t4.query,
        },
      ),
      this
    );
  }
  /**
   * ### route
   * Register handler for path with custom method
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .route('CUSTOM', '/', () => 'hi')
   *     .route('CUSTOM', '/with-hook', () => 'hi', {
   *         schema: {
   *             response: t.String()
   *         }
   *     })
   * ```
   */
  route(e8, t4, r6, { config: s3, ...i2 } = { config: { allowMeta: false } }) {
    return this.add(e8, t4, r6, i2, s3), this;
  }
  /**
   * ### state
   * Assign global mutatable state accessible for all handler
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .state('counter', 0)
   *     .get('/', (({ counter }) => ++counter)
   * ```
   */
  state(e8, t4) {
    switch (typeof e8) {
      case 'object':
        return (this.store = mergeDeep(this.store, e8)), this;
      case 'function':
        return (this.store = e8(this.store)), this;
    }
    return e8 in this.store || (this.store[e8] = t4), this;
  }
  /**
   * ### decorate
   * Define custom method to `Context` accessible for all handler
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .decorate('getDate', () => Date.now())
   *     .get('/', (({ getDate }) => getDate())
   * ```
   */
  decorate(e8, t4) {
    switch (typeof e8) {
      case 'object':
        return (this.decorators = mergeDeep(this.decorators, e8)), this;
      case 'function':
        return (this.decorators = e8(this.decorators)), this;
    }
    return e8 in this.decorators || (this.decorators[e8] = t4), this;
  }
  /**
   * Derive new property for each request with access to `Context`.
   *
   * If error is thrown, the scope will skip to handling error instead.
   *
   * ---
   * @example
   * new Elysia()
   *     .state('counter', 1)
   *     .derive(({ store }) => ({
   *         increase() {
   *             store.counter++
   *         }
   *     }))
   */
  derive(e8) {
    return (
      // @ts-ignore
      (e8.$elysia = 'derive'), this.onTransform(e8)
    );
  }
  model(e8, t4) {
    switch (typeof e8) {
      case 'object':
        return (
          Object.entries(e8).forEach(([e9, t5]) => {
            e9 in this.definitions.type || // @ts-ignore
              (this.definitions.type[e9] = t5);
          }),
          this
        );
      case 'function':
        return (this.definitions.type = e8(this.definitions.type)), this;
    }
    return (this.definitions.type[e8] = t4), this;
  }
  mapDerive(e8) {
    return (
      // @ts-ignore
      (e8.$elysia = 'derive'), this.onTransform(e8)
    );
  }
  affix(e8, t4, r6) {
    if ('' === r6) return this;
    let s3 = ['_', '-', ' '],
      i2 = (e9) => e9[0].toUpperCase() + e9.slice(1),
      o =
        'prefix' === e8
          ? (e9, t5) => (s3.includes(e9.at(-1) ?? '') ? e9 + t5 : e9 + i2(t5))
          : s3.includes(r6.at(-1) ?? '')
          ? (e9, t5) => t5 + e9
          : (e9, t5) => t5 + i2(e9),
      n3 = (e9) => {
        let t5 = {};
        switch (e9) {
          case 'decorator':
            for (let e10 in this.decorators)
              t5[o(r6, e10)] = this.decorators[e10];
            this.decorators = t5;
            break;
          case 'state':
            for (let e10 in this.store) t5[o(r6, e10)] = this.store[e10];
            this.store = t5;
            break;
          case 'model':
            for (let e10 in this.definitions.type)
              t5[o(r6, e10)] = this.definitions.type[e10];
            this.definitions.type = t5;
            break;
          case 'error':
            for (let e10 in this.definitions.error)
              t5[o(r6, e10)] = this.definitions.error[e10];
            this.definitions.error = t5;
        }
      },
      a4 = Array.isArray(t4) ? t4 : [t4];
    for (let e9 of a4.some((e10) => 'all' === e10)
      ? ['decorator', 'state', 'model', 'error']
      : a4)
      n3(e9);
    return this;
  }
  prefix(e8, t4) {
    return this.affix('prefix', e8, t4);
  }
  suffix(e8, t4) {
    return this.affix('suffix', e8, t4);
  }
  compile() {
    return (
      (this.fetch = this.config.aot
        ? composeGeneralHandler(this)
        : createDynamicHandler(this)),
      'function' == typeof this.server?.reload &&
        this.server.reload({ ...this.server, fetch: this.fetch }),
      this
    );
  }
  handle = async (e8) => this.fetch(e8);
  /**
   * Handle can be either sync or async to save performance.
   *
   * Beside benchmark purpose, please use 'handle' instead.
   */
  fetch = (e8) =>
    (this.fetch = this.config.aot
      ? composeGeneralHandler(this)
      : createDynamicHandler(this))(e8);
  handleError = async (e8, t4) =>
    (this.handleError = this.config.aot
      ? composeErrorHandler(this)
      : createDynamicErrorHandler(this))(e8, t4);
  outerErrorHandler = (e8) =>
    new Response(e8.message || e8.name || 'Error', {
      // @ts-ignore
      status: e8?.status ?? 500,
    });
  /**
   * ### listen
   * Assign current instance to port and start serving
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .get("/", () => 'hi')
   *     .listen(8080)
   * ```
   */
  listen = (e8, t4) => {
    if (!Bun) throw Error('Bun to run');
    if (
      (this.compile(), 'string' == typeof e8 && Number.isNaN((e8 = +e8.trim())))
    )
      throw Error('Port must be a numeric value');
    let r6 = this.fetch,
      s3 =
        'object' == typeof e8
          ? {
              development: !isProduction,
              ...this.config.serve,
              ...e8,
              websocket: { ...this.config.websocket, ...websocket },
              fetch: r6,
              error: this.outerErrorHandler,
            }
          : {
              development: !isProduction,
              ...this.config.serve,
              websocket: { ...this.config.websocket, ...websocket },
              port: e8,
              fetch: r6,
              error: this.outerErrorHandler,
            };
    if ('undefined' == typeof Bun)
      throw Error(
        '.listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch',
      );
    return (
      (this.server = Bun?.serve(s3)),
      this.event.start.length &&
        (async () => {
          let e9 = Object.assign(this.decorators, {
            store: this.store,
            app: this,
          });
          for (let t5 = 0; t5 < this.event.transform.length; t5++) {
            let r7 = this.event.transform[t5](e9);
            'derive' === this.event.transform[t5].$elysia &&
              (r7 instanceof Promise
                ? Object.assign(e9, await r7)
                : Object.assign(e9, r7));
          }
          for (let t5 = 0; t5 < this.event.start.length; t5++)
            this.event.start[t5](e9);
        })(),
      t4 && t4(this.server),
      Promise.all(this.lazyLoadModules).then(() => {
        Bun?.gc(false);
      }),
      this
    );
  };
  /**
   * ### stop
   * Stop server from serving
   *
   * ---
   * @example
   * ```typescript
   * const app = new Elysia()
   *     .get("/", () => 'hi')
   *     .listen(8080)
   *
   * // Sometime later
   * app.stop()
   * ```
   */
  stop = async () => {
    if (!this.server)
      throw Error(
        "Elysia isn't running. Call `app.listen` to start the server.",
      );
    this.server.stop(),
      this.event.stop.length &&
        (async () => {
          let e8 = Object.assign(this.decorators, {
            store: this.store,
            app: this,
          });
          for (let t4 = 0; t4 < this.event.transform.length; t4++) {
            let r6 = this.event.transform[t4](e8);
            'derive' === this.event.transform[t4].$elysia &&
              (r6 instanceof Promise
                ? Object.assign(e8, await r6)
                : Object.assign(e8, r6));
          }
          for (let t4 = 0; t4 < this.event.stop.length; t4++)
            this.event.stop[t4](e8);
        })();
  };
  /**
   * Wait until all lazy loaded modules all load is fully
   */
  get modules() {
    return Promise.all(this.lazyLoadModules);
  }
};

// ../node_modules/@elysiajs/html/dist/index.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// ../node_modules/@elysiajs/html/dist/html.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
init_stream();

// ../node_modules/@elysiajs/html/dist/handler.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
init_stream();

// ../node_modules/@elysiajs/html/dist/utils.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function isHtml(value) {
  if (typeof value !== 'string') {
    return false;
  }
  value = value.trim();
  const length = value.length;
  return (
    // Minimum html is 7 characters long: <a></a>
    length >= 7 && // open tag
    value[0] === '<' && // close tag
    value[length - 1] === '>'
  );
}
function isTagHtml(value) {
  return value.trimStart().slice(0, 5).startsWith('<html');
}

// ../node_modules/@elysiajs/html/dist/handler.js
function handleHtml(value, options, hasContentType) {
  if (value instanceof Promise) {
    return value.then((v) => handleHtml(v, options, hasContentType));
  }
  if (typeof value === 'string') {
    if (
      options.autoDoctype &&
      isHtml(value) && // Avoids double adding !doctype or adding to non root html tags.
      isTagHtml(value)
    ) {
      value = '<!doctype html>' + value;
    }
    return new Response(
      value,
      hasContentType
        ? void 0
        : { headers: { 'content-type': options.contentType } },
    );
  }
  let stream = Readable.toWeb(value);
  if (options.autoDoctype) {
    let first = true;
    stream = stream.pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          let str = chunk.toString();
          if (
            first &&
            isTagHtml(str) && // Avoids double adding !doctype or adding to non root html tags.
            isTagHtml(str)
          ) {
            first = false;
            str = '<!doctype html>' + str;
          }
          controller.enqueue(str);
        },
      }),
    );
  }
  return new Response(
    stream,
    hasContentType
      ? void 0
      : { headers: { 'content-type': options.contentType } },
  );
}

// ../node_modules/@elysiajs/html/dist/html.js
var import_suspense = __toESM(require_suspense());
function html(options = {}) {
  options.contentType ??= 'text/html; charset=utf8';
  options.autoDetect ??= true;
  options.isHtml ??= isHtml;
  options.autoDoctype ??= true;
  let instance = new x({ name: '@elysiajs/html' }).derive(({ set }) => {
    return {
      html(value, ...args) {
        if (typeof value === 'function') {
          value = (0, import_suspense.renderToStream)((rid) =>
            value(rid, ...args),
          );
        }
        return handleHtml(value, options, 'content-type' in set.headers);
      },
    };
  });
  if (options.autoDetect) {
    instance = instance.onAfterHandle(function handlerPossibleHtml({
      response: value,
      set,
    }) {
      if (
        // Simple html string
        isHtml(value) || // @kitajs/html stream
        (value instanceof Readable && 'rid' in value)
      ) {
        return handleHtml(value, options, 'content-type' in set.headers);
      }
      return value;
    });
  }
  return instance;
}

// ../node_modules/@elysiajs/html/dist/options.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// ../node_modules/@elysiajs/swagger/dist/index.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// ../node_modules/@elysiajs/swagger/dist/utils.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var import_typebox3 = __toESM(require_typebox2());
var import_lodash = __toESM(require_lodash());
var toOpenAPIPath = (path) =>
  path
    .split('/')
    .map((x2) => (x2.startsWith(':') ? `{${x2.slice(1, x2.length)}}` : x2))
    .join('/');
var mapProperties = (name, schema, models) => {
  if (schema === void 0) return [];
  if (typeof schema === 'string')
    if (schema in models) schema = models[schema];
    else throw new Error(`Can't find model ${schema}`);
  return Object.entries(schema?.properties ?? []).map(([key, value]) => {
    const { type: valueType = void 0, ...rest } = value;
    return {
      // @ts-ignore
      ...rest,
      schema: { type: valueType },
      in: name,
      name: key,
      // @ts-ignore
      required: schema.required?.includes(key) ?? false,
    };
  });
};
var mapTypesResponse = (types, schema) => {
  if (
    typeof schema === 'object' &&
    ['void', 'undefined', 'null'].includes(schema.type)
  )
    return;
  const responses = {};
  for (const type of types)
    responses[type] = {
      schema:
        typeof schema === 'string'
          ? {
              $ref: `#/components/schemas/${schema}`,
            }
          : { ...schema },
    };
  return responses;
};
var capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
var generateOperationId = (method, paths) => {
  let operationId = method.toLowerCase();
  if (paths === '/') return operationId + 'Index';
  for (const path of paths.split('/')) {
    if (path.charCodeAt(0) === 123) {
      operationId += 'By' + capitalize(path.slice(1, -1));
    } else {
      operationId += capitalize(path);
    }
  }
  return operationId;
};
var registerSchemaPath = ({ schema, path, method, hook, models }) => {
  if (hook) hook = (0, import_lodash.default)(hook);
  const contentType = hook?.type ?? [
    'application/json',
    'multipart/form-data',
    'text/plain',
  ];
  path = toOpenAPIPath(path);
  const contentTypes =
    typeof contentType === 'string'
      ? [contentType]
      : contentType ?? ['application/json'];
  const bodySchema = hook?.body;
  const paramsSchema = hook?.params;
  const headerSchema = hook?.headers;
  const querySchema = hook?.query;
  let responseSchema = hook?.response;
  if (typeof responseSchema === 'object') {
    if (import_typebox3.Kind in responseSchema) {
      const { type, properties, required, additionalProperties, ...rest } =
        responseSchema;
      responseSchema = {
        200: {
          ...rest,
          description: rest.description,
          content: mapTypesResponse(
            contentTypes,
            type === 'object' || type === 'array'
              ? {
                  type,
                  properties,
                  required,
                }
              : responseSchema,
          ),
        },
      };
    } else {
      Object.entries(responseSchema).forEach(([key, value]) => {
        if (typeof value === 'string') {
          if (!models[value]) return;
          const {
            type,
            properties,
            required,
            additionalProperties: _,
            ...rest
          } = models[value];
          responseSchema[key] = {
            ...rest,
            description: rest.description,
            content: mapTypesResponse(contentTypes, value),
          };
        } else {
          const { type, properties, required, additionalProperties, ...rest } =
            value;
          responseSchema[key] = {
            ...rest,
            description: rest.description,
            content: mapTypesResponse(contentTypes, {
              type,
              properties,
              required,
            }),
          };
        }
      });
    }
  } else if (typeof responseSchema === 'string') {
    if (!(responseSchema in models)) return;
    const {
      type,
      properties,
      required,
      additionalProperties: _,
      ...rest
    } = models[responseSchema];
    responseSchema = {
      // @ts-ignore
      200: {
        ...rest,
        content: mapTypesResponse(contentTypes, responseSchema),
      },
    };
  }
  const parameters = [
    ...mapProperties('header', headerSchema, models),
    ...mapProperties('path', paramsSchema, models),
    ...mapProperties('query', querySchema, models),
  ];
  schema[path] = {
    ...(schema[path] ? schema[path] : {}),
    [method.toLowerCase()]: {
      ...(headerSchema || paramsSchema || querySchema || bodySchema
        ? { parameters }
        : {}),
      ...(responseSchema
        ? {
            responses: responseSchema,
          }
        : {}),
      operationId:
        hook?.detail?.operationId ?? generateOperationId(method, path),
      ...hook?.detail,
      ...(bodySchema
        ? {
            requestBody: {
              content: mapTypesResponse(
                contentTypes,
                typeof bodySchema === 'string'
                  ? {
                      $ref: `#/components/schemas/${bodySchema}`,
                    }
                  : bodySchema,
              ),
            },
          }
        : null),
    },
  };
};
var filterPaths = (paths, { excludeStaticFile = true, exclude = [] }) => {
  const newPaths = {};
  for (const [key, value] of Object.entries(paths))
    if (
      !exclude.some((x2) => {
        if (typeof x2 === 'string') return key === x2;
        return x2.test(key);
      }) &&
      !key.includes('/swagger') &&
      !key.includes('*') &&
      (excludeStaticFile ? !key.includes('.') : true)
    ) {
      Object.keys(value).forEach((method) => {
        const schema = value[method];
        if (key.includes('{')) {
          if (!schema.parameters) schema.parameters = [];
          schema.parameters = [
            ...key
              .split('/')
              .filter(
                (x2) =>
                  x2.startsWith('{') &&
                  !schema.parameters.find(
                    (params) =>
                      params.in === 'path' &&
                      params.name === x2.slice(1, x2.length - 1),
                  ),
              )
              .map((x2) => ({
                schema: { type: 'string' },
                in: 'path',
                name: x2.slice(1, x2.length - 1),
                required: true,
              })),
            ...schema.parameters,
          ];
        }
        if (!schema.responses)
          schema.responses = {
            200: {},
          };
      });
      newPaths[key] = value;
    }
  return newPaths;
};

// ../node_modules/@elysiajs/swagger/dist/index.js
var swagger =
  (
    {
      documentation = {},
      version: version3 = '5.9.0',
      excludeStaticFile = true,
      path = '/swagger',
      exclude = [],
      swaggerOptions = {},
      theme = `https://unpkg.com/swagger-ui-dist@${version3}/swagger-ui.css`,
      autoDarkMode = true,
    } = {
      documentation: {},
      version: '5.9.0',
      excludeStaticFile: true,
      path: '/swagger',
      exclude: [],
      swaggerOptions: {},
      autoDarkMode: true,
    },
  ) =>
  (app2) => {
    const schema = {};
    let totalRoutes = 0;
    if (!version3)
      version3 = `https://unpkg.com/swagger-ui-dist@${version3}/swagger-ui.css`;
    const info = {
      title: 'Elysia Documentation',
      description: 'Development documentation',
      version: '0.0.0',
      ...documentation.info,
    };
    const pathWithPrefix = `${app2.config.prefix}${path}`;
    app2
      .get(path, () => {
        const combinedSwaggerOptions = {
          url: `${pathWithPrefix}/json`,
          dom_id: '#swagger-ui',
          ...swaggerOptions,
        };
        const stringifiedSwaggerOptions = JSON.stringify(
          combinedSwaggerOptions,
          (key, value) => {
            if (typeof value == 'function') {
              return void 0;
            } else {
              return value;
            }
          },
        );
        return new Response(
          `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${info.title}</title>
    <meta
        name="description"
        content="${info.description}"
    />
    <meta
        name="og:description"
        content="${info.description}"
    />
    ${
      autoDarkMode && typeof theme === 'string'
        ? `
    <style>
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #222;
                color: #faf9a;
            }
            .swagger-ui {
                filter: invert(92%) hue-rotate(180deg);
            }

            .swagger-ui .microlight {
                filter: invert(100%) hue-rotate(180deg);
            }
        }
    </style>`
        : ''
    }
    ${
      typeof theme === 'string'
        ? `<link rel="stylesheet" href="${theme}" />`
        : `<link rel="stylesheet" media="(prefers-color-scheme: light)" href="${theme.light}" />
<link rel="stylesheet" media="(prefers-color-scheme: dark)" href="${theme.dark}" />`
    }
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@${version3}/swagger-ui-bundle.js" crossorigin><\/script>
    <script>
        window.onload = () => {
            window.ui = SwaggerUIBundle(${stringifiedSwaggerOptions});
        };
    <\/script>
</body>
</html>`,
          {
            headers: {
              'content-type': 'text/html; charset=utf8',
            },
          },
        );
      })
      .get(`${path}/json`, () => {
        const routes = app2.routes;
        if (routes.length !== totalRoutes) {
          totalRoutes = routes.length;
          routes.forEach((route) => {
            registerSchemaPath({
              schema,
              hook: route.hooks,
              method: route.method,
              path: route.path,
              // @ts-ignore
              models: app2.definitions?.type,
              contentType: route.hooks.type,
            });
          });
        }
        return {
          openapi: '3.0.3',
          ...{
            ...documentation,
            info: {
              title: 'Elysia Documentation',
              description: 'Development documentation',
              version: '0.0.0',
              ...documentation.info,
            },
          },
          paths: filterPaths(schema, {
            excludeStaticFile,
            exclude: Array.isArray(exclude) ? exclude : [exclude],
          }),
          components: {
            ...documentation.components,
            schemas: {
              // @ts-ignore
              ...app2.definitions?.type,
              ...documentation.components?.schemas,
            },
          },
        };
      });
    return app2;
  };

// src/index.ts
var trpcServer = ({ endpoint = '/trpc', ...rest }) => {
  return async (c) => {
    const res = fetchRequestHandler({
      ...rest,
      endpoint,
      req: c.req.raw,
    });
    return res;
  };
};
var app = new x({ aot: false });
app.use(html());
app.use(swagger());
app.listen(3e3, () => console.log('Listening on port 3000'));
var src_default = {
  fetch: app.fetch,
};

// ../../../../../.nvm/versions/node/v18.17.1/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function reduceError(e8) {
  return {
    name: e8?.name,
    message: e8?.message ?? String(e8),
    stack: e8?.stack,
    cause: e8?.cause === void 0 ? void 0 : reduceError(e8.cause),
  };
}
var jsonError = async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } catch (e8) {
    const error = reduceError(e8);
    return Response.json(error, {
      status: 500,
      headers: { 'MF-Experimental-Error-Stack': 'true' },
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap = void 0;

// src/.wrangler/tmp/bundle-tItaRt/middleware-insertion-facade.js
var envWrappers = [wrap].filter(Boolean);
var facade = {
  ...src_default,
  envWrappers,
  middleware: [
    middleware_miniflare3_json_error_default,
    ...(src_default.middleware ? src_default.middleware : []),
  ].filter(Boolean),
};
var middleware_insertion_facade_default = facade;

// src/.wrangler/tmp/bundle-tItaRt/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError('Illegal invocation');
    }
    this.#noRetry();
  }
};
var __facade_modules_fetch__ = function (request, env3, ctx) {
  if (middleware_insertion_facade_default.fetch === void 0)
    throw new Error('Handler does not export a fetch() function.');
  return middleware_insertion_facade_default.fetch(request, env3, ctx);
};
function getMaskedEnv(rawEnv) {
  let env3 = rawEnv;
  if (
    middleware_insertion_facade_default.envWrappers &&
    middleware_insertion_facade_default.envWrappers.length > 0
  ) {
    for (const wrapFn of middleware_insertion_facade_default.envWrappers) {
      env3 = wrapFn(env3);
    }
  }
  return env3;
}
var registeredMiddleware = false;
var facade2 = {
  ...(middleware_insertion_facade_default.tail && {
    tail: maskHandlerEnv(middleware_insertion_facade_default.tail),
  }),
  ...(middleware_insertion_facade_default.trace && {
    trace: maskHandlerEnv(middleware_insertion_facade_default.trace),
  }),
  ...(middleware_insertion_facade_default.scheduled && {
    scheduled: maskHandlerEnv(middleware_insertion_facade_default.scheduled),
  }),
  ...(middleware_insertion_facade_default.queue && {
    queue: maskHandlerEnv(middleware_insertion_facade_default.queue),
  }),
  ...(middleware_insertion_facade_default.test && {
    test: maskHandlerEnv(middleware_insertion_facade_default.test),
  }),
  ...(middleware_insertion_facade_default.email && {
    email: maskHandlerEnv(middleware_insertion_facade_default.email),
  }),
  fetch(request, rawEnv, ctx) {
    const env3 = getMaskedEnv(rawEnv);
    if (
      middleware_insertion_facade_default.middleware &&
      middleware_insertion_facade_default.middleware.length > 0
    ) {
      if (!registeredMiddleware) {
        registeredMiddleware = true;
        for (const middleware of middleware_insertion_facade_default.middleware) {
          __facade_register__(middleware);
        }
      }
      const __facade_modules_dispatch__ = function (type, init3) {
        if (
          type === 'scheduled' &&
          middleware_insertion_facade_default.scheduled !== void 0
        ) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init3.cron ?? '',
            () => {},
          );
          return middleware_insertion_facade_default.scheduled(
            controller,
            env3,
            ctx,
          );
        }
      };
      return __facade_invoke__(
        request,
        env3,
        ctx,
        __facade_modules_dispatch__,
        __facade_modules_fetch__,
      );
    } else {
      return __facade_modules_fetch__(request, env3, ctx);
    }
  },
};
function maskHandlerEnv(handler) {
  return (data, env3, ctx) => handler(data, getMaskedEnv(env3), ctx);
}
var middleware_loader_entry_default = facade2;
export { middleware_loader_entry_default as default, trpcServer };
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/*! Bundled license information:

@esbuild-plugins/node-globals-polyfill/Buffer.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

@trpc/server/dist/resolveHTTPResponse-68c8befb.mjs:
  (* istanbul ignore if -- @preserve *)

@trpc/server/dist/adapters/fetch/index.mjs:
  (* istanbul ignore if -- @preserve *)
*/
//# sourceMappingURL=index.js.map
