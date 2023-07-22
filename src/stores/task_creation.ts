import { defineStore } from 'pinia'
import { Task, useGameStore } from './game';

enum ModalType { creation, edit }

export const useTaskCreationStore = defineStore('taskCreation', {
  state: () => {
    return {
      description: "",
      title: "",
      taskToEdit: undefined as (Task | undefined),
      duedate: undefined as (string | undefined),
      isModalShown: false,
      type: ModalType.creation,
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
        alert("A field is missing")
        return;
      }
      var game = useGameStore();
      game.createTask(this.title, this.description, new Date(this.duedate ?? new Date()));
      this.close();
    },

    submitEdit() {
      if (this.title == "" || this.description == "" || this.taskToEdit == undefined) {
        return;
      }

      var task = this.taskToEdit;
      var thedate =  this.duedate == undefined ? task.dueDate : new Date(this.duedate);
      var game = useGameStore();
      game.editUserTask(task, this.title == "" ? task.title : this.title,
        this.description == "" ? task.description : this.description,
        thedate
       );
      this.close();
    },

    isCreationMode() {
      return this.type == ModalType.creation;
    },
    showEditModal(task: Task) {
      this.title = task.title;
      this.description = task.description;
      this.duedate = task.dueDate?.toString();

      this.type = ModalType.edit;
      this.isModalShown = true;
      this.taskToEdit = task;
    },
    showCreationModal() {
      this.type = ModalType.creation;
      this.isModalShown = true;
    },



  },
})