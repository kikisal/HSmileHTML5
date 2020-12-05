import IServerMessage from "../../../Messages/IServerMessage";
import IPacketEvent from "../IPacketEvent";

export default class AvailabilityStatusMessageEvent implements IPacketEvent {
    name = 'AvailabilityStatusMessageEvent';

    Parse(serverPacket: IServerMessage): void {
        const bool1 = serverPacket.popBoolean(); // true
        const bool2 = serverPacket.popBoolean(); // false
        const bool3 = serverPacket.popBoolean(); // true
    }
}