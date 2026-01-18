<script setup>
import { onMounted, ref } from "vue";
import localforage from "localforage";
definePage({ meta: { title: "设置" } })

function load(key, fallback) {
    return current_valueset.value[key] = localStorage.getItem(key) || fallback;
}
const bgbrightness = ref();
const coloropacity = ref();
const current_valueset = ref({});

onMounted(() => {
    bgbrightness.value = load("bgbrightness", "50");
    coloropacity.value = load("coloropacity", "0.5");
});
function save(name, value) {
    current_valueset.value[name] = localStorage.setItem(name, value);

}
function upload(input) {
    return new Promise((resolve) => {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = (e)=> {
                localforage.setItem("imgbg", e.target.result).then(resolve);
            };
            reader.readAsDataURL(input.files[0]);
        }
    })
}
</script>
<template>
    <h1>设置</h1>
    <h4>个性化</h4>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch"
            :checked="(current_valueset.adv_bg || load('adv_bg', 'true')) === 'true'"
            @change="save('adv_bg', $event.target.checked)" />
        <label class="form-check-label" for="adv_bg">高级背景</label>
    </div>
    <br />
    <div class="mb-3 row" v-if="(current_valueset.adv_bg || load('adv_bg', 'true')) === 'false'">
        <label class="col-form-label col-sm-2" for="color">背景颜色</label>
        <div class="col-sm-10">
            <input class="form-control form-control-color" type="color" :value="load('color', '#000000')"
                @change="save('color', $event.target.value)" style="display: inline-block" />
        </div>
    </div>
    <div v-else>
        <div class="mb-3 row">
            <label class="col-form-label col-sm-2" for="bg">背景图片</label>
            <div class="col-sm-10">
                <select class="form-select" @change="save('imgbg', $event.target.value)"
                    :value="load('imgbg', 'bg-1.jpg').startsWith('custom') ? 'custom' : load('imgbg', 'bg-1.jpg')">
                    <option disabled>学校</option>
                    <option value="SchoolGate.jpg">校门口</option>
                    <option value="bg.jpg">后花园</option>
                    <option value="bg-1.jpeg">惠荫园</option>
                    <hr />
                    <option disabled>城市</option>
                    <option value="bg-2.png">
                        四川，成都 · 成都非遗博览园缇沃丽酒店
                    </option>
                    <option value="bg-4.jpg">安徽，泾县 · 泾县汉唐纸坊景区</option>
                    <hr />
                    <option disabled>自定义</option>
                    <option value="custom">自定义</option>
                </select>
                <input class="form-control" type="file"
                    v-if="(current_valueset.imgbg || load('imgbg', '')).startsWith('custom')" @change="
                        upload($event.target).then(() => {
                            save('imgbg', 'custom' + new Date())
                        });
                    " accept="image/*" />
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-form-label col-sm-2" for="bgbrightness">背景亮度</label>
            <div class="col-sm-8">
                <input type="range" class="form-range" min="0" max="200" step="1" :value="bgbrightness" @input="bgbrightness = $event.target.value; save('bgbrightness', $event.target.value);
                save('dark', $event.target.value < 100);
                " />
            </div>
            <div class="col-sm-2">
                <span>{{ bgbrightness }}</span>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-form-label col-sm-2" for="color">遮罩颜色</label>
            <div class="col-sm-10">
                <input class="form-control form-control-color" type="color" :value="load('color', '#000000')"
                    @change="save('color', $event.target.value)" style="display: inline-block" />
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-form-label col-sm-2" for="bgbrightness">遮罩不透明度</label>
            <div class="col-sm-8">
                <input type="range" class="form-range" min="0" max="100" step="1" :value="coloropacity"
                    @input="coloropacity = $event.target.value; save('coloropacity', $event.target.value)" />
            </div>
            <div class="col-sm-2">
                <span>{{ coloropacity }}</span>
            </div>
        </div>
    </div>
    <br />
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" :checked="load('dark', 'true') === 'true'"
            @change="save('dark', $event.target.checked)" />
        <label class="form-check-label" for="dark">深色模式</label>
    </div>
</template>
