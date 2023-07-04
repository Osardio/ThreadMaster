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
  computed: {
    kit() : Kit {
      return this.api.kits.kit
    }
  },
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  async beforeCreate() {
    await this.api.kits.setActiveKitByUuid(this.uuid)
  },
  async mounted() {
    await this.api.kits.get()
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page">
      <div class="kit-page">
        <KitThreadTable
            v-if="api.kits.kit.uuid !== undefined"
            :uuid="uuid"
        />
        <!--
        TODO Даты
        TODO вложенные файлы
        -->
        <KitFileBlock
            v-if="api.kits.kit.uuid"
            :kit="api.kits.kit"
        />
        <KitInfoBlock
            v-if="api.kits.kit.uuid"
            :kit="api.kits.kit"
        />
      </div>
    </div>
    <RightPanel>
      <KitSideBar v-if="api.kits.kit.uuid !== undefined" :kit="api.kits.kit"/>
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
