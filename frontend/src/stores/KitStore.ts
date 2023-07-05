import {defineStore} from "pinia";
import {EntityType, Kit} from "#/Types";
import Rest from '@/Rest'
import Utils from "@/Utils";

export const useKitStore = defineStore("kitStore", {
  state: () => {
    return {
      kits: [] as Kit[],
      kit: {} as Kit,
    }},
  getters: {
    isDraft() : Boolean {
      return (
        !this.kit ||
        !this.kit.manufacturer_uuid ||
        !this.kit.code ||
        !this.kit.series_uuid ||
        !this.kit.name_en
      )
    }
  },
  actions: {
    async get() {
      this.kits = await Rest.getEntities('kit') as Kit[]
    },
    setActiveKit(kit: Kit) {
      this.kit = kit
    },
    async setActiveKitByUuid(uuid: string) {
      this.kit = await Rest.getEntity(EntityType.KIT, uuid) as Kit
    },
    async patch(updatedProperty: Partial<Kit>) {
      if (this.isDraft) {
        Object.assign(this.kit, updatedProperty)
        if (!this.isDraft) {
          console.log("Creating new kit...")
          await this.createKit()
        }
        return
      }
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
    },
    async addKitDraft() {
      const newKitUuid = Utils.uuidv4()
      const newKit = { uuid: newKitUuid }
      // @ts-ignore
      this.kits.push(newKit)
      // @ts-ignore
      this.kit = newKit
    },
    async createKit() {
      this.kit = await Rest.postEntity(EntityType.KIT, this.kit) as Kit
      const idx = this.kits.findIndex(kitInList => kitInList.uuid === this.kit.uuid)
      this.kits[idx] = this.kit
    }
  }
})