import MarkdownIt from "markdown-it";
import { footnote } from "@mdit/plugin-footnote";
import { align } from "@mdit/plugin-align";
import { attrs } from "@mdit/plugin-attrs";
import { ins } from "@mdit/plugin-ins";
import markdownQuote from 'markdown-it-quote';

//#region url tools
export const Url = {
    args() {
        const full_url = window.location.href;
        const query_start = full_url.indexOf("?"), hash_start = full_url.indexOf("#");
        const query_arg = new URLSearchParams(full_url.substring(query_start));
        const args = {}; // Object.assign太不靠谱了
        for (const [key, value] of query_arg.entries()) {
            args[key] = value;
        }
        return args;
    },
    arg(name) {
        return this.args()[name];
    }
}
//#endregion

//#endregion
//#region variable tools
export const Variable = {
    watch(value_func, callback_func, first_call = value_func()) {
        let old_value = first_call;
        let old_json = JSON.stringify(old_value);
        setInterval(() => {
            let new_value = value_func();
            let new_json = JSON.stringify(new_value);
            if (old_json != new_json) {
                if (callback_func.length == 0) callback_func();
                else if (callback_func.length == 1) callback_func(new_value);
                else callback_func(old_value, new_value)
                old_value = new_value;
                old_json = new_json;
            }
        }, 10);
    }
}
//#endregion
//#region document tools
export const MarkdownRenderer = new MarkdownIt({ html: true });
const plugin_to_use = [
    footnote,
    align,
    markdownQuote,
    attrs,
    ins,
]
for (const plugin of plugin_to_use) {
    MarkdownRenderer.use(plugin);
}

export class WebDocument {
    constructor(text) {
        this.text = text;
    }
    render(renderer = MarkdownRenderer) {
        return renderer.render(this.text);
    }
    getTitle(more_lines = 0) {
        let lines = this.text.split("\n");
        // 删除空行
        lines = lines.filter(line => line.trim() !== "");

        let result;
        if (lines[0].startsWith("#")) {
            result = lines.shift().replace(/#+ /g, "")
        } else {
            result = lines.shift().replace("<h1>", "").replace("</h1>", "")
        }
        if (more_lines) {
            result = [result.trim()];
            while (more_lines--) {
                result.push(lines.shift().trim())
            }
        }
        return result
    }
}
//#endregion
//#region storage tools

export const LocalStorage = {
    load(p, d=null) {
        try {
            return JSON.parse(localStorage.getItem(p));
        } catch (e) { }
        return localStorage.getItem(p)||d;
    },
    save(p, value, json = false) {
        debugger;
        if (json)
            localStorage.setItem(p, JSON.stringify(value));
        else
            localStorage.setItem(p, value);
        return value
    },
}