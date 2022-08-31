<template>
  <div :id="id" ref="elChart" class="echart"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import _ from "lodash";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  id: {
    required: true,
    type: String,
  },
  option: {
    type: Object,
    default: () => { }
  }
})


let chart: echarts.ECharts;
const defaulOption = {
  grid: {
    top: 20,
    left: 35,
    bottom: 30,
    right: 20,
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      fontSize: 9,
      color: '#9E9E9E',
    },
    axisLine: {
      show: true,
      inside: true,
      lineStyle: {
        color: 'transparent',
      },
    },
    splitLine: {
      //分割线配置
      show: true,
      lineStyle: {
        color: '#E9E9E9',
        type: 'dashed'
      },
    },
  },
  yAxis: {
    axisLabel: {
      fontSize: 9,
      color: '#9E9E9E',
    },
    splitLine: {
      lineStyle: {
        color: '#E9E9E9',
      },
    },
  },
};

onMounted(() => {
  if (!document.getElementById(props.id)) return;
  chart = echarts.init(document.getElementById(props.id)!);
  chart.setOption(_.merge(props.option, defaulOption))
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  chart.dispose();
})

watch(
  () => props.option,
  () => {
    chart.setOption(_.merge(props.option, defaulOption))
  },
  { deep: true }
)

const resize = _.debounce(() => {
  chart.resize()
}, 500)


</script>

<style lang="less" scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>