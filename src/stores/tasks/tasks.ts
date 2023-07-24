import { TaskType, Task } from '@/models/task';
import * as utils from '@/utils';
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => {
    return {
      tasks: [] as Task[],
    }
  },

  actions: {
    create(title : string, description : string, duedate : Date | undefined){
      var id = utils.generateUUID();
      this.tasks.push(Task.createWith(title, description, duedate));
    },
    
    remove(index : number){
        this.tasks.splice(index, 1);
    },

    update(index : number, title: string | undefined, description: string | undefined, duedate: Date | undefined) {
      var task = this.tasks[index];
      if (task.type != TaskType.userCreated) return;

      this.tasks[index]= task.copyWith({
        title: title,
        description: description,
        dueDate: duedate,
      });
    },

    get(){
      return this.tasks;
    }
  },
})