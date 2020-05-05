import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarddriveComponent } from './harddrive.component';

describe('HarddriveComponent', () => {
  let component: HarddriveComponent;
  let fixture: ComponentFixture<HarddriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarddriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarddriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
