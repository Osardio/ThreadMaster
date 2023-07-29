<script lang="ts">
import {defineComponent, PropType} from "vue";
import TableComplex from "../ui/TableComplex.vue";
import {useApi} from "../stores/Api";
import {Palette} from "../../types/Types";

export default defineComponent({
  name: "DictionaryThreadTable",
  components: {TableComplex},
  props: {
    palette: {
      type: Object as PropType<Palette>,
      required: true
    }
  },
  setup() { const api = useApi(); return { api } },
  computed: {
    filteredThreads() {
      return this.api.threads.threads.filter(items => items.palette_uuid === this.palette.uuid)
    }
  },
  async mounted() {
    await this.api.threads.get()
  },
  methods: {
    onCreated(event: any) {
      console.log("onCreated", event)

    },
    onEdited(event: any) {
      console.log("onEdited", event)
      this.api.threads.patchObject(event)
    }
  }
})
</script>

<template>
  <TableComplex
    v-if="filteredThreads"
    :data="filteredThreads"
    :ignored-fields="['uuid','palette_uuid','created_at','updated_at']"
    :fields="['code', 'name', 'color']"
    sort-field="code"
    style="width: 500px"
    @created="onCreated"
    @edited="onEdited"
  />
</template>

<style scoped>

</style>