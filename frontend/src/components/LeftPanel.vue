<script>
import NavBar from "@/components/NavBar.vue";
import AppLogo from "@/components/AppLogo.vue";
export default {
  name: "LeftPanel",
  components: {
    AppLogo,
    NavBar
  }
}
</script>

<template>
  <div class="panel-left">
    <AppLogo/>
    <NavBar/>
  </div>

</template>

<style scoped>
.panel-left {
  padding: 4px;
  min-height: 100%;
  background-color: #404040;
}


</style>
