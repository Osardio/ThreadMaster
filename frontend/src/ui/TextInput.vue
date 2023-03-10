<script lang="ts">
import {defineComponent, nextTick} from "vue";

export default defineComponent({
  name: "TextInput",
  props: {
    label: {
      type: String,
      default: ""
    }
  },
  methods: {
    resize() {
      const element = this.$refs._textarea as HTMLTextAreaElement;
      element.style.height = "50px";
      element.style.height = element.scrollHeight + "px";
    }
  },
  mounted() {
    nextTick(() => {
      this.resize();
    })
  }
})
</script>

<template>
  <label class="text-input-label">{{label}}</label>
  <div class="text-input-container">
    <textarea
        @input="resize"
        ref="_textarea"
        class="text-input"
    />
  </div>
</template>


<style lang="scss" scoped>
@import "@/global";
.text-input-container {
  width: 100%;
}

.text-input {
  background-color: $input-field-bg-color;
  border: $input-field-border;
  border-radius: $input-field-border-radius;
  resize: none;
  padding: 5px 10px;
  width: 100%;
  min-height: 50px;
  font-size: $input-font-size;
  overflow: hidden;
}

.text-input-label {
  font-size: 12px;
}
</style>