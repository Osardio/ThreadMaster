import {defineStore} from "pinia";
import {EntityType, Thread} from "#/Types";
import Rest from "@/Rest";

export const useThreadStore = defineStore("threadsStore",{
  state: () => {
    return {
      threads: [] as Thread[],
      entityType: EntityType.THREAD,
    }},
  actions: {
    async get() {
      this.threads = await Rest.getEntities(this.entityType) as Thread[]
    },
    async create(palette_uuid: string, code: string ) {
      await Rest.postEntity(this.entityType, { palette_uuid: palette_uuid, code: code })
      await this.get()
    },
    async patch(uuid: string, changes: object) {
      await Rest.patchEntity(this.entityType, uuid, changes)
      await this.get()
    },
    async delete(uuid: string) {
      await Rest.deleteEntity(this.entityType, uuid)
      await this.get()
    }
  }
})