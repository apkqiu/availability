<script setup>
import { onMounted, reactive } from 'vue';

definePage({ meta: { title: '时光流逝' } });
const now = reactive({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    date: new Date(),
});
const remaining = reactive({
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
})
const total_second_since = reactive({
    this_year: 0,
    this_month: 0,
    this_day: 0,
    this_hour: 0,
    this_minute: 0,
    this_second: 0,
})
const max_second_since = reactive({
    this_year: -1,
    this_month: -1,
    this_day: 86400,
    this_hour: 3600,
    this_minute: 60,
    this_second: 1,

})
function update() {
    let date = new Date();
    now.date = date;
    now.year = date.getFullYear();
    now.month = date.getMonth() + 1;
    now.day = date.getDate();
    now.hour = date.getHours();
    now.minute = date.getMinutes();
    now.second = date.getSeconds() + date.getMilliseconds() / 1000;
    total_second_since.this_second = date.getMilliseconds() / 1000;
    total_second_since.this_minute = now.second;
    total_second_since.this_hour = now.minute * 60 + now.second;
    total_second_since.this_day = now.hour * 3600 + now.minute * 60 + now.second;
    total_second_since.this_month = now.day * 86400 + now.hour * 3600 + now.minute * 60 + now.second;
    total_second_since.this_year = date.getTime() / 1000 - new Date(now.year, 0, 0, 0, 0, 0, 0).getTime() / 1000;
    max_second_since.this_year = new Date(now.year + 1, 0, 0, 0, 0, 0, 0).getTime() / 1000 - new Date(now.year, 0, 0, 0, 0, 0, 0).getTime() / 1000;
    max_second_since.this_month = new Date(now.year, now.month, 0, 0, 0, 0, 0).getTime() / 1000 - new Date(now.year, now.month - 1, 1, 0, 0, 0, 0).getTime() / 1000;
    let detla = new Date((max_second_since.this_year - total_second_since.this_year + new Date().getTimezoneOffset() * 60) * 1000);
    remaining.month = detla.getMonth();
    remaining.day = detla.getDate() - 1;
    remaining.hour = detla.getHours();
    remaining.minute = detla.getMinutes();
    remaining.second = detla.getSeconds() + detla.getMilliseconds() / 1000;
}
onMounted(() => {
    setInterval(() => {
        update();
    }, 50);
});
</script>
<template>
    <h1>{{ now.date.toLocaleString() }}</h1>
    <h3>距离{{ now.year + 1 }}年还有{{ remaining.month }}月{{ remaining.day }}天{{ remaining.hour }}时{{ remaining.minute }}分{{
        Math.floor(remaining.second) }}秒</h3>
    
    <div class="progress" role="progressbar" style="height: 25px;width:50em">
        <div class="progress-bar progress-bar-striped progress-bar-animated"
            :style="{ width: total_second_since.this_year * 100 / max_second_since.this_year + '%' }"></div>
        <span style="position:absolute;">年进度：{{ (total_second_since.this_year * 100 /
            max_second_since.this_year).toFixed(8) + '%'
        }}</span>
    </div>
</template>
