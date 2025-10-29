const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');
// 从参数中获取文件路径
const filePath = process.argv[2];

// 读取文件内容
const fileContent = fs.readFileSync(filePath, 'utf-8');

// 压缩HTML
const compressedContent = minify(fileContent, {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeEmptyAttributes: true,
    removeComments: true,
    useShortDoctype: true,
    minifyJS:true,
    minifyCSS:true,
    removeTagWhitespace: true,
    collapseBooleanAttributes: true,
})
console.log(compressedContent);