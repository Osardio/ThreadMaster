import {defineStore} from "pinia";
import Rest from "@/Rest";
import {KitThreadTableData} from "#/ComplexTypes";
import {EntityType} from "#/Types";

export const useComplexStore = defineStore("complexStore",{
  state: () => {
    return {
      kitThreadTableData: {} as KitThreadTableData,
      kit_uuid: ""
    }},
  actions: {
    async fetchKitThreadTableData(uuid: string) {
      this.kit_uuid = uuid
      this.kitThreadTableData = await Rest.getKitThreadTableData(uuid)
    },
    async updateKitThread(kitThreadUuid: string, updatedProperty: object) {
      await Rest.patchEntity(EntityType.KIT_THREAD, kitThreadUuid, updatedProperty)
      await this.fetchKitThreadTableData(this.kit_uuid)
    },
    async addKitThread() {
      await Rest.postEntity(EntityType.KIT_THREAD, {
        kit_uuid: this.kit_uuid,
        order_number: this.kitThreadTableData.table_rows.length + 1,
        quantity: 0
      })
      await this.fetchKitThreadTableData(this.kit_uuid)
    },
    async updateKitThreadVariant(kitThreadVariantUuid: string, updatedProperty: object) {
      await Rest.patchEntity(EntityType.KIT_THREAD_VARIANT, kitThreadVariantUuid, updatedProperty)
    }
  }
})