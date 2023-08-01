<script lang="ts">
import {DomainEntity} from "#/Types";
import {defineComponent, PropType} from "vue";
import StringInput from "@/ui/StringInput.vue";
import TButton from "@/ui/TButton.vue";
import Utils from "@/Utils";

export default defineComponent({
  name: "TableData",
  components: {StringInput, TButton},
  props: {
    tableData: {
      type: [] as PropType<DomainEntity[]>,
      default: [],
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    editFieldType: {
      type: String,
      default: "string"
    }
  },
  computed: {
    sortedData() {
      return Utils.sortArrayByField(this.tableData, this.editField as keyof DomainEntity)
    }
  },
  emits: ["edited", "created"],
  methods: {
    onCreated() {
      this.$emit("created", "")
    },
    onEdited(uuid: string, value: any) {
      this.$emit("edited", { uuid: uuid, value: value } )
    },
   }
})
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>
            <label>{{ label }}</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in sortedData"
          :key="row.uuid"
        >
          <td>
            <StringInput
              :value="row[editField as keyof typeof row]"
              :type="editFieldType"
              @edited="onEdited(row.uuid, $event)"
            />
          </td>
        </tr>
        <tr>
          <td>
            <div class="add-row">
              <TButton
                label="Добавить"
                @click="onCreated"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
@import "../variables";

.table-container > * {
  border-collapse: collapse;
}

.table-container {
  border-radius: 4px;
  overflow: hidden;
  outline: $border;
  outline-offset: -1px;
}

table {
  width: 100%;
}

th , td  {
  border: $border;
  padding: 10px;
}

th {
  background-color: #323232;
}

tr {
  background-color: $row-bg-color;
}

tr:nth-child(even) {
  background-color: $row-bg-color-even;
}

tbody tr td:first-child {
  text-align: right;
}

tr:hover {
  background-color: $row-bg-color-selected;
}
</style>