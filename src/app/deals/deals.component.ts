import { Component, OnInit, Input } from "@angular/core";
import { Item } from "../classes/item";
import { ItemService } from "../service/item.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-deals",
  templateUrl: "./deals.component.html",
  styleUrls: ["./deals.component.css"],
})
export class DealsComponent implements OnInit {
  latestProduct: Item[] = [];
  isempty: boolean = false;
  search: String;
  brand: String;
  max: number = 0;
  min: number = 0;
  @Input() category: string;

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.itemService.getStoreItems("FocusMall").subscribe(
      (data) => {
        let latest: Item[] = JSON.parse(JSON.stringify(data));
        let result: Item[] = [];

        for (let item of latest) {
          if (this.itemService.filterByCategory(item, this.category)) {
            result.push(item);
          }
        }
        if (result.length > 0) {
          this.isempty = false;
          this.latestProduct = result.reverse();
        } else {
          this.isempty = true;
        }
      },
      (error) => {
        console.log(`Error Occured ${error}`);
        this.isempty = true;
      }
    );
  }

  onClickItem(item: Item) {
    this.itemService.setItemDisplay(item);
    this.router.navigate(["/home/product"]);
  }
}
