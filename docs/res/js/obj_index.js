function search_document(string) {
    var result = [];
    for (var i = 0; i < documents.length; i++) {
        var score = 1 - Math.abs(levenshetin(string, documents[i].title)) / documents[i].title.length;
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
const documents = [{"title": "\u85e4\u5d16\u4f2b\u6708 \u00b7 \u8349\u76ae\u571f\u58e4", "tag": "\u7f51\u9875", "url": "/soil_grass/index.html"}, {"title": "\u77f3\u7aa6\u6536\u4e91 \u00b7 \u6587\u5b66\u521b\u4f5c", "tag": "\u7f51\u9875", "url": "/text/index.html"}, {"title": "\u68d5\u4ead\u9701\u96ea \u00b7 \u81ea\u5236\u7f51\u9875", "tag": "\u7f51\u9875", "url": "/web_maker/index.html"}, {"title": "\u67f3\u836b\u7720\u7434 \u00b7 \u8d26\u53f7\u7ba1\u7406", "tag": "\u7f51\u9875", "url": "/account/index.html"}, {"title": "\u5c4f\u5c71\u542c\u7011 \u00b7 \u65b0\u95fb", "tag": "\u7f51\u9875", "url": "/news/index.html"}, {"title": "\u67f3\u836b\u7cfb\u822b \u00b7 \u4e00\u8349\u79cd", "tag": "\u7f51\u9875", "url": "/school/index.html"}, {"title": "\u6797\u5c4b\u63a2\u5947 \u00b7 \u8d44\u6599\u6574\u7406", "tag": "\u7f51\u9875", "url": "/resource/index.html"}, {"title": "\u8377\u5cb8\u89c2\u9c7c \u00b7 \u5c0f\u6e38\u620f", "tag": "\u7f51\u9875", "url": "/game/index.html"}];