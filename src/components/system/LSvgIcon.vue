<template>
  <svg  :class="svgClass" aria-hidden="true">
    <use :xlink:href="symbolId"  :style="`color:${color}; fill:${color}; stroke:${color}`"/>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
    className: {
      type: String,
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : 'svg-icon')
    return { svgClass,symbolId }
  },
})
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>