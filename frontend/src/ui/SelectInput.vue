<script lang="ts">
import VueSelect from "vue-select";
import {Component, defineComponent} from "vue";

// fix for typescript
const VueSelects = VueSelect as Component

export default defineComponent({
  name: "SelectInput",
  components: { VueSelects },
  emits: ['edited'],
  data() {
    return {
      val: { name: "name" } as object,
      lab: "name"
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array(Object),
      default: () => [{ name: "default" }]
    },
    caption: String,
    placeholder: String,
    clearable: Boolean,
    searchable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Object,
      required: false
    }
  },
  watch: {
    value(newValue: object) {
      this.val = newValue
    }
  },
  mounted() {
    this.val = this.value ?? {}
    this.lab = this.label
  },
  methods: {
    onSelected(value: [Object,String]) {
      this.$emit('edited', value)
    }
  }
})
</script>

<template>
  <div class="select-input-container">
    <label class="select-input-label">{{ caption }}</label>
    <VueSelects
      v-if="options"
      v-model="val"
      class="select-input"
      placeholder="Выберите..."
      :label="lab"
      :options="options"
      :clearable="clearable"
      :searchable="searchable"
      @option:selected="onSelected($event)"
    />
  </div>
</template>

<style lang="scss">
@import "../variables";
.select-input-label {
  font-size: 12px;
}

.select-input {
  height: 30px;
  padding: 0;
  box-sizing: border-box !important;
}

.vs__dropdown-toggle {
  background-color: $input-field-bg-color;
  border: $input-field-border;
  border-radius: $input-field-border-radius;
}

.vs__selected {
  color: $color;
}

.vs__dropdown-toggle {
  cursor: pointer !important;
}

.vs__dropdown-option {
  background-color: $input-field-bg-color;
  padding: 2px 10px;
}

.vs__dropdown-menu {
  background-color: $input-field-bg-color;
  border: $input-field-border;
}

.vs__dropdown-option--highlight {
  background: #565656;
  color: var(--vs-dropdown-option--active-color);
}

.vs-actions > * {
  fill: $color;
}

/*
.vs__dropdown-option--deselect {
  background: var(--vs-dropdown-option--deselect-bg);
  color: var(--vs-dropdown-option--deselect-color);
}

.vs__dropdown-option--disabled {
  background: var(--vs-state-disabled-bg);
  color: var(--vs-state-disabled-color);
  cursor: var(--vs-state-disabled-cursor);
}
*/
</style>