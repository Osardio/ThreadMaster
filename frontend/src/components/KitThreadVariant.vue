<script lang="ts">
import {defineComponent, PropType} from "vue";
import {KitsThreadVariantShort, PaletteShort} from "#/ComplexTypes";
import SelectKitThreadInput from "@/components/SelectKitThreadInput.vue"
import {Thread} from "#/Types";

export default defineComponent({
  name: "KitThreadVariant",
  emits: ["edited", "new"],
  components: {SelectKitThreadInput},
  props: {
    value: {
      type: Object as PropType<KitsThreadVariantShort>,
    },
    threads: {
      type: [] as PropType<Thread[]>,
      required: true
    },
    show_color: {
      type: Boolean,
      default: true
    },
    palette: {
      type: Object as PropType<PaletteShort>,
      required: true
    }
  },
  computed: {
    suitableThreads() {
      if (this.value?.kit_palette !== undefined) {
        return this.threads.filter( (thread) =>
            (thread.palette_uuid === this.value!.kit_palette.palette.uuid)
        ) ?? []
      } else {
        return this.threads
      }
    }
  },
  methods: {
    updateKitThreadVariant(event: Event ) {
      this.$emit("edited", (event as unknown as Thread).uuid)
    },
    onCreateNewThread(event: Event) {
      this.$emit("new", {
        kits_thread_variant_uuid: this.value?.uuid,
        code: event,
        palette_uuid: this.palette.uuid
      })
    }
  }
})
</script>

<template>
  <div class="kit-thread-variant">
    <SelectKitThreadInput
        v-if="threads"
        :options="suitableThreads"
        :value="threads.find((thread) => thread.uuid === value?.thread?.uuid)"
        :show_color="show_color"
        @edited="updateKitThreadVariant($event)"
        @new="onCreateNewThread"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/variables";

.kit-thread-variant {
  display: flex;
  align-items: center;
  align-self: center;
  width: 100%;
}


</style>