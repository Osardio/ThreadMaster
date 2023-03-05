<script>
export default {
  name: "AppLogo"
}
</script>

<template>
  <div class="logo-container">
    <img alt="ThreadMaster Logo" class="logo-image" src="../assets/logo.png">
    <label class="logo-label">ThreadMaster</label>
  </div>
</template>

<style scoped>
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
  color: white;
  font-size: 26px;
}
</style>
