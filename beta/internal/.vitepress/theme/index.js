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

    }
}; 
