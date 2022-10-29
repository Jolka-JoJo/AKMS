export interface LesssonTask{
  taskId?: number,
  taskTitle: string,
  taskContent?: string,
  taskType?: number,
  taskImage?: string
}

export const taskType ={
  1: "Vieno pasirinkimo atsakymas",
  2: "Vieno pasirinkimo atsakymas",
  3: "Daug pasirinkimų atsakymas"
}
