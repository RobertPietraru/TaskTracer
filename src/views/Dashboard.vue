<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { useTaskCreationStore } from '@/stores/task_creation'
import { ref } from 'vue';
const game = useGameStore()
const taskCreation = useTaskCreationStore();

const daysOfTheWeek = ["Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"];

function getDayOfTheWeek(day: number) {
    return daysOfTheWeek[day + 1];
}

var showModal = ref(false);
function create() {
    if (taskCreation.title == "" || taskCreation.description == "") {
        return;
    }
    game.createTask(taskCreation.title, taskCreation.description, new Date(taskCreation.duedate ?? new Date()));
    close();
}
function close() {

    taskCreation.reset();
    showModal.value = false;

}

</script>

<template>
    <main>
        <div v-if="showModal" @close="close()"
            class="fixed z-40 top-0 left-0  w-full h-full m-0 p-0 bg-slate-950/50 grid place-items-center">
            <div class="w-300 margin-0 p-5 bg-white rounded-md shadow-md modal-container font-sans">
                <form class="w-full max-w-sm">
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                for="inline-full-name">
                                Titlu
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input required v-model="taskCreation.title"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                                id="inline-full-name" type="text" placeholder="Adauga titlu">
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Descriere
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input required v-model="taskCreation.description"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                                id="inline-description" type="text" placeholder="O descriere pe scurt">
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Termen limita
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input v-model="taskCreation.duedate" type="datetime-local" id="date-picker" class="text-black">
                        </div>
                    </div>

                    <div class="md:flex md:items-center">
                        <div class="md:w-1/3"></div>
                        <div class="md:w-2/3 flex justify-end">
                            <button type="submit"
                                class="shadow    hover:bg-red-100 focus:shadow-outline focus:outline-none text-red-500 border-red-500  border-2 font-bold py-2 px-4 rounded"
                                @click="close()">
                                Cancel
                            </button>
                            <div class="w-4"></div>
                            <button type="submit"
                                class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                @click="create()">
                                Adauga
                            </button>
                        </div>
                    </div>
                </form>

            </div>

        </div>

        <div class="grid grid-rows-3 grid-flow-col gap-4 ">
            <div class="row-span-1  rounded-2xl p-4 shadow-lg shadow-gray-300">
                <h1 class=" text-lg font-bold">Player</h1>
                <h1 class=" text-lg">Name: {{ game.player.name }}</h1>
                <h1 class=" text-lg">XP : {{ game.player.xp }}</h1>
                <h1 class=" text-lg">Level: {{ game.player.level }} | {{ 100 - game.player.xp }}xp for the next level</h1>
            </div>

            <div class="rounded-2xl p-4 shadow-lg shadow-white">
                <h1 class="text-lg font-bold">Inventory</h1>
                <div class="grid grid-rows-2 grid-flow-col gap-4 py-5 ">
                    <li v-for="item in game.player.inventory" class="list-none">
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
                        <button id="show-modal" @click="showModal = true" data-modal-target="defaultModal"
                            data-modal-toggle="defaultModal"
                            class="w-max h-max p-4 rounded-md bg-red-500 hover:bg-red-400 active:bg-red-600">
                            <h1 class="text-black font-bold select-none">Monstrii</h1>
                        </button>
                        <div class="w-4">
                        </div>
                        <button id="show-modal" @click="showModal = true" data-modal-target="defaultModal"
                            data-modal-toggle="defaultModal"
                            class="w-max h-max p-4 rounded-md bg-yellow-500 hover:bg-green-400 active:bg-green-600">
                            <h1 class="text-black font-bold select-none">Misiuni</h1>
                        </button>
                    </div>
                    <ul v-for="task in game.tasks" class="list-none" >

                        <div class="w-auto h-max shadow-md bg-white rounded-2xl py-5 px-10 ">
                            <div class="flex justify-between">
                                <div>
                                    <h1 class="text-green-700 font-bold">{{ task.title }}</h1>
                                    <p class="text-black">{{ task.description }}</p>
                                </div>
                                <div>
                                    <h1 class="text-black">
                                        <span class="font-black text-red-500"> {{ game.calculateXP(task) }} </span>xp
                                    </h1>
                                    <h1 class="text-black">
                                        <span class="font-black text-blue-700"> {{ game.calculateCompletionTime(task) }}
                                        </span>sec
                                    </h1>
                                </div>
                            </div>
                            <h1 class="text-black"><span class="font-black">Termen Limita: </span>
                                <span v-if="task.dueDate != undefined">
                                    {{ getDayOfTheWeek(task.dueDate.getDay()) }}, {{ task.dueDate.toLocaleString() }}
                                </span>
                            </h1>

                        </div>
                        <div class="h-2">

                        </div>
                    </ul>
                </div>
                <div class="flex flex-row justify-end py-5">
                    <button id="show-modal" @click="showModal = true" data-modal-target="defaultModal"
                        data-modal-toggle="defaultModal"
                        class="w-max h-max p-4 rounded-md bg-green-500 hover:bg-green-400 active:bg-green-600">
                        <h1 class="text-black font-bold select-none">Adauga</h1>
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>