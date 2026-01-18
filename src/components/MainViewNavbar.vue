<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { nav } from '../lib/web_data';
import { Modal, Offcanvas } from 'bootstrap';
import vfs_articles from 'vfs:src/articles';
import { routes as autoroute } from "vue-router/auto-routes";
const docindex = [];
const webindex = []
const result = ref([]);
const query = ref();

function make_flat_docindex(tree) {
    for (let i of Object.keys(tree)) {
        if (Object.keys(tree[i]).includes("!isFile")) {
            const item = tree[i];
            docindex.push({ name: item.path.substring(13), content: item.content });
        } else {
            make_flat_docindex(tree[i]);
        }
    }
}
function make_flat_webindex(tree) {
    for (let i of Object.keys(tree)) {
        if (Object.keys(tree[i]).includes("children")) {
            make_flat_webindex(tree[i].children);
        } else {
            webindex.push(tree[i]);
        }
    }
}
make_flat_webindex(autoroute);
watchEffect(() => {
    result.value.splice(0, result.value.length);
    if (!query.value) {
        result.value.push({ url: "", ctx: "开始搜索吧" })
        return
    }
    docindex.forEach((item) => {
        const start = item.content.indexOf(query.value);
        if (start != -1) {
            let firstline = item.content.split("\n")[0].replaceAll("#", "").trim();
            // if firstline matches
            if (firstline.toLowerCase().includes(query.value.toLowerCase())) {
                firstline = firstline.replace(query.value, `<span class="text-primary">${query.value}</span>`);
            }
            const beforepart = item.content.substring(0, start);
            const afterpart = item.content.substring(start + query.value.length);
            const before10char = beforepart.substring(Math.max(beforepart.length - 15, 0)).replaceAll("\r", "").replaceAll("\n", " ").replaceAll("<", "&lt;");;
            const after10char = afterpart.replaceAll("\r", "").replaceAll("\n", " ").replaceAll("<", "&lt;");
            result.value.push({ url: "/view?name=" + item.name, ctx: `<b>${firstline}</b><br>${before10char}<span class="text-primary">${query.value}</span>${after10char}` })
        }
    })
    webindex.forEach((item) => {
        try {
            item.meta.title
        } catch (e) { return }
        const pos = item.meta.title.indexOf(query.value);
        if (pos != -1) {
            const before = item.meta.title.substring(0, pos);
            const after = item.meta.title.substring(pos + query.value.length);

            result.value.push({ url: item.name, ctx: `<b>${before}<span class="text-primary">${query.value}</span>${after}</b><br>转到 ${item.name}` })
        }
    })
})
console.log(webindex);
make_flat_docindex(vfs_articles);
console.log(docindex);

const props = defineProps(["title", "route"])

let offcanvas, search_modal;
onMounted(async () => {
    offcanvas = new Offcanvas('#offcanvas');
    search_modal = new Modal('#SearchModal');
})
let lastscroll = 0;
window.addEventListener("scroll", () => {
    if (window.scrollY < 100 || lastscroll > window.scrollY) {
        document.getElementById("navbar").classList.remove("navbar-show");
        document.getElementById("navbar").classList.add("navbar-show");
    } else {
        document.getElementById("navbar").classList.remove("navbar-show");
        document.getElementById("navbar").classList.add("navbar-hide");
    }
    lastscroll = window.scrollY;
})
</script>
<style>
@media screen and (max-width: 768px) {
    .hide_on_mobile {
        display: none;
        visibility: collapse;
        height: 0px !important;
        width: 0px !important;
        overflow: hidden;
        margin: 0 !important;
        padding: 0 !important;
    }
}

@media screen and (min-width: 768px) {
    .show-on-mobile {
        display: none;
        visibility: collapse;
        height: 0px !important;
        width: 0px !important;
        overflow: hidden;
        margin: 0 !important;
        padding: 0 !important;
    }
}

@keyframes hide-nav {
    0% {
        transform: translate(0, 0);
        opacity: 1;
    }
}

.navbar-hide {
    animation: hide-nav 0.3s;
    transform: translate(0, -100%);
    opacity: 0;
}

@keyframes show-nav {
    0% {
        transform: translate(0, -100%);
        opacity: 0;
    }
}

.navbar-show {
    animation: show-nav 0.3s;
    transform: translate(0, 0);
    opacity: 1;
}

.nav-link.router-link-exact-active {
    color: #0d6efd !important;
    background-color: rgba(255, 255, 255, 0.8) !important;
    box-shadow: #000000 0px 0px 10px;
}
.nav-link.router-link-exact-active:hover {
    color: #0d6efd !important;
    background-color: rgba(255, 255, 255, 1) !important;
    box-shadow: #000000 0px 0px 10px;
}
.nav-link.router-link-exact-active:active {
    color: #0d6efd !important;
    background-color: rgba(255, 255, 255, 0.9) !important;
    box-shadow: #000000 0px 0px 10px;
}
.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.2) !important;
}
.nav-link:active {
    background-color: rgba(255, 255, 255, 0.1) !important;
}
.nav-link {
    border-radius: 1000px !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
}
body .navbar-blur{
    padding: 5px;
    border-radius: 1000px !important;
    backdrop-filter: blur(10px);
    background-color: rgba(255,255,255, 0.5);
}
body[data-bs-theme="dark"] .navbar-blur {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
<template>
    <div class="modal fade modal-xl" id="SearchModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-md-down  modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <input class="form-control w-100" placeholder="搜索文档" v-model="query">
                    <button type="button" class="btn-close show-on-mobile ms-2" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" style="padding:0">
                    <div class="list-group list-group-flush">
                        <RouterLink @click="search_modal.hide()" :to="i.url" v-html="i.ctx" class="list-group-item"
                            style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" v-for="i in result">
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <nav class="navbar navbar-expand-sm" style="
      position: fixed;
      top: 10px;
      left: 10px;
      right: 10px;
      z-index: 1001;
      
    ">
        <div class="container-fluid">
            <div class="navbar-blur navbar-show"  id="navbar" style="display:flex; justify-content: center;">
                <span class="navbar-brand ms-3">{{ props.title }}</span>
                <button class="btn v-center nav-link" data-bs-toggle="modal" data-bs-target="#SearchModal" style="display:inline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>&nbsp;搜索文档
                </button>
            </div>
            <div class="d-flex">
                <ul class="navbar-nav navbar-blur  hide_on_mobile me-2" :class="{'navbar-show':!Object.values(nav).includes(props.route.path), 'navbar-hide':Object.values(nav).includes(props.route.path)}">
                    <li class="nav-item">
                        <span class="nav-link router-link-exact-active">{{ props.route.meta.title }}</span>
                    </li>
                </ul>
                <ul class="navbar-nav navbar-blur  navbar-show">
                    
                    <li class="nav-item hide_on_mobile" v-for="name in Object.keys(nav)" :class="{'me-2':Object.keys(nav).at(-1)!=name}">
                        <RouterLink class="nav-link" :to="nav[name]">{{ name }}</RouterLink>
                    </li>
                    <li>
                        <button class="btn show-on-mobile" type="button" @click="offcanvas.show()">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="offcanvas offcanvas-end " id="offcanvas" tabindex="-1">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title">搜索</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">
            <h3>导航</h3>
            <div class="list-group">
                <RouterLink class="list-group-item" v-for="name in Object.keys(nav)" :to="nav[name]"
                    @vue:before-update="offcanvas.hide()">{{ name }}
                </RouterLink>
            </div>
            <br />

        </div>
    </div>
</template>
