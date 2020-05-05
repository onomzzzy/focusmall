import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessariesforyouComponent } from './accessariesforyou.component';

describe('AccessariesforyouComponent', () => {
  let component: AccessariesforyouComponent;
  let fixture: ComponentFixture<AccessariesforyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessariesforyouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessariesforyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
