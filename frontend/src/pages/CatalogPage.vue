<script lang="ts">
import {useKitStore} from "@/stores/KitStore";
import RightPanel from "@/components/RightPanel.vue";
import Kit from "@/components/KitCard.vue";
import {defineComponent} from "vue";
import KitSideInfo from "@/components/KitSideInfo.vue";


export default defineComponent({
  name: 'CatalogPage',
  setup() {
    const kitStore = useKitStore()
    return { kitStore }
  },
  data() {
    return {
      kitStore: useKitStore(),
    }
  },
  components: {
    KitSideInfo,
    Kit,
    RightPanel
  },
  mounted() {
    this.kitStore.fetchKits()
  }
})

</script>

<template>
  <div class="page-container">
    <div class="page">
      <div class="kits">
        <Kit
            v-for="kit of kitStore.kits"
            :key="kit.uuid"
            :kit="kit"
        ></Kit>
      </div>
    </div>
    <RightPanel>
      <KitSideInfo
        :kit="kitStore.kit"
      />
    </RightPanel>
  </div>
</template>

<style lang="scss">
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
.top-label {
  font-size: $header-font-size;
}
.page-header {
  margin: $header-margin 0;
}
</style>
