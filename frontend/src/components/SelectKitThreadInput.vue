<script lang="ts">
import {Component, defineComponent, PropType} from "vue";
import {Thread} from "#/Types";
import TButton from "@/ui/TButton.vue";
import VueSelect from "vue-select";

// fix for typescript
const VueSelects = VueSelect as Component

export default defineComponent({
  name: "SelectKitThreadInput",
  components: { TButton, VueSelects },
  props: {
    options: {
      type: [] as PropType<Thread[]>,
      required: true
    },
    caption: String,
    placeholder: String,
    clearable: Boolean,
    searchable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Object as PropType<Thread>,
      default: null
    },
    show_color: {
      type: Boolean,
      default: true
    }
  },
  emits: ["edited", "new"],
  data() {
    return {
      val: {} as Thread,
      searchValue: "" as number | string
    }
  },
  watch: {
    value(newValue: Thread) {
      this.val = newValue
    }
  },
  mounted() {
    this.val = this.value
  },
  methods: {
    filter(options: Thread[], search: string) {
      return options.filter((thread) => thread.code.includes(search) || thread.name?.includes(search) )
    },
    onSelected(value: [Object, String]) {
      this.$emit('edited', value)
    },
    onCreateNewThread() {
      this.$emit("new", this.searchValue)
    },
    onSearchValueChanged(value: string | number) {
      this.searchValue = value
    }
  }
})
</script>

<template>
  <div class="select-input-container">
    <label class="select-input-label">{{ caption }}</label>
    <VueSelects
      v-model="val"
      class="select-input"
      :options="options"
      :clearable="clearable"
      :searchable="searchable"
      :filter="filter"
      placeholder="Выберите цвет"
      @search="onSearchValueChanged"
      @option:selected="onSelected($event)"
    >
      <template
        #option="{ name, color, code }"
        class="kit-thread-variant-option"
      >
        <div class="kit-thread-variant-option">
          <div class="kit-thread-variant-code">
            {{ code }}
          </div>
          <div
            v-if="show_color"
            class="kit-thread-variant-color-box"
            :style="`background-color: ${ color ?? 'rgba(0,0,0,0.001)'}`"
          />
          <div class="kit-thread-variant-name">
            {{ name }}
          </div>
        </div>
      </template>
      <template #selected-option="{ name, color, code }">
        <div class="kit-thread-variant-option">
          <div class="kit-thread-variant-code">
            {{ code }}
          </div>
          <div
            v-if="show_color"
            class="kit-thread-variant-color-box"
            :style="`background-color: ${ color ?? 'rgba(0,0,0,0.001)'}`"
          />
          <div class="kit-thread-variant-name">
            {{ name }}
          </div>
        </div>
      </template>
      <template #no-options="{ name, color, code }">
        <div class="new-thread-button">
          <TButton
            label="Новая нить"
            @click="onCreateNewThread"
          />
        </div>
      </template>
    </VueSelects>
  </div>
</template>

<style lang="scss">
@import "../variables";
.select-input-container {
  width: 100%;
}

.select-input-label {
  font-size: 12px;
}

.select-input {
  min-width: 150px;
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

.kit-thread-variant-color-box {
  outline: $input-field-border;
  border-radius: 5px;
  min-width: 10px;
  width: 10px;
  height: 10px;
  margin: 3px 6px 3px 6px;
}

.kit-thread-variant-option {
  display: flex;
  align-items: center;
}

.new-thread-button {
  display: flex;
  justify-content: center;
  width: 100%;
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