import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import { createHtmlPlugin } from 'vite-plugin-html'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import defaultSettings from './src/settings'

const port = 9527

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const isBuild = command === 'build'

  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    server: {
      host: '0,0,0,0',
      port,
      open: true,
      cors: true,
      proxy: {
        [process.env.VITE_MOCK_API as string]: {
          target: `http://localhost:${port}`,
          changeOrigin: true,
          rewrite: (path: any) =>
            path.replace(new RegExp(`^${process.env.VITE_MOCK_API}`), '')
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      // ElementPlus(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: isBuild
      }),
      viteMockServe({
        ignore: /^\_/,
        supportTs: true, // 是否开启支持ts
        mockPath: 'mock', // 设置mockPath为根目录下的mock目录
        watchFiles: true,
        localEnabled: !isBuild, // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
        prodEnabled: isBuild, // 设置打包是否启用 mock 功能
        logger: true, // 是否在控制台显示请求日志
        injectCode: `
          import { setupProdMockServer } from '../mock/_mockProdServer';
          setupProdMockServer();
        `
      }),
      createHtmlPlugin({
        minify: isBuild,
        /**
         * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
         * @default src/main.ts
         */
        // entry: 'src/main.ts',
        /**
         * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
         * @default index.html
         */
        // template: 'public/index.html',

        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            title: defaultSettings.title
          }
        }
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: ['vue', 'vuex', 'vue-router'],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon'
          })
        ]
      }),
      Components({
        dirs: ['src/components/'],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep']
          })
        ]
      }),
      Icons({
        autoInstall: true
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'path': 'path-browserify'
      }
    },
    build: {
      minify: 'terser',
      // chunk 大小警告的限制（以 kbs 为单位）。
      chunkSizeWarningLimit: 5000,
      // 在生产时移除console.log
      terserOptions: {
        // detail to look https://terser.org/docs/api-reference#compress-options
        compress: {
          // drop_console:false和pure_funcs配置，则将console.log和console.info进行移除，但是console.error不移除
          drop_console: false,
          pure_funcs: ['console.log', 'console.info'],
          // 将调试去除
          drop_debugger: true
        }
      },
      // 配置静态资源路径
      assetsDir: 'static/assets',
      // 将打包后的资源分开
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false
        }
      }
    }
  }
}
