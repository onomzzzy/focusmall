import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { slideInAnimation } from "src/animations/slide";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
  animations: [
    slideInAnimation,
    //slideInAnimation
    // animation triggers go here
  ],
})
export class LandingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }
}
