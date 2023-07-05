<script lang="ts">
import {defineComponent} from "vue";
import RightPanel from "@/components/RightPanel.vue";
import KitCard from "@/components/KitCard.vue";
import KitSideBar from "@/components/KitSideBar.vue";
import {useApi} from "@/stores/Api";
import StringInput from "@/ui/StringInput.vue";
import TButton from "@/ui/TButton.vue";
import Utils from "@/Utils";

export default defineComponent({
  name: 'CatalogPage',
  data() {
    return {
      searchQuery: ""
    }
  },
  setup() { const api = useApi(); return { api } },
  components: {
    TButton,
    StringInput,
    KitSideBar,
    KitCard,
    RightPanel
  },
  computed: {
    sortedKits() {
      return Utils.sortArrayByField(this.api.kits.kits, "code")
    },
    sortedFilteredKits() {
      if (this.searchQuery && this.searchQuery !== "") {
        return this.sortedKits.filter(kit =>
            kit.code?.includes(this.searchQuery) ||
            kit.name_ru?.includes(this.searchQuery) ||
            kit.name_en?.includes(this.searchQuery) ||
            kit.comment?.includes(this.searchQuery)
        )
      } else {
        return this.sortedKits
      }
    }
  },
  methods: {
    addKit() {
      this.$router.push({ path: '/kit/new' })
    }
  },
  async mounted() {
    await this.api.kits.get()
  }
})

</script>

<template>
  <div class="page-container">
    <div class="page">
      <div class="top-bar">
      <StringInput
          class="search-bar"
          placeholder="Поиск наборов..."
          :value="searchQuery"
          @changed="searchQuery = $event"
      />
      <TButton
          class="create-kit-button"
          label="Добавить набор"
          style="width: 160px; height: 30px"
          @click="addKit"
      />
      </div>
      <div class="kits">
        <KitCard
            v-for="kit of sortedFilteredKits"
            :key="kit.uuid"
            :kit="kit"
        ></KitCard>
      </div>
    </div>
    <RightPanel>
      <KitSideBar
        :kit="api.kits.kit"
      />
    </RightPanel>
  </div>
</template>

<style lang="scss">
$header-font-size: 24px;
$header-margin: 6px;

.top-bar {
  display: flex;
  align-items: center;
  margin: 0 4px 10px 4px;
}

.search-bar {
  width: 100%
}

.create-kit-button {
  margin-left: 20px;
  height: 30px;
}

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
