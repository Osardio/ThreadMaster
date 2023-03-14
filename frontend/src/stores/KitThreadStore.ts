import {defineStore} from "pinia";
import {Manufacturer} from "#/Types";
import {useCommonStore} from "@/stores/CommonStore";

export const useManufacturerStore = defineStore("manufacturerStore",{
  state: () => {
    return {
      manufacturers: [] as Manufacturer[],
    }},
  actions: {
    async fetchManufacturers() {
      const backendUrl = useCommonStore().backendUrl
      const res = await fetch(`${backendUrl}/manufacturer`)
      this.manufacturers = (await res.json() as Manufacturer[])
    }
  }
})