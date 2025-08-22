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
function load() { } // should be replaced in spa_index.html
function should_load(url) { return false; } // should be replaced in spa_index.html


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

$(document).ready(function () {
    $("#customMenu").hide();
    $("#cut").click(function () {
        console.log("cut");
        document.execCommand("cut");
        $("#customMenu").hide(100);
    })
    $("#copy").click(function () {
        console.log("copy");
        document.execCommand("copy");
        $("#customMenu").hide(100);
    })
    $("#paste").click(function () {
        console.log("paste");
        document.execCommand("paste");
        $("#customMenu").hide(100);
    })
    $(document).bind('contextmenu', function (e) {
        e.preventDefault();
        $("#customMenu")
            .css({
                top: e.pageY,
                left: e.pageX
            }).show(100);
    });

    // 点击其他地方隐藏菜单
    $(document).click(function () {
        $("#customMenu").hide(100);
    });
});