<script lang="ts">
import {defineComponent} from "vue";
import SelectInput from "@/ui/SelectInput.vue";
import TableData from "@/ui/TableData.vue";
import {useApi} from "@/stores/Api";
import DictionaryBlock from "../components/DictionaryBlock.vue";
import {Palette} from "#/Types";

export default defineComponent({
  name: "ThreadsPage",
  components: {DictionaryBlock, SelectInput, TableData},
  setup() { const api = useApi(); return { api } },
  data() {
    return {
      palette: Object as Palette
    }
  },
  computed: {
    filteredThreads() {
      return this.api.threads.threads.filter(items => items.palette_uuid === this.palette.uuid)
    }
  },
  methods: {
    onCreated() {
      this.api.threads.create(this.palette.uuid, "0")
    },
    onEdited(event: any) {
      this.api.threads.patch(event.uuid, { name: event.value })
    },
    onPaletteChanged(palette: Palette) {
      this.palette = palette
    }
  },
  async mounted() {
    await this.api.palettes.get()
    this.palette = this.api.palettes.palettes[0]
    await this.api.threads.get()
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
        <!-- TODO ThreadTable -->
        <DictionaryBlock
            :items="filteredThreads"
            data-type="string"
            edit-field="name"
            sort-field="created_at"
            table-label="Нить"
            @created="onCreated"
            @edited="onEdited"
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