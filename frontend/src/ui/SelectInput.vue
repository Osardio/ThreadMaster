<template>
  <div class="select-input">
    <label class="select-input-label">{{caption}}</label>
    <VueSelect
        :label="label"
        :options="options"
        :clearable="clearable"
        v-model="val"
        @option:selected="onSelected($event)"
    />
  </div>

</template>

<script lang="ts">
import VueSelect from "vue-select";
import {defineComponent} from "vue";
export default defineComponent({
  name: "SelectInput",
  components: {VueSelect},
  emits: ['edited'],
  data() {
    return {
      val: {}
    }
  },
  props: {
    label: String,
    options: Array(Object),
    caption: String,
    placeholder: String,
    clearable: Boolean,
    value: {
      type: [Object, String],
      default: () => {}
    }
  },
  methods: {
    onSelected(value: [Object,String]) {
      console.log('input from selectinput: ',value)
      this.$emit('edited', value)
    }
  },
  mounted() {
    this.val = this.value
  }
})
</script>

<style lang="scss">
@import "../global.scss";

.select-input-label {
  font-size: 12px;
}

.vs__dropdown-toggle {
  background-color: #2D2D2D;
  border: 1px solid #212121;
}

.vs__selected {
  color: $color;
}

.vs__dropdown-toggle {
  cursor: pointer !important;
}

.vs__dropdown-option {
  background-color: #2D2D2D;
  padding: 2px 10px;
}

.vs__dropdown-menu {
  background-color: #2D2D2D;
  border: 1px solid #212121;
}

.vs__dropdown-option--highlight {
  background: #565656;
  color: var(--vs-dropdown-option--active-color);
}

.vs__dropdown-option--deselect {
  background: var(--vs-dropdown-option--deselect-bg);
  color: var(--vs-dropdown-option--deselect-color);
}

.vs__dropdown-option--disabled {
  background: var(--vs-state-disabled-bg);
  color: var(--vs-state-disabled-color);
  cursor: var(--vs-state-disabled-cursor);
}
</style>