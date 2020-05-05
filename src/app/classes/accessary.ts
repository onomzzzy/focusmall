import { FormGroupDirective } from '@angular/forms';
import { Bag } from './bag';
import { Cable } from './cable';
import { FlashDrive } from './flashdrive';
import { Enclosure } from './enclosure';
import { ExternalMouse } from './mouse';
import { TouchPad } from './touchpad';
import { Headset } from './headset';
import { GamePad } from './gamepad';

export interface Accessary {
bag:Bag;
cable:Cable;
flashDrive:FlashDrive;
enclosure:Enclosure;
mouse:ExternalMouse;
touchpad:TouchPad;
headset:Headset;
gamepad:GamePad
}