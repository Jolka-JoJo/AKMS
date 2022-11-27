import { PractiseWordsComponent } from './dictionary/practise-words/practise-words.component';
import { DictionaryComponent } from './dictionary/dictionary/dictionary.component';
import { TasksCompleteComponent } from './tasks/tasks-complete/tasks-complete.component';
import { UpdateProfileComponent } from './authentication/update-profile/update-profile.component';
import { TaskViewComponent } from './tasks/task-view/task-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonViewComponent } from './lessons/lesson-view/lesson-view.component';

const routes: Routes = [
  {path:'', component:AuthComponent},
  {path:'tasks', component:TasksComponent, canActivate: [AuthGuard]},
  {path:'tasks/:id', component:TaskViewComponent, canActivate: [AuthGuard]},
  {path:'lessons', component:LessonsComponent, canActivate: [AuthGuard]},
  {path:'lessons/:id', component:LessonViewComponent, canActivate: [AuthGuard]},
  {path:'lessons/:id/complete', component:TasksCompleteComponent, canActivate: [AuthGuard]},
  {path:'updateProfile', component:UpdateProfileComponent, canActivate: [AuthGuard]},
  {path:'dictionary', component:DictionaryComponent, canActivate: [AuthGuard]},
  {path:'dictionary/practise', component:PractiseWordsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
