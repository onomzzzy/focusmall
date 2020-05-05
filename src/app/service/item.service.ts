import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Item } from "../classes/item";
import { Subject } from "rxjs";
import { Order } from "../classes/order";
import { AwsService } from "./aws.service";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  private _searchword = new Subject<string>();
  _searchword$ = this._searchword.asObservable();
  //Search with price
  private _pricesearch = new Subject<number[]>();
  _pricesearch$ = this._pricesearch.asObservable();

  //Cart No
  private _cart = new Subject<Item[]>();
  _cart$ = this._cart.asObservable();

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private aws: AwsService
  ) {}

  clearCart() {
    this.cookies.delete("onome-cart", "/");
    let cart: Item[] = [];
    this._cart.next(cart);
  }

  //Filter Category
  filterByCategory(item, category): boolean {
    let result: boolean = false;
    switch (category) {
      case "designer":
        if (
          item.search.includes("4th") ||
          item.search.includes("5th") ||
          item.search.includes("6th") ||
          item.search.includes("7th") ||
          item.search.includes("8th") ||
          item.search.includes("9th") ||
          item.search.includes("10th") ||
          item.search.includes("ryzen")
        ) {
          result = true;
        }
        break;
      case "gamers":
        if (
          item.earch.includes("nvidia") ||
          item.search.includes("radeon") ||
          item.search.includes("vega") ||
          item.search.includes("rx") ||
          item.search.includes("gtx") ||
          item.search.includes("rtx")
        ) {
          result = true;
        }
        break;
      case "laptop":
        if (item.laptop != null) {
          result = true;
        }
        break;
      case "processor":
        if (item.peripheral != null && item.peripheral.processor != null) {
          result = true;
        }
        break;
      case "graphicscard":
        if (item.peripheral != null && item.peripheral.graphicsCard != null) {
          result = true;
        }
        break;
      case "motherboard":
        if (item.peripheral != null && item.peripheral.motherBoard != null) {
          result = true;
        }
        break;
      case "accessaries":
        if (
          (item.accessary != null && item.accessary.touchpad == null) ||
          item.accessary != null
        ) {
          result = true;
        }
        break;
      case "peripherals":
        if (
          (item.accessary != null && item.accessary.touchpad != null) ||
          item.peripheral != null
        ) {
          result = true;
        }
        break;
      case "bag":
        if (item.accessary != null && item.accessary.bag != null) {
          result = true;
        }
        break;
      case "software":
        if (item.software != null) {
          result = true;
        }
        break;
      default:
        result = false;
    }
    return result;
  }

  getItems() {
    return this.http
      .get<any>("/assets/data/items.json")
      .toPromise()
      .then((res) => <Item[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getStoreItems(store: String) {
    return this.http.get("https://onome.s3.us-east-2.amazonaws.com/" + store);
  }

  getOrders() {
    return this.http
      .get<any>("/assets/data/orders.json")
      .toPromise()
      .then((res) => <Order[]>res.data)
      .then((data) => {
        return data;
      });
  }

  setPriceFilter(price: number[]) {
    this._pricesearch.next(price);
  }

  setCart(item: Item) {
    //check if cart is present
    if (this.cookies.get("onome-cart").length > 5) {
      let carts: Item[] = JSON.parse(this.cookies.get("onome-cart"));
      //isAlready in cart true increase quantity
      let isContained: boolean = true;
      for (let i = 0; i < carts.length; i++) {
        if (carts[i].id === item.id + "") {
          let qty: number = carts[i].quantity + item.quantity;
          let price: number = carts[i].price + item.price;
          carts[i].price = price;
          carts[i].quantity = qty;
          console.log("called cos equal");
          this.cookies.set("onome-cart", JSON.stringify(carts), 1, "/");
          isContained = false;
          this._cart.next(carts);
          break;
        }
      }

      if (isContained) {
        carts.push(item);
        console.log("called cos not equal");
        this.cookies.set("onome-cart", JSON.stringify(carts), 1, "/");
        this._cart.next(carts);
      }
    } else {
      let carts: Item[] = [];
      carts.push(item);
      this.cookies.set("onome-cart", JSON.stringify(carts), 1, "/");
      this._cart.next(carts);
    }
  }

  getCart() {
    let cart: Item[] = [];
    if (this.cookies.get("onome-cart").length > 5) {
      cart = JSON.parse(this.cookies.get("onome-cart"));
    }
    return cart;
  }

  deleteItemFromCart(carts: Item[]) {
    this.cookies.set("onome-cart", JSON.stringify(carts), 1, "/");
    this._cart.next(carts);
  }

  setItemDisplay(item: Item) {
    this.cookies.set("onome-display", JSON.stringify(item), 1, "/");
  }

  setSpecialOffer(offer: string) {
    this.cookies.set("onome-special-offer", offer, 1, "/");
  }

  getSpecialOffer() {
    if (this.cookies.get("onome-special-offer").length > 1) {
      return this.cookies.get("onome-special-offer");
    }
    return null;
  }

  getNewPrice(discount: number, price: number) {
    return price - (discount / 100) * price;
  }

  getSearchWord() {
    if (this.cookies.get("onome-search").length > 1) {
      return this.cookies.get("onome-search");
    }
    return null;
  }

  setSearch(word: string) {
    //save to cookies
    this.cookies.set("onome-search", word, 1, "/");
    console.log(" search word " + word);
    this._searchword.next(word);
  }

  getItemDisplay(): Item {
    let item: Item = null;
    if (this.cookies.get("onome-display").length > 3) {
      item = JSON.parse(this.cookies.get("onome-display"));
    }
    return item;
  }

  setPreviousPage(page: string) {
    this.cookies.set("onome-previous-page", page, 1, "/");
  }

  getPreviousPage(): string {
    if (this.cookies.get("onome-previous-page").length > 2) {
      return this.cookies.get("onome-previous-page");
    }
    return "/home/store";
  }
}
