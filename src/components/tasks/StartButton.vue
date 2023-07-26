<script setup lang="ts">
import { Task } from '@/models/task';
import { useJobsStore } from '@/stores/jobs_store';
import { usePlayerStore } from '@/stores/player_store';
import { useTasksStore } from '@/stores/tasks/tasks';
import { useTimeStore } from '@/stores/time_store';

var jobsStore = useJobsStore();

var jobsStore = useJobsStore();
var timeStore = useTimeStore();
var playerStore = usePlayerStore();
function beginTask(task: Task, completionTime: number, xp: number) {
    if (jobsStore.hasJobFor(task)) return;
    jobsStore.create(task, completionTime, xp)
}

function markAsComplete(task: Task, index: number, xp: number) {
    if (!jobsStore.hasJobFor(task)) return;
    useTasksStore().removeAt(index)
    playerStore.addXP(xp)
}

/// time in seconds
function formatTime(time : number){
    var roundedTime = ~~time
    
    return `${((~~(roundedTime / 60)).toString()).padStart(2,"0")}:${((~~(roundedTime % 60)).toString()).padStart(2,"0")}`
}

defineProps({
    task: {
        type: Task,
        required: true
    },
    index: {
        type: Number,
        required: true,
    },
    completionTime: {
        type: Number,
        required: true,
    },
    xp: {
        type: Number,
        required: true,
    }
});


</script>
<template>
    <div v-if="jobsStore.jobFor(task) != undefined">
        <div v-if="jobsStore.jobFor(task)!.timeLeft(timeStore.time) >= 1" @click="beginTask(task, completionTime, xp)"
            class="w-max h-max px-4 py-2 rounded-md bg-blue-300 ">
        <h1 class="text-black font-bold select-none">{{ formatTime(jobsStore.jobFor(task)!.timeLeft(timeStore.time)) }}
            </h1>
        </div>

        <button v-else @click="markAsComplete(task, index, xp)"
            class="w-max h-max px-4 py-2 rounded-md bg-green-500 hover:bg-green-400 active:bg-green-600">
            <h1 class="text-black font-bold select-none">Collect XP</h1>
        </button>
    </div>

    <button v-else @click="beginTask(task, completionTime, xp)"
        class="w-max h-max px-4 py-2 rounded-md bg-green-500 hover:bg-green-400 active:bg-green-600">
        <h1 class="text-black font-bold select-none">Start</h1>
    </button>
</template>