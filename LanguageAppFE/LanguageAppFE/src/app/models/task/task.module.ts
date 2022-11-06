export interface LesssonTask{
  taskId?: number,
  taskTitle: string,
  taskContent?: string,
  taskType?: number,
  taskImage?: string
  position?: number;
}

export const taskType = {
  1: "Vieno pasirinkimo atsakymas",
  2: "Vieno pasirinkimo atsakymas",
  3: "Daug pasirinkimų atsakymas"
}

export interface userTasksDTO{
  userId?: string,
  tasksToFilter?: number[]
}

