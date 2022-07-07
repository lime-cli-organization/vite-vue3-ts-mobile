<template>
  <CourseCondition />
  <div class="nav">
    <div class="item" @click="changeComp('PointList')">PointList</div>
    <div class="item" @click="changeComp('ErrorList')">ErrorList</div>
    <div class="item" @click="changeComp('WeakList')">WeakList</div>
  </div>
  <ErrorList v-show="currentComp === 'ErrorList'" />
  <PointList v-show="currentComp === 'PointList'" :course="course" />
  <WeakList v-show="currentComp === 'WeakList'" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import ErrorList from './ErrorTopic.vue';
import PointList from './Point.vue';
import WeakList from './Weak.vue';
import CourseCondition from '../../components/CourseCondition.vue';

const currentComp = ref('PointList')
const changeComp = (type: string) => {
  currentComp.value = type
}
interface IPoint {
  value: any;
  label: string
}
interface IState {
  pointList: IPoint[]
  selectPoints: IPoint[]
}

const state = reactive<IState>({
  pointList: [{ value: 1, label: '选项' }, { value: 2, label: '选项' }, { value: 3, label: '选项' }],
  selectPoints: [{ value: 1, label: '选项' }], //
})


const course = ref('')

</script>

<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  padding: 0 38px 48px;

  .item {
    width: 208px;
    line-height: 76px;
    border-radius: 76px;
    text-align: center;
    border: 1px solid
  }
}
</style>