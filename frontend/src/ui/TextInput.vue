<script lang="ts">
import {defineComponent, nextTick} from "vue";

export default defineComponent({
  name: "TextInput",
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
  emits: ['edited'],
  data() { return { initialValue: "" } },
  mounted() {
    this.initialValue = this.value
    nextTick(() => {
      this.resize();
    })
  },
  methods: {
    resize() {
      const element = this.$refs._textarea as HTMLTextAreaElement;
      element.style.height = "50px";
      element.style.height = element.scrollHeight + "px";
    },
    onFocusLost(event: Event) {
      const value = (event.target as HTMLInputElement).value
      if (value === this.initialValue) {
        this.$emit('edited', value)
        this.initialValue = this.value
      }
    }
  }
})
</script>

<template>
  <div class="text-input-container">
    <label
      v-if="label !==''"
      class="text-input-label"
    >{{ label }}</label>
    <textarea
      ref="_textarea"
      :value="value ?? ''"
      class="text-input"
      @input="resize"
      @blur="onFocusLost($event)"
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