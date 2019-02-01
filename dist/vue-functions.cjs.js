/*!
 * vue-functions v1.0.1
 * (c) 2019-present phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hp = require('helper-js');

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
  if (hp.isFunction(props)) {
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

  if (hp.isArray(props)) {
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


    if (hp.isPromise(result)) {
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
}

exports.updatablePropsEvenUnbound = updatablePropsEvenUnbound;
exports.isPropTrue = isPropTrue;
exports.watchAsync = watchAsync;
exports.doWatch = doWatch;
exports.iterateObjectWithoutDollarDash = iterateObjectWithoutDollarDash;
