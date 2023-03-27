<script lang="ts">
import VueSelect from "vue-select";
import {defineComponent} from "vue";

export default defineComponent({
  name: "SelectInput",
  components: { VueSelect },
  emits: ['edited'],
  data() {
    return {
      val: { name: "name" } as Object,
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
      required: true
    }
  },
  watch: {
    value(newValue: object) {
      this.val = newValue
    }
  },
  methods: {
    onSelected(value: [Object,String]) {
      this.$emit('edited', value)
    }
  },
  mounted() {
    this.val = this.value
    this.lab = this.label
  }
})
</script>

<template>
  <div class="select-input-container">
    <label class="select-input-label">{{caption}}</label>
    <VueSelect
        v-if="options"
        class="select-input"
        :label="lab"
        :options="options"
        :clearable="clearable"
        :searchable="searchable"
        v-model="val"
        @option:selected="onSelected($event)"
    >
    </VueSelect>
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