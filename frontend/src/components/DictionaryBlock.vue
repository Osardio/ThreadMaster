<script lang="ts">
import {defineComponent, PropType} from "vue";
import SelectInput from "../ui/SelectInput.vue";
import TableData from "../ui/TableData.vue";
import {DomainEntity} from "#/Types";
import Utils from "../Utils";

export default defineComponent({
  name: "DictionaryBlock",
  components: {SelectInput, TableData},
  emits: ["created", "edited"],
  props: {
    items: {
      type: Object as PropType<DomainEntity[]>,
      required: true
    },
    sortField: {
      type: String,
      required: true
    },
    editField: {
      type: String as PropType<keyof DomainEntity>,
      required: true
    },
    editFieldType: {
      type: String,
      default: "string"
    },
    tableLabel: {
      type: String,
      required: true
    },
  },
  computed: {
    sortedItems() {
      // @ts-ignore
      return Utils.sortArrayByField(this.items, this.sortField)
    }
  },
  methods: {
    onCreated(event: string) {
      if (!this.items.find(el => el[this.editField] === event[this.editField])) {
        this.$emit("created", event)
      }
    },
    onEdited(event: any) {
      this.$emit("edited", event)
    }
  },
})
</script>

<template>
  <TableData
      style="width: 260px"
      v-if="sortedItems"
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