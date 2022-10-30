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

  constructor(private lessonService: LessonsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.lessonService.getAllLessons().subscribe(res => this.lessons = res);
  }

  onSubmit(){
    var formData = new FormData();
    formData.append('lessonTitle', this.lessonForm.value.lessonTitle!);

    this.lessonService.addLesson(formData).subscribe(response => this.lessons = response);
    this.lessonForm.reset();

  }
  onDelete(id: number){
    this.lessonService.deleteLesson(id).subscribe(response=> this.lessons = response);
  }
}
