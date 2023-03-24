<script lang="ts">
import LeftPanel from "@/components/LeftPanel.vue";

export default {
  components: {LeftPanel},
  name: 'App',
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || 'ThreadMaster';
      }
    },
  }
}
</script>

<template>
  <div class="application">
    <LeftPanel/>
    <div class="main-area">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
@import "global";
@import url("https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css");
@import url("https://unpkg.com/vue-select@latest/dist/vue-select.css");
#app {
  display: inline;
}

html {
  height: 100%;
}

body {
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.application {
  min-height: 100%;
  display: flex;
  box-sizing: border-box;
  background-color: #404040;
}

</style>
