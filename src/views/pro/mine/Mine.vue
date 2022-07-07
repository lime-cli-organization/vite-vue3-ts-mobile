<template>
  <TreeView tree-title="产品分类" :data="treeData">
    <template #treeButton="props">
      <span class="tree-button">
        <LSvgIcon name="math" />
        <LSvgIcon name="math" />
      </span>
    </template>
  </TreeView>
</template>

<script setup lang="ts">
import LSvgIcon from '@/components/system/LSvgIcon.vue';
import TreeView from './TreeView.vue';
const treeData = [
  {
    title: '你好1',
    showChildren: true,
    children: [
      {
        title: '你好1-1',
        showChildren: true,
      },
      {
        title: '你好1-1-1',
        showChildren: true,
        children: [
          {
            title: '你好1-1-1-1',
            showChildren: true,
          }
        ]
      }
    ]
  },
  {
    title: '你好2',
    showChildren: true,
  },
  {
    title: '你好3',
    showChildren: true,
  }
]
</script>