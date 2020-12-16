import Component from "../../Core/Runtime/Component";
import IContext from "../../Core/Runtime/IContext";
import IUpdateReceiver from "../../Core/Runtime/IUpdateReceiver";
import { HSmile } from "../../HSmileMain";
import { IRoomCreator } from "./IRoomCreator";
import { Room } from "./Room";
import RoomMessageHandler from "./RoomMessageHandler";

export class RoomEngine extends Component implements IRoomCreator, IUpdateReceiver {

    roomMessageHandler?: RoomMessageHandler;

    constructor(context: IContext) {
        super(context);
        
        this.addUpdateReceiver(this);
        const hsmile = HSmile.get();

        this.roomMessageHandler = new RoomMessageHandler(this, hsmile.socketManager.packetManager);
    }

    initializeRoom(): void {
        
    }

    disposeRoom(roomId: number): void {
        
    }

    update(dt: number): void {
        console.log('room engine got the update receiver.');
    }
}