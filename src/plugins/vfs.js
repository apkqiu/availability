import fs from 'fs';

function deep_dir(start, contentful){
    // 创建文件树
    const tree = {};
    const dir = fs.readdirSync(start);
    dir.forEach(file => {
        const path = `${start}/${file}`;
        const stat = fs.statSync(path);
        if (stat.isDirectory()) {
            tree[file] = deep_dir(path, contentful);
        } else {
            if (contentful) {
                
                tree[file] = {
                    "!isFile": true,
                    path,
                    name:file,
                    content: fs.readFileSync(path, 'utf-8').toString()
                };
            }else{
                tree[file] = null; // leaf
            }
        }
    })
    return tree;
}

// 将会索引整个项目中的所有文章，并生成一个虚拟的文章列表
export default function () {
    const module_id = "virtual:articles";
    const resolved_id = "\0" + module_id;

    return {
        name: module_id,
        resolveId(id) {
            if (id.startsWith("vfs:")) {
                return "\0fs\0" + id.substring(3);
            }
            if(id.startsWith("vdir:")) {
                return "\0vd\0"+ id.substring(4);
            }
        },
        load(id) {
            if (id.startsWith("\0fs\0")) {
                const path = id.substring(5);
                return `export default ${JSON.stringify(deep_dir(path, true))}`
            }
            if (id.startsWith("\0vd\0")) {
                const path = id.substring(5);
                return `export default ${JSON.stringify(deep_dir(path, false))}`
            }
        }
    }
}