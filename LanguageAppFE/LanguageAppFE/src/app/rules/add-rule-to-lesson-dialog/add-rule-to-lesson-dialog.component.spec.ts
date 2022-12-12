import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRuleToLessonDialogComponent } from './add-rule-to-lesson-dialog.component';

describe('AddRuleToLessonDialogComponent', () => {
  let component: AddRuleToLessonDialogComponent;
  let fixture: ComponentFixture<AddRuleToLessonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRuleToLessonDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRuleToLessonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
