import { defineStore } from 'pinia'

export const useTimeStore = defineStore('time', {
  state: () => {
    return {
        time : new Date(),
    }
  },
  actions: {
    update() {
        this.time = new Date();
    }
  },
})