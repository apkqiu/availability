<script setup>
definePage({
    alias: ["/apps"],
    meta: {
        title: "小程序"
    },
})
</script>
<style scoped>
.card {
    text-decoration: none;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}
</style>
<template>
    <h1>小程序</h1>
    <h3>生活</h3>
    <div class="row">
        <div class="col-md-3">
            <RouterLink to="/apps/TimeProgress" class="card">
                <div class="card-body">
                    <h5 class="card-title">时光流逝</h5>
                    <p class="card-text">让时间可视化，提醒你把握当下的每一刻</p>
                </div>
            </RouterLink>
        </div>
    </div>
    <hr>
    <h3>游戏</h3>
    <br />
    <div class="row">
        <div class="col-md-3">
            <RouterLink to="/apps/ClassSleep" class="card">
                <div class="card-body">
                    <h5 class="card-title">上课睡觉模拟器</h5>
                    <p class="card-text">眼观六路耳听八方，在老师巡查中安然入睡。躲避干扰、抓紧补眠，你能睡过整堂课吗？</p>
                    <p class="text-warning">热门游戏榜单 <b>TOP 1</b></p>
                </div>
            </RouterLink>
        </div>
    </div>
</template>