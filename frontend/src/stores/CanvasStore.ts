import {defineStore} from "pinia";
import {Canvas, CanvasColor, CanvasName, CanvasSize, EntityType} from "#/Types";
import Rest from "@/Rest";

export const useCanvasStore = defineStore("canvasStore",{
  state: () => {
    return {
      canvas: {} as Canvas,
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
    }
  }
})