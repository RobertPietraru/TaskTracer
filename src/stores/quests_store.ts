import { TaskType, Task } from '@/models/task'
import { generateUUID, randomNumber } from '@/utils';
import { defineStore } from 'pinia'


const possibleQuests = [
    {
        title: "Touch some grass",
        description: "Stop playing coding in JavaScript (terrible language) and touch some grass"
    },
]

export const useQuestsStore = defineStore('quests', {
    state: () => {
        return {
            quests: [] as Task[],
        }
    },
    actions: {
        create(level: number) {
            var monsterIndex = randomNumber(0, possibleQuests.length - 1);
            var difficulty = level * randomNumber(1, 10);
            /// * 1000 to transform from seconds to miliseconds
            var duedate = new Date(new Date().getTime() + randomNumber(10, 50) * difficulty * 1000);
            this.quests.push(new Task(generateUUID(), possibleQuests[monsterIndex].title, possibleQuests[monsterIndex].description, duedate, TaskType.monster, difficulty));
        },

        remove(index: number) {
            this.quests.splice(index, 1);
        },

        createForNextLevel(level: number) {

            var monsters = randomNumber(1, 5);
            for (let i = 0; i < monsters; i++) {
                this.create(level);
            }

        }
    },



})