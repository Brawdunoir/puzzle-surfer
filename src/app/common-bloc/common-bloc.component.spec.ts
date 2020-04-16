import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonBlocComponent } from './common-bloc.component';

describe('CommonBlocComponent', () => {
  let component: CommonBlocComponent;
  let fixture: ComponentFixture<CommonBlocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonBlocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
