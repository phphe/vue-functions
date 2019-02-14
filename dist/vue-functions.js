/*!
 * vue-functions v1.0.3
 * (c) 2019-present phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vueFunctions = {})));
}(this, (function (exports) { 'use strict';

  /*!
   * helper-js v1.3.1
   * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
   * Released under the MIT License.
   */

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return _get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

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

  // local store
  var store = {}; // get global

  function glb() {
    if (store.glb) {
      return store.glb;
    } else {
      // resolve global
      var t;

      try {
        t = global;
      } catch (e) {
        t = window;
      }

      store.glb = t;
      return t;
    }
  } // is 各种判断
  function isArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  }
  function isFunction(v) {
    return typeof v === 'function';
  }
  function isPromise(v) {
    return Object.prototype.toString.call(v) === '[object Promise]';
  }

  function onDOM(el, name, handler) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key6 = 3; _key6 < _len5; _key6++) {
      args[_key6 - 3] = arguments[_key6];
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
    for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key7 = 3; _key7 < _len6; _key7++) {
      args[_key7 - 3] = arguments[_key7];
    }

    if (el.removeEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.removeEventListener.apply(el, [name, handler].concat(args));
    } else if (el.detachEvent) {
      // IE 8 及更早 IE 版本
      el.detachEvent.apply(el, ["on".concat(name), handler].concat(args));
    }
  } // advance
  var URLHelper =
  /*#__PURE__*/
  function () {
    // protocol, hostname, port, pastname
    function URLHelper(baseUrl) {
      var _this2 = this;

      _classCallCheck(this, URLHelper);

      Object.defineProperty(this, "baseUrl", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: ''
      });
      Object.defineProperty(this, "search", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {}
      });
      var t = decodeURI(baseUrl).split('?');
      this.baseUrl = t[0];

      if (t[1]) {
        t[1].split('&').forEach(function (v) {
          var t2 = v.split('=');
          _this2.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
        });
      }
    }

    _createClass(URLHelper, [{
      key: "getHref",
      value: function getHref() {
        var _this3 = this;

        var t = [this.baseUrl];
        var searchStr = Object.keys(this.search).map(function (k) {
          return "".concat(k, "=").concat(encodeURIComponent(_this3.search[k]));
        }).join('&');

        if (searchStr) {
          t.push(searchStr);
        }

        return t.join('?');
      }
    }]);

    return URLHelper;
  }(); // 解析函数参数, 帮助重载

  var EventProcessor =
  /*#__PURE__*/
  function () {
    function EventProcessor() {
      _classCallCheck(this, EventProcessor);

      Object.defineProperty(this, "eventStore", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: []
      });
    }

    _createClass(EventProcessor, [{
      key: "on",
      value: function on(name, handler) {
        this.eventStore.push({
          name: name,
          handler: handler
        });
      }
    }, {
      key: "once",
      value: function once(name, handler) {
        var _this4 = this;

        var off = function off() {
          _this4.off(name, wrappedHandler);
        };

        var wrappedHandler = function wrappedHandler() {
          handler();
          off();
        };

        this.on(name, wrappedHandler);
        return off;
      }
    }, {
      key: "off",
      value: function off(name, handler) {
        var indexes = []; // to remove indexes; reverse; 倒序的

        var len = this.eventStore.length;

        for (var i = 0; i < len; i++) {
          var item = this.eventStore[i];

          if (item.name === name && item.handler === handler) {
            indexes.unshift(i);
          }
        }

        for (var _i8 = 0; _i8 < indexes.length; _i8++) {
          var index = indexes[_i8];
          this.eventStore.splice(index, 1);
        }
      }
    }, {
      key: "emit",
      value: function emit(name) {
        // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
        var items = [];
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.eventStore[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var item = _step5.value;

            if (item.name === name) {
              items.push(item);
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key8 = 1; _key8 < _len7; _key8++) {
          args[_key8 - 1] = arguments[_key8];
        }

        for (var _i9 = 0; _i9 < items.length; _i9++) {
          var _item = items[_i9];

          _item.handler.apply(_item, args);
        }
      }
    }]);

    return EventProcessor;
  }();
  var CrossWindow =
  /*#__PURE__*/
  function (_EventProcessor) {
    _inherits(CrossWindow, _EventProcessor);

    function CrossWindow() {
      var _this5;

      _classCallCheck(this, CrossWindow);

      _this5 = _possibleConstructorReturn(this, (CrossWindow.__proto__ || Object.getPrototypeOf(CrossWindow)).call(this));
      Object.defineProperty(_assertThisInitialized(_this5), "storageName", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: '_crossWindow'
      });
      var cls = CrossWindow;

      if (!cls._listen) {
        cls._listen = true;
        onDOM(window, 'storage', function (ev) {
          if (ev.key === _this5.storageName) {
            var _get2;

            var event = JSON.parse(ev.newValue);

            (_get2 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", _assertThisInitialized(_this5))).call.apply(_get2, [_this5, event.name].concat(_toConsumableArray(event.args)));
          }
        });
      }

      return _this5;
    }

    _createClass(CrossWindow, [{
      key: "emit",
      value: function emit(name) {
        var _get3;

        for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key9 = 1; _key9 < _len8; _key9++) {
          args[_key9 - 1] = arguments[_key9];
        }

        (_get3 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", this)).call.apply(_get3, [this, name].concat(args));

        glb().localStorage.setItem(this.storageName, JSON.stringify({
          name: name,
          args: args,
          // use random make storage event triggered every time
          // 加入随机保证触发storage事件
          random: Math.random()
        }));
      }
    }]);

    return CrossWindow;
  }(EventProcessor);

  /**
   * [updatablePropsEvenUnbound description]
   * @param  {[type]} props [un-circular object or getter]
   * @return {[type]}       [description]
   * props eg: {
      value: {localName: 'current'},
    }
     default localName is `localProps_${name}`
   */

  function updatablePropsEvenUnbound(props) {
    if (isFunction(props)) {
      props = props();
    } else {
      props = JSON.parse(JSON.stringify(props));
    }

    var component = {
      props: props,
      computed: {},
      watch: {}
    };
    var propNames;
    var localNames = {};

    if (isArray(props)) {
      propNames = props;
    } else {
      propNames = [];

      for (var key in props) {
        propNames.push(key);

        if (props[key].localName) {
          localNames[key] = props[key].localName;
          delete props[key].localName;
        }
      }
    }

    component.data = function () {
      var t = {
        localValueOfUpdatableProps: {}
      };
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = propNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;
          t.localValueOfUpdatableProps[name] = this[name];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return t;
    };

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop = function _loop() {
        var name = _step2.value;

        component.watch[name] = function (value) {
          this.localValueOfUpdatableProps[name] = value;
        };

        var localName = localNames[name] || "localProps_".concat(name);
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

            this.localValueOfUpdatableProps[name] = value;
          }
        };
      };

      for (var _iterator2 = propNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
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
  function* iterateObjectWithoutDollarDash(obj) {
    for (var key in obj) {
      var start = key.substr(0, 1);

      if (start !== '$' && start !== '_') {
        yield {
          key: key,
          value: obj[key]
        };
      }
    }
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

  exports.updatablePropsEvenUnbound = updatablePropsEvenUnbound;
  exports.isPropTrue = isPropTrue;
  exports.watchAsync = watchAsync;
  exports.doWatch = doWatch;
  exports.iterateObjectWithoutDollarDash = iterateObjectWithoutDollarDash;
  exports.windowSize = windowSize;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
