(function () {
    function h(a) {
        return '[giscus] An error occurred. Error message: "'.concat(a, '".');
    }
    function l(a, f) {
        void 0 === f && (f = !1);
        f = f ? "meta[property='og:".concat(a, "'],") : '';
        return (a = document.querySelector(f + "meta[name='".concat(a, "']"))) ? a.content : '';
    }
    function p() {
        delete c.session;
        var a = ''.concat(giscus_origin).concat(q, '/widget?').concat(new URLSearchParams(c));
        e.src = a;
    }
    var currentScript = document.currentScript,
        giscus_origin = new URL(currentScript.src).origin,
        current_href = new URL(location.href),
        d = current_href.searchParams.get('giscus') || '',
        n = localStorage.getItem('giscus-session');
    current_href.searchParams.delete('giscus');
    current_href.hash = '';
    var g = current_href.toString();
    if (d) localStorage.setItem('giscus-session', JSON.stringify(d)), history.replaceState(void 0, document.title, g);
    else if (n)
        try {
            d = JSON.parse(n);
        } catch (a) {
            localStorage.removeItem('giscus-session'),
                console.warn(''.concat(h(null === a || void 0 === a ? void 0 : a.message), ' Session has been cleared.'));
        }
    current_href = currentScript.dataset;
    var c = {};
    c.origin = g;
    c.session = d;
    c.theme = current_href.theme;
    c.reactionsEnabled = current_href.reactionsEnabled || '1';
    c.emitMetadata = current_href.emitMetadata || '0';
    c.inputPosition = current_href.inputPosition || 'bottom';
    c.repo = current_href.repo;
    c.repoId = current_href.repoId;
    c.category = current_href.category || '';
    c.categoryId = current_href.categoryId;
    c.strict = current_href.strict || '0';
    c.description = l('description', !0);
    c.backLink = l('giscus:backlink') || g;
    switch (current_href.mapping) {
        case 'url':
            c.term = g;
            break;
        case 'title':
            c.term = document.title;
            break;
        case 'og:title':
            c.term = l('title', !0);
            break;
        case 'specific':
            c.term = current_href.term;
            break;
        case 'number':
            c.number = current_href.term;
            break;
        default:
            c.term = 2 > location.pathname.length ? 'index' : location.pathname.substring(1).replace(/\.\w+$/, '');
    }
    var r = (d = document.querySelector('.giscus')) && d.id;
    r && (c.origin = ''.concat(g, '#').concat(r));
    var q = current_href.lang ? '/'.concat(current_href.lang) : '';
    g = ''.concat(giscus_origin).concat(q, '/widget?').concat(new URLSearchParams(c));
    current_href = 'lazy' === current_href.loading ? 'lazy' : void 0;
    var e = document.createElement('iframe');
    Object.entries({
        class: 'giscus-frame giscus-frame--loading',
        title: 'Comments',
        scrolling: 'no',
        allow: 'clipboard-write',
        src: g,
        loading: current_href,
    }).forEach(function (a) {
        var f = a[0];
        return (a = a[1]) && e.setAttribute(f, a);
    });
    e.style.opacity = '0';
    e.addEventListener('load', function () {
        e.style.removeProperty('opacity');
        e.classList.remove('giscus-frame--loading');
    });
    current_href = document.getElementById('giscus-css') || document.createElement('link');
    current_href.id = 'giscus-css';
    current_href.rel = 'stylesheet';
    current_href.href = ''.concat(giscus_origin, '/default.css');
    document.head.prepend(current_href);
    if (d) {
        for (; d.firstChild;) d.firstChild.remove();
        d.appendChild(e);
    } else (d = document.createElement('div')), d.setAttribute('class', 'giscus'), d.appendChild(e), currentScript.insertAdjacentElement('afterend', d);
    window.addEventListener('message', function (event) {
        event.origin === giscus_origin &&
            ((event = event.data),
                'object' === typeof event &&
                event.giscus &&
                (event.giscus.resizeHeight && (e.style.height = ''.concat(event.giscus.resizeHeight, 'px')),
                    event.giscus.signOut
                        ? (localStorage.removeItem('giscus-session'), console.log('[giscus] User has logged out. Session has been cleared.'), p())
                        : event.giscus.error &&
                        ((event = event.giscus.error),
                            event.includes('Bad credentials') || event.includes('Invalid state value') || event.includes('State has expired')
                                ? null !== localStorage.getItem('giscus-session')
                                    ? (localStorage.removeItem('giscus-session'), console.warn(''.concat(h(event), ' Session has been cleared.')), p())
                                    : n ||
                                    console.error(
                                        ''
                                            .concat(h(event), ' No session is stored initially. ')
                                            .concat('Please consider reporting this error at https://github.com/giscus/giscus/issues/new.')
                                    )
                                : event.includes('Discussion not found')
                                    ? console.warn('[giscus] '.concat(event, '. A new discussion will be created if a comment/reaction is submitted.'))
                                    : event.includes('API rate limit exceeded')
                                        ? console.warn(h(event))
                                        : console.error(
                                            ''
                                                .concat(h(event), ' ')
                                                .concat('Please consider reporting this error at https://github.com/giscus/giscus/issues/new.')
                                        ))));
    });
})();
