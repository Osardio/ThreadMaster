import {defineStore} from "pinia";
import {Series} from "#/Types";
import {useCommonStore} from "@/stores/CommonStore";

export const useSeriesStore = defineStore("seriesStore",{
  state: () => {
    return {
      series: [] as Series[],
    }},
  actions: {
    async get() {
      const backendUrl = useCommonStore().backendUrl
      const res = await fetch(`${backendUrl}/series`)
      this.series = (await res.json() as Series[])
    }
  }
})