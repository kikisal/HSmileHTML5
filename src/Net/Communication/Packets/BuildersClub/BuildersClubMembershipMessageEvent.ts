import IServerMessage from "../../../Messages/IServerMessage";
import Incoming from "../../Events/Incoming";
import IPacketEvent from "../IPacketEvent";

export default class BuildersClubMembershipMessageEvent implements IPacketEvent {
    name = 'BuildersClubMembershipMessageEvent';
    packetId = Incoming.BuildersClubMembershipMessageComposer;

    Parse(serverPacket: IServerMessage): void {
        
        // int.MaxValue
        const num0 = serverPacket.popInt();
        // 100
        const num1 = serverPacket.popInt();
        // 0
        const num2 = serverPacket.popInt();
        // int.MaxValue
        const num3 = serverPacket.popInt();
    }

}