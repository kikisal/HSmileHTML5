import HSmileCommunication from "./HSmile/Communication/HSmileCommunication";
import { Room } from "./HSmile/Room/Room";
import { RoomEngine } from "./HSmile/Room/RoomEngine";
import RoomModel from "./HSmile/Room/RoomModel";

export default class Game {

    hsmileCommunication?: HSmileCommunication;
    roomEngine?: RoomEngine;

    constructor() {
       this.roomEngine = new RoomEngine();
       this.hsmileCommunication = new HSmileCommunication();
        
    }



    gameLoop(): void {
        
        
    }
}