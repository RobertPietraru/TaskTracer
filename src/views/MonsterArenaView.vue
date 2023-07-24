<script setup lang="ts">
import { useGameStore } from '@/stores/game';
var game = useGameStore();
</script>

<template>
  <main>
    <div>
      <ul v-for="task in game.waiting.monsters" class="list-none">
          <h1>title: {{ task.title }}</h1>
          <h1>description: {{ task.description }}</h1>
          <h1>difficulty: {{ task.difficulty }}</h1>
          <h1>due: {{ task.dueDate }}</h1>
      </ul>
    </div>
  </main>
</template>
