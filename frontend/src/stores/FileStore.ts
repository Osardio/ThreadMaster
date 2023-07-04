import {defineStore} from "pinia";
import {EntityType, File, file_type} from "#/Types";
import Rest from "@/Rest";

export const useFileStore = defineStore("fileStore",{
  state: () => {
    return {
      files: [] as File[],
    }},
  actions: {
    async get(kitUuid: string) {
      this.files = (await Rest.getEntitiesCustom(EntityType.FILE, { kit_uuid: kitUuid })) as File[]
    },
    async create(kitUuid: string, file: object) {
      await Rest.postEntity(EntityType.FILE, file)
      await this.get(kitUuid)
    },
    async delete(fileUuid: string, kitUuid: string) {
      await Rest.deleteEntity(EntityType.FILE, fileUuid)
      await this.get(kitUuid)
    },
    async setFileAsFront(fileUuid: string) {
      const oldFrontFile = this.files.find(file => file.file_type === file_type.FRONT)
      if (oldFrontFile !== undefined && oldFrontFile.uuid !== fileUuid) {
        await Rest.patchEntity(EntityType.FILE, oldFrontFile.uuid, { file_type: file_type.OTHER })
      }
      await Rest.patchEntity(EntityType.FILE, fileUuid, { file_type: file_type.FRONT })
    }
  }
})