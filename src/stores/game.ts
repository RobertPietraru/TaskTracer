import { defineStore } from 'pinia'
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function generateUUID(): string { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;//random number between 0 and 16
    if (d > 0) {//Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {//Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

interface TaskCloning {
  id?: string,
  title?: string,
  description?: string,
  dueDate?: Date,
  xp?: number,
  type?: TaskType,
  difficulty?: number,
}

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
    var milEndDate: number = this.endDate.valueOf();
    var milStartDate: number = this.startDate.valueOf();
    var diffInSeconds = (milEndDate - milStartDate) / 1000
    if (diffInSeconds < 0) { diffInSeconds = -diffInSeconds }
    return diffInSeconds;
  }

  /// duration in seconds, ok?
  static create(taskId: string, duration: number, xp: number,) {
    let currentDate = new Date();
    let endDate = new Date();
    endDate.setSeconds(endDate.getSeconds() + duration)

    return new CompletionJob(generateUUID(), taskId, currentDate, endDate, xp);

  }
}
export enum TaskType { monster, quest, userCreated, }
export class Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | undefined;
  xp: number;
  type: TaskType;
  difficulty: number;


  constructor(id: string, title: string, description: string, dueDate: Date | undefined, xp: number, type: TaskType, difficulty: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.xp = xp;
    this.type = type;
    this.difficulty = difficulty;
  }

  isUserCreated(){
    return this.type === TaskType.userCreated;

  }

  copyWith(taskInterface: TaskCloning) {
    return new Task(
      taskInterface.id ?? this.id,
      taskInterface.title ?? this.title,
      taskInterface.description ?? this.description,
      taskInterface.dueDate ?? this.dueDate,
      taskInterface.xp ?? this.xp,
      taskInterface.type ?? this.type,
      taskInterface.difficulty ?? this.difficulty,
    );
  }

  static createRandom(type: TaskType) {
    var xp = randomInt(10, 100);
    return new Task(generateUUID(), "A title", "descrption", new Date('1995-12-17T03:24:00'), xp, type, xp / 10);
  }

  static createWith(title : string, description :string, duedate : Date | undefined) {
    return new Task(generateUUID(), title,description, duedate, 0, TaskType.userCreated, 0);
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
        level: 0.0,
        xp: 0.0,
        inventory: [new Artifact("asdf", "asdf", 12, ArtifactType.speed), new Artifact("asdf", "asdf", 12, ArtifactType.speed), new Artifact("asdf", "asdf", 12, ArtifactType.speed), new Artifact("asdf", "asdf", 12, ArtifactType.speed), new Artifact("asdf", "asdf", 12, ArtifactType.speed)] as Artifact[],
        perks: {
          totalSpeedBoost: 1,
          totalXPBoost: 1,
        }
      },
      tasks: [] as Task[],
      jobs: [] as CompletionJob[],
      waiting: {
        quests: [] as Task[],
        monsters: [] as Task[]
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

    editUserTask(task: Task, title: string, description: string, duedate: Date | undefined) {
      if (task.type != TaskType.userCreated) return;
      var index = this.tasks.indexOf(task);
      var newTask = this.tasks[index].copyWith({
        title: title,
        description: description,
        dueDate: duedate,
      });
      this.tasks[index] = newTask;

    },

    addArtifact(artifact: Artifact) {
      this.player.inventory.push(artifact);
      if (artifact.type == ArtifactType.speed) {
        this.player.perks.totalSpeedBoost += artifact.value;
      } else {
        this.player.perks.totalXPBoost += artifact.value;
      }
    },

    /// if the task is not user created, then it has a level of difficulty
    /// option to start completion will only appear on the ones which have a difficulty
    /// otherwise the user will be able to mark it  as complete directly
    calculateCompletionTime(task: Task) {
      return (task.difficulty * 10) / (this.player.perks.totalSpeedBoost == 0 ? 1 : this.player.perks.totalSpeedBoost);


      
    },

    calculateXP(task: Task) { return this.player.perks.totalXPBoost * task.xp; },

    startTaskCompletion(task: Task) {
      var time = this.calculateCompletionTime(task);
      var xp = this.calculateXP(task);
      this.jobs.push(CompletionJob.create(task.id, time, xp));
    },

    deleteTask(task : Task) {
      let indexOf = this.tasks.findIndex(e => e.id == task.id);
      this.tasks.splice(indexOf, 1);
    },

    /// returns false if it's too early, true if it's ok
    markTaskAsComplete(job: CompletionJob, currentTime: Date) {
      if (job.endDate > currentTime) return false;
      this.player.xp += job.xp;
      let indexOfJob = this.jobs.findIndex(e => e.id == job.id);
      if (indexOfJob != undefined) {
        this.jobs.splice(indexOfJob, 1);
      }
      let indexOf = this.tasks.findIndex(e => e.id == job.taskId);
      this.tasks.splice(indexOf, 1);
      return true;
    },

    createTask(title: string, description: string, dueDate: Date | undefined) {
      var x: string = generateUUID();
      this.tasks.push(new Task(x, title, description, dueDate, 0, TaskType.userCreated, 0));
    }
  },
})