import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerAssessmentComponent } from './answer-assessment.component';

describe('AnswerAssessmentComponent', () => {
  let component: AnswerAssessmentComponent;
  let fixture: ComponentFixture<AnswerAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
