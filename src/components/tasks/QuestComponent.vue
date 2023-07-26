<script setup lang="ts">
const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Friday"];

import { Task } from '@/models/task';
import { useQuestsStore } from '@/stores/quests_store';
import { usePlayerStore } from '@/stores/player_store';
import { useTasksStore } from '@/stores/tasks/tasks';
var questsStore = useQuestsStore();
var tasksStore = useTasksStore();



function getDayOfTheWeek(day: number) {
    return daysOfTheWeek[day + 1];
}
function selectTask(monster: Task, index : number) {
    questsStore.remove(index);
    tasksStore.add(monster);
}

defineProps({
    quest: {
        type: Task,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    }
})
var player = usePlayerStore();
</script>
<template>
    <div  class="w-auto h-max shadow-md bg-white rounded-2xl py-5 px-10 ">

        <div class="flex justify-between">
            <div>
                <h1 class="text-green-700 font-bold">{{ quest.title }}</h1>
                <p class="text-black">{{ quest.description }}</p>
            </div>
            <div>
                <h1 class="text-black">
                    <span class="font-black text-red-500"> {{ player.calculateXP(quest) }} </span>xp
                </h1>
                <h1 class="text-black">
                    <span class="font-black text-blue-700"> {{ player.calculateCompletionTime(quest) }}
                    </span>sec
                </h1>
            </div>
        </div>
        <h1 class="text-black"><span class="font-black">Due date: </span>
            <span v-if="quest.dueDate != undefined">
                {{ getDayOfTheWeek(quest.dueDate.getDay()) }}, {{ quest.dueDate.toLocaleString() }}
            </span>
        </h1>
        <div class="flex flex-row justify-end pt-5">
            <div class="w-4">
            </div>
            <button id="show-modal" @click="selectTask(quest, index)"
                class="w-max h-max px-4 py-2 rounded-md bg-green-500 hover:bg-green-400 active:bg-green-600">
                <h1 class="text-black font-bold select-none">Accept</h1>
            </button>
        </div>
    </div>
    <div class="h-2" />
</template>