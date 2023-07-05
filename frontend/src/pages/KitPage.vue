<script lang="ts">
import {defineComponent} from "vue";
import KitSideBar from "@/components/KitSideBar.vue";
import RightPanel from "@/components/RightPanel.vue";
import {Kit} from "#/Types";
import KitThreadTable from "@/components/KitThreadTable.vue";
import KitInfoBlock from "@/components/KitInfoBlock.vue"
import {useApi} from "@/stores/Api";
import KitFileBlock from "@/components/KitFileBlock.vue";

export default defineComponent({
  name: "KitPage",
  components: {KitFileBlock, KitInfoBlock, KitThreadTable, RightPanel, KitSideBar},
  setup() { const api = useApi(); return { api } },
  props: {
    uuid: {
      type: String,
      required: false
    },
    draft: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    kit() : Kit {
      return this.api.kits.kit
    },
    isDraft() {
      return this.api.kits.isDraft
    }
  },
  watch: {
    async isDraft(newValue: boolean, oldValue: boolean) {
      if (!newValue && oldValue && this.draft) {
        // if kit is no more a draft, go to normal kit page
        this.$router.push({ path: `${this.kit.uuid}` })
      }
    }
  },
  async mounted() {
    await this.api.kits.get()
    if (this.draft) {
      await this.api.kits.addKitDraft()
    }
    if (this.uuid) {
      await this.api.kits.setActiveKitByUuid(this.uuid)
    }
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page">
      <div class="kit-page">
        <KitThreadTable
            v-if="!isDraft && kit.uuid !== undefined"
            :uuid="uuid"
        />
        <!--
        TODO Даты
        -->
        <KitFileBlock
            v-if="!isDraft && kit.uuid"
            :kit="kit"
        />
        <KitInfoBlock
            v-if="!isDraft && kit.uuid"
            :kit="kit"
        />
      </div>
    </div>
    <RightPanel>
      <KitSideBar
          v-if="kit.uuid !== undefined"
          :kit="kit"
          :draft="isDraft"
      />
    </RightPanel>
  </div>
</template>

<style scoped lang="scss">
@import "../global";
.kit-page {
  display: flex;
  width: calc(100vw - $panel-width * 2 - 40px);
  justify-content: space-between;
}

.kit-page > * {
  margin-top: -10px
}
</style>
