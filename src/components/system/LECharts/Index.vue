<template>
  <div :id="id" ref="chart"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts/core';
import { onMounted, ref } from "vue";
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
  option: {
    type: Object
  }
})

onMounted(() => {

})

const elChart = ref<HTMLElement>() as unknown as HTMLElement;
let chart: echarts.ECharts;
const initChart = () => {
  if (!document.getElementById(props.id)) return;
  chart = echarts.init(elChart);
}


</script>

<style lang="less" scoped>
</style>