const fs = require('fs');
const uglifyjs = require('uglify-js');

// get filename from command line arguments
const filename = process.argv[2];

// read file
const fileContent = fs.readFileSync(filename, 'utf8');

// compress file
const result = uglifyjs.minify(fileContent);
// write compressed file
console.log(result.code);