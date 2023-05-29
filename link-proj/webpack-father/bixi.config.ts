import { defineConfig } from '@bixi-design/builder';
import path from 'path';

var proxy = {
  '/v3': {
    target: 'https://rpa-test.datagrand.com',
    changeOrigin: true,
    secure: false
  },
  '/api': {
    target: 'https://yapi.datagrand.com/mock/30/',
    changeOrigin: true
  },
  '/yapi': {
    target: 'https://yapi.datagrand.com/mock/1519/',
    changeOrigin: true,
    pathRewrite: { '^/yapi': '' }
  }
};

var viteConfig = defineConfig({
  vite: true,
  viteConfig: {
    envPrefix: ['RPA']
  },
  title: '达观数据-RPA',
  copy: [
    {
      from: 'src/assets',
      to: 'assets'
    }
  ],
  server: {
    host: 'localhost',
    port: 4012,
    proxy
  },
  define: {
    // 只有以 RPA_ 前缀开头的配置才会暴露给客户端
    __APP_ENV__: JSON.stringify('RPA_')
  }
});

var webpackConfig = defineConfig({
  title: '达观数据-RPA',
  replaceMomentWithDayjs: false,
  server: {
    host: 'localhost',
    static: { directory: path.join(__dirname, 'src/assets') },
    port: 4011,
    proxy
  },
  define: {
    // 只有以 RPA_ 前缀开头的配置才会暴露给客户端
    __APP_ENV__: 'RPA_'
  }
});

var config;

if (process.env.RPA_RUN_MODE === 'vite') {
  config = viteConfig;
} else {
  config = webpackConfig;
}

export default config;
