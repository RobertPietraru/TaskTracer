import { Task, TaskType } from '@/models/task'
import { generateUUID, randomNumber } from '@/utils';
import { defineStore } from 'pinia'

const possibleMonsters = [
    {
        title: "The shower monster",
        description: "Stop playing League of Legends and take a shower"
    },
    {
        title: "The shower monster",
        description: "Stop playing League of Legends and take a shower"
    },

    {
        title: "The shower monster",
        description: "Stop playing League of Legends and take a shower"
    },
    {
        title: "The shower monster",
        description: "Stop playing League of Legends and take a shower"
    },
    {
        title: "The shower monster",
        description: "Stop playing League of Legends and take a shower"
    },
]

export const useMonstersStore = defineStore('monsters', {
    state: () => {
        return {
            monsters: [] as Task[]
        }
    },
    actions: {
        create(level: number) {
            var monsterIndex = randomNumber(0, possibleMonsters.length - 1);
            var difficulty = level * randomNumber(1, 10);
            /// * 1000 to transform from seconds to miliseconds
            var duedate = new Date(new Date().getTime() + randomNumber(10, 50) * difficulty * 1000);
            this.monsters.push(new Task(generateUUID(), possibleMonsters[monsterIndex].title, possibleMonsters[monsterIndex].description, duedate, TaskType.monster, difficulty));
        },
        remove(index: number) {
            this.monsters.splice(index, 1);
        },
        /// when the user reaches a new level, run this
        /// creates a random number of monsters
        createForNextLevel(level: number) {
            var monsters = randomNumber(1, 5);
            for (let i = 0; i < monsters; i++) {
                this.create(level);
            }

        }
    },
})