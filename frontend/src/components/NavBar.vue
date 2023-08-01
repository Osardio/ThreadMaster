<script lang="ts">
import {defineComponent} from "vue";
import YarnIcon from "@/icons/YarnIcon.vue";

export default defineComponent({
  name: "NavBar",
  components: {YarnIcon}
})
</script>

<template>
  <nav class="navbar">
    <router-link
      class="nav-button"
      to="/"
    >
      <i class="nav-icon bx bxs-book-content" />Каталог
    </router-link>
    <div class="navbar-section">
      <i class="nav-icon bx bxs-book" />Справочники
    </div>
    <router-link
      class="nav-button"
      to="/dictionaries/threads"
    >
      <YarnIcon class="nav-icon"/>Нити
    </router-link>
    <router-link
      class="nav-button"
      to="/dictionaries/palettes"
    >
      <i class="nav-icon bx bx-palette" />Палитры
    </router-link>
    <router-link
      class="nav-button"
      to="/dictionaries/manufacturers"
    >
      <i class="nav-icon bx bxs-factory" />Производители
    </router-link>
    <router-link
      class="nav-button"
      to="/dictionaries/series"
    >
      <i class="nav-icon bx bxs-food-menu" />Серии
    </router-link>
    <router-link
      class="nav-button"
      to="/dictionaries/canvas_names"
    >
      <i class="nav-icon bx bx-grid" />Виды канвы
    </router-link>
    <router-link
      class="nav-button"
      to="/dictionaries/canvas_colors"
    >
      <i class="nav-icon bx bxs-color-fill" />Цвета канвы
    </router-link>
    <router-link
      class="nav-button"
      to="/dictionaries/canvas_sizes"
    >
      <i class="nav-icon bx bx-move-horizontal" />Каунты канвы
    </router-link>
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
  height: 28px;
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

.navbar-section {
  display: flex;
  align-items: center;
  margin: 21px 1px 21px 1px;
  padding-left: 4px;
  text-decoration: none;
  border-radius: 3px;
  font-size: 16px;
}
</style>
