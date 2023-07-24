import { CompletionJob } from '@/models/job';
import type { Task } from '@/models/task';
import { defineStore } from 'pinia'

export const useJobsStore = defineStore('jobs', {
  state: () => {
    return {
      jobs : new Map() as Map<string, CompletionJob>
    }
  },
  actions: {
    create(task : Task, time : number, xp : number) {
      if (this.jobs.has(task.id)) return;
      this.jobs.set(task.id, CompletionJob.create(task.id, time, xp));
    },

    remove(id : string) {
      this.jobs.delete(id);
    },
  },
})