import { Component, OnInit, Input } from "@angular/core";
import { Item } from "../classes/item";
import { ItemService } from "../service/item.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-discounted",
  templateUrl: "./discounted.component.html",
  styleUrls: ["./discounted.component.css"],
})
export class DiscountedComponent implements OnInit {
  discounted: Item[] = [];
  @Input() category: string;
  responsiveOptions: any;
  constructor(private itemService: ItemService, private router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 4,
        numScroll: 2,
      },
      {
        breakpoint: "950px",
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: "768px",
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: "560px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "315px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.itemService.getStoreItems("FocusMall").subscribe((data) => {
      let item: Item[] = JSON.parse(JSON.stringify(data));

      for (let discount of item) {
        if (
          this.itemService.filterByCategory(discount, this.category) &&
          discount.discount > 0
        ) {
          this.discounted.push(discount);
        }
      }
    });
  }

  onClickItem(item: Item) {
    this.itemService.setItemDisplay(item);
    this.itemService.setPreviousPage("/home/store");
    this.router.navigate(["/home/product"]);
  }
}
