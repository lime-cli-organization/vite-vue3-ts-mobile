
<template>
  <div class="switch">
    <van-button color="#7232dd" plain size="mini" @click="switchPro('/pro/login')">project</van-button>
    <van-button color="#7232dd" plain size="mini" @click="switchPro('/example')">example</van-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const switchPro = (rootPath: string) => {
  router.push({
    path: rootPath
  })
}
</script>

<style lang="less" scoped>
.switch {
  height: 200px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
</style>
