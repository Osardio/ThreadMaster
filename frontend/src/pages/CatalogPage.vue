<script lang="ts">
import {defineComponent} from "vue";
import {useKitStore} from "@/stores/KitStore";
import RightPanel from "@/components/RightPanel.vue";
import Kit from "@/components/KitCard.vue";
import KitSideBar from "@/components/KitSideBar.vue";

export default defineComponent({
  name: 'CatalogPage',
  setup() {
    const kitStore = useKitStore()
    return { kitStore }
  },
  components: {
    KitSideBar,
    Kit,
    RightPanel
  },
  async mounted() {
    await this.kitStore.fetchKits()
  }
})

</script>

<template>
  <div class="page-container">
    <div class="page">
      <!-- TODO search -->
      <div class="kits">
        <Kit
            v-for="kit of kitStore.kits"
            :key="kit.uuid"
            :kit="kit"
        ></Kit>
      </div>
    </div>
    <RightPanel>
      <KitSideBar
        :kit="kitStore.kit"
      />
    </RightPanel>
  </div>
</template>

<style lang="scss">
@import "../global";
$header-font-size: 24px;
$header-margin: 6px;

.kits {
  align-content: flex-start;
  overflow-y: auto;
  overflow-anchor: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 100%;
}
::-webkit-scrollbar {
  display: none;
}
.top-label {
  font-size: $header-font-size;
}
.page-header {
  margin: $header-margin 0;
}
</style>
