<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "TableData",
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: []
    },
    column_name_field: {
      type: String,
      required: true
    },
    column_type_field: {
      type: String,
      required: true
    }
  },
  methods: {
    sort() {
      // TODO
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
$border: $input-field-border;
$row-bg-color: #4b4b4b;
$row-bg-color-even: #414141;
$row-bg-color-selected: #5f5f5f;
$table-border-radius: 4px;

.table-container > * {
  border-collapse: collapse;
}

th , td  {
  border: $border;
  padding: 8px;
}

.table-container thead tr th:first-child {
  border-radius: $table-border-radius 0 0 0;
}
.table-container thead tr th:last-child {
  border-radius: 0 $table-border-radius 0 0;
}
.table-container tbody tr:last-child td:last-child {
  border-radius: 0 0 $table-border-radius 0;
}
.table-container tbody tr:last-child td:first-child {
  border-radius: 0 0 0 $table-border-radius;
}




th {
  background-color: #323232;
}

tr {
  background-color: $row-bg-color
}

tr:nth-child(even) {
  background-color: $row-bg-color-even;
}

tr:hover {
  background-color: $row-bg-color-selected;
}
</style>