<script lang="ts">
import {defineComponent} from "vue";
import SelectInput from "@/ui/SelectInput.vue";
import TableData from "@/ui/TableData.vue";
import {useApi} from "@/stores/Api";
import DictionaryBlock from "../components/DictionaryBlock.vue";

export default defineComponent({
  name: "CanvasSizesPage",
  components: {DictionaryBlock, SelectInput, TableData},
  setup() { const api = useApi(); return { api } },
  methods: {
    onCreated() {
      this.api.canvasSizes.create(0)
    },
    onEdited(event: any) {
      console.log(event)
      this.api.canvasSizes.patch(event.uuid, event.value)
    }
  },
  async mounted() {
    await this.api.canvasSizes.get()
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page">
      <div class="dictionary-page">
        <DictionaryBlock
            :items="api.canvasSizes.items"
            data-type="number"
            edit-field="size"
            sort-field="created_at"
            table-label="Размер канвы"
            @created="onCreated"
            @edited="onEdited"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>