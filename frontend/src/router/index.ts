import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import CatalogPage from "@/pages/CatalogPage.vue"
import DictionaryPage from "@/components/DictionaryBlock.vue"
import KitPage from "@/pages/KitPage.vue"
import ManufacturersPage from "@/pages/ManufacturersPage.vue"
import PalettesPage from "@/pages/PalettesPage.vue"
import CanvasNamesPage from "@/pages/CanvasNamesPage.vue"
import CanvasColorsPage from "@/pages/CanvasColorsPage.vue"
import CanvasSizesPage from "@/pages/CanvasSizesPage.vue"
import SeriesPage from "@/pages/SeriesPage.vue"
import ThreadsPage from "@/pages/ThreadsPage.vue"

const routes: Array<RouteRecordRaw> = [
  { path: "/",                            name: "catalog",       component: CatalogPage, meta: { title: "Каталог"} },
  { path: "/dictionaries",                name: "dictionaries",  component: DictionaryPage },
  { path: "/kit/:uuid",                   name: "kits",          component: KitPage, props: true, meta: { title: "Набор" } },
  { path: "/kit/new",                     name: "kitNew",        component: KitPage, props: { draft: true }, meta: { title: "Новый набор" } },
  { path: "/dictionaries/manufacturers",  name: "manufacturers", component: ManufacturersPage, meta: { title: "Производители" } },
  { path: "/dictionaries/palettes",       name: "palettes",      component: PalettesPage, meta: { title: "Палитры" } },
  { path: "/dictionaries/canvas_names",   name: "canvasNames",   component: CanvasNamesPage, meta: { title: "Виды канвы" } },
  { path: "/dictionaries/canvas_colors",  name: "canvasColors",  component: CanvasColorsPage, meta: { title: "Цвета канвы" } },
  { path: "/dictionaries/canvas_sizes",   name: "canvasSizes",   component: CanvasSizesPage, meta: { title: "Размеры канвы" } },
  { path: "/dictionaries/series",         name: "series",        component: SeriesPage, meta: { title: "Серии" } },
  { path: "/dictionaries/threads",        name: "threads",       component: ThreadsPage, meta: { title: "Нити" } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
