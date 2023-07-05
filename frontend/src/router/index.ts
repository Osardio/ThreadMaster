import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import CatalogPage from "@/pages/CatalogPage.vue"
import DictionaryPage from "@/pages/DictionaryPage.vue"
import KitPage from "@/pages/KitPage.vue"

const routes: Array<RouteRecordRaw> = [
  { path: "/",            name: "catalog",     component: CatalogPage, meta: { title: "Каталог"} },
  { path: "/directories", name: "directories", component: DictionaryPage },
  { path: "/kit/:uuid",   name: "kits",        component: KitPage, props: true, meta: { title: "Набор" } },
  { path: "/kit/new",     name: "kitNew",      component: KitPage, props: { draft: true }, meta: { title: "Новый набор" } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
