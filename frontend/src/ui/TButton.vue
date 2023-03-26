<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "TButton",
  props: {
    label: String
  }
})
</script>

<template>
  <div class="button-container">
    <button class="t-button">
      {{ label }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/variables";
.t-button {
  user-select: none;
  background-color: $input-field-bg-color;
  outline: $input-field-border;
  border-radius: $input-field-border-radius;
}

.t-button:hover {
  cursor: pointer;
}
</style>