import IServerMessage from "../../../Messages/IServerMessage";
import Incoming from "../../Events/Incoming";
import IPacketEvent from "../IPacketEvent";

export default class PongMessage implements IPacketEvent {
    name = 'PongMessage';
    packetId = Incoming.PongMessageComposer;

    Parse( serverPacket: IServerMessage ): void {
       
    }
}