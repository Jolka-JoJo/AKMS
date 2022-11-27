import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChoiceDialogComponent } from './category-choice-dialog.component';

describe('CategoryChoiceDialogComponent', () => {
  let component: CategoryChoiceDialogComponent;
  let fixture: ComponentFixture<CategoryChoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryChoiceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryChoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
