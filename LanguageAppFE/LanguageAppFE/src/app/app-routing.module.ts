import { TaskViewComponent } from './tasks/task-view/task-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path:'', component:AuthComponent},
  {path:'tasks', component:TasksComponent, canActivate: [AuthGuard]},
  {path:'tasks/:id', component:TaskViewComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
