/**
 * @fileoverview Exports {@code whitelist}, a recursively defined
 * JSON record enumerating all intrinsics and their properties
 * according to ECMA specs.
 *
 * @author JF Paradis
 */

/**
 * <p>The {@code whitelist} record is divided in two sub-records
 *    in order to simplify the processing of properties:
 * <ul>
 * <li>{@code anonIntrinsics} for the anonymous intrinsics.
 * <li>{@code namedIntrinsics} for the intrinsics values, functions,
 *     and constructors to be whitelisted on the global object.
 *
 *<p>All records have the following constrains:
 *<ul>
 *<li>Recursive structures must be declared using strings
 *<li>Recursion is only allow on "__proto__", "prototypes", and
 *    "constructor" properties.
 *<li>"__proto__" must be escaped as "**proto**".
 *
 *<p>All records are made of key-value pairs where the key
 *   is the property to process, and the value is the associated
 *   dispositions a.k.a. the "permit". Those permits can:
 *<ul>
 * <li>The boolean value "false", in which case this property is
 *     simply removed, which is also the case for properties not listed.
 *
 * <li>A string value equal to a primitive ("number", "string", etc),
 *     in which case the property whitelisted if its value property
 *     is of the given type. For example, {@code "Infinity"} leads to
 *     "number" and property values that fail {@code typeof "number"}.
 *     are removed.
 * <li>A string value equal to a primitive ("number", "string", etc),
 *     in which case the property whitelisted if its value property
 *     is of the given type. For example, {@code "Infinity"} leads to
 *     "number" and property values that fail {@code typeof "number"}.
 *     are removed.
 * <li>Another record,in which case this property is simply
 *     whitelisted and that next record represents the disposition of
 *     the object which is its value. For example,{@code "Object"}
 *     leads to another record explaining what properties {@code
 *     "Object"} may have and how each such property, if present,
 *     and its value should be tamed.
 * <li>"maybeAccessor",in which case this accessor property is simply
 *     whitelisted and its getter and/or setter are tamed according to
 *     inheritance. If the property is not an accessor property,its
 *     value is tamed according to inheritance.
 * <li>"*",in which case this property on this object is whitelisted,
 *     as is this property as inherited by all objects that inherit
 *     from this object. The values associated with all such properties
 *     are still traversed and tamed,but only according to the taming
 *     of the objects that object inherits from. For example,{@code
 *     "Object.prototype.constructor"} leads to "*",meaning that we
 *     whitelist the {@code "constructor"} property on {@code
 *     Object.prototype} and on every object that inherits from {@code
 *     Object.prototype} that does not have a conflicting mark. Each
 *     of these is tamed as if with true,so that the value of the
 *     property is further tamed according to what other objects it
 *     inherits from.
 * <li>false,which suppresses permission inherited via "*".
 * </ul>
 *
 * <p>TODO: We want to do for constructor: something weaker than t,
 * but rather more like what we do for [[Prototype]] links,which is
 * that it is whitelisted only if it points at an object which is
 * otherwise reachable by a whitelisted path.
 *
 * <p>The members of the whitelist are either
 * <ul>
 * <li>(uncommented) defined by the ES5.1 normative standard text,
 * <li>(questionable) provides a source of non-determinism,in
 *     violation of pure object-capability rules,but allowed anyway
 *     since we've given up on restricting JavaScript to a
 *     deterministic subset.
 * <li>(ES5 Appendix B) common elements of de facto JavaScript
 *     described by the non-normative Appendix B.
 * <li>(Harmless whatwg) extensions documented at
 *     <a href="http://wiki.whatwg.org/wiki/Web_ECMAScript"
 *     >http://wiki.whatwg.org/wiki/Web_ECMAScript</a> that seem to be
 *     harmless. Note that the RegExp constructor extensions on that
 *     page are <b>not harmless</b> and so must not be whitelisted.
 * <li>(ES-Harmony proposal) accepted as "proposal" status for
 *     EcmaScript-Harmony.
 * </ul>
 *
 * <p>With the above encoding,there are some sensible whitelists we
 * cannot express,such as marking a property both with "*" and a JSON
 * record. This is an expedient decision based only on not having
 * encountered such a need. Should we need this extra expressiveness,
 * we'll need to refactor to enable a different encoding.
 *
 */

// If not specified, use Object.prototype as the default.

// 19.2.4 Function Instances
export const FunctionInstance = {
  // Mentioned in "19.2.4.3 prototype"
  '**proto**': 'FunctionPrototype',
  // 19.2.4.1 length
  length: 'number',
  // 19.2.4.2 name
  name: 'string',
  // 19.2.4.3 prototype
  // Do not specify "prototype" here, since only Function instances that can
  // be used as a constructor have a prototype property. For constructors,
  // since prototpye properties are instance-specific, we define it there.
};

// Aliases
const fn = FunctionInstance;

const getter = {
  get: fn,
  set: 'undefined',
};

// Possible but not encpintered in the specs
// const setter = {
//   get: 'undefined',
//   set: fn,
// };

// 19.5.6 NativeError Object Structure
function NativeError(prototype) {
  return {
    // 19.5.6.2 Properties of the NativeError Constructors
    '**proto**': 'Error',

    // 19.5.6.2.1 NativeError.prototype
    prototype,

    // Add function instance properties to avoid mixin.
    // 19.2.4.1 length
    length: 'number',
    // 19.2.4.2 name
    name: 'string',
  };
}

function NativeErrorPrototype(constructor) {
  return {
    // 19.5.6.3 Properties of the NativeError Prototype Objects
    '**proto**': 'ErrorPrototype',
    // 19.5.6.3.1 NativeError.prototype.constructor
    constructor,
    // 19.5.6.3.2 NativeError.prototype.message
    message: 'string',
    // 19.5.6.3.3 NativeError.prototype.name
    name: 'string',
    // TODO: not mentioned.
    toString: fn,
  };
}

// 22.2.4 The TypedArray Constructors
function TypedArray(prototype) {
  return {
    // 22.2.5 Properties of the TypedArray Constructors
    '**proto**': 'TypedArray',

    // Add function instance properties
    // 19.2.4.1 length
    length: 'number',
    // 19.2.4.2 name
    name: 'string',

    // 22.2.5.1 TypedArray.BYTES_PER_ELEMENT
    BYTES_PER_ELEMENT: 'number',
    // 22.2.5.2 TypedArray.prototype
    prototype,
  };
}

function TypedArrayPrototype(constructor) {
  return {
    // 22.2.6 Properties of the TypedArray Prototype Objects
    '**proto**': 'TypedArrayPrototype',
    // 22.2.6.1 TypedArray.prototype.BYTES_PER_ELEMENT
    BYTES_PER_ELEMENT: 'number',
    // 22.2.6.2TypedArray.prototype.constructor
    constructor,
  };
}

export default {
  // ECMA https://tc39.es/ecma262

  // The intrinsics object has not prototype to avoid conflicts.
  '**proto**': null,

  // 9.2.4.1% ThrowTypeError%
  ThrowTypeError: fn,

  // *** 18 The Global Object

  // *** 18.1 Value Properties of the Global Object

  // 18.1.1 Infinity
  Infinity: 'number',
  // 18.1.2 NaN
  NaN: 'number',
  // 18.1.3 undefined
  undefined: 'undefined',

  // *** 18.2 Function Properties of the Global Object

  // 18.2.1 eval
  eval: fn,
  // 18.2.2 isFinite
  isFinite: fn,
  // 18.2.3 isNaN
  isNaN: fn,
  // 18.2.4 parseFloat
  parseFloat: fn,
  // 18.2.5 parseInt
  parseInt: fn,
  // 18.2.6.2 decodeURI
  decodeURI: fn,
  // 18.2.6.3 decodeURIComponent
  decodeURIComponent: fn,
  // 18.2.6.4 encodeURI
  encodeURI: fn,
  // 18.2.6.5 encodeURIComponent
  encodeURIComponent: fn,

  // *** 19 Fundamental Objects

  Object: {
    // 19.1.2 Properties of the Object Constructor
    '**proto**': 'FunctionPrototype',
    // 19.1.2.1 Object.assign
    assign: fn,
    // 19.1.2.2 Object.create
    create: fn,
    // 19.1.2.3 Object.definePropertie
    defineProperties: fn,
    // 19.1.2.4 Object.defineProperty
    defineProperty: fn,
    // 19.1.2.5 Object.entries
    entries: fn,
    // 19.1.2.6 Object.freeze
    freeze: fn,
    // 19.1.2.7 Object.fromEntries
    fromEntries: fn,
    // 19.1.2.8 Object.getOwnPropertyDescriptor
    getOwnPropertyDescriptor: fn,
    // 19.1.2.9 Object.getOwnPropertyDescriptors
    getOwnPropertyDescriptors: fn,
    // 19.1.2.10 Object.getOwnPropertyNames
    getOwnPropertyNames: fn,
    // 19.1.2.11 Object.getOwnPropertySymbols
    getOwnPropertySymbols: fn,
    // 19.1.2.12 Object.getPrototypeOf
    getPrototypeOf: fn,
    // 19.1.2.13 Object.is
    is: fn,
    // 19.1.2.14 Object.isExtensible
    isExtensible: fn,
    // 19.1.2.15 Object.isFrozen
    isFrozen: fn,
    // 19.1.2.16 Object.isSealed
    isSealed: fn,
    // 19.1.2.17 Object.keys
    keys: fn,
    // 19.1.2.18 Object.preventExtensions
    preventExtensions: fn,
    // 19.1.2.19 Object.prototype
    prototype: 'ObjectPrototype',
    // 19.1.2.20 Object.seal
    seal: fn,
    // 19.1.2.21 Object.setPrototypeOf
    setPrototypeOf: fn,
    // 19.1.2.22 Object.values
    values: fn,
  },

  ObjectPrototype: {
    // 19.1.3 Properties of the Object Prototype Object
    '**proto**': null,
    // 19.1.3.1 Object.prototype.constructor
    constructor: 'Object',
    // 19.1.3.2 Object.prototype.hasOwnProperty
    hasOwnProperty: fn,
    // 19.1.3.3 Object.prototype.isPrototypeOf
    isPrototypeOf: fn,
    // 19.1.3.4 Object.prototype.propertyIsEnumerable
    propertyIsEnumerable: fn,
    // 19.1.3.5 Object.prototype.toLocaleString
    toLocaleString: fn,
    // 19.1.3.6 Object.prototype.toString
    toString: fn,
    // 19.1.3.7 Object.prototype.valueOf
    valueOf: fn,

    // B.2.2 Additional Properties of the Object.prototype Object

    // B.2.2.1 Object.prototype.__proto__
    // '**proto**': accessors,
    // B.2.2.2 Object.prototype.__defineGetter__
    __defineGetter__: fn,
    // B.2.2.3 Object.prototype.__defineSetter__
    __defineSetter__: fn,
    // B.2.2.4 Object.prototype.__lookupGetter__
    __lookupGetter__: fn,
    // B.2.2.5 Object.prototype.__lookupSetter__
    __lookupSetter__: fn,
  },

  Function: {
    // 19.2.2 Properties of the Function Constructor
    '**proto**': 'FunctionPrototype',
    // 19.2.2.1 Function.length
    length: 'number',
    // 19.2.2.2 Function.prototype
    prototype: 'FunctionPrototype',
  },

  FunctionPrototype: {
    // 19.2.3 Properties of the Function Prototype Object
    length: 'number',
    name: 'string',
    // 19.2.3.1 Function.prototype.apply
    apply: fn,
    // 19.2.3.2 Function.prototype.bind
    bind: fn,
    // 19.2.3.3 Function.prototype.call
    call: fn,
    // 19.2.3.4 Function.prototype.constructor
    constructor: 'Function',
    // 19.2.3.5 Function.prototype.toString
    toString: fn,
    // 19.2.3.6 Function.prototype [ @@hasInstance ]
    '@@hasInstance': fn,
  },

  Boolean: {
    // 19.3.2 Properties of the Boolean Constructor
    '**proto**': 'FunctionPrototype',
    // 19.3.2.1 Boolean.prototype
    prototype: 'BooleanPrototype',
  },

  BooleanPrototype: {
    // 19.3.3.1 Boolean.prototype.constructor
    constructor: 'Boolean',
    // 19.3.3.2 Boolean.prototype.toString
    toString: fn,
    // 19.3.3.3 Boolean.prototype.valueOf
    valueOf: fn,
  },

  Symbol: {
    // 19.4.2 Properties of the Symbol Constructor
    '**proto**': 'FunctionPrototype',
    // 19.4.2.1 Symbol.asyncIterator
    asyncIterator: 'symbol',
    // 19.4.2.2 Symbol.for
    for: fn,
    // 19.4.2.3 Symbol.hasInstance
    hasInstance: 'symbol',
    // 19.4.2.4 Symbol.isConcatSpreadable
    isConcatSpreadable: 'symbol',
    // 19.4.2.5 Symbol.iterator
    iterator: 'symbol',
    // 19.4.2.6 Symbol.keyFor
    keyFor: fn,
    // 19.4.2.7 Symbol.match
    match: 'symbol',
    // 19.4.2.8 Symbol.matchAll
    matchAll: 'symbol',
    // 19.4.2.9 Symbol.prototype
    prototype: 'SymbolPrototype',
    // 19.4.2.10 Symbol.replace
    replace: 'symbol',
    // 19.4.2.11 Symbol.search
    search: 'symbol',
    // 19.4.2.12 Symbol.species
    species: 'symbol',
    // 19.4.2.13 Symbol.split
    split: 'symbol',
    // 19.4.2.14 Symbol.toPrimitive
    toPrimitive: 'symbol',
    // 19.4.2.15 Symbol.toStringTag
    toStringTag: 'symbol',
    // 19.4.2.16 Symbol.unscopables
    unscopables: 'symbol',
  },

  SymbolPrototype: {
    // 19.4.3 Properties of the Symbol Prototype Object

    // 19.4.3.1 Symbol.prototype.constructor
    constructor: 'Symbol',
    // 19.4.3.2 get Symbol.prototype.description
    description: getter,
    // 19.4.3.3 Symbol.prototype.toString
    toString: fn,
    // 19.4.3.4 Symbol.prototype.valueOf
    valueOf: fn,
    // 19.4.3.5 Symbol.prototype [ @@toPrimitive ]
    '@@toPrimitive': fn,
    // 19.4.3.6 Symbol.prototype [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  Error: {
    // 19.5.2 Properties of the Error Constructor
    '**proto**': 'FunctionPrototype',
    // 19.5.2.1 Error.prototype
    prototype: 'ErrorPrototype',
  },

  ErrorPrototype: {
    // 19.5.3.1 Error.prototype.constructor
    constructor: 'Error',
    // 19.5.3.2 Error.prototype.message
    message: 'string',
    // 19.5.3.3 Error.prototype.name
    name: 'string',
    // 19.5.3.4 Error.prototype.toString
    toString: fn,
  },

  // 19.5.6.1.1 NativeError

  EvalError: NativeError('EvalErrorPrototype'),
  RangeError: NativeError('RangeErrorPrototype'),
  ReferenceError: NativeError('ReferenceErrorPrototype'),
  SyntaxError: NativeError('SyntaxErrorPrototype'),
  TypeError: NativeError('TypeErrorPrototype'),
  URIError: NativeError('URIErrorPrototype'),

  EvalErrorPrototype: NativeErrorPrototype('EvalError'),
  RangeErrorPrototype: NativeErrorPrototype('RangeError'),
  ReferenceErrorPrototype: NativeErrorPrototype('ReferenceError'),
  SyntaxErrorPrototype: NativeErrorPrototype('SyntaxError'),
  TypeErrorPrototype: NativeErrorPrototype('TypeError'),
  URIErrorPrototype: NativeErrorPrototype('URIError'),

  // *** 20 Numbers and Dates

  Number: {
    // 20.1.2 Properties of the Number Constructor
    '**proto**': 'FunctionPrototype',
    // 20.1.2.1 Number.EPSILON
    EPSILON: 'number',
    // 20.1.2.2 Number.isFinite
    isFinite: fn,
    // 20.1.2.3 Number.isInteger
    isInteger: fn,
    // 20.1.2.4 Number.isNaN
    isNaN: fn,
    // 20.1.2.5 Number.isSafeInteger
    isSafeInteger: fn,
    // 20.1.2.6 Number.MAX_SAFE_INTEGER
    MAX_SAFE_INTEGER: 'number',
    // 20.1.2.7 Number.MAX_VALUE
    MAX_VALUE: 'number',
    // 20.1.2.8 Number.MIN_SAFE_INTEGER
    MIN_SAFE_INTEGER: 'number',
    // 20.1.2.9 Number.MIN_VALUE
    MIN_VALUE: 'number',
    // 20.1.2.10 Number.NaN
    NaN: 'number',
    // 20.1.2.11 Number.NEGATIVE_INFINITY
    NEGATIVE_INFINITY: 'number',
    // 20.1.2.12 Number.parseFloat
    parseFloat: fn,
    // 20.1.2.13 Number.parseInt
    parseInt: fn,
    // 20.1.2.14 Number.POSITIVE_INFINITY
    POSITIVE_INFINITY: 'number',
    // 20.1.2.15 Number.prototype
    prototype: 'NumberPrototype',
  },

  NumberPrototype: {
    // 20.1.3 Properties of the Number Prototype Object

    // 20.1.3.1 Number.prototype.constructor
    constructor: 'Number',
    // 20.1.3.2 Number.prototype.toExponential
    toExponential: fn,
    // 20.1.3.3 Number.prototype.toFixed
    toFixed: fn,
    // 20.1.3.4 Number.prototype.toLocaleString
    toLocaleString: fn,
    // 20.1.3.5 Number.prototype.toPrecision
    toPrecision: fn,
    // 20.1.3.6 Number.prototype.toString
    toString: fn,
    // 20.1.3.7 Number.prototype.valueOf
    valueOf: fn,
  },

  BigInt: {
    // 20.2.2Properties of the BigInt Constructor
    '**proto**': 'FunctionPrototype',
    // 20.2.2.1 BigInt.asIntN
    asIntN: fn,
    // 20.2.2.2 BigInt.asUintN
    asUintN: fn,
    // 20.2.2.3 BigInt.prototype
    prototype: 'BigIntPrototype',
  },

  BigIntPrototype: {
    // 20.2.3.1 BigInt.prototype.constructor
    constructor: 'BigInt',
    // 20.2.3.2 BigInt.prototype.toLocaleString
    toLocaleString: fn,
    // 20.2.3.3 BigInt.prototype.toString
    toString: fn,
    // 20.2.3.4 BigInt.prototype.valueOf
    valueOf: fn,
    // 20.2.3.5 BigInt.prototype [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  Math: {
    // 20.3.1.1 Math.E
    E: 'number',
    // 20.3.1.2 Math.LN10
    LN10: 'number',
    // 20.3.1.3 Math.LN2
    LN2: 'number',
    // 20.3.1.4 Math.LOG10E
    LOG10E: 'number',
    // 20.3.1.5 Math.LOG2E
    LOG2E: 'number',
    // 20.3.1.6 Math.PI
    PI: 'number',
    // 20.3.1.7 Math.SQRT1_2
    SQRT1_2: 'number',
    // 20.3.1.8 Math.SQRT2
    SQRT2: 'number',
    // 20.3.1.9 Math [ @@toStringTag ]
    '@@toStringTag': 'string',
    // 20.3.2.1 Math.abs
    abs: fn,
    // 20.3.2.2 Math.acos
    acos: fn,
    // 20.3.2.3 Math.acosh
    acosh: fn,
    // 20.3.2.4 Math.asin
    asin: fn,
    // 20.3.2.5 Math.asinh
    asinh: fn,
    // 20.3.2.6 Math.atan
    atan: fn,
    // 20.3.2.7 Math.atanh
    atanh: fn,
    // 20.3.2.8 Math.atan2
    atan2: fn,
    // 20.3.2.9 Math.cbrt
    cbrt: fn,
    // 20.3.2.10 Math.ceil
    ceil: fn,
    // 20.3.2.11 Math.clz32
    clz32: fn,
    // 20.3.2.12 Math.cos
    cos: fn,
    // 20.3.2.13 Math.cosh
    cosh: fn,
    // 20.3.2.14 Math.exp
    exp: fn,
    // 20.3.2.15 Math.expm1
    expm1: fn,
    // 20.3.2.16 Math.floor
    floor: fn,
    // 20.3.2.17 Math.fround
    fround: fn,
    // 20.3.2.18 Math.hypot
    hypot: fn,
    // 20.3.2.19 Math.imul
    imul: fn,
    // 20.3.2.20 Math.log
    log: fn,
    // 20.3.2.21 Math.log1p
    log1p: fn,
    // 20.3.2.22 Math.log10
    log10: fn,
    // 20.3.2.23 Math.log2
    log2: fn,
    // 20.3.2.24 Math.max
    max: fn,
    // 20.3.2.25 Math.min
    min: fn,
    // 20.3.2.26Math.pow
    pow: fn,
    // 20.3.2.27Math.random
    random: fn,
    // 20.3.2.28 Math.round
    round: fn,
    // 20.3.2.29 Math.sign
    sign: fn,
    // 20.3.2.30 Math.sin
    sin: fn,
    // 20.3.2.31 Math.sinh
    sinh: fn,
    // 20.3.2.32 Math.sqrt
    sqrt: fn,
    // 20.3.2.33 Math.tan
    tan: fn,
    // 20.3.2.34 Math.tanh
    tanh: fn,
    // 20.3.2.35 Math.trunc
    trunc: fn,
    // 20.3.2.35Math.trunc
  },

  Date: {
    // 20.4.3 Properties of the Date Constructor
    '**proto**': 'FunctionPrototype',
    // 20.4.3.1 Date.now
    now: fn,
    // 20.4.3.2 Date.parse
    parse: fn,
    // 20.4.3.3 Date.prototype
    prototype: 'DatePrototype',
    // 20.4.3.4 Date.UTC
    UTC: fn,
  },

  DatePrototype: {
    // 20.4.4.1 Date.prototype.constructor
    constructor: 'Date',
    // 20.4.4.2 Date.prototype.getDate
    getDate: fn,
    // 20.4.4.3 Date.prototype.getDay
    getDay: fn,
    // 20.4.4.4 Date.prototype.getFullYear
    getFullYear: fn,
    // 20.4.4.5 Date.prototype.getHours
    getHours: fn,
    // 20.4.4.6 Date.prototype.getMilliseconds
    getMilliseconds: fn,
    // 20.4.4.7 Date.prototype.getMinutes
    getMinutes: fn,
    // 20.4.4.8 Date.prototype.getMonth
    getMonth: fn,
    // 20.4.4.9 Date.prototype.getSeconds
    getSeconds: fn,
    // 20.4.4.10 Date.prototype.getTime
    getTime: fn,
    // 20.4.4.11 Date.prototype.getTimezoneOffset
    getTimezoneOffset: fn,
    // 20.4.4.12 Date.prototype.getUTCDate
    getUTCDate: fn,
    // 20.4.4.13 Date.prototype.getUTCDay
    getUTCDay: fn,
    // 20.4.4.14 Date.prototype.getUTCFullYear
    getUTCFullYear: fn,
    // 20.4.4.15 Date.prototype.getUTCHours
    getUTCHours: fn,
    // 20.4.4.16 Date.prototype.getUTCMilliseconds
    getUTCMilliseconds: fn,
    // 20.4.4.17 Date.prototype.getUTCMinutes
    getUTCMinutes: fn,
    // 20.4.4.18 Date.prototype.getUTCMonth
    getUTCMonth: fn,
    // 20.4.4.19 Date.prototype.getUTCSeconds
    getUTCSeconds: fn,
    // 20.4.4.20 Date.prototype.setDate
    setDate: fn,
    // 20.4.4.21 Date.prototype.setFullYear
    setFullYear: fn,
    // 20.4.4.22 Date.prototype.setHours
    setHours: fn,
    // 20.4.4.23 Date.prototype.setMilliseconds
    setMilliseconds: fn,
    // 20.4.4.24 Date.prototype.setMinutes
    setMinutes: fn,
    // 20.4.4.25 Date.prototype.setMonth
    setMonth: fn,
    // 20.4.4.26 Date.prototype.setSeconds
    setSeconds: fn,
    // 20.4.4.27 Date.prototype.setTime
    setTime: fn,
    // 20.4.4.28 Date.prototype.setUTCDate
    setUTCDate: fn,
    // 20.4.4.29 Date.prototype.setUTCFullYear
    setUTCFullYear: fn,
    // 20.4.4.30 Date.prototype.setUTCHours
    setUTCHours: fn,
    // 20.4.4.31 Date.prototype.setUTCMilliseconds
    setUTCMilliseconds: fn,
    // 20.4.4.32 Date.prototype.setUTCMinutes
    setUTCMinutes: fn,
    // 20.4.4.33 Date.prototype.setUTCMonth
    setUTCMonth: fn,
    // 20.4.4.34 Date.prototype.setUTCSeconds
    setUTCSeconds: fn,
    // 20.4.4.35 Date.prototype.toDateString
    toDateString: fn,
    // 20.4.4.36 Date.prototype.toISOString
    toISOString: fn,
    // 20.4.4.37 Date.prototype.toJSON
    toJSON: fn,
    // 20.4.4.38 Date.prototype.toLocaleDateString
    toLocaleDateString: fn,
    // 20.4.4.39 Date.prototype.toLocaleString
    toLocaleString: fn,
    // 20.4.4.40 Date.prototype.toLocaleTimeString
    toLocaleTimeString: fn,
    // 20.4.4.41 Date.prototype.toString
    toString: fn,
    // 20.4.4.42 Date.prototype.toTimeString
    toTimeString: fn,
    // 20.4.4.43 Date.prototype.toUTCString
    toUTCString: fn,
    // 20.4.4.44 Date.prototype.valueOf
    valueOf: fn,
    // 20.4.4.45 Date.prototype [ @@toPrimitive ]
    '@@toPrimitive': fn,

    // B.2.4 Additional Properties of the Date.prototype Object

    // B.2.4.1 Date.prototype.getYear
    getYear: fn,
    // B.2.4.2 Date.prototype.setYear
    setYear: fn,
    // B.2.4.3 Date.prototype.toGMTString
    toGMTString: fn,
  },

  // 21 Text Processing

  String: {
    // 21.1.2 Properties of the String Constructor
    '**proto**': 'FunctionPrototype',
    // 21.1.2.1 String.fromCharCode
    fromCharCode: fn,
    // 21.1.2.2 String.fromCodePoint
    fromCodePoint: fn,
    // 21.1.2.3 String.prototype
    prototype: 'StringPrototype',
    // 21.1.2.4 String.raw
    raw: fn,
  },

  StringPrototype: {
    // 21.1.3 Properties of the String Prototype Object
    length: 'number',
    // 21.1.3.1 String.prototype.charAt
    charAt: fn,
    // 21.1.3.2 String.prototype.charCodeAt
    charCodeAt: fn,
    // 21.1.3.3 String.prototype.codePointAt
    codePointAt: fn,
    // 21.1.3.4 String.prototype.concat
    concat: fn,
    // 21.1.3.5 String.prototype.constructor
    constructor: 'String',
    // 21.1.3.6 String.prototype.endsWith
    endsWith: fn,
    // 21.1.3.7 String.prototype.includes
    includes: fn,
    // 21.1.3.8 String.prototype.indexOf
    indexOf: fn,
    // 21.1.3.9 String.prototype.lastIndexOf
    lastIndexOf: fn,
    // 21.1.3.10 String.prototype.localeCompare
    localeCompare: fn,
    // 21.1.3.11 String.prototype.match
    match: fn,
    // 21.1.3.12 String.prototype.matchAll
    matchAll: fn,
    // 21.1.3.13 String.prototype.normalize
    normalize: fn,
    // 21.1.3.14 String.prototype.padEnd
    padEnd: fn,
    // 21.1.3.15 String.prototype.padStart
    padStart: fn,
    // 21.1.3.16 String.prototype.repeat
    repeat: fn,
    // 21.1.3.17 String.prototype.replace
    replace: fn,
    // 21.1.3.18 String.prototype.search
    search: fn,
    // 21.1.3.19 String.prototype.slice
    slice: fn,
    // 21.1.3.20 String.prototype.split
    split: fn,
    // 21.1.3.21 String.prototype.startsWith
    startsWith: fn,
    // 21.1.3.22 String.prototype.substring
    substring: fn,
    // 21.1.3.23 String.prototype.toLocaleLowerCase
    toLocaleLowerCase: fn,
    // 21.1.3.24 String.prototype.toLocaleUpperCase
    toLocaleUpperCase: fn,
    // 21.1.3.25 String.prototype.toLowerCase
    toLowerCase: fn,
    // 21.1.3.26 String.prototype.
    toString: fn,
    // 21.1.3.27 String.prototype.toUpperCase
    toUpperCase: fn,
    // 21.1.3.28 String.prototype.trim
    trim: fn,
    // 21.1.3.29 String.prototype.trimEnd
    trimEnd: fn,
    // 21.1.3.30 String.prototype.trimStart
    trimStart: fn,
    // 21.1.3.31 String.prototype.valueOf
    valueOf: fn,
    // 21.1.3.32 String.prototype [ @@iterator ]
    '@@iterator': fn,

    // B.2.3 Additional Properties of the String.prototype Object

    // B.2.3.1 String.prototype.substr
    substr: fn,
    // B.2.3.2 String.prototype.anchor
    anchor: fn,
    // B.2.3.3 String.prototype.big
    big: fn,
    // B.2.3.4 String.prototype.blink
    blink: fn,
    // B.2.3.5 String.prototype.bold
    bold: fn,
    // B.2.3.6 String.prototype.fixed
    fixed: fn,
    // B.2.3.7 String.prototype.fontcolor
    fontcolor: fn,
    // B.2.3.8 String.prototype.fontsize
    fontsize: fn,
    // B.2.3.9 String.prototype.italics
    italics: fn,
    // B.2.3.10 String.prototype.link
    link: fn,
    // B.2.3.11 String.prototype.small
    small: fn,
    // B.2.3.12 String.prototype.strike
    strike: fn,
    // B.2.3.13 String.prototype.sub
    sub: fn,
    // B.2.3.14 String.prototype.sup
    sup: fn,
    // B.2.3.15 String.prototype.trimLeft
    trimLeft: fn,
    // B.2.3.15 String.prototype.trimRight
    trimRight: fn,
  },

  StringIteratorPrototype: {
    // 21.1.5.2 he %StringIteratorPrototype% Object
    '**proto**': 'IteratorPrototype',
    // 21.1.5.2.1 %StringIteratorPrototype%.next ( )
    next: fn,
    // 21.1.5.2.2 %StringIteratorPrototype% [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  RegExp: {
    // 21.2.4 Properties of the RegExp Constructor
    '**proto**': 'FunctionPrototype',
    // 21.2.4.1 RegExp.prototype
    prototype: 'RegExpPrototype',
    // 21.2.4.2 get RegExp [ @@species ]
    '@@species': getter,
  },

  RegExpPrototype: {
    // 21.2.5 Properties of the RegExp Prototype Object
    // 21.2.5.1 RegExp.prototype.constructor
    constructor: 'RegExp',
    // 21.2.5.2 RegExp.prototype.exec
    exec: fn,
    // 21.2.5.3 get RegExp.prototype.dotAll
    dotAll: getter,
    // 21.2.5.4 get RegExp.prototype.flags
    flags: getter,
    // 21.2.5.5 get RegExp.prototype.global
    global: getter,
    // 21.2.5.6 get RegExp.prototype.ignoreCase
    ignoreCase: getter,
    // 21.2.5.7 RegExp.prototype [ @@match ]
    '@@match': fn,
    // 21.2.5.8 RegExp.prototype [ @@matchAll ]
    '@@matchAll': fn,
    // 21.2.5.9 get RegExp.prototype.multiline
    multiline: getter,
    // 21.2.5.10 RegExp.prototype [ @@replace ]
    '@@replace': fn,
    // 21.2.5.11 RegExp.prototype [ @@search ]
    '@@search': fn,
    // 21.2.5.12 get RegExp.prototype.source
    source: getter,
    // 21.2.5.13 RegExp.prototype [ @@split ]
    '@@split': fn,
    // 21.2.5.14 get RegExp.prototype.sticky
    sticky: getter,
    // 21.2.5.15 RegExp.prototype.test
    test: fn,
    // 21.2.5.16 RegExp.prototype.toString
    toString: fn,
    // 21.2.5.17 get RegExp.prototype.unicode
    unicode: getter,

    // B.2.5 Additional Properties of the RegExp.prototype Object

    // B.2.5.1 RegExp.prototype.compile
    compile: false, // UNSAFE and suppressed.
  },

  RegExpStringIteratorPrototype: {
    // 21.2.7.1 The %RegExpStringIteratorPrototype% Object
    '**proto**': 'IteratorPrototype',
    // 21.2.7.1.1 %RegExpStringIteratorPrototype%.next
    next: fn,
    // 21.2.7.1.2 %RegExpStringIteratorPrototype% [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  // 22 Indexed Collections

  Array: {
    // 22.1.2 Properties of the Array Constructor
    '**proto**': 'FunctionPrototype',
    // 22.1.2.1 Array.from
    from: fn,
    // 22.1.2.2 Array.isArray
    isArray: fn,
    // 22.1.2.3 Array.of
    of: fn,
    // 22.1.2.4 Array.prototype
    prototype: 'ArrayPrototype',
    // 22.1.2.5 get Array [ @@species ]
    '@@species': getter,
  },

  ArrayPrototype: {
    // 22.1.3 Properties of the Array Prototype Object
    length: 'number',
    // 22.1.3.1 Array.prototype.concat
    concat: fn,
    // 22.1.3.2 Array.prototype.constructor
    constructor: 'Array',
    // 22.1.3.3 Array.prototype.copyWithin
    copyWithin: fn,
    // 22.1.3.4 Array.prototype.entries
    entries: fn,
    // 22.1.3.5 Array.prototype.every
    every: fn,
    // 22.1.3.6 Array.prototype.fill
    fill: fn,
    // 22.1.3.7 Array.prototype.filter
    filter: fn,
    // 22.1.3.8 Array.prototype.find
    find: fn,
    // 22.1.3.9 Array.prototype.findIndex
    findIndex: fn,
    // 22.1.3.10 Array.prototype.flat
    flat: fn,
    // 22.1.3.11 Array.prototype.flatMap
    flatMap: fn,
    // 22.1.3.12 Array.prototype.forEach
    forEach: fn,
    // 22.1.3.13 Array.prototype.includes
    includes: fn,
    // 22.1.3.14 Array.prototype.indexOf
    indexOf: fn,
    // 22.1.3.15 Array.prototype.join
    join: fn,
    // 22.1.3.16 Array.prototype.keys
    keys: fn,
    // 22.1.3.17 Array.prototype.lastIndexOf
    lastIndexOf: fn,
    // 22.1.3.18 Array.prototype.map
    map: fn,
    // 22.1.3.19 Array.prototype.pop
    pop: fn,
    // 22.1.3.20 Array.prototype.push
    push: fn,
    // 22.1.3.21 Array.prototype.reduce
    reduce: fn,
    // 22.1.3.22 Array.prototype.reduceRight
    reduceRight: fn,
    // 22.1.3.23 Array.prototype.reverse
    reverse: fn,
    // 22.1.3.24 Array.prototype.shift
    shift: fn,
    // 22.1.3.25 Array.prototype.slice
    slice: fn,
    // 22.1.3.26 Array.prototype.some
    some: fn,
    // 22.1.3.27 Array.prototype.sort
    sort: fn,
    // 22.1.3.28 Array.prototype.splice
    splice: fn,
    // 22.1.3.29 Array.prototype.toLocaleString
    toLocaleString: fn,
    // 22.1.3.30 Array.prototype.toString
    toString: fn,
    // 22.1.3.31 Array.prototype.unshift
    unshift: fn,
    // 22.1.3.32 Array.prototype.values
    values: fn,
    // 22.1.3.33 Array.prototype [ @@iterator ]
    '@@iterator': fn,
    // 22.1.3.34 Array.prototype [ @@unscopables ]
    '@@unscopables': {
      '**proto**': null,
      copyWithin: 'boolean',
      entries: 'boolean',
      fill: 'boolean',
      find: 'boolean',
      findIndex: 'boolean',
      flat: 'boolean',
      flatMap: 'boolean',
      includes: 'boolean',
      keys: 'boolean',
      values: 'boolean',
    },
  },

  ArrayIteratorPrototype: {
    // 22.1.5.2 The %ArrayIteratorPrototype% Object
    '**proto**': 'IteratorPrototype',
    // 22.1.5.2.1 %ArrayIteratorPrototype%.next
    next: fn,
    // 22.1.5.2.2 %ArrayIteratorPrototype% [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  // *** 22.2 TypedArray Objects

  TypedArray: {
    // 22.2.2 Properties of the %TypedArray% Intrinsic Object
    '**proto**': 'FunctionPrototype',
    // 22.2.2.1 %TypedArray%.from
    from: fn,
    // 22.2.2.2 %TypedArray%.of
    of: fn,
    // 22.2.2.3 %TypedArray%.prototype
    prototype: 'TypedArrayPrototype',
    // 22.2.2.4 get %TypedArray% [ @@species ]
    '@@species': getter,
  },

  TypedArrayPrototype: {
    // 22.2.3.1 get %TypedArray%.prototype.buffer
    buffer: getter,
    // 22.2.3.2 get %TypedArray%.prototype.byteLength
    byteLength: getter,
    // 22.2.3.3 get %TypedArray%.prototype.byteOffset
    byteOffset: getter,
    // 22.2.3.4 %TypedArray%.prototype.constructor
    constructor: 'TypedArray',
    // 22.2.3.5 %TypedArray%.prototype.copyWithin
    copyWithin: fn,
    // 22.2.3.6 %TypedArray%.prototype.entries
    entries: fn,
    // 22.2.3.7 %TypedArray%.prototype.every
    every: fn,
    // 22.2.3.8 %TypedArray%.prototype.fill
    fill: fn,
    // 22.2.3.9 %TypedArray%.prototype.filter
    filter: fn,
    // 22.2.3.10 %TypedArray%.prototype.find
    find: fn,
    // 22.2.3.11 %TypedArray%.prototype.findIndex
    findIndex: fn,
    // 22.2.3.12 %TypedArray%.prototype.forEach
    forEach: fn,
    // 22.2.3.13 %TypedArray%.prototype.includes
    includes: fn,
    // 22.2.3.14 %TypedArray%.prototype.indexOf
    indexOf: fn,
    // 22.2.3.15 %TypedArray%.prototype.join
    join: fn,
    // 22.2.3.16 %TypedArray%.prototype.keys
    keys: fn,
    // 22.2.3.17 %TypedArray%.prototype.lastIndexOf
    lastIndexOf: fn,
    // 22.2.3.18 get %TypedArray%.prototype.length
    length: getter,
    // 22.2.3.19 %TypedArray%.prototype.map
    map: fn,
    // 22.2.3.20 %TypedArray%.prototype.reduce
    reduce: fn,
    // 22.2.3.21 %TypedArray%.prototype.reduceRight
    reduceRight: fn,
    // 22.2.3.22 %TypedArray%.prototype.reverse
    reverse: fn,
    // 22.2.3.23 %TypedArray%.prototype.set
    set: fn,
    // 22.2.3.24 %TypedArray%.prototype.slice
    slice: fn,
    // 22.2.3.25 %TypedArray%.prototype.some
    some: fn,
    // 22.2.3.26 %TypedArray%.prototype.sort
    sort: fn,
    // 22.2.3.27 %TypedArray%.prototype.subarray
    subarray: fn,
    // 22.2.3.28 %TypedArray%.prototype.toLocaleString
    toLocaleString: fn,
    // 22.2.3.29 %TypedArray%.prototype.toString
    toString: fn,
    // 22.2.3.30 %TypedArray%.prototype.values
    values: fn,
    // 22.2.3.31 %TypedArray%.prototype [ @@iterator ]
    '@@iterator': fn,
    // 22.2.3.32 get %TypedArray%.prototype [ @@toStringTag ]
    '@@toStringTag': getter,
  },

  // 22.2.4 The TypedArray Constructors

  BigInt64Array: TypedArray('BigInt64ArrayPrototype'),
  BigUint64Array: TypedArray('BigUint64ArrayPrototype'),
  Float32Array: TypedArray('Float32ArrayPrototype'),
  Float64Array: TypedArray('Float64ArrayPrototype'),
  Int16Array: TypedArray('Int16ArrayPrototype'),
  Int32Array: TypedArray('Int32ArrayPrototype'),
  Int8Array: TypedArray('Int8ArrayPrototype'),
  Uint16Array: TypedArray('Uint16ArrayPrototype'),
  Uint32Array: TypedArray('Uint32ArrayPrototype'),
  Uint8Array: TypedArray('Uint8ArrayPrototype'),
  Uint8ClampedArray: TypedArray('Uint8ClampedArrayPrototype'),

  BigInt64ArrayPrototype: TypedArrayPrototype('BigInt64Array'),
  BigUint64ArrayPrototype: TypedArrayPrototype('BigUint64Array'),
  Float32ArrayPrototype: TypedArrayPrototype('Float32Array'),
  Float64ArrayPrototype: TypedArrayPrototype('Float64Array'),
  Int16ArrayPrototype: TypedArrayPrototype('Int16Array'),
  Int32ArrayPrototype: TypedArrayPrototype('Int32Array'),
  Int8ArrayPrototype: TypedArrayPrototype('Int8Array'),
  Uint16ArrayPrototype: TypedArrayPrototype('Uint16Array'),
  Uint32ArrayPrototype: TypedArrayPrototype('Uint32Array'),
  Uint8ArrayPrototype: TypedArrayPrototype('Uint8Array'),
  Uint8ClampedArrayPrototype: TypedArrayPrototype('Uint8ClampedArray'),

  // *** 23 Keyed Collections

  Map: {
    // 23.1.2 Properties of the Map Constructor
    '**proto**': 'FunctionPrototype',
    // 23.2.2.2 get Set [ @@species ]
    '@@species': getter,
    prototype: 'MapPrototype',
  },

  MapPrototype: {
    // 23.1.3.1 Map.prototype.clear
    clear: fn,
    // 23.1.3.2 Map.prototype.constructor
    constructor: 'Map',
    // 23.1.3.3 Map.prototype.delete
    delete: fn,
    // 23.1.3.4 Map.prototype.entries
    entries: fn,
    // 23.1.3.5 Map.prototype.forEach
    forEach: fn,
    // 23.1.3.6 Map.prototype.get
    get: fn,
    // 23.1.3.7 Map.prototype.has
    has: fn,
    // 23.1.3.8 Map.prototype.keys
    keys: fn,
    // 23.1.3.9 Map.prototype.set
    set: fn,
    // 23.1.3.10 get Map.prototype.size
    size: getter,
    // 23.1.3.11 Map.prototype.values
    values: fn,
  },

  MapIteratorPrototype: {
    // 23.1.5.2 The %MapIteratorPrototype% Object
    '**proto**': 'IteratorPrototype',
    // 23.1.5.2.1 %MapIteratorPrototype%.next
    next: fn,
    // 23.1.5.2.2 %MapIteratorPrototype% [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  Set: {
    // 23.2.2 Properties of the Set Constructor
    '**proto**': 'FunctionPrototype',
    // 23.2.2.2 get Set [ @@species ]
    '@@species': getter,
    prototype: 'SetPrototype',
  },

  SetPrototype: {
    // 23.2.3.1 Set.prototype.add
    add: fn,
    // 23.2.3.2 Set.prototype.clear
    clear: fn,
    // 23.2.3.3 Set.prototype.constructor
    constructor: 'Set',
    // 23.2.3.4 Set.prototype.delete
    delete: fn,
    // 23.2.3.5 Set.prototype.entries
    entries: fn,
    // 23.2.3.6Set.prototype.forEach
    forEach: fn,
    // 23.2.3.7 Set.prototype.has
    has: fn,
    // 23.2.3.8 Set.prototype.keys
    keys: fn,
    // 23.2.3.9 get Set.prototype.size
    size: getter,
    // 23.2.3.10 Set.prototype.values
    values: fn,
    // 3.2.3.11 Set.prototype [ @@iterator ]
    '@@iterator': fn,
    // 23.2.3.12 Set.prototype [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  SetIteratorPrototype: {
    // 23.2.5.2 The %SetIteratorPrototype% Object
    '**proto**': 'IteratorPrototype',
    // 23.2.5.2.1 %SetIteratorPrototype%.next
    next: fn,
    // 23.2.5.2.2 %SetIteratorPrototype% [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  WeakMap: {
    // 23.3.2 Properties of the WeakMap Constructor
    '**proto**': 'FunctionPrototype',
    // 23.3.2.1 WeakMap.prototype
    prototype: 'WeakMapPrototype',
  },

  WeakMapPrototype: {
    // 23.3.3.1 WeakMap.prototype.constructor
    constructor: 'WeakMap',
    // 23.3.3.2 WeakMap.prototype.delete
    delete: fn,
    // 23.3.3.3 WeakMap.prototype.get
    get: fn,
    // 23.3.3.4 WeakMap.prototype.has
    has: fn,
    // 23.3.3.5 WeakMap.prototype.set
    set: fn,
    // 23.3.3.6 WeakMap.prototype [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  WeakSet: {
    // 23.4.2Properties of the WeakSet Constructor
    '**proto**': 'FunctionPrototype',
    // 23.4.2.1 WeakSet.prototype
    prototype: 'WeakSetPrototype',
  },

  WeakSetPrototype: {
    // 23.4.3.1 WeakSet.prototype.add
    add: fn,
    // 23.4.3.2 WeakSet.prototype.constructor
    constructor: 'WeakSet',
    // 23.4.3.3 WeakSet.prototype.delete
    delete: fn,
    // 23.4.3.4 WeakSet.prototype.has
    has: fn,
  },

  // *** 24 Structured Data

  ArrayBuffer: {
    // 24.1.3 Properties of the ArrayBuffer Constructor
    '**proto**': 'FunctionPrototype',
    // 24.1.3.1 ArrayBuffer.isView
    isView: fn,
    // 24.1.3.2 ArrayBuffer.prototype
    prototype: 'ArrayBufferPrototype',
    // 24.1.3.3 get ArrayBuffer [ @@species ]
    '@@species': getter,
  },

  ArrayBufferPrototype: {
    // 24.1.4.1 get ArrayBuffer.prototype.byteLength
    byteLength: getter,
    // 24.1.4.2 ArrayBuffer.prototype.constructor
    constructor: 'ArrayBuffer',
    // 24.1.4.3 ArrayBuffer.prototype.slice
    slice: fn,
    // 24.1.4.4 ArrayBuffer.prototype [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  // 24.2 SharedArrayBuffer Objects
  SharedArrayBuffer: false, // UNSAFE and purposely suppressed.

  DataView: {
    // 24.3.3 Properties of the DataView Constructor
    '**proto**': 'FunctionPrototype',
    // 24.3.3.1 DataView.prototype
    prototype: 'DataViewPrototype',
  },

  DataViewPrototype: {
    // 24.3.4.1 get DataView.prototype.buffer
    buffer: getter,
    // 24.3.4.2 get DataView.prototype.byteLength
    byteLength: getter,
    // 24.3.4.3 get DataView.prototype.byteOffset
    byteOffset: getter,
    // 24.3.4.4 DataView.prototype.constructor
    constructor: 'DataView',
    // 24.3.4.5 DataView.prototype.getBigInt64
    getBigInt64: fn,
    // 24.3.4.6 DataView.prototype.getBigUint64
    getBigUint64: fn,
    // 24.3.4.7 DataView.prototype.getFloat32
    getFloat32: fn,
    // 24.3.4.8 DataView.prototype.getFloat64
    getFloat64: fn,
    // 24.3.4.9 DataView.prototype.getInt8
    getInt8: fn,
    // 24.3.4.10 DataView.prototype.getInt16
    getInt16: fn,
    // 24.3.4.11 DataView.prototype.getInt32
    getInt32: fn,
    // 24.3.4.12 DataView.prototype.getUint8
    getUint8: fn,
    // 24.3.4.13 DataView.prototype.getUint16
    getUint16: fn,
    // 24.3.4.14 DataView.prototype.getUint32
    getUint32: fn,
    // 24.3.4.15 DataView.prototype.setBigInt64
    setBigInt64: fn,
    // 24.3.4.16 DataView.prototype.setBigUint64
    setBigUint64: fn,
    // 24.3.4.17 DataView.prototype.setFloat32
    setFloat32: fn,
    // 24.3.4.18 DataView.prototype.setFloat64
    setFloat64: fn,
    // 24.3.4.19 DataView.prototype.setInt8
    setInt8: fn,
    // 24.3.4.20 DataView.prototype.setInt16
    setInt16: fn,
    // 24.3.4.21 DataView.prototype.setInt32
    setInt32: fn,
    // 24.3.4.22 DataView.prototype.setUint8
    setUint8: fn,
    // 24.3.4.23 DataView.prototype.setUint16
    setUint16: fn,
    // 24.3.4.24 DataView.prototype.setUint32
    setUint32: fn,
    // 24.3.4.25 DataView.prototype [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  // 24.4 Atomics
  Atomics: false, // UNSAFE and suppressed.

  JSON: {
    // 24.5.1 JSON.parse
    parse: fn,
    // 24.5.2 JSON.stringify
    stringify: fn,
    // 24.5.3 JSON [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  // *** 25 Control Abstraction Objects

  IteratorPrototype: {
    // 25.1.2 The %IteratorPrototype% Object
    // 25.1.2.1 %IteratorPrototype% [ @@iterator ]
    '@@iterator': 'symbol',
  },

  AsyncIteratorPrototype: {
    // 25.1.3 The %AsyncIteratorPrototype% Object
    // 25.1.3.1 %AsyncIteratorPrototype% [ @@asyncIterator ]
    '@@asyncIterator': 'symbol',
  },

  GeneratorFunction: {
    // 25.2.2 Properties of the GeneratorFunction Constructor
    '**proto**': 'Function',
    name: 'string',
    // 25.2.2.1 GeneratorFunction.length
    length: 'number',
    // 25.2.2.2 GeneratorFunction.prototype
    prototype: 'Generator',
  },

  Generator: {
    // 25.2.3 Properties of the GeneratorFunction Prototype Object
    '**proto**': 'FunctionPrototype',
    // 25.2.3.1 GeneratorFunction.prototype.constructor
    constructor: 'GeneratorFunction',
    // 25.2.3.2 GeneratorFunction.prototype.prototype
    prototype: 'GeneratorPrototype',
  },

  AsyncGeneratorFunction: {
    // 25.3.2 Properties of the AsyncGeneratorFunction Constructor
    '**proto**': 'Function',
    name: 'string',
    // 25.3.2.1 AsyncGeneratorFunction.length
    length: 'number',
    // 25.3.2.2 AsyncGeneratorFunction.prototype
    prototype: 'AsyncGenerator',
  },

  AsyncGenerator: {
    // 25.3.3 Properties of the AsyncGeneratorFunction Prototype Object
    '**proto**': 'FunctionPrototype',
    // 25.3.3.1 AsyncGeneratorFunction.prototype.constructor
    constructor: 'AsyncGeneratorFunction',
    // 25.3.3.2 AsyncGeneratorFunction.prototype.prototype
    prototype: 'AsyncGeneratorPrototype',
    // 25.3.3.3 AsyncGeneratorFunction.prototype [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  GeneratorPrototype: {
    // 25.4.1 Properties of the Generator Prototype Object
    '**proto**': 'IteratorPrototype',
    // 25.4.1.1 Generator.prototype.constructor
    constructor: 'Generator',
    // 25.4.1.2 Generator.prototype.next
    next: fn,
    // 25.4.1.3 Generator.prototype.return
    return: fn,
    // 25.4.1.4 Generator.prototype.throw
    throw: fn,
    // 25.4.1.5 Generator.prototype [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  AsyncGeneratorPrototype: {
    // 25.5.1 Properties of the AsyncGenerator Prototype Object
    '**proto**': 'AsyncIteratorPrototype',
    // 25.5.1.1 AsyncGenerator.prototype.constructor
    constructor: 'AsyncGenerator',
    // 25.5.1.2 AsyncGenerator.prototype.next
    next: fn,
    // 25.5.1.3 AsyncGenerator.prototype.return
    return: fn,
    // 25.5.1.4 AsyncGenerator.prototype.throw
    throw: fn,
    // 25.5.1.5 AsyncGenerator.prototype [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  Promise: {
    // 25.6.4 Properties of the Promise Constructor
    '**proto**': 'FunctionPrototype',
    // 25.6.4.1 Promise.all
    all: fn,
    // 25.6.4.2 Promise.allSettled
    allSettled: fn,
    // 25.6.4.3Promise.prototype
    prototype: 'PromisePrototype',
    // 25.6.4.4 Promise.race
    race: fn,
    // 25.6.4.5 Promise.reject
    reject: fn,
    // 25.6.4.6 Promise.resolve
    resolve: fn,
    // 25.6.4.7 get Promise [ @@species ]
    '@@species': getter,
  },

  PromisePrototype: {
    // 25.6.5 Properties of the Promise Prototype Object
    // 25.6.5.1 Promise.prototype.catch
    catch: fn,
    // 25.6.5.2 Promise.prototype.constructor
    constructor: 'Promise',
    // 25.6.5.3 Promise.prototype.finally
    finally: fn,
    // 25.6.5.4 Promise.prototype.then
    then: fn,
    // 25.6.5.5 Promise.prototype [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  AsyncFunction: {
    // 25.7.2 Properties of the AsyncFunction Constructor
    '**proto**': 'Function',
    name: 'string',
    // 25.7.2.1 AsyncFunction.length
    length: 'number',
    // 25.7.2.2 AsyncFunction.prototype
    prototype: 'AsyncFunctionPrototype',
  },

  AsyncFunctionPrototype: {
    // 25.7.3 Properties of the AsyncFunction Prototype Object
    '**proto**': 'FunctionPrototype',
    // 25.7.3.1 AsyncFunction.prototype.constructor
    constructor: 'AsyncFunction',
    // 25.7.3.2 AsyncFunction.prototype [ @@toStringTag ]
    '@@toStringTag': 'string',
  },

  // 26 Reflection

  Reflect: {
    // 26.1 The Reflect Object
    // Not a function object.
    // 26.1.1 Reflect.apply
    apply: fn,
    // 26.1.2 Reflect.construct
    construct: fn,
    // 26.1.3 Reflect.defineProperty
    defineProperty: fn,
    // 26.1.4 Reflect.deleteProperty
    deleteProperty: fn,
    // 26.1.5 Reflect.get
    get: fn,
    // 26.1.6 Reflect.getOwnPropertyDescriptor
    getOwnPropertyDescriptor: fn,
    // 26.1.7 Reflect.getPrototypeOf
    getPrototypeOf: fn,
    // 26.1.8 Reflect.has
    has: fn,
    // 26.1.9 Reflect.isExtensible
    isExtensible: fn,
    // 26.1.10 Reflect.ownKeys
    ownKeys: fn,
    // 26.1.11 Reflect.preventExtensions
    preventExtensions: fn,
    // 26.1.12 Reflect.set
    set: fn,
    // 26.1.13 Reflect.setPrototypeOf
    setPrototypeOf: fn,
  },

  Proxy: {
    // 26.2.2 Properties of the Proxy Constructor
    '**proto**': 'FunctionPrototype',
    // 26.2.2.1 Proxy.revocable
    revocable: fn,
  },

  // Appendix B

  // B.2.1 Additional Properties of the Global Object

  // B.2.1.1 escape
  escape: fn,
  // B.2.1.2 unescape (
  unescape: fn,
};