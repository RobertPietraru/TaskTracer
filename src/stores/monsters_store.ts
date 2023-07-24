import type { Task } from '@/models/task'
import { defineStore } from 'pinia'

export const useMonstersStore = defineStore('monsters', {
    state: () => {
        return {
            monsters : new Map() as Map<string, Task>
        }
    },
    actions: {
        create() {},
        delete(id : string) {
            this.monsters.delete(id);
        },
    },
})