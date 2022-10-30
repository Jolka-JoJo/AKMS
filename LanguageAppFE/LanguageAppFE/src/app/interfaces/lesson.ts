export interface LessonRequest{
  lessonTitle: string;
  status?: number;
  createdDate?: Date;
  taskId?: number;
}

export interface LessonResponse{
  lessonId: number;
  lessonTitle: string;
  status?: number;
  createdDate?: Date;
  taskId?: number;
}
export enum LessonStatus{
  Draft,
  Published,
  Hidden
}

export const LessonStatusTranslated ={
  1 : "Juodraštis",
  2 : "Paskelbta",
  3 : "Paslėpta"
}
