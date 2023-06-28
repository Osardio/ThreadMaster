import {defineStore} from "pinia";
import {Manufacturer} from "#/Types";
import Rest from "@/Rest";

export const useManufacturerStore = defineStore("manufacturerStore",{
  state: () => {
    return {
      manufacturers: [] as Manufacturer[],
    }},
  actions: {
    async get() {
      this.manufacturers = await Rest.getEntities("manufacturer") as Manufacturer[]
    },
  }
})