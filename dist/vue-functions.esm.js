/*!
* vue-functions v2.0.0
* (c) phphe <phphe@outlook.com> (https://github.com/phphe)
* Released under the MIT License.
*/
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(iterateALL); // local store

function isObject(v) {
  return Object.prototype.toString.call(v) === '[object Object]';
}

function isFunction(v) {
  return typeof v === 'function';
}

function isPromise(v) {
  return Object.prototype.toString.call(v) === '[object Promise]';
}


function arrayRemove(arr, v) {
  var index;
  var count = 0;

  while ((index = arr.indexOf(v)) > -1) {
    arr.splice(index, 1);
    count++;
  }

  return count;
}


function iterateALL(val) {
  var opt,
      i,
      info,
      _i7,
      _Object$keys2,
      key,
      _info,
      _i8,
      _info2,
      keys,
      _i9,
      _keys2,
      _key2,
      _info3,
      _args = arguments;

  return regeneratorRuntime.wrap(function iterateALL$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          opt = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

          if (opt.reverse) {
            _context.next = 30;
            break;
          }

          if (!(val.length != null)) {
            _context.next = 14;
            break;
          }

          i = 0;

        case 4:
          if (!(i < val.length)) {
            _context.next = 12;
            break;
          }

          info = {
            value: val[i],
            index: i
          };

          if (!(!opt.exclude || !opt.exclude(info))) {
            _context.next = 9;
            break;
          }

          _context.next = 9;
          return info;

        case 9:
          i++;
          _context.next = 4;
          break;

        case 12:
          _context.next = 28;
          break;

        case 14:
          if (!isObject(val)) {
            _context.next = 27;
            break;
          }

          _i7 = 0, _Object$keys2 = Object.keys(val);

        case 16:
          if (!(_i7 < _Object$keys2.length)) {
            _context.next = 25;
            break;
          }

          key = _Object$keys2[_i7];
          _info = {
            value: val[key],
            key: key
          };

          if (!(!opt.exclude || !opt.exclude(_info))) {
            _context.next = 22;
            break;
          }

          _context.next = 22;
          return _info;

        case 22:
          _i7++;
          _context.next = 16;
          break;

        case 25:
          _context.next = 28;
          break;

        case 27:
          throw 'Unsupported type';

        case 28:
          _context.next = 58;
          break;

        case 30:
          if (!(val.length != null)) {
            _context.next = 42;
            break;
          }

          _i8 = val.length - 1;

        case 32:
          if (!(_i8 >= 0)) {
            _context.next = 40;
            break;
          }

          _info2 = {
            value: val[_i8],
            index: _i8
          };

          if (!(!opt.exclude || !opt.exclude(_info2))) {
            _context.next = 37;
            break;
          }

          _context.next = 37;
          return _info2;

        case 37:
          _i8--;
          _context.next = 32;
          break;

        case 40:
          _context.next = 58;
          break;

        case 42:
          if (!isObject(val)) {
            _context.next = 57;
            break;
          }

          keys = Object.keys(val);
          keys.reverse();
          _i9 = 0, _keys2 = keys;

        case 46:
          if (!(_i9 < _keys2.length)) {
            _context.next = 55;
            break;
          }

          _key2 = _keys2[_i9];
          _info3 = {
            value: val[_key2],
            key: _key2
          };

          if (!(!opt.exclude || !opt.exclude(_info3))) {
            _context.next = 52;
            break;
          }

          _context.next = 52;
          return _info3;

        case 52:
          _i9++;
          _context.next = 46;
          break;

        case 55:
          _context.next = 58;
          break;

        case 57:
          throw 'Unsupported type';

        case 58:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
} // source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string


function joinFunctionsByNext(funcs) {
  var next = function next() {};

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = iterateALL(funcs, {
      reverse: true
    })[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var func = _step5.value.value;
      var currentNext = next;
      next = wrapFuncWithNext(func, currentNext);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return next;

  function wrapFuncWithNext(func, next) {
    return function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key7 = 0; _key7 < _len5; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return func.apply(void 0, [next].concat(args));
    };
  }
} // promise


function onDOM(el, name, handler) {
  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key8 = 3; _key8 < _len6; _key8++) {
    args[_key8 - 3] = arguments[_key8];
  }

  if (el.addEventListener) {
    // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.addEventListener.apply(el, [name, handler].concat(args));
  } else if (el.attachEvent) {
    // IE 8 及更早 IE 版本
    el.attachEvent.apply(el, ["on".concat(name), handler].concat(args));
  }
}

function offDOM(el, name, handler) {
  for (var _len7 = arguments.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key9 = 3; _key9 < _len7; _key9++) {
    args[_key9 - 3] = arguments[_key9];
  }

  if (el.removeEventListener) {
    // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.removeEventListener.apply(el, [name, handler].concat(args));
  } else if (el.detachEvent) {
    // IE 8 及更早 IE 版本
    el.detachEvent.apply(el, ["on".concat(name), handler].concat(args));
  }
}

var _marked$1 =
/*#__PURE__*/
regeneratorRuntime.mark(iterateObjectWithoutDollarDash);
/**
 * [updatablePropsEvenUnbound description]
 * @param  {[type]} props [object or getter]
 * @return {[type]}       [description]
 * props eg: {
    value: {$localName: 'current', $localSetter: (value, vm)},
  }
   default localName is `localProps_${name}`
 */

function updatablePropsEvenUnbound(props) {
  if (isFunction(props)) {
    props = props();
  } else {
    // object
    props = Object.assign({}, props);
  }

  var standardProps = {}; // without key starts with `$`

  var _loop = function _loop(name) {
    var prop = props[name]; // complete 补全选项

    if (!prop.$localName) {
      prop.$localName = "localProps_".concat(name);
    }

    if (!prop.$localSetter) {
      prop.$localSetter = function (value) {
        return value;
      };
    } // make standardProp


    var standardProp = {};
    standardProps[name] = standardProp;
    Object.keys(props[name]).forEach(function (key) {
      if (key[0] !== '$') {
        standardProp[key] = prop[key];
      }
    });
  };

  for (var name in props) {
    _loop(name);
  }

  var component = {
    props: standardProps,
    computed: {},
    watch: {}
  };

  component.data = function () {
    var t = {
      localValueOfUpdatableProps: {}
    };

    for (var _i = 0, _Object$keys = Object.keys(props); _i < _Object$keys.length; _i++) {
      var _name = _Object$keys[_i];
      t.localValueOfUpdatableProps[_name] = this[_name];
    }

    return t;
  };

  var _loop2 = function _loop2() {
    var name = _Object$keys2[_i2];
    var prop = props[name];

    component.watch[name] = function (value) {
      this.localValueOfUpdatableProps[name] = prop.$localSetter(value, this);
    };

    var localName = prop.$localName;
    component.computed[localName] = {
      get: function get() {
        return this.localValueOfUpdatableProps[name];
      },
      set: function set(value) {
        if (name === 'value') {
          this.$emit('input', value);
        } else {
          this.$emit("update:".concat(name), value);
        }

        this.localValueOfUpdatableProps[name] = prop.$localSetter(value, this);
      }
    };
  };

  for (var _i2 = 0, _Object$keys2 = Object.keys(props); _i2 < _Object$keys2.length; _i2++) {
    _loop2();
  }

  return component;
}
function isPropTrue(value) {
  return value === '' || value;
} // the dependences in getter can't be auto resolved. must use exec to include dependences

function watchAsync(vm, getter, handler, opt) {
  var destroies = [];
  var value, oldValue;
  var count = -1; // updated count

  main();
  return destroy;

  function destroy() {
    destroies.forEach(function (f) {
      return f();
    });
    destroies = [];
  }

  function exec(getter, opt) {
    var value;
    var first = true;
    var unwatch = vm.$watch(function () {
      return getter.call(vm, exec);
    }, function (value2) {
      value = value2;

      if (first) {
        first = false;
      } else {
        main();
      }
    }, {
      immediate: true,
      deep: opt && opt.deep
    });
    destroies.push(unwatch);
    return value;
  }

  function main() {
    destroy();
    var result = getter.call(vm, exec);
    count++;
    var localCount = count;
    oldValue = value;

    var getterExecuted = function getterExecuted(value) {
      if (localCount !== count) {
        // expired
        return;
      }

      if (localCount === 0) {
        if (opt && opt.immediate) {
          handler.call(vm, value, oldValue);
        }
      } else {
        handler.call(vm, value, oldValue);
      }
    }; //


    if (isPromise(result)) {
      result.then(getterExecuted);
    } else {
      getterExecuted(result);
    }
  }
} // do handler first, handler return getter

function doWatch(vm, handler) {
  var oldValue, unwatch;

  var update = function update() {
    var getter = handler.call(vm, oldValue);
    unwatch = vm.$watch(getter, function (value) {
      unwatch();
      oldValue = value;
      update();
    });
  };

  update();
  return function () {
    return unwatch && unwatch();
  };
}
function iterateObjectWithoutDollarDash(obj) {
  var key, start;
  return regeneratorRuntime.wrap(function iterateObjectWithoutDollarDash$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = regeneratorRuntime.keys(obj);

        case 1:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 9;
            break;
          }

          key = _context.t1.value;
          start = key.substr(0, 1);

          if (!(start !== '$' && start !== '_')) {
            _context.next = 7;
            break;
          }

          _context.next = 7;
          return {
            key: key,
            value: obj[key]
          };

        case 7:
          _context.next = 1;
          break;

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$1);
} // add reactive `windowSize`

var windowSize = {
  data: function data() {
    return {
      windowSize: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight
      }
    };
  },
  methods: {
    updateWindowSize: function updateWindowSize() {
      Object.assign(this.windowSize, {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight
      });
    }
  },
  created: function created() {
    var _this = this;

    this._windowSize_onresize = function () {
      _this.updateWindowSize();

      _this.$emit('window-resize');
    };

    onDOM(window, 'resize', this._windowSize_onresize);
  },
  beforeDestroy: function beforeDestroy() {
    offDOM(window, 'resize', this._windowSize_onresize);
  }
};
function registerPreventURLChange(Vue, router, msg) {
  var preventRouter = false;
  var msg0 = "It looks like you have been editing something.\nIf you leave before saving, your changes will be lost.";
  router.beforeEach(function (to, from, next) {
    if (preventRouter) {
      if (window.confirm(msg || msg0)) {
        Vue.allowURLChange();
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  });

  var beforeunload = function beforeunload(e) {
    var confirmationMessage = msg || msg0;
    e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+

    return confirmationMessage; // Gecko, WebKit, Chrome <34
  };

  Vue.preventURLChange = Vue.prototype.$preventURLChange = function (msg2) {
    if (msg2 != null) {
      msg = msg2;
    }

    if (!preventRouter) {
      preventRouter = true;
      window.addEventListener("beforeunload", beforeunload);
    }
  };

  Vue.allowURLChange = Vue.prototype.$allowURLChange = function () {
    preventRouter = false;
    window.removeEventListener("beforeunload", beforeunload);
  };
}
var hookHelper = {
  methods: {
    // todo extract hooks to vue-functions
    // get hooks in this._hooks, without which in props
    _getNonPropHooksByName: function _getNonPropHooksByName(name) {
      if (this._hooks) {
        return this._hooks[name];
      }
    },
    addHook: function addHook(name, func) {
      if (!this._getNonPropHooksByName(name)) {
        if (!this._hooks) {
          this._hooks = {};
        }

        if (!this._hooks[name]) {
          this._hooks[name] = [];
        }
      }

      this._hooks[name].push(func);
    },
    removeHook: function removeHook(name, func) {
      var hooks = this._getNonPropHooksByName(name);

      if (hooks) {
        arrayRemove(hooks, func);
      }
    },
    hasHook: function hasHook(name) {
      return this._getNonPropHooksByName(name) || this[name];
    },
    executeHook: function executeHook(name, args) {
      var hooks = this._getNonPropHooksByName(name).slice();

      if (hooks) {
        if (this[name] && isFunction(this[name])) {
          hooks.push(function (next) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            return this[name].apply(this, args);
          });
        }

        return joinFunctionsByNext(hooks).apply(void 0, _toConsumableArray(args));
      }
    }
  }
};

export { doWatch, hookHelper, isPropTrue, iterateObjectWithoutDollarDash, registerPreventURLChange, updatablePropsEvenUnbound, watchAsync, windowSize };
