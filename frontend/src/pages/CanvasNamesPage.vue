<script lang="ts">
import {defineComponent} from "vue";
import SelectInput from "@/ui/SelectInput.vue";
import TableData from "@/ui/TableData.vue";
import {useApi} from "@/stores/Api";
import DictionaryBlock from "../components/DictionaryBlock.vue";

export default defineComponent({
  name: "CanvasNamesPage",
  components: {DictionaryBlock, SelectInput, TableData},
  setup() { const api = useApi(); return { api } },
  async mounted() {
    await this.api.canvasNames.get()
  },
  methods: {
    onCreated() {
      this.api.canvasNames.create("")
    },
    onEdited(event: any) {
      console.log(event)
      this.api.canvasNames.patch(event.uuid, event.value)
    }
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page">
      <div class="dictionary-page">
        <DictionaryBlock
          :items="api.canvasNames.items"
          edit-field-type="string"
          edit-field="name"
          sort-field="created_at"
          table-label="Вид канвы"
          @created="onCreated"
          @edited="onEdited"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>