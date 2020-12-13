import IServerMessage from "../../../../Messages/IServerMessage";
import Incoming from "../../../Events/Incoming";
import IPacketEvent from "../../IPacketEvent";

export default class OpenConnectionMessageEvent implements IPacketEvent {
    name: string = 'OpenConnectionMessageEvent';
    packetId = Incoming.OpenConnectionMessageComposer;
    
    Parse(serverPacket: IServerMessage): void {
        // set something to true.
    }

}