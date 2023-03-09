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
    }
  },
  methods: {
    onFocusLost(value?: Number | String) {
      if (value) {
        if (this.type === 'number') { value = Number(value) } else { value = String(value) }
        this.$emit('edited', value)
      }
    }
  }
})
</script>

<template>
  <div class="string-input-container">
    <label class="string-input-label">{{label}}</label>
    <input
        @blur="onFocusLost($event.target.value)"
        class="string-input"
        :value="value"
        :type="type"
    >
  </div>
</template>



<style scoped>
.string-input-container {

}

::placeholder {
  color: #898989;
  opacity: 1;
}

.string-input {
  font-size: 16px;
  background-color: #2D2D2D;
  border: 1px solid #212121;
  border-radius: 4px;
  padding: 0 10px;
  height: 30px;
  width: 100%;
}

.string-input-label {
  font-size: 12px;
}
</style>