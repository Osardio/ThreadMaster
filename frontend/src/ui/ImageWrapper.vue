<script lang="ts">
import {defineComponent} from "vue";
import errorImageUrl from "@/assets/img_error.svg"

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
  methods: {
    onImageError(_event: Event) {
      (this.$refs._img as HTMLImageElement).src=new URL(errorImageUrl, import.meta.url).href
      this.error = true
    }
  }
})
</script>

<template>
  <img :class="{'image-placeholder': error}"
       :src="src"
       :alt="alt ?? ''"
       @error="onImageError($event)"
       ref="_img"
  >
</template>

<style scoped>
.image-placeholder {
  fill: red;
  color: red;
}
</style>