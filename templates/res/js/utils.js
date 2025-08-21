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
// 法0：监听键盘
document.onkeydown = (e) => {
    if (e.key == "F12" || (e.ctrlKey && e.shiftKey && e.key == "I")) {
        e.preventDefault(); // devtools
    }
    if (e.ctrlKey && e.key == "U") {
        e.preventDefault(); // SAVE page
    }
};
// 法1：监听窗口大小变化
setInterval(() => {
    if ((window.outerWidth - window.innerWidth > 200) || (window.outerHeight - window.innerHeight > 200)) {
        // devtools
        $("#app").html("<h1>检测到开发者工具被打开</h1><p>请关闭开发者工具，然后刷新页面</p>")

    }
}, 1);
// 法2：利用console内存泄漏
function now() {
    return new Date().getTime();
}
// 创建大对象数组
function createLargeObject() {
    const largeObject = {};
    for (let i = 0; i < 500; i++) {
        largeObject[`${i}`] = `${i}`;
    }
    return largeObject;
}
// 创建大对象数组
function createLargeObjectArray() {
    const largeObject = createLargeObject();
    const largeObjectArray = [];
    for (let i = 0; i < 50; i++) {
        largeObjectArray.push(largeObject);
    }
    return largeObjectArray;
}

// 计算打印执行时间
function calculateTime(func) {
    const start = now();
    func();
    return now() - start;
}

const largeObjectArray = createLargeObjectArray()
let maxPrintTime = 0
var dev_dec2 = setInterval(() => {
    // table 打印时间
    const tablePrintTime = calculateTime(() => { console.table(largeObjectArray); });
    // 普通输出时间
    const printLogTime = calculateTime(() => { console.log(largeObjectArray) })
    maxPrintTime = Math.max(maxPrintTime, printLogTime)

    if (tablePrintTime === 0 || maxPrintTime === 0) {
        return
    } else {
        // 如果打印表格的时间是普通打印的2倍，那么就关闭
        if (tablePrintTime > maxPrintTime) { // 如果当前表格打印时间大于指定时间，那么将表示打开了devtools
            $("#app").html("<h1>检测到开发者工具被打开</h1><p>请关闭开发者工具，然后刷新页面</p>")
            clearInterval(dev_dec2)
        }
    }
}, 500)
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