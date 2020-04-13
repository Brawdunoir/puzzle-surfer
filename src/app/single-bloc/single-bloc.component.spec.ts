import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBlocComponent } from './single-bloc.component';

describe('SingleBlocComponent', () => {
  let component: SingleBlocComponent;
  let fixture: ComponentFixture<SingleBlocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBlocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
