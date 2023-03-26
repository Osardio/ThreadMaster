import {defineStore} from "pinia";
import {EntityType, Thread} from "#/Types";
import Rest from "@/Rest";

export const useThreadStore = defineStore("threadStore",{
  state: () => {
    return {
      threads: [] as Thread[],
    }},
  actions: {
    async fetchThreads() {
      this.threads = await Rest.getEntities(EntityType.THREAD) as Thread[]
    },
  }
})