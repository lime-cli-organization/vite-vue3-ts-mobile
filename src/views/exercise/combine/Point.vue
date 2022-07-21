<template>
  <div class="point_wrapper">
    <LCheckboxGroup v-for="(item, index) in state.renderArr" :renderItem="item"
      @change="(value) => groupChange(index, value)" />
    <button class="btn active fix" @click="toConfirmCombine">确认提交</button>
  </div>
</template>

<script setup lang="ts">
import { GetBook } from '@/apis/Cache';
import type { Cache } from '@/apis/Cache'
import { onMounted, reactive } from 'vue';
import LCheckboxGroup from '@/components/system/LCheckboxGroup.vue';
import { useRouter } from 'vue-router';

defineProps({
  course: {
    required: true
  }
})

interface IState {
  selectValue: number[];
  renderArr: Cache.IBookItem[]
}
const state = reactive<IState>({
  selectValue: [],
  renderArr: []
})

onMounted(async () => {
  const { data } = await GetBook({ courseId: 2, bookId: 453 });
  state.renderArr = data.subBooks!;
})

const groupChange = (index: number, value: Cache.IBookItem) => {
  state.renderArr[index] = value;
  const checkedId = getCheckedId(state.renderArr, []);
}

const getCheckedId = (arr: Cache.IBookItem[], ret: number[]): number[] => {
  arr.map(item => {
    if (item.subBooks) {
      getCheckedId(item.subBooks, ret);
    }
    item.isCheck && ret.push(item.id)
  })
  return ret;
}

const router = useRouter();
const toConfirmCombine = () => {
  router.push({
    path: '/exercise/combine/confirm',
    query: {
      name: '知识点组卷'
    }
  })
}


</script>

<style lang="less" scoped>
.point_wrapper {
  padding: 0 38px 250px;

  .fix {
    bottom: 100px;
    z-index: 999;
  }
}
</style>