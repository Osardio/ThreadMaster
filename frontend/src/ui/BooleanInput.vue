<script>
export default {
  name: "BooleanInput",
  props: {
    caption: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onToggled() {
      this.$emit('toggled', !this.selected)
    }
  }
}
</script>

<template>
  <div class="boolean-input-container">
    <label class="boolean-input-label">{{caption}}</label>
    <div
        class="boolean-input"
        @click="onToggled"
    >
      <div
          v-if="selected"
          class="boolean-cross bx bx-check"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../variables";

.boolean-input-container {

}

.boolean-input-label {
  font-size: 12px;
}

.boolean-input {
  font-size: 14px;
  background-color: $input-field-bg-color;
  border: $input-field-border;
  border-radius: $input-field-border-radius;
  padding: 0 10px;
  height: 30px;
  width: 30px;
}

.boolean-input:hover {
  cursor: pointer;
}

.boolean-cross {
  display: flex;
  justify-content: center;
}

.boolean-cross:before {
  display: inline-block;
  font-size: 28px;
  height: 28px;
  width: 28px;
}
</style>