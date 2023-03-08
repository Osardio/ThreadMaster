<template>
  <div class="panel panel-right">
    <slot></slot>
  </div>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({
  name: "RightPanel"
})
</script>

<style scoped>
.panel-right {
  padding: 25px;
}
</style>