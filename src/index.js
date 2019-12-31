import * as hp from 'helper-js'

/**
 * [updatablePropsEvenUnbound description]
 * @param  {[type]} props [object or getter]
 * @return {[type]}       [description]
 * props eg: {
    value: {$localName: 'current', $localSetter: (value, vm)},
  }
   default localName is `localProps_${name}`
 */
export function updatablePropsEvenUnbound(props) {
  if (hp.isFunction(props)) {
    props = props()
  } else {
    // object
    props = Object.assign({}, props)
  }
  const standardProps = {} // without key starts with `$`
  for (const name in props) {
    const prop = props[name]
    // complete 补全选项
    if (!prop.$localName) {
      prop.$localName = `localProps_${name}`
    }
    if (!prop.$localSetter) {
      prop.$localSetter = value => value
    }
    // make standardProp
    const standardProp = {}
    standardProps[name] = standardProp
    Object.keys(props[name]).forEach(key => {
      if (key[0] !== '$') {
        standardProp[key] = prop[key]
      }
    })
  }
  const component = {
    props: standardProps,
    computed: {},
    watch: {},
  }
  component.data = function () {
    const t = {
      localValueOfUpdatableProps: {},
    }
    for (const name of Object.keys(props)) {
      t.localValueOfUpdatableProps[name] = this[name]
    }
    return t
  }
  for (const name of Object.keys(props)) {
    const prop = props[name]
    component.watch[name] = function (value) {
      this.localValueOfUpdatableProps[name] = prop.$localSetter(value, this)
    }
    const localName = prop.$localName
    component.computed[localName] = {
      get(){ return this.localValueOfUpdatableProps[name] },
      set(value) {
        if (name === 'value') {
          this.$emit('input', value)
        } else {
          this.$emit(`update:${name}`, value)
        }
        this.localValueOfUpdatableProps[name] = prop.$localSetter(value, this)
      },
    }
  }
  return component
}

export function isPropTrue(value) {
  return value === '' || value
}

// the dependences in getter can't be auto resolved. must use exec to include dependences
export function watchAsync(vm, getter, handler, opt) {
  let destroies = []
  let value, oldValue
  let count = -1 // updated count
  main()
  return destroy
  function destroy() {
    destroies.forEach(f => f())
    destroies = []
  }
  function exec(getter, opt) {
    let value
    let first = true
    const unwatch = vm.$watch(() => getter.call(vm, exec), value2 => {
      value = value2
      if (first) {
        first = false
      } else {
        main()
      }
    }, {immediate: true, deep: opt && opt.deep})
    destroies.push(unwatch)
    return value
  }
  function main() {
    destroy()
    const result = getter.call(vm, exec)
    count++
    const localCount = count
    oldValue = value
    const getterExecuted = (value) => {
      if (localCount !== count) {
        // expired
        return
      }
      if (localCount === 0) {
        if (opt && opt.immediate) {
          handler.call(vm, value, oldValue)
        }
      } else {
        handler.call(vm, value, oldValue)
      }
    }
    //
    if (hp.isPromise(result)) {
      result.then(getterExecuted)
    } else {
      getterExecuted(result)
    }
  }
}
// do handler first, handler return getter
export function doWatch(vm, handler) {
  let oldValue, unwatch
  const update = () => {
    const getter = handler.call(vm, oldValue)
    unwatch = vm.$watch(getter, (value) => {
      unwatch()
      oldValue = value
      update()
    })
  }
  update()
  return () => unwatch && unwatch()
}

export function* iterateObjectWithoutDollarDash(obj) {
  for (const key in obj) {
    const start = key.substr(0, 1)
    if (start !== '$' && start !== '_') {
      yield {key, value: obj[key]}
    }
  }
}

// add reactive `windowSize`
export const windowSize = {
  data() {
    return {
      windowSize: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      },
    }
  },
  methods: {
    updateWindowSize() {
      Object.assign(this.windowSize, {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      })
    },
  },
  created() {
    this._windowSize_onresize = () => {
      this.updateWindowSize()
      this.$emit('window-resize')
    }
    hp.onDOM(window, 'resize', this._windowSize_onresize)
  },
  beforeDestroy() {
    hp.offDOM(window, 'resize', this._windowSize_onresize)
  },
}

export function registerPreventURLChange(Vue, router, msg) {
  let preventRouter = false
  const msg0 = `It looks like you have been editing something.
If you leave before saving, your changes will be lost.`
  router.beforeEach((to, from, next) => {
    if (preventRouter) {
      if (window.confirm(msg || msg0)) {
        Vue.allowURLChange()
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  })
  const beforeunload = (e) => {
    var confirmationMessage = msg || msg0
    e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
    return confirmationMessage;              // Gecko, WebKit, Chrome <34
  }
  Vue.preventURLChange = Vue.prototype.$preventURLChange = (msg2) => {
    if (msg2 != null) {
      msg = msg2
    }
    if (!preventRouter) {
      preventRouter = true
      window.addEventListener("beforeunload", beforeunload)
    }
  }
  Vue.allowURLChange = Vue.prototype.$allowURLChange = () => {
    preventRouter = false
    window.removeEventListener("beforeunload", beforeunload)
  }
}
export const hookHelper = {
  methods: {
    // todo extract hooks to vue-functions
    // get hooks in this._hooks, without which in props
    _getNonPropHooksByName(name) {
      if (this._hooks) {
        return this._hooks[name]
      }
    },
    addHook(name, func) {
      if (!this._getNonPropHooksByName(name)) {
        if (!this._hooks) {
          this._hooks = {}
        }
        if (!this._hooks[name]) {
          this._hooks[name] = []
        }
      }
      this._hooks[name].push(func)
    },
    removeHook(name, func) {
      const hooks = this._getNonPropHooksByName(name)
      if (hooks) {
        hp.arrayRemove(hooks, func)
      }
    },
    hasHook(name) {
      return this._getNonPropHooksByName(name) || this[name]
    },
    executeHook(name, args) {
      const hooks = this._getNonPropHooksByName(name).slice()
      if (hooks) {
        if (this[name] && hp.isFunction(this[name])) {
          hooks.push(function (next, ...args) {
            return this[name](...args)
          })
        }
        return hp.joinFunctionsByNext(hooks)(...args)
      }
    },
  }
}
