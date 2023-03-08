<template>
  <img :class="{'image-placeholder': error}"
       :src="src"
       :alt="alt"
       @error="onImageError($event)"
       ref="_img"
  >

</template>

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
      required: true
    },
    alt: {
      type: String,
      default: ""
    }
  },
  methods: {
    onImageError(_event: ErrorEvent) {
      (this.$refs._img as HTMLImageElement).src='src/assets/img_error.svg'
      this.error = true
    }
  }
})
</script>

<style scoped>
.image-placeholder {
  fill: red;
  color: red;
}
</style>