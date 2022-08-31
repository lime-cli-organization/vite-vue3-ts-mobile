<template>
  <div class="wrapper">
    <template v-for="(item, index) in state.topicAnswerInfo">
      <p class="title">{{ index + 1 }}、{{ item.title }}</p>
      <TopicItem v-for="topic in item.topics" :data="topic" :innerAnswer="true" :showAnswer="true" :level="0"
        @onSuccess="setLike">
        <template #operationLeft="slotProps">
          <LRadio v-model="topic.isRight" @change="setRight" />
        </template>
      </TopicItem>
    </template>
    <button class="btn active fix" @click="submit">确认提交</button>
  </div>
</template>
<script setup lang="ts">
import { GetTopicList, Paper } from '@/apis/Paper';
import { getCurrentInstance, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import TopicItem from '../../components/TopicItem.vue';
import LRadio from '@/components/system/LRadio.vue';
// 获取挂载的全局自定义变量
const global = getCurrentInstance()!.appContext.config.globalProperties;

const route = useRoute();

const state = reactive({
  paperInfo: {} as Paper.IPaperInfo,
  topicAnswerInfo: [] as Paper.IAreaItem[]
})


onMounted(async () => {
  const { data: { paperInfo, topicAnswerInfo } } = await GetTopicList({ id: route.query.id })
  state.paperInfo = paperInfo;
  state.topicAnswerInfo = topicAnswerInfo;

})

const setLike = (data: any) => {
  console.log(data);
}

const setRight = (data: string) => {
  console.log(data);
}
const submit = () => {
  const { topicAnswerInfo } = state;
  let topics: Paper.ITopicItem[] = [];
  topicAnswerInfo.map((item) => {
    topics = topics.concat(parseData(item.topics || []));
    topics = topics.concat(parseData(item.subArea || []))
  })
  const topicIdArr = topics.map(item => { return { topicId: item.topicId, isRight: item.isRight } });
  const flag = topicIdArr.some((item) => typeof item.isRight !== 'boolean');
  if (flag) return global.$notify({ type: 'danger', message: '通知内容' });
}
const parseData = (list: Paper.ITopicItem[] | undefined) => {
  if (list) {
    return list.map((item) => {
      if (item.hasSub) {
        parseData(item.topicSub);
      }
      return item;
    })
  }
  return []
}

</script>

<style lang="less" scoped>
.wrapper {
  width: 672px;
  margin: 0 auto;
  padding-top: 24px;
  padding-bottom: 150px;

  .title {
    color: @textPrimary;
    font-weight: bold;
    font-size: 30px;
  }
}
</style>