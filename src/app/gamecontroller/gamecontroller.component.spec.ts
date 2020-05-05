import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamecontrollerComponent } from './gamecontroller.component';

describe('GamecontrollerComponent', () => {
  let component: GamecontrollerComponent;
  let fixture: ComponentFixture<GamecontrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamecontrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamecontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
