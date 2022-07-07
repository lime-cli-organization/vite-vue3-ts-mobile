<template>
  <div class="search">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item v-model="params.levelId" :options="searchList.course" />
      <van-dropdown-item v-model="params.grade" :options="searchList.grade" />
      <van-dropdown-item v-model="params.term" :options="searchList.term" />
      <van-dropdown-item v-model="params.grade" :options="searchList.grade" />
    </van-dropdown-menu>
  </div>
  <div class="list">
    <div class="item" v-for="item in state.paperList ">
      <div class="top">
        <span class="tag">{{ item.paperType }}</span>
        {{ item.name }}
      </div>
      <div class="bottom">
        <div class="left">
          <span>{{ item.inputTime }}</span>
        </div>
        <div class="right">
          <div class="btn text" @click="toInfo(item)">查看</div>
          <div class="btn regular plain">
            <LSvgIcon name="correct" size="14" color="#FF861B" /><span>批改</span>
          </div>
          <div class="btn regular active">
            <LSvgIcon class-name="lock" name="lock" size="14" color="#ffffff" /><span>下载</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { GetPubicList, Paper } from '@/apis/Paper';
import { GetCourse } from '@/apis/Paper.ts';
import LSvgIcon from '@/components/system/LSvgIcon.vue';
import { onMounted, reactive } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();

const params = reactive({
  levelId: 0,
  paperTypeId: 0,
  grade: '',
  page: 1,
  term: ''
})
const searchList = reactive({
  course: [],
  grade: [],
  term: [],
  bookType: []
})

const state = reactive({
  paperList: [] as Paper.IPaperItem[]
})

onMounted(async () => {
  const { data: { checkGrade, checkTerm, list } } = await GetCourse();
  params.grade = checkGrade;
  params.term = "上册";
  params.levelId = list[0].id;
  const { data } = await GetPubicList(params);
  state.paperList = data;
})


const toInfo = (item: Paper.IPaperItem) => {
  router.push({
    path: '/pro/paper/info',
    query: {
      id: item.id
    }
  })
}
</script>

<style lang="less" scoped>
.list {
  padding-bottom: 150px;
}

.item {
  width: 674px;
  box-sizing: border-box;
  padding: 38px;
  margin: 0 auto 24px;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  box-shadow: 0px 8px 21px 1px #E9ECF4;
  border-radius: 30px;

  .top {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    color: @textPrimary;
    font-weight: bold;
    line-height: 1.5;
    font-size: 30px;

    .tag {
      display: inline-block;
      margin-right: 10px;
      padding: 0 18px;
      background: #EAF4FF;
      border: 1px solid #49A3FF;
      border-radius: 16px;
      font-size: 20px;
      color: #49A3FF;
      flex-shrink: 0;
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      font-size: 20px;
      color: #C2C4CC;
    }

    .right {
      display: flex;
      justify-content: flex-start;

      .btn {
        margin-left: 24px;
      }
    }
  }
}
</style>
