import {defineStore} from "pinia";
import {EntityType, Palette} from "#/Types";
import Rest from "@/Rest";

export const usePaletteStore = defineStore("paletteStore",{
  state: () => {
    return {
      palettes: [] as Palette[],
    }},
  actions: {
    async get() {
      this.palettes = await Rest.getEntities(EntityType.PALETTE) as Palette[]
    }
  }
})