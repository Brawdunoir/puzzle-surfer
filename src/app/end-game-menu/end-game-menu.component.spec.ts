import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameMenuComponent } from './end-game-menu.component';

describe('EndGameMenuComponent', () => {
  let component: EndGameMenuComponent;
  let fixture: ComponentFixture<EndGameMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndGameMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndGameMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
