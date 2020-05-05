import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../classes/item';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {
  transform(value: Item[], brand:String): Item[] {
    if(!(brand == null || brand ===""|| brand == undefined)){
      return value.filter(n => n.search.includes(brand.toLowerCase()));
    }
    return value;
  }

}
