<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Canvas, Kit} from "#/Types";
import SelectInput from "@/ui/SelectInput.vue";
import {useApi} from "@/stores/Api";
import BooleanInput from "@/ui/BooleanInput.vue";
import TButton from "@/ui/TButton.vue";

export default defineComponent({
  name: "KitInfoBlock",
  components: {BooleanInput, SelectInput, TButton},
  props: {
    kit: {
      type: Object as PropType<Kit>,
      required: true,
      default: () => {}
    }
  },
  setup() { const api = useApi(); return { api } },
  computed: {
    canvas() : Canvas | null {
      return this.api.canvases.canvas
    },
    draftCanvas() : Boolean {
      return this.canvas === null
    }
  },
  watch: {
    async kit() {
      await this.api.canvases.get(this.kit.uuid)
    }
  },
  async mounted() {
    await this.api.canvases.get(this.kit.uuid)
  },
  methods: {
    async addCanvas() {
      await this.api.canvases.create(this.kit.uuid)
    }
  }
})
</script>

<template>
  <div class="kit-info-block">
    <div class="heading-16">
      Информация о наборе
    </div>
    <div
      v-if="!draftCanvas"
      class="canvas-fields"
    >
      <SelectInput
        style="width: 150px"
        caption="Канва"
        label="name"
        :options="api.canvases.canvasNames"
        :value="api.canvases.canvasNames.find(name => name.uuid === canvas?.canvas_name_uuid)"
        :clearable="false"
        width="140px"
        @edited="api.canvases.patch({ canvas_name_uuid: $event.uuid })"
      />
      <SelectInput
        style="width: 150px"
        caption="Размер канвы"
        label="size"
        :options="api.canvases.canvasSizes"
        :value="api.canvases.canvasSizes.find(size => size.uuid === canvas?.canvas_size_uuid)"
        :clearable="false"
        width="140px"
        @edited="api.canvases.patch({ canvas_size_uuid: $event.uuid })"
      />
      <SelectInput
        style="width: 150px"
        caption="Цвет канвы"
        label="name"
        :options="api.canvases.canvasColors"
        :value="api.canvases.canvasColors.find(color => color.uuid === canvas?.canvas_color_uuid)"
        :clearable="false"
        width="140px"
        @edited="api.canvases.patch({ canvas_color_uuid: $event.uuid })"
      />
      <BooleanInput
        caption="Наличие бисера"
        :selected="kit.beads_available ?? false"
        @toggled="api.kits.patch({ beads_available: $event })"
      />
    </div>
    <div
      v-else
      class="canvas-fields"
    >
      <TButton
        style="margin-top: 2px"
        label="Добавить канву"
        @click="addCanvas"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import "../global";
.kit-info-block {
  display: flex;
  flex-direction: column;
}

.canvas-fields > * {
  margin-bottom: 4px;
}
</style>