<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Kit} from "#/Types";
import StringInput from "@/ui/StringInput.vue";
import ImageWrapper from "@/ui/ImageWrapper.vue";
import SelectInput from "@/ui/SelectInput.vue";
import TextInput from "@/ui/TextInput.vue";
import {useApi} from "@/stores/Api";
import BooleanInput from "@/ui/BooleanInput.vue";

export default defineComponent({
  name: "KitInfoBlock",
  components: {BooleanInput, TextInput, SelectInput, StringInput, ImageWrapper},
  setup() { const api = useApi(); return { api } },
  props: {
    kit: {
      type: Object as PropType<Kit>,
      required: true,
      default: () => {}
    }
  },
  computed: {
    canvas() {
      return this.api.canvases.canvas
    }
  },
  async mounted() {
    await this.api.canvases.get(this.kit.uuid)
  }
})
</script>

<template>
  <div class="kit-info-block">
    <div class="canvas-fields">
      <div class="heading-16">Информация о наборе</div>
      <SelectInput
          style="width: 150px"
          caption="Канва"
          label="name"
          :options="api.canvases.canvasNames"
          :value="api.canvases.canvasNames.find(name => name.uuid === canvas.canvas_name_uuid) ?? {}"
          :clearable="false"
          width="140px"
          @edited="api.kits.patch({ manufacturer_uuid: $event.uuid})"
      />
      <SelectInput
          style="width: 150px"
          caption="Размер канвы"
          label="size"
          :options="api.canvases.canvasSizes"
          :value="api.canvases.canvasSizes.find(size => size.uuid === canvas.canvas_size_uuid) ?? {}"
          :clearable="false"
          width="140px"
          @edited="api.kits.patch({ manufacturer_uuid: $event.uuid})"
      />
      <SelectInput
          style="width: 150px"
          caption="Цвет канвы"
          label="name"
          :options="api.canvases.canvasColors"
          :value="api.canvases.canvasColors.find(color => color.uuid === canvas.canvas_color_uuid) ?? {}"
          :clearable="false"
          width="140px"
          @edited="api.kits.patch({ manufacturer_uuid: $event.uuid})"
      />
      <BooleanInput
          caption="Наличие бисера"
          :selected="kit.beads_available"
          @toggled="api.kits.patch({ beads_available: $event })"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import "../global";
.kit-info-block {
  display: flex;
}

.canvas-fields > * {
  margin-bottom: 4px;
}
</style>