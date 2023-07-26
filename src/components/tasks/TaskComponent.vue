
<script setup lang="ts">

import { Task } from '@/models/task';
import { usePlayerStore } from '@/stores/player_store';
import { useTaskEditingStore } from '@/stores/tasks/task_edit';
import { useTasksStore } from '@/stores/tasks/tasks';
import StartButton from '@/components/tasks/StartButton.vue'


const daysOfTheWeek = ["Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"];

function getDayOfTheWeek(day: number) {
    return daysOfTheWeek[day + 1];
}

defineProps({
    task: {
        type: Task,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    }
})
var player = usePlayerStore();
var tasksStore = useTasksStore();
var taskEditingStore = useTaskEditingStore();
</script>
<template>
    <div class="w-auto h-max shadow-md bg-white rounded-2xl py-5 px-10 ">

        <div class="flex justify-between">
            <div>
                <h1 class="text-green-700 font-bold">{{ task.title }}</h1>
                <p class="text-black">{{ task.description }}</p>
            </div>
            <div>
                <h1 class="text-black">
                    <span class="font-black text-red-500"> {{ player.calculateXP(task) }} </span>xp
                </h1>
                <h1 class="text-black">
                    <span class="font-black text-blue-700"> {{ player.calculateCompletionTime(task) }}
                    </span>sec
                </h1>
            </div>
        </div>

        <h1 class="text-black"><span class="font-black">Termen Limita: </span>
            <span v-if="task.dueDate != undefined">
                {{ getDayOfTheWeek(task.dueDate.getDay()) }}, {{ task.dueDate.toLocaleString() }}
            </span>
        </h1>
        <div class="flex flex-row justify-end pt-5">
            <StartButton :task="task" :xp="player.calculateXP(task)" :completion-time="player.calculateCompletionTime(task)" :index="index"/>
            <div class="w-4">
            </div>
            <button v-if="task.isUserCreated()" id="show-modal" @click="taskEditingStore.showEditModal(task, index)"
                data-modal-target="defaultModal" data-modal-toggle="defaultModal"
                class="w-max h-max px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600">
                <h1 class="text-black font-bold select-none">Edit</h1>
            </button>
            <div class="w-4">
            </div>
            <button @click="tasksStore.removeAt(index)"
                class="w-max h-max px-4 py-2 rounded-md bg-red-500 hover:bg-red-400 active:bg-red-600">
                <h1 v-if="task.isUserCreated()" class="text-black font-bold select-none">Delete</h1>
                <h1 v-else class="text-black font-bold select-none">Give up</h1>
            </button>
        </div>
    </div>
    <div class="h-2" />
</template>