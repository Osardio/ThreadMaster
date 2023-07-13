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
  methods: {
    onCreated(name: string) {
      if (!this.manufacturers.find(el => el.name === name)) {
        this.api.manufacturers.create(name)
      }
    },
    onEdited(event: any) {
      this.api.manufacturers.patch(event.uuid, event.value)
    }
  },
  async mounted() {
    await this.api.manufacturers.get()
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page">
      <div class="dictionary-page">
        <TableData
            style="width: 260px"
            v-if="sortedManufacturers.length !== 0"
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