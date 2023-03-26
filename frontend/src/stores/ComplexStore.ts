import {defineStore} from "pinia";
import Rest from "@/Rest";
import {KitThreadTableData} from "#/ComplexTypes";

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
      await Rest.patchEntity('kitThread', kitThreadUuid, updatedProperty)
      await this.fetchKitThreadTableData(this.kit_uuid)
    }
  }
})