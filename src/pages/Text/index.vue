<script setup>
definePage({ meta: { title: "学生创作" } })
const items = {};

function push_item(type, name, meta) {
    if(!items[type]) items[type] = {};
    items[type][name] = meta
}
const docitems = import.meta.glob("@/articles/*/*.md");
console.log(docitems);
for(let key in docitems) {
    const type = key.split("/").at(-2);
    const name = key.split("/").at(-1).split(".").slice(0, -1).join(".");
    const doc = await docitems[key]();
    const frontmatter = doc.frontmatter;
    frontmatter.name = name;
    push_item(type, name, frontmatter);
}
console.log(items);
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
    <h1>文学创作 <RouterLink class="btn btn-primary btn-sm" to="/text/create">我也要创作</RouterLink></h1>
    
    <div class="row">
        <div class="col-md-6">
            <h3>诗</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in items.poems">
                    <RouterLink :to="'/view?name=poems/' + item.name">{{ item.title }} <small>作者：{{ item.author }}</small></RouterLink>
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <h3>词</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in items.words">
                    <RouterLink :to="'/view?name=words/' + item.name">{{ item.title }} <small>作者：{{ item.author }}</small></RouterLink>
                </li>
            </ul>
            <h3>曲</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in items.songs">
                    <RouterLink :to="'/view?name=songs/' + item.name">{{ item.title }} <small>作者：{{ item.author }}</small></RouterLink>
                </li>
            </ul>
            <h3>书法</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in items.writings">
                    <RouterLink :to="'/view?name=writings/' + item.name">{{ item.title }} <small>作者：{{ item.author }}</small></RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>