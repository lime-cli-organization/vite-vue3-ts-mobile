<template>
  <div class="wrapper">
    <div class="info">
      <div class="left">
        <van-image round width=".88rem" height=".88rem" :src="getHeadImg()" />
        <div>
          <div class="name">
            <span>{{ userInfo.nickName }}</span>
          </div>
          <div class="address">
            <span>{{ userInfo.schoolName }}</span>
            <span>{{ userInfo.className }}</span>
            <span>{{ userInfo.name }}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="search_wrapper">
          <input type="text" placeholder="请输入">
        </div>
      </div>
    </div>
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" lazy-render>
        <van-swipe-item v-for="item in 5">{{ item }}</van-swipe-item>
      </van-swipe>
    </div>
    <div class="grid">
      <div class="item">
        <img src="" alt="" />
        one
      </div>
      <div class="item">
        <img src="" alt="" />
        one
      </div>
      <div class="item">
        <img src="" alt="" />
        one
      </div>
      <div class="item">
        <img src="" alt="" />
        one
      </div>
      <div class="item" @click="toPaperList">
        <img src="@/assets/link5.png" alt="甄选套卷" />
        甄选套卷
      </div>
      <div class="item" @click="toCombineList">
        <img src="@/assets/link6.png" alt="智能组卷" />
        智能组卷
      </div>
    </div>
    <div class="update">
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="chart_wrapper">
      <div class="title">双基掌握走势</div>
      <div class="content">
        <LEcharts id="chart1" :option="option" />
      </div>
    </div>
    <div class="chart_wrapper">
      <div class="title">我的错题数</div>
      <div class="content">
        <LEcharts id="chart2" :option="option" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import LEcharts from "@/components/system/LECharts/Index.vue";
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/User'
import { onMounted, reactive } from 'vue';
import { GetExamChart } from '@/apis/Exam';
const userStore = useUserStore();
const userInfo = userStore.userInfo;

const option = reactive({
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri',]
  },
  series: [
    {
      data: [65, 72, 90, 95, 88,],
      type: 'line',
      itemStyle: {
        color: '#FF861B',
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(255,134,27,0.3)',
        },
        {
          offset: 1,
          color: 'rgba(255,255,255,0.15)',
        },
        ]),
      },
    }
  ]
})

onMounted(() => {
  getExamChart()
})

const getExamChart = async () => {
  const { data } = await GetExamChart({ course: '数学' })
}

const router = useRouter();
const toPaperList = () => {
  router.push({
    path: '/paper/list'
  })
}
const toCombineList = () => {
  router.push({
    path: '/exercise/combine/index'
  })
}

const getHeadImg = () => {
  const { headImg } = userInfo;
  if (headImg) {
    return `http://114.55.115.86:8003/${headImg}`;
  } else {
    return 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg';
  }

}
</script>
<style lang="less" scoped>
.wrapper {
  box-sizing: border-box;
  padding: 18px 40px;
  padding-bottom: 150px;
}


.info {
  display: flex;
  justify-content: space-between;
  color: @textPrimary;

  .left {
    display: flex;
    flex-direction: row;

    &>div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .name,
      .address {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin-left: 14px;
      }

      .name {
        font-weight: bold;
        font-size: 24px;
      }

      .address span {
        margin-right: 12px;
        font-size: 20px;
      }
    }
  }

  .search_wrapper {
    width: 246px;
    height: 66px;
    background: #F4F6FA;
    border-radius: 33px;

    input {
      box-sizing: border-box;
      padding-left: 24px;
      width: 100%;
      line-height: 100%;
      height: 100%;
      outline: none;
      border: none;
      background-color: transparent;
    }
  }
}

.banner {
  margin-top: 38px;
  width: 100%;
  height: 260px;
  border-radius: 30px;
  overflow: hidden;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 130px;
  text-align: center;
  background-color: #39a9ed;
}

.grid {
  display: grid;
  /* 声明列的宽度,数字3表示的重复3次，即有3列宽度为200px*/
  grid-template-columns: repeat(4, 114px);
  /* 声明行间距和列间距 */
  grid-gap: 0 71px;
  /* 分别表示两行的高度 */
  grid-template-rows: 150px 150px;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #282828;
    font-size: 24px;

    img {
      width: 114px;
      height: 88px;
      margin-top: 38px;
      margin-bottom: 12px;
    }
  }
}

.update {
  display: grid;
  grid-template-columns: repeat(2, 328px);
  grid-gap: 0 18px;
  grid-template-rows: 170px;
  margin-top: 40px;

  .item {
    background: #BADCFF;
    border-radius: 30px;
  }
}

.chart_wrapper {
  .title {
    font-size: 30px;
    font-weight: bold;
    color: @textTitle;
    margin: 50px 0 30px 0;
    text-align: left;
  }

  .content {
    width: 674px;
    height: 426px;
    background: #FFFFFF;
    box-shadow: 0px 8px 21px 1px #E9ECF4;
    border-radius: 30px;
  }
}
</style>