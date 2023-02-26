<script>
import LeftPanel from "@/components/LeftPanel";
export default {
  components: {LeftPanel},
  name: 'App',
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
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
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  overflow: hidden;
  margin: 0;
}

.application {
  margin: 8px;
  display: flex;
  height: 100vh;
}

.main-area {
  display: block;
  width: 80vw;
  background-color: lightgray;
}

</style>

