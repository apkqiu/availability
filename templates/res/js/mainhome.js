$(function () {
    if (is_electron()) {
        $('#nav_left li:nth-child(1)').attr('href', '{{root}}/home.html');
    } else if (is_using_fileuri()) {
        $('#nav_left li:nth-child(1)').attr('href', '{{root}}/home.html');
    }
    function update_back_uri() {
        if (window.location.href.endsWith('/index.html')) {
            if (true_root == '..') $('#nav_back').attr('href', '../home.html');
            else $('#nav_back').attr('href', '../index.html');
        } else {
            $('#nav_back').attr('href', './index.html');
        }
    }
    update_back_uri();

    window.addEventListener('spa_navigate', update_back_uri);

    if (new Date().getFullYear() > 2025) {
        $('#yr').text('2025-' + new Date().getFullYear());
    }
    // personalization
    var color = localStorage.getItem('color') || '#000000';
    if (localStorage.getItem('adv_bg') == 'false') {
        $('#bg').css('display', 'none');
        $('#mainbody').css('background', 'rgba(' + hex2rgb(color).join(',') + ',1)');
    } else {
        var brightness = localStorage.getItem('bgbrightness') || 50;
        if (brightness >= 100) $('#mask').css('background', 'rgba(255,255,255,' + (brightness - 100) / 100 + ')');
        else $('#mask').css('background', 'rgba(0,0,0,' + (100 - brightness) / 100 + ')');
        var coloropacity = localStorage.getItem('coloropacity') || 0;
        $('#mainbody').css('background', 'rgba(' + hex2rgb(color).join(',') + ',' + coloropacity / 100 + ')');
        $('#bg').css('filter', 'blur(' + (new Number(localStorage.getItem('bgblur')) || 0) + 'px)');
    }
    if (localStorage.getItem('no-anim') == 'true') {
        var style_noanim = $('<style>*{transition: none !important;animation: none !important;}</style>');
        $('#script-mount-node').append(style_noanim);
    }
    if ((localStorage.getItem('dark') || 'true') == 'true') {
        $('#html-root').attr('data-bs-theme', 'dark');
    }
    var img = localStorage.getItem('imgbg') || 'bg-1.jpg';
    if (img == 'custom') {
        localforage.getItem('imgbg').then(function (value) {
            $('#bg').attr('src', value);
        });
        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene);
    } else {
        // check if img has multi-layer;
        $.get(root + "/res/img/background/" + img + "/deepth.json").then(function (data) {
            console.log(data)
            // we may change the scene
            var layers_count = data.layers;
            var layers_deepth = data.deepth;
            var img = data.img;
            var layers = [];
            for (var i = 0; i < layers_count; i++) {
                layers.push({ img: root + "/res/img/background/" + img + "/" + (i + 1) + ".png", deepth: data.deepth[i] });
            }
            $("#scene").empty();
            for (var i = 0; i < layers_count; i++) {
                /*
                <li class="layer" data-depth="0.4" style="height: 100%; width: 100%">
                    <img id="bg" style="height: 100%; width: 100%; object-fit: cover" />
                </li>
                */
                console.log(layers[i].img)
                var layer = $('<li class="layer" data-depth="' + layers[i].deepth + '" style="height: 100%; width: 100%"></li>');
                var img = $('<img id="bg" style="height: 100%; width: 100%; object-fit: cover" />');
                img.attr('src', layers[i].img);
                layer.append(img);
                $("#scene").append(layer);
            }
            // set deepth
            var scene = document.getElementById('scene');
            var parallax = new Parallax(scene);
        }).fail(() => {
            // not multi-layer

            $('#bg').attr('src', root + '/res/img/background/' + img);
            var scene = document.getElementById('scene');
            var parallax = new Parallax(scene);
        })
    }
    // search
    $('#searchResult').html("<a href='#' class='list-group-item'>开始搜索吧</a>");
    // navbar fix
    setInterval(() => {

        $('#mainbody').css('padding-top', getComputedStyle(document.getElementsByTagName('nav')[0]).height);
    }, 10);
    // parallax

    function search() {
        $('#searchResult').empty();
        if ($('#searchInput').val() == '') {
            $('#searchResult').html("<a href='#' class='list-group-item'>开始搜索吧</a>");
            return;
        }
        var res = search_document($('#searchInput').val());
        res.forEach((res) => {
            $('#searchResult').append(
                $('<a class="list-group-item"></a>')
                    .attr('href', root + '/' + res.url)
                    .click(() => {
                        $('#offcanvasExample').offcanvas('hide');
                        $('#searchInput').val('');
                        search();
                    })
                    .append($('<span></span>').css('float', 'left').text(res.title))
                    .append($('<span></span>').css('float', 'right').css('opacity', '0.5').text(res.tag))
                    .append($('<div></div>').css('clear', 'both'))
            );
        });
        if (res.length == 0) {
            $('#searchResult').append(
                $('<a class="list-group-item"></a>')
                    .attr('href', '#')
                    .text('没有找到关于“' + $('#searchInput').val() + '”的结果')
            );
        }
    }
})