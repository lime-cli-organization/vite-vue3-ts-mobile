<template>
  <div class="search">
    <SearchRow v-if="searchList.data.length > 0" :data="searchList.data" :index="0" />
  </div>
  <div class="list">
    <van-pull-refresh v-model="state.isRefreshing" @refresh="onRefresh">
      <van-list v-model:loading="state.isLoading" :finished="state.isFinished" finished-text="没有更多了" @load="getList"
        :immediate-check="false">
        <div class="item" v-for="item in state.list ">
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
      </van-list>
    </van-pull-refresh>

  </div>
</template>


<script setup lang="ts">
import { GetPubicList, Paper } from '@/apis/Paper';
import { GetCourse } from '@/apis/Paper.ts';
import LSvgIcon from '@/components/system/LSvgIcon.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import SearchRow from '../components/SearchRow.vue';
const router = useRouter();

const searchList = reactive({
  course: [],
  grade: [],
  term: [],
  bookType: [],
  data: []
})

const params = reactive({
  levelId: 0,
  paperTypeId: 0,
  grade: '',
  page: 1,
  term: ''
})
const state = reactive({
  list: [] as Paper.IPaperItem[],
  total: 0,
  isRefreshing: false,
  isLoading: false,
  isFinished: false,
})


onMounted(async () => {
  const { data: { checkGrade, checkTerm, list } } = await GetCourse();
  params.grade = checkGrade;
  params.term = '上册';
  params.levelId = list[0].id;
  searchList.data = list;
  getList();
})

const getList = async () => {
  const { data, total } = await GetPubicList(params);
  if (data.length === 0) {
    state.isFinished = true;
  }
  params.page += 1;
  state.list = state.list.concat(data);
  state.total = total;
  state.isLoading = false;
  if (state.list.length >= state.total) {
    console.log(state.list.length, state.total, state.list.length >= state.total);
    state.isFinished = true;
  }
}

const onRefresh = () => {
  params.page = 1;
  state.list = [];
  state.isRefreshing = false;
  state.isLoading = true;
  getList();
}


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
    color: @textPrimary;
    font-weight: bold;
    line-height: 1.5;
    font-size: 30px;

    .tag {
      margin-right: 10px;
      padding: 0 18px;
      background: #EAF4FF;
      border: 1px solid #49A3FF;
      border-radius: 16px;
      font-size: 20px;
      color: #49A3FF;
      float: left;
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
