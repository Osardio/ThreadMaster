import {defineStore} from "pinia";

export const useCommonStore = defineStore("commonStore",{
  state: () => {
    return {
      backendUrl: import.meta.env.VITE_BACKEND_URL,
    }
  }
})