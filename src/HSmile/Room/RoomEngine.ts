import { HSmile } from "../../HSmileMain";
import { Room } from "./Room";
import RoomMessageHandler from "./RoomMessageHandler";

export class RoomEngine {

    roomMessageHandler?: RoomMessageHandler;

    constructor() {
        
        const hsmile = HSmile.get();

        this.roomMessageHandler = new RoomMessageHandler(hsmile.socketManager.packetManager);
        
    }
}