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
    async create(creationDto: Partial<Thread>) {
      if (creationDto.color === null) creationDto.color = "#000000"
      if (creationDto.code === null) creationDto.code = "0"
      await Rest.postEntity(this.entityType, creationDto)
      await this.get()
    },
    async patchObject(object: Partial<Thread>) {
      await Rest.patchEntity(this.entityType, object.uuid!, object)
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