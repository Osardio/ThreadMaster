<script lang="ts">
import {defineComponent} from "vue";
import SelectInput from "@/ui/SelectInput.vue";
import TableData from "@/ui/TableData.vue";
import {useApi} from "@/stores/Api";
import {Manufacturer} from "#/Types";
import Utils from "@/Utils";

export default defineComponent({
  name: "ManufacturersPage",
  components: {SelectInput, TableData},
  setup() { const api = useApi(); return { api } },
  computed: {
    manufacturers() : Manufacturer[] {
      return this.api.manufacturers.manufacturers
    },
    sortedManufacturers() {
      return Utils.sortArrayByField(this.manufacturers, "created_at")
    }
  },
  async mounted() {
    await this.api.manufacturers.get()
  },
  methods: {
    onCreated(name: string) {
      if (!this.manufacturers.find(el => el.name === name)) {
        this.api.manufacturers.create(name)
      }
    },
    onEdited(event: any) {
      this.api.manufacturers.patch(event.uuid, event.value)
    }
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page">
      <div class="dictionary-page">
        <TableData
          v-if="sortedManufacturers.length !== 0"
          style="width: 260px"
          :table-data="sortedManufacturers"
          edit-field="name"
          label="Производители"
          @created="onCreated"
          @edited="onEdited"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>