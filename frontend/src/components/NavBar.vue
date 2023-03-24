<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "NavBar"
})
</script>

<template>
  <nav class="navbar">
    <router-link class="nav-button" to="/"><i class='nav-icon bx bxs-book'></i>Каталог</router-link>
    <router-link class="nav-button" to="/directories"><i class='nav-icon bx bxs-book-content'></i>Справочники</router-link>
  </nav>
</template>

<style scoped>
nav a.router-link-exact-active {
  background-color: #565656;
}

.nav-icon {
  margin-right: 4px;
  height: 14px;
  width: 14px;
}

.navbar {
  margin-top: 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.nav-button {
  display: flex;
  align-items: center;
  margin: 1px;
  padding-left: 4px;
  text-decoration: none;
  border-radius: 3px;
  font-size: 16px;
}

.nav-button:hover {
  background-color: #565656;
}
</style>
