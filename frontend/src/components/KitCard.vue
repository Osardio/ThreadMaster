<script lang="ts">
import {useKitStore} from "@/stores/KitStore";
import { Kit } from "#/Types";
import {defineComponent, PropType} from "vue";
import ImageWrapper from "@/ui/ImageWrapper.vue";
import {useCommonStore} from "@/stores/CommonStore";

export default defineComponent({
  name: "KitCard",
  components: {ImageWrapper},
  setup() {
    const kitStore = useKitStore()
    const commonStore = useCommonStore()
    return { kitStore, commonStore }
  },
  computed: {
    kitSelected() {
      return this.kitStore.kit.uuid === this.kit.uuid
    }
  },
  props: {
    kit: {
      type: Object as PropType<Kit>,
      required: true,
      default: () => {}
    }
  },
  methods: {
    setActive() {
      this.kitStore.setActiveKit(this.kit)
    }
  }
})
</script>

<template>
  <div
      :class="{'kit': true, 'kit-selected': kitSelected}"
       @click="setActive"
  >
    <div class="kit-preview-container">
      <ImageWrapper
          class="kit-preview"
          :src="`${this.commonStore.backendUrl}/image_preview?uuid=${this.kit.uuid}`"
          :alt="kit.code"
      />
    </div>
    <div class="kit-label">{{ `${kit.code} ${kit.name_en}` }}</div>
  </div>
</template>

<style lang="scss">
.kit {
  margin: 4px;
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  background-color: #444444;
  border: 1px solid #565656;
  border-radius: 2px;
  justify-content: space-between;
}

.kit:hover {
  cursor: pointer;
}

.kit-preview-container {
  display: flex;
  width: 150px;
  height: 134px;
}

.kit-preview {
  width: 100%;
  object-fit: contain;
  outline: 1px solid #2B2B2B;
}

.kit-label {
  font-size: 12px;
  word-wrap: break-word;
  text-align: center;
}

.kit-selected {
  outline: orange 1px solid;
}
</style>