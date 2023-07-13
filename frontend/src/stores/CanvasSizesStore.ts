import {defineStore} from "pinia";
import {CanvasSize, EntityType} from "#/Types";
import Rest from "@/Rest";

export const useCanvasSizesStore = defineStore("canvasSizesStore",{
  state: () => {
    return {
      items: [] as CanvasSize[],
      entityType: EntityType.CANVAS_SIZE,
    }},
  actions: {
    async get() {
      this.items = await Rest.getEntities(this.entityType) as CanvasSize[]
    },
    async create(size: number) {
      await Rest.postEntity(this.entityType, { size: size })
      await this.get()
    },
    async patch(uuid: string, size: number) {
      await Rest.patchEntity(this.entityType, uuid, { size: size })
      await this.get()
    },
    async delete(uuid: string) {
      await Rest.deleteEntity(this.entityType, uuid)
      await this.get()
    }
  }
})