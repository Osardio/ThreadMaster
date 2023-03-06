<script lang="ts">
import {useKitStore} from "@/stores/KitStore";
import { Kit } from "#/Types";
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "Kit",
  setup() {
    const kitStore = useKitStore()
    return { kitStore }
  },
  computed: {
    kitSelected() {
      return this.kitStore.activeKit == this.kit.uuid
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
      this.kitStore.setActiveKit(this.kit.uuid)
    }
  }
})
</script>

<template>
  <div :class="{'kit': true, 'kit-selected': kitSelected}"
       @click="setActive">
    <img class="kit-preview" src="http://localhost:7000/image_preview?uuid=a0e98e8c-02be-4f7e-b8e1-cd11790751c8" :alt="kit.code">
    <div>
      <div class="kit-label">{{ `${kit.code} ${kit.name_ru}` }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.kit {
  margin: 4px;
  display: flex;
  flex-direction: column;
  max-width: 150px;
  max-height: 166px;
  background-color: #444444;
  border: 1px solid #565656;
  border-radius: 2px;
}

.kit:hover {
  cursor: pointer;
}

.kit-preview {
  width: 100%;
  object-fit: contain;
  border: 1px solid #2B2B2B;
}

.kit-label {
  font-size: 12px;
  word-wrap: break-word;
}

.kit-selected {
  outline: orange 1px solid;
}
</style>