<template>
  <div>
    <div v-for="item in tree" :key="item.key">{{ item.label }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ITreeNode, ITreeOption, Key, LSearchProps } from './LSearch';
defineOptions({
  name: 'LSearch'
})

const props = defineProps(LSearchProps);

// 获取prop对应的字段值
function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: ITreeOption) {
      return node[key] as Key
    },
    getLabel(node: ITreeOption) {
      return node[label] as Key
    },
    getChildren(node: ITreeOption) {
      return node[children] as ITreeOption[]
    },
  }
}
const treeOptions = createOptions(props.keyField, props.labelFieled, props.childrenField);

const tree = ref<ITreeNode[]>([])
// 格式化数据
function formateUserData(data: ITreeOption[], parent: ITreeNode | null = null) {
  function traversal(data: ITreeOption[], parent: ITreeNode | null = null) {
    return data.map((item) => {
      const children = treeOptions.getChildren(item) || [];
      const treeNode: ITreeNode = {
        key: treeOptions.getKey(item),
        label: treeOptions.getLabel(item),
        children: [],
        level: parent ? parent.level + 1 : 0,
        rawNode: item,
      }
      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode);
      }
      return treeNode
    })
  }
  const result: ITreeNode[] = traversal(data, parent)
  return result;
}

watch(
  () => props.data,
  (data: ITreeOption[]) => {
    tree.value = formateUserData(data);
  },
  { immediate: true }
)

</script>