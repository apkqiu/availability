// $(document).ready(function () {
//     var all_link = $("a")
//     for (var i = 0; i < all_link.length; i++) {
//         let link = all_link[i];
//         let href = $(link).attr("href");
//         if (href.indexOf("#")!=-1 || href == null) {
//             $(link).attr("href", "javascript:void(0)")
//         } else if (href.startsWith("javascript:")) {
//             $(link).attr("href", href)
//         }
//         else {
//             $(link).attr("href", "#")
//             $(link).click(function () {
//                 window.location.href = href
//                 // history.pushState({ href: href }, null, href)
//             })
//         }
//     }
// }
// )
// onpopstate = function (event) {
//     $.get(event.state).then((data) => {
//         // find the body element
//         window.location.href = data
//         //
//         document.writeln(data)
//         console.log(data)
//     })
// }