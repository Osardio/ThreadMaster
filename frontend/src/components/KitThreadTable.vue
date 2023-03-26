<script lang="ts">
import {defineComponent} from "vue";
import {KitsThreadVariantShort, KitThreadTableColumn, KitThreadTableRow} from "#/ComplexTypes";
import {useComplexStore} from "@/stores/ComplexStore";
import KitThreadVariant from "@/components/KitThreadVariant.vue";
import TextInput from "@/ui/TextInput.vue";
import StringInput from "@/ui/StringInput.vue";

export default defineComponent({
  name: "KitThreadTable",
  components: {TextInput, KitThreadVariant, StringInput},
  setup() {
    const complexStore = useComplexStore()
    return { complexStore }
  },
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  computed: {
    columns_numbered(): KitThreadTableColumn[] {
      const numberColumn : KitThreadTableColumn = {
        kits_palettes: [
            {
              uuid: "0",
              order_number: 0,
              palette: { uuid: "0", name: "№" }
            }
        ]
      }
      const amountColumn : KitThreadTableColumn = {
        kits_palettes: [
          {
            uuid: "0",
            order_number: 0,
            palette: { uuid: "0", name: "Кол-во" }
          }
        ]
      }
      return [].concat([numberColumn, amountColumn], this.columns)
    },
    columns(): KitThreadTableColumn[] {
      return this.complexStore.kitThreadTableData.table_columns
    },
    rows(): KitThreadTableRow[] {
      return this.complexStore.kitThreadTableData.table_rows
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
  },
  async beforeCreate() {
    await this.complexStore.fetchKitThreadTableData(this.uuid)
  }
})
</script>

<template>
  <div class="table-container">
    <table v-if="complexStore.kitThreadTableData.kit_uuid !== undefined">
      <thead>
      <tr>
        <th
            v-for="column in columns_numbered"
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
        <td>
          {{ row.order_number }}
        </td>
        <td>
          <div class="thread-quantity">
            <StringInput
                :value="row.quantity"
                :show_arrows="false"
                :centered="true"
                type="number"
                style="width: 40px"
                @edited="complexStore.updateKitThread(row.uuid, { quantity: $event })"
            />
          </div>
        </td>
        <td
            v-for="kt_variant in sortedKitThreadVariants(row.kits_threads_variants)"
            :key="kt_variant.uuid"
        >
          <KitThreadVariant :value="kt_variant"/>
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

.thread-number {
  text-align: center;
}

.thread-quantity {
  display: flex;
  justify-content: center;
}
</style>