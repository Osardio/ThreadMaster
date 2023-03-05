<script>
export default {
  name: "NavBar"
}
</script>

<template>
  <nav class="navbar">
    <router-link class="nav-button" to="/"><i class='bx bxs-book'></i> Каталог</router-link>
    <router-link class="nav-button" to="/directories"><i class='bx bxs-book-content' ></i> Справочники</router-link>
  </nav>
</template>

<style scoped>
nav a.router-link-exact-active {
  background-color: #565656;
}

.navbar {
  text-align: center;
  display: flex;
  flex-direction: column;
}

.nav-button {
  margin: 4px;
  font-weight: bold;
  color: #B0B0B0;
  text-decoration: none;
  border-radius: 3px;
}

.nav-button:hover {
  background-color: #565656;
}
</style>
