import { defineStore } from 'pinia'
import { Task } from '@/models/task';
import { useTasksStore } from './tasks';

export const useTaskEditingStore = defineStore('taskEditing', {
  state: () => {
    return {
      description: "",
      title: "",
      duedate: undefined as (string | undefined),
      isModalShown: false,
      taskIndex: -1,
    }
  },
  actions: {
    close() {
      this.description = ""; this.title = ""; this.duedate = undefined; this.isModalShown = false; this.taskIndex = -1;
    },

    submitEdit() {
      var tasks = useTasksStore();
      if (this.title == "" || this.description == "" || this.taskIndex == -1) {
        return;
      }

      var thedate = this.duedate == undefined ? undefined : new Date(this.duedate);
      tasks.update(this.taskIndex,
        this.title == "" ? undefined : this.title,
        this.description == "" ? undefined : this.description,
        thedate
      );

      this.close();
    },

    showEditModal(task: Task, index  : number) {
      this.title = task.title;
      this.description = task.description;
      this.duedate = task.dueDate?.toString();
      this.isModalShown = true;
      this.taskIndex = index;
    },
  },
})
