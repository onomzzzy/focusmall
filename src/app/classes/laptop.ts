import { Battery } from './battery';
import { Proccessor } from './processor';
import { GraphicsCard } from './graphicscard';
import { HardDrive } from './hd';
import { Ram } from './ram';
import { Display } from './screen';

export interface Laptop {
brand:String;    
model:String;    
processor:Proccessor;
screen:Display;
graphicsCard:GraphicsCard[];//can contain dual graphics card
hardDrive:HardDrive[];//can contain more than 1 hard drive
ram:Ram;
battery:Battery
extra:String[];
}