// A collection of documents for our examples
/*
<div class="col-md-6">
    <a class="btn m-1 w-100" href="{{root}}/soil_grass/index.html">藤崖伫月<br>草皮土壤</a>
    <a class="btn m-1 w-100" href="{{root}}/text/index.html">石窦收云<br>文学创作</a>
    <a class="btn m-1 w-100" href="{{root}}/web_maker/index.html">棕亭霁雪<br>自制网页</a>
    <a class="btn m-1 w-100" href="{{root}}/account/index.html">柳荫眠琴<br>账号管理</a>
</div>
<div class="col-md-6">
    <a class="btn m-1 w-100" href="{{root}}/news/index.html">屏山听瀑<br>周报</a>
    <a class="btn m-1 w-100" href="{{root}}/school/index.html">柳荫系舫<br>一草种</a>
    <a class="btn m-1 w-100" href="{{root}}/resource/index.html">林屋探奇<br>资料</a>
    <a class="btn m-1 w-100" href="{{root}}/game/index.html">荷岸观鱼<br>小游戏</a>
</div>
*/
var { pinyin } = pinyinPro;
var documents = [
    {
        title: "藤崖伫月 · 草皮土壤",
        url: "/soil_grass/index.html"
    },
    {
        title: "石窦收云 · 文学创作",
        url: "/text/index.html"
    },
    {
        title: "棕亭霁雪 · 自制网页",
        url: "/web_maker/index.html"
    },
    {
        title: "柳荫眠琴 · 账号管理",
        url: "/account/index.html"
    },
    {
        title: "屏山听瀑 · 周报",
        url: "/news/index.html"
    },
    {
        title: "柳荫系舫 · 一草种",
        url: "/school/index.html"
    },
    {
        title: "林屋探奇 · 资料整理",
        url: "/resource/index.html"
    },
    {
        title: "荷岸观鱼 · 小游戏",
        url: "/game/index.html"
    }
]
for (var i = 0; i < documents.length; i++) {
    documents[i].id = i;
    documents[i].title_split = "";
    for (var j = 0; j < documents[i].title.length; j++) {
        documents[i].title_split += documents[i].title[j];
        documents[i].title_split += " ";
    }
    documents[i].title_pinyin = pinyin(documents[i].title, { toneType: "none"})
    documents[i].title_pinyin_initial = pinyin(documents[i].title, { pattern:"initial"})
}


let miniSearch = new MiniSearch({
    fields: ["title",'title_split', "title_pinyin", "title_pinyin_initial"], // fields to index for full-text search
    storeFields: ['title', 'url'], // fields to return with search results
    searchOptions: {
        boost: { title: 1 },
        fuzzy: 0.2
    }
})

// Index all documents
miniSearch.addAll(documents)

