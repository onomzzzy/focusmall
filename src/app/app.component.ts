import { Component, ElementRef, NgZone, AfterViewInit, Renderer2 } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends Carousel implements AfterViewInit {
  title = 'MALL';

  constructor(public el:ElementRef,
    public zone: NgZone,private renderer: Renderer2) {
    super(el,zone);
    Carousel.prototype.changePageOnTouch = (e,diff) => {}
}

ngAfterViewInit() {
  let loader = this.renderer.selectRootElement('#loader');
  loader.style.display = "none";
}
}
