# vue-helper
# install
```sh
npm install vue-helper
```
# usage & api
```js
import * as vh from 'vue-helper'
vh.method(...)
```
# api
### updatablePropsEvenUnbound
```js
// eg 1
export default {
  mixins: [vh.updatablePropsEvenUnbound({
    value: {localName: 'current'},
  })],
}
// eg 2
// if without localName, the localName will be 'localProps_' + prop name
export default {
  mixins: [vh.updatablePropsEvenUnbound({
    value: {},
  })],
}
// eg 3
// if without localName, the localName will be 'localProps_' + prop name
export default {
  mixins: [vh.updatablePropsEvenUnbound({
    value: {},
    page: {},
    other: {},
  })],
}
```
