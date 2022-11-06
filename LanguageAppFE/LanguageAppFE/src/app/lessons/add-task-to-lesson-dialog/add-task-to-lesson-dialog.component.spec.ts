import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskToLessonDialogComponent } from './add-task-to-lesson-dialog.component';

describe('AddTaskToLessonDialogComponent', () => {
  let component: AddTaskToLessonDialogComponent;
  let fixture: ComponentFixture<AddTaskToLessonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskToLessonDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskToLessonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
