import IServerMessage from "../../../Messages/IServerMessage";
import IPacketEvent from "../IPacketEvent";

export default class HabboClubSubscriptionMessageEvent implements IPacketEvent {
    name = 'HabboClubSubscriptionMessageEvent';

    Parse(serverPacket: IServerMessage): void {
        const subscription = serverPacket.popString(); // habbo_club
        const num1 = serverPacket.popInt(); // kept to 0
        const num2 = serverPacket.popInt(); // kept to 0
        const num3 = serverPacket.popInt(); // kept to 0
        const num4 = serverPacket.popInt(); // kept to 2

        const bool1 = serverPacket.popBoolean(); // kept to false
        const bool2 = serverPacket.popBoolean(); // kept to false

        const num5 = serverPacket.popInt(); // kept to 0
        const num6 = serverPacket.popInt(); // kept to 0
        const num7 = serverPacket.popInt(); // kept to 0
    }

}