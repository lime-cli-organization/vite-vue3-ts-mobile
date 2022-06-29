<template>
  <van-radio-group direction="horizontal" v-bind="attrs">
    <van-radio :name="item.value" checked-color="#FF861B" icon-size="18" v-for="item in renderArr">
      <slot name="text">{{ item.label }}</slot>
      <template #icon="props">
        <LSvgIcon v-if="props.checked" name="check_active" size="18" />
        <LSvgIcon v-else name="uncheck" size="18" />
      </template>
    </van-radio>
  </van-radio-group>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';

defineProps({
  renderArr: {
    default: () => {
      return [
        { label: '对', value: true, },
        { label: '错', value: false, }
      ]
    }
  }
})

const attrs = useAttrs();
</script>

<style lang="less" scoped>
::v-deep .van-radio__icon {
  height: auto;
  line-height: 100%;
  display: flex;
}

::v-deep .van-radio__label {
  line-height: 18px;
}
</style>