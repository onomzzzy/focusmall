import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../classes/item';

@Pipe({
  name: 'maxPrice'
})
export class MaxPricePipe implements PipeTransform {

  transform(value: Item[], max:number): Item[] {
    if(max > 1000){
      return value.filter(n => (n.newprice > 0 && n.newprice <= max)||(n.newprice == 0 && n.price <= max));
     }
    return value;
  }

}
