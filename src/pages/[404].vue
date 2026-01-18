<script setup>
definePage({ meta: { title: "404" }, alias: ["/:pathMatch(.*)*"] })
</script>

<template>
  <div class="not-found">
    <span class="h1">404</span>
    &nbsp;
    <strong>文件不存在</strong>

    <p>
      在此地址配置的站点不包含请求的文件。
    </p>

  </div>
</template>