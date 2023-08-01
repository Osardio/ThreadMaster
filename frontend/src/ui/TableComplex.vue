<script lang="ts">
import {DomainEntity} from "#/Types";
import {defineComponent, PropType} from "vue";
import StringInput from "@/ui/StringInput.vue";
import TButton from "@/ui/TButton.vue";
import Utils from "../Utils";
import ColorInput from "@/ui/ColorInput.vue";

export default defineComponent({
  name: "TableComplex",
  components: {ColorInput, StringInput, TButton},
  props: {
    data: {
      type: [] as PropType<DomainEntity[]>,
      required: true
    },
    ignoredFields: {
      type: [] as PropType<string[]>,
      required: false
    },
    fields: {
      type: [] as PropType<string[]>,
      required: false
    },
    sortField: {
      type: String,
      required: false
    }
  },
  emits: ["edited", "created"],
  computed: {
    sortedData() {
      // @ts-ignore
      return Utils.sortArrayByField(this.data, this.sortField)
    },
    filteredFields() : string[] | undefined {
      if (this.data && this.data[0]) {
        if (this.ignoredFields) {
          console.log("keys", Object.keys(this.data[0]))
          console.log("ignored", this.ignoredFields)
          return Object.keys(this.data[0]).filter((key) => !this.ignoredFields?.includes(key))
        } else {
          return Object.keys(this.data[0])
        }
      }
      return undefined
    },
    tableFields() : string[] | undefined {
      if (this.fields) {
        return this.fields
      } else {
        return this.filteredFields
      }
    }
  },
  methods: {
    onCreated() {
      this.$emit("created", "")
    },
    onEdited(uuid: string, field: string, value: any) {
      this.$emit("edited", { uuid: uuid, [field]: value } )
    },
    getFieldLabel(fieldName: string): string {
      return Utils.getFieldLabel(fieldName)
    },
    getFieldType(fieldName: string): string {
      return Utils.getFieldType(fieldName)
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
            v-for="value in tableFields"
            :key="value"
          >
            <label>{{ getFieldLabel(value) }}</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="entity in sortedData"
          :key="entity.uuid"
        >
          <td
            v-for="(field) in tableFields"
            :key="field"
          >
            <!--
              <ColorInput v-if="getFieldType(field) === 'color'"/>
            -->
            <StringInput
              v-if="getFieldType(field) === 'number'"
              :value="entity[field as keyof typeof entity]"
              type="number"
              @edited="onEdited(entity.uuid, field, $event)"
            />
            <StringInput
              v-else
              :value="entity[field as keyof typeof entity]"
              type="string"
              @edited="onEdited(entity.uuid, field, $event)"
            />
          </td>
        </tr>
        <tr>
          <td :colspan="2 + tableFields!.length">
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