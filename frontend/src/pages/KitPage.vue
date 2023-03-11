<script lang="ts">
import {defineComponent} from "vue";
import {useKitStore} from "@/stores/KitStore";
import {useCommonStore} from "@/stores/CommonStore";
import {useManufacturerStore} from "@/stores/ManufacturerStore";
import {useSeriesStore} from "@/stores/SeriesStore";
import TextInput from "@/ui/TextInput.vue";
import SelectInput from "@/ui/SelectInput.vue";
import StringInput from "@/ui/StringInput.vue";
import ImageWrapper from "@/ui/ImageWrapper.vue";
import {Kit} from "#/Types.js";

export default defineComponent({
  name: "KitPage",
  components: {TextInput, SelectInput, StringInput, ImageWrapper},
  setup() {
    const kitStore = useKitStore()
    const commonStore = useCommonStore()
    const manufacturerStore = useManufacturerStore()
    const seriesStore = useSeriesStore()
    return { kitStore, commonStore, manufacturerStore, seriesStore }
  },
  data() {
    return {
      kit: {} as Kit
    }
  },
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  async mounted() {
    await this.kitStore.setActiveKitByUuid(this.uuid);
    this.kit = this.kitStore.kit
    await this.manufacturerStore.fetchManufacturers()
    await this.seriesStore.fetchSeries()
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
          @edited="kitStore.patchKit({ manufacturer_uuid: $event.uuid})"
      />
      <StringInput
          label="Код набора"
          class="kit-side-input"
          style="width: 80px"
          :value="kit.code"
          width="80px"
          @edited="kitStore.patchKit({ code: $event})"
      />
    </div>
    <SelectInput
        class="kit-side-input"
        caption="Серия"
        label="name"
        :options="seriesStore.series"
        :value="seriesStore.series.find(series => series.uuid === kit.series_uuid)"
        :clearable="false"
        width="140px"
        @edited="kitStore.patchKit({ series: $event.uuid})"
    />
    <StringInput
        label="Английское название"
        class="kit-side-input"
        :value="kit.name_en"
        @edited="kitStore.patchKit({ name_en: $event})"
    />
    <StringInput
        label="Русскоязычное название"
        class="kit-side-input"
        :value="kit.name_ru"
        @edited="kitStore.patchKit({ name_ru: $event})"
    />
    <div class="input-container">
      <StringInput
          label="Длина дизайна"
          class="kit-side-input"
          :value="kit.design_length" type="number"
          @edited="kitStore.patchKit({ design_length: $event})"
      />
      <StringInput
          label="Ширина дизайна"
          class="kit-side-input"
          :value="kit.design_width" type="number"
          @edited="kitStore.patchKit({ design_width: $event})"
      />
    </div>
    <div class="input-container">
      <StringInput
          label="Кол-во крестиков"
          class="kit-side-input"
          :value="kit.stitches_count" type="number"
          @edited="kitStore.patchKit({ stitches_count: $event})"
      />
      <StringInput
          label="Кол-во цветов"
          class="kit-side-input"
          :value="kit.colors_count" type="number"
          @edited="kitStore.patchKit({ colors_count: $event})"
      />
    </div>
    <StringInput
        label="Шaрмики"
        class="kit-side-input"
        :value="kit.charms"
        @edited="kitStore.patchKit({ charms: $event})"
    />
    <TextInput
        label="Комментарий"
        :value="kit.comment"
        @edited="kitStore.patchKit({ comment: $event})"
    />
  </div>
</template>

<style scoped>

</style>
