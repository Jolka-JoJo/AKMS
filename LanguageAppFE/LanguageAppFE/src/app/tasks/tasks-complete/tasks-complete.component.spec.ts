import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCompleteComponent } from './tasks-complete.component';

describe('TasksCompleteComponent', () => {
  let component: TasksCompleteComponent;
  let fixture: ComponentFixture<TasksCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
