<script setup lang="ts">
import MonsterComponent from '@/components/tasks/MonsterComponent.vue';
import { useMonstersStore } from '@/stores/monsters_store';
var monstersStore = useMonstersStore();

</script>

<template>
  <main>
    <div v-if="monstersStore.monsters.length == 0" class="w-auto h-auto grid place-items-center">
        <h1>There are no monsters</h1>
    </div>
      <ul v-else v-for="(monster, index) in monstersStore.monsters" :key="monster.id"  class="list-none">
        <MonsterComponent :monster="monster" :index="index"/>
      </ul>
  </main>
</template>
