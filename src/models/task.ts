import { generateUUID, randomNumber } from "@/utils";

export interface TaskCloning {
  id?: string,
  title?: string,
  description?: string,
  dueDate?: Date,
  type?: TaskType,
  difficulty?: number,
}

export enum TaskType { monster, quest, userCreated, }
export class Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | undefined;
  type: TaskType;
  difficulty: number;


  constructor(id: string, title: string, description: string, dueDate: Date | undefined, type: TaskType, difficulty: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.type = type;
    this.difficulty = difficulty;
  }

  isUserCreated() {
    return this.type === TaskType.userCreated;

  }

  copyWith(taskInterface: TaskCloning) {
    return new Task(
      taskInterface.id ?? this.id,
      taskInterface.title ?? this.title,
      taskInterface.description ?? this.description,
      taskInterface.dueDate ?? this.dueDate,
      taskInterface.type ?? this.type,
      taskInterface.difficulty ?? this.difficulty,
    );
  }

  static createWith(title: string, description: string, duedate: Date | undefined) {
    return new Task(generateUUID(), title, description, duedate, TaskType.userCreated, 0);
  }
}

