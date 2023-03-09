<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Kit} from "#/Types";
import {useKitStore} from "@/stores/KitStore";
import StringInput from "@/ui/StringInput.vue";
import ImageWrapper from "@/ui/ImageWrapper.vue";
import SelectInput from "@/ui/SelectInput.vue";
import {useCommonStore} from "@/stores/CommonStore";
import {useManufacturerStore} from "@/stores/ManufacturerStore";

export default defineComponent({
  name: "KitSideBar",
  components: {SelectInput, StringInput, ImageWrapper},
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
      this.kitStore.updateKit(value)
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
    <SelectInput
        class="kit-side-input"
        caption="Производитель"
        label="name"
        :options="manufacturerStore.manufacturers"
        :value="manufacturerStore.manufacturers.find(man => man.uuid === kit.manufacturer_uuid)"
        :clearable="false"
        @edited="onEdited({ manufacturer_uuid: $event.uuid})"
    />
    <StringInput
        label="Код набора"
        class="kit-side-input"
        :value="kit.code"
        @edited="onEdited({ code: $event})"
    />
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
    <div class="numeric-container">
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
    <StringInput
        label="Шaрмики"
        class="kit-side-input"
        :value="kit.charms"
        @edited="onEdited({ charms: $event})"
    />
<!--    <input width="50px" height="50px" type="checkbox">-->
    <!-- TODO Серия -->
    <!-- TODO Производитель -->
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

.numeric-container {
  display: flex;
  justify-content: space-between;
}

.numeric-container > div {
  width: 110px;
}
</style>