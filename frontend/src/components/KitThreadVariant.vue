<script lang="ts">
import {defineComponent, PropType} from "vue";
import {KitsThreadVariantShort} from "#/ComplexTypes";

export default defineComponent({
  name: "KitThreadVariant",
  props: {
    value: Object as PropType<KitsThreadVariantShort>,
    show_color: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<template>
  <div class="kit-thread-variant">
    <div class="kit-thread-variant-code">{{ value.thread.code }}</div>
    <div class="kit-thread-variant-color-box"
         :style="`background-color: ${value.thread.color ?? 'rgba(0,0,0,0.001)'}`"
         v-if="show_color"
    >
    </div>
    <div class="kit-thread-variant-name">{{ value.thread.name }}</div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/variables";

.kit-thread-variant {
  display: flex;
  align-items: center;
  align-self: center;
  width: 100%;
}

.kit-thread-variant-color-box {
  outline: $input-field-border;
  border-radius: 5px;
  width: 10px;
  height: 10px;
  margin: 3px;
}
</style>