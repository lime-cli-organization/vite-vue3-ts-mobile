import { defineConfig } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import postCssPxToRem from 'postcss-pxtorem';

// cdn 引入
import resolveExternalsPalugin from 'vite-plugin-resolve-externals';
// vant 按需引入
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
// 使用jsx
import vueJsx from '@vitejs/plugin-vue-jsx';

// baseURL
import { authorization, api } from './public/config/baseUrl.js';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  return {
    server: {
      host: '192.168.15.3',
      port: 3000,
      open: true,
      proxy: {
        '/authorization': {
          target: authorization,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/authorization/, ''),
        },
        '/api': {
          target: api,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import './src/styles/variable.less';`,
        },
      },
      // 此代码为适配移动端px2rem
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue(res) {
              return res.file.indexOf('vant') !== -1 ? 37.5 : 75;
            }, // 1rem的大小
            minPixelValue: 1, // 需要转换的最小值，一般1px像素不转换，以上才转换
            unitPrecision: 3, // 转换成rem单位的小数点后的保留位数
            propList: ['*', '!border'], // 需要转换的属性，这里选择全部都进行转换
            selectorBlackList: ['van-'], // 匹配不被转换为rem的选择器
          }),
        ],
      },
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
        {
          find: 'components',
          replacement: resolve(__dirname, 'src/components'),
        },
      ],
    },
    plugins: [
      vue(),
      vueJsx(),
      VueSetupExtend(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
        inject: 'body-last',
        customDomId: '__svg__icons__dom__',
      }),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
  };
});
