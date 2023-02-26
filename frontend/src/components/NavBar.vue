<template>
  <nav class="navbar">
    <router-link class="nav-button" to="/">Каталог</router-link>
    <router-link class="nav-button" to="/directories">Справочники</router-link>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
nav a.router-link-exact-active {
  color: #42b983;
}

.navbar {
  display: flex;
  flex-direction: column;
}

.nav-button {
  margin: 4px;
  background-color: lemonchiffon;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 3px;
}

.nav-button:hover {
  background-color: palegoldenrod;
}
</style>
