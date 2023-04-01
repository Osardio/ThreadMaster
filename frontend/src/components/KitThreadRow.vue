<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "KitThreadRow",
  emits: ['removed'],
  data() {
    return {
      hovered: false
    }
  },
  props: {
    number: Number
  },
})
</script>

<template>
  <td class="kit-thread-row"
      @mouseover="hovered = true"
      @mouseleave="hovered = false">
  <div>
    <div
        v-if="hovered"
        class="remove-row-button"
        @click="$emit('removed')"
    >
      <i class="bx bx-trash"></i>
    </div>{{ number }}
  </div>
  </td>
</template>

<style scoped>

.kit-thread-row {
  text-align: center;
  position: relative;
}

.remove-row-button {
  position: absolute;
  z-index: 1;
  left: 2px;
  bottom: 15px;
}

.remove-row-button:hover {
  cursor: pointer;
}
</style>