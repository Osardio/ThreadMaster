<script lang="ts">
import {defineComponent, PropType} from "vue";
import TableData from "../ui/TableData.vue";
import {DomainEntity} from "#/Types";

export default defineComponent({
  name: "DictionaryBlock",
  components: {TableData},
  props: {
    items: {
      type: [] as PropType<DomainEntity[]>,
      required: true
    },
    sortField: {
      type: String,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    editFieldType: {
      type: String,
      default: "string"
    },
    tableLabel: {
      type: String,
      required: true
    }
  },
  emits: ["created", "edited"],
  methods: {
    onCreated(event: string) {
      this.$emit("created", event)
    },
    onEdited(event: any) {
      this.$emit("edited", event)
    }
  },
})
</script>

<template>
  <TableData
    v-if="items"
    style="width: 260px"
    :table-data="items"
    :label="tableLabel"
    :edit-field="editField"
    :edit-field-type="editFieldType"
    @created="onCreated"
    @edited="onEdited"
  />
</template>

<style scoped>

</style>