<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "RightPanel"
})
</script>

<template>
  <div class="panel panel-right">
    <slot></slot>
  </div>
</template>

<style scoped>
</style>