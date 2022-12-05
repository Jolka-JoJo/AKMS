import { user } from 'src/app/models/task/user.module';
import { UserService } from 'src/app/services/user/user.service';
import { LessonResponse } from './../interfaces/lesson';
import { LessonsService } from './../services/lesson/lessons.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  lessonForm = this.formBuilder.group({
    lessonTitle: ['', Validators.required]
  });
  lessons:LessonResponse[] = [];
  userId!:string;
  userRole!: string;

  dataSource!: MatTableDataSource<LessonResponse>;
  displayedColumns?: string[] = ['Nr', 'Lesson', 'Actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private lessonService: LessonsService, private formBuilder: FormBuilder, private userService:UserService) { }

  ngOnInit(){
    this.userService.getUser().subscribe(user =>{
      this.userId = user.Id;
      this.userRole = this.userService.getUserRole();
      this.lessonService.getAllLessons(user.Id).subscribe((res:any) => {
        this.lessons = res;
        this.dataSource = new MatTableDataSource<LessonResponse>(this.lessons);
        this.dataSource.paginator = this.paginator;
      });
    })
  }

  onSubmit(formDirective: FormGroupDirective){
    var formData = new FormData();
    formData.append('lessonTitle', this.lessonForm.value.lessonTitle!);
    formData.append('userId', this.userId!);

    this.lessonService.addLesson(formData).subscribe(response =>{
      this.lessons = response;
      this.dataSource = new MatTableDataSource<LessonResponse>(this.lessons);
      this.dataSource.paginator = this.paginator;
    });
    this.lessonForm.reset();
    formDirective.resetForm();

  }

  onDelete(id: number){
    this.lessonService.deleteLesson(id, this.userId).subscribe(response =>
      {
        this.lessons = response;
        this.dataSource = new MatTableDataSource<LessonResponse>(this.lessons);
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
}
