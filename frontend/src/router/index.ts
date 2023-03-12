import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CatalogPage from "@/pages/CatalogPage.vue"
import DirectoryPage from "@/pages/DirectoryPage.vue"
import KitPage from "@/pages/KitPage.vue"

const routes: Array<RouteRecordRaw> = [
  { path: "/",            name: "catalog",     component: CatalogPage, meta: { title: "Каталог"} },
  { path: "/directories", name: "directories", component: DirectoryPage },
  { path: "/kit/:uuid",   name: "kits",        component: KitPage, props: true, meta: { title: "Набор" } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


export default router
