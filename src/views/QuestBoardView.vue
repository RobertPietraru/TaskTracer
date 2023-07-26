<script setup lang="ts">
import MonsterComponent from '@/components/tasks/MonsterComponent.vue';
import QuestComponent from '@/components/tasks/QuestComponent.vue';
import { useQuestsStore } from '@/stores/quests_store';
var questsStore = useQuestsStore();

</script>

<template>
  <main>
    <div v-if="questsStore.quests.length == 0" class="w-auto h-auto grid place-items-center">
        <h1>There are no quests</h1>
    </div>
      <ul v-else v-for="(quest, index) in questsStore.quests" :key="quest.id"  class="list-none">
        <QuestComponent :quest="quest" :index="index"/>
      </ul>
  </main>
</template>
