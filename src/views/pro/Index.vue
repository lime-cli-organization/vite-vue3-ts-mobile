<template>
  <RouterView />
  <LTabbar v-if="!hideTab" :list="tabbarList" />
</template>

<script setup lang="ts">
import LTabbar from '@/components/system/LTabbar.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const tabbarList: Array<tabItem> = [
  {
    path: '/pro/home',
    text: '首页',
    svgName: 'home',
  },
  {
    path: '/pro/exercise/panel',
    text: '练习',
    svgName: 'exercise',
  },
  {
    path: '/pro/report/school',
    text: '学情',
    svgName: 'statistics',
  },
  {
    path: '/pro/mine',
    text: '我的',
    svgName: 'mine',
  }
]

const router = useRouter();
let hideTab = ref(true);
watch(
  () => router.currentRoute.value.meta,
  (newVal) => {
    hideTab.value = newVal.hideTab as boolean
  },
  { immediate: true, deep: true }
)


</script>