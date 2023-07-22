import { defineStore } from 'pinia'
import { Task } from './game';

export const useTaskCreationStore = defineStore('taskCreation', {
  state: () => {
    return {
        description: "",
        title: "",
        duedate : undefined as (string | undefined),
    }
  },
  actions: {
    reset() {
        this.description = ""; this.title = ""; this.duedate = undefined;
    },

  },
})