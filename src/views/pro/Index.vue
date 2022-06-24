<template>
  这是框架
  <RouterView />
  <LTabbar :list="tabbarList" />
</template>

<script setup lang="ts">
import LTabbar from '@/components/system/LTabbar.vue';

const tabbarList:Array<tabItem> = [
  {
    path: '/pro/home',
    text: '首页',
    svgName: 'home',
  },
  {
    path: '/pro/mine',
    text: '我的',
    svgName: 'home',
  }
]
</script>