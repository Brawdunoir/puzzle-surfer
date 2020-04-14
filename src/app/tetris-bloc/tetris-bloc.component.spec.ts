import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisBlocComponent } from './tetris-bloc.component';

describe('TetrisBlocComponent', () => {
  let component: TetrisBlocComponent;
  let fixture: ComponentFixture<TetrisBlocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetrisBlocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetrisBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
