<script lang="ts">
import {defineComponent, nextTick} from "vue";

export default defineComponent({
  name: "TextInput",
  emits: ['edited'],
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    resize() {
      const element = this.$refs._textarea as HTMLTextAreaElement;
      element.style.height = "50px";
      element.style.height = element.scrollHeight + "px";
    },
    onFocusLost(event: Event) {
      const value = (event.target as HTMLInputElement).value
      if (value) {
        this.$emit('edited', value)
      }
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
  <div class="text-input-container">
    <label v-if="label !==''" class="text-input-label">{{label}}</label>
    <textarea
        @input="resize"
        @blur="onFocusLost($event)"
        :value="value ?? ''"
        ref="_textarea"
        class="text-input"
    />
  </div>
</template>


<style lang="scss" scoped>
@import "../variables";
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