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
var documents = [];