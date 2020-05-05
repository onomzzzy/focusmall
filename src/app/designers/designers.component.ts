import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-designers",
  templateUrl: "./designers.component.html",
  styleUrls: ["./designers.component.css"],
})
export class DesignersComponent implements OnInit {
  carosel: string[] = [
    "../../assets/carousel/carosel10.jpg",
    "../../assets/carousel/carosel.jpg",
  ];
  designer: string = "designer";
  constructor() {}

  ngOnInit(): void {}
}
