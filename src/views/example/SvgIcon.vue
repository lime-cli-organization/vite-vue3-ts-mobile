<template>
  <LSvgIcon name="home" class="svg_extenal" :color="color" @mouseover="mouseover" @mouseleave="mouseleave"/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color = ref<string>('red');
const mouseover = () => {
  color.value = '#333';
}
const mouseleave = () => {
  color.value = 'red'
}

</script>

<style lang="less" scoped>
 .svg_extenal{
  color: red;
}
</style>