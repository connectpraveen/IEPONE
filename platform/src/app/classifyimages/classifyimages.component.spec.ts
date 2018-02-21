import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyimagesComponent } from './classifyimages.component';

describe('ClassifyimagesComponent', () => {
  let component: ClassifyimagesComponent;
  let fixture: ComponentFixture<ClassifyimagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifyimagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifyimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
