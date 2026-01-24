<script setup>
import { onMounted,ref } from 'vue'
import { GlobalWorkerOptions as pdfjs_GlobalWorkerOptions, getDocument as pdfjs_getDocument, version as pdfjs_version } from 'pdfjs-dist';
const props = defineProps(["src", "options", "style",])
const content_plain = defineModel( "content_plain", {default:""});
const emit = defineEmits(["completed"]);
onMounted(async () => {
    let a = ""
    const url = props.src;
    const options = typeof props.options === "string" ? JSON.parse(props.options) : props.options;
    pdfjs_GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs_version}/build/pdf.worker.mjs`
    const container = document.getElementById('container')
    container.innerHTML = ''

    const scale = options?.scale ?? 1
    const targetPage = options?.page

    try {
        const loadingTask = pdfjs_getDocument(url)
        const pdf = await loadingTask.promise

        const pages = targetPage
            ? [targetPage]
            : Array.from({ length: pdf.numPages }, (_, i) => i + 1)

        for (const pageNum of pages) {
            const page = await pdf.getPage(pageNum)
            const viewport = page.getViewport({ scale })

            const imgview = document.createElement('img')
            const backcanvas = document.createElement('canvas')
            const context = backcanvas.getContext('2d')

            imgview.style.marginBottom = '12px'

            backcanvas.width = viewport.width
            backcanvas.height = viewport.height

            imgview.style.width = "100%"
            imgview.style.height = "100%"
            container.appendChild(imgview)

            const renderContext = {
                canvasContext: context,
                viewport
            }
            page.render(renderContext).promise.then(() => {
                backcanvas.toBlob(async (blob) => {
                    imgview.src = URL.createObjectURL(blob)
                    
                })
            })
            const text = await page.getTextContent({ normalizeWhitespace: true , includeImages: true});
            
            for(const item of text.items){
                a += item.str;
            }
        }
    } catch (error) {
        console.error('PDF 加载失败:', error)
        container.innerHTML = '<p style="color:red">加载失败</p>'
    }
    content_plain.value = a;
    emit('completed');
});

</script>
<template>
    <div id="container" style="width:100%;height:100%"></div>
</template>