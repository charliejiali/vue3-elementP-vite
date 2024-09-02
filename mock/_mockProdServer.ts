import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// const modules = import.meta.globEager('./*.ts')
//
// const mockModules: any[] = []
// Object.keys(modules).forEach((key) => {
//   if (key.includes('/_')) {
//     return
//   }
//   mockModules.push(...modules[key].default)
// })

import userMock from '../mock/user'
import articleMock from '../mock/article'
import echartsMock from '../mock/echarts'

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  const mockModules = [
    ...userMock,
    ...articleMock,
    ...echartsMock,
  ]
  createProdMockServer(mockModules)
}
