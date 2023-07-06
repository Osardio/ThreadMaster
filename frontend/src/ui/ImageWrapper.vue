<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ImageWrapper",
  data() {
    return {
      error: false
    }
  },
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
  <img v-if="!error"
       :src="src"
       :alt="alt ?? ''"
       @error="onImageError($event)"
       ref="_img"
  >
  <div v-else
       class="image-placeholder bx bx-image-alt"
  />
</template>

<style scoped>
</style>