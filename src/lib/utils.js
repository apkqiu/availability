import MarkdownIt from "markdown-it";
import { footnote } from "@mdit/plugin-footnote";
import { align } from "@mdit/plugin-align";
import { attrs } from "@mdit/plugin-attrs";
import { ins } from "@mdit/plugin-ins";
import markdownQuote from 'markdown-it-quote';

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
//#endregion