<script>
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
@import url("https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css");
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

.main-area {
  border-left: 1px solid #2F2F2F;
  display: block;
  width: 100%;
  background-color: #383838;
}

</style>
