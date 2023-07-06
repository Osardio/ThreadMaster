import {defineStore} from "pinia";
import {Canvas, CanvasColor, CanvasName, CanvasSize, EntityType} from "#/Types";
import Rest from "@/Rest";

export const useCanvasStore = defineStore("canvasStore",{
  state: () => {
    return {
      canvas: {} as Canvas | null,
      canvasNames: [] as CanvasName[],
      canvasSizes: [] as CanvasSize[],
      canvasColors: [] as CanvasColor[],
    }},
  actions: {
    async get(kitUuid: string) {
      this.canvas = await Rest.getEntityCustom(EntityType.CANVAS, { kit_uuid: kitUuid }) as Canvas
      this.canvasNames = await Rest.getEntities(EntityType.CANVAS_NAME) as CanvasName[]
      this.canvasSizes = await Rest.getEntities(EntityType.CANVAS_SIZE) as CanvasSize[]
      this.canvasColors = await Rest.getEntities(EntityType.CANVAS_COLOR) as CanvasColor[]
    },
    async create(kitUuid: string) {
      this.canvas = await Rest.postEntity(EntityType.CANVAS, { kit_uuid: kitUuid }) as Canvas
    },
    async patch(updatedProperty: Partial<Canvas>) {
      if (this.canvas !== null) {
        const oldValue = this.canvas[Object.keys(updatedProperty)[0] as keyof Canvas]
        const newValue = Object.values(updatedProperty)[0]
        if (oldValue === newValue) {
          // if the property is not changed, return
          // TODO move to input
          return
        }
        this.canvas = await Rest.patchEntity(EntityType.CANVAS, this.canvas.uuid, updatedProperty) as Canvas
      }
    }
  }
})