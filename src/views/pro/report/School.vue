<template>
  <div class="wrapper">
    <div class="search">

    </div>
    <div class="item first">
      <div class="title">
        <span>评估走势</span>
      </div>
      <div class="chart"></div>
      <p>你本场考试得分为<span class="num">90</span>分，相较上次提升3分； </p>
      <p>本场班级最高分为98分，最低分66分，平均分89分，中位分88分。</p>
    </div>
    <div class="item">
      <div class="title">
        <span>薄弱攻克</span>
        <LSvgIcon name="more" size="24" color="#FF861B" />
      </div>
      <p>你有待加强的知识点总共<span class="num">N</span>个，按薄弱程度分布如下：</p>
      <div class="legend">
        错误率：
        <div class="item"><span class="dot red"></span>个人</div>
        <div class="item"><span class="dot orange"></span>区域</div>
        <div class="item"><span class="dot blue"></span>提升</div>
      </div>
      <div class="list">
        <div class="item"  v-for="item in 3">
          <div class="top">1. 百分数和分数、小数的互化百分数和</div>
          <div class="bottom">
            <div class="left">
              <span class="dot red"></span>个人
              <span class="dot orange"></span>区域
              <span class="dot blue"></span>提升
            </div>
            <div class="right">
              <div class="btn small plain">
                <LSvgIcon name="play" size="12" color="#FF861B" />视频
              </div>
              <div class="btn small plain">
                <LSvgIcon name="exercise_rect" size="12" color="#FF861B" />练习
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="item">
      <div class="title">
        <span>错题本</span>
        <LSvgIcon name="more" size="24" color="#FF861B" />
      </div>
      <div class="list">
        <div class="item" v-for="item in 3">
          <div class="top"><span class="tag">严重</span>4.百分数和分数、小数的互化百分数和</div>
          <div class="bottom">
            <div class="left">错题数量：9</div>
            <div class="right">
              <div class="btn small plain">
                <LSvgIcon name="play" size="12" color="#FF861B" />视频
              </div>
              <div class="btn small plain">
                <LSvgIcon name="exercise_rect" size="12" color="#FF861B" />练习
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item ">
      <div class="title">
        <span>练习提升</span>
      </div>
      <div class="chart"></div>
      <p>你在本学期组卷练习<span class="num">N</span>次，共练习了<span class="num">N</span>道题，答对了<span class="num">N</span>道题，新增错题<span
          class="num">N</span>道。</p>
      <p>经过你的努力，共有<span>N</span>个知识点得到了明显提升。</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  background-color: #f4f4f4;
  padding-bottom: 150px;

  &>.item {
    width: 694px;
    box-sizing: border-box;
    padding: 14px 36px 30px;
    margin: 0 auto 30px;
    background: #FFFFFF;
    box-shadow: 0px 4px 15px 0px rgba(244, 244, 244, 0.68);
    border-radius: 20px;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 28px 0 0;

      span {
        font-size: 34px;
        font-weight: bold;
        color: @textPrimary;
      }
    }

    p {
      color: @textPrimary;
      line-height: 1.5;

      .num {
        font-size: 32px;
        font-weight: bold;
        color: @primary;
        padding: 0 4px;
      }
    }

    .chart {
      width: 623px;
      height: 376px;
      background: #F9F9F9;
      border-radius: 8px;
      margin: 28px auto 24px;
    }

    &.first {
      margin-top: -296px;
    }
  }
}

.search {
  width: 100vw;
  height: 533px;
  border-radius: 0 0 30px 30px;
  background-color: @primary;
}

.legend {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
  font-size: 24px;
  color: @textPrimary;

  .item {
    &:not(:last-of-type) {
      margin-right: 47px;
    }
  }
}

span.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 6px;
  border-radius: 50%;

  &.red {
    background-color: rgb(244, 42, 42);
  }

  &.orange {
    background-color: rgb(255, 200, 14);
  }

  &.blue {
    background-color: #60abf5;
  }
}

.list {
  width: 623px;
  margin: 20px auto 0;
  padding: 0 28px 24px;
  box-sizing: border-box;
  background: #F9F9F9;
  border-radius: 8px;

  .item {
    display: flex;
    flex-direction: column;

    &:not(:last-of-type) {
      border-bottom: 1px solid #E9E9E9;
    }

    .top {
      display: flex;
      align-items: center;
      padding-top: 24px;
      color: #282828;
      font-size: 28px;

      .tag {
        display: inline-block;
        margin-right: 12px;
        border-radius: 24px 0 24px 0;
        font-size: 24px;
        color: white;
        padding: 4px 16px;
        background-color: rgb(191, 4, 4);
      }
    }

    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 0;
      color: #5D5D5D;

      .right {
        display: flex;
        flex-direction: row;
        align-items: center;

        .btn {
          margin-left: 12px;
        }
      }
    }
    .dot {
      &:not(:first-child) {
        margin-left: 24px;
      }
    }
  }
}
</style>

<script setup lang="ts">
import LSvgIcon from '@/components/system/LSvgIcon.vue';
</script>