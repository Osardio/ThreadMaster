<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "StringInput",
  emits: ['edited'],
  data() {
    return {}
  },
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
    }
  },
  methods: {
    onFocusLost(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      if (value) {
        let result;
        if (this.type === 'number') { result = Number(value) } else { result = String(value) }
        this.$emit('edited', result)
      }
    }
  }
})
</script>

<template>
  <div class="string-input-container">
    <label v-if="label !==''" class="string-input-label">{{label}}</label>
    <input
        @blur="onFocusLost($event)"
        :class="{ 'string-input': true, 'string-input-hidden-arrow': !show_arrows, 'string-input-centered': centered }"
        :value="value"
        :type="type"
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