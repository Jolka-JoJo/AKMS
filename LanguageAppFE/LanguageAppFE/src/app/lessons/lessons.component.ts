import { user } from 'src/app/models/task/user.module';
import { UserService } from 'src/app/services/user/user.service';
import { LessonResponse } from './../interfaces/lesson';
import { LessonsService } from './../services/lesson/lessons.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  lessonForm = this.formBuilder.group({
    lessonTitle: new FormControl('', Validators.required)
  });
  lessons:LessonResponse[] = [];
  userId!:string;
  constructor(private lessonService: LessonsService, private formBuilder: FormBuilder, private userService:UserService) { }

  ngOnInit(){
    this.userService.getUser().subscribe(user =>{
      this.userId = user.Id;
      this.lessonService.getAllLessons(user.Id).subscribe((res:any) => this.lessons = res);

    })
  }

  onSubmit(){
    var formData = new FormData();
    formData.append('lessonTitle', this.lessonForm.value.lessonTitle!);
    formData.append('userId', this.userId!);

    this.lessonService.addLesson(formData).subscribe(response => this.lessons = response);
    this.lessonForm.reset();

  }
  onDelete(id: number){
    this.lessonService.deleteLesson(id, this.userId).subscribe(response=> this.lessons = response);
  }
}
