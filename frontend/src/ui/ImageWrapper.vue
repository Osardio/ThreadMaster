<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ImageWrapper",
  props: {
    src: {
      type: String,
      required: true,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      error: false
    }
  },
  watch: {
    src() {
      this.error = false
    }
  },
  methods: {
    onImageError(_event: Event) {
      this.error = true
    }
  }
})
</script>

<template>
  <img
    v-if="!error"
    ref="_img"
    :src="src"
    :alt="alt ?? ''"
    @error="onImageError($event)"
  >
  <div
    v-else
    class="image-placeholder bx bx-image-alt"
  />
</template>

<style scoped>
</style>