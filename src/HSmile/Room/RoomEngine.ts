import Component from "../../Core/Runtime/Component";
import IContext from "../../Core/Runtime/IContext";
import IUpdateReceiver from "../../Core/Runtime/IUpdateReceiver";
import { HSmile } from "../../HSmileMain";
import { Room } from "./Room";
import RoomMessageHandler from "./RoomMessageHandler";

export class RoomEngine extends Component implements IUpdateReceiver {

    roomMessageHandler?: RoomMessageHandler;

    constructor(context: IContext) {
        super(context);
        
        this.addUpdateReceiver(this);

        const hsmile = HSmile.get();

        this.roomMessageHandler = new RoomMessageHandler(hsmile.socketManager.packetManager);
    }

    update(dt: number): void {
        console.log('room engine got the update receiver.');
    }
}