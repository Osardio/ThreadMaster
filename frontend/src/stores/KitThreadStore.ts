import {defineStore} from "pinia";
import {KitThread} from "#/Types";

export const useKitThreadStore = defineStore("kitThreadStore",{
  state: () => {
    return {
      kitThreads: [] as KitThread[],
    }},
  actions: {
    async updateKitThread(updatedProperty: object) {
      //const oldValue = this.kit[Object.keys(updatedProperty)[0] as keyof Kit]
      //const newValue = Object.values(updatedProperty)[0]
      //this.kitThreads = Rest.patchEntity('kitThread', ) as KitThread[]
    }
  }
})