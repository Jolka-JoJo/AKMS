import { Rule } from './rule';
import { user } from '../models/task/user.module';
import { LesssonTask } from './../models/task/task.module';

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
  tasks?: LesssonTask[];
  students?: user[];
  rules?: Rule[];
}

export interface AddTaskToLessonRequest{
  lessonId: number,
  tasksIds: number[]
}

export interface RemoveTaskFromLessonRequest{
  lessonId: number,
  taskId: number
}

export interface AddUserToLessonRequest{
  lessonId: number,
  usersIds: string[]
}

export interface RemoveUserFromLessonRequest{
  lessonId: number,
  userId: string
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

export interface AddRuleToLessonRequest{
  lessonId: number,
  rulesIds: number[]
}

export interface RemoveRuleFromLessonRequest{
  lessonId: number,
  ruleId: number
}
