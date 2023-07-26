import { CompletionJob } from '@/models/job';
import type { Task } from '@/models/task';
import { defineStore } from 'pinia'

export const useJobsStore = defineStore('jobs', {
  state: () => {
    return {
      jobs : [] as CompletionJob[]
    }
  },
  actions: {
    create(task : Task, time : number, xp : number) {
      this.jobs.push(CompletionJob.create(task.id, time, xp));
    },

    remove(index : number) {
      this.jobs.splice(index, 1);
    },
    jobFor(task : Task){
      for (let i = 0; i < this.jobs.length; i++) {
        if (this.jobs[i].taskId == task.id) return this.jobs[i];
      }
      return undefined;
    },

    hasJobFor(task : Task) {
      return this.jobFor(task) != undefined

      
    }
  },
})