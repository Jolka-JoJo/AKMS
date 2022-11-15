import { LesssonTask, taskType, userTasksDTO } from './../models/task/task.module';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { TasksService } from '../services/task/tasks.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy  {
  // dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject<any>();
  lesssonTasks: LesssonTask[] =[];
  updateTaskId: number | undefined;
  taskTypes = taskType;
  userId!: string;
  userRole!: string;

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
  // this.dtTrigger.unsubscribe();
  }

  getAllTasks(){
    this.userService.getUser().subscribe(res => {
      this.userRole = this.userService.getUserRole();
      this.userId = res.Id;
      var data: userTasksDTO ={
        userId: res.Id
      }
      this.tasksService.getAllTasks(data).subscribe((elements)=>{
        elements.forEach(x =>{
          var temp:LesssonTask = x.Task;
          temp.learned = x.learned;
          this.lesssonTasks.push(temp);
        });
        console.log(elements)

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

  onSubmit(){
    var formData = new FormData();
    const fileToUpload = this.taskAddingForm.value;

    formData.append('file',  this.taskAddingForm.get('file')!.value!);
    formData.append('taskTitle', this.taskAddingForm.value.taskTitle!);
    formData.append('taskContent', this.taskAddingForm.value.taskContent!);
    formData.append('taskType', this.taskAddingForm.value.taskType!);
    formData.append('userId', this.userId)

    this.tasksService.addTask(formData).subscribe(response=> this.lesssonTasks = response);

    this.taskAddingForm = this.formBuilder.group({
      taskTitle: new FormControl('', Validators.required),
      taskContent: new FormControl(''),
      taskType: new FormControl(''),
      file:  [null],
    });

  }

  onDelete(id: number){
    this.tasksService.deleteTask(id, this.userId).subscribe(response=> this.lesssonTasks = response);
  }

  selectUpdate(task: LesssonTask){
    this.updateTaskId = task.taskId;
  }


}

