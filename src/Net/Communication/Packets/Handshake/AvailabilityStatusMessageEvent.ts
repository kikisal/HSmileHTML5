import IServerMessage from "../../../Messages/IServerMessage";
import Incoming from "../../Events/Incoming";
import IPacketEvent from "../IPacketEvent";

export default class AvailabilityStatusMessageEvent implements IPacketEvent {
    name = 'AvailabilityStatusMessageEvent';
    packetId = Incoming.AvailabilityStatusMessageComposer;

    bool1?: boolean;
    bool2?: boolean;
    bool3?: boolean;

    Parse(serverPacket: IServerMessage): void {
        this.bool1 = serverPacket.popBoolean(); // true
        this.bool2 = serverPacket.popBoolean(); // false
        this.bool3 = serverPacket.popBoolean(); // true
    }
}