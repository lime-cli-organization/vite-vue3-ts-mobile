
<template>
  <div class="LTabbar">
    <div class="bar_item" v-for="item in list" :key="item.path" @click="switchTab(item.path)"
      :class="currentActive === item.path ? 'active' : ''">
      <LSvgIcon :name="item.svgName" size="24" :color="currentActive === item.path ? '#FF861B' : ''" />
      <span class="text">{{ item.text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import LSvgIcon from '../LSvgIcon.vue';
import { useRouter, } from 'vue-router'
import type { Router } from 'vue-router'
import { tabItem } from '../typing';

const props = defineProps({
  list: {
    type: Array<tabItem>,
    default: () => {
      return {
        path: '',
        text: '',
        svgName: ''
      }
    }
  }
})

const router: Router = useRouter();

let currentActive = ref(props.list[0].path);
watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    props.list.forEach((element) => {
      if (toPath === element.path) {
        currentActive.value = element.path;
      }
    })
  },
  { immediate: true, deep: true }
);


const switchTab = (path: string) => {
  router.push({
    path,
  })
}
</script>

<style lang="less">
.LTabbar {
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100vw;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #FFFFFF;
  box-shadow: 0px -10px 45px 0px #F3F5F9;

  .bar_item {
    display: flex;
    align-items: center;
    flex-direction: column;

    .text {
      margin-top: 12px;
    }
  }

  .active>.text {
    color: @primary;
    font-weight: bold;
  }
}
</style>
