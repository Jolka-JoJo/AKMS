import { TasksService } from './../../services/task/tasks.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LessonResponse } from 'src/app/interfaces/lesson';
import { LesssonTask, userTasksDTO } from 'src/app/models/task/task.module';
import { LessonsService } from 'src/app/services/lesson/lessons.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tasks-complete',
  templateUrl: './tasks-complete.component.html',
  styleUrls: ['./tasks-complete.component.scss']
})
export class TasksCompleteComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private taskService: TasksService
  ) { }

  lessonCompleteForm = this.formBuilder.group({
    answer: ['']
  });

  lessonId!: number;
  lesson!: LessonResponse;
  nextVisible = false;
  correctAnswer = false;
  progressAdd!: number;
  progress = 0;
  incorrectTasks: LesssonTask[] = [];
  correctAnswers: any[] = [];
  lessonEnd = false;
  incorrectTasksIds: number[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.lessonId = params['id'];
     });

     this.lessonService.getLesson(this.lessonId).subscribe(response =>
      {
        this.lesson = response;
        this.lesson.tasks!.forEach((value, i) => i!=0 ? value.isHidden = true : value.isHidden = false);
        this.progressAdd = 100 / this.lesson.tasks!.length;
      });
  }

  next(i: number){
    this.lesson.tasks![i].isHidden = true;
    if(this.lesson.tasks![i + 1]){
      this.lesson.tasks![i + 1].isHidden = false
    }
    else {
      this.lessonEnd = true
      if(this.incorrectTasksIds.length > 0){
        this.userService.getUser().subscribe(res =>{
          var temp: userTasksDTO = {
            userId: res.Id,
            tasksIds: this.incorrectTasksIds
          }
          this.taskService.addUserToTask(temp).subscribe();
        })
      }

    };
    this.correctAnswer = false;
    this.nextVisible = false;
    this.lessonCompleteForm.reset();

  }

  submit(index: number){
    this.correctAnswers = this.lesson.tasks![index].answers!.filter(x => x.IsCorrect);

    this.correctAnswers.forEach(x => {
      if(x.AnswerContent === this.lessonCompleteForm.value.answer)
      {
        this.correctAnswer = true;
        this.progress += this.progressAdd;
      }
    });

    if(this.correctAnswer === false)
    {
      var temp = Object.assign({}, this.lesson.tasks![index]);
      temp.isHidden = true;
      this.lesson.tasks!.push(temp);
      this.incorrectTasksIds.push(temp.taskId!);
    }

    this.nextVisible = true;

  }

}
