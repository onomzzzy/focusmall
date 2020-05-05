import { Item } from './item';
import { User } from './user';

export interface Order {
id:String;    
item:Item;
buyer:User;
paymentName:String;
purchaseTime:String;
confirmTime:String;
recievedTime:String;
}