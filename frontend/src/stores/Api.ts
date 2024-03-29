import {defineStore} from "pinia";
import {useSeriesStore} from "@/stores/SeriesStore";
import {useCommonStore} from "@/stores/CommonStore";
import {useKitStore} from "@/stores/KitStore";
import {useKitThreadStore} from "@/stores/KitThreadStore";
import {useManufacturerStore} from "@/stores/ManufacturerStore";
import {useThreadStore} from "@/stores/ThreadStore";
import {useComplexStore} from "@/stores/ComplexStore";
import {usePaletteStore} from "@/stores/PaletteStore";
import {useCanvasStore} from "@/stores/CanvasStore";
import {useFileStore} from "@/stores/FileStore";
import {useCanvasNamesStore} from "@/stores/CanvasNamesStore";
import {useCanvasColorsStore} from "@/stores/CanvasColorsStore";
import {useCanvasSizesStore} from "@/stores/CanvasSizesStore";

export const useApi = defineStore("api", {
  state: () => {
    return {
      common: useCommonStore(),
      complex: useComplexStore(),
      series: useSeriesStore(),
      kits: useKitStore(),
      palettes: usePaletteStore(),
      kitThreads: useKitThreadStore(),
      manufacturers: useManufacturerStore(),
      threads: useThreadStore(),
      canvases: useCanvasStore(),
      canvasNames: useCanvasNamesStore(),
      canvasColors: useCanvasColorsStore(),
      canvasSizes: useCanvasSizesStore(),
      files: useFileStore()
    }
  }
})


