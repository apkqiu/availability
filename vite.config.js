import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VueRouter from "unplugin-vue-router/vite"
import terser from '@rollup/plugin-terser'
import Markdown from 'vite-plugin-md'
import meta from '@yankeeinlondon/meta-builder'
import { footnote } from "@mdit/plugin-footnote";
import { align } from "@mdit/plugin-align";
import { attrs } from "@mdit/plugin-attrs";
import { ins } from "@mdit/plugin-ins";
import markdownQuote from 'markdown-it-quote';
// https://vite.dev/config/
const BIG_BUNDLE = 0;
export default defineConfig({
  plugins: [
    VueRouter(),
    vue({
      include: [/\.vue$/, /\.md$/], // 支持 .md 文件
    }),
    Markdown({
      markdownItOptions: {
        html: true,
      },
      markdownItUses: [footnote,
        align,
        markdownQuote,
        attrs,
        ins,],
      builders:[meta()]
    }), // 添加 Markdown 插件
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
        entryFileNames: '[hash:16].js',
        chunkFileNames: '[hash:16].js',
        assetFileNames: '[hash:16].[ext]',
        compact: true,
        format: BIG_BUNDLE ? 'iife' : "es",
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
