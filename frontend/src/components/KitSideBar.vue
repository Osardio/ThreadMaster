<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Kit} from "#/Types";
import StringInput from "@/ui/StringInput.vue";
import ImageWrapper from "@/ui/ImageWrapper.vue";
import SelectInput from "@/ui/SelectInput.vue";
import TextInput from "@/ui/TextInput.vue";
import {useApi} from "@/stores/Api";
import ModalWindow from "@/ui/ModalWindow.vue";
import TButton from "@/ui/TButton.vue";

export default defineComponent({
  name: "KitSideBar",
  components: {TextInput, SelectInput, StringInput, ImageWrapper, ModalWindow, TButton},
  setup() { const api = useApi(); return { api } },
  data() {
    return {
      previewHovered: false,
      kitRemovalModalModalVisible: false
    }
  },
  props: {
    kit: {
      type: Object as PropType<Kit>,
      required: true,
      default: () => {}
    },
    draft: {
      type: Boolean,
      required: false,
      default: false
    },
    removalAvailable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    previewLink() {
      return `${this.api.common.backendUrl}/image_preview?uuid=${this.kit.uuid}`
    }
  },
  methods: {
    showKitRemovalModal() {
      this.kitRemovalModalModalVisible = true;
    },
    async deleteKit() {
      await this.api.kits.delete(this.kit.uuid)
      this.$router.push(`/`)
    }
  },
  async mounted() {
    await this.api.manufacturers.get()
    await this.api.series.get()
  }
})
</script>

<template>
  <div class="kit-side-panel" v-if="kit.uuid">
    <div v-if="!draft"
         @mouseover="previewHovered = true"
         @mouseleave="previewHovered = false"
    >
      <div
          v-if="previewHovered && removalAvailable"
          class="kit-removal-button"
          title="Удалить набор"
          @click="showKitRemovalModal"
      >
        <i class="bx bx-trash"/>
      </div>
      <ImageWrapper
          class="kit-side-preview"
          :src="previewLink"
          :alt="kit.code ?? ''"
          style="min-height: 100px; font-size: 150px; display: flex; justify-content: center"
      />
    </div>
    <div class="draft-label" v-else>
      Заполните обязательные поля:
    </div>
    <ModalWindow
        v-model:show="kitRemovalModalModalVisible"
    >
      <div class="confirm-deletion-modal">
        <div class="confirm-deletion">
          <span>Действительно хотите удалить данный набор?</span>
          <div
              class="kit-name"
              :title="`${kit.code} ${kit.name_en}`"
              style="margin-left: 0"
          >{{ kit.code }} {{ kit.name_en }}</div>
          <span>Внимание: данное действие <b>НЕОБРАТИМО!</b></span>
          <div class="delete-buttons">
            <TButton
                label="Да"
                @click="deleteKit"
                style="width: 50px"
            />
            <TButton
                label="Нет"
                @click="kitRemovalModalModalVisible = false"
                style="width: 50px"
            />
          </div>
        </div>
      </div>
    </ModalWindow>
    <div class="input-container">
      <SelectInput
          class="kit-side-input"
          style="width: 150px"
          caption="Производитель"
          label="name"
          :options="api.manufacturers.manufacturers"
          :value="api.manufacturers.manufacturers.find(man => man.uuid === kit.manufacturer_uuid) ?? {}"
          :clearable="false"
          width="140px"
          @edited="api.kits.patch({ manufacturer_uuid: $event.uuid})"
      />
      <StringInput
          label="Код набора"
          class="kit-side-input"
          style="width: 80px"
          :value="kit.code ?? ''"
          width="80px"
          @edited="api.kits.patch({ code: $event })"
      />
    </div>
    <SelectInput
        class="kit-side-input"
        caption="Серия"
        label="name"
        :options="api.series.items"
        :value="api.series.items.find(series => series.uuid === kit.series_uuid) ?? {}"
        :clearable="false"
        width="140px"
        @edited="api.kits.patch({ series_uuid: $event.uuid })"
    />
    <StringInput
        label="Английское название"
        class="kit-side-input"
        :value="kit.name_en ?? ''"
        @edited="api.kits.patch({ name_en: $event })"
    />
    <StringInput
        v-if="!draft"
        label="Русскоязычное название"
        class="kit-side-input"
        :value="kit.name_ru ?? ''"
        @edited="api.kits.patch({ name_ru: $event })"
    />
    <div v-if="!draft" class="input-container">
      <StringInput
          label="Длина дизайна"
          class="kit-side-input"
          :value="kit.design_length ?? 0"
          type="number"
          @edited="api.kits.patch({ design_length: $event })"
      />
      <StringInput
          label="Ширина дизайна"
          class="kit-side-input"
          :value="kit.design_width ?? 0"
          type="number"
          @edited="api.kits.patch({ design_width: $event })"
      />
    </div>
    <div v-if="!draft" class="input-container">
      <StringInput
          label="Кол-во крестиков"
          class="kit-side-input"
          :value="kit.stitches_count ?? 0"
          type="number"
          @edited="api.kits.patch({ stitches_count: $event })"
      />
      <StringInput
          label="Кол-во цветов"
          class="kit-side-input"
          :value="kit.colors_count ?? 0"
          type="number"
          @edited="api.kits.patch({ colors_count: $event })"
      />
    </div>
    <StringInput
        v-if="!draft"
        label="Шaрмики"
        class="kit-side-input"
        :value="kit.charms ?? ''"
        @edited="api.kits.patch({ charms: $event })"
    />
    <TextInput
        v-if="!draft"
        label="Комментарий"
        :value="kit.comment ?? ''"
        @edited="api.kits.patch({ comment: $event })"
    />
  </div>
</template>

<style scoped lang="scss">
@import "../global";

.draft-label {
  margin-bottom: 4px;
}

.kit-side-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 1px;
}

::-webkit-scrollbar {
  display: none;
}

.kit-side-preview {
  border: 1px solid #2B2B2B;
  margin-bottom: 4px;
  width: 100%;
}

.kit-removal-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: 1;
  right: 26px;
  top: 26px;
  border-radius: 4px;
}

.kit-removal-button > * {
  font-size: 36px;
  color: red;
}

.kit-removal-button:hover {
  background: rgba(86,86,86,0.8);
  cursor: pointer;
}

.kit-side-input {
  margin-bottom: 4px;
}

.confirm-deletion-modal {
  display: flex;
  justify-content: center;
}

.confirm-deletion {
  display: flex;
  flex-direction: column;
}

.kit-name {
  margin-left: 4px;
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