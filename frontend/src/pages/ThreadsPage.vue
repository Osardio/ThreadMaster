<script lang="ts">
import {defineComponent} from "vue";
import SelectInput from "@/ui/SelectInput.vue";
import {useApi} from "@/stores/Api";
import {Palette} from "#/Types";
import DictionaryThreadTable from "@/components/DictionaryThreadTable.vue";

export default defineComponent({
  name: "ThreadsPage",
  components: {DictionaryThreadTable, SelectInput},
  setup() { const api = useApi(); return { api } },
  data() {
    return {
      palette: {} as Palette
    }
  },
  async mounted() {
    await this.api.palettes.get()
    this.palette = this.api.palettes.palettes[0]
  },
  methods: {
    onPaletteChanged(palette: Palette) {
      this.palette = palette
    }
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page">
      <div class="dictionary-page">
        <SelectInput
          class="dictionary-select"
          label="name"
          caption="Палитра"
          :value="palette"
          :options="api.palettes.palettes"
          :clearable="false"
          @edited="onPaletteChanged"
        />
        <DictionaryThreadTable
          :palette="palette"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dictionary-select {
  margin-bottom: 16px;
  width: 260px;
}
</style>