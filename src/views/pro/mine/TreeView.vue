<template>
  <div class="wrapper">
    <span>这是一个item</span>
    <p>这是一个p</p>
    <img src="@/assets/treeicon.png" alt="">
    <div class="item" v-for="item in data">
      <i></i>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

interface Itree {
  children?: Itree[];
  title: string;
  showChildren: boolean;
}
defineProps({
  data: {
    type: Array as PropType<Itree[]>
  }
})
</script>

<style lang="less" scoped>
.wrapper {
  .item {
    display: flex;
    align-items: center;

    i {
      background-image: url('@/assets/treeicon.png');
      background-position: -104px 0;
      width: 40px;
      height: 68px;
      display: inline-block;
      margin-right: 8px;
    }

    &:first-of-type i {
      background-position: -302px 0px;
    }

  }
}
</style>
