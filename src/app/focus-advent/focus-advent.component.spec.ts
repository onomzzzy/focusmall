import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusAdventComponent } from './focus-advent.component';

describe('FocusAdventComponent', () => {
  let component: FocusAdventComponent;
  let fixture: ComponentFixture<FocusAdventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusAdventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusAdventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
