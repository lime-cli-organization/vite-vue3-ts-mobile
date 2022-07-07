<template>
  <van-checkbox checked-color="#FF861B" icon-size="18" v-bind="attrs" ref="checkbox">
    <slot name="text">{{ text }}</slot>
    <template #icon="props">
      <LSvgIcon :name="props.checked ? 'check_active' : 'check'" size="16" />
    </template>
  </van-checkbox>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';

const attrs = useAttrs();

defineProps({
  text: {
    type: String
  },
  value: {
    default: ''
  }
})

const checkClick = (checked: boolean) => {
  console.log('checkClick', checked);
}
</script>

<style lang="less" scoped>
:deep(.van-checkbox__icon) {
  height: auto;
  line-height: 100%;
  display: flex;
}

:deep(.van-checkbox__label) {
  line-height: 24px;
}
</style>