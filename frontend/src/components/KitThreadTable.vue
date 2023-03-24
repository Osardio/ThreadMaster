<script lang="ts">
import {defineComponent, PropType} from "vue";
import {KitsThreadVariantShort, KitThreadTableColumn, KitThreadTableRow} from "#/ComplexTypes";

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
  },
  methods: {
    sortedKitThreadVariants(array: KitsThreadVariantShort[]): KitsThreadVariantShort[] {
      return array.sort(function (a: KitsThreadVariantShort, b: KitsThreadVariantShort) {
        if (a.kit_palette.order_number < b.kit_palette.order_number) return 1
        if (a.kit_palette.order_number > b.kit_palette.order_number) return -1
        return 0
      })
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
            :key="column.kits_palettes[0].uuid"
        >
          <label>{{ column.kits_palettes[0].palette.name }}</label>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="row in rows"
          :key="row.uuid"
      >
        <td
            v-for="kt_variant in sortedKitThreadVariants(row.kits_threads_variants)"
            :key="kt_variant.uuid"
        >
          {{ kt_variant.thread.code }}
          {{ kt_variant.thread.name }}
          {{ kt_variant.thread.color }}
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