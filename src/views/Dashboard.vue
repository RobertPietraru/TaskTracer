<script setup lang="ts">
import TaskComponent from '@/components/tasks/TaskComponent.vue';
import TaskCreationModal from '@/components/TaskCreationModal.vue';
import TaskEditingModal from '@/components/TaskEditingModal.vue';
import router from '@/router';
import { usePlayerStore } from '@/stores/player_store';
import { useTaskCreationStore } from '@/stores/tasks/task_creation';
import { useTasksStore } from '@/stores/tasks/tasks';
import { watch } from 'vue';
import { useTimeStore } from '@/stores/time_store';

var player = usePlayerStore();
var tasksStore = useTasksStore();
var taskCreationStore = useTaskCreationStore();
var timeStore = useTimeStore();

function goToMonsters() {
    router.push('monsters');
}
function goToQuests() {
    router.push('quests');
}
watch(timeStore, async (newTime, oldTime) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    timeStore.update()
    console.log(timeStore.time);
})
timeStore.update();

</script>

<template>
    <main>
        <TaskEditingModal />
        <TaskCreationModal />
        <div class="grid grid-rows-3 grid-flow-col gap-4 ">
            <div class="row-span-1  rounded-2xl p-4 shadow-lg shadow-gray-300">
                <h1 class=" text-lg font-bold">Player</h1>
                <h1 class=" text-lg">Name: {{ player.name }}</h1>
                <h1 class=" text-lg">XP : {{ player.xp }}</h1>
                <h1 class=" text-lg">Level: {{ player.level }} | {{player.xpToNextLevel()}}xp until the next level</h1>
            </div>

            <div class="rounded-2xl p-4 shadow-lg shadow-white">
                <h1 class="text-lg font-bold">Inventory</h1>
                <div class="grid grid-rows-2 grid-flow-col gap-4 py-5 ">
                    <li v-for="item in player.inventory" class="list-none">
                        <div class="w-max h-max shadow-md shadow-gray-300 rounded-2xl p-5">
                            <h1>
                                {{ item.title }}
                            </h1>
                        </div>
                    </li>
                </div>
            </div>
            <div
                class="row-span-2 col-span-2 w-auto rounded-2xl p-4 shadow-lg shadow-green-500 flex flex-col justify-between">
                <div>
                    <div class="flex flex-row justify-end py-5">
                        <button id="show-modal" @click="goToMonsters()" data-modal-target="defaultModal"
                            data-modal-toggle="defaultModal"
                            class="w-max h-max p-4 rounded-md bg-red-500 hover:bg-red-400 active:bg-red-600">
                            <h1 class="text-black font-bold select-none">Monsters</h1>
                        </button>
                        <div class="w-4">
                        </div>
                        <button id="show-modal" @click="goToQuests()" data-modal-target="defaultModal" data-modal-toggle="defaultModal"
                            class="w-max h-max p-4 rounded-md bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600">
                            <h1 class="text-black font-bold select-none">Quests</h1>
                        </button>
                        <div class="w-4">
                        </div>
                        <button id="show-modal" @click="taskCreationStore.showCreationModal()"
                            data-modal-target="defaultModal" data-modal-toggle="defaultModal"
                            class="w-max h-max p-4 rounded-md bg-green-500 hover:bg-green-400 active:bg-green-600">
                            <h1 class="text-black font-bold select-none">Add</h1>
                        </button>
                    </div>
                    <ul v-for="(task, index) in tasksStore.get()" :key="task.id" class="list-none">
                        <TaskComponent :task="task" :index="index" />
                    </ul>
                </div>

            </div>
        </div>
    </main>
</template>