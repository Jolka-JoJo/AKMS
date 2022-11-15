import { UserService } from 'src/app/services/user/user.service';
import { AddTaskToLessonRequest, AddUserToLessonRequest, LessonStatus, LessonStatusTranslated, RemoveTaskFromLessonRequest, RemoveUserFromLessonRequest } from './../../interfaces/lesson';
import { LessonsService } from './../../services/lesson/lessons.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/task/tasks.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LessonResponse } from 'src/app/interfaces/lesson';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskToLessonDialogComponent } from '../add-task-to-lesson-dialog/add-task-to-lesson-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { LesssonTask } from 'src/app/models/task/task.module';
import { AddStudentToLessonDialogComponent } from 'src/app/students/add-student-to-lesson-dialog/add-student-to-lesson-dialog.component';
import { user } from 'src/app/models/task/user.module';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.scss']
})
export class LessonViewComponent implements OnInit {

  constructor( private router: Router,
    private route: ActivatedRoute,
    private lessonService: LessonsService,
    private tasksService: TasksService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public userService: UserService) {
      this.userRole = this.userService.getUserRole();
      //this.displayedColumns = ['Nr', 'Task'];
     }

    lessonId!: number;
    lesson!: LessonResponse;
    update: boolean = false;
    statuses = LessonStatusTranslated;
    status!: string;
    dataSource!: MatTableDataSource<LesssonTask>;
    dataSourceStudent?: MatTableDataSource<user>;
    displayedColumns?: string[] = ['Nr', 'Task', 'TaskContent', 'Delete'];
    displayedColumnsStudent?: string[] = ['Nr', 'Student', 'Delete'];
    lessonStudents?: user[];
    userRole!: string;
    //userId!: string;


    lessonUpdatingForm = this.formBuilder.group({
      lessonTitle: ['', Validators.required],
      status: [''],
      // taskId: [''],
    });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.lessonId = params['id'];
     });
     this.getLesson();
     this.lessonService.getLessonStudents(this.lessonId).subscribe(res =>
      {
        this.lessonStudents = res;
        this.dataSourceStudent = new MatTableDataSource(this.lessonStudents);
      });
  }

  getLesson(){
    this.lessonService.getLesson(this.lessonId).subscribe(response =>
      {
        this.lesson = response;
        this.dataSource = new MatTableDataSource(this.lesson.tasks);

        this.status = LessonStatusTranslated[response.status! as keyof typeof this.statuses];
        const statusStyles = document.getElementById('lessonStatus');
        if(statusStyles){
          switch (this.status){
            case this.statuses[1]:
              statusStyles.style.backgroundColor = "rgba(255, 242, 0, 0.8)";
              break;
            case this.statuses[2]:
              statusStyles.style.backgroundColor = "rgba(0, 128, 0, 0.8)"
              break;
            case this.statuses[3]:
              statusStyles.style.backgroundColor = "grey"
              break;
          }
        }
      });
  }

  onUpdate(){
    var formData = new FormData();
    formData.append('lessonTitle',  this.lessonUpdatingForm.value.lessonTitle!);
    formData.append('status', (this.lessonUpdatingForm.value.status!));
    formData.append('lessonId', this.lessonId!.toString());
    this.lessonService.updateLesson(this.lessonId, formData).subscribe((response: any) =>
    {
      this.lesson = response;
      this.status = LessonStatusTranslated[this.lesson.status! as keyof typeof this.statuses];
      const statusStyles = document.getElementById('lessonStatus');
      if(statusStyles){
        switch (this.status){
          case this.statuses[1]:
            statusStyles.style.backgroundColor = "rgba(255, 242, 0, 0.8)";
            break;
          case this.statuses[2]:
            statusStyles.style.backgroundColor = "rgba(0, 128, 0, 0.5)"
            break;
          case this.statuses[3]:
            statusStyles.style.backgroundColor = "rgba(128, 128, 128, 0.5)"
            break;
        }
      }
    });
    this.update = false;
  }

  updateOpen(){
    this.update = true;
    this.lessonUpdatingForm.controls['lessonTitle'].setValue(this.lesson.lessonTitle);
    this.lessonUpdatingForm.controls['status'].setValue(this.lesson.status!.toString());
  }

  onDelete(id: number){
    this.userService.getUser().subscribe(res => {

      this.lessonService.deleteLesson(id, res.Id).subscribe(response => this.router.navigate(['/lessons']));
    });
  }

  cancelLessonUpadate(){
    this.update = false;
  }

  openDialog() {
    var idsToFilter: number[] = []
    this.lesson.tasks!.forEach(x => idsToFilter.push(x.taskId!));
    const dialogRef = this.dialog.open(AddTaskToLessonDialogComponent, {
      data: {
        idsToFilter: idsToFilter
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.length > 0){
        this.userService.getUser().subscribe(res =>
        {
          var request: AddTaskToLessonRequest = {
            lessonId: this.lessonId,
            tasksIds: result.map((x:any) => x.taskId)
          }
          this.lessonService.addTasksToLesson(request).subscribe(x =>{
            this.getLesson();
          });
        })
      }

    });
  }
  openStudentDialog(){
    var idsToFilter: number[] = []
    //reikės jau pridėtus userius atfiltruoti
    //this.lesson.tasks!.forEach(x => idsToFilter.push(x.taskId!));
    const dialogRef = this.dialog.open(AddStudentToLessonDialogComponent, {
      data: {
        idsToFilter: idsToFilter
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result && result.length > 0){
        var data: AddUserToLessonRequest ={
          lessonId: this.lessonId,
          usersIds: result.map((value:any) => value.Id)
        };
       this.lessonService.addUsersToLesson(data).subscribe(
        lessonRes =>{
         this.lessonService.getLessonStudents(this.lessonId)
          .subscribe(res => {
            this.lessonStudents = res;
            this.dataSourceStudent = new MatTableDataSource(this.lessonStudents);
          });
       })
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  removeTask(taskId: number){
    var request:RemoveTaskFromLessonRequest = {
      taskId: taskId,
      lessonId: this.lessonId
    }
    this.lessonService.removeTaskFromLesson(request).subscribe(res => this.getLesson());
  }

  removeStudent(userId: string){
    var request:RemoveUserFromLessonRequest = {
      userId: userId,
      lessonId: this.lessonId
    }
    this.lessonService.removeUserFromLesson(request).subscribe(res =>
      this.lessonService.getLessonStudents(this.lessonId).subscribe(studentRes => {
        this.lessonStudents = studentRes;
        this.dataSourceStudent = new MatTableDataSource(this.lessonStudents);
      }))
  }

}
