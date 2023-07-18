<script lang="ts">
import {defineComponent, PropType} from "vue";
import ModalWindow from "@/ui/ModalWindow.vue";
import SelectInput from "@/ui/SelectInput.vue";
import {Palette} from "#/Types";
import TButton from "@/ui/TButton.vue";

export default defineComponent({
  name: "KitThreadColumn",
  components: {TButton, SelectInput, ModalWindow},
  emits: ['removed', 'added'],
  data() {
    return {
      hovered: false,
      modalVisible: false,
      newSelectedPalette: Object as Palette,
      confirmDeletionModalVisible: false
    }
  },
  props: {
    name: String,
    uuid: String,
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
    hideModal() {
      this.modalVisible = false;
    },
    columnAdded() {
      if (this.newSelectedPalette.uuid) {
        this.$emit('added', this.newSelectedPalette.uuid)
        this.hideModal()
      }
    },
    showDeletionModal() {
      this.confirmDeletionModalVisible = true;
    },
    deleted() {
      this.$emit('removed', this.uuid)
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
        title="Удалить палитру"
        @click="showDeletionModal"
    >
      <i class="bx bx-trash"></i>
    </div>
    <div
        v-if="hovered"
        class="add-column-button"
        title="Добавить палитру"
        @click="showModal"
    >
      <i class='bx bx-plus'></i>
    </div>
    <label>{{ name }}</label>
    <ModalWindow
        v-model:show="modalVisible"
    >
      <SelectInput
          @edited="newSelectedPalette = $event"
          class="palette-select"
          caption="Новая палитра"
          :value="undefined"
          label="name"
          :options="palettes"
      />
      <TButton
          style="margin-top: 10px"
          label="Добавить палитру"
          @click="columnAdded"
      />
    </ModalWindow>
    <ModalWindow
        v-model:show="confirmDeletionModalVisible"
    >
      <div class="confirm-deletion-modal">
        <div class="confirm-deletion">
          <span>Действительно хотите удалить эту палитру?</span>
          <div
              class="palette-name"
              :title="name"
          >{{ name }}</div>
          <span>Внимание: данное действие <b>НЕОБРАТИМО!</b></span>
          <span>Все связанные с данной палитрой нити по набору будут также удалены.</span>
          <div class="delete-buttons">
            <TButton
                label="Да"
                @click="deleted"
                style="width: 50px"
            />
            <TButton
                label="Нет"
                @click="confirmDeletionModalVisible = false"
                style="width: 50px"
            />
          </div>
        </div>
      </div>
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
  top: 1px;
}

.remove-column-button:hover {
  cursor: pointer;
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

.palette-select {
  text-align: left;
  font-size: 12px;
  font-weight: normal;
}

.confirm-deletion-modal {
  display: flex;
  justify-content: center;
  font-weight: normal;
}

.confirm-deletion {
  display: flex;
  flex-direction: column;
}

.palette-name {
  align-self: center;
  margin-left: 0;
  width: 130px;
  max-height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.delete-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
</style>