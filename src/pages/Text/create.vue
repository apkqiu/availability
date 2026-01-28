<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import Editor from '../../components/Editor.vue';
import localforage from 'localforage';
definePage({ meta: { title: "创作" } });
const content = ref('');
content.value = await localforage.getItem('draft_content') || '';
console.log("Loaded draft..." + content.value.length);
const mode = ref('0'); // 0: 混合, 1: 代码, 2: 预览
watchEffect(async () => {
    console.log("Saving draft..." + content.value.length);
    await localforage.setItem('draft_content', content.value);
});
const subtype = ref('poems');
const title = ref('');
function submit() {
    alert("没有远端服务器……（没钱），您的创作已保存在草稿中，请期待未来的功能更新！");
}

function upload(event){
    if(content.value.startsWith("blob:")){
        URL.revokeObjectURL(content.value);
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        content.value = "<img src=\"" +event.target.result + '">';
    };
    reader.readAsDataURL(file);
}
function addpic(){
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(event){
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            console.log("Loaded image..." + event.target.result.length);
            content.value += "\n<img src=\"" +event.target.result + '" alt=""  data-href="" style=""/>\n';
        };
        reader.onerror= function(event) {
            alert("读取图片失败");
        }
        reader.readAsDataURL(file);
    };
    input.click();
}
</script>
<style scoped>
#content :deep(img){
    max-width: 100vw;
    max-height:80vh;
    object-fit: contain;
}
</style>
<template>
    <div class="bg-danger w-100">
        <p>由于没有云服务器支持（因为没钱），目前不支持投稿功能，请期待以后的更新！</p>
        <p>草稿将会存储在您的设备上，如果您的设备不支持保存，内容将会丢失！</p>
    </div>
    <h1>创作</h1>
    <p>欢迎来到创作页面！在这里，您可以撰写并提交您的文学作品，与他人分享您的才华和创意。无论是诗歌、散文还是小说，我们都鼓励您大胆表达自己的思想和情感。开始创作吧！</p>
    <router-link to="/text" class="btn btn-secondary btn-sm">返回</router-link>
    <br>
    <div class="row mb-3">
        <label class="col-form-label col-3">投稿分区</label>
        <div class="col-9">
            <select class="form-select" v-model="subtype">
                <option value="poems">诗</option>
                <option value="words">词</option>
                <option value="songs">曲</option>
                <option value="calligraphy">书法</option>
            </select>
        </div>
    </div>
    <div class="row mb-3">
        <label class="col-form-label col-3">标题</label>
        <div class="col-9">
            <input class="form-control" type="text" v-model="title" />
        </div>
    </div>
    <hr>
    <div v-if="subtype != 'calligraphy'">
        编辑模式： <select v-model="mode">
            <option value="0">混合</option>
            <option value="1">代码</option>
            <option value="2">预览</option>
        </select> <button @click="addpic">插入图片</button>
        <Editor class="w-100" v-model="content" v-if="mode == '0'" />
        <textarea class="w-100" style="min-height:500px;font-family:monospace" v-model="content"
            v-if="mode == '1'"></textarea>
        <div class="w-100" style="min-height:500px;backdrop-filter: blur(10px);" v-if="mode == '2'" v-html="content">
        </div>
    </div>
    <div v-else>
        上传书法图片： <br>
        <input class="form-control" type="file" @change="upload" accept="image/*">
        <div v-html="content" v-if="content" id="content"></div>
    </div>
    <br>
    <hr>
    <br>
    <button @click="submit()" class="btn btn-primary ">提交</button>
</template>