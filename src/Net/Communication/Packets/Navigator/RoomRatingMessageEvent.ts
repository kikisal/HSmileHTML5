import IServerMessage from "../../../Messages/IServerMessage";
import Incoming from "../../Events/Incoming";
import IPacketEvent from "../IPacketEvent";

export default class RoomRatingMessageEvent implements IPacketEvent {
    name = 'RoomRatingMessageEvent';
    packetId = Incoming.RoomRatingMessageComposer;

    roomScore = 0;
    canVote = false;
    
    Parse(serverPacket: IServerMessage): void {
        this.roomScore = serverPacket.popInt();
        this.canVote = serverPacket.popBoolean();

    }
    
}