function navigate(url) {
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
    $("#PART_body").removeClass("fadeIn");
    $("#PART_body").addClass("fadeOut");
    $("#loading-mask").show();
    $.get(urlpath + ".json").then((data) => {
        set_viewdata(data, url);
    }).fail((xhr) => {
        // check 404
        set_viewdata({
            title: "undefined",
            title_in: "未知页面",
            body: xhr.responseText,
        }, url)
    });
}
function set_viewdata(data, url = null) {
    if (url) {
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
    $("#PART_body").removeClass("fadeOut");
    $("#PART_body").addClass("fadeIn");
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
}
window.onpopstate = function (event) {
    set_viewdata(event.state, null);
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