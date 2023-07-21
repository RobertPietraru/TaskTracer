// import { ref, computed } from 'vue'
import { randomUUID } from 'crypto';
import { defineStore } from 'pinia'
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;


class CompletionJob {
  id: string;
  taskId: string;
  startDate: Date;
  endDate: Date;
  xp: number;

  constructor(id: string, taskId: string, startDate: Date, endDate: Date, xp: number,) {
    this.id = id;
    this.taskId = taskId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.xp = xp;
  }
  durationInSeconds() {
    var milEndDate : number= this.endDate.valueOf();
    var milStartDate : number= this.startDate.valueOf();
    var diffInSeconds = (milEndDate - milStartDate) / 1000
    if (diffInSeconds < 0){ diffInSeconds = -diffInSeconds}
    return diffInSeconds;
  }

  /// duration in seconds, ok?
  static create(taskId: string, duration: number, xp: number,) {
    let currentDate = new Date();
    let endDate = new Date();
    endDate.setSeconds(endDate.getSeconds() + duration)

    return new CompletionJob(randomUUID(), taskId, currentDate, endDate, xp);

  }
}
let _jobs: CompletionJob[] = [];
let _inventory: Artifact[] = [];
let _tasks: Task[] = [];
let _quests: Task[] = [];
let _monsters: Task[] = [];

export enum TaskType { monster, quest, userCreated, }
export class Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  xp: number;
  type: TaskType;
  difficulty: number;


  constructor(id: string, title: string, description: string, dueDate: Date, xp: number, type: TaskType, difficulty: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.xp = xp;
    this.type = type;
    this.difficulty = difficulty;
  }

  static createRandom(type: TaskType) {
    var xp = randomInt(10, 100);
    return new Task(randomUUID(), "A title", "descrption", new Date('1995-12-17T03:24:00'), xp, type, xp / 10);
  }
}

enum ArtifactType {
  speed,
  xp,
}
class Artifact {
  title: string;
  description: string;
  // based on this we calculate how much xp you'll get, or how faster you will complete tasks
  value: number;
  type: ArtifactType;

  constructor(title: string, description: string, value: number, type: ArtifactType) {
    this.title = title;
    this.description = description;
    this.value = value;
    this.type = type;
  }
}


export const useGameStore = defineStore('game', {
  state: () => {
    return {
      player: {
        name: "Player",
        userLevel: 0,
        userXP: 0,
        inventory: _inventory,
      },
      tasks: _tasks,
      jobs: _jobs,
      waiting: {
        quests: _quests,
        monsters: _monsters
      },
    }
  },
  actions: {
    /// the `give` methods add the respective task to the boards, for the user to select. 
    generateNewTask() {
      var y = randomInt(0, 1);

      if (y === 1) {
        this.waiting.monsters.push(Task.createRandom(TaskType.monster));
        return;
      }
      this.waiting.quests.push(Task.createRandom(TaskType.quest));
    },

    selectTask(task: Task) {
      if (task.type == TaskType.monster) {
        this.waiting.monsters = this.waiting.monsters.filter(obj => { return obj.id != task.id });
      }
      else {
        this.waiting.quests = this.waiting.quests.filter(obj => { return obj.id != task.id });
      }
      this.tasks.push(task);
    },

    /// if the task is not user created, then it has a level of difficulty
    /// option to start completion will only appear on the ones which have a difficulty
    /// otherwise the user will be able to mark it  as complete directly
    calculateTaskCompletionTimeAndXP(task: Task) {
      var totalSpeedValue: number = 0;
      var totalXPValue: number = 0;
      this.player.inventory.forEach((e) => {
        if (e.type == ArtifactType.speed) {
          totalSpeedValue += e.value;
        }
        else {
          totalXPValue += e.value;
        }
      });

      var time = (task.difficulty * 10) / (totalSpeedValue == 0 ? 1 : totalSpeedValue);
      var xp = totalXPValue * task.xp;


      return {
        "time": time,
        "xp": xp,
      }
    },

    startTaskCompletion(task: Task) {
      var response = this.calculateTaskCompletionTimeAndXP(task);
      this.jobs.push(CompletionJob.create(task.id, response.time, response.xp));
    },

    /// returns false if it's too early, true if it's ok
    markTaskAsComplete(job: CompletionJob, currentTime: Date) {
      if (job.endDate > currentTime) return false;
      this.player.userXP += job.xp;
      let indexOfJob = this.jobs.findIndex(e => e.id == job.id);
      if (indexOfJob != undefined) {
        this.jobs.splice(indexOfJob, 1);
      }
      let indexOf = this.tasks.findIndex(e => e.id == job.id);
      this.tasks.splice(indexOf, 1);
      return true;
    },

    createTask(title: string, description: string, dueDate: Date) {
      var x: string = randomUUID();
      this.tasks.push(new Task(x, title, description, dueDate, 0, TaskType.userCreated, 0));
    }
  },
})