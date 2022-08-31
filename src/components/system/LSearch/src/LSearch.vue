<template>
  <div class="wrapper">
    <div v-for="(item, index) in renderArr" :key="index">
      <div v-for="node in item" :key="node.key" @click="change(index, node)">{{ node.label }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ITreeNode, ITreeOption, Key, LSearchProps } from './LSearch';
defineOptions({
  name: 'LSearch'
})

const props = defineProps(LSearchProps);

// ============ 将用户数据格式化成统一的数据 ===============
function getPropValue(key: string, label: string, children: string) {
  return {
    getKey(node: ITreeOption): Key {
      return node[key] as Key;
    },
    getLabel(node: ITreeOption): Key {
      return node[label] as Key;
    },
    getChildren(node: ITreeOption): ITreeNode[] {
      return node[children] as ITreeNode[];
    },
  }
}
const treeOptions = getPropValue(props.keyField, props.labelFieled, props.childrenField)
const tree = ref<ITreeNode[]>([])
// 格式化数据
function formateUserData(data: ITreeOption[]): ITreeNode[] {
  function traversal(data: ITreeOption[], parent: ITreeNode | null = null) {
    return data.map(node => {
      const children = treeOptions.getChildren(node) || [];
      const treeNode: ITreeNode = {
        key: treeOptions.getKey(node) ? treeOptions.getKey(node) : treeOptions.getLabel(node),
        label: treeOptions.getLabel(node),
        children: [],
        rawNode: node,
        level: parent ? parent.level + 1 : 0
      }
      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode;
    })
  }
  const result = traversal(data)
  return result;
}
watch(
  () => props.data,
  (data: ITreeOption[]) => {
    tree.value = formateUserData(data);
  },
  { immediate: true }
)

// 树形结构扁平化
const flattenTree = (value: Array<Key>) => {
  const stack: ITreeNode[] = []; // 对格式化后数组的复制
  const nodeTree = tree.value;
  const expandedKeys = value;
  const flattenNodes = []; // 被展平后的包含values同级的数组
  for (let i = nodeTree.length; i >= 0; i--) {
    stack.push(nodeTree[i]);
  }
  while (stack.length) {
    const lastNode = stack.pop(); // 移除stack中最后一个元素并复制
    if (!lastNode) continue;
    flattenNodes.push(lastNode);
    if (expandedKeys.find(item => item === lastNode.key)) {
      let children = lastNode.children;
      if (children.length > 0) {
        for (let i = children.length; i >= 0; i--) {
          const element = children[i];
          stack.push(element);
        }
      }
    }
  }
  return flattenNodes
}
let deepth = 0;
function getRenderArr(value: Key[]) {
  const flattenArr = flattenTree(value);
  deepth = flattenArr.sort((a, b) => b.level - a.level)[0].level;
  const result = [];
  for (let i = 0; i < deepth + 1; i++) {
    result[i] = flattenArr.filter(item => item.level === i);
  }
  return result
}

// 用于渲染的二维数组
const copyValue = props.value;
let renderArr = ref<ITreeNode[][]>([])
watch(
  () => copyValue,
  (data) => {
    renderArr.value = getRenderArr(data);
    console.log(renderArr.value);
    copyValue[renderArr.value.length - 1] = renderArr.value[renderArr.value.length - 1][0].key;
    if (deepth + 1 === copyValue.length) {
      console.log('equals');
      console.log(copyValue);

      emits('update:value', copyValue)
      emits('change', copyValue)
    }

  },
  {
    deep: true,
    immediate: true
  }
)
const emits = defineEmits(['update:value', 'change'])
const change = (index: number, item: ITreeNode) => { // index: 数组的第几个元素； item：选中的元素数据
  copyValue[index] = item.key;
  // copyvalue值改变时 需要对渲染的数据进行重新计算
  // 计算后 当前选中数据的children 需要默认选中第一个值
  // 如果当前选择的是第二个元素并且后续渲染数据不匹配 那么renderArr.length = 2 && copyValue 重新赋值 .length === 2; 
  // 需要重新计算渲染数据并重新赋值
  // 当最后一个值赋值完成时 ，调用数据请求接口
}

</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  line-height: 2;
}
</style>