<script lang="ts">
import {defineComponent} from "vue";
import {KitPaletteShort, KitsThreadVariantShort, KitThreadTableRow} from "#/ComplexTypes";
import KitThreadVariant from "@/components/KitThreadVariant.vue";
import StringInput from "@/ui/StringInput.vue";
import TButton from "@/ui/TButton.vue";
import KitThreadRow from "@/components/KitThreadRow.vue";
import KitThreadColumn from "@/components/KitThreadColumn.vue";
import {useApi} from "@/stores/Api";
import ModalWindow from "@/ui/ModalWindow.vue";
import SelectInput from "@/ui/SelectInput.vue";
import {Palette, Thread} from "#/Types";
import Utils from "@/Utils";
import {ColorPicker} from "vue-color-kit";
import 'vue-color-kit/dist/vue-color-kit.css'

export default defineComponent({
  name: "KitThreadTable",
  components: {
    KitThreadColumn, KitThreadRow, TButton, KitThreadVariant,
    StringInput, SelectInput, ModalWindow, ColorPicker
  },
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  setup() { const api = useApi(); return { api } },
  data() {
    return {
      paletteCreationModalVisible: false,
      threadCreationModalVisible: false,
      threadCreationCode: "",
      threadCreationPaletteUuid: "",
      threadCreationColorName: "",
      threadCreationHexCode: "",
      threadCreationKitThreadVariant: ""
    }
  },
  computed: {
    columns(): KitPaletteShort[] {
      return this.api.complex.kitThreadTableData.table_columns[0].kits_palettes
    },
    rows(): KitThreadTableRow[] {
      return this.api.complex.kitThreadTableData.table_rows
    },
    filteredPalettes() : Palette[] {
      return this.api.palettes.palettes.filter(palette =>
          !this.columns.map(pal => pal.palette.uuid).includes(palette.uuid)
      )
    }
  },
  async beforeCreate() {
    await this.api.complex.getKitThreadTableData(this.uuid)
    await this.api.threads.get()
    await this.api.palettes.get()
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
    onCreateNewThread(event: any) {
      this.threadCreationKitThreadVariant = event.kits_thread_variant_uuid
      this.threadCreationCode = event.code
      this.threadCreationPaletteUuid = event.palette_uuid
      this.threadCreationColorName = ""
      this.threadCreationHexCode = "#000000"
      this.threadCreationModalVisible = true;
      // @ts-ignore
      this.$nextTick(() => { this.$refs.inputRef?.setFocus() })
    },
    async createThread() {
      const newThread: Partial<Thread> = {
        uuid: Utils.uuidv4(),
        palette_uuid: this.threadCreationPaletteUuid,
        code: this.threadCreationCode,
        name: this.threadCreationColorName,
        color: this.threadCreationHexCode,
      }
      await this.api.threads.create(newThread)
      await this.api.complex.updateKitThreadVariant(this.threadCreationKitThreadVariant, { thread_uuid: newThread.uuid })
      await this.api.complex.getKitThreadTableData(this.uuid)
      this.threadCreationModalVisible = false;
    },
    changeColor(event: any) {
      console.log("changeColor: ", event)
      this.threadCreationHexCode = event.hex
    }
  }
})
</script>

<template>
  <div class="kit-thread-table">
    <div
      class="heading-16"
      style="margin-bottom: 7px"
    >
      Таблица цветов
    </div>
    <div class="table-container">
      <table v-if="api.complex.kitThreadTableData.kit_uuid !== undefined">
        <thead>
          <tr v-if="columns.length !== 0">
            <th><label>№</label></th>
            <th
              v-for="column in columns"
              :key="column.uuid"
            >
              <KitThreadColumn
                :show_removal="columns.length > 1"
                :name="column.palette.name"
                :uuid="column.uuid"
                :palettes="filteredPalettes"
                style="min-width: 140px;"
                @added="api.complex.addKitPalette($event)"
                @removed="api.complex.removeKitPalette($event)"
              />
            </th>
            <th><label>Кол-во</label></th>
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
                class="palette-select"
                caption="Новая палитра"
                :value="undefined"
                label="name"
                :options="filteredPalettes"
                @edited="api.complex.addKitPalette($event.uuid)"
              />
            </ModalWindow>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            v-if="rows.length !== 0"
            :key="row.uuid"
          >
            <KitThreadRow
              :show_removal="row.order_number === rows.length"
              :number="row.order_number"
              @removed="api.complex.removeKitThread(row.uuid)"
            />
            <td
              v-for="col in columns"
              v-if="row.kits_threads_variants.length > 0"
              :key="col.uuid"
            >
              <div
                v-for="kt_variant in Array(sortedKitThreadVariants(row.kits_threads_variants).find(el => el.kit_palette.uuid === col.uuid))"
              >
                <KitThreadVariant
                  v-if="kt_variant"
                  :value="kt_variant"
                  :palette="kt_variant.kit_palette.palette"
                  :threads="api.threads.threads"
                  @edited="api.complex.updateKitThreadVariant(kt_variant.uuid, { thread_uuid: $event })"
                  @new="onCreateNewThread"
                />
                <div v-else />
              </div>
            </td>
            <td>
              <div class="thread-quantity">
                <StringInput
                    :value="row.quantity ?? NaN"
                    :show_arrows="false"
                    :centered="true"
                    type="number"
                    style="width: 40px"
                    @edited="api.complex.updateKitThread(row.uuid, { quantity: $event ?? NaN })"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td
              v-if="columns.length !== 0"
              :colspan="2 + columns.length"
            >
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
    <ModalWindow
      v-model:show="threadCreationModalVisible"
    >
      <div class="thread-creation-options-container">
        <div class="thread-creation-options">
          <StringInput
            label="Номер цвета"
            :value="threadCreationCode"
            type="string"
            style="width: 150px"
            @changed="threadCreationCode = $event"
          />
          <SelectInput
            disabled
            caption="Палитра"
            class="palette-select"
            :value="api.palettes.palettes.find(pl => pl.uuid === threadCreationPaletteUuid)"
            label="name"
            style="width: 150px"
            :options="Array(api.palettes.palettes.find(pl => pl.uuid === threadCreationPaletteUuid))"
          />
          <StringInput
            ref="inputRef"
            label="Название цвета"
            :value="threadCreationColorName"
            type="string"
            style="width: 150px"
            @changed="threadCreationColorName = $event"
          />
          <!--          <div class="kit-thread-variant-color-box"
                         :style="`background-color: ${ threadCreationHexCode ?? 'rgba(0,0,0,0.001)'}`"
                    >
                    </div>-->
          <StringInput
            label="Hex-код цвета"
            :value="threadCreationHexCode"
            type="string"
            style="width: 150px"
            @changed="threadCreationHexCode = $event"
          />
        </div>
        <ColorPicker
          class="color-picker"
          theme="dark"
          :color="threadCreationHexCode"
          :sucker-hide="true"
          style="width: 220px"
          @changeColor="changeColor"
        />
      </div>
      <TButton
        label="Добавить новую нить"
        @click="createThread"
      />
    </ModalWindow>
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

th {
  background-color: #323232;
}

tr {
  background-color: $row-bg-color
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

.thread-creation-options-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.thread-creation-options {
  display: flex;
  flex-direction: column;
  width: 160px;
  margin-bottom: 6px;
}

.thread-creation-options > * {
  margin-bottom: 4px;
}

.kit-thread-variant-color-box {
  outline: $input-field-border;
  border-radius: 5px;
  width: 10px;
  height: 10px;
  margin-bottom: 10px;
  align-self: end;
}

.color-picker {
  width: 320px;
}

.color-picker > * {
  box-sizing: unset;
}

</style>