import {defineStore} from "pinia";
import {CanvasColor, EntityType} from "#/Types";
import Rest from "@/Rest";

export const useCanvasColorsStore = defineStore("canvasColorsStore",{
  state: () => {
    return {
      items: [] as CanvasColor[],
      entityType: EntityType.CANVAS_COLOR,
    }},
  actions: {
    async get() {
      this.items = await Rest.getEntities(this.entityType) as CanvasColor[]
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