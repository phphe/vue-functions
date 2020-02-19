/*!
 * vue-functions v2.0.4
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
import { isFunction, isPromise, onDOM, offDOM, arrayRemove, joinFunctionsByNext } from 'helper-js';

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
      prop.$localSetter = value => value;
    } // make standardProp


    var standardProp = {};
    standardProps[name] = standardProp;
    Object.keys(props[name]).forEach(key => {
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

    for (var _name of Object.keys(props)) {
      t.localValueOfUpdatableProps[_name] = this[_name];
    }

    return t;
  };

  var _loop2 = function _loop2(_name2) {
    var prop = props[_name2];

    component.watch[_name2] = function (value) {
      this.localValueOfUpdatableProps[_name2] = prop.$localSetter(value, this);
    };

    var localName = prop.$localName;
    component.computed[localName] = {
      get() {
        return this.localValueOfUpdatableProps[_name2];
      },

      set(value) {
        if (_name2 === 'value') {
          this.$emit('input', value);
        } else {
          this.$emit("update:".concat(_name2), value);
        }

        this.localValueOfUpdatableProps[_name2] = prop.$localSetter(value, this);
      }

    };
  };

  for (var _name2 of Object.keys(props)) {
    _loop2(_name2);
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
    destroies.forEach(f => f());
    destroies = [];
  }

  function exec(getter, opt) {
    var value;
    var first = true;
    var unwatch = vm.$watch(() => getter.call(vm, exec), value2 => {
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

    var getterExecuted = value => {
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

  var update = () => {
    var getter = handler.call(vm, oldValue);
    unwatch = vm.$watch(getter, value => {
      unwatch();
      oldValue = value;
      update();
    });
  };

  update();
  return () => unwatch && unwatch();
}
function* iterateObjectWithoutDollarDash(obj) {
  for (var key in obj) {
    var start = key.substr(0, 1);

    if (start !== '$' && start !== '_') {
      yield {
        key,
        value: obj[key]
      };
    }
  }
} // add reactive `windowSize`

var windowSize = {
  data() {
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
    updateWindowSize() {
      Object.assign(this.windowSize, {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight
      });
    }

  },

  created() {
    this._windowSize_onresize = () => {
      this.updateWindowSize();
      this.$emit('window-resize');
    };

    onDOM(window, 'resize', this._windowSize_onresize);
  },

  beforeDestroy() {
    offDOM(window, 'resize', this._windowSize_onresize);
  }

};
function registerPreventURLChange(Vue, router, msg) {
  var preventRouter = false;
  var msg0 = "It looks like you have been editing something.\nIf you leave before saving, your changes will be lost.";
  router.beforeEach((to, from, next) => {
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

  var beforeunload = e => {
    var confirmationMessage = msg || msg0;
    e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+

    return confirmationMessage; // Gecko, WebKit, Chrome <34
  };

  Vue.preventURLChange = Vue.prototype.$preventURLChange = msg2 => {
    if (msg2 != null) {
      msg = msg2;
    }

    if (!preventRouter) {
      preventRouter = true;
      window.addEventListener("beforeunload", beforeunload);
    }
  };

  Vue.allowURLChange = Vue.prototype.$allowURLChange = () => {
    preventRouter = false;
    window.removeEventListener("beforeunload", beforeunload);
  };
}
var hookHelper = {
  methods: {
    // todo extract hooks to vue-functions
    // get hooks in this._hooks, without which in props
    _getNonPropHooksByName(name) {
      if (this._hooks) {
        return this._hooks[name];
      }
    },

    addHook(name, func) {
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

    removeHook(name, func) {
      var hooks = this._getNonPropHooksByName(name);

      if (hooks) {
        arrayRemove(hooks, func);
      }
    },

    hasHook(name) {
      return this._getNonPropHooksByName(name) || this[name];
    },

    executeHook(name, args) {
      var _this = this;

      var hooks = this._getNonPropHooksByName(name);

      hooks = hooks ? hooks.slice() : [];

      if (this[name] && isFunction(this[name])) {
        hooks.push(function (next) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          return _this[name](...args);
        });
      }

      return joinFunctionsByNext(hooks)(...args);
    }

  }
};
var mountedMixin = {
  data() {
    return {
      mounted: new Promise((resolve, reject) => {
        this._mounted_resolve = resolve;
      })
    };
  },

  mounted() {
    this._mounted_resolve();
  }

};

export { doWatch, hookHelper, isPropTrue, iterateObjectWithoutDollarDash, mountedMixin, registerPreventURLChange, updatablePropsEvenUnbound, watchAsync, windowSize };
