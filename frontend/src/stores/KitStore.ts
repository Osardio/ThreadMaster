import {defineStore} from "pinia";
import {Kit} from "#/Types";
import {useCommonStore} from "@/stores/CommonStore";

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
      const backendUrl = useCommonStore().backendUrl
      const res = await fetch(`${backendUrl}/kit`)
      this.kits = (await res.json() as Kit[]).concat(mockKits)
    },
    setActiveKit(kit: Kit) {
      this.kit = kit
    },
    async updateKit(updatedProperty: object) {
      console.log('updated prop: ',updatedProperty)
      const backendUrl = useCommonStore().backendUrl
      const res = await fetch(`${backendUrl}/kit?uuid=${this.kit.uuid}`,{
        body: JSON.stringify(updatedProperty),
        method: 'PATCH',
        headers: new Headers({ "Content-Type": "application/json" })
      })
      if (res.status == 200) {
        this.kit = await res.json()
        const idx = this.kits.findIndex(kitInList => kitInList.uuid === this.kit.uuid)
        this.kits[idx] = this.kit // patch element in store
      } else {
        // TODO notify about error
      }
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
    colors_count: 57,
    beads_available: false,
    created_at: new Date("2023-03-04T17:53:38.310Z"),
    updated_at: new Date("2023-03-04T17:53:38.310Z")
  },
  {
    uuid: "a0e98e8c-02be-4f7e-b8e1-cd11790751c1",
    manufacturer_uuid: "1",
    series_uuid: "22d21c09-a0c0-4dee-ac3b-674fe8b677c0",
    code: "08689",
    name_en: "Sleigh Ride",
    name_ru: "Санная прогулка",
    design_width: 38,
    design_length: 28,
    stitches_count: 30000,
    charms: "Отсутствуют",
    colors_count: 57,
    beads_available: false,
    created_at: new Date("2023-03-04T17:53:38.310Z"),
    updated_at: new Date("2023-03-04T17:53:38.310Z")
  },
  {
    uuid: "a0e98e8c-02be-4f7e-b8e1-cd11790751c2",
    manufacturer_uuid: "1",
    series_uuid: "22d21c09-a0c0-4dee-ac3b-674fe8b677c0",
    code: "08689",
    name_en: "Sleigh Ride",
    name_ru: "Санная прогулка",
    design_width: 38,
    design_length: 28,
    stitches_count: 30000,
    charms: "Отсутствуют",
    colors_count: 57,
    beads_available: false,
    created_at: new Date("2023-03-04T17:53:38.310Z"),
    updated_at: new Date("2023-03-04T17:53:38.310Z")
  },
  {
    uuid: "a0e98e8c-02be-4f7e-b8e1-cd11790751c3",
    manufacturer_uuid: "1",
    series_uuid: "22d21c09-a0c0-4dee-ac3b-674fe8b677c0",
    code: "08689",
    name_en: "Sleigh Ride",
    name_ru: "Санная прогулка",
    design_width: 38,
    design_length: 28,
    stitches_count: 30000,
    charms: "Отсутствуют",
    colors_count: 57,
    beads_available: false,
    created_at: new Date("2023-03-04T17:53:38.310Z"),
    updated_at: new Date("2023-03-04T17:53:38.310Z")
  },
  {
    uuid: "a0e98e8c-02be-4f7e-b8e1-cd11790751c4",
    manufacturer_uuid: "1",
    series_uuid: "22d21c09-a0c0-4dee-ac3b-674fe8b677c0",
    code: "08689",
    name_en: "Sleigh Ride",
    name_ru: "Санная прогулка",
    design_width: 38,
    design_length: 28,
    stitches_count: 30000,
    charms: "Отсутствуют",
    colors_count: 57,
    beads_available: false,
    created_at: new Date("2023-03-04T17:53:38.310Z"),
    updated_at: new Date("2023-03-04T17:53:38.310Z")
  },
  {
    uuid: "a0e98e8c-02be-4f7e-b8e1-cd11790751c5",
    manufacturer_uuid: "1",
    series_uuid: "22d21c09-a0c0-4dee-ac3b-674fe8b677c0",
    code: "08689",
    name_en: "Sleigh Ride",
    name_ru: "Санная прогулка",
    design_width: 38,
    design_length: 28,
    stitches_count: 30000,
    charms: "Отсутствуют",
    colors_count: 57,
    beads_available: false,
    created_at: new Date("2023-03-04T17:53:38.310Z"),
    updated_at: new Date("2023-03-04T17:53:38.310Z")
  }
]