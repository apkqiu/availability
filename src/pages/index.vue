<style scoped>
a {
    text-decoration: none;
}
</style>
<script setup>
import { url } from "../lib/csshelper.js"
import { popular, get_carousel } from "../lib/web_data.js";
import { onMounted, ref } from "vue";
const pdf = Object.keys(import.meta.glob('@/static/pdf/*.pdf')).map((path) => path.split('/').pop()).map((s) => parseFloat(s.substring(7, s.length - 4))).sort((a, b) => b - a);
const items = [];
const carousel_items = ref([]);
onMounted(async () => {
    carousel_items.value = await get_carousel();
    carousel_items.value[0].active = true;
})

const dir_items = import.meta.glob("@/articles/news/*.md");
for (let key in dir_items) {
    items.push({ name: key.split('/').pop().split(".").slice(0, -1).join("."),
        title:(await dir_items[key]()).frontmatter.title
     });
}

definePage({ meta: { title: "首页" } })

</script>
<style scoped>
.news-bg {
    background-size: cover;
    background-position: center;
    height: 500px;
    max-height: 80vw;
}

.news-plain {
    /*横向居中*/
    text-align: center;
    /*垂直居中*/
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

}

.news-txt-box {
    background: linear-gradient(transparent 70%, black);
    color: white;
    height: 100%;
}

.news-txt {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding: 10px;
}
</style>
<template>
    <div class="row">
        <div class="col-md-6 mb-3">
            <div id="carousel" class="carousel slide h-100" style="backdrop-filter: blur(20px)">
                <div class="carousel-inner">
                    <div class="carousel-item" :class="{ 'active': active }"
                        v-for="{ image, link, title, source, active } in carousel_items">
                        <RouterLink class="news-bg d-block w-100"
                            :style="{ 'background-image': url(typeof image === 'string' ? image : image.default) }"
                            :to="link || ''">
                            <div class="news-txt-box">
                                <div class="news-txt">
                                    <h1>{{ title }}</h1>
                                    <p>{{ source }}</p>
                                </div>
                            </div>
                        </RouterLink>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">上一个</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">下一个</span>
                </button>
            </div>
        </div>
        <div class="col-md-6 mb-3">
            <h3>热点新闻</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="name in Object.keys(popular)">
                    <RouterLink :to="`/View?name=${popular[name]}`" v-html="name"></RouterLink>
                </li>
            </ul>
            <span class="h3">最新文章</span><small>
                <RouterLink to="news">所有新闻>></RouterLink>
            </small>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"
                    v-for="item in items.filter((item) => !item.name.startsWith('n')).toReversed().splice(0, 5)">
                    <RouterLink :to="`/View?name=news/${item.name}`">{{ item.title }}</RouterLink>
                </li>
            </ul>
        </div>
    </div>
    <div class="containe">
        <div class="row">
            <div class="col-md-6 mb-3">
                <span class="h3">最新周报</span>
                <small>
                    <RouterLink to="news">所有周报>></RouterLink>
                </small>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"
                        v-for="id in pdf">
                        <RouterLink :to="`/view?name=pdf/${id}`">周恩来周报 第{{ id }}期</RouterLink>
                    </li>
                </ul>
                <span class="h3">随机作品</span><small>
                    <RouterLink to="text">查看更多>></RouterLink>
                </small>
                <ul class="list-group list-group-flush" id="students_text">
                    <p>没有配置。</p>
                </ul>
            </div>
            <div class="col-md-6 mb-3">
                <span class="h3">热门游戏</span><small>
                    <RouterLink to="apps">所有游戏>></RouterLink>
                </small>
                <div class="card mb-3">
                    <div class="card-body">
                        <h3 class="card-title">
                            <span style="color: #ffd700">TOP1.</span> 上课睡觉模拟器
                        </h3>
                        <p class="card-text">
                            眼观六路耳听八方，在老师巡查中安然入睡。躲避干扰、抓紧补眠，你能睡过整堂课吗？
                        </p>
                        <RouterLink to="apps/ClassSleep" class="btn btn-primary">开始游戏
                        </RouterLink>
                    </div>
                </div>
                <div>
                    <a class="btn" href="old/index.html">旧版网站</a>
                    <a class="btn" href="https://github.com/apkqiu/availability/releases/latest"
                        no-intercept="true">下载电脑客户端</a>

                </div>
            </div>
        </div>
    </div>
    <div style="clear: both"></div>

</template>
