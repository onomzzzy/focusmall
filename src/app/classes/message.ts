import { User } from './user';
import { Timezone } from './time';

export interface Message {
    id:String;
    user:User;
    reciever:String;
    message:String;
    time:Timezone;
    }