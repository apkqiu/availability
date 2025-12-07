function navigate(url, replace = false, anim = true) {
    NProgress.start();
    window.scroll(0, 0);
    document.body.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    var hashpos = url.indexOf("#");
    var querypos = url.indexOf("?");
    if (hashpos != -1 && querypos != -1)
        var urlpath = url.substring(0, Math.min(hashpos, querypos));
    else if (hashpos != -1)
        var urlpath = url.substring(0, hashpos);
    else if (querypos != -1)
        var urlpath = url.substring(0, querypos);
    else
        var urlpath = url; if (anim) {
            $("#PART_body").removeClass("fadeIn");
            $("#PART_body").addClass("fadeOut");
        }
    document.title = "正在加载...";

    // RESET
    $("#offcanvasExample").offcanvas('hide');

    $('#nav_left').show(100);
    $('#nav').css('backdropFilter', 'blur(10px)');
    $('#footer').removeClass('hide_on_large hide_on_small');

    $("#loading-mask").show();
    var target_json;
    if (urlpath.endsWith(".html")) {
        target_json = urlpath + ".json";
    } else {
        target_json = urlpath + ".html.json";
    }
    $.get(target_json).then((data) => {
        set_viewdata(data, url, replace, anim);
        window.scroll(0, 0);
        document.body.scrollTo(0, 0);
        document.documentElement.scrollTo(0, 0);

    }).fail((xhr) => {
        if (!xhr.responseText) {
            // 一般性错误
            set_viewdata({ title: "加载失败", title_in: "加载失败", body: "<h1>加载失败</h1>加载失败，但是没有收到服务器返回的错误信息。" }, url, replace, anim);
            return;
        }
        var title = xhr.responseText.indexOf("<title>");
        var title_end = xhr.responseText.indexOf("</title>");
        if (title != -1 && title_end != -1)
            var title_str = xhr.responseText.substring(title + 7, title_end);
        else
            var title_str = "错误";
        // 此处的body需要去除script和style标签
        var body = xhr.responseText.substring(xhr.responseText.indexOf("<body>") + 6, xhr.responseText.indexOf("</body>"));
        var script_start = xhr.responseText.indexOf("<script>");
        while (script_start != -1) {
            var script_end = xhr.responseText.indexOf("</script>");
            body = body.substring(0, script_start) + body.substring(script_end + 9);
            script_start = xhr.responseText.indexOf("<script>", script_end);
        }
        var style_start = xhr.responseText.indexOf("<style>");
        while (style_start != -1) {
            var style_end = xhr.responseText.indexOf("</style>");
            body = body.substring(0, style_start) + body.substring(style_end + 8);
            style_start = xhr.responseText.indexOf("<style>", style_end);
        }


        set_viewdata({
            title: title_str,
            title_in: title_str,
            body: body,
        }, url, replace, anim)
    });
}

function update_element(e) {
    var element = $(e);
    var style = getComputedStyle(element[0]);
    // 遍历所有属性，只是为了刷新
    var arr = []
    for (var i = 0; i < style.length; i++) {
        var property = style[i];
        var value = style.getPropertyValue(property);
        arr.push(property + ":" + value);
    }
    return arr;
}

function set_viewdata(data, url = null, replace = false, anim = true) {

    if (url) {
        if (replace)
            history.replaceState(data, null, url);
        else
            history.pushState(data, null, url);
    }
    if (data.title)
        document.title = data.title;
    var oldroot = root;
    if (data.rootdef) {
        root = data.rootdef;
        true_root = data.rootdef;
    }
    update_element($('#nav_left'));
    update_element($('#nav'));
    update_element($('#footer'));
    $("#comments").hide();

    $("#PART_title").html(data.title ? data.title : "");
    $("#PART_title_in").html(data.title_in ? data.title_in : "");
    $("#PART_outbody").html(data.outbody ? data.outbody : "");
    $("#PART_body").html(data.body ? data.body : "");
    if (anim) {
        $("#PART_body").removeClass("fadeOut");
        $("#PART_body").addClass("fadeIn");
    }
    $("#loading-mask").hide();

    if (data.rootdef == '.' && location.href.indexOf("/home") != -1) {
        $("#nav_back").hide();
        $("#nav_home").hide();
    } else {
        $("#nav_back").show();
        $("#nav_home").show();
    }

    // EXECUTE SCRIPT AT OUTBODY AND BODY
    // find all script tags in outbody and body
    var scripts = $("#PART_outbody, #PART_body").find("script");
    $("#script-mount-node").html("");
    // execute each script

    scripts.each(function () {
        var item = this;
        const newScript = document.createElement('script')
        const content = item.text || item.textContent || item.innerHTML || ''
        Array.from(item.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value))
        newScript.appendChild(document.createTextNode(content))
        item.parentNode.replaceChild(newScript, item)
    });
    document.querySelectorAll('script[data-pjax]').forEach(item => {
        const newScript = document.createElement('script')
        const content = item.text || item.textContent || item.innerHTML || ''
        Array.from(item.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value))
        newScript.appendChild(document.createTextNode(content))
        item.parentNode.replaceChild(newScript, item)
    })
    // create a new script tag
    // var script = document.createElement("script");
    // // set the text of the script tag
    // script.text = delayed.join("\n");
    // // append the script tag to the body


    var updates = $(".need-update-root");
    updates.each(function () {
        $(this).attr("href", $(this).attr("href").replace(oldroot, root));
    });
    NProgress.done();
    window.dispatchEvent(new Event("spa_navigate"));
}
var prev_page = location.href.split("#")[0];
window.onpopstate = function (event) {
    if (prev_page == location.href.split("#")[0]) return;
    prev_page = location.href.split("#")[0];
    // browser changed the url
    if (event.state) {
        // 有eventdata
        set_viewdata(event.state, null);
    } else {
        navigate(location.pathname + this.location.search, true, false);
    }
}
// 定位所有a标签
$(document).on("click", "a", function (e) {
    if ($(this).attr("href").startsWith("#") || $(this).attr("href").indexOf(":") != -1 || $(this).attr("no-intercept") == "true") {
        return;
    }
    e.preventDefault();
    navigate($(this).attr("href"));
});
$(document).on('click', 'a[href^="#"]', function (e) {
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if(!targetElement||["fixed", "sticky", "absolute"].includes(getComputedStyle(targetElement).position)) return;
    e.preventDefault();
    const navbarHeight = 70; // 导航栏高度

    window.scrollTo({
        top: targetElement.offsetTop - navbarHeight,
        behavior: 'smooth'
    });
});

$(function () {
    navigate(window.location.pathname + window.location.search + window.location.hash, true);
});