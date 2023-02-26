<template>
  <div class="panel-left">
    <div class="logo-container">
      <img alt="ThreadMaster Logo" class="logo-image" src="../assets/logo.png">
      <label class="logo-label">ThreadMaster</label>
    </div>
    <NavBar/>
  </div>

</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: "LeftPanel",
  components: {
    NavBar
  }
}
</script>

<style scoped>
.panel-left {
  padding: 4px;
  width: 20vw;
  height: 100%;
  background-color: orange;
}

.logo-container {
  display: flex;
  margin: 4px;
  justify-content: flex-start;
  align-items: center;
}
.logo-image {
  width: 128px;
  height: 128px;
}
.logo-label {
  font-size: 26px;
}
</style>
