<script lang="ts">
import {defineComponent, PropType} from "vue";
import {KitThreadTableColumn, KitThreadTableRow} from "#/ComplexTypes";

export default defineComponent({
  name: "KitThreadTable",
  props: {
    rows: {
      type: Array as PropType<KitThreadTableRow[]>,
      default: () => []
    },
    columns: {
      type: Array as PropType<KitThreadTableColumn[]>,
      default: []
    }
  }
})
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th
            v-for="column in columns"
            :key="column.uuid"
        >
          <label>{{ column[column_name_field] }}</label>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="row in tableData"
          :key="row.uuid"
      >
        <td
            v-for="column in columns"
            :key="column.uuid"
        >
          {{ row[column[column_type_field]] }}
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

th , td  {
  border: $border;
  padding: 10px;
}

thead tr th:first-child {
  border-radius: $table-border-radius 0 0 0;
}
thead tr th:last-child {
  border-radius: 0 $table-border-radius 0 0;
}
tbody tr:last-child td:last-child {
  border-radius: 0 0 $table-border-radius 0;
}
tbody tr:last-child td:first-child {
  border-radius: 0 0 0 $table-border-radius;
}

th {
  background-color: #323232;
}

tr {
  background-color: $row-bg-color
}

td:hover {
  outline: 2px solid orange;
  outline-offset: -2px;
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