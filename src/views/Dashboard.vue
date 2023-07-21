<script setup lang="ts">
import { useGameStore } from '@/stores/game'
const game = useGameStore()

// <!-- <div class="flex" >
//     <!-- <button @click="game.increment()">Add</button> -->
//     <div class="flex-0">
//       <h1 class="">{{ game.userName }} • {{ game.userLevel }}</h1>
//       <h1>{{ game.userXP }} </h1>
//       <h1>{{ game.inventory }} </h1>
//     </div>

//     <div class="grow p-6 max-w-md  mx-0 bg-slate-500 rounded-xl shadow-lg flex items-center space-x-4">
//       <div>
//         <div class="text-xl font-medium">Tasks</div>
//         <p>These are all the tasks you need to do</p>
//       </div>
//     </div>
//     <!-- <input v-model="game.taskName"> -->
//     <!-- <h1>Current count: {{ game.count }}</h1> -->
//     <!-- <h1>Current name: {{ game.taskName }}</h1> -->
//     <!-- <li v-for="item in items"> -->
//     <!-- {{ item.message }} -->
//     <!-- </li> -->
//   </div> -->
</script>

<template>

  <div class="flex bg-cover">
  <div class="flex-none w-14 h-14 bg-blue-50 ">
    01
  </div>
  <div class="grow h-14 bg-red-500 ">
    02
  </div>
  <div class="flex-none w-14 h-14 ">
    03
  </div>
</div>

</template>

