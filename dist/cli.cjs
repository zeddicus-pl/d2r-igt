var $kqsql$util = require("util");
var $kqsql$assert = require("assert");
var $kqsql$tty = require("tty");
var $kqsql$os = require("os");
var $kqsql$path = require("path");
var $kqsql$nodegypbuild = require("node-gyp-build");
var $kqsql$buffer = require("buffer");
var $kqsql$fs = require("fs");

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
parcelRequire.register("hjPBq", function(module, exports) {
"use strict";



var $c9bc3d394abb8b1d$var$debug = (parcelRequire("dUIKa"))("ref:struct");
/**
 * Module exports.
 */ module.exports = function(ref) {
    /**
 * The Struct "type" meta-constructor.
 */ function Struct() {
        $c9bc3d394abb8b1d$var$debug('defining new struct "type"');
        /**
   * This is the "constructor" of the Struct type that gets returned.
   *
   * Invoke it with `new` to create a new Buffer instance backing the struct.
   * Pass it an existing Buffer instance to use that as the backing buffer.
   * Pass in an Object containing the struct fields to auto-populate the
   * struct with the data.
   */ function StructType(arg, data) {
            if (!(this instanceof StructType)) return new StructType(arg, data);
            $c9bc3d394abb8b1d$var$debug("creating new struct instance");
            var store;
            if (Buffer.isBuffer(arg)) {
                $c9bc3d394abb8b1d$var$debug("using passed-in Buffer instance to back the struct", arg);
                $kqsql$assert(arg.length >= StructType.size, "Buffer instance must be at least " + StructType.size + " bytes to back this struct type");
                store = arg;
                arg = data;
            } else {
                $c9bc3d394abb8b1d$var$debug("creating new Buffer instance to back the struct (size: %d)", StructType.size);
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
        $c9bc3d394abb8b1d$var$debug('Struct "type" getter for buffer at offset', buffer, offset);
        if (offset > 0) buffer = buffer.slice(offset);
        return new this(buffer);
    }
    /**
 * The "set" function of the Struct "type" interface
 */ function set(buffer, offset, value) {
        $c9bc3d394abb8b1d$var$debug('Struct "type" setter for buffer at offset', buffer, offset, value);
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
        $c9bc3d394abb8b1d$var$debug("defining new struct type field", name);
        // allow string types for convenience
        type = ref.coerceType(type);
        $kqsql$assert(!this._instanceCreated, 'an instance of this Struct type has already been created, cannot add new "fields" anymore');
        $kqsql$assert.equal("string", typeof name, 'expected a "string" field name');
        $kqsql$assert(type && /object|function/i.test(typeof type) && "size" in type && "indirection" in type, 'expected a "type" object describing the field type: "' + type + '"');
        $kqsql$assert(type.indirection > 1 || type.size > 0, '"type" object must have a size greater than 0');
        $kqsql$assert(!(name in this.prototype), 'the field "' + name + '" already exists in this Struct type');
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
            $c9bc3d394abb8b1d$var$debug('getting "%s" struct field (offset: %d)', name, field.offset);
            return ref.get(this["ref.buffer"], field.offset, type);
        };
        desc.set = function(value) {
            $c9bc3d394abb8b1d$var$debug('setting "%s" struct field (offset: %d)', name, field.offset, value);
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
            if (!struct.isPacked) $kqsql$assert.equal(offset % align, 0, "offset should align");
            // adjust the "size" of the struct type
            struct.size = offset + size;
            // return the calulated offset
            return offset;
        }
        // any final padding?
        var left = struct.size % struct.alignment;
        if (left > 0) {
            $c9bc3d394abb8b1d$var$debug("additional padding to the end of struct:", struct.alignment - left);
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
        return $kqsql$util.inspect(obj);
    };
    /**
 * returns a Buffer pointing to this struct data structure.
 */ proto.ref = function ref() {
        return this["ref.buffer"];
    };
    return Struct;
};

});
parcelRequire.register("dUIKa", function(module, exports) {
"use strict";


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) module.exports = (parcelRequire("7KJNg"));
else module.exports = (parcelRequire("d9RCH"));

});
parcelRequire.register("7KJNg", function(module, exports) {
"use strict";
function $5a5059ebd861d78d$var$_typeof(obj1) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") $5a5059ebd861d78d$var$_typeof = function _typeof(obj) {
        return typeof obj;
    };
    else $5a5059ebd861d78d$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    return $5a5059ebd861d78d$var$_typeof(obj1);
}
/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ module.exports.log = $5a5059ebd861d78d$var$log;
module.exports.formatArgs = $5a5059ebd861d78d$var$formatArgs;
module.exports.save = $5a5059ebd861d78d$var$save;
module.exports.load = $5a5059ebd861d78d$var$load;
module.exports.useColors = $5a5059ebd861d78d$var$useColors;
module.exports.storage = $5a5059ebd861d78d$var$localstorage();
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
function $5a5059ebd861d78d$var$useColors() {
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
 */ function $5a5059ebd861d78d$var$formatArgs(args) {
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
 */ function $5a5059ebd861d78d$var$log() {
    var _console;
    // This hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return (typeof console === "undefined" ? "undefined" : $5a5059ebd861d78d$var$_typeof(console)) === "object" && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function $5a5059ebd861d78d$var$save(namespaces) {
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
 */ function $5a5059ebd861d78d$var$load() {
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
 */ function $5a5059ebd861d78d$var$localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // XXX (@Qix-) should we be logging these?
    }
}

module.exports = (parcelRequire("j7Pcs"))(module.exports);
var $5a5059ebd861d78d$var$formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ $5a5059ebd861d78d$var$formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
    }
};

});
parcelRequire.register("j7Pcs", function(module, exports) {
"use strict";

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function $dec663001f39e9ae$var$setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = (parcelRequire("9gknv"));
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
module.exports = $dec663001f39e9ae$var$setup;

});
parcelRequire.register("9gknv", function(module, exports) {
/**
 * Helpers.
 */ var $6be56a576006bc64$var$s = 1000;
var $6be56a576006bc64$var$m = $6be56a576006bc64$var$s * 60;
var $6be56a576006bc64$var$h = $6be56a576006bc64$var$m * 60;
var $6be56a576006bc64$var$d = $6be56a576006bc64$var$h * 24;
var $6be56a576006bc64$var$w = $6be56a576006bc64$var$d * 7;
var $6be56a576006bc64$var$y = $6be56a576006bc64$var$d * 365.25;
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
    if (type === "string" && val.length > 0) return $6be56a576006bc64$var$parse(val);
    else if (type === "number" && isFinite(val)) return options.long ? $6be56a576006bc64$var$fmtLong(val) : $6be56a576006bc64$var$fmtShort(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function $6be56a576006bc64$var$parse(str) {
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
            return n * $6be56a576006bc64$var$y;
        case "weeks":
        case "week":
        case "w":
            return n * $6be56a576006bc64$var$w;
        case "days":
        case "day":
        case "d":
            return n * $6be56a576006bc64$var$d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * $6be56a576006bc64$var$h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * $6be56a576006bc64$var$m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * $6be56a576006bc64$var$s;
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
 */ function $6be56a576006bc64$var$fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $6be56a576006bc64$var$d) return Math.round(ms / $6be56a576006bc64$var$d) + "d";
    if (msAbs >= $6be56a576006bc64$var$h) return Math.round(ms / $6be56a576006bc64$var$h) + "h";
    if (msAbs >= $6be56a576006bc64$var$m) return Math.round(ms / $6be56a576006bc64$var$m) + "m";
    if (msAbs >= $6be56a576006bc64$var$s) return Math.round(ms / $6be56a576006bc64$var$s) + "s";
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $6be56a576006bc64$var$fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $6be56a576006bc64$var$d) return $6be56a576006bc64$var$plural(ms, msAbs, $6be56a576006bc64$var$d, "day");
    if (msAbs >= $6be56a576006bc64$var$h) return $6be56a576006bc64$var$plural(ms, msAbs, $6be56a576006bc64$var$h, "hour");
    if (msAbs >= $6be56a576006bc64$var$m) return $6be56a576006bc64$var$plural(ms, msAbs, $6be56a576006bc64$var$m, "minute");
    if (msAbs >= $6be56a576006bc64$var$s) return $6be56a576006bc64$var$plural(ms, msAbs, $6be56a576006bc64$var$s, "second");
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function $6be56a576006bc64$var$plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}

});



parcelRequire.register("d9RCH", function(module, exports) {
"use strict";


/**
 * This is the Node.js implementation of `debug()`.
 */ module.exports.init = $9945b6146eebfe67$var$init;
module.exports.log = $9945b6146eebfe67$var$log;
module.exports.formatArgs = $9945b6146eebfe67$var$formatArgs;
module.exports.save = $9945b6146eebfe67$var$save;
module.exports.load = $9945b6146eebfe67$var$load;
module.exports.useColors = $9945b6146eebfe67$var$useColors;
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
    var $9945b6146eebfe67$var$supportsColor = (parcelRequire("kSPmk"));
    if ($9945b6146eebfe67$var$supportsColor && ($9945b6146eebfe67$var$supportsColor.stderr || $9945b6146eebfe67$var$supportsColor).level >= 2) module.exports.colors = [
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
 */ function $9945b6146eebfe67$var$useColors() {
    return "colors" in module.exports.inspectOpts ? Boolean(module.exports.inspectOpts.colors) : $kqsql$tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function $9945b6146eebfe67$var$formatArgs(args) {
    var name = this.namespace, useColors1 = this.useColors;
    if (useColors1) {
        var c = this.color;
        var colorCode = "\x1b[3" + (c < 8 ? c : "8;5;" + c);
        var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1b[0m");
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1b[0m");
    } else args[0] = $9945b6146eebfe67$var$getDate() + name + " " + args[0];
}
function $9945b6146eebfe67$var$getDate() {
    if (module.exports.inspectOpts.hideDate) return "";
    return new Date().toISOString() + " ";
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */ function $9945b6146eebfe67$var$log() {
    return process.stderr.write($kqsql$util.format.apply($kqsql$util, arguments) + "\n");
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function $9945b6146eebfe67$var$save(namespaces) {
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
 */ function $9945b6146eebfe67$var$load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function $9945b6146eebfe67$var$init(debug) {
    debug.inspectOpts = {};
    var keys = Object.keys(module.exports.inspectOpts);
    for(var i = 0; i < keys.length; i++)debug.inspectOpts[keys[i]] = module.exports.inspectOpts[keys[i]];
}

module.exports = (parcelRequire("j7Pcs"))(module.exports);
var $9945b6146eebfe67$var$formatters = module.exports.formatters;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ $9945b6146eebfe67$var$formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return $kqsql$util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
    }).join(" ");
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ $9945b6146eebfe67$var$formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return $kqsql$util.inspect(v, this.inspectOpts);
};

});
parcelRequire.register("kSPmk", function(module, exports) {
"use strict";



var $2WdyL = parcelRequire("2WdyL");
const { env: $f340b0a3f0972096$var$env  } = process;
let $f340b0a3f0972096$var$forceColor;
if ($2WdyL("no-color") || $2WdyL("no-colors") || $2WdyL("color=false") || $2WdyL("color=never")) $f340b0a3f0972096$var$forceColor = 0;
else if ($2WdyL("color") || $2WdyL("colors") || $2WdyL("color=true") || $2WdyL("color=always")) $f340b0a3f0972096$var$forceColor = 1;
if ("FORCE_COLOR" in $f340b0a3f0972096$var$env) {
    if ($f340b0a3f0972096$var$env.FORCE_COLOR === "true") $f340b0a3f0972096$var$forceColor = 1;
    else if ($f340b0a3f0972096$var$env.FORCE_COLOR === "false") $f340b0a3f0972096$var$forceColor = 0;
    else $f340b0a3f0972096$var$forceColor = $f340b0a3f0972096$var$env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt($f340b0a3f0972096$var$env.FORCE_COLOR, 10), 3);
}
function $f340b0a3f0972096$var$translateLevel(level) {
    if (level === 0) return false;
    return {
        level: level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
    };
}
function $f340b0a3f0972096$var$supportsColor(haveStream, streamIsTTY) {
    if ($f340b0a3f0972096$var$forceColor === 0) return 0;
    if ($2WdyL("color=16m") || $2WdyL("color=full") || $2WdyL("color=truecolor")) return 3;
    if ($2WdyL("color=256")) return 2;
    if (haveStream && !streamIsTTY && $f340b0a3f0972096$var$forceColor === undefined) return 0;
    const min = $f340b0a3f0972096$var$forceColor || 0;
    if ($f340b0a3f0972096$var$env.TERM === "dumb") return min;
    if (process.platform === "win32") {
        // Windows 10 build 10586 is the first Windows release that supports 256 colors.
        // Windows 10 build 14931 is the first release that supports 16m/TrueColor.
        const osRelease = $kqsql$os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
        return 1;
    }
    if ("CI" in $f340b0a3f0972096$var$env) {
        if ([
            "TRAVIS",
            "CIRCLECI",
            "APPVEYOR",
            "GITLAB_CI",
            "GITHUB_ACTIONS",
            "BUILDKITE"
        ].some((sign)=>sign in $f340b0a3f0972096$var$env) || $f340b0a3f0972096$var$env.CI_NAME === "codeship") return 1;
        return min;
    }
    if ("TEAMCITY_VERSION" in $f340b0a3f0972096$var$env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test($f340b0a3f0972096$var$env.TEAMCITY_VERSION) ? 1 : 0;
    if ($f340b0a3f0972096$var$env.COLORTERM === "truecolor") return 3;
    if ("TERM_PROGRAM" in $f340b0a3f0972096$var$env) {
        const version = parseInt(($f340b0a3f0972096$var$env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch($f340b0a3f0972096$var$env.TERM_PROGRAM){
            case "iTerm.app":
                return version >= 3 ? 3 : 2;
            case "Apple_Terminal":
                return 2;
        }
    }
    if (/-256(color)?$/i.test($f340b0a3f0972096$var$env.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test($f340b0a3f0972096$var$env.TERM)) return 1;
    if ("COLORTERM" in $f340b0a3f0972096$var$env) return 1;
    return min;
}
function $f340b0a3f0972096$var$getSupportLevel(stream) {
    const level = $f340b0a3f0972096$var$supportsColor(stream, stream && stream.isTTY);
    return $f340b0a3f0972096$var$translateLevel(level);
}
module.exports = {
    supportsColor: $f340b0a3f0972096$var$getSupportLevel,
    stdout: $f340b0a3f0972096$var$translateLevel($f340b0a3f0972096$var$supportsColor(true, $kqsql$tty.isatty(1))),
    stderr: $f340b0a3f0972096$var$translateLevel($f340b0a3f0972096$var$supportsColor(true, $kqsql$tty.isatty(2)))
};

});
parcelRequire.register("2WdyL", function(module, exports) {
"use strict";
module.exports = (flag, argv = process.argv)=>{
    const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf("--");
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};

});





parcelRequire.register("6Wwqc", function(module, exports) {

var __dirname1 = $kqsql$path.resolve(__dirname, "../node_modules/ref-napi/lib");
"use strict";


var $50e14f1a427f416d$require$inspect = $kqsql$util.inspect;

const debug = (parcelRequire("7CZVQ"))("ref");



exports = module.exports = $kqsql$nodegypbuild($kqsql$path.join(__dirname1, ".."));
exports.endianness = $kqsql$os.endianness();
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
                if (!(rtn && "size" in rtn && "indirection" in rtn)) throw new TypeError('could not determine a proper "type" from: ' + $50e14f1a427f416d$require$inspect(type));
                for(let i = 0; i < refCount; i++)rtn = exports.refType(rtn);
            }
        }
    }
    if (!(rtn && "size" in rtn && "indirection" in rtn)) throw new TypeError('could not determine a proper "type" from: ' + $50e14f1a427f416d$require$inspect(type));
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
    $kqsql$assert(type.indirection > 0, `"indirection" level must be at least 1, saw ${type.indirection}`);
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
    $kqsql$assert(type.indirection >= 1, '"indirection" level must be at least 1');
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
    $kqsql$assert(Buffer.isBuffer(buffer), "expected a Buffer as the first argument");
    $kqsql$assert.strictEqual("string", typeof string, 'expected a "string" as the third argument');
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
    $kqsql$assert(size >= 1 && size <= 8);
    let typeName = "int" + size * 8;
    if (unsigned) typeName = "u" + typeName;
    const type = exports.types[typeName];
    $kqsql$assert(type);
    exports.types[name] = Object.create(type);
});
// set the "alignment" property on the built-in types
Object.keys(exports.alignof).forEach((name)=>{
    if (name === "pointer") return;
    exports.types[name].alignment = exports.alignof[name];
    $kqsql$assert(exports.types[name].alignment > 0);
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
 */ var inspectSym = $50e14f1a427f416d$require$inspect.custom || "inspect";
/**
 * in node 6.91, inspect.custom does not give a correct value; so in this case, don't torch the whole process.
 * fixed in >6.9.2
 */ if (Buffer.prototype[inspectSym]) Buffer.prototype[inspectSym] = overwriteInspect(Buffer.prototype[inspectSym]);

// does SlowBuffer inherit from Buffer? (node >= v0.7.9)
if (!(exports.NULL instanceof Buffer)) {
    debug("extending SlowBuffer's prototype since it doesn't inherit from Buffer.prototype");
    /*!
   * SlowBuffer convenience methods.
   */ var SlowBuffer = $kqsql$buffer.SlowBuffer;
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
parcelRequire.register("7CZVQ", function(module, exports) {


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) module.exports = (parcelRequire("kLIpK"));
else module.exports = (parcelRequire("4iNAo"));

});
parcelRequire.register("kLIpK", function(module, exports) {
/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ module.exports.formatArgs = $f1eaa6359406a059$var$formatArgs;
module.exports.save = $f1eaa6359406a059$var$save;
module.exports.load = $f1eaa6359406a059$var$load;
module.exports.useColors = $f1eaa6359406a059$var$useColors;
module.exports.storage = $f1eaa6359406a059$var$localstorage();
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
function $f1eaa6359406a059$var$useColors() {
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
 */ function $f1eaa6359406a059$var$formatArgs(args) {
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
 */ function $f1eaa6359406a059$var$save(namespaces) {
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
 */ function $f1eaa6359406a059$var$load() {
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
 */ function $f1eaa6359406a059$var$localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}

module.exports = (parcelRequire("6AFaP"))(module.exports);
const { formatters: $f1eaa6359406a059$var$formatters  } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ $f1eaa6359406a059$var$formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
    }
};

});
parcelRequire.register("6AFaP", function(module, exports) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function $4cc60b15d8fa3182$var$setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = (parcelRequire("jpZ56"));
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
module.exports = $4cc60b15d8fa3182$var$setup;

});
parcelRequire.register("jpZ56", function(module, exports) {
/**
 * Helpers.
 */ var $e22fbb921648f907$var$s = 1000;
var $e22fbb921648f907$var$m = $e22fbb921648f907$var$s * 60;
var $e22fbb921648f907$var$h = $e22fbb921648f907$var$m * 60;
var $e22fbb921648f907$var$d = $e22fbb921648f907$var$h * 24;
var $e22fbb921648f907$var$w = $e22fbb921648f907$var$d * 7;
var $e22fbb921648f907$var$y = $e22fbb921648f907$var$d * 365.25;
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
    if (type === "string" && val.length > 0) return $e22fbb921648f907$var$parse(val);
    else if (type === "number" && isFinite(val)) return options.long ? $e22fbb921648f907$var$fmtLong(val) : $e22fbb921648f907$var$fmtShort(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function $e22fbb921648f907$var$parse(str) {
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
            return n * $e22fbb921648f907$var$y;
        case "weeks":
        case "week":
        case "w":
            return n * $e22fbb921648f907$var$w;
        case "days":
        case "day":
        case "d":
            return n * $e22fbb921648f907$var$d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * $e22fbb921648f907$var$h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * $e22fbb921648f907$var$m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * $e22fbb921648f907$var$s;
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
 */ function $e22fbb921648f907$var$fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $e22fbb921648f907$var$d) return Math.round(ms / $e22fbb921648f907$var$d) + "d";
    if (msAbs >= $e22fbb921648f907$var$h) return Math.round(ms / $e22fbb921648f907$var$h) + "h";
    if (msAbs >= $e22fbb921648f907$var$m) return Math.round(ms / $e22fbb921648f907$var$m) + "m";
    if (msAbs >= $e22fbb921648f907$var$s) return Math.round(ms / $e22fbb921648f907$var$s) + "s";
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $e22fbb921648f907$var$fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $e22fbb921648f907$var$d) return $e22fbb921648f907$var$plural(ms, msAbs, $e22fbb921648f907$var$d, "day");
    if (msAbs >= $e22fbb921648f907$var$h) return $e22fbb921648f907$var$plural(ms, msAbs, $e22fbb921648f907$var$h, "hour");
    if (msAbs >= $e22fbb921648f907$var$m) return $e22fbb921648f907$var$plural(ms, msAbs, $e22fbb921648f907$var$m, "minute");
    if (msAbs >= $e22fbb921648f907$var$s) return $e22fbb921648f907$var$plural(ms, msAbs, $e22fbb921648f907$var$s, "second");
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function $e22fbb921648f907$var$plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}

});



parcelRequire.register("4iNAo", function(module, exports) {


/**
 * This is the Node.js implementation of `debug()`.
 */ module.exports.init = $321f4e9f5af9d6e3$var$init;
module.exports.log = $321f4e9f5af9d6e3$var$log;
module.exports.formatArgs = $321f4e9f5af9d6e3$var$formatArgs;
module.exports.save = $321f4e9f5af9d6e3$var$save;
module.exports.load = $321f4e9f5af9d6e3$var$load;
module.exports.useColors = $321f4e9f5af9d6e3$var$useColors;
module.exports.destroy = $kqsql$util.deprecate(()=>{}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
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
    const supportsColor = (parcelRequire("kSPmk"));
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
 */ function $321f4e9f5af9d6e3$var$useColors() {
    return "colors" in module.exports.inspectOpts ? Boolean(module.exports.inspectOpts.colors) : $kqsql$tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function $321f4e9f5af9d6e3$var$formatArgs(args) {
    const { namespace: name , useColors: useColors1  } = this;
    if (useColors1) {
        const c = this.color;
        const colorCode = "\x1b[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \u001B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1b[0m");
    } else args[0] = $321f4e9f5af9d6e3$var$getDate() + name + " " + args[0];
}
function $321f4e9f5af9d6e3$var$getDate() {
    if (module.exports.inspectOpts.hideDate) return "";
    return new Date().toISOString() + " ";
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */ function $321f4e9f5af9d6e3$var$log(...args) {
    return process.stderr.write($kqsql$util.format(...args) + "\n");
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function $321f4e9f5af9d6e3$var$save(namespaces) {
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
 */ function $321f4e9f5af9d6e3$var$load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function $321f4e9f5af9d6e3$var$init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(module.exports.inspectOpts);
    for(let i = 0; i < keys.length; i++)debug.inspectOpts[keys[i]] = module.exports.inspectOpts[keys[i]];
}

module.exports = (parcelRequire("6AFaP"))(module.exports);
const { formatters: $321f4e9f5af9d6e3$var$formatters  } = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ $321f4e9f5af9d6e3$var$formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return $kqsql$util.inspect(v, this.inspectOpts).split("\n").map((str)=>str.trim()).join(" ");
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ $321f4e9f5af9d6e3$var$formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return $kqsql$util.inspect(v, this.inspectOpts);
};

});



parcelRequire.register("7qyBb", function(module, exports) {


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) module.exports = (parcelRequire("aTcOZ"));
else module.exports = (parcelRequire("kMaCi"));

});
parcelRequire.register("aTcOZ", function(module, exports) {
/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ module.exports.formatArgs = $7ed8fc83449708cd$var$formatArgs;
module.exports.save = $7ed8fc83449708cd$var$save;
module.exports.load = $7ed8fc83449708cd$var$load;
module.exports.useColors = $7ed8fc83449708cd$var$useColors;
module.exports.storage = $7ed8fc83449708cd$var$localstorage();
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
function $7ed8fc83449708cd$var$useColors() {
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
 */ function $7ed8fc83449708cd$var$formatArgs(args) {
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
 */ function $7ed8fc83449708cd$var$save(namespaces) {
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
 */ function $7ed8fc83449708cd$var$load() {
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
 */ function $7ed8fc83449708cd$var$localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}

module.exports = (parcelRequire("bU9K3"))(module.exports);
const { formatters: $7ed8fc83449708cd$var$formatters  } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ $7ed8fc83449708cd$var$formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
    }
};

});
parcelRequire.register("bU9K3", function(module, exports) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function $8aac7b2ec3d41c64$var$setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = (parcelRequire("haO4L"));
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
module.exports = $8aac7b2ec3d41c64$var$setup;

});
parcelRequire.register("haO4L", function(module, exports) {
/**
 * Helpers.
 */ var $c80a36dab9d6d5e4$var$s = 1000;
var $c80a36dab9d6d5e4$var$m = $c80a36dab9d6d5e4$var$s * 60;
var $c80a36dab9d6d5e4$var$h = $c80a36dab9d6d5e4$var$m * 60;
var $c80a36dab9d6d5e4$var$d = $c80a36dab9d6d5e4$var$h * 24;
var $c80a36dab9d6d5e4$var$w = $c80a36dab9d6d5e4$var$d * 7;
var $c80a36dab9d6d5e4$var$y = $c80a36dab9d6d5e4$var$d * 365.25;
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
    if (type === "string" && val.length > 0) return $c80a36dab9d6d5e4$var$parse(val);
    else if (type === "number" && isFinite(val)) return options.long ? $c80a36dab9d6d5e4$var$fmtLong(val) : $c80a36dab9d6d5e4$var$fmtShort(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function $c80a36dab9d6d5e4$var$parse(str) {
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
            return n * $c80a36dab9d6d5e4$var$y;
        case "weeks":
        case "week":
        case "w":
            return n * $c80a36dab9d6d5e4$var$w;
        case "days":
        case "day":
        case "d":
            return n * $c80a36dab9d6d5e4$var$d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * $c80a36dab9d6d5e4$var$h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * $c80a36dab9d6d5e4$var$m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * $c80a36dab9d6d5e4$var$s;
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
 */ function $c80a36dab9d6d5e4$var$fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $c80a36dab9d6d5e4$var$d) return Math.round(ms / $c80a36dab9d6d5e4$var$d) + "d";
    if (msAbs >= $c80a36dab9d6d5e4$var$h) return Math.round(ms / $c80a36dab9d6d5e4$var$h) + "h";
    if (msAbs >= $c80a36dab9d6d5e4$var$m) return Math.round(ms / $c80a36dab9d6d5e4$var$m) + "m";
    if (msAbs >= $c80a36dab9d6d5e4$var$s) return Math.round(ms / $c80a36dab9d6d5e4$var$s) + "s";
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $c80a36dab9d6d5e4$var$fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $c80a36dab9d6d5e4$var$d) return $c80a36dab9d6d5e4$var$plural(ms, msAbs, $c80a36dab9d6d5e4$var$d, "day");
    if (msAbs >= $c80a36dab9d6d5e4$var$h) return $c80a36dab9d6d5e4$var$plural(ms, msAbs, $c80a36dab9d6d5e4$var$h, "hour");
    if (msAbs >= $c80a36dab9d6d5e4$var$m) return $c80a36dab9d6d5e4$var$plural(ms, msAbs, $c80a36dab9d6d5e4$var$m, "minute");
    if (msAbs >= $c80a36dab9d6d5e4$var$s) return $c80a36dab9d6d5e4$var$plural(ms, msAbs, $c80a36dab9d6d5e4$var$s, "second");
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function $c80a36dab9d6d5e4$var$plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}

});



parcelRequire.register("kMaCi", function(module, exports) {


/**
 * This is the Node.js implementation of `debug()`.
 */ module.exports.init = $f2008699ea365a27$var$init;
module.exports.log = $f2008699ea365a27$var$log;
module.exports.formatArgs = $f2008699ea365a27$var$formatArgs;
module.exports.save = $f2008699ea365a27$var$save;
module.exports.load = $f2008699ea365a27$var$load;
module.exports.useColors = $f2008699ea365a27$var$useColors;
module.exports.destroy = $kqsql$util.deprecate(()=>{}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
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
    const supportsColor = (parcelRequire("kSPmk"));
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
 */ function $f2008699ea365a27$var$useColors() {
    return "colors" in module.exports.inspectOpts ? Boolean(module.exports.inspectOpts.colors) : $kqsql$tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function $f2008699ea365a27$var$formatArgs(args) {
    const { namespace: name , useColors: useColors1  } = this;
    if (useColors1) {
        const c = this.color;
        const colorCode = "\x1b[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \u001B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1b[0m");
    } else args[0] = $f2008699ea365a27$var$getDate() + name + " " + args[0];
}
function $f2008699ea365a27$var$getDate() {
    if (module.exports.inspectOpts.hideDate) return "";
    return new Date().toISOString() + " ";
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */ function $f2008699ea365a27$var$log(...args) {
    return process.stderr.write($kqsql$util.format(...args) + "\n");
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function $f2008699ea365a27$var$save(namespaces) {
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
 */ function $f2008699ea365a27$var$load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function $f2008699ea365a27$var$init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(module.exports.inspectOpts);
    for(let i = 0; i < keys.length; i++)debug.inspectOpts[keys[i]] = module.exports.inspectOpts[keys[i]];
}

module.exports = (parcelRequire("bU9K3"))(module.exports);
const { formatters: $f2008699ea365a27$var$formatters  } = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ $f2008699ea365a27$var$formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return $kqsql$util.inspect(v, this.inspectOpts).split("\n").map((str)=>str.trim()).join(" ");
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ $f2008699ea365a27$var$formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return $kqsql$util.inspect(v, this.inspectOpts);
};

});


parcelRequire.register("duUqO", function(module, exports) {
"use strict";

var $fsVRQ = parcelRequire("fsVRQ");


const $9d39d9d74dd67909$var$debug = (parcelRequire("7qyBb"))("ffi:cif");

var $6Wwqc = parcelRequire("6Wwqc");

var $iQ7uV = parcelRequire("iQ7uV");
const $9d39d9d74dd67909$var$POINTER_SIZE = $6Wwqc.sizeof.pointer;
const $9d39d9d74dd67909$var$ffi_prep_cif = $iQ7uV.ffi_prep_cif;
const $9d39d9d74dd67909$var$FFI_CIF_SIZE = $iQ7uV.FFI_CIF_SIZE;
const $9d39d9d74dd67909$var$FFI_DEFAULT_ABI = $iQ7uV.FFI_DEFAULT_ABI;
// status codes
const $9d39d9d74dd67909$var$FFI_OK = $iQ7uV.FFI_OK;
const $9d39d9d74dd67909$var$FFI_BAD_TYPEDEF = $iQ7uV.FFI_BAD_TYPEDEF;
const $9d39d9d74dd67909$var$FFI_BAD_ABI = $iQ7uV.FFI_BAD_ABI;
/**
 * JS wrapper for the `ffi_prep_cif` function.
 * Returns a Buffer instance representing a `ffi_cif *` instance.
 */ const $9d39d9d74dd67909$var$cifs = [];
function $9d39d9d74dd67909$var$CIF(rtype, types, abi) {
    $9d39d9d74dd67909$var$debug("creating `ffi_cif *` instance");
    // the return and arg types are expected to be coerced at this point...
    $kqsql$assert(!!rtype, 'expected a return "type" object as the first argument');
    $kqsql$assert(Array.isArray(types), 'expected an Array of arg "type" objects as the second argument');
    // the buffer that will contain the return `ffi_cif *` instance
    const cif = Buffer.alloc($9d39d9d74dd67909$var$FFI_CIF_SIZE);
    const numArgs = types.length;
    const _argtypesptr = Buffer.alloc(numArgs * $9d39d9d74dd67909$var$POINTER_SIZE);
    const _rtypeptr = $fsVRQ(rtype);
    for(var i = 0; i < numArgs; i++){
        const type = types[i];
        const ffiType = $fsVRQ(type);
        _argtypesptr.writePointer(ffiType, i * $9d39d9d74dd67909$var$POINTER_SIZE);
    }
    // prevent GC of the arg type and rtn type buffers (not sure if this is required)
    cif.rtnTypePtr = _rtypeptr;
    cif.argTypesPtr = _argtypesptr;
    if (typeof abi === "undefined") {
        $9d39d9d74dd67909$var$debug("no ABI specified (this is OK), using FFI_DEFAULT_ABI");
        abi = $9d39d9d74dd67909$var$FFI_DEFAULT_ABI;
    }
    const status = $9d39d9d74dd67909$var$ffi_prep_cif(cif, numArgs, _rtypeptr, _argtypesptr, abi);
    if (status !== $9d39d9d74dd67909$var$FFI_OK) switch(status){
        case $9d39d9d74dd67909$var$FFI_BAD_TYPEDEF:
            {
                const err = new Error("ffi_prep_cif() returned an FFI_BAD_TYPEDEF error");
                err.code = "FFI_BAD_TYPEDEF";
                err.errno = status;
                throw err;
            }
        case $9d39d9d74dd67909$var$FFI_BAD_ABI:
            {
                const err = new Error("ffi_prep_cif() returned an FFI_BAD_ABI error");
                err.code = "FFI_BAD_ABI";
                err.errno = status;
                throw err;
            }
        default:
            throw new Error("ffi_prep_cif() returned an error: " + status);
    }
    if ($9d39d9d74dd67909$var$debug.enabled || `${process.env.DEBUG}`.match(/\bffi\b/)) $9d39d9d74dd67909$var$cifs.push(cif);
    return cif;
}
module.exports = $9d39d9d74dd67909$var$CIF;

});
parcelRequire.register("fsVRQ", function(module, exports) {
"use strict";

var $6Wwqc = parcelRequire("6Wwqc");


const $b4265bcf4e6acf08$var$debug = (parcelRequire("7qyBb"))("ffi:types");

const $b4265bcf4e6acf08$var$Struct = (parcelRequire("hjPBq"))($6Wwqc);

var $iQ7uV = parcelRequire("iQ7uV");
/**
 * Define the `ffi_type` struct (see deps/libffi/include/ffi.h) for use in JS.
 * This struct type is used internally to define custom struct ret/arg types.
 */ const $b4265bcf4e6acf08$var$FFI_TYPE = $b4265bcf4e6acf08$var$Type.FFI_TYPE = $b4265bcf4e6acf08$var$Struct();
$b4265bcf4e6acf08$var$FFI_TYPE.defineProperty("size", $6Wwqc.types.size_t);
$b4265bcf4e6acf08$var$FFI_TYPE.defineProperty("alignment", $6Wwqc.types.ushort);
$b4265bcf4e6acf08$var$FFI_TYPE.defineProperty("type", $6Wwqc.types.ushort);
// this last prop is a C Array of `ffi_type *` elements, so this is `ffi_type **`
const $b4265bcf4e6acf08$var$ffi_type_ptr_array = $6Wwqc.refType($6Wwqc.refType($b4265bcf4e6acf08$var$FFI_TYPE));
$b4265bcf4e6acf08$var$FFI_TYPE.defineProperty("elements", $b4265bcf4e6acf08$var$ffi_type_ptr_array);
$kqsql$assert.strictEqual($iQ7uV.FFI_TYPE_SIZE, $b4265bcf4e6acf08$var$FFI_TYPE.size);
/**
 * Returns a `ffi_type *` Buffer appropriate for the given "type".
 *
 * @param {Type|String} type A "ref" type (or string) to get the `ffi_type` for
 * @return {Buffer} A buffer pointing to a `ffi_type` instance for "type"
 * @api private
 */ function $b4265bcf4e6acf08$var$Type(type) {
    type = $6Wwqc.coerceType(type);
    $b4265bcf4e6acf08$var$debug("Type()", type.name || type);
    $kqsql$assert(type.indirection >= 1, 'invalid "type" given: ' + (type.name || type));
    let ret;
    // first we assume it's a regular "type". if the "indirection" is greater than
    // 1, then we can just use "pointer" ffi_type, otherwise we hope "ffi_type" is
    // set
    if (type.indirection === 1) ret = type.ffi_type;
    else ret = $iQ7uV.FFI_TYPES.pointer;
    // if "ret" isn't set (ffi_type was not set) then we check for "ref-array" type
    if (!ret && type.type) // got a "ref-array" type
    // passing arrays to C functions are always by reference, so we use "pointer"
    ret = $iQ7uV.FFI_TYPES.pointer;
    if (!ret && type.fields) {
        // got a "ref-struct" type
        // need to create the `ffi_type` instance manually
        $b4265bcf4e6acf08$var$debug('creating an `ffi_type` for given "ref-struct" type');
        const fields = type.fields;
        const fieldNames = Object.keys(fields);
        const numFields = fieldNames.length;
        let numElements = 0;
        const ffi_type = new $b4265bcf4e6acf08$var$FFI_TYPE;
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
        const size = $6Wwqc.sizeof.pointer * (numElements + 1); // +1 because of the NULL terminator
        const elements = ffi_type.elements = Buffer.alloc(size);
        let index = 0;
        for(let i1 = 0; i1 < numFields; i1++){
            field = fields[fieldNames[i1]];
            if (field.type.fixedLength > 0) {
                // a fixed-length "ref-array" type
                ffi_type_ptr = $b4265bcf4e6acf08$var$Type(field.type.type);
                for(var j = 0; j < field.type.fixedLength; j++)elements.writePointer(ffi_type_ptr, (index++) * $6Wwqc.sizeof.pointer);
            } else {
                ffi_type_ptr = $b4265bcf4e6acf08$var$Type(field.type);
                elements.writePointer(ffi_type_ptr, (index++) * $6Wwqc.sizeof.pointer);
            }
        }
        // final NULL pointer to terminate the Array
        elements.writePointer($6Wwqc.NULL, index * $6Wwqc.sizeof.pointer);
        // also set the `ffi_type` property to that it's cached for next time
        ret = type.ffi_type = ffi_type.ref();
    }
    if (!ret && type.name) {
        // handle "ref" types other than the set that node-ffi is using (i.e.
        // a separate copy)
        if ("CString" == type.name) ret = type.ffi_type = $iQ7uV.FFI_TYPES.pointer;
        else {
            let cur = type;
            while(!ret && cur){
                ret = cur.ffi_type = $iQ7uV.FFI_TYPES[cur.name];
                cur = Object.getPrototypeOf(cur);
            }
        }
    }
    $kqsql$assert(ret, "Could not determine the `ffi_type` instance for type: " + (type.name || type));
    $b4265bcf4e6acf08$var$debug("returning `ffi_type`", ret.name);
    return ret;
}
module.exports = $b4265bcf4e6acf08$var$Type;

});
parcelRequire.register("iQ7uV", function(module, exports) {

var $db72e638f525d77d$var$__dirname1 = $kqsql$path.resolve(__dirname, "../node_modules/ffi-napi/lib");
"use strict";


var $6Wwqc = parcelRequire("6Wwqc");

$kqsql$assert($6Wwqc.instance);

const $db72e638f525d77d$var$bindings = $kqsql$nodegypbuild($kqsql$path.join($db72e638f525d77d$var$__dirname1, ".."));
module.exports = $db72e638f525d77d$var$bindings.initializeBindings($6Wwqc.instance);

});



parcelRequire.register("1Idgr", function(module, exports) {
"use strict";

var $fsVRQ = parcelRequire("fsVRQ");


const $13f4307a81002067$var$debug = (parcelRequire("7qyBb"))("ffi:cif_var");

var $6Wwqc = parcelRequire("6Wwqc");

var $iQ7uV = parcelRequire("iQ7uV");
const $13f4307a81002067$var$POINTER_SIZE = $6Wwqc.sizeof.pointer;
const $13f4307a81002067$var$ffi_prep_cif_var = $iQ7uV.ffi_prep_cif_var;
const $13f4307a81002067$var$FFI_CIF_SIZE = $iQ7uV.FFI_CIF_SIZE;
const $13f4307a81002067$var$FFI_DEFAULT_ABI = $iQ7uV.FFI_DEFAULT_ABI;
// status codes
const $13f4307a81002067$var$FFI_OK = $iQ7uV.FFI_OK;
const $13f4307a81002067$var$FFI_BAD_TYPEDEF = $iQ7uV.FFI_BAD_TYPEDEF;
const $13f4307a81002067$var$FFI_BAD_ABI = $iQ7uV.FFI_BAD_ABI;
/**
 * JS wrapper for the `ffi_prep_cif_var` function.
 * Returns a Buffer instance representing a variadic `ffi_cif *` instance.
 */ function $13f4307a81002067$var$CIF_var(rtype, types, numFixedArgs, abi) {
    $13f4307a81002067$var$debug("creating `ffi_cif *` instance with `ffi_prep_cif_var()`");
    // the return and arg types are expected to be coerced at this point...
    $kqsql$assert(!!rtype, 'expected a return "type" object as the first argument');
    $kqsql$assert(Array.isArray(types), 'expected an Array of arg "type" objects as the second argument');
    $kqsql$assert(numFixedArgs >= 1, "expected the number of fixed arguments to be at least 1");
    // the buffer that will contain the return `ffi_cif *` instance
    const cif = Buffer.alloc($13f4307a81002067$var$FFI_CIF_SIZE);
    const numTotalArgs = types.length;
    const _argtypesptr = Buffer.alloc(numTotalArgs * $13f4307a81002067$var$POINTER_SIZE);
    const _rtypeptr = $fsVRQ(rtype);
    for(let i = 0; i < numTotalArgs; i++){
        const ffiType = $fsVRQ(types[i]);
        _argtypesptr.writePointer(ffiType, i * $13f4307a81002067$var$POINTER_SIZE);
    }
    // prevent GC of the arg type and rtn type buffers (not sure if this is required)
    cif.rtnTypePtr = _rtypeptr;
    cif.argTypesPtr = _argtypesptr;
    if (typeof abi === "undefined") {
        $13f4307a81002067$var$debug("no ABI specified (this is OK), using FFI_DEFAULT_ABI");
        abi = $13f4307a81002067$var$FFI_DEFAULT_ABI;
    }
    const status = $13f4307a81002067$var$ffi_prep_cif_var(cif, numFixedArgs, numTotalArgs, _rtypeptr, _argtypesptr, abi);
    if (status !== $13f4307a81002067$var$FFI_OK) switch(status){
        case $13f4307a81002067$var$FFI_BAD_TYPEDEF:
            {
                const err = new Error("ffi_prep_cif_var() returned an FFI_BAD_TYPEDEF error");
                err.code = "FFI_BAD_TYPEDEF";
                err.errno = status;
                throw err;
            }
        case $13f4307a81002067$var$FFI_BAD_ABI:
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
module.exports = $13f4307a81002067$var$CIF_var;

});

parcelRequire.register("6EVbR", function(module, exports) {
"use strict";

var $6Wwqc = parcelRequire("6Wwqc");


var $iQ7uV = parcelRequire("iQ7uV");

var $dYUP3 = parcelRequire("dYUP3");

var $7FkiP = parcelRequire("7FkiP");

const $4d92d74846106115$var$debug = (parcelRequire("7qyBb"))("ffi:FunctionType");
/**
 * Module exports.
 */ module.exports = $4d92d74846106115$var$Function;
/**
 * Creates and returns a "type" object for a C "function pointer".
 *
 * @api public
 */ function $4d92d74846106115$var$Function(retType, argTypes, abi) {
    if (!(this instanceof $4d92d74846106115$var$Function)) return new $4d92d74846106115$var$Function(retType, argTypes, abi);
    $4d92d74846106115$var$debug("creating new FunctionType");
    // check args
    $kqsql$assert(!!retType, 'expected a return "type" object as the first argument');
    $kqsql$assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the second argument');
    // normalize the "types" (they could be strings, so turn into real type
    // instances)
    this.retType = $6Wwqc.coerceType(retType);
    this.argTypes = argTypes.map($6Wwqc.coerceType);
    this.abi = null == abi ? $iQ7uV.FFI_DEFAULT_ABI : abi;
}
/**
 * The "ffi_type" is set for node-ffi functions.
 */ $4d92d74846106115$var$Function.prototype.ffi_type = $iQ7uV.FFI_TYPES.pointer;
/**
 * The "size" is always pointer-sized.
 */ $4d92d74846106115$var$Function.prototype.size = $6Wwqc.sizeof.pointer;
/**
 * The "alignment" is always pointer-aligned.
 */ $4d92d74846106115$var$Function.prototype.alignment = $6Wwqc.alignof.pointer;
/**
 * The "indirection" is always 1 to ensure that our get()/set() get called.
 */ $4d92d74846106115$var$Function.prototype.indirection = 1;
/**
 * Returns a ffi.Callback pointer (Buffer) of this function type for the
 * given `fn` Function.
 */ $4d92d74846106115$var$Function.prototype.toPointer = function toPointer(fn) {
    return $dYUP3(this.retType, this.argTypes, this.abi, fn);
};
/**
 * Returns a ffi.ForeignFunction (Function) of this function type for the
 * given `buf` Buffer.
 */ $4d92d74846106115$var$Function.prototype.toFunction = function toFunction(buf) {
    return $7FkiP(buf, this.retType, this.argTypes, this.abi);
};
/**
 * get function; return a ForeignFunction instance.
 */ $4d92d74846106115$var$Function.prototype.get = function get(buffer, offset) {
    $4d92d74846106115$var$debug('ffi FunctionType "get" function');
    const ptr = buffer.readPointer(offset);
    return this.toFunction(ptr);
};
/**
 * set function; return a Callback buffer.
 */ $4d92d74846106115$var$Function.prototype.set = function set(buffer, offset, value) {
    $4d92d74846106115$var$debug('ffi FunctionType "set" function');
    let ptr;
    if ("function" == typeof value) ptr = this.toPointer(value);
    else if (Buffer.isBuffer(value)) ptr = value;
    else throw new Error("don't know how to set callback function for: " + value);
    buffer.writePointer(ptr, offset);
};

});
parcelRequire.register("dYUP3", function(module, exports) {
"use strict";

var $6Wwqc = parcelRequire("6Wwqc");

var $duUqO = parcelRequire("duUqO");


const $a2dcf4b952e92dc9$var$debug = (parcelRequire("7qyBb"))("ffi:Callback");

var $iQ7uV = parcelRequire("iQ7uV");
var $a2dcf4b952e92dc9$require$_Callback = $iQ7uV.Callback;
// Function used to report errors to the current process event loop,
// When user callback function gets gced.
function $a2dcf4b952e92dc9$var$errorReportCallback(err) {
    if (err) process.nextTick(function() {
        if (typeof err === "string") throw new Error(err);
        else throw err;
    });
}
/**
 * Turns a JavaScript function into a C function pointer.
 * The function pointer may be used in other C functions that
 * accept C callback functions.
 */ function $a2dcf4b952e92dc9$var$Callback(retType, argTypes, abi, func) {
    $a2dcf4b952e92dc9$var$debug("creating new Callback");
    if (typeof abi === "function") {
        func = abi;
        abi = undefined;
    }
    // check args
    $kqsql$assert(!!retType, 'expected a return "type" object as the first argument');
    $kqsql$assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the second argument');
    $kqsql$assert.equal(typeof func, "function", "expected a function as the third argument");
    // normalize the "types" (they could be strings, so turn into real type
    // instances)
    retType = $6Wwqc.coerceType(retType);
    argTypes = argTypes.map($6Wwqc.coerceType);
    // create the `ffi_cif *` instance
    const cif = $duUqO(retType, argTypes, abi);
    const argc = argTypes.length;
    const callback = $a2dcf4b952e92dc9$require$_Callback(cif, retType.size, argc, $a2dcf4b952e92dc9$var$errorReportCallback, (retval, params)=>{
        $a2dcf4b952e92dc9$var$debug("Callback function being invoked");
        try {
            const args = [];
            for(var i = 0; i < argc; i++){
                const type = argTypes[i];
                const argPtr = params.readPointer(i * $6Wwqc.sizeof.pointer, type.size);
                argPtr.type = type;
                args.push(argPtr.deref());
            }
            // Invoke the user-given function
            const result = func.apply(null, args);
            try {
                $6Wwqc.set(retval, 0, result, retType);
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
module.exports = $a2dcf4b952e92dc9$var$Callback;

});

parcelRequire.register("7FkiP", function(module, exports) {
"use strict";

var $duUqO = parcelRequire("duUqO");

var $d22xe = parcelRequire("d22xe");

const $594c1c6e6668d004$var$debug = (parcelRequire("7qyBb"))("ffi:ForeignFunction");


var $6Wwqc = parcelRequire("6Wwqc");
/**
 * Represents a foreign function in another library. Manages all of the aspects
 * of function execution, including marshalling the data parameters for the
 * function into native types and also unmarshalling the return from function
 * execution.
 */ function $594c1c6e6668d004$var$ForeignFunction(funcPtr, returnType, argTypes, abi) {
    $594c1c6e6668d004$var$debug("creating new ForeignFunction", funcPtr);
    // check args
    $kqsql$assert(Buffer.isBuffer(funcPtr), "expected Buffer as first argument");
    $kqsql$assert(!!returnType, 'expected a return "type" object as the second argument');
    $kqsql$assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the third argument');
    // normalize the "types" (they could be strings,
    // so turn into real type instances)
    returnType = $6Wwqc.coerceType(returnType);
    argTypes = argTypes.map($6Wwqc.coerceType);
    // create the `ffi_cif *` instance
    const cif = $duUqO(returnType, argTypes, abi);
    // create and return the JS proxy function
    return $d22xe(cif, funcPtr, returnType, argTypes);
}
module.exports = $594c1c6e6668d004$var$ForeignFunction;

});
parcelRequire.register("d22xe", function(module, exports) {
"use strict";


const $97cd6da3dc95392a$var$debug = (parcelRequire("7qyBb"))("ffi:_ForeignFunction");

var $6Wwqc = parcelRequire("6Wwqc");

var $iQ7uV = parcelRequire("iQ7uV");
const $97cd6da3dc95392a$var$POINTER_SIZE = $6Wwqc.sizeof.pointer;
const $97cd6da3dc95392a$var$FFI_ARG_SIZE = $iQ7uV.FFI_ARG_SIZE;
function $97cd6da3dc95392a$var$ForeignFunction(cif, funcPtr, returnType, argTypes) {
    $97cd6da3dc95392a$var$debug("creating new ForeignFunction", funcPtr);
    const numArgs = argTypes.length;
    const argsArraySize = numArgs * $97cd6da3dc95392a$var$POINTER_SIZE;
    // "result" must point to storage that is sizeof(long) or larger. For smaller
    // return value sizes, the ffi_arg or ffi_sarg integral type must be used to
    // hold the return value
    const resultSize = returnType.size >= $6Wwqc.sizeof.long ? returnType.size : $97cd6da3dc95392a$var$FFI_ARG_SIZE;
    $kqsql$assert(resultSize > 0);
    /**
   * This is the actual JS function that gets returned.
   * It handles marshalling input arguments into C values,
   * and unmarshalling the return value back into a JS value
   */ const proxy = function() {
        $97cd6da3dc95392a$var$debug("invoking proxy function");
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
                const valPtr = $6Wwqc.alloc(argType, val);
                argsList.writePointer(valPtr, i * $97cd6da3dc95392a$var$POINTER_SIZE);
            }
        } catch (e) {
            // counting arguments from 1 is more human readable
            i++;
            e.message = "error setting argument " + i + " - " + e.message;
            throw e;
        }
        // invoke the `ffi_call()` function
        $iQ7uV.ffi_call(cif, funcPtr, result, argsList);
        result.type = returnType;
        return result.deref();
    };
    /**
   * The asynchronous version of the proxy function.
   */ proxy.async = function() {
        $97cd6da3dc95392a$var$debug("invoking async proxy function");
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
                const valPtr = $6Wwqc.alloc(argType, val);
                argsList.writePointer(valPtr, i * $97cd6da3dc95392a$var$POINTER_SIZE);
            }
        } catch (e) {
            e.message = "error setting argument " + i + " - " + e.message;
            return process.nextTick(callback.bind(null, e));
        }
        // invoke the `ffi_call()` function asynchronously
        $iQ7uV.ffi_call_async(cif, funcPtr, result, argsList, function(err) {
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
module.exports = $97cd6da3dc95392a$var$ForeignFunction;

});



parcelRequire.register("hPxpY", function(module, exports) {
"use strict";

var $1Idgr = parcelRequire("1Idgr");

var $fsVRQ = parcelRequire("fsVRQ");

var $d22xe = parcelRequire("d22xe");


const $cfb11f37012c71e4$var$debug = (parcelRequire("7qyBb"))("ffi:VariadicForeignFunction");

var $6Wwqc = parcelRequire("6Wwqc");

var $iQ7uV = parcelRequire("iQ7uV");
const $cfb11f37012c71e4$var$POINTER_SIZE = $6Wwqc.sizeof.pointer;
const $cfb11f37012c71e4$var$FFI_ARG_SIZE = $iQ7uV.FFI_ARG_SIZE;
/**
 * For when you want to call to a C function with variable amount of arguments.
 * i.e. `printf()`.
 *
 * This function takes care of caching and reusing ForeignFunction instances that
 * contain the same ffi_type argument signature.
 */ function $cfb11f37012c71e4$var$VariadicForeignFunction(funcPtr, returnType, fixedArgTypes, abi) {
    $cfb11f37012c71e4$var$debug("creating new VariadicForeignFunction", funcPtr);
    // the cache of ForeignFunction instances that this
    // VariadicForeignFunction has created so far
    const cache = {};
    // check args
    $kqsql$assert(Buffer.isBuffer(funcPtr), "expected Buffer as first argument");
    $kqsql$assert(!!returnType, 'expected a return "type" object as the second argument');
    $kqsql$assert(Array.isArray(fixedArgTypes), 'expected Array of arg "type" objects as the third argument');
    const numFixedArgs = fixedArgTypes.length;
    // normalize the "types" (they could be strings,
    // so turn into real type instances)
    fixedArgTypes = fixedArgTypes.map($6Wwqc.coerceType);
    // get the names of the fixed arg types
    const fixedKey = fixedArgTypes.map(function(type) {
        return $cfb11f37012c71e4$var$getId(type);
    });
    // what gets returned is another function that needs to be invoked with the rest
    // of the variadic types that are being invoked from the function.
    function variadic_function_generator() {
        $cfb11f37012c71e4$var$debug("variadic_function_generator invoked");
        // first get the types of variadic args we are working with
        const argTypes = fixedArgTypes.slice();
        let key = fixedKey.slice();
        for(let i = 0; i < arguments.length; i++){
            const type = $6Wwqc.coerceType(arguments[i]);
            argTypes.push(type);
            const ffi_type = $fsVRQ(type);
            $kqsql$assert(ffi_type.name);
            key.push($cfb11f37012c71e4$var$getId(type));
        }
        // now figure out the return type
        const rtnType = $6Wwqc.coerceType(variadic_function_generator.returnType);
        const rtnName = $cfb11f37012c71e4$var$getId(rtnType);
        $kqsql$assert(rtnName);
        // first let's generate the key and see if we got a cache-hit
        key = rtnName + key.join("");
        let func = cache[key];
        if (func) $cfb11f37012c71e4$var$debug("cache hit for key:", key);
        else {
            // create the `ffi_cif *` instance
            $cfb11f37012c71e4$var$debug("creating the variadic ffi_cif instance for key:", key);
            const cif = $1Idgr(returnType, argTypes, numFixedArgs, abi);
            func = cache[key] = $d22xe(cif, funcPtr, rtnType, argTypes);
        }
        return func;
    }
    // set the return type. we set it as a property of the function generator to
    // allow for monkey patching the return value in the very rare case where the
    // return type is variadic as well
    variadic_function_generator.returnType = returnType;
    return variadic_function_generator;
}
module.exports = $cfb11f37012c71e4$var$VariadicForeignFunction;
const $cfb11f37012c71e4$var$idKey = "_ffiId";
let $cfb11f37012c71e4$var$counter = 0;
function $cfb11f37012c71e4$var$getId(type) {
    if (!type.hasOwnProperty($cfb11f37012c71e4$var$idKey)) type[$cfb11f37012c71e4$var$idKey] = (($cfb11f37012c71e4$var$counter++) * 0x10000 | 0).toString(16);
    return type[$cfb11f37012c71e4$var$idKey];
}

});

parcelRequire.register("bH2hy", function(module, exports) {
"use strict";

var $7FkiP = parcelRequire("7FkiP");


const $88357b11b575cad0$var$debug = (parcelRequire("7qyBb"))("ffi:DynamicLibrary");

var $iQ7uV = parcelRequire("iQ7uV");
const $88357b11b575cad0$var$funcs = $iQ7uV.StaticFunctions;

var $6Wwqc = parcelRequire("6Wwqc");

var $88357b11b575cad0$require$read = $kqsql$fs.readFileSync;
// typedefs
const $88357b11b575cad0$var$int = $6Wwqc.types.int;
const $88357b11b575cad0$var$voidPtr = $6Wwqc.refType($6Wwqc.types.void);
const $88357b11b575cad0$var$dlopen = $7FkiP($88357b11b575cad0$var$funcs.dlopen, $88357b11b575cad0$var$voidPtr, [
    "string",
    $88357b11b575cad0$var$int
]);
const $88357b11b575cad0$var$dlclose = $7FkiP($88357b11b575cad0$var$funcs.dlclose, $88357b11b575cad0$var$int, [
    $88357b11b575cad0$var$voidPtr
]);
const $88357b11b575cad0$var$dlsym = $7FkiP($88357b11b575cad0$var$funcs.dlsym, $88357b11b575cad0$var$voidPtr, [
    $88357b11b575cad0$var$voidPtr,
    "string"
]);
const $88357b11b575cad0$var$dlerror = $7FkiP($88357b11b575cad0$var$funcs.dlerror, "string", []);
/**
 * `DynamicLibrary` loads and fetches function pointers for dynamic libraries
 * (.so, .dylib, etc). After the libray's function pointer is acquired, then you
 * call `get(symbol)` to retreive a pointer to an exported symbol. You need to
 * call `get___()` on the pointer to dereference it into its actual value, or
 * turn the pointer into a callable function with `ForeignFunction`.
 */ function $88357b11b575cad0$var$DynamicLibrary(path, mode) {
    if (!(this instanceof $88357b11b575cad0$var$DynamicLibrary)) return new $88357b11b575cad0$var$DynamicLibrary(path, mode);
    $88357b11b575cad0$var$debug("new DynamicLibrary()", path, mode);
    if (null == mode) mode = $88357b11b575cad0$var$DynamicLibrary.FLAGS.RTLD_LAZY;
    this._path = path;
    this._handle = $88357b11b575cad0$var$dlopen(path, mode);
    $kqsql$assert(Buffer.isBuffer(this._handle), "expected a Buffer instance to be returned from `dlopen()`");
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
            const content = $88357b11b575cad0$require$read(match[1], "ascii");
            // try to find a GROUP ( ... ) command
            if (match = content.match(/GROUP *\( *(([^ )])+)/)) return $88357b11b575cad0$var$DynamicLibrary.call(this, match[1], mode);
        }
        throw new Error("Dynamic Linking Error: " + err);
    }
}
module.exports = $88357b11b575cad0$var$DynamicLibrary;
/**
 * Set the exported flags from "dlfcn.h"
 */ $88357b11b575cad0$var$DynamicLibrary.FLAGS = {};
Object.keys($iQ7uV).forEach(function(k) {
    if (!/^RTLD_/.test(k)) return;
    const desc = Object.getOwnPropertyDescriptor($iQ7uV, k);
    Object.defineProperty($88357b11b575cad0$var$DynamicLibrary.FLAGS, k, desc);
});
/**
 * Close this library, returns the result of the dlclose() system function.
 */ $88357b11b575cad0$var$DynamicLibrary.prototype.close = function() {
    $88357b11b575cad0$var$debug("dlclose()");
    return $88357b11b575cad0$var$dlclose(this._handle);
};
/**
 * Get a symbol from this library, returns a Pointer for (memory address of) the symbol
 */ $88357b11b575cad0$var$DynamicLibrary.prototype.get = function(symbol) {
    $88357b11b575cad0$var$debug("dlsym()", symbol);
    $kqsql$assert.strictEqual("string", typeof symbol);
    const ptr = $88357b11b575cad0$var$dlsym(this._handle, symbol);
    $kqsql$assert(Buffer.isBuffer(ptr));
    if (ptr.isNull()) throw new Error("Dynamic Symbol Retrieval Error: " + this.error());
    ptr.name = symbol;
    return ptr;
};
/**
 * Returns the result of the dlerror() system function
 */ $88357b11b575cad0$var$DynamicLibrary.prototype.error = function error() {
    $88357b11b575cad0$var$debug("dlerror()");
    return $88357b11b575cad0$var$dlerror();
};
/**
 * Returns the path originally passed to the constructor
 */ $88357b11b575cad0$var$DynamicLibrary.prototype.path = function error() {
    return this._path;
};

});

parcelRequire.register("bn2Ca", function(module, exports) {
"use strict";

var $bH2hy = parcelRequire("bH2hy");

var $7FkiP = parcelRequire("7FkiP");

var $hPxpY = parcelRequire("hPxpY");

const $8473dee61fe34b2a$var$debug = (parcelRequire("7qyBb"))("ffi:Library");
const $8473dee61fe34b2a$var$RTLD_NOW = $bH2hy.FLAGS.RTLD_NOW;
/**
 * The extension to use on libraries.
 * i.e.  libm  ->  libm.so   on linux
 */ const $8473dee61fe34b2a$var$EXT = $8473dee61fe34b2a$var$Library.EXT = ({
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
 */ function $8473dee61fe34b2a$var$Library(libfile, funcs, lib) {
    $8473dee61fe34b2a$var$debug("creating Library object for", libfile);
    if (libfile && typeof libfile === "string" && libfile.indexOf($8473dee61fe34b2a$var$EXT) === -1) {
        $8473dee61fe34b2a$var$debug("appending library extension to library name", $8473dee61fe34b2a$var$EXT);
        libfile += $8473dee61fe34b2a$var$EXT;
    }
    if (!lib) lib = {};
    let dl;
    if (typeof libfile === "string" || !libfile) dl = new $bH2hy(libfile || null, $8473dee61fe34b2a$var$RTLD_NOW);
    else dl = libfile;
    Object.keys(funcs || {}).forEach(function(func) {
        $8473dee61fe34b2a$var$debug("defining function", func);
        const fptr = dl.get(func);
        const info = funcs[func];
        if (fptr.isNull()) throw new Error('Library: "' + dl.path() + '" returned NULL function pointer for "' + func + '"');
        const resultType = info[0];
        const paramTypes = info[1];
        const fopts = info[2];
        const abi = fopts && fopts.abi;
        const async = fopts && fopts.async;
        const varargs = fopts && fopts.varargs;
        if (varargs) lib[func] = $hPxpY(fptr, resultType, paramTypes, abi);
        else {
            const ff = $7FkiP(fptr, resultType, paramTypes, abi);
            lib[func] = async ? ff.async : ff;
        }
    });
    return lib;
}
module.exports = $8473dee61fe34b2a$var$Library;

});

parcelRequire.register("hqh5F", function(module, exports) {
"use strict";

var $bH2hy = parcelRequire("bH2hy");

var $7FkiP = parcelRequire("7FkiP");

var $iQ7uV = parcelRequire("iQ7uV");
const $caf21f31e6b85cf5$var$funcs = $iQ7uV.StaticFunctions;

var $6Wwqc = parcelRequire("6Wwqc");
const $caf21f31e6b85cf5$var$int = $6Wwqc.types.int;
const $caf21f31e6b85cf5$var$intPtr = $6Wwqc.refType($caf21f31e6b85cf5$var$int);
let $caf21f31e6b85cf5$var$errno = null;
if (process.platform == "win32") {
    const _errno = $bH2hy("msvcrt.dll").get("_errno");
    const errnoPtr = $7FkiP(_errno, $caf21f31e6b85cf5$var$intPtr, []);
    $caf21f31e6b85cf5$var$errno = function() {
        return errnoPtr().deref();
    };
} else $caf21f31e6b85cf5$var$errno = $7FkiP($caf21f31e6b85cf5$var$funcs._errno, "int", []);
module.exports = $caf21f31e6b85cf5$var$errno;

});


var $hjPBq = parcelRequire("hjPBq");
var $5915d23a920e90bc$exports = {};
"use strict";

var $6Wwqc = parcelRequire("6Wwqc");


const $5915d23a920e90bc$var$debug = (parcelRequire("7qyBb"))("ffi:ffi");

const $5915d23a920e90bc$var$Struct = (parcelRequire("hjPBq"))($6Wwqc);

var $iQ7uV = parcelRequire("iQ7uV");
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
    if (!$iQ7uV.hasOwnProperty(prop)) return $5915d23a920e90bc$var$debug("skipping exporting of non-existant property", prop);
    const desc = Object.getOwnPropertyDescriptor($iQ7uV, prop);
    Object.defineProperty($5915d23a920e90bc$exports, prop, desc);
});
/**
 * Set the `ffi_type` property on the built-in types.
 */ Object.keys($iQ7uV.FFI_TYPES).forEach((name)=>{
    const type = $iQ7uV.FFI_TYPES[name];
    type.name = name;
    if (name === "pointer") return; // there is no "pointer" type...
    $6Wwqc.types[name].ffi_type = type;
});
// make `size_t` use the "ffi_type_pointer"
$6Wwqc.types.size_t.ffi_type = $iQ7uV.FFI_TYPES.pointer;
// make `Utf8String` use "ffi_type_pointer"
const $5915d23a920e90bc$var$CString = $6Wwqc.types.CString || $6Wwqc.types.Utf8String;
$5915d23a920e90bc$var$CString.ffi_type = $iQ7uV.FFI_TYPES.pointer;
// make `Object` use the "ffi_type_pointer"
$6Wwqc.types.Object.ffi_type = $iQ7uV.FFI_TYPES.pointer;
// libffi is weird when it comes to long data types (defaults to 64-bit),
// so we emulate here, since some platforms have 32-bit longs and some
// platforms have 64-bit longs.
switch($6Wwqc.sizeof.long){
    case 4:
        $6Wwqc.types.ulong.ffi_type = $iQ7uV.FFI_TYPES.uint32;
        $6Wwqc.types.long.ffi_type = $iQ7uV.FFI_TYPES.int32;
        break;
    case 8:
        $6Wwqc.types.ulong.ffi_type = $iQ7uV.FFI_TYPES.uint64;
        $6Wwqc.types.long.ffi_type = $iQ7uV.FFI_TYPES.int64;
        break;
    default:
        throw new Error('unsupported "long" size: ' + $6Wwqc.sizeof.long);
}
/**
 * Alias the "ref" types onto ffi's exports, for convenience...
 */ $5915d23a920e90bc$exports.types = $6Wwqc.types;
// Include our other modules
$5915d23a920e90bc$exports.version = $iQ7uV.version;

$5915d23a920e90bc$exports.CIF = (parcelRequire("duUqO"));

$5915d23a920e90bc$exports.CIF_var = (parcelRequire("1Idgr"));

$5915d23a920e90bc$exports.Function = (parcelRequire("6EVbR"));

$5915d23a920e90bc$exports.ForeignFunction = (parcelRequire("7FkiP"));

$5915d23a920e90bc$exports.VariadicForeignFunction = (parcelRequire("hPxpY"));

$5915d23a920e90bc$exports.DynamicLibrary = (parcelRequire("bH2hy"));

$5915d23a920e90bc$exports.Library = (parcelRequire("bn2Ca"));

$5915d23a920e90bc$exports.Callback = (parcelRequire("dYUP3"));

$5915d23a920e90bc$exports.errno = (parcelRequire("hqh5F"));

$5915d23a920e90bc$exports.ffiType = (parcelRequire("fsVRQ"));
// the shared library extension for this platform
$5915d23a920e90bc$exports.LIB_EXT = $5915d23a920e90bc$exports.Library.EXT;
// the FFI_TYPE struct definition
$5915d23a920e90bc$exports.FFI_TYPE = $5915d23a920e90bc$exports.ffiType.FFI_TYPE;



var $6Wwqc = parcelRequire("6Wwqc");
const $d5993085ececeae5$export$4bbcbb9e6d314d55 = "_WIN64_HOLDER_";
const $d5993085ececeae5$export$609085a058d4a4d0 = "_UNICODE_HOLDER_";
const $d5993085ececeae5$export$527cfc1519820a40 = new Set([
    "macroMap"
]);
const $d5993085ececeae5$export$def1b823ebd5706b = process.arch === "x64";
const $d5993085ececeae5$export$cba91b4ce33b8ea = true;
const $d5993085ececeae5$export$f6b5b44fcd8003ee = {
    singleton: true,
    _UNICODE: $d5993085ececeae5$export$cba91b4ce33b8ea,
    _WIN64: $d5993085ececeae5$export$def1b823ebd5706b
};
const $d5993085ececeae5$export$65a4230322ab1784 = new Set([
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


var $b777eb4fe1476df5$exports = {};

$parcel$export($b777eb4fe1476df5$exports, "ALTTABINFO", () => $b777eb4fe1476df5$export$ad48b1b2cfc75809);
$parcel$export($b777eb4fe1476df5$exports, "COPYDATASTRUCT", () => $b777eb4fe1476df5$export$235a24185e6c03f3);
$parcel$export($b777eb4fe1476df5$exports, "HARDWAREINPUT", () => $b777eb4fe1476df5$export$c747a8b76ce2fc55);
$parcel$export($b777eb4fe1476df5$exports, "INITCOMMONCONTROLSEX", () => $b777eb4fe1476df5$export$6eb78d635a3ee587);
$parcel$export($b777eb4fe1476df5$exports, "KEYBDINPUT", () => $b777eb4fe1476df5$export$9d77698e6144d105);
$parcel$export($b777eb4fe1476df5$exports, "MOUSEINPUT", () => $b777eb4fe1476df5$export$b25d5f19497424fa);
$parcel$export($b777eb4fe1476df5$exports, "MSG", () => $b777eb4fe1476df5$export$f99154f7a7b0135d);
$parcel$export($b777eb4fe1476df5$exports, "POINT", () => $b777eb4fe1476df5$export$a80a24d37f0f1279);
$parcel$export($b777eb4fe1476df5$exports, "PROCESS_BASIC_INFORMATION", () => $b777eb4fe1476df5$export$ca65a5b05e68b7ff);
$parcel$export($b777eb4fe1476df5$exports, "UNICODE_STRING", () => $b777eb4fe1476df5$export$5dcce0e722389cdb);
$parcel$export($b777eb4fe1476df5$exports, "RAWHID", () => $b777eb4fe1476df5$export$109b0986e0806ee);
$parcel$export($b777eb4fe1476df5$exports, "RAWINPUTDEVICELIST", () => $b777eb4fe1476df5$export$cf7f2abb0ac9e892);
$parcel$export($b777eb4fe1476df5$exports, "RAWINPUTHEADER", () => $b777eb4fe1476df5$export$614c933f340ce1c1);
$parcel$export($b777eb4fe1476df5$exports, "RAWKEYBOARD", () => $b777eb4fe1476df5$export$7f9753d8aef93f40);
$parcel$export($b777eb4fe1476df5$exports, "WINDOWINFO", () => $b777eb4fe1476df5$export$5119761222d7d0f6);
$parcel$export($b777eb4fe1476df5$exports, "WNDCLASSEX", () => $b777eb4fe1476df5$export$81ef613fbd3a628d);
$parcel$export($b777eb4fe1476df5$exports, "RECT", () => $b777eb4fe1476df5$export$1e530543ba1d4b12);
$parcel$export($b777eb4fe1476df5$exports, "_RECT", () => $b777eb4fe1476df5$export$1e530543ba1d4b12);
$parcel$export($b777eb4fe1476df5$exports, "FILETIME", () => $b777eb4fe1476df5$export$258339e884eb70b7);

function $c36af01355c6f92a$export$828a2cfb74eb348c(windefObj, macroMap, settings) {
    const ww = $c36af01355c6f92a$var$clone_filter_windef(windefObj); // output without macroMap
    const macroSrc = $c36af01355c6f92a$var$prepare_macro(macroMap, settings);
    const ret = $c36af01355c6f92a$var$prepare_windef_ref(ww, macroSrc);
    $c36af01355c6f92a$export$6b50c41cc4aa2277(ret, (0, $d5993085ececeae5$export$65a4230322ab1784));
    return ret;
}
/**
 * convert typeof array of param to string
 * such like ['_WIN64_HOLDER_', 'int64', 'int32'], no changed returning when string
 */ function $c36af01355c6f92a$var$parse_param_placeholder(param, settings) {
    if (typeof param === "string") return param;
    else if (!param) throw new Error("parse_param_placeholder(ps, settings) value of ps invalid");
    else if (!Array.isArray(param) || param.length !== 3) throw new Error("parse_param_placeholder(ps, settings) value of ps must Array and has THREE elements");
    const st = $c36af01355c6f92a$var$parse_settings(settings);
    let ps = "";
    switch(param[0]){
        case 0, $d5993085ececeae5$export$4bbcbb9e6d314d55:
            ps = $c36af01355c6f92a$var$parse_placeholder_arch(param, st._WIN64);
            break;
        case 0, $d5993085ececeae5$export$609085a058d4a4d0:
            ps = $c36af01355c6f92a$var$parse_placeholder_unicode(param, st._UNICODE);
            break;
        default:
            throw new Error("the value of param placeholder invlaid:" + param[0]);
    }
    return ps;
}
// convert param like ['_WIN64_HOLDER_', 'int64', 'int32] to 'int64' or 'int32'
function $c36af01355c6f92a$var$parse_placeholder_arch(param, _WIN64) {
    if (typeof param === "string") return param;
    else if (!param || param.length !== 3) throw new Error("_WIN64 macro should be Array and has 3 items");
    return _WIN64 ? param[1] : param[2];
}
// convert param like ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
function $c36af01355c6f92a$var$parse_placeholder_unicode(param, _UNICODE) {
    if (typeof param === "string") return param;
    else if (!param || param.length !== 3) throw new Error("_UNICODE macro should be Array and has 3 items");
    return _UNICODE ? param[1] : param[2];
}
/**
 * parse ['_WIN64_HOLDER', 'int64*', 'int32*'] to 'int64*' or 'int32'
 * or ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
 */ function $c36af01355c6f92a$var$prepare_macro(macroMap, settings) {
    const ret = new Map();
    // v string|array
    for (const [k, v] of macroMap.entries())ret.set(k, $c36af01355c6f92a$var$parse_param_placeholder(v, settings));
    return ret;
}
/**
 * parse const HANDLE = 'PVOID' to the realy FFIParam (like 'uint32*')
 * macroMap <['PVOID', 'uint32*'], ...>
 */ function $c36af01355c6f92a$var$prepare_windef_ref(ww, macroSrc) {
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
            if ((0, $d5993085ececeae5$export$65a4230322ab1784).has(v1)) map.set(k1, v1);
            else {
                const value = $c36af01355c6f92a$export$653d6aa060f2e229(v1, ww, macroSrc);
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
function $c36af01355c6f92a$var$clone_filter_windef(windef) {
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
function $c36af01355c6f92a$var$parse_settings(settings) {
    const st = {
        ...(0, $d5993085ececeae5$export$f6b5b44fcd8003ee)
    };
    if (typeof settings !== "undefined" && Object.keys(settings).length) Object.assign(st, settings);
    return st;
}
function $c36af01355c6f92a$export$653d6aa060f2e229(key, ww, macroSrc) {
    let ret = $c36af01355c6f92a$var$_lookupRef(key, ww, macroSrc);
    if (!ret) return "";
    for(let i = 0, len = 3; i < len; i += 1){
        const tmp = $c36af01355c6f92a$var$_lookupRef(ret, ww, macroSrc);
        if (tmp) ret = tmp;
        else break;
    }
    return ret;
}
function $c36af01355c6f92a$var$_lookupRef(key, ww, macroSrc) {
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
function $c36af01355c6f92a$export$f6e45c3615c9e25a(key, srcSet) {
    return !!srcSet.has(key);
}
function $c36af01355c6f92a$export$6b50c41cc4aa2277(windef, srcSet) {
    for (const [k, v] of Object.entries(windef)){
        if (!k || !v) throw new Error(`validateWinData() k or v empty: "${k}"/"${v}"`);
        if (typeof v !== "string") throw new Error(`validateWinData() v not typeof string: "${k}"/"N/A"`);
        if (!$c36af01355c6f92a$export$f6e45c3615c9e25a(v, srcSet)) throw new Error(`validateWinData() value is invalid ffi param value: "${k}"/"${v}", may extra space`);
    }
}



var $9cfcd1ed570fea60$exports = {};

$parcel$export($9cfcd1ed570fea60$exports, "ATOM", () => $9cfcd1ed570fea60$export$a78dc2c4cbd70341);
$parcel$export($9cfcd1ed570fea60$exports, "DWORD", () => $9cfcd1ed570fea60$export$181c9ad1752440f7);
$parcel$export($9cfcd1ed570fea60$exports, "PVOID", () => $9cfcd1ed570fea60$export$9cb553b951e1e0d8);
$parcel$export($9cfcd1ed570fea60$exports, "HANDLE", () => $9cfcd1ed570fea60$export$1f4a129e1195d18a);
$parcel$export($9cfcd1ed570fea60$exports, "HANDLE_PVOID", () => $9cfcd1ed570fea60$export$bd8b6af04676495);
$parcel$export($9cfcd1ed570fea60$exports, "LONG_PTR", () => $9cfcd1ed570fea60$export$f60fc96aa99c605e);
$parcel$export($9cfcd1ed570fea60$exports, "ULONG_PTR", () => $9cfcd1ed570fea60$export$2e482cd8c991e558);
$parcel$export($9cfcd1ed570fea60$exports, "VOID", () => $9cfcd1ed570fea60$export$1cd1943b3a73bbe8);
$parcel$export($9cfcd1ed570fea60$exports, "WCHAR", () => $9cfcd1ed570fea60$export$d71e2b267f5b711b);
$parcel$export($9cfcd1ed570fea60$exports, "WORD", () => $9cfcd1ed570fea60$export$f3a79cf462faa1e3);
$parcel$export($9cfcd1ed570fea60$exports, "BOOL", () => $9cfcd1ed570fea60$export$c35dd5647862f990);
$parcel$export($9cfcd1ed570fea60$exports, "BOOLEAN", () => $9cfcd1ed570fea60$export$428cfe48a69a3b4f);
$parcel$export($9cfcd1ed570fea60$exports, "BYTE", () => $9cfcd1ed570fea60$export$8f4bf8f7eb581284);
$parcel$export($9cfcd1ed570fea60$exports, "CALLBACK", () => $9cfcd1ed570fea60$export$578a4c3d73a6d794);
$parcel$export($9cfcd1ed570fea60$exports, "CCHAR", () => $9cfcd1ed570fea60$export$934996f637259e88);
$parcel$export($9cfcd1ed570fea60$exports, "CHAR", () => $9cfcd1ed570fea60$export$9e88d7b6f62f62d8);
$parcel$export($9cfcd1ed570fea60$exports, "COLORREF", () => $9cfcd1ed570fea60$export$52da70d84f582c04);
$parcel$export($9cfcd1ed570fea60$exports, "DWORDLONG", () => $9cfcd1ed570fea60$export$6b766bfdcf67e2ec);
$parcel$export($9cfcd1ed570fea60$exports, "DWORD_PTR", () => $9cfcd1ed570fea60$export$8f7b8c11edcb3e34);
$parcel$export($9cfcd1ed570fea60$exports, "DWORD32", () => $9cfcd1ed570fea60$export$a8ea5b58ae88fc11);
$parcel$export($9cfcd1ed570fea60$exports, "DWORD64", () => $9cfcd1ed570fea60$export$8db31e1b1c7e0db0);
$parcel$export($9cfcd1ed570fea60$exports, "FLOAT", () => $9cfcd1ed570fea60$export$d2b086fd1e01e03a);
$parcel$export($9cfcd1ed570fea60$exports, "HACCEL", () => $9cfcd1ed570fea60$export$1505c2c04cc3bbef);
$parcel$export($9cfcd1ed570fea60$exports, "HALF_PTR", () => $9cfcd1ed570fea60$export$2d081f52dd94061a);
$parcel$export($9cfcd1ed570fea60$exports, "HBITMAP", () => $9cfcd1ed570fea60$export$49cd303f01f67350);
$parcel$export($9cfcd1ed570fea60$exports, "HBRUSH", () => $9cfcd1ed570fea60$export$d17b38c787d37ab8);
$parcel$export($9cfcd1ed570fea60$exports, "HCOLORSPACE", () => $9cfcd1ed570fea60$export$56c7641f121a2c5c);
$parcel$export($9cfcd1ed570fea60$exports, "HCONV", () => $9cfcd1ed570fea60$export$762b8b6ee0ff4c44);
$parcel$export($9cfcd1ed570fea60$exports, "HCONVLIST", () => $9cfcd1ed570fea60$export$750eee7b2f0ee030);
$parcel$export($9cfcd1ed570fea60$exports, "HCURSOR", () => $9cfcd1ed570fea60$export$a02796fdca6d354a);
$parcel$export($9cfcd1ed570fea60$exports, "HDC", () => $9cfcd1ed570fea60$export$1a62f6d54b236e36);
$parcel$export($9cfcd1ed570fea60$exports, "HDDEDATA", () => $9cfcd1ed570fea60$export$4ddde23cd7155d44);
$parcel$export($9cfcd1ed570fea60$exports, "HDESK", () => $9cfcd1ed570fea60$export$1d0ad5eb60ffc518);
$parcel$export($9cfcd1ed570fea60$exports, "HDROP", () => $9cfcd1ed570fea60$export$726c5c347609dae3);
$parcel$export($9cfcd1ed570fea60$exports, "HDWP", () => $9cfcd1ed570fea60$export$323f06abdd2a59da);
$parcel$export($9cfcd1ed570fea60$exports, "HENHMETAFILE", () => $9cfcd1ed570fea60$export$a43730eb8bf8b76e);
$parcel$export($9cfcd1ed570fea60$exports, "HFILE", () => $9cfcd1ed570fea60$export$91f6f659ef3d1edd);
$parcel$export($9cfcd1ed570fea60$exports, "HFONT", () => $9cfcd1ed570fea60$export$229672d8f6dd9e1a);
$parcel$export($9cfcd1ed570fea60$exports, "HGDIOBJ", () => $9cfcd1ed570fea60$export$ef0ae13fba225584);
$parcel$export($9cfcd1ed570fea60$exports, "HGLOBAL", () => $9cfcd1ed570fea60$export$6b52c27577dfb85e);
$parcel$export($9cfcd1ed570fea60$exports, "HHOOK", () => $9cfcd1ed570fea60$export$a681c4a7983815bf);
$parcel$export($9cfcd1ed570fea60$exports, "HICON", () => $9cfcd1ed570fea60$export$105fd39584a4c170);
$parcel$export($9cfcd1ed570fea60$exports, "HINSTANCE", () => $9cfcd1ed570fea60$export$1a50b4f53ac33a);
$parcel$export($9cfcd1ed570fea60$exports, "HKEY", () => $9cfcd1ed570fea60$export$80d8783aa08e677d);
$parcel$export($9cfcd1ed570fea60$exports, "HKL", () => $9cfcd1ed570fea60$export$9252a4926414af53);
$parcel$export($9cfcd1ed570fea60$exports, "HLOCAL", () => $9cfcd1ed570fea60$export$941fbb37db50e0ee);
$parcel$export($9cfcd1ed570fea60$exports, "HMENU", () => $9cfcd1ed570fea60$export$5570ee796bf8668a);
$parcel$export($9cfcd1ed570fea60$exports, "HMETAFILE", () => $9cfcd1ed570fea60$export$32e1d6dd1d786a08);
$parcel$export($9cfcd1ed570fea60$exports, "HMODULE", () => $9cfcd1ed570fea60$export$82cb6941373786ac);
$parcel$export($9cfcd1ed570fea60$exports, "HMONITOR", () => $9cfcd1ed570fea60$export$d76bcd896c4c1f0b);
$parcel$export($9cfcd1ed570fea60$exports, "HPALETTE", () => $9cfcd1ed570fea60$export$c984542fbcd9e311);
$parcel$export($9cfcd1ed570fea60$exports, "HPEN", () => $9cfcd1ed570fea60$export$e8c398641ae921a0);
$parcel$export($9cfcd1ed570fea60$exports, "HRESULT", () => $9cfcd1ed570fea60$export$2109f3ca8e001dc3);
$parcel$export($9cfcd1ed570fea60$exports, "HRGN", () => $9cfcd1ed570fea60$export$64129906a6b15c89);
$parcel$export($9cfcd1ed570fea60$exports, "HRSRC", () => $9cfcd1ed570fea60$export$d0b96b23ab9f5338);
$parcel$export($9cfcd1ed570fea60$exports, "HSZ", () => $9cfcd1ed570fea60$export$c50eccdd15c9fd55);
$parcel$export($9cfcd1ed570fea60$exports, "HWINEVENTHOOK", () => $9cfcd1ed570fea60$export$60bcb2927641b3f4);
$parcel$export($9cfcd1ed570fea60$exports, "HWINSTA", () => $9cfcd1ed570fea60$export$893fa35bdef36b);
$parcel$export($9cfcd1ed570fea60$exports, "HWND", () => $9cfcd1ed570fea60$export$6525812590d9a476);
$parcel$export($9cfcd1ed570fea60$exports, "INT", () => $9cfcd1ed570fea60$export$160e8bdd97bfce3a);
$parcel$export($9cfcd1ed570fea60$exports, "INT_PTR", () => $9cfcd1ed570fea60$export$f051d14373139dee);
$parcel$export($9cfcd1ed570fea60$exports, "INT8", () => $9cfcd1ed570fea60$export$9922471c07c2891d);
$parcel$export($9cfcd1ed570fea60$exports, "INT16", () => $9cfcd1ed570fea60$export$bd9b91838fde002e);
$parcel$export($9cfcd1ed570fea60$exports, "INT32", () => $9cfcd1ed570fea60$export$34412edc7b36f85);
$parcel$export($9cfcd1ed570fea60$exports, "INT64", () => $9cfcd1ed570fea60$export$a2c63c68aeee9e2d);
$parcel$export($9cfcd1ed570fea60$exports, "LANGID", () => $9cfcd1ed570fea60$export$6190ebba87077b9d);
$parcel$export($9cfcd1ed570fea60$exports, "LCID", () => $9cfcd1ed570fea60$export$b36cf4a83245c2f9);
$parcel$export($9cfcd1ed570fea60$exports, "LCTYPE", () => $9cfcd1ed570fea60$export$244c0463aedba74c);
$parcel$export($9cfcd1ed570fea60$exports, "LGRPID", () => $9cfcd1ed570fea60$export$202821be4d3b65c7);
$parcel$export($9cfcd1ed570fea60$exports, "LONG", () => $9cfcd1ed570fea60$export$686cfa64f218be7a);
$parcel$export($9cfcd1ed570fea60$exports, "LONGLONG", () => $9cfcd1ed570fea60$export$2d2033f38dde21c);
$parcel$export($9cfcd1ed570fea60$exports, "LONG32", () => $9cfcd1ed570fea60$export$4c9cb8eafd43015e);
$parcel$export($9cfcd1ed570fea60$exports, "LONG64", () => $9cfcd1ed570fea60$export$552dea698acd6cd2);
$parcel$export($9cfcd1ed570fea60$exports, "LPARAM", () => $9cfcd1ed570fea60$export$13371aace3d44948);
$parcel$export($9cfcd1ed570fea60$exports, "LPBOOL", () => $9cfcd1ed570fea60$export$5df7e4acce683059);
$parcel$export($9cfcd1ed570fea60$exports, "LPBYTE", () => $9cfcd1ed570fea60$export$1061811df8b0c9be);
$parcel$export($9cfcd1ed570fea60$exports, "LPCOLORREF", () => $9cfcd1ed570fea60$export$f1d7ba3e4d51498c);
$parcel$export($9cfcd1ed570fea60$exports, "LPCSTR", () => $9cfcd1ed570fea60$export$18e7280707df82f3);
$parcel$export($9cfcd1ed570fea60$exports, "LPCWSTR", () => $9cfcd1ed570fea60$export$dfa283df2530598f);
$parcel$export($9cfcd1ed570fea60$exports, "LPCTSTR", () => $9cfcd1ed570fea60$export$3e6b4f6079ce51b);
$parcel$export($9cfcd1ed570fea60$exports, "LPVOID", () => $9cfcd1ed570fea60$export$3de86eb3806b712d);
$parcel$export($9cfcd1ed570fea60$exports, "LPCVOID", () => $9cfcd1ed570fea60$export$acb32c160acad508);
$parcel$export($9cfcd1ed570fea60$exports, "LPDWORD", () => $9cfcd1ed570fea60$export$33eafb5d436e1362);
$parcel$export($9cfcd1ed570fea60$exports, "LPHANDLE", () => $9cfcd1ed570fea60$export$e8ea75f05566dd3c);
$parcel$export($9cfcd1ed570fea60$exports, "LPINT", () => $9cfcd1ed570fea60$export$b4d77e4f53c21e3a);
$parcel$export($9cfcd1ed570fea60$exports, "LPLONG", () => $9cfcd1ed570fea60$export$ca6bd9f017df4953);
$parcel$export($9cfcd1ed570fea60$exports, "LPMSG", () => $9cfcd1ed570fea60$export$aba1f5f1221c9fb3);
$parcel$export($9cfcd1ed570fea60$exports, "LPPOINT", () => $9cfcd1ed570fea60$export$3a00c33c250e7d86);
$parcel$export($9cfcd1ed570fea60$exports, "LPSTR", () => $9cfcd1ed570fea60$export$e5fae31862228632);
$parcel$export($9cfcd1ed570fea60$exports, "LPWSTR", () => $9cfcd1ed570fea60$export$dec24c174f0eaee1);
$parcel$export($9cfcd1ed570fea60$exports, "LPTSTR", () => $9cfcd1ed570fea60$export$477e24a98da955e6);
$parcel$export($9cfcd1ed570fea60$exports, "LPWORD", () => $9cfcd1ed570fea60$export$a362e06a8759641a);
$parcel$export($9cfcd1ed570fea60$exports, "LRESULT", () => $9cfcd1ed570fea60$export$307c691072d7eef0);
$parcel$export($9cfcd1ed570fea60$exports, "NTSTATUS", () => $9cfcd1ed570fea60$export$a50474266f14be1b);
$parcel$export($9cfcd1ed570fea60$exports, "PBOOL", () => $9cfcd1ed570fea60$export$a1d44ba3d847cfd0);
$parcel$export($9cfcd1ed570fea60$exports, "PBOOLEAN", () => $9cfcd1ed570fea60$export$4f984d513e291397);
$parcel$export($9cfcd1ed570fea60$exports, "PBYTE", () => $9cfcd1ed570fea60$export$306fa084066e20a7);
$parcel$export($9cfcd1ed570fea60$exports, "PCHAR", () => $9cfcd1ed570fea60$export$72c3772b516a65cf);
$parcel$export($9cfcd1ed570fea60$exports, "PCSTR", () => $9cfcd1ed570fea60$export$cf99bbd665f301f9);
$parcel$export($9cfcd1ed570fea60$exports, "PCTSTR", () => $9cfcd1ed570fea60$export$d63ff7816142b2f4);
$parcel$export($9cfcd1ed570fea60$exports, "PCWSTR", () => $9cfcd1ed570fea60$export$8aeea065f4882b0c);
$parcel$export($9cfcd1ed570fea60$exports, "PDWORD", () => $9cfcd1ed570fea60$export$c06eff3fc862da47);
$parcel$export($9cfcd1ed570fea60$exports, "PDWORDLONG", () => $9cfcd1ed570fea60$export$e09b44cec70f0704);
$parcel$export($9cfcd1ed570fea60$exports, "PDWORD_PTR", () => $9cfcd1ed570fea60$export$a2bbf1fe69b0026d);
$parcel$export($9cfcd1ed570fea60$exports, "PDWORD32", () => $9cfcd1ed570fea60$export$60e2c917bf0cf558);
$parcel$export($9cfcd1ed570fea60$exports, "PDWORD64", () => $9cfcd1ed570fea60$export$d8d54319b3c23a57);
$parcel$export($9cfcd1ed570fea60$exports, "PFLOAT", () => $9cfcd1ed570fea60$export$22fafc5c9d071cf4);
$parcel$export($9cfcd1ed570fea60$exports, "PHALF_PTR", () => $9cfcd1ed570fea60$export$729dee532709226e);
$parcel$export($9cfcd1ed570fea60$exports, "PHANDLE", () => $9cfcd1ed570fea60$export$30d4c74fa93d3438);
$parcel$export($9cfcd1ed570fea60$exports, "PHKEY", () => $9cfcd1ed570fea60$export$64ced35c53da7357);
$parcel$export($9cfcd1ed570fea60$exports, "PINT", () => $9cfcd1ed570fea60$export$905308e3ac5456b0);
$parcel$export($9cfcd1ed570fea60$exports, "PINT_PTR", () => $9cfcd1ed570fea60$export$7fbf02121a44af3);
$parcel$export($9cfcd1ed570fea60$exports, "PINT8", () => $9cfcd1ed570fea60$export$16ddf13bb85917f4);
$parcel$export($9cfcd1ed570fea60$exports, "PINT16", () => $9cfcd1ed570fea60$export$2863cf8b15c466bd);
$parcel$export($9cfcd1ed570fea60$exports, "PINT32", () => $9cfcd1ed570fea60$export$3888f865e2f3fc9e);
$parcel$export($9cfcd1ed570fea60$exports, "PINT64", () => $9cfcd1ed570fea60$export$d81a713d6f75c904);
$parcel$export($9cfcd1ed570fea60$exports, "PLCID", () => $9cfcd1ed570fea60$export$d0f483e3dea49716);
$parcel$export($9cfcd1ed570fea60$exports, "PLONG", () => $9cfcd1ed570fea60$export$884b50f6e7d23183);
$parcel$export($9cfcd1ed570fea60$exports, "PLONGLONG", () => $9cfcd1ed570fea60$export$f4311b64ba2f3fe7);
$parcel$export($9cfcd1ed570fea60$exports, "PLONG_PTR", () => $9cfcd1ed570fea60$export$6cfa0302bb348fb4);
$parcel$export($9cfcd1ed570fea60$exports, "PLONG32", () => $9cfcd1ed570fea60$export$b415878f19491157);
$parcel$export($9cfcd1ed570fea60$exports, "PLONG64", () => $9cfcd1ed570fea60$export$9b97fd1af0726c08);
$parcel$export($9cfcd1ed570fea60$exports, "POINTER_32", () => $9cfcd1ed570fea60$export$f27a748240b723f3);
$parcel$export($9cfcd1ed570fea60$exports, "POINTER_64", () => $9cfcd1ed570fea60$export$5d25222f3b2425ae);
$parcel$export($9cfcd1ed570fea60$exports, "POINTER_SIGNED", () => $9cfcd1ed570fea60$export$729c2fdddcf979dc);
$parcel$export($9cfcd1ed570fea60$exports, "POINTER_UNSIGNED", () => $9cfcd1ed570fea60$export$d595eac61e43ee1f);
$parcel$export($9cfcd1ed570fea60$exports, "PSHORT", () => $9cfcd1ed570fea60$export$8c90681ffa492177);
$parcel$export($9cfcd1ed570fea60$exports, "PSIZE_T", () => $9cfcd1ed570fea60$export$42c4483327accaad);
$parcel$export($9cfcd1ed570fea60$exports, "PSSIZE_T", () => $9cfcd1ed570fea60$export$159e35dadcec50ed);
$parcel$export($9cfcd1ed570fea60$exports, "PSTR", () => $9cfcd1ed570fea60$export$fd996999f34a55b1);
$parcel$export($9cfcd1ed570fea60$exports, "PTBYTE", () => $9cfcd1ed570fea60$export$99f79cd79a3279be);
$parcel$export($9cfcd1ed570fea60$exports, "PTCHAR", () => $9cfcd1ed570fea60$export$a80266c3bbf78408);
$parcel$export($9cfcd1ed570fea60$exports, "PTSTR", () => $9cfcd1ed570fea60$export$90396e0dac1d7bf4);
$parcel$export($9cfcd1ed570fea60$exports, "PUCHAR", () => $9cfcd1ed570fea60$export$dac29ac7c1a6a593);
$parcel$export($9cfcd1ed570fea60$exports, "PUHALF_PTR", () => $9cfcd1ed570fea60$export$3b9eae56db5c9a5c);
$parcel$export($9cfcd1ed570fea60$exports, "PUINT", () => $9cfcd1ed570fea60$export$335fb31719a5cd92);
$parcel$export($9cfcd1ed570fea60$exports, "PUINT_PTR", () => $9cfcd1ed570fea60$export$f6cfbcf283b0732e);
$parcel$export($9cfcd1ed570fea60$exports, "PUINT8", () => $9cfcd1ed570fea60$export$29db969f4284195f);
$parcel$export($9cfcd1ed570fea60$exports, "PUINT16", () => $9cfcd1ed570fea60$export$1fc9516454e9e0c2);
$parcel$export($9cfcd1ed570fea60$exports, "PUINT32", () => $9cfcd1ed570fea60$export$b91b1f2b5d4b2f56);
$parcel$export($9cfcd1ed570fea60$exports, "PUINT64", () => $9cfcd1ed570fea60$export$a598fa2150118df1);
$parcel$export($9cfcd1ed570fea60$exports, "PULONG", () => $9cfcd1ed570fea60$export$bbdf20879558fef0);
$parcel$export($9cfcd1ed570fea60$exports, "PULONGLONG", () => $9cfcd1ed570fea60$export$b1eafd00c14966b1);
$parcel$export($9cfcd1ed570fea60$exports, "PULONG_PTR", () => $9cfcd1ed570fea60$export$77c87f189e52029c);
$parcel$export($9cfcd1ed570fea60$exports, "PULONG32", () => $9cfcd1ed570fea60$export$c3860bffe982b77);
$parcel$export($9cfcd1ed570fea60$exports, "PULONG64", () => $9cfcd1ed570fea60$export$ed3d7c18eaa4706a);
$parcel$export($9cfcd1ed570fea60$exports, "PUSHORT", () => $9cfcd1ed570fea60$export$c33f795d3055c8e8);
$parcel$export($9cfcd1ed570fea60$exports, "PWCHAR", () => $9cfcd1ed570fea60$export$53e197f0568d60e7);
$parcel$export($9cfcd1ed570fea60$exports, "PWORD", () => $9cfcd1ed570fea60$export$44a81616d2266597);
$parcel$export($9cfcd1ed570fea60$exports, "PWSTR", () => $9cfcd1ed570fea60$export$34fcf56876cedf67);
$parcel$export($9cfcd1ed570fea60$exports, "QWORD", () => $9cfcd1ed570fea60$export$ee325f3aca1cefe);
$parcel$export($9cfcd1ed570fea60$exports, "SC_HANDLE", () => $9cfcd1ed570fea60$export$ef4c74ea1198ce76);
$parcel$export($9cfcd1ed570fea60$exports, "SC_LOCK", () => $9cfcd1ed570fea60$export$dc1bca63e2d62447);
$parcel$export($9cfcd1ed570fea60$exports, "SERVICE_STATUS_HANDLE", () => $9cfcd1ed570fea60$export$1bbbfd60fd9e87f3);
$parcel$export($9cfcd1ed570fea60$exports, "SHORT", () => $9cfcd1ed570fea60$export$1de1ffada6286910);
$parcel$export($9cfcd1ed570fea60$exports, "SIZE_T", () => $9cfcd1ed570fea60$export$f089f2422e95b42b);
$parcel$export($9cfcd1ed570fea60$exports, "SSIZE_T", () => $9cfcd1ed570fea60$export$a185e644c63be28f);
$parcel$export($9cfcd1ed570fea60$exports, "TBYTE", () => $9cfcd1ed570fea60$export$d894ec5fb3ed01a4);
$parcel$export($9cfcd1ed570fea60$exports, "TCHAR", () => $9cfcd1ed570fea60$export$20f081206609d5f7);
$parcel$export($9cfcd1ed570fea60$exports, "UCHAR", () => $9cfcd1ed570fea60$export$226908722445f5d7);
$parcel$export($9cfcd1ed570fea60$exports, "UHALF_PTR", () => $9cfcd1ed570fea60$export$f229c93d3486a070);
$parcel$export($9cfcd1ed570fea60$exports, "UINT", () => $9cfcd1ed570fea60$export$54c0d11872b7e6d4);
$parcel$export($9cfcd1ed570fea60$exports, "UINT_PTR", () => $9cfcd1ed570fea60$export$d642901a6a404ec0);
$parcel$export($9cfcd1ed570fea60$exports, "UINT8", () => $9cfcd1ed570fea60$export$212e71dfd61c79fa);
$parcel$export($9cfcd1ed570fea60$exports, "UINT16", () => $9cfcd1ed570fea60$export$e81cbc576f121d7);
$parcel$export($9cfcd1ed570fea60$exports, "UINT32", () => $9cfcd1ed570fea60$export$55e9b618f09601c9);
$parcel$export($9cfcd1ed570fea60$exports, "UINT64", () => $9cfcd1ed570fea60$export$eb2099ed807a836e);
$parcel$export($9cfcd1ed570fea60$exports, "ULONG", () => $9cfcd1ed570fea60$export$c76dabb36bddc74f);
$parcel$export($9cfcd1ed570fea60$exports, "ULONGLONG", () => $9cfcd1ed570fea60$export$4c4b72fe7d344560);
$parcel$export($9cfcd1ed570fea60$exports, "ULONG32", () => $9cfcd1ed570fea60$export$1f6ffa45e1d0ba10);
$parcel$export($9cfcd1ed570fea60$exports, "ULONG64", () => $9cfcd1ed570fea60$export$35ffdfef7dc81db);
$parcel$export($9cfcd1ed570fea60$exports, "UNICODE_STRING", () => $9cfcd1ed570fea60$export$5dcce0e722389cdb);
$parcel$export($9cfcd1ed570fea60$exports, "USHORT", () => $9cfcd1ed570fea60$export$da53d5ec51ae7634);
$parcel$export($9cfcd1ed570fea60$exports, "USN", () => $9cfcd1ed570fea60$export$79215014ef451883);
$parcel$export($9cfcd1ed570fea60$exports, "WINEVENTPROC", () => $9cfcd1ed570fea60$export$3410187f8fd3ffe0);
$parcel$export($9cfcd1ed570fea60$exports, "WNDENUMPROC", () => $9cfcd1ed570fea60$export$db60719a96ea9349);
$parcel$export($9cfcd1ed570fea60$exports, "WNDPROC", () => $9cfcd1ed570fea60$export$9b17b5eb695fe8eb);
$parcel$export($9cfcd1ed570fea60$exports, "WPARAM", () => $9cfcd1ed570fea60$export$9ea0e07848f6a21c);
$parcel$export($9cfcd1ed570fea60$exports, "LPINITCOMMONCONTROLSEX", () => $9cfcd1ed570fea60$export$1a7b006743d0f934);
$parcel$export($9cfcd1ed570fea60$exports, "LPWNDCLASSEX", () => $9cfcd1ed570fea60$export$1f0a9d32094b3282);
$parcel$export($9cfcd1ed570fea60$exports, "PWINDOWINFO", () => $9cfcd1ed570fea60$export$7eee65a87be8fed2);
$parcel$export($9cfcd1ed570fea60$exports, "PFILETIME", () => $9cfcd1ed570fea60$export$1b5ecb15ced895a7);
$parcel$export($9cfcd1ed570fea60$exports, "LPFILETIME", () => $9cfcd1ed570fea60$export$e929ded8e6b3e173);
$parcel$export($9cfcd1ed570fea60$exports, "va_list", () => $9cfcd1ed570fea60$export$b1fc40da7cd7c95c);
$parcel$export($9cfcd1ed570fea60$exports, "INITCOMMONCONTROLSEX", () => $9cfcd1ed570fea60$export$6eb78d635a3ee587);
$parcel$export($9cfcd1ed570fea60$exports, "MSG", () => $9cfcd1ed570fea60$export$f99154f7a7b0135d);
$parcel$export($9cfcd1ed570fea60$exports, "POINT", () => $9cfcd1ed570fea60$export$a80a24d37f0f1279);
$parcel$export($9cfcd1ed570fea60$exports, "WNDCLASSEX", () => $9cfcd1ed570fea60$export$81ef613fbd3a628d);
$parcel$export($9cfcd1ed570fea60$exports, "WINDOWINFO", () => $9cfcd1ed570fea60$export$5119761222d7d0f6);
$parcel$export($9cfcd1ed570fea60$exports, "PRAWINPUTDEVICELIST", () => $9cfcd1ed570fea60$export$ceb1f86d9f461eb);
$parcel$export($9cfcd1ed570fea60$exports, "RECT", () => $9cfcd1ed570fea60$export$1e530543ba1d4b12);

const $9cfcd1ed570fea60$export$a78dc2c4cbd70341 = "uint16";
const $9cfcd1ed570fea60$export$181c9ad1752440f7 = "uint32";
const $9cfcd1ed570fea60$export$9cb553b951e1e0d8 = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$1f4a129e1195d18a = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$bd8b6af04676495 = "PVOID";
const $9cfcd1ed570fea60$export$f60fc96aa99c605e = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$2e482cd8c991e558 = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$1cd1943b3a73bbe8 = "void";
const $9cfcd1ed570fea60$export$d71e2b267f5b711b = "uint16";
const $9cfcd1ed570fea60$export$f3a79cf462faa1e3 = "int16";
const $9cfcd1ed570fea60$export$c35dd5647862f990 = "int";
const $9cfcd1ed570fea60$export$428cfe48a69a3b4f = "bool";
const $9cfcd1ed570fea60$export$8f4bf8f7eb581284 = "byte";
const $9cfcd1ed570fea60$export$578a4c3d73a6d794 = "pointer"; // https://msdn.microsoft.com/en-us/library/windows/desktop/ms633573(v=vs.85).aspx
const $9cfcd1ed570fea60$export$934996f637259e88 = "uint8";
const $9cfcd1ed570fea60$export$9e88d7b6f62f62d8 = "uint8";
const $9cfcd1ed570fea60$export$52da70d84f582c04 = "DWORD";
const $9cfcd1ed570fea60$export$6b766bfdcf67e2ec = "uint64";
const $9cfcd1ed570fea60$export$8f7b8c11edcb3e34 = "ULONG_PTR";
const $9cfcd1ed570fea60$export$a8ea5b58ae88fc11 = "uint32";
const $9cfcd1ed570fea60$export$8db31e1b1c7e0db0 = "uint64";
const $9cfcd1ed570fea60$export$d2b086fd1e01e03a = "float";
const $9cfcd1ed570fea60$export$1505c2c04cc3bbef = "HANDLE";
const $9cfcd1ed570fea60$export$2d081f52dd94061a = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$49cd303f01f67350 = "HANDLE";
const $9cfcd1ed570fea60$export$d17b38c787d37ab8 = "HANDLE";
const $9cfcd1ed570fea60$export$56c7641f121a2c5c = "HANDLE";
const $9cfcd1ed570fea60$export$762b8b6ee0ff4c44 = "HANDLE";
const $9cfcd1ed570fea60$export$750eee7b2f0ee030 = "HANDLE";
const $9cfcd1ed570fea60$export$a02796fdca6d354a = "HANDLE";
const $9cfcd1ed570fea60$export$1a62f6d54b236e36 = "HANDLE";
const $9cfcd1ed570fea60$export$4ddde23cd7155d44 = "HANDLE";
const $9cfcd1ed570fea60$export$1d0ad5eb60ffc518 = "HANDLE";
const $9cfcd1ed570fea60$export$726c5c347609dae3 = "HANDLE";
const $9cfcd1ed570fea60$export$323f06abdd2a59da = "HANDLE";
const $9cfcd1ed570fea60$export$a43730eb8bf8b76e = "HANDLE";
const $9cfcd1ed570fea60$export$91f6f659ef3d1edd = "HANDLE"; // typedef int HFILE;
const $9cfcd1ed570fea60$export$229672d8f6dd9e1a = "HANDLE";
const $9cfcd1ed570fea60$export$ef0ae13fba225584 = "HANDLE";
const $9cfcd1ed570fea60$export$6b52c27577dfb85e = "HANDLE";
const $9cfcd1ed570fea60$export$a681c4a7983815bf = "HANDLE";
const $9cfcd1ed570fea60$export$105fd39584a4c170 = "HANDLE";
const $9cfcd1ed570fea60$export$1a50b4f53ac33a = "HANDLE";
const $9cfcd1ed570fea60$export$80d8783aa08e677d = "HANDLE";
const $9cfcd1ed570fea60$export$9252a4926414af53 = "HANDLE";
const $9cfcd1ed570fea60$export$941fbb37db50e0ee = "HANDLE";
const $9cfcd1ed570fea60$export$5570ee796bf8668a = "HANDLE";
const $9cfcd1ed570fea60$export$32e1d6dd1d786a08 = "HANDLE";
const $9cfcd1ed570fea60$export$82cb6941373786ac = $9cfcd1ed570fea60$export$1a50b4f53ac33a;
const $9cfcd1ed570fea60$export$d76bcd896c4c1f0b = "HANDLE";
const $9cfcd1ed570fea60$export$c984542fbcd9e311 = "HANDLE";
const $9cfcd1ed570fea60$export$e8c398641ae921a0 = "HANDLE";
const $9cfcd1ed570fea60$export$2109f3ca8e001dc3 = "long";
const $9cfcd1ed570fea60$export$64129906a6b15c89 = "HANDLE";
const $9cfcd1ed570fea60$export$d0b96b23ab9f5338 = "HANDLE";
const $9cfcd1ed570fea60$export$c50eccdd15c9fd55 = "HANDLE";
const $9cfcd1ed570fea60$export$60bcb2927641b3f4 = "HANDLE";
const $9cfcd1ed570fea60$export$893fa35bdef36b = "HANDLE";
const $9cfcd1ed570fea60$export$6525812590d9a476 = "HANDLE";
const $9cfcd1ed570fea60$export$160e8bdd97bfce3a = "int";
const $9cfcd1ed570fea60$export$f051d14373139dee = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$9922471c07c2891d = "int8";
const $9cfcd1ed570fea60$export$bd9b91838fde002e = "int16";
const $9cfcd1ed570fea60$export$34412edc7b36f85 = "int32";
const $9cfcd1ed570fea60$export$a2c63c68aeee9e2d = "int64";
const $9cfcd1ed570fea60$export$6190ebba87077b9d = "WORD";
const $9cfcd1ed570fea60$export$b36cf4a83245c2f9 = "DWORD";
const $9cfcd1ed570fea60$export$244c0463aedba74c = "DWORD";
const $9cfcd1ed570fea60$export$202821be4d3b65c7 = "DWORD";
const $9cfcd1ed570fea60$export$686cfa64f218be7a = "long";
const $9cfcd1ed570fea60$export$2d2033f38dde21c = "longlong";
const $9cfcd1ed570fea60$export$4c9cb8eafd43015e = "int32";
const $9cfcd1ed570fea60$export$552dea698acd6cd2 = "int64";
const $9cfcd1ed570fea60$export$13371aace3d44948 = "LONG_PTR";
const $9cfcd1ed570fea60$export$5df7e4acce683059 = "BOOL";
const $9cfcd1ed570fea60$export$1061811df8b0c9be = "byte*";
const $9cfcd1ed570fea60$export$f1d7ba3e4d51498c = "DWORD";
const $9cfcd1ed570fea60$export$18e7280707df82f3 = "uint8*";
const $9cfcd1ed570fea60$export$dfa283df2530598f = "uint16*";
const $9cfcd1ed570fea60$export$3e6b4f6079ce51b = (0, $d5993085ececeae5$export$609085a058d4a4d0);
const $9cfcd1ed570fea60$export$3de86eb3806b712d = "void*";
const $9cfcd1ed570fea60$export$acb32c160acad508 = "LPVOID";
const $9cfcd1ed570fea60$export$33eafb5d436e1362 = "uint16*";
const $9cfcd1ed570fea60$export$e8ea75f05566dd3c = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55); // A pointer to a HANDLE.
const $9cfcd1ed570fea60$export$b4d77e4f53c21e3a = "int*";
const $9cfcd1ed570fea60$export$ca6bd9f017df4953 = "int32*";
const $9cfcd1ed570fea60$export$aba1f5f1221c9fb3 = "pointer"; // A pointer to a MSG
const $9cfcd1ed570fea60$export$3a00c33c250e7d86 = "pointer";
const $9cfcd1ed570fea60$export$e5fae31862228632 = "char*";
const $9cfcd1ed570fea60$export$dec24c174f0eaee1 = "uint16*";
const $9cfcd1ed570fea60$export$477e24a98da955e6 = (0, $d5993085ececeae5$export$609085a058d4a4d0);
const $9cfcd1ed570fea60$export$a362e06a8759641a = "uint16*";
const $9cfcd1ed570fea60$export$307c691072d7eef0 = "LONG_PTR";
const $9cfcd1ed570fea60$export$a50474266f14be1b = "uint32";
const $9cfcd1ed570fea60$export$a1d44ba3d847cfd0 = "int*"; // ? 'bool*'
const $9cfcd1ed570fea60$export$4f984d513e291397 = "bool*";
const $9cfcd1ed570fea60$export$306fa084066e20a7 = "byte*";
const $9cfcd1ed570fea60$export$72c3772b516a65cf = "char*";
const $9cfcd1ed570fea60$export$cf99bbd665f301f9 = "uint8*";
const $9cfcd1ed570fea60$export$d63ff7816142b2f4 = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$8aeea065f4882b0c = "uint16*";
const $9cfcd1ed570fea60$export$c06eff3fc862da47 = "uint32*";
const $9cfcd1ed570fea60$export$e09b44cec70f0704 = "uint64*";
const $9cfcd1ed570fea60$export$a2bbf1fe69b0026d = "DWORD_PTR";
const $9cfcd1ed570fea60$export$60e2c917bf0cf558 = "uint32*";
const $9cfcd1ed570fea60$export$d8d54319b3c23a57 = "uint64*";
const $9cfcd1ed570fea60$export$22fafc5c9d071cf4 = "float*";
const $9cfcd1ed570fea60$export$729dee532709226e = "pointer"; // ? A pointer to a HALF_PTR.
const $9cfcd1ed570fea60$export$30d4c74fa93d3438 = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$64ced35c53da7357 = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$905308e3ac5456b0 = "int*";
const $9cfcd1ed570fea60$export$7fbf02121a44af3 = "int**";
const $9cfcd1ed570fea60$export$16ddf13bb85917f4 = "int8*";
const $9cfcd1ed570fea60$export$2863cf8b15c466bd = "int16*";
const $9cfcd1ed570fea60$export$3888f865e2f3fc9e = "int32*";
const $9cfcd1ed570fea60$export$d81a713d6f75c904 = "int64*";
const $9cfcd1ed570fea60$export$d0f483e3dea49716 = "uint32*";
const $9cfcd1ed570fea60$export$884b50f6e7d23183 = "long*";
const $9cfcd1ed570fea60$export$f4311b64ba2f3fe7 = "int64*";
const $9cfcd1ed570fea60$export$6cfa0302bb348fb4 = "pointer";
const $9cfcd1ed570fea60$export$b415878f19491157 = "int32*";
const $9cfcd1ed570fea60$export$9b97fd1af0726c08 = "int64*";
const $9cfcd1ed570fea60$export$f27a748240b723f3 = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$5d25222f3b2425ae = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$729c2fdddcf979dc = "pointer"; // ? A signed pointer.
const $9cfcd1ed570fea60$export$d595eac61e43ee1f = "pointer"; // An unsigned pointer.
const $9cfcd1ed570fea60$export$8c90681ffa492177 = "int16*";
const $9cfcd1ed570fea60$export$42c4483327accaad = "ULONG_PTR"; // ?
const $9cfcd1ed570fea60$export$159e35dadcec50ed = "pointer";
const $9cfcd1ed570fea60$export$fd996999f34a55b1 = "char*";
const $9cfcd1ed570fea60$export$99f79cd79a3279be = (0, $d5993085ececeae5$export$609085a058d4a4d0);
const $9cfcd1ed570fea60$export$a80266c3bbf78408 = (0, $d5993085ececeae5$export$609085a058d4a4d0);
const $9cfcd1ed570fea60$export$90396e0dac1d7bf4 = (0, $d5993085ececeae5$export$609085a058d4a4d0);
const $9cfcd1ed570fea60$export$dac29ac7c1a6a593 = "pointer";
const $9cfcd1ed570fea60$export$3b9eae56db5c9a5c = "pointer";
const $9cfcd1ed570fea60$export$335fb31719a5cd92 = "uint*";
const $9cfcd1ed570fea60$export$f6cfbcf283b0732e = "uint**";
const $9cfcd1ed570fea60$export$29db969f4284195f = "uint8*";
const $9cfcd1ed570fea60$export$1fc9516454e9e0c2 = "uint16*";
const $9cfcd1ed570fea60$export$b91b1f2b5d4b2f56 = "uint32*";
const $9cfcd1ed570fea60$export$a598fa2150118df1 = "uint64*";
const $9cfcd1ed570fea60$export$bbdf20879558fef0 = "uint*";
const $9cfcd1ed570fea60$export$b1eafd00c14966b1 = "uint64*";
const $9cfcd1ed570fea60$export$77c87f189e52029c = "uint64**";
const $9cfcd1ed570fea60$export$c3860bffe982b77 = "uint*";
const $9cfcd1ed570fea60$export$ed3d7c18eaa4706a = "uint64*";
const $9cfcd1ed570fea60$export$c33f795d3055c8e8 = "uint16*";
const $9cfcd1ed570fea60$export$53e197f0568d60e7 = "uint16*";
const $9cfcd1ed570fea60$export$44a81616d2266597 = "uint16*";
const $9cfcd1ed570fea60$export$34fcf56876cedf67 = "uint16*";
const $9cfcd1ed570fea60$export$ee325f3aca1cefe = "uint64";
const $9cfcd1ed570fea60$export$ef4c74ea1198ce76 = "HANDLE";
const $9cfcd1ed570fea60$export$dc1bca63e2d62447 = "LPVOID";
const $9cfcd1ed570fea60$export$1bbbfd60fd9e87f3 = "HANDLE";
const $9cfcd1ed570fea60$export$1de1ffada6286910 = "int16";
const $9cfcd1ed570fea60$export$f089f2422e95b42b = "ULONG_PTR";
const $9cfcd1ed570fea60$export$a185e644c63be28f = "LONG_PTR";
const $9cfcd1ed570fea60$export$d894ec5fb3ed01a4 = (0, $d5993085ececeae5$export$609085a058d4a4d0);
const $9cfcd1ed570fea60$export$20f081206609d5f7 = (0, $d5993085ececeae5$export$609085a058d4a4d0);
const $9cfcd1ed570fea60$export$226908722445f5d7 = "uchar";
const $9cfcd1ed570fea60$export$f229c93d3486a070 = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$54c0d11872b7e6d4 = "uint";
const $9cfcd1ed570fea60$export$d642901a6a404ec0 = (0, $d5993085ececeae5$export$4bbcbb9e6d314d55);
const $9cfcd1ed570fea60$export$212e71dfd61c79fa = "uint8";
const $9cfcd1ed570fea60$export$e81cbc576f121d7 = "uint16";
const $9cfcd1ed570fea60$export$55e9b618f09601c9 = "uint32";
const $9cfcd1ed570fea60$export$eb2099ed807a836e = "uint64";
const $9cfcd1ed570fea60$export$c76dabb36bddc74f = "uint";
const $9cfcd1ed570fea60$export$4c4b72fe7d344560 = "uint64";
const $9cfcd1ed570fea60$export$1f6ffa45e1d0ba10 = "uint32";
const $9cfcd1ed570fea60$export$35ffdfef7dc81db = "uint64";
const $9cfcd1ed570fea60$export$5dcce0e722389cdb = "pointer";
const $9cfcd1ed570fea60$export$da53d5ec51ae7634 = "ushort";
const $9cfcd1ed570fea60$export$79215014ef451883 = $9cfcd1ed570fea60$export$2d2033f38dde21c;
const $9cfcd1ed570fea60$export$3410187f8fd3ffe0 = "pointer";
const $9cfcd1ed570fea60$export$db60719a96ea9349 = "pointer";
const $9cfcd1ed570fea60$export$9b17b5eb695fe8eb = "pointer";
const $9cfcd1ed570fea60$export$9ea0e07848f6a21c = "UINT_PTR";
const $9cfcd1ed570fea60$export$1a7b006743d0f934 = "pointer";
const $9cfcd1ed570fea60$export$1f0a9d32094b3282 = "pointer"; // A pointer to a WNDCLASSEX
const $9cfcd1ed570fea60$export$7eee65a87be8fed2 = "pointer"; // A pointer to a WINDOWINFO structure
const $9cfcd1ed570fea60$export$1b5ecb15ced895a7 = "pointer"; // A pointer to a FILETIME
const $9cfcd1ed570fea60$export$e929ded8e6b3e173 = "pointer"; // A pointer to a FILETIME
const $9cfcd1ed570fea60$export$b1fc40da7cd7c95c = "char*";
const $9cfcd1ed570fea60$export$6eb78d635a3ee587 = "pointer";
const $9cfcd1ed570fea60$export$f99154f7a7b0135d = "pointer";
const $9cfcd1ed570fea60$export$a80a24d37f0f1279 = "pointer";
const $9cfcd1ed570fea60$export$81ef613fbd3a628d = "pointer";
const $9cfcd1ed570fea60$export$5119761222d7d0f6 = "pointer";
const $9cfcd1ed570fea60$export$ceb1f86d9f461eb = "pointer";
const $9cfcd1ed570fea60$export$1e530543ba1d4b12 = "pointer"; // _RECT


const $92ad585760e6835e$export$65dedbc9f072ffcc = new Map([
    [
        "HANDLE",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "uint64",
            "uint32"
        ]
    ],
    [
        "PVOID",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "uint64*",
            "uint32*"
        ]
    ],
    [
        "HALF_PTR",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "int32",
            "int16"
        ]
    ],
    [
        "INT_PTR",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "int64",
            "int32"
        ]
    ],
    [
        "LONG_PTR",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "int64",
            "int32"
        ]
    ],
    [
        "LPCTSTR",
        [
            (0, $d5993085ececeae5$export$609085a058d4a4d0),
            (0, $9cfcd1ed570fea60$export$dfa283df2530598f),
            (0, $9cfcd1ed570fea60$export$18e7280707df82f3)
        ]
    ],
    [
        "LPHANDLE",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "uint64*",
            "uint32*"
        ]
    ],
    [
        "LPTSTR",
        [
            (0, $d5993085ececeae5$export$609085a058d4a4d0),
            (0, $9cfcd1ed570fea60$export$dec24c174f0eaee1),
            "uint8*"
        ]
    ],
    [
        "PCTSTR",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            (0, $9cfcd1ed570fea60$export$dfa283df2530598f),
            (0, $9cfcd1ed570fea60$export$18e7280707df82f3)
        ]
    ],
    [
        "PHANDLE",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "uint64**",
            "uint32**"
        ]
    ],
    [
        "PHKEY",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "uint64*",
            "uint32*"
        ]
    ],
    [
        "POINTER_32",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "uint32*",
            "uint32*"
        ]
    ],
    [
        "POINTER_64",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "uint64*",
            "uint32*"
        ]
    ],
    [
        "PTBYTE",
        [
            (0, $d5993085ececeae5$export$609085a058d4a4d0),
            "int16*",
            "int8*"
        ]
    ],
    [
        "PTCHAR",
        [
            (0, $d5993085ececeae5$export$609085a058d4a4d0),
            "uint16*",
            "uint8*"
        ]
    ],
    [
        "PTSTR",
        [
            (0, $d5993085ececeae5$export$609085a058d4a4d0),
            (0, $9cfcd1ed570fea60$export$dec24c174f0eaee1),
            (0, $9cfcd1ed570fea60$export$e5fae31862228632)
        ]
    ],
    [
        "TBYTE",
        [
            (0, $d5993085ececeae5$export$609085a058d4a4d0),
            "int16",
            "int8"
        ]
    ],
    [
        "TCHAR",
        [
            (0, $d5993085ececeae5$export$609085a058d4a4d0),
            (0, $9cfcd1ed570fea60$export$d71e2b267f5b711b),
            "uint8"
        ]
    ],
    [
        "UHALF_PTR",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "uint32",
            "uint16"
        ]
    ],
    [
        "UINT_PTR",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "uint64",
            "uint32"
        ]
    ],
    [
        "ULONG_PTR",
        [
            (0, $d5993085ececeae5$export$4bbcbb9e6d314d55),
            "uint64",
            "uint32"
        ]
    ], 
]);



const $b777eb4fe1476df5$var$W = (0, $c36af01355c6f92a$export$828a2cfb74eb348c)($9cfcd1ed570fea60$exports, (0, $92ad585760e6835e$export$65dedbc9f072ffcc));
const $b777eb4fe1476df5$export$ad48b1b2cfc75809 = {
    cbSize: $b777eb4fe1476df5$var$W.DWORD,
    cItems: $b777eb4fe1476df5$var$W.INT,
    cColumns: $b777eb4fe1476df5$var$W.INT,
    cRows: $b777eb4fe1476df5$var$W.INT,
    iColFocus: $b777eb4fe1476df5$var$W.INT,
    iRowFocus: $b777eb4fe1476df5$var$W.INT,
    cxItem: $b777eb4fe1476df5$var$W.INT,
    cyItem: $b777eb4fe1476df5$var$W.INT,
    ptStart: $b777eb4fe1476df5$var$W.POINT
};
const $b777eb4fe1476df5$export$235a24185e6c03f3 = {
    dwData: $b777eb4fe1476df5$var$W.ULONG_PTR,
    cbData: $b777eb4fe1476df5$var$W.DWORD,
    lpData: $b777eb4fe1476df5$var$W.PVOID
};
const $b777eb4fe1476df5$export$c747a8b76ce2fc55 = {
    uMsg: $b777eb4fe1476df5$var$W.DWORD,
    wParamL: $b777eb4fe1476df5$var$W.WORD,
    wParamH: $b777eb4fe1476df5$var$W.WORD
};
const $b777eb4fe1476df5$export$6eb78d635a3ee587 = {
    dwSize: $b777eb4fe1476df5$var$W.DWORD,
    dwICC: $b777eb4fe1476df5$var$W.DWORD
};
const $b777eb4fe1476df5$export$9d77698e6144d105 = {
    wVk: $b777eb4fe1476df5$var$W.WORD,
    wScan: $b777eb4fe1476df5$var$W.WORD,
    dwFlags: $b777eb4fe1476df5$var$W.DWORD,
    time: $b777eb4fe1476df5$var$W.DWORD,
    dwExtraInfo: $b777eb4fe1476df5$var$W.ULONG_PTR
};
const $b777eb4fe1476df5$export$b25d5f19497424fa = {
    dx: $b777eb4fe1476df5$var$W.LONG,
    dy: $b777eb4fe1476df5$var$W.LONG,
    mouseData: $b777eb4fe1476df5$var$W.DWORD,
    dwFlags: $b777eb4fe1476df5$var$W.DWORD,
    time: $b777eb4fe1476df5$var$W.DWORD,
    dwExtraInfo: $b777eb4fe1476df5$var$W.ULONG_PTR
};
const $b777eb4fe1476df5$export$f99154f7a7b0135d = {
    hwnd: $b777eb4fe1476df5$var$W.HWND,
    message: $b777eb4fe1476df5$var$W.UINT,
    wParam: $b777eb4fe1476df5$var$W.WPARAM,
    lParam: $b777eb4fe1476df5$var$W.LPARAM,
    time: $b777eb4fe1476df5$var$W.DWORD,
    pt: $b777eb4fe1476df5$var$W.POINT,
    lPrivate: $b777eb4fe1476df5$var$W.DWORD
};
const $b777eb4fe1476df5$export$a80a24d37f0f1279 = {
    x: $b777eb4fe1476df5$var$W.LONG,
    y: $b777eb4fe1476df5$var$W.LONG
};
const $b777eb4fe1476df5$export$ca65a5b05e68b7ff = {
    Reserved1: $b777eb4fe1476df5$var$W.PVOID,
    PebBaseAddress: $b777eb4fe1476df5$var$W.PVOID,
    Reserved2: $b777eb4fe1476df5$var$W.PVOID,
    UniqueProcessId: $b777eb4fe1476df5$var$W.ULONG_PTR,
    InheritedFromUniqueProcessId: $b777eb4fe1476df5$var$W.PVOID
};
const $b777eb4fe1476df5$export$5dcce0e722389cdb = {
    Length: $b777eb4fe1476df5$var$W.USHORT,
    MaximumLength: $b777eb4fe1476df5$var$W.USHORT,
    Buffer: $b777eb4fe1476df5$var$W.PWSTR
};
const $b777eb4fe1476df5$export$109b0986e0806ee = {
    dwSizeHid: $b777eb4fe1476df5$var$W.DWORD,
    dwCount: $b777eb4fe1476df5$var$W.DWORD,
    /** bRawData[1] */ bRawData: $b777eb4fe1476df5$var$W.BYTE
};
const $b777eb4fe1476df5$export$cf7f2abb0ac9e892 = {
    hDevice: $b777eb4fe1476df5$var$W.HANDLE,
    dwType: $b777eb4fe1476df5$var$W.DWORD
};
const $b777eb4fe1476df5$export$614c933f340ce1c1 = {
    dwType: $b777eb4fe1476df5$var$W.DWORD,
    dwSize: $b777eb4fe1476df5$var$W.DWORD,
    hDevice: $b777eb4fe1476df5$var$W.HANDLE,
    wParam: $b777eb4fe1476df5$var$W.WPARAM
};
const $b777eb4fe1476df5$export$7f9753d8aef93f40 = {
    MakeCode: $b777eb4fe1476df5$var$W.USHORT,
    Flags: $b777eb4fe1476df5$var$W.USHORT,
    Reserved: $b777eb4fe1476df5$var$W.USHORT,
    VKey: $b777eb4fe1476df5$var$W.USHORT,
    Message: $b777eb4fe1476df5$var$W.UINT,
    ExtraInformation: $b777eb4fe1476df5$var$W.ULONG
};
const $b777eb4fe1476df5$export$5119761222d7d0f6 = {
    cbSize: $b777eb4fe1476df5$var$W.DWORD,
    rcWindow: $b777eb4fe1476df5$var$W.RECT,
    rcClient: $b777eb4fe1476df5$var$W.RECT,
    dwStyle: $b777eb4fe1476df5$var$W.DWORD,
    dwExStyle: $b777eb4fe1476df5$var$W.DWORD,
    dwWindowStatus: $b777eb4fe1476df5$var$W.DWORD,
    cxWindowBorders: $b777eb4fe1476df5$var$W.UINT,
    cyWindowBorders: $b777eb4fe1476df5$var$W.UINT,
    atomWindowType: $b777eb4fe1476df5$var$W.ATOM,
    wCreatorVersion: $b777eb4fe1476df5$var$W.WORD
};
const $b777eb4fe1476df5$export$81ef613fbd3a628d = {
    cbSize: $b777eb4fe1476df5$var$W.UINT,
    style: $b777eb4fe1476df5$var$W.UINT,
    // 'lpfnWndProc': ffi.Function('int32', ['pointer', 'uint32', 'int32', 'uint32']) ,
    lpfnWndProc: $b777eb4fe1476df5$var$W.WNDPROC,
    cbClsExtra: $b777eb4fe1476df5$var$W.INT,
    cbWndExtra: $b777eb4fe1476df5$var$W.INT,
    hInstance: $b777eb4fe1476df5$var$W.HINSTANCE,
    hIcon: $b777eb4fe1476df5$var$W.HICON,
    hCursor: $b777eb4fe1476df5$var$W.HCURSOR,
    hbrBackground: $b777eb4fe1476df5$var$W.HBRUSH,
    lpszMenuName: $b777eb4fe1476df5$var$W.LPCTSTR,
    lpszClassName: $b777eb4fe1476df5$var$W.LPCTSTR,
    hIconSm: $b777eb4fe1476df5$var$W.HICON
};
const $b777eb4fe1476df5$export$1e530543ba1d4b12 = {
    left: $b777eb4fe1476df5$var$W.LONG,
    top: $b777eb4fe1476df5$var$W.LONG,
    right: $b777eb4fe1476df5$var$W.LONG,
    bottom: $b777eb4fe1476df5$var$W.LONG
};
const $b777eb4fe1476df5$export$258339e884eb70b7 = {
    dwLowDateTime: $b777eb4fe1476df5$var$W.DWORD,
    dwHighDateTime: $b777eb4fe1476df5$var$W.DWORD
};





const $7d281637d4030023$var$W = (0, $c36af01355c6f92a$export$828a2cfb74eb348c)($9cfcd1ed570fea60$exports, (0, $92ad585760e6835e$export$65dedbc9f072ffcc));
const $7d281637d4030023$export$ff2835eca4f38b4e = {
    mouse: $7d281637d4030023$var$W.INT,
    keyboard: $7d281637d4030023$var$W.INT,
    hid: $7d281637d4030023$var$W.INT
};















const $7f75ba58f0dd3b28$export$be44eba04df286d7 = (0, $c36af01355c6f92a$export$828a2cfb74eb348c)($9cfcd1ed570fea60$exports, (0, $92ad585760e6835e$export$65dedbc9f072ffcc));


let $d9a32590eea5c512$export$1fbf6ae150f5289f;
(function(IgtState1) {
    IgtState1[IgtState1["UNKNOWN"] = 0] = "UNKNOWN";
    IgtState1[IgtState1["NO_GAME"] = 1] = "NO_GAME";
    IgtState1[IgtState1["PLAYING"] = 2] = "PLAYING";
    IgtState1[IgtState1["LOADING"] = 3] = "LOADING";
})($d9a32590eea5c512$export$1fbf6ae150f5289f || ($d9a32590eea5c512$export$1fbf6ae150f5289f = {}));


const $0924226f1177aa76$var$Struct = (0, (/*@__PURE__*/$parcel$interopDefault($hjPBq)))($6Wwqc);
const $0924226f1177aa76$var$BitmapStruct = $0924226f1177aa76$var$Struct({
    bmType: $5915d23a920e90bc$exports.types.long,
    bmWidth: $5915d23a920e90bc$exports.types.long,
    bmHeight: $5915d23a920e90bc$exports.types.long,
    bmWidthBytes: $5915d23a920e90bc$exports.types.long,
    bmPlanes: $5915d23a920e90bc$exports.types.uint16,
    bmBitsPixel: $5915d23a920e90bc$exports.types.uint16,
    bmBits: "ulonglong"
});
const $0924226f1177aa76$export$462becd5fad16474 = $0924226f1177aa76$var$Struct({
    biSize: $5915d23a920e90bc$exports.types.uint32,
    biWidth: $5915d23a920e90bc$exports.types.int32,
    biHeight: $5915d23a920e90bc$exports.types.int32,
    biPlanes: $5915d23a920e90bc$exports.types.ushort,
    biBitCount: $5915d23a920e90bc$exports.types.ushort,
    biCompression: $5915d23a920e90bc$exports.types.uint32,
    biSizeImage: $5915d23a920e90bc$exports.types.uint32,
    biXPelsPerMeter: $5915d23a920e90bc$exports.types.int32,
    biYPelsPerMeter: $5915d23a920e90bc$exports.types.int32,
    biClrUsed: $5915d23a920e90bc$exports.types.uint32,
    biClrImportant: $5915d23a920e90bc$exports.types.uint32
});
const $0924226f1177aa76$export$cd15b4e17d65648c = $0924226f1177aa76$var$Struct({
    red: $5915d23a920e90bc$exports.types.byte,
    green: $5915d23a920e90bc$exports.types.byte,
    blue: $5915d23a920e90bc$exports.types.byte,
    alpha: $5915d23a920e90bc$exports.types.byte
});
const $0924226f1177aa76$var$user32 = $5915d23a920e90bc$exports.Library("user32", {
    SetProcessDPIAware: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).BOOL,
        []
    ],
    GetClientRect: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).BOOL,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HWND,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).RECT
        ]
    ],
    ClientToScreen: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).BOOL,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HWND,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).LPPOINT
        ]
    ],
    GetWindowTextW: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HWND,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).LPTSTR,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT
        ]
    ],
    EnumWindows: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).BOOL,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).WNDENUMPROC,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).LPARAM
        ]
    ],
    GetDC: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HWND,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HWND
        ]
    ],
    ReleaseDC: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).ULONG,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HWND,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HDC
        ]
    ]
});
const $0924226f1177aa76$var$kernel32 = $5915d23a920e90bc$exports.Library("kernel32", {
    GlobalUnlock: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).BOOL,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT32
        ]
    ],
    GlobalFree: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT32,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT32
        ]
    ]
});
const $0924226f1177aa76$var$gdi32 = $5915d23a920e90bc$exports.Library("GDI32", {
    SelectObject: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HGDIOBJ,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HDC,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HGDIOBJ
        ]
    ],
    CreateCompatibleDC: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HDC,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HDC
        ]
    ],
    CreateCompatibleBitmap: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HBITMAP,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HDC,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT
        ]
    ],
    BitBlt: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).BOOL,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HDC,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HDC,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).DWORD
        ]
    ],
    GetObjectA: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HANDLE,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).LPVOID
        ]
    ],
    DeleteObject: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).BOOL,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HWND
        ]
    ],
    GetDIBits: [
        (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT32,
        [
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HWND,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HWND,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).UINT32,
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).UINT32,
            $6Wwqc.refType($0924226f1177aa76$var$BitmapStruct),
            $6Wwqc.refType($0924226f1177aa76$export$462becd5fad16474),
            (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).INT32
        ]
    ]
});
const $0924226f1177aa76$var$GAME_LOOKUP_TICKTIME = 500;
let $0924226f1177aa76$var$igtState = (0, $d9a32590eea5c512$export$1fbf6ae150f5289f).UNKNOWN;
let $0924226f1177aa76$var$hwnd = 0;
let $0924226f1177aa76$var$tickTime = 100;
let $0924226f1177aa76$var$timer;
let $0924226f1177aa76$var$callback = (state)=>{};
$0924226f1177aa76$var$user32.SetProcessDPIAware();
const $0924226f1177aa76$export$5801d716674e6bb6 = (igtCallback)=>{
    $0924226f1177aa76$var$callback = igtCallback;
};
const $0924226f1177aa76$export$11819f9fff450d9b = (timeInMs)=>{
    $0924226f1177aa76$var$tickTime = timeInMs;
};
const $0924226f1177aa76$export$a679630bf91eb455 = ()=>{
    $0924226f1177aa76$var$igtState = (0, $d9a32590eea5c512$export$1fbf6ae150f5289f).UNKNOWN;
    $0924226f1177aa76$var$hwnd = 0;
    $0924226f1177aa76$var$processIgt();
    $0924226f1177aa76$var$tickProcessIgt();
};
const $0924226f1177aa76$export$cb0b9fb431e2932b = ()=>{
    clearInterval($0924226f1177aa76$var$timer);
};
const $0924226f1177aa76$var$runCallbackIfChanged = (state)=>{
    if (state != $0924226f1177aa76$var$igtState) {
        $0924226f1177aa76$var$igtState = state;
        $0924226f1177aa76$var$callback($0924226f1177aa76$var$igtState);
    }
};
const $0924226f1177aa76$var$tickProcessIgt = ()=>{
    $0924226f1177aa76$var$timer = setTimeout(()=>{
        $0924226f1177aa76$var$processIgt();
        $0924226f1177aa76$var$tickProcessIgt();
    }, $0924226f1177aa76$var$igtState === (0, $d9a32590eea5c512$export$1fbf6ae150f5289f).NO_GAME || $0924226f1177aa76$var$igtState === (0, $d9a32590eea5c512$export$1fbf6ae150f5289f).UNKNOWN ? $0924226f1177aa76$var$GAME_LOOKUP_TICKTIME : $0924226f1177aa76$var$tickTime);
};
const $0924226f1177aa76$var$enumWindowsProc = $5915d23a920e90bc$exports.Callback((0, $7f75ba58f0dd3b28$export$be44eba04df286d7).BOOL, [
    (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).HWND,
    (0, $7f75ba58f0dd3b28$export$be44eba04df286d7).LPARAM
], (window, lParam)=>{
    const buf = Buffer.alloc(254);
    $0924226f1177aa76$var$user32.GetWindowTextW(window, buf, buf.byteLength);
    if (buf.toString("ucs2").replace(/\0+$/, "") == "Diablo II: Resurrected") {
        $0924226f1177aa76$var$hwnd = window;
        return false;
    }
    return true;
});
const $0924226f1177aa76$var$noGame = ()=>{
    $0924226f1177aa76$var$runCallbackIfChanged((0, $d9a32590eea5c512$export$1fbf6ae150f5289f).NO_GAME);
    $0924226f1177aa76$var$hwnd = 0;
};
const $0924226f1177aa76$var$gameLoading = ()=>{
    $0924226f1177aa76$var$runCallbackIfChanged((0, $d9a32590eea5c512$export$1fbf6ae150f5289f).LOADING);
};
const $0924226f1177aa76$var$gamePlaying = ()=>{
    $0924226f1177aa76$var$runCallbackIfChanged((0, $d9a32590eea5c512$export$1fbf6ae150f5289f).PLAYING);
};
const $0924226f1177aa76$var$processIgt = ()=>{
    if ($0924226f1177aa76$var$hwnd === 0) {
        /** @ts-ignore */ $0924226f1177aa76$var$user32.EnumWindows($0924226f1177aa76$var$enumWindowsProc, 0);
        if ($0924226f1177aa76$var$hwnd === 0) {
            $0924226f1177aa76$var$noGame();
            return;
        }
    }
    /** @ts-ignore */ const origin = new $0924226f1177aa76$var$Struct((0, $b777eb4fe1476df5$exports).POINT)();
    /** @ts-ignore */ const retw = $0924226f1177aa76$var$user32.ClientToScreen($0924226f1177aa76$var$hwnd, origin.ref());
    if (retw == 0) {
        $0924226f1177aa76$var$noGame();
        return;
    }
    /** @ts-ignore */ const rectClient = new $0924226f1177aa76$var$Struct((0, $b777eb4fe1476df5$exports).RECT)();
    /** @ts-ignore */ const ret = $0924226f1177aa76$var$user32.GetClientRect($0924226f1177aa76$var$hwnd, rectClient.ref());
    if (ret == 0) {
        $0924226f1177aa76$var$noGame();
        return;
    }
    const w = rectClient.right;
    const h = rectClient.bottom;
    const x = origin.x;
    const y = origin.y;
    const screenshot = $0924226f1177aa76$export$cdfb9a6a4ec4454d(x + Math.round(w / 2) - 100, y + h - 1, 200, 1);
    const isLoading = screenshot[0] === 0 && screenshot[1] === 0 && screenshot[2] === 0 && screenshot[400] === 0 && screenshot[401] === 0 && screenshot[402] === 0 && screenshot[796] === 0 && screenshot[797] === 0 && screenshot[798] === 0;
    if (isLoading) $0924226f1177aa76$var$gameLoading();
    else $0924226f1177aa76$var$gamePlaying();
};
function $0924226f1177aa76$export$cdfb9a6a4ec4454d(x, y, width, height) {
    var _a;
    let hdcWindow = null;
    let hdcMemDC = null;
    let hbmScreen = null;
    let hDIB = null;
    try {
        hdcWindow = $0924226f1177aa76$var$user32.GetDC(0);
        hdcMemDC = $0924226f1177aa76$var$gdi32.CreateCompatibleDC(hdcWindow);
        hbmScreen = $0924226f1177aa76$var$gdi32.CreateCompatibleBitmap(hdcWindow, width, height);
        $0924226f1177aa76$var$gdi32.SelectObject(hdcMemDC, hbmScreen);
        $0924226f1177aa76$var$gdi32.BitBlt(hdcMemDC, 0, 0, width, height, hdcWindow, x, y, 0xCC0020);
        const bmpScreen = new $0924226f1177aa76$var$BitmapStruct();
        $0924226f1177aa76$var$gdi32.GetObjectA(hbmScreen, 32, bmpScreen.ref());
        const bi = new $0924226f1177aa76$export$462becd5fad16474();
        bi.biSize = $0924226f1177aa76$export$462becd5fad16474.size;
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
        const lpBitmap = Buffer.alloc(dwBmpSize);
        /** @ts-ignore */ $0924226f1177aa76$var$gdi32.GetDIBits(hdcWindow, hbmScreen, 0, bmHeight, lpBitmap, bi.ref(), 0);
        if (hDIB != null) {
            $0924226f1177aa76$var$kernel32.GlobalUnlock(hDIB);
            $0924226f1177aa76$var$kernel32.GlobalFree(hDIB);
        }
        if (hbmScreen != null) $0924226f1177aa76$var$gdi32.DeleteObject(hbmScreen);
        if (hdcMemDC != null) $0924226f1177aa76$var$gdi32.DeleteObject(hdcMemDC);
        if (hdcWindow != null) /** @ts-ignore */ $0924226f1177aa76$var$user32.ReleaseDC($0924226f1177aa76$var$hwnd, hdcWindow);
        return lpBitmap;
    } catch (err) {
        if (hDIB != null) {
            $0924226f1177aa76$var$kernel32.GlobalUnlock(hDIB);
            $0924226f1177aa76$var$kernel32.GlobalFree(hDIB);
        }
        if (hbmScreen != null) $0924226f1177aa76$var$gdi32.DeleteObject(hbmScreen);
        if (hdcMemDC != null) $0924226f1177aa76$var$gdi32.DeleteObject(hdcMemDC);
        if (hdcWindow != null) $0924226f1177aa76$var$user32.ReleaseDC($0924226f1177aa76$var$hwnd, hdcWindow);
        throw err;
    }
}



(0, $0924226f1177aa76$export$5801d716674e6bb6)((state)=>{
    let stateStr = "";
    switch(state){
        case (0, $d9a32590eea5c512$export$1fbf6ae150f5289f).LOADING:
            stateStr = "Loading";
            break;
        case (0, $d9a32590eea5c512$export$1fbf6ae150f5289f).PLAYING:
            stateStr = "Playing";
            break;
        case (0, $d9a32590eea5c512$export$1fbf6ae150f5289f).NO_GAME:
            stateStr = "No game";
            break;
        default:
            stateStr = "Unknown";
    }
    console.log("State changed to: " + stateStr);
});
(0, $0924226f1177aa76$export$a679630bf91eb455)();
setInterval(()=>{}, 1000);


//# sourceMappingURL=cli.cjs.map
