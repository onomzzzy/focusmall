import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsbdriveComponent } from './usbdrive.component';

describe('UsbdriveComponent', () => {
  let component: UsbdriveComponent;
  let fixture: ComponentFixture<UsbdriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsbdriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsbdriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
