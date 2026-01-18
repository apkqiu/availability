<script setup lang="js">
import { onMounted, ref, useTemplateRef } from 'vue';
import { Url, WebDocument } from '../lib/utils';
import vfs_articles from "vfs:src/articles";
import Comments from '../components/Comments.vue';
import { popular } from '../lib/web_data.js';
import PdfViewer from '../components/PdfViewer.vue';
import { Modal } from "bootstrap";
const doccontent = useTemplateRef("content");
const lg_img_src = ref('');
const preview = useTemplateRef("preview");
const pdf_src = ref('');
definePage({ meta: { title: "文章详情" } })
onMounted(async () => {
    let { name, pdf } = Url.args();

    // normal document ## from articles/news
    if (name) {
        name = name.split("/");
        doccontent.value.innerHTML = new WebDocument(vfs_articles[name[0]][name[1]].content,true).render();
    }
    // pdf document ## from ref/pdf
    if (pdf)
        pdf_src.value = (await import(`@/static/pdf/zhoubao${pdf}.pdf`)).default;
    const preview_modal = new Modal(preview.value);
    let x;
    new MutationObserver(x = () => {
        let imgs = doccontent.value.querySelectorAll("img");
        imgs.forEach((img) => {
            img.addEventListener("click", () => {
                lg_img_src.value = img.src;
                preview_modal.show();
            })
        })
    }).observe(doccontent.value, { childList: true, subtree: true });
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
                <div ref="content">
                    <PdfViewer :src="pdf_src" v-if="pdf_src" style="width:100%" :options="{ 'scale': 4 }" />
                </div>
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
        </div>
    </div>
</template>