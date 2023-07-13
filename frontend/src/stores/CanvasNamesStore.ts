import {defineStore} from "pinia";
import {CanvasName, EntityType} from "#/Types";
import Rest from "@/Rest";

export const useCanvasNamesStore = defineStore("canvasNamesStore",{
  state: () => {
    return {
      items: [] as CanvasName[],
      entityType: EntityType.CANVAS_NAME,
    }},
  actions: {
    async get() {
      this.items = await Rest.getEntities(this.entityType) as CanvasName[]
    },
    async create(name: string) {
      await Rest.postEntity(this.entityType, { name: name })
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