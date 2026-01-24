<script setup lang="js">
import { onMounted, ref, useTemplateRef } from 'vue';
import Comments from '../components/Comments.vue';
import { popular } from '../lib/web_data.js';
import PdfViewer from '../components/PdfViewer.vue';
import { Modal } from "bootstrap";
import { calc } from '../lib/csshelper.js';
const doccontent = ref();
const frontmatter = ref({});
const lg_img_src = ref("");
const preview = useTemplateRef("preview");
const pdf_src = ref('');
const current = ref("");
const same_author_list = ref([]);
const readtime = ref(0);
const viewercontent = ref("");
definePage({ meta: { title: "文章详情" } })
function calcplain(text) {
  // 1. 统计中文字数和英文词数
  const chineseChars = text.match(/[\u4e00-\u9fa5]/g)?.length || 0;
  const englishWords = text.match(/\b[a-zA-Z]+\b/g)?.length || 0;
  
  // 2. 转换为标准字数（1英文词≈1.8中文字）
  const standardWords = chineseChars + englishWords * 1.8;
  
  // 3. 基础速度（字/分钟）
  const baseSpeed = 238;
  
  // 4. 计算基础时间
  let minutes = standardWords / baseSpeed;
  
  // 5. 根据标点密度调整（标点多通常阅读更快）
  const punctuationRatio = (text.match(/[，。！？；,.!?;]/g)?.length || 0) / standardWords;
  if (punctuationRatio > 0.1) minutes *= 0.9;
  
  // 6. 向上取整到最近的0.5分钟
  return Math.ceil(minutes * 2) / 2;
}
let calculateReadingTime = calcplain;
function update_time(){
    readtime.value = calculateReadingTime(a.innerText);
    console.log(readtime.value )
}
onMounted(async () => {
    const name = new URLSearchParams(window.location.search).get("name");
    current.value = name;
    if (name) {
        const [type, docname] = name.split("/");
        if (type == "pdf") {
            frontmatter.value.title = "周恩来周报";
            frontmatter.value.subtitle = "第" + docname + "期";
            pdf_src.value = (await import(`@/static/pdf/zhoubao${docname}.pdf`)).default;
            calculateReadingTime=(xx)=>calcplain(viewercontent.value)
            
        } else {
            const doc = await import(`@/articles/${type}/${docname}.md`);
            doccontent.value = doc.default;
            frontmatter.value = doc.frontmatter;
            if(doc.frontmatter.author){
                const other_articles = import.meta.glob(`@/articles/*/*.md`);
                for (const key in other_articles) {
                    const other_doc = await other_articles[key]();
                    if (other_doc.frontmatter.author == doc.frontmatter.author) {
                        same_author_list.value.push({...other_doc.frontmatter, name: key.split("/").at(-2) + "/" + key.split("/").at(-1).split(".").slice(0, -1).join(".")});
                    }
                }
            }
            calculateReadingTime=calcplain;
        }
    }
    const preview_modal = new Modal(preview.value);
    let x;
    const a = document.getElementById("a");
    new MutationObserver(x = () => {
        let imgs = a.querySelectorAll("img");
        imgs.forEach((img) => {
            img.onclick = () => {
                lg_img_src.value = img.src;
                preview_modal.show();
            };
        })
        update_time();
    }).observe(a, { childList: true, subtree: true });
    x();
})
</script>
<style scoped>
#a :deep(img) {
    width: 100%;
    display: inline-block;
    image-orientation: from-image;
}
</style>
<template>
    <div class="modal fade" ref="preview" tabindex="-1">
        <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header" style="height: 50px !important;">
                    <span>{{ lg_img_src.split('/').at(-1) }}</span>
                    &nbsp;
                    <a :href="lg_img_src" download>下载</a>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <img :src="lg_img_src"></img>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8">
            <div style="backdrop-filter: blur(10px); padding: 10px" id=a>
                    <h3 v-if="frontmatter.supertitle">{{ frontmatter.supertitle }}</h3>
                    <h1 v-if="frontmatter.title">{{ frontmatter.title }}</h1>
                    <h2 v-if="frontmatter.subtitle">{{ frontmatter.subtitle }}</h2>
                    <p v-if="frontmatter.author">作者：{{ frontmatter.author }}</p>
                    <p v-if="frontmatter.date">日期：{{ frontmatter.date }}</p>
                    <p>{{ readtime }}分钟阅读</p>
                    <hr>
                    <component :is="doccontent" />
                    <PdfViewer :src="pdf_src" v-if="pdf_src" style="width:100%" :options="{ 'scale': 4 }" ref="viewer" @completed="update_time" v-model:content_plain="viewercontent"/>
                <hr />
                <Comments />
            </div>
        </div>
        <div class="col-md-4">
            <h4>人人关注</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="name in Object.keys(popular)">
                    <RouterLink :to="`/View?name=${popular[name]}`" v-html="name"></RouterLink>
                </li>
            </ul>
            <h4 v-if="same_author_list.length">同作者的其他文章</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="name in same_author_list">
                    <RouterLink :to="`/View?name=${name.name}`" :class="{'text-white': name.name==current}">{{ name.title }}</RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>