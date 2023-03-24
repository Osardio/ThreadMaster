<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "StringInput",
  emits: ['edited'],
  data() {
    return {}
  },
  props: {
    value: {
      type: {} as PropType<String | Number| null>,
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
    <label class="string-input-label">{{label}}</label>
    <input
        @blur="onFocusLost($event)"
        class="string-input"
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

.string-input-label {
  font-size: 12px;
}
</style>