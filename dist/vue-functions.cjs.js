/*!
 * vue-functions v0.0.4
 * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hp = require('helper-js');

function updatablePropsEvenUnbound(props) {
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
        var ignore = "_ignoreOnce_".concat(name);

        if (this[ignore]) {
          this[ignore] = false;
          return;
        }

        this.localValueOfUpdatableProps[name] = value;
      };

      var localName = localNames[name] || "localProps_".concat(name);
      component.computed[localName] = {
        get: function get() {
          return this.localValueOfUpdatableProps[name];
        },
        set: function set(value) {
          var ignore = "_ignoreOnce_".concat(name);
          this[ignore] = true;

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
}

exports.updatablePropsEvenUnbound = updatablePropsEvenUnbound;
exports.isPropTrue = isPropTrue;
