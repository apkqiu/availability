<script setup>
import MainView from './components/MainView.vue';
import { RouterView } from 'vue-router';
import MainViewNavbar from './components/MainViewNavbar.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", console.clear);
  import.meta.hot.on("vite:beforeFullReload", console.clear);
}
const spinner = ref();
const errors = ref()
const router = useRouter()
let last_timeout = null;
router.beforeEach((to, from) => {
  if (last_timeout) clearTimeout(last_timeout)
  last_timeout = setTimeout(() => {
    spinner.value = true;
  }, 300);
  return true;
})
router.afterEach((to, from, failure) => {
  clearTimeout(last_timeout);
  last_timeout = null;
  if (failure) {
    errors.value = failure;
    return
  }
  errors.value = "";
  spinner.value = false;
})
</script>
<style lang="scss">
@import "bootstrap/scss/bootstrap";

.list-group,
.list-group-item {
  background: transparent;

}

.list-group-item>a {
  text-decoration: none;
}
</style>
<template>
  <RouterView v-slot="{ Component, route }">
    <MainViewNavbar title="洽隐山房" :route="route" />
    <MainView :title="route.meta.title || route.name">
      <Transition mode="out-in">
        <div :key="route.fullPath" v-if="!spinner">
          <component :is="Component" />
        </div>
        <div :key="route.fullPath + 'spinner'" v-else>
          <div class="spinner-border"></div>
          <div v-html="errors"></div>
        </div>
      </Transition>
    </MainView>
  </RouterView>

</template>

<style scoped>
@keyframes fadeIn {
  0% {
    transform: scale(0.99);
    opacity: 0;
  }

  /* 40% {
    transform: translateY(100px);
    opacity: 0;
  } */

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(1.01);
  }
}

.v-enter-active {
  animation: fadeIn 0.3s ease-out;
}

.v-leave-active {
  opacity: 0;
  animation: fadeOut 0.1s ease-out;
}
</style>
