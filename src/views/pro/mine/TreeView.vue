<template>
  <ul>
    <template v-for="item in data" :key="item.key">
      <li v-if="item.children" class="tree-branch">
        <div class="tree-branch-header">
          <span class="tree-branch-name">
            <span class="tree-label">{{ item.title }}</span>
          </span>
          <slot name="treeButton" v-bind="item">13331</slot>
        </div>
        <tree-view v-if="item.showChildren" :data="item.children" :parent="item">
          <template #treeButton="subItem">
            <slot name="treeButton" v-bind="subItem"></slot>
          </template>
        </tree-view>
      </li>
      <li class="tree-item" v-else>
        <span class="tree-item-name">
          <span class="tree-label">{{ item.title }}</span>
        </span>
        <slot name="treeButton" v-bind="item"></slot>
      </li>

    </template>
  </ul>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

interface Itree {
  children?: Itree[];
  title: string;
  showChildren: boolean;
}
defineProps({
  data: {
    type: Array as PropType<Itree[]>
  }
})
</script>