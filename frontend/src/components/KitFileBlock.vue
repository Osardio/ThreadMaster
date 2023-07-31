<script lang="ts">
import {defineComponent, PropType} from "vue";
import {file_type, Kit} from "#/Types";
import {useApi} from "@/stores/Api";
import FileInput from "@/ui/FileInput.vue";
import Utils from "@/Utils";

export default defineComponent({
  name: "KitFileBlock",
  components: {FileInput},
  props: {
    kit: {
      type: Object as PropType<Kit>,
      required: true
    }
  },
  setup() { const api = useApi(); return { api } },
  computed: {
    sortedFiles() {
      return Utils.sortArrayByField(this.api.files.files, "name")
    }
  },
  watch: {
    async kit() {
      // for updating component files on page switch
      await this.api.files.get(this.kit.uuid);
    }
  },
  async mounted() {
    await this.api.files.get(this.kit.uuid);
  },
  methods: {
    async readUploadedFiles(files: FileList) {
      for (let i = 0; i < files.length; i++) {
        try {
          const fileData = (await Utils.readUploadedFileAsData(files[i])) as string;
          const fileName = files[i].name;
          await this.api.files.create(this.kit.uuid, {
            kit_uuid: this.kit.uuid,
            name: fileName,
            data: fileData.split("base64,")[1],
            data_type: fileData.split(";base64,")[0].split("data:")[1],
            file_type: file_type.OTHER
          })
        } catch (e: any) {
          console.error("Failed to upload file:", e)
        }
      }
    },
    deleteFile(fileUuid: string) {
      this.api.files.delete(fileUuid, this.kit.uuid)
    },
    async setImageAsPreview(fileUuid: string) {
      await this.api.files.setFileAsFront(fileUuid)
      this.$router.go(0) // refresh page to load updated preview
    }
  }
})
</script>

<template>
  <div class="kit-file-block">
    <div class="file-fields">
      <div class="heading-16">
        Файлы по набору
      </div>
      <div
          class="files">
        <FileInput
            v-for="file in sortedFiles"
            :file="file"
            @deleted="deleteFile"
            @setPreview="setImageAsPreview"
        />
        <FileInput
            @uploaded="readUploadedFiles"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../global";
.kit-file-block {
  display: flex;
}

.kit-file-block {
  display: flex;
}

.file-fields > * {
  margin-bottom: 4px;
}

</style>