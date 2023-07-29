<script lang="ts">
import {defineComponent} from "vue";
import ImageWrapper from "@/ui/ImageWrapper.vue";

export default defineComponent({
  name: "ModalWindow",
  components: {ImageWrapper},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show',false)
    }
  },
})
</script>

<template>
  <div
    v-if="show"
    class="modal-window"
    @click="hideDialog"
  >
    <div
      class="modal-content"
      @click.stop
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/variables";

.modal-window {
  position: fixed;
  display: flex;
  z-index: 9998;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  margin: auto;
  background: $main-area-bg-color;
  border-radius: 4px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>