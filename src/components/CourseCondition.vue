<template>
  <div class="LCourse">
    <span v-for="item in state.courseList">{{ item.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { Cache } from '@/apis/Cache';
import { GetCourse } from '@/apis/Cache.ts';
import { onMounted, reactive } from 'vue';

onMounted(() => {
  getCourse();
})
interface IState {
  courseList: Cache.ICourseResult[]
}
const state = reactive<IState>({
  courseList: [],
})
const getCourse = async () => {
  const { data } = await GetCourse();
  state.courseList = data;
}
</script>
<style lang="less" scoped>
.LCourse {
  line-height: 48px;
  display: flex;
  align-items: center;
  padding: 34px 38px 30px;

  span {
    &:not(:first-of-type) {
      margin-left: 64px;
    }

    font-size: 34px;
    color: @textPrimary;
    padding-bottom: 24px;
  }
}
</style>