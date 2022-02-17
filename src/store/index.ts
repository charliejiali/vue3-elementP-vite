// import { createStore } from 'vuex'
// import getters from './getters'
// import app from './modules/app'
// import settings from './modules/settings'
// // import user from './modules/user'
// // import permission from './modules/permission'
//
// export default createStore({
//   modules: {
//     app,
//     settings
//     // user,
//     // permission
//   },
//   getters
// })
import { createStore } from 'vuex'
import getters from './getters'
import { ObjTy } from '~/common'
// auto import (perfect!!!)
const modulesFiles = import.meta.globEager('./modules/*.ts')
const modules: ObjTy = {}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules[moduleName] = modulesFiles[path].default
}
export default createStore({
  modules,
  getters
})
