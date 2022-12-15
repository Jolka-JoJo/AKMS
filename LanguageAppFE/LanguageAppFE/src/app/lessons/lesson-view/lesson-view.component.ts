import { AddRuleToLessonDialogComponent } from './../../rules/add-rule-to-lesson-dialog/add-rule-to-lesson-dialog.component';
import { UserService } from 'src/app/services/user/user.service';
import { AddRuleToLessonRequest, AddTaskToLessonRequest, AddUserToLessonRequest, LessonStatus, LessonStatusTranslated, RemoveRuleFromLessonRequest, RemoveTaskFromLessonRequest, RemoveUserFromLessonRequest } from './../../interfaces/lesson';
import { LessonsService } from './../../services/lesson/lessons.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Rule } from 'src/app/interfaces/rule';
import { RuleService } from 'src/app/services/rule/rule.service';

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
    private ruleService: RuleService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public userService: UserService) {
      this.userRole = this.userService.getUserRole();
    }

    lessonId!: number;
    lesson!: LessonResponse;
    update: boolean = false;
    statuses = LessonStatusTranslated;
    status!: string;
    @ViewChild(MatPaginator) paginator1!: MatPaginator;
    @ViewChild(MatPaginator) paginator2!: MatPaginator;
    @ViewChild(MatPaginator) paginator3!: MatPaginator;
    dataSourceTasks?: MatTableDataSource<LesssonTask>;
    dataSourceStudent?: MatTableDataSource<user>;
    dataSourceRule?: MatTableDataSource<Rule>;
    pageEvent?: PageEvent;
    displayedColumns?: string[] = ['Nr', 'Task', 'TaskContent', 'Mistakes', 'Delete'];
    displayedColumnsStudent?: string[] = ['Nr', 'Student', 'Status', 'Delete'];
    displayedColumnsRules?: string[] = ['Nr', 'Rule', 'RuleContent', 'Delete'];
    lessonStudents?: user[];
    userRole!: string;

    lessonUpdatingForm = this.formBuilder.group({
      lessonTitle: ['', Validators.required]
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
        this.dataSourceStudent.paginator = this.paginator2;
      });
  }

  getLesson(){
    this.lessonService.getLesson(this.lessonId).subscribe(response =>
      {
        this.lesson = response;
        this.dataSourceTasks = new MatTableDataSource<LesssonTask>(this.lesson.tasks);
        this.dataSourceTasks.paginator = this.paginator1;

        this.dataSourceRule = new MatTableDataSource(this.lesson.rules);
        this.dataSourceRule.paginator = this.paginator3;
      });
  }

  onUpdate(){
    var formData = new FormData();
    formData.append('lessonTitle',  this.lessonUpdatingForm.value.lessonTitle!);
    formData.append('lessonId', this.lessonId!.toString());
    this.lessonService.updateLesson(this.lessonId, formData).subscribe((response: any) =>
    {
      this.lesson = response;
    });
    this.update = false;
  }

  updateOpen(){
    this.update = true;
    this.lessonUpdatingForm.controls['lessonTitle'].setValue(this.lesson.lessonTitle);
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
    var idsToFilter: string[] = [];
    this.lessonStudents!.forEach(x => idsToFilter.push(x.Id!));
    const dialogRef = this.dialog.open(AddStudentToLessonDialogComponent, {
      data: {
        idsToFilter: idsToFilter
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.length > 0){
        var data: AddUserToLessonRequest ={
          lessonId: this.lessonId,
          usersIds: result.map((value:any) => value.Id)
        };
       this.lessonService.addUsersToLesson(data).subscribe(
        () =>{
         this.lessonService.getLessonStudents(this.lessonId)
          .subscribe(res => {
            this.lessonStudents = res;
            this.dataSourceStudent = new MatTableDataSource(this.lessonStudents);
          });
       })
      }
    });
  }

  applyFilter(dataSource: any, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource!.filter = filterValue.trim().toLowerCase();

    if (dataSource!.paginator) {
      dataSource!.paginator.firstPage();
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

        this.dataSourceStudent = new MatTableDataSource<user>(this.lessonStudents);
        this.dataSourceStudent.paginator = this.paginator2;
      }))
  }

  openRulesDialog(){
    var idsToFilter: number[] = []
    this.lesson.rules!.forEach(x => idsToFilter.push(x.RuleId!));
    const dialogRef = this.dialog.open(AddRuleToLessonDialogComponent, {
      data: {
        idsToFilter: idsToFilter
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.length > 0){
        var request: AddRuleToLessonRequest = {
          lessonId: this.lessonId,
          rulesIds: result.map((x:any) => x.RuleId)
        }
        this.lessonService.addRuleToLesson(request).subscribe( () =>
           this.getLesson()
        );
      }
    });
  }

  removeRule(ruleId: number){
    var request:RemoveRuleFromLessonRequest = {
      ruleId: ruleId,
      lessonId: this.lessonId
    }
    this.lessonService.removeRuleFromLesson(request).subscribe(() =>
      this.lessonService.getLesson(this.lessonId).subscribe(res => {
        this.lesson = res;
        this.dataSourceRule = new MatTableDataSource(this.lesson.rules);
        this.dataSourceRule.paginator = this.paginator3;
      }))
  }

  completedCount(){
    return this.lessonStudents!.filter(x => x.status === 2).length;
  }
}
