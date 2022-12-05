import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksRepeatComponent } from './tasks-repeat.component';

describe('TasksRepeatComponent', () => {
  let component: TasksRepeatComponent;
  let fixture: ComponentFixture<TasksRepeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksRepeatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
