import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"; //这个path用到了上面安装的@types/node
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
import {prismjsPlugin} from 'vite-plugin-prismjs';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      prismjsPlugin({
        languages: ['json', 'js'],
      }),
    ],
  resolve: {
    alias: {
      "@": path.resolve("./src"), // @代替src
      "#": path.resolve("./types"), // #代替types
    },
  },
})
