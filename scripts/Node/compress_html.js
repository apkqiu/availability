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
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true

})
console.log(compressedContent);