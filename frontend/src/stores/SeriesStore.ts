import {defineStore} from "pinia";
import {EntityType, Series} from "#/Types";
import Rest from "@/Rest";

export const useSeriesStore = defineStore("seriesStore",{
  state: () => {
    return {
      items: [] as Series[],
      entityType: EntityType.SERIES,
    }},
  actions: {
    async get() {
      this.items = await Rest.getEntities(this.entityType) as Series[]
    },
    async create(manufacturer_uuid: string) {
      await Rest.postEntity(this.entityType, { manufacturer_uuid: manufacturer_uuid })
      await this.get()
    },
    async patch(uuid: string, name: string) {
      await Rest.patchEntity(this.entityType, uuid, { name: name })
      await this.get()
    },
    async delete(uuid: string) {
      await Rest.deleteEntity(this.entityType, uuid)
      await this.get()
    }
  }
})