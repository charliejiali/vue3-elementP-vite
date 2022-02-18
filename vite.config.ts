import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

import { resolve } from 'path'

const port = 9528

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return {
    server: {
      host: '0,0,0,0',
      port,
      open: true,
      cors: true,
      proxy: {
        [process.env.VITE_BASE_API]: {
          target: `http://localhost:${port}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${process.env.VITE_BASE_API}`), '')
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        ignore: /^\_/,
        supportTs: true, // 是否开启支持ts
        mockPath: 'mock', // 设置mockPath为根目录下的mock目录
        watchFiles: true,
        localEnabled: command === 'serve', // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
        prodEnabled: true, // 设置打包是否启用 mock 功能
        logger: true, // 是否在控制台显示请求日志
        injectCode: `
          import { setupProdMockServer } from '../mock/_mockProdServer';
          setupProdMockServer();
        `
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'path': 'path-browserify'
      }
    }
  }
}
