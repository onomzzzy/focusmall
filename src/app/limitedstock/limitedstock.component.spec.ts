import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitedstockComponent } from './limitedstock.component';

describe('LimitedstockComponent', () => {
  let component: LimitedstockComponent;
  let fixture: ComponentFixture<LimitedstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitedstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitedstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
