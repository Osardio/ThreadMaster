<script lang="ts">
import {defineComponent} from "vue";
import KitSideBar from "@/components/KitSideBar.vue";
import RightPanel from "@/components/RightPanel.vue";
import {Kit} from "#/Types";
import KitThreadTable from "@/components/KitThreadTable.vue";
import {useApi} from "@/stores/Api";

export default defineComponent({
  name: "KitPage",
  components: {KitThreadTable, RightPanel, KitSideBar},
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
      <KitThreadTable v-if="api.kits.kit.uuid !== undefined" :uuid="uuid"/>
      <!--
      TODO Таблица нитей
      TODO Канва
      TODO Даты
      TODO вложенные файлы
      -->
    </div>
    <RightPanel>
      <KitSideBar v-if="api.kits.kit.uuid !== undefined" :kit="api.kits.kit"/>
    </RightPanel>
  </div>
</template>

<style scoped>

</style>
