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
import { exec } from 'child_process'
import { minify } from 'html-minifier';
import * as fs from 'fs/promises'
// https://vite.dev/config/
const BIG_BUNDLE = 0;
const DEBUG_BUNDLE = 0;

const transformIndexHtml = () => {
  return {
    enforce: 'post',
    apply: 'build',
    name: "post-process-html",
    async closeBundle() {
      if(DEBUG_BUNDLE) return;
      console.log("Post-processing index.html...")
      const p = exec("python3 ./post_html.py")
      p.stdout.on("data", (data) => console.log(data))
      await new Promise((resolve, reject) => {
        p.on("exit", resolve);
        p.on("error", reject);
      })
      // compress transformed html
      const code = minify((await fs.readFile("./dist/index.html")).toString(), {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        collapseInlineTagWhitespace: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeTagWhitespace: true,
      });
      await fs.writeFile("./dist/index.html", code);
      await fs.writeFile("./dist/404.html", code); // 解决github pages 404问题
      await fs.writeFile("./dist/.nojekyll", ""); // 解决github pages 突然使用jeyll打包问题
      console.log("Post-process finished.")
    }
  }
}

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
      builders: [meta()]
    }), // 添加 Markdown 插件
    transformIndexHtml()
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
        entryFileNames: DEBUG_BUNDLE?undefined/* keep orignal */:'assets/[hash:16].js',
        chunkFileNames: DEBUG_BUNDLE?undefined/* keep orignal */:'assets/[hash:16].js',
        assetFileNames: DEBUG_BUNDLE?undefined/* keep orignal */:'assets/[hash:16].[ext]',
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
