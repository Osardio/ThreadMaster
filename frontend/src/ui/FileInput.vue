<script lang="ts">
import {defineComponent, PropType} from "vue";
import {File} from "#/Types";
import ImageWrapper from "@/ui/ImageWrapper.vue";
import TButton from "@/ui/TButton.vue";
import ModalWindow from "@/ui/ModalWindow.vue";

export default defineComponent({
  name: "FileInput",
  components: {ImageWrapper, TButton, ModalWindow},
  emits: ["uploaded", "setPreview", "deleted"],
  data() {
    return {
      hovered: false,
      confirmDeletionModalVisible: false
    }
  },
  props: {
    file: {
      type: Object as PropType<File>,
      required: false
    }
  },
  computed: {
    fileFormat() {
      if (this.file?.name) {
        return this.file?.name?.split(".").pop().toLowerCase()!;
      } else {
        return ""
      }
    },
    fileIsImage() {
      if (this.fileFormat !== "") {
        const imageFormats = ["jpg", "jpeg", "png", "apng", "bmp", "svg", "gif", "ico"];
        if (imageFormats.includes(this.fileFormat)) return true;
      }
      return false;
    }
  },
  methods: {
    openFileDialog() {
      (this.$refs.file_input as HTMLInputElement).click();
    },
    addFiles(event: InputEvent) {
      this.$emit("uploaded", (event.target as HTMLInputElement).files)
    },
    setImagePreview() {
      this.$emit("setPreview", this.file?.uuid)
    },
    downloadFile() {
      if (this.file !== undefined) {
        const link = (this.$refs.download_link as HTMLAnchorElement);
        link.href = `data:${this.file.data_type};base64,${this.file.data}`
        link.click();
        link.href = "";
      }
    },
    showDeletionModal() {
      this.confirmDeletionModalVisible = true;
    },
    deleteFile() {
      this.confirmDeletionModalVisible = false;
      this.$emit("deleted", this.file?.uuid)
    }
  }
})
</script>

<template>
  <div
      class="file-input-container"
      @mouseover="hovered = true"
      @mouseleave="hovered = false"
  >
    <div v-if="file" class="file-input">
      <div class="file-left">
        <ImageWrapper
            v-if="fileIsImage"
            class="file-preview"
            :src="`data:image/${fileFormat};base64,${file.data}`"
            :alt="file.name ?? 'Файл'"
            style="font-size: 40px"
        />
        <div
            v-else
            class="file-preview file-icon bx bx-file"
        />
      </div>
      <div class="file-right">
        <div class="file-name" :title="file.name">{{ file.name }}</div>
        <div v-if="hovered" class="file-buttons">
          <div v-if="fileIsImage" class='file-button bx bx-images'    @click="setImagePreview" title="Установить на превью"></div>
          <div class='file-button bx bxs-download' @click="downloadFile" title="Скачать файл"></div>
          <div class='file-button bx bx-trash'     @click="showDeletionModal" title="Удалить файл"></div>
        </div>
      </div>
    </div>
    <div
        v-else
        class="file-stub"
    >
      <TButton
          label="Добавить файлы"
          @click="openFileDialog"
      />
    </div>
    <input
        multiple
        type="file"
        ref="file_input"
        accept="*"
        style="display: none"
        @change="addFiles"
    />
    <a
        v-if="this.file"
        style="display: none"
        ref="download_link"
        :download="this.file.name"
    >
    </a>
    <ModalWindow
        v-model:show="confirmDeletionModalVisible"
    >
      <div class="confirm-deletion-modal">
        <div class="confirm-deletion">
          <span>Действительно хотите удалить этот файл?</span>
          <div
              class="file-name"
              :title="file.name"
              style="margin-left: 0"
          >{{ file.name }}</div>
          <span>Внимание: данное действие <b>НЕОБРАТИМО!</b></span>
          <div class="delete-buttons">
            <TButton
                label="Да"
                @click="deleteFile"
                style="width: 50px"
            />
            <TButton
                label="Нет"
                @click="confirmDeletionModalVisible = false"
                style="width: 50px"
            />
          </div>
        </div>
      </div>
    </ModalWindow>
  </div>
</template>

<style scoped lang="scss">
@import "../variables";

.file-input {
  padding: 4px;
  height: 52px;
  width: 100%;
  max-width: 180px;
  border-radius: 5px;
  border: 2px solid $color-shadowed;
}

.file-input {
  display: flex;
}

.file-preview {
  width: 40px;
  height: 40px;
}

.file-icon {
  font-size: 40px;

}

.file-stub {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
}

.file-right {
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.file-name {
  margin-left: 4px;
  width: 130px;
  max-height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.file-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 16px;
}

.file-buttons > * {
  margin-right: 10px;
  font-size: 14px !important;
  height: 16px;
}

.file-button:hover {
  cursor: pointer;
  color: $color-shadowed;
}

.confirm-deletion-modal {
  display: flex;
  justify-content: center;
}

.confirm-deletion {
  display: flex;
  flex-direction: column;
}

.delete-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}

</style>