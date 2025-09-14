function navigate(url, replace = false, anim = true) {
    NProgress.start();
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
        var urlpath = url;
    console.log(urlpath);
    if (anim) {
        $("#PART_body").removeClass("fadeIn");
        $("#PART_body").addClass("fadeOut");
    }
    document.title = "正在加载...";
    $("#loading-mask").show();
    $.get(urlpath + ".json").then((data) => {
        set_viewdata(data, url, replace, anim);
    }).fail((xhr) => {
        var title = xhr.responseText.indexOf("<title>");
        var title_end = xhr.responseText.indexOf("</title>");
        if (title != -1 && title_end != -1)
            var title_str = xhr.responseText.substring(title + 7, title_end);
        else
            var title_str = "错误";
        set_viewdata({
            title: title_str,
            title_in: title_str,
            body: xhr.responseText,
        }, url)
    });
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
    $("#PART_title_in").html(data.title_in ? data.title_in : "");
    $("#PART_outbody").html(data.outbody ? data.outbody : "");
    $("#PART_body").html(data.body ? data.body : "");
    if (anim) {
        $("#PART_body").removeClass("fadeOut");
        $("#PART_body").addClass("fadeIn");
    }
    $("#loading-mask").hide();
    // RESET

    $('#nav_left').show(100);
    $('#nav_control').show(100);
    $('#nav').css('backdropFilter', 'blur(10px)');
    $('#footer').removeClass('hide_on_large hide_on_small');

    // EXECUTE SCRIPT AT OUTBODY AND BODY
    // find all script tags in outbody and body
    var scripts = $("#PART_outbody, #PART_body").find("script");
    $("#script-mount-node").html("");
    // execute each script
    var delayed = [];
    scripts.each(function () {
        delayed.push($(this).text());
    });
    // create a new script tag
    var script = document.createElement("script");
    // set the text of the script tag
    script.text = delayed.join("\n");
    // append the script tag to the body
    $("#script-mount-node").append(script);

    var updates = $(".need-update-root");
    updates.each(function () {
        $(this).attr("href", $(this).attr("href").replace(oldroot, root));
    });
    NProgress.done();
}
window.onpopstate = function (event) {
    if (event.state) {
        // 有eventdata
        set_viewdata(event.state, null);
    } else {
        navigate(location.href, true, false);
    }
    // browser changed the url
}
// 定位所有a标签
$(document).on("click", "a", function (e) {
    if ($(this).attr("href").startsWith("#")) {
        return;
    }
    e.preventDefault();
    navigate($(this).attr("href"));
});
$(document).ready(function () {
    navigate(window.location.pathname, true);
});