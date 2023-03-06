import {defineStore} from "pinia";
import {Kit} from "#/Types";

export const useKitStore = defineStore("kitStore", {
  state: () => ({
    serverKits: [] as Kit[],
    kits: [
      {
        uuid: "a0e98e8c-02be-4f7e-b8e1-cd11790751c8",
        manufacturer_uuid: "5f5d3f6e-6c07-437d-937b-fe026a0eaa65",
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
    ] as Kit[],
    activeKit: "a0e98e8c-02be-4f7e-b8e1-cd11790751c9"
  }),
  getters: {
    dimensions() : Kit[] {
      return this.kits.filter(kit => kit.manufacturer_uuid == '1')
    }
  },
  actions: {
    async getKits() {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/kit`)
      this.serverKits = await res.json() as Kit[]
    },
    setActiveKit(uuid: string) {
      this.activeKit = uuid
    }
  }
})