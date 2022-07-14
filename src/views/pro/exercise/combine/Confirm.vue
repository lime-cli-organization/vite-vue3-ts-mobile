<template>
  <div class="wrapper">
    <van-form @submit="onSubmit" @failed="onFailed">
      <van-cell-group inset>
        <van-field v-model="form.name" name="name" label="姓名" placeholder="请输入姓名" :rules="rule.name" />
        <van-field v-model="form.mobile" name="mobile" label="手机号" placeholder="请输入手机号" :rules="rule.mobile" />
        <van-field name="sex" label="性别">
          <template #input>
            <LRadio v-model="form.sex" />
          </template>
        </van-field>
        <van-field name="type" readonly label="类型" placeholder="请选择类型" @click="showPicker = true"></van-field>
        <van-field name="date" readonly label="日期" placeholder="请选择日期" @click="showCalendar = true"></van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
  <van-popup v-model:show="showPicker" position="bottom">
    <van-picker :columns="formSearchList.pickerList" @confirm="confirmPicker" />
  </van-popup>
  <van-calendar v-model:show="showCalendar" @confirm="confirmCalendar" />

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FieldRule } from "vant";
import LRadio from "@/components/system/LRadio.vue";
const form = reactive({
  name: '',
  mobile: '',
  copySex: '',
  sex: '',
  type: '',
  date: new Date(),
})

const rule = reactive<Record<string, FieldRule[]>>({
  name: [{
    required: true,
    message: '请输入',
    trigger: 'onBlur',
    formatter: (value: any) => {
      return value; // 将表单项的值转换后进行校验
    }
  }],
  mobile: []
})

const formSearchList = reactive({
  pickerList: ['杭州', '宁波', '温州', '嘉兴', '湖州']
})

const showCalendar = ref(false);
const confirmCalendar = (date: Date) => {
  showCalendar.value = false;
  console.log(date);
}

const showPicker = ref(false);
const confirmPicker = (date: any) => {
  showPicker.value = false;
  console.log(date);
}

const onSubmit = (values: any) => {
  console.log('submit', values);
}
const onFailed = (errorInfo: any) => {
  console.log('failed', errorInfo);
}
</script>

<style lang="less" scoped>
.wrapper {
  padding-top: 40px;
  min-height: calc(100vh - 40px);
  background-color: aliceblue;
}
</style>