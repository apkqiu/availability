<script setup>
const { old, hasnew } = defineProps(["old", "hasnew"]);
</script>
<style scoped>
    .unfinished{
        background-color: yellow;
        border-radius: 5px;
        color:black;
        padding: 5px;
        margin: 0 0 20px 0;
        border: 2px solid orange;
    }
</style>
<template>
    <div v-if="hasnew" class="unfinished">
        <h1>不完整的页面</h1>
        <p>这个页面还没有完全开发完成</p>
        <p>如果有Bug的话，</p>
        <p v-if="old">
            去看看
            <a :href="`https://apkqiu.oc.com.ar/availability/docs/${old}`">旧版页面吧</a>
            <del>（毕竟还是beta版）</del>
        </p>
        <p v-else>那就以后再说啦<del>（毕竟还是beta版）</del></p>
    </div>
    <div v-else>
        <h1>保留页面</h1>
        <p>这个功能以后再开发</p>
        <p>也许明天上线，或者下个月前，或者明年再说</p>
        <p>总之，现在没有这个功能</p>
        <p v-if="old">
            要不，先看看
            <a :href="`https://apkqiu.oc.com.ar/availability/docs/${old}`">旧版页面吧</a>
            <del>（毕竟还是beta版）</del>
        </p>
    </div>
</template>