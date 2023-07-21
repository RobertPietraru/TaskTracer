import { test, expect, describe, beforeEach, it, } from "vitest";
import { Task, TaskType, useGameStore } from '@/stores/game'
import { setActivePinia, createPinia } from 'pinia'
import exp from "constants";
describe('Game state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('tasks by user', () => {
    it('creates a user task properly', () => {
      const game = useGameStore()
      var task = new Task("a", "potato", "potato", new Date(), 0, TaskType.userCreated, 0);
      game.createTask("potato", "potato", new Date());
      task.id = game.tasks[0].id;
      expect(game.tasks[0]).toEqual(task);
    }),

      it('starts completion on the user task', () => {
        const game = useGameStore()
        game.startTaskCompletion(game.tasks[0]);
        expect(game.jobs.length).toEqual(1);
      }),

      it('marks user task as complete', () => {
        const game = useGameStore()
        expect(game.jobs.length).toEqual(1);
        game.markTaskAsComplete(game.jobs[0], new Date());
        expect(game.tasks.length).toEqual(0);
      })
    it('is empty after testing', () => {
      const game = useGameStore()
      expect(game.tasks.length).toEqual(0);
      expect(game.waiting.monsters.length).toEqual(0);
      expect(game.waiting.quests.length).toEqual(0);
      expect(game.jobs.length).toEqual(0);
    })
  })

  describe('quest and monster', () => {
    it('creates a waiting task properly', () => {
      const game = useGameStore()
      game.generateNewTask();
      expect(game.waiting.monsters.length == 1 || game.waiting.quests.length == 1).toEqual(true);
    })

    it('select task', () => {
      const game = useGameStore()
      var task: Task = game.waiting.monsters[0] ?? game.waiting.quests[0];
      game.selectTask(task);
      expect(game.waiting.monsters.length).toEqual(0);
      expect(game.waiting.quests.length).toEqual(0);
      expect(game.tasks.length).toEqual(1);
    })

    it('start waiting task completion', () => {
      const game = useGameStore()
      expect(game.jobs.length).toEqual(0);
      game.startTaskCompletion(game.tasks[0]);
      expect(game.jobs.length).toEqual(1);
    })

    it('can mark tasks after completion after testing', async () => {
      const game = useGameStore()
      var date = new Date();
      date.setSeconds(date.getSeconds() + game.jobs[0].durationInSeconds());
      var marked = game.markTaskAsComplete(game.jobs[0], date);
      expect(marked).toEqual(true);
    })
  })
}) 