<script lang="ts">
import {defineComponent, PropType} from "vue";
import ModalWindow from "@/ui/ModalWindow.vue";
import SelectInput from "@/ui/SelectInput.vue";
import {Palette} from "#/Types";

export default defineComponent({
  name: "KitThreadColumn",
  components: {SelectInput, ModalWindow},
  emits: ['removed', 'added'],
  data() {
    return {
      hovered: false,
      modalVisible: false
    }
  },
  props: {
    name: String,
    show_removal: {
      type: Boolean,
      default: false
    },
    palettes: {
      type: [] as PropType<Palette[]>,
      required: true
    }
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
    columnAdded(event: Event) {
      const newPalette = event as Palette
      this.$emit('added', newPalette.uuid)
    }
  }
})
</script>

<template>
  <div class="kit-thread-column"
       @mouseover="hovered = true"
       @mouseleave="hovered = false">
    <div
        v-if="hovered && show_removal"
        class="remove-column-button"
        @click="$emit('removed')"
    >
      <i class="bx bx-trash"></i>
    </div>
    <div
        v-if="hovered"
        class="add-column-button"
        @click="showModal"
    >
      <i class='bx bx-plus'></i>
    </div>
    <label>{{ name }}</label>
    <ModalWindow
        v-model:show="modalVisible"
    >
      <SelectInput
          @edited="columnAdded($event)"
          class="palette-select"
          caption="Новая палитра"
          :value="undefined"
          label="name"
          :options="palettes"
      />
    </ModalWindow>
  </div>
</template>

<style scoped>

.kit-thread-column {
  text-align: center;
  position: relative;
}

.remove-column-button {
  position: absolute;
  z-index: 1;
  left: 3px;
  bottom: 15px;
}

.add-column-button {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: -4px;
}

.add-column-button:hover {
  cursor: pointer;
}

.bx-plus {
  font-size: 20px;
}

.remove-column-button:hover {
  cursor: pointer;
}

.palette-select {
  text-align: left;
  font-size: 12px;
  font-weight: normal;
}
</style>