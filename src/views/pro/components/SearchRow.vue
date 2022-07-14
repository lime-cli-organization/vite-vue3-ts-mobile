<template>
  <van-dropdown-menu active-color="#1989fa">
    <template v-for="(item, index) in state.deepth">
      <van-dropdown-item />
    </template>
  </van-dropdown-menu>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';

const props = defineProps({
  data: {
    required: true,
    default: () => []
  },
  index: {
    required: true,
    default: 0
  }
})

const state = reactive({
  deepth: 0
})

const getDataDeepth = (obj: any, deepth: number) => {
  if (obj.list && obj.list.length > 0) {
    deepth += 1;
    deepth = getDataDeepth(obj.list[0], deepth);
  }
  return deepth;
}

onMounted(() => {
  state.deepth = getDataDeepth(props.data[props.index], 1);
})

</script>

<style lang="less" scoped>
</style>