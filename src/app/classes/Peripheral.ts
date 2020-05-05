import { Battery } from './battery';
import { HardDrive } from './hd';
import { Display } from './screen';
import { KeyBoard } from './keyboard';
import { Charger } from './charger';
import { GraphicsCard } from './graphicscard';
import { MotherBoard } from './motherboard';
import { Proccessor } from './processor';
import { Ram } from './ram';

export interface Peripheral {   
battery:Battery;
hardDrive:HardDrive;
screen:Display;
keyboard:KeyBoard;
charger:Charger;
graphicsCard:GraphicsCard;
processor:Proccessor;
motherBoard:MotherBoard;
ram:Ram;
}