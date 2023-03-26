<script lang="ts">
import {defineComponent} from "vue";
import {useKitStore} from "@/stores/KitStore";
import KitSideBar from "@/components/KitSideBar.vue";
import RightPanel from "@/components/RightPanel.vue";
import {Kit} from "#/Types";
import KitThreadTable from "@/components/KitThreadTable.vue";

export default defineComponent({
  name: "KitPage",
  components: {KitThreadTable, RightPanel, KitSideBar},
  setup() {
    const kitStore = useKitStore()
    kitStore.fetchKits()
    return { kitStore }
  },
  computed: {
    kit() : Kit {
      return this.kitStore.kit
    }
  },
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  async beforeCreate() {
    await this.kitStore.setActiveKitByUuid(this.uuid)
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page">
      <KitThreadTable v-if="kitStore.kit.uuid !== undefined" :uuid="uuid"/>
      <!--
      TODO Таблица нитей
      TODO Канва
      TODO Даты
      TODO вложенные файлы
      -->
    </div>
    <RightPanel>
      <KitSideBar v-if="kitStore.kit.uuid !== undefined" :kit="kitStore.kit"/>
    </RightPanel>
  </div>
</template>

<style scoped>

</style>
