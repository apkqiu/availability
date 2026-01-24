<script setup>
definePage({ meta: { title: "新闻" } })
const articles = import.meta.glob('@/articles/news/*.md');
const pdf = Object.keys(import.meta.glob('@/static/pdf/*.pdf')).map((path) => path.split('/').pop()).map((s) => parseFloat(s.substring(7, s.length - 4))).sort((a, b) => b - a);
const list_of_articles = []
for (let key in articles) {
    const article = await articles[key]()
    const frontmatter = article.frontmatter
    frontmatter.name = key.split('/').pop().split('.').slice(0, -1).join('.')
    list_of_articles.push(frontmatter)
}
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
                <li class="list-group-item" v-for="item in list_of_articles">
                    <RouterLink :to="'/view?name=news/' + item.name">{{ item.title }}</RouterLink>
                </li>
            </ul>
        </div>
        <div class="col-md" style="position:sticky">
            <h2>周报出版</h2>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"
                    v-for="id in pdf">
                    <RouterLink :to="`/view?name=pdf/${id}`">周恩来周报 第{{ id }}期</RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>