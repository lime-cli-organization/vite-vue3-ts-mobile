<template>
  <div class="wrapper">
    <div class="item" v-for="(item) in state.topics">
      <LCheckbox v-model="item.isCheck" />
      <TopicItem :level="0" :data="item" :showAnswer="true">
        <template #operationLeft="slotProps">
          {{ slotProps.inputTime }}
        </template>
      </TopicItem>
    </div>
    <button class="btn active fix">确认提交</button>
  </div>
</template>

<script setup lang="ts">
import TopicItem from '../../components/TopicItem.vue';
import { GetWrongTopicList } from "@/apis/Topic";
import { onMounted, reactive } from 'vue';
import { Paper } from '@/apis/Paper';
import LCheckbox from '@/components/system/LCheckbox.vue';


const state = reactive({
  topics: [] as never[] as Paper.ITopicItem[]
})
const getWrongTopicList = async () => {
  const { data } = await GetWrongTopicList({
    courseId: 2, page: 1, term: '2021下', bookId: 0, isExam: false
  });
  console.log(data);

  state.topics = data;
}
onMounted(() => {
  getWrongTopicList();
})
</script>
<style lang="less" scoped>
.wrapper {

  padding: 0 38px 250px;

  .item {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }

  :deep(.van-checkbox) {
    margin-right: 5px;
  }

  .fix {
    bottom: 100px;
    z-index: 999;
  }
}
</style>