import type { Task } from '@/models/task'
import { defineStore } from 'pinia'

export const useQuestsStore = defineStore('quests', {
    state: () => {
        return {
            quests : new Map() as Map<string, Task>
        }
    },
    actions: {
        create() {},
        delete(id : string) {
            this.quests.delete(id);
        },
    },
})