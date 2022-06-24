<template>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import type { Router } from 'vue-router'

const router:Router = useRouter();
const route = useRoute();

const swtichView = (path:string) => {
  router.push({
    name: path,
  })
}

</script>