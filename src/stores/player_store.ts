import { Artifact, ArtifactType } from '@/models/artifact'
import type { Task } from '@/models/task';
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      name: "Player",
      level: 0.0,
      xp: 0.0,
      inventory: [new Artifact("asdf", "asdf", 12, ArtifactType.speed), new Artifact("asdf", "asdf", 12, ArtifactType.speed), new Artifact("asdf", "asdf", 12, ArtifactType.speed), new Artifact("asdf", "asdf", 12, ArtifactType.speed), new Artifact("asdf", "asdf", 12, ArtifactType.speed)] as Artifact[],
      perks: {
        totalSpeedBoost: 1,
        totalXPBoost: 1,
      }

    }
  },
  actions: {
    calculateCompletionTime(task: Task) {
      return (task.difficulty * 10) / (this.perks.totalSpeedBoost == 0 ? 1 : this.perks.totalSpeedBoost);
    },

    calculateXP(task: Task) { return this.perks.totalXPBoost * task.difficulty; }
  },
})