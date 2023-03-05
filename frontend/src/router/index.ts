import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CatalogPage from "@/views/CatalogPage.vue"
import DirectoryPage from "@/views/DirectoryPage.vue"

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'catalog', component: CatalogPage, meta: { title: "Каталог"} },
  { path: '/directories', name: 'directories', component: DirectoryPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


export default router
