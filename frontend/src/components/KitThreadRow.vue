<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "KitThreadRow",
  props: {
    number: Number,
    show_removal: {
      type: Boolean,
      default: false
    }
  },
  emits: ['removed'],
  data() {
    return {
      hovered: false
    }
  },
})
</script>

<template>
  <td
    class="kit-thread-row"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <div>
      <div
        v-if="hovered && show_removal"
        class="remove-row-button"
        @click="$emit('removed')"
      >
        <i class="bx bx-trash" />
      </div>{{ number }}
    </div>
  </td>
</template>

<style scoped>

.kit-thread-row {
  width: 45px;
  text-align: center;
  position: relative;
}

.remove-row-button {
  position: absolute;
  z-index: 1;
  left: 3px;
  bottom: 15px;
}

.remove-row-button:hover {
  cursor: pointer;
}
</style>