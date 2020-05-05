import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyfocusComponent } from './whyfocus.component';

describe('WhyfocusComponent', () => {
  let component: WhyfocusComponent;
  let fixture: ComponentFixture<WhyfocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyfocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyfocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
