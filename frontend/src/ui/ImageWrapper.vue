<script lang="ts">
import {defineComponent, PropType} from "vue";
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
      required: true
    },
    alt: {
      type: {} as PropType<string | null>,
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