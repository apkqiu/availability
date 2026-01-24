export const popular = {
    '<b class="badge text-bg-danger">最新报导</b> 运动会快讯': 'news/news013.1',
    '<b class="badge text-bg-danger">最近热门</b> 我的一小步，暑假的一大步 ——我学生胜利完成本周暑假作业': 'news/2025.09.27',
    '<b class="badge text-bg-danger">站长推荐</b> 学校攻防2025.9.1': 'news/2025.09.01'
}
export const nav = {
    "首页": "/",
    "新闻": "/news",
    "文学创作": "/text",
    "设置": "/settings",
    "小程序": "/apps",
}
export const get_carousel = async () => [
    {
        image: await import("@/static/img/ccnews/013.1.01.jpeg"),
        link: "/view?name=news/news013.1",
        title: "传承中华体育魂",
        source: "运动会快讯",
    },
    {
        image: await import("@/static/img/news/birdinclass.png"),
        link: "/view?pdf=11",
        title: "震惊！我教室飞鸟",
        source: "《周恩来周报 第十一期》"
    },
    {
        image: await import("@/static/img/news/微信图片_20251001100626_83_43.jpg"),
        title: "“老母鸡变鸭了啊”",
        source: "——顾晓雯 | 名人名言"
    },
    {
        image: await import("@/static/img/wechat.png"),
        link: "/view?name=news/0000.00.01",
        title: "“一班报”",
        source: "微信公众号"

    }
]

export const background = {
    "bg-1.jpeg": () => import("@/static/img/background/bg-1.jpg"),
    "bg.jpg": () => import("@/static/img/background/bg.jpg"),
    "SchoolGate.jpg": () => import("@/static/img/background/SchoolGate.jpg"),
    "bg-2.png": () => import("@/static/img/background/bg-2.png"),
    "bg-4.jpg": () => import("@/static/img/background/bg-4.jpg"),
}
