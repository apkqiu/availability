import MarkdownIt from "markdown-it";
import fs from "fs";

import { footnote } from "@mdit/plugin-footnote";
import { align } from "@mdit/plugin-align";
import markdownQuote from 'markdown-it-quote';
// argument 1 is the file to render
const file = process.argv[2];

const plugin_to_use = [
    footnote,
    align,
    markdownQuote,
]

const md = new MarkdownIt();
for (const plugin of plugin_to_use) {
    md.use(plugin);
}

const html = md.render(fs.readFileSync(file, "utf8"));

console.log(html);