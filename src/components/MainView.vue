<script setup lang="js">
import { onMounted, ref, nextTick, watchEffect } from "vue";
import { Variable } from "../lib/utils";
import localforage from "localforage";
import Parallax from "parallax-js";
import { rgba, hsla } from "../lib/csshelper";
import { background } from "../lib/web_data";
const props = defineProps(["title"]);
function hex2rgb(hex) {
    let r = 0,
        g = 0,
        b = 0;
    // 3 digits
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return `${r},${g},${b}`;
}
function load(name, fallback) {
    if (typeof localStorage !== 'undefined')
        return localStorage.getItem(name) || fallback;
    return fallback;
}

const bglayers = ref([]);
// [{img: "/bg-1.webp", deepth: 0.5}, ...]
const get_setting = () => {
    return {
        color: load("color", "#000000"),
        adv_bg: load("adv_bg", "true") === 'true',
        mode: load("dark", "true") === 'true' ? "dark" : 'light',
        imgbg: load("imgbg", "bg-1.jpg"),
        bgbrightness: (parseInt(load("bgbrightness", "50")) - 100) / 100,
        coloropacity: parseInt(load("coloropacity", "0")) / 100,
    }
}
watchEffect(() => {
    document.title = props.title + " | 洽隐山房";
})
const settings = ref({});
let parallax = null;
const update_style = (async (old_settings, new_settings) => {
    settings.value = new_settings;
    document.body.setAttribute("data-bs-theme", new_settings.mode);
    if (new_settings.adv_bg) {
        if (old_settings.imgbg !== new_settings.imgbg) {
            bglayers.value.splice(0, bglayers.value.length);
            if (new_settings.imgbg.startsWith('custom')) {
                // 自定义背景：图像存在localforage中
                bglayers.value.push({ img: await localforage.getItem('imgbg'), depth: 0.4 });
            } else if (typeof background[new_settings.imgbg] === "function") {
                // 如果背景是单张图片，则直接添加
                bglayers.value.push({ img: (await background[new_settings.imgbg]()).default, deepth: 0.4 })
            } else {
                // 如果背景是多个图片，则加载deepth.json文件，根据深度添加图片
                let data = background[new_settings.imgbg];
                for (var i of data) {
                    bglayers.value.push({ img: (await i[0]()).default, deepth: i[1] });
                }
            }

            nextTick(() => {
                if (parallax) parallax.destroy();
                parallax = new Parallax(document.getElementById("scene"))
            })
        }
    } else {
        // 关闭了高级背景
        if (parallax) parallax.destroy();
        parallax = null;
    }
});
onMounted(() => {
    Variable.watch(get_setting, update_style, {})
})
</script>
<template>
    <div style="position: fixed;left: -10vw;top: -10vh;right: -10vw;bottom: -10vh;z-index: -1;" v-if="settings.adv_bg">
        <ul id="scene">
            <li class="layer" :data-depth="deepth" v-for="{ deepth, img } in bglayers">
                <img style="height: 120vh; width: 120vw; object-fit: cover" :src="img" />
            </li>
        </ul>
    </div>
    <div
        :style="{ background: hsla(0, '0%', (settings.bgbrightness >= 0 ? '100%' : '0%'), Math.abs(settings.bgbrightness)) }">
        <div :style="{ background: rgba(hex2rgb(settings.color || '#000'), settings.adv_bg ? settings.coloropacity : 1) }">
            <div style="min-height: 100vh;padding:85px 10px 10px 10px;overflow-x: hidden;">
                <slot />
            </div>
            <div style="backdrop-filter: blur(10px)">
                <small>
                    如果你要提供意见，请
                    <RouterLink to="/contact">联系我们</RouterLink>
                    <br />电话：13270463238 <br />邮箱:Caixukun11451489@outlook.com
                    <b> <br />版权所有 ©2025-{{ new Date().getFullYear() }} 洽隐山房，保留所有权利</b>
                </small>
            </div>
        </div>
    </div>

</template>
