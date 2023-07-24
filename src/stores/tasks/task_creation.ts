import { defineStore } from 'pinia'
import type { Task } from '@/models/task';
import { useTasksStore } from './tasks';

export const useTaskCreationStore = defineStore('taskCreation', {
  state: () => {
    return {
      description: "",
      title: "",
      taskToEdit: undefined as (Task | undefined),
      duedate: undefined as (string | undefined),
      isModalShown: false,
    }
  },
  actions: {
    close() {
      this.description = ""; this.title = ""; this.duedate = undefined;
      this.taskToEdit = undefined;
      this.isModalShown = false;
    },

    submitCreation() {
      if (this.title == "" || this.description == "") {
        return;
      }
      var tasks = useTasksStore();
      tasks.create(this.title, this.description, new Date(this.duedate ?? new Date()));
      this.close();
    },

    showCreationModal() {
      this.isModalShown = true;
    },
  },
})