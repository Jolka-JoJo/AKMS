
import { TasksComponent } from './tasks/tasks.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatIconModule } from  '@angular/material/icon';
import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatListModule } from  '@angular/material/list';
import { MatButtonModule } from  '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskViewComponent } from './tasks/task-view/task-view.component';
import { TaskUpdateComponent } from './tasks/task-update/task-update.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatMenuModule} from '@angular/material/menu';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthComponent } from './authentication/auth/auth.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonViewComponent } from './lessons/lesson-view/lesson-view.component';
import { UpdateProfileComponent } from './authentication/update-profile/update-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddTaskToLessonDialogComponent } from './lessons/add-task-to-lesson-dialog/add-task-to-lesson-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StudentsComponent } from './students/students/students.component';
import { AddStudentToLessonDialogComponent } from './students/add-student-to-lesson-dialog/add-student-to-lesson-dialog.component';
import { TasksCompleteComponent } from './tasks/tasks-complete/tasks-complete.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskViewComponent,
    TaskUpdateComponent,
    AuthComponent,
    LessonsComponent,
    LessonViewComponent,
    UpdateProfileComponent,
    AddTaskToLessonDialogComponent,
    StudentsComponent,
    AddStudentToLessonDialogComponent,
    TasksCompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    NgbModule,
    MaterialFileInputModule,
    PdfViewerModule,
    MatMenuModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7040"],
        disallowedRoutes: []
      }
    })
    ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
