<template>
  <!-- <transition appear name="animate__animated animate__bounce" enter-active-class="animate__bounceInRight"
    leave-active-class="animate__bounceInLeft">
  </transition> -->
  <RouterView />
  <LTabbar v-if="!hideTab" :list="tabbarList" />
</template>

<script setup lang="ts">
import LTabbar from '@/components/system/LTabbar/LTabbar.vue';
import { tabItem } from '@/components/system/typing';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const tabbarList: Array<tabItem> = [
  {
    path: '/home',
    text: '首页',
    svgName: 'home',
  },
  {
    path: '/exercise/panel',
    text: '练习',
    svgName: 'exercise',
  },
  {
    path: '/report/school',
    text: '学情',
    svgName: 'statistics',
  },
  {
    path: '/mine',
    text: '我的',
    svgName: 'mine',
  }
]

const router = useRouter();
let hideTab = ref(true);
watch(
  () => router.currentRoute.value.meta,
  (newVal) => {
    hideTab.value = newVal.hideTab
  },
  { immediate: true, deep: true }
)


</script>
<style lang="less" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translatex(-100vw);
}

.v-leave-to {
  opacity: 0;
  transform: translatex(100vw);
}
</style>