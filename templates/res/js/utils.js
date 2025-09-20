function urlarg(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function hasharg(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.hash.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function getarg(name) {
    return hasharg(name) || urlarg(name);
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

function is_electron() {
    var userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf('electron') != -1;
}
function is_using_fileuri() {
    return window.location.href.indexOf("file://") != -1;
}
function is_http() {
    return window.location.href.indexOf("http://") != -1 || window.location.href.indexOf("https://") != -1;
}

function fetch_text(url) {
    return new Promise((resolve, reject) => {
        $.get(root+url).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}
function fetch_compressed_text(url) {
    return new Promise((resolve, reject) => {
        fetch_text(root+"/../../../zipped"+url+".7z").then((data) => {
            resolve(pako.ungzip(data, { to: 'string' }));
        }).catch((err) => {
            reject(err);
        });
    });
}

