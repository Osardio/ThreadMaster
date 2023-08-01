<script lang="ts">
import {defineComponent} from "vue";
import SelectInput from "@/ui/SelectInput.vue";
import TableData from "@/ui/TableData.vue";
import {useApi} from "@/stores/Api";
import {Palette} from "#/Types";

export default defineComponent({
  name: "PalettesPage",
  components: {SelectInput, TableData},
  setup() { const api = useApi(); return { api } },
  computed: {
    items() : Palette[] {
      return this.api.palettes.palettes
    },
  },
  async mounted() {
    await this.api.palettes.get()
  },
  methods: {
    onCreated(name: string) {
      if (!this.items.find(el => el.name === name)) {
        this.api.palettes.create(name)
      }
    },
    onEdited(event: any) {
      this.api.palettes.patch(event.uuid, event.value)
    }
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page">
      <div class="dictionary-page">
        <TableData
          v-if="items"
          style="width: 260px"
          :table-data="items"
          edit-field="name"
          label="Палитры"
          @created="onCreated"
          @edited="onEdited"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>