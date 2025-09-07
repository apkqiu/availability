

// $(document).ready(function () {
//     $("#customMenu").hide();
//     $("#cut").click(function () {
//         console.log("cut");
//         document.execCommand("cut");
//         $("#customMenu").hide(100);
//     })
//     $("#copy").click(function () {
//         console.log("copy");
//         document.execCommand("copy");
//         $("#customMenu").hide(100);
//     })
//     $("#paste").click(function () {
//         console.log("paste");
//         document.execCommand("paste");
//         $("#customMenu").hide(100);
//     })
//     $(document).bind('contextmenu', function (e) {
//         e.preventDefault();
//         $("#customMenu")
//             .css({
//                 top: e.pageY,
//                 left: e.pageX
//             }).show(100);
//     });

//     // 点击其他地方隐藏菜单
//     $(document).click(function () {
//         $("#customMenu").hide(100);
//     });
// });