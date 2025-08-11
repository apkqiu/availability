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
    if (result.length == 0) return [];
    result.sort((a, b) => b.score - a.score);
    if (result[0].score > 0.2) {
        result = result.filter((a) => a.score > 0.2);
    }
    return result;
}
var documents = [{"title": "\u85e4\u5d16\u4f2b\u6708 \u00b7 \u8349\u76ae\u571f\u58e4", "tag": "\u7f51\u9875", "url": "/soil_grass/index.html"}, {"title": "\u77f3\u7aa6\u6536\u4e91 \u00b7 \u6587\u5b66\u521b\u4f5c", "tag": "\u7f51\u9875", "url": "/text/index.html"}, {"title": "\u68d5\u4ead\u9701\u96ea \u00b7 \u81ea\u5236\u7f51\u9875", "tag": "\u7f51\u9875", "url": "/web_maker/index.html"}, {"title": "\u67f3\u836b\u7720\u7434 \u00b7 \u8d26\u53f7\u7ba1\u7406", "tag": "\u7f51\u9875", "url": "/account/index.html"}, {"title": "\u5c4f\u5c71\u542c\u7011 \u00b7 \u5468\u62a5", "tag": "\u7f51\u9875", "url": "/news/index.html"}, {"title": "\u67f3\u836b\u7cfb\u822b \u00b7 \u4e00\u8349\u79cd", "tag": "\u7f51\u9875", "url": "/school/index.html"}, {"title": "\u6797\u5c4b\u63a2\u5947 \u00b7 \u8d44\u6599\u6574\u7406", "tag": "\u7f51\u9875", "url": "/resource/index.html"}, {"title": "\u8377\u5cb8\u89c2\u9c7c \u00b7 \u5c0f\u6e38\u620f", "tag": "\u7f51\u9875", "url": "/game/index.html"}, {"title": "\u9633\u5149\u4fa7\u5e73 \uff08\u5b59\u4f73\u94ed\uff0c\u7b14\u540d\uff1a\u62c2\u67f3\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bd7", "url": "/text/index.html?p=1&type=1"}, {"title": "\u62a4\u62e6 \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bd7", "url": "/text/index.html?p=2&type=1"}, {"title": "\u8001\u5e08\u4e0e\u5b66\u751f \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bd7", "url": "/text/index.html?p=3&type=1"}, {"title": "\u623f\u6b63 \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bd7", "url": "/text/index.html?p=4&type=1"}, {"title": "\u7f8e\u9a74\u4e0e\u91ce\u517d \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bd7", "url": "/text/index.html?p=5&type=1"}, {"title": "\u71ac\u591c \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bd7", "url": "/text/index.html?p=6&type=1"}, {"title": "\u8c22\u6731\u946b\u78ca \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bd7", "url": "/text/index.html?p=7&type=1"}, {"title": "\u4e00\u6708\u5341\u65e5\u6c60\u5858\u7ed3\u51b0 \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bd7", "url": "/text/index.html?p=8&type=1"}, {"title": "\u4f5c\u4e1a\u8bba \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bd7", "url": "/text/index.html?p=9&type=1"}, {"title": "\u9001\u6731\u946b\u78ca \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bd7", "url": "/text/index.html?p=10&type=1"}, {"title": "\u5357\u5b8b\u5317\u8bd7\u521d\u4e2d\u751f \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bd7", "url": "/text/index.html?p=11&type=1"}, {"title": "\u6e14\u5bb6\u50b2\u00b7\u5f00\u5b66 \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bcd", "url": "/text/index.html?p=12&type=2"}, {"title": "\u5982\u68a6\u4ee4\u00b7\u6691\u65e5\u8bfe\u4e1a \uff08\u970d\u6c9b\u9716\uff0c\u7b14\u540d\uff1a\u666e\u9716\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u8bcd", "url": "/text/index.html?p=13&type=2"}, {"title": "\u5929\u51c0\u6c99\u00b7\u4e00\u521d\u4e2d\uff08\u5176\u4e00\uff09 \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u66f2", "url": "/text/index.html?p=14&type=3"}, {"title": "\u5929\u51c0\u6c99\u00b7\u4e00\u521d\u4e2d\uff08\u5176\u4e8c\uff09 \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u66f2", "url": "/text/index.html?p=15&type=3"}, {"title": "\u5929\u51c0\u6c99\u00b7\u52a8\u70b9 \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u66f2", "url": "/text/index.html?p=16&type=3"}, {"title": "\u5929\u51c0\u6c99\u00b7\u6691\u5047\u8fc7\u534a \uff08\u674e\u519b\u660a\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u66f2", "url": "/text/index.html?p=17&type=3"}, {"title": "\u5b8b\u541b\u66f2 \uff08\u4faf\u5929\u4f51\uff09", "tag": "\u6587\u5b66\u521b\u4f5c \u00b7 \u66f2", "url": "/text/index.html?p=18&type=3"}];