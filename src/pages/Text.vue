<script setup>
import { WebDocument } from '../lib/utils';
import vfs_articles from 'vfs:src/articles';
definePage({ meta: { title: "学生创作" } })
const items = {};
for (let type of ["poems", "songs", "words", "writings"]) {
    items[type] = [];
    for (let name in vfs_articles[type]) {
        const file = vfs_articles[type][name];
        const [title, author] = new WebDocument(file.content, true).getTitle(1);
        items[type].push({title:`${title} <small>作者：${author}</small>`, name});
    }
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
    <div id="students_text"></div>
    <div class="row">
        <div class="col-md-6">
            <h3>诗</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in items.poems">
                    <RouterLink :to="'/view?name=poems/' + item.name" v-html="item.title"></RouterLink>
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <h3>词</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in items.words">
                    <RouterLink :to="'/view?name=words/' + item.name" v-html="item.title"></RouterLink>
                </li>
            </ul>
            <h3>曲</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in items.songs">
                    <RouterLink :to="'/view?name=songs/' + item.name" v-html="item.title"></RouterLink>
                </li>
            </ul>
            <h3>书法</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in items.writings">
                    <RouterLink :to="'/view?name=writings/' + item.name" v-html="item.title"></RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>