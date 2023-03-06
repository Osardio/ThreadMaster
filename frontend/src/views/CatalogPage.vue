<script lang="ts">
import {useKitStore} from "@/stores/KitStore";
import RightPanel from "@/components/RightPanel.vue";
import Kit from "@/components/Kit.vue";
import {defineComponent} from "vue";


export default defineComponent({
  name: 'CatalogPage',
  data() {
    return {
      kitStore: useKitStore(),
      metaEnv: import.meta.env
    }
  },
  components: {
    Kit,
    RightPanel
  },
  mounted() {
    this.kitStore.getKits()
  }
})

</script>

<template>
  <div class="page-container">
    <div class="page">
      {{ metaEnv }}
      <div class="kits">
        <Kit
            v-for="kit of kitStore.kits"
            :key="kit.uuid"
            :kit="kit"
        ></Kit>
      </div>
    </div>
    <RightPanel/>
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
  height: 100%;
}
.top-label {
  font-size: $header-font-size;
}
.page-header {
  margin: $header-margin 0;
}
</style>
