<template>
  <div class="wrapper">
    <div class="info">
      <div class="left">
        <van-image round width=".88rem" height=".88rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <div>
          <div class="name">
            <span>{{ userInfo.RealName }}</span>
          </div>
          <div class="address">
            <span>杭州大禹小学</span>
            <span>四六班</span>
            <span>黄灿灿</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="search_wrapper">
          <input type="text" placeholder="请输入">
        </div>
      </div>
    </div>
    <div class="banner"></div>
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
      <div class="content"></div>
    </div>
    <div class="chart_wrapper">
      <div class="title">我的错题数</div>
      <div class="content"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUser } from '@/store/modules/User'
const userStore = useUser();
const userInfo = userStore.parseToken;

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
  background: #3C3C5A;
  border-radius: 30px;
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