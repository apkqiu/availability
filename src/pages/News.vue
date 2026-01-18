<script setup>
import vfs_articles from 'vfs:src/articles';
import vidr_pdf from 'vdir:src/static/pdf';
definePage({ meta: { title: "新闻" } })

</script>
<style scoped>
a {
    text-decoration: none;
}

.preview {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 3em;
}
</style>
<template>
    <h1>新闻</h1>
    <div class="row">
        <div class="col-md-8">
            <h2>最新文章</h2>
            <ul class="list-group list-group-flush w-100">
                <li class="list-group-item" v-for="item in Object.keys(vfs_articles.news)">
                    <RouterLink :to="'/view?name=news/' + item">{{ vfs_articles.news[item].content.split(/[\r\n]+/g)[0].replaceAll("#", "").trim() }}</RouterLink>
                </li>
            </ul>
        </div>
        <div class="col-md" style="position:sticky">
            <h2>周报出版</h2>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"
                    v-for="id in Object.keys(vidr_pdf).map((s) => parseFloat(s.substring(7, s.length - 4))).sort((a, b) => b - a)">
                    <RouterLink :to="`/view?name=pdf/${id}`">周恩来周报 第{{ id }}期</RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>