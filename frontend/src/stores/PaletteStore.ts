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
    },
    async create(name: string) {
      await Rest.postEntity(EntityType.PALETTE, { name: name })
      await this.get()
    },
    async patch(uuid: string, name: string) {
      await Rest.patchEntity(EntityType.PALETTE, uuid, { name: name } )
      await this.get()
    },
    async delete(uuid: string) {
      await Rest.deleteEntity(EntityType.PALETTE, uuid)
      await this.get()
    }
  }
})