
<script setup lang="ts">
import { useTaskCreationStore } from '@/stores/tasks/task_creation';
var taskCreation = useTaskCreationStore();
</script>
<template>
    <div v-if="taskCreation.isModalShown"
        class="fixed z-40 top-0 left-0  w-full h-full m-0 p-0 bg-slate-950/50 grid place-items-center">
        <div class="w-300 margin-0 p-5 bg-white rounded-md shadow-md modal-container font-sans">
            <form class="w-full max-w-sm">
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Titlu
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <input required v-model="taskCreation.title"
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                            id="inline-full-name" type="text" placeholder="Add title">
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
                            id="inline-description" type="text" placeholder="Description">
                    </div>
                </div>

                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Due date
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
                            class="shadow hover:bg-red-100 focus:shadow-outline focus:outline-none text-red-500 border-red-500  active:bg-red-600 active:text-white border-2 font-bold py-2 px-4 rounded"
                            @click="taskCreation.close()">
                            Cancel
                        </button>
                        <div class="w-4"></div>
                        <button type="submit"
                            class="shadow bg-green-500 hover:bg-green-400 active:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            @click="taskCreation.submitCreation()">
                            Add
                        </button>
                    </div>
                </div>
            </form>

        </div>
    </div>
</template>