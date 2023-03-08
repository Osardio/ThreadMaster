<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Kit} from "#/Types";
import {useKitStore} from "@/stores/KitStore";
import StringInput from "@/ui/StringInput.vue";
import ImageWrapper from "@/ui/ImageWrapper.vue";

export default defineComponent({
  name: "KitSideInfo",
  components: {StringInput, ImageWrapper},
  setup() {
    const kitStore = useKitStore()
    return { kitStore }
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
  }
})
</script>

<template>
  <div class="kit-side-panel" v-if="kit.uuid">
    <ImageWrapper
        class="kit-side-preview"
        :src="`${this.kitStore.backendUrl}/image_preview?uuid=${this.kit.uuid}`"
        :alt="kit.code"
    />
    <StringInput
        label="Код набора"
        class="kit-side-input"
        :value="kit.code"
        @edited="onEdited({ code: $event})"
    />
    <StringInput
        label="Русскоязычное название"
        class="kit-side-input"
        :value="kit.name_ru"
        @edited="onEdited({ name_ru: $event})"
    />
    <StringInput
        label="Английское название"
        class="kit-side-input"
        :value="kit.name_en"
        @edited="onEdited({ name_en: $event})"
    />
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
    <StringInput
        label="Количество крестиков"
        class="kit-side-input"
        :value="kit.stitches_count" type="number"
        @edited="onEdited({ stitches_count: $event})"
    />
    <StringInput
        label="Количество цветов"
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
    <!-- TODO Серия -->
    <!-- TODO Производитель -->
    <!-- TODO Даты -->
    <!-- TODO Бисер -->
  </div>
</template>

<style scoped>
.kit-side-panel {
  display: flex;
  flex-direction: column;
}

.kit-side-preview {
  border: 1px solid #2B2B2B;
  width: 100%;
}

.kit-side-input {
  margin-bottom: 4px;
}

.kit-side-label {
  text-align: center;
}
</style>