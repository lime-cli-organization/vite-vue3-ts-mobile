<template>
  <div class="group">
    <div class="title_row">
      <LCheckbox class="title" :text="renderItem.name" :name="renderItem.id" v-model="props.renderItem.isCheck"
        @click="toggleAll">
      </LCheckbox>
      <LSvgIcon name="more" size="16" className="arrow" @click="rightClick" />
    </div>
    <div class="child" v-show="isChildShow">
      <van-checkbox checked-color="#FF861B" icon-size="18" v-for="(item, index) in renderItem.subBooks"
        v-model="item.isCheck" :ref="(el) => childRefs[index] = el" :name="item.id" @click="checkChange">
        {{ item.name }}
        <template #icon="props">
          <LSvgIcon :name="props.checked ? 'check_active' : 'check'" size="16" />
        </template>
      </van-checkbox>
    </div>
  </div>

</template>

<script lang="ts" setup>
import LCheckbox from '@/components/system/LCheckbox.vue';
import { ref } from 'vue';
import type { Cache } from '@/apis/Cache'
import LSvgIcon from './LSvgIcon.vue';

const props = defineProps({
  renderItem: {
    required: true,
    default: {} as Cache.IBookItem
  },
})
const emit = defineEmits(['toggleAll', 'change'])

// 控制全选/反选
const childRefs = ref([] as any[])
const toggleAll = () => {
  if (props.renderItem.isCheck) {
    childRefs.value.map(item => item.toggle(true))
  } else {
    childRefs.value.map(item => item.toggle(false))
  }
  emit('change', props.renderItem)
}
// 子复选change
const childArr = props.renderItem.subBooks;
const checkChange = () => {
  if (childArr.every(item => item.isCheck)) {
    props.renderItem.isCheck = true;
  } else if (childArr.some(item => !item.isCheck)) {
    props.renderItem.isCheck = false;
  }
  emit('change', props.renderItem)

}
// 折叠展开
let isChildShow = ref(false)
const rightClick = () => {
  isChildShow.value = !isChildShow.value;
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

.group {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: 0px 8px 21px 1px #E9ECF4;
  margin-bottom: 30px;

  .title_row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    :deep(.arrow) {
      transform: rotate(90deg);
    }
  }

  .child {
    width: 100%;
    box-sizing: border-box;
    padding: 0 48px;
  }
}
</style>