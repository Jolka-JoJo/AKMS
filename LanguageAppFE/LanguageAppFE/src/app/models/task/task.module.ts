import { Answer } from './answer.module';
export interface LesssonTask{
  taskId?: number,
  taskTitle: string,
  taskContent?: string,
  taskType?: number,
  taskImage?: string
  mistakesCount: number;
  position?: number;
  isHidden?: boolean;
  answers?: Answer[];
  learned?: boolean;
}

export const taskType = {
  1: "Tekstinis atsakymas",
  2: "Vieno pasirinkimo atsakymas",
  3: "Daug pasirinkimų atsakymas"
}

export interface userTasksDTO{
  userId?: string,
  tasksToFilter?: number[],
  tasksIds?: number[]
}

