<script lang="ts">
import {defineComponent} from "vue";
import {useKitStore} from "@/stores/KitStore";
import {useCommonStore} from "@/stores/CommonStore";
import {useManufacturerStore} from "@/stores/ManufacturerStore";
import {useSeriesStore} from "@/stores/SeriesStore";
import KitSideBar from "@/components/KitSideBar.vue";
import RightPanel from "@/components/RightPanel.vue";
import {Kit} from "#/Types";

export default defineComponent({
  name: "KitPage",
  components: {RightPanel, KitSideBar},
  setup() {
    const kitStore = useKitStore()
    const commonStore = useCommonStore()
    const manufacturerStore = useManufacturerStore()
    const seriesStore = useSeriesStore()
    return { kitStore, commonStore, manufacturerStore, seriesStore }
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
  async mounted() {
    await this.kitStore.setActiveKitByUuid(this.uuid);
    await this.manufacturerStore.fetchManufacturers()
    await this.seriesStore.fetchSeries()
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page">
      <!--
      TODO Канва
      TODO Таблица нитей
      TODO Даты
      TODO вложенные файлы
      -->
    </div>
    <RightPanel>
      <KitSideBar
          :kit="kitStore.kit"
      />
    </RightPanel>
  </div>
</template>

<style scoped>

</style>
