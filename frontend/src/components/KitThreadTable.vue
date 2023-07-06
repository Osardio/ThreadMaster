<script lang="ts">
import {defineComponent} from "vue";
import {KitsThreadVariantShort, KitThreadTableColumn, KitThreadTableRow} from "#/ComplexTypes";
import KitThreadVariant from "@/components/KitThreadVariant.vue";
import TextInput from "@/ui/TextInput.vue";
import StringInput from "@/ui/StringInput.vue";
import TButton from "@/ui/TButton.vue";
import KitThreadRow from "@/components/KitThreadRow.vue";
import KitThreadColumn from "@/components/KitThreadColumn.vue";
import {useApi} from "@/stores/Api";
import ModalWindow from "@/ui/ModalWindow.vue";
import SelectInput from "@/ui/SelectInput.vue";
import {Palette} from "#/Types";

export default defineComponent({
  name: "KitThreadTable",
  components: {KitThreadColumn, KitThreadRow, TButton, TextInput, KitThreadVariant, StringInput, SelectInput, ModalWindow},
  setup() { const api = useApi(); return { api } },
  data() {
    return {
      paletteCreationModalVisible: false
    }
  },
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  computed: {
    columns(): KitThreadTableColumn[] {
      return this.api.complex.kitThreadTableData.table_columns
    },
    rows(): KitThreadTableRow[] {
      return this.api.complex.kitThreadTableData.table_rows
    },
    filteredPalettes() : Palette[] {
      return this.api.palettes.palettes.filter(palette =>
          !this.columns[0].kits_palettes.map(pal => pal.palette.uuid).includes(palette.uuid)
      )
    }
  },
  methods: {
    sortedKitThreadVariants(array: KitsThreadVariantShort[]): KitsThreadVariantShort[] {
      // TODO Use utils sort function
      return array.sort(function (a: KitsThreadVariantShort, b: KitsThreadVariantShort) {
        if (a.kit_palette.order_number < b.kit_palette.order_number) return 1
        if (a.kit_palette.order_number > b.kit_palette.order_number) return -1
        return 0
      })
    },
    showPaletteCreationModal() {
      this.paletteCreationModalVisible = true
    },
  },
  async beforeCreate() {
    await this.api.complex.getKitThreadTableData(this.uuid)
    await this.api.threads.get()
    await this.api.palettes.get()
  }
})
</script>

<template>
  <div class="kit-thread-table">
    <div class="heading-16" style="margin-bottom: 7px">Таблица цветов</div>
    <div class="table-container">
    <table v-if="api.complex.kitThreadTableData.kit_uuid !== undefined">
      <thead>
      <tr v-if="columns[0].kits_palettes.length !== 0">
        <th><label>№</label></th>
        <th><label>Кол-во</label></th>
        <th
            v-for="(column, index) in columns"
            :key="column.kits_palettes[0].uuid"
        >
          <KitThreadColumn
              :show_removal="index !== (columns.length - 1)"
              :name="column.kits_palettes[0].palette.name"
              :palettes="filteredPalettes"
              @added="api.complex.addKitPalette($event)"
              style="min-width: 140px;"
          />
        </th>
      </tr>
      <tr v-else>
        <TButton
            label="Добавить палитру"
            @click="showPaletteCreationModal"
        />
        <ModalWindow
            v-model:show="paletteCreationModalVisible"
        >
          <SelectInput
              @edited="api.complex.addKitPalette($event.uuid)"
              class="palette-select"
              caption="Новая палитра"
              :value="undefined"
              label="name"
              :options="filteredPalettes"
          />
        </ModalWindow>
      </tr>
      </thead>
      <tbody>
      <tr v-if="rows.length !== 0"
          v-for="row in rows"
          :key="row.uuid"
      >
        <KitThreadRow
            :show_removal="row.order_number === rows.length"
            :number="row.order_number"
            @removed="api.complex.removeKitThread(row.uuid)"
        />
        <td>
          <div class="thread-quantity">
            <StringInput
                :value="row.quantity ?? 0"
                :show_arrows="false"
                :centered="true"
                type="number"
                style="width: 40px"
                @edited="api.complex.updateKitThread(row.uuid, { quantity: $event })"
            />
          </div>
        </td>
        <td
            v-if="row.kits_threads_variants.length > 0"
            v-for="kt_variant in sortedKitThreadVariants(row.kits_threads_variants)"
            :key="kt_variant.uuid"
        >
          <KitThreadVariant
              :value="kt_variant"
              :palette="kt_variant.kit_palette.palette"
              :threads="api.threads.threads"
              @edited="api.complex.updateKitThreadVariant(kt_variant.uuid, { thread_uuid: $event })"
          />
        </td>
<!--        <td v-else ref="tdCell">Выбрать цвет
          <KitThreadVariant
              :palette="columns[this.$refs.tdCell.getAttribute('cellIndex')].kits_palettes[0].palette"
              :threads="threadStore.threads"
              @created="complexStore.createKitThreadVariant($event)"
          />
        </td>-->
      </tr>
      <tr>
        <td :colspan="2 + columns.length" v-if="columns[0].kits_palettes.length !== 0">
          <div class="add-thread-row">
           <TButton

             label="Добавить цвет"
             @click="api.complex.addKitThread()"
           />
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../variables";
@import "../global";

.table-container > * {
  border-collapse: collapse;
}

.table-container {
  outline-offset: -1px;
}

th, td  {
  border: $border;
  padding: 10px;
}

/*thead tr th:first-child {
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
}*/

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
.add-thread-row {
  display: flex;
  justify-content: center;
}
</style>