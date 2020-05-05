import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicscardComponent } from './graphicscard.component';

describe('GraphicscardComponent', () => {
  let component: GraphicscardComponent;
  let fixture: ComponentFixture<GraphicscardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicscardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
