import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute, useRouter } from 'vitepress';
import { toRefs } from "vue";
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式
import MyLayout from './MyLayout.vue';
//import Layout from './Layout.vue'
import "./style.css"
import "./bar-blur.css"
export default {
    extends: DefaultTheme,
    Layout: MyLayout,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        ctx.app.component('vImageViewer', vImageViewer);
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const { frontmatter } = toRefs(useData());
        // 启用插件
        imageViewer(route);

        
        giscusTalk(
            {
                repo: 'apkqiu/apkqiu.github.io',
                repoId: 'R_kgDOOQrolQ',
                category: 'General', // 默认: `General`
                categoryId: 'DIC_kwDOOQrolc4Colvm',
                mapping: 'url', // 默认: `pathname`
                inputPosition: 'top', // 默认: `top`
                lang: 'zh-CN', // 默认: `zh-CN`
                lightTheme: 'light', // 默认: `light`
                darkTheme: 'dark', // 默认: `transparent_dark`
                //loading: 'lazy',

            },
            {
                frontmatter,
                route,
            },
            // 是否全部页面启动评论区。
            // 默认为 true，表示启用，此参数可忽略；
            // 如果为 false，表示不启用。
            // 可以在页面使用 `comment: true` 前言单独启用
            true
        );
    }
}; 
