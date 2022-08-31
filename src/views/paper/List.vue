<template>
  <div class="search">
    <LSearch v-if="searchList.data.length > 0" :data="searchList.data" :index="0" key-field="id" label-fieled="name"
      children-field="list" :value="selectValue" @change="searchChange" />
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
              <span>{{ $filter.format(item.inputTime, 'YYYY-MM-DD') }}</span>
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
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import LSearch from '@/components/system/LSearch';
import { Key } from '@/components/system/LSearch/src/LSearch';
const $filter = getCurrentInstance()?.appContext.config.globalProperties.$filter;
const router = useRouter();

const selectValue = ref<Key[]>([2, '一年级', '上册', '全部'])
// 搜索条件下拉
const searchList = reactive({
  course: [],
  grade: [],
  bookType: [],
  data: []
})
// 搜索条件
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
// 数据获取
const getList = async () => {
  const { data, total } = await GetPubicList(params);
  if (data.length === 0) {
    state.isFinished = true;
  }
  params.page += 1;
  state.list = state.list.concat(data);
  state.total = total!;
  state.isLoading = false;
  if (state.list.length >= state.total) {
    state.isFinished = true;
  }
}
// 下拉刷新
const onRefresh = () => {
  params.page = 1;
  state.list = [];
  state.isRefreshing = false;
  state.isLoading = true;
  getList();
}

const searchChange = (data: Key[]) => {
  console.log(data);
}


const toInfo = (item: Paper.IPaperItem) => {
  router.push({
    path: '/paper/info',
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
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 674px;
  margin: 0 auto 24px;
  padding: 38px;
  background: #FFFFFF;
  border-radius: 30px;
  box-shadow: 0 8px 21px 1px #E9ECF4;

  .top {
    color: @textPrimary;
    font-weight: bold;
    font-size: 30px;
    line-height: 1.5;

    .tag {
      float: left;
      margin-right: 10px;
      padding: 0 18px;
      color: #49A3FF;
      font-size: 20px;
      background: #EAF4FF;
      border: 1px solid #49A3FF;
      border-radius: 16px;
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      color: #C2C4CC;
      font-size: 20px;
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
