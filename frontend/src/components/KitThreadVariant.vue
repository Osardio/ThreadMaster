<script lang="ts">
import {defineComponent, PropType} from "vue";
import {KitsThreadVariantShort} from "#/ComplexTypes";
import SelectKitThreadInput from "@/components/SelectKitThreadInput.vue"
import {Thread} from "#/Types";
import {useComplexStore} from "@/stores/ComplexStore";

export default defineComponent({
  name: "KitThreadVariant",
  setup() {
    const complexStore = useComplexStore()
    return { complexStore }
  },
  components: {SelectKitThreadInput},
  props: {
    value: {
      type: Object as PropType<KitsThreadVariantShort>,
      required: true
    },
    threads: {
      type: [] as PropType<Thread[]>,
      required: true
    },
    show_color: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    suitableThreads() {
      return this.threads.filter( (thread) =>
          (thread.palette_uuid === this.value.kit_palette.palette.uuid)
      ) ?? []
    }
  },
  methods: {
    updateKitThreadVariant(event: Event ) {
      this.$emit('edited', (event as unknown as Thread).uuid)
    }
  }
})
</script>

<template>
  <div class="kit-thread-variant">
    <SelectKitThreadInput
        v-if="threads"
        :options="suitableThreads"
        :value="threads.find((thread) => thread.uuid === value.thread.uuid)"
        :show_color="show_color"
        @edited="updateKitThreadVariant($event)"
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