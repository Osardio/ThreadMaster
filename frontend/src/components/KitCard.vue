<script lang="ts">
import {Kit} from "#/Types";
import {defineComponent, PropType} from "vue";
import ImageWrapper from "@/ui/ImageWrapper.vue";
import {useApi} from "@/stores/Api";

export default defineComponent({
  name: "KitCard",
  components: {ImageWrapper},
  setup() { const api = useApi(); return { api } },
  data() {
    return {
      hovered: false
    }
  },
  computed: {
    kitSelected() {
      return this.api.kits.kit.uuid === this.kit.uuid
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
      this.api.kits.setActiveKit(this.kit)
    },
    openKit() {
      this.$router.push(`/kit/${this.kit.uuid}`)
    }
  },

})
</script>

<template>
  <div
      :class="{'kit-card': true, 'kit-selected': kitSelected}"
       @click="setActive"
  >
    <div class="kit-preview-container"
         @mouseover="hovered = true"
         @mouseleave="hovered = false"
    >
      <div
          v-if="hovered"
          class="kit-open-button"
          title="Открыть"
          @click="openKit"
      >
        <i class="bx bx-link-external"/>
      </div>
      <ImageWrapper
          class="kit-preview"
          :src="`${api.common.backendUrl}/image_preview?uuid=${kit.uuid}`"
          :alt="kit.code ?? ''"
          style="font-size: 150px"
      />
    </div>
    <div class="kit-label">{{ `${kit.code} ${kit.name_en}` }}</div>
  </div>
</template>

<style lang="scss">
.kit-card {
  margin: 4px;
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  background-color: #444444;
  border: 1px solid #565656;
  border-radius: 2px;
  justify-content: space-between;
  position: relative;
}

.kit-card:hover {
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
}

.kit-label {
  font-size: 12px;
  word-wrap: break-word;
  text-align: center;
}

.kit-selected {
  outline: orange 1px solid;
}

.kit-open-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  position: absolute;
  z-index: 1;
  right: 2px;
  top: 2px;
  border-radius: 4px;
}

.bx-link-external {
  font-size: 30px;
}

.kit-open-button:hover {
  background: rgba(86,86,86,0.6);
}
</style>