import {defineStore} from "pinia";
import {EntityType, Kit} from "#/Types";
import Rest from '@/Rest'

export const useKitStore = defineStore("kitStore", {
  state: () => {
    return {
      kits: [] as Kit[],
      kit: {} as Kit,
    }},
  getters: {
    dimensions() : Kit[] {
      return this.kits.filter(kit => kit.manufacturer_uuid == '1')
    }
  },
  actions: {
    async fetchKits() {
      const res = await Rest.getEntities('kit')
      this.kits = (res as Kit[]).concat(mockKits)
    },
    setActiveKit(kit: Kit) {
      this.kit = kit
    },
    async setActiveKitByUuid(uuid: string) {
      this.kit = await Rest.getEntity("kit",uuid) as Kit
    },
    async patchKit(updatedProperty: object) {
      const oldValue = this.kit[Object.keys(updatedProperty)[0] as keyof Kit]
      const newValue = Object.values(updatedProperty)[0]
      if (oldValue === newValue) {
        // if the property is not changed, return
        // TODO move to input
        return
      }
      this.kit = await Rest.patchEntity(EntityType.KIT, this.kit.uuid, updatedProperty) as Kit
      const idx = this.kits.findIndex(kitInList => kitInList.uuid === this.kit.uuid)
      this.kits[idx] = this.kit // patch element in entities list
      // TODO notify about error
    }
  }
})

const mockKits : Kit[] = [
  {
    uuid: "a0e98e8c-02be-4f7e-b8e1-cd11790751c9",
    manufacturer_uuid: "1",
    series_uuid: "22d21c09-a0c0-4dee-ac3b-674fe8b677c0",
    code: "08689",
    name_en: "Sleigh Ride",
    name_ru: "Санная прогулка",
    design_width: 38,
    design_length: 28,
    stitches_count: 30000,
    charms: "Отсутствуют",
    comment: "Лучший в мире набор для вышивания",
    colors_count: 57,
    beads_available: false,
    created_at: new Date("2023-03-04T17:53:38.310Z"),
    updated_at: new Date("2023-03-04T17:53:38.310Z")
  },
  {
    uuid: "a0e98e8c-02be-4f7e-b8e1-cd11790751c0",
    manufacturer_uuid: "1",
    series_uuid: "22d21c09-a0c0-4dee-ac3b-674fe8b677c0",
    code: "08689",
    name_en: "Sleigh Ride",
    name_ru: "Санная прогулка",
    design_width: 38,
    design_length: 28,
    stitches_count: 30000,
    charms: "Отсутствуют",
    comment: "Лучший в мире набор для вышивания",
    colors_count: 57,
    beads_available: false,
    created_at: new Date("2023-03-04T17:53:38.310Z"),
    updated_at: new Date("2023-03-04T17:53:38.310Z")
  }
]