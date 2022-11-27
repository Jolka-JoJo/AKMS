import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractiseWordsComponent } from './practise-words.component';

describe('PractiseWordsComponent', () => {
  let component: PractiseWordsComponent;
  let fixture: ComponentFixture<PractiseWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractiseWordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractiseWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
