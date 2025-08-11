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
const levenshetin = (function () {
    function _min(d0, d1, d2, bx, ay) {
        return d0 < d1 || d2 < d1
            ? d0 > d2
                ? d2 + 1
                : d0 + 1
            : bx === ay
                ? d1
                : d1 + 1;
    }

    return function (a, b) {
        if (a === b) {
            return 0;
        }

        if (a.length > b.length) {
            var tmp = a;
            a = b;
            b = tmp;
        }

        var la = a.length;
        var lb = b.length;

        while (la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
            la--;
            lb--;
        }

        var offset = 0;

        while (offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
            offset++;
        }

        la -= offset;
        lb -= offset;

        if (la === 0 || lb < 3) {
            return lb;
        }

        var x = 0;
        var y;
        var d0;
        var d1;
        var d2;
        var d3;
        var dd;
        var dy;
        var ay;
        var bx0;
        var bx1;
        var bx2;
        var bx3;

        var vector = [];

        for (y = 0; y < la; y++) {
            vector.push(y + 1);
            vector.push(a.charCodeAt(offset + y));
        }

        var len = vector.length - 1;

        for (; x < lb - 3;) {
            bx0 = b.charCodeAt(offset + (d0 = x));
            bx1 = b.charCodeAt(offset + (d1 = x + 1));
            bx2 = b.charCodeAt(offset + (d2 = x + 2));
            bx3 = b.charCodeAt(offset + (d3 = x + 3));
            dd = (x += 4);
            for (y = 0; y < len; y += 2) {
                dy = vector[y];
                ay = vector[y + 1];
                d0 = _min(dy, d0, d1, bx0, ay);
                d1 = _min(d0, d1, d2, bx1, ay);
                d2 = _min(d1, d2, d3, bx2, ay);
                dd = _min(d2, d3, dd, bx3, ay);
                vector[y] = dd;
                d3 = d2;
                d2 = d1;
                d1 = d0;
                d0 = dy;
            }
        }

        for (; x < lb;) {
            bx0 = b.charCodeAt(offset + (d0 = x));
            dd = ++x;
            for (y = 0; y < len; y += 2) {
                dy = vector[y];
                vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
                d0 = dy;
            }
        }

        return dd;
    };
})();


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
function search_document(string) {
    var result = [];
    for (var i = 0; i < documents.length; i++) {
        var score = 1 - (Math.abs(levenshetin(string, documents[i].title)) / documents[i].title.length);
        var res = documents[i];
        res.score = score;
        if (score > 0) {
            result.push(documents[i]);
        }
    }
    result.sort((a,b) => b.score - a.score);
    if(result[0].score > 0.2){
        result = result.filter((a) => a.score > 0.2);
    }
    return result;
}
