<script lang="ts">
import {defineComponent} from "vue";
import SelectInput from "@/ui/SelectInput.vue";
import TableData from "@/ui/TableData.vue";
import {useApi} from "@/stores/Api";
import DictionaryBlock from "../components/DictionaryBlock.vue";

export default defineComponent({
  name: "CanvasColorsPage",
  components: {DictionaryBlock, SelectInput, TableData},
  setup() { const api = useApi(); return { api } },
  async mounted() {
    await this.api.canvasColors.get()
  },
  methods: {
    onCreated(name: string) {
      this.api.canvasColors.create(name)
    },
    onEdited(event: any) {
      this.api.canvasColors.patch(event.uuid, event.value)
    }
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page">
      <div class="dictionary-page">
        <DictionaryBlock
          :items="api.canvasColors.items"
          edit-field="name"
          sort-field="created_at"
          table-label="Наименование цвета"
          @created="onCreated"
          @edited="onEdited"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>