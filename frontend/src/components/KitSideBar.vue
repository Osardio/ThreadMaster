<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Kit} from "#/Types";
import {useKitStore} from "@/stores/KitStore";
import StringInput from "@/ui/StringInput.vue";
import ImageWrapper from "@/ui/ImageWrapper.vue";
import SelectInput from "@/ui/SelectInput.vue";
import {useCommonStore} from "@/stores/CommonStore";
import {useManufacturerStore} from "@/stores/ManufacturerStore";
import TextInput from "@/ui/TextInput.vue";

export default defineComponent({
  name: "KitSideBar",
  components: {TextInput, SelectInput, StringInput, ImageWrapper},
  setup() {
    const kitStore = useKitStore()
    const commonStore = useCommonStore()
    const manufacturerStore = useManufacturerStore()
    return { kitStore, commonStore, manufacturerStore }
  },
  props: {
    kit: {
      type: Object as PropType<Kit>,
      required: true,
      default: () => {}
    }
  },
  methods: {
    onEdited(value: object) {
      this.kitStore.patchKit(value)
    }
  },
  mounted() {
    this.manufacturerStore.fetchManufacturers()
  }
})
</script>

<template>
  <div class="kit-side-panel" v-if="kit.uuid">
    <ImageWrapper
        class="kit-side-preview"
        :src="`${this.commonStore.backendUrl}/image_preview?uuid=${this.kit.uuid}`"
        :alt="kit.code"
    />
    <div class="input-container">
      <SelectInput
          class="kit-side-input"
          style="width: 150px"
          caption="Производитель"
          label="name"
          :options="manufacturerStore.manufacturers"
          :value="manufacturerStore.manufacturers.find(man => man.uuid === kit.manufacturer_uuid)"
          :clearable="false"
          width="140px"
          @edited="onEdited({ manufacturer_uuid: $event.uuid})"
      />
      <StringInput
          label="Код набора"
          class="kit-side-input"
          style="width: 80px"
          :value="kit.code"
          width="80px"
          @edited="onEdited({ code: $event})"
      />
    </div>
    <StringInput
        label="Английское название"
        class="kit-side-input"
        :value="kit.name_en"
        @edited="onEdited({ name_en: $event})"
    />
    <StringInput
        label="Русскоязычное название"
        class="kit-side-input"
        :value="kit.name_ru"
        @edited="onEdited({ name_ru: $event})"
    />
    <div class="input-container">
      <StringInput
          label="Длина дизайна"
          class="kit-side-input"
          :value="kit.design_length" type="number"
          @edited="onEdited({ design_length: $event})"
      />
      <StringInput
          label="Ширина дизайна"
          class="kit-side-input"
          :value="kit.design_width" type="number"
          @edited="onEdited({ design_width: $event})"
      />
    </div>
    <div class="input-container">
      <StringInput
          label="Кол-во крестиков"
          class="kit-side-input"
          :value="kit.stitches_count" type="number"
          @edited="onEdited({ stitches_count: $event})"
      />
      <StringInput
          label="Кол-во цветов"
          class="kit-side-input"
          :value="kit.colors_count" type="number"
          @edited="onEdited({ colors_count: $event})"
      />
    </div>
    <StringInput
        label="Шaрмики"
        class="kit-side-input"
        :value="kit.charms"
        @edited="onEdited({ charms: $event})"
    />
    <TextInput
        label="Комментарий"
        style="bottom: 0"
        :value="kit.comment"
    />
    <!-- TODO Серия -->
    <!-- TODO Даты -->
    <!-- TODO Бисер -->
  </div>
</template>

<style scoped>
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

.kit-side-input {
  margin-bottom: 4px;
}

.input-container {
  display: flex;
  justify-content: space-between;
}

.input-container > div {
  width: 110px;
}
</style>