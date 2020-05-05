import { Laptop } from './laptop';
import { Peripheral } from './Peripheral';
import { Accessary } from './accessary';
import { Software } from './software';

export interface Item {
    id:String;
    brand:String; 
    picture:String[];
    condition:String;
    title:String;
    description:String;
    search:String;
    laptop:Laptop;
    peripheral:Peripheral;
    accessary:Accessary;
    software:Software;
    itemlocation:String;
    quantity:number;
    price:number;
    newprice:number;
    discount:number;
    online:boolean;
}   