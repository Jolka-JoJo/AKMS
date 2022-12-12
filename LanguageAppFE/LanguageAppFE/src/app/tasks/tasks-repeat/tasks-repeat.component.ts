import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LesssonTask, userTasksDTO } from 'src/app/models/task/task.module';
import { TasksService } from 'src/app/services/task/tasks.service';

@Component({
  selector: 'app-tasks-repeat',
  templateUrl: './tasks-repeat.component.html',
  styleUrls: ['./tasks-repeat.component.scss']
})
export class TasksRepeatComponent implements OnInit {
  form = this.formBuilder.group({
    answer: ['']
  });
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private userService: UserService
    ) { }
  tasks: LesssonTask[] = [];
  taskId!: number;

  progress = 0;
  progressAdd: number = 0;
  incorrectTasks: LesssonTask[] = [];
  correctAnswers: any[] = [];
  nextVisible = false;
  correctAnswer = false;
  tasksEnd =  false;
  userId!: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = params['id'];
     });
     this.getAllTasks();
  }

  getAllTasks(){
    this.userService.getUser().subscribe(res => {
      this.userId = res.Id;
      var data: userTasksDTO ={
        userId: res.Id
      }
      this.tasksService.getAllTasks(data).subscribe((elements)=>{
        var begginTasks:LesssonTask[] = [];
        var endTasks:LesssonTask[] = [];
        var found = false;

        elements.forEach(x =>{
          var temp:LesssonTask = x.Task;
          temp.isHidden = true;
          temp.learned = x.learned;
          if(!found && x.Task.taskId == this.taskId){
            begginTasks.push(temp);
          }
          else{
            endTasks.push(temp);
          }
        });
        this.tasks = begginTasks.concat(endTasks);
        if(this.tasks.length > 0){
          this.tasks[0].isHidden =  false;
        }
      })
    })

  }

  next(i: number){
    this.tasks![i].isHidden = true;
    if(this.tasks![i + 1]){
      this.tasks![i + 1].isHidden = false
    }
    else {
      this.tasksEnd = true
    };
    this.correctAnswer = false;
    this.nextVisible = false;
    this.form.reset();

  }

  submit(index: number){
    this.correctAnswers = this.tasks![index].answers!.filter(x => x.IsCorrect);

    this.correctAnswers.forEach(x => {
      if(x.AnswerContent === this.form.value.answer)
      {
        this.correctAnswer = true;
        this.progress += this.progressAdd;
      }
    });

    if(this.correctAnswer === true)
    {
      const taskId = this.tasks![index].taskId;
      this.tasksService.removeUserFromTask(taskId!, this.userId).subscribe();
    }

    this.nextVisible = true;

  }
  repeat(index: number){
    this.tasks![index].isHidden = false;
    this.correctAnswer = false;
    this.nextVisible = false;
    this.form.reset();

  }

}
