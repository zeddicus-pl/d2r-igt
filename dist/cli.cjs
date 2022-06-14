var $lJiUQ$path = require("path");
var $lJiUQ$assert = require("assert");
var $lJiUQ$util = require("util");
var $lJiUQ$os = require("os");
var $lJiUQ$buffer = require("buffer");
var $lJiUQ$tty = require("tty");
var $lJiUQ$fs = require("fs");
var $lJiUQ$module = require("module");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire97c3"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire97c3"] = parcelRequire;
}
parcelRequire.register("5vfvk", function(module, exports) {

var __dirname1 = $lJiUQ$path.resolve(__dirname, "../node_modules/ref-napi/lib");
"use strict";


var $401bdfd22e3e107a$require$inspect = $lJiUQ$util.inspect;

const debug = (parcelRequire("ikpZ8"))("ref");



exports = module.exports = (parcelRequire("309gM"))($lJiUQ$path.join(__dirname1, ".."));
exports.endianness = $lJiUQ$os.endianness();
/**
 * A `Buffer` that references the C NULL pointer. That is, its memory address
 * points to 0. Its `length` is 0 because accessing any data from this buffer
 * would cause a _segmentation fault_.
 *
 * ```
 * console.log(ref.NULL);
 * <SlowBuffer@0x0 >
 * ```
 *
 * @name NULL
 * @type Buffer
 */ /**
 * A string that represents the native endianness of the machine's processor.
 * The possible values are either `"LE"` or `"BE"`.
 *
 * ```
 * console.log(ref.endianness);
 * 'LE'
 * ```
 *
 * @name endianness
 * @type String
 */ /**
 * Accepts a `Buffer` instance and returns the memory address of the buffer
 * instance. Returns a JavaScript Number, which can't hold 64-bit integers,
 * so this function is unsafe on 64-bit systems.
 * ```
 * console.log(ref.address(new Buffer(1)));
 * 4320233616
 *
 * console.log(ref.address(ref.NULL)));
 * 0
 * ```
 *
 * @param {Buffer} buffer The buffer to get the memory address of.
 * @return {Number} The memory address the buffer instance.
 * @name address
 * @type method
 */ /**
 * Accepts a `Buffer` instance and returns _true_ if the buffer represents the
 * NULL pointer, _false_ otherwise.
 *
 * ```
 * console.log(ref.isNull(new Buffer(1)));
 * false
 *
 * console.log(ref.isNull(ref.NULL));
 * true
 * ```
 *
 * @param {Buffer} buffer The buffer to check for NULL.
 * @return {Boolean} true or false.
 * @name isNull
 * @type method
 */ /**
 * Reads a JavaScript Object that has previously been written to the given
 * _buffer_ at the given _offset_.
 *
 * ```
 * var obj = { foo: 'bar' };
 * var buf = ref.alloc('Object', obj);
 *
 * var obj2 = ref.readObject(buf, 0);
 * console.log(obj === obj2);
 * true
 * ```
 *
 * @param {Buffer} buffer The buffer to read an Object from.
 * @param {Number} offset The offset to begin reading from.
 * @return {Object} The Object that was read from _buffer_.
 * @name readObject
 * @type method
 */ /**
 * Reads a Buffer instance from the given _buffer_ at the given _offset_.
 * The _size_ parameter specifies the `length` of the returned Buffer instance,
 * which defaults to __0__.
 *
 * ```
 * var buf = new Buffer('hello world');
 * var pointer = ref.alloc('pointer', buf);
 *
 * var buf2 = ref.readPointer(pointer, 0, buf.length);
 * console.log(buf2.toString());
 * 'hello world'
 * ```
 *
 * @param {Buffer} buffer The buffer to read a Buffer from.
 * @param {Number} offset The offset to begin reading from.
 * @param {Number} length (optional) The length of the returned Buffer. Defaults to 0.
 * @return {Buffer} The Buffer instance that was read from _buffer_.
 * @name readPointer
 * @type method
 */ /**
 * Returns a JavaScript String read from _buffer_ at the given _offset_. The
 * C String is read until the first NULL byte, which indicates the end of the
 * String.
 *
 * This function can read beyond the `length` of a Buffer.
 *
 * ```
 * var buf = new Buffer('hello\0world\0');
 *
 * var str = ref.readCString(buf, 0);
 * console.log(str);
 * 'hello'
 * ```
 *
 * @param {Buffer} buffer The buffer to read a Buffer from.
 * @param {Number} offset The offset to begin reading from.
 * @return {String} The String that was read from _buffer_.
 * @name readCString
 * @type method
 */ /**
 * Returns a big-endian signed 64-bit int read from _buffer_ at the given
 * _offset_.
 *
 * If the returned value will fit inside a JavaScript Number without losing
 * precision, then a Number is returned, otherwise a String is returned.
 *
 * ```
 * var buf = ref.alloc('int64');
 * ref.writeInt64BE(buf, 0, '9223372036854775807');
 *
 * var val = ref.readInt64BE(buf, 0)
 * console.log(val)
 * '9223372036854775807'
 * ```
 *
 * @param {Buffer} buffer The buffer to read a Buffer from.
 * @param {Number} offset The offset to begin reading from.
 * @return {Number|String} The Number or String that was read from _buffer_.
 * @name readInt64BE
 * @type method
 */ /**
 * Returns a little-endian signed 64-bit int read from _buffer_ at the given
 * _offset_.
 *
 * If the returned value will fit inside a JavaScript Number without losing
 * precision, then a Number is returned, otherwise a String is returned.
 *
 * ```
 * var buf = ref.alloc('int64');
 * ref.writeInt64LE(buf, 0, '9223372036854775807');
 *
 * var val = ref.readInt64LE(buf, 0)
 * console.log(val)
 * '9223372036854775807'
 * ```
 *
 * @param {Buffer} buffer The buffer to read a Buffer from.
 * @param {Number} offset The offset to begin reading from.
 * @return {Number|String} The Number or String that was read from _buffer_.
 * @name readInt64LE
 * @type method
 */ /**
 * Returns a big-endian unsigned 64-bit int read from _buffer_ at the given
 * _offset_.
 *
 * If the returned value will fit inside a JavaScript Number without losing
 * precision, then a Number is returned, otherwise a String is returned.
 *
 * ```
 * var buf = ref.alloc('uint64');
 * ref.writeUInt64BE(buf, 0, '18446744073709551615');
 *
 * var val = ref.readUInt64BE(buf, 0)
 * console.log(val)
 * '18446744073709551615'
 * ```
 *
 * @param {Buffer} buffer The buffer to read a Buffer from.
 * @param {Number} offset The offset to begin reading from.
 * @return {Number|String} The Number or String that was read from _buffer_.
 * @name readUInt64BE
 * @type method
 */ /**
 * Returns a little-endian unsigned 64-bit int read from _buffer_ at the given
 * _offset_.
 *
 * If the returned value will fit inside a JavaScript Number without losing
 * precision, then a Number is returned, otherwise a String is returned.
 *
 * ```
 * var buf = ref.alloc('uint64');
 * ref.writeUInt64LE(buf, 0, '18446744073709551615');
 *
 * var val = ref.readUInt64LE(buf, 0)
 * console.log(val)
 * '18446744073709551615'
 * ```
 *
 * @param {Buffer} buffer The buffer to read a Buffer from.
 * @param {Number} offset The offset to begin reading from.
 * @return {Number|String} The Number or String that was read from _buffer_.
 * @name readUInt64LE
 * @type method
 */ /**
 * Writes the _input_ Number or String as a big-endian signed 64-bit int into
 * _buffer_ at the given _offset_.
 *
 * ```
 * var buf = ref.alloc('int64');
 * ref.writeInt64BE(buf, 0, '9223372036854775807');
 * ```
 *
 * @param {Buffer} buffer The buffer to write to.
 * @param {Number} offset The offset to begin writing from.
 * @param {Number|String} input This String or Number which gets written.
 * @name writeInt64BE
 * @type method
 */ /**
 * Writes the _input_ Number or String as a little-endian signed 64-bit int into
 * _buffer_ at the given _offset_.
 *
 * ```
 * var buf = ref.alloc('int64');
 * ref.writeInt64LE(buf, 0, '9223372036854775807');
 * ```
 *
 * @param {Buffer} buffer The buffer to write to.
 * @param {Number} offset The offset to begin writing from.
 * @param {Number|String} input This String or Number which gets written.
 * @name writeInt64LE
 * @type method
 */ /**
 * Writes the _input_ Number or String as a big-endian unsigned 64-bit int into
 * _buffer_ at the given _offset_.
 *
 * ```
 * var buf = ref.alloc('uint64');
 * ref.writeUInt64BE(buf, 0, '18446744073709551615');
 * ```
 *
 * @param {Buffer} buffer The buffer to write to.
 * @param {Number} offset The offset to begin writing from.
 * @param {Number|String} input This String or Number which gets written.
 * @name writeUInt64BE
 * @type method
 */ /**
 * Writes the _input_ Number or String as a little-endian unsigned 64-bit int
 * into _buffer_ at the given _offset_.
 *
 * ```
 * var buf = ref.alloc('uint64');
 * ref.writeUInt64LE(buf, 0, '18446744073709551615');
 * ```
 *
 * @param {Buffer} buffer The buffer to write to.
 * @param {Number} offset The offset to begin writing from.
 * @param {Number|String} input This String or Number which gets written.
 * @name writeUInt64LE
 * @type method
 */ /**
 * Returns a new clone of the given "type" object, with its
 * `indirection` level incremented by **1**.
 *
 * Say you wanted to create a type representing a `void *`:
 *
 * ```
 * var voidPtrType = ref.refType(ref.types.void);
 * ```
 *
 * @param {Object|String} type The "type" object to create a reference type from. Strings get coerced first.
 * @return {Object} The new "type" object with its `indirection` incremented by 1.
 */ exports.refType = function refType(type) {
    const _type = exports.coerceType(type);
    const rtn = Object.create(_type);
    rtn.indirection++;
    if (_type.name) Object.defineProperty(rtn, "name", {
        value: _type.name + "*",
        configurable: true,
        enumerable: true,
        writable: true
    });
    return rtn;
};
/**
 * Returns a new clone of the given "type" object, with its
 * `indirection` level decremented by 1.
 *
 * @param {Object|String} type The "type" object to create a dereference type from. Strings get coerced first.
 * @return {Object} The new "type" object with its `indirection` decremented by 1.
 */ exports.derefType = function derefType(type) {
    const _type = exports.coerceType(type);
    if (_type.indirection === 1) throw new Error("Cannot create deref'd type for type with indirection 1");
    let rtn = Object.getPrototypeOf(_type);
    if (rtn.indirection !== _type.indirection - 1) {
        // slow case
        rtn = Object.create(_type);
        rtn.indirection--;
    }
    return rtn;
};
/**
 * Coerces a "type" object from a String or an actual "type" object. String values
 * are looked up from the `ref.types` Object. So:
 *
 *   * `"int"` gets coerced into `ref.types.int`.
 *   * `"int *"` gets translated into `ref.refType(ref.types.int)`
 *   * `ref.types.int` gets translated into `ref.types.int` (returns itself)
 *
 * Throws an Error if no valid "type" object could be determined. Most `ref`
 * functions use this function under the hood, so anywhere a "type" object is
 * expected, a String may be passed as well, including simply setting the
 * `buffer.type` property.
 *
 * ```
 * var type = ref.coerceType('int **');
 *
 * console.log(type.indirection);
 * 3
 * ```
 *
 * @param {Object|String} type The "type" Object or String to coerce.
 * @return {Object} A "type" object
 */ exports.coerceType = function coerceType(type) {
    let rtn = type;
    if (typeof rtn === "string") {
        rtn = exports.types[type];
        if (rtn) return rtn;
        // strip whitespace
        rtn = type.replace(/\s+/g, "").toLowerCase();
        if (rtn === "pointer") // legacy "pointer" being used :(
        rtn = exports.refType(exports.types.void); // void *
        else if (rtn === "string") rtn = exports.types.CString; // special char * type
        else {
            var refCount = 0;
            rtn = rtn.replace(/\*/g, function() {
                refCount++;
                return "";
            });
            // allow string names to be passed in
            rtn = exports.types[rtn];
            if (refCount > 0) {
                if (!(rtn && "size" in rtn && "indirection" in rtn)) throw new TypeError('could not determine a proper "type" from: ' + $401bdfd22e3e107a$require$inspect(type));
                for(let i = 0; i < refCount; i++)rtn = exports.refType(rtn);
            }
        }
    }
    if (!(rtn && "size" in rtn && "indirection" in rtn)) throw new TypeError('could not determine a proper "type" from: ' + $401bdfd22e3e107a$require$inspect(type));
    return rtn;
};
/**
 * Returns the "type" property of the given Buffer.
 * Creates a default type for the buffer when none exists.
 *
 * @param {Buffer} buffer The Buffer instance to get the "type" object from.
 * @return {Object} The "type" object from the given Buffer.
 */ exports.getType = function getType(buffer) {
    if (!buffer.type) {
        debug('WARN: no "type" found on buffer, setting default "type"', buffer);
        buffer.type = {};
        buffer.type.size = buffer.length;
        buffer.type.indirection = 1;
        buffer.type.get = function get() {
            throw new Error('unknown "type"; cannot get()');
        };
        buffer.type.set = function set() {
            throw new Error('unknown "type"; cannot set()');
        };
    }
    return exports.coerceType(buffer.type);
};
/**
 * Calls the `get()` function of the Buffer's current "type" (or the
 * passed in _type_ if present) at the given _offset_.
 *
 * This function handles checking the "indirection" level and returning a
 * proper "dereferenced" Bufffer instance when necessary.
 *
 * @param {Buffer} buffer The Buffer instance to read from.
 * @param {Number} offset (optional) The offset on the Buffer to start reading from. Defaults to 0.
 * @param {Object|String} type (optional) The "type" object to use when reading. Defaults to calling `getType()` on the buffer.
 * @return {?} Whatever value the "type" used when reading returns.
 */ exports.get = function get(buffer, offset, type) {
    if (!offset) offset = 0;
    if (type) type = exports.coerceType(type);
    else type = exports.getType(buffer);
    debug("get(): (offset: %d)", offset, buffer);
    $lJiUQ$assert(type.indirection > 0, `"indirection" level must be at least 1, saw ${type.indirection}`);
    if (type.indirection === 1) // need to check "type"
    return type.get(buffer, offset);
    else {
        // need to create a deref'd Buffer
        const size = type.indirection === 2 ? type.size : exports.sizeof.pointer;
        const reference = exports.readPointer(buffer, offset, size);
        reference.type = exports.derefType(type);
        return reference;
    }
};
/**
 * Calls the `set()` function of the Buffer's current "type" (or the
 * passed in _type_ if present) at the given _offset_.
 *
 * This function handles checking the "indirection" level writing a pointer rather
 * than calling the `set()` function if the indirection is greater than 1.
 *
 * @param {Buffer} buffer The Buffer instance to write to.
 * @param {Number} offset The offset on the Buffer to start writing to.
 * @param {?} value The value to write to the Buffer instance.
 * @param {Object|String} type (optional) The "type" object to use when reading. Defaults to calling `getType()` on the buffer.
 */ exports.set = function set(buffer, offset, value, type) {
    if (!offset) offset = 0;
    if (type) type = exports.coerceType(type);
    else type = exports.getType(buffer);
    debug("set(): (offset: %d)", offset, buffer, value);
    $lJiUQ$assert(type.indirection >= 1, '"indirection" level must be at least 1');
    if (type.indirection === 1) type.set(buffer, offset, value);
    else exports.writePointer(buffer, offset, value);
};
/**
 * Returns a new Buffer instance big enough to hold `type`,
 * with the given `value` written to it.
 *
 * ``` js
 * var intBuf = ref.alloc(ref.types.int)
 * var int_with_4 = ref.alloc(ref.types.int, 4)
 * ```
 *
 * @param {Object|String} type The "type" object to allocate. Strings get coerced first.
 * @param {?} value (optional) The initial value set on the returned Buffer, using _type_'s `set()` function.
 * @return {Buffer} A new Buffer instance with it's `type` set to "type", and (optionally) "value" written to it.
 */ exports.alloc = function alloc(_type, value) {
    var type = exports.coerceType(_type);
    debug('allocating Buffer for type with "size"', type.size);
    let size;
    if (type.indirection === 1) size = type.size;
    else size = exports.sizeof.pointer;
    const buffer = Buffer.alloc(size);
    buffer.type = type;
    if (arguments.length >= 2) {
        debug("setting value on allocated buffer", value);
        exports.set(buffer, 0, value, type);
    }
    return buffer;
};
/**
 * Returns a new `Buffer` instance with the given String written to it with the
 * given encoding (defaults to __'utf8'__). The buffer is 1 byte longer than the
 * string itself, and is NUL terminated.
 *
 * ```
 * var buf = ref.allocCString('hello world');
 *
 * console.log(buf.toString());
 * 'hello world\u0000'
 * ```
 *
 * @param {String} string The JavaScript string to be converted to a C string.
 * @param {String} encoding (optional) The encoding to use for the C string. Defaults to __'utf8'__.
 * @return {Buffer} The new `Buffer` instance with the specified String wrtten to it, and a trailing NUL byte.
 */ exports.allocCString = function allocCString(string, encoding) {
    if (null == string || Buffer.isBuffer(string) && exports.isNull(string)) return exports.NULL;
    const size = Buffer.byteLength(string, encoding) + 1;
    const buffer = Buffer.allocUnsafe(size);
    exports.writeCString(buffer, 0, string, encoding);
    buffer.type = charPtrType;
    return buffer;
};
/**
 * Writes the given string as a C String (NULL terminated) to the given buffer
 * at the given offset. "encoding" is optional and defaults to __'utf8'__.
 *
 * Unlike `readCString()`, this function requires the buffer to actually have the
 * proper length.
 *
 * @param {Buffer} buffer The Buffer instance to write to.
 * @param {Number} offset The offset of the buffer to begin writing at.
 * @param {String} string The JavaScript String to write that will be written to the buffer.
 * @param {String} encoding (optional) The encoding to read the C string as. Defaults to __'utf8'__.
 */ exports.writeCString = function writeCString(buffer, offset, string, encoding) {
    $lJiUQ$assert(Buffer.isBuffer(buffer), "expected a Buffer as the first argument");
    $lJiUQ$assert.strictEqual("string", typeof string, 'expected a "string" as the third argument');
    if (!offset) offset = 0;
    if (!encoding) encoding = "utf8";
    const size = buffer.length - offset - 1;
    const len = buffer.write(string, offset, size, encoding);
    buffer.writeUInt8(0, offset + len); // NUL terminate
};
exports["readInt64" + exports.endianness] = exports.readInt64;
exports["readUInt64" + exports.endianness] = exports.readUInt64;
exports["writeInt64" + exports.endianness] = exports.writeInt64;
exports["writeUInt64" + exports.endianness] = exports.writeUInt64;
var opposite = exports.endianness == "LE" ? "BE" : "LE";
var int64temp = Buffer.alloc(exports.sizeof.int64);
var uint64temp = Buffer.alloc(exports.sizeof.uint64);
exports["readInt64" + opposite] = function(buffer, offset) {
    for(let i = 0; i < exports.sizeof.int64; i++)int64temp[i] = buffer[offset + exports.sizeof.int64 - i - 1];
    return exports.readInt64(int64temp, 0);
};
exports["readUInt64" + opposite] = function(buffer, offset) {
    for(let i = 0; i < exports.sizeof.uint64; i++)uint64temp[i] = buffer[offset + exports.sizeof.uint64 - i - 1];
    return exports.readUInt64(uint64temp, 0);
};
exports["writeInt64" + opposite] = function(buffer, offset, value) {
    exports.writeInt64(int64temp, 0, value);
    for(let i = 0; i < exports.sizeof.int64; i++)buffer[offset + i] = int64temp[exports.sizeof.int64 - i - 1];
};
exports["writeUInt64" + opposite] = function(buffer, offset, value) {
    exports.writeUInt64(uint64temp, 0, value);
    for(let i = 0; i < exports.sizeof.uint64; i++)buffer[offset + i] = uint64temp[exports.sizeof.uint64 - i - 1];
};
/**
 * `ref()` accepts a Buffer instance and returns a new Buffer
 * instance that is "pointer" sized and has its data pointing to the given
 * Buffer instance. Essentially the created Buffer is a "reference" to the
 * original pointer, equivalent to the following C code:
 *
 * ``` c
 * char *buf = buffer;
 * char **ref = &buf;
 * ```
 *
 * @param {Buffer} buffer A Buffer instance to create a reference to.
 * @return {Buffer} A new Buffer instance pointing to _buffer_.
 */ exports.ref = function ref(buffer) {
    debug("creating a reference to buffer", buffer);
    var type = exports.refType(exports.getType(buffer));
    return exports.alloc(type, buffer);
};
/**
 * Accepts a Buffer instance and attempts to "dereference" it.
 * That is, first it checks the `indirection` count of _buffer_'s "type", and if
 * it's greater than __1__ then it merely returns another Buffer, but with one
 * level less `indirection`.
 *
 * When _buffer_'s indirection is at __1__, then it checks for `buffer.type`
 * which should be an Object with its own `get()` function.
 *
 * ```
 * var buf = ref.alloc('int', 6);
 *
 * var val = ref.deref(buf);
 * console.log(val);
 * 6
 * ```
 *
 *
 * @param {Buffer} buffer A Buffer instance to dereference.
 * @return {?} The returned value after dereferencing _buffer_.
 */ exports.deref = function deref(buffer) {
    debug("dereferencing buffer", buffer);
    return exports.get(buffer);
};
const kAttachedRefs = Symbol("attached");
/**
 * Attaches _object_ to _buffer_ such that it prevents _object_ from being garbage
 * collected until _buffer_ does.
 *
 * @param {Buffer} buffer A Buffer instance to attach _object_ to.
 * @param {Object|Buffer} object An Object or Buffer to prevent from being garbage collected until _buffer_ does.
 * @api private
 */ exports._attach = function _attach(buf, obj) {
    if (!buf[kAttachedRefs]) buf[kAttachedRefs] = [];
    buf[kAttachedRefs].push(obj);
};
/**
 * @param {Buffer} buffer
 * @param {Number} offset
 * @param {Object} object
 * @name _writeObject
 * @api private
 */ /**
 * Writes a pointer to _object_ into _buffer_ at the specified _offset.
 *
 * This function "attaches" _object_ to _buffer_ to prevent it from being garbage
 * collected.
 *
 * ```
 * var buf = ref.alloc('Object');
 * ref.writeObject(buf, 0, { foo: 'bar' });
 *
 * ```
 *
 * @param {Buffer} buffer A Buffer instance to write _object_ to.
 * @param {Number} offset The offset on the Buffer to start writing at.
 * @param {Object} object The Object to be written into _buffer_.
 */ exports.writeObject = function writeObject(buf, offset, obj) {
    debug("writing Object to buffer", buf, offset, obj);
    exports._writeObject(buf, offset, obj);
    exports._attach(buf, obj);
};
/**
 * Same as `ref.writePointer()`, except that this version does not attach
 * _pointer_ to _buffer_, which is potentially unsafe if the garbage collector
 * runs.
 *
 * @param {Buffer} buffer A Buffer instance to write _pointer to.
 * @param {Number} offset The offset on the Buffer to start writing at.
 * @param {Buffer} pointer The Buffer instance whose memory address will be written to _buffer_.
 * @name _writePointer
 * @api private
 */ /**
 * Writes the memory address of _pointer_ to _buffer_ at the specified _offset_.
 *
 * This function "attaches" _object_ to _buffer_ to prevent it from being garbage
 * collected.
 *
 * ```
 * var someBuffer = new Buffer('whatever');
 * var buf = ref.alloc('pointer');
 * ref.writePointer(buf, 0, someBuffer);
 * ```
 *
 * @param {Buffer} buffer A Buffer instance to write _pointer to.
 * @param {Number} offset The offset on the Buffer to start writing at.
 * @param {Buffer} pointer The Buffer instance whose memory address will be written to _buffer_.
 */ exports.writePointer = function writePointer(buf, offset, ptr) {
    debug("writing pointer to buffer", buf, offset, ptr);
    // Passing true as a fourth parameter does an a stronger
    // version of attach which ensures ptr is only collected after
    // the finalizer for buf has run. See
    // https://github.com/node-ffi-napi/ref-napi/issues/54
    // for why this is necessary
    exports._writePointer(buf, offset, ptr, true);
};
/**
 * Same as `ref.reinterpret()`, except that this version does not attach
 * _buffer_ to the returned Buffer, which is potentially unsafe if the
 * garbage collector runs.
 *
 * @param {Buffer} buffer A Buffer instance to base the returned Buffer off of.
 * @param {Number} size The `length` property of the returned Buffer.
 * @param {Number} offset The offset of the Buffer to begin from.
 * @return {Buffer} A new Buffer instance with the same memory address as _buffer_, and the requested _size_.
 * @name _reinterpret
 * @api private
 */ /**
 * Returns a new Buffer instance with the specified _size_, with the same memory
 * address as _buffer_.
 *
 * This function "attaches" _buffer_ to the returned Buffer to prevent it from
 * being garbage collected.
 *
 * @param {Buffer} buffer A Buffer instance to base the returned Buffer off of.
 * @param {Number} size The `length` property of the returned Buffer.
 * @param {Number} offset The offset of the Buffer to begin from.
 * @return {Buffer} A new Buffer instance with the same memory address as _buffer_, and the requested _size_.
 */ exports.reinterpret = function reinterpret(buffer, size, offset) {
    debug('reinterpreting buffer to "%d" bytes', size);
    const rtn = exports._reinterpret(buffer, size, offset || 0);
    exports._attach(rtn, buffer);
    return rtn;
};
/**
 * Same as `ref.reinterpretUntilZeros()`, except that this version does not
 * attach _buffer_ to the returned Buffer, which is potentially unsafe if the
 * garbage collector runs.
 *
 * @param {Buffer} buffer A Buffer instance to base the returned Buffer off of.
 * @param {Number} size The number of sequential, aligned `NULL` bytes that are required to terminate the buffer.
 * @param {Number} offset The offset of the Buffer to begin from.
 * @return {Buffer} A new Buffer instance with the same memory address as _buffer_, and a variable `length` that is terminated by _size_ NUL bytes.
 * @name _reinterpretUntilZeros
 * @api private
 */ /**
 * Accepts a `Buffer` instance and a number of `NULL` bytes to read from the
 * pointer. This function will scan past the boundary of the Buffer's `length`
 * until it finds `size` number of aligned `NULL` bytes.
 *
 * This is useful for finding the end of NUL-termintated array or C string. For
 * example, the `readCString()` function _could_ be implemented like:
 *
 * ```
 * function readCString (buf) {
 *   return ref.reinterpretUntilZeros(buf, 1).toString('utf8')
 * }
 * ```
 *
 * This function "attaches" _buffer_ to the returned Buffer to prevent it from
 * being garbage collected.
 *
 * @param {Buffer} buffer A Buffer instance to base the returned Buffer off of.
 * @param {Number} size The number of sequential, aligned `NULL` bytes are required to terminate the buffer.
 * @param {Number} offset The offset of the Buffer to begin from.
 * @return {Buffer} A new Buffer instance with the same memory address as _buffer_, and a variable `length` that is terminated by _size_ NUL bytes.
 */ exports.reinterpretUntilZeros = function reinterpretUntilZeros(buffer, size, offset) {
    debug('reinterpreting buffer to until "%d" NULL (0) bytes are found', size);
    var rtn = exports._reinterpretUntilZeros(buffer, size, offset || 0);
    exports._attach(rtn, buffer);
    return rtn;
};
// the built-in "types"
const types = exports.types = {};
/**
 * The `void` type.
 *
 * @section types
 */ types.void = {
    size: 0,
    indirection: 1,
    get: function get(buf, offset) {
        debug("getting `void` type (returns `null`)");
        return null;
    },
    set: function set(buf, offset, val) {
        debug("setting `void` type (no-op)");
    }
};
/**
 * The `int8` type.
 */ types.int8 = {
    size: exports.sizeof.int8,
    indirection: 1,
    get: function get(buf, offset) {
        return buf.readInt8(offset || 0);
    },
    set: function set(buf, offset, val) {
        if (typeof val === "string") val = val.charCodeAt(0);
        return buf.writeInt8(val, offset || 0);
    }
};
/**
 * The `uint8` type.
 */ types.uint8 = {
    size: exports.sizeof.uint8,
    indirection: 1,
    get: function get(buf, offset) {
        return buf.readUInt8(offset || 0);
    },
    set: function set(buf, offset, val) {
        if (typeof val === "string") val = val.charCodeAt(0);
        return buf.writeUInt8(val, offset || 0);
    }
};
/**
 * The `int16` type.
 */ types.int16 = {
    size: exports.sizeof.int16,
    indirection: 1,
    get: function get(buf, offset) {
        return buf["readInt16" + exports.endianness](offset || 0);
    },
    set: function set(buf, offset, val) {
        return buf["writeInt16" + exports.endianness](val, offset || 0);
    }
};
/**
 * The `uint16` type.
 */ types.uint16 = {
    size: exports.sizeof.uint16,
    indirection: 1,
    get: function get(buf, offset) {
        return buf["readUInt16" + exports.endianness](offset || 0);
    },
    set: function set(buf, offset, val) {
        return buf["writeUInt16" + exports.endianness](val, offset || 0);
    }
};
/**
 * The `int32` type.
 */ types.int32 = {
    size: exports.sizeof.int32,
    indirection: 1,
    get: function get(buf, offset) {
        return buf["readInt32" + exports.endianness](offset || 0);
    },
    set: function set(buf, offset, val) {
        return buf["writeInt32" + exports.endianness](val, offset || 0);
    }
};
/**
 * The `uint32` type.
 */ types.uint32 = {
    size: exports.sizeof.uint32,
    indirection: 1,
    get: function get(buf, offset) {
        return buf["readUInt32" + exports.endianness](offset || 0);
    },
    set: function set(buf, offset, val) {
        return buf["writeUInt32" + exports.endianness](val, offset || 0);
    }
};
/**
 * The `int64` type.
 */ types.int64 = {
    size: exports.sizeof.int64,
    indirection: 1,
    get: function get(buf, offset) {
        return buf["readInt64" + exports.endianness](offset || 0);
    },
    set: function set(buf, offset, val) {
        return buf["writeInt64" + exports.endianness](val, offset || 0);
    }
};
/**
 * The `uint64` type.
 */ types.uint64 = {
    size: exports.sizeof.uint64,
    indirection: 1,
    get: function get(buf, offset) {
        return buf["readUInt64" + exports.endianness](offset || 0);
    },
    set: function set(buf, offset, val) {
        return buf["writeUInt64" + exports.endianness](val, offset || 0);
    }
};
/**
 * The `float` type.
 */ types.float = {
    size: exports.sizeof.float,
    indirection: 1,
    get: function get(buf, offset) {
        return buf["readFloat" + exports.endianness](offset || 0);
    },
    set: function set(buf, offset, val) {
        return buf["writeFloat" + exports.endianness](val, offset || 0);
    }
};
/**
 * The `double` type.
 */ types.double = {
    size: exports.sizeof.double,
    indirection: 1,
    get: function get(buf, offset) {
        return buf["readDouble" + exports.endianness](offset || 0);
    },
    set: function set(buf, offset, val) {
        return buf["writeDouble" + exports.endianness](val, offset || 0);
    }
};
/**
 * The `Object` type. This can be used to read/write regular JS Objects
 * into raw memory.
 */ types.Object = {
    size: exports.sizeof.Object,
    indirection: 1,
    get: function get(buf, offset) {
        return buf.readObject(offset || 0);
    },
    set: function set(buf, offset, val) {
        return buf.writeObject(val, offset || 0);
    }
};
/**
 * The `CString` (a.k.a `"string"`) type.
 *
 * CStrings are a kind of weird thing. We say it's `sizeof(char *)`, and
 * `indirection` level of 1, which means that we have to return a Buffer that
 * is pointer sized, and points to a some utf8 string data, so we have to create
 * a 2nd "in-between" buffer.
 */ types.CString = {
    size: exports.sizeof.pointer,
    alignment: exports.alignof.pointer,
    indirection: 1,
    get: function get(buf, offset) {
        const _buf = exports.readPointer(buf, offset);
        if (exports.isNull(_buf)) return null;
        return exports.readCString(_buf, 0);
    },
    set: function set(buf, offset, val) {
        let _buf;
        if (Buffer.isBuffer(val)) _buf = val;
        else // assume string
        _buf = exports.allocCString(val);
        return exports.writePointer(buf, offset, _buf);
    }
};
// alias Utf8String
var utfstringwarned = false;
Object.defineProperty(types, "Utf8String", {
    enumerable: false,
    configurable: true,
    get: function() {
        if (!utfstringwarned) {
            utfstringwarned = true;
            console.error('"Utf8String" type is deprecated, use "CString" instead');
        }
        return types.CString;
    }
});
/**
 * The `bool` type.
 *
 * Wrapper type around `types.uint8` that accepts/returns `true` or
 * `false` Boolean JavaScript values.
 *
 * @name bool
 *
 */ /**
 * The `byte` type.
 *
 * @name byte
 */ /**
 * The `char` type.
 *
 * @name char
 */ /**
 * The `uchar` type.
 *
 * @name uchar
 */ /**
 * The `short` type.
 *
 * @name short
 */ /**
 * The `ushort` type.
 *
 * @name ushort
 */ /**
 * The `int` type.
 *
 * @name int
 */ /**
 * The `uint` type.
 *
 * @name uint
 */ /**
 * The `long` type.
 *
 * @name long
 */ /**
 * The `ulong` type.
 *
 * @name ulong
 */ /**
 * The `longlong` type.
 *
 * @name longlong
 */ /**
 * The `ulonglong` type.
 *
 * @name ulonglong
 */ /**
 * The `size_t` type.
 *
 * @name size_t
 */ // "typedef"s for the variable-sized types
[
    "bool",
    "byte",
    "char",
    "uchar",
    "short",
    "ushort",
    "int",
    "uint",
    "long",
    "ulong",
    "longlong",
    "ulonglong",
    "size_t"
].forEach((name)=>{
    const unsigned = name === "bool" || name === "byte" || name === "size_t" || name[0] === "u";
    const size = exports.sizeof[name];
    $lJiUQ$assert(size >= 1 && size <= 8);
    let typeName = "int" + size * 8;
    if (unsigned) typeName = "u" + typeName;
    const type = exports.types[typeName];
    $lJiUQ$assert(type);
    exports.types[name] = Object.create(type);
});
// set the "alignment" property on the built-in types
Object.keys(exports.alignof).forEach((name)=>{
    if (name === "pointer") return;
    exports.types[name].alignment = exports.alignof[name];
    $lJiUQ$assert(exports.types[name].alignment > 0);
});
// make the `bool` type work with JS true/false values
exports.types.bool.get = function(_get) {
    return function get(buf, offset) {
        return _get(buf, offset) ? true : false;
    };
}(exports.types.bool.get);
exports.types.bool.set = function(_set) {
    return function set(buf, offset, val) {
        if (typeof val !== "number") val = val ? 1 : 0;
        return _set(buf, offset, val);
    };
}(exports.types.bool.set);
/*!
 * Set the `name` property of the types. Used for debugging...
 */ Object.keys(exports.types).forEach((name)=>{
    exports.types[name].name = name;
});
/*!
 * This `char *` type is used by "allocCString()" above.
 */ const charPtrType = exports.refType(exports.types.char);
/*!
 * Set the `type` property of the `NULL` pointer Buffer object.
 */ exports.NULL.type = exports.types.void;
/**
 * `NULL_POINTER` is a pointer-sized `Buffer` instance pointing to `NULL`.
 * Conceptually, it's equivalent to the following C code:
 *
 * ``` c
 * char *null_pointer;
 * null_pointer = NULL;
 * ```
 *
 * @type Buffer
 */ exports.NULL_POINTER = exports.ref(exports.NULL);
/**
 * All these '...' comment blocks below are for the documentation generator.
 *
 * @section buffer
 */ Buffer.prototype.address = function address() {
    return exports.address(this, 0);
};
/**
 * ...
 */ Buffer.prototype.hexAddress = function hexAddress() {
    return exports.hexAddress(this, 0);
};
/**
 * ...
 */ Buffer.prototype.isNull = function isNull() {
    return exports.isNull(this, 0);
};
/**
 * ...
 */ Buffer.prototype.ref = function ref() {
    return exports.ref(this);
};
/**
 * ...
 */ Buffer.prototype.deref = function deref() {
    return exports.deref(this);
};
/**
 * ...
 */ Buffer.prototype.readObject = function readObject(offset) {
    return exports.readObject(this, offset);
};
/**
 * ...
 */ Buffer.prototype.writeObject = function writeObject(obj, offset) {
    return exports.writeObject(this, offset, obj);
};
/**
 * ...
 */ Buffer.prototype.readPointer = function readPointer(offset, size) {
    return exports.readPointer(this, offset, size);
};
/**
 * ...
 */ Buffer.prototype.writePointer = function writePointer(ptr, offset) {
    return exports.writePointer(this, offset, ptr);
};
/**
 * ...
 */ Buffer.prototype.readCString = function readCString(offset) {
    return exports.readCString(this, offset);
};
/**
 * ...
 */ Buffer.prototype.writeCString = function writeCString(string, offset, encoding) {
    return exports.writeCString(this, offset, string, encoding);
};
/**
 * ...
 */ Buffer.prototype.readInt64BE = function readInt64BE(offset) {
    return exports.readInt64BE(this, offset);
};
/**
 * ...
 */ Buffer.prototype.writeInt64BE = function writeInt64BE(val, offset) {
    return exports.writeInt64BE(this, offset, val);
};
/**
 * ...
 */ Buffer.prototype.readUInt64BE = function readUInt64BE(offset) {
    return exports.readUInt64BE(this, offset);
};
/**
 * ...
 */ Buffer.prototype.writeUInt64BE = function writeUInt64BE(val, offset) {
    return exports.writeUInt64BE(this, offset, val);
};
/**
 * ...
 */ Buffer.prototype.readInt64LE = function readInt64LE(offset) {
    return exports.readInt64LE(this, offset);
};
/**
 * ...
 */ Buffer.prototype.writeInt64LE = function writeInt64LE(val, offset) {
    return exports.writeInt64LE(this, offset, val);
};
/**
 * ...
 */ Buffer.prototype.readUInt64LE = function readUInt64LE(offset) {
    return exports.readUInt64LE(this, offset);
};
/**
 * ...
 */ Buffer.prototype.writeUInt64LE = function writeUInt64LE(val, offset) {
    return exports.writeUInt64LE(this, offset, val);
};
/**
 * ...
 */ Buffer.prototype.reinterpret = function reinterpret(size, offset) {
    return exports.reinterpret(this, size, offset);
};
/**
 * ...
 */ Buffer.prototype.reinterpretUntilZeros = function reinterpretUntilZeros(size, offset) {
    return exports.reinterpretUntilZeros(this, size, offset);
};
/**
 * `ref` overwrites the default `Buffer#inspect()` function to include the
 * hex-encoded memory address of the Buffer instance when invoked.
 *
 * This is simply a nice-to-have.
 *
 * **Before**:
 *
 * ``` js
 * console.log(new Buffer('ref'));
 * <Buffer 72 65 66>
 * ```
 *
 * **After**:
 *
 * ``` js
 * console.log(new Buffer('ref'));
 * <Buffer@0x103015490 72 65 66>
 * ```
 */ var inspectSym = $401bdfd22e3e107a$require$inspect.custom || "inspect";
/**
 * in node 6.91, inspect.custom does not give a correct value; so in this case, don't torch the whole process.
 * fixed in >6.9.2
 */ if (Buffer.prototype[inspectSym]) Buffer.prototype[inspectSym] = overwriteInspect(Buffer.prototype[inspectSym]);

// does SlowBuffer inherit from Buffer? (node >= v0.7.9)
if (!(exports.NULL instanceof Buffer)) {
    debug("extending SlowBuffer's prototype since it doesn't inherit from Buffer.prototype");
    /*!
   * SlowBuffer convenience methods.
   */ var SlowBuffer = $lJiUQ$buffer.SlowBuffer;
    SlowBuffer.prototype.address = Buffer.prototype.address;
    SlowBuffer.prototype.hexAddress = Buffer.prototype.hexAddress;
    SlowBuffer.prototype.isNull = Buffer.prototype.isNull;
    SlowBuffer.prototype.ref = Buffer.prototype.ref;
    SlowBuffer.prototype.deref = Buffer.prototype.deref;
    SlowBuffer.prototype.readObject = Buffer.prototype.readObject;
    SlowBuffer.prototype.writeObject = Buffer.prototype.writeObject;
    SlowBuffer.prototype.readPointer = Buffer.prototype.readPointer;
    SlowBuffer.prototype.writePointer = Buffer.prototype.writePointer;
    SlowBuffer.prototype.readCString = Buffer.prototype.readCString;
    SlowBuffer.prototype.writeCString = Buffer.prototype.writeCString;
    SlowBuffer.prototype.reinterpret = Buffer.prototype.reinterpret;
    SlowBuffer.prototype.reinterpretUntilZeros = Buffer.prototype.reinterpretUntilZeros;
    SlowBuffer.prototype.readInt64BE = Buffer.prototype.readInt64BE;
    SlowBuffer.prototype.writeInt64BE = Buffer.prototype.writeInt64BE;
    SlowBuffer.prototype.readUInt64BE = Buffer.prototype.readUInt64BE;
    SlowBuffer.prototype.writeUInt64BE = Buffer.prototype.writeUInt64BE;
    SlowBuffer.prototype.readInt64LE = Buffer.prototype.readInt64LE;
    SlowBuffer.prototype.writeInt64LE = Buffer.prototype.writeInt64LE;
    SlowBuffer.prototype.readUInt64LE = Buffer.prototype.readUInt64LE;
    SlowBuffer.prototype.writeUInt64LE = Buffer.prototype.writeUInt64LE;
    /**
 * in node 6.9.1, inspect.custom does not give a correct value; so in this case, don't torch the whole process.
 * fixed in >6.9.2
 */ if (SlowBuffer.prototype[inspectSym]) SlowBuffer.prototype[inspectSym] = overwriteInspect(SlowBuffer.prototype[inspectSym]);
}
function overwriteInspect(inspect1) {
    if (inspect1.name === "refinspect") return inspect1;
    else return function refinspect() {
        var v = inspect1.apply(this, arguments);
        return v.replace("Buffer", "Buffer@0x" + this.hexAddress());
    };
}

});
parcelRequire.register("ikpZ8", function(module, exports) {


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) module.exports = (parcelRequire("6OJo6"));
else module.exports = (parcelRequire("bPDUQ"));

});
parcelRequire.register("6OJo6", function(module, exports) {
/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ module.exports.formatArgs = $4f6a9ea23b8227d8$var$formatArgs;
module.exports.save = $4f6a9ea23b8227d8$var$save;
module.exports.load = $4f6a9ea23b8227d8$var$load;
module.exports.useColors = $4f6a9ea23b8227d8$var$useColors;
module.exports.storage = $4f6a9ea23b8227d8$var$localstorage();
module.exports.destroy = (()=>{
    let warned = false;
    return ()=>{
        if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
    };
})();
/**
 * Colors.
 */ module.exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function $4f6a9ea23b8227d8$var$useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function $4f6a9ea23b8227d8$var$formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
    if (!this.useColors) return;
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match)=>{
        if (match === "%%") return;
        index++;
        if (match === "%c") // We only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */ module.exports.log = console.debug || console.log || (()=>{});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function $4f6a9ea23b8227d8$var$save(namespaces) {
    try {
        if (namespaces) module.exports.storage.setItem("debug", namespaces);
        else module.exports.storage.removeItem("debug");
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function $4f6a9ea23b8227d8$var$load() {
    let r;
    try {
        r = module.exports.storage.getItem("debug");
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function $4f6a9ea23b8227d8$var$localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}

module.exports = (parcelRequire("lpjBn"))(module.exports);
const { formatters: $4f6a9ea23b8227d8$var$formatters  } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ $4f6a9ea23b8227d8$var$formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
    }
};

});
parcelRequire.register("lpjBn", function(module, exports) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function $f95b2348ec1e8b71$var$setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = (parcelRequire("ltvdB"));
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key)=>{
        createDebug[key] = env[key];
    });
    /**
	* The currently active debug mode names, and names to skip.
	*/ createDebug.names = [];
    createDebug.skips = [];
    /**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/ createDebug.formatters = {};
    /**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/ function selectColor(namespace) {
        let hash = 0;
        for(let i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/ function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
            // Disabled?
            if (!debug.enabled) return;
            const self = debug;
            // Set `diff` timestamp
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") // Anything else let's inspect with %O
            args.unshift("%O");
            // Apply any `formatters` transformations
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format)=>{
                // If we encounter an escaped % then don't increase the array index
                if (match === "%%") return "%";
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === "function") {
                    const val = args[index];
                    match = formatter.call(self, val);
                    // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.
        Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: ()=>{
                if (enableOverride !== null) return enableOverride;
                if (namespacesCache !== createDebug.namespaces) {
                    namespacesCache = createDebug.namespaces;
                    enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
            },
            set: (v)=>{
                enableOverride = v;
            }
        });
        // Env-specific initialization logic for debug instances
        if (typeof createDebug.init === "function") createDebug.init(debug);
        return debug;
    }
    function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
    }
    /**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for(i = 0; i < len; i++){
            if (!split[i]) continue;
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
            else createDebug.names.push(new RegExp("^" + namespaces + "$"));
        }
    }
    /**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/ function disable() {
        const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace)=>"-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
    }
    /**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/ function enabled(name) {
        if (name[name.length - 1] === "*") return true;
        let i;
        let len;
        for(i = 0, len = createDebug.skips.length; i < len; i++){
            if (createDebug.skips[i].test(name)) return false;
        }
        for(i = 0, len = createDebug.names.length; i < len; i++){
            if (createDebug.names[i].test(name)) return true;
        }
        return false;
    }
    /**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/ function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    /**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/ function coerce(val) {
        if (val instanceof Error) return val.stack || val.message;
        return val;
    }
    /**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/ function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = $f95b2348ec1e8b71$var$setup;

});
parcelRequire.register("ltvdB", function(module, exports) {
/**
 * Helpers.
 */ var $fa2485b77366ba03$var$s = 1000;
var $fa2485b77366ba03$var$m = $fa2485b77366ba03$var$s * 60;
var $fa2485b77366ba03$var$h = $fa2485b77366ba03$var$m * 60;
var $fa2485b77366ba03$var$d = $fa2485b77366ba03$var$h * 24;
var $fa2485b77366ba03$var$w = $fa2485b77366ba03$var$d * 7;
var $fa2485b77366ba03$var$y = $fa2485b77366ba03$var$d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) return $fa2485b77366ba03$var$parse(val);
    else if (type === "number" && isFinite(val)) return options.long ? $fa2485b77366ba03$var$fmtLong(val) : $fa2485b77366ba03$var$fmtShort(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function $fa2485b77366ba03$var$parse(str) {
    str = String(str);
    if (str.length > 100) return;
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) return;
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch(type){
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
            return n * $fa2485b77366ba03$var$y;
        case "weeks":
        case "week":
        case "w":
            return n * $fa2485b77366ba03$var$w;
        case "days":
        case "day":
        case "d":
            return n * $fa2485b77366ba03$var$d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * $fa2485b77366ba03$var$h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * $fa2485b77366ba03$var$m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * $fa2485b77366ba03$var$s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $fa2485b77366ba03$var$fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $fa2485b77366ba03$var$d) return Math.round(ms / $fa2485b77366ba03$var$d) + "d";
    if (msAbs >= $fa2485b77366ba03$var$h) return Math.round(ms / $fa2485b77366ba03$var$h) + "h";
    if (msAbs >= $fa2485b77366ba03$var$m) return Math.round(ms / $fa2485b77366ba03$var$m) + "m";
    if (msAbs >= $fa2485b77366ba03$var$s) return Math.round(ms / $fa2485b77366ba03$var$s) + "s";
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $fa2485b77366ba03$var$fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $fa2485b77366ba03$var$d) return $fa2485b77366ba03$var$plural(ms, msAbs, $fa2485b77366ba03$var$d, "day");
    if (msAbs >= $fa2485b77366ba03$var$h) return $fa2485b77366ba03$var$plural(ms, msAbs, $fa2485b77366ba03$var$h, "hour");
    if (msAbs >= $fa2485b77366ba03$var$m) return $fa2485b77366ba03$var$plural(ms, msAbs, $fa2485b77366ba03$var$m, "minute");
    if (msAbs >= $fa2485b77366ba03$var$s) return $fa2485b77366ba03$var$plural(ms, msAbs, $fa2485b77366ba03$var$s, "second");
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function $fa2485b77366ba03$var$plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}

});



parcelRequire.register("bPDUQ", function(module, exports) {


/**
 * This is the Node.js implementation of `debug()`.
 */ module.exports.init = $89d36b94e5e0ded8$var$init;
module.exports.log = $89d36b94e5e0ded8$var$log;
module.exports.formatArgs = $89d36b94e5e0ded8$var$formatArgs;
module.exports.save = $89d36b94e5e0ded8$var$save;
module.exports.load = $89d36b94e5e0ded8$var$load;
module.exports.useColors = $89d36b94e5e0ded8$var$useColors;
module.exports.destroy = $lJiUQ$util.deprecate(()=>{}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
/**
 * Colors.
 */ module.exports.colors = [
    6,
    2,
    3,
    4,
    5,
    1
];

try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    const supportsColor = (parcelRequire("dd4nP"));
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) module.exports.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
    ];
} catch (error) {
// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */ module.exports.inspectOpts = Object.keys(process.env).filter((key)=>{
    return /^debug_/i.test(key);
}).reduce((obj, key)=>{
    // Camel-case
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k)=>{
        return k.toUpperCase();
    });
    // Coerce string value into JS value
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
    else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
    else if (val === "null") val = null;
    else val = Number(val);
    obj[prop] = val;
    return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */ function $89d36b94e5e0ded8$var$useColors() {
    return "colors" in module.exports.inspectOpts ? Boolean(module.exports.inspectOpts.colors) : $lJiUQ$tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function $89d36b94e5e0ded8$var$formatArgs(args) {
    const { namespace: name , useColors: useColors1  } = this;
    if (useColors1) {
        const c = this.color;
        const colorCode = "\x1b[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \u001B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1b[0m");
    } else args[0] = $89d36b94e5e0ded8$var$getDate() + name + " " + args[0];
}
function $89d36b94e5e0ded8$var$getDate() {
    if (module.exports.inspectOpts.hideDate) return "";
    return new Date().toISOString() + " ";
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */ function $89d36b94e5e0ded8$var$log(...args) {
    return process.stderr.write($lJiUQ$util.format(...args) + "\n");
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function $89d36b94e5e0ded8$var$save(namespaces) {
    if (namespaces) process.env.DEBUG = namespaces;
    else // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function $89d36b94e5e0ded8$var$load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function $89d36b94e5e0ded8$var$init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(module.exports.inspectOpts);
    for(let i = 0; i < keys.length; i++)debug.inspectOpts[keys[i]] = module.exports.inspectOpts[keys[i]];
}

module.exports = (parcelRequire("lpjBn"))(module.exports);
const { formatters: $89d36b94e5e0ded8$var$formatters  } = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ $89d36b94e5e0ded8$var$formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return $lJiUQ$util.inspect(v, this.inspectOpts).split("\n").map((str)=>str.trim()).join(" ");
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ $89d36b94e5e0ded8$var$formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return $lJiUQ$util.inspect(v, this.inspectOpts);
};

});
parcelRequire.register("dd4nP", function(module, exports) {
"use strict";



var $fb6QU = parcelRequire("fb6QU");
const { env: $99dfe3b07a37c5bb$var$env  } = process;
let $99dfe3b07a37c5bb$var$forceColor;
if ($fb6QU("no-color") || $fb6QU("no-colors") || $fb6QU("color=false") || $fb6QU("color=never")) $99dfe3b07a37c5bb$var$forceColor = 0;
else if ($fb6QU("color") || $fb6QU("colors") || $fb6QU("color=true") || $fb6QU("color=always")) $99dfe3b07a37c5bb$var$forceColor = 1;
if ("FORCE_COLOR" in $99dfe3b07a37c5bb$var$env) {
    if ($99dfe3b07a37c5bb$var$env.FORCE_COLOR === "true") $99dfe3b07a37c5bb$var$forceColor = 1;
    else if ($99dfe3b07a37c5bb$var$env.FORCE_COLOR === "false") $99dfe3b07a37c5bb$var$forceColor = 0;
    else $99dfe3b07a37c5bb$var$forceColor = $99dfe3b07a37c5bb$var$env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt($99dfe3b07a37c5bb$var$env.FORCE_COLOR, 10), 3);
}
function $99dfe3b07a37c5bb$var$translateLevel(level) {
    if (level === 0) return false;
    return {
        level: level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
    };
}
function $99dfe3b07a37c5bb$var$supportsColor(haveStream, streamIsTTY) {
    if ($99dfe3b07a37c5bb$var$forceColor === 0) return 0;
    if ($fb6QU("color=16m") || $fb6QU("color=full") || $fb6QU("color=truecolor")) return 3;
    if ($fb6QU("color=256")) return 2;
    if (haveStream && !streamIsTTY && $99dfe3b07a37c5bb$var$forceColor === undefined) return 0;
    const min = $99dfe3b07a37c5bb$var$forceColor || 0;
    if ($99dfe3b07a37c5bb$var$env.TERM === "dumb") return min;
    if (process.platform === "win32") {
        // Windows 10 build 10586 is the first Windows release that supports 256 colors.
        // Windows 10 build 14931 is the first release that supports 16m/TrueColor.
        const osRelease = $lJiUQ$os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
        return 1;
    }
    if ("CI" in $99dfe3b07a37c5bb$var$env) {
        if ([
            "TRAVIS",
            "CIRCLECI",
            "APPVEYOR",
            "GITLAB_CI",
            "GITHUB_ACTIONS",
            "BUILDKITE"
        ].some((sign)=>sign in $99dfe3b07a37c5bb$var$env) || $99dfe3b07a37c5bb$var$env.CI_NAME === "codeship") return 1;
        return min;
    }
    if ("TEAMCITY_VERSION" in $99dfe3b07a37c5bb$var$env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test($99dfe3b07a37c5bb$var$env.TEAMCITY_VERSION) ? 1 : 0;
    if ($99dfe3b07a37c5bb$var$env.COLORTERM === "truecolor") return 3;
    if ("TERM_PROGRAM" in $99dfe3b07a37c5bb$var$env) {
        const version = parseInt(($99dfe3b07a37c5bb$var$env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch($99dfe3b07a37c5bb$var$env.TERM_PROGRAM){
            case "iTerm.app":
                return version >= 3 ? 3 : 2;
            case "Apple_Terminal":
                return 2;
        }
    }
    if (/-256(color)?$/i.test($99dfe3b07a37c5bb$var$env.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test($99dfe3b07a37c5bb$var$env.TERM)) return 1;
    if ("COLORTERM" in $99dfe3b07a37c5bb$var$env) return 1;
    return min;
}
function $99dfe3b07a37c5bb$var$getSupportLevel(stream) {
    const level = $99dfe3b07a37c5bb$var$supportsColor(stream, stream && stream.isTTY);
    return $99dfe3b07a37c5bb$var$translateLevel(level);
}
module.exports = {
    supportsColor: $99dfe3b07a37c5bb$var$getSupportLevel,
    stdout: $99dfe3b07a37c5bb$var$translateLevel($99dfe3b07a37c5bb$var$supportsColor(true, $lJiUQ$tty.isatty(1))),
    stderr: $99dfe3b07a37c5bb$var$translateLevel($99dfe3b07a37c5bb$var$supportsColor(true, $lJiUQ$tty.isatty(2)))
};

});
parcelRequire.register("fb6QU", function(module, exports) {
"use strict";
module.exports = (flag, argv = process.argv)=>{
    const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf("--");
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};

});




parcelRequire.register("309gM", function(module, exports) {



// Workaround to fix webpack's build warnings: 'the request of a dependency is an expression'
var $22f88feb2ee92240$var$runtimeRequire = typeof __webpack_require__ === "function" ? __non_webpack_require__ : undefined // eslint-disable-line
;
var $22f88feb2ee92240$var$vars = process.config && process.config.variables || {};
var $22f88feb2ee92240$var$prebuildsOnly = !!process.env.PREBUILDS_ONLY;
var $22f88feb2ee92240$var$abi = process.versions.modules // TODO: support old node where this is undef
;
var $22f88feb2ee92240$var$runtime = $22f88feb2ee92240$var$isElectron() ? "electron" : $22f88feb2ee92240$var$isNwjs() ? "node-webkit" : "node";
var $22f88feb2ee92240$var$arch = $lJiUQ$os.arch();
var $22f88feb2ee92240$var$platform = $lJiUQ$os.platform();
var $22f88feb2ee92240$var$libc = process.env.LIBC || ($22f88feb2ee92240$var$isAlpine($22f88feb2ee92240$var$platform) ? "musl" : "glibc");
var $22f88feb2ee92240$var$armv = process.env.ARM_VERSION || ($22f88feb2ee92240$var$arch === "arm64" ? "8" : $22f88feb2ee92240$var$vars.arm_version) || "";
var $22f88feb2ee92240$var$uv = (process.versions.uv || "").split(".")[0];
module.exports = $22f88feb2ee92240$var$load;
function $22f88feb2ee92240$var$load(dir) {
    return $22f88feb2ee92240$var$runtimeRequire($22f88feb2ee92240$var$load.path(dir));
}
$22f88feb2ee92240$var$load.path = function(dir1) {
    dir1 = $lJiUQ$path.resolve(dir1 || ".");
    try {
        var name = $22f88feb2ee92240$var$runtimeRequire($lJiUQ$path.join(dir1, "package.json")).name.toUpperCase().replace(/-/g, "_");
        if (process.env[name + "_PREBUILD"]) dir1 = process.env[name + "_PREBUILD"];
    } catch (err) {}
    if (!$22f88feb2ee92240$var$prebuildsOnly) {
        var release = $22f88feb2ee92240$var$getFirst($lJiUQ$path.join(dir1, "build/Release"), $22f88feb2ee92240$var$matchBuild);
        if (release) return release;
        var debug = $22f88feb2ee92240$var$getFirst($lJiUQ$path.join(dir1, "build/Debug"), $22f88feb2ee92240$var$matchBuild);
        if (debug) return debug;
    }
    var prebuild = resolve(dir1);
    if (prebuild) return prebuild;
    var nearby = resolve($lJiUQ$path.dirname(process.execPath));
    if (nearby) return nearby;
    var target = [
        "platform=" + $22f88feb2ee92240$var$platform,
        "arch=" + $22f88feb2ee92240$var$arch,
        "runtime=" + $22f88feb2ee92240$var$runtime,
        "abi=" + $22f88feb2ee92240$var$abi,
        "uv=" + $22f88feb2ee92240$var$uv,
        $22f88feb2ee92240$var$armv ? "armv=" + $22f88feb2ee92240$var$armv : "",
        "libc=" + $22f88feb2ee92240$var$libc,
        "node=" + process.versions.node,
        process.versions.electron ? "electron=" + process.versions.electron : "",
        typeof __webpack_require__ === "function" ? "webpack=true" : "" // eslint-disable-line
    ].filter(Boolean).join(" ");
    throw new Error("No native build was found for " + target + "\n    loaded from: " + dir1 + "\n");
    function resolve(dir) {
        // Find matching "prebuilds/<platform>-<arch>" directory
        var tuples = $22f88feb2ee92240$var$readdirSync($lJiUQ$path.join(dir, "prebuilds")).map($22f88feb2ee92240$var$parseTuple);
        var tuple = tuples.filter($22f88feb2ee92240$var$matchTuple($22f88feb2ee92240$var$platform, $22f88feb2ee92240$var$arch)).sort($22f88feb2ee92240$var$compareTuples)[0];
        if (!tuple) return;
        // Find most specific flavor first
        var prebuilds = $lJiUQ$path.join(dir, "prebuilds", tuple.name);
        var parsed = $22f88feb2ee92240$var$readdirSync(prebuilds).map($22f88feb2ee92240$var$parseTags);
        var candidates = parsed.filter($22f88feb2ee92240$var$matchTags($22f88feb2ee92240$var$runtime, $22f88feb2ee92240$var$abi));
        var winner = candidates.sort($22f88feb2ee92240$var$compareTags($22f88feb2ee92240$var$runtime))[0];
        if (winner) return $lJiUQ$path.join(prebuilds, winner.file);
    }
};
function $22f88feb2ee92240$var$readdirSync(dir) {
    try {
        return $lJiUQ$fs.readdirSync(dir);
    } catch (err) {
        return [];
    }
}
function $22f88feb2ee92240$var$getFirst(dir, filter) {
    var files = $22f88feb2ee92240$var$readdirSync(dir).filter(filter);
    return files[0] && $lJiUQ$path.join(dir, files[0]);
}
function $22f88feb2ee92240$var$matchBuild(name) {
    return /\.node$/.test(name);
}
function $22f88feb2ee92240$var$parseTuple(name) {
    // Example: darwin-x64+arm64
    var arr = name.split("-");
    if (arr.length !== 2) return;
    var platform1 = arr[0];
    var architectures = arr[1].split("+");
    if (!platform1) return;
    if (!architectures.length) return;
    if (!architectures.every(Boolean)) return;
    return {
        name: name,
        platform: platform1,
        architectures: architectures
    };
}
function $22f88feb2ee92240$var$matchTuple(platform2, arch1) {
    return function(tuple) {
        if (tuple == null) return false;
        if (tuple.platform !== platform2) return false;
        return tuple.architectures.includes(arch1);
    };
}
function $22f88feb2ee92240$var$compareTuples(a, b) {
    // Prefer single-arch prebuilds over multi-arch
    return a.architectures.length - b.architectures.length;
}
function $22f88feb2ee92240$var$parseTags(file) {
    var arr = file.split(".");
    var extension = arr.pop();
    var tags = {
        file: file,
        specificity: 0
    };
    if (extension !== "node") return;
    for(var i = 0; i < arr.length; i++){
        var tag = arr[i];
        if (tag === "node" || tag === "electron" || tag === "node-webkit") tags.runtime = tag;
        else if (tag === "napi") tags.napi = true;
        else if (tag.slice(0, 3) === "abi") tags.abi = tag.slice(3);
        else if (tag.slice(0, 2) === "uv") tags.uv = tag.slice(2);
        else if (tag.slice(0, 4) === "armv") tags.armv = tag.slice(4);
        else if (tag === "glibc" || tag === "musl") tags.libc = tag;
        else continue;
        tags.specificity++;
    }
    return tags;
}
function $22f88feb2ee92240$var$matchTags(runtime1, abi1) {
    return function(tags) {
        if (tags == null) return false;
        if (tags.runtime !== runtime1 && !$22f88feb2ee92240$var$runtimeAgnostic(tags)) return false;
        if (tags.abi !== abi1 && !tags.napi) return false;
        if (tags.uv && tags.uv !== $22f88feb2ee92240$var$uv) return false;
        if (tags.armv && tags.armv !== $22f88feb2ee92240$var$armv) return false;
        if (tags.libc && tags.libc !== $22f88feb2ee92240$var$libc) return false;
        return true;
    };
}
function $22f88feb2ee92240$var$runtimeAgnostic(tags) {
    return tags.runtime === "node" && tags.napi;
}
function $22f88feb2ee92240$var$compareTags(runtime2) {
    // Precedence: non-agnostic runtime, abi over napi, then by specificity.
    return function(a, b) {
        if (a.runtime !== b.runtime) return a.runtime === runtime2 ? -1 : 1;
        else if (a.abi !== b.abi) return a.abi ? -1 : 1;
        else if (a.specificity !== b.specificity) return a.specificity > b.specificity ? -1 : 1;
        else return 0;
    };
}
function $22f88feb2ee92240$var$isNwjs() {
    return !!(process.versions && process.versions.nw);
}
function $22f88feb2ee92240$var$isElectron() {
    if (process.versions && process.versions.electron) return true;
    if (process.env.ELECTRON_RUN_AS_NODE) return true;
    return typeof window !== "undefined" && window.process && window.process.type === "renderer";
}
function $22f88feb2ee92240$var$isAlpine(platform3) {
    return platform3 === "linux" && $lJiUQ$fs.existsSync("/etc/alpine-release");
}
// Exposed for unit tests
// TODO: move to lib
$22f88feb2ee92240$var$load.parseTags = $22f88feb2ee92240$var$parseTags;
$22f88feb2ee92240$var$load.matchTags = $22f88feb2ee92240$var$matchTags;
$22f88feb2ee92240$var$load.compareTags = $22f88feb2ee92240$var$compareTags;
$22f88feb2ee92240$var$load.parseTuple = $22f88feb2ee92240$var$parseTuple;
$22f88feb2ee92240$var$load.matchTuple = $22f88feb2ee92240$var$matchTuple;
$22f88feb2ee92240$var$load.compareTuples = $22f88feb2ee92240$var$compareTuples;

});


parcelRequire.register("kgZpt", function(module, exports) {
"use strict";


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) module.exports = (parcelRequire("h4ZSE"));
else module.exports = (parcelRequire("bX6OO"));

});
parcelRequire.register("h4ZSE", function(module, exports) {
"use strict";
function $c6f2cf93ac1aa32f$var$_typeof(obj1) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") $c6f2cf93ac1aa32f$var$_typeof = function _typeof(obj) {
        return typeof obj;
    };
    else $c6f2cf93ac1aa32f$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    return $c6f2cf93ac1aa32f$var$_typeof(obj1);
}
/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ module.exports.log = $c6f2cf93ac1aa32f$var$log;
module.exports.formatArgs = $c6f2cf93ac1aa32f$var$formatArgs;
module.exports.save = $c6f2cf93ac1aa32f$var$save;
module.exports.load = $c6f2cf93ac1aa32f$var$load;
module.exports.useColors = $c6f2cf93ac1aa32f$var$useColors;
module.exports.storage = $c6f2cf93ac1aa32f$var$localstorage();
/**
 * Colors.
 */ module.exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function $c6f2cf93ac1aa32f$var$useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
     // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
     // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function $c6f2cf93ac1aa32f$var$formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
    if (!this.useColors) return;
    var c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit"); // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if (match === "%%") return;
        index++;
        if (match === "%c") // We only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */ function $c6f2cf93ac1aa32f$var$log() {
    var _console;
    // This hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return (typeof console === "undefined" ? "undefined" : $c6f2cf93ac1aa32f$var$_typeof(console)) === "object" && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function $c6f2cf93ac1aa32f$var$save(namespaces) {
    try {
        if (namespaces) module.exports.storage.setItem("debug", namespaces);
        else module.exports.storage.removeItem("debug");
    } catch (error) {
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function $c6f2cf93ac1aa32f$var$load() {
    var r;
    try {
        r = module.exports.storage.getItem("debug");
    } catch (error) {} // Swallow
    // XXX (@Qix-) should we be logging these?
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function $c6f2cf93ac1aa32f$var$localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // XXX (@Qix-) should we be logging these?
    }
}

module.exports = (parcelRequire("j1Lrg"))(module.exports);
var $c6f2cf93ac1aa32f$var$formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ $c6f2cf93ac1aa32f$var$formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
    }
};

});
parcelRequire.register("j1Lrg", function(module, exports) {
"use strict";

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function $dda2e8aeac431e1c$var$setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = (parcelRequire("fmsYr"));
    Object.keys(env).forEach(function(key) {
        createDebug[key] = env[key];
    });
    /**
  * Active `debug` instances.
  */ createDebug.instances = [];
    /**
  * The currently active debug mode names, and names to skip.
  */ createDebug.names = [];
    createDebug.skips = [];
    /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */ createDebug.formatters = {};
    /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */ function selectColor(namespace) {
        var hash = 0;
        for(var i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */ function createDebug(namespace) {
        var prevTime;
        function debug() {
            // Disabled?
            if (!debug.enabled) return;
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
            var self = debug; // Set `diff` timestamp
            var curr = Number(new Date());
            var ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") // Anything else let's inspect with %O
            args.unshift("%O");
             // Apply any `formatters` transformations
            var index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
                // If we encounter an escaped % then don't increase the array index
                if (match === "%%") return match;
                index++;
                var formatter = createDebug.formatters[format];
                if (typeof formatter === "function") {
                    var val = args[index];
                    match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            }); // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            var logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.enabled = createDebug.enabled(namespace);
        debug.useColors = createDebug.useColors();
        debug.color = selectColor(namespace);
        debug.destroy = destroy;
        debug.extend = extend; // Debug.formatArgs = formatArgs;
        // debug.rawLog = rawLog;
        // env-specific initialization logic for debug instances
        if (typeof createDebug.init === "function") createDebug.init(debug);
        createDebug.instances.push(debug);
        return debug;
    }
    function destroy() {
        var index = createDebug.instances.indexOf(this);
        if (index !== -1) {
            createDebug.instances.splice(index, 1);
            return true;
        }
        return false;
    }
    function extend(namespace, delimiter) {
        return createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
    }
    /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.names = [];
        createDebug.skips = [];
        var i;
        var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        var len = split.length;
        for(i = 0; i < len; i++){
            if (!split[i]) continue;
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
            else createDebug.names.push(new RegExp("^" + namespaces + "$"));
        }
        for(i = 0; i < createDebug.instances.length; i++){
            var instance = createDebug.instances[i];
            instance.enabled = createDebug.enabled(instance.namespace);
        }
    }
    /**
  * Disable debug output.
  *
  * @api public
  */ function disable() {
        createDebug.enable("");
    }
    /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */ function enabled(name) {
        if (name[name.length - 1] === "*") return true;
        var i;
        var len;
        for(i = 0, len = createDebug.skips.length; i < len; i++){
            if (createDebug.skips[i].test(name)) return false;
        }
        for(i = 0, len = createDebug.names.length; i < len; i++){
            if (createDebug.names[i].test(name)) return true;
        }
        return false;
    }
    /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */ function coerce(val) {
        if (val instanceof Error) return val.stack || val.message;
        return val;
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = $dda2e8aeac431e1c$var$setup;

});
parcelRequire.register("fmsYr", function(module, exports) {
/**
 * Helpers.
 */ var $b2ef62b1ad1c8ef1$var$s = 1000;
var $b2ef62b1ad1c8ef1$var$m = $b2ef62b1ad1c8ef1$var$s * 60;
var $b2ef62b1ad1c8ef1$var$h = $b2ef62b1ad1c8ef1$var$m * 60;
var $b2ef62b1ad1c8ef1$var$d = $b2ef62b1ad1c8ef1$var$h * 24;
var $b2ef62b1ad1c8ef1$var$w = $b2ef62b1ad1c8ef1$var$d * 7;
var $b2ef62b1ad1c8ef1$var$y = $b2ef62b1ad1c8ef1$var$d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) return $b2ef62b1ad1c8ef1$var$parse(val);
    else if (type === "number" && isFinite(val)) return options.long ? $b2ef62b1ad1c8ef1$var$fmtLong(val) : $b2ef62b1ad1c8ef1$var$fmtShort(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function $b2ef62b1ad1c8ef1$var$parse(str) {
    str = String(str);
    if (str.length > 100) return;
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) return;
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch(type){
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
            return n * $b2ef62b1ad1c8ef1$var$y;
        case "weeks":
        case "week":
        case "w":
            return n * $b2ef62b1ad1c8ef1$var$w;
        case "days":
        case "day":
        case "d":
            return n * $b2ef62b1ad1c8ef1$var$d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * $b2ef62b1ad1c8ef1$var$h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * $b2ef62b1ad1c8ef1$var$m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * $b2ef62b1ad1c8ef1$var$s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $b2ef62b1ad1c8ef1$var$fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $b2ef62b1ad1c8ef1$var$d) return Math.round(ms / $b2ef62b1ad1c8ef1$var$d) + "d";
    if (msAbs >= $b2ef62b1ad1c8ef1$var$h) return Math.round(ms / $b2ef62b1ad1c8ef1$var$h) + "h";
    if (msAbs >= $b2ef62b1ad1c8ef1$var$m) return Math.round(ms / $b2ef62b1ad1c8ef1$var$m) + "m";
    if (msAbs >= $b2ef62b1ad1c8ef1$var$s) return Math.round(ms / $b2ef62b1ad1c8ef1$var$s) + "s";
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $b2ef62b1ad1c8ef1$var$fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $b2ef62b1ad1c8ef1$var$d) return $b2ef62b1ad1c8ef1$var$plural(ms, msAbs, $b2ef62b1ad1c8ef1$var$d, "day");
    if (msAbs >= $b2ef62b1ad1c8ef1$var$h) return $b2ef62b1ad1c8ef1$var$plural(ms, msAbs, $b2ef62b1ad1c8ef1$var$h, "hour");
    if (msAbs >= $b2ef62b1ad1c8ef1$var$m) return $b2ef62b1ad1c8ef1$var$plural(ms, msAbs, $b2ef62b1ad1c8ef1$var$m, "minute");
    if (msAbs >= $b2ef62b1ad1c8ef1$var$s) return $b2ef62b1ad1c8ef1$var$plural(ms, msAbs, $b2ef62b1ad1c8ef1$var$s, "second");
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function $b2ef62b1ad1c8ef1$var$plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}

});



parcelRequire.register("bX6OO", function(module, exports) {
"use strict";


/**
 * This is the Node.js implementation of `debug()`.
 */ module.exports.init = $8b3a7e6f0353df6f$var$init;
module.exports.log = $8b3a7e6f0353df6f$var$log;
module.exports.formatArgs = $8b3a7e6f0353df6f$var$formatArgs;
module.exports.save = $8b3a7e6f0353df6f$var$save;
module.exports.load = $8b3a7e6f0353df6f$var$load;
module.exports.useColors = $8b3a7e6f0353df6f$var$useColors;
/**
 * Colors.
 */ module.exports.colors = [
    6,
    2,
    3,
    4,
    5,
    1
];

try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    var $8b3a7e6f0353df6f$var$supportsColor = (parcelRequire("dd4nP"));
    if ($8b3a7e6f0353df6f$var$supportsColor && ($8b3a7e6f0353df6f$var$supportsColor.stderr || $8b3a7e6f0353df6f$var$supportsColor).level >= 2) module.exports.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
    ];
} catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */ module.exports.inspectOpts = Object.keys(process.env).filter(function(key) {
    return /^debug_/i.test(key);
}).reduce(function(obj, key) {
    // Camel-case
    var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
    }); // Coerce string value into JS value
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
    else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
    else if (val === "null") val = null;
    else val = Number(val);
    obj[prop] = val;
    return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */ function $8b3a7e6f0353df6f$var$useColors() {
    return "colors" in module.exports.inspectOpts ? Boolean(module.exports.inspectOpts.colors) : $lJiUQ$tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function $8b3a7e6f0353df6f$var$formatArgs(args) {
    var name = this.namespace, useColors1 = this.useColors;
    if (useColors1) {
        var c = this.color;
        var colorCode = "\x1b[3" + (c < 8 ? c : "8;5;" + c);
        var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1b[0m");
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1b[0m");
    } else args[0] = $8b3a7e6f0353df6f$var$getDate() + name + " " + args[0];
}
function $8b3a7e6f0353df6f$var$getDate() {
    if (module.exports.inspectOpts.hideDate) return "";
    return new Date().toISOString() + " ";
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */ function $8b3a7e6f0353df6f$var$log() {
    return process.stderr.write($lJiUQ$util.format.apply($lJiUQ$util, arguments) + "\n");
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function $8b3a7e6f0353df6f$var$save(namespaces) {
    if (namespaces) process.env.DEBUG = namespaces;
    else // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function $8b3a7e6f0353df6f$var$load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function $8b3a7e6f0353df6f$var$init(debug) {
    debug.inspectOpts = {};
    var keys = Object.keys(module.exports.inspectOpts);
    for(var i = 0; i < keys.length; i++)debug.inspectOpts[keys[i]] = module.exports.inspectOpts[keys[i]];
}

module.exports = (parcelRequire("j1Lrg"))(module.exports);
var $8b3a7e6f0353df6f$var$formatters = module.exports.formatters;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ $8b3a7e6f0353df6f$var$formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return $lJiUQ$util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
    }).join(" ");
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ $8b3a7e6f0353df6f$var$formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return $lJiUQ$util.inspect(v, this.inspectOpts);
};

});


parcelRequire.register("fD8Mg", function(module, exports) {


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) module.exports = (parcelRequire("6Jd6q"));
else module.exports = (parcelRequire("128na"));

});
parcelRequire.register("6Jd6q", function(module, exports) {
/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ module.exports.formatArgs = $4e611bf07757f6c8$var$formatArgs;
module.exports.save = $4e611bf07757f6c8$var$save;
module.exports.load = $4e611bf07757f6c8$var$load;
module.exports.useColors = $4e611bf07757f6c8$var$useColors;
module.exports.storage = $4e611bf07757f6c8$var$localstorage();
module.exports.destroy = (()=>{
    let warned = false;
    return ()=>{
        if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
    };
})();
/**
 * Colors.
 */ module.exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function $4e611bf07757f6c8$var$useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function $4e611bf07757f6c8$var$formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
    if (!this.useColors) return;
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match)=>{
        if (match === "%%") return;
        index++;
        if (match === "%c") // We only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */ module.exports.log = console.debug || console.log || (()=>{});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function $4e611bf07757f6c8$var$save(namespaces) {
    try {
        if (namespaces) module.exports.storage.setItem("debug", namespaces);
        else module.exports.storage.removeItem("debug");
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function $4e611bf07757f6c8$var$load() {
    let r;
    try {
        r = module.exports.storage.getItem("debug");
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function $4e611bf07757f6c8$var$localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}

module.exports = (parcelRequire("cM8OG"))(module.exports);
const { formatters: $4e611bf07757f6c8$var$formatters  } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ $4e611bf07757f6c8$var$formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
    }
};

});
parcelRequire.register("cM8OG", function(module, exports) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function $94d0ce79a878a7bf$var$setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = (parcelRequire("kxdkV"));
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key)=>{
        createDebug[key] = env[key];
    });
    /**
	* The currently active debug mode names, and names to skip.
	*/ createDebug.names = [];
    createDebug.skips = [];
    /**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/ createDebug.formatters = {};
    /**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/ function selectColor(namespace) {
        let hash = 0;
        for(let i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/ function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
            // Disabled?
            if (!debug.enabled) return;
            const self = debug;
            // Set `diff` timestamp
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") // Anything else let's inspect with %O
            args.unshift("%O");
            // Apply any `formatters` transformations
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format)=>{
                // If we encounter an escaped % then don't increase the array index
                if (match === "%%") return "%";
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === "function") {
                    const val = args[index];
                    match = formatter.call(self, val);
                    // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.
        Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: ()=>{
                if (enableOverride !== null) return enableOverride;
                if (namespacesCache !== createDebug.namespaces) {
                    namespacesCache = createDebug.namespaces;
                    enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
            },
            set: (v)=>{
                enableOverride = v;
            }
        });
        // Env-specific initialization logic for debug instances
        if (typeof createDebug.init === "function") createDebug.init(debug);
        return debug;
    }
    function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
    }
    /**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for(i = 0; i < len; i++){
            if (!split[i]) continue;
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
            else createDebug.names.push(new RegExp("^" + namespaces + "$"));
        }
    }
    /**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/ function disable() {
        const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace)=>"-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
    }
    /**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/ function enabled(name) {
        if (name[name.length - 1] === "*") return true;
        let i;
        let len;
        for(i = 0, len = createDebug.skips.length; i < len; i++){
            if (createDebug.skips[i].test(name)) return false;
        }
        for(i = 0, len = createDebug.names.length; i < len; i++){
            if (createDebug.names[i].test(name)) return true;
        }
        return false;
    }
    /**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/ function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    /**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/ function coerce(val) {
        if (val instanceof Error) return val.stack || val.message;
        return val;
    }
    /**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/ function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = $94d0ce79a878a7bf$var$setup;

});
parcelRequire.register("kxdkV", function(module, exports) {
/**
 * Helpers.
 */ var $ef313c119bc1360b$var$s = 1000;
var $ef313c119bc1360b$var$m = $ef313c119bc1360b$var$s * 60;
var $ef313c119bc1360b$var$h = $ef313c119bc1360b$var$m * 60;
var $ef313c119bc1360b$var$d = $ef313c119bc1360b$var$h * 24;
var $ef313c119bc1360b$var$w = $ef313c119bc1360b$var$d * 7;
var $ef313c119bc1360b$var$y = $ef313c119bc1360b$var$d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) return $ef313c119bc1360b$var$parse(val);
    else if (type === "number" && isFinite(val)) return options.long ? $ef313c119bc1360b$var$fmtLong(val) : $ef313c119bc1360b$var$fmtShort(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function $ef313c119bc1360b$var$parse(str) {
    str = String(str);
    if (str.length > 100) return;
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) return;
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch(type){
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
            return n * $ef313c119bc1360b$var$y;
        case "weeks":
        case "week":
        case "w":
            return n * $ef313c119bc1360b$var$w;
        case "days":
        case "day":
        case "d":
            return n * $ef313c119bc1360b$var$d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * $ef313c119bc1360b$var$h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * $ef313c119bc1360b$var$m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * $ef313c119bc1360b$var$s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $ef313c119bc1360b$var$fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $ef313c119bc1360b$var$d) return Math.round(ms / $ef313c119bc1360b$var$d) + "d";
    if (msAbs >= $ef313c119bc1360b$var$h) return Math.round(ms / $ef313c119bc1360b$var$h) + "h";
    if (msAbs >= $ef313c119bc1360b$var$m) return Math.round(ms / $ef313c119bc1360b$var$m) + "m";
    if (msAbs >= $ef313c119bc1360b$var$s) return Math.round(ms / $ef313c119bc1360b$var$s) + "s";
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $ef313c119bc1360b$var$fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $ef313c119bc1360b$var$d) return $ef313c119bc1360b$var$plural(ms, msAbs, $ef313c119bc1360b$var$d, "day");
    if (msAbs >= $ef313c119bc1360b$var$h) return $ef313c119bc1360b$var$plural(ms, msAbs, $ef313c119bc1360b$var$h, "hour");
    if (msAbs >= $ef313c119bc1360b$var$m) return $ef313c119bc1360b$var$plural(ms, msAbs, $ef313c119bc1360b$var$m, "minute");
    if (msAbs >= $ef313c119bc1360b$var$s) return $ef313c119bc1360b$var$plural(ms, msAbs, $ef313c119bc1360b$var$s, "second");
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function $ef313c119bc1360b$var$plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}

});



parcelRequire.register("128na", function(module, exports) {


/**
 * This is the Node.js implementation of `debug()`.
 */ module.exports.init = $0c0c78fe218d1f99$var$init;
module.exports.log = $0c0c78fe218d1f99$var$log;
module.exports.formatArgs = $0c0c78fe218d1f99$var$formatArgs;
module.exports.save = $0c0c78fe218d1f99$var$save;
module.exports.load = $0c0c78fe218d1f99$var$load;
module.exports.useColors = $0c0c78fe218d1f99$var$useColors;
module.exports.destroy = $lJiUQ$util.deprecate(()=>{}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
/**
 * Colors.
 */ module.exports.colors = [
    6,
    2,
    3,
    4,
    5,
    1
];

try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    const supportsColor = (parcelRequire("dd4nP"));
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) module.exports.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
    ];
} catch (error) {
// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */ module.exports.inspectOpts = Object.keys(process.env).filter((key)=>{
    return /^debug_/i.test(key);
}).reduce((obj, key)=>{
    // Camel-case
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k)=>{
        return k.toUpperCase();
    });
    // Coerce string value into JS value
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
    else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
    else if (val === "null") val = null;
    else val = Number(val);
    obj[prop] = val;
    return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */ function $0c0c78fe218d1f99$var$useColors() {
    return "colors" in module.exports.inspectOpts ? Boolean(module.exports.inspectOpts.colors) : $lJiUQ$tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function $0c0c78fe218d1f99$var$formatArgs(args) {
    const { namespace: name , useColors: useColors1  } = this;
    if (useColors1) {
        const c = this.color;
        const colorCode = "\x1b[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \u001B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1b[0m");
    } else args[0] = $0c0c78fe218d1f99$var$getDate() + name + " " + args[0];
}
function $0c0c78fe218d1f99$var$getDate() {
    if (module.exports.inspectOpts.hideDate) return "";
    return new Date().toISOString() + " ";
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */ function $0c0c78fe218d1f99$var$log(...args) {
    return process.stderr.write($lJiUQ$util.format(...args) + "\n");
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function $0c0c78fe218d1f99$var$save(namespaces) {
    if (namespaces) process.env.DEBUG = namespaces;
    else // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function $0c0c78fe218d1f99$var$load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function $0c0c78fe218d1f99$var$init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(module.exports.inspectOpts);
    for(let i = 0; i < keys.length; i++)debug.inspectOpts[keys[i]] = module.exports.inspectOpts[keys[i]];
}

module.exports = (parcelRequire("cM8OG"))(module.exports);
const { formatters: $0c0c78fe218d1f99$var$formatters  } = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ $0c0c78fe218d1f99$var$formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return $lJiUQ$util.inspect(v, this.inspectOpts).split("\n").map((str)=>str.trim()).join(" ");
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ $0c0c78fe218d1f99$var$formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return $lJiUQ$util.inspect(v, this.inspectOpts);
};

});


parcelRequire.register("1Pa9k", function(module, exports) {
"use strict";



var $15426d51b436fa94$var$debug = (parcelRequire("kgZpt"))("ref:struct");
/**
 * Module exports.
 */ module.exports = function(ref) {
    /**
 * The Struct "type" meta-constructor.
 */ function Struct() {
        $15426d51b436fa94$var$debug('defining new struct "type"');
        /**
   * This is the "constructor" of the Struct type that gets returned.
   *
   * Invoke it with `new` to create a new Buffer instance backing the struct.
   * Pass it an existing Buffer instance to use that as the backing buffer.
   * Pass in an Object containing the struct fields to auto-populate the
   * struct with the data.
   */ function StructType(arg, data) {
            if (!(this instanceof StructType)) return new StructType(arg, data);
            $15426d51b436fa94$var$debug("creating new struct instance");
            var store;
            if (Buffer.isBuffer(arg)) {
                $15426d51b436fa94$var$debug("using passed-in Buffer instance to back the struct", arg);
                $lJiUQ$assert(arg.length >= StructType.size, "Buffer instance must be at least " + StructType.size + " bytes to back this struct type");
                store = arg;
                arg = data;
            } else {
                $15426d51b436fa94$var$debug("creating new Buffer instance to back the struct (size: %d)", StructType.size);
                store = Buffer.alloc(StructType.size);
            }
            // set the backing Buffer store
            store.type = StructType;
            this["ref.buffer"] = store;
            if (arg) for(var key in arg)// hopefully hit the struct setters
            this[key] = arg[key];
            StructType._instanceCreated = true;
        }
        // make instances inherit from the `proto`
        StructType.prototype = Object.create(proto, {
            constructor: {
                value: StructType,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        StructType.defineProperty = defineProperty;
        StructType.toString = toString;
        StructType.fields = {};
        var opt = arguments.length > 0 && arguments[1] ? arguments[1] : {};
        // Setup the ref "type" interface. The constructor doubles as the "type" object
        StructType.size = 0;
        StructType.alignment = 0;
        StructType.indirection = 1;
        StructType.isPacked = opt.packed ? Boolean(opt.packed) : false;
        StructType.get = get;
        StructType.set = set;
        // Read the fields list and apply all the fields to the struct
        // TODO: Better arg handling... (maybe look at ES6 binary data API?)
        var arg1 = arguments[0];
        if (Array.isArray(arg1)) // legacy API
        arg1.forEach(function(a) {
            var type = a[0];
            var name = a[1];
            StructType.defineProperty(name, type);
        });
        else if (typeof arg1 === "object") Object.keys(arg1).forEach(function(name) {
            var type = arg1[name];
            StructType.defineProperty(name, type);
        });
        return StructType;
    }
    /**
 * The "get" function of the Struct "type" interface
 */ function get(buffer, offset) {
        $15426d51b436fa94$var$debug('Struct "type" getter for buffer at offset', buffer, offset);
        if (offset > 0) buffer = buffer.slice(offset);
        return new this(buffer);
    }
    /**
 * The "set" function of the Struct "type" interface
 */ function set(buffer, offset, value) {
        $15426d51b436fa94$var$debug('Struct "type" setter for buffer at offset', buffer, offset, value);
        var isStruct = value instanceof this;
        if (isStruct) // optimization: copy the buffer contents directly rather
        // than going through the ref-struct constructor
        value["ref.buffer"].copy(buffer, offset, 0, this.size);
        else {
            if (offset > 0) buffer = buffer.slice(offset);
            new this(buffer, value);
        }
    }
    /**
 * Custom `toString()` override for struct type instances.
 */ function toString() {
        return "[StructType]";
    }
    /**
 * Adds a new field to the struct instance with the given name and type.
 * Note that this function will throw an Error if any instances of the struct
 * type have already been created, therefore this function must be called at the
 * beginning, before any instances are created.
 */ function defineProperty(name, type) {
        $15426d51b436fa94$var$debug("defining new struct type field", name);
        // allow string types for convenience
        type = ref.coerceType(type);
        $lJiUQ$assert(!this._instanceCreated, 'an instance of this Struct type has already been created, cannot add new "fields" anymore');
        $lJiUQ$assert.equal("string", typeof name, 'expected a "string" field name');
        $lJiUQ$assert(type && /object|function/i.test(typeof type) && "size" in type && "indirection" in type, 'expected a "type" object describing the field type: "' + type + '"');
        $lJiUQ$assert(type.indirection > 1 || type.size > 0, '"type" object must have a size greater than 0');
        $lJiUQ$assert(!(name in this.prototype), 'the field "' + name + '" already exists in this Struct type');
        var field = {
            type: type
        };
        this.fields[name] = field;
        // define the getter/setter property
        var desc = {
            enumerable: true,
            configurable: true
        };
        desc.get = function() {
            $15426d51b436fa94$var$debug('getting "%s" struct field (offset: %d)', name, field.offset);
            return ref.get(this["ref.buffer"], field.offset, type);
        };
        desc.set = function(value) {
            $15426d51b436fa94$var$debug('setting "%s" struct field (offset: %d)', name, field.offset, value);
            return ref.set(this["ref.buffer"], field.offset, value, type);
        };
        // calculate the new size and field offsets
        recalc(this);
        Object.defineProperty(this.prototype, name, desc);
    }
    function recalc(struct) {
        // reset size and alignment
        struct.size = 0;
        struct.alignment = 0;
        var fieldNames = Object.keys(struct.fields);
        // first loop through is to determine the `alignment` of this struct
        fieldNames.forEach(function(name) {
            var field = struct.fields[name];
            var type = field.type;
            var alignment = type.alignment || ref.alignof.pointer;
            if (type.indirection > 1) alignment = ref.alignof.pointer;
            if (struct.isPacked) struct.alignment = Math.min(struct.alignment || alignment, alignment);
            else struct.alignment = Math.max(struct.alignment, alignment);
        });
        // second loop through sets the `offset` property on each "field"
        // object, and sets the `struct.size` as we go along
        fieldNames.forEach(function(name) {
            var field = struct.fields[name];
            var type = field.type;
            if (null != type.fixedLength) {
                // "ref-array" types set the "fixedLength" prop. don't treat arrays like one
                // contiguous entity. instead, treat them like individual elements in the
                // struct. doing this makes the padding end up being calculated correctly.
                field.offset = addType(type.type);
                for(var i = 1; i < type.fixedLength; i++)addType(type.type);
            } else field.offset = addType(type);
        });
        function addType(type) {
            var offset = struct.size;
            var align = type.indirection === 1 ? type.alignment : ref.alignof.pointer;
            var padding = struct.isPacked ? 0 : (align - offset % align) % align;
            var size = type.indirection === 1 ? type.size : ref.sizeof.pointer;
            offset += padding;
            if (!struct.isPacked) $lJiUQ$assert.equal(offset % align, 0, "offset should align");
            // adjust the "size" of the struct type
            struct.size = offset + size;
            // return the calulated offset
            return offset;
        }
        // any final padding?
        var left = struct.size % struct.alignment;
        if (left > 0) {
            $15426d51b436fa94$var$debug("additional padding to the end of struct:", struct.alignment - left);
            struct.size += struct.alignment - left;
        }
    }
    /**
 * this is the custom prototype of Struct type instances.
 */ var proto = {};
    /**
 * set a placeholder variable on the prototype so that defineProperty() will
 * throw an error if you try to define a struct field with the name "buffer".
 */ proto["ref.buffer"] = ref.NULL;
    /**
 * Flattens the Struct instance into a regular JavaScript Object. This function
 * "gets" all the defined properties.
 *
 * @api public
 */ proto.toObject = function toObject() {
        var obj = {};
        Object.keys(this.constructor.fields).forEach(function(k) {
            obj[k] = this[k];
        }, this);
        return obj;
    };
    /**
 * Basic `JSON.stringify(struct)` support.
 */ proto.toJSON = function toJSON() {
        return this.toObject();
    };
    /**
 * `.inspect()` override. For the REPL.
 *
 * @api public
 */ proto.inspect = function inspect() {
        var obj = this.toObject();
        // add instance's "own properties"
        Object.keys(this).forEach(function(k) {
            obj[k] = this[k];
        }, this);
        return $lJiUQ$util.inspect(obj);
    };
    /**
 * returns a Buffer pointing to this struct data structure.
 */ proto.ref = function ref() {
        return this["ref.buffer"];
    };
    return Struct;
};

});

parcelRequire.register("lMUnw", function(module, exports) {
"use strict";

var $fDp7d = parcelRequire("fDp7d");


const $fdc9d037cb94426c$var$debug = (parcelRequire("fD8Mg"))("ffi:cif");

var $5vfvk = parcelRequire("5vfvk");

var $fL96e = parcelRequire("fL96e");
const $fdc9d037cb94426c$var$POINTER_SIZE = $5vfvk.sizeof.pointer;
const $fdc9d037cb94426c$var$ffi_prep_cif = $fL96e.ffi_prep_cif;
const $fdc9d037cb94426c$var$FFI_CIF_SIZE = $fL96e.FFI_CIF_SIZE;
const $fdc9d037cb94426c$var$FFI_DEFAULT_ABI = $fL96e.FFI_DEFAULT_ABI;
// status codes
const $fdc9d037cb94426c$var$FFI_OK = $fL96e.FFI_OK;
const $fdc9d037cb94426c$var$FFI_BAD_TYPEDEF = $fL96e.FFI_BAD_TYPEDEF;
const $fdc9d037cb94426c$var$FFI_BAD_ABI = $fL96e.FFI_BAD_ABI;
/**
 * JS wrapper for the `ffi_prep_cif` function.
 * Returns a Buffer instance representing a `ffi_cif *` instance.
 */ const $fdc9d037cb94426c$var$cifs = [];
function $fdc9d037cb94426c$var$CIF(rtype, types, abi) {
    $fdc9d037cb94426c$var$debug("creating `ffi_cif *` instance");
    // the return and arg types are expected to be coerced at this point...
    $lJiUQ$assert(!!rtype, 'expected a return "type" object as the first argument');
    $lJiUQ$assert(Array.isArray(types), 'expected an Array of arg "type" objects as the second argument');
    // the buffer that will contain the return `ffi_cif *` instance
    const cif = Buffer.alloc($fdc9d037cb94426c$var$FFI_CIF_SIZE);
    const numArgs = types.length;
    const _argtypesptr = Buffer.alloc(numArgs * $fdc9d037cb94426c$var$POINTER_SIZE);
    const _rtypeptr = $fDp7d(rtype);
    for(var i = 0; i < numArgs; i++){
        const type = types[i];
        const ffiType = $fDp7d(type);
        _argtypesptr.writePointer(ffiType, i * $fdc9d037cb94426c$var$POINTER_SIZE);
    }
    // prevent GC of the arg type and rtn type buffers (not sure if this is required)
    cif.rtnTypePtr = _rtypeptr;
    cif.argTypesPtr = _argtypesptr;
    if (typeof abi === "undefined") {
        $fdc9d037cb94426c$var$debug("no ABI specified (this is OK), using FFI_DEFAULT_ABI");
        abi = $fdc9d037cb94426c$var$FFI_DEFAULT_ABI;
    }
    const status = $fdc9d037cb94426c$var$ffi_prep_cif(cif, numArgs, _rtypeptr, _argtypesptr, abi);
    if (status !== $fdc9d037cb94426c$var$FFI_OK) switch(status){
        case $fdc9d037cb94426c$var$FFI_BAD_TYPEDEF:
            {
                const err = new Error("ffi_prep_cif() returned an FFI_BAD_TYPEDEF error");
                err.code = "FFI_BAD_TYPEDEF";
                err.errno = status;
                throw err;
            }
        case $fdc9d037cb94426c$var$FFI_BAD_ABI:
            {
                const err = new Error("ffi_prep_cif() returned an FFI_BAD_ABI error");
                err.code = "FFI_BAD_ABI";
                err.errno = status;
                throw err;
            }
        default:
            throw new Error("ffi_prep_cif() returned an error: " + status);
    }
    if ($fdc9d037cb94426c$var$debug.enabled || `${process.env.DEBUG}`.match(/\bffi\b/)) $fdc9d037cb94426c$var$cifs.push(cif);
    return cif;
}
module.exports = $fdc9d037cb94426c$var$CIF;

});
parcelRequire.register("fDp7d", function(module, exports) {
"use strict";

var $5vfvk = parcelRequire("5vfvk");


const $b61dfaec6a9e9a40$var$debug = (parcelRequire("fD8Mg"))("ffi:types");

const $b61dfaec6a9e9a40$var$Struct = (parcelRequire("1Pa9k"))($5vfvk);

var $fL96e = parcelRequire("fL96e");
/**
 * Define the `ffi_type` struct (see deps/libffi/include/ffi.h) for use in JS.
 * This struct type is used internally to define custom struct ret/arg types.
 */ const $b61dfaec6a9e9a40$var$FFI_TYPE = $b61dfaec6a9e9a40$var$Type.FFI_TYPE = $b61dfaec6a9e9a40$var$Struct();
$b61dfaec6a9e9a40$var$FFI_TYPE.defineProperty("size", $5vfvk.types.size_t);
$b61dfaec6a9e9a40$var$FFI_TYPE.defineProperty("alignment", $5vfvk.types.ushort);
$b61dfaec6a9e9a40$var$FFI_TYPE.defineProperty("type", $5vfvk.types.ushort);
// this last prop is a C Array of `ffi_type *` elements, so this is `ffi_type **`
const $b61dfaec6a9e9a40$var$ffi_type_ptr_array = $5vfvk.refType($5vfvk.refType($b61dfaec6a9e9a40$var$FFI_TYPE));
$b61dfaec6a9e9a40$var$FFI_TYPE.defineProperty("elements", $b61dfaec6a9e9a40$var$ffi_type_ptr_array);
$lJiUQ$assert.strictEqual($fL96e.FFI_TYPE_SIZE, $b61dfaec6a9e9a40$var$FFI_TYPE.size);
/**
 * Returns a `ffi_type *` Buffer appropriate for the given "type".
 *
 * @param {Type|String} type A "ref" type (or string) to get the `ffi_type` for
 * @return {Buffer} A buffer pointing to a `ffi_type` instance for "type"
 * @api private
 */ function $b61dfaec6a9e9a40$var$Type(type) {
    type = $5vfvk.coerceType(type);
    $b61dfaec6a9e9a40$var$debug("Type()", type.name || type);
    $lJiUQ$assert(type.indirection >= 1, 'invalid "type" given: ' + (type.name || type));
    let ret;
    // first we assume it's a regular "type". if the "indirection" is greater than
    // 1, then we can just use "pointer" ffi_type, otherwise we hope "ffi_type" is
    // set
    if (type.indirection === 1) ret = type.ffi_type;
    else ret = $fL96e.FFI_TYPES.pointer;
    // if "ret" isn't set (ffi_type was not set) then we check for "ref-array" type
    if (!ret && type.type) // got a "ref-array" type
    // passing arrays to C functions are always by reference, so we use "pointer"
    ret = $fL96e.FFI_TYPES.pointer;
    if (!ret && type.fields) {
        // got a "ref-struct" type
        // need to create the `ffi_type` instance manually
        $b61dfaec6a9e9a40$var$debug('creating an `ffi_type` for given "ref-struct" type');
        const fields = type.fields;
        const fieldNames = Object.keys(fields);
        const numFields = fieldNames.length;
        let numElements = 0;
        const ffi_type = new $b61dfaec6a9e9a40$var$FFI_TYPE;
        let field;
        let ffi_type_ptr;
        // these are the "ffi_type" values expected for a struct
        ffi_type.size = 0;
        ffi_type.alignment = 0;
        ffi_type.type = 13; // FFI_TYPE_STRUCT
        // first we have to figure out the number of "elements" that will go in the
        // array. this would normally just be "numFields" but we also have to account
        // for arrays, which each act as their own element
        for(let i = 0; i < numFields; i++){
            field = fields[fieldNames[i]];
            if (field.type.fixedLength > 0) // a fixed-length "ref-array" type
            numElements += field.type.fixedLength;
            else numElements += 1;
        }
        // hand-crafting a null-terminated array here.
        // XXX: use "ref-array"?
        const size = $5vfvk.sizeof.pointer * (numElements + 1); // +1 because of the NULL terminator
        const elements = ffi_type.elements = Buffer.alloc(size);
        let index = 0;
        for(let i1 = 0; i1 < numFields; i1++){
            field = fields[fieldNames[i1]];
            if (field.type.fixedLength > 0) {
                // a fixed-length "ref-array" type
                ffi_type_ptr = $b61dfaec6a9e9a40$var$Type(field.type.type);
                for(var j = 0; j < field.type.fixedLength; j++)elements.writePointer(ffi_type_ptr, (index++) * $5vfvk.sizeof.pointer);
            } else {
                ffi_type_ptr = $b61dfaec6a9e9a40$var$Type(field.type);
                elements.writePointer(ffi_type_ptr, (index++) * $5vfvk.sizeof.pointer);
            }
        }
        // final NULL pointer to terminate the Array
        elements.writePointer($5vfvk.NULL, index * $5vfvk.sizeof.pointer);
        // also set the `ffi_type` property to that it's cached for next time
        ret = type.ffi_type = ffi_type.ref();
    }
    if (!ret && type.name) {
        // handle "ref" types other than the set that node-ffi is using (i.e.
        // a separate copy)
        if ("CString" == type.name) ret = type.ffi_type = $fL96e.FFI_TYPES.pointer;
        else {
            let cur = type;
            while(!ret && cur){
                ret = cur.ffi_type = $fL96e.FFI_TYPES[cur.name];
                cur = Object.getPrototypeOf(cur);
            }
        }
    }
    $lJiUQ$assert(ret, "Could not determine the `ffi_type` instance for type: " + (type.name || type));
    $b61dfaec6a9e9a40$var$debug("returning `ffi_type`", ret.name);
    return ret;
}
module.exports = $b61dfaec6a9e9a40$var$Type;

});
parcelRequire.register("fL96e", function(module, exports) {

var $b7924dcbc554126e$var$__dirname1 = $lJiUQ$path.resolve(__dirname, "../node_modules/ffi-napi/lib");
"use strict";


var $5vfvk = parcelRequire("5vfvk");

$lJiUQ$assert($5vfvk.instance);

const $b7924dcbc554126e$var$bindings = (parcelRequire("309gM"))($lJiUQ$path.join($b7924dcbc554126e$var$__dirname1, ".."));
module.exports = $b7924dcbc554126e$var$bindings.initializeBindings($5vfvk.instance);

});



parcelRequire.register("dS6wn", function(module, exports) {
"use strict";

var $fDp7d = parcelRequire("fDp7d");


const $a195607b8947eabf$var$debug = (parcelRequire("fD8Mg"))("ffi:cif_var");

var $5vfvk = parcelRequire("5vfvk");

var $fL96e = parcelRequire("fL96e");
const $a195607b8947eabf$var$POINTER_SIZE = $5vfvk.sizeof.pointer;
const $a195607b8947eabf$var$ffi_prep_cif_var = $fL96e.ffi_prep_cif_var;
const $a195607b8947eabf$var$FFI_CIF_SIZE = $fL96e.FFI_CIF_SIZE;
const $a195607b8947eabf$var$FFI_DEFAULT_ABI = $fL96e.FFI_DEFAULT_ABI;
// status codes
const $a195607b8947eabf$var$FFI_OK = $fL96e.FFI_OK;
const $a195607b8947eabf$var$FFI_BAD_TYPEDEF = $fL96e.FFI_BAD_TYPEDEF;
const $a195607b8947eabf$var$FFI_BAD_ABI = $fL96e.FFI_BAD_ABI;
/**
 * JS wrapper for the `ffi_prep_cif_var` function.
 * Returns a Buffer instance representing a variadic `ffi_cif *` instance.
 */ function $a195607b8947eabf$var$CIF_var(rtype, types, numFixedArgs, abi) {
    $a195607b8947eabf$var$debug("creating `ffi_cif *` instance with `ffi_prep_cif_var()`");
    // the return and arg types are expected to be coerced at this point...
    $lJiUQ$assert(!!rtype, 'expected a return "type" object as the first argument');
    $lJiUQ$assert(Array.isArray(types), 'expected an Array of arg "type" objects as the second argument');
    $lJiUQ$assert(numFixedArgs >= 1, "expected the number of fixed arguments to be at least 1");
    // the buffer that will contain the return `ffi_cif *` instance
    const cif = Buffer.alloc($a195607b8947eabf$var$FFI_CIF_SIZE);
    const numTotalArgs = types.length;
    const _argtypesptr = Buffer.alloc(numTotalArgs * $a195607b8947eabf$var$POINTER_SIZE);
    const _rtypeptr = $fDp7d(rtype);
    for(let i = 0; i < numTotalArgs; i++){
        const ffiType = $fDp7d(types[i]);
        _argtypesptr.writePointer(ffiType, i * $a195607b8947eabf$var$POINTER_SIZE);
    }
    // prevent GC of the arg type and rtn type buffers (not sure if this is required)
    cif.rtnTypePtr = _rtypeptr;
    cif.argTypesPtr = _argtypesptr;
    if (typeof abi === "undefined") {
        $a195607b8947eabf$var$debug("no ABI specified (this is OK), using FFI_DEFAULT_ABI");
        abi = $a195607b8947eabf$var$FFI_DEFAULT_ABI;
    }
    const status = $a195607b8947eabf$var$ffi_prep_cif_var(cif, numFixedArgs, numTotalArgs, _rtypeptr, _argtypesptr, abi);
    if (status !== $a195607b8947eabf$var$FFI_OK) switch(status){
        case $a195607b8947eabf$var$FFI_BAD_TYPEDEF:
            {
                const err = new Error("ffi_prep_cif_var() returned an FFI_BAD_TYPEDEF error");
                err.code = "FFI_BAD_TYPEDEF";
                err.errno = status;
                throw err;
            }
        case $a195607b8947eabf$var$FFI_BAD_ABI:
            {
                const err = new Error("ffi_prep_cif_var() returned an FFI_BAD_ABI error");
                err.code = "FFI_BAD_ABI";
                err.errno = status;
                throw err;
            }
        default:
            {
                const err = new Error("ffi_prep_cif_var() returned an error: " + status);
                err.errno = status;
                throw err;
            }
    }
    return cif;
}
module.exports = $a195607b8947eabf$var$CIF_var;

});

parcelRequire.register("jVK3t", function(module, exports) {
"use strict";

var $5vfvk = parcelRequire("5vfvk");


var $fL96e = parcelRequire("fL96e");

var $8bSCX = parcelRequire("8bSCX");

var $7fCj7 = parcelRequire("7fCj7");

const $e82710c62e00f0ec$var$debug = (parcelRequire("fD8Mg"))("ffi:FunctionType");
/**
 * Module exports.
 */ module.exports = $e82710c62e00f0ec$var$Function;
/**
 * Creates and returns a "type" object for a C "function pointer".
 *
 * @api public
 */ function $e82710c62e00f0ec$var$Function(retType, argTypes, abi) {
    if (!(this instanceof $e82710c62e00f0ec$var$Function)) return new $e82710c62e00f0ec$var$Function(retType, argTypes, abi);
    $e82710c62e00f0ec$var$debug("creating new FunctionType");
    // check args
    $lJiUQ$assert(!!retType, 'expected a return "type" object as the first argument');
    $lJiUQ$assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the second argument');
    // normalize the "types" (they could be strings, so turn into real type
    // instances)
    this.retType = $5vfvk.coerceType(retType);
    this.argTypes = argTypes.map($5vfvk.coerceType);
    this.abi = null == abi ? $fL96e.FFI_DEFAULT_ABI : abi;
}
/**
 * The "ffi_type" is set for node-ffi functions.
 */ $e82710c62e00f0ec$var$Function.prototype.ffi_type = $fL96e.FFI_TYPES.pointer;
/**
 * The "size" is always pointer-sized.
 */ $e82710c62e00f0ec$var$Function.prototype.size = $5vfvk.sizeof.pointer;
/**
 * The "alignment" is always pointer-aligned.
 */ $e82710c62e00f0ec$var$Function.prototype.alignment = $5vfvk.alignof.pointer;
/**
 * The "indirection" is always 1 to ensure that our get()/set() get called.
 */ $e82710c62e00f0ec$var$Function.prototype.indirection = 1;
/**
 * Returns a ffi.Callback pointer (Buffer) of this function type for the
 * given `fn` Function.
 */ $e82710c62e00f0ec$var$Function.prototype.toPointer = function toPointer(fn) {
    return $8bSCX(this.retType, this.argTypes, this.abi, fn);
};
/**
 * Returns a ffi.ForeignFunction (Function) of this function type for the
 * given `buf` Buffer.
 */ $e82710c62e00f0ec$var$Function.prototype.toFunction = function toFunction(buf) {
    return $7fCj7(buf, this.retType, this.argTypes, this.abi);
};
/**
 * get function; return a ForeignFunction instance.
 */ $e82710c62e00f0ec$var$Function.prototype.get = function get(buffer, offset) {
    $e82710c62e00f0ec$var$debug('ffi FunctionType "get" function');
    const ptr = buffer.readPointer(offset);
    return this.toFunction(ptr);
};
/**
 * set function; return a Callback buffer.
 */ $e82710c62e00f0ec$var$Function.prototype.set = function set(buffer, offset, value) {
    $e82710c62e00f0ec$var$debug('ffi FunctionType "set" function');
    let ptr;
    if ("function" == typeof value) ptr = this.toPointer(value);
    else if (Buffer.isBuffer(value)) ptr = value;
    else throw new Error("don't know how to set callback function for: " + value);
    buffer.writePointer(ptr, offset);
};

});
parcelRequire.register("8bSCX", function(module, exports) {
"use strict";

var $5vfvk = parcelRequire("5vfvk");

var $lMUnw = parcelRequire("lMUnw");


const $5f69b9adac26d337$var$debug = (parcelRequire("fD8Mg"))("ffi:Callback");

var $fL96e = parcelRequire("fL96e");
var $5f69b9adac26d337$require$_Callback = $fL96e.Callback;
// Function used to report errors to the current process event loop,
// When user callback function gets gced.
function $5f69b9adac26d337$var$errorReportCallback(err) {
    if (err) process.nextTick(function() {
        if (typeof err === "string") throw new Error(err);
        else throw err;
    });
}
/**
 * Turns a JavaScript function into a C function pointer.
 * The function pointer may be used in other C functions that
 * accept C callback functions.
 */ function $5f69b9adac26d337$var$Callback(retType, argTypes, abi, func) {
    $5f69b9adac26d337$var$debug("creating new Callback");
    if (typeof abi === "function") {
        func = abi;
        abi = undefined;
    }
    // check args
    $lJiUQ$assert(!!retType, 'expected a return "type" object as the first argument');
    $lJiUQ$assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the second argument');
    $lJiUQ$assert.equal(typeof func, "function", "expected a function as the third argument");
    // normalize the "types" (they could be strings, so turn into real type
    // instances)
    retType = $5vfvk.coerceType(retType);
    argTypes = argTypes.map($5vfvk.coerceType);
    // create the `ffi_cif *` instance
    const cif = $lMUnw(retType, argTypes, abi);
    const argc = argTypes.length;
    const callback = $5f69b9adac26d337$require$_Callback(cif, retType.size, argc, $5f69b9adac26d337$var$errorReportCallback, (retval, params)=>{
        $5f69b9adac26d337$var$debug("Callback function being invoked");
        try {
            const args = [];
            for(var i = 0; i < argc; i++){
                const type = argTypes[i];
                const argPtr = params.readPointer(i * $5vfvk.sizeof.pointer, type.size);
                argPtr.type = type;
                args.push(argPtr.deref());
            }
            // Invoke the user-given function
            const result = func.apply(null, args);
            try {
                $5vfvk.set(retval, 0, result, retType);
            } catch (e) {
                e.message = "error setting return value - " + e.message;
                throw e;
            }
        } catch (e) {
            return e;
        }
    });
    // store reference to the CIF Buffer so that it doesn't get
    // garbage collected before the callback Buffer does
    callback._cif = cif;
    return callback;
}
module.exports = $5f69b9adac26d337$var$Callback;

});

parcelRequire.register("7fCj7", function(module, exports) {
"use strict";

var $lMUnw = parcelRequire("lMUnw");

var $kkAeu = parcelRequire("kkAeu");

const $5477a624e401a03a$var$debug = (parcelRequire("fD8Mg"))("ffi:ForeignFunction");


var $5vfvk = parcelRequire("5vfvk");
/**
 * Represents a foreign function in another library. Manages all of the aspects
 * of function execution, including marshalling the data parameters for the
 * function into native types and also unmarshalling the return from function
 * execution.
 */ function $5477a624e401a03a$var$ForeignFunction(funcPtr, returnType, argTypes, abi) {
    $5477a624e401a03a$var$debug("creating new ForeignFunction", funcPtr);
    // check args
    $lJiUQ$assert(Buffer.isBuffer(funcPtr), "expected Buffer as first argument");
    $lJiUQ$assert(!!returnType, 'expected a return "type" object as the second argument');
    $lJiUQ$assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the third argument');
    // normalize the "types" (they could be strings,
    // so turn into real type instances)
    returnType = $5vfvk.coerceType(returnType);
    argTypes = argTypes.map($5vfvk.coerceType);
    // create the `ffi_cif *` instance
    const cif = $lMUnw(returnType, argTypes, abi);
    // create and return the JS proxy function
    return $kkAeu(cif, funcPtr, returnType, argTypes);
}
module.exports = $5477a624e401a03a$var$ForeignFunction;

});
parcelRequire.register("kkAeu", function(module, exports) {
"use strict";


const $ecd1c7f1f40bad0b$var$debug = (parcelRequire("fD8Mg"))("ffi:_ForeignFunction");

var $5vfvk = parcelRequire("5vfvk");

var $fL96e = parcelRequire("fL96e");
const $ecd1c7f1f40bad0b$var$POINTER_SIZE = $5vfvk.sizeof.pointer;
const $ecd1c7f1f40bad0b$var$FFI_ARG_SIZE = $fL96e.FFI_ARG_SIZE;
function $ecd1c7f1f40bad0b$var$ForeignFunction(cif, funcPtr, returnType, argTypes) {
    $ecd1c7f1f40bad0b$var$debug("creating new ForeignFunction", funcPtr);
    const numArgs = argTypes.length;
    const argsArraySize = numArgs * $ecd1c7f1f40bad0b$var$POINTER_SIZE;
    // "result" must point to storage that is sizeof(long) or larger. For smaller
    // return value sizes, the ffi_arg or ffi_sarg integral type must be used to
    // hold the return value
    const resultSize = returnType.size >= $5vfvk.sizeof.long ? returnType.size : $ecd1c7f1f40bad0b$var$FFI_ARG_SIZE;
    $lJiUQ$assert(resultSize > 0);
    /**
   * This is the actual JS function that gets returned.
   * It handles marshalling input arguments into C values,
   * and unmarshalling the return value back into a JS value
   */ const proxy = function() {
        $ecd1c7f1f40bad0b$var$debug("invoking proxy function");
        if (arguments.length !== numArgs) throw new TypeError("Expected " + numArgs + " arguments, got " + arguments.length);
        // storage buffers for input arguments and the return value
        const result = Buffer.alloc(resultSize);
        const argsList = Buffer.alloc(argsArraySize);
        // write arguments to storage areas
        let i;
        try {
            for(i = 0; i < numArgs; i++){
                const argType = argTypes[i];
                const val = arguments[i];
                const valPtr = $5vfvk.alloc(argType, val);
                argsList.writePointer(valPtr, i * $ecd1c7f1f40bad0b$var$POINTER_SIZE);
            }
        } catch (e) {
            // counting arguments from 1 is more human readable
            i++;
            e.message = "error setting argument " + i + " - " + e.message;
            throw e;
        }
        // invoke the `ffi_call()` function
        $fL96e.ffi_call(cif, funcPtr, result, argsList);
        result.type = returnType;
        return result.deref();
    };
    /**
   * The asynchronous version of the proxy function.
   */ proxy.async = function() {
        $ecd1c7f1f40bad0b$var$debug("invoking async proxy function");
        const argc = arguments.length;
        if (argc !== numArgs + 1) throw new TypeError("Expected " + (numArgs + 1) + " arguments, got " + argc);
        const callback = arguments[argc - 1];
        if (typeof callback !== "function") throw new TypeError("Expected a callback function as argument number: " + (argc - 1));
        // storage buffers for input arguments and the return value
        const result = Buffer.alloc(resultSize);
        const argsList = Buffer.alloc(argsArraySize);
        // write arguments to storage areas
        let i;
        try {
            for(i = 0; i < numArgs; i++){
                const argType = argTypes[i];
                const val = arguments[i];
                const valPtr = $5vfvk.alloc(argType, val);
                argsList.writePointer(valPtr, i * $ecd1c7f1f40bad0b$var$POINTER_SIZE);
            }
        } catch (e) {
            e.message = "error setting argument " + i + " - " + e.message;
            return process.nextTick(callback.bind(null, e));
        }
        // invoke the `ffi_call()` function asynchronously
        $fL96e.ffi_call_async(cif, funcPtr, result, argsList, function(err) {
            // make sure that the 4 Buffers passed in above don't get GC'd while we're
            // doing work on the thread pool...
            [
                cif,
                funcPtr,
                argsList
            ].map(()=>{});
            // now invoke the user-provided callback function
            if (err) callback(err);
            else {
                result.type = returnType;
                callback(null, result.deref());
            }
        });
    };
    return proxy;
}
module.exports = $ecd1c7f1f40bad0b$var$ForeignFunction;

});



parcelRequire.register("7XEu2", function(module, exports) {
"use strict";

var $dS6wn = parcelRequire("dS6wn");

var $fDp7d = parcelRequire("fDp7d");

var $kkAeu = parcelRequire("kkAeu");


const $5cbd7241d3538432$var$debug = (parcelRequire("fD8Mg"))("ffi:VariadicForeignFunction");

var $5vfvk = parcelRequire("5vfvk");

var $fL96e = parcelRequire("fL96e");
const $5cbd7241d3538432$var$POINTER_SIZE = $5vfvk.sizeof.pointer;
const $5cbd7241d3538432$var$FFI_ARG_SIZE = $fL96e.FFI_ARG_SIZE;
/**
 * For when you want to call to a C function with variable amount of arguments.
 * i.e. `printf()`.
 *
 * This function takes care of caching and reusing ForeignFunction instances that
 * contain the same ffi_type argument signature.
 */ function $5cbd7241d3538432$var$VariadicForeignFunction(funcPtr, returnType, fixedArgTypes, abi) {
    $5cbd7241d3538432$var$debug("creating new VariadicForeignFunction", funcPtr);
    // the cache of ForeignFunction instances that this
    // VariadicForeignFunction has created so far
    const cache = {};
    // check args
    $lJiUQ$assert(Buffer.isBuffer(funcPtr), "expected Buffer as first argument");
    $lJiUQ$assert(!!returnType, 'expected a return "type" object as the second argument');
    $lJiUQ$assert(Array.isArray(fixedArgTypes), 'expected Array of arg "type" objects as the third argument');
    const numFixedArgs = fixedArgTypes.length;
    // normalize the "types" (they could be strings,
    // so turn into real type instances)
    fixedArgTypes = fixedArgTypes.map($5vfvk.coerceType);
    // get the names of the fixed arg types
    const fixedKey = fixedArgTypes.map(function(type) {
        return $5cbd7241d3538432$var$getId(type);
    });
    // what gets returned is another function that needs to be invoked with the rest
    // of the variadic types that are being invoked from the function.
    function variadic_function_generator() {
        $5cbd7241d3538432$var$debug("variadic_function_generator invoked");
        // first get the types of variadic args we are working with
        const argTypes = fixedArgTypes.slice();
        let key = fixedKey.slice();
        for(let i = 0; i < arguments.length; i++){
            const type = $5vfvk.coerceType(arguments[i]);
            argTypes.push(type);
            const ffi_type = $fDp7d(type);
            $lJiUQ$assert(ffi_type.name);
            key.push($5cbd7241d3538432$var$getId(type));
        }
        // now figure out the return type
        const rtnType = $5vfvk.coerceType(variadic_function_generator.returnType);
        const rtnName = $5cbd7241d3538432$var$getId(rtnType);
        $lJiUQ$assert(rtnName);
        // first let's generate the key and see if we got a cache-hit
        key = rtnName + key.join("");
        let func = cache[key];
        if (func) $5cbd7241d3538432$var$debug("cache hit for key:", key);
        else {
            // create the `ffi_cif *` instance
            $5cbd7241d3538432$var$debug("creating the variadic ffi_cif instance for key:", key);
            const cif = $dS6wn(returnType, argTypes, numFixedArgs, abi);
            func = cache[key] = $kkAeu(cif, funcPtr, rtnType, argTypes);
        }
        return func;
    }
    // set the return type. we set it as a property of the function generator to
    // allow for monkey patching the return value in the very rare case where the
    // return type is variadic as well
    variadic_function_generator.returnType = returnType;
    return variadic_function_generator;
}
module.exports = $5cbd7241d3538432$var$VariadicForeignFunction;
const $5cbd7241d3538432$var$idKey = "_ffiId";
let $5cbd7241d3538432$var$counter = 0;
function $5cbd7241d3538432$var$getId(type) {
    if (!type.hasOwnProperty($5cbd7241d3538432$var$idKey)) type[$5cbd7241d3538432$var$idKey] = (($5cbd7241d3538432$var$counter++) * 0x10000 | 0).toString(16);
    return type[$5cbd7241d3538432$var$idKey];
}

});

parcelRequire.register("fCwju", function(module, exports) {
"use strict";

var $7fCj7 = parcelRequire("7fCj7");


const $b5f3786505803c36$var$debug = (parcelRequire("fD8Mg"))("ffi:DynamicLibrary");

var $fL96e = parcelRequire("fL96e");
const $b5f3786505803c36$var$funcs = $fL96e.StaticFunctions;

var $5vfvk = parcelRequire("5vfvk");

var $b5f3786505803c36$require$read = $lJiUQ$fs.readFileSync;
// typedefs
const $b5f3786505803c36$var$int = $5vfvk.types.int;
const $b5f3786505803c36$var$voidPtr = $5vfvk.refType($5vfvk.types.void);
const $b5f3786505803c36$var$dlopen = $7fCj7($b5f3786505803c36$var$funcs.dlopen, $b5f3786505803c36$var$voidPtr, [
    "string",
    $b5f3786505803c36$var$int
]);
const $b5f3786505803c36$var$dlclose = $7fCj7($b5f3786505803c36$var$funcs.dlclose, $b5f3786505803c36$var$int, [
    $b5f3786505803c36$var$voidPtr
]);
const $b5f3786505803c36$var$dlsym = $7fCj7($b5f3786505803c36$var$funcs.dlsym, $b5f3786505803c36$var$voidPtr, [
    $b5f3786505803c36$var$voidPtr,
    "string"
]);
const $b5f3786505803c36$var$dlerror = $7fCj7($b5f3786505803c36$var$funcs.dlerror, "string", []);
/**
 * `DynamicLibrary` loads and fetches function pointers for dynamic libraries
 * (.so, .dylib, etc). After the libray's function pointer is acquired, then you
 * call `get(symbol)` to retreive a pointer to an exported symbol. You need to
 * call `get___()` on the pointer to dereference it into its actual value, or
 * turn the pointer into a callable function with `ForeignFunction`.
 */ function $b5f3786505803c36$var$DynamicLibrary(path, mode) {
    if (!(this instanceof $b5f3786505803c36$var$DynamicLibrary)) return new $b5f3786505803c36$var$DynamicLibrary(path, mode);
    $b5f3786505803c36$var$debug("new DynamicLibrary()", path, mode);
    if (null == mode) mode = $b5f3786505803c36$var$DynamicLibrary.FLAGS.RTLD_LAZY;
    this._path = path;
    this._handle = $b5f3786505803c36$var$dlopen(path, mode);
    $lJiUQ$assert(Buffer.isBuffer(this._handle), "expected a Buffer instance to be returned from `dlopen()`");
    if (this._handle.isNull()) {
        var err = this.error();
        // THIS CODE IS BASED ON GHC Trac ticket #2615
        // http://hackage.haskell.org/trac/ghc/attachment/ticket/2615
        // On some systems (e.g., Gentoo Linux) dynamic files (e.g. libc.so)
        // contain linker scripts rather than ELF-format object code. This
        // code handles the situation by recognizing the real object code
        // file name given in the linker script.
        // If an "invalid ELF header" error occurs, it is assumed that the
        // .so file contains a linker script instead of ELF object code.
        // In this case, the code looks for the GROUP ( ... ) linker
        // directive. If one is found, the first file name inside the
        // parentheses is treated as the name of a dynamic library and the
        // code attempts to dlopen that file. If this is also unsuccessful,
        // an error message is returned.
        // see if the error message is due to an invalid ELF header
        let match;
        if (match = err.match(/^(([^ \t()])+\.so([^ \t:()])*):([ \t])*/)) {
            const content = $b5f3786505803c36$require$read(match[1], "ascii");
            // try to find a GROUP ( ... ) command
            if (match = content.match(/GROUP *\( *(([^ )])+)/)) return $b5f3786505803c36$var$DynamicLibrary.call(this, match[1], mode);
        }
        throw new Error("Dynamic Linking Error: " + err);
    }
}
module.exports = $b5f3786505803c36$var$DynamicLibrary;
/**
 * Set the exported flags from "dlfcn.h"
 */ $b5f3786505803c36$var$DynamicLibrary.FLAGS = {};
Object.keys($fL96e).forEach(function(k) {
    if (!/^RTLD_/.test(k)) return;
    const desc = Object.getOwnPropertyDescriptor($fL96e, k);
    Object.defineProperty($b5f3786505803c36$var$DynamicLibrary.FLAGS, k, desc);
});
/**
 * Close this library, returns the result of the dlclose() system function.
 */ $b5f3786505803c36$var$DynamicLibrary.prototype.close = function() {
    $b5f3786505803c36$var$debug("dlclose()");
    return $b5f3786505803c36$var$dlclose(this._handle);
};
/**
 * Get a symbol from this library, returns a Pointer for (memory address of) the symbol
 */ $b5f3786505803c36$var$DynamicLibrary.prototype.get = function(symbol) {
    $b5f3786505803c36$var$debug("dlsym()", symbol);
    $lJiUQ$assert.strictEqual("string", typeof symbol);
    const ptr = $b5f3786505803c36$var$dlsym(this._handle, symbol);
    $lJiUQ$assert(Buffer.isBuffer(ptr));
    if (ptr.isNull()) throw new Error("Dynamic Symbol Retrieval Error: " + this.error());
    ptr.name = symbol;
    return ptr;
};
/**
 * Returns the result of the dlerror() system function
 */ $b5f3786505803c36$var$DynamicLibrary.prototype.error = function error() {
    $b5f3786505803c36$var$debug("dlerror()");
    return $b5f3786505803c36$var$dlerror();
};
/**
 * Returns the path originally passed to the constructor
 */ $b5f3786505803c36$var$DynamicLibrary.prototype.path = function error() {
    return this._path;
};

});

parcelRequire.register("2lRdN", function(module, exports) {
"use strict";

var $fCwju = parcelRequire("fCwju");

var $7fCj7 = parcelRequire("7fCj7");

var $7XEu2 = parcelRequire("7XEu2");

const $1b66d39f8203e8e3$var$debug = (parcelRequire("fD8Mg"))("ffi:Library");
const $1b66d39f8203e8e3$var$RTLD_NOW = $fCwju.FLAGS.RTLD_NOW;
/**
 * The extension to use on libraries.
 * i.e.  libm  ->  libm.so   on linux
 */ const $1b66d39f8203e8e3$var$EXT = $1b66d39f8203e8e3$var$Library.EXT = ({
    "linux": ".so",
    "linux2": ".so",
    "sunos": ".so",
    "solaris": ".so",
    "freebsd": ".so",
    "openbsd": ".so",
    "darwin": ".dylib",
    "mac": ".dylib",
    "win32": ".dll"
})[process.platform];
/**
 * Provides a friendly abstraction/API on-top of DynamicLibrary and
 * ForeignFunction.
 */ function $1b66d39f8203e8e3$var$Library(libfile, funcs, lib) {
    $1b66d39f8203e8e3$var$debug("creating Library object for", libfile);
    if (libfile && typeof libfile === "string" && libfile.indexOf($1b66d39f8203e8e3$var$EXT) === -1) {
        $1b66d39f8203e8e3$var$debug("appending library extension to library name", $1b66d39f8203e8e3$var$EXT);
        libfile += $1b66d39f8203e8e3$var$EXT;
    }
    if (!lib) lib = {};
    let dl;
    if (typeof libfile === "string" || !libfile) dl = new $fCwju(libfile || null, $1b66d39f8203e8e3$var$RTLD_NOW);
    else dl = libfile;
    Object.keys(funcs || {}).forEach(function(func) {
        $1b66d39f8203e8e3$var$debug("defining function", func);
        const fptr = dl.get(func);
        const info = funcs[func];
        if (fptr.isNull()) throw new Error('Library: "' + dl.path() + '" returned NULL function pointer for "' + func + '"');
        const resultType = info[0];
        const paramTypes = info[1];
        const fopts = info[2];
        const abi = fopts && fopts.abi;
        const async = fopts && fopts.async;
        const varargs = fopts && fopts.varargs;
        if (varargs) lib[func] = $7XEu2(fptr, resultType, paramTypes, abi);
        else {
            const ff = $7fCj7(fptr, resultType, paramTypes, abi);
            lib[func] = async ? ff.async : ff;
        }
    });
    return lib;
}
module.exports = $1b66d39f8203e8e3$var$Library;

});

parcelRequire.register("6BVXM", function(module, exports) {
"use strict";

var $fCwju = parcelRequire("fCwju");

var $7fCj7 = parcelRequire("7fCj7");

var $fL96e = parcelRequire("fL96e");
const $4d03290a4f5a01e6$var$funcs = $fL96e.StaticFunctions;

var $5vfvk = parcelRequire("5vfvk");
const $4d03290a4f5a01e6$var$int = $5vfvk.types.int;
const $4d03290a4f5a01e6$var$intPtr = $5vfvk.refType($4d03290a4f5a01e6$var$int);
let $4d03290a4f5a01e6$var$errno = null;
if (process.platform == "win32") {
    const _errno = $fCwju("msvcrt.dll").get("_errno");
    const errnoPtr = $7fCj7(_errno, $4d03290a4f5a01e6$var$intPtr, []);
    $4d03290a4f5a01e6$var$errno = function() {
        return errnoPtr().deref();
    };
} else $4d03290a4f5a01e6$var$errno = $7fCj7($4d03290a4f5a01e6$var$funcs._errno, "int", []);
module.exports = $4d03290a4f5a01e6$var$errno;

});

var $503b3d7c3341aa9e$exports = {};

$parcel$export($503b3d7c3341aa9e$exports, "_WIN64_HOLDER", () => $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
$parcel$export($503b3d7c3341aa9e$exports, "_UNICODE_HOLDER", () => $503b3d7c3341aa9e$export$609085a058d4a4d0);
$parcel$export($503b3d7c3341aa9e$exports, "windefSkipKeys", () => $503b3d7c3341aa9e$export$527cfc1519820a40);
$parcel$export($503b3d7c3341aa9e$exports, "_WIN64", () => $503b3d7c3341aa9e$export$def1b823ebd5706b);
$parcel$export($503b3d7c3341aa9e$exports, "_UNICODE", () => $503b3d7c3341aa9e$export$cba91b4ce33b8ea);
$parcel$export($503b3d7c3341aa9e$exports, "settingsDefault", () => $503b3d7c3341aa9e$export$f6b5b44fcd8003ee);
$parcel$export($503b3d7c3341aa9e$exports, "windefSet", () => $503b3d7c3341aa9e$export$65a4230322ab1784);
const $503b3d7c3341aa9e$export$4bbcbb9e6d314d55 = "_WIN64_HOLDER_";
const $503b3d7c3341aa9e$export$609085a058d4a4d0 = "_UNICODE_HOLDER_";
const $503b3d7c3341aa9e$export$527cfc1519820a40 = new Set([
    "macroMap"
]);
const $503b3d7c3341aa9e$export$def1b823ebd5706b = process.arch === "x64";
const $503b3d7c3341aa9e$export$cba91b4ce33b8ea = true;
const $503b3d7c3341aa9e$export$f6b5b44fcd8003ee = {
    singleton: true,
    _UNICODE: $503b3d7c3341aa9e$export$cba91b4ce33b8ea,
    _WIN64: $503b3d7c3341aa9e$export$def1b823ebd5706b
};
const $503b3d7c3341aa9e$export$65a4230322ab1784 = new Set([
    "bool",
    "bool*",
    "byte",
    "byte*",
    "char",
    "uchar",
    "char*",
    "float",
    "float*",
    "int",
    "int8",
    "int16",
    "int32",
    "int64",
    "int*",
    "int8*",
    "int16*",
    "int32*",
    "int64*",
    "uint",
    "uint8",
    "uint16",
    "uint32",
    "uint64",
    "uint*",
    "uint8*",
    "uint16*",
    "uint32*",
    "uint64*",
    "int**",
    "uint**",
    "uint32**",
    "uint64**",
    "long",
    "longlong",
    "long*",
    "longlong*",
    "pointer",
    "ushort",
    "void",
    "void*", 
]);


var $33b0a82c44a922ab$exports = {};

$parcel$export($33b0a82c44a922ab$exports, "ALTTABINFO", () => $33b0a82c44a922ab$export$ad48b1b2cfc75809);
$parcel$export($33b0a82c44a922ab$exports, "COPYDATASTRUCT", () => $33b0a82c44a922ab$export$235a24185e6c03f3);
$parcel$export($33b0a82c44a922ab$exports, "HARDWAREINPUT", () => $33b0a82c44a922ab$export$c747a8b76ce2fc55);
$parcel$export($33b0a82c44a922ab$exports, "INITCOMMONCONTROLSEX", () => $33b0a82c44a922ab$export$6eb78d635a3ee587);
$parcel$export($33b0a82c44a922ab$exports, "KEYBDINPUT", () => $33b0a82c44a922ab$export$9d77698e6144d105);
$parcel$export($33b0a82c44a922ab$exports, "MOUSEINPUT", () => $33b0a82c44a922ab$export$b25d5f19497424fa);
$parcel$export($33b0a82c44a922ab$exports, "MSG", () => $33b0a82c44a922ab$export$f99154f7a7b0135d);
$parcel$export($33b0a82c44a922ab$exports, "POINT", () => $33b0a82c44a922ab$export$a80a24d37f0f1279);
$parcel$export($33b0a82c44a922ab$exports, "PROCESS_BASIC_INFORMATION", () => $33b0a82c44a922ab$export$ca65a5b05e68b7ff);
$parcel$export($33b0a82c44a922ab$exports, "UNICODE_STRING", () => $33b0a82c44a922ab$export$5dcce0e722389cdb);
$parcel$export($33b0a82c44a922ab$exports, "RAWHID", () => $33b0a82c44a922ab$export$109b0986e0806ee);
$parcel$export($33b0a82c44a922ab$exports, "RAWINPUTDEVICELIST", () => $33b0a82c44a922ab$export$cf7f2abb0ac9e892);
$parcel$export($33b0a82c44a922ab$exports, "RAWINPUTHEADER", () => $33b0a82c44a922ab$export$614c933f340ce1c1);
$parcel$export($33b0a82c44a922ab$exports, "RAWKEYBOARD", () => $33b0a82c44a922ab$export$7f9753d8aef93f40);
$parcel$export($33b0a82c44a922ab$exports, "WINDOWINFO", () => $33b0a82c44a922ab$export$5119761222d7d0f6);
$parcel$export($33b0a82c44a922ab$exports, "WNDCLASSEX", () => $33b0a82c44a922ab$export$81ef613fbd3a628d);
$parcel$export($33b0a82c44a922ab$exports, "RECT", () => $33b0a82c44a922ab$export$1e530543ba1d4b12);
$parcel$export($33b0a82c44a922ab$exports, "_RECT", () => $33b0a82c44a922ab$export$1e530543ba1d4b12);
$parcel$export($33b0a82c44a922ab$exports, "FILETIME", () => $33b0a82c44a922ab$export$258339e884eb70b7);

function $1714c89fc73ee793$export$828a2cfb74eb348c(windefObj, macroMap, settings) {
    const ww = $1714c89fc73ee793$var$clone_filter_windef(windefObj); // output without macroMap
    const macroSrc = $1714c89fc73ee793$var$prepare_macro(macroMap, settings);
    const ret = $1714c89fc73ee793$var$prepare_windef_ref(ww, macroSrc);
    $1714c89fc73ee793$export$6b50c41cc4aa2277(ret, (0, $503b3d7c3341aa9e$export$65a4230322ab1784));
    return ret;
}
/**
 * convert typeof array of param to string
 * such like ['_WIN64_HOLDER_', 'int64', 'int32'], no changed returning when string
 */ function $1714c89fc73ee793$var$parse_param_placeholder(param, settings) {
    if (typeof param === "string") return param;
    else if (!param) throw new Error("parse_param_placeholder(ps, settings) value of ps invalid");
    else if (!Array.isArray(param) || param.length !== 3) throw new Error("parse_param_placeholder(ps, settings) value of ps must Array and has THREE elements");
    const st = $1714c89fc73ee793$var$parse_settings(settings);
    let ps = "";
    switch(param[0]){
        case 0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55:
            ps = $1714c89fc73ee793$var$parse_placeholder_arch(param, st._WIN64);
            break;
        case 0, $503b3d7c3341aa9e$export$609085a058d4a4d0:
            ps = $1714c89fc73ee793$var$parse_placeholder_unicode(param, st._UNICODE);
            break;
        default:
            throw new Error("the value of param placeholder invlaid:" + param[0]);
    }
    return ps;
}
// convert param like ['_WIN64_HOLDER_', 'int64', 'int32] to 'int64' or 'int32'
function $1714c89fc73ee793$var$parse_placeholder_arch(param, _WIN64) {
    if (typeof param === "string") return param;
    else if (!param || param.length !== 3) throw new Error("_WIN64 macro should be Array and has 3 items");
    return _WIN64 ? param[1] : param[2];
}
// convert param like ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
function $1714c89fc73ee793$var$parse_placeholder_unicode(param, _UNICODE) {
    if (typeof param === "string") return param;
    else if (!param || param.length !== 3) throw new Error("_UNICODE macro should be Array and has 3 items");
    return _UNICODE ? param[1] : param[2];
}
/**
 * parse ['_WIN64_HOLDER', 'int64*', 'int32*'] to 'int64*' or 'int32'
 * or ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
 */ function $1714c89fc73ee793$var$prepare_macro(macroMap, settings) {
    const ret = new Map();
    // v string|array
    for (const [k, v] of macroMap.entries())ret.set(k, $1714c89fc73ee793$var$parse_param_placeholder(v, settings));
    return ret;
}
/**
 * parse const HANDLE = 'PVOID' to the realy FFIParam (like 'uint32*')
 * macroMap <['PVOID', 'uint32*'], ...>
 */ function $1714c89fc73ee793$var$prepare_windef_ref(ww, macroSrc) {
    const ret = {};
    const map = new Map();
    // first loop paser keys which exists in macroSrc
    for (const x of Object.keys(ww)){
        /* istanbul ignore next */ if (map.has(x)) continue;
        if (macroSrc.has(x)) {
            const vv = macroSrc.get(x);
            if (vv) map.set(x, vv);
            else throw new Error(`Value of macroSrc item "${x}" blank`);
        } else continue; // not throw error
    }
    // 2nd loop paser key , maybe value refer other key
    for (const [k1, v1] of Object.entries(ww)){
        /* istanbul ignore next */ if (map.has(k1)) continue;
        if (typeof v1 === "string") {
            if ((0, $503b3d7c3341aa9e$export$65a4230322ab1784).has(v1)) map.set(k1, v1);
            else {
                const value = $1714c89fc73ee793$export$653d6aa060f2e229(v1, ww, macroSrc);
                // tslint:disable-next-line
                if (typeof value === "string" && value) map.set(k1, value);
                else map.set(k1, v1); // maybe invalid for windefSet, will validateWinData() later
            }
        } else throw new Error(`prepare_windef_ref() missing entry for k/v: ${k1}/"N/A"`);
    }
    map.forEach((v, k)=>{
        ret[k] = v;
    });
    return ret;
}
function $1714c89fc73ee793$var$clone_filter_windef(windef) {
    const ret = {};
    for (const x of Object.keys(windef)){
        if (typeof windef[x] === "string") Object.defineProperty(ret, x, {
            value: windef[x],
            writable: true,
            enumerable: true,
            configurable: true
        });
        else throw new Error(`typeof value of ${x} NOT string`);
    }
    return ret;
}
function $1714c89fc73ee793$var$parse_settings(settings) {
    const st = {
        ...(0, $503b3d7c3341aa9e$export$f6b5b44fcd8003ee)
    };
    if (typeof settings !== "undefined" && Object.keys(settings).length) Object.assign(st, settings);
    return st;
}
function $1714c89fc73ee793$export$653d6aa060f2e229(key, ww, macroSrc) {
    let ret = $1714c89fc73ee793$var$_lookupRef(key, ww, macroSrc);
    if (!ret) return "";
    for(let i = 0, len = 3; i < len; i += 1){
        const tmp = $1714c89fc73ee793$var$_lookupRef(ret, ww, macroSrc);
        if (tmp) ret = tmp;
        else break;
    }
    return ret;
}
function $1714c89fc73ee793$var$_lookupRef(key, ww, macroSrc) {
    if (macroSrc.has(key)) return macroSrc.get(key);
    // key is not valid FFIParam such 'int/uint...', like HMODULE: 'HANDLE'
    if (typeof ww[key] === "string") {
        // parse HANDLE: 'PVOID' , PVOID already parsed
        const ret = ww[key];
        if (ret && macroSrc.has(ret)) return macroSrc.get(ret);
        return ret;
    }
    return "";
}
function $1714c89fc73ee793$export$f6e45c3615c9e25a(key, srcSet) {
    return !!srcSet.has(key);
}
function $1714c89fc73ee793$export$6b50c41cc4aa2277(windef, srcSet) {
    for (const [k, v] of Object.entries(windef)){
        if (!k || !v) throw new Error(`validateWinData() k or v empty: "${k}"/"${v}"`);
        if (typeof v !== "string") throw new Error(`validateWinData() v not typeof string: "${k}"/"N/A"`);
        if (!$1714c89fc73ee793$export$f6e45c3615c9e25a(v, srcSet)) throw new Error(`validateWinData() value is invalid ffi param value: "${k}"/"${v}", may extra space`);
    }
}



var $a3401733cedc1617$exports = {};

$parcel$export($a3401733cedc1617$exports, "ATOM", () => $a3401733cedc1617$export$a78dc2c4cbd70341);
$parcel$export($a3401733cedc1617$exports, "DWORD", () => $a3401733cedc1617$export$181c9ad1752440f7);
$parcel$export($a3401733cedc1617$exports, "PVOID", () => $a3401733cedc1617$export$9cb553b951e1e0d8);
$parcel$export($a3401733cedc1617$exports, "HANDLE", () => $a3401733cedc1617$export$1f4a129e1195d18a);
$parcel$export($a3401733cedc1617$exports, "HANDLE_PVOID", () => $a3401733cedc1617$export$bd8b6af04676495);
$parcel$export($a3401733cedc1617$exports, "LONG_PTR", () => $a3401733cedc1617$export$f60fc96aa99c605e);
$parcel$export($a3401733cedc1617$exports, "ULONG_PTR", () => $a3401733cedc1617$export$2e482cd8c991e558);
$parcel$export($a3401733cedc1617$exports, "VOID", () => $a3401733cedc1617$export$1cd1943b3a73bbe8);
$parcel$export($a3401733cedc1617$exports, "WCHAR", () => $a3401733cedc1617$export$d71e2b267f5b711b);
$parcel$export($a3401733cedc1617$exports, "WORD", () => $a3401733cedc1617$export$f3a79cf462faa1e3);
$parcel$export($a3401733cedc1617$exports, "BOOL", () => $a3401733cedc1617$export$c35dd5647862f990);
$parcel$export($a3401733cedc1617$exports, "BOOLEAN", () => $a3401733cedc1617$export$428cfe48a69a3b4f);
$parcel$export($a3401733cedc1617$exports, "BYTE", () => $a3401733cedc1617$export$8f4bf8f7eb581284);
$parcel$export($a3401733cedc1617$exports, "CALLBACK", () => $a3401733cedc1617$export$578a4c3d73a6d794);
$parcel$export($a3401733cedc1617$exports, "CCHAR", () => $a3401733cedc1617$export$934996f637259e88);
$parcel$export($a3401733cedc1617$exports, "CHAR", () => $a3401733cedc1617$export$9e88d7b6f62f62d8);
$parcel$export($a3401733cedc1617$exports, "COLORREF", () => $a3401733cedc1617$export$52da70d84f582c04);
$parcel$export($a3401733cedc1617$exports, "DWORDLONG", () => $a3401733cedc1617$export$6b766bfdcf67e2ec);
$parcel$export($a3401733cedc1617$exports, "DWORD_PTR", () => $a3401733cedc1617$export$8f7b8c11edcb3e34);
$parcel$export($a3401733cedc1617$exports, "DWORD32", () => $a3401733cedc1617$export$a8ea5b58ae88fc11);
$parcel$export($a3401733cedc1617$exports, "DWORD64", () => $a3401733cedc1617$export$8db31e1b1c7e0db0);
$parcel$export($a3401733cedc1617$exports, "FLOAT", () => $a3401733cedc1617$export$d2b086fd1e01e03a);
$parcel$export($a3401733cedc1617$exports, "HACCEL", () => $a3401733cedc1617$export$1505c2c04cc3bbef);
$parcel$export($a3401733cedc1617$exports, "HALF_PTR", () => $a3401733cedc1617$export$2d081f52dd94061a);
$parcel$export($a3401733cedc1617$exports, "HBITMAP", () => $a3401733cedc1617$export$49cd303f01f67350);
$parcel$export($a3401733cedc1617$exports, "HBRUSH", () => $a3401733cedc1617$export$d17b38c787d37ab8);
$parcel$export($a3401733cedc1617$exports, "HCOLORSPACE", () => $a3401733cedc1617$export$56c7641f121a2c5c);
$parcel$export($a3401733cedc1617$exports, "HCONV", () => $a3401733cedc1617$export$762b8b6ee0ff4c44);
$parcel$export($a3401733cedc1617$exports, "HCONVLIST", () => $a3401733cedc1617$export$750eee7b2f0ee030);
$parcel$export($a3401733cedc1617$exports, "HCURSOR", () => $a3401733cedc1617$export$a02796fdca6d354a);
$parcel$export($a3401733cedc1617$exports, "HDC", () => $a3401733cedc1617$export$1a62f6d54b236e36);
$parcel$export($a3401733cedc1617$exports, "HDDEDATA", () => $a3401733cedc1617$export$4ddde23cd7155d44);
$parcel$export($a3401733cedc1617$exports, "HDESK", () => $a3401733cedc1617$export$1d0ad5eb60ffc518);
$parcel$export($a3401733cedc1617$exports, "HDROP", () => $a3401733cedc1617$export$726c5c347609dae3);
$parcel$export($a3401733cedc1617$exports, "HDWP", () => $a3401733cedc1617$export$323f06abdd2a59da);
$parcel$export($a3401733cedc1617$exports, "HENHMETAFILE", () => $a3401733cedc1617$export$a43730eb8bf8b76e);
$parcel$export($a3401733cedc1617$exports, "HFILE", () => $a3401733cedc1617$export$91f6f659ef3d1edd);
$parcel$export($a3401733cedc1617$exports, "HFONT", () => $a3401733cedc1617$export$229672d8f6dd9e1a);
$parcel$export($a3401733cedc1617$exports, "HGDIOBJ", () => $a3401733cedc1617$export$ef0ae13fba225584);
$parcel$export($a3401733cedc1617$exports, "HGLOBAL", () => $a3401733cedc1617$export$6b52c27577dfb85e);
$parcel$export($a3401733cedc1617$exports, "HHOOK", () => $a3401733cedc1617$export$a681c4a7983815bf);
$parcel$export($a3401733cedc1617$exports, "HICON", () => $a3401733cedc1617$export$105fd39584a4c170);
$parcel$export($a3401733cedc1617$exports, "HINSTANCE", () => $a3401733cedc1617$export$1a50b4f53ac33a);
$parcel$export($a3401733cedc1617$exports, "HKEY", () => $a3401733cedc1617$export$80d8783aa08e677d);
$parcel$export($a3401733cedc1617$exports, "HKL", () => $a3401733cedc1617$export$9252a4926414af53);
$parcel$export($a3401733cedc1617$exports, "HLOCAL", () => $a3401733cedc1617$export$941fbb37db50e0ee);
$parcel$export($a3401733cedc1617$exports, "HMENU", () => $a3401733cedc1617$export$5570ee796bf8668a);
$parcel$export($a3401733cedc1617$exports, "HMETAFILE", () => $a3401733cedc1617$export$32e1d6dd1d786a08);
$parcel$export($a3401733cedc1617$exports, "HMODULE", () => $a3401733cedc1617$export$82cb6941373786ac);
$parcel$export($a3401733cedc1617$exports, "HMONITOR", () => $a3401733cedc1617$export$d76bcd896c4c1f0b);
$parcel$export($a3401733cedc1617$exports, "HPALETTE", () => $a3401733cedc1617$export$c984542fbcd9e311);
$parcel$export($a3401733cedc1617$exports, "HPEN", () => $a3401733cedc1617$export$e8c398641ae921a0);
$parcel$export($a3401733cedc1617$exports, "HRESULT", () => $a3401733cedc1617$export$2109f3ca8e001dc3);
$parcel$export($a3401733cedc1617$exports, "HRGN", () => $a3401733cedc1617$export$64129906a6b15c89);
$parcel$export($a3401733cedc1617$exports, "HRSRC", () => $a3401733cedc1617$export$d0b96b23ab9f5338);
$parcel$export($a3401733cedc1617$exports, "HSZ", () => $a3401733cedc1617$export$c50eccdd15c9fd55);
$parcel$export($a3401733cedc1617$exports, "HWINEVENTHOOK", () => $a3401733cedc1617$export$60bcb2927641b3f4);
$parcel$export($a3401733cedc1617$exports, "HWINSTA", () => $a3401733cedc1617$export$893fa35bdef36b);
$parcel$export($a3401733cedc1617$exports, "HWND", () => $a3401733cedc1617$export$6525812590d9a476);
$parcel$export($a3401733cedc1617$exports, "INT", () => $a3401733cedc1617$export$160e8bdd97bfce3a);
$parcel$export($a3401733cedc1617$exports, "INT_PTR", () => $a3401733cedc1617$export$f051d14373139dee);
$parcel$export($a3401733cedc1617$exports, "INT8", () => $a3401733cedc1617$export$9922471c07c2891d);
$parcel$export($a3401733cedc1617$exports, "INT16", () => $a3401733cedc1617$export$bd9b91838fde002e);
$parcel$export($a3401733cedc1617$exports, "INT32", () => $a3401733cedc1617$export$34412edc7b36f85);
$parcel$export($a3401733cedc1617$exports, "INT64", () => $a3401733cedc1617$export$a2c63c68aeee9e2d);
$parcel$export($a3401733cedc1617$exports, "LANGID", () => $a3401733cedc1617$export$6190ebba87077b9d);
$parcel$export($a3401733cedc1617$exports, "LCID", () => $a3401733cedc1617$export$b36cf4a83245c2f9);
$parcel$export($a3401733cedc1617$exports, "LCTYPE", () => $a3401733cedc1617$export$244c0463aedba74c);
$parcel$export($a3401733cedc1617$exports, "LGRPID", () => $a3401733cedc1617$export$202821be4d3b65c7);
$parcel$export($a3401733cedc1617$exports, "LONG", () => $a3401733cedc1617$export$686cfa64f218be7a);
$parcel$export($a3401733cedc1617$exports, "LONGLONG", () => $a3401733cedc1617$export$2d2033f38dde21c);
$parcel$export($a3401733cedc1617$exports, "LONG32", () => $a3401733cedc1617$export$4c9cb8eafd43015e);
$parcel$export($a3401733cedc1617$exports, "LONG64", () => $a3401733cedc1617$export$552dea698acd6cd2);
$parcel$export($a3401733cedc1617$exports, "LPARAM", () => $a3401733cedc1617$export$13371aace3d44948);
$parcel$export($a3401733cedc1617$exports, "LPBOOL", () => $a3401733cedc1617$export$5df7e4acce683059);
$parcel$export($a3401733cedc1617$exports, "LPBYTE", () => $a3401733cedc1617$export$1061811df8b0c9be);
$parcel$export($a3401733cedc1617$exports, "LPCOLORREF", () => $a3401733cedc1617$export$f1d7ba3e4d51498c);
$parcel$export($a3401733cedc1617$exports, "LPCSTR", () => $a3401733cedc1617$export$18e7280707df82f3);
$parcel$export($a3401733cedc1617$exports, "LPCWSTR", () => $a3401733cedc1617$export$dfa283df2530598f);
$parcel$export($a3401733cedc1617$exports, "LPCTSTR", () => $a3401733cedc1617$export$3e6b4f6079ce51b);
$parcel$export($a3401733cedc1617$exports, "LPVOID", () => $a3401733cedc1617$export$3de86eb3806b712d);
$parcel$export($a3401733cedc1617$exports, "LPCVOID", () => $a3401733cedc1617$export$acb32c160acad508);
$parcel$export($a3401733cedc1617$exports, "LPDWORD", () => $a3401733cedc1617$export$33eafb5d436e1362);
$parcel$export($a3401733cedc1617$exports, "LPHANDLE", () => $a3401733cedc1617$export$e8ea75f05566dd3c);
$parcel$export($a3401733cedc1617$exports, "LPINT", () => $a3401733cedc1617$export$b4d77e4f53c21e3a);
$parcel$export($a3401733cedc1617$exports, "LPLONG", () => $a3401733cedc1617$export$ca6bd9f017df4953);
$parcel$export($a3401733cedc1617$exports, "LPMSG", () => $a3401733cedc1617$export$aba1f5f1221c9fb3);
$parcel$export($a3401733cedc1617$exports, "LPPOINT", () => $a3401733cedc1617$export$3a00c33c250e7d86);
$parcel$export($a3401733cedc1617$exports, "LPSTR", () => $a3401733cedc1617$export$e5fae31862228632);
$parcel$export($a3401733cedc1617$exports, "LPWSTR", () => $a3401733cedc1617$export$dec24c174f0eaee1);
$parcel$export($a3401733cedc1617$exports, "LPTSTR", () => $a3401733cedc1617$export$477e24a98da955e6);
$parcel$export($a3401733cedc1617$exports, "LPWORD", () => $a3401733cedc1617$export$a362e06a8759641a);
$parcel$export($a3401733cedc1617$exports, "LRESULT", () => $a3401733cedc1617$export$307c691072d7eef0);
$parcel$export($a3401733cedc1617$exports, "NTSTATUS", () => $a3401733cedc1617$export$a50474266f14be1b);
$parcel$export($a3401733cedc1617$exports, "PBOOL", () => $a3401733cedc1617$export$a1d44ba3d847cfd0);
$parcel$export($a3401733cedc1617$exports, "PBOOLEAN", () => $a3401733cedc1617$export$4f984d513e291397);
$parcel$export($a3401733cedc1617$exports, "PBYTE", () => $a3401733cedc1617$export$306fa084066e20a7);
$parcel$export($a3401733cedc1617$exports, "PCHAR", () => $a3401733cedc1617$export$72c3772b516a65cf);
$parcel$export($a3401733cedc1617$exports, "PCSTR", () => $a3401733cedc1617$export$cf99bbd665f301f9);
$parcel$export($a3401733cedc1617$exports, "PCTSTR", () => $a3401733cedc1617$export$d63ff7816142b2f4);
$parcel$export($a3401733cedc1617$exports, "PCWSTR", () => $a3401733cedc1617$export$8aeea065f4882b0c);
$parcel$export($a3401733cedc1617$exports, "PDWORD", () => $a3401733cedc1617$export$c06eff3fc862da47);
$parcel$export($a3401733cedc1617$exports, "PDWORDLONG", () => $a3401733cedc1617$export$e09b44cec70f0704);
$parcel$export($a3401733cedc1617$exports, "PDWORD_PTR", () => $a3401733cedc1617$export$a2bbf1fe69b0026d);
$parcel$export($a3401733cedc1617$exports, "PDWORD32", () => $a3401733cedc1617$export$60e2c917bf0cf558);
$parcel$export($a3401733cedc1617$exports, "PDWORD64", () => $a3401733cedc1617$export$d8d54319b3c23a57);
$parcel$export($a3401733cedc1617$exports, "PFLOAT", () => $a3401733cedc1617$export$22fafc5c9d071cf4);
$parcel$export($a3401733cedc1617$exports, "PHALF_PTR", () => $a3401733cedc1617$export$729dee532709226e);
$parcel$export($a3401733cedc1617$exports, "PHANDLE", () => $a3401733cedc1617$export$30d4c74fa93d3438);
$parcel$export($a3401733cedc1617$exports, "PHKEY", () => $a3401733cedc1617$export$64ced35c53da7357);
$parcel$export($a3401733cedc1617$exports, "PINT", () => $a3401733cedc1617$export$905308e3ac5456b0);
$parcel$export($a3401733cedc1617$exports, "PINT_PTR", () => $a3401733cedc1617$export$7fbf02121a44af3);
$parcel$export($a3401733cedc1617$exports, "PINT8", () => $a3401733cedc1617$export$16ddf13bb85917f4);
$parcel$export($a3401733cedc1617$exports, "PINT16", () => $a3401733cedc1617$export$2863cf8b15c466bd);
$parcel$export($a3401733cedc1617$exports, "PINT32", () => $a3401733cedc1617$export$3888f865e2f3fc9e);
$parcel$export($a3401733cedc1617$exports, "PINT64", () => $a3401733cedc1617$export$d81a713d6f75c904);
$parcel$export($a3401733cedc1617$exports, "PLCID", () => $a3401733cedc1617$export$d0f483e3dea49716);
$parcel$export($a3401733cedc1617$exports, "PLONG", () => $a3401733cedc1617$export$884b50f6e7d23183);
$parcel$export($a3401733cedc1617$exports, "PLONGLONG", () => $a3401733cedc1617$export$f4311b64ba2f3fe7);
$parcel$export($a3401733cedc1617$exports, "PLONG_PTR", () => $a3401733cedc1617$export$6cfa0302bb348fb4);
$parcel$export($a3401733cedc1617$exports, "PLONG32", () => $a3401733cedc1617$export$b415878f19491157);
$parcel$export($a3401733cedc1617$exports, "PLONG64", () => $a3401733cedc1617$export$9b97fd1af0726c08);
$parcel$export($a3401733cedc1617$exports, "POINTER_32", () => $a3401733cedc1617$export$f27a748240b723f3);
$parcel$export($a3401733cedc1617$exports, "POINTER_64", () => $a3401733cedc1617$export$5d25222f3b2425ae);
$parcel$export($a3401733cedc1617$exports, "POINTER_SIGNED", () => $a3401733cedc1617$export$729c2fdddcf979dc);
$parcel$export($a3401733cedc1617$exports, "POINTER_UNSIGNED", () => $a3401733cedc1617$export$d595eac61e43ee1f);
$parcel$export($a3401733cedc1617$exports, "PSHORT", () => $a3401733cedc1617$export$8c90681ffa492177);
$parcel$export($a3401733cedc1617$exports, "PSIZE_T", () => $a3401733cedc1617$export$42c4483327accaad);
$parcel$export($a3401733cedc1617$exports, "PSSIZE_T", () => $a3401733cedc1617$export$159e35dadcec50ed);
$parcel$export($a3401733cedc1617$exports, "PSTR", () => $a3401733cedc1617$export$fd996999f34a55b1);
$parcel$export($a3401733cedc1617$exports, "PTBYTE", () => $a3401733cedc1617$export$99f79cd79a3279be);
$parcel$export($a3401733cedc1617$exports, "PTCHAR", () => $a3401733cedc1617$export$a80266c3bbf78408);
$parcel$export($a3401733cedc1617$exports, "PTSTR", () => $a3401733cedc1617$export$90396e0dac1d7bf4);
$parcel$export($a3401733cedc1617$exports, "PUCHAR", () => $a3401733cedc1617$export$dac29ac7c1a6a593);
$parcel$export($a3401733cedc1617$exports, "PUHALF_PTR", () => $a3401733cedc1617$export$3b9eae56db5c9a5c);
$parcel$export($a3401733cedc1617$exports, "PUINT", () => $a3401733cedc1617$export$335fb31719a5cd92);
$parcel$export($a3401733cedc1617$exports, "PUINT_PTR", () => $a3401733cedc1617$export$f6cfbcf283b0732e);
$parcel$export($a3401733cedc1617$exports, "PUINT8", () => $a3401733cedc1617$export$29db969f4284195f);
$parcel$export($a3401733cedc1617$exports, "PUINT16", () => $a3401733cedc1617$export$1fc9516454e9e0c2);
$parcel$export($a3401733cedc1617$exports, "PUINT32", () => $a3401733cedc1617$export$b91b1f2b5d4b2f56);
$parcel$export($a3401733cedc1617$exports, "PUINT64", () => $a3401733cedc1617$export$a598fa2150118df1);
$parcel$export($a3401733cedc1617$exports, "PULONG", () => $a3401733cedc1617$export$bbdf20879558fef0);
$parcel$export($a3401733cedc1617$exports, "PULONGLONG", () => $a3401733cedc1617$export$b1eafd00c14966b1);
$parcel$export($a3401733cedc1617$exports, "PULONG_PTR", () => $a3401733cedc1617$export$77c87f189e52029c);
$parcel$export($a3401733cedc1617$exports, "PULONG32", () => $a3401733cedc1617$export$c3860bffe982b77);
$parcel$export($a3401733cedc1617$exports, "PULONG64", () => $a3401733cedc1617$export$ed3d7c18eaa4706a);
$parcel$export($a3401733cedc1617$exports, "PUSHORT", () => $a3401733cedc1617$export$c33f795d3055c8e8);
$parcel$export($a3401733cedc1617$exports, "PWCHAR", () => $a3401733cedc1617$export$53e197f0568d60e7);
$parcel$export($a3401733cedc1617$exports, "PWORD", () => $a3401733cedc1617$export$44a81616d2266597);
$parcel$export($a3401733cedc1617$exports, "PWSTR", () => $a3401733cedc1617$export$34fcf56876cedf67);
$parcel$export($a3401733cedc1617$exports, "QWORD", () => $a3401733cedc1617$export$ee325f3aca1cefe);
$parcel$export($a3401733cedc1617$exports, "SC_HANDLE", () => $a3401733cedc1617$export$ef4c74ea1198ce76);
$parcel$export($a3401733cedc1617$exports, "SC_LOCK", () => $a3401733cedc1617$export$dc1bca63e2d62447);
$parcel$export($a3401733cedc1617$exports, "SERVICE_STATUS_HANDLE", () => $a3401733cedc1617$export$1bbbfd60fd9e87f3);
$parcel$export($a3401733cedc1617$exports, "SHORT", () => $a3401733cedc1617$export$1de1ffada6286910);
$parcel$export($a3401733cedc1617$exports, "SIZE_T", () => $a3401733cedc1617$export$f089f2422e95b42b);
$parcel$export($a3401733cedc1617$exports, "SSIZE_T", () => $a3401733cedc1617$export$a185e644c63be28f);
$parcel$export($a3401733cedc1617$exports, "TBYTE", () => $a3401733cedc1617$export$d894ec5fb3ed01a4);
$parcel$export($a3401733cedc1617$exports, "TCHAR", () => $a3401733cedc1617$export$20f081206609d5f7);
$parcel$export($a3401733cedc1617$exports, "UCHAR", () => $a3401733cedc1617$export$226908722445f5d7);
$parcel$export($a3401733cedc1617$exports, "UHALF_PTR", () => $a3401733cedc1617$export$f229c93d3486a070);
$parcel$export($a3401733cedc1617$exports, "UINT", () => $a3401733cedc1617$export$54c0d11872b7e6d4);
$parcel$export($a3401733cedc1617$exports, "UINT_PTR", () => $a3401733cedc1617$export$d642901a6a404ec0);
$parcel$export($a3401733cedc1617$exports, "UINT8", () => $a3401733cedc1617$export$212e71dfd61c79fa);
$parcel$export($a3401733cedc1617$exports, "UINT16", () => $a3401733cedc1617$export$e81cbc576f121d7);
$parcel$export($a3401733cedc1617$exports, "UINT32", () => $a3401733cedc1617$export$55e9b618f09601c9);
$parcel$export($a3401733cedc1617$exports, "UINT64", () => $a3401733cedc1617$export$eb2099ed807a836e);
$parcel$export($a3401733cedc1617$exports, "ULONG", () => $a3401733cedc1617$export$c76dabb36bddc74f);
$parcel$export($a3401733cedc1617$exports, "ULONGLONG", () => $a3401733cedc1617$export$4c4b72fe7d344560);
$parcel$export($a3401733cedc1617$exports, "ULONG32", () => $a3401733cedc1617$export$1f6ffa45e1d0ba10);
$parcel$export($a3401733cedc1617$exports, "ULONG64", () => $a3401733cedc1617$export$35ffdfef7dc81db);
$parcel$export($a3401733cedc1617$exports, "UNICODE_STRING", () => $a3401733cedc1617$export$5dcce0e722389cdb);
$parcel$export($a3401733cedc1617$exports, "USHORT", () => $a3401733cedc1617$export$da53d5ec51ae7634);
$parcel$export($a3401733cedc1617$exports, "USN", () => $a3401733cedc1617$export$79215014ef451883);
$parcel$export($a3401733cedc1617$exports, "WINEVENTPROC", () => $a3401733cedc1617$export$3410187f8fd3ffe0);
$parcel$export($a3401733cedc1617$exports, "WNDENUMPROC", () => $a3401733cedc1617$export$db60719a96ea9349);
$parcel$export($a3401733cedc1617$exports, "WNDPROC", () => $a3401733cedc1617$export$9b17b5eb695fe8eb);
$parcel$export($a3401733cedc1617$exports, "WPARAM", () => $a3401733cedc1617$export$9ea0e07848f6a21c);
$parcel$export($a3401733cedc1617$exports, "LPINITCOMMONCONTROLSEX", () => $a3401733cedc1617$export$1a7b006743d0f934);
$parcel$export($a3401733cedc1617$exports, "LPWNDCLASSEX", () => $a3401733cedc1617$export$1f0a9d32094b3282);
$parcel$export($a3401733cedc1617$exports, "PWINDOWINFO", () => $a3401733cedc1617$export$7eee65a87be8fed2);
$parcel$export($a3401733cedc1617$exports, "PFILETIME", () => $a3401733cedc1617$export$1b5ecb15ced895a7);
$parcel$export($a3401733cedc1617$exports, "LPFILETIME", () => $a3401733cedc1617$export$e929ded8e6b3e173);
$parcel$export($a3401733cedc1617$exports, "va_list", () => $a3401733cedc1617$export$b1fc40da7cd7c95c);
$parcel$export($a3401733cedc1617$exports, "INITCOMMONCONTROLSEX", () => $a3401733cedc1617$export$6eb78d635a3ee587);
$parcel$export($a3401733cedc1617$exports, "MSG", () => $a3401733cedc1617$export$f99154f7a7b0135d);
$parcel$export($a3401733cedc1617$exports, "POINT", () => $a3401733cedc1617$export$a80a24d37f0f1279);
$parcel$export($a3401733cedc1617$exports, "WNDCLASSEX", () => $a3401733cedc1617$export$81ef613fbd3a628d);
$parcel$export($a3401733cedc1617$exports, "WINDOWINFO", () => $a3401733cedc1617$export$5119761222d7d0f6);
$parcel$export($a3401733cedc1617$exports, "PRAWINPUTDEVICELIST", () => $a3401733cedc1617$export$ceb1f86d9f461eb);
$parcel$export($a3401733cedc1617$exports, "RECT", () => $a3401733cedc1617$export$1e530543ba1d4b12);

const $a3401733cedc1617$export$a78dc2c4cbd70341 = "uint16";
const $a3401733cedc1617$export$181c9ad1752440f7 = "uint32";
const $a3401733cedc1617$export$9cb553b951e1e0d8 = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$1f4a129e1195d18a = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$bd8b6af04676495 = "PVOID";
const $a3401733cedc1617$export$f60fc96aa99c605e = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$2e482cd8c991e558 = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$1cd1943b3a73bbe8 = "void";
const $a3401733cedc1617$export$d71e2b267f5b711b = "uint16";
const $a3401733cedc1617$export$f3a79cf462faa1e3 = "int16";
const $a3401733cedc1617$export$c35dd5647862f990 = "int";
const $a3401733cedc1617$export$428cfe48a69a3b4f = "bool";
const $a3401733cedc1617$export$8f4bf8f7eb581284 = "byte";
const $a3401733cedc1617$export$578a4c3d73a6d794 = "pointer"; // https://msdn.microsoft.com/en-us/library/windows/desktop/ms633573(v=vs.85).aspx
const $a3401733cedc1617$export$934996f637259e88 = "uint8";
const $a3401733cedc1617$export$9e88d7b6f62f62d8 = "uint8";
const $a3401733cedc1617$export$52da70d84f582c04 = "DWORD";
const $a3401733cedc1617$export$6b766bfdcf67e2ec = "uint64";
const $a3401733cedc1617$export$8f7b8c11edcb3e34 = "ULONG_PTR";
const $a3401733cedc1617$export$a8ea5b58ae88fc11 = "uint32";
const $a3401733cedc1617$export$8db31e1b1c7e0db0 = "uint64";
const $a3401733cedc1617$export$d2b086fd1e01e03a = "float";
const $a3401733cedc1617$export$1505c2c04cc3bbef = "HANDLE";
const $a3401733cedc1617$export$2d081f52dd94061a = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$49cd303f01f67350 = "HANDLE";
const $a3401733cedc1617$export$d17b38c787d37ab8 = "HANDLE";
const $a3401733cedc1617$export$56c7641f121a2c5c = "HANDLE";
const $a3401733cedc1617$export$762b8b6ee0ff4c44 = "HANDLE";
const $a3401733cedc1617$export$750eee7b2f0ee030 = "HANDLE";
const $a3401733cedc1617$export$a02796fdca6d354a = "HANDLE";
const $a3401733cedc1617$export$1a62f6d54b236e36 = "HANDLE";
const $a3401733cedc1617$export$4ddde23cd7155d44 = "HANDLE";
const $a3401733cedc1617$export$1d0ad5eb60ffc518 = "HANDLE";
const $a3401733cedc1617$export$726c5c347609dae3 = "HANDLE";
const $a3401733cedc1617$export$323f06abdd2a59da = "HANDLE";
const $a3401733cedc1617$export$a43730eb8bf8b76e = "HANDLE";
const $a3401733cedc1617$export$91f6f659ef3d1edd = "HANDLE"; // typedef int HFILE;
const $a3401733cedc1617$export$229672d8f6dd9e1a = "HANDLE";
const $a3401733cedc1617$export$ef0ae13fba225584 = "HANDLE";
const $a3401733cedc1617$export$6b52c27577dfb85e = "HANDLE";
const $a3401733cedc1617$export$a681c4a7983815bf = "HANDLE";
const $a3401733cedc1617$export$105fd39584a4c170 = "HANDLE";
const $a3401733cedc1617$export$1a50b4f53ac33a = "HANDLE";
const $a3401733cedc1617$export$80d8783aa08e677d = "HANDLE";
const $a3401733cedc1617$export$9252a4926414af53 = "HANDLE";
const $a3401733cedc1617$export$941fbb37db50e0ee = "HANDLE";
const $a3401733cedc1617$export$5570ee796bf8668a = "HANDLE";
const $a3401733cedc1617$export$32e1d6dd1d786a08 = "HANDLE";
const $a3401733cedc1617$export$82cb6941373786ac = $a3401733cedc1617$export$1a50b4f53ac33a;
const $a3401733cedc1617$export$d76bcd896c4c1f0b = "HANDLE";
const $a3401733cedc1617$export$c984542fbcd9e311 = "HANDLE";
const $a3401733cedc1617$export$e8c398641ae921a0 = "HANDLE";
const $a3401733cedc1617$export$2109f3ca8e001dc3 = "long";
const $a3401733cedc1617$export$64129906a6b15c89 = "HANDLE";
const $a3401733cedc1617$export$d0b96b23ab9f5338 = "HANDLE";
const $a3401733cedc1617$export$c50eccdd15c9fd55 = "HANDLE";
const $a3401733cedc1617$export$60bcb2927641b3f4 = "HANDLE";
const $a3401733cedc1617$export$893fa35bdef36b = "HANDLE";
const $a3401733cedc1617$export$6525812590d9a476 = "HANDLE";
const $a3401733cedc1617$export$160e8bdd97bfce3a = "int";
const $a3401733cedc1617$export$f051d14373139dee = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$9922471c07c2891d = "int8";
const $a3401733cedc1617$export$bd9b91838fde002e = "int16";
const $a3401733cedc1617$export$34412edc7b36f85 = "int32";
const $a3401733cedc1617$export$a2c63c68aeee9e2d = "int64";
const $a3401733cedc1617$export$6190ebba87077b9d = "WORD";
const $a3401733cedc1617$export$b36cf4a83245c2f9 = "DWORD";
const $a3401733cedc1617$export$244c0463aedba74c = "DWORD";
const $a3401733cedc1617$export$202821be4d3b65c7 = "DWORD";
const $a3401733cedc1617$export$686cfa64f218be7a = "long";
const $a3401733cedc1617$export$2d2033f38dde21c = "longlong";
const $a3401733cedc1617$export$4c9cb8eafd43015e = "int32";
const $a3401733cedc1617$export$552dea698acd6cd2 = "int64";
const $a3401733cedc1617$export$13371aace3d44948 = "LONG_PTR";
const $a3401733cedc1617$export$5df7e4acce683059 = "BOOL";
const $a3401733cedc1617$export$1061811df8b0c9be = "byte*";
const $a3401733cedc1617$export$f1d7ba3e4d51498c = "DWORD";
const $a3401733cedc1617$export$18e7280707df82f3 = "uint8*";
const $a3401733cedc1617$export$dfa283df2530598f = "uint16*";
const $a3401733cedc1617$export$3e6b4f6079ce51b = (0, $503b3d7c3341aa9e$export$609085a058d4a4d0);
const $a3401733cedc1617$export$3de86eb3806b712d = "void*";
const $a3401733cedc1617$export$acb32c160acad508 = "LPVOID";
const $a3401733cedc1617$export$33eafb5d436e1362 = "uint16*";
const $a3401733cedc1617$export$e8ea75f05566dd3c = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55); // A pointer to a HANDLE.
const $a3401733cedc1617$export$b4d77e4f53c21e3a = "int*";
const $a3401733cedc1617$export$ca6bd9f017df4953 = "int32*";
const $a3401733cedc1617$export$aba1f5f1221c9fb3 = "pointer"; // A pointer to a MSG
const $a3401733cedc1617$export$3a00c33c250e7d86 = "pointer";
const $a3401733cedc1617$export$e5fae31862228632 = "char*";
const $a3401733cedc1617$export$dec24c174f0eaee1 = "uint16*";
const $a3401733cedc1617$export$477e24a98da955e6 = (0, $503b3d7c3341aa9e$export$609085a058d4a4d0);
const $a3401733cedc1617$export$a362e06a8759641a = "uint16*";
const $a3401733cedc1617$export$307c691072d7eef0 = "LONG_PTR";
const $a3401733cedc1617$export$a50474266f14be1b = "uint32";
const $a3401733cedc1617$export$a1d44ba3d847cfd0 = "int*"; // ? 'bool*'
const $a3401733cedc1617$export$4f984d513e291397 = "bool*";
const $a3401733cedc1617$export$306fa084066e20a7 = "byte*";
const $a3401733cedc1617$export$72c3772b516a65cf = "char*";
const $a3401733cedc1617$export$cf99bbd665f301f9 = "uint8*";
const $a3401733cedc1617$export$d63ff7816142b2f4 = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$8aeea065f4882b0c = "uint16*";
const $a3401733cedc1617$export$c06eff3fc862da47 = "uint32*";
const $a3401733cedc1617$export$e09b44cec70f0704 = "uint64*";
const $a3401733cedc1617$export$a2bbf1fe69b0026d = "DWORD_PTR";
const $a3401733cedc1617$export$60e2c917bf0cf558 = "uint32*";
const $a3401733cedc1617$export$d8d54319b3c23a57 = "uint64*";
const $a3401733cedc1617$export$22fafc5c9d071cf4 = "float*";
const $a3401733cedc1617$export$729dee532709226e = "pointer"; // ? A pointer to a HALF_PTR.
const $a3401733cedc1617$export$30d4c74fa93d3438 = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$64ced35c53da7357 = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$905308e3ac5456b0 = "int*";
const $a3401733cedc1617$export$7fbf02121a44af3 = "int**";
const $a3401733cedc1617$export$16ddf13bb85917f4 = "int8*";
const $a3401733cedc1617$export$2863cf8b15c466bd = "int16*";
const $a3401733cedc1617$export$3888f865e2f3fc9e = "int32*";
const $a3401733cedc1617$export$d81a713d6f75c904 = "int64*";
const $a3401733cedc1617$export$d0f483e3dea49716 = "uint32*";
const $a3401733cedc1617$export$884b50f6e7d23183 = "long*";
const $a3401733cedc1617$export$f4311b64ba2f3fe7 = "int64*";
const $a3401733cedc1617$export$6cfa0302bb348fb4 = "pointer";
const $a3401733cedc1617$export$b415878f19491157 = "int32*";
const $a3401733cedc1617$export$9b97fd1af0726c08 = "int64*";
const $a3401733cedc1617$export$f27a748240b723f3 = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$5d25222f3b2425ae = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$729c2fdddcf979dc = "pointer"; // ? A signed pointer.
const $a3401733cedc1617$export$d595eac61e43ee1f = "pointer"; // An unsigned pointer.
const $a3401733cedc1617$export$8c90681ffa492177 = "int16*";
const $a3401733cedc1617$export$42c4483327accaad = "ULONG_PTR"; // ?
const $a3401733cedc1617$export$159e35dadcec50ed = "pointer";
const $a3401733cedc1617$export$fd996999f34a55b1 = "char*";
const $a3401733cedc1617$export$99f79cd79a3279be = (0, $503b3d7c3341aa9e$export$609085a058d4a4d0);
const $a3401733cedc1617$export$a80266c3bbf78408 = (0, $503b3d7c3341aa9e$export$609085a058d4a4d0);
const $a3401733cedc1617$export$90396e0dac1d7bf4 = (0, $503b3d7c3341aa9e$export$609085a058d4a4d0);
const $a3401733cedc1617$export$dac29ac7c1a6a593 = "pointer";
const $a3401733cedc1617$export$3b9eae56db5c9a5c = "pointer";
const $a3401733cedc1617$export$335fb31719a5cd92 = "uint*";
const $a3401733cedc1617$export$f6cfbcf283b0732e = "uint**";
const $a3401733cedc1617$export$29db969f4284195f = "uint8*";
const $a3401733cedc1617$export$1fc9516454e9e0c2 = "uint16*";
const $a3401733cedc1617$export$b91b1f2b5d4b2f56 = "uint32*";
const $a3401733cedc1617$export$a598fa2150118df1 = "uint64*";
const $a3401733cedc1617$export$bbdf20879558fef0 = "uint*";
const $a3401733cedc1617$export$b1eafd00c14966b1 = "uint64*";
const $a3401733cedc1617$export$77c87f189e52029c = "uint64**";
const $a3401733cedc1617$export$c3860bffe982b77 = "uint*";
const $a3401733cedc1617$export$ed3d7c18eaa4706a = "uint64*";
const $a3401733cedc1617$export$c33f795d3055c8e8 = "uint16*";
const $a3401733cedc1617$export$53e197f0568d60e7 = "uint16*";
const $a3401733cedc1617$export$44a81616d2266597 = "uint16*";
const $a3401733cedc1617$export$34fcf56876cedf67 = "uint16*";
const $a3401733cedc1617$export$ee325f3aca1cefe = "uint64";
const $a3401733cedc1617$export$ef4c74ea1198ce76 = "HANDLE";
const $a3401733cedc1617$export$dc1bca63e2d62447 = "LPVOID";
const $a3401733cedc1617$export$1bbbfd60fd9e87f3 = "HANDLE";
const $a3401733cedc1617$export$1de1ffada6286910 = "int16";
const $a3401733cedc1617$export$f089f2422e95b42b = "ULONG_PTR";
const $a3401733cedc1617$export$a185e644c63be28f = "LONG_PTR";
const $a3401733cedc1617$export$d894ec5fb3ed01a4 = (0, $503b3d7c3341aa9e$export$609085a058d4a4d0);
const $a3401733cedc1617$export$20f081206609d5f7 = (0, $503b3d7c3341aa9e$export$609085a058d4a4d0);
const $a3401733cedc1617$export$226908722445f5d7 = "uchar";
const $a3401733cedc1617$export$f229c93d3486a070 = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$54c0d11872b7e6d4 = "uint";
const $a3401733cedc1617$export$d642901a6a404ec0 = (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55);
const $a3401733cedc1617$export$212e71dfd61c79fa = "uint8";
const $a3401733cedc1617$export$e81cbc576f121d7 = "uint16";
const $a3401733cedc1617$export$55e9b618f09601c9 = "uint32";
const $a3401733cedc1617$export$eb2099ed807a836e = "uint64";
const $a3401733cedc1617$export$c76dabb36bddc74f = "uint";
const $a3401733cedc1617$export$4c4b72fe7d344560 = "uint64";
const $a3401733cedc1617$export$1f6ffa45e1d0ba10 = "uint32";
const $a3401733cedc1617$export$35ffdfef7dc81db = "uint64";
const $a3401733cedc1617$export$5dcce0e722389cdb = "pointer";
const $a3401733cedc1617$export$da53d5ec51ae7634 = "ushort";
const $a3401733cedc1617$export$79215014ef451883 = $a3401733cedc1617$export$2d2033f38dde21c;
const $a3401733cedc1617$export$3410187f8fd3ffe0 = "pointer";
const $a3401733cedc1617$export$db60719a96ea9349 = "pointer";
const $a3401733cedc1617$export$9b17b5eb695fe8eb = "pointer";
const $a3401733cedc1617$export$9ea0e07848f6a21c = "UINT_PTR";
const $a3401733cedc1617$export$1a7b006743d0f934 = "pointer";
const $a3401733cedc1617$export$1f0a9d32094b3282 = "pointer"; // A pointer to a WNDCLASSEX
const $a3401733cedc1617$export$7eee65a87be8fed2 = "pointer"; // A pointer to a WINDOWINFO structure
const $a3401733cedc1617$export$1b5ecb15ced895a7 = "pointer"; // A pointer to a FILETIME
const $a3401733cedc1617$export$e929ded8e6b3e173 = "pointer"; // A pointer to a FILETIME
const $a3401733cedc1617$export$b1fc40da7cd7c95c = "char*";
const $a3401733cedc1617$export$6eb78d635a3ee587 = "pointer";
const $a3401733cedc1617$export$f99154f7a7b0135d = "pointer";
const $a3401733cedc1617$export$a80a24d37f0f1279 = "pointer";
const $a3401733cedc1617$export$81ef613fbd3a628d = "pointer";
const $a3401733cedc1617$export$5119761222d7d0f6 = "pointer";
const $a3401733cedc1617$export$ceb1f86d9f461eb = "pointer";
const $a3401733cedc1617$export$1e530543ba1d4b12 = "pointer"; // _RECT


const $dd829110849b630e$export$65dedbc9f072ffcc = new Map([
    [
        "HANDLE",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "uint64",
            "uint32"
        ]
    ],
    [
        "PVOID",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "uint64*",
            "uint32*"
        ]
    ],
    [
        "HALF_PTR",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "int32",
            "int16"
        ]
    ],
    [
        "INT_PTR",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "int64",
            "int32"
        ]
    ],
    [
        "LONG_PTR",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "int64",
            "int32"
        ]
    ],
    [
        "LPCTSTR",
        [
            (0, $503b3d7c3341aa9e$export$609085a058d4a4d0),
            (0, $a3401733cedc1617$export$dfa283df2530598f),
            (0, $a3401733cedc1617$export$18e7280707df82f3)
        ]
    ],
    [
        "LPHANDLE",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "uint64*",
            "uint32*"
        ]
    ],
    [
        "LPTSTR",
        [
            (0, $503b3d7c3341aa9e$export$609085a058d4a4d0),
            (0, $a3401733cedc1617$export$dec24c174f0eaee1),
            "uint8*"
        ]
    ],
    [
        "PCTSTR",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            (0, $a3401733cedc1617$export$dfa283df2530598f),
            (0, $a3401733cedc1617$export$18e7280707df82f3)
        ]
    ],
    [
        "PHANDLE",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "uint64**",
            "uint32**"
        ]
    ],
    [
        "PHKEY",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "uint64*",
            "uint32*"
        ]
    ],
    [
        "POINTER_32",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "uint32*",
            "uint32*"
        ]
    ],
    [
        "POINTER_64",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "uint64*",
            "uint32*"
        ]
    ],
    [
        "PTBYTE",
        [
            (0, $503b3d7c3341aa9e$export$609085a058d4a4d0),
            "int16*",
            "int8*"
        ]
    ],
    [
        "PTCHAR",
        [
            (0, $503b3d7c3341aa9e$export$609085a058d4a4d0),
            "uint16*",
            "uint8*"
        ]
    ],
    [
        "PTSTR",
        [
            (0, $503b3d7c3341aa9e$export$609085a058d4a4d0),
            (0, $a3401733cedc1617$export$dec24c174f0eaee1),
            (0, $a3401733cedc1617$export$e5fae31862228632)
        ]
    ],
    [
        "TBYTE",
        [
            (0, $503b3d7c3341aa9e$export$609085a058d4a4d0),
            "int16",
            "int8"
        ]
    ],
    [
        "TCHAR",
        [
            (0, $503b3d7c3341aa9e$export$609085a058d4a4d0),
            (0, $a3401733cedc1617$export$d71e2b267f5b711b),
            "uint8"
        ]
    ],
    [
        "UHALF_PTR",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "uint32",
            "uint16"
        ]
    ],
    [
        "UINT_PTR",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "uint64",
            "uint32"
        ]
    ],
    [
        "ULONG_PTR",
        [
            (0, $503b3d7c3341aa9e$export$4bbcbb9e6d314d55),
            "uint64",
            "uint32"
        ]
    ], 
]);



const $33b0a82c44a922ab$var$W = (0, $1714c89fc73ee793$export$828a2cfb74eb348c)($a3401733cedc1617$exports, (0, $dd829110849b630e$export$65dedbc9f072ffcc));
const $33b0a82c44a922ab$export$ad48b1b2cfc75809 = {
    cbSize: $33b0a82c44a922ab$var$W.DWORD,
    cItems: $33b0a82c44a922ab$var$W.INT,
    cColumns: $33b0a82c44a922ab$var$W.INT,
    cRows: $33b0a82c44a922ab$var$W.INT,
    iColFocus: $33b0a82c44a922ab$var$W.INT,
    iRowFocus: $33b0a82c44a922ab$var$W.INT,
    cxItem: $33b0a82c44a922ab$var$W.INT,
    cyItem: $33b0a82c44a922ab$var$W.INT,
    ptStart: $33b0a82c44a922ab$var$W.POINT
};
const $33b0a82c44a922ab$export$235a24185e6c03f3 = {
    dwData: $33b0a82c44a922ab$var$W.ULONG_PTR,
    cbData: $33b0a82c44a922ab$var$W.DWORD,
    lpData: $33b0a82c44a922ab$var$W.PVOID
};
const $33b0a82c44a922ab$export$c747a8b76ce2fc55 = {
    uMsg: $33b0a82c44a922ab$var$W.DWORD,
    wParamL: $33b0a82c44a922ab$var$W.WORD,
    wParamH: $33b0a82c44a922ab$var$W.WORD
};
const $33b0a82c44a922ab$export$6eb78d635a3ee587 = {
    dwSize: $33b0a82c44a922ab$var$W.DWORD,
    dwICC: $33b0a82c44a922ab$var$W.DWORD
};
const $33b0a82c44a922ab$export$9d77698e6144d105 = {
    wVk: $33b0a82c44a922ab$var$W.WORD,
    wScan: $33b0a82c44a922ab$var$W.WORD,
    dwFlags: $33b0a82c44a922ab$var$W.DWORD,
    time: $33b0a82c44a922ab$var$W.DWORD,
    dwExtraInfo: $33b0a82c44a922ab$var$W.ULONG_PTR
};
const $33b0a82c44a922ab$export$b25d5f19497424fa = {
    dx: $33b0a82c44a922ab$var$W.LONG,
    dy: $33b0a82c44a922ab$var$W.LONG,
    mouseData: $33b0a82c44a922ab$var$W.DWORD,
    dwFlags: $33b0a82c44a922ab$var$W.DWORD,
    time: $33b0a82c44a922ab$var$W.DWORD,
    dwExtraInfo: $33b0a82c44a922ab$var$W.ULONG_PTR
};
const $33b0a82c44a922ab$export$f99154f7a7b0135d = {
    hwnd: $33b0a82c44a922ab$var$W.HWND,
    message: $33b0a82c44a922ab$var$W.UINT,
    wParam: $33b0a82c44a922ab$var$W.WPARAM,
    lParam: $33b0a82c44a922ab$var$W.LPARAM,
    time: $33b0a82c44a922ab$var$W.DWORD,
    pt: $33b0a82c44a922ab$var$W.POINT,
    lPrivate: $33b0a82c44a922ab$var$W.DWORD
};
const $33b0a82c44a922ab$export$a80a24d37f0f1279 = {
    x: $33b0a82c44a922ab$var$W.LONG,
    y: $33b0a82c44a922ab$var$W.LONG
};
const $33b0a82c44a922ab$export$ca65a5b05e68b7ff = {
    Reserved1: $33b0a82c44a922ab$var$W.PVOID,
    PebBaseAddress: $33b0a82c44a922ab$var$W.PVOID,
    Reserved2: $33b0a82c44a922ab$var$W.PVOID,
    UniqueProcessId: $33b0a82c44a922ab$var$W.ULONG_PTR,
    InheritedFromUniqueProcessId: $33b0a82c44a922ab$var$W.PVOID
};
const $33b0a82c44a922ab$export$5dcce0e722389cdb = {
    Length: $33b0a82c44a922ab$var$W.USHORT,
    MaximumLength: $33b0a82c44a922ab$var$W.USHORT,
    Buffer: $33b0a82c44a922ab$var$W.PWSTR
};
const $33b0a82c44a922ab$export$109b0986e0806ee = {
    dwSizeHid: $33b0a82c44a922ab$var$W.DWORD,
    dwCount: $33b0a82c44a922ab$var$W.DWORD,
    /** bRawData[1] */ bRawData: $33b0a82c44a922ab$var$W.BYTE
};
const $33b0a82c44a922ab$export$cf7f2abb0ac9e892 = {
    hDevice: $33b0a82c44a922ab$var$W.HANDLE,
    dwType: $33b0a82c44a922ab$var$W.DWORD
};
const $33b0a82c44a922ab$export$614c933f340ce1c1 = {
    dwType: $33b0a82c44a922ab$var$W.DWORD,
    dwSize: $33b0a82c44a922ab$var$W.DWORD,
    hDevice: $33b0a82c44a922ab$var$W.HANDLE,
    wParam: $33b0a82c44a922ab$var$W.WPARAM
};
const $33b0a82c44a922ab$export$7f9753d8aef93f40 = {
    MakeCode: $33b0a82c44a922ab$var$W.USHORT,
    Flags: $33b0a82c44a922ab$var$W.USHORT,
    Reserved: $33b0a82c44a922ab$var$W.USHORT,
    VKey: $33b0a82c44a922ab$var$W.USHORT,
    Message: $33b0a82c44a922ab$var$W.UINT,
    ExtraInformation: $33b0a82c44a922ab$var$W.ULONG
};
const $33b0a82c44a922ab$export$5119761222d7d0f6 = {
    cbSize: $33b0a82c44a922ab$var$W.DWORD,
    rcWindow: $33b0a82c44a922ab$var$W.RECT,
    rcClient: $33b0a82c44a922ab$var$W.RECT,
    dwStyle: $33b0a82c44a922ab$var$W.DWORD,
    dwExStyle: $33b0a82c44a922ab$var$W.DWORD,
    dwWindowStatus: $33b0a82c44a922ab$var$W.DWORD,
    cxWindowBorders: $33b0a82c44a922ab$var$W.UINT,
    cyWindowBorders: $33b0a82c44a922ab$var$W.UINT,
    atomWindowType: $33b0a82c44a922ab$var$W.ATOM,
    wCreatorVersion: $33b0a82c44a922ab$var$W.WORD
};
const $33b0a82c44a922ab$export$81ef613fbd3a628d = {
    cbSize: $33b0a82c44a922ab$var$W.UINT,
    style: $33b0a82c44a922ab$var$W.UINT,
    // 'lpfnWndProc': ffi.Function('int32', ['pointer', 'uint32', 'int32', 'uint32']) ,
    lpfnWndProc: $33b0a82c44a922ab$var$W.WNDPROC,
    cbClsExtra: $33b0a82c44a922ab$var$W.INT,
    cbWndExtra: $33b0a82c44a922ab$var$W.INT,
    hInstance: $33b0a82c44a922ab$var$W.HINSTANCE,
    hIcon: $33b0a82c44a922ab$var$W.HICON,
    hCursor: $33b0a82c44a922ab$var$W.HCURSOR,
    hbrBackground: $33b0a82c44a922ab$var$W.HBRUSH,
    lpszMenuName: $33b0a82c44a922ab$var$W.LPCTSTR,
    lpszClassName: $33b0a82c44a922ab$var$W.LPCTSTR,
    hIconSm: $33b0a82c44a922ab$var$W.HICON
};
const $33b0a82c44a922ab$export$1e530543ba1d4b12 = {
    left: $33b0a82c44a922ab$var$W.LONG,
    top: $33b0a82c44a922ab$var$W.LONG,
    right: $33b0a82c44a922ab$var$W.LONG,
    bottom: $33b0a82c44a922ab$var$W.LONG
};
const $33b0a82c44a922ab$export$258339e884eb70b7 = {
    dwLowDateTime: $33b0a82c44a922ab$var$W.DWORD,
    dwHighDateTime: $33b0a82c44a922ab$var$W.DWORD
};


var $98e6855e55ac294d$exports = {};

$parcel$export($98e6855e55ac294d$exports, "RID_DEVICE_INFO_DUMMYUNIONNAME", () => $98e6855e55ac294d$export$ff2835eca4f38b4e);



const $98e6855e55ac294d$var$W = (0, $1714c89fc73ee793$export$828a2cfb74eb348c)($a3401733cedc1617$exports, (0, $dd829110849b630e$export$65dedbc9f072ffcc));
const $98e6855e55ac294d$export$ff2835eca4f38b4e = {
    mouse: $98e6855e55ac294d$var$W.INT,
    keyboard: $98e6855e55ac294d$var$W.INT,
    hid: $98e6855e55ac294d$var$W.INT
};















const $1e37355cdb159231$export$be44eba04df286d7 = (0, $1714c89fc73ee793$export$828a2cfb74eb348c)($a3401733cedc1617$exports, (0, $dd829110849b630e$export$65dedbc9f072ffcc));



var $5vfvk = parcelRequire("5vfvk");
function $97088cfa13954d22$export$d4e6b3016315c3ba(length, encoding) {
    const inst = Object.create($5vfvk.types.byte, {
        constructor: {
            configurable: true,
            enumerable: false,
            writable: true,
            value: $97088cfa13954d22$export$d4e6b3016315c3ba
        }
    });
    Object.defineProperty(inst, "size", {
        configurable: true,
        enumerable: true,
        writable: false,
        value: length
    });
    Object.defineProperty(inst, "encoding", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: encoding
    });
    Object.defineProperty(inst, "get", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: $97088cfa13954d22$var$getFn
    });
    Object.defineProperty(inst, "set", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: $97088cfa13954d22$var$setFn
    });
    return inst;
}
function $97088cfa13954d22$var$getFn(buffer, offset) {
    const buf = buffer.slice(offset, offset + this.size);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.encoding) {
        const str = buf.toString(this.encoding);
        return str;
    }
    return buf;
}
function $97088cfa13954d22$var$setFn(buffer, offset, value) {
    let target;
    if (typeof value === "string") target = Buffer.from(value, this.encoding);
    else if (Array.isArray(value)) target = Buffer.from(value);
    else if (Buffer.isBuffer(value)) target = value;
    else throw new TypeError("Buffer instance expected");
    if (target.length > this.size) throw new Error(`Buffer given is ${target.length} bytes, but only ${this.size} bytes available`);
    target.copy(buffer, offset);
}


const $96c5305dc4582629$export$3fcec5a49954e26a = {
    cb: (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
    DeviceName: (0, $97088cfa13954d22$export$d4e6b3016315c3ba)(32, "ucs2"),
    DeviceString: (0, $97088cfa13954d22$export$d4e6b3016315c3ba)(128, "ucs2"),
    StateFlags: (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
    DeviceID: (0, $97088cfa13954d22$export$d4e6b3016315c3ba)(128, "ucs2"),
    DeviceKey: (0, $97088cfa13954d22$export$d4e6b3016315c3ba)(128, "ucs2")
};




var $5vfvk = parcelRequire("5vfvk");
var $4fe7b40ed7e08a08$exports = {};
"use strict";


var $4fe7b40ed7e08a08$var$debug = (parcelRequire("kgZpt"))("ref-union");
/**
 * Module exports.
 */ $4fe7b40ed7e08a08$exports = function(ref) {
    /**
 * The "Union" type constructor.
 */ function Union() {
        $4fe7b40ed7e08a08$var$debug('defining new union "type"');
        function UnionType(arg, data) {
            if (!(this instanceof UnionType)) return new UnionType(arg, data);
            $4fe7b40ed7e08a08$var$debug("creating new union instance");
            var store;
            if (Buffer.isBuffer(arg)) {
                $4fe7b40ed7e08a08$var$debug("using passed-in Buffer instance to back the union", arg);
                $lJiUQ$assert(arg.length >= UnionType.size, "Buffer instance must be at least " + UnionType.size + " bytes to back this untion type");
                store = arg;
                arg = data;
            } else {
                $4fe7b40ed7e08a08$var$debug("creating new Buffer instance to back the union (size: %d)", UnionType.size);
                store = new Buffer(UnionType.size);
            }
            // set the backing Buffer store
            store.type = UnionType;
            this["ref.buffer"] = store;
            // initialise the union with values supplied
            if (arg) //TODO: Sanity check - e.g. (Object.keys(arg).length == 1)
            for(var key in arg)// hopefully hit the union setters
            this[key] = arg[key];
            UnionType._instanceCreated = true;
        }
        // make instances inherit from `proto`
        UnionType.prototype = Object.create(proto, {
            constructor: {
                value: UnionType,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        UnionType.defineProperty = defineProperty;
        UnionType.toString = toString;
        UnionType.fields = {};
        // comply with ref's "type" interface
        UnionType.size = 0;
        UnionType.alignment = 0;
        UnionType.indirection = 1;
        UnionType.get = get1;
        UnionType.set = set1;
        // Read the fields list
        var arg1 = arguments[0];
        if (typeof arg1 === "object") Object.keys(arg1).forEach(function(name) {
            var type = arg1[name];
            UnionType.defineProperty(name, type);
        });
        return UnionType;
    }
    function get1(buffer, offset) {
        $4fe7b40ed7e08a08$var$debug('Union "type" getter for buffer at offset', buffer, offset);
        if (offset > 0) buffer = buffer.slice(offset);
        return new this(buffer);
    }
    function set1(buffer, offset, value) {
        $4fe7b40ed7e08a08$var$debug('Union "type" setter for buffer at offset', buffer, offset, value);
        if (offset > 0) buffer = buffer.slice(offset);
        var union = new this(buffer);
        var isUnion = value instanceof this;
        if (isUnion) // TODO: optimize - use Buffer#copy()
        Object.keys(this.fields).forEach(function(name) {
            // hopefully hit the setters
            union[name] = value[name];
        });
        else for(var name1 in value)// hopefully hit the setters
        union[name1] = value[name1];
    }
    function toString() {
        return "[UnionType]";
    }
    /**
 * Adds a new field to the union instance with the given name and type.
 * Note that this function will throw an Error if any instances of the union
 * type have already been created, therefore this function must be called at the
 * beginning, before any instances are created.
 */ function defineProperty(name, type) {
        $4fe7b40ed7e08a08$var$debug("defining new union type field", name);
        // allow string types for convenience
        type = ref.coerceType(type);
        $lJiUQ$assert(!this._instanceCreated, "an instance of this Union type has already been created, cannot add new data members anymore");
        $lJiUQ$assert.equal("string", typeof name, 'expected a "string" field name');
        $lJiUQ$assert(type && /object|function/i.test(typeof type) && "size" in type && "indirection" in type, 'expected a "type" object describing the field type: "' + type + '"');
        $lJiUQ$assert(!(name in this.prototype), 'the field "' + name + '" already exists in this Union type');
        // define the getter/setter property
        Object.defineProperty(this.prototype, name, {
            enumerable: true,
            configurable: true,
            get: get,
            set: set
        });
        var field = {
            type: type
        };
        this.fields[name] = field;
        // calculate the new size and alignment
        recalc(this);
        function get() {
            $4fe7b40ed7e08a08$var$debug('getting "%s" union field (length: %d)', name, type.size);
            return ref.get(this["ref.buffer"], 0, type);
        }
        function set(value) {
            $4fe7b40ed7e08a08$var$debug('setting "%s" union field (length: %d)', name, type.size, value);
            return ref.set(this["ref.buffer"], 0, value, type);
        }
    }
    function recalc(union) {
        // reset size and alignment
        union.size = 0;
        union.alignment = 0;
        var fieldNames = Object.keys(union.fields);
        // loop through to set the size of the union of the largest member field
        // and the alignment to the requirements of the largest member
        fieldNames.forEach(function(name) {
            var field = union.fields[name];
            var type = field.type;
            var size = type.indirection === 1 ? type.size : ref.sizeof.pointer;
            var alignment = type.alignment || ref.alignof.pointer;
            if (type.indirection > 1) alignment = ref.alignof.pointer;
            union.alignment = Math.max(union.alignment, alignment);
            union.size = Math.max(union.size, size);
        });
        // any padding
        var left = union.size % union.alignment;
        if (left > 0) {
            $4fe7b40ed7e08a08$var$debug("additional padding to the end of union:", union.alignment - left);
            union.size += union.alignment - left;
        }
    }
    /**
 * the base prototype that union type instances will inherit from.
 */ var proto = {};
    proto["ref.buffer"] = ref.NULL;
    /**
 * returns a Buffer pointing to this union data structure.
 */ proto.ref = function ref() {
        return this["ref.buffer"];
    };
    return Union;
};


const $5eac83a81afc2e09$var$UnionDi = $4fe7b40ed7e08a08$exports;
const $5eac83a81afc2e09$export$6cbb4f8fa0c4c986 = $5eac83a81afc2e09$var$UnionDi($5vfvk);


const $dca0d75e18f11a92$export$6e367b0161ea043f = {
    cbSize: (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
    dwType: (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
    DUMMYUNIONNAME: (0, $5eac83a81afc2e09$export$6cbb4f8fa0c4c986)((0, $98e6855e55ac294d$exports).RID_DEVICE_INFO_DUMMYUNIONNAME)
};




var $f977867eb89b8f94$exports = {};
"use strict";

var $5vfvk = parcelRequire("5vfvk");


const $f977867eb89b8f94$var$debug = (parcelRequire("fD8Mg"))("ffi:ffi");

const $f977867eb89b8f94$var$Struct = (parcelRequire("1Pa9k"))($5vfvk);

var $fL96e = parcelRequire("fL96e");
/**
 * Export some of the properties from the "bindings" file.
 */ [
    "FFI_TYPES",
    "FFI_OK",
    "FFI_BAD_TYPEDEF",
    "FFI_BAD_ABI",
    "FFI_DEFAULT_ABI",
    "FFI_FIRST_ABI",
    "FFI_LAST_ABI",
    "FFI_SYSV",
    "FFI_UNIX64",
    "FFI_WIN64",
    "FFI_VFP",
    "FFI_STDCALL",
    "FFI_THISCALL",
    "FFI_FASTCALL",
    "RTLD_LAZY",
    "RTLD_NOW",
    "RTLD_LOCAL",
    "RTLD_GLOBAL",
    "RTLD_NOLOAD",
    "RTLD_NODELETE",
    "RTLD_FIRST",
    "RTLD_NEXT",
    "RTLD_DEFAULT",
    "RTLD_SELF",
    "RTLD_MAIN_ONLY",
    "FFI_MS_CDECL"
].forEach((prop)=>{
    if (!$fL96e.hasOwnProperty(prop)) return $f977867eb89b8f94$var$debug("skipping exporting of non-existant property", prop);
    const desc = Object.getOwnPropertyDescriptor($fL96e, prop);
    Object.defineProperty($f977867eb89b8f94$exports, prop, desc);
});
/**
 * Set the `ffi_type` property on the built-in types.
 */ Object.keys($fL96e.FFI_TYPES).forEach((name)=>{
    const type = $fL96e.FFI_TYPES[name];
    type.name = name;
    if (name === "pointer") return; // there is no "pointer" type...
    $5vfvk.types[name].ffi_type = type;
});
// make `size_t` use the "ffi_type_pointer"
$5vfvk.types.size_t.ffi_type = $fL96e.FFI_TYPES.pointer;
// make `Utf8String` use "ffi_type_pointer"
const $f977867eb89b8f94$var$CString = $5vfvk.types.CString || $5vfvk.types.Utf8String;
$f977867eb89b8f94$var$CString.ffi_type = $fL96e.FFI_TYPES.pointer;
// make `Object` use the "ffi_type_pointer"
$5vfvk.types.Object.ffi_type = $fL96e.FFI_TYPES.pointer;
// libffi is weird when it comes to long data types (defaults to 64-bit),
// so we emulate here, since some platforms have 32-bit longs and some
// platforms have 64-bit longs.
switch($5vfvk.sizeof.long){
    case 4:
        $5vfvk.types.ulong.ffi_type = $fL96e.FFI_TYPES.uint32;
        $5vfvk.types.long.ffi_type = $fL96e.FFI_TYPES.int32;
        break;
    case 8:
        $5vfvk.types.ulong.ffi_type = $fL96e.FFI_TYPES.uint64;
        $5vfvk.types.long.ffi_type = $fL96e.FFI_TYPES.int64;
        break;
    default:
        throw new Error('unsupported "long" size: ' + $5vfvk.sizeof.long);
}
/**
 * Alias the "ref" types onto ffi's exports, for convenience...
 */ $f977867eb89b8f94$exports.types = $5vfvk.types;
// Include our other modules
$f977867eb89b8f94$exports.version = $fL96e.version;

$f977867eb89b8f94$exports.CIF = (parcelRequire("lMUnw"));

$f977867eb89b8f94$exports.CIF_var = (parcelRequire("dS6wn"));

$f977867eb89b8f94$exports.Function = (parcelRequire("jVK3t"));

$f977867eb89b8f94$exports.ForeignFunction = (parcelRequire("7fCj7"));

$f977867eb89b8f94$exports.VariadicForeignFunction = (parcelRequire("7XEu2"));

$f977867eb89b8f94$exports.DynamicLibrary = (parcelRequire("fCwju"));

$f977867eb89b8f94$exports.Library = (parcelRequire("2lRdN"));

$f977867eb89b8f94$exports.Callback = (parcelRequire("8bSCX"));

$f977867eb89b8f94$exports.errno = (parcelRequire("6BVXM"));

$f977867eb89b8f94$exports.ffiType = (parcelRequire("fDp7d"));
// the shared library extension for this platform
$f977867eb89b8f94$exports.LIB_EXT = $f977867eb89b8f94$exports.Library.EXT;
// the FFI_TYPE struct definition
$f977867eb89b8f94$exports.FFI_TYPE = $f977867eb89b8f94$exports.ffiType.FFI_TYPE;



const $7db3efa3d5db5691$var$dllInst = new Map(); // for DLL.load() with settings.singleton === true
function $7db3efa3d5db5691$export$11e63f7b0f3d9900(dllName, dllFuncs, fns, settings) {
    const st = $7db3efa3d5db5691$var$parse_settings(settings);
    if (st.singleton) {
        let inst = $7db3efa3d5db5691$var$get_inst_by_name(dllName);
        if (!inst) {
            inst = $f977867eb89b8f94$exports.Library(dllName, $7db3efa3d5db5691$export$def475715f38575d(dllFuncs, fns));
            $7db3efa3d5db5691$var$set_inst_by_name(dllName, inst);
        }
        return inst;
    } else // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return $f977867eb89b8f94$exports.Library(dllName, $7db3efa3d5db5691$export$def475715f38575d(dllFuncs, fns));
}
function $7db3efa3d5db5691$export$def475715f38575d(dllFuncs, fns) {
    const ret = {};
    if (fns && Array.isArray(fns) && fns.length) for (const fn of fns){
        const ps = dllFuncs[fn];
        if (typeof ps !== "undefined") Object.defineProperty(ret, fn, {
            value: ps,
            writable: false,
            enumerable: true,
            configurable: false
        });
    }
    else for (const fn1 of Object.keys(dllFuncs)){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const ps = dllFuncs[fn1];
        if (typeof ps !== "undefined") Object.defineProperty(ret, fn1, {
            value: ps,
            writable: false,
            enumerable: true,
            configurable: false
        });
    }
    return ret;
}
function $7db3efa3d5db5691$var$get_inst_by_name(dllName) {
    return $7db3efa3d5db5691$var$dllInst.get(dllName);
}
function $7db3efa3d5db5691$var$set_inst_by_name(dllName, inst) {
    $7db3efa3d5db5691$var$dllInst.set(dllName, inst);
}
function $7db3efa3d5db5691$var$parse_settings(settings) {
    const st = {
        ...(0, $503b3d7c3341aa9e$exports).settingsDefault
    };
    if (typeof settings !== "undefined" && Object.keys(settings).length) Object.assign(st, settings);
    return st;
}



const $3fb16be291d6608d$export$b139dcabebd3c0ad = {
    InitCommonControlsEx: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPINITCOMMONCONTROLSEX
        ]
    ]
};


const $675f3348269104c6$export$901a8201111c7957 = "comctl32" /* comctl32 */ ;
const $675f3348269104c6$export$11e63f7b0f3d9900 = (fns, settings)=>(0, $7db3efa3d5db5691$export$11e63f7b0f3d9900)($675f3348269104c6$export$901a8201111c7957, (0, $3fb16be291d6608d$export$b139dcabebd3c0ad), fns, settings);




const $8708315579beafe7$export$b139dcabebd3c0ad = {
    FormatMessageW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPCVOID,
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPTSTR,
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).va_list
        ], 
    ],
    FreeConsole: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        []
    ],
    GenerateConsoleCtrlEvent: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD
        ]
    ],
    /** err code: https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms681381(v=vs.85).aspx */ GetLastError: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
        []
    ],
    /** retrive value from buf by ret.ref().readUInt32() */ GetModuleHandleW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HMODULE,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPCTSTR
        ]
    ],
    /** flags, optional LPCTSTR name, ref hModule */ GetModuleHandleExW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPCTSTR,
            (0, $1e37355cdb159231$export$be44eba04df286d7).HMODULE
        ]
    ],
    GetProcessHeaps: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).PHANDLE
        ]
    ],
    GetSystemTimes: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).PFILETIME,
            (0, $1e37355cdb159231$export$be44eba04df286d7).PFILETIME,
            (0, $1e37355cdb159231$export$be44eba04df286d7).PFILETIME
        ]
    ],
    HeapFree: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HANDLE,
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPVOID
        ]
    ],
    OpenProcess: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HANDLE,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD
        ]
    ],
    OutputDebugStringW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).VOID,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPCTSTR
        ]
    ],
    SetLastError: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).VOID,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD
        ]
    ],
    SetThreadExecutionState: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).INT,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).INT
        ]
    ]
};


const $042613a0bf861772$export$901a8201111c7957 = "kernel32" /* kernel32 */ ;
const $042613a0bf861772$export$11e63f7b0f3d9900 = (fns, settings)=>(0, $7db3efa3d5db5691$export$11e63f7b0f3d9900)($042613a0bf861772$export$901a8201111c7957, (0, $8708315579beafe7$export$b139dcabebd3c0ad), fns, settings);




const $e662b4523768d366$export$b139dcabebd3c0ad = {
    NtQueryInformationProcess: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).NTSTATUS,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HANDLE,
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD32,
            (0, $1e37355cdb159231$export$be44eba04df286d7).PVOID,
            (0, $1e37355cdb159231$export$be44eba04df286d7).ULONG,
            (0, $1e37355cdb159231$export$be44eba04df286d7).PULONG
        ]
    ]
};


const $fdb7db87b941efc6$export$901a8201111c7957 = "ntdll" /* ntdll */ ;
const $fdb7db87b941efc6$export$11e63f7b0f3d9900 = (fns, settings)=>(0, $7db3efa3d5db5691$export$11e63f7b0f3d9900)($fdb7db87b941efc6$export$901a8201111c7957, (0, $e662b4523768d366$export$b139dcabebd3c0ad), fns, settings);


var $e868b7f1fe3d35a7$exports = {};

$parcel$export($e868b7f1fe3d35a7$exports, "dllName", () => $e868b7f1fe3d35a7$export$901a8201111c7957);
$parcel$export($e868b7f1fe3d35a7$exports, "load", () => $e868b7f1fe3d35a7$export$11e63f7b0f3d9900);
$parcel$export($e868b7f1fe3d35a7$exports, "apiDef", () => $7e0f82b1be0bb655$export$b139dcabebd3c0ad);
$parcel$export($e868b7f1fe3d35a7$exports, "constants", () => $468fceecf6687e1c$exports);


const $7e0f82b1be0bb655$export$b139dcabebd3c0ad = {
    BringWindowToTop: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND
        ]
    ],
    /** url: https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-clienttoscreen */ ClientToScreen: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPPOINT
        ]
    ],
    CloseWindow: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND
        ]
    ],
    CreateWindowExW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPCTSTR,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPCTSTR,
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).INT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).INT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).INT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).INT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).HMENU,
            (0, $1e37355cdb159231$export$be44eba04df286d7).HINSTANCE,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPVOID, 
        ], 
    ],
    DefWindowProcW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).LRESULT,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).WPARAM,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPARAM
        ]
    ],
    DestroyWindow: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND
        ]
    ],
    DispatchMessageW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).LRESULT,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPMSG
        ]
    ],
    /** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumdisplaydevicesw */ EnumDisplayDevicesW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPCWSTR,
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).POINT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD
        ]
    ],
    EnumThreadWindows: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).WNDENUMPROC,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPARAM
        ]
    ],
    EnumWindows: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).WNDENUMPROC,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPARAM
        ]
    ],
    FindWindowExW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPCTSTR,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPCTSTR
        ]
    ],
    GetAncestor: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT
        ]
    ],
    GetAltTabInfoW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).INT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).INT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPWSTR,
            (0, $1e37355cdb159231$export$be44eba04df286d7).INT
        ]
    ],
    GetClassInfoExW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HINSTANCE,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPCTSTR,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPWNDCLASSEX
        ]
    ],
    GetForegroundWindow: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
        []
    ],
    GetMessageW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPMSG,
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT
        ]
    ],
    GetParent: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND
        ]
    ],
    GetRawInputDeviceInfoW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).UINT,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HANDLE,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPVOID,
            (0, $1e37355cdb159231$export$be44eba04df286d7).PUINT
        ]
    ],
    GetRawInputDeviceList: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).INT,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).PRAWINPUTDEVICELIST,
            (0, $1e37355cdb159231$export$be44eba04df286d7).PUINT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT
        ]
    ],
    GetTopWindow: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND
        ]
    ],
    GetWindow: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT
        ]
    ],
    GetWindowInfo: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).PWINDOWINFO
        ]
    ],
    GetWindowLongW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).LONG,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).INT
        ]
    ],
    GetWindowRect: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).RECT
        ]
    ],
    GetWindowTextW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).INT,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPTSTR,
            (0, $1e37355cdb159231$export$be44eba04df286d7).INT
        ]
    ],
    GetWindowThreadProcessId: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPDWORD
        ]
    ],
    IsWindowVisible: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND
        ]
    ],
    PeekMessageW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPMSG,
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT
        ]
    ],
    PostMessageW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).WPARAM,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPARAM
        ]
    ],
    PrintWindow: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).HDC,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT
        ]
    ],
    RegisterClassExW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).ATOM,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).WNDCLASSEX
        ]
    ],
    SendMessageW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).LRESULT,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).WPARAM,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPARAM
        ]
    ],
    SetForegroundWindow: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND
        ]
    ],
    SetWindowTextW: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPCTSTR
        ]
    ],
    SetWinEventHook: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HWINEVENTHOOK,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT,
            (0, $1e37355cdb159231$export$be44eba04df286d7).HMODULE,
            (0, $1e37355cdb159231$export$be44eba04df286d7).WINEVENTPROC,
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).DWORD,
            (0, $1e37355cdb159231$export$be44eba04df286d7).UINT
        ]
    ],
    ShowWindow: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
            (0, $1e37355cdb159231$export$be44eba04df286d7).INT
        ]
    ],
    TranslateMessage: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPMSG
        ]
    ],
    TranslateMessageEx: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).LPMSG
        ]
    ],
    UnhookWinEvent: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWINEVENTHOOK
        ]
    ],
    UpdateWindow: [
        (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
        [
            (0, $1e37355cdb159231$export$be44eba04df286d7).HWND
        ]
    ]
};
/* istanbul ignore next */ if (process.arch === "x64") $7e0f82b1be0bb655$export$b139dcabebd3c0ad.GetWindowLongPtrW = [
    (0, $1e37355cdb159231$export$be44eba04df286d7).LONG_PTR,
    [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
        (0, $1e37355cdb159231$export$be44eba04df286d7).INT
    ]
];


var $468fceecf6687e1c$exports = {};

$parcel$export($468fceecf6687e1c$exports, "WS_BORDER", () => $468fceecf6687e1c$export$606a835aa674cdb3);
$parcel$export($468fceecf6687e1c$exports, "WS_CAPTION", () => $468fceecf6687e1c$export$48eb2f3b6cc3c4ab);
$parcel$export($468fceecf6687e1c$exports, "WS_CHILD", () => $468fceecf6687e1c$export$4c112980a139215d);
$parcel$export($468fceecf6687e1c$exports, "WS_CLIPCHILDREN", () => $468fceecf6687e1c$export$90b2f252d51b6a52);
$parcel$export($468fceecf6687e1c$exports, "WS_CLIPSIBLINGS", () => $468fceecf6687e1c$export$5859e29fe7a8b839);
$parcel$export($468fceecf6687e1c$exports, "WS_DISABLED", () => $468fceecf6687e1c$export$ea7e473ff3254424);
$parcel$export($468fceecf6687e1c$exports, "WS_DLGFRAME", () => $468fceecf6687e1c$export$7882bfae04973a26);
$parcel$export($468fceecf6687e1c$exports, "WS_GROUP", () => $468fceecf6687e1c$export$602f6ce66ce44069);
$parcel$export($468fceecf6687e1c$exports, "WS_HSCROLL", () => $468fceecf6687e1c$export$48315059b9ef7495);
$parcel$export($468fceecf6687e1c$exports, "WS_ICONIC", () => $468fceecf6687e1c$export$ded3cd280fb3e5fe);
$parcel$export($468fceecf6687e1c$exports, "WS_MAXIMIZE", () => $468fceecf6687e1c$export$cb67cd8938c7da8d);
$parcel$export($468fceecf6687e1c$exports, "WS_MAXIMIZEBOX", () => $468fceecf6687e1c$export$a6fe78de55428aeb);
$parcel$export($468fceecf6687e1c$exports, "WS_MINIMIZE", () => $468fceecf6687e1c$export$7e3c94cdd9b0ff82);
$parcel$export($468fceecf6687e1c$exports, "WS_MINIMIZEBOX", () => $468fceecf6687e1c$export$23b24f1629122f49);
$parcel$export($468fceecf6687e1c$exports, "WS_OVERLAPPED", () => $468fceecf6687e1c$export$e54245776ad9d7fa);
$parcel$export($468fceecf6687e1c$exports, "WS_POPUP", () => $468fceecf6687e1c$export$5d8c47859934839f);
$parcel$export($468fceecf6687e1c$exports, "WS_SIZEBOX", () => $468fceecf6687e1c$export$47c2f5f37fdcd568);
$parcel$export($468fceecf6687e1c$exports, "WS_SYSMENU", () => $468fceecf6687e1c$export$73e498efb7725a4c);
$parcel$export($468fceecf6687e1c$exports, "WS_TABSTOP", () => $468fceecf6687e1c$export$850ce5441c8d76d3);
$parcel$export($468fceecf6687e1c$exports, "WS_THICKFRAME", () => $468fceecf6687e1c$export$734122ec1d097c70);
$parcel$export($468fceecf6687e1c$exports, "WS_TILED", () => $468fceecf6687e1c$export$adb10497ba59a062);
$parcel$export($468fceecf6687e1c$exports, "WS_VISIBLE", () => $468fceecf6687e1c$export$f97d49e0f973a11b);
$parcel$export($468fceecf6687e1c$exports, "WS_VSCROLL", () => $468fceecf6687e1c$export$46bf8a39b3410e27);
$parcel$export($468fceecf6687e1c$exports, "WS_OVERLAPPEDWINDOW", () => $468fceecf6687e1c$export$e41e76d33b2ee815);
$parcel$export($468fceecf6687e1c$exports, "WS_POPUPWINDOW", () => $468fceecf6687e1c$export$158420e94832e095);
$parcel$export($468fceecf6687e1c$exports, "WS_TILEDWINDOW", () => $468fceecf6687e1c$export$630b11ccf7464717);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_ACCEPTFILES", () => $468fceecf6687e1c$export$b4974fc5ec881eb2);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_APPWINDOW", () => $468fceecf6687e1c$export$7c9488afb90066eb);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_CLIENTEDGE", () => $468fceecf6687e1c$export$e17ef95cc3937744);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_COMPOSITED", () => $468fceecf6687e1c$export$9bee6cf39ebfa14f);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_CONTEXTHELP", () => $468fceecf6687e1c$export$2bbddc32e25aff08);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_CONTROLPARENT", () => $468fceecf6687e1c$export$550a968b8f335560);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_DLGMODALFRAME", () => $468fceecf6687e1c$export$66454f5316761e6d);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_LAYERED", () => $468fceecf6687e1c$export$37e2ee22bedc259b);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_LAYOUTRTL", () => $468fceecf6687e1c$export$4de06b73361773aa);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_LEFT", () => $468fceecf6687e1c$export$6d6281491c3c345b);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_LEFTSCROLLBAR", () => $468fceecf6687e1c$export$992aaeca1d900884);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_LTRREADING", () => $468fceecf6687e1c$export$223645391ca50517);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_MDICHILD", () => $468fceecf6687e1c$export$ec70e607715a0dd8);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_NOACTIVATE", () => $468fceecf6687e1c$export$3bde6e836089a4c4);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_NOINHERITLAYOUT", () => $468fceecf6687e1c$export$8e4caed601fc6859);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_NOPARENTNOTIFY", () => $468fceecf6687e1c$export$405abfaa3d30b735);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_NOREDIRECTIONBITMAP", () => $468fceecf6687e1c$export$abd6e08734fc0be5);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_RIGHT", () => $468fceecf6687e1c$export$5ffc168bdc33e81a);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_RIGHTSCROLLBAR", () => $468fceecf6687e1c$export$7e05a5e1e0f3630f);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_RTLREADING", () => $468fceecf6687e1c$export$f2eef988e187a8fe);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_STATICEDGE", () => $468fceecf6687e1c$export$d497db29e2467861);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_TOOLWINDOW", () => $468fceecf6687e1c$export$ce69c1415f4c9e9);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_TOPMOST", () => $468fceecf6687e1c$export$fc7bd9e6c250670a);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_TRANSPARENT", () => $468fceecf6687e1c$export$5655aef644f812f9);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_WINDOWEDGE", () => $468fceecf6687e1c$export$c0529b550722ec16);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_OVERLAPPEDWINDOW", () => $468fceecf6687e1c$export$8e8eb584a9d8e6a0);
$parcel$export($468fceecf6687e1c$exports, "WS_EX_PALETTEWINDOW", () => $468fceecf6687e1c$export$9c34c2c2258a5ed0);
$parcel$export($468fceecf6687e1c$exports, "PM_NOREMOVE", () => $468fceecf6687e1c$export$b833dd3cd68611e5);
$parcel$export($468fceecf6687e1c$exports, "PM_REMOVE", () => $468fceecf6687e1c$export$c52d6ca467ce0472);
$parcel$export($468fceecf6687e1c$exports, "PM_NOYIELD", () => $468fceecf6687e1c$export$684da755af3f7a1f);
$parcel$export($468fceecf6687e1c$exports, "CW_USEDEFAULT", () => $468fceecf6687e1c$export$e3066a4bd9a3474a);
const $468fceecf6687e1c$export$606a835aa674cdb3 = 0x00800000;
const $468fceecf6687e1c$export$48eb2f3b6cc3c4ab = 0x00C00000;
const $468fceecf6687e1c$export$4c112980a139215d = 0x40000000;
const $468fceecf6687e1c$export$90b2f252d51b6a52 = 0x02000000;
const $468fceecf6687e1c$export$5859e29fe7a8b839 = 0x04000000;
const $468fceecf6687e1c$export$ea7e473ff3254424 = 0x08000000;
const $468fceecf6687e1c$export$7882bfae04973a26 = 0x00400000;
const $468fceecf6687e1c$export$602f6ce66ce44069 = 0x00020000;
const $468fceecf6687e1c$export$48315059b9ef7495 = 0x00100000;
const $468fceecf6687e1c$export$ded3cd280fb3e5fe = 0x20000000;
const $468fceecf6687e1c$export$cb67cd8938c7da8d = 0x01000000;
const $468fceecf6687e1c$export$a6fe78de55428aeb = 0x00010000;
const $468fceecf6687e1c$export$7e3c94cdd9b0ff82 = 0x20000000;
const $468fceecf6687e1c$export$23b24f1629122f49 = 0x00020000;
const $468fceecf6687e1c$export$e54245776ad9d7fa = 0x00000000;
const $468fceecf6687e1c$export$5d8c47859934839f = 0x80000000; // The windows is a pop-up window
const $468fceecf6687e1c$export$47c2f5f37fdcd568 = 0x00040000;
const $468fceecf6687e1c$export$73e498efb7725a4c = 0x00080000; // The window has a window menu on its title bar.
const $468fceecf6687e1c$export$850ce5441c8d76d3 = 0x00010000;
const $468fceecf6687e1c$export$734122ec1d097c70 = 0x00040000;
const $468fceecf6687e1c$export$adb10497ba59a062 = 0x00000000;
const $468fceecf6687e1c$export$f97d49e0f973a11b = 0x10000000;
const $468fceecf6687e1c$export$46bf8a39b3410e27 = 0x00200000;
const $468fceecf6687e1c$export$e41e76d33b2ee815 = $468fceecf6687e1c$export$e54245776ad9d7fa | $468fceecf6687e1c$export$48eb2f3b6cc3c4ab | $468fceecf6687e1c$export$73e498efb7725a4c | $468fceecf6687e1c$export$734122ec1d097c70 | $468fceecf6687e1c$export$23b24f1629122f49 | $468fceecf6687e1c$export$a6fe78de55428aeb;
const $468fceecf6687e1c$export$158420e94832e095 = $468fceecf6687e1c$export$5d8c47859934839f | $468fceecf6687e1c$export$606a835aa674cdb3 | $468fceecf6687e1c$export$73e498efb7725a4c;
const $468fceecf6687e1c$export$630b11ccf7464717 = $468fceecf6687e1c$export$e54245776ad9d7fa | $468fceecf6687e1c$export$48eb2f3b6cc3c4ab | $468fceecf6687e1c$export$73e498efb7725a4c | $468fceecf6687e1c$export$734122ec1d097c70 | $468fceecf6687e1c$export$23b24f1629122f49 | $468fceecf6687e1c$export$a6fe78de55428aeb;
const $468fceecf6687e1c$export$b4974fc5ec881eb2 = 0x00000010;
const $468fceecf6687e1c$export$7c9488afb90066eb = 0x00040000;
const $468fceecf6687e1c$export$e17ef95cc3937744 = 0x00000200;
const $468fceecf6687e1c$export$9bee6cf39ebfa14f = 0x02000000;
const $468fceecf6687e1c$export$2bbddc32e25aff08 = 0x00000400;
const $468fceecf6687e1c$export$550a968b8f335560 = 0x00010000;
const $468fceecf6687e1c$export$66454f5316761e6d = 0x00000001;
const $468fceecf6687e1c$export$37e2ee22bedc259b = 0x00080000;
const $468fceecf6687e1c$export$4de06b73361773aa = 0x00400000;
const $468fceecf6687e1c$export$6d6281491c3c345b = 0x00000000;
const $468fceecf6687e1c$export$992aaeca1d900884 = 0x00004000;
const $468fceecf6687e1c$export$223645391ca50517 = 0x00000000;
const $468fceecf6687e1c$export$ec70e607715a0dd8 = 0x00000040;
const $468fceecf6687e1c$export$3bde6e836089a4c4 = 0x08000000;
const $468fceecf6687e1c$export$8e4caed601fc6859 = 0x00100000;
const $468fceecf6687e1c$export$405abfaa3d30b735 = 0x00000004;
const $468fceecf6687e1c$export$abd6e08734fc0be5 = 0x00200000;
const $468fceecf6687e1c$export$5ffc168bdc33e81a = 0x00001000;
const $468fceecf6687e1c$export$7e05a5e1e0f3630f = 0x00000000;
const $468fceecf6687e1c$export$f2eef988e187a8fe = 0x00002000;
const $468fceecf6687e1c$export$d497db29e2467861 = 0x00020000;
const $468fceecf6687e1c$export$ce69c1415f4c9e9 = 0x00000080;
const $468fceecf6687e1c$export$fc7bd9e6c250670a = 0x00000008;
const $468fceecf6687e1c$export$5655aef644f812f9 = 0x00000020;
const $468fceecf6687e1c$export$c0529b550722ec16 = 0x00000100;
const $468fceecf6687e1c$export$8e8eb584a9d8e6a0 = $468fceecf6687e1c$export$c0529b550722ec16 | $468fceecf6687e1c$export$e17ef95cc3937744;
const $468fceecf6687e1c$export$9c34c2c2258a5ed0 = $468fceecf6687e1c$export$c0529b550722ec16 | $468fceecf6687e1c$export$ce69c1415f4c9e9 | $468fceecf6687e1c$export$fc7bd9e6c250670a;
const $468fceecf6687e1c$export$b833dd3cd68611e5 = 0x0000;
const $468fceecf6687e1c$export$c52d6ca467ce0472 = 0x0001;
const $468fceecf6687e1c$export$684da755af3f7a1f = 0x0002;
const $468fceecf6687e1c$export$e3066a4bd9a3474a = -2147483648;


const $e868b7f1fe3d35a7$export$901a8201111c7957 = "user32" /* user32 */ ;
const $e868b7f1fe3d35a7$export$11e63f7b0f3d9900 = (fns, settings)=>(0, $7db3efa3d5db5691$export$11e63f7b0f3d9900)($e868b7f1fe3d35a7$export$901a8201111c7957, (0, $7e0f82b1be0bb655$export$b139dcabebd3c0ad), fns, settings);


const $60935e7e0d66b942$export$19a6ec7fd41142b0 = 0x01E1;
const $60935e7e0d66b942$export$1711f4719d90dd54 = 0x0014;
const $60935e7e0d66b942$export$ae5ced2ad50bea4d = 0x0031;
const $60935e7e0d66b942$export$b4a4b19b39d0e03d = 0x000D;
const $60935e7e0d66b942$export$7f36dc16c7eef4af = 0x000E;
const $60935e7e0d66b942$export$e04e254ca59ee39c = 0x0030;
const $60935e7e0d66b942$export$6dc777026572fa9e = 0x0080;
const $60935e7e0d66b942$export$75f41a0aed4da0f4 = 0x000C;
const $60935e7e0d66b942$export$230d25d29746b5fb = 0x001C;
const $60935e7e0d66b942$export$c2252265fe8812a6 = 0x001F;
const $60935e7e0d66b942$export$c7032b1dd28fb749 = 0x0022;
const $60935e7e0d66b942$export$611df49badc03681 = 0x0010;
const $60935e7e0d66b942$export$a77d4afa4af1b4af = 0x0001;
const $60935e7e0d66b942$export$3f9253d34e38d9ad = 0x0002;
const $60935e7e0d66b942$export$5dbb3c8731057d58 = 0x000A;
const $60935e7e0d66b942$export$ac6438855d7103ad = 0x0231;
const $60935e7e0d66b942$export$d847a774b2670f9e = 0x0232;
const $60935e7e0d66b942$export$655c35b13ae053cc = 0x007F;
const $60935e7e0d66b942$export$511eebb7edc32326 = 0x0024;
const $60935e7e0d66b942$export$84cf65970abba9fc = 0x0051;
const $60935e7e0d66b942$export$70ec0f1178420e36 = 0x0050;
const $60935e7e0d66b942$export$896999da2d79d94c = 0x0003;
const $60935e7e0d66b942$export$756b94317d7ae37e = 0x0216;
const $60935e7e0d66b942$export$68592c08fc3654dc = 0x0086;
const $60935e7e0d66b942$export$f433a545ca588d4 = 0x0083;
const $60935e7e0d66b942$export$93f700c154a8ef31 = 0x0081;
const $60935e7e0d66b942$export$7e6ae754655a83ac = 0x0082;
const $60935e7e0d66b942$export$8993f8ad8a35161a = 0x0000;
const $60935e7e0d66b942$export$36043964122f25fb = 0x0037;
const $60935e7e0d66b942$export$4a709bca827ba034 = 0x0013;
const $60935e7e0d66b942$export$37eb37610775733 = 0x0012;
const $60935e7e0d66b942$export$c146a401ece9a71f = 0x0018;
const $60935e7e0d66b942$export$716ed736c365c5f = 0x0005;
const $60935e7e0d66b942$export$4c9c95cba171bb6 = 0x0214;
const $60935e7e0d66b942$export$216a428970a70cf0 = 0x007D;
const $60935e7e0d66b942$export$c31907b319189679 = 0x007C;
const $60935e7e0d66b942$export$c315d9c4d0de5b29 = 0x031A;
const $60935e7e0d66b942$export$48c8b073b611c1d6 = 0x0054;
const $60935e7e0d66b942$export$f8d3ed8c0a212c5a = 0x0047;
const $60935e7e0d66b942$export$9b05f3b8d920a20d = 0x0046;
const $60935e7e0d66b942$export$a49def560f5750b7 = 0x004A;
const $60935e7e0d66b942$export$18db53ad3fad49f4 = 0x0111;
const $60935e7e0d66b942$export$8859e65815fdef55 = 0x007B;
const $60935e7e0d66b942$export$9d05462016b2860e = 0x0211;
const $60935e7e0d66b942$export$f130ce90d71e3f9e = 0x0212;
const $60935e7e0d66b942$export$a4734366f393e003 = 0x033F;
const $60935e7e0d66b942$export$77c47651c71648bc = 0x0126;
const $60935e7e0d66b942$export$7d209ffae6d958ef = 0x0123;
const $60935e7e0d66b942$export$f7e968c32310d604 = 0x0124;
const $60935e7e0d66b942$export$5a0a85b946206cbe = 0x0122;
const $60935e7e0d66b942$export$5ed53755b4101a78 = 0x0213;
const $60935e7e0d66b942$export$b526be0e425ebfc9 = 0x0125;









var $1Pa9k = parcelRequire("1Pa9k");


var $5vfvk = parcelRequire("5vfvk");

var $e0df5332b064be86$exports = {};
$parcel$export($e0df5332b064be86$exports, "ElementCE", () => $bd9b41eda58071dd$export$ea432ebb9d598fdf);
$parcel$export($e0df5332b064be86$exports, "NumberCE", () => $80186945e8d52e55$export$caa4dfc7169288b7);
$parcel$export($e0df5332b064be86$exports, "ObjectCE", () => $1216bcf1d31d00c6$export$982d7f197acc6f94);
$parcel$export($e0df5332b064be86$exports, "StringCE", () => $ccace40069512cd2$export$29246bb2b9c16932);
$parcel$export($e0df5332b064be86$exports, "Assert", () => $f9c728f16c05ea72$export$14647bdf767968d3);
$parcel$export($e0df5332b064be86$exports, "E", () => $bff1a0df7235a3e6$export$a9c23c6ac3fc3eca);
$parcel$export($e0df5332b064be86$exports, "IsNumber", () => $558beaa9e91cc3f5$export$bdf29e0acfffe6ef);
$parcel$export($e0df5332b064be86$exports, "IsNaN", () => $558beaa9e91cc3f5$export$f375b07b95af9a54);
$parcel$export($e0df5332b064be86$exports, "IsString", () => $558beaa9e91cc3f5$export$fae01d74d6648c3f);
$parcel$export($e0df5332b064be86$exports, "IsObject", () => $558beaa9e91cc3f5$export$e64f6626d4e96cfb);
$parcel$export($e0df5332b064be86$exports, "IsFunction", () => $558beaa9e91cc3f5$export$426ce8831f60741b);
var $99bc7ec9b00ad794$exports = {};

$parcel$export($99bc7ec9b00ad794$exports, "ArrayCE", () => $99bc7ec9b00ad794$export$f35d492e63fcc0d6, (v) => $99bc7ec9b00ad794$export$f35d492e63fcc0d6 = v);

var $558beaa9e91cc3f5$export$87b259aa03e3d267 = ()=>"bool";
var $558beaa9e91cc3f5$export$7d260a2a5f8bc19e = ()=>"int";
var $558beaa9e91cc3f5$export$7b3cbda67be88f5f = ()=>"double";
var $558beaa9e91cc3f5$export$22b082955e083ec3 = ()=>"string";
function $558beaa9e91cc3f5$export$1d10e1e94bc8dbf2(obj) {
    return $558beaa9e91cc3f5$export$5c6c9f1eec02dba8(obj) || $558beaa9e91cc3f5$export$bdf29e0acfffe6ef(obj) || $558beaa9e91cc3f5$export$fae01d74d6648c3f(obj);
}
function $558beaa9e91cc3f5$export$5c6c9f1eec02dba8(obj) {
    return typeof obj == "boolean";
} //|| obj instanceof Boolean
function $558beaa9e91cc3f5$export$25e8ae17d770cbdb(boolStr) {
    return boolStr == "true";
}
function $558beaa9e91cc3f5$export$6486a15b46b6985c(obj, allowNaN = false) {
    return $558beaa9e91cc3f5$export$fae01d74d6648c3f(obj) && obj.length && $558beaa9e91cc3f5$export$bdf29e0acfffe6ef(Number(obj), false, allowNaN);
}
function $558beaa9e91cc3f5$export$bdf29e0acfffe6ef(obj, allowNumberObj = false, allowNaN = false) {
    if (!allowNaN && $558beaa9e91cc3f5$export$f375b07b95af9a54(obj)) return false;
    return typeof obj == "number" || allowNumberObj && obj instanceof Number;
}
function $558beaa9e91cc3f5$export$8084f86c2571bdd(stringOrFloatVal, valIfConversionFails = NaN, allowParseNaN = false) {
    if (!$558beaa9e91cc3f5$export$fae01d74d6648c3f(stringOrFloatVal) && !$558beaa9e91cc3f5$export$bdf29e0acfffe6ef(stringOrFloatVal)) return valIfConversionFails;
    if ($558beaa9e91cc3f5$export$fae01d74d6648c3f(stringOrFloatVal) && stringOrFloatVal.length == 0) return valIfConversionFails;
    const result = Number(stringOrFloatVal);
    if ($558beaa9e91cc3f5$export$f375b07b95af9a54(result) && !allowParseNaN) return valIfConversionFails;
    return result;
}
function $558beaa9e91cc3f5$export$a09985dba7548c1(obj) {
    return $558beaa9e91cc3f5$export$bdf29e0acfffe6ef(obj) && parseInt(obj) == obj;
}
function $558beaa9e91cc3f5$export$e45cc972ee8cb237(stringOrFloatVal, valIfConversionFails = NaN, allowParseNaN = false) {
    const result = parseInt(`${$558beaa9e91cc3f5$export$8084f86c2571bdd(stringOrFloatVal, valIfConversionFails)}`);
    if ($558beaa9e91cc3f5$export$f375b07b95af9a54(result) && !allowParseNaN) return valIfConversionFails;
    return result;
}
function $558beaa9e91cc3f5$export$f375b07b95af9a54(obj) {
    return typeof obj == "number" && obj != obj;
}
function $558beaa9e91cc3f5$export$fae01d74d6648c3f(obj, allowStringObj = false) {
    return typeof obj == "string" || allowStringObj && obj instanceof String;
}
function $558beaa9e91cc3f5$export$5f245f9a686b5058(val) {
    return `${val}`;
}
function $558beaa9e91cc3f5$export$9dc58581bb80d9a7(obj, allowSymbolObj = false) {
    return typeof obj == "symbol" || allowSymbolObj && true && obj instanceof Symbol;
}
function $558beaa9e91cc3f5$export$426ce8831f60741b(obj) {
    //return obj instanceof Function;
    return typeof obj == "function";
}
function $558beaa9e91cc3f5$export$e7d622d382907f22(obj) {
    return Array.isArray(obj);
} // for briefness and/or consistency
function $558beaa9e91cc3f5$export$e64f6626d4e96cfb(obj) {
    return typeof obj == "object";
}
function $558beaa9e91cc3f5$export$f0b687c652821bb1(obj, typeConstructor) {
    return obj instanceof typeConstructor;
}
function $558beaa9e91cc3f5$export$71c78ed5059e344e(obj) {
    //return obj instanceof Function && obj.name;
    return typeof obj == "function" && obj.name;
}
function $558beaa9e91cc3f5$export$3dbf4f28d024c824(enumType, nameModifierFunc) {
    if (nameModifierFunc == "ui") nameModifierFunc = (name)=>(0, $bff1a0df7235a3e6$export$c35569273ccf4ab4)(name, (m)=>[
                m.startLower_to_upper,
                m.lowerUpper_to_lowerSpaceLower, 
            ]);
    //let entryNames = Object.keys(enumType).filter(a=>a.match(/^\D/) != null);
    // valid enum values are numbers and null, so any props other than those are the name->value props we want
    /*let nameValuePairs = enumType.Pairs().filter(pair=>!IsNumberString(pair.key) && pair.key != "null");
    return nameValuePairs.map(pair=>({name: nameModifierFunc ? nameModifierFunc(pair.key) : pair.key, value: pair.value as number}));*/ // valid enum values are numbers and null, so any keys other than those are the ones we want (they're the keys for the key->value pairs)
    const entryNames = Object.keys(enumType).filter((key)=>!$558beaa9e91cc3f5$export$6486a15b46b6985c(key) && key != "null");
    return entryNames.map((name)=>({
            name: nameModifierFunc instanceof Function ? nameModifierFunc(name) : name,
            value: enumType[name]
        }));
}
function $558beaa9e91cc3f5$export$67fa69466aa121d3(enumType) {
    return $558beaa9e91cc3f5$export$3dbf4f28d024c824(enumType).map((a)=>a.value);
}
function $558beaa9e91cc3f5$export$15580752cea262d1(enumType) {
    return $558beaa9e91cc3f5$export$67fa69466aa121d3(enumType).map((value)=>({
            const: value
        }));
}
function $558beaa9e91cc3f5$export$e809526ac82276e0(keysObj) {
    const optionsObj = {};
    const keys = Object.keys(keysObj);
    const values = keys; // could also check for string value-overrides on keysObj
    for (const key of keys)optionsObj[key] = key;
    return [
        optionsObj,
        values
    ];
}



const $021c07a9cdec3f37$export$39b482c5e57630a8 = typeof window == "object" ? window : $parcel$global;



function $f9c728f16c05ea72$export$14647bdf767968d3(condition, messageOrMessageFunc, triggerDebugger = true) {
    if (condition) return undefined;
    var message = messageOrMessageFunc instanceof Function ? messageOrMessageFunc() : messageOrMessageFunc;
    //JSVE.logFunc(`Assert failed) ${message}\n\nStackTrace) ${GetStackTraceStr()}`);
    //console.error("Assert failed) " + message);
    const skipError = false; // add flag which you can use to skip the error, when paused in debugger
    if (triggerDebugger) debugger;
    if (!skipError) throw new Error(`Assert failed) ${message}`);
    return undefined;
}
function $f9c728f16c05ea72$export$954bda899ec90822(condition, messageOrMessageFunc, opts) {
    if (condition) return;
    var message = messageOrMessageFunc instanceof Function ? messageOrMessageFunc() : messageOrMessageFunc;
    let message_final = `Assert-warn failed) ${message}`;
    if (opts === null || opts === void 0 ? void 0 : opts.addStackTrace) message_final += `\n\nStackTrace) ${(0, $bff1a0df7235a3e6$export$30cc257513a4c1f9)()}`;
    console.warn(message_final);
}
function $f9c728f16c05ea72$export$48d32c8cf49fbfd8(condition) {}
class $f9c728f16c05ea72$export$ebd11618f299a286 {
    /*static get NN() {
        return function<T>(value: T): NonNullable<T> {
            Assert(value != null, ()=>`Value cannot be null. (provided value: ${value})`);
            return value as any;
        };
    }*/ static set NN(value) {
        //A.NN(value);
        $f9c728f16c05ea72$export$1f54b5c3e1312ee8(value);
    }
    static NotEqualTo(val1) {
        return new $f9c728f16c05ea72$export$750d2ef5fccaee6e(val1);
    }
}
class $f9c728f16c05ea72$export$750d2ef5fccaee6e {
    constructor(val1){
        this.val1 = val1;
    }
    set a(val2) {
        $f9c728f16c05ea72$export$14647bdf767968d3(val2 != this.val1);
    }
}
class $f9c728f16c05ea72$export$4b2146afb5b045e1 {
    constructor(type){
        this.type = type;
    }
    set a(val) {
        $f9c728f16c05ea72$export$14647bdf767968d3(val != null && val.GetType().IsDerivedFrom(this.type));
    }
}
function $f9c728f16c05ea72$export$1f54b5c3e1312ee8(val) {
    $f9c728f16c05ea72$export$14647bdf767968d3(val != null, ()=>`Value cannot be null. (provided value: ${val})`);
    return val;
}


const $ddd4c45b6504925f$export$952e2b7e251b8b38 = {};
const $ddd4c45b6504925f$export$d3ae4127996a91af = [];
const $ddd4c45b6504925f$export$573c02fa5a6577a4 = []; // like emptyArray, except signifies that the cause of the emptiness is that data is still loading
const $ddd4c45b6504925f$export$9e6f8948b1b2764c = $ddd4c45b6504925f$export$952e2b7e251b8b38;
const $ddd4c45b6504925f$export$97c3b3b662cebb0f = ()=>$ddd4c45b6504925f$export$9e6f8948b1b2764c;
const $ddd4c45b6504925f$export$f2e0ce65e7cf9b72 = $ddd4c45b6504925f$export$d3ae4127996a91af;
const $ddd4c45b6504925f$export$cc476286d3e5ee91 = ()=>$ddd4c45b6504925f$export$f2e0ce65e7cf9b72;
const $ddd4c45b6504925f$export$c68a876246bd9efd = $ddd4c45b6504925f$export$573c02fa5a6577a4;
const $ddd4c45b6504925f$export$a13156c4d8291bfd = ()=>$ddd4c45b6504925f$export$c68a876246bd9efd;
function $ddd4c45b6504925f$export$7d594895db920a63(val) {
    return $ddd4c45b6504925f$export$71fbe7d802e0ea80(val) || $ddd4c45b6504925f$export$eaa6a5c6f740d8cc(val);
}
function $ddd4c45b6504925f$export$71fbe7d802e0ea80(obj) {
    return obj == $ddd4c45b6504925f$export$952e2b7e251b8b38;
}
function $ddd4c45b6504925f$export$eaa6a5c6f740d8cc(array) {
    return array == $ddd4c45b6504925f$export$d3ae4127996a91af || array == $ddd4c45b6504925f$export$573c02fa5a6577a4;
}
function $ddd4c45b6504925f$export$49c09a00d6159b3d(base) {
    if (base === undefined) return $ddd4c45b6504925f$export$573c02fa5a6577a4;
    if (base === null) return $ddd4c45b6504925f$export$d3ae4127996a91af;
    (0, $f9c728f16c05ea72$export$14647bdf767968d3)("Cannot get empty-array for base that is not null or undefined.");
}


if (Number.MIN_SAFE_INTEGER == null) Number.MIN_SAFE_INTEGER = -9007199254740991;
if (Number.MAX_SAFE_INTEGER == null) Number.MAX_SAFE_INTEGER = 9007199254740991;
(0, $021c07a9cdec3f37$export$39b482c5e57630a8)["G"] = $bff1a0df7235a3e6$var$G;
function $bff1a0df7235a3e6$var$G(...globalHolders) {
    for (const globalHolder of globalHolders)Object.assign((0, $021c07a9cdec3f37$export$39b482c5e57630a8), globalHolder);
}
function $bff1a0df7235a3e6$export$cd173cc739e10ddb(...args) {}
function $bff1a0df7235a3e6$export$1c42b73d40826583(...args) {}
function $bff1a0df7235a3e6$export$ddcfa504b07c784c(name = "default") {
    $bff1a0df7235a3e6$export$ddcfa504b07c784c["values"][name] = ($bff1a0df7235a3e6$export$ddcfa504b07c784c["values"][name] | 0) + 1; // eslint-disable-line
    return $bff1a0df7235a3e6$export$ddcfa504b07c784c["values"][name];
}
$bff1a0df7235a3e6$export$ddcfa504b07c784c["values"] = [];
function $bff1a0df7235a3e6$export$a9c23c6ac3fc3eca(e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15, e16, e17, e18, e19, e20) {
    /* eslint-enable */ return Object.assign({}, ...arguments);
}
function $bff1a0df7235a3e6$export$46ebe952f56fe2f(e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15, e16, e17, e18, e19, e20) {
    /* eslint-enable */ var result = {};
    for (const extend of Array.from(arguments)){
        if (!(0, $558beaa9e91cc3f5$export$e64f6626d4e96cfb)(extend)) continue;
        //Object.assign(result, extend);
        // use VSet, for its extra options (eg. using EF({someKey: false ? "someValue" : OMIT}) to omit "someKey" entirely)
        (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(result).VSet(extend);
    }
    // if result is empty, return the same empty-obj each time so it doesn't trigger react-js rerenders
    if ((0, $ddd4c45b6504925f$export$952e2b7e251b8b38) && (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(result).VKeys().length == 0) return 0, $ddd4c45b6504925f$export$952e2b7e251b8b38;
    return result;
//return StyleSheet.create(result);
}
function $bff1a0df7235a3e6$export$d5df1808c1f263c1(func) {
    Object.defineProperty(func, "Go", {
        /*set: arg1=>{
            func(arg1);
        },*/ set: func
    });
    return func;
}
var $bff1a0df7235a3e6$var$hasOwnProperty = Object.prototype.hasOwnProperty;
function $bff1a0df7235a3e6$export$ad886ff608f37420(objA, objB) {
    if (Object.is(objA, objB)) return true;
    if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    // test for A's keys different from B
    for(var i = 0; i < keysA.length; i++){
        if (!$bff1a0df7235a3e6$var$hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) return false;
    }
    return true;
}
function $bff1a0df7235a3e6$export$c30f1c873524680a(objA, objB) {
    return !$bff1a0df7235a3e6$export$ad886ff608f37420(objA, objB);
}
function $bff1a0df7235a3e6$export$1d8a493107fb4b3a(text) {
    /*
    //var note = $(`<input type="text">`).appendTo("body");
    var note = document.createElement("textarea");
    document.body.appendChild(note);
    note.innerHTML = text;

    note.focus();
    var range = document.createRange();
    range.setStart(note, 0);
    range.setEnd(note, 1);
    //range.setEnd(note2, 0);

    //range.setEnd(e("notesEnder"), 0); // adds one extra new-line; that's okay, right?
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    document.execCommand("copy");*/ document.oncopy = function(event) {
        event.clipboardData.setData("text/plain", text);
        event.preventDefault();
        document.oncopy = null;
    };
    document.execCommand("copy", false, null);
}
function $bff1a0df7235a3e6$export$98f03c5d19621d70(target) {
    //var name = (target as any).GetName();
    var name = target["name_fake"] || target.name || (target.toString().match(/^function\s*([^\s(]+)/) || [])[1];
    //console.log("Globalizing: " + name);
    (0, $021c07a9cdec3f37$export$39b482c5e57630a8)[name] = target;
}
class $bff1a0df7235a3e6$export$bd07df51db876934 {
    constructor(){
        this.lastID = -1;
    }
    GetID() {
        return ++this.lastID;
    }
}
const $bff1a0df7235a3e6$export$9c64ee4d84d79ce1 = "\n";
function $bff1a0df7235a3e6$export$195eb69f342913d(args) {
    return $bff1a0df7235a3e6$export$b3f2e2de3a8baa1e(args, 0);
}
function $bff1a0df7235a3e6$export$b3f2e2de3a8baa1e(args, start, end) {
    return Array.prototype.slice.call(args, start != null ? start : 0, end);
}
function $bff1a0df7235a3e6$export$a5433e0f3b1dce29(functionWithInCommentMultiline, useExtraPreprocessing) {
    useExtraPreprocessing = useExtraPreprocessing != null ? useExtraPreprocessing : true;
    var text = functionWithInCommentMultiline.toString().replace(/\r/g, "");
    // some extra preprocessing
    if (useExtraPreprocessing) {
        text = text.replace(/@@.*/g, ""); // remove single-line comments
        //text = text.replace(/@\**?\*@/g, ""); // remove multi-line comments
        text = text.replace(/@\*/g, "/*").replace(/\*@/g, "*/"); // fix multi-line comments
    }
    var firstCharPos = text.indexOf("\n", text.indexOf("/*")) + 1;
    return text.substring(firstCharPos, text.lastIndexOf("\n"));
}
function $bff1a0df7235a3e6$export$56a454fe9d34f22a(functionWithCode) {
    var text = functionWithCode.toString().replace(/\r/g, "");
    var firstCharOfSecondLinePos = text.indexOf("\n") + 1;
    var enderOfSecondLastLine = text.lastIndexOf("\n");
    var result = text.substring(firstCharOfSecondLinePos, enderOfSecondLastLine);
    result = result.replace(/\t/g, "    ");
    // replace the start and end tokens of special string-containers (used for keeping comments in-tact)
    result = result.replace(/['"]@((?:.|\n)+)@['"];(\n(?=\n))?/g, (match, sub1)=>sub1.replace(/\\n/, "\n"));
    return result;
}
function $bff1a0df7235a3e6$export$76818b28a78bf127(array, compare) {
    var array2 = array.map((item, index)=>({
            index: index,
            item: item
        }));
    array2.sort((a, b)=>{
        var r = compare(a.item, b.item, a.index, b.index);
        return r != 0 ? r : $bff1a0df7235a3e6$export$2c1d9c1fe3e6577a(a.index, b.index);
    });
    return array2.map((pack)=>pack.item);
}
function $bff1a0df7235a3e6$export$2c1d9c1fe3e6577a(a, b, caseSensitive = true) {
    if (!caseSensitive && typeof a == "string" && typeof b == "string") {
        a = a.toLowerCase();
        b = b.toLowerCase();
    }
    return a < b ? -1 : a > b ? 1 : 0;
}
function $bff1a0df7235a3e6$export$fe5c6e289677d1cc(obj, propMatchFunc, depth = 0) {
    /*var Assert = require("../../Frame/General/Assert").Assert;
    Assert(depth < 100, "CloneObject cannot work past depth 100! (probably circular ref)");*/ if (obj == null) return null;
    if ((0, $558beaa9e91cc3f5$export$1d10e1e94bc8dbf2)(obj)) return obj;
    //if (obj.GetType() == Array)
    if (obj.constructor == Array) return $bff1a0df7235a3e6$export$eaa68adec498c98a(obj);
    /*if (obj instanceof List)
        return List.apply(null, [obj.itemType].concat(V.CloneArray(obj)));
        if (obj instanceof Dictionary) {
            let result = new Dictionary(obj.keyType, obj.valueType);
            for (let pair of obj.Pairs)
                result.Add(pair.key, pair.value);
            return result;
        }*/ const result = {};
    for (const pair of (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(obj).Pairs())if (!(pair.value instanceof Function) && (propMatchFunc == null || propMatchFunc.call(obj, pair.key, pair.value))) result[pair.key] = $bff1a0df7235a3e6$export$fe5c6e289677d1cc(pair.value, propMatchFunc, depth + 1);
    return result;
}
function $bff1a0df7235a3e6$export$eaa68adec498c98a(array) {
    //array.slice(0); //deep: JSON.parse(JSON.stringify(array));
    return Array.prototype.slice.call(array, 0);
}
function $bff1a0df7235a3e6$export$d590fdd6c43280f7(func, newThis) {
    return func.bind(newThis);
}
class $bff1a0df7235a3e6$export$2eba8ec3a333fdbb {
    constructor(ancestorNodes, obj, prop){
        this.ancestorNodes = ancestorNodes;
        this.obj = obj;
        this.prop = prop;
    }
    get PathNodes() {
        if (this.prop == "_root") return [];
        return (0, $99bc7ec9b00ad794$exports.ArrayCE)(this.ancestorNodes).Select((a)=>a.prop).concat(this.prop);
    }
    get PathStr() {
        return this.PathNodes.join("/");
    }
    get PathStr_Updeep() {
        return this.PathNodes.join(".");
    }
    //value;
    get Value() {
        if (this.obj == null) return undefined;
        return this.obj[this.prop];
    }
    set Value(newVal) {
        this.obj[this.prop] = newVal;
    }
}
function $bff1a0df7235a3e6$export$af3391acba9fe505(obj, includeRootNode = false, _ancestorNodes = []) {
    (0, $f9c728f16c05ea72$export$14647bdf767968d3)(_ancestorNodes.length <= 300, "Cannot traverse more than 300 levels into object tree. (probably circular)");
    const result = [];
    if (includeRootNode) result.push(new $bff1a0df7235a3e6$export$2eba8ec3a333fdbb([], {
        _root: obj
    }, "_root"));
    const objIsMapLike = obj instanceof Map || obj.constructor.name == "ObservableMap"; // ObservableMap from mobx
    for (const key of objIsMapLike ? obj["keys"]() : Object.keys(obj)){
        const value = objIsMapLike ? obj["get"](key) : obj[key];
        const currentNode = new $bff1a0df7235a3e6$export$2eba8ec3a333fdbb(_ancestorNodes, obj, key);
        result.push(currentNode);
        if (value != null && (0, $558beaa9e91cc3f5$export$e64f6626d4e96cfb)(value)) (0, $99bc7ec9b00ad794$exports.ArrayCE)(result).AddRange($bff1a0df7235a3e6$export$af3391acba9fe505(value, false, _ancestorNodes.concat(currentNode)));
    }
    return result;
}
function $bff1a0df7235a3e6$export$d5b89b2d7b2338ea(treeRoot, pathNodesOrStr, includeRootNode = false, _ancestorNodes = []) {
    const descendantPathNodes = pathNodesOrStr instanceof Array ? pathNodesOrStr : pathNodesOrStr.split("/");
    const childTreeNode = new $bff1a0df7235a3e6$export$2eba8ec3a333fdbb(_ancestorNodes, treeRoot, descendantPathNodes[0]);
    var result = [];
    if (includeRootNode) result.push(new $bff1a0df7235a3e6$export$2eba8ec3a333fdbb([], {
        _root: treeRoot
    }, "_root"));
    result.push(childTreeNode);
    if (descendantPathNodes.length > 1) result.push(...$bff1a0df7235a3e6$export$d5b89b2d7b2338ea(childTreeNode ? childTreeNode.Value : null, (0, $99bc7ec9b00ad794$exports.ArrayCE)(descendantPathNodes).Skip(1).join("/"), false, _ancestorNodes.concat(childTreeNode)));
    return result;
}
function $bff1a0df7235a3e6$export$3aadccf4518ef7f1(treeRoot, pathNodesOrStr, visitFunc, visitRootNode = false, _ancestorNodes = []) {
    if (visitRootNode) visitFunc(new $bff1a0df7235a3e6$export$2eba8ec3a333fdbb([], {
        _root: treeRoot
    }, "_root"));
    const descendantPathNodes = pathNodesOrStr instanceof Array ? pathNodesOrStr : pathNodesOrStr.split("/");
    const childTreeNode = new $bff1a0df7235a3e6$export$2eba8ec3a333fdbb(_ancestorNodes, treeRoot, descendantPathNodes[0]);
    visitFunc(childTreeNode);
    if (descendantPathNodes.length > 1) $bff1a0df7235a3e6$export$3aadccf4518ef7f1(childTreeNode.Value, (0, $99bc7ec9b00ad794$exports.ArrayCE)(descendantPathNodes).Skip(1).join("/"), visitFunc, false, _ancestorNodes.concat(childTreeNode));
    return treeRoot;
}
function $bff1a0df7235a3e6$export$bc4bf9529c6d1e83(pathGetterFunc) {
    const funcStr = pathGetterFunc.toString();
    (0, $f9c728f16c05ea72$export$14647bdf767968d3)(!funcStr.includes("["), "Path-getter-func cannot contain bracket-based property-access.");
    /*const pathStr = funcStr.match(/return [^.]+\.(.+?);/)[1] as string;
    //let result = pathStr.replace(/\./g, "/");
    const result = pathStr.split(".");*/ const parts = funcStr.split(".").slice(1); // remove first segment, since it's just the "return xxx." part
    parts[parts.length - 1] = parts[parts.length - 1].match(/^([a-zA-Z0-9_$]+)/)[1]; // remove semicolon (or whatever else) at the end
    return parts;
}
function $bff1a0df7235a3e6$export$4f1af7ef810f3f84(obj, pathOrPathSegments, resultIfNull = null, sepChar = "/") {
    const pathSegments = pathOrPathSegments instanceof Array ? pathOrPathSegments : pathOrPathSegments.split(sepChar);
    let result = obj;
    for (const pathNode of pathSegments){
        if (result == null) break;
        result = result[pathNode];
    }
    if (result == null) return resultIfNull;
    return result;
}
function $bff1a0df7235a3e6$export$e2156189eac50a41(obj, pathOrPathSegments, newValue, sepChar = "/", createPathSegmentsIfMissing = true, deleteUndefined = false) {
    const pathSegments = pathOrPathSegments instanceof Array ? pathOrPathSegments : pathOrPathSegments.split(sepChar);
    let deepObj = obj;
    // tunnel down to the object holding the path-specified prop
    pathSegments.slice(0, -1).forEach((segment)=>{
        if (deepObj[segment] == null) {
            if (createPathSegmentsIfMissing) deepObj[segment] = {};
            else (0, $f9c728f16c05ea72$export$14647bdf767968d3)(false, `The given path (${pathSegments.join("/")}) had a missing segment (${segment}), so the deep-set failed.`);
        }
        deepObj = deepObj[segment];
    });
    if (newValue === undefined && deleteUndefined) delete deepObj[(0, $99bc7ec9b00ad794$exports.ArrayCE)(pathSegments).Last()];
    else deepObj[(0, $99bc7ec9b00ad794$exports.ArrayCE)(pathSegments).Last()] = newValue;
}
function $bff1a0df7235a3e6$export$bcf5b581c956b5fa(baseObj, pathOrPathSegments, newValue, sepChar = "/") {
    const pathSegments = pathOrPathSegments instanceof Array ? pathOrPathSegments : pathOrPathSegments.split(sepChar);
    return Object.assign(Object.assign({}, baseObj), {
        [pathSegments[0]]: pathSegments.length > 1 ? $bff1a0df7235a3e6$export$bcf5b581c956b5fa(baseObj[pathSegments[0]], pathSegments.slice(1), newValue) : newValue
    });
}
function $bff1a0df7235a3e6$export$30cc257513a4c1f9(opt) {
    opt = $bff1a0df7235a3e6$export$a9c23c6ac3fc3eca({
        sourceStackTrace: true
    }, opt);
    //stackTrace = stackTrace || new Error()[sourceStackTrace ? "Stack" : "stack"];
    //stackTrace = stackTrace || (sourceStackTrace ? StackTrace.get().then(stack=>stackTrace = stack.map(a=>a.toString()).join("\n")) : new Error().stack);
    //stackTrace = stackTrace || new Error().stack;
    let stackTrace_final = opt.stackTrace;
    if (stackTrace_final == null) {
        //let fakeError = {}.VAct(a=>Error.captureStackTrace(a));
        let oldStackLimit = Error.stackTraceLimit;
        Error.stackTraceLimit = Infinity;
        let fakeError = new Error();
        stackTrace_final = fakeError.stack;
        Error.stackTraceLimit = oldStackLimit;
    }
    return stackTrace_final.substr((0, $ccace40069512cd2$export$29246bb2b9c16932)(stackTrace_final).IndexOf_X("\n", 1)); // remove "Error" line and first stack-frame (that of this method)
}
function $bff1a0df7235a3e6$export$533e6ca95c54a480(element) {
    //return element.querySelectorAll(":invalid").ToList().map(node=>node.validationMessage || `Invalid value.`);
    return Array.from(element.querySelectorAll(":invalid")).map((node)=>node.validationMessage || `Invalid value.`);
}
function $bff1a0df7235a3e6$export$411ccbe87c4513c2(name) {
    if (typeof Symbol != "undefined") return Symbol(name);
    //return `FakeSymbol(${name})`;
    // match how real Symbols get stringified, so we can always do, eg. DEL.toString() to send over network, for end-points that accept it using: baseData.VSet(sentData, {allowStringOperators: true})
    return `Symbol(${name})`;
}
const $bff1a0df7235a3e6$export$1b08f5ea83f6211 = $bff1a0df7235a3e6$export$411ccbe87c4513c2("$JSVE_SYMBOL_OMIT");
const $bff1a0df7235a3e6$export$9f9ab71c6638c203 = $bff1a0df7235a3e6$export$411ccbe87c4513c2("$JSVE_SYMBOL_DELETE");
function $bff1a0df7235a3e6$export$fc3567b3039ba9df(value) {
    if (!value) return $bff1a0df7235a3e6$export$1b08f5ea83f6211;
    return value;
}
function $bff1a0df7235a3e6$export$8db297e935fdd042(value) {
    if (value == null) return $bff1a0df7235a3e6$export$1b08f5ea83f6211;
    return value;
}
function $bff1a0df7235a3e6$export$68e92fc7ec844832(value) {
    if (!value) return $bff1a0df7235a3e6$export$9f9ab71c6638c203;
    return value;
}
function $bff1a0df7235a3e6$export$3b8cbed979be143c(value) {
    if (value == null) return $bff1a0df7235a3e6$export$9f9ab71c6638c203;
    return value;
}
function $bff1a0df7235a3e6$export$e1ada73b308fc38c(selector) {
    return document.querySelector(selector);
}
function $bff1a0df7235a3e6$export$bb0e8bec5320aa32(selector) {
    return Array.from(document.querySelectorAll(selector));
}
const $bff1a0df7235a3e6$export$e8d0214a5967392b = {
    // bi-directional
    // ==========
    // start letter, change case
    /** some prop name -> Some prop name */ startLower_to_upper: (str)=>str.replace(/^./, (a)=>a.toUpperCase()),
    /** Some prop name -> some prop name */ startUpper_to_lower: (str)=>str.replace(/^./, (a)=>a.toLowerCase()),
    // space letter, change case
    /** some prop name -> some Prop Name */ spaceLower_to_spaceUpper: (str)=>str.replace(/ ([a-z])/g, (m, sub1)=>` ${sub1.toUpperCase()}`),
    /** Some Prop Name -> Some prop name */ spaceUpper_to_spaceLower: (str)=>str.replace(/ ([A-Z])/g, (m, sub1)=>` ${sub1.toLowerCase()}`),
    // hyphen letter, change case
    /** some-prop-name -> some-Prop-Name */ hyphenLower_to_hyphenUpper: (str)=>str.replace(/-([a-z])/g, (m, sub1)=>`-${sub1.toUpperCase()}`),
    /** Some-Prop-Name -> Some-prop-name */ hyphenUpper_to_hyphenLower: (str)=>str.replace(/-([A-Z])/g, (m, sub1)=>`-${sub1.toLowerCase()}`),
    // underscore letter, change case
    /** some_prop_name -> some_Prop_Name */ underscoreLower_to_underscoreUpper: (str)=>str.replace(/_([a-z])/g, (m, sub1)=>`_${sub1.toUpperCase()}`),
    /** Some_Prop_Name -> Some_prop_name */ underscoreUpper_to_underscoreLower: (str)=>str.replace(/_([A-Z])/g, (m, sub1)=>`_${sub1.toLowerCase()}`),
    // one-directional
    // ==========
    /** somePropName -> some prop name */ lowerUpper_to_lowerSpaceLower: (str)=>str.replace(/([a-z])([A-Z])/g, (m, sub1, sub2)=>`${sub1} ${sub2.toLowerCase()}`),
    /** some prop Name -> somepropName */ removeSpaces: (str)=>str.replace(/ /g, (m, sub1)=>""),
    /** some-prop-Name -> somepropName */ removeHyphens: (str)=>str.replace(/-/g, (m, sub1)=>"")
};
function $bff1a0df7235a3e6$export$c35569273ccf4ab4(text, modifiersGetter) {
    let result = text;
    const chosenModifiers = modifiersGetter($bff1a0df7235a3e6$export$e8d0214a5967392b);
    for (const mod of chosenModifiers)result = mod(result);
    return result;
}
function $bff1a0df7235a3e6$export$8a726c765cc5232c(content, filename, dataTypeStr = "data:application/octet-stream,", encodeContentAsURIComp = true) {
    var link = document.createElement("a");
    Object.assign(link.style, {
        display: "none"
    });
    link.innerText = "Save to disk";
    if (content instanceof Blob) // todo: make sure this works correctly, even for different data-types (since data-type args are ignored if Blob supplied)
    link.setAttribute("href", URL.createObjectURL(content));
    else link.setAttribute("href", dataTypeStr + (encodeContentAsURIComp ? encodeURIComponent(content) : content));
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
}
function $bff1a0df7235a3e6$export$1c6a98c9e3d60353() {
    return new Promise((resolve)=>{
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.style.display = "none";
        fileInput.onchange = (e21)=>{
            var file = e21.target["files"][0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = (e)=>{
                var contents = e.target["result"];
                //Assert(typeof contents == "string")
                resolve(contents);
            };
            reader.readAsText(file);
        };
        document.body.appendChild(fileInput);
        fileInput.click();
    });
}
function $bff1a0df7235a3e6$export$f72021c7be7f8b3f(target, source, descriptorBase, descriptorOverride) {
    //for (let [name, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(source))) {
    for (const name of Object.getOwnPropertyNames(source)){
        if (name == "constructor") continue;
        const descriptor = Object.getOwnPropertyDescriptor(source, name);
        Object.defineProperty(target, name, Object.assign(Object.assign(Object.assign({}, descriptorBase), descriptor), descriptorOverride));
    }
}
function $bff1a0df7235a3e6$export$53cef6071e892014(source) {
    const result = {};
    for (const key of Object.getOwnPropertyNames(source)){
        if (key == "constructor") continue; // no reason to call the wrapper's constructor
        const descriptor = Object.getOwnPropertyDescriptor(source, key);
        const newDescriptor = Object.assign({}, descriptor);
        if (descriptor.value instanceof Function) {
            const oldFunc = descriptor.value;
            newDescriptor.value = (thisArg, ...callArgs)=>{
                return oldFunc.apply(thisArg, callArgs);
            };
        }
        Object.defineProperty(result, key, newDescriptor);
    }
    return result;
}
function $bff1a0df7235a3e6$export$f763809ea8d02d39(sourceClass_prototype) {
    // proxy approach; nicer, but I don't like potential slowdown from creating new proxy each time a class-extension method is called!
    /*return (thisArg: any)=> {
        return new Proxy({}, {
            get(target, key, receiver?) {
                if (key == "constructor") return Reflect.get(target, key, receiver); // no reason to call the wrapper's constructor
                let descriptor = Object.getOwnPropertyDescriptor(sourceClass.prototype, key);
                if (descriptor.value instanceof Function) {
                    let oldFunc = descriptor.value as Function;
                    return (...callArgs)=> {
                        return oldFunc.apply(thisArg, callArgs);
                    };
                }
            }
        //}) as T;
        }) as WithFuncThisArgsAsAny_Type<T>;
    };*/ // Static proxy approach -- a bit faster since it doesn't create any functions, closures, or proxies per wrap/CE-method-call.
    //	(Limitation: you can't store the result of "ObjectCE(something)" and call a method attached to it more than once, since each method-call removes the supplied this-arg from the stack.)
    /*let proxy = {} as any;
    const thisArgStack = [];*/ const proxy = {};
    const thisArgStack = [];
    for (const key of Object.getOwnPropertyNames(sourceClass_prototype)){
        if (key == "constructor") continue; // no reason to call the wrapper's constructor
        const descriptor = Object.getOwnPropertyDescriptor(sourceClass_prototype, key);
        const newDescriptor = Object.assign({}, descriptor);
        if (descriptor.value instanceof Function) {
            const oldFunc = descriptor.value;
            newDescriptor.value = (...callArgs)=>{
                const thisArg = thisArgStack[thisArgStack.length - 1];
                try {
                    var result = oldFunc.apply(thisArg, callArgs);
                } finally{
                    // ensure that stack-entry is removed at end; else error in func would make the stack invalid (ie. left with a "dangling stack-entry")
                    //thisArgStack.length--;
                    thisArgStack.splice(thisArgStack.length - 1, 1);
                }
                return result;
            };
        }
        Object.defineProperty(proxy, key, newDescriptor);
    }
    //return (nextThis: any)=> {
    return (nextThis)=>{
        thisArgStack.push(nextThis);
        return proxy;
    };
}
const $bff1a0df7235a3e6$export$32231771d94c08dd = [
    // Set and Map are included by default, since JSON.stringify tries (and fails) to serialize them by default
    {
        type: Set,
        keys: (a)=>a.keys(),
        get: (a, key)=>key,
        delete: (a, key)=>a.delete(key)
    },
    {
        type: Map,
        keys: (a)=>a.keys(),
        get: (a, key)=>a.get(key),
        delete: (a, key)=>a.set(key, undefined)
    }, 
];
function $bff1a0df7235a3e6$export$ddf2041d52180b99(node, specialTypeHandlers = $bff1a0df7235a3e6$export$32231771d94c08dd, nodeStack_set = new Set()) {
    nodeStack_set.add(node);
    const specialHandler = specialTypeHandlers.find((a)=>node instanceof a.type);
    for (const key of specialHandler ? specialHandler.keys(node) : Object.keys(node)){
        const value = specialHandler ? specialHandler.get(node, key) : node[key];
        // if the value is already part of visited-stack, delete the value (and don't tunnel into it)
        if (nodeStack_set.has(value)) {
            if (specialHandler) specialHandler.delete(node, key);
            else node[key] = undefined;
        } else if (typeof value == "object" && value != null) $bff1a0df7235a3e6$export$ddf2041d52180b99(value, specialTypeHandlers, nodeStack_set);
    }
    nodeStack_set.delete(node);
}




var $99bc7ec9b00ad794$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const $99bc7ec9b00ad794$export$72a5a0cefa79407 = {
    ForEach (func) {
        for(let i = 0; i < this.length; i++){
            const controlOp = func(this[i], i, this);
            if (controlOp == "break") break;
            if (controlOp == "continue") continue;
            if (controlOp instanceof Array) return controlOp[1];
        }
    },
    ForEachAsync (func) {
        return $99bc7ec9b00ad794$var$__awaiter(this, void 0, void 0, function*() {
            for(let i = 0; i < this.length; i++){
                const controlOp = yield func(this[i], i, this);
                if (controlOp == "break") break;
                if (controlOp == "continue") continue;
                if (controlOp instanceof Array) return controlOp[1];
            }
        });
    },
    /*declare global { interface Array<T> { ForEachAsyncParallel(func: (value: T, index: number, array: T[])): Promise<void>; } }
    Array.prototype.ForEachAsync_Parallel = async function (this: Array<any>, fn) {
        await Promise.all(this.map(fn));
    },*/ Contains (item) {
        return this.indexOf(item) != -1;
    },
    ContainsAny (...items) {
        for (const item of items){
            if (this.indexOf(item) != -1) return true;
        }
        return false;
    },
    // for some reason, this platform doesn't have entries() defined
    /*entries() {
        var result = [];
        for (var i = 0; i < this.length; i++)
            result.push([i, this[i]]);
        return result;
    };*/ Prepend (...newItems) {
        this.splice(0, 0, ...newItems);
    },
    Add (item) {
        return this.push(item);
    },
    CAdd (item) {
        this.push(item);
        return this;
    },
    TAdd (item) {
        this.push(item);
        return item;
    },
    AddRange (array) {
        //this.push(...array);
        // use loop, since sending them all as arguments fails when there are ~10000+ items
        for (const item of array)this.push(item);
        return this;
    },
    Remove (item) {
        var itemIndex = this.indexOf(item);
        if (itemIndex == -1) return false;
        this.splice(itemIndex, 1);
        return true;
    },
    RemoveAll (items) {
        for (let item of items)$99bc7ec9b00ad794$export$a13380f20101451f.Remove(this, item);
    },
    RemoveAt (index) {
        return this.splice(index, 1)[0];
    },
    Insert (index, obj) {
        this.splice(index, 0, obj);
    },
    SetItems (items) {
        this.splice(0, this.length, ...items);
        return this;
    },
    Reversed () {
        var clone = this.slice();
        clone.reverse();
        return clone;
    },
    //Object.prototype._AddFunction_Inline = function AsRef() { return new NodeReference_ByPath(this); }
    // Linq replacements
    // ----------
    Any (matchFunc) {
        for (let [index, item] of this.entries()){
            if (matchFunc == null || matchFunc.call(item, item, index)) return true;
        }
        return false;
    },
    All (matchFunc) {
        for (let [index, item] of this.entries()){
            if (!matchFunc.call(item, item, index)) return false;
        }
        return true;
    },
    Where (matchFunc) {
        var result = [];
        for (let [index, item] of this.entries())if (matchFunc.call(item, item, index)) result.push(item);
        return result;
    },
    Select (selectFunc) {
        var result = [];
        for (let [index, item] of this.entries())result.push(selectFunc.call(item, item, index));
        return result;
    },
    SelectMany (selectFunc) {
        //return [...this.entries()].reduce((acc, [index, item])=>acc.concat(selectFunc.call(item, item, index)), []);
        var result = [];
        for (let [index, item] of this.entries())$99bc7ec9b00ad794$export$a13380f20101451f.AddRange(result, selectFunc.call(item, item, index));
        return result;
    },
    //Count(matchFunc) { return this.Where(matchFunc).length; };
    //Count(matchFunc) { return this.Where(matchFunc).length; }; // needed for items to be added properly to custom classes that extend Array
    // needed for items to be added properly to custom classes that extend Array
    Count () {
        return this.length;
    },
    VCount (matchFunc) {
        return $99bc7ec9b00ad794$export$a13380f20101451f.Where(this, matchFunc).length;
    },
    Clear () {
        /*while (this.length > 0)
            this.pop();*/ this.splice(0, this.length);
    },
    First (matchFunc) {
        // todo: maybe change this to check matchFunc for each index, rather than checking "=== undefined"
        var result = $99bc7ec9b00ad794$export$a13380f20101451f.FirstOrX(this, matchFunc);
        if (result == null) throw new Error("Matching item not found.");
        return result;
    },
    FirstOrX (matchFunc, x) {
        if (matchFunc) for (let [index, item] of this.entries()){
            if (matchFunc.call(item, item, index)) return item;
        }
        else if (this.length > 0) return this[0];
        return x;
    },
    //FirstWithPropValue(propName, propValue) { return this.Where(function() { return this[propName] == propValue; })[0]; };
    FirstWith (propName, propValue) {
        return $99bc7ec9b00ad794$export$a13380f20101451f.Where(this, function() {
            return this[propName] == propValue;
        })[0];
    },
    Last (matchFunc) {
        var result = $99bc7ec9b00ad794$export$a13380f20101451f.LastOrX(this, matchFunc);
        if (result === undefined) throw new Error("Matching item not found.");
        return result;
    },
    LastOrX (matchFunc, x) {
        if (matchFunc) for(var i = this.length - 1; i >= 0; i--){
            if (matchFunc.call(this[i], this[i], i)) return this[i];
        }
        else if (this.length > 0) return this[this.length - 1];
        return x;
    },
    XFromLast (x) {
        return this[this.length - 1 - x];
    },
    Move (item, newIndex, /** Makes-so newIndex is the final index, even if after original/removal index. Default: true */ removeBeforeInsert = true) {
        var oldIndex = this.indexOf(item);
        /*if (oldIndex != -1) {
            this.RemoveAt(oldIndex);
            // New-index is understood to be the position-in-list to move the item to, as seen before the item started being moved.
            // So compensate for remove-from-old-position list modification.
            if (shiftInsertPointToPreserveFinalNeighbors && oldIndex < newIndex) {
                newIndex--;
            }
        }
        this.Insert(newIndex, item);*/ if (removeBeforeInsert) {
            if (oldIndex != -1) $99bc7ec9b00ad794$export$a13380f20101451f.RemoveAt(this, oldIndex);
            $99bc7ec9b00ad794$export$a13380f20101451f.Insert(this, newIndex, item);
        } else {
            $99bc7ec9b00ad794$export$a13380f20101451f.Insert(this, newIndex, item);
            if (oldIndex != -1) {
                let oldEntry_currentIndex = newIndex <= oldIndex ? oldIndex + 1 : oldIndex; // if we just inserted the new version before the old entry, fix the old-entry's index by adding 1
                $99bc7ec9b00ad794$export$a13380f20101451f.RemoveAt(this, oldEntry_currentIndex);
            }
        }
        return oldIndex;
    },
    ToMap (keyFunc, valFunc) {
        const result = new Map();
        for (let [index, item] of this.entries())result.set(keyFunc(item, index), valFunc(item, index));
        return result;
    },
    ToMapObj (keyFunc, valFunc) {
        const result = {};
        for (let [index, item] of this.entries())result[keyFunc(item, index)] = valFunc(item, index);
        return result;
    },
    Skip (count) {
        var result = [];
        for(let i = count; i < this.length; i++)result.push(this[i]);
        return result;
    },
    Take (count) {
        var result = [];
        for(let i = 0; i < count && i < this.length; i++)result.push(this[i]);
        return result;
    },
    TakeLast (count) {
        var result = [];
        for(var i = 0; i < count && this.length - 1 - i >= 0; i++)result.push(this[this.length - 1 - i]);
        return result;
    },
    FindIndex (matchFunc) {
        for (let [index, item] of this.entries()){
            if (matchFunc.call(item, item, index)) return index;
        }
        return -1;
    },
    /*FindIndex(matchFunc: (item: T)=>boolean) {
        for (let [index, item] of this.entries())
            if (matchFunc.call(item, item))
                    return index;
        return -1;
    };*/ OrderBy (valFunc = (item, index)=>item) {
        /*var temp = this.ToList();
        temp.sort((a, b)=>V.Compare(valFunc(a), valFunc(b)));
        return temp;*/ return (0, $bff1a0df7235a3e6$export$76818b28a78bf127)(this, (a, b, aIndex, bIndex)=>(0, $bff1a0df7235a3e6$export$2c1d9c1fe3e6577a)(valFunc(a, aIndex), valFunc(b, bIndex)));
    },
    OrderByDescending (valFunc = (item, index)=>item) {
        //return ArrayCES.OrderBy(this, (item: T, index)=>-valFunc(item, index)) as T[];
        return (0, $bff1a0df7235a3e6$export$76818b28a78bf127)(this, (a, b, aIndex, bIndex)=>-(0, $bff1a0df7235a3e6$export$2c1d9c1fe3e6577a)(valFunc(a, aIndex), valFunc(b, bIndex)));
    },
    Distinct () {
        /*const result: T[] = [];
        /*for (const i in this) {
            if (!this.hasOwnProperty(i)) continue;*#/
        for (let i = 0; i < this.length; i++) {
            if (!ArrayCES.Contains(result, this[i])) {
                result.push(this[i]);
            }
        }
        return result;*/ const setWithItems = new Set(this);
        return [
            ...setWithItems
        ];
    },
    Include (...includeItems) {
        return this.filter((a)=>includeItems.indexOf(a) != -1);
    },
    Exclude: function(...args) {
        let opt, excludeItems;
        if ((0, $558beaa9e91cc3f5$export$e64f6626d4e96cfb)(args[0]) && "excludeEachOnlyOnce" in args[0]) [opt, ...excludeItems] = args;
        else excludeItems = args;
        if (opt === null || opt === void 0 ? void 0 : opt.excludeEachOnlyOnce) {
            const result = this.slice();
            for (const excludeItem of excludeItems)$99bc7ec9b00ad794$export$a13380f20101451f.Remove(result, excludeItem);
            return result;
        }
        return this.filter((a)=>excludeItems.indexOf(a) == -1);
    },
    IfEmptyThen (valIfSelfIsEmpty) {
        return this.length == 0 ? valIfSelfIsEmpty : this;
    },
    //JoinUsing(separator) { return this.join(separator);};
    Min (valFunc, asNumbers = false) {
        // only set asNumbers to true if providing a number[] array
        if (asNumbers) {
            /*const values = valFunc ? this.map(valFunc) : this;
            return Math.min(...values);*/ (0, $f9c728f16c05ea72$export$14647bdf767968d3)(valFunc == null, "Cannot use valFunc if asNumbers is set to true.");
            return Math.min(...this);
        }
        return $99bc7ec9b00ad794$export$a13380f20101451f.OrderBy(this, valFunc)[0];
    },
    Max (valFunc, asNumbers = false) {
        // only set asNumbers to true if providing a number[] array
        if (asNumbers) {
            /*const values = valFunc ? this.map(valFunc) : this;
            return Math.max(...values);*/ (0, $f9c728f16c05ea72$export$14647bdf767968d3)(valFunc == null, "Cannot use valFunc if asNumbers is set to true.");
            return Math.max(...this);
        }
        return $99bc7ec9b00ad794$export$a13380f20101451f.LastOrX($99bc7ec9b00ad794$export$a13380f20101451f.OrderBy(this, valFunc));
    },
    Sum () {
        let total = 0;
        for (const item of this)total += item;
        return total;
    },
    Average () {
        const total = $99bc7ec9b00ad794$export$a13380f20101451f.Sum(this);
        return total / this.length;
    },
    Median () {
        const ordered = $99bc7ec9b00ad794$export$a13380f20101451f.OrderBy(this, (a)=>a);
        if (this.length % 2 == 0) return ordered[this.length / 2 - 1] + ordered[this.length / 2];
        return ordered[this.length / 2]; // otherwise, return the exactly-middle one
    },
    Random () {
        let index = Math.floor(Math.random() * this.length);
        return this[index];
    },
    //oldJoin: [].join,
    Join (separator = ",") {
        if (this.length == 0) return "";
        //let result = "" + this[0];
        let result = this[0] != null ? "" + this[0] : ""; // to match behavior of native join
        for(var i = 1, len = this.length; i < len; i++){
            result += separator;
            result += this[i] != null ? "" + this[i] : "";
        }
        /*let oldResult = oldJoin.apply(this, arguments);
        if (oldResult != result) debugger;*/ return result;
    }
};
const $99bc7ec9b00ad794$export$f35d492e63fcc0d6 = (0, $bff1a0df7235a3e6$export$f763809ea8d02d39)($99bc7ec9b00ad794$export$72a5a0cefa79407);
const $99bc7ec9b00ad794$export$a13380f20101451f = (0, $bff1a0df7235a3e6$export$53cef6071e892014)($99bc7ec9b00ad794$export$72a5a0cefa79407); /*var ArrayIterator = [].entries().constructor;
export class ArrayIteratorCEProxy {
    ToArray(this: ArrayIterator) {
        return Array.from(this);
    }
}
export const ArrayIteratorCE = CreateProxyForClassExtensions(ArrayIteratorCEProxy);*/  /*export class NodeListCEProxy {
    ToArray(this: NodeList) {
        return Array.from(this);
    }
}
export const NodeListCE = CreateProxyForClassExtensions(NodeListCEProxy);*/ 



const $bd9b41eda58071dd$export$19a175b10b1c06c7 = {
    GetParents (topDown = false) {
        const result = [];
        let currentParent = this.parentElement;
        while(currentParent){
            result.push(currentParent);
            currentParent = currentParent.parentElement;
        }
        if (topDown) result.reverse();
        return result;
    },
    GetSelfAndParents (topDown = false) {
        const result = $bd9b41eda58071dd$export$ea432ebb9d598fdf(this).GetParents(topDown);
        return topDown ? result.concat([
            this
        ]) : [
            this
        ].concat(result);
    },
    /*QuerySelectorAll_BreadthFirst(this: HTMLElement, selector: string) {
        var $found = [];
        let currentSet = this.childNodes.ToArray();
        while (currentSet.length) {
            let found = currentSet.filter(a=>a.matches(selector));
            if ($found.length) break;
            // Get all children of the current set
            $currentSet = $currentSet.children();
        }
        return $found.first(); // Return first match of the collection
    }*/ QuerySelector_BreadthFirst (selector) {
        let currentLayerElements = Array.from(this.childNodes);
        while(currentLayerElements.length){
            const firstMatchInLayer = currentLayerElements.find((a)=>a["matches"] && a["matches"](selector));
            if (firstMatchInLayer) return firstMatchInLayer;
            //currentLayerElements = currentLayerElements.SelectMany(a=>[...a.childNodes]);
            currentLayerElements = currentLayerElements.reduce((acc, item)=>acc.concat(Array.from(item.childNodes)), []);
        }
        return null;
    },
    $ (queryStr) {
        return Array.from(this.querySelectorAll(queryStr));
    }
};
const $bd9b41eda58071dd$export$ea432ebb9d598fdf = (0, $bff1a0df7235a3e6$export$f763809ea8d02d39)($bd9b41eda58071dd$export$19a175b10b1c06c7);
const $bd9b41eda58071dd$export$1b554c4d1e64c51 = (0, $bff1a0df7235a3e6$export$53cef6071e892014)($bd9b41eda58071dd$export$19a175b10b1c06c7);




const $ccace40069512cd2$export$bb2eea53898a038 = {
    TrimStart (...chars) {
        // fix for if called by VDF (which has a different signature)
        //if (arguments[0] instanceof Array) chars = arguments[0];
        for(var iOfFirstToKeep = 0; iOfFirstToKeep < this.length && (0, $99bc7ec9b00ad794$exports.ArrayCE)(chars).Contains(this[iOfFirstToKeep]); iOfFirstToKeep++);
        return this.slice(iOfFirstToKeep, this.length);
    },
    TrimEnd (...chars) {
        for(var iOfLastToKeep = this.length - 1; iOfLastToKeep >= 0 && (0, $99bc7ec9b00ad794$exports.ArrayCE)(chars).Contains(this[iOfLastToKeep]); iOfLastToKeep--);
        return this.substr(0, iOfLastToKeep + 1);
    },
    Contains (str, startIndex) {
        return this.indexOf(str, startIndex) !== -1;
    },
    hashCode () {
        var hash = 0;
        for(var i = 0; i < this.length; i++){
            var char = this.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // convert to 32-bit integer
        }
        return hash;
    },
    Matches (strOrRegex) {
        let result = [];
        if (typeof strOrRegex == "string") {
            let str = strOrRegex;
            let lastMatchIndex = -1;
            while(true){
                let matchIndex = this.indexOf(str, lastMatchIndex + 1);
                if (matchIndex == -1) break; // if another match was not found
                const entry = [
                    this.slice(matchIndex, matchIndex + str.length)
                ];
                // use defineProperties, so they're non-enumerable (and so don't show if the match is passed to console.log)
                Object.defineProperties(entry, {
                    index: {
                        value: matchIndex
                    },
                    input: {
                        value: this.toString()
                    }
                });
                result.push(entry);
                lastMatchIndex = matchIndex;
            }
        } else {
            let regex = strOrRegex;
            if (!regex.global) //throw new Error("Regex must have the 'g' flag added. (otherwise an infinite loop occurs)");
            regex = new RegExp(regex.source, regex.flags + "g");
            let match;
            while(match = regex.exec(this))result.push(match);
        }
        return result;
    },
    /*matches_group(regex, /*o:*#/ groupIndex) {
        if (!regex.global)
            throw new Error("Regex must have the 'g' flag added. (otherwise an infinite loop occurs)");

        groupIndex = groupIndex || 0; // default to the first capturing group
        var matches = [];
        var match;
        while (match = regex.exec(this))
            matches.push(match[groupIndex]);
        return matches;
    }*/ /** indexX is 0-based */ IndexOf_X (str, indexX) {
        var currentPos = -1;
        for(var i = 0; i <= indexX; i++){
            var subIndex = this.indexOf(str, currentPos + 1);
            if (subIndex == -1) return -1; // no such xth index
            currentPos = subIndex;
        }
        return currentPos;
    },
    /** indexFromLastX is 0-based */ IndexOf_XFromLast (str, indexFromLastX) {
        var currentPos = this.length - str.length + 1; // index just after the last-index-where-match-could-occur
        for(var i = 0; i <= indexFromLastX; i++){
            var subIndex = this.lastIndexOf(str, currentPos - 1);
            if (subIndex == -1) return -1; // no such xth index
            currentPos = subIndex;
        }
        return currentPos;
    },
    IndexOfAny (...strings) {
        var lowestIndex = -1;
        for (let str of strings){
            var indexOfChar = this.indexOf(str);
            if (indexOfChar != -1 && (indexOfChar < lowestIndex || lowestIndex == -1)) lowestIndex = indexOfChar;
        }
        return lowestIndex;
    },
    LastIndexOfAny (...strings) {
        var highestIndex = -1;
        for (let str of strings){
            var indexOfChar = this.lastIndexOf(str);
            if (indexOfChar > highestIndex) highestIndex = indexOfChar;
        }
        return highestIndex;
    },
    StartsWithAny (...strings) {
        return (0, $99bc7ec9b00ad794$exports.ArrayCE)(strings).Any((str)=>this.startsWith(str));
    },
    EndsWithAny (...strings) {
        return (0, $99bc7ec9b00ad794$exports.ArrayCE)(strings).Any((str)=>this.endsWith(str));
    },
    ContainsAny (...strings) {
        return (0, $99bc7ec9b00ad794$exports.ArrayCE)(strings).Any((str)=>$ccace40069512cd2$export$29246bb2b9c16932(this).Contains(str));
    },
    /** Separator-strings must be escaped. (they're passed into a regular-expression) */ SplitByAny (...separators) {
        /*var splitStr = "/";
        for (let sep of separators)
            splitStr += (splitStr.length > 1 ? "|" : "") + sep;
        splitStr += "/";
        return this.split(splitStr);*/ let regex = new RegExp(separators.map((a)=>`\\${a}`).join("|"));
        return this.split(regex);
    },
    SplitAt (index, includeCharAtIndex = false) {
        if (index == -1) return [
            "",
            this
        ];
        let part1 = this.substr(0, index);
        let part2 = includeCharAtIndex ? this.substr(index) : this.substr(index + 1);
        return [
            part1,
            part2
        ];
    },
    Splice (index, removeCount, insert) {
        return this.slice(0, index) + insert + this.slice(index + Math.abs(removeCount));
    },
    Indent (indentCount) {
        var indentStr = "	".repeat(indentCount);
        return this.replace(/^|(\n)/g, "$1" + indentStr);
    },
    KeepAtMost (maxLength, moreMarkerStr = "...") {
        if (this.length <= maxLength) return this;
        return this.substr(0, maxLength - moreMarkerStr.length) + moreMarkerStr;
    },
    // for firebase entry keys
    /*interface String { readonly KeyToInt: number; }
    String.prototype._AddGetter_Inline = function KeyToInt() {
        return parseInt((this as string).substr(1));
    }
    interface Number { readonly IntToKey: string; }
    Number.prototype._AddGetter_Inline = function IntToKey() {
        return "e" + this;
    }*/ /** Creates a function from "func", setting its name to the "this" string's value. */ Func (func) {
        func.SetName(this);
        return func;
    },
    // special; creates a function with the given name, but also caches it per caller-line,
    //   so every call from that line returns the same function instance
    // REMOVED, because: we need to create new funcs to capture new closure values
    /*var oneFuncCache = {};
    OneFunc(func) {
        var funcName = this;
        var callerLineStr = new Error().stack.split("\n")[3];
        var funcKey = `${funcName}@${callerLineStr}`;
        if (oneFuncCache[funcKey] == null) {
            func.SetName(this);
            //func.cached = true;
            oneFuncCache[funcKey] = func;
        }
        return oneFuncCache[funcKey];
    }*/ /**
     * Reformats a multi-line string to represent the actual intended "block" of text.
     * @param desiredIndent How much to indent each line. (after removal of the first-non-empty-line indent-length from each of them)
     * @param removeLineStr A special string which, if found in a line, will cause that line to be removed from the result.
     */ AsMultiline (desiredIndent, removeLineStr = "@RL") {
        var _a, _b;
        let result = this.substring(this.indexOf("\n") + 1, this.lastIndexOf("\n"));
        if (desiredIndent != null) {
            let lines = result.split("\n");
            let firstLineIndent = (_b = (_a = result.match(/^(\t+)/)) === null || _a === void 0 ? void 0 : _a[1].length) !== null && _b !== void 0 ? _b : 0;
            if (firstLineIndent) // remove X tabs from start of each line (where X is firstLineIndent)
            lines = lines.map((line)=>line.replace(new RegExp(`^\t{0,${firstLineIndent}}`), ""));
            // add the desired indent
            lines = lines.map((line)=>"	".repeat(desiredIndent) + line);
            // filter out lines with the special remove-line string
            lines = lines.filter((a)=>!a.includes(removeLineStr));
            result = lines.join("\n");
        }
        return result;
    },
    Substring (start, end) {
        if (end < 0) end = this.length + end;
        return this.substring(start, end);
    },
    ToInt () {
        return parseInt(Number(this) + "");
    },
    ToFloat () {
        return Number(this);
    }
};
const $ccace40069512cd2$export$29246bb2b9c16932 = (0, $bff1a0df7235a3e6$export$f763809ea8d02d39)($ccace40069512cd2$export$bb2eea53898a038);
const $ccace40069512cd2$export$ad49d0f74ed9c55d = (0, $bff1a0df7235a3e6$export$53cef6071e892014)($ccace40069512cd2$export$bb2eea53898a038);




const $80186945e8d52e55$export$fcc2d19719f79415 = {
    IfN1Then (valIfSelfIsNeg1) {
        return this == -1 ? valIfSelfIsNeg1 : this;
    },
    NaNTo (valIfSelfIsNaN) {
        return (0, $558beaa9e91cc3f5$export$f375b07b95af9a54)(this) ? valIfSelfIsNaN : this;
    },
    //RoundToMultipleOf(step) { return Math.round(new Number(this) / step) * step; }; //return this.lastIndexOf(str, 0) === 0; };
    ToPercent (roundTo_multiple = 1) {
        return $80186945e8d52e55$export$533f863946f77204.RoundTo(this * 100, roundTo_multiple);
    },
    FromPercent () {
        return this / 100;
    },
    ToPercentStr (/** The number of digits after the decimal point. Example: (.12345).ToPercentStr(1) == "12.3%" */ precision) {
        const number = this * 100;
        if (precision != null) return `${number.toFixed(precision)}%`;
        return `${number.toString()}%`;
    },
    IsMultipleOf (multipleOf, maxDistToBeMultiple) {
        const valRoundedToMultiple = $80186945e8d52e55$export$caa4dfc7169288b7(this).RoundTo(multipleOf);
        const distance = $80186945e8d52e55$export$caa4dfc7169288b7(valRoundedToMultiple).Distance(this);
        return distance <= maxDistToBeMultiple;
    },
    RoundTo (multiple) {
        //return Math.round(this / multiple) * multiple;
        // Don't ask me why this works, but it does, and is faster. From: http://phrogz.net/round-to-nearest-via-modulus-division
        /*var half = multiple / 2;
        return (this + half) - ((this + half) % multiple);*/ // Realign/scale the possible values/multiples, so that each value is given an integer slot. Place the actual value (this) within the appropriate slot using Math.round() int-rounding, then reverse the scaling to get the true rounded value.
        // (This version handles fractions better. Ex: (.2 + .1).RoundTo(.1) == .3 [NOT 0.3000000000000004, as the simpler approach gives])
        const multiple_inverted = 1 / multiple;
        return Math.round(this * multiple_inverted) / multiple_inverted;
    },
    RoundTo_Str (multipleOf, fractionDigits, removeEmptyFraction = true) {
        var resultValue = $80186945e8d52e55$export$caa4dfc7169288b7(this).RoundTo(multipleOf);
        var result = resultValue.toFixed(fractionDigits != null ? fractionDigits : (0, $ccace40069512cd2$export$29246bb2b9c16932)(multipleOf.toString()).TrimStart("0").length - 1); // - 0);
        if (removeEmptyFraction && (0, $ccace40069512cd2$export$29246bb2b9c16932)(result).Contains(".")) result = (0, $ccace40069512cd2$export$29246bb2b9c16932)((0, $ccace40069512cd2$export$29246bb2b9c16932)(result).TrimEnd("0")).TrimEnd(".");
        return result;
    },
    FloorTo (multipleOf) {
        return Math.floor(new Number(this) / multipleOf) * multipleOf;
    },
    FloorTo_Str (multipleOf) {
        var resultValue = $80186945e8d52e55$export$caa4dfc7169288b7(this).FloorTo(multipleOf);
        var result = resultValue.toFixed((0, $ccace40069512cd2$export$29246bb2b9c16932)(multipleOf.toString()).TrimStart("0").length); // - 1);
        if ((0, $ccace40069512cd2$export$29246bb2b9c16932)(result).Contains(".")) result = (0, $ccace40069512cd2$export$29246bb2b9c16932)((0, $ccace40069512cd2$export$29246bb2b9c16932)(result).TrimEnd("0")).TrimEnd(".");
        return result;
    },
    CeilingTo (multipleOf) {
        return Math.ceil(new Number(this) / multipleOf) * multipleOf;
    },
    CeilingTo_Str (multipleOf) {
        var resultValue = $80186945e8d52e55$export$caa4dfc7169288b7(this).CeilingTo(multipleOf);
        var result = resultValue.toFixed(multipleOf.toString().TrimStart("0").length); // - 1);
        if ((0, $ccace40069512cd2$export$29246bb2b9c16932)(result).Contains(".")) result = (0, $ccace40069512cd2$export$29246bb2b9c16932)((0, $ccace40069512cd2$export$29246bb2b9c16932)(result).TrimEnd("0")).TrimEnd(".");
        //result = TrimEnd(TrimEnd(result, "0"), ".");
        return result;
    },
    KeepAtLeast (min) {
        return Math.max(min, this);
    },
    KeepAtMost (max) {
        return Math.min(max, this);
    },
    IsBetween (min, max, allowFixMinMax = true) {
        if (min > max && allowFixMinMax) [min, max] = [
            max,
            min
        ];
        return this >= min && this <= max;
    },
    KeepBetween (min, max, allowFixMinMax = true) {
        if (min > max && allowFixMinMax) [min, max] = [
            max,
            min
        ];
        if (this < min) return min;
        if (this > max) return max;
        return this;
    },
    WrapToRange (min, max, maxOut = true) {
        let val = this;
        const size = max - min;
        while(val < min)val += size;
        while(maxOut ? val >= max : val > max)val -= size;
        return val;
    },
    Distance (other) {
        return Math.abs(this - other);
    },
    ToPower (power) {
        return Math.pow(this, power);
    }
};
const $80186945e8d52e55$export$caa4dfc7169288b7 = (0, $bff1a0df7235a3e6$export$f763809ea8d02d39)($80186945e8d52e55$export$fcc2d19719f79415);
const $80186945e8d52e55$export$533f863946f77204 = (0, $bff1a0df7235a3e6$export$53cef6071e892014)($80186945e8d52e55$export$fcc2d19719f79415);







const $49f96cbdf93a7a39$export$73b75901a2e90ec3 = {
    GetName () {
        //return this.name_fake || this.name || this.toString().match(/^function\s*([^\s(]+)/)[1];
        //return this["name_fake"] || this.name || (this.toString().match(/^function\s*([^\s(]+)/) || [])[1];
        return this.name || (this.toString().match(/^function\s*([^\s(]+)/) || [])[1];
    },
    SetName (name) {
        //this["name_fake"] = name;
        Object.defineProperty(this, "name", {
            value: name,
            configurable: true
        }); // can only set func.name using Object.defineProperty
        return this;
    },
    AddTag (tag) {
        if (this["tags"] == null) this["tags"] = [];
        this["tags"].push(tag);
        return this;
    },
    /*Function.prototype._AddFunction_Inline = function AddTags(/*o:*#/ tags___) { // (already implemented in VDF.js file)
        if (this.tags == null)
            this.tags = [];
        for (var i in arguments)
            this.tags.push(arguments[i]);
        return this;
    };*/ /*function AddTags() {
        var tags = V.Slice(arguments, 0, arguments.length - 1);
        var func = V.Slice(arguments).Last();
        func.AddTags.apply(func, tags);
    };*/ GetTags (type) {
        return (this["tags"] || []).Where((a)=>type == null || a instanceof type);
    },
    //AsStr(...args) { return require("../../V/V").Multiline(this, ...args); };
    //AsStr(useExtraPreprocessing) { return require("../../V/V").Multiline(this, useExtraPreprocessing); };
    RunThenReturn (...args) {
        this.apply(null, args);
        return this;
    },
    NN (...args) {
        const result = this.apply(this, args);
        const triggerDebugger = false; // in case called within Validate function
        (0, $f9c728f16c05ea72$export$14647bdf767968d3)(result != null, `Function "${this.name}" returned ${result}, which violates a non-null type-guard.`, triggerDebugger);
        return result;
    }
};
const $49f96cbdf93a7a39$export$34f086b67230ecfd = (0, $bff1a0df7235a3e6$export$f763809ea8d02d39)($49f96cbdf93a7a39$export$73b75901a2e90ec3);
const $49f96cbdf93a7a39$export$969e9a496a5296bc = (0, $bff1a0df7235a3e6$export$53cef6071e892014)($49f96cbdf93a7a39$export$73b75901a2e90ec3);
function $49f96cbdf93a7a39$var$isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function $49f96cbdf93a7a39$var$getDaysInMonth(year, month) {
    return [
        31,
        $49f96cbdf93a7a39$var$isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ][month];
}
const $49f96cbdf93a7a39$export$77884f034181fe36 = {
    get MonthDate () {
        return new Date(this.getFullYear(), this.getMonth(), 1);
    },
    IsLeapYear () {
        return $49f96cbdf93a7a39$var$isLeapYear(this.getFullYear());
    },
    GetDaysInMonth () {
        return $49f96cbdf93a7a39$var$getDaysInMonth(this.getFullYear(), this.getMonth());
    },
    AddMonths (value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, $49f96cbdf93a7a39$export$9b0855eb8f38e9f4(this).GetDaysInMonth()));
        return this;
    },
    Clone () {
        return new Date(this.getTime());
    }
};
const $49f96cbdf93a7a39$export$9b0855eb8f38e9f4 = (0, $bff1a0df7235a3e6$export$f763809ea8d02d39)($49f96cbdf93a7a39$export$77884f034181fe36);
const $49f96cbdf93a7a39$export$6544e54d7e1b5756 = (0, $bff1a0df7235a3e6$export$53cef6071e892014)($49f96cbdf93a7a39$export$77884f034181fe36); /*export class ErrorCEProxy {
    get Stack() {
        // this causes the full stack-trace to be attached to the Error object (in Chrome)
        if ((Error as any).captureStackTrace) {
            //(Error as any).captureStackTrace(instance, GetStackTraceStr);
            (Error as any).captureStackTrace(this);
        }
        return this.stack;
    }
}
export const ErrorCE = CreateProxyForClassExtensions(ErrorCEProxy);*/ 


const $1216bcf1d31d00c6$export$266a019e13902094 = {
    // base
    // ==========
    /** Helps you do stuff like this:
        Array.prototype._AddFunction(function AddX(value) { this.push(value); }); []._AddX("newItem"); */ _AddItem (name, value, forceAdd = false) {
        if (name == null || name.length == 0) throw new Error("No prop-name was specified for _AddItem() call.");
        if (name in this) delete this[name];
        if (name in this && !forceAdd) return; // workaround for some properties not being deleted
        Object.defineProperty(this, name, {
            configurable: true,
            value: value
        });
    /*if (this[name] == null)
            throw new Error(`Failed to add property "${name}" to type "${this}".`);*/ },
    _AddFunction (name, func) {
        //this._AddItem(func.name || func.toString().match(/^function\s*([^\s(]+)/)[1], func);
        $1216bcf1d31d00c6$export$fe4dfa6bc6a7ffcc._AddItem(this, name, func);
    },
    // the below helps you do stuff like this:
    //		Array.prototype._AddGetterSetter("AddX", null, function(value) { this.push(value); }); [].AddX = "newItem";
    _AddGetterSetter (name, getter, setter) {
        //var name = (getter || setter).name || (getter || setter).toString().match(/^function\s*([^\s(]+)/)[1];
        if (name in this) delete this[name];
        if (name in this) return; // workaround for some properties not being deleted
        const info = {
            configurable: true
        };
        if (getter) info.get = getter;
        if (setter) info.set = setter;
        Object.defineProperty(this, name, info);
    },
    // the below helps you do stuff like this:
    //		Array.prototype._AddFunction_Inline = function AddX(value) { this.push(value); }; [].AddX = "newItem";
    set _AddFunction_Inline (func){
        $1216bcf1d31d00c6$export$fe4dfa6bc6a7ffcc._AddFunction(this, (0, $49f96cbdf93a7a39$export$34f086b67230ecfd)(func).GetName(), func);
    },
    set _AddGetter_Inline (func){
        $1216bcf1d31d00c6$export$fe4dfa6bc6a7ffcc._AddGetterSetter(this, (0, $49f96cbdf93a7a39$export$34f086b67230ecfd)(func).GetName(), func, null);
    },
    set _AddSetter_Inline (func){
        $1216bcf1d31d00c6$export$fe4dfa6bc6a7ffcc._AddGetterSetter(this, (0, $49f96cbdf93a7a39$export$34f086b67230ecfd)(func).GetName(), null, func);
    },
    // normal
    // ==========
    As (type) {
        if (this instanceof type) return this;
        return null;
    },
    Cast (type) {
        Object.setPrototypeOf(this, type.prototype);
        return this;
    },
    Strip () {
        Object.setPrototypeOf(this, Object.getPrototypeOf({}));
        return this;
    },
    /** Executes the given function (passing "this" as the func's "this", and only argument), then returns "this". */ VAct (func) {
        func.call(this, this);
        return this;
    },
    /** Executes the given function (passing "this" as the func's "this", and only argument). If the func's result is truthy, returns "this"; else, returns null. */ Check (func) {
        const result = func.call(this, this);
        if (result) return this;
        return null;
    },
    /* Executes the given function (passing "this" as the func's "this", and only argument), then returns the func's result. */ VGet (func) {
        return func.call(this, this);
    },
    SafeGet: function(pathOrPathGetterFunc, resultIfNull) {
        const pathSegments = typeof pathOrPathGetterFunc == "string" ? pathOrPathGetterFunc : (0, $bff1a0df7235a3e6$export$bc4bf9529c6d1e83)(pathOrPathGetterFunc);
        return (0, $bff1a0df7235a3e6$export$4f1af7ef810f3f84)(this, pathSegments, resultIfNull);
    },
    // todo: maybe remove/merge these
    Extend (x, copyNonEnumerable = false) {
        if (x != null) for (const key of Object[copyNonEnumerable ? "getOwnPropertyNames" : "keys"](x)){
            const value = x[key];
            this[key] = value;
        }
        return this;
    },
    Extended (x, copyNonEnumerable = false) {
        const result = this instanceof Array ? [] : {};
        for (const key of Object[copyNonEnumerable ? "getOwnPropertyNames" : "keys"](this))result[key] = this[key];
        if (x != null) for (const key1 of Object[copyNonEnumerable ? "getOwnPropertyNames" : "keys"](x))result[key1] = x[key1];
        return result;
    },
    // more advanced version of ObjectCE.Extend
    VSet: function(...args) {
        let props, propName, propValue, opt;
        if ((0, $558beaa9e91cc3f5$export$fae01d74d6648c3f)(args[0]) || (0, $558beaa9e91cc3f5$export$9dc58581bb80d9a7)(args[0])) [propName, propValue, opt] = args;
        else [props, opt] = args;
        opt = Object.assign(Object.assign({}, {
            copyNonEnumerable: true,
            copySymbolKeys: true,
            copyGetterSettersAs: "value",
            callSetters: "auto"
        }), opt);
        const SetProp = (name, descriptor, value)=>{
            // only process operators if: 1) js-engine supports Symbols (for security), or 2) caller allows string-operators
            if ((0, $558beaa9e91cc3f5$export$9dc58581bb80d9a7)((0, $bff1a0df7235a3e6$export$1b08f5ea83f6211)) || opt.allowStringOperators) {
                if (value === (0, $bff1a0df7235a3e6$export$1b08f5ea83f6211) || opt.allowStringOperators && value == (0, $bff1a0df7235a3e6$export$1b08f5ea83f6211).toString()) return;
                if (value === (0, $bff1a0df7235a3e6$export$9f9ab71c6638c203) || opt.allowStringOperators && value == (0, $bff1a0df7235a3e6$export$9f9ab71c6638c203).toString()) {
                    delete this[name];
                    return;
                }
            }
            const isGetterSetter = descriptor && (descriptor.get != null || descriptor.set != null);
            const asGetterSetter = isGetterSetter && opt.copyGetterSettersAs == "getterSetter";
            // descriptorCustomized: whether the descriptor has customizations that would be lost by using a simple set-op
            const descriptorCustomized = descriptor && (descriptor.enumerable == false || descriptor.writable == false || descriptor.configurable == false || asGetterSetter);
            const useSimpleSet_final = opt.callSetters == "always" || opt.callSetters == "auto" && !descriptorCustomized;
            if (useSimpleSet_final) this[name] = value;
            else {
                // we default configurable to true, since it's the better default imo; it's more compatible -- conf:false can break "correct code", whereas conf:true at worst allows mistakes
                const finalDescriptor = Object.assign({
                    configurable: true
                }, descriptor);
                // if placing a value (rather than copying a getter-setter), clear get/set fields, and set value field 
                if (!asGetterSetter) {
                    delete finalDescriptor.get;
                    delete finalDescriptor.set;
                    finalDescriptor.value = value;
                }
                Object.defineProperty(this, name, finalDescriptor);
            }
        };
        if (propName) SetProp(propName, opt.prop, propValue);
        else if (props != null) {
            /*for (let key in props) {
                if (!props.hasOwnProperty(key)) continue;*/ let keys = Object.getOwnPropertyNames(props);
            if (opt.copySymbolKeys) keys = keys.concat(Object.getOwnPropertySymbols(props));
            for (const key of keys){
                const descriptor = Object.getOwnPropertyDescriptor(props, key);
                if (!descriptor.enumerable && !opt.copyNonEnumerable) continue;
                const isGetterSetter = descriptor.get != null || descriptor.set != null;
                if (isGetterSetter && opt.copyGetterSettersAs == "ignore") continue; // for "ignore" case: short-circuit, so we don't even call getter
                const value = !isGetterSetter || opt.copyGetterSettersAs == "value" ? props[key] : undefined;
                SetProp(key, descriptor, value);
            }
        }
        return this;
    },
    //IncludeKeys(...keys: string[]) {
    IncludeKeys (...keys) {
        let result = this instanceof Array ? [] : {};
        for (const key of keys){
            //if (!this.hasOwnProperty(key)) continue;
            if (!(key in this)) continue; // we include the value, even if from prototype (user wouldn't list in keys array if didn't want it)
            result[key] = this[key];
        }
        return result;
    },
    //ExcludeKeys(...keys: string[]) {
    ExcludeKeys (...keys) {
        //var result = Clone(this); // doesn't work with funcs
        /*var result = Object.assign(this instanceof Array ? [] : {}, this as any);
        for (let key of keys) {
            delete result[key];
        }*/ let result = this instanceof Array ? [] : {};
        for (const key of Object.keys(this)){
            if ((0, $99bc7ec9b00ad794$exports.ArrayCE)(keys).Contains(key)) continue;
            result[key] = this[key];
        }
        return result;
    },
    OmitUndefined (alsoOmitNulls = false, keepPrototype = true) {
        let result = this instanceof Array ? [] : {};
        for (const key of Object.keys(this)){
            if (this[key] === undefined) continue;
            if (alsoOmitNulls && this[key] === null) continue;
            result[key] = this[key];
        }
        if (keepPrototype) Object.setPrototypeOf(result, Object.getPrototypeOf(this));
        return result;
    },
    OmitNull (alsoOmitUndefined = true, keepPrototype = true) {
        let result = this instanceof Array ? [] : {};
        for (const key of Object.keys(this)){
            if (this[key] === null) continue;
            if (alsoOmitUndefined && this[key] === undefined) continue;
            result[key] = this[key];
        }
        if (keepPrototype) Object.setPrototypeOf(result, Object.getPrototypeOf(this));
        return result;
    },
    IsOneOf (...values) {
        if ((0, $99bc7ec9b00ad794$exports.ArrayCE)(values).Contains(this)) return true;
        // if the value-list contains the primitive-version of self, consider it a match -- otherwise calling "test1".IsOneOf("test1", "test2") would fail
        const isObjectFormOfPrimitive = this instanceof Boolean || this instanceof Number || this instanceof String;
        if (isObjectFormOfPrimitive && (0, $99bc7ec9b00ad794$exports.ArrayCE)(values).Contains(this.valueOf())) return true;
        return false;
    },
    Pairs: function() {
        var result = [];
        const keys = this instanceof Map ? Array.from(this.keys()) : Object.keys(this);
        for(let i = 0; i < keys.length; i++){
            const key = keys[i];
            //if (excludeSpecialKeys && (key == "_" || key == "_key" || key == "_id")) continue;
            const entry = {
                index: i,
                key: key,
                keyNum: Number(key),
                value: this instanceof Map ? this.get(key) : this[key]
            };
            if ((0, $558beaa9e91cc3f5$export$f375b07b95af9a54)(entry.keyNum)) delete entry["keyNum"];
            result.push(entry);
        }
        return result;
    },
    VKeys: function() {
        //if (excludeSpecialKeys) return this.Pairs(true).map(a=>a.key);
        const keys = this instanceof Map ? Array.from(this.keys()) : Object.keys(this);
        //if (excludeSpecialKeys) keys = ArrayCE(keys).Exclude(specialKeys);
        return keys;
    },
    VValues: function() {
        //if (excludeSpecialKeys) return this.Props(true).map(a=>a.value);
        return $1216bcf1d31d00c6$export$fe4dfa6bc6a7ffcc.VKeys(this).map((key)=>this instanceof Map ? this.get(key) : this[key]);
    },
    // for symbols
    /*Pairs_Sym() {
    };*/ Sym (symbolName) {
        const symbols = Object.getOwnPropertySymbols(this);
        const symbol = symbols.find((a)=>a.toString() == `Symbol(${symbolName})`);
        return this[symbol];
    }
};
const $1216bcf1d31d00c6$export$982d7f197acc6f94 = (0, $bff1a0df7235a3e6$export$f763809ea8d02d39)($1216bcf1d31d00c6$export$266a019e13902094);
const $1216bcf1d31d00c6$export$fe4dfa6bc6a7ffcc = (0, $bff1a0df7235a3e6$export$53cef6071e892014)($1216bcf1d31d00c6$export$266a019e13902094);











/*interface CE_Auto_I {
    (obj: Array<any>): typeof ArrayCE;
    (obj: Element): typeof ElementCE;
    (obj: number): typeof NumberCE;
    (obj: Object): typeof ObjectCE;
    (obj: string): typeof StringCE;
}

export const CE_Auto = ((obj)=> {
}) as CE_Auto_I;*/ const $e7192e8e8c707384$var$classExtensionMap = {
    Number: (0, $80186945e8d52e55$export$caa4dfc7169288b7),
    String: (0, $ccace40069512cd2$export$29246bb2b9c16932),
    Date: (0, $49f96cbdf93a7a39$export$9b0855eb8f38e9f4),
    Element: (0, $bd9b41eda58071dd$export$ea432ebb9d598fdf),
    Function: (0, $49f96cbdf93a7a39$export$34f086b67230ecfd),
    Array: (0, $99bc7ec9b00ad794$exports.ArrayCE),
    Object: (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)
};
function $e7192e8e8c707384$export$774b69789b3791fa(obj, checkForUncommonDerived = false) {
    // first, try to get class-extension func based on direct constructor name (most common case)
    const typeName = obj.constructor ? obj.constructor.name : null;
    if (typeName && $e7192e8e8c707384$var$classExtensionMap[typeName]) return $e7192e8e8c707384$var$classExtensionMap[typeName](obj);
    // else, check each option using "instanceof" and such (needed for derived classes)
    if (checkForUncommonDerived) {
        if ((0, $558beaa9e91cc3f5$export$bdf29e0acfffe6ef)(obj, true)) return (0, $80186945e8d52e55$export$caa4dfc7169288b7)(obj);
        if ((0, $558beaa9e91cc3f5$export$fae01d74d6648c3f)(obj, true)) return (0, $ccace40069512cd2$export$29246bb2b9c16932)(obj);
        if (obj instanceof Date) return (0, $49f96cbdf93a7a39$export$9b0855eb8f38e9f4)(obj);
        if ((0, $558beaa9e91cc3f5$export$426ce8831f60741b)(obj)) return (0, $49f96cbdf93a7a39$export$34f086b67230ecfd)(obj);
        if ((0, $558beaa9e91cc3f5$export$e7d622d382907f22)(obj)) return (0, $99bc7ec9b00ad794$exports.ArrayCE)(obj);
    }
    if (typeof Element != "undefined" && obj instanceof Element) return (0, $bd9b41eda58071dd$export$ea432ebb9d598fdf)(obj);
    /*if (IsObject(obj)) return ObjectCE(obj);
    throw new Error(`Could not find class-extension helper for type "${obj.constructor ? obj.constructor.name : "n/a"}".`);*/ return (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(obj);
}


class $89426c6b6efaba5b$export$5a8fffd6d7047b8b {
}



var $2fca4915041bc01d$exports = {};


class $460f8f6a93ec24ca$export$402a550ad3c70e6b {
    constructor(){
        this.timers = [];
    }
    Reset() {
        for (const timer of this.timers)timer.Stop();
        this.timers = [];
    }
    // Can be useful on platforms (eg. Android) where setInterval() and setTimeout() stop working when the screen is off.
    // Just have the Android code call the js every second or so, running this method; this will force the timer-functions to be manually triggered once they've passed the expected tick-time.
    ManuallyTriggerOverdueTimers() {
        for (const timer of this.timers)if (timer.NextTickFuncOverdue) timer.nextTickFunc();
    }
}
$460f8f6a93ec24ca$export$402a550ad3c70e6b.default = new $460f8f6a93ec24ca$export$402a550ad3c70e6b();
$460f8f6a93ec24ca$export$402a550ad3c70e6b.default_autoAddAll = false;
function $460f8f6a93ec24ca$export$51b6a2397978cb6a(func, ...args) {
    //if (!(func instanceof Function)) return;
    if (typeof func != "function") return undefined; // ts should catch, so check is here for invalid data
    try {
        return func.apply(this, args);
    } catch (ex) {}
    return undefined;
}
function $460f8f6a93ec24ca$export$2c8ba70267f14c54(obj, func, ...args) {
    if (typeof func != "function") return;
    try {
        return func.apply(obj, args);
    } catch (ex) {}
}
/*let oldTimeout = setTimeout;
g.setTimeout = function(func: Function, delayInMS = 0, ...args) {
    // setTimeout can take really long on Chrome mobile (eg. while scrolling), for some reason (like, 1.5 seconds)
    // on desktop, setImmediate is better as well, since it takes ~0ms instead of 1-15ms
    if (delayInMS == 0)
        return setImmediate(func, ...args);
    return oldTimeout(func, delayInMS, ...args);
}*/ /*export function Sleep(ms) {
    var startTime = new Date().getTime();
    while (new Date().getTime() - startTime < ms) {}
}*/ const $460f8f6a93ec24ca$var$maxTimeoutLength = 0x7FFFFFFF; // setTimeout limit is MAX_INT32=(2^31-1)
function $460f8f6a93ec24ca$export$e5ba3af335cd9693(delayInMS, func, ...args) {
    (0, $f9c728f16c05ea72$export$14647bdf767968d3)(delayInMS <= $460f8f6a93ec24ca$var$maxTimeoutLength, `Cannot wait for longer than ${$460f8f6a93ec24ca$var$maxTimeoutLength} ms. (use WaitUntilXThenRun, if a long-delay is needed)`);
    // setTimeout can take really long on Chrome mobile (eg. while scrolling), for some reason (like, 1.5 seconds)
    // on desktop, setImmediate is better as well, since it takes ~0ms instead of 1-15ms
    if (delayInMS == 0 && (0, $021c07a9cdec3f37$export$39b482c5e57630a8).setImmediate) return (0, $021c07a9cdec3f37$export$39b482c5e57630a8).setImmediate(func, ...args); // same as below
    return setTimeout(func, delayInMS, ...args); // "as any": maybe temp; used to allow source-importing from NodeJS
}
function $460f8f6a93ec24ca$export$d121bf8f3dc83405(targetDateTimeInMS, func, ...args) {
    var now = Date.now();
    var diff = (0, $80186945e8d52e55$export$caa4dfc7169288b7)(targetDateTimeInMS - now).KeepAtLeast(0);
    if (diff > $460f8f6a93ec24ca$var$maxTimeoutLength) $460f8f6a93ec24ca$export$e5ba3af335cd9693($460f8f6a93ec24ca$var$maxTimeoutLength, ()=>$460f8f6a93ec24ca$export$d121bf8f3dc83405(targetDateTimeInMS, func));
    else $460f8f6a93ec24ca$export$e5ba3af335cd9693(diff, func);
}
function $460f8f6a93ec24ca$export$166ac52b35cdaa60(timeMS) {
    return new Promise((resolve, reject)=>{
        $460f8f6a93ec24ca$export$e5ba3af335cd9693(timeMS, resolve);
    });
}
function $460f8f6a93ec24ca$export$a352030fccfa5bc7(targetDateTimeInMS) {
    return new Promise((resolve, reject)=>{
        $460f8f6a93ec24ca$export$d121bf8f3dc83405(targetDateTimeInMS, resolve);
    });
}
var $460f8f6a93ec24ca$var$DoNothingXTimesThenDoY_counters = {};
function $460f8f6a93ec24ca$export$737316d4bdd21a0a(doNothingCount, func, key = "default") {
    if ($460f8f6a93ec24ca$var$DoNothingXTimesThenDoY_counters[key] == null) $460f8f6a93ec24ca$var$DoNothingXTimesThenDoY_counters[key] = 0;
    if ($460f8f6a93ec24ca$var$DoNothingXTimesThenDoY_counters[key] >= doNothingCount) func();
    $460f8f6a93ec24ca$var$DoNothingXTimesThenDoY_counters[key]++;
}
class $460f8f6a93ec24ca$export$c57e9b2d8b9e4de {
    constructor(intervalInMS, func, maxCallCount = -1){
        this.timerID = -1;
        this.callCount_thisRun = 0;
        this.callCount_total = 0;
        (0, $f9c728f16c05ea72$export$14647bdf767968d3)((0, $558beaa9e91cc3f5$export$bdf29e0acfffe6ef)(intervalInMS), "Interval must be a number.");
        this.intervalInMS = intervalInMS;
        this.func = func;
        this.maxCallCount = maxCallCount;
        if ($460f8f6a93ec24ca$export$402a550ad3c70e6b.default_autoAddAll) $460f8f6a93ec24ca$export$402a550ad3c70e6b.default.timers.push(this);
    }
    SetContext(timerContext) {
        (0, $f9c728f16c05ea72$export$14647bdf767968d3)(timerContext, "TimerContext cannot be null.");
        this.timerContexts = (this.timerContexts || []).concat(timerContext);
        timerContext.timers.push(this);
        return this;
    }
    RemoveFromContext(timerContext) {
        (0, $99bc7ec9b00ad794$exports.ArrayCE)(this.timerContexts).Remove(timerContext);
        (0, $99bc7ec9b00ad794$exports.ArrayCE)(timerContext.timers).Remove(this);
    }
    ClearContexts() {
        for (const context of this.timerContexts)this.RemoveFromContext(context);
    }
    get Enabled() {
        return this.timerID != -1;
    }
    set Enabled(val) {
        if (val && !this.Enabled) this.Start();
        else if (!val && this.Enabled) this.Stop();
    }
    get NextTickFuncOverdue() {
        return this.nextTickTime != null && Date.now() > this.nextTickTime && this.nextTickFunc != null;
    }
    Start(initialDelayOverride) {
        // if start is called when it's already running, stop the timer first (thus we restart the timer instead of causing overlapping setIntervals/delayed-func-calls)
        if (this.Enabled) this.Stop();
        this.startTime = Date.now();
        const StartRegularInterval = ()=>{
            this.nextTickTime = this.startTime + this.intervalInMS;
            this.timerID = setInterval(this.nextTickFunc = ()=>{
                this.callCount_thisRun++;
                this.callCount_total++;
                this.func();
                if (this.maxCallCount != -1 && this.callCount_thisRun >= this.maxCallCount) this.Stop();
                else //this.nextTickTime += this.intervalInMS;
                this.nextTickTime = Date.now() + this.intervalInMS; // using Date.now() prevents the prop from getting out-of-sync (from sleep-mode)
            }, this.intervalInMS); // "as any": maybe temp; used to allow source-importing from NodeJS
        };
        if (initialDelayOverride != null) {
            this.nextTickTime = this.startTime + initialDelayOverride;
            this.timerID = setTimeout(this.nextTickFunc = ()=>{
                this.callCount_thisRun++;
                this.callCount_total++;
                this.func();
                if (this.maxCallCount != -1 && this.callCount_thisRun >= this.maxCallCount) this.Stop();
                else StartRegularInterval();
            }, initialDelayOverride); // "as any": maybe temp; used to allow source-importing from NodeJS
        } else StartRegularInterval();
        return this; // enable chaining, for SetContext() call
    }
    /** Clears native-timer, nextTickTime, nextTickFunc, timerID, and callCount_thisRun. (but not: startTime, callCount_total) */ Stop() {
        clearInterval(this.timerID);
        clearTimeout(this.timerID); // for setTimeout path [clearInterval seems to work for both, but added to be safe, since equivalence not noticed in spec]
        //this.startTime = null;
        this.nextTickTime = undefined;
        this.nextTickFunc = undefined;
        this.timerID = -1;
        this.callCount_thisRun = 0;
    }
}
class $460f8f6a93ec24ca$export$68d4005767aa2c7f extends $460f8f6a93ec24ca$export$c57e9b2d8b9e4de {
    constructor(interval_decimal, func, maxCallCount = -1){
        super(interval_decimal * 1000, func, maxCallCount);
    }
}
var $460f8f6a93ec24ca$var$funcLastScheduledRunTimes = {};
function $460f8f6a93ec24ca$export$1c304feb6b074c77(...args) {
    var _a;
    var key = "[default]", minInterval, func;
    if (args.length == 2) [minInterval, func] = args;
    else /*if (args.length == 3)*/ [key, minInterval, func] = args;
    var lastScheduledRunTime = (_a = $460f8f6a93ec24ca$var$funcLastScheduledRunTimes[key]) !== null && _a !== void 0 ? _a : 0;
    var now = new Date().getTime();
    var timeSinceLast = now - lastScheduledRunTime;
    if (timeSinceLast >= minInterval) {
        func();
        $460f8f6a93ec24ca$var$funcLastScheduledRunTimes[key] = now;
    } else {
        const waitingForNextRunAlready = lastScheduledRunTime > now;
        if (!waitingForNextRunAlready) {
            var nextRunTime = lastScheduledRunTime + minInterval;
            var timeTillNextRun = nextRunTime - now;
            $460f8f6a93ec24ca$export$e5ba3af335cd9693(timeTillNextRun, func);
            $460f8f6a93ec24ca$var$funcLastScheduledRunTimes[key] = nextRunTime;
        }
    }
}




var $2fca4915041bc01d$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class $2fca4915041bc01d$export$4f9662e730105e4b {
    constructor(initialData){
        (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(this).Extend(initialData);
    }
}
class $2fca4915041bc01d$export$68a44d00957434e6 {
    /** Don't worry about having to discard some calls before receiveTextFunc receives it. We automatically discard entries that aren't valid bridge-messages. */ constructor(options){
        /** Useful to ensure we ignore non-jsve-bridge messages. (the channel might be used by other systems as well) */ this.channel_wrapBridgeMessage = true;
        /** Needed if the channel only supports strings being sent/received. */ this.channel_stringifyChannelMessageObj = true;
        /** Needed if the channel has >2 members; makes-so call-ids are random-numbers, and are filtered by each member to just the ones it knows it initiated. */ this.channel_safeCallbacks = false;
        // for receiving function-calls (and callbacks) from external bridge
        // ==========
        this.functionMains = {};
        this.functionExtras = {};
        this.requireMainFuncForCalls = true;
        // callback system (for when passing a function as an argument, or awaiting the result of a remote call)
        // ==========
        this.lastCallbackID = -1;
        this.callbacks = {};
        (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(this).Extend((0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(options).ExcludeKeys("receiveChannelMessageFunc_addImmediately"));
        if (options.receiveChannelMessageFunc_addImmediately != false) this.SetUpReceiver();
    }
    // low level data-transfer
    // ==========
    SetUpReceiver() {
        // add our own receive-text-func right now
        this.receiveChannelMessageFunc = (channelMessage)=>{
            let channelMessageObj;
            if (this.channel_stringifyChannelMessageObj && (0, $558beaa9e91cc3f5$export$fae01d74d6648c3f)(channelMessage)) channelMessageObj = (0, $460f8f6a93ec24ca$export$51b6a2397978cb6a)(()=>JSON.parse(channelMessage)) || {};
            if (!this.channel_stringifyChannelMessageObj && (0, $558beaa9e91cc3f5$export$e64f6626d4e96cfb)(channelMessage)) channelMessageObj = channelMessage;
            const bridgeMessage = this.channel_wrapBridgeMessage ? channelMessageObj && channelMessageObj["JSVE_Bridge_message"] : channelMessageObj;
            if (!(0, $558beaa9e91cc3f5$export$e64f6626d4e96cfb)(bridgeMessage)) return;
            this.DeserializeFuncsIn(bridgeMessage);
            if (bridgeMessage.callFunction_name) this.OnReceiveFunctionCall(bridgeMessage);
            if (bridgeMessage.callCallback_id != null) this.OnReceiveCallback(bridgeMessage);
        };
        this.receiveChannelMessageFunc_adder(this.receiveChannelMessageFunc);
    }
    SendBridgeMessage(bridgeMessage) {
        this.SerializeFuncsIn(bridgeMessage);
        const channelMessageObj = this.channel_wrapBridgeMessage ? {
            JSVE_Bridge_message: bridgeMessage
        } : bridgeMessage;
        const channelMessage = this.channel_stringifyChannelMessageObj ? JSON.stringify(channelMessageObj) : channelMessageObj;
        this.sendChannelMessageFunc(channelMessage);
    }
    RegisterFunction(name, func, asMain = true) {
        if (asMain) {
            if (this.functionMains[name]) throw new Error(`Cannot register a second main-func for the same function-name: "${name}"`);
            this.functionMains[name] = func;
        } else {
            if (this.functionExtras[name] == null) this.functionExtras[name] = [];
            this.functionExtras[name].push(func);
        }
    }
    /** If `func` is left null, removes only the entry in `functionMains`. */ UnregisterFunction(name, func) {
        let funcRemoved = false;
        if (func) {
            if (this.functionMains[name] == func) {
                delete this.functionMains[name];
                funcRemoved = true;
            }
            if (this.functionExtras[name]) {
                (0, $99bc7ec9b00ad794$exports.ArrayCE)(this.functionExtras[name]).Remove(func);
                funcRemoved = true;
            }
        } else if (name in this.functionMains) {
            delete this.functionMains[name];
            funcRemoved = true;
        }
        return funcRemoved;
    }
    OnReceiveFunctionCall(bridgeMessage) {
        return $2fca4915041bc01d$var$__awaiter(this, void 0, void 0, function*() {
            const result = yield this.Local_CallFunc(bridgeMessage.callFunction_name, ...bridgeMessage.callFunction_args);
            this.CallCallback(bridgeMessage.callFunction_callbackID, result);
        });
    }
    // we use async/await here, to support waiting for the registered function if it happens to be async (if it isn't, that's fine -- the async/await doesn't hurt anything)
    Local_CallFunc(funcName, ...args) {
        return $2fca4915041bc01d$var$__awaiter(this, void 0, void 0, function*() {
            const mainFunc = this.functionMains[funcName];
            let result;
            if (mainFunc) result = yield mainFunc(...args);
            else {
                if (this.requireMainFuncForCalls) throw new Error(`Cannot find main-func for function-call with name "${funcName}".`);
            }
            for (const extraFunc of this.functionExtras[funcName] || [])extraFunc(...args);
            return result;
        });
    }
    OnReceiveCallback(bridgeMessage) {
        this.Local_CallCallback(bridgeMessage.callCallback_id, bridgeMessage.callCallback_args);
    }
    Local_CallCallback(callbackID, callbackArgs) {
        const callback = this.callbacks[callbackID];
        if (callback == null) {
            if (this.channel_safeCallbacks) return;
            (0, $f9c728f16c05ea72$export$14647bdf767968d3)(false, `Cannot find callback with id ${callbackID}!`);
        }
        callback(...callbackArgs);
    }
    RegisterCallback(callback) {
        const callbackID = this.channel_safeCallbacks ? Math.random() : this.lastCallbackID + 1;
        this.lastCallbackID = callbackID;
        this.callbacks[callbackID] = callback;
        return callbackID;
    }
    // technically, this just prepares the functions in the tree for serialization (by setting a toJSON key, which JSON.stringify uses)
    SerializeFuncsIn(argTree) {
        const nodes = (0, $bff1a0df7235a3e6$export$af3391acba9fe505)(argTree);
        for (const node of nodes)if ((0, $558beaa9e91cc3f5$export$426ce8831f60741b)(node.Value)) {
            const callbackID = this.RegisterCallback(node.Value);
            node.Value.toJSON = ()=>({
                    serializedFunc_callbackID: callbackID
                });
        }
    }
    DeserializeFuncsIn(argTree) {
        const nodes = (0, $bff1a0df7235a3e6$export$af3391acba9fe505)(argTree);
        for (const node of nodes)if (node.Value != null && node.Value.serializedFunc_callbackID != null) {
            const callbackID = node.Value.serializedFunc_callbackID;
            const proxyFunc = (...args)=>{
                this.CallCallback(callbackID, ...args);
            };
            node.Value = proxyFunc;
        }
    }
    // for sending function-calls to external bridge
    // ==========
    Call(funcName, ...args) {
        return new Promise((resolve, reject)=>{
            const awaitReturn_callbackID = this.RegisterCallback(resolve);
            const bridgeMessage = new $2fca4915041bc01d$export$4f9662e730105e4b({
                callFunction_callbackID: awaitReturn_callbackID,
                callFunction_name: funcName,
                callFunction_args: args
            });
            this.SendBridgeMessage(bridgeMessage);
        });
    }
    CallCallback(callbackID, ...args) {
        const bridgeMessage = new $2fca4915041bc01d$export$4f9662e730105e4b({
            callCallback_id: callbackID,
            callCallback_args: args
        });
        this.SendBridgeMessage(bridgeMessage);
    }
}



function $05f94e8c5a6b7977$export$31c8ff0fde2b0028(oldObj, newObj, returnNullIfSame = false, useJSONCompare = false) {
    oldObj = oldObj || {}, newObj = newObj || {};
    const keys = (0, $99bc7ec9b00ad794$exports.ArrayCE)(Object.keys(oldObj).concat(Object.keys(newObj))).Distinct();
    const result = [];
    for (const key of keys){
        const newVal_forComparison = useJSONCompare ? JSON.stringify(newObj[key]) : newObj[key];
        const oldVal_forComparison = useJSONCompare ? JSON.stringify(oldObj[key]) : oldObj[key];
        if (newVal_forComparison !== oldVal_forComparison) result.push({
            key: key,
            oldVal: oldObj[key],
            newVal: newObj[key]
        });
    }
    if (result.length == 0 && returnNullIfSame) return null;
    return result;
} /*export function GetUpdates(oldData, newData, useNullInsteadOfUndefined = true) {
    const result = {};
    for (const key of oldData.VKeys(true).concat(newData.VKeys(true))) {
        if (newData[key] !== oldData[key]) {
            result[key] = newData[key];
            if (newData[key] === undefined && useNullInsteadOfUndefined) {
                result[key] = null;
            }
        }
    }
    return RemoveHelpers(result);
}*/ 





function $69962d2f343a18c3$export$9a58ef0d7ad3278c(min, max, step = 1, includeMax = true, roundToStep = true) {
    var result = [];
    for(let i = min; includeMax ? i <= max : i < max; i = roundToStep ? (0, $80186945e8d52e55$export$caa4dfc7169288b7)(i + step).RoundTo(step) : i + step)result.push(i);
    return result;
}
function $69962d2f343a18c3$export$b72efc6b031781f8(minX, maxY, interval = 1) {
    var result = [];
    for(var val = minX; val <= maxY; val += interval)result.push(val);
    return result;
}
function $69962d2f343a18c3$export$4205edff77aa1d4b(minX, maxOutY, interval = 1) {
    var result = [];
    for(var val = minX; val < maxOutY; val += interval)result.push(val);
    return result;
}
function $69962d2f343a18c3$export$30e52872ef59c897(from, to, percentFromXToY, keepResultInRange = true) {
    let result = from + (to - from) * percentFromXToY;
    if (keepResultInRange) result = (0, $80186945e8d52e55$export$caa4dfc7169288b7)(result).KeepBetween(from, to);
    return result;
}
function $69962d2f343a18c3$export$542b3e141b803c3(start, end, val, keepResultInRange = true) {
    // distance-from-x / distance-from-x-required-for-result-'1'
    var result = (val - start) / (end - start);
    if (keepResultInRange) result = (0, $80186945e8d52e55$export$caa4dfc7169288b7)(result).KeepBetween(0, 1);
    return result;
}
function $69962d2f343a18c3$export$2fc3d4178b27a4ab(seed) {
    return function() {
        var t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
function $69962d2f343a18c3$export$adc7ca9248b2eaa2(options) {
    var _a;
    const { min: min , max: max , mustBeInteger: mustBeInteger  } = options;
    const randFunc = (_a = options.randFunc) !== null && _a !== void 0 ? _a : Math.random;
    /*Assert(IsNumber(min), `Min must be a number. (not: ${min})`);
    Assert(IsNumber(max), `Max must be a number. (not: ${max})`);*/ const range = max - min;
    if (mustBeInteger) return min + Math.floor(randFunc() * (range + 1));
    return min + randFunc() * range;
}


var $40579b2446fbe655$exports = {};

var $40579b2446fbe655$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function $40579b2446fbe655$export$2eb120a4321254df(rootObj, dataPath) {
    return new Promise((resolve, reject)=>$40579b2446fbe655$var$__awaiter(this, void 0, void 0, function*() {
            const dataPathParts = dataPath.split(".");
            let currentParent = rootObj;
            for (const part of dataPathParts){
                while(currentParent[part] == null)yield $40579b2446fbe655$export$512bfaadbc8af94a(currentParent, part);
                currentParent = currentParent[part];
            }
            resolve();
        }));
}
function $40579b2446fbe655$export$512bfaadbc8af94a(obj, prop) {
    return new Promise((resolve, reject)=>{
        (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(obj)._AddGetterSetter(prop, ()=>{}, (value)=>{
            delete obj[prop]; // remove this hook
            obj[prop] = value; // set to provided value
            resolve();
        });
    });
}
function $40579b2446fbe655$export$92d86c3fcaa3bd8b(obj) {
    return $40579b2446fbe655$var$__awaiter(this, void 0, void 0, function*() {
        const pairs = (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(obj).Pairs();
        const awaitedResults = yield Promise.all(pairs.map((pair)=>{
            const valueAsPromise = pair.value instanceof Promise ? pair.value : Promise.resolve(pair.value);
            return valueAsPromise;
        }));
        const result = {};
        for (const pair1 of pairs)result[pair1.key] = awaitedResults[pair1.index];
        return result;
    });
}





class $7d41eade6a7518dc$export$6b2f4f3cf41d451d {
    constructor(){
        this.toJSON_autoIndent_minLength = 70; // NodeJS's console.log appears to use ~70 as the cutoff
        this.toJSON_autoIndent_indent = 2;
    }
}
function $7d41eade6a7518dc$export$36d6dce68c54ded5(options, ...parts) {
    const opts = (0, $bff1a0df7235a3e6$export$a9c23c6ac3fc3eca)(new $7d41eade6a7518dc$export$6b2f4f3cf41d451d(), options);
    let result = "";
    for (const [i, part] of parts.entries()){
        if (i > 0) result += " ";
        if (typeof part == "string") result += part;
        else {
            let json = $7d41eade6a7518dc$export$314c6567a4774e9d(part, opts.toJSON_opts);
            if (opts.toJSON_autoIndent_minLength != null && json.length >= opts.toJSON_autoIndent_minLength) json = $7d41eade6a7518dc$export$314c6567a4774e9d(part, (0, $bff1a0df7235a3e6$export$a9c23c6ac3fc3eca)(opts.toJSON_opts, {
                indent: opts.toJSON_autoIndent_indent
            }));
            result += json;
        }
    }
    return result;
}
function $7d41eade6a7518dc$export$f09a452e01aef7c2(json) {
    return JSON.parse(json);
}
function $7d41eade6a7518dc$export$f3d8bbc2adf038a0(obj, replacerFunc, spacing) {
    return JSON.stringify(obj, replacerFunc, spacing);
}
class $7d41eade6a7518dc$export$ad4a9f249f6d94e1 {
    constructor(){
        this.keysToIgnore = [];
        this.stringifyUndefinedAs = null;
        this.trimDuplicates = false;
        this.trimDuplicates_replaceStr = "[circular/duplicate] ";
        this.catchErrors = false;
        this.catchErrors_replaceStr = "[converting to JSON failed]";
    //maxDepth = 4;
    }
}
class $7d41eade6a7518dc$export$9bca0215e92f0eeb {
    constructor(){
        this.insideObjectBraces = false;
        this.insideArrayBrackets = false;
        this.betweenPropsOrItems = true;
        this.betweenPropNameAndValue = true;
    }
}
function $7d41eade6a7518dc$export$314c6567a4774e9d(obj, options) {
    var _a;
    const opts = (0, $bff1a0df7235a3e6$export$a9c23c6ac3fc3eca)(new $7d41eade6a7518dc$export$ad4a9f249f6d94e1(), options);
    (0, $f9c728f16c05ea72$export$14647bdf767968d3)(!(opts.indent != null && opts.addSpacesAt), "Cannot enable indent and addSpaceAt simultaneously.");
    const indent = (_a = opts.indent) !== null && _a !== void 0 ? _a : opts.addSpacesAt ? 1 : undefined;
    const cache = new Set();
    //let foundDuplicates = false;
    try {
        var result = JSON.stringify(obj, (key, value)=>{
            let replacer_lastResult;
            const callReplacer = (replacerFunc)=>{
                replacer_lastResult = replacerFunc(key, value);
                // as per func's description, "undefined" being returned means "make no change"
                if (replacer_lastResult === undefined) return false;
                if (replacer_lastResult != null && replacer_lastResult.$omit === true && Object.keys(replacer_lastResult).length == 1) replacer_lastResult = undefined;
                return true;
            };
            if (opts.entryReplacer_pre && callReplacer(opts.entryReplacer_pre)) return replacer_lastResult;
            if ((0, $99bc7ec9b00ad794$exports.ArrayCE)(opts.keysToIgnore).Contains(key)) return;
            if (opts.trimDuplicates && typeof value == "object" && value != null) {
                // if duplicate found, ignore key (for more advanced, see: flatted, json-stringify-safe, etc.)
                if (cache.has(value)) //foundDuplicates = true;
                return opts.trimDuplicates_replaceStr;
                cache.add(value);
            }
            if (value === undefined && opts.stringifyUndefinedAs !== undefined) return opts.stringifyUndefinedAs;
            if (opts.entryReplacer_post && callReplacer(opts.entryReplacer_post)) return replacer_lastResult;
            return value;
        }, indent);
    } catch (ex) {
        if (opts.catchErrors) return opts.catchErrors_replaceStr;
        throw ex;
    }
    if (opts.addSpacesAt) {
        result = result.replace(/^ +/gm, " "); // remove all but the first space for each line
        result = result.replace(/\n/g, ""); // remove line-breaks
        if (!opts.addSpacesAt.insideObjectBraces) result = result.replace(/{ /g, "{").replace(/ }/g, "}");
        if (!opts.addSpacesAt.insideArrayBrackets) result = result.replace(/\[ /g, "[").replace(/ \]/g, "]");
        if (!opts.addSpacesAt.betweenPropsOrItems) result = result.replace(/, /g, ",");
        if (!opts.addSpacesAt.betweenPropNameAndValue) result = result.replace(/": /g, `":`);
    }
    //cache = null; // enable garbage collection
    /*if (opt.trimCircular && foundDuplicates) {
        result = opt.trimCircular_replaceStr + result;
    }*/ return result;
}
function $7d41eade6a7518dc$export$b5d07669a5562b23(obj, keepPrototype = false) {
    if (obj == null) return obj;
    const result = $7d41eade6a7518dc$export$f09a452e01aef7c2($7d41eade6a7518dc$export$f3d8bbc2adf038a0(obj));
    if (keepPrototype == true) Object.setPrototypeOf(result, Object.getPrototypeOf(obj));
    return result;
}
function $7d41eade6a7518dc$export$7dabd091137966e0(originalObject, keepCircularLinks = false) {
    if (originalObject == null) return originalObject;
    const copies = [
        {
            source: originalObject,
            target: Array.isArray(originalObject) ? [] : Object.create(Object.getPrototypeOf(originalObject))
        }
    ];
    const cloneObject = copies[0].target;
    const sourceReferences = [
        originalObject
    ];
    const targetReferences = [
        cloneObject
    ];
    // first in, first out
    let current;
    while(current = copies.shift()){
        const keys = Object.getOwnPropertyNames(current.source);
        for(let propertyIndex = 0; propertyIndex < keys.length; propertyIndex++){
            // Save the source's descriptor
            const descriptor = Object.getOwnPropertyDescriptor(current.source, keys[propertyIndex]);
            if (!descriptor.value || typeof descriptor.value !== "object") {
                Object.defineProperty(current.target, keys[propertyIndex], descriptor);
                continue;
            }
            const nextSource = descriptor.value;
            descriptor.value = Array.isArray(nextSource) ? [] : Object.create(Object.getPrototypeOf(nextSource));
            if (keepCircularLinks) {
                const indexOf = sourceReferences.indexOf(nextSource);
                if (indexOf !== -1) {
                    // The source is already referenced, just assign reference
                    descriptor.value = targetReferences[indexOf];
                    Object.defineProperty(current.target, keys[propertyIndex], descriptor);
                    continue;
                }
                sourceReferences.push(nextSource);
                targetReferences.push(descriptor.value);
            }
            Object.defineProperty(current.target, keys[propertyIndex], descriptor);
            copies.push({
                source: nextSource,
                target: descriptor.value
            });
        }
    }
    return cloneObject;
}





function $006665781f9cb255$export$b4976521df777783(url) {
    // Handle absolute URLs (with protocol-relative prefix)
    // Example: //domain.com/file.png
    if (url.search(/^\/\//) != -1) return window.location.protocol + url;
    // Handle absolute URLs (with explicit origin)
    // Example: http://domain.com/file.png
    if (url.search(/:\/\//) != -1) return url;
    // Handle absolute URLs (without explicit origin)
    // Example: /file.png
    if (url.search(/^\//) != -1) return window.location.origin + url;
    // Handle relative URLs
    // Example: file.png
    var base = window.location.href.match(/(.*\/)/)[0];
    return base + url;
}
function $006665781f9cb255$export$6838df4b0b4a976c(hashStr) {
    var url = location.href; // Save down the URL without hash.
    location.href = "#" + hashStr; // Go to the target element.
    history.replaceState(null, null, url); // Don't like hashes. Changing it back.
//document.getElementById(hashStr).scrollIntoView(); //Even IE6 supports this
}
function $006665781f9cb255$export$d2206d2eb5d60ba6() {
    return window.location.href.replace(/%22/, '"');
}
function $006665781f9cb255$export$fa935bb372d60240(url) {
    url = url || $006665781f9cb255$export$d2206d2eb5d60ba6();
    let [domainStr, pathStr, varsStr, hashStr] = Array(4).fill(0).map((a)=>"");
    let urlToProcess = url;
    if (urlToProcess.includes("#") && !varsStr.includes("runJS=")) [urlToProcess, hashStr] = (0, $ccace40069512cd2$export$29246bb2b9c16932)(urlToProcess).SplitAt(urlToProcess.indexOf("#"));
    if (urlToProcess.includes("?")) [urlToProcess, varsStr] = (0, $ccace40069512cd2$export$29246bb2b9c16932)(urlToProcess).SplitAt(urlToProcess.indexOf("?"));
    //if (urlToProcess.Matches("/").length == )
    let splitAtSlash_pos = (0, $80186945e8d52e55$export$caa4dfc7169288b7)((0, $ccace40069512cd2$export$29246bb2b9c16932)(urlToProcess).IndexOf_X("/", 2)).IfN1Then(urlToProcess.length);
    [domainStr, pathStr] = (0, $ccace40069512cd2$export$29246bb2b9c16932)(urlToProcess).SplitAt(splitAtSlash_pos);
    return [
        domainStr,
        pathStr,
        varsStr,
        hashStr
    ];
}
function $006665781f9cb255$var$GetUrlPath(url, fromDomain = true) {
    /*let [pathStr, varsStr, hashStr] = GetUrlParts(url);
    if (fromDomain)
        pathStr = pathStr.SplitAt(pathStr.IndexOf_X("/", 2).IfN1Then(pathStr.length))[1];
    if (pathStr.endsWith("/"))
        pathStr = pathStr.substr(0, pathStr.length - 1);*/ let [_, pathStr] = $006665781f9cb255$export$fa935bb372d60240(url);
    if (pathStr.endsWith("/")) pathStr = pathStr.slice(0, -1);
    return pathStr;
}
function $006665781f9cb255$var$GetUrlVars(url, allowQuestionMarkAsVarSep = true) {
    let varSeparators = allowQuestionMarkAsVarSep ? [
        "&",
        "?"
    ] : [
        "&"
    ];
    let [_, __, varsStr] = $006665781f9cb255$export$fa935bb372d60240(url);
    var vars = {}; //{[key: string]: string};
    var parts = (0, $ccace40069512cd2$export$29246bb2b9c16932)(varsStr).SplitByAny(...varSeparators).filter((a)=>a);
    for (let part of parts){
        let [key, value] = (0, $ccace40069512cd2$export$29246bb2b9c16932)(part).SplitAt(part.indexOf("="));
        vars[key] = value;
    }
    return vars;
}
class $006665781f9cb255$export$e59598f920324e5b {
    constructor(domain = "", pathNodes = [], queryVars = [], hash = ""){
        //AssertWarn(domain.match(/^[A-Za-z-:./]+$/) != null, "Domain seems to contain")
        if (domain.includes("?") || domain.includes("#")) (0, $f9c728f16c05ea72$export$14647bdf767968d3)(false, "Domain contains invalid characters. Did you mean to call VURL.Parse?");
        this.domain = domain;
        this.pathNodes = pathNodes;
        this.queryVars = queryVars;
        this.hash = hash;
    }
    /** Note that this url-parser is not quite as robust as the native URL class, so some edge-cases may be misparsed. (using "VURL.Parse(new URL(urlStr).toString())" may improve reliability) */ static Parse(urlStr, useCurrentDomainIfMissing = true, allowQuestionMarkAsVarSep = true) {
        if (useCurrentDomainIfMissing && !urlStr.startsWith("http")) urlStr = window.location.origin + (urlStr.startsWith("/") ? "" : "/") + urlStr;
        let [domainStr, pathStr, varsStr, hashStr] = $006665781f9cb255$export$fa935bb372d60240(urlStr);
        let queryVarsMap = $006665781f9cb255$var$GetUrlVars(urlStr, allowQuestionMarkAsVarSep);
        let result = new $006665781f9cb255$export$e59598f920324e5b();
        result.domain = domainStr;
        result.pathNodes = pathStr.length ? pathStr.split("/") : [];
        for (let key of Object.keys(queryVarsMap))result.queryVars.push(new $006665781f9cb255$export$a90c0bb0b625769b(key, queryVarsMap[key]));
        result.hash = hashStr;
        return result;
    }
    static FromLocationObject(location) {
        // todo: have this support all Location properties, not just those used by connected-react-router
        let result = $006665781f9cb255$export$e59598f920324e5b.Parse(location ? (location.pathname || "") + (location.search || "") + (location.hash || "") : "");
        //if (normalize) result = result.Normalized();
        return result;
    }
    // doesn't supply all the properties of a Location object, but supplies the most common
    ToLocationObject() {
        return {
            pathname: this.toString({
                domain: false,
                path: true,
                queryVars: false,
                hash: false
            }),
            search: this.toString({
                domain: false,
                pathStartSlash: false,
                path: false,
                queryVars: true,
                hash: false
            }),
            hash: this.toString({
                domain: false,
                pathStartSlash: false,
                path: false,
                queryVars: false,
                hash: true
            }),
            key: "URLKey_" + Date.now()
        };
    }
    DomainStr(withProtocol = true) {
        return withProtocol ? this.domain : this.DomainWithoutProtocol;
    }
    get Protocol() {
        return this.domain && (0, $ccace40069512cd2$export$29246bb2b9c16932)(this.domain).Contains("://") ? this.domain.substr(0, this.domain.indexOf("://")) : null;
    }
    get DomainWithoutProtocol() {
        return this.domain && (0, $ccace40069512cd2$export$29246bb2b9c16932)(this.domain).Contains("://") ? this.domain.substr(this.domain.indexOf("://") + 3) : this.domain;
    }
    PathStr(pathStartSlash) {
        let result = "";
        if (pathStartSlash) result += "/";
        // path-nodes
        if (this.pathNodes.length) result += this.pathNodes.join("/");
        return result;
    }
    get QueryStr() {
        let result = "";
        for (let [index, queryVar] of this.queryVars.entries())result += (index == 0 ? "?" : "&") + queryVar.name + "=" + queryVar.value;
        return result;
    }
    GetQueryVar(name) {
        let entry = this.queryVars.find((a)=>a.name == name);
        return entry ? entry.value : undefined;
    }
    SetQueryVar(name, value) {
        let existingEntry = this.queryVars.find((a)=>a.name == name);
        if (existingEntry) existingEntry.value = value;
        else this.queryVars.push(new $006665781f9cb255$export$a90c0bb0b625769b(name, value));
    }
    get HashStr() {
        if (!this.hash) return "";
        return "#" + this.hash;
    }
    Clone() {
        return new $006665781f9cb255$export$e59598f920324e5b(this.domain, this.pathNodes.slice(), this.queryVars.map((a)=>a.Clone()), this.hash);
    }
    /*Normalized() {
        let result = this.Clone();
        if (!rootPages.Contains(result.pathNodes[0])) {
            result.pathNodes.Insert(0, "home");
        }
        if (result.pathNodes[1] == null && rootPageDefaultChilds[result.pathNodes[0]]) {
            result.pathNodes.Insert(1, rootPageDefaultChilds[result.pathNodes[0]]);
        }
        return result;
    }*/ toString(options) {
        options = (0, $bff1a0df7235a3e6$export$a9c23c6ac3fc3eca)({
            domain: true,
            domain_protocol: true,
            pathStartSlash: "auto",
            path: true,
            queryVars: true,
            hash: true
        }, options);
        let result = "";
        // domain
        if (options.domain) result += this.DomainStr(options.domain_protocol);
        //if (options.forceSlashAfterDomain || (options.path && this.pathNodes.length) || (options.queryVars && this.queryVars.length) || (options.hash && this.hash))
        let pathStartSlash_auto = result.length == 0 || options.path && this.pathNodes.length || options.queryVars && this.queryVars.length || options.hash && this.hash;
        let pathStartSlash = options.pathStartSlash == true || options.pathStartSlash == "auto" && pathStartSlash_auto;
        if (pathStartSlash) result += "/";
        if (options.path) result += this.PathStr(false);
        if (options.queryVars) result += this.QueryStr;
        if (options.hash) result += this.HashStr;
        (0, $f9c728f16c05ea72$export$14647bdf767968d3)(!result.startsWith("//"), `URL toString() result cannot start with "//". (it's probably an error)`);
        return result;
    }
    toString_OptIn(options) {
        options = (0, $bff1a0df7235a3e6$export$a9c23c6ac3fc3eca)({
            domain: false,
            path: false,
            queryVars: false,
            hash: false
        }, options);
        return this.toString(options);
    }
}
function $006665781f9cb255$var$AsPartial(obj) {
    return obj;
}
class $006665781f9cb255$export$a90c0bb0b625769b {
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
    Clone() {
        return new $006665781f9cb255$export$a90c0bb0b625769b(this.name, this.value);
    }
} // todo: merge this functionality into the URL class
 /*export function GetPathNodes(path = GetUrlPath(), makeFull = true) {
    /*let location = State().router;
    if (location == null) return "/";
    return location.pathname.split("/")[1];*#/
    
    let pathNodes = path.split("/").Where(a=>a.length > 0);
    if (makeFull) {
        if (!rootPages.Contains(pathNodes[0]))
            pathNodes.Insert(0, "home");
        if (pathNodes[1] == null)
            pathNodes.Insert(1, rootPageDefaultChilds[pathNodes[0]]);
    }
    return pathNodes;
}
export function GetPath(path = GetUrlPath(), makeFull = true) {
    return GetPathNodes(path, makeFull).join("/");
}*/ 




class $b6c606a56786d149$export$bf2a15d34f3c441c {
    constructor(){
        this.resultUpdateCount = 0;
    }
}
const $b6c606a56786d149$export$88f527bbd74a5496 = {};
function $b6c606a56786d149$export$e88570d207afe5d2(transformType, staticProps) {
    //let storageKey = transformType + "|" + JSON.stringify(staticProps);
    const storageKey = `${transformType}|${staticProps.join("|")}`;
    const storage = $b6c606a56786d149$export$88f527bbd74a5496[storageKey] || ($b6c606a56786d149$export$88f527bbd74a5496[storageKey] = new $b6c606a56786d149$export$bf2a15d34f3c441c());
    return storage;
}
function $b6c606a56786d149$export$2a5badc52685bda1(transformType, staticProps, dynamicProps, transformFunc) {
    //Assert(dynamicProps != null);
    const storage = $b6c606a56786d149$export$e88570d207afe5d2(transformType, staticProps);
    if (!(0, $bff1a0df7235a3e6$export$ad886ff608f37420)(dynamicProps, storage.lastDynamicProps) || storage.resultUpdateCount == 0) {
        /*MaybeLog(a=>a.cacheUpdates,
            ()=>`Recalculating cache. @Type:${transformType} @StaticProps:${ToJSON(staticProps)} @DynamicProps:${ToJSON(dynamicProps)} @TransformFunc:${transformFunc}`);*/ storage.lastDynamicProps = dynamicProps;
        storage.lastDebugInfo = {};
        storage.lastResult = transformFunc(storage.lastDebugInfo, staticProps, dynamicProps);
        storage.resultUpdateCount++;
    }
    return storage.lastResult;
}
function $b6c606a56786d149$export$acfb2464df086fdb(...maps) {
    var result = {};
    (0, $99bc7ec9b00ad794$exports.ArrayCE)(maps).ForEach((map, mapIndex)=>{
        if (map == null) return "continue";
        Object.keys(map).forEach((key)=>{
            result[`${mapIndex}_${key}`] = map[key];
        });
    });
    return result;
}


var $8fa580a7c1504ab3$exports = {};

$parcel$export($8fa580a7c1504ab3$exports, "Vector2", () => $8fa580a7c1504ab3$export$c977b3e384af9ae1, (v) => $8fa580a7c1504ab3$export$c977b3e384af9ae1 = v);
$parcel$export($8fa580a7c1504ab3$exports, "VRect", () => $8fa580a7c1504ab3$export$1b89232acc4de8b8, (v) => $8fa580a7c1504ab3$export$1b89232acc4de8b8 = v);


var $8fa580a7c1504ab3$var$__decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $8fa580a7c1504ab3$var$Vector2_1, $8fa580a7c1504ab3$var$Vector3_1, $8fa580a7c1504ab3$var$VRect_1;
function $8fa580a7c1504ab3$var$IsNullOrNaN(value) {
    return value === null || (0, $558beaa9e91cc3f5$export$f375b07b95af9a54)(value);
}
function $8fa580a7c1504ab3$export$2b280c8416a5e38d(obj) {
    return obj.hasOwnProperty("x") && obj.hasOwnProperty("y");
}
let $8fa580a7c1504ab3$export$c977b3e384af9ae1 = $8fa580a7c1504ab3$var$Vector2_1 = class Vector2 {
    constructor(...args){
        var x = 0, y = 0;
        if (typeof args[0] == "number") [x, y] = args;
        else if (args[0] && args[0].x != null) [x, y] = [
            args[0].x,
            args[0].y
        ];
        else if (args[0] && args[0].left != null) [x, y] = [
            args[0].left,
            args[0].top
        ];
        (0, $f9c728f16c05ea72$export$14647bdf767968d3)(!$8fa580a7c1504ab3$var$IsNullOrNaN(x) && !$8fa580a7c1504ab3$var$IsNullOrNaN(y), "Cannot initialize Vector2i's x/y to null/NaN. (if needed, initialize to undefined)");
        this.x = x;
        this.y = y;
    }
    static get zero() {
        return new $8fa580a7c1504ab3$var$Vector2_1(0, 0);
    }
    static get one() {
        return new $8fa580a7c1504ab3$var$Vector2_1(1, 1);
    }
    /*@_VDFDeserialize() Deserialize(node) {
        var strParts = node.primitiveValue.split(" ");
        this.x = parseInt(strParts[0]);
        this.y = parseInt(strParts[1]);
    }
    @_VDFSerialize() Serialize() { return new VDFNode(this.toString()); }*/ toString() {
        return `${this.x} ${this.y}`;
    }
    Equals(other) {
        return other && this.toString() == other.toString();
    }
    NewX(xOrFunc) {
        return new $8fa580a7c1504ab3$var$Vector2_1(xOrFunc instanceof Function ? xOrFunc(this.x) : xOrFunc, this.y);
    }
    NewY(yOrFunc) {
        return new $8fa580a7c1504ab3$var$Vector2_1(this.x, yOrFunc instanceof Function ? yOrFunc(this.y) : yOrFunc);
    }
    Plus(...args) {
        const [x, y] = $8fa580a7c1504ab3$export$2b280c8416a5e38d(args[0]) ? [
            args[0].x,
            args[0].y
        ] : args;
        return new $8fa580a7c1504ab3$var$Vector2_1(this.x + x, this.y + y);
    }
    Minus(...args) {
        const [x, y] = $8fa580a7c1504ab3$export$2b280c8416a5e38d(args[0]) ? [
            args[0].x,
            args[0].y
        ] : args;
        return new $8fa580a7c1504ab3$var$Vector2_1(this.x - x, this.y - y);
    }
    Times(...args) {
        var [x, y] = $8fa580a7c1504ab3$export$2b280c8416a5e38d(args[0]) ? [
            args[0].x,
            args[0].y
        ] : args.length == 1 ? [
            args[0],
            args[0]
        ] : args;
        return new $8fa580a7c1504ab3$var$Vector2_1(this.x * x, this.y * y);
    }
    DividedBy(...args) {
        var [x, y] = $8fa580a7c1504ab3$export$2b280c8416a5e38d(args[0]) ? [
            args[0].x,
            args[0].y
        ] : args.length == 1 ? [
            args[0],
            args[0]
        ] : args;
        return new $8fa580a7c1504ab3$var$Vector2_1(this.x / x, this.y / y);
    }
    DistanceTo(other) {
        return Math.sqrt((0, $80186945e8d52e55$export$caa4dfc7169288b7)(other.x - this.x).ToPower(2) + (0, $80186945e8d52e55$export$caa4dfc7169288b7)(other.y - this.y).ToPower(2));
    }
};
$8fa580a7c1504ab3$export$c977b3e384af9ae1 = $8fa580a7c1504ab3$var$Vector2_1 = $8fa580a7c1504ab3$var$__decorate([
    (0, $bff1a0df7235a3e6$export$98f03c5d19621d70)
], $8fa580a7c1504ab3$export$c977b3e384af9ae1);
function $8fa580a7c1504ab3$export$e19da58fcd22f283(obj) {
    return obj.hasOwnProperty("x") && obj.hasOwnProperty("y") && obj.hasOwnProperty("z");
}
let $8fa580a7c1504ab3$export$64b5c384219d3699 = $8fa580a7c1504ab3$var$Vector3_1 = class Vector3 {
    constructor(x, y, z){
        (0, $f9c728f16c05ea72$export$14647bdf767968d3)(!$8fa580a7c1504ab3$var$IsNullOrNaN(x) && !$8fa580a7c1504ab3$var$IsNullOrNaN(y) && !$8fa580a7c1504ab3$var$IsNullOrNaN(z), "Cannot initialize Vector3i's x/y/z to null/NaN. (if needed, initialize to undefined)");
        this.x = x != null ? x : 0;
        this.y = y != null ? y : 0;
        this.z = z != null ? z : 0;
    }
    static get zero() {
        return new $8fa580a7c1504ab3$var$Vector3_1(0, 0, 0);
    }
    static get one() {
        return new $8fa580a7c1504ab3$var$Vector3_1(1, 1, 1);
    }
    /*@_VDFDeserialize() Deserialize(node) {
        var strParts = node.primitiveValue.split(" ");
        this.x = parseInt(strParts[0]);
        this.y = parseInt(strParts[1]);
        this.z = parseInt(strParts[2]);
    }
    //VDFSerialize() { return this.toString(); } //Swapped().toString(); }
    @_VDFSerialize() Serialize() { return new VDFNode(this.toString()); }*/ toString() {
        return `${this.x} ${this.y} ${this.z}`;
    }
    NewX(xOrFunc) {
        return new $8fa580a7c1504ab3$var$Vector3_1(xOrFunc instanceof Function ? xOrFunc(this.x) : xOrFunc, this.y, this.z);
    }
    NewY(yOrFunc) {
        return new $8fa580a7c1504ab3$var$Vector3_1(this.x, yOrFunc instanceof Function ? yOrFunc(this.y) : yOrFunc, this.z);
    }
    NewZ(zOrFunc) {
        return new $8fa580a7c1504ab3$var$Vector3_1(this.x, this.y, zOrFunc instanceof Function ? zOrFunc(this.z) : zOrFunc);
    }
    Minus(...args) {
        const [x, y, z] = $8fa580a7c1504ab3$export$e19da58fcd22f283(args[0]) ? [
            args[0].x,
            args[0].y,
            args[0].z
        ] : args;
        return new $8fa580a7c1504ab3$var$Vector3_1(this.x - x, this.y - y, this.z - z);
    }
    Plus(...args) {
        const [x, y, z] = $8fa580a7c1504ab3$export$e19da58fcd22f283(args[0]) ? [
            args[0].x,
            args[0].y,
            args[0].z
        ] : args;
        return new $8fa580a7c1504ab3$var$Vector3_1(this.x + x, this.y + y, this.z + z);
    }
    Times(...args) {
        var [x, y, z] = $8fa580a7c1504ab3$export$e19da58fcd22f283(args[0]) ? [
            args[0].x,
            args[0].y,
            args[0].z
        ] : args.length == 1 ? [
            args[0],
            args[0],
            args[0]
        ] : args;
        return new $8fa580a7c1504ab3$var$Vector3_1(this.x * x, this.y * y, this.z * z);
    }
};
$8fa580a7c1504ab3$export$64b5c384219d3699 = $8fa580a7c1504ab3$var$Vector3_1 = $8fa580a7c1504ab3$var$__decorate([
    (0, $bff1a0df7235a3e6$export$98f03c5d19621d70)
], $8fa580a7c1504ab3$export$64b5c384219d3699);
function $8fa580a7c1504ab3$export$8bf032f94d1da2ac(obj) {
    return obj.hasOwnProperty("x") && obj.hasOwnProperty("y") && obj.hasOwnProperty("width") && obj.hasOwnProperty("height");
}
let $8fa580a7c1504ab3$export$1b89232acc4de8b8 = $8fa580a7c1504ab3$var$VRect_1 = class VRect {
    constructor(...args){
        let x, y, width, height, y0IsBottom;
        if (args.length == 2 || args.length == 3) [x, y, width, height, y0IsBottom] = [
            args[0].x,
            args[0].y,
            args[1].x,
            args[1].y,
            args[2]
        ];
        else [x, y, width, height, y0IsBottom] = args;
        (0, $f9c728f16c05ea72$export$14647bdf767968d3)(!$8fa580a7c1504ab3$var$IsNullOrNaN(x) && !$8fa580a7c1504ab3$var$IsNullOrNaN(y) && !$8fa580a7c1504ab3$var$IsNullOrNaN(width) && !$8fa580a7c1504ab3$var$IsNullOrNaN(height), "Cannot initialize VRect's x/y/width/height to null/NaN. (if needed, initialize to undefined)");
        this.x = x;
        this.y = y;
        this.width = width != null ? width : 0;
        this.height = height != null ? height : 0;
        //this.y0IsBottom = y0IsBottom != null ? y0IsBottom : false;
        if (y0IsBottom) this.y0IsBottom = y0IsBottom;
    }
    static FromLTWH(rect, y0IsBottom = false) {
        return new $8fa580a7c1504ab3$var$VRect_1(rect.left, rect.top, rect.width, rect.height, y0IsBottom);
    }
    get Left() {
        return this.x;
    }
    set Left(val) {
        var oldRight = this.Right;
        this.x = val;
        this.Right = oldRight;
    }
    get Right() {
        return this.x + this.width;
    }
    set Right(val) {
        this.width = val - this.x;
    }
    get Bottom() {
        return this.y0IsBottom ? this.y : this.y + this.height;
    }
    set Bottom(val) {
        if (this.y0IsBottom) {
            var oldTop = this.Top;
            this.y = val;
            this.Top = oldTop;
        } else this.height = val - this.y;
    }
    get Top() {
        return this.y0IsBottom ? this.y + this.height : this.y;
    }
    set Top(val) {
        if (this.y0IsBottom) this.height = val - this.y;
        else {
            const oldBottom = this.Bottom;
            this.y = val;
            this.Bottom = oldBottom;
        }
    }
    get Position() {
        return new $8fa580a7c1504ab3$export$c977b3e384af9ae1(this.x, this.y);
    }
    set Position(val) {
        this.x = val.x;
        this.y = val.y;
    }
    get Size() {
        return new $8fa580a7c1504ab3$export$c977b3e384af9ae1(this.width, this.height);
    }
    set Size(val) {
        this.width = val.x;
        this.height = val.y;
    }
    get Center() {
        return new $8fa580a7c1504ab3$export$c977b3e384af9ae1(this.x + this.width / 2, this.y + this.height / 2);
    }
    set Center(val) {
        const offset = val.Minus(this.Center);
        this.Position = this.Position.Plus(offset);
    }
    /*@_VDFDeserialize() Deserialize(node) {
        var strParts = node.primitiveValue.split(" ");
        this.x = parseInt(strParts[0]);
        this.y = parseInt(strParts[1]);
        this.width = parseInt(strParts[2]);
        this.height = parseInt(strParts[3]);
    }
    @_VDFSerialize() Serialize() { return new VDFNode(this.toString()); }*/ toString() {
        return `${this.x} ${this.y} ${this.width} ${this.height}`;
    }
    Equals(other) {
        if (!(other instanceof $8fa580a7c1504ab3$var$VRect_1)) return false;
        return this.toString() == other.toString();
    }
    NewX(valOrFunc) {
        return (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(this.Clone()).VSet({
            x: valOrFunc instanceof Function ? valOrFunc(this.x) : valOrFunc
        });
    }
    NewLeft(valOrFunc) {
        return (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(this.Clone()).VSet({
            Left: valOrFunc instanceof Function ? valOrFunc(this.Left) : valOrFunc
        });
    }
    NewRight(valOrFunc) {
        return (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(this.Clone()).VSet({
            Right: valOrFunc instanceof Function ? valOrFunc(this.Right) : valOrFunc
        });
    }
    NewY(valOrFunc) {
        return (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(this.Clone()).VSet({
            y: valOrFunc instanceof Function ? valOrFunc(this.y) : valOrFunc
        });
    }
    NewBottom(valOrFunc) {
        return (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(this.Clone()).VSet({
            Bottom: valOrFunc instanceof Function ? valOrFunc(this.Bottom) : valOrFunc
        });
    }
    NewTop(valOrFunc) {
        return (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(this.Clone()).VSet({
            Top: valOrFunc instanceof Function ? valOrFunc(this.Top) : valOrFunc
        });
    }
    NewPosition(valOrFunc) {
        return (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(this.Clone()).VSet({
            Position: valOrFunc instanceof Function ? valOrFunc(this.Position) : valOrFunc
        });
    }
    NewWidth(valOrFunc) {
        return (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(this.Clone()).VSet({
            width: valOrFunc instanceof Function ? valOrFunc(this.width) : valOrFunc
        });
    }
    NewHeight(valOrFunc) {
        return (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(this.Clone()).VSet({
            height: valOrFunc instanceof Function ? valOrFunc(this.height) : valOrFunc
        });
    }
    NewSize(valOrFunc) {
        return (0, $1216bcf1d31d00c6$export$982d7f197acc6f94)(this.Clone()).VSet({
            Size: valOrFunc instanceof Function ? valOrFunc(this.Size) : valOrFunc
        });
    }
    Grow(amountOnEachSide) {
        return new $8fa580a7c1504ab3$var$VRect_1(this.x - amountOnEachSide, this.y - amountOnEachSide, this.width + amountOnEachSide * 2, this.height + amountOnEachSide * 2);
    }
    Encapsulating(rect) {
        var posX = Math.min(this.x, rect.x);
        var posY = Math.min(this.y, rect.y);
        return new $8fa580a7c1504ab3$var$VRect_1(posX, posY, Math.max(this.x + this.width, rect.x + rect.width) - posX, Math.max(this.y + this.height, rect.y + rect.height) - posY);
    }
    Encapsulate(rect) {
        var oldRight = this.x + this.width;
        var oldBottom = this.y + this.height;
        this.x = Math.min(this.x, rect.x);
        this.y = Math.min(this.y, rect.y);
        this.width = Math.max(oldRight, rect.x + rect.width) - this.x;
        this.height = Math.max(oldBottom, rect.y + rect.height) - this.y;
    }
    Intersects(other, countTouchAsIntersect = false) {
        //return this.Right > other.Left && this.Left < other.Right && this.Bottom > other.Top && this.Top < other.Bottom;
        if (countTouchAsIntersect) return this.Left <= other.Right && this.Right >= other.Left && this.Top <= other.Bottom && this.Bottom >= other.Top;
        return this.Left < other.Right && this.Right > other.Left && this.Top < other.Bottom && this.Bottom > other.Top;
    }
    /** Returns true if rect would intersect the other, when wrapped to the 2/8 potential "other-sides" of given frame/backdrop. (-x, +x, -y, +y, -x -y, -x +y, +x -y, +x +y)
     * (note that it does the checks "stupidly", ie. just checking all possible switch-side variants, without checking if "switched side" version is actually on or even near the actual frame/backdrop) */ Intersects_Advanced(other, options) {
        const variantsToCompare = [
            this
        ];
        if (options.xWrappedBy) variantsToCompare.push(...(0, $99bc7ec9b00ad794$exports.ArrayCE)(variantsToCompare).SelectMany((base)=>{
            return [
                base,
                base.NewX((x)=>x - options.xWrappedBy),
                base.NewX((x)=>x + options.xWrappedBy)
            ];
        }));
        if (options.yWrappedBy) variantsToCompare.push(...(0, $99bc7ec9b00ad794$exports.ArrayCE)(variantsToCompare).SelectMany((base)=>{
            return [
                base,
                base.NewY((y)=>y - options.yWrappedBy),
                base.NewY((y)=>y + options.yWrappedBy)
            ];
        }));
        return (0, $99bc7ec9b00ad794$exports.ArrayCE)(variantsToCompare).Any((a)=>a.Intersects(other));
    }
    Clone() {
        return new $8fa580a7c1504ab3$var$VRect_1(this.x, this.y, this.width, this.height);
    }
};
$8fa580a7c1504ab3$export$1b89232acc4de8b8 = $8fa580a7c1504ab3$var$VRect_1 = $8fa580a7c1504ab3$var$__decorate([
    (0, $bff1a0df7235a3e6$export$98f03c5d19621d70)
], $8fa580a7c1504ab3$export$1b89232acc4de8b8);
let $8fa580a7c1504ab3$export$a7046acaf8c8bc5f = class VBounds {
    constructor(position, size){
        this.position = position;
        this.size = size;
    }
    /*@_VDFDeserialize() Deserialize(node) {
        var parts = node.primitiveValue.split("|");
        var posParts = parts[0].split(" ");
        this.position = new VVector3(parseFloat(posParts[0]), parseFloat(posParts[1]), parseFloat(posParts[2]));
        var sizeParts = parts[1].split(" ");
        this.size = new VVector3(parseFloat(sizeParts[0]), parseFloat(sizeParts[1]), parseFloat(sizeParts[2]));
    }
    @_VDFSerialize() Serialize() { return new VDFNode(this.toString()); }*/ toString() {
        return `${this.position.x} ${this.position.y} ${this.position.z}|${this.size.x} ${this.size.y} ${this.size.z}`;
    }
};
$8fa580a7c1504ab3$export$a7046acaf8c8bc5f = $8fa580a7c1504ab3$var$__decorate([
    (0, $bff1a0df7235a3e6$export$98f03c5d19621d70)
], $8fa580a7c1504ab3$export$a7046acaf8c8bc5f);


$parcel$exportWildcard($e0df5332b064be86$exports, $99bc7ec9b00ad794$exports);
$parcel$exportWildcard($e0df5332b064be86$exports, $2fca4915041bc01d$exports);
$parcel$exportWildcard($e0df5332b064be86$exports, $40579b2446fbe655$exports);
$parcel$exportWildcard($e0df5332b064be86$exports, $8fa580a7c1504ab3$exports);



let $ac2e27c51d668d5d$export$4359ec6339fa2223 = {};
function $ac2e27c51d668d5d$export$9f6884debf09f9e(config) {
    $ac2e27c51d668d5d$export$4359ec6339fa2223 = config;
}


var $b3954756c9fc792f$var$_a, $b3954756c9fc792f$var$_b, $b3954756c9fc792f$var$_c, $b3954756c9fc792f$var$_d;
const $b3954756c9fc792f$var$require = (0, $lJiUQ$module.createRequire)("file:///node_modules/windows-ffi/Dist/Manager.js");
let $b3954756c9fc792f$export$f2502618a1e089ae = ($b3954756c9fc792f$var$_a = (0, $ac2e27c51d668d5d$export$4359ec6339fa2223).ffi) !== null && $b3954756c9fc792f$var$_a !== void 0 ? $b3954756c9fc792f$var$_a : $b3954756c9fc792f$var$require("ffi-napi");
let $b3954756c9fc792f$export$eff4d24c3ff7876e = ($b3954756c9fc792f$var$_b = (0, $ac2e27c51d668d5d$export$4359ec6339fa2223).ref) !== null && $b3954756c9fc792f$var$_b !== void 0 ? $b3954756c9fc792f$var$_b : $b3954756c9fc792f$var$require("ref-napi");
let $b3954756c9fc792f$export$b7e4ab1bff538f6f = ($b3954756c9fc792f$var$_c = (0, $ac2e27c51d668d5d$export$4359ec6339fa2223).refStructDI) !== null && $b3954756c9fc792f$var$_c !== void 0 ? $b3954756c9fc792f$var$_c : $b3954756c9fc792f$var$require("ref-struct-di");
let $b3954756c9fc792f$export$9a6d0121cbf6fed1 = ($b3954756c9fc792f$var$_d = (0, $ac2e27c51d668d5d$export$4359ec6339fa2223).StructType) !== null && $b3954756c9fc792f$var$_d !== void 0 ? $b3954756c9fc792f$var$_d : $b3954756c9fc792f$export$b7e4ab1bff538f6f($b3954756c9fc792f$export$eff4d24c3ff7876e);



const $2c7d42451d1e78bd$export$d5eaa87208781091 = (0, $b3954756c9fc792f$export$eff4d24c3ff7876e).refType("int");
const $2c7d42451d1e78bd$export$d3151962760b0eac = (0, $b3954756c9fc792f$export$9a6d0121cbf6fed1)({
    x: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.long,
    y: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.long
});
const $2c7d42451d1e78bd$export$f9aa4097c3e2b1a9 = (0, $b3954756c9fc792f$export$9a6d0121cbf6fed1)({
    left: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.long,
    top: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.long,
    right: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.long,
    bottom: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.long
});
const $2c7d42451d1e78bd$export$f114762a085bdc3f = (0, $b3954756c9fc792f$export$eff4d24c3ff7876e).refType($2c7d42451d1e78bd$export$f9aa4097c3e2b1a9);
var $2c7d42451d1e78bd$export$8e38662e3e297ed0;
(function(BitmapCompressionMode1) {
    BitmapCompressionMode1[BitmapCompressionMode1["BI_RGB"] = 0] = "BI_RGB";
    BitmapCompressionMode1[BitmapCompressionMode1["BI_RLE8"] = 1] = "BI_RLE8";
    BitmapCompressionMode1[BitmapCompressionMode1["BI_RLE4"] = 2] = "BI_RLE4";
    BitmapCompressionMode1[BitmapCompressionMode1["BI_BITFIELDS"] = 3] = "BI_BITFIELDS";
    BitmapCompressionMode1[BitmapCompressionMode1["BI_JPEG"] = 4] = "BI_JPEG";
    BitmapCompressionMode1[BitmapCompressionMode1["BI_PNG"] = 5] = "BI_PNG";
})($2c7d42451d1e78bd$export$8e38662e3e297ed0 || ($2c7d42451d1e78bd$export$8e38662e3e297ed0 = {}));
var $2c7d42451d1e78bd$export$57e15596a4c7231f;
(function(DIB_Color_Mode1) {
    DIB_Color_Mode1[DIB_Color_Mode1["DIB_RGB_COLORS"] = 0] = "DIB_RGB_COLORS";
    DIB_Color_Mode1[DIB_Color_Mode1["DIB_PAL_COLORS"] = 1] = "DIB_PAL_COLORS";
})($2c7d42451d1e78bd$export$57e15596a4c7231f || ($2c7d42451d1e78bd$export$57e15596a4c7231f = {}));
const $2c7d42451d1e78bd$export$45e15731b33a8131 = (0, $b3954756c9fc792f$export$9a6d0121cbf6fed1)({
    bmType: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.long,
    bmWidth: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.long,
    bmHeight: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.long,
    bmWidthBytes: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.long,
    bmPlanes: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.uint16,
    bmBitsPixel: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.uint16,
    //pointerPadding: ffi.types.long, // added from SO answer below, but shouldn't be necessary I think
    //bmBits: ffi.types.void,
    //bmBits: "pointer",
    bmBits: "ulonglong"
});
const $2c7d42451d1e78bd$export$462becd5fad16474 = (0, $b3954756c9fc792f$export$9a6d0121cbf6fed1)({
    // from docs (linked above)
    biSize: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.uint32,
    biWidth: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.int32,
    biHeight: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.int32,
    biPlanes: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.ushort,
    biBitCount: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.ushort,
    biCompression: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.uint32,
    biSizeImage: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.uint32,
    biXPelsPerMeter: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.int32,
    biYPelsPerMeter: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.int32,
    biClrUsed: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.uint32,
    biClrImportant: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.uint32
});
const $2c7d42451d1e78bd$export$cd15b4e17d65648c = (0, $b3954756c9fc792f$export$9a6d0121cbf6fed1)({
    red: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.byte,
    green: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.byte,
    blue: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.byte,
    alpha: (0, $b3954756c9fc792f$export$f2502618a1e089ae).types.byte
});





function $b3620b0bc89ba3ca$export$64a509f3808d08a0(dll, shape) {
    return (0, $b3954756c9fc792f$export$f2502618a1e089ae).Library(dll, shape);
}


const $10b86d9ff0152615$var$handle = "uint32";
const $10b86d9ff0152615$export$79b32ae2b7bd7c6c = (0, $b3620b0bc89ba3ca$export$64a509f3808d08a0)("gdi32", {
    "CreateCompatibleDC": [
        $10b86d9ff0152615$var$handle,
        [
            $10b86d9ff0152615$var$handle
        ]
    ],
    "CreateCompatibleBitmap": [
        $10b86d9ff0152615$var$handle,
        [
            $10b86d9ff0152615$var$handle,
            "int32",
            "int32"
        ]
    ],
    "GetPixel": [
        (0, $2c7d42451d1e78bd$export$cd15b4e17d65648c),
        [
            $10b86d9ff0152615$var$handle,
            "int32",
            "int32"
        ]
    ],
    "SelectObject": [
        $10b86d9ff0152615$var$handle,
        [
            $10b86d9ff0152615$var$handle,
            $10b86d9ff0152615$var$handle
        ]
    ],
    "GetObjectA": [
        "int32",
        [
            $10b86d9ff0152615$var$handle,
            "int32",
            (0, $b3954756c9fc792f$export$eff4d24c3ff7876e).refType((0, $2c7d42451d1e78bd$export$45e15731b33a8131))
        ]
    ],
    "DeleteObject": [
        "bool",
        [
            $10b86d9ff0152615$var$handle
        ]
    ],
    "BitBlt": [
        "bool",
        [
            $10b86d9ff0152615$var$handle,
            "int32",
            "int32",
            "int32",
            "int32",
            $10b86d9ff0152615$var$handle,
            "int32",
            "int32",
            "int32"
        ]
    ],
    "GetDIBits": [
        "int32",
        [
            $10b86d9ff0152615$var$handle,
            $10b86d9ff0152615$var$handle,
            "uint32",
            "uint32",
            (0, $b3954756c9fc792f$export$eff4d24c3ff7876e).refType((0, $2c7d42451d1e78bd$export$45e15731b33a8131)),
            (0, $b3954756c9fc792f$export$eff4d24c3ff7876e).refType((0, $2c7d42451d1e78bd$export$462becd5fad16474)),
            "int32"
        ]
    ]
});



const $3841221631af5fa7$export$d2f41e5ea97da1d5 = (0, $b3620b0bc89ba3ca$export$64a509f3808d08a0)("kernel32", {
    "GlobalUnlock": [
        "bool",
        [
            "int32"
        ]
    ],
    "GlobalFree": [
        "int32",
        [
            "int32"
        ]
    ]
});



var $95b44f6f195e6e1f$export$221d6b1ca14f04a3;
(function(SuspendState1) {
    SuspendState1[SuspendState1["Sleep"] = 0] = "Sleep";
})($95b44f6f195e6e1f$export$221d6b1ca14f04a3 || ($95b44f6f195e6e1f$export$221d6b1ca14f04a3 = {}));
var $95b44f6f195e6e1f$var$powrprof = (0, $b3954756c9fc792f$export$f2502618a1e089ae).Library("powrprof.dll", {
    SetSuspendState: [
        "int",
        [
            "int",
            "int",
            "int"
        ]
    ]
});
function $95b44f6f195e6e1f$export$731fac7eb53fb74f(state) {
    if (state == $95b44f6f195e6e1f$export$221d6b1ca14f04a3.Sleep) $95b44f6f195e6e1f$var$powrprof.SetSuspendState(0, 0, 0);
}





const $a787081e692d4b5a$export$4b754a7d794e4e0d = (0, $b3620b0bc89ba3ca$export$64a509f3808d08a0)("user32", {
    ClipCursor: [
        "bool",
        [
            (0, $2c7d42451d1e78bd$export$f9aa4097c3e2b1a9)
        ]
    ],
    //ClipCursor: ["bool", [RectPtr]],
    mouse_event: [
        "void",
        [
            "int32",
            "int32",
            "int32",
            "int32",
            "int32"
        ]
    ],
    //GetCursorPos: ["bool", ["pointer"]],
    GetCursorPos: [
        "bool",
        [
            (0, $b3954756c9fc792f$export$eff4d24c3ff7876e).refType((0, $2c7d42451d1e78bd$export$d3151962760b0eac))
        ]
    ],
    SetCursorPos: [
        "long",
        [
            "long",
            "long"
        ]
    ],
    //SendMessageA: ["int64", ["int32", "uint32", "int32", "int32"]]
    SendMessageA: [
        "int32",
        [
            "long",
            "int32",
            "long",
            "int32"
        ]
    ],
    PostMessageA: [
        "int32",
        [
            "long",
            "int32",
            "long",
            "int32"
        ]
    ],
    //WindowFromPoint: ["int", [PointStruct]],
    SystemParametersInfoA: [
        "bool",
        [
            "uint",
            "uint",
            "pointer",
            "uint"
        ]
    ],
    GetDC: [
        "ulong",
        [
            "int32"
        ]
    ],
    ReleaseDC: [
        "ulong",
        [
            "uint32",
            "uint32"
        ]
    ],
    GetDesktopWindow: [
        "int32",
        []
    ],
    GetClientRect: [
        "int32",
        [
            "int32",
            (0, $b3954756c9fc792f$export$eff4d24c3ff7876e).refType((0, $2c7d42451d1e78bd$export$f9aa4097c3e2b1a9))
        ]
    ]
});



var $516b669531f3cb0a$var$user32 = new (0, $b3954756c9fc792f$export$f2502618a1e089ae).Library("user32", {
    "GetForegroundWindow": [
        "int32",
        []
    ],
    "GetWindowTextA": [
        "int32",
        [
            "int32",
            "string",
            "int32"
        ]
    ]
});
var $516b669531f3cb0a$var$GetForegroundWindowHandle_cache = {};
function $516b669531f3cb0a$export$efab28f78343218c(allowCacheWithin = 100) {
    if (Date.now() - $516b669531f3cb0a$var$GetForegroundWindowHandle_cache.time <= allowCacheWithin) return $516b669531f3cb0a$var$GetForegroundWindowHandle_cache.value;
    const result = $516b669531f3cb0a$var$user32.GetForegroundWindow();
    Object.assign($516b669531f3cb0a$var$GetForegroundWindowHandle_cache, {
        value: result,
        time: Date.now()
    });
    return result;
}
const $516b669531f3cb0a$var$GetForegroundWindowText_buffer = new Buffer(8192); // 8192 is first pow-of-2 which works for max-title-length Chrome tabs
$516b669531f3cb0a$var$GetForegroundWindowText_buffer["type"] = (0, $b3954756c9fc792f$export$eff4d24c3ff7876e).types.CString; // when commented, apparently works fine anyway! (still keeping though, jic)
var $516b669531f3cb0a$var$GetForegroundWindowText_cache = {};
function $516b669531f3cb0a$export$fd6419c3b040d306(allowCacheWithin = 100) {
    if (Date.now() - $516b669531f3cb0a$var$GetForegroundWindowText_cache.time <= allowCacheWithin) return $516b669531f3cb0a$var$GetForegroundWindowText_cache.value;
    //buffer.type = ref.types.CString;
    var handle = $516b669531f3cb0a$export$efab28f78343218c();
    const result = $516b669531f3cb0a$export$b4b0b1c16ea6105(handle);
    Object.assign($516b669531f3cb0a$var$GetForegroundWindowText_cache, {
        value: result,
        time: Date.now()
    });
    return result;
}
const $516b669531f3cb0a$export$accd02e2062da761 = new Map();
function $516b669531f3cb0a$export$b4b0b1c16ea6105(windowHandle, allowCacheWithin = 100) {
    var _a, _b;
    if (Date.now() - ((_b = (_a = $516b669531f3cb0a$export$accd02e2062da761.get(windowHandle)) === null || _a === void 0 ? void 0 : _a.time) !== null && _b !== void 0 ? _b : 0) <= allowCacheWithin) return $516b669531f3cb0a$export$accd02e2062da761.get(windowHandle).value;
    //buffer.type = ref.types.CString;
    let length = $516b669531f3cb0a$var$user32.GetWindowTextA(windowHandle, $516b669531f3cb0a$var$GetForegroundWindowText_buffer, $516b669531f3cb0a$var$GetForegroundWindowText_buffer.length);
    const result = $516b669531f3cb0a$var$GetForegroundWindowText_buffer.toString().substr(0, length);
    $516b669531f3cb0a$export$accd02e2062da761.set(windowHandle, {
        value: result,
        time: Date.now()
    });
    return result;
}


var $ca6f2c5ffb6cb163$exports = {};
/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */ (function(global, factory) {
    $ca6f2c5ffb6cb163$exports = factory();
})($ca6f2c5ffb6cb163$exports, function() {
    "use strict";
    var limit$2 = function(x, min, max) {
        if (min === void 0) min = 0;
        if (max === void 0) max = 1;
        return x < min ? min : x > max ? max : x;
    };
    var limit$1 = limit$2;
    var clip_rgb$3 = function(rgb) {
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for(var i = 0; i <= 3; i++){
            if (i < 3) {
                if (rgb[i] < 0 || rgb[i] > 255) rgb._clipped = true;
                rgb[i] = limit$1(rgb[i], 0, 255);
            } else if (i === 3) rgb[i] = limit$1(rgb[i], 0, 1);
        }
        return rgb;
    };
    // ported from jQuery's $.type
    var classToType = {};
    for(var i$11 = 0, list$1 = [
        "Boolean",
        "Number",
        "String",
        "Function",
        "Array",
        "Date",
        "RegExp",
        "Undefined",
        "Null"
    ]; i$11 < list$1.length; i$11 += 1){
        var name = list$1[i$11];
        classToType["[object " + name + "]"] = name.toLowerCase();
    }
    var type$p = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
    };
    var type$o = type$p;
    var unpack$B = function(args, keyOrder) {
        if (keyOrder === void 0) keyOrder = null;
        // if called with more than 3 arguments, we return the arguments
        if (args.length >= 3) return Array.prototype.slice.call(args);
        // with less than 3 args we check if first arg is object
        // and use the keyOrder string to extract and sort properties
        if (type$o(args[0]) == "object" && keyOrder) return keyOrder.split("").filter(function(k) {
            return args[0][k] !== undefined;
        }).map(function(k) {
            return args[0][k];
        });
        // otherwise we just return the first argument
        // (which we suppose is an array of args)
        return args[0];
    };
    var type$n = type$p;
    var last$4 = function(args) {
        if (args.length < 2) return null;
        var l = args.length - 1;
        if (type$n(args[l]) == "string") return args[l].toLowerCase();
        return null;
    };
    var PI$2 = Math.PI;
    var utils = {
        clip_rgb: clip_rgb$3,
        limit: limit$2,
        type: type$p,
        unpack: unpack$B,
        last: last$4,
        PI: PI$2,
        TWOPI: PI$2 * 2,
        PITHIRD: PI$2 / 3,
        DEG2RAD: PI$2 / 180,
        RAD2DEG: 180 / PI$2
    };
    var input$h = {
        format: {},
        autodetect: []
    };
    var last$3 = utils.last;
    var clip_rgb$2 = utils.clip_rgb;
    var type$m = utils.type;
    var _input = input$h;
    var Color$D = function Color() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var me = this;
        if (type$m(args[0]) === "object" && args[0].constructor && args[0].constructor === this.constructor) // the argument is already a Color instance
        return args[0];
        // last argument could be the mode
        var mode = last$3(args);
        var autodetect = false;
        if (!mode) {
            autodetect = true;
            if (!_input.sorted) {
                _input.autodetect = _input.autodetect.sort(function(a, b) {
                    return b.p - a.p;
                });
                _input.sorted = true;
            }
            // auto-detect format
            for(var i = 0, list = _input.autodetect; i < list.length; i += 1){
                var chk = list[i];
                mode = chk.test.apply(chk, args);
                if (mode) break;
            }
        }
        if (_input.format[mode]) {
            var rgb = _input.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
            me._rgb = clip_rgb$2(rgb);
        } else throw new Error("unknown format: " + args);
        // add alpha channel
        if (me._rgb.length === 3) me._rgb.push(1);
    };
    Color$D.prototype.toString = function toString() {
        if (type$m(this.hex) == "function") return this.hex();
        return "[" + this._rgb.join(",") + "]";
    };
    var Color_1 = Color$D;
    var chroma$k = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(chroma$k.Color, [
            null
        ].concat(args)));
    };
    chroma$k.Color = Color_1;
    chroma$k.version = "2.4.2";
    var chroma_1 = chroma$k;
    var unpack$A = utils.unpack;
    var max$2 = Math.max;
    var rgb2cmyk$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$A(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var k = 1 - max$2(r, max$2(g, b));
        var f = k < 1 ? 1 / (1 - k) : 0;
        var c = (1 - r - k) * f;
        var m = (1 - g - k) * f;
        var y = (1 - b - k) * f;
        return [
            c,
            m,
            y,
            k
        ];
    };
    var rgb2cmyk_1 = rgb2cmyk$1;
    var unpack$z = utils.unpack;
    var cmyk2rgb = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$z(args, "cmyk");
        var c = args[0];
        var m = args[1];
        var y = args[2];
        var k = args[3];
        var alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) return [
            0,
            0,
            0,
            alpha
        ];
        return [
            c >= 1 ? 0 : 255 * (1 - c) * (1 - k),
            m >= 1 ? 0 : 255 * (1 - m) * (1 - k),
            y >= 1 ? 0 : 255 * (1 - y) * (1 - k),
            alpha
        ];
    };
    var cmyk2rgb_1 = cmyk2rgb;
    var chroma$j = chroma_1;
    var Color$C = Color_1;
    var input$g = input$h;
    var unpack$y = utils.unpack;
    var type$l = utils.type;
    var rgb2cmyk = rgb2cmyk_1;
    Color$C.prototype.cmyk = function() {
        return rgb2cmyk(this._rgb);
    };
    chroma$j.cmyk = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$C, [
            null
        ].concat(args, [
            "cmyk"
        ])));
    };
    input$g.format.cmyk = cmyk2rgb_1;
    input$g.autodetect.push({
        p: 2,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$y(args, "cmyk");
            if (type$l(args) === "array" && args.length === 4) return "cmyk";
        }
    });
    var unpack$x = utils.unpack;
    var last$2 = utils.last;
    var rnd1 = function(a) {
        return Math.round(a * 100) / 100;
    };
    /*
     * supported arguments:
     * - hsl2css(h,s,l)
     * - hsl2css(h,s,l,a)
     * - hsl2css([h,s,l], mode)
     * - hsl2css([h,s,l,a], mode)
     * - hsl2css({h,s,l,a}, mode)
     */ var hsl2css$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var hsla = unpack$x(args, "hsla");
        var mode = last$2(args) || "lsa";
        hsla[0] = rnd1(hsla[0] || 0);
        hsla[1] = rnd1(hsla[1] * 100) + "%";
        hsla[2] = rnd1(hsla[2] * 100) + "%";
        if (mode === "hsla" || hsla.length > 3 && hsla[3] < 1) {
            hsla[3] = hsla.length > 3 ? hsla[3] : 1;
            mode = "hsla";
        } else hsla.length = 3;
        return mode + "(" + hsla.join(",") + ")";
    };
    var hsl2css_1 = hsl2css$1;
    var unpack$w = utils.unpack;
    /*
     * supported arguments:
     * - rgb2hsl(r,g,b)
     * - rgb2hsl(r,g,b,a)
     * - rgb2hsl([r,g,b])
     * - rgb2hsl([r,g,b,a])
     * - rgb2hsl({r,g,b,a})
     */ var rgb2hsl$3 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$w(args, "rgba");
        var r = args[0];
        var g = args[1];
        var b = args[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var l = (max + min) / 2;
        var s, h;
        if (max === min) {
            s = 0;
            h = Number.NaN;
        } else s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        if (r == max) h = (g - b) / (max - min);
        else if (g == max) h = 2 + (b - r) / (max - min);
        else if (b == max) h = 4 + (r - g) / (max - min);
        h *= 60;
        if (h < 0) h += 360;
        if (args.length > 3 && args[3] !== undefined) return [
            h,
            s,
            l,
            args[3]
        ];
        return [
            h,
            s,
            l
        ];
    };
    var rgb2hsl_1 = rgb2hsl$3;
    var unpack$v = utils.unpack;
    var last$1 = utils.last;
    var hsl2css = hsl2css_1;
    var rgb2hsl$2 = rgb2hsl_1;
    var round$6 = Math.round;
    /*
     * supported arguments:
     * - rgb2css(r,g,b)
     * - rgb2css(r,g,b,a)
     * - rgb2css([r,g,b], mode)
     * - rgb2css([r,g,b,a], mode)
     * - rgb2css({r,g,b,a}, mode)
     */ var rgb2css$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var rgba = unpack$v(args, "rgba");
        var mode = last$1(args) || "rgb";
        if (mode.substr(0, 3) == "hsl") return hsl2css(rgb2hsl$2(rgba), mode);
        rgba[0] = round$6(rgba[0]);
        rgba[1] = round$6(rgba[1]);
        rgba[2] = round$6(rgba[2]);
        if (mode === "rgba" || rgba.length > 3 && rgba[3] < 1) {
            rgba[3] = rgba.length > 3 ? rgba[3] : 1;
            mode = "rgba";
        }
        return mode + "(" + rgba.slice(0, mode === "rgb" ? 3 : 4).join(",") + ")";
    };
    var rgb2css_1 = rgb2css$1;
    var unpack$u = utils.unpack;
    var round$5 = Math.round;
    var hsl2rgb$1 = function() {
        var assign;
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$u(args, "hsl");
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r, g, b;
        if (s === 0) r = g = b = l * 255;
        else {
            var t3 = [
                0,
                0,
                0
            ];
            var c = [
                0,
                0,
                0
            ];
            var t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var t1 = 2 * l - t2;
            var h_ = h / 360;
            t3[0] = h_ + 1 / 3;
            t3[1] = h_;
            t3[2] = h_ - 1 / 3;
            for(var i = 0; i < 3; i++){
                if (t3[i] < 0) t3[i] += 1;
                if (t3[i] > 1) t3[i] -= 1;
                if (6 * t3[i] < 1) c[i] = t1 + (t2 - t1) * 6 * t3[i];
                else if (2 * t3[i] < 1) c[i] = t2;
                else if (3 * t3[i] < 2) c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;
                else c[i] = t1;
            }
            assign = [
                round$5(c[0] * 255),
                round$5(c[1] * 255),
                round$5(c[2] * 255)
            ], r = assign[0], g = assign[1], b = assign[2];
        }
        if (args.length > 3) // keep alpha channel
        return [
            r,
            g,
            b,
            args[3]
        ];
        return [
            r,
            g,
            b,
            1
        ];
    };
    var hsl2rgb_1 = hsl2rgb$1;
    var hsl2rgb = hsl2rgb_1;
    var input$f = input$h;
    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var round$4 = Math.round;
    var css2rgb$1 = function(css) {
        css = css.toLowerCase().trim();
        var m;
        if (input$f.format.named) try {
            return input$f.format.named(css);
        } catch (e) {
        // eslint-disable-next-line
        }
        // rgb(250,20,0)
        if (m = css.match(RE_RGB)) {
            var rgb = m.slice(1, 4);
            for(var i = 0; i < 3; i++)rgb[i] = +rgb[i];
            rgb[3] = 1; // default alpha
            return rgb;
        }
        // rgba(250,20,0,0.4)
        if (m = css.match(RE_RGBA)) {
            var rgb$1 = m.slice(1, 5);
            for(var i$1 = 0; i$1 < 4; i$1++)rgb$1[i$1] = +rgb$1[i$1];
            return rgb$1;
        }
        // rgb(100%,0%,0%)
        if (m = css.match(RE_RGB_PCT)) {
            var rgb$2 = m.slice(1, 4);
            for(var i$2 = 0; i$2 < 3; i$2++)rgb$2[i$2] = round$4(rgb$2[i$2] * 2.55);
            rgb$2[3] = 1; // default alpha
            return rgb$2;
        }
        // rgba(100%,0%,0%,0.4)
        if (m = css.match(RE_RGBA_PCT)) {
            var rgb$3 = m.slice(1, 5);
            for(var i$3 = 0; i$3 < 3; i$3++)rgb$3[i$3] = round$4(rgb$3[i$3] * 2.55);
            rgb$3[3] = +rgb$3[3];
            return rgb$3;
        }
        // hsl(0,100%,50%)
        if (m = css.match(RE_HSL)) {
            var hsl = m.slice(1, 4);
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            var rgb$4 = hsl2rgb(hsl);
            rgb$4[3] = 1;
            return rgb$4;
        }
        // hsla(0,100%,50%,0.5)
        if (m = css.match(RE_HSLA)) {
            var hsl$1 = m.slice(1, 4);
            hsl$1[1] *= 0.01;
            hsl$1[2] *= 0.01;
            var rgb$5 = hsl2rgb(hsl$1);
            rgb$5[3] = +m[4]; // default alpha = 1
            return rgb$5;
        }
    };
    css2rgb$1.test = function(s) {
        return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
    };
    var css2rgb_1 = css2rgb$1;
    var chroma$i = chroma_1;
    var Color$B = Color_1;
    var input$e = input$h;
    var type$k = utils.type;
    var rgb2css = rgb2css_1;
    var css2rgb = css2rgb_1;
    Color$B.prototype.css = function(mode) {
        return rgb2css(this._rgb, mode);
    };
    chroma$i.css = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$B, [
            null
        ].concat(args, [
            "css"
        ])));
    };
    input$e.format.css = css2rgb;
    input$e.autodetect.push({
        p: 5,
        test: function(h) {
            var rest = [], len = arguments.length - 1;
            while(len-- > 0)rest[len] = arguments[len + 1];
            if (!rest.length && type$k(h) === "string" && css2rgb.test(h)) return "css";
        }
    });
    var Color$A = Color_1;
    var chroma$h = chroma_1;
    var input$d = input$h;
    var unpack$t = utils.unpack;
    input$d.format.gl = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var rgb = unpack$t(args, "rgba");
        rgb[0] *= 255;
        rgb[1] *= 255;
        rgb[2] *= 255;
        return rgb;
    };
    chroma$h.gl = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$A, [
            null
        ].concat(args, [
            "gl"
        ])));
    };
    Color$A.prototype.gl = function() {
        var rgb = this._rgb;
        return [
            rgb[0] / 255,
            rgb[1] / 255,
            rgb[2] / 255,
            rgb[3]
        ];
    };
    var unpack$s = utils.unpack;
    var rgb2hcg$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$s(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var c = delta * 100 / 255;
        var _g = min / (255 - delta) * 100;
        var h;
        if (delta === 0) h = Number.NaN;
        else {
            if (r === max) h = (g - b) / delta;
            if (g === max) h = 2 + (b - r) / delta;
            if (b === max) h = 4 + (r - g) / delta;
            h *= 60;
            if (h < 0) h += 360;
        }
        return [
            h,
            c,
            _g
        ];
    };
    var rgb2hcg_1 = rgb2hcg$1;
    var unpack$r = utils.unpack;
    var floor$3 = Math.floor;
    /*
     * this is basically just HSV with some minor tweaks
     *
     * hue.. [0..360]
     * chroma .. [0..1]
     * grayness .. [0..1]
     */ var hcg2rgb = function() {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$r(args, "hcg");
        var h = args[0];
        var c = args[1];
        var _g = args[2];
        var r, g, b;
        _g = _g * 255;
        var _c = c * 255;
        if (c === 0) r = g = b = _g;
        else {
            if (h === 360) h = 0;
            if (h > 360) h -= 360;
            if (h < 0) h += 360;
            h /= 60;
            var i = floor$3(h);
            var f = h - i;
            var p = _g * (1 - c);
            var q = p + _c * (1 - f);
            var t = p + _c * f;
            var v = p + _c;
            switch(i){
                case 0:
                    assign = [
                        v,
                        t,
                        p
                    ], r = assign[0], g = assign[1], b = assign[2];
                    break;
                case 1:
                    assign$1 = [
                        q,
                        v,
                        p
                    ], r = assign$1[0], g = assign$1[1], b = assign$1[2];
                    break;
                case 2:
                    assign$2 = [
                        p,
                        v,
                        t
                    ], r = assign$2[0], g = assign$2[1], b = assign$2[2];
                    break;
                case 3:
                    assign$3 = [
                        p,
                        q,
                        v
                    ], r = assign$3[0], g = assign$3[1], b = assign$3[2];
                    break;
                case 4:
                    assign$4 = [
                        t,
                        p,
                        v
                    ], r = assign$4[0], g = assign$4[1], b = assign$4[2];
                    break;
                case 5:
                    assign$5 = [
                        v,
                        p,
                        q
                    ], r = assign$5[0], g = assign$5[1], b = assign$5[2];
                    break;
            }
        }
        return [
            r,
            g,
            b,
            args.length > 3 ? args[3] : 1
        ];
    };
    var hcg2rgb_1 = hcg2rgb;
    var unpack$q = utils.unpack;
    var type$j = utils.type;
    var chroma$g = chroma_1;
    var Color$z = Color_1;
    var input$c = input$h;
    var rgb2hcg = rgb2hcg_1;
    Color$z.prototype.hcg = function() {
        return rgb2hcg(this._rgb);
    };
    chroma$g.hcg = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$z, [
            null
        ].concat(args, [
            "hcg"
        ])));
    };
    input$c.format.hcg = hcg2rgb_1;
    input$c.autodetect.push({
        p: 1,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$q(args, "hcg");
            if (type$j(args) === "array" && args.length === 3) return "hcg";
        }
    });
    var unpack$p = utils.unpack;
    var last = utils.last;
    var round$3 = Math.round;
    var rgb2hex$2 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$p(args, "rgba");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last(args) || "auto";
        if (a === undefined) a = 1;
        if (mode === "auto") mode = a < 1 ? "rgba" : "rgb";
        r = round$3(r);
        g = round$3(g);
        b = round$3(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16); //#.toUpperCase();
        str = str.substr(str.length - 6);
        var hxa = "0" + round$3(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch(mode.toLowerCase()){
            case "rgba":
                return "#" + str + hxa;
            case "argb":
                return "#" + hxa + str;
            default:
                return "#" + str;
        }
    };
    var rgb2hex_1 = rgb2hex$2;
    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
    var hex2rgb$1 = function(hex) {
        if (hex.match(RE_HEX)) {
            // remove optional leading #
            if (hex.length === 4 || hex.length === 7) hex = hex.substr(1);
            // expand short-notation to full six-digit
            if (hex.length === 3) {
                hex = hex.split("");
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            var u = parseInt(hex, 16);
            var r = u >> 16;
            var g = u >> 8 & 0xFF;
            var b = u & 0xFF;
            return [
                r,
                g,
                b,
                1
            ];
        }
        // match rgba hex format, eg #FF000077
        if (hex.match(RE_HEXA)) {
            if (hex.length === 5 || hex.length === 9) // remove optional leading #
            hex = hex.substr(1);
            // expand short-notation to full eight-digit
            if (hex.length === 4) {
                hex = hex.split("");
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
            }
            var u$1 = parseInt(hex, 16);
            var r$1 = u$1 >> 24 & 0xFF;
            var g$1 = u$1 >> 16 & 0xFF;
            var b$1 = u$1 >> 8 & 0xFF;
            var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
            return [
                r$1,
                g$1,
                b$1,
                a
            ];
        }
        // we used to check for css colors here
        // if _input.css? and rgb = _input.css hex
        //     return rgb
        throw new Error("unknown hex color: " + hex);
    };
    var hex2rgb_1 = hex2rgb$1;
    var chroma$f = chroma_1;
    var Color$y = Color_1;
    var type$i = utils.type;
    var input$b = input$h;
    var rgb2hex$1 = rgb2hex_1;
    Color$y.prototype.hex = function(mode) {
        return rgb2hex$1(this._rgb, mode);
    };
    chroma$f.hex = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$y, [
            null
        ].concat(args, [
            "hex"
        ])));
    };
    input$b.format.hex = hex2rgb_1;
    input$b.autodetect.push({
        p: 4,
        test: function(h) {
            var rest = [], len = arguments.length - 1;
            while(len-- > 0)rest[len] = arguments[len + 1];
            if (!rest.length && type$i(h) === "string" && [
                3,
                4,
                5,
                6,
                7,
                8,
                9
            ].indexOf(h.length) >= 0) return "hex";
        }
    });
    var unpack$o = utils.unpack;
    var TWOPI$2 = utils.TWOPI;
    var min$2 = Math.min;
    var sqrt$4 = Math.sqrt;
    var acos = Math.acos;
    var rgb2hsi$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
        */ var ref = unpack$o(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var h;
        var min_ = min$2(r, g, b);
        var i = (r + g + b) / 3;
        var s = i > 0 ? 1 - min_ / i : 0;
        if (s === 0) h = NaN;
        else {
            h = (r - g + (r - b)) / 2;
            h /= sqrt$4((r - g) * (r - g) + (r - b) * (g - b));
            h = acos(h);
            if (b > g) h = TWOPI$2 - h;
            h /= TWOPI$2;
        }
        return [
            h * 360,
            s,
            i
        ];
    };
    var rgb2hsi_1 = rgb2hsi$1;
    var unpack$n = utils.unpack;
    var limit = utils.limit;
    var TWOPI$1 = utils.TWOPI;
    var PITHIRD = utils.PITHIRD;
    var cos$4 = Math.cos;
    /*
     * hue [0..360]
     * saturation [0..1]
     * intensity [0..1]
     */ var hsi2rgb = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
        */ args = unpack$n(args, "hsi");
        var h = args[0];
        var s = args[1];
        var i = args[2];
        var r, g, b;
        if (isNaN(h)) h = 0;
        if (isNaN(s)) s = 0;
        // normalize hue
        if (h > 360) h -= 360;
        if (h < 0) h += 360;
        h /= 360;
        if (h < 1 / 3) {
            b = (1 - s) / 3;
            r = (1 + s * cos$4(TWOPI$1 * h) / cos$4(PITHIRD - TWOPI$1 * h)) / 3;
            g = 1 - (b + r);
        } else if (h < 2 / 3) {
            h -= 1 / 3;
            r = (1 - s) / 3;
            g = (1 + s * cos$4(TWOPI$1 * h) / cos$4(PITHIRD - TWOPI$1 * h)) / 3;
            b = 1 - (r + g);
        } else {
            h -= 2 / 3;
            g = (1 - s) / 3;
            b = (1 + s * cos$4(TWOPI$1 * h) / cos$4(PITHIRD - TWOPI$1 * h)) / 3;
            r = 1 - (g + b);
        }
        r = limit(i * r * 3);
        g = limit(i * g * 3);
        b = limit(i * b * 3);
        return [
            r * 255,
            g * 255,
            b * 255,
            args.length > 3 ? args[3] : 1
        ];
    };
    var hsi2rgb_1 = hsi2rgb;
    var unpack$m = utils.unpack;
    var type$h = utils.type;
    var chroma$e = chroma_1;
    var Color$x = Color_1;
    var input$a = input$h;
    var rgb2hsi = rgb2hsi_1;
    Color$x.prototype.hsi = function() {
        return rgb2hsi(this._rgb);
    };
    chroma$e.hsi = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$x, [
            null
        ].concat(args, [
            "hsi"
        ])));
    };
    input$a.format.hsi = hsi2rgb_1;
    input$a.autodetect.push({
        p: 2,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$m(args, "hsi");
            if (type$h(args) === "array" && args.length === 3) return "hsi";
        }
    });
    var unpack$l = utils.unpack;
    var type$g = utils.type;
    var chroma$d = chroma_1;
    var Color$w = Color_1;
    var input$9 = input$h;
    var rgb2hsl$1 = rgb2hsl_1;
    Color$w.prototype.hsl = function() {
        return rgb2hsl$1(this._rgb);
    };
    chroma$d.hsl = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$w, [
            null
        ].concat(args, [
            "hsl"
        ])));
    };
    input$9.format.hsl = hsl2rgb_1;
    input$9.autodetect.push({
        p: 2,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$l(args, "hsl");
            if (type$g(args) === "array" && args.length === 3) return "hsl";
        }
    });
    var unpack$k = utils.unpack;
    var min$1 = Math.min;
    var max$1 = Math.max;
    /*
     * supported arguments:
     * - rgb2hsv(r,g,b)
     * - rgb2hsv([r,g,b])
     * - rgb2hsv({r,g,b})
     */ var rgb2hsl = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$k(args, "rgb");
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var min_ = min$1(r, g, b);
        var max_ = max$1(r, g, b);
        var delta = max_ - min_;
        var h, s, v;
        v = max_ / 255.0;
        if (max_ === 0) {
            h = Number.NaN;
            s = 0;
        } else {
            s = delta / max_;
            if (r === max_) h = (g - b) / delta;
            if (g === max_) h = 2 + (b - r) / delta;
            if (b === max_) h = 4 + (r - g) / delta;
            h *= 60;
            if (h < 0) h += 360;
        }
        return [
            h,
            s,
            v
        ];
    };
    var rgb2hsv$1 = rgb2hsl;
    var unpack$j = utils.unpack;
    var floor$2 = Math.floor;
    var hsv2rgb = function() {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$j(args, "hsv");
        var h = args[0];
        var s = args[1];
        var v = args[2];
        var r, g, b;
        v *= 255;
        if (s === 0) r = g = b = v;
        else {
            if (h === 360) h = 0;
            if (h > 360) h -= 360;
            if (h < 0) h += 360;
            h /= 60;
            var i = floor$2(h);
            var f = h - i;
            var p = v * (1 - s);
            var q = v * (1 - s * f);
            var t = v * (1 - s * (1 - f));
            switch(i){
                case 0:
                    assign = [
                        v,
                        t,
                        p
                    ], r = assign[0], g = assign[1], b = assign[2];
                    break;
                case 1:
                    assign$1 = [
                        q,
                        v,
                        p
                    ], r = assign$1[0], g = assign$1[1], b = assign$1[2];
                    break;
                case 2:
                    assign$2 = [
                        p,
                        v,
                        t
                    ], r = assign$2[0], g = assign$2[1], b = assign$2[2];
                    break;
                case 3:
                    assign$3 = [
                        p,
                        q,
                        v
                    ], r = assign$3[0], g = assign$3[1], b = assign$3[2];
                    break;
                case 4:
                    assign$4 = [
                        t,
                        p,
                        v
                    ], r = assign$4[0], g = assign$4[1], b = assign$4[2];
                    break;
                case 5:
                    assign$5 = [
                        v,
                        p,
                        q
                    ], r = assign$5[0], g = assign$5[1], b = assign$5[2];
                    break;
            }
        }
        return [
            r,
            g,
            b,
            args.length > 3 ? args[3] : 1
        ];
    };
    var hsv2rgb_1 = hsv2rgb;
    var unpack$i = utils.unpack;
    var type$f = utils.type;
    var chroma$c = chroma_1;
    var Color$v = Color_1;
    var input$8 = input$h;
    var rgb2hsv = rgb2hsv$1;
    Color$v.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
    };
    chroma$c.hsv = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$v, [
            null
        ].concat(args, [
            "hsv"
        ])));
    };
    input$8.format.hsv = hsv2rgb_1;
    input$8.autodetect.push({
        p: 2,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$i(args, "hsv");
            if (type$f(args) === "array" && args.length === 3) return "hsv";
        }
    });
    var labConstants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,
        // D65 standard referent
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,
        t0: 0.137931034,
        t1: 0.206896552,
        t2: 0.12841855,
        t3: 0.008856452
    };
    var LAB_CONSTANTS$3 = labConstants;
    var unpack$h = utils.unpack;
    var pow$a = Math.pow;
    var rgb2lab$2 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$h(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r, g, b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [
            l < 0 ? 0 : l,
            500 * (x - y),
            200 * (y - z)
        ];
    };
    var rgb_xyz = function(r) {
        if ((r /= 255) <= 0.04045) return r / 12.92;
        return pow$a((r + 0.055) / 1.055, 2.4);
    };
    var xyz_lab = function(t) {
        if (t > LAB_CONSTANTS$3.t3) return pow$a(t, 1 / 3);
        return t / LAB_CONSTANTS$3.t2 + LAB_CONSTANTS$3.t0;
    };
    var rgb2xyz = function(r, g, b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS$3.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS$3.Yn);
        var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS$3.Zn);
        return [
            x,
            y,
            z
        ];
    };
    var rgb2lab_1 = rgb2lab$2;
    var LAB_CONSTANTS$2 = labConstants;
    var unpack$g = utils.unpack;
    var pow$9 = Math.pow;
    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */ var lab2rgb$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$g(args, "lab");
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x, y, z, r, g, b_;
        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;
        y = LAB_CONSTANTS$2.Yn * lab_xyz(y);
        x = LAB_CONSTANTS$2.Xn * lab_xyz(x);
        z = LAB_CONSTANTS$2.Zn * lab_xyz(z);
        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z); // D65 -> sRGB
        g = xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.0415560 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
        return [
            r,
            g,
            b_,
            args.length > 3 ? args[3] : 1
        ];
    };
    var xyz_rgb = function(r) {
        return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$9(r, 1 / 2.4) - 0.055);
    };
    var lab_xyz = function(t) {
        return t > LAB_CONSTANTS$2.t1 ? t * t * t : LAB_CONSTANTS$2.t2 * (t - LAB_CONSTANTS$2.t0);
    };
    var lab2rgb_1 = lab2rgb$1;
    var unpack$f = utils.unpack;
    var type$e = utils.type;
    var chroma$b = chroma_1;
    var Color$u = Color_1;
    var input$7 = input$h;
    var rgb2lab$1 = rgb2lab_1;
    Color$u.prototype.lab = function() {
        return rgb2lab$1(this._rgb);
    };
    chroma$b.lab = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$u, [
            null
        ].concat(args, [
            "lab"
        ])));
    };
    input$7.format.lab = lab2rgb_1;
    input$7.autodetect.push({
        p: 2,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$f(args, "lab");
            if (type$e(args) === "array" && args.length === 3) return "lab";
        }
    });
    var unpack$e = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt$3 = Math.sqrt;
    var atan2$2 = Math.atan2;
    var round$2 = Math.round;
    var lab2lch$2 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$e(args, "lab");
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt$3(a * a + b * b);
        var h = (atan2$2(b, a) * RAD2DEG + 360) % 360;
        if (round$2(c * 10000) === 0) h = Number.NaN;
        return [
            l,
            c,
            h
        ];
    };
    var lab2lch_1 = lab2lch$2;
    var unpack$d = utils.unpack;
    var rgb2lab = rgb2lab_1;
    var lab2lch$1 = lab2lch_1;
    var rgb2lch$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$d(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch$1(l, a, b_);
    };
    var rgb2lch_1 = rgb2lch$1;
    var unpack$c = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin$3 = Math.sin;
    var cos$3 = Math.cos;
    var lch2lab$2 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        /*
        Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
        These formulas were invented by David Dalrymple to obtain maximum contrast without going
        out of gamut if the parameters are in the range 0-1.

        A saturation multiplier was added by Gregor Aisch
        */ var ref = unpack$c(args, "lch");
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) h = 0;
        h = h * DEG2RAD;
        return [
            l,
            cos$3(h) * c,
            sin$3(h) * c
        ];
    };
    var lch2lab_1 = lch2lab$2;
    var unpack$b = utils.unpack;
    var lch2lab$1 = lch2lab_1;
    var lab2rgb = lab2rgb_1;
    var lch2rgb$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$b(args, "lch");
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab$1(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [
            r,
            g,
            b,
            args.length > 3 ? args[3] : 1
        ];
    };
    var lch2rgb_1 = lch2rgb$1;
    var unpack$a = utils.unpack;
    var lch2rgb = lch2rgb_1;
    var hcl2rgb = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var hcl = unpack$a(args, "hcl").reverse();
        return lch2rgb.apply(void 0, hcl);
    };
    var hcl2rgb_1 = hcl2rgb;
    var unpack$9 = utils.unpack;
    var type$d = utils.type;
    var chroma$a = chroma_1;
    var Color$t = Color_1;
    var input$6 = input$h;
    var rgb2lch = rgb2lch_1;
    Color$t.prototype.lch = function() {
        return rgb2lch(this._rgb);
    };
    Color$t.prototype.hcl = function() {
        return rgb2lch(this._rgb).reverse();
    };
    chroma$a.lch = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$t, [
            null
        ].concat(args, [
            "lch"
        ])));
    };
    chroma$a.hcl = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$t, [
            null
        ].concat(args, [
            "hcl"
        ])));
    };
    input$6.format.lch = lch2rgb_1;
    input$6.format.hcl = hcl2rgb_1;
    [
        "lch",
        "hcl"
    ].forEach(function(m) {
        return input$6.autodetect.push({
            p: 2,
            test: function() {
                var args = [], len = arguments.length;
                while(len--)args[len] = arguments[len];
                args = unpack$9(args, m);
                if (type$d(args) === "array" && args.length === 3) return m;
            }
        });
    });
    /**
    	X11 color names

    	http://www.w3.org/TR/css3-color/#svg-color
    */ var w3cx11$1 = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflower: "#6495ed",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        laserlemon: "#ffff54",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrod: "#fafad2",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        maroon2: "#7f0000",
        maroon3: "#b03060",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        purple2: "#7f007f",
        purple3: "#a020f0",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    };
    var w3cx11_1 = w3cx11$1;
    var Color$s = Color_1;
    var input$5 = input$h;
    var type$c = utils.type;
    var w3cx11 = w3cx11_1;
    var hex2rgb = hex2rgb_1;
    var rgb2hex = rgb2hex_1;
    Color$s.prototype.name = function() {
        var hex = rgb2hex(this._rgb, "rgb");
        for(var i = 0, list = Object.keys(w3cx11); i < list.length; i += 1){
            var n = list[i];
            if (w3cx11[n] === hex) return n.toLowerCase();
        }
        return hex;
    };
    input$5.format.named = function(name) {
        name = name.toLowerCase();
        if (w3cx11[name]) return hex2rgb(w3cx11[name]);
        throw new Error("unknown color name: " + name);
    };
    input$5.autodetect.push({
        p: 5,
        test: function(h) {
            var rest = [], len = arguments.length - 1;
            while(len-- > 0)rest[len] = arguments[len + 1];
            if (!rest.length && type$c(h) === "string" && w3cx11[h.toLowerCase()]) return "named";
        }
    });
    var unpack$8 = utils.unpack;
    var rgb2num$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$8(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        return (r << 16) + (g << 8) + b;
    };
    var rgb2num_1 = rgb2num$1;
    var type$b = utils.type;
    var num2rgb = function(num) {
        if (type$b(num) == "number" && num >= 0 && num <= 0xFFFFFF) {
            var r = num >> 16;
            var g = num >> 8 & 0xFF;
            var b = num & 0xFF;
            return [
                r,
                g,
                b,
                1
            ];
        }
        throw new Error("unknown num color: " + num);
    };
    var num2rgb_1 = num2rgb;
    var chroma$9 = chroma_1;
    var Color$r = Color_1;
    var input$4 = input$h;
    var type$a = utils.type;
    var rgb2num = rgb2num_1;
    Color$r.prototype.num = function() {
        return rgb2num(this._rgb);
    };
    chroma$9.num = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$r, [
            null
        ].concat(args, [
            "num"
        ])));
    };
    input$4.format.num = num2rgb_1;
    input$4.autodetect.push({
        p: 5,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            if (args.length === 1 && type$a(args[0]) === "number" && args[0] >= 0 && args[0] <= 0xFFFFFF) return "num";
        }
    });
    var chroma$8 = chroma_1;
    var Color$q = Color_1;
    var input$3 = input$h;
    var unpack$7 = utils.unpack;
    var type$9 = utils.type;
    var round$1 = Math.round;
    Color$q.prototype.rgb = function(rnd) {
        if (rnd === void 0) rnd = true;
        if (rnd === false) return this._rgb.slice(0, 3);
        return this._rgb.slice(0, 3).map(round$1);
    };
    Color$q.prototype.rgba = function(rnd) {
        if (rnd === void 0) rnd = true;
        return this._rgb.slice(0, 4).map(function(v, i) {
            return i < 3 ? rnd === false ? v : round$1(v) : v;
        });
    };
    chroma$8.rgb = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$q, [
            null
        ].concat(args, [
            "rgb"
        ])));
    };
    input$3.format.rgb = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var rgba = unpack$7(args, "rgba");
        if (rgba[3] === undefined) rgba[3] = 1;
        return rgba;
    };
    input$3.autodetect.push({
        p: 3,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$7(args, "rgba");
            if (type$9(args) === "array" && (args.length === 3 || args.length === 4 && type$9(args[3]) == "number" && args[3] >= 0 && args[3] <= 1)) return "rgb";
        }
    });
    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     */ var log$1 = Math.log;
    var temperature2rgb$1 = function(kelvin) {
        var temp = kelvin / 100;
        var r, g, b;
        if (temp < 66) {
            r = 255;
            g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log$1(g);
            b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log$1(b);
        } else {
            r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log$1(r);
            g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log$1(g);
            b = 255;
        }
        return [
            r,
            g,
            b,
            1
        ];
    };
    var temperature2rgb_1 = temperature2rgb$1;
    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     **/ var temperature2rgb = temperature2rgb_1;
    var unpack$6 = utils.unpack;
    var round = Math.round;
    var rgb2temperature$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var rgb = unpack$6(args, "rgb");
        var r = rgb[0], b = rgb[2];
        var minTemp = 1000;
        var maxTemp = 40000;
        var eps = 0.4;
        var temp;
        while(maxTemp - minTemp > eps){
            temp = (maxTemp + minTemp) * 0.5;
            var rgb$1 = temperature2rgb(temp);
            if (rgb$1[2] / rgb$1[0] >= b / r) maxTemp = temp;
            else minTemp = temp;
        }
        return round(temp);
    };
    var rgb2temperature_1 = rgb2temperature$1;
    var chroma$7 = chroma_1;
    var Color$p = Color_1;
    var input$2 = input$h;
    var rgb2temperature = rgb2temperature_1;
    Color$p.prototype.temp = Color$p.prototype.kelvin = Color$p.prototype.temperature = function() {
        return rgb2temperature(this._rgb);
    };
    chroma$7.temp = chroma$7.kelvin = chroma$7.temperature = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$p, [
            null
        ].concat(args, [
            "temp"
        ])));
    };
    input$2.format.temp = input$2.format.kelvin = input$2.format.temperature = temperature2rgb_1;
    var unpack$5 = utils.unpack;
    var cbrt = Math.cbrt;
    var pow$8 = Math.pow;
    var sign$1 = Math.sign;
    var rgb2oklab$2 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        // OKLab color space implementation taken from
        // https://bottosson.github.io/posts/oklab/
        var ref = unpack$5(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = [
            rgb2lrgb(r / 255),
            rgb2lrgb(g / 255),
            rgb2lrgb(b / 255)
        ];
        var lr = ref$1[0];
        var lg = ref$1[1];
        var lb = ref$1[2];
        var l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
        var m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
        var s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
        return [
            0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
        ];
    };
    var rgb2oklab_1 = rgb2oklab$2;
    function rgb2lrgb(c) {
        var abs = Math.abs(c);
        if (abs < 0.04045) return c / 12.92;
        return (sign$1(c) || 1) * pow$8((abs + 0.055) / 1.055, 2.4);
    }
    var unpack$4 = utils.unpack;
    var pow$7 = Math.pow;
    var sign = Math.sign;
    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */ var oklab2rgb$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$4(args, "lab");
        var L = args[0];
        var a = args[1];
        var b = args[2];
        var l = pow$7(L + 0.3963377774 * a + 0.2158037573 * b, 3);
        var m = pow$7(L - 0.1055613458 * a - 0.0638541728 * b, 3);
        var s = pow$7(L - 0.0894841775 * a - 1.291485548 * b, 3);
        return [
            255 * lrgb2rgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
            255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
            255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
            args.length > 3 ? args[3] : 1
        ];
    };
    var oklab2rgb_1 = oklab2rgb$1;
    function lrgb2rgb(c) {
        var abs = Math.abs(c);
        if (abs > 0.0031308) return (sign(c) || 1) * (1.055 * pow$7(abs, 1 / 2.4) - 0.055);
        return c * 12.92;
    }
    var unpack$3 = utils.unpack;
    var type$8 = utils.type;
    var chroma$6 = chroma_1;
    var Color$o = Color_1;
    var input$1 = input$h;
    var rgb2oklab$1 = rgb2oklab_1;
    Color$o.prototype.oklab = function() {
        return rgb2oklab$1(this._rgb);
    };
    chroma$6.oklab = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$o, [
            null
        ].concat(args, [
            "oklab"
        ])));
    };
    input$1.format.oklab = oklab2rgb_1;
    input$1.autodetect.push({
        p: 3,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack$3(args, "oklab");
            if (type$8(args) === "array" && args.length === 3) return "oklab";
        }
    });
    var unpack$2 = utils.unpack;
    var rgb2oklab = rgb2oklab_1;
    var lab2lch = lab2lch_1;
    var rgb2oklch$1 = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        var ref = unpack$2(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2oklab(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch(l, a, b_);
    };
    var rgb2oklch_1 = rgb2oklch$1;
    var unpack$1 = utils.unpack;
    var lch2lab = lch2lab_1;
    var oklab2rgb = oklab2rgb_1;
    var oklch2rgb = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        args = unpack$1(args, "lch");
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = oklab2rgb(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [
            r,
            g,
            b,
            args.length > 3 ? args[3] : 1
        ];
    };
    var oklch2rgb_1 = oklch2rgb;
    var unpack = utils.unpack;
    var type$7 = utils.type;
    var chroma$5 = chroma_1;
    var Color$n = Color_1;
    var input = input$h;
    var rgb2oklch = rgb2oklch_1;
    Color$n.prototype.oklch = function() {
        return rgb2oklch(this._rgb);
    };
    chroma$5.oklch = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$n, [
            null
        ].concat(args, [
            "oklch"
        ])));
    };
    input.format.oklch = oklch2rgb_1;
    input.autodetect.push({
        p: 3,
        test: function() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            args = unpack(args, "oklch");
            if (type$7(args) === "array" && args.length === 3) return "oklch";
        }
    });
    var Color$m = Color_1;
    var type$6 = utils.type;
    Color$m.prototype.alpha = function(a, mutate) {
        if (mutate === void 0) mutate = false;
        if (a !== undefined && type$6(a) === "number") {
            if (mutate) {
                this._rgb[3] = a;
                return this;
            }
            return new Color$m([
                this._rgb[0],
                this._rgb[1],
                this._rgb[2],
                a
            ], "rgb");
        }
        return this._rgb[3];
    };
    var Color$l = Color_1;
    Color$l.prototype.clipped = function() {
        return this._rgb._clipped || false;
    };
    var Color$k = Color_1;
    var LAB_CONSTANTS$1 = labConstants;
    Color$k.prototype.darken = function(amount) {
        if (amount === void 0) amount = 1;
        var me = this;
        var lab = me.lab();
        lab[0] -= LAB_CONSTANTS$1.Kn * amount;
        return new Color$k(lab, "lab").alpha(me.alpha(), true);
    };
    Color$k.prototype.brighten = function(amount) {
        if (amount === void 0) amount = 1;
        return this.darken(-amount);
    };
    Color$k.prototype.darker = Color$k.prototype.darken;
    Color$k.prototype.brighter = Color$k.prototype.brighten;
    var Color$j = Color_1;
    Color$j.prototype.get = function(mc) {
        var ref = mc.split(".");
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
            if (i > -1) return src[i];
            throw new Error("unknown channel " + channel + " in mode " + mode);
        } else return src;
    };
    var Color$i = Color_1;
    var type$5 = utils.type;
    var pow$6 = Math.pow;
    var EPS = 1e-7;
    var MAX_ITER = 20;
    Color$i.prototype.luminance = function(lum) {
        if (lum !== undefined && type$5(lum) === "number") {
            if (lum === 0) // return pure black
            return new Color$i([
                0,
                0,
                0,
                this._rgb[3]
            ], "rgb");
            if (lum === 1) // return pure white
            return new Color$i([
                255,
                255,
                255,
                this._rgb[3]
            ], "rgb");
            // compute new color using...
            var cur_lum = this.luminance();
            var mode = "rgb";
            var max_iter = MAX_ITER;
            var test = function(low, high) {
                var mid = low.interpolate(high, 0.5, mode);
                var lm = mid.luminance();
                if (Math.abs(lum - lm) < EPS || !max_iter--) // close enough
                return mid;
                return lm > lum ? test(low, mid) : test(mid, high);
            };
            var rgb = (cur_lum > lum ? test(new Color$i([
                0,
                0,
                0
            ]), this) : test(this, new Color$i([
                255,
                255,
                255
            ]))).rgb();
            return new Color$i(rgb.concat([
                this._rgb[3]
            ]));
        }
        return rgb2luminance.apply(void 0, this._rgb.slice(0, 3));
    };
    var rgb2luminance = function(r, g, b) {
        // relative luminance
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    var luminance_x = function(x) {
        x /= 255;
        return x <= 0.03928 ? x / 12.92 : pow$6((x + 0.055) / 1.055, 2.4);
    };
    var interpolator$1 = {};
    var Color$h = Color_1;
    var type$4 = utils.type;
    var interpolator = interpolator$1;
    var mix$1 = function(col1, col2, f) {
        if (f === void 0) f = 0.5;
        var rest = [], len = arguments.length - 3;
        while(len-- > 0)rest[len] = arguments[len + 3];
        var mode = rest[0] || "lrgb";
        if (!interpolator[mode] && !rest.length) // fall back to the first supported mode
        mode = Object.keys(interpolator)[0];
        if (!interpolator[mode]) throw new Error("interpolation mode " + mode + " is not defined");
        if (type$4(col1) !== "object") col1 = new Color$h(col1);
        if (type$4(col2) !== "object") col2 = new Color$h(col2);
        return interpolator[mode](col1, col2, f).alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    };
    var Color$g = Color_1;
    var mix = mix$1;
    Color$g.prototype.mix = Color$g.prototype.interpolate = function(col2, f) {
        if (f === void 0) f = 0.5;
        var rest = [], len = arguments.length - 2;
        while(len-- > 0)rest[len] = arguments[len + 2];
        return mix.apply(void 0, [
            this,
            col2,
            f
        ].concat(rest));
    };
    var Color$f = Color_1;
    Color$f.prototype.premultiply = function(mutate) {
        if (mutate === void 0) mutate = false;
        var rgb = this._rgb;
        var a = rgb[3];
        if (mutate) {
            this._rgb = [
                rgb[0] * a,
                rgb[1] * a,
                rgb[2] * a,
                a
            ];
            return this;
        } else return new Color$f([
            rgb[0] * a,
            rgb[1] * a,
            rgb[2] * a,
            a
        ], "rgb");
    };
    var Color$e = Color_1;
    var LAB_CONSTANTS = labConstants;
    Color$e.prototype.saturate = function(amount) {
        if (amount === void 0) amount = 1;
        var me = this;
        var lch = me.lch();
        lch[1] += LAB_CONSTANTS.Kn * amount;
        if (lch[1] < 0) lch[1] = 0;
        return new Color$e(lch, "lch").alpha(me.alpha(), true);
    };
    Color$e.prototype.desaturate = function(amount) {
        if (amount === void 0) amount = 1;
        return this.saturate(-amount);
    };
    var Color$d = Color_1;
    var type$3 = utils.type;
    Color$d.prototype.set = function(mc, value, mutate) {
        if (mutate === void 0) mutate = false;
        var ref = mc.split(".");
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
            if (i > -1) {
                if (type$3(value) == "string") switch(value.charAt(0)){
                    case "+":
                        src[i] += +value;
                        break;
                    case "-":
                        src[i] += +value;
                        break;
                    case "*":
                        src[i] *= +value.substr(1);
                        break;
                    case "/":
                        src[i] /= +value.substr(1);
                        break;
                    default:
                        src[i] = +value;
                }
                else if (type$3(value) === "number") src[i] = value;
                else throw new Error("unsupported value for Color.set");
                var out = new Color$d(src, mode);
                if (mutate) {
                    this._rgb = out._rgb;
                    return this;
                }
                return out;
            }
            throw new Error("unknown channel " + channel + " in mode " + mode);
        } else return src;
    };
    var Color$c = Color_1;
    var rgb1 = function(col1, col2, f) {
        var xyz0 = col1._rgb;
        var xyz1 = col2._rgb;
        return new Color$c(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "rgb");
    };
    // register interpolator
    interpolator$1.rgb = rgb1;
    var Color$b = Color_1;
    var sqrt$2 = Math.sqrt;
    var pow$5 = Math.pow;
    var lrgb = function(col1, col2, f) {
        var ref = col1._rgb;
        var x1 = ref[0];
        var y1 = ref[1];
        var z1 = ref[2];
        var ref$1 = col2._rgb;
        var x2 = ref$1[0];
        var y2 = ref$1[1];
        var z2 = ref$1[2];
        return new Color$b(sqrt$2(pow$5(x1, 2) * (1 - f) + pow$5(x2, 2) * f), sqrt$2(pow$5(y1, 2) * (1 - f) + pow$5(y2, 2) * f), sqrt$2(pow$5(z1, 2) * (1 - f) + pow$5(z2, 2) * f), "rgb");
    };
    // register interpolator
    interpolator$1.lrgb = lrgb;
    var Color$a = Color_1;
    var lab11 = function(col1, col2, f) {
        var xyz0 = col1.lab();
        var xyz1 = col2.lab();
        return new Color$a(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "lab");
    };
    // register interpolator
    interpolator$1.lab = lab11;
    var Color$9 = Color_1;
    var _hsx = function(col1, col2, f, m) {
        var assign, assign$1;
        var xyz0, xyz1;
        if (m === "hsl") {
            xyz0 = col1.hsl();
            xyz1 = col2.hsl();
        } else if (m === "hsv") {
            xyz0 = col1.hsv();
            xyz1 = col2.hsv();
        } else if (m === "hcg") {
            xyz0 = col1.hcg();
            xyz1 = col2.hcg();
        } else if (m === "hsi") {
            xyz0 = col1.hsi();
            xyz1 = col2.hsi();
        } else if (m === "lch" || m === "hcl") {
            m = "hcl";
            xyz0 = col1.hcl();
            xyz1 = col2.hcl();
        } else if (m === "oklch") {
            xyz0 = col1.oklch().reverse();
            xyz1 = col2.oklch().reverse();
        }
        var hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === "h" || m === "oklch") {
            assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2];
            assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2];
        }
        var sat, hue, lbv, dh;
        if (!isNaN(hue0) && !isNaN(hue1)) {
            // both colors have hue
            if (hue1 > hue0 && hue1 - hue0 > 180) dh = hue1 - (hue0 + 360);
            else if (hue1 < hue0 && hue0 - hue1 > 180) dh = hue1 + 360 - hue0;
            else dh = hue1 - hue0;
            hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
            hue = hue0;
            if ((lbv1 == 1 || lbv1 == 0) && m != "hsv") sat = sat0;
        } else if (!isNaN(hue1)) {
            hue = hue1;
            if ((lbv0 == 1 || lbv0 == 0) && m != "hsv") sat = sat1;
        } else hue = Number.NaN;
        if (sat === undefined) sat = sat0 + f * (sat1 - sat0);
        lbv = lbv0 + f * (lbv1 - lbv0);
        return m === "oklch" ? new Color$9([
            lbv,
            sat,
            hue
        ], m) : new Color$9([
            hue,
            sat,
            lbv
        ], m);
    };
    var interpolate_hsx$5 = _hsx;
    var lch1 = function(col1, col2, f) {
        return interpolate_hsx$5(col1, col2, f, "lch");
    };
    // register interpolator
    interpolator$1.lch = lch1;
    interpolator$1.hcl = lch1;
    var Color$8 = Color_1;
    var num1 = function(col1, col2, f) {
        var c1 = col1.num();
        var c2 = col2.num();
        return new Color$8(c1 + f * (c2 - c1), "num");
    };
    // register interpolator
    interpolator$1.num = num1;
    var interpolate_hsx$4 = _hsx;
    var hcg = function(col1, col2, f) {
        return interpolate_hsx$4(col1, col2, f, "hcg");
    };
    // register interpolator
    interpolator$1.hcg = hcg;
    var interpolate_hsx$3 = _hsx;
    var hsi = function(col1, col2, f) {
        return interpolate_hsx$3(col1, col2, f, "hsi");
    };
    // register interpolator
    interpolator$1.hsi = hsi;
    var interpolate_hsx$2 = _hsx;
    var hsl1 = function(col1, col2, f) {
        return interpolate_hsx$2(col1, col2, f, "hsl");
    };
    // register interpolator
    interpolator$1.hsl = hsl1;
    var interpolate_hsx$1 = _hsx;
    var hsv = function(col1, col2, f) {
        return interpolate_hsx$1(col1, col2, f, "hsv");
    };
    // register interpolator
    interpolator$1.hsv = hsv;
    var Color$7 = Color_1;
    var oklab = function(col1, col2, f) {
        var xyz0 = col1.oklab();
        var xyz1 = col2.oklab();
        return new Color$7(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "oklab");
    };
    // register interpolator
    interpolator$1.oklab = oklab;
    var interpolate_hsx = _hsx;
    var oklch = function(col1, col2, f) {
        return interpolate_hsx(col1, col2, f, "oklch");
    };
    // register interpolator
    interpolator$1.oklch = oklch;
    var Color$6 = Color_1;
    var clip_rgb$1 = utils.clip_rgb;
    var pow$4 = Math.pow;
    var sqrt$1 = Math.sqrt;
    var PI$1 = Math.PI;
    var cos$2 = Math.cos;
    var sin$2 = Math.sin;
    var atan2$1 = Math.atan2;
    var average = function(colors, mode, weights) {
        if (mode === void 0) mode = "lrgb";
        if (weights === void 0) weights = null;
        var l = colors.length;
        if (!weights) weights = Array.from(new Array(l)).map(function() {
            return 1;
        });
        // normalize weights
        var k = l / weights.reduce(function(a, b) {
            return a + b;
        });
        weights.forEach(function(w, i) {
            weights[i] *= k;
        });
        // convert colors to Color objects
        colors = colors.map(function(c) {
            return new Color$6(c);
        });
        if (mode === "lrgb") return _average_lrgb(colors, weights);
        var first = colors.shift();
        var xyz = first.get(mode);
        var cnt = [];
        var dx = 0;
        var dy = 0;
        // initial color
        for(var i2 = 0; i2 < xyz.length; i2++){
            xyz[i2] = (xyz[i2] || 0) * weights[0];
            cnt.push(isNaN(xyz[i2]) ? 0 : weights[0]);
            if (mode.charAt(i2) === "h" && !isNaN(xyz[i2])) {
                var A = xyz[i2] / 180 * PI$1;
                dx += cos$2(A) * weights[0];
                dy += sin$2(A) * weights[0];
            }
        }
        var alpha = first.alpha() * weights[0];
        colors.forEach(function(c, ci) {
            var xyz2 = c.get(mode);
            alpha += c.alpha() * weights[ci + 1];
            for(var i = 0; i < xyz.length; i++)if (!isNaN(xyz2[i])) {
                cnt[i] += weights[ci + 1];
                if (mode.charAt(i) === "h") {
                    var A = xyz2[i] / 180 * PI$1;
                    dx += cos$2(A) * weights[ci + 1];
                    dy += sin$2(A) * weights[ci + 1];
                } else xyz[i] += xyz2[i] * weights[ci + 1];
            }
        });
        for(var i$1 = 0; i$1 < xyz.length; i$1++)if (mode.charAt(i$1) === "h") {
            var A$1 = atan2$1(dy / cnt[i$1], dx / cnt[i$1]) / PI$1 * 180;
            while(A$1 < 0)A$1 += 360;
            while(A$1 >= 360)A$1 -= 360;
            xyz[i$1] = A$1;
        } else xyz[i$1] = xyz[i$1] / cnt[i$1];
        alpha /= l;
        return new Color$6(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };
    var _average_lrgb = function(colors, weights) {
        var l = colors.length;
        var xyz = [
            0,
            0,
            0,
            0
        ];
        for(var i = 0; i < colors.length; i++){
            var col = colors[i];
            var f = weights[i] / l;
            var rgb = col._rgb;
            xyz[0] += pow$4(rgb[0], 2) * f;
            xyz[1] += pow$4(rgb[1], 2) * f;
            xyz[2] += pow$4(rgb[2], 2) * f;
            xyz[3] += rgb[3] * f;
        }
        xyz[0] = sqrt$1(xyz[0]);
        xyz[1] = sqrt$1(xyz[1]);
        xyz[2] = sqrt$1(xyz[2]);
        if (xyz[3] > 0.9999999) xyz[3] = 1;
        return new Color$6(clip_rgb$1(xyz));
    };
    // minimal multi-purpose interface
    // @requires utils color analyze
    var chroma$4 = chroma_1;
    var type$2 = utils.type;
    var pow$3 = Math.pow;
    var scale$2 = function(colors1) {
        // constructor
        var _mode = "rgb";
        var _nacol = chroma$4("#ccc");
        var _spread = 0;
        // const _fixed = false;
        var _domain = [
            0,
            1
        ];
        var _pos = [];
        var _padding = [
            0,
            0
        ];
        var _classes = false;
        var _colors = [];
        var _out = false;
        var _min = 0;
        var _max = 1;
        var _correctLightness = false;
        var _colorCache = {};
        var _useCache = true;
        var _gamma = 1;
        // private methods
        var setColors = function(colors) {
            colors = colors || [
                "#fff",
                "#000"
            ];
            if (colors && type$2(colors) === "string" && chroma$4.brewer && chroma$4.brewer[colors.toLowerCase()]) colors = chroma$4.brewer[colors.toLowerCase()];
            if (type$2(colors) === "array") {
                // handle single color
                if (colors.length === 1) colors = [
                    colors[0],
                    colors[0]
                ];
                // make a copy of the colors
                colors = colors.slice(0);
                // convert to chroma classes
                for(var c = 0; c < colors.length; c++)colors[c] = chroma$4(colors[c]);
                // auto-fill color position
                _pos.length = 0;
                for(var c$1 = 0; c$1 < colors.length; c$1++)_pos.push(c$1 / (colors.length - 1));
            }
            resetCache();
            return _colors = colors;
        };
        var getClass = function(value) {
            if (_classes != null) {
                var n = _classes.length - 1;
                var i = 0;
                while(i < n && value >= _classes[i])i++;
                return i - 1;
            }
            return 0;
        };
        var tMapLightness = function(t) {
            return t;
        };
        var tMapDomain = function(t) {
            return t;
        };
        // const classifyValue = function(value) {
        //     let val = value;
        //     if (_classes.length > 2) {
        //         const n = _classes.length-1;
        //         const i = getClass(value);
        //         const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));  // center of 1st class
        //         const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));  // center of last class
        //         val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
        //     }
        //     return val;
        // };
        var getColor = function(val, bypassMap) {
            var col, t;
            if (bypassMap == null) bypassMap = false;
            if (isNaN(val) || val === null) return _nacol;
            if (!bypassMap) {
                if (_classes && _classes.length > 2) {
                    // find the class
                    var c = getClass(val);
                    t = c / (_classes.length - 2);
                } else if (_max !== _min) // just interpolate between min/max
                t = (val - _min) / (_max - _min);
                else t = 1;
            } else t = val;
            // domain map
            t = tMapDomain(t);
            if (!bypassMap) t = tMapLightness(t); // lightness correction
            if (_gamma !== 1) t = pow$3(t, _gamma);
            t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
            t = Math.min(1, Math.max(0, t));
            var k = Math.floor(t * 10000);
            if (_useCache && _colorCache[k]) col = _colorCache[k];
            else {
                if (type$2(_colors) === "array") //for i in [0.._pos.length-1]
                for(var i = 0; i < _pos.length; i++){
                    var p = _pos[i];
                    if (t <= p) {
                        col = _colors[i];
                        break;
                    }
                    if (t >= p && i === _pos.length - 1) {
                        col = _colors[i];
                        break;
                    }
                    if (t > p && t < _pos[i + 1]) {
                        t = (t - p) / (_pos[i + 1] - p);
                        col = chroma$4.interpolate(_colors[i], _colors[i + 1], t, _mode);
                        break;
                    }
                }
                else if (type$2(_colors) === "function") col = _colors(t);
                if (_useCache) _colorCache[k] = col;
            }
            return col;
        };
        var resetCache = function() {
            return _colorCache = {};
        };
        setColors(colors1);
        // public interface
        var f1 = function(v) {
            var c = chroma$4(getColor(v));
            if (_out && c[_out]) return c[_out]();
            else return c;
        };
        f1.classes = function(classes) {
            if (classes != null) {
                if (type$2(classes) === "array") {
                    _classes = classes;
                    _domain = [
                        classes[0],
                        classes[classes.length - 1]
                    ];
                } else {
                    var d = chroma$4.analyze(_domain);
                    if (classes === 0) _classes = [
                        d.min,
                        d.max
                    ];
                    else _classes = chroma$4.limits(d, "e", classes);
                }
                return f1;
            }
            return _classes;
        };
        f1.domain = function(domain) {
            if (!arguments.length) return _domain;
            _min = domain[0];
            _max = domain[domain.length - 1];
            _pos = [];
            var k = _colors.length;
            if (domain.length === k && _min !== _max) // update positions
            for(var i3 = 0, list = Array.from(domain); i3 < list.length; i3 += 1){
                var d = list[i3];
                _pos.push((d - _min) / (_max - _min));
            }
            else {
                for(var c = 0; c < k; c++)_pos.push(c / (k - 1));
                if (domain.length > 2) {
                    // set domain map
                    var tOut = domain.map(function(d, i) {
                        return i / (domain.length - 1);
                    });
                    var tBreaks = domain.map(function(d) {
                        return (d - _min) / (_max - _min);
                    });
                    if (!tBreaks.every(function(val, i) {
                        return tOut[i] === val;
                    })) tMapDomain = function(t) {
                        if (t <= 0 || t >= 1) return t;
                        var i = 0;
                        while(t >= tBreaks[i + 1])i++;
                        var f = (t - tBreaks[i]) / (tBreaks[i + 1] - tBreaks[i]);
                        var out = tOut[i] + f * (tOut[i + 1] - tOut[i]);
                        return out;
                    };
                }
            }
            _domain = [
                _min,
                _max
            ];
            return f1;
        };
        f1.mode = function(_m) {
            if (!arguments.length) return _mode;
            _mode = _m;
            resetCache();
            return f1;
        };
        f1.range = function(colors, _pos) {
            setColors(colors);
            return f1;
        };
        f1.out = function(_o) {
            _out = _o;
            return f1;
        };
        f1.spread = function(val) {
            if (!arguments.length) return _spread;
            _spread = val;
            return f1;
        };
        f1.correctLightness = function(v) {
            if (v == null) v = true;
            _correctLightness = v;
            resetCache();
            if (_correctLightness) tMapLightness = function(t) {
                var L0 = getColor(0, true).lab()[0];
                var L1 = getColor(1, true).lab()[0];
                var pol = L0 > L1;
                var L_actual = getColor(t, true).lab()[0];
                var L_ideal = L0 + (L1 - L0) * t;
                var L_diff = L_actual - L_ideal;
                var t0 = 0;
                var t1 = 1;
                var max_iter = 20;
                while(Math.abs(L_diff) > 1e-2 && max_iter-- > 0)(function() {
                    if (pol) L_diff *= -1;
                    if (L_diff < 0) {
                        t0 = t;
                        t += (t1 - t) * 0.5;
                    } else {
                        t1 = t;
                        t += (t0 - t) * 0.5;
                    }
                    L_actual = getColor(t, true).lab()[0];
                    return L_diff = L_actual - L_ideal;
                })();
                return t;
            };
            else tMapLightness = function(t) {
                return t;
            };
            return f1;
        };
        f1.padding = function(p) {
            if (p != null) {
                if (type$2(p) === "number") p = [
                    p,
                    p
                ];
                _padding = p;
                return f1;
            } else return _padding;
        };
        f1.colors = function(numColors, out) {
            // If no arguments are given, return the original colors that were provided
            if (arguments.length < 2) out = "hex";
            var result = [];
            if (arguments.length === 0) result = _colors.slice(0);
            else if (numColors === 1) result = [
                f1(0.5)
            ];
            else if (numColors > 1) {
                var dm = _domain[0];
                var dd = _domain[1] - dm;
                result = __range__(0, numColors, false).map(function(i) {
                    return f1(dm + i / (numColors - 1) * dd);
                });
            } else {
                colors1 = [];
                var samples = [];
                if (_classes && _classes.length > 2) for(var i4 = 1, end = _classes.length, asc = 1 <= end; asc ? i4 < end : i4 > end; asc ? i4++ : i4--)samples.push((_classes[i4 - 1] + _classes[i4]) * 0.5);
                else samples = _domain;
                result = samples.map(function(v) {
                    return f1(v);
                });
            }
            if (chroma$4[out]) result = result.map(function(c) {
                return c[out]();
            });
            return result;
        };
        f1.cache = function(c) {
            if (c != null) {
                _useCache = c;
                return f1;
            } else return _useCache;
        };
        f1.gamma = function(g) {
            if (g != null) {
                _gamma = g;
                return f1;
            } else return _gamma;
        };
        f1.nodata = function(d) {
            if (d != null) {
                _nacol = chroma$4(d);
                return f1;
            } else return _nacol;
        };
        return f1;
    };
    function __range__(left, right, inclusive) {
        var range = [];
        var ascending = left < right;
        var end = !inclusive ? right : ascending ? right + 1 : right - 1;
        for(var i = left; ascending ? i < end : i > end; ascending ? i++ : i--)range.push(i);
        return range;
    }
    //
    // interpolates between a set of colors uzing a bezier spline
    //
    // @requires utils lab
    var Color$5 = Color_1;
    var scale$1 = scale$2;
    // nth row of the pascal triangle
    var binom_row = function(n) {
        var row = [
            1,
            1
        ];
        for(var i = 1; i < n; i++){
            var newrow = [
                1
            ];
            for(var j = 1; j <= row.length; j++)newrow[j] = (row[j] || 0) + row[j - 1];
            row = newrow;
        }
        return row;
    };
    var bezier = function(colors) {
        var assign, assign$1, assign$2;
        var I, lab0, lab1, lab2;
        colors = colors.map(function(c) {
            return new Color$5(c);
        });
        if (colors.length === 2) {
            assign = colors.map(function(c) {
                return c.lab();
            }), lab0 = assign[0], lab1 = assign[1];
            I = function(t) {
                var lab = [
                    0,
                    1,
                    2
                ].map(function(i) {
                    return lab0[i] + t * (lab1[i] - lab0[i]);
                });
                return new Color$5(lab, "lab");
            };
        } else if (colors.length === 3) {
            assign$1 = colors.map(function(c) {
                return c.lab();
            }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2];
            I = function(t) {
                var lab = [
                    0,
                    1,
                    2
                ].map(function(i) {
                    return (1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i];
                });
                return new Color$5(lab, "lab");
            };
        } else if (colors.length === 4) {
            // cubic bezier interpolation
            var lab3;
            assign$2 = colors.map(function(c) {
                return c.lab();
            }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3];
            I = function(t) {
                var lab = [
                    0,
                    1,
                    2
                ].map(function(i) {
                    return (1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i];
                });
                return new Color$5(lab, "lab");
            };
        } else if (colors.length >= 5) {
            // general case (degree n bezier)
            var labs, row, n;
            labs = colors.map(function(c) {
                return c.lab();
            });
            n = colors.length - 1;
            row = binom_row(n);
            I = function(t) {
                var u = 1 - t;
                var lab = [
                    0,
                    1,
                    2
                ].map(function(i) {
                    return labs.reduce(function(sum, el, j) {
                        return sum + row[j] * Math.pow(u, n - j) * Math.pow(t, j) * el[i];
                    }, 0);
                });
                return new Color$5(lab, "lab");
            };
        } else throw new RangeError("No point in running bezier with only one color.");
        return I;
    };
    var bezier_1 = function(colors) {
        var f = bezier(colors);
        f.scale = function() {
            return scale$1(f);
        };
        return f;
    };
    /*
     * interpolates between a set of colors uzing a bezier spline
     * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
     */ var chroma$3 = chroma_1;
    var blend = function(bottom, top, mode) {
        if (!blend[mode]) throw new Error("unknown blend mode " + mode);
        return blend[mode](bottom, top);
    };
    var blend_f = function(f) {
        return function(bottom, top) {
            var c0 = chroma$3(top).rgb();
            var c1 = chroma$3(bottom).rgb();
            return chroma$3.rgb(f(c0, c1));
        };
    };
    var each = function(f) {
        return function(c0, c1) {
            var out = [];
            out[0] = f(c0[0], c1[0]);
            out[1] = f(c0[1], c1[1]);
            out[2] = f(c0[2], c1[2]);
            return out;
        };
    };
    var normal = function(a) {
        return a;
    };
    var multiply = function(a, b) {
        return a * b / 255;
    };
    var darken = function(a, b) {
        return a > b ? b : a;
    };
    var lighten = function(a, b) {
        return a > b ? a : b;
    };
    var screen = function(a, b) {
        return 255 * (1 - (1 - a / 255) * (1 - b / 255));
    };
    var overlay = function(a, b) {
        return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
    };
    var burn = function(a, b) {
        return 255 * (1 - (1 - b / 255) / (a / 255));
    };
    var dodge = function(a, b) {
        if (a === 255) return 255;
        a = 255 * (b / 255) / (1 - a / 255);
        return a > 255 ? 255 : a;
    };
    // # add = (a,b) ->
    // #     if (a + b > 255) then 255 else a + b
    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    // blend.add = blend_f(each(add));
    var blend_1 = blend;
    // cubehelix interpolation
    // based on D.A. Green "A colour scheme for the display of astronomical intensity images"
    // http://astron-soc.in/bulletin/11June/289392011.pdf
    var type$1 = utils.type;
    var clip_rgb = utils.clip_rgb;
    var TWOPI = utils.TWOPI;
    var pow$2 = Math.pow;
    var sin$1 = Math.sin;
    var cos$1 = Math.cos;
    var chroma$2 = chroma_1;
    var cubehelix = function(start, rotations, hue, gamma, lightness) {
        if (start === void 0) start = 300;
        if (rotations === void 0) rotations = -1.5;
        if (hue === void 0) hue = 1;
        if (gamma === void 0) gamma = 1;
        if (lightness === void 0) lightness = [
            0,
            1
        ];
        var dh = 0, dl;
        if (type$1(lightness) === "array") dl = lightness[1] - lightness[0];
        else {
            dl = 0;
            lightness = [
                lightness,
                lightness
            ];
        }
        var f = function(fract) {
            var a = TWOPI * ((start + 120) / 360 + rotations * fract);
            var l = pow$2(lightness[0] + dl * fract, gamma);
            var h = dh !== 0 ? hue[0] + fract * dh : hue;
            var amp = h * l * (1 - l) / 2;
            var cos_a = cos$1(a);
            var sin_a = sin$1(a);
            var r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
            var g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
            var b = l + amp * (1.97294 * cos_a);
            return chroma$2(clip_rgb([
                r * 255,
                g * 255,
                b * 255,
                1
            ]));
        };
        f.start = function(s) {
            if (s == null) return start;
            start = s;
            return f;
        };
        f.rotations = function(r) {
            if (r == null) return rotations;
            rotations = r;
            return f;
        };
        f.gamma = function(g) {
            if (g == null) return gamma;
            gamma = g;
            return f;
        };
        f.hue = function(h) {
            if (h == null) return hue;
            hue = h;
            if (type$1(hue) === "array") {
                dh = hue[1] - hue[0];
                if (dh === 0) hue = hue[1];
            } else dh = 0;
            return f;
        };
        f.lightness = function(h) {
            if (h == null) return lightness;
            if (type$1(h) === "array") {
                lightness = h;
                dl = h[1] - h[0];
            } else {
                lightness = [
                    h,
                    h
                ];
                dl = 0;
            }
            return f;
        };
        f.scale = function() {
            return chroma$2.scale(f);
        };
        f.hue(hue);
        return f;
    };
    var Color$4 = Color_1;
    var digits = "0123456789abcdef";
    var floor$1 = Math.floor;
    var random = Math.random;
    var random_1 = function() {
        var code = "#";
        for(var i = 0; i < 6; i++)code += digits.charAt(floor$1(random() * 16));
        return new Color$4(code, "hex");
    };
    var type = type$p;
    var log = Math.log;
    var pow$1 = Math.pow;
    var floor = Math.floor;
    var abs$1 = Math.abs;
    var analyze = function(data, key) {
        if (key === void 0) key = null;
        var r = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE * -1,
            sum: 0,
            values: [],
            count: 0
        };
        if (type(data) === "object") data = Object.values(data);
        data.forEach(function(val) {
            if (key && type(val) === "object") val = val[key];
            if (val !== undefined && val !== null && !isNaN(val)) {
                r.values.push(val);
                r.sum += val;
                if (val < r.min) r.min = val;
                if (val > r.max) r.max = val;
                r.count += 1;
            }
        });
        r.domain = [
            r.min,
            r.max
        ];
        r.limits = function(mode, num) {
            return limits1(r, mode, num);
        };
        return r;
    };
    var limits1 = function(data, mode, num) {
        if (mode === void 0) mode = "equal";
        if (num === void 0) num = 7;
        if (type(data) == "array") data = analyze(data);
        var min = data.min;
        var max = data.max;
        var values = data.values.sort(function(a, b) {
            return a - b;
        });
        if (num === 1) return [
            min,
            max
        ];
        var limits = [];
        if (mode.substr(0, 1) === "c") {
            limits.push(min);
            limits.push(max);
        }
        if (mode.substr(0, 1) === "e") {
            limits.push(min);
            for(var i = 1; i < num; i++)limits.push(min + i / num * (max - min));
            limits.push(max);
        } else if (mode.substr(0, 1) === "l") {
            if (min <= 0) throw new Error("Logarithmic scales are only possible for values > 0");
            var min_log = Math.LOG10E * log(min);
            var max_log = Math.LOG10E * log(max);
            limits.push(min);
            for(var i$1 = 1; i$1 < num; i$1++)limits.push(pow$1(10, min_log + i$1 / num * (max_log - min_log)));
            limits.push(max);
        } else if (mode.substr(0, 1) === "q") {
            limits.push(min);
            for(var i$2 = 1; i$2 < num; i$2++){
                var p = (values.length - 1) * i$2 / num;
                var pb = floor(p);
                if (pb === p) limits.push(values[pb]);
                else {
                    var pr = p - pb;
                    limits.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
                }
            }
            limits.push(max);
        } else if (mode.substr(0, 1) === "k") {
            /*
            implementation based on
            http://code.google.com/p/figue/source/browse/trunk/figue.js#336
            simplified for 1-d input values
            */ var cluster;
            var n = values.length;
            var assignments = new Array(n);
            var clusterSizes = new Array(num);
            var repeat = true;
            var nb_iters = 0;
            var centroids = null;
            // get seed values
            centroids = [];
            centroids.push(min);
            for(var i$3 = 1; i$3 < num; i$3++)centroids.push(min + i$3 / num * (max - min));
            centroids.push(max);
            while(repeat){
                // assignment step
                for(var j = 0; j < num; j++)clusterSizes[j] = 0;
                for(var i$4 = 0; i$4 < n; i$4++){
                    var value = values[i$4];
                    var mindist = Number.MAX_VALUE;
                    var best = void 0;
                    for(var j$1 = 0; j$1 < num; j$1++){
                        var dist = abs$1(centroids[j$1] - value);
                        if (dist < mindist) {
                            mindist = dist;
                            best = j$1;
                        }
                        clusterSizes[best]++;
                        assignments[i$4] = best;
                    }
                }
                // update centroids step
                var newCentroids = new Array(num);
                for(var j$2 = 0; j$2 < num; j$2++)newCentroids[j$2] = null;
                for(var i$5 = 0; i$5 < n; i$5++){
                    cluster = assignments[i$5];
                    if (newCentroids[cluster] === null) newCentroids[cluster] = values[i$5];
                    else newCentroids[cluster] += values[i$5];
                }
                for(var j$3 = 0; j$3 < num; j$3++)newCentroids[j$3] *= 1 / clusterSizes[j$3];
                // check convergence
                repeat = false;
                for(var j$4 = 0; j$4 < num; j$4++)if (newCentroids[j$4] !== centroids[j$4]) {
                    repeat = true;
                    break;
                }
                centroids = newCentroids;
                nb_iters++;
                if (nb_iters > 200) repeat = false;
            }
            // finished k-means clustering
            // the next part is borrowed from gabrielflor.it
            var kClusters = {};
            for(var j$5 = 0; j$5 < num; j$5++)kClusters[j$5] = [];
            for(var i$6 = 0; i$6 < n; i$6++){
                cluster = assignments[i$6];
                kClusters[cluster].push(values[i$6]);
            }
            var tmpKMeansBreaks = [];
            for(var j$6 = 0; j$6 < num; j$6++){
                tmpKMeansBreaks.push(kClusters[j$6][0]);
                tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length - 1]);
            }
            tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a, b) {
                return a - b;
            });
            limits.push(tmpKMeansBreaks[0]);
            for(var i$7 = 1; i$7 < tmpKMeansBreaks.length; i$7 += 2){
                var v = tmpKMeansBreaks[i$7];
                if (!isNaN(v) && limits.indexOf(v) === -1) limits.push(v);
            }
        }
        return limits;
    };
    var analyze_1 = {
        analyze: analyze,
        limits: limits1
    };
    var Color$3 = Color_1;
    var contrast = function(a, b) {
        // WCAG contrast ratio
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        a = new Color$3(a);
        b = new Color$3(b);
        var l1 = a.luminance();
        var l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };
    var Color$2 = Color_1;
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    var min1 = Math.min;
    var max1 = Math.max;
    var atan2 = Math.atan2;
    var abs1 = Math.abs;
    var cos = Math.cos;
    var sin = Math.sin;
    var exp = Math.exp;
    var PI = Math.PI;
    var deltaE = function(a, b, Kl, Kc, Kh) {
        if (Kl === void 0) Kl = 1;
        if (Kc === void 0) Kc = 1;
        if (Kh === void 0) Kh = 1;
        // Delta E (CIE 2000)
        // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html
        var rad2deg = function(rad) {
            return 360 * rad / (2 * PI);
        };
        var deg2rad = function(deg) {
            return 2 * PI * deg / 360;
        };
        a = new Color$2(a);
        b = new Color$2(b);
        var ref = Array.from(a.lab());
        var L1 = ref[0];
        var a1 = ref[1];
        var b1 = ref[2];
        var ref$1 = Array.from(b.lab());
        var L2 = ref$1[0];
        var a2 = ref$1[1];
        var b2 = ref$1[2];
        var avgL = (L1 + L2) / 2;
        var C1 = sqrt(pow(a1, 2) + pow(b1, 2));
        var C2 = sqrt(pow(a2, 2) + pow(b2, 2));
        var avgC = (C1 + C2) / 2;
        var G = 0.5 * (1 - sqrt(pow(avgC, 7) / (pow(avgC, 7) + pow(25, 7))));
        var a1p = a1 * (1 + G);
        var a2p = a2 * (1 + G);
        var C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
        var C2p = sqrt(pow(a2p, 2) + pow(b2, 2));
        var avgCp = (C1p + C2p) / 2;
        var arctan1 = rad2deg(atan2(b1, a1p));
        var arctan2 = rad2deg(atan2(b2, a2p));
        var h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
        var h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
        var avgHp = abs1(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
        var T = 1 - 0.17 * cos(deg2rad(avgHp - 30)) + 0.24 * cos(deg2rad(2 * avgHp)) + 0.32 * cos(deg2rad(3 * avgHp + 6)) - 0.2 * cos(deg2rad(4 * avgHp - 63));
        var deltaHp = h2p - h1p;
        deltaHp = abs1(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
        deltaHp = 2 * sqrt(C1p * C2p) * sin(deg2rad(deltaHp) / 2);
        var deltaL = L2 - L1;
        var deltaCp = C2p - C1p;
        var sl = 1 + 0.015 * pow(avgL - 50, 2) / sqrt(20 + pow(avgL - 50, 2));
        var sc = 1 + 0.045 * avgCp;
        var sh = 1 + 0.015 * avgCp * T;
        var deltaTheta = 30 * exp(-pow((avgHp - 275) / 25, 2));
        var Rc = 2 * sqrt(pow(avgCp, 7) / (pow(avgCp, 7) + pow(25, 7)));
        var Rt = -Rc * sin(2 * deg2rad(deltaTheta));
        var result = sqrt(pow(deltaL / (Kl * sl), 2) + pow(deltaCp / (Kc * sc), 2) + pow(deltaHp / (Kh * sh), 2) + Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh)));
        return max1(0, min1(100, result));
    };
    var Color$1 = Color_1;
    // simple Euclidean distance
    var distance = function(a, b, mode) {
        if (mode === void 0) mode = "lab";
        // Delta E (CIE 1976)
        // see http://www.brucelindbloom.com/index.html?Equations.html
        a = new Color$1(a);
        b = new Color$1(b);
        var l1 = a.get(mode);
        var l2 = b.get(mode);
        var sum_sq = 0;
        for(var i in l1){
            var d = (l1[i] || 0) - (l2[i] || 0);
            sum_sq += d * d;
        }
        return Math.sqrt(sum_sq);
    };
    var Color = Color_1;
    var valid = function() {
        var args = [], len = arguments.length;
        while(len--)args[len] = arguments[len];
        try {
            new (Function.prototype.bind.apply(Color, [
                null
            ].concat(args)));
            return true;
        } catch (e) {
            return false;
        }
    };
    // some pre-defined color scales:
    var chroma$1 = chroma_1;
    var scale = scale$2;
    var scales = {
        cool: function cool() {
            return scale([
                chroma$1.hsl(180, 1, .9),
                chroma$1.hsl(250, .7, .4)
            ]);
        },
        hot: function hot() {
            return scale([
                "#000",
                "#f00",
                "#ff0",
                "#fff"
            ]).mode("rgb");
        }
    };
    /**
        ColorBrewer colors for chroma.js

        Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
        Pennsylvania State University.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software distributed
        under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
        CONDITIONS OF ANY KIND, either express or implied. See the License for the
        specific language governing permissions and limitations under the License.
    */ var colorbrewer = {
        // sequential
        OrRd: [
            "#fff7ec",
            "#fee8c8",
            "#fdd49e",
            "#fdbb84",
            "#fc8d59",
            "#ef6548",
            "#d7301f",
            "#b30000",
            "#7f0000"
        ],
        PuBu: [
            "#fff7fb",
            "#ece7f2",
            "#d0d1e6",
            "#a6bddb",
            "#74a9cf",
            "#3690c0",
            "#0570b0",
            "#045a8d",
            "#023858"
        ],
        BuPu: [
            "#f7fcfd",
            "#e0ecf4",
            "#bfd3e6",
            "#9ebcda",
            "#8c96c6",
            "#8c6bb1",
            "#88419d",
            "#810f7c",
            "#4d004b"
        ],
        Oranges: [
            "#fff5eb",
            "#fee6ce",
            "#fdd0a2",
            "#fdae6b",
            "#fd8d3c",
            "#f16913",
            "#d94801",
            "#a63603",
            "#7f2704"
        ],
        BuGn: [
            "#f7fcfd",
            "#e5f5f9",
            "#ccece6",
            "#99d8c9",
            "#66c2a4",
            "#41ae76",
            "#238b45",
            "#006d2c",
            "#00441b"
        ],
        YlOrBr: [
            "#ffffe5",
            "#fff7bc",
            "#fee391",
            "#fec44f",
            "#fe9929",
            "#ec7014",
            "#cc4c02",
            "#993404",
            "#662506"
        ],
        YlGn: [
            "#ffffe5",
            "#f7fcb9",
            "#d9f0a3",
            "#addd8e",
            "#78c679",
            "#41ab5d",
            "#238443",
            "#006837",
            "#004529"
        ],
        Reds: [
            "#fff5f0",
            "#fee0d2",
            "#fcbba1",
            "#fc9272",
            "#fb6a4a",
            "#ef3b2c",
            "#cb181d",
            "#a50f15",
            "#67000d"
        ],
        RdPu: [
            "#fff7f3",
            "#fde0dd",
            "#fcc5c0",
            "#fa9fb5",
            "#f768a1",
            "#dd3497",
            "#ae017e",
            "#7a0177",
            "#49006a"
        ],
        Greens: [
            "#f7fcf5",
            "#e5f5e0",
            "#c7e9c0",
            "#a1d99b",
            "#74c476",
            "#41ab5d",
            "#238b45",
            "#006d2c",
            "#00441b"
        ],
        YlGnBu: [
            "#ffffd9",
            "#edf8b1",
            "#c7e9b4",
            "#7fcdbb",
            "#41b6c4",
            "#1d91c0",
            "#225ea8",
            "#253494",
            "#081d58"
        ],
        Purples: [
            "#fcfbfd",
            "#efedf5",
            "#dadaeb",
            "#bcbddc",
            "#9e9ac8",
            "#807dba",
            "#6a51a3",
            "#54278f",
            "#3f007d"
        ],
        GnBu: [
            "#f7fcf0",
            "#e0f3db",
            "#ccebc5",
            "#a8ddb5",
            "#7bccc4",
            "#4eb3d3",
            "#2b8cbe",
            "#0868ac",
            "#084081"
        ],
        Greys: [
            "#ffffff",
            "#f0f0f0",
            "#d9d9d9",
            "#bdbdbd",
            "#969696",
            "#737373",
            "#525252",
            "#252525",
            "#000000"
        ],
        YlOrRd: [
            "#ffffcc",
            "#ffeda0",
            "#fed976",
            "#feb24c",
            "#fd8d3c",
            "#fc4e2a",
            "#e31a1c",
            "#bd0026",
            "#800026"
        ],
        PuRd: [
            "#f7f4f9",
            "#e7e1ef",
            "#d4b9da",
            "#c994c7",
            "#df65b0",
            "#e7298a",
            "#ce1256",
            "#980043",
            "#67001f"
        ],
        Blues: [
            "#f7fbff",
            "#deebf7",
            "#c6dbef",
            "#9ecae1",
            "#6baed6",
            "#4292c6",
            "#2171b5",
            "#08519c",
            "#08306b"
        ],
        PuBuGn: [
            "#fff7fb",
            "#ece2f0",
            "#d0d1e6",
            "#a6bddb",
            "#67a9cf",
            "#3690c0",
            "#02818a",
            "#016c59",
            "#014636"
        ],
        Viridis: [
            "#440154",
            "#482777",
            "#3f4a8a",
            "#31678e",
            "#26838f",
            "#1f9d8a",
            "#6cce5a",
            "#b6de2b",
            "#fee825"
        ],
        // diverging
        Spectral: [
            "#9e0142",
            "#d53e4f",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#e6f598",
            "#abdda4",
            "#66c2a5",
            "#3288bd",
            "#5e4fa2"
        ],
        RdYlGn: [
            "#a50026",
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#d9ef8b",
            "#a6d96a",
            "#66bd63",
            "#1a9850",
            "#006837"
        ],
        RdBu: [
            "#67001f",
            "#b2182b",
            "#d6604d",
            "#f4a582",
            "#fddbc7",
            "#f7f7f7",
            "#d1e5f0",
            "#92c5de",
            "#4393c3",
            "#2166ac",
            "#053061"
        ],
        PiYG: [
            "#8e0152",
            "#c51b7d",
            "#de77ae",
            "#f1b6da",
            "#fde0ef",
            "#f7f7f7",
            "#e6f5d0",
            "#b8e186",
            "#7fbc41",
            "#4d9221",
            "#276419"
        ],
        PRGn: [
            "#40004b",
            "#762a83",
            "#9970ab",
            "#c2a5cf",
            "#e7d4e8",
            "#f7f7f7",
            "#d9f0d3",
            "#a6dba0",
            "#5aae61",
            "#1b7837",
            "#00441b"
        ],
        RdYlBu: [
            "#a50026",
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee090",
            "#ffffbf",
            "#e0f3f8",
            "#abd9e9",
            "#74add1",
            "#4575b4",
            "#313695"
        ],
        BrBG: [
            "#543005",
            "#8c510a",
            "#bf812d",
            "#dfc27d",
            "#f6e8c3",
            "#f5f5f5",
            "#c7eae5",
            "#80cdc1",
            "#35978f",
            "#01665e",
            "#003c30"
        ],
        RdGy: [
            "#67001f",
            "#b2182b",
            "#d6604d",
            "#f4a582",
            "#fddbc7",
            "#ffffff",
            "#e0e0e0",
            "#bababa",
            "#878787",
            "#4d4d4d",
            "#1a1a1a"
        ],
        PuOr: [
            "#7f3b08",
            "#b35806",
            "#e08214",
            "#fdb863",
            "#fee0b6",
            "#f7f7f7",
            "#d8daeb",
            "#b2abd2",
            "#8073ac",
            "#542788",
            "#2d004b"
        ],
        // qualitative
        Set2: [
            "#66c2a5",
            "#fc8d62",
            "#8da0cb",
            "#e78ac3",
            "#a6d854",
            "#ffd92f",
            "#e5c494",
            "#b3b3b3"
        ],
        Accent: [
            "#7fc97f",
            "#beaed4",
            "#fdc086",
            "#ffff99",
            "#386cb0",
            "#f0027f",
            "#bf5b17",
            "#666666"
        ],
        Set1: [
            "#e41a1c",
            "#377eb8",
            "#4daf4a",
            "#984ea3",
            "#ff7f00",
            "#ffff33",
            "#a65628",
            "#f781bf",
            "#999999"
        ],
        Set3: [
            "#8dd3c7",
            "#ffffb3",
            "#bebada",
            "#fb8072",
            "#80b1d3",
            "#fdb462",
            "#b3de69",
            "#fccde5",
            "#d9d9d9",
            "#bc80bd",
            "#ccebc5",
            "#ffed6f"
        ],
        Dark2: [
            "#1b9e77",
            "#d95f02",
            "#7570b3",
            "#e7298a",
            "#66a61e",
            "#e6ab02",
            "#a6761d",
            "#666666"
        ],
        Paired: [
            "#a6cee3",
            "#1f78b4",
            "#b2df8a",
            "#33a02c",
            "#fb9a99",
            "#e31a1c",
            "#fdbf6f",
            "#ff7f00",
            "#cab2d6",
            "#6a3d9a",
            "#ffff99",
            "#b15928"
        ],
        Pastel2: [
            "#b3e2cd",
            "#fdcdac",
            "#cbd5e8",
            "#f4cae4",
            "#e6f5c9",
            "#fff2ae",
            "#f1e2cc",
            "#cccccc"
        ],
        Pastel1: [
            "#fbb4ae",
            "#b3cde3",
            "#ccebc5",
            "#decbe4",
            "#fed9a6",
            "#ffffcc",
            "#e5d8bd",
            "#fddaec",
            "#f2f2f2"
        ]
    };
    // add lowercase aliases for case-insensitive matches
    for(var i1 = 0, list1 = Object.keys(colorbrewer); i1 < list1.length; i1 += 1){
        var key1 = list1[i1];
        colorbrewer[key1.toLowerCase()] = colorbrewer[key1];
    }
    var colorbrewer_1 = colorbrewer;
    var chroma = chroma_1;
    // feel free to comment out anything to rollup
    // a smaller chroma.js built
    // io --> convert colors
    // operators --> modify existing Colors
    // interpolators
    // generators -- > create new colors
    chroma.average = average;
    chroma.bezier = bezier_1;
    chroma.blend = blend_1;
    chroma.cubehelix = cubehelix;
    chroma.mix = chroma.interpolate = mix$1;
    chroma.random = random_1;
    chroma.scale = scale$2;
    // other utility methods
    chroma.analyze = analyze_1.analyze;
    chroma.contrast = contrast;
    chroma.deltaE = deltaE;
    chroma.distance = distance;
    chroma.limits = analyze_1.limits;
    chroma.valid = valid;
    // scale
    chroma.scales = scales;
    // colors
    chroma.colors = w3cx11_1;
    chroma.brewer = colorbrewer_1;
    var chroma_js = chroma;
    return chroma_js;
});





class $7c2ac7a8050a82d5$export$7c0591b22419cdd3 {
    constructor(red, green, blue, alpha = 0){
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    static From(source) {
        var _a;
        const chromaColor = typeof source == "string" ? (0, (/*@__PURE__*/$parcel$interopDefault($ca6f2c5ffb6cb163$exports)))(source) : source;
        const rgba = chromaColor.rgba();
        //return new VColor(...rgba);
        return new $7c2ac7a8050a82d5$export$7c0591b22419cdd3(rgba[0], rgba[1], rgba[2], (_a = rgba[3]) !== null && _a !== void 0 ? _a : 0);
    }
    /** Returns a value between 0 and 1. Reference: 0 = identical, 0.01 = 1% different, 1 = exact opposites */ static Diff(colorA, colorB) {
        //let maxColorDistance = 442; // = sqrt(255^2 + 255^2 + 255^2)
        let maxColorDistance = (0, (/*@__PURE__*/$parcel$interopDefault($ca6f2c5ffb6cb163$exports))).distance("white", "black");
        return (0, (/*@__PURE__*/$parcel$interopDefault($ca6f2c5ffb6cb163$exports))).distance(colorA.ToChromaJS(), colorB.ToChromaJS()) / maxColorDistance;
    }
    ToChromaJS() {
        //console.log(JSON.stringify(this));
        //return chroma([this.red, this.green, this.blue, this.alpha], "rgba");
        //return chroma({r: this.red, g: this.green, b: this.blue, a: this.alpha});
        // this is the only way I've found so far that works (chromajs lib maybe outdated)
        const result = (0, (/*@__PURE__*/$parcel$interopDefault($ca6f2c5ffb6cb163$exports))).rgb(this.red, this.green, this.blue);
        result.alpha(this.alpha);
        return result;
    }
    ToHex_RGB() {
        let result = this.ToChromaJS().hex().slice(1); // remove "#" prefix (redundant)
        if (result.length > 6) result = result.slice(0, -2); // remove alpha part (if present)
        return result;
    }
    ToHex_RGBA() {
        let result = this.ToChromaJS().hex().slice(1); // remove "#" prefix (redundant)
        // todo: add alpha part, if missing
        return result;
    }
    Diff(otherColor) {
        return $7c2ac7a8050a82d5$export$7c0591b22419cdd3.Diff(this, otherColor);
    }
}
function $7c2ac7a8050a82d5$export$8d515b39f64b57bc(x, y) {
    return $7c2ac7a8050a82d5$export$7cebcc457dbd84a2([
        new (0, $8fa580a7c1504ab3$exports.Vector2)(x, y)
    ])[0];
}
function $7c2ac7a8050a82d5$export$7cebcc457dbd84a2(positions) {
    let hdc = (0, $a787081e692d4b5a$export$4b754a7d794e4e0d).GetDC(0);
    let results = positions.map((pos)=>{
        let pixel = (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).GetPixel(hdc, pos.x, pos.y);
        //let color = chroma(pixel & 0x000000FF, (pixel & 0x0000FF00) >> 8, (pixel & 0x00FF0000) >> 16);
        /*let color_chroma = chroma(pixel.red, pixel.green, pixel.blue);
        //Log(`Pos: ${pos} Color: ${color.hex().substr(1)}`);
        return color_chroma.hex().substr(1); // to match with robotjs.getPixelColor() returns*/ return new $7c2ac7a8050a82d5$export$7c0591b22419cdd3(pixel.red, pixel.green, pixel.blue, pixel.alpha);
    });
    (0, $a787081e692d4b5a$export$4b754a7d794e4e0d).ReleaseDC(0, hdc);
    return results;
} //let timer = new Timer(1000, ()=>Log(GetPixelColor(0, 0))).Start();







function $61712e24b4c932dc$export$71f7c309e540ad97(x, y) {
    return $61712e24b4c932dc$export$4faaefd4d727d63a([
        new (0, $8fa580a7c1504ab3$exports.Vector2)(x, y)
    ])[0];
}
function $61712e24b4c932dc$export$4faaefd4d727d63a(positions) {
    const { rect: rect , screenshot: screenshot  } = $61712e24b4c932dc$export$4cab9749c02a5984(positions);
    return positions.map((pos)=>{
        return screenshot.GetPixel(pos.x - rect.x, pos.y - rect.y);
    });
}
function $61712e24b4c932dc$export$4cab9749c02a5984(positions) {
    const rectContainingAllPositions = new (0, $8fa580a7c1504ab3$exports.VRect)(positions[0], new (0, $8fa580a7c1504ab3$exports.Vector2)(1, 1));
    for (const pos of positions)rectContainingAllPositions.Encapsulate(new (0, $8fa580a7c1504ab3$exports.VRect)(pos, new (0, $8fa580a7c1504ab3$exports.Vector2)(1, 1)));
    const screenshot = $61712e24b4c932dc$export$cdfb9a6a4ec4454d({
        windowHandle: (0, $516b669531f3cb0a$export$efab28f78343218c)(),
        rectToCapture: rectContainingAllPositions
    });
    return {
        rect: rectContainingAllPositions,
        screenshot: screenshot
    };
}
class $61712e24b4c932dc$export$f3a5c5340646c35d {
    constructor(data){
        Object.assign(this, data);
    }
    GetPixel(...args) {
        const pos = args.length == 1 ? args[0] : new (0, $8fa580a7c1504ab3$exports.Vector2)(args[0], args[1]);
        const pixelsInPreviousRows = this.width * pos.y;
        const pixelIndex = pixelsInPreviousRows + pos.x;
        return new (0, $7c2ac7a8050a82d5$export$7c0591b22419cdd3)(// yeah, the order is a bit odd
        this.buffer[pixelIndex * 4 + 2], this.buffer[pixelIndex * 4 + 1], this.buffer[pixelIndex * 4 + 0], this.buffer[pixelIndex * 4 + 3]);
    }
}
const $61712e24b4c932dc$var$apiConstants = {
    SRCCOPY: 0xCC0020
};
function $61712e24b4c932dc$export$cdfb9a6a4ec4454d(opt) {
    var _a;
    let hdcWindow = null;
    let hdcMemDC = null;
    let hbmScreen = null;
    let hDIB = null;
    const logOrTime = opt.log || opt.time;
    let lastStepTime = Date.now();
    const log = !logOrTime ? ()=>{} : (...args)=>{
        if (opt.time) {
            var timeSinceLastStep = Date.now() - lastStepTime;
            lastStepTime = Date.now();
            args.push("@Time:", timeSinceLastStep);
        }
        const fullLogging = opt.log || args.every((a)=>(a + "").length < 30);
        if (fullLogging) return console.log(...args);
        // only "time" was specified; log shortened version
        return console.log(args[0], "<time log only>", ...args.slice(-2));
    };
    try {
        if (opt.windowHandle == null) opt.windowHandle = (0, $a787081e692d4b5a$export$4b754a7d794e4e0d).GetDesktopWindow();
        log("hWnd", opt.windowHandle);
        // Retrieve the handle to a display device context for the client area of the window.
        hdcWindow = (0, $a787081e692d4b5a$export$4b754a7d794e4e0d).GetDC(opt.windowHandle);
        log("hdcWindow", hdcWindow);
        const rcClient = new (0, $2c7d42451d1e78bd$export$f9aa4097c3e2b1a9)();
        /*const rcClient_buf = ref.alloc(RectStruct) as any;
        user32.GetClientRect(hWnd, rcClient_buf);
        const rcClient = rcClient_buf.deref();*/ (0, $a787081e692d4b5a$export$4b754a7d794e4e0d).GetClientRect(opt.windowHandle, rcClient.ref());
        log("rcClient", JSON.stringify(rcClient));
        opt.rectToCapture = (_a = opt.rectToCapture) !== null && _a !== void 0 ? _a : new (0, $8fa580a7c1504ab3$exports.VRect)(0, 0, rcClient.right - rcClient.left, rcClient.bottom - rcClient.top);
        // Create a compatible DC and bitmap
        hdcMemDC = (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).CreateCompatibleDC(hdcWindow);
        log("hdcMemDC", hdcMemDC);
        hbmScreen = (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).CreateCompatibleBitmap(hdcWindow, opt.rectToCapture.width, opt.rectToCapture.height);
        log("hbmScreen", hbmScreen);
        const hPrevDC = (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).SelectObject(hdcMemDC, hbmScreen);
        log("hPrevDC", hPrevDC);
        // Bit block transfer into our compatible memory DC.
        const bitBlt_result = (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).BitBlt(hdcMemDC, 0, 0, opt.rectToCapture.width, opt.rectToCapture.height, hdcWindow, opt.rectToCapture.x, opt.rectToCapture.y, $61712e24b4c932dc$var$apiConstants.SRCCOPY);
        const pixelWnd = (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).GetPixel(hdcWindow, 0, 0);
        const pixelMem = (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).GetPixel(hdcMemDC, 0, 0);
        log("pixelWnd", JSON.stringify(pixelWnd));
        log("pixelMem", JSON.stringify(pixelMem));
        log("bitBlt_result", JSON.stringify(bitBlt_result));
        //const getBufferLength = buffer=>buffer.length;
        //const getBufferLength = buffer=>Buffer.byteLength(buffer);
        //const getBufferLength = buffer=>buffer.toString("ascii").length;
        //const getBufferLength = buffer=>32; // can"t get this working; hard-coding for now
        //const getBufferLength = buffer=>buffer.type.size; // correct
        // Get the BITMAP from the HBITMAP
        const bmpScreen = new (0, $2c7d42451d1e78bd$export$45e15731b33a8131)();
        //const getObjectRes = gdi32.GetObjectA(hbmScreen, getBufferLength(bmpScreen), bmpScreen);
        const getObject_result = (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).GetObjectA(hbmScreen, 32, bmpScreen.ref());
        log("getObject_result", getObject_result);
        log("bmpScreen.size", (0, $2c7d42451d1e78bd$export$45e15731b33a8131).size);
        log("bmpScreen", JSON.stringify(bmpScreen));
        // bmpScreen isn"t having its data loaded properly fsr; anyway, we only actually use bmWidth and bmHeight, so just hard-code those for now
        /*bmpScreen.bmWidth = rcClient.right - rcClient.left;
        bmpScreen.bmHeight = rcClient.bottom - rcClient.top;*/ const bi = new (0, $2c7d42451d1e78bd$export$462becd5fad16474)();
        //bi.biSize = bi.type.size;
        bi.biSize = (0, $2c7d42451d1e78bd$export$462becd5fad16474).size;
        bi.biWidth = bmpScreen.bmWidth;
        //bi.biHeight = bmpScreen.bmHeight;
        bi.biHeight = -bmpScreen.bmHeight; // by making this negative, we indicate that we want buffer's data to start at top-left pixel, rather than bottom-left
        //bi.biHeight = 3;
        bi.biPlanes = 1;
        bi.biBitCount = 32;
        bi.biCompression = (0, $2c7d42451d1e78bd$export$8e38662e3e297ed0).BI_RGB;
        bi.biSizeImage = 0;
        bi.biXPelsPerMeter = 0;
        bi.biYPelsPerMeter = 0;
        bi.biClrUsed = 0;
        bi.biClrImportant = 0;
        log("bi", JSON.stringify(bi));
        const bitsPerRow = (bmpScreen.bmWidth * bi.biBitCount + 31) / 32 * 4;
        const dwBmpSize = bitsPerRow * bmpScreen.bmHeight;
        log("dwBmpSize", dwBmpSize);
        // Starting with 32-bit Windows, GlobalAlloc and LocalAlloc are implemented as wrapper functions that
        // call HeapAlloc using a handle to the process's default heap. Therefore, GlobalAlloc and LocalAlloc
        // have greater overhead than HeapAlloc.
        // hDIB = kernel32.GlobalAlloc(apiConstants.GHND, dwBmpSize);
        // const lpBitmap = kernel32.GlobalLock(hDIB);
        //const lpBitmap = new (Buffer.alloc as any)(dwBmpSize);
        const lpBitmap = Buffer.alloc(dwBmpSize);
        // Gets the "bits" from the bitmap and copies them into buffer lpbitmap
        //const getDIBitsRes = gdi32.GetDIBits(hdcWindow, hbmScreen, 0, bmpScreen.bmHeight, (lpBitmap as any).ref(), bi.ref(), DIB_Color_Mode.DIB_RGB_COLORS);
        const getDIBitsRes = (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).GetDIBits(hdcWindow, hbmScreen, 0, bmpScreen.bmHeight, lpBitmap, bi.ref(), (0, $2c7d42451d1e78bd$export$57e15596a4c7231f).DIB_RGB_COLORS);
        //const getDIBitsRes = gdi32.GetDIBits(hdcWindow, hbmScreen, 0, 3, ref.ref(lpBitmap), bi.ref(), DIB_Color_Mode.DIB_RGB_COLORS);
        log("getDIBitsRes", getDIBitsRes);
        log("lpBitmap", lpBitmap);
        /*log("Starting test");
        for (let i = 0; i < lpBitmap.length; i += 4) {
            const color = new VColor(lpBitmap[i + 2], lpBitmap[i + 1], lpBitmap[i + 0], lpBitmap[i + 3]); // yeah, the order is a bit odd
            if (i < 4 * 20) log("Color:", color);
        }
        log("Test done");*/ // clean up
        if (hDIB != null) {
            (0, $3841221631af5fa7$export$d2f41e5ea97da1d5).GlobalUnlock(hDIB);
            (0, $3841221631af5fa7$export$d2f41e5ea97da1d5).GlobalFree(hDIB);
        }
        if (hbmScreen != null) (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).DeleteObject(hbmScreen);
        if (hdcMemDC != null) (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).DeleteObject(hdcMemDC);
        if (hdcWindow != null) (0, $a787081e692d4b5a$export$4b754a7d794e4e0d).ReleaseDC(opt.windowHandle, hdcWindow);
        const result = new $61712e24b4c932dc$export$f3a5c5340646c35d({
            buffer: lpBitmap,
            width: bmpScreen.bmWidth,
            height: bmpScreen.bmHeight
        });
        result.buffer = lpBitmap;
        log("Done");
        return result;
    } catch (err) {
        // clean up memory on errors
        if (hDIB != null) {
            (0, $3841221631af5fa7$export$d2f41e5ea97da1d5).GlobalUnlock(hDIB);
            (0, $3841221631af5fa7$export$d2f41e5ea97da1d5).GlobalFree(hDIB);
        }
        if (hbmScreen != null) (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).DeleteObject(hbmScreen);
        if (hdcMemDC != null) (0, $10b86d9ff0152615$export$79b32ae2b7bd7c6c).DeleteObject(hdcMemDC);
        if (hdcWindow != null) (0, $a787081e692d4b5a$export$4b754a7d794e4e0d).ReleaseDC(opt.windowHandle, hdcWindow);
        throw err;
    }
}




let $e5b2ef75c90f282d$export$1fbf6ae150f5289f;
(function(IgtState1) {
    IgtState1[IgtState1["UNKNOWN"] = 0] = "UNKNOWN";
    IgtState1[IgtState1["NO_GAME"] = 1] = "NO_GAME";
    IgtState1[IgtState1["PLAYING"] = 2] = "PLAYING";
    IgtState1[IgtState1["LOADING"] = 3] = "LOADING";
})($e5b2ef75c90f282d$export$1fbf6ae150f5289f || ($e5b2ef75c90f282d$export$1fbf6ae150f5289f = {}));
(0, $e868b7f1fe3d35a7$exports).apiDef["SetProcessDPIAware"] = [
    (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
    []
];
(0, $e868b7f1fe3d35a7$exports).apiDef["GetClientRect"] = [
    (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
    [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
        (0, $1e37355cdb159231$export$be44eba04df286d7).RECT
    ]
];
(0, $e868b7f1fe3d35a7$exports).apiDef["ClientToScreen"] = [
    (0, $1e37355cdb159231$export$be44eba04df286d7).BOOL,
    [
        (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
        (0, $1e37355cdb159231$export$be44eba04df286d7).LPPOINT
    ]
];
const $e5b2ef75c90f282d$var$user32 = (0, $e868b7f1fe3d35a7$exports).load();
const $e5b2ef75c90f282d$var$Struct = (0, (/*@__PURE__*/$parcel$interopDefault($1Pa9k)))($5vfvk);
let $e5b2ef75c90f282d$var$igtState = $e5b2ef75c90f282d$export$1fbf6ae150f5289f.UNKNOWN;
let $e5b2ef75c90f282d$var$hwnd = 0;
let $e5b2ef75c90f282d$var$tickTime = 500;
let $e5b2ef75c90f282d$var$timer;
let $e5b2ef75c90f282d$var$callback = (state)=>{};
$e5b2ef75c90f282d$var$user32.SetProcessDPIAware();
const $e5b2ef75c90f282d$export$5801d716674e6bb6 = (igtCallback)=>{
    $e5b2ef75c90f282d$var$callback = igtCallback;
};
const $e5b2ef75c90f282d$export$a679630bf91eb455 = ()=>{
    $e5b2ef75c90f282d$var$igtState = $e5b2ef75c90f282d$export$1fbf6ae150f5289f.UNKNOWN;
    $e5b2ef75c90f282d$var$hwnd = 0;
    $e5b2ef75c90f282d$var$timer = setTimeout($e5b2ef75c90f282d$var$tickProcessIgt, $e5b2ef75c90f282d$var$tickTime);
};
const $e5b2ef75c90f282d$export$cb0b9fb431e2932b = ()=>{
    clearInterval($e5b2ef75c90f282d$var$timer);
};
const $e5b2ef75c90f282d$var$runCallbackIfChanged = (state)=>{
    if (state != $e5b2ef75c90f282d$var$igtState) {
        $e5b2ef75c90f282d$var$igtState = state;
        $e5b2ef75c90f282d$var$callback($e5b2ef75c90f282d$var$igtState);
    }
};
const $e5b2ef75c90f282d$var$tickProcessIgt = ()=>{
    $e5b2ef75c90f282d$var$timer = setTimeout(()=>{
        $e5b2ef75c90f282d$var$processIgt();
        $e5b2ef75c90f282d$var$tickProcessIgt();
    }, $e5b2ef75c90f282d$var$tickTime);
};
const $e5b2ef75c90f282d$var$enumWindowsProc = $f977867eb89b8f94$exports.Callback((0, $1e37355cdb159231$export$be44eba04df286d7).BOOL, [
    (0, $1e37355cdb159231$export$be44eba04df286d7).HWND,
    (0, $1e37355cdb159231$export$be44eba04df286d7).LPARAM
], (window, lParam)=>{
    const buf = Buffer.alloc(254);
    $e5b2ef75c90f282d$var$user32.GetWindowTextW(window, buf, buf.byteLength);
    if (buf.toString("ucs2").replace(/\0+$/, "") == "Diablo II: Resurrected") {
        $e5b2ef75c90f282d$var$hwnd = window;
        return false;
    }
    return true;
});
const $e5b2ef75c90f282d$var$noGame = ()=>{
    $e5b2ef75c90f282d$var$runCallbackIfChanged($e5b2ef75c90f282d$export$1fbf6ae150f5289f.NO_GAME);
    $e5b2ef75c90f282d$var$hwnd = 0;
    $e5b2ef75c90f282d$var$tickTime = 500;
};
const $e5b2ef75c90f282d$var$gameLoading = ()=>{
    $e5b2ef75c90f282d$var$runCallbackIfChanged($e5b2ef75c90f282d$export$1fbf6ae150f5289f.LOADING);
    $e5b2ef75c90f282d$var$tickTime = 10;
};
const $e5b2ef75c90f282d$var$gamePlaying = ()=>{
    $e5b2ef75c90f282d$var$runCallbackIfChanged($e5b2ef75c90f282d$export$1fbf6ae150f5289f.PLAYING);
    $e5b2ef75c90f282d$var$tickTime = 10;
};
const $e5b2ef75c90f282d$var$processIgt = ()=>{
    if ($e5b2ef75c90f282d$var$hwnd === 0) {
        $e5b2ef75c90f282d$var$user32.EnumWindows($e5b2ef75c90f282d$var$enumWindowsProc, 0);
        if ($e5b2ef75c90f282d$var$hwnd === 0) {
            $e5b2ef75c90f282d$var$noGame();
            return;
        }
    }
    /** @ts-ignore */ const origin = new $e5b2ef75c90f282d$var$Struct((0, $33b0a82c44a922ab$exports).POINT)();
    const retw = $e5b2ef75c90f282d$var$user32.ClientToScreen($e5b2ef75c90f282d$var$hwnd, origin.ref());
    if (retw == 0) {
        $e5b2ef75c90f282d$var$noGame();
        return;
    }
    /** @ts-ignore */ const rectClient = new $e5b2ef75c90f282d$var$Struct((0, $33b0a82c44a922ab$exports).RECT)();
    const ret = $e5b2ef75c90f282d$var$user32.GetClientRect($e5b2ef75c90f282d$var$hwnd, rectClient.ref());
    if (ret == 0) {
        $e5b2ef75c90f282d$var$noGame();
        return;
    }
    const w = rectClient.right;
    const h = rectClient.bottom;
    const x = origin.x;
    const y = origin.y;
    const screenshot = (0, $61712e24b4c932dc$export$cdfb9a6a4ec4454d)({
        rectToCapture: new (0, $8fa580a7c1504ab3$exports.VRect)(x + Math.round(w / 2) - 100, y + h - 1, 200, 1)
    });
    const isLoading = screenshot.GetPixel(0, 0).ToHex_RGB() == "000000" && screenshot.GetPixel(100, 0).ToHex_RGB() == "000000" && screenshot.GetPixel(199, 0).ToHex_RGB() == "000000";
    if (isLoading) $e5b2ef75c90f282d$var$gameLoading();
    else $e5b2ef75c90f282d$var$gamePlaying();
};


(0, $e5b2ef75c90f282d$export$5801d716674e6bb6)((state)=>{
    let stateStr = "";
    switch(state){
        case (0, $e5b2ef75c90f282d$export$1fbf6ae150f5289f).LOADING:
            stateStr = "Loading";
            break;
        case (0, $e5b2ef75c90f282d$export$1fbf6ae150f5289f).PLAYING:
            stateStr = "Playing";
            break;
        case (0, $e5b2ef75c90f282d$export$1fbf6ae150f5289f).NO_GAME:
            stateStr = "No game";
            break;
        default:
            stateStr = "Unknown";
    }
    console.log("State changed to: " + stateStr);
});
(0, $e5b2ef75c90f282d$export$a679630bf91eb455)();
console.log("test");
setInterval(()=>{}, 1000);


//# sourceMappingURL=cli.cjs.map