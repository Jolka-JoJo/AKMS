import { LessonStatus, LessonStatusTranslated } from './../../interfaces/lesson';
import { LessonsService } from './../../services/lesson/lessons.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/task/tasks.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LessonResponse } from 'src/app/interfaces/lesson';

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
    private formBuilder: FormBuilder) { }

    lessonId!: number;
    lesson!: LessonResponse;
    update: boolean = false;
    statuses = LessonStatusTranslated;
    status!: string;

    lessonUpdatingForm = this.formBuilder.group({
      lessonTitle: ['', Validators.required],
      status: [''],
      // taskId: [''],
    });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.lessonId = params['id'];
     });

    this.lessonService.getLesson(this.lessonId).subscribe(response =>
    {
      this.lesson = response;
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
      this.lesson = response[0];
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
    this.lessonService.deleteLesson(id).subscribe(response => this.router.navigate(['/lessons']));
  }

  cancelLessonUpadate(){
    this.update = false;
  }

}
