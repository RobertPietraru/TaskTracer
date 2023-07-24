<script setup lang="ts">
import TaskCreationModal from '@/components/TaskCreationModal.vue';
import TaskEditingModal from '@/components/TaskEditingModal.vue';
import router from '@/router';
import { usePlayerStore } from '@/stores/player_store';
import { useTaskCreationStore } from '@/stores/tasks/task_creation';
import { useTaskEditingStore } from '@/stores/tasks/task_edit';
import { useTasksStore } from '@/stores/tasks/tasks';

const daysOfTheWeek = ["Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"];
var player = usePlayerStore();
var tasksStore = useTasksStore();
var taskEditingStore = useTaskEditingStore();
var taskCreationStore = useTaskCreationStore();

function getDayOfTheWeek(day: number) {
    return daysOfTheWeek[day + 1];
}

function goToMonsters() {
    router.push('monsters');

}

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
                <h1 class=" text-lg">Level: {{ player.level }} | {{ 100 - player.xp }}xp for the next level</h1>
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
                            <h1 class="text-black font-bold select-none">Monstrii</h1>
                        </button>
                        <div class="w-4">
                        </div>
                        <button id="show-modal" @click="" data-modal-target="defaultModal"
                            data-modal-toggle="defaultModal"
                            class="w-max h-max p-4 rounded-md bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600">
                            <h1 class="text-black font-bold select-none">Misiuni</h1>
                        </button>
                    </div>
                    <ul v-for="(task, index) in tasksStore.get()" :key="task.id" class="list-none">
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
                                <button v-if="task.isUserCreated()" id="show-modal"
                                    @click="taskEditingStore.showEditModal(task, index)" data-modal-target="defaultModal"
                                    data-modal-toggle="defaultModal"
                                    class="w-max h-max px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600">
                                    <h1 class="text-black font-bold select-none">Editeaza</h1>
                                </button>
                                <div class="w-4">
                                </div>
                                <button id="show-modal" @click="tasksStore.remove(index)"
                                    class="w-max h-max px-4 py-2 rounded-md bg-red-500 hover:bg-red-400 active:bg-red-600">
                                    <h1 class="text-black font-bold select-none">Sterge</h1>
                                </button>
                            </div>
                        </div>
                        <div class="h-2" />
                        
                    </ul>
                </div>
                <div class="flex flex-row justify-end py-5">
                    <button id="show-modal" @click="taskCreationStore.showCreationModal()" data-modal-target="defaultModal"
                        data-modal-toggle="defaultModal"
                        class="w-max h-max p-4 rounded-md bg-green-500 hover:bg-green-400 active:bg-green-600">
                        <h1 class="text-black font-bold select-none">Adauga</h1>
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>@/stores/tasks/task_creation