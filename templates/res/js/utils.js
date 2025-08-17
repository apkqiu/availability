function urlarg(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function hasharg(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.hash.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function getarg(name){
    return hasharg(name)||urlarg(name);
}
function hex2rgb(hex) {
    let r = 0,
        g = 0,
        b = 0;
    // 3 digits
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
}
function load(){} // should be replaced in spa_index.html
function should_load(url){ return false; } // should be replaced in spa_index.html
function check_ratio(){
    if (window.devicePixelRatio < 1){
        alert("不要缩放浏览器窗口")
    }
}
window.addEventListener('resize', check_ratio);
check_ratio();
setInterval(check_ratio, 1000);