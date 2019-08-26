/*!
 * vue-functions v1.0.4
 * (c) 2019-present phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vueFunctions = {})));
}(this, (function (exports) { 'use strict';

  /*!
   * helper-js v1.4.3
   * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
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
  // `this` !== global or window because of build tool

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

  function numRand(min, max) {
    if (arguments.length === 1) {
      max = min;
      min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function strRand() {
    var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var r = '';
    var seeds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++) {
      r += seeds[numRand(seeds.length - 1)];
    }

    return prefix + r;
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
  }
  function waitTime(milliseconds, callback) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        callback && callback();
        resolve();
      }, milliseconds);
    });
  } // overload waitFor(condition, time = 100, maxCount = 1000))
  var URLHelper =
  /*#__PURE__*/
  function () {
    // protocol, hostname, port, pastname
    function URLHelper(baseUrl) {
      var _this3 = this;

      _classCallCheck(this, URLHelper);

      _defineProperty(this, "baseUrl", '');

      _defineProperty(this, "search", {});

      var t = decodeURI(baseUrl).split('?');
      this.baseUrl = t[0];

      if (t[1]) {
        t[1].split('&').forEach(function (v) {
          var t2 = v.split('=');
          _this3.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
        });
      }
    }

    _createClass(URLHelper, [{
      key: "getHref",
      value: function getHref() {
        var _this4 = this;

        var t = [this.baseUrl];
        var searchStr = Object.keys(this.search).map(function (k) {
          return "".concat(k, "=").concat(encodeURIComponent(_this4.search[k]));
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

      _defineProperty(this, "eventStore", []);
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
        var _this5 = this;

        var off = function off() {
          _this5.off(name, wrappedHandler);
        };

        var wrappedHandler = function wrappedHandler() {
          handler.apply(void 0, arguments);
          off();
        };

        this.on(name, wrappedHandler);
        return off;
      }
    }, {
      key: "onceTimeout",
      value: function onceTimeout(name, handler, timeout) {
        var _this6 = this;

        var off;
        var promise = new Promise(function (resolve, reject) {
          var wrappedHandler = function wrappedHandler() {
            handler.apply(void 0, arguments);
            resolve();
          };

          off = _this6.once(name, wrappedHandler);
          waitTime(timeout).then(function () {
            off();
            reject();
          });
        });

        var off2 = function off2() {
          off && off();
        };

        return {
          off: off2,
          promise: promise
        };
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

        for (var _i8 = 0, _indexes = indexes; _i8 < _indexes.length; _i8++) {
          var index = _indexes[_i8];
          this.eventStore.splice(index, 1);
        }
      }
    }, {
      key: "emit",
      value: function emit(name) {
        // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
        var items = [];
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = this.eventStore[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var item = _step9.value;

            if (item.name === name) {
              items.push(item);
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
              _iterator9["return"]();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }

        for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key9 = 1; _key9 < _len8; _key9++) {
          args[_key9 - 1] = arguments[_key9];
        }

        for (var _i9 = 0, _items = items; _i9 < _items.length; _i9++) {
          var _item = _items[_i9];

          _item.handler.apply(_item, args);
        }
      }
    }]);

    return EventProcessor;
  }();
  var CrossWindowEventProcessor =
  /*#__PURE__*/
  function (_EventProcessor) {
    _inherits(CrossWindowEventProcessor, _EventProcessor);

    // id
    function CrossWindowEventProcessor() {
      var _this7;

      _classCallCheck(this, CrossWindowEventProcessor);

      _this7 = _possibleConstructorReturn(this, _getPrototypeOf(CrossWindowEventProcessor).call(this));

      _defineProperty(_assertThisInitialized(_this7), "storageName", '_crossWindow');

      _defineProperty(_assertThisInitialized(_this7), "windows", []);

      _defineProperty(_assertThisInitialized(_this7), "BROADCAST", '__BROADCAST__');

      onDOM(window, 'storage', function (ev) {
        if (ev.key === _this7.storageName) {
          var event = JSON.parse(ev.newValue);

          if (!event.targets || event.targets.includes(_this7.id)) {
            var _this8;

            (_this8 = _this7).emitLocal.apply(_this8, [event.name].concat(_toConsumableArray(event.args)));
          }
        }
      }); // social parts 集体部分
      // join

      _this7.id = strRand();
      _this7.windows = [_this7.id];
      _this7.ready = new Promise(function (resolve, reject) {
        _this7.onceTimeout('_windows_updated', function (_ref) {
          var windows = _ref.windows;
          _this7.windows = windows;
        }, 200).promise.then(function () {
          resolve(); // responsed 被响应
        }, function () {
          // no response 无响应
          resolve();
        });

        _this7.broadcast('_join', _this7.id);
      });

      _this7.ready.then(function () {
        // on join
        _this7.on('_join', function (id) {
          _this7.windows.push(id);

          if (_this7.isMain()) {
            _this7.broadcast('_windows_updated', {
              windows: _this7.windows,
              type: 'join',
              id: id
            });
          }
        }); // on _windows_updated


        _this7.on('_windows_updated', function (_ref2) {
          var windows = _ref2.windows;
          _this7.windows = windows;
        }); // on exit


        _this7.on('_exit', function (id) {
          var oldMain = _this7.windows[0];
          arrayRemove(_this7.windows, id);

          if (_this7.isMain()) {
            _this7.emit('_windows_updated', {
              windows: _this7.windows,
              type: 'exit',
              id: id
            });

            if (oldMain != _this7.id) {
              console.log('_main_updated');

              _this7.emit('_main_updated', {
                windows: _this7.windows,
                old: oldMain,
                'new': _this7.id
              });
            }
          }
        });

        onDOM(window, 'beforeunload', function () {
          _this7.exitGroup();
        });
      });

      return _this7;
    }

    _createClass(CrossWindowEventProcessor, [{
      key: "isMain",
      value: function isMain() {
        return this.id === this.windows[0];
      }
    }, {
      key: "emitTo",
      value: function emitTo(name, targets) {
        for (var _len9 = arguments.length, args = new Array(_len9 > 2 ? _len9 - 2 : 0), _key10 = 2; _key10 < _len9; _key10++) {
          args[_key10 - 2] = arguments[_key10];
        }

        if (targets === this.BROADCAST) {
          targets = null;
        } else {
          if (targets && !isArray(targets)) {
            targets = [targets];
          }

          if (targets.includes(this.id)) {
            var _get2;

            (_get2 = _get(_getPrototypeOf(CrossWindowEventProcessor.prototype), "emit", this)).call.apply(_get2, [this, name].concat(args)); // emit to current window

          }
        }

        glb().localStorage.setItem(this.storageName, JSON.stringify({
          name: name,
          targets: targets,
          args: args,
          // use random make storage event triggered every time
          // 加入随机保证触发storage事件
          random: Math.random()
        }));
      }
    }, {
      key: "emitLocal",
      value: function emitLocal(name) {
        for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key11 = 1; _key11 < _len10; _key11++) {
          args[_key11 - 1] = arguments[_key11];
        }

        this.emitTo.apply(this, [name, this.id].concat(args));
      }
    }, {
      key: "broadcast",
      value: function broadcast(name) {
        for (var _len11 = arguments.length, args = new Array(_len11 > 1 ? _len11 - 1 : 0), _key12 = 1; _key12 < _len11; _key12++) {
          args[_key12 - 1] = arguments[_key12];
        }

        this.emitTo.apply(this, [name, this.BROADCAST].concat(args));
      }
    }, {
      key: "emit",
      value: function emit(name) {
        for (var _len12 = arguments.length, args = new Array(_len12 > 1 ? _len12 - 1 : 0), _key13 = 1; _key13 < _len12; _key13++) {
          args[_key13 - 1] = arguments[_key13];
        }

        this.emitTo.apply(this, [name, this.windows].concat(args));
      }
    }, {
      key: "exitGroup",
      value: function exitGroup() {
        this.broadcast('_exit', this.id);
      }
    }]);

    return CrossWindowEventProcessor;
  }(EventProcessor); // Deprecated in next version

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
    } else if (isArray(props)) {
      props = props.slice();
    } else {
      // object
      props = Object.assign({}, props);
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
