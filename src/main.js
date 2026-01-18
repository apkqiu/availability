//import 'core-js/stable';
//import 'regenerator-runtime/runtime';

import { createApp } from 'vue'
import App from './App.vue'

// Import our custom CSS
import './style/bootstrap.scss'
// Import all of Bootstrap’s JS
import { routes } from 'vue-router/auto-routes'
import { createRouter, createWebHistory} from 'vue-router'
document.title = "正在加载...";
// merge routes
const base = "/availability";
const app = createApp(App)
const router = createRouter({
    history: createWebHistory(base),
    routes,
})

app.use(router)
app.mount("#app")
