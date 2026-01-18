import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VueRouter from "unplugin-vue-router/vite"
import terser from '@rollup/plugin-terser'
import virtualArticle from './src/plugins/vfs'
// https://vite.dev/config/
const BIG_BUNDLE = 0;
export default defineConfig({
  plugins: [
    VueRouter(),
    vue(),
    virtualArticle(),
  ],
  base: "/availability/",
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        arguments: true,
        arrows: true,
        drop_console: true,
        drop_debugger: true,
        inline: true,
        passes: 3,
        unused: true,
        dead_code: true,
      },
      mangle: {
        keep_classnames: false,
        keep_fnames: false,
        eval: true
      },
      format: {
        ascii_only: true,
        comments: false,
      },
      maxWorkers: 128
    },
    rollupOptions: {
      plugins: [
        terser()
      ],
      output: {
        compact: true,
        format: BIG_BUNDLE?'iife':"es",
      }
    },
    assetsInlineLimit: BIG_BUNDLE ? 25000000 : 0 //<- Browser supports 2.5MB

  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'color-functions',
          'global-builtin',
          'if-function'
        ],
      },
    }
  },
  resolve: {
    // 配置路径别名@
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './public'),
    }
  }
}
)
