import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../classes/item';

@Pipe({
  name: 'minPrice'
})
export class MinPricePipe implements PipeTransform {

  transform(value:Item[], min:number): Item[] {
    if(min > 1000){
     return value.filter(n => (n.newprice > 0 && n.newprice >= min)||(n.newprice == 0 && n.price >= min));
    }
    return value;
  }

}
