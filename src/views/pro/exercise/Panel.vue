<template>
  <div class="wrapper">
    <div class="summary">
      <span>练习记录</span>
      <div>
        小小周同学，你已练习<span>20次</span>，6次待批改
      </div>
    </div>
    <div class="pannel_item " :class="index === 0 ? 'first' : ''" v-for="(i,index) in 3">
      <div class="title">
        <LSvgIcon name="math" color="#ff861b" size="15"/>
        <span>数学</span>
      </div>
      <div class="grid">
        <div class="item">
          <span class="num">10</span>
          <span class="label">练习数</span>
        </div>
        <div class="item">
          <span class="num red">10</span>
          <span class="label">待批改</span>
        </div>
        <div class="item ">
          <span class="num green">10</span>
          <span class="label">已批改</span>
        </div>
      </div>
    </div>
    
  </div>
  
</template>

<style lang="less" scoped>
.summary {
  width: 100vw;
  height: 289px;
  padding-left: 50px;
  box-sizing: border-box;
  border-radius: 0 0 30px 30px;
  background-color: #ff861b;
  &>span {
    display: inline-block;
    font-size: 34px;
    font-weight: bold;
    color: #FFFFFF;
    margin: 30px 0;
  }
  &>div {
    font-size: 24px;
    color: #FFFFFF;
    span {
      // color: #E86363;
    }
  }
}
.pannel_item{
  box-sizing: border-box;
  padding: 48px 46px 0;
  width: 674px;
  height: 264px;
  background: #FFFFFF;
  box-shadow: 0px 8px 21px 1px #EEF0F6;
  border-radius: 30px;
  margin: 0 auto 30px;
  &.first{
    margin-top: -134px;
  }
  .title{
    display: flex;
    align-items: center;
    span{
      display: inline-block;
      margin-left: 24px;
      color: @textPrimary;
      font-weight: bold;
      font-size: 30px;
    }
  } 
}
.grid{
  margin-top: 35px;
  display: grid;
  grid-template-columns: repeat(3,150px);
  grid-column-gap: 68px;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .num {
      color: @textPrimary;
      font-size: 44px;
    }
    .label {
      display: inline-block;
      margin-top: 24px;
      color: #8F8FAE;
      font-size: 22px;
    }
    .red {
      color: #E86363;
    }
    .green {
      color: #2B9E46; 
    }
  }
}
</style>

<script setup lang="ts">
import LSvgIcon from '@/components/system/LSvgIcon.vue';
</script>