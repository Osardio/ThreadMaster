<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ColorInput",
  props: {
    value: {
      type: [String, Number],
      default: "",
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "string"
    },
    show_arrows: {
      type: Boolean,
      default: true
    },
    centered: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
  },
  emits: ['edited', 'changed'],
  data() {
    return { initialValue: {} }
  },
  mounted() {
    if (this.type === 'number') {
      this.initialValue = Number(this.value)
    } else {
      this.initialValue = String(this.value)
    }
  },
  methods: {
    onFocusLost(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      let result;
      if (this.type === "number") { result = Number(value) } else { result = String(value) }
      if (result !== this.initialValue) {
        this.$emit('edited', result)
        this.initialValue = value
      }
    },
    onValueChanged(event: Event) {
      this.$emit("changed", (event.target as HTMLInputElement).value)
    },
    setFocus() {
      console.log("IN SET FOCUS");
      (this.$refs.input as HTMLInputElement).focus()
    }
  }
})
</script>

<template>
  <div class="string-input-container">
    <label
      v-if="label !==''"
      class="string-input-label"
    >{{ label }}</label>
    <input
      :class="{ 'string-input': true, 'string-input-hidden-arrow': !show_arrows, 'string-input-centered': centered }"
      ref="input"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      @blur="onFocusLost($event)"
      @input="onValueChanged"
    >
  </div>
</template>



<style lang="scss" scoped>
@import "@/variables";

::placeholder {
  color: #898989;
  opacity: 1;
}

.string-input {
  font-size: 14px;
  background-color: $input-field-bg-color;
  border: $input-field-border;
  border-radius: $input-field-border-radius;
  padding: 0 10px;
  height: 30px;
  width: 100%;
}

.string-input-hidden-arrow::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.string-input-centered {
  text-align: center;
}

.string-input-label {
  font-size: 12px;
}
</style>