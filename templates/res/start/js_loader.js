function make_web_request(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) resolve(xhr.responseText);
        };
        xhr.onerror = function () {
            reject(xhr.statusText);
        }
    });
}
// function add_js(js_url, module = false) {
//     // fetch the js file
//     return make_web_request(js_url).then((js_code) => {
//         // create a new script element
//         var script = document.createElement('script');
//         // set the type of the script to javascript
//         script.type = 'text/javascript';
//         // set the text of the script to the js code
//         script.text = js_code;
//         // if the module flag is set to true, set the script to be a module
//         if (module) {
//             script.type = 'module';
//         }
//         // append the script to the head of the document
//         document.getElementsByTagName('head')[0].appendChild(script);
//     });
// }
// function add_css(css_url) {
//     // fetch the css file
//     return make_web_request(css_url).then((css_code) => {
//         // create a new style element
//         var style = document.createElement('style');
//         // replace all the url() with the base url
//         css_code = css_code.replace(/url\((.*?)\)/g, 'url(' + true_root + '/res/css/' + '$1' + ')');
//         // set the text of the style to the css code
//         style.innerHTML = css_code;
//         // append the style to the head of the document
//         document.getElementsByTagName('head')[0].appendChild(style);
//     });
// }
function add_js(js_url,module=false){
    var script_element = document.createElement('script');
    script_element.src = js_url;
    if(module){
        script_element.type = 'module';
    }
    document.getElementsByTagName('head')[0].appendChild(script_element);
    return new Promise((resolve)=>resolve());
}
function add_css(css_url) {
    var link_element = document.createElement('link');
    link_element.rel = 'stylesheet';
    link_element.href = css_url;
    document.getElementsByTagName('head')[0].appendChild(link_element);
    return new Promise((resolve)=>resolve());
}
function load_files() {
    return make_web_request(root + '/res/resources.json').then((files) => {
        console.log(files);
        files = JSON.parse(files);
        var promises = [];
        for (var i = 0; i < files.modules.length; i++) {
            p = add_js(root + '/res/modules/' + files.modules[i], true);
            promises.push(p);
        }
        for (var i = 0; i < files.js.length; i++) {
            p = add_js(root + '/res/js/' + files.js[i]);
            promises.push(p);
        }
        for (var i = 0; i < files.css.length; i++) {
            p = add_css(root + '/res/css/' + files.css[i]);
            promises.push(p);
        }
        return Promise.allSettled(promises).then(() => {
            document.dispatchEvent(new Event('resourcesloaded'));
        });
    });
}
load_files();