import { Artifact, ArtifactType } from '@/models/artifact'
import type { Task } from '@/models/task';
import { randomNumber } from '@/utils';
import { defineStore } from 'pinia'
import { useMonstersStore } from './monsters_store';
import { useQuestsStore } from './quests_store';

export const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      name: "Player",
      xp: 0.0,
      level: 1,
      inventory: [new Artifact("Viteza +1", "Primesti boost viteza", 1, ArtifactType.speed)] as Artifact[],
      perks: {
        totalSpeedBoost: 1,
        totalXPBoost: 1,
      }

    }
  },
  actions: {
    xpToNextLevel(){
      return this.level * 100 - this.xp;
    },
    generateArtifact() {
      var value = randomNumber(1, 10);
      var type = randomNumber(0, 1) ? ArtifactType.speed : ArtifactType.xp;
      var name = `${type == ArtifactType.xp ? "XP +" : "Viteza +"}${value}`
      this.inventory.push(new Artifact(name, "This will help you", value, type));
    },
    calculateCompletionTime(task: Task) {
      return (this.level * 0.5 * task.difficulty * 5) / (this.perks.totalSpeedBoost == 0 ? 1 : this.perks.totalSpeedBoost);
    },

    calculateXP(task: Task) { return this.perks.totalXPBoost * task.difficulty * this.level * 10; },

    addXP(xp: number) { 
      this.xp += xp 
      var xpForNextLevel = this.level * 100;
      var levelsToAdd = ~~(this.xp / xpForNextLevel)
      this.level += levelsToAdd;
      /// so if the user's gonna get to a new level, we want them to get an artefact
      if (levelsToAdd != 0) {
        this.xp = this.xp % (this.level * 100);
        this.generateArtifact();
        useMonstersStore().createForNextLevel(this.level);
        useQuestsStore().createForNextLevel(this.level);
      }
    },
  },
})