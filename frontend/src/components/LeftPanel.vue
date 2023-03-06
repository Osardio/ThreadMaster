<script>
import NavBar from "@/components/NavBar.vue";
import AppLogo from "@/components/AppLogo.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "LeftPanel",
  components: {
    AppLogo,
    NavBar
  }
})
</script>

<template>
  <div class="panel">
    <AppLogo/>
    <NavBar/>
  </div>

</template>

<style scoped>

</style>
