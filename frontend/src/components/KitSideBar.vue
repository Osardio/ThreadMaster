<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Kit} from "#/Types";
import StringInput from "@/ui/StringInput.vue";
import ImageWrapper from "@/ui/ImageWrapper.vue";
import SelectInput from "@/ui/SelectInput.vue";
import TextInput from "@/ui/TextInput.vue";
import {useApi} from "@/stores/Api";

export default defineComponent({
  name: "KitSideBar",
  components: {TextInput, SelectInput, StringInput, ImageWrapper},
  setup() { const api = useApi(); return { api } },
  props: {
    kit: {
      type: Object as PropType<Kit>,
      required: true,
      default: () => {}
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
    <ImageWrapper
        class="kit-side-preview"
        :src="`${api.common.backendUrl}/image_preview?uuid=${kit.uuid}`"
        :alt="kit.code ?? ''"
    />
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
          @edited="api.kits.patch({ code: $event})"
      />
    </div>
    <SelectInput
        class="kit-side-input"
        caption="Серия"
        label="name"
        :options="api.series.series"
        :value="api.series.series.find(series => series.uuid === kit.series_uuid) ?? {}"
        :clearable="false"
        width="140px"
        @edited="api.kits.patch({ series: $event.uuid })"
    />
    <StringInput
        label="Английское название"
        class="kit-side-input"
        :value="kit.name_en ?? ''"
        @edited="api.kits.patch({ name_en: $event })"
    />
    <StringInput
        label="Русскоязычное название"
        class="kit-side-input"
        :value="kit.name_ru ?? ''"
        @edited="api.kits.patch({ name_ru: $event })"
    />
    <div class="input-container">
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
    <div class="input-container">
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
        label="Шaрмики"
        class="kit-side-input"
        :value="kit.charms ?? ''"
        @edited="api.kits.patch({ charms: $event })"
    />
    <TextInput
        label="Комментарий"
        :value="kit.comment ?? ''"
        @edited="api.kits.patch({ comment: $event })"
    />
  </div>
</template>

<style scoped lang="scss">
@import "../global";

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

</style>