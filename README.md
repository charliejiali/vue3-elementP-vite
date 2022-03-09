## Introduction

[vue3-elementP-vite](https://github.com/charliejiali/vue3-elementP-vite) is based on [vue-element-admin](https://panjiachen.github.io/vue-element-admin), and upgraded to the newest development stack of Vue 3.

## Preparation

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Element Plus](https://element-plus.gitee.io/zh-CN/)
- [Echarts](https://echarts.apache.org/zh/index.html)

## devDependencies

- [@types/path-browserify](https://github.com/browserify/path-browserify)
  > the `path` module from Node.js for browsers.
- [ESLint](https://github.com/eslint/eslint)
  > Find and fix problems in your JavaScript code.
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
  > Auto import APIs on-demand for Vite, Webpack, Rollup and esbuild.
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
  > On-demand components auto importing for Vue.
- [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
  >A vite plugin for processing html.
- [vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock)
  > Provide local and prod mocks for vite.
- [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons)
  > Used to generate svg sprite map.

## Features

```
- Login / Logout

- Permission Authentication
  - Page permission

- Multi-evnironment build
  - Develop (dev)
  - Production (prod)

- Global Features
  - Dynamic sidebar（supportws multi-level routing）
  - Dynamic breadcrumb
  - Mock data
  - Responsive Sidebar
  
- Table

- Error Page
  - 401
  - 404

- ECharts
  - Bar
  - Line
  - Pie
  - Radar
  - Map 
```

## Getting started

```bash
# clone the project
git clone https://github.com/charliejiali/vue3-elementP-vite.git

# enter the project directory
cd vue3-elementP-vite

# install dependency
npm install

# for gfw problems
npm install --registry=https://registry.npm.taobao.org

# develop
npm run dev
```

## Build

```bash
# build for production evnironment
npm run build:prod
```

## Browsers support

Modern browsers, recommend `Chrome` for development。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## License

[MIT](https://github.com/charliejiali/vue3-elementP-vite/blob/main/LICENSE)

Copyright (c) 2022-present charliejiali
