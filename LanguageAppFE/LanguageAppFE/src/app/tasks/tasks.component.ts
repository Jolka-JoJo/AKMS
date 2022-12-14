import { LesssonTask, taskType, userTasksDTO } from './../models/task/task.module';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, RequiredValidator, Validators } from '@angular/forms';
import { TasksService } from '../services/task/tasks.service';
import { UserService } from '../services/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy  {
  lesssonTasks: LesssonTask[] =[];
  updateTaskId: number | undefined;
  taskTypes = taskType;
  userId!: string;
  userRole!: string;
  dataSource!: MatTableDataSource<LesssonTask>;
  displayedColumns: string[] = ['Nr', 'Task', 'TaskContent', 'Delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  taskAddingForm = this.formBuilder.group({
    taskTitle: new FormControl('', Validators.required),
    taskContent: new FormControl(''),
    taskType: new FormControl(''),
    file:  [null],
  });

  constructor(private tasksService: TasksService, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   this.getAllTasks();
   this.userService.isUserTeacher();
  }

  ngOnDestroy(): void {
  }

  getAllTasks(){
    this.userService.getUser().subscribe(res => {
      this.userRole = this.userService.getUserRole();
      if(this.userRole === 'Mokytojas'){
        this.displayedColumns = ['Nr', 'Task', 'TaskContent', 'Mistakes', 'Delete'];
      }

      this.userId = res.Id;
      var data: userTasksDTO ={
        userId: res.Id
      }
      this.tasksService.getAllTasks(data).subscribe((elements)=>{
        elements.forEach(x =>{

          var temp:LesssonTask = x.Task;
          this.lesssonTasks.push(temp);

        });
        this.dataSource = new MatTableDataSource<LesssonTask>(this.lesssonTasks);
        this.dataSource.paginator = this.paginator;
      })
    })

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.taskAddingForm.patchValue({
        file: file
      });
    }
  }

  onSubmit(formDirective: FormGroupDirective){
    var formData = new FormData();

    formData.append('file',  this.taskAddingForm.get('file')!.value!);
    formData.append('taskTitle', this.taskAddingForm.value.taskTitle!);
    formData.append('taskContent', this.taskAddingForm.value.taskContent!);
    formData.append('taskType', this.taskAddingForm.value.taskType!);
    formData.append('userId', this.userId)

    this.tasksService.addTask(formData).subscribe(response=>{
      this.lesssonTasks = response;
      this.dataSource = new MatTableDataSource<LesssonTask>(this.lesssonTasks);
      this.dataSource.paginator = this.paginator;
    });

    this.taskAddingForm.reset();
    formDirective.resetForm();

    const fileInput = <HTMLInputElement>document.querySelector('ngx-mat-file-input') as any;
    fileInput.value = null;

  }

  onDelete(id: number){
    this.tasksService.deleteTask(id, this.userId).subscribe(response=> {
      this.lesssonTasks = response;
      this.dataSource = new MatTableDataSource<LesssonTask>(this.lesssonTasks);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  maxMistakesCountTask(){
    const mistakesCount: number[] = this.lesssonTasks.map(x =>x.mistakesCount);
    if(mistakesCount.length > 0){
      var max = mistakesCount.reduce((a, b)=>Math.max(a, b));
      return this.lesssonTasks.find(x => x.mistakesCount === max)!.taskContent;
    }
    return "";
  }
}

