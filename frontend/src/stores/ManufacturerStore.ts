import {defineStore} from "pinia";
import {EntityType, Manufacturer} from "#/Types";
import Rest from "@/Rest";

export const useManufacturerStore = defineStore("manufacturerStore",{
  state: () => {
    return {
      manufacturers: [] as Manufacturer[],
    }},
  actions: {
    async get() {
      this.manufacturers = await Rest.getEntities("manufacturer") as Manufacturer[]
    },
    async create(name: string) {
      await Rest.postEntity(EntityType.MANUFACTURER, { name: name })
      await this.get()
    },
    async patch(uuid: string, name: string) {
      await Rest.patchEntity(EntityType.MANUFACTURER, uuid, { name: name } )
      await this.get()
    },
    async delete(uuid: string) {
      await Rest.deleteEntity(EntityType.MANUFACTURER, uuid)
      await this.get()
    }
  }
})