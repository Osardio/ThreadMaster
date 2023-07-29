<script lang="ts">
import {defineComponent} from "vue";
import SelectInput from "@/ui/SelectInput.vue";
import TableData from "@/ui/TableData.vue";
import {useApi} from "@/stores/Api";
import DictionaryBlock from "../components/DictionaryBlock.vue";
import {Manufacturer} from "#/Types";

export default defineComponent({
  name: "SeriesPage",
  components: {DictionaryBlock, SelectInput, TableData},
  setup() { const api = useApi(); return { api } },
  data() {
    return {
      manufacturer: {} as Manufacturer
    }
  },
  computed: {
    filteredSeries() {
      return this.api.series.items.filter(series => series.manufacturer_uuid === this.manufacturer.uuid)
    }
  },
  async mounted() {
    await this.api.manufacturers.get()
    this.manufacturer = this.api.manufacturers.manufacturers[0]
    await this.api.series.get()
  },
  methods: {
    onCreated() {
      this.api.series.create(this.manufacturer.uuid)
    },
    onEdited(event: any) {
      this.api.series.patch(event.uuid, event.value)
    },
    onManufacturerChanged(manufacturer: Manufacturer) {
      this.manufacturer = manufacturer
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
          caption="Производитель"
          :value="manufacturer"
          :options="api.manufacturers.manufacturers"
          :clearable="false"
          @edited="onManufacturerChanged"
        />
        <DictionaryBlock
          :items="filteredSeries"
          data-type="string"
          edit-field="name"
          sort-field="created_at"
          table-label="Серия"
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