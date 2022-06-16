var $chspj$buffer = require("buffer");
var $chspj$util = require("util");
var $chspj$assert = require("assert");
var $chspj$process = require("process");
var $chspj$os = require("os");
var $chspj$path = require("path");
var $chspj$nodegypbuild = require("node-gyp-build");
var $chspj$fs = require("fs");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
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
parcelRequire.register("5IhKb", function(module, exports) {

var $428ed3601d2ebbb3$require$Buffer = $chspj$buffer.Buffer;
"use strict";



var $428ed3601d2ebbb3$var$debug = (parcelRequire("hLLBP"))("ref:struct");
/**
 * Module exports.
 */ module.exports = function(ref) {
    /**
 * The Struct "type" meta-constructor.
 */ function Struct() {
        $428ed3601d2ebbb3$var$debug('defining new struct "type"');
        /**
   * This is the "constructor" of the Struct type that gets returned.
   *
   * Invoke it with `new` to create a new Buffer instance backing the struct.
   * Pass it an existing Buffer instance to use that as the backing buffer.
   * Pass in an Object containing the struct fields to auto-populate the
   * struct with the data.
   */ function StructType(arg, data) {
            if (!(this instanceof StructType)) return new StructType(arg, data);
            $428ed3601d2ebbb3$var$debug("creating new struct instance");
            var store;
            if ($428ed3601d2ebbb3$require$Buffer.isBuffer(arg)) {
                $428ed3601d2ebbb3$var$debug("using passed-in Buffer instance to back the struct", arg);
                $chspj$assert(arg.length >= StructType.size, "Buffer instance must be at least " + StructType.size + " bytes to back this struct type");
                store = arg;
                arg = data;
            } else {
                $428ed3601d2ebbb3$var$debug("creating new Buffer instance to back the struct (size: %d)", StructType.size);
                store = $428ed3601d2ebbb3$require$Buffer.alloc(StructType.size);
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
        $428ed3601d2ebbb3$var$debug('Struct "type" getter for buffer at offset', buffer, offset);
        if (offset > 0) buffer = buffer.slice(offset);
        return new this(buffer);
    }
    /**
 * The "set" function of the Struct "type" interface
 */ function set(buffer, offset, value) {
        $428ed3601d2ebbb3$var$debug('Struct "type" setter for buffer at offset', buffer, offset, value);
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
        $428ed3601d2ebbb3$var$debug("defining new struct type field", name);
        // allow string types for convenience
        type = ref.coerceType(type);
        $chspj$assert(!this._instanceCreated, 'an instance of this Struct type has already been created, cannot add new "fields" anymore');
        $chspj$assert.equal("string", typeof name, 'expected a "string" field name');
        $chspj$assert(type && /object|function/i.test(typeof type) && "size" in type && "indirection" in type, 'expected a "type" object describing the field type: "' + type + '"');
        $chspj$assert(type.indirection > 1 || type.size > 0, '"type" object must have a size greater than 0');
        $chspj$assert(!(name in this.prototype), 'the field "' + name + '" already exists in this Struct type');
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
            $428ed3601d2ebbb3$var$debug('getting "%s" struct field (offset: %d)', name, field.offset);
            return ref.get(this["ref.buffer"], field.offset, type);
        };
        desc.set = function(value) {
            $428ed3601d2ebbb3$var$debug('setting "%s" struct field (offset: %d)', name, field.offset, value);
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
            if (!struct.isPacked) $chspj$assert.equal(offset % align, 0, "offset should align");
            // adjust the "size" of the struct type
            struct.size = offset + size;
            // return the calulated offset
            return offset;
        }
        // any final padding?
        var left = struct.size % struct.alignment;
        if (left > 0) {
            $428ed3601d2ebbb3$var$debug("additional padding to the end of struct:", struct.alignment - left);
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
        return $chspj$util.inspect(obj);
    };
    /**
 * returns a Buffer pointing to this struct data structure.
 */ proto.ref = function ref() {
        return this["ref.buffer"];
    };
    return Struct;
};

});
parcelRequire.register("hLLBP", function(module, exports) {

"use strict";
function $cefbc19d48218231$var$_typeof(obj1) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") $cefbc19d48218231$var$_typeof = function _typeof(obj) {
        return typeof obj;
    };
    else $cefbc19d48218231$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    return $cefbc19d48218231$var$_typeof(obj1);
}
/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ module.exports.log = $cefbc19d48218231$var$log;
module.exports.formatArgs = $cefbc19d48218231$var$formatArgs;
module.exports.save = $cefbc19d48218231$var$save;
module.exports.load = $cefbc19d48218231$var$load;
module.exports.useColors = $cefbc19d48218231$var$useColors;
module.exports.storage = $cefbc19d48218231$var$localstorage();
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
function $cefbc19d48218231$var$useColors() {
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
 */ function $cefbc19d48218231$var$formatArgs(args) {
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
 */ function $cefbc19d48218231$var$log() {
    var _console;
    // This hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return (typeof console === "undefined" ? "undefined" : $cefbc19d48218231$var$_typeof(console)) === "object" && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function $cefbc19d48218231$var$save(namespaces) {
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
 */ function $cefbc19d48218231$var$load() {
    var r;
    try {
        r = module.exports.storage.getItem("debug");
    } catch (error) {} // Swallow
    // XXX (@Qix-) should we be logging these?
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof $chspj$process !== "undefined" && "env" in $chspj$process) r = undefined;
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
 */ function $cefbc19d48218231$var$localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // XXX (@Qix-) should we be logging these?
    }
}

module.exports = (parcelRequire("jrBNi"))(module.exports);
var $cefbc19d48218231$var$formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ $cefbc19d48218231$var$formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
    }
};

});
parcelRequire.register("jrBNi", function(module, exports) {
"use strict";

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function $e27ddb1589c9868f$var$setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = (parcelRequire("anR8w"));
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
module.exports = $e27ddb1589c9868f$var$setup;

});
parcelRequire.register("anR8w", function(module, exports) {
/**
 * Helpers.
 */ var $78f5452d8ecaccbd$var$s = 1000;
var $78f5452d8ecaccbd$var$m = $78f5452d8ecaccbd$var$s * 60;
var $78f5452d8ecaccbd$var$h = $78f5452d8ecaccbd$var$m * 60;
var $78f5452d8ecaccbd$var$d = $78f5452d8ecaccbd$var$h * 24;
var $78f5452d8ecaccbd$var$w = $78f5452d8ecaccbd$var$d * 7;
var $78f5452d8ecaccbd$var$y = $78f5452d8ecaccbd$var$d * 365.25;
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
    if (type === "string" && val.length > 0) return $78f5452d8ecaccbd$var$parse(val);
    else if (type === "number" && isFinite(val)) return options.long ? $78f5452d8ecaccbd$var$fmtLong(val) : $78f5452d8ecaccbd$var$fmtShort(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function $78f5452d8ecaccbd$var$parse(str) {
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
            return n * $78f5452d8ecaccbd$var$y;
        case "weeks":
        case "week":
        case "w":
            return n * $78f5452d8ecaccbd$var$w;
        case "days":
        case "day":
        case "d":
            return n * $78f5452d8ecaccbd$var$d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * $78f5452d8ecaccbd$var$h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * $78f5452d8ecaccbd$var$m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * $78f5452d8ecaccbd$var$s;
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
 */ function $78f5452d8ecaccbd$var$fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $78f5452d8ecaccbd$var$d) return Math.round(ms / $78f5452d8ecaccbd$var$d) + "d";
    if (msAbs >= $78f5452d8ecaccbd$var$h) return Math.round(ms / $78f5452d8ecaccbd$var$h) + "h";
    if (msAbs >= $78f5452d8ecaccbd$var$m) return Math.round(ms / $78f5452d8ecaccbd$var$m) + "m";
    if (msAbs >= $78f5452d8ecaccbd$var$s) return Math.round(ms / $78f5452d8ecaccbd$var$s) + "s";
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $78f5452d8ecaccbd$var$fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $78f5452d8ecaccbd$var$d) return $78f5452d8ecaccbd$var$plural(ms, msAbs, $78f5452d8ecaccbd$var$d, "day");
    if (msAbs >= $78f5452d8ecaccbd$var$h) return $78f5452d8ecaccbd$var$plural(ms, msAbs, $78f5452d8ecaccbd$var$h, "hour");
    if (msAbs >= $78f5452d8ecaccbd$var$m) return $78f5452d8ecaccbd$var$plural(ms, msAbs, $78f5452d8ecaccbd$var$m, "minute");
    if (msAbs >= $78f5452d8ecaccbd$var$s) return $78f5452d8ecaccbd$var$plural(ms, msAbs, $78f5452d8ecaccbd$var$s, "second");
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function $78f5452d8ecaccbd$var$plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}

});




parcelRequire.register("gxkm2", function(module, exports) {
var __dirname = "node_modules/ref-napi/lib";

var Buffer = $chspj$buffer.Buffer;
"use strict";


var $c09f8467abeae6ba$require$inspect = $chspj$util.inspect;

const debug = (parcelRequire("c9ItD"))("ref");



exports = module.exports = $chspj$nodegypbuild($chspj$path.join(__dirname, ".."));
exports.endianness = $chspj$os.endianness();
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
                if (!(rtn && "size" in rtn && "indirection" in rtn)) throw new TypeError('could not determine a proper "type" from: ' + $c09f8467abeae6ba$require$inspect(type));
                for(let i = 0; i < refCount; i++)rtn = exports.refType(rtn);
            }
        }
    }
    if (!(rtn && "size" in rtn && "indirection" in rtn)) throw new TypeError('could not determine a proper "type" from: ' + $c09f8467abeae6ba$require$inspect(type));
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
    $chspj$assert(type.indirection > 0, `"indirection" level must be at least 1, saw ${type.indirection}`);
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
    $chspj$assert(type.indirection >= 1, '"indirection" level must be at least 1');
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
    $chspj$assert(Buffer.isBuffer(buffer), "expected a Buffer as the first argument");
    $chspj$assert.strictEqual("string", typeof string, 'expected a "string" as the third argument');
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
    $chspj$assert(size >= 1 && size <= 8);
    let typeName = "int" + size * 8;
    if (unsigned) typeName = "u" + typeName;
    const type = exports.types[typeName];
    $chspj$assert(type);
    exports.types[name] = Object.create(type);
});
// set the "alignment" property on the built-in types
Object.keys(exports.alignof).forEach((name)=>{
    if (name === "pointer") return;
    exports.types[name].alignment = exports.alignof[name];
    $chspj$assert(exports.types[name].alignment > 0);
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
 */ var inspectSym = $c09f8467abeae6ba$require$inspect.custom || "inspect";
/**
 * in node 6.91, inspect.custom does not give a correct value; so in this case, don't torch the whole process.
 * fixed in >6.9.2
 */ if (Buffer.prototype[inspectSym]) Buffer.prototype[inspectSym] = overwriteInspect(Buffer.prototype[inspectSym]);

// does SlowBuffer inherit from Buffer? (node >= v0.7.9)
if (!(exports.NULL instanceof Buffer)) {
    debug("extending SlowBuffer's prototype since it doesn't inherit from Buffer.prototype");
    /*!
   * SlowBuffer convenience methods.
   */ var SlowBuffer = $chspj$buffer.SlowBuffer;
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
function overwriteInspect(inspect) {
    if (inspect.name === "refinspect") return inspect;
    else return function refinspect() {
        var v = inspect.apply(this, arguments);
        return v.replace("Buffer", "Buffer@0x" + this.hexAddress());
    };
}

});
parcelRequire.register("c9ItD", function(module, exports) {

/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ module.exports.formatArgs = $8d98d3815777a9eb$var$formatArgs;
module.exports.save = $8d98d3815777a9eb$var$save;
module.exports.load = $8d98d3815777a9eb$var$load;
module.exports.useColors = $8d98d3815777a9eb$var$useColors;
module.exports.storage = $8d98d3815777a9eb$var$localstorage();
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
function $8d98d3815777a9eb$var$useColors() {
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
 */ function $8d98d3815777a9eb$var$formatArgs(args) {
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
 */ function $8d98d3815777a9eb$var$save(namespaces) {
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
 */ function $8d98d3815777a9eb$var$load() {
    let r;
    try {
        r = module.exports.storage.getItem("debug");
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof $chspj$process !== "undefined" && "env" in $chspj$process) r = undefined;
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
 */ function $8d98d3815777a9eb$var$localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}

module.exports = (parcelRequire("hJaAA"))(module.exports);
const { formatters: $8d98d3815777a9eb$var$formatters  } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ $8d98d3815777a9eb$var$formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
    }
};

});
parcelRequire.register("hJaAA", function(module, exports) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function $ce7eda69bf37bf14$var$setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = (parcelRequire("7yYAH"));
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
module.exports = $ce7eda69bf37bf14$var$setup;

});
parcelRequire.register("7yYAH", function(module, exports) {
/**
 * Helpers.
 */ var $581ab5759aacbafa$var$s = 1000;
var $581ab5759aacbafa$var$m = $581ab5759aacbafa$var$s * 60;
var $581ab5759aacbafa$var$h = $581ab5759aacbafa$var$m * 60;
var $581ab5759aacbafa$var$d = $581ab5759aacbafa$var$h * 24;
var $581ab5759aacbafa$var$w = $581ab5759aacbafa$var$d * 7;
var $581ab5759aacbafa$var$y = $581ab5759aacbafa$var$d * 365.25;
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
    if (type === "string" && val.length > 0) return $581ab5759aacbafa$var$parse(val);
    else if (type === "number" && isFinite(val)) return options.long ? $581ab5759aacbafa$var$fmtLong(val) : $581ab5759aacbafa$var$fmtShort(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function $581ab5759aacbafa$var$parse(str) {
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
            return n * $581ab5759aacbafa$var$y;
        case "weeks":
        case "week":
        case "w":
            return n * $581ab5759aacbafa$var$w;
        case "days":
        case "day":
        case "d":
            return n * $581ab5759aacbafa$var$d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * $581ab5759aacbafa$var$h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * $581ab5759aacbafa$var$m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * $581ab5759aacbafa$var$s;
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
 */ function $581ab5759aacbafa$var$fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $581ab5759aacbafa$var$d) return Math.round(ms / $581ab5759aacbafa$var$d) + "d";
    if (msAbs >= $581ab5759aacbafa$var$h) return Math.round(ms / $581ab5759aacbafa$var$h) + "h";
    if (msAbs >= $581ab5759aacbafa$var$m) return Math.round(ms / $581ab5759aacbafa$var$m) + "m";
    if (msAbs >= $581ab5759aacbafa$var$s) return Math.round(ms / $581ab5759aacbafa$var$s) + "s";
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $581ab5759aacbafa$var$fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $581ab5759aacbafa$var$d) return $581ab5759aacbafa$var$plural(ms, msAbs, $581ab5759aacbafa$var$d, "day");
    if (msAbs >= $581ab5759aacbafa$var$h) return $581ab5759aacbafa$var$plural(ms, msAbs, $581ab5759aacbafa$var$h, "hour");
    if (msAbs >= $581ab5759aacbafa$var$m) return $581ab5759aacbafa$var$plural(ms, msAbs, $581ab5759aacbafa$var$m, "minute");
    if (msAbs >= $581ab5759aacbafa$var$s) return $581ab5759aacbafa$var$plural(ms, msAbs, $581ab5759aacbafa$var$s, "second");
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function $581ab5759aacbafa$var$plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}

});




parcelRequire.register("3Mi5p", function(module, exports) {

/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ module.exports.formatArgs = $2c03e25bfbbbfbf3$var$formatArgs;
module.exports.save = $2c03e25bfbbbfbf3$var$save;
module.exports.load = $2c03e25bfbbbfbf3$var$load;
module.exports.useColors = $2c03e25bfbbbfbf3$var$useColors;
module.exports.storage = $2c03e25bfbbbfbf3$var$localstorage();
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
function $2c03e25bfbbbfbf3$var$useColors() {
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
 */ function $2c03e25bfbbbfbf3$var$formatArgs(args) {
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
 */ function $2c03e25bfbbbfbf3$var$save(namespaces) {
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
 */ function $2c03e25bfbbbfbf3$var$load() {
    let r;
    try {
        r = module.exports.storage.getItem("debug");
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof $chspj$process !== "undefined" && "env" in $chspj$process) r = undefined;
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
 */ function $2c03e25bfbbbfbf3$var$localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}

module.exports = (parcelRequire("iTpVE"))(module.exports);
const { formatters: $2c03e25bfbbbfbf3$var$formatters  } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ $2c03e25bfbbbfbf3$var$formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
    }
};

});
parcelRequire.register("iTpVE", function(module, exports) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function $dc117a010a4e8ea7$var$setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = (parcelRequire("lEzFW"));
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
module.exports = $dc117a010a4e8ea7$var$setup;

});
parcelRequire.register("lEzFW", function(module, exports) {
/**
 * Helpers.
 */ var $fc3901d22832a29f$var$s = 1000;
var $fc3901d22832a29f$var$m = $fc3901d22832a29f$var$s * 60;
var $fc3901d22832a29f$var$h = $fc3901d22832a29f$var$m * 60;
var $fc3901d22832a29f$var$d = $fc3901d22832a29f$var$h * 24;
var $fc3901d22832a29f$var$w = $fc3901d22832a29f$var$d * 7;
var $fc3901d22832a29f$var$y = $fc3901d22832a29f$var$d * 365.25;
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
    if (type === "string" && val.length > 0) return $fc3901d22832a29f$var$parse(val);
    else if (type === "number" && isFinite(val)) return options.long ? $fc3901d22832a29f$var$fmtLong(val) : $fc3901d22832a29f$var$fmtShort(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function $fc3901d22832a29f$var$parse(str) {
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
            return n * $fc3901d22832a29f$var$y;
        case "weeks":
        case "week":
        case "w":
            return n * $fc3901d22832a29f$var$w;
        case "days":
        case "day":
        case "d":
            return n * $fc3901d22832a29f$var$d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * $fc3901d22832a29f$var$h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * $fc3901d22832a29f$var$m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * $fc3901d22832a29f$var$s;
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
 */ function $fc3901d22832a29f$var$fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $fc3901d22832a29f$var$d) return Math.round(ms / $fc3901d22832a29f$var$d) + "d";
    if (msAbs >= $fc3901d22832a29f$var$h) return Math.round(ms / $fc3901d22832a29f$var$h) + "h";
    if (msAbs >= $fc3901d22832a29f$var$m) return Math.round(ms / $fc3901d22832a29f$var$m) + "m";
    if (msAbs >= $fc3901d22832a29f$var$s) return Math.round(ms / $fc3901d22832a29f$var$s) + "s";
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $fc3901d22832a29f$var$fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $fc3901d22832a29f$var$d) return $fc3901d22832a29f$var$plural(ms, msAbs, $fc3901d22832a29f$var$d, "day");
    if (msAbs >= $fc3901d22832a29f$var$h) return $fc3901d22832a29f$var$plural(ms, msAbs, $fc3901d22832a29f$var$h, "hour");
    if (msAbs >= $fc3901d22832a29f$var$m) return $fc3901d22832a29f$var$plural(ms, msAbs, $fc3901d22832a29f$var$m, "minute");
    if (msAbs >= $fc3901d22832a29f$var$s) return $fc3901d22832a29f$var$plural(ms, msAbs, $fc3901d22832a29f$var$s, "second");
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function $fc3901d22832a29f$var$plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}

});



parcelRequire.register("7riHf", function(module, exports) {

var $56a98ec31487e9c2$require$Buffer = $chspj$buffer.Buffer;
"use strict";

var $inr9a = parcelRequire("inr9a");


const $56a98ec31487e9c2$var$debug = (parcelRequire("3Mi5p"))("ffi:cif");

var $gxkm2 = parcelRequire("gxkm2");

var $47Hd6 = parcelRequire("47Hd6");
const $56a98ec31487e9c2$var$POINTER_SIZE = $gxkm2.sizeof.pointer;
const $56a98ec31487e9c2$var$ffi_prep_cif = $47Hd6.ffi_prep_cif;
const $56a98ec31487e9c2$var$FFI_CIF_SIZE = $47Hd6.FFI_CIF_SIZE;
const $56a98ec31487e9c2$var$FFI_DEFAULT_ABI = $47Hd6.FFI_DEFAULT_ABI;
// status codes
const $56a98ec31487e9c2$var$FFI_OK = $47Hd6.FFI_OK;
const $56a98ec31487e9c2$var$FFI_BAD_TYPEDEF = $47Hd6.FFI_BAD_TYPEDEF;
const $56a98ec31487e9c2$var$FFI_BAD_ABI = $47Hd6.FFI_BAD_ABI;
/**
 * JS wrapper for the `ffi_prep_cif` function.
 * Returns a Buffer instance representing a `ffi_cif *` instance.
 */ const $56a98ec31487e9c2$var$cifs = [];
function $56a98ec31487e9c2$var$CIF(rtype, types, abi) {
    $56a98ec31487e9c2$var$debug("creating `ffi_cif *` instance");
    // the return and arg types are expected to be coerced at this point...
    $chspj$assert(!!rtype, 'expected a return "type" object as the first argument');
    $chspj$assert(Array.isArray(types), 'expected an Array of arg "type" objects as the second argument');
    // the buffer that will contain the return `ffi_cif *` instance
    const cif = $56a98ec31487e9c2$require$Buffer.alloc($56a98ec31487e9c2$var$FFI_CIF_SIZE);
    const numArgs = types.length;
    const _argtypesptr = $56a98ec31487e9c2$require$Buffer.alloc(numArgs * $56a98ec31487e9c2$var$POINTER_SIZE);
    const _rtypeptr = $inr9a(rtype);
    for(var i = 0; i < numArgs; i++){
        const type = types[i];
        const ffiType = $inr9a(type);
        _argtypesptr.writePointer(ffiType, i * $56a98ec31487e9c2$var$POINTER_SIZE);
    }
    // prevent GC of the arg type and rtn type buffers (not sure if this is required)
    cif.rtnTypePtr = _rtypeptr;
    cif.argTypesPtr = _argtypesptr;
    if (typeof abi === "undefined") {
        $56a98ec31487e9c2$var$debug("no ABI specified (this is OK), using FFI_DEFAULT_ABI");
        abi = $56a98ec31487e9c2$var$FFI_DEFAULT_ABI;
    }
    const status = $56a98ec31487e9c2$var$ffi_prep_cif(cif, numArgs, _rtypeptr, _argtypesptr, abi);
    if (status !== $56a98ec31487e9c2$var$FFI_OK) switch(status){
        case $56a98ec31487e9c2$var$FFI_BAD_TYPEDEF:
            {
                const err = new Error("ffi_prep_cif() returned an FFI_BAD_TYPEDEF error");
                err.code = "FFI_BAD_TYPEDEF";
                err.errno = status;
                throw err;
            }
        case $56a98ec31487e9c2$var$FFI_BAD_ABI:
            {
                const err = new Error("ffi_prep_cif() returned an FFI_BAD_ABI error");
                err.code = "FFI_BAD_ABI";
                err.errno = status;
                throw err;
            }
        default:
            throw new Error("ffi_prep_cif() returned an error: " + status);
    }
    if ($56a98ec31487e9c2$var$debug.enabled || `${undefined}`.match(/\bffi\b/)) $56a98ec31487e9c2$var$cifs.push(cif);
    return cif;
}
module.exports = $56a98ec31487e9c2$var$CIF;

});
parcelRequire.register("inr9a", function(module, exports) {

var $d60f6ec76ae71812$require$Buffer = $chspj$buffer.Buffer;
"use strict";

var $gxkm2 = parcelRequire("gxkm2");


const $d60f6ec76ae71812$var$debug = (parcelRequire("3Mi5p"))("ffi:types");

const $d60f6ec76ae71812$var$Struct = (parcelRequire("5IhKb"))($gxkm2);

var $47Hd6 = parcelRequire("47Hd6");
/**
 * Define the `ffi_type` struct (see deps/libffi/include/ffi.h) for use in JS.
 * This struct type is used internally to define custom struct ret/arg types.
 */ const $d60f6ec76ae71812$var$FFI_TYPE = $d60f6ec76ae71812$var$Type.FFI_TYPE = $d60f6ec76ae71812$var$Struct();
$d60f6ec76ae71812$var$FFI_TYPE.defineProperty("size", $gxkm2.types.size_t);
$d60f6ec76ae71812$var$FFI_TYPE.defineProperty("alignment", $gxkm2.types.ushort);
$d60f6ec76ae71812$var$FFI_TYPE.defineProperty("type", $gxkm2.types.ushort);
// this last prop is a C Array of `ffi_type *` elements, so this is `ffi_type **`
const $d60f6ec76ae71812$var$ffi_type_ptr_array = $gxkm2.refType($gxkm2.refType($d60f6ec76ae71812$var$FFI_TYPE));
$d60f6ec76ae71812$var$FFI_TYPE.defineProperty("elements", $d60f6ec76ae71812$var$ffi_type_ptr_array);
$chspj$assert.strictEqual($47Hd6.FFI_TYPE_SIZE, $d60f6ec76ae71812$var$FFI_TYPE.size);
/**
 * Returns a `ffi_type *` Buffer appropriate for the given "type".
 *
 * @param {Type|String} type A "ref" type (or string) to get the `ffi_type` for
 * @return {Buffer} A buffer pointing to a `ffi_type` instance for "type"
 * @api private
 */ function $d60f6ec76ae71812$var$Type(type) {
    type = $gxkm2.coerceType(type);
    $d60f6ec76ae71812$var$debug("Type()", type.name || type);
    $chspj$assert(type.indirection >= 1, 'invalid "type" given: ' + (type.name || type));
    let ret;
    // first we assume it's a regular "type". if the "indirection" is greater than
    // 1, then we can just use "pointer" ffi_type, otherwise we hope "ffi_type" is
    // set
    if (type.indirection === 1) ret = type.ffi_type;
    else ret = $47Hd6.FFI_TYPES.pointer;
    // if "ret" isn't set (ffi_type was not set) then we check for "ref-array" type
    if (!ret && type.type) // got a "ref-array" type
    // passing arrays to C functions are always by reference, so we use "pointer"
    ret = $47Hd6.FFI_TYPES.pointer;
    if (!ret && type.fields) {
        // got a "ref-struct" type
        // need to create the `ffi_type` instance manually
        $d60f6ec76ae71812$var$debug('creating an `ffi_type` for given "ref-struct" type');
        const fields = type.fields;
        const fieldNames = Object.keys(fields);
        const numFields = fieldNames.length;
        let numElements = 0;
        const ffi_type = new $d60f6ec76ae71812$var$FFI_TYPE;
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
        const size = $gxkm2.sizeof.pointer * (numElements + 1); // +1 because of the NULL terminator
        const elements = ffi_type.elements = $d60f6ec76ae71812$require$Buffer.alloc(size);
        let index = 0;
        for(let i1 = 0; i1 < numFields; i1++){
            field = fields[fieldNames[i1]];
            if (field.type.fixedLength > 0) {
                // a fixed-length "ref-array" type
                ffi_type_ptr = $d60f6ec76ae71812$var$Type(field.type.type);
                for(var j = 0; j < field.type.fixedLength; j++)elements.writePointer(ffi_type_ptr, (index++) * $gxkm2.sizeof.pointer);
            } else {
                ffi_type_ptr = $d60f6ec76ae71812$var$Type(field.type);
                elements.writePointer(ffi_type_ptr, (index++) * $gxkm2.sizeof.pointer);
            }
        }
        // final NULL pointer to terminate the Array
        elements.writePointer($gxkm2.NULL, index * $gxkm2.sizeof.pointer);
        // also set the `ffi_type` property to that it's cached for next time
        ret = type.ffi_type = ffi_type.ref();
    }
    if (!ret && type.name) {
        // handle "ref" types other than the set that node-ffi is using (i.e.
        // a separate copy)
        if ("CString" == type.name) ret = type.ffi_type = $47Hd6.FFI_TYPES.pointer;
        else {
            let cur = type;
            while(!ret && cur){
                ret = cur.ffi_type = $47Hd6.FFI_TYPES[cur.name];
                cur = Object.getPrototypeOf(cur);
            }
        }
    }
    $chspj$assert(ret, "Could not determine the `ffi_type` instance for type: " + (type.name || type));
    $d60f6ec76ae71812$var$debug("returning `ffi_type`", ret.name);
    return ret;
}
module.exports = $d60f6ec76ae71812$var$Type;

});
parcelRequire.register("47Hd6", function(module, exports) {
var $3009558ab649823e$var$__dirname = "node_modules/ffi-napi/lib";
"use strict";


var $gxkm2 = parcelRequire("gxkm2");

$chspj$assert($gxkm2.instance);

const $3009558ab649823e$var$bindings = $chspj$nodegypbuild($chspj$path.join($3009558ab649823e$var$__dirname, ".."));
module.exports = $3009558ab649823e$var$bindings.initializeBindings($gxkm2.instance);

});



parcelRequire.register("fppnV", function(module, exports) {

var $b37ce1b9dcbbccf9$require$Buffer = $chspj$buffer.Buffer;
"use strict";

var $inr9a = parcelRequire("inr9a");


const $b37ce1b9dcbbccf9$var$debug = (parcelRequire("3Mi5p"))("ffi:cif_var");

var $gxkm2 = parcelRequire("gxkm2");

var $47Hd6 = parcelRequire("47Hd6");
const $b37ce1b9dcbbccf9$var$POINTER_SIZE = $gxkm2.sizeof.pointer;
const $b37ce1b9dcbbccf9$var$ffi_prep_cif_var = $47Hd6.ffi_prep_cif_var;
const $b37ce1b9dcbbccf9$var$FFI_CIF_SIZE = $47Hd6.FFI_CIF_SIZE;
const $b37ce1b9dcbbccf9$var$FFI_DEFAULT_ABI = $47Hd6.FFI_DEFAULT_ABI;
// status codes
const $b37ce1b9dcbbccf9$var$FFI_OK = $47Hd6.FFI_OK;
const $b37ce1b9dcbbccf9$var$FFI_BAD_TYPEDEF = $47Hd6.FFI_BAD_TYPEDEF;
const $b37ce1b9dcbbccf9$var$FFI_BAD_ABI = $47Hd6.FFI_BAD_ABI;
/**
 * JS wrapper for the `ffi_prep_cif_var` function.
 * Returns a Buffer instance representing a variadic `ffi_cif *` instance.
 */ function $b37ce1b9dcbbccf9$var$CIF_var(rtype, types, numFixedArgs, abi) {
    $b37ce1b9dcbbccf9$var$debug("creating `ffi_cif *` instance with `ffi_prep_cif_var()`");
    // the return and arg types are expected to be coerced at this point...
    $chspj$assert(!!rtype, 'expected a return "type" object as the first argument');
    $chspj$assert(Array.isArray(types), 'expected an Array of arg "type" objects as the second argument');
    $chspj$assert(numFixedArgs >= 1, "expected the number of fixed arguments to be at least 1");
    // the buffer that will contain the return `ffi_cif *` instance
    const cif = $b37ce1b9dcbbccf9$require$Buffer.alloc($b37ce1b9dcbbccf9$var$FFI_CIF_SIZE);
    const numTotalArgs = types.length;
    const _argtypesptr = $b37ce1b9dcbbccf9$require$Buffer.alloc(numTotalArgs * $b37ce1b9dcbbccf9$var$POINTER_SIZE);
    const _rtypeptr = $inr9a(rtype);
    for(let i = 0; i < numTotalArgs; i++){
        const ffiType = $inr9a(types[i]);
        _argtypesptr.writePointer(ffiType, i * $b37ce1b9dcbbccf9$var$POINTER_SIZE);
    }
    // prevent GC of the arg type and rtn type buffers (not sure if this is required)
    cif.rtnTypePtr = _rtypeptr;
    cif.argTypesPtr = _argtypesptr;
    if (typeof abi === "undefined") {
        $b37ce1b9dcbbccf9$var$debug("no ABI specified (this is OK), using FFI_DEFAULT_ABI");
        abi = $b37ce1b9dcbbccf9$var$FFI_DEFAULT_ABI;
    }
    const status = $b37ce1b9dcbbccf9$var$ffi_prep_cif_var(cif, numFixedArgs, numTotalArgs, _rtypeptr, _argtypesptr, abi);
    if (status !== $b37ce1b9dcbbccf9$var$FFI_OK) switch(status){
        case $b37ce1b9dcbbccf9$var$FFI_BAD_TYPEDEF:
            {
                const err = new Error("ffi_prep_cif_var() returned an FFI_BAD_TYPEDEF error");
                err.code = "FFI_BAD_TYPEDEF";
                err.errno = status;
                throw err;
            }
        case $b37ce1b9dcbbccf9$var$FFI_BAD_ABI:
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
module.exports = $b37ce1b9dcbbccf9$var$CIF_var;

});

parcelRequire.register("lF8rf", function(module, exports) {

var $fc53f902eedb5244$require$Buffer = $chspj$buffer.Buffer;
"use strict";

var $gxkm2 = parcelRequire("gxkm2");


var $47Hd6 = parcelRequire("47Hd6");

var $gtbuo = parcelRequire("gtbuo");

var $kva1c = parcelRequire("kva1c");

const $fc53f902eedb5244$var$debug = (parcelRequire("3Mi5p"))("ffi:FunctionType");
/**
 * Module exports.
 */ module.exports = $fc53f902eedb5244$var$Function;
/**
 * Creates and returns a "type" object for a C "function pointer".
 *
 * @api public
 */ function $fc53f902eedb5244$var$Function(retType, argTypes, abi) {
    if (!(this instanceof $fc53f902eedb5244$var$Function)) return new $fc53f902eedb5244$var$Function(retType, argTypes, abi);
    $fc53f902eedb5244$var$debug("creating new FunctionType");
    // check args
    $chspj$assert(!!retType, 'expected a return "type" object as the first argument');
    $chspj$assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the second argument');
    // normalize the "types" (they could be strings, so turn into real type
    // instances)
    this.retType = $gxkm2.coerceType(retType);
    this.argTypes = argTypes.map($gxkm2.coerceType);
    this.abi = null == abi ? $47Hd6.FFI_DEFAULT_ABI : abi;
}
/**
 * The "ffi_type" is set for node-ffi functions.
 */ $fc53f902eedb5244$var$Function.prototype.ffi_type = $47Hd6.FFI_TYPES.pointer;
/**
 * The "size" is always pointer-sized.
 */ $fc53f902eedb5244$var$Function.prototype.size = $gxkm2.sizeof.pointer;
/**
 * The "alignment" is always pointer-aligned.
 */ $fc53f902eedb5244$var$Function.prototype.alignment = $gxkm2.alignof.pointer;
/**
 * The "indirection" is always 1 to ensure that our get()/set() get called.
 */ $fc53f902eedb5244$var$Function.prototype.indirection = 1;
/**
 * Returns a ffi.Callback pointer (Buffer) of this function type for the
 * given `fn` Function.
 */ $fc53f902eedb5244$var$Function.prototype.toPointer = function toPointer(fn) {
    return $gtbuo(this.retType, this.argTypes, this.abi, fn);
};
/**
 * Returns a ffi.ForeignFunction (Function) of this function type for the
 * given `buf` Buffer.
 */ $fc53f902eedb5244$var$Function.prototype.toFunction = function toFunction(buf) {
    return $kva1c(buf, this.retType, this.argTypes, this.abi);
};
/**
 * get function; return a ForeignFunction instance.
 */ $fc53f902eedb5244$var$Function.prototype.get = function get(buffer, offset) {
    $fc53f902eedb5244$var$debug('ffi FunctionType "get" function');
    const ptr = buffer.readPointer(offset);
    return this.toFunction(ptr);
};
/**
 * set function; return a Callback buffer.
 */ $fc53f902eedb5244$var$Function.prototype.set = function set(buffer, offset, value) {
    $fc53f902eedb5244$var$debug('ffi FunctionType "set" function');
    let ptr;
    if ("function" == typeof value) ptr = this.toPointer(value);
    else if ($fc53f902eedb5244$require$Buffer.isBuffer(value)) ptr = value;
    else throw new Error("don't know how to set callback function for: " + value);
    buffer.writePointer(ptr, offset);
};

});
parcelRequire.register("gtbuo", function(module, exports) {

"use strict";

var $gxkm2 = parcelRequire("gxkm2");

var $7riHf = parcelRequire("7riHf");


const $bfd8444f7e84b88c$var$debug = (parcelRequire("3Mi5p"))("ffi:Callback");

var $47Hd6 = parcelRequire("47Hd6");
var $bfd8444f7e84b88c$require$_Callback = $47Hd6.Callback;
// Function used to report errors to the current process event loop,
// When user callback function gets gced.
function $bfd8444f7e84b88c$var$errorReportCallback(err) {
    if (err) $chspj$process.nextTick(function() {
        if (typeof err === "string") throw new Error(err);
        else throw err;
    });
}
/**
 * Turns a JavaScript function into a C function pointer.
 * The function pointer may be used in other C functions that
 * accept C callback functions.
 */ function $bfd8444f7e84b88c$var$Callback(retType, argTypes, abi, func) {
    $bfd8444f7e84b88c$var$debug("creating new Callback");
    if (typeof abi === "function") {
        func = abi;
        abi = undefined;
    }
    // check args
    $chspj$assert(!!retType, 'expected a return "type" object as the first argument');
    $chspj$assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the second argument');
    $chspj$assert.equal(typeof func, "function", "expected a function as the third argument");
    // normalize the "types" (they could be strings, so turn into real type
    // instances)
    retType = $gxkm2.coerceType(retType);
    argTypes = argTypes.map($gxkm2.coerceType);
    // create the `ffi_cif *` instance
    const cif = $7riHf(retType, argTypes, abi);
    const argc = argTypes.length;
    const callback = $bfd8444f7e84b88c$require$_Callback(cif, retType.size, argc, $bfd8444f7e84b88c$var$errorReportCallback, (retval, params)=>{
        $bfd8444f7e84b88c$var$debug("Callback function being invoked");
        try {
            const args = [];
            for(var i = 0; i < argc; i++){
                const type = argTypes[i];
                const argPtr = params.readPointer(i * $gxkm2.sizeof.pointer, type.size);
                argPtr.type = type;
                args.push(argPtr.deref());
            }
            // Invoke the user-given function
            const result = func.apply(null, args);
            try {
                $gxkm2.set(retval, 0, result, retType);
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
module.exports = $bfd8444f7e84b88c$var$Callback;

});

parcelRequire.register("kva1c", function(module, exports) {

var $eece79553358d615$require$Buffer = $chspj$buffer.Buffer;
"use strict";

var $7riHf = parcelRequire("7riHf");

var $gFI9g = parcelRequire("gFI9g");

const $eece79553358d615$var$debug = (parcelRequire("3Mi5p"))("ffi:ForeignFunction");


var $gxkm2 = parcelRequire("gxkm2");
/**
 * Represents a foreign function in another library. Manages all of the aspects
 * of function execution, including marshalling the data parameters for the
 * function into native types and also unmarshalling the return from function
 * execution.
 */ function $eece79553358d615$var$ForeignFunction(funcPtr, returnType, argTypes, abi) {
    $eece79553358d615$var$debug("creating new ForeignFunction", funcPtr);
    // check args
    $chspj$assert($eece79553358d615$require$Buffer.isBuffer(funcPtr), "expected Buffer as first argument");
    $chspj$assert(!!returnType, 'expected a return "type" object as the second argument');
    $chspj$assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the third argument');
    // normalize the "types" (they could be strings,
    // so turn into real type instances)
    returnType = $gxkm2.coerceType(returnType);
    argTypes = argTypes.map($gxkm2.coerceType);
    // create the `ffi_cif *` instance
    const cif = $7riHf(returnType, argTypes, abi);
    // create and return the JS proxy function
    return $gFI9g(cif, funcPtr, returnType, argTypes);
}
module.exports = $eece79553358d615$var$ForeignFunction;

});
parcelRequire.register("gFI9g", function(module, exports) {

var $c232b8a85706574c$require$Buffer = $chspj$buffer.Buffer;

"use strict";


const $c232b8a85706574c$var$debug = (parcelRequire("3Mi5p"))("ffi:_ForeignFunction");

var $gxkm2 = parcelRequire("gxkm2");

var $47Hd6 = parcelRequire("47Hd6");
const $c232b8a85706574c$var$POINTER_SIZE = $gxkm2.sizeof.pointer;
const $c232b8a85706574c$var$FFI_ARG_SIZE = $47Hd6.FFI_ARG_SIZE;
function $c232b8a85706574c$var$ForeignFunction(cif, funcPtr, returnType, argTypes) {
    $c232b8a85706574c$var$debug("creating new ForeignFunction", funcPtr);
    const numArgs = argTypes.length;
    const argsArraySize = numArgs * $c232b8a85706574c$var$POINTER_SIZE;
    // "result" must point to storage that is sizeof(long) or larger. For smaller
    // return value sizes, the ffi_arg or ffi_sarg integral type must be used to
    // hold the return value
    const resultSize = returnType.size >= $gxkm2.sizeof.long ? returnType.size : $c232b8a85706574c$var$FFI_ARG_SIZE;
    $chspj$assert(resultSize > 0);
    /**
   * This is the actual JS function that gets returned.
   * It handles marshalling input arguments into C values,
   * and unmarshalling the return value back into a JS value
   */ const proxy = function() {
        $c232b8a85706574c$var$debug("invoking proxy function");
        if (arguments.length !== numArgs) throw new TypeError("Expected " + numArgs + " arguments, got " + arguments.length);
        // storage buffers for input arguments and the return value
        const result = $c232b8a85706574c$require$Buffer.alloc(resultSize);
        const argsList = $c232b8a85706574c$require$Buffer.alloc(argsArraySize);
        // write arguments to storage areas
        let i;
        try {
            for(i = 0; i < numArgs; i++){
                const argType = argTypes[i];
                const val = arguments[i];
                const valPtr = $gxkm2.alloc(argType, val);
                argsList.writePointer(valPtr, i * $c232b8a85706574c$var$POINTER_SIZE);
            }
        } catch (e) {
            // counting arguments from 1 is more human readable
            i++;
            e.message = "error setting argument " + i + " - " + e.message;
            throw e;
        }
        // invoke the `ffi_call()` function
        $47Hd6.ffi_call(cif, funcPtr, result, argsList);
        result.type = returnType;
        return result.deref();
    };
    /**
   * The asynchronous version of the proxy function.
   */ proxy.async = function() {
        $c232b8a85706574c$var$debug("invoking async proxy function");
        const argc = arguments.length;
        if (argc !== numArgs + 1) throw new TypeError("Expected " + (numArgs + 1) + " arguments, got " + argc);
        const callback = arguments[argc - 1];
        if (typeof callback !== "function") throw new TypeError("Expected a callback function as argument number: " + (argc - 1));
        // storage buffers for input arguments and the return value
        const result = $c232b8a85706574c$require$Buffer.alloc(resultSize);
        const argsList = $c232b8a85706574c$require$Buffer.alloc(argsArraySize);
        // write arguments to storage areas
        let i;
        try {
            for(i = 0; i < numArgs; i++){
                const argType = argTypes[i];
                const val = arguments[i];
                const valPtr = $gxkm2.alloc(argType, val);
                argsList.writePointer(valPtr, i * $c232b8a85706574c$var$POINTER_SIZE);
            }
        } catch (e) {
            e.message = "error setting argument " + i + " - " + e.message;
            return $chspj$process.nextTick(callback.bind(null, e));
        }
        // invoke the `ffi_call()` function asynchronously
        $47Hd6.ffi_call_async(cif, funcPtr, result, argsList, function(err) {
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
module.exports = $c232b8a85706574c$var$ForeignFunction;

});



parcelRequire.register("gYqA3", function(module, exports) {

var $c5b6de4980af6ae9$require$Buffer = $chspj$buffer.Buffer;
"use strict";

var $fppnV = parcelRequire("fppnV");

var $inr9a = parcelRequire("inr9a");

var $gFI9g = parcelRequire("gFI9g");


const $c5b6de4980af6ae9$var$debug = (parcelRequire("3Mi5p"))("ffi:VariadicForeignFunction");

var $gxkm2 = parcelRequire("gxkm2");

var $47Hd6 = parcelRequire("47Hd6");
const $c5b6de4980af6ae9$var$POINTER_SIZE = $gxkm2.sizeof.pointer;
const $c5b6de4980af6ae9$var$FFI_ARG_SIZE = $47Hd6.FFI_ARG_SIZE;
/**
 * For when you want to call to a C function with variable amount of arguments.
 * i.e. `printf()`.
 *
 * This function takes care of caching and reusing ForeignFunction instances that
 * contain the same ffi_type argument signature.
 */ function $c5b6de4980af6ae9$var$VariadicForeignFunction(funcPtr, returnType, fixedArgTypes, abi) {
    $c5b6de4980af6ae9$var$debug("creating new VariadicForeignFunction", funcPtr);
    // the cache of ForeignFunction instances that this
    // VariadicForeignFunction has created so far
    const cache = {};
    // check args
    $chspj$assert($c5b6de4980af6ae9$require$Buffer.isBuffer(funcPtr), "expected Buffer as first argument");
    $chspj$assert(!!returnType, 'expected a return "type" object as the second argument');
    $chspj$assert(Array.isArray(fixedArgTypes), 'expected Array of arg "type" objects as the third argument');
    const numFixedArgs = fixedArgTypes.length;
    // normalize the "types" (they could be strings,
    // so turn into real type instances)
    fixedArgTypes = fixedArgTypes.map($gxkm2.coerceType);
    // get the names of the fixed arg types
    const fixedKey = fixedArgTypes.map(function(type) {
        return $c5b6de4980af6ae9$var$getId(type);
    });
    // what gets returned is another function that needs to be invoked with the rest
    // of the variadic types that are being invoked from the function.
    function variadic_function_generator() {
        $c5b6de4980af6ae9$var$debug("variadic_function_generator invoked");
        // first get the types of variadic args we are working with
        const argTypes = fixedArgTypes.slice();
        let key = fixedKey.slice();
        for(let i = 0; i < arguments.length; i++){
            const type = $gxkm2.coerceType(arguments[i]);
            argTypes.push(type);
            const ffi_type = $inr9a(type);
            $chspj$assert(ffi_type.name);
            key.push($c5b6de4980af6ae9$var$getId(type));
        }
        // now figure out the return type
        const rtnType = $gxkm2.coerceType(variadic_function_generator.returnType);
        const rtnName = $c5b6de4980af6ae9$var$getId(rtnType);
        $chspj$assert(rtnName);
        // first let's generate the key and see if we got a cache-hit
        key = rtnName + key.join("");
        let func = cache[key];
        if (func) $c5b6de4980af6ae9$var$debug("cache hit for key:", key);
        else {
            // create the `ffi_cif *` instance
            $c5b6de4980af6ae9$var$debug("creating the variadic ffi_cif instance for key:", key);
            const cif = $fppnV(returnType, argTypes, numFixedArgs, abi);
            func = cache[key] = $gFI9g(cif, funcPtr, rtnType, argTypes);
        }
        return func;
    }
    // set the return type. we set it as a property of the function generator to
    // allow for monkey patching the return value in the very rare case where the
    // return type is variadic as well
    variadic_function_generator.returnType = returnType;
    return variadic_function_generator;
}
module.exports = $c5b6de4980af6ae9$var$VariadicForeignFunction;
const $c5b6de4980af6ae9$var$idKey = "_ffiId";
let $c5b6de4980af6ae9$var$counter = 0;
function $c5b6de4980af6ae9$var$getId(type) {
    if (!type.hasOwnProperty($c5b6de4980af6ae9$var$idKey)) type[$c5b6de4980af6ae9$var$idKey] = (($c5b6de4980af6ae9$var$counter++) * 0x10000 | 0).toString(16);
    return type[$c5b6de4980af6ae9$var$idKey];
}

});

parcelRequire.register("k2uiE", function(module, exports) {

var $e96b7f7a474b925c$require$Buffer = $chspj$buffer.Buffer;
"use strict";

var $kva1c = parcelRequire("kva1c");


const $e96b7f7a474b925c$var$debug = (parcelRequire("3Mi5p"))("ffi:DynamicLibrary");

var $47Hd6 = parcelRequire("47Hd6");
const $e96b7f7a474b925c$var$funcs = $47Hd6.StaticFunctions;

var $gxkm2 = parcelRequire("gxkm2");

var $e96b7f7a474b925c$require$read = $chspj$fs.readFileSync;
// typedefs
const $e96b7f7a474b925c$var$int = $gxkm2.types.int;
const $e96b7f7a474b925c$var$voidPtr = $gxkm2.refType($gxkm2.types.void);
const $e96b7f7a474b925c$var$dlopen = $kva1c($e96b7f7a474b925c$var$funcs.dlopen, $e96b7f7a474b925c$var$voidPtr, [
    "string",
    $e96b7f7a474b925c$var$int
]);
const $e96b7f7a474b925c$var$dlclose = $kva1c($e96b7f7a474b925c$var$funcs.dlclose, $e96b7f7a474b925c$var$int, [
    $e96b7f7a474b925c$var$voidPtr
]);
const $e96b7f7a474b925c$var$dlsym = $kva1c($e96b7f7a474b925c$var$funcs.dlsym, $e96b7f7a474b925c$var$voidPtr, [
    $e96b7f7a474b925c$var$voidPtr,
    "string"
]);
const $e96b7f7a474b925c$var$dlerror = $kva1c($e96b7f7a474b925c$var$funcs.dlerror, "string", []);
/**
 * `DynamicLibrary` loads and fetches function pointers for dynamic libraries
 * (.so, .dylib, etc). After the libray's function pointer is acquired, then you
 * call `get(symbol)` to retreive a pointer to an exported symbol. You need to
 * call `get___()` on the pointer to dereference it into its actual value, or
 * turn the pointer into a callable function with `ForeignFunction`.
 */ function $e96b7f7a474b925c$var$DynamicLibrary(path, mode) {
    if (!(this instanceof $e96b7f7a474b925c$var$DynamicLibrary)) return new $e96b7f7a474b925c$var$DynamicLibrary(path, mode);
    $e96b7f7a474b925c$var$debug("new DynamicLibrary()", path, mode);
    if (null == mode) mode = $e96b7f7a474b925c$var$DynamicLibrary.FLAGS.RTLD_LAZY;
    this._path = path;
    this._handle = $e96b7f7a474b925c$var$dlopen(path, mode);
    $chspj$assert($e96b7f7a474b925c$require$Buffer.isBuffer(this._handle), "expected a Buffer instance to be returned from `dlopen()`");
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
            const content = $e96b7f7a474b925c$require$read(match[1], "ascii");
            // try to find a GROUP ( ... ) command
            if (match = content.match(/GROUP *\( *(([^ )])+)/)) return $e96b7f7a474b925c$var$DynamicLibrary.call(this, match[1], mode);
        }
        throw new Error("Dynamic Linking Error: " + err);
    }
}
module.exports = $e96b7f7a474b925c$var$DynamicLibrary;
/**
 * Set the exported flags from "dlfcn.h"
 */ $e96b7f7a474b925c$var$DynamicLibrary.FLAGS = {};
Object.keys($47Hd6).forEach(function(k) {
    if (!/^RTLD_/.test(k)) return;
    const desc = Object.getOwnPropertyDescriptor($47Hd6, k);
    Object.defineProperty($e96b7f7a474b925c$var$DynamicLibrary.FLAGS, k, desc);
});
/**
 * Close this library, returns the result of the dlclose() system function.
 */ $e96b7f7a474b925c$var$DynamicLibrary.prototype.close = function() {
    $e96b7f7a474b925c$var$debug("dlclose()");
    return $e96b7f7a474b925c$var$dlclose(this._handle);
};
/**
 * Get a symbol from this library, returns a Pointer for (memory address of) the symbol
 */ $e96b7f7a474b925c$var$DynamicLibrary.prototype.get = function(symbol) {
    $e96b7f7a474b925c$var$debug("dlsym()", symbol);
    $chspj$assert.strictEqual("string", typeof symbol);
    const ptr = $e96b7f7a474b925c$var$dlsym(this._handle, symbol);
    $chspj$assert($e96b7f7a474b925c$require$Buffer.isBuffer(ptr));
    if (ptr.isNull()) throw new Error("Dynamic Symbol Retrieval Error: " + this.error());
    ptr.name = symbol;
    return ptr;
};
/**
 * Returns the result of the dlerror() system function
 */ $e96b7f7a474b925c$var$DynamicLibrary.prototype.error = function error() {
    $e96b7f7a474b925c$var$debug("dlerror()");
    return $e96b7f7a474b925c$var$dlerror();
};
/**
 * Returns the path originally passed to the constructor
 */ $e96b7f7a474b925c$var$DynamicLibrary.prototype.path = function error() {
    return this._path;
};

});

parcelRequire.register("hEpy3", function(module, exports) {

"use strict";

var $k2uiE = parcelRequire("k2uiE");

var $kva1c = parcelRequire("kva1c");

var $gYqA3 = parcelRequire("gYqA3");

const $cd99fd6cab87b701$var$debug = (parcelRequire("3Mi5p"))("ffi:Library");
const $cd99fd6cab87b701$var$RTLD_NOW = $k2uiE.FLAGS.RTLD_NOW;
/**
 * The extension to use on libraries.
 * i.e.  libm  ->  libm.so   on linux
 */ const $cd99fd6cab87b701$var$EXT = $cd99fd6cab87b701$var$Library.EXT = ({
    "linux": ".so",
    "linux2": ".so",
    "sunos": ".so",
    "solaris": ".so",
    "freebsd": ".so",
    "openbsd": ".so",
    "darwin": ".dylib",
    "mac": ".dylib",
    "win32": ".dll"
})[$chspj$process.platform];
/**
 * Provides a friendly abstraction/API on-top of DynamicLibrary and
 * ForeignFunction.
 */ function $cd99fd6cab87b701$var$Library(libfile, funcs, lib) {
    $cd99fd6cab87b701$var$debug("creating Library object for", libfile);
    if (libfile && typeof libfile === "string" && libfile.indexOf($cd99fd6cab87b701$var$EXT) === -1) {
        $cd99fd6cab87b701$var$debug("appending library extension to library name", $cd99fd6cab87b701$var$EXT);
        libfile += $cd99fd6cab87b701$var$EXT;
    }
    if (!lib) lib = {};
    let dl;
    if (typeof libfile === "string" || !libfile) dl = new $k2uiE(libfile || null, $cd99fd6cab87b701$var$RTLD_NOW);
    else dl = libfile;
    Object.keys(funcs || {}).forEach(function(func) {
        $cd99fd6cab87b701$var$debug("defining function", func);
        const fptr = dl.get(func);
        const info = funcs[func];
        if (fptr.isNull()) throw new Error('Library: "' + dl.path() + '" returned NULL function pointer for "' + func + '"');
        const resultType = info[0];
        const paramTypes = info[1];
        const fopts = info[2];
        const abi = fopts && fopts.abi;
        const async = fopts && fopts.async;
        const varargs = fopts && fopts.varargs;
        if (varargs) lib[func] = $gYqA3(fptr, resultType, paramTypes, abi);
        else {
            const ff = $kva1c(fptr, resultType, paramTypes, abi);
            lib[func] = async ? ff.async : ff;
        }
    });
    return lib;
}
module.exports = $cd99fd6cab87b701$var$Library;

});

parcelRequire.register("5Lj3H", function(module, exports) {

"use strict";

var $k2uiE = parcelRequire("k2uiE");

var $kva1c = parcelRequire("kva1c");

var $47Hd6 = parcelRequire("47Hd6");
const $4320202ed320f141$var$funcs = $47Hd6.StaticFunctions;

var $gxkm2 = parcelRequire("gxkm2");
const $4320202ed320f141$var$int = $gxkm2.types.int;
const $4320202ed320f141$var$intPtr = $gxkm2.refType($4320202ed320f141$var$int);
let $4320202ed320f141$var$errno = null;
if ($chspj$process.platform == "win32") {
    const _errno = $k2uiE("msvcrt.dll").get("_errno");
    const errnoPtr = $kva1c(_errno, $4320202ed320f141$var$intPtr, []);
    $4320202ed320f141$var$errno = function() {
        return errnoPtr().deref();
    };
} else $4320202ed320f141$var$errno = $kva1c($4320202ed320f141$var$funcs._errno, "int", []);
module.exports = $4320202ed320f141$var$errno;

});


$parcel$export(module.exports, "BitmapInfoHeaderStruct", () => $33b0c58e3ab924e9$export$462becd5fad16474);
$parcel$export(module.exports, "ColorRefStruct", () => $33b0c58e3ab924e9$export$cd15b4e17d65648c);
$parcel$export(module.exports, "setIgtCallback", () => $33b0c58e3ab924e9$export$5801d716674e6bb6);
$parcel$export(module.exports, "setTickTime", () => $33b0c58e3ab924e9$export$11819f9fff450d9b);
$parcel$export(module.exports, "startIgt", () => $33b0c58e3ab924e9$export$a679630bf91eb455);
$parcel$export(module.exports, "stopIgt", () => $33b0c58e3ab924e9$export$cb0b9fb431e2932b);
$parcel$export(module.exports, "CaptureScreenshot", () => $33b0c58e3ab924e9$export$cdfb9a6a4ec4454d);

var $5IhKb = parcelRequire("5IhKb");
var $4555387f06897097$exports = {};
"use strict";

var $gxkm2 = parcelRequire("gxkm2");


const $4555387f06897097$var$debug = (parcelRequire("3Mi5p"))("ffi:ffi");

const $4555387f06897097$var$Struct = (parcelRequire("5IhKb"))($gxkm2);

var $47Hd6 = parcelRequire("47Hd6");
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
    if (!$47Hd6.hasOwnProperty(prop)) return $4555387f06897097$var$debug("skipping exporting of non-existant property", prop);
    const desc = Object.getOwnPropertyDescriptor($47Hd6, prop);
    Object.defineProperty($4555387f06897097$exports, prop, desc);
});
/**
 * Set the `ffi_type` property on the built-in types.
 */ Object.keys($47Hd6.FFI_TYPES).forEach((name)=>{
    const type = $47Hd6.FFI_TYPES[name];
    type.name = name;
    if (name === "pointer") return; // there is no "pointer" type...
    $gxkm2.types[name].ffi_type = type;
});
// make `size_t` use the "ffi_type_pointer"
$gxkm2.types.size_t.ffi_type = $47Hd6.FFI_TYPES.pointer;
// make `Utf8String` use "ffi_type_pointer"
const $4555387f06897097$var$CString = $gxkm2.types.CString || $gxkm2.types.Utf8String;
$4555387f06897097$var$CString.ffi_type = $47Hd6.FFI_TYPES.pointer;
// make `Object` use the "ffi_type_pointer"
$gxkm2.types.Object.ffi_type = $47Hd6.FFI_TYPES.pointer;
// libffi is weird when it comes to long data types (defaults to 64-bit),
// so we emulate here, since some platforms have 32-bit longs and some
// platforms have 64-bit longs.
switch($gxkm2.sizeof.long){
    case 4:
        $gxkm2.types.ulong.ffi_type = $47Hd6.FFI_TYPES.uint32;
        $gxkm2.types.long.ffi_type = $47Hd6.FFI_TYPES.int32;
        break;
    case 8:
        $gxkm2.types.ulong.ffi_type = $47Hd6.FFI_TYPES.uint64;
        $gxkm2.types.long.ffi_type = $47Hd6.FFI_TYPES.int64;
        break;
    default:
        throw new Error('unsupported "long" size: ' + $gxkm2.sizeof.long);
}
/**
 * Alias the "ref" types onto ffi's exports, for convenience...
 */ $4555387f06897097$exports.types = $gxkm2.types;
// Include our other modules
$4555387f06897097$exports.version = $47Hd6.version;

$4555387f06897097$exports.CIF = (parcelRequire("7riHf"));

$4555387f06897097$exports.CIF_var = (parcelRequire("fppnV"));

$4555387f06897097$exports.Function = (parcelRequire("lF8rf"));

$4555387f06897097$exports.ForeignFunction = (parcelRequire("kva1c"));

$4555387f06897097$exports.VariadicForeignFunction = (parcelRequire("gYqA3"));

$4555387f06897097$exports.DynamicLibrary = (parcelRequire("k2uiE"));

$4555387f06897097$exports.Library = (parcelRequire("hEpy3"));

$4555387f06897097$exports.Callback = (parcelRequire("gtbuo"));

$4555387f06897097$exports.errno = (parcelRequire("5Lj3H"));

$4555387f06897097$exports.ffiType = (parcelRequire("inr9a"));
// the shared library extension for this platform
$4555387f06897097$exports.LIB_EXT = $4555387f06897097$exports.Library.EXT;
// the FFI_TYPE struct definition
$4555387f06897097$exports.FFI_TYPE = $4555387f06897097$exports.ffiType.FFI_TYPE;



var $gxkm2 = parcelRequire("gxkm2");

const $a300da9755ff1bc0$export$4bbcbb9e6d314d55 = "_WIN64_HOLDER_";
const $a300da9755ff1bc0$export$609085a058d4a4d0 = "_UNICODE_HOLDER_";
const $a300da9755ff1bc0$export$527cfc1519820a40 = new Set([
    "macroMap"
]);
const $a300da9755ff1bc0$export$def1b823ebd5706b = $chspj$process.arch === "x64";
const $a300da9755ff1bc0$export$cba91b4ce33b8ea = true;
const $a300da9755ff1bc0$export$f6b5b44fcd8003ee = {
    singleton: true,
    _UNICODE: $a300da9755ff1bc0$export$cba91b4ce33b8ea,
    _WIN64: $a300da9755ff1bc0$export$def1b823ebd5706b
};
const $a300da9755ff1bc0$export$65a4230322ab1784 = new Set([
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


var $26c46ba6c5cd7f5b$exports = {};

$parcel$export($26c46ba6c5cd7f5b$exports, "ALTTABINFO", () => $26c46ba6c5cd7f5b$export$ad48b1b2cfc75809);
$parcel$export($26c46ba6c5cd7f5b$exports, "COPYDATASTRUCT", () => $26c46ba6c5cd7f5b$export$235a24185e6c03f3);
$parcel$export($26c46ba6c5cd7f5b$exports, "HARDWAREINPUT", () => $26c46ba6c5cd7f5b$export$c747a8b76ce2fc55);
$parcel$export($26c46ba6c5cd7f5b$exports, "INITCOMMONCONTROLSEX", () => $26c46ba6c5cd7f5b$export$6eb78d635a3ee587);
$parcel$export($26c46ba6c5cd7f5b$exports, "KEYBDINPUT", () => $26c46ba6c5cd7f5b$export$9d77698e6144d105);
$parcel$export($26c46ba6c5cd7f5b$exports, "MOUSEINPUT", () => $26c46ba6c5cd7f5b$export$b25d5f19497424fa);
$parcel$export($26c46ba6c5cd7f5b$exports, "MSG", () => $26c46ba6c5cd7f5b$export$f99154f7a7b0135d);
$parcel$export($26c46ba6c5cd7f5b$exports, "POINT", () => $26c46ba6c5cd7f5b$export$a80a24d37f0f1279);
$parcel$export($26c46ba6c5cd7f5b$exports, "PROCESS_BASIC_INFORMATION", () => $26c46ba6c5cd7f5b$export$ca65a5b05e68b7ff);
$parcel$export($26c46ba6c5cd7f5b$exports, "UNICODE_STRING", () => $26c46ba6c5cd7f5b$export$5dcce0e722389cdb);
$parcel$export($26c46ba6c5cd7f5b$exports, "RAWHID", () => $26c46ba6c5cd7f5b$export$109b0986e0806ee);
$parcel$export($26c46ba6c5cd7f5b$exports, "RAWINPUTDEVICELIST", () => $26c46ba6c5cd7f5b$export$cf7f2abb0ac9e892);
$parcel$export($26c46ba6c5cd7f5b$exports, "RAWINPUTHEADER", () => $26c46ba6c5cd7f5b$export$614c933f340ce1c1);
$parcel$export($26c46ba6c5cd7f5b$exports, "RAWKEYBOARD", () => $26c46ba6c5cd7f5b$export$7f9753d8aef93f40);
$parcel$export($26c46ba6c5cd7f5b$exports, "WINDOWINFO", () => $26c46ba6c5cd7f5b$export$5119761222d7d0f6);
$parcel$export($26c46ba6c5cd7f5b$exports, "WNDCLASSEX", () => $26c46ba6c5cd7f5b$export$81ef613fbd3a628d);
$parcel$export($26c46ba6c5cd7f5b$exports, "RECT", () => $26c46ba6c5cd7f5b$export$1e530543ba1d4b12);
$parcel$export($26c46ba6c5cd7f5b$exports, "_RECT", () => $26c46ba6c5cd7f5b$export$1e530543ba1d4b12);
$parcel$export($26c46ba6c5cd7f5b$exports, "FILETIME", () => $26c46ba6c5cd7f5b$export$258339e884eb70b7);

function $c3321bfd9f7edb7e$export$828a2cfb74eb348c(windefObj, macroMap, settings) {
    const ww = $c3321bfd9f7edb7e$var$clone_filter_windef(windefObj); // output without macroMap
    const macroSrc = $c3321bfd9f7edb7e$var$prepare_macro(macroMap, settings);
    const ret = $c3321bfd9f7edb7e$var$prepare_windef_ref(ww, macroSrc);
    $c3321bfd9f7edb7e$export$6b50c41cc4aa2277(ret, (0, $a300da9755ff1bc0$export$65a4230322ab1784));
    return ret;
}
/**
 * convert typeof array of param to string
 * such like ['_WIN64_HOLDER_', 'int64', 'int32'], no changed returning when string
 */ function $c3321bfd9f7edb7e$var$parse_param_placeholder(param, settings) {
    if (typeof param === "string") return param;
    else if (!param) throw new Error("parse_param_placeholder(ps, settings) value of ps invalid");
    else if (!Array.isArray(param) || param.length !== 3) throw new Error("parse_param_placeholder(ps, settings) value of ps must Array and has THREE elements");
    const st = $c3321bfd9f7edb7e$var$parse_settings(settings);
    let ps = "";
    switch(param[0]){
        case 0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55:
            ps = $c3321bfd9f7edb7e$var$parse_placeholder_arch(param, st._WIN64);
            break;
        case 0, $a300da9755ff1bc0$export$609085a058d4a4d0:
            ps = $c3321bfd9f7edb7e$var$parse_placeholder_unicode(param, st._UNICODE);
            break;
        default:
            throw new Error("the value of param placeholder invlaid:" + param[0]);
    }
    return ps;
}
// convert param like ['_WIN64_HOLDER_', 'int64', 'int32] to 'int64' or 'int32'
function $c3321bfd9f7edb7e$var$parse_placeholder_arch(param, _WIN64) {
    if (typeof param === "string") return param;
    else if (!param || param.length !== 3) throw new Error("_WIN64 macro should be Array and has 3 items");
    return _WIN64 ? param[1] : param[2];
}
// convert param like ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
function $c3321bfd9f7edb7e$var$parse_placeholder_unicode(param, _UNICODE) {
    if (typeof param === "string") return param;
    else if (!param || param.length !== 3) throw new Error("_UNICODE macro should be Array and has 3 items");
    return _UNICODE ? param[1] : param[2];
}
/**
 * parse ['_WIN64_HOLDER', 'int64*', 'int32*'] to 'int64*' or 'int32'
 * or ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
 */ function $c3321bfd9f7edb7e$var$prepare_macro(macroMap, settings) {
    const ret = new Map();
    // v string|array
    for (const [k, v] of macroMap.entries())ret.set(k, $c3321bfd9f7edb7e$var$parse_param_placeholder(v, settings));
    return ret;
}
/**
 * parse const HANDLE = 'PVOID' to the realy FFIParam (like 'uint32*')
 * macroMap <['PVOID', 'uint32*'], ...>
 */ function $c3321bfd9f7edb7e$var$prepare_windef_ref(ww, macroSrc) {
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
            if ((0, $a300da9755ff1bc0$export$65a4230322ab1784).has(v1)) map.set(k1, v1);
            else {
                const value = $c3321bfd9f7edb7e$export$653d6aa060f2e229(v1, ww, macroSrc);
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
function $c3321bfd9f7edb7e$var$clone_filter_windef(windef) {
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
function $c3321bfd9f7edb7e$var$parse_settings(settings) {
    const st = {
        ...(0, $a300da9755ff1bc0$export$f6b5b44fcd8003ee)
    };
    if (typeof settings !== "undefined" && Object.keys(settings).length) Object.assign(st, settings);
    return st;
}
function $c3321bfd9f7edb7e$export$653d6aa060f2e229(key, ww, macroSrc) {
    let ret = $c3321bfd9f7edb7e$var$_lookupRef(key, ww, macroSrc);
    if (!ret) return "";
    for(let i = 0, len = 3; i < len; i += 1){
        const tmp = $c3321bfd9f7edb7e$var$_lookupRef(ret, ww, macroSrc);
        if (tmp) ret = tmp;
        else break;
    }
    return ret;
}
function $c3321bfd9f7edb7e$var$_lookupRef(key, ww, macroSrc) {
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
function $c3321bfd9f7edb7e$export$f6e45c3615c9e25a(key, srcSet) {
    return !!srcSet.has(key);
}
function $c3321bfd9f7edb7e$export$6b50c41cc4aa2277(windef, srcSet) {
    for (const [k, v] of Object.entries(windef)){
        if (!k || !v) throw new Error(`validateWinData() k or v empty: "${k}"/"${v}"`);
        if (typeof v !== "string") throw new Error(`validateWinData() v not typeof string: "${k}"/"N/A"`);
        if (!$c3321bfd9f7edb7e$export$f6e45c3615c9e25a(v, srcSet)) throw new Error(`validateWinData() value is invalid ffi param value: "${k}"/"${v}", may extra space`);
    }
}



var $8b4b58e694c3b67b$exports = {};

$parcel$export($8b4b58e694c3b67b$exports, "ATOM", () => $8b4b58e694c3b67b$export$a78dc2c4cbd70341);
$parcel$export($8b4b58e694c3b67b$exports, "DWORD", () => $8b4b58e694c3b67b$export$181c9ad1752440f7);
$parcel$export($8b4b58e694c3b67b$exports, "PVOID", () => $8b4b58e694c3b67b$export$9cb553b951e1e0d8);
$parcel$export($8b4b58e694c3b67b$exports, "HANDLE", () => $8b4b58e694c3b67b$export$1f4a129e1195d18a);
$parcel$export($8b4b58e694c3b67b$exports, "HANDLE_PVOID", () => $8b4b58e694c3b67b$export$bd8b6af04676495);
$parcel$export($8b4b58e694c3b67b$exports, "LONG_PTR", () => $8b4b58e694c3b67b$export$f60fc96aa99c605e);
$parcel$export($8b4b58e694c3b67b$exports, "ULONG_PTR", () => $8b4b58e694c3b67b$export$2e482cd8c991e558);
$parcel$export($8b4b58e694c3b67b$exports, "VOID", () => $8b4b58e694c3b67b$export$1cd1943b3a73bbe8);
$parcel$export($8b4b58e694c3b67b$exports, "WCHAR", () => $8b4b58e694c3b67b$export$d71e2b267f5b711b);
$parcel$export($8b4b58e694c3b67b$exports, "WORD", () => $8b4b58e694c3b67b$export$f3a79cf462faa1e3);
$parcel$export($8b4b58e694c3b67b$exports, "BOOL", () => $8b4b58e694c3b67b$export$c35dd5647862f990);
$parcel$export($8b4b58e694c3b67b$exports, "BOOLEAN", () => $8b4b58e694c3b67b$export$428cfe48a69a3b4f);
$parcel$export($8b4b58e694c3b67b$exports, "BYTE", () => $8b4b58e694c3b67b$export$8f4bf8f7eb581284);
$parcel$export($8b4b58e694c3b67b$exports, "CALLBACK", () => $8b4b58e694c3b67b$export$578a4c3d73a6d794);
$parcel$export($8b4b58e694c3b67b$exports, "CCHAR", () => $8b4b58e694c3b67b$export$934996f637259e88);
$parcel$export($8b4b58e694c3b67b$exports, "CHAR", () => $8b4b58e694c3b67b$export$9e88d7b6f62f62d8);
$parcel$export($8b4b58e694c3b67b$exports, "COLORREF", () => $8b4b58e694c3b67b$export$52da70d84f582c04);
$parcel$export($8b4b58e694c3b67b$exports, "DWORDLONG", () => $8b4b58e694c3b67b$export$6b766bfdcf67e2ec);
$parcel$export($8b4b58e694c3b67b$exports, "DWORD_PTR", () => $8b4b58e694c3b67b$export$8f7b8c11edcb3e34);
$parcel$export($8b4b58e694c3b67b$exports, "DWORD32", () => $8b4b58e694c3b67b$export$a8ea5b58ae88fc11);
$parcel$export($8b4b58e694c3b67b$exports, "DWORD64", () => $8b4b58e694c3b67b$export$8db31e1b1c7e0db0);
$parcel$export($8b4b58e694c3b67b$exports, "FLOAT", () => $8b4b58e694c3b67b$export$d2b086fd1e01e03a);
$parcel$export($8b4b58e694c3b67b$exports, "HACCEL", () => $8b4b58e694c3b67b$export$1505c2c04cc3bbef);
$parcel$export($8b4b58e694c3b67b$exports, "HALF_PTR", () => $8b4b58e694c3b67b$export$2d081f52dd94061a);
$parcel$export($8b4b58e694c3b67b$exports, "HBITMAP", () => $8b4b58e694c3b67b$export$49cd303f01f67350);
$parcel$export($8b4b58e694c3b67b$exports, "HBRUSH", () => $8b4b58e694c3b67b$export$d17b38c787d37ab8);
$parcel$export($8b4b58e694c3b67b$exports, "HCOLORSPACE", () => $8b4b58e694c3b67b$export$56c7641f121a2c5c);
$parcel$export($8b4b58e694c3b67b$exports, "HCONV", () => $8b4b58e694c3b67b$export$762b8b6ee0ff4c44);
$parcel$export($8b4b58e694c3b67b$exports, "HCONVLIST", () => $8b4b58e694c3b67b$export$750eee7b2f0ee030);
$parcel$export($8b4b58e694c3b67b$exports, "HCURSOR", () => $8b4b58e694c3b67b$export$a02796fdca6d354a);
$parcel$export($8b4b58e694c3b67b$exports, "HDC", () => $8b4b58e694c3b67b$export$1a62f6d54b236e36);
$parcel$export($8b4b58e694c3b67b$exports, "HDDEDATA", () => $8b4b58e694c3b67b$export$4ddde23cd7155d44);
$parcel$export($8b4b58e694c3b67b$exports, "HDESK", () => $8b4b58e694c3b67b$export$1d0ad5eb60ffc518);
$parcel$export($8b4b58e694c3b67b$exports, "HDROP", () => $8b4b58e694c3b67b$export$726c5c347609dae3);
$parcel$export($8b4b58e694c3b67b$exports, "HDWP", () => $8b4b58e694c3b67b$export$323f06abdd2a59da);
$parcel$export($8b4b58e694c3b67b$exports, "HENHMETAFILE", () => $8b4b58e694c3b67b$export$a43730eb8bf8b76e);
$parcel$export($8b4b58e694c3b67b$exports, "HFILE", () => $8b4b58e694c3b67b$export$91f6f659ef3d1edd);
$parcel$export($8b4b58e694c3b67b$exports, "HFONT", () => $8b4b58e694c3b67b$export$229672d8f6dd9e1a);
$parcel$export($8b4b58e694c3b67b$exports, "HGDIOBJ", () => $8b4b58e694c3b67b$export$ef0ae13fba225584);
$parcel$export($8b4b58e694c3b67b$exports, "HGLOBAL", () => $8b4b58e694c3b67b$export$6b52c27577dfb85e);
$parcel$export($8b4b58e694c3b67b$exports, "HHOOK", () => $8b4b58e694c3b67b$export$a681c4a7983815bf);
$parcel$export($8b4b58e694c3b67b$exports, "HICON", () => $8b4b58e694c3b67b$export$105fd39584a4c170);
$parcel$export($8b4b58e694c3b67b$exports, "HINSTANCE", () => $8b4b58e694c3b67b$export$1a50b4f53ac33a);
$parcel$export($8b4b58e694c3b67b$exports, "HKEY", () => $8b4b58e694c3b67b$export$80d8783aa08e677d);
$parcel$export($8b4b58e694c3b67b$exports, "HKL", () => $8b4b58e694c3b67b$export$9252a4926414af53);
$parcel$export($8b4b58e694c3b67b$exports, "HLOCAL", () => $8b4b58e694c3b67b$export$941fbb37db50e0ee);
$parcel$export($8b4b58e694c3b67b$exports, "HMENU", () => $8b4b58e694c3b67b$export$5570ee796bf8668a);
$parcel$export($8b4b58e694c3b67b$exports, "HMETAFILE", () => $8b4b58e694c3b67b$export$32e1d6dd1d786a08);
$parcel$export($8b4b58e694c3b67b$exports, "HMODULE", () => $8b4b58e694c3b67b$export$82cb6941373786ac);
$parcel$export($8b4b58e694c3b67b$exports, "HMONITOR", () => $8b4b58e694c3b67b$export$d76bcd896c4c1f0b);
$parcel$export($8b4b58e694c3b67b$exports, "HPALETTE", () => $8b4b58e694c3b67b$export$c984542fbcd9e311);
$parcel$export($8b4b58e694c3b67b$exports, "HPEN", () => $8b4b58e694c3b67b$export$e8c398641ae921a0);
$parcel$export($8b4b58e694c3b67b$exports, "HRESULT", () => $8b4b58e694c3b67b$export$2109f3ca8e001dc3);
$parcel$export($8b4b58e694c3b67b$exports, "HRGN", () => $8b4b58e694c3b67b$export$64129906a6b15c89);
$parcel$export($8b4b58e694c3b67b$exports, "HRSRC", () => $8b4b58e694c3b67b$export$d0b96b23ab9f5338);
$parcel$export($8b4b58e694c3b67b$exports, "HSZ", () => $8b4b58e694c3b67b$export$c50eccdd15c9fd55);
$parcel$export($8b4b58e694c3b67b$exports, "HWINEVENTHOOK", () => $8b4b58e694c3b67b$export$60bcb2927641b3f4);
$parcel$export($8b4b58e694c3b67b$exports, "HWINSTA", () => $8b4b58e694c3b67b$export$893fa35bdef36b);
$parcel$export($8b4b58e694c3b67b$exports, "HWND", () => $8b4b58e694c3b67b$export$6525812590d9a476);
$parcel$export($8b4b58e694c3b67b$exports, "INT", () => $8b4b58e694c3b67b$export$160e8bdd97bfce3a);
$parcel$export($8b4b58e694c3b67b$exports, "INT_PTR", () => $8b4b58e694c3b67b$export$f051d14373139dee);
$parcel$export($8b4b58e694c3b67b$exports, "INT8", () => $8b4b58e694c3b67b$export$9922471c07c2891d);
$parcel$export($8b4b58e694c3b67b$exports, "INT16", () => $8b4b58e694c3b67b$export$bd9b91838fde002e);
$parcel$export($8b4b58e694c3b67b$exports, "INT32", () => $8b4b58e694c3b67b$export$34412edc7b36f85);
$parcel$export($8b4b58e694c3b67b$exports, "INT64", () => $8b4b58e694c3b67b$export$a2c63c68aeee9e2d);
$parcel$export($8b4b58e694c3b67b$exports, "LANGID", () => $8b4b58e694c3b67b$export$6190ebba87077b9d);
$parcel$export($8b4b58e694c3b67b$exports, "LCID", () => $8b4b58e694c3b67b$export$b36cf4a83245c2f9);
$parcel$export($8b4b58e694c3b67b$exports, "LCTYPE", () => $8b4b58e694c3b67b$export$244c0463aedba74c);
$parcel$export($8b4b58e694c3b67b$exports, "LGRPID", () => $8b4b58e694c3b67b$export$202821be4d3b65c7);
$parcel$export($8b4b58e694c3b67b$exports, "LONG", () => $8b4b58e694c3b67b$export$686cfa64f218be7a);
$parcel$export($8b4b58e694c3b67b$exports, "LONGLONG", () => $8b4b58e694c3b67b$export$2d2033f38dde21c);
$parcel$export($8b4b58e694c3b67b$exports, "LONG32", () => $8b4b58e694c3b67b$export$4c9cb8eafd43015e);
$parcel$export($8b4b58e694c3b67b$exports, "LONG64", () => $8b4b58e694c3b67b$export$552dea698acd6cd2);
$parcel$export($8b4b58e694c3b67b$exports, "LPARAM", () => $8b4b58e694c3b67b$export$13371aace3d44948);
$parcel$export($8b4b58e694c3b67b$exports, "LPBOOL", () => $8b4b58e694c3b67b$export$5df7e4acce683059);
$parcel$export($8b4b58e694c3b67b$exports, "LPBYTE", () => $8b4b58e694c3b67b$export$1061811df8b0c9be);
$parcel$export($8b4b58e694c3b67b$exports, "LPCOLORREF", () => $8b4b58e694c3b67b$export$f1d7ba3e4d51498c);
$parcel$export($8b4b58e694c3b67b$exports, "LPCSTR", () => $8b4b58e694c3b67b$export$18e7280707df82f3);
$parcel$export($8b4b58e694c3b67b$exports, "LPCWSTR", () => $8b4b58e694c3b67b$export$dfa283df2530598f);
$parcel$export($8b4b58e694c3b67b$exports, "LPCTSTR", () => $8b4b58e694c3b67b$export$3e6b4f6079ce51b);
$parcel$export($8b4b58e694c3b67b$exports, "LPVOID", () => $8b4b58e694c3b67b$export$3de86eb3806b712d);
$parcel$export($8b4b58e694c3b67b$exports, "LPCVOID", () => $8b4b58e694c3b67b$export$acb32c160acad508);
$parcel$export($8b4b58e694c3b67b$exports, "LPDWORD", () => $8b4b58e694c3b67b$export$33eafb5d436e1362);
$parcel$export($8b4b58e694c3b67b$exports, "LPHANDLE", () => $8b4b58e694c3b67b$export$e8ea75f05566dd3c);
$parcel$export($8b4b58e694c3b67b$exports, "LPINT", () => $8b4b58e694c3b67b$export$b4d77e4f53c21e3a);
$parcel$export($8b4b58e694c3b67b$exports, "LPLONG", () => $8b4b58e694c3b67b$export$ca6bd9f017df4953);
$parcel$export($8b4b58e694c3b67b$exports, "LPMSG", () => $8b4b58e694c3b67b$export$aba1f5f1221c9fb3);
$parcel$export($8b4b58e694c3b67b$exports, "LPPOINT", () => $8b4b58e694c3b67b$export$3a00c33c250e7d86);
$parcel$export($8b4b58e694c3b67b$exports, "LPSTR", () => $8b4b58e694c3b67b$export$e5fae31862228632);
$parcel$export($8b4b58e694c3b67b$exports, "LPWSTR", () => $8b4b58e694c3b67b$export$dec24c174f0eaee1);
$parcel$export($8b4b58e694c3b67b$exports, "LPTSTR", () => $8b4b58e694c3b67b$export$477e24a98da955e6);
$parcel$export($8b4b58e694c3b67b$exports, "LPWORD", () => $8b4b58e694c3b67b$export$a362e06a8759641a);
$parcel$export($8b4b58e694c3b67b$exports, "LRESULT", () => $8b4b58e694c3b67b$export$307c691072d7eef0);
$parcel$export($8b4b58e694c3b67b$exports, "NTSTATUS", () => $8b4b58e694c3b67b$export$a50474266f14be1b);
$parcel$export($8b4b58e694c3b67b$exports, "PBOOL", () => $8b4b58e694c3b67b$export$a1d44ba3d847cfd0);
$parcel$export($8b4b58e694c3b67b$exports, "PBOOLEAN", () => $8b4b58e694c3b67b$export$4f984d513e291397);
$parcel$export($8b4b58e694c3b67b$exports, "PBYTE", () => $8b4b58e694c3b67b$export$306fa084066e20a7);
$parcel$export($8b4b58e694c3b67b$exports, "PCHAR", () => $8b4b58e694c3b67b$export$72c3772b516a65cf);
$parcel$export($8b4b58e694c3b67b$exports, "PCSTR", () => $8b4b58e694c3b67b$export$cf99bbd665f301f9);
$parcel$export($8b4b58e694c3b67b$exports, "PCTSTR", () => $8b4b58e694c3b67b$export$d63ff7816142b2f4);
$parcel$export($8b4b58e694c3b67b$exports, "PCWSTR", () => $8b4b58e694c3b67b$export$8aeea065f4882b0c);
$parcel$export($8b4b58e694c3b67b$exports, "PDWORD", () => $8b4b58e694c3b67b$export$c06eff3fc862da47);
$parcel$export($8b4b58e694c3b67b$exports, "PDWORDLONG", () => $8b4b58e694c3b67b$export$e09b44cec70f0704);
$parcel$export($8b4b58e694c3b67b$exports, "PDWORD_PTR", () => $8b4b58e694c3b67b$export$a2bbf1fe69b0026d);
$parcel$export($8b4b58e694c3b67b$exports, "PDWORD32", () => $8b4b58e694c3b67b$export$60e2c917bf0cf558);
$parcel$export($8b4b58e694c3b67b$exports, "PDWORD64", () => $8b4b58e694c3b67b$export$d8d54319b3c23a57);
$parcel$export($8b4b58e694c3b67b$exports, "PFLOAT", () => $8b4b58e694c3b67b$export$22fafc5c9d071cf4);
$parcel$export($8b4b58e694c3b67b$exports, "PHALF_PTR", () => $8b4b58e694c3b67b$export$729dee532709226e);
$parcel$export($8b4b58e694c3b67b$exports, "PHANDLE", () => $8b4b58e694c3b67b$export$30d4c74fa93d3438);
$parcel$export($8b4b58e694c3b67b$exports, "PHKEY", () => $8b4b58e694c3b67b$export$64ced35c53da7357);
$parcel$export($8b4b58e694c3b67b$exports, "PINT", () => $8b4b58e694c3b67b$export$905308e3ac5456b0);
$parcel$export($8b4b58e694c3b67b$exports, "PINT_PTR", () => $8b4b58e694c3b67b$export$7fbf02121a44af3);
$parcel$export($8b4b58e694c3b67b$exports, "PINT8", () => $8b4b58e694c3b67b$export$16ddf13bb85917f4);
$parcel$export($8b4b58e694c3b67b$exports, "PINT16", () => $8b4b58e694c3b67b$export$2863cf8b15c466bd);
$parcel$export($8b4b58e694c3b67b$exports, "PINT32", () => $8b4b58e694c3b67b$export$3888f865e2f3fc9e);
$parcel$export($8b4b58e694c3b67b$exports, "PINT64", () => $8b4b58e694c3b67b$export$d81a713d6f75c904);
$parcel$export($8b4b58e694c3b67b$exports, "PLCID", () => $8b4b58e694c3b67b$export$d0f483e3dea49716);
$parcel$export($8b4b58e694c3b67b$exports, "PLONG", () => $8b4b58e694c3b67b$export$884b50f6e7d23183);
$parcel$export($8b4b58e694c3b67b$exports, "PLONGLONG", () => $8b4b58e694c3b67b$export$f4311b64ba2f3fe7);
$parcel$export($8b4b58e694c3b67b$exports, "PLONG_PTR", () => $8b4b58e694c3b67b$export$6cfa0302bb348fb4);
$parcel$export($8b4b58e694c3b67b$exports, "PLONG32", () => $8b4b58e694c3b67b$export$b415878f19491157);
$parcel$export($8b4b58e694c3b67b$exports, "PLONG64", () => $8b4b58e694c3b67b$export$9b97fd1af0726c08);
$parcel$export($8b4b58e694c3b67b$exports, "POINTER_32", () => $8b4b58e694c3b67b$export$f27a748240b723f3);
$parcel$export($8b4b58e694c3b67b$exports, "POINTER_64", () => $8b4b58e694c3b67b$export$5d25222f3b2425ae);
$parcel$export($8b4b58e694c3b67b$exports, "POINTER_SIGNED", () => $8b4b58e694c3b67b$export$729c2fdddcf979dc);
$parcel$export($8b4b58e694c3b67b$exports, "POINTER_UNSIGNED", () => $8b4b58e694c3b67b$export$d595eac61e43ee1f);
$parcel$export($8b4b58e694c3b67b$exports, "PSHORT", () => $8b4b58e694c3b67b$export$8c90681ffa492177);
$parcel$export($8b4b58e694c3b67b$exports, "PSIZE_T", () => $8b4b58e694c3b67b$export$42c4483327accaad);
$parcel$export($8b4b58e694c3b67b$exports, "PSSIZE_T", () => $8b4b58e694c3b67b$export$159e35dadcec50ed);
$parcel$export($8b4b58e694c3b67b$exports, "PSTR", () => $8b4b58e694c3b67b$export$fd996999f34a55b1);
$parcel$export($8b4b58e694c3b67b$exports, "PTBYTE", () => $8b4b58e694c3b67b$export$99f79cd79a3279be);
$parcel$export($8b4b58e694c3b67b$exports, "PTCHAR", () => $8b4b58e694c3b67b$export$a80266c3bbf78408);
$parcel$export($8b4b58e694c3b67b$exports, "PTSTR", () => $8b4b58e694c3b67b$export$90396e0dac1d7bf4);
$parcel$export($8b4b58e694c3b67b$exports, "PUCHAR", () => $8b4b58e694c3b67b$export$dac29ac7c1a6a593);
$parcel$export($8b4b58e694c3b67b$exports, "PUHALF_PTR", () => $8b4b58e694c3b67b$export$3b9eae56db5c9a5c);
$parcel$export($8b4b58e694c3b67b$exports, "PUINT", () => $8b4b58e694c3b67b$export$335fb31719a5cd92);
$parcel$export($8b4b58e694c3b67b$exports, "PUINT_PTR", () => $8b4b58e694c3b67b$export$f6cfbcf283b0732e);
$parcel$export($8b4b58e694c3b67b$exports, "PUINT8", () => $8b4b58e694c3b67b$export$29db969f4284195f);
$parcel$export($8b4b58e694c3b67b$exports, "PUINT16", () => $8b4b58e694c3b67b$export$1fc9516454e9e0c2);
$parcel$export($8b4b58e694c3b67b$exports, "PUINT32", () => $8b4b58e694c3b67b$export$b91b1f2b5d4b2f56);
$parcel$export($8b4b58e694c3b67b$exports, "PUINT64", () => $8b4b58e694c3b67b$export$a598fa2150118df1);
$parcel$export($8b4b58e694c3b67b$exports, "PULONG", () => $8b4b58e694c3b67b$export$bbdf20879558fef0);
$parcel$export($8b4b58e694c3b67b$exports, "PULONGLONG", () => $8b4b58e694c3b67b$export$b1eafd00c14966b1);
$parcel$export($8b4b58e694c3b67b$exports, "PULONG_PTR", () => $8b4b58e694c3b67b$export$77c87f189e52029c);
$parcel$export($8b4b58e694c3b67b$exports, "PULONG32", () => $8b4b58e694c3b67b$export$c3860bffe982b77);
$parcel$export($8b4b58e694c3b67b$exports, "PULONG64", () => $8b4b58e694c3b67b$export$ed3d7c18eaa4706a);
$parcel$export($8b4b58e694c3b67b$exports, "PUSHORT", () => $8b4b58e694c3b67b$export$c33f795d3055c8e8);
$parcel$export($8b4b58e694c3b67b$exports, "PWCHAR", () => $8b4b58e694c3b67b$export$53e197f0568d60e7);
$parcel$export($8b4b58e694c3b67b$exports, "PWORD", () => $8b4b58e694c3b67b$export$44a81616d2266597);
$parcel$export($8b4b58e694c3b67b$exports, "PWSTR", () => $8b4b58e694c3b67b$export$34fcf56876cedf67);
$parcel$export($8b4b58e694c3b67b$exports, "QWORD", () => $8b4b58e694c3b67b$export$ee325f3aca1cefe);
$parcel$export($8b4b58e694c3b67b$exports, "SC_HANDLE", () => $8b4b58e694c3b67b$export$ef4c74ea1198ce76);
$parcel$export($8b4b58e694c3b67b$exports, "SC_LOCK", () => $8b4b58e694c3b67b$export$dc1bca63e2d62447);
$parcel$export($8b4b58e694c3b67b$exports, "SERVICE_STATUS_HANDLE", () => $8b4b58e694c3b67b$export$1bbbfd60fd9e87f3);
$parcel$export($8b4b58e694c3b67b$exports, "SHORT", () => $8b4b58e694c3b67b$export$1de1ffada6286910);
$parcel$export($8b4b58e694c3b67b$exports, "SIZE_T", () => $8b4b58e694c3b67b$export$f089f2422e95b42b);
$parcel$export($8b4b58e694c3b67b$exports, "SSIZE_T", () => $8b4b58e694c3b67b$export$a185e644c63be28f);
$parcel$export($8b4b58e694c3b67b$exports, "TBYTE", () => $8b4b58e694c3b67b$export$d894ec5fb3ed01a4);
$parcel$export($8b4b58e694c3b67b$exports, "TCHAR", () => $8b4b58e694c3b67b$export$20f081206609d5f7);
$parcel$export($8b4b58e694c3b67b$exports, "UCHAR", () => $8b4b58e694c3b67b$export$226908722445f5d7);
$parcel$export($8b4b58e694c3b67b$exports, "UHALF_PTR", () => $8b4b58e694c3b67b$export$f229c93d3486a070);
$parcel$export($8b4b58e694c3b67b$exports, "UINT", () => $8b4b58e694c3b67b$export$54c0d11872b7e6d4);
$parcel$export($8b4b58e694c3b67b$exports, "UINT_PTR", () => $8b4b58e694c3b67b$export$d642901a6a404ec0);
$parcel$export($8b4b58e694c3b67b$exports, "UINT8", () => $8b4b58e694c3b67b$export$212e71dfd61c79fa);
$parcel$export($8b4b58e694c3b67b$exports, "UINT16", () => $8b4b58e694c3b67b$export$e81cbc576f121d7);
$parcel$export($8b4b58e694c3b67b$exports, "UINT32", () => $8b4b58e694c3b67b$export$55e9b618f09601c9);
$parcel$export($8b4b58e694c3b67b$exports, "UINT64", () => $8b4b58e694c3b67b$export$eb2099ed807a836e);
$parcel$export($8b4b58e694c3b67b$exports, "ULONG", () => $8b4b58e694c3b67b$export$c76dabb36bddc74f);
$parcel$export($8b4b58e694c3b67b$exports, "ULONGLONG", () => $8b4b58e694c3b67b$export$4c4b72fe7d344560);
$parcel$export($8b4b58e694c3b67b$exports, "ULONG32", () => $8b4b58e694c3b67b$export$1f6ffa45e1d0ba10);
$parcel$export($8b4b58e694c3b67b$exports, "ULONG64", () => $8b4b58e694c3b67b$export$35ffdfef7dc81db);
$parcel$export($8b4b58e694c3b67b$exports, "UNICODE_STRING", () => $8b4b58e694c3b67b$export$5dcce0e722389cdb);
$parcel$export($8b4b58e694c3b67b$exports, "USHORT", () => $8b4b58e694c3b67b$export$da53d5ec51ae7634);
$parcel$export($8b4b58e694c3b67b$exports, "USN", () => $8b4b58e694c3b67b$export$79215014ef451883);
$parcel$export($8b4b58e694c3b67b$exports, "WINEVENTPROC", () => $8b4b58e694c3b67b$export$3410187f8fd3ffe0);
$parcel$export($8b4b58e694c3b67b$exports, "WNDENUMPROC", () => $8b4b58e694c3b67b$export$db60719a96ea9349);
$parcel$export($8b4b58e694c3b67b$exports, "WNDPROC", () => $8b4b58e694c3b67b$export$9b17b5eb695fe8eb);
$parcel$export($8b4b58e694c3b67b$exports, "WPARAM", () => $8b4b58e694c3b67b$export$9ea0e07848f6a21c);
$parcel$export($8b4b58e694c3b67b$exports, "LPINITCOMMONCONTROLSEX", () => $8b4b58e694c3b67b$export$1a7b006743d0f934);
$parcel$export($8b4b58e694c3b67b$exports, "LPWNDCLASSEX", () => $8b4b58e694c3b67b$export$1f0a9d32094b3282);
$parcel$export($8b4b58e694c3b67b$exports, "PWINDOWINFO", () => $8b4b58e694c3b67b$export$7eee65a87be8fed2);
$parcel$export($8b4b58e694c3b67b$exports, "PFILETIME", () => $8b4b58e694c3b67b$export$1b5ecb15ced895a7);
$parcel$export($8b4b58e694c3b67b$exports, "LPFILETIME", () => $8b4b58e694c3b67b$export$e929ded8e6b3e173);
$parcel$export($8b4b58e694c3b67b$exports, "va_list", () => $8b4b58e694c3b67b$export$b1fc40da7cd7c95c);
$parcel$export($8b4b58e694c3b67b$exports, "INITCOMMONCONTROLSEX", () => $8b4b58e694c3b67b$export$6eb78d635a3ee587);
$parcel$export($8b4b58e694c3b67b$exports, "MSG", () => $8b4b58e694c3b67b$export$f99154f7a7b0135d);
$parcel$export($8b4b58e694c3b67b$exports, "POINT", () => $8b4b58e694c3b67b$export$a80a24d37f0f1279);
$parcel$export($8b4b58e694c3b67b$exports, "WNDCLASSEX", () => $8b4b58e694c3b67b$export$81ef613fbd3a628d);
$parcel$export($8b4b58e694c3b67b$exports, "WINDOWINFO", () => $8b4b58e694c3b67b$export$5119761222d7d0f6);
$parcel$export($8b4b58e694c3b67b$exports, "PRAWINPUTDEVICELIST", () => $8b4b58e694c3b67b$export$ceb1f86d9f461eb);
$parcel$export($8b4b58e694c3b67b$exports, "RECT", () => $8b4b58e694c3b67b$export$1e530543ba1d4b12);

const $8b4b58e694c3b67b$export$a78dc2c4cbd70341 = "uint16";
const $8b4b58e694c3b67b$export$181c9ad1752440f7 = "uint32";
const $8b4b58e694c3b67b$export$9cb553b951e1e0d8 = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$1f4a129e1195d18a = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$bd8b6af04676495 = "PVOID";
const $8b4b58e694c3b67b$export$f60fc96aa99c605e = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$2e482cd8c991e558 = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$1cd1943b3a73bbe8 = "void";
const $8b4b58e694c3b67b$export$d71e2b267f5b711b = "uint16";
const $8b4b58e694c3b67b$export$f3a79cf462faa1e3 = "int16";
const $8b4b58e694c3b67b$export$c35dd5647862f990 = "int";
const $8b4b58e694c3b67b$export$428cfe48a69a3b4f = "bool";
const $8b4b58e694c3b67b$export$8f4bf8f7eb581284 = "byte";
const $8b4b58e694c3b67b$export$578a4c3d73a6d794 = "pointer"; // https://msdn.microsoft.com/en-us/library/windows/desktop/ms633573(v=vs.85).aspx
const $8b4b58e694c3b67b$export$934996f637259e88 = "uint8";
const $8b4b58e694c3b67b$export$9e88d7b6f62f62d8 = "uint8";
const $8b4b58e694c3b67b$export$52da70d84f582c04 = "DWORD";
const $8b4b58e694c3b67b$export$6b766bfdcf67e2ec = "uint64";
const $8b4b58e694c3b67b$export$8f7b8c11edcb3e34 = "ULONG_PTR";
const $8b4b58e694c3b67b$export$a8ea5b58ae88fc11 = "uint32";
const $8b4b58e694c3b67b$export$8db31e1b1c7e0db0 = "uint64";
const $8b4b58e694c3b67b$export$d2b086fd1e01e03a = "float";
const $8b4b58e694c3b67b$export$1505c2c04cc3bbef = "HANDLE";
const $8b4b58e694c3b67b$export$2d081f52dd94061a = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$49cd303f01f67350 = "HANDLE";
const $8b4b58e694c3b67b$export$d17b38c787d37ab8 = "HANDLE";
const $8b4b58e694c3b67b$export$56c7641f121a2c5c = "HANDLE";
const $8b4b58e694c3b67b$export$762b8b6ee0ff4c44 = "HANDLE";
const $8b4b58e694c3b67b$export$750eee7b2f0ee030 = "HANDLE";
const $8b4b58e694c3b67b$export$a02796fdca6d354a = "HANDLE";
const $8b4b58e694c3b67b$export$1a62f6d54b236e36 = "HANDLE";
const $8b4b58e694c3b67b$export$4ddde23cd7155d44 = "HANDLE";
const $8b4b58e694c3b67b$export$1d0ad5eb60ffc518 = "HANDLE";
const $8b4b58e694c3b67b$export$726c5c347609dae3 = "HANDLE";
const $8b4b58e694c3b67b$export$323f06abdd2a59da = "HANDLE";
const $8b4b58e694c3b67b$export$a43730eb8bf8b76e = "HANDLE";
const $8b4b58e694c3b67b$export$91f6f659ef3d1edd = "HANDLE"; // typedef int HFILE;
const $8b4b58e694c3b67b$export$229672d8f6dd9e1a = "HANDLE";
const $8b4b58e694c3b67b$export$ef0ae13fba225584 = "HANDLE";
const $8b4b58e694c3b67b$export$6b52c27577dfb85e = "HANDLE";
const $8b4b58e694c3b67b$export$a681c4a7983815bf = "HANDLE";
const $8b4b58e694c3b67b$export$105fd39584a4c170 = "HANDLE";
const $8b4b58e694c3b67b$export$1a50b4f53ac33a = "HANDLE";
const $8b4b58e694c3b67b$export$80d8783aa08e677d = "HANDLE";
const $8b4b58e694c3b67b$export$9252a4926414af53 = "HANDLE";
const $8b4b58e694c3b67b$export$941fbb37db50e0ee = "HANDLE";
const $8b4b58e694c3b67b$export$5570ee796bf8668a = "HANDLE";
const $8b4b58e694c3b67b$export$32e1d6dd1d786a08 = "HANDLE";
const $8b4b58e694c3b67b$export$82cb6941373786ac = $8b4b58e694c3b67b$export$1a50b4f53ac33a;
const $8b4b58e694c3b67b$export$d76bcd896c4c1f0b = "HANDLE";
const $8b4b58e694c3b67b$export$c984542fbcd9e311 = "HANDLE";
const $8b4b58e694c3b67b$export$e8c398641ae921a0 = "HANDLE";
const $8b4b58e694c3b67b$export$2109f3ca8e001dc3 = "long";
const $8b4b58e694c3b67b$export$64129906a6b15c89 = "HANDLE";
const $8b4b58e694c3b67b$export$d0b96b23ab9f5338 = "HANDLE";
const $8b4b58e694c3b67b$export$c50eccdd15c9fd55 = "HANDLE";
const $8b4b58e694c3b67b$export$60bcb2927641b3f4 = "HANDLE";
const $8b4b58e694c3b67b$export$893fa35bdef36b = "HANDLE";
const $8b4b58e694c3b67b$export$6525812590d9a476 = "HANDLE";
const $8b4b58e694c3b67b$export$160e8bdd97bfce3a = "int";
const $8b4b58e694c3b67b$export$f051d14373139dee = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$9922471c07c2891d = "int8";
const $8b4b58e694c3b67b$export$bd9b91838fde002e = "int16";
const $8b4b58e694c3b67b$export$34412edc7b36f85 = "int32";
const $8b4b58e694c3b67b$export$a2c63c68aeee9e2d = "int64";
const $8b4b58e694c3b67b$export$6190ebba87077b9d = "WORD";
const $8b4b58e694c3b67b$export$b36cf4a83245c2f9 = "DWORD";
const $8b4b58e694c3b67b$export$244c0463aedba74c = "DWORD";
const $8b4b58e694c3b67b$export$202821be4d3b65c7 = "DWORD";
const $8b4b58e694c3b67b$export$686cfa64f218be7a = "long";
const $8b4b58e694c3b67b$export$2d2033f38dde21c = "longlong";
const $8b4b58e694c3b67b$export$4c9cb8eafd43015e = "int32";
const $8b4b58e694c3b67b$export$552dea698acd6cd2 = "int64";
const $8b4b58e694c3b67b$export$13371aace3d44948 = "LONG_PTR";
const $8b4b58e694c3b67b$export$5df7e4acce683059 = "BOOL";
const $8b4b58e694c3b67b$export$1061811df8b0c9be = "byte*";
const $8b4b58e694c3b67b$export$f1d7ba3e4d51498c = "DWORD";
const $8b4b58e694c3b67b$export$18e7280707df82f3 = "uint8*";
const $8b4b58e694c3b67b$export$dfa283df2530598f = "uint16*";
const $8b4b58e694c3b67b$export$3e6b4f6079ce51b = (0, $a300da9755ff1bc0$export$609085a058d4a4d0);
const $8b4b58e694c3b67b$export$3de86eb3806b712d = "void*";
const $8b4b58e694c3b67b$export$acb32c160acad508 = "LPVOID";
const $8b4b58e694c3b67b$export$33eafb5d436e1362 = "uint16*";
const $8b4b58e694c3b67b$export$e8ea75f05566dd3c = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55); // A pointer to a HANDLE.
const $8b4b58e694c3b67b$export$b4d77e4f53c21e3a = "int*";
const $8b4b58e694c3b67b$export$ca6bd9f017df4953 = "int32*";
const $8b4b58e694c3b67b$export$aba1f5f1221c9fb3 = "pointer"; // A pointer to a MSG
const $8b4b58e694c3b67b$export$3a00c33c250e7d86 = "pointer";
const $8b4b58e694c3b67b$export$e5fae31862228632 = "char*";
const $8b4b58e694c3b67b$export$dec24c174f0eaee1 = "uint16*";
const $8b4b58e694c3b67b$export$477e24a98da955e6 = (0, $a300da9755ff1bc0$export$609085a058d4a4d0);
const $8b4b58e694c3b67b$export$a362e06a8759641a = "uint16*";
const $8b4b58e694c3b67b$export$307c691072d7eef0 = "LONG_PTR";
const $8b4b58e694c3b67b$export$a50474266f14be1b = "uint32";
const $8b4b58e694c3b67b$export$a1d44ba3d847cfd0 = "int*"; // ? 'bool*'
const $8b4b58e694c3b67b$export$4f984d513e291397 = "bool*";
const $8b4b58e694c3b67b$export$306fa084066e20a7 = "byte*";
const $8b4b58e694c3b67b$export$72c3772b516a65cf = "char*";
const $8b4b58e694c3b67b$export$cf99bbd665f301f9 = "uint8*";
const $8b4b58e694c3b67b$export$d63ff7816142b2f4 = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$8aeea065f4882b0c = "uint16*";
const $8b4b58e694c3b67b$export$c06eff3fc862da47 = "uint32*";
const $8b4b58e694c3b67b$export$e09b44cec70f0704 = "uint64*";
const $8b4b58e694c3b67b$export$a2bbf1fe69b0026d = "DWORD_PTR";
const $8b4b58e694c3b67b$export$60e2c917bf0cf558 = "uint32*";
const $8b4b58e694c3b67b$export$d8d54319b3c23a57 = "uint64*";
const $8b4b58e694c3b67b$export$22fafc5c9d071cf4 = "float*";
const $8b4b58e694c3b67b$export$729dee532709226e = "pointer"; // ? A pointer to a HALF_PTR.
const $8b4b58e694c3b67b$export$30d4c74fa93d3438 = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$64ced35c53da7357 = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$905308e3ac5456b0 = "int*";
const $8b4b58e694c3b67b$export$7fbf02121a44af3 = "int**";
const $8b4b58e694c3b67b$export$16ddf13bb85917f4 = "int8*";
const $8b4b58e694c3b67b$export$2863cf8b15c466bd = "int16*";
const $8b4b58e694c3b67b$export$3888f865e2f3fc9e = "int32*";
const $8b4b58e694c3b67b$export$d81a713d6f75c904 = "int64*";
const $8b4b58e694c3b67b$export$d0f483e3dea49716 = "uint32*";
const $8b4b58e694c3b67b$export$884b50f6e7d23183 = "long*";
const $8b4b58e694c3b67b$export$f4311b64ba2f3fe7 = "int64*";
const $8b4b58e694c3b67b$export$6cfa0302bb348fb4 = "pointer";
const $8b4b58e694c3b67b$export$b415878f19491157 = "int32*";
const $8b4b58e694c3b67b$export$9b97fd1af0726c08 = "int64*";
const $8b4b58e694c3b67b$export$f27a748240b723f3 = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$5d25222f3b2425ae = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$729c2fdddcf979dc = "pointer"; // ? A signed pointer.
const $8b4b58e694c3b67b$export$d595eac61e43ee1f = "pointer"; // An unsigned pointer.
const $8b4b58e694c3b67b$export$8c90681ffa492177 = "int16*";
const $8b4b58e694c3b67b$export$42c4483327accaad = "ULONG_PTR"; // ?
const $8b4b58e694c3b67b$export$159e35dadcec50ed = "pointer";
const $8b4b58e694c3b67b$export$fd996999f34a55b1 = "char*";
const $8b4b58e694c3b67b$export$99f79cd79a3279be = (0, $a300da9755ff1bc0$export$609085a058d4a4d0);
const $8b4b58e694c3b67b$export$a80266c3bbf78408 = (0, $a300da9755ff1bc0$export$609085a058d4a4d0);
const $8b4b58e694c3b67b$export$90396e0dac1d7bf4 = (0, $a300da9755ff1bc0$export$609085a058d4a4d0);
const $8b4b58e694c3b67b$export$dac29ac7c1a6a593 = "pointer";
const $8b4b58e694c3b67b$export$3b9eae56db5c9a5c = "pointer";
const $8b4b58e694c3b67b$export$335fb31719a5cd92 = "uint*";
const $8b4b58e694c3b67b$export$f6cfbcf283b0732e = "uint**";
const $8b4b58e694c3b67b$export$29db969f4284195f = "uint8*";
const $8b4b58e694c3b67b$export$1fc9516454e9e0c2 = "uint16*";
const $8b4b58e694c3b67b$export$b91b1f2b5d4b2f56 = "uint32*";
const $8b4b58e694c3b67b$export$a598fa2150118df1 = "uint64*";
const $8b4b58e694c3b67b$export$bbdf20879558fef0 = "uint*";
const $8b4b58e694c3b67b$export$b1eafd00c14966b1 = "uint64*";
const $8b4b58e694c3b67b$export$77c87f189e52029c = "uint64**";
const $8b4b58e694c3b67b$export$c3860bffe982b77 = "uint*";
const $8b4b58e694c3b67b$export$ed3d7c18eaa4706a = "uint64*";
const $8b4b58e694c3b67b$export$c33f795d3055c8e8 = "uint16*";
const $8b4b58e694c3b67b$export$53e197f0568d60e7 = "uint16*";
const $8b4b58e694c3b67b$export$44a81616d2266597 = "uint16*";
const $8b4b58e694c3b67b$export$34fcf56876cedf67 = "uint16*";
const $8b4b58e694c3b67b$export$ee325f3aca1cefe = "uint64";
const $8b4b58e694c3b67b$export$ef4c74ea1198ce76 = "HANDLE";
const $8b4b58e694c3b67b$export$dc1bca63e2d62447 = "LPVOID";
const $8b4b58e694c3b67b$export$1bbbfd60fd9e87f3 = "HANDLE";
const $8b4b58e694c3b67b$export$1de1ffada6286910 = "int16";
const $8b4b58e694c3b67b$export$f089f2422e95b42b = "ULONG_PTR";
const $8b4b58e694c3b67b$export$a185e644c63be28f = "LONG_PTR";
const $8b4b58e694c3b67b$export$d894ec5fb3ed01a4 = (0, $a300da9755ff1bc0$export$609085a058d4a4d0);
const $8b4b58e694c3b67b$export$20f081206609d5f7 = (0, $a300da9755ff1bc0$export$609085a058d4a4d0);
const $8b4b58e694c3b67b$export$226908722445f5d7 = "uchar";
const $8b4b58e694c3b67b$export$f229c93d3486a070 = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$54c0d11872b7e6d4 = "uint";
const $8b4b58e694c3b67b$export$d642901a6a404ec0 = (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55);
const $8b4b58e694c3b67b$export$212e71dfd61c79fa = "uint8";
const $8b4b58e694c3b67b$export$e81cbc576f121d7 = "uint16";
const $8b4b58e694c3b67b$export$55e9b618f09601c9 = "uint32";
const $8b4b58e694c3b67b$export$eb2099ed807a836e = "uint64";
const $8b4b58e694c3b67b$export$c76dabb36bddc74f = "uint";
const $8b4b58e694c3b67b$export$4c4b72fe7d344560 = "uint64";
const $8b4b58e694c3b67b$export$1f6ffa45e1d0ba10 = "uint32";
const $8b4b58e694c3b67b$export$35ffdfef7dc81db = "uint64";
const $8b4b58e694c3b67b$export$5dcce0e722389cdb = "pointer";
const $8b4b58e694c3b67b$export$da53d5ec51ae7634 = "ushort";
const $8b4b58e694c3b67b$export$79215014ef451883 = $8b4b58e694c3b67b$export$2d2033f38dde21c;
const $8b4b58e694c3b67b$export$3410187f8fd3ffe0 = "pointer";
const $8b4b58e694c3b67b$export$db60719a96ea9349 = "pointer";
const $8b4b58e694c3b67b$export$9b17b5eb695fe8eb = "pointer";
const $8b4b58e694c3b67b$export$9ea0e07848f6a21c = "UINT_PTR";
const $8b4b58e694c3b67b$export$1a7b006743d0f934 = "pointer";
const $8b4b58e694c3b67b$export$1f0a9d32094b3282 = "pointer"; // A pointer to a WNDCLASSEX
const $8b4b58e694c3b67b$export$7eee65a87be8fed2 = "pointer"; // A pointer to a WINDOWINFO structure
const $8b4b58e694c3b67b$export$1b5ecb15ced895a7 = "pointer"; // A pointer to a FILETIME
const $8b4b58e694c3b67b$export$e929ded8e6b3e173 = "pointer"; // A pointer to a FILETIME
const $8b4b58e694c3b67b$export$b1fc40da7cd7c95c = "char*";
const $8b4b58e694c3b67b$export$6eb78d635a3ee587 = "pointer";
const $8b4b58e694c3b67b$export$f99154f7a7b0135d = "pointer";
const $8b4b58e694c3b67b$export$a80a24d37f0f1279 = "pointer";
const $8b4b58e694c3b67b$export$81ef613fbd3a628d = "pointer";
const $8b4b58e694c3b67b$export$5119761222d7d0f6 = "pointer";
const $8b4b58e694c3b67b$export$ceb1f86d9f461eb = "pointer";
const $8b4b58e694c3b67b$export$1e530543ba1d4b12 = "pointer"; // _RECT


const $f65e1a8161a93d3e$export$65dedbc9f072ffcc = new Map([
    [
        "HANDLE",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "uint64",
            "uint32"
        ]
    ],
    [
        "PVOID",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "uint64*",
            "uint32*"
        ]
    ],
    [
        "HALF_PTR",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "int32",
            "int16"
        ]
    ],
    [
        "INT_PTR",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "int64",
            "int32"
        ]
    ],
    [
        "LONG_PTR",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "int64",
            "int32"
        ]
    ],
    [
        "LPCTSTR",
        [
            (0, $a300da9755ff1bc0$export$609085a058d4a4d0),
            (0, $8b4b58e694c3b67b$export$dfa283df2530598f),
            (0, $8b4b58e694c3b67b$export$18e7280707df82f3)
        ]
    ],
    [
        "LPHANDLE",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "uint64*",
            "uint32*"
        ]
    ],
    [
        "LPTSTR",
        [
            (0, $a300da9755ff1bc0$export$609085a058d4a4d0),
            (0, $8b4b58e694c3b67b$export$dec24c174f0eaee1),
            "uint8*"
        ]
    ],
    [
        "PCTSTR",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            (0, $8b4b58e694c3b67b$export$dfa283df2530598f),
            (0, $8b4b58e694c3b67b$export$18e7280707df82f3)
        ]
    ],
    [
        "PHANDLE",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "uint64**",
            "uint32**"
        ]
    ],
    [
        "PHKEY",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "uint64*",
            "uint32*"
        ]
    ],
    [
        "POINTER_32",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "uint32*",
            "uint32*"
        ]
    ],
    [
        "POINTER_64",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "uint64*",
            "uint32*"
        ]
    ],
    [
        "PTBYTE",
        [
            (0, $a300da9755ff1bc0$export$609085a058d4a4d0),
            "int16*",
            "int8*"
        ]
    ],
    [
        "PTCHAR",
        [
            (0, $a300da9755ff1bc0$export$609085a058d4a4d0),
            "uint16*",
            "uint8*"
        ]
    ],
    [
        "PTSTR",
        [
            (0, $a300da9755ff1bc0$export$609085a058d4a4d0),
            (0, $8b4b58e694c3b67b$export$dec24c174f0eaee1),
            (0, $8b4b58e694c3b67b$export$e5fae31862228632)
        ]
    ],
    [
        "TBYTE",
        [
            (0, $a300da9755ff1bc0$export$609085a058d4a4d0),
            "int16",
            "int8"
        ]
    ],
    [
        "TCHAR",
        [
            (0, $a300da9755ff1bc0$export$609085a058d4a4d0),
            (0, $8b4b58e694c3b67b$export$d71e2b267f5b711b),
            "uint8"
        ]
    ],
    [
        "UHALF_PTR",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "uint32",
            "uint16"
        ]
    ],
    [
        "UINT_PTR",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "uint64",
            "uint32"
        ]
    ],
    [
        "ULONG_PTR",
        [
            (0, $a300da9755ff1bc0$export$4bbcbb9e6d314d55),
            "uint64",
            "uint32"
        ]
    ], 
]);



const $26c46ba6c5cd7f5b$var$W = (0, $c3321bfd9f7edb7e$export$828a2cfb74eb348c)($8b4b58e694c3b67b$exports, (0, $f65e1a8161a93d3e$export$65dedbc9f072ffcc));
const $26c46ba6c5cd7f5b$export$ad48b1b2cfc75809 = {
    cbSize: $26c46ba6c5cd7f5b$var$W.DWORD,
    cItems: $26c46ba6c5cd7f5b$var$W.INT,
    cColumns: $26c46ba6c5cd7f5b$var$W.INT,
    cRows: $26c46ba6c5cd7f5b$var$W.INT,
    iColFocus: $26c46ba6c5cd7f5b$var$W.INT,
    iRowFocus: $26c46ba6c5cd7f5b$var$W.INT,
    cxItem: $26c46ba6c5cd7f5b$var$W.INT,
    cyItem: $26c46ba6c5cd7f5b$var$W.INT,
    ptStart: $26c46ba6c5cd7f5b$var$W.POINT
};
const $26c46ba6c5cd7f5b$export$235a24185e6c03f3 = {
    dwData: $26c46ba6c5cd7f5b$var$W.ULONG_PTR,
    cbData: $26c46ba6c5cd7f5b$var$W.DWORD,
    lpData: $26c46ba6c5cd7f5b$var$W.PVOID
};
const $26c46ba6c5cd7f5b$export$c747a8b76ce2fc55 = {
    uMsg: $26c46ba6c5cd7f5b$var$W.DWORD,
    wParamL: $26c46ba6c5cd7f5b$var$W.WORD,
    wParamH: $26c46ba6c5cd7f5b$var$W.WORD
};
const $26c46ba6c5cd7f5b$export$6eb78d635a3ee587 = {
    dwSize: $26c46ba6c5cd7f5b$var$W.DWORD,
    dwICC: $26c46ba6c5cd7f5b$var$W.DWORD
};
const $26c46ba6c5cd7f5b$export$9d77698e6144d105 = {
    wVk: $26c46ba6c5cd7f5b$var$W.WORD,
    wScan: $26c46ba6c5cd7f5b$var$W.WORD,
    dwFlags: $26c46ba6c5cd7f5b$var$W.DWORD,
    time: $26c46ba6c5cd7f5b$var$W.DWORD,
    dwExtraInfo: $26c46ba6c5cd7f5b$var$W.ULONG_PTR
};
const $26c46ba6c5cd7f5b$export$b25d5f19497424fa = {
    dx: $26c46ba6c5cd7f5b$var$W.LONG,
    dy: $26c46ba6c5cd7f5b$var$W.LONG,
    mouseData: $26c46ba6c5cd7f5b$var$W.DWORD,
    dwFlags: $26c46ba6c5cd7f5b$var$W.DWORD,
    time: $26c46ba6c5cd7f5b$var$W.DWORD,
    dwExtraInfo: $26c46ba6c5cd7f5b$var$W.ULONG_PTR
};
const $26c46ba6c5cd7f5b$export$f99154f7a7b0135d = {
    hwnd: $26c46ba6c5cd7f5b$var$W.HWND,
    message: $26c46ba6c5cd7f5b$var$W.UINT,
    wParam: $26c46ba6c5cd7f5b$var$W.WPARAM,
    lParam: $26c46ba6c5cd7f5b$var$W.LPARAM,
    time: $26c46ba6c5cd7f5b$var$W.DWORD,
    pt: $26c46ba6c5cd7f5b$var$W.POINT,
    lPrivate: $26c46ba6c5cd7f5b$var$W.DWORD
};
const $26c46ba6c5cd7f5b$export$a80a24d37f0f1279 = {
    x: $26c46ba6c5cd7f5b$var$W.LONG,
    y: $26c46ba6c5cd7f5b$var$W.LONG
};
const $26c46ba6c5cd7f5b$export$ca65a5b05e68b7ff = {
    Reserved1: $26c46ba6c5cd7f5b$var$W.PVOID,
    PebBaseAddress: $26c46ba6c5cd7f5b$var$W.PVOID,
    Reserved2: $26c46ba6c5cd7f5b$var$W.PVOID,
    UniqueProcessId: $26c46ba6c5cd7f5b$var$W.ULONG_PTR,
    InheritedFromUniqueProcessId: $26c46ba6c5cd7f5b$var$W.PVOID
};
const $26c46ba6c5cd7f5b$export$5dcce0e722389cdb = {
    Length: $26c46ba6c5cd7f5b$var$W.USHORT,
    MaximumLength: $26c46ba6c5cd7f5b$var$W.USHORT,
    Buffer: $26c46ba6c5cd7f5b$var$W.PWSTR
};
const $26c46ba6c5cd7f5b$export$109b0986e0806ee = {
    dwSizeHid: $26c46ba6c5cd7f5b$var$W.DWORD,
    dwCount: $26c46ba6c5cd7f5b$var$W.DWORD,
    /** bRawData[1] */ bRawData: $26c46ba6c5cd7f5b$var$W.BYTE
};
const $26c46ba6c5cd7f5b$export$cf7f2abb0ac9e892 = {
    hDevice: $26c46ba6c5cd7f5b$var$W.HANDLE,
    dwType: $26c46ba6c5cd7f5b$var$W.DWORD
};
const $26c46ba6c5cd7f5b$export$614c933f340ce1c1 = {
    dwType: $26c46ba6c5cd7f5b$var$W.DWORD,
    dwSize: $26c46ba6c5cd7f5b$var$W.DWORD,
    hDevice: $26c46ba6c5cd7f5b$var$W.HANDLE,
    wParam: $26c46ba6c5cd7f5b$var$W.WPARAM
};
const $26c46ba6c5cd7f5b$export$7f9753d8aef93f40 = {
    MakeCode: $26c46ba6c5cd7f5b$var$W.USHORT,
    Flags: $26c46ba6c5cd7f5b$var$W.USHORT,
    Reserved: $26c46ba6c5cd7f5b$var$W.USHORT,
    VKey: $26c46ba6c5cd7f5b$var$W.USHORT,
    Message: $26c46ba6c5cd7f5b$var$W.UINT,
    ExtraInformation: $26c46ba6c5cd7f5b$var$W.ULONG
};
const $26c46ba6c5cd7f5b$export$5119761222d7d0f6 = {
    cbSize: $26c46ba6c5cd7f5b$var$W.DWORD,
    rcWindow: $26c46ba6c5cd7f5b$var$W.RECT,
    rcClient: $26c46ba6c5cd7f5b$var$W.RECT,
    dwStyle: $26c46ba6c5cd7f5b$var$W.DWORD,
    dwExStyle: $26c46ba6c5cd7f5b$var$W.DWORD,
    dwWindowStatus: $26c46ba6c5cd7f5b$var$W.DWORD,
    cxWindowBorders: $26c46ba6c5cd7f5b$var$W.UINT,
    cyWindowBorders: $26c46ba6c5cd7f5b$var$W.UINT,
    atomWindowType: $26c46ba6c5cd7f5b$var$W.ATOM,
    wCreatorVersion: $26c46ba6c5cd7f5b$var$W.WORD
};
const $26c46ba6c5cd7f5b$export$81ef613fbd3a628d = {
    cbSize: $26c46ba6c5cd7f5b$var$W.UINT,
    style: $26c46ba6c5cd7f5b$var$W.UINT,
    // 'lpfnWndProc': ffi.Function('int32', ['pointer', 'uint32', 'int32', 'uint32']) ,
    lpfnWndProc: $26c46ba6c5cd7f5b$var$W.WNDPROC,
    cbClsExtra: $26c46ba6c5cd7f5b$var$W.INT,
    cbWndExtra: $26c46ba6c5cd7f5b$var$W.INT,
    hInstance: $26c46ba6c5cd7f5b$var$W.HINSTANCE,
    hIcon: $26c46ba6c5cd7f5b$var$W.HICON,
    hCursor: $26c46ba6c5cd7f5b$var$W.HCURSOR,
    hbrBackground: $26c46ba6c5cd7f5b$var$W.HBRUSH,
    lpszMenuName: $26c46ba6c5cd7f5b$var$W.LPCTSTR,
    lpszClassName: $26c46ba6c5cd7f5b$var$W.LPCTSTR,
    hIconSm: $26c46ba6c5cd7f5b$var$W.HICON
};
const $26c46ba6c5cd7f5b$export$1e530543ba1d4b12 = {
    left: $26c46ba6c5cd7f5b$var$W.LONG,
    top: $26c46ba6c5cd7f5b$var$W.LONG,
    right: $26c46ba6c5cd7f5b$var$W.LONG,
    bottom: $26c46ba6c5cd7f5b$var$W.LONG
};
const $26c46ba6c5cd7f5b$export$258339e884eb70b7 = {
    dwLowDateTime: $26c46ba6c5cd7f5b$var$W.DWORD,
    dwHighDateTime: $26c46ba6c5cd7f5b$var$W.DWORD
};





const $4c0d9f82f4272fb1$var$W = (0, $c3321bfd9f7edb7e$export$828a2cfb74eb348c)($8b4b58e694c3b67b$exports, (0, $f65e1a8161a93d3e$export$65dedbc9f072ffcc));
const $4c0d9f82f4272fb1$export$ff2835eca4f38b4e = {
    mouse: $4c0d9f82f4272fb1$var$W.INT,
    keyboard: $4c0d9f82f4272fb1$var$W.INT,
    hid: $4c0d9f82f4272fb1$var$W.INT
};















const $d3b484cc58a449ee$export$be44eba04df286d7 = (0, $c3321bfd9f7edb7e$export$828a2cfb74eb348c)($8b4b58e694c3b67b$exports, (0, $f65e1a8161a93d3e$export$65dedbc9f072ffcc));


let $4917142111539077$export$1fbf6ae150f5289f;
(function(IgtState) {
    IgtState[IgtState["UNKNOWN"] = 0] = "UNKNOWN";
    IgtState[IgtState["NO_GAME"] = 1] = "NO_GAME";
    IgtState[IgtState["PLAYING"] = 2] = "PLAYING";
    IgtState[IgtState["LOADING"] = 3] = "LOADING";
})($4917142111539077$export$1fbf6ae150f5289f || ($4917142111539077$export$1fbf6ae150f5289f = {}));



var $33b0c58e3ab924e9$require$Buffer = $chspj$buffer.Buffer;
const $33b0c58e3ab924e9$var$Struct = (0, (/*@__PURE__*/$parcel$interopDefault($5IhKb)))($gxkm2);
const $33b0c58e3ab924e9$var$BitmapStruct = $33b0c58e3ab924e9$var$Struct({
    bmType: $4555387f06897097$exports.types.long,
    bmWidth: $4555387f06897097$exports.types.long,
    bmHeight: $4555387f06897097$exports.types.long,
    bmWidthBytes: $4555387f06897097$exports.types.long,
    bmPlanes: $4555387f06897097$exports.types.uint16,
    bmBitsPixel: $4555387f06897097$exports.types.uint16,
    bmBits: "ulonglong"
});
const $33b0c58e3ab924e9$export$462becd5fad16474 = $33b0c58e3ab924e9$var$Struct({
    biSize: $4555387f06897097$exports.types.uint32,
    biWidth: $4555387f06897097$exports.types.int32,
    biHeight: $4555387f06897097$exports.types.int32,
    biPlanes: $4555387f06897097$exports.types.ushort,
    biBitCount: $4555387f06897097$exports.types.ushort,
    biCompression: $4555387f06897097$exports.types.uint32,
    biSizeImage: $4555387f06897097$exports.types.uint32,
    biXPelsPerMeter: $4555387f06897097$exports.types.int32,
    biYPelsPerMeter: $4555387f06897097$exports.types.int32,
    biClrUsed: $4555387f06897097$exports.types.uint32,
    biClrImportant: $4555387f06897097$exports.types.uint32
});
const $33b0c58e3ab924e9$export$cd15b4e17d65648c = $33b0c58e3ab924e9$var$Struct({
    red: $4555387f06897097$exports.types.byte,
    green: $4555387f06897097$exports.types.byte,
    blue: $4555387f06897097$exports.types.byte,
    alpha: $4555387f06897097$exports.types.byte
});
const $33b0c58e3ab924e9$var$user32 = $4555387f06897097$exports.Library("user32", {
    SetProcessDPIAware: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).BOOL,
        []
    ],
    GetClientRect: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).BOOL,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HWND,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).RECT
        ]
    ],
    ClientToScreen: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).BOOL,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HWND,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).LPPOINT
        ]
    ],
    GetWindowTextW: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HWND,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).LPTSTR,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT
        ]
    ],
    EnumWindows: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).BOOL,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).WNDENUMPROC,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).LPARAM
        ]
    ],
    GetDC: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).HWND,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HWND
        ]
    ],
    ReleaseDC: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).ULONG,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HWND,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HDC
        ]
    ]
});
const $33b0c58e3ab924e9$var$kernel32 = $4555387f06897097$exports.Library("kernel32", {
    GlobalUnlock: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).BOOL,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT32
        ]
    ],
    GlobalFree: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT32,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT32
        ]
    ]
});
const $33b0c58e3ab924e9$var$gdi32 = $4555387f06897097$exports.Library("GDI32", {
    SelectObject: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).HGDIOBJ,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HDC,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HGDIOBJ
        ]
    ],
    CreateCompatibleDC: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).HDC,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HDC
        ]
    ],
    CreateCompatibleBitmap: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).HBITMAP,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HDC,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT
        ]
    ],
    BitBlt: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).BOOL,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HDC,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HDC,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).DWORD
        ]
    ],
    GetObjectA: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HANDLE,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).LPVOID
        ]
    ],
    DeleteObject: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).BOOL,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HWND
        ]
    ],
    GetDIBits: [
        (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT32,
        [
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HWND,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).HWND,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).UINT32,
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).UINT32,
            $gxkm2.refType($33b0c58e3ab924e9$var$BitmapStruct),
            $gxkm2.refType($33b0c58e3ab924e9$export$462becd5fad16474),
            (0, $d3b484cc58a449ee$export$be44eba04df286d7).INT32
        ]
    ]
});
const $33b0c58e3ab924e9$var$GAME_LOOKUP_TICKTIME = 500;
let $33b0c58e3ab924e9$var$igtState = (0, $4917142111539077$export$1fbf6ae150f5289f).UNKNOWN;
let $33b0c58e3ab924e9$var$hwnd = 0;
let $33b0c58e3ab924e9$var$tickTime = 100;
let $33b0c58e3ab924e9$var$timer;
let $33b0c58e3ab924e9$var$callback = (state)=>{};
$33b0c58e3ab924e9$var$user32.SetProcessDPIAware();
const $33b0c58e3ab924e9$export$5801d716674e6bb6 = (igtCallback)=>{
    $33b0c58e3ab924e9$var$callback = igtCallback;
};
const $33b0c58e3ab924e9$export$11819f9fff450d9b = (timeInMs)=>{
    $33b0c58e3ab924e9$var$tickTime = timeInMs;
};
const $33b0c58e3ab924e9$export$a679630bf91eb455 = ()=>{
    $33b0c58e3ab924e9$var$igtState = (0, $4917142111539077$export$1fbf6ae150f5289f).UNKNOWN;
    $33b0c58e3ab924e9$var$hwnd = 0;
    $33b0c58e3ab924e9$var$processIgt();
    $33b0c58e3ab924e9$var$tickProcessIgt();
};
const $33b0c58e3ab924e9$export$cb0b9fb431e2932b = ()=>{
    clearInterval($33b0c58e3ab924e9$var$timer);
};
const $33b0c58e3ab924e9$var$runCallbackIfChanged = (state)=>{
    if (state != $33b0c58e3ab924e9$var$igtState) {
        $33b0c58e3ab924e9$var$igtState = state;
        $33b0c58e3ab924e9$var$callback($33b0c58e3ab924e9$var$igtState);
    }
};
const $33b0c58e3ab924e9$var$tickProcessIgt = ()=>{
    $33b0c58e3ab924e9$var$timer = setTimeout(()=>{
        $33b0c58e3ab924e9$var$processIgt();
        $33b0c58e3ab924e9$var$tickProcessIgt();
    }, $33b0c58e3ab924e9$var$igtState === (0, $4917142111539077$export$1fbf6ae150f5289f).NO_GAME || $33b0c58e3ab924e9$var$igtState === (0, $4917142111539077$export$1fbf6ae150f5289f).UNKNOWN ? $33b0c58e3ab924e9$var$GAME_LOOKUP_TICKTIME : $33b0c58e3ab924e9$var$tickTime);
};
const $33b0c58e3ab924e9$var$enumWindowsProc = $4555387f06897097$exports.Callback((0, $d3b484cc58a449ee$export$be44eba04df286d7).BOOL, [
    (0, $d3b484cc58a449ee$export$be44eba04df286d7).HWND,
    (0, $d3b484cc58a449ee$export$be44eba04df286d7).LPARAM
], (window, lParam)=>{
    const buf = $33b0c58e3ab924e9$require$Buffer.alloc(254);
    $33b0c58e3ab924e9$var$user32.GetWindowTextW(window, buf, buf.byteLength);
    if (buf.toString("ucs2").replace(/\0+$/, "") == "Diablo II: Resurrected") {
        $33b0c58e3ab924e9$var$hwnd = window;
        return false;
    }
    return true;
});
const $33b0c58e3ab924e9$var$noGame = ()=>{
    $33b0c58e3ab924e9$var$runCallbackIfChanged((0, $4917142111539077$export$1fbf6ae150f5289f).NO_GAME);
    $33b0c58e3ab924e9$var$hwnd = 0;
};
const $33b0c58e3ab924e9$var$gameLoading = ()=>{
    $33b0c58e3ab924e9$var$runCallbackIfChanged((0, $4917142111539077$export$1fbf6ae150f5289f).LOADING);
};
const $33b0c58e3ab924e9$var$gamePlaying = ()=>{
    $33b0c58e3ab924e9$var$runCallbackIfChanged((0, $4917142111539077$export$1fbf6ae150f5289f).PLAYING);
};
const $33b0c58e3ab924e9$var$processIgt = ()=>{
    if ($33b0c58e3ab924e9$var$hwnd === 0) {
        /** @ts-ignore */ $33b0c58e3ab924e9$var$user32.EnumWindows($33b0c58e3ab924e9$var$enumWindowsProc, 0);
        if ($33b0c58e3ab924e9$var$hwnd === 0) {
            $33b0c58e3ab924e9$var$noGame();
            return;
        }
    }
    /** @ts-ignore */ const origin = new $33b0c58e3ab924e9$var$Struct((0, $26c46ba6c5cd7f5b$exports).POINT)();
    /** @ts-ignore */ const retw = $33b0c58e3ab924e9$var$user32.ClientToScreen($33b0c58e3ab924e9$var$hwnd, origin.ref());
    if (retw == 0) {
        $33b0c58e3ab924e9$var$noGame();
        return;
    }
    /** @ts-ignore */ const rectClient = new $33b0c58e3ab924e9$var$Struct((0, $26c46ba6c5cd7f5b$exports).RECT)();
    /** @ts-ignore */ const ret = $33b0c58e3ab924e9$var$user32.GetClientRect($33b0c58e3ab924e9$var$hwnd, rectClient.ref());
    if (ret == 0) {
        $33b0c58e3ab924e9$var$noGame();
        return;
    }
    const w = rectClient.right;
    const h = rectClient.bottom;
    const x = origin.x;
    const y = origin.y;
    const screenshot = $33b0c58e3ab924e9$export$cdfb9a6a4ec4454d(x + Math.round(w / 2) - 100, y + h - 1, 200, 1);
    const isLoading = screenshot[0] === 0 && screenshot[1] === 0 && screenshot[2] === 0 && screenshot[400] === 0 && screenshot[401] === 0 && screenshot[402] === 0 && screenshot[796] === 0 && screenshot[797] === 0 && screenshot[798] === 0;
    if (isLoading) $33b0c58e3ab924e9$var$gameLoading();
    else $33b0c58e3ab924e9$var$gamePlaying();
};
function $33b0c58e3ab924e9$export$cdfb9a6a4ec4454d(x, y, width, height) {
    var _a;
    let hdcWindow = null;
    let hdcMemDC = null;
    let hbmScreen = null;
    let hDIB = null;
    try {
        hdcWindow = $33b0c58e3ab924e9$var$user32.GetDC(0);
        hdcMemDC = $33b0c58e3ab924e9$var$gdi32.CreateCompatibleDC(hdcWindow);
        hbmScreen = $33b0c58e3ab924e9$var$gdi32.CreateCompatibleBitmap(hdcWindow, width, height);
        $33b0c58e3ab924e9$var$gdi32.SelectObject(hdcMemDC, hbmScreen);
        $33b0c58e3ab924e9$var$gdi32.BitBlt(hdcMemDC, 0, 0, width, height, hdcWindow, x, y, 0xCC0020);
        const bmpScreen = new $33b0c58e3ab924e9$var$BitmapStruct();
        $33b0c58e3ab924e9$var$gdi32.GetObjectA(hbmScreen, 32, bmpScreen.ref());
        const bi = new $33b0c58e3ab924e9$export$462becd5fad16474();
        bi.biSize = $33b0c58e3ab924e9$export$462becd5fad16474.size;
        const bmWidth = Number(bmpScreen.bmWidth);
        const bmHeight = Number(bmpScreen.bmHeight);
        bi.biWidth = bmWidth;
        bi.biHeight = -bmpScreen.bmHeight;
        bi.biPlanes = 1;
        bi.biBitCount = 32;
        bi.biCompression = 0;
        bi.biSizeImage = 0;
        bi.biXPelsPerMeter = 0;
        bi.biYPelsPerMeter = 0;
        bi.biClrUsed = 0;
        bi.biClrImportant = 0;
        const bitsPerRow = (bmWidth * bi.biBitCount + 31) / 32 * 4;
        const dwBmpSize = bitsPerRow * bmHeight;
        const lpBitmap = $33b0c58e3ab924e9$require$Buffer.alloc(dwBmpSize);
        /** @ts-ignore */ $33b0c58e3ab924e9$var$gdi32.GetDIBits(hdcWindow, hbmScreen, 0, bmHeight, lpBitmap, bi.ref(), 0);
        if (hDIB != null) {
            $33b0c58e3ab924e9$var$kernel32.GlobalUnlock(hDIB);
            $33b0c58e3ab924e9$var$kernel32.GlobalFree(hDIB);
        }
        if (hbmScreen != null) $33b0c58e3ab924e9$var$gdi32.DeleteObject(hbmScreen);
        if (hdcMemDC != null) $33b0c58e3ab924e9$var$gdi32.DeleteObject(hdcMemDC);
        if (hdcWindow != null) /** @ts-ignore */ $33b0c58e3ab924e9$var$user32.ReleaseDC($33b0c58e3ab924e9$var$hwnd, hdcWindow);
        return lpBitmap;
    } catch (err) {
        if (hDIB != null) {
            $33b0c58e3ab924e9$var$kernel32.GlobalUnlock(hDIB);
            $33b0c58e3ab924e9$var$kernel32.GlobalFree(hDIB);
        }
        if (hbmScreen != null) $33b0c58e3ab924e9$var$gdi32.DeleteObject(hbmScreen);
        if (hdcMemDC != null) $33b0c58e3ab924e9$var$gdi32.DeleteObject(hdcMemDC);
        if (hdcWindow != null) $33b0c58e3ab924e9$var$user32.ReleaseDC($33b0c58e3ab924e9$var$hwnd, hdcWindow);
        throw err;
    }
}


//# sourceMappingURL=igt.cjs.map
