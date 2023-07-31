<script lang="ts">
import {defineComponent, PropType} from "vue";
import TableData from "../ui/TableData.vue";
import {DomainEntity} from "#/Types";
import Utils from "../Utils";

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
  computed: {
    sortedItems() {
      // @ts-ignore
      return Utils.sortArrayByField(this.items, this.sortField)
    }
  },
  methods: {
    onCreated(event: string) {
      //if (!this.items.find(el => el[this.editField as keyof DomainEntity] === event[this.editField])) {
      this.$emit("created", event)
      //}
    },
    onEdited(event: any) {
      this.$emit("edited", event)
    }
  },
})
</script>

<template>
  <TableData
    v-if="sortedItems"
    style="width: 260px"
    :table-data="sortedItems"
    :label="tableLabel"
    :edit-field="editField"
    :edit-field-type="editFieldType"
    @created="onCreated"
    @edited="onEdited"
  />
</template>

<style scoped>

</style>