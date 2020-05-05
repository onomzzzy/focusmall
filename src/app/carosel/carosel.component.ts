import { Component, OnInit, Input } from "@angular/core";
import { ItemService } from "../service/item.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-carosel",
  templateUrl: "./carosel.component.html",
  styleUrls: ["./carosel.component.css"],
})
export class CaroselComponent implements OnInit {
  @Input("carousel1") carousel: string;
  @Input("carousel2") carosel: string;
  carouselI: string;
  carouselII: string;

  constructor() {
    this.carouselI = this.carousel;
    this.carouselII = this.carosel;
  }

  ngOnInit(): void {
    this.carouselI = this.carousel;
    this.carouselII = this.carosel;
  }
}
